import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const manifest = JSON.parse(
  readFileSync('docs/migrations/face-reading-from-myeongha.manifest.json', 'utf8'),
);
const packageFiles = manifest.files.filter((entry) => entry.category === 'package');

if (packageFiles.length !== manifest.invariants.sourcePackageFileCount) {
  throw new Error('Manifest package count drift');
}

for (const file of packageFiles) {
  const actual = execFileSync('git', ['hash-object', file.path], { encoding: 'utf8' }).trim();
  if (actual !== file.blobSha) {
    throw new Error(`Face package byte drift: ${file.path}`);
  }
}

const facePackage = JSON.parse(readFileSync('packages/face-reading/package.json', 'utf8'));
if (facePackage.name !== manifest.invariants.packageName) throw new Error('Face package name drift');
if (facePackage.version !== manifest.invariants.packageVersion) throw new Error('Face package version drift');
if (
  facePackage.dependencies?.['@mediapipe/tasks-vision'] !==
  manifest.invariants.mediapipeTasksVisionVersion
) {
  throw new Error('Face dependency drift');
}

const sajuPackage = JSON.parse(readFileSync('package.json', 'utf8'));
if (sajuPackage.name !== 'myeonghwa-saju-engine') throw new Error('Saju root package identity drift');
if (
  sajuPackage.scripts?.check !==
  'npm run lint && npm run typecheck && npm run test && npm run build && npm run preview:research:smoke'
) {
  throw new Error('Saju root check contract drift');
}

const expectedRootExports = [
  '.',
  './product-host',
  './product-reading',
  './production-runtime',
];
const actualRootExports = Object.keys(sajuPackage.exports ?? {}).sort();
if (JSON.stringify(actualRootExports) !== JSON.stringify(expectedRootExports)) {
  throw new Error('Saju root public exports drift');
}
