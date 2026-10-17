#!/usr/bin/env node
/** N27 print-image finder. Renders only: NEVER authenticates a glyph or a Claim. */
import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import console from 'node:console';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, mkdirSync, openSync, readSync, closeSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const WITNESS_GROUPS = Object.freeze({
  HARVARD_DRS_53262215_VOL_5: 'HARVARD_1735_CATALOGUE',
  NLC_411999029701_VOL_5_UPPER: 'NLC_411999029701_ENGRAVED_EDITION',
  NLC_411999029701_VOL_5_LOWER: 'NLC_411999029701_ENGRAVED_EDITION',
  CADAL06056481: 'CADAL_UNRESOLVED_PRINTING',
  CADAL06066041: 'CADAL_UNRESOLVED_PRINTING',
});

export function pageSelection(spec, count) {
  if (!Number.isSafeInteger(count) || count < 1 || count > 1500) throw Error('Bad PDF page count');
  if (spec === 'all') return Array.from({ length: count }, (_, i) => i + 1);
  if (!/^[0-9,-]+$/.test(spec)) throw Error('Invalid --pages syntax');
  const result = new Set();
  for (const token of spec.split(',')) {
    if (!/^\d+(?:-\d+)?$/.test(token)) throw Error('Invalid page range');
    const [first, last] = token.split('-').map(Number);
    const end = last ?? first;
    if (first < 1 || end < first || end > count) throw Error('Out-of-bounds page');
    for (let n = first; n <= end; n += 1) result.add(n);
  }
  return [...result].sort((a, b) => a - b);
}

export function packet(sourceId, pdfSha256, totalPages, rasterPages) {
  if (!Object.hasOwn(WITNESS_GROUPS, sourceId)) throw Error('Unknown print source');
  if (!/^[a-f0-9]{64}$/.test(pdfSha256)) throw Error('Invalid PDF SHA-256');
  if (!rasterPages.length || rasterPages.some((p) => p.page < 1 ||
      p.page > totalPages || !/^[a-f0-9]{64}$/.test(p.rasterSha256))) {
    throw Error('Invalid raster page digest');
  }
  return {
    schema: 'saju-n27-printed-folio-visual-inspection-v1',
    sourceId,
    possiblePrintGroup: WITNESS_GROUPS[sourceId],
    originalPdfSha256: pdfSha256,
    totalPdfPages: totalPages,
    rasterPages,
    targetHeading: '時上偏財',
    competingDigitalReadings: ['柱中不宜再見戊巳', '柱中不宜再見戊己'],
    originalFolioLocated: false,
    originalPrintGlyphVerified: false,
    independentHistoricalWitnessCertified: false,
    interpretationAdmitted: false,
    productionAuthorized: false,
  };
}

