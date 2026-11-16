import { PARSING_LABELS } from './parsing-contract.mjs';

// Transient screen-plane research candidate: visible skin ABOVE the model brows,
// bounded by the model face oval. It is not a true forehead/hairline classifier.
export const FOREHEAD_SKIN_BAND_VERSION = 'engineering.visible-forehead-skin-band@0.1.0';
if (PARSING_LABELS[1] !== 'skin' || PARSING_LABELS[17] !== 'hair')
  throw Error('FOREHEAD_PARSING_LABEL_DRIFT');

const source = 'pinned_crop_skin_hair_classes_with_brow_and_oval_model_frame';
const authority = Object.freeze({
  candidateOnly: true,
  independentAccuracyValidated: false,
  anatomicalForeheadBoundaryValidated: false,
  anatomicalHairlineAuthorized: false,
  hiddenForeheadCompleted: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const unavailable = (reason) =>
  Object.freeze({
    methodVersion: FOREHEAD_SKIN_BAND_VERSION,
    source,
    status: 'unavailable',
    reason,
    ...authority,
  });
const sampledFractions = Object.freeze([0.25, 0.5, 0.75]);
const validDimension = (value) => Number.isFinite(value) && value > 0;
const finitePoint = (p) =>
  p && Number.isFinite(p.x) && Number.isFinite(p.y) && p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1;

function indices(edges) {
  if (!Array.isArray(edges) || edges.length === 0) return null;
  const set = new Set();
  for (const edge of edges) {
    if (
      !Number.isInteger(edge?.start) ||
      !Number.isInteger(edge?.end) ||
      edge.start < 0 ||
      edge.end < 0 ||
      edge.start >= 478 ||
      edge.end >= 478
    )
      return null;
    set.add(edge.start);
    set.add(edge.end);
  }
  return [...set];
}

export function measureVisibleForeheadSkinBand({
  mask,
  size,
  landmarks,
  topology,
  frame,
  imageWidth,
  imageHeight,
  viewRole,
  browsAligned,
}) {
  if (viewRole !== 'frontal') return unavailable('FRONTAL_CAPTURE_REQUIRED');
  if (
    !Number.isInteger(size) ||
    size < 8 ||
    mask?.length !== size * size ||
    !Array.from(mask).every(
      (label) => Number.isInteger(label) && label >= 0 && label < PARSING_LABELS.length,
    )
  )
    throw Error('FOREHEAD_SKIN_MASK_INVALID');
  if (browsAligned !== true) return unavailable('BROW_CLASS_ALIGNMENT_UNAVAILABLE');
  if (
    !Array.isArray(landmarks) ||
    landmarks.length !== 478 ||
    !validDimension(imageWidth) ||
    !validDimension(imageHeight) ||
    ![frame?.left, frame?.top, frame?.side].every(Number.isFinite) ||
    !validDimension(frame.side)
  )
    return unavailable('MODEL_FRAME_UNAVAILABLE');
  const browA = indices(topology?.browA);
  const browB = indices(topology?.browB);
  const oval = indices(topology?.oval);
  if (
    !browA ||
    !browB ||
    !oval ||
    [browA, browB, oval].some((ids) => ids.some((i) => !finitePoint(landmarks[i])))
  )
    return unavailable('MODEL_TOPOLOGY_UNAVAILABLE');

  const toCrop = (index) => {
    const p = landmarks[index];
    return {
      x: ((p.x * imageWidth - frame.left) * size) / frame.side,
      y: ((p.y * imageHeight - frame.top) * size) / frame.side,
    };
  };
  const brows = [...browA, ...browB].map(toCrop);
  const ovalTop = Math.min(...oval.map((i) => toCrop(i).y));
  // Only the forehead strip INSIDE the model oval and ABOVE both eyebrows.
  const xMin = Math.ceil(Math.min(...brows.map((p) => p.x)));
  const xMax = Math.floor(Math.max(...brows.map((p) => p.x)));
  const yMin = Math.ceil(ovalTop) + 1;
  const yMax = Math.floor(Math.min(...brows.map((p) => p.y))) - 1;
  if (xMax - xMin < 4 || yMax - yMin < 2) return unavailable('MODEL_FOREHEAD_STRIP_DEGENERATE');
  if (xMin <= 0 || yMin <= 0 || xMax >= size - 1 || yMax >= size - 1)
    return unavailable('MODEL_STRIP_OUTSIDE_CROP');
  const inPhoto = (x, y) => {
    const px = frame.left + ((x + 0.5) / size) * frame.side;
    const py = frame.top + ((y + 0.5) / size) * frame.side;
    return px > 0 && px < imageWidth && py > 0 && py < imageHeight;
  };
  if (!inPhoto(xMin, yMin) || !inPhoto(xMax, yMax))
    return unavailable('MODEL_STRIP_OUTSIDE_ORIGINAL');
  const bands = Array.from({ length: 3 }, () => ({ skin: 0, hair: 0, other: 0 }));
  for (let x = xMin; x <= xMax; x++) {
    const band = bands[Math.min(2, Math.floor((3 * (x - xMin)) / (xMax - xMin + 1)))];
    for (let y = yMin; y <= yMax; y++) {
      const label = mask[y * size + x];
      if (label === 1) band.skin++;
      else if (label === 17) band.hair++;
      else band.other++;
    }
  }
  const sections = bands.map(({ skin, hair, other }) =>
    Object.freeze({
      visibleModelSkinFraction: skin / (skin + hair + other),
      modelHairFraction: hair / (skin + hair + other),
      unknownOtherFraction: other / (skin + hair + other),
      modelSkinPresent: skin > 0,
    }),
  );
  if (bands.every((band) => band.skin === 0)) return unavailable('NO_MODEL_SKIN_IN_FOREHEAD_STRIP');

  const samples = sampledFractions.map((fraction) => {
    const x = Math.round(xMin + fraction * (xMax - xMin));
    if (mask[yMax * size + x] !== 1)
      return Object.freeze({ status: 'unavailable', reason: 'SKIN_NOT_VISIBLE_ABOVE_BROW' });
    let y = yMax;
    while (y >= yMin && mask[y * size + x] === 1) y--;
    if (y < yMin)
      return Object.freeze({ status: 'partial', reason: 'UPPER_MODEL_OVAL_LIMIT_REACHED' });
    if (mask[y * size + x] !== 17)
      return Object.freeze({ status: 'partial', reason: 'UPPER_SKIN_INTERRUPTED_BY_OTHER_CLASS' });
    const sourceY = frame.top + ((y + 1.5) / size) * frame.side;
    if (!(sourceY > 0 && sourceY < imageHeight))
      return Object.freeze({ status: 'unavailable', reason: 'PROJECTED_CONTACT_OUTSIDE_ORIGINAL' });
    return Object.freeze({
      status: 'available',
      contact: 'model_hair_skin_boundary_candidate',
      visibleSkinContactYToOriginalImageHeight: sourceY / imageHeight,
    });
  });
  const compared = samples.filter((sample) => sample.status === 'available');
  const status =
    compared.length === 3 && sections.every((s) => s.modelSkinPresent) ? 'available' : 'partial';
  return Object.freeze({
    methodVersion: FOREHEAD_SKIN_BAND_VERSION,
    source,
    status,
    reason: status === 'partial' ? 'PARTIAL_VISIBLE_MODEL_SKIN_OR_CONTACT' : null,
    sampledHorizontalFractions: sampledFractions,
    sectors: Object.freeze(sections),
    modelContacts: Object.freeze(samples),
    maskCropFrameOnly: true,
    ...authority,
  });
}
