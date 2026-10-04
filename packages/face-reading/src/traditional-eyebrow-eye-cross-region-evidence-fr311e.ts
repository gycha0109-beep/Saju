export type CrossRegionParticipantKindFR311E =
  | 'morphology'
  | 'named_form'
  | 'cross_region_relation';

export interface CrossRegionParticipantFR311E {
  readonly kind: CrossRegionParticipantKindFR311E;
  readonly key: string;
}

export type DirectCrossRegionEvidenceTypeFR311E =
  | 'direct_morphology_combination'
  | 'direct_named_form_combination'
  | 'direct_cross_region_relation';

export type DirectCrossRegionVerificationFR311E =
  | 'existing_scan_checked_repository_lineage'
  | 'gujin633_transcription_reviewed';

export interface DirectCrossRegionEvidenceFR311E {
  readonly ruleId: string;
  readonly evidenceType: DirectCrossRegionEvidenceTypeFR311E;
  readonly participants: readonly CrossRegionParticipantFR311E[];
  readonly sourceExpression: string;
  readonly traditionalMeaningSummary: string;
  readonly topicKeys: readonly string[];
  readonly sourceRefs: readonly string[];
  readonly verificationState: DirectCrossRegionVerificationFR311E;
  readonly nlc1925DirectScanAdjudicated: boolean;
  readonly automaticParticipantInferenceAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface CrossRegionRelationDefinitionFR311E {
  readonly relationKey: string;
  readonly traditionalExpressions: readonly string[];
  readonly neutralGloss: string;
  readonly independentMorphologyInferenceAuthorized: false;
  readonly metricThresholdAuthorized: false;
}

export interface TranscriptionCandidateFR311E {
  readonly candidateId: string;
  readonly sourceExpression: string;
  readonly reason: string;
  readonly promotionAuthorized: false;
  readonly requiresDirectScanAdjudication: true;
}

const GUJIN_633 = 'witness.gujin473.art633.wikisource';
const NLC_1925 = 'witness.shenxiang_quanbian.nlc_1925';
const ISSUE_FR182 = 'github:issue/625';

function participant(
  kind: CrossRegionParticipantKindFR311E,
  key: string,
): CrossRegionParticipantFR311E {
  return Object.freeze({ kind, key });
}

function evidence(
  ruleId: string,
  evidenceType: DirectCrossRegionEvidenceTypeFR311E,
  participants: readonly CrossRegionParticipantFR311E[],
  sourceExpression: string,
  traditionalMeaningSummary: string,
  topicKeys: readonly string[],
  sourceRefs: readonly string[],
  verificationState: DirectCrossRegionVerificationFR311E,
  nlc1925DirectScanAdjudicated: boolean,
): DirectCrossRegionEvidenceFR311E {
  return Object.freeze({
    ruleId,
    evidenceType,
    participants: Object.freeze([...participants]),
    sourceExpression,
    traditionalMeaningSummary,
    topicKeys: Object.freeze([...topicKeys]),
    sourceRefs: Object.freeze([...sourceRefs]),
    verificationState,
    nlc1925DirectScanAdjudicated,
    automaticParticipantInferenceAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const CROSS_REGION_RELATIONS_FR311E: readonly CrossRegionRelationDefinitionFR311E[] =
  Object.freeze([
    Object.freeze({
      relationKey: 'brow_eye.brow_extends_beyond_eye',
      traditionalExpressions: Object.freeze(['眉過眼', '眉長過目', '過目']),
      neutralGloss: '눈썹의 가로 범위가 눈의 가로 범위를 넘어간다고 직접 기술된 상대 관계',
      independentMorphologyInferenceAuthorized: false as const,
      metricThresholdAuthorized: false as const,
    }),
    Object.freeze({
      relationKey: 'brow_eye.brow_shorter_than_eye',
      traditionalExpressions: Object.freeze(['眉短於目']),
      neutralGloss: '눈썹이 눈보다 짧다고 직접 기술된 상대 관계',
      independentMorphologyInferenceAuthorized: false as const,
      metricThresholdAuthorized: false as const,
    }),
    Object.freeze({
      relationKey: 'brow_eye.brow_does_not_cover_eye',
      traditionalExpressions: Object.freeze(['短不覆眼', '不覆目']),
      neutralGloss: '눈썹이 눈을 덮지 못한다고 직접 기술된 상대 관계',
      independentMorphologyInferenceAuthorized: false as const,
      metricThresholdAuthorized: false as const,
    }),
    Object.freeze({
      relationKey: 'brow_eye.brow_presses_eye',
      traditionalExpressions: Object.freeze(['壓眼']),
      neutralGloss: '눈썹이 눈을 누르듯 낮게 위치한다고 직접 기술된 상대 관계',
      independentMorphologyInferenceAuthorized: false as const,
      metricThresholdAuthorized: false as const,
    }),
    Object.freeze({
      relationKey: 'brow_eye.brow_tail_drops_to_eye',
      traditionalExpressions: Object.freeze(['尾垂眼']),
      neutralGloss: '눈썹 꼬리가 눈 쪽으로 내려온다고 직접 기술된 상대 관계',
      independentMorphologyInferenceAuthorized: false as const,
      metricThresholdAuthorized: false as const,
    }),
  ]);

export const DIRECT_CROSS_REGION_EVIDENCE_FR311E: readonly DirectCrossRegionEvidenceFR311E[] =
  Object.freeze([
    evidence(
      'fr311.combo.eye_short_brow_long',
      'direct_morphology_combination',
      [
        participant('morphology', 'eye.short'),
        participant('morphology', 'brow.long'),
      ],
      '目短眉長，愈益田莊',
      '원문은 눈이 짧고 눈썹이 긴 조합을 전답·재산 증가와 직접 연결한다.',
      ['wealth'],
      [NLC_1925, ISSUE_FR182, GUJIN_633],
      'existing_scan_checked_repository_lineage',
      true,
    ),
    evidence(
      'fr311e.combo.dragon_brow_phoenix_eye',
      'direct_named_form_combination',
      [
        participant('named_form', 'eyebrow.named.dragon'),
        participant('named_form', 'eye.named.phoenix'),
      ],
      '龍眉鳳眼人中貴',
      '원문은 용미와 봉안을 함께 갖춘 조합을 사람 가운데 귀한 상으로 직접 풀이한다.',
      ['status'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_extends_beyond_eye.wealth_status',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_extends_beyond_eye')],
      '眉過眼者富貴',
      '원문은 눈썹이 눈을 지나 길게 이어지는 상대 관계를 부귀와 연결한다.',
      ['wealth', 'status'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_extends_beyond_eye.integrity_status',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_extends_beyond_eye')],
      '眉長過目，忠直有祿',
      '원문은 눈썹이 눈보다 길게 넘어가는 상대 관계를 충직함과 녹과 연결한다.',
      ['integrity_trust', 'status'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_extends_beyond_eye.wealth',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_extends_beyond_eye')],
      '過目豐富',
      '원문은 눈썹이 눈을 넘어가는 상대 관계를 풍부함과 연결한다.',
      ['wealth'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_shorter_than_eye.temperament',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_shorter_than_eye')],
      '眉短於目，心性孤獨',
      '원문은 눈썹이 눈보다 짧은 상대 관계를 고독한 성정과 연결한다.',
      ['temperament'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_does_not_cover_eye.wealth',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_does_not_cover_eye')],
      '短不覆眼者乏財',
      '원문은 눈썹이 눈을 덮지 못하는 상대 관계를 재물 부족과 연결한다.',
      ['wealth'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_does_not_cover_eye.poverty',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_does_not_cover_eye')],
      '不覆目者孤貧',
      '원문은 눈썹이 눈을 덮지 못하는 상대 관계를 고빈한 상태와 연결한다.',
      ['wealth'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_presses_eye.wealth_status',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_presses_eye')],
      '壓眼者窮逼',
      '원문은 눈썹이 눈을 누르듯 낮은 상대 관계를 곤궁한 상태와 연결한다.',
      ['wealth', 'status'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
    evidence(
      'fr311e.relation.brow_tail_drops_to_eye.temperament',
      'direct_cross_region_relation',
      [participant('cross_region_relation', 'brow_eye.brow_tail_drops_to_eye')],
      '尾垂眼者性懦',
      '원문은 눈썹 꼬리가 눈 쪽으로 내려오는 상대 관계를 유약한 성정과 연결한다.',
      ['temperament'],
      [GUJIN_633],
      'gujin633_transcription_reviewed',
      false,
    ),
  ]);

