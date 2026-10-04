import {
  INTEGRATED_DIRECT_RULES_FR311C,
} from './traditional-eyebrow-eye-evidence-index-fr311c.js';
import {
  TRADITIONAL_MORPHOLOGY_TERMS_FR311,
} from './traditional-eyebrow-eye-interpretation-fr311.js';
import {
  DIRECT_CROSS_REGION_EVIDENCE_FR311E,
  participantSetSignatureFR311E,
  type CrossRegionParticipantFR311E,
} from './traditional-eyebrow-eye-cross-region-evidence-fr311e.js';

export type CombinationResolutionStatusFR311C =
  | 'direct_source_combination'
  | 'direct_source_relation'
  | 'named_form_context'
  | 'parallel_evidence_only'
  | 'unsupported';

export interface NamedFormContextLinkFR311C {
  readonly contextId: string;
  readonly formKey: string;
  readonly morphologyTermKey: string;
  readonly sourceExpression: string;
  readonly sourceRef: string;
  readonly semanticCombinationAuthorized: false;
}

export const NAMED_FORM_CONTEXT_LINKS_FR311C: readonly NamedFormContextLinkFR311C[] =
  Object.freeze([
    Object.freeze({
      contextId: 'fr311c.context.new_moon.eye_refined',
      formKey: 'eyebrow.named.new_moon',
      morphologyTermKey: 'eye.refined',
      sourceExpression: '眉清目秀最為良',
      sourceRef: 'witness.gujin473.art633.wikisource',
      semanticCombinationAuthorized: false as const,
    }),
    Object.freeze({
      contextId: 'fr311c.context.yellow_thin.eye_long',
      formKey: 'eyebrow.named.yellow_thin',
      morphologyTermKey: 'eye.long',
      sourceExpression: '眉短疏散目且長',
      sourceRef: 'witness.gujin473.art633.wikisource',
      semanticCombinationAuthorized: false as const,
    }),
    Object.freeze({
      contextId: 'fr311c.context.lion_eye.brow_coarse',
      formKey: 'eye.named.lion',
      morphologyTermKey: 'brow.coarse',
      sourceExpression: '眼大威嚴性略狂，粗眉趁此又端莊',
      sourceRef: 'witness.gujin473.art633.wikisource',
      semanticCombinationAuthorized: false as const,
    }),
    Object.freeze({
      contextId: 'fr311c.context.fuxi_eye.brow_dense',
      formKey: 'eye.named.fuxi',
      morphologyTermKey: 'brow.dense',
      sourceExpression: '頭圓眼大兩眉濃',
      sourceRef: 'witness.gujin473.art633.wikisource',
      semanticCombinationAuthorized: false as const,
    }),
  ]);

export interface CombinationResolutionQueryFR311C {
  readonly morphologyTermKeys?: readonly string[];
  readonly formKeys?: readonly string[];
  readonly relationKeys?: readonly string[];
  readonly allowedTopicKeys?: readonly string[];
}

export interface CombinationResolutionResultFR311C {
  readonly status: CombinationResolutionStatusFR311C;
  readonly matchedDirectRuleIds: readonly string[];
  readonly matchedContextIds: readonly string[];
  readonly evidencedMorphologyTermKeys: readonly string[];
  readonly evidencedRelationKeys: readonly string[];
  readonly synthesisAuthorized: false;
  readonly reinforcementInferenceAuthorized: false;
  readonly cancellationInferenceAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly reason: string;
}

function exactSetEquals(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const a = [...left].sort();
  const b = [...right].sort();
  return a.every((value, index) => value === b[index]);
}

function topicsAllowed(
  evidenceTopics: readonly string[],
  allowedTopicKeys: readonly string[] | undefined,
): boolean {
  if (allowedTopicKeys === undefined) return true;
  return evidenceTopics.some((topic) => allowedTopicKeys.includes(topic));
}

function selectedParticipants(query: CombinationResolutionQueryFR311C): CrossRegionParticipantFR311E[] {
  return [
    ...(query.morphologyTermKeys ?? []).map((key) => Object.freeze({ kind: 'morphology' as const, key })),
    ...(query.formKeys ?? []).map((key) => Object.freeze({ kind: 'named_form' as const, key })),
    ...(query.relationKeys ?? []).map((key) => Object.freeze({ kind: 'cross_region_relation' as const, key })),
  ];
}

