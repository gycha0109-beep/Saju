export type FaceReadingMeasurementTargetClassFR206 =
  | 'observable_morphology'
  | 'anatomical_structure';

export type FaceReadingMeasurementMethodFR206 =
  | 'landmark_geometry'
  | 'contour_geometry'
  | 'image_classifier_or_segmentation'
  | 'unsupported';

export interface FaceReadingMeasurementClassRuleFR206 {
  readonly targetClass: FaceReadingMeasurementTargetClassFR206;
  readonly accuracyTarget:
    | 'declared_image_visible_construct'
    | 'independent_anatomical_ground_truth_correspondence';
  readonly anatomicalGroundTruthRequiredByDefault: boolean;
  readonly mayBlockObservableMorphologyWhenNoAnatomicalClaimExists: false;
}

export interface FaceReadingObservableMorphologyPolicyFR206 {
  readonly schemaVersion: 'fr206-v1';
  readonly contractId: 'face_reading_observable_morphology_measurement_boundary_fr206';
  readonly contractVersion: 'FR206-OBSERVABLE-MORPHOLOGY-MEASUREMENT-BOUNDARY-v1';
  readonly baselineMainSha: '5f84d21710d2a912c04b2533f02d4d661972ecb4';
  readonly productDefaultTargetClass: 'observable_morphology';
  readonly properMeasurementDefinition: {
    readonly repeatableMeasurementOfDeclaredConstruct: true;
    readonly governedCaptureOrQualityConditionRequired: true;
    readonly labelMustNotExceedMeasuredConstruct: true;
    readonly anatomyEquivalenceRequiredForEveryMorphologyMetric: false;
  };
  readonly classRules: readonly [
    FaceReadingMeasurementClassRuleFR206,
    FaceReadingMeasurementClassRuleFR206,
  ];
  readonly escalationRule: {
    readonly anatomicalValidationRequiredOnlyWhenOutputMakesAnatomicalClaim: true;
    readonly proxyMayBeRelabeledAsAnatomy: false;
    readonly anatomicalResearchMayAutoBecomeNextFrontier: false;
  };
  readonly cheekMidFace: {
    readonly targetClass: 'observable_morphology';
    readonly allowedOperationalLabels: readonly [
      'visible_face_breadth',
      'visible_midface_width',
      'cheek_contour_prominence',
    ];
    readonly forbiddenAnatomicalLabels: readonly [
      'zygion',
      'bizygomatic_breadth',
      'true_zygomatic_bone_width',
    ];
    readonly mediaPipe234454MayBeCalledZygion: false;
    readonly rawFaceOvalMayBeCalledSkeletalBizygomaticBreadth: false;
    readonly fr204GenericCalibrationFactorAuthorized: false;
    readonly fr204GenericCalibrationFactor: 0.8185802384926992;
    readonly rawFullOvalMayAdvanceAsOperationalFaceBreadthCandidate: true;
    readonly additionalZygionValidationBlocksOperationalUse: false;
    readonly productValidationScope:
      'capture_robustness_construct_consistency_and_generalization_only';
  };
  readonly eye: {
    readonly targetClass: 'observable_morphology';
    readonly geometryBackedAxes: readonly [
      'eye_width_height_ratio',
      'canthal_tilt',
      'inter_eye_spacing_ratio',
      'bilateral_shape_asymmetry',
    ];
    readonly geometryMethods: readonly [
      'landmark_geometry',
      'landmark_geometry',
      'landmark_geometry',
      'landmark_geometry',
    ];
    readonly requiresImageModelOrUnavailable: readonly [
      'eyelid_crease_category',
      'hooded_eyelid_category',
    ];
    readonly unsupportedMayBeGuessedFromUnrelatedGeometry: false;
  };
  readonly layerBoundary: {
    readonly physicalObservationEqualsTraditionalRegion: false;
    readonly traditionalMorphologyTermEqualsModernAnatomyByDefault: false;
    readonly morphologyMeasurementAccuracyEqualsTraditionalPredictiveValidity: false;
    readonly unsupportedObservationDisposition: 'unavailable';
  };
  readonly authorityBoundary: {
    readonly newZygionCampaignAuthorized: false;
    readonly new3DScanAcquisitionAuthorized: false;
    readonly skeletalCalibrationAuthorized: false;
    readonly traditionalPredictiveValidityClaimAuthorized: false;
    readonly productionActivationAuthorized: false;
    readonly commerceActivationAuthorized: false;
  };
  readonly nextFrontier:
    'inventory_whole_face_traditional_observable_terms_and_bind_minimum_sufficient_measurement_method';
}

