import { describe, expect, it } from 'vitest';
import {
  FR146_NEXT_FRONTIER,
  getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
  type SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
} from './five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.js';
import {
  DEFAULT_SQUARE_BROAD_FANG_MULTI_SESSION_CONDITION_GOVERNANCE_DEPENDENCIES_FR147,
  FR147_NEXT_FRONTIER,
  assertIssuedSquareBroadFangMultiSessionConditionGovernanceFR147,
  getSquareBroadFangMultiSessionConditionGovernanceContractFR147,
  governSquareBroadFangMultiSessionConditionsFR147,
  type SquareBroadFangCaptureSessionConditionRecordFR147V1,
  type SquareBroadFangMultiSessionConditionGovernanceDependenciesFR147V1,
} from './five-officers-square-broad-fang-multi-session-condition-governance-fr147.js';

function dataset(): SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1 {
  return {
    schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-dataset-v1',
    artifactVersion: '0.1.0',
    authorityState: 'square_broad_fang_repeated_governed_real_capture_dataset_materialized_descriptive_only_no_semantic_labels',
    targetCriterionRef: 'criterion.intake.square_broad',
    activeConstructScope: 'fang_shape_candidate_features_only',
    captureLedger: [
      {
        acquisitionRunRef: 'acq:fr147:1',
        providerRunRef: 'provider:fr147:1',
        captureRef: 'capture:fr147:1',
        researchSubjectRef: 'subject:fr147:A',
        captureSeriesRef: 'series:fr147:A',
        frame: { width: 554, height: 554 },
        fr144AcquisitionValidation: 'PASS',
        captureQualityValidated: false,
        sourceImageContentEqualityCheckedForOutput: false,
      },
      {
        acquisitionRunRef: 'acq:fr147:2',
        providerRunRef: 'provider:fr147:2',
        captureRef: 'capture:fr147:2',
        researchSubjectRef: 'subject:fr147:A',
        captureSeriesRef: 'series:fr147:A',
        frame: { width: 554, height: 554 },
        fr144AcquisitionValidation: 'PASS',
        captureQualityValidated: false,
        sourceImageContentEqualityCheckedForOutput: false,
      },
    ],
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
    nextFrontier: FR146_NEXT_FRONTIER,
  } as unknown as SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1;
}

function sessions(): readonly SquareBroadFangCaptureSessionConditionRecordFR147V1[] {
  return [
    {
      sessionRef: 'session:fr147:1',
      captureRefs: ['capture:fr147:1'],
      captureProtocolRef: 'protocol:mouth-neutral:v1',
      neutralExpressionInstructionRef: 'instruction:neutral-mouth:v1',
      headPoseInstructionRef: 'instruction:frontal-head:v1',
      cameraConfigurationRef: 'camera-config:fr147:session-1',
      illuminationConditionRef: 'illumination:fr147:session-1',
      backgroundConditionRef: 'background:fr147:session-1',
      captureDistanceConditionRef: 'distance:fr147:session-1',
      operatorProcedureRef: 'procedure:fr147:v1',
    },
    {
      sessionRef: 'session:fr147:2',
      captureRefs: ['capture:fr147:2'],
      captureProtocolRef: 'protocol:mouth-neutral:v1',
      neutralExpressionInstructionRef: 'instruction:neutral-mouth:v1',
      headPoseInstructionRef: 'instruction:frontal-head:v1',
      cameraConfigurationRef: 'camera-config:fr147:session-2',
      illuminationConditionRef: 'illumination:fr147:session-2',
      backgroundConditionRef: 'background:fr147:session-2',
      captureDistanceConditionRef: 'distance:fr147:session-2',
      operatorProcedureRef: 'procedure:fr147:v1',
    },
  ];
}

function dependencies(): SquareBroadFangMultiSessionConditionGovernanceDependenciesFR147V1 {
  return {
    assertFR146Dataset() {},
    getFR146Contract: getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
  };
}

