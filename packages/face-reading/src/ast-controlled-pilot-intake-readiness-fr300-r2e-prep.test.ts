import { describe, expect, it } from 'vitest';
import {
  FR300_R2E_PREP_CONTROLLED_STORAGE_POLICY,
  FR300_R2E_PREP_CURRENT_GATE,
  assessASTControlledPilotIntake,
  assessASTPilotMetricAuthority,
  assessASTPilotPairingAuthority,
  inspectASTRawObjStructure,
  validateASTPilotArtifactIntegrity,
  assertFR300R2EPREPAstControlledPilotIntakeReadinessContract,
} from './ast-controlled-pilot-intake-readiness-fr300-r2e-prep.js';

const DIGEST_A =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const DIGEST_B =
  'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

const VALID_OBJ = [
  '# non-human tetrahedron fixture',
  'v 0 0 0',
  'v 100 0 0',
  'v 0 100 0',
  'v 0 0 100',
  'f 1 2 3',
  'f 1 2 4',
  'f 1 3 4',
  'f 2 3 4',
].join('\n');

function basePilotInput() {
  return {
    schemaVersion:
      'fr300-r2e-prep-controlled-pilot-input-v1' as const,
    artifactClass: 'synthetic_fixture' as const,
    providerAccessState: 'pending' as const,
    duaScopeBound: false,
    artifactHandlingEnvironmentApproved: false,
    integrity: {
      schemaVersion:
        'fr300-r2e-prep-artifact-integrity-input-v1' as const,
      artifactRef: 'fixture/raw3d.obj',
      expectedDigest: DIGEST_A,
      observedDigest: DIGEST_A,
      byteLength: 128,
    },
    obj: {
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1' as const,
      artifactClass: 'synthetic_fixture' as const,
      objText: VALID_OBJ,
    },
    metric: {
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1' as const,
      artifactRef: 'fixture/raw3d.obj',
      artifactDigest: DIGEST_A,
      coordinateUnit: 'centimeter' as const,
      unitEvidenceClass:
        'provider_manifest' as const,
      exactArtifactBoundToEvidence: true,
      preprocessingBeforeRawExport: 'none' as const,
    },
    pairing: {
      schemaVersion:
        'fr300-r2e-prep-pairing-authority-input-v1' as const,
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

describe('FR300-R2E-PREP AST controlled pilot intake readiness', () => {
  it('keeps raw controlled artifacts and subject-level scalars outside public repository surfaces', () => {
    expect(FR300_R2E_PREP_CONTROLLED_STORAGE_POLICY).toEqual({
      rawArtifactMayEnterGit: false,
      rawArtifactMayEnterGitLfs: false,
      rawArtifactMayEnterGithubIssue: false,
      rawArtifactMayEnterPublicCloud: false,
      thirdPartyPublicCloudProcessingAuthorized: false,
      isolatedStorageRequired: true,
      publicRepositorySubjectLevelScalarPersistence: false,
      publicRepositoryAggregateNonIdentifyingMetricsOnly: true,
      providerLandmarksMayIssueFR266Truth: false,
      providerLandmarksMayIssueFR297Truth: false,
    });
  });

  it('quarantines digest mismatch before artifact inspection', () => {
    const receipt = validateASTPilotArtifactIntegrity({
      schemaVersion:
        'fr300-r2e-prep-artifact-integrity-input-v1',
      artifactRef: 'fixture/raw3d.obj',
      expectedDigest: DIGEST_A,
      observedDigest: DIGEST_B,
      byteLength: 128,
    });

    expect(receipt).toMatchObject({
      passed: false,
      digestVerifiedBeforeInspection: false,
      immutableForCurrentEvaluation: false,
      disposition: 'quarantine_integrity_failure',
    });
  });

  it('parses a non-human synthetic OBJ and keeps normalization detection diagnostic-only', () => {
    const valid = inspectASTRawObjStructure({
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1',
      artifactClass: 'synthetic_fixture',
      objText: VALID_OBJ,
    });

    expect(valid).toMatchObject({
      parseValid: true,
      vertexCount: 4,
      faceCount: 4,
      finiteCoordinatesOnly: true,
      degenerateGeometry: false,
      structurallyUsable: true,
    });
    expect(
      valid.normalizationDiagnostic.mayIssueMetricAuthority,
    ).toBe(false);

    const unitSphereLike = inspectASTRawObjStructure({
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1',
      artifactClass: 'synthetic_fixture',
      objText: [
        'v 0 0 0',
        'v 1 0 0',
        'v 0 1 0',
        'v 0 0 1',
        'f 1 2 3',
      ].join('\n'),
    });

    expect(
      unitSphereLike.normalizationDiagnostic
        .unitSphereLikeCoordinatePatternDetected,
    ).toBe(true);
    expect(
      unitSphereLike.normalizationDiagnostic
        .mayIssueMetricAuthority,
    ).toBe(false);
  });

  it('rejects malformed or non-finite OBJ geometry structurally', () => {
    const receipt = inspectASTRawObjStructure({
      schemaVersion:
        'fr300-r2e-prep-obj-structure-input-v1',
      artifactClass: 'synthetic_fixture',
      objText: [
        'v 0 0 0',
        'v NaN 1 2',
        'v 1 1',
        'f 1 2',
      ].join('\n'),
    });

    expect(receipt.parseValid).toBe(false);
    expect(receipt.finiteCoordinatesOnly).toBe(false);
    expect(receipt.structurallyUsable).toBe(false);
  });

  it('never promotes metric authority from coordinate magnitude alone', () => {
    const m1 = assessASTPilotMetricAuthority({
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'fixture/raw3d.obj',
      artifactDigest: DIGEST_A,
      coordinateUnit: 'unknown',
      unitEvidenceClass: 'none',
      exactArtifactBoundToEvidence: false,
      preprocessingBeforeRawExport: 'unknown',
    });
    expect(m1.authorityLevel).toBe(
      'M1_device_class_metric_capable',
    );
    expect(m1.coordinateMagnitudeUsedAsUnitEvidence).toBe(
      false,
    );
    expect(m1.metricScaleVerifiedForFR299).toBe(false);

    const m2 = assessASTPilotMetricAuthority({
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'fixture/raw3d.obj',
      artifactDigest: DIGEST_A,
      coordinateUnit: 'millimeter',
      unitEvidenceClass: 'scanner_export_metadata',
      exactArtifactBoundToEvidence: false,
      preprocessingBeforeRawExport: 'unknown',
    });
    expect(m2.authorityLevel).toBe(
      'M2_exact_acquisition_export_metric_documented',
    );
    expect(m2.metricScaleVerifiedForFR299).toBe(false);

    const normalized = assessASTPilotMetricAuthority({
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'fixture/raw3d.obj',
      artifactDigest: DIGEST_A,
      coordinateUnit: 'meter',
      unitEvidenceClass:
        'provider_documentation_bound_to_artifact',
      exactArtifactBoundToEvidence: true,
      preprocessingBeforeRawExport: 'scale_normalizing',
    });
    expect(normalized.authorityLevel).toBe(
      'M2_exact_acquisition_export_metric_documented',
    );
    expect(normalized.metricScaleVerifiedForFR299).toBe(
      false,
    );

    const m3 = assessASTPilotMetricAuthority({
      schemaVersion:
        'fr300-r2e-prep-metric-authority-input-v1',
      artifactRef: 'fixture/raw3d.obj',
      artifactDigest: DIGEST_A,
      coordinateUnit: 'centimeter',
      unitEvidenceClass: 'provider_manifest',
      exactArtifactBoundToEvidence: true,
      preprocessingBeforeRawExport: 'scale_preserving',
    });
    expect(m3.authorityLevel).toBe(
      'M3_exact_ast_raw_artifact_scale_source_bound',
    );
    expect(m3.metricScaleVerifiedForFR299).toBe(true);
  });

  it('requires exact capture-bound manifest evidence for P3', () => {
    const p2 = assessASTPilotPairingAuthority({
      schemaVersion:
        'fr300-r2e-prep-pairing-authority-input-v1',
      raw3DArtifactRef: 'fixture/raw3d.obj',
      rgbArtifactRef: 'fixture/frontal.rgb',
      sameSubjectBound: true,
      sameSessionBound: true,
      neutralConditionBound: true,
      exactArtifactPairManifestBound: false,
      exactCaptureBound: false,
      temporalSynchronizationBound: true,
      scannerRgbExtrinsicsBound: false,
      validatedRegistrationAlternativeAvailable: false,
    });
    expect(p2.authorityLevel).toBe(
      'P2_same_neutral_acquisition_condition',
    );
    expect(p2.fr299SameCaptureBindingEstablished).toBe(
      false,
    );

    const p3 = assessASTPilotPairingAuthority({
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
    });
    expect(p3.authorityLevel).toBe(
      'P3_exact_controlled_artifact_pair_binding',
    );
    expect(p3.fr299SameCaptureBindingEstablished).toBe(
      true,
    );
    expect(p3.providerLandmarksUsedAsPairingTruth).toBe(
      false,
    );
  });

  it('blocks any real controlled artifact before provider approval and approved handling environment', () => {
    const input = basePilotInput();
    expect(() =>
      assessASTControlledPilotIntake({
        ...input,
        artifactClass: 'real_controlled_artifact',
        obj: {
          ...input.obj,
          artifactClass: 'real_controlled_artifact',
        },
        providerAccessState: 'pending',
        duaScopeBound: true,
        artifactHandlingEnvironmentApproved: true,
      }),
    ).toThrow(/real controlled artifact intake requires provider approval/);
  });

  it('routes a fully source-bound synthetic M3/P3 fixture to external registration without issuing FR299', () => {
    const result =
      assessASTControlledPilotIntake(basePilotInput());

    expect(result).toMatchObject({
      artifactClass: 'synthetic_fixture',
      disposition: 'ready_for_external_registration',
      next: 'external_registration',
      metric: {
        authorityLevel:
          'M3_exact_ast_raw_artifact_scale_source_bound',
        metricScaleVerifiedForFR299: true,
      },
      pairing: {
        authorityLevel:
          'P3_exact_controlled_artifact_pair_binding',
        fr299SameCaptureBindingEstablished: true,
      },
      authorityBoundary: {
        realControlledArtifactAdmitted: false,
        fr299ReferenceMaterialized: false,
        fr300R2Authorized: false,
      },
    });
  });

  it('allows P2 only as a route to registration when an independent validated-registration alternative is available', () => {
    const input = basePilotInput();
    const result = assessASTControlledPilotIntake({
      ...input,
      pairing: {
        ...input.pairing,
        exactArtifactPairManifestBound: false,
        exactCaptureBound: false,
        validatedRegistrationAlternativeAvailable: true,
      },
    });

    expect(result.pairing.authorityLevel).toBe(
      'P2_same_neutral_acquisition_condition',
    );
    expect(
      result.pairing.fr299SameCaptureBindingEstablished,
    ).toBe(false);
    expect(result.disposition).toBe(
      'ready_for_external_registration',
    );
  });

  it('holds unresolved metric and pairing authority rather than increasing sample size', () => {
    const input = basePilotInput();
    const result = assessASTControlledPilotIntake({
      ...input,
      metric: {
        ...input.metric,
        coordinateUnit: 'unknown',
        unitEvidenceClass: 'none',
        exactArtifactBoundToEvidence: false,
        preprocessingBeforeRawExport: 'unknown',
      },
      pairing: {
        ...input.pairing,
        exactArtifactPairManifestBound: false,
        exactCaptureBound: false,
        validatedRegistrationAlternativeAvailable: false,
      },
    });

    expect(result.disposition).toBe(
      'metric_and_pairing_unresolved',
    );
    expect(result.next).toBe(
      'metric_and_pairing_resolution',
    );
  });

  it('freezes provider response pending with real authority still M1/P2 and Product 18/29', () => {
    expect(FR300_R2E_PREP_CURRENT_GATE).toMatchObject({
      disposition:
        'controlled_intake_tooling_ready_provider_response_pending',
      providerResponseState: 'pending',
      controlledIntakeToolingReady: true,
      syntheticFixtureValidationOnly: true,
      realParticipantArtifactIntakePerformed: false,
      realParticipantArtifactInspected: false,
      currentRealMetricAuthorityLevel:
        'M1_device_class_metric_capable',
      currentRealPairingAuthorityLevel:
        'P2_same_neutral_acquisition_condition',
      realFR299MetricScaleVerified: false,
      realFR299CorrespondenceVerified: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });

    expect(() =>
      assertFR300R2EPREPAstControlledPilotIntakeReadinessContract(),
    ).not.toThrow();
  });
});
