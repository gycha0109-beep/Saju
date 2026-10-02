import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  assessASTControlledPilotIntake,
  type FR300R2EPREPControlledPilotAssessment,
  type FR300R2EPREPControlledPilotInput,
} from './ast-controlled-pilot-intake-readiness-fr300-r2e-prep.js';
import {
  assessFR300R2FRegistration,
  type FR300R2FRegistrationAssessment,
} from './ast-rgb-3d-registration-contract-fr300-r2f.js';
import {
  FR300_R2J_CURRENT_GATE,
  adjudicateFR300R2JFR299Qualification,
  assertFR300R2JFR299QualificationAdjudicatorContract,
  type FR300R2JLifecycleEvidence,
  type FR300R2JQualificationInput,
} from './fr299-qualification-adjudicator-fr300-r2j.js';

const OBJ = [
  '# non-human FR300-R2J synthetic fixture',
  'v -10 -10 100',
  'v 10 -10 100',
  'v 0 12 105',
  'v 4 8 115',
  'f 1 2 3',
  'f 2 3 4',
  '',
].join('\n');

function sha256(value: string): string {
  return `sha256:${createHash('sha256')
    .update(value, 'utf8')
    .digest('hex')}`;
}

const RAW_DIGEST = sha256(OBJ);
const RGB_DIGEST = sha256(
  'FR300-R2J synthetic RGB metric evidence',
);

function lifecycle(
  overrides: Partial<FR300R2JLifecycleEvidence> = {},
): FR300R2JLifecycleEvidence {
  return {
    schemaVersion: 'fr300-r2j-lifecycle-evidence-v1',
    isolatedStorageUsed: true,
    rawGitPersistenceObserved: false,
    rawGitLfsPersistenceObserved: false,
    rawGithubIssuePersistenceObserved: false,
    rawPublicCloudPersistenceObserved: false,
    thirdPartyCloudProcessingObserved: false,
    deletionWhenNoLongerNeededBound: true,
    deletionReceiptVerified: true,
    allTrackedArtifactPathsAbsentAfterDeletion: true,
    deletionOnProviderRequestBound: true,
    trackedCopiesAndBackupsDeletionBound: true,
    publicAggregateNonIdentifyingOnly: true,
    publicSubjectLevelScalarPersistenceObserved: false,
    rawOrReconstructivePublicPersistenceObserved: false,
    ...overrides,
  };
}

function pilot(options: {
  artifactClass?: 'synthetic_fixture' | 'real_controlled_artifact';
  m3?: boolean;
  p3?: boolean;
  validatedRegistrationAlternativeAvailable?: boolean;
} = {}): FR300R2EPREPControlledPilotAssessment {
  const artifactClass =
    options.artifactClass ?? 'synthetic_fixture';
  const m3 = options.m3 ?? true;
  const p3 = options.p3 ?? true;
  const alt =
    options.validatedRegistrationAlternativeAvailable ??
    false;

  const input: FR300R2EPREPControlledPilotInput = {
    schemaVersion:
      'fr300-r2e-prep-controlled-pilot-input-v1',
    artifactClass,
    providerAccessState:
      artifactClass === 'real_controlled_artifact'
        ? 'approved'
        : 'pending',
    duaScopeBound:
      artifactClass === 'real_controlled_artifact',
    artifactHandlingEnvironmentApproved:
      artifactClass === 'real_controlled_artifact',
    integrity: {
      schemaVersion:
        'fr300-r2e-prep-artifact-integrity-input-v1',
      artifactRef: 'fixture/r2j/raw3d.obj',
      expectedDigest: RAW_DIGEST,
      observedDigest: RAW_DIGEST,
      byteLength: Buffer.byteLength(OBJ, 'utf8'),
    },
    obj: {
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1',
      artifactClass,
      objText: OBJ,
    },
    metric: {
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'fixture/r2j/raw3d.obj',
      artifactDigest: RAW_DIGEST,
      coordinateUnit: 'millimeter',
      unitEvidenceClass: 'provider_manifest',
      exactArtifactBoundToEvidence: m3,
      preprocessingBeforeRawExport: m3
        ? 'none'
        : 'unknown',
    },
    pairing: {
      schemaVersion:
        'fr300-r2e-prep-pairing-authority-input-v1',
      raw3DArtifactRef: 'fixture/r2j/raw3d.obj',
      rgbArtifactRef: 'fixture/r2j/rgb.json',
      sameSubjectBound: true,
      sameSessionBound: true,
      neutralConditionBound: true,
      exactArtifactPairManifestBound: p3,
      exactCaptureBound: p3,
      temporalSynchronizationBound: true,
      scannerRgbExtrinsicsBound: p3,
      validatedRegistrationAlternativeAvailable: alt,
    },
  };

  return assessASTControlledPilotIntake(input);
}

