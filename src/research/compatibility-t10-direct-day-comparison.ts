import type { EarthlyBranch, FiveElement, HeavenlyStem } from '../contracts/calculation.js';
import type { MaritalPalaceIntraChartResearchV1 } from
  './compatibility-marital-palace-intra-chart-research.js';
import type {
  CrossChartStructuralMatch,
  PairwiseSourceScopeHandoff,
} from './family-pair-source-scope-handoff.js';

export const T10_DIRECT_DAY_COMPARISON_VERSION =
  'saju-t10-direct-day-comparison-source-audit-v6' as const;

/** Only four literal stem pairs in 命理約言 卷三 干沖論. The text
 * requires natal season, supporting branches, harmonization and restraint;
 * it does not give a dyadic compatibility outcome rule. */
export const T10_CLASSICAL_STEM_CLASH_SOURCE = Object.freeze({
  sourceId: 'SRC-T10-MINGLIYUEYAN-VOL3-STEM-CLASH',
  title: '命理約言 卷三 干沖論',
  url: 'https://www.suanzhun.net/dianji/mingliyueyan/946.html',
  verifiedTextLayer: 'PUBLIC_PRIMARY_TEXT_TRANSCRIPTION',
  scope: 'LITERAL_FOUR_STEM_PAIRS_ONLY_NOT_NATAL_EFFECT_OR_PERSONAL_RELATIONSHIP',
  fullNatalConditionsVerified: false,
  pairwiseMeaningAuthorized: false,
});

const CLASSICAL_STEM_CLASH_PAIRS: readonly (readonly [HeavenlyStem, HeavenlyStem])[] = [
  ['갑', '경'], ['을', '신'], ['병', '임'], ['정', '계'],
];
const STEMS: readonly HeavenlyStem[] = [
  '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계',
];
export function isClassicalStemClashPair(
  a: HeavenlyStem, b: HeavenlyStem,
): boolean {
  return CLASSICAL_STEM_CLASH_PAIRS.some(([x, y]) =>
    (a === x && b === y) || (a === y && b === x));
}
export interface T10ClassicalStemClashDayObservation {
  readonly subject: Readonly<{
    factPath: 'subject.pillars.day.value.stem';
    value: HeavenlyStem;
  }>;
  readonly target: Readonly<{
    factPath: 'target.pillars.day.value.stem';
    value: HeavenlyStem;
  }>;
  readonly source: typeof T10_CLASSICAL_STEM_CLASH_SOURCE;
  readonly stemPairObserved: true;
  readonly seasonalStrengthBranchSupportAndReliefVerified: false;
  readonly individualNatalEffectAuthorized: false;
  readonly pairwiseMeaningAuthorized: false;
}

/** Six literal branch pairs from 三命通會, 卷二, 論六害.
 * The original conditions concern natal interpretation, not modern pairs. */
export const T10_CLASSICAL_SIX_HARM_SOURCE = Object.freeze({
  sourceId: 'SRC-T10-SANMINGTONGHUI-VOL2-SIX-HARMS',
  title: '三命通會 卷二 論六害',
  url: 'https://zh.wikisource.org/zh-hant/三命通會/卷二',
  verifiedTextLayer: 'PUBLIC_PRIMARY_TEXT_TRANSCRIPTION',
  scope: 'LITERAL_BRANCH_PAIR_ONLY_NOT_INTERPERSONAL_OUTCOME',
  pairwiseMeaningAuthorized: false,
});

/** Original direction-only pair fragments, not completed 三刑 or interpersonal causation. */
export const T10_CLASSICAL_THREE_PUNISHMENTS_SOURCE = Object.freeze({
  sourceId: 'SRC-T10-SANMINGTONGHUI-VOL2-THREE-PUNISHMENTS',
  title: '三命通會 卷二 論三刑',
  url: 'https://zh.wikisource.org/zh-hant/三命通會/卷二',
  verifiedTextLayer: 'PUBLIC_PRIMARY_TEXT_TRANSCRIPTION',
  scope: 'DIRECTED_BRANCH_PAIR_LITERAL_ONLY_NOT_COMPLETED_NATAL_PUNISHMENT',
  natalConditionsVerified: false,
  pairwiseMeaningAuthorized: false,
});

