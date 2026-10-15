import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalPersonalizationBaselineReport } from '../src/preview/natal-personalization-baseline.js';
import {
  buildNatalRuleDifferentiationReport,
  inspectNatalRuleSignature,
} from '../src/preview/natal-rule-differentiation.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';

const fixed = new Date('2026-10-15T00:00:00.000Z');
const registry = createGeneralNatalIntegratedReadingRegistry(fixed.toISOString());

function caseData(caseId: string, date: string, consumerCopy: string) {
  const [year, month, day] = date.split('-').map(Number);
  if (year === undefined || month === undefined || day === undefined) throw new TypeError('date');
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour: 12, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: fixed }).snapshot;
  const interpretation = runInterpretation(snapshot, registry, { now: fixed, requestId: caseId });
  const format = (slot: 'year' | 'month' | 'day' | 'hour') => {
    const pillar = snapshot.pillars[slot];
    return pillar.status === 'resolved'
      ? {
          label: slot,
          value: `${pillar.value.stem.value}${pillar.value.branch.value} (${pillar.value.stem.hanja}${pillar.value.branch.hanja})`,
          status: 'resolved' as const,
        }
      : { label: slot, status: 'unavailable' as const };
  };
  const response: ProductReadingResponse = {
    responseId: `response-${caseId}`,
    responseVersion: 'myeonghwa-product-reading-response-v2',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    reading: {
      readingId: `reading-${caseId}`,
      brand: { brandId: 'myeonghwa', displayName: '명화' },
      subject: {
        birthInputDisplay: { calendarType: 'solar', date, time: '12:30', timeKnown: true },
        calculationState: 'resolved',
      },
      calculationSummary: {
        pillars: { year: format('year'), month: format('month'), day: format('day'), hour: format('hour') },
      },
      sections: [{
        sectionType: 'overview', title: '주요 해석',
        blocks: [{ type: 'paragraph', text: consumerCopy }],
        state: 'complete',
      }],
      disclosures: [],
      generatedAt: fixed.toISOString(),
    },
  };
  return {
    baseline: { caseId, birthLabel: date, response },
    research: { caseId, snapshotId: snapshot.snapshotId, interpretation },
  };
}

describe('N3 matched-rule differentiation diagnostic', () => {
  it('finds identical consumer copy across different real charts and tracks rule signatures', () => {
    const first = caseData('first', '1984-01-07', '반복되는 풀이');
    const second = caseData('second', '1992-01-12', '반복되는 풀이');
    const duplicate = caseData('duplicate', '1984-01-07', '반복되는 풀이');
    const sample = [first, second, duplicate];
    const baseline = buildNatalPersonalizationBaselineReport(sample.map((x) => x.baseline));
    const report = buildNatalRuleDifferentiationReport(baseline, sample.map((x) => x.research));
    expect(report).toMatchObject({
      numberOfCases: 3,
      mayPublish: false,
      maySell: false,
      researchEvidenceIsNotProductionAuthority: true,
      casesWithConsumerInterpretation: 3,
    });
    expect(report.ruleSignatures).toHaveLength(3);
    expect(report.ruleSignatures.find((x) => x.caseId === 'first')?.matchedRuleSignature)
      .toBe(report.ruleSignatures.find((x) => x.caseId === 'duplicate')?.matchedRuleSignature);
    expect(report.pairsWithSameCopyDifferentFacts).toHaveLength(2);
    expect(report.pairsWithSameCopyDifferentFacts.every((p) => !p.sameDisplayedFacts && p.sameConsumerText)).toBe(true);
    expect(report.repeatedTextGroups).toHaveLength(1);
    expect(report.repeatedTextGroups[0]?.differentDisplayedFactSets).toBe(2);
    expect(report.warningCounts.sameCopyDifferentRules +
      report.warningCounts.sameCopySameRulesDifferentChart).toBe(2);
    expect(report.limitations.some((x) => x.includes('not a proven cause'))).toBe(true);
  });

  it('distinguishes copy variance when matched rules are identical and fails on missing provenance', () => {
    const first = caseData('first', '2024-03-10', '가 문구');
    const copyChange = caseData('copy-change', '2024-03-10', '나 문구');
    const sample = [first, copyChange];
    const baseline = buildNatalPersonalizationBaselineReport(sample.map((x) => x.baseline));
    const report = buildNatalRuleDifferentiationReport(baseline, sample.map((x) => x.research));
    expect(report.warningCounts.identicalRulesDifferentCopy).toBe(1);
    expect(report.pairsWithSameCopyDifferentFacts).toHaveLength(0);
    const altered = {
      ...first.research,
      snapshotId: 'wrong-snapshot-id',
    };
    expect(() => inspectNatalRuleSignature(altered)).toThrow(/not bound to the same snapshot/u);
    expect(() => buildNatalRuleDifferentiationReport(baseline, [first.research]))
      .toThrow(/one same-policy interpretation per baseline case/u);
    expect(() => buildNatalRuleDifferentiationReport(baseline,
      [first.research, first.research])).toThrow(/Duplicate research caseId/u);
  });
});
