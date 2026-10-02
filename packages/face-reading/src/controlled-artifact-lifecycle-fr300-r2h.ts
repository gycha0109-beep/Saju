import { createHash } from 'node:crypto';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  isAbsolute,
  join,
  relative,
  resolve,
} from 'node:path';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R2D_AR_AST_AUTHORITATIVE_DUA_RIGHTS_CONTRACT_VERSION,
  FR300_R2D_AR_BOUNDED_USE_PROFILE,
  FR300_R2D_AR_RIGHTS_MATRIX,
  assertFR300R2DARAstAuthoritativeDuaRightsContract,
} from './ast-authoritative-dua-rights-fr300-r2d-ar.js';
import {
  FR300_R2D_SR_CURRENT_GATE,
  assertFR300R2DSRAstControlledAccessSubmissionReceiptContract,
} from './ast-controlled-access-submission-receipt-fr300-r2d-sr.js';
import {
  FR300_R2E_PREP_CONTROLLED_STORAGE_POLICY,
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract,
} from './ast-controlled-pilot-intake-readiness-fr300-r2e-prep.js';
import {
  FR300_R2G_B_CURRENT_GATE,
  FR300_R2G_B_SYNTHETIC_INDEPENDENT_REGISTRATION_CONTRACT_VERSION,
  assertFR300R2GBSyntheticIndependentRegistrationContract,
} from './synthetic-independent-registration-fr300-r2g-b.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R2H_CONTROLLED_ARTIFACT_LIFECYCLE_CONTRACT_VERSION =
  'FR300-R2H-CONTROLLED-ARTIFACT-LIFECYCLE-v1' as const;

const SHA256 = /^sha256:[0-9a-f]{64}$/u;

export type FR300R2HArtifactClass =
  | 'synthetic_fixture'
  | 'real_controlled_artifact';

export type FR300R2HStorageSurface =
  | 'isolated_local_workspace'
  | 'git'
  | 'git_lfs'
  | 'github_issue'
  | 'public_cloud'
  | 'third_party_cloud';

export type FR300R2HPublicPersistenceClass =
  | 'none'
  | 'aggregate_non_identifying_only'
  | 'subject_level_scalar'
  | 'raw_or_reconstructive';

export type FR300R2HDeletionTrigger =
  | 'synthetic_dry_run'
  | 'no_longer_needed'
  | 'provider_request';

export interface FR300R2HHandlingPlanInput {
  readonly schemaVersion:
    'fr300-r2h-handling-plan-input-v1';
  readonly artifactClass: FR300R2HArtifactClass;
  readonly providerAccessState:
    | 'pending'
    | 'verification_pending'
    | 'approved'
    | 'rejected'
    | 'clarification_requested';
  readonly duaScopeBound: boolean;
  readonly artifactHandlingEnvironmentApproved: boolean;
  readonly storageSurface: FR300R2HStorageSurface;
  readonly insideGitWorkingTree: boolean;
  readonly rawArtifactRedistributionPlanned: boolean;
  readonly gitPersistencePlanned: boolean;
  readonly gitLfsPersistencePlanned: boolean;
  readonly githubIssuePersistencePlanned: boolean;
  readonly publicCloudPersistencePlanned: boolean;
  readonly thirdPartyCloudProcessingPlanned: boolean;
  readonly publicPersistenceClass:
    FR300R2HPublicPersistenceClass;
  readonly secureTechnicalAndAdministrativeControlsBound:
    boolean;
  readonly deletionWhenNoLongerNeededPlanned: boolean;
  readonly deletionOnProviderRequestPlanned: boolean;
  readonly deleteTrackedCopiesAndBackupsPlanned: boolean;
  readonly datasetCitationProcedureBound: boolean;
  readonly breachNotificationProcedureBound: boolean;
}

