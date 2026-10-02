import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2B_PAR_METRIC_SCALE_AUTHORITY,
  FR300_R2B_PAR_PAIRING_AUTHORITY,
} from './ast-public-authority-resolution-fr300-r2b-par.js';
import {
  FR300_R2E_PREP_CURRENT_GATE,
  type FR300R2EPREPControlledPilotAssessment,
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract,
} from './ast-controlled-pilot-intake-readiness-fr300-r2e-prep.js';
import {
  FR300_R2F_CURRENT_GATE,
  type FR300R2FRegistrationAssessment,
  assertFR300R2FRegistrationContract,
} from './ast-rgb-3d-registration-contract-fr300-r2f.js';
import {
  FR300_R2H_CURRENT_GATE,
  assertFR300R2HControlledArtifactLifecycleContract,
} from './controlled-artifact-lifecycle-fr300-r2h.js';
import {
  FR300_R2I_CURRENT_GATE,
  assertFR300R2IProviderResponseTransitionContract,
} from './ast-provider-response-transition-fr300-r2i.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2J_FR299_QUALIFICATION_ADJUDICATOR_CONTRACT_VERSION =
  'FR300-R2J-FR299-QUALIFICATION-ADJUDICATOR-v1' as const;

export type FR300R2JFailureReason =
  | 'PROVIDER_RESPONSE_RECEIPT_UNBOUND'
  | 'PROVIDER_APPROVAL_MISSING'
  | 'DUA_SCOPE_UNBOUND'
  | 'HANDLING_ENVIRONMENT_UNAPPROVED'
  | 'ARTIFACT_CLASS_MISMATCH'
  | 'REAL_ARTIFACT_NOT_ADMITTED'
  | 'INTEGRITY_NOT_VERIFIED'
  | 'STRUCTURE_NOT_USABLE'
  | 'METRIC_AUTHORITY_NOT_M3'
  | 'CORRESPONDENCE_AUTHORITY_UNRESOLVED'
  | 'REGISTRATION_NOT_VALIDATED'
  | 'REAL_REGISTRATION_AUTHORITY_MISSING'
  | 'RAW_ARTIFACT_REF_MISMATCH'
  | 'RAW_ARTIFACT_DIGEST_MISMATCH'
  | 'RGB_ARTIFACT_REF_MISMATCH'
  | 'FORBIDDEN_PERSISTENCE_OBSERVED'
  | 'DELETION_LIFECYCLE_UNBOUND'
  | 'PUBLIC_OUTPUT_BOUNDARY_UNSAFE'
  | 'PROVIDER_LANDMARK_TRUTH_USED';

export interface FR300R2JLifecycleEvidence {
  readonly schemaVersion: 'fr300-r2j-lifecycle-evidence-v1';
  readonly isolatedStorageUsed: boolean;
  readonly rawGitPersistenceObserved: boolean;
  readonly rawGitLfsPersistenceObserved: boolean;
  readonly rawGithubIssuePersistenceObserved: boolean;
  readonly rawPublicCloudPersistenceObserved: boolean;
  readonly thirdPartyCloudProcessingObserved: boolean;
  readonly deletionWhenNoLongerNeededBound: boolean;
  readonly deletionReceiptVerified: boolean;
  readonly allTrackedArtifactPathsAbsentAfterDeletion: boolean;
  readonly deletionOnProviderRequestBound: boolean;
  readonly trackedCopiesAndBackupsDeletionBound: boolean;
  readonly publicAggregateNonIdentifyingOnly: boolean;
  readonly publicSubjectLevelScalarPersistenceObserved: boolean;
  readonly rawOrReconstructivePublicPersistenceObserved: boolean;
}

export interface FR300R2JQualificationInput {
  readonly schemaVersion: 'fr300-r2j-qualification-input-v1';
  readonly artifactClass:
    | 'synthetic_fixture'
    | 'real_controlled_artifact';
  readonly providerResponseTransitionReceiptBound: boolean;
  readonly providerApprovalGateSatisfied: boolean;
  readonly duaScopeBound: boolean;
  readonly artifactHandlingEnvironmentApproved: boolean;
  readonly pilotAssessment: FR300R2EPREPControlledPilotAssessment;
  readonly registrationAssessment: FR300R2FRegistrationAssessment;
  readonly lifecycle: FR300R2JLifecycleEvidence;
  readonly providerLandmarksUsedAsQualificationTruth: boolean;
}

