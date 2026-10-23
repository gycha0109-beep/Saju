import { modelCycle, eyePairFrame } from './frontal-metrics.mjs';
export const MORPHOLOGY_VERSION = 'engineering.frontal.visible-morphology@0.1.0';
const ids = ['browSpan', 'lipBalance', 'noseExtent'];
const reasons = [
  'PROFILE_VIEW',
  'NO_SINGLE_FACE',
  'MULTIPLE_FACES',
  'FRAME_UNAVAILABLE',
  'CLASS_DISAGREEMENT',
  'CLIPPED',
  'TOPOLOGY_INVALID',
  'SECTION_UNAVAILABLE',
  'PART_MISSING',
];
export function unavailableMorphology(reason) {
  return {
    methodVersion: MORPHOLOGY_VERSION,
    traditionalBindingAuthorized: false,
    ...Object.fromEntries(ids.map((id) => [id, { status: 'unavailable', reason }])),
  };
}
function failure(reason) {
  return { status: 'unavailable', reason };
}
function extent(points) {
  const xs = points.map((p) => p.x),
    ys = points.map((p) => p.y);
  return {
    left: Math.min(...xs),
    right: Math.max(...xs),
    top: Math.min(...ys),
    bottom: Math.max(...ys),
  };
}
function paths(edges, points, width, height) {
  if (!Array.isArray(edges) || !edges.length) throw Error();
  const indices = [...new Set(edges.flatMap((e) => [e.start, e.end]))];
  if (indices.some((i) => !Number.isInteger(i) || !points[i])) throw Error();
  return indices.map((i) => ({
    x: points[i].x * width,
    y: points[i].y * height,
    clipped: points[i].x <= 0 || points[i].x >= 1 || points[i].y <= 0 || points[i].y >= 1,
  }));
}
function loops(edges, points, width, height) {
  if (!Array.isArray(edges)) throw Error();
  const remaining = new Set(edges),
    result = [];
  while (remaining.size) {
    const first = [...remaining][0],
      vertices = new Set([first.start, first.end]),
      selected = [];
    let changed = true;
    while (changed) {
      changed = false;
      for (const edge of remaining)
        if (vertices.has(edge.start) || vertices.has(edge.end)) {
          vertices.add(edge.start);
          vertices.add(edge.end);
          selected.push(edge);
          remaining.delete(edge);
          changed = true;
        }
    }
    result.push(modelCycle(selected, points, width, height));
  }
  if (result.length !== 2) throw Error();
  return result;
}
function section(poly, x) {
  const ys = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i],
      b = poly[(i + 1) % poly.length];
    if ((a.x <= x && b.x > x) || (b.x <= x && a.x > x))
      ys.push(a.y + ((x - a.x) * (b.y - a.y)) / (b.x - a.x));
  }
  return ys.length === 2 ? ys.sort((a, b) => a - b) : null;
}
// Scalar evidence only; raw points and classification pixels never leave the worker.
export function computeMorphology({
  landmarks,
  width,
  height,
  topology,
  viewRole,
  checks,
  nosePoints = [],
}) {
  if (viewRole !== 'frontal') return unavailableMorphology('PROFILE_VIEW');
  const out = unavailableMorphology('FRAME_UNAVAILABLE');
  if (
    !Array.isArray(landmarks) ||
    landmarks.length !== 478 ||
    ![width, height].every((n) => Number.isFinite(n) && n > 0) ||
    landmarks.some((p) => !Number.isFinite(p?.x) || !Number.isFinite(p?.y))
  )
    return out;
  let eyeGroups, frame;
  try {
    eyeGroups = [
      modelCycle(topology.eyeA, landmarks, width, height),
      modelCycle(topology.eyeB, landmarks, width, height),
    ];
    frame = eyePairFrame(...eyeGroups);
  } catch {
    return unavailableMorphology('TOPOLOGY_INVALID');
  }
  if (!frame || !checks.eyes) return unavailableMorphology('CLASS_DISAGREEMENT');
  if (eyeGroups.flat().some((p) => p.clipped)) return unavailableMorphology('CLIPPED');
  try {
    if (!checks.brows) out.browSpan = failure('CLASS_DISAGREEMENT');
    else {
      const pairs = ['browA', 'browB']
        .map((key, i) => {
          const brow = paths(topology[key], landmarks, width, height),
            eye = eyeGroups[i];
          if (brow.some((p) => p.clipped)) throw Error('CLIPPED');
          const b = extent(brow.map(frame.project)),
            e = extent(eye.map(frame.project));
          if (b.right <= b.left || e.right <= e.left) throw Error('SECTION_UNAVAILABLE');
          return { centre: (e.left + e.right) / 2, ratio: (b.right - b.left) / (e.right - e.left) };
        })
        .sort((a, b) => a.centre - b.centre);
      out.browSpan = { status: 'available', ratios: pairs.map((p) => p.ratio) };
    }
  } catch (e) {
    out.browSpan = failure(
      ['CLIPPED', 'SECTION_UNAVAILABLE'].includes(e.message) ? e.message : 'TOPOLOGY_INVALID',
    );
  }
  try {
    if (!checks.lips) out.lipBalance = failure('CLASS_DISAGREEMENT');
    else {
      const rings = loops(topology.mouth, landmarks, width, height);
      if (rings.flat().some((p) => p.clipped)) throw Error('CLIPPED');
      const projected = rings
        .map((r) => r.map(frame.project))
        .sort((a, b) => {
          const ea = extent(a),
            eb = extent(b);
          return eb.right - eb.left - (ea.right - ea.left);
        });
      const outer = projected[0],
        inner = projected[1],
        bounds = extent(outer),
        span = bounds.right - bounds.left,
        x = (bounds.right + bounds.left) / 2;
      const a = section(outer, x),
        b = section(inner, x);
      if (!(span > 0) || !a || !b || b[0] < a[0] || b[1] > a[1] || a[1] <= a[0])
        throw Error('SECTION_UNAVAILABLE');
      const ib = extent(inner);
      if (
        ib.left < bounds.left ||
        ib.right > bounds.right ||
        ib.top < bounds.top ||
        ib.bottom > bounds.bottom
      )
        throw Error('SECTION_UNAVAILABLE');
      const upper = (b[0] - a[0]) / span,
        lower = (a[1] - b[1]) / span;
      if (!(upper > 0 && lower > 0)) throw Error('SECTION_UNAVAILABLE');
      out.lipBalance = { status: 'available', upper, lower, opening: (b[1] - b[0]) / span };
    }
  } catch (e) {
    out.lipBalance = failure(
      e.message === 'CLIPPED'
        ? 'CLIPPED'
        : e.message === 'SECTION_UNAVAILABLE'
          ? 'SECTION_UNAVAILABLE'
          : 'TOPOLOGY_INVALID',
    );
  }
  if (!checks.nose) out.noseExtent = failure('CLASS_DISAGREEMENT');
  else if (!nosePoints.length) out.noseExtent = failure('PART_MISSING');
  else if (nosePoints.some((p) => p.clipped)) out.noseExtent = failure('CLIPPED');
  else {
    const n = extent(nosePoints.map(frame.project));
    out.noseExtent =
      n.right > n.left && n.bottom > n.top
        ? {
            status: 'available',
            widthToEyeSpacing: (n.right - n.left) / frame.length,
            heightToEyeSpacing: (n.bottom - n.top) / frame.length,
          }
        : failure('PART_MISSING');
  }
  return out;
}
export function validateMorphology(input, { viewRole } = {}) {
  if (input?.methodVersion !== MORPHOLOGY_VERSION || input.traditionalBindingAuthorized !== false)
    throw Error('PARSING_SUMMARY_INVALID');
  const out = { methodVersion: MORPHOLOGY_VERSION, traditionalBindingAuthorized: false };
  for (const id of ids) {
    const part = input[id];
    if (part?.status === 'unavailable' && reasons.includes(part.reason)) {
      if (viewRole !== undefined && (viewRole === 'profile') !== (part.reason === 'PROFILE_VIEW'))
        throw Error('PARSING_SUMMARY_INVALID');
      out[id] = failure(part.reason);
      continue;
    }
    if (part?.status !== 'available' || viewRole === 'profile')
      throw Error('PARSING_SUMMARY_INVALID');
    const keys = {
      browSpan: ['ratios'],
      lipBalance: ['upper', 'lower', 'opening'],
      noseExtent: ['widthToEyeSpacing', 'heightToEyeSpacing'],
    }[id];
    if (id === 'browSpan' && (!Array.isArray(part.ratios) || part.ratios.length !== 2))
      throw Error('PARSING_SUMMARY_INVALID');
    const values = id === 'browSpan' ? part.ratios : keys.map((k) => part[k]);
    if (
      values.some(
        (n, i) => !Number.isFinite(n) || n < 0 || (n === 0 && !(id === 'lipBalance' && i === 2)),
      )
    )
      throw Error('PARSING_SUMMARY_INVALID');
    out[id] = {
      status: 'available',
      ...Object.fromEntries(keys.map((k) => [k, Array.isArray(part[k]) ? [...part[k]] : part[k]])),
    };
  }
  return out;
}
