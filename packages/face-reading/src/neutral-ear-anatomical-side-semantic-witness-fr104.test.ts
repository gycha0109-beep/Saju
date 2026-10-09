import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_ANATOMICAL_SEMANTIC_SOURCE_WITNESSES_FR104,
  NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104,
} from './neutral-ear-anatomical-side-semantic-witness-fr104.js';

describe('FR104 anatomical-side semantic witness audit', () => {
  it('pins the exact FaceLandmarker v0.10.35 source witnesses', () => {
    expect(
      NEUTRAL_EAR_ANATOMICAL_SEMANTIC_SOURCE_WITNESSES_FR104,
    ).toEqual([
      {
        repository: 'google-ai-edge/mediapipe',
        releaseTag: 'v0.10.35',
        releaseCommit:
          'f8ef212d5c962c0e853db7e59d217056b187084b',
        path:
          'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
        gitBlobSha:
          '644de9d8c7cd90880d92b2393b4913fa93ace927',
        evidenceRole: 'published_named_eye_topology',
      },
      {
        repository: 'google-ai-edge/mediapipe',
        releaseTag: 'v0.10.35',
        releaseCommit:
          'f8ef212d5c962c0e853db7e59d217056b187084b',
        path:
          'mediapipe/tasks/web/vision/face_landmarker/face_landmarker.ts',
        gitBlobSha:
          '6d9b2f713345fb576301f40c3d520829ab5f23be',
        evidenceRole: 'face_landmarker_public_api_comment',
      },
      {
        repository: 'google-ai-edge/mediapipe',
        releaseTag: 'v0.10.35',
        releaseCommit:
          'f8ef212d5c962c0e853db7e59d217056b187084b',
        path:
          'mediapipe/tasks/cc/vision/face_landmarker/face_landmarks_detector_graph.cc',
        gitBlobSha:
          'b17c528ceb03ddb0eef858cd6ec74e20425703f9',
        evidenceRole: 'face_landmarker_rotation_comment',
      },
    ]);
  });

  it('detects the exact-release side-label conflict rather than resolving it by convention', () => {
    const surface =
      NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104
        .pinnedProviderSurface;

    expect(surface.namedTopology).toMatchObject({
      leftEyeGroupContainsIndex263: true,
      leftEyeGroupContainsIndex33: false,
      rightEyeGroupContainsIndex33: true,
      rightEyeGroupContainsIndex263: false,
      subjectRelativePerspectiveExplicitlyDocumented: false,
      viewerRelativePerspectiveExplicitlyDocumented: false,
    });
    expect(surface.rotationCommentConflict).toMatchObject({
      startIndex: 33,
      startComment: 'Left side of left eye.',
      endIndex: 263,
      endComment: 'Right side of right eye.',
      startIndexBelongsToPublishedRightEyeGroup: true,
      endIndexBelongsToPublishedLeftEyeGroup: true,
      conflictWithPublishedNamedTopologyDetected: true,
    });
  });

  it('does not let adjacent Google product semantics widen FaceLandmarker authority', () => {
    const adjacent =
      NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104
        .adjacentGoogleConvention;

    expect(adjacent.subjectRelativeLeftRightDocumented)
      .toBe(true);
    expect(adjacent.mayAuthorizeFaceLandmarkerAnatomicalSemantics)
      .toBe(false);
  });

  it('fails closed on anatomical mapping', () => {
    const audit =
      NEUTRAL_EAR_ANATOMICAL_SIDE_SEMANTIC_WITNESS_FR104;

    expect(audit.authorityState)
      .toBe('conflicting_or_ambiguous');
    expect(
      audit.decision.directAnatomicalSemanticWitnessAdmitted,
    ).toBe(false);
    expect(
      audit.decision.providerLeftMayBeCalledSubjectAnatomicalLeft,
    ).toBe(false);
    expect(
      audit.decision.providerRightMayBeCalledSubjectAnatomicalRight,
    ).toBe(false);
    expect(
      audit.decision.anatomicalSideMappingMayProceed,
    ).toBe(false);
    expect(audit.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(audit.authority.productionAuthorization)
      .toBe(false);
  });
});
