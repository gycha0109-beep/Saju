import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from '../.face-reading-dist/neutral-ear-mirror-independent-fixture-protocol-fr104.js';

const protocol =
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104;

const response =
  await globalThis.fetch(protocol.fixture.assetUrl, {
    cache: 'no-store',
    headers: {
      'user-agent':
        'myeongha-fr104-independent-public-fixture-verifier',
    },
  });

if (!response.ok) {
  throw new Error(
    'FR104 independent public fixture fetch failed: HTTP '
      + response.status,
  );
}

const bytes = Buffer.from(await response.arrayBuffer());
if (bytes.length === 0) {
  throw new Error(
    'FR104 independent public fixture is empty.',
  );
}

const actualSha256 =
  createHash('sha256').update(bytes).digest('hex');

if (actualSha256 !== protocol.fixture.sha256) {
  throw new Error(
    'FR104 independent public fixture SHA-256 mismatch: expected='
      + protocol.fixture.sha256
      + ' actual='
      + actualSha256,
  );
}

process.stdout.write(JSON.stringify({
  status: 'FR104_INDEPENDENT_PUBLIC_FIXTURE_VERIFIED',
  fixtureRef: protocol.fixture.fixtureRef,
  sha256: actualSha256,
  byteLength: bytes.length,
  sourceImagePersisted: false,
  userImageConsumed: false,
}) + '\n');
