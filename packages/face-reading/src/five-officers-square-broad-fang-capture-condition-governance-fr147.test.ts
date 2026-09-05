import { describe, expect, it } from 'vitest';
import {
  FR146_NEXT_FRONTIER,
  getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
  type SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
} from './five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.js';
import {
  FR147_NEXT_FRONTIER,
  assertIssuedSquareBroadFangCaptureConditionGovernanceFR147,
  getSquareBroadFangCaptureConditionGovernanceContractFR147,
  materializeSquareBroadFangCaptureConditionGovernanceFR147,
  type SquareBroadFangCaptureConditionGovernanceDependenciesFR147V1,
  type SquareBroadFangCaptureConditionGovernanceRequestFR147V1,
  type SquareBroadFangCaptureConditionInputFR147V1,
} from './five-officers-square-broad-fang-capture-condition-governance-fr147.js';

function fakeFR146Dataset(): SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1 {
  return {
    schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-dataset-v1',
    artifactVersion: '0.1.0',
    recordId: 'research.face_reading.shenxiang.five_officers.square_broad_fang_repeated_governed_real_capture_dataset.fr146',
    authorityState: 'square_broad_fang_repeated_governed_real_capture_dataset_materialized_descriptive_only_no_semantic_labels',
    targetCriterionRef: 'criterion.intake.square_broad',
    activeConstructScope: 'fang_shape_candidate_features_only',
    predecessor: {
      fr144NextFrontier: 'square_broad_fang_real_capture_acquisition_before_any_empirical_repeatability_or_threshold_interpretation',
      fr145NextFrontier: 'square_broad_fang_repeated_governed_real_capture_dataset_materialization_without_semantic_promotion',
      fr145EphemeralBridgeRequired: true,
      fr144DatasetMaterializerReused: true,
    },
    captureLedger: [
      {
        acquisitionRunRef: 'acq:fr147:test:A',
        providerRunRef: 'provider:fr147:test:A',
        captureRef: 'capture:fr147:test:A',
        researchSubjectRef: 'subject:fr147:test:001',
        captureSeriesRef: 'series:fr147:test:001',
        frame: { width: 640, height: 640 },
        fr144AcquisitionValidation: 'PASS',
        captureQualityValidated: false,
        sourceImageContentEqualityCheckedForOutput: false,
      },
      {
        acquisitionRunRef: 'acq:fr147:test:B',
        providerRunRef: 'provider:fr147:test:B',
        captureRef: 'capture:fr147:test:B',
        researchSubjectRef: 'subject:fr147:test:001',
        captureSeriesRef: 'series:fr147:test:001',
        frame: { width: 640, height: 640 },
        fr144AcquisitionValidation: 'PASS',
        captureQualityValidated: false,
        sourceImageContentEqualityCheckedForOutput: false,
      },
    ],
    seriesSummary: {
      researchSubjectRef: 'subject:fr147:test:001',
      captureSeriesRef: 'series:fr147:test:001',
      captureCount: 2,
      metrics: [],
      repeatedCaptureRequirementSatisfied: true,
      descriptiveStatisticsOnly: true,
      captureQualityValidated: false,
      empiricalRepeatabilityEstablished: false,
      repeatabilityClassificationIssued: false,
      repeatabilityAcceptanceThresholdApplied: false,
    },
    observedCaptureCount: 2,
    observedCaptureSeriesCount: 1,
    observedResearchSubjectCount: 1,
    repeatedCaptureBoundary: {
      minimumCapturesPerSeriesToMaterialize: 2,
      repeatedCaptureRequirementSatisfied: true,
      distinctCaptureRefsRequired: true,
      distinctAcquisitionRunRefsRequired: true,
      distinctProviderRunRefsRequired: true,
      exactSourceByteDuplicateRejectedTransiently: true,
      sourceDigestPersisted: false,
      sourceDigestReturned: false,
      byteDistinctnessMeansIndependentCaptureEvent: false,
      byteDistinctnessMeansNeutralExpressionValidity: false,
      captureQualityValidated: false,
      descriptiveRepeatabilityStatisticsIssued: true,
      empiricalRepeatabilityEstablished: false,
      repeatabilityClassificationIssued: false,
      numericRepeatabilityAcceptanceThreshold: null,
    },
    privacyBoundary: {
      rawImagePersisted: false,
      rawProviderResponsePersisted: false,
      sourceDigestPersisted: false,
      sourceDigestReturned: false,
      embeddingPersisted: false,
      identityTemplatePersisted: false,
      derivedFullFaceMetricGeometryPersisted: false,
      derivedPoseNormalizedLipsGeometryPersisted: false,
    },
    semanticAuthority: {
      humanSemanticLabelsIssued: 0,
      traditionalClassLabelsIssued: 0,
      constructValidity: 'unresolved',
      traditionalBinding: 'unresolved',
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    },
    traditionalSemanticAuthority: false,
    researchNoteRef: 'repo:research/face-reading/fr146-square-broad-fang-repeated-governed-real-capture-dataset.md',
    nextFrontier: FR146_NEXT_FRONTIER,
  } as unknown as SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1;
}

