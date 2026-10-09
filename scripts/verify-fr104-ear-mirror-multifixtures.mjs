import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import {
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104,
} from '../.face-reading-dist/neutral-ear-mirror-multifixture-protocol-fr104.js';

const protocol =
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104;
const verified = [];

for (const fixture of protocol.fixtures) {
  const response = await globalThis.fetch(fixture.assetUrl, {
    cache: 'no-store',
    headers: {
      'user-agent':
        'myeongha-fr104-multifixture-mirror-verifier',
    },
  });
  if (!response.ok) {
    throw new Error(
      'FR104 public multi-fixture fetch failed: '
        + fixture.fileName
        + ' HTTP '
        + response.status,
    );
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) {
    throw new Error(
      'FR104 public multi-fixture is empty: '
        + fixture.fileName,
    );
  }

  const actualSha256 =
    createHash('sha256').update(bytes).digest('hex');
  if (actualSha256 !== fixture.sha256) {
    throw new Error(
      'FR104 public multi-fixture SHA-256 mismatch: '
        + fixture.fileName
        + ' expected='
        + fixture.sha256
        + ' actual='
        + actualSha256,
    );
  }

  verified.push(Object.freeze({
    fixtureRef: fixture.fixtureRef,
    fileName: fixture.fileName,
    sha256: actualSha256,
    byteLength: bytes.length,
  }));
}

process.stdout.write(JSON.stringify({
  status: 'FR104_PUBLIC_MULTI_FIXTURES_VERIFIED',
  fixtureCount: verified.length,
  fixtures: verified,
  sourceImagesPersisted: false,
  userImagesConsumed: false,
}) + '\n');
