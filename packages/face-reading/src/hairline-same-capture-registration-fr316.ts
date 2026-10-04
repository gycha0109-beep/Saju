import {
  FR314_CURRENT_GATE,
  type FR314MaterializationResult,
} from './visible-hairline-local-observation-materialization-fr314.js';
import {
  FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION,
  FR315_CURRENT_GATE,
} from './common-frame-bridge-fr315.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR316_SAME_CAPTURE_HAIRLINE_REGISTRATION_CONTRACT_VERSION =
  'FR316-SAME-CAPTURE-HAIRLINE-REGISTRATION-v1' as const;

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,511}$/u;

export type FR316RegistrationMethod =
  | 'exact_calibrated_surface_registration'
  | 'independent_correspondence_registration';

export type FR316ArtifactClass =
  | 'synthetic_fixture'
  | 'real_local_capture';

export type FR316Disposition =
  | 'predecessor_not_ready'
  | 'same_capture_binding_incomplete'
  | 'metric_scale_authority_incomplete'
  | 'registration_evidence_incomplete'
  | 'hairline_support_region_unverified'
  | 'eligible_for_local_hairline_metric_mapping_execution';

export interface FR316MetricScaleAuthority {
  readonly schemaVersion:
    'fr316-metric-scale-authority-v1';
  readonly authorityLevel: 'M3';
  readonly exactMetricSupportArtifactBound: boolean;
  readonly coordinateFrame:
    | 'canonical_aligned_right_handed_metric_3d'
    | 'canonical_aligned_right_handed_metric_xy';
  readonly coordinateUnit: 'centimeter';
  readonly scaleEvidenceRef: string;
  readonly canonicalInversePoseAlignmentBound: boolean;
  readonly unknownScaleFittingUsed: false;
}

export interface FR316CalibratedSurfaceEvidence {
  readonly schemaVersion:
    'fr316-calibrated-surface-registration-evidence-v1';
  readonly exactCameraIntrinsicsBound: boolean;
  readonly exactRgbToMetricExtrinsicsBound: boolean;
  readonly exactReleasedImageTransformChainBound: boolean;
  readonly exactImageDimensionsBound: boolean;
  readonly normalizedCoordinateConventionBound: boolean;
  readonly metricSupportSurfaceBound: boolean;
  readonly visibleHairlineBoundaryToMetricSurfaceCorrespondenceVerified:
    boolean;
  readonly registrationExecutionObserved: boolean;
  readonly registrationOutputFinite: boolean;
}

export interface FR316IndependentRegistrationEvidence {
  readonly schemaVersion:
    'fr316-independent-registration-evidence-v1';
  readonly sourceIndependentCorrespondences: boolean;
  readonly exactMetricScaleBoundBeforeRegistration: boolean;
  readonly fitCorrespondenceCount: number;
  readonly heldOutCorrespondenceCount: number;
  readonly fitHeldOutIdentityDisjoint: boolean;
  readonly heldOutValidationExecuted: boolean;
  readonly acceptanceCriteriaPreregistered: boolean;
  readonly acceptanceCriteriaSatisfied: boolean;
  readonly registrationOutputFinite: boolean;
  readonly evaluatedCorrespondenceEnvelopeIncludesVisibleHairlineSupportRegion:
    boolean;
  readonly extrapolationBeyondValidatedEnvelopeUsed: false;
}

