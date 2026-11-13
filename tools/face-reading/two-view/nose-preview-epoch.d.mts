export const NOSE_PREVIEW_EPOCH_VERSION: 'local-nose-preview-epoch@0.1.0';
export function startNosePreview(result: object): number;
export function invalidateNosePreview(result: {
  noseMaskCandidate?: unknown;
  noseHumanComparison?: unknown;
}): void;
export function isCurrentNosePreview(result: object, epoch: number): boolean;
