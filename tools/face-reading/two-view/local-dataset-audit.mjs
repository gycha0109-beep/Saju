import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const PHOTO_EXTENSION = /\.(?:jpe?g|png|webp)$/i;
const SAFE_NAME = /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:jpe?g|png|webp)$/i;
const DIGEST = /^[a-f0-9]{64}$/i;

export function parseManifestCsv(text) {
  if (typeof text !== 'string') throw new TypeError('INVALID_MANIFEST');
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let closedQuote = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < input.length; i += 1) {
    const c = input[i];
    if (inQuotes) {
      if (c === '"') {
        if (input[i + 1] === '"') { field += '"'; i += 1; }
        else { inQuotes = false; closedQuote = true; }
      } else { field += c; }
      continue;
    }
    if (c === '"' && field === '' && !closedQuote) { inQuotes = true; continue; }
    if (c === ',') { row.push(field); field = ''; closedQuote = false; continue; }
    if (c === '\n' || c === '\r') {
      if (c === '\r' && input[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.some(value => value !== '')) rows.push(row);
      row = []; field = ''; closedQuote = false;
      continue;
    }
    if (closedQuote || c === '"') throw new Error('INVALID_CSV_QUOTING');
    field += c;
  }
  if (inQuotes) throw new Error('UNTERMINATED_CSV_QUOTE');
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  if (rows.length === 0) throw new Error('EMPTY_MANIFEST');
  const header = rows.shift();
  if (new Set(header).size !== header.length || !['file', 'sha256', 'license', 'license_url', 'commons_page'].every(k => header.includes(k))) {
    throw new Error('INVALID_MANIFEST_COLUMNS');
  }
  return rows.map(values => {
    if (values.length !== header.length) throw new Error('INVALID_MANIFEST_ROW');
    return Object.fromEntries(header.map((key, index) => [key, values[index]]));
  });
}

async function hashFile(filePath) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest('hex');
}

export async function auditPhotoSet(root, manifestFile) {
  const rows = parseManifestCsv(await readFile(join(root, manifestFile), 'utf8'));
  const photoDir = join(root, 'photos');
  const entries = await readdir(photoDir, { withFileTypes: true });
  const photos = new Set(entries.filter(item => item.isFile() && PHOTO_EXTENSION.test(item.name)).map(item => item.name));
  const seenNames = new Set();
  const digests = new Set();
  let missingPhotos = 0;
  let hashMismatches = 0;
  let unreadablePhotos = 0;
  let unsafeRows = 0;
  let repeatedRows = 0;
  let missingLicenseMetadata = 0;
  let checkedPhotos = 0;
  for (const row of rows) {
    const name = row.file;
    if (!row.license || !row.license_url || !row.commons_page) missingLicenseMetadata += 1;
    if (!SAFE_NAME.test(name) || !DIGEST.test(row.sha256)) { unsafeRows += 1; continue; }
    if (seenNames.has(name)) { repeatedRows += 1; continue; }
    seenNames.add(name);
    if (!photos.has(name)) { missingPhotos += 1; continue; }
    try {
      const digest = await hashFile(join(photoDir, name));
      checkedPhotos += 1;
      digests.add(digest);
      if (digest !== row.sha256.toLowerCase()) hashMismatches += 1;
    } catch { unreadablePhotos += 1; }
  }
  const unexpectedPhotos = [...photos].filter(name => !seenNames.has(name)).length;
  const duplicateImageContents = checkedPhotos - digests.size;
  const complete = missingPhotos === 0 && hashMismatches === 0 && unreadablePhotos === 0 &&
    unsafeRows === 0 && repeatedRows === 0 && unexpectedPhotos === 0;
  return {
    summary: {
      manifestRows: rows.length,
      discoveredPhotos: photos.size,
      checkedPhotos,
      missingPhotos,
      unexpectedPhotos,
      hashMismatches,
      unreadablePhotos,
      unsafeRows,
      repeatedRows,
      missingLicenseMetadata,
      duplicateImageContents,
      complete,
    },
    digests,
  };
}

export async function auditPhotoDatasets(baseRoot, eastAsiaRoot) {
  const base = await auditPhotoSet(baseRoot, 'source_manifest_1500.csv');
  const regional = await auditPhotoSet(eastAsiaRoot, 'source_manifest.csv');
  const overlap = [...base.digests].filter(digest => regional.digests.has(digest)).length;
  const uniqueImageContents = new Set([...base.digests, ...regional.digests]).size;
  return {
    schemaVersion: 'face-local-dataset-intake-audit-v1',
    description: 'File/manifests consistency only; no face inference or human accuracy verdict',
    base: base.summary,
    eastAsia: regional.summary,
    crossDatasetIdenticalFileContents: overlap,
    uniqueVerifiedFileContents: uniqueImageContents,
    complete: base.summary.complete && regional.summary.complete,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 4) {
    console.error('Usage: node local-dataset-audit.mjs <base-folder> <east-asia-folder>');
    process.exitCode = 1;
  } else {
    try {
      const report = await auditPhotoDatasets(process.argv[2], process.argv[3]);
      console.log(JSON.stringify(report, null, 2));
      if (!report.complete) process.exitCode = 2;
    } catch (error) {
      console.error('Dataset audit failed: ' + (error?.code === 'ENOENT' ? 'INPUT_NOT_FOUND' : 'INVALID_INPUT'));
      process.exitCode = 1;
    }
  }
}