function registration(
  pilotAssessment: FR300R2EPREPControlledPilotAssessment,
  method:
    | 'exact_calibrated_projection'
    | 'independent_geometric_registration' =
      'exact_calibrated_projection',
): FR300R2FRegistrationAssessment {
  return assessFR300R2FRegistration({
    schemaVersion: 'fr300-r2f-registration-input-v1',
    artifactClass: pilotAssessment.artifactClass,
    pilotAssessment,
    method,
    raw3DArtifactRef: pilotAssessment.metric.artifactRef,
    raw3DArtifactDigest:
      pilotAssessment.metric.artifactDigest,
    rgbArtifactRef:
      pilotAssessment.pairing.rgbArtifactRef,
    rgbArtifactDigest: RGB_DIGEST,
    exact3DCoordinateFrameBound: true,
    exactRgbCameraIntrinsicsBound:
      method === 'exact_calibrated_projection',
    exactRgbTo3DExtrinsicsBound:
      method === 'exact_calibrated_projection',
    exactReleasedImageTransformChainBound:
      method === 'exact_calibrated_projection',
    rgbArtifactDigestBoundToRegistrationEvidence: true,
    registrationExecutionObserved: true,
    registrationOutputFinite: true,
    independentCorrespondenceEvidenceBound:
      method === 'independent_geometric_registration',
    sourceIndependentCorrespondences:
      method === 'independent_geometric_registration',
    heldOutValidationExecuted:
      method === 'independent_geometric_registration',
    acceptanceThresholdPreregistered:
      method === 'independent_geometric_registration',
    acceptanceThresholdSatisfied:
      method === 'independent_geometric_registration',
    providerLandmarksUsedAsRegistrationTruth: false,
    providerLandmarksUsedAsFR266Truth: false,
    providerLandmarksUsedAsFR297Truth: false,
  });
}

function qualification(
  pilotAssessment = pilot(),
  registrationAssessment = registration(
    pilotAssessment,
  ),
  overrides: Partial<FR300R2JQualificationInput> = {},
): FR300R2JQualificationInput {
  return {
    schemaVersion: 'fr300-r2j-qualification-input-v1',
    artifactClass: pilotAssessment.artifactClass,
    providerResponseTransitionReceiptBound: true,
    providerApprovalGateSatisfied: true,
    duaScopeBound: true,
    artifactHandlingEnvironmentApproved: true,
    pilotAssessment,
    registrationAssessment,
    lifecycle: lifecycle(),
    providerLandmarksUsedAsQualificationTruth: false,
    ...overrides,
  };
}

