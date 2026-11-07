// Research-only view of the existing pinned hair/skin segmentation contact layer.
// The interface can be hair hanging over the face, not the anatomical hairline.
export const VISIBLE_HAIR_SKIN_INTERFACE_VERSION = 'engineering.hair-skin-visible-contact@0.1.0';

function unavailable(reason) {
  return Object.freeze({
    methodVersion: VISIBLE_HAIR_SKIN_INTERFACE_VERSION,
    status: 'unavailable',
    reason,
    visibleColumns: 0,
    coverageFractionOfImageWidth: 0,
    segments: Object.freeze([]),
    source: 'existing_pinned_hair_skin_contact_overlay',
    candidateOnly: true,
    anatomicalHairlineAuthorized: false,
    foreheadHeightMeasured: false,
    validatedHumanAccuracy: false,
    canonicalF0Admitted: false,
    traditionalF1BindingAuthorized: false,
  });
}
export function interfaceBinaryFromOverlayRGBA(rgba, width, height) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 2 ||
    height < 2 ||
    rgba?.length !== width * height * 4
  )
    throw Error('HAIR_SKIN_INTERFACE_OVERLAY_INVALID');
  const binary = new Uint8Array(width * height);
  for (let i = 0; i < binary.length; i++) {
    const p = i * 4;
    const alpha = rgba[p + 3];
    if (alpha === 0 && rgba[p] === 0 && rgba[p + 1] === 0 && rgba[p + 2] === 0) continue;
    if (rgba[p] !== 255 || rgba[p + 1] !== 45 || rgba[p + 2] !== 45 || alpha !== 255)
      throw Error('HAIR_SKIN_INTERFACE_OVERLAY_INVALID');
    binary[i] = 1;
  }
  return binary;
}
export function measureVisibleHairSkinInterface(mask, width, height) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 2 ||
    height < 2 ||
    mask?.length !== width * height ||
    Array.from(mask).some((value) => value !== 0 && value !== 1)
  )
    throw Error('HAIR_SKIN_INTERFACE_MASK_INVALID');
  const columns = [];
  let splitColumns = 0;
  for (let x = 0; x < width; x++) {
    const ys = [];
    for (let y = 0; y < height; y++) if (mask[y * width + x] === 1) ys.push(y);
    if (!ys.length) continue;
    if (ys.some((y, i) => i && y - ys[i - 1] > 2)) splitColumns++;
    columns.push({
      x,
      yMin: ys[0],
      yMax: ys[ys.length - 1],
      yMean: ys.reduce((a, b) => a + b + 0.5, 0) / ys.length,
    });
  }
  if (!columns.length) return unavailable('NO_HAIR_SKIN_INTERFACE_CONTACT');
  const segments = [];
  let current = [columns[0]];
  for (let i = 1; i < columns.length; i++) {
    if (columns[i].x !== columns[i - 1].x + 1) {
      segments.push(current);
      current = [];
    }
    current.push(columns[i]);
  }
  segments.push(current);
  if (segments.length > 12) return unavailable('FRAGMENTED_CONTACT_COLUMNS');
  const clipped =
    columns[0].x === 0 ||
    columns[columns.length - 1].x === width - 1 ||
    columns.some((p) => p.yMin === 0 || p.yMax === height - 1);
  const fragment = segments.length !== 1 || splitColumns > 0;
  const status = clipped || fragment ? 'partial' : 'available';
  const reason = clipped
    ? 'CONTACT_AT_IMAGE_BOUNDARY'
    : splitColumns > 0
      ? 'MULTIPLE_VERTICAL_CONTACTS'
      : segments.length > 1
        ? 'DISCONNECTED_CONTACT_SEGMENTS'
        : null;
  return Object.freeze({
    methodVersion: VISIBLE_HAIR_SKIN_INTERFACE_VERSION,
    status,
    reason,
    visibleColumns: columns.length,
    coverageFractionOfImageWidth: columns.length / width,
    segments: Object.freeze(
      segments.map((items) =>
        Object.freeze({
          startXToImageWidth: items[0].x / width,
          endXToImageWidth: (items[items.length - 1].x + 1) / width,
          minContactYToImageHeight: Math.min(...items.map((p) => p.yMin)) / height,
          maxContactYToImageHeight: (Math.max(...items.map((p) => p.yMax)) + 1) / height,
          meanContactYToImageHeight:
            items.reduce((sum, p) => sum + p.yMean, 0) / items.length / height,
          visibleColumns: items.length,
        }),
      ),
    ),
    source: 'existing_pinned_hair_skin_contact_overlay',
    candidateOnly: true,
    anatomicalHairlineAuthorized: false,
    foreheadHeightMeasured: false,
    validatedHumanAccuracy: false,
    canonicalF0Admitted: false,
    traditionalF1BindingAuthorized: false,
  });
}

/**
 * Bridges only a fully contiguous visible contact to the PRE-EXISTING private
 * hairline-boundary-reference comparator. The comparator must separately check
 * a real original-source SHA-256; this helper does not verify or expose sources.
 * The projected model line remains a segmentation candidate, never a true hairline.
 */
export function toExistingHairlineBoundaryCandidate(mask, width, height, imageWidth, imageHeight) {
  if (
    !Number.isInteger(imageWidth) ||
    !Number.isInteger(imageHeight) ||
    imageWidth < 2 ||
    imageHeight < 2
  )
    throw Error('HAIR_SKIN_INTERFACE_IMAGE_FRAME_INVALID');
  const summary = measureVisibleHairSkinInterface(mask, width, height);
  const withheld = () =>
    Object.freeze({
      candidateBoundaryExposed: false,
      boundaryPoints: Object.freeze([]),
      engineeringPreviewState: 'withheld',
      automaticAdmissionAuthorized: false,
      neutralRuntimeHairlineObservationAuthorized: false,
    });
  if (summary.status !== 'available' || summary.segments.length !== 1 || summary.visibleColumns < 2)
    return withheld();
  const points = [];
  for (let x = 0; x < width; x++) {
    const rows = [];
    for (let y = 0; y < height; y++) {
      if (mask[y * width + x]) rows.push(y);
    }
    if (!rows.length) continue;
    const mean = rows.reduce((sum, y) => sum + y + 0.5, 0) / rows.length;
    const px = Math.max(0, Math.min(imageWidth - 1, ((x + 0.5) / width) * imageWidth - 0.5));
    const py = Math.max(0, Math.min(imageHeight - 1, (mean / height) * imageHeight - 0.5));
    points.push(Object.freeze([px, py]));
  }
  return Object.freeze({
    candidateBoundaryExposed: true,
    boundaryPoints: Object.freeze(points),
    engineeringPreviewState: 'visible_interface_candidate',
    automaticAdmissionAuthorized: false,
    neutralRuntimeHairlineObservationAuthorized: false,
  });
}
