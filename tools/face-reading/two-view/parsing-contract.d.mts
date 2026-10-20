export const PARSING_VERSION: string;
export const PARSING_LEGACY_VERSION: string;
export const PARSING_CROP_VERSION: string;
export const PARSING_PIN: {
  repository: string;
  sourceRevision: string;
  release: string;
  asset: string;
  sha256: string;
  runtime: string;
  size: number;
};
export const PARSING_LABELS: readonly string[];
export const PARSING_GROUPS: readonly {
  id: string;
  label: string;
  classes: number[];
  color: number[];
}[];
export type ParsingSummary =
  | {
      methodVersion: string;
      candidateOnly: true;
      status: 'completed';
      counts: number[];
      interfacePixels: number;
      checks?: { singleFace: true; eyesAligned: true; lipsAligned: true };
      earRefinement?:
        | {
            status: 'applied';
            pixels: number;
            checks: { singleFace: true; eyesAligned: true; lipsAligned: true };
          }
        | { status: 'unavailable'; reason: string; pixels: 0 };
      accuracyValidated?: false;
      canonicalReceiptIssued?: false;
    }
  | {
      methodVersion: string;
      candidateOnly: true;
      status: 'failed' | 'unavailable';
      reason: string;
    };
export function rgbTensor(rgba: ArrayLike<number>, width: number, height: number): Float32Array;
export function containSize(
  imageWidth: number,
  imageHeight: number,
  viewportWidth: number,
  viewportHeight: number,
): { width: number; height: number };
export function classifyLogits(
  data: ArrayLike<number>,
  dims: number[],
): { mask: Uint8Array; counts: number[] };
export function contactPixels(mask: Uint8Array, width: number, height: number): Uint8Array;
export function validateParsingSummary(
  input: unknown,
  options?: { allowLegacy?: boolean },
): ParsingSummary;
