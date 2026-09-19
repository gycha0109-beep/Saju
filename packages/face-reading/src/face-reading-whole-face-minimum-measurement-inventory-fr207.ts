import {
  assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206,
  issueFaceReadingObservableMorphologyMeasurementBoundaryFR206,
} from './face-reading-observable-morphology-measurement-boundary-fr206.js';

export type FaceReadingRegionKeyFR207 =
  | 'forehead'
  | 'eyebrow'
  | 'eye_pair'
  | 'nose'
  | 'mouth_lips'
  | 'ear'
  | 'cheek_mid_face'
  | 'chin_lower_face';

export type FaceReadingMinimumMeasurementMethodFR207 =
  | 'landmark_geometry'
  | 'contour_geometry'
  | 'image_classifier_or_segmentation'
  | 'multi_state_capture'
  | 'unavailable';

export type FaceReadingCurrentReadinessFR207 =
  | 'existing_governed_neutral_metric'
  | 'existing_research_metric'
  | 'existing_research_geometry'
  | 'operational_candidate'
  | 'image_model_required'
  | 'unavailable';

export type FaceReadingProductReadinessFR207 =
  | 'neutral_measurement_reusable'
  | 'research_measurement_reusable_not_product_bound'
  | 'small_missing_observable_primitive_required'
  | 'representative_image_validation_required'
  | 'new_image_model_required'
  | 'currently_unavailable';

export interface FaceReadingWholeFaceMeasurementEntryFR207 {
  readonly regionKey: FaceReadingRegionKeyFR207;
  readonly primaryMethod: FaceReadingMinimumMeasurementMethodFR207;
  readonly currentReadiness: FaceReadingCurrentReadinessFR207;
  readonly productReadiness: FaceReadingProductReadinessFR207;
  readonly reusableRefs: readonly string[];
  readonly availableNeutralConstructs: readonly string[];
  readonly smallestMissingObservablePrimitives: readonly string[];
  readonly imageModelRequiredConstructs: readonly string[];
  readonly multiStateRequiredConstructs: readonly string[];
  readonly currentlyUnavailableConstructs: readonly string[];
  readonly traditionalBindingState:
    | 'unresolved'
    | 'research_only'
    | 'partially_source_grounded';
  readonly mayProceedWithoutNewAnatomicalResearch: true;
  readonly prohibitedShortcuts: readonly string[];
}

