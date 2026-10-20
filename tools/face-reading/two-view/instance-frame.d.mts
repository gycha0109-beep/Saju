export const INSTANCE_PIN: {
  repository: string;
  revision: string;
  asset: string;
  sha256: string;
  size: number;
  score: number;
  nms: number;
  maxFaces: number;
  context: number;
  anchorRadius: number;
};
export type Point = { x: number; y: number };
export type InstanceBox = Point & { w: number; h: number; score: number; points: Point[] };
export type InstanceFrame = { left: number; top: number; side: number; angle: number };
export type Instance = {
  box: InstanceBox;
  frame: InstanceFrame;
  mask: Uint8Array;
  lipsAligned: boolean;
};
export function bgrTensor(rgba: ArrayLike<number>, size: number): Float32Array;
export function decodeFaces(
  outputs: Record<string, { dims: number[]; data: Float32Array }>,
  width: number,
  height: number,
): InstanceBox[];
export function instanceFrame(box: InstanceBox): InstanceFrame;
export function instancePoint(point: Point, size: number, frame: InstanceFrame): Point;
export function projectInstance(
  mask: Uint8Array,
  size: number,
  frame: InstanceFrame,
  width: number,
  height: number,
): Uint8Array;
export function instanceChecks(
  mask: Uint8Array,
  size: number,
  box: InstanceBox,
  frame: InstanceFrame,
): { noseAligned: boolean; lipsAligned: boolean };
export function mergeInstances(
  base: Uint8Array,
  size: number,
  instances: Instance[],
  width: number,
  height: number,
): { mask: Uint8Array; counts: number[] };
