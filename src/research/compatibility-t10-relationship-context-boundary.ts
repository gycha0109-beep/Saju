import {
  T10_DIRECT_DAY_COMPARISON_SOURCE,
} from './compatibility-t10-direct-day-comparison.js';
import {
  T10_CLASSICAL_CROSS_TEN_GOD_SOURCES,
} from './compatibility-t10-classical-cross-ten-god.js';
import type {
  T10PairDraftSection,
  T10PairReadingBoundaryDraftV1,
} from './compatibility-t10-pair-reading-boundary-draft.js';
import type {
  T10ProductReadingQualityReviewV1,
} from './compatibility-t10-product-reading-quality-review.js';

export const T10_RELATIONSHIP_CONTEXT_BOUNDARY_VERSION =
  'saju-t10-relationship-context-source-boundary-v1' as const;

/** Declared research comparison category; never inferred from birth symbols. */
export type T10DeclaredRelationshipContext =
  'married_couple' | 'romantic_partner' | 'friend' | 'family' |
  'colleague' | 'unspecified';

type SourceContext = 'married_or_divorced_couples' |
  'historical_male_female_marital_procedure';

export interface T10ContextSourcePopulation {
  readonly name: 'LEE_2016_QUALITATIVE' | 'NAM_KIM_2018_DIVORCED' |
    'KIM_2025_SPOUSE_STUDY' | 'CLASSICAL_MARRIAGE_DISCUSSION';
  readonly sourceUrl: string;
  readonly population: SourceContext;
  readonly layer: 'public_abstract_only' | 'author_posted_html' |
    'historical_original_public_transcription';
  readonly declaredContextOverlapsStudyPopulation: boolean;
  readonly relationshipVerdictSupported: false;
}

export interface T10RelationshipContextBoundaryV1 {
  readonly version: typeof T10_RELATIONSHIP_CONTEXT_BOUNDARY_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: T10PairReadingBoundaryDraftV1['subject'];
  readonly target: T10PairReadingBoundaryDraftV1['target'];
  readonly contextDeclaredByResearchCaller: T10DeclaredRelationshipContext;
  readonly contextVerifiedFromChart: false;
  readonly contextSourceApplicability:
    'marital_population_overlap_not_prediction' |
    'outside_verifiable_marital_population' |
    'no_relationship_context_supplied';
  readonly sourcePopulations: readonly T10ContextSourcePopulation[];
  readonly includedSectionIds: readonly T10PairDraftSection['id'][];
  readonly withheldMaritalMethodSectionIds: readonly T10PairDraftSection['id'][];
  readonly scopeParagraph: string;
  /** Only source-limited facts and, for marital scope, clearly limited methods. */
  readonly contextBoundedKoreanDraft: string;
  readonly allowedToGeneralizeMarriageRulesToOtherRelationships: false;
  readonly modernInterpersonalEffectEstablished: false;
  readonly relationshipVerdict: null;
  readonly compatibilityScore: null;
  readonly productInterpretationReady: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly mayPersist: false;
  readonly maySell: false;
}

const CONTEXTS: readonly T10DeclaredRelationshipContext[] = [
  'married_couple', 'romantic_partner', 'friend', 'family',
  'colleague', 'unspecified',
];
const NON_MARITAL_FACT_SECTIONS: readonly T10PairDraftSection['id'][] = [
  'direct_day_facts', 'mixed_positions', 'reading_limits',
];

function samePerson(
  a: T10PairReadingBoundaryDraftV1['subject'],
  b: T10ProductReadingQualityReviewV1['subject'],
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash &&
    a.birthTimeKnown === b.birthTimeKnown;
}

/**
 * Use verified chart observations unchanged, but restrict old spouse/marriage
 * literature to its declared research population. None of the old samples
 * establishes modern outcomes even when the caller declares a married couple.
 */
