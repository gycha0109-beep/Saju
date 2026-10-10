import type { CanonicalSajuSnapshot, HeavenlyStem, TenGod } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildPianGuanClassicalClauseEvidenceReview,
  inspectPianGuanExactClassicalCase,
  reviewPianGuanForAnnualRequest,
} from './general-annual-pian-guan-classical-clause-review.js';

/**
 * Documentary study of the conditional language, NOT an interpretation rule.
 * This module is research-only: no Claim, product response or consumer prose.
 */
export const PIAN_GUAN_CONDITIONAL_SCOPE_VERSION =
  'sa7d-pian-guan-conditional-historical-scope-v1' as const;

export const PIAN_GUAN_CONDITIONAL_WITNESSES = Object.freeze([
  Object.freeze({
    witnessId: 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN',
    witnessKind: 'ming_print_primary_relation_only' as const,
    location: '第4冊·卷二下·論太歲·PDF 25쪽(1-based)',
    independentlyVerifiedForFullConditionalParagraph: false as const,
    exactRelationPreviouslyPageVerified: true as const,
  }),
  Object.freeze({
    witnessId: 'WIKISOURCE_SANMING_TONGHUI_VOLUME2_LUN_TAISUI',
    witnessKind: 'digital_transcription' as const,
    location: '三命通會/卷二 §論太歲, first paragraph',
    url: 'https://zh.wikisource.org/zh-hant/三命通會/卷二',
    independentlyVerifiedForFullConditionalParagraph: false as const,
    exactRelationPreviouslyPageVerified: false as const,
  }),
  Object.freeze({
    witnessId: 'GUJIN_TUSHU_JICHENG_ARTS_598_LUN_TAISUI',
    witnessKind: 'later_historical_transmission_transcription' as const,
    location: '欽定古今圖書集成·藝術典·第598卷 §論太歲',
    url: 'https://zh.wikisource.org/zh-hant/欽定古今圖書集成/博物彙編/藝術典/第598卷',
    independentlyVerifiedForFullConditionalParagraph: false as const,
    exactRelationPreviouslyPageVerified: false as const,
  }),
]);

export const PIAN_GUAN_CONDITIONAL_CLAUSE_SCOPES = Object.freeze([
  Object.freeze({
    clauseId: 'PG-01-ANNUAL_CONTROLS_DAY',
    transcriptionExcerpt: '歲君傷日者，如庚年克甲日為偏官',
    exactCase: 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
    historicalFunction: 'directional_ten_god_identity' as const,
    historicallyDiscussedCase: 'jia_day_geng_year' as const,
    primaryFullSentenceRecheckedNow: false as const,
    applicableModernOutcome: false as const,
  }),
  Object.freeze({
    clauseId: 'PG-02-HISTORICAL_RELATIVE_SEVERITY',
    transcriptionExcerpt: '譬君治臣，父治子，雖有災晦，不為大害',
    exactCase: 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
    historicalFunction: 'historical_comparative_severity_metaphor' as const,
    historicallyDiscussedCase: 'jia_day_geng_year' as const,
    primaryFullSentenceRecheckedNow: false as const,
    applicableModernOutcome: false as const,
  }),
  Object.freeze({
    clauseId: 'PC-01-RESCUE_AND_AFFECTION',
    transcriptionExcerpt: '若五行有救，四柱有情，如甲日克戊年',
    exactCase: 'MING_JIA_DAY_WU_YEAR_PIAN_CAI',
    historicalFunction: 'rescue_affection_examples_following_other_case' as const,
    historicallyDiscussedCase: 'jia_day_wu_year' as const,
    primaryFullSentenceRecheckedNow: false as const,
    applicableModernOutcome: false as const,
  }),
]);

export const PIAN_GUAN_CONDITIONAL_UNRESOLVED = Object.freeze([
  'PRIMARY_PRINT_PAGE_AND_COLUMN_BOUND_FOR_EACH_FULL_SENTENCE',
  'WITNESS_VARIANTS_AND_OMISSIONS_COLLATION',
  'SELECTED_TRADITIONAL_APPLICABILITY_METHODOLOGY',
  'NATAL_DAYUN_ANNUAL_JOINT_PREREQUISITES',
  'COEXISTING_RELATIONS_AND_EXCEPTIONS',
  'SEVERITY_COMPARISON_BASELINE_AND_TIMING',
  'MODERN_OUTCOME_VALIDATION_AND_PRODUCT_ADMISSION',
] as const);

