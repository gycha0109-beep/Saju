import type {
  ControlledCaptureCalibrationEvidenceFR21BV1,
  ControlledCaptureCameraFacingFR21BV1,
  ControlledCaptureMarkerSideFR21BV1,
  ControlledCaptureStageFR21BV1,
} from './controlled-capture-attestation-fr21b.js';
export const NEUTRAL_EAR_FR21B_C1_CALIBRATION_TOOLING_REF =
  'fr104-fr21b-c1-calibration-tooling-v1' as const;

export const NEUTRAL_EAR_FR21B_C1_RESEARCH_PINS_FR104 =
  Object.freeze({
    fr21bSchemaVersion: 'fr21b-calibration-v1' as const,
    captureOrientationAuthorityVersion: '0.1.0' as const,
    cameraSourceRecordId:
      'research.face_geometry.zygomatic.browser_camera_frame_source.mesh6h' as const,
    cameraSourceArtifactVersion: '0.1.0' as const,
    canonicalizationTransformRef:
      'fr19_sharp_auto_orient_then_reencode_same_supported_format' as const,
    registryAdmissionPerformed: false as const,
    verifiedProfileIssued: false as const,
  });

export interface NeutralEarFr21bCalibrationStageInputFR104V1 {
  readonly markerImageSide: ControlledCaptureMarkerSideFR21BV1;
  readonly artifactEvidenceRef: string;
}

export interface NeutralEarFr21bCalibrationCandidateInputFR104V1 {
  readonly schemaVersion:
    'fr104-fr21b-c1-calibration-candidate-input-v1';
  readonly evidenceRef: string;
  readonly profileCandidateRef: string;
  readonly targetRef: string;
  readonly cameraFacing: ControlledCaptureCameraFacingFR21BV1;
  readonly knownMarkerAnatomicalSide:
    ControlledCaptureMarkerSideFR21BV1;
  readonly runOrdinal: number;
  readonly deviceContextRef: string;
  readonly browserContextRef: string;
  readonly previewPresentationMirrorApplied: boolean;
  readonly stages: Readonly<{
    preview: NeutralEarFr21bCalibrationStageInputFR104V1;
    raw_pixels: NeutralEarFr21bCalibrationStageInputFR104V1;
    encoded_pixels: NeutralEarFr21bCalibrationStageInputFR104V1;
    canonical_pixels: NeutralEarFr21bCalibrationStageInputFR104V1;
  }>;
  readonly encodedExifOrientation: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  readonly evidenceRefs: readonly string[];
  readonly limitations?: readonly string[];
}

export interface NeutralEarFr21bCalibrationCandidateFR104V1 {
  readonly schemaVersion:
    'fr104-fr21b-c1-calibration-candidate-v1';
  readonly toolingRef:
    typeof NEUTRAL_EAR_FR21B_C1_CALIBRATION_TOOLING_REF;
  readonly authorityState:
    'research_candidate_tooling_only';
  readonly calibrationEvidence:
    ControlledCaptureCalibrationEvidenceFR21BV1;
  readonly operatorContext: {
    readonly runOrdinal: number;
    readonly deviceContextRef: string;
    readonly browserContextRef: string;
    readonly previewPresentationMirrorApplied: boolean;
  };
  readonly implementationIdentity: {
    readonly repository: 'gycha0109-beep/Saju';
    readonly cameraSourceRecordId:
      'research.face_geometry.zygomatic.browser_camera_frame_source.mesh6h';
    readonly cameraSourceArtifactVersion: '0.1.0';
    readonly calibrationToolingRef:
      typeof NEUTRAL_EAR_FR21B_C1_CALIBRATION_TOOLING_REF;
    readonly canonicalizationAuthorityVersion: string;
    readonly canonicalizationTransformRef:
      'fr19_sharp_auto_orient_then_reencode_same_supported_format';
  };
  readonly canonicalizationBoundary: {
    readonly reusedAuthority:
      'FR19_capture_orientation_authority';
    readonly transformRef:
      'fr19_sharp_auto_orient_then_reencode_same_supported_format';
    readonly executionState:
      'not_executed_by_c1_tooling_operator_observation_required';
    readonly parallelCanonicalizationStackIntroduced: false;
  };
  readonly privacy: {
    readonly rawCapturePersistedByTooling: false;
    readonly rawFrameBytesExportedByTooling: false;
    readonly encodedArtifactPersistedByTooling: false;
    readonly canonicalArtifactPersistedByTooling: false;
    readonly imageDigestExportedByTooling: false;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
    readonly sanitizedJsonOnlyExport: true;
  };
  readonly authority: {
    readonly reviewedCalibrationIssued: false;
    readonly verifiedControlledCaptureProfileIssued: false;
    readonly subjectRelativeMirrorProvenanceAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

const STAGE_ORDER = Object.freeze([
  'preview',
  'raw_pixels',
  'encoded_pixels',
  'canonical_pixels',
] as const satisfies readonly ControlledCaptureStageFR21BV1[]);

class Fr21bCalibrationToolingValidationError extends Error {
  override readonly name = 'Fr21bCalibrationToolingValidationError';
}

function fail(message: string): never {
  throw new Fr21bCalibrationToolingValidationError(
    `FR-104 FR21B C1 calibration tooling ${message}`,
  );
}

function nonEmpty(value: string, path: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`${path} must be non-empty.`);
  }
  return value;
}