export const TRANSCRIPTION_CANDIDATES_FR311E: readonly TranscriptionCandidateFR311E[] =
  Object.freeze([
    Object.freeze({
      candidateId: 'fr311e.candidate.brow_long_over_eye_sibling_count',
      sourceExpression: '眉長過眼目弟兄須五六',
      reason: '相眉 전자본문의 문장 경계가 불안정해 眉長過眼과 형제 수 판단의 결합 범위를 직접 스캔으로 재확인해야 한다.',
      promotionAuthorized: false as const,
      requiresDirectScanAdjudication: true as const,
    }),
    Object.freeze({
      candidateId: 'fr311e.candidate.brow_short_no_siblings',
      sourceExpression: '眉短家無兄弟真',
      reason: '앞뒤 구두점과 조건 범위를 직접 스캔에서 확정하기 전 독립 규칙으로 승격하지 않는다.',
      promotionAuthorized: false as const,
      requiresDirectScanAdjudication: true as const,
    }),
    Object.freeze({
      candidateId: 'fr311e.candidate.dense_long_over_eye_sibling_count',
      sourceExpression: '濃長過目四三人',
      reason: '눈썹 농도·길이·상대 위치와 형제 수의 조건 결합 범위가 전사만으로 불명확하다.',
      promotionAuthorized: false as const,
      requiresDirectScanAdjudication: true as const,
    }),
    Object.freeze({
      candidateId: 'fr311e.candidate.not_over_both_eyes_sibling_count',
      sourceExpression: '不過兩目只言二',
      reason: '원문 분절이 불안정하므로 직접 스캔 대조 전 강한 규칙으로 해석하지 않는다.',
      promotionAuthorized: false as const,
      requiresDirectScanAdjudication: true as const,
    }),
  ]);

