import {
  FACE_DIRECT_RULE_EVIDENCE_FR311G,
  FACE_NAMED_FORM_EVIDENCE_FR311G,
  type FaceEvidencePolarityFR311G,
} from './traditional-face-evidence-index-fr311g.js';
import {
  queryFaceEvidenceFR311G,
  type FaceEvidenceLensKeyFR311G,
  type FaceEvidenceQueryFR311G,
  type FaceEvidenceQueryStatusFR311G,
} from './traditional-face-evidence-query-fr311g.js';
import {
  NAMED_FORM_CONTEXT_LINKS_FR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';

export type FaceReadingOutputStatusFR311G =
  | 'conflict'
  | 'direct_combination'
  | 'direct_relation'
  | 'named_form_context'
  | 'parallel_evidence'
  | 'evidence'
  | 'no_direct_evidence';

export type FaceReadingEvidenceKindFR311G =
  | 'named_form_claim'
  | 'direct_rule'
  | 'named_form_context';

export interface FaceReadingEvidenceItemFR311G {
  readonly evidenceId: string;
  readonly kind: FaceReadingEvidenceKindFR311G;
  readonly region: 'eyebrow' | 'eye' | 'nose' | 'eyebrow_eye' | 'context';
  readonly label: string;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKey: string | null;
  readonly relationTarget: string | null;
  readonly lifeStage: string | null;
  readonly polarity: FaceEvidencePolarityFR311G | null;
  readonly certainty: 'direct_clear' | 'phrase_uncertain' | 'direct_rule' | 'context_only';
  readonly sourceRefs: readonly string[];
  readonly modernScientificFactAuthorized: false;
  readonly productPredictionAuthorized: false;
}

export interface FaceReadingEvidenceSectionsFR311G {
  readonly favorable: readonly FaceReadingEvidenceItemFR311G[];
  readonly challenging: readonly FaceReadingEvidenceItemFR311G[];
  readonly mixedOrConditional: readonly FaceReadingEvidenceItemFR311G[];
  readonly uncertain: readonly FaceReadingEvidenceItemFR311G[];
  readonly nonDirectionalDirectRules: readonly FaceReadingEvidenceItemFR311G[];
  readonly contextOnly: readonly FaceReadingEvidenceItemFR311G[];
}

export interface TraditionalFaceReadingOutputFR311G {
  readonly contractVersion: 'fr311g-v1';
  readonly lensKey: FaceEvidenceLensKeyFR311G;
  readonly outputStatus: FaceReadingOutputStatusFR311G;
  readonly headline: string;
  readonly evidenceSections: FaceReadingEvidenceSectionsFR311G;
  readonly combinationAssessment: Readonly<{
    sourceStatus:
      | 'direct_source_combination'
      | 'direct_source_relation'
      | 'named_form_context'
      | 'parallel_evidence_only'
      | 'unsupported';
    directCombinationRuleIds: readonly string[];
    contextIds: readonly string[];
    relationKeys: readonly string[];
    reinforcementAuthorized: false;
    cancellationAuthorized: false;
  }>;
  readonly sourceRefs: readonly string[];
  readonly limitations: readonly string[];
  readonly doctrineNotice: '전통 관상 문헌의 역사적 해석을 정리한 것이며 현대 과학·심리·의학적 사실, 건강 진단, 수명 예측 또는 실제 미래 예측을 뜻하지 않는다.';
  readonly scoreAuthorized: false;
  readonly aggregateGoodBadJudgementAuthorized: false;
  readonly unsupportedSynthesisAuthorized: false;
  readonly sourcePriorityInferenceAuthorized: false;
  readonly traditionalRuleInferenceAuthorized: false;
  readonly productPredictionAuthorized: false;
}

const LENS_LABELS: Readonly<Record<FaceEvidenceLensKeyFR311G, string>> = Object.freeze({
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
});

function mapStatus(status: FaceEvidenceQueryStatusFR311G): FaceReadingOutputStatusFR311G {
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

function namedItem(evidenceId: string): FaceReadingEvidenceItemFR311G {
  const item = FACE_NAMED_FORM_EVIDENCE_FR311G.find(
    (candidate) => candidate.evidenceId === evidenceId,
  );
  if (item === undefined) throw new Error(`fr311g_missing_named_evidence:${evidenceId}`);

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
    modernScientificFactAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

function directItem(ruleId: string): FaceReadingEvidenceItemFR311G {
  const item = FACE_DIRECT_RULE_EVIDENCE_FR311G.find(
    (candidate) => candidate.ruleId === ruleId,
  );
  if (item === undefined) throw new Error(`fr311g_missing_direct_rule:${ruleId}`);

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
    certainty: 'direct_rule' as const,
    sourceRefs: Object.freeze([...item.sourceRefs]),
    modernScientificFactAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

function contextItem(contextId: string): FaceReadingEvidenceItemFR311G {
  const context = NAMED_FORM_CONTEXT_LINKS_FR311C.find(
    (candidate) => candidate.contextId === contextId,
  );
  if (context === undefined) throw new Error(`fr311g_missing_context:${contextId}`);

  return Object.freeze({
    evidenceId: context.contextId,
    kind: 'named_form_context' as const,
    region: 'context' as const,
    label: context.formKey,
    sourceExpression: context.sourceExpression,
    meaningSummary: '특정 명명형의 원문 내부에서 함께 나타나는 문맥 조건이며 독립적인 일반 조합 공식으로 확장하지 않는다.',
    topicKey: null,
    relationTarget: null,
    lifeStage: null,
    polarity: null,
    certainty: 'context_only' as const,
    sourceRefs: Object.freeze([context.sourceRef]),
    modernScientificFactAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function headline(
  status: FaceReadingOutputStatusFR311G,
  lensKey: FaceEvidenceLensKeyFR311G,
): string {
  const label = LENS_LABELS[lensKey];
  switch (status) {
    case 'conflict':
      return `${label}에 관한 직접 문헌 근거가 서로 다른 방향을 가리킨다.`;
    case 'direct_combination':
      return `${label}에 관한 문헌의 직접 조합 근거가 있다.`;
    case 'direct_relation':
      return `${label}에 관한 부위 간 직접 관계 근거가 있다.`;
    case 'named_form_context':
      return `${label} 관련 근거와 명명형 내부 동반 문맥이 확인된다.`;
    case 'parallel_evidence':
      return `${label} 관련 개별 근거는 있으나 이 특징들의 직접 조합 의미는 확인되지 않는다.`;
    case 'evidence':
      return `${label}에 관한 직접 문헌 근거가 있다.`;
    case 'no_direct_evidence':
      return `${label}에 관해 현재 선택된 특징에서 직접 근거를 확인하지 못했다.`;
  }
}

function combinationStatus(
  status: FaceEvidenceQueryStatusFR311G,
): TraditionalFaceReadingOutputFR311G['combinationAssessment']['sourceStatus'] {
  switch (status) {
    case 'direct_source_combination':
      return 'direct_source_combination';
    case 'direct_source_relation':
      return 'direct_source_relation';
    case 'named_form_context':
      return 'named_form_context';
    case 'parallel_evidence_only':
      return 'parallel_evidence_only';
    case 'source_conflict':
    case 'evidence_only':
    case 'no_evidence':
    case 'unsupported':
      return 'unsupported';
  }
}

export function buildTraditionalFaceReadingOutputFR311G(
  query: FaceEvidenceQueryFR311G,
): TraditionalFaceReadingOutputFR311G {
  const result = queryFaceEvidenceFR311G(query);
  const named = result.namedEvidenceIds.map(namedItem);
  const uncertainSet = new Set(result.uncertainEvidenceIds);
  const clearNamed = named.filter((item) => !uncertainSet.has(item.evidenceId));
  const directRuleIds = unique([...result.directRuleIds, ...result.combinationRuleIds]);
  const directRules = directRuleIds.map(directItem);

  const favorable = [
    ...clearNamed.filter((item) => item.polarity === 'favorable'),
    ...directRules.filter((item) => item.polarity === 'favorable'),
  ];
  const challenging = [
    ...clearNamed.filter((item) => item.polarity === 'challenging'),
    ...directRules.filter((item) => item.polarity === 'challenging'),
  ];
  const mixedOrConditional = [
    ...clearNamed.filter((item) =>
      item.polarity === 'mixed' ||
      item.polarity === 'conditional' ||
      item.polarity === 'neutral'),
    ...directRules.filter((item) =>
      item.polarity === 'mixed' ||
      item.polarity === 'conditional' ||
      item.polarity === 'neutral'),
  ];
  const nonDirectionalDirectRules = directRules.filter((item) => item.polarity === null);
  const uncertain = named.filter((item) => uncertainSet.has(item.evidenceId));
  const contextOnly = result.namedFormContextIds.map(contextItem);

  const sourceRefs = unique([
    ...named.flatMap((item) => item.sourceRefs),
    ...directRules.flatMap((item) => item.sourceRefs),
    ...contextOnly.flatMap((item) => item.sourceRefs),
  ]);

  const outputStatus = mapStatus(result.status);
  const limitations: string[] = [
    '점수·다수결·강화·상쇄 계산으로 하나의 길흉 결론을 만들지 않는다.',
    '질문 주제와 직접 연결되지 않은 다른 의미로 빈칸을 채우지 않는다.',
    '전통 명명형이나 세부 부위를 현대 사진 특징·랜드마크와 자동 동일시하지 않는다.',
  ];

  if (outputStatus === 'conflict') {
    limitations.push('긍정·부정 직접 근거가 함께 있으므로 어느 한쪽을 우선하지 않는다.');
  }
  if (uncertain.length > 0) {
    limitations.push('일부 문구는 전사 불확실성이 있어 확정 근거와 분리해 읽어야 한다.');
  }
  if (
    query.lensKey === 'traditional_health' ||
    query.lensKey === 'longevity'
  ) {
    limitations.push('건강·수명 관련 내용은 역사적 관상 문헌의 주장일 뿐 의료 판단이나 실제 수명 예측에 사용할 수 없다.');
  }
  if (outputStatus === 'no_direct_evidence') {
    limitations.push('현재 질문에 직접 근거가 없으며 다른 주제의 전통 의미를 대신 사용하지 않는다.');
  }

  return Object.freeze({
    contractVersion: 'fr311g-v1' as const,
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
      contextIds: Object.freeze([...result.namedFormContextIds]),
      relationKeys: Object.freeze([...result.relationKeys]),
      reinforcementAuthorized: false as const,
      cancellationAuthorized: false as const,
    }),
    sourceRefs: Object.freeze(sourceRefs),
    limitations: Object.freeze(limitations),
    doctrineNotice: '전통 관상 문헌의 역사적 해석을 정리한 것이며 현대 과학·심리·의학적 사실, 건강 진단, 수명 예측 또는 실제 미래 예측을 뜻하지 않는다.' as const,
    scoreAuthorized: false as const,
    aggregateGoodBadJudgementAuthorized: false as const,
    unsupportedSynthesisAuthorized: false as const,
    sourcePriorityInferenceAuthorized: false as const,
    traditionalRuleInferenceAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

export const FR311G_OUTPUT_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  traditionalRegionToNeutralGeometryBindingAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  productPredictionAuthorized: false as const,
});

export function assertTraditionalFaceReadingOutputFR311G(): void {
  for (const [key, flag] of Object.entries(FR311G_OUTPUT_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311g_output_authority_widening:${key}`);
  }

  const dragonInbok = buildTraditionalFaceReadingOutputFR311G({
    lensKey: 'inbok',
    formKeys: ['nose.named.dragon'],
  });
  if (dragonInbok.outputStatus !== 'no_direct_evidence') {
    throw new Error('fr311g_nose_topic_leakage_detected');
  }
}
