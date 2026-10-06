import { createHash } from 'node:crypto';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import {
  resolveTemporalStructureTransition,
  type GovernedTemporalStructureBaseline,
  type ResolvedTemporalStructureTransition,
  type TemporalStructurePeriod,
  type UnavailableTemporalStructureTransition,
} from '../calculation/temporal-structure-transition.js';
import {
  assertGovernedAnnualStructuralImpactBundleV1,
  type GovernedAnnualStructuralImpactBundleV1,
} from './annual-structural-impact-bundle.js';
import {
  buildAnnualInterpretationFacts,
  type AnnualInterpretationFacts,
} from './annual-interpretation-facts.js';
import { buildTemporalReadingContext } from './temporal-reading-context.js';

export const PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY = Object.freeze({
  policyId: 'myeongha/product-annual-temporal-structure-integration-v1',
  policyVersion: '1.1.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2277',
  annualFactRule: 'ANNUAL_FACTS_ARE_PERIOD_INPUTS_NOT_INTERPRETATION_AUTHORITY',
  semanticInputRule: 'REQUIRE_GOVERNED_ANNUAL_STRUCTURAL_IMPACT_BUNDLE',
  semanticBindingRule: 'MATCH_SNAPSHOT_YEAR_AND_STRUCTURE',
  transitionRule: 'DELEGATE_TO_R193',
  annualStemMeaningRule: 'DO_NOT_INFER_STRUCTURE_IMPACT',
  annualBranchMeaningRule: 'DO_NOT_INFER_BREAK_OR_EVENT',
  dayunRuntimeRule: 'UNAVAILABLE_UNTIL_GOVERNED_PRODUCT_INPUT_EXISTS',
  extendsDecisionRef: 'GH-2271',
} as const);

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

export const PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY_CONTENT_HASH =
  createHash('sha256')
    .update(
      JSON.stringify(
        canonicalize(PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY),
      ),
    )
    .digest('hex');

export const PRODUCT_DAYUN_TEMPORAL_RUNTIME_CAPABILITY = Object.freeze({
  runtimeAvailable: true as const,
  temporalContextAvailable: true as const,
  readingTemporalScopeAvailable: false as const,
  readingTargetPeriodAvailable: false as const,
  executableDayunMethodResolverAvailable: false as const,
  semanticCompositionAvailable: false as const,
});

export interface ResolvedAnnualTemporalStructureIntegration {
  status: 'resolved';
  integrationId: string;
  requestId: string;
  snapshotId: string;
  structureId: string;
  annualFacts: AnnualInterpretationFacts;
  period: TemporalStructurePeriod & {
    scope: 'annual';
  };
  transition: ResolvedTemporalStructureTransition;
  semanticInputBundleId: string;
  semanticInputAssessmentIds: readonly string[];
}

export interface UnavailableAnnualTemporalStructureIntegration {
  status: 'unavailable';
  requestId: string;
  snapshotId: string;
  structureId: string;
  reasonCode:
    | 'ANNUAL_REQUEST_REQUIRED'
    | 'ANNUAL_TARGET_PERIOD_REQUIRED'
    | 'ANNUAL_CONTEXT_BUILD_FAILED'
    | 'ANNUAL_FACT_BUILD_FAILED'
    | 'ANNUAL_IMPACT_BUNDLE_INVALID'
    | 'ANNUAL_IMPACT_SNAPSHOT_MISMATCH'
    | 'ANNUAL_IMPACT_YEAR_MISMATCH'
    | 'ANNUAL_IMPACT_STRUCTURE_MISMATCH'
    | 'TEMPORAL_STRUCTURE_TRANSITION_UNAVAILABLE';
  transitionReasonCode?: UnavailableTemporalStructureTransition['reasonCode'];
  semanticInputBundleId: string;
  semanticInputAssessmentIds: readonly string[];
}

export type AnnualTemporalStructureIntegrationResult =
  | ResolvedAnnualTemporalStructureIntegration
  | UnavailableAnnualTemporalStructureIntegration;

