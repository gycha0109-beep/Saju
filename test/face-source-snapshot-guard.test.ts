import { afterEach, describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm, stat, utimes, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  SOURCE_SNAPSHOT_GUARD_VERSION,
  readCurrentPinnedPhoto,
  auditSavedRunSourceSnapshot,
} from '../tools/face-reading/two-view/source-snapshot-guard.mjs';

const directories: string[] = [];
async function photoFixture() {
  const dir = await mkdtemp(join(tmpdir(), 'face-source-guard-test-'));
  directories.push(dir);
  const source = join(dir, 'synthetic-photo.jpg');
  const bytes = Buffer.from('not-a-real-face-image-test-a');
  await writeFile(source, bytes);
  const pinned = await stat(source);
  const sha = createHash('sha256').update(bytes).digest('hex');
  return { source, bytes, pinned, sha };
}
afterEach(async () => {
  for (const dir of directories.splice(0)) {
    await rm(dir, { force: true, recursive: true });
  }
});
describe('local pinned-source SHA guard for face photo endpoints', () => {
  it('returns the exact verified source buffer only when baseline metadata and bytes match', async () => {
    const { source, bytes, pinned, sha } = await photoFixture();
    const result = await readCurrentPinnedPhoto(source, pinned, sha);
    expect(SOURCE_SNAPSHOT_GUARD_VERSION).toBe('local-face-source-snapshot-guard@0.1.0');
    expect(result.status).toBe('current');
    if (result.status === 'current') {
      expect(result.bytes).toEqual(bytes);
      expect(result.bytes).toEqual(await readFile(source));
    }
    expect(Object.keys(result).sort()).toEqual(['bytes', 'status']);
  });
  it('rejects changed contents even if size and timestamps are restored', async () => {
    const { source, pinned, sha } = await photoFixture();
    await writeFile(source, Buffer.from('not-a-real-face-image-test-b'));
    await utimes(source, pinned.atime, pinned.mtime);
    const observed = await readCurrentPinnedPhoto(source, pinned, sha);
    expect(observed).toEqual({ status: 'source_changed' });
  });
  it('rejects changed metadata, deleted original and incorrect hash', async () => {
    const { source, pinned, sha } = await photoFixture();
    expect(await readCurrentPinnedPhoto(source, pinned, '0'.repeat(64))).toEqual({
      status: 'source_changed',
    });
    await writeFile(source, Buffer.from('longer-but-synthetic-data'));
    expect(await readCurrentPinnedPhoto(source, pinned, sha)).toEqual({
      status: 'source_changed',
    });
    await rm(source);
    expect(await readCurrentPinnedPhoto(source, pinned, sha)).toEqual({
      status: 'source_changed',
    });
  });
  it('audits saved research run provenance without claiming legacy metadata is a SHA proof', async () => {
    const { source, pinned, sha } = await photoFixture();
    const inventory = [{ recordId: 'capture-99', sourcePath: source }];
    const legacy = {
      recordIds: ['capture-99'],
      sourceFileStates: [{ recordId: 'capture-99', sourcePath: source, ...pinned }],
    };
    expect(await auditSavedRunSourceSnapshot(legacy, inventory)).toEqual({
      status: 'legacy_metadata_only',
    });
    const protectedRun = { ...legacy, sourceSha256ByRecord: { 'capture-99': sha } };
    expect(await auditSavedRunSourceSnapshot(protectedRun, inventory)).toEqual({
      status: 'sha256_verified',
    });
    for (const invalid of [
      { ...protectedRun, recordIds: ['capture-other'] },
      {
        ...protectedRun,
        sourceFileStates: [{ ...legacy.sourceFileStates[0], sourcePath: source + '.other' }],
      },
      { ...protectedRun, sourceSha256ByRecord: { 'capture-99': '0'.repeat(64) } },
      { ...protectedRun, sourceSha256ByRecord: {} },
    ])
      expect(await auditSavedRunSourceSnapshot(invalid as typeof protectedRun, inventory)).toEqual({
        status: 'source_changed',
      });
    await writeFile(source, Buffer.from('not-a-real-face-image-test-b'));
    await utimes(source, pinned.atime, pinned.mtime);
    expect(await auditSavedRunSourceSnapshot(protectedRun, inventory)).toEqual({
      status: 'source_changed',
    });
    const serialized = JSON.stringify(await auditSavedRunSourceSnapshot(protectedRun, inventory));
    expect(serialized).not.toContain(source);
    expect(serialized).not.toContain(sha);
  });
  it('fails closed for missing metadata or malformed digest without leaking input', async () => {
    const { source, pinned, sha } = await photoFixture();
    const invalid = [
      ['', pinned, sha],
      [source, { ...pinned, size: -1 }, sha],
      [source, pinned, 'bad-sha'],
      [source, pinned, undefined],
    ] as const;
    for (const [path, metadata, digest] of invalid) {
      expect(await readCurrentPinnedPhoto(path, metadata, digest as string)).toEqual({
        status: 'source_changed',
      });
    }
  });
});
