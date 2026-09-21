import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import process from 'node:process';

const RELEASE_SCHEMA = 'fe033-stable-preview-engine-release-manifest-v1';
const TAG_PATTERN = /^face-preview-engine-v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u;
const SHA_PATTERN = /^[0-9a-f]{40}$/u;

function assert(condition, message) {
  if (!condition) throw new Error(`FE033 release verification failed: ${message}`);
}

const releaseDir = resolve(
  process.argv[2] ?? '.artifacts/fe033-stable-preview-engine-release',
);
const handoffDir = resolve(
  process.argv[3] ?? '.artifacts/fe024-digest-bound-preview-consumer-handoff',
);
const expectedTag = (process.argv[4] ?? '').trim();
const expectedSourceCommit = (process.argv[5] ?? '').trim();

assert(TAG_PATTERN.test(expectedTag), 'expected tag format invalid.');
assert(SHA_PATTERN.test(expectedSourceCommit), 'expected source commit format invalid.');

const manifest = JSON.parse(
  readFileSync(resolve(releaseDir, 'release-manifest.json'), 'utf8'),
);
assert(manifest.schemaVersion === RELEASE_SCHEMA, 'release manifest schema drift.');
assert(manifest.release?.tag === expectedTag, 'release tag mismatch.');
assert(manifest.release?.channel === 'github_release_asset', 'release channel drift.');
assert(manifest.release?.repository === 'gycha0109-beep/Saju', 'release repository drift.');
assert(manifest.release?.sourceCommit === expectedSourceCommit, 'source commit mismatch.');
assert(manifest.package?.name === '@myeongha/face-reading', 'package name drift.');
assert(manifest.package?.version === '0.0.0', 'package version drift.');
assert(manifest.package?.publicExportPath === './preview-engine', 'public export drift.');
assert(manifest.package?.private === true, 'package privacy drift.');
assert(
  manifest.contract?.fe023 ===
    'FE023-DIGEST-BOUND-DIRECT-BLOB-PRODUCT-PREVIEW-SESSION-v1' &&
    manifest.contract?.openFunction === 'openDigestBoundProductPreviewSessionFE023',
  'FE023 contract drift.',
);
assert(
  manifest.runtimeDependency?.package === '@mediapipe/tasks-vision' &&
    manifest.runtimeDependency?.version === '0.10.35',
  'MediaPipe pin drift.',
);
assert(
  manifest.integrity?.consumerMustVerifyArtifactDigestBeforeInstall === true &&
    manifest.integrity?.sourceCommitPinned === true &&
    manifest.integrity?.releaseTagPinned === true,
  'release integrity obligations drift.',
);
assert(
  manifest.distribution?.registryPublished === false &&
    manifest.distribution?.publicReleaseAsset === true &&
    manifest.distribution?.manualPublishOnly === true,
  'distribution boundary drift.',
);

const tarballPath = resolve(handoffDir, basename(manifest.artifact?.filename ?? ''));
const sha256 = createHash('sha256')
  .update(readFileSync(tarballPath))
  .digest('hex');
assert(manifest.artifact?.digestAlgorithm === 'SHA-256', 'digest algorithm drift.');
assert(manifest.artifact?.sha256 === sha256, 'release tarball SHA-256 mismatch.');

process.stdout.write(`${JSON.stringify({
  status: 'FE033_STABLE_PREVIEW_ENGINE_RELEASE_PASS',
  releaseTag: expectedTag,
  sourceCommit: expectedSourceCommit,
  artifact: manifest.artifact.filename,
  sha256,
  registryPublished: false,
  manualPublishOnly: true,
})}\n`);
