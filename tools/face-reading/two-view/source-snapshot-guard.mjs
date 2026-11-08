import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';

// Local, read-only source guard. Never log paths, hashes or photo bytes.
// The caller may reuse the returned *verified* buffer for /image to avoid a
// second unverified filesystem read after checking its contents.
export const SOURCE_SNAPSHOT_GUARD_VERSION = 'local-face-source-snapshot-guard@0.1.0';

function sameFileState(current, pinned) {
  return (
    current.isFile() &&
    current.size === pinned.size &&
    current.mtimeMs === pinned.mtimeMs &&
    current.ino === pinned.ino
  );
}

export async function readCurrentPinnedPhoto(sourcePath, pinned, expectedSha256) {
  if (
    typeof sourcePath !== 'string' ||
    !sourcePath ||
    !pinned ||
    !Number.isSafeInteger(pinned.size) ||
    pinned.size < 1 ||
    !Number.isFinite(pinned.mtimeMs) ||
    !Number.isFinite(pinned.ino) ||
    pinned.ino < 0 ||
    typeof expectedSha256 !== 'string' ||
    !/^[a-f0-9]{64}$/u.test(expectedSha256)
  )
    return { status: 'source_changed' };

  try {
    const before = await stat(sourcePath);
    if (!sameFileState(before, pinned)) return { status: 'source_changed' };
    const bytes = await readFile(sourcePath);
    if (bytes.length !== pinned.size) return { status: 'source_changed' };
    const digest = createHash('sha256').update(bytes).digest('hex');
    if (digest !== expectedSha256) return { status: 'source_changed' };
    const after = await stat(sourcePath);
    if (!sameFileState(after, pinned) || !sameFileState(after, before))
      return { status: 'source_changed' };
    return { status: 'current', bytes };
  } catch {
    return { status: 'source_changed' };
  }
}
