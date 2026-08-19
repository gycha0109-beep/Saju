import { createHash } from 'node:crypto';
import type {
  ContentAddressedVersionedRef,
  VersionedRef,
} from '../contracts/common.js';
import type {
  ContentAddressedReviewAttestationRef,
  ContentAddressedSourceRef,
  InterpretationPack,
  MethodologyDefinition,
  ReviewAttestation,
  RuleDefinition,
  RuleRegistrySnapshot,
  SourceReference,
} from '../contracts/interpretation.js';

export type RegistryConfigurationErrorCode =
  | 'DUPLICATE_RULE_VERSION'
  | 'DUPLICATE_METHODOLOGY_VERSION'
  | 'DUPLICATE_SOURCE_ID'
  | 'DUPLICATE_REVIEW_ATTESTATION_ID'
  | 'PACK_METHODOLOGY_MISSING'
  | 'PACK_METHODOLOGY_VERSION_MISMATCH'
  | 'RULE_SOURCE_MISSING'
  | 'METHODOLOGY_SOURCE_MISSING'
  | 'REVIEW_ATTESTATION_INVALID'
  | 'REVIEW_ATTESTATION_SUBJECT_MISMATCH';

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
  reviewAttestations?: readonly ReviewAttestation[];
}

export interface ResolvedRuleRegistrySnapshot {
  snapshot: RuleRegistrySnapshot;
  pack: InterpretationPack;
  rules: readonly RuleDefinition[];
  methodologies: readonly MethodologyDefinition[];
  sources: readonly SourceReference[];
  reviewAttestations: readonly ReviewAttestation[];
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

function deepFreeze<T>(value: T): T {
  if (value === null || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  return Object.freeze(value);
}

function immutableClone<T>(value: T): T {
  return deepFreeze(structuredClone(value));
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

function reviewContentRef(
  attestation: ReviewAttestation,
): ContentAddressedReviewAttestationRef {
  return {
    attestationId: attestation.attestationId,
    contentHash: deterministicContentHash(attestation),
  };
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

function ensureUniqueReviewAttestations(attestations: readonly ReviewAttestation[]): void {
  const seen = new Set<string>();
  for (const attestation of attestations) {
    if (attestation.attestationId.trim().length === 0 || attestation.reviewerId.trim().length === 0) {
      throw new RegistryConfigurationError(
        'REVIEW_ATTESTATION_INVALID',
        'Review attestation requires non-empty attestationId and reviewerId.',
      );
    }
    if (Number.isNaN(Date.parse(attestation.reviewedAt))) {
      throw new RegistryConfigurationError(
        'REVIEW_ATTESTATION_INVALID',
        `Review attestation ${attestation.attestationId} has invalid reviewedAt.`,
      );
    }
    if (seen.has(attestation.attestationId)) {
      throw new RegistryConfigurationError(
        'DUPLICATE_REVIEW_ATTESTATION_ID',
        `Duplicate review attestation: ${attestation.attestationId}`,
      );
    }
    seen.add(attestation.attestationId);
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

function stableReviewAttestations(
  attestations: readonly ReviewAttestation[],
): readonly ReviewAttestation[] {
  return [...attestations].sort((left, right) => left.attestationId.localeCompare(right.attestationId));
}

function ensureReviewSubjectBindings(
  attestations: readonly ReviewAttestation[],
  rules: readonly RuleDefinition[],
  methodologies: readonly MethodologyDefinition[],
): void {
  const ruleContent = new Map(
    rules.map((rule) => [versionKey(ruleRef(rule)), contentAddressed(ruleRef(rule), rule)]),
  );
  const methodologyContent = new Map(
    methodologies.map((methodology) => [
      versionKey(methodologyRef(methodology)),
      contentAddressed(methodologyRef(methodology), methodology),
    ]),
  );

  for (const attestation of attestations) {
    const key = versionKey(attestation.subjectRef);
    const expected =
      attestation.subjectType === 'rule' ? ruleContent.get(key) : methodologyContent.get(key);
    if (expected === undefined || expected.contentHash !== attestation.subjectRef.contentHash) {
      throw new RegistryConfigurationError(
        'REVIEW_ATTESTATION_SUBJECT_MISMATCH',
        `Review attestation ${attestation.attestationId} does not bind the current ${attestation.subjectType} content ${key}.`,
      );
    }
  }
}

function registryMaterialFor(
  rules: readonly ContentAddressedVersionedRef[],
  methodologies: readonly ContentAddressedVersionedRef[],
  sources: readonly ContentAddressedSourceRef[],
  reviewAttestations: readonly ContentAddressedReviewAttestationRef[],
  packRef: ContentAddressedVersionedRef,
) {
  return { rules, methodologies, sources, reviewAttestations, packRef };
}

export function verifyResolvedRegistryContentIntegrity(
  registry: ResolvedRuleRegistrySnapshot,
): readonly string[] {
  const errors: string[] = [];
  const expectedRules = stableRules(registry.rules).map((rule) => contentAddressed(ruleRef(rule), rule));
  const expectedMethodologies = stableMethodologies(registry.methodologies).map((methodology) =>
    contentAddressed(methodologyRef(methodology), methodology),
  );
  const expectedSources = stableSources(registry.sources).map(sourceContentRef);
  const expectedReviews = stableReviewAttestations(registry.reviewAttestations).map(reviewContentRef);
  const expectedPackRef = contentAddressed(
    { id: registry.pack.packId, version: registry.pack.version },
    registry.pack,
  );

  if (deterministicContentHash(expectedRules) !== deterministicContentHash(registry.snapshot.rules)) {
    errors.push('rule content differs from registry snapshot');
  }
  if (
    deterministicContentHash(expectedMethodologies) !==
    deterministicContentHash(registry.snapshot.methodologies)
  ) {
    errors.push('methodology content differs from registry snapshot');
  }
  if (deterministicContentHash(expectedSources) !== deterministicContentHash(registry.snapshot.sources)) {
    errors.push('source content differs from registry snapshot');
  }
  if (
    deterministicContentHash(expectedReviews) !==
    deterministicContentHash(registry.snapshot.reviewAttestations)
  ) {
    errors.push('review attestation content differs from registry snapshot');
  }
  if (deterministicContentHash(expectedPackRef) !== deterministicContentHash(registry.snapshot.packRef)) {
    errors.push('pack content differs from registry snapshot');
  }

  const expectedRegistryId = `registry_${deterministicContentHash(
    registryMaterialFor(
      expectedRules,
      expectedMethodologies,
      expectedSources,
      expectedReviews,
      expectedPackRef,
    ),
  ).slice(0, 24)}`;
  if (expectedRegistryId !== registry.snapshot.registrySnapshotId) {
    errors.push('registrySnapshotId does not match resolved content');
  }
  return errors.sort();
}

export function createRuleRegistrySnapshot(
  input: RuleRegistryInput,
  pack: InterpretationPack,
  createdAt = '1970-01-01T00:00:00.000Z',
): ResolvedRuleRegistrySnapshot {
  const rulesInput = immutableClone([...input.rules]);
  const methodologiesInput = immutableClone([...input.methodologies]);
  const sourcesInput = immutableClone([...(input.sources ?? [])]);
  const reviewsInput = immutableClone([...(input.reviewAttestations ?? [])]);
  const packInput = immutableClone(pack);

  ensureUniqueVersions(rulesInput, ruleRef, 'DUPLICATE_RULE_VERSION');
  ensureUniqueVersions(
    methodologiesInput,
    methodologyRef,
    'DUPLICATE_METHODOLOGY_VERSION',
  );
  ensureUniqueSources(sourcesInput);
  ensureUniqueReviewAttestations(reviewsInput);
  ensureSourceReferences(rulesInput, methodologiesInput, sourcesInput);

  const rules = immutableClone(stableRules(rulesInput));
  const methodologies = immutableClone(
    stableMethodologies(resolvePackMethodologies(packInput, methodologiesInput)),
  );
  const sources = immutableClone(stableSources(sourcesInput));
  const reviewAttestations = immutableClone(stableReviewAttestations(reviewsInput));
  ensureReviewSubjectBindings(reviewAttestations, rules, methodologies);

  const ruleRefs = immutableClone(rules.map((rule) => contentAddressed(ruleRef(rule), rule)));
  const methodologyRefs = immutableClone(
    methodologies.map((methodology) => contentAddressed(methodologyRef(methodology), methodology)),
  );
  const sourceRefs = immutableClone(sources.map(sourceContentRef));
  const reviewRefs = immutableClone(reviewAttestations.map(reviewContentRef));
  const packRef = immutableClone(
    contentAddressed({ id: packInput.packId, version: packInput.version }, packInput),
  );

  const registryMaterial = registryMaterialFor(
    ruleRefs,
    methodologyRefs,
    sourceRefs,
    reviewRefs,
    packRef,
  );
  const registrySnapshotId = `registry_${deterministicContentHash(registryMaterial).slice(0, 24)}`;
  const snapshot = immutableClone({
    registrySnapshotId,
    createdAt,
    rules: ruleRefs,
    methodologies: methodologyRefs,
    sources: sourceRefs,
    reviewAttestations: reviewRefs,
    packRef,
  } satisfies RuleRegistrySnapshot);

  return deepFreeze({
    snapshot,
    pack: packInput,
    rules,
    methodologies,
    sources,
    reviewAttestations,
  });
}