export interface FR316PrivateRegistrationEvidence {
  readonly schemaVersion:
    'fr316-private-registration-evidence-v1';
  readonly rgbCaptureRef: string;
  readonly rgbCaptureDigest: string;
  readonly metricSupportArtifactRef: string;
  readonly metricSupportArtifactDigest: string;
  readonly metricSupportSourceImageDigest: string;
  readonly exactSameCaptureBound: boolean;
  readonly exactSameSessionBound: boolean;
  readonly exactArtifactPairBindingBound: boolean;
  readonly exactHairlineObservationProvenanceBound: boolean;
  readonly metricScaleAuthority: FR316MetricScaleAuthority;
  readonly calibratedSurface:
    | FR316CalibratedSurfaceEvidence
    | null;
  readonly independentRegistration:
    | FR316IndependentRegistrationEvidence
    | null;
  readonly providerLandmarksUsedAsRegistrationTruth: false;
  readonly unrelatedAstRegistrationReceiptUsedAsAuthority: false;
  readonly faceBoxScaleUsed: false;
  readonly faceOvalScaleUsed: false;
  readonly averageFaceSizeUsed: false;
  readonly providerNormalizedLandmarksRelabeledAsMetric: false;
  readonly twoDimensionalHomographyClaimedAsMetricDepthTruth: false;
  readonly sourceImagePersistedPublicly: false;
  readonly hairlineBoundaryPersistedPublicly: false;
  readonly rawCorrespondencesPersistedPublicly: false;
  readonly cameraParametersPersistedPublicly: false;
  readonly rawMetricSupportPersistedPublicly: false;
  readonly sourceImageDigestPersistedPublicly: false;
  readonly transformedSubjectCoordinatePersistedPublicly: false;
}

export interface FR316RegistrationInput {
  readonly schemaVersion:
    'fr316-same-capture-hairline-registration-input-v1';
  readonly artifactClass: FR316ArtifactClass;
  readonly method: FR316RegistrationMethod;
  readonly hairlineMaterialization:
    FR314MaterializationResult;
  readonly evidence: FR316PrivateRegistrationEvidence;
}

