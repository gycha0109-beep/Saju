/* global process, fetch, console, setTimeout */
// Read-only validation of the real private intake plus a disposable copied original.
// Requires an existing private intake; never modifies an inventory source or publishes it.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  copyFile,
  mkdtemp,
  readFile,
  rm,
  stat,
  symlink,
  utimes,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';
import { createLocalReviewServer } from './server.mjs';
import { openSourceCurrentnessBrowser } from './source-currentness-browser-probe.mjs';

const intakeArg = process.argv.indexOf('--intake');
if (intakeArg < 0 || !process.argv[intakeArg + 1])
  throw Error('USAGE: node source-currentness-live-smoke.mjs --intake <existing-private-intake>');
const sourceIntake = resolve(process.argv[intakeArg + 1]);
const inventory = JSON.parse(await readFile(join(sourceIntake, 'inventory.json'), 'utf8'));
assert.ok(Array.isArray(inventory) && inventory.length > 0, 'PRIVATE_INVENTORY_REQUIRED');
const originalPath = inventory[0].sourcePath;
const imageBefore = await stat(originalPath);
assert.ok(imageBefore.size > 8, 'PRIVATE_IMAGE_REQUIRED');

const temporary = await mkdtemp(join(tmpdir(), 'face-local-currentness-'));
let server;
let browser;
try {
  const copiedImage = join(temporary, 'disposable-source' + extname(originalPath));
  await copyFile(originalPath, copiedImage);
  inventory[0] = { ...inventory[0], sourcePath: copiedImage };
  await writeFile(join(temporary, 'inventory.json'), JSON.stringify(inventory));
  // The private optional captures can point to transient deleted files; exercise the 18 base photos only.
  for (const name of ['combined-active.json']) {
    try {
      await copyFile(join(sourceIntake, name), join(temporary, name));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  await symlink(
    join(sourceIntake, 'assets'),
    join(temporary, 'assets'),
    process.platform === 'win32' ? 'junction' : 'dir',
  );

  // Keep the server's strict local Host and port contract unchanged.
  const port = 18768; // Fixed loopback-only smoke port; avoids Windows excluded ephemeral ranges.
  server = await createLocalReviewServer({ intake: temporary, port });
  await new Promise((yes, no) => {
    server.once('error', no);
    server.listen(port, '127.0.0.1', yes);
  });
  const address = 'http://127.0.0.1:' + port;
  if (process.argv.includes('--browser')) {
    browser = await openSourceCurrentnessBrowser({ address, temporary });
    await browser.untilReady();
  }
  const current = await fetch(address + '/two-view/state', { cache: 'no-store' });
  assert.equal(current.status, 200, 'INITIAL_CURRENT_STATE_REQUIRED');
  const before = await current.text();
  const initial = JSON.parse(before);
  assert.ok(initial.records?.length >= inventory.length, 'PRIVATE_BATCH_INCOMPLETE');
  assert.ok(!before.includes(copiedImage), 'PRIVATE_SOURCE_PATH_EXPOSED');

  // Change one byte without changing the length and restore the timestamp.
  // The real inventory's source path is never touched.
  const statBefore = await stat(copiedImage);
  const bytes = await readFile(copiedImage);
  bytes[bytes.length - 1] ^= 1;
  await writeFile(copiedImage, bytes);
  await utimes(copiedImage, statBefore.atime, statBefore.mtime);
  const statAfter = await stat(copiedImage);
  assert.equal(statAfter.size, statBefore.size, 'TEST_COPY_SIZE_DRIFT');
  assert.ok((await stat(originalPath)).size === imageBefore.size, 'ORIGINAL_SIZE_CHANGED');

  const changed = await fetch(address + '/two-view/state', { cache: 'no-store' });
  assert.equal(changed.status, 409, 'SOURCE_CHANGE_MUST_BLOCK_STATE');
  assert.equal((await changed.json()).error, 'SOURCE_CHANGED_RESTART_REQUIRED');
  const changedImage = await fetch(address + '/image/' + inventory[0].recordId);
  assert.equal(changedImage.status, 409, 'SOURCE_CHANGE_MUST_BLOCK_IMAGE');
  assert.equal((await changedImage.json()).error, 'SOURCE_CHANGED_RESTART_REQUIRED');

  if (browser) await browser.untilBlocked();
  const unchangedSha = createHash('sha256')
    .update(await readFile(originalPath))
    .digest('hex');
  assert.ok(!before.includes(unchangedSha), 'PRIVATE_SOURCE_DIGEST_EXPOSED');
  console.log(
    JSON.stringify({
      status: 'PASS',
      privatePhotoCount: initial.records.length,
      disposableByteChanged: true,
      stateBefore: 200,
      stateAfter: 409,
      imageAfter: 409,
      realOriginalUntouched: true,
      browserStaleViewCleared: browser ? true : 'not_requested',
    }),
  );
} finally {
  if (browser) await browser.close().catch(() => {});
  if (server) await new Promise((done) => server.close(done));
  for (let attempt = 0; attempt < 15; attempt++) {
    try {
      await rm(temporary, { recursive: true, force: true, maxRetries: 1 });
      break;
    } catch (error) {
      if (error.code !== 'EBUSY' || attempt === 14) console.warn('TEST_TEMP_CLEANUP_PENDING');
      if (error.code !== 'EBUSY' || attempt === 14) break;
      await new Promise((done) => setTimeout(done, 250));
    }
  }
}
