import { describe, expect, it } from 'vitest';
import {
  assessASTControlledPilotIntake,
  type FR300R2EPREPControlledPilotInput,
} from './ast-controlled-pilot-intake-readiness-fr300-r2e-prep.js';
import {
  FR300_R2F_CURRENT_GATE,
  assessFR300R2FRegistration,
  assertFR300R2FRegistrationContract,
} from './ast-rgb-3d-registration-contract-fr300-r2f.js';

const DIGEST_3D =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const DIGEST_RGB =
  'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

const VALID_OBJ = [
  'v 0 0 0',
  'v 100 0 0',
  'v 0 100 0',
  'v 0 0 100',
  'f 1 2 3',
  'f 1 2 4',
].join('\n');

function readyPilotInput(): FR300R2EPREPControlledPilotInput {
  return {
    schemaVersion:
      'fr300-r2e-prep-controlled-pilot-input-v1',
    artifactClass: 'synthetic_fixture',
    providerAccessState: 'pending',
    duaScopeBound: false,
    artifactHandlingEnvironmentApproved: false,
    integrity: {
      schemaVersion:
        'fr300-r2e-prep-artifact-integrity-input-v1',
      artifactRef: 'fixture/raw3d.obj',
      expectedDigest: DIGEST_3D,
      observedDigest: DIGEST_3D,
      byteLength: 128,
    },
    obj: {
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1',
      artifactClass: 'synthetic_fixture',
      objText: VALID_OBJ,
    },
    metric: {
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'fixture/raw3d.obj',
      artifactDigest: DIGEST_3D,
      coordinateUnit: 'millimeter',
      unitEvidenceClass: 'provider_manifest',
      exactArtifactBoundToEvidence: true,
      preprocessingBeforeRawExport: 'scale_preserving',
    },
    pairing: {
      schemaVersion:
        'fr300-r2e-prep-pairing-authority-input-v1',
      raw3DArtifactRef: 'fixture/raw3d.obj',
      rgbArtifactRef: 'fixture/frontal.rgb',
      sameSubjectBound: true,
      sameSessionBound: true,
      neutralConditionBound: true,
      exactArtifactPairManifestBound: true,
      exactCaptureBound: true,
      temporalSynchronizationBound: true,
      scannerRgbExtrinsicsBound: false,
      validatedRegistrationAlternativeAvailable: false,
    },
  };
}

function baseRegistrationInput() {
  return {
    schemaVersion: 'fr300-r2f-registration-input-v1' as const,
    artifactClass: 'synthetic_fixture' as const,
    pilotAssessment:
      assessASTControlledPilotIntake(readyPilotInput()),
    method: 'exact_calibrated_projection' as const,
    raw3DArtifactRef: 'fixture/raw3d.obj',
    raw3DArtifactDigest: DIGEST_3D,
    rgbArtifactRef: 'fixture/frontal.rgb',
    rgbArtifactDigest: DIGEST_RGB,
    exact3DCoordinateFrameBound: true,
    exactRgbCameraIntrinsicsBound: true,
    exactRgbTo3DExtrinsicsBound: true,
    exactReleasedImageTransformChainBound: true,
    rgbArtifactDigestBoundToRegistrationEvidence: true,
    registrationExecutionObserved: true,
    registrationOutputFinite: true,
    independentCorrespondenceEvidenceBound: false,
    sourceIndependentCorrespondences: false,
    heldOutValidationExecuted: false,
    acceptanceThresholdPreregistered: false,
    acceptanceThresholdSatisfied: false,
    providerLandmarksUsedAsRegistrationTruth: false,
    providerLandmarksUsedAsFR266Truth: false,
    providerLandmarksUsedAsFR297Truth: false,
  };
}