function condition(
  captureRef: string,
  captureSessionRef: string,
  captureEventRef: string,
): SquareBroadFangCaptureConditionInputFR147V1 {
  return {
    captureRef,
    captureSessionRef,
    captureEventRef,
    sessionEvidence: 'study_operator_declared_session_ref_not_independently_verified',
    protocolIntent: {
      expression: 'neutral_expression_requested_not_verified',
      headPosition: 'natural_head_position_requested_not_verified',
      framing: 'full_face_framing_requested_not_verified',
    },
    qualityEvidence: {
      state: 'not_validated_no_threshold_authority',
      sharpnessMetricValidated: false,
      exposureMetricValidated: false,
      lightingMetricValidated: false,
      occlusionValidityVerified: false,
      captureQualityThresholdsDefined: false,
    },
  };
}

function request(
  captureConditions: readonly SquareBroadFangCaptureConditionInputFR147V1[] = [
    condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
    condition('capture:fr147:test:B', 'session:fr147:test:002', 'event:fr147:test:B'),
  ],
): SquareBroadFangCaptureConditionGovernanceRequestFR147V1 {
  return {
    schemaVersion: 'fr147-square-broad-fang-capture-condition-governance-request-v1',
    fr146Dataset: fakeFR146Dataset(),
    captureConditions,
  };
}

const TEST_DEPENDENCIES: SquareBroadFangCaptureConditionGovernanceDependenciesFR147V1 = {
  assertFR146Dataset() {},
  getFR146Contract: getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
};

