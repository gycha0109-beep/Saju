import { describe, expect, it } from 'vitest';
import {
  R095_AUTHORITY,
  R095_INTER_LINEAGE_RELATIONS,
  R095_REJECTED_SHORTCUTS,
  R095_SCHOOL_LINEAGE_TAG_VERSION,
  R095_TAG_DIMENSIONS,
} from '../src/research/general-natal-school-lineage-tags.js';

describe('R095 school/lineage tags', () => {
  it('defines descriptive provenance dimensions', () => {
    expect(R095_SCHOOL_LINEAGE_TAG_VERSION).toBe('0.1.0-research');
    expect(R095_TAG_DIMENSIONS).toHaveLength(7);
    expect(R095_TAG_DIMENSIONS).toContain('METHODOLOGY_FAMILY');
    expect(R095_TAG_DIMENSIONS).toContain('TERMINOLOGY_PROFILE');
  });

  it('preserves overlap, divergence, and unknown lineage relations', () => {
    expect(R095_INTER_LINEAGE_RELATIONS).toContain('PARTIAL_OVERLAP');
    expect(R095_INTER_LINEAGE_RELATIONS).toContain('DIVERGENT');
    expect(R095_INTER_LINEAGE_RELATIONS).toContain('UNKNOWN');
  });

  it('rejects popularity, seniority, and label shortcuts', () => {
    expect(R095_REJECTED_SHORTCUTS).toContain('POPULARITY_EQUALS_AUTHORITY');
    expect(R095_REJECTED_SHORTCUTS).toContain('SAME_LABEL_EQUALS_SAME_SEMANTICS');
    expect(R095_REJECTED_SHORTCUTS).toContain('CROSS_SCHOOL_BLEND_WITHOUT_COMPOSITION_POLICY');
  });

  it('does not force reconciliation or Production authority', () => {
    expect(R095_AUTHORITY).toEqual({
      status:'DESCRIPTIVE_LINEAGE_TAG_TAXONOMY_ONLY',
      tagsAsAuthorityWeights:false,
      propositionComparisonRequiredForDivergence:true,
      forcedReconciliationAuthorized:false,
      unknownLineagePreserved:true,
      productionAuthorityPromoted:false,
    });
  });
});
