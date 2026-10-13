import { Buffer } from 'node:buffer';
import { inflateSync, crc32 } from 'node:zlib';
import { PARSING_VERSION, PARSING_GROUPS, validateParsingSummary } from './parsing-contract.mjs';
const names = PARSING_GROUPS.map((g) => g.id);
function validateMaskPixels(png, group) {
  const compressed = [];
  let offset = 8,
    ended = false;
  while (offset + 12 <= png.length) {
    const length = png.readUInt32BE(offset),
      kind = png.toString('ascii', offset + 4, offset + 8);
    if (length > png.length - offset - 12) throw Error('PARSING_LAYERS_INVALID');
    if (
      crc32(png.subarray(offset + 4, offset + 8 + length)) !== png.readUInt32BE(offset + 8 + length)
    )
      throw Error('PARSING_LAYERS_INVALID');
    if (kind === 'IDAT') compressed.push(png.subarray(offset + 8, offset + 8 + length));
    else if (kind === 'IEND') {
      if (length !== 0) throw Error('PARSING_LAYERS_INVALID');
      ended = true;
    } else if (kind !== 'IHDR' || offset !== 8) throw Error('PARSING_LAYERS_INVALID');
    offset += length + 12;
    if (ended) break;
  }
  if (
    !ended ||
    offset !== png.length ||
    !compressed.length ||
    png[26] !== 0 ||
    png[27] !== 0 ||
    png[28] !== 0
  )
    throw Error('PARSING_LAYERS_INVALID');
  const rowBytes = 512 * 4,
    expected = 512 * (rowBytes + 1);
  const raw = inflateSync(Buffer.concat(compressed), { maxOutputLength: expected });
  if (raw.length !== expected) throw Error('PARSING_LAYERS_INVALID');
  let previous = new Uint8Array(rowBytes);
  const alpha = 255;
  for (let y = 0; y < 512; y++) {
    const filter = raw[y * (rowBytes + 1)],
      row = new Uint8Array(rowBytes);
    if (filter > 4) throw Error('PARSING_LAYERS_INVALID');
    for (let x = 0; x < rowBytes; x++) {
      const a = x >= 4 ? row[x - 4] : 0,
        b = previous[x],
        c = x >= 4 ? previous[x - 4] : 0;
      let predicted = 0;
      if (filter === 1) predicted = a;
      if (filter === 2) predicted = b;
      if (filter === 3) predicted = Math.floor((a + b) / 2);
      if (filter === 4) {
        const p = a + b - c,
          pa = Math.abs(p - a),
          pb = Math.abs(p - b),
          pc = Math.abs(p - c);
        predicted = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      row[x] = raw[y * (rowBytes + 1) + 1 + x] + predicted;
    }
    for (let x = 0; x < rowBytes; x += 4) {
      if (row[x + 3] === 0) {
        if (row[x] || row[x + 1] || row[x + 2]) throw Error('PARSING_LAYERS_INVALID');
      } else if (row[x + 3] !== alpha || group.color.some((value, i) => row[x + i] !== value))
        throw Error('PARSING_LAYERS_INVALID');
    }
    previous = row;
  }
}
export function validateParsingBatch(input, ids) {
  if (
    !input ||
    input.methodVersion !== PARSING_VERSION ||
    !Array.isArray(input.records) ||
    input.records.length !== ids.length ||
    new Set(input.records.map((r) => r.captureRef)).size !== ids.length
  )
    throw Error('PARSING_BATCH_INVALID');
  return input.records.map((r) => {
    if (!ids.includes(r.captureRef)) throw Error('PARSING_BATCH_INVALID');
    const parsing = validateParsingSummary(r.parsing),
      layers = {};
    if (parsing.status === 'completed') {
      if (!r.layers || Object.keys(r.layers).length !== names.length)
        throw Error('PARSING_LAYERS_INVALID');
      for (const name of names) {
        const value = r.layers[name];
        if (
          typeof value !== 'string' ||
          value.length > 1000000 ||
          !/^[A-Za-z0-9+/]*={0,2}$/.test(value)
        )
          throw Error('PARSING_LAYERS_INVALID');
        const png = Buffer.from(value, 'base64');
        if (
          png.length < 33 ||
          png.toString('base64') !== value ||
          !png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
          png.readUInt32BE(8) !== 13 ||
          png.toString('ascii', 12, 16) !== 'IHDR' ||
          png.readUInt32BE(16) !== 512 ||
          png.readUInt32BE(20) !== 512 ||
          png[24] !== 8 ||
          png[25] !== 6
        )
          throw Error('PARSING_LAYERS_INVALID');
        validateMaskPixels(
          png,
          PARSING_GROUPS.find((g) => g.id === name),
        );
        layers[name] = png;
      }
    } else if (r.layers && Object.keys(r.layers).length) throw Error('PARSING_LAYERS_INVALID');
    return { captureRef: r.captureRef, parsing, layers };
  });
}
