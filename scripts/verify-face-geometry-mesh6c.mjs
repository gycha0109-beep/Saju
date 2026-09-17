import { readFileSync } from 'node:fs';
import process from 'node:process';

import {
  computeMesh6BZygomaticResearchKernel,
} from '../.face-reading-dist/mesh6b-zygomatic-raw-morphology.js';
import {
  runMesh6CZygomaticPerturbationStudy,
  summarizeMesh6CZygomaticRepeatability,
} from '../.face-reading-dist/mesh6c-morphology-repeatability.js';

function parseObjVertices(path) {
  const points = [];
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    if (!line.startsWith('v ')) continue;
    const [, xRaw, yRaw, zRaw] = line.trim().split(/\s+/);
    const x = Number(xRaw);
    const y = Number(yRaw);
    const z = Number(zRaw);
    if (![x, y, z].every(Number.isFinite)) throw new Error('MESH6C canonical OBJ contains non-finite XYZ.');
    points.push({ x, y, z });
  }
  if (points.length !== 468) throw new Error(`MESH6C expected 468 canonical vertices; got ${points.length}.`);
  return points;
}

function close(a, b, tolerance = 1e-10) {
  return Math.abs(a - b) <= tolerance;
}

function assertSummaryClose(a, b, context) {
  const keys = Object.keys(a.observables);
  if (keys.join('|') !== Object.keys(b.observables).join('|')) throw new Error(`MESH6C ${context} observable keys differ.`);
  for (const key of keys) {
    for (const field of ['median', 'mad', 'p10', 'p90', 'robustSpanP10P90', 'min', 'max']) {
      if (!close(a.observables[key][field], b.observables[key][field])) {
        throw new Error(`MESH6C ${context} mismatch for ${key}.${field}.`);
      }
    }
  }
}

function cloneTransform(points, transform) {
  return points.map((point, index) => transform({ ...point }, index));
}

const adapterPath = process.argv[2];
const objPath = process.argv[3];
if (!adapterPath || !objPath) {
  throw new Error('Usage: node scripts/verify-face-geometry-mesh6c.mjs <weighted-adapter.json> <canonical-face.obj>');
}

const adapter = JSON.parse(readFileSync(adapterPath, 'utf8'));
const points = parseObjVertices(objPath);
const baseline = computeMesh6BZygomaticResearchKernel(points, adapter);

const wholeFaceConfig = Object.freeze({
  seed: 0x6c2026,
  replicates: 17,
  amplitudeRatiosOfBaselineRms: Object.freeze([0, 0.0005, 0.001, 0.002]),
  scope: 'all_vertices_xyz',
});
const wholeFace = runMesh6CZygomaticPerturbationStudy(points, adapter, wholeFaceConfig);
const wholeFaceAgain = runMesh6CZygomaticPerturbationStudy(points, adapter, wholeFaceConfig);
if (JSON.stringify(wholeFace) !== JSON.stringify(wholeFaceAgain)) {
  throw new Error('MESH6C deterministic perturbation study is not byte-stable for the same inputs.');
}

if (
  wholeFace.authorityState !== 'research_sensitivity_evidence_only' ||
  wholeFace.authorityBoundary.perturbationAmplitudesAreProductionThresholds !== false ||
  wholeFace.authorityBoundary.acceptableJitterThresholdDefined !== false ||
  wholeFace.authorityBoundary.captureQualityPassFailIssued !== false ||
  wholeFace.authorityBoundary.confidenceScoreIssued !== false ||
  wholeFace.authorityBoundary.productionMorphologyAuthorized !== false ||
  wholeFace.authorityBoundary.claimsIssued !== 0
) throw new Error('MESH6C authority boundary widened unexpectedly.');

const zeroLevel = wholeFace.levels.find((level) => level.amplitudeRatioOfBaselineRms === 0);
if (!zeroLevel) throw new Error('MESH6C zero-amplitude control is missing.');
for (const [key, stat] of Object.entries(zeroLevel.summary.observables)) {
  if (!close(stat.mad, 0) || !close(stat.robustSpanP10P90, 0)) {
    throw new Error(`MESH6C zero-amplitude drift detected for ${key}.`);
  }
  if (!close(zeroLevel.medianDeltaFromBaseline[key], 0) || !close(zeroLevel.maxAbsoluteDeltaFromBaseline[key], 0)) {
    throw new Error(`MESH6C zero-amplitude baseline delta detected for ${key}.`);
  }
}

