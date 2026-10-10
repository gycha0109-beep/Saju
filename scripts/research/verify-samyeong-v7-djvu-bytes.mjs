/**
 * Read-only CADAL06066043 source DjVu byte verifier.
 * node scripts/research/verify-samyeong-v7-djvu-bytes.mjs /path/source.djvu
 * Proves encoded bytes, NOT glyphs, folio, PDF derivation, witness admission.
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const expected = Object.freeze({
  byteLength: 9793070,
  sha1: 'eeb9f80eb97fd385a580aa5bfda28c292aa7761c',
  sha256: '406704d9095a6bf3635a9557dfcd27a93e051fb4ebbffe1c252ddfe4294f1d1a',
  pageCount: 198,
  page: 174,
  pageFormOffset: 8566660,
  pageFormByteLength: 44342,
  pageFormSha256: 'f0d83bf196e4b9752d63ad4340f5d74a1f29a6bebf88315b601488fb8fc62ba9',
  pageSjbzChunkSha256: 'fcdd51135abeeb0b22637b7852c809848c74b482ae71a0092d336a2f75cca57b',
});

const sha = (buffer, algo) => createHash(algo).update(buffer).digest('hex');

function chunk(bytes, offset, limit) {
  if (offset < 0 || offset + 8 > limit) throw new Error('TRUNCATED_CHUNK_HEADER');
  const id = bytes.toString('ascii', offset, offset + 4);
  const length = bytes.readUInt32BE(offset + 4);
  const end = offset + 8 + length;
  const paddedEnd = end + (length % 2);
  if (end > limit || paddedEnd > limit) throw new Error('CHUNK_OVERRUN');
  return { id, offset, length, end, paddedEnd };
}

export function inspectMultipageDjvu(bytes, page = expected.page) {
  if (!Buffer.isBuffer(bytes) || bytes.toString('ascii', 0, 4) !== 'AT&T') {
    throw new Error('INVALID_DJVU_SIGNATURE');
  }
  const root = chunk(bytes, 4, bytes.length);
  if (root.id !== 'FORM' || bytes.toString('ascii', 12, 16) !== 'DJVM' || root.end !== bytes.length) {
    throw new Error('INVALID_DJVM_ROOT');
  }
  const pages = [];
  let directories = 0;
  for (let p = 16; p < root.end;) {
    const c = chunk(bytes, p, root.end);
    if (c.id === 'DIRM') directories += 1;
    if (c.id === 'FORM') {
      if (bytes.toString('ascii', p + 8, p + 12) !== 'DJVU') throw new Error('UNEXPECTED_PAGE_FORM');
      pages.push(c);
    }
    p = c.paddedEnd;
  }
  if (directories !== 1) throw new Error('INVALID_DIRECTORY_COUNT');
  if (!Number.isInteger(page) || page < 1 || page > pages.length) throw new Error('INVALID_PAGE_INDEX');
  const f = pages[page - 1];
  let info = 0;
  let sjbz = null;
  for (let p = f.offset + 12; p < f.end;) {
    const c = chunk(bytes, p, f.end);
    if (c.id === 'INFO') info += 1;
    if (c.id === 'Sjbz') {
      if (sjbz !== null) throw new Error('DUPLICATE_SJBZ');
      sjbz = c;
    }
    p = c.paddedEnd;
  }
  if (info !== 1 || sjbz === null) throw new Error('MISSING_PAGE_CHUNKS');
  return {
    byteLength: bytes.length,
    sha1: sha(bytes, 'sha1'),
    sha256: sha(bytes, 'sha256'),
    pageCount: pages.length,
    page,
    pageFormOffset: f.offset,
    pageFormByteLength: f.end - f.offset,
    pageFormSha256: sha(bytes.subarray(f.offset, f.end), 'sha256'),
    // Historical pinned hash includes the 8-byte Sjbz chunk header.
    pageSjbzChunkSha256: sha(bytes.subarray(sjbz.offset, sjbz.end), 'sha256'),
  };
}

export function verifyPinnedSamyeongV7Djvu(bytes) {
  const actual = inspectMultipageDjvu(bytes);
  const failures = Object.entries(expected)
    .filter(([key, value]) => actual[key] !== value)
    .map(([key, value]) => ({ field: key, expected: value, actual: actual[key] }));
  return { status: failures.length === 0 ? 'PASS' : 'FAIL', actual, failures };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 3) {
    console.error('Usage: node verify-samyeong-v7-djvu-bytes.mjs <source.djvu>');
    process.exitCode = 2;
  } else {
    try {
      const result = verifyPinnedSamyeongV7Djvu(readFileSync(process.argv[2]));
      console.log(JSON.stringify(result, null, 2));
      if (result.status !== 'PASS') process.exitCode = 1;
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  }
}