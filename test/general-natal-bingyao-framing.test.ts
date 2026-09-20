import { describe, expect, it } from 'vitest';
import {
  R038_AUTHORITY,
  R038_BINGYAO_PROPOSITIONS,
  R038_BINGYAO_VERSION,
  R038_EXECUTION_GAPS,
  R038_FORBIDDEN_SHORTCUTS,
} from '../src/research/general-natal-bingyao-framing.js';

describe('R038 Bing-Yao framing', () => {
  it('keeps disease identity contextual to the desired support/suppression direction', () => {
    expect(R038_BINGYAO_VERSION).toBe('0.1.0-research');
    expect(R038_BINGYAO_PROPOSITIONS.map((p) => [p.baselineDirection, p.diseaseRelation])).toEqual([
      ['SUPPORT_DESIRED', '傷其扶者為病'],
      ['SUPPRESSION_DESIRED', '去其抑者為病'],
    ]);
    expect(R038_BINGYAO_PROPOSITIONS.every((p) => p.executable === false)).toBe(true);
  });

  it('keeps effect and applicability predicates unresolved', () => {
    expect(R038_EXECUTION_GAPS).toContain('BASELINE_REQUIREMENT_DIRECTION');
    expect(R038_EXECUTION_GAPS).toContain('REMEDY_EFFECTIVENESS');
    expect(R038_EXECUTION_GAPS).toContain('BINGYAO_APPLICABILITY');
  });

  it('forbids static element tables and Production promotion', () => {
    expect(R038_FORBIDDEN_SHORTCUTS).toContain('FIXED_ELEMENT_DISEASE_TABLE');
    expect(R038_FORBIDDEN_SHORTCUTS).toContain('FIXED_ELEMENT_REMEDY_TABLE');
    expect(R038_AUTHORITY).toEqual({
      sourceFamily: 'XU_COMMENTARY_BINGYAO',
      status: 'VERIFIED_BOUNDED_SEMANTIC_BOUNDARY',
      relationalDiseaseRemedyFramingVerified: true,
      executableBingYaoResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