function exec(bin, argv) {
  const result = spawnSync(bin, argv, { encoding: 'utf8', maxBuffer: 5_000_000 });
  if (result.error || result.status !== 0) {
    throw Error(bin + ': ' + String(result.error?.message ?? result.stderr ?? 'command failed').slice(0, 300));
  }
  return result.stdout;
}
async function digest(file) {
  return new Promise((done, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(file);
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => done(hash.digest('hex')));
    stream.on('error', reject);
  });
}
function gallery(data) {
  const name = data.sourceId;
  const cards = data.rasterPages.map((p) =>
    '<figure><a href="pages/' + p.file + '"><img loading="lazy" src="pages/' +
    p.file + '" alt="PDF page ' + p.page + '"></a><figcaption>PDF page ' +
    p.page + ' — raster SHA256 ' + p.rasterSha256 + '</figcaption></figure>'
  ).join('\n');
  return '<!doctype html><html><meta charset="utf-8"><title>N27 ' + name +
    '</title><style>body{font-family:sans-serif;margin:2em}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:15px}img{max-width:100%}figure{margin:0;border:1px solid #aaa;padding:10px}figcaption{overflow-wrap:anywhere;font-size:12px}</style>' +
    '<h1>Research-only PDF visual inspection: ' + name + '</h1><p>File SHA256: ' +
    data.originalPdfSha256 + '</p><p><b>NOT PRINT-VERIFIED.</b> Locate 時上偏財 visually. ' +
    'Read the actual original raster at high resolution before deciding 巳 or 己. ' +
    'Do not treat this packet as source admission.</p><main>' + cards + '</main></html>';
}
function selfTest() {
  assert.deepEqual(pageSelection('1,4-6,5', 7), [1, 4, 5, 6]);
  assert.deepEqual(pageSelection('all', 3), [1, 2, 3]);
  assert.throws(() => pageSelection('../3', 4));
  assert.throws(() => pageSelection('1-9', 8));
  const p = packet('NLC_411999029701_VOL_5_UPPER', 'a'.repeat(64), 9,
    [{ page: 2, file: 'page-0002.png', rasterSha256: 'b'.repeat(64) }]);
  assert.equal(p.possiblePrintGroup, WITNESS_GROUPS.NLC_411999029701_VOL_5_LOWER);
  assert.equal(p.originalPrintGlyphVerified, false);
  assert.equal(p.interpretationAdmitted, false);
  assert.match(gallery(p), /NOT PRINT-VERIFIED/);
  console.log('N27 print-image tool self-test PASS');
}
async function main(argv) {
  if (argv.includes('--self-test')) return selfTest();
  if (argv.includes('--help') || !argv.length) {
    console.log('Usage: node scripts/research/inspect-n27-volume-five-print.mjs --pdf FILE.pdf --source-id HARVARD_DRS_53262215_VOL_5 --out DIR [--pages all|1-20,25] [--scale 1000]');
    console.log('Requires Poppler pdfinfo/pdftoppm. Produces HTML gallery, PNGs, file/page SHA256s, UNREVIEWED reading template.');
    return;
  }
  const get = (k, fallback) => {
    const i = argv.indexOf(k);
    return i < 0 ? fallback : argv[i + 1];
  };
  const pdfPath = resolve(get('--pdf', ''));
  const sourceId = get('--source-id', '');
  const output = get('--out', '');
  if (!sourceId || !output || !Object.hasOwn(WITNESS_GROUPS, sourceId) ||
      !existsSync(pdfPath)) throw Error('Require existing --pdf, valid --source-id, --out');
  const fd = openSync(pdfPath, 'r');
  const header = Buffer.alloc(5);
  try { readSync(fd, header, 0, 5, 0); } finally { closeSync(fd); }
  if (header.toString('ascii') !== '%PDF-') throw Error('Input lacks PDF header');
  const info = exec('pdfinfo', [pdfPath]);
  const found = info.match(/^Pages:\s*(\d+)/m);
  if (!found) throw Error('Unable to determine PDF pages');
  const count = Number(found[1]);
  const pages = pageSelection(get('--pages', 'all'), count);
  const scale = Number(get('--scale', '1000'));
  if (!Number.isInteger(scale) || scale < 320 || scale > 1600) throw Error('Invalid --scale');
  const out = resolve(output);
  mkdirSync(join(out, 'pages'), { recursive: true });
  const entries = [];
  for (const n of pages) {
    const name = 'page-' + String(n).padStart(4, '0');
    const image = join(out, 'pages', name + '.png');
    exec('pdftoppm', ['-f', String(n), '-l', String(n), '-singlefile',
      '-scale-to', String(scale), '-png', pdfPath, join(out, 'pages', name)]);
    entries.push({ page: n, file: name + '.png', rasterSha256: await digest(image) });
  }
  const pdfSha = await digest(pdfPath);
  const result = packet(sourceId, pdfSha, count, entries);
  writeFileSync(join(out, 'manifest.json'), JSON.stringify(result, null, 2) + '\n');
  writeFileSync(join(out, 'index.html'), gallery(result));
  writeFileSync(join(out, 'reading-template.json'), JSON.stringify({
    status: 'UNREVIEWED', sourceId, originalPdfSha256: pdfSha,
    targetChapterLocated: false, exactPdfPage: null, printedFolioMark: null,
    originalClauseWithNeighboringCharacters: null, selectedOriginalGlyph: null,
    pageRasterSha256: null, physicalWitnessCertified: false,
    consumerSemanticAdmissionAuthorized: false, productionAuthorized: false,
  }, null, 2) + '\n');
  console.log('Research-only visual inspection packet written: ' + out);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(String(err.message)); process.exitCode = 1;
  });
}
