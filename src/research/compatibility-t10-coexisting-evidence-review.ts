import type { CompatibilityT10MethodCoverageV1 } from './compatibility-t10-method-coverage.js';
import type {
  CrossChartStructuralMatch,
  PairwiseSourceScopeHandoff,
} from './family-pair-source-scope-handoff.js';

export const COMPATIBILITY_T10_COEXISTING_EVIDENCE_REVIEW_VERSION =
  'saju-compatibility-t10-coexisting-evidence-research-v1' as const;

const DAY_BRANCH_SUBJECT = 'subject.pillars.day.value.branch';
const DAY_BRANCH_TARGET = 'target.pillars.day.value.branch';

export interface CompatibilityT10CoexistingEvidenceReviewV1 {
  readonly version: typeof COMPATIBILITY_T10_COEXISTING_EVIDENCE_REVIEW_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  /** Already observed cross-chart branch facts, not new Claim/Rule interpretations. */
  readonly structural: {
    readonly dayBranchFactor: CompatibilityT10MethodCoverageV1['palace']['crossChartDayBranch'];
    readonly dayToDayMatches: readonly CrossChartStructuralMatch[];
    readonly otherSlotSixCombinations: readonly CrossChartStructuralMatch[];
    readonly otherSlotClashes: readonly CrossChartStructuralMatch[];
    readonly coOccurrence: 'six_combination_and_clash' | 'no_mixed_branch_relation';
    readonly oppositeToDayFactor: readonly CrossChartStructuralMatch[];
    readonly scopeOfOtherMatches: 'structural_facts_only';
  };
  /** Individual natal observations are never counted as cross-chart support. */
  readonly individualPalace: CompatibilityT10MethodCoverageV1['palace']['personalDayPalace'];
  readonly historicalSpouseMethod: CompatibilityT10MethodCoverageV1['sixSpirits']['status'];
  readonly usefulGodMethod: CompatibilityT10MethodCoverageV1['usefulGod']['status'];
  readonly sourceReview: readonly [
    {
      readonly document: '자평사주 궁합론 연구';
      readonly accessLayer: 'RISS_ABSTRACT';
      readonly finding: 'THREE_METHODS_WITH_HISTORICAL_DISAGREEMENT';
      readonly crossChartPriority: 'not_specified';
    },
    {
      readonly document: '한국사회 이혼현상에 따른 부부궁합의 명리학적 고찰';
      readonly accessLayer: 'KCI_ABSTRACT';
      readonly finding: 'PALACE_OVER_SPOUSE_STAR_IN_STUDIED_DIVORCED_COUPLE_CASES';
      readonly crossChartPriority: 'not_generalizable';
    },
    {
      readonly document: '滴天髓闡微';
      readonly accessLayer: 'PUBLIC_PRIMARY_TEXT';
      readonly finding: 'COMBINATION_AND_CLASH_REQUIRE_NATAL_CONTEXT';
      readonly crossChartPriority: 'not_a_two_person_rule';
    },
  ];
  /** This states the available evidence boundary, not a negative compatibility judgment. */
  readonly synthesis: {
    readonly state: 'unresolved_no_source_qualified_pairwise_precedence';
    readonly scope: 'traditional_marital_research_only';
    readonly missingPrerequisites: readonly [
      'EXACT_TWO_PERSON_PRIORITIZATION_RULE',
      'CROSS_CHART_SCOPE_AND_CONDITION_SETTLEMENT',
      'VERIFIED_USEFUL_GOD_AND_SPOUSE_STAR_BRIDGE',
    ];
    readonly compatibilityScore: null;
    readonly inferredOutcome: null;
  };
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

function isDayToDayBranch(
  match: CrossChartStructuralMatch,
): boolean {
  return match.component === 'branch' &&
    match.subject.factPath === DAY_BRANCH_SUBJECT &&
    match.target.factPath === DAY_BRANCH_TARGET;
}

function sameIdentity(
  a: PairwiseSourceScopeHandoff['subject'],
  b: Pick<PairwiseSourceScopeHandoff['subject'], 'personRef' | 'snapshotId' | 'calculationHash'>,
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash;
}

/**
 * A research inventory of coexisting structural matches, NOT a new T10 engine.
 * A supporting/challenging day-branch candidate is restricted to its own
 * reviewed source scope. Matches in other positions are facts only, and the
 * 2014/2018 studies plus 滴天髓 internal-chart discussion do not supply a
 * transferable universal two-person precedence rule.
 */
export function reviewCompatibilityT10CoexistingEvidenceV1(
  pair: PairwiseSourceScopeHandoff,
  coverage: CompatibilityT10MethodCoverageV1,
): CompatibilityT10CoexistingEvidenceReviewV1 {
  if (pair.owner !== 'R068_R069' || pair.pairwiseT10Admitted !== false ||
      pair.mayPublish !== false || pair.maySell !== false ||
      coverage.lifecycle !== 'internal_research_only' ||
      coverage.pairwiseT10Admitted !== false ||
      coverage.mayPublish !== false || coverage.maySell !== false ||
      !sameIdentity(pair.subject, coverage.palace.crossChartDayBranch.subject) ||
      !sameIdentity(pair.target, coverage.palace.crossChartDayBranch.target) ||
      !sameIdentity(pair.subject, coverage.palace.personalDayPalace.subject) ||
      !sameIdentity(pair.target, coverage.palace.personalDayPalace.target) ||
      coverage.sixSpirits.crossChartMethodEstablished !== false ||
      coverage.usefulGod.status !== 'pairwise_rule_not_established_in_reviewed_sources') {
    throw new TypeError('T10 conflict review requires same-source guarded research evidence.');
  }

  const branches = pair.crossChartStructuralMatches.filter(match =>
    match.component === 'branch' &&
    (match.kind === 'branch_six_combination' || match.kind === 'branch_clash'));
  if (branches.some(match =>
    match.pairwiseMeaningAuthorized !== false ||
    match.sourceIds.length === 0 ||
    !/^[a-f0-9]{64}$/u.test(match.definitionContentHash))) {
    throw new TypeError('T10 conflict review requires exact unpromoted structural sources.');
  }
  const candidate = coverage.palace.crossChartDayBranch;
  const dayToDayMatches = branches.filter(isDayToDayBranch);
  if (candidate.state === 'candidate_factor' &&
      !dayToDayMatches.some(match =>
        match.kind === candidate.evidence.kind &&
        match.subject.value === candidate.evidence.subject.value &&
        match.target.value === candidate.evidence.target.value &&
        match.definitionContentHash === candidate.evidence.definitionContentHash)) {
    throw new TypeError('Day-branch factor is not grounded in the compared chart evidence.');
  }
  if (candidate.state !== 'candidate_factor' && dayToDayMatches.length > 0) {
    throw new TypeError('A covered day-branch match cannot be silently omitted.');
  }
  const otherSlotSixCombinations = branches.filter(match =>
    !isDayToDayBranch(match) && match.kind === 'branch_six_combination');
  const otherSlotClashes = branches.filter(match =>
    !isDayToDayBranch(match) && match.kind === 'branch_clash');

  const hasSixCombination = branches.some(match => match.kind === 'branch_six_combination');
  const hasClash = branches.some(match => match.kind === 'branch_clash');
  const oppositeKind = candidate.state !== 'candidate_factor'
    ? undefined : candidate.evidence.kind === 'branch_six_combination'
      ? 'branch_clash' as const : 'branch_six_combination' as const;

  return {
    version: COMPATIBILITY_T10_COEXISTING_EVIDENCE_REVIEW_VERSION,
    lifecycle: 'internal_research_only',
    subject: pair.subject,
    target: pair.target,
    structural: {
      dayBranchFactor: candidate,
      dayToDayMatches,
      otherSlotSixCombinations,
      otherSlotClashes,
      coOccurrence: hasSixCombination && hasClash
        ? 'six_combination_and_clash' : 'no_mixed_branch_relation',
      oppositeToDayFactor: oppositeKind === undefined ? [] : branches.filter(match =>
        !isDayToDayBranch(match) && match.kind === oppositeKind),
      scopeOfOtherMatches: 'structural_facts_only',
    },
    individualPalace: coverage.palace.personalDayPalace,
    historicalSpouseMethod: coverage.sixSpirits.status,
    usefulGodMethod: coverage.usefulGod.status,
    sourceReview: [
      {
        document: '자평사주 궁합론 연구',
        accessLayer: 'RISS_ABSTRACT',
        finding: 'THREE_METHODS_WITH_HISTORICAL_DISAGREEMENT',
        crossChartPriority: 'not_specified',
      },
      {
        document: '한국사회 이혼현상에 따른 부부궁합의 명리학적 고찰',
        accessLayer: 'KCI_ABSTRACT',
        finding: 'PALACE_OVER_SPOUSE_STAR_IN_STUDIED_DIVORCED_COUPLE_CASES',
        crossChartPriority: 'not_generalizable',
      },
      {
        document: '滴天髓闡微',
        accessLayer: 'PUBLIC_PRIMARY_TEXT',
        finding: 'COMBINATION_AND_CLASH_REQUIRE_NATAL_CONTEXT',
        crossChartPriority: 'not_a_two_person_rule',
      },
    ],
    synthesis: {
      state: 'unresolved_no_source_qualified_pairwise_precedence',
      scope: 'traditional_marital_research_only',
      missingPrerequisites: [
        'EXACT_TWO_PERSON_PRIORITIZATION_RULE',
        'CROSS_CHART_SCOPE_AND_CONDITION_SETTLEMENT',
        'VERIFIED_USEFUL_GOD_AND_SPOUSE_STAR_BRIDGE',
      ],
      compatibilityScore: null,
      inferredOutcome: null,
    },
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
