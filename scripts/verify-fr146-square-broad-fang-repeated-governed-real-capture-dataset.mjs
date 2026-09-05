import { readFileSync } from 'node:fs';
import { stdout } from 'node:process';

const runtimePath = 'packages/face-reading/src/five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.ts';
const testPath = 'packages/face-reading/src/five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.test.ts';
const notePath = 'research/face-reading/fr146-square-broad-fang-repeated-governed-real-capture-dataset.md';

const runtime = readFileSync(runtimePath, 'utf8');
const test = readFileSync(testPath, 'utf8');
const note = readFileSync(notePath, 'utf8');

function requireFragment(text, fragment, label) {
  if (!text.includes(fragment)) throw new Error(`FR146 verifier missing ${label}: ${fragment}`);
}

function forbidFragment(text, fragment, label) {
  if (text.includes(fragment)) throw new Error(`FR146 verifier found forbidden ${label}: ${fragment}`);
}

for (const [fragment, label] of [
  ['runSquareBroadFangEphemeralRealCaptureFR145', 'FR145 bridge reuse'],
  ['assertIssuedSquareBroadFangNeutralCaptureRecordFR144', 'FR144 issued-record lineage'],
  ['materializeSquareBroadFangNeutralAcquisitionDatasetFR144', 'FR144 dataset materializer reuse'],
  ['validateMediaPipeScreenToMetricReimplementationParityFR76', 'FR76 parity validation'],
  ['MIN_REPEATED_CAPTURE_COUNT = 2', 'minimum repeated-capture cardinality'],
  ['transientSha256', 'transient source-byte duplicate detection'],
  ['exact duplicate source image bytes', 'duplicate-byte rejection'],
  ['sourceDigestPersisted: false', 'source digest non-persistence'],
  ['sourceDigestReturned: false', 'source digest non-return'],
  ['captureQualityValidated: false', 'capture-quality non-promotion'],
  ['empiricalRepeatabilityEstablished: false', 'repeatability non-promotion'],
  ['repeatabilityClassificationIssued: false', 'repeatability classification closed'],
  ['numericRepeatabilityAcceptanceThreshold: null', 'repeatability threshold closed'],
  ["constructValidity: 'unresolved'", 'construct validity unresolved'],
  ["traditionalBinding: 'unresolved'", 'traditional binding unresolved'],
  ['criterionState: null', 'criterion state closed'],
  ['structuredClaim: null', 'structured claim closed'],
  ['boundedNarrative: null', 'bounded narrative closed'],
  ['rawImagePersisted: false', 'raw image non-persistence'],
  ['rawProviderResponsePersisted: false', 'raw provider non-persistence'],
  ['embeddingPersisted: false', 'embedding non-persistence'],
  ['identityTemplatePersisted: false', 'identity template non-persistence'],
  ['byteDistinctnessMeansIndependentCaptureEvent: false', 'byte distinctness event boundary'],
  ['byteDistinctnessMeansNeutralExpressionValidity: false', 'byte distinctness quality boundary'],
  ['square_broad_fang_capture_quality_and_multi_session_condition_governance_before_repeatability_interpretation', 'next frontier'],
]) requireFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['rejects exact duplicate source bytes before provider execution even when refs differ', 'duplicate-byte test'],
  ['rejects a singleton series before any real-capture execution', 'singleton rejection test'],
  ['uses active FR144 issuance by default and rejects a structurally plausible forged capture record', 'issued-lineage hardening test'],
  ['fails closed when an injected FR145 result widens semantic authority', 'semantic widening test'],
]) requireFragment(test, fragment, label);

for (const [fragment, label] of [
  ['byte distinctness != independent capture event != capture quality != empirical repeatability', 'empirical authority separation'],
  ['image geometry != construct validity != traditional meaning', 'semantic authority separation'],
  ['A true FR146 real-series run requires at least one additional independently captured source image', 'external capture requirement'],
  ['No real user image is committed or uploaded to CI.', 'real-image CI exclusion'],
  ['empiricalRepeatabilityEstablished: false', 'note repeatability unresolved'],
  ['construct validity: unresolved', 'note construct validity unresolved'],
  ['traditional binding: unresolved', 'note traditional binding unresolved'],
]) requireFragment(note, fragment, label);

for (const [fragment, label] of [
  ['traditionalSemanticAuthority: true', 'traditional authority promotion'],
  ["constructValidity: 'established'", 'construct validity promotion'],
  ["traditionalBinding: 'established'", 'traditional binding promotion'],
  ['empiricalRepeatabilityEstablished: true', 'empirical repeatability promotion'],
  ['repeatabilityClassificationIssued: true', 'repeatability classification promotion'],
  ['rawImagePersisted: true', 'raw image persistence'],
  ['rawProviderResponsePersisted: true', 'raw provider persistence'],
  ['sourceDigestPersisted: true', 'source digest persistence'],
  ['sourceDigestReturned: true', 'source digest return'],
  ['embeddingPersisted: true', 'embedding persistence'],
  ['identityTemplatePersisted: true', 'identity template persistence'],
]) forbidFragment(runtime, fragment, label);

for (const [fragment, label] of [
  ['data:image/jpeg;base64,', 'embedded real JPEG data'],
  ['data:image/png;base64,', 'embedded real PNG data'],
]) {
  forbidFragment(test, fragment, label);
  forbidFragment(note, fragment, label);
}

stdout.write('FR146_REPEATED_GOVERNED_REAL_CAPTURE_DATASET: PASS\n');
