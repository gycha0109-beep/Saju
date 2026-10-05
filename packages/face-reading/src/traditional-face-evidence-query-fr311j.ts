import {
  FACE_EVIDENCE_LENSES_FR311G,
  queryFaceEvidenceFR311G,
  type FaceEvidenceLensDefinitionFR311G,
  type FaceEvidenceLensKeyFR311G,
  type FaceEvidenceQueryStatusFR311G,
} from './traditional-face-evidence-query-fr311g.js';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
  MOUTH_NAMED_FORM_CONTEXTS_FR311J,
  type FaceEvidenceCertaintyFR311J,
  type FaceNamedFormEvidenceFR311J,
} from './traditional-face-evidence-index-fr311j.js';

export type FaceEvidenceLensKeyFR311J =
  | FaceEvidenceLensKeyFR311G
  | 'learning_talent'
  | 'speech_conduct'
  | 'parents'
  | 'life_course'
  | 'traditional_auspice';

export interface FaceEvidenceLensDefinitionFR311J {
  readonly lensKey: FaceEvidenceLensKeyFR311J;
  readonly topicKeys: readonly string[];
  readonly relationTargets: readonly string[];
  readonly ruleTopicKeys: readonly string[];
}

const NEW_LENSES_FR311J: readonly FaceEvidenceLensDefinitionFR311J[] = Object.freeze([
  Object.freeze({
    lensKey: 'learning_talent' as const,
    topicKeys: Object.freeze(['learning_talent']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['learning_talent']),
  }),
  Object.freeze({
    lensKey: 'speech_conduct' as const,
    topicKeys: Object.freeze(['speech_conduct']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['speech_conduct']),
  }),
  Object.freeze({
    lensKey: 'parents' as const,
    topicKeys: Object.freeze(['parents']),
    relationTargets: Object.freeze(['parents']),
    ruleTopicKeys: Object.freeze(['parents']),
  }),
  Object.freeze({
    lensKey: 'life_course' as const,
    topicKeys: Object.freeze(['life_course']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['life_course']),
  }),
  Object.freeze({
    lensKey: 'traditional_auspice' as const,
    topicKeys: Object.freeze(['traditional_auspice']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['traditional_auspice']),
  }),
]);

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function widenLegacyLens(
  lens: FaceEvidenceLensDefinitionFR311G,
): FaceEvidenceLensDefinitionFR311J {
  if (lens.lensKey !== 'livelihood') {
    return Object.freeze({
      lensKey: lens.lensKey,
      topicKeys: Object.freeze([...lens.topicKeys]),
      relationTargets: Object.freeze([...lens.relationTargets]),
      ruleTopicKeys: Object.freeze([...lens.ruleTopicKeys]),
    });
  }

  return Object.freeze({
    lensKey: lens.lensKey,
    topicKeys: Object.freeze(unique([...lens.topicKeys, 'livelihood'])),
    relationTargets: Object.freeze([...lens.relationTargets]),
    ruleTopicKeys: Object.freeze(unique([...lens.ruleTopicKeys, 'livelihood'])),
  });
}

export const FACE_EVIDENCE_LENSES_FR311J: readonly FaceEvidenceLensDefinitionFR311J[] =
  Object.freeze([
    ...FACE_EVIDENCE_LENSES_FR311G.map(widenLegacyLens),
    ...NEW_LENSES_FR311J,
  ]);

export type FaceEvidenceQueryStatusFR311J = FaceEvidenceQueryStatusFR311G;

export interface FaceEvidenceQueryFR311J {
  readonly lensKey: FaceEvidenceLensKeyFR311J;
  readonly formKeys?: readonly string[];
  readonly morphologyTermKeys?: readonly string[];
  readonly relationKeys?: readonly string[];
  readonly crossRegionFeatureKeys?: readonly string[];
  readonly traditionalRuleIds?: readonly string[];
  readonly mouthContextDescriptorIds?: readonly string[];
}

export interface FaceEvidenceQueryResultFR311J {
  readonly lensKey: FaceEvidenceLensKeyFR311J;
  readonly status: FaceEvidenceQueryStatusFR311J;
  readonly namedEvidenceIds: readonly string[];
  readonly directRuleIds: readonly string[];
  readonly combinationRuleIds: readonly string[];
  readonly namedFormContextIds: readonly string[];
  readonly relationKeys: readonly string[];
  readonly favorableEvidenceIds: readonly string[];
  readonly challengingEvidenceIds: readonly string[];
  readonly mixedOrConditionalEvidenceIds: readonly string[];
  readonly uncertainEvidenceIds: readonly string[];
  readonly aggregateJudgementAuthorized: false;
  readonly scoreAuthorized: false;
  readonly synthesisAuthorized: false;
  readonly traditionalRuleInferenceAuthorized: false;
  readonly topicRemappingInferenceAuthorized: false;
  readonly contextSemanticPromotionAuthorized: false;
  readonly reason: string;
}

