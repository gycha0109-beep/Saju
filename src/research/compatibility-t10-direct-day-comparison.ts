import type { FiveElement } from '../contracts/calculation.js';
import type { MaritalPalaceIntraChartResearchV1 } from
  './compatibility-marital-palace-intra-chart-research.js';
import type {
  CrossChartStructuralMatch,
  PairwiseSourceScopeHandoff,
} from './family-pair-source-scope-handoff.js';

export const T10_DIRECT_DAY_COMPARISON_VERSION =
  'saju-t10-direct-day-comparison-source-audit-v2' as const;

export const T10_DIRECT_DAY_COMPARISON_SOURCE = Object.freeze({
  title: '子平四柱를 통한 夫婦宮合 硏究 : 宮位論을 中心으로',
  author: '이창임',
  year: 2016,
  sourceUrl: 'https://www.dbpia.co.kr/journal/detail?nodeId=T14205410',
  verifiedTextLayer: 'DBPIA_PUBLIC_ABSTRACT',
  subjectPopulation: 'MARRIED_COUPLES_QUALITATIVE_INTERVIEWS',
  // These are locations in the public table of contents, NOT reviewed full text.
  publicContentsTextLayer: 'DBPIA_PUBLIC_TABLE_OF_CONTENTS',
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
    readonly unimplementedSourceFactors: readonly ['stem_clash'];
  };
  readonly dayBranch: {
    readonly subjectFactPath: 'subject.pillars.day.value.branch';
    readonly targetFactPath: 'target.pillars.day.value.branch';
    readonly group: ObservedDayGroup;
    readonly verifiedStructuralMatch: CrossChartStructuralMatch | null;
    readonly elementalComparison: DayElementComparisonV1 | null;
    readonly conflictingFactors: boolean;
    readonly unimplementedSourceFactors: readonly ['punishment', 'break', 'harm'];
  };
  /** A research grouping from the accessible abstract; not a harmony verdict. */
  readonly observedAbstractCell: FourCaseCell;
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
  const stemNegative = elementalNegative(stemElements);
  const branchPositive = branch?.kind === 'branch_six_combination' ||
    elementalPositive(branchElements);
  const branchNegative = branch?.kind === 'branch_clash' ||
    elementalNegative(branchElements);
  const stemGroup = groupFactor(stemPositive, stemNegative, complete);
  const branchGroup = groupFactor(branchPositive, branchNegative, complete);

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
      unimplementedSourceFactors: ['stem_clash'],
    },
    dayBranch: {
      subjectFactPath: BRANCH_SUBJECT,
      targetFactPath: BRANCH_TARGET,
      group: branchGroup,
      verifiedStructuralMatch: branch,
      elementalComparison: branchElements,
      conflictingFactors: branchPositive && branchNegative,
      unimplementedSourceFactors: ['punishment', 'break', 'harm'],
    },
    observedAbstractCell: fourCaseCell(stemGroup, branchGroup),
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
