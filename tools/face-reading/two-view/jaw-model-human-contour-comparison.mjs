import { modelCycle } from './frontal-metrics.mjs';

// The five screen-plane envelope samples are transient research proxies,
// not raw 478 landmarks, an anatomical mandible, 3D depth, or model accuracy.
export const JAW_MODEL_HUMAN_COMPARISON_VERSION =
  'engineering.lower-face-oval-vs-human-visible-contour@0.1.0';
export const JAW_MODEL_ENVELOPE_VERSION = 'engineering.pinned-oval-lower-envelope@0.1.0';
const FRACTIONS = Object.freeze([0.25, 0.375, 0.5, 0.625, 0.75]);
const flags = Object.freeze({
  candidateOnly: true,
  anatomicalJawValidated: false,
  boneShapeInferred: false,
  independentAccuracyValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});
const withheld = (reason) => Object.freeze({ status: 'unavailable', reason, ...flags });
const validNumber = (x) => typeof x === 'number' && Number.isFinite(x) && x > 0 && x < 1;
const validPoint = (p) => Array.isArray(p) && p.length === 2 && p.every(validNumber);

function yAtX(line, x) {
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1];
    const b = line[i];
    if (x < Math.min(a[0], b[0]) || x > Math.max(a[0], b[0])) continue;
    return a[1] + ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]);
  }
  return null;
}

// This runs INSIDE the landmarks worker. Raw landmarks and topology never leave
// the worker; the five *sampled* class extrema exist in the browser session only.
export function sampleModelLowerOvalEnvelope({ landmarks, topology, width, height, viewRole }) {
  const fail = (reason) =>
    Object.freeze({ methodVersion: JAW_MODEL_ENVELOPE_VERSION, ...withheld(reason) });
  if (viewRole !== 'frontal') return fail('FRONTAL_CAPTURE_REQUIRED');
  if (
    !Array.isArray(landmarks) ||
    landmarks.length !== 478 ||
    ![width, height].every((n) => Number.isFinite(n) && n > 0) ||
    landmarks.some((p) => !Number.isFinite(p?.x) || !Number.isFinite(p?.y)) ||
    !Array.isArray(topology?.mouth)
  )
    return fail('MODEL_LANDMARKS_UNAVAILABLE');
  let oval;
  try {
    oval = modelCycle(topology.oval, landmarks, width, height);
  } catch {
    return fail('MODEL_OVAL_TOPOLOGY_INVALID');
  }
  if (oval.some((p) => p.clipped)) return fail('MODEL_OVAL_CLIPPED');
  const mouthIds = [...new Set(topology.mouth.flatMap((edge) => [edge.start, edge.end]))];
  if (!mouthIds.length || mouthIds.some((i) => !Number.isInteger(i) || i < 0 || i >= 478))
    return fail('MODEL_MOUTH_REFERENCE_UNAVAILABLE');
  const mouthY = mouthIds.reduce((sum, i) => sum + landmarks[i].y, 0) / mouthIds.length;
  const minX = Math.min(...oval.map((p) => p.x / width));
  const maxX = Math.max(...oval.map((p) => p.x / width));
  if (!(minX > 0 && maxX < 1 && maxX > minX && validNumber(mouthY)))
    return fail('MODEL_OVAL_RANGE_INVALID');
  const points = oval.map((p) => [p.x / width, p.y / height]);
  const samples = [];
  for (const fraction of FRACTIONS) {
    const x = minX + fraction * (maxX - minX);
    const intersections = [];
    for (let i = 0; i < points.length; i++) {
      const a = points[i],
        b = points[(i + 1) % points.length];
      if ((a[0] <= x && x < b[0]) || (b[0] <= x && x < a[0]))
        intersections.push(a[1] + ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]));
    }
    // A usable model lower silhouette requires exactly two finite crossings.
    if (intersections.length !== 2 || !intersections.every(validNumber))
      return fail('MODEL_OVAL_SECTION_AMBIGUOUS');
    const lower = Math.max(...intersections);
    if (!(lower > mouthY)) return fail('MODEL_LOWER_FACE_NOT_BELOW_MOUTH');
    samples.push(Object.freeze([x, lower]));
  }
  return Object.freeze({
    methodVersion: JAW_MODEL_ENVELOPE_VERSION,
    source: 'pinned_face_landmarker_face_oval',
    status: 'available',
    coordinateFrame: 'normalized_original_image_screen_plane',
    points: Object.freeze(samples),
    sampledOnlyNotRawLandmarks: true,
    ...flags,
  });
}

