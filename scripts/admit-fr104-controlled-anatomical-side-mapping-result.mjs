import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  admitNeutralEarControlledAnatomicalMappingResultFR104,
} from '../.face-reading-dist/neutral-ear-controlled-anatomical-side-mapping-result-intake-fr104.js';

function fail(message) {
  throw new Error('FR104 U4A admission: ' + message);
}

const input =
  process.env.FR104_U4A_RESULT_IN?.trim();
if (!input) {
  fail('FR104_U4A_RESULT_IN is required.');
}

const path = resolve(process.cwd(), input);
const serialized = readFileSync(path, 'utf8').trim();
if (!serialized) fail('result file is empty.');

const resultSha256 = createHash('sha256')
  .update(serialized)
  .digest('hex');
const result = JSON.parse(serialized);
const evidence =
  admitNeutralEarControlledAnatomicalMappingResultFR104(
    result,
    resultSha256,
  );

if (
  evidence.state
    !== 'reflection_parity_conditional_mapping_supported'
) {
  fail('admitted state mismatch.');
}
if (!evidence.controlledAnatomicalMappingAudited) {
  fail('controlled mapping audit authority was not admitted.');
}
if (
  !evidence
    .reflectionParityConditionalMappingSupportedOnExactFixture
) {
  fail('exact-fixture mapping support was not admitted.');
}
if (
  !evidence
    .controlledAnatomicalReferenceAdmittedForExactFixture
) {
  fail('exact-fixture controlled reference was not admitted.');
}
if (
  evidence.providerLabelMappedToAnatomicalSide
  || evidence.globalProviderAnatomicalSemanticsEstablished
  || evidence.anatomicalReferenceAdmitted
  || evidence.anatomicalLateralityAuthorized
  || evidence.validatedExternalEarObservationAuthorized
  || evidence.traditionalBindingAuthorized
  || evidence.productionAuthorization
) {
  fail('global or downstream authority was promoted unexpectedly.');
}

process.stdout.write(
  'FR104_U4A_ADMITTED_RESULT_SHA256 '
    + resultSha256
    + '\n',
);
process.stdout.write(
  'FR104_U4A_ADMITTED_STATE '
    + evidence.state
    + '\n',
);
