import type { CrossChartStructuralMatch } from './family-pair-source-scope-handoff.js';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_SOURCE_CATALOG,
} from '../calculation/structural-relations.js';
import type {
  ElementPairKind,
  DayElementComparisonV1,
  T10DirectDayComparisonResearchV1,
} from './compatibility-t10-direct-day-comparison.js';
import {
  T10_DIRECT_DAY_COMPARISON_SOURCE,
  T10_FIVE_ELEMENT_CYCLE_SOURCE,
} from './compatibility-t10-direct-day-comparison.js';
import type { CompatibilityT10CoexistingEvidenceReviewV1 } from
  './compatibility-t10-coexisting-evidence-review.js';

export const T10_SOURCE_BOUND_OBSERVATION_READING_VERSION =
  'saju-t10-protected-source-bound-observations-v1' as const;

type ObservationKind =
  'day_stem_elements' | 'day_branch_elements' | 'day_stem_combination' |
  'day_branch_structure' | 'same_slot_competing_factors' |
  'cross_position_opposite' | 'unknown_hour' | 'source_limit';

export interface T10SourceBoundObservationSentenceV1 {
  readonly kind: ObservationKind;
  readonly paragraph: string;
  readonly observedFactPaths: readonly string[];
  readonly sourceIds: readonly string[];
  readonly sourceUrls: readonly string[];
  readonly definitionContentHashes: readonly string[];
  readonly evidenceScope: 'calculated_structural_fact' | 'source_method_limit';
  readonly interpersonalMeaningAuthorized: false;
}

/** Exact computed factors behind the 2016 four-group candidate; not a verdict. */
export interface T10ObservedDayAxisFactorTraceV1 {
  readonly group: T10DirectDayComparisonResearchV1['dayStem']['group'];
  readonly firstElement: DayElementComparisonV1['subject']['value'] | null;
  readonly secondElement: DayElementComparisonV1['target']['value'] | null;
  readonly elementRelation: ElementPairKind | null;
  readonly observedFactorIds: readonly (
    'stem_five_combination' | 'branch_six_combination' | 'branch_clash' |
    'elemental_same' | 'elemental_generation' | 'elemental_control'
  )[];
  readonly notEvaluatedFactorIds: readonly string[];
}

export interface T10SourceBoundObservationReadingV1 {
  readonly version: typeof T10_SOURCE_BOUND_OBSERVATION_READING_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: T10DirectDayComparisonResearchV1['subject'];
  readonly target: T10DirectDayComparisonResearchV1['target'];
  readonly sourceTextLayer: 'DBPIA_PUBLIC_ABSTRACT';
  /** The abstract's four cases remain computational candidates, not approved rules. */
  readonly observedFourCaseCandidate: T10DirectDayComparisonResearchV1['observedAbstractCell'];
  readonly dayAxisFactorTrace: Readonly<{
    stem: T10ObservedDayAxisFactorTraceV1;
    branch: T10ObservedDayAxisFactorTraceV1;
  }>;
  readonly sourceQualifiedFourCase: null;
  readonly sentences: readonly T10SourceBoundObservationSentenceV1[];
  readonly compositeCompatibilityMeaning: null;
  readonly compatibilityScore: null;
  readonly mayPublish: false;
  readonly maySell: false;
}

const ELEMENT_RELATION_KOREAN: Readonly<Record<ElementPairKind, string>> = {
  same_element: '같은 오행',
  subject_generates_target: '첫 번째 사람의 오행이 두 번째 사람의 오행을 생하는 방향',
  target_generates_subject: '두 번째 사람의 오행이 첫 번째 사람의 오행을 생하는 방향',
  subject_controls_target: '첫 번째 사람의 오행이 두 번째 사람의 오행을 극하는 방향',
  target_controls_subject: '두 번째 사람의 오행이 첫 번째 사람의 오행을 극하는 방향',
};

function equalPerson(
  a: T10DirectDayComparisonResearchV1['subject'],
  b: CompatibilityT10CoexistingEvidenceReviewV1['subject'],
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash &&
    a.birthTimeKnown === b.birthTimeKnown;
}

const ORIGINAL_STRUCTURAL_SOURCES = [
  STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan,
  STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue,
] as const;