const DIRECTED_PUNISHMENT_PAIRS: readonly (readonly [EarthlyBranch, EarthlyBranch])[] = [
  ['인', '사'], ['사', '신'], ['신', '인'],
  ['축', '술'], ['술', '미'], ['미', '축'],
  ['자', '묘'], ['묘', '자'],
];

export type T10DirectedPunishmentDirection =
  'subject_to_target' | 'target_to_subject' | 'both_directions';

export interface T10ClassicalDirectedPunishmentDayObservation {
  readonly subject: Readonly<{
    factPath: 'subject.pillars.day.value.branch';
    value: EarthlyBranch;
  }>;
  readonly target: Readonly<{
    factPath: 'target.pillars.day.value.branch';
    value: EarthlyBranch;
  }>;
  /** Order of the original branch notation, not a person's action. */
  readonly literalDirection: T10DirectedPunishmentDirection;
  readonly source: typeof T10_CLASSICAL_THREE_PUNISHMENTS_SOURCE;
  readonly directedPairObserved: true;
  readonly completeNatalPunishmentVerified: false;
  readonly interpersonalEffectAuthorized: false;
  readonly pairwiseMeaningAuthorized: false;
}

export function classicalDirectedPunishmentDirection(
  a: EarthlyBranch, b: EarthlyBranch,
): T10DirectedPunishmentDirection | null {
  if (a === b) return null; // 辰午酉亥自刑 is a natal condition, not pairwise self-punishment.
  const forward = DIRECTED_PUNISHMENT_PAIRS.some(([x, y]) => x === a && y === b);
  const backward = DIRECTED_PUNISHMENT_PAIRS.some(([x, y]) => x === b && y === a);
  return forward && backward ? 'both_directions'
    : forward ? 'subject_to_target'
      : backward ? 'target_to_subject' : null;
}

/** These Liu Ren pairs are not proven Bazi relationship factors. */
export const T10_FOREIGN_BREAK_SOURCE = Object.freeze({
  sourceId: 'SRC-T10-LIUREN-DAQUAN-BREAK',
  title: '六壬大全 破',
  url: 'https://zh.wikisource.org/zh-hans/六壬大全/1',
  verifiedTextLayer: 'PUBLIC_PRIMARY_TEXT_TRANSCRIPTION',
  discipline: 'LIUREN_DIVINATION_NOT_BAZI',
  pairwiseCompatibilityAuthority: false,
});
export const T10_BAZI_BREAK_CRITIQUE_SOURCE = Object.freeze({
  sourceId: 'SRC-T10-MINGLI-YUEYAN-ZHIHAI-BREAK-CRITIQUE',
  title: '命理約言 支害論',
  url: 'https://book.taiyi.me/命/命理约言/命理约言-中',
  verifiedTextLayer: 'PUBLIC_PRIMARY_TEXT_TRANSCRIPTION',
  discipline: 'BAZI_NATAL_METHODOLOGY_CRITIQUE',
  breakRuleAdmitted: false,
});
const FOREIGN_BREAK_PAIRS: readonly (readonly [EarthlyBranch, EarthlyBranch])[] = [
  ['자', '유'], ['축', '진'], ['인', '해'], ['묘', '오'],
  ['사', '신'], ['미', '술'],
];
export function isForeignBreakBranchPair(a: EarthlyBranch, b: EarthlyBranch): boolean {
  return FOREIGN_BREAK_PAIRS.some(([x, y]) =>
    (a === x && b === y) || (a === y && b === x));
}
export interface T10ForeignBreakDayCandidate {
  readonly subject: Readonly<{
    factPath: 'subject.pillars.day.value.branch'; value: EarthlyBranch;
  }>;
  readonly target: Readonly<{
    factPath: 'target.pillars.day.value.branch'; value: EarthlyBranch;
  }>;
  readonly source: typeof T10_FOREIGN_BREAK_SOURCE;
  readonly criticalSource: typeof T10_BAZI_BREAK_CRITIQUE_SOURCE;
  readonly methodDisagreement: 'FOREIGN_DIVINATION_VS_BAZI_CRITIQUE';
  readonly admittedBaziBreakFactor: false;
  readonly mayContributeToFourCaseGroup: false;
  readonly pairwiseMeaningAuthorized: false;
}
const SIX_HARM_PAIRS: readonly (readonly [EarthlyBranch, EarthlyBranch])[] = [
  ['자', '미'], ['축', '오'], ['인', '사'], ['묘', '진'],
  ['신', '해'], ['유', '술'],
];
const BRANCHES: readonly EarthlyBranch[] = [
  '자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해',
];
export interface T10ClassicalSixHarmDayObservation {
  readonly subject: Readonly<{
    factPath: 'subject.pillars.day.value.branch';
    value: EarthlyBranch;
  }>;
  readonly target: Readonly<{
    factPath: 'target.pillars.day.value.branch';
    value: EarthlyBranch;
  }>;
  readonly source: typeof T10_CLASSICAL_SIX_HARM_SOURCE;
  readonly branchPairObserved: true;
  readonly reciprocalInterpersonalEffectVerified: false;
  readonly pairwiseMeaningAuthorized: false;
}

