import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { runGovernedMetricGeometryFR77 } from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import { projectIssuedGovernedMetricGeometryToLipsSurfaceFR78 } from '../.face-reading-dist/governed-metric-lips-surface-fr78.js';
import { projectMetricLipsSurfaceToPoseNormalized2DFR79 } from '../.face-reading-dist/pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedGovernedRoleFreeLipsContourNestingFR85,
  evaluateIssuedPoseNormalizedLipsContourNestingFR85,
} from '../.face-reading-dist/role-free-lips-contour-nesting-runtime-fr85.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'5'.repeat(64)}`;

const WITNESSES = Object.freeze({
  input: Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
    blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
  }),
  metadata: Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
    blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
  }),
});

function gitBlobSha(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-fr85-role-free-contour-nesting-verifier' },
  });
  if (!response.ok) throw new Error(`FR85 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR85 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
  }
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const visibilityMatch = /\bvisibility:\s*([-+0-9.eE]+)/.exec(block)?.[1];
    if (![x, y, z].every(Number.isFinite)) {
      throw new Error('FR85 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR85 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
  }
  return landmarks;
}

function factory(providerLandmarks) {
  return {
    async create() {
      return {
        detect() {
          return {
            faceLandmarks: [providerLandmarks],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          };
        },
        close() {},
      };
    },
  };
}

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);

const fr61Request = {
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr85:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
};
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(fr61Request, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
const fr77 = await runGovernedMetricGeometryFR77({
  schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
  providerRunRef: 'fr85:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
const fr78 = projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(fr77);
const fr79 = projectMetricLipsSurfaceToPoseNormalized2DFR79(fr78);
const fr85 = evaluateIssuedPoseNormalizedLipsContourNestingFR85(fr79);
assertIssuedGovernedRoleFreeLipsContourNestingFR85(fr85);

if (
  fr85.schemaVersion !== 'fr85-governed-role-free-lips-contour-nesting-v1' ||
  fr85.authorityState !== 'governed_role_free_per_sample_contour_relation_only' ||
  fr85.source.fr79SchemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
  fr85.source.coordinateFrame !== 'pose_normalized_face_2d' ||
  fr85.source.contourCount !== 2 ||
  fr85.source.contourPointCounts[0] !== 20 ||
  fr85.source.contourPointCounts[1] !== 20 ||
  fr85.source.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
  fr85.relation.numericPolicy !== 'ieee754_double_exact_predicates_no_empirical_tolerance' ||
  fr85.relation.empiricalToleranceApplied !== false ||
  fr85.relation.calibrationThresholdApplied !== false ||
  fr85.relation.anatomicalRolesIssued !== 0 ||
  fr85.relation.crossContourPointCorrespondenceIssued !== false ||
  fr85.relation.thicknessMetricIssued !== false ||
  fr85.neutralMetricDefinitionsIssued !== 0 ||
  fr85.neutralMetricValuesIssued !== 0 ||
  fr85.morphologyProduced !== false ||
  fr85.criterionStatesIssued !== 0 ||
  fr85.claimsIssued !== 0 ||
  fr85.traditionalSemanticAuthority !== false
) throw new Error('FR85 exact governed contour-relation authority drift.');

if (fr85.relation.relationState === 'strictly_nested') {
  if (
    fr85.relation.strictNestingValidated !== true ||
    fr85.relation.geometricRolesIssued !== 2 ||
    fr85.relation.geometricRoles.length !== 2 ||
    fr85.relation.geometricRoles[0]?.geometricRole !== 'enclosing_cycle' ||
    fr85.relation.geometricRoles[1]?.geometricRole !== 'enclosed_cycle'
  ) throw new Error('FR85 exact strict nesting must issue exactly two role-free geometric roles.');
} else if (
  fr85.relation.strictNestingValidated !== false ||
  fr85.relation.geometricRolesIssued !== 0 ||
  fr85.relation.geometricRoles.length !== 0
) {
  throw new Error('FR85 exact non-nested/rejected relation must fail-close geometric-role issuance.');
}

for (const role of fr85.relation.geometricRoles) {
  if (role.anatomicalRole !== null || role.traditionalRole !== null) {
    throw new Error('FR85 exact geometric role unexpectedly gained anatomical or traditional semantics.');
  }
}

const serialized = JSON.stringify(fr85);
for (const forbidden of ['outerLip', 'innerLip', 'lipThickness', 'traditionalCriterionState']) {
  if (serialized.includes(forbidden)) throw new Error(`FR85 exact output exposed forbidden token: ${forbidden}.`);
}

process.stdout.write(`${JSON.stringify({
  status: 'FR85_ROLE_FREE_CONTOUR_NESTING_PASS',
  releaseCommit: RELEASE_COMMIT,
  relationState: fr85.relation.relationState,
  strictNestingValidated: fr85.relation.strictNestingValidated,
  geometricRolesIssued: fr85.relation.geometricRolesIssued,
  geometricRoles: fr85.relation.geometricRoles.map((role) => ({
    contourRef: role.contourRef,
    geometricRole: role.geometricRole,
  })),
  anatomicalRolesIssued: fr85.anatomicalRolesIssued,
  thicknessMetricIssued: fr85.relation.thicknessMetricIssued,
  criterionStatesIssued: fr85.criterionStatesIssued,
  claimsIssued: fr85.claimsIssued,
  traditionalSemanticAuthority: fr85.traditionalSemanticAuthority,
})}\n`);
