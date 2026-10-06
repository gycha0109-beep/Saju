import {
  EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M,
} from './traditional-ear-cross-region-evidence-fr311m.js';
import {
  buildTraditionalFaceReadingOutputFR311J,
  type FaceReadingEvidenceItemFR311J,
  type FaceReadingOutputStatusFR311J,
  type TraditionalFaceReadingOutputFR311J,
} from './traditional-face-reading-output-fr311j.js';
import {
  queryFaceEvidenceFR311N,
  type FaceEvidenceQueryFR311N,
  type FaceEvidenceQueryStatusFR311N,
} from './traditional-face-evidence-query-fr311n.js';

export type FaceReadingEvidenceItemFR311N = FaceReadingEvidenceItemFR311J;
export type FaceReadingOutputStatusFR311N = FaceReadingOutputStatusFR311J;

export type TraditionalFaceReadingOutputFR311N =
  Omit<
    TraditionalFaceReadingOutputFR311J,
    | 'contractVersion'
    | 'outputStatus'
    | 'headline'
    | 'evidenceSections'
    | 'combinationAssessment'
    | 'sourceRefs'
    | 'limitations'
  > &
  Readonly<{
    contractVersion: 'fr311n-v1';
    outputStatus: FaceReadingOutputStatusFR311N;
    headline: string;
    evidenceSections: TraditionalFaceReadingOutputFR311J['evidenceSections'];
    combinationAssessment: Readonly<{
      sourceStatus:
        | 'direct_source_combination'
        | 'direct_source_relation'
        | 'named_form_context'
        | 'parallel_evidence_only'
        | 'unsupported';
      directCombinationRuleIds: readonly string[];
      directCrossRegionEvidenceIds: readonly string[];
      earDirectCrossRegionEvidenceIds: readonly string[];
      contextIds: readonly string[];
      relationKeys: readonly string[];
      combinationKeys: readonly string[];
      reinforcementAuthorized: false;
      cancellationAuthorized: false;
      relationInferenceAuthorized: false;
      combinationInferenceAuthorized: false;
      contextSemanticPromotionAuthorized: false;
    }>;
    sourceRefs: readonly string[];
    limitations: readonly string[];
  }>;

const LENS_LABELS = Object.freeze({
  temperament: '성정',
  inbok: '인복·관계',
  interpersonal_relations: '대인관계',
  wealth: '재물',
  spouse: '부부·배우자',
  siblings: '형제',
  patron: '귀인·지원',
  career: '관직·출세',
  children: '자녀·후손',
  longevity: '수명 관련 전통 해석',
  traditional_health: '건강 관련 전통 해석',
  legal_penalty: '관재·형벌 관련 전통 해석',
  household: '가세·집안',
  inheritance: '상속·유산',
  livelihood: '생계·생활 기반',
  integrity_conduct: '신의·행실',
  learning_talent: '학습·재능',
  speech_conduct: '언행',
  parents: '부모',
  life_course: '생애 흐름',
  traditional_auspice: '전통 길흉',
} as const);

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function mapStatus(status: FaceEvidenceQueryStatusFR311N): FaceReadingOutputStatusFR311N {
  switch (status) {
    case 'source_conflict':
      return 'conflict';
    case 'direct_source_combination':
      return 'direct_combination';
    case 'direct_source_relation':
      return 'direct_relation';
    case 'named_form_context':
      return 'named_form_context';
    case 'parallel_evidence_only':
      return 'parallel_evidence';
    case 'evidence_only':
      return 'evidence';
    case 'unsupported':
    case 'no_evidence':
      return 'no_direct_evidence';
  }
}

function combinationStatus(
  status: FaceEvidenceQueryStatusFR311N,
): TraditionalFaceReadingOutputFR311N['combinationAssessment']['sourceStatus'] {
  switch (status) {
    case 'direct_source_combination':
      return 'direct_source_combination';
    case 'direct_source_relation':
      return 'direct_source_relation';
    case 'named_form_context':
      return 'named_form_context';
    case 'parallel_evidence_only':
      return 'parallel_evidence_only';
    default:
      return 'unsupported';
  }
}

