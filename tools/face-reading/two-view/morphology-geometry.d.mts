export const MORPHOLOGY_VERSION: string;
type Missing = { status: 'unavailable'; reason: string };
export type Morphology = {
  methodVersion: string;
  traditionalBindingAuthorized: false;
  browSpan: Missing | { status: 'available'; ratios: number[] };
  lipBalance: Missing | { status: 'available'; upper: number; lower: number; opening: number };
  noseExtent:
    Missing | { status: 'available'; widthToEyeSpacing: number; heightToEyeSpacing: number };
};
export function unavailableMorphology(reason: string): Morphology;
export function validateMorphology(
  input: unknown,
  options?: { viewRole?: 'frontal' | 'profile' },
): Morphology;
export function computeMorphology(input: {
  landmarks: { x: number; y: number }[];
  width: number;
  height: number;
  topology: Record<'eyeA' | 'eyeB' | 'browA' | 'browB' | 'mouth', { start: number; end: number }[]>;
  viewRole: 'frontal' | 'profile';
  checks: { eyes: boolean; brows: boolean; lips: boolean; nose: boolean };
  nosePoints?: { x: number; y: number; clipped: boolean }[];
}): Morphology;
