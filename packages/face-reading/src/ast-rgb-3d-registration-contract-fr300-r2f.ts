import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2E_PREP_AST_CONTROLLED_PILOT_INTAKE_READINESS_CONTRACT_VERSION,
  FR300_R2E_PREP_CURRENT_GATE,
  type FR300R2EPREPControlledPilotAssessment,
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract,
} from './ast-controlled-pilot-intake-readiness-fr300-r2e-prep.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2F_AST_RGB_3D_REGISTRATION_CONTRACT_VERSION =
  'FR300-R2F-AST-RGB-3D-REGISTRATION-CONTRACT-v1' as const;

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,511}$/u;

export type FR300R2FRegistrationMethod =
  | 'exact_calibrated_projection'
  | 'independent_geometric_registration';

export type FR300R2FRegistrationDisposition =
  | 'predecessor_not_ready'
  | 'calibrated_projection_evidence_incomplete'
  | 'independent_registration_evidence_incomplete'
  | 'registration_validated_for_materialization_review';

export interface FR300R2FRegistrationInput {
  readonly schemaVersion: 'fr300-r2f-registration-input-v1';
  readonly artifactClass: 'synthetic_fixture' | 'real_controlled_artifact';
  readonly pilotAssessment: FR300R2EPREPControlledPilotAssessment;
  readonly method: FR300R2FRegistrationMethod;
  readonly raw3DArtifactRef: string;
  readonly raw3DArtifactDigest: string;
  readonly rgbArtifactRef: string;
  readonly rgbArtifactDigest: string;
  readonly exact3DCoordinateFrameBound: boolean;
  readonly exactRgbCameraIntrinsicsBound: boolean;
  readonly exactRgbTo3DExtrinsicsBound: boolean;
  readonly exactReleasedImageTransformChainBound: boolean;
  readonly rgbArtifactDigestBoundToRegistrationEvidence: boolean;
  readonly registrationExecutionObserved: boolean;
  readonly registrationOutputFinite: boolean;
  readonly independentCorrespondenceEvidenceBound: boolean;
  readonly sourceIndependentCorrespondences: boolean;
  readonly heldOutValidationExecuted: boolean;
  readonly acceptanceThresholdPreregistered: boolean;
  readonly acceptanceThresholdSatisfied: boolean;
  readonly providerLandmarksUsedAsRegistrationTruth: boolean;
  readonly providerLandmarksUsedAsFR266Truth: boolean;
  readonly providerLandmarksUsedAsFR297Truth: boolean;
}

