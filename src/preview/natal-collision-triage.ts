import type { NatalPersonalizationBaselineReport } from './natal-personalization-baseline.js';
import type { NatalRuleDifferentiationPair, NatalRuleDifferentiationReport } from './natal-rule-differentiation.js';

export const NATAL_COLLISION_TRIAGE_VERSION = 'saju-natal-n10-rule-collision-triage-v1' as const;
export type NatalCollisionCategory =
  | 'same_rules_different_chart'
  | 'same_family_different_channel'
  | 'changed_family_or_mixture'
  | 'added_or_missing_research_theme'
  | 'other_rule_change';

export interface NatalCollisionTriagePair {
  left: string;
  right: string;
  chartPairKey: string;
  category: NatalCollisionCategory;
  leftOnlyThemeClaimTypes: readonly string[];
  rightOnlyThemeClaimTypes: readonly string[];
}

export interface NatalCollisionTriageReport {
  version: typeof NATAL_COLLISION_TRIAGE_VERSION;
  lifecycle: 'internal_quality_audit';
  mayPublish: false;
  maySell: false;
  mayApproveResearchMeaning: false;
  casePairCount: number;
  uniqueDisplayedChartPairCount: number;
  casePairCategoryCounts: Readonly<Record<NatalCollisionCategory, number>>;
  uniqueChartPairCategoryCounts: Readonly<Record<NatalCollisionCategory, number>>;
  pairs: readonly NatalCollisionTriagePair[];
  limitations: readonly string[];
}

const CATEGORIES: readonly NatalCollisionCategory[] = [
  'same_rules_different_chart', 'same_family_different_channel',
  'changed_family_or_mixture', 'added_or_missing_research_theme', 'other_rule_change',
];
const THEME = /^GENERAL_NATAL_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u;

function researchThemeClaims(types: readonly string[]): readonly string[] {
  return [...new Set(types.filter((type) => THEME.test(type)))].sort();
}

function familySet(types: readonly string[]): ReadonlySet<string> {
  return new Set(types.map((type) => THEME.exec(type)?.[1])
    .filter((value): value is string => value !== undefined));
}

function sameSet(left: ReadonlySet<string>, right: ReadonlySet<string>): boolean {
  return left.size === right.size && [...left].every((family) => right.has(family));
}

function categoryFor(pair: NatalRuleDifferentiationPair, left: readonly string[], right: readonly string[]): NatalCollisionCategory {
  if (pair.disposition === 'SAME_COPY_SAME_RULES_DIFFERENT_CHART') return 'same_rules_different_chart';
  if (pair.disposition !== 'SAME_COPY_DIFFERENT_RULES') return 'other_rule_change';
  if (left.length === 0 && right.length === 0) return 'other_rule_change';
  if (left.length === 0 || right.length === 0) return 'added_or_missing_research_theme';
  return sameSet(familySet(left), familySet(right))
    ? 'same_family_different_channel' : 'changed_family_or_mixture';
}

function counts(pairs: readonly NatalCollisionTriagePair[]): Record<NatalCollisionCategory, number> {
  const result = Object.fromEntries(CATEGORIES.map((category) => [category, 0])) as Record<NatalCollisionCategory, number>;
  for (const pair of pairs) result[pair.category] = (result[pair.category] ?? 0) + 1;
  return result;
}

/** Internal QA only. Preserve test-case pairs but dedupe identical displayed chart pairs. */
export function buildNatalCollisionTriageReport(
  baseline: NatalPersonalizationBaselineReport,
  research: NatalRuleDifferentiationReport,
): NatalCollisionTriageReport {
  if (baseline.numberOfCases !== research.numberOfCases) {
    throw new TypeError('N10 rule/consumer audits must describe the same sample count.');
  }
  const byCase = new Map(baseline.cases.map((item) => [item.caseId, item]));
  if (byCase.size !== baseline.cases.length) throw new TypeError('N10 requires unique case identifiers.');
  const pairs = research.pairsWithSameCopyDifferentFacts.map((pair) => {
    const left = byCase.get(pair.left);
    const right = byCase.get(pair.right);
    if (!left?.factFingerprint || !right?.factFingerprint ||
        left.factFingerprint === right.factFingerprint ||
        left.interpretationFingerprint !== right.interpretationFingerprint) {
      throw new TypeError('N10 pair lacks distinct displayed charts and identical consumer text: ' + pair.left + '/' + pair.right);
    }
    const leftOnlyThemeClaimTypes = researchThemeClaims(pair.onlyLeftClaimTypes);
    const rightOnlyThemeClaimTypes = researchThemeClaims(pair.onlyRightClaimTypes);
    return {
      left: pair.left, right: pair.right,
      chartPairKey: [left.factFingerprint, right.factFingerprint].sort().join(':'),
      category: categoryFor(pair, leftOnlyThemeClaimTypes, rightOnlyThemeClaimTypes),
      leftOnlyThemeClaimTypes, rightOnlyThemeClaimTypes,
    } satisfies NatalCollisionTriagePair;
  });
  const unique = new Map<string, NatalCollisionTriagePair>();
  for (const pair of pairs) {
    const prior = unique.get(pair.chartPairKey);
    if (prior !== undefined && prior.category !== pair.category) {
      throw new TypeError('N10 duplicate chart pair classified inconsistently.');
    }
    unique.set(pair.chartPairKey, prior ?? pair);
  }
  return {
    version: NATAL_COLLISION_TRIAGE_VERSION,
    lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    casePairCount: pairs.length,
    uniqueDisplayedChartPairCount: unique.size,
    casePairCategoryCounts: counts(pairs),
    uniqueChartPairCategoryCounts: counts([...unique.values()]),
    pairs,
    limitations: [
      'Displayed fact fingerprints are not proof of full internal snapshot equivalence.',
      'Research theme and channel differences are not admitted Preview or Production semantic conclusions.',
      'Same copy may be appropriate across different charts; do not invent distinct predictions.',
      'Human review and explicit source/version/authority admission remain separate.',
    ],
  };
}