const orderedAmplitudes = wholeFace.levels.map((level) => level.amplitudeRatioOfBaselineRms);
if (JSON.stringify(orderedAmplitudes) !== JSON.stringify([0, 0.0005, 0.001, 0.002])) {
  throw new Error('MESH6C perturbation levels are not deterministically ordered.');
}

const zygomaticConfig = Object.freeze({
  seed: 0x6c2026,
  replicates: 17,
  amplitudeRatiosOfBaselineRms: Object.freeze([0, 0.001, 0.003]),
  scope: 'zygomatic_vertices_xyz',
});
const zygomaticOnly = runMesh6CZygomaticPerturbationStudy(points, adapter, zygomaticConfig);
if (!(zygomaticOnly.perturbedVertexCount > 0 && zygomaticOnly.perturbedVertexCount < 468)) {
  throw new Error('MESH6C zygomatic-targeted perturbation scope is invalid.');
}

const modifiedA = computeMesh6BZygomaticResearchKernel(
  cloneTransform(points, (point, index) => ({
    ...point,
    x: point.x + (index % 17 === 0 ? 0.01 : 0),
  })),
  adapter,
);
const modifiedB = computeMesh6BZygomaticResearchKernel(
  cloneTransform(points, (point, index) => ({
    ...point,
    z: point.z + (index % 19 === 0 ? -0.008 : 0),
  })),
  adapter,
);
const summaryForward = summarizeMesh6CZygomaticRepeatability([baseline, modifiedA, modifiedB]);
const summaryReverse = summarizeMesh6CZygomaticRepeatability([modifiedB, modifiedA, baseline]);
if (JSON.stringify(summaryForward) !== JSON.stringify(summaryReverse)) {
  throw new Error('MESH6C repeatability aggregation must be sample-order invariant.');
}

const translatedPoints = cloneTransform(points, (point) => ({ x: point.x + 12.5, y: point.y - 8.75, z: point.z + 4.5 }));
const translatedStudy = runMesh6CZygomaticPerturbationStudy(translatedPoints, adapter, wholeFaceConfig);
for (let index = 0; index < wholeFace.levels.length; index += 1) {
  assertSummaryClose(wholeFace.levels[index].summary, translatedStudy.levels[index].summary, `translation level ${index}`);
}

const scaledPoints = cloneTransform(points, (point) => ({ x: point.x * 2.75, y: point.y * 2.75, z: point.z * 2.75 }));
const scaledStudy = runMesh6CZygomaticPerturbationStudy(scaledPoints, adapter, wholeFaceConfig);
for (let index = 0; index < wholeFace.levels.length; index += 1) {
  assertSummaryClose(wholeFace.levels[index].summary, scaledStudy.levels[index].summary, `uniform-scale level ${index}`);
}

const sensitivityEvidence = wholeFace.levels.map((level) => ({
  amplitudeRatioOfBaselineRms: level.amplitudeRatioOfBaselineRms,
  absoluteSyntheticAmplitudeCm: level.absoluteSyntheticAmplitudeCm,
  observables: Object.fromEntries(
    Object.entries(level.summary.observables).map(([key, stat]) => [key, {
      mad: stat.mad,
      robustSpanP10P90: stat.robustSpanP10P90,
      maxAbsoluteDeltaFromBaseline: level.maxAbsoluteDeltaFromBaseline[key],
    }]),
  ),
}));

process.stdout.write(`${JSON.stringify({
  status: 'MESH6C_REPEATABILITY_SENSITIVITY_PASS',
  baseline: {
    scaleRmsCm: baseline.scaleRmsCm,
    lateral: baseline.lateral,
    depth2p5D: baseline.depth2p5D,
  },
  wholeFace: {
    perturbedVertexCount: wholeFace.perturbedVertexCount,
    sensitivityEvidence,
    deterministic: true,
    translationInvariant: true,
    uniformScaleInvariant: true,
  },
  zygomaticOnly: {
    perturbedVertexCount: zygomaticOnly.perturbedVertexCount,
    amplitudeRatiosOfBaselineRms: zygomaticOnly.levels.map((level) => level.amplitudeRatioOfBaselineRms),
  },
  aggregationOrderInvariant: true,
  authorityState: wholeFace.authorityState,
})}\n`);
