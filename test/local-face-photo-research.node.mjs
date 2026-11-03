import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import process from 'node:process';

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