function markerSide(
  value: ControlledCaptureMarkerSideFR21BV1,
  path: string,
): ControlledCaptureMarkerSideFR21BV1 {
  if (value !== 'left' && value !== 'right') {
    fail(`${path} must be left or right.`);
  }
  return value;
}

function cameraFacing(
  value: ControlledCaptureCameraFacingFR21BV1,
): ControlledCaptureCameraFacingFR21BV1 {
  if (value !== 'front' && value !== 'rear') {
    fail('cameraFacing must be front or rear.');
  }
  return value;
}

function uniqueNonEmpty(
  values: readonly string[],
  path: string,
): readonly string[] {
  if (values.length === 0) fail(`${path} must not be empty.`);
  const normalized = values.map((value, index) =>
    nonEmpty(value, `${path}[${index}]`),
  );
  if (new Set(normalized).size !== normalized.length) {
    fail(`${path} must not contain duplicates.`);
  }
  return Object.freeze([...normalized]);
}

function stageObservation(
  stage: ControlledCaptureStageFR21BV1,
  input: NeutralEarFr21bCalibrationStageInputFR104V1,
) {
  if (typeof input !== 'object' || input === null) {
    fail(`stages.${stage} must be an object.`);
  }
  return Object.freeze({
    stage,
    markerImageSide: markerSide(
      input.markerImageSide,
      `stages.${stage}.markerImageSide`,
    ),
    artifactEvidenceRef: nonEmpty(
      input.artifactEvidenceRef,
      `stages.${stage}.artifactEvidenceRef`,
    ),
  });
}

