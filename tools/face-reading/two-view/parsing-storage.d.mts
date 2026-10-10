import type { Buffer } from 'node:buffer';
import type { ParsingSummary } from './parsing-contract.mjs';
export function validateParsingBatch(
  input: unknown,
  ids: string[],
): { captureRef: string; parsing: ParsingSummary; layers: Record<string, Buffer> }[];