export interface FR300R2HHandlingPlanAssessment {
  readonly schemaVersion:
    'fr300-r2h-handling-plan-assessment-v1';
  readonly artifactClass: FR300R2HArtifactClass;
  readonly storageSurface: 'isolated_local_workspace';
  readonly syntheticExecutionAuthorized: boolean;
  readonly realControlledExecutionAuthorized: false;
  readonly publicPersistenceClass:
    | 'none'
    | 'aggregate_non_identifying_only';
  readonly storageBoundarySatisfied: true;
  readonly duaLifecycleObligationsBound: true;
  readonly rawRedistributionPlanned: false;
  readonly thirdPartyCloudProcessingPlanned: false;
  readonly next:
    | 'execute_synthetic_isolated_lifecycle'
    | 'await_provider_approval_before_real_intake';
  readonly authorityBoundary: {
    readonly providerApprovalIssued: false;
    readonly realControlledArtifactIntakeAuthorized: false;
    readonly rawParticipantArtifactUseAuthorized: false;
    readonly fr299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR300R2HDeletionReceiptInput {
  readonly schemaVersion:
    'fr300-r2h-deletion-receipt-input-v1';
  readonly artifactClass: FR300R2HArtifactClass;
  readonly trigger: FR300R2HDeletionTrigger;
  readonly primaryArtifactDeleted: boolean;
  readonly trackedTemporaryCopyCount: number;
  readonly trackedTemporaryCopiesDeleted: number;
  readonly trackedBackupCount: number;
  readonly trackedBackupsDeleted: number;
  readonly allTrackedPathsAbsentAfterDeletion: boolean;
  readonly rawBytesPersistedInReceipt: boolean;
  readonly subjectLevelScalarPersistedInPublicReceipt:
    boolean;
  readonly rawOrReconstructiveDerivativePersistedPublicly:
    boolean;
  readonly receiptPersistenceClass:
    | 'synthetic_test_evidence'
    | 'private_controlled_only';
}

export interface FR300R2HDeletionReceipt {
  readonly schemaVersion:
    'fr300-r2h-deletion-receipt-v1';
  readonly artifactClass: FR300R2HArtifactClass;
  readonly trigger: FR300R2HDeletionTrigger;
  readonly primaryArtifactDeleted: true;
  readonly trackedTemporaryCopyCount: number;
  readonly trackedTemporaryCopiesDeleted: number;
  readonly trackedBackupCount: number;
  readonly trackedBackupsDeleted: number;
  readonly allTrackedPathsAbsentAfterDeletion: true;
  readonly rawBytesPersistedInReceipt: false;
  readonly subjectLevelScalarPersistedInPublicReceipt: false;
  readonly rawOrReconstructiveDerivativePersistedPublicly:
    false;
  readonly receiptPersistenceClass:
    FR300R2HDeletionReceiptInput['receiptPersistenceClass'];
  readonly deletionComplete: true;
}

export interface FR300R2HSyntheticFilesystemDryRunInput {
  readonly schemaVersion:
    'fr300-r2h-synthetic-filesystem-dry-run-input-v1';
  readonly expectedDigest: string;
}

export interface FR300R2HSyntheticFilesystemDryRunReceipt {
  readonly schemaVersion:
    'fr300-r2h-synthetic-filesystem-dry-run-receipt-v1';
  readonly artifactClass: 'synthetic_fixture';
  readonly isolatedWorkspaceOutsideGitWorkingTree: true;
  readonly digestVerifiedBeforeInspection: true;
  readonly analysisExecutedAfterDigestVerification: true;
  readonly trackedTemporaryCopyCount: 1;
  readonly trackedBackupCount: 1;
  readonly deletionReceipt: FR300R2HDeletionReceipt;
  readonly workspaceRemovedAfterExecution: true;
  readonly publicProjection: {
    readonly schemaVersion:
      'fr300-r2h-public-projection-v1';
    readonly syntheticFixtureOnly: true;
    readonly aggregateNonIdentifyingOnly: true;
    readonly rawBytesIncluded: false;
    readonly rawDigestIncluded: false;
    readonly filesystemPathIncluded: false;
    readonly subjectLevelScalarIncluded: false;
    readonly reconstructiveDerivativeIncluded: false;
    readonly aggregate: {
      readonly lifecycleExecutions: 1;
      readonly digestVerificationPasses: 1;
      readonly deletionPasses: 1;
    };
  };
  readonly authorityBoundary: {
    readonly realParticipantArtifactUsed: false;
    readonly realDeletionReceiptIssued: false;
    readonly realRegistrationAuthorityIssued: false;
    readonly fr299ReferenceMaterialized: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const SYNTHETIC_BYTES = Buffer.from(
  [
    '# FR300-R2H non-human synthetic controlled artifact',
    'v -10 -10 100',
    'v 10 -10 100',
    'v 0 12 105',
    'f 1 2 3',
    '',
  ].join('\n'),
  'utf8',
);

function sha256(value: Uint8Array): string {
  return `sha256:${createHash('sha256')
    .update(value)
    .digest('hex')}`;
}

export const FR300_R2H_SYNTHETIC_ARTIFACT_DIGEST =
  sha256(SYNTHETIC_BYTES);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R2H ${message}`,
  );
}

function assertDigest(value: string, label: string): string {
  if (!SHA256.test(value)) {
    fail(`${label} must be sha256:<64 lowercase hex>.`);
  }
  return value;
}

function assertR2HPredecessors(): void {
  assertFR300R2GBSyntheticIndependentRegistrationContract();
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract();
  assertFR300R2DSRAstControlledAccessSubmissionReceiptContract();
  assertFR300R2DARAstAuthoritativeDuaRightsContract();
  assertFR293ProductColumnMap();

  if (
    FR300_R2G_B_SYNTHETIC_INDEPENDENT_REGISTRATION_CONTRACT_VERSION !==
      'FR300-R2G-B-SYNTHETIC-INDEPENDENT-REGISTRATION-v1' ||
    FR300_R2G_B_CURRENT_GATE.disposition !==
      'synthetic_independent_registration_validated_provider_response_pending' ||
    FR300_R2G_B_CURRENT_GATE.providerResponseState !==
      'pending' ||
    !FR300_R2G_B_CURRENT_GATE
      .syntheticIndependentRegistrationExecuted ||
    !FR300_R2G_B_CURRENT_GATE
      .syntheticHeldOutValidationPassed ||
    FR300_R2G_B_CURRENT_GATE.realParticipantArtifactUsed ||
    FR300_R2G_B_CURRENT_GATE
      .realRegistrationValidatedForFR299Review
  ) {
    fail('R2G-B predecessor drift.');
  }

  if (
    FR300_R2D_AR_AST_AUTHORITATIVE_DUA_RIGHTS_CONTRACT_VERSION !==
      'FR300-R2D-AR-AST-AUTHORITATIVE-DUA-RIGHTS-v1' ||
    FR300_R2D_SR_CURRENT_GATE.disposition !==
      'controlled_access_request_submitted_provider_response_pending' ||
    FR300_R2D_SR_CURRENT_GATE.providerAcknowledged ||
    FR300_R2D_SR_CURRENT_GATE.controlledAccessApproved ||
    FR300_R2D_SR_CURRENT_GATE.rawParticipantArtifactUseAuthorized
  ) {
    fail('provider-response boundary drift.');
  }

  const storage = FR300_R2E_PREP_CONTROLLED_STORAGE_POLICY;
  if (
    storage.rawArtifactMayEnterGit ||
    storage.rawArtifactMayEnterGitLfs ||
    storage.rawArtifactMayEnterGithubIssue ||
    storage.rawArtifactMayEnterPublicCloud ||
    storage.thirdPartyPublicCloudProcessingAuthorized ||
    !storage.isolatedStorageRequired ||
    storage.publicRepositorySubjectLevelScalarPersistence ||
    !storage.publicRepositoryAggregateNonIdentifyingMetricsOnly
  ) {
    fail('controlled storage policy drift.');
  }

  const rights = FR300_R2D_AR_RIGHTS_MATRIX;
  const bounded = FR300_R2D_AR_BOUNDED_USE_PROFILE;
  if (
    rights.secureTechnicalAndAdministrativeControls !==
      'required' ||
    rights.deletionWhenNoLongerNeeded !== 'required' ||
    rights.deletionOnProviderRequest !== 'required' ||
    rights.backupAndCopyDeletion !== 'required' ||
    rights.datasetCitation !== 'required' ||
    rights.breachNotification !== 'required' ||
    rights.controlledRawDataRedistribution !==
      'explicitly_prohibited' ||
    !bounded.secureStorageRequired ||
    !bounded.deleteRawWhenNoLongerNeeded ||
    !bounded.deleteRawOnProviderRequest ||
    !bounded.deleteBackupsAndCopies ||
    bounded.rawRedistribution ||
    bounded.rawGitPersistence ||
    bounded.rawGitLfsPersistence ||
    bounded.thirdPartyPublicCloudProcessing ||
    bounded.publicRepositoryIndividualSubjectScalarPersistence ||
    !bounded.publicRepositoryAggregateNonIdentifyingMetricsOnly
  ) {
    fail('authoritative DUA lifecycle obligation drift.');
  }
}

export function assessFR300R2HHandlingPlan(
  input: FR300R2HHandlingPlanInput,
): FR300R2HHandlingPlanAssessment {
  assertR2HPredecessors();

  if (
    input.schemaVersion !==
    'fr300-r2h-handling-plan-input-v1'
  ) {
    fail('handling plan schemaVersion drift.');
  }

  if (
    input.artifactClass === 'real_controlled_artifact'
  ) {
    fail(
      'real controlled artifact lifecycle remains blocked until authoritative provider approval is reflected by the current repository gate.',
    );
  }

  if (
    input.storageSurface !== 'isolated_local_workspace' ||
    input.insideGitWorkingTree ||
    input.gitPersistencePlanned ||
    input.gitLfsPersistencePlanned ||
    input.githubIssuePersistencePlanned ||
    input.publicCloudPersistencePlanned ||
    input.thirdPartyCloudProcessingPlanned
  ) {
    fail(
      'controlled artifacts may use only an isolated local workspace outside Git and public-cloud surfaces.',
    );
  }

  if (input.rawArtifactRedistributionPlanned) {
    fail('controlled raw redistribution is prohibited.');
  }

  if (
    input.publicPersistenceClass ===
      'subject_level_scalar' ||
    input.publicPersistenceClass ===
      'raw_or_reconstructive'
  ) {
    fail(
      'public persistence is limited to non-identifying aggregate output.',
    );
  }

  if (
    !input.secureTechnicalAndAdministrativeControlsBound ||
    !input.deletionWhenNoLongerNeededPlanned ||
    !input.deletionOnProviderRequestPlanned ||
    !input.deleteTrackedCopiesAndBackupsPlanned ||
    !input.datasetCitationProcedureBound ||
    !input.breachNotificationProcedureBound
  ) {
    fail('required DUA lifecycle obligations must be bound.');
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2h-handling-plan-assessment-v1' as const,
    artifactClass: input.artifactClass,
    storageSurface: 'isolated_local_workspace' as const,
    syntheticExecutionAuthorized: true,
    realControlledExecutionAuthorized: false as const,
    publicPersistenceClass:
      input.publicPersistenceClass,
    storageBoundarySatisfied: true as const,
    duaLifecycleObligationsBound: true as const,
    rawRedistributionPlanned: false as const,
    thirdPartyCloudProcessingPlanned: false as const,
    next: 'execute_synthetic_isolated_lifecycle' as const,
    authorityBoundary: Object.freeze({
      providerApprovalIssued: false as const,
      realControlledArtifactIntakeAuthorized: false as const,
      rawParticipantArtifactUseAuthorized: false as const,
      fr299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function validateFR300R2HDeletionReceipt(
  input: FR300R2HDeletionReceiptInput,
): FR300R2HDeletionReceipt {
  assertR2HPredecessors();

  if (
    input.schemaVersion !==
    'fr300-r2h-deletion-receipt-input-v1'
  ) {
    fail('deletion receipt schemaVersion drift.');
  }

  if (
    input.artifactClass === 'real_controlled_artifact'
  ) {
    fail(
      'real controlled deletion receipts remain blocked until authoritative provider approval is reflected by the current repository gate.',
    );
  }

  for (const [label, value] of [
    ['trackedTemporaryCopyCount', input.trackedTemporaryCopyCount],
    [
      'trackedTemporaryCopiesDeleted',
      input.trackedTemporaryCopiesDeleted,
    ],
    ['trackedBackupCount', input.trackedBackupCount],
    ['trackedBackupsDeleted', input.trackedBackupsDeleted],
  ] as const) {
    if (!Number.isSafeInteger(value) || value < 0) {
      fail(`${label} must be a non-negative safe integer.`);
    }
  }

  if (
    !input.primaryArtifactDeleted ||
    input.trackedTemporaryCopiesDeleted !==
      input.trackedTemporaryCopyCount ||
    input.trackedBackupsDeleted !==
      input.trackedBackupCount ||
    !input.allTrackedPathsAbsentAfterDeletion
  ) {
    fail('primary, temporary, and backup copies must all be deleted.');
  }

  if (
    input.rawBytesPersistedInReceipt ||
    input.subjectLevelScalarPersistedInPublicReceipt ||
    input.rawOrReconstructiveDerivativePersistedPublicly
  ) {
    fail('deletion receipt persistence exceeds the DUA boundary.');
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2h-deletion-receipt-v1' as const,
    artifactClass: input.artifactClass,
    trigger: input.trigger,
    primaryArtifactDeleted: true as const,
    trackedTemporaryCopyCount:
      input.trackedTemporaryCopyCount,
    trackedTemporaryCopiesDeleted:
      input.trackedTemporaryCopiesDeleted,
    trackedBackupCount: input.trackedBackupCount,
    trackedBackupsDeleted: input.trackedBackupsDeleted,
    allTrackedPathsAbsentAfterDeletion: true as const,
    rawBytesPersistedInReceipt: false as const,
    subjectLevelScalarPersistedInPublicReceipt:
      false as const,
    rawOrReconstructiveDerivativePersistedPublicly:
      false as const,
    receiptPersistenceClass:
      input.receiptPersistenceClass,
    deletionComplete: true as const,
  });
}

function isInsideOrEqual(
  parent: string,
  child: string,
): boolean {
  const rel = relative(resolve(parent), resolve(child));
  return (
    rel === '' ||
    (!rel.startsWith('..') && !isAbsolute(rel))
  );
}

export function executeFR300R2HSyntheticFilesystemDryRun(
  input: FR300R2HSyntheticFilesystemDryRunInput,
): FR300R2HSyntheticFilesystemDryRunReceipt {
  assertR2HPredecessors();

  if (
    input.schemaVersion !==
    'fr300-r2h-synthetic-filesystem-dry-run-input-v1'
  ) {
    fail('synthetic filesystem input schemaVersion drift.');
  }
  const expectedDigest = assertDigest(
    input.expectedDigest,
    'expectedDigest',
  );

  const plan = assessFR300R2HHandlingPlan(
    FR300_R2H_SYNTHETIC_HANDLING_PLAN_INPUT,
  );
  if (
    !plan.syntheticExecutionAuthorized ||
    plan.realControlledExecutionAuthorized
  ) {
    fail('synthetic handling plan authorization drift.');
  }

  const workspace = mkdtempSync(
    join(tmpdir(), 'myeongha-fr300-r2h-'),
  );

  if (isInsideOrEqual(process.cwd(), workspace)) {
    rmSync(workspace, { recursive: true, force: true });
    fail(
      'synthetic isolated workspace must be outside the Git working tree.',
    );
  }

  const primaryDir = join(workspace, 'primary');
  const temporaryDir = join(workspace, 'temporary');
  const backupDir = join(workspace, 'backup');
  const primaryPath = join(primaryDir, 'raw.obj');
  const temporaryPath = join(temporaryDir, 'raw.copy.obj');
  const backupPath = join(backupDir, 'raw.backup.obj');

  let deletionReceipt: FR300R2HDeletionReceipt | null =
    null;
  let digestVerifiedBeforeInspection = false;
  let analysisExecutedAfterDigestVerification = false;
  let workspaceRemovedAfterExecution = false;

  try {
    mkdirSync(primaryDir, { recursive: true });
    mkdirSync(temporaryDir, { recursive: true });
    mkdirSync(backupDir, { recursive: true });

    writeFileSync(primaryPath, SYNTHETIC_BYTES);
    const intakeBytes = readFileSync(primaryPath);
    const observedDigest = sha256(intakeBytes);

    if (observedDigest !== expectedDigest) {
      fail(
        'synthetic artifact digest mismatch before inspection.',
      );
    }
    digestVerifiedBeforeInspection = true;

    copyFileSync(primaryPath, temporaryPath);
    copyFileSync(primaryPath, backupPath);

    if (!digestVerifiedBeforeInspection) {
      fail('analysis may not execute before digest verification.');
    }

    const analysisBytes = readFileSync(temporaryPath);
    if (analysisBytes.byteLength !== SYNTHETIC_BYTES.byteLength) {
      fail('synthetic analysis copy byte length drift.');
    }
    analysisExecutedAfterDigestVerification = true;

    rmSync(primaryPath, { force: true });
    rmSync(temporaryPath, { force: true });
    rmSync(backupPath, { force: true });

    const allTrackedPathsAbsentAfterDeletion =
      !existsSync(primaryPath) &&
      !existsSync(temporaryPath) &&
      !existsSync(backupPath);

    deletionReceipt = validateFR300R2HDeletionReceipt({
      schemaVersion:
        'fr300-r2h-deletion-receipt-input-v1',
      artifactClass: 'synthetic_fixture',
      trigger: 'synthetic_dry_run',
      primaryArtifactDeleted: !existsSync(primaryPath),
      trackedTemporaryCopyCount: 1,
      trackedTemporaryCopiesDeleted:
        existsSync(temporaryPath) ? 0 : 1,
      trackedBackupCount: 1,
      trackedBackupsDeleted:
        existsSync(backupPath) ? 0 : 1,
      allTrackedPathsAbsentAfterDeletion,
      rawBytesPersistedInReceipt: false,
      subjectLevelScalarPersistedInPublicReceipt: false,
      rawOrReconstructiveDerivativePersistedPublicly: false,
      receiptPersistenceClass:
        'synthetic_test_evidence',
    });

    rmSync(workspace, { recursive: true, force: true });
    workspaceRemovedAfterExecution = !existsSync(workspace);
  } finally {
    if (existsSync(workspace)) {
      rmSync(workspace, { recursive: true, force: true });
    }
  }

  if (
    !digestVerifiedBeforeInspection ||
    !analysisExecutedAfterDigestVerification ||
    !deletionReceipt ||
    !deletionReceipt.deletionComplete ||
    !workspaceRemovedAfterExecution
  ) {
    fail('synthetic isolated filesystem lifecycle did not complete.');
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r2h-synthetic-filesystem-dry-run-receipt-v1' as const,
    artifactClass: 'synthetic_fixture' as const,
    isolatedWorkspaceOutsideGitWorkingTree: true as const,
    digestVerifiedBeforeInspection: true as const,
    analysisExecutedAfterDigestVerification: true as const,
    trackedTemporaryCopyCount: 1 as const,
    trackedBackupCount: 1 as const,
    deletionReceipt,
    workspaceRemovedAfterExecution: true as const,
    publicProjection: Object.freeze({
      schemaVersion:
        'fr300-r2h-public-projection-v1' as const,
      syntheticFixtureOnly: true as const,
      aggregateNonIdentifyingOnly: true as const,
      rawBytesIncluded: false as const,
      rawDigestIncluded: false as const,
      filesystemPathIncluded: false as const,
      subjectLevelScalarIncluded: false as const,
      reconstructiveDerivativeIncluded: false as const,
      aggregate: Object.freeze({
        lifecycleExecutions: 1 as const,
        digestVerificationPasses: 1 as const,
        deletionPasses: 1 as const,
      }),
    }),
    authorityBoundary: Object.freeze({
      realParticipantArtifactUsed: false as const,
      realDeletionReceiptIssued: false as const,
      realRegistrationAuthorityIssued: false as const,
      fr299ReferenceMaterialized: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export const FR300_R2H_SYNTHETIC_HANDLING_PLAN_INPUT =
  Object.freeze({
    schemaVersion:
      'fr300-r2h-handling-plan-input-v1' as const,
    artifactClass: 'synthetic_fixture' as const,
    providerAccessState: 'pending' as const,
    duaScopeBound: false as const,
    artifactHandlingEnvironmentApproved: false as const,
    storageSurface:
      'isolated_local_workspace' as const,
    insideGitWorkingTree: false as const,
    rawArtifactRedistributionPlanned: false as const,
    gitPersistencePlanned: false as const,
    gitLfsPersistencePlanned: false as const,
    githubIssuePersistencePlanned: false as const,
    publicCloudPersistencePlanned: false as const,
    thirdPartyCloudProcessingPlanned: false as const,
    publicPersistenceClass:
      'aggregate_non_identifying_only' as const,
    secureTechnicalAndAdministrativeControlsBound:
      true as const,
    deletionWhenNoLongerNeededPlanned: true as const,
    deletionOnProviderRequestPlanned: true as const,
    deleteTrackedCopiesAndBackupsPlanned: true as const,
    datasetCitationProcedureBound: true as const,
    breachNotificationProcedureBound: true as const,
  });

export const FR300_R2H_SYNTHETIC_HANDLING_PLAN =
  assessFR300R2HHandlingPlan(
    FR300_R2H_SYNTHETIC_HANDLING_PLAN_INPUT,
  );

export const FR300_R2H_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r2h-controlled-artifact-lifecycle-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'controlled_artifact_lifecycle_tooling_ready_provider_response_pending' as const,
  providerResponseState: 'pending' as const,
  syntheticHandlingPlanReady: true as const,
  syntheticFilesystemDryRunHarnessReady: true as const,
  isolatedStorageRequired: true as const,
  rawGitPersistenceAllowed: false as const,
  rawGitLfsPersistenceAllowed: false as const,
  rawGithubIssuePersistenceAllowed: false as const,
  rawPublicCloudPersistenceAllowed: false as const,
  thirdPartyPublicCloudProcessingAuthorized: false as const,
  publicAggregateNonIdentifyingOnly: true as const,
  realLifecycleExecutionAuthorized: false as const,
  realParticipantArtifactDownloaded: false as const,
  realParticipantArtifactInspected: false as const,
  realDeletionReceiptIssued: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextPreApprovalAction:
    'exercise_synthetic_isolated_filesystem_lifecycle_and_prepare_provider_response_transition' as const,
  authority: Object.freeze({
    providerApprovalIssued: false as const,
    realControlledArtifactIntakeAuthorized: false as const,
    rawParticipantArtifactUseAuthorized: false as const,
    realRegistrationAuthorityIssued: false as const,
    realFR299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

export function assertFR300R2HControlledArtifactLifecycleContract(): void {
  assertR2HPredecessors();

  const plan = FR300_R2H_SYNTHETIC_HANDLING_PLAN;
  if (
    !plan.syntheticExecutionAuthorized ||
    plan.realControlledExecutionAuthorized ||
    !plan.storageBoundarySatisfied ||
    !plan.duaLifecycleObligationsBound ||
    plan.rawRedistributionPlanned ||
    plan.thirdPartyCloudProcessingPlanned ||
    plan.publicPersistenceClass !==
      'aggregate_non_identifying_only'
  ) {
    fail('synthetic handling plan drift.');
  }

  const current = FR300_R2H_CURRENT_GATE;
  if (
    current.disposition !==
      'controlled_artifact_lifecycle_tooling_ready_provider_response_pending' ||
    current.providerResponseState !== 'pending' ||
    !current.syntheticHandlingPlanReady ||
    !current.syntheticFilesystemDryRunHarnessReady ||
    !current.isolatedStorageRequired ||
    current.rawGitPersistenceAllowed ||
    current.rawGitLfsPersistenceAllowed ||
    current.rawGithubIssuePersistenceAllowed ||
    current.rawPublicCloudPersistenceAllowed ||
    current.thirdPartyPublicCloudProcessingAuthorized ||
    !current.publicAggregateNonIdentifyingOnly ||
    current.realLifecycleExecutionAuthorized ||
    current.realParticipantArtifactDownloaded ||
    current.realParticipantArtifactInspected ||
    current.realDeletionReceiptIssued ||
    current.paidSpendAuthorized ||
    current.fr299EligibleCandidateCount !== 0 ||
    current.fr300R2EligibleCandidateCount !== 0 ||
    current.authority.providerApprovalIssued ||
    current.authority.realControlledArtifactIntakeAuthorized ||
    current.authority.rawParticipantArtifactUseAuthorized ||
    current.authority.realRegistrationAuthorityIssued ||
    current.authority.realFR299ReferenceMaterialized ||
    current.authority.fr300R2Authorized ||
    current.authority.productColumnMaterialized ||
    current.authority.productionActivated ||
    current.authority.commerceActivated
  ) {
    fail('R2H current gate widened real-data or product authority.');
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
    fail('R2H must preserve Product 18/29.');
  }
}

assertFR300R2HControlledArtifactLifecycleContract();
