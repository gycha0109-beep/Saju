import process from 'node:process';

import {
  MESH6E_NEXT_FRONTIER,
  MESH6E_PRIMARY_EVIDENCE_FIELDS,
  admitMesh6EProspectiveSweepManifest,
  assertIssuedMesh6EProspectiveSweepManifest,
  getMesh6EProspectiveCalibrationProtocol,
  summarizeMesh6EProspectiveEvidenceValues,
} from '../.face-reading-dist/mesh6e-prospective-real-capture-calibration-protocol.js';

const protocol = getMesh6EProspectiveCalibrationProtocol();

if (
  protocol.schemaVersion !== 'mesh6e-prospective-real-capture-calibration-protocol-v1'
  || protocol.authorityState !== 'prospective_protocol_preregistered_no_fresh_capture_evidence_collected'
  || protocol.predecessor.requiredMesh6DSchemaVersion !== 'mesh6d-multi-frame-pose-sweep-evidence-v1'
  || protocol.predecessor.requiredMesh6DArtifactVersion !== '0.1.0'
  || protocol.predecessor.requiredMesh6DAuthorityState !== 'threshold_free_multi_frame_pose_morphology_evidence_only'
  || protocol.predecessor.realRepeatedCaptureEvidenceRequiredBeforeAcceptableRangeOrProductionAdmission !== true
  || protocol.preregistration.primaryEvidenceFieldCount !== 13
  || protocol.preregistration.primaryEvidenceFields !== MESH6E_PRIMARY_EVIDENCE_FIELDS
  || protocol.preregistration.currentDevelopmentCapturesEligible !== false
  || protocol.preregistration.retrospectiveDevelopmentCapturePromotionAllowed !== false
  || protocol.preregistration.numericMorphologyRepeatabilityAcceptanceThreshold !== null
  || protocol.preregistration.numericCaptureQualityThreshold !== null
  || protocol.preregistration.numericPoseAcceptanceThreshold !== null
  || protocol.preregistration.confidenceThreshold !== null
  || protocol.descriptiveAnalysis.repeatabilityPassFailIssued !== false
  || protocol.descriptiveAnalysis.captureSensitivityPassFailIssued !== false
  || protocol.descriptiveAnalysis.poseAcceptancePassFailIssued !== false
  || protocol.descriptiveAnalysis.captureQualityScoreIssued !== false
  || protocol.descriptiveAnalysis.confidenceScoreIssued !== false
  || protocol.descriptiveAnalysis.populationNormDefined !== false
  || protocol.verificationBoundary.syntheticVerifierValuesAllowedForMechanicsOnly !== true
  || protocol.verificationBoundary.verifierValuesMeanEmpiricalFreshCaptureEvidence !== false
  || protocol.verificationBoundary.verifierValuesMeanRepeatabilityEstablished !== false
  || protocol.verificationBoundary.verifierValuesMeanCaptureQualityValidated !== false
  || protocol.verificationBoundary.verifierValuesMeanProductionAdmissionCalibrated !== false
  || protocol.authorityBoundary.freshnessAttestationMeansIndependentFreshnessProof !== false
  || protocol.authorityBoundary.sameParticipantSeriesAttestationMeansIdentityMatching !== false
  || protocol.authorityBoundary.descriptiveRepeatabilityMeansEmpiricalRepeatabilityEstablished !== false
  || protocol.authorityBoundary.descriptiveCaptureSensitivityMeansCaptureQualityValidated !== false
  || protocol.authorityBoundary.frontalClassificationIssued !== false
  || protocol.authorityBoundary.threeQuarterClassificationIssued !== false
  || protocol.authorityBoundary.profileClassificationIssued !== false
  || protocol.authorityBoundary.calibrationIssued !== false
  || protocol.authorityBoundary.thresholdsIssued !== false
  || protocol.authorityBoundary.productionMorphologyAuthorized !== false
  || protocol.authorityBoundary.anatomicalMeasurementClaimed !== false
  || protocol.authorityBoundary.constructValidity !== 'unresolved'
  || protocol.authorityBoundary.traditionalBinding !== 'unresolved'
  || protocol.execution.empiricalFreshCaptureRecordsBundledAtDefinitionTime !== 0
  || protocol.execution.empiricalRepeatabilityEstablished !== false
  || protocol.execution.captureQualityValidated !== false
  || protocol.execution.numericMorphologyRepeatabilityAcceptanceThreshold !== null
  || protocol.execution.numericCaptureQualityThreshold !== null
  || protocol.execution.numericPoseAcceptanceThreshold !== null
  || protocol.execution.confidenceThreshold !== null
  || protocol.execution.productionMorphologyAuthorized !== false
  || protocol.execution.traditionalSemanticAuthority !== false
  || protocol.nextFrontier !== MESH6E_NEXT_FRONTIER
) throw new Error('MESH6E prospective calibration protocol authority boundary drift.');

const expectedEvidenceFields = [
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
];
if (JSON.stringify(protocol.preregistration.primaryEvidenceFields) !== JSON.stringify(expectedEvidenceFields)) {
  throw new Error('MESH6E preregistered evidence field set/order drift.');
}

