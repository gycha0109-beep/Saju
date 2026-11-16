import { PARSING_LABELS } from './parsing-contract.mjs';
import { measureVisibleLipClassProfile } from './visible-lip-class-profile.mjs';

// Research-only full-frame source RGB samples INSIDE pinned visible lip classes.
// Pixel channel statistics are not calibrated human lip color, pigmentation,
// medical evidence, or an anatomical border measurement.
export const VISIBLE_LIP_PIXEL_COLOR_VERSION = 'engineering.visible-lip-pixel-color@0.1.0';
if (PARSING_LABELS[12] !== 'u_lip' || PARSING_LABELS[13] !== 'l_lip')
  throw Error('LIP_PIXEL_COLOR_LABEL_DRIFT');

const authority = Object.freeze({
  candidateOnly: true,
  sourceRgbResampledToParsingSize: true,
  colorCalibrated: false,
  whiteBalanceVerified: false,
  illuminationControlled: false,
  makeupExcluded: false,
  trueAnatomicalLipColorValidated: false,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const withheld = (reason) =>
  Object.freeze({
    methodVersion: VISIBLE_LIP_PIXEL_COLOR_VERSION,
    status: 'unavailable',
    reason,
    ...authority,
  });

function sampleInterior(mask, rgba, size, label) {
  let interior = 0,
    opaque = 0;
  let r = 0,
    g = 0,
    b = 0;
  let zeroOrClippedChannelPixels = 0;
  // Four neighboring pixels must carry the same lip class; segmentation
  // borders, teeth, outside skin and background are not sampled as lip color.
  for (let y = 1; y < size - 1; y++)
    for (let x = 1; x < size - 1; x++) {
      const p = y * size + x;
      if (
        mask[p] !== label ||
        mask[p - 1] !== label ||
        mask[p + 1] !== label ||
        mask[p - size] !== label ||
        mask[p + size] !== label
      )
        continue;
      interior++;
      const i = 4 * p;
      if (rgba[i + 3] !== 255) continue;
      opaque++;
      const cr = rgba[i],
        cg = rgba[i + 1],
        cb = rgba[i + 2];
      r += cr;
      g += cg;
      b += cb;
      if ([cr, cg, cb].some((v) => v === 0 || v === 255)) zeroOrClippedChannelPixels++;
    }
  if (!interior)
    return Object.freeze({ status: 'unavailable', reason: 'NO_INTERIOR_LIP_CLASS_PIXELS' });
  if (!opaque)
    return Object.freeze({ status: 'unavailable', reason: 'NO_OPAQUE_SOURCE_RGB_PIXELS' });
  return Object.freeze({
    status: opaque === interior ? 'available' : 'partial',
    meanEncodedSrgbChannels: Object.freeze([
      r / (opaque * 255),
      g / (opaque * 255),
      b / (opaque * 255),
    ]),
    imagePixelsSampled: opaque,
    interiorClassPixelsConsidered: interior,
    extremeChannelPixelFraction: zeroOrClippedChannelPixels / opaque,
    encodedSrgbOnly: true,
  });
}

export function measureVisibleLipPixelColor({ mask, rgba, size, viewRole, lipsScreened } = {}) {
  if (viewRole !== 'frontal') return withheld('FRONTAL_CAPTURE_REQUIRED');
  if (
    !Number.isInteger(size) ||
    size < 4 ||
    mask?.length !== size * size ||
    rgba?.length !== size * size * 4
  )
    throw Error('LIP_PIXEL_COLOR_INPUT_INVALID');
  if (lipsScreened !== true) return withheld('LIP_REGION_ALIGNMENT_UNSCREENED');
  const model = measureVisibleLipClassProfile(mask, size);
  if (model.status !== 'available') return withheld('MODEL_' + model.reason);
  const upper = sampleInterior(mask, rgba, size, 12);
  const lower = sampleInterior(mask, rgba, size, 13);
  const usable = [upper, lower].filter((r) => r.status !== 'unavailable');
  return Object.freeze({
    methodVersion: VISIBLE_LIP_PIXEL_COLOR_VERSION,
    status:
      usable.length === 0
        ? 'unavailable'
        : usable.length === 2 && usable.every((r) => r.status === 'available')
          ? 'available'
          : 'partial',
    reason: usable.length === 0 ? 'NO_INTERIOR_SOURCE_LIP_COLOR_PIXELS' : null,
    upper,
    lower,
    ...authority,
  });
}
