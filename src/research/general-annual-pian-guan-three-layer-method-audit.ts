import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildGeneralAnnualThreeLayerFactCorpus,
} from './general-annual-three-layer-fact-corpus.js';
import {
  buildPianGuanConditionalHistoricalScopeReview,
  reviewPianGuanConditionalScopeForAnnualRequest,
} from './general-annual-pian-guan-conditional-scope-review.js';

/**
 * A source-location-to-observation audit, never a new traditional resolver.
 * An observed relation or a source quotation is not a permission to predict.
 */
export const PIAN_GUAN_THREE_LAYER_METHOD_AUDIT_VERSION =
  'sa7d-pian-guan-three-layer-method-evidence-gate-v1' as const;

const TRANSCRIPTION = 'https://zh.wikisource.org/zh-hant/三命通會/卷二' as const;

/**
 * These are considerations described by the text, not a ready-to-run
 * decision algorithm. Different sections cannot be collapsed into
 * the PG-02 comparative example without a reviewed methodology.
 */
export const PIAN_GUAN_THREE_LAYER_TEXT_CONSIDERATIONS = Object.freeze([
  Object.freeze({
    key: 'NATAL_ROOT_AND_FOUR_PILLARS',
    section: '論大運' as const,
    excerpt: '更看四柱強弱何如，原有原無，原輕原重',
    appliesAs: 'broader_natal_context_required_for_method_review' as const,
    appliesToExactPianGuanAsExecutableRule: false as const,
    source: TRANSCRIPTION,
    witnessLevel: 'digital_transcription_only' as const,
  }),
  Object.freeze({
    key: 'ANNUAL_DAYUN_COMPARISON',
    section: '論太歲' as const,
    excerpt: '蓋太歲如君也，大運如臣也',
    appliesAs: 'annual_dayun_comparison_metaphor' as const,
    appliesToExactPianGuanAsExecutableRule: false as const,
    source: TRANSCRIPTION,
    witnessLevel: 'digital_transcription_only' as const,
  }),
  Object.freeze({
    key: 'ANNUAL_DAYUN_MUTUAL_CONTEXT',
    section: '總論歲運' as const,
    excerpt: '運與流年二者相為表裡',
    appliesAs: 'joint_temporal_consideration' as const,
    appliesToExactPianGuanAsExecutableRule: false as const,
    source: TRANSCRIPTION,
    witnessLevel: 'digital_transcription_only' as const,
  }),
  Object.freeze({
    key: 'PERSONAL_OUTCOME_METHOD_NOT_PROVIDED',
    section: '總論歲運' as const,
    excerpt: '凡歲運吉凶，當生天元',
    appliesAs: 'further_methodology_needed_before_personal_application' as const,
    appliesToExactPianGuanAsExecutableRule: false as const,
    source: TRANSCRIPTION,
    witnessLevel: 'digital_transcription_only' as const,
  }),
]);

export const PIAN_GUAN_THREE_LAYER_UNRESOLVED = Object.freeze([
  'ORIGINAL_FULL_TEXT_COLUMN_AND_LINE_VERIFICATION',
  'SOURCE_LINEAGE_AND_VARIANT_COLLATION',
  'EXACT_PIAN_GUAN_TRADITIONAL_SYNTHESIS_METHOD',
  'NATAL_STRENGTH_AND_CONTEXT_METHOD_NOT_ADMITTED',
  'DAYUN_ANNUAL_PRIORITY_NOT_ADMITTED',
  'MULTIPLE_RELATIONS_ESTABLISHMENT_AND_CONFLICT_NOT_ADMITTED',
  'TIMING_AND_INDIVIDUAL_SEVERITY_NOT_ADMITTED',
  'MODERN_EVENT_OUTCOME_NOT_ADMITTED',
] as const);

export function buildPianGuanThreeLayerTextMethodAudit() {
  const upstream = buildPianGuanConditionalHistoricalScopeReview();
  if (
    upstream.literaryProposition.id !== 'PG-HIST-01' ||
    upstream.literaryProposition.meaningFromPrintedFullParagraphIndependentlyVerified ||
    upstream.authority.individualSeverityAdmitted ||
    upstream.authority.productionAuthorized ||
    upstream.separatedOtherCase !== 'MING_JIA_DAY_WU_YEAR_PIAN_CAI'
  ) throw new Error('Historical scope authority changed: three-layer research requires re-review');

  const material = {
    version: PIAN_GUAN_THREE_LAYER_METHOD_AUDIT_VERSION,
    upstreamHistoricalScopeHash: upstream.evidenceHash,
    sourceWitnessLevel: 'digital_transcription_compared_to_previous_print_relation_identity' as const,
    sourceConsiderations: PIAN_GUAN_THREE_LAYER_TEXT_CONSIDERATIONS,
    methodBoundary: Object.freeze({
      textMentionsNatalDayunAndAnnual: true as const,
      textSuppliesACompleteComputableCompositionAlgorithmForThisPianGuanExample: false as const,
      traditionalPrecedenceRuleAuthorized: false as const,
      automaticPositiveOrNegativeJudgmentAuthorized: false as const,
      pianCaiRescueReusableForPianGuan: false as const,
      modernEventOutcomeAuthorized: false as const,
    }),
    unresolved: PIAN_GUAN_THREE_LAYER_UNRESOLVED,
  };
  return Object.freeze({ ...material, auditHash: deterministicContentHash(material) });
}

