// Private, transient RGB evidence from a manually closed, visible nostril rim.
// A dark interior is not proof of a nasal cavity; the outer/inner sides below
// refer only to a reviewed IMAGE-PLANE POLYGON, never anatomy.
export const NOSTRIL_BORDER_PHOTOMETRY_VERSION =
  'engineering.manual-nostril-rim-photometric-contrast@0.1.0';
const auth = Object.freeze({
  candidateOnly: true,
  manualContourRequired: true,
  anatomicalNostrilInteriorIdentified: false,
  anatomicalNostrilExteriorIdentified: false,
  anatomicalBoundaryAccuracyValidated: false,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const withheld = (reason) => Object.freeze({ status: 'unavailable', reason });
const validCoord = (n) => Number.isFinite(n) && n > 0 && n < 1;
const validPoint = (p) =>
  Array.isArray(p) && p.length === 2 && validCoord(p[0]) && validCoord(p[1]);
const xOf = (p, width) => p[0] * (width - 1);
const yOf = (p, height) => p[1] * (height - 1);
function intersect(a, b, c, d) {
  const orient = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
  const o1 = orient(a, b, c),
    o2 = orient(a, b, d);
  const o3 = orient(c, d, a),
    o4 = orient(c, d, b);
  return o1 * o2 < 0 && o3 * o4 < 0;
}
function inside(polygon, x, y) {
  let yes = false;
  for (let a = 0, b = polygon.length - 1; a < polygon.length; b = a++) {
    const py = polygon[a][1],
      qy = polygon[b][1];
    if (
      py > y !== qy > y &&
      x < ((polygon[b][0] - polygon[a][0]) * (y - py)) / (qy - py) + polygon[a][0]
    )
      yes = !yes;
  }
  return yes;
}
function pixelLuma(rgba, width, height, x, y) {
  if (!(x >= 0 && y >= 0 && x < width - 1 && y < height - 1)) return null;
  const ix = Math.floor(x),
    iy = Math.floor(y),
    dx = x - ix,
    dy = y - iy;
  let sum = 0;
  for (let row = 0; row <= 1; row++)
    for (let col = 0; col <= 1; col++) {
      const i = ((iy + row) * width + ix + col) * 4;
      const weight = (col ? dx : 1 - dx) * (row ? dy : 1 - dy);
      if (rgba[i + 3] !== 255) return null;
      sum += (weight * (0.2126 * rgba[i] + 0.7152 * rgba[i + 1] + 0.0722 * rgba[i + 2])) / 255;
    }
  return sum;
}
function sideContrast(part, side, rgba, width, height) {
  if (part?.status !== 'marked' || !Array.isArray(part.segments) || part.segments.length !== 1)
    return withheld('ONE_COMPLETE_MARKED_CONTOUR_REQUIRED');
  const raw = part.segments[0];
  if (!Array.isArray(raw) || raw.length < 5 || raw.length > 400 || !raw.every(validPoint))
    return withheld('CLOSED_CONTOUR_INVALID');
  if (raw.some((p) => (side === 'imageLeft' ? p[0] >= 0.5 : p[0] <= 0.5)))
    return withheld('IMAGE_SIDE_MISMATCH');
  const poly = raw.map((p) => [xOf(p, width), yOf(p, height)]);
  const closeDistance = Math.hypot(poly[0][0] - poly.at(-1)[0], poly[0][1] - poly.at(-1)[1]);
  if (closeDistance > 1.5) return withheld('VISIBLE_CLOSED_RIM_REQUIRED');
  poly[poly.length - 1] = [...poly[0]];
  const edges = poly.slice(0, -1).map((a, i) => {
    const b = poly[i + 1];
    const length = Math.hypot(a[0] - b[0], a[1] - b[1]);
    return { a, b, length };
  });
  if (edges.some((edge) => edge.length < 1)) return withheld('CONTOUR_EDGE_DEGENERATE');
  for (let i = 0; i < edges.length; i++)
    for (let j = i + 2; j < edges.length; j++) {
      if (i === 0 && j === edges.length - 1) continue;
      if (intersect(edges[i].a, edges[i].b, edges[j].a, edges[j].b))
        return withheld('CONTOUR_SELF_INTERSECTION');
    }
  const area = Math.abs(edges.reduce((sum, { a, b }) => sum + a[0] * b[1] - b[0] * a[1], 0)) / 2;
  if (!(area >= 12)) return withheld('CONTOUR_AREA_TOO_SMALL_FOR_PIXELS');
  const perimeter = edges.reduce((s, e) => s + e.length, 0);
  const samples = [];
  for (const fraction of [0.125, 0.375, 0.625, 0.875]) {
    let distance = perimeter * fraction;
    let edge = edges.at(-1);
    for (const candidate of edges) {
      if (distance <= candidate.length) {
        edge = candidate;
        break;
      }
      distance -= candidate.length;
    }
    const along = Math.min(1, distance / edge.length);
    const midX = edge.a[0] + (edge.b[0] - edge.a[0]) * along;
    const midY = edge.a[1] + (edge.b[1] - edge.a[1]) * along;
    const nx = -(edge.b[1] - edge.a[1]) / edge.length;
    const ny = (edge.b[0] - edge.a[0]) / edge.length;
    const first = [midX + 2 * nx, midY + 2 * ny];
    const second = [midX - 2 * nx, midY - 2 * ny];
    const firstInside = inside(poly, first[0], first[1]);
    const secondInside = inside(poly, second[0], second[1]);
    if (firstInside === secondInside) continue;
    const inner = firstInside ? first : second;
    const outer = firstInside ? second : first;
    const innerLuma = pixelLuma(rgba, width, height, ...inner);
    const outerLuma = pixelLuma(rgba, width, height, ...outer);
    if (innerLuma === null || outerLuma === null) continue;
    samples.push(outerLuma - innerLuma);
  }
  if (samples.length < 3) return withheld('INSUFFICIENT_VISIBLE_INNER_OUTER_PIXEL_PAIRS');
  return Object.freeze({
    status: samples.length === 4 ? 'available' : 'partial',
    comparedPairs: samples.length,
    totalAttemptedPairs: 4,
    meanOutsideMinusInsideSrgbLuma: samples.reduce((sum, n) => sum + n, 0) / samples.length,
    meanAbsoluteSrgbLumaDifference:
      samples.reduce((sum, n) => sum + Math.abs(n), 0) / samples.length,
    photoSamplingOnly: true,
  });
}
export function measureHumanMarkedNostrilBorderPhotometry({ rgba, width, height, human }) {
  const base = { methodVersion: NOSTRIL_BORDER_PHOTOMETRY_VERSION, ...auth };
  const fail = (reason) => Object.freeze({ ...base, status: 'unavailable', reason });
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 40 ||
    height < 40 ||
    rgba?.length !== width * height * 4
  )
    throw Error('NOSTRIL_IMAGE_FRAME_INVALID');
  if (!human) return fail('HUMAN_NOSE_REVIEW_NOT_RECORDED');
  if (
    human.humanReviewed !== true ||
    human.independentAccuracyValidated !== false ||
    human.canonicalF0Admitted !== false ||
    human.traditionalBindingAuthorized !== false ||
    human.productInterpretationAuthorized !== false ||
    human.modelTrainingAuthorized !== false
  )
    return fail('HUMAN_REVIEW_AUTHORITY_INVALID');
  const imageLeft = sideContrast(human.imageLeftNostril, 'imageLeft', rgba, width, height);
  const imageRight = sideContrast(human.imageRightNostril, 'imageRight', rgba, width, height);
  const evaluated = [imageLeft, imageRight].filter((side) => side.status !== 'unavailable');
  return Object.freeze({
    ...base,
    status:
      evaluated.length === 0
        ? 'unavailable'
        : evaluated.length === 2 && evaluated.every((r) => r.status === 'available')
          ? 'available'
          : 'partial',
    reason: evaluated.length === 0 ? 'NO_COMPARABLE_VISIBLE_NOSTRIL_CONTOUR' : null,
    imageLeft,
    imageRight,
  });
}
