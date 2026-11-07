import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import process from 'node:process';

const HASH = /^[a-f0-9]{64}$/i;
const HUMAN_VISIBLE = new Set(['marked', 'partial']);
const HUMAN_WITHHELD = new Set(['unreviewed', 'none', 'occluded', 'unknown']);
const MAX_HUMAN_SEGMENTS = 24;
const MAX_HUMAN_VERTICES = 10000;
const MAX_CANDIDATE_VERTICES = 4096;
const MAX_CANDIDATE_FILES = 3000;

const finitePoint = (p, w, h) =>
  Array.isArray(p) &&
  p.length === 2 &&
  p.every((n) => typeof n === 'number' && Number.isFinite(n)) &&
  p[0] >= 0 &&
  p[1] >= 0 &&
  p[0] <= w - 1 &&
  p[1] <= h - 1;

function validateHuman(annotation) {
  if (
    !annotation ||
    typeof annotation !== 'object' ||
    !HASH.test(annotation.sourceSha256 || '') ||
    !Number.isInteger(annotation.width) ||
    !Number.isInteger(annotation.height) ||
    annotation.width < 2 ||
    annotation.height < 2 ||
    annotation.mode !== 'hairline' ||
    typeof annotation.humanReviewed !== 'boolean' ||
    annotation.anatomicalHairlineAuthorized !== false ||
    !Array.isArray(annotation.segments) ||
    annotation.segments.length > MAX_HUMAN_SEGMENTS ||
    ![...HUMAN_VISIBLE, ...HUMAN_WITHHELD].includes(annotation.status)
  )
    throw Error('HAIRLINE_HUMAN_ANNOTATION_INVALID');
  const visible = HUMAN_VISIBLE.has(annotation.status);
  const count = annotation.segments.reduce((sum, segment) => {
    if (
      !Array.isArray(segment) ||
      segment.length < 2 ||
      segment.length > 1200 ||
      segment.some((point) => !finitePoint(point, annotation.width, annotation.height))
    )
      throw Error('HAIRLINE_HUMAN_GEOMETRY_INVALID');
    return sum + segment.length;
  }, 0);
  if (
    count > MAX_HUMAN_VERTICES ||
    (visible && (!annotation.humanReviewed || count === 0)) ||
    (!visible && count !== 0) ||
    (annotation.status === 'unreviewed' && annotation.humanReviewed)
  )
    throw Error('HAIRLINE_HUMAN_ANNOTATION_INVALID');
}

function validateCandidate(candidate, w, h) {
  if (
    !candidate ||
    typeof candidate !== 'object' ||
    typeof candidate.candidateBoundaryExposed !== 'boolean' ||
    !Array.isArray(candidate.boundaryPoints) ||
    candidate.boundaryPoints.length > MAX_CANDIDATE_VERTICES ||
    typeof candidate.engineeringPreviewState !== 'string' ||
    candidate.automaticAdmissionAuthorized !== false ||
    candidate.neutralRuntimeHairlineObservationAuthorized !== false
  )
    throw Error('HAIRLINE_CANDIDATE_INVALID');
  if (candidate.candidateBoundaryExposed) {
    if (
      candidate.engineeringPreviewState !== 'visible_interface_candidate' ||
      candidate.boundaryPoints.length < 2 ||
      candidate.boundaryPoints.some((point) => !finitePoint(point, w, h))
    )
      throw Error('HAIRLINE_CANDIDATE_INVALID');
  } else if (candidate.boundaryPoints.length !== 0) {
    throw Error('HAIRLINE_CANDIDATE_INVALID');
  }
}

function distanceToSegment(point, a, b) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1];
  const len = dx * dx + dy * dy;
  const t =
    len === 0
      ? 0
      : Math.min(1, Math.max(0, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / len));
  return Math.hypot(point[0] - a[0] - t * dx, point[1] - a[1] - t * dy);
}

