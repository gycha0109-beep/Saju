import process from 'node:process';

import {
  FR159_NEXT_FRONTIER,
  FR159_PERIMETER_METRIC_REF,
  FR159_X_SPAN_METRIC_REF,
  admitEyePairProspectiveCaptureManifestFR159,
  assertIssuedEyePairProspectiveCaptureManifestFR159,
  getEyePairProspectiveRepeatabilityProtocolFR159,
  summarizeEyePairProspectiveMetricValuesFR159,
} from '../.face-reading-dist/eye-pair-prospective-repeatability-protocol-fr159.js';

const protocol = getEyePairProspectiveRepeatabilityProtocolFR159();

if (
  protocol.schemaVersion !== 'fr159-eye-pair-prospective-repeatability-protocol-v1'
  || protocol.authorityState !== 'prospective_protocol_preregistered_no_fresh_capture_evidence_collected'
  || protocol.predecessor.requiredFr158NextFrontier !== 'prospective_eye_pair_metric_3d_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion'
  || protocol.preregistration.primaryMetricRefs.length !== 2
  || protocol.preregistration.primaryMetricRefs[0] !== FR159_X_SPAN_METRIC_REF
  || protocol.preregistration.primaryMetricRefs[1] !== FR159_PERIMETER_METRIC_REF
  || protocol.preregistration.currentDevelopmentCapturesEligible !== false
  || protocol.preregistration.retrospectiveDevelopmentCapturePromotionAllowed !== false
  || protocol.preregistration.numericRepeatabilityAcceptanceThreshold !== null
  || protocol.preregistration.numericCaptureQualityThreshold !== null
  || protocol.descriptiveAnalysis.repeatabilityPassFailIssued !== false
  || protocol.descriptiveAnalysis.captureSensitivityPassFailIssued !== false
  || protocol.descriptiveAnalysis.captureQualityMeasurementConstructValidated !== false
  || protocol.authorityBoundary.freshnessAttestationMeansIndependentFreshnessProof !== false
  || protocol.authorityBoundary.sameParticipantSeriesAttestationMeansIdentityMatching !== false
  || protocol.authorityBoundary.descriptiveRepeatabilityMeansEmpiricalRepeatabilityEstablished !== false
  || protocol.authorityBoundary.descriptiveCaptureSensitivityMeansCaptureQualityValidated !== false
  || protocol.authorityBoundary.constructValidity !== 'unresolved'
  || protocol.authorityBoundary.traditionalBinding !== 'unresolved'
  || protocol.execution.empiricalFreshCaptureRecordsBundledAtDefinitionTime !== 0
  || protocol.execution.empiricalRepeatabilityEstablished !== false
  || protocol.execution.captureQualityValidated !== false
  || protocol.execution.traditionalSemanticAuthority !== false
  || protocol.nextFrontier !== FR159_NEXT_FRONTIER
) throw new Error('FR159 prospective protocol authority boundary drift.');

const manifest = admitEyePairProspectiveCaptureManifestFR159({
  prospectiveCollectionRef: 'verifier:collection',
  captureSeriesRef: 'verifier:series',
  captureRef: 'verifier:capture:1',
  captureConditionRef: 'verifier:condition',
  captureSequenceIndex: 1,
  postPreregistrationFreshCaptureAttested: true,
  sameParticipantSeriesAttested: true,
  usedForCandidateSelection: false,
  developmentCaptureReuse: false,
  identityMatchingPerformed: false,
});
assertIssuedEyePairProspectiveCaptureManifestFR159(manifest);

const summary = summarizeEyePairProspectiveMetricValuesFR159(
  FR159_X_SPAN_METRIC_REF,
  [0.2, 0.21, 0.22],
);
if (
  summary.evaluationState !== 'descriptive_only_no_repeatability_adjudication'
  || summary.acceptanceThresholdApplied !== false
  || summary.captureQualityThresholdApplied !== false
  || summary.classificationApplied !== false
  || summary.calibrationApplied !== false
  || summary.traditionalBindingApplied !== false
) throw new Error('FR159 descriptive-statistic authority boundary drift.');

let developmentReuseRejected = false;
try {
  admitEyePairProspectiveCaptureManifestFR159({
    prospectiveCollectionRef: 'verifier:collection',
    captureSeriesRef: 'verifier:series',
    captureRef: 'verifier:development-capture',
    captureConditionRef: 'verifier:condition',
    captureSequenceIndex: 2,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: true,
    identityMatchingPerformed: false,
  });
} catch {
  developmentReuseRejected = true;
}
if (!developmentReuseRejected) throw new Error('FR159 must reject development-capture reuse.');

process.stdout.write(`${JSON.stringify({
  status: 'FR159_PROSPECTIVE_REPEATABILITY_PROTOCOL_PASS',
  primaryMetricRefs: protocol.preregistration.primaryMetricRefs,
  empiricalFreshCaptureRecordsBundledAtDefinitionTime: protocol.execution.empiricalFreshCaptureRecordsBundledAtDefinitionTime,
  empiricalRepeatabilityEstablished: protocol.execution.empiricalRepeatabilityEstablished,
  captureQualityValidated: protocol.execution.captureQualityValidated,
  numericRepeatabilityAcceptanceThreshold: protocol.execution.numericRepeatabilityAcceptanceThreshold,
  developmentReuseRejected,
  nextFrontier: protocol.nextFrontier,
})}\n`);
