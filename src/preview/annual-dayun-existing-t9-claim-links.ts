import type { GeneralAnnualMonthlyExplorationReport } from
  './general-annual-monthly-exploration-report.js';
import type { MonthlySegmentId } from '../reading/monthly-interpretation-facts.js';
import {
  R153_AUTHORITY,
  R153_LAYER_REQUIREMENT_ROWS,
} from '../research/general-natal-annual-stem-branch-dayun-layering-corpus.js';
import { R154_AUTHORITY } from
  '../research/general-natal-dayun-annual-conflict-order-sensitivity-corpus.js';

export const ANNUAL_DAYUN_T9_PRECONDITION_VERSION =
  'myeongha-annual-dayun-existing-t9-evidence-prerequisite-v1' as const;

export type AnnualDayunRelationState =
  | 'branch_clash_observed'
  | 'branch_six_combination_observed'
  | 'no_clash_or_six_combination_observed'
  | 'dayun_unavailable';

export interface ExistingT9CompositionEvidenceLink {
  segmentId: MonthlySegmentId;
  startsAt: string;
  endsAtExclusive: string;
  /** Original T9 Research Claim, never a claim issued by this module. */
  existingT9ClaimId: string | null;
  existingT9MethodologyId: string | null;
  existingT9RuleIds: readonly string[];
  existingT9SourceIds: readonly string[];
  originalT9EvidencePaths: readonly string[];
  existingT9Link: 'matched_source_owned_theme' | 'missing_original_theme';
  annualDayunRelation: AnnualDayunRelationState;
  /** Natal day master is a necessary, not sufficient, condition for interpretive composition. */
  natalDayStemAvailable: boolean;
  natalAnnualRelationCount: number;
  annualDayunStructuralSources: readonly string[];
  sourceMethodPrerequisites: readonly string[];
  observationStatus: 'facts_observed' | 'incomplete';
  compositionMeaningState: 'not_admitted';
  newlyEmittedT9Claims: 0;
  rankOrOutcomeEstablished: false;
  koreanExplanation: string;
}

export interface AnnualDayunT9PreconditionReview {
  version: typeof ANNUAL_DAYUN_T9_PRECONDITION_VERSION;
  scope: 'existing_monthly_t9_claim_evidence_link_only';
  researchOnly: true;
  snapshotId: string;
  calculationHash: string;
  targetYear: number;
  targetMonth: number;
  methodologyCorpus: 'R153';
  conflictOrderCorpus: 'R154';
  existingT9ClaimLinks: readonly ExistingT9CompositionEvidenceLink[];
  sourceQualifiedCrossLayerMeaningEstablished: false;
  interpretationClaimEmissionAuthorized: false;
  mayPublish: false;
  maySell: false;
  mayGrantOfficialAuthority: false;
}

type Source = Pick<GeneralAnnualMonthlyExplorationReport,
  'snapshotId' | 'calculationHash' | 'targetYear' | 'targetMonth' |
  'annual' | 'monthly' | 'conditionalComposition' | 'observedStructuralContext'>;

const REQUIRED = [
  'ANNUAL_STEM_COMPONENT_RETAINED',
  'ANNUAL_BRANCH_COMPONENT_RETAINED',
  'NATAL_DAY_STEM_CONTEXT_REQUIRED',
  'DAYUN_CONTEXT_REQUIRED',
  'MEETING_COMBINATION_CHECK_REQUIRED',
  'PUNISHMENT_CLASH_CHECK_REQUIRED',
] as const;

