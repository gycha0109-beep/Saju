import type { CanonicalSajuSnapshot, HeavenlyStem, TenGod } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildGeneralAnnualAtomicSourceAcquisition,
  GENERAL_ANNUAL_SOURCE_CANDIDATES,
} from './general-annual-atomic-semantic-source-acquisition.js';
import {
  auditAnnualPersonalSemanticAdmission,
} from './general-annual-personal-semantic-admission-audit.js';
import {
  buildAnnualSourceBoundEvidenceCasebook,
  matchExactPrimaryAnnualTenGodCase,
} from './general-annual-source-bound-fact-sentences.js';

export const PIAN_GUAN_ANNUAL_CLAUSE_REVIEW_VERSION =
  'sa7d-pian-guan-classical-clause-boundary-v1' as const;

const RULE_KEY = 'ANNUAL_OFFICER_PRESSURE_RESPONSE' as const;
const SOURCE_ID = 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN' as const;
const SOURCE_CLAUSE = '歲君傷日者如庚剋甲日為偏官' as const;
const TRANSCRIPTION_URL =
  'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C' as const;

export const PIAN_GUAN_CLASSICAL_CONTEXT_REVIEW = Object.freeze({
  sourceSection: '三命通會/卷二/論太歲' as const,
  transcriptionUrl: TRANSCRIPTION_URL,
  evidenceClass: 'SECONDARY_DIGITAL_TRANSCRIPTION_NOT_PAGE_VERIFIED_PRIMARY_CONTEXT' as const,
  historicalStatements: Object.freeze([
    Object.freeze({
      fragment: '蓋太歲如君也，大運如臣也',
      interpretiveScope: 'historical_annual_and_dayun_comparison_metaphor' as const,
      directPrimaryPageClauseVerifiedSeparately: false as const,
    }),
    Object.freeze({
      fragment: '雖有災晦，不為大害',
      interpretiveScope: 'historical_qualified_severity_language_in_geng_year_jia_day_example' as const,
      directPrimaryPageClauseVerifiedSeparately: false as const,
    }),
    Object.freeze({
      fragment: '若五行有救，四柱有情',
      interpretiveScope: 'following_rescue_clause_in_jia_day_wu_year_example_not_geng_jia' as const,
      directPrimaryPageClauseVerifiedSeparately: false as const,
    }),
  ]),
  comparedCaseId: 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN' as const,
  rescueClauseForComparisonCase: 'MING_JIA_DAY_WU_YEAR_PIAN_CAI' as const,
  textWitnessIsPredictiveValidation: false as const,
  modernJobPressureMeaningQualified: false as const,
  modernHealthOrAccidentMeaningQualified: false as const,
});

export const PIAN_GUAN_SEMANTIC_MISSING_PREREQUISITES = Object.freeze([
  'PRIMARY_IMAGE_BOUND_FULL_CONTEXT_AND_EDITION_COMPARISON',
  'SELECTED_CLASSICAL_SCHOOL_AND_METHOD_SCOPE',
  'NATAL_DAYUN_ANNUAL_COMPOSITION',
  'EXCEPTION_AND_RESCUE_SCOPE_RECONCILIATION',
  'COEXISTING_RELATIONS_ORDER_AND_CONFLICT_ADJUDICATION',
  'EFFECT_TIMING_AND_PERIOD_VALIDITY',
  'MODERN_CAREER_PRESSURE_OR_EVENT_OUTCOME_DIRECT_SUPPORT',
  'COUNTEREXAMPLE_AND_REAL_WORLD_NON_DETERMINISM_REVIEW',
] as const);

export type PianGuanExactCaseGrade =
  | 'EXACT_MING_PRIMARY_RELATION_IDENTITY_ONLY'
  | 'NOT_THIS_EXACT_CLASSICAL_PAIR';

export function inspectPianGuanExactClassicalCase(
  dayStem: HeavenlyStem,
  annualStem: HeavenlyStem,
  calculatedTenGod: TenGod | null,
) {
  const matched = calculatedTenGod === null ? null : matchExactPrimaryAnnualTenGodCase(
    dayStem,
    annualStem,
    calculatedTenGod,
  );
  const exact = matched?.caseId === PIAN_GUAN_CLASSICAL_CONTEXT_REVIEW.comparedCaseId;
  const result = {
    dayStem,
    annualStem,
    calculatedTenGod,
    exactPrimaryRelationCaseId: exact ? matched?.caseId ?? null : null,
    exactPrimaryCaseMatched: exact,
    evidenceGrade: (exact
      ? 'EXACT_MING_PRIMARY_RELATION_IDENTITY_ONLY'
      : 'NOT_THIS_EXACT_CLASSICAL_PAIR') as PianGuanExactCaseGrade,
    directionalAnnualControlsNatal: exact,
    historicalSeverityPhraseIsPredictiveEvidence: false as const,
    severityRanking: null,
    injuryOrMisfortunePrediction: null,
    careerPressurePrediction: null,
    fortuneSentence: null,
    semanticAdmissionAuthorized: false as const,
  };
  return Object.freeze(result);
}

