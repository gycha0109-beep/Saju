import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2B_PAR_METRIC_SCALE_AUTHORITY,
  FR300_R2B_PAR_PAIRING_AUTHORITY,
  assertFR300R2BPARAstPublicAuthorityResolutionContract,
} from './ast-public-authority-resolution-fr300-r2b-par.js';
import {
  FR300_R2D_SR_AST_CONTROLLED_ACCESS_SUBMISSION_RECEIPT_CONTRACT_VERSION,
  FR300_R2D_SR_CURRENT_GATE,
  assertFR300R2DSRAstControlledAccessSubmissionReceiptContract,
} from './ast-controlled-access-submission-receipt-fr300-r2d-sr.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2E_PREP_AST_CONTROLLED_PILOT_INTAKE_READINESS_CONTRACT_VERSION =
  'FR300-R2E-PREP-AST-CONTROLLED-PILOT-INTAKE-READINESS-v1' as const;

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,511}$/u;

export type FR300R2EPREPMetricAuthorityLevel =
  | 'M1_device_class_metric_capable'
  | 'M2_exact_acquisition_export_metric_documented'
  | 'M3_exact_ast_raw_artifact_scale_source_bound';

export type FR300R2EPREPPairingAuthorityLevel =
  | 'P0_same_subject_only'
  | 'P1_same_session'
  | 'P2_same_neutral_acquisition_condition'
  | 'P3_exact_controlled_artifact_pair_binding';

export type FR300R2EPREPProviderAccessState =
  | 'pending'
  | 'verification_pending'
  | 'approved'
  | 'rejected'
  | 'clarification_requested';

export type FR300R2EPREPIntakeDisposition =
  | 'ready_for_external_registration'
  | 'metric_authority_unresolved'
  | 'pairing_authority_unresolved'
  | 'metric_and_pairing_unresolved'
  | 'artifact_integrity_failure'
  | 'artifact_structural_failure';

export const FR300_R2E_PREP_CONTROLLED_STORAGE_POLICY =
  Object.freeze({
    rawArtifactMayEnterGit: false as const,
    rawArtifactMayEnterGitLfs: false as const,
    rawArtifactMayEnterGithubIssue: false as const,
    rawArtifactMayEnterPublicCloud: false as const,
    thirdPartyPublicCloudProcessingAuthorized: false as const,
    isolatedStorageRequired: true as const,
    publicRepositorySubjectLevelScalarPersistence:
      false as const,
    publicRepositoryAggregateNonIdentifyingMetricsOnly:
      true as const,
    providerLandmarksMayIssueFR266Truth: false as const,
    providerLandmarksMayIssueFR297Truth: false as const,
  });

export interface FR300R2EPREPArtifactIntegrityInput {
  readonly schemaVersion:
    'fr300-r2e-prep-artifact-integrity-input-v1';
  readonly artifactRef: string;
  readonly expectedDigest: string;
  readonly observedDigest: string;
  readonly byteLength: number;
}

export interface FR300R2EPREPArtifactIntegrityReceipt {
  readonly schemaVersion:
    'fr300-r2e-prep-artifact-integrity-receipt-v1';
  readonly artifactRef: string;
  readonly expectedDigest: string;
  readonly observedDigest: string;
  readonly byteLength: number;
  readonly digestVerifiedBeforeInspection: boolean;
  readonly immutableForCurrentEvaluation: boolean;
  readonly passed: boolean;
  readonly disposition:
    | 'verified'
    | 'quarantine_integrity_failure';
}

export interface FR300R2EPREPObjStructureInput {
  readonly schemaVersion:
    'fr300-r2e-prep-obj-structure-input-v1';
  readonly artifactClass:
    | 'synthetic_fixture'
    | 'real_controlled_artifact';
  readonly objText: string;
}

