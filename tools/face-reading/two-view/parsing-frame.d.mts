export const FRAME_POLICY: Readonly<{
  expansion: number;
  anchorRadius: number;
  anchorSupport: number;
  earComponent: number;
}>;
export type FaceFrame = { left: number; top: number; side: number };
type Point = { x: number; y: number };
type Edge = { start: number; end: number };
export function faceFrame(points: Point[], width: number, height: number): FaceFrame;
export function supportedAnchors(
  mask: Uint8Array,
  size: number,
  points: Point[],
  edges: Edge[],
  labels: number[],
  frame: FaceFrame,
  width: number,
  height: number,
): boolean;
export function removeEarFragments(mask: Uint8Array, size: number): Uint8Array;
export function projectMask(
  mask: Uint8Array,
  size: number,
  frame: FaceFrame,
  width: number,
  height: number,
): { mask: Uint8Array; counts: number[] };