export interface FR300R2JQualificationReceipt {
  readonly schemaVersion: 'fr300-r2j-qualification-receipt-v1';
  readonly artifactClass:
    FR300R2JQualificationInput['artifactClass'];
  readonly disposition:
    | 'eligible_for_fr299_reference_materialization_review'
    | 'not_eligible';
  readonly qualificationEligible: boolean;
  readonly syntheticFixtureQualificationEligible: boolean;
  readonly realFR299CandidateEligible: boolean;
  readonly failureReasons: readonly FR300R2JFailureReason[];
  readonly metricAuthorityLevel:
    FR300R2EPREPControlledPilotAssessment['metric']['authorityLevel'];
  readonly pairingAuthorityLevel:
    FR300R2EPREPControlledPilotAssessment['pairing']['authorityLevel'];
  readonly correspondenceResolution:
    | 'p3_exact_pair'
    | 'validated_registration_alternative'
    | 'unresolved';
  readonly artifactIdentityBound: boolean;
  readonly lifecycleBoundarySatisfied: boolean;
  readonly next:
    | 'fr299_reference_materialization_review'
    | 'resolve_qualification_failures';
  readonly authorityBoundary: {
    readonly fr299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2J ${message}`,
  );
}

function assertR2JPredecessors(): void {
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract();
  assertFR300R2FRegistrationContract();
  assertFR300R2HControlledArtifactLifecycleContract();
  assertFR300R2IProviderResponseTransitionContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2I_CURRENT_GATE.providerResponseState !== 'pending' ||
    FR300_R2I_CURRENT_GATE.providerApprovalIssued ||
    FR300_R2E_PREP_CURRENT_GATE.currentRealMetricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    FR300_R2E_PREP_CURRENT_GATE.currentRealPairingAuthorityLevel !==
      'P2_same_neutral_acquisition_condition' ||
    FR300_R2F_CURRENT_GATE.realRegistrationValidatedForFR299Review ||
    FR300_R2H_CURRENT_GATE.realLifecycleExecutionAuthorized
  ) {
    fail('predecessor current authority drift.');
  }
}

function lifecycleSatisfied(
  lifecycle: FR300R2JLifecycleEvidence,
): boolean {
  if (
    lifecycle.schemaVersion !==
    'fr300-r2j-lifecycle-evidence-v1'
  ) {
    fail('lifecycle evidence schemaVersion drift.');
  }

  return (
    lifecycle.isolatedStorageUsed &&
    !lifecycle.rawGitPersistenceObserved &&
    !lifecycle.rawGitLfsPersistenceObserved &&
    !lifecycle.rawGithubIssuePersistenceObserved &&
    !lifecycle.rawPublicCloudPersistenceObserved &&
    !lifecycle.thirdPartyCloudProcessingObserved &&
    lifecycle.deletionWhenNoLongerNeededBound &&
    lifecycle.deletionReceiptVerified &&
    lifecycle.allTrackedArtifactPathsAbsentAfterDeletion &&
    lifecycle.deletionOnProviderRequestBound &&
    lifecycle.trackedCopiesAndBackupsDeletionBound &&
    lifecycle.publicAggregateNonIdentifyingOnly &&
    !lifecycle.publicSubjectLevelScalarPersistenceObserved &&
    !lifecycle.rawOrReconstructivePublicPersistenceObserved
  );
}

export function adjudicateFR300R2JFR299Qualification(
  input: FR300R2JQualificationInput,
): FR300R2JQualificationReceipt {
  assertR2JPredecessors();

  if (
    input.schemaVersion !==
    'fr300-r2j-qualification-input-v1'
  ) {
    fail('qualification input schemaVersion drift.');
  }

  const reasons: FR300R2JFailureReason[] = [];
  const pilot = input.pilotAssessment;
  const registration = input.registrationAssessment;

  if (!input.providerResponseTransitionReceiptBound) {
    reasons.push('PROVIDER_RESPONSE_RECEIPT_UNBOUND');
  }
  if (!input.providerApprovalGateSatisfied) {
    reasons.push('PROVIDER_APPROVAL_MISSING');
  }
  if (!input.duaScopeBound) {
    reasons.push('DUA_SCOPE_UNBOUND');
  }
  if (!input.artifactHandlingEnvironmentApproved) {
    reasons.push('HANDLING_ENVIRONMENT_UNAPPROVED');
  }

  if (
    pilot.artifactClass !== input.artifactClass ||
    registration.artifactClass !== input.artifactClass
  ) {
    reasons.push('ARTIFACT_CLASS_MISMATCH');
  }

  if (
    input.artifactClass === 'real_controlled_artifact' &&
    !pilot.authorityBoundary.realControlledArtifactAdmitted
  ) {
    reasons.push('REAL_ARTIFACT_NOT_ADMITTED');
  }

  if (
    !pilot.integrity.passed ||
    !pilot.integrity.digestVerifiedBeforeInspection ||
    !pilot.integrity.immutableForCurrentEvaluation
  ) {
    reasons.push('INTEGRITY_NOT_VERIFIED');
  }

  if (!pilot.structure.structurallyUsable) {
    reasons.push('STRUCTURE_NOT_USABLE');
  }

  const metricM3 =
    pilot.metric.authorityLevel ===
      'M3_exact_ast_raw_artifact_scale_source_bound' &&
    pilot.metric.metricScaleVerifiedForFR299;

  if (!metricM3) {
    reasons.push('METRIC_AUTHORITY_NOT_M3');
  }

  const p3Exact =
    pilot.pairing.authorityLevel ===
      'P3_exact_controlled_artifact_pair_binding' &&
    pilot.pairing.fr299SameCaptureBindingEstablished;

  const registrationAlternative =
    pilot.pairing.validatedRegistrationAlternativeAvailable &&
    registration.registrationValidatedForFR299Review;

  const correspondenceResolution:
    FR300R2JQualificationReceipt['correspondenceResolution'] =
    p3Exact
      ? 'p3_exact_pair'
      : registrationAlternative
        ? 'validated_registration_alternative'
        : 'unresolved';

  if (correspondenceResolution === 'unresolved') {
    reasons.push('CORRESPONDENCE_AUTHORITY_UNRESOLVED');
  }

  if (
    !registration.registrationValidatedForFR299Review ||
    registration.disposition !==
      'registration_validated_for_materialization_review' ||
    registration.next !== 'fr299_materialization_review'
  ) {
    reasons.push('REGISTRATION_NOT_VALIDATED');
  }

  if (
    input.artifactClass === 'real_controlled_artifact' &&
    !registration.authorityBoundary
      .realRegistrationValidatedForFR299Review
  ) {
    reasons.push('REAL_REGISTRATION_AUTHORITY_MISSING');
  }

  const rawRefBound =
    registration.raw3DArtifactRef ===
      pilot.integrity.artifactRef &&
    registration.raw3DArtifactRef ===
      pilot.metric.artifactRef &&
    registration.raw3DArtifactRef ===
      pilot.pairing.raw3DArtifactRef;

  if (!rawRefBound) {
    reasons.push('RAW_ARTIFACT_REF_MISMATCH');
  }

  const rawDigestBound =
    registration.raw3DArtifactDigest ===
      pilot.integrity.observedDigest &&
    registration.raw3DArtifactDigest ===
      pilot.metric.artifactDigest;

  if (!rawDigestBound) {
    reasons.push('RAW_ARTIFACT_DIGEST_MISMATCH');
  }

  const rgbRefBound =
    registration.rgbArtifactRef ===
    pilot.pairing.rgbArtifactRef;

  if (!rgbRefBound) {
    reasons.push('RGB_ARTIFACT_REF_MISMATCH');
  }

  const lifecycleBoundarySatisfied =
    lifecycleSatisfied(input.lifecycle);

  const forbiddenPersistenceObserved =
    input.lifecycle.rawGitPersistenceObserved ||
    input.lifecycle.rawGitLfsPersistenceObserved ||
    input.lifecycle.rawGithubIssuePersistenceObserved ||
    input.lifecycle.rawPublicCloudPersistenceObserved ||
    input.lifecycle.thirdPartyCloudProcessingObserved;

  if (forbiddenPersistenceObserved) {
    reasons.push('FORBIDDEN_PERSISTENCE_OBSERVED');
  }

  if (
    !input.lifecycle.deletionWhenNoLongerNeededBound ||
    !input.lifecycle.deletionReceiptVerified ||
    !input.lifecycle.allTrackedArtifactPathsAbsentAfterDeletion ||
    !input.lifecycle.deletionOnProviderRequestBound ||
    !input.lifecycle.trackedCopiesAndBackupsDeletionBound
  ) {
    reasons.push('DELETION_LIFECYCLE_UNBOUND');
  }

  if (
    !input.lifecycle.isolatedStorageUsed ||
    !input.lifecycle.publicAggregateNonIdentifyingOnly ||
    input.lifecycle.publicSubjectLevelScalarPersistenceObserved ||
    input.lifecycle.rawOrReconstructivePublicPersistenceObserved
  ) {
    reasons.push('PUBLIC_OUTPUT_BOUNDARY_UNSAFE');
  }

  if (
    input.providerLandmarksUsedAsQualificationTruth ||
    registration.truthBoundary
      .providerLandmarksUsedAsRegistrationTruth ||
    registration.truthBoundary
      .providerLandmarksUsedAsFR266Truth ||
    registration.truthBoundary
      .providerLandmarksUsedAsFR297Truth ||
    pilot.pairing.providerLandmarksUsedAsPairingTruth
  ) {
    reasons.push('PROVIDER_LANDMARK_TRUTH_USED');
  }

  const artifactIdentityBound =
    rawRefBound && rawDigestBound && rgbRefBound;

  const qualificationEligible =
    reasons.length === 0 &&
    lifecycleBoundarySatisfied &&
    artifactIdentityBound;

  return Object.freeze({
    schemaVersion:
      'fr300-r2j-qualification-receipt-v1' as const,
    artifactClass: input.artifactClass,
    disposition: qualificationEligible
      ? ('eligible_for_fr299_reference_materialization_review' as const)
      : ('not_eligible' as const),
    qualificationEligible,
    syntheticFixtureQualificationEligible:
      qualificationEligible &&
      input.artifactClass === 'synthetic_fixture',
    realFR299CandidateEligible:
      qualificationEligible &&
      input.artifactClass === 'real_controlled_artifact',
    failureReasons: Object.freeze([...new Set(reasons)]),
    metricAuthorityLevel: pilot.metric.authorityLevel,
    pairingAuthorityLevel:
      pilot.pairing.authorityLevel,
    correspondenceResolution,
    artifactIdentityBound,
    lifecycleBoundarySatisfied,
    next: qualificationEligible
      ? ('fr299_reference_materialization_review' as const)
      : ('resolve_qualification_failures' as const),
    authorityBoundary: Object.freeze({
      fr299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export const FR300_R2J_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2j-fr299-qualification-adjudicator-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'fr299_adjudicator_ready_real_evidence_not_eligible' as const,
  providerResponseState:
    FR300_R2I_CURRENT_GATE.providerResponseState,
  currentRealMetricAuthorityLevel:
    FR300_R2B_PAR_METRIC_SCALE_AUTHORITY.metricAuthorityLevel,
  currentRealPairingAuthorityLevel:
    FR300_R2B_PAR_PAIRING_AUTHORITY.pairingAuthorityLevel,
  adjudicatorReady: true as const,
  syntheticFixtureValidationOnly: true as const,
  realFR299CandidateEligible: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionOnProviderApproval:
    'run_single_subject_r2h_r2e_r2f_r2g_evidence_then_r2j_adjudication' as const,
  nextPreApprovalAction:
    'research_alternative_metric_and_pairing_authority_routes_without_widening_ast_authority' as const,
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

export function assertFR300R2JFR299QualificationAdjudicatorContract(): void {
  assertR2JPredecessors();

  const current = FR300_R2J_CURRENT_GATE;
  if (
    current.disposition !==
      'fr299_adjudicator_ready_real_evidence_not_eligible' ||
    current.providerResponseState !== 'pending' ||
    current.currentRealMetricAuthorityLevel !==
      'M1_device_class_metric_capable' ||
    current.currentRealPairingAuthorityLevel !==
      'P2_same_neutral_acquisition_condition' ||
    !current.adjudicatorReady ||
    !current.syntheticFixtureValidationOnly ||
    current.realFR299CandidateEligible ||
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
    fail('R2J current gate widened real FR299 or product authority.');
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
    fail('R2J must preserve Product 18/29.');
  }
}

assertFR300R2JFR299QualificationAdjudicatorContract();
