import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stdout } from "node:process";

const canonicalManifest = JSON.parse(
  readFileSync("packages/face-reading/assets/canonical-face/mediapipe-v0.10.35.manifest.json", "utf8"),
);
const regionSpec = JSON.parse(
  readFileSync("packages/face-reading/assets/canonical-face/myeongha-physical-regions-v0.1.json", "utf8"),
);

assert.equal(regionSpec.schemaVersion, "mesh2-physical-region-rules-v1");
assert.equal(regionSpec.assetId, canonicalManifest.assetId);
assert.equal(regionSpec.status, "authoring_surface_v0");
assert.equal(canonicalManifest.canonicalTopology.vertexCount, 468);
assert.equal(regionSpec.coordinateSpace.unit, canonicalManifest.canonicalTopology.coordinateUnit);
assert.equal(regionSpec.coordinateSpace.semanticSideAssignment, false);
assert.equal(regionSpec.policy.runtimeBlenderDependency, false);
assert.equal(regionSpec.policy.productionRegionAuthorized, false);
assert.equal(regionSpec.policy.productionMetricAuthorized, false);
assert.equal(regionSpec.policy.traditionalInterpretationAuthorized, false);
assert.equal(regionSpec.policy.overlapAllowed, true);

const expectedRegionIds = [
  "forehead",
  "temple_negative_x",
  "temple_positive_x",
  "zygoma_negative_x",
  "zygoma_positive_x",
  "cheek_negative_x",
  "cheek_positive_x",
  "jaw_negative_x",
  "jaw_positive_x",
  "chin",
  "nose",
];
const actualRegionIds = regionSpec.regions.map((region) => region.id);
assert.deepEqual(actualRegionIds, expectedRegionIds);
assert.equal(new Set(actualRegionIds).size, actualRegionIds.length);

for (const region of regionSpec.regions) {
  assert.ok(region.label.length > 0, `Missing label for ${region.id}`);
  assert.ok(Number.isInteger(region.renderPriority), `Invalid render priority for ${region.id}`);
  assert.equal(region.displayColorRgba.length, 4, `Invalid display color for ${region.id}`);
  assert.ok(Object.keys(region.rule).length > 0, `Missing region rule for ${region.id}`);
}

const expectedPairs = [
  ["temple_negative_x", "temple_positive_x"],
  ["zygoma_negative_x", "zygoma_positive_x"],
  ["cheek_negative_x", "cheek_positive_x"],
  ["jaw_negative_x", "jaw_positive_x"],
];
assert.deepEqual(
  regionSpec.bilateralPairs.map((pair) => [pair.negativeX, pair.positiveX]),
  expectedPairs,
);

const regionById = new Map(regionSpec.regions.map((region) => [region.id, region]));
for (const [negativeId, positiveId] of expectedPairs) {
  const negativeRule = regionById.get(negativeId).rule;
  const positiveRule = regionById.get(positiveId).rule;
  assert.equal(negativeRule.xMin, -positiveRule.xMax, `xMin mirror mismatch for ${negativeId}`);
  assert.equal(negativeRule.xMax, -positiveRule.xMin, `xMax mirror mismatch for ${negativeId}`);
  for (const axisBound of ["yMin", "yMax", "zMin", "zMax"]) {
    assert.equal(negativeRule[axisBound], positiveRule[axisBound], `${axisBound} mismatch for ${negativeId}`);
  }
}

assert.deepEqual(regionSpec.seedExpectations, [
  { index: 234, mustBelongTo: "zygoma_negative_x" },
  { index: 454, mustBelongTo: "zygoma_positive_x" },
]);

stdout.write(
  `${JSON.stringify({
    status: "pass",
    contract: regionSpec.schemaVersion,
    assetId: regionSpec.assetId,
    regionCount: regionSpec.regions.length,
    bilateralPairCount: regionSpec.bilateralPairs.length,
  })}\n`,
);
