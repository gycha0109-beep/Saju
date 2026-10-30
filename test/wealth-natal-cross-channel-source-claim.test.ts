import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';
import {
  WEALTH_NATAL_CROSS_CHANNEL_CLAIM_TYPE,
  WEALTH_NATAL_CROSS_CHANNEL_SOURCE,
  WEALTH_NATAL_CROSS_CHANNEL_RULE,
} from '../src/research/wealth-natal-cross-channel-source-candidate.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { renderNatalFiveDomainMultifactorResearchHtml } from
  '../src/preview/natal-five-domain-multifactor-reader.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../src/research/career-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../src/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../src/preview/career-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';

const NOW = new Date('2026-10-30T00:00:00.000Z');
const actualBirth: BirthInput = {
  calendarType: 'solar', date: { year: 1955, month: 10, day: 31 },
  time: { known: true, hour: 19, minute: 35 },
  sexForTraditionalCalculation: 'male',
};
const registered = createWealthNatalMultifactorRegistry();
function evaluate(birth: BirthInput) {
  const snapshot = calculateCanonicalSajuSnapshot(birth, PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW });
  const execution = runInterpretation(snapshot, registered, { now: NOW });
  const report = buildWealthNatalMultifactorReport(snapshot, execution, registered);
  return { snapshot, execution, report };
}
describe('conditional primary-text Shangguan/Wealth research Claim', () => {
  it('binds two original channel-specific T5 Claims and exact chart paths to classical source', () => {
    const x = evaluate(actualBirth);
    expect(WEALTH_NATAL_CROSS_CHANNEL_SOURCE.locator?.section).toBe('論傷官');
    expect(WEALTH_NATAL_CROSS_CHANNEL_RULE.quality.reviewerStatus).toBe('unreviewed');
    expect(x.report.state).toBe('insufficient');
    expect(x.report.sections).toHaveLength(0);
    const comparison = x.report.crossChannelComparison;
    expect(comparison).toBeDefined();
    expect(comparison?.claimType).toBe(WEALTH_NATAL_CROSS_CHANNEL_CLAIM_TYPE);
    expect(comparison?.ruleId).toBe(WEALTH_NATAL_CROSS_CHANNEL_RULE.ruleId);
    expect(comparison?.sourceIds).toContain(WEALTH_NATAL_CROSS_CHANNEL_SOURCE.sourceId);
    expect(comparison?.observedPositions).toEqual([
      '월주 천간 상관', '시주 천간 상관',
      '연주 지지 대표 십신 편재', '월주 지지 대표 십신 정재',
      '일주 지지 대표 십신 편재', '시주 지지 대표 십신 정재',
    ]);
    expect(comparison?.observedFactPaths.length).toBe(6);
    expect(comparison?.paragraph).toContain('상관상진·일간 강약');
    expect(comparison?.paragraph).not.toContain('정재이');
    expect(comparison?.mayPublish).toBe(false);
    expect(comparison?.maySell).toBe(false);
    expect(comparison?.interpretationAuthorityGranted).toBe(false);
    const claimed = x.execution.claims.filter(c =>
      c.claimType === WEALTH_NATAL_CROSS_CHANNEL_CLAIM_TYPE);
    expect(claimed).toHaveLength(1);
    expect(claimed[0]?.upstreamClaimRefs).toHaveLength(2);
    expect(claimed[0]?.sourceRefs).toContain(WEALTH_NATAL_CROSS_CHANNEL_SOURCE.sourceId);
    expect((claimed[0]?.value as { sourceConditionalSatisfied: boolean })
      .sourceConditionalSatisfied).toBe(false);
    const upstream = claimed[0]!.upstreamClaimRefs.map(id =>
      x.execution.claims.find(c => c.claimId === id));
    expect(upstream.map(c => c?.claimType).sort()).toEqual([
      'TEN_GOD_OUTPUT_VISIBLE_STEMS_THEME', 'TEN_GOD_WEALTH_BRANCHES_THEME',
    ]);
  });

  it('renders a bounded reading in the actual five-domain research UI without completing wealth MUR', () => {
    const x = evaluate(actualBirth);
    const reg = {
      general: createGeneralNatalMultifactorRegistry(),
      career: createCareerMultifactorResearchRegistry(),
      business: createBusinessNatalMultifactorRegistry(),
      relationship: createRelationshipNatalMultifactorRegistry(),
    };
    const html = renderNatalFiveDomainMultifactorResearchHtml(x.snapshot, {
      general: buildGeneralNatalMultifactorReport(x.snapshot,
        runInterpretation(x.snapshot, reg.general, { now: NOW }), reg.general),
      career: buildCareerMultifactorResearchReport(x.snapshot,
        runInterpretation(x.snapshot, reg.career, { now: NOW }), reg.career),
      wealth: x.report,
      business: buildBusinessNatalMultifactorReport(x.snapshot,
        runInterpretation(x.snapshot, reg.business, { now: NOW }), reg.business),
      relationship: buildRelationshipNatalMultifactorReport(x.snapshot,
        runInterpretation(x.snapshot, reg.relationship, { now: NOW }), reg.relationship),
    });
    const card = html.split('<h2 id="domain-wealth">')[1]!.split('</article>')[0]!;
    expect(card).toContain(x.report.crossChannelComparison!.headline);
    expect(card).toContain(x.report.crossChannelComparison!.paragraph);
    expect(card).toContain('이 비교는 재물 종합풀이의 독립 근거 축으로 세지 않습니다');
    expect(card).toContain(WEALTH_NATAL_CROSS_CHANNEL_SOURCE.sourceId);
    expect(card).toContain('풀이 보류');
    expect(x.report.insufficientEvidence?.sourceQualifiedT8ClaimCount).toBe(0);
  });

  it('does not turn an unknown birth hour into a cross-channel Claim', () => {
    const other: BirthInput = { ...actualBirth, time: { known: false } };
    const x = evaluate(other);
    expect(x.report.crossChannelComparison).toBeUndefined();
    expect(x.report.sections).toHaveLength(0);
    expect(x.report.maySell).toBe(false);
  });

  it('does not assume the original Shangguan premise from only Shishen and Wealth', () => {
    let shishenOnly: ReturnType<typeof evaluate> | undefined;
    for (let day = 1; day <= 28; day++) {
      const x = evaluate({
        ...actualBirth,
        date: { year: 2024, month: 4, day },
        time: { known: true, hour: 12, minute: 0 },
      });
      const facts = x.snapshot.derivedFacts.tenGods;
      if (facts.status !== 'resolved') continue;
      const stems = [facts.value.year.stem, facts.value.month.stem, facts.value.hour.stem];
      const branches = [facts.value.year.branch, facts.value.month.branch,
        facts.value.day.branch, facts.value.hour.branch];
      if (stems.some(t => t?.status === 'resolved' && t.value === '식신') &&
          !stems.some(t => t?.status === 'resolved' && t.value === '상관') &&
          branches.some(t => t?.status === 'resolved' &&
            (t.value === '정재' || t.value === '편재'))) {
        shishenOnly = x;
        break;
      }
    }
    expect(shishenOnly).toBeDefined();
    expect(shishenOnly?.report.crossChannelComparison).toBeUndefined();
    expect(shishenOnly?.execution.claims.some(c =>
      c.claimType === WEALTH_NATAL_CROSS_CHANNEL_CLAIM_TYPE)).toBe(false);
  });
});