export interface FR300R2EPREPObjStructureReceipt {
  readonly schemaVersion:
    'fr300-r2e-prep-obj-structure-receipt-v1';
  readonly parseValid: boolean;
  readonly vertexCount: number;
  readonly faceCount: number;
  readonly finiteCoordinatesOnly: boolean;
  readonly degenerateGeometry: boolean;
  readonly boundingBox: {
    readonly xSpan: number;
    readonly ySpan: number;
    readonly zSpan: number;
  } | null;
  readonly normalizationDiagnostic: {
    readonly unitSphereLikeCoordinatePatternDetected: boolean;
    readonly diagnosticOnly: true;
    readonly mayIssueMetricAuthority: false;
  };
  readonly structurallyUsable: boolean;
}

export interface FR300R2EPREPMetricAuthorityInput {
  readonly schemaVersion:
    'fr300-r2e-prep-metric-authority-input-v1';
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly coordinateUnit:
    | 'millimeter'
    | 'centimeter'
    | 'meter'
    | 'unknown';
  readonly unitEvidenceClass:
    | 'provider_manifest'
    | 'scanner_export_metadata'
    | 'provider_documentation_bound_to_artifact'
    | 'none';
  readonly exactArtifactBoundToEvidence: boolean;
  readonly preprocessingBeforeRawExport:
    | 'none'
    | 'scale_preserving'
    | 'scale_normalizing'
    | 'unknown';
}

export interface FR300R2EPREPMetricAuthorityReceipt {
  readonly schemaVersion:
    'fr300-r2e-prep-metric-authority-receipt-v1';
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly coordinateUnit:
    FR300R2EPREPMetricAuthorityInput['coordinateUnit'];
  readonly unitEvidenceClass:
    FR300R2EPREPMetricAuthorityInput['unitEvidenceClass'];
  readonly exactArtifactBoundToEvidence: boolean;
  readonly preprocessingBeforeRawExport:
    FR300R2EPREPMetricAuthorityInput['preprocessingBeforeRawExport'];
  readonly authorityLevel:
    FR300R2EPREPMetricAuthorityLevel;
  readonly metricScaleVerifiedForFR299: boolean;
  readonly coordinateMagnitudeUsedAsUnitEvidence: false;
}

export interface FR300R2EPREPPairingAuthorityInput {
  readonly schemaVersion:
    'fr300-r2e-prep-pairing-authority-input-v1';
  readonly raw3DArtifactRef: string;
  readonly rgbArtifactRef: string;
  readonly sameSubjectBound: boolean;
  readonly sameSessionBound: boolean;
  readonly neutralConditionBound: boolean;
  readonly exactArtifactPairManifestBound: boolean;
  readonly exactCaptureBound: boolean;
  readonly temporalSynchronizationBound: boolean;
  readonly scannerRgbExtrinsicsBound: boolean;
  readonly validatedRegistrationAlternativeAvailable: boolean;
}

export interface FR300R2EPREPPairingAuthorityReceipt {
  readonly schemaVersion:
    'fr300-r2e-prep-pairing-authority-receipt-v1';
  readonly raw3DArtifactRef: string;
  readonly rgbArtifactRef: string;
  readonly authorityLevel:
    FR300R2EPREPPairingAuthorityLevel;
  readonly sameSubjectBound: boolean;
  readonly sameSessionBound: boolean;
  readonly neutralConditionBound: boolean;
  readonly exactArtifactPairManifestBound: boolean;
  readonly exactCaptureBound: boolean;
  readonly temporalSynchronizationBound: boolean;
  readonly scannerRgbExtrinsicsBound: boolean;
  readonly validatedRegistrationAlternativeAvailable: boolean;
  readonly fr299SameCaptureBindingEstablished: boolean;
  readonly providerLandmarksUsedAsPairingTruth: false;
}

export interface FR300R2EPREPControlledPilotInput {
  readonly schemaVersion:
    'fr300-r2e-prep-controlled-pilot-input-v1';
  readonly artifactClass:
    | 'synthetic_fixture'
    | 'real_controlled_artifact';
  readonly providerAccessState:
    FR300R2EPREPProviderAccessState;
  readonly duaScopeBound: boolean;
  readonly artifactHandlingEnvironmentApproved: boolean;
  readonly integrity: FR300R2EPREPArtifactIntegrityInput;
  readonly obj: FR300R2EPREPObjStructureInput;
  readonly metric: FR300R2EPREPMetricAuthorityInput;
  readonly pairing: FR300R2EPREPPairingAuthorityInput;
}

