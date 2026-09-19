import { describe, expect, it } from 'vitest';
import {
  R070_AUTHORITY,
  R070_CLAIM_LAYERS,
  R070_EXECUTION_GAPS,
  R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
  R070_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-family-domain-claim-corpus.js';

describe('R070 family / parents / children claim corpus', () => {
  it('preserves multiple family-reading layers instead of one lookup table', () => {
    expect(R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R070_CLAIM_LAYERS).toHaveLength(5);
    expect(R070_CLAIM_LAYERS.map((x) => x.layer)).toEqual([
      'PILLAR_DOMAIN',
      'PILLAR_DOMAIN',
      'STAR_RELATION',
      'SEX_SCOPED_RELATION',
      'CONFIGURATION',
    ]);
    expect(R070_CLAIM_LAYERS.every((x) => x.executable === false)).toBe(true);
  });

  it('preserves source/sex variance in child and family relations', () => {
    expect(R070_CLAIM_LAYERS).toEqual(expect.arrayContaining([
      expect.objectContaining({ sexScope: 'MALE_CHART' }),
      expect.objectContaining({ sexScope: 'FEMALE_CHART' }),
      expect.objectContaining({ sexScope: 'SECTION_SCOPED' }),
    ]));
  });

  it('rejects universal family-star and pillar shortcuts', () => {
    expect(R070_REJECTED_SHORTCUTS).toContain('FATHER_ALWAYS_EQUALS_PIANCAI');
    expect(R070_REJECTED_SHORTCUTS).toContain('CHILD_ALWAYS_EQUALS_GUANSHA');
    expect(R070_REJECTED_SHORTCUTS).toContain('FAMILY_STAR_ABSENCE_IMPLIES_RELATIVE_ABSENCE');
  });

  it('keeps method selection and outcome settlement unresolved', () => {
    expect(R070_EXECUTION_GAPS).toContain('FAMILY_METHOD_SELECTION');
    expect(R070_EXECUTION_GAPS).toContain('PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION');
    expect(R070_EXECUTION_GAPS).toContain('CONFIGURATION_OUTCOME_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R070_AUTHORITY).toEqual({
      status: 'VERIFIED_MULTI_LAYER_FAMILY_CLAIM_CORPUS',
      claimLayerCount: 5,
      universalFamilyLookupTableAuthorized: false,
      starPresenceImpliesRelativeExistence: false,
      deterministicFamilyOutcomeAuthorized: false,
      executableFamilyClassifierAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
