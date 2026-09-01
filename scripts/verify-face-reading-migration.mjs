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

const pkg = JSON.parse(readFileSync('packages/face-reading/package.json', 'utf8'));
if (pkg.name !== manifest.invariants.packageName) throw new Error('Face package name drift');
if (pkg.version !== manifest.invariants.packageVersion) throw new Error('Face package version drift');
if (pkg.dependencies?.['@mediapipe/tasks-vision'] !== manifest.invariants.mediapipeTasksVisionVersion) {
  throw new Error('Face dependency drift');
}
