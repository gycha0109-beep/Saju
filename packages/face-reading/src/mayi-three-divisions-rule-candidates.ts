import type { FaceAuthorityRegistry, FaceRuleDefinition, SourcePassage } from './contracts.js';
import {
  FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY,
  MAYI_THREE_DIVISIONS_REVIEWED_SUCCESSOR,
} from './mayi-three-divisions-reviewed-methodology.js';
import { evaluateRegisteredFaceRule } from './rule-evaluation.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

export const MAYI_CANDIDATE_METHOD_REF = `${MAYI_THREE_DIVISIONS_REVIEWED_SUCCESSOR.methodologyId}@${MAYI_THREE_DIVISIONS_REVIEWED_SUCCESSOR.version}`;

/** New research transcription, not an expansion of the owner's methodology approval.
 * Same NLC 1925 witness as FR261; PDF page 36 (printed 23), rightmost two columns.
 * Visually checked against the actual scan, not copied from Shenxiang wording.
 */
export const MAYI_SANTING_INTERPRETATION_CANDIDATE_SOURCE: SourcePassage = Object.freeze({
  passageId: 'passage.mayi.nlc1925.santing.interpretation_candidate',
  witnessId: 'witness.mayi_xiangfa.nlc_1925_v1',
  volume: '卷一',
  chapter: '六府三才三停',
  scanPage: 36,
  printedPage: '二三',
  originalText: '訣曰上停長老吉昌中停長近君王下停長少吉祥三停平等富貴榮顯三停不均孤夭賤貧',
  normalizedText:
    '訣曰：上停長，老吉昌；中停長，近君王；下停長，少吉祥。三停平等，富貴榮顯；三停不均，孤夭賤貧。標點為研究整理，不屬原版。',
  verificationStatus: 'scan_checked',
});

const OP = 'op.mayi.santing.explicit_qualitative_text_assertion';
const PACK_ID = 'pack.mayi.santing.text_candidates';
export const MAYI_CANDIDATE_PACK_REF = `${PACK_ID}@0.1.0`;
const TERMS = [
  {
    key: 'upper_long',
    condition: '上停長',
    result: '老吉昌',
    gloss: '전통 문헌은 상정이 길다는 조건에 노년의 길함을 연결한다.',
    semanticKey: 'candidate.mayi.upper_long.old_auspicious',
    disposition: 'favorable',
  },
  {
    key: 'middle_long',
    condition: '中停長',
    result: '近君王',
    gloss: '전통 문헌은 중정이 길다는 조건에 군왕과 가까움을 연결한다.',
    semanticKey: 'candidate.mayi.middle_long.near_ruler',
    disposition: 'favorable',
  },
  {
    key: 'lower_long',
    condition: '下停長',
    result: '少吉祥',
    gloss: '전통 문헌은 하정이 길다는 조건에 젊은 시기의 길함을 연결한다.',
    semanticKey: 'candidate.mayi.lower_long.young_auspicious',
    disposition: 'favorable',
  },
  {
    key: 'qualitatively_balanced',
    condition: '三停平等',
    result: '富貴榮顯',
    gloss: '전통 문헌은 삼정이 고르다는 조건에 부귀와 영현을 연결한다.',
    semanticKey: 'candidate.mayi.balanced.wealth_honor_text',
    disposition: 'favorable',
  },
  {
    key: 'qualitatively_uneven',
    condition: '三停不均',
    result: '孤夭賤貧',
    gloss:
      '전통 문헌은 삼정이 고르지 않다는 조건에 고독·요절·천함·빈곤이라는 부정적 서술을 연결한다.',
    semanticKey: 'candidate.mayi.uneven.adverse_text',
    disposition: 'challenging',
  },
] as const;

export const MAYI_SANTING_RULE_CANDIDATES = Object.freeze(
  TERMS.map((term) =>
    Object.freeze({
      candidateId: `candidate.mayi.santing.${term.key}`,
      conditionText: term.condition,
      resultText: term.result,
      sourceQualifiedGloss: term.gloss,
      definitionStatus: 'research_candidate' as const,
      personalExecutionAuthorized: false as const,
      unresolvedItems: Object.freeze([
        'qualitative_condition_adjudication_not_authorized',
        'numeric_long_or_balance_mapping_not_issued',
        'personal_interpretation_not_authorized',
      ]),
      rule: Object.freeze({
        ruleId: `rule.mayi.santing.candidate.${term.key}`,
        version: '0.1.0',
        methodologyRef: MAYI_CANDIDATE_METHOD_REF,
        sourceRefs: [MAYI_SANTING_INTERPRETATION_CANDIDATE_SOURCE.passageId],
        tier: 'F2',
        inputs: [{ inputKey: term.key, sourceType: 'operationalization', ref: OP, required: true }],
        condition: { op: 'eq', input: term.key, value: true },
        output: {
          claimType: 'FACE_LOCAL_INTERPRETATION',
          semanticKey: term.semanticKey,
          pattern: term.key,
          disposition: term.disposition,
        },
        rationale: `同一麻衣版本的研究候選：${term.condition}→${term.result}；不把長改寫為數值唯一最長。`,
        limitations: [
          'Candidate logic only; no personal conclusion.',
          '長 is not operationalized as numeric maximum.',
          '平等 is not exact numeric equality; 不均 is not its numeric negation.',
          '老/少 have no numeric age interval.',
          'No scientific personal assessment, production or Character authorization.',
        ],
        promotionStatus: 'research',
      } satisfies FaceRuleDefinition),
    }),
  ),
);