describe('FR300-R2J FR299 qualification adjudicator', () => {
  it('keeps the current real authority at pending M1/P2 with zero eligible candidates', () => {
    expect(FR300_R2J_CURRENT_GATE).toMatchObject({
      disposition:
        'fr299_adjudicator_ready_real_evidence_not_eligible',
      providerResponseState: 'pending',
      currentRealMetricAuthorityLevel:
        'M1_device_class_metric_capable',
      currentRealPairingAuthorityLevel:
        'P2_same_neutral_acquisition_condition',
      adjudicatorReady: true,
      syntheticFixtureValidationOnly: true,
      realFR299CandidateEligible: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2JFR299QualificationAdjudicatorContract(),
    ).not.toThrow();
  });

  it('qualifies an M3 + P3 synthetic fixture only for materialization review', () => {
    const p = pilot();
    const r = registration(p);
    const receipt =
      adjudicateFR300R2JFR299Qualification(
        qualification(p, r),
      );

    expect(receipt).toMatchObject({
      disposition:
        'eligible_for_fr299_reference_materialization_review',
      qualificationEligible: true,
      syntheticFixtureQualificationEligible: true,
      realFR299CandidateEligible: false,
      failureReasons: [],
      metricAuthorityLevel:
        'M3_exact_ast_raw_artifact_scale_source_bound',
      pairingAuthorityLevel:
        'P3_exact_controlled_artifact_pair_binding',
      correspondenceResolution: 'p3_exact_pair',
      artifactIdentityBound: true,
      lifecycleBoundarySatisfied: true,
      next: 'fr299_reference_materialization_review',
      authorityBoundary: {
        fr299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('accepts M3 + P2 only when the validated registration alternative closes correspondence', () => {
    const p = pilot({
      p3: false,
      validatedRegistrationAlternativeAvailable: true,
    });
    const r = registration(
      p,
      'independent_geometric_registration',
    );
    const receipt =
      adjudicateFR300R2JFR299Qualification(
        qualification(p, r),
      );

    expect(p.pairing.authorityLevel).toBe(
      'P2_same_neutral_acquisition_condition',
    );
    expect(receipt.qualificationEligible).toBe(true);
    expect(receipt.correspondenceResolution).toBe(
      'validated_registration_alternative',
    );
  });

  it('rejects M2 even when every other gate passes', () => {
    const p = pilot({ m3: false });
    const r = registration(p);
    const receipt =
      adjudicateFR300R2JFR299Qualification(
        qualification(p, r),
      );

    expect(receipt.qualificationEligible).toBe(false);
    expect(receipt.failureReasons).toContain(
      'METRIC_AUTHORITY_NOT_M3',
    );
  });

  it('rejects P2 when no validated registration alternative is bound', () => {
    const p = pilot({
      p3: false,
      validatedRegistrationAlternativeAvailable: false,
    });

    expect(p.disposition).toBe(
      'pairing_authority_unresolved',
    );

    const fakeRegistration = {
      ...registration(pilot()),
      artifactClass: p.artifactClass,
      raw3DArtifactRef: p.metric.artifactRef,
      raw3DArtifactDigest: p.metric.artifactDigest,
      rgbArtifactRef: p.pairing.rgbArtifactRef,
      registrationValidatedForFR299Review: false,
      disposition:
        'predecessor_not_ready' as const,
      next: 'resolve_r2e_predecessor' as const,
    };

    const receipt =
      adjudicateFR300R2JFR299Qualification(
        qualification(p, fakeRegistration),
      );

    expect(receipt.qualificationEligible).toBe(false);
    expect(receipt.failureReasons).toContain(
      'CORRESPONDENCE_AUTHORITY_UNRESOLVED',
    );
    expect(receipt.failureReasons).toContain(
      'REGISTRATION_NOT_VALIDATED',
    );
  });

  it.each([
    ['providerResponseTransitionReceiptBound', 'PROVIDER_RESPONSE_RECEIPT_UNBOUND'],
    ['providerApprovalGateSatisfied', 'PROVIDER_APPROVAL_MISSING'],
    ['duaScopeBound', 'DUA_SCOPE_UNBOUND'],
    [
      'artifactHandlingEnvironmentApproved',
      'HANDLING_ENVIRONMENT_UNAPPROVED',
    ],
  ] as const)(
    'fails closed when authority gate %s is false',
    (key, reason) => {
      const input = qualification();
      const receipt =
        adjudicateFR300R2JFR299Qualification({
          ...input,
          [key]: false,
        });

      expect(receipt.qualificationEligible).toBe(false);
      expect(receipt.failureReasons).toContain(reason);
    },
  );

  it('rejects raw digest substitution across R2E and R2F', () => {
    const p = pilot();
    const r = registration(p);
    const altered: FR300R2FRegistrationAssessment = {
      ...r,
      raw3DArtifactDigest:
        'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    };

    const receipt =
      adjudicateFR300R2JFR299Qualification(
        qualification(p, altered),
      );

    expect(receipt.artifactIdentityBound).toBe(false);
    expect(receipt.failureReasons).toContain(
      'RAW_ARTIFACT_DIGEST_MISMATCH',
    );
  });

  it('rejects forbidden raw persistence', () => {
    const input = qualification();
    const receipt =
      adjudicateFR300R2JFR299Qualification({
        ...input,
        lifecycle: lifecycle({
          rawGitPersistenceObserved: true,
        }),
      });

    expect(receipt.qualificationEligible).toBe(false);
    expect(receipt.failureReasons).toContain(
      'FORBIDDEN_PERSISTENCE_OBSERVED',
    );
  });

  it('rejects incomplete deletion/copy lifecycle binding', () => {
    const input = qualification();
    const receipt =
      adjudicateFR300R2JFR299Qualification({
        ...input,
        lifecycle: lifecycle({
          deletionReceiptVerified: false,
          trackedCopiesAndBackupsDeletionBound: false,
        }),
      });

    expect(receipt.qualificationEligible).toBe(false);
    expect(receipt.failureReasons).toContain(
      'DELETION_LIFECYCLE_UNBOUND',
    );
  });

  it('rejects unsafe public persistence even without raw Git persistence', () => {
    const input = qualification();
    const receipt =
      adjudicateFR300R2JFR299Qualification({
        ...input,
        lifecycle: lifecycle({
          publicSubjectLevelScalarPersistenceObserved: true,
        }),
      });

    expect(receipt.qualificationEligible).toBe(false);
    expect(receipt.failureReasons).toContain(
      'PUBLIC_OUTPUT_BOUNDARY_UNSAFE',
    );
  });

  it('rejects provider landmarks as qualification truth', () => {
    const input = qualification();
    const receipt =
      adjudicateFR300R2JFR299Qualification({
        ...input,
        providerLandmarksUsedAsQualificationTruth: true,
      });

    expect(receipt.qualificationEligible).toBe(false);
    expect(receipt.failureReasons).toContain(
      'PROVIDER_LANDMARK_TRUTH_USED',
    );
  });

  it('simulates the real-artifact branch without materializing FR299 or product authority', () => {
    const p = pilot({
      artifactClass: 'real_controlled_artifact',
    });
    const r = registration(p);
    const receipt =
      adjudicateFR300R2JFR299Qualification(
        qualification(p, r),
      );

    expect(
      p.authorityBoundary.realControlledArtifactAdmitted,
    ).toBe(true);
    expect(
      r.authorityBoundary
        .realRegistrationValidatedForFR299Review,
    ).toBe(true);
    expect(receipt.qualificationEligible).toBe(true);
    expect(receipt.realFR299CandidateEligible).toBe(true);
    expect(
      receipt.authorityBoundary.fr299ReferenceMaterialized,
    ).toBe(false);
    expect(
      receipt.authorityBoundary.productColumnMaterialized,
    ).toBe(false);
  });
});
