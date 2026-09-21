import { describe, expect, it } from 'vitest';
import {
  R095_AUTHORITY,
  R095_COMPOSITION_POLICY_REQUIREMENTS,
  R095_LINEAGE_RELATIONS,
  R095_PROPOSITION_RELATIONS,
  R095_RELATION_ASSERTION_RULES,
  R095_REJECTED_SHORTCUTS,
  R095_REQUIRED_TAG_ASSERTION_FIELDS,
  R095_SCHOOL_LINEAGE_TAG_VERSION,
  R095_TAG_ASSERTION_REVIEW_STATES,
  R095_TAG_DIMENSIONS,
} from '../src/research/general-natal-school-lineage-tags.js';

describe('R095 school/lineage tags', () => {
  it('defines descriptive provenance dimensions with evidenced assertions', () => {
    expect(R095_SCHOOL_LINEAGE_TAG_VERSION).toBe('0.2.0-research');
    expect(R095_TAG_DIMENSIONS).toHaveLength(7);
    expect(R095_TAG_DIMENSIONS).toContain('METHODOLOGY_FAMILY');
    expect(R095_TAG_DIMENSIONS).toContain('TERMINOLOGY_PROFILE');
    expect(R095_REQUIRED_TAG_ASSERTION_FIELDS).toContain('EVIDENCE_REFS');
    expect(R095_REQUIRED_TAG_ASSERTION_FIELDS).toContain('SCOPE_REF');
    expect(R095_TAG_ASSERTION_REVIEW_STATES).toEqual([
      'VERIFIED',
      'REVIEWED',
      'INCONCLUSIVE',
    ]);
  });

  it('separates lineage genealogy from proposition comparison', () => {
    expect(R095_LINEAGE_RELATIONS).toEqual([
      'SAME_TRADITION',
      'DERIVED',
      'COMMENTARY_ON',
      'UNKNOWN',
    ]);
    expect(R095_PROPOSITION_RELATIONS).toEqual([
      'EQUIVALENT_WITHIN_SCOPE',
      'PARTIAL_OVERLAP',
      'DIVERGENT',
      'INCOMPARABLE',
      'UNKNOWN',
    ]);
    expect(R095_AUTHORITY.lineageAndPropositionRelationsSeparated).toBe(true);
  });

  it('requires proposition-level comparison before divergence or equivalence', () => {
    expect(R095_RELATION_ASSERTION_RULES).toContain(
      'PROPOSITION_RELATION_REQUIRES_EXPLICIT_PROPOSITION_REFS',
    );
    expect(R095_RELATION_ASSERTION_RULES).toContain(
      'DIFFERENT_LABELS_DO_NOT_IMPLY_DIVERGENCE',
    );
    expect(R095_RELATION_ASSERTION_RULES).toContain(
      'SAME_LABEL_DOES_NOT_IMPLY_SEMANTIC_EQUIVALENCE',
    );
    expect(R095_AUTHORITY.propositionComparisonRequiredForDivergence).toBe(true);
  });

  it('does not let lineage or practitioner tags propagate authority', () => {
    expect(R095_REJECTED_SHORTCUTS).toContain(
      'LINEAGE_RELATION_TRANSITIVELY_PROPAGATES_AUTHORITY',
    );
    expect(R095_REJECTED_SHORTCUTS).toContain(
      'PRACTITIONER_TAG_PROPAGATES_TO_ALL_CITED_SOURCES',
    );
    expect(R095_AUTHORITY.transitiveAuthorityPropagationAuthorized).toBe(false);
    expect(R095_AUTHORITY.practitionerTagInheritanceAuthorized).toBe(false);
  });

  it('requires a separate explicit policy for cross-school composition', () => {
    expect(R095_COMPOSITION_POLICY_REQUIREMENTS).toContain(
      'EXPLICIT_VERSIONED_POLICY_REQUIRED',
    );
    expect(R095_COMPOSITION_POLICY_REQUIREMENTS).toContain(
      'PRESERVED_CONFLICTS_AND_AMBIGUITIES',
    );
    expect(R095_REJECTED_SHORTCUTS).toContain(
      'CROSS_SCHOOL_BLEND_WITHOUT_COMPOSITION_POLICY',
    );
    expect(R095_AUTHORITY.crossSchoolBlendWithoutCompositionPolicyAuthorized).toBe(false);
  });

  it('rejects popularity, seniority, canonical-school selection, and forced reconciliation', () => {
    expect(R095_REJECTED_SHORTCUTS).toContain('POPULARITY_EQUALS_AUTHORITY');
    expect(R095_REJECTED_SHORTCUTS).toContain('SENIORITY_EQUALS_CONFIDENCE');
    expect(R095_REJECTED_SHORTCUTS).toContain('AUTO_SELECT_CANONICAL_SCHOOL');
    expect(R095_AUTHORITY.forcedReconciliationAuthorized).toBe(false);
  });

  it('keeps lineage metadata descriptive and Production authority unpromoted', () => {
    expect(R095_AUTHORITY).toEqual({
      status: 'DESCRIPTIVE_LINEAGE_TAG_TAXONOMY_ONLY',
      tagAssertionsRequireEvidence: true,
      tagsAsAuthorityWeights: false,
      lineageAndPropositionRelationsSeparated: true,
      propositionComparisonRequiredForDivergence: true,
      forcedReconciliationAuthorized: false,
      transitiveAuthorityPropagationAuthorized: false,
      practitionerTagInheritanceAuthorized: false,
      crossSchoolBlendWithoutCompositionPolicyAuthorized: false,
      unknownLineagePreserved: true,
      productionAuthorityPromoted: false,
    });
  });
});
