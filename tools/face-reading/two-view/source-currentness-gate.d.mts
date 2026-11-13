export const SOURCE_CURRENTNESS_GATE_VERSION: 'local-face-source-currentness-gate@0.1.0';
export type SourceCurrentnessStatus = 'current' | 'source_changed' | 'check_failed';
export function createSourceCurrentnessGate(options: {
  probe: () => Promise<SourceCurrentnessStatus>;
  onBlocked: (reason: Exclude<SourceCurrentnessStatus, 'current'>) => void;
}): Readonly<{ check(): Promise<boolean>; readonly blocked: boolean }>;