function earCrossRegionItem(evidenceId: string): FaceReadingEvidenceItemFR311N {
  const item = EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.find(
    (candidate) =>
      candidate.evidenceId === evidenceId &&
      candidate.evidenceOwner === 'fr311m',
  );
  if (item === undefined) {
    throw new Error('fr311n_missing_ear_cross_region_evidence:' + evidenceId);
  }

  return Object.freeze({
    evidenceId: item.evidenceId,
    kind: 'cross_region_direct' as const,
    region: 'cross_region' as const,
    label: item.relationKey ?? item.combinationKey ?? item.candidateId,
    sourceExpression: item.sourceExpression,
    meaningSummary: item.meaningSummary,
    topicKey: item.topicKeys.length === 1 ? item.topicKeys[0] ?? null : null,
    relationTarget: item.relationTarget,
    lifeStage: item.lifeStage,
    polarity: item.polarity,
    certainty: 'direct_clear' as const,
    sourceRefs: Object.freeze([...item.sourceRefs]),
    historicalTraditionalDoctrineOnly: true as const,
    modernScientificFactAuthorized: false as const,
    healthDiagnosisAuthorized: false as const,
    lifespanPredictionAuthorized: false as const,
    fertilityPredictionAuthorized: false as const,
    childSexPredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    criminalityInferenceAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

function headline(
  status: FaceReadingOutputStatusFR311N,
  lensKey: FaceEvidenceQueryFR311N['lensKey'],
): string {
  const label = LENS_LABELS[lensKey];
  switch (status) {
    case 'conflict':
      return label + ': 서로 반대 방향의 직접 전통 근거가 함께 존재합니다.';
    case 'direct_combination':
      return label + ': 원문에 직접 조합 근거가 있습니다.';
    case 'direct_relation':
      return label + ': 원문에 직접 관계 근거가 있습니다.';
    case 'named_form_context':
      return label + ': 직접 의미 근거와 명명형 내부 문맥을 함께 확인했습니다.';
    case 'parallel_evidence':
      return label + ': 병렬 직접 근거가 있으나 하나의 조합 공식으로 합치지 않습니다.';
    case 'evidence':
      return label + ': 확인된 직접 전통 근거가 있습니다.';
    case 'no_direct_evidence':
      return label + ': 현재 입력에서 직접 전통 근거를 확인하지 못했습니다.';
  }
}

export function buildTraditionalFaceReadingOutputFR311N(
  query: FaceEvidenceQueryFR311N,
): TraditionalFaceReadingOutputFR311N {
  const base = buildTraditionalFaceReadingOutputFR311J(query);
  const result = queryFaceEvidenceFR311N(query);
  const earItems = result.earCrossRegionEvidenceIds.map(earCrossRegionItem);
  const uncertainSet = new Set(result.uncertainEvidenceIds);

  const favorableEar = earItems.filter(
    (item) =>
      result.favorableEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const challengingEar = earItems.filter(
    (item) =>
      result.challengingEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const mixedEar = earItems.filter(
    (item) =>
      result.mixedOrConditionalEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const uncertainEar = earItems.filter((item) => uncertainSet.has(item.evidenceId));

  const sourceRefs = unique([
    ...base.sourceRefs,
    ...earItems.flatMap((item) => item.sourceRefs),
  ]);

  const outputStatus = mapStatus(result.status);
  const limitations = unique([
    ...base.limitations,
    '귀 교차부위 근거는 FR311M에서 직접 관계·직접 조합으로 승인된 exact key만 사용하며 FR311K 소유 근거는 기존 얼굴 전체 경로에서 한 번만 재사용한다.',
    '귀의 명명형 내부 문맥·동반 묘사·문장 경계 불확실 후보를 독립적인 일반 관계나 조합 의미로 승격하지 않는다.',
  ]);

  return Object.freeze({
    ...base,
    contractVersion: 'fr311n-v1' as const,
    outputStatus,
    headline: headline(outputStatus, query.lensKey),
    evidenceSections: Object.freeze({
      favorable: Object.freeze([
        ...base.evidenceSections.favorable,
        ...favorableEar,
      ]),
      challenging: Object.freeze([
        ...base.evidenceSections.challenging,
        ...challengingEar,
      ]),
      mixedOrConditional: Object.freeze([
        ...base.evidenceSections.mixedOrConditional,
        ...mixedEar,
      ]),
      uncertain: Object.freeze([
        ...base.evidenceSections.uncertain,
        ...uncertainEar,
      ]),
      nonDirectionalDirectRules: Object.freeze([
        ...base.evidenceSections.nonDirectionalDirectRules,
      ]),
      contextOnly: Object.freeze([
        ...base.evidenceSections.contextOnly,
      ]),
    }),
    combinationAssessment: Object.freeze({
      sourceStatus: combinationStatus(result.status),
      directCombinationRuleIds: Object.freeze([...result.combinationRuleIds]),
      directCrossRegionEvidenceIds: Object.freeze([...result.crossRegionEvidenceIds]),
      earDirectCrossRegionEvidenceIds: Object.freeze([...result.earCrossRegionEvidenceIds]),
      contextIds: Object.freeze([...result.namedFormContextIds]),
      relationKeys: Object.freeze([...result.relationKeys]),
      combinationKeys: Object.freeze([...result.combinationKeys]),
      reinforcementAuthorized: false as const,
      cancellationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      combinationInferenceAuthorized: false as const,
      contextSemanticPromotionAuthorized: false as const,
    }),
    sourceRefs: Object.freeze(sourceRefs),
    limitations: Object.freeze(limitations),
    scoreAuthorized: false as const,
    aggregateGoodBadJudgementAuthorized: false as const,
    unsupportedSynthesisAuthorized: false as const,
    sourcePriorityInferenceAuthorized: false as const,
    traditionalRuleInferenceAuthorized: false as const,
    topicRemappingInferenceAuthorized: false as const,
    relationInferenceAuthorized: false as const,
    combinationInferenceAuthorized: false as const,
    healthDiagnosisAuthorized: false as const,
    lifespanPredictionAuthorized: false as const,
    fertilityPredictionAuthorized: false as const,
    childSexPredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    criminalityInferenceAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

export const FR311N_OUTPUT_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  sourceCountWeightingAuthorized: false as const,
  reinforcementAuthorized: false as const,
  cancellationAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  topicRemappingInferenceAuthorized: false as const,
  relationInferenceAuthorized: false as const,
  combinationInferenceAuthorized: false as const,
  contextSemanticPromotionAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  traditionalRegionToNeutralGeometryBindingAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  productPredictionAuthorized: false as const,
});

export function assertTraditionalFaceReadingOutputFR311N(): void {
  const ownerEvidence = EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter(
    (item) => item.evidenceOwner === 'fr311m',
  );
  if (ownerEvidence.some((item) => item.polarity === null)) {
    throw new Error('fr311n_unclassified_ear_cross_region_polarity');
  }

  for (const [key, flag] of Object.entries(FR311N_OUTPUT_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311n_output_authority_widening:' + key);
    }
  }
}