export interface FR316RegistrationAssessment {
  readonly schemaVersion:
    'fr316-same-capture-hairline-registration-assessment-v1';
  readonly contractVersion:
    typeof FR316_SAME_CAPTURE_HAIRLINE_REGISTRATION_CONTRACT_VERSION;
  readonly authorityState:
    'registration_evidence_adjudication_only';
  readonly artifactClass: FR316ArtifactClass;
  readonly method: FR316RegistrationMethod;
  readonly predecessorReady: boolean;
  readonly exactSameCaptureBindingComplete: boolean;
  readonly metricScaleAuthorityComplete: boolean;
  readonly selectedRegistrationEvidenceComplete: boolean;
  readonly hairlineSupportRegionVerified: boolean;
  readonly privateEvidenceRemainedLocal: boolean;
  readonly disposition: FR316Disposition;
  readonly eligibleForLocalHairlineMetricMappingExecution:
    boolean;
  readonly truthBoundary: {
    readonly providerLandmarksUsedAsRegistrationTruth: false;
    readonly unrelatedAstRegistrationUsedAsAuthority: false;
    readonly imageNormalizedCoordinateRelabeledAsMetric: false;
    readonly unknownScaleFittingAuthorized: false;
    readonly twoDimensionalHomographyAuthorizedAsMetricDepthTruth:
      false;
  };
  readonly authorityBoundary: {
    readonly hairlineMetricCoordinateIssued: false;
    readonly imageToMetricBridgeIssued: false;
    readonly commonFrameComplete: false;
    readonly mixedFrameSpanAuthorized: false;
    readonly threeDivisionsSpanExecutionReady: false;
    readonly traditionalBindingIssued: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextAction:
    | 'materialize_real_fr313_fr314_predecessor'
    | 'bind_exact_same_capture_artifacts'
    | 'establish_exact_metric_scale_authority'
    | 'complete_selected_registration_evidence'
    | 'verify_visible_hairline_metric_support_region'
    | 'fr317_local_metric_mapping_execution_review';
}

export const FR316_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr316-same-capture-hairline-registration-gate-v1' as const,
  contractVersion:
    FR316_SAME_CAPTURE_HAIRLINE_REGISTRATION_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  registrationContractImplemented: true as const,
  realSameCaptureRegistrationEvidenceAvailable:
    false as const,
  hairlineImageToMetricBridgeIssued: false as const,
  commonFrameComplete: false as const,
  actualNeutralReferenceCapabilityCount: 6 as const,
  actualRemainingNeutralReferenceCapabilityCount:
    1 as const,
  metricFrameReadyReferenceCapabilityCount: 6 as const,
  remainingMetricFrameBridgeCapabilityCount: 1 as const,
  traditionalBindingAdmittedCount: 0 as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'validate_fr316_registration_contract_with_synthetic_same_capture_fixtures_without_real_authority' as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-316 ${message}`,
  );
}

function boundedRef(
  value: string,
  label: string,
): string {
  const trimmed = value.trim();
  if (!SAFE_REF.test(trimmed)) {
    fail(`${label} must be a bounded opaque reference.`);
  }
  return trimmed;
}

function digest(
  value: string,
  label: string,
): string {
  if (!SHA256.test(value)) {
    fail(`${label} must be sha256:<64 lowercase hex>.`);
  }
  return value;
}

function assertPrivacyBoundary(
  evidence: FR316PrivateRegistrationEvidence,
): void {
  if (
    evidence.sourceImagePersistedPublicly !== false ||
    evidence.hairlineBoundaryPersistedPublicly !== false ||
    evidence.rawCorrespondencesPersistedPublicly !== false ||
    evidence.cameraParametersPersistedPublicly !== false ||
    evidence.rawMetricSupportPersistedPublicly !== false ||
    evidence.sourceImageDigestPersistedPublicly !== false ||
    evidence.transformedSubjectCoordinatePersistedPublicly !==
      false
  ) {
    fail('private registration evidence persistence boundary drift.');
  }
}

function assertTruthBoundary(
  evidence: FR316PrivateRegistrationEvidence,
): void {
  if (
    evidence.providerLandmarksUsedAsRegistrationTruth !== false ||
    evidence.unrelatedAstRegistrationReceiptUsedAsAuthority !==
      false ||
    evidence.faceBoxScaleUsed !== false ||
    evidence.faceOvalScaleUsed !== false ||
    evidence.averageFaceSizeUsed !== false ||
    evidence.providerNormalizedLandmarksRelabeledAsMetric !==
      false ||
    evidence.twoDimensionalHomographyClaimedAsMetricDepthTruth !==
      false
  ) {
    fail('forbidden registration shortcut detected.');
  }
}

function assertMetricScaleShape(
  scale: FR316MetricScaleAuthority,
): void {
  boundedRef(scale.scaleEvidenceRef, 'scaleEvidenceRef');

  if (
    scale.schemaVersion !==
      'fr316-metric-scale-authority-v1' ||
    scale.authorityLevel !== 'M3' ||
    scale.coordinateUnit !== 'centimeter' ||
    ![
      'canonical_aligned_right_handed_metric_3d',
      'canonical_aligned_right_handed_metric_xy',
    ].includes(scale.coordinateFrame) ||
    scale.unknownScaleFittingUsed !== false
  ) {
    fail('metric scale authority shape drift.');
  }
}

function selectedEvidenceShapeValid(
  input: FR316RegistrationInput,
): boolean {
  const evidence = input.evidence;

  if (
    input.method ===
    'exact_calibrated_surface_registration'
  ) {
    if (
      evidence.independentRegistration !== null ||
      evidence.calibratedSurface === null
    ) {
      fail('calibrated registration requires calibrated evidence only.');
    }

    const calibrated = evidence.calibratedSurface;
    if (
      calibrated.schemaVersion !==
      'fr316-calibrated-surface-registration-evidence-v1'
    ) {
      fail('calibrated registration schemaVersion drift.');
    }

    return (
      calibrated.exactCameraIntrinsicsBound &&
      calibrated.exactRgbToMetricExtrinsicsBound &&
      calibrated.exactReleasedImageTransformChainBound &&
      calibrated.exactImageDimensionsBound &&
      calibrated.normalizedCoordinateConventionBound &&
      calibrated.metricSupportSurfaceBound &&
      calibrated.registrationExecutionObserved &&
      calibrated.registrationOutputFinite
    );
  }

  if (
    evidence.calibratedSurface !== null ||
    evidence.independentRegistration === null
  ) {
    fail('independent registration requires independent evidence only.');
  }

  const independent =
    evidence.independentRegistration;
  if (
    independent.schemaVersion !==
      'fr316-independent-registration-evidence-v1' ||
    !Number.isInteger(independent.fitCorrespondenceCount) ||
    !Number.isInteger(independent.heldOutCorrespondenceCount) ||
    independent.fitCorrespondenceCount < 1 ||
    independent.heldOutCorrespondenceCount < 1 ||
    independent.extrapolationBeyondValidatedEnvelopeUsed !== false
  ) {
    fail('independent registration evidence shape drift.');
  }

  return (
    independent.sourceIndependentCorrespondences &&
    independent.exactMetricScaleBoundBeforeRegistration &&
    independent.fitHeldOutIdentityDisjoint &&
    independent.heldOutValidationExecuted &&
    independent.acceptanceCriteriaPreregistered &&
    independent.acceptanceCriteriaSatisfied &&
    independent.registrationOutputFinite
  );
}

function hairlineSupportRegionVerified(
  input: FR316RegistrationInput,
): boolean {
  if (
    input.method ===
    'exact_calibrated_surface_registration'
  ) {
    return (
      input.evidence.calibratedSurface
        ?.visibleHairlineBoundaryToMetricSurfaceCorrespondenceVerified ===
      true
    );
  }

  return (
    input.evidence.independentRegistration
      ?.evaluatedCorrespondenceEnvelopeIncludesVisibleHairlineSupportRegion ===
    true
  );
}

export function assessSameCaptureHairlineRegistrationFR316(
  input: FR316RegistrationInput,
): FR316RegistrationAssessment {
  assertFR316Contract();

  if (
    input.schemaVersion !==
      'fr316-same-capture-hairline-registration-input-v1'
  ) {
    fail('input schemaVersion drift.');
  }

  const evidence = input.evidence;
  if (
    evidence.schemaVersion !==
      'fr316-private-registration-evidence-v1'
  ) {
    fail('private evidence schemaVersion drift.');
  }

  assertPrivacyBoundary(evidence);
  assertTruthBoundary(evidence);
  assertMetricScaleShape(evidence.metricScaleAuthority);

  boundedRef(evidence.rgbCaptureRef, 'rgbCaptureRef');
  boundedRef(
    evidence.metricSupportArtifactRef,
    'metricSupportArtifactRef',
  );
  digest(evidence.rgbCaptureDigest, 'rgbCaptureDigest');
  digest(
    evidence.metricSupportArtifactDigest,
    'metricSupportArtifactDigest',
  );
  digest(
    evidence.metricSupportSourceImageDigest,
    'metricSupportSourceImageDigest',
  );

  const materialization =
    input.hairlineMaterialization;
  const predecessorReady =
    materialization.status === 'available';

  let sourceDigest: string | null = null;
  if (materialization.status === 'available') {
    if (
      materialization.authorityState !==
        'local_ephemeral_neutral_visible_hairline_observation_only' ||
      materialization.repoSafeReceipt
        .exactModelRevisionMatched !== true ||
      materialization.repoSafeReceipt
        .visibleObservationMaterialized !== true ||
      materialization.repoSafeReceipt
        .neutralReferenceAvailable !== true ||
      materialization.repoSafeReceipt
        .crossAnchorSpanReady !== false ||
      materialization.repoSafeReceipt
        .commonCoordinateFrameBridgeIssued !== false
    ) {
      fail('FR314 predecessor authority boundary drift.');
    }
    sourceDigest =
      materialization.runtimeOnlyObservation.sourceImageDigest;
  }

  const exactSameCaptureBindingComplete =
    predecessorReady &&
    sourceDigest !== null &&
    evidence.rgbCaptureDigest === sourceDigest &&
    evidence.metricSupportSourceImageDigest === sourceDigest &&
    evidence.exactSameCaptureBound &&
    evidence.exactSameSessionBound &&
    evidence.exactArtifactPairBindingBound &&
    evidence.exactHairlineObservationProvenanceBound;

  const metricScaleAuthorityComplete =
    evidence.metricScaleAuthority.authorityLevel === 'M3' &&
    evidence.metricScaleAuthority
      .exactMetricSupportArtifactBound &&
    evidence.metricScaleAuthority.coordinateUnit ===
      'centimeter' &&
    evidence.metricScaleAuthority
      .canonicalInversePoseAlignmentBound &&
    evidence.metricScaleAuthority
      .unknownScaleFittingUsed === false;

  const selectedRegistrationEvidenceComplete =
    selectedEvidenceShapeValid(input);

  const supportRegionVerified =
    hairlineSupportRegionVerified(input);

  let disposition: FR316Disposition;
  let nextAction:
    FR316RegistrationAssessment['nextAction'];

  if (!predecessorReady) {
    disposition = 'predecessor_not_ready';
    nextAction =
      'materialize_real_fr313_fr314_predecessor';
  } else if (!exactSameCaptureBindingComplete) {
    disposition =
      'same_capture_binding_incomplete';
    nextAction = 'bind_exact_same_capture_artifacts';
  } else if (!metricScaleAuthorityComplete) {
    disposition =
      'metric_scale_authority_incomplete';
    nextAction =
      'establish_exact_metric_scale_authority';
  } else if (
    !selectedRegistrationEvidenceComplete
  ) {
    disposition =
      'registration_evidence_incomplete';
    nextAction =
      'complete_selected_registration_evidence';
  } else if (!supportRegionVerified) {
    disposition =
      'hairline_support_region_unverified';
    nextAction =
      'verify_visible_hairline_metric_support_region';
  } else {
    disposition =
      'eligible_for_local_hairline_metric_mapping_execution';
    nextAction =
      'fr317_local_metric_mapping_execution_review';
  }

  const eligible =
    disposition ===
    'eligible_for_local_hairline_metric_mapping_execution';

  return Object.freeze({
    schemaVersion:
      'fr316-same-capture-hairline-registration-assessment-v1' as const,
    contractVersion:
      FR316_SAME_CAPTURE_HAIRLINE_REGISTRATION_CONTRACT_VERSION,
    authorityState:
      'registration_evidence_adjudication_only' as const,
    artifactClass: input.artifactClass,
    method: input.method,
    predecessorReady,
    exactSameCaptureBindingComplete,
    metricScaleAuthorityComplete,
    selectedRegistrationEvidenceComplete,
    hairlineSupportRegionVerified:
      supportRegionVerified,
    privateEvidenceRemainedLocal: true as const,
    disposition,
    eligibleForLocalHairlineMetricMappingExecution:
      eligible,
    truthBoundary: Object.freeze({
      providerLandmarksUsedAsRegistrationTruth:
        false as const,
      unrelatedAstRegistrationUsedAsAuthority:
        false as const,
      imageNormalizedCoordinateRelabeledAsMetric:
        false as const,
      unknownScaleFittingAuthorized: false as const,
      twoDimensionalHomographyAuthorizedAsMetricDepthTruth:
        false as const,
    }),
    authorityBoundary: Object.freeze({
      hairlineMetricCoordinateIssued: false as const,
      imageToMetricBridgeIssued: false as const,
      commonFrameComplete: false as const,
      mixedFrameSpanAuthorized: false as const,
      threeDivisionsSpanExecutionReady: false as const,
      traditionalBindingIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextAction,
  });
}

export function assertFR316Contract(): void {
  if (
    FR315_COMMON_FRAME_BRIDGE_CONTRACT_VERSION !==
      'FR315-COMMON-FRAME-BRIDGE-v1' ||
    FR315_CURRENT_GATE
      .hairlineImageToMetricBridgeIssued !== false ||
    FR315_CURRENT_GATE.commonFrameComplete !== false ||
    FR315_CURRENT_GATE
      .remainingMetricFrameBridgeCapabilityCount !== 1 ||
    FR314_CURRENT_GATE.fr313AdmissionAvailable !== false ||
    FR314_CURRENT_GATE
      .realVisibleHairlineObservationMaterialized !== false
  ) {
    fail('FR314/FR315 predecessor boundary drift.');
  }

  const gate = FR316_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.registrationContractImplemented !== true ||
    gate.realSameCaptureRegistrationEvidenceAvailable !==
      false ||
    gate.hairlineImageToMetricBridgeIssued !== false ||
    gate.commonFrameComplete !== false ||
    gate.actualNeutralReferenceCapabilityCount !== 6 ||
    gate.actualRemainingNeutralReferenceCapabilityCount !==
      1 ||
    gate.metricFrameReadyReferenceCapabilityCount !== 6 ||
    gate.remainingMetricFrameBridgeCapabilityCount !== 1 ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR316Contract();