function unavailable(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
  baseline: GovernedTemporalStructureBaseline,
  impactBundle: GovernedAnnualStructuralImpactBundleV1,
  reasonCode: UnavailableAnnualTemporalStructureIntegration['reasonCode'],
  transitionReasonCode?: UnavailableAnnualTemporalStructureIntegration['transitionReasonCode'],
): UnavailableAnnualTemporalStructureIntegration {
  return {
    status: 'unavailable',
    requestId: request.requestId,
    snapshotId: snapshot.snapshotId,
    structureId: baseline.structureId,
    reasonCode,
    ...(transitionReasonCode === undefined ? {} : { transitionReasonCode }),
    semanticInputBundleId: impactBundle.bundleId,
    semanticInputAssessmentIds: impactBundle.assessments
      .map((item) => item.assessmentId)
      .sort(),
  };
}

export function resolveAnnualTemporalStructureIntegration(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
  baseline: GovernedTemporalStructureBaseline,
  impactBundle: GovernedAnnualStructuralImpactBundleV1,
): AnnualTemporalStructureIntegrationResult {
  if (request.intent.temporalScope !== 'annual') {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_REQUEST_REQUIRED',
    );
  }

  if (request.targetPeriod === undefined || request.targetPeriod.scope !== 'annual') {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_TARGET_PERIOD_REQUIRED',
    );
  }

  let temporalContext;
  try {
    temporalContext = buildTemporalReadingContext(request);
  } catch {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_CONTEXT_BUILD_FAILED',
    );
  }

  if (temporalContext === undefined || temporalContext.scope !== 'annual') {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_CONTEXT_BUILD_FAILED',
    );
  }

  let annualFacts: AnnualInterpretationFacts;
  try {
    annualFacts = buildAnnualInterpretationFacts(snapshot, temporalContext);
  } catch {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_FACT_BUILD_FAILED',
    );
  }

  try {
    assertGovernedAnnualStructuralImpactBundleV1(impactBundle);
  } catch {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_IMPACT_BUNDLE_INVALID',
    );
  }

  if (impactBundle.snapshotId !== snapshot.snapshotId) {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_IMPACT_SNAPSHOT_MISMATCH',
    );
  }

  if (impactBundle.targetYear !== annualFacts.targetYear) {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_IMPACT_YEAR_MISMATCH',
    );
  }

  if (impactBundle.structureId !== baseline.structureId) {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'ANNUAL_IMPACT_STRUCTURE_MISMATCH',
    );
  }

  const period: TemporalStructurePeriod & { scope: 'annual' } = {
    scope: 'annual',
    periodKey: `annual:${annualFacts.targetYear}`,
    sequence: annualFacts.targetYear,
  };

  const transition = resolveTemporalStructureTransition(
    baseline,
    period,
    impactBundle.assessments,
  );

  if (transition.status !== 'resolved') {
    return unavailable(
      snapshot,
      request,
      baseline,
      impactBundle,
      'TEMPORAL_STRUCTURE_TRANSITION_UNAVAILABLE',
      transition.reasonCode,
    );
  }

  const semanticInputAssessmentIds = impactBundle.assessments
    .map((item) => item.assessmentId)
    .sort();
  const integrationMaterial = {
    policyContentHash:
      PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY_CONTENT_HASH,
    requestId: request.requestId,
    snapshotId: snapshot.snapshotId,
    structureId: baseline.structureId,
    annualFactIdentity: {
      targetYear: annualFacts.targetYear,
      annualPillar: annualFacts.annualPillar,
      annualStemTenGod: annualFacts.annualStemTenGod,
    },
    period,
    semanticInputBundleId: impactBundle.bundleId,
    semanticInputAssessmentIds,
    transitionId: transition.transitionId,
  };
  const integrationId = `annual_temporal_structure_${createHash('sha256')
    .update(JSON.stringify(canonicalize(integrationMaterial)))
    .digest('hex')
    .slice(0, 24)}`;

  return {
    status: 'resolved',
    integrationId,
    requestId: request.requestId,
    snapshotId: snapshot.snapshotId,
    structureId: baseline.structureId,
    annualFacts,
    period,
    transition,
    semanticInputBundleId: impactBundle.bundleId,
    semanticInputAssessmentIds,
  };
}