export function auditPianGuanThreeLayerMethodForAnnualRequest(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  // Reuse existing personal admission and its exact E1/LiChun/missing input gates.
  const personal = reviewPianGuanConditionalScopeForAnnualRequest(snapshot, request);
  if (personal.status === 'input_unavailable') {
    return Object.freeze({
      status: 'input_unavailable' as const,
      reasonCode: personal.reasonCode,
      productionAuthorized: false as const,
    });
  }

  const corpus = buildGeneralAnnualThreeLayerFactCorpus(snapshot, request);
  if (
    corpus.state !== 'research_three_layer_facts_only' ||
    corpus.pairChecks.length !== 9 ||
    corpus.natal.length !== 4 ||
    corpus.limits.mayGenerateAnnualInterpretation ||
    corpus.limits.precedenceOrStrengthRankingAuthorized ||
    corpus.limits.productionAuthorized
  ) throw new Error('Three-layer input fact authority changed; review required');

  const witness = buildPianGuanThreeLayerTextMethodAudit();
  const grouped = corpus.pairChecks.map((check) => {
    const matches = corpus.pairMatches.filter((x) => x.pairKey === check.pairKey);
    if (
      matches.length !== check.observedKinds.length ||
      matches.some((item, index) =>
        item.kind !== check.observedKinds[index] ||
        !item.structuralMatchOnly ||
        item.strengthOrOutcomeDetermined ||
        item.transformationEstablished
      )
    ) throw new Error('Pair facts and structural candidates disagree');

    return Object.freeze({
      pairKey: check.pairKey,
      relationKinds: Object.freeze(matches.map((x) => x.kind)),
      observedCount: matches.length,
      // Nine comparisons express structure, never an effect magnitude or priority.
      adjudicatedWinner: null,
      severity: null,
    });
  });

  if (new Set(grouped.map((item) => item.pairKey)).size !== 9) {
    throw new Error('Duplicated pair observation, cannot establish method scope');
  }

  const material = {
    status: 'research_three_layer_method_hold' as const,
    version: PIAN_GUAN_THREE_LAYER_METHOD_AUDIT_VERSION,
    inputResearchReviewHash: personal.reviewHash,
    sourceMethodAuditHash: witness.auditHash,
    threeLayerFactCorpusHash: corpus.corpusHash,
    annualPillar: Object.freeze({ ...corpus.annualPillar }),
    dayunPillar: Object.freeze({
      stem: corpus.dayun.stem,
      branch: corpus.dayun.branch,
      segmentIndex: corpus.dayun.segmentIndex,
    }),
    natalPillars: Object.freeze(corpus.natal.map((x) => ({ ...x }))),
    computedAnnualTenGod: corpus.computedTenGodRelations.annualStemToNatalDayMaster,
    exactHistoricalGengJiaExample: personal.exactSourceCaseMatched,
    pairObservations: Object.freeze(grouped),
    observedRelationTotal: corpus.pairMatches.length,
    unresolvedCoexistence: corpus.pairMatches.length > 1 ||
      grouped.some((x) => x.observedCount > 1),
    evidenceOnly: Object.freeze({
      hasNineStructuralComparisons: true as const,
      hasTraditionalMethodAdjudication: false as const,
      mayInferMissingRelationIsAbsent: false as const,
      mayRankAnnualOverDayun: false as const,
      mayRankDayunOverAnnual: false as const,
      mayComputeIndividualSeverity: false as const,
      mayBorrowPianCaiRescue: false as const,
      mayRenderConsumerText: false as const,
      mayGenerateInterpretationClaim: false as const,
      productionAuthorized: false as const,
    }),
    unresolved: PIAN_GUAN_THREE_LAYER_UNRESOLVED,
    appliedHistoricalSeverity: null,
    careerOrHealthOutcome: null,
    interpretationClaim: null,
  };
  return Object.freeze({
    ...material,
    reviewHash: deterministicContentHash(material),
  });
}
