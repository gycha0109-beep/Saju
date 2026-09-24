import type { ClaimRelation, InterpretationClaim } from '../contracts/interpretation.js';
import type { SelectedFact } from '../contracts/narrative.js';
import type { ReadingIntent } from '../contracts/reading.js';
import type { GovernedReadingEvidenceBundleV1 } from './governed-reading-evidence.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const CANONICAL_READING_SEMANTIC_SCHEMA_VERSION =
  'myeonghwa-canonical-reading-semantics-v1' as const;
export const CANONICAL_READING_SEMANTIC_PROJECTION_VERSION =
  'myeonghwa-canonical-reading-semantic-projection-v2' as const;

export type CanonicalReadingSemanticRole = 'primary' | 'supporting';

export interface CanonicalReadingSemanticTextV1 {
  headline?: string;
  summary?: string;
}

export interface CanonicalReadingSemanticTextProvenanceV1 {
  admissionId: string;
  admissionRegistryVersion: string;
  researchId: string;
  researchVersion: string;
  authorityState: string;
}

export interface CanonicalReadingSemanticTextBindingV1 {
  targetClaimId: string;
  canonicalText: CanonicalReadingSemanticTextV1;
  provenance: CanonicalReadingSemanticTextProvenanceV1;
}

export type CanonicalReadingSemanticQualifierKind =
  | 'condition'
  | 'qualifier'
  | 'tension'
  | 'boundary';

export interface CanonicalReadingSemanticQualifierProvenanceV1 {
  admissionId: string;
  admissionRegistryVersion: string;
  researchId: string;
  researchVersion: string;
  authorityState: string;
}

export interface CanonicalReadingSemanticQualifierV1 {
  qualifierId: string;
  kind: CanonicalReadingSemanticQualifierKind;
  semanticScope: string;
  semanticKeys: readonly string[];
  canonicalText?: CanonicalReadingSemanticTextV1;
  prohibitedExtensions: readonly string[];
  provenance: CanonicalReadingSemanticQualifierProvenanceV1;
}

export interface CanonicalReadingSemanticQualifierBindingV1 {
  targetClaimId: string;
  qualifier: CanonicalReadingSemanticQualifierV1;
}

export interface CanonicalReadingSemanticUnitV1 {
  unitId: string;
  role: CanonicalReadingSemanticRole;
  claimId: string;
  scenarioRef?: string;
  taxonomy: InterpretationClaim['taxonomy'];
  claimType: string;
  subject: string;
  predicate: string;
  semanticKey: string;
  canonicalText?: CanonicalReadingSemanticTextV1;
  canonicalTextProvenance?: CanonicalReadingSemanticTextProvenanceV1;
  semanticPayload: unknown;
  methodologyRef: InterpretationClaim['methodologyRef'];
  ruleRefs: InterpretationClaim['ruleRefs'];
  factRefs: readonly string[];
  upstreamClaimRefs: readonly string[];
  researchEvidenceRefs: readonly string[];
  sourceRefs: readonly string[];
  relationRefs: readonly string[];
  semanticQualifiers?: readonly CanonicalReadingSemanticQualifierV1[];
  prohibitedExtensions: readonly string[];
  polarity?: InterpretationClaim['polarity'];
  emphasis?: InterpretationClaim['emphasis'];
}

export interface CanonicalReadingSemanticBundleV1 {
  schemaVersion: typeof CANONICAL_READING_SEMANTIC_SCHEMA_VERSION;
  projectionVersion: typeof CANONICAL_READING_SEMANTIC_PROJECTION_VERSION;
  intent: ReadingIntent;
  snapshotId: string;
  interpretationRunId: string;
  registrySnapshotId: string;
  sourceEvidenceHash: string;
  semanticHash: string;
  targetClaimIds: readonly string[];
  units: readonly CanonicalReadingSemanticUnitV1[];
  canonicalFacts: readonly SelectedFact[];
  claimRelations: readonly ClaimRelation[];
  constraints: {
    mayGenerateClaims: false;
    mayResolveConflicts: false;
    mayCollapseScenarios: false;
    mayPromoteResearchAuthority: false;
    mayInferMissingSemantics: false;
  };
}

export interface CanonicalReadingSemanticProjectionInputV1 {
  intent: ReadingIntent;
  evidence: GovernedReadingEvidenceBundleV1;
  targetClaimIds: readonly string[];
  semanticTextBindings?: readonly CanonicalReadingSemanticTextBindingV1[];
  semanticQualifierBindings?: readonly CanonicalReadingSemanticQualifierBindingV1[];
}

