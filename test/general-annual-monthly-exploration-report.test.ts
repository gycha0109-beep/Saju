import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../src/research/general-monthly-reading-candidate.js';
import {
  buildGeneralAnnualMonthlyExplorationReport,
  renderGeneralAnnualMonthlyExplorationHtml,
} from '../src/preview/general-annual-monthly-exploration-report.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');
function sample(day = 9, known = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar', date: { year: 1996, month: 1, day },
    time: known ? { known: true, hour: 9, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function run(month: number, day = 9, known = true, referenceDateTime = NOW.toISOString()) {
  const natal = sample(day, known);
  const request: ReadingRequest = {
    requestId: 'joined-year-month-' + month + '-' + day + '-' + known,
    intent: { domain: 'general', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly', year: 2026, month, timeZone: 'Asia/Seoul',
      referenceDateTime, resolution: 'relative_current',
    },
  };
  const context = buildTemporalReadingContext(request);
  if (context?.scope !== 'monthly') throw new Error('Expected monthly context');
  const facts = buildMonthlyInterpretationFacts(natal, context);
  const registry = createGeneralMonthlyReadingCandidateRegistry(NOW.toISOString());
  const execution = runInterpretation(natal, registry, {
    requestId: request.requestId, temporalFacts: { ...facts }, now: NOW,
  });
  const report = buildGeneralAnnualMonthlyExplorationReport(
    natal, facts, execution, registry, request,
  );
  return { natal, facts, registry, request, execution, report };
}

describe('one-person annual to monthly source-bound research reading', () => {
  it('joins actual annual themes and both T9 monthly phases in a single Korean reading', () => {
    const { natal, report } = run(9);
    expect(report.snapshotId).toBe(natal.snapshotId);
    expect(report.calculationHash).toBe(natal.calculationHash);
    expect(report.annual.targetYear).toBe(2026);
    expect(report.monthly.targetMonth).toBe(9);
    expect(report.monthly.coverage).toBe('complete');
    expect(report.periodComparison).toContain('절입 전');
    expect(report.periodComparison).toContain('절입 이후');
    expect(report.referenceReading.state).toBe('in_period');
    expect(report.referenceReading.segmentId).toBe('before_jeol');
    const themes = report.monthly.sections.filter(x => x.kind === 'theme');
    expect(themes.map(x => x.segmentId)).toEqual(['before_jeol', 'after_jeol']);
    const html = renderGeneralAnnualMonthlyExplorationHtml(report);
    const displayKst = (instant: string) =>
      new Date(new Date(instant).getTime() + 9 * 60 * 60 * 1000)
        .toISOString().slice(0, 16).replace('T', ' ') + ' KST';
    for (const phase of themes) {
      expect(html).toContain(
        '실제 계산 적용 기간: ' + displayKst(phase.calculatedInterval.startsAt) +
        '부터 ' + displayKst(phase.calculatedInterval.endsAt) + ' 전까지',
      );
    }
    expect(html.match(/실제 계산 적용 기간:/gu)).toHaveLength(2);
    expect(html).toContain('id="year-reading"');
    expect(html).toContain('id="monthly-reading"');
    expect(html).toContain('href="#monthly-reading"');
    expect(html).toContain('id="reference-month-reading"');
    expect(html).toContain('조회 시각에 해당하는 이번 달의 풀이');
    expect(html).toContain(report.referenceReading.theme!.text);
    expect(html).toContain(report.referenceReading.theme!.claimId);
    expect(html).toContain(report.annual.sections[0]!.text);
    expect(html).toContain('올해 문구의 계산 근거와 연구 출처');
    expect(html).toContain('내부 연구 프로필 후보(Official Claim 실행 또는 승인 아님)');
    expect(html).toContain('명하 내부 연구 정책, 독립 고전 근거 아님');
    for (const section of report.annual.sections) {
      expect(html).toContain(section.researchProfileId);
      expect(html).toContain(section.candidateClaimType);
      expect(html).toContain(section.policySourceId);
      expect(html).toContain(section.methodologyId);
      for (const path of section.calculationFactPaths) expect(html).toContain(path);
    }
    for (const item of themes) {
      expect(html).toContain(item.title);
      expect(html).toContain(item.text);
      expect(html).toContain(item.sourceIds[0]!);
    }
    expect(html).toContain('계산 근거와 출처');
    expect(html).toContain('Official Reading, 공개 또는 판매 권한을 부여하지 않습니다');
  });

  it('keeps the same year meaning but changes the source-owned monthly reading by actual month', () => {
    const sep = run(9);
    const repeat = run(9);
    const oct = run(10);
    expect(repeat.report).toEqual(sep.report);
    expect(oct.report.annual.annualStemTenGod).toBe(sep.report.annual.annualStemTenGod);
    expect(oct.report.annual.sections).toEqual(sep.report.annual.sections);
    expect(oct.report.monthly.jeolBoundary.at).not.toBe(sep.report.monthly.jeolBoundary.at);
    expect(oct.report.monthly.sections.filter(x => x.kind === 'theme').map(x => x.title))
      .not.toEqual(sep.report.monthly.sections.filter(x => x.kind === 'theme').map(x => x.title));
  });

  it('selects the exact source-owned Korean reading across the real Jeol instant', () => {
    const jeolAt = run(9).facts.jeolBoundary.at;
    const before = run(9, 9, true, new Date(Date.parse(jeolAt) - 1).toISOString());
    const after = run(9, 9, true, jeolAt);
    expect(before.report.referenceReading).toMatchObject({
      state: 'in_period', segmentId: 'before_jeol',
    });
    expect(after.report.referenceReading).toMatchObject({
      state: 'in_period', segmentId: 'after_jeol',
    });
    const selected = after.report.referenceReading.theme!;
    expect(selected.kind).toBe('theme');
    expect(selected.claimId).toBe(
      after.report.monthly.sections.find(section =>
        section.kind === 'theme' && section.segmentId === 'after_jeol')!.claimId,
    );
    const html = renderGeneralAnnualMonthlyExplorationHtml(after.report);
    expect(html).toContain(selected.text);
    expect(html).toContain('절입 이후 · 조회 시각 구간');
    expect(html).toContain(selected.sourceIds[0]!);
    expect(after.report.mayPublish).toBe(false);
    expect(after.report.maySell).toBe(false);
  });

  it('does not mislabel a different calendar month as the current segment', () => {
    const { report } = run(10);
    expect(report.referenceReading).toEqual({
      state: 'outside_target_month', referenceDateTime: NOW.toISOString(),
    });
    const html = renderGeneralAnnualMonthlyExplorationHtml(report);
    expect(html).toContain('월 밖에 있어 현재 적용 구간을 정하지 않았습니다.');
    expect(html).toContain('10월 절입 전·후');
    expect(html).not.toContain(' · 조회 시각 구간');
  });

  it('keeps genuine monthly phases but suppresses unsupported birth-hour relations', () => {
    const { report } = run(9, 9, false);
    expect(report.annual.unavailablePillars).toContain('hour');
    expect(report.annual.sections.some(section =>
      section.calculationFactPaths.includes('temporal.annualBranchRelations.hour')))
      .toBe(false);
    expect(report.monthly.sections.some(x => x.relatedPillar === 'hour')).toBe(false);
    expect(report.monthly.missing.join(' ')).toContain('시주');
    expect(report.researchOnly).toBe(true);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.status).toBe('not_official_reading');
    expect(report.annual.calendarPolicy).toBe('civil_year_only');
  });

  it('rejects cross-person data or a stale different month', () => {
    const valid = run(9);
    expect(() => buildGeneralAnnualMonthlyExplorationReport(
      sample(10), valid.facts, valid.execution, valid.registry, valid.request,
    )).toThrow();
    const differentMonth: ReadingRequest = {
      ...valid.request,
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 10, timeZone: 'Asia/Seoul',
        referenceDateTime: NOW.toISOString(), resolution: 'relative_current',
      },
    };
    expect(() => buildGeneralAnnualMonthlyExplorationReport(
      valid.natal, valid.facts, valid.execution, valid.registry, differentMonth,
    )).toThrow();
  });
});