/** A structural sentence cites its actual rule table, NOT the 2016 sample study. */
function verifyMatch(match: CrossChartStructuralMatch): void {
  const component = match.kind === 'stem_five_combination' ? 'stem' : 'branch';
  const sourceIdsValid = match.sourceIds.length === ORIGINAL_STRUCTURAL_SOURCES.length &&
    ORIGINAL_STRUCTURAL_SOURCES.every(source =>
      match.sourceIds.includes(source.sourceId));
  if (match.pairwiseMeaningAuthorized !== false ||
      match.definitionContentHash !== STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH ||
      !sourceIdsValid || match.component !== component ||
      !match.subject.factPath.startsWith('subject.pillars.') ||
      !match.target.factPath.startsWith('target.pillars.') ||
      !match.subject.factPath.endsWith('.value.' + component) ||
      !match.target.factPath.endsWith('.value.' + component)) {
    throw new TypeError('T10 observation sentence requires exact chart and source evidence.');
  }
}

function structuralSourceUrls(): string[] {
  return ORIGINAL_STRUCTURAL_SOURCES.map(source => source.url);
}

function unique(items: readonly string[]): string[] {
  return [...new Set(items)];
}

function elementSentence(
  kind: 'day_stem_elements' | 'day_branch_elements',
  element: DayElementComparisonV1,
): T10SourceBoundObservationSentenceV1 {
  if (element.pairwiseMeaningAuthorized !== false ||
      element.source.sourceId !== T10_FIVE_ELEMENT_CYCLE_SOURCE.sourceId ||
      element.source.url !== T10_FIVE_ELEMENT_CYCLE_SOURCE.url ||
      element.source.scope !== 'ELEMENT_CYCLE_FACTS_ONLY_NOT_INTERPERSONAL_MEANING' ||
      element.subject.factPath !== 'subject.pillars.day.value.' +
        (kind === 'day_stem_elements' ? 'stem' : 'branch') + '.element' ||
      element.target.factPath !== 'target.pillars.day.value.' +
        (kind === 'day_stem_elements' ? 'stem' : 'branch') + '.element') {
    throw new TypeError('T10 element text requires two original day-pillar facts.');
  }
  const label = kind === 'day_stem_elements' ? '일간' : '일지';
  return {
    kind,
    paragraph: '두 사람의 ' + label + ' 오행은 각각 ' +
      element.subject.value + '과 ' + element.target.value + '이며 계산상 ' +
      ELEMENT_RELATION_KOREAN[element.relation] + '입니다.',
    observedFactPaths: [element.subject.factPath, element.target.factPath],
    sourceIds: [element.source.sourceId],
    sourceUrls: [element.source.url],
    definitionContentHashes: [],
    evidenceScope: 'calculated_structural_fact',
    interpersonalMeaningAuthorized: false,
  };
}

function structuralSentence(
  kind: 'day_stem_combination' | 'day_branch_structure',
  match: CrossChartStructuralMatch,
): T10SourceBoundObservationSentenceV1 {
  verifyMatch(match);
  const term = match.kind === 'stem_five_combination' ? '천간오합'
    : match.kind === 'branch_six_combination' ? '지지육합' : '지지충';
  const part = kind === 'day_stem_combination' ? '일간' : '일지';
  return {
    kind,
    paragraph: '첫 번째 사람의 ' + part + ' ' + match.subject.value +
      '과 두 번째 사람의 ' + part + ' ' + match.target.value +
      ' 사이에 ' + term + ' 구조가 관측됩니다.',
    observedFactPaths: [match.subject.factPath, match.target.factPath],
    sourceIds: unique(match.sourceIds),
    sourceUrls: structuralSourceUrls(),
    definitionContentHashes: [match.definitionContentHash],
    evidenceScope: 'calculated_structural_fact',
    interpersonalMeaningAuthorized: false,
  };
}

/**
 * Produces source-linked Korean factual sentences only. This is not a dyadic
 * compatibility interpretation, and never enters the consumer preview.
 */