export function isCanonicalReadingScopeGuardUnitV1(
  unit: CanonicalReadingSemanticUnitV1,
): boolean {
  return unit.taxonomy.subcategory === 'scope_guard' || unit.predicate === 'scope_guard';
}

const CONSTRAINTS = Object.freeze({
  mayGenerateClaims: false as const,
  mayResolveConflicts: false as const,
  mayCollapseScenarios: false as const,
  mayPromoteResearchAuthority: false as const,
  mayInferMissingSemantics: false as const,
});

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function canonicalText(value: unknown): CanonicalReadingSemanticTextV1 | undefined {
  if (!isRecord(value)) return undefined;
  const headline =
    typeof value.headline === 'string' && value.headline.trim().length > 0
      ? value.headline.trim()
      : undefined;
  const summary =
    typeof value.summary === 'string' && value.summary.trim().length > 0
      ? value.summary.trim()
      : undefined;
  if (headline === undefined && summary === undefined) return undefined;
  return {
    ...(headline === undefined ? {} : { headline }),
    ...(summary === undefined ? {} : { summary }),
  };
}

function normalizedTextProvenance(
  provenance: CanonicalReadingSemanticTextProvenanceV1,
): CanonicalReadingSemanticTextProvenanceV1 {
  const normalized = {
    admissionId: provenance.admissionId.trim(),
    admissionRegistryVersion: provenance.admissionRegistryVersion.trim(),
    researchId: provenance.researchId.trim(),
    researchVersion: provenance.researchVersion.trim(),
    authorityState: provenance.authorityState.trim(),
  };
  if (Object.values(normalized).some((value) => value.length === 0)) {
    throw new TypeError('Canonical Reading semantic text provenance must be complete.');
  }
  return normalized;
}

function semanticTextBindingsByClaimId(
  bindings: readonly CanonicalReadingSemanticTextBindingV1[],
  targetClaimIds: ReadonlySet<string>,
): ReadonlyMap<string, CanonicalReadingSemanticTextBindingV1> {
  const result = new Map<string, CanonicalReadingSemanticTextBindingV1>();
  for (const binding of bindings) {
    if (!targetClaimIds.has(binding.targetClaimId)) {
      throw new TypeError(
        `Canonical Reading semantic text binding targets a non-primary claim: ${binding.targetClaimId}`,
      );
    }
    if (result.has(binding.targetClaimId)) {
      throw new TypeError(
        `Duplicate Canonical Reading semantic text binding: ${binding.targetClaimId}`,
      );
    }
    const text = canonicalText(binding.canonicalText);
    if (text === undefined) {
      throw new TypeError('Canonical Reading semantic text binding requires canonicalText.');
    }
    result.set(binding.targetClaimId, {
      targetClaimId: binding.targetClaimId,
      canonicalText: text,
      provenance: normalizedTextProvenance(binding.provenance),
    });
  }
  return result;
}

function prohibitedExtensions(value: unknown): readonly string[] {
  if (!isRecord(value)) return [];
  return Object.entries(value)
    .filter(
      ([key, candidate]) =>
        candidate === false &&
        (key.endsWith('Authorized') ||
          key.endsWith('Allowed') ||
          key.endsWith('Permitted')),
    )
    .map(([key]) => key)
    .sort();
}

function normalizedQualifier(
  qualifier: CanonicalReadingSemanticQualifierV1,
): CanonicalReadingSemanticQualifierV1 {
  if (qualifier.qualifierId.trim().length === 0) {
    throw new TypeError('Canonical Reading semantic qualifier requires qualifierId.');
  }
  if (qualifier.semanticScope.trim().length === 0) {
    throw new TypeError('Canonical Reading semantic qualifier requires semanticScope.');
  }
  if (
    qualifier.provenance.admissionId.trim().length === 0 ||
    qualifier.provenance.admissionRegistryVersion.trim().length === 0 ||
    qualifier.provenance.researchId.trim().length === 0 ||
    qualifier.provenance.researchVersion.trim().length === 0 ||
    qualifier.provenance.authorityState.trim().length === 0
  ) {
    throw new TypeError('Canonical Reading semantic qualifier requires complete provenance.');
  }
  const semanticKeys = [
    ...new Set(
      qualifier.semanticKeys
        .map((key) => key.trim())
        .filter((key) => key.length > 0),
    ),
  ].sort();
  if (semanticKeys.length === 0) {
    throw new RangeError('Canonical Reading semantic qualifier requires semanticKeys.');
  }
  const normalizedText = canonicalText(qualifier.canonicalText);
  return {
    qualifierId: qualifier.qualifierId.trim(),
    kind: qualifier.kind,
    semanticScope: qualifier.semanticScope.trim(),
    semanticKeys,
    ...(normalizedText === undefined ? {} : { canonicalText: normalizedText }),
    prohibitedExtensions: [
      ...new Set(
        qualifier.prohibitedExtensions
          .map((extension) => extension.trim())
          .filter((extension) => extension.length > 0),
      ),
    ].sort(),
    provenance: {
      admissionId: qualifier.provenance.admissionId.trim(),
      admissionRegistryVersion: qualifier.provenance.admissionRegistryVersion.trim(),
      researchId: qualifier.provenance.researchId.trim(),
      researchVersion: qualifier.provenance.researchVersion.trim(),
      authorityState: qualifier.provenance.authorityState.trim(),
    },
  };
}

