import { createHash } from 'node:crypto';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { ResolvedStructuralRoleImpact } from '../calculation/structural-role-impact.js';
import {
  resolveTemporalStructureTransition,
  type GovernedTemporalStructureBaseline,
  type ResolvedTemporalStructureTransition,
  type TemporalStructurePeriod,
  type UnavailableTemporalStructureTransition,
} from '../calculation/temporal-structure-transition.js';
import {
  buildAnnualInterpretationFacts,
  type AnnualInterpretationFacts,
} from './annual-interpretation-facts.js';
import { buildTemporalReadingContext } from './temporal-reading-context.js';

export const PRODUCT_ANNUAL_TEMPORAL_STRUCTURE_INTEGRATION_POLICY = Object.freeze({
  policyId: 'myeongha/product-annual-temporal-structure-integration-v1',
  policyVersion: '1.0.0',
  decisionAuthority: 'PROJECT_OWNER',
  decisionRef: 'GH-2260',
  annualFactRule: 'ANNUAL_FACTS_ARE_PERIOD_INPUTS_NOT_INTERPRETATION_AUTHORITY',
  semanticInputRule: 'REQUIRE_GOVERNED_R192_ASSESSMENTS',
  transitionRule: 'DELEGATE_TO_R193',
  annualStemMeaningRule: 'DO_NOT_INFER_STRUCTURE_IMPACT',
  annualBranchMeaningRule: 'DO_NOT_INFER_BREAK_OR_EVENT',
  dayunRuntimeRule: 'UNAVAILABLE_UNTIL_GOVERNED_PRODUCT_INPUT_EXISTS',
  extendsDecisionRef: 'GH-2255',
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
  runtimeAvailable: false as const,
  reasonCode: 'DAYUN_RUNTIME_INPUT_NOT_AVAILABLE' as const,
  readingTemporalScopeAvailable: false as const,
  readingTargetPeriodAvailable: false as const,
  executableDayunMethodResolverAvailable: false as const,
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
    | 'TEMPORAL_STRUCTURE_TRANSITION_UNAVAILABLE';
  transitionReasonCode?: UnavailableTemporalStructureTransition['reasonCode'];
  semanticInputAssessmentIds: readonly string[];
}

export type AnnualTemporalStructureIntegrationResult =
  | ResolvedAnnualTemporalStructureIntegration
  | UnavailableAnnualTemporalStructureIntegration;

function unavailable(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
  baseline: GovernedTemporalStructureBaseline,
  assessments: readonly ResolvedStructuralRoleImpact[],
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
    semanticInputAssessmentIds: assessments
      .map((item) => item.assessmentId)
      .sort(),
  };
}

export function resolveAnnualTemporalStructureIntegration(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
  baseline: GovernedTemporalStructureBaseline,
  assessments: readonly ResolvedStructuralRoleImpact[],
): AnnualTemporalStructureIntegrationResult {
  if (request.intent.temporalScope !== 'annual') {
    return unavailable(
      snapshot,
      request,
      baseline,
      assessments,
      'ANNUAL_REQUEST_REQUIRED',
    );
  }

  if (request.targetPeriod === undefined || request.targetPeriod.scope !== 'annual') {
    return unavailable(
      snapshot,
      request,
      baseline,
      assessments,
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
      assessments,
      'ANNUAL_CONTEXT_BUILD_FAILED',
    );
  }

  if (temporalContext === undefined || temporalContext.scope !== 'annual') {
    return unavailable(
      snapshot,
      request,
      baseline,
      assessments,
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
      assessments,
      'ANNUAL_FACT_BUILD_FAILED',
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
    assessments,
  );

  if (transition.status !== 'resolved') {
    return unavailable(
      snapshot,
      request,
      baseline,
      assessments,
      'TEMPORAL_STRUCTURE_TRANSITION_UNAVAILABLE',
      transition.reasonCode,
    );
  }

  const semanticInputAssessmentIds = assessments
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
    semanticInputAssessmentIds,
  };
}