function findLens(lensKey: FaceEvidenceLensKeyFR311J): FaceEvidenceLensDefinitionFR311J {
  const lens = FACE_EVIDENCE_LENSES_FR311J.find((candidate) => candidate.lensKey === lensKey);
  if (lens === undefined) {
    throw new Error('fr311j_unknown_lens:' + lensKey);
  }
  return lens;
}

export function isLegacyLensFR311J(
  lensKey: FaceEvidenceLensKeyFR311J,
): lensKey is FaceEvidenceLensKeyFR311G {
  return FACE_EVIDENCE_LENSES_FR311G.some((lens) => lens.lensKey === lensKey);
}

function namedClaimMatches(
  claim: FaceNamedFormEvidenceFR311J,
  lens: FaceEvidenceLensDefinitionFR311J,
): boolean {
  return lens.topicKeys.includes(claim.topicKey) ||
    lens.relationTargets.includes(claim.relationTarget);
}

function isClear(certainty: FaceEvidenceCertaintyFR311J): boolean {
  return certainty === 'direct_clear';
}

export function queryFaceEvidenceFR311J(
  query: FaceEvidenceQueryFR311J,
): FaceEvidenceQueryResultFR311J {
  const lens = findLens(query.lensKey);
  const formSet = query.formKeys === undefined ? null : new Set(query.formKeys);
  const selectedNamed = FACE_NAMED_FORM_EVIDENCE_FR311J.filter(
    (claim) =>
      formSet !== null &&
      formSet.has(claim.formKey) &&
      namedClaimMatches(claim, lens),
  );

  const requestedRuleIds = new Set(query.traditionalRuleIds ?? []);
  const ruleTopicKeys = unique([...lens.topicKeys, ...lens.ruleTopicKeys]);
  const selectedExplicitRules = FACE_DIRECT_RULE_EVIDENCE_FR311J.filter(
    (rule) =>
      requestedRuleIds.has(rule.ruleId) &&
      rule.topicKeys.some((topic) => ruleTopicKeys.includes(topic)),
  );

  const requestedContextDescriptorIds = new Set(query.mouthContextDescriptorIds ?? []);
  const selectedMouthContexts = MOUTH_NAMED_FORM_CONTEXTS_FR311J.filter(
    (context) =>
      formSet !== null &&
      formSet.has(context.formKey) &&
      requestedContextDescriptorIds.has(context.descriptorId),
  );

  const legacy = isLegacyLensFR311J(query.lensKey)
    ? queryFaceEvidenceFR311G({
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
    })
    : null;

  const namedEvidenceIds = unique([
    ...(legacy?.namedEvidenceIds ?? []),
    ...selectedNamed.map((item) => item.evidenceId),
  ]);
  const directRuleIds = unique([
    ...(legacy?.directRuleIds ?? []),
    ...selectedExplicitRules.map((item) => item.ruleId),
  ]);
  const combinationRuleIds = unique([...(legacy?.combinationRuleIds ?? [])]);
  const namedFormContextIds = unique([
    ...(legacy?.namedFormContextIds ?? []),
    ...selectedMouthContexts.map((item) => item.contextId),
  ]);

  const namedEvidence = FACE_NAMED_FORM_EVIDENCE_FR311J.filter(
    (item) => namedEvidenceIds.includes(item.evidenceId),
  );
  const directEvidence = FACE_DIRECT_RULE_EVIDENCE_FR311J.filter(
    (item) => directRuleIds.includes(item.ruleId) || combinationRuleIds.includes(item.ruleId),
  );

  const clearNamed = namedEvidence.filter((item) => isClear(item.certainty));
  const clearRules = directEvidence.filter((item) => isClear(item.certainty));
  const uncertainEvidenceIds = unique([
    ...namedEvidence
      .filter((item) => !isClear(item.certainty))
      .map((item) => item.evidenceId),
    ...directEvidence
      .filter((item) => !isClear(item.certainty))
      .map((item) => item.evidenceId),
  ]);

  const favorableEvidenceIds = unique([
    ...clearNamed
      .filter((item) => item.polarity === 'favorable')
      .map((item) => item.evidenceId),
    ...clearRules
      .filter((item) => item.polarity === 'favorable')
      .map((item) => item.evidenceId),
  ]);
  const challengingEvidenceIds = unique([
    ...clearNamed
      .filter((item) => item.polarity === 'challenging')
      .map((item) => item.evidenceId),
    ...clearRules
      .filter((item) => item.polarity === 'challenging')
      .map((item) => item.evidenceId),
  ]);
  const mixedOrConditionalEvidenceIds = unique([
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

  const hasConflict =
    favorableEvidenceIds.length > 0 &&
    challengingEvidenceIds.length > 0;
  const hasSemanticEvidence =
    namedEvidenceIds.length > 0 ||
    directRuleIds.length > 0 ||
    combinationRuleIds.length > 0;
  const hasContext = namedFormContextIds.length > 0;

  let status: FaceEvidenceQueryStatusFR311J;
  if (hasConflict || legacy?.status === 'source_conflict') {
    status = 'source_conflict';
  } else if (
    legacy?.status === 'direct_source_combination' ||
    legacy?.status === 'direct_source_relation' ||
    legacy?.status === 'parallel_evidence_only'
  ) {
    status = legacy.status;
  } else if (
    legacy?.status === 'named_form_context' ||
    (hasContext && hasSemanticEvidence)
  ) {
    status = 'named_form_context';
  } else if (hasSemanticEvidence) {
    status = 'evidence_only';
  } else {
    status = 'no_evidence';
  }

  return Object.freeze({
    lensKey: query.lensKey,
    status,
    namedEvidenceIds: Object.freeze(namedEvidenceIds),
    directRuleIds: Object.freeze(directRuleIds),
    combinationRuleIds: Object.freeze(combinationRuleIds),
    namedFormContextIds: Object.freeze(namedFormContextIds),
    relationKeys: Object.freeze(unique([...(query.relationKeys ?? [])])),
    favorableEvidenceIds: Object.freeze(favorableEvidenceIds),
    challengingEvidenceIds: Object.freeze(challengingEvidenceIds),
    mixedOrConditionalEvidenceIds: Object.freeze(mixedOrConditionalEvidenceIds),
    uncertainEvidenceIds: Object.freeze(uncertainEvidenceIds),
    aggregateJudgementAuthorized: false as const,
    scoreAuthorized: false as const,
    synthesisAuthorized: false as const,
    traditionalRuleInferenceAuthorized: false as const,
    topicRemappingInferenceAuthorized: false as const,
    contextSemanticPromotionAuthorized: false as const,
    reason: status === 'source_conflict'
      ? '같은 질문 주제에 서로 반대 방향의 확정 직접 근거가 함께 존재한다. 불확실 문구는 충돌 판정에 포함하지 않고 어느 한쪽도 우선하지 않는다.'
      : status === 'no_evidence'
        ? hasContext
          ? '명명형 내부 동반 문맥은 확인되지만 이 질문 주제의 직접 의미 근거는 없다. 문맥을 독립 의미로 승격하지 않는다.'
          : '선택된 명명형·직접 규칙에서 이 질문 주제의 직접 근거를 확인하지 못했다. 다른 주제의 의미로 빈칸을 채우지 않는다.'
        : '확인된 직접 근거만 반환하며 주제 재매핑·점수화·강화·상쇄·문맥의 의미 승격을 하지 않는다.',
  });
}

export const FR311J_QUERY_AUTHORITY_BOUNDARY = Object.freeze({
  aggregateJudgementAuthorized: false as const,
  scoreAuthorized: false as const,
  synthesisAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  topicRemappingInferenceAuthorized: false as const,
  contextSemanticPromotionAuthorized: false as const,
  wealthStatusSplitAuthorized: false as const,
});

export function assertFaceEvidenceLensesFR311J(): void {
  const keys = FACE_EVIDENCE_LENSES_FR311J.map((lens) => lens.lensKey);
  if (new Set(keys).size !== keys.length) {
    throw new Error('fr311j_duplicate_lens');
  }
  if (FACE_EVIDENCE_LENSES_FR311J.length !== 21) {
    throw new Error('fr311j_lens_count_drift:' + FACE_EVIDENCE_LENSES_FR311J.length);
  }

  const livelihood = findLens('livelihood');
  if (!livelihood.topicKeys.includes('livelihood') ||
      !livelihood.ruleTopicKeys.includes('livelihood')) {
    throw new Error('fr311j_livelihood_mapping_missing');
  }

  for (const lens of FACE_EVIDENCE_LENSES_FR311J) {
    if (lens.topicKeys.includes('wealth_status') ||
        lens.ruleTopicKeys.includes('wealth_status')) {
      throw new Error('fr311j_wealth_status_implicit_split:' + lens.lensKey);
    }
  }

  for (const [key, flag] of Object.entries(FR311J_QUERY_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311j_query_authority_widening:' + key);
    }
  }
}
