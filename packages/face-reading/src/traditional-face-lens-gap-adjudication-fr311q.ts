import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  FACE_CANONICAL_EVIDENCE_FR311P,
  LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P,
  UNMAPPED_TOPIC_KEYS_FR311P,
} from './traditional-face-evidence-integrity-fr311p.js';

export type FaceLensGapTopicFR311Q =
  | 'intelligence'
  | 'ability'
  | 'sexuality'
  | 'longevity_mortality'
  | 'wealth_status';

export type FaceLensGapDispositionFR311Q =
  | 'new_exact_compound_lens_required'
  | 'permanently_unsupported_product_query';

export type FaceLensGapReasonCodeFR311Q =
  | 'preserve_wealth_status_compound_without_split'
  | 'biometric_intelligence_inference_boundary'
  | 'biometric_ability_inference_boundary'
  | 'sexuality_inference_boundary'
  | 'mortality_prediction_boundary';

export interface FaceLensGapAdjudicationFR311Q {
  readonly evidenceId: string;
  readonly owner: 'fr311j';
  readonly evidenceKind: 'named_claim' | 'direct_rule';
  readonly sourceKind: string;
  readonly topicKey: FaceLensGapTopicFR311Q;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly sourceRefs: readonly string[];
  readonly disposition: FaceLensGapDispositionFR311Q;
  readonly reasonCode: FaceLensGapReasonCodeFR311Q;
  readonly targetLensKey: 'wealth_status' | null;
  readonly existingLensMappingApproved: false;
  readonly newLensActivationAuthorized: false;
  readonly productQueryAuthorized: false;
  readonly historicalResearchRetentionAuthorized: true;
  readonly automaticTopicRemappingAuthorized: false;
  readonly wealthStatusSplitAuthorized: false;
  readonly mortalityToLongevityCollapseAuthorized: false;
  readonly intelligenceInferenceAuthorized: false;
  readonly abilityInferenceAuthorized: false;
  readonly sexualityInferenceAuthorized: false;
  readonly mortalityPredictionAuthorized: false;
  readonly modernScientificFactAuthorized: false;
}

function decisionForTopic(topicKey: FaceLensGapTopicFR311Q): Readonly<{
  disposition: FaceLensGapDispositionFR311Q;
  reasonCode: FaceLensGapReasonCodeFR311Q;
  targetLensKey: 'wealth_status' | null;
}> {
  switch (topicKey) {
    case 'wealth_status':
      return Object.freeze({
        disposition: 'new_exact_compound_lens_required' as const,
        reasonCode: 'preserve_wealth_status_compound_without_split' as const,
        targetLensKey: 'wealth_status' as const,
      });
    case 'intelligence':
      return Object.freeze({
        disposition: 'permanently_unsupported_product_query' as const,
        reasonCode: 'biometric_intelligence_inference_boundary' as const,
        targetLensKey: null,
      });
    case 'ability':
      return Object.freeze({
        disposition: 'permanently_unsupported_product_query' as const,
        reasonCode: 'biometric_ability_inference_boundary' as const,
        targetLensKey: null,
      });
    case 'sexuality':
      return Object.freeze({
        disposition: 'permanently_unsupported_product_query' as const,
        reasonCode: 'sexuality_inference_boundary' as const,
        targetLensKey: null,
      });
    case 'longevity_mortality':
      return Object.freeze({
        disposition: 'permanently_unsupported_product_query' as const,
        reasonCode: 'mortality_prediction_boundary' as const,
        targetLensKey: null,
      });
  }
}

function detailForEvidence(evidenceId: string): Readonly<{
  evidenceKind: 'named_claim' | 'direct_rule';
  sourceKind: string;
  topicKeys: readonly string[];
  sourceExpression: string;
  meaningSummary: string;
  sourceRefs: readonly string[];
}> {
  const named = FACE_NAMED_FORM_EVIDENCE_FR311J.find(
    (item) => item.evidenceId === evidenceId,
  );
  if (named !== undefined) {
    return Object.freeze({
      evidenceKind: 'named_claim' as const,
      sourceKind: named.sourceKind,
      topicKeys: Object.freeze([named.topicKey]),
      sourceExpression: named.sourceFragment,
      meaningSummary: named.meaningSummary,
      sourceRefs: Object.freeze([...named.sourceRefs]),
    });
  }

  const direct = FACE_DIRECT_RULE_EVIDENCE_FR311J.find(
    (item) => item.evidenceId === evidenceId,
  );
  if (direct !== undefined) {
    return Object.freeze({
      evidenceKind: 'direct_rule' as const,
      sourceKind: direct.sourceKind,
      topicKeys: Object.freeze([...direct.topicKeys]),
      sourceExpression: direct.sourceExpression,
      meaningSummary: direct.meaningSummary,
      sourceRefs: Object.freeze([...direct.sourceRefs]),
    });
  }

  throw new Error('fr311q_gap_evidence_missing_detail:' + evidenceId);
}

