import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104,
  NEUTRAL_EAR_LATERALITY_SOURCE_WITNESSES_FR104,
} from './neutral-ear-laterality-source-audit-fr104.js';

describe('FR104 anatomical laterality source audit', () => {
  it('pins exact MediaPipe v0.10.35 source witnesses', () => {
    expect(NEUTRAL_EAR_LATERALITY_SOURCE_WITNESSES_FR104)
      .toEqual([
        {
          repository: 'google-ai-edge/mediapipe',
          releaseTag: 'v0.10.35',
          releaseCommit:
            'f8ef212d5c962c0e853db7e59d217056b187084b',
          path:
            'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
          gitBlobSha: '644de9d8c7cd90880d92b2393b4913fa93ace927',
          evidenceRole:
            'published_face_landmarker_named_side_topologies',
        },
        {
          repository: 'google-ai-edge/mediapipe',
          releaseTag: 'v0.10.35',
          releaseCommit:
            'f8ef212d5c962c0e853db7e59d217056b187084b',
          path:
            'mediapipe/tasks/web/vision/core/image_processing_options.d.ts',
          gitBlobSha: '9d463591a7579086458f9ac4028f3848c3e725df',
          evidenceRole:
            'web_vision_image_processing_surface',
        },
        {
          repository: 'google-ai-edge/mediapipe',
          releaseTag: 'v0.10.35',
          releaseCommit:
            'f8ef212d5c962c0e853db7e59d217056b187084b',
          path: 'mediapipe/framework/formats/landmark.proto',
          gitBlobSha: '151dff2360e93b7c4c0cedf5bddabe3093e709d1',
          evidenceRole:
            'normalized_landmark_coordinate_container',
        },
      ]);
  });

  it('recognizes literal provider side labels without promoting them to anatomy', () => {
    const surface =
      NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104
        .providerNamedSideSurface;

    expect(surface.requiredEyeLabels).toEqual([
      'FACE_LANDMARKS_LEFT_EYE',
      'FACE_LANDMARKS_RIGHT_EYE',
    ]);
    expect(surface.fr24LabelsMatchExactPinnedSurface).toBe(true);
    expect(surface.literalLeftRightLabelsPublished).toBe(true);
    expect(surface.providerLabelMayBeCalledAnatomicalLaterality)
      .toBe(false);
    expect(surface.horizontalMirrorBehaviorEstablishedByPinnedLabelFile)
      .toBe(false);
  });

  it('does not infer horizontal mirror provenance from the Web image-processing API', () => {
    const imageProcessing =
      NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104
        .webImageProcessingSurface;

    expect(imageProcessing.rotationDegreesOptionPublished).toBe(true);
    expect(
      imageProcessing.horizontalMirrorOptionPublishedInPinnedInterface,
    ).toBe(false);
    expect(
      imageProcessing.selfieModeOptionPublishedInPinnedInterface,
    ).toBe(false);
    expect(imageProcessing.externalPreMirroringExcludedByPinnedInterface)
      .toBe(false);
    expect(imageProcessing.exifAutoApplicationEstablishedByPinnedInterface)
      .toBe(false);
  });

  it('keeps normalized landmark coordinates free of anatomy/mirror/exif provenance claims', () => {
    const container =
      NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104
        .normalizedLandmarkContainer;

    expect(container.normalizedCoordinateRangeDocumented).toBe(true);
    expect(container.anatomicalSideFieldPresent).toBe(false);
    expect(container.mirrorProvenanceFieldPresent).toBe(false);
    expect(container.exifProvenanceFieldPresent).toBe(false);
  });

  it('preserves the existing provider-label-only project boundary', () => {
    expect(
      NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104.existingProjectAuthority,
    ).toEqual({
      fr24SideAuthority: 'provider_label_only',
      fr24PairConsumptionState: 'unordered_provider_labeled_pair_only',
      fr24AnatomicalLateralityReady: false,
      florencePromptSideAuthoritative: false,
      imageSpaceHorizontalSignAuthoritative: false,
    });
  });

  it('fails anatomical laterality closed and requires controlled mirror/runtime evidence', () => {
    const audit = NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104;

    expect(audit.blockers).toContain(
      'face_landmarker_horizontal_mirror_behavior_not_source_pinned',
    );
    expect(audit.requiredNextEvidence).toContain(
      'controlled exact-runtime original-versus-horizontally-mirrored FaceLandmarker execution that records only bounded side-topology scalar behavior and no user image',
    );
    expect(audit.decision.anatomicalLateralityMappingAdmitted).toBe(false);
    expect(audit.decision.anatomicalLateralityAuthorized).toBe(false);
    expect(audit.decision.neutralRuntimeEarObservationAuthorized)
      .toBe(false);
    expect(audit.decision.traditionalBindingAuthorized).toBe(false);
    expect(audit.decision.productionAuthorization).toBe(false);
  });
});