export function compareModelJawEnvelopeWithHumanContour(model, human) {
  const fail = (reason) =>
    Object.freeze({
      methodVersion: JAW_MODEL_HUMAN_COMPARISON_VERSION,
      ...withheld(reason),
    });
  if (!human) return fail('HUMAN_JAW_CONTOUR_NOT_RECORDED');
  if (
    human.humanReviewed !== true ||
    human.actualJawAnatomyValidated !== false ||
    human.boneShapeInferred !== false ||
    human.independentAccuracyValidated !== false ||
    human.canonicalF0Admitted !== false ||
    human.traditionalBindingAuthorized !== false ||
    human.productInterpretationAuthorized !== false ||
    human.modelTrainingAuthorized !== false
  )
    return fail('HUMAN_AUTHORITY_INVALID');
  const drawing = human.visibleLowerFaceOutline;
  if (
    !['marked', 'partial'].includes(drawing?.status) ||
    !Array.isArray(drawing.segments) ||
    drawing.segments.length !== 1
  )
    return fail('SINGLE_VISIBLE_HUMAN_STROKE_REQUIRED');
  const line = drawing.segments[0];
  if (!Array.isArray(line) || line.length < 2 || line.length > 400 || !line.every(validPoint))
    return fail('HUMAN_STROKE_INVALID');
  const direction = Math.sign(line[1][0] - line[0][0]);
  if (!direction || line.some((p, i) => i > 0 && Math.sign(p[0] - line[i - 1][0]) !== direction))
    return fail('HUMAN_STROKE_NONMONOTONIC');
  if (
    model?.status !== 'available' ||
    model.methodVersion !== JAW_MODEL_ENVELOPE_VERSION ||
    model.source !== 'pinned_face_landmarker_face_oval' ||
    model.coordinateFrame !== 'normalized_original_image_screen_plane' ||
    model.sampledOnlyNotRawLandmarks !== true ||
    model.candidateOnly !== true ||
    model.anatomicalJawValidated !== false ||
    model.boneShapeInferred !== false ||
    model.independentAccuracyValidated !== false ||
    model.canonicalF0Admitted !== false ||
    model.traditionalBindingAuthorized !== false ||
    model.productInterpretationAuthorized !== false ||
    model.modelTrainingAuthorized !== false ||
    !Array.isArray(model.points) ||
    model.points.length !== FRACTIONS.length ||
    !model.points.every(validPoint) ||
    model.points.some((p, i) => i > 0 && p[0] <= model.points[i - 1][0])
  )
    return fail('MODEL_ENVELOPE_UNAVAILABLE_OR_INVALID');

  const deltas = [];
  for (const [x, modelY] of model.points) {
    const humanY = yAtX(line, x);
    if (humanY === null) continue; // Missing coverage is never extrapolated.
    if (!validNumber(humanY)) return fail('HUMAN_INTERPOLATION_INVALID');
    deltas.push(humanY - modelY);
  }
  if (deltas.length < 3) return fail('INSUFFICIENT_SHARED_X_COVERAGE');
  const sum = deltas.reduce((n, v) => n + v, 0);
  return Object.freeze({
    methodVersion: JAW_MODEL_HUMAN_COMPARISON_VERSION,
    status: drawing.status === 'marked' && deltas.length === 5 ? 'available' : 'partial',
    comparedSampleCount: deltas.length,
    totalModelSampleCount: 5,
    signedMeanHumanMinusModelToImageHeight: sum / deltas.length,
    meanAbsoluteOffsetToImageHeight: deltas.reduce((n, v) => n + Math.abs(v), 0) / deltas.length,
    maximumAbsoluteOffsetToImageHeight: Math.max(...deltas.map(Math.abs)),
    humanFullModelCoverageConfirmed: drawing.status === 'marked' && deltas.length === 5,
    ...flags,
  });
}
