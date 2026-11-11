import type {
  CanonicalSajuSnapshot, EarthlyBranch, FiveElement, HeavenlyStem, TenGod,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';

export const T10_YONGSHEN_METHOD_SCOPE_VERSION =
  'saju-t10-classical-yongshen-method-distinction-v1' as const;

/**
 * Method 1: original text in Zi Ping Zhen Quan, "Lun Yong Shen".
 * Later commentator glosses are NOT promoted to the original author's
 * definition; no rule here selects a geju or a useful element.
 *
 * Method 2: Ming Li Tan Yuan, "Lun Nan Nv He Hun"; its conditional
 * "requires metal" examples do not establish a particular person's yongshen.
 */
export const T10_YONGSHEN_METHOD_SOURCES = Object.freeze({
  monthCommandGeju: {
    work: '子平真詮',
    chapter: '卷一·八、論用神',
    originalTextUrl: 'https://www.donglishuzhai.net/chapter/3721.html',
    originalTextLayer: 'ORIGINAL_CLASSICAL_TRANSCRIPTION',
    methodologicalRole: 'MONTH_COMMAND_GEJU_ENTRY',
    originalException: 'WOOD_DAY_MASTER_IN_YIN_OR_MAO_MONTH_MUST_LOOK_ELSEWHERE',
    exceptionDoesNotEstablishSelection: true,
    editorialNotesAreNotOriginal: true,
  },
  conditionalBalance: {
    work: '命理探源',
    chapter: '論男女合婚',
    originalTextUrl: 'https://libokang.com/classics/bazi/%E5%91%BD%E7%90%86%E6%8E%A2%E6%BA%90/',
    originalTextLayer: 'CLASSICAL_PASSAGE_WITH_LATER_EXPLANATION_SEPARATED',
    methodologicalRole: 'CONDITIONAL_ELEMENT_PREFERENCE',
    examplePrerequisites: ['WOOD_STRONG_METAL_REQUIRED', 'METAL_STRONG_FIRE_PREFERRED'],
    deterministicElementNeedSelectionProvided: false,
  },
  laterGloss: {
    work: '子平真詮評註',
    attribution: '徐樂吾注（後出評註，非沈孝瞻原文）',
    textUrl: 'https://luckclub.cn/bazi/002/010/',
    originalTextLayer: 'LATER_COMMENTARY_NOT_ORIGINAL',
    methodologicalRole: 'STRENGTH_BALANCE_INTERPRETATION',
    primaryOriginalEquivalenceAuthorized: false,
  },
});

export type WoodMonthExceptionState =
  'wood_day_master_in_yin_or_mao_month' | 'other_observed_month_context' |
  'unresolved_day_or_month';

export interface T10MonthCommandNatalObservation {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly dayStem: {
    readonly factPath: 'pillars.day.value.stem';
    readonly value: HeavenlyStem | null;
    readonly element: FiveElement | null;
  };
  readonly monthBranch: {
    readonly factPath: 'pillars.month.value.branch';
    readonly value: EarthlyBranch | null;
    readonly element: FiveElement | null;
  };
  /** Canonical classification evidence is not a confirmed lunar-command geju. */
  readonly monthBranchTenGod: {
    readonly factPath: 'derivedFacts.tenGods.month.branch';
    readonly value: TenGod | null;
    readonly observedAsTaxonomyOnly: true;
  };
  readonly exception: {
    readonly state: WoodMonthExceptionState;
    readonly source: typeof T10_YONGSHEN_METHOD_SOURCES.monthCommandGeju;
    readonly alternateGejuSelected: false;
  };
  readonly individualGejuSelected: false;
  readonly individualUsefulElementSelected: false;
}

export interface T10YongshenMethodScopeResearchV1 {
  readonly version: typeof T10_YONGSHEN_METHOD_SCOPE_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly sources: typeof T10_YONGSHEN_METHOD_SOURCES;
  readonly subject: T10MonthCommandNatalObservation;
  readonly target: T10MonthCommandNatalObservation;
  readonly independentMethodMeanings: readonly [
    'MONTH_COMMAND_GEJU_ENTRY',
    'CONDITIONAL_ELEMENT_PREFERENCE',
    'LATER_STRENGTH_BALANCE_COMMENTARY',
  ];
  readonly conceptualConflationBlocked: true;
  readonly applicableModernTwoPersonMethodSelected: false;
  readonly pairwiseUsefulGodSelected: false;
  readonly unresolvedPrerequisites: readonly [
    'SOURCE_QUALIFIED_MONTH_COMMAND_GEJU_COMPLETENESS',
    'SOURCE_QUALIFIED_USEFUL_ELEMENT_STRENGTH_SELECTION',
    'CROSS_SCHOOL_METHOD_SELECTION_AND_COUNTEREXAMPLES',
    'PAIRWISE_CONDITIONAL_COMPLEMENT_AND_LUCK_RECONCILIATION',
  ];
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

function natal(
  snapshot: CanonicalSajuSnapshot,
  personRef: string,
): T10MonthCommandNatalObservation {
  const day = snapshot.pillars.day;
  const month = snapshot.pillars.month;
  const dayValue = day.status === 'resolved' ? day.value.stem : null;
  const monthValue = month.status === 'resolved' ? month.value.branch : null;
  const tenGodChart = snapshot.derivedFacts.tenGods;
  const monthGod = tenGodChart.status === 'resolved'
    ? tenGodChart.value.month.branch : undefined;
  const observedGod = monthGod?.status === 'resolved' ? monthGod.value : null;
  const state: WoodMonthExceptionState = !dayValue || !monthValue
    ? 'unresolved_day_or_month'
    : dayValue.element === '목' &&
      (monthValue.value === '인' || monthValue.value === '묘')
      ? 'wood_day_master_in_yin_or_mao_month'
      : 'other_observed_month_context';
  return {
    personRef,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    dayStem: {
      factPath: 'pillars.day.value.stem',
      value: dayValue?.value ?? null,
      element: dayValue?.element ?? null,
    },
    monthBranch: {
      factPath: 'pillars.month.value.branch',
      value: monthValue?.value ?? null,
      element: monthValue?.element ?? null,
    },
    monthBranchTenGod: {
      factPath: 'derivedFacts.tenGods.month.branch',
      value: observedGod,
      observedAsTaxonomyOnly: true,
    },
    exception: {
      state,
      source: T10_YONGSHEN_METHOD_SOURCES.monthCommandGeju,
      alternateGejuSelected: false,
    },
    individualGejuSelected: false,
    individualUsefulElementSelected: false,
  };
}

/**
 * A source-qualified evidence boundary, not a yongshen chooser.
 * "月令用神" in the original source cannot be equated automatically
 * with an element desired in a conditional marriage example.
 */
export function auditT10YongshenMethodScopeV1(
  pair: PairwiseSourceScopeHandoff,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T10YongshenMethodScopeResearchV1 {
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false || pair.mayGrantOfficialAuthority !== false ||
      pair.mayPublish !== false || pair.maySell !== false ||
      pair.subject.personRef === pair.target.personRef ||
      !pair.subject.personRef || !pair.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash ||
      subject.policy.policyId !== target.policy.policyId ||
      subject.policy.policyVersion !== target.policy.policyVersion) {
    throw new TypeError('Yongshen methodology audit requires two protected canonical charts.');
  }
  return {
    version: T10_YONGSHEN_METHOD_SCOPE_VERSION,
    lifecycle: 'internal_research_only',
    sources: T10_YONGSHEN_METHOD_SOURCES,
    subject: natal(subject, pair.subject.personRef),
    target: natal(target, pair.target.personRef),
    independentMethodMeanings: [
      'MONTH_COMMAND_GEJU_ENTRY',
      'CONDITIONAL_ELEMENT_PREFERENCE',
      'LATER_STRENGTH_BALANCE_COMMENTARY',
    ],
    conceptualConflationBlocked: true,
    applicableModernTwoPersonMethodSelected: false,
    pairwiseUsefulGodSelected: false,
    unresolvedPrerequisites: [
      'SOURCE_QUALIFIED_MONTH_COMMAND_GEJU_COMPLETENESS',
      'SOURCE_QUALIFIED_USEFUL_ELEMENT_STRENGTH_SELECTION',
      'CROSS_SCHOOL_METHOD_SELECTION_AND_COUNTEREXAMPLES',
      'PAIRWISE_CONDITIONAL_COMPLEMENT_AND_LUCK_RECONCILIATION',
    ],
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
