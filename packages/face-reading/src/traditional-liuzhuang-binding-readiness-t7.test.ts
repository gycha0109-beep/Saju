import { describe, expect, it } from 'vitest';
import {
  FACE_TRADITIONAL_T7_LIUZHUANG_BINDING_READINESS_AUTHORITY,
  FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS,
  FACE_TRADITIONAL_T7_LIUZHUANG_SIX_FUS_BINDING_READINESS,
} from './traditional-liuzhuang-binding-readiness-t7.js';
import {
  FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS,
  FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS,
} from './traditional-liuzhuang-operationalization-t5.js';

describe('柳莊 T7 binding readiness', () => {
  it('covers every T5 descriptor exactly once', () => {
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS).toHaveLength(26);
    expect(new Set(FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS.map((entry) => entry.descriptorId)).size).toBe(26);
    expect(
      FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS.map((entry) => entry.specId).sort(),
    ).toEqual(
      FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS.map((entry) => entry.specId).sort(),
    );
  });

  it('covers all three 柳莊 六府 requirements without admitting a binding', () => {
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_SIX_FUS_BINDING_READINESS).toHaveLength(3);
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_SIX_FUS_BINDING_READINESS.map((entry) => entry.sourceLocationTerm)).toEqual(
      FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS.map((entry) => entry.sourceLocationTerm),
    );
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_SIX_FUS_BINDING_READINESS.every((entry) => entry.traditionalBindingAuthorized === false)).toBe(true);
  });

  it('keeps all descriptor bindings, executable criteria, and Production fail-closed', () => {
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS.every((entry) => entry.traditionalBindingAuthorized === false)).toBe(true);
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS.every((entry) => entry.executableCriterionStateAuthorized === false)).toBe(true);
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS.every((entry) => entry.productionAuthorization === false)).toBe(true);
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_BINDING_READINESS_AUTHORITY.admittedTraditionalBindings).toBe(0);
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_BINDING_READINESS_AUTHORITY.admittedExecutableCriteria).toBe(0);
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_BINDING_READINESS_AUTHORITY.admittedProductionTiers).toBe(0);
    expect(FACE_TRADITIONAL_T7_LIUZHUANG_BINDING_READINESS_AUTHORITY.productionAuthorization).toBe(false);
  });

  it('does not treat later mouth research geometry as traditional semantics', () => {
    const mouth = FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS.filter((entry) =>
      entry.descriptorId.startsWith('t4.liuzhuang.intake.'),
    );
    expect(mouth).toHaveLength(3);
    expect(mouth.every((entry) => entry.state === 'research_neutral_candidate_available_binding_blocked')).toBe(true);
    expect(mouth.every((entry) => entry.traditionalBindingAuthorized === false)).toBe(true);
  });
});
