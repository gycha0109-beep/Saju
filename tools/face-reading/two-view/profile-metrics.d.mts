export const PROFILE_VERSION: string;
export const PROFILE_DEFINITIONS: readonly { id: string; label: string }[];
export type ProfileMetric =
  | { id: string; status: 'available'; value: number; unit: 'ratio' }
  | { id: string; status: 'unavailable'; reason: string };
export type ProfileSummary =
  | { status: 'not_requested' }
  | { methodVersion: string; status: 'completed'; metrics: ProfileMetric[] };
export function unavailableProfile(reason: string): ProfileSummary;
export function measureProfile(
  mask: Uint8Array,
  size: number,
  checks: { referenceSupported: boolean; lipsAligned: boolean; sourceClipped?: boolean },
): ProfileSummary;
export function sourceFaceClipped(
  mask: Uint8Array,
  size: number,
  frame: { left: number; top: number; side: number; angle?: number },
  width: number,
  height: number,
): boolean;
export function validateProfile(input: unknown): ProfileSummary;
