import {
  buildTraditionalFaceReadingOutputFR311N,
  type FaceReadingEvidenceItemFR311N,
  type FaceReadingOutputStatusFR311N,
  type TraditionalFaceReadingOutputFR311N,
} from './traditional-face-reading-output-fr311n.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
  EAR_NAMED_FORM_CONTEXTS_FR311O,
  EAR_NAMED_FORM_EVIDENCE_FR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  queryFaceEvidenceFR311O,
  type FaceEvidenceQueryFR311O,
  type FaceEvidenceQueryStatusFR311O,
} from './traditional-face-evidence-query-fr311o.js';

export type FaceReadingOutputStatusFR311O = FaceReadingOutputStatusFR311N;

export type FaceReadingEvidenceItemFR311O =
  Omit<FaceReadingEvidenceItemFR311N, 'region'> &
  Readonly<{
    region: FaceReadingEvidenceItemFR311N['region'] | 'ear' | 'ear_context';
  }>;

export interface FaceReadingEvidenceSectionsFR311O {
  readonly favorable: readonly FaceReadingEvidenceItemFR311O[];
  readonly challenging: readonly FaceReadingEvidenceItemFR311O[];
  readonly mixedOrConditional: readonly FaceReadingEvidenceItemFR311O[];
  readonly uncertain: readonly FaceReadingEvidenceItemFR311O[];
  readonly nonDirectionalDirectRules: readonly FaceReadingEvidenceItemFR311O[];
  readonly contextOnly: readonly FaceReadingEvidenceItemFR311O[];
}