// Research-only, directed distance from human-drawn visible vertices to an
// exposed model polyline. Does not join separate human strokes across occlusion.
// No threshold, anatomical GT admission, precision/recall or population claim.
export function compareHairlineBoundary(annotation, candidate, verifiedCandidateSourceSha256) {
  validateHuman(annotation);
  if (
    !HASH.test(verifiedCandidateSourceSha256 || '') ||
    annotation.sourceSha256.toLowerCase() !== verifiedCandidateSourceSha256.toLowerCase()
  )
    throw Error('HAIRLINE_SOURCE_DIGEST_MISMATCH');
  validateCandidate(candidate, annotation.width, annotation.height);
  if (!HUMAN_VISIBLE.has(annotation.status)) {
    return Object.freeze({ state: 'human_visible_boundary_not_annotated', candidateOnly: true });
  }
  if (!candidate.candidateBoundaryExposed) {
    return Object.freeze({ state: 'model_candidate_withheld', candidateOnly: true });
  }
  let total = 0,
    sum = 0,
    max = 0;
  const line = candidate.boundaryPoints;
  for (const stroke of annotation.segments) {
    for (const point of stroke) {
      let nearest = Infinity;
      for (let j = 1; j < line.length; j++) {
        nearest = Math.min(nearest, distanceToSegment(point, line[j - 1], line[j]));
      }
      total++;
      sum += nearest;
      max = Math.max(max, nearest);
    }
  }
  const diagonal = Math.hypot(annotation.width, annotation.height);
  return Object.freeze({
    state: 'provisional_visible_boundary_comparison',
    comparedHumanVertices: total,
    comparedHumanStrokes: annotation.segments.length,
    meanHumanVertexToModelPolylinePx: sum / total,
    maxHumanVertexToModelPolylinePx: max,
    meanDistanceRelativeToImageDiagonal: sum / total / diagonal,
    annotationCompleteness: annotation.status,
    candidateOnly: true,
    independentAnatomicalAccuracyValidated: false,
  });
}

export function summarizeHairlineComparisons(annotations, candidatesWithVerifiedDigests) {
  if (
    !annotations ||
    annotations.schemaVersion !== 'myeongha-human-geometry-annotation-v1' ||
    !annotations.records ||
    Array.isArray(annotations.records) ||
    typeof annotations.records !== 'object' ||
    !Array.isArray(candidatesWithVerifiedDigests)
  )
    throw Error('HAIRLINE_REFERENCE_INPUT_INVALID');
  const byDigest = new Map();
  let humanVisibleAnnotations = 0;
  for (const annotation of Object.values(annotations.records)) {
    validateHuman(annotation);
    if (HUMAN_VISIBLE.has(annotation.status)) humanVisibleAnnotations++;
    const digest = annotation.sourceSha256.toLowerCase();
    if (byDigest.has(digest)) throw Error('HAIRLINE_REFERENCE_DUPLICATE_SOURCE');
    byDigest.set(digest, annotation);
  }
  let sourceMatched = 0,
    sourceUnmatched = 0,
    sourceUnreadable = 0;
  let humanNotDrawn = 0,
    candidateWithheld = 0;
  const observed = [];
  for (const item of candidatesWithVerifiedDigests) {
    if (item.sourceUnreadable === true) {
      sourceUnreadable++;
      continue;
    }
    if (!HASH.test(item.verifiedSourceSha256 || '')) throw Error('HAIRLINE_SOURCE_DIGEST_MISSING');
    const annotation = byDigest.get(item.verifiedSourceSha256.toLowerCase());
    if (!annotation) {
      sourceUnmatched++;
      continue;
    }
    sourceMatched++;
    const comparison = compareHairlineBoundary(
      annotation,
      item.candidate,
      item.verifiedSourceSha256,
    );
    if (comparison.state === 'human_visible_boundary_not_annotated') humanNotDrawn++;
    else if (comparison.state === 'model_candidate_withheld') candidateWithheld++;
    else observed.push(comparison);
  }
  const meanRelative = observed.length
    ? observed.reduce((sum, row) => sum + row.meanDistanceRelativeToImageDiagonal, 0) /
      observed.length
    : null;
  return Object.freeze({
    schemaVersion: 'local-hairline-human-boundary-comparison@0.1.0',
    existingHumanRecords: byDigest.size,
    humanVisibleBoundaryAnnotations: humanVisibleAnnotations,
    inspectedModelCandidateFiles: candidatesWithVerifiedDigests.length,
    modelSourceMatchedHumanRecord: sourceMatched,
    modelSourceUnmatched: sourceUnmatched,
    unreadableModelSources: sourceUnreadable,
    matchedWithoutHumanBoundary: humanNotDrawn,
    matchedModelCandidateWithheld: candidateWithheld,
    provisionalComparisons: observed.length,
    meanPerPhotoVertexDistanceRelativeToImageDiagonal: meanRelative,
    metricDefinition:
      'unweighted_mean_of_human_drawn_vertices_to_exposed_model_polyline; per_photo_then_average',
    populationAccuracyValidated: false,
    anatomicalHairlineAuthorized: false,
    canonicalF0Admitted: false,
    traditionalF1BindingAuthorized: false,
    identifyingImagesOrGeometryEmitted: false,
  });
}