function qualifierBindingsByClaimId(
  bindings: readonly CanonicalReadingSemanticQualifierBindingV1[],
  claimIds: ReadonlySet<string>,
): ReadonlyMap<string, readonly CanonicalReadingSemanticQualifierV1[]> {
  const result = new Map<string, CanonicalReadingSemanticQualifierV1[]>();
  const seen = new Set<string>();
  for (const binding of bindings) {
    if (!claimIds.has(binding.targetClaimId)) {
      throw new TypeError(
        `Canonical Reading semantic qualifier targets absent claim: ${binding.targetClaimId}`,
      );
    }
    const qualifier = normalizedQualifier(binding.qualifier);
    const identity = `${binding.targetClaimId}:${qualifier.qualifierId}`;
    if (seen.has(identity)) {
      throw new TypeError(`Duplicate Canonical Reading semantic qualifier binding: ${identity}`);
    }
    seen.add(identity);
    const current = result.get(binding.targetClaimId) ?? [];
    current.push(qualifier);
    result.set(binding.targetClaimId, current);
  }
  return new Map(
    [...result.entries()].map(([claimId, qualifiers]) => [
      claimId,
      [...qualifiers].sort((left, right) => left.qualifierId.localeCompare(right.qualifierId)),
    ]),
  );
}

function semanticKey(claim: InterpretationClaim): string {
  return [
    claim.taxonomy.tier,
    claim.taxonomy.category,
    claim.taxonomy.subcategory ?? 'none',
    claim.claimType,
    claim.subject,
    claim.predicate,
  ].join(':');
}

function relationRefsFor(
  claimId: string,
  relations: readonly ClaimRelation[],
): readonly string[] {
  return relations
    .filter(
      (relation) =>
        relation.fromClaimId === claimId || relation.toClaimId === claimId,
    )
    .map((relation) => relation.relationId)
    .sort();
}

function unitMaterial(
  claim: InterpretationClaim,
  role: CanonicalReadingSemanticRole,
  relations: readonly ClaimRelation[],
  semanticTextBinding?: CanonicalReadingSemanticTextBindingV1,
  semanticQualifiers: readonly CanonicalReadingSemanticQualifierV1[] = [],
) {
  const claimText = canonicalText(claim.value);
  const boundText = semanticTextBinding?.canonicalText;
  if (
    claimText !== undefined &&
    boundText !== undefined &&
    deterministicContentHash(claimText) !== deterministicContentHash(boundText)
  ) {
    throw new TypeError(
      `Canonical Reading semantic text binding conflicts with claim-owned text: ${claim.claimId}`,
    );
  }
  const text = claimText ?? boundText;
  const textProvenance =
    claimText === undefined && boundText !== undefined
      ? semanticTextBinding?.provenance
      : undefined;
  const qualifiers = semanticQualifiers.map(normalizedQualifier);
  const qualifierProhibitions = qualifiers.flatMap(
    (qualifier) => qualifier.prohibitedExtensions,
  );
  return {
    role,
    claimId: claim.claimId,
    ...(claim.scenarioRef === undefined ? {} : { scenarioRef: claim.scenarioRef }),
    taxonomy: claim.taxonomy,
    claimType: claim.claimType,
    subject: claim.subject,
    predicate: claim.predicate,
    semanticKey: semanticKey(claim),
    ...(text === undefined ? {} : { canonicalText: text }),
    ...(textProvenance === undefined
      ? {}
      : { canonicalTextProvenance: normalizedTextProvenance(textProvenance) }),
    semanticPayload: claim.value,
    methodologyRef: claim.methodologyRef,
    ruleRefs: claim.ruleRefs,
    factRefs: [...claim.factRefs].sort(),
    upstreamClaimRefs: [...claim.upstreamClaimRefs].sort(),
    researchEvidenceRefs: [...(claim.researchEvidenceRefs ?? [])].sort(),
    sourceRefs: [...claim.sourceRefs].sort(),
    relationRefs: relationRefsFor(claim.claimId, relations),
    ...(qualifiers.length === 0 ? {} : { semanticQualifiers: qualifiers }),
    prohibitedExtensions: [
      ...new Set([
        ...prohibitedExtensions(claim.value),
        ...qualifierProhibitions,
      ]),
    ].sort(),
    ...(claim.polarity === undefined ? {} : { polarity: claim.polarity }),
    ...(claim.emphasis === undefined ? {} : { emphasis: claim.emphasis }),
  };
}

