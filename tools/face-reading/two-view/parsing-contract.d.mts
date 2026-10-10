export const PARSING_VERSION: string;
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
      accuracyValidated?: false;
      canonicalReceiptIssued?: false;
    }
  | { methodVersion: string; candidateOnly: true; status: 'failed'; reason: string };
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
export function validateParsingSummary(input: unknown): ParsingSummary;
