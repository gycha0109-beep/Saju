import { readFileSync } from 'node:fs';
import process from 'node:process';

const path = 'packages/face-geometry/evidence/mesh-data-01-first-real-repeated-sweep-receipt-v1.json';
const receipt = JSON.parse(readFileSync(path, 'utf8'));

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const expectedFields = [
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

expect(receipt.schemaVersion === 'mesh-data-01-real-repeated-sweep-evidence-receipt-v1', 'receipt schema drift');
expect(receipt.issueRef === '#855', 'receipt issue linkage drift');
expect(receipt.sourceArtifact.repositoryStored === false, 'source participant artifact must remain outside repository');
expect(/^[0-9a-f]{64}$/.test(receipt.sourceArtifact.sha256), 'source artifact SHA-256 must be present');
expect(receipt.sourceArtifact.eligibilityState === 'mesh6e_attestations_accepted_not_independently_verified', 'attestation authority drift');
expect(receipt.sourceArtifact.freshnessIndependentlyProven === false, 'receipt must not claim independent freshness proof');
expect(receipt.sourceArtifact.sameParticipantIdentityIndependentlyProven === false, 'receipt must not claim identity proof');

expect(receipt.review.sweepCount === 3, 'reviewed sweep count drift');
expect(receipt.review.capturedFrameCount === 15, 'reviewed explicit frame count drift');
expect(receipt.review.primaryEvidenceFieldCountPerSweep === 13, 'frozen primary field count drift');
expect(receipt.review.allSweepsContainSameFrozenFieldSet === true, 'frozen field coverage review missing');
expect(receipt.review.allPrimaryValuesFinite === true, 'finite-value structural review missing');
expect(receipt.review.allPrimaryValuesNonZero === true, 'non-zero structural review missing');
expect(receipt.review.uniqueSweepRefs === true, 'sweep ref uniqueness review missing');
expect(JSON.stringify(receipt.review.sweepSequenceIndices) === '[1,2,3]', 'sweep sequence review drift');
expect(receipt.review.provenanceConsistentAcrossSweeps === true, 'provenance consistency review missing');
expect(receipt.review.syntheticOrRepositoryFixture === false, 'synthetic fixture must not satisfy MESH-DATA-01');
expect(receipt.review.candidateSelectedCapture === false, 'candidate-selected capture must not satisfy MESH-DATA-01');
expect(receipt.review.developmentCaptureReuse === false, 'development capture reuse must remain false');
expect(receipt.review.identityMatchingPerformed === false, 'identity matching must remain false');

expect(JSON.stringify(receipt.frozenPrimaryEvidenceFields) === JSON.stringify(expectedFields), 'frozen 13-field set drift');

for (const [name, value] of Object.entries(receipt.privacyReview)) {
  expect(value === false, 'privacy boundary must remain false: ' + name);
}
for (const [name, value] of Object.entries(receipt.authorityReview)) {
  expect(value === false, 'authority must remain false: ' + name);
}

expect(receipt.completion.meshData01CompletionConditionSatisfied === true, 'MESH-DATA-01 closure condition missing');
expect(receipt.completion.nextFrontier.startsWith('MESH-DATA-02'), 'next frontier must remain MESH-DATA-02');

const serialized = JSON.stringify(receipt);
for (const forbidden of [
  'evidenceValues',
  'landmarks',
  'rawImageData',
  'rawVideoData',
  'faceEmbeddingValue',
  'identityTemplateValue',
  'repeatabilityThresholdValue',
  'captureQualityThresholdValue',
  'poseAcceptanceThresholdValue',
]) {
  expect(!serialized.includes(forbidden), 'receipt must not retain participant/raw/threshold payload: ' + forbidden);
}

process.stdout.write(JSON.stringify({
  status: 'MESH_DATA_01_EVIDENCE_RECEIPT_PASS',
  sourceArtifactRepositoryStored: false,
  digestRecorded: true,
  reviewedSweeps: 3,
  reviewedExplicitFrames: 15,
  frozenPrimaryEvidenceFieldCount: 13,
  participantDerivedNumericValuesStoredInRepository: false,
  privacyBoundaryPreserved: true,
  calibrationOrThresholdAuthorityIssued: false,
  nextFrontier: 'MESH-DATA-02',
}) + '\n');
