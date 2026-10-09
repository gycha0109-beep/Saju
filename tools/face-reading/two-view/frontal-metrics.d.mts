export const METHOD_VERSION: string;
export const METRIC_DEFINITIONS: readonly { id: string; label: string; region: string }[];
export interface PreviewMetric {
  metricKey: string;
  label: string;
  region: string;
  captureRef: string;
  viewRole: 'frontal' | 'profile';
  status: 'available' | 'unavailable';
  reason?: string;
  value?: number;
  unit?: 'ratio';
  candidateOnly: true;
  methodVersion: string;
}
export function computeFrontalMetrics(input: {
  landmarks: readonly { x: number; y: number }[];
  width: number;
  height: number;
  topology: Record<'eyeA' | 'eyeB' | 'mouth' | 'oval', readonly { start: number; end: number }[]>;
  captureRef: string;
  viewRole?: 'frontal' | 'profile';
}): PreviewMetric[];
