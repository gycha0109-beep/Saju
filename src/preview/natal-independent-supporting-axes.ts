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
  const greedyAxes = new Set<string>([core.axis]);
  const greedyPaths = new Set(core.observedFactPaths);
  const greedy: T[] = [];
  for (const candidate of candidates) {
    if (greedy.length >= maximum) break;
    if (greedyAxes.has(candidate.axis)) continue;
    const distinct = candidate.observedFactPaths.some(path => !greedyPaths.has(path));
    if (!distinct) continue;
    greedy.push(candidate);
    greedyAxes.add(candidate.axis);
    candidate.observedFactPaths.forEach(path => greedyPaths.add(path));
  }

  // Preserve existing selection exactly when it already reaches the requested
  // independent coverage. Otherwise search the bounded candidate combinations:
  // a broad early axis may consume facts needed by two independent later axes.
  let best = greedy;
  if (best.length < maximum) {
    const visit = (from: number, chosen: T[], axes: Set<string>, paths: Set<string>): void => {
      if (chosen.length > best.length) best = [...chosen];
      if (best.length === maximum) return;
      for (let i = from; i < candidates.length; i++) {
        if (chosen.length + candidates.length - i <= best.length) break;
        const candidate = candidates[i]!;
        if (axes.has(candidate.axis) ||
            !candidate.observedFactPaths.some(path => !paths.has(path))) continue;
        const nextAxes = new Set(axes);
        const nextPaths = new Set(paths);
        nextAxes.add(candidate.axis);
        candidate.observedFactPaths.forEach(path => nextPaths.add(path));
        visit(i + 1, [...chosen, candidate], nextAxes, nextPaths);
        if (best.length === maximum) return;
      }
    };
    visit(0, [], new Set([core.axis]), new Set(core.observedFactPaths));
  }

  const usedPaths = new Set(core.observedFactPaths);
  const axes = new Set([core.axis]);
  const chosen = new Set(best);
  let included = 0;
  let overlapOnlyCount = 0;
  for (const candidate of candidates) {
    if (included >= maximum) break;
    if (chosen.has(candidate)) {
      included++;
      axes.add(candidate.axis);
      candidate.observedFactPaths.forEach(path => usedPaths.add(path));
    } else if (!axes.has(candidate.axis) &&
               candidate.observedFactPaths.every(path => usedPaths.has(path))) {
      overlapOnlyCount++;
    }
  }
  return { supporting: best, overlapOnlyCount };
}

/**
 * Reuse the strongest available set of independently observed, ALREADY ISSUED
 * T8 source interpretations. The normal source-defined core remains preferred
 * whenever it can be supported by two independent axes. Only when its
 * large fact footprint hides an otherwise valid three-axis explanation may a
 * pre-existing narrower core take its place. No new T8 claim or fact is minted.
 */
export function selectSourceBoundNatalCore<T extends ObservedNatalAxis>(
  candidates: readonly T[],
  corePriority: readonly string[],
): {
  core: T | undefined;
  supports: IndependentNatalSupports<T> | undefined;
  displacedCore: T | undefined;
} {
  const eligible = corePriority.flatMap(axis =>
    candidates.filter(candidate => candidate.axis === axis));
  const preferred = eligible[0];
  if (preferred === undefined) {
    return { core: undefined, supports: undefined, displacedCore: undefined };
  }
  const current = selectIndependentNatalSupportingAxes(preferred, candidates);
  if (current.supporting.length >= 2) {
    return { core: preferred, supports: current, displacedCore: undefined };
  }
  for (const candidate of eligible.slice(1)) {
    const alternative = selectIndependentNatalSupportingAxes(candidate, candidates);
    if (alternative.supporting.length >= 2) {
      return {
        core: candidate,
        supports: alternative,
        displacedCore: alternative.supporting.includes(preferred) ? undefined : preferred,
      };
    }
  }
  return { core: preferred, supports: current, displacedCore: undefined };
}
