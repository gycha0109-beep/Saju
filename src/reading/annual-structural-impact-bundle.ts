import { createHash } from 'node:crypto';
import type { ResolvedStructuralRoleImpact } from '../calculation/structural-role-impact.js';

export const GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE_SCHEMA_VERSION =
  'myeongha-governed-annual-structural-impact-v1' as const;

export const GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE_POLICY = Object.freeze({
  policyId: 'myeongha/governed-annual-structural-impact-bundle-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2277',
  identityRule: 'BIND_SNAPSHOT_YEAR_STRUCTURE_PRODUCER_AND_ASSESSMENTS',
  duplicateAssessmentRule: 'FORBIDDEN',
  duplicateSettlementRule: 'FORBIDDEN',
  semanticProductionRule: 'DO_NOT_DERIVE_ANNUAL_SEMANTICS_HERE',
  extendsDecisionRef: 'GH-2271',
} as const);

export const PRODUCT_ANNUAL_STRUCTURAL_IMPACT_PRODUCER_CAPABILITY = Object.freeze({
  runtimeAvailable: true as const,
  boundedRuntimeAvailable: true as const,
  scope: 'BRANCH_QUIET_SINGLE_DAYUN_SEGMENT_STEM_OVERLAY' as const,
  annualStemOnlyAuthorized: false as const,
  annualBranchIgnoringAuthorized: false as const,
  branchSemanticSettlementAvailable: false as const,
  rootQualifierObservationAvailable: true as const,
  rootSemanticWeightingAvailable: false as const,
  rootFunctionStateOverrideAuthorized: false as const,
  dayunBoundarySettlementAvailable: false as const,
  executableTemporalTriggerOutcomeResolverAuthorized: false as const,
  deterministicEventAuthorized: false as const,
});

export interface GovernedAnnualStructuralImpactProducerRefV1 {
  id: string;
  version: string;
}

export interface GovernedAnnualStructuralImpactBundleInputV1 {
  snapshotId: string;
  targetYear: number;
  structureId: string;
  producerRef: GovernedAnnualStructuralImpactProducerRefV1;
  assessments: readonly ResolvedStructuralRoleImpact[];
}

export interface GovernedAnnualStructuralImpactBundleV1 {
  schemaVersion:
    typeof GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE_SCHEMA_VERSION;
  bundleId: string;
  authority: 'governed_upstream';
  snapshotId: string;
  targetYear: number;
  structureId: string;
  producerRef: GovernedAnnualStructuralImpactProducerRefV1;
  assessments: readonly ResolvedStructuralRoleImpact[];
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

function nonEmpty(value: string, name: string): string {
  const normalized = value.trim();
  if (normalized.length === 0) {
    throw new TypeError(`${name} must be a non-empty string.`);
  }
  return normalized;
}

function validateAssessments(
  structureId: string,
  assessments: readonly ResolvedStructuralRoleImpact[],
): void {
  if (assessments.length === 0) {
    throw new RangeError(
      'Governed annual structural impact bundle requires at least one resolved assessment.',
    );
  }
  if (assessments.some((item) => item.structureId !== structureId)) {
    throw new TypeError(
      'Governed annual structural impact bundle assessments must share the bundle structureId.',
    );
  }

  const assessmentIds = assessments.map((item) => item.assessmentId);
  if (new Set(assessmentIds).size !== assessmentIds.length) {
    throw new TypeError(
      'Governed annual structural impact bundle cannot contain duplicate assessmentId values.',
    );
  }

  const settlementIds = assessments.map((item) => item.settlementId);
  if (new Set(settlementIds).size !== settlementIds.length) {
    throw new TypeError(
      'Governed annual structural impact bundle cannot contain duplicate settlementId values.',
    );
  }
}

function material(
  value: Omit<GovernedAnnualStructuralImpactBundleV1, 'bundleId'>,
): unknown {
  return {
    schemaVersion: value.schemaVersion,
    policyId: GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE_POLICY.policyId,
    policyVersion:
      GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE_POLICY.policyVersion,
    authority: value.authority,
    snapshotId: value.snapshotId,
    targetYear: value.targetYear,
    structureId: value.structureId,
    producerRef: value.producerRef,
    assessments: value.assessments,
  };
}

function expectedBundleId(
  value: Omit<GovernedAnnualStructuralImpactBundleV1, 'bundleId'>,
): string {
  const hash = createHash('sha256')
    .update(JSON.stringify(canonicalize(material(value))))
    .digest('hex');
  return `annual_structural_impact_${hash.slice(0, 24)}`;
}

export function createGovernedAnnualStructuralImpactBundleV1(
  input: GovernedAnnualStructuralImpactBundleInputV1,
): GovernedAnnualStructuralImpactBundleV1 {
  const snapshotId = nonEmpty(input.snapshotId, 'snapshotId');
  const structureId = nonEmpty(input.structureId, 'structureId');
  const producerRef = {
    id: nonEmpty(input.producerRef.id, 'producerRef.id'),
    version: nonEmpty(input.producerRef.version, 'producerRef.version'),
  };

  if (!Number.isInteger(input.targetYear) || input.targetYear < 1) {
    throw new RangeError('targetYear must be a positive integer.');
  }

  validateAssessments(structureId, input.assessments);

  const withoutId = {
    schemaVersion: GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE_SCHEMA_VERSION,
    authority: 'governed_upstream' as const,
    snapshotId,
    targetYear: input.targetYear,
    structureId,
    producerRef,
    assessments: [...input.assessments],
  };

  return {
    ...withoutId,
    bundleId: expectedBundleId(withoutId),
  };
}

export function assertGovernedAnnualStructuralImpactBundleV1(
  value: GovernedAnnualStructuralImpactBundleV1,
): void {
  if (
    value.schemaVersion !==
      GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE_SCHEMA_VERSION ||
    value.authority !== 'governed_upstream'
  ) {
    throw new TypeError(
      'Governed annual structural impact bundle schema or authority is invalid.',
    );
  }

  nonEmpty(value.snapshotId, 'snapshotId');
  nonEmpty(value.structureId, 'structureId');
  nonEmpty(value.producerRef.id, 'producerRef.id');
  nonEmpty(value.producerRef.version, 'producerRef.version');

  if (!Number.isInteger(value.targetYear) || value.targetYear < 1) {
    throw new RangeError('targetYear must be a positive integer.');
  }

  validateAssessments(value.structureId, value.assessments);

  const { bundleId, ...withoutId } = value;
  if (bundleId !== expectedBundleId(withoutId)) {
    throw new TypeError(
      'Governed annual structural impact bundle content hash is invalid.',
    );
  }
}
