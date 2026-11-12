import { T10_DIRECT_DAY_COMPARISON_SOURCE } from
  './compatibility-t10-direct-day-comparison.js';
import type {
  T10PairDraftSection,
  T10PairDraftSentence,
  T10PairReadingBoundaryDraftV1,
} from './compatibility-t10-pair-reading-boundary-draft.js';
import { buildT10PairReadingBoundaryDraftV1 } from
  './compatibility-t10-pair-reading-boundary-draft.js';
import type { T10SourceBoundObservationReadingV1 } from
  './compatibility-t10-source-bound-observation-reading.js';
import type { T10HistoricalDayYearObservation } from
  './compatibility-t10-historical-day-year-observation.js';
import type { T10CrossMethodContrastResearchV1 } from
  './compatibility-t10-cross-method-contrast.js';
import type { T10ThreeMethodApplicabilityReadingV1 } from
  './compatibility-t10-three-method-applicability-reading.js';

export const T10_PRODUCT_READING_QUALITY_REVIEW_VERSION =
  'saju-t10-product-reading-quality-review-v1' as const;

type ProductKind = 'first_comparison' | 'repeat_comparison' |
  'natal_and_first_comparison';

export interface T10ProductReadingEligibilityReview {
  readonly product: ProductKind;
  readonly pairIdentity:
    'two_distinct_person_references_with_independent_snapshot_provenance';
  readonly t10ReadingCompleteness: 'factual_observations_only';
  readonly t10IndependentInterpretationReady: false;
  readonly t8StandaloneEligibility: 'not_evaluated_here' | 'not_included';
  readonly missingInterpretationPrerequisites: readonly string[];
  readonly eligibleToHandoffForSalesOrIssuance: false;
}

export interface T10ProductReadingQualityReviewV1 {
  readonly version: typeof T10_PRODUCT_READING_QUALITY_REVIEW_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly subject: T10PairReadingBoundaryDraftV1['subject'];
  readonly target: T10PairReadingBoundaryDraftV1['target'];
  readonly readingMode: 'research_fact_draft_not_relational_interpretation';
  readonly traceAudit: {
    readonly allSentencesHaveRequiredProvenance: true;
    readonly sectionToTextRoundTrip: true;
    readonly exactSourceDerivedDraft: true;
    readonly distinctPersonsKept: true;
    readonly unknownTimeUnresolved: true;
    readonly noMethodCandidatePromotedToFact: true;
    readonly validatedSentenceCount: number;
    readonly verifiedStructuralFactSentenceCount: number;
    readonly traditionalFactorScopeSentenceCount: number;
    readonly unverifiedPrerequisitePaths: readonly string[];
    readonly sectionIds: readonly T10PairDraftSection['id'][];
  };
  /** Specific content is checked without fabricating a relationship verdict. */
  readonly caseDistinction:
    'day_six_combination_and_other_clash' |
    'day_clash_and_other_six_combination' |
    'no_verified_mixed_day_structure';
  readonly researchReadingQuality: 'traceable_factual_draft_only';
  readonly actualCompatibilityReadingReady: false;
  readonly productEligibility: readonly [
    T10ProductReadingEligibilityReview,
    T10ProductReadingEligibilityReview,
    T10ProductReadingEligibilityReview,
  ];
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly mayPersist: false;
  readonly maySell: false;
}

function unique(items: readonly string[]): string[] {
  return [...new Set(items)];
}
const requiredMethodSections = [
  'palace_method', 'six_spirits_method', 'useful_god_method',
] as const;

