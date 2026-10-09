import { describe, expect, it } from 'vitest';
import {
  FR282_RGB_SELFIE_FEATURE_ENTRIES,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R,
} from './traditional-static-missing-region-semantics-fr311r.js';
import {
  STATIC_METHODOLOGIES_FR311S,
} from './traditional-static-structure-methodology-fr311s.js';
import {
  FR311V_AUDIT_SUMMARY,
  FR311V_AUTHORITY_BOUNDARY,
  FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT,
  FR311V_METHODOLOGY_AUDIT,
  FR311V_RULE_AUDIT,
  assertExpandedStaticObservationGapAuditFR311V,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';

describe('FR311V expanded static observation-gap audit', () => {
  it('audits all 30 regional rules and all 16 methodology definitions exactly once', () => {
    assertExpandedStaticObservationGapAuditFR311V();

    expect(STATIC_MISSING_REGION_DIRECT_RULES_FR311R).toHaveLength(30);
    expect(STATIC_METHODOLOGIES_FR311S).toHaveLength(16);
    expect(FR311V_RULE_AUDIT).toHaveLength(30);
    expect(FR311V_METHODOLOGY_AUDIT).toHaveLength(16);
    expect(FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT).toHaveLength(46);

    expect(
      FR311V_RULE_AUDIT.map((item) => item.targetId).sort(),
    ).toEqual(
      STATIC_MISSING_REGION_DIRECT_RULES_FR311R
        .map((item) => item.ruleId)
        .sort(),
    );

    expect(
      FR311V_METHODOLOGY_AUDIT.map((item) => item.targetId).sort(),
    ).toEqual(
      STATIC_METHODOLOGIES_FR311S
        .map((item) => item.methodologyId)
        .sort(),
    );
  });

  it('freezes the research-gap distribution without promoting an empirical candidate', () => {
    expect(FR311V_AUDIT_SUMMARY).toMatchObject({
      ruleTargets: 30,
      methodologyTargets: 16,
      totalTargets: 46,

      currentMaterializedNeutralObservationCandidates: 0,
      neutralObservationExtractorOrAuthorityGaps: 6,
      multiFeatureConstructDefinitionsRequired: 13,
      sourceObservationDefinitionsInsufficient: 3,
      structureOrRegionMapOperationalizationsRequired: 17,
      captureStateOrVisibilityLimited: 4,
      manualOnlyExplicitTraditionalKeyRequired: 1,
      semanticOnlyNoObservationBinding: 2,
      productBindingProhibited: 0,

      neutralObservationConstructResearch: 22,
      regionMapResearch: 17,
      captureProtocolResearch: 4,
      manualOnly: 1,
      semanticOnly: 2,
      prohibited: 0,

      targetsWithAnyCandidateNeutralFeature: 20,
      targetsWithAnyMaterializedCandidate: 10,

      neutralFeatureInventory: 29,
      neutralMaterializedFeatureInventory: 18,
      neutralGapFeatureInventory: 11,

      empiricalValidationStarted: false,
      automaticTraditionalBindingsAuthorized: 0,
      metricThresholdsAuthorized: 0,
      populationNormsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });
  });

  it('preserves the FR282/FR293 neutral observation baseline', () => {
    expect(FR282_RGB_SELFIE_FEATURE_ENTRIES).toHaveLength(29);

    const materialized = FR293_PRODUCT_COLUMN_MAP.filter(
      (item) =>
        item.implementationState === 'canonical_extractor_materialized',
    );
    expect(materialized).toHaveLength(18);
    expect(FR293_PRODUCT_COLUMN_MAP.length - materialized.length).toBe(11);
  });

  it('never treats a same-region or materialized neutral feature as equivalence proof', () => {
    const known = new Set(
      FR282_RGB_SELFIE_FEATURE_ENTRIES.map((item) => item.featureKey),
    );
    const materialized = new Set(
      FR293_PRODUCT_COLUMN_MAP
        .filter((item) =>
          item.implementationState === 'canonical_extractor_materialized')
        .map((item) => item.featureKey),
    );

    let targetsWithMaterialized = 0;

    for (const item of FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT) {
      expect(item.candidateNeutralFeaturesAreEquivalenceProof, item.targetId)
        .toBe(false);

      for (const featureKey of item.candidateNeutralFeatureKeys) {
        expect(known.has(featureKey as never), item.targetId).toBe(true);
      }

      for (const featureKey of item.materializedCandidateFeatureKeys) {
        expect(materialized.has(featureKey as never), item.targetId).toBe(true);
      }

      if (item.materializedCandidateFeatureKeys.length > 0) {
        targetsWithMaterialized += 1;
      }
    }

    expect(targetsWithMaterialized).toBe(10);
    expect(
      FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT.some(
        (item) =>
          item.disposition ===
          'current_materialized_neutral_observation_candidate',
      ),
    ).toBe(false);
  });

  it('keeps bone morphology separate from visible soft-tissue geometry', () => {
    const ids = [
      'fr311r.cheekbones.bilateral_support',
      'fr311r.lower_face.yi_bone.square_horizontal',
      'fr311r.lower_face.han_bone.broad',
      'fr311r.lower_face.han_bone.sharp',
    ];

    for (const id of ids) {
      const item = FR311V_RULE_AUDIT.find(
        (candidate) => candidate.targetId === id,
      );
      expect(item, id).toBeDefined();
      expect(item?.candidateNeutralFeaturesAreEquivalenceProof, id)
        .toBe(false);
      expect(
        item?.disposition ===
          'current_materialized_neutral_observation_candidate',
        id,
      ).toBe(false);
    }
  });

  it('keeps all lineage-specific face maps in region-map research', () => {
    const mapKinds = new Set([
      'five_officers',
      'five_mountains',
      'four_waterways',
      'six_ministries',
      'three_divisions',
      'thirteen_parts',
      'twelve_palaces',
      'five_stars_six_luminaries',
    ]);

    const methodById = new Map(
      STATIC_METHODOLOGIES_FR311S.map(
        (item) => [item.methodologyId, item] as const,
      ),
    );

    for (const audit of FR311V_METHODOLOGY_AUDIT) {
      const method = methodById.get(audit.targetId);
      if (method !== undefined && mapKinds.has(method.structureKind)) {
        expect(
          audit.disposition,
          audit.targetId,
        ).toBe('structure_or_region_map_operationalization_required');
        expect(audit.nextResearchLane, audit.targetId)
          .toBe('region_map_research');
      }
    }
  });

  it('keeps every promotion and validation gate closed', () => {
    for (const item of FR311V_EXPANDED_STATIC_OBSERVATION_GAP_AUDIT) {
      expect(item.empiricalValidationStarted, item.targetId).toBe(false);
      expect(item.automaticTraditionalBindingAuthorized, item.targetId)
        .toBe(false);
      expect(item.providerLandmarkDirectBindingAuthorized, item.targetId)
        .toBe(false);
      expect(item.metricThresholdAuthorized, item.targetId).toBe(false);
      expect(item.populationNormAuthorized, item.targetId).toBe(false);
      expect(item.crossLineageCanonicalMapAuthorized, item.targetId)
        .toBe(false);
      expect(item.multiFeatureSynthesisAuthorized, item.targetId).toBe(false);
      expect(item.namedFormClassifierAuthorized, item.targetId).toBe(false);
      expect(item.productInterpretationAuthorized, item.targetId).toBe(false);
      expect(item.modernScientificFactAuthorized, item.targetId).toBe(false);
    }

    for (const [key, value] of Object.entries(FR311V_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