function makeUnit(
  claim: InterpretationClaim,
  role: CanonicalReadingSemanticRole,
  relations: readonly ClaimRelation[],
  semanticTextBinding?: CanonicalReadingSemanticTextBindingV1,
  semanticQualifiers: readonly CanonicalReadingSemanticQualifierV1[] = [],
): CanonicalReadingSemanticUnitV1 {
  const material = unitMaterial(
    claim,
    role,
    relations,
    semanticTextBinding,
    semanticQualifiers,
  );
  return {
    unitId: `canonical_reading_unit_${deterministicContentHash({
      projectionVersion: CANONICAL_READING_SEMANTIC_PROJECTION_VERSION,
      material,
    }).slice(0, 24)}`,
    ...material,
  };
}

function normalizedIntent(intent: ReadingIntent): ReadingIntent {
  return {
    domain: intent.domain,
    temporalScope: intent.temporalScope,
    ...(intent.relationshipScope === undefined
      ? {}
      : { relationshipScope: intent.relationshipScope }),
  };
}

function semanticHashMaterial(
  bundle: Omit<CanonicalReadingSemanticBundleV1, 'semanticHash'>,
): Omit<CanonicalReadingSemanticBundleV1, 'semanticHash'> {
  return bundle;
}

export function buildCanonicalReadingSemanticBundleV1(
  input: CanonicalReadingSemanticProjectionInputV1,
): CanonicalReadingSemanticBundleV1 {
  const targetClaimIds = [...new Set(input.targetClaimIds)].sort();
  if (targetClaimIds.length === 0) {
    throw new RangeError('Canonical Reading semantic projection requires targetClaimIds.');
  }

  const claims = [...input.evidence.claims].sort((left, right) =>
    left.claimId.localeCompare(right.claimId),
  );
  const claimIds = new Set(claims.map((claim) => claim.claimId));
  for (const claimId of targetClaimIds) {
    if (!claimIds.has(claimId)) {
      throw new TypeError(
        `Canonical Reading target claim is missing from GovernedReadingEvidenceBundleV1: ${claimId}`,
      );
    }
  }

  const targetSet = new Set(targetClaimIds);
  const textBindings = semanticTextBindingsByClaimId(
    input.semanticTextBindings ?? [],
    targetSet,
  );
  const qualifierBindings = qualifierBindingsByClaimId(
    input.semanticQualifierBindings ?? [],
    claimIds,
  );
  const relations = [...input.evidence.claimRelations].sort((left, right) =>
    left.relationId.localeCompare(right.relationId),
  );
  const units = claims.map((claim) =>
    makeUnit(
      claim,
      targetSet.has(claim.claimId) ? 'primary' : 'supporting',
      relations,
      textBindings.get(claim.claimId),
      qualifierBindings.get(claim.claimId) ?? [],
    ),
  );

  const withoutHash: Omit<CanonicalReadingSemanticBundleV1, 'semanticHash'> = {
    schemaVersion: CANONICAL_READING_SEMANTIC_SCHEMA_VERSION,
    projectionVersion: CANONICAL_READING_SEMANTIC_PROJECTION_VERSION,
    intent: normalizedIntent(input.intent),
    snapshotId: input.evidence.snapshotId,
    interpretationRunId: input.evidence.interpretationRunId,
    registrySnapshotId: input.evidence.registrySnapshotId,
    sourceEvidenceHash: deterministicContentHash(input.evidence),
    targetClaimIds,
    units,
    canonicalFacts: [...input.evidence.canonicalFacts],
    claimRelations: relations,
    constraints: CONSTRAINTS,
  };

  const bundle: CanonicalReadingSemanticBundleV1 = {
    ...withoutHash,
    semanticHash: deterministicContentHash(semanticHashMaterial(withoutHash)),
  };
  assertCanonicalReadingSemanticBundleV1(bundle);
  return bundle;
}

