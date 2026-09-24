import { describe, expect, it } from 'vitest';
import {
  assertCanonicalRemainingFeatureGapsFR288,
  extractCanonicalRgbSelfieMorphologyFR288,
  materializeCanonicalRemainingFeatureGapsFR288,
} from './canonical-rgb-selfie-morphology-fr288.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import type {
  FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import {
  FR287_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr287.js';

describe('FR288 complete FR282 canonical payload closure', () => {
  it('materializes exactly the seven structurally missing FR282 keys as explicit unavailable entries', () => {
    const features =
      materializeCanonicalRemainingFeatureGapsFR288();

    expect(features.map((feature) => feature.featureKey))
      .toEqual([
        'forehead.visible_width_shape',
        'forehead.visible_hairline_boundary',
        'forehead.relative_surface_curvature',
        'eyebrow.span_arch_tail_orientation',
        'eyebrow.visible_hair_density_texture',
        'ear.visible_boundary_height_shape',
        'ear.thickness_attachment_canal_boundary',
      ]);
    expect(() =>
      assertCanonicalRemainingFeatureGapsFR288(features))
      .not.toThrow();
  });

  it('keeps every newly represented gap fail-closed without fabricated values or semantics', () => {
    const features =
      materializeCanonicalRemainingFeatureGapsFR288();

    for (const feature of features) {
      expect(feature.status).toBe('unavailable');
      expect(feature.fallbackInvented).toBe(false);
      expect(feature.sourceMetricRefs).toEqual([]);
      expect(feature.providerLandmarkIndicesExposed).toBe(false);
      expect(feature.rawLandmarksExposed).toBe(false);
      expect(feature.traditionalBindingApplied).toBe(false);
      expect(feature.classificationApplied).toBe(false);
      expect(feature.thresholdApplied).toBe(false);
    }
  });

  it('preserves the 13 actually materialized FR287 columns and does not promote the seven gaps', () => {
    const materialized = FR287_PRODUCT_COLUMN_MAP.filter(
      (entry) =>
        entry.implementationState ===
          'canonical_extractor_materialized',
    );
    const gaps = FR287_PRODUCT_COLUMN_MAP.filter(
      (entry) =>
        entry.implementationState !==
          'canonical_extractor_materialized',
    );

    expect(materialized).toHaveLength(13);
    expect(gaps).toHaveLength(16);

    const remainingKeys = new Set(
      materializeCanonicalRemainingFeatureGapsFR288()
        .map((feature) => feature.featureKey),
    );
    expect(
      materialized.some((entry) =>
        remainingKeys.has(entry.featureKey as never)),
    ).toBe(false);
  });

  it('keeps ear visible shape visibility-gated and ear internal structure authority-unavailable', () => {
    const features =
      materializeCanonicalRemainingFeatureGapsFR288();

    expect(features.find((feature) =>
      feature.featureKey === 'ear.visible_boundary_height_shape'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'ear_visibility_shape_extractor_not_materialized',
        quality: {
          dependency: 'visibility_gate',
        },
      });

    expect(features.find((feature) =>
      feature.featureKey ===
        'ear.thickness_attachment_canal_boundary'))
      .toMatchObject({
        status: 'unavailable',
        reason:
          'current_rgb_selfie_observation_authority_unavailable',
        quality: {
          dependency: 'currently_unavailable',
        },
      });
  });

  it('rejects forged upstream geometry before a full 29-column payload can be issued', () => {
    expect(() => extractCanonicalRgbSelfieMorphologyFR288(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
      {} as FR287GovernedNeutralNoseGeometryInput,
    )).toThrow(/not issued/u);
  });
});