/** Literal unordered branch membership; the classical text's role
 * asymmetries and natal context expressly do NOT transfer to T10. */
export function isClassicalSixHarmBranchPair(
  a: EarthlyBranch, b: EarthlyBranch,
): boolean {
  return SIX_HARM_PAIRS.some(([x, y]) =>
    (a === x && b === y) || (a === y && b === x));
}

function dayClassicalStemClashObservation(
  pair: PairwiseSourceScopeHandoff,
): T10ClassicalStemClashDayObservation | null {
  const day = pair.factualPairObservations.find(item => item.pillarSlot === 'day');
  if (day?.status !== 'both_resolved') return null;
  const left = day.subjectPillar?.slice(0, 1);
  const right = day.targetPillar?.slice(0, 1);
  if (!left || !right || !STEMS.includes(left as HeavenlyStem) ||
      !STEMS.includes(right as HeavenlyStem)) {
    throw new TypeError('Classical stem clash requires two resolved day stems.');
  }
  const first = left as HeavenlyStem;
  const second = right as HeavenlyStem;
  if (!isClassicalStemClashPair(first, second)) return null;
  return {
    subject: { factPath: 'subject.pillars.day.value.stem', value: first },
    target: { factPath: 'target.pillars.day.value.stem', value: second },
    source: T10_CLASSICAL_STEM_CLASH_SOURCE,
    stemPairObserved: true,
    seasonalStrengthBranchSupportAndReliefVerified: false,
    individualNatalEffectAuthorized: false,
    pairwiseMeaningAuthorized: false,
  };
}

function daySixHarmObservation(
  pair: PairwiseSourceScopeHandoff,
): T10ClassicalSixHarmDayObservation | null {
  const day = pair.factualPairObservations.find(item => item.pillarSlot === 'day');
  if (day?.status !== 'both_resolved') return null;
  const left = day.subjectPillar?.slice(-1);
  const right = day.targetPillar?.slice(-1);
  if (!left || !right || !BRANCHES.includes(left as EarthlyBranch) ||
      !BRANCHES.includes(right as EarthlyBranch)) {
    throw new TypeError('Six-harm observation requires two resolved day branches.');
  }
  const subjectBranch = left as EarthlyBranch;
  const targetBranch = right as EarthlyBranch;
  if (!isClassicalSixHarmBranchPair(subjectBranch, targetBranch)) return null;
  return {
    subject: {
      factPath: 'subject.pillars.day.value.branch',
      value: subjectBranch,
    },
    target: {
      factPath: 'target.pillars.day.value.branch',
      value: targetBranch,
    },
    source: T10_CLASSICAL_SIX_HARM_SOURCE,
    branchPairObserved: true,
    reciprocalInterpersonalEffectVerified: false,
    pairwiseMeaningAuthorized: false,
  };
}

