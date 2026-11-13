import { T10_DIRECT_DAY_COMPARISON_SOURCE } from
  './compatibility-t10-direct-day-comparison.js';
import type {
  T10SourceBoundObservationReadingV1,
  T10ObservedDayAxisFactorTraceV1,
} from './compatibility-t10-source-bound-observation-reading.js';
import type { T10HistoricalDayYearObservation } from
  './compatibility-t10-historical-day-year-observation.js';
import type { T10CrossMethodContrastResearchV1 } from
  './compatibility-t10-cross-method-contrast.js';
import type { T10ThreeMethodApplicabilityReadingV1 } from
  './compatibility-t10-three-method-applicability-reading.js';

export const T10_PAIR_READING_BOUNDARY_DRAFT_VERSION =
  'saju-t10-pair-reading-boundary-draft-v1' as const;

type ChartPerson = T10SourceBoundObservationReadingV1['subject'];

export interface T10PairDraftSentence {
  readonly paragraph: string;
  readonly evidenceLayer: 'calculated_structure' | 'traditional_reference' |
    'traditional_factor_scope' |
    'method_applicability' | 'unresolved_synthesis' | 'missing_input' |
    'source_limit';
  readonly observedFactPaths: readonly string[];
  readonly consideredButUnverifiedFactPaths: readonly string[];
  readonly sourceIds: readonly string[];
  readonly sourceUrls: readonly string[];
  readonly definitionContentHashes: readonly string[];
  readonly missingPrerequisites: readonly string[];
  readonly individualRelationshipOutcomeAuthorized: false;
}

export interface T10PairDraftSection {
  readonly id: 'direct_day_facts' | 'traditional_day_factor_scope' |
    'day_to_year_facts' | 'mixed_positions' |
    'historical_method_disagreement' | 'synthesis_hold' | 'palace_method' |
    'six_spirits_method' | 'useful_god_method' | 'reading_limits';
  readonly title: string;
  readonly sentences: readonly T10PairDraftSentence[];
}

export interface T10PairReadingBoundaryDraftV1 {
  readonly version: typeof T10_PAIR_READING_BOUNDARY_DRAFT_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: ChartPerson;
  readonly target: ChartPerson;
  readonly mode: 'source_bounded_factual_research_not_compatibility';
  readonly structuralSituation:
    'day_six_combination_with_other_clash' |
    'day_clash_with_other_six_combination' |
    'no_source_qualified_mixed_day_structure';
  readonly sections: readonly T10PairDraftSection[];
  /** A readable joined version of exactly the sourced paragraphs above. */
  readonly koreanReadingDraft: string;
  readonly permissionToChooseBestEvidence: false;
  readonly mayInterpretOverallCompatibility: false;
  readonly relationshipOutcome: null;
  readonly compatibilityScore: null;
  readonly eligibleForFirstComparison: false;
  readonly eligibleForRepeatComparison: false;
  readonly eligibleForNatalAndFirstBundle: false;
  readonly mayPublish: false;
  readonly mayPersist: false;
  readonly maySell: false;
}

function samePerson(
  a: ChartPerson,
  b: Pick<ChartPerson, 'personRef' | 'snapshotId' | 'calculationHash'>,
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash;
}
function unique(items: readonly string[]): string[] {
  return [...new Set(items)];
}

/** Maps observed source factors; full 형(刑) conditions and interpersonal fate remain unverified. */
const FACTOR_KOREAN = {
  stem_five_combination: '천간오합',
  stem_clash_pair: '천간충 글자쌍',
  branch_six_combination: '지지육합',
  branch_clash: '지지충',
  branch_harm: '지지육해',
  branch_punishment_direction: '고전 지지형 방향 대응',
  elemental_same: '오행 상비',
  elemental_generation: '오행 상생',
  elemental_control: '오행 상극',
} as const;
const DIRECTION_KOREAN = {
  same_element: '같은 오행',
  subject_generates_target: '첫 번째 사람이 두 번째 사람을 생하는 방향',
  target_generates_subject: '두 번째 사람이 첫 번째 사람을 생하는 방향',
  subject_controls_target: '첫 번째 사람이 두 번째 사람을 극하는 방향',
  target_controls_subject: '두 번째 사람이 첫 번째 사람을 극하는 방향',
} as const;

