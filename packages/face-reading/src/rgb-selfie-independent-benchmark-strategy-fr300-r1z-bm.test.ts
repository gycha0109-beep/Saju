import { describe, expect, it } from 'vitest';
import type { FR299Independent3DNoseReferenceBundle } from './independent-3d-nose-reference-bundle-fr299.js';
import {
  FR300_R1Z_BM_CAPTURE_POLICY,
  FR300_R1Z_BM_CURRENT_GATE,
  FR300_R1Z_BM_EVALUATION_POLICY,
  FR300_R1Z_BM_FIRST_TARGET,
  FR300_R1Z_BM_PRIVACY_POLICY,
  FR300_R1Z_BM_REFERENCE_AUTHORITY,
  aggregateFR300R1ZBMBenchmarkObservations,
  assessFR300R1ZBMBenchmarkPair,
  assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract,
  type FR300R1ZBMBenchmarkObservation,
  type FR300R1ZBMCandidateObservation,
  type FR300R1ZBMReferenceObservation,
} from './rgb-selfie-independent-benchmark-strategy-fr300-r1z-bm.js';

const DIGEST =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

function candidate(
  scalar = 0.6,
  distanceCm = 27.5,
): FR300R1ZBMCandidateObservation {
  return {
    schemaVersion: 'fr300-r1z-bm-candidate-observation-v1',
    evidence: {
      featureKey: FR300_R1Z_BM_FIRST_TARGET,
      candidateRef: 'candidate:rgb:test',
      candidateArtifactDigest: DIGEST,
      sourceCameraClass:
        'ordinary_smartphone_rgb_front_camera',
      sourceRgbOnly: true,
      specialDepthHardwareConsumed: false,
      metric3DInputConsumed: false,
      physicalMillimeterOutputClaimed: false,
      candidateOutputSemantics:
        'unitless_relative_shape_only',
      traditionalSemanticBindingClaimed: false,
    },
    rgbObservationRef: 'rgb:subject-1:capture-1',
    subjectBindingRef: 'subject-binding:1',
    providerVersionRef: 'provider:test@1',
    canonicalizerVersionRef: 'canonicalizer:test@1',
    faceSnapshotVersionRef: 'snapshot:test@1',
    candidateScalar: scalar,
    capture: {
      distanceCm,
      yawBin: 'neutral',
      pitchBin: 'neutral',
      deviceClass:
        'ordinary_smartphone_rgb_front_camera',
      deviceRef: 'device:test',
      lightingBin: 'ordinary_indoor',
    },
  };
}

function bundle(
  value = 0.5,
): FR299Independent3DNoseReferenceBundle {
  return {
    schemaVersion:
      'fr299-independent-3d-nose-reference-bundle-v1',
    artifactVersion: '0.1.0',
    contractVersion:
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1',
    watchtowerTrack: 'face-engine',
    authorityState:
      'independent_3d_nose_reference_bundle_materialized_for_descriptive_benchmark_only',
    bundleId: 'bundle:test:1',
    targetFeatureKey:
      'nose.tip_bridge_relative_projection',
    source: {
      referenceSourceClass: 'independent_calibrated_3d',
      datasetRef: 'dataset:test',
      subjectId: 'subject-1',
      captureId: 'capture-3d-1',
      source3DArtifactRef: 'mesh:test:1',
      source3DArtifactDigest: DIGEST,
      metricScaleVerified: true,
      independentFromCandidateProvider: true,
    },
    registration: {
      sourceCoordinateFrameRef: 'frame:test',
      targetCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      targetUnit: 'centimeter',
      registrationMethodRef: 'registration:test',
      registrationArtifactDigest: DIGEST,
      registrationValidationRef: 'registration-validation:test',
      externallyValidated: true,
      transformIssuedByFR299: false,
      candidateProviderIndependent: true,
      frozenBeforeReferenceDerivation: true,
      frozenBeforeRgbCandidateScoring: true,
    },
    rgbBinding: {
      rgbObservationRef: 'rgb:subject-1:capture-1',
      correspondenceValidationRef: 'correspondence:test',
      sameCaptureBindingEstablished: false,
      validatedRegistrationBindingEstablished: true,
      correspondenceVerified: true,
      frozenBeforeRgbCandidateScoring: true,
    },
    frozenAnnotations: {
      tipArtifactRef: 'annotation:tip:test',
      tipArtifactDigest: DIGEST,
      bridgeRootArtifactRef: 'annotation:bridge:test',
      bridgeRootArtifactDigest: DIGEST,
      subjectAndCaptureBoundToSource: true,
      rawAnnotationCoordinatesPersistedInBundle: false,
    },
    reference: {
      referenceAxisDefinitionRef:
        'neutral.nose.tip_bridge.relative_depth_component_ratio@0.1.0',
      value,
      unit: 'ratio',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      referenceFrozenBeforeRgbCandidateScoring: true,
    },
    readiness: {
      realSourceEvidenceRequiredAtRuntime: true,
      externalRegistrationReceiptRequired: true,
      fr295ReferenceComponentReady: true,
      fr295CandidateIssued: false,
      fr295CandidateReferenceAdmissionIssued: false,
    },
    privacyBoundary: {
      raw3DMeshPersistedInBundle: false,
      rawRgbPersistedInBundle: false,
      rawAnnotationCoordinatesPersistedInBundle: false,
      annotationArtifactRefsAndDigestsPersisted: true,
      derivedReferenceScalarPersisted: true,
    },
    authorityBoundary: {
      externalRegistrationTransformIssued: false,
      realSubjectEvidenceIssuedByStaticContract: false,
      rgbCandidateIssued: false,
      benchmarkWinnerIssued: false,
      acceptanceThresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    },
    researchNoteRef:
      'repo:research/face-reading/fr299-independent-3d-nose-reference-bundle.md',
  };
}