export const FR311E_AUTHORITY_BOUNDARY = Object.freeze({
  independentMorphologyToRelationInferenceAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  candidatePromotionWithoutScanAuthorized: false as const,
  unsupportedCombinationSynthesisAuthorized: false as const,
  reinforcementInferenceAuthorized: false as const,
  cancellationInferenceAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function participantSignature(participantValue: CrossRegionParticipantFR311E): string {
  return `${participantValue.kind}:${participantValue.key}`;
}

export function participantSetSignatureFR311E(
  participants: readonly CrossRegionParticipantFR311E[],
): string {
  return [...participants].map(participantSignature).sort().join('|');
}

export function assertDirectCrossRegionEvidenceFR311E(): void {
  const relationKeys = new Set(CROSS_REGION_RELATIONS_FR311E.map((item) => item.relationKey));
  if (relationKeys.size !== CROSS_REGION_RELATIONS_FR311E.length) {
    throw new Error('fr311e_duplicate_relation_key');
  }

  const ruleIds = DIRECT_CROSS_REGION_EVIDENCE_FR311E.map((item) => item.ruleId);
  if (new Set(ruleIds).size !== ruleIds.length) {
    throw new Error('fr311e_duplicate_rule_id');
  }

  for (const relation of CROSS_REGION_RELATIONS_FR311E) {
    if (relation.independentMorphologyInferenceAuthorized !== false) {
      throw new Error(`fr311e_relation_inference_widening:${relation.relationKey}`);
    }
    if (relation.metricThresholdAuthorized !== false) {
      throw new Error(`fr311e_metric_threshold_widening:${relation.relationKey}`);
    }
  }

  for (const item of DIRECT_CROSS_REGION_EVIDENCE_FR311E) {
    if (item.participants.length === 0) {
      throw new Error(`fr311e_empty_participants:${item.ruleId}`);
    }
    for (const p of item.participants) {
      if (p.kind === 'cross_region_relation' && !relationKeys.has(p.key)) {
        throw new Error(`fr311e_unknown_relation:${item.ruleId}:${p.key}`);
      }
    }
    if (item.automaticParticipantInferenceAuthorized !== false) {
      throw new Error(`fr311e_participant_inference_widening:${item.ruleId}`);
    }
    if (item.modernScientificFactAuthorized !== false) {
      throw new Error(`fr311e_modern_fact_widening:${item.ruleId}`);
    }
    if (item.productInterpretationAuthorized !== false) {
      throw new Error(`fr311e_product_authority_widening:${item.ruleId}`);
    }
  }

  for (const candidate of TRANSCRIPTION_CANDIDATES_FR311E) {
    if (candidate.promotionAuthorized !== false || candidate.requiresDirectScanAdjudication !== true) {
      throw new Error(`fr311e_candidate_boundary_drift:${candidate.candidateId}`);
    }
  }

  for (const [key, flag] of Object.entries(FR311E_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311e_authority_boundary_widening:${key}`);
  }
}
