import { measureVisibleBrowMaskEnvelope } from './visible-brow-mask-envelope.mjs';

// Image texture observability, not identification or counting of eyebrow hairs.
// Consume only a transient original-image RGB buffer and current brow class mask.
export const BROW_PIXEL_TEXTURE_VERSION = 'engineering.visible-brow-pixel-texture@0.1.0';
const policy = Object.freeze({
  candidateOnly: true,
  screenedModelMaskOnly: true,
  individualHairFibresIdentified: false,
  individualHairWidthMeasured: false,
  hairDensityMeasured: false,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const no = (reason) =>
  Object.freeze({
    methodVersion: BROW_PIXEL_TEXTURE_VERSION,
    status: 'unavailable',
    reason,
    ...policy,
  });

// These are brightness differences of encoded sRGB samples, NOT physical
// luminance, strand thickness, follicle count or a hair-density estimate.
function brightness(pixels, width, x, y) {
  const i = 4 * (y * width + x);
  if (pixels[i + 3] !== 255) return null;
  const r = pixels[i],
    g = pixels[i + 1],
    b = pixels[i + 2];
  if (![r, g, b].every((v) => Number.isInteger(v) && v >= 0 && v <= 255)) return null;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function occupiedColumnRuns(mask, width, height) {
  const ranges = [];
  let first = -1;
  for (let x = 0; x <= width; x++) {
    let hasPixel = false;
    if (x < width) {
      for (let y = 0; y < height && !hasPixel; y++) hasPixel = mask[y * width + x] === 1;
    }
    if (hasPixel && first < 0) first = x;
    if (!hasPixel && first >= 0) {
      ranges.push([first, x - 1]);
      first = -1;
    }
  }
  return ranges;
}

function measureSide(mask, width, height, pixels, imageWidth, imageHeight, range) {
  const [start, end] = range;
  let valid = 0,
    candidatePixels = 0,
    sumX = 0,
    sumY = 0;
  // Requiring the four mask neighbors avoids turning segmentation borders
  // and background skin transitions into alleged eyebrow-hair texture.
  for (let y = 1; y < height - 1; y++) {
    for (let x = Math.max(1, start + 1); x < Math.min(width - 1, end); x++) {
      const p = y * width + x;
      if (
        mask[p] !== 1 ||
        mask[p - 1] !== 1 ||
        mask[p + 1] !== 1 ||
        mask[p - width] !== 1 ||
        mask[p + width] !== 1
      )
        continue;
      candidatePixels++;
      const px = Math.floor(((x + 0.5) / width) * imageWidth);
      const py = Math.floor(((y + 0.5) / height) * imageHeight);
      if (px < 1 || px >= imageWidth - 1 || py < 1 || py >= imageHeight - 1) continue;
      const mid = brightness(pixels, imageWidth, px, py);
      const left = brightness(pixels, imageWidth, px - 1, py);
      const right = brightness(pixels, imageWidth, px + 1, py);
      const top = brightness(pixels, imageWidth, px, py - 1);
      const bottom = brightness(pixels, imageWidth, px, py + 1);
      if ([mid, left, right, top, bottom].some((v) => v === null)) continue;
      valid++;
      sumX += (Math.abs(mid - left) + Math.abs(mid - right)) / 2;
      sumY += (Math.abs(mid - top) + Math.abs(mid - bottom)) / 2;
    }
  }
  if (!candidatePixels)
    return Object.freeze({ status: 'unavailable', reason: 'NO_INTERIOR_MODEL_BROW_PIXELS' });
  if (!valid)
    return Object.freeze({ status: 'unavailable', reason: 'NO_VALID_ORIGINAL_IMAGE_NEIGHBORS' });
  return Object.freeze({
    status: valid === candidatePixels ? 'available' : 'partial',
    horizontalMeanAbsoluteSrgbBrightnessChange: sumX / valid,
    verticalMeanAbsoluteSrgbBrightnessChange: sumY / valid,
    validImagePixelPairs: valid,
    interiorModelMaskPixelsConsidered: candidatePixels,
    originalImageNeighborDistancePx: 1,
    localTextureOnly: true,
  });
}

export function measureVisibleBrowPixelTexture({
  mask,
  width,
  height,
  rgba,
  imageWidth,
  imageHeight,
  viewRole = 'frontal',
  browsScreened = false,
} = {}) {
  if (viewRole !== 'frontal') return no('FRONTAL_CAPTURE_REQUIRED');
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 3 ||
    height < 3 ||
    mask?.length !== width * height ||
    !Number.isInteger(imageWidth) ||
    !Number.isInteger(imageHeight) ||
    imageWidth < 3 ||
    imageHeight < 3 ||
    rgba?.length !== imageWidth * imageHeight * 4
  )
    throw Error('BROW_TEXTURE_INPUT_INVALID');
  if (browsScreened !== true) return no('BROW_MODEL_ALIGNMENT_UNSCREENED');
  if (imageWidth < width || imageHeight < height)
    return no('ORIGINAL_IMAGE_RESOLUTION_BELOW_MODEL_MASK');
  const envelope = measureVisibleBrowMaskEnvelope(mask, width, height, { imageWidth, imageHeight });
  if (envelope.status !== 'available') return no('MODEL_' + envelope.reason);
  const runs = occupiedColumnRuns(mask, width, height);
  if (runs.length !== 2) return no('BROW_MASK_SIDE_SEPARATION_INVALID');
  const [imageLeft, imageRight] = runs.map((range) =>
    measureSide(mask, width, height, rgba, imageWidth, imageHeight, range),
  );
  const valid = [imageLeft, imageRight].filter((v) => v.status !== 'unavailable');
  return Object.freeze({
    methodVersion: BROW_PIXEL_TEXTURE_VERSION,
    status:
      valid.length === 0
        ? 'unavailable'
        : valid.length === 2 && valid.every((s) => s.status === 'available')
          ? 'available'
          : 'partial',
    reason: valid.length ? null : 'NO_VISIBLE_BROW_TEXTURE_PIXELS',
    imageLeft,
    imageRight,
    ...policy,
  });
}