function reference(
  value = 0.5,
): FR300R1ZBMReferenceObservation {
  return {
    schemaVersion: 'fr300-r1z-bm-reference-observation-v1',
    bundle: bundle(value),
    subjectBindingRef: 'subject-binding:1',
    rights: {
      schemaVersion:
        'fr300-r1z-bm-reference-rights-receipt-v1',
      rightsEvidenceRef: 'rights:test',
      internalResearchUse: 'explicitly_allowed',
      commercialResearchAndDevelopment: 'explicitly_allowed',
      rawArtifactRedistribution: 'not_allowed',
      derivedMetricMetadataPublication: 'explicitly_allowed',
      productRuntimeUse: 'not_allowed',
    },
    rawRgbCommittedToGit: false,
    raw3DCommittedToGit: false,
    rawDepthCommittedToGit: false,
  };
}

describe('FR300-R1Z-BM ordinary RGB-selfie independent benchmark strategy', () => {
  it('freezes the product lane at ordinary RGB selfie 25-30 cm with no special-depth dependency', () => {
    expect(FR300_R1Z_BM_CAPTURE_POLICY).toEqual({
      cameraClass: 'ordinary_smartphone_rgb_front_camera',
      minimumDistanceCm: 25,
      maximumDistanceCm: 30,
      specialDepthHardwareRequired: false,
      arcoreRequired: false,
      physicalMillimeterProductOutputRequired: false,
      firstBenchmarkTarget:
        'nose.tip_bridge_relative_projection',
    });
  });

  it('freezes FR299-grade reference authority and keeps historical ARCore research-only', () => {
    expect(FR300_R1Z_BM_REFERENCE_AUTHORITY).toMatchObject({
      finalBenchmarkReferenceClass:
        'fr299_grade_independent_metric_3d_only',
      sameCaptureOrValidatedRegistrationRequired: true,
      metricScaleVerifiedRequired: true,
      providerIndependentRequired: true,
      candidateProviderOutputBlindRequired: true,
      candidateProviderIndexBlindRequired: true,
      traditionalLabelBlindRequired: true,
      referenceFrozenBeforeCandidateScoringRequired: true,
      arcoreHistoricalRole:
        'research_reference_candidate_only_not_fr299_truth',
      candidateDerivedGeometryMayServeAsReference: false,
    });
  });

  it('admits a correctly bound product RGB candidate against an FR299-grade reference and computes descriptive error only', () => {
    const result = assessFR300R1ZBMBenchmarkPair({
      schemaVersion: 'fr300-r1z-bm-benchmark-pair-input-v1',
      candidate: candidate(0.6),
      reference: reference(0.5),
    });

    expect(result.status).toBe(
      'admitted_for_descriptive_benchmark_only',
    );
    expect(result.blockers).toEqual([]);
    expect(result.observation).toMatchObject({
      featureKey: 'nose.tip_bridge_relative_projection',
      candidateScalar: 0.6,
      referenceScalar: 0.5,
    });
    expect(result.observation?.signedError).toBeCloseTo(0.1, 10);
    expect(result.observation?.absoluteError).toBeCloseTo(0.1, 10);
    expect(result.observation?.relativeError).toBeCloseTo(0.2, 10);
    expect(
      result.observation?.authorityBoundary
        .acceptanceThresholdIssued,
    ).toBe(false);
    expect(
      result.observation?.authorityBoundary.benchmarkWinnerIssued,
    ).toBe(false);
  });

  it('blocks a capture outside the actual 25-30 cm product boundary', () => {
    const result = assessFR300R1ZBMBenchmarkPair({
      schemaVersion: 'fr300-r1z-bm-benchmark-pair-input-v1',
      candidate: candidate(0.6, 35),
      reference: reference(0.5),
    });

    expect(result.status).toBe('blocked');
    expect(result.blockers).toContain(
      'capture_distance_outside_product_boundary',
    );
  });

  it('blocks subject or RGB correspondence mismatches', () => {
    const badSubject = reference();
    const result = assessFR300R1ZBMBenchmarkPair({
      schemaVersion: 'fr300-r1z-bm-benchmark-pair-input-v1',
      candidate: candidate(),
      reference: {
        ...badSubject,
        subjectBindingRef: 'subject-binding:other',
      },
    });

    expect(result.status).toBe('blocked');
    expect(result.blockers).toContain(
      'subject_binding_mismatch',
    );

    const badRgb = reference();
    const result2 = assessFR300R1ZBMBenchmarkPair({
      schemaVersion: 'fr300-r1z-bm-benchmark-pair-input-v1',
      candidate: {
        ...candidate(),
        rgbObservationRef: 'rgb:other',
      },
      reference: badRgb,
    });
    expect(result2.blockers).toContain(
      'rgb_observation_binding_mismatch',
    );
  });

  it('blocks unresolved rights needed for internal commercial product R&D', () => {
    const ref = reference();
    const result = assessFR300R1ZBMBenchmarkPair({
      schemaVersion: 'fr300-r1z-bm-benchmark-pair-input-v1',
      candidate: candidate(),
      reference: {
        ...ref,
        rights: {
          ...ref.rights,
          internalResearchUse: 'unresolved',
          commercialResearchAndDevelopment: 'unresolved',
        },
      },
    });

    expect(result.status).toBe('blocked');
    expect(result.blockers).toEqual(
      expect.arrayContaining([
        'reference_rights_internal_research_unresolved',
        'reference_rights_commercial_rnd_unresolved',
      ]),
    );
  });

  it('returns null relative error for a zero reference scalar instead of inventing infinity', () => {
    const result = assessFR300R1ZBMBenchmarkPair({
      schemaVersion: 'fr300-r1z-bm-benchmark-pair-input-v1',
      candidate: candidate(0.1),
      reference: reference(0),
    });
    expect(result.status).toBe(
      'admitted_for_descriptive_benchmark_only',
    );
    expect(result.observation?.relativeError).toBeNull();
  });

  it('aggregates cohort error and rank correlation without issuing a pass threshold', () => {
    const rows: FR300R1ZBMBenchmarkObservation[] = [
      {
        ...assessFR300R1ZBMBenchmarkPair({
          schemaVersion:
            'fr300-r1z-bm-benchmark-pair-input-v1',
          candidate: candidate(0.3),
          reference: reference(0.2),
        }).observation!,
      },
      {
        ...assessFR300R1ZBMBenchmarkPair({
          schemaVersion:
            'fr300-r1z-bm-benchmark-pair-input-v1',
          candidate: candidate(0.5),
          reference: reference(0.4),
        }).observation!,
      },
      {
        ...assessFR300R1ZBMBenchmarkPair({
          schemaVersion:
            'fr300-r1z-bm-benchmark-pair-input-v1',
          candidate: candidate(0.7),
          reference: reference(0.6),
        }).observation!,
      },
    ];

    const aggregate =
      aggregateFR300R1ZBMBenchmarkObservations(rows);

    expect(aggregate.sampleCount).toBe(3);
    expect(aggregate.meanAbsoluteError).toBeCloseTo(0.1, 10);
    expect(aggregate.medianAbsoluteError).toBeCloseTo(0.1, 10);
    expect(aggregate.meanSignedBias).toBeCloseTo(0.1, 10);
    expect(aggregate.spearmanRankCorrelation).toBeCloseTo(1, 10);
    expect(
      aggregate.authorityBoundary.acceptanceThresholdIssued,
    ).toBe(false);
  });

  it('locks evaluation, privacy, and terminal authority without materializing FR299 or Product', () => {
    expect(FR300_R1Z_BM_EVALUATION_POLICY).toMatchObject({
      acceptanceThresholdIssuedByThisStage: false,
      benchmarkWinnerIssuedByThisStage: false,
    });
    expect(FR300_R1Z_BM_PRIVACY_POLICY).toEqual({
      rawRgbMayBeCommittedToGit: false,
      raw3DMayBeCommittedToGit: false,
      rawDepthMayBeCommittedToGit: false,
      derivedScalarReceiptMayBePersisted: true,
      artifactDigestMayBePersisted: true,
      governedOpaqueRefMayBePersisted: true,
      aggregateMetricMayBePersisted: true,
    });
    expect(FR300_R1Z_BM_CURRENT_GATE).toMatchObject({
      disposition:
        'benchmark_strategy_frozen_reference_acquisition_next',
      datasetAcquiredByThisStage: false,
      humanSubjectCapturedByThisStage: false,
      realBenchmarkPairMaterializedByThisStage: false,
      acceptanceThresholdIssued: false,
      benchmarkWinnerIssued: false,
      paidSpendAuthorized: false,
      fr299EligibleCandidateCount: 0,
      fr300R2EligibleCandidateCount: 0,
      productMaterialization: '18/29',
    });
    expect(() =>
      assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract(),
    ).not.toThrow();
  });
});
