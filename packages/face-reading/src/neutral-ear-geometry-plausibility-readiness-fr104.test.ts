import { describe, expect, it } from 'vitest';
import { NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104 } from './neutral-ear-geometry-plausibility-readiness-fr104.js';

describe('FR104 external-ear geometry plausibility readiness', () => {
  it('freezes the FR103 closeout failure modes without promoting consensus', () => {
    const evidence =
      NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104.fr103CloseoutEvidence;

    expect(evidence.clearVisibleEarLocalizationObserved).toBe(true);
    expect(evidence.oppositeOrientationLocalizationObserved).toBe(true);
    expect(evidence.frontalCentralFaceHallucinationObserved).toBe(true);
    expect(evidence.fullOcclusionExactDegeneracyFailClosedObserved).toBe(true);
    expect(evidence.partialOcclusionNearLineOccluderEdgeFalsePositiveObserved).toBe(true);
    expect(evidence.pairAgreementMayEstablishEarValidity).toBe(false);
    expect(evidence.nonDegeneratePolygonMayEstablishEarValidity).toBe(false);
    expect(evidence.promptSideMayEstablishAnatomicalLaterality).toBe(false);
  });

  it('reuses existing governed geometry instead of authorizing a parallel pose stack', () => {
    const reuse =
      NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104.reusableGeometryAuthority;

    expect(reuse.fr62.coordinateFrame).toBe('canonical_image_normalized_2d');
    expect(reuse.fr62.anatomicalLateralityResolved).toBe(false);
    expect(reuse.fr62.earDetectorAuthority).toBe(false);

    expect(reuse.fr68.transformSemanticsReviewed).toBe(true);
    expect(reuse.fr68.directImage2DTransformAuthorized).toBe(false);

    expect(reuse.fr76fr77.coordinateFrame).toBe(
      'canonical_aligned_right_handed_metric_3d',
    );
    expect(reuse.fr76fr77.metricLandmarkCount).toBe(468);
    expect(reuse.fr76fr77.poseTransformElementCount).toBe(16);
    expect(reuse.fr76fr77.parallelPoseNormalizationStackAuthorized).toBe(false);

    expect(reuse.fr257.geometryIsDescriptiveOnly).toBe(true);
    expect(reuse.fr257.poseThresholdAuthorized).toBe(false);
    expect(reuse.fr257.poseClassificationAuthorized).toBe(false);
  });

  it('keeps GNM as a reference target rather than a subject-photo ear observation', () => {
    const fr100 =
      NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104
        .reusableGeometryAuthority.fr100;

    expect(fr100.neutralReferenceTargetAuthorized).toBe(true);
    expect(fr100.subjectPhotoEarObservationAvailable).toBe(false);
    expect(fr100.subjectSpecificRegistrationImplemented).toBe(false);
    expect(fr100.mayAutoRegisterReferenceToSubjectEar).toBe(false);
  });

  it('preserves the dual probes as non-authoritative localization evidence only', () => {
    const fr103 =
      NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104
        .reusableGeometryAuthority.fr103;

    expect(fr103.dualProbePrimary).toBe(true);
    expect(fr103.promptSideLabelsAuthoritative).toBe(false);
    expect(fr103.automaticConsensusAcceptanceAuthorized).toBe(false);
    expect(fr103.numericAcceptanceThresholdAuthorized).toBe(false);
  });

  it('requires orientation mirror shape face-relative visibility and laterality gates', () => {
    expect(
      NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104.unresolvedGates,
    ).toEqual([
      'canonical_pixel_orientation_and_exif_provenance',
      'front_camera_mirror_provenance',
      'candidate_shape_plausibility_evidence',
      'candidate_to_face_relative_frame_mapping',
      'lateral_region_plausibility_evidence',
      'visibility_crop_occlusion_qualification',
      'anatomical_laterality_assignment',
      'prospective_calibration_before_any_numeric_cutoff',
    ]);
  });

  it('keeps thresholds laterality runtime semantics and Production closed', () => {
    const authority =
      NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104.authority;

    expect(authority.faceGeometryPlausibilityGateImplemented).toBe(false);
    expect(authority.automaticShapeRejectionThresholdAuthorized).toBe(false);
    expect(authority.automaticLateralZoneThresholdAuthorized).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.neutralRuntimeEarObservationAuthorized).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });

  it('keeps private empirical artifacts out of repository history', () => {
    const privacy =
      NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104.privacy;

    expect(privacy.userImagesAllowedInRepositoryHistory).toBe(false);
    expect(privacy.qaOverlaysAllowedInRepositoryHistory).toBe(false);
    expect(privacy.rawUserImagePolygonsAllowedInRepositoryHistory).toBe(false);
    expect(privacy.privateImageDigestsAllowedInResearchRecord).toBe(false);
  });
});
