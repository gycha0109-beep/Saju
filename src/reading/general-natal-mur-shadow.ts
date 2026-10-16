import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { ReadingEvidenceSelection } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ProductReadingResponse } from './product-reading-response.js';

export const GENERAL_NATAL_MUR_SHADOW_VERSION =
  'myeonghwa-general-natal-minimum-useful-reading-shadow-v1' as const;

export type GeneralNatalMurShadowState =
  | 'insufficient'
  | 'limited'
  | 'blocked_authority'
  | 'ambiguous'
  | 'useful_complete';

export type GeneralNatalMurShadowReason =
  | 'NO_CONSUMER_READING'
  | 'TECHNICAL_COVERAGE_NOT_COMPLETE'
  | 'NO_SELECTED_GENERAL_NATAL_T8'
  | 'ONLY_GENERIC_THEME_OR_STRUCTURAL_OBSERVATION'
  | 'CORE_CANDIDATE_RESEARCH_ONLY'
  | 'CORE_PATTERN_NOT_EXPLICITLY_ADMITTED'
  | 'CORE_UPSTREAM_EVIDENCE_NOT_INDEPENDENT'
  | 'SCENARIO_COVERAGE_UNVERIFIED'
  | 'SCENARIO_DIFFERENCES_NOT_RESOLVED';

export interface GeneralNatalMurShadowInput {
  snapshotId: string;
  interpretation: InterpretationExecutionResult;
  selection: ReadingEvidenceSelection;
  response: ProductReadingResponse;
}

export interface GeneralNatalMurScenarioShadow {
  scenarioRef: string | null;
  selectedThemeClaimTypes: readonly string[];
  candidateCoreClaimTypes: readonly string[];
  independentUpstreamClaimCount: number;
  coreAdmitted: false;
  usefulComplete: false;
}

export interface GeneralNatalMurShadowReport {
  version: typeof GENERAL_NATAL_MUR_SHADOW_VERSION;
  lifecycle: 'internal_quality_shadow';
  mayChangeProductDelivery: false;
  mayApproveResearchSemantics: false;
  mayPublish: false;
  maySell: false;
  technicalCoverage: ReadingEvidenceSelection['coverageState'];
  consumerState: ProductReadingResponse['state'];
  technicalDelivered: boolean;
  state: GeneralNatalMurShadowState;
  usefulComplete: false;
  reasons: readonly GeneralNatalMurShadowReason[];
  selectedT8Count: number;
  selectedGenericThemeCount: number;
  candidateCoreCount: number;
  scenarios: readonly GeneralNatalMurScenarioShadow[];
}

