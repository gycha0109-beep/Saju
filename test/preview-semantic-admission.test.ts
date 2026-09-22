import { describe, expect, it } from 'vitest';
import {
  PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION,
  createPreviewSemanticAdmissionRegistryV1,
  requirePreviewSemanticAdmissionV1,
  resolvePreviewSemanticAdmissionV1,
} from '../src/preview/preview-semantic-admission.js';

describe('Preview semantic admission registry v1', () => {
  it('pins explicit research admissions without granting Production authority', () => {
    const registry = createPreviewSemanticAdmissionRegistryV1();

    expect(registry.registryVersion).toBe(PREVIEW_SEMANTIC_ADMISSION_REGISTRY_VERSION);
    expect(registry.entries).toHaveLength(8);
    expect(registry.constraints).toEqual({
      explicitAdmissionRequired: true,
      researchMergeDoesNotImplyAdmission: true,
      admissionDoesNotImplyProductionPromotion: true,
      sourceVersionOrAuthorityChangeRequiresReadmission: true,
      holdIsFailClosed: true,
    });
    for (const entry of registry.entries) {
      expect(entry.researchRef.observedVersion).toBe(entry.researchRef.expectedVersion);
      expect(entry.researchRef.observedAuthorityState).toBe(
        entry.researchRef.expectedAuthorityState,
      );
      expect(entry.effects.mayAffectProductionAuthority).toBe(false);
      expect(entry.effects.mayPromoteResearchLifecycle).toBe(false);
      expect(entry.effects.mayInferMissingSemantics).toBe(false);
      expect(entry.effects.mayOverrideCalculationAuthority).toBe(false);
    }
  });

  it('admits the bounded structural summary as a Preview claim only', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CANDIDATE',
      'general:natal',
    );

    expect(admission.disposition).toBe('claim');
    expect(admission.effects.mayCreatePreviewClaim).toBe(true);
    expect(admission.effects.mayQualifyPreviewClaim).toBe(false);
    expect(admission.boundaries).toContain('NO_OVERALL_STRENGTH_CLASSIFICATION');
    expect(admission.boundaries).toContain('NO_NUMERIC_SCORING');
  });

  it('admits R012/R013/R014 only as bounded qualifiers', () => {
    for (const researchId of [
      'R012_MONTH_BRANCH_PRIORITY',
      'R013_TOUGAN_TONGGEN_INDEPENDENCE',
      'R014_MUKU_ROOT_TREATMENT',
    ]) {
      const admission = requirePreviewSemanticAdmissionV1(researchId, 'general:natal');
      expect(admission.disposition).toBe('qualifier');
      expect(admission.effects.mayCreatePreviewClaim).toBe(false);
      expect(admission.effects.mayQualifyPreviewClaim).toBe(true);
    }
  });

  it('keeps R020 observation-only and therefore unable to classify a user chart', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'R020_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS',
      'general:natal',
    );

    expect(admission.disposition).toBe('observation');
    expect(admission.effects.mayExposePreviewObservation).toBe(true);
    expect(admission.effects.mayCreatePreviewClaim).toBe(false);
    expect(admission.effects.mayQualifyPreviewClaim).toBe(false);
    expect(admission.boundaries).toContain('NO_CHART_LEVEL_QIANG_RUO_CLASSIFIER');
  });

  it('pins the current Career candidate as a ga-open Preview baseline, not Production authority', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'CAREER_NATAL_READING_CANDIDATE',
      'career:natal',
    );

    expect(admission.disposition).toBe('claim');
    expect(admission.semanticScope).toBe(
      'existing_ga_open_career_exact_ten_god_channel_conclusions',
    );
    expect(admission.boundaries).toContain('NO_SPECIFIC_OCCUPATION_ASSIGNMENT');
    expect(admission.effects.mayAffectProductionAuthority).toBe(false);
  });

  it('pins the current general Relationship candidate as a ga-open Preview baseline, not Production authority', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'RELATIONSHIP_NATAL_READING_CANDIDATE',
      'relationship:natal:general',
    );

    expect(admission.disposition).toBe('claim');
    expect(admission.semanticScope).toBe(
      'existing_ga_open_relationship_general_consumer_conclusions',
    );
    expect(admission.boundaries).toContain('NO_SPECIFIC_PARTNER_OR_ATTRIBUTE_PREDICTION');
    expect(admission.boundaries).toContain('NO_MARRIAGE_BREAKUP_OR_INFIDELITY_OUTCOME');
    expect(admission.effects.mayAffectProductionAuthority).toBe(false);
  });

  it('pins the current Wealth candidate as a ga-open Preview baseline, not Production authority', () => {
    const admission = requirePreviewSemanticAdmissionV1(
      'WEALTH_NATAL_READING_CANDIDATE',
      'wealth:natal',
    );

    expect(admission.disposition).toBe('claim');
    expect(admission.semanticScope).toBe('existing_ga_open_wealth_consumer_conclusions');
    expect(admission.boundaries).toContain('PREVIEW_BASELINE_ONLY');
    expect(admission.effects.mayAffectProductionAuthority).toBe(false);
  });

  it('fails closed for research that has not been explicitly admitted for the requested section', () => {
    expect(
      resolvePreviewSemanticAdmissionV1('R020_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS', 'wealth:natal'),
    ).toBeUndefined();
    expect(() =>
      requirePreviewSemanticAdmissionV1('UNREGISTERED_FUTURE_RESEARCH', 'general:natal'),
    ).toThrow(TypeError);
  });

  it('is deterministic for the same admitted research identities', () => {
    const first = createPreviewSemanticAdmissionRegistryV1();
    const second = createPreviewSemanticAdmissionRegistryV1();

    expect(second.registryHash).toBe(first.registryHash);
    expect(second.entries).toEqual(first.entries);
  });
});
