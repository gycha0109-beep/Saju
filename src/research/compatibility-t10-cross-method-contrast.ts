import type { FiveElement } from '../contracts/calculation.js';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_SOURCE_CATALOG,
} from '../calculation/structural-relations.js';
import type {
  CrossChartStructuralMatch, PairwiseSourceScopeHandoff,
} from './family-pair-source-scope-handoff.js';
import type { CompatibilityT10CoexistingEvidenceReviewV1 } from
  './compatibility-t10-coexisting-evidence-review.js';
import type { T10ClassicalCrossTenGodResearch } from
  './compatibility-t10-classical-cross-ten-god.js';
import type { T10ClassicalUsefulElementResearchV1 } from
  './compatibility-t10-classical-useful-element.js';
import type { T10ThreeMethodApplicabilityReadingV1 } from
  './compatibility-t10-three-method-applicability-reading.js';
import { T10_DIRECT_DAY_COMPARISON_SOURCE } from
  './compatibility-t10-direct-day-comparison.js';

/**
 * The 2020 dissertation's PUBLIC ABSTRACT describes the author comparing
 * adverse factors of each spouse and the counterpart's neutralizing factors.
 * The original criteria and case tables have not been inspected. This source
 * defines a research question, never an executable pairwise outcome rule.
 */
export const T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE = {
  title: '부부 궁합(宮合)에 관한 명리학적 연구',
  author: '남기동',
  year: 2020,
  url: 'https://www.riss.kr/link?id=T15540056',
  evidenceLevel: 'RISS_PUBLIC_ABSTRACT_AND_TOC_ONLY',
  studiedDivorcedOrBereavedCouples: 20,
  studiedLongMarriedCouples: 20,
  historicalScope: 'married_couples_only',
  publicAbstractListsGanyeojidongAsAdverseFactor: true,
  /** The other author-listed factors and compensations need original methods. */
  wholeJointDecisionTableReproduced: false,
} as const;

export const T10_CROSS_METHOD_CONTRAST_VERSION =
  'saju-t10-cross-method-contrast-factual-research-v1' as const;

type PairPerson = PairwiseSourceScopeHandoff['subject'];
type ConflictDirection =
  'day_six_combination_with_other_clash' |
  'day_clash_with_other_six_combination';
export interface T10StructuralMethodContrast {
  readonly direction: ConflictDirection;
  readonly dayFactPaths: readonly [string, string];
  readonly dayFactValues: Readonly<{
    subject: string;
    target: string;
    kind: 'branch_clash' | 'branch_six_combination';
  }>;
  readonly otherFactPaths: readonly Readonly<{
    subject: string;
    target: string;
    subjectValue: string;
    targetValue: string;
    kind: 'branch_clash' | 'branch_six_combination';
    sourceIds: readonly string[];
    definitionContentHash: string;
  }>[];
  readonly paragraph: string;
  readonly sources: readonly string[];
  readonly conditionalPriorityEstablished: false;
  readonly netRelationshipMeaning: null;
}

export interface T10HistoricalMethodContrast {
  readonly sourceDisagreement:
    'CLASSICAL_TEN_GOD_PAIRING_DISPUTED_BY_CLASSICAL_ELEMENT_METHOD';
  readonly state:
    'historical_male_female_scope_with_unsettled_conditions' |
    'historical_role_scope_unmatched';
  readonly tenGodVisibleInputs: readonly Readonly<{
    personRef: string;
    canonicalFactPaths: readonly string[];
    unresolvedFactPaths: readonly string[];
  }>[];
  readonly elementExampleInputs: readonly Readonly<{
    id: string;
    anchorPersonRef: string;
    counterpartPersonRef: string;
    anchorDayMasterMatchesRequiredElement: boolean | null;
    counterpartVisibleFactPaths: readonly string[];
    strengthAndSelectionVerified: false;
  }>[];
  readonly sourceUrls: readonly [string, string];
  readonly paragraph: string;
  /** Different historical methods are not opposite individual verdicts. */
  readonly oppositeChartOutcomesEstablished: false;
  readonly relationPriorityEstablished: false;
}