function axisEvidenceParagraph(
  label: '일간' | '일지',
  axis: T10ObservedDayAxisFactorTraceV1,
): string {
  const ids = axis.observedFactorIds;
  const positive = ids.some(id => id === 'stem_five_combination' ||
    id === 'branch_six_combination' || id === 'elemental_same' ||
    id === 'elemental_generation');
  const negative = ids.some(id => id === 'stem_clash_pair' ||
    id === 'branch_clash' ||
    id === 'branch_harm' || id === 'branch_punishment_direction' ||
    id === 'elemental_control');
  const inferredGroup = axis.firstElement === null || axis.secondElement === null ||
      axis.elementRelation === null ? 'incomplete_day_pillar'
    : positive && negative ? 'mixed_source_factors'
      : positive ? 'covered_positive_subset'
        : negative ? 'covered_negative_subset' : 'not_classified';
  if (axis.group !== inferredGroup || !ids.length ||
      axis.firstElement === null || axis.secondElement === null ||
      axis.elementRelation === null ||
      unique(ids).length !== ids.length ||
      ids.some(id => label === '일간'
        ? id === 'branch_six_combination' || id === 'branch_clash'
        : id === 'stem_five_combination' || id === 'stem_clash_pair')) {
    throw new TypeError('T10 2016 day-factor wording must match verified axis factors.');
  }
  return label + '(첫 번째 사람 ' + axis.firstElement + ', 두 번째 사람 ' +
    axis.secondElement + ', ' + DIRECTION_KOREAN[axis.elementRelation] +
    ')에서는 ' + ids.map(id => FACTOR_KOREAN[id]).join('·') +
    '이 관측됩니다.';
}

function factualSentence(
  sentence: T10SourceBoundObservationReadingV1['sentences'][number],
): T10PairDraftSentence {
  return {
    paragraph: sentence.paragraph,
    evidenceLayer: sentence.kind === 'unknown_hour' ? 'missing_input'
      : sentence.kind === 'source_limit' ||
        sentence.kind === 'foreign_break_method_dispute'
        ? 'source_limit' : 'calculated_structure',
    observedFactPaths: sentence.kind === 'unknown_hour'
      ? [] : sentence.observedFactPaths,
    consideredButUnverifiedFactPaths: sentence.kind === 'unknown_hour'
      ? sentence.observedFactPaths : [],
    sourceIds: sentence.sourceIds,
    sourceUrls: sentence.sourceUrls,
    definitionContentHashes: sentence.definitionContentHashes,
    missingPrerequisites: sentence.kind === 'unknown_hour'
      ? ['UNKNOWN_BIRTH_HOUR_CANNOT_BE_INFERRED']
      : sentence.kind === 'source_limit'
        ? ['FULL_2016_CASE_METHOD_AND_EXCEPTION_TEXT']
        : sentence.kind === 'foreign_break_method_dispute'
          ? ['FOREIGN_LIUREN_METHOD_NOT_BAZI_T10_RULE',
            'BAZI_PRIMARY_TEXT_CONTESTS_BREAK_AS_STANDALONE_FACTOR',
            '2016_MARITAL_BREAK_METHOD_FULL_TEXT_NOT_VERIFIED']
          : [],
    individualRelationshipOutcomeAuthorized: false,
  };
}