export function buildPianGuanConditionalHistoricalScopeReview() {
  const upstream = buildPianGuanClassicalClauseEvidenceReview();
  if (
    upstream.classicRelationWitness.exactCaseId !== 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN' ||
    upstream.classicRelationWitness.fullHistoricalSeverityContextIndependentlyPageBound ||
    upstream.admission.traditionalAppliedSeverityMeaningApproved ||
    upstream.admission.productionAuthorized ||
    upstream.qualifiedContext.rescueClauseForComparisonCase !==
      'MING_JIA_DAY_WU_YEAR_PIAN_CAI'
  ) throw new Error('Upstream Pian Guan witness or authority changed; review required');

  const material = {
    version: PIAN_GUAN_CONDITIONAL_SCOPE_VERSION,
    upstreamEvidenceReviewHash: upstream.evidenceReviewHash,
    verifiedPrintedRelationPage: 25 as const,
    printedWitnessSha256: upstream.classicRelationWitness.primaryPdfSha256,
    witnessSet: PIAN_GUAN_CONDITIONAL_WITNESSES,
    clauseScopes: PIAN_GUAN_CONDITIONAL_CLAUSE_SCOPES,
    literaryProposition: Object.freeze({
      id: 'PG-HIST-01',
      textCategory: 'historical_comparative_statement_not_personal_forecast' as const,
      antecedent: Object.freeze({
        natalDayStem: '갑' as const,
        annualStem: '경' as const,
        relation: '편관' as const,
        direction: 'annual_stem_controls_day_stem' as const,
      }),
      reportedHistoricClaim: 'The classical passage compares this case with a ruler governing a subject and uses relatively mild adversity language.',
      exactHistoricalApplicationToIndividualApproved: false as const,
      meaningFromPrintedFullParagraphIndependentlyVerified: false as const,
      claimTypeAuthorized: false as const,
      consumerNarrativeAuthorized: false as const,
    }),
    separatedOtherCase: 'MING_JIA_DAY_WU_YEAR_PIAN_CAI' as const,
    variantPolicy: 'Later compilation and digital transcription are not independent validation of prediction and are not silently merged with the Ming print.' as const,
    unresolved: PIAN_GUAN_CONDITIONAL_UNRESOLVED,
    authority: Object.freeze({
      descriptiveHistoryOnly: true as const,
      individualSeverityAdmitted: false as const,
      modernCareerPredictionAdmitted: false as const,
      otherCaseRescueInherited: false as const,
      annualInterpretationAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({
    ...material,
    evidenceHash: deterministicContentHash(material),
  });
}

export function inspectPianGuanConditionalHistoricalScope(
  dayStem: HeavenlyStem,
  annualStem: HeavenlyStem,
  calculatedTenGod: TenGod | null,
) {
  const identity = inspectPianGuanExactClassicalCase(dayStem, annualStem, calculatedTenGod);
  const exact = identity.exactPrimaryCaseMatched;
  return Object.freeze({
    exactSourceCaseMatched: exact,
    historicalClauseId: exact ? 'PG-02-HISTORICAL_RELATIVE_SEVERITY' as const : null,
    mayReportWhatTheSourceHistoricallySays: exact,
    conditionalPersonalInterpretationAuthorized: false as const,
    individualSeverity: null,
    inheritedPianCaiRescue: null,
    modernLifeEvent: null,
    consumerFortuneText: null,
    productionAuthorized: false as const,
  });
}

/** Keep all E1/LiChun, unknown-hour, Dayun and monthly gates upstream. */
export function reviewPianGuanConditionalScopeForAnnualRequest(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const upstream = reviewPianGuanForAnnualRequest(snapshot, request);
  if (upstream.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: upstream.upstreamReasonCode,
    productionAuthorized: false as const,
  });

  const witness = buildPianGuanConditionalHistoricalScopeReview();
  const exact = inspectPianGuanConditionalHistoricalScope(
    upstream.natalDayStem as HeavenlyStem,
    upstream.annualStem as HeavenlyStem,
    upstream.computedRuleMatched ? '편관' : null,
  );
  if (exact.exactSourceCaseMatched !== upstream.exactPrimaryRelationCaseMatched) {
    throw new Error('Historical clause and source-bound personal audit disagree');
  }
  const material = {
    status: 'research_historical_context_only_hold' as const,
    version: PIAN_GUAN_CONDITIONAL_SCOPE_VERSION,
    personalReviewHash: upstream.reviewHash,
    documentaryEvidenceHash: witness.evidenceHash,
    exactSourceCaseMatched: exact.exactSourceCaseMatched,
    sourceClauseId: exact.historicalClauseId,
    unresolved: PIAN_GUAN_CONDITIONAL_UNRESOLVED,
    personalAppliedHistoricalSeverity: null,
    consumerFortuneText: null,
    authority: Object.freeze({
      mayGenerateClaim: false as const,
      mayApplyHistoricalSeverity: false as const,
      mayInheritPianCaiRescue: false as const,
      mayGenerateConsumerFortune: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({ ...material, reviewHash: deterministicContentHash(material) });
}
