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

// Historical metrics snapshots contain file metadata but no persisted digest.
// Reject stale or substituted originals without exposing private paths.
// A metadata match is explicitly weaker than an independent SHA binding.
export async function auditSavedRunSourceSnapshot(snapshot, inventory) {
  const fail = () => Object.freeze({ status: 'source_changed' });
  if (
    !snapshot ||
    !Array.isArray(snapshot.recordIds) ||
    !Array.isArray(snapshot.sourceFileStates) ||
    !Array.isArray(inventory) ||
    snapshot.recordIds.length !== inventory.length ||
    snapshot.sourceFileStates.length !== inventory.length ||
    new Set(snapshot.recordIds).size !== inventory.length ||
    new Set(snapshot.sourceFileStates.map((r) => r?.recordId)).size !== inventory.length
  )
    return fail();
  const sources = new Map(inventory.map((entry) => [entry.recordId, entry.sourcePath]));
  if (sources.size !== inventory.length) return fail();
  const shaByRef = snapshot.sourceSha256ByRecord;
  if (
    shaByRef !== undefined &&
    (!shaByRef ||
      typeof shaByRef !== 'object' ||
      Array.isArray(shaByRef) ||
      Object.keys(shaByRef).length !== inventory.length)
  )
    return fail();
  for (const ref of snapshot.recordIds) if (!sources.has(ref)) return fail();
  for (const entry of snapshot.sourceFileStates) {
    if (!entry || !sources.has(entry.recordId) || entry.sourcePath !== sources.get(entry.recordId))
      return fail();
    const expectedSha = shaByRef?.[entry.recordId];
    if (shaByRef !== undefined) {
      if ((await readCurrentPinnedPhoto(entry.sourcePath, entry, expectedSha)).status !== 'current')
        return fail();
    } else {
      try {
        const current = await stat(entry.sourcePath);
        if (
          !Number.isSafeInteger(entry.size) ||
          !Number.isFinite(entry.mtimeMs) ||
          !Number.isFinite(entry.ino) ||
          !sameFileState(current, entry)
        )
          return fail();
      } catch {
        return fail();
      }
    }
  }
  return Object.freeze({
    status: shaByRef ? 'sha256_verified' : 'legacy_metadata_only',
  });
}