export type TraditionalFaceReadingOutputFR311O =
  Omit<
    TraditionalFaceReadingOutputFR311N,
    | 'contractVersion'
    | 'outputStatus'
    | 'headline'
    | 'evidenceSections'
    | 'combinationAssessment'
    | 'sourceRefs'
    | 'limitations'
  > &
  Readonly<{
    contractVersion: 'fr311o-v1';
    outputStatus: FaceReadingOutputStatusFR311O;
    headline: string;
    evidenceSections: FaceReadingEvidenceSectionsFR311O;
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
      earStandaloneNamedEvidenceIds: readonly string[];
      earStandaloneDirectRuleIds: readonly string[];
      earStandaloneContextIds: readonly string[];
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
    spouseDeathPredictionAuthorized: false;
    familyDeathPredictionAuthorized: false;
    moralityFactAuthorized: false;
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

function mapStatus(status: FaceEvidenceQueryStatusFR311O): FaceReadingOutputStatusFR311O {
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
  status: FaceEvidenceQueryStatusFR311O,
): TraditionalFaceReadingOutputFR311O['combinationAssessment']['sourceStatus'] {
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

function namedItem(evidenceId: string): FaceReadingEvidenceItemFR311O {
  const item = EAR_NAMED_FORM_EVIDENCE_FR311O.find(
    (candidate) => candidate.evidenceId === evidenceId,
  );
  if (item === undefined) {
    throw new Error('fr311o_missing_ear_named_evidence:' + evidenceId);
  }

  return Object.freeze({
    evidenceId: item.evidenceId,
    kind: 'named_form_claim' as const,
    region: 'ear' as const,
    label: item.traditionalLabel,
    sourceExpression: item.sourceFragment,
    meaningSummary: item.meaningSummary,
    topicKey: item.topicKey,
    relationTarget: null,
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

function directItem(ruleId: string): FaceReadingEvidenceItemFR311O {
  const item = EAR_DIRECT_RULE_EVIDENCE_FR311O.find(
    (candidate) => candidate.ruleId === ruleId,
  );
  if (item === undefined) {
    throw new Error('fr311o_missing_ear_direct_rule:' + ruleId);
  }

  return Object.freeze({
    evidenceId: item.evidenceId,
    kind: 'direct_rule' as const,
    region: 'ear' as const,
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

function contextItem(contextId: string): FaceReadingEvidenceItemFR311O {
  const item = EAR_NAMED_FORM_CONTEXTS_FR311O.find(
    (candidate) => candidate.contextId === contextId,
  );
  if (item === undefined) {
    throw new Error('fr311o_missing_ear_named_context:' + contextId);
  }

  return Object.freeze({
    evidenceId: item.contextId,
    kind: 'named_form_context' as const,
    region: 'ear_context' as const,
    label: item.traditionalLabel,
    sourceExpression: item.sourceExpression,
    meaningSummary: item.contextSummary,
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
  });
}

function headline(
  status: FaceReadingOutputStatusFR311O,
  lensKey: FaceEvidenceQueryFR311O['lensKey'],
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

export function buildTraditionalFaceReadingOutputFR311O(
  query: FaceEvidenceQueryFR311O,
): TraditionalFaceReadingOutputFR311O {
  const base = buildTraditionalFaceReadingOutputFR311N(query);
  const result = queryFaceEvidenceFR311O(query);

  const named = result.earNamedEvidenceIds.map(namedItem);
  const direct = result.earDirectRuleIds.map(directItem);
  const contexts = result.earNamedFormContextIds.map(contextItem);
  const earEvidence = [...named, ...direct];
  const uncertainSet = new Set(result.uncertainEvidenceIds);

  const favorable = earEvidence.filter(
    (item) =>
      result.favorableEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const challenging = earEvidence.filter(
    (item) =>
      result.challengingEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const mixedOrConditional = earEvidence.filter(
    (item) =>
      result.mixedOrConditionalEvidenceIds.includes(item.evidenceId) &&
      !uncertainSet.has(item.evidenceId),
  );
  const uncertain = earEvidence.filter(
    (item) => uncertainSet.has(item.evidenceId),
  );

  const sourceRefs = unique([
    ...base.sourceRefs,
    ...earEvidence.flatMap((item) => item.sourceRefs),
    ...contexts.flatMap((item) => item.sourceRefs),
  ]);

  const outputStatus = mapStatus(result.status);
  const limitations = unique([
    ...base.limitations,
    '귀 명명형은 사용자가 명시한 정확한 formKey가 있을 때만 전통 의미 근거를 반환하며 형태 관찰값으로 명명형을 자동 판별하지 않는다.',
    '귀 단독 직접 규칙은 정확한 traditionalRuleId가 명시된 경우에만 사용하며 관찰 특징으로 규칙을 자동 선택하지 않는다.',
    '귀 명명형 내부의 눈·눈썹·코 등 타부위 문맥은 context-only로 유지하며 FR311M/N의 일반 관계·조합 key로 자동 승격하지 않는다.',
    '배우자·가족 사망, 수명, 건강, 성정·도덕성·행실 관련 문구는 역사적 전통 주장으로만 보존하며 실제 사람에 대한 예측·진단·사실 판정으로 사용하지 않는다.',
  ]);

  return Object.freeze({
    ...base,
    contractVersion: 'fr311o-v1' as const,
    outputStatus,
    headline: headline(outputStatus, query.lensKey),
    evidenceSections: Object.freeze({
      favorable: Object.freeze([
        ...base.evidenceSections.favorable,
        ...favorable,
      ]),
      challenging: Object.freeze([
        ...base.evidenceSections.challenging,
        ...challenging,
      ]),
      mixedOrConditional: Object.freeze([
        ...base.evidenceSections.mixedOrConditional,
        ...mixedOrConditional,
      ]),
      uncertain: Object.freeze([
        ...base.evidenceSections.uncertain,
        ...uncertain,
      ]),
      nonDirectionalDirectRules: Object.freeze([
        ...base.evidenceSections.nonDirectionalDirectRules,
      ]),
      contextOnly: Object.freeze([
        ...base.evidenceSections.contextOnly,
        ...contexts,
      ]),
    }),
    combinationAssessment: Object.freeze({
      sourceStatus: combinationStatus(result.status),
      directCombinationRuleIds: Object.freeze([...result.combinationRuleIds]),
      directCrossRegionEvidenceIds: Object.freeze([...result.crossRegionEvidenceIds]),
      earDirectCrossRegionEvidenceIds: Object.freeze([...result.earCrossRegionEvidenceIds]),
      contextIds: Object.freeze([...result.namedFormContextIds]),
      earStandaloneNamedEvidenceIds: Object.freeze([...result.earNamedEvidenceIds]),
      earStandaloneDirectRuleIds: Object.freeze([...result.earDirectRuleIds]),
      earStandaloneContextIds: Object.freeze([...result.earNamedFormContextIds]),
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
    spouseDeathPredictionAuthorized: false as const,
    familyDeathPredictionAuthorized: false as const,
    moralityFactAuthorized: false as const,
  });
}

export const FR311O_OUTPUT_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  sourceCountWeightingAuthorized: false as const,
  reinforcementAuthorized: false as const,
  cancellationAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  topicRemappingInferenceAuthorized: false as const,
  relationInferenceAuthorized: false as const,
  combinationInferenceAuthorized: false as const,
  contextSemanticPromotionAuthorized: false as const,
  traditionalRegionToNeutralGeometryBindingAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  spouseDeathPredictionAuthorized: false as const,
  familyDeathPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  moralityFactAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
  productPredictionAuthorized: false as const,
});

export function assertTraditionalFaceReadingOutputFR311O(): void {
  for (const [key, flag] of Object.entries(FR311O_OUTPUT_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311o_output_authority_widening:' + key);
    }
  }
}