async function digestFile(path) {
  const digest = createHash('sha256');
  for await (const bytes of createReadStream(path)) digest.update(bytes);
  return digest.digest('hex');
}
async function candidatePaths(dir) {
  const folder = resolve(dir);
  const entries = await readdir(folder, { withFileTypes: true });
  const candidates = [];
  for (const entry of entries) {
    if (entry.isFile() && entry.name === 'candidate.json')
      candidates.push(join(folder, entry.name));
    else if (entry.isDirectory() && !entry.isSymbolicLink()) {
      const children = await readdir(join(folder, entry.name), { withFileTypes: true });
      for (const child of children)
        if (child.isFile() && child.name === 'candidate.json')
          candidates.push(join(folder, entry.name, child.name));
    }
    if (candidates.length > MAX_CANDIDATE_FILES) throw Error('HAIRLINE_CANDIDATE_LIMIT');
  }
  return candidates.sort();
}

export async function auditLocalHairlineReference(annotationFile, candidateDir) {
  const annotations = JSON.parse(await readFile(annotationFile, 'utf8'));
  const paths = await candidatePaths(candidateDir);
  const sources = [];
  for (const path of paths) {
    const candidate = JSON.parse(await readFile(path, 'utf8'));
    if (!candidate || typeof candidate.sourcePath !== 'string' || !candidate.sourcePath.trim())
      throw Error('HAIRLINE_CANDIDATE_SOURCE_INVALID');
    try {
      const sourceDigest = await digestFile(candidate.sourcePath);
      sources.push({ candidate, verifiedSourceSha256: sourceDigest });
    } catch (error) {
      if (error?.code !== 'ENOENT' && error?.code !== 'EACCES')
        throw new Error('HAIRLINE_CANDIDATE_SOURCE_UNAVAILABLE', { cause: error });
      sources.push({ sourceUnreadable: true });
    }
  }
  return summarizeHairlineComparisons(annotations, sources);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 4) {
    process.stderr.write(
      'Usage: node hairline-boundary-reference.mjs <private-ground-truth-json> <private-candidate-output-dir>\n',
    );
    process.exitCode = 2;
  } else {
    try {
      const report = await auditLocalHairlineReference(process.argv[2], process.argv[3]);
      process.stdout.write(JSON.stringify(report, null, 2) + '\n');
    } catch {
      process.stderr.write(
        'HAIRLINE_COMPARISON_UNAVAILABLE: private evidence invalid or inconsistent\n',
      );
      process.exitCode = 1;
    }
  }
}