export function buildNeutralEarFr21bCalibrationCandidateFR104(
  input: NeutralEarFr21bCalibrationCandidateInputFR104V1,
): NeutralEarFr21bCalibrationCandidateFR104V1 {
  if (
    typeof input !== 'object'
    || input === null
    || input.schemaVersion
      !== 'fr104-fr21b-c1-calibration-candidate-input-v1'
  ) {
    fail('input schema mismatch.');
  }
  if (!Number.isInteger(input.runOrdinal) || input.runOrdinal < 1) {
    fail('runOrdinal must be a positive integer.');
  }
  if (typeof input.previewPresentationMirrorApplied !== 'boolean') {
    fail('previewPresentationMirrorApplied must be boolean.');
  }
  if (
    input.encodedExifOrientation !== null
    && (
      !Number.isInteger(input.encodedExifOrientation)
      || input.encodedExifOrientation < 1
      || input.encodedExifOrientation > 8
    )
  ) {
    fail('encodedExifOrientation must be 1..8 or null.');
  }

  const evidenceRefs = uniqueNonEmpty(
    input.evidenceRefs,
    'evidenceRefs',
  );
  const callerLimitations = input.limitations ?? [];
  for (const [index, limitation] of callerLimitations.entries()) {
    nonEmpty(limitation, `limitations[${index}]`);
  }

  const stageInput = input.stages;
  if (typeof stageInput !== 'object' || stageInput === null) {
    fail('stages must be an object.');
  }
  const stageKeys = Object.keys(stageInput);
  if (
    stageKeys.length !== STAGE_ORDER.length
    || STAGE_ORDER.some((stage) => !stageKeys.includes(stage))
    || stageKeys.some(
      (stage) =>
        !(STAGE_ORDER as readonly string[]).includes(stage),
    )
  ) {
    fail(
      'stages must contain exactly preview/raw_pixels/encoded_pixels/canonical_pixels.',
    );
  }

  const evidence: ControlledCaptureCalibrationEvidenceFR21BV1 =
    Object.freeze({
      schemaVersion: 'fr21b-calibration-v1' as const,
      evidenceRef: nonEmpty(input.evidenceRef, 'evidenceRef'),
      profileRef: nonEmpty(
        input.profileCandidateRef,
        'profileCandidateRef',
      ),
      targetRef: nonEmpty(input.targetRef, 'targetRef'),
      targetKind: 'deterministic_asymmetric' as const,
      markerAnatomicalSide: markerSide(
        input.knownMarkerAnatomicalSide,
        'knownMarkerAnatomicalSide',
      ),
      cameraFacing: cameraFacing(input.cameraFacing),
      stages: Object.freeze(
        STAGE_ORDER.map((stage) =>
          stageObservation(stage, stageInput[stage]),
        ),
      ),
      encodedExifOrientation: input.encodedExifOrientation,
      reviewState: 'research_candidate' as const,
      evidenceRefs,
      limitations: Object.freeze([
        'C1 records operator-observed marker image side separately from the known anatomical marker side.',
        'preview presentation mirroring is recorded only as presentation behavior and is not saved/source-pixel authority.',
        'C1 does not execute or replace the FR19 Sharp canonicalization path; canonical_pixels remains an operator-observed stage requiring separate FR19-path evidence.',
        'research-candidate export does not admit calibration evidence into CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B.',
        'research-candidate export does not create or verify a controlled-capture profile.',
        ...callerLimitations,
      ]),
    });

  return Object.freeze({
    schemaVersion:
      'fr104-fr21b-c1-calibration-candidate-v1' as const,
    toolingRef: NEUTRAL_EAR_FR21B_C1_CALIBRATION_TOOLING_REF,
    authorityState: 'research_candidate_tooling_only' as const,
    calibrationEvidence: evidence,
    operatorContext: Object.freeze({
      runOrdinal: input.runOrdinal,
      deviceContextRef: nonEmpty(
        input.deviceContextRef,
        'deviceContextRef',
      ),
      browserContextRef: nonEmpty(
        input.browserContextRef,
        'browserContextRef',
      ),
      previewPresentationMirrorApplied:
        input.previewPresentationMirrorApplied,
    }),
    implementationIdentity: Object.freeze({
      repository: 'gycha0109-beep/Saju' as const,
      cameraSourceRecordId:
        NEUTRAL_EAR_FR21B_C1_RESEARCH_PINS_FR104.cameraSourceRecordId,
      cameraSourceArtifactVersion:
        NEUTRAL_EAR_FR21B_C1_RESEARCH_PINS_FR104
          .cameraSourceArtifactVersion,
      calibrationToolingRef:
        NEUTRAL_EAR_FR21B_C1_CALIBRATION_TOOLING_REF,
      canonicalizationAuthorityVersion:
        NEUTRAL_EAR_FR21B_C1_RESEARCH_PINS_FR104
          .captureOrientationAuthorityVersion,
      canonicalizationTransformRef:
        NEUTRAL_EAR_FR21B_C1_RESEARCH_PINS_FR104
          .canonicalizationTransformRef,
    }),
    canonicalizationBoundary: Object.freeze({
      reusedAuthority:
        'FR19_capture_orientation_authority' as const,
      transformRef:
        NEUTRAL_EAR_FR21B_C1_RESEARCH_PINS_FR104
          .canonicalizationTransformRef,
      executionState:
        'not_executed_by_c1_tooling_operator_observation_required' as const,
      parallelCanonicalizationStackIntroduced: false as const,
    }),
    privacy: Object.freeze({
      rawCapturePersistedByTooling: false as const,
      rawFrameBytesExportedByTooling: false as const,
      encodedArtifactPersistedByTooling: false as const,
      canonicalArtifactPersistedByTooling: false as const,
      imageDigestExportedByTooling: false as const,
      biometricEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
      sanitizedJsonOnlyExport: true as const,
    }),
    authority: Object.freeze({
      reviewedCalibrationIssued: false as const,
      verifiedControlledCaptureProfileIssued: false as const,
      subjectRelativeMirrorProvenanceAuthorized: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
