import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(
  root,
  'packages/face-reading/assets/canonical-face/mediapipe-v0.10.35.manifest.json',
);
const packagePath = path.join(root, 'packages/face-reading/package.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const facePackage = JSON.parse(await readFile(packagePath, 'utf8'));

assert.equal(manifest.schemaVersion, 'mesh1-canonical-face-v1');
assert.equal(manifest.provider, 'google-ai-edge/mediapipe');
assert.equal(manifest.providerTag, 'v0.10.35');
assert.equal(
  manifest.providerPath,
  'mediapipe/tasks/cc/vision/face_geometry/data/canonical_face_model.obj',
);
assert.equal(manifest.providerGitBlobSha, '0e666d1c4e75949d1639c2bcf347a38da4834164');
assert.equal(manifest.providerByteLength, 45999);
assert.equal(manifest.license, 'Apache-2.0');
assert.equal(manifest.usage, 'asset_creation_and_reference');

assert.equal(manifest.canonicalTopology.vertexCount, 468);
assert.equal(manifest.canonicalTopology.vertexIndexBase, 0);
assert.equal(manifest.canonicalTopology.coordinateUnit, 'centimeter');
assert.equal(manifest.canonicalTopology.runtimePackage, '@mediapipe/tasks-vision');
assert.equal(manifest.canonicalTopology.runtimePackageVersion, '0.10.35');
assert.equal(facePackage.dependencies['@mediapipe/tasks-vision'], '0.10.35');
assert.equal(manifest.canonicalTopology.irisExtensionIncluded, false);

const seeds = manifest.inspectionSeeds;
assert.equal(seeds.length, 2);
assert.deepEqual(
  seeds.map((seed) => seed.index),
  [234, 454],
);
for (const seed of seeds) {
  assert.equal(seed.status, 'inspection_only');
  assert.ok(Number.isInteger(seed.index));
  assert.ok(seed.index >= 0 && seed.index < manifest.canonicalTopology.vertexCount);
  assert.equal(seed.coordinateCm.length, 3);
}
assert.equal(seeds[0].coordinateCm[0], -seeds[1].coordinateCm[0]);
assert.equal(seeds[0].coordinateCm[1], seeds[1].coordinateCm[1]);
assert.equal(seeds[0].coordinateCm[2], seeds[1].coordinateCm[2]);

assert.equal(manifest.boundaries.productionRegionAuthorized, false);
assert.equal(manifest.boundaries.productionMetricAuthorized, false);
assert.equal(manifest.boundaries.runtimeBlenderDependency, false);
assert.equal(manifest.boundaries.semanticSideAssignmentEncoded, false);

stdout.write(
  `${JSON.stringify({
    status: 'pass',
    contract: manifest.schemaVersion,
    providerTag: manifest.providerTag,
    vertexCount: manifest.canonicalTopology.vertexCount,
    inspectionSeeds: seeds.map((seed) => seed.index),
  })}\n`,
);
