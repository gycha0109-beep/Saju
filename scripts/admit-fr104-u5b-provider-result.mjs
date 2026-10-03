import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  admitNeutralEarGnmCrossSourceGeometryResultFR104,
} from '../.face-reading-dist/neutral-ear-gnm-cross-source-geometric-result-intake-fr104.js';

function fail(message) {
  throw new Error('FR104 U5B-D admission: ' + message);
}

const input = process.env.FR104_U5B_D_RESULT_IN?.trim();
if (!input) fail('FR104_U5B_D_RESULT_IN is required.');

const path = resolve(process.cwd(), input);
const serialized = readFileSync(path, 'utf8').trim();
if (!serialized) fail('result file is empty.');

const resultSha256 = createHash('sha256')
  .update(serialized)
  .digest('hex');
const result = JSON.parse(serialized);
const evidence =
  admitNeutralEarGnmCrossSourceGeometryResultFR104(
    result,
    resultSha256,
  );

if (
  evidence.state
    !== 'gnm_cross_source_geometric_mapping_supported'
) {
  fail('admitted state mismatch.');
}
if (
  !evidence.gnmCrossSourceSemanticWitnessAudited
  || !evidence.gnmCrossSourceFixtureDigestPinned
  || !evidence.gnmCrossSourceGeometricValidationExecuted
  || !evidence.gnmCrossSourceGeometricMappingValidated
) {
  fail('bounded U5B validation authority missing.');
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
  'FR104_U5B_D_ADMITTED_RESULT_SHA256 '
    + resultSha256
    + '\n',
);
process.stdout.write(
  'FR104_U5B_D_ADMITTED_STATE '
    + evidence.state
    + '\n',
);
