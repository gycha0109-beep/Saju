import type { NatalCollisionTriageReport } from './natal-collision-triage.js';

export const NATAL_N25B_ALL_PAIR_FORENSICS_VERSION =
  'saju-natal-n25b-all-unique-chart-collision-source-attribution-v1' as const;

export interface NatalN25BCaseEvidence {
  caseId: string;
  matchedRuleSignature: string;
  sourceThemes: readonly {
    claimType: string;
    canonicalTextFingerprint: string | null;
  }[];
  consumerAtomCount: number;
  exactConsumerAtomCount: number;
  ambiguousConsumerAtomCount: number;
  unprovenConsumerAtomCount: number;
}

export type NatalN25BStageFinding =
  | 'SAME_MATCHED_RULES_DIFFERENT_DISPLAYED_CHART'
  | 'DISTINCT_RESEARCH_CLAIMS_SHARE_CANONICAL_COPY'
  | 'DISTINCT_RESEARCH_CLAIMS_DISTINCT_COPY_SAME_CONSUMER'
  | 'CHANGED_RESEARCH_THEME_PRESENCE_SAME_CONSUMER'
  | 'RULE_CHANGE_WITHOUT_THEMATIC_CLAIM_DIFFERENCE';

export interface NatalN25BPairFinding {
  left: string;
  right: string;
  chartPairKey: string;
  category: string;
  stageFinding: NatalN25BStageFinding;
  matchedRuleSignaturesEqual: boolean;
  exclusiveThemeClaimTypesLeft: readonly string[];
  exclusiveThemeClaimTypesRight: readonly string[];
  sharedCanonicalCopyAcrossDistinctClaimTypes: readonly string[];
  hasUnprovenConsumerAtoms: boolean;
  /** Source copy equivalence does not establish an interpretation should differ. */
  semanticErrorProven: false;
  researchOrBridgeReviewRequired: true;
}

export interface NatalN25BAllPairForensics {
  version: typeof NATAL_N25B_ALL_PAIR_FORENSICS_VERSION;
  lifecycle: 'internal_quality_audit';
  mayPublish: false;
  maySell: false;
  mayApproveResearchMeaning: false;
  meaningDifferentiationProven: false;
  uniqueChartPairCount: number;
  rawCasePairCount: number;
  executedDistinctCaseCount: number;
  totalExecutedConsumerAtoms: number;
  findings: readonly NatalN25BPairFinding[];
  categoryCounts: Readonly<Record<NatalN25BStageFinding, number>>;
  limitations: readonly string[];
}

const FINDINGS: readonly NatalN25BStageFinding[] = [
  'SAME_MATCHED_RULES_DIFFERENT_DISPLAYED_CHART',
  'DISTINCT_RESEARCH_CLAIMS_SHARE_CANONICAL_COPY',
  'DISTINCT_RESEARCH_CLAIMS_DISTINCT_COPY_SAME_CONSUMER',
  'CHANGED_RESEARCH_THEME_PRESENCE_SAME_CONSUMER',
  'RULE_CHANGE_WITHOUT_THEMATIC_CLAIM_DIFFERENCE',
];

/**
 * A real execution / source-copy comparison for every N10 duplicate-meaning
 * displayed-chart pair. Never equate different Claim names with different
 * approved natal meanings; preserve the evidence and hand off the verdict.
 */