function dayDirectedPunishmentObservation(
  pair: PairwiseSourceScopeHandoff,
): T10ClassicalDirectedPunishmentDayObservation | null {
  const day = pair.factualPairObservations.find(item => item.pillarSlot === 'day');
  if (day?.status !== 'both_resolved') return null;
  const left = day.subjectPillar?.slice(-1);
  const right = day.targetPillar?.slice(-1);
  if (!left || !right || !BRANCHES.includes(left as EarthlyBranch) ||
      !BRANCHES.includes(right as EarthlyBranch)) {
    throw new TypeError('Classical punishment pair requires two resolved day branches.');
  }
  const first = left as EarthlyBranch;
  const second = right as EarthlyBranch;
  const direction = classicalDirectedPunishmentDirection(first, second);
  if (!direction) return null;
  return {
    subject: { factPath: 'subject.pillars.day.value.branch', value: first },
    target: { factPath: 'target.pillars.day.value.branch', value: second },
    literalDirection: direction,
    source: T10_CLASSICAL_THREE_PUNISHMENTS_SOURCE,
    directedPairObserved: true,
    completeNatalPunishmentVerified: false,
    interpersonalEffectAuthorized: false,
    pairwiseMeaningAuthorized: false,
  };
}

function dayForeignBreakCandidate(
  pair: PairwiseSourceScopeHandoff,
): T10ForeignBreakDayCandidate | null {
  const day = pair.factualPairObservations.find(item => item.pillarSlot === 'day');
  if (day?.status !== 'both_resolved') return null;
  const left = day.subjectPillar?.slice(-1);
  const right = day.targetPillar?.slice(-1);
  if (!left || !right || !BRANCHES.includes(left as EarthlyBranch) ||
      !BRANCHES.includes(right as EarthlyBranch)) {
    throw new TypeError('Foreign break candidate needs two resolved day branches.');
  }
  const subject = left as EarthlyBranch;
  const target = right as EarthlyBranch;
  if (!isForeignBreakBranchPair(subject, target)) return null;
  return {
    subject: { factPath: 'subject.pillars.day.value.branch', value: subject },
    target: { factPath: 'target.pillars.day.value.branch', value: target },
    source: T10_FOREIGN_BREAK_SOURCE,
    criticalSource: T10_BAZI_BREAK_CRITIQUE_SOURCE,
    methodDisagreement: 'FOREIGN_DIVINATION_VS_BAZI_CRITIQUE',
    admittedBaziBreakFactor: false,
    mayContributeToFourCaseGroup: false,
    pairwiseMeaningAuthorized: false,
  };
}
export const T10_DIRECT_DAY_COMPARISON_SOURCE = Object.freeze({
  title: '子平四柱를 통한 夫婦宮合 硏究 : 宮位論을 中心으로',
  author: '이창임',
  year: 2016,
  sourceUrl: 'https://www.dbpia.co.kr/journal/detail?nodeId=T14205410',
  verifiedTextLayer: 'DBPIA_PUBLIC_ABSTRACT',
  subjectPopulation: 'MARRIED_COUPLES_QUALITATIVE_INTERVIEWS',
  // These are locations in the public table of contents, NOT reviewed full text.
  publicContentsTextLayer: 'DBPIA_PUBLIC_TABLE_OF_CONTENTS',
  // Case 2/4 headings abbreviate the abstract's list; they are not full methods.
  abstractNegativeDayBranchFactors: [
    'clash', 'elemental_control', 'punishment', 'break', 'harm',
  ] as const,
  contentsCaseTwoAndFourNegativeDayBranchFactors: [
    'punishment', 'clash', 'break', 'harm',
  ] as const,
  publicContentsOmitsAbstractElementalControlFactor: true,
  publicContentsResearchPages: {
    palaceTheory: 9,
    sixSpiritsTheory: 12,
    usefulGodTheory: 15,
    researchMethod: 17,
    interviewCollection: 23,
    fourCaseResults: [35, 40, 50, 57] as const,
    authorLimitations: 68,
  },
  method: 'DAY_STEM_POSITIVE_OR_NEGATIVE_SET_BY_DAY_BRANCH_POSITIVE_OR_NEGATIVE_SET',
  abstractFourGroups: [
    'STEM_POSITIVE_BRANCH_POSITIVE',
    'STEM_POSITIVE_BRANCH_NEGATIVE',
    'STEM_NEGATIVE_BRANCH_POSITIVE',
    'STEM_NEGATIVE_BRANCH_NEGATIVE',
  ] as const,
  /** This source's public abstract is not a validated personal outcome model. */
  fullTextMethodVerified: false,
  modernRelationshipPredictionValidated: false,
});