const manifest = admitMesh6EProspectiveSweepManifest({
  prospectiveCollectionRef: 'verifier:mesh6e:collection',
  captureSeriesRef: 'verifier:mesh6e:series',
  sweepRef: 'verifier:mesh6e:sweep:1',
  captureConditionRef: 'verifier:mesh6e:condition:baseline',
  sweepSequenceIndex: 1,
  postPreregistrationFreshCaptureAttested: true,
  sameParticipantSeriesAttested: true,
  usedForCandidateSelection: false,
  developmentCaptureReuse: false,
  identityMatchingPerformed: false,
});
assertIssuedMesh6EProspectiveSweepManifest(manifest);

if (
  manifest.authorityState !== 'prospective_sweep_manifest_only_no_empirical_calibration'
  || manifest.identityBoundary.captureSeriesRefMeansIdentityMatch !== false
  || manifest.identityBoundary.externalIdentityResolutionAllowed !== false
  || manifest.identityBoundary.biometricTemplateIssued !== false
  || manifest.calibrationBoundary.manifestMeansFreshCaptureIndependentlyVerified !== false
  || manifest.calibrationBoundary.manifestMeansRepeatabilityEstablished !== false
  || manifest.calibrationBoundary.manifestMeansCaptureQualityValidated !== false
  || manifest.calibrationBoundary.manifestMeansProductionAdmission !== false
  || manifest.traditionalSemanticAuthority !== false
) throw new Error('MESH6E admitted manifest authority boundary drift.');

const summary = summarizeMesh6EProspectiveEvidenceValues(
  'morphologyRepeatability.observables.zygomaticSpanRatio.mad',
  [0.01, 0.012, 0.008],
);
if (
  summary.count !== 3
  || summary.min !== 0.008
  || summary.max !== 0.012
  || Math.abs(summary.mean - 0.01) > 1e-15
  || Math.abs(summary.range - 0.004) > 1e-15
  || summary.evaluationState !== 'descriptive_only_no_calibration_adjudication'
  || summary.repeatabilityPassFailIssued !== false
  || summary.captureSensitivityPassFailIssued !== false
  || summary.poseAcceptanceApplied !== false
  || summary.captureQualityThresholdApplied !== false
  || summary.calibrationApplied !== false
  || summary.productionAdmissionApplied !== false
  || summary.traditionalBindingApplied !== false
) throw new Error('MESH6E descriptive evidence summary authority boundary drift.');

function expectManifestRejection(overrides, context) {
  let rejected = false;
  try {
    admitMesh6EProspectiveSweepManifest({
      prospectiveCollectionRef: 'verifier:mesh6e:collection',
      captureSeriesRef: 'verifier:mesh6e:series',
      sweepRef: `verifier:mesh6e:${context}`,
      captureConditionRef: 'verifier:mesh6e:condition:baseline',
      sweepSequenceIndex: 2,
      postPreregistrationFreshCaptureAttested: true,
      sameParticipantSeriesAttested: true,
      usedForCandidateSelection: false,
      developmentCaptureReuse: false,
      identityMatchingPerformed: false,
      ...overrides,
    });
  } catch {
    rejected = true;
  }
  if (!rejected) throw new Error(`MESH6E must reject ${context}.`);
}

expectManifestRejection({ postPreregistrationFreshCaptureAttested: false }, 'non-fresh capture');
expectManifestRejection({ sameParticipantSeriesAttested: false }, 'missing same-participant attestation');
expectManifestRejection({ usedForCandidateSelection: true }, 'candidate-selection capture');
expectManifestRejection({ developmentCaptureReuse: true }, 'development-capture reuse');
expectManifestRejection({ identityMatchingPerformed: true }, 'identity matching');
expectManifestRejection({ sweepSequenceIndex: 0 }, 'non-positive sweep sequence index');

let unsupportedFieldRejected = false;
try {
  summarizeMesh6EProspectiveEvidenceValues('poseSweep.lateralOrientationRadians.mean', [0.1]);
} catch {
  unsupportedFieldRejected = true;
}
if (!unsupportedFieldRejected) throw new Error('MESH6E must reject non-preregistered evidence fields.');

let nonFiniteRejected = false;
try {
  summarizeMesh6EProspectiveEvidenceValues('poseSweep.lateralOrientationRadians.span', [Number.NaN]);
} catch {
  nonFiniteRejected = true;
}
if (!nonFiniteRejected) throw new Error('MESH6E must reject non-finite descriptive evidence values.');

process.stdout.write(`${JSON.stringify({
  status: 'MESH6E_PROSPECTIVE_REAL_CAPTURE_CALIBRATION_PROTOCOL_PASS',
  primaryEvidenceFieldCount: protocol.preregistration.primaryEvidenceFieldCount,
  empiricalFreshCaptureRecordsBundledAtDefinitionTime: protocol.execution.empiricalFreshCaptureRecordsBundledAtDefinitionTime,
  numericMorphologyRepeatabilityAcceptanceThreshold: protocol.execution.numericMorphologyRepeatabilityAcceptanceThreshold,
  numericCaptureQualityThreshold: protocol.execution.numericCaptureQualityThreshold,
  numericPoseAcceptanceThreshold: protocol.execution.numericPoseAcceptanceThreshold,
  productionMorphologyAuthorized: protocol.execution.productionMorphologyAuthorized,
  developmentCaptureReuseRejected: true,
  identityMatchingRejected: true,
  unsupportedEvidenceFieldRejected: unsupportedFieldRejected,
  nonFiniteRejected,
  nextFrontier: protocol.nextFrontier,
})}\n`);
