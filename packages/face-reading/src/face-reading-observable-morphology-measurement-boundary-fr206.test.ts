import { describe, expect, it } from 'vitest';
import {
  FACE_READING_OBSERVABLE_MORPHOLOGY_MEASUREMENT_BOUNDARY_FR206,
  assertFaceReadingObservableMorphologyMeasurementBoundaryFR206,
  assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206,
  classifyFaceReadingMeasurementTargetFR206,
  dispositionUnsupportedObservationFR206,
  issueFaceReadingObservableMorphologyMeasurementBoundaryFR206,
  requiredValidationForFaceReadingMeasurementFR206,
} from './face-reading-observable-morphology-measurement-boundary-fr206.js';

describe('FR206 observable morphology measurement boundary', () => {
  it('defines proper measurement as the declared visible construct, not anatomy by default', () => {
    const issued = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();

    expect(() => assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206(issued)).not.toThrow();
    expect(issued.productDefaultTargetClass).toBe('observable_morphology');
    expect(issued.properMeasurementDefinition).toEqual({
      repeatableMeasurementOfDeclaredConstruct: true,
      governedCaptureOrQualityConditionRequired: true,
      labelMustNotExceedMeasuredConstruct: true,
      anatomyEquivalenceRequiredForEveryMorphologyMetric: false,
    });

    expect(classifyFaceReadingMeasurementTargetFR206({
      outputLabel: 'visible_face_breadth',
      explicitlyClaimsAnatomicalStructure: false,
    })).toBe('observable_morphology');
    expect(requiredValidationForFaceReadingMeasurementFR206('observable_morphology'))
      .toBe('observable_construct_validation');
  });

  it('requires anatomical correspondence only for an explicit anatomical claim', () => {
    expect(classifyFaceReadingMeasurementTargetFR206({
      outputLabel: 'zygion',
      explicitlyClaimsAnatomicalStructure: true,
    })).toBe('anatomical_structure');
    expect(requiredValidationForFaceReadingMeasurementFR206('anatomical_structure'))
      .toBe('independent_anatomical_correspondence');

    const issued = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();
    expect(issued.classRules[0].anatomicalGroundTruthRequiredByDefault).toBe(false);
    expect(issued.classRules[1].anatomicalGroundTruthRequiredByDefault).toBe(true);
    expect(issued.classRules.every(
      (rule) => rule.mayBlockObservableMorphologyWhenNoAnatomicalClaimExists === false,
    )).toBe(true);
  });

  it('pins the cheek correction and forbids zygion relabeling or generic FR204 calibration', () => {
    const issued = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();
    expect(issued.cheekMidFace.allowedOperationalLabels).toEqual([
      'visible_face_breadth',
      'visible_midface_width',
      'cheek_contour_prominence',
    ]);
    expect(issued.cheekMidFace.forbiddenAnatomicalLabels).toEqual([
      'zygion',
      'bizygomatic_breadth',
      'true_zygomatic_bone_width',
    ]);
    expect(issued.cheekMidFace.mediaPipe234454MayBeCalledZygion).toBe(false);
    expect(issued.cheekMidFace.rawFaceOvalMayBeCalledSkeletalBizygomaticBreadth).toBe(false);
    expect(issued.cheekMidFace.fr204GenericCalibrationFactorAuthorized).toBe(false);
    expect(issued.cheekMidFace.rawFullOvalMayAdvanceAsOperationalFaceBreadthCandidate).toBe(true);
    expect(issued.cheekMidFace.additionalZygionValidationBlocksOperationalUse).toBe(false);
  });

  it('separates eye geometry from image-model-only attributes and fails unsupported observations closed', () => {
    const issued = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();
    expect(issued.eye.geometryBackedAxes).toEqual([
      'eye_width_height_ratio',
      'canthal_tilt',
      'inter_eye_spacing_ratio',
      'bilateral_shape_asymmetry',
    ]);
    expect(issued.eye.requiresImageModelOrUnavailable).toEqual([
      'eyelid_crease_category',
      'hooded_eyelid_category',
    ]);
    expect(issued.eye.unsupportedMayBeGuessedFromUnrelatedGeometry).toBe(false);
    expect(dispositionUnsupportedObservationFR206('landmark_geometry')).toBe('measure');
    expect(dispositionUnsupportedObservationFR206('image_classifier_or_segmentation')).toBe('measure');
    expect(dispositionUnsupportedObservationFR206('unsupported')).toBe('unavailable');
  });

  it('rejects anatomy escalation, predictive-validity collapse, and authority widening', () => {
    const issued = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();

    expect(() => assertFaceReadingObservableMorphologyMeasurementBoundaryFR206({
      ...issued,
      productDefaultTargetClass: 'anatomical_structure',
    } as never)).toThrow(/fr206_product_default_must_be_observable/);

    expect(() => assertFaceReadingObservableMorphologyMeasurementBoundaryFR206({
      ...issued,
      escalationRule: {
        ...issued.escalationRule,
        proxyMayBeRelabeledAsAnatomy: true,
      },
    } as never)).toThrow(/fr206_anatomical_escalation_widened/);

    expect(() => assertFaceReadingObservableMorphologyMeasurementBoundaryFR206({
      ...issued,
      cheekMidFace: {
        ...issued.cheekMidFace,
        additionalZygionValidationBlocksOperationalUse: true,
      },
    } as never)).toThrow(/fr206_cheek_boundary_widened/);

    expect(() => assertFaceReadingObservableMorphologyMeasurementBoundaryFR206({
      ...issued,
      layerBoundary: {
        ...issued.layerBoundary,
        morphologyMeasurementAccuracyEqualsTraditionalPredictiveValidity: true,
      },
    } as never)).toThrow(/fr206_layer_boundary_widened/);

    expect(() => assertFaceReadingObservableMorphologyMeasurementBoundaryFR206({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        newZygionCampaignAuthorized: true,
      },
    } as never)).toThrow(/fr206_authority_widening:newZygionCampaignAuthorized/);

    expect(() => assertIssuedFaceReadingObservableMorphologyMeasurementBoundaryFR206({
      ...FACE_READING_OBSERVABLE_MORPHOLOGY_MEASUREMENT_BOUNDARY_FR206,
    })).toThrow(/fr206_unissued_measurement_boundary/);
  });

  it('sets the next frontier to whole-face minimum-sufficient measurement mapping', () => {
    const issued = issueFaceReadingObservableMorphologyMeasurementBoundaryFR206();
    expect(issued.nextFrontier).toBe(
      'inventory_whole_face_traditional_observable_terms_and_bind_minimum_sufficient_measurement_method',
    );
  });
});
