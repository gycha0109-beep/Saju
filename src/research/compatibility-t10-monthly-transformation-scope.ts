import type {
  CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem, PillarSlot,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';
import type { T10YongshenMethodScopeResearchV1 } from
  './compatibility-t10-yongshen-method-scope.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-month-order-hidden-stem-selection-admission-review.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-branch-meeting-selection-effect-admission-review.js';

export const T10_MONTHLY_TRANSFORMATION_SCOPE_VERSION =
  'saju-t10-monthly-transformation-exemplar-observation-v1' as const;

export const T10_MONTHLY_TRANSFORMATION_SOURCE = Object.freeze({
  work: '子平真詮',
  chapter: '卷一·十、論用神變化',
  sourceUrl: 'https://www.donglishuzhai.net/chapter/3723.html',
  textLayer: 'PUBLIC_CLASSICAL_TRANSCRIPTION_WITH_CRITICAL_EDITORIAL_NOTES',
  primaryScope: 'INTRA_CHART_MONTH_COMMAND_TRANSFORMATION',
  examples: [
    { id: 'yin_jia_not_visible_bing_visible', textualCondition: '寅月不透甲而透丙' },
    { id: 'ding_hai_month_mao_wei_meeting', textualCondition: '丁生亥月支全卯未' },
  ] as const,
  downstreamSourceMeaningForTwoPersonCompatibility: false,
  priorMonthSelectionReviewHash:
    GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  priorBranchMeetingReviewHash:
    GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
});

type RawPatternStatus =
  'raw_positions_observed' | 'raw_positions_not_observed' |
  'inputs_unresolved' | 'outside_original_example';

interface ObservedStem {
  readonly path: string;
  readonly value: HeavenlyStem;
}
interface ObservedBranch {
  readonly path: string;
  readonly value: EarthlyBranch;
}

export interface T10MonthlyTransformationPersonAudit {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly yinExample: {
    readonly originalExampleId: 'yin_jia_not_visible_bing_visible';
    readonly monthBranch: EarthlyBranch | null;
    readonly hiddenStemSourcePath: 'derivedFacts.hiddenStems.month';
    readonly hiddenStemJiaAndBingMembershipVerified: boolean | null;
    readonly stemJia: readonly ObservedStem[];
    readonly stemBing: readonly ObservedStem[];
    readonly unresolvedVisibleStemPaths: readonly string[];
    readonly rawPattern: RawPatternStatus;
    readonly monthUseSelected: false;
  };
  readonly dingHaiExample: {
    readonly originalExampleId: 'ding_hai_month_mao_wei_meeting';
    readonly dayStem: HeavenlyStem | null;
    readonly monthBranch: EarthlyBranch | null;
    readonly requiredMaoAndWei: readonly ['묘', '미'];
    readonly observedMaoAndWeiPositions: readonly ObservedBranch[];
    readonly unresolvedOtherBranchPaths: readonly string[];
    readonly rawPattern: RawPatternStatus;
    readonly actualBranchTransformationEstablished: false;
  };
  readonly personalGejuTransformationAuthorized: false;
}

export interface T10MonthlyTransformationScopeResearchV1 {
  readonly version: typeof T10_MONTHLY_TRANSFORMATION_SCOPE_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_MONTHLY_TRANSFORMATION_SOURCE;
  readonly subject: T10MonthlyTransformationPersonAudit;
  readonly target: T10MonthlyTransformationPersonAudit;
  readonly upstreamMonthSelectionDecision:
    typeof GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION;
  readonly upstreamBranchMeetingDecision:
    typeof GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION;
  readonly rawPatternIsNotSourceRuleExecution: true;
  readonly crossPersonExampleFragmentCombinationAuthorized: false;
  readonly sourceQualifiedTransformationResolverAvailable: false;
  readonly derivedGejuAndUsefulGod: null;
  readonly compatibilityVerdict: null;
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

const OTHER_SLOTS = ['year', 'month', 'hour'] as const satisfies readonly PillarSlot[];
const OTHER_BRANCH_SLOTS = ['year', 'day', 'hour'] as const satisfies readonly PillarSlot[];

function onePerson(
  snapshot: CanonicalSajuSnapshot, personRef: string,
): T10MonthlyTransformationPersonAudit {
  const day = snapshot.pillars.day;
  const month = snapshot.pillars.month;
  const dayStem = day.status === 'resolved' ? day.value.stem.value : null;
  const monthBranch = month.status === 'resolved' ? month.value.branch.value : null;
  const hiddenMonth = snapshot.derivedFacts.hiddenStems?.month;
  const hiddenJiaBing = hiddenMonth?.status === 'resolved'
    ? hiddenMonth.value.includes('갑') && hiddenMonth.value.includes('병')
    : null;

  const stemJia: ObservedStem[] = [];
  const stemBing: ObservedStem[] = [];
  const missingStems: string[] = [];
  for (const slot of OTHER_SLOTS) {
    const item = snapshot.pillars[slot];
    const path = `pillars.${slot}.value.stem`;
    if (item.status !== 'resolved') {
      missingStems.push(path);
    } else {
      const value = item.value.stem.value;
      if (value === '갑') stemJia.push({ path, value });
      if (value === '병') stemBing.push({ path, value });
    }
  }
  const yinStatus: RawPatternStatus = monthBranch === null
    ? 'inputs_unresolved'
    : monthBranch !== '인'
      ? 'outside_original_example'
      : hiddenJiaBing !== true || missingStems.length > 0
        ? 'inputs_unresolved'
        : stemJia.length === 0 && stemBing.length > 0
          ? 'raw_positions_observed'
          : 'raw_positions_not_observed';

  const maoWei: ObservedBranch[] = [];
  const missingBranches: string[] = [];
  for (const slot of OTHER_BRANCH_SLOTS) {
    const item = snapshot.pillars[slot];
    const path = `pillars.${slot}.value.branch`;
    if (item.status !== 'resolved') {
      missingBranches.push(path);
    } else {
      const value = item.value.branch.value;
      if (value === '묘' || value === '미') maoWei.push({ path, value });
    }
  }
  const haveBoth = maoWei.some(x => x.value === '묘') &&
    maoWei.some(x => x.value === '미');
  const dingHaiStatus: RawPatternStatus = dayStem === null || monthBranch === null
    ? 'inputs_unresolved'
    : dayStem !== '정' || monthBranch !== '해'
      ? 'outside_original_example'
      : haveBoth
        ? 'raw_positions_observed'
        : missingBranches.length > 0
          ? 'inputs_unresolved'
          : 'raw_positions_not_observed';

  return {
    personRef, snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    yinExample: {
      originalExampleId: 'yin_jia_not_visible_bing_visible',
      monthBranch,
      hiddenStemSourcePath: 'derivedFacts.hiddenStems.month',
      hiddenStemJiaAndBingMembershipVerified: hiddenJiaBing,
      stemJia, stemBing,
      unresolvedVisibleStemPaths: missingStems,
      rawPattern: yinStatus,
      monthUseSelected: false,
    },
    dingHaiExample: {
      originalExampleId: 'ding_hai_month_mao_wei_meeting',
      dayStem, monthBranch,
      requiredMaoAndWei: ['묘', '미'],
      observedMaoAndWeiPositions: maoWei,
      unresolvedOtherBranchPaths: missingBranches,
      rawPattern: dingHaiStatus,
      actualBranchTransformationEstablished: false,
    },
    personalGejuTransformationAuthorized: false,
  };
}

/**
 * Source candidates only: transformation is a natal method requiring
 * governed month selection, branch effect and positional precedence.
 * Never use the OTHER person's stems/branches to fill an example.
 */
export function auditT10MonthlyTransformationScopeV1(
  pair: PairwiseSourceScopeHandoff,
  prior: T10YongshenMethodScopeResearchV1,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T10MonthlyTransformationScopeResearchV1 {
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false ||
      pair.mayPublish !== false || pair.maySell !== false ||
      pair.mayGrantOfficialAuthority !== false ||
      prior.lifecycle !== 'internal_research_only' ||
      prior.conceptualConflationBlocked !== true ||
      prior.pairwiseT10Admitted !== false ||
      prior.subject.personRef !== pair.subject.personRef ||
      prior.target.personRef !== pair.target.personRef ||
      prior.subject.calculationHash !== subject.calculationHash ||
      prior.target.calculationHash !== target.calculationHash ||
      pair.subject.personRef === pair.target.personRef ||
      !pair.subject.personRef || !pair.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash ||
      subject.policy.policyId !== target.policy.policyId ||
      subject.policy.policyVersion !== target.policy.policyVersion ||
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION !==
        'DIRECT_SOURCE_EXACT_YIN_PRIMARY_AND_TRANSPARENCY_SUBSTITUTION_OBSERVED_GENERALIZED_ALL_BRANCH_SELECTOR_NOT_ESTABLISHED' ||
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION !==
        'DIRECT_SOURCE_MEETING_RELEVANCE_OBSERVED_GENERALIZED_POST_INTERACTION_EFFECT_PREDICATE_NOT_ESTABLISHED') {
    throw new TypeError('Monthly transformation research requires independent protected natal charts.');
  }
  return {
    version: T10_MONTHLY_TRANSFORMATION_SCOPE_VERSION,
    lifecycle: 'internal_research_only',
    source: T10_MONTHLY_TRANSFORMATION_SOURCE,
    subject: onePerson(subject, pair.subject.personRef),
    target: onePerson(target, pair.target.personRef),
    upstreamMonthSelectionDecision:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION,
    upstreamBranchMeetingDecision:
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_DECISION,
    rawPatternIsNotSourceRuleExecution: true,
    crossPersonExampleFragmentCombinationAuthorized: false,
    sourceQualifiedTransformationResolverAvailable: false,
    derivedGejuAndUsefulGod: null,
    compatibilityVerdict: null,
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
