import {
  FR173_MAX_PARTICIPANT_MEDIA_BYTES,
} from './participant-media-resource-ceiling-fr173-shared.js';
import {
  FR237_PRIMARY_METRIC,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';
import {
  assertPrecollectionRetentionPrivacyPolicyFR239,
  type FR239PrecollectionRetentionPrivacyPolicy,
} from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  assertLiveCaptureChallengeFR241,
  assertOnePersonDryRunRuntimeFR241,
  type FR241LiveCaptureChallenge,
  type FR241OnePersonDryRunRuntime,
} from './observable-morphology-one-person-dry-run-runtime-fr241.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR242_CONTRACT_VERSION =
  'FR242-EPHEMERAL-LIVE-CAMERA-FRAME-INTAKE-v1' as const;

export type FR242QualityRejectionReason =
  | 'single_face_failed'
  | 'frontal_pose_failed'
  | 'sharpness_failed'
  | 'bilateral_eye_region_visibility_failed'
  | 'bilateral_eye_landmark_coverage_failed'
  | 'major_eye_region_occlusion_present';

export interface FR242CaptureQualityAssessment {
  readonly schemaVersion: 'fr242-capture-quality-assessment-v1';
  readonly singleFace: boolean;
  readonly frontalPose: boolean;
  readonly sharpness: boolean;
  readonly bilateralEyeRegionVisibility: boolean;
  readonly bilateralEyeLandmarkCoverage: boolean;
  readonly majorEyeRegionOcclusionAbsent: boolean;
}

export interface FR242PrimaryMetricExtraction {
  readonly metricRef: typeof FR237_PRIMARY_METRIC;
  readonly unit: 'degree';
  readonly value: number;
}

