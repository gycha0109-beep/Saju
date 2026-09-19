import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PROJECT_ID = 'xk4f6';
const API_ROOT = `https://api.osf.io/v2/nodes/${PROJECT_ID}/files/`;

const sha256 = (value) =>
  `sha256:${createHash('sha256').update(value).digest('hex')}`;

async function fetchJson(url) {
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: {
      accept: 'application/vnd.api+json',
      'user-agent': 'myeongha-fr205a-astface-public-manifest',
    },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) {
    throw new Error(`FR205A OSF API failed ${response.status}: ${url}`);
  }
  return response.json();
}

async function collectPages(url) {
  const rows = [];
  let next = url;
  while (next) {
    const payload = await fetchJson(next);
    if (Array.isArray(payload.data)) rows.push(...payload.data);
    else if (payload.data) rows.push(payload.data);
    next = payload.links?.next ?? null;
  }
  return rows;
}

function childUrl(resource) {
  return (
    resource.relationships?.files?.links?.related?.href ??
    resource.links?.new_folder ??
    null
  );
}

async function enumerateFolder(url, rows, depth = 0) {
  if (depth > 12) throw new Error('FR205A OSF folder depth exceeded.');
  const entries = await collectPages(url);
  for (const entry of entries) {
    const attributes = entry.attributes ?? {};
    const record = {
      id: entry.id,
      name: attributes.name ?? null,
      kind: attributes.kind ?? null,
      path: attributes.path ?? null,
      materializedPath: attributes.materialized_path ?? null,
      size: attributes.size ?? null,
      provider: attributes.provider ?? null,
      download: entry.links?.download ?? null,
      html: entry.links?.html ?? null,
    };
    rows.push(record);
    if (record.kind === 'folder') {
      const related = childUrl(entry);
      if (!related) {
        throw new Error(`FR205A folder lacks child relation: ${record.materializedPath ?? record.name}`);
      }
      await enumerateFolder(related, rows, depth + 1);
    }
  }
}

const providers = await collectPages(API_ROOT);
const manifest = [];
const providerReceipts = [];

for (const provider of providers) {
  const name = provider.attributes?.name ?? provider.id;
  const root =
    provider.relationships?.files?.links?.related?.href ??
    provider.links?.files ??
    null;
  providerReceipts.push({
    id: provider.id,
    name,
    root,
  });
  if (root) await enumerateFolder(root, manifest);
}

const files = manifest.filter((row) => row.kind === 'file');
const extension = (name) => {
  const match = String(name ?? '').toLowerCase().match(/(\.[^.]+)$/u);
  return match?.[1] ?? '';
};
const byExtension = {};
for (const file of files) {
  const ext = extension(file.name);
  byExtension[ext] = (byExtension[ext] ?? 0) + 1;
}

const interesting = files.filter((file) =>
  /\.(?:obj|ply|stl|txt|csv|json|npz|npy|zip|7z|rar)$/iu.test(file.name ?? ''),
);
const neutralCandidates = interesting.filter((file) =>
  /neutral|neut|baseline|normal|静息|中性/i.test(
    `${file.materializedPath ?? ''} ${file.name ?? ''}`,
  ),
);
const landmarkCandidates = interesting.filter((file) =>
  /landmark/i.test(`${file.materializedPath ?? ''} ${file.name ?? ''}`),
);

const subjectTokens = [...new Set(
  interesting
    .flatMap((file) => {
      const text = `${file.materializedPath ?? ''}/${file.name ?? ''}`;
      const matches = text.match(/(?:subject|sub|id|s)[-_ ]?0*([0-9]{1,3})/giu) ?? [];
      return matches.map((value) => value.toLowerCase());
    })
)].sort();

const artifact = {
  schemaVersion: 'fr205a-astface-public-manifest-v1',
  authorityState: 'public_manifest_only',
  projectId: PROJECT_ID,
  apiRoot: API_ROOT,
  providers: providerReceipts,
  manifestCount: manifest.length,
  fileCount: files.length,
  byExtension,
  interestingFileCount: interesting.length,
  neutralCandidateCount: neutralCandidates.length,
  landmarkCandidateCount: landmarkCandidates.length,
  subjectTokenCount: subjectTokens.length,
  subjectTokens,
  interestingFiles: interesting,
  neutralCandidates,
  landmarkCandidates,
  manifestDigest: sha256(
    JSON.stringify(
      files.map((file) => ({
        path: file.materializedPath,
        name: file.name,
        size: file.size,
        download: file.download,
      })),
    ),
  ),
  fullPublicGeometryHoldoutExecutable:
    neutralCandidates.length >= 90 &&
    landmarkCandidates.length >= 90,
  independentIdentityValidationComplete: false,
  productionAuthorized: false,
  commerceAuthorized: false,
};

const outDir = resolve(ROOT, 'artifacts', 'face-reading');
await mkdir(outDir, { recursive: true });
await writeFile(
  resolve(outDir, 'fr205a-astface-public-manifest.json'),
  `${JSON.stringify(artifact, null, 2)}\n`,
  'utf8',
);

globalThis.console.log(
  JSON.stringify({
    status: 'manifest_complete',
    providerCount: providerReceipts.length,
    manifestCount: manifest.length,
    fileCount: files.length,
    byExtension,
    interestingFileCount: interesting.length,
    neutralCandidateCount: neutralCandidates.length,
    landmarkCandidateCount: landmarkCandidates.length,
    subjectTokenCount: subjectTokens.length,
    fullPublicGeometryHoldoutExecutable:
      artifact.fullPublicGeometryHoldoutExecutable,
    sampleInteresting: interesting.slice(0, 20),
  }),
);
