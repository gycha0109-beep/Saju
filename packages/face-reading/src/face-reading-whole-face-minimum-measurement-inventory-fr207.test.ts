import { describe, expect, it } from 'vitest';
import {
  FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207,
  assertFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
  issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207,
} from './face-reading-whole-face-minimum-measurement-inventory-fr207.js';

describe('FR207 whole-face minimum measurement inventory', () => {
  it('inventories the whole face in one fixed order', () => {
    const issued = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
    expect(() => assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(issued)).not.toThrow();
    expect(issued.entries.map((entry) => entry.regionKey)).toEqual([
      'forehead', 'eyebrow', 'eye_pair', 'nose', 'mouth_lips', 'ear', 'cheek_mid_face', 'chin_lower_face',
    ]);
  });

  it('separates minimum method from current product readiness', () => {
    const issued = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
    const byKey = new Map(issued.entries.map((entry) => [entry.regionKey, entry] as const));
    expect(byKey.get('nose')).toMatchObject({
      primaryMethod: 'contour_geometry',
      currentReadiness: 'existing_governed_neutral_metric',
      productReadiness: 'research_measurement_reusable_not_product_bound',
    });
    expect(byKey.get('eye_pair')).toMatchObject({
      primaryMethod: 'landmark_geometry',
      currentReadiness: 'existing_research_metric',
      productReadiness: 'research_measurement_reusable_not_product_bound',
    });
    expect(byKey.get('forehead')).toMatchObject({
      primaryMethod: 'image_classifier_or_segmentation',
      currentReadiness: 'image_model_required',
      productReadiness: 'new_image_model_required',
    });
    expect(byKey.get('ear')).toMatchObject({
      primaryMethod: 'image_classifier_or_segmentation',
      currentReadiness: 'unavailable',
      productReadiness: 'new_image_model_required',
    });
  });

  it('reuses existing eye, nose, and mouth neutral assets instead of reopening anatomy', () => {
    const issued = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
    const byKey = new Map(issued.entries.map((entry) => [entry.regionKey, entry] as const));
    expect(byKey.get('eye_pair')?.availableNeutralConstructs).toEqual([
      'mean_eye_cycle_x_span_ratio',
      'mean_eye_cycle_y_span_ratio',
      'mean_eye_cycle_y_to_x_span_ratio',
      'eye_cycle_centroid_separation_ratio',
      'mean_eye_cycle_turning_angle',
    ]);
    expect(byKey.get('nose')?.availableNeutralConstructs).toEqual([
      'nose_bridge_centerline_rms_deviation',
      'nose_tip_contour_circularity',
    ]);
    expect(byKey.get('mouth_lips')?.availableNeutralConstructs).toEqual([
      'mouth_contour_bounding_box_aspect_ratio',
      'mouth_horizontal_span_to_full_mesh_horizontal_span_ratio',
      'role_free_lips_contour_separation_metric',
    ]);
    expect(issued.entries.every((entry) => entry.mayProceedWithoutNewAnatomicalResearch)).toBe(true);
  });

  it('routes appearance and multi-state constructs to the correct method', () => {
    const issued = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
    const byKey = new Map(issued.entries.map((entry) => [entry.regionKey, entry] as const));
    expect(byKey.get('eye_pair')?.imageModelRequiredConstructs).toContain('eyelid_crease_category');
    expect(byKey.get('eye_pair')?.imageModelRequiredConstructs).toContain('ocular_radiance_or_visible_brightness_quality');
    expect(byKey.get('mouth_lips')?.imageModelRequiredConstructs).toEqual(['visible_lip_color']);
    expect(byKey.get('mouth_lips')?.multiStateRequiredConstructs).toEqual(['open_close_relation']);
    expect(byKey.get('forehead')?.imageModelRequiredConstructs).toContain('visible_forehead_hairline_boundary');
    expect(byKey.get('ear')?.imageModelRequiredConstructs).toContain('visible_ear_boundary');
  });

  it('keeps cheek breadth operational and blocks the zygion loop', () => {
    const issued = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
    const cheek = issued.entries.find((entry) => entry.regionKey === 'cheek_mid_face')!;
    expect(cheek.currentReadiness).toBe('operational_candidate');
    expect(cheek.availableNeutralConstructs).toEqual(['raw_full_face_oval_visible_breadth_candidate']);
    expect(cheek.currentlyUnavailableConstructs).toEqual(['anatomical_zygion', 'skeletal_bizygomatic_breadth']);
    expect(cheek.prohibitedShortcuts).toContain('mediapipe_234_454_to_zygion');
    expect(cheek.prohibitedShortcuts).toContain('fr204_factor_to_generic_face_breadth_calibration');
  });

  it('rejects anatomy-first sequencing and authority widening', () => {
    const issued = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
    expect(() => assertFaceReadingWholeFaceMinimumMeasurementInventoryFR207({
      ...issued,
      anatomyEscalation: { ...issued.anatomyEscalation, defaultNextStep: true },
    } as never)).toThrow(/fr207_anatomy_escalation_widened/);

    const widenedCheek = issued.entries.map((entry) => entry.regionKey === 'cheek_mid_face'
      ? { ...entry, currentlyUnavailableConstructs: [] }
      : entry);
    expect(() => assertFaceReadingWholeFaceMinimumMeasurementInventoryFR207({
      ...issued,
      entries: widenedCheek,
    } as never)).toThrow(/fr207_region_contract_drift:cheek_mid_face/);

    expect(() => assertFaceReadingWholeFaceMinimumMeasurementInventoryFR207({
      ...issued,
      authorityBoundary: { ...issued.authorityBoundary, productionActivated: true },
    } as never)).toThrow(/fr207_authority_widening:productionActivated/);

    expect(() => assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207({
      ...FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207,
    })).toThrow(/fr207_unissued_inventory/);
  });

  it('sets cross-face primitive closure as the next frontier', () => {
    const issued = issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207();
    expect(issued.sequencingRule).toEqual([
      'reuse_existing_geometry_first',
      'add_smallest_missing_observable_primitive',
      'use_image_model_only_when_appearance_requires_it',
      'return_unavailable_when_no_reliable_method_exists',
    ]);
    expect(issued.nextFrontier).toBe(
      'close_smallest_missing_observable_primitives_across_whole_face_without_region_by_region_anatomy_campaigns',
    );
  });
});