export interface FR300R2EPREPControlledPilotAssessment {
  readonly schemaVersion:
    'fr300-r2e-prep-controlled-pilot-assessment-v1';
  readonly artifactClass:
    FR300R2EPREPControlledPilotInput['artifactClass'];
  readonly integrity:
    FR300R2EPREPArtifactIntegrityReceipt;
  readonly structure:
    FR300R2EPREPObjStructureReceipt;
  readonly metric:
    FR300R2EPREPMetricAuthorityReceipt;
  readonly pairing:
    FR300R2EPREPPairingAuthorityReceipt;
  readonly disposition:
    FR300R2EPREPIntakeDisposition;
  readonly next:
    | 'external_registration'
    | 'metric_resolution'
    | 'pairing_resolution'
    | 'metric_and_pairing_resolution'
    | 'reject';
  readonly authorityBoundary: {
    readonly realControlledArtifactAdmitted:
      boolean;
    readonly fr299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2E-PREP ${message}`,
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

export function validateASTPilotArtifactIntegrity(
  input: FR300R2EPREPArtifactIntegrityInput,
): FR300R2EPREPArtifactIntegrityReceipt {
  if (
    input.schemaVersion !==
      'fr300-r2e-prep-artifact-integrity-input-v1'
  ) {
    fail('artifact integrity schemaVersion drift.');
  }

  const artifactRef = boundedRef(
    input.artifactRef,
    'artifactRef',
  );
  digest(input.expectedDigest, 'expectedDigest');
  digest(input.observedDigest, 'observedDigest');

  if (
    !Number.isSafeInteger(input.byteLength) ||
    input.byteLength <= 0
  ) {
    fail('byteLength must be a positive safe integer.');
  }

  const passed =
    input.expectedDigest === input.observedDigest;

  return Object.freeze({
    schemaVersion:
      'fr300-r2e-prep-artifact-integrity-receipt-v1' as const,
    artifactRef,
    expectedDigest: input.expectedDigest,
    observedDigest: input.observedDigest,
    byteLength: input.byteLength,
    digestVerifiedBeforeInspection: passed,
    immutableForCurrentEvaluation: passed,
    passed,
    disposition: passed
      ? ('verified' as const)
      : ('quarantine_integrity_failure' as const),
  });
}

export function inspectASTRawObjStructure(
  input: FR300R2EPREPObjStructureInput,
): FR300R2EPREPObjStructureReceipt {
  if (
    input.schemaVersion !==
      'fr300-r2e-prep-obj-structure-input-v1'
  ) {
    fail('OBJ structure inspection schemaVersion drift.');
  }

  const vertices: Array<readonly [number, number, number]> = [];
  let faceCount = 0;
  let parseValid = true;
  let finiteCoordinatesOnly = true;

  for (const rawLine of input.objText.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (line.length === 0 || line.startsWith('#')) {
      continue;
    }

    if (/^v\s/u.test(line)) {
      const parts = line.split(/\s+/u);
      if (parts.length < 4) {
        parseValid = false;
        continue;
      }

      const xyz = parts.slice(1, 4).map(Number);
      if (
        xyz.length !== 3 ||
        xyz.some((value) => !Number.isFinite(value))
      ) {
        parseValid = false;
        finiteCoordinatesOnly = false;
        continue;
      }

      vertices.push([
        xyz[0] as number,
        xyz[1] as number,
        xyz[2] as number,
      ]);
      continue;
    }

    if (/^f\s/u.test(line)) {
      const parts = line.split(/\s+/u);
      if (parts.length < 4) {
        parseValid = false;
      } else {
        faceCount += 1;
      }
      continue;
    }

    if (
      /^(vt|vn|o|g|s|usemtl|mtllib)\s/u.test(line)
    ) {
      continue;
    }
  }

  let boundingBox:
    FR300R2EPREPObjStructureReceipt['boundingBox'] =
      null;
  let degenerateGeometry = true;
  let unitSphereLikeCoordinatePatternDetected = false;

  if (vertices.length > 0) {
    const xs = vertices.map((v) => v[0]);
    const ys = vertices.map((v) => v[1]);
    const zs = vertices.map((v) => v[2]);

    const xSpan = Math.max(...xs) - Math.min(...xs);
    const ySpan = Math.max(...ys) - Math.min(...ys);
    const zSpan = Math.max(...zs) - Math.min(...zs);

    boundingBox = Object.freeze({
      xSpan,
      ySpan,
      zSpan,
    });

    degenerateGeometry =
      vertices.length < 3 ||
      Math.max(xSpan, ySpan, zSpan) <= 0;

    const radii = vertices.map(([x, y, z]) =>
      Math.sqrt(x * x + y * y + z * z),
    );
    const maxRadius = Math.max(...radii);
    unitSphereLikeCoordinatePatternDetected =
      maxRadius >= 0.9 && maxRadius <= 1.01;
  }

  const structurallyUsable =
    parseValid &&
    finiteCoordinatesOnly &&
    vertices.length >= 3 &&
    !degenerateGeometry;

  return Object.freeze({
    schemaVersion:
      'fr300-r2e-prep-obj-structure-receipt-v1' as const,
    parseValid,
    vertexCount: vertices.length,
    faceCount,
    finiteCoordinatesOnly,
    degenerateGeometry,
    boundingBox,
    normalizationDiagnostic: Object.freeze({
      unitSphereLikeCoordinatePatternDetected,
      diagnosticOnly: true as const,
      mayIssueMetricAuthority: false as const,
    }),
    structurallyUsable,
  });
}

export function assessASTPilotMetricAuthority(
  input: FR300R2EPREPMetricAuthorityInput,
): FR300R2EPREPMetricAuthorityReceipt {
  if (
    input.schemaVersion !==
      'fr300-r2e-prep-metric-authority-input-v1'
  ) {
    fail('metric authority schemaVersion drift.');
  }

  const artifactRef = boundedRef(
    input.artifactRef,
    'metric.artifactRef',
  );
  digest(input.artifactDigest, 'metric.artifactDigest');

  const unitKnown = input.coordinateUnit !== 'unknown';
  const evidenceKnown = input.unitEvidenceClass !== 'none';

  let authorityLevel:
    FR300R2EPREPMetricAuthorityLevel =
      'M1_device_class_metric_capable';

  if (unitKnown && evidenceKnown) {
    authorityLevel =
      'M2_exact_acquisition_export_metric_documented';
  }

  if (
    unitKnown &&
    evidenceKnown &&
    input.exactArtifactBoundToEvidence &&
    (input.preprocessingBeforeRawExport === 'none' ||
      input.preprocessingBeforeRawExport ===
        'scale_preserving')
  ) {
    authorityLevel =
      'M3_exact_ast_raw_artifact_scale_source_bound';
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2e-prep-metric-authority-receipt-v1' as const,
    artifactRef,
    artifactDigest: input.artifactDigest,
    coordinateUnit: input.coordinateUnit,
    unitEvidenceClass: input.unitEvidenceClass,
    exactArtifactBoundToEvidence:
      input.exactArtifactBoundToEvidence,
    preprocessingBeforeRawExport:
      input.preprocessingBeforeRawExport,
    authorityLevel,
    metricScaleVerifiedForFR299:
      authorityLevel ===
      'M3_exact_ast_raw_artifact_scale_source_bound',
    coordinateMagnitudeUsedAsUnitEvidence:
      false as const,
  });
}

export function assessASTPilotPairingAuthority(
  input: FR300R2EPREPPairingAuthorityInput,
): FR300R2EPREPPairingAuthorityReceipt {
  if (
    input.schemaVersion !==
      'fr300-r2e-prep-pairing-authority-input-v1'
  ) {
    fail('pairing authority schemaVersion drift.');
  }

  const raw3DArtifactRef = boundedRef(
    input.raw3DArtifactRef,
    'pairing.raw3DArtifactRef',
  );
  const rgbArtifactRef = boundedRef(
    input.rgbArtifactRef,
    'pairing.rgbArtifactRef',
  );

  let authorityLevel:
    FR300R2EPREPPairingAuthorityLevel =
      'P0_same_subject_only';

  if (input.sameSubjectBound && input.sameSessionBound) {
    authorityLevel = 'P1_same_session';
  }

  if (
    input.sameSubjectBound &&
    input.sameSessionBound &&
    input.neutralConditionBound
  ) {
    authorityLevel =
      'P2_same_neutral_acquisition_condition';
  }

  if (
    input.sameSubjectBound &&
    input.sameSessionBound &&
    input.neutralConditionBound &&
    input.exactArtifactPairManifestBound &&
    input.exactCaptureBound
  ) {
    authorityLevel =
      'P3_exact_controlled_artifact_pair_binding';
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2e-prep-pairing-authority-receipt-v1' as const,
    raw3DArtifactRef,
    rgbArtifactRef,
    authorityLevel,
    sameSubjectBound: input.sameSubjectBound,
    sameSessionBound: input.sameSessionBound,
    neutralConditionBound: input.neutralConditionBound,
    exactArtifactPairManifestBound:
      input.exactArtifactPairManifestBound,
    exactCaptureBound: input.exactCaptureBound,
    temporalSynchronizationBound:
      input.temporalSynchronizationBound,
    scannerRgbExtrinsicsBound:
      input.scannerRgbExtrinsicsBound,
    validatedRegistrationAlternativeAvailable:
      input.validatedRegistrationAlternativeAvailable,
    fr299SameCaptureBindingEstablished:
      authorityLevel ===
      'P3_exact_controlled_artifact_pair_binding',
    providerLandmarksUsedAsPairingTruth:
      false as const,
  });
}

export function assessASTControlledPilotIntake(
  input: FR300R2EPREPControlledPilotInput,
): FR300R2EPREPControlledPilotAssessment {
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract();

  if (
    input.schemaVersion !==
      'fr300-r2e-prep-controlled-pilot-input-v1'
  ) {
    fail('controlled pilot input schemaVersion drift.');
  }

  if (
    input.artifactClass === 'real_controlled_artifact' &&
    (input.providerAccessState !== 'approved' ||
      !input.duaScopeBound ||
      !input.artifactHandlingEnvironmentApproved)
  ) {
    fail(
      'real controlled artifact intake requires provider approval, DUA scope binding, and approved handling environment.',
    );
  }

  if (input.obj.artifactClass !== input.artifactClass) {
    fail('OBJ artifact class must match the controlled pilot artifact class.');
  }

  const integrity =
    validateASTPilotArtifactIntegrity(input.integrity);
  const structure =
    inspectASTRawObjStructure(input.obj);
  const metric =
    assessASTPilotMetricAuthority(input.metric);
  const pairing =
    assessASTPilotPairingAuthority(input.pairing);

  let disposition:
    FR300R2EPREPIntakeDisposition;
  let next:
    FR300R2EPREPControlledPilotAssessment['next'];

  if (!integrity.passed) {
    disposition = 'artifact_integrity_failure';
    next = 'reject';
  } else if (!structure.structurallyUsable) {
    disposition = 'artifact_structural_failure';
    next = 'reject';
  } else {
    const metricReady =
      metric.metricScaleVerifiedForFR299;
    const pairingReady =
      pairing.fr299SameCaptureBindingEstablished ||
      pairing.validatedRegistrationAlternativeAvailable;

    if (metricReady && pairingReady) {
      disposition = 'ready_for_external_registration';
      next = 'external_registration';
    } else if (!metricReady && !pairingReady) {
      disposition = 'metric_and_pairing_unresolved';
      next = 'metric_and_pairing_resolution';
    } else if (!metricReady) {
      disposition = 'metric_authority_unresolved';
      next = 'metric_resolution';
    } else {
      disposition = 'pairing_authority_unresolved';
      next = 'pairing_resolution';
    }
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2e-prep-controlled-pilot-assessment-v1' as const,
    artifactClass: input.artifactClass,
    integrity,
    structure,
    metric,
    pairing,
    disposition,
    next,
    authorityBoundary: Object.freeze({
      realControlledArtifactAdmitted:
        input.artifactClass ===
          'real_controlled_artifact' &&
        input.providerAccessState === 'approved' &&
        input.duaScopeBound &&
        input.artifactHandlingEnvironmentApproved,
      fr299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
    }),
  });
}

export const FR300_R2E_PREP_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2e-prep-ast-controlled-pilot-intake-readiness-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'controlled_intake_tooling_ready_provider_response_pending' as const,
  predecessorSubmissionDisposition:
    FR300_R2D_SR_CURRENT_GATE.disposition,
  providerResponseState: 'pending' as const,
  controlledIntakeToolingReady: true as const,
  syntheticFixtureValidationOnly: true as const,
  realParticipantArtifactIntakePerformed: false as const,
  realParticipantArtifactInspected: false as const,
  currentRealMetricAuthorityLevel:
    FR300_R2B_PAR_METRIC_SCALE_AUTHORITY.metricAuthorityLevel,
  currentRealPairingAuthorityLevel:
    FR300_R2B_PAR_PAIRING_AUTHORITY.pairingAuthorityLevel,
  realFR299MetricScaleVerified: false as const,
  realFR299CorrespondenceVerified: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionOnProviderApproval:
    'run_minimum_single_subject_controlled_pilot_through_integrity_structure_metric_and_pairing_gates' as const,
  authority: Object.freeze({
    providerApprovalIssued: false as const,
    realControlledArtifactIntakeAuthorized: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

export function assertFR300R2EPREPAstControlledPilotIntakeReadinessContract(): void {
  assertFR300R2DSRAstControlledAccessSubmissionReceiptContract();
  assertFR300R2BPARAstPublicAuthorityResolutionContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2D_SR_AST_CONTROLLED_ACCESS_SUBMISSION_RECEIPT_CONTRACT_VERSION !==
      'FR300-R2D-SR-AST-CONTROLLED-ACCESS-SUBMISSION-RECEIPT-v1' ||
    FR300_R2D_SR_CURRENT_GATE.disposition !==
      'controlled_access_request_submitted_provider_response_pending' ||
    !FR300_R2D_SR_CURRENT_GATE.controlledAccessRequested ||
    FR300_R2D_SR_CURRENT_GATE.controlledAccessApproved
  ) {
    fail('R2D-SR predecessor drift.');
  }

  const storage =
    FR300_R2E_PREP_CONTROLLED_STORAGE_POLICY;
  if (
    storage.rawArtifactMayEnterGit ||
    storage.rawArtifactMayEnterGitLfs ||
    storage.rawArtifactMayEnterGithubIssue ||
    storage.rawArtifactMayEnterPublicCloud ||
    storage.thirdPartyPublicCloudProcessingAuthorized ||
    !storage.isolatedStorageRequired ||
    storage.publicRepositorySubjectLevelScalarPersistence ||
    !storage.publicRepositoryAggregateNonIdentifyingMetricsOnly ||
    storage.providerLandmarksMayIssueFR266Truth ||
    storage.providerLandmarksMayIssueFR297Truth
  ) {
    fail('controlled storage/privacy boundary drift.');
  }

  const current = FR300_R2E_PREP_CURRENT_GATE;
  if (
    current.disposition !==
      'controlled_intake_tooling_ready_provider_response_pending' ||
    current.providerResponseState !== 'pending' ||
    !current.controlledIntakeToolingReady ||
    !current.syntheticFixtureValidationOnly ||
    current.realParticipantArtifactIntakePerformed ||
    current.realParticipantArtifactInspected ||
    current.currentRealMetricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    current.currentRealPairingAuthorityLevel !==
      'P2_same_neutral_acquisition_condition' ||
    current.realFR299MetricScaleVerified ||
    current.realFR299CorrespondenceVerified ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.providerApprovalIssued ||
    current.authority.realControlledArtifactIntakeAuthorized ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2E-PREP current gate widened real-data or product authority.');
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
    fail('R2E-PREP must preserve Product 18/29.');
  }
}

assertFR300R2EPREPAstControlledPilotIntakeReadinessContract();