export interface FaceReadingWholeFaceMinimumMeasurementInventoryFR207 {
  readonly schemaVersion: 'fr207-v1';
  readonly contractId: 'face_reading_whole_face_minimum_measurement_inventory_fr207';
  readonly contractVersion: 'FR207-WHOLE-FACE-MINIMUM-MEASUREMENT-INVENTORY-v1';
  readonly stackedOn: {
    readonly contractId: 'face_reading_observable_morphology_measurement_boundary_fr206';
    readonly contractVersion: 'FR206-OBSERVABLE-MORPHOLOGY-MEASUREMENT-BOUNDARY-v1';
    readonly branchHeadAtStart: '48d7a24ea3219dc3baa24d198537f4506dcc6ee9';
  };
  readonly sequencingRule: readonly [
    'reuse_existing_geometry_first',
    'add_smallest_missing_observable_primitive',
    'use_image_model_only_when_appearance_requires_it',
    'return_unavailable_when_no_reliable_method_exists',
  ];
  readonly anatomyEscalation: {
    readonly defaultNextStep: false;
    readonly allowedOnlyForExplicitAnatomicalClaim: true;
    readonly hiddenAnatomicalConstructCalibrationForbidden: true;
  };
  readonly entries: readonly FaceReadingWholeFaceMeasurementEntryFR207[];
  readonly authorityBoundary: {
    readonly thresholdInvented: false;
    readonly traditionalBindingAutoPromoted: false;
    readonly anatomicalLabelAutoPromoted: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier:
    'close_smallest_missing_observable_primitives_across_whole_face_without_region_by_region_anatomy_campaigns';
}

function entry(
  value: FaceReadingWholeFaceMeasurementEntryFR207,
): FaceReadingWholeFaceMeasurementEntryFR207 {
  return Object.freeze({
    ...value,
    reusableRefs: Object.freeze([...value.reusableRefs]),
    availableNeutralConstructs: Object.freeze([...value.availableNeutralConstructs]),
    smallestMissingObservablePrimitives: Object.freeze([...value.smallestMissingObservablePrimitives]),
    imageModelRequiredConstructs: Object.freeze([...value.imageModelRequiredConstructs]),
    multiStateRequiredConstructs: Object.freeze([...value.multiStateRequiredConstructs]),
    currentlyUnavailableConstructs: Object.freeze([...value.currentlyUnavailableConstructs]),
    prohibitedShortcuts: Object.freeze([...value.prohibitedShortcuts]),
  });
}

export const FR207_WHOLE_FACE_MEASUREMENT_ENTRIES:
readonly FaceReadingWholeFaceMeasurementEntryFR207[] = Object.freeze([
  entry({
    regionKey: 'forehead',
    primaryMethod: 'image_classifier_or_segmentation',
    currentReadiness: 'image_model_required',
    productReadiness: 'new_image_model_required',
    reusableRefs: [
      'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts',
      'packages/face-reading/src/three-divisions.ts',
      'packages/face-reading/src/twelve-palaces-research-v0.ts',
    ],
    availableNeutralConstructs: [],
    smallestMissingObservablePrimitives: [],
    imageModelRequiredConstructs: [
      'visible_forehead_hairline_boundary',
      'visible_forehead_width_and_shape',
    ],
    multiStateRequiredConstructs: [],
    currentlyUnavailableConstructs: [
      'anatomical_forehead_boundary',
    ],
    traditionalBindingState: 'research_only',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'mediapipe_face_oval_to_hairline',
      'traditional_three_divisions_to_physical_forehead_geometry',
      'twelve_palace_locator_to_forehead_classifier',
    ],
  }),
  entry({
    regionKey: 'eyebrow',
    primaryMethod: 'landmark_geometry',
    currentReadiness: 'existing_research_geometry',
    productReadiness: 'small_missing_observable_primitive_required',
    reusableRefs: [
      'packages/face-reading/src/mediapipe-published-eyebrow-component-decomposition-fr39.ts',
      'packages/face-reading/src/mediapipe-eyebrow-component-geometric-role-probe-fr42.ts',
      'packages/face-reading/src/neutral-observation-schema-fr15.ts',
    ],
    availableNeutralConstructs: [
      'provider_brow_component_topology',
      'bilateral_image_vertical_component_signal',
    ],
    smallestMissingObservablePrimitives: [
      'product_brow_span_and_arch_geometry',
      'product_brow_tail_orientation',
    ],
    imageModelRequiredConstructs: [
      'brow_hair_density_or_texture',
    ],
    multiStateRequiredConstructs: [],
    currentlyUnavailableConstructs: [
      'provider_component_as_anatomical_brow_boundary',
    ],
    traditionalBindingState: 'unresolved',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'single_fixture_vertical_signal_to_anatomical_boundary_role',
      'provider_component_order_to_traditional_brow_meaning',
    ],
  }),
  entry({
    regionKey: 'eye_pair',
    primaryMethod: 'landmark_geometry',
    currentReadiness: 'existing_research_metric',
    productReadiness: 'research_measurement_reusable_not_product_bound',
    reusableRefs: [
      'packages/face-reading/src/role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.ts',
      'packages/face-reading/src/eye-pair-geometric-y-span-runtime-fr178.ts',
      'packages/face-reading/src/daruma-eye-morphology-source-review-fr176.ts',
    ],
    availableNeutralConstructs: [
      'mean_eye_cycle_x_span_ratio',
      'mean_eye_cycle_y_span_ratio',
      'mean_eye_cycle_y_to_x_span_ratio',
      'eye_cycle_centroid_separation_ratio',
      'mean_eye_cycle_turning_angle',
    ],
    smallestMissingObservablePrimitives: [
      'eye_tail_orientation_angle',
      'product_individual_eye_asymmetry_surface',
    ],
    imageModelRequiredConstructs: [
      'eyelid_crease_category',
      'hooded_eyelid_category',
      'ocular_radiance_or_visible_brightness_quality',
    ],
    multiStateRequiredConstructs: [],
    currentlyUnavailableConstructs: [
      'traditional_cun_absolute_eye_length',
    ],
    traditionalBindingState: 'partially_source_grounded',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'mean_x_span_to_traditional_long_without_binding',
      'y_to_x_ratio_to_traditional_thin_without_binding',
      'turning_angle_to_triangle_eye_classifier_without_threshold',
      'landmark_geometry_to_eyelid_crease_guess',
    ],
  }),
  entry({
    regionKey: 'nose',
    primaryMethod: 'contour_geometry',
    currentReadiness: 'existing_governed_neutral_metric',
    productReadiness: 'research_measurement_reusable_not_product_bound',
    reusableRefs: [
      'packages/face-reading/src/nose-geometry.ts',
      'packages/face-reading/src/neutral-observation-schema-fr15.ts',
    ],
    availableNeutralConstructs: [
      'nose_bridge_centerline_rms_deviation',
      'nose_tip_contour_circularity',
    ],
    smallestMissingObservablePrimitives: [
      'profile_tip_projection_or_fullness_geometry',
    ],
    imageModelRequiredConstructs: [],
    multiStateRequiredConstructs: [],
    currentlyUnavailableConstructs: [
      'traditional_anchor_identity_shangen_nianshou_zhuntou_from_provider_index',
    ],
    traditionalBindingState: 'unresolved',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'tip_circularity_to_tip_fullness',
      'provider_nose_index_to_traditional_anchor_identity',
      'neutral_metric_to_traditional_state_without_authorized_binding',
    ],
  }),
  entry({
    regionKey: 'mouth_lips',
    primaryMethod: 'contour_geometry',
    currentReadiness: 'existing_governed_neutral_metric',
    productReadiness: 'research_measurement_reusable_not_product_bound',
    reusableRefs: [
      'packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts',
      'packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts',
      'packages/face-reading/src/role-free-arclength-mean-neutral-metric-definition-review-fr97.ts',
      'packages/face-reading/src/five-officers-intake-criterion-semantic-operationalization-research-fr132.ts',
    ],
    availableNeutralConstructs: [
      'mouth_contour_bounding_box_aspect_ratio',
      'mouth_horizontal_span_to_full_mesh_horizontal_span_ratio',
      'role_free_lips_contour_separation_metric',
    ],
    smallestMissingObservablePrimitives: [
      'mouth_outline_angularity_or_rectilinearity',
      'visible_lip_fullness_with_governed_boundary_roles',
      'mouth_corner_orientation',
    ],
    imageModelRequiredConstructs: [
      'visible_lip_color',
    ],
    multiStateRequiredConstructs: [
      'open_close_relation',
    ],
    currentlyUnavailableConstructs: [
      'traditional_duan_component_of_duan_hou',
    ],
    traditionalBindingState: 'partially_source_grounded',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'aspect_ratio_alone_to_fang_da',
      'contour_separation_to_duan_hou',
      'static_single_capture_to_open_close_relation',
      'uncalibrated_color_to_traditional_red_lips',
    ],
  }),
  entry({
    regionKey: 'ear',
    primaryMethod: 'image_classifier_or_segmentation',
    currentReadiness: 'unavailable',
    productReadiness: 'new_image_model_required',
    reusableRefs: [
      'packages/face-reading/src/five-officers-six-fus-research-v0.ts',
      'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts',
      'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts',
    ],
    availableNeutralConstructs: [],
    smallestMissingObservablePrimitives: [],
    imageModelRequiredConstructs: [
      'visible_ear_boundary',
      'ear_height_relative_to_brow_line',
      'visible_ear_shape',
    ],
    multiStateRequiredConstructs: [],
    currentlyUnavailableConstructs: [
      'ear_thickness',
      'ear_to_head_attachment',
      'ear_canal_gate_boundary',
    ],
    traditionalBindingState: 'research_only',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'five_officers_ear_text_to_provider_geometry',
      'profile_capture_presence_to_ear_visibility_guarantee',
      'face_landmark_mesh_to_ear_boundary',
    ],
  }),
  entry({
    regionKey: 'cheek_mid_face',
    primaryMethod: 'contour_geometry',
    currentReadiness: 'operational_candidate',
    productReadiness: 'representative_image_validation_required',
    reusableRefs: [
      'packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts',
      'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts',
    ],
    availableNeutralConstructs: [
      'raw_full_face_oval_visible_breadth_candidate',
    ],
    smallestMissingObservablePrimitives: [
      'visible_midface_band_width',
      'cheek_contour_prominence',
    ],
    imageModelRequiredConstructs: [],
    multiStateRequiredConstructs: [],
    currentlyUnavailableConstructs: [
      'anatomical_zygion',
      'skeletal_bizygomatic_breadth',
    ],
    traditionalBindingState: 'research_only',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'mediapipe_234_454_to_zygion',
      'raw_face_oval_width_to_skeletal_bizygomatic_breadth',
      'fr204_factor_to_generic_face_breadth_calibration',
      'six_fus_to_neutral_cheek_geometry',
    ],
  }),
  entry({
    regionKey: 'chin_lower_face',
    primaryMethod: 'contour_geometry',
    currentReadiness: 'existing_research_geometry',
    productReadiness: 'small_missing_observable_primitive_required',
    reusableRefs: [
      'packages/face-reading/src/chin-inferior-neutral-validation-fr46.ts',
      'packages/face-reading/src/provider-independent-chin-contour-geometry-fr50.ts',
      'packages/face-reading/src/central-chin-reference-trace-protocol-fr54.ts',
    ],
    availableNeutralConstructs: [
      'provider_independent_lower_face_contour_operationalization_evidence',
      'central_chin_sparse_scaffold_protocol',
    ],
    smallestMissingObservablePrimitives: [
      'canonical_product_2d_chin_contour_projection',
      'visible_lower_face_width_ratio',
    ],
    imageModelRequiredConstructs: [],
    multiStateRequiredConstructs: [],
    currentlyUnavailableConstructs: [
      'image_only_mandibular_bone_boundary',
    ],
    traditionalBindingState: 'unresolved',
    mayProceedWithoutNewAnatomicalResearch: true,
    prohibitedShortcuts: [
      'sparse_chin_scaffold_to_complete_jaw_contour',
      'provider_face_oval_to_reviewed_chin_contour',
      'soft_tissue_contour_to_mandibular_bone_boundary',
    ],
  }),
]);

