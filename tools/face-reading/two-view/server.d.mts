import type { Server } from 'node:http';
import type { PreviewMetric } from './frontal-metrics.mjs';
export function validateBatch(
  input: {
    methodVersion: string;
    records: { captureRef: string; metrics: PreviewMetric[]; error?: string }[];
  },
  ids: string[],
  roles?: Map<string, 'frontal' | 'profile'>,
): { captureRef: string; metrics: PreviewMetric[]; error?: string }[];
export function createLocalReviewServer(options?: {
  intake?: string;
  port?: number;
}): Promise<Server>;