export const T10_FIVE_ELEMENT_CYCLE_SOURCE = Object.freeze({
  sourceId: 'SRC-T10-CLASSICAL-FIVE-ELEMENT-GENERATION-CONTROL',
  text: '四聖心源 卷一 五行生克',
  url: 'https://m.gushiwen.cn/guwen/bookv_10521e55cf12.aspx',
  verifiedTextLayer: 'PUBLIC_CLASSICAL_TEXT',
  scope: 'ELEMENT_CYCLE_FACTS_ONLY_NOT_INTERPERSONAL_MEANING',
});

const PRODUCES: Readonly<Record<FiveElement, FiveElement>> = {
  목: '화', 화: '토', 토: '금', 금: '수', 수: '목',
};
const CONTROLS: Readonly<Record<FiveElement, FiveElement>> = {
  목: '토', 토: '수', 수: '화', 화: '금', 금: '목',
};

export type ElementPairKind =
  'same_element' | 'subject_generates_target' | 'target_generates_subject' |
  'subject_controls_target' | 'target_controls_subject';

export interface DayElementComparisonV1 {
  readonly relation: ElementPairKind;
  readonly subject: Readonly<{ factPath: string; value: FiveElement }>;
  readonly target: Readonly<{ factPath: string; value: FiveElement }>;
  readonly source: typeof T10_FIVE_ELEMENT_CYCLE_SOURCE;
  readonly pairwiseMeaningAuthorized: false;
}

type ObservedDayGroup = 'covered_positive_subset' | 'covered_negative_subset' |
  'mixed_source_factors' | 'not_classified' | 'incomplete_day_pillar';

type FourCaseCell =
  'STEM_POSITIVE_BRANCH_POSITIVE' | 'STEM_POSITIVE_BRANCH_NEGATIVE' |
  'STEM_NEGATIVE_BRANCH_POSITIVE' | 'STEM_NEGATIVE_BRANCH_NEGATIVE' |
  'unclassified';

function compareElements(
  subject: FiveElement,
  target: FiveElement,
  component: 'stem' | 'branch',
): DayElementComparisonV1 {
  const relation: ElementPairKind = subject === target ? 'same_element'
    : PRODUCES[subject] === target ? 'subject_generates_target'
      : PRODUCES[target] === subject ? 'target_generates_subject'
        : CONTROLS[subject] === target ? 'subject_controls_target'
          : 'target_controls_subject';
  if (relation === 'target_controls_subject' && CONTROLS[target] !== subject) {
    throw new TypeError('Invalid Five Element cycle: no declared relation.');
  }
  return {
    relation,
    subject: { factPath: `subject.pillars.day.value.${component}.element`, value: subject },
    target: { factPath: `target.pillars.day.value.${component}.element`, value: target },
    source: T10_FIVE_ELEMENT_CYCLE_SOURCE,
    pairwiseMeaningAuthorized: false,
  };
}

function groupFactor(
  positive: boolean,
  negative: boolean,
  complete: boolean,
): ObservedDayGroup {
  if (!complete) return 'incomplete_day_pillar';
  if (positive && negative) return 'mixed_source_factors';
  if (positive) return 'covered_positive_subset';
  if (negative) return 'covered_negative_subset';
  return 'not_classified';
}

function fourCaseCell(stem: ObservedDayGroup, branch: ObservedDayGroup): FourCaseCell {
  if (stem === 'covered_positive_subset') {
    if (branch === 'covered_positive_subset') return 'STEM_POSITIVE_BRANCH_POSITIVE';
    if (branch === 'covered_negative_subset') return 'STEM_POSITIVE_BRANCH_NEGATIVE';
  }
  if (stem === 'covered_negative_subset') {
    if (branch === 'covered_positive_subset') return 'STEM_NEGATIVE_BRANCH_POSITIVE';
    if (branch === 'covered_negative_subset') return 'STEM_NEGATIVE_BRANCH_NEGATIVE';
  }
  return 'unclassified';
}

