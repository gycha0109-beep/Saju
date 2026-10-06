import {
  FACE_EVIDENCE_LENSES_FR311J,
  type FaceEvidenceLensDefinitionFR311J,
} from './traditional-face-evidence-query-fr311j.js';
import {
  queryFaceEvidenceFR311N,
  type FaceEvidenceQueryFR311N,
  type FaceEvidenceQueryResultFR311N,
  type FaceEvidenceQueryStatusFR311N,
} from './traditional-face-evidence-query-fr311n.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
  EAR_NAMED_FORM_CONTEXTS_FR311O,
  EAR_NAMED_FORM_EVIDENCE_FR311O,
  type EarDirectRuleEvidenceFR311O,
  type EarNamedFormEvidenceFR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';

export interface FaceEvidenceQueryFR311O extends FaceEvidenceQueryFR311N {
  readonly earContextDescriptorIds?: readonly string[];
}

export type FaceEvidenceQueryStatusFR311O = FaceEvidenceQueryStatusFR311N;

export interface FaceEvidenceQueryResultFR311O
  extends Omit<
    FaceEvidenceQueryResultFR311N,
    | 'status'
    | 'namedEvidenceIds'
    | 'directRuleIds'
    | 'namedFormContextIds'
    | 'favorableEvidenceIds'
    | 'challengingEvidenceIds'
    | 'mixedOrConditionalEvidenceIds'
    | 'uncertainEvidenceIds'
    | 'reason'
  > {
  readonly status: FaceEvidenceQueryStatusFR311O;
  readonly namedEvidenceIds: readonly string[];
  readonly directRuleIds: readonly string[];
  readonly namedFormContextIds: readonly string[];
  readonly earNamedEvidenceIds: readonly string[];
  readonly earDirectRuleIds: readonly string[];
  readonly earNamedFormContextIds: readonly string[];
  readonly favorableEvidenceIds: readonly string[];
  readonly challengingEvidenceIds: readonly string[];
  readonly mixedOrConditionalEvidenceIds: readonly string[];
  readonly uncertainEvidenceIds: readonly string[];
  readonly namedFormClassifierAuthorized: false;
  readonly directRuleInferenceAuthorized: false;
  readonly contextSemanticPromotionAuthorized: false;
  readonly sourcePriorityAuthorized: false;
  readonly sourceCountWeightingAuthorized: false;
  readonly reinforcementAuthorized: false;
  readonly cancellationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly reason: string;
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function findLens(
  lensKey: FaceEvidenceQueryFR311O['lensKey'],
): FaceEvidenceLensDefinitionFR311J {
  const lens = FACE_EVIDENCE_LENSES_FR311J.find((candidate) => candidate.lensKey === lensKey);
  if (lens === undefined) {
    throw new Error('fr311o_unknown_lens:' + lensKey);
  }
  return lens;
}

function allowedTopics(lens: FaceEvidenceLensDefinitionFR311J): readonly string[] {
  return unique([...lens.topicKeys, ...lens.ruleTopicKeys]);
}

function namedMatches(
  item: EarNamedFormEvidenceFR311O,
  formSet: ReadonlySet<string>,
  topics: readonly string[],
): boolean {
  return formSet.has(item.formKey) && topics.includes(item.topicKey);
}

function ruleMatches(
  item: EarDirectRuleEvidenceFR311O,
  ruleSet: ReadonlySet<string>,
  topics: readonly string[],
): boolean {
  return ruleSet.has(item.ruleId) &&
    item.topicKeys.some((topic) => topics.includes(topic));
}

function isClear(certainty: string): boolean {
  return certainty === 'direct_clear';
}

function classifyStatus(
  base: FaceEvidenceQueryResultFR311N,
  hasEarSemanticEvidence: boolean,
  hasEarContext: boolean,
  favorableEvidenceIds: readonly string[],
  challengingEvidenceIds: readonly string[],
): FaceEvidenceQueryStatusFR311O {
  if (
    base.status === 'source_conflict' ||
    (favorableEvidenceIds.length > 0 && challengingEvidenceIds.length > 0)
  ) {
    return 'source_conflict';
  }

  if (
    base.status === 'direct_source_combination' ||
    base.status === 'direct_source_relation' ||
    base.status === 'parallel_evidence_only'
  ) {
    return base.status;
  }

  const hasAnySemanticEvidence =
    hasEarSemanticEvidence ||
    base.namedEvidenceIds.length > 0 ||
    base.directRuleIds.length > 0 ||
    base.combinationRuleIds.length > 0 ||
    base.crossRegionEvidenceIds.length > 0;

  if (
    base.status === 'named_form_context' ||
    ((hasEarContext || base.namedFormContextIds.length > 0) && hasAnySemanticEvidence)
  ) {
    return 'named_form_context';
  }

  if (hasEarSemanticEvidence || base.status === 'evidence_only') {
    return 'evidence_only';
  }

  return base.status;
}

export function queryFaceEvidenceFR311O(
  query: FaceEvidenceQueryFR311O,
): FaceEvidenceQueryResultFR311O {
  const base = queryFaceEvidenceFR311N(query);
  const lens = findLens(query.lensKey);
  const topics = allowedTopics(lens);
  const formSet = new Set(query.formKeys ?? []);
  const ruleSet = new Set(query.traditionalRuleIds ?? []);

  const selectedNamed = EAR_NAMED_FORM_EVIDENCE_FR311O.filter(
    (item) => namedMatches(item, formSet, topics),
  );
  const selectedRules = EAR_DIRECT_RULE_EVIDENCE_FR311O.filter(
    (item) => ruleMatches(item, ruleSet, topics),
  );

  const requestedContextDescriptorIds = new Set(query.earContextDescriptorIds ?? []);
  const selectedContexts = EAR_NAMED_FORM_CONTEXTS_FR311O.filter(
    (context) =>
      formSet.has(context.formKey) &&
      requestedContextDescriptorIds.has(context.descriptorId),
  );

  const clearNamed = selectedNamed.filter((item) => isClear(item.certainty));
  const clearRules = selectedRules.filter((item) => isClear(item.certainty));

  const earNamedEvidenceIds = selectedNamed.map((item) => item.evidenceId);
  const earDirectRuleIds = selectedRules.map((item) => item.ruleId);
  const earNamedFormContextIds = selectedContexts.map((item) => item.contextId);

  const favorableEvidenceIds = unique([
    ...base.favorableEvidenceIds,
    ...clearNamed
      .filter((item) => item.polarity === 'favorable')
      .map((item) => item.evidenceId),
    ...clearRules
      .filter((item) => item.polarity === 'favorable')
      .map((item) => item.evidenceId),
  ]);
  const challengingEvidenceIds = unique([
    ...base.challengingEvidenceIds,
    ...clearNamed
      .filter((item) => item.polarity === 'challenging')
      .map((item) => item.evidenceId),
    ...clearRules
      .filter((item) => item.polarity === 'challenging')
      .map((item) => item.evidenceId),
  ]);
  const mixedOrConditionalEvidenceIds = unique([
    ...base.mixedOrConditionalEvidenceIds,
    ...clearNamed
      .filter((item) =>
        item.polarity === 'mixed' ||
        item.polarity === 'conditional' ||
        item.polarity === 'neutral')
      .map((item) => item.evidenceId),
    ...clearRules
      .filter((item) =>
        item.polarity === 'mixed' ||
        item.polarity === 'conditional' ||
        item.polarity === 'neutral')
      .map((item) => item.evidenceId),
  ]);
  const uncertainEvidenceIds = unique([
    ...base.uncertainEvidenceIds,
    ...selectedNamed
      .filter((item) => !isClear(item.certainty))
      .map((item) => item.evidenceId),
    ...selectedRules
      .filter((item) => !isClear(item.certainty))
      .map((item) => item.evidenceId),
  ]);

  const hasEarSemanticEvidence =
    earNamedEvidenceIds.length > 0 ||
    earDirectRuleIds.length > 0;
  const status = classifyStatus(
    base,
    hasEarSemanticEvidence,
    earNamedFormContextIds.length > 0,
    favorableEvidenceIds,
    challengingEvidenceIds,
  );

  return Object.freeze({
    ...base,
    status,
    namedEvidenceIds: Object.freeze(unique([
      ...base.namedEvidenceIds,
      ...earNamedEvidenceIds,
    ])),
    directRuleIds: Object.freeze(unique([
      ...base.directRuleIds,
      ...earDirectRuleIds,
    ])),
    namedFormContextIds: Object.freeze(unique([
      ...base.namedFormContextIds,
      ...earNamedFormContextIds,
    ])),
    earNamedEvidenceIds: Object.freeze([...earNamedEvidenceIds]),
    earDirectRuleIds: Object.freeze([...earDirectRuleIds]),
    earNamedFormContextIds: Object.freeze([...earNamedFormContextIds]),
    favorableEvidenceIds: Object.freeze(favorableEvidenceIds),
    challengingEvidenceIds: Object.freeze(challengingEvidenceIds),
    mixedOrConditionalEvidenceIds: Object.freeze(mixedOrConditionalEvidenceIds),
    uncertainEvidenceIds: Object.freeze(uncertainEvidenceIds),
    namedFormClassifierAuthorized: false as const,
    directRuleInferenceAuthorized: false as const,
    contextSemanticPromotionAuthorized: false as const,
    sourcePriorityAuthorized: false as const,
    sourceCountWeightingAuthorized: false as const,
    reinforcementAuthorized: false as const,
    cancellationAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
    reason: status === 'source_conflict'
      ? '같은 얼굴 전체 질문 렌즈에 서로 반대 방향의 직접 전통 근거가 함께 존재한다. 귀 단독 근거를 포함해 어느 출처도 우선하거나 점수·다수결·상쇄하지 않는다.'
      : hasEarSemanticEvidence
        ? 'FR311L의 귀 명명형은 정확한 formKey, 귀 직접 규칙은 정확한 traditionalRuleId가 명시되고 기존 FR311J 렌즈 주제가 직접 일치할 때만 추가한다. 형태 관찰값으로 명명형이나 규칙을 자동 선택하지 않는다.'
        : earNamedFormContextIds.length > 0
          ? '귀 명명형 내부의 타부위 문맥만 확인되었으며 이를 독립적인 관계·조합 의미로 승격하지 않는다.'
          : base.reason,
  });
}

export const FR311O_QUERY_AUTHORITY_BOUNDARY = Object.freeze({
  namedFormClassifierAuthorized: false as const,
  directRuleInferenceAuthorized: false as const,
  relationInferenceAuthorized: false as const,
  combinationInferenceAuthorized: false as const,
  contextSemanticPromotionAuthorized: false as const,
  scoreAuthorized: false as const,
  aggregateJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityAuthorized: false as const,
  sourceCountWeightingAuthorized: false as const,
  reinforcementAuthorized: false as const,
  cancellationAuthorized: false as const,
  topicRemappingInferenceAuthorized: false as const,
  neutralGeometryBindingAuthorized: false as const,
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
  productInterpretationAuthorized: false as const,
});

export const FR311O_QUERY_SUMMARY = Object.freeze({
  inheritedLensCount: FACE_EVIDENCE_LENSES_FR311J.length,
  exactNamedFormKeyRequired: true as const,
  exactDirectRuleIdRequired: true as const,
  explicitEarContextDescriptorIdRequired: true as const,
});

export function assertFaceEvidenceQueryFR311O(): void {
  if (FR311O_QUERY_SUMMARY.inheritedLensCount !== 21) {
    throw new Error('fr311o_requires_21_inherited_lenses');
  }
  for (const [key, flag] of Object.entries(FR311O_QUERY_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311o_query_authority_widening:' + key);
    }
  }
}