describe('FR147 multi-session condition governance', () => {
  it('freezes documentation governance without inventing objective capture quality or repeatability authority', () => {
    const contract = getSquareBroadFangMultiSessionConditionGovernanceContractFR147();
    expect(contract.acquisitionGovernance.minimumDistinctSessions).toBe(2);
    expect(contract.acquisitionGovernance.completeCapturePartitionRequired).toBe(true);
    expect(contract.acquisitionGovernance.objectiveCaptureQualityMetricsIssuedByThisArtifact).toBe(0);
    expect(contract.authorityBoundary.conditionDocumentationMeansPhysicalConditionEquality).toBe(false);
    expect(contract.authorityBoundary.conditionDocumentationMeansCaptureQualityValidated).toBe(false);
    expect(contract.authorityBoundary.multiSessionCoverageMeansEmpiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.repeatabilityInterpretationAuthorized).toBe(false);
    expect(contract.semanticAuthority.constructValidity).toBe('unresolved');
    expect(contract.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(contract.semanticAuthority.criterionState).toBeNull();
    expect(contract.nextFrontier).toBe(FR147_NEXT_FRONTIER);
  });

  it('covers every predecessor capture exactly once across two governed sessions', () => {
    const result = governSquareBroadFangMultiSessionConditionsFR147({
      schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-request-v1',
      dataset: dataset(),
      sessions: sessions(),
    }, dependencies());

    expect(result.observedCaptureCount).toBe(2);
    expect(result.observedSessionCount).toBe(2);
    expect(result.sessions).toHaveLength(2);
    expect(result.sessions.every((session) => session.conditionDocumentationComplete)).toBe(true);
    expect(result.sessions.every((session) => session.captureQualityValidated === false)).toBe(true);
    expect(result.governanceBoundary.multiSessionConditionCoverageSatisfied).toBe(true);
    expect(result.governanceBoundary.allPredecessorCapturesCoveredExactlyOnce).toBe(true);
    expect(result.governanceBoundary.objectiveCaptureQualityMetricsIssued).toBe(0);
    expect(result.governanceBoundary.objectiveCaptureQualityValidated).toBe(false);
    expect(result.governanceBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.governanceBoundary.repeatabilityInterpretationAuthorized).toBe(false);
    expect(result.governanceBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(result.privacyBoundary.rawImagePersisted).toBe(false);
    expect(result.privacyBoundary.deviceSerialNumberRequired).toBe(false);
    expect(result.privacyBoundary.operatorIdentityRequired).toBe(false);
    expect(result.privacyBoundary.exactCaptureTimestampRequired).toBe(false);
    expect(result.semanticAuthority.constructValidity).toBe('unresolved');
    expect(result.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(result.traditionalSemanticAuthority).toBe(false);
    assertIssuedSquareBroadFangMultiSessionConditionGovernanceFR147(result);
    expect(() => assertIssuedSquareBroadFangMultiSessionConditionGovernanceFR147({ ...result }))
      .toThrow(/not issued/u);
  });

  it('rejects single-session documentation because multi-session coverage is not met', () => {
    expect(() => governSquareBroadFangMultiSessionConditionsFR147({
      schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-request-v1',
      dataset: dataset(),
      sessions: sessions().slice(0, 1),
    }, dependencies())).toThrow(/at least two documented capture sessions/u);
  });

  it('rejects an incomplete capture partition', () => {
    const value = sessions().map((session) => ({ ...session, captureRefs: [...session.captureRefs] }));
    value[1]!.captureRefs = ['capture:fr147:1'];
    expect(() => governSquareBroadFangMultiSessionConditionsFR147({
      schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-request-v1',
      dataset: dataset(),
      sessions: value,
    }, dependencies())).toThrow(/more than one session/u);
  });

  it('rejects an unknown captureRef', () => {
    const value = sessions().map((session) => ({ ...session, captureRefs: [...session.captureRefs] }));
    value[1]!.captureRefs = ['capture:fr147:unknown'];
    expect(() => governSquareBroadFangMultiSessionConditionsFR147({
      schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-request-v1',
      dataset: dataset(),
      sessions: value,
    }, dependencies())).toThrow(/unknown captureRef/u);
  });

  it('rejects cross-session protocol or instruction drift', () => {
    const value = sessions().map((session) => ({ ...session, captureRefs: [...session.captureRefs] }));
    value[1] = { ...value[1]!, captureProtocolRef: 'protocol:drifted:v2' };
    expect(() => governSquareBroadFangMultiSessionConditionsFR147({
      schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-request-v1',
      dataset: dataset(),
      sessions: value,
    }, dependencies())).toThrow(/captureProtocolRef must remain shared/u);
  });

  it('rejects a structurally plausible forged FR146 dataset under production dependencies', () => {
    expect(() => governSquareBroadFangMultiSessionConditionsFR147({
      schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-request-v1',
      dataset: dataset(),
      sessions: sessions(),
    }, DEFAULT_SQUARE_BROAD_FANG_MULTI_SESSION_CONDITION_GOVERNANCE_DEPENDENCIES_FR147))
      .toThrow(/not issued by the active FR-146 repeated governed acquisition boundary/u);
  });
});
