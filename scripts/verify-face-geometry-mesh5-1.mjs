import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import process from "node:process";

const weightedPolicy = JSON.parse(
  readFileSync(
    "packages/face-geometry/assets/bridge/gnm-to-mediapipe468-weighted-region-projection-v2.json",
    "utf8",
  ),
);
const mesh5Policy = JSON.parse(
  readFileSync(
    "packages/face-geometry/assets/bridge/gnm-to-mediapipe468-region-projection-v1.json",
    "utf8",
  ),
);
const projector = readFileSync(
  "tools/face-geometry/gnm/project_gnm_regions_to_mediapipe468_weighted.py",
  "utf8",
);
const blenderBuilder = readFileSync(
  "tools/face-geometry/gnm/build_mediapipe468_weighted_region_scene.py",
  "utf8",
);

assert.equal(
  weightedPolicy.schemaVersion,
  "face-geometry-mediapipe468-weighted-region-projection-policy-v2",
);
assert.equal(weightedPolicy.status, "offline_authoring_candidate");
assert.equal(weightedPolicy.source.assetId, mesh5Policy.source.assetId);
assert.equal(weightedPolicy.target.assetId, mesh5Policy.target.assetId);
assert.equal(weightedPolicy.target.topologyVertexCount, 468);
assert.equal(weightedPolicy.assignment.hardPartition, false);
assert.equal(weightedPolicy.assignment.overlapAllowed, true);
assert.equal(weightedPolicy.assignment.unassignedAllowed, true);
assert.ok(weightedPolicy.assignment.neighborhoodVertexCount >= 2);
assert.ok(weightedPolicy.assignment.maximumRetainedMemberships >= 2);
assert.ok(weightedPolicy.assignment.minimumRetainedMembershipWeight > 0);
assert.ok(weightedPolicy.assignment.minimumRetainedMembershipWeight < 1);
assert.ok(weightedPolicy.assignment.corePrimaryWeightMin > weightedPolicy.assignment.borderPrimaryWeightMin);
assert.ok(weightedPolicy.assignment.corePrimaryMarginMin > 0);
assert.ok(weightedPolicy.assignment.outlierMadMultiplier > 0);
assert.ok(weightedPolicy.assignment.outlierCutoffFloorQuantile > 0.5);
assert.ok(weightedPolicy.assignment.outlierCutoffFloorQuantile < 1);
assert.deepEqual(weightedPolicy.unsupportedOnMediaPipe468, ["left_ear", "right_ear"]);
assert.equal(weightedPolicy.assignment.semanticSideAssignmentEncoded, false);
assert.equal(weightedPolicy.policy.productNeutral, true);
assert.equal(weightedPolicy.policy.runtimeGNMDependency, false);
assert.equal(weightedPolicy.policy.runtimeBlenderDependency, false);
assert.equal(weightedPolicy.policy.productionMetricAuthorized, false);
assert.equal(weightedPolicy.policy.productInterpretationIncluded, false);
assert.equal(weightedPolicy.policy.anatomicalDiagnosticClaim, false);
assert.equal(weightedPolicy.policy.authoringThresholdsAreProductionThresholds, false);
assert.equal(weightedPolicy.registration.productionDistanceThreshold, null);
assert.equal(weightedPolicy.registration.subjectSpecificFitting, false);

for (const requiredToken of [
  "weighted_projected_authoring_candidate",
  "diagnosticMemberships",
  "authoringOutlierCutoffM",
  "local_distance_weighted_provider_membership_vote_v2",
  '"hardPartition": False',
  '"overlapAllowed": True',
  '"unassignedAllowed": True',
]) {
  assert.ok(projector.includes(requiredToken), `Missing weighted projector contract token: ${requiredToken}`);
}
for (const forbiddenToken of [
  "must partition all MediaPipe 468 vertices",
  "must assign every MediaPipe vertex exactly once",
]) {
  assert.ok(!projector.includes(forbiddenToken), `Hard-partition assumption leaked into v2 projector: ${forbiddenToken}`);
}
for (const requiredToken of [
  "weightedVertices",
  "vertexMemberships",
  "runtimeGNMDependency",
  "runtimeBlenderDependency",
]) {
  assert.ok(blenderBuilder.includes(requiredToken), `Missing Blender weighted-adapter token: ${requiredToken}`);
}

process.stdout.write(
  `${JSON.stringify({
    status: "pass",
    schemaVersion: weightedPolicy.schemaVersion,
    hardPartition: weightedPolicy.assignment.hardPartition,
    overlapAllowed: weightedPolicy.assignment.overlapAllowed,
    unassignedAllowed: weightedPolicy.assignment.unassignedAllowed,
    unsupportedOnMediaPipe468: weightedPolicy.unsupportedOnMediaPipe468,
    productionMetricAuthorized: weightedPolicy.policy.productionMetricAuthorized,
  })}\n`,
);
