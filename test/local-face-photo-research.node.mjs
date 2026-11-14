import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import process from 'node:process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';

test('photo CLI rejects a missing private input without echoing its path', () => {
  const marker = 'PRIVATE_PHOTO_PATH_MUST_NOT_BE_ECHOED.jpg';
  const child = spawnSync(
    process.execPath,
    ['scripts/run-face-static-research-rules.mjs', '--image', marker],
    { encoding: 'utf8' },
  );
  assert.equal(child.status, 1);
  assert.equal(child.stdout, '');
  assert.equal(JSON.parse(child.stderr).error, 'LOCAL_FACE_PHOTO_RESEARCH_FAILED');
  assert.ok(!child.stderr.includes(marker));
});

test('photo CLI rejects a repository source output before reading the photo', () => {
  const child = spawnSync(
    process.execPath,
    [
      'scripts/run-face-static-research-rules.mjs',
      '--image',
      'absent.jpg',
      '--output',
      'src/private-photo-report.json',
    ],
    { encoding: 'utf8' },
  );
  assert.equal(child.status, 1);
  assert.equal(child.stdout, '');
  assert.equal(JSON.parse(child.stderr).error, 'LOCAL_FACE_PHOTO_RESEARCH_FAILED');
});

test('byte-bound labels reject another capture or raster frame before inference', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'face-photo-label-test-'));
  try {
    const image = join(dir, 'private-photo');
    const bytes = Buffer.from('synthetic-not-an-image');
    await writeFile(image, bytes);
    const digest = 'sha256:' + createHash('sha256').update(bytes).digest('hex');
    for (const [hash, frame] of [
      [`sha256:${'b'.repeat(64)}`, 'encoded_raster_top_left_no_exif_rotation'],
      [digest, 'rotated'],
    ]) {
      const reference = join(dir, 'labels.json');
      await writeFile(
        reference,
        JSON.stringify({
          schemaVersion: 'face-photo-private-image-labels-v1',
          sourceImageSha256: hash,
          coordinateFrame: frame,
        }),
      );
      const child = spawnSync(
        process.execPath,
        [
          'scripts/run-face-static-research-rules.mjs',
          '--image',
          image,
          '--image-reference-file',
          reference,
        ],
        { encoding: 'utf8' },
      );
      assert.equal(child.status, 1);
      assert.equal(child.stdout, '');
      assert.equal(JSON.parse(child.stderr).error, 'LOCAL_FACE_PHOTO_RESEARCH_FAILED');
      assert.ok(!child.stderr.includes(dir));
      assert.ok(!child.stderr.includes(digest));
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
