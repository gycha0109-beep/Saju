export interface NeutralClosedCyclePointFR142V1 {
  readonly x: number;
  readonly y: number;
}

export interface SquareBroadFangNeutralCandidateKernelFR142V1 {
  readonly horizontalReflectionNearestSetResidualRatio: number;
  readonly orthogonalEdgeOrientationConcentration: number;
  readonly turningAngleConcentrationIndex: number;
}

const POINT_KEYS = new Set(['x', 'y']);

function fail(message: string): never {
  throw new Error(`FR-142 ${message}`);
}

function finitePoint(point: NeutralClosedCyclePointFR142V1, path: string): void {
  if (typeof point !== 'object' || point === null) fail(`${path} must be a point.`);
  const unexpected = Object.keys(point).find((key) => !POINT_KEYS.has(key));
  if (unexpected !== undefined) fail(`${path} contains unauthorized field ${unexpected}.`);
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
    fail(`${path} must contain finite x/y.`);
  }
}

function validateCycleSet(
  contours: readonly (readonly NeutralClosedCyclePointFR142V1[])[],
): asserts contours is readonly [
  readonly NeutralClosedCyclePointFR142V1[],
  readonly NeutralClosedCyclePointFR142V1[],
] {
  if (contours.length !== 2) fail('kernel requires exactly two unordered closed cycles.');
  for (let contourIndex = 0; contourIndex < contours.length; contourIndex += 1) {
    const points = contours[contourIndex]!;
    if (points.length !== 20) fail(`cycle ${contourIndex} must contain exactly 20 points.`);
    for (let index = 0; index < points.length; index += 1) {
      finitePoint(points[index]!, `cycle ${contourIndex} point ${index}`);
    }
    for (let index = 0; index < points.length; index += 1) {
      const current = points[index]!;
      const next = points[(index + 1) % points.length]!;
      const length = Math.hypot(next.x - current.x, next.y - current.y);
      if (!Number.isFinite(length) || length <= 0) {
        fail(`cycle ${contourIndex} edge ${index} must have finite positive length.`);
      }
    }
  }
}

function horizontalReflectionResidual(
  points: readonly NeutralClosedCyclePointFR142V1[],
): number {
  let centerX = 0;
  let centerY = 0;
  for (const point of points) {
    centerX += point.x;
    centerY += point.y;
  }
  centerX /= points.length;
  centerY /= points.length;

  let radiusSquaredSum = 0;
  for (const point of points) {
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    radiusSquaredSum += (dx * dx) + (dy * dy);
  }
  const rmsRadius = Math.sqrt(radiusSquaredSum / points.length);
  if (!Number.isFinite(rmsRadius) || rmsRadius <= 0) {
    fail('horizontal-reflection normalization requires positive RMS radius.');
  }

  let nearestDistanceSum = 0;
  for (const point of points) {
    const reflectedX = point.x;
    const reflectedY = (2 * centerY) - point.y;
    let nearest = Number.POSITIVE_INFINITY;
    for (const candidate of points) {
      const distance = Math.hypot(candidate.x - reflectedX, candidate.y - reflectedY);
      if (distance < nearest) nearest = distance;
    }
    if (!Number.isFinite(nearest)) {
      fail('horizontal-reflection nearest-set distance is invalid.');
    }
    nearestDistanceSum += nearest;
  }
  const ratio = (nearestDistanceSum / points.length) / rmsRadius;
  if (!Number.isFinite(ratio) || ratio < 0) {
    fail('horizontal-reflection residual ratio is invalid.');
  }
  return ratio;
}

function orthogonalOrientationConcentration(
  points: readonly NeutralClosedCyclePointFR142V1[],
): number {
  let perimeter = 0;
  const edges: { readonly length: number; readonly angle: number }[] = [];
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    const length = Math.hypot(dx, dy);
    if (!Number.isFinite(length) || length <= 0) {
      fail(`orthogonal-orientation edge ${index} is invalid.`);
    }
    perimeter += length;
    edges.push({ length, angle: Math.atan2(dy, dx) });
  }
  if (!Number.isFinite(perimeter) || perimeter <= 0) {
    fail('orthogonal-orientation concentration requires positive perimeter.');
  }

  let real = 0;
  let imaginary = 0;
  for (const edge of edges) {
    const weight = edge.length / perimeter;
    real += weight * Math.cos(4 * edge.angle);
    imaginary += weight * Math.sin(4 * edge.angle);
  }
  const concentration = Math.hypot(real, imaginary);
  if (!Number.isFinite(concentration)) {
    fail('orthogonal-orientation concentration is invalid.');
  }
  return Math.max(0, Math.min(1, concentration));
}

function turningAngleConcentration(
  points: readonly NeutralClosedCyclePointFR142V1[],
): number {
  const angles: number[] = [];
  let total = 0;
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length]!;
    const current = points[index]!;
    const next = points[(index + 1) % points.length]!;
    const inX = current.x - previous.x;
    const inY = current.y - previous.y;
    const outX = next.x - current.x;
    const outY = next.y - current.y;
    const inLength = Math.hypot(inX, inY);
    const outLength = Math.hypot(outX, outY);
    if (
      !Number.isFinite(inLength)
      || inLength <= 0
      || !Number.isFinite(outLength)
      || outLength <= 0
    ) {
      fail(`turning-angle edge length is invalid at vertex ${index}.`);
    }
    const cosine = Math.max(
      -1,
      Math.min(1, ((inX * outX) + (inY * outY)) / (inLength * outLength)),
    );
    const angle = Math.acos(cosine);
    if (!Number.isFinite(angle) || angle < 0) {
      fail(`turning angle is invalid at vertex ${index}.`);
    }
    angles.push(angle);
    total += angle;
  }
  if (!Number.isFinite(total) || total <= 0) {
    fail('turning-angle concentration requires positive total direction change.');
  }

  let squaredShareSum = 0;
  for (const angle of angles) {
    const share = angle / total;
    squaredShareSum += share * share;
  }
  const n = angles.length;
  const concentration = ((n * squaredShareSum) - 1) / (n - 1);
  if (!Number.isFinite(concentration)) {
    fail('turning-angle concentration index is invalid.');
  }
  return Math.max(0, Math.min(1, concentration));
}

export function computeSquareBroadFangNeutralCandidateKernelFR142(
  contours: readonly (readonly NeutralClosedCyclePointFR142V1[])[],
): SquareBroadFangNeutralCandidateKernelFR142V1 {
  validateCycleSet(contours);
  const correspondence = contours.map(horizontalReflectionResidual);
  const orthogonality = contours.map(orthogonalOrientationConcentration);
  const turnConcentration = contours.map(turningAngleConcentration);
  return Object.freeze({
    horizontalReflectionNearestSetResidualRatio:
      (correspondence[0]! + correspondence[1]!) / 2,
    orthogonalEdgeOrientationConcentration:
      (orthogonality[0]! + orthogonality[1]!) / 2,
    turningAngleConcentrationIndex:
      (turnConcentration[0]! + turnConcentration[1]!) / 2,
  });
}
