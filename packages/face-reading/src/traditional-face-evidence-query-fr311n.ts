import {
  EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M,
  type EarCrossRegionDirectEvidenceFR311M,
} from './traditional-ear-cross-region-evidence-fr311m.js';
import {
  FACE_EVIDENCE_LENSES_FR311J,
  queryFaceEvidenceFR311J,
  type FaceEvidenceLensDefinitionFR311J,
  type FaceEvidenceQueryFR311J,
  type FaceEvidenceQueryResultFR311J,
  type FaceEvidenceQueryStatusFR311J,
} from './traditional-face-evidence-query-fr311j.js';

export type FaceEvidenceQueryFR311N = FaceEvidenceQueryFR311J;
export type FaceEvidenceQueryStatusFR311N = FaceEvidenceQueryStatusFR311J;

export interface FaceEvidenceQueryResultFR311N
  extends Omit<
    FaceEvidenceQueryResultFR311J,
    | 'status'
    | 'crossRegionEvidenceIds'
    | 'relationKeys'
    | 'combinationKeys'
    | 'favorableEvidenceIds'
    | 'challengingEvidenceIds'
    | 'mixedOrConditionalEvidenceIds'
    | 'reason'
  > {
  readonly status: FaceEvidenceQueryStatusFR311N;
  readonly crossRegionEvidenceIds: readonly string[];
  readonly earCrossRegionEvidenceIds: readonly string[];
  readonly relationKeys: readonly string[];
  readonly combinationKeys: readonly string[];
  readonly earRelationKeys: readonly string[];
  readonly earCombinationKeys: readonly string[];
  readonly favorableEvidenceIds: readonly string[];
  readonly challengingEvidenceIds: readonly string[];
  readonly mixedOrConditionalEvidenceIds: readonly string[];
  readonly relationInferenceAuthorized: false;
  readonly combinationInferenceAuthorized: false;
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
  lensKey: FaceEvidenceQueryFR311N['lensKey'],
): FaceEvidenceLensDefinitionFR311J {
  const lens = FACE_EVIDENCE_LENSES_FR311J.find((candidate) => candidate.lensKey === lensKey);
  if (lens === undefined) {
    throw new Error('fr311n_unknown_lens:' + lensKey);
  }
  return lens;
}

function allowedTopics(
  lens: FaceEvidenceLensDefinitionFR311J,
): readonly string[] {
  return unique([...lens.topicKeys, ...lens.ruleTopicKeys]);
}

function topicAllowed(
  evidence: EarCrossRegionDirectEvidenceFR311M,
  topics: readonly string[],
): boolean {
  return evidence.topicKeys.some((topic) => topics.includes(topic));
}

function selectEarCrossRegionEvidenceFR311N(
  query: FaceEvidenceQueryFR311N,
  topics: readonly string[],
): readonly EarCrossRegionDirectEvidenceFR311M[] {
  const relationSet = new Set(query.relationKeys ?? []);
  const combinationSet = new Set(query.combinationKeys ?? []);

  return Object.freeze(
    EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter((evidence) => {
      if (evidence.evidenceOwner !== 'fr311m') {
        return false;
      }
      if (!topicAllowed(evidence, topics)) {
        return false;
      }
      if (evidence.evidenceKind === 'direct_cross_region_relation') {
        return evidence.relationKey !== null && relationSet.has(evidence.relationKey);
      }
      return evidence.combinationKey !== null && combinationSet.has(evidence.combinationKey);
    }),
  );
}

function classifyStatus(
  base: FaceEvidenceQueryResultFR311J,
  selectedEar: readonly EarCrossRegionDirectEvidenceFR311M[],
  favorableEvidenceIds: readonly string[],
  challengingEvidenceIds: readonly string[],
): FaceEvidenceQueryStatusFR311N {
  if (
    base.status === 'source_conflict' ||
    (favorableEvidenceIds.length > 0 && challengingEvidenceIds.length > 0)
  ) {
    return 'source_conflict';
  }
  if (selectedEar.some((item) => item.evidenceKind === 'direct_cross_region_combination')) {
    return 'direct_source_combination';
  }
  if (selectedEar.some((item) => item.evidenceKind === 'direct_cross_region_relation')) {
    return 'direct_source_relation';
  }
  return base.status;
}