/**
 * Reuse a primary-verified exact identity and a separately located historical
 * text transcription without silently upgrading the historical comparative
 * narrative to a modern, individual prognosis.
 */
export function buildPianGuanClassicalClauseEvidenceReview() {
  const acquired = buildGeneralAnnualAtomicSourceAcquisition();
  const witness = GENERAL_ANNUAL_SOURCE_CANDIDATES.find(
    (item) => item.candidateId === SOURCE_ID,
  );
  const specific = acquired.currentThemeSemanticAdjudication.decisions.find(
    (item) => item.semanticKey === RULE_KEY,
  );
  const casebook = buildAnnualSourceBoundEvidenceCasebook();
  const matchingRules = casebook.rows.filter((row) => row.semanticKey === RULE_KEY);
  const exact = matchExactPrimaryAnnualTenGodCase('갑', '경', '편관');

  if (
    witness?.candidateId !== SOURCE_ID ||
    !witness.acquisition.relevantPassageVisuallyVerified ||
    !witness.acquisition.exactLunTaisuiPageBound ||
    witness.acquisition.pdfPageOneBased !== 25 ||
    !witness.acquisition.examplesOnLeftLeaf.includes(SOURCE_CLAUSE) ||
    !witness.acquisition.contentHashBound ||
    specific?.tenGod !== '편관' ||
    specific.sourceSupportGrade !== 'INSUFFICIENT' ||
    specific.identitySourceSupportGrade !== 'PRIMARY_SUPPORTED' ||
    specific.sourceQualifiedModernAnnualMeaning ||
    specific.productionAuthorization ||
    matchingRules.length !== 1 ||
    matchingRules[0]?.modernMeaningStatus !== 'RESEARCH_HOLD' ||
    matchingRules[0]?.exactPrimaryExampleIds.length !== 1 ||
    exact === null ||
    matchingRules[0]?.exactPrimaryExampleIds[0] !== exact.caseId ||
    matchingRules[0]?.fortuneSentenceAuthorized ||
    acquired.observations.currentModernThemeSemanticsSourceQualified ||
    acquired.observations.bridgeReentryReady
  ) {
    throw new Error('Pian Guan source boundary changed: renewed evidence review required');
  }

  const material = {
    version: PIAN_GUAN_ANNUAL_CLAUSE_REVIEW_VERSION,
    existingCasebookHash: casebook.casebookHash,
    atomicAcquisitionId: acquired.acquisitionId,
    ruleId: matchingRules[0]!.ruleId,
    semanticKey: RULE_KEY,
    selectedMeaningClaim: specific.currentClaim,
    classicRelationWitness: {
      primarySourceId: SOURCE_ID,
      primaryPdfPageOneBased: witness.acquisition.pdfPageOneBased,
      primaryPdfSha256: witness.acquisition.calculatedSha256,
      exactClause: SOURCE_CLAUSE,
      exactCaseId: exact.caseId,
      directPrimaryEvidenceCeiling: 'exact_annual_ten_god_name_relation_only' as const,
      fullHistoricalSeverityContextIndependentlyPageBound: false as const,
    },
    qualifiedContext: PIAN_GUAN_CLASSICAL_CONTEXT_REVIEW,
    counterexamples: Object.freeze([
      '庚日見甲年不得以甲日見庚年之原文例直接代替',
      '不同日干得偏官名目不等於原文所列甲日庚年這個確切例子',
      '甲日戊年為偏財，救解敘述不可移植到甲日庚年',
      '歲君剋日不能直接預測工作壓力、疾病或事故',
      '年運比較不能跳過原局、大運、例外、作用時期之審定',
    ]),
    unresolved: PIAN_GUAN_SEMANTIC_MISSING_PREREQUISITES,
    admission: {
      classicalIdentitySupported: true as const,
      historicalComparativeTextLocated: true as const,
      historicalSeverityContextPrimaryPageVerified: false as const,
      traditionalAppliedSeverityMeaningApproved: false as const,
      modernPressureResponseThemeApproved: false as const,
      annualInterpretationSentenceAuthorized: false as const,
      concreteEventPredictionAuthorized: false as const,
      consumerDeliveryAuthorized: false as const,
      productionAuthorized: false as const,
    },
  };
  return Object.freeze({
    ...material,
    evidenceReviewHash: deterministicContentHash(material),
  });
}

