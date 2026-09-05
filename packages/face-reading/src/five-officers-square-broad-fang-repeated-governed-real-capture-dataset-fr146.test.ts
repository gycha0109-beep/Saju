import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from './mediapipe-release-exact-metric-geometry-admission-fr75.js';
import {
  admitMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  FR144_CAPTURE_RECORD_ID,
  FR144_CORRESPONDENCE_METRIC_REF,
  FR144_NEXT_FRONTIER,
  FR144_ORTHOGONALITY_METRIC_REF,
  FR144_TURN_CONCENTRATION_METRIC_REF,
  getSquareBroadFangRealCaptureAcquisitionContractFR144,
  type SquareBroadFangNeutralAcquisitionDatasetFR144V1,
  type SquareBroadFangNeutralCaptureRecordFR144V1,
} from './five-officers-square-broad-fang-real-capture-acquisition-fr144.js';
import {
  FR145_NEXT_FRONTIER,
  type SquareBroadFangEphemeralRealCaptureRequestFR145V1,
  type SquareBroadFangEphemeralRealCaptureResultFR145V1,
} from './five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145.js';
import {
  DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146,
  FR146_NEXT_FRONTIER,
  assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146,
  getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
  runSquareBroadFangRepeatedGovernedRealCaptureFR146,
  type SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1,
  type SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1,
} from './five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.js';

const DIGEST = `sha256:${'8'.repeat(64)}`;

function providerResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 13) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function providerFactory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() { return providerResult(); },
        close() {},
      };
    },
  };
}

async function parity(): Promise<MediaPipeScreenToMetricReimplementationParityFR76V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr146:test-parity',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ synthetic: true }),
  }, providerFactory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(
    admitMediaPipeReleaseExactMetricGeometryFR75(fr69),
  );
}

function fakeRecord(
  request: SquareBroadFangEphemeralRealCaptureRequestFR145V1,
  offset: number,
): SquareBroadFangNeutralCaptureRecordFR144V1 {
  return {
    schemaVersion: 'fr144-square-broad-fang-neutral-capture-record-v1',
    artifactVersion: '0.1.0',
    recordId: FR144_CAPTURE_RECORD_ID,
    authorityState: 'square_broad_fang_fr142_neutral_metric_capture_record_materialized_no_semantic_label',
    targetCriterionRef: 'criterion.intake.square_broad',
    activeConstructScope: 'fang_shape_candidate_features_only',
    identity: request.identity,
    source: {
      fr142SchemaVersion: 'fr142-square-broad-fang-neutral-candidate-metric-runtime-v1',
      fr142ArtifactVersion: '0.1.0',
      fr142AuthorityState: 'square_broad_fang_source_grounded_role_invariant_neutral_candidate_metrics_implemented_no_traditional_binding',
      fr142NextFrontier: 'square_broad_fang_neutral_candidate_metric_repeatability_and_synthetic_geometry_discrimination_without_traditional_binding',
      fr143SyntheticBehaviorVerified: true,
      fr143SyntheticRepeatabilityMeansEmpiricalCaptureRepeatability: false,
      candidateFeatureCoverage: 'fr142_three_role_invariant_fang_shape_candidate_metrics_only',
    },
    neutralMetricValues: [
      {
        metricRef: FR144_CORRESPONDENCE_METRIC_REF,
        value: 0.1 + offset,
        unit: 'ratio',
        contributingClosedCycleCount: 2,
        contributingElementCount: 40,
        classificationApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
      },
      {
        metricRef: FR144_ORTHOGONALITY_METRIC_REF,
        value: 0.5 + offset,
        unit: 'ratio',
        contributingClosedCycleCount: 2,
        contributingElementCount: 40,
        classificationApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
      },
      {
        metricRef: FR144_TURN_CONCENTRATION_METRIC_REF,
        value: 0.2 + offset,
        unit: 'ratio',
        contributingClosedCycleCount: 2,
        contributingElementCount: 40,
        classificationApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
      },
    ],
    semanticBoundary: {
      humanSemanticLabel: null,
      traditionalClassLabel: null,
      semanticAnnotationRequiredToRecordNeutralMetrics: false,
      neutralCaptureRecordMeansConstructValidity: false,
      neutralCaptureRecordMeansTraditionalFang: false,
    },
    privacyBoundary: {
      rawImageStored: false,
      sourceImageContentStored: false,
      rawProviderResponseStored: false,
      faceEmbeddingStored: false,
      identityTemplateStored: false,
      researchSubjectRefClaimedAnonymous: false,
    },
    authorityBoundary: {
      descriptiveNeutralRecordMeansCalibration: false,
      descriptiveNeutralRecordMeansThreshold: false,
      componentOrderSemanticUseAllowed: false,
      outerInnerAnatomicalAssignmentAllowed: false,
      namedMouthCornerAssignmentAllowed: false,
    },
    traditionalSemanticAuthority: false,
  };
}

