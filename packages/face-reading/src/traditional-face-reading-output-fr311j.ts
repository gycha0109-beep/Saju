import {
  buildTraditionalFaceReadingOutputFR311G,
  type TraditionalFaceReadingOutputFR311G,
} from './traditional-face-reading-output-fr311g.js';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
  MOUTH_NAMED_FORM_CONTEXTS_FR311J,
  type FaceEvidencePolarityFR311J,
  type FaceEvidenceRegionFR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K,
} from './traditional-mouth-philtrum-cross-region-evidence-fr311k.js';
import {
  isLegacyLensFR311J,
  queryFaceEvidenceFR311J,
  type FaceEvidenceLensKeyFR311J,
  type FaceEvidenceQueryFR311J,
  type FaceEvidenceQueryStatusFR311J,
} from './traditional-face-evidence-query-fr311j.js';

export type FaceReadingOutputStatusFR311J =
  | 'conflict'
  | 'direct_combination'
  | 'direct_relation'
  | 'named_form_context'
  | 'parallel_evidence'
  | 'evidence'
  | 'no_direct_evidence';

export type FaceReadingEvidenceKindFR311J =
  | 'named_form_claim'
  | 'direct_rule'
  | 'cross_region_direct'
  | 'named_form_context';

export interface FaceReadingEvidenceItemFR311J {
  readonly evidenceId: string;
  readonly kind: FaceReadingEvidenceKindFR311J;
  readonly region: FaceEvidenceRegionFR311J | 'cross_region';
  readonly label: string;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKey: string | null;
  readonly relationTarget: string | null;
  readonly lifeStage: string | null;
  readonly polarity: FaceEvidencePolarityFR311J | null;
  readonly certainty: 'direct_clear' | 'phrase_uncertain' | 'context_only';
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productPredictionAuthorized: false;
}

export interface FaceReadingEvidenceSectionsFR311J {
  readonly favorable: readonly FaceReadingEvidenceItemFR311J[];
  readonly challenging: readonly FaceReadingEvidenceItemFR311J[];
  readonly mixedOrConditional: readonly FaceReadingEvidenceItemFR311J[];
  readonly uncertain: readonly FaceReadingEvidenceItemFR311J[];
  readonly nonDirectionalDirectRules: readonly FaceReadingEvidenceItemFR311J[];
  readonly contextOnly: readonly FaceReadingEvidenceItemFR311J[];
}

export interface TraditionalFaceReadingOutputFR311J {
  readonly contractVersion: 'fr311j-v1';
  readonly lensKey: FaceEvidenceLensKeyFR311J;
  readonly outputStatus: FaceReadingOutputStatusFR311J;
  readonly headline: string;
  readonly evidenceSections: FaceReadingEvidenceSectionsFR311J;
  readonly combinationAssessment: Readonly<{
    sourceStatus:
      | 'direct_source_combination'
      | 'direct_source_relation'
      | 'named_form_context'
      | 'parallel_evidence_only'
      | 'unsupported';
    directCombinationRuleIds: readonly string[];
    directCrossRegionEvidenceIds: readonly string[];
    contextIds: readonly string[];
    relationKeys: readonly string[];
    combinationKeys: readonly string[];
    reinforcementAuthorized: false;
    cancellationAuthorized: false;
    relationInferenceAuthorized: false;
    combinationInferenceAuthorized: false;
    contextSemanticPromotionAuthorized: false;
  }>;
  readonly sourceRefs: readonly string[];
  readonly limitations: readonly string[];
  readonly doctrineNotice: '전통 관상 문헌의 역사적 해석을 정리한 것이며 현대 과학·심리·의학적 사실, 건강 진단, 수명·생식·자녀 성별 또는 실제 미래 예측을 뜻하지 않는다.';
  readonly scoreAuthorized: false;
  readonly aggregateGoodBadJudgementAuthorized: false;
  readonly unsupportedSynthesisAuthorized: false;
  readonly sourcePriorityInferenceAuthorized: false;
  readonly traditionalRuleInferenceAuthorized: false;
  readonly topicRemappingInferenceAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly combinationInferenceAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productPredictionAuthorized: false;
}