export type PianGuanPersonalClauseReview =
  | {
      status: 'input_unavailable';
      upstreamReasonCode: string;
      productionAuthorized: false;
    }
  | {
      status: 'research_reviewed_semantic_hold';
      version: typeof PIAN_GUAN_ANNUAL_CLAUSE_REVIEW_VERSION;
      reviewHash: string;
      evidenceReviewHash: string;
      personalSemanticAuditHash: string;
      snapshotId: string;
      requestId: string;
      annualStem: string;
      natalDayStem: string;
      computedRuleMatched: boolean;
      exactPrimaryRelationCaseMatched: boolean;
      grade: PianGuanExactCaseGrade;
      unresolved: typeof PIAN_GUAN_SEMANTIC_MISSING_PREREQUISITES;
      sourceOnlyStatement: string;
      outputFortuneText: null;
      authority: {
        annualInterpretationAuthorized: false;
        modernPressureThemeAuthorized: false;
        modelCallAuthorized: false;
        officialReadingAuthorized: false;
        productionAuthorized: false;
      };
    };

export function reviewPianGuanForAnnualRequest(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
): PianGuanPersonalClauseReview {
  const audit = auditAnnualPersonalSemanticAdmission(snapshot, request);
  if (audit.status === 'unavailable') {
    return {
      status: 'input_unavailable',
      upstreamReasonCode: audit.reasonCode,
      productionAuthorized: false,
    };
  }
  const source = buildPianGuanClassicalClauseEvidenceReview();
  const rule = audit.candidates.find((item) => item.semanticKey === RULE_KEY);
  if (
    rule?.ruleId !== source.ruleId ||
    rule.matchedNatalPillar !== null ||
    rule.matchedTenGod !== '편관' ||
    rule.currentMeaningEvidence !== 'INSUFFICIENT' ||
    rule.sourceBoundMeaningAuthorized ||
    audit.semanticGate.mayGenerateAnnualInterpretation ||
    audit.semanticGate.productionAuthorized
  ) {
    throw new Error('Pian Guan personal candidate no longer matches authority boundary');
  }
  // The actual approved 2026/2027 E1 years have 丙/丁 annual stems. No
  // alternate calendar year is synthesized to manufacture a 庚 match.
  const exact = inspectPianGuanExactClassicalCase(
    audit.natalDayStem as HeavenlyStem,
    audit.annualStem as HeavenlyStem,
    rule.matchedComputedInput ? '편관' : null,
  );
  if (
    (exact.exactPrimaryCaseMatched && (
      !rule.matchedComputedInput ||
      rule.exactVerifiedPrimaryPairId !== exact.exactPrimaryRelationCaseId
    )) ||
    (!exact.exactPrimaryCaseMatched && rule.exactVerifiedPrimaryPairId !== null)
  ) {
    throw new Error('Pian Guan direct-witness pair is inconsistent with governed audit');
  }

  const material = {
    version: PIAN_GUAN_ANNUAL_CLAUSE_REVIEW_VERSION,
    evidenceReviewHash: source.evidenceReviewHash,
    personalSemanticAuditHash: audit.auditHash,
    snapshotId: audit.snapshotId,
    requestId: audit.requestId,
    annualStem: audit.annualStem,
    natalDayStem: audit.natalDayStem,
    computedRuleMatched: rule.matchedComputedInput,
    exactPrimaryRelationCaseMatched: exact.exactPrimaryCaseMatched,
    grade: exact.evidenceGrade,
    unresolved: PIAN_GUAN_SEMANTIC_MISSING_PREREQUISITES,
    sourceOnlyStatement: exact.exactPrimaryCaseMatched
      ? '고전에서 이 갑일간·경년 조합을 편관으로 기록합니다. 이 사실만으로 개인의 길흉이나 특정 사건을 판단하지 않습니다.'
      : '고전의 갑일간·경년 편관 사례는 이 요청의 조합과 다릅니다. 다른 조합으로 확대하여 길흉을 판단하지 않습니다.',
    outputFortuneText: null,
    authority: {
      annualInterpretationAuthorized: false as const,
      modernPressureThemeAuthorized: false as const,
      modelCallAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    },
  };
  return Object.freeze({
    status: 'research_reviewed_semantic_hold',
    ...material,
    reviewHash: deterministicContentHash(material),
  });
}
