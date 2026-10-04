import {
  INTEGRATED_DIRECT_RULES_FR311C,
  INTEGRATED_NAMED_FORM_EVIDENCE_FR311C,
  type IntegratedNamedFormClaimFR311C,
} from './traditional-eyebrow-eye-evidence-index-fr311c.js';

export type EvidenceLensKeyFR311C =
  | 'inbok'
  | 'interpersonal_relations'
  | 'wealth'
  | 'spouse'
  | 'siblings'
  | 'patron'
  | 'career'
  | 'children';

export type EvidenceConflictStateFR311C =
  | 'no_evidence'
  | 'single_direction_or_nonbinary'
  | 'source_conflict';

interface EvidenceLensDefinitionFR311C {
  readonly lensKey: EvidenceLensKeyFR311C;
  readonly topicKeys: readonly string[];
  readonly relationTargets: readonly string[];
  readonly ruleTopicKeys: readonly string[];
}

export const EVIDENCE_LENSES_FR311C: readonly EvidenceLensDefinitionFR311C[] = Object.freeze([
  Object.freeze({
    lensKey: 'inbok' as const,
    topicKeys: Object.freeze([
      'siblings',
      'parents',
      'spouse_relationship',
      'children_family',
      'kinship',
      'friendship',
      'interpersonal_relations',
      'patron_support',
      'filial_support',
    ]),
    relationTargets: Object.freeze([
      'parents',
      'father',
      'mother',
      'siblings',
      'spouse',
      'children',
      'descendants',
      'kin',
      'friends',
      'patron',
    ]),
    ruleTopicKeys: Object.freeze([
      'siblings',
      'spouse_relationship',
      'children_family',
      'interpersonal_relations',
    ]),
  }),
  Object.freeze({
    lensKey: 'interpersonal_relations' as const,
    topicKeys: Object.freeze(['friendship', 'interpersonal_relations', 'patron_support', 'kinship']),
    relationTargets: Object.freeze(['friends', 'patron', 'kin']),
    ruleTopicKeys: Object.freeze(['interpersonal_relations']),
  }),
  Object.freeze({
    lensKey: 'wealth' as const,
    topicKeys: Object.freeze(['wealth']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['wealth']),
  }),
  Object.freeze({
    lensKey: 'spouse' as const,
    topicKeys: Object.freeze(['spouse_relationship']),
    relationTargets: Object.freeze(['spouse']),
    ruleTopicKeys: Object.freeze(['spouse_relationship']),
  }),
  Object.freeze({
    lensKey: 'siblings' as const,
    topicKeys: Object.freeze(['siblings']),
    relationTargets: Object.freeze(['siblings']),
    ruleTopicKeys: Object.freeze(['siblings']),
  }),
  Object.freeze({
    lensKey: 'patron' as const,
    topicKeys: Object.freeze(['patron_support']),
    relationTargets: Object.freeze(['patron']),
    ruleTopicKeys: Object.freeze([]),
  }),
  Object.freeze({
    lensKey: 'career' as const,
    topicKeys: Object.freeze(['status', 'career_reputation', 'reputation']),
    relationTargets: Object.freeze([]),
    ruleTopicKeys: Object.freeze(['status', 'career_reputation']),
  }),
  Object.freeze({
    lensKey: 'children' as const,
    topicKeys: Object.freeze(['children_family']),
    relationTargets: Object.freeze(['children', 'descendants']),
    ruleTopicKeys: Object.freeze(['children_family']),
  }),
]);

export interface EvidenceLensQueryFR311C {
  readonly lensKey: EvidenceLensKeyFR311C;
  readonly formKeys?: readonly string[];
  readonly morphologyTermKeys?: readonly string[];
}

export interface EvidenceLensResultFR311C {
  readonly lensKey: EvidenceLensKeyFR311C;
  readonly namedEvidenceIds: readonly string[];
  readonly directRuleIds: readonly string[];
  readonly directClearNamedEvidenceIds: readonly string[];
  readonly uncertainNamedEvidenceIds: readonly string[];
  readonly conflictState: EvidenceConflictStateFR311C;
  readonly favorableEvidenceIds: readonly string[];
  readonly challengingEvidenceIds: readonly string[];
  readonly aggregateJudgementAuthorized: false;
  readonly scoreAuthorized: false;
  readonly sourcePriorityAuthorized: false;
  readonly reason: string;
}