const OBSERVABLE_RULE: FaceReadingMeasurementClassRuleFR206 = Object.freeze({
  targetClass: 'observable_morphology',
  accuracyTarget: 'declared_image_visible_construct',
  anatomicalGroundTruthRequiredByDefault: false,
  mayBlockObservableMorphologyWhenNoAnatomicalClaimExists: false,
});

const ANATOMICAL_RULE: FaceReadingMeasurementClassRuleFR206 = Object.freeze({
  targetClass: 'anatomical_structure',
  accuracyTarget: 'independent_anatomical_ground_truth_correspondence',
  anatomicalGroundTruthRequiredByDefault: true,
  mayBlockObservableMorphologyWhenNoAnatomicalClaimExists: false,
});

export const FACE_READING_OBSERVABLE_MORPHOLOGY_MEASUREMENT_BOUNDARY_FR206:
FaceReadingObservableMorphologyPolicyFR206 = Object.freeze({
  schemaVersion: 'fr206-v1',
  contractId: 'face_reading_observable_morphology_measurement_boundary_fr206',
  contractVersion: 'FR206-OBSERVABLE-MORPHOLOGY-MEASUREMENT-BOUNDARY-v1',
  baselineMainSha: '5f84d21710d2a912c04b2533f02d4d661972ecb4',
  productDefaultTargetClass: 'observable_morphology',
  properMeasurementDefinition: Object.freeze({
    repeatableMeasurementOfDeclaredConstruct: true,
    governedCaptureOrQualityConditionRequired: true,
    labelMustNotExceedMeasuredConstruct: true,
    anatomyEquivalenceRequiredForEveryMorphologyMetric: false,
  }),
  classRules: Object.freeze([OBSERVABLE_RULE, ANATOMICAL_RULE] as const),
  escalationRule: Object.freeze({
    anatomicalValidationRequiredOnlyWhenOutputMakesAnatomicalClaim: true,
    proxyMayBeRelabeledAsAnatomy: false,
    anatomicalResearchMayAutoBecomeNextFrontier: false,
  }),
  cheekMidFace: Object.freeze({
    targetClass: 'observable_morphology',
    allowedOperationalLabels: Object.freeze([
      'visible_face_breadth',
      'visible_midface_width',
      'cheek_contour_prominence',
    ] as const),
    forbiddenAnatomicalLabels: Object.freeze([
      'zygion',
      'bizygomatic_breadth',
      'true_zygomatic_bone_width',
    ] as const),
    mediaPipe234454MayBeCalledZygion: false,
    rawFaceOvalMayBeCalledSkeletalBizygomaticBreadth: false,
    fr204GenericCalibrationFactorAuthorized: false,
    fr204GenericCalibrationFactor: 0.8185802384926992,
    rawFullOvalMayAdvanceAsOperationalFaceBreadthCandidate: true,
    additionalZygionValidationBlocksOperationalUse: false,
    productValidationScope:
      'capture_robustness_construct_consistency_and_generalization_only',
  }),
  eye: Object.freeze({
    targetClass: 'observable_morphology',
    geometryBackedAxes: Object.freeze([
      'eye_width_height_ratio',
      'canthal_tilt',
      'inter_eye_spacing_ratio',
      'bilateral_shape_asymmetry',
    ] as const),
    geometryMethods: Object.freeze([
      'landmark_geometry',
      'landmark_geometry',
      'landmark_geometry',
      'landmark_geometry',
    ] as const),
    requiresImageModelOrUnavailable: Object.freeze([
      'eyelid_crease_category',
      'hooded_eyelid_category',
    ] as const),
    unsupportedMayBeGuessedFromUnrelatedGeometry: false,
  }),
  layerBoundary: Object.freeze({
    physicalObservationEqualsTraditionalRegion: false,
    traditionalMorphologyTermEqualsModernAnatomyByDefault: false,
    morphologyMeasurementAccuracyEqualsTraditionalPredictiveValidity: false,
    unsupportedObservationDisposition: 'unavailable',
  }),
  authorityBoundary: Object.freeze({
    newZygionCampaignAuthorized: false,
    new3DScanAcquisitionAuthorized: false,
    skeletalCalibrationAuthorized: false,
    traditionalPredictiveValidityClaimAuthorized: false,
    productionActivationAuthorized: false,
    commerceActivationAuthorized: false,
  }),
  nextFrontier:
    'inventory_whole_face_traditional_observable_terms_and_bind_minimum_sufficient_measurement_method',
});

function sameStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

export function classifyFaceReadingMeasurementTargetFR206(input: {
  readonly outputLabel: string;
  readonly explicitlyClaimsAnatomicalStructure: boolean;
}): FaceReadingMeasurementTargetClassFR206 {
  return input.explicitlyClaimsAnatomicalStructure
    ? 'anatomical_structure'
    : 'observable_morphology';
}

export function requiredValidationForFaceReadingMeasurementFR206(
  targetClass: FaceReadingMeasurementTargetClassFR206,
): 'observable_construct_validation' | 'independent_anatomical_correspondence' {
  return targetClass === 'anatomical_structure'
    ? 'independent_anatomical_correspondence'
    : 'observable_construct_validation';
}

export function dispositionUnsupportedObservationFR206(
  method: FaceReadingMeasurementMethodFR206,
): 'measure' | 'unavailable' {
  return method === 'unsupported' ? 'unavailable' : 'measure';
}

export function assertFaceReadingObservableMorphologyMeasurementBoundaryFR206(
  value: FaceReadingObservableMorphologyPolicyFR206,
): void {
  if (value.schemaVersion !== 'fr206-v1') throw new Error('fr206_schema_version_mismatch');
  if (value.contractId !== 'face_reading_observable_morphology_measurement_boundary_fr206') {
    throw new Error('fr206_contract_id_mismatch');
  }
  if (value.contractVersion !== 'FR206-OBSERVABLE-MORPHOLOGY-MEASUREMENT-BOUNDARY-v1') {
    throw new Error('fr206_contract_version_mismatch');
  }
  if (value.baselineMainSha !== '5f84d21710d2a912c04b2533f02d4d661972ecb4') {
    throw new Error('fr206_baseline_main_mismatch');
  }
  if (value.productDefaultTargetClass !== 'observable_morphology') {
    throw new Error('fr206_product_default_must_be_observable');
  }

  const definition = value.properMeasurementDefinition;
  if (!definition.repeatableMeasurementOfDeclaredConstruct ||
      !definition.governedCaptureOrQualityConditionRequired ||
      !definition.labelMustNotExceedMeasuredConstruct ||
      definition.anatomyEquivalenceRequiredForEveryMorphologyMetric !== false) {
    throw new Error('fr206_proper_measurement_definition_widened');
  }

  if (value.classRules.length !== 2 ||
      value.classRules[0].targetClass !== 'observable_morphology' ||
      value.classRules[0].accuracyTarget !== 'declared_image_visible_construct' ||
      value.classRules[0].anatomicalGroundTruthRequiredByDefault !== false ||
      value.classRules[1].targetClass !== 'anatomical_structure' ||
      value.classRules[1].accuracyTarget !== 'independent_anatomical_ground_truth_correspondence' ||
      value.classRules[1].anatomicalGroundTruthRequiredByDefault !== true) {
    throw new Error('fr206_measurement_class_rules_drift');
  }
  for (const rule of value.classRules) {
    if (rule.mayBlockObservableMorphologyWhenNoAnatomicalClaimExists !== false) {
      throw new Error('fr206_anatomy_may_not_block_observable_without_claim');
    }
  }

  if (!value.escalationRule.anatomicalValidationRequiredOnlyWhenOutputMakesAnatomicalClaim ||
      value.escalationRule.proxyMayBeRelabeledAsAnatomy !== false ||
      value.escalationRule.anatomicalResearchMayAutoBecomeNextFrontier !== false) {
    throw new Error('fr206_anatomical_escalation_widened');
  }

  const cheek = value.cheekMidFace;
  if (cheek.targetClass !== 'observable_morphology') throw new Error('fr206_cheek_target_class_drift');
  if (!sameStrings(cheek.allowedOperationalLabels, [
    'visible_face_breadth',
    'visible_midface_width',
    'cheek_contour_prominence',
  ])) throw new Error('fr206_cheek_operational_labels_drift');
  if (!sameStrings(cheek.forbiddenAnatomicalLabels, [
    'zygion',
    'bizygomatic_breadth',
    'true_zygomatic_bone_width',
  ])) throw new Error('fr206_cheek_forbidden_labels_drift');
  if (cheek.mediaPipe234454MayBeCalledZygion !== false ||
      cheek.rawFaceOvalMayBeCalledSkeletalBizygomaticBreadth !== false ||
      cheek.fr204GenericCalibrationFactorAuthorized !== false ||
      cheek.fr204GenericCalibrationFactor !== 0.8185802384926992 ||
      cheek.rawFullOvalMayAdvanceAsOperationalFaceBreadthCandidate !== true ||
      cheek.additionalZygionValidationBlocksOperationalUse !== false ||
      cheek.productValidationScope !==
        'capture_robustness_construct_consistency_and_generalization_only') {
    throw new Error('fr206_cheek_boundary_widened');
  }

  const eye = value.eye;
  if (eye.targetClass !== 'observable_morphology') throw new Error('fr206_eye_target_class_drift');
  if (!sameStrings(eye.geometryBackedAxes, [
    'eye_width_height_ratio',
    'canthal_tilt',
    'inter_eye_spacing_ratio',
    'bilateral_shape_asymmetry',
  ])) throw new Error('fr206_eye_geometry_axes_drift');
  if (!sameStrings(eye.geometryMethods, [
    'landmark_geometry',
    'landmark_geometry',
    'landmark_geometry',
    'landmark_geometry',
  ])) throw new Error('fr206_eye_geometry_method_drift');
  if (!sameStrings(eye.requiresImageModelOrUnavailable, [
    'eyelid_crease_category',
    'hooded_eyelid_category',
  ])) throw new Error('fr206_eye_image_model_boundary_drift');
  if (eye.unsupportedMayBeGuessedFromUnrelatedGeometry !== false) {
    throw new Error('fr206_unsupported_eye_guess_forbidden');
  }

  if (value.layerBoundary.physicalObservationEqualsTraditionalRegion !== false ||
      value.layerBoundary.traditionalMorphologyTermEqualsModernAnatomyByDefault !== false ||
      value.layerBoundary.morphologyMeasurementAccuracyEqualsTraditionalPredictiveValidity !== false ||
      value.layerBoundary.unsupportedObservationDisposition !== 'unavailable') {
    throw new Error('fr206_layer_boundary_widened');
  }

  for (const [key, authorized] of Object.entries(value.authorityBoundary)) {
    if (authorized !== false) throw new Error(`fr206_authority_widening:${key}`);
  }

  if (value.nextFrontier !==
      'inventory_whole_face_traditional_observable_terms_and_bind_minimum_sufficient_measurement_method') {
    throw new Error('fr206_next_frontier_drift');
  }
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingObservableMorphologyMeasurementBoundaryFR206():
FaceReadingObservableMorphologyPolicyFR206 {
  assertFaceReadingObservableMorphologyMeasurementBoundaryFR206(
    FACE_READING_OBSERVABLE_MORPHOLOGY_MEASUREMENT_BOUNDARY_FR206,
  );
  ISSUED.add(FACE_READING_OBSERVABLE_MORPHOLOGY_MEASUREMENT_BOUNDARY_FR206);
  return FACE_READING_OBSERVABLE_MORPHOLOGY_MEASUREMENT_BOUNDARY_FR206;
}

export function assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206(
  value: FaceReadingObservableMorphologyPolicyFR206,
): void {
  assertFaceReadingObservableMorphologyMeasurementBoundaryFR206(value);
  if (!ISSUED.has(value as object)) throw new Error('fr206_unissued_measurement_boundary');
}
