import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stdout } from "node:process";

const catalog = JSON.parse(
  readFileSync("packages/face-geometry/assets/regions/gnm-provider-region-ontology-v1.json", "utf8"),
);
const manifest = JSON.parse(
  readFileSync("packages/face-geometry/assets/full-head/gnm-head-v3.manifest.json", "utf8"),
);

assert.equal(catalog.schemaVersion, "face-geometry-gnm-region-ontology-v1");
assert.equal(catalog.assetId, manifest.assetId);
assert.equal(catalog.status, "provider_region_ontology_authoring");
assert.equal(catalog.threshold, 0.5);
assert.equal(catalog.policy.productNeutral, true);
assert.equal(catalog.policy.runtimeGNMDependency, false);
assert.equal(catalog.policy.runtimeBlenderDependency, false);
assert.equal(catalog.policy.productInterpretationIncluded, false);
assert.equal(catalog.policy.anatomicalDiagnosticClaim, false);

const expectedRegionIds = [
  "forehead",
  "left_brow",
  "middle_brow",
  "right_brow",
  "left_temple",
  "right_temple",
  "left_orbital",
  "right_orbital",
  "left_zygomatic",
  "right_zygomatic",
  "nose",
  "left_parotid",
  "right_parotid",
  "left_infraorbital",
  "right_infraorbital",
  "left_cheek",
  "right_cheek",
  "upper_lip",
  "lower_lip",
  "chin",
  "left_ear",
  "right_ear",
];
const actualRegionIds = catalog.regions.map((region) => region.id);
assert.deepEqual(actualRegionIds, expectedRegionIds);
assert.equal(new Set(actualRegionIds).size, expectedRegionIds.length);
assert.equal(catalog.regions.length, 22);

for (const region of catalog.regions) {
  assert.ok(region.label.length > 0, `Missing label for ${region.id}`);
  assert.ok(Number.isInteger(region.renderPriority), `Invalid render priority for ${region.id}`);
  assert.ok(["provider_vertex_group", "intersection"].includes(region.source.kind));
  if (region.source.kind === "provider_vertex_group") {
    assert.ok(region.source.providerGroup.endsWith("_region"));
  } else {
    assert.ok(region.source.providerGroups.length >= 2);
  }
}

assert.deepEqual(
  catalog.regions.find((region) => region.id === "left_ear").source,
  { kind: "intersection", providerGroups: ["ears", "left"] },
);
assert.deepEqual(
  catalog.regions.find((region) => region.id === "right_ear").source,
  { kind: "intersection", providerGroups: ["ears", "right"] },
);

const expectedPairs = [
  ["left_brow", "right_brow"],
  ["left_temple", "right_temple"],
  ["left_orbital", "right_orbital"],
  ["left_zygomatic", "right_zygomatic"],
  ["left_parotid", "right_parotid"],
  ["left_infraorbital", "right_infraorbital"],
  ["left_cheek", "right_cheek"],
  ["left_ear", "right_ear"],
];
assert.deepEqual(catalog.bilateralPairs.map((pair) => [pair.left, pair.right]), expectedPairs);

const serialized = JSON.stringify(catalog).toLowerCase();
for (const forbidden of ["beauty_score", "fortune_score", "physiognomy_score", "recommendation_score"]) {
  assert.equal(serialized.includes(forbidden), false, `Shared geometry catalog leaked product semantics: ${forbidden}`);
}

stdout.write(`${JSON.stringify({
  status: "pass",
  assetId: catalog.assetId,
  regionCount: catalog.regions.length,
  bilateralPairCount: catalog.bilateralPairs.length,
  productNeutral: catalog.policy.productNeutral,
})}\n`);
