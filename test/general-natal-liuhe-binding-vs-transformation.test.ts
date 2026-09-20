import { describe, expect, it } from 'vitest';
import {
  R052_AUTHORITY,
  R052_BOUNDED_EXAMPLES,
  R052_EXECUTION_GAPS,
  R052_LIUHE_BINDING_TRANSFORMATION_VERSION,
  R052_REJECTED_SHORTCUTS,
  R052_STAGE_MODEL,
} from '../src/research/general-natal-liuhe-binding-vs-transformation.js';

describe('R052 Liuhe binding vs transformation', () => {
  it('preserves separate bounded binding and transformation examples', () => {
    expect(R052_LIUHE_BINDING_TRANSFORMATION_VERSION).toBe('0.1.0-research');
    expect(R052_BOUNDED_EXAMPLES).toEqual([
      expect.objectContaining({
        pair: ['子', '丑'],
        observedRole: 'BINDING_OR_CONFLICT_RESOLUTION',
        executable: false,
      }),
      expect.objectContaining({
        pair: ['寅', '亥'],
        observedRole: 'TRANSFORMATION',
        executable: false,
      }),
    ]);
  });

  it('models relation stages without automatic promotion', () => {
    expect(R052_STAGE_MODEL.map((x) => x.stage)).toEqual([
      'PAIR_IDENTITY',
      'EFFECTIVE_BINDING',
      'CONTEXTUAL_EFFECT',
      'TRANSFORMATION_ELIGIBILITY',
      'TRANSFORMATION',
    ]);
    expect(R052_STAGE_MODEL.every(
      (x) => x.automaticFromPrevious === false && x.executable === false,
    )).toBe(true);
  });

  it('keeps transformation and contextual effects unresolved', () => {
    expect(R052_EXECUTION_GAPS).toContain('HEAVENLY_STEM_SUPPORT_FOR_TRANSFORMATION');
    expect(R052_EXECUTION_GAPS).toContain('CONFLICT_RESOLUTION_EFFECT');
    expect(R052_EXECUTION_GAPS).toContain('TRANSFORMATION_SUFFICIENCY');
  });

  it('rejects presence-only and binding-equals-transformation shortcuts', () => {
    expect(R052_REJECTED_SHORTCUTS).toContain('LIUHE_PAIR_PRESENT_IMPLIES_TRANSFORMED');
    expect(R052_REJECTED_SHORTCUTS).toContain('LIUHE_PAIR_PRESENT_IMPLIES_CLASH_RESOLUTION');
    expect(R052_REJECTED_SHORTCUTS).toContain('BINDING_IMPLIES_TRANSFORMATION');
  });

  it('does not promote executable or Production authority', () => {
    expect(R052_AUTHORITY).toEqual({
      status: 'VERIFIED_SEMANTIC_DISTINCTION',
      bindingAndTransformationSeparated: true,
      presenceOnlyTransformationAuthorized: false,
      universalClashResolutionAuthorized: false,
      executableLiuheResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