function validateSentence(sentence: T10PairDraftSentence): void {
  if (!sentence.paragraph.trim() ||
      sentence.individualRelationshipOutcomeAuthorized !== false ||
      (sentence.evidenceLayer !== 'missing_input' &&
        sentence.sourceUrls.length === 0) ||
      [...sentence.observedFactPaths, ...sentence.consideredButUnverifiedFactPaths]
        .some(path => !/^(subject|target)\.(pillars|derivedFacts)\./u.test(path))) {
    throw new TypeError('T10 quality audit requires complete per-sentence original evidence.');
  }
  if ((sentence.evidenceLayer === 'calculated_structure' ||
       sentence.evidenceLayer === 'traditional_reference') &&
      (sentence.observedFactPaths.length < 2 || sentence.sourceIds.length === 0)) {
    throw new TypeError('T10 quality audit cannot treat missing structural facts as evidence.');
  }
  if (sentence.evidenceLayer === 'traditional_reference' &&
      (sentence.definitionContentHashes.length === 0 ||
       !sentence.missingPrerequisites.includes(
         'BAEK_1983_P189_PRIMARY_TEXT_NOT_VERIFIED'))) {
    throw new TypeError('T10 quality audit requires historical source limits.');
  }
  if (sentence.evidenceLayer === 'traditional_factor_scope' &&
      (sentence.observedFactPaths.length < 4 ||
       sentence.sourceIds.length === 0 ||
       !sentence.sourceUrls.includes(T10_DIRECT_DAY_COMPARISON_SOURCE.sourceUrl) ||
       !sentence.missingPrerequisites.includes(
         'FULL_2016_CASE_METHOD_AND_EXCEPTIONS_NOT_VERIFIED') ||
       !sentence.missingPrerequisites.includes(
         '2016_MARITAL_FACTOR_TO_INDIVIDUAL_OUTCOME_NOT_VALIDATED'))) {
    throw new TypeError('T10 traditional factor scope requires original paths and source limits.');
  }
  if (sentence.evidenceLayer === 'method_applicability' &&
      sentence.observedFactPaths.length !== 0) {
    throw new TypeError('T10 quality audit cannot promote unverified methods to observations.');
  }
  if (sentence.evidenceLayer === 'missing_input' &&
      (sentence.observedFactPaths.length !== 0 ||
       sentence.consideredButUnverifiedFactPaths.length === 0 ||
       !sentence.missingPrerequisites.includes(
         'UNKNOWN_BIRTH_HOUR_CANNOT_BE_INFERRED'))) {
    throw new TypeError('T10 quality audit cannot fill an unknown birth hour.');
  }
}

/** Evidence and independence review for three configured buying compositions;
 * this does not exercise, enable, or adjudicate a commerce entitlement. */