export function resolveTraditionalCombinationFR311C(
  query: CombinationResolutionQueryFR311C,
): CombinationResolutionResultFR311C {
  const morphology = query.morphologyTermKeys ?? [];
  const forms = query.formKeys ?? [];
  const relations = query.relationKeys ?? [];
  const participants = selectedParticipants(query);
  const participantSignature = participantSetSignatureFR311E(participants);

  const expandedDirect = DIRECT_CROSS_REGION_EVIDENCE_FR311E.filter(
    (rule) =>
      participantSetSignatureFR311E(rule.participants) === participantSignature &&
      topicsAllowed(rule.topicKeys, query.allowedTopicKeys),
  );

  if (expandedDirect.length > 0) {
    const relationMatch = expandedDirect.every(
      (rule) => rule.evidenceType === 'direct_cross_region_relation',
    );
    return Object.freeze({
      status: relationMatch ? 'direct_source_relation' as const : 'direct_source_combination' as const,
      matchedDirectRuleIds: Object.freeze(expandedDirect.map((rule) => rule.ruleId)),
      matchedContextIds: Object.freeze([]),
      evidencedMorphologyTermKeys: Object.freeze([...morphology]),
      evidencedRelationKeys: Object.freeze([...relations]),
      synthesisAuthorized: false as const,
      reinforcementInferenceAuthorized: false as const,
      cancellationInferenceAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      reason: relationMatch
        ? '원문이 이 눈-눈썹 상대 관계 자체에 직접 의미를 부여한다. 독립 형태나 수치로부터 이 관계를 자동 추론하지 않는다.'
        : '원문이 이 정확한 눈·눈썹 조합을 하나의 규칙으로 직접 명시한다. 규칙 조회만 허용하며 추가 강화·상쇄 의미는 만들지 않는다.',
    });
  }

  const legacyDirect = INTEGRATED_DIRECT_RULES_FR311C.filter(
    (rule) =>
      rule.directness === 'direct_source_cross_region_combination' &&
      exactSetEquals(rule.morphologyTermKeys, morphology) &&
      topicsAllowed(rule.topicKeys, query.allowedTopicKeys),
  );

  if (legacyDirect.length > 0) {
    return Object.freeze({
      status: 'direct_source_combination' as const,
      matchedDirectRuleIds: Object.freeze(legacyDirect.map((rule) => rule.ruleId)),
      matchedContextIds: Object.freeze([]),
      evidencedMorphologyTermKeys: Object.freeze([...morphology]),
      evidencedRelationKeys: Object.freeze([]),
      synthesisAuthorized: false as const,
      reinforcementInferenceAuthorized: false as const,
      cancellationInferenceAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      reason: '원문이 이 정확한 눈·눈썹 형태 조합을 직접 하나의 규칙으로 명시한다. 규칙 조회만 허용하며 추가 강화·상쇄 의미는 만들지 않는다.',
    });
  }

  const contextMatches = NAMED_FORM_CONTEXT_LINKS_FR311C.filter(
    (link) => forms.includes(link.formKey) && morphology.includes(link.morphologyTermKey),
  );

  if (contextMatches.length > 0) {
    return Object.freeze({
      status: 'named_form_context' as const,
      matchedDirectRuleIds: Object.freeze([]),
      matchedContextIds: Object.freeze(contextMatches.map((link) => link.contextId)),
      evidencedMorphologyTermKeys: Object.freeze(
        contextMatches.map((link) => link.morphologyTermKey),
      ),
      evidencedRelationKeys: Object.freeze([]),
      synthesisAuthorized: false as const,
      reinforcementInferenceAuthorized: false as const,
      cancellationInferenceAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      reason: '해당 형태는 특정 전통 명명형의 원문 설명 안에서 동반 조건으로 직접 등장한다. 이를 일반적인 독립 조합 공식으로 확장하지 않는다.',
    });
  }

  const evidencedTerms = morphology.filter((termKey) =>
    INTEGRATED_DIRECT_RULES_FR311C.some((rule) => rule.morphologyTermKeys.includes(termKey)) ||
    DIRECT_CROSS_REGION_EVIDENCE_FR311E.some((rule) =>
      rule.participants.some((participant) =>
        participant.kind === 'morphology' && participant.key === termKey)),
  );

  if (morphology.length > 1 && evidencedTerms.length === morphology.length) {
    return Object.freeze({
      status: 'parallel_evidence_only' as const,
      matchedDirectRuleIds: Object.freeze([]),
      matchedContextIds: Object.freeze([]),
      evidencedMorphologyTermKeys: Object.freeze([...evidencedTerms]),
      evidencedRelationKeys: Object.freeze([]),
      synthesisAuthorized: false as const,
      reinforcementInferenceAuthorized: false as const,
      cancellationInferenceAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      reason: '각 형태는 기존 직접 규칙 안에서 근거가 있지만, 이 정확한 조합을 별도 의미로 묶은 직접 출전은 없다. 각각의 근거만 병렬로 제시하며 상대 관계로 자동 변환하지 않는다.',
    });
  }

  return Object.freeze({
    status: 'unsupported' as const,
    matchedDirectRuleIds: Object.freeze([]),
    matchedContextIds: Object.freeze([]),
    evidencedMorphologyTermKeys: Object.freeze([...evidencedTerms]),
    evidencedRelationKeys: Object.freeze([]),
    synthesisAuthorized: false as const,
    reinforcementInferenceAuthorized: false as const,
    cancellationInferenceAuthorized: false as const,
    relationInferenceAuthorized: false as const,
    reason: '현재 FR311 계보에서 이 조합을 뒷받침하는 직접 근거가 충분하지 않다. 새 의미나 부위 간 상대 관계를 생성하지 않는다.',
  });
}

export function assertCombinationResolverFR311C(): void {
  const knownTerms = new Set(TRADITIONAL_MORPHOLOGY_TERMS_FR311.map((term) => term.termKey));
  const ids = NAMED_FORM_CONTEXT_LINKS_FR311C.map((link) => link.contextId);
  if (new Set(ids).size !== ids.length) throw new Error('fr311c_duplicate_context_link');

  for (const link of NAMED_FORM_CONTEXT_LINKS_FR311C) {
    if (!knownTerms.has(link.morphologyTermKey)) {
      throw new Error(`fr311c_unknown_context_term:${link.morphologyTermKey}`);
    }
    if (link.semanticCombinationAuthorized !== false) {
      throw new Error(`fr311c_context_semantic_widening:${link.contextId}`);
    }
  }
}
