import { describe, expect, it } from 'vitest';
import {
  FR300_R2H_CURRENT_GATE,
  FR300_R2H_SYNTHETIC_ARTIFACT_DIGEST,
  FR300_R2H_SYNTHETIC_HANDLING_PLAN,
  FR300_R2H_SYNTHETIC_HANDLING_PLAN_INPUT,
  assessFR300R2HHandlingPlan,
  assertFR300R2HControlledArtifactLifecycleContract,
  executeFR300R2HSyntheticFilesystemDryRun,
  validateFR300R2HDeletionReceipt,
  type FR300R2HHandlingPlanInput,
} from './controlled-artifact-lifecycle-fr300-r2h.js';

function planInput(
  overrides: Partial<FR300R2HHandlingPlanInput> = {},
): FR300R2HHandlingPlanInput {
  return {
    ...FR300_R2H_SYNTHETIC_HANDLING_PLAN_INPUT,
    ...overrides,
  };
}

describe('FR300-R2H controlled artifact lifecycle', () => {
  it('admits only the synthetic isolated handling plan while provider response is pending', () => {
    const assessment = assessFR300R2HHandlingPlan(
      planInput(),
    );

    expect(assessment).toMatchObject({
      artifactClass: 'synthetic_fixture',
      storageSurface: 'isolated_local_workspace',
      syntheticExecutionAuthorized: true,
      realControlledExecutionAuthorized: false,
      publicPersistenceClass:
        'aggregate_non_identifying_only',
      storageBoundarySatisfied: true,
      duaLifecycleObligationsBound: true,
      rawRedistributionPlanned: false,
      thirdPartyCloudProcessingPlanned: false,
      next: 'execute_synthetic_isolated_lifecycle',
      authorityBoundary: {
        providerApprovalIssued: false,
        realControlledArtifactIntakeAuthorized: false,
        rawParticipantArtifactUseAuthorized: false,
        fr299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('executes the synthetic isolated filesystem lifecycle through deletion verification', () => {
    const receipt =
      executeFR300R2HSyntheticFilesystemDryRun({
        schemaVersion:
          'fr300-r2h-synthetic-filesystem-dry-run-input-v1',
        expectedDigest:
          FR300_R2H_SYNTHETIC_ARTIFACT_DIGEST,
      });

    expect(receipt).toMatchObject({
      artifactClass: 'synthetic_fixture',
      isolatedWorkspaceOutsideGitWorkingTree: true,
      digestVerifiedBeforeInspection: true,
      analysisExecutedAfterDigestVerification: true,
      trackedTemporaryCopyCount: 1,
      trackedBackupCount: 1,
      workspaceRemovedAfterExecution: true,
      deletionReceipt: {
        artifactClass: 'synthetic_fixture',
        trigger: 'synthetic_dry_run',
        primaryArtifactDeleted: true,
        trackedTemporaryCopyCount: 1,
        trackedTemporaryCopiesDeleted: 1,
        trackedBackupCount: 1,
        trackedBackupsDeleted: 1,
        allTrackedPathsAbsentAfterDeletion: true,
        rawBytesPersistedInReceipt: false,
        deletionComplete: true,
      },
      publicProjection: {
        syntheticFixtureOnly: true,
        aggregateNonIdentifyingOnly: true,
        rawBytesIncluded: false,
        rawDigestIncluded: false,
        filesystemPathIncluded: false,
        subjectLevelScalarIncluded: false,
        reconstructiveDerivativeIncluded: false,
        aggregate: {
          lifecycleExecutions: 1,
          digestVerificationPasses: 1,
          deletionPasses: 1,
        },
      },
      authorityBoundary: {
        realParticipantArtifactUsed: false,
        realDeletionReceiptIssued: false,
        realRegistrationAuthorityIssued: false,
        fr299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('fails before inspection when the expected digest does not match', () => {
    expect(() =>
      executeFR300R2HSyntheticFilesystemDryRun({
        schemaVersion:
          'fr300-r2h-synthetic-filesystem-dry-run-input-v1',
        expectedDigest:
          'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      }),
    ).toThrow(/digest mismatch before inspection/);
  });

  it.each([
    'git',
    'git_lfs',
    'github_issue',
    'public_cloud',
    'third_party_cloud',
  ] as const)(
    'rejects forbidden storage surface %s',
    (storageSurface) => {
      expect(() =>
        assessFR300R2HHandlingPlan(
          planInput({ storageSurface }),
        ),
      ).toThrow(/isolated local workspace/);
    },
  );

  it('rejects a workspace inside the Git working tree', () => {
    expect(() =>
      assessFR300R2HHandlingPlan(
        planInput({ insideGitWorkingTree: true }),
      ),
    ).toThrow(/isolated local workspace/);
  });

  it.each([
    ['gitPersistencePlanned', true],
    ['gitLfsPersistencePlanned', true],
    ['githubIssuePersistencePlanned', true],
    ['publicCloudPersistencePlanned', true],
    ['thirdPartyCloudProcessingPlanned', true],
  ] as const)(
    'rejects forbidden persistence plan %s',
    (key, value) => {
      expect(() =>
        assessFR300R2HHandlingPlan(
          planInput({ [key]: value }),
        ),
      ).toThrow(/isolated local workspace/);
    },
  );

  it('rejects controlled raw redistribution', () => {
    expect(() =>
      assessFR300R2HHandlingPlan(
        planInput({
          rawArtifactRedistributionPlanned: true,
        }),
      ),
    ).toThrow(/raw redistribution is prohibited/);
  });

  it.each([
    'subject_level_scalar',
    'raw_or_reconstructive',
  ] as const)(
    'rejects public persistence class %s',
    (publicPersistenceClass) => {
      expect(() =>
        assessFR300R2HHandlingPlan(
          planInput({ publicPersistenceClass }),
        ),
      ).toThrow(/non-identifying aggregate output/);
    },
  );

  it.each([
    'secureTechnicalAndAdministrativeControlsBound',
    'deletionWhenNoLongerNeededPlanned',
    'deletionOnProviderRequestPlanned',
    'deleteTrackedCopiesAndBackupsPlanned',
    'datasetCitationProcedureBound',
    'breachNotificationProcedureBound',
  ] as const)(
    'requires DUA lifecycle obligation %s',
    (key) => {
      expect(() =>
        assessFR300R2HHandlingPlan(
          planInput({ [key]: false }),
        ),
      ).toThrow(/DUA lifecycle obligations/);
    },
  );

  it('blocks the real controlled path even if a caller claims provider approval', () => {
    expect(() =>
      assessFR300R2HHandlingPlan(
        planInput({
          artifactClass: 'real_controlled_artifact',
          providerAccessState: 'approved',
          duaScopeBound: true,
          artifactHandlingEnvironmentApproved: true,
        }),
      ),
    ).toThrow(/remains blocked until authoritative provider approval/);
  });

  it('rejects an incomplete deletion receipt when a tracked backup remains', () => {
    expect(() =>
      validateFR300R2HDeletionReceipt({
        schemaVersion:
          'fr300-r2h-deletion-receipt-input-v1',
        artifactClass: 'synthetic_fixture',
        trigger: 'synthetic_dry_run',
        primaryArtifactDeleted: true,
        trackedTemporaryCopyCount: 1,
        trackedTemporaryCopiesDeleted: 1,
        trackedBackupCount: 1,
        trackedBackupsDeleted: 0,
        allTrackedPathsAbsentAfterDeletion: false,
        rawBytesPersistedInReceipt: false,
        subjectLevelScalarPersistedInPublicReceipt: false,
        rawOrReconstructiveDerivativePersistedPublicly:
          false,
        receiptPersistenceClass:
          'synthetic_test_evidence',
      }),
    ).toThrow(/must all be deleted/);
  });

  it('rejects raw or subject-level content inside a deletion receipt', () => {
    expect(() =>
      validateFR300R2HDeletionReceipt({
        schemaVersion:
          'fr300-r2h-deletion-receipt-input-v1',
        artifactClass: 'synthetic_fixture',
        trigger: 'synthetic_dry_run',
        primaryArtifactDeleted: true,
        trackedTemporaryCopyCount: 0,
        trackedTemporaryCopiesDeleted: 0,
        trackedBackupCount: 0,
        trackedBackupsDeleted: 0,
        allTrackedPathsAbsentAfterDeletion: true,
        rawBytesPersistedInReceipt: true,
        subjectLevelScalarPersistedInPublicReceipt: false,
        rawOrReconstructiveDerivativePersistedPublicly:
          false,
        receiptPersistenceClass:
          'synthetic_test_evidence',
      }),
    ).toThrow(/persistence exceeds the DUA boundary/);
  });

  it('blocks real controlled deletion receipts while provider approval is pending', () => {
    expect(() =>
      validateFR300R2HDeletionReceipt({
        schemaVersion:
          'fr300-r2h-deletion-receipt-input-v1',
        artifactClass: 'real_controlled_artifact',
        trigger: 'no_longer_needed',
        primaryArtifactDeleted: true,
        trackedTemporaryCopyCount: 1,
        trackedTemporaryCopiesDeleted: 1,
        trackedBackupCount: 0,
        trackedBackupsDeleted: 0,
        allTrackedPathsAbsentAfterDeletion: true,
        rawBytesPersistedInReceipt: false,
        subjectLevelScalarPersistedInPublicReceipt: false,
        rawOrReconstructiveDerivativePersistedPublicly:
          false,
        receiptPersistenceClass:
          'synthetic_test_evidence',
      }),
    ).toThrow(/real controlled deletion receipts remain blocked/);
  });

  it('freezes the provider-pending R2H authority boundary at Product 18/29', () => {
    expect(FR300_R2H_SYNTHETIC_HANDLING_PLAN).toMatchObject({
      syntheticExecutionAuthorized: true,
      realControlledExecutionAuthorized: false,
      storageBoundarySatisfied: true,
      duaLifecycleObligationsBound: true,
    });

    expect(FR300_R2H_CURRENT_GATE).toMatchObject({
      disposition:
        'controlled_artifact_lifecycle_tooling_ready_provider_response_pending',
      providerResponseState: 'pending',
      syntheticHandlingPlanReady: true,
      syntheticFilesystemDryRunHarnessReady: true,
      isolatedStorageRequired: true,
      rawGitPersistenceAllowed: false,
      rawGitLfsPersistenceAllowed: false,
      rawGithubIssuePersistenceAllowed: false,
      rawPublicCloudPersistenceAllowed: false,
      thirdPartyPublicCloudProcessingAuthorized: false,
      publicAggregateNonIdentifyingOnly: true,
      realLifecycleExecutionAuthorized: false,
      realParticipantArtifactDownloaded: false,
      realParticipantArtifactInspected: false,
      realDeletionReceiptIssued: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2HControlledArtifactLifecycleContract(),
    ).not.toThrow();
  });
});
