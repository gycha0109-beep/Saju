export const EYE_DIRECTION_VERSION: string;
export const EYE_TERM_KEY: string;
export function eyeClassAgreement(
  mask: Uint8Array,
  size: number,
  points: readonly { x: number; y: number }[],
  topology: Record<'eyeA' | 'eyeB', readonly { start: number; end: number }[]>,
  frame: { left: number; top: number; side: number },
  width: number,
  height: number,
): boolean;
export type EyeDirection = {
  methodVersion: string;
  sourceTermKey: string;
  traditionalBindingAuthorized: false;
} & (
  | { status: 'unavailable'; reason: string }
  | {
      status: 'available';
      eyes: {
        imageSide: 'left' | 'right';
        outerMinusInnerHeightRatio: number;
        angleDegrees: number;
      }[];
    }
);
export function unavailableEyeDirection(reason: string): EyeDirection;
export function computeEyeDirection(input: {
  landmarks: readonly { x: number; y: number }[];
  width: number;
  height: number;
  topology: Record<'eyeA' | 'eyeB', readonly { start: number; end: number }[]>;
  viewRole: 'frontal' | 'profile';
}): EyeDirection;
export function validateEyeDirection(
  input: unknown,
  options?: { viewRole?: 'frontal' | 'profile' },
): EyeDirection;
export function describeEyeDirection(input: EyeDirection): {
  status: 'available' | 'unavailable';
  text: string;
};
