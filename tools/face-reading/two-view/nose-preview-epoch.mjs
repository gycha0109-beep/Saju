// Nonpersistent per-result revision gate for in-flight local image previews.
// A human-review save invalidates ALL previews started with an older review.
// No image contents, source hashes, or reviewer coordinates are persisted.
export const NOSE_PREVIEW_EPOCH_VERSION = 'local-nose-preview-epoch@0.1.0';
const generations = new WeakMap();

function assertResult(result) {
  if (!result || typeof result !== 'object' || Array.isArray(result))
    throw Error('NOSE_PREVIEW_RESULT_INVALID');
}

function advance(result) {
  assertResult(result);
  const current = generations.get(result) ?? 0;
  if (!Number.isSafeInteger(current) || current >= Number.MAX_SAFE_INTEGER)
    throw Error('NOSE_PREVIEW_EPOCH_EXHAUSTED');
  const next = current + 1;
  generations.set(result, next);
  return next;
}

export function startNosePreview(result) {
  return advance(result);
}

export function invalidateNosePreview(result) {
  advance(result);
  result.noseMaskCandidate = null;
  result.noseHumanComparison = undefined;
  result.nostrilBorderPhotometry = undefined;
}

export function isCurrentNosePreview(result, epoch) {
  assertResult(result);
  return Number.isSafeInteger(epoch) && epoch > 0 && generations.get(result) === epoch;
}
