import { describe, expect, it } from 'vitest';
import type { NatalPersonalizationBaselineReport } from '../src/preview/natal-personalization-baseline.js';
import type { NatalRuleDifferentiationPair, NatalRuleDifferentiationReport } from '../src/preview/natal-rule-differentiation.js';
import { buildNatalCollisionTriageReport } from '../src/preview/natal-collision-triage.js';

const CHARTS = {
  a: 'chart-a', b: 'chart-b', 'b-control': 'chart-b',
  c: 'chart-c', d: 'chart-d', e: 'chart-e', f: 'chart-f', g: 'chart-g', h: 'chart-h',
} as const;

function baseline(): NatalPersonalizationBaselineReport {
  return {
    numberOfCases: Object.keys(CHARTS).length,
    cases: Object.entries(CHARTS).map(([caseId, factFingerprint]) =>
      ({ caseId, factFingerprint, interpretationFingerprint: 'same-copy' })),
  } as unknown as NatalPersonalizationBaselineReport;
}
function pair(
  left: string, right: string,
  disposition: NatalRuleDifferentiationPair['disposition'],
  onlyLeftClaimTypes: readonly string[], onlyRightClaimTypes: readonly string[],
): NatalRuleDifferentiationPair {
  return {
    left, right, disposition, onlyLeftClaimTypes, onlyRightClaimTypes,
    onlyLeftRuleIds: [], onlyRightRuleIds: [],
    sameDisplayedFacts: false, sameConsumerText: true,
    sameMatchedRules: disposition === 'SAME_COPY_SAME_RULES_DIFFERENT_CHART',
    sameClaimSemantics: false,
  };
}
const officerStem = 'GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME';
const officerBranch = 'GENERAL_NATAL_OFFICER_BRANCHES_THEME';
const resource = 'GENERAL_NATAL_RESOURCE_VISIBLE_STEMS_THEME';
const output = 'GENERAL_NATAL_OUTPUT_VISIBLE_STEMS_THEME';
function rules(): NatalRuleDifferentiationReport {
  return {
    numberOfCases: Object.keys(CHARTS).length,
    pairsWithSameCopyDifferentFacts: [
      pair('a','b','SAME_COPY_DIFFERENT_RULES',[officerStem],[officerBranch]),
      pair('a','b-control','SAME_COPY_DIFFERENT_RULES',[officerStem],[officerBranch]),
      pair('c','d','SAME_COPY_DIFFERENT_RULES',[resource],[output]),
      pair('e','f','SAME_COPY_DIFFERENT_RULES',[resource],[]),
      pair('g','h','SAME_COPY_SAME_RULES_DIFFERENT_CHART',[],[]),
    ],
  } as unknown as NatalRuleDifferentiationReport;
}
describe('N10 original case pairs vs independent displayed-chart pairs', () => {
  it('counts channel, family, presence and same-rule patterns without inventing meaning', () => {
    const report = buildNatalCollisionTriageReport(baseline(), rules());
    expect(report).toMatchObject({
      casePairCount: 5, uniqueDisplayedChartPairCount: 4,
      casePairCategoryCounts: {
        same_family_different_channel: 2,
        changed_family_or_mixture: 1,
        added_or_missing_research_theme: 1,
        same_rules_different_chart: 1,
        other_rule_change: 0,
      },
      uniqueChartPairCategoryCounts: {
        same_family_different_channel: 1,
        changed_family_or_mixture: 1,
        added_or_missing_research_theme: 1,
        same_rules_different_chart: 1,
        other_rule_change: 0,
      },
      mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    });
    expect(report.pairs[0]?.chartPairKey).toBe(report.pairs[1]?.chartPairKey);
    expect(report.pairs[0]?.leftOnlyThemeClaimTypes).toEqual([officerStem]);
  });

  it('fails closed for nonidentical consumer fingerprints and unknown cases', () => {
    const bad = baseline();
    const changed = {
      ...bad,
      cases: bad.cases.map((item) => item.caseId === 'a'
        ? { ...item, interpretationFingerprint: 'different' } : item),
    };
    expect(() => buildNatalCollisionTriageReport(changed, rules()))
      .toThrow(/identical consumer text/u);
    const missing = {
      ...rules(),
      pairsWithSameCopyDifferentFacts: [
        pair('absent','b','SAME_COPY_DIFFERENT_RULES',[officerStem],[officerBranch]),
      ],
    };
    expect(() => buildNatalCollisionTriageReport(bad, missing))
      .toThrow(/distinct displayed charts/u);
  });
});