export interface FR242EphemeralLiveCameraFrameIntakeRuntime {
  readonly schemaVersion: 'fr242-ephemeral-live-camera-frame-intake-runtime-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR242_CONTRACT_VERSION;
  readonly authorityState:
    'ephemeral_live_camera_frame_intake_mechanics_ready_real_dry_run_not_yet_executed';
  readonly sourceFR241: {
    readonly runtimeRef: string;
    readonly runtimeDigest: string;
    readonly admissionRef: string;
    readonly participantRef: string;
  };
  readonly sourceFR239: {
    readonly policyRef: string;
    readonly policyDigest: string;
  };
  readonly intakeContract: {
    readonly requiredSource: 'live_camera';
    readonly requiredMediaType: 'image/jpeg';
    readonly requiredTransportEncoding: 'raw-binary';
    readonly maximumMediaBytes: typeof FR173_MAX_PARTICIPANT_MEDIA_BYTES;
    readonly maximumMediaMiB: 32;
    readonly jpegBoundaryMagicCheckRequired: true;
    readonly qualityBeforeMetricRequired: true;
    readonly rejectedFrameMetricExtractionAllowed: false;
    readonly workingBufferZeroizationRequired: true;
    readonly rawBytesPersisted: false;
    readonly rawImageDigestComputed: false;
    readonly reviewImagePersisted: false;
  };
  readonly authorityBoundary: {
    readonly fr173WitnessOrC2paAuthorityInherited: false;
    readonly actualRealParticipantDryRunExecutedByThisArtifact: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextAction:
    'execute_first_governed_one_person_dry_run_with_real_consent_and_live_camera_input_then_review_mechanics_only_results';
  readonly runtimeRef: string;
}

export interface FR242RejectedFrameResult {
  readonly schemaVersion: 'fr242-ephemeral-frame-result-v1';
  readonly status: 'rejected';
  readonly runtimeRef: string;
  readonly challengeRef: string;
  readonly participantRef: string;
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly observedByteLength: number;
  readonly qualityAssessment: FR242CaptureQualityAssessment;
  readonly rejectionReasons: readonly FR242QualityRejectionReason[];
  readonly primaryMetric: null;
  readonly metricExtractorInvoked: false;
  readonly workingBufferZeroizedAfterProcessing: true;
  readonly rawBytesPersisted: false;
  readonly rawImageDigestComputed: false;
  readonly empiricalEvidenceEligible: false;
  readonly confirmatoryEvidenceEligible: false;
}

export interface FR242AcceptedFrameResult {
  readonly schemaVersion: 'fr242-ephemeral-frame-result-v1';
  readonly status: 'accepted_for_dry_run_mechanics_only';
  readonly runtimeRef: string;
  readonly challengeRef: string;
  readonly participantRef: string;
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly observedByteLength: number;
  readonly qualityAssessment: FR242CaptureQualityAssessment;
  readonly rejectionReasons: readonly [];
  readonly primaryMetric: FR242PrimaryMetricExtraction;
  readonly metricExtractorInvoked: true;
  readonly workingBufferZeroizedAfterProcessing: true;
  readonly rawBytesPersisted: false;
  readonly rawImageDigestComputed: false;
  readonly empiricalEvidenceEligible: false;
  readonly confirmatoryEvidenceEligible: false;
}

export type FR242EphemeralFrameResult =
  | FR242RejectedFrameResult
  | FR242AcceptedFrameResult;

const ISSUED_RUNTIMES = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-242 ${message}`);
}

export function materializeEphemeralLiveCameraFrameIntakeRuntimeFR242(input: {
  readonly runtime: FR241OnePersonDryRunRuntime;
  readonly policy: FR239PrecollectionRetentionPrivacyPolicy;
}): FR242EphemeralLiveCameraFrameIntakeRuntime {
  assertOnePersonDryRunRuntimeFR241(input.runtime);
  assertPrecollectionRetentionPrivacyPolicyFR239(input.policy);

  if (
    input.policy.sourceFR238.runtimeRef !== input.runtime.sourceFR238.runtimeRef
    || input.policy.sourceFR238.runtimeDigest !== input.runtime.sourceFR238.runtimeDigest
  ) {
    fail('FR239 policy and FR241 runtime must bind the same exact FR238 runtime.');
  }
  if (
    input.policy.rawCapturePolicy.persistenceClass !== 'ephemeral_processing_only'
    || input.policy.rawCapturePolicy.deleteAfterQualityAndMetricExtraction !== true
    || input.policy.rawCapturePolicy.trainingReuseAllowed !== false
    || input.policy.rawCapturePolicy.productionReuseAllowed !== false
    || input.runtime.executionCapabilities.rawMediaByteIngressEnabled !== false
    || input.runtime.executionCapabilities.captureQualityExecutionEnabled !== false
    || input.runtime.executionCapabilities.metricExtractionEnabled !== false
  ) {
    fail('predecessor execution/privacy boundary drift.');
  }

  const result: FR242EphemeralLiveCameraFrameIntakeRuntime = Object.freeze({
    schemaVersion: 'fr242-ephemeral-live-camera-frame-intake-runtime-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR242_CONTRACT_VERSION,
    authorityState:
      'ephemeral_live_camera_frame_intake_mechanics_ready_real_dry_run_not_yet_executed' as const,
    sourceFR241: Object.freeze({
      runtimeRef: input.runtime.runtimeRef,
      runtimeDigest: input.runtime.runtimeDigest,
      admissionRef: input.runtime.sourceFR240.admissionRef,
      participantRef: input.runtime.sourceFR240.participantRef,
    }),
    sourceFR239: Object.freeze({
      policyRef: input.policy.policyRef,
      policyDigest: input.policy.policyDigest,
    }),
    intakeContract: Object.freeze({
      requiredSource: 'live_camera' as const,
      requiredMediaType: 'image/jpeg' as const,
      requiredTransportEncoding: 'raw-binary' as const,
      maximumMediaBytes: FR173_MAX_PARTICIPANT_MEDIA_BYTES,
      maximumMediaMiB: 32 as const,
      jpegBoundaryMagicCheckRequired: true as const,
      qualityBeforeMetricRequired: true as const,
      rejectedFrameMetricExtractionAllowed: false as const,
      workingBufferZeroizationRequired: true as const,
      rawBytesPersisted: false as const,
      rawImageDigestComputed: false as const,
      reviewImagePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      fr173WitnessOrC2paAuthorityInherited: false as const,
      actualRealParticipantDryRunExecutedByThisArtifact: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      interpretationValidityEstablished: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextAction:
      'execute_first_governed_one_person_dry_run_with_real_consent_and_live_camera_input_then_review_mechanics_only_results' as const,
    runtimeRef:
      `runtime.fr242.ephemeral_frame_intake:${input.runtime.runtimeDigest.slice('sha256:'.length)}:${input.policy.policyDigest.slice('sha256:'.length)}`,
  });
  ISSUED_RUNTIMES.add(result);
  return result;
}

export function assertEphemeralLiveCameraFrameIntakeRuntimeFR242(
  runtime: FR242EphemeralLiveCameraFrameIntakeRuntime,
): void {
  if (!ISSUED_RUNTIMES.has(runtime)) {
    fail('runtime was not issued by the active FR242 runtime.');
  }
  if (
    runtime.contractVersion !== FR242_CONTRACT_VERSION
    || runtime.intakeContract.requiredSource !== 'live_camera'
    || runtime.intakeContract.requiredMediaType !== 'image/jpeg'
    || runtime.intakeContract.maximumMediaBytes !== FR173_MAX_PARTICIPANT_MEDIA_BYTES
    || runtime.intakeContract.qualityBeforeMetricRequired !== true
    || runtime.intakeContract.workingBufferZeroizationRequired !== true
    || runtime.intakeContract.rawBytesPersisted !== false
    || runtime.authorityBoundary.fr173WitnessOrC2paAuthorityInherited !== false
    || runtime.authorityBoundary.actualRealParticipantDryRunExecutedByThisArtifact !== false
    || runtime.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || runtime.authorityBoundary.interpretationValidityEstablished !== false
  ) {
    fail('FR242 runtime authority boundary drift.');
  }
}

function validateFrameEnvelope(input: {
  readonly source: string;
  readonly mediaType: string;
  readonly transportEncoding: string;
  readonly declaredContentLength?: number;
  readonly mediaBytes: Uint8Array;
}): void {
  if (input.source !== 'live_camera') fail('frame source must be live_camera.');
  if (input.mediaType !== 'image/jpeg') fail('media type must be image/jpeg.');
  if (input.transportEncoding !== 'raw-binary') {
    fail('transport encoding must be raw-binary.');
  }
  if (!(input.mediaBytes instanceof Uint8Array)) {
    fail('mediaBytes must be a Uint8Array.');
  }
  if (input.mediaBytes.byteLength <= 0) fail('mediaBytes must be non-empty.');
  if (input.mediaBytes.byteLength > FR173_MAX_PARTICIPANT_MEDIA_BYTES) {
    fail('mediaBytes exceed the governed 32 MiB operational ceiling.');
  }
  if (input.declaredContentLength !== undefined) {
    if (
      !Number.isSafeInteger(input.declaredContentLength)
      || input.declaredContentLength < 0
    ) {
      fail('declaredContentLength must be a non-negative safe integer.');
    }
    if (input.declaredContentLength !== input.mediaBytes.byteLength) {
      fail('declaredContentLength must match observed bytes.');
    }
  }
  if (
    input.mediaBytes.byteLength < 4
    || input.mediaBytes[0] !== 0xff
    || input.mediaBytes[1] !== 0xd8
    || input.mediaBytes[input.mediaBytes.byteLength - 2] !== 0xff
    || input.mediaBytes[input.mediaBytes.byteLength - 1] !== 0xd9
  ) {
    fail('mediaBytes must carry JPEG SOI/EOI boundary markers.');
  }
}

function validateQualityAssessment(
  assessment: FR242CaptureQualityAssessment,
): readonly FR242QualityRejectionReason[] {
  if (assessment.schemaVersion !== 'fr242-capture-quality-assessment-v1') {
    fail('quality assessment schemaVersion drift.');
  }
  const reasons: FR242QualityRejectionReason[] = [];
  if (assessment.singleFace !== true) reasons.push('single_face_failed');
  if (assessment.frontalPose !== true) reasons.push('frontal_pose_failed');
  if (assessment.sharpness !== true) reasons.push('sharpness_failed');
  if (assessment.bilateralEyeRegionVisibility !== true) {
    reasons.push('bilateral_eye_region_visibility_failed');
  }
  if (assessment.bilateralEyeLandmarkCoverage !== true) {
    reasons.push('bilateral_eye_landmark_coverage_failed');
  }
  if (assessment.majorEyeRegionOcclusionAbsent !== true) {
    reasons.push('major_eye_region_occlusion_present');
  }
  return Object.freeze(reasons);
}

function validateMetric(
  metric: FR242PrimaryMetricExtraction,
): FR242PrimaryMetricExtraction {
  if (
    metric.metricRef !== FR237_PRIMARY_METRIC
    || metric.unit !== 'degree'
    || !Number.isFinite(metric.value)
  ) {
    fail('metric extractor must return the frozen FR237 primary metric in degrees.');
  }
  return Object.freeze({
    metricRef: metric.metricRef,
    unit: metric.unit,
    value: metric.value,
  });
}

export function processEphemeralLiveCameraFrameFR242(
  runtime: FR242EphemeralLiveCameraFrameIntakeRuntime,
  challenge: FR241LiveCaptureChallenge,
  input: {
    readonly source: 'live_camera';
    readonly mediaType: 'image/jpeg';
    readonly transportEncoding: 'raw-binary';
    readonly declaredContentLength?: number;
    readonly mediaBytes: Uint8Array;
    readonly qualityEvaluator: (
      ephemeralBytes: Uint8Array,
    ) => FR242CaptureQualityAssessment;
    readonly primaryMetricExtractor: (
      ephemeralBytes: Uint8Array,
    ) => FR242PrimaryMetricExtraction;
  },
): FR242EphemeralFrameResult {
  assertEphemeralLiveCameraFrameIntakeRuntimeFR242(runtime);
  assertLiveCaptureChallengeFR241(challenge);

  if (
    challenge.runtimeRef !== runtime.sourceFR241.runtimeRef
    || challenge.admissionRef !== runtime.sourceFR241.admissionRef
    || challenge.participantRef !== runtime.sourceFR241.participantRef
    || challenge.requiredSource !== 'live_camera'
    || challenge.galleryUploadAllowed !== false
    || challenge.retrospectiveCaptureAllowed !== false
    || challenge.rawMediaByteIngressEnabled !== false
  ) {
    fail('challenge/runtime binding or live-camera boundary mismatch.');
  }

  validateFrameEnvelope(input);
  if (typeof input.qualityEvaluator !== 'function') fail('qualityEvaluator is required.');
  if (typeof input.primaryMetricExtractor !== 'function') {
    fail('primaryMetricExtractor is required.');
  }

  const working = Uint8Array.from(input.mediaBytes);
  const observedByteLength = working.byteLength;
  let result: FR242EphemeralFrameResult;

  try {
    const qualityAssessment = Object.freeze({
      ...input.qualityEvaluator(working),
    }) as FR242CaptureQualityAssessment;
    const rejectionReasons = validateQualityAssessment(qualityAssessment);

    if (rejectionReasons.length > 0) {
      result = Object.freeze({
        schemaVersion: 'fr242-ephemeral-frame-result-v1' as const,
        status: 'rejected' as const,
        runtimeRef: runtime.runtimeRef,
        challengeRef: challenge.captureChallengeRef,
        participantRef: challenge.participantRef,
        sessionOrdinal: challenge.sessionOrdinal,
        captureOrdinal: challenge.captureOrdinal,
        observedByteLength,
        qualityAssessment,
        rejectionReasons,
        primaryMetric: null,
        metricExtractorInvoked: false as const,
        workingBufferZeroizedAfterProcessing: true as const,
        rawBytesPersisted: false as const,
        rawImageDigestComputed: false as const,
        empiricalEvidenceEligible: false as const,
        confirmatoryEvidenceEligible: false as const,
      });
    } else {
      const primaryMetric = validateMetric(input.primaryMetricExtractor(working));
      result = Object.freeze({
        schemaVersion: 'fr242-ephemeral-frame-result-v1' as const,
        status: 'accepted_for_dry_run_mechanics_only' as const,
        runtimeRef: runtime.runtimeRef,
        challengeRef: challenge.captureChallengeRef,
        participantRef: challenge.participantRef,
        sessionOrdinal: challenge.sessionOrdinal,
        captureOrdinal: challenge.captureOrdinal,
        observedByteLength,
        qualityAssessment,
        rejectionReasons: Object.freeze([]) as readonly [],
        primaryMetric,
        metricExtractorInvoked: true as const,
        workingBufferZeroizedAfterProcessing: true as const,
        rawBytesPersisted: false as const,
        rawImageDigestComputed: false as const,
        empiricalEvidenceEligible: false as const,
        confirmatoryEvidenceEligible: false as const,
      });
    }
  } finally {
    working.fill(0);
  }

  return result;
}
