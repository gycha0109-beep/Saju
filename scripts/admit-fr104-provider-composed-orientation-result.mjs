import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  admitNeutralEarProspectiveComposedOrientationResultFR104,
} from '../.face-reading-dist/neutral-ear-prospective-composed-orientation-result-intake-fr104.js';

function fail(message) {
  throw new Error('FR104 U3.3B admission: ' + message);
}

const input =
  process.env.FR104_U3_3_RESULT_IN?.trim();
if (!input) {
  fail('FR104_U3_3_RESULT_IN is required.');
}

const path = resolve(process.cwd(), input);
const serialized = readFileSync(path, 'utf8').trim();
if (!serialized) fail('result file is empty.');

const resultSha256 = createHash('sha256')
  .update(serialized)
  .digest('hex');
const result = JSON.parse(serialized);
const evidence =
  admitNeutralEarProspectiveComposedOrientationResultFR104(
    result,
    resultSha256,
  );

if (
  evidence.state
    !== 'prospective_composed_normalization_supported'
) {
  fail('admitted state mismatch.');
}
if (!evidence.prospectiveComposedNormalizationValidated) {
  fail('prospective validation authority was not admitted.');
}
if (
  !evidence
    .providerCompensatedOutputFrameProspectivelyValidated
) {
  fail('provider output-frame prospective validation was not admitted.');
}
if (
  evidence.anatomicalLateralityAuthorized
  || evidence.traditionalBindingAuthorized
  || evidence.productionAuthorization
) {
  fail('U4 or downstream authority was promoted unexpectedly.');
}

process.stdout.write(
  'FR104_U3_3_ADMITTED_RESULT_SHA256 '
    + resultSha256
    + '\n',
);
process.stdout.write(
  'FR104_U3_3_ADMITTED_STATE '
    + evidence.state
    + '\n',
);