export const FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207:
FaceReadingWholeFaceMinimumMeasurementInventoryFR207 = Object.freeze({
  schemaVersion: 'fr207-v1',
  contractId: 'face_reading_whole_face_minimum_measurement_inventory_fr207',
  contractVersion: 'FR207-WHOLE-FACE-MINIMUM-MEASUREMENT-INVENTORY-v1',
  stackedOn: Object.freeze({
    contractId: 'face_reading_observable_morphology_measurement_boundary_fr206',
    contractVersion: 'FR206-OBSERVABLE-MORPHOLOGY-MEASUREMENT-BOUNDARY-v1',
    branchHeadAtStart: '48d7a24ea3219dc3baa24d198537f4506dcc6ee9',
  }),
  sequencingRule: Object.freeze([
    'reuse_existing_geometry_first',
    'add_smallest_missing_observable_primitive',
    'use_image_model_only_when_appearance_requires_it',
    'return_unavailable_when_no_reliable_method_exists',
  ] as const),
  anatomyEscalation: Object.freeze({
    defaultNextStep: false,
    allowedOnlyForExplicitAnatomicalClaim: true,
    hiddenAnatomicalConstructCalibrationForbidden: true,
  }),
  entries: FR207_WHOLE_FACE_MEASUREMENT_ENTRIES,
  authorityBoundary: Object.freeze({
    thresholdInvented: false,
    traditionalBindingAutoPromoted: false,
    anatomicalLabelAutoPromoted: false,
    productionActivated: false,
    commerceActivated: false,
  }),
  nextFrontier:
    'close_smallest_missing_observable_primitives_across_whole_face_without_region_by_region_anatomy_campaigns',
});