export function buildT10RelationshipContextBoundaryV1(
  draft: T10PairReadingBoundaryDraftV1,
  quality: T10ProductReadingQualityReviewV1,
  relationshipContext: T10DeclaredRelationshipContext,
): T10RelationshipContextBoundaryV1 {
  if (!CONTEXTS.includes(relationshipContext) ||
      draft.lifecycle !== 'internal_research_only' ||
      draft.mode !== 'source_bounded_factual_research_not_compatibility' ||
      draft.mayPublish !== false || draft.maySell !== false ||
      draft.mayInterpretOverallCompatibility !== false ||
      quality.lifecycle !== 'internal_research_only' ||
      quality.actualCompatibilityReadingReady !== false ||
      quality.maySell !== false || quality.mayPublish !== false ||
      quality.traceAudit.exactSourceDerivedDraft !== true ||
      quality.traceAudit.allSentencesHaveRequiredProvenance !== true ||
      quality.traceAudit.sectionToTextRoundTrip !== true ||
      quality.productEligibility.length !== 3 ||
      quality.productEligibility.some(product =>
        product.t10IndependentInterpretationReady !== false ||
        product.eligibleToHandoffForSalesOrIssuance !== false) ||
      !samePerson(draft.subject, quality.subject) ||
      !samePerson(draft.target, quality.target) ||
      draft.subject.personRef === draft.target.personRef ||
      !draft.sections.some(section => section.id === 'reading_limits')) {
    throw new TypeError('T10 relation context requires verified unpromoted two-person research.');
  }
  const marital = relationshipContext === 'married_couple';
  const overlap = marital
    ? 'marital_population_overlap_not_prediction'
    : relationshipContext === 'unspecified'
      ? 'no_relationship_context_supplied'
      : 'outside_verifiable_marital_population';
  const sources: readonly T10ContextSourcePopulation[] = [
    {
      name: 'LEE_2016_QUALITATIVE',
      sourceUrl: T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl,
      population: 'married_or_divorced_couples',
      layer: 'public_abstract_only',
      declaredContextOverlapsStudyPopulation: marital,
      relationshipVerdictSupported: false,
    },
    {
      name: 'NAM_KIM_2018_DIVORCED',
      sourceUrl: 'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART002338687',
      population: 'married_or_divorced_couples',
      layer: 'public_abstract_only',
      declaredContextOverlapsStudyPopulation: marital,
      relationshipVerdictSupported: false,
    },
    {
      name: 'KIM_2025_SPOUSE_STUDY',
      sourceUrl: T10_CLASSICAL_CROSS_TEN_GOD_SOURCES.modern.url,
      population: 'married_or_divorced_couples',
      layer: 'author_posted_html',
      declaredContextOverlapsStudyPopulation: marital,
      relationshipVerdictSupported: false,
    },
    {
      name: 'CLASSICAL_MARRIAGE_DISCUSSION',
      sourceUrl: T10_CLASSICAL_CROSS_TEN_GOD_SOURCES.traditional.url,
      population: 'historical_male_female_marital_procedure',
      layer: 'historical_original_public_transcription',
      declaredContextOverlapsStudyPopulation: marital,
      relationshipVerdictSupported: false,
    },
  ];
  const included = draft.sections.filter(section =>
    marital || NON_MARITAL_FACT_SECTIONS.includes(section.id));
  const withheld = draft.sections.filter(section =>
    !marital && !NON_MARITAL_FACT_SECTIONS.includes(section.id));
  if (included.length === 0 ||
      !included.some(section => section.id === 'reading_limits') ||
      quality.traceAudit.sectionIds.length !== draft.sections.length ||
      !draft.sections.every((section, index) =>
        section.id === quality.traceAudit.sectionIds[index]) ||
      (marital && withheld.length > 0)) {
    throw new TypeError('T10 relation scope must preserve the audited source sections.');
  }
  const scopeParagraph = marital
    ? '선택한 관계 유형은 부부입니다. 2016년 부부 질적 사례와 ' +
      '2018년 이별 부부 연구, 전통 혼인 관련 문헌은 대상 범위가 일부 겹칩니다. ' +
      '그러나 이 자료만으로는 두 사람의 궁합, 관계 만족도나 이혼 가능성을 ' +
      '판정할 수 없으며, 용신·배우자성의 강약 및 복수 방법의 종합 기준도 미검증입니다.'
    : relationshipContext === 'unspecified'
      ? '비교할 관계 유형이 정해지지 않았습니다. 부부·혼인 표본에서 작성된 ' +
        '궁합 방법과 역사적 배우자성 문단은 해당 관계에 적용하지 않습니다. ' +
        '계산된 구조 사실만 확인할 수 있고 개인 간 적합성은 판단할 수 없습니다.'
      : '선택한 관계 유형은 부부·혼인 연구의 확인된 대상 범위 밖에 있습니다. ' +
        '혼인 관계의 배우자궁·배우자성·용신 비교 방법을 이 관계의 예측이나 ' +
        '길흉으로 일반화할 수 없습니다. 계산된 두 명식의 구조 사실만 남깁니다.';
  const contextBoundedKoreanDraft = included.map(section =>
    section.title + '\n' +
    section.sentences.map(sentence => sentence.paragraph).join('\n'),
  ).join('\n\n') + '\n\n' + '관계 유형과 출처 적용 범위\n' + scopeParagraph;
  return {
    version: T10_RELATIONSHIP_CONTEXT_BOUNDARY_VERSION,
    lifecycle: 'internal_research_only',
    subject: draft.subject,
    target: draft.target,
    contextDeclaredByResearchCaller: relationshipContext,
    contextVerifiedFromChart: false,
    contextSourceApplicability: overlap,
    sourcePopulations: sources,
    includedSectionIds: included.map(section => section.id),
    withheldMaritalMethodSectionIds: withheld.map(section => section.id),
    scopeParagraph,
    contextBoundedKoreanDraft,
    allowedToGeneralizeMarriageRulesToOtherRelationships: false,
    modernInterpersonalEffectEstablished: false,
    relationshipVerdict: null,
    compatibilityScore: null,
    productInterpretationReady: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
