import { readFileSync } from 'node:fs';

const runtimePath = 'packages/face-reading/src/five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145.ts';
const testPath = 'packages/face-reading/src/five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145.test.ts';
const hardeningPath = 'packages/face-reading/src/five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145-hardening.test.ts';
const notePath = 'research/face-reading/fr145-square-broad-fang-ephemeral-real-capture-bridge.md';

const runtime = readFileSync(runtimePath, 'utf8');
const test = readFileSync(testPath, 'utf8');
const hardening = readFileSync(hardeningPath, 'utf8');
const note = readFileSync(notePath, 'utf8');

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR145 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR145 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26', 'FR26 provider reuse'],
  ['runGovernedMetricGeometryFR77', 'FR77 governed geometry reuse'],
  ['projectIssuedGovernedMetricGeometryToLipsSurfaceFR78', 'FR78 lips projection reuse'],
  ['projectMetricLipsSurfaceToPoseNormalized2DFR79', 'FR79 pose-normalized projection reuse'],
  ['computeSquareBroadNeutralShapeMetricsFR134', 'FR134 neutral metric reuse'],
  ['computeSquareBroadFangNeutralCandidateMetricsFR142', 'FR142 neutral candidate metric reuse'],
  ['recordSquareBroadFangNeutralCaptureFR144', 'FR144 acquisition reuse'],
  ['validateMediaPipeScreenToMetricReimplementationParityFR76', 'FR76 parity admission'],
  ['URL.createObjectURL(blob)', 'ephemeral object URL creation'],
  ['URL.revokeObjectURL(objectUrl)', 'ephemeral object URL revocation'],
  ['finally {\n    decoded.release();', 'deterministic success/failure cleanup'],
  ['rawImagePersisted: false', 'raw image non-persistence'],
  ['rawProviderResponsePersisted: false', 'raw provider non-persistence'],
  ['embeddingPersisted: false', 'embedding non-persistence'],
  ['identityTemplatePersisted: false', 'identity template non-persistence'],
  ['derivedFullFaceMetricGeometryPersisted: false', 'full geometry non-persistence'],
  ['derivedPoseNormalizedLipsGeometryPersisted: false', 'pose geometry non-persistence'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['criterionState: null', 'criterion state closed'],
  ['structuredClaim: null', 'structured claim closed'],
  ['boundedNarrative: null', 'bounded narrative closed'],
  ['traditionalSemanticAuthority: false', 'traditional semantic authority closed'],
  ["qualityAuthority: 'not_assessed_by_fr145'", 'quality authority not invented'],
  ["contourConsumptionState: 'unordered_set_no_outer_inner_role'", 'role-free contour consumption'],
  ['square_broad_fang_repeated_governed_real_capture_acquisition_without_semantic_labels', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['releases the ephemeral decoded image even when a downstream governed stage fails', 'failure cleanup test'],
  ['rejects request-level raw-provider/identity payload widening before decode', 'request widening test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['does not return raw image/provider/geometry payloads and keeps semantic authority unresolved', 'output allowlist hardening'],
  ['releases a decoded image when the decoder returns invalid dimensions', 'invalid decode cleanup hardening'],
]) requireFragment(hardening, fragment, label);

for (const [fragment, label] of [
  ['image geometry != construct validity != traditional meaning', 'authority separation'],
  ['The runtime must not upload or persist a user\'s image', 'real image local-only boundary'],
  ['captureQualityValidated: false', 'quality non-promotion'],
  ['construct validity: unresolved', 'note construct validity unresolved'],
  ['traditional binding: unresolved', 'note traditional binding unresolved'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ["constructValidity: 'established'", 'construct validity promotion'],
  ["traditionalBinding: 'established'", 'traditional binding promotion'],
  ['criterionState: {', 'criterion state issuance'],
  ['structuredClaim: {', 'structured claim issuance'],
  ['boundedNarrative: {', 'narrative issuance'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawProviderResponsePersisted: true', 'raw provider persistence'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity template persistence'],
]) forbidFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['data:image/jpeg;base64,', 'embedded real JPEG data'],
  ['data:image/png;base64,', 'embedded real PNG data'],
]) {
  forbidFragment(test, fragment, label);
  forbidFragment(hardening, fragment, label);
}

console.log('FR145_EPHEMERAL_REAL_CAPTURE_BRIDGE: PASS');