describe('FR300-R2F RGB↔3D registration contract', () => {
  it('validates a complete synthetic calibrated-projection path without materializing FR299', () => {
    const result = assessFR300R2FRegistration(
      baseRegistrationInput(),
    );

    expect(result).toMatchObject({
      disposition:
        'registration_validated_for_materialization_review',
      next: 'fr299_materialization_review',
      predecessorReadyForRegistration: true,
      calibratedProjectionEvidenceComplete: true,
      registrationValidatedForFR299Review: true,
      authorityBoundary: {
        realControlledArtifactRegistrationExecuted: false,
        realRegistrationValidatedForFR299Review: false,
        fr299ReferenceMaterialized: false,
        fr300R2Authorized: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('holds calibrated projection when exact extrinsics are not bound', () => {
    const input = baseRegistrationInput();
    const result = assessFR300R2FRegistration({
      ...input,
      exactRgbTo3DExtrinsicsBound: false,
    });

    expect(result.registrationValidatedForFR299Review).toBe(
      false,
    );
    expect(result.disposition).toBe(
      'calibrated_projection_evidence_incomplete',
    );
    expect(result.next).toBe(
      'bind_calibrated_projection_evidence',
    );
  });

  it('validates an independent registration path only with preregistered held-out evidence', () => {
    const input = baseRegistrationInput();
    const result = assessFR300R2FRegistration({
      ...input,
      method: 'independent_geometric_registration',
      exact3DCoordinateFrameBound: false,
      exactRgbCameraIntrinsicsBound: false,
      exactRgbTo3DExtrinsicsBound: false,
      exactReleasedImageTransformChainBound: false,
      independentCorrespondenceEvidenceBound: true,
      sourceIndependentCorrespondences: true,
      heldOutValidationExecuted: true,
      acceptanceThresholdPreregistered: true,
      acceptanceThresholdSatisfied: true,
    });

    expect(
      result.independentRegistrationEvidenceComplete,
    ).toBe(true);
    expect(result.registrationValidatedForFR299Review).toBe(
      true,
    );
    expect(result.disposition).toBe(
      'registration_validated_for_materialization_review',
    );
  });

  it('fails closed when independent held-out acceptance is not satisfied', () => {
    const input = baseRegistrationInput();
    const result = assessFR300R2FRegistration({
      ...input,
      method: 'independent_geometric_registration',
      independentCorrespondenceEvidenceBound: true,
      sourceIndependentCorrespondences: true,
      heldOutValidationExecuted: true,
      acceptanceThresholdPreregistered: true,
      acceptanceThresholdSatisfied: false,
    });

    expect(result.registrationValidatedForFR299Review).toBe(
      false,
    );
    expect(result.disposition).toBe(
      'independent_registration_evidence_incomplete',
    );
  });

  it('rejects provider landmarks as registration or FR266/FR297 truth', () => {
    const input = baseRegistrationInput();

    expect(() =>
      assessFR300R2FRegistration({
        ...input,
        providerLandmarksUsedAsRegistrationTruth: true,
      }),
    ).toThrow(/provider landmarks may not issue/);
  });

  it('rejects a raw 3D identity that does not match the R2E-PREP receipts', () => {
    const input = baseRegistrationInput();

    expect(() =>
      assessFR300R2FRegistration({
        ...input,
        raw3DArtifactRef: 'fixture/other.obj',
      }),
    ).toThrow(/raw 3D artifact identity must match/);
  });

  it('holds registration when the R2E-PREP predecessor is not metric-ready', () => {
    const pilotInput = readyPilotInput();
    const pilotAssessment = assessASTControlledPilotIntake({
      ...pilotInput,
      metric: {
        ...pilotInput.metric,
        coordinateUnit: 'unknown',
        unitEvidenceClass: 'none',
        exactArtifactBoundToEvidence: false,
        preprocessingBeforeRawExport: 'unknown',
      },
    });

    const input = baseRegistrationInput();
    const result = assessFR300R2FRegistration({
      ...input,
      pilotAssessment,
    });

    expect(result.predecessorReadyForRegistration).toBe(
      false,
    );
    expect(result.registrationValidatedForFR299Review).toBe(
      false,
    );
    expect(result.disposition).toBe(
      'predecessor_not_ready',
    );
    expect(result.next).toBe('resolve_r2e_predecessor');
  });

  it('freezes provider-response pending with Product 18/29', () => {
    expect(FR300_R2F_CURRENT_GATE).toMatchObject({
      disposition:
        'registration_contract_ready_provider_response_pending',
      providerResponseState: 'pending',
      registrationContractReady: true,
      syntheticFixtureValidationOnly: true,
      realParticipantArtifactRegistrationExecuted: false,
      realRegistrationValidatedForFR299Review: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2FRegistrationContract(),
    ).not.toThrow();
  });
});