function isAdjudicatedTopic(value: string): value is FaceLensGapTopicFR311Q {
  return value === 'intelligence' ||
    value === 'ability' ||
    value === 'sexuality' ||
    value === 'longevity_mortality' ||
    value === 'wealth_status';
}

export const FACE_LENS_GAP_ADJUDICATIONS_FR311Q:
readonly FaceLensGapAdjudicationFR311Q[] = Object.freeze(
  LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P.map((evidenceId) => {
    const canonical = FACE_CANONICAL_EVIDENCE_FR311P.find(
      (item) => item.canonicalId === evidenceId,
    );
    if (canonical === undefined) {
      throw new Error('fr311q_gap_missing_from_canonical:' + evidenceId);
    }
    if (canonical.owner !== 'fr311j') {
      throw new Error(
        'fr311q_unexpected_gap_owner:' + evidenceId + ':' + canonical.owner,
      );
    }

    const detail = detailForEvidence(evidenceId);
    if (detail.topicKeys.length !== 1) {
      throw new Error(
        'fr311q_gap_requires_single_topic:' +
        evidenceId + ':' + detail.topicKeys.join(','),
      );
    }

    const topicKey = detail.topicKeys[0];
    if (topicKey === undefined || !isAdjudicatedTopic(topicKey)) {
      throw new Error(
        'fr311q_unadjudicated_topic:' + evidenceId + ':' + String(topicKey),
      );
    }

    const decision = decisionForTopic(topicKey);
    return Object.freeze({
      evidenceId,
      owner: 'fr311j' as const,
      evidenceKind: detail.evidenceKind,
      sourceKind: detail.sourceKind,
      topicKey,
      sourceExpression: detail.sourceExpression,
      meaningSummary: detail.meaningSummary,
      sourceRefs: detail.sourceRefs,
      disposition: decision.disposition,
      reasonCode: decision.reasonCode,
      targetLensKey: decision.targetLensKey,
      existingLensMappingApproved: false as const,
      newLensActivationAuthorized: false as const,
      productQueryAuthorized: false as const,
      historicalResearchRetentionAuthorized: true as const,
      automaticTopicRemappingAuthorized: false as const,
      wealthStatusSplitAuthorized: false as const,
      mortalityToLongevityCollapseAuthorized: false as const,
      intelligenceInferenceAuthorized: false as const,
      abilityInferenceAuthorized: false as const,
      sexualityInferenceAuthorized: false as const,
      mortalityPredictionAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
    });
  }),
);

function countTopic(topicKey: FaceLensGapTopicFR311Q): number {
  return FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
    (item) => item.topicKey === topicKey,
  ).length;
}

function countDisposition(disposition: FaceLensGapDispositionFR311Q): number {
  return FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
    (item) => item.disposition === disposition,
  ).length;
}

export const FR311Q_GAP_SUMMARY = Object.freeze({
  totalGapEvidence: FACE_LENS_GAP_ADJUDICATIONS_FR311Q.length,
  namedClaims: FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
    (item) => item.evidenceKind === 'named_claim',
  ).length,
  directRules: FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
    (item) => item.evidenceKind === 'direct_rule',
  ).length,
  intelligence: countTopic('intelligence'),
  ability: countTopic('ability'),
  sexuality: countTopic('sexuality'),
  longevityMortality: countTopic('longevity_mortality'),
  wealthStatus: countTopic('wealth_status'),
  existingLensMappings: 0,
  newExactCompoundLensRequired: countDisposition('new_exact_compound_lens_required'),
  permanentlyUnsupportedProductQuery: countDisposition(
    'permanently_unsupported_product_query',
  ),
  familyIsUnmappedToken: UNMAPPED_TOPIC_KEYS_FR311P.includes('family'),
  familyGapEvidence: FACE_LENS_GAP_ADJUDICATIONS_FR311Q.filter(
    (item) => (item.topicKey as string) === 'family',
  ).length,
});

