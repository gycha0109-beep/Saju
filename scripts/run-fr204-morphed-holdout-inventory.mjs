import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

import {
  FR199_FEMALE_DATASET_COMMIT,
  FR199_FEMALE_DATASET_REPOSITORY,
  FR199_MALE_DATASET_COMMIT,
  FR199_MALE_DATASET_REPOSITORY,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-correspondence-fr199.js';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const SENTINELS = Object.freeze([
  {
    sampleId: 'male-23',
    repository: FR199_MALE_DATASET_REPOSITORY,
    commit: FR199_MALE_DATASET_COMMIT,
  },
  {
    sampleId: 'female-26',
    repository: FR199_FEMALE_DATASET_REPOSITORY,
    commit: FR199_FEMALE_DATASET_COMMIT,
  },
]);

const sha256 = (bytes) =>
  `sha256:${createHash('sha256').update(bytes).digest('hex')}`;

async function download(url, path) {
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr204-holdout-inventory' },
    signal: globalThis.AbortSignal.timeout(180000),
  });
  if (!response.ok) throw new Error(`FR204 inventory download failed ${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path, bytes);
  return bytes;
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  if (result.status !== 0) {
    throw new Error(
      `FR204 inventory command failed: ${command} ${args.join(' ')}\n${result.stderr}`,
    );
  }
  return result.stdout;
}

const temp = await mkdtemp(join(tmpdir(), 'myeongha-fr204-inventory-'));
try {
  const receipts = [];
  for (const sentinel of SENTINELS) {
    const zipPath = join(temp, `${sentinel.sampleId}.zip`);
    const rawUrl =
      `https://raw.githubusercontent.com/${sentinel.repository}/${sentinel.commit}/morphed-3D/${sentinel.sampleId}.zip`;
    const bytes = await download(rawUrl, zipPath);
    const entries = run('unzip', ['-Z1', zipPath], temp)
      .split(/\r?\n/u)
      .map((entry) => entry.trim())
      .filter(Boolean);
    const objEntries = entries.filter((entry) => entry.toLowerCase().endsWith('.obj'));
    const jsonEntries = entries.filter((entry) => entry.toLowerCase().endsWith('.json'));
    const mtlEntries = entries.filter((entry) => entry.toLowerCase().endsWith('.mtl'));
    const imageEntries = entries.filter((entry) => /\.(?:jpe?g|png)$/iu.test(entry));

    const extractDir = join(temp, `${sentinel.sampleId}-extract`);
    await mkdir(extractDir, { recursive: true });
    const inspectEntries = [...objEntries.slice(0, 2), ...mtlEntries.slice(0, 2)];
    if (inspectEntries.length) {
      run('unzip', ['-qq', zipPath, ...inspectEntries, '-d', extractDir], temp);
    }
    const inspected = [];
    for (const entry of inspectEntries) {
      const content = await readFile(join(extractDir, entry), 'utf8');
      inspected.push({
        entry,
        mtllibRows: content
          .split(/\r?\n/u)
          .map((line) => line.trim())
          .filter((line) => line.startsWith('mtllib ')),
        mapKdRows: content
          .split(/\r?\n/u)
          .map((line) => line.trim())
          .filter((line) => line.startsWith('map_Kd ')),
        hasTextureCoordinates: content.split(/\r?\n/u).some((line) => line.startsWith('vt ')),
        hasFaces: content.split(/\r?\n/u).some((line) => line.startsWith('f ')),
      });
    }

    receipts.push({
      ...sentinel,
      zipDigest: sha256(bytes),
      zipBytes: bytes.length,
      entryCount: entries.length,
      entries,
      objEntries,
      jsonEntries,
      mtlEntries,
      imageEntries,
      inspected,
    });
  }

  const artifact = {
    schemaVersion: 'fr204-morphed-holdout-inventory-v1',
    authorityState: 'source_inventory_only',
    frozenCalibrationFactors: {
      fixed234454: 0.8316119344124847,
      fullOval: 0.8185802384926992,
      bandEnvelope: 0.8330842257364008,
    },
    sentinels: receipts,
    holdoutSelected: false,
    providerExecuted: false,
    calibrationAuthorized: false,
    productionAuthorized: false,
    commerceAuthorized: false,
  };

  const outDir = join(ROOT, 'artifacts', 'face-reading');
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, 'fr204-morphed-holdout-inventory.json');
  await writeFile(outPath, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
  console.log(
    JSON.stringify({
      status: 'inventory_complete',
      sentinels: receipts.map((receipt) => ({
        sampleId: receipt.sampleId,
        zipBytes: receipt.zipBytes,
        entryCount: receipt.entryCount,
        objCount: receipt.objEntries.length,
        jsonCount: receipt.jsonEntries.length,
        mtlCount: receipt.mtlEntries.length,
        imageCount: receipt.imageEntries.length,
        entries: receipt.entries,
        inspected: receipt.inspected,
      })),
      holdoutSelected: false,
      providerExecuted: false,
    }),
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
