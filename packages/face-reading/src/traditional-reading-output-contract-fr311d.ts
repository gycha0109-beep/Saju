import {
  INTEGRATED_DIRECT_RULES_FR311C,
  INTEGRATED_NAMED_FORM_EVIDENCE_FR311C,
  type IntegratedEvidencePolarityFR311C,
} from './traditional-eyebrow-eye-evidence-index-fr311c.js';
import {
  NAMED_FORM_CONTEXT_LINKS_FR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';
import {
  queryIntegratedTraditionalEvidenceFR311C,
  type IntegratedTraditionalEvidenceQueryFR311C,
  type IntegratedQueryStatusFR311C,
} from './traditional-eyebrow-eye-evidence-query-fr311c.js';
import {
  type EvidenceLensKeyFR311C,
} from './traditional-face-topic-lenses-fr311c.js';
import {
  DIRECT_CROSS_REGION_EVIDENCE_FR311E,
} from './traditional-eyebrow-eye-cross-region-evidence-fr311e.js';

export type ReadingOutputStatusFR311D =
  | 'conflict'
  | 'direct_combination'
  | 'direct_relation'
  | 'named_form_context'
  | 'parallel_evidence'
  | 'evidence'
  | 'no_direct_evidence';

export type ReadingEvidenceKindFR311D =
  | 'named_form_claim'
  | 'direct_rule'
  | 'cross_region_rule'
  | 'named_form_context';

export type ReadingEvidenceCertaintyFR311D =
  | 'direct_clear'
  | 'phrase_uncertain'
  | 'direct_rule'
  | 'context_only';

export interface ReadingEvidenceItemFR311D {
  readonly evidenceId: string;
  readonly kind: ReadingEvidenceKindFR311D;
  readonly label: string;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKey: string | null;
  readonly relationTarget: string | null;
  readonly lifeStage: string | null;
  readonly polarity: IntegratedEvidencePolarityFR311C | null;
  readonly certainty: ReadingEvidenceCertaintyFR311D;
  readonly sourceRefs: readonly string[];
  readonly combinationSemanticAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly productPredictionAuthorized: false;
}

export interface ReadingEvidenceSectionsFR311D {
  readonly favorable: readonly ReadingEvidenceItemFR311D[];
  readonly challenging: readonly ReadingEvidenceItemFR311D[];
  readonly mixedOrConditional: readonly ReadingEvidenceItemFR311D[];
  readonly uncertain: readonly ReadingEvidenceItemFR311D[];
  readonly directRules: readonly ReadingEvidenceItemFR311D[];
  readonly contextOnly: readonly ReadingEvidenceItemFR311D[];
}

export interface ReadingCombinationAssessmentFR311D {
  readonly sourceStatus:
    | 'direct_source_combination'
    | 'direct_source_relation'
    | 'named_form_context'
    | 'parallel_evidence_only'
    | 'unsupported';
  readonly statement: string;
  readonly directCombinationRuleIds: readonly string[];
  readonly contextIds: readonly string[];
  readonly relationKeys: readonly string[];
  readonly reinforcementAuthorized: false;
  readonly cancellationAuthorized: false;
}

export interface TraditionalReadingOutputFR311D {
  readonly contractVersion: 'fr311d-v1';
  readonly lensKey: EvidenceLensKeyFR311C;
  readonly outputStatus: ReadingOutputStatusFR311D;
  readonly headline: string;
  readonly evidenceSections: ReadingEvidenceSectionsFR311D;
  readonly combinationAssessment: ReadingCombinationAssessmentFR311D;
  readonly sourceRefs: readonly string[];
  readonly limitations: readonly string[];
  readonly doctrineNotice: '전통 관상 문헌에 기록된 해석을 정리한 것이며 현대 과학·심리·의학적 사실이나 실제 미래 예측을 뜻하지 않는다.';
  readonly scoreAuthorized: false;
  readonly aggregateGoodBadJudgementAuthorized: false;
  readonly unsupportedSynthesisAuthorized: false;
  readonly sourcePriorityInferenceAuthorized: false;
  readonly productPredictionAuthorized: false;
}

const LENS_LABELS: Readonly<Record<EvidenceLensKeyFR311C, string>> = Object.freeze({
  inbok: '인복·관계',
  interpersonal_relations: '대인관계',
  wealth: '재물',
  spouse: '부부·배우자',
  siblings: '형제',
  patron: '귀인·지원',
  career: '관직·출세',
  children: '자녀·후손',
});

function mapOutputStatus(status: IntegratedQueryStatusFR311C): ReadingOutputStatusFR311D {
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

function namedClaimToItem(evidenceId: string): ReadingEvidenceItemFR311D {
  const claim = INTEGRATED_NAMED_FORM_EVIDENCE_FR311C.find((candidate) => candidate.evidenceId === evidenceId);
  if (claim === undefined) throw new Error(`fr311d_missing_named_evidence:${evidenceId}`);

  return Object.freeze({
    evidenceId: claim.evidenceId,
    kind: 'named_form_claim' as const,
    label: claim.traditionalLabel,
    sourceExpression: claim.sourceFragment,
    meaningSummary: claim.meaningSummary,
    topicKey: claim.topicKey,
    relationTarget: claim.relationTarget,
    lifeStage: claim.lifeStage,
    polarity: claim.polarity,
    certainty: claim.certainty,
    sourceRefs: Object.freeze([...claim.sourceRefs]),
    combinationSemanticAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

function directRuleToItem(ruleId: string): ReadingEvidenceItemFR311D {
  const rule = INTEGRATED_DIRECT_RULES_FR311C.find((candidate) => candidate.ruleId === ruleId);
  if (rule !== undefined) {
    return Object.freeze({
      evidenceId: rule.evidenceId,
      kind: 'direct_rule' as const,
      label: rule.regionScope,
      sourceExpression: rule.sourceExpression,
      meaningSummary: rule.traditionalMeaningSummary,
      topicKey: rule.topicKeys.length === 1 ? rule.topicKeys[0] ?? null : null,
      relationTarget: null,
      lifeStage: null,
      polarity: null,
      certainty: 'direct_rule' as const,
      sourceRefs: Object.freeze([...rule.sourceRefs]),
      combinationSemanticAuthorized: false as const,
      modernScientificFactAuthorized: false as const,
      productPredictionAuthorized: false as const,
    });
  }

  const crossRegion = DIRECT_CROSS_REGION_EVIDENCE_FR311E.find(
    (candidate) => candidate.ruleId === ruleId,
  );
  if (crossRegion === undefined) throw new Error(`fr311d_missing_direct_rule:${ruleId}`);

  return Object.freeze({
    evidenceId: `fr311d.cross.${crossRegion.ruleId}`,
    kind: 'cross_region_rule' as const,
    label: crossRegion.evidenceType,
    sourceExpression: crossRegion.sourceExpression,
    meaningSummary: crossRegion.traditionalMeaningSummary,
    topicKey: crossRegion.topicKeys.length === 1 ? crossRegion.topicKeys[0] ?? null : null,
    relationTarget: null,
    lifeStage: null,
    polarity: null,
    certainty: 'direct_rule' as const,
    sourceRefs: Object.freeze([...crossRegion.sourceRefs]),
    combinationSemanticAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

function contextToItem(contextId: string): ReadingEvidenceItemFR311D {
  const context = NAMED_FORM_CONTEXT_LINKS_FR311C.find((candidate) => candidate.contextId === contextId);
  if (context === undefined) throw new Error(`fr311d_missing_context:${contextId}`);

  return Object.freeze({
    evidenceId: context.contextId,
    kind: 'named_form_context' as const,
    label: context.formKey,
    sourceExpression: context.sourceExpression,
    meaningSummary: '특정 전통 명명형의 원문 설명 안에서 함께 등장하는 문맥 조건이다. 독립적인 일반 조합 해석으로 확장하지 않는다.',
    topicKey: null,
    relationTarget: null,
    lifeStage: null,
    polarity: null,
    certainty: 'context_only' as const,
    sourceRefs: Object.freeze([context.sourceRef]),
    combinationSemanticAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

function unique<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}

function headlineFor(status: ReadingOutputStatusFR311D, lensKey: EvidenceLensKeyFR311C): string {
  const label = LENS_LABELS[lensKey];
  switch (status) {
    case 'conflict':
      return `${label}에 관한 직접 근거가 서로 다른 방향을 가리킨다.`;
    case 'direct_combination':
      return `${label}에 관한 문헌의 직접 조합 근거가 있다.`;
    case 'direct_relation':
      return `${label}에 관한 눈·눈썹 상대 관계의 직접 문헌 근거가 있다.`;
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

function combinationStatement(status: IntegratedQueryStatusFR311C): ReadingCombinationAssessmentFR311D['statement'] {
  switch (status) {
    case 'direct_source_combination':
      return '문헌이 이 정확한 특징 조합을 하나의 규칙으로 직접 다룬다. 그 원문 의미만 제시하며 추가 강화·상쇄는 만들지 않는다.';
    case 'direct_source_relation':
      return '문헌이 눈과 눈썹의 이 상대 관계 자체에 직접 의미를 부여한다. 독립 특징이나 수치에서 이 관계를 자동 추론하지 않는다.';
    case 'named_form_context':
      return '특정 명명형 설명 안에서 해당 특징이 동반 조건으로 등장한다. 이를 모든 얼굴에 적용되는 독립 조합 공식으로 일반화하지 않는다.';
    case 'parallel_evidence_only':
      return '각 특징에 관한 근거는 존재하지만 이 정확한 조합을 별도 의미로 풀이한 직접 근거는 확인되지 않는다.';
    case 'source_conflict':
    case 'evidence_only':
    case 'no_evidence':
    case 'unsupported':
      return '이 질의에서 별도의 직접 조합 의미는 확인되지 않는다. 확인된 개별 근거만 제시한다.';
  }
}

function combinationStatusFor(status: IntegratedQueryStatusFR311C): ReadingCombinationAssessmentFR311D['sourceStatus'] {
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

export function buildTraditionalReadingOutputFR311D(
  query: IntegratedTraditionalEvidenceQueryFR311C,
): TraditionalReadingOutputFR311D {
  const result = queryIntegratedTraditionalEvidenceFR311C(query);
  const namedItems = result.namedEvidenceIds.map(namedClaimToItem);
  const uncertainSet = new Set(result.uncertainEvidenceIds);

  const clearNamed = namedItems.filter((item) => !uncertainSet.has(item.evidenceId));
  const uncertain = namedItems.filter((item) => uncertainSet.has(item.evidenceId));
  const favorable = clearNamed.filter((item) => item.polarity === 'favorable');
  const challenging = clearNamed.filter((item) => item.polarity === 'challenging');
  const mixedOrConditional = clearNamed.filter(
    (item) =>
      item.polarity === 'mixed' ||
      item.polarity === 'conditional' ||
      item.polarity === 'neutral',
  );

  const directRuleIds = unique([...result.directRuleIds, ...result.combinationRuleIds]);
  const directRules = directRuleIds.map(directRuleToItem);
  const contextOnly = result.namedFormContextIds.map(contextToItem);

  const sourceRefs = unique([
    ...namedItems.flatMap((item) => item.sourceRefs),
    ...directRules.flatMap((item) => item.sourceRefs),
    ...contextOnly.flatMap((item) => item.sourceRefs),
  ]);

  const outputStatus = mapOutputStatus(result.status);
  const limitations: string[] = [
    '점수, 다수결, 강화·상쇄 계산으로 하나의 길흉 결론을 만들지 않는다.',
    '직접 근거가 없는 조합 의미는 생성하지 않는다.',
    '전통 명명형을 현대 사진 형태와 자동 동일시하지 않는다.',
  ];
  if (outputStatus === 'conflict') {
    limitations.push('긍정·부정 근거가 함께 있어 어느 한쪽을 우선하지 않는다.');
  }
  if (uncertain.length > 0) {
    limitations.push('일부 근거는 전사 문구가 불확실하므로 확정 근거와 분리해 읽어야 한다.');
  }
  if (outputStatus === 'no_direct_evidence') {
    limitations.push('다른 주제의 의미를 가져와 현재 질문의 빈칸을 채우지 않는다.');
  }

  return Object.freeze({
    contractVersion: 'fr311d-v1' as const,
    lensKey: query.lensKey,
    outputStatus,
    headline: headlineFor(outputStatus, query.lensKey),
    evidenceSections: Object.freeze({
      favorable: Object.freeze(favorable),
      challenging: Object.freeze(challenging),
      mixedOrConditional: Object.freeze(mixedOrConditional),
      uncertain: Object.freeze(uncertain),
      directRules: Object.freeze(directRules),
      contextOnly: Object.freeze(contextOnly),
    }),
    combinationAssessment: Object.freeze({
      sourceStatus: combinationStatusFor(result.status),
      statement: combinationStatement(result.status),
      directCombinationRuleIds: Object.freeze([...result.combinationRuleIds]),
      contextIds: Object.freeze([...result.namedFormContextIds]),
      relationKeys: Object.freeze([...result.relationKeys]),
      reinforcementAuthorized: false as const,
      cancellationAuthorized: false as const,
    }),
    sourceRefs: Object.freeze(sourceRefs),
    limitations: Object.freeze(limitations),
    doctrineNotice: '전통 관상 문헌에 기록된 해석을 정리한 것이며 현대 과학·심리·의학적 사실이나 실제 미래 예측을 뜻하지 않는다.' as const,
    scoreAuthorized: false as const,
    aggregateGoodBadJudgementAuthorized: false as const,
    unsupportedSynthesisAuthorized: false as const,
    sourcePriorityInferenceAuthorized: false as const,
    productPredictionAuthorized: false as const,
  });
}

export const FR311D_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  reinforcementInferenceAuthorized: false as const,
  cancellationInferenceAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productPredictionAuthorized: false as const,
});

export function assertTraditionalReadingOutputContractFR311D(): void {
  for (const [key, flag] of Object.entries(FR311D_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311d_authority_boundary_widening:${key}`);
  }

  const noEvidence = buildTraditionalReadingOutputFR311D({
    lensKey: 'inbok',
    formKeys: ['eye.named.dragon'],
  });
  if (noEvidence.outputStatus !== 'no_direct_evidence') {
    throw new Error('fr311d_no_evidence_contract_drift');
  }
  if (noEvidence.evidenceSections.favorable.length !== 0 ||
      noEvidence.evidenceSections.challenging.length !== 0) {
    throw new Error('fr311d_no_evidence_must_not_fill_gap');
  }
}