export interface T10SynthesisHoldDecisionV1 {
  readonly caseId:
    'day_six_combination_vs_other_clash' |
    'day_clash_vs_other_six_combination' |
    'no_listed_opposite_positions';
  readonly historicalMethodScope:
    'historical_male_female_unresolved' | 'historical_roles_not_matched';
  readonly dayPillarFacts: Readonly<{
    sourceStatus: 'both_resolved' | 'incomplete';
    subject: string | null;
    target: string | null;
  }>;
  /** A 2016 population-level qualitative counterexample, never this pair's fate. */
  readonly qualitativeCounterexample: Readonly<{
    sourceUrl: typeof T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl;
    sourcePopulation: typeof T10_DIRECT_DAY_COMPARISON_SOURCE.subjectPopulation;
    publicAbstractOnly: true;
    conflictingTraditionalFactorCanHaveDifferentObservedOutcomes: true;
    currentPairInterviewed: false;
    currentPairBehaviorObserved: false;
    currentPairOutcomeInferred: false;
  }>;
  /**
   * Charts can supply input positions for investigating the 2020 author's
   * two-chart model, but none has been qualified as an adverse/remedy factor.
   */
  readonly conditionalJointFactorStudy: Readonly<{
    sourceUrl: typeof T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.url;
    sourceEvidence: typeof T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.evidenceLevel;
    studyPopulation: typeof T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.historicalScope;
    candidateObservedFactPaths: readonly string[];
    /** Only the already calculated, per-person day-stem/day-branch equality.
     * The abstract names this category among the historical sample's adverse
     * factors; it does NOT establish a forecast or the author's joint table. */
    singleChartDayPalaceFactorCandidates: readonly Readonly<{
      personRef: string;
      calculationHash: string;
      status: 'author_listed_ganyeojidong_observed' | 'not_observed' | 'unresolved';
      factPaths: readonly string[];
      stemElement: FiveElement | null;
      branchElement: FiveElement | null;
      matchesAuthorAbstractListedCategory: boolean;
      riskWeightOrIndividualOutcomeEstablished: false;
    }>[];
    /** Not enough to reconstruct multiple adverse factors for both persons. */
    bothChartFactorsOperationalized: false;
    adverseFactorAccumulationEstablished: false;
    counterpartNeutralizationEstablished: false;
    methodAppliesToCurrentPair: false;
    individualRelationshipPredictionAuthorized: false;
  }>;
  readonly observedFactPaths: readonly string[];
  readonly unverifiedFactPaths: readonly string[];
  readonly sourceIds: readonly string[];
  readonly sourceUrls: readonly string[];
  readonly definitionContentHashes: readonly string[];
  readonly unresolvedPrerequisites: readonly string[];
  readonly paragraph: string;
  readonly sourceQualifiedPriorityEstablished: false;
  readonly noObservedOppositionProvesHarmony: false;
  readonly relationshipConclusion: null;
  readonly compatibilityScore: null;
}