function assertResearchBoundary(report: Source): void {
  if (!R153_AUTHORITY.researchOnly ||
      R153_AUTHORITY.interpretationClaimEmissionAuthorized ||
      R153_AUTHORITY.executableAnnualCompositionResolverAuthorized ||
      R154_AUTHORITY.interpretationClaimEmissionAuthorized ||
      R154_AUTHORITY.executableTemporalSettlementAuthorized ||
      R154_AUTHORITY.firstMatchWinsAuthorized ||
      R154_AUTHORITY.relationCountAsSeverityAuthorized ||
      REQUIRED.some(id => !R153_LAYER_REQUIREMENT_ROWS.some(row =>
        row.requirementId === id && row.requiredForFaithfulR074Composition &&
        !row.interpretationClaimEmissionAuthorized)) ||
      report.conditionalComposition.scope !== 'research_structural_conditions_only' ||
      report.conditionalComposition.snapshotId !== report.snapshotId ||
      report.conditionalComposition.calculationHash !== report.calculationHash ||
      report.conditionalComposition.targetYear !== report.targetYear ||
      report.conditionalComposition.targetMonth !== report.targetMonth ||
      report.conditionalComposition.interpretationAuthorityGranted ||
      report.conditionalComposition.mayPublish || report.conditionalComposition.maySell ||
      report.annual.targetYear !== report.targetYear ||
      report.annual.annualPillarLabel !== report.observedStructuralContext.annualPillarLabel ||
      report.annual.annualStemTenGod !== report.observedStructuralContext.annualStemTenGod ||
      report.observedStructuralContext.annualPillarLabel.length < 2 ||
      report.conditionalComposition.slices.some(slice=>
        !report.observedStructuralContext.annualPillarLabel.endsWith(slice.annualBranch)) ||
      report.monthly.targetYear !== report.targetYear ||
      report.monthly.targetMonth !== report.targetMonth ||
      report.annual.calendarPolicy !== 'civil_year_only' ||
      !report.monthly.researchOnly || report.monthly.mayPublish || report.monthly.maySell ||
      report.conditionalComposition.annualCalendarPolicy !== 'civil_year_only') {
    throw new TypeError('R153/R154 conditional T9 evidence cannot cross source or chart authority.');
  }
}

function relationState(
  slice: Source['conditionalComposition']['slices'][number],
): { state: AnnualDayunRelationState; sources: readonly string[] } {
  if (slice.dayunStatus !== 'resolved' || !slice.dayunBranch) {
    return { state: 'dayun_unavailable', sources: [] };
  }
  const related = slice.relations.filter(rel =>
    (rel.left.layer === 'annual' && rel.right.layer === 'dayun') ||
    (rel.left.layer === 'dayun' && rel.right.layer === 'annual'));
  if (related.length > 1 || related.some(rel =>
      (rel.left.layer === 'annual' ? rel.left.branch : rel.right.branch) !== slice.annualBranch ||
      (rel.left.layer === 'dayun' ? rel.left.branch : rel.right.branch) !== slice.dayunBranch ||
      !rel.structuralMatchOnly || rel.transformationEstablished ||
      rel.eventPredictionAuthorized || !rel.sourceIds.length)) {
    throw new TypeError('An annual–Dayun candidate must match one source-owned pair exactly.');
  }
  const found = related[0];
  const state = found?.kind === 'branch_clash'
    ? 'branch_clash_observed' as const
    : found?.kind === 'branch_six_combination'
      ? 'branch_six_combination_observed' as const
      : 'no_clash_or_six_combination_observed' as const;
  return { state, sources: found?.sourceIds ?? [] };
}

/**
 * Attaches checked annual/Daeyun observations to existing selected monthly T9
 * research Claim IDs. NEVER creates an InterpretationClaim, RuleDefinition, or
 * an authorization. R153 explicitly forbids automatic composition/emission.
 */