/** Composes existing source-limited observations without adding a T10 Rule. */
export function buildT10PairReadingBoundaryDraftV1(
  factual: T10SourceBoundObservationReadingV1,
  historical: T10HistoricalDayYearObservation,
  contrast: T10CrossMethodContrastResearchV1,
  methods: T10ThreeMethodApplicabilityReadingV1,
): T10PairReadingBoundaryDraftV1 {
  if (factual.lifecycle !== 'internal_research_only' ||
      factual.mayPublish !== false || factual.maySell !== false ||
      factual.sourceQualifiedFourCase !== null ||
      factual.compatibilityScore !== null ||
      factual.compositeCompatibilityMeaning !== null ||
      historical.lifecycle !== 'internal_research_only' ||
      historical.maySell !== false || historical.mayPublish !== false ||
      historical.primary1983SourceVerified !== false ||
      historical.relationshipOutcomeAuthorized !== false ||
      historical.compatibilityVerdict !== null ||
      contrast.lifecycle !== 'internal_research_only' ||
      contrast.maySell !== false || contrast.pairwiseT10Admitted !== false ||
      contrast.interpersonalConclusion !== null ||
      contrast.state !== 'competing_observations_no_admitted_precedence' ||
      contrast.historical.oppositeChartOutcomesEstablished !== false ||
      contrast.historical.relationPriorityEstablished !== false ||
      methods.lifecycle !== 'internal_research_only' ||
      methods.maySell !== false || methods.sourceQualifiedT10ReadingComplete !== false ||
      methods.sourceQualifiedThreeMethodPriority !== null ||
      methods.relationshipVerdict !== null ||
      methods.axes.map(axis => axis.method).join('|') !==
        'palace|six_spirits|useful_god' ||
      methods.axes.some(axis => axis.sourceQualifiedInterpersonalRule !== false ||
        axis.relationshipOutcomeAuthorized !== false) ||
      !samePerson(factual.subject, historical.subject) ||
      !samePerson(factual.target, historical.target) ||
      !samePerson(factual.subject, contrast.subject) ||
      !samePerson(factual.target, contrast.target) ||
      !samePerson(factual.subject, methods.subject) ||
      !samePerson(factual.target, methods.target) ||
      factual.subject.personRef === factual.target.personRef ||
      contrast.structural.length > 1 ||
      contrast.structural.some(item => item.netRelationshipMeaning !== null ||
        item.conditionalPriorityEstablished !== false)) {
    throw new TypeError('T10 bounded reading requires the same unpromoted chart evidence.');
  }
  const mixed = contrast.structural[0];
  const sourceMixed = factual.sentences.find(item =>
    item.kind === 'cross_position_opposite');
  if (Boolean(mixed) !== Boolean(sourceMixed) ||
      (mixed && sourceMixed && (
        !mixed.dayFactPaths.every(path => sourceMixed.observedFactPaths.includes(path)) ||
        !mixed.otherFactPaths.every(item =>
          sourceMixed.observedFactPaths.includes(item.subject) &&
          sourceMixed.observedFactPaths.includes(item.target))))) {
    throw new TypeError('T10 combined reading must preserve the original mixed-position facts.');
  }
  if (historical.sentences.some(sentence =>
    sentence.historicalMeaningVerified !== false ||
    sentence.interpersonalMeaningAuthorized !== false ||
    !sentence.observedFactPaths.some(path => path.includes('.pillars.year.')) ||
    sentence.observedFactPaths.length !== 2 ||
    !sentence.sourceIds.length || !sentence.calculationSourceUrls.length ||
    !sentence.historicalClauseUrl ||
    !sentence.definitionContentHash)) {
    throw new TypeError('T10 historical year text requires direct unpromoted original sources.');
  }

  const sections: T10PairDraftSection[] = [];
  const add = (
    id: T10PairDraftSection['id'],
    title: string,
    sentences: readonly T10PairDraftSentence[],
  ): void => {
    if (sentences.length > 0) sections.push({ id, title, sentences });
  };
  const dayFacts = factual.sentences.filter(item =>
    item.evidenceScope === 'calculated_structural_fact' &&
    item.kind !== 'unknown_hour' && item.kind !== 'cross_position_opposite');
  add('direct_day_facts', '두 사람의 일간·일지 관측', dayFacts.map(factualSentence));
  // Interpret only the 2016 abstract's historical factor grouping, not outcomes.
  const factorFacts = factual.sentences.filter(item =>
    item.kind === 'day_stem_elements' || item.kind === 'day_branch_elements' ||
    item.kind === 'day_stem_combination' ||
    item.kind === 'day_stem_clash_pair' || item.kind === 'day_branch_structure' ||
    item.kind === 'day_branch_harm' ||
    item.kind === 'day_branch_punishment_direction' ||
    item.kind === 'same_slot_competing_factors');
  if (factorFacts.filter(item => item.kind === 'day_stem_elements' ||
        item.kind === 'day_branch_elements').length === 2 &&
      factual.sourceTextLayer === 'DBPIA_PUBLIC_ABSTRACT') {
    const labels = {
      STEM_POSITIVE_BRANCH_POSITIVE:
        '일간 상생·상비·합 계열 / 일지 상생·상비·합 계열',
      STEM_POSITIVE_BRANCH_NEGATIVE:
        '일간 상생·상비·합 계열 / 일지 충·극·형·파·해 계열',
      STEM_NEGATIVE_BRANCH_POSITIVE:
        '일간 상극·충 계열 / 일지 상생·상비·합 계열',
      STEM_NEGATIVE_BRANCH_NEGATIVE:
        '일간 상극·충 계열 / 일지 충·극·형·파·해 계열',
    } as const;
    const cell = factual.observedFourCaseCandidate;
    const axis = factual.dayAxisFactorTrace;
    const expectedCell = axis.stem.group === 'covered_positive_subset'
      ? axis.branch.group === 'covered_positive_subset'
        ? 'STEM_POSITIVE_BRANCH_POSITIVE'
        : axis.branch.group === 'covered_negative_subset'
          ? 'STEM_POSITIVE_BRANCH_NEGATIVE' : 'unclassified'
      : axis.stem.group === 'covered_negative_subset'
        ? axis.branch.group === 'covered_positive_subset'
          ? 'STEM_NEGATIVE_BRANCH_POSITIVE'
          : axis.branch.group === 'covered_negative_subset'
            ? 'STEM_NEGATIVE_BRANCH_NEGATIVE' : 'unclassified'
        : 'unclassified';
    if (expectedCell !== cell ||
        !axis.stem.notEvaluatedFactorIds.includes('stem_clash') ||
        !['punishment', 'break'].every(id =>
          axis.branch.notEvaluatedFactorIds.includes(id))) {
      throw new TypeError('T10 four-case scope must keep uncalculated factors explicit.');
    }
    const observedAxes = axisEvidenceParagraph('일간', axis.stem) + ' ' +
      axisEvidenceParagraph('일지', axis.branch);
    const classification = cell === 'unclassified'
      ? '같은 축에서 상반된 전통 요인이 함께 나타나거나 근거 범위가 부족하여 ' +
        '공개 초록의 네 유형 중 하나로 단독 분류할 수 없습니다.'
      : '확인한 일부 요인은 공개 초록의 "' + labels[cell] +
        '" 비교 유형에 부분적으로 대응합니다.';
    add('traditional_day_factor_scope', '2016년 전통 부부 궁위론의 비교 요인', [{
      paragraph: '이창임(2016)의 기혼 부부 연구는 일간·일지에서 ' +
        '상생·상비·합을 전통적 긍정 요소로, 충·극 등의 관계를 전통적 ' +
        '부정 요소로 구분하여 네 경우를 비교합니다. ' +
        observedAxes + ' ' + classification +
        ' 천간충의 원국 강약·지지 지원·화충·제충 조건과 ' +
        '지지형의 전체 성립 조건 및 지지파는 확인하지 않았습니다. ' +
        '이는 전통적 요인 설명이지 두 사람의 실제 소통·관계 만족·' +
        '결혼 결과를 판정한 것이 아닙니다.',
      evidenceLayer: 'traditional_factor_scope',
      observedFactPaths: unique(factorFacts.flatMap(item => [...item.observedFactPaths])),
      consideredButUnverifiedFactPaths: [],
      sourceIds: unique(factorFacts.flatMap(item => [...item.sourceIds])),
      sourceUrls: unique([T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl,
        ...factorFacts.flatMap(item => [...item.sourceUrls])]),
      definitionContentHashes: unique(factorFacts.flatMap(item =>
        [...item.definitionContentHashes])),
      missingPrerequisites: [
        'FULL_2016_CASE_METHOD_AND_EXCEPTIONS_NOT_VERIFIED',
        'DAY_STEM_CLASH_AND_BRANCH_PUNISHMENT_BREAK_NOT_EVALUATED',
        '2016_MARITAL_FACTOR_TO_INDIVIDUAL_OUTCOME_NOT_VALIDATED',
      ],
      individualRelationshipOutcomeAuthorized: false,
    }, {
      // The 2016 qualitative interview finding is a source-level exception
      // to automatic outcomes, never an observation of these chart holders.
      paragraph: '같은 2016년 연구의 공개 초록은 겉궁합이 맞지 않는다고 ' +
        '여겨진 부부라도 서로의 차이를 인정하고 역할에 합의한 경우 ' +
        '원만한 결혼생활을 유지했다고 보고합니다. 이 질적 사례는 ' +
        '명식의 전통적 비교 요인만으로 두 사람의 실제 소통이나 ' +
        '관계 결과를 정할 수 없다는 주의 근거입니다. ' +
        '현재 비교하는 두 사람이 그러한 행동을 했거나 앞으로 ' +
        '하게 된다는 뜻은 아닙니다.',
      evidenceLayer: 'source_limit',
      observedFactPaths: [],
      consideredButUnverifiedFactPaths: [],
      sourceIds: [],
      sourceUrls: [T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl],
      definitionContentHashes: [],
      missingPrerequisites: [
        'FULL_2016_INTERVIEW_CASE_AND_METHOD_NOT_VERIFIED',
        'CURRENT_PAIR_TO_2016_INTERVIEW_CASE_NOT_LINKED',
      ],
      individualRelationshipOutcomeAuthorized: false,
    }]);
  }

  add('day_to_year_facts', '본인의 일주와 상대의 출생연도 비교',
    historical.sentences.map(item => ({
      paragraph: item.paragraph,
      evidenceLayer: 'traditional_reference' as const,
      observedFactPaths: item.observedFactPaths,
      consideredButUnverifiedFactPaths: [],
      sourceIds: item.sourceIds,
      sourceUrls: [...item.calculationSourceUrls, item.historicalClauseUrl],
      definitionContentHashes: [item.definitionContentHash],
      missingPrerequisites: ['BAEK_1983_P189_PRIMARY_TEXT_NOT_VERIFIED'],
      individualRelationshipOutcomeAuthorized: false as const,
    })));
  if (mixed) {
    const dayKind = mixed.direction === 'day_six_combination_with_other_clash'
      ? 'branch_six_combination' : 'branch_clash';
    if (mixed.dayFactValues.kind !== dayKind ||
        !mixed.dayFactValues.subject || !mixed.dayFactValues.target ||
        !mixed.otherFactPaths.length ||
        mixed.otherFactPaths.some(item => item.kind === dayKind ||
          !item.subjectValue || !item.targetValue ||
          !mixed.paragraph.includes(item.subjectValue) ||
          !mixed.paragraph.includes(item.targetValue)) ||
        !mixed.paragraph.includes(mixed.dayFactValues.subject) ||
        !mixed.paragraph.includes(mixed.dayFactValues.target)) {
      throw new TypeError('T10 mixed sentence requires observed values from both charts.');
    }
    add('mixed_positions', '서로 다른 위치의 상충 구조', [{
      paragraph: mixed.paragraph,
      evidenceLayer: 'unresolved_synthesis',
      observedFactPaths: unique([
        ...mixed.dayFactPaths,
        ...mixed.otherFactPaths.flatMap(item => [item.subject, item.target]),
      ]),
      consideredButUnverifiedFactPaths: [],
      sourceIds: unique(mixed.otherFactPaths.flatMap(item => [...item.sourceIds])),
      sourceUrls: [...mixed.sources],
      definitionContentHashes: unique(mixed.otherFactPaths.map(
        item => item.definitionContentHash)),
      missingPrerequisites: ['EXACT_TWO_PERSON_PRIORITIZATION_RULE'],
      individualRelationshipOutcomeAuthorized: false,
    }]);
  }
  const decision = contrast.synthesisDecision;
  if (decision.qualitativeCounterexample.sourceUrl !==
        T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl ||
      decision.qualitativeCounterexample.sourcePopulation !==
        T10_DIRECT_DAY_COMPARISON_SOURCE.subjectPopulation ||
      decision.qualitativeCounterexample.publicAbstractOnly !== true ||
      decision.qualitativeCounterexample
        .conflictingTraditionalFactorCanHaveDifferentObservedOutcomes !== true ||
      decision.qualitativeCounterexample.currentPairInterviewed !== false ||
      decision.qualitativeCounterexample.currentPairBehaviorObserved !== false ||
      decision.qualitativeCounterexample.currentPairOutcomeInferred !== false ||
      !decision.sourceUrls.includes(T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl) ||
      !decision.unresolvedPrerequisites.includes(
        'CURRENT_PAIR_TO_2016_INTERVIEW_CASE_NOT_LINKED') ||
      decision.sourceQualifiedPriorityEstablished !== false ||
      decision.relationshipConclusion !== null ||
      decision.compatibilityScore !== null ||
      decision.noObservedOppositionProvesHarmony !== false ||
      !decision.unresolvedPrerequisites.includes(
        'SOURCE_VALIDATED_RELATIONSHIP_OUTCOME_METHOD') ||
      decision.historicalMethodScope !== (
        contrast.historical.state ===
        'historical_male_female_scope_with_unsettled_conditions'
          ? 'historical_male_female_unresolved' : 'historical_roles_not_matched') ||
      decision.caseId !== (mixed
        ? mixed.direction === 'day_six_combination_with_other_clash'
          ? 'day_six_combination_vs_other_clash'
          : 'day_clash_vs_other_six_combination'
        : 'no_listed_opposite_positions')) {
    throw new TypeError('T10 synthesis HOLD cannot invent a priority or relational meaning.');
  }
  add('synthesis_hold', '복수 근거의 종합 보류 판정', [{
    paragraph: decision.paragraph,
    evidenceLayer: 'unresolved_synthesis',
    observedFactPaths: decision.observedFactPaths,
    consideredButUnverifiedFactPaths: decision.unverifiedFactPaths,
    sourceIds: decision.sourceIds,
    sourceUrls: decision.sourceUrls,
    definitionContentHashes: decision.definitionContentHashes,
    missingPrerequisites: decision.unresolvedPrerequisites,
    individualRelationshipOutcomeAuthorized: false,
  }]);
  add('historical_method_disagreement', '고전 방법의 적용 한계', [{
    paragraph: contrast.historical.paragraph,
    evidenceLayer: 'unresolved_synthesis',
    observedFactPaths: unique([
      ...contrast.historical.tenGodVisibleInputs.flatMap(item =>
        [...item.canonicalFactPaths]),
      ...contrast.historical.elementExampleInputs.flatMap(item =>
        [...item.counterpartVisibleFactPaths]),
    ]),
    consideredButUnverifiedFactPaths: unique([
      ...contrast.historical.tenGodVisibleInputs.flatMap(item =>
        [...item.unresolvedFactPaths]),
    ]),
    sourceIds: [],
    sourceUrls: [...contrast.historical.sourceUrls],
    definitionContentHashes: [],
    missingPrerequisites: contrast.unresolvedMethodPrerequisites,
    individualRelationshipOutcomeAuthorized: false,
  }]);
  const ids = ['palace_method', 'six_spirits_method', 'useful_god_method'] as const;
  const titles = ['궁위론 검증 범위', '육신론 검증 범위', '용신론 검증 범위'] as const;
  methods.axes.forEach((axis, i) => {
    const id = ids[i];
    const title = titles[i];
    if (!id || !title) throw new TypeError('Unexpected T10 method axis.');
    add(id, title, [{
      paragraph: axis.paragraph,
      evidenceLayer: 'method_applicability',
      observedFactPaths: [],
      consideredButUnverifiedFactPaths: axis.consideredInputFactPaths,
      sourceIds: [],
      sourceUrls: axis.sourceUrls,
      definitionContentHashes: [],
      missingPrerequisites: axis.unresolvedPrerequisites,
      individualRelationshipOutcomeAuthorized: false,
    }]);
  });
  add('reading_limits', '실제 관계 판단의 보류 이유', [
    ...factual.sentences.filter(item =>
      item.kind === 'unknown_hour' || item.kind === 'source_limit' ||
      item.kind === 'foreign_break_method_dispute').map(factualSentence),
    {
      paragraph: '계산된 합·충과 고전의 비교 방법만으로는 두 사람의 ' +
        '관계 만족도, 결혼 성사, 이혼 여부 또는 상호 적합성을 단정할 수 없습니다. ' +
        '검증된 종합 규칙이 없어 이 연구 초안은 궁합 판정을 제공하지 않습니다.',
      evidenceLayer: 'source_limit',
      observedFactPaths: [],
      consideredButUnverifiedFactPaths: [],
      sourceIds: [],
      sourceUrls: unique([
        ...contrast.historical.sourceUrls,
        ...methods.axes.flatMap(axis => [...axis.sourceUrls]),
      ]),
      definitionContentHashes: [],
      missingPrerequisites: unique([
        ...contrast.unresolvedMethodPrerequisites,
        'SOURCE_VALIDATED_RELATIONSHIP_OUTCOME_METHOD',
      ]),
      individualRelationshipOutcomeAuthorized: false,
    },
  ]);
  if (sections.some(section => !section.sentences.length ||
      section.sentences.some(item =>
        !item.paragraph.trim() ||
        item.individualRelationshipOutcomeAuthorized !== false ||
        (item.evidenceLayer !== 'missing_input' &&
          !item.sourceUrls.length)))) {
    throw new TypeError('A T10 draft sentence must remain evidence-grounded or explicitly missing.');
  }
  const koreanReadingDraft = sections.map(section =>
    section.title + '\n' +
    section.sentences.map(sentence => sentence.paragraph).join('\n')).join('\n\n');
  return {
    version: T10_PAIR_READING_BOUNDARY_DRAFT_VERSION,
    lifecycle: 'internal_research_only',
    subject: factual.subject,
    target: factual.target,
    mode: 'source_bounded_factual_research_not_compatibility',
    structuralSituation: mixed?.direction ?? 'no_source_qualified_mixed_day_structure',
    sections,
    koreanReadingDraft,
    permissionToChooseBestEvidence: false,
    mayInterpretOverallCompatibility: false,
    relationshipOutcome: null,
    compatibilityScore: null,
    eligibleForFirstComparison: false,
    eligibleForRepeatComparison: false,
    eligibleForNatalAndFirstBundle: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
