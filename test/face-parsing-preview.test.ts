import { describe, it, expect } from 'vitest';
import { Buffer } from 'node:buffer';
import { deflateSync, crc32 } from 'node:zlib';
import {
  PARSING_VERSION,
  PARSING_LABELS,
  PARSING_GROUPS,
  rgbTensor,
  classifyLogits,
  contactPixels,
  validateParsingSummary,
  containSize,
} from '../tools/face-reading/two-view/parsing-contract.mjs';
import { validateParsingBatch } from '../tools/face-reading/two-view/parsing-storage.mjs';
const n = 512 * 512;
const summary = () => ({
  methodVersion: PARSING_VERSION,
  candidateOnly: true as const,
  status: 'completed' as const,
  counts: [n, ...Array<number>(18).fill(0)],
  interfacePixels: 0,
});
function chunk(kind: string, bytes: Buffer) {
  const output = Buffer.alloc(bytes.length + 12);
  output.writeUInt32BE(bytes.length);
  output.write(kind, 4);
  bytes.copy(output, 8);
  output.writeUInt32BE(crc32(output.subarray(4, bytes.length + 8)), bytes.length + 8);
  return output;
}
function png(pixel?: number[]) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(512);
  header.writeUInt32BE(512, 4);
  header[8] = 8;
  header[9] = 6;
  const raw = Buffer.alloc(512 * (512 * 4 + 1));
  if (pixel) for (let i = 0; i < 4; i++) raw[1 + i] = pixel[i] ?? 0;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]).toString('base64');
}
describe('pinned local parsing candidate contract', () => {
  it('restores wide/tall image aspect inside the content viewport without square-mask padding', () => {
    expect(containSize(1200, 600, 400, 600)).toEqual({ width: 400, height: 200 });
    expect(containSize(600, 1200, 400, 600)).toEqual({ width: 300, height: 600 });
    expect(() => containSize(0, 1, 400, 600)).toThrow();
  });
  it('keeps 19 exact classes and does not treat accessory labels as ears', () => {
    expect(PARSING_LABELS).toEqual([
      'background',
      'skin',
      'l_brow',
      'r_brow',
      'l_eye',
      'r_eye',
      'eye_g',
      'l_ear',
      'r_ear',
      'ear_r',
      'nose',
      'mouth',
      'u_lip',
      'l_lip',
      'neck',
      'neck_l',
      'cloth',
      'hair',
      'hat',
    ]);
    expect(PARSING_GROUPS.find((g) => g.id === 'ears')?.classes).toEqual([7, 8]);
  });
  it('prepares RGB channel-major normalized pixels without BGR swap', () => {
    const t = rgbTensor(new Uint8Array([255, 0, 128, 255, 0, 255, 0, 255]), 2, 1);
    expect(t[0]).toBeCloseTo((1 - 0.485) / 0.229);
    expect(t[1]).toBeCloseTo((0 - 0.485) / 0.229);
    expect(t[2]).toBeCloseTo((0 - 0.456) / 0.224);
    expect(t[3]).toBeCloseTo((1 - 0.456) / 0.224);
    expect(t[4]).toBeCloseTo((128 / 255 - 0.406) / 0.225);
    expect(() => rgbTensor(new Uint8Array(4), 2, 1)).toThrow();
  });
  it('classifies exact NCHW output and rejects dimension/nonfinite drift', () => {
    const data = new Float32Array(19 * n);
    data[17 * n + 2] = 5;
    data[n + 3] = 3;
    const result = classifyLogits(data, [1, 19, 512, 512]);
    expect(result.mask[2]).toBe(17);
    expect(result.mask[3]).toBe(1);
    expect(result.counts[0]).toBe(n - 2);
    expect(() => classifyLogits(data, [1, 512, 512, 19])).toThrow();
    data[10 * n + 6] = NaN;
    expect(() => classifyLogits(data, [1, 19, 512, 512])).toThrow();
  });
  it('uses only direct four-neighbour contacts, with no gap completion or row wrapping', () => {
    expect([...contactPixels(new Uint8Array([17, 1, 0, 0, 1, 0, 17, 1, 0]), 3, 3)]).toEqual([
      0, 1, 0, 0, 0, 0, 0, 1, 0,
    ]);
    expect([...contactPixels(new Uint8Array([0, 0, 17, 1, 0, 0]), 3, 2)]).toEqual([
      0, 0, 0, 0, 0, 0,
    ]);
    expect([...contactPixels(new Uint8Array([1, 1, 1, 1]), 2, 2)]).toEqual([0, 0, 0, 0]);
    expect(() => contactPixels(new Uint8Array([19]), 1, 1)).toThrow();
  });
  it('projects candidate summaries without source data or authority', () => {
    const result = validateParsingSummary({
      ...summary(),
      sourcePath: 'private',
      landmarks: [1],
      accuracyValidated: true,
    });
    expect(result).not.toHaveProperty('sourcePath');
    expect(result).not.toHaveProperty('landmarks');
    expect(result).toMatchObject({ accuracyValidated: false, canonicalReceiptIssued: false });
    expect(() => validateParsingSummary({ ...summary(), methodVersion: 'other' })).toThrow();
    expect(() => validateParsingSummary({ ...summary(), interfacePixels: 1 })).toThrow();
    expect(() => validateParsingSummary({ ...summary(), counts: [n] })).toThrow();
  });
  it('accepts complete allowlisted mask batches and isolates failed captures', () => {
    const layers = Object.fromEntries(PARSING_GROUPS.map((g) => [g.id, png()]));
    const fail = {
      methodVersion: PARSING_VERSION,
      candidateOnly: true,
      status: 'failed',
      reason: 'PARSING_TIMEOUT',
    };
    const input = {
      methodVersion: PARSING_VERSION,
      records: [
        { captureRef: 'a', parsing: summary(), layers },
        { captureRef: 'b', parsing: fail },
      ],
    };
    const out = validateParsingBatch(input, ['a', 'b']);
    expect(out).toHaveLength(2);
    expect(Object.keys(out[0]!.layers)).toHaveLength(7);
    expect(out[1]!.layers).toEqual({});
    expect(() => validateParsingBatch(input, ['a', 'c'])).toThrow();
    expect(() =>
      validateParsingBatch({ ...input, records: [input.records[0], input.records[0]] }, ['a', 'b']),
    ).toThrow();
  });
  it('rejects source-colour pixels, malformed PNG and extra layer/source fields', () => {
    const layers = Object.fromEntries(PARSING_GROUPS.map((g) => [g.id, png()]));
    const input = (l: Record<string, string>) => ({
      methodVersion: PARSING_VERSION,
      records: [{ captureRef: 'a', parsing: summary(), layers: l }],
    });
    expect(() =>
      validateParsingBatch(input({ ...layers, hair: png([40, 60, 90, 255]) }), ['a']),
    ).toThrow();
    expect(() => validateParsingBatch(input({ ...layers, hair: 'AAAA' }), ['a'])).toThrow();
    expect(() => validateParsingBatch(input({ ...layers, original: png() }), ['a'])).toThrow();
    const originalPng = Buffer.from(layers.hair!, 'base64');
    const withText = Buffer.concat([
      originalPng.subarray(0, originalPng.length - 12),
      chunk('tEXt', Buffer.from('private')),
      originalPng.subarray(originalPng.length - 12),
    ]);
    expect(() =>
      validateParsingBatch(input({ ...layers, hair: withText.toString('base64') }), ['a']),
    ).toThrow();
    const bad = Buffer.from(layers.hair!, 'base64');
    bad[bad.length - 1] = bad[bad.length - 1]! ^ 1;
    expect(() =>
      validateParsingBatch(input({ ...layers, hair: bad.toString('base64') }), ['a']),
    ).toThrow();
  });
});
