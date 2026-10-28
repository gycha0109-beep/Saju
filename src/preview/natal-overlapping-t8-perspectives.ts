/**
 * Presentation-only selection of EXISTING, source-validated natal T8 sections.
 * A different interpretation axis using exclusively previously consumed facts
 * is worth displaying, but is NOT a second independent basis for MUR.
 *
 * Callers first validate source/methodology/Claim provenance of every input.
 * This helper never generates a Claim, modifies the selection, or promotes
 * a partial interpretation into an official or complete one.
 */
export interface ExistingNatalT8Perspective {
  claimType: string;
  axis: string;
  observedFactPaths: readonly string[];
}

export type OverlappingNatalT8Perspective<T extends ExistingNatalT8Perspective> =
  T & { overlapsSelectedFactPaths: readonly string[] };

export function selectOverlappingNatalT8Perspectives<T extends ExistingNatalT8Perspective>(
  selected: readonly T[],
  candidates: readonly T[],
  maximum = 2,
): readonly OverlappingNatalT8Perspective<T>[] {
  if (!Number.isInteger(maximum) || maximum < 0 || maximum > 2) {
    throw new TypeError('Overlapping T8 secondary perspectives require 0-2 bounded items');
  }
  if (selected.length === 0 || selected.length >= 3 || maximum === 0) return [];
  const paths = new Set(selected.flatMap(section => section.observedFactPaths));
  const selectedClaimTypes = new Set(selected.map(section => section.claimType));
  const usedAxes = new Set(selected.map(section => section.axis));
  const perspectives: OverlappingNatalT8Perspective<T>[] = [];

  for (const candidate of candidates) {
    if (perspectives.length >= maximum) break;
    if (selectedClaimTypes.has(candidate.claimType) ||
        usedAxes.has(candidate.axis) ||
        candidate.observedFactPaths.length < 2 ||
        !candidate.observedFactPaths.every(path => paths.has(path))) continue;
    usedAxes.add(candidate.axis);
    perspectives.push({
      ...candidate,
      overlapsSelectedFactPaths: [...candidate.observedFactPaths],
    });
  }
  return perspectives;
}
