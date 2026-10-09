import { describe, expect, it } from 'vitest';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR311P_EVIDENCE_INVENTORY,
} from './traditional-face-evidence-integrity-fr311p.js';
import {
  FR311Q_GAP_SUMMARY,
} from './traditional-face-lens-gap-adjudication-fr311q.js';
import {
  FR312A_BINDING_SUMMARY,
} from './traditional-observation-binding-authority-fr312a.js';
import {
  FR312B_SHORTLIST,
  FR312B_TRIAGE_SUMMARY,
} from './traditional-direct-rule-study-triage-fr312b.js';
import {
  FR312C_AUTHORITY_BOUNDARY,
  FR312C_DIRECT_RULE_EQUIVALENCE_STUDY,
  FR312C_EQUIVALENCE_SUMMARY,
  assertDirectRuleEquivalenceStudyFR312C,
} from './traditional-direct-rule-equivalence-study-fr312c.js';

describe('FR312C direct-rule observation equivalence study', () => {
  it('adjudicates the FR312B shortlist 68/68 exactly once', () => {
    assertDirectRuleEquivalenceStudyFR312C();

    expect(FR312B_SHORTLIST).toHaveLength(68);
    expect(FR312C_DIRECT_RULE_EQUIVALENCE_STUDY).toHaveLength(68);

    const upstream = FR312B_SHORTLIST.map((item) => item.ruleId).sort();
    const adjudicated = FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
      .map((item) => item.ruleId)
      .sort();

    expect(new Set(adjudicated).size).toBe(68);
    expect(adjudicated).toEqual(upstream);
  });

  it('freezes the FR312C construct-adjudication distribution', () => {
    expect(FR312C_EQUIVALENCE_SUMMARY).toMatchObject({
      shortlistCount: 68,
      measurementSemanticsCandidate: 0,
      thresholdDefinitionRequired: 10,
      multiFeatureConstructRequired: 18,
      constructMismatch: 4,
      insufficientObservationDefinition: 12,
      additionalExtractorRequired: 21,
      manualOnlyAfterReview: 3,
      thresholdRequirementRequired: 28,
      thresholdConstructDefinitionFirst: 37,
      thresholdNotApplicableManual: 3,
      nextEmpiricalProtocolCandidates: 10,
      automaticTraditionalBindingsAuthorized: 0,
      thresholdValuesAuthorized: 0,
      populationNormsAuthorized: 0,
      multiFeatureSynthesesAuthorized: 0,
      providerLandmarkDirectBindingsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });
  });

  it('selects only materialized FR293 comparators and never treats them as equivalence proof', () => {
    const materialized = new Set(
      FR293_PRODUCT_COLUMN_MAP
        .filter((item) =>
          item.implementationState === 'canonical_extractor_materialized')
        .map((item) => item.featureKey),
    );

    for (const item of FR312C_DIRECT_RULE_EQUIVALENCE_STUDY) {
      for (const featureKey of item.comparableNeutralFeatureKeys) {
        expect(materialized.has(
          featureKey as (typeof FR293_PRODUCT_COLUMN_MAP)[number]['featureKey'],
        ), item.ruleId).toBe(true);
        expect(
          item.fr312bMaterializedCandidateFeatureKeys,
          item.ruleId,
        ).toContain(featureKey);
      }

      expect(item.automaticTraditionalBindingAuthorized, item.ruleId)
        .toBe(false);
      expect(item.providerLandmarkDirectBindingAuthorized, item.ruleId)
        .toBe(false);
    }
  });

  it('records a source expression, a specific comparator or explicit current-none state, and a measurement-construct proposal for every rule', () => {
    for (const item of FR312C_DIRECT_RULE_EQUIVALENCE_STUDY) {
      expect(item.sourceExpression.trim().length, item.ruleId)
        .toBeGreaterThan(0);
      expect(item.proposedMeasurementConstructs.length, item.ruleId)
        .toBeGreaterThan(0);

      if (item.comparableNeutralFeatureKeys.length === 0) {
        expect(item.currentNeutralFeatureStatus, item.ruleId)
          .toBe('current_none');
      } else {
        expect(item.currentNeutralFeatureStatus, item.ruleId)
          .toBe('specific_comparator_selected');
      }
    }
  });

  it('adjudicates threshold need without authorizing any threshold value or population norm', () => {
    const thresholdStates = new Set([
      'required',
      'construct_definition_first',
      'not_applicable_manual',
    ]);

    for (const item of FR312C_DIRECT_RULE_EQUIVALENCE_STUDY) {
      expect(thresholdStates.has(item.thresholdRequirement), item.ruleId)
        .toBe(true);
      expect(item.thresholdValueAuthorized, item.ruleId).toBe(false);
      expect(item.populationNormAuthorized, item.ruleId).toBe(false);
    }
  });

  it('keeps multi-feature needs descriptive and never grants synthesis authority', () => {
    for (const item of FR312C_DIRECT_RULE_EQUIVALENCE_STUDY) {
      if (
        item.constructCompatibility ===
          'multi_feature_construct_required'
      ) {
        expect(item.multiFeatureRequired, item.ruleId).toBe(true);
      }
      expect(item.multiFeatureSynthesisAuthorized, item.ruleId)
        .toBe(false);
    }
  });

  it('marks missing extractors without mutating or widening FR293 authority', () => {
    const additional = FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
      .filter((item) => item.additionalExtractorRequired);

    expect(additional.length).toBeGreaterThan(
      FR312C_EQUIVALENCE_SUMMARY.additionalExtractorRequired,
    );

    for (const item of additional) {
      expect(item.additionalExtractorMutationAuthorized, item.ruleId)
        .toBe(false);
    }

    expect(
      FR293_PRODUCT_COLUMN_MAP
        .filter((item) =>
          item.implementationState === 'canonical_extractor_materialized')
        .length,
    ).toBe(18);
  });

  it('passes only the smallest threshold-ready subset to the next empirical protocol stage', () => {
    const next = FR312C_DIRECT_RULE_EQUIVALENCE_STUDY
      .filter((item) =>
        item.researchReadiness === 'empirical_protocol_candidate');

    expect(next).toHaveLength(10);
    for (const item of next) {
      expect(item.constructCompatibility, item.ruleId)
        .toBe('threshold_definition_required');
      expect(item.thresholdRequirement, item.ruleId).toBe('required');
      expect(item.comparableNeutralFeatureKeys.length, item.ruleId)
        .toBeGreaterThan(0);
      expect(item.additionalExtractorRequired, item.ruleId).toBe(false);
    }
  });

  it('does not regress FR312A/B or FR311P/Q baselines', () => {
    expect(FR312A_BINDING_SUMMARY.directRules).toBe(230);
    expect(FR312A_BINDING_SUMMARY.directBindingAuthorized).toBe(0);
    expect(FR312B_TRIAGE_SUMMARY.singleRegionSurfaceCandidates).toBe(68);
    expect(FR312B_TRIAGE_SUMMARY.automaticTraditionalBindingsAuthorized)
      .toBe(0);
    expect(FR311P_EVIDENCE_INVENTORY.canonicalEvidence).toBe(621);
    expect(FR311Q_GAP_SUMMARY.totalGapEvidence).toBe(28);
    expect(FR311Q_GAP_SUMMARY.permanentlyUnsupportedProductQuery)
      .toBe(18);
  });

  it('keeps every global FR312C authority gate closed', () => {
    for (const [key, value] of Object.entries(FR312C_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