export const FR311Q_AUTHORITY_BOUNDARY = Object.freeze({
  existingLensAutoMappingAuthorized: false as const,
  newLensActivationAuthorized: false as const,
  automaticTopicRemappingAuthorized: false as const,
  wealthStatusSplitAuthorized: false as const,
  mortalityToLongevityCollapseAuthorized: false as const,
  intelligenceInferenceAuthorized: false as const,
  abilityInferenceAuthorized: false as const,
  sexualityInferenceAuthorized: false as const,
  mortalityPredictionAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  modernPsychologyFactAuthorized: false as const,
  productQueryExpansionAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  geometryBindingAuthorized: false as const,
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error('fr311q_duplicate:' + path);
  }
}

export function assertFaceLensGapAdjudicationFR311Q(): void {
  if (FR311Q_GAP_SUMMARY.totalGapEvidence !== 28) {
    throw new Error(
      'fr311q_gap_count_drift:' + FR311Q_GAP_SUMMARY.totalGapEvidence,
    );
  }
  if (FR311Q_GAP_SUMMARY.namedClaims !== 25 ||
      FR311Q_GAP_SUMMARY.directRules !== 3) {
    throw new Error('fr311q_gap_kind_count_drift');
  }
  if (
    FR311Q_GAP_SUMMARY.intelligence !== 8 ||
    FR311Q_GAP_SUMMARY.ability !== 1 ||
    FR311Q_GAP_SUMMARY.sexuality !== 4 ||
    FR311Q_GAP_SUMMARY.longevityMortality !== 5 ||
    FR311Q_GAP_SUMMARY.wealthStatus !== 10
  ) {
    throw new Error('fr311q_gap_topic_count_drift');
  }
  if (
    FR311Q_GAP_SUMMARY.existingLensMappings !== 0 ||
    FR311Q_GAP_SUMMARY.newExactCompoundLensRequired !== 10 ||
    FR311Q_GAP_SUMMARY.permanentlyUnsupportedProductQuery !== 18
  ) {
    throw new Error('fr311q_gap_disposition_count_drift');
  }
  if (
    FR311Q_GAP_SUMMARY.familyIsUnmappedToken !== true ||
    FR311Q_GAP_SUMMARY.familyGapEvidence !== 0
  ) {
    throw new Error('fr311q_family_gap_classification_drift');
  }

  assertUnique(
    FACE_LENS_GAP_ADJUDICATIONS_FR311Q.map((item) => item.evidenceId),
    'gap_evidence',
  );

  const expectedIds = [...LENS_UNMAPPED_CANONICAL_EVIDENCE_IDS_FR311P].sort();
  const adjudicatedIds = FACE_LENS_GAP_ADJUDICATIONS_FR311Q
    .map((item) => item.evidenceId)
    .sort();
  if (JSON.stringify(expectedIds) !== JSON.stringify(adjudicatedIds)) {
    throw new Error('fr311q_gap_coverage_mismatch');
  }

  for (const item of FACE_LENS_GAP_ADJUDICATIONS_FR311Q) {
    if (item.sourceRefs.length === 0) {
      throw new Error('fr311q_gap_missing_source:' + item.evidenceId);
    }
    if (
      item.existingLensMappingApproved !== false ||
      item.newLensActivationAuthorized !== false ||
      item.productQueryAuthorized !== false ||
      item.historicalResearchRetentionAuthorized !== true ||
      item.automaticTopicRemappingAuthorized !== false ||
      item.wealthStatusSplitAuthorized !== false ||
      item.mortalityToLongevityCollapseAuthorized !== false ||
      item.intelligenceInferenceAuthorized !== false ||
      item.abilityInferenceAuthorized !== false ||
      item.sexualityInferenceAuthorized !== false ||
      item.mortalityPredictionAuthorized !== false ||
      item.modernScientificFactAuthorized !== false
    ) {
      throw new Error('fr311q_gap_authority_widening:' + item.evidenceId);
    }

    if (item.topicKey === 'wealth_status') {
      if (
        item.disposition !== 'new_exact_compound_lens_required' ||
        item.targetLensKey !== 'wealth_status' ||
        item.reasonCode !== 'preserve_wealth_status_compound_without_split'
      ) {
        throw new Error('fr311q_wealth_status_adjudication_drift:' + item.evidenceId);
      }
    } else if (
      item.disposition !== 'permanently_unsupported_product_query' ||
      item.targetLensKey !== null
    ) {
      throw new Error('fr311q_sensitive_gap_adjudication_drift:' + item.evidenceId);
    }
  }

  for (const [key, flag] of Object.entries(FR311Q_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311q_authority_widening:' + key);
    }
  }
}