export function buildAnnualDayunExistingT9ClaimLinks(
  report: Source,
): AnnualDayunT9PreconditionReview {
  assertResearchBoundary(report);
  const links: ExistingT9CompositionEvidenceLink[] = [];
  for (const slice of report.conditionalComposition.slices) {
    const themes = report.monthly.sections.filter(section =>
      section.kind === 'theme' && section.segmentId === slice.segmentId &&
      Date.parse(section.calculatedInterval.startsAt) <= Date.parse(slice.startsAt) &&
      Date.parse(slice.endsAtExclusive) <= Date.parse(section.calculatedInterval.endsAt));
    if (themes.length > 1) throw new TypeError('A temporal slice has ambiguous original T9 themes.');
    const theme = themes[0];
    if (theme && (!theme.claimId || !theme.methodologyId ||
        !theme.sourceIds.length || !theme.ruleIds.length ||
        !theme.factPaths.includes('temporal.jeolBoundary.at') ||
        !theme.factPaths.includes(
          'temporal.segmentsById.' + slice.segmentId + '.monthlyPillar'))) {
      throw new TypeError('Existing T9 Claim source and exact Jeol evidence are required.');
    }
    const { state, sources } = relationState(slice);
    const natalAnnual = slice.relations.filter(rel =>
      (rel.left.layer === 'natal' && rel.right.layer === 'annual') ||
      (rel.left.layer === 'annual' && rel.right.layer === 'natal'));
    const observed = theme !== undefined && slice.dayunStatus === 'resolved' &&
      report.observedStructuralContext.natalDayStem !== null;
    const stateText = state === 'branch_clash_observed'
      ? '연운 지지와 대운 지지 사이의 충이 관측됩니다.'
      : state === 'branch_six_combination_observed'
        ? '연운 지지와 대운 지지 사이의 육합이 관측됩니다.'
        : state === 'dayun_unavailable'
          ? '대운 구간을 확정할 수 없어 연운과 대운 지지의 관계를 판정하지 않습니다.'
          : '연운 지지와 대운 지지 사이의 충·육합은 관측되지 않았습니다.';
    links.push({
      segmentId: slice.segmentId,
      startsAt: slice.startsAt,
      endsAtExclusive: slice.endsAtExclusive,
      existingT9ClaimId: theme?.claimId ?? null,
      existingT9MethodologyId: theme?.methodologyId ?? null,
      existingT9RuleIds: theme?.ruleIds ?? [],
      existingT9SourceIds: theme?.sourceIds ?? [],
      originalT9EvidencePaths: theme?.factPaths ?? [],
      existingT9Link: theme ? 'matched_source_owned_theme' : 'missing_original_theme',
      annualDayunRelation: state,
      natalDayStemAvailable: report.observedStructuralContext.natalDayStem !== null,
      natalAnnualRelationCount: natalAnnual.length,
      annualDayunStructuralSources: sources,
      sourceMethodPrerequisites: REQUIRED.map(id =>
        R153_LAYER_REQUIREMENT_ROWS.find(row => row.requirementId === id)!.rowId),
      observationStatus: observed ? 'facts_observed' : 'incomplete',
      compositionMeaningState: 'not_admitted',
      newlyEmittedT9Claims: 0,
      rankOrOutcomeEstablished: false,
      koreanExplanation:
        (theme ? '기존 월운 T9 연구 Claim ' + theme.claimId + '의 적용 구간입니다. '
          : '이 구간에 출처가 연결된 기존 월운 T9 연구 Claim이 없습니다. ') +
        stateText + ' 원국과 연운 지지 사이에는 충·육합 관계가 ' +
        natalAnnual.length + '건 관측되었습니다. ' +
        '이는 관계의 성립 여부만 나타내며 우세·길흉·사건을 판단하지 않습니다. ' +
        'R153·R154의 합성 의미 발행 권한이 없어 새로운 T9 풀이를 만들지 않습니다.',
    });
  }
  return {
    version: ANNUAL_DAYUN_T9_PRECONDITION_VERSION,
    scope: 'existing_monthly_t9_claim_evidence_link_only',
    researchOnly: true,
    snapshotId: report.snapshotId,
    calculationHash: report.calculationHash,
    targetYear: report.targetYear,
    targetMonth: report.targetMonth,
    methodologyCorpus: 'R153',
    conflictOrderCorpus: 'R154',
    existingT9ClaimLinks: links,
    sourceQualifiedCrossLayerMeaningEstablished: false,
    interpretationClaimEmissionAuthorized: false,
    mayPublish: false,
    maySell: false,
    mayGrantOfficialAuthority: false,
  };
}