export function queryFaceEvidenceFR311N(
  query: FaceEvidenceQueryFR311N,
): FaceEvidenceQueryResultFR311N {
  const base = queryFaceEvidenceFR311J(query);
  const lens = findLens(query.lensKey);
  const topics = allowedTopics(lens);
  const selectedEar = selectEarCrossRegionEvidenceFR311N(query, topics);

  const earCrossRegionEvidenceIds = selectedEar.map((item) => item.evidenceId);
  const earRelationKeys = unique(
    selectedEar.flatMap((item) => item.relationKey === null ? [] : [item.relationKey]),
  );
  const earCombinationKeys = unique(
    selectedEar.flatMap((item) => item.combinationKey === null ? [] : [item.combinationKey]),
  );

  const favorableEvidenceIds = unique([
    ...base.favorableEvidenceIds,
    ...selectedEar
      .filter((item) => item.polarity === 'favorable')
      .map((item) => item.evidenceId),
  ]);
  const challengingEvidenceIds = unique([
    ...base.challengingEvidenceIds,
    ...selectedEar
      .filter((item) => item.polarity === 'challenging')
      .map((item) => item.evidenceId),
  ]);
  const mixedOrConditionalEvidenceIds = unique([
    ...base.mixedOrConditionalEvidenceIds,
    ...selectedEar
      .filter((item) =>
        item.polarity === 'mixed' ||
        item.polarity === 'conditional' ||
        item.polarity === 'neutral')
      .map((item) => item.evidenceId),
  ]);

  const status = classifyStatus(
    base,
    selectedEar,
    favorableEvidenceIds,
    challengingEvidenceIds,
  );

  return Object.freeze({
    ...base,
    status,
    crossRegionEvidenceIds: Object.freeze(unique([
      ...base.crossRegionEvidenceIds,
      ...earCrossRegionEvidenceIds,
    ])),
    earCrossRegionEvidenceIds: Object.freeze([...earCrossRegionEvidenceIds]),
    relationKeys: Object.freeze(unique([
      ...base.relationKeys,
      ...earRelationKeys,
    ])),
    combinationKeys: Object.freeze(unique([
      ...base.combinationKeys,
      ...earCombinationKeys,
    ])),
    earRelationKeys: Object.freeze(earRelationKeys),
    earCombinationKeys: Object.freeze(earCombinationKeys),
    favorableEvidenceIds: Object.freeze(favorableEvidenceIds),
    challengingEvidenceIds: Object.freeze(challengingEvidenceIds),
    mixedOrConditionalEvidenceIds: Object.freeze(mixedOrConditionalEvidenceIds),
    relationInferenceAuthorized: false as const,
    combinationInferenceAuthorized: false as const,
    sourcePriorityAuthorized: false as const,
    sourceCountWeightingAuthorized: false as const,
    reinforcementAuthorized: false as const,
    cancellationAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
    reason: status === 'source_conflict'
      ? '같은 얼굴 전체 질문 렌즈 안에서 서로 반대 방향의 직접 근거가 함께 존재한다. FR311J와 FR311M 어느 쪽도 우선하지 않고 점수·다수결·상쇄를 적용하지 않는다.'
      : selectedEar.length > 0
        ? 'FR311M에서 승인된 귀 교차부위 직접 근거를 정확한 relationKey/combinationKey 입력과 기존 FR311J 주제 렌즈가 동시에 일치할 때만 추가한다. FR311K 소유 근거는 기존 FR311J 경로에서 재사용하고 중복 생성하지 않는다.'
        : base.reason,
  });
}

export const FR311N_QUERY_AUTHORITY_BOUNDARY = Object.freeze({
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
  namedFormClassifierAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export const FR311N_QUERY_SUMMARY = Object.freeze({
  inheritedLensCount: FACE_EVIDENCE_LENSES_FR311J.length,
  earDirectEvidenceRecords: EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter(
    (item) => item.evidenceOwner === 'fr311m',
  ).length,
  reusedFR311KEvidenceRecords: EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter(
    (item) => item.evidenceOwner === 'fr311k',
  ).length,
  exactRelationKeyRequired: true as const,
  exactCombinationKeyRequired: true as const,
});

export function assertFaceEvidenceQueryFR311N(): void {
  if (FR311N_QUERY_SUMMARY.inheritedLensCount !== 21) {
    throw new Error('fr311n_requires_21_inherited_lenses');
  }
  if (FR311N_QUERY_SUMMARY.earDirectEvidenceRecords !== 22) {
    throw new Error(
      'fr311n_ear_owned_evidence_count_drift:' +
      FR311N_QUERY_SUMMARY.earDirectEvidenceRecords,
    );
  }
  if (FR311N_QUERY_SUMMARY.reusedFR311KEvidenceRecords !== 4) {
    throw new Error(
      'fr311n_fr311k_reuse_count_drift:' +
      FR311N_QUERY_SUMMARY.reusedFR311KEvidenceRecords,
    );
  }
  for (const [key, flag] of Object.entries(FR311N_QUERY_AUTHORITY_BOUNDARY)) {
    if (flag !== false) {
      throw new Error('fr311n_query_authority_widening:' + key);
    }
  }
}
