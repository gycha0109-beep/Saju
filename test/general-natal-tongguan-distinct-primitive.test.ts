import { describe, expect, it } from 'vitest';
import {
  R037_AUTHORITY,
  R037_DIRECT_PROPOSITION,
  R037_EXECUTION_GAPS,
  R037_FORBIDDEN_SHORTCUTS,
  R037_TONGGUAN_VERSION,
} from '../src/research/general-natal-tongguan-distinct-primitive.js';

describe('R037 Tongguan distinct resolution primitive', () => {
  it('preserves the direct source preconditions without inventing a mediator', () => {
    expect(R037_TONGGUAN_VERSION).toBe('0.1.0-research');
    expect(R037_DIRECT_PROPOSITION.preconditions).toEqual([
      '兩神對峙',
      '強弱均平',
      '各不相下',
    ]);
    expect(R037_DIRECT_PROPOSITION.requiredResolution).toBe('須調和');
    expect(R037_DIRECT_PROPOSITION.methodologyFamily).toBe('TONGGUAN');
    expect(R037_DIRECT_PROPOSITION.executable).toBe(false);
  });

  it('keeps balance, applicability, and mediator selection unresolved', () => {
    expect(R037_EXECUTION_GAPS).toContain('RELATIVE_STRENGTH_BALANCE');
    expect(R037_EXECUTION_GAPS).toContain('TONGGUAN_APPLICABILITY');
    expect(R037_EXECUTION_GAPS).toContain('MEDIATOR_OR_TRANSFORMATION_SELECTION');
  });

  it('forbids presence/count shortcuts and Production promotion', () => {
    expect(R037_FORBIDDEN_SHORTCUTS).toContain('ELEMENT_COUNT_SIMILARITY_AS_BALANCE');
    expect(R037_FORBIDDEN_SHORTCUTS).toContain('MIDDLE_ELEMENT_LOOKUP_AS_TONGGUAN');
    expect(R037_AUTHORITY).toEqual({
      sourceFamily: 'XU_COMMENTARY_TONGGUAN',
      status: 'VERIFIED_BOUNDED_PROPOSITION_FAMILY',
      distinctResolutionFamilyVerified: true,
      executableTongguanResolverAuthorized: false,
      universalMediatorSelectionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
