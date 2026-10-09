import { describe, expect, it } from 'vitest';
import {
  FR312A_BINDING_SUMMARY,
} from './traditional-observation-binding-authority-fr312a.js';
import {
  DIRECT_RULE_STUDY_TRIAGE_FR312B,
  FR312B_AUTHORITY_BOUNDARY,
  FR312B_SHORTLIST,
  FR312B_TRIAGE_SUMMARY,
  assertDirectRuleStudyTriageFR312B,
} from './traditional-direct-rule-study-triage-fr312b.js';

describe('FR312B direct-rule observation study triage', () => {
  it('covers all 230 direct rules exactly once', () => {
    assertDirectRuleStudyTriageFR312B();

    expect(FR312A_BINDING_SUMMARY.directRules).toBe(230);
    expect(DIRECT_RULE_STUDY_TRIAGE_FR312B).toHaveLength(230);
    expect(
      new Set(DIRECT_RULE_STUDY_TRIAGE_FR312B.map((item) => item.ruleId)).size,
    ).toBe(230);

    const total =
      FR312B_TRIAGE_SUMMARY.singleRegionSurfaceCandidates +
      FR312B_TRIAGE_SUMMARY.constructMappingRequired +
      FR312B_TRIAGE_SUMMARY.observationSurfaceGap +
      FR312B_TRIAGE_SUMMARY.manualContextOrBehaviorOnly +
      FR312B_TRIAGE_SUMMARY.phraseUncertainManualOnly +
      FR312B_TRIAGE_SUMMARY.bindingProhibited;

    expect(total).toBe(230);
    expect(FR312B_TRIAGE_SUMMARY).toMatchObject({
      directRules: 230,
      singleRegionSurfaceCandidates: 68,
      constructMappingRequired: 46,
      observationSurfaceGap: 81,
      manualContextOrBehaviorOnly: 6,
      phraseUncertainManualOnly: 29,
      bindingProhibited: 0,
      shortlistCount: 68,
      automaticTraditionalBindingsAuthorized: 0,
      thresholdNeedAdjudicated: 0,
      metricThresholdsAuthorized: 0,
    });
  });

  it('shortlists only direct-clear single-region morphology rules with materialized observation surfaces', () => {
    expect(FR312B_SHORTLIST.length).toBe(
      FR312B_TRIAGE_SUMMARY.singleRegionSurfaceCandidates,
    );

    for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
      if (item.disposition !== 'single_region_surface_candidate') continue;
      expect(item.observationKind, item.ruleId).toBe('morphology');
      expect(item.certainty, item.ruleId).toBe('direct_clear');
      expect(item.permanentlyUnsupportedProductQuery, item.ruleId).toBe(false);
      expect(item.materializedCandidateFeatureKeys.length, item.ruleId).toBeGreaterThan(0);
    }
  });

  it('never treats unstructured observation constructs as ready study candidates', () => {
    for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
      if (item.observationKind !== null) continue;
      expect(item.disposition, item.ruleId).not.toBe('single_region_surface_candidate');
      expect(item.automaticTraditionalBindingAuthorized, item.ruleId).toBe(false);
    }
  });

  it('keeps cross-region contexts and dynamic behavior out of the automatic shortlist', () => {
    for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
      if (
        item.observationKind !== 'cross_region_context' &&
        item.observationKind !== 'dynamic_behavior'
      ) continue;

      expect(
        [
          'manual_context_or_behavior_only',
          'phrase_uncertain_manual_only',
          'binding_prohibited',
        ],
        item.ruleId,
      ).toContain(item.disposition);
      expect(
        FR312B_SHORTLIST.some((candidate) => candidate.ruleId === item.ruleId),
        item.ruleId,
      ).toBe(false);
    }
  });

  it('keeps phrase-uncertain rules manual unless a stronger safety prohibition applies', () => {
    for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
      if (item.certainty !== 'phrase_uncertain') continue;
      expect(
        item.disposition,
        item.ruleId,
      ).toBe(
        item.permanentlyUnsupportedProductQuery
          ? 'binding_prohibited'
          : 'phrase_uncertain_manual_only',
      );
    }
  });

  it('does not reopen FR311Q permanently unsupported product-query rules', () => {
    const prohibited = DIRECT_RULE_STUDY_TRIAGE_FR312B.filter(
      (item) => item.permanentlyUnsupportedProductQuery,
    );

    for (const item of prohibited) {
      expect(item.disposition, item.ruleId).toBe('binding_prohibited');
      expect(
        FR312B_SHORTLIST.some((candidate) => candidate.ruleId === item.ruleId),
        item.ruleId,
      ).toBe(false);
    }
  });

  it('treats same-region neutral observations as candidates rather than equivalence proof', () => {
    for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
      expect(item.sameRegionCandidateOnly, item.ruleId).toBe(true);
      expect(item.neutralFeatureIsTraditionalEquivalenceProof, item.ruleId).toBe(false);
      expect(item.sourceGroundedEquivalenceRequired, item.ruleId).toBe(true);
      expect(item.observationValidationRequiredBeforeBinding, item.ruleId).toBe(true);
    }
  });

  it('does not infer threshold need or issue thresholds in FR312B', () => {
    expect(FR312B_TRIAGE_SUMMARY.thresholdNeedAdjudicated).toBe(0);
    expect(FR312B_TRIAGE_SUMMARY.metricThresholdsAuthorized).toBe(0);

    for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
      expect(item.thresholdNeedAdjudicated, item.ruleId).toBe(false);
      expect(item.metricThresholdAuthorized, item.ruleId).toBe(false);
      expect(item.populationNormAuthorized, item.ruleId).toBe(false);
    }
  });

  it('authorizes zero automatic traditional bindings', () => {
    expect(FR312B_TRIAGE_SUMMARY.automaticTraditionalBindingsAuthorized).toBe(0);

    for (const item of DIRECT_RULE_STUDY_TRIAGE_FR312B) {
      expect(item.automaticTraditionalBindingAuthorized, item.ruleId).toBe(false);
      expect(item.traditionalRuleInferenceAuthorized, item.ruleId).toBe(false);
      expect(item.productInterpretationAuthorized, item.ruleId).toBe(false);
      expect(item.modernScientificFactAuthorized, item.ruleId).toBe(false);
    }
  });

  it('keeps all FR312B global authority boundaries closed', () => {
    for (const [key, value] of Object.entries(FR312B_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
