import type { ClaimRelation, InterpretationClaim } from '../contracts/interpretation.js';
import type { NarrativeEvidenceBundle, SelectedFact } from '../contracts/narrative.js';
import type { ReadingIntent } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const CANONICAL_READING_SEMANTIC_SCHEMA_VERSION =
  'myeonghwa-canonical-reading-semantics-v1' as const;
export const CANONICAL_READING_SEMANTIC_PROJECTION_VERSION =
  'myeonghwa-canonical-reading-semantic-projection-v1' as const;

export type CanonicalReadingSemanticRole = 'primary' | 'supporting';

export interface CanonicalReadingSemanticTextV1 {
  headline?: string;
  summary?: string;
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
  semanticPayload: unknown;
  methodologyRef: InterpretationClaim['methodologyRef'];
  ruleRefs: InterpretationClaim['ruleRefs'];
  factRefs: readonly string[];
  upstreamClaimRefs: readonly string[];
  researchEvidenceRefs: readonly string[];
  sourceRefs: readonly string[];
  relationRefs: readonly string[];
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
  evidence: NarrativeEvidenceBundle;
  targetClaimIds: readonly string[];
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
) {
  const text = canonicalText(claim.value);
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
    semanticPayload: claim.value,
    methodologyRef: claim.methodologyRef,
    ruleRefs: claim.ruleRefs,
    factRefs: [...claim.factRefs].sort(),
    upstreamClaimRefs: [...claim.upstreamClaimRefs].sort(),
    researchEvidenceRefs: [...(claim.researchEvidenceRefs ?? [])].sort(),
    sourceRefs: [...claim.sourceRefs].sort(),
    relationRefs: relationRefsFor(claim.claimId, relations),
    prohibitedExtensions: prohibitedExtensions(claim.value),
    ...(claim.polarity === undefined ? {} : { polarity: claim.polarity }),
    ...(claim.emphasis === undefined ? {} : { emphasis: claim.emphasis }),
  };
}

function makeUnit(
  claim: InterpretationClaim,
  role: CanonicalReadingSemanticRole,
  relations: readonly ClaimRelation[],
): CanonicalReadingSemanticUnitV1 {
  const material = unitMaterial(claim, role, relations);
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
        `Canonical Reading target claim is missing from NarrativeEvidenceBundle: ${claimId}`,
      );
    }
  }

  const targetSet = new Set(targetClaimIds);
  const relations = [...input.evidence.claimRelations].sort((left, right) =>
    left.relationId.localeCompare(right.relationId),
  );
  const units = claims.map((claim) =>
    makeUnit(claim, targetSet.has(claim.claimId) ? 'primary' : 'supporting', relations),
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
