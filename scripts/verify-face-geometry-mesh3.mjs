import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stdout } from "node:process";

const manifest = JSON.parse(readFileSync("packages/face-geometry/assets/full-head/gnm-head-v3.manifest.json", "utf8"));
const bridge = JSON.parse(readFileSync("packages/face-geometry/assets/bridge/mediapipe468-to-gnm-head-v1.json", "utf8"));

assert.equal(manifest.schemaVersion, "face-geometry-upstream-asset-v1");
assert.equal(manifest.provider, "Google GNM");
assert.equal(manifest.repository, "google/GNM");
assert.equal(manifest.upstreamCommit, "fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690");
assert.equal(manifest.gitBlobSha, "ae49903ad7d50ce1d64e464a0407441f2781873c");
assert.equal(manifest.byteLength, 53305389);
assert.equal(manifest.license, "Apache-2.0");
assert.equal(manifest.cacheOnly, true);
assert.equal(manifest.runtimeRequired, false);
assert.deepEqual(manifest.requiredProviderVertexGroups, ["ears", "left", "right"]);
assert.deepEqual(manifest.derivedRegions, {
  left_ear: ["ears", "left"],
  right_ear: ["ears", "right"],
});
assert.equal(manifest.consumerPolicy.productNeutral, true);
assert.equal(manifest.consumerPolicy.directMediaPipeVertexIdentity, false);

assert.equal(bridge.schemaVersion, "face-geometry-registration-bridge-v1");
assert.equal(bridge.status, "bridge_contract_only");
assert.equal(bridge.source.topologyVertexCount, 468);
assert.equal(bridge.source.assetId, "mediapipe-canonical-face-v0.10.35");
assert.equal(bridge.target.assetId, manifest.assetId);
assert.equal(bridge.relation.directVertexIdentity, false);
assert.equal(bridge.relation.requiresRegistration, true);
assert.equal(bridge.relation.registrationImplementationStatus, "not_implemented_in_mesh3");
assert.ok(bridge.forbiddenClaims.includes("mediapipe-index-equals-gnm-index"));

stdout.write(`${JSON.stringify({
  status: "pass",
  assetId: manifest.assetId,
  upstreamCommit: manifest.upstreamCommit,
  providerGroups: manifest.requiredProviderVertexGroups,
  derivedRegions: Object.keys(manifest.derivedRegions),
  bridgeStatus: bridge.status,
})}\n`);