export interface FR300R2FRegistrationAssessment {
  readonly schemaVersion: 'fr300-r2f-registration-assessment-v1';
  readonly artifactClass: FR300R2FRegistrationInput['artifactClass'];
  readonly method: FR300R2FRegistrationMethod;
  readonly raw3DArtifactRef: string;
  readonly raw3DArtifactDigest: string;
  readonly rgbArtifactRef: string;
  readonly rgbArtifactDigest: string;
  readonly predecessorReadyForRegistration: boolean;
  readonly calibratedProjectionEvidenceComplete: boolean;
  readonly independentRegistrationEvidenceComplete: boolean;
  readonly registrationValidatedForFR299Review: boolean;
  readonly disposition: FR300R2FRegistrationDisposition;
  readonly next:
    | 'resolve_r2e_predecessor'
    | 'bind_calibrated_projection_evidence'
    | 'bind_independent_registration_evidence'
    | 'fr299_materialization_review';
  readonly truthBoundary: {
    readonly providerLandmarksUsedAsRegistrationTruth: false;
    readonly providerLandmarksUsedAsFR266Truth: false;
    readonly providerLandmarksUsedAsFR297Truth: false;
  };
  readonly authorityBoundary: {
    readonly realControlledArtifactRegistrationExecuted: boolean;
    readonly realRegistrationValidatedForFR299Review: boolean;
    readonly fr299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2F ${message}`,
  );
}

function boundedRef(value: string, label: string): string {
  const trimmed = value.trim();
  if (!SAFE_REF.test(trimmed)) {
    fail(`${label} must be a bounded opaque reference.`);
  }
  return trimmed;
}

function digest(value: string, label: string): string {
  if (!SHA256.test(value)) {
    fail(`${label} must be sha256:<64 lowercase hex>.`);
  }
  return value;
}

export function assessFR300R2FRegistration(
  input: FR300R2FRegistrationInput,
): FR300R2FRegistrationAssessment {
  assertFR300R2FRegistrationContract();

  if (
    input.schemaVersion !==
    'fr300-r2f-registration-input-v1'
  ) {
    fail('registration input schemaVersion drift.');
  }

  const raw3DArtifactRef = boundedRef(
    input.raw3DArtifactRef,
    'raw3DArtifactRef',
  );
  const rgbArtifactRef = boundedRef(
    input.rgbArtifactRef,
    'rgbArtifactRef',
  );
  const raw3DArtifactDigest = digest(
    input.raw3DArtifactDigest,
    'raw3DArtifactDigest',
  );
  const rgbArtifactDigest = digest(
    input.rgbArtifactDigest,
    'rgbArtifactDigest',
  );

  if (
    input.providerLandmarksUsedAsRegistrationTruth ||
    input.providerLandmarksUsedAsFR266Truth ||
    input.providerLandmarksUsedAsFR297Truth
  ) {
    fail(
      'provider landmarks may not issue registration, FR266, or FR297 truth.',
    );
  }

  const pilot = input.pilotAssessment;

  if (pilot.artifactClass !== input.artifactClass) {
    fail('artifact class must match the R2E-PREP assessment.');
  }

  if (
    raw3DArtifactRef !== pilot.metric.artifactRef ||
    raw3DArtifactDigest !== pilot.metric.artifactDigest ||
    raw3DArtifactRef !== pilot.integrity.artifactRef ||
    raw3DArtifactDigest !== pilot.integrity.observedDigest ||
    raw3DArtifactRef !== pilot.pairing.raw3DArtifactRef
  ) {
    fail(
      'raw 3D artifact identity must match the R2E-PREP metric and integrity receipts.',
    );
  }

  if (rgbArtifactRef !== pilot.pairing.rgbArtifactRef) {
    fail(
      'RGB artifact identity must match the R2E-PREP pairing receipt.',
    );
  }

  if (
    input.artifactClass === 'real_controlled_artifact' &&
    !pilot.authorityBoundary.realControlledArtifactAdmitted
  ) {
    fail(
      'real controlled registration requires R2E-PREP real artifact admission.',
    );
  }

  const predecessorReadyForRegistration =
    pilot.disposition === 'ready_for_external_registration' &&
    pilot.next === 'external_registration' &&
    pilot.integrity.passed &&
    pilot.structure.structurallyUsable &&
    pilot.metric.metricScaleVerifiedForFR299;

  const calibratedProjectionEvidenceComplete =
    input.exact3DCoordinateFrameBound &&
    input.exactRgbCameraIntrinsicsBound &&
    input.exactRgbTo3DExtrinsicsBound &&
    input.exactReleasedImageTransformChainBound &&
    input.rgbArtifactDigestBoundToRegistrationEvidence &&
    input.registrationExecutionObserved &&
    input.registrationOutputFinite;

  const independentRegistrationEvidenceComplete =
    input.independentCorrespondenceEvidenceBound &&
    input.sourceIndependentCorrespondences &&
    input.heldOutValidationExecuted &&
    input.acceptanceThresholdPreregistered &&
    input.acceptanceThresholdSatisfied &&
    input.rgbArtifactDigestBoundToRegistrationEvidence &&
    input.registrationExecutionObserved &&
    input.registrationOutputFinite;

  const selectedPathComplete =
    input.method === 'exact_calibrated_projection'
      ? calibratedProjectionEvidenceComplete
      : independentRegistrationEvidenceComplete;

  const registrationValidatedForFR299Review =
    predecessorReadyForRegistration &&
    selectedPathComplete;

  let disposition: FR300R2FRegistrationDisposition;
  let next: FR300R2FRegistrationAssessment['next'];

  if (!predecessorReadyForRegistration) {
    disposition = 'predecessor_not_ready';
    next = 'resolve_r2e_predecessor';
  } else if (
    input.method === 'exact_calibrated_projection' &&
    !calibratedProjectionEvidenceComplete
  ) {
    disposition =
      'calibrated_projection_evidence_incomplete';
    next = 'bind_calibrated_projection_evidence';
  } else if (
    input.method === 'independent_geometric_registration' &&
    !independentRegistrationEvidenceComplete
  ) {
    disposition =
      'independent_registration_evidence_incomplete';
    next = 'bind_independent_registration_evidence';
  } else {
    disposition =
      'registration_validated_for_materialization_review';
    next = 'fr299_materialization_review';
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2f-registration-assessment-v1' as const,
    artifactClass: input.artifactClass,
    method: input.method,
    raw3DArtifactRef,
    raw3DArtifactDigest,
    rgbArtifactRef,
    rgbArtifactDigest,
    predecessorReadyForRegistration,
    calibratedProjectionEvidenceComplete,
    independentRegistrationEvidenceComplete,
    registrationValidatedForFR299Review,
    disposition,
    next,
    truthBoundary: Object.freeze({
      providerLandmarksUsedAsRegistrationTruth: false as const,
      providerLandmarksUsedAsFR266Truth: false as const,
      providerLandmarksUsedAsFR297Truth: false as const,
    }),
    authorityBoundary: Object.freeze({
      realControlledArtifactRegistrationExecuted:
        input.artifactClass === 'real_controlled_artifact' &&
        predecessorReadyForRegistration &&
        input.registrationExecutionObserved,
      realRegistrationValidatedForFR299Review:
        input.artifactClass === 'real_controlled_artifact' &&
        registrationValidatedForFR299Review,
      fr299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export const FR300_R2F_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2f-ast-rgb-3d-registration-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'registration_contract_ready_provider_response_pending' as const,
  predecessorDisposition:
    FR300_R2E_PREP_CURRENT_GATE.disposition,
  providerResponseState: 'pending' as const,
  registrationContractReady: true as const,
  syntheticFixtureValidationOnly: true as const,
  realParticipantArtifactRegistrationExecuted: false as const,
  realRegistrationValidatedForFR299Review: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionOnProviderApproval:
    'run_r2e_controlled_intake_then_r2f_registration_before_fr299_materialization_review' as const,
  nextPreApprovalAction:
    'exercise_r2f_with_synthetic_canonical_registration_fixtures' as const,
  authority: Object.freeze({
    providerApprovalIssued: false as const,
    realControlledArtifactIntakeAuthorized: false as const,
    realRegistrationAuthorityIssued: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

export function assertFR300R2FRegistrationContract(): void {
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2E_PREP_AST_CONTROLLED_PILOT_INTAKE_READINESS_CONTRACT_VERSION !==
      'FR300-R2E-PREP-AST-CONTROLLED-PILOT-INTAKE-READINESS-v1' ||
    FR300_R2E_PREP_CURRENT_GATE.disposition !==
      'controlled_intake_tooling_ready_provider_response_pending' ||
    FR300_R2E_PREP_CURRENT_GATE.providerResponseState !==
      'pending' ||
    !FR300_R2E_PREP_CURRENT_GATE.controlledIntakeToolingReady ||
    !FR300_R2E_PREP_CURRENT_GATE.syntheticFixtureValidationOnly ||
    FR300_R2E_PREP_CURRENT_GATE.authority.providerApprovalIssued ||
    FR300_R2E_PREP_CURRENT_GATE.authority
      .realControlledArtifactIntakeAuthorized
  ) {
    fail('R2E-PREP predecessor drift.');
  }

  const current = FR300_R2F_CURRENT_GATE;
  if (
    current.disposition !==
      'registration_contract_ready_provider_response_pending' ||
    current.providerResponseState !== 'pending' ||
    !current.registrationContractReady ||
    !current.syntheticFixtureValidationOnly ||
    current.realParticipantArtifactRegistrationExecuted ||
    current.realRegistrationValidatedForFR299Review ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.providerApprovalIssued ||
    current.authority.realControlledArtifactIntakeAuthorized ||
    current.authority.realRegistrationAuthorityIssued ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2F current gate widened real-data or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;

  if (
    materializedCount !== 18 ||
    current.productMaterialization !== '18/29'
  ) {
    fail('R2F must preserve Product 18/29.');
  }
}

assertFR300R2FRegistrationContract();