export function auditT10ProductReadingQualityV1(
  draft: T10PairReadingBoundaryDraftV1,
  factual: T10SourceBoundObservationReadingV1,
  historical: T10HistoricalDayYearObservation,
  contrast: T10CrossMethodContrastResearchV1,
  methods: T10ThreeMethodApplicabilityReadingV1,
): T10ProductReadingQualityReviewV1 {
  if (draft.lifecycle !== 'internal_research_only' ||
      draft.mode !== 'source_bounded_factual_research_not_compatibility' ||
      draft.permissionToChooseBestEvidence !== false ||
      draft.mayInterpretOverallCompatibility !== false ||
      draft.relationshipOutcome !== null ||
      draft.compatibilityScore !== null ||
      draft.mayPublish !== false || draft.maySell !== false ||
      draft.mayPersist !== false ||
      draft.eligibleForFirstComparison !== false ||
      draft.eligibleForRepeatComparison !== false ||
      draft.eligibleForNatalAndFirstBundle !== false ||
      !draft.subject.personRef || !draft.target.personRef ||
      draft.subject.personRef === draft.target.personRef ||
      !draft.subject.calculationHash || !draft.target.calculationHash ||
      !draft.subject.snapshotId || !draft.target.snapshotId ||
      draft.sections.length === 0 ||
      !draft.sections.some(section => section.id === 'direct_day_facts') ||
      !draft.sections.some(section => section.id === 'reading_limits') ||
      !requiredMethodSections.every(id =>
        draft.sections.filter(section => section.id === id).length === 1) ||
      unique(draft.sections.map(section => section.id)).length !== draft.sections.length ||
      draft.sections.some(section => !section.title.trim() ||
        section.sentences.length === 0)) {
    throw new TypeError('T10 quality review must receive a protected full research draft.');
  }

  const expectedText = draft.sections.map(section => section.title + '\n' +
    section.sentences.map(sentence => sentence.paragraph).join('\n')).join('\n\n');
  if (draft.koreanReadingDraft !== expectedText) {
    throw new TypeError('T10 quality review rejects altered or missing reading paragraphs.');
  }
  const all = draft.sections.flatMap(section => [...section.sentences]);
  all.forEach(validateSentence);

  // A plausible URL, hash or person-prefixed path is not sufficient provenance.
  // Rebuild from the independent, guarded research source results and require
  // every paragraph, original fact path, source and limitation to match.
  const fromSources = buildT10PairReadingBoundaryDraftV1(
    factual, historical, contrast, methods,
  );
  if (JSON.stringify(draft) !== JSON.stringify(fromSources)) {
    throw new TypeError(
      'T10 quality review rejects evidence not reproduced from original source-bound charts.',
    );
  }

  const mixed = draft.sections.find(section => section.id === 'mixed_positions');
  const expectedDirection = draft.structuralSituation;
  if ((expectedDirection === 'no_source_qualified_mixed_day_structure') !==
      (mixed === undefined) ||
      (mixed && (mixed.sentences.length !== 1 ||
        mixed.sentences[0]?.evidenceLayer !== 'unresolved_synthesis' ||
        !mixed.sentences[0]?.missingPrerequisites.includes(
          'EXACT_TWO_PERSON_PRIORITIZATION_RULE') ||
        mixed.sentences[0].observedFactPaths.length < 4)) ||
      (mixed && expectedDirection === 'day_six_combination_with_other_clash' &&
        !mixed.sentences[0]?.paragraph.includes('일지 사이에는 육합이 있고 다른 위치에는 충')) ||
      (mixed && expectedDirection === 'day_clash_with_other_six_combination' &&
        !mixed.sentences[0]?.paragraph.includes('일지 사이에는 충이 있고 다른 위치에는 육합'))) {
    throw new TypeError('T10 quality review requires the actual structural case distinction.');
  }

  const sourceLimits = draft.sections.find(section => section.id === 'reading_limits');
  if (!sourceLimits?.sentences.some(sentence =>
      sentence.missingPrerequisites.includes(
        'SOURCE_VALIDATED_RELATIONSHIP_OUTCOME_METHOD'))) {
    throw new TypeError('T10 quality review must retain the global outcome-method limitation.');
  }

  const unknownHourPaths = unique([
    ...(!draft.subject.birthTimeKnown ? ['subject.pillars.hour'] : []),
    ...(!draft.target.birthTimeKnown ? ['target.pillars.hour'] : []),
  ]);
  const actualHourPaths = unique(all.filter(sentence =>
    sentence.evidenceLayer === 'missing_input').flatMap(sentence =>
    [...sentence.consideredButUnverifiedFactPaths]));
  if (unknownHourPaths.length !== actualHourPaths.length ||
      !unknownHourPaths.every(path => actualHourPaths.includes(path))) {
    throw new TypeError('T10 quality review requires exact unresolved birth-time provenance.');
  }

  const sourceQualifiedUnavailable = [
    'SOURCE_VALIDATED_TWO_CHART_RELATIONSHIP_SYNTHESIS_MISSING',
    'INDEPENDENT_RELATIONSHIP_OUTCOME_VALIDATION_MISSING',
  ];
  const product = (
    kind: ProductKind,
  ): T10ProductReadingEligibilityReview => ({
    product: kind,
    pairIdentity: 'two_distinct_person_references_with_independent_snapshot_provenance',
    t10ReadingCompleteness: 'factual_observations_only',
    t10IndependentInterpretationReady: false,
    t8StandaloneEligibility: kind === 'natal_and_first_comparison'
      ? 'not_evaluated_here' : 'not_included',
    missingInterpretationPrerequisites: kind === 'repeat_comparison'
      ? [...sourceQualifiedUnavailable,
        'EACH_NEW_COUNTERPART_REQUIRES_ITS_OWN_INDEPENDENT_T10_INTERPRETATION']
      : kind === 'natal_and_first_comparison'
        ? [...sourceQualifiedUnavailable,
          'T8_ONLY_PERSONAL_READING_CANNOT_SUBSTITUTE_MISSING_T10']
        : sourceQualifiedUnavailable,
    eligibleToHandoffForSalesOrIssuance: false,
  });
  return {
    version: T10_PRODUCT_READING_QUALITY_REVIEW_VERSION,
    lifecycle: 'internal_research_only',
    subject: draft.subject,
    target: draft.target,
    readingMode: 'research_fact_draft_not_relational_interpretation',
    traceAudit: {
      allSentencesHaveRequiredProvenance: true,
      sectionToTextRoundTrip: true,
      exactSourceDerivedDraft: true,
      distinctPersonsKept: true,
      unknownTimeUnresolved: true,
      noMethodCandidatePromotedToFact: true,
      validatedSentenceCount: all.length,
      verifiedStructuralFactSentenceCount: all.filter(sentence =>
        sentence.evidenceLayer === 'calculated_structure').length,
      traditionalFactorScopeSentenceCount: all.filter(sentence =>
        sentence.evidenceLayer === 'traditional_factor_scope').length,
      unverifiedPrerequisitePaths: unique(all.flatMap(sentence =>
        [...sentence.consideredButUnverifiedFactPaths])),
      sectionIds: draft.sections.map(section => section.id),
    },
    caseDistinction: expectedDirection === 'day_six_combination_with_other_clash'
      ? 'day_six_combination_and_other_clash'
      : expectedDirection === 'day_clash_with_other_six_combination'
        ? 'day_clash_and_other_six_combination'
        : 'no_verified_mixed_day_structure',
    researchReadingQuality: 'traceable_factual_draft_only',
    actualCompatibilityReadingReady: false,
    productEligibility: [
      product('first_comparison'),
      product('repeat_comparison'),
      product('natal_and_first_comparison'),
    ],
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