describe('FR147 square broad Fang capture-condition governance', () => {
  it('freezes a protocol-only governance contract without opening repeatability interpretation', () => {
    const contract = getSquareBroadFangCaptureConditionGovernanceContractFR147();
    expect(contract.predecessor.fr146NextFrontier).toBe(FR146_NEXT_FRONTIER);
    expect(contract.admission.minimumDistinctSessionRefsRequired).toBe(2);
    expect(contract.admission.captureTimestampsRequired).toBe(false);
    expect(contract.admission.deviceIdentifiersRequired).toBe(false);
    expect(contract.admission.geolocationRequired).toBe(false);
    expect(contract.authorityBoundary.distinctSessionRefsMeanIndependentCaptureSessions).toBe(false);
    expect(contract.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(contract.authorityBoundary.captureQualityThresholdsDefined).toBe(false);
    expect(contract.authorityBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(contract.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.traditionalSemanticAuthority).toBe(false);
    expect(contract.nextFrontier).toBe(FR147_NEXT_FRONTIER);
  });

  it('materializes multi-session reference governance while preserving unresolved quality and semantic authority', () => {
    const result = materializeSquareBroadFangCaptureConditionGovernanceFR147(request(), TEST_DEPENDENCIES);
    assertIssuedSquareBroadFangCaptureConditionGovernanceFR147(result);

    expect(result.observedCaptureCount).toBe(2);
    expect(result.observedSessionRefCount).toBe(2);
    expect(result.observedCaptureEventRefCount).toBe(2);
    expect(result.conditionLedger).toHaveLength(2);
    expect(result.governanceBoundary.captureConditionCoverageComplete).toBe(true);
    expect(result.governanceBoundary.multiSessionReferenceRequirementSatisfied).toBe(true);
    expect(result.governanceBoundary.distinctSessionRefsMeanIndependentCaptureSessions).toBe(false);
    expect(result.governanceBoundary.distinctCaptureEventRefsMeanIndependentCaptureEvents).toBe(false);
    expect(result.governanceBoundary.captureQualityValidated).toBe(false);
    expect(result.governanceBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(result.governanceBoundary.repeatabilityInterpretationAllowed).toBe(false);
    expect(result.governanceBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.governanceBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(result.privacyBoundary.rawImagePersisted).toBe(false);
    expect(result.privacyBoundary.captureTimestampPersisted).toBe(false);
    expect(result.privacyBoundary.geolocationPersisted).toBe(false);
    expect(result.privacyBoundary.deviceIdentifierPersisted).toBe(false);
    expect(result.semanticAuthority.constructValidity).toBe('unresolved');
    expect(result.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('uses active FR146 issuance by default and rejects a structurally plausible forged predecessor dataset', () => {
    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request())).toThrow(
      /FR-146 dataset was not issued|dataset was not issued by the active FR-146/i,
    );
  });

  it('rejects one-session relabeling before governance materialization', () => {
    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
      condition('capture:fr147:test:B', 'session:fr147:test:001', 'event:fr147:test:B'),
    ]), TEST_DEPENDENCIES)).toThrow(/at least two distinct study-local session refs/i);
  });

  it('rejects missing, duplicate, and unknown capture-condition coverage', () => {
    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
    ]), TEST_DEPENDENCIES)).toThrow(/exactly one condition record for every FR-146 capture/i);

    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
      condition('capture:fr147:test:A', 'session:fr147:test:002', 'event:fr147:test:B'),
    ]), TEST_DEPENDENCIES)).toThrow(/duplicates captureRef/i);

    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
      condition('capture:fr147:test:UNKNOWN', 'session:fr147:test:002', 'event:fr147:test:B'),
    ]), TEST_DEPENDENCIES)).toThrow(/unknown FR-146 captureRef/i);
  });

  it('rejects duplicate capture-event refs and any quality-authority promotion', () => {
    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:dup'),
      condition('capture:fr147:test:B', 'session:fr147:test:002', 'event:fr147:test:dup'),
    ]), TEST_DEPENDENCIES)).toThrow(/duplicates captureEventRef/i);

    const promoted = condition('capture:fr147:test:B', 'session:fr147:test:002', 'event:fr147:test:B');
    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
      {
        ...promoted,
        qualityEvidence: {
          ...promoted.qualityEvidence,
          sharpnessMetricValidated: true,
        },
      } as unknown as SquareBroadFangCaptureConditionInputFR147V1,
    ]), TEST_DEPENDENCIES)).toThrow(/cannot promote unvalidated capture-quality evidence/i);
  });

  it('rejects unauthorized request, condition, protocol, and quality fields', () => {
    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147({
      ...request(),
      unexpectedRequestField: true,
    } as unknown as SquareBroadFangCaptureConditionGovernanceRequestFR147V1, TEST_DEPENDENCIES)).toThrow(/request contains unauthorized field/i);

    const base = condition('capture:fr147:test:B', 'session:fr147:test:002', 'event:fr147:test:B');
    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
      { ...base, unexpectedConditionField: true } as unknown as SquareBroadFangCaptureConditionInputFR147V1,
    ]), TEST_DEPENDENCIES)).toThrow(/capture condition 1 contains unauthorized field/i);

    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
      {
        ...base,
        protocolIntent: { ...base.protocolIntent, verified: true },
      } as unknown as SquareBroadFangCaptureConditionInputFR147V1,
    ]), TEST_DEPENDENCIES)).toThrow(/protocolIntent contains unauthorized field/i);

    expect(() => materializeSquareBroadFangCaptureConditionGovernanceFR147(request([
      condition('capture:fr147:test:A', 'session:fr147:test:001', 'event:fr147:test:A'),
      {
        ...base,
        qualityEvidence: { ...base.qualityEvidence, threshold: 0.5 },
      } as unknown as SquareBroadFangCaptureConditionInputFR147V1,
    ]), TEST_DEPENDENCIES)).toThrow(/qualityEvidence contains unauthorized field/i);
  });

  it('rejects forged FR147 governance artifacts at the issued-object boundary', () => {
    const issued = materializeSquareBroadFangCaptureConditionGovernanceFR147(request(), TEST_DEPENDENCIES);
    const forged = { ...issued };
    expect(() => assertIssuedSquareBroadFangCaptureConditionGovernanceFR147(forged)).toThrow(/not issued by the active FR-147 boundary/i);
  });
});
