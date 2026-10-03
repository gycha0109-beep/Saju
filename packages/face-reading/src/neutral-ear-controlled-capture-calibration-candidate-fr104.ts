import {
  validateControlledCaptureCalibrationEvidenceFR21B,
  type ControlledCaptureCalibrationEvidenceFR21BV1,
  type ControlledCaptureMarkerSideFR21BV1,
  type ControlledCaptureStageFR21BV1,
} from './controlled-capture-attestation-fr21b.js';
import {
  assertIssuedMesh6HBrowserCameraFrame,
  assertIssuedMesh6HBrowserCameraHandle,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HCameraFacingV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarCalibrationStageOriginAttestationFR104V1 =
  | 'same_live_camera_session_operator_observation'
  | 'exact_issued_mesh6h_frame_operator_observation'
  | 'encoded_artifact_claimed_from_exact_mesh6h_frame'
  | 'fr19_canonical_artifact_claimed_from_encoded_stage';

export interface NeutralEarCalibrationStageObservationInputFR104V1 {
  readonly stage: ControlledCaptureStageFR21BV1;
  readonly markerImageSide: ControlledCaptureMarkerSideFR21BV1;
  readonly artifactEvidenceRef: string;
  readonly originAttestation:
    NeutralEarCalibrationStageOriginAttestationFR104V1;
}

export interface NeutralEarCalibrationCandidateSessionFR104V1 {
  readonly cameraFacing: Mesh6HCameraFacingV1;
  readonly observeStage: (
    observation: NeutralEarCalibrationStageObservationInputFR104V1,
  ) => void;
  readonly finalize: (
    input: Readonly<{
      encodedExifOrientation: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
    }>,
  ) => NeutralEarCalibrationCandidateFR104V1;
}

export interface NeutralEarCalibrationCandidateFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-controlled-capture-calibration-candidate-v1';
  readonly authorityState:
    'research_candidate_exact_frame_bound_stage_observations_unreviewed';
  readonly fr21bEvidence:
    ControlledCaptureCalibrationEvidenceFR21BV1;
  readonly capturedFrame: {
    readonly cameraFacing: Mesh6HCameraFacingV1;
    readonly timestampMs: number;
    readonly frameWidth: number;
    readonly frameHeight: number;
    readonly providerRunRef: string;
    readonly exactIssuedFrameObjectVerified: true;
  };
  readonly stageProvenance: readonly Readonly<{
    stage: ControlledCaptureStageFR21BV1;
    originAttestation:
      NeutralEarCalibrationStageOriginAttestationFR104V1;
    exactFrameOriginIndependentlyVerified: boolean;
  }>[];
  readonly reviewHints: {
    readonly previewMirrorPolicyCandidate:
      | 'mirrored_relative_to_subject'
      | 'unmirrored_relative_to_subject';
    readonly savedPixelMirrorPolicyCandidate:
      | 'mirrored_relative_to_subject'
      | 'unmirrored_relative_to_subject';
    readonly finalAnatomicalLateralityAssertionCandidate:
      | 'image_left_is_subject_anatomical_left'
      | 'image_left_is_subject_anatomical_right';
    readonly hintsAreAuthority: false;
  };
  readonly blockers: readonly [
    'encoded_stage_origin_not_independently_verified',
    'canonical_stage_origin_not_independently_verified',
    'calibration_candidate_not_human_reviewed',
    'verified_controlled_capture_profile_not_admitted',
  ];
  readonly privacy: {
    readonly rawFramePersistedBySession: false;
    readonly rawFrameBytesPersistedBySession: false;
    readonly artifactBytesPersistedBySession: false;
    readonly imageDigestComputedBySession: false;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly calibrationCandidateOnly: true;
    readonly reviewedCalibrationEvidence: false;
    readonly verifiedControlledCaptureProfile: false;
    readonly subjectRelativeMirrorProvenanceAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

const REQUIRED_STAGES = Object.freeze([
  'preview',
  'raw_pixels',
  'encoded_pixels',
  'canonical_pixels',
] as const);

const EXPECTED_ORIGIN_BY_STAGE = Object.freeze({
  preview: 'same_live_camera_session_operator_observation',
  raw_pixels: 'exact_issued_mesh6h_frame_operator_observation',
  encoded_pixels: 'encoded_artifact_claimed_from_exact_mesh6h_frame',
  canonical_pixels: 'fr19_canonical_artifact_claimed_from_encoded_stage',
} as const);

const STABLE_KEY = /^[a-z0-9][a-z0-9._:-]{0,191}$/u;
const ISSUED_CANDIDATES = new WeakSet<object>();
const CANDIDATE_STATE = new WeakMap<
  object,
  Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
  }>
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 controlled capture calibration candidate ${message}`,
  );
}

function stableKey(value: string, label: string): string {
  if (
    value.trim().length === 0
    || !STABLE_KEY.test(value)
  ) {
    fail(`${label} must be a stable authority key.`);
  }
  return value;
}

function markerPolicy(
  anatomicalSide: ControlledCaptureMarkerSideFR21BV1,
  imageSide: ControlledCaptureMarkerSideFR21BV1,
): 'mirrored_relative_to_subject' | 'unmirrored_relative_to_subject' {
  return anatomicalSide === imageSide
    ? 'mirrored_relative_to_subject'
    : 'unmirrored_relative_to_subject';
}

function finalAssertion(
  anatomicalSide: ControlledCaptureMarkerSideFR21BV1,
  imageSide: ControlledCaptureMarkerSideFR21BV1,
):
  | 'image_left_is_subject_anatomical_left'
  | 'image_left_is_subject_anatomical_right' {
  return anatomicalSide === imageSide
    ? 'image_left_is_subject_anatomical_left'
    : 'image_left_is_subject_anatomical_right';
}

function exactFrameOriginVerified(
  stage: ControlledCaptureStageFR21BV1,
): boolean {
  return stage === 'raw_pixels';
}

export function createNeutralEarCalibrationCandidateSessionFR104(
  input: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    evidenceRef: string;
    profileRef: string;
    targetRef: string;
    markerAnatomicalSide:
      ControlledCaptureMarkerSideFR21BV1;
  }>,
): NeutralEarCalibrationCandidateSessionFR104V1 {
  assertIssuedMesh6HBrowserCameraHandle(input.handle);
  assertIssuedMesh6HBrowserCameraFrame(input.handle, input.frame);

  const evidenceRef = stableKey(input.evidenceRef, 'evidenceRef');
  const profileRef = stableKey(input.profileRef, 'profileRef');
  const targetRef = stableKey(input.targetRef, 'targetRef');

  if (
    input.markerAnatomicalSide !== 'left'
    && input.markerAnatomicalSide !== 'right'
  ) {
    fail('markerAnatomicalSide must be left or right.');
  }

  const observations =
    new Map<
      ControlledCaptureStageFR21BV1,
      NeutralEarCalibrationStageObservationInputFR104V1
    >();
  let finalized = false;

  return Object.freeze({
    cameraFacing:
      input.handle.executionBoundary.cameraFacingRequested,

    observeStage(
      observation:
        NeutralEarCalibrationStageObservationInputFR104V1,
    ): void {
      if (finalized) fail('session is already finalized.');
      if (!REQUIRED_STAGES.includes(observation.stage)) {
        fail(`unknown calibration stage: ${String(observation.stage)}.`);
      }
      if (observations.has(observation.stage)) {
        fail(`${observation.stage} was already observed.`);
      }
      if (
        observation.markerImageSide !== 'left'
        && observation.markerImageSide !== 'right'
      ) {
        fail(
          `${observation.stage}.markerImageSide must be left or right.`,
        );
      }

      const artifactEvidenceRef = stableKey(
        observation.artifactEvidenceRef,
        `${observation.stage}.artifactEvidenceRef`,
      );
      const expectedOrigin =
        EXPECTED_ORIGIN_BY_STAGE[observation.stage];
      if (observation.originAttestation !== expectedOrigin) {
        fail(
          `${observation.stage}.originAttestation must be ${expectedOrigin}.`,
        );
      }

      observations.set(
        observation.stage,
        Object.freeze({
          stage: observation.stage,
          markerImageSide: observation.markerImageSide,
          artifactEvidenceRef,
          originAttestation: observation.originAttestation,
        }),
      );
    },

    finalize(finalizeInput): NeutralEarCalibrationCandidateFR104V1 {
      if (finalized) fail('session is already finalized.');
      const missing = REQUIRED_STAGES.filter(
        (stage) => !observations.has(stage),
      );
      if (missing.length > 0) {
        fail(`all four stages are required before finalize; missing: ${missing.join(', ')}.`);
      }

      const ordered = REQUIRED_STAGES.map((stage) => {
        const observation = observations.get(stage);
        if (observation === undefined) {
          fail(`missing stage after completeness check: ${stage}.`);
        }
        return observation;
      });
      const artifactRefs = ordered.map(
        (stage) => stage.artifactEvidenceRef,
      );
      if (new Set(artifactRefs).size !== artifactRefs.length) {
        fail('artifactEvidenceRef values must be unique across stages.');
      }

      const exif = finalizeInput.encodedExifOrientation;
      if (
        exif !== null
        && (
          !Number.isInteger(exif)
          || exif < 1
          || exif > 8
        )
      ) {
        fail('encodedExifOrientation must be 1..8 or null.');
      }

      const fr21bEvidence =
        validateControlledCaptureCalibrationEvidenceFR21B(
          Object.freeze({
            schemaVersion: 'fr21b-calibration-v1' as const,
            evidenceRef,
            profileRef,
            targetRef,
            targetKind: 'deterministic_asymmetric' as const,
            markerAnatomicalSide: input.markerAnatomicalSide,
            cameraFacing:
              input.handle.executionBoundary.cameraFacingRequested,
            stages: Object.freeze(
              ordered.map((stage) =>
                Object.freeze({
                  stage: stage.stage,
                  markerImageSide: stage.markerImageSide,
                  artifactEvidenceRef:
                    stage.artifactEvidenceRef,
                }),
              ),
            ),
            encodedExifOrientation: exif,
            reviewState: 'research_candidate' as const,
            evidenceRefs: Object.freeze([...artifactRefs]),
            limitations: Object.freeze([
              'stage marker-side observations are operator attestations and are not independently image-classified by this runtime',
              'encoded-stage origin from the exact captured frame is claimed but not independently verified by this calibration session',
              'canonical-stage origin from the encoded stage and FR19 canonicalization is claimed but not independently verified by this calibration session',
              'research_candidate evidence cannot be promoted to a verified controlled-capture profile without separate human review and provenance inspection',
            ]),
          }),
        );

      const preview = observations.get('preview');
      const encoded = observations.get('encoded_pixels');
      const canonical = observations.get('canonical_pixels');
      if (
        preview === undefined
        || encoded === undefined
        || canonical === undefined
      ) {
        fail('review-hint stage resolution failed.');
      }

      finalized = true;
      const candidate: NeutralEarCalibrationCandidateFR104V1 =
        Object.freeze({
          schemaVersion:
            'fr104-neutral-ear-controlled-capture-calibration-candidate-v1' as const,
          authorityState:
            'research_candidate_exact_frame_bound_stage_observations_unreviewed' as const,
          fr21bEvidence,
          capturedFrame: Object.freeze({
            cameraFacing:
              input.handle.executionBoundary.cameraFacingRequested,
            timestampMs: input.frame.timestampMs,
            frameWidth: input.frame.frameWidth,
            frameHeight: input.frame.frameHeight,
            providerRunRef: input.frame.providerRunRef,
            exactIssuedFrameObjectVerified: true as const,
          }),
          stageProvenance: Object.freeze(
            ordered.map((stage) =>
              Object.freeze({
                stage: stage.stage,
                originAttestation: stage.originAttestation,
                exactFrameOriginIndependentlyVerified:
                  exactFrameOriginVerified(stage.stage),
              }),
            ),
          ),
          reviewHints: Object.freeze({
            previewMirrorPolicyCandidate:
              markerPolicy(
                input.markerAnatomicalSide,
                preview.markerImageSide,
              ),
            savedPixelMirrorPolicyCandidate:
              markerPolicy(
                input.markerAnatomicalSide,
                encoded.markerImageSide,
              ),
            finalAnatomicalLateralityAssertionCandidate:
              finalAssertion(
                input.markerAnatomicalSide,
                canonical.markerImageSide,
              ),
            hintsAreAuthority: false as const,
          }),
          blockers: Object.freeze([
            'encoded_stage_origin_not_independently_verified',
            'canonical_stage_origin_not_independently_verified',
            'calibration_candidate_not_human_reviewed',
            'verified_controlled_capture_profile_not_admitted',
          ] as const),
          privacy: Object.freeze({
            rawFramePersistedBySession: false as const,
            rawFrameBytesPersistedBySession: false as const,
            artifactBytesPersistedBySession: false as const,
            imageDigestComputedBySession: false as const,
            biometricEmbeddingProduced: false as const,
            identityTemplateProduced: false as const,
          }),
          authority: Object.freeze({
            calibrationCandidateOnly: true as const,
            reviewedCalibrationEvidence: false as const,
            verifiedControlledCaptureProfile: false as const,
            subjectRelativeMirrorProvenanceAuthorized:
              false as const,
            anatomicalLateralityAuthorized: false as const,
            validatedExternalEarObservationAuthorized:
              false as const,
            traditionalBindingAuthorized: false as const,
            productionAuthorization: false as const,
          }),
        });

      ISSUED_CANDIDATES.add(candidate);
      CANDIDATE_STATE.set(
        candidate,
        Object.freeze({
          handle: input.handle,
          frame: input.frame,
        }),
      );
      return candidate;
    },
  });
}

export function assertIssuedNeutralEarCalibrationCandidateFR104(
  candidate: NeutralEarCalibrationCandidateFR104V1,
  expected: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
  }>,
): void {
  if (!ISSUED_CANDIDATES.has(candidate)) {
    fail('candidate was not issued by the active calibration runtime.');
  }
  const state = CANDIDATE_STATE.get(candidate);
  if (
    state === undefined
    || state.handle !== expected.handle
    || state.frame !== expected.frame
  ) {
    fail('candidate is not bound to the expected exact Mesh6H handle and frame objects.');
  }

  validateControlledCaptureCalibrationEvidenceFR21B(
    candidate.fr21bEvidence,
  );
  if (
    candidate.authorityState
      !== 'research_candidate_exact_frame_bound_stage_observations_unreviewed'
    || candidate.fr21bEvidence.reviewState !== 'research_candidate'
    || candidate.capturedFrame.exactIssuedFrameObjectVerified !== true
    || candidate.stageProvenance.find(
      (stage) => stage.stage === 'raw_pixels',
    )?.exactFrameOriginIndependentlyVerified !== true
    || candidate.stageProvenance.find(
      (stage) => stage.stage === 'encoded_pixels',
    )?.exactFrameOriginIndependentlyVerified !== false
    || candidate.stageProvenance.find(
      (stage) => stage.stage === 'canonical_pixels',
    )?.exactFrameOriginIndependentlyVerified !== false
    || candidate.reviewHints.hintsAreAuthority !== false
    || candidate.authority.calibrationCandidateOnly !== true
    || candidate.authority.reviewedCalibrationEvidence !== false
    || candidate.authority.verifiedControlledCaptureProfile !== false
    || candidate.authority.subjectRelativeMirrorProvenanceAuthorized
      !== false
    || candidate.authority.anatomicalLateralityAuthorized !== false
    || candidate.authority.traditionalBindingAuthorized !== false
    || candidate.authority.productionAuthorization !== false
  ) {
    fail('candidate authority boundary drift.');
  }
}
