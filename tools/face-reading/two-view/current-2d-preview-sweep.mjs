// Existing browser preview orchestration only. It does not run a new model,
// persist photo data, or certify anatomical accuracy/pose. The caller owns
// current source pins and all transient per-photo candidate measurements.
export const CURRENT_2D_PREVIEW_SWEEP_VERSION = 'engineering.current-2d-preview-sweep@0.1.0';

export async function sweepCurrent2dPreviewCandidates({
  count,
  visit,
  settled,
  pause,
  current,
  maxPolls = 80,
}) {
  if (
    !Number.isInteger(count) ||
    count < 1 ||
    count > 1000 ||
    !Number.isInteger(maxPolls) ||
    maxPolls < 1 ||
    maxPolls > 200 ||
    [visit, settled, pause, current].some((fn) => typeof fn !== 'function')
  )
    throw Error('CURRENT_2D_SWEEP_INPUT_INVALID');

  let visited = 0,
    timedOut = 0;
  for (let i = 0; i < count; i++) {
    if (!current()) return Object.freeze({ status: 'cancelled', visited, timedOut });
    visit(i);
    visited++;
    let completed = settled(i);
    for (let n = 0; !completed && n < maxPolls; n++) {
      await pause();
      if (!current()) return Object.freeze({ status: 'cancelled', visited, timedOut });
      completed = settled(i);
    }
    if (!completed) timedOut++;
  }
  return Object.freeze({
    status: timedOut ? 'partial' : 'completed',
    visited,
    timedOut,
    modelInferenceExecuted: false,
    originalImagesPersisted: false,
    independentAccuracyValidated: false,
  });
}
