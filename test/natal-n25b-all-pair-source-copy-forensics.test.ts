import { describe, expect, it } from 'vitest';
import type { NatalCollisionTriageReport } from '../src/preview/natal-collision-triage.js';
import { buildNatalN25BAllPairForensics, type NatalN25BCaseEvidence } from
  '../src/preview/natal-n25b-all-pair-source-copy-forensics.js';

const caseOf = (caseId: string, sig: string, type: string, copy: string): NatalN25BCaseEvidence => ({
  caseId, matchedRuleSignature: sig,
  sourceThemes: [{ claimType: type, canonicalTextFingerprint: copy }],
  consumerAtomCount: 3, exactConsumerAtomCount: 2, ambiguousConsumerAtomCount: 1,
  unprovenConsumerAtomCount: 0,
});
function report(): NatalCollisionTriageReport {
  return {
    version: 'saju-natal-n10-rule-collision-triage-v1',
    lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    casePairCount: 3, uniqueDisplayedChartPairCount: 2,
    casePairCategoryCounts: {
      same_rules_different_chart: 1, same_family_different_channel: 2,
      changed_family_or_mixture: 0, added_or_missing_research_theme: 0, other_rule_change: 0,
    },
    uniqueChartPairCategoryCounts: {
      same_rules_different_chart: 1, same_family_different_channel: 1,
      changed_family_or_mixture: 0, added_or_missing_research_theme: 0, other_rule_change: 0,
    },
    pairs: [
      { left: 'a', right: 'b', chartPairKey: 'first',
        category: 'same_family_different_channel',
        leftOnlyThemeClaimTypes: ['GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME'],
        rightOnlyThemeClaimTypes: ['GENERAL_NATAL_PEER_BRANCHES_THEME'] },
      { left: 'a-copy', right: 'b', chartPairKey: 'first',
        category: 'same_family_different_channel',
        leftOnlyThemeClaimTypes: ['GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME'],
        rightOnlyThemeClaimTypes: ['GENERAL_NATAL_PEER_BRANCHES_THEME'] },
      { left: 'a', right: 'c', chartPairKey: 'second',
        category: 'same_rules_different_chart',
        leftOnlyThemeClaimTypes: [], rightOnlyThemeClaimTypes: [] },
    ],
    limitations: [],
  };
}
const cases = [
  caseOf('a', 'A', 'GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME', 'common-text'),
  caseOf('a-copy', 'A', 'GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME', 'common-text'),
  caseOf('b', 'B', 'GENERAL_NATAL_PEER_BRANCHES_THEME', 'common-text'),
  caseOf('c', 'A', 'GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME', 'common-text'),
];

describe('N25b full unique pair source-copy classification', () => {
  it('separates prior-to-render source copy compression from unchanged applied rules', () => {
    const r = buildNatalN25BAllPairForensics(report(), cases);
    expect(r).toMatchObject({
      rawCasePairCount: 3, uniqueChartPairCount: 2, executedDistinctCaseCount: 4,
      meaningDifferentiationProven: false, mayPublish: false, maySell: false,
    });
    expect(r.findings[0]).toMatchObject({
      stageFinding: 'DISTINCT_RESEARCH_CLAIMS_SHARE_CANONICAL_COPY',
      sharedCanonicalCopyAcrossDistinctClaimTypes: ['common-text'], semanticErrorProven: false,
    });
    expect(r.findings[1]?.stageFinding).toBe('SAME_MATCHED_RULES_DIFFERENT_DISPLAYED_CHART');
    expect(r.categoryCounts.DISTINCT_RESEARCH_CLAIMS_SHARE_CANONICAL_COPY).toBe(1);
  });
  it('never silently assumes a source-copy difference is meaningful', () => {
    const c = cases.map(e => e.caseId === 'b'
      ? { ...e, sourceThemes: [{ claimType: 'GENERAL_NATAL_PEER_BRANCHES_THEME',
        canonicalTextFingerprint: 'different' }] } : e);
    const x = buildNatalN25BAllPairForensics(report(), c);
    expect(x.findings[0]).toMatchObject({
      stageFinding: 'DISTINCT_RESEARCH_CLAIMS_DISTINCT_COPY_SAME_CONSUMER',
      semanticErrorProven: false, researchOrBridgeReviewRequired: true,
    });
  });
  it('fails closed on dropped pair, mismatched evidence, or tampered counts', () => {
    expect(() => buildNatalN25BAllPairForensics(report(), cases.slice(0, 2))).toThrow();
    expect(() => buildNatalN25BAllPairForensics(report(), [
      ...cases, cases[0]!,
    ])).toThrow();
    expect(() => buildNatalN25BAllPairForensics(report(), cases.map((x) =>
      x.caseId === 'b' ? { ...x, consumerAtomCount: 0 } : x))).toThrow();
    expect(() => buildNatalN25BAllPairForensics(report(), cases.map((x) =>
      x.caseId === 'b' ? { ...x, sourceThemes: [] } : x))).toThrow();
  });
});
