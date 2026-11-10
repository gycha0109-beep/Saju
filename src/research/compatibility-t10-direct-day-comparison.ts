import type {
  CrossChartStructuralMatch,
  PairwiseSourceScopeHandoff,
} from './family-pair-source-scope-handoff.js';

export const T10_DIRECT_DAY_COMPARISON_VERSION =
  'saju-t10-direct-day-comparison-source-audit-v1' as const;

export const T10_DIRECT_DAY_COMPARISON_SOURCE = Object.freeze({
  title: '子平四柱를 통한 夫婦宮合 硏究 : 宮位論을 中心으로',
  author: '이창임',
  year: 2016,
  sourceUrl: 'https://www.dbpia.co.kr/journal/detail?nodeId=T14205410',
  verifiedTextLayer: 'DBPIA_PUBLIC_ABSTRACT',
  subjectPopulation: 'MARRIED_COUPLES_QUALITATIVE_INTERVIEWS',
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

type ObservedDayGroup = 'covered_positive_subset' | 'covered_negative_subset' |
  'not_classified' | 'incomplete_day_pillar';

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
    readonly unimplementedSourceFactors: readonly ['generation', 'same_element', 'overcoming', 'stem_clash'];
  };
  readonly dayBranch: {
    readonly subjectFactPath: 'subject.pillars.day.value.branch';
    readonly targetFactPath: 'target.pillars.day.value.branch';
    readonly group: ObservedDayGroup;
    readonly verifiedStructuralMatch: CrossChartStructuralMatch | null;
    readonly unimplementedSourceFactors: readonly [
      'generation', 'same_element', 'overcoming', 'punishment', 'break', 'harm',
    ];
  };
  /** A research grouping from the accessible abstract; not a harmony verdict. */
  readonly observedAbstractCell:
    'STEM_POSITIVE_BRANCH_POSITIVE' | 'STEM_POSITIVE_BRANCH_NEGATIVE' | 'unclassified';
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
): T10DirectDayComparisonResearchV1 {
  if (pair.owner !== 'R068_R069' || pair.pairwiseT10Admitted !== false ||
      pair.researchOnly !== true || pair.mayPublish !== false ||
      pair.maySell !== false || pair.mayGrantOfficialAuthority !== false ||
      !pair.subject.personRef || !pair.target.personRef ||
      pair.subject.personRef === pair.target.personRef ||
      !pair.subject.calculationHash || !pair.target.calculationHash) {
    throw new TypeError('Direct palace audit must retain two protected calculations.');
  }
  const day = pair.factualPairObservations.find(item => item.pillarSlot === 'day');
  const complete = day?.status === 'both_resolved';
  const stem = complete ? dayMatch(pair.crossChartStructuralMatches,
    STEM_SUBJECT, STEM_TARGET, ['stem_five_combination']) : null;
  const branch = complete ? dayMatch(pair.crossChartStructuralMatches,
    BRANCH_SUBJECT, BRANCH_TARGET, ['branch_six_combination', 'branch_clash']) : null;
  const stemGroup: ObservedDayGroup = !complete ? 'incomplete_day_pillar'
    : stem ? 'covered_positive_subset' : 'not_classified';
  const branchGroup: ObservedDayGroup = !complete ? 'incomplete_day_pillar'
    : branch?.kind === 'branch_six_combination' ? 'covered_positive_subset'
      : branch?.kind === 'branch_clash' ? 'covered_negative_subset'
        : 'not_classified';

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
      unimplementedSourceFactors: ['generation', 'same_element', 'overcoming', 'stem_clash'],
    },
    dayBranch: {
      subjectFactPath: BRANCH_SUBJECT,
      targetFactPath: BRANCH_TARGET,
      group: branchGroup,
      verifiedStructuralMatch: branch,
      unimplementedSourceFactors: [
        'generation', 'same_element', 'overcoming', 'punishment', 'break', 'harm',
      ],
    },
    observedAbstractCell: stemGroup === 'covered_positive_subset' &&
        branchGroup === 'covered_positive_subset'
      ? 'STEM_POSITIVE_BRANCH_POSITIVE'
      : stemGroup === 'covered_positive_subset' &&
        branchGroup === 'covered_negative_subset'
        ? 'STEM_POSITIVE_BRANCH_NEGATIVE' : 'unclassified',
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
