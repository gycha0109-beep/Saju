import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

export const MESH_DATA_02_FROZEN_PRIMARY_FIELDS = Object.freeze([
  'poseSweep.lateralOrientationRadians.span',
  'poseSweep.verticalOrientationRadians.span',
  'poseSweep.relativeRotationFromFirstFrameRadians.max',
  'morphologyRepeatability.observables.zygomaticSpanRatio.mad',
  'morphologyRepeatability.observables.zygomaticSpanRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.zygomaticTemporalFlareRatio.mad',
  'morphologyRepeatability.observables.zygomaticTemporalFlareRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.mad',
  'morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.mad',
  'morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.zygomaticRelativeDepthRatio.mad',
  'morphologyRepeatability.observables.zygomaticRelativeDepthRatio.robustSpanP10P90',
]);

function fail(message) {
  throw new Error('MESH-DATA-02 ' + message);
}

function expect(condition, message) {
  if (!condition) fail(message);
}

function expectFalse(value, label) {
  expect(value === false, label + ' must remain false.');
}

function expectNull(value, label) {
  expect(value === null, label + ' must remain null.');
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function exactFieldSet(observations) {
  expect(Array.isArray(observations), 'evidenceObservations must be an array.');
  expect(
    observations.length === MESH_DATA_02_FROZEN_PRIMARY_FIELDS.length,
    'each sweep must contain exactly 13 preregistered observations.',
  );
  const names = observations.map((entry) => entry?.evidenceField);
  expect(new Set(names).size === names.length, 'evidence fields must not be duplicated.');
  const sortedActual = [...names].sort();
  const sortedExpected = [...MESH_DATA_02_FROZEN_PRIMARY_FIELDS].sort();
  expect(sameJson(sortedActual, sortedExpected), 'frozen 13-field set drift.');
  for (const entry of observations) {
    expect(Number.isFinite(entry?.value), 'every primary evidence value must be finite.');
    expectFalse(entry.classificationApplied, 'classificationApplied');
    expectFalse(entry.calibrationApplied, 'calibrationApplied');
    expectFalse(entry.thresholdApplied, 'thresholdApplied');
    expectFalse(entry.productionAdmissionApplied, 'productionAdmissionApplied');
    expectFalse(entry.identityMatchingApplied, 'identityMatchingApplied');
    expectFalse(entry.traditionalBindingApplied, 'traditionalBindingApplied');
  }
}

function validatePrivacy(artifact) {
  const datasetPrivacy = artifact.session.dataset.privacyBoundary;
  for (const key of [
    'rawImageStored',
    'rawVideoStored',
    'rawProviderResponseStored',
    'rawLandmarkSetStored',
    'derivedFullFaceMetricGeometryStored',
    'faceEmbeddingStored',
    'identityTemplateStored',
  ]) {
    expectFalse(datasetPrivacy?.[key], 'dataset privacy ' + key);
  }

  const sessionPrivacy = artifact.session.privacyBoundary;
  for (const key of [
    'rawImageIncludedInSessionArtifact',
    'rawVideoIncludedInSessionArtifact',
    'rawProviderResponseIncludedInSessionArtifact',
    'rawLandmarkSetIncludedInSessionArtifact',
    'derivedFullFaceMetricGeometryIncludedInSessionArtifact',
    'faceEmbeddingIncludedInSessionArtifact',
    'identityTemplateIncludedInSessionArtifact',
  ]) {
    expectFalse(sessionPrivacy?.[key], 'session privacy ' + key);
  }

  const controllerPrivacy = artifact.privacyBoundary;
  for (const key of [
    'rawImageIncludedInControllerResult',
    'rawVideoIncludedInControllerResult',
    'rawProviderResponseIncludedInControllerResult',
    'rawLandmarkSetIncludedInControllerResult',
    'derivedFullFaceMetricGeometryIncludedInControllerResult',
    'faceEmbeddingIncludedInControllerResult',
    'identityTemplateIncludedInControllerResult',
  ]) {
    expectFalse(controllerPrivacy?.[key], 'controller privacy ' + key);
  }
}

function validateAuthority(artifact) {
  const datasetExecution = artifact.session.dataset.execution;
  expectFalse(datasetExecution.empiricalRepeatabilityEstablished, 'empiricalRepeatabilityEstablished');
  expectFalse(datasetExecution.captureQualityValidated, 'captureQualityValidated');
  expectFalse(datasetExecution.poseAcceptanceValidated, 'poseAcceptanceValidated');
  expectFalse(datasetExecution.populationNormDefined, 'populationNormDefined');
  expectFalse(datasetExecution.productionMorphologyAuthorized, 'productionMorphologyAuthorized');
  expectNull(datasetExecution.numericMorphologyRepeatabilityAcceptanceThreshold, 'numericMorphologyRepeatabilityAcceptanceThreshold');
  expectNull(datasetExecution.numericCaptureQualityThreshold, 'numericCaptureQualityThreshold');
  expectNull(datasetExecution.numericPoseAcceptanceThreshold, 'numericPoseAcceptanceThreshold');
  expectNull(datasetExecution.confidenceThreshold, 'confidenceThreshold');

  const datasetAuthority = artifact.session.dataset.authorityBoundary;
  for (const key of [
    'datasetMaterializationMeansEmpiricalRepeatabilityEstablished',
    'descriptiveSeriesSummaryMeansRepeatabilityPass',
    'descriptiveConditionSummaryMeansCaptureQualityValidated',
    'descriptivePoseSummaryMeansPoseAcceptanceValidated',
    'betweenSeriesIdentityInferenceAllowed',
    'sameDifferentParticipantClassificationAllowed',
    'calibrationIssued',
    'thresholdsIssued',
    'productionAdmissionIssued',
    'anatomicalMeasurementClaimed',
  ]) {
    expectFalse(datasetAuthority?.[key], 'dataset authority ' + key);
  }

  const sessionAuthority = artifact.session.authorityBoundary;
  for (const key of [
    'sessionMaterializationMeansEmpiricalRepeatabilityEstablished',
    'sessionMaterializationMeansCaptureQualityValidated',
    'sessionMaterializationMeansPoseAcceptanceValidated',
    'classificationIssued',
    'calibrationIssued',
    'thresholdsIssued',
    'confidenceScoreIssued',
    'populationNormDefined',
    'productionMorphologyAuthorized',
    'identityMatchingPerformed',
    'anatomicalMeasurementClaimed',
    'traditionalSemanticAuthority',
  ]) {
    expectFalse(sessionAuthority?.[key], 'session authority ' + key);
  }

  const controllerAuthority = artifact.authorityBoundary;
  for (const key of [
    'controllerExecutionMeansIndependentFreshnessProof',
    'controllerExecutionMeansIdentityProof',
    'controllerExecutionMeansEmpiricalRepeatabilityEstablished',
    'controllerExecutionMeansCaptureQualityValidated',
    'controllerExecutionMeansPoseAcceptanceValidated',
    'classificationIssued',
    'calibrationIssued',
    'thresholdsIssued',
    'confidenceScoreIssued',
    'populationNormDefined',
    'productionMorphologyAuthorized',
    'anatomicalMeasurementClaimed',
    'beautyInterpretationIssued',
    'traditionalSemanticAuthority',
  ]) {
    expectFalse(controllerAuthority?.[key], 'controller authority ' + key);
  }
}

export function reviewMeshData02SessionObject({
  artifact,
  sourceSha256,
  sessionRef,
  operatorRealCaptureAttested,
  postData02PreregistrationAttested,
}) {
  expect(artifact !== null && typeof artifact === 'object', 'artifact must be an object.');
  expect(/^[0-9a-f]{64}$/.test(sourceSha256), 'sourceSha256 must be a lowercase SHA-256 digest.');
  expect(typeof sessionRef === 'string' && sessionRef.trim().length > 0, 'sessionRef must be non-empty.');
  expect(operatorRealCaptureAttested === true, 'operator real-capture attestation is required.');
  expect(postData02PreregistrationAttested === true, 'post-DATA-02 preregistration attestation is required.');

  expect(
    artifact.schemaVersion === 'mesh6i-manual-browser-capture-controller-result-v1',
    'controller schema drift.',
  );
  expect(
    artifact.session?.schemaVersion === 'mesh6g-prospective-operator-capture-session-v1',
    'session schema drift.',
  );
  expect(
    artifact.session?.dataset?.schemaVersion === 'mesh6f-prospective-sweep-acquisition-dataset-v1',
    'dataset schema drift.',
  );
  expect(
    artifact.session?.dataset?.authorityState === 'prospective_mesh6d_observation_dataset_descriptive_only',
    'dataset descriptive authority drift.',
  );

  const dataset = artifact.session.dataset;
  const sweeps = dataset.sweepRecords;
  expect(Array.isArray(sweeps) && sweeps.length === 3, 'exactly 3 sweep records are required.');
  expect(artifact.session.execution?.sweepCount === 3, 'session sweepCount must be 3.');
  expect(artifact.session.execution?.capturedFrameCount === 15, 'session capturedFrameCount must be 15.');
  expect(dataset.observedSweepCount === 3, 'dataset observedSweepCount must be 3.');
  expect(dataset.observedCaptureSeriesCount === 1, 'dataset must contain one capture series.');
  expect(dataset.observedCaptureConditionCount === 1, 'dataset must contain one capture condition.');

  const sweepRefs = sweeps.map((record) => record.sweepRef);
  expect(new Set(sweepRefs).size === 3, 'sweep refs must be unique.');
  expect(
    sameJson(sweeps.map((record) => record.sweepSequenceIndex), [1, 2, 3]),
    'sweep sequence indices must be 1,2,3.',
  );

  const eligibilityStates = new Set(sweeps.map((record) => record.prospectiveEligibilityState));
  expect(
    eligibilityStates.size === 1
      && eligibilityStates.has('mesh6e_attestations_accepted_not_independently_verified'),
    'prospective eligibility state drift.',
  );

  for (const sweep of sweeps) exactFieldSet(sweep.evidenceObservations);

  const provenance = sweeps[0].provenance;
  expect(
    sweeps.every((record) => sameJson(record.provenance, provenance)),
    'geometry/adapter provenance must be consistent within the session.',
  );

  const collectionRefs = new Set(sweeps.map((record) => record.prospectiveCollectionRef));
  const seriesRefs = new Set(sweeps.map((record) => record.captureSeriesRef));
  const conditionRefs = new Set(sweeps.map((record) => record.captureConditionRef));
  expect(collectionRefs.size === 1, 'one collection ref is required per session.');
  expect(seriesRefs.size === 1, 'one capture-series ref is required per session.');
  expect(conditionRefs.size === 1, 'one condition ref is required per session.');

  expect(artifact.execution?.captureTriggerSource === 'explicit_operator_async_iterable_only', 'capture trigger source drift.');
  expectFalse(artifact.execution?.automaticTriggerSynthesisApplied, 'automaticTriggerSynthesisApplied');
  expectFalse(artifact.execution?.triggerReorderingApplied, 'triggerReorderingApplied');
  expectFalse(artifact.execution?.automaticFrameSelectionApplied, 'automaticFrameSelectionApplied');
  expectFalse(artifact.execution?.automaticPoseFilteringApplied, 'automaticPoseFilteringApplied');
  expectFalse(artifact.execution?.automaticCaptureQualityFilteringApplied, 'automaticCaptureQualityFilteringApplied');
  expect(artifact.sourceBoundary?.mesh6HFrameSourceUsedForEverySweep === true, 'MESH6H frame source must be used for every sweep.');
  expect(artifact.sourceBoundary?.activeMesh6GSessionIssued === true, 'an active MESH6G session must be issued.');
  expectFalse(artifact.sourceBoundary?.externalPrebuiltMesh6GSessionAccepted, 'externalPrebuiltMesh6GSessionAccepted');
  expectFalse(artifact.sourceBoundary?.controllerCreatesRawCaptureCopy, 'controllerCreatesRawCaptureCopy');

  validatePrivacy(artifact);
  validateAuthority(artifact);

  return Object.freeze({
    schemaVersion: 'mesh-data-02-private-session-review-receipt-v1',
    artifactVersion: '0.1.0',
    issueRef: '#873',
    sessionRef: sessionRef.trim(),
    sourceArtifact: Object.freeze({
      repositoryStored: false,
      sha256: sourceSha256,
      controllerSchemaVersion: artifact.schemaVersion,
      sessionSchemaVersion: artifact.session.schemaVersion,
      datasetSchemaVersion: dataset.schemaVersion,
      eligibilityState: 'mesh6e_attestations_accepted_not_independently_verified',
      realBrowserCameraCaptureOperatorAttested: true,
      capturedAfterData02PreregistrationOperatorAttested: true,
      freshnessIndependentlyProven: false,
      sameParticipantIdentityIndependentlyProven: false,
    }),
    grouping: Object.freeze({
      prospectiveCollectionRef: [...collectionRefs][0],
      captureSeriesRef: [...seriesRefs][0],
      captureConditionRef: [...conditionRefs][0],
    }),
    provenance: Object.freeze({
      coordinateFrame: provenance.coordinateFrame,
      unit: provenance.unit,
      canonicalAssetDigest: provenance.canonicalAssetDigest,
      releaseCommit: provenance.releaseCommit,
      geometryMetadataBlobSha: provenance.geometryMetadataBlobSha,
      adapterSchemaVersion: provenance.adapterSchemaVersion,
      adapterSourceAssetId: provenance.adapterSourceAssetId,
      adapterTargetAssetId: provenance.adapterTargetAssetId,
      adapterTargetVertexCount: provenance.adapterTargetVertexCount,
      adapterRegionCount: provenance.adapterRegionCount,
      adapterMembershipEdgeCount: provenance.adapterMembershipEdgeCount,
    }),
    structuralReview: Object.freeze({
      sweepCount: 3,
      capturedFrameCount: 15,
      primaryEvidenceFieldCountPerSweep: 13,
      frozenPrimaryFieldSetPresentInEverySweep: true,
      allPrimaryEvidenceValuesFinite: true,
      uniqueSweepRefs: true,
      sweepSequenceIndices: Object.freeze([1, 2, 3]),
      provenanceConsistentWithinSession: true,
      participantDerivedNumericEvidenceValuesStoredInReceipt: false,
    }),
    frozenPrimaryEvidenceFields: MESH_DATA_02_FROZEN_PRIMARY_FIELDS,
    privacyReview: Object.freeze({
      forbiddenRawBiometricMaterialPresentInArtifact: false,
      participantDerivedNumericEvidenceValuesStoredInRepository: false,
    }),
    authorityReview: Object.freeze({
      empiricalRepeatabilityEstablished: false,
      repeatabilityPassFailIssued: false,
      captureQualityValidated: false,
      poseAcceptanceValidated: false,
      calibrationIssued: false,
      thresholdsIssued: false,
      confidenceScoreIssued: false,
      populationNormDefined: false,
      productionMorphologyAuthorized: false,
      identityMatchingPerformed: false,
      anatomicalMeasurementClaimed: false,
      traditionalSemanticAuthorityIssued: false,
    }),
  });
}

export function reviewMeshData02SessionBytes({
  bytes,
  sessionRef,
  operatorRealCaptureAttested,
  postData02PreregistrationAttested,
}) {
  const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  let artifact;
  try {
    artifact = JSON.parse(buffer.toString('utf8'));
  } catch (error) {
    fail('source artifact is not valid UTF-8 JSON: ' + (error instanceof Error ? error.message : String(error)));
  }
  const sourceSha256 = createHash('sha256').update(buffer).digest('hex');
  return reviewMeshData02SessionObject({
    artifact,
    sourceSha256,
    sessionRef,
    operatorRealCaptureAttested,
    postData02PreregistrationAttested,
  });
}

function parseCli(argv) {
  const positional = [];
  let sessionRef = null;
  let operatorRealCaptureAttested = false;
  let postData02PreregistrationAttested = false;

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--session-ref') {
      sessionRef = argv[index + 1] ?? null;
      index += 1;
    } else if (token === '--operator-real-capture-attested') {
      operatorRealCaptureAttested = true;
    } else if (token === '--post-data02-preregistration-attested') {
      postData02PreregistrationAttested = true;
    } else {
      positional.push(token);
    }
  }

  if (positional.length !== 1 || sessionRef === null) {
    fail(
      'usage: node scripts/review-face-geometry-mesh-data-02-session.mjs <artifact.json> '
      + '--session-ref <protocol-local-ref> --operator-real-capture-attested '
      + '--post-data02-preregistration-attested',
    );
  }

  return Object.freeze({
    path: positional[0],
    sessionRef,
    operatorRealCaptureAttested,
    postData02PreregistrationAttested,
  });
}

const invokedPath = process.argv[1] === undefined ? null : pathToFileURL(process.argv[1]).href;
if (invokedPath === import.meta.url) {
  try {
    const options = parseCli(process.argv.slice(2));
    const receipt = reviewMeshData02SessionBytes({
      bytes: readFileSync(options.path),
      sessionRef: options.sessionRef,
      operatorRealCaptureAttested: options.operatorRealCaptureAttested,
      postData02PreregistrationAttested: options.postData02PreregistrationAttested,
    });
    process.stdout.write(JSON.stringify(receipt, null, 2) + '\n');
  } catch (error) {
    process.stderr.write((error instanceof Error ? error.message : String(error)) + '\n');
    process.exitCode = 1;
  }
}
