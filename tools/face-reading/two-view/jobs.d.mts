export interface JobState {
  captureRef: string;
  viewRole: string;
  state: string;
  reason?: string;
}
export class PreviewJobs {
  constructor(options?: { deadlineMs?: number; onChange?: (state: JobState[]) => void });
  generation: number;
  cancel(): void;
  snapshot(): JobState[];
  run<T extends { captureRef: string; viewRole: string }, R>(
    tasks: T[],
    handler: (task: T, context: { generation: number; signal: AbortSignal }) => Promise<R>,
  ): Promise<{
    generation: number;
    current: boolean;
    results: { captureRef: string; result?: R; error?: string }[];
  }>;
}
