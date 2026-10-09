// Local image-plane candidates. These are not FR293 canonical-frame metrics.
export const METHOD_VERSION = 'frontal-image-plane-model-geometry@0.1.0';
export const METRIC_DEFINITIONS = Object.freeze(
  [
    ['eye_aperture_ratio', '눈 경계 높이 / 폭', 'eyes'],
    ['eye_span_ratio', '평균 눈 폭 / 모델 윤곽 폭', 'eyes'],
    ['eye_spacing_ratio', '눈 중심 간격 / 모델 윤곽 폭', 'eyes'],
    ['eye_span_difference', '두 눈 폭의 상대 차이', 'eyes'],
    ['eye_aperture_difference', '두 눈 종횡비 차이', 'eyes'],
    ['mouth_span_ratio', '입 경계 폭 / 모델 윤곽 폭', 'mouth'],
    ['oval_aspect_ratio', '모델 윤곽 높이 / 폭', 'oval'],
    ['lower_oval_band_ratio', '입–턱 중간 윤곽 폭 / 모델 윤곽 폭', 'oval'],
  ].map(([id, label, region]) => Object.freeze({ id, label, region })),
);

function topologyIndices(edges, size, allowComponents = false) {
  if (!Array.isArray(edges) || edges.length < 3) throw Error('TOPOLOGY_INVALID');
  const adjacency = new Map();
  const uniqueEdges = new Set();
  for (const edge of edges) {
    const a = edge.start,
      b = edge.end;
    if (
      !Number.isInteger(a) ||
      !Number.isInteger(b) ||
      a < 0 ||
      b < 0 ||
      a >= size ||
      b >= size ||
      a === b
    )
      throw Error('TOPOLOGY_INVALID');
    const key = [a, b].sort((x, y) => x - y).join(':');
    if (uniqueEdges.has(key)) throw Error('TOPOLOGY_INVALID');
    uniqueEdges.add(key);
    for (const [x, y] of [
      [a, b],
      [b, a],
    ]) {
      if (!adjacency.has(x)) adjacency.set(x, []);
      adjacency.get(x).push(y);
    }
  }
  if ([...adjacency.values()].some((v) => v.length !== 2)) throw Error('TOPOLOGY_INVALID');
  const ordered = [];
  let components = 0;
  for (const first of adjacency.keys()) {
    if (ordered.includes(first)) continue;
    components++;
    ordered.push(first);
    let previous = first,
      current = adjacency.get(first)[0];
    while (current !== first) {
      if (ordered.includes(current)) throw Error('TOPOLOGY_INVALID');
      ordered.push(current);
      const next = adjacency.get(current).find((v) => v !== previous);
      previous = current;
      current = next;
    }
  }
  if (!allowComponents && components !== 1) throw Error('TOPOLOGY_INVALID');
  return ordered;
}

function unavailable(reason, captureRef, viewRole) {
  return METRIC_DEFINITIONS.map((d) => ({
    metricKey: 'engineering.frontal.' + d.id,
    label: d.label,
    region: d.region,
    status: 'unavailable',
    reason,
    captureRef,
    viewRole,
    candidateOnly: true,
    methodVersion: METHOD_VERSION,
  }));
}

