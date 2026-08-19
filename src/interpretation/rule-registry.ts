import { createHash } from 'node:crypto';
import type {
  ContentAddressedVersionedRef,
  VersionedRef,
} from '../contracts/common.js';
import type {
  ContentAddressedSourceRef,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  RuleRegistrySnapshot,
  SourceReference,
} from '../contracts/interpretation.js';

export type RegistryConfigurationErrorCode =
  | 'DUPLICATE_RULE_VERSION'
  | 'DUPLICATE_METHODOLOGY_VERSION'
  | 'DUPLICATE_SOURCE_ID'
  | 'PACK_METHODOLOGY_MISSING'
  | 'PACK_METHODOLOGY_VERSION_MISMATCH'
  | 'RULE_SOURCE_MISSING'
  | 'METHODOLOGY_SOURCE_MISSING';

export class RegistryConfigurationError extends Error {
  readonly code: RegistryConfigurationErrorCode;

  constructor(code: RegistryConfigurationErrorCode, message: string) {
    super(message);
    this.name = 'RegistryConfigurationError';
    this.code = code;
  }
}

export interface RuleRegistryInput {
  rules: readonly RuleDefinition[];
  methodologies: readonly MethodologyDefinition[];
  sources?: readonly SourceReference[];
}

export interface ResolvedRuleRegistrySnapshot {
  snapshot: RuleRegistrySnapshot;
  pack: InterpretationPack;
  rules: readonly RuleDefinition[];
  methodologies: readonly MethodologyDefinition[];
  sources: readonly SourceReference[];
}

function canonicalize(value: unknown): unknown {
  if (value === undefined) return { $undefined: true };
  if (typeof value === 'number' && !Number.isFinite(value)) {
    return { $number: String(value) };
  }
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .map((key) => [key, canonicalize(record[key])]),
  );
}

export function deterministicContentHash(value: unknown): string {
  const serialized = JSON.stringify(canonicalize(value));
  return createHash('sha256').update(serialized).digest('hex');
}

function versionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function ruleRef(rule: RuleDefinition): VersionedRef {
  return { id: rule.ruleId, version: rule.version };
}

function methodologyRef(methodology: MethodologyDefinition): VersionedRef {
  return { id: methodology.methodologyId, version: methodology.version };
}

function contentAddressed(ref: VersionedRef, value: unknown): ContentAddressedVersionedRef {
  return { ...ref, contentHash: deterministicContentHash(value) };
}

function sourceContentRef(source: SourceReference): ContentAddressedSourceRef {
  return { sourceId: source.sourceId, contentHash: deterministicContentHash(source) };
}

function ensureUniqueVersions<T>(
  values: readonly T[],
  toRef: (value: T) => VersionedRef,
  errorCode: 'DUPLICATE_RULE_VERSION' | 'DUPLICATE_METHODOLOGY_VERSION',
): void {
  const seen = new Set<string>();
  for (const value of values) {
    const key = versionKey(toRef(value));
    if (seen.has(key)) {
      throw new RegistryConfigurationError(errorCode, `Duplicate registry entry: ${key}`);
    }
    seen.add(key);
  }
}

function ensureUniqueSources(sources: readonly SourceReference[]): void {
  const seen = new Set<string>();
  for (const source of sources) {
    if (seen.has(source.sourceId)) {
      throw new RegistryConfigurationError(
        'DUPLICATE_SOURCE_ID',
        `Duplicate sourceId: ${source.sourceId}`,
      );
    }
    seen.add(source.sourceId);
  }
}

function ensureSourceReferences(
  rules: readonly RuleDefinition[],
  methodologies: readonly MethodologyDefinition[],
  sources: readonly SourceReference[],
): void {
  const sourceIds = new Set(sources.map((source) => source.sourceId));

  for (const methodology of methodologies) {
    for (const sourceId of methodology.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        throw new RegistryConfigurationError(
          'METHODOLOGY_SOURCE_MISSING',
          `Methodology ${methodology.methodologyId}@${methodology.version} references missing source ${sourceId}`,
        );
      }
    }
  }

  for (const rule of rules) {
    for (const sourceRef of rule.sourceRefs) {
      if (!sourceIds.has(sourceRef.sourceId)) {
        throw new RegistryConfigurationError(
          'RULE_SOURCE_MISSING',
          `Rule ${rule.ruleId}@${rule.version} references missing source ${sourceRef.sourceId}`,
        );
      }
    }
  }
}

