/**
 * Select the already-present, source-bound natal theme evidence for a reader.
 * Several channel-specific Claims may repeat the same approved family prose.
 * Prefer a distinct governed family before displaying the second channel of
 * that family; never manufacture a Claim, ranking, or cross-family conclusion.
 */
export const NATAL_APPROVED_THEME_READING_INTRO =
  '같은 명식에서 발행된 기존 전통 주제와 계산된 십신 위치를 연결한 내부 실험 풀이입니다. 각 위치만으로 개인의 성격·재물·직업·관계 결과나 미래 사건을 단정하지 않습니다. 출처가 허용한 주제의 범위를 넘어 새 인과관계를 만들지 않습니다.' as const;

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
