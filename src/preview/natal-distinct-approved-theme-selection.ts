/**
 * Select the already-present, source-bound natal theme evidence for a reader.
 * Several channel-specific Claims may repeat the same approved family prose.
 * Prefer a distinct governed family before displaying the second channel of
 * that family; never manufacture a Claim, ranking, or cross-family conclusion.
 */
const FAMILY = /^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u;

export interface NatalApprovedThemeCandidate {
  claimType: string;
  order: number;
}

export function selectDistinctNatalApprovedThemes<T extends NatalApprovedThemeCandidate>(
  candidates: readonly T[],
): readonly T[] {
  const ordered = [...candidates].sort(
    (left, right) => left.order - right.order ||
      left.claimType.localeCompare(right.claimType),
  );
  const seenClaims = new Set<string>();
  const seenFamilies = new Set<string>();
  const firstFamily: T[] = [];
  const secondaryChannel: T[] = [];
  for (const candidate of ordered) {
    const match = FAMILY.exec(candidate.claimType);
    if (match === null || seenClaims.has(candidate.claimType) ||
        !Number.isSafeInteger(candidate.order) || candidate.order < 0) {
      throw new TypeError('Approved natal reader requires unique source-bound theme candidates.');
    }
    seenClaims.add(candidate.claimType);
    const family = match[1]!;
    if (seenFamilies.has(family)) {
      secondaryChannel.push(candidate);
    } else {
      seenFamilies.add(family);
      firstFamily.push(candidate);
    }
  }
  return [...firstFamily, ...secondaryChannel].slice(0, 5);
}