/** Isolated authoring registry. The real topic/provider registry is unchanged. */
export const MAYI_SANTING_CANDIDATE_REGISTRY: FaceAuthorityRegistry = Object.freeze({
  ...FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY,
  passages: [
    ...FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY.passages,
    MAYI_SANTING_INTERPRETATION_CANDIDATE_SOURCE,
  ],
  operationalizations: [
    ...FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY.operationalizations,
    {
      operationalizationId: OP,
      methodologyRef: MAYI_CANDIDATE_METHOD_REF,
      sourceRefs: [MAYI_SANTING_INTERPRETATION_CANDIDATE_SOURCE.passageId],
      traditionalTerm: '三停原文質性條件',
      inputMetricRefs: [],
      classificationBands: {
        kind: 'explicit_qualitative_assertion_for_candidate_logic_only',
        numericDerivationAuthorized: false,
      },
      reviewStatus: 'research',
    },
  ],
  rules: [
    ...FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY.rules,
    ...MAYI_SANTING_RULE_CANDIDATES.map((candidate) => candidate.rule),
  ],
  methodologyPacks: [
    ...FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY.methodologyPacks,
    {
      packId: PACK_ID,
      version: '0.1.0',
      sourceWitnessSetRef: 'witness-set.mayi.nlc1925.text_candidates',
      methodologyDefinitionRefs: [MAYI_CANDIDATE_METHOD_REF],
      regionMapRefs: [],
      metricRegistryRef: 'registry.face.research_v0',
      operationalizationRegistryRef: 'registry.mayi.text_candidates',
      claimTypeRegistryRef: 'registry.face.research_v0',
      ruleRegistryRef: 'registry.mayi.text_candidates',
      comparisonPolicyRef: 'comparison.face.research_v0@0.1.0',
      enabledTiers: ['F2'],
      forbiddenObservationInputs: ['observations.colorAppearance'],
    },
  ],
} satisfies FaceAuthorityRegistry);
validateFaceAuthorityRegistry(MAYI_SANTING_CANDIDATE_REGISTRY);

/** Actual photo route: known source/rules, but no admitted qualitative condition. */
export function pendingMayiCandidateEvaluations() {
  return MAYI_SANTING_RULE_CANDIDATES.map((candidate) => ({
    ...candidate,
    evaluation: evaluateRegisteredFaceRule({
      registry: MAYI_SANTING_CANDIDATE_REGISTRY,
      methodologyPackRef: MAYI_CANDIDATE_PACK_REF,
      ruleRef: `${candidate.rule.ruleId}@${candidate.rule.version}`,
      executionStatus: 'research',
      inputs: { [candidate.rule.inputs[0]!.inputKey]: null },
    }),
    reason: 'qualitative_condition_and_personal_execution_not_admitted',
  }));
}

/** Explicitly synthetic authoring check; this entry point accepts no image/data artifact. */
export function selfCheckMayiCandidateLogic() {
  return MAYI_SANTING_RULE_CANDIDATES.map((candidate) => {
    const result = evaluateRegisteredFaceRule({
      registry: MAYI_SANTING_CANDIDATE_REGISTRY,
      methodologyPackRef: MAYI_CANDIDATE_PACK_REF,
      ruleRef: `${candidate.rule.ruleId}@${candidate.rule.version}`,
      executionStatus: 'research',
      inputs: { [candidate.rule.inputs[0]!.inputKey]: true },
    });
    if (result.outcome !== 'matched')
      throw new FaceAuthorityValidationError('Mayi candidate logic self-check failed.');
    return {
      ruleRef: result.ruleRef,
      outcome: result.outcome,
      assertionAuthority: 'research_fixture',
      personalReadingIssued: false,
    };
  });
}