function fakeResult(
  request: SquareBroadFangEphemeralRealCaptureRequestFR145V1,
  offset: number,
): SquareBroadFangEphemeralRealCaptureResultFR145V1 {
  const record = fakeRecord(request, offset);
  return {
    schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-result-v1',
    artifactVersion: '0.1.0',
    authorityState: 'ephemeral_real_capture_neutral_metrics_materialized_no_semantic_promotion',
    acquisitionRunRef: request.acquisitionRunRef,
    captureRef: request.identity.captureRef,
    providerRunRef: request.providerRunRef,
    faceDetected: true,
    providerLandmarkCount: 478,
    governedMetricLandmarkCount: 468,
    frame: { width: 554, height: 554 },
    intake: {
      mode: 'single_ephemeral_browser_image',
      sourceBytesPersisted: false,
      browserDecodedImagePersisted: false,
    },
    quality: {
      captureQualityValidated: false,
      qualityAuthority: 'not_assessed_by_fr145',
    },
    poseNormalization: {
      coordinateFrame: 'pose_normalized_face_2d',
      poseCompensated: true,
      depthOutputIssued: false,
    },
    lipContours: {
      contourCount: 2,
      contourPointCounts: [20, 20],
      contourConsumptionState: 'unordered_set_no_outer_inner_role',
      anatomicalRoleAssigned: false,
      traditionalRoleAssigned: false,
    },
    fr134: {
      metricValues: [
        {
          metricRef: 'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0',
          value: 0.8 + offset,
          unit: 'ratio',
          coordinateFrame: 'pose_normalized_face_2d',
          poseCompensated: true,
          contributingClosedCycleCount: 2,
          contributingElementCount: 40,
          classificationApplied: false,
          calibrationApplied: false,
          traditionalBindingApplied: false,
        },
        {
          metricRef: 'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0',
          value: 0.3 + offset,
          unit: 'radian',
          coordinateFrame: 'pose_normalized_face_2d',
          poseCompensated: true,
          contributingClosedCycleCount: 2,
          contributingElementCount: 40,
          classificationApplied: false,
          calibrationApplied: false,
          traditionalBindingApplied: false,
        },
      ],
    },
    fr142: {
      metricValues: [
        { ...record.neutralMetricValues[0]! },
        { ...record.neutralMetricValues[1]! },
        { ...record.neutralMetricValues[2]! },
      ],
    },
    fr144: { acquisitionValidation: 'PASS', captureRecord: record },
    persistencePolicy: {
      rawImagePersisted: false,
      rawProviderResponsePersisted: false,
      embeddingPersisted: false,
      identityTemplatePersisted: false,
      derivedFullFaceMetricGeometryPersisted: false,
      derivedPoseNormalizedLipsGeometryPersisted: false,
    },
    semanticAuthority: {
      constructValidity: 'unresolved',
      traditionalBinding: 'unresolved',
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    },
    traditionalSemanticAuthority: false,
    researchNoteRef: 'repo:research/face-reading/fr145-square-broad-fang-ephemeral-real-capture-bridge.md',
    nextFrontier: FR145_NEXT_FRONTIER,
  };
}

