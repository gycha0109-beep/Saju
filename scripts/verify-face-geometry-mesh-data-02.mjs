import { createHash } from 'node:crypto';
import process from 'node:process';
import {
  MESH_DATA_02_FROZEN_PRIMARY_FIELDS,
  reviewMeshData02SessionObject,
} from './review-face-geometry-mesh-data-02-session.mjs';

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

function makeObservations() {
  return MESH_DATA_02_FROZEN_PRIMARY_FIELDS.map((evidenceField, index) => ({
    evidenceField,
    value: index === 0 ? 0 : index / 1000,
    sourceSchemaVersion: 'mesh6d-multi-frame-pose-sweep-evidence-v1',
    classificationApplied: false,
    calibrationApplied: false,
    thresholdApplied: false,
    productionAdmissionApplied: false,
    identityMatchingApplied: false,
    traditionalBindingApplied: false,
  }));
}

function makeArtifact() {
  const provenance = {
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    canonicalAssetDigest: 'sha256:synthetic-mechanics-only',
    releaseCommit: 'synthetic-mechanics-only',
    geometryMetadataBlobSha: 'synthetic-mechanics-only',
    adapterSchemaVersion: 'face-geometry-mediapipe468-weighted-region-adapter-v2',
    adapterSourceAssetId: 'synthetic-mechanics-only',
    adapterTargetAssetId: 'synthetic-mechanics-only',
    adapterTargetVertexCount: 468,
    adapterRegionCount: 22,
    adapterMembershipEdgeCount: 712,
  };
  const sweepRecords = [1, 2, 3].map((index) => ({
    prospectiveCollectionRef: 'mesh-data-02:test:collection',
    captureSeriesRef: 'mesh-data-02:test:series',
    sweepRef: 'mesh-data-02:test:sweep:' + index,
    captureConditionRef: 'mesh-data-02:test:baseline',
    sweepSequenceIndex: index,
    prospectiveEligibilityState: 'mesh6e_attestations_accepted_not_independently_verified',
    provenance: { ...provenance },
    evidenceObservations: makeObservations(),
  }));
  return {
    schemaVersion: 'mesh6i-manual-browser-capture-controller-result-v1',
    session: {
      schemaVersion: 'mesh6g-prospective-operator-capture-session-v1',
      dataset: {
        schemaVersion: 'mesh6f-prospective-sweep-acquisition-dataset-v1',
        authorityState: 'prospective_mesh6d_observation_dataset_descriptive_only',
        sweepRecords,
        observedSweepCount: 3,
        observedCaptureSeriesCount: 1,
        observedCaptureConditionCount: 1,
        execution: {
          empiricalRepeatabilityEstablished: false,
          captureQualityValidated: false,
          poseAcceptanceValidated: false,
          populationNormDefined: false,
          numericMorphologyRepeatabilityAcceptanceThreshold: null,
          numericCaptureQualityThreshold: null,
          numericPoseAcceptanceThreshold: null,
          confidenceThreshold: null,
          productionMorphologyAuthorized: false,
        },
        authorityBoundary: {
          datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false,
          descriptiveSeriesSummaryMeansRepeatabilityPass: false,
          descriptiveConditionSummaryMeansCaptureQualityValidated: false,
          descriptivePoseSummaryMeansPoseAcceptanceValidated: false,
          betweenSeriesIdentityInferenceAllowed: false,
          sameDifferentParticipantClassificationAllowed: false,
          calibrationIssued: false,
          thresholdsIssued: false,
          productionAdmissionIssued: false,
          anatomicalMeasurementClaimed: false,
        },
        privacyBoundary: {
          rawImageStored: false,
          rawVideoStored: false,
          rawProviderResponseStored: false,
          rawLandmarkSetStored: false,
          derivedFullFaceMetricGeometryStored: false,
          faceEmbeddingStored: false,
          identityTemplateStored: false,
        },
      },
      execution: {
        sweepCount: 3,
        capturedFrameCount: 15,
      },
      privacyBoundary: {
        rawImageIncludedInSessionArtifact: false,
        rawVideoIncludedInSessionArtifact: false,
        rawProviderResponseIncludedInSessionArtifact: false,
        rawLandmarkSetIncludedInSessionArtifact: false,
        derivedFullFaceMetricGeometryIncludedInSessionArtifact: false,
        faceEmbeddingIncludedInSessionArtifact: false,
        identityTemplateIncludedInSessionArtifact: false,
      },
      authorityBoundary: {
        sessionMaterializationMeansEmpiricalRepeatabilityEstablished: false,
        sessionMaterializationMeansCaptureQualityValidated: false,
        sessionMaterializationMeansPoseAcceptanceValidated: false,
        classificationIssued: false,
        calibrationIssued: false,
        thresholdsIssued: false,
        confidenceScoreIssued: false,
        populationNormDefined: false,
        productionMorphologyAuthorized: false,
        identityMatchingPerformed: false,
        anatomicalMeasurementClaimed: false,
        traditionalSemanticAuthority: false,
      },
    },
    execution: {
      captureTriggerSource: 'explicit_operator_async_iterable_only',
      automaticTriggerSynthesisApplied: false,
      triggerReorderingApplied: false,
      automaticFrameSelectionApplied: false,
      automaticPoseFilteringApplied: false,
      automaticCaptureQualityFilteringApplied: false,
    },
    sourceBoundary: {
      mesh6HFrameSourceUsedForEverySweep: true,
      activeMesh6GSessionIssued: true,
      externalPrebuiltMesh6GSessionAccepted: false,
      controllerCreatesRawCaptureCopy: false,
    },
    privacyBoundary: {
      rawImageIncludedInControllerResult: false,
      rawVideoIncludedInControllerResult: false,
      rawProviderResponseIncludedInControllerResult: false,
      rawLandmarkSetIncludedInControllerResult: false,
      derivedFullFaceMetricGeometryIncludedInControllerResult: false,
      faceEmbeddingIncludedInControllerResult: false,
      identityTemplateIncludedInControllerResult: false,
    },
    authorityBoundary: {
      controllerExecutionMeansIndependentFreshnessProof: false,
      controllerExecutionMeansIdentityProof: false,
      controllerExecutionMeansEmpiricalRepeatabilityEstablished: false,
      controllerExecutionMeansCaptureQualityValidated: false,
      controllerExecutionMeansPoseAcceptanceValidated: false,
      classificationIssued: false,
      calibrationIssued: false,
      thresholdsIssued: false,
      confidenceScoreIssued: false,
      populationNormDefined: false,
      productionMorphologyAuthorized: false,
      anatomicalMeasurementClaimed: false,
      beautyInterpretationIssued: false,
      traditionalSemanticAuthority: false,
    },
  };
}

