import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  admitNeutralEarProspectiveIndependentGeometryResultFR104,
} from '../.face-reading-dist/neutral-ear-prospective-independent-geometry-result-intake-fr104.js';

function fail(message) {
  throw new Error('FR104 U4B-C admission: ' + message);
}

const input = process.env.FR104_U4B_C_RESULT_IN?.trim();
if (!input) fail('FR104_U4B_C_RESULT_IN is required.');

const path = resolve(process.cwd(), input);
const serialized = readFileSync(path, 'utf8').trim();
if (!serialized) fail('result file is empty.');

const resultSha256 = createHash('sha256')
  .update(serialized)
  .digest('hex');
const result = JSON.parse(serialized);
const evidence =
  admitNeutralEarProspectiveIndependentGeometryResultFR104(
    result,
    resultSha256,
  );

if (
  evidence.state
    !== 'prospective_independent_geometry_mapping_supported'
) {
  fail('admitted state mismatch.');
}
if (
  !evidence.prospectiveIndependentGeometryValidationExecuted
  || !evidence.prospectiveIndependentGeometryMappingValidated
) {
  fail('bounded prospective validation authority missing.');
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
  fail('global or downstream authority promoted unexpectedly.');
}

process.stdout.write(
  'FR104_U4B_C_ADMITTED_RESULT_SHA256 '
    + resultSha256
    + '\n',
);
process.stdout.write(
  'FR104_U4B_C_ADMITTED_STATE '
    + evidence.state
    + '\n',
);
