export const SOURCE_SNAPSHOT_GUARD_VERSION: 'local-face-source-snapshot-guard@0.1.0';
export interface FaceSourceFileState {
  readonly size: number;
  readonly mtimeMs: number;
  readonly ino: number;
}
export type FaceSourceSnapshotCheck =
  Readonly<{ status: 'source_changed' }> | Readonly<{ status: 'current'; bytes: Buffer }>;
export function readCurrentPinnedPhoto(
  sourcePath: string,
  pinned: FaceSourceFileState,
  expectedSha256: string,
): Promise<FaceSourceSnapshotCheck>;