export interface T10CrossMethodContrastResearchV1 {
  readonly version: typeof T10_CROSS_METHOD_CONTRAST_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: PairPerson;
  readonly target: PairPerson;
  readonly structural: readonly T10StructuralMethodContrast[];
  readonly historical: T10HistoricalMethodContrast;
  readonly synthesisDecision: T10SynthesisHoldDecisionV1;
  readonly unresolvedMethodPrerequisites: readonly string[];
  readonly state: 'competing_observations_no_admitted_precedence';
  readonly pairwiseT10Admitted: false;
  readonly interpersonalConclusion: null;
  readonly compatibilityScore: null;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

const STRUCTURAL_SOURCES = [
  STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan,
  STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue,
] as const;
function identity(
  a: PairPerson,
  b: Pick<PairPerson, 'personRef' | 'snapshotId' | 'calculationHash'>,
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash;
}
function unique(items: readonly string[]): string[] {
  return [...new Set(items)];
}
function prefix(personRef: string, path: string, subject: PairPerson, target: PairPerson):
  string {
  const role = personRef === subject.personRef ? 'subject'
    : personRef === target.personRef ? 'target' : null;
  if (!role || !/^(derivedFacts\.tenGods\.|pillars\.)/u.test(path)) {
    throw new TypeError('Historical method input must belong to a canonical person.');
  }
  return role + '.' + path;
}
const BRANCH_POSITION: Readonly<Record<string, string>> = {
  year: '연지', month: '월지', day: '일지', hour: '시지',
};
const PILLAR_KOREAN: Readonly<Record<string, string>> = {
  year: '연', month: '월', day: '일', hour: '시',
};
function branchPosition(path: string, role: 'subject' | 'target'): string {
  const parts = path.split('.');
  if (parts.length !== 5 || parts[0] !== role ||
      parts[1] !== 'pillars' || !parts[2] ||
      !BRANCH_POSITION[parts[2]] ||
      parts[3] !== 'value' || parts[4] !== 'branch') {
    throw new TypeError('Mixed positions must reference original branch slots.');
  }
  return BRANCH_POSITION[parts[2]]!;
}
function verifiedStructure(
  pair: PairwiseSourceScopeHandoff,
  match: CrossChartStructuralMatch,
): boolean {
  return match.component === 'branch' &&
    (match.kind === 'branch_six_combination' || match.kind === 'branch_clash') &&
    match.pairwiseMeaningAuthorized === false &&
    match.definitionContentHash === STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH &&
    match.sourceIds.length === STRUCTURAL_SOURCES.length &&
    STRUCTURAL_SOURCES.every(source => match.sourceIds.includes(source.sourceId)) &&
    pair.crossChartStructuralMatches.some(candidate =>
      candidate.kind === match.kind && candidate.component === match.component &&
      candidate.subject.factPath === match.subject.factPath &&
      candidate.target.factPath === match.target.factPath &&
      candidate.subject.value === match.subject.value &&
      candidate.target.value === match.target.value &&
      candidate.definitionContentHash === match.definitionContentHash &&
      candidate.sourceIds.length === match.sourceIds.length &&
      candidate.sourceIds.every(id => match.sourceIds.includes(id)));
}

/**
 * Compares source-bound facts from the SAME two independently computed charts.
 * "Method disagreement" is explicitly distinct from two contradictory
 * interpretations of those people; no classical priority is selected here.
 */
export function compareT10CrossMethodEvidenceV1(
  pair: PairwiseSourceScopeHandoff,
  coexisting: CompatibilityT10CoexistingEvidenceReviewV1,
  six: T10ClassicalCrossTenGodResearch,
  useful: T10ClassicalUsefulElementResearchV1,
  applicability: T10ThreeMethodApplicabilityReadingV1,
): T10CrossMethodContrastResearchV1 {
  const axes = applicability.axes;
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false || pair.maySell !== false ||
      pair.mayPublish !== false || pair.mayGrantOfficialAuthority !== false ||
      coexisting.lifecycle !== 'internal_research_only' ||
      coexisting.pairwiseT10Admitted !== false ||
      coexisting.maySell !== false ||
      coexisting.synthesis.state !== 'unresolved_no_source_qualified_pairwise_precedence' ||
      coexisting.synthesis.compatibilityScore !== null ||
      coexisting.synthesis.inferredOutcome !== null ||
      six.lifecycle !== 'internal_research_only' ||
      six.pairwiseT10Admitted !== false || six.maySell !== false ||
      six.comparisonVerdict !== null ||
      six.methodConflict !== 'PRIMARY_TEXT_DISPUTES_RAW_PAIRING_AS_SUFFICIENT' ||
      useful.lifecycle !== 'internal_research_only' ||
      useful.pairwiseT10Admitted !== false || useful.maySell !== false ||
      useful.usefulGodComparisonAuthorized !== false ||
      useful.compatibilityVerdict !== null ||
      useful.historicalScope !== six.historicalScope ||
      applicability.lifecycle !== 'internal_research_only' ||
      applicability.maySell !== false ||
      applicability.sourceQualifiedThreeMethodPriority !== null ||
      applicability.relationshipVerdict !== null ||
      axes.map(axis => axis.method).join('|') !== 'palace|six_spirits|useful_god' ||
      axes.some(axis => axis.sourceQualifiedInterpersonalRule !== false ||
        axis.relationshipOutcomeAuthorized !== false) ||
      !identity(pair.subject, coexisting.subject) ||
      !identity(pair.target, coexisting.target) ||
      !identity(pair.subject, six.subject) ||
      !identity(pair.target, six.target) ||
      !identity(pair.subject, useful.subject) ||
      !identity(pair.target, useful.target) ||
      !identity(pair.subject, applicability.subject) ||
      !identity(pair.target, applicability.target) ||
      pair.subject.personRef === pair.target.personRef ||
      !six.sources.traditional.primaryPassageRead ||
      !six.sources.challenge.primaryPassageRead) {
    throw new TypeError('T10 cross-method contrast requires identical protected evidence.');
  }
  const day = coexisting.structural.dayBranchFactor;
  const others = coexisting.structural.oppositeToDayFactor;
  const structural: T10StructuralMethodContrast[] = [];
  if (day.state === 'candidate_factor' && others.length > 0) {
    const match = day.evidence;
    if (!verifiedStructure(pair, match) ||
        match.subject.factPath !== 'subject.pillars.day.value.branch' ||
        match.target.factPath !== 'target.pillars.day.value.branch' ||
        !others.every(other => verifiedStructure(pair, other) &&
          other.kind !== match.kind &&
          !(other.subject.factPath === match.subject.factPath &&
            other.target.factPath === match.target.factPath))) {
      throw new TypeError('T10 mixed palace facts require exact original source entries.');
    }
    const sixAtDay = match.kind === 'branch_six_combination';
    structural.push({
      direction: sixAtDay ? 'day_six_combination_with_other_clash'
        : 'day_clash_with_other_six_combination',
      dayFactPaths: [match.subject.factPath, match.target.factPath],
      dayFactValues: {
        subject: match.subject.value,
        target: match.target.value,
        kind: match.kind as 'branch_clash' | 'branch_six_combination',
      },
      otherFactPaths: others.map(other => ({
        subject: other.subject.factPath,
        target: other.target.factPath,
        subjectValue: other.subject.value,
        targetValue: other.target.value,
        kind: other.kind as 'branch_clash' | 'branch_six_combination',
        sourceIds: [...other.sourceIds],
        definitionContentHash: other.definitionContentHash,
      })),
      paragraph: (sixAtDay
        ? '두 명식의 일지 사이에는 육합이 있고 다른 위치에는 충이 있지만, '
        : '두 명식의 일지 사이에는 충이 있고 다른 위치에는 육합이 있지만, ') +
        '두 구조의 효과나 우선순위를 증명한 두 사람 궁합 규칙은 없습니다. ' +
        '실제 일지 비교는 첫 번째 사람 ' + match.subject.value +
        '과 두 번째 사람 ' + match.target.value + '의 ' +
        (sixAtDay ? '육합' : '충') + '입니다. ' +
        others.map(other => '다른 위치에서는 첫 번째 사람 ' +
          branchPosition(other.subject.factPath, 'subject') + ' ' +
          other.subject.value + '과 두 번째 사람 ' +
          branchPosition(other.target.factPath, 'target') + ' ' +
          other.target.value + ' 사이에 ' +
          (other.kind === 'branch_clash' ? '충' : '육합') +
          '이 관측됩니다.').join(' ') +
        ' 이 구조들만으로 실제 관계의 소통이나 갈등을 예측하지 않습니다.',
      sources: STRUCTURAL_SOURCES.map(source => source.url),
      conditionalPriorityEstablished: false,
      netRelationshipMeaning: null,
    });
  } else if (others.length > 0) {
    throw new TypeError('T10 opposite structure cannot exist without its day anchor.');
  }
  const historicalRoles = six.historicalScope === 'male_female_role_matched';
  if (historicalRoles !==
      (six.male !== null && six.female !== null &&
        useful.male !== null && useful.female !== null)) {
    throw new TypeError('Historical role evidence must remain complete or unavailable.');
  }
  const roleSource = [
    six.sources.traditional.url,
    six.sources.challenge.url,
  ] as const;
  const mappedT5 = historicalRoles
    ? [six.male, six.female].flatMap(person => {
      if (!person || ![pair.subject, pair.target].some(item => identity(item, person)) ||
          person.strengthOrHeavyCriterionEstablished !== false) {
        throw new TypeError('T10 historical T5 evidence belongs to another chart.');
      }
      return [{
        personRef: person.personRef,
        canonicalFactPaths: person.observed.map(item =>
          prefix(person.personRef, item.path, pair.subject, pair.target)),
        unresolvedFactPaths: person.unresolvedPaths.map(path =>
          prefix(person.personRef, path, pair.subject, pair.target)),
      }];
    }) : [];
  const examples = historicalRoles
    ? useful.hypotheticalExamples.map(example => {
      if (![pair.subject, pair.target].some(item =>
        item.personRef === example.anchorPersonRef) ||
          ![pair.subject, pair.target].some(item =>
            item.personRef === example.counterpartPersonRef) ||
          example.anchorPersonRef === example.counterpartPersonRef ||
          example.prerequisiteEstablished !== false ||
          example.usefulElementSelectionVerified !== false ||
          example.otherChartElementStrengthVerified !== false ||
          example.elementComplementVerdict !== null) {
        throw new TypeError('T10 historical element example cannot become a verdict.');
      }
      return {
        id: example.id,
        anchorPersonRef: example.anchorPersonRef,
        counterpartPersonRef: example.counterpartPersonRef,
        anchorDayMasterMatchesRequiredElement:
          example.anchorDayMasterMatchesRequiredElement,
        counterpartVisibleFactPaths: unique([
          ...example.counterpartVisibleRequiredElementPaths,
          ...example.counterpartVisibleGeneratingElementPaths,
        ]).map(path => prefix(
          example.counterpartPersonRef, path, pair.subject, pair.target)),
        strengthAndSelectionVerified: false as const,
      };
    }) : [];
  if (!historicalRoles && useful.hypotheticalExamples.length !== 0) {
    throw new TypeError('Historical element examples cannot apply to unmatched roles.');
  }

