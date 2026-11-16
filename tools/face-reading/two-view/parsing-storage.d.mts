import type { Buffer } from 'node:buffer';
import type { ParsingSummary } from './parsing-contract.mjs';
export function validateParsingBatch(
  input: unknown,
  ids: string[],
  roles?: Map<string, 'frontal' | 'profile'>,
): { captureRef: string; parsing: ParsingSummary; layers: Record<string, Buffer> }[];
