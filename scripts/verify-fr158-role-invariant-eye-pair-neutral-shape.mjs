import process from 'node:process';

import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
  issueFaceEyePairResearchArtifactFR24,
} from '../.face-reading-dist/face-eye-pair-research-bridge-fr24.js';
import { orderClosedCycleProviderVerticesFR16 } from '../.face-reading-dist/provider-adapter-evidence-fr16.js';
import {
  assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158,
  computeRoleInvariantEyePairNeutralShapeMetricsFR158,
} from '../.face-reading-dist/role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';

const DIGEST = `sha256:${'1'.repeat(64)}`;
const SHAPE_A = Object.freeze({ harmonicX: 0.07, harmonicY: 0.04, phase: 0.0 });
const SHAPE_B = Object.freeze({ harmonicX: -0.05, harmonicY: 0.08, phase: 0.19 });

function cyclePoints(symbol, shape, transform = (point) => point, direction = 1) {
  const vertices = orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]);
  const pointsByProviderVertex = {};
  vertices.forEach((vertex, index) => {
    const theta = direction * 2 * Math.PI * index / vertices.length;
    const raw = {
      x: 0.5 + 0.22 * (Math.cos(theta + shape.phase) + shape.harmonicX * Math.cos(2 * theta)),
      y: 0.5 + 0.11 * (Math.sin(theta) + shape.harmonicY * Math.sin(3 * theta)),
    };
    pointsByProviderVertex[vertex] = Object.freeze(transform(raw));
  });
  return Object.freeze({ pointsByProviderVertex: Object.freeze(pointsByProviderVertex) });
}

function artifact({ swap = false, transform = (point) => point, direction = 1, runRef }) {
  const shapes = swap ? [SHAPE_B, SHAPE_A] : [SHAPE_A, SHAPE_B];
  return issueFaceEyePairResearchArtifactFR24(Object.freeze({
    providerRunRef: runRef,
    canonicalAssetDigest: DIGEST,
    topologyInputs: Object.freeze(Object.fromEntries(
      FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol, index) => [
        symbol,
        cyclePoints(symbol, shapes[index], transform, direction),
      ]),
    )),
  }));
}

function values(result) {
  return Object.fromEntries(result.metricValues.map((metric) => [metric.metricRef, metric.value]));
}

function assertCloseRecord(left, right, label, tolerance = 1e-10) {
  for (const key of Object.keys(left)) {
    if (!(key in right) || Math.abs(left[key] - right[key]) > tolerance) {
      throw new Error(`FR158 ${label} invariance failed for ${key}: left=${left[key]} right=${right[key]}`);
    }
  }
}

const baseline = computeRoleInvariantEyePairNeutralShapeMetricsFR158(artifact({ runRef: 'fr158:baseline' }));
assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(baseline);

const repeat = computeRoleInvariantEyePairNeutralShapeMetricsFR158(artifact({ runRef: 'fr158:repeat' }));
assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(repeat);
assertCloseRecord(values(baseline), values(repeat), 'deterministic-rerun', 0);

const transformed = computeRoleInvariantEyePairNeutralShapeMetricsFR158(artifact({
  runRef: 'fr158:axiswise-transform',
  transform: (point) => Object.freeze({ x: 0.1 + 0.7 * point.x, y: 0.05 + 0.82 * point.y }),
}));
assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(transformed);
assertCloseRecord(values(baseline), values(transformed), 'translation-and-independent-xy-scale');

const swapped = computeRoleInvariantEyePairNeutralShapeMetricsFR158(artifact({
  runRef: 'fr158:provider-label-shape-swap',
  swap: true,
}));
assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(swapped);
assertCloseRecord(values(baseline), values(swapped), 'provider-label-shape-swap');

const reversed = computeRoleInvariantEyePairNeutralShapeMetricsFR158(artifact({
  runRef: 'fr158:cycle-direction-reversal',
  direction: -1,
}));
assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(reversed);
assertCloseRecord(values(baseline), values(reversed), 'cycle-direction-reversal');

if (
  baseline.authorityState !== 'role_invariant_eye_pair_neutral_shape_candidates_research_only'
  || baseline.source.anatomicalLateralityResolved !== false
  || baseline.source.releaseExactProviderBindingPromoted !== false
  || baseline.normalization.poseCompensationPerformed !== false
  || baseline.empiricalBoundary.captureQualityValidated !== false
  || baseline.empiricalBoundary.empiricalRepeatabilityEstablished !== false
  || baseline.empiricalBoundary.captureQualityMeasurementConstructValidated !== false
  || baseline.empiricalBoundary.numericCaptureQualityThreshold !== null
  || baseline.empiricalBoundary.numericRepeatabilityAcceptanceThreshold !== null
  || baseline.empiricalBoundary.constructValidity !== 'unresolved'
  || baseline.authorityBoundary.providerTopologyLabelsUsedInFormula !== false
  || baseline.authorityBoundary.providerRegionOrderUsedInFormula !== false
  || baseline.authorityBoundary.anatomicalLateralityResolved !== false
  || baseline.authorityBoundary.identityMatchingPerformed !== false
  || baseline.authorityBoundary.biometricTemplateIssued !== false
  || baseline.authorityBoundary.classificationIssued !== false
  || baseline.authorityBoundary.calibrationIssued !== false
  || baseline.authorityBoundary.thresholdsIssued !== false
  || baseline.authorityBoundary.traditionalBinding !== 'unresolved'
  || baseline.traditionalSemanticAuthority !== false
) throw new Error('FR158 authority boundary drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR158_ROLE_INVARIANT_EYE_PAIR_NEUTRAL_SHAPE_PASS',
  metricValues: values(baseline),
  deterministicRerun: true,
  translationAndIndependentXYScaleInvariant: true,
  providerLabelShapeSwapInvariant: true,
  cycleDirectionInvariant: true,
  poseCompensationPerformed: baseline.normalization.poseCompensationPerformed,
  empiricalRepeatabilityEstablished: baseline.empiricalBoundary.empiricalRepeatabilityEstablished,
  constructValidity: baseline.empiricalBoundary.constructValidity,
  identityMatchingPerformed: baseline.authorityBoundary.identityMatchingPerformed,
  traditionalSemanticAuthority: baseline.traditionalSemanticAuthority,
  nextFrontier: baseline.nextFrontier,
})}\n`);