export interface T10DirectDayComparisonResearchV1 {
  readonly version: typeof T10_DIRECT_DAY_COMPARISON_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_DIRECT_DAY_COMPARISON_SOURCE;
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly dayStem: {
    readonly subjectFactPath: 'subject.pillars.day.value.stem';
    readonly targetFactPath: 'target.pillars.day.value.stem';
    readonly group: ObservedDayGroup;
    readonly verifiedStructuralMatch: CrossChartStructuralMatch | null;
    readonly elementalComparison: DayElementComparisonV1 | null;
    readonly conflictingFactors: boolean;
    readonly classicalStemClashObservation: T10ClassicalStemClashDayObservation | null;
    /** Literal pair observed separately; natal-strength/effect still not evaluated. */
    readonly unimplementedSourceFactors: readonly ['stem_clash'];
  };
  readonly dayBranch: {
    readonly subjectFactPath: 'subject.pillars.day.value.branch';
    readonly targetFactPath: 'target.pillars.day.value.branch';
    readonly group: ObservedDayGroup;
    readonly verifiedStructuralMatch: CrossChartStructuralMatch | null;
    readonly elementalComparison: DayElementComparisonV1 | null;
    readonly conflictingFactors: boolean;
    readonly classicalSixHarmObservation: T10ClassicalSixHarmDayObservation | null;
    readonly classicalDirectedPunishmentObservation:
      T10ClassicalDirectedPunishmentDayObservation | null;
    readonly foreignBreakDayCandidate: T10ForeignBreakDayCandidate | null;
    /** The full natal meaning of 三刑 remains unevaluated. */
    readonly unimplementedSourceFactors: readonly ['punishment', 'break'];
  };
  /** A research grouping from the accessible abstract; not a harmony verdict. */
  readonly observedAbstractCell: FourCaseCell;
  /** Tracks what was actually measured, not a complete literature-defined cell. */
  readonly sourceFactorAudit: {
    readonly dayStem: {
      readonly observed: readonly (
        'stem_five_combination' | 'stem_clash_pair' | 'elemental_same' |
        'elemental_generation' | 'elemental_control'
      )[];
      readonly notEvaluated: readonly ['stem_clash'];
    };
    readonly dayBranch: {
      readonly observed: readonly (
        'branch_six_combination' | 'branch_clash' | 'branch_harm' |
        'branch_punishment_direction' | 'elemental_same' | 'elemental_generation' | 'elemental_control'
      )[];
      readonly notEvaluated: readonly ['punishment', 'break'];
    };
    /** General adverse examples in the abstract, beyond the four enumerated cells. */
    readonly otherAbstractFactorsNotEvaluated: readonly ['void', 'yuanchen'];
    readonly classificationBasis: 'computed_factor_subset_only';
    readonly sourceQualifiedFourCaseCell: null;
    readonly sourcePopulationMatchEstablished: false;
    readonly fullMethodAndExceptionsVerified: false;
    readonly mayInferIndividualOutcome: false;
  };
  readonly missingPrerequisites: readonly [
    'FULL_ABSTRACT_METHOD_AND_EXCEPTIONS_NOT_VERIFIED',
    'DAY_STEM_AND_BRANCH_RELATION_COVERAGE_INCOMPLETE',
    'T10_INTERPERSONAL_MEANING_NOT_ESTABLISHED',
    'REAL_WORLD_OUTCOME_VALIDATION_NOT_ESTABLISHED',
  ];
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

const STEM_SUBJECT = 'subject.pillars.day.value.stem';
const STEM_TARGET = 'target.pillars.day.value.stem';
const BRANCH_SUBJECT = 'subject.pillars.day.value.branch';
const BRANCH_TARGET = 'target.pillars.day.value.branch';

function dayMatch(
  matches: readonly CrossChartStructuralMatch[],
  subjectPath: string,
  targetPath: string,
  kinds: readonly CrossChartStructuralMatch['kind'][],
): CrossChartStructuralMatch | null {
  const covered = matches.filter(match =>
    match.subject.factPath === subjectPath &&
    match.target.factPath === targetPath &&
    kinds.includes(match.kind));
  if (covered.length > 1 || covered.some(match =>
    match.pairwiseMeaningAuthorized !== false ||
    !match.sourceIds.length ||
    !/^[0-9a-f]{64}$/u.test(match.definitionContentHash))) {
    throw new TypeError('Direct palace source audit requires a unique traceable structural fact.');
  }
  return covered[0] ?? null;
}

/**
 * Audits only the structural subset already calculated by Saju.
 * The 2016 qualitative abstract compares day-stem and day-branch factor groups;
 * it supplies neither the full rules nor validated relationship predictions.
 */
export function auditT10DirectDayComparisonV1(
  pair: PairwiseSourceScopeHandoff,
  personalPalace: MaritalPalaceIntraChartResearchV1,
): T10DirectDayComparisonResearchV1 {
  if (pair.owner !== 'R068_R069' || pair.pairwiseT10Admitted !== false ||
      pair.researchOnly !== true || pair.mayPublish !== false ||
      pair.maySell !== false || pair.mayGrantOfficialAuthority !== false ||
      !pair.subject.personRef || !pair.target.personRef ||
      pair.subject.personRef === pair.target.personRef ||
      !pair.subject.calculationHash || !pair.target.calculationHash ||
      personalPalace.researchOnly !== true ||
      personalPalace.pairwiseT10Admitted !== false ||
      personalPalace.maySell !== false || personalPalace.mayPublish !== false ||
      personalPalace.subject.personRef !== pair.subject.personRef ||
      personalPalace.target.personRef !== pair.target.personRef ||
      personalPalace.subject.snapshotId !== pair.subject.snapshotId ||
      personalPalace.target.snapshotId !== pair.target.snapshotId ||
      personalPalace.subject.calculationHash !== pair.subject.calculationHash ||
      personalPalace.target.calculationHash !== pair.target.calculationHash) {
    throw new TypeError('Direct palace audit must retain two protected calculations.');
  }
  const day = pair.factualPairObservations.find(item => item.pillarSlot === 'day');
  const complete = day?.status === 'both_resolved';
  const stem = complete ? dayMatch(pair.crossChartStructuralMatches,
    STEM_SUBJECT, STEM_TARGET, ['stem_five_combination']) : null;
  const branch = complete ? dayMatch(pair.crossChartStructuralMatches,
    BRANCH_SUBJECT, BRANCH_TARGET, ['branch_six_combination', 'branch_clash']) : null;
  const classicalStemClash = complete ? dayClassicalStemClashObservation(pair) : null;
  const classicalHarm = complete ? daySixHarmObservation(pair) : null;
  const classicalPunishment = complete ? dayDirectedPunishmentObservation(pair) : null;
  const foreignBreak = complete ? dayForeignBreakCandidate(pair) : null;
  const subjectDay = personalPalace.subject.evidence;
  const targetDay = personalPalace.target.evidence;
  if (complete && (!subjectDay || !targetDay ||
      personalPalace.subject.state === 'unresolved_day_pillar' ||
      personalPalace.target.state === 'unresolved_day_pillar' ||
      subjectDay.stemFactPath !== 'pillars.day.value.stem.element' ||
      targetDay.stemFactPath !== 'pillars.day.value.stem.element' ||
      subjectDay.branchFactPath !== 'pillars.day.value.branch.element' ||
      targetDay.branchFactPath !== 'pillars.day.value.branch.element')) {
    throw new TypeError('Resolved day facts need exact source-bound element paths.');
  }
  const stemElements = complete && subjectDay && targetDay
    ? compareElements(subjectDay.stemElement, targetDay.stemElement, 'stem') : null;
  const branchElements = complete && subjectDay && targetDay
    ? compareElements(subjectDay.branchElement, targetDay.branchElement, 'branch') : null;
  const elementalPositive = (rel: DayElementComparisonV1 | null): boolean =>
    rel !== null && (rel.relation === 'same_element' ||
      rel.relation === 'subject_generates_target' ||
      rel.relation === 'target_generates_subject');
  const elementalNegative = (rel: DayElementComparisonV1 | null): boolean =>
    rel !== null && (rel.relation === 'subject_controls_target' ||
      rel.relation === 'target_controls_subject');
  const stemPositive = stem !== null || elementalPositive(stemElements);
  const stemNegative = classicalStemClash !== null || elementalNegative(stemElements);
  const branchPositive = branch?.kind === 'branch_six_combination' ||
    elementalPositive(branchElements);
  const branchNegative = branch?.kind === 'branch_clash' ||
    classicalHarm !== null || classicalPunishment !== null ||
    elementalNegative(branchElements);
  const stemGroup = groupFactor(stemPositive, stemNegative, complete);
  const branchGroup = groupFactor(branchPositive, branchNegative, complete);
  const stemObserved: T10DirectDayComparisonResearchV1[
    'sourceFactorAudit']['dayStem']['observed'][number][] = [];
  const branchObserved: T10DirectDayComparisonResearchV1[
    'sourceFactorAudit']['dayBranch']['observed'][number][] = [];
  if (stem?.kind === 'stem_five_combination') stemObserved.push('stem_five_combination');
  if (classicalStemClash) stemObserved.push('stem_clash_pair');
  if (branch?.kind === 'branch_six_combination') {
    branchObserved.push('branch_six_combination');
  }
  if (branch?.kind === 'branch_clash') branchObserved.push('branch_clash');
  if (classicalHarm) branchObserved.push('branch_harm');
  if (classicalPunishment) branchObserved.push('branch_punishment_direction');
  const observableElementFactor = (value: DayElementComparisonV1 | null):
    'elemental_same' | 'elemental_generation' | 'elemental_control' | null => {
    if (!value) return null;
    if (value.relation === 'same_element') return 'elemental_same';
    if (value.relation === 'subject_generates_target' ||
        value.relation === 'target_generates_subject') return 'elemental_generation';
    return 'elemental_control';
  };
  const stemElementFactor = observableElementFactor(stemElements);
  const branchElementFactor = observableElementFactor(branchElements);
  if (stemElementFactor) stemObserved.push(stemElementFactor);
  if (branchElementFactor) branchObserved.push(branchElementFactor);

  return {
    version: T10_DIRECT_DAY_COMPARISON_VERSION,
    lifecycle: 'internal_research_only',
    source: T10_DIRECT_DAY_COMPARISON_SOURCE,
    subject: pair.subject,
    target: pair.target,
    dayStem: {
      subjectFactPath: STEM_SUBJECT,
      targetFactPath: STEM_TARGET,
      group: stemGroup,
      verifiedStructuralMatch: stem,
      elementalComparison: stemElements,
      conflictingFactors: stemPositive && stemNegative,
      classicalStemClashObservation: classicalStemClash,
      unimplementedSourceFactors: ['stem_clash'],
    },
    dayBranch: {
      subjectFactPath: BRANCH_SUBJECT,
      targetFactPath: BRANCH_TARGET,
      group: branchGroup,
      verifiedStructuralMatch: branch,
      elementalComparison: branchElements,
      conflictingFactors: branchPositive && branchNegative,
      classicalSixHarmObservation: classicalHarm,
      classicalDirectedPunishmentObservation: classicalPunishment,
      foreignBreakDayCandidate: foreignBreak,
      unimplementedSourceFactors: ['punishment', 'break'],
    },
    observedAbstractCell: fourCaseCell(stemGroup, branchGroup),
    sourceFactorAudit: {
      dayStem: {
        observed: stemObserved,
        notEvaluated: ['stem_clash'],
      },
      dayBranch: {
        observed: branchObserved,
        notEvaluated: ['punishment', 'break'],
      },
      otherAbstractFactorsNotEvaluated: ['void', 'yuanchen'],
      classificationBasis: 'computed_factor_subset_only',
      sourceQualifiedFourCaseCell: null,
      sourcePopulationMatchEstablished: false,
      fullMethodAndExceptionsVerified: false,
      mayInferIndividualOutcome: false,
    },
    missingPrerequisites: [
      'FULL_ABSTRACT_METHOD_AND_EXCEPTIONS_NOT_VERIFIED',
      'DAY_STEM_AND_BRANCH_RELATION_COVERAGE_INCOMPLETE',
      'T10_INTERPERSONAL_MEANING_NOT_ESTABLISHED',
      'REAL_WORLD_OUTCOME_VALIDATION_NOT_ESTABLISHED',
    ],
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