  // Express only canonical, visible positions from THESE two birth charts.
  // No count is a strength threshold, and no visible element proves 用神.
  const whoseChart = (personRef: string): string => {
    if (personRef === pair.subject.personRef) return '첫 번째 사람';
    if (personRef === pair.target.personRef) return '두 번째 사람';
    throw new TypeError('Historical pair-reading evidence must belong to a real chart.');
  };
  const visibleTenGodDescription = historicalRoles
    ? [six.male, six.female].map(person => {
      if (!person || person.interpersonalClaimAuthorized !== false ||
          person.strengthOrHeavyCriterionEstablished !== false ||
          person.countOfVisibleCanonicalTerms !== person.observed.length ||
          person.unresolvedPaths.length > 7 ||
          ![pair.subject, pair.target].some(p => identity(p, person))) {
        throw new TypeError('Historical source-visible ten gods need original chart roles.');
      }
      const role = person.historicalRole === 'male'
        ? '고전 남성 역할 입력의 비견·겁재' : '고전 여성 역할 입력의 식신·상관';
      const positions = person.observed.map(item => {
        const slotName = PILLAR_KOREAN[item.slot];
        if (!slotName || !['stem', 'branch'].includes(item.channel)) {
          throw new TypeError('Historical ten-god evidence has an unknown original slot.');
        }
        return slotName + (item.channel === 'stem' ? '간' : '지') +
          ' ' + item.value;
      });
      return whoseChart(person.personRef) + '(' + role + ')에서 보이는 항목 ' +
        positions.length + '곳(' +
        (positions.length ? positions.join('·') : '현재 보이는 해당 항목 없음') +
        '), 미확정 위치 ' + person.unresolvedPaths.length + '곳';
    }).join('; ')
    : '';
  const originalExampleDescriptions = historicalRoles
    ? useful.hypotheticalExamples.map(example => {
      if (example.prerequisiteEstablished !== false ||
          example.usefulElementSelectionVerified !== false ||
          example.otherChartElementStrengthVerified !== false ||
          example.elementComplementVerdict !== null ||
          ![pair.subject, pair.target].some(p =>
            p.personRef === example.anchorPersonRef) ||
          ![pair.subject, pair.target].some(p =>
            p.personRef === example.counterpartPersonRef) ||
          example.anchorPersonRef === example.counterpartPersonRef) {
        throw new TypeError('Visible element examples cannot be interpreted as suitability.');
      }
      const exampleName = example.id === 'male_wood_strong_needs_metal'
        ? '고전 남성 목왕·금 필요 예시'
        : '고전 여성 금강·화 선호 예시';
      const generating = example.id === 'male_wood_strong_needs_metal'
        ? '토' : '목';
      const dayStemMatches = example.anchorDayMasterMatchesRequiredElement === null
        ? '미확정'
        : example.anchorDayMasterMatchesRequiredElement ? '글자만 일치'
          : '글자 불일치';
      return exampleName + ': ' + whoseChart(example.anchorPersonRef) +
        '의 일간 ' + example.requiresAnchorElement + ' 조건 ' + dayStemMatches +
        ', ' + whoseChart(example.counterpartPersonRef) + '의 겉글자 ' +
        example.requiresUsefulElement + ' ' +
        example.counterpartVisibleRequiredElementPaths.length + '곳·' +
        generating + ' ' +
        example.counterpartVisibleGeneratingElementPaths.length + '곳';
    }).join('; ')
    : '';