const LENS_LABELS: Readonly<Record<FaceEvidenceLensKeyFR311J, string>> = Object.freeze({
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
});

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function mapStatus(status: FaceEvidenceQueryStatusFR311J): FaceReadingOutputStatusFR311J {
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
  status: FaceEvidenceQueryStatusFR311J,
): TraditionalFaceReadingOutputFR311J['combinationAssessment']['sourceStatus'] {
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

function namedItem(evidenceId: string): FaceReadingEvidenceItemFR311J {
  const item = FACE_NAMED_FORM_EVIDENCE_FR311J.find(
    (candidate) => candidate.evidenceId === evidenceId,
  );
  if (item === undefined) {
    throw new Error('fr311j_missing_named_evidence:' + evidenceId);
  }

  return Object.freeze({
    evidenceId: item.evidenceId,
    kind: 'named_form_claim' as const,
    region: item.region,
    label: item.traditionalLabel,
    sourceExpression: item.sourceFragment,
    meaningSummary: item.meaningSummary,
    topicKey: item.topicKey,
    relationTarget: item.relationTarget,
    lifeStage: item.lifeStage,
    polarity: item.polarity,
    certainty: item.certainty,
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

function directItem(ruleId: string): FaceReadingEvidenceItemFR311J {
  const item = FACE_DIRECT_RULE_EVIDENCE_FR311J.find(
    (candidate) => candidate.ruleId === ruleId,
  );
  if (item === undefined) {
    throw new Error('fr311j_missing_direct_rule:' + ruleId);
  }

  return Object.freeze({
    evidenceId: item.evidenceId,
    kind: 'direct_rule' as const,
    region: item.regionScope,
    label: item.ruleId,
    sourceExpression: item.sourceExpression,
    meaningSummary: item.meaningSummary,
    topicKey: item.topicKeys.length === 1 ? item.topicKeys[0] ?? null : null,
    relationTarget: item.relationTarget,
    lifeStage: item.lifeStage,
    polarity: item.polarity,
    certainty: item.certainty,
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

function crossRegionItem(evidenceId: string): FaceReadingEvidenceItemFR311J {
  const item = MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.find(
    (candidate) => candidate.evidenceId === evidenceId,
  );
  if (item === undefined) {
    throw new Error('fr311k_missing_cross_region_evidence:' + evidenceId);
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

function legacyContextItems(
  query: FaceEvidenceQueryFR311J,
): readonly FaceReadingEvidenceItemFR311J[] {
  if (!isLegacyLensFR311J(query.lensKey)) {
    return Object.freeze([]);
  }

  const legacy: TraditionalFaceReadingOutputFR311G = buildTraditionalFaceReadingOutputFR311G({
    lensKey: query.lensKey,
    ...(query.formKeys === undefined ? {} : { formKeys: query.formKeys }),
    ...(query.morphologyTermKeys === undefined ? {} : { morphologyTermKeys: query.morphologyTermKeys }),
    ...(query.relationKeys === undefined ? {} : { relationKeys: query.relationKeys }),
    ...(query.crossRegionFeatureKeys === undefined
      ? {}
      : { crossRegionFeatureKeys: query.crossRegionFeatureKeys }),
    ...(query.traditionalRuleIds === undefined
      ? {}
      : { traditionalRuleIds: query.traditionalRuleIds }),
  });

  return Object.freeze(
    legacy.evidenceSections.contextOnly.map((item) => Object.freeze({
      evidenceId: item.evidenceId,
      kind: 'named_form_context' as const,
      region: 'context' as const,
      label: item.label,
      sourceExpression: item.sourceExpression,
      meaningSummary: item.meaningSummary,
      topicKey: null,
      relationTarget: null,
      lifeStage: null,
      polarity: null,
      certainty: 'context_only' as const,
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
    })),
  );
}

function mouthContextItems(
  contextIds: readonly string[],
): readonly FaceReadingEvidenceItemFR311J[] {
  return Object.freeze(
    contextIds.flatMap((contextId) => {
      const context = MOUTH_NAMED_FORM_CONTEXTS_FR311J.find(
        (candidate) => candidate.contextId === contextId,
      );
      if (context === undefined) {
        return [];
      }
      return [Object.freeze({
        evidenceId: context.contextId,
        kind: 'named_form_context' as const,
        region: 'context' as const,
        label: context.traditionalLabel,
        sourceExpression: context.sourceExpression,
        meaningSummary: context.meaningSummary,
        topicKey: null,
        relationTarget: null,
        lifeStage: null,
        polarity: null,
        certainty: 'context_only' as const,
        sourceRefs: Object.freeze([...context.sourceRefs]),
        historicalTraditionalDoctrineOnly: true as const,
        modernScientificFactAuthorized: false as const,
        healthDiagnosisAuthorized: false as const,
        lifespanPredictionAuthorized: false as const,
        fertilityPredictionAuthorized: false as const,
        childSexPredictionAuthorized: false as const,
        personalityFactAuthorized: false as const,
        criminalityInferenceAuthorized: false as const,
        productPredictionAuthorized: false as const,
      })];
    }),
  );
}

function headline(
  status: FaceReadingOutputStatusFR311J,
  lensKey: FaceEvidenceLensKeyFR311J,
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

export function buildTraditionalFaceReadingOutputFR311J(
  query: FaceEvidenceQueryFR311J,
): TraditionalFaceReadingOutputFR311J {
  const result = queryFaceEvidenceFR311J(query);
  const named = result.namedEvidenceIds.map(namedItem);
  const directIds = unique([...result.directRuleIds, ...result.combinationRuleIds]);
  const direct = directIds.map(directItem);
  const crossRegion = result.crossRegionEvidenceIds.map(crossRegionItem);
  const allEvidence = [...named, ...direct, ...crossRegion];
  const uncertainSet = new Set(result.uncertainEvidenceIds);

  const favorable = allEvidence.filter(
    (item) =>
      result.favorableEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const challenging = allEvidence.filter(
    (item) =>
      result.challengingEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const mixedOrConditional = allEvidence.filter(
    (item) =>
      result.mixedOrConditionalEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const uncertain = allEvidence.filter((item) => uncertainSet.has(item.evidenceId));
  const nonDirectionalDirectRules = direct.filter(
    (item) => item.polarity === null && !uncertainSet.has(item.evidenceId),
  );

  const legacyContexts = legacyContextItems(query);
  const mouthContexts = mouthContextItems(result.namedFormContextIds);
  const contextMap = new Map<string, FaceReadingEvidenceItemFR311J>();
  for (const item of [...legacyContexts, ...mouthContexts]) {
    if (result.namedFormContextIds.includes(item.evidenceId)) {
      contextMap.set(item.evidenceId, item);
    }
  }
  const contextOnly = [...contextMap.values()];

  const sourceRefs = unique([
    ...allEvidence.flatMap((item) => item.sourceRefs),
    ...contextOnly.flatMap((item) => item.sourceRefs),
  ]);

  const outputStatus = mapStatus(result.status);
  const limitations: string[] = [
    '점수·다수결·강화·상쇄 계산으로 하나의 길흉 결론을 만들지 않는다.',
    '질문 주제와 직접 연결되지 않은 다른 의미로 빈칸을 채우지 않는다.',
    'wealth_status 같은 복합 주제를 재물·관직 등으로 임의 분해하지 않는다.',
    '전통 명명형이나 세부 부위를 현대 사진 특징·랜드마크와 자동 동일시하지 않는다.',
    '명명형 내부 타부위 문맥을 독립적인 일반 조합 공식으로 승격하지 않는다.',
    '교차부위 관계·조합은 원문에서 승인된 정확한 key가 명시 입력된 경우에만 사용하며 독립 특징으로부터 자동 추론하지 않는다.',
  ];

  if (outputStatus === 'conflict') {
    limitations.push('서로 반대 방향의 확정 직접 근거가 함께 있으므로 어느 한쪽을 우선하지 않는다.');
  }
  if (uncertain.length > 0) {
    limitations.push('전사·문장 경계가 불확실한 근거는 확정 근거와 분리하며 충돌 판정에도 사용하지 않는다.');
  }
  if (query.lensKey === 'traditional_health' || query.lensKey === 'longevity') {
    limitations.push('건강·수명 관련 내용은 역사적 관상 문헌의 주장일 뿐 의료 판단이나 실제 수명 예측에 사용할 수 없다.');
  }
  if (query.lensKey === 'children' || query.lensKey === 'parents') {
    limitations.push('자녀·부모 관련 전통 문구를 실제 생식능력·자녀 수·자녀 성별·가족의 생사 예측으로 사용할 수 없다.');
  }
  if (outputStatus === 'no_direct_evidence') {
    limitations.push('현재 질문에 직접 근거가 없으며 다른 주제의 전통 의미를 대신 사용하지 않는다.');
  }

  return Object.freeze({
    contractVersion: 'fr311j-v1' as const,
    lensKey: query.lensKey,
    outputStatus,
    headline: headline(outputStatus, query.lensKey),
    evidenceSections: Object.freeze({
      favorable: Object.freeze(favorable),
      challenging: Object.freeze(challenging),
      mixedOrConditional: Object.freeze(mixedOrConditional),
      uncertain: Object.freeze(uncertain),
      nonDirectionalDirectRules: Object.freeze(nonDirectionalDirectRules),
      contextOnly: Object.freeze(contextOnly),
    }),
    combinationAssessment: Object.freeze({
      sourceStatus: combinationStatus(result.status),
      directCombinationRuleIds: Object.freeze([...result.combinationRuleIds]),
      directCrossRegionEvidenceIds: Object.freeze([...result.crossRegionEvidenceIds]),
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
    doctrineNotice: '전통 관상 문헌의 역사적 해석을 정리한 것이며 현대 과학·심리·의학적 사실, 건강 진단, 수명·생식·자녀 성별 또는 실제 미래 예측을 뜻하지 않는다.' as const,
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

export const FR311J_OUTPUT_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
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
  productPredictionAuthorized: false as const,
});

export function assertTraditionalFaceReadingOutputFR311J(): void {
  for (const [key, flag] of Object.entries(FR311J_OUTPUT_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311j_output_authority_widening:' + key);
    }
  }

  const monkeyContextOnly = buildTraditionalFaceReadingOutputFR311J({
    lensKey: 'children',
    formKeys: ['mouth.named.monkey'],
    mouthContextDescriptorIds: ['fr311i.mouth.named.monkey.descriptor.2'],
  });
  if (monkeyContextOnly.outputStatus !== 'no_direct_evidence') {
    throw new Error('fr311j_context_promoted_to_semantic_evidence');
  }
}