export function buildNatalN25BAllPairForensics(
  n10: NatalCollisionTriageReport,
  caseEvidence: readonly NatalN25BCaseEvidence[],
): NatalN25BAllPairForensics {
  if (n10.lifecycle !== 'internal_quality_audit' || n10.mayPublish || n10.maySell ||
      n10.mayApproveResearchMeaning || n10.casePairCount !== n10.pairs.length) {
    throw new TypeError('N25b requires the original bounded N10 collision report.');
  }
  const unique = new Map<string, NatalN25BCaseEvidence>();
  for (const evidence of caseEvidence) {
    if (!evidence.caseId || !evidence.matchedRuleSignature || unique.has(evidence.caseId) ||
        evidence.consumerAtomCount <= 0 ||
        evidence.exactConsumerAtomCount + evidence.ambiguousConsumerAtomCount +
        evidence.unprovenConsumerAtomCount !== evidence.consumerAtomCount ||
        new Set(evidence.sourceThemes.map(t => t.claimType)).size !== evidence.sourceThemes.length) {
      throw new TypeError('N25b requires unique, complete, real-service case evidence.');
    }
    unique.set(evidence.caseId, evidence);
  }
  const seenPairs = new Set<string>();
  const findings: NatalN25BPairFinding[] = [];
  for (const pair of n10.pairs) {
    const left = unique.get(pair.left);
    const right = unique.get(pair.right);
    if (!left || !right || !pair.chartPairKey) {
      throw new TypeError('N25b collision pair lacks one side of the real execution.');
    }
    if (seenPairs.has(pair.chartPairKey)) continue;
    seenPairs.add(pair.chartPairKey);
    const leftOnlyTypes = [...pair.leftOnlyThemeClaimTypes].sort();
    const rightOnlyTypes = [...pair.rightOnlyThemeClaimTypes].sort();
    const leftHashes = left.sourceThemes.filter(t => leftOnlyTypes.includes(t.claimType))
      .map(t => t.canonicalTextFingerprint).filter((x): x is string => x !== null);
    const rightHashes = new Set(right.sourceThemes.filter(t =>
      rightOnlyTypes.includes(t.claimType)).map(t => t.canonicalTextFingerprint)
      .filter((x): x is string => x !== null));
    for (const type of leftOnlyTypes) {
      if (!left.sourceThemes.some(t => t.claimType === type)) {
        throw new TypeError('N25b missing left-exclusive Research theme: ' + type);
      }
    }
    for (const type of rightOnlyTypes) {
      if (!right.sourceThemes.some(t => t.claimType === type)) {
        throw new TypeError('N25b missing right-exclusive Research theme: ' + type);
      }
    }
    const sharedCanonicalCopyAcrossDistinctClaimTypes = [...new Set(leftHashes.filter(h =>
      rightHashes.has(h)))].sort();
    const matchedRuleSignaturesEqual = left.matchedRuleSignature === right.matchedRuleSignature;
    const stageFinding: NatalN25BStageFinding = matchedRuleSignaturesEqual
      ? 'SAME_MATCHED_RULES_DIFFERENT_DISPLAYED_CHART'
      : sharedCanonicalCopyAcrossDistinctClaimTypes.length > 0
        ? 'DISTINCT_RESEARCH_CLAIMS_SHARE_CANONICAL_COPY'
        : leftOnlyTypes.length > 0 && rightOnlyTypes.length > 0
          ? 'DISTINCT_RESEARCH_CLAIMS_DISTINCT_COPY_SAME_CONSUMER'
          : leftOnlyTypes.length > 0 || rightOnlyTypes.length > 0
            ? 'CHANGED_RESEARCH_THEME_PRESENCE_SAME_CONSUMER'
            : 'RULE_CHANGE_WITHOUT_THEMATIC_CLAIM_DIFFERENCE';
    findings.push({
      left: pair.left, right: pair.right, chartPairKey: pair.chartPairKey,
      category: pair.category, stageFinding, matchedRuleSignaturesEqual,
      exclusiveThemeClaimTypesLeft: leftOnlyTypes, exclusiveThemeClaimTypesRight: rightOnlyTypes,
      sharedCanonicalCopyAcrossDistinctClaimTypes,
      hasUnprovenConsumerAtoms: left.unprovenConsumerAtomCount > 0 ||
        right.unprovenConsumerAtomCount > 0,
      semanticErrorProven: false, researchOrBridgeReviewRequired: true,
    });
  }
  if (seenPairs.size !== n10.uniqueDisplayedChartPairCount) {
    throw new TypeError('N25b failed to cover every unique displayed-chart collision pair.');
  }
  return {
    version: NATAL_N25B_ALL_PAIR_FORENSICS_VERSION,
    lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    meaningDifferentiationProven: false,
    uniqueChartPairCount: findings.length,
    rawCasePairCount: n10.pairs.length,
    executedDistinctCaseCount: unique.size,
    totalExecutedConsumerAtoms: caseEvidence.reduce((n, e) => n + e.consumerAtomCount, 0),
    findings,
    categoryCounts: Object.fromEntries(FINDINGS.map(key =>
      [key, findings.filter(p => p.stageFinding === key).length])) as Record<NatalN25BStageFinding, number>,
    limitations: [
      'N10 equal-consumer-meaning is measured by real HTTP interpretation-only paragraphs, not inferred from these Claims.',
      'Different Research Claim types may have the same authorized meaning and cannot be forced to differ.',
      'Source-owned canonical copy sharing is an observed pre-render compression, not proof of wrong personal interpretation.',
      'The consumer atom trace is from the same internally executed service, not the separately created HTTP readingId.',
      'No new rule, Claim, interpretation, Preview admission, Official or Production permission is created.',
    ],
  };
}