function findLens(lensKey: EvidenceLensKeyFR311C): EvidenceLensDefinitionFR311C {
  const lens = EVIDENCE_LENSES_FR311C.find((candidate) => candidate.lensKey === lensKey);
  if (lens === undefined) throw new Error(`fr311c_unknown_lens:${lensKey}`);
  return lens;
}

function claimMatchesLens(
  claim: IntegratedNamedFormClaimFR311C,
  lens: EvidenceLensDefinitionFR311C,
): boolean {
  return lens.topicKeys.includes(claim.topicKey) || lens.relationTargets.includes(claim.relationTarget);
}

function morphologySelectionMatchesRule(
  selected: readonly string[] | undefined,
  ruleTerms: readonly string[],
): boolean {
  if (selected === undefined || selected.length === 0) return true;
  const selectedSet = new Set(selected);
  return ruleTerms.every((term) => selectedSet.has(term));
}

export function queryEvidenceLensFR311C(query: EvidenceLensQueryFR311C): EvidenceLensResultFR311C {
  const lens = findLens(query.lensKey);
  const formSet = query.formKeys === undefined ? null : new Set(query.formKeys);

  const named = INTEGRATED_NAMED_FORM_EVIDENCE_FR311C.filter(
    (claim) =>
      (formSet === null || formSet.has(claim.formKey)) &&
      claimMatchesLens(claim, lens),
  );

  const rules = INTEGRATED_DIRECT_RULES_FR311C.filter(
    (rule) =>
      rule.topicKeys.some((topic) => lens.ruleTopicKeys.includes(topic)) &&
      morphologySelectionMatchesRule(query.morphologyTermKeys, rule.morphologyTermKeys),
  );

  const directClear = named.filter((claim) => claim.certainty === 'direct_clear');
  const uncertain = named.filter((claim) => claim.certainty === 'phrase_uncertain');
  const favorable = directClear.filter((claim) => claim.polarity === 'favorable');
  const challenging = directClear.filter((claim) => claim.polarity === 'challenging');

  const conflictState: EvidenceConflictStateFR311C =
    named.length === 0 && rules.length === 0
      ? 'no_evidence'
      : favorable.length > 0 && challenging.length > 0
        ? 'source_conflict'
        : 'single_direction_or_nonbinary';

  return Object.freeze({
    lensKey: query.lensKey,
    namedEvidenceIds: Object.freeze(named.map((claim) => claim.evidenceId)),
    directRuleIds: Object.freeze(rules.map((rule) => rule.ruleId)),
    directClearNamedEvidenceIds: Object.freeze(directClear.map((claim) => claim.evidenceId)),
    uncertainNamedEvidenceIds: Object.freeze(uncertain.map((claim) => claim.evidenceId)),
    conflictState,
    favorableEvidenceIds: Object.freeze(favorable.map((claim) => claim.evidenceId)),
    challengingEvidenceIds: Object.freeze(challenging.map((claim) => claim.evidenceId)),
    aggregateJudgementAuthorized: false as const,
    scoreAuthorized: false as const,
    sourcePriorityAuthorized: false as const,
    reason: conflictState === 'source_conflict'
      ? '같은 질의 주제에 긍정·부정 직접 근거가 함께 존재한다. 어느 쪽을 우선하거나 평균내지 않는다.'
      : conflictState === 'no_evidence'
        ? '선택된 형태/명명형에서 이 주제의 직접 근거를 찾지 못했다. 다른 주제의 의미를 변환하지 않는다.'
        : '직접 근거를 반환하되 점수화·강화·상쇄·단일 길흉 판정은 하지 않는다.',
  });
}

export function assertEvidenceLensesFR311C(): void {
  const keys = EVIDENCE_LENSES_FR311C.map((lens) => lens.lensKey);
  if (new Set(keys).size !== keys.length) throw new Error('fr311c_duplicate_lens');

  for (const lens of EVIDENCE_LENSES_FR311C) {
    if (lens.topicKeys.length === 0 && lens.relationTargets.length === 0 && lens.ruleTopicKeys.length === 0) {
      throw new Error(`fr311c_empty_lens:${lens.lensKey}`);
    }
  }
}