const artifact = makeArtifact();
const sourceSha256 = createHash('sha256').update(JSON.stringify(artifact)).digest('hex');
const receipt = reviewMeshData02SessionObject({
  artifact,
  sourceSha256,
  sessionRef: 'mesh-data-02:test:session:01',
  operatorRealCaptureAttested: true,
  postData02PreregistrationAttested: true,
});

expect(receipt.schemaVersion === 'mesh-data-02-private-session-review-receipt-v1', 'receipt schema drift');
expect(receipt.issueRef === '#873', 'issue linkage drift');
expect(receipt.sourceArtifact.repositoryStored === false, 'private source artifact must remain outside repository');
expect(receipt.structuralReview.sweepCount === 3, 'sweep count review drift');
expect(receipt.structuralReview.capturedFrameCount === 15, 'frame count review drift');
expect(receipt.structuralReview.primaryEvidenceFieldCountPerSweep === 13, 'field count review drift');
expect(receipt.structuralReview.participantDerivedNumericEvidenceValuesStoredInReceipt === false, 'numeric values must not enter receipt');
expect(receipt.privacyReview.forbiddenRawBiometricMaterialPresentInArtifact === false, 'privacy review drift');
expect(receipt.authorityReview.thresholdsIssued === false, 'threshold authority drift');
expect(receipt.authorityReview.calibrationIssued === false, 'calibration authority drift');

const serialized = JSON.stringify(receipt);
for (const forbidden of ['evidenceObservations', '"value":', '"min":', '"max":', '"mean":', '"range":']) {
  expect(!serialized.includes(forbidden), 'receipt leaked participant-derived numeric evidence structure: ' + forbidden);
}

const missingField = makeArtifact();
missingField.session.dataset.sweepRecords[0].evidenceObservations.pop();
let rejectedMissingField = false;
try {
  reviewMeshData02SessionObject({
    artifact: missingField,
    sourceSha256,
    sessionRef: 'mesh-data-02:test:session:bad-field',
    operatorRealCaptureAttested: true,
    postData02PreregistrationAttested: true,
  });
} catch {
  rejectedMissingField = true;
}
expect(rejectedMissingField, 'missing frozen field must fail closed');

const privacyViolation = makeArtifact();
privacyViolation.session.dataset.privacyBoundary.rawImageStored = true;
let rejectedPrivacyViolation = false;
try {
  reviewMeshData02SessionObject({
    artifact: privacyViolation,
    sourceSha256,
    sessionRef: 'mesh-data-02:test:session:privacy',
    operatorRealCaptureAttested: true,
    postData02PreregistrationAttested: true,
  });
} catch {
  rejectedPrivacyViolation = true;
}
expect(rejectedPrivacyViolation, 'raw image privacy violation must fail closed');

const nonFinite = makeArtifact();
nonFinite.session.dataset.sweepRecords[1].evidenceObservations[2].value = Number.NaN;
let rejectedNonFinite = false;
try {
  reviewMeshData02SessionObject({
    artifact: nonFinite,
    sourceSha256,
    sessionRef: 'mesh-data-02:test:session:nonfinite',
    operatorRealCaptureAttested: true,
    postData02PreregistrationAttested: true,
  });
} catch {
  rejectedNonFinite = true;
}
expect(rejectedNonFinite, 'non-finite evidence must fail closed');

let rejectedMissingProspectiveAttestation = false;
try {
  reviewMeshData02SessionObject({
    artifact: makeArtifact(),
    sourceSha256,
    sessionRef: 'mesh-data-02:test:session:old',
    operatorRealCaptureAttested: true,
    postData02PreregistrationAttested: false,
  });
} catch {
  rejectedMissingProspectiveAttestation = true;
}
expect(rejectedMissingProspectiveAttestation, 'pre-DATA-02 or unattested session must fail closed');

process.stdout.write(JSON.stringify({
  status: 'MESH_DATA_02_PRIVATE_SESSION_REVIEW_TOOL_PASS',
  syntheticMechanicsOnly: true,
  zeroPrimaryValueAcceptedWithoutSelection: true,
  missingFrozenFieldFailsClosed: true,
  privacyViolationFailsClosed: true,
  nonFinitePrimaryValueFailsClosed: true,
  postData02TimingAttestationRequired: true,
  participantDerivedNumericValuesRetainedInReceipt: false,
  thresholdOrCalibrationAuthorityIssued: false,
}) + '\n');
