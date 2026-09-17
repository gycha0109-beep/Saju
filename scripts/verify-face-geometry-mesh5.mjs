import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { stdout } from "node:process";

const policyPath = "packages/face-geometry/assets/bridge/gnm-to-mediapipe468-region-projection-v1.json";
const policy = JSON.parse(readFileSync(policyPath, "utf8"));

assert.equal(policy.schemaVersion, "face-geometry-mediapipe468-region-projection-policy-v1");
assert.equal(policy.status, "offline_authoring_candidate");
assert.equal(policy.source.assetId, "google-gnm-head-v3.0-fe31d4e");
assert.equal(policy.source.regionOntology, "gnm-provider-region-ontology-v1");
assert.equal(policy.target.assetId, "mediapipe-canonical-face-v0.10.35");
assert.equal(policy.target.topologyVertexCount, 468);
assert.equal(policy.target.coordinateUnit, "centimeter");

assert.equal(
  policy.registration.method,
  "canonical_axis_robust_affine_then_nearest_provider_region_vertex_v1",
);
assert.equal(policy.registration.sourceQuantileLow, 0.02);
assert.equal(policy.registration.sourceQuantileHigh, 0.98);
assert.equal(policy.registration.preserveCanonicalAxisSigns, true);
assert.equal(policy.registration.mediapipeUnitConversionToMeter, 0.01);
assert.equal(policy.registration.productionDistanceThreshold, null);
assert.equal(policy.registration.subjectSpecificFitting, false);

assert.equal(
  policy.assignment.primaryRegionSelection,
  "nearest_gnm_face_region_vertex_then_render_priority",
);
assert.equal(policy.assignment.bilateralAdapterNaming, "canonical_x_axis");
assert.equal(policy.assignment.semanticSideAssignmentEncoded, false);
assert.equal(policy.assignment.allProjectedDistancesRetained, true);

assert.deepEqual(policy.unsupportedOnMediaPipe468, ["left_ear", "right_ear"]);
assert.equal(policy.policy.productNeutral, true);
assert.equal(policy.policy.runtimeGNMDependency, false);
assert.equal(policy.policy.runtimeBlenderDependency, false);
assert.equal(policy.policy.productionMetricAuthorized, false);
assert.equal(policy.policy.productInterpretationIncluded, false);
assert.equal(policy.policy.anatomicalDiagnosticClaim, false);

for (const path of [
  "tools/face-geometry/gnm/project_gnm_regions_to_mediapipe468.py",
  "tools/face-geometry/gnm/build_mediapipe468_projected_region_scene.py",
]) {
  assert.equal(existsSync(path), true, `Missing MESH5 tool: ${path}`);
}

const serialized = JSON.stringify(policy).toLowerCase();
for (const forbidden of [
  "true_zygion",
  "anatomical_left",
  "anatomical_right",
  "beauty_score",
  "physiognomy_score",
  "fortune_score",
  "recommendation_score",
]) {
  assert.equal(serialized.includes(forbidden), false, `MESH5 policy leaked forbidden semantics: ${forbidden}`);
}

stdout.write(`${JSON.stringify({
  status: "pass",
  sourceAssetId: policy.source.assetId,
  targetAssetId: policy.target.assetId,
  targetVertexCount: policy.target.topologyVertexCount,
  unsupportedOnMediaPipe468: policy.unsupportedOnMediaPipe468,
  semanticSideAssignmentEncoded: policy.assignment.semanticSideAssignmentEncoded,
  productionDistanceThreshold: policy.registration.productionDistanceThreshold,
})}\n`);
