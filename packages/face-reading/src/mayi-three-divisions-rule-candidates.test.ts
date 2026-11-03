import { describe, expect, it } from 'vitest';
import {
  MAYI_CANDIDATE_PACK_REF,
  MAYI_SANTING_CANDIDATE_REGISTRY,
  MAYI_SANTING_RULE_CANDIDATES,
  pendingMayiCandidateEvaluations,
  selfCheckMayiCandidateLogic,
} from './mayi-three-divisions-rule-candidates.js';
import { FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY } from './mayi-three-divisions-reviewed-methodology.js';
import { evaluateRegisteredFaceRule } from './rule-evaluation.js';

describe('same-witness Mayi text candidates, separate from personal execution', () => {
  it('preserves five source conditions without numerical classifications or age intervals', () => {
    expect(MAYI_SANTING_RULE_CANDIDATES.map((c) => [c.conditionText, c.resultText])).toEqual([
      ['上停長', '老吉昌'],
      ['中停長', '近君王'],
      ['下停長', '少吉祥'],
      ['三停平等', '富貴榮顯'],
      ['三停不均', '孤夭賤貧'],
    ]);
    expect(
      FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY.rules.some((r) =>
        r.ruleId.startsWith('rule.mayi.santing.candidate.'),
      ),
    ).toBe(false);
    expect(MAYI_SANTING_RULE_CANDIDATES.every((c) => !c.personalExecutionAuthorized)).toBe(true);
  });

  it('uses the shared evaluator for explicitly synthetic authoring assertions only', () => {
    expect(selfCheckMayiCandidateLogic()).toHaveLength(5);
    for (const candidate of MAYI_SANTING_RULE_CANDIDATES) {
      const request = {
        registry: MAYI_SANTING_CANDIDATE_REGISTRY,
        methodologyPackRef: MAYI_CANDIDATE_PACK_REF,
        ruleRef: `${candidate.rule.ruleId}@${candidate.rule.version}`,
        executionStatus: 'research' as const,
        inputs: { [candidate.rule.inputs[0]!.inputKey]: false },
      };
      expect(evaluateRegisteredFaceRule(request).outcome).toBe('not_matched');
      expect(() =>
        evaluateRegisteredFaceRule({ ...request, executionStatus: 'production_authorized' }),
      ).toThrow(/production/u);
    }
  });

  it('returns unavailable and no personal semantic output on the actual photo path', () => {
    for (const candidate of pendingMayiCandidateEvaluations()) {
      expect(candidate.evaluation.outcome).toBe('unavailable');
      expect(candidate.evaluation.output).toBeNull();
    }
  });
});