const REQUIRED_REGION_ORDER: readonly FaceReadingRegionKeyFR207[] = Object.freeze([
  'forehead',
  'eyebrow',
  'eye_pair',
  'nose',
  'mouth_lips',
  'ear',
  'cheek_mid_face',
  'chin_lower_face',
]);

function sameStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

function assertNoDuplicates(values: readonly string[], label: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr207_duplicate_${label}`);
}

export function assertFaceReadingWholeFaceMinimumMeasurementInventoryFR207(
  value: FaceReadingWholeFaceMinimumMeasurementInventoryFR207,
): void {
  const fr206 = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();
  assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206(fr206);

  if (value.schemaVersion !== 'fr207-v1') throw new Error('fr207_schema_version_mismatch');
  if (value.contractId !== 'face_reading_whole_face_minimum_measurement_inventory_fr207') {
    throw new Error('fr207_contract_id_mismatch');
  }
  if (value.contractVersion !== 'FR207-WHOLE-FACE-MINIMUM-MEASUREMENT-INVENTORY-v1') {
    throw new Error('fr207_contract_version_mismatch');
  }
  if (
    value.stackedOn.contractId !== fr206.contractId ||
    value.stackedOn.contractVersion !== fr206.contractVersion ||
    value.stackedOn.branchHeadAtStart !== '48d7a24ea3219dc3baa24d198537f4506dcc6ee9'
  ) throw new Error('fr207_fr206_stack_boundary_drift');

  if (!sameStrings(value.sequencingRule, [
    'reuse_existing_geometry_first',
    'add_smallest_missing_observable_primitive',
    'use_image_model_only_when_appearance_requires_it',
    'return_unavailable_when_no_reliable_method_exists',
  ])) throw new Error('fr207_sequencing_rule_drift');

  if (
    value.anatomyEscalation.defaultNextStep !== false ||
    value.anatomyEscalation.allowedOnlyForExplicitAnatomicalClaim !== true ||
    value.anatomyEscalation.hiddenAnatomicalConstructCalibrationForbidden !== true
  ) throw new Error('fr207_anatomy_escalation_widened');

  const regionKeys = value.entries.map((candidate) => candidate.regionKey);
  if (!sameStrings(regionKeys, REQUIRED_REGION_ORDER)) {
    throw new Error('fr207_region_inventory_incomplete_or_reordered');
  }
  assertNoDuplicates(regionKeys, 'region_key');

  for (const candidate of value.entries) {
    const expected = FR207_WHOLE_FACE_MEASUREMENT_ENTRIES.find(
      (item) => item.regionKey === candidate.regionKey,
    );
    if (!expected) throw new Error(`fr207_unknown_region:${candidate.regionKey}`);
    if (candidate.primaryMethod !== expected.primaryMethod) {
      throw new Error(`fr207_primary_method_drift:${candidate.regionKey}`);
    }
    if (candidate.currentReadiness !== expected.currentReadiness) {
      throw new Error(`fr207_readiness_drift:${candidate.regionKey}`);
    }
    if (candidate.productReadiness !== expected.productReadiness) {
      throw new Error(`fr207_product_readiness_drift:${candidate.regionKey}`);
    }
    if (!sameStrings(candidate.reusableRefs, expected.reusableRefs) ||
        !sameStrings(candidate.availableNeutralConstructs, expected.availableNeutralConstructs) ||
        !sameStrings(candidate.smallestMissingObservablePrimitives, expected.smallestMissingObservablePrimitives) ||
        !sameStrings(candidate.imageModelRequiredConstructs, expected.imageModelRequiredConstructs) ||
        !sameStrings(candidate.multiStateRequiredConstructs, expected.multiStateRequiredConstructs) ||
        !sameStrings(candidate.currentlyUnavailableConstructs, expected.currentlyUnavailableConstructs) ||
        !sameStrings(candidate.prohibitedShortcuts, expected.prohibitedShortcuts)) {
      throw new Error(`fr207_region_contract_drift:${candidate.regionKey}`);
    }
    if (candidate.traditionalBindingState !== expected.traditionalBindingState) {
      throw new Error(`fr207_traditional_binding_state_drift:${candidate.regionKey}`);
    }
    if (candidate.mayProceedWithoutNewAnatomicalResearch !== true) {
      throw new Error(`fr207_anatomical_research_incorrectly_required:${candidate.regionKey}`);
    }
    assertNoDuplicates(candidate.reusableRefs, `refs:${candidate.regionKey}`);
    assertNoDuplicates(candidate.availableNeutralConstructs, `constructs:${candidate.regionKey}`);
    assertNoDuplicates(candidate.prohibitedShortcuts, `shortcuts:${candidate.regionKey}`);
  }

  const forehead = value.entries.find((item) => item.regionKey === 'forehead')!;
  const ear = value.entries.find((item) => item.regionKey === 'ear')!;
  const cheek = value.entries.find((item) => item.regionKey === 'cheek_mid_face')!;
  const eye = value.entries.find((item) => item.regionKey === 'eye_pair')!;
  const mouth = value.entries.find((item) => item.regionKey === 'mouth_lips')!;

  if (
    forehead.currentReadiness !== 'image_model_required' ||
    ear.currentReadiness !== 'unavailable' ||
    cheek.currentReadiness !== 'operational_candidate' ||
    !cheek.currentlyUnavailableConstructs.includes('anatomical_zygion') ||
    !eye.imageModelRequiredConstructs.includes('eyelid_crease_category') ||
    !mouth.multiStateRequiredConstructs.includes('open_close_relation')
  ) throw new Error('fr207_fail_closed_boundaries_drift');

  for (const [key, authorized] of Object.entries(value.authorityBoundary)) {
    if (authorized !== false) throw new Error(`fr207_authority_widening:${key}`);
  }

  if (value.nextFrontier !==
      'close_smallest_missing_observable_primitives_across_whole_face_without_region_by_region_anatomy_campaigns') {
    throw new Error('fr207_next_frontier_drift');
  }
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingWholeFaceMinimumMeasurementInventoryFR207():
FaceReadingWholeFaceMinimumMeasurementInventoryFR207 {
  assertFaceReadingWholeFaceMinimumMeasurementInventoryFR207(
    FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207,
  );
  ISSUED.add(FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207);
  return FACE_READING_WHOLE_FACE_MINIMUM_MEASUREMENT_INVENTORY_FR207;
}

export function assertIssuedFaceReadingWholeFaceMinimumMeasurementInventoryFR207(
  value: FaceReadingWholeFaceMinimumMeasurementInventoryFR207,
): void {
  assertFaceReadingWholeFaceMinimumMeasurementInventoryFR207(value);
  if (!ISSUED.has(value as object)) throw new Error('fr207_unissued_inventory');
}
