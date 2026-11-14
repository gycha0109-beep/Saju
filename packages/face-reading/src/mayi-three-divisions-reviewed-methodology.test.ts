import { describe, expect, it } from 'vitest';
import {
  FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY as registry,
  MAYI_THREE_DIVISIONS_METHODOLOGY_REVIEW_DECISION as decision,
  MAYI_THREE_DIVISIONS_REVIEWED_SUCCESSOR as successor,
  getReviewedMayiThreeDivisionsMethodology,
} from './mayi-three-divisions-reviewed-methodology.js';
import { FACE_TRADITIONAL_T4_METHODOLOGIES } from './traditional-three-divisions-methodology-t4.js';
import { FACE_RESEARCH_PACK_V0 } from './research-pack-v0.js';
import {
  FACE_TRADITIONAL_T6_PACK_CANDIDATE,
  FACE_TRADITIONAL_T6_PROMOTION_GATES,
} from './traditional-three-divisions-methodology-pack-t6.js';
import { T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006 } from './traditional-three-divisions-partial-binding-ledger-frb006.js';
import { evaluateRegisteredFaceRule } from './rule-evaluation.js';
import { validateFaceAuthorityRegistry } from './validation.js';

describe('explicitly approved Mayi methodology review only', () => {
  it('registers the exact reviewed successor using the native registry validator and lookup', () => {
    expect(() => validateFaceAuthorityRegistry(registry)).not.toThrow();
    expect(getReviewedMayiThreeDivisionsMethodology()).toBe(successor);
    expect(`${successor.methodologyId}@${successor.version}`).toBe(decision.proposedSuccessorRef);
    expect(successor.reviewStatus).toBe('reviewed');
    const predecessor = registry.methodologies.find(
      (entry) => `${entry.methodologyId}@${entry.version}` === decision.targetMethodologyRef,
    )!;
    expect(predecessor.reviewStatus).toBe('research');
    expect(successor).toEqual({ ...predecessor, version: '0.3.0', reviewStatus: 'reviewed' });
    expect(
      FACE_TRADITIONAL_T4_METHODOLOGIES.every((entry) => entry.reviewStatus === 'research'),
    ).toBe(true);
    expect(FACE_TRADITIONAL_T4_METHODOLOGIES).toHaveLength(3);
  });

  it('retains exact source/witness/work lineage and unchanged source limitations', () => {
    expect(successor.sourceRefs).toEqual(['passage.mayi.fr261.contiguous_three_divisions']);
    const passage = registry.passages.find((entry) => entry.passageId === successor.sourceRefs[0])!;
    expect(passage.verificationStatus).toBe('scan_checked');
    expect(passage.scanPage).toBe(35);
    const witness = registry.witnesses.find((entry) => entry.witnessId === passage.witnessId)!;
    expect(witness.witnessStatus).toBe('verified');
    expect(registry.works.some((entry) => entry.workId === witness.workId)).toBe(true);
    expect(successor.limitations).toContain('Production authorization이 아니다.');
    expect(successor.limitations).toContain('平等/相稱의 수치 허용오차를 정의하지 않는다.');
  });

  it('rejects a reviewed registry whose source evidence was downgraded or replaced', () => {
    expect(() =>
      validateFaceAuthorityRegistry({
        ...registry,
        passages: registry.passages.map((entry) =>
          successor.sourceRefs.includes(entry.passageId)
            ? { ...entry, verificationStatus: 'unverified_ocr' }
            : entry,
        ),
      }),
    ).toThrow(/scan_checked/u);
    expect(() =>
      validateFaceAuthorityRegistry({
        ...registry,
        methodologies: registry.methodologies.map((entry) =>
          entry === successor ? { ...entry, sourceRefs: ['passage.missing'] } : entry,
        ),
      }),
    ).toThrow(/unknown/u);
  });

  it('keeps the decision, definition and exact version registry entries immutable', () => {
    expect(Object.isFrozen(decision)).toBe(true);
    expect(Object.isFrozen(decision.evidenceRefs)).toBe(true);
    expect(Object.isFrozen(successor)).toBe(true);
    expect(Object.isFrozen(successor.sourceRefs)).toBe(true);
    expect(Object.isFrozen(successor.limitations)).toBe(true);
    expect(Object.isFrozen(registry.methodologies)).toBe(true);
    expect(() => (successor.sourceRefs as string[]).push('passage.forged')).toThrow();
  });

  it('does not rebind historical packs, admit more bindings or grant production rule execution', () => {
    expect(FACE_TRADITIONAL_T6_PACK_CANDIDATE.methodologyRefs).toContain(
      decision.targetMethodologyRef,
    );
    expect(FACE_TRADITIONAL_T6_PACK_CANDIDATE.methodologyRefs).not.toContain(
      decision.proposedSuccessorRef,
    );
    expect(FACE_TRADITIONAL_T6_PACK_CANDIDATE.enabledProductionTiers).toEqual([]);
    expect(FACE_TRADITIONAL_T6_PROMOTION_GATES.productionAuthorization).toBe(false);
    expect(
      T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006.admittedTraditionalBindingCount,
    ).toBe(13);
    expect(
      T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006.blockedTraditionalBindingCount,
    ).toBe(3);
    expect(
      registry.rules.some((entry) => entry.methodologyRef === decision.proposedSuccessorRef),
    ).toBe(false);
    const rule = registry.rules[0]!;
    const forgedProductionRule = {
      ...rule,
      ruleId: 'rule.synthetic.rejected_mayi_production',
      methodologyRef: decision.proposedSuccessorRef,
      sourceRefs: successor.sourceRefs,
      promotionStatus: 'production_authorized' as const,
      inputs: [],
      condition: { op: 'exists' as const, input: 'missing' },
    };
    expect(() =>
      validateFaceAuthorityRegistry({
        ...registry,
        rules: [...registry.rules, forgedProductionRule],
      }),
    ).toThrow(/status=reviewed/u);
    expect(() =>
      evaluateRegisteredFaceRule({
        registry,
        methodologyPackRef: `${FACE_RESEARCH_PACK_V0.packId}@${FACE_RESEARCH_PACK_V0.version}`,
        ruleRef: `${rule.ruleId}@${rule.version}`,
        executionStatus: 'production_authorized',
        inputs: { threeDivisionRelation: 'upper_longest' },
      }),
    ).toThrow(/production/u);
  });
});
