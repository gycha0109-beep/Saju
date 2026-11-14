/**
 * Research-only MUR presentation boundary shared by non-Career natal domains.
 * Distinct claim headlines or axes are NOT independent supporting evidence
 * unless a support brings at least one NEW actually calculated Canonical path.
 * This does not add/authorize any T5/T8 meaning, source, or outcome.
 */
export interface ObservedNatalAxis {
  axis: string;
  observedFactPaths: readonly string[];
}

export interface IndependentNatalSupports<T extends ObservedNatalAxis> {
  supporting: readonly T[];
  overlapOnlyCount: number;
}

export function selectIndependentNatalSupportingAxes<T extends ObservedNatalAxis>(
  core: T,
  candidates: readonly T[],
  maximum = 2,
): IndependentNatalSupports<T> {
  if (!Number.isInteger(maximum) || maximum < 0 || core.observedFactPaths.length === 0) {
    throw new TypeError('Independent natal axes require actual calculated core paths and a valid limit');
  }
  const axes = new Set<string>([core.axis]);
  const usedPaths = new Set(core.observedFactPaths);
  const supporting: T[] = [];
  let overlapOnlyCount = 0;
  for (const candidate of candidates) {
    if (supporting.length >= maximum) break;
    if (axes.has(candidate.axis)) continue;
    const newPaths = candidate.observedFactPaths.filter(path => !usedPaths.has(path));
    if (newPaths.length === 0) {
      overlapOnlyCount++;
      continue;
    }
    supporting.push(candidate);
    axes.add(candidate.axis);
    candidate.observedFactPaths.forEach(path => usedPaths.add(path));
  }
  // Greedy choice may consume every fact path needed by two later distinct
  // axes. The normal MUR limit is two: only when greedy leaves an avoidable gap,
  // search for a source-existing pair with genuinely incremental T0 evidence.
  // Preserve earlier successful choices and the original rule/axis priority.
  if (maximum === 2 && supporting.length < 2) {
    const corePaths = new Set(core.observedFactPaths);
    // First exhaust the original forward pair search. A newly possible
    // reverse pair must never displace a source-priority-preserving forward pair.
    for (let i = 0; i < candidates.length; i++) {
      const first = candidates[i]!;
      if (first.axis === core.axis ||
          !first.observedFactPaths.some(path => !corePaths.has(path))) continue;
      const firstPaths = new Set([...corePaths, ...first.observedFactPaths]);
      for (let j = i + 1; j < candidates.length; j++) {
        const second = candidates[j]!;
        if (second.axis === core.axis || second.axis === first.axis ||
            !second.observedFactPaths.some(path => !firstPaths.has(path))) continue;
        return { supporting: [first, second], overlapOnlyCount };
      }
    }
    // Only when NO existing forward pair works, try an evidence-valid reverse
    // order of already emitted T8 axes. Each must add an unused Canonical fact.
    for (let i = 0; i < candidates.length; i++) {
      const broad = candidates[i]!;
      if (broad.axis === core.axis ||
          !broad.observedFactPaths.some(path => !corePaths.has(path))) continue;
      for (let j = i + 1; j < candidates.length; j++) {
        const narrow = candidates[j]!;
        if (narrow.axis === core.axis || narrow.axis === broad.axis ||
            !narrow.observedFactPaths.some(path => !corePaths.has(path))) continue;
        const narrowFirstPaths = new Set([...corePaths, ...narrow.observedFactPaths]);
        if (broad.observedFactPaths.some(path => !narrowFirstPaths.has(path))) {
          return { supporting: [narrow, broad], overlapOnlyCount };
        }
      }
    }
  }
  return { supporting, overlapOnlyCount };
}

/** Choose the most independently evidenced pre-existing Wealth core
 * without reducing the registered meaning-axis priority or inventing claims. */
export function selectBestNatalCoreWithinPriorityAxis<T extends ObservedNatalAxis>(
  orderedCores: readonly T[],
  candidates: readonly T[],
): { core: T; support: IndependentNatalSupports<T> } | undefined {
  const first = orderedCores[0];
  if (!first) return undefined;
  let best = { core: first, support: selectIndependentNatalSupportingAxes(first, candidates) };
  for (const candidate of orderedCores.slice(1)) {
    if (candidate.axis !== first.axis) continue;
    const support = selectIndependentNatalSupportingAxes(candidate, candidates);
    if (support.supporting.length > best.support.supporting.length) {
      best = { core: candidate, support };
    }
  }
  return best;
}