function summarize(records: readonly SquareBroadFangNeutralCaptureRecordFR144V1[], index: 0 | 1 | 2) {
  const metricRef = records[0]!.neutralMetricValues[index]!.metricRef;
  const values = records.map((record) => record.neutralMetricValues[index]!.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return {
    metricRef,
    unit: 'ratio' as const,
    count: values.length,
    min,
    max,
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    range: max - min,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    acceptanceThresholdApplied: false as const,
  };
}

function fakeDataset(
  records: readonly SquareBroadFangNeutralCaptureRecordFR144V1[],
): SquareBroadFangNeutralAcquisitionDatasetFR144V1 {
  const metrics = [summarize(records, 0), summarize(records, 1), summarize(records, 2)] as const;
  return {
    schemaVersion: 'fr144-square-broad-fang-neutral-acquisition-dataset-v1',
    artifactVersion: '0.1.0',
    recordId: FR144_CAPTURE_RECORD_ID,
    authorityState: 'square_broad_fang_fr142_neutral_acquisition_dataset_materialized_descriptive_only',
    datasetState: 'neutral_candidate_feature_observations_only_no_semantic_labels',
    targetCriterionRef: 'criterion.intake.square_broad',
    activeConstructScope: 'fang_shape_candidate_features_only',
    captureRecords: records,
    seriesSummaries: [{
      researchSubjectRef: records[0]!.identity.researchSubjectRef,
      captureSeriesRef: records[0]!.identity.captureSeriesRef,
      captureCount: records.length,
      metrics,
      repeatabilityClassificationIssued: false,
      repeatabilityAcceptanceThresholdApplied: false,
    }],
    observedCaptureCount: records.length,
    observedCaptureSeriesCount: 1,
    observedResearchSubjectCount: 1,
    semanticLabelsIssued: 0,
    authorityBoundary: {
      datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false,
      descriptiveSeriesSummaryMeansConstructValidity: false,
      datasetMaterializationMeansTraditionalBinding: false,
      datasetMaterializationMeansCalibration: false,
      datasetMaterializationMeansThreshold: false,
      datasetMaterializationMeansCriterionState: false,
      datasetMaterializationMeansClaim: false,
      datasetMaterializationMeansNarrative: false,
    },
    traditionalSemanticAuthority: false,
    nextFrontier: FR144_NEXT_FRONTIER,
  };
}

function dependencies(): SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1 {
  let offset = 0;
  return {
    async runCapture(input) {
      const result = fakeResult(input, offset);
      offset += 0.05;
      return result;
    },
    assertFR144Record() {},
    materializeFR144Dataset: fakeDataset,
    assertFR144Dataset() {},
    getFR144Contract: getSquareBroadFangRealCaptureAcquisitionContractFR144,
  };
}

async function request(): Promise<SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1> {
  return {
    schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-request-v1',
    researchSubjectRef: 'study-subject:fr146:A',
    captureSeriesRef: 'capture-series:fr146:A',
    geometryMetadataPbtxt: 'release-exact-test-metadata',
    parity: await parity(),
    captures: [
      {
        acquisitionRunRef: 'acquisition:fr146:A1',
        providerRunRef: 'provider:fr146:A1',
        captureRef: 'capture:fr146:A1',
        imageBlob: new Blob([new Uint8Array([1, 2, 3])], { type: 'image/jpeg' }),
      },
      {
        acquisitionRunRef: 'acquisition:fr146:A2',
        providerRunRef: 'provider:fr146:A2',
        captureRef: 'capture:fr146:A2',
        imageBlob: new Blob([new Uint8Array([4, 5, 6])], { type: 'image/jpeg' }),
      },
    ],
  };
}

describe('FR146 repeated governed real-capture dataset', () => {
  it('freezes repeated capture as descriptive empirical acquisition without repeatability interpretation', () => {
    const contract = getSquareBroadFangRepeatedGovernedRealCaptureContractFR146();
    expect(contract.acquisition.minimumCapturesPerSeriesToMaterialize).toBe(2);
    expect(contract.acquisition.exactSourceByteDuplicateRejectedTransiently).toBe(true);
    expect(contract.acquisition.sourceDigestPersisted).toBe(false);
    expect(contract.acquisition.sourceDigestReturned).toBe(false);
    expect(contract.acquisition.captureQualityValidatedByThisArtifact).toBe(false);
    expect(contract.acquisition.numericRepeatabilityAcceptanceThresholds).toBeNull();
    expect(contract.authorityBoundary.repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished).toBe(false);
    expect(contract.authorityBoundary.descriptiveStatisticsMeanConstructValidity).toBe(false);
    expect(contract.semanticAuthority.constructValidity).toBe('unresolved');
    expect(contract.semanticAuthority.traditionalBinding).toBe('unresolved');
    expect(contract.nextFrontier).toBe(FR146_NEXT_FRONTIER);
  });

  it('runs two byte-distinct ephemeral captures sequentially and emits only bounded descriptive output', async () => {
    const result = await runSquareBroadFangRepeatedGovernedRealCaptureFR146(await request(), dependencies());
    expect(result.observedCaptureCount).toBe(2);
    expect(result.observedCaptureSeriesCount).toBe(1);
    expect(result.observedResearchSubjectCount).toBe(1);
    expect(result.captureLedger).toHaveLength(2);
    expect(result.seriesSummary.captureCount).toBe(2);
    expect(result.seriesSummary.metrics).toHaveLength(3);
    expect(result.seriesSummary.metrics.every((metric) => metric.count === 2)).toBe(true);
    expect(result.seriesSummary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.seriesSummary.captureQualityValidated).toBe(false);
    expect(result.repeatedCaptureBoundary.sourceDigestPersisted).toBe(false);
    expect(result.repeatedCaptureBoundary.sourceDigestReturned).toBe(false);
    expect(result.semanticAuthority.humanSemanticLabelsIssued).toBe(0);
    expect(result.semanticAuthority.traditionalClassLabelsIssued).toBe(0);
    expect(result.semanticAuthority.criterionState).toBeNull();
    expect(result.traditionalSemanticAuthority).toBe(false);
    const serialized = JSON.stringify(result);
    expect(serialized).not.toContain('imageBlob');
    expect(serialized).not.toContain('"rawProviderResponse":');
    assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146(result);
    expect(() => assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146({ ...result }))
      .toThrow(/not issued/u);
  });

  it('rejects a singleton series before any real-capture execution', async () => {
    const value = await request();
    const calls: string[] = [];
    const deps = dependencies();
    const guarded = {
      ...deps,
      async runCapture(input: SquareBroadFangEphemeralRealCaptureRequestFR145V1) {
        calls.push(input.identity.captureRef);
        return deps.runCapture(input);
      },
    };
    await expect(runSquareBroadFangRepeatedGovernedRealCaptureFR146({
      ...value,
      captures: value.captures.slice(0, 1),
    }, guarded)).rejects.toThrow(/at least two capture inputs/u);
    expect(calls).toEqual([]);
  });

  it('rejects exact duplicate source bytes before provider execution even when refs differ', async () => {
    const value = await request();
    let calls = 0;
    const deps = dependencies();
    const guarded = {
      ...deps,
      async runCapture(input: SquareBroadFangEphemeralRealCaptureRequestFR145V1) {
        calls += 1;
        return deps.runCapture(input);
      },
    };
    await expect(runSquareBroadFangRepeatedGovernedRealCaptureFR146({
      ...value,
      captures: [
        { ...value.captures[0]!, imageBlob: new Blob([new Uint8Array([7, 7, 7])]) },
        { ...value.captures[1]!, imageBlob: new Blob([new Uint8Array([7, 7, 7])]) },
      ],
    }, guarded)).rejects.toThrow(/exact duplicate source image bytes/u);
    expect(calls).toBe(0);
  });

  it('rejects duplicate opaque execution or capture refs', async () => {
    const value = await request();
    await expect(runSquareBroadFangRepeatedGovernedRealCaptureFR146({
      ...value,
      captures: [
        value.captures[0]!,
        { ...value.captures[1]!, captureRef: value.captures[0]!.captureRef },
      ],
    }, dependencies())).rejects.toThrow(/duplicate captureRef/u);
  });

  it('fails closed when an injected FR145 result widens semantic authority', async () => {
    const value = await request();
    const deps = dependencies();
    const widened: SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1 = {
      ...deps,
      async runCapture(input) {
        return {
          ...(await deps.runCapture(input)),
          traditionalSemanticAuthority: true,
        } as unknown as SquareBroadFangEphemeralRealCaptureResultFR145V1;
      },
    };
    await expect(runSquareBroadFangRepeatedGovernedRealCaptureFR146(value, widened))
      .rejects.toThrow(/exact FR-145 bounded result contract/u);
  });

  it('uses active FR144 issuance by default and rejects a structurally plausible forged capture record', async () => {
    const value = await request();
    const deps: SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1 = {
      ...DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146,
      async runCapture(input) { return fakeResult(input, 0); },
    };
    await expect(runSquareBroadFangRepeatedGovernedRealCaptureFR146(value, deps))
      .rejects.toThrow(/not issued by the active FR-144 acquisition boundary/u);
  });
});
