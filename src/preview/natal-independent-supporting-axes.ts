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
  }
  return { supporting, overlapOnlyCount };
}
