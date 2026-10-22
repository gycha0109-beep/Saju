export const METHOD_VERSION: string;
export function modelCycle(
  edges: readonly { start: number; end: number }[],
  landmarks: readonly { x: number; y: number }[],
  width: number,
  height: number,
  allowComponents?: boolean,
): { x: number; y: number; clipped: boolean }[];
export function eyePairFrame(
  a: readonly { x: number; y: number }[],
  b: readonly { x: number; y: number }[],
): null | {
  centroid: (points: readonly { x: number; y: number }[]) => { x: number; y: number };
  length: number;
  project: (point: { x: number; y: number }) => { x: number; y: number };
};
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
