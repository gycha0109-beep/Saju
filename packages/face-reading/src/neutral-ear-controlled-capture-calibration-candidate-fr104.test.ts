import { describe, expect, it } from 'vitest';

import {
  openMesh6HBrowserCamera,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HBrowserEnvironmentV1,
  type Mesh6HBrowserFrameTriggerV1,
  type Mesh6HCameraFacingV1,
  type Mesh6HVideoElementLikeV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import {
  assertIssuedNeutralEarCalibrationCandidateFR104,
  createNeutralEarCalibrationCandidateSessionFR104,
  type NeutralEarCalibrationCandidateSessionFR104V1,
} from './neutral-ear-controlled-capture-calibration-candidate-fr104.js';

function video(): Mesh6HVideoElementLikeV1 {
  return {
    srcObject: null,
    videoWidth: 640,
    videoHeight: 480,
    readyState: 2,
    play: () => undefined,
    pause: () => undefined,
  };
}

function environment(expectedFacing: 'user' | 'environment') {
  let requestedFacing: string | null = null;
  const value: Mesh6HBrowserEnvironmentV1 = {
    getUserMedia: async (constraints) => {
      requestedFacing = constraints.video.facingMode;
      return {
        getTracks: () => [{ stop: () => undefined }],
      };
    },
    createImageBitmap: async () => ({
      fixtureImage: 'fr104-d2b-calibration-frame',
      close: () => undefined,
    }),
  };
  return {
    value,
    assertFacing() {
      expect(requestedFacing).toBe(expectedFacing);
    },
  };
}

async function* triggers(
  cameraFacing: Mesh6HCameraFacingV1,
): AsyncGenerator<Mesh6HBrowserFrameTriggerV1> {
  yield Object.freeze({
    timestampMs: 3000,
    providerRunRef:
      `fr104:d2b:calibration:${cameraFacing}:001`,
  });
}

async function captureOne(
  cameraFacing: Mesh6HCameraFacingV1,
): Promise<Readonly<{
  handle: Mesh6HBrowserCameraHandleV1;
  frame: Mesh6GCapturedFrameV1;
}>> {
  const expectedFacing =
    cameraFacing === 'front' ? 'user' : 'environment';
  const env = environment(expectedFacing);
  const handle = await openMesh6HBrowserCamera(
    { video: video(), cameraFacing },
    env.value,
  );
  env.assertFacing();

  const iterator =
    handle.createSweepFrameSource(
      triggers(cameraFacing),
    )[Symbol.asyncIterator]();
  const next = await iterator.next();
  if (next.done) throw new Error('fixture did not yield a frame.');
  return Object.freeze({ handle, frame: next.value });
}

function sessionFor(
  handle: Mesh6HBrowserCameraHandleV1,
  frame: Mesh6GCapturedFrameV1,
  suffix = 'front',
): NeutralEarCalibrationCandidateSessionFR104V1 {
  return createNeutralEarCalibrationCandidateSessionFR104({
    handle,
    frame,
    evidenceRef: `fr21b.calibration.${suffix}.candidate`,
    profileRef: `fr21b.profile.${suffix}.candidate`,
    targetRef: `fr21b.target.${suffix}.asymmetric`,
    markerAnatomicalSide: 'left',
  });
}

function observeAll(
  session: NeutralEarCalibrationCandidateSessionFR104V1,
): void {
  session.observeStage({
    stage: 'preview',
    markerImageSide: 'left',
    artifactEvidenceRef: 'artifact.preview.001',
    originAttestation:
      'same_live_camera_session_operator_observation',
  });
  session.observeStage({
    stage: 'raw_pixels',
    markerImageSide: 'right',
    artifactEvidenceRef: 'artifact.raw.001',
    originAttestation:
      'exact_issued_mesh6h_frame_operator_observation',
  });
  session.observeStage({
    stage: 'encoded_pixels',
    markerImageSide: 'right',
    artifactEvidenceRef: 'artifact.encoded.001',
    originAttestation:
      'encoded_artifact_claimed_from_exact_mesh6h_frame',
  });
  session.observeStage({
    stage: 'canonical_pixels',
    markerImageSide: 'right',
    artifactEvidenceRef: 'artifact.canonical.001',
    originAttestation:
      'fr19_canonical_artifact_claimed_from_encoded_stage',
  });
}

describe('FR104 D2B controlled capture calibration candidate session', () => {
  it('creates only an unreviewed front-camera FR21b research candidate from all four stage observations', async () => {
    const { handle, frame } = await captureOne('front');
    try {
      const session = sessionFor(handle, frame);
      expect(session.cameraFacing).toBe('front');
      observeAll(session);

      const candidate = session.finalize({
        encodedExifOrientation: 1,
      });

      expect(candidate.fr21bEvidence.cameraFacing).toBe('front');
      expect(candidate.fr21bEvidence.reviewState)
        .toBe('research_candidate');
      expect(candidate.fr21bEvidence.stages.map((stage) => stage.stage))
        .toEqual([
          'preview',
          'raw_pixels',
          'encoded_pixels',
          'canonical_pixels',
        ]);
      expect(
        candidate.capturedFrame.exactIssuedFrameObjectVerified,
      ).toBe(true);

      const raw = candidate.stageProvenance.find(
        (stage) => stage.stage === 'raw_pixels',
      );
      const encoded = candidate.stageProvenance.find(
        (stage) => stage.stage === 'encoded_pixels',
      );
      const canonical = candidate.stageProvenance.find(
        (stage) => stage.stage === 'canonical_pixels',
      );
      expect(raw?.exactIssuedFrameObjectOriginVerified).toBe(true);
      expect(encoded?.exactIssuedFrameObjectOriginVerified).toBe(false);
      expect(canonical?.exactIssuedFrameObjectOriginVerified).toBe(false);
      expect(
        candidate.stageProvenance.every(
          (stage) =>
            stage.artifactBytesIndependentlyVerified === false,
        ),
      ).toBe(true);

      expect(candidate.reviewHints.hintsAreAuthority).toBe(false);
      expect(candidate.blockers).toEqual([
        'encoded_stage_origin_not_independently_verified',
        'canonical_stage_origin_not_independently_verified',
        'calibration_candidate_not_human_reviewed',
        'verified_controlled_capture_profile_not_admitted',
      ]);
      expect(
        candidate.authority.subjectRelativeMirrorProvenanceAuthorized,
      ).toBe(false);
      expect(candidate.authority.anatomicalLateralityAuthorized)
        .toBe(false);
      expect(candidate.authority.traditionalBindingAuthorized)
        .toBe(false);
      expect(candidate.authority.productionAuthorization).toBe(false);

      expect(() =>
        assertIssuedNeutralEarCalibrationCandidateFR104(
          candidate,
          { handle, frame },
        ),
      ).not.toThrow();
    } finally {
      handle.close();
    }
  });

  it('derives rear camera facing from the issued handle without inferring mirror authority', async () => {
    const { handle, frame } = await captureOne('rear');
    try {
      const session = sessionFor(handle, frame, 'rear');
      expect(session.cameraFacing).toBe('rear');
      observeAll(session);
      const candidate = session.finalize({
        encodedExifOrientation: null,
      });

      expect(candidate.fr21bEvidence.cameraFacing).toBe('rear');
      expect(candidate.reviewHints.hintsAreAuthority).toBe(false);
      expect(
        candidate.authority.subjectRelativeMirrorProvenanceAuthorized,
      ).toBe(false);
      expect(candidate.authority.anatomicalLateralityAuthorized)
        .toBe(false);
    } finally {
      handle.close();
    }
  });

  it('rejects finalize until preview, raw, encoded, and canonical observations all exist', async () => {
    const { handle, frame } = await captureOne('front');
    try {
      const session = sessionFor(handle, frame);
      session.observeStage({
        stage: 'preview',
        markerImageSide: 'left',
        artifactEvidenceRef: 'artifact.preview.missing',
        originAttestation:
          'same_live_camera_session_operator_observation',
      });
      expect(() =>
        session.finalize({ encodedExifOrientation: null }),
      ).toThrow(/all four stages are required/i);
    } finally {
      handle.close();
    }
  });

  it('rejects duplicate stage observation and wrong stage-origin attestation', async () => {
    const first = await captureOne('front');
    try {
      const session = sessionFor(first.handle, first.frame, 'duplicate');
      session.observeStage({
        stage: 'preview',
        markerImageSide: 'left',
        artifactEvidenceRef: 'artifact.preview.duplicate',
        originAttestation:
          'same_live_camera_session_operator_observation',
      });
      expect(() =>
        session.observeStage({
          stage: 'preview',
          markerImageSide: 'right',
          artifactEvidenceRef: 'artifact.preview.duplicate2',
          originAttestation:
            'same_live_camera_session_operator_observation',
        }),
      ).toThrow(/already observed/i);
    } finally {
      first.handle.close();
    }

    const second = await captureOne('front');
    try {
      const session = sessionFor(second.handle, second.frame, 'origin');
      expect(() =>
        session.observeStage({
          stage: 'canonical_pixels',
          markerImageSide: 'left',
          artifactEvidenceRef: 'artifact.canonical.badorigin',
          originAttestation:
            'exact_issued_mesh6h_frame_operator_observation',
        }),
      ).toThrow(/originAttestation must be/i);
    } finally {
      second.handle.close();
    }
  });

  it('rejects duplicate artifact evidence refs across stages', async () => {
    const { handle, frame } = await captureOne('front');
    try {
      const session = sessionFor(handle, frame, 'artifactdup');
      session.observeStage({
        stage: 'preview',
        markerImageSide: 'left',
        artifactEvidenceRef: 'artifact.same.001',
        originAttestation:
          'same_live_camera_session_operator_observation',
      });
      session.observeStage({
        stage: 'raw_pixels',
        markerImageSide: 'right',
        artifactEvidenceRef: 'artifact.same.001',
        originAttestation:
          'exact_issued_mesh6h_frame_operator_observation',
      });
      session.observeStage({
        stage: 'encoded_pixels',
        markerImageSide: 'right',
        artifactEvidenceRef: 'artifact.encoded.dup',
        originAttestation:
          'encoded_artifact_claimed_from_exact_mesh6h_frame',
      });
      session.observeStage({
        stage: 'canonical_pixels',
        markerImageSide: 'right',
        artifactEvidenceRef: 'artifact.canonical.dup',
        originAttestation:
          'fr19_canonical_artifact_claimed_from_encoded_stage',
      });

      expect(() =>
        session.finalize({ encodedExifOrientation: 1 }),
      ).toThrow(/artifactEvidenceRef values must be unique/i);
    } finally {
      handle.close();
    }
  });

  it('rejects a forged frame at calibration session creation', async () => {
    const { handle, frame } = await captureOne('front');
    try {
      expect(() =>
        createNeutralEarCalibrationCandidateSessionFR104({
          handle,
          frame: {
            image: frame.image,
            timestampMs: frame.timestampMs,
            frameWidth: frame.frameWidth,
            frameHeight: frame.frameHeight,
            providerRunRef: frame.providerRunRef,
          },
          evidenceRef: 'fr21b.calibration.forged.candidate',
          profileRef: 'fr21b.profile.forged.candidate',
          targetRef: 'fr21b.target.forged.asymmetric',
          markerAnatomicalSide: 'left',
        }),
      ).toThrow(/not issued by the supplied active MESH6H handle/i);
    } finally {
      handle.close();
    }
  });

  it('rejects an issued candidate when asserted against a different exact frame and handle', async () => {
    const first = await captureOne('front');
    const second = await captureOne('front');
    try {
      const session = sessionFor(
        first.handle,
        first.frame,
        'identity',
      );
      observeAll(session);
      const candidate = session.finalize({
        encodedExifOrientation: 1,
      });

      expect(() =>
        assertIssuedNeutralEarCalibrationCandidateFR104(
          candidate,
          {
            handle: second.handle,
            frame: second.frame,
          },
        ),
      ).toThrow(/expected exact Mesh6H handle and frame objects/i);
    } finally {
      first.handle.close();
      second.handle.close();
    }
  });
});