function resolvePackMethodologies(
  pack: InterpretationPack,
  methodologies: readonly MethodologyDefinition[],
): readonly MethodologyDefinition[] {
  const byId = new Map<string, MethodologyDefinition[]>();
  for (const methodology of methodologies) {
    const values = byId.get(methodology.methodologyId) ?? [];
    values.push(methodology);
    byId.set(methodology.methodologyId, values);
  }

  return pack.methodologyRefs.map((requested) => {
    const versions = byId.get(requested.id);
    if (versions === undefined) {
      throw new RegistryConfigurationError(
        'PACK_METHODOLOGY_MISSING',
        `Pack ${pack.packId}@${pack.version} references missing methodology ${requested.id}@${requested.version}`,
      );
    }

    const exact = versions.find((candidate) => candidate.version === requested.version);
    if (exact === undefined) {
      throw new RegistryConfigurationError(
        'PACK_METHODOLOGY_VERSION_MISMATCH',
        `Pack ${pack.packId}@${pack.version} requires ${requested.id}@${requested.version}, available: ${versions
          .map((candidate) => candidate.version)
          .sort()
          .join(', ')}`,
      );
    }
    return exact;
  });
}

function stableRules(rules: readonly RuleDefinition[]): readonly RuleDefinition[] {
  return [...rules].sort((left, right) => {
    const idOrder = left.ruleId.localeCompare(right.ruleId);
    return idOrder === 0 ? left.version.localeCompare(right.version) : idOrder;
  });
}

function stableMethodologies(
  methodologies: readonly MethodologyDefinition[],
): readonly MethodologyDefinition[] {
  return [...methodologies].sort((left, right) => {
    const idOrder = left.methodologyId.localeCompare(right.methodologyId);
    return idOrder === 0 ? left.version.localeCompare(right.version) : idOrder;
  });
}

function stableSources(sources: readonly SourceReference[]): readonly SourceReference[] {
  return [...sources].sort((left, right) => left.sourceId.localeCompare(right.sourceId));
}

export function createRuleRegistrySnapshot(
  input: RuleRegistryInput,
  pack: InterpretationPack,
  createdAt = '1970-01-01T00:00:00.000Z',
): ResolvedRuleRegistrySnapshot {
  const sources = input.sources ?? [];
  ensureUniqueVersions(input.rules, ruleRef, 'DUPLICATE_RULE_VERSION');
  ensureUniqueVersions(
    input.methodologies,
    methodologyRef,
    'DUPLICATE_METHODOLOGY_VERSION',
  );
  ensureUniqueSources(sources);
  ensureSourceReferences(input.rules, input.methodologies, sources);

  const rules = stableRules(input.rules);
  const methodologies = stableMethodologies(resolvePackMethodologies(pack, input.methodologies));
  const stableSourceList = stableSources(sources);

  const ruleRefs = rules.map((rule) => contentAddressed(ruleRef(rule), rule));
  const methodologyRefs = methodologies.map((methodology) =>
    contentAddressed(methodologyRef(methodology), methodology),
  );
  const sourceRefs = stableSourceList.map(sourceContentRef);
  const packRef = contentAddressed({ id: pack.packId, version: pack.version }, pack);

  const registryMaterial = {
    rules: ruleRefs,
    methodologies: methodologyRefs,
    sources: sourceRefs,
    packRef,
  };
  const registrySnapshotId = `registry_${deterministicContentHash(registryMaterial).slice(0, 24)}`;

  return {
    snapshot: {
      registrySnapshotId,
      createdAt,
      rules: ruleRefs,
      methodologies: methodologyRefs,
      sources: sourceRefs,
      packRef,
    },
    pack,
    rules,
    methodologies,
    sources: stableSourceList,
  };
}
