export const faceClasses: number[];
export type RegionQuality = Record<
  string,
  { status: 'unchecked' | 'screened' | 'suppressed'; removedPixels: number }
>;
export type QualityAnchors = Record<
  string,
  { x: number; y: number; radiusX?: number; radiusY?: number }[]
>;
export function components(mask: Uint8Array, size: number, classes: number[]): number[][];
export function screenRegions(
  mask: Uint8Array,
  size: number,
  anchors: QualityAnchors | null,
  radius: number,
): { mask: Uint8Array; quality: RegionQuality };
export function screenEarOverlay(
  faceMask: Uint8Array,
  earMask: Uint8Array,
  size: number,
  anchors: QualityAnchors | null,
  radius: number,
): { mask: Uint8Array; quality: RegionQuality[string] };