export function computeFrontalMetrics({
  landmarks,
  width,
  height,
  topology,
  captureRef,
  viewRole = 'frontal',
}) {
  if (typeof captureRef !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(captureRef))
    throw Error('CAPTURE_REF_INVALID');
  if (!['frontal', 'profile'].includes(viewRole)) throw Error('VIEW_ROLE_INVALID');
  if (viewRole === 'profile')
    return unavailable('profile_method_not_implemented', captureRef, viewRole);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)
    throw Error('FRAME_INVALID');
  if (
    !Array.isArray(landmarks) ||
    landmarks.length !== 478 ||
    landmarks.some((p) => !Number.isFinite(p?.x) || !Number.isFinite(p?.y))
  )
    return unavailable('provider_shape_invalid', captureRef, viewRole);
  const groups = {};
  for (const key of ['eyeA', 'eyeB', 'mouth', 'oval']) {
    const indices = topologyIndices(topology[key], landmarks.length, key === 'mouth');
    groups[key] = indices.map((i) => ({
      x: landmarks[i].x * width,
      y: landmarks[i].y * height,
      clipped:
        landmarks[i].x <= 0 || landmarks[i].x >= 1 || landmarks[i].y <= 0 || landmarks[i].y >= 1,
    }));
  }
  const centroid = (points) => ({
    x: points.reduce((a, p) => a + p.x, 0) / points.length,
    y: points.reduce((a, p) => a + p.y, 0) / points.length,
  });
  const ca = centroid(groups.eyeA),
    cb = centroid(groups.eyeB);
  const dx = cb.x - ca.x,
    dy = cb.y - ca.y,
    length = Math.hypot(dx, dy);
  if (length === 0) return unavailable('eye_axis_collapsed', captureRef, viewRole);
  // A pair-relative image-plane axis, not a camera pose correction or anatomy.
  const direction = dx < 0 ? -1 : 1;
  const ux = (direction * dx) / length,
    uy = (direction * dy) / length;
  const project = (p) => ({ x: p.x * ux + p.y * uy, y: -p.x * uy + p.y * ux });
  const span = (points) => {
    const values = points.map(project);
    return {
      width: Math.max(...values.map((p) => p.x)) - Math.min(...values.map((p) => p.x)),
      height: Math.max(...values.map((p) => p.y)) - Math.min(...values.map((p) => p.y)),
    };
  };
  const ea = span(groups.eyeA),
    eb = span(groups.eyeB),
    mouth = span(groups.mouth),
    oval = span(groups.oval);
  const reasons = {};
  if (groups.oval.some((p) => p.clipped)) reasons.oval = 'model_oval_at_image_boundary';
  if (groups.eyeA.some((p) => p.clipped) || groups.eyeB.some((p) => p.clipped))
    reasons.eyes = 'eye_boundary_clipped';
  if (groups.mouth.some((p) => p.clipped)) reasons.mouth = 'mouth_boundary_clipped';
  if (oval.width === 0 || oval.height === 0) reasons.oval = 'model_oval_collapsed';
  if (ea.width === 0 || eb.width === 0 || ea.height === 0 || eb.height === 0)
    reasons.eyes = 'eye_boundary_collapsed';
  if (mouth.width === 0) reasons.mouth = 'mouth_boundary_collapsed';
  const values = {
    eye_aperture_ratio: (ea.height / ea.width + eb.height / eb.width) / 2,
    eye_span_ratio: (ea.width + eb.width) / (2 * oval.width),
    eye_spacing_ratio: length / oval.width,
    eye_span_difference: Math.abs(ea.width - eb.width) / ((ea.width + eb.width) / 2),
    eye_aperture_difference: Math.abs(ea.height / ea.width - eb.height / eb.width),
    mouth_span_ratio: mouth.width / oval.width,
    oval_aspect_ratio: oval.height / oval.width,
  };
  // Intersect the connected oval with a single line halfway between the mouth
  // centroid and the model oval's inferior extent. No hidden contour completion.
  const poly = groups.oval.map(project);
  const mouthY = project(centroid(groups.mouth)).y;
  const bottomY = Math.max(...poly.map((p) => p.y));
  const bandY = (mouthY + bottomY) / 2;
  const intersections = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i],
      b = poly[(i + 1) % poly.length];
    if ((a.y <= bandY && b.y > bandY) || (b.y <= bandY && a.y > bandY))
      intersections.push(a.x + ((bandY - a.y) * (b.x - a.x)) / (b.y - a.y));
  }
  if (intersections.length === 2 && bottomY > mouthY)
    values.lower_oval_band_ratio = Math.abs(intersections[1] - intersections[0]) / oval.width;
  return METRIC_DEFINITIONS.map((d) => {
    const needsOval = ![
      'eye_aperture_ratio',
      'eye_span_difference',
      'eye_aperture_difference',
    ].includes(d.id);
    // Every aligned axis depends on the two model eye cycles.
    const reason =
      reasons.eyes ||
      (needsOval && reasons.oval) ||
      reasons[d.region] ||
      (!Number.isFinite(values[d.id]) ? 'reference_or_band_unavailable' : null);
    const base = {
      metricKey: 'engineering.frontal.' + d.id,
      label: d.label,
      region: d.region,
      captureRef,
      viewRole,
      methodVersion: METHOD_VERSION,
      candidateOnly: true,
      coordinateFrame: 'eye_pair_relative_image_plane_2d',
      accuracyValidated: false,
      occlusionReviewed: false,
      anatomicalLateralityResolved: false,
      canonicalReceiptIssued: false,
    };
    return reason
      ? { ...base, status: 'unavailable', reason }
      : { ...base, status: 'available', value: values[d.id], unit: 'ratio' };
  });
}