export function buildT10SourceBoundObservationReadingV1(
  direct: T10DirectDayComparisonResearchV1,
  coexisting: CompatibilityT10CoexistingEvidenceReviewV1,
): T10SourceBoundObservationReadingV1 {
  if (direct.lifecycle !== 'internal_research_only' ||
      coexisting.lifecycle !== 'internal_research_only' ||
      !equalPerson(direct.subject, coexisting.subject) ||
      !equalPerson(direct.target, coexisting.target) ||
      direct.subject.personRef === direct.target.personRef ||
      direct.pairwiseT10Admitted !== false ||
      direct.mayPublish !== false || direct.maySell !== false ||
      direct.mayClaimInterpersonalMeaning !== false ||
      direct.source.verifiedTextLayer !== 'DBPIA_PUBLIC_ABSTRACT' ||
      direct.source.fullTextMethodVerified !== false ||
      direct.sourceFactorAudit.classificationBasis !== 'computed_factor_subset_only' ||
      direct.sourceFactorAudit.sourceQualifiedFourCaseCell !== null ||
      direct.sourceFactorAudit.mayInferIndividualOutcome !== false ||
      coexisting.pairwiseT10Admitted !== false ||
      coexisting.mayPublish !== false || coexisting.maySell !== false ||
      coexisting.synthesis.state !== 'unresolved_no_source_qualified_pairwise_precedence' ||
      coexisting.synthesis.compatibilityScore !== null ||
      coexisting.synthesis.inferredOutcome !== null) {
    throw new TypeError('T10 observation reading requires protected matching research.');
  }

  const sentences: T10SourceBoundObservationSentenceV1[] = [];
  const addElement = (
    kind: 'day_stem_elements' | 'day_branch_elements',
    evidence: DayElementComparisonV1 | null,
  ): void => {
    if (evidence) sentences.push(elementSentence(kind, evidence));
  };
  addElement('day_stem_elements', direct.dayStem.elementalComparison);
  addElement('day_branch_elements', direct.dayBranch.elementalComparison);

  const stemMatch = direct.dayStem.verifiedStructuralMatch;
  const branchMatch = direct.dayBranch.verifiedStructuralMatch;
  if (stemMatch) sentences.push(structuralSentence('day_stem_combination', stemMatch));
  if (branchMatch) {
    verifyMatch(branchMatch);
    if (!coexisting.structural.dayToDayMatches.some(item =>
      item.kind === branchMatch.kind &&
      item.definitionContentHash === branchMatch.definitionContentHash &&
      item.subject.factPath === branchMatch.subject.factPath &&
      item.target.factPath === branchMatch.target.factPath)) {
      throw new TypeError('T10 day-branch text cannot detach from conflict source review.');
    }
    sentences.push(structuralSentence('day_branch_structure', branchMatch));
  }

  for (const [label, factor, structural] of [
    ['일간', direct.dayStem, stemMatch],
    ['일지', direct.dayBranch, branchMatch],
  ] as const) {
    if (!factor.conflictingFactors) continue;
    if (!structural || !factor.elementalComparison) {
      throw new TypeError('T10 competing factors require both grounded observations.');
    }
    verifyMatch(structural);
    sentences.push({
      kind: 'same_slot_competing_factors',
      paragraph: label + '에서 서로 다른 계산 요소가 동시에 관측되지만 ' +
        '한 요소를 다른 요소보다 우선하여 관계 결과를 단정할 근거는 없습니다.',
      observedFactPaths: unique([
        structural.subject.factPath, structural.target.factPath,
        factor.elementalComparison.subject.factPath,
        factor.elementalComparison.target.factPath,
      ]),
      sourceIds: unique([...structural.sourceIds,
        T10_FIVE_ELEMENT_CYCLE_SOURCE.sourceId]),
      sourceUrls: [...structuralSourceUrls(),
        T10_FIVE_ELEMENT_CYCLE_SOURCE.url],
      definitionContentHashes: [structural.definitionContentHash],
      evidenceScope: 'calculated_structural_fact',
      interpersonalMeaningAuthorized: false,
    });
  }

  const opposites = coexisting.structural.oppositeToDayFactor;
  if (opposites.length > 0) {
    if (!branchMatch ||
        coexisting.structural.dayBranchFactor.state !== 'candidate_factor') {
      throw new TypeError('Cross-position opposition needs one verified day anchor.');
    }
    opposites.forEach(verifyMatch);
    const otherKind = branchMatch.kind === 'branch_six_combination'
      ? '다른 위치의 지지충' : '다른 위치의 지지육합';
    sentences.push({
      kind: 'cross_position_opposite',
      paragraph: '일지끼리의 ' +
        (branchMatch.kind === 'branch_six_combination' ? '지지육합' : '지지충') +
        '과 ' + otherKind +
        '이 함께 관측되지만 두 위치의 해석 우선순위는 검증되지 않았습니다.',
      observedFactPaths: unique([branchMatch.subject.factPath,
        branchMatch.target.factPath, ...opposites.flatMap(item =>
          [item.subject.factPath, item.target.factPath])]),
      sourceIds: unique([ ...branchMatch.sourceIds,
        ...opposites.flatMap(item => [...item.sourceIds])]),
      sourceUrls: structuralSourceUrls(),
      definitionContentHashes: unique([branchMatch.definitionContentHash,
        ...opposites.map(item => item.definitionContentHash)]),
      evidenceScope: 'calculated_structural_fact',
      interpersonalMeaningAuthorized: false,
    });
  }

  const unknown = [direct.subject, direct.target]
    .filter(person => !person.birthTimeKnown);
  if (unknown.length > 0) {
    sentences.push({
      kind: 'unknown_hour',
      paragraph: '출생시각이 확인되지 않은 명식의 시주 비교는 미확정으로 남습니다.',
      observedFactPaths: unknown.map(person =>
        (person.personRef === direct.subject.personRef ? 'subject' : 'target') +
          '.pillars.hour'),
      sourceIds: [],
      sourceUrls: [],
      definitionContentHashes: [],
      evidenceScope: 'calculated_structural_fact',
      interpersonalMeaningAuthorized: false,
    });
  }

  sentences.push({
    kind: 'source_limit',
    paragraph: '2016년 부부궁합 연구의 공개 초록만으로는 실제 관계의 ' +
      '좋고 나쁨이나 미래 사건을 판단할 수 없으며 본문 방법과 예외도 미검증입니다.',
    observedFactPaths: [],
    sourceIds: [],
    sourceUrls: [T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl],
    definitionContentHashes: [],
    evidenceScope: 'source_method_limit',
    interpersonalMeaningAuthorized: false,
  });
  if (sentences.some(sentence => !sentence.paragraph.trim() ||
      (sentence.evidenceScope === 'calculated_structural_fact' &&
        sentence.kind !== 'unknown_hour' &&
        (sentence.observedFactPaths.length < 2 ||
          (sentence.sourceIds.length === 0 && sentence.sourceUrls.length === 0))) ||
      sentence.interpersonalMeaningAuthorized !== false)) {
    throw new TypeError('T10 observation sentences must retain factual evidence only.');
  }
  return {
    version: T10_SOURCE_BOUND_OBSERVATION_READING_VERSION,
    lifecycle: 'internal_research_only',
    subject: direct.subject,
    target: direct.target,
    sourceTextLayer: 'DBPIA_PUBLIC_ABSTRACT',
    observedFourCaseCandidate: direct.observedAbstractCell,
    dayAxisFactorTrace: {
      stem: {
        group: direct.dayStem.group,
        firstElement: direct.dayStem.elementalComparison?.subject.value ?? null,
        secondElement: direct.dayStem.elementalComparison?.target.value ?? null,
        elementRelation: direct.dayStem.elementalComparison?.relation ?? null,
        observedFactorIds: [...direct.sourceFactorAudit.dayStem.observed],
        notEvaluatedFactorIds: [...direct.sourceFactorAudit.dayStem.notEvaluated],
      },
      branch: {
        group: direct.dayBranch.group,
        firstElement: direct.dayBranch.elementalComparison?.subject.value ?? null,
        secondElement: direct.dayBranch.elementalComparison?.target.value ?? null,
        elementRelation: direct.dayBranch.elementalComparison?.relation ?? null,
        observedFactorIds: [...direct.sourceFactorAudit.dayBranch.observed],
        notEvaluatedFactorIds: [...direct.sourceFactorAudit.dayBranch.notEvaluated],
      },
    },
    sourceQualifiedFourCase: null,
    sentences,
    compositeCompatibilityMeaning: null,
    compatibilityScore: null,
    mayPublish: false,
    maySell: false,
  };
}