const GENERIC_THEME = /^GENERAL_NATAL_(?:PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(?:VISIBLE_STEMS|BRANCHES)_THEME$/u;
const CORE_SUBCATEGORIES = new Set([
  'core_conclusion', 'strength_conclusion', 'tension_conclusion', 'source_bounded_relation',
]);

function isGenericTheme(claim: InterpretationClaim): boolean {
  return GENERIC_THEME.test(claim.claimType) ||
    claim.taxonomy.subcategory === 'self_baseline' ||
    claim.taxonomy.subcategory === 'month_branch_structural_context' ||
    claim.taxonomy.subcategory === 'scope_guard';
}

function isCandidateCore(claim: InterpretationClaim): boolean {
  return claim.taxonomy.subcategory !== undefined &&
    CORE_SUBCATEGORIES.has(claim.taxonomy.subcategory);
}

function uniqueSorted<T extends string>(items: readonly T[]): T[] {
  return [...new Set(items)].sort();
}

/**
 * Fail-closed product-quality probe; not a new semantic admission registry.
 *
 * There is currently no General Natal core synthesis with an independently
 * approved, exact pattern + source + methodology admission. Accordingly this
 * shadow cannot grant useful_complete. A future verified core admission must
 * be integrated through the separately governed admission/release boundary,
 * not through a boolean or a caller-supplied bypass here.
 */
export function evaluateGeneralNatalMurShadowV1(
  input: GeneralNatalMurShadowInput,
): GeneralNatalMurShadowReport {
  if (input.snapshotId !== input.interpretation.run.snapshotId) {
    throw new TypeError('MUR evidence must reference the identical canonical snapshot.');
  }
  if (input.selection.intent.domain !== 'general' ||
      input.selection.intent.temporalScope !== 'natal' ||
      input.selection.intent.relationshipScope !== undefined) {
    throw new TypeError('General Natal MUR cannot classify another reading intent.');
  }
  if (new Set(input.selection.selectedClaimIds).size !== input.selection.selectedClaimIds.length) {
    throw new TypeError('MUR selected claim IDs must be unique.');
  }

  const activeById = new Map(input.interpretation.claims
    .filter((claim) => claim.state === 'active')
    .map((claim) => [claim.claimId, claim]));
  if (activeById.size !== input.interpretation.claims.filter((claim) => claim.state === 'active').length) {
    throw new TypeError('MUR active claim IDs must be unique.');
  }
  const selected = input.selection.selectedClaimIds.map((id) => {
    const claim = activeById.get(id);
    if (claim === undefined) throw new TypeError('MUR selected Claim not present in the interpretation: ' + id);
    if (claim.snapshotId !== input.snapshotId) throw new TypeError('MUR claim snapshot mismatch: ' + id);
    return claim;
  });
  const t8 = selected.filter((claim) =>
    claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'general');
  const generic = t8.filter(isGenericTheme);
  const coreCandidates = t8.filter(isCandidateCore);

  const refs = uniqueSorted(selected.map((claim) => claim.scenarioRef ?? ''));
  const scenarios = refs.length === 0 ? [''] : refs;
  const perScenario: GeneralNatalMurScenarioShadow[] = scenarios.map((ref) => {
    const current = t8.filter((claim) => (claim.scenarioRef ?? '') === ref);
    const cores = current.filter(isCandidateCore);
    return {
      scenarioRef: ref === '' ? null : ref,
      selectedThemeClaimTypes: uniqueSorted(current.filter(isGenericTheme).map((claim) => claim.claimType)),
      candidateCoreClaimTypes: uniqueSorted(cores.map((claim) => claim.claimType)),
      independentUpstreamClaimCount: new Set(cores.flatMap((claim) => claim.upstreamClaimRefs)).size,
      coreAdmitted: false,
      usefulComplete: false,
    };
  });

  const technicalDelivered = input.response.state === 'delivered' ||
    input.response.state === 'delivered_with_fallback';
  const reasons: GeneralNatalMurShadowReason[] = [];
  if (!technicalDelivered) reasons.push('NO_CONSUMER_READING');
  if (input.selection.coverageState !== 'complete') reasons.push('TECHNICAL_COVERAGE_NOT_COMPLETE');
  if (t8.length === 0) reasons.push('NO_SELECTED_GENERAL_NATAL_T8');
  if (t8.length > 0 && t8.every(isGenericTheme)) {
    reasons.push('ONLY_GENERIC_THEME_OR_STRUCTURAL_OBSERVATION');
  }
  if (coreCandidates.length > 0) {
    reasons.push('CORE_CANDIDATE_RESEARCH_ONLY');
    reasons.push('CORE_PATTERN_NOT_EXPLICITLY_ADMITTED');
    if (coreCandidates.some((claim) => new Set(claim.upstreamClaimRefs).size < 2)) {
      reasons.push('CORE_UPSTREAM_EVIDENCE_NOT_INDEPENDENT');
    }
  } else {
    reasons.push('CORE_PATTERN_NOT_EXPLICITLY_ADMITTED');
  }

  const scenarioRefs = uniqueSorted(input.selection.scenarioRefs);
  if (scenarioRefs.length > 0 && input.selection.scenarioCoverage === undefined) {
    reasons.push('SCENARIO_COVERAGE_UNVERIFIED');
  }
  if (input.selection.scenarioCoverage?.some((coverage) => coverage.coverageState !== 'complete')) {
    reasons.push('SCENARIO_DIFFERENCES_NOT_RESOLVED');
  }
  const state: GeneralNatalMurShadowState = !technicalDelivered || t8.length === 0
    ? 'insufficient'
    : reasons.includes('SCENARIO_COVERAGE_UNVERIFIED') ||
      reasons.includes('SCENARIO_DIFFERENCES_NOT_RESOLVED')
      ? 'ambiguous'
      : coreCandidates.length > 0
        ? 'blocked_authority' : 'limited';
  return {
    version: GENERAL_NATAL_MUR_SHADOW_VERSION,
    lifecycle: 'internal_quality_shadow',
    mayChangeProductDelivery: false,
    mayApproveResearchSemantics: false,
    mayPublish: false,
    maySell: false,
    technicalCoverage: input.selection.coverageState,
    consumerState: input.response.state,
    technicalDelivered,
    state,
    usefulComplete: false,
    reasons: uniqueSorted(reasons),
    selectedT8Count: t8.length,
    selectedGenericThemeCount: generic.length,
    candidateCoreCount: coreCandidates.length,
    scenarios: perScenario,
  };
}