  const dayFact = pair.factualPairObservations.find(item =>
    item.pillarSlot === 'day');
  if (!dayFact || dayFact.pairwiseMeaningAuthorized !== false ||
      dayFact.subjectFactPath !== 'subject.pillars.day' ||
      dayFact.targetFactPath !== 'target.pillars.day' ||
      (dayFact.status === 'both_resolved' &&
        (!dayFact.subjectPillar || !dayFact.targetPillar)) ||
      (dayFact.status === 'incomplete' &&
        (dayFact.subjectPillar !== undefined ||
         dayFact.targetPillar !== undefined))) {
    throw new TypeError('T10 synthesis must use protected canonical day-pillar facts.');
  }
  const fullDay = dayFact.status === 'both_resolved';
  const dayPillarFacts: T10SynthesisHoldDecisionV1['dayPillarFacts'] = {
    sourceStatus: dayFact.status,
    subject: fullDay ? dayFact.subjectPillar! : null,
    target: fullDay ? dayFact.targetPillar! : null,
  };
  const mixed = structural[0];
  const synthesisCase: T10SynthesisHoldDecisionV1['caseId'] = !mixed
    ? 'no_listed_opposite_positions'
    : mixed.direction === 'day_six_combination_with_other_clash'
      ? 'day_six_combination_vs_other_clash'
      : 'day_clash_vs_other_six_combination';
  const synthesisPaths = unique([
    ...(fullDay ? [dayFact.subjectFactPath, dayFact.targetFactPath] : []),
    ...(mixed ? [
      ...mixed.dayFactPaths,
      ...mixed.otherFactPaths.flatMap(item => [item.subject, item.target]),
    ] : []),
    ...mappedT5.flatMap(item => [...item.canonicalFactPaths]),
    ...examples.flatMap(item => [...item.counterpartVisibleFactPaths]),
  ]);
  const personalPalace = coexisting.individualPalace;
  if (personalPalace.version !== 'saju-marital-palace-intra-chart-research-v1' ||
      personalPalace.source.verifiedTextLayer !== 'KCI_ABSTRACT_ONLY' ||
      personalPalace.pairwiseT10Admitted !== false ||
      personalPalace.mayClaimRelationshipOutcome !== false ||
      !identity(pair.subject, personalPalace.subject) ||
      !identity(pair.target, personalPalace.target) ||
      T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.publicAbstractListsGanyeojidongAsAdverseFactor !== true) {
    throw new TypeError('2020 factor candidates require the same protected personal palace facts.');
  }
  const personalFactor = (
    person: typeof personalPalace.subject, role: 'subject' | 'target',
  ) => {
    const evidence = person.evidence;
    if (person.state === 'unresolved_day_pillar') {
      if (evidence !== undefined) {
        throw new TypeError('Unresolved personal day pillar cannot contain invented elements.');
      }
      return {
        personRef: person.personRef, calculationHash: person.calculationHash,
        status: 'unresolved' as const, factPaths: [] as string[],
        stemElement: null, branchElement: null,
        matchesAuthorAbstractListedCategory: false,
        riskWeightOrIndividualOutcomeEstablished: false as const,
      };
    }
    if (!evidence ||
        evidence.stemFactPath !== 'pillars.day.value.stem.element' ||
        evidence.branchFactPath !== 'pillars.day.value.branch.element' ||
        (person.state === 'same_element') !==
          (evidence.stemElement === evidence.branchElement) ||
        !['same_element', 'different_element'].includes(person.state)) {
      throw new TypeError('2020 palace source marker requires exact canonical element facts.');
    }
    const matched = person.state === 'same_element';
    return {
      personRef: person.personRef, calculationHash: person.calculationHash,
      status: matched
        ? 'author_listed_ganyeojidong_observed' as const
        : 'not_observed' as const,
      factPaths: [
        role + '.' + evidence.stemFactPath,
        role + '.' + evidence.branchFactPath,
      ],
      stemElement: evidence.stemElement,
      branchElement: evidence.branchElement,
      matchesAuthorAbstractListedCategory: matched,
      riskWeightOrIndividualOutcomeEstablished: false as const,
    };
  };
  const singleChartDayPalaceFactorCandidates = [
    personalFactor(personalPalace.subject, 'subject'),
    personalFactor(personalPalace.target, 'target'),
  ];
  const synthesisObservedPaths = unique([
    ...synthesisPaths,
    ...singleChartDayPalaceFactorCandidates.flatMap(item => [...item.factPaths]),
  ]);
  const personalFactorParagraph = singleChartDayPalaceFactorCandidates
    .map((item, index) => {
      const who = index === 0 ? '첫 번째 사람' : '두 번째 사람';
      if (item.status === 'unresolved') {
        return who + '의 일간·일지 오행은 미확정입니다.';
      }
      return who + '의 일간 오행은 ' + item.stemElement +
        ', 일지 오행은 ' + item.branchElement + '으로 ' +
        (item.matchesAuthorAbstractListedCategory
          ? '해당 논문 초록에 열거된 개인 원국의 간여지동 항목과 일치합니다.'
          : '해당 논문 초록의 간여지동 항목에는 해당하지 않습니다.');
    }).join(' ');
  const synthesisPrerequisites = unique([
    'FULL_2016_INTERVIEW_CASE_AND_METHOD_NOT_VERIFIED',
    'CURRENT_PAIR_TO_2016_INTERVIEW_CASE_NOT_LINKED',
    ...(!mixed ? ['NO_OBSERVED_OPPOSITE_IS_NOT_EVIDENCE_OF_HARMONY']
      : ['EXACT_TWO_PERSON_PRIORITIZATION_RULE']),
    ...coexisting.synthesis.missingPrerequisites,
    ...six.missingPrerequisites,
    ...useful.missingPrerequisites,
    ...axes.flatMap(axis => [...axis.unresolvedPrerequisites]),
    'NAM_2020_FULL_PAIRWISE_METHOD_AND_CASE_TABLE_NOT_VERIFIED',
    'NAM_2020_ADVERSE_AND_NEUTRALIZATION_CRITERIA_NOT_OPERATIONALIZED',
    'SOURCE_VALIDATED_RELATIONSHIP_OUTCOME_METHOD',
  ]);
  const synthesisDecision: T10SynthesisHoldDecisionV1 = {
    caseId: synthesisCase,
    historicalMethodScope: historicalRoles
      ? 'historical_male_female_unresolved' : 'historical_roles_not_matched',
    dayPillarFacts,
    qualitativeCounterexample: {
      sourceUrl: T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl,
      sourcePopulation: T10_DIRECT_DAY_COMPARISON_SOURCE.subjectPopulation,
      publicAbstractOnly: true,
      conflictingTraditionalFactorCanHaveDifferentObservedOutcomes: true,
      currentPairInterviewed: false,
      currentPairBehaviorObserved: false,
      currentPairOutcomeInferred: false,
    },
    conditionalJointFactorStudy: {
      sourceUrl: T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.url,
      sourceEvidence: T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.evidenceLevel,
      studyPopulation: T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.historicalScope,
      candidateObservedFactPaths: synthesisObservedPaths,
      singleChartDayPalaceFactorCandidates,
      bothChartFactorsOperationalized: false,
      adverseFactorAccumulationEstablished: false,
      counterpartNeutralizationEstablished: false,
      methodAppliesToCurrentPair: false,
      individualRelationshipPredictionAuthorized: false,
    },
    observedFactPaths: synthesisObservedPaths,
    unverifiedFactPaths: unique([
      ...(!fullDay ? [dayFact.subjectFactPath, dayFact.targetFactPath] : []),
      ...mappedT5.flatMap(item => [...item.unresolvedFactPaths]),
    ]),
    sourceIds: unique(mixed?.otherFactPaths.flatMap(item => [...item.sourceIds]) ?? []),
    sourceUrls: unique([...(mixed?.sources ?? []), ...roleSource,
      T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl,
      T10_NAM_2020_PAIRWISE_SYNTHESIS_SOURCE.url]),
    definitionContentHashes: unique(
      mixed?.otherFactPaths.map(item => item.definitionContentHash) ?? []),
    unresolvedPrerequisites: synthesisPrerequisites,
    paragraph: (fullDay
      ? '실제 비교하는 첫 번째 사람의 일주는 ' + dayPillarFacts.subject +
        ', 두 번째 사람의 일주는 ' + dayPillarFacts.target + '입니다. '
      : '두 명식의 일주 중 적어도 하나가 미확정이므로 일주 비교도 보류합니다. ') +
      (synthesisCase === 'day_six_combination_vs_other_clash'
      ? '현재 두 명식에서 일지 육합과 다른 위치의 충이 함께 관측됩니다. '
      : synthesisCase === 'day_clash_vs_other_six_combination'
        ? '현재 두 명식에서 일지 충과 다른 위치의 육합이 함께 관측됩니다. '
        : '이번에 검증한 일지와 다른 위치 사이의 반대 합·충 구조는 함께 관측되지 않았습니다. ' +
          '이것은 다른 상충 요소가 없거나 두 사람이 잘 맞는다는 근거가 아닙니다. ') +
      (historicalRoles
        ? '고전의 역사적 남녀 역할 입력에 따라 십신 위치와 오행 예시를 조회했지만, ' +
          '십신의 중(重)·강약과 실제 용신 선정은 확인되지 않았습니다. '
        : '고전 십신 짝짓기의 역사적 남녀 역할 조건과는 맞지 않아 해당 방법을 ' +
          '현재 두 사람에게 적용할 수 없습니다. ') +
      '2016년 기혼 부부 면접 연구의 공개 초록은 전통적 겉궁합이 맞지 않는다고 ' +
      '여겨져도 차이를 인정하고 역할에 합의하여 원만한 결혼생활을 유지한 사례를 ' +
      '보고하지만, 이 사례는 지금 두 사람의 행동이나 미래를 관측한 결과가 아닙니다. ' +
      '합·충의 상쇄나 두 고전 방법의 우선순위에 관한 검증된 두 명식 종합법이 없으므로 ' +
      '어느 근거가 더 중요하다는 결론과 실제 관계 결과를 모두 보류합니다. ' +
      '남기동(2020) 박사논문의 공개 초록은 부부 각자의 부정적 요인이 ' +
      '누적되거나 상대의 중화 요인과 결부되는 연구자 방법을 설명합니다. ' +
      personalFactorParagraph + ' ' +
      '이는 각자의 계산된 하루 기둥에서 해당 전통 분류 항목이 보이는지에 한정되며, ' +
      '두 사람의 부정 요인 누적이나 실제 혼인 결과를 의미하지 않습니다. ' +
      '그러나 실제 두 명식에서 그 요인이 성립하는 계산 기준과 사례표 ' +
      '원문이 확인되지 않아 이 명식쌍의 상쇄나 관계 결과에 적용하지 않습니다.',
    sourceQualifiedPriorityEstablished: false,
    noObservedOppositionProvesHarmony: false,
    relationshipConclusion: null,
    compatibilityScore: null,
  };
  return {
    version: T10_CROSS_METHOD_CONTRAST_VERSION,
    lifecycle: 'internal_research_only',
    subject: pair.subject, target: pair.target,
    structural,
    synthesisDecision,
    historical: {
      sourceDisagreement: 'CLASSICAL_TEN_GOD_PAIRING_DISPUTED_BY_CLASSICAL_ELEMENT_METHOD',
      state: historicalRoles
        ? 'historical_male_female_scope_with_unsettled_conditions'
        : 'historical_role_scope_unmatched',
      tenGodVisibleInputs: mappedT5,
      elementExampleInputs: examples,
      sourceUrls: roleSource,
      paragraph: historicalRoles
        ? '두 명식에서 계산된 십신의 겉자리와 오행을 각각 대조했습니다. ' +
          visibleTenGodDescription + '. ' +
          '『명리탐원』의 두 조건부 오행 보완 예시를 글자 위치로만 확인하면 ' +
          originalExampleDescriptions + '입니다. ' +
          '그러나 십신 항목의 관측 개수는 원전의 중(重)·강약을 증명하지 않으며, ' +
          '오행 글자의 보임이나 일간 조건 일치 역시 원국의 왕쇠·실제 용신 ' +
          '선정·상대 오행 세력의 충족을 증명하지 않습니다. ' +
          '고전의 십신 짝짓기와 오행 필요 조건은 서로 다른 방법이며, ' +
          '원전 자체가 단순 십신 짝짓기의 충분성을 반박합니다. ' +
          '실제 두 사람에게 상반된 궁합 결과가 입증된 것은 아닙니다.'
        : '이 고전의 역사적 남녀 역할 적용 조건에 해당하지 않습니다. ' +
          '고전 사이의 방법론 이견을 이 두 사람의 관계 결과로 옮길 수 없습니다.',
      oppositeChartOutcomesEstablished: false,
      relationPriorityEstablished: false,
    },
    unresolvedMethodPrerequisites: unique([
      ...coexisting.synthesis.missingPrerequisites,
      ...six.missingPrerequisites,
      ...useful.missingPrerequisites,
      ...axes.flatMap(axis => [...axis.unresolvedPrerequisites]),
    ]),
    state: 'competing_observations_no_admitted_precedence',
    pairwiseT10Admitted: false,
    interpersonalConclusion: null,
    compatibilityScore: null,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
