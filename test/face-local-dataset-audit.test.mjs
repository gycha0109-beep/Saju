import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { auditPhotoDatasets, parseManifestCsv } from '../tools/face-reading/two-view/local-dataset-audit.mjs';

const hash = data => createHash('sha256').update(data).digest('hex');
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'face-dataset-audit-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const base = join(root, 'base');
  const east = join(root, 'regional');
  await mkdir(join(base, 'photos'), { recursive: true });
  await mkdir(join(east, 'photos'), { recursive: true });
  const header = 'file,sha256,license,license_url,commons_page,attribution\n';
  async function populate(folder, name, bytes, options = {}) {
    const content = Buffer.from(bytes);
    if (!options.absent) await writeFile(join(folder, 'photos', name), content);
    const row = [name, options.digest || hash(content), 'CC BY', 'https://example.org/license', 'https://example.org/source', '"Photographer, sample"'].join(',');
    return row + '\n';
  }
  async function save(baseRows, eastRows) {
    await writeFile(join(base, 'source_manifest_1500.csv'), header + baseRows.join(''));
    await writeFile(join(east, 'source_manifest.csv'), header + eastRows.join(''));
  }
  return { root, base, east, populate, save };
}

test('manifest parser handles BOM, quoted commas and multi-line strings without losing rows', () => {
  const rows = parseManifestCsv('\uFEFFfile,sha256,license,license_url,commons_page,attribution\r\n' +
    'f.jpg,' + 'a'.repeat(64) + ',CC,https://l,https://s,"quoted, author\nwith ""quotes"""\r\n');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].attribution, 'quoted, author\nwith "quotes"');
});

test('complete manifests are verified and identical content across sets counted once', async t => {
  const f = await fixture(t);
  const baseRow = await f.populate(f.base, 'f1.jpg', 'same picture');
  const regionalRow = await f.populate(f.east, 'e1.jpg', 'same picture');
  await f.save([baseRow], [regionalRow]);
  const result = await auditPhotoDatasets(f.base, f.east);
  assert.equal(result.complete, true);
  assert.equal(result.base.checkedPhotos, 1);
  assert.equal(result.eastAsia.checkedPhotos, 1);
  assert.equal(result.crossDatasetIdenticalFileContents, 1);
  assert.equal(result.uniqueVerifiedFileContents, 1);
  assert.doesNotMatch(JSON.stringify(result), /f1\.jpg|e1\.jpg|face-dataset-audit-|same picture/);
});

test('missing and mismatched photos block completeness without printing photo identities', async t => {
  const f = await fixture(t);
  const missingRow = await f.populate(f.base, 'missing.jpg', 'absent', { absent: true });
  const badRow = await f.populate(f.base, 'bad.jpg', 'actual bytes', { digest: hash('different') });
  const validRegional = await f.populate(f.east, 'valid.jpg', 'valid');
  await writeFile(join(f.base, 'photos', 'unlisted.jpg'), 'unlisted');
  await f.save([missingRow, badRow], [validRegional]);
  const result = await auditPhotoDatasets(f.base, f.east);
  assert.equal(result.complete, false);
  assert.equal(result.base.missingPhotos, 1);
  assert.equal(result.base.hashMismatches, 1);
  assert.equal(result.base.unexpectedPhotos, 1);
  assert.equal(result.eastAsia.complete, true);
  assert.doesNotMatch(JSON.stringify(result), /missing\.jpg|bad\.jpg|unlisted\.jpg/);
});

test('malformed CSV, directory traversal and repeated manifest entries are rejected', async t => {
  assert.throws(() => parseManifestCsv('file,sha256,license,license_url,commons_page\n"x'), /UNTERMINATED_CSV_QUOTE/);
  const f = await fixture(t);
  const good = await f.populate(f.base, 'f1.jpg', 'data');
  const external = '../outside.jpg,' + hash('foo') + ',CC,https://l,https://s,author\n';
  const regional = await f.populate(f.east, 'e1.jpg', 'different');
  await f.save([good, good, external], [regional]);
  const result = await auditPhotoDatasets(f.base, f.east);
  assert.equal(result.base.unsafeRows, 1);
  assert.equal(result.base.repeatedRows, 1);
  assert.equal(result.complete, false);
});