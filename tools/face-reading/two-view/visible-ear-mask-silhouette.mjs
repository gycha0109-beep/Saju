// Candidate-only whole-ear region silhouette from the existing pinned ResNet18 parser.
// This DOES NOT distinguish outer helix, lobe, attachment, thickness or projection.
export const VISIBLE_EAR_MASK_SILHOUETTE_VERSION = 'engineering.visible-ear-mask-silhouette@0.1.0';
const source = 'pinned_face_parsing_ear_rgba_overlay';
function unavailable(reason) {
  return Object.freeze({
    methodVersion: VISIBLE_EAR_MASK_SILHOUETTE_VERSION,
    source,
    status: 'unavailable',
    reason,
    regions: Object.freeze([]),
    candidateOnly: true,
    anatomicalLateralityAssigned: false,
    helixIdentified: false,
    lobeIdentified: false,
    attachmentIdentified: false,
    projectionMeasured: false,
    thicknessMeasured: false,
    independentAccuracyValidated: false,
    traditionalBindingAuthorized: false,
  });
}
export function earBinaryFromOverlayRGBA(rgba, width, height) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 2 ||
    height < 2 ||
    rgba?.length !== width * height * 4
  )
    throw Error('EAR_OVERLAY_INVALID');
  const binary = new Uint8Array(width * height);
  for (let i = 0; i < binary.length; i++) {
    const k = i * 4;
    const r = rgba[k],
      g = rgba[k + 1],
      b = rgba[k + 2],
      a = rgba[k + 3];
    if (r === 0 && g === 0 && b === 0 && a === 0) continue;
    if (r !== 255 || g !== 190 || b !== 65 || a !== 255) throw Error('EAR_OVERLAY_INVALID');
    binary[i] = 1;
  }
  return binary;
}
export function measureVisibleEarMaskSilhouette(
  mask,
  width,
  height,
  { imageWidth = width, imageHeight = height } = {},
) {
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 2 ||
    height < 2 ||
    mask?.length !== width * height ||
    !(
      imageWidth > 0 &&
      imageHeight > 0 &&
      Number.isFinite(imageWidth) &&
      Number.isFinite(imageHeight)
    ) ||
    Array.from(mask).some((v) => v !== 0 && v !== 1)
  )
    throw Error('EAR_MASK_INVALID');
  const visited = new Uint8Array(mask.length);
  const queue = new Int32Array(mask.length);
  const components = [];
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i] || visited[i]) continue;
    let head = 0,
      tail = 1,
      pixels = 0;
    let minX = width,
      minY = height,
      maxX = -1,
      maxY = -1;
    let sumX = 0,
      sumY = 0;
    queue[0] = i;
    visited[i] = 1;
    while (head < tail) {
      const index = queue[head++];
      const x = index % width,
        y = Math.floor(index / width);
      pixels++;
      sumX += x + 0.5;
      sumY += y + 0.5;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      for (let dy = -1; dy <= 1; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= height) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= width || (dx === 0 && dy === 0)) continue;
          const next = yy * width + xx;
          if (mask[next] && !visited[next]) {
            visited[next] = 1;
            queue[tail++] = next;
          }
        }
      }
    }
    components.push({
      pixels,
      minX,
      minY,
      maxX,
      maxY,
      centerX: sumX / pixels / width,
      centerY: sumY / pixels / height,
    });
    if (components.length > 2) return unavailable('FRAGMENTED_OR_MULTIPLE_EAR_REGIONS');
  }
  if (!components.length) return unavailable('NO_EAR_MASK_REGION');
  components.sort((a, b) => a.centerX - b.centerX);
  if (components.length === 2 && components[0].maxX >= components[1].minX)
    return unavailable('OVERLAPPING_IMAGE_SIDE_REGIONS');
  const regions = components.map((r, index) => {
    const clipped = r.minX === 0 || r.minY === 0 || r.maxX === width - 1 || r.maxY === height - 1;
    return Object.freeze({
      imageOrder: index + 1,
      status: clipped ? 'partial' : 'available',
      reason: clipped ? 'IMAGE_EDGE_CLIPPED' : null,
      visibleMaskWidthToImageWidth: (r.maxX - r.minX + 1) / width,
      visibleMaskHeightToImageHeight: (r.maxY - r.minY + 1) / height,
      visibleMaskAreaToImageArea: r.pixels / (width * height),
      centerXToImageWidth: r.centerX,
      centerYToImageHeight: r.centerY,
    });
  });
  return Object.freeze({
    methodVersion: VISIBLE_EAR_MASK_SILHOUETTE_VERSION,
    source,
    status: regions.some((r) => r.status === 'partial') ? 'partial' : 'available',
    reason: null,
    regions: Object.freeze(regions),
    candidateOnly: true,
    anatomicalLateralityAssigned: false,
    helixIdentified: false,
    lobeIdentified: false,
    attachmentIdentified: false,
    projectionMeasured: false,
    thicknessMeasured: false,
    independentAccuracyValidated: false,
    traditionalBindingAuthorized: false,
  });
}
