import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  FR199_FEMALE_DATASET_COMMIT,
  FR199_FEMALE_DATASET_REPOSITORY,
  FR199_MALE_DATASET_COMMIT,
  FR199_MALE_DATASET_REPOSITORY,
  FR199_PUBLIC_CORPUS,
  deriveAndFreezeIndependentZygionReferenceFR199,
  parseObjVerticesFR199,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-correspondence-fr199.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'artifacts', 'face-reading', 'fr204-3ddfa-inputs');

function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function sourceFor(sampleId) {
  const male = sampleId.startsWith('male-');
  return {
    repository: male ? FR199_MALE_DATASET_REPOSITORY : FR199_FEMALE_DATASET_REPOSITORY,
    commit: male ? FR199_MALE_DATASET_COMMIT : FR199_FEMALE_DATASET_COMMIT,
  };
}

async function download(url) {
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr204-3ddfa-oracle' },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) throw new Error(`FR204 download failed ${response.status} ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const samples = [];
  const failures = [];

  for (const sampleId of FR199_PUBLIC_CORPUS) {
    const { repository, commit } = sourceFor(sampleId);
    try {
      const [objBytes, imageBytes] = await Promise.all([
        download(
          `https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.obj`,
        ),
        download(
          `https://raw.githubusercontent.com/${repository}/${commit}/2D-photos/${sampleId}.png`,
        ),
      ]);
      const objText = objBytes.toString('utf8');
      const reference = deriveAndFreezeIndependentZygionReferenceFR199({
        sampleId,
        objText,
        objDigest: sha256(objBytes),
      });
      const vertices = parseObjVerticesFR199(objText);
      const ys = vertices.map((entry) => entry.y);
      const objYSpan = Math.max(...ys) - Math.min(...ys);
      if (!(objYSpan > 0)) throw new Error('FR204 OBJ Y span must be positive.');
      const referenceWidth = Math.abs(
        reference.bilateralReference[1].x - reference.bilateralReference[0].x,
      );
      const imagePath = join(OUT, `${sampleId}.png`);
      await writeFile(imagePath, imageBytes);
      samples.push({
        sampleId,
        repository,
        commit,
        imageFile: `${sampleId}.png`,
        imageDigest: sha256(imageBytes),
        objDigest: sha256(objBytes),
        sourceReferenceWidthByObjYSpan: referenceWidth / objYSpan,
      });
    } catch (error) {
      failures.push({
        sampleId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const manifest = {
    schemaVersion: 'fr204-3ddfa-oracle-inputs-v1',
    corpusCount: FR199_PUBLIC_CORPUS.length,
    sourceExactReadyCount: samples.length,
    failures,
    samples,
    authority: {
      oracleValidationOnly: true,
      productionDependencyAuthorized: false,
      commerceDependencyAuthorized: false,
      providerIndexAdmissionAuthorized: false,
      anatomicalZygionClaimAuthorized: false,
      productionAuthorized: false,
      commerceAuthorized: false,
    },
  };
  await writeFile(join(OUT, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  process.stdout.write(
    `${JSON.stringify({
      sourceExactReadyCount: samples.length,
      failures,
      oracleValidationOnly: true,
      productionDependencyAuthorized: false,
    })}\n`,
  );
  if (samples.length !== 18) process.exitCode = 1;
}

main().catch((error) => {
  globalThis.console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
