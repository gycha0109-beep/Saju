import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  admitNeutralEarGnmCrossSourceWitnessResultFR104,
} from '../.face-reading-dist/neutral-ear-gnm-cross-source-anatomical-witness-result-intake-fr104.js';

function fail(message) {
  throw new Error('FR104 U5A-B2 admission: ' + message);
}

const input = process.env.FR104_U5A_RESULT_IN?.trim();
if (!input) {
  fail('FR104_U5A_RESULT_IN is required.');
}

const path = resolve(process.cwd(), input);
const serialized = readFileSync(path, 'utf8').trim();
if (!serialized) {
  fail('result file is empty.');
}

const resultSha256 = createHash('sha256')
  .update(serialized)
  .digest('hex');

const expected =
  '7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21';

if (resultSha256 !== expected) {
  fail(
    'result digest drift expected='
      + expected
      + ' observed='
      + resultSha256,
  );
}

const evidence =
  admitNeutralEarGnmCrossSourceWitnessResultFR104(
    JSON.parse(serialized),
    resultSha256,
  );

if (
  evidence.state
    !== 'gnm_direct_left_right_joint_witness_supported'
) {
  fail('admitted state mismatch.');
}

if (!evidence.gnmCrossSourceSemanticWitnessAudited) {
  fail('bounded semantic witness authority missing.');
}

if (
  evidence.gnmCrossSourceGeometricValidationExecuted
  || evidence.providerLabelMappedToAnatomicalSide
  || evidence.globalProviderAnatomicalSemanticsEstablished
  || evidence.anatomicalReferenceAdmitted
  || evidence.anatomicalLateralityAuthorized
  || evidence.validatedExternalEarObservationAuthorized
  || evidence.traditionalBindingAuthorized
  || evidence.productionAuthorization
) {
  fail('downstream authority promoted unexpectedly.');
}

process.stdout.write(
  'FR104_U5A_ADMITTED_RESULT_SHA256 '
    + resultSha256
    + '\n',
);
process.stdout.write(
  'FR104_U5A_ADMITTED_STATE '
    + evidence.state
    + '\n',
);
