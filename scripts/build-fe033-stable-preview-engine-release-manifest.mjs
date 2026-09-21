import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import process from 'node:process';

const RELEASE_SCHEMA = 'fe033-stable-preview-engine-release-manifest-v1';
const FE024_SCHEMA = 'fe024-digest-bound-preview-consumer-handoff-manifest-v1';
const TAG_PATTERN = /^face-preview-engine-v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u;
const SHA_PATTERN = /^[0-9a-f]{40}$/u;

function assert(condition, message) {
  if (!condition) throw new Error(`FE033 release manifest build failed: ${message}`);
}

const handoffDir = resolve(
  process.argv[2] ?? '.artifacts/fe024-digest-bound-preview-consumer-handoff',
);
const releaseTag = (process.argv[3] ?? '').trim();
const expectedSourceCommit = (process.argv[4] ?? '').trim();
const outputDir = resolve(
  process.argv[5] ?? '.artifacts/fe033-stable-preview-engine-release',
);

assert(TAG_PATTERN.test(releaseTag), 'release tag must match face-preview-engine-vX.Y.Z.');
assert(SHA_PATTERN.test(expectedSourceCommit), 'expected source commit must be a lowercase 40-char SHA.');

const fe024 = JSON.parse(
  readFileSync(resolve(handoffDir, 'manifest.json'), 'utf8'),
);
assert(fe024.schemaVersion === FE024_SCHEMA, 'FE024 manifest schema drift.');
assert(fe024.source?.commit === expectedSourceCommit, 'FE024 source commit mismatch.');
assert(fe024.package?.name === '@myeongha/face-reading', 'package name drift.');
assert(fe024.package?.version === '0.0.0', 'package version drift.');
assert(fe024.package?.publicExportPath === './preview-engine', 'public export drift.');
assert(fe024.package?.private === true, 'package must remain private.');
assert(
  fe024.contract?.fe023 ===
    'FE023-DIGEST-BOUND-DIRECT-BLOB-PRODUCT-PREVIEW-SESSION-v1',
  'FE023 contract drift.',
);
assert(
  fe024.contract?.openFunction === 'openDigestBoundProductPreviewSessionFE023',
  'FE023 open function drift.',
);
assert(
  fe024.runtimeDependency?.package === '@mediapipe/tasks-vision' &&
    fe024.runtimeDependency?.version === '0.10.35',
  'MediaPipe pin drift.',
);
assert(
  fe024.distribution?.registryPublished === false &&
    fe024.distribution?.handoffOnly === true,
  'FE024 distribution boundary drift.',
);

const tarballPath = resolve(handoffDir, basename(fe024.artifact?.filename ?? ''));
const tarballBytes = readFileSync(tarballPath);
const tarballSha256 = createHash('sha256').update(tarballBytes).digest('hex');
assert(tarballSha256 === fe024.artifact.sha256, 'FE024 tarball digest mismatch.');

const manifest = Object.freeze({
  schemaVersion: RELEASE_SCHEMA,
  release: Object.freeze({
    tag: releaseTag,
    channel: 'github_release_asset',
    repository: 'gycha0109-beep/Saju',
    sourceCommit: expectedSourceCommit,
  }),
  package: Object.freeze({
    name: fe024.package.name,
    version: fe024.package.version,
    publicExportPath: fe024.package.publicExportPath,
    private: true,
  }),
  artifact: Object.freeze({
    filename: basename(fe024.artifact.filename),
    sha256: tarballSha256,
    digestAlgorithm: 'SHA-256',
  }),
  contract: Object.freeze({
    fe023: fe024.contract.fe023,
    openFunction: fe024.contract.openFunction,
  }),
  runtimeDependency: Object.freeze({
    package: fe024.runtimeDependency.package,
    version: fe024.runtimeDependency.version,
  }),
  integrity: Object.freeze({
    consumerMustVerifyArtifactDigestBeforeInstall: true,
    sourceCommitPinned: true,
    releaseTagPinned: true,
  }),
  distribution: Object.freeze({
    registryPublished: false,
    publicReleaseAsset: true,
    manualPublishOnly: true,
  }),
});

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
writeFileSync(
  resolve(outputDir, 'release-manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8',
);

process.stdout.write(`${JSON.stringify({
  status: 'FE033_STABLE_PREVIEW_ENGINE_RELEASE_MANIFEST_BUILT',
  releaseTag,
  sourceCommit: expectedSourceCommit,
  artifact: manifest.artifact.filename,
  sha256: manifest.artifact.sha256,
  registryPublished: false,
})}\n`);