export function assertCanonicalReadingSemanticBundleV1(
  value: CanonicalReadingSemanticBundleV1,
): void {
  if (value.schemaVersion !== CANONICAL_READING_SEMANTIC_SCHEMA_VERSION) {
    throw new TypeError('CanonicalReadingSemanticBundleV1.schemaVersion is invalid.');
  }
  if (value.projectionVersion !== CANONICAL_READING_SEMANTIC_PROJECTION_VERSION) {
    throw new TypeError('CanonicalReadingSemanticBundleV1.projectionVersion is invalid.');
  }
  if (value.targetClaimIds.length === 0) {
    throw new RangeError('CanonicalReadingSemanticBundleV1.targetClaimIds must not be empty.');
  }

  const targetSet = new Set(value.targetClaimIds);
  if (targetSet.size !== value.targetClaimIds.length) {
    throw new TypeError('CanonicalReadingSemanticBundleV1.targetClaimIds must be unique.');
  }

  const unitIds = new Set<string>();
  const claimIds = new Set<string>();
  const relationIds = new Set(value.claimRelations.map((relation) => relation.relationId));

  for (const unit of value.units) {
    if (unitIds.has(unit.unitId)) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 unit IDs must be unique.');
    }
    if (claimIds.has(unit.claimId)) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 claim IDs must be unique.');
    }
    const expected = makeUnit(
      {
        claimId: unit.claimId,
        schemaVersion: 'projected',
        snapshotId: value.snapshotId,
        ...(unit.scenarioRef === undefined ? {} : { scenarioRef: unit.scenarioRef }),
        taxonomy: unit.taxonomy,
        claimType: unit.claimType,
        subject: unit.subject,
        predicate: unit.predicate,
        value: unit.semanticPayload,
        methodologyRef: unit.methodologyRef,
        ruleRefs: unit.ruleRefs,
        factRefs: unit.factRefs,
        upstreamClaimRefs: unit.upstreamClaimRefs,
        ...(unit.researchEvidenceRefs.length === 0
          ? {}
          : { researchEvidenceRefs: unit.researchEvidenceRefs }),
        sourceRefs: unit.sourceRefs,
        ...(unit.polarity === undefined ? {} : { polarity: unit.polarity }),
        ...(unit.emphasis === undefined ? {} : { emphasis: unit.emphasis }),
        state: 'active',
      },
      unit.role,
      value.claimRelations,
      unit.canonicalTextProvenance === undefined || unit.canonicalText === undefined
        ? undefined
        : {
            targetClaimId: unit.claimId,
            canonicalText: unit.canonicalText,
            provenance: unit.canonicalTextProvenance,
          },
      unit.semanticQualifiers ?? [],
    );
    if (unit.unitId !== expected.unitId) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 unit identity is invalid.');
    }
    if (unit.semanticKey !== expected.semanticKey) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 semanticKey is invalid.');
    }
    if (deterministicContentHash(unit.canonicalText) !== deterministicContentHash(expected.canonicalText)) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 canonicalText is invalid.');
    }
    if (
      deterministicContentHash(unit.semanticQualifiers) !==
      deterministicContentHash(expected.semanticQualifiers)
    ) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 semanticQualifiers are invalid.');
    }
    if (
      deterministicContentHash(unit.prohibitedExtensions) !==
      deterministicContentHash(expected.prohibitedExtensions)
    ) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 prohibitedExtensions are invalid.');
    }
    if (unit.relationRefs.some((relationRef) => !relationIds.has(relationRef))) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 contains a dangling relation ref.');
    }
    if (targetSet.has(unit.claimId) !== (unit.role === 'primary')) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 target role binding is invalid.');
    }
    unitIds.add(unit.unitId);
    claimIds.add(unit.claimId);
  }

  for (const targetClaimId of value.targetClaimIds) {
    if (!claimIds.has(targetClaimId)) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 target claim has no unit.');
    }
  }

  for (const relation of value.claimRelations) {
    if (!claimIds.has(relation.fromClaimId) || !claimIds.has(relation.toClaimId)) {
      throw new TypeError('CanonicalReadingSemanticBundleV1 relation references an absent claim.');
    }
  }

  const { semanticHash, ...withoutHash } = value;
  const expectedHash = deterministicContentHash(semanticHashMaterial(withoutHash));
  if (semanticHash !== expectedHash) {
    throw new TypeError('CanonicalReadingSemanticBundleV1.semanticHash is invalid.');
  }
}
