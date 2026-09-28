import { createHash } from 'node:crypto';
import process from 'node:process';

import {
  NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104,
} from '../.face-reading-dist/neutral-ear-mirror-pair-protocol-fr104.js';

const protocol = NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104;
const response = await globalThis.fetch(protocol.fixture.assetUrl, {
  cache: 'no-store',
  headers: {
    'user-agent': 'myeongha-fr104-mirror-pair-fixture-verifier',
  },
});

if (!response.ok) {
  throw new Error(
    'FR104 public mirror fixture fetch failed: HTTP ' + response.status,
  );
}

const bytes = Buffer.from(await response.arrayBuffer());
if (bytes.length === 0) {
  throw new Error('FR104 public mirror fixture is empty.');
}

const actualSha256 = createHash('sha256').update(bytes).digest('hex');
if (actualSha256 !== protocol.fixture.sha256) {
  throw new Error(
    'FR104 public mirror fixture SHA-256 mismatch: expected='
      + protocol.fixture.sha256
      + ' actual='
      + actualSha256,
  );
}

process.stdout.write(JSON.stringify({
  status: 'FR104_PUBLIC_MIRROR_FIXTURE_VERIFIED',
  fileName: protocol.fixture.fileName,
  sha256: actualSha256,
  byteLength: bytes.length,
  sourceImagePersisted: false,
  userImageConsumed: false,
}) + '\n');
