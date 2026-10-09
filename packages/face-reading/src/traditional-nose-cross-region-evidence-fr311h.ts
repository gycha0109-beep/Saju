import {
  NOSE_DIRECT_RULES_FR311F,
  NOSE_NAMED_FORM_SEMANTICS_FR311F,
  type NoseLifeStageFR311F,
  type NosePolarityFR311F,
} from './traditional-nose-semantics-fr311f.js';

export type NoseCrossRegionEvidenceKindFR311H =
  | 'direct_cross_region_relation'
  | 'named_form_context'
  | 'descriptive_companion';

export type NoseCrossRegionVerificationFR311H =
  | 'gujin634_transcription_reviewed'
  | 'gujin634_phrase_boundary_uncertain';

export type NoseCrossRegionOtherRegionFR311H =
  | 'forehead_traditional'
  | 'yintang_traditional'
  | 'eye'
  | 'eyebrow_eye'
  | 'cheek_mid_face'
  | 'mouth'
  | 'face'
  | 'traditional_adjacent_face_region'
  | 'hair'
  | 'body'
  | 'gait';

export interface NoseCrossRegionParticipantFR311H {
  readonly region: NoseCrossRegionOtherRegionFR311H;
  readonly sourceLocalKey: string;
}

export interface NoseDirectCrossRegionRelationFR311H {
  readonly evidenceId: string;
  readonly evidenceKind: 'direct_cross_region_relation';
  readonly relationKey: string;
  readonly sourceRuleId: string;
  readonly noseParticipant: string;
  readonly otherParticipants: readonly NoseCrossRegionParticipantFR311H[];
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKeys: readonly string[];
  readonly polarity: NosePolarityFR311F;
  readonly lifeStage: NoseLifeStageFR311F;
  readonly relationTarget: string | null;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'gujin634_transcription_reviewed';
  readonly generalizationAuthorized: true;
  readonly relationInferenceAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly namedFormClassifierAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface NoseNamedFormCrossRegionContextFR311H {
  readonly contextId: string;
  readonly evidenceKind: 'named_form_context' | 'descriptive_companion';
  readonly formKey: string;
  readonly featureKey: string;
  readonly noseParticipant: string;
  readonly otherParticipants: readonly NoseCrossRegionParticipantFR311H[];
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: NoseCrossRegionVerificationFR311H;
  readonly generalizationAuthorized: false;
  readonly semanticCombinationAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly namedFormClassifierAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

const GUJIN_634 = 'witness.gujin473.art634.wikisource';

function participant(
  region: NoseCrossRegionOtherRegionFR311H,
  sourceLocalKey: string,
): NoseCrossRegionParticipantFR311H {
  return Object.freeze({ region, sourceLocalKey });
}

function directRelation(
  value: Omit<
    NoseDirectCrossRegionRelationFR311H,
    | 'evidenceKind'
    | 'verificationState'
    | 'generalizationAuthorized'
    | 'relationInferenceAuthorized'
    | 'neutralGeometryBindingAuthorized'
    | 'namedFormClassifierAuthorized'
    | 'modernScientificFactAuthorized'
    | 'productInterpretationAuthorized'
  >,
): NoseDirectCrossRegionRelationFR311H {
  return Object.freeze({
    ...value,
    evidenceKind: 'direct_cross_region_relation' as const,
    otherParticipants: Object.freeze([...value.otherParticipants]),
    topicKeys: Object.freeze([...value.topicKeys]),
    sourceRefs: Object.freeze([...value.sourceRefs]),
    verificationState: 'gujin634_transcription_reviewed' as const,
    generalizationAuthorized: true as const,
    relationInferenceAuthorized: false as const,
    neutralGeometryBindingAuthorized: false as const,
    namedFormClassifierAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

function context(
  value: Omit<
    NoseNamedFormCrossRegionContextFR311H,
    | 'generalizationAuthorized'
    | 'semanticCombinationAuthorized'
    | 'relationInferenceAuthorized'
    | 'neutralGeometryBindingAuthorized'
    | 'namedFormClassifierAuthorized'
    | 'modernScientificFactAuthorized'
    | 'productInterpretationAuthorized'
  >,
): NoseNamedFormCrossRegionContextFR311H {
  return Object.freeze({
    ...value,
    otherParticipants: Object.freeze([...value.otherParticipants]),
    sourceRefs: Object.freeze([...value.sourceRefs]),
    generalizationAuthorized: false as const,
    semanticCombinationAuthorized: false as const,
    relationInferenceAuthorized: false as const,
    neutralGeometryBindingAuthorized: false as const,
    namedFormClassifierAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

function existingRule(ruleId: string) {
  const rule = NOSE_DIRECT_RULES_FR311F.find((candidate) => candidate.ruleId === ruleId);
  if (rule === undefined) throw new Error(`fr311h_missing_fr311f_rule:${ruleId}`);
  return rule;
}

const SHANGEN_TO_FOREHEAD = existingRule('fr311f.shangen.to_forehead');
const BRIDGE_TO_YINTANG = existingRule('fr311f.bridge.round_to_yintang');
const NOSE_TO_TIANTING = existingRule('fr311f.nose.reaches_tianting');

export const NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H:
readonly NoseDirectCrossRegionRelationFR311H[] = Object.freeze([
  directRelation({
    evidenceId: 'fr311h.relation.shangen_forehead_connected_level',
    relationKey: 'nose_forehead.shangen_bridge_connected_level_with_forehead',
    sourceRuleId: SHANGEN_TO_FOREHEAD.ruleId,
    noseParticipant: '山根 + 鼻梁',
    otherParticipants: Object.freeze([
      participant('forehead_traditional', '額'),
    ]),
    sourceExpression: SHANGEN_TO_FOREHEAD.sourceExpression,
    meaningSummary: SHANGEN_TO_FOREHEAD.meaningSummary,
    topicKeys: SHANGEN_TO_FOREHEAD.topicKeys,
    polarity: SHANGEN_TO_FOREHEAD.polarity,
    lifeStage: SHANGEN_TO_FOREHEAD.lifeStage,
    relationTarget: SHANGEN_TO_FOREHEAD.relationTarget,
    sourceRefs: SHANGEN_TO_FOREHEAD.sourceRefs,
  }),
  directRelation({
    evidenceId: 'fr311h.relation.bridge_round_penetrates_yintang',
    relationKey: 'nose_yintang.bridge_round_penetrates_yintang',
    sourceRuleId: BRIDGE_TO_YINTANG.ruleId,
    noseParticipant: '鼻梁',
    otherParticipants: Object.freeze([
      participant('yintang_traditional', '印堂'),
    ]),
    sourceExpression: BRIDGE_TO_YINTANG.sourceExpression,
    meaningSummary: BRIDGE_TO_YINTANG.meaningSummary,
    topicKeys: BRIDGE_TO_YINTANG.topicKeys,
    polarity: BRIDGE_TO_YINTANG.polarity,
    lifeStage: BRIDGE_TO_YINTANG.lifeStage,
    relationTarget: BRIDGE_TO_YINTANG.relationTarget,
    sourceRefs: BRIDGE_TO_YINTANG.sourceRefs,
  }),
  directRelation({
    evidenceId: 'fr311h.relation.nose_rises_to_tianting',
    relationKey: 'nose_forehead.nose_rises_to_tianting',
    sourceRuleId: NOSE_TO_TIANTING.ruleId,
    noseParticipant: '鼻',
    otherParticipants: Object.freeze([
      participant('forehead_traditional', '天庭'),
    ]),
    sourceExpression: NOSE_TO_TIANTING.sourceExpression,
    meaningSummary: NOSE_TO_TIANTING.meaningSummary,
    topicKeys: NOSE_TO_TIANTING.topicKeys,
    polarity: NOSE_TO_TIANTING.polarity,
    lifeStage: NOSE_TO_TIANTING.lifeStage,
    relationTarget: NOSE_TO_TIANTING.relationTarget,
    sourceRefs: NOSE_TO_TIANTING.sourceRefs,
  }),
]);

export const NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H:
readonly NoseNamedFormCrossRegionContextFR311H[] = Object.freeze([
  context({
    contextId: 'fr311h.context.fuxi.tianting',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.fuxi',
    featureKey: 'source_local.fuxi.insert_tianting',
    noseParticipant: '伏犀鼻',
    otherParticipants: Object.freeze([
      participant('forehead_traditional', '天庭'),
    ]),
    sourceExpression: '插天庭中',
    meaningSummary: '伏犀鼻 원문 내부에서 코의 형세가 天庭 쪽까지 이어지는 동반 문맥이다. 독립 일반 규칙으로 확장하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.fuxi.yintang',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.fuxi',
    featureKey: 'source_local.fuxi.shangen_to_yintang',
    noseParticipant: '山根',
    otherParticipants: Object.freeze([
      participant('yintang_traditional', '印堂'),
    ]),
    sourceExpression: '山根直上印堂隆',
    meaningSummary: '伏犀鼻 원문 내부에서 山根과 印堂이 함께 기술되는 동반 문맥이다. 일반적인 山根-印堂 공식으로 확장하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.hawk_beak.lip_edge',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.hawk_beak',
    featureKey: 'source_local.hawk_beak.lip_edge',
    noseParticipant: '鷹嘴鼻',
    otherParticipants: Object.freeze([
      participant('mouth', '脣邊'),
    ]),
    sourceExpression: '又如鷹嘴鎖脣邊',
    meaningSummary: '鷹嘴鼻의 굽은 형세를 입술 가장자리와 함께 기술한 명명형 내부 형태 문맥이다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.crucian_carp.eye_white_exposed',
    evidenceKind: 'descriptive_companion',
    formKey: 'nose.named.crucian_carp',
    featureKey: 'source_local.crucian_carp.jing_lu_bai',
    noseParticipant: '鯽魚鼻',
    otherParticipants: Object.freeze([
      participant('eye', '睛露白'),
    ]),
    sourceExpression: '骨肉無親睛露白',
    meaningSummary: '鯽魚鼻 원문에 눈의 露白 표현이 함께 나타나지만 문장 경계와 독립 의미 귀속을 확정하지 않아 동반 기술로만 보존한다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_phrase_boundary_uncertain',
  }),
  context({
    contextId: 'fr311h.context.indented.nose_face_relation',
    evidenceKind: 'descriptive_companion',
    formKey: 'nose.named.indented',
    featureKey: 'source_local.indented.nose_face_relation',
    noseParticipant: '偏凹鼻',
    otherParticipants: Object.freeze([
      participant('face', '面'),
    ]),
    sourceExpression: '鼻面相生差不多',
    meaningSummary: '偏凹鼻 원문에서 코와 얼굴의 관계를 기술하는 구절이지만 정확한 조작적 의미를 확정하지 않아 source-local 동반 표현으로만 보존한다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_phrase_boundary_uncertain',
  }),
  context({
    contextId: 'fr311h.context.solitary_peak.cheekbones_low_small',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.solitary_peak',
    featureKey: 'source_local.solitary_peak.cheekbones_low_small',
    noseParticipant: '孤峰鼻',
    otherParticipants: Object.freeze([
      participant('cheek_mid_face', '兩顴低小'),
    ]),
    sourceExpression: '兩顴低小',
    meaningSummary: '孤峰鼻 원문 내부에서 양 관골이 낮고 작다고 함께 기술한 조건이며 코 자체 형태나 일반 관골 규칙으로 승격하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.roe_deer.jinjia_lianggui',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.roe_deer',
    featureKey: 'source_local.roe_deer.jinjia_lianggui',
    noseParticipant: '獐鼻',
    otherParticipants: Object.freeze([
      participant('traditional_adjacent_face_region', '金甲二櫃'),
    ]),
    sourceExpression: '金甲二櫃肉綳纏',
    meaningSummary: '獐鼻 원문 내부의 金甲·二櫃 동반 표현이다. 현대 관골·볼 좌표와 자동 동일시하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.orangutan.brow_eye_close',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.orangutan',
    featureKey: 'source_local.orangutan.brow_eye_close',
    noseParticipant: '猩鼻',
    otherParticipants: Object.freeze([
      participant('eyebrow_eye', '眉眼相挨'),
    ]),
    sourceExpression: '眉眼相挨',
    meaningSummary: '猩鼻 명명형 원문 내부에서 눈썹과 눈이 가까운 조건을 함께 기술한다. 일반 눈썹-눈 관계 규칙으로 승격하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.orangutan.coarse_hair',
    evidenceKind: 'descriptive_companion',
    formKey: 'nose.named.orangutan',
    featureKey: 'source_local.orangutan.coarse_hair',
    noseParticipant: '猩鼻',
    otherParticipants: Object.freeze([
      participant('hair', '粗髮毛'),
    ]),
    sourceExpression: '粗髮毛',
    meaningSummary: '猩鼻 명명형 원문에 함께 등장하는 모발 동반 묘사이며 얼굴 조합 의미로 일반화하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.orangutan.face_lip_body',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.orangutan',
    featureKey: 'source_local.orangutan.face_lip_body',
    noseParticipant: '猩鼻',
    otherParticipants: Object.freeze([
      participant('face', '面闊'),
      participant('mouth', '脣掀'),
      participant('body', '身廣厚'),
    ]),
    sourceExpression: '面闊脣掀身廣厚',
    meaningSummary: '猩鼻 명명형 원문에서 넓은 얼굴·들린 입술·넓고 두터운 몸을 함께 기술한 묶음 문맥이다. 각 특징의 독립 의미로 분해하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.deer.fast_gait',
    evidenceKind: 'descriptive_companion',
    formKey: 'nose.named.deer',
    featureKey: 'source_local.deer.fast_gait',
    noseParticipant: '鹿鼻',
    otherParticipants: Object.freeze([
      participant('gait', '步急'),
    ]),
    sourceExpression: '步急',
    meaningSummary: '鹿鼻 원문에 함께 나타나는 보행 동반 묘사이며 코나 얼굴 부위 조합 규칙으로 일반화하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
  context({
    contextId: 'fr311h.context.ape.mouth_pointed',
    evidenceKind: 'named_form_context',
    formKey: 'nose.named.ape',
    featureKey: 'source_local.ape.mouth_pointed',
    noseParticipant: '猿鼻',
    otherParticipants: Object.freeze([
      participant('mouth', '口頗尖'),
    ]),
    sourceExpression: '口頗尖',
    meaningSummary: '猿鼻 명명형 원문에서 입이 꽤 뾰족하다는 조건을 함께 기술하며 독립적인 코-입 의미 공식으로 확장하지 않는다.',
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed',
  }),
]);

export const FR311H_CROSS_REGION_SUMMARY = Object.freeze({
  directCrossRegionRelations: NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H.length,
  namedFormContexts: NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.filter(
    (item) => item.evidenceKind === 'named_form_context',
  ).length,
  descriptiveCompanions: NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.filter(
    (item) => item.evidenceKind === 'descriptive_companion',
  ).length,
  totalContextRecords: NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.length,
});

export interface NoseCrossRegionResolutionQueryFR311H {
  readonly formKeys?: readonly string[];
  readonly relationKeys?: readonly string[];
  readonly crossRegionFeatureKeys?: readonly string[];
  readonly allowedTopicKeys?: readonly string[];
}

export interface NoseCrossRegionResolutionResultFR311H {
  readonly status: 'direct_source_relation' | 'named_form_context' | 'unsupported';
  readonly matchedDirectRuleIds: readonly string[];
  readonly matchedContextIds: readonly string[];
  readonly matchedRelationKeys: readonly string[];
  readonly matchedFeatureKeys: readonly string[];
  readonly semanticCombinationAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly reason: string;
}

function topicAllowed(
  topics: readonly string[],
  allowed: readonly string[] | undefined,
): boolean {
  if (allowed === undefined) return true;
  return topics.some((topic) => allowed.includes(topic));
}

export function resolveNoseCrossRegionEvidenceFR311H(
  query: NoseCrossRegionResolutionQueryFR311H,
): NoseCrossRegionResolutionResultFR311H {
  const relationSet = new Set(query.relationKeys ?? []);
  const direct = NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H.filter(
    (item) => relationSet.has(item.relationKey) && topicAllowed(item.topicKeys, query.allowedTopicKeys),
  );

  if (direct.length > 0) {
    return Object.freeze({
      status: 'direct_source_relation' as const,
      matchedDirectRuleIds: Object.freeze(direct.map((item) => item.sourceRuleId)),
      matchedContextIds: Object.freeze([]),
      matchedRelationKeys: Object.freeze(direct.map((item) => item.relationKey)),
      matchedFeatureKeys: Object.freeze([]),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      reason: '원문이 코와 다른 전통 부위의 정확한 관계 조건에 직접 의미를 부여한다. 이 relationKey는 별도 관찰 또는 명시 입력이 있을 때만 사용하며 독립 특징에서 자동 추론하지 않는다.',
    });
  }

  const formSet = new Set(query.formKeys ?? []);
  const featureSet = new Set(query.crossRegionFeatureKeys ?? []);
  const contexts = NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.filter(
    (item) => formSet.has(item.formKey) && featureSet.has(item.featureKey),
  );

  if (contexts.length > 0) {
    return Object.freeze({
      status: 'named_form_context' as const,
      matchedDirectRuleIds: Object.freeze([]),
      matchedContextIds: Object.freeze(contexts.map((item) => item.contextId)),
      matchedRelationKeys: Object.freeze([]),
      matchedFeatureKeys: Object.freeze(contexts.map((item) => item.featureKey)),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      reason: '해당 표현은 특정 코 명명형 원문 안의 동반 문맥이다. 독립적인 코×타부위 의미 공식으로 일반화하지 않는다.',
    });
  }

  return Object.freeze({
    status: 'unsupported' as const,
    matchedDirectRuleIds: Object.freeze([]),
    matchedContextIds: Object.freeze([]),
    matchedRelationKeys: Object.freeze([]),
    matchedFeatureKeys: Object.freeze([]),
    semanticCombinationAuthorized: false as const,
    relationInferenceAuthorized: false as const,
    reason: '현재 FR311H 분류에서 이 코×타부위 관계 또는 명명형 문맥을 직접 뒷받침하는 근거가 없다. 새 관계나 의미를 생성하지 않는다.',
  });
}

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311h_duplicate:${path}`);
}

export function assertNoseCrossRegionEvidenceFR311H(): void {
  assertUnique(NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H.map((item) => item.evidenceId), 'direct_evidence');
  assertUnique(NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H.map((item) => item.relationKey), 'relation_key');
  assertUnique(NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H.map((item) => item.sourceRuleId), 'source_rule');
  assertUnique(NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.map((item) => item.contextId), 'context_id');
  assertUnique(NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.map((item) => item.featureKey), 'feature_key');

  for (const item of NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H) {
    const sourceRule = existingRule(item.sourceRuleId);
    if (sourceRule.sourceExpression !== item.sourceExpression) {
      throw new Error(`fr311h_direct_source_expression_drift:${item.evidenceId}`);
    }
    if (item.generalizationAuthorized !== true ||
        item.relationInferenceAuthorized !== false ||
        item.neutralGeometryBindingAuthorized !== false ||
        item.namedFormClassifierAuthorized !== false ||
        item.modernScientificFactAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error(`fr311h_direct_authority_drift:${item.evidenceId}`);
    }
  }

  for (const item of NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H) {
    const sourceForm = NOSE_NAMED_FORM_SEMANTICS_FR311F.find(
      (candidate) => candidate.formKey === item.formKey,
    );
    if (sourceForm === undefined) throw new Error(`fr311h_missing_source_form:${item.formKey}`);
    if (!sourceForm.sourceText.includes(item.sourceExpression)) {
      throw new Error(`fr311h_context_source_expression_drift:${item.contextId}`);
    }
    if (item.generalizationAuthorized !== false ||
        item.semanticCombinationAuthorized !== false ||
        item.relationInferenceAuthorized !== false ||
        item.neutralGeometryBindingAuthorized !== false ||
        item.namedFormClassifierAuthorized !== false ||
        item.modernScientificFactAuthorized !== false ||
        item.productInterpretationAuthorized !== false) {
      throw new Error(`fr311h_context_authority_drift:${item.contextId}`);
    }
  }
}
