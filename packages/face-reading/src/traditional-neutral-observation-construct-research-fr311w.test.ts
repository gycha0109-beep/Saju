import { describe, expect, it } from 'vitest';
import {
  FR282_RGB_SELFIE_FEATURE_ENTRIES,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR311V_RULE_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';
import {
  FR311W_AUTHORITY_BOUNDARY,
  FR311W_NEUTRAL_CONSTRUCT_CATALOG,
  FR311W_RESEARCH_SUMMARY,
  FR311W_TARGET_CONSTRUCT_RESEARCH,
  assertNeutralObservationConstructResearchFR311W,
} from './traditional-neutral-observation-construct-research-fr311w.js';

describe('FR311W neutral observation construct research', () => {
  it('covers exactly the 22 FR311V neutral-observation research targets', () => {
    assertNeutralObservationConstructResearchFR311W();

    const expected = FR311V_RULE_AUDIT
      .filter((item) =>
        item.nextResearchLane === 'neutral_observation_construct_research')
      .map((item) => item.targetId)
      .sort();

    expect(expected).toHaveLength(22);
    expect(
      FR311W_TARGET_CONSTRUCT_RESEARCH
        .map((item) => item.targetId)
        .sort(),
    ).toEqual(expected);
  });

  it('freezes the construct catalog and research resolutions', () => {
    expect(FR311W_RESEARCH_SUMMARY).toMatchObject({
      targetCount: 22,
      neutralConstructCatalogSize: 28,
      proposedNewNeutralSurfaceCount: 16,
      registeredFeatureReuseCount: 5,
      registeredFeatureNotMaterializedCount: 5,
      outsideStaticGeometryScopeCount: 1,
      ordinaryRgbProxyNotAuthorizedCount: 1,

      registeredSurfaceNotMaterializedTargets: 3,
      extractorResearchRequiredTargets: 15,
      existingGeometryOnlyTargets: 0,
      partialGeometryOutOfScopeTargets: 1,
      ordinaryRgbSkeletalProxyRejectedTargets: 3,

      empiricalValidationEligibleTargets: 0,
      automaticTraditionalBindingsAuthorized: 0,
      metricThresholdsAuthorized: 0,
      populationNormsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });
  });

  it('preserves the current neutral observation inventory without silently materializing proposed surfaces', () => {
    expect(FR282_RGB_SELFIE_FEATURE_ENTRIES).toHaveLength(29);

    const materialized = FR293_PRODUCT_COLUMN_MAP.filter(
      (item) =>
        item.implementationState === 'canonical_extractor_materialized',
    );
    expect(materialized).toHaveLength(18);

    const proposed = FR311W_NEUTRAL_CONSTRUCT_CATALOG.filter(
      (item) => item.status === 'new_neutral_surface_definition',
    );
    expect(proposed).toHaveLength(16);
    expect(
      proposed.every(
        (item) =>
          !FR282_RGB_SELFIE_FEATURE_ENTRIES.some(
            (feature) => feature.featureKey === item.constructKey,
          ),
      ),
    ).toBe(true);
  });

  it('keeps visible soft-tissue measurements distinct from skeletal claims', () => {
    const rejectedIds = [
      'fr311r.lower_face.yi_bone.square_horizontal',
      'fr311r.lower_face.han_bone.broad',
      'fr311r.lower_face.han_bone.sharp',
    ];

    for (const id of rejectedIds) {
      const target = FR311W_TARGET_CONSTRUCT_RESEARCH.find(
        (item) => item.targetId === id,
      );
      expect(target, id).toBeDefined();
      expect(target?.resolution, id)
        .toBe('ordinary_rgb_skeletal_proxy_rejected');
      expect(target?.blockedComponentKeys, id).toContain(
        'blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb',
      );
      expect(target?.sourceToVisibleEquivalenceEstablished, id).toBe(false);
    }

    const blocked = FR311W_NEUTRAL_CONSTRUCT_CATALOG.find(
      (item) =>
        item.constructKey ===
        'blocked.mandibular_or_zygomatic_bone_from_ordinary_rgb',
    );
    expect(blocked?.status).toBe('ordinary_rgb_proxy_not_authorized');
    expect(blocked?.boneClaimForbidden).toBe(true);
  });

  it('keeps the static lustre component outside V1 static geometry rather than inventing an image proxy', () => {
    const construct = FR311W_NEUTRAL_CONSTRUCT_CATALOG.find(
      (item) => item.constructKey === 'blocked.static_surface_lustre',
    );
    expect(construct?.status).toBe('outside_v1_static_geometry_scope');
    expect(construct?.method).toBe('appearance');

    const target = FR311W_TARGET_CONSTRUCT_RESEARCH.find(
      (item) => item.targetId === 'fr311r.forehead.bright_square_long',
    );
    expect(target?.resolution)
      .toBe('partial_geometry_only_out_of_scope_component');
    expect(target?.blockedComponentKeys)
      .toContain('blocked.static_surface_lustre');
  });

  it('does not authorize automatic synthesis of compound constructs', () => {
    const compounds = FR311W_TARGET_CONSTRUCT_RESEARCH.filter(
      (item) => item.compoundConstruct,
    );
    expect(compounds.length).toBeGreaterThan(0);

    for (const item of compounds) {
      expect(item.automaticSynthesisAuthorized, item.targetId).toBe(false);
      expect(item.empiricalValidationEligible, item.targetId).toBe(false);
      expect(item.extractorImplementationAuthorizedByThisStudy, item.targetId)
        .toBe(false);
    }
  });

  it('keeps every promotion gate closed', () => {
    for (const item of FR311W_TARGET_CONSTRUCT_RESEARCH) {
      expect(item.sourceToVisibleEquivalenceEstablished, item.targetId)
        .toBe(false);
      expect(item.empiricalValidationEligible, item.targetId).toBe(false);
      expect(item.automaticTraditionalBindingAuthorized, item.targetId)
        .toBe(false);
      expect(item.metricThresholdAuthorized, item.targetId).toBe(false);
      expect(item.populationNormAuthorized, item.targetId).toBe(false);
      expect(item.productInterpretationAuthorized, item.targetId).toBe(false);
    }

    for (const [key, value] of Object.entries(FR311W_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
