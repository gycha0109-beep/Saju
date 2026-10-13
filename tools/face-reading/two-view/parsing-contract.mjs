export const PARSING_VERSION = 'engineering.face-parsing.yakhyo-resnet18@0.1.0';
export const PARSING_PIN = Object.freeze({
  repository: 'yakhyo/face-parsing',
  sourceRevision: '8a4729d95118d0e97c44185f9bdef3d6bfeaaf99',
  release: 'v0.0.2',
  asset: 'resnet18.onnx',
  sha256: '0d9bd318e46987c3bdbfacae9e2c0f461cae1c6ac6ea6d43bbe541a91727e33f',
  runtime: '1.23.2',
  size: 512,
});
// Provider label order. l/r names are never promoted to anatomical laterality.
export const PARSING_LABELS = Object.freeze([
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
export const PARSING_GROUPS = Object.freeze([
  { id: 'hair', label: '머리카락', classes: [17], color: [255, 95, 70] },
  { id: 'skin', label: '피부', classes: [1], color: [90, 210, 215] },
  { id: 'ears', label: '귀 후보', classes: [7, 8], color: [255, 190, 65] },
  { id: 'brows', label: '눈썹', classes: [2, 3], color: [70, 245, 130] },
  { id: 'lips', label: '입술', classes: [12, 13], color: [255, 85, 190] },
  { id: 'nose', label: '코', classes: [10], color: [145, 140, 255] },
  { id: 'interface', label: '머리–피부 접경', classes: [], color: [255, 45, 45] },
]);
export function containSize(imageWidth, imageHeight, viewportWidth, viewportHeight) {
  if (
    [imageWidth, imageHeight, viewportWidth, viewportHeight].some(
      (n) => !Number.isFinite(n) || n <= 0,
    )
  )
    throw Error('PARSING_DISPLAY_INVALID');
  const scale = Math.min(viewportWidth / imageWidth, viewportHeight / imageHeight);
  return { width: imageWidth * scale, height: imageHeight * scale };
}
export function rgbTensor(rgba, width, height) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width <= 0 ||
    height <= 0 ||
    rgba.length !== width * height * 4
  )
    throw Error('PARSING_INPUT_INVALID');
  const n = width * height,
    out = new Float32Array(n * 3);
  const mean = [0.485, 0.456, 0.406],
    std = [0.229, 0.224, 0.225];
  for (let c = 0; c < 3; c++)
    for (let p = 0; p < n; p++) out[c * n + p] = (rgba[p * 4 + c] / 255 - mean[c]) / std[c];
  return out;
}
export function classifyLogits(data, dims) {
  const size = PARSING_PIN.size,
    n = size * size;
  if (!Array.isArray(dims) || dims.join(',') !== `1,19,${size},${size}` || data.length !== 19 * n)
    throw Error('PARSING_OUTPUT_INVALID');
  const mask = new Uint8Array(n),
    counts = Array(19).fill(0);
  for (let p = 0; p < n; p++) {
    let best = -Infinity,
      label = 0;
    for (let c = 0; c < 19; c++) {
      const value = data[c * n + p];
      if (!Number.isFinite(value)) throw Error('PARSING_OUTPUT_INVALID');
      if (value > best) {
        best = value;
        label = c;
      }
    }
    mask[p] = label;
    counts[label]++;
  }
  return { mask, counts };
}
export function contactPixels(mask, width, height) {
  if (mask.length !== width * height || mask.some((n) => n > 18))
    throw Error('PARSING_MASK_INVALID');
  const contact = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (mask[p] !== 1) continue;
      if (
        (x > 0 && mask[p - 1] === 17) ||
        (x + 1 < width && mask[p + 1] === 17) ||
        (y > 0 && mask[p - width] === 17) ||
        (y + 1 < height && mask[p + width] === 17)
      )
        contact[p] = 1;
    }
  return contact;
}
export function validateParsingSummary(input) {
  if (!input || input.methodVersion !== PARSING_VERSION || input.candidateOnly !== true)
    throw Error('PARSING_SUMMARY_INVALID');
  if (
    input.status === 'failed' &&
    ['PARSING_FAILED', 'PARSING_TIMEOUT', 'PARSING_MODEL_UNAVAILABLE'].includes(input.reason)
  )
    return {
      methodVersion: PARSING_VERSION,
      candidateOnly: true,
      status: 'failed',
      reason: input.reason,
    };
  if (
    input.status !== 'completed' ||
    !Array.isArray(input.counts) ||
    input.counts.length !== 19 ||
    input.counts.some((n) => !Number.isInteger(n) || n < 0) ||
    input.counts.reduce((a, b) => a + b, 0) !== 512 * 512 ||
    !Number.isInteger(input.interfacePixels) ||
    input.interfacePixels < 0 ||
    input.interfacePixels > input.counts[1]
  )
    throw Error('PARSING_SUMMARY_INVALID');
  return {
    methodVersion: PARSING_VERSION,
    candidateOnly: true,
    status: 'completed',
    counts: [...input.counts],
    interfacePixels: input.interfacePixels,
    accuracyValidated: false,
    canonicalReceiptIssued: false,
  };
}
