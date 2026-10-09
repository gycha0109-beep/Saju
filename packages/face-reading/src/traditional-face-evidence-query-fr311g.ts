import {
  EVIDENCE_LENSES_FR311C,
  type EvidenceLensKeyFR311C,
} from './traditional-face-topic-lenses-fr311c.js';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311G,
  FACE_NAMED_FORM_EVIDENCE_FR311G,
  type FaceNamedFormEvidenceFR311G,
} from './traditional-face-evidence-index-fr311g.js';
import {
  queryIntegratedTraditionalEvidenceFR311C,
  type IntegratedQueryStatusFR311C,
} from './traditional-eyebrow-eye-evidence-query-fr311c.js';
import {
  resolveTraditionalCombinationFR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';
import {
  resolveNoseCrossRegionEvidenceFR311H,
} from './traditional-nose-cross-region-evidence-fr311h.js';

export type FaceEvidenceLensKeyFR311G =
  | EvidenceLensKeyFR311C
  | 'longevity'
  | 'traditional_health'
  | 'legal_penalty'
  | 'household'
  | 'inheritance'
  | 'livelihood'
  | 'integrity_conduct';

export interface FaceEvidenceLensDefinitionFR311G {
  readonly lensKey: FaceEvidenceLensKeyFR311G;
  readonly topicKeys: readonly string[];
  readonly relationTargets: readonly string[];
  readonly ruleTopicKeys: readonly string[];
}

const NEW_LENSES_FR311G: readonly FaceEvidenceLensDefinitionFR311G[] = Object.freeze([
  Object.freeze({
    lensKey: 'longevity' as const,
    topicKeys: Object.freeze(['longevity']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['longevity']),
  }),
  Object.freeze({
    lensKey: 'traditional_health' as const,
    topicKeys: Object.freeze(['traditional_health']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['traditional_health']),
  }),
  Object.freeze({
    lensKey: 'legal_penalty' as const,
    topicKeys: Object.freeze(['legal_penalty']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['legal_penalty']),
  }),
  Object.freeze({
    lensKey: 'household' as const,
    topicKeys: Object.freeze(['household']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['household']),
  }),
  Object.freeze({
    lensKey: 'inheritance' as const,
    topicKeys: Object.freeze(['inheritance']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['inheritance']),
  }),
  Object.freeze({
    lensKey: 'livelihood' as const,
    topicKeys: Object.freeze(['labor_livelihood']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['labor_livelihood']),
  }),
  Object.freeze({
    lensKey: 'integrity_conduct' as const,
    topicKeys: Object.freeze(['integrity_trust', 'conduct_risk']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['integrity_trust', 'conduct_risk']),
  }),
]);

export const FACE_EVIDENCE_LENSES_FR311G: readonly FaceEvidenceLensDefinitionFR311G[] =
  Object.freeze([
    ...EVIDENCE_LENSES_FR311C.map((lens) => Object.freeze({
      lensKey: lens.lensKey,
      topicKeys: Object.freeze([...lens.topicKeys]),
      relationTargets: Object.freeze([...lens.relationTargets]),
      ruleTopicKeys: Object.freeze(
        lens.lensKey === 'career'
          ? unique([...lens.ruleTopicKeys, 'reputation'])
          : [...lens.ruleTopicKeys],
      ),
    })),
    ...NEW_LENSES_FR311G,
  ]);

export type FaceEvidenceQueryStatusFR311G =
  | IntegratedQueryStatusFR311C
  | 'source_conflict';

export interface FaceEvidenceQueryFR311G {
  readonly lensKey: FaceEvidenceLensKeyFR311G;
  readonly formKeys?: readonly string[];
  readonly morphologyTermKeys?: readonly string[];
  readonly relationKeys?: readonly string[];
  readonly crossRegionFeatureKeys?: readonly string[];
  readonly traditionalRuleIds?: readonly string[];
}

export interface FaceEvidenceQueryResultFR311G {
  readonly lensKey: FaceEvidenceLensKeyFR311G;
  readonly status: FaceEvidenceQueryStatusFR311G;
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
  readonly reason: string;
}

function findLens(lensKey: FaceEvidenceLensKeyFR311G): FaceEvidenceLensDefinitionFR311G {
  const lens = FACE_EVIDENCE_LENSES_FR311G.find((candidate) => candidate.lensKey === lensKey);
  if (lens === undefined) throw new Error(`fr311g_unknown_lens:${lensKey}`);
  return lens;
}

function isLegacyLens(lensKey: FaceEvidenceLensKeyFR311G): lensKey is EvidenceLensKeyFR311C {
  return EVIDENCE_LENSES_FR311C.some((lens) => lens.lensKey === lensKey);
}

function namedClaimMatches(
  claim: FaceNamedFormEvidenceFR311G,
  lens: FaceEvidenceLensDefinitionFR311G,
): boolean {
  return lens.topicKeys.includes(claim.topicKey) ||
    lens.relationTargets.includes(claim.relationTarget);
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function queryFaceEvidenceFR311G(
  query: FaceEvidenceQueryFR311G,
): FaceEvidenceQueryResultFR311G {
  const lens = findLens(query.lensKey);
  const formSet = query.formKeys === undefined ? null : new Set(query.formKeys);
  const selectedNamed = FACE_NAMED_FORM_EVIDENCE_FR311G.filter(
    (claim) =>
      formSet !== null &&
      formSet.has(claim.formKey) &&
      namedClaimMatches(claim, lens),
  );

  const requestedRuleIds = new Set(query.traditionalRuleIds ?? []);
  const selectedExplicitRules = FACE_DIRECT_RULE_EVIDENCE_FR311G.filter(
    (rule) =>
      requestedRuleIds.has(rule.ruleId) &&
      rule.topicKeys.some((topic) => lens.ruleTopicKeys.includes(topic)),
  );

  let legacyStatus: IntegratedQueryStatusFR311C = 'no_evidence';
  let legacyDirectRuleIds: readonly string[] = [];

  if (isLegacyLens(query.lensKey)) {
    const legacy = queryIntegratedTraditionalEvidenceFR311C({
      lensKey: query.lensKey,
      ...(query.formKeys === undefined ? {} : { formKeys: query.formKeys }),
      ...(query.morphologyTermKeys === undefined ? {} : { morphologyTermKeys: query.morphologyTermKeys }),
      ...(query.relationKeys === undefined ? {} : { relationKeys: query.relationKeys }),
    });
    legacyStatus = legacy.status;
    legacyDirectRuleIds = legacy.directRuleIds;
  }

  const combination = resolveTraditionalCombinationFR311C({
    ...(query.formKeys === undefined ? {} : { formKeys: query.formKeys }),
    ...(query.morphologyTermKeys === undefined ? {} : { morphologyTermKeys: query.morphologyTermKeys }),
    ...(query.relationKeys === undefined ? {} : { relationKeys: query.relationKeys }),
    allowedTopicKeys: unique([...lens.topicKeys, ...lens.ruleTopicKeys]),
  });

  const noseCrossRegion = resolveNoseCrossRegionEvidenceFR311H({
    ...(query.formKeys === undefined ? {} : { formKeys: query.formKeys }),
    ...(query.relationKeys === undefined ? {} : { relationKeys: query.relationKeys }),
    ...(query.crossRegionFeatureKeys === undefined
      ? {}
      : { crossRegionFeatureKeys: query.crossRegionFeatureKeys }),
    allowedTopicKeys: unique([...lens.topicKeys, ...lens.ruleTopicKeys]),
  });

  const directRuleIds = unique([
    ...legacyDirectRuleIds,
    ...selectedExplicitRules.map((rule) => rule.ruleId),
    ...noseCrossRegion.matchedDirectRuleIds,
  ]);
  const selectedDirectRules = FACE_DIRECT_RULE_EVIDENCE_FR311G.filter(
    (rule) => directRuleIds.includes(rule.ruleId),
  );
  const clearNamed = selectedNamed.filter((claim) => claim.certainty === 'direct_clear');
  const uncertainNamed = selectedNamed.filter((claim) => claim.certainty === 'phrase_uncertain');

  const favorableEvidenceIds = [
    ...clearNamed
      .filter((claim) => claim.polarity === 'favorable')
      .map((claim) => claim.evidenceId),
    ...selectedDirectRules
      .filter((rule) => rule.polarity === 'favorable')
      .map((rule) => rule.evidenceId),
  ];
  const challengingEvidenceIds = [
    ...clearNamed
      .filter((claim) => claim.polarity === 'challenging')
      .map((claim) => claim.evidenceId),
    ...selectedDirectRules
      .filter((rule) => rule.polarity === 'challenging')
      .map((rule) => rule.evidenceId),
  ];
  const mixedOrConditionalEvidenceIds = [
    ...clearNamed
      .filter((claim) =>
        claim.polarity === 'mixed' ||
        claim.polarity === 'conditional' ||
        claim.polarity === 'neutral')
      .map((claim) => claim.evidenceId),
    ...selectedDirectRules
      .filter((rule) =>
        rule.polarity === 'mixed' ||
        rule.polarity === 'conditional' ||
        rule.polarity === 'neutral')
      .map((rule) => rule.evidenceId),
  ];

  const hasConflict =
    favorableEvidenceIds.length > 0 &&
    challengingEvidenceIds.length > 0;

  const hasSemanticEvidence =
    selectedNamed.length > 0 ||
    directRuleIds.length > 0 ||
    combination.matchedDirectRuleIds.length > 0;

  const hasEvidence =
    hasSemanticEvidence ||
    combination.matchedContextIds.length > 0 ||
    noseCrossRegion.matchedContextIds.length > 0;

  let status: FaceEvidenceQueryStatusFR311G;
  if (hasConflict || legacyStatus === 'source_conflict') {
    status = 'source_conflict';
  } else if (noseCrossRegion.status === 'direct_source_relation') {
    status = 'direct_source_relation';
  } else if (
    combination.status === 'direct_source_combination' ||
    combination.status === 'direct_source_relation' ||
    combination.status === 'named_form_context' ||
    combination.status === 'parallel_evidence_only'
  ) {
    status = combination.status;
  } else if (
    noseCrossRegion.status === 'named_form_context' &&
    hasSemanticEvidence
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
    namedEvidenceIds: Object.freeze(selectedNamed.map((claim) => claim.evidenceId)),
    directRuleIds: Object.freeze(directRuleIds),
    combinationRuleIds: Object.freeze([...combination.matchedDirectRuleIds]),
    namedFormContextIds: Object.freeze(unique([
      ...combination.matchedContextIds,
      ...noseCrossRegion.matchedContextIds,
    ])),
    relationKeys: Object.freeze(unique([...(query.relationKeys ?? [])])),
    favorableEvidenceIds: Object.freeze(unique(favorableEvidenceIds)),
    challengingEvidenceIds: Object.freeze(unique(challengingEvidenceIds)),
    mixedOrConditionalEvidenceIds: Object.freeze(unique(mixedOrConditionalEvidenceIds)),
    uncertainEvidenceIds: Object.freeze(uncertainNamed.map((claim) => claim.evidenceId)),
    aggregateJudgementAuthorized: false as const,
    scoreAuthorized: false as const,
    synthesisAuthorized: false as const,
    traditionalRuleInferenceAuthorized: false as const,
    reason: status === 'source_conflict'
      ? '같은 질문 주제에 favorable와 challenging 직접 근거가 함께 존재한다. 어느 하나를 우선하거나 평균내지 않는다.'
      : status === 'no_evidence'
        ? hasEvidence
          ? '명명형 내부의 동반 문맥은 확인되지만 이 질문 주제의 직접 의미 근거는 없다. context를 의미 근거로 일반화하지 않는다.'
          : '선택된 명명형·직접 규칙에서 이 질문 주제의 근거를 확인하지 못했다. 다른 주제의 의미로 빈칸을 채우지 않는다.'
        : '확인된 직접 근거만 반환하며 점수화·강화·상쇄·주제 간 의미 변환은 하지 않는다.',
  });
}

export function assertFaceEvidenceLensesFR311G(): void {
  const keys = FACE_EVIDENCE_LENSES_FR311G.map((lens) => lens.lensKey);
  if (new Set(keys).size !== keys.length) {
    throw new Error('fr311g_duplicate_lens');
  }
  if (FACE_EVIDENCE_LENSES_FR311G.length !== 16) {
    throw new Error(`fr311g_lens_count_drift:${FACE_EVIDENCE_LENSES_FR311G.length}`);
  }

  for (const lens of FACE_EVIDENCE_LENSES_FR311G) {
    if (lens.topicKeys.length === 0 &&
        lens.relationTargets.length === 0 &&
        lens.ruleTopicKeys.length === 0) {
      throw new Error(`fr311g_empty_lens:${lens.lensKey}`);
    }
  }
}
