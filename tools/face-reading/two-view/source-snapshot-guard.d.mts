export const SOURCE_SNAPSHOT_GUARD_VERSION: 'local-face-source-snapshot-guard@0.1.0';
export interface FaceSourceFileState {
  readonly size: number;
  readonly mtimeMs: number;
  readonly ino: number;
}
export type FaceSourceSnapshotCheck =
  Readonly<{ status: 'source_changed' }> | Readonly<{ status: 'current'; bytes: Buffer }>;
export type SavedRunSourceAudit =
  | Readonly<{ status: 'source_changed' }>
  | Readonly<{ status: 'legacy_metadata_only' | 'sha256_verified' }>;
export function auditSavedRunSourceSnapshot(
  snapshot: {
    recordIds: readonly string[];
    sourceFileStates: readonly (FaceSourceFileState & {
      recordId: string;
      sourcePath: string;
    })[];
    sourceSha256ByRecord?: Readonly<Record<string, string>>;
  },
  inventory: readonly { recordId: string; sourcePath: string }[],
): Promise<SavedRunSourceAudit>;
export function readCurrentPinnedPhoto(
  sourcePath: string,
  pinned: FaceSourceFileState,
  expectedSha256: string,
): Promise<FaceSourceSnapshotCheck>;
