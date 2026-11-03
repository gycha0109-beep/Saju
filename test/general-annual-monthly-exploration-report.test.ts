import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../src/research/general-monthly-reading-candidate.js';
import { renderGeneralMonthlyExplorationHtml } from '../src/preview/general-monthly-exploration-report.js';
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
  it('keeps actual same-chart natal T8 and bounded T5 separate from the temporal meaning', () => {
    const readings = Array.from({ length: 14 }, (_, index) => run(9, index + 1));
    const withT8 = readings.find(item => item.report.natalContext.sections.length > 0);
    expect(withT8).toBeDefined();
    if (!withT8) return;
    const { natal, report } = withT8;
    expect(report.natalContext).toMatchObject({
      snapshotId: natal.snapshotId,
      calculationHash: natal.calculationHash,
      researchOnly: true,
      mayPublish: false,
      maySell: false,
      usefulComplete: false,
    });
    const html = renderGeneralAnnualMonthlyExplorationHtml(report);
    expect(html).toContain('id="natal-reading"');
    expect(html).toContain('원국의 확인된 구조');
    expect(html).toContain('올해·이번 달에 새로 작용한다는 뜻이 아니며');
    for (const section of report.natalContext.sections) {
      if (section.axis === 'tension') {
        expect(html).toContain('총운 중심 결론이 아닌 기존 원국 T8 긴장 부분풀이');
      }
      expect(section.sourceIds.length).toBeGreaterThan(0);
      expect(section.observedPositions.length).toBeGreaterThanOrEqual(2);
      const escaped = (value: string) => value.replace(/[&<>"']/gu, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      })[char]!);
      for (const detail of [section.headline, section.paragraph, section.ruleId,
        section.sourceIds[0]!, section.observedFactPaths[0]!]) {
        expect(html).toContain(escaped(detail));
      }
    }
    const forged = {
      ...report,
      natalContext: { ...report.natalContext, calculationHash: 'foreign-chart' },
    };
    expect(() => renderGeneralAnnualMonthlyExplorationHtml(forged))
      .toThrow('same-chart natal research context');

    const unknown = run(9, 9, false);
    expect(unknown.report.natalContext.sections).toHaveLength(0);
    expect(unknown.report.natalContext.availableThemeContext).toBeUndefined();
    expect(renderGeneralAnnualMonthlyExplorationHtml(unknown.report))
      .toContain('확정된 원국 종합해석 또는 기존 십신 부분풀이 근거가 아직 충분하지 않습니다.');
    expect(unknown.report.mayPublish).toBe(false);
  }, 60000);

  it('distinguishes uncalculated natal relations from genuinely absent selected clashes', () => {
    const unknown = run(9, 9, false);
    const known = run(9, 9, true);
    expect(unknown.report.annual.unavailablePillars).toContain('hour');
    expect(known.report.annual.unavailablePillars).not.toContain('hour');
    expect(unknown.report.referenceReading.state).toBe('in_period');
    expect(unknown.report.referenceReading.unavailableNatalPillars).toContain('hour');
    expect(known.report.referenceReading.unavailableNatalPillars).not.toContain('hour');
    expect(unknown.report.monthly.referenceReading.unavailableNatalPillars)
      .toEqual(unknown.report.referenceReading.unavailableNatalPillars);
    const joined = renderGeneralAnnualMonthlyExplorationHtml(unknown.report);
    const single = renderGeneralMonthlyExplorationHtml(unknown.report.monthly);
    expect(joined).toContain('aria-label="올해 미확정 원국 충 관계"');
    expect(joined).toContain('aria-label="조회 절입 구간의 미확정 원국 관계"');
    expect(joined).toContain('미확정 기둥의 관계나 다른 관계의 부재를 뜻하지 않습니다');
    expect(joined).toContain('아직 계산 근거가 부족합니다');
    expect(single).toContain('aria-label="현재 절입 구간의 미확정 원국 관계"');
    expect(single).toContain('확인된 충 관계가 없다는 결론이 아닙니다');
    expect(joined).not.toContain('시주 지지와의 충이 확정되었습니다');
    expect(unknown.report.mayPublish).toBe(false);
    expect(unknown.report.maySell).toBe(false);
  });

  it('keeps unconsumed natal T5 separate from the annual and monthly meanings when a General core is partial', () => {
    let verified = false;
    for (let day = 1; day <= 28; day++) {
      const { report } = run(9, day);
      const natal = report.natalContext;
      if (natal.state !== 'partial' || natal.sections.length === 0 ||
          natal.sections[0]!.axis === 'tension' || natal.availableThemeContext === undefined) continue;
      const context = natal.availableThemeContext;
      const html = renderGeneralAnnualMonthlyExplorationHtml(report);
      const natalCard = html.split('id="natal-reading"')[1]!.split('id="year-reading"')[0]!;
      expect(natalCard).toContain('원국 중심 부분풀이와 별개의 미사용 십신 해석');
      expect(natalCard).toContain('총운 중심 부분풀이와 구별되는 기존 십신 관점');
      expect(natalCard).toContain('올해·이번 달에 새로 작용한다는 뜻이 아니며');
      for (const theme of context.themes) {
        expect(natalCard).toContain(theme.summary);
        expect(natalCard).toContain(theme.claimId);
        expect(natalCard).toContain(theme.ruleIds[0]!);
        expect(natalCard).toContain(theme.sourceIds[0]!);
        expect(natalCard).toContain(theme.observedFactPaths[0]!);
      }
      expect(report.periodComparison).not.toContain(context.paragraph);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
      const duplicate = {
        ...report,
        natalContext: {
          ...natal,
          availableThemeContext: {
            ...context,
            themes: [{
              ...context.themes[0]!,
              claimId: natal.sections[0]!.upstreamClaimIds[0]!,
            }],
          },
        },
      };
      expect(() => renderGeneralAnnualMonthlyExplorationHtml(duplicate))
        .toThrow('Natal partial T5 context lacks validated source and chart positions');
      verified = true;
      break;
    }
    expect(verified).toBe(true);
  }, 60000);

  it('joins actual annual themes and both T9 monthly phases in a single Korean reading', () => {
    const { natal, report } = run(9);
    expect(report.snapshotId).toBe(natal.snapshotId);
    expect(report.calculationHash).toBe(natal.calculationHash);
    expect(report.annual.targetYear).toBe(2026);
    expect(report.monthly.targetMonth).toBe(9);
    expect(report.monthly.coverage).toBe('complete');
    expect(report.periodComparison).toContain('절입 전');
    expect(report.periodComparison).toContain('절입 이후');
    expect(report.periodComparison).toContain(report.annual.sections[0]!.title);
    expect(report.periodComparison).toContain(report.annual.sections[0]!.text);
    for (const section of report.annual.sections.filter(section => section.kind === 'tension')) {
      expect(report.periodComparison).toContain(section.title);
      expect(report.periodComparison).toContain(section.text);
    }
    for (const section of report.monthly.sections) {
      expect(report.periodComparison).toContain(section.title);
      expect(report.periodComparison).toContain(section.text);
    }
    expect(report.periodComparison).toContain('하나의 새 운세 결론으로 합성하거나');
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
    expect(report.annualCurrentReading.state).toBe('in_target_civil_year');
    expect(html).toContain('id="reference-year-reading"');
    expect(html).toContain('올해의 중심 주제와 실제 원국 관계');
    const currentAnnual = html.split('id="reference-year-reading"')[1]!
      .split('class="full-year-profile-evidence"')[0]!;
    const evidence = report.annualExecutedEvidence[0]!;
    for (const token of [evidence.claimId, evidence.semanticKey, evidence.ruleIds[0]!,
      evidence.methodologyId, evidence.factPaths[0]!, evidence.sourceIds[0]!]) {
      expect(currentAnnual).toContain(token);
    }
    expect(html.indexOf('id="reference-year-reading"'))
      .toBeLessThan(html.indexOf('full-year-profile-evidence'));
    expect(html).toContain('올해 문구의 계산 근거와 연구 출처');
    expect(html).toContain('기존 연구 프로필의 한국어 문구 + 별도 실행된 연구 T9 Claim (Official 승인 아님)');
    expect(html).toContain('명하 내부 연구 정책, 독립 고전 근거 아님');
    expect(report.annualExecutedEvidence).toHaveLength(report.annual.sections.length);
    for (const [index, section] of report.annual.sections.entries()) {
      const executed = report.annualExecutedEvidence[index]!;
      expect(executed.semanticKey).toBe(section.id);
      expect(executed.claimType).toBe(section.candidateClaimType);
      expect(executed.ruleIds.length).toBeGreaterThan(0);
      expect(executed.sourceIds).toContain(section.policySourceId);
      expect(executed.methodologyId).toBe(section.methodologyId);
      expect(executed.factPaths).toEqual(expect.arrayContaining([...section.calculationFactPaths]));
      expect(html).toContain(executed.claimId);
      expect(html).toContain(executed.ruleIds[0]!);
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

  it('blocks invented annual evidence and preserves existing T9 research-only scope', () => {
    const { report } = run(9);
    const first = report.annualExecutedEvidence[0]!;
    const forged = {
      ...report,
      annualExecutedEvidence: [{
        ...first,
        claimId: 'forged-claim',
        sourceIds: ['UNREGISTERED-SOURCE'],
      }, ...report.annualExecutedEvidence.slice(1)],
    };
    expect(() => renderGeneralAnnualMonthlyExplorationHtml(forged))
      .toThrow('matched executed annual T9 research evidence');
    expect(report.annual.permissions.mayPublish).toBe(false);
    expect(report.annual.permissions.maySell).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('shows the same selected natal tension only in the current Jeol segment of the joined reading', () => {
    let found = false;
    for (let month = 1; month <= 12; month++) {
      const baseline = run(month);
      const tension = baseline.report.monthly.sections.find(item => item.kind === 'tension');
      if (!tension) continue;
      found = true;
      const interval = baseline.facts.segmentsById[tension.segmentId];
      const reference = new Date(Date.parse(interval.startsAt) + 1).toISOString();
      const joined = run(month, 9, true, reference);
      const selected = joined.report.referenceReading;
      expect(selected.state).toBe('in_period');
      expect(selected.segmentId).toBe(tension.segmentId);
      expect(selected.sourceBoundTensions?.map(x => x.claimId)).toContain(tension.claimId);
      expect(selected.sourceBoundTensions?.every(x =>
        x.segmentId === tension.segmentId && x.sourceIds.length > 0 &&
        x.calculatedInterval.startsAt === interval.startsAt)).toBe(true);
      const html = renderGeneralAnnualMonthlyExplorationHtml(joined.report);
      expect(html).toContain('aria-label="같은 절입 구간의 원국 관계"');
      expect(html).toContain(tension.claimId);
      expect(html).toContain(tension.text);
      expect(joined.report.mayPublish).toBe(false);
      expect(joined.report.maySell).toBe(false);
      break;
    }
    expect(found).toBe(true);
  }, 30000);

  it('shows only existing natal-year clash research next to the current annual theme', () => {
    let found = false;
    for (let day = 1; day <= 14; day++) {
      const { report } = run(9, day);
      const tensions = report.annual.sections.filter(section => section.kind === 'tension');
      if (!tensions.length) continue;
      found = true;
      const current = report.annualCurrentReading;
      expect(current.state).toBe('in_target_civil_year');
      if (current.state !== 'in_target_civil_year') throw new Error('Missing current year');
      expect(current.theme).toEqual(report.annual.sections[0]);
      expect(current.sourceBoundTensions).toEqual(tensions);
      const html = renderGeneralAnnualMonthlyExplorationHtml(report);
      const focus = html.split('id="reference-year-reading"')[1]!
        .split('class="full-year-profile-evidence"')[0]!;
      expect(focus).toContain(current.theme.text);
      for (const tension of tensions) {
        const evidence = report.annualExecutedEvidence[report.annual.sections.indexOf(tension)]!;
        for (const token of [evidence.claimId, evidence.semanticKey, evidence.ruleIds[0]!,
          evidence.methodologyId, evidence.factPaths[0]!, evidence.sourceIds[0]!]) {
          expect(focus).toContain(token);
        }
        expect(tension.observedClash?.relation).toBe('clash');
        expect(focus).toContain(tension.title);
        expect(focus).toContain(tension.text);
        expect(tension.calculationFactPaths).toContain(
          'temporal.annualBranchRelations.' + tension.relatedPillar);
      }
      expect(report.researchOnly).toBe(true);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
      break;
    }
    expect(found).toBe(true);
  }, 30000);

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
    // A different selected monthly T9 research meaning must change the
    // on-screen comparison while an unchanged annual T9 remains identical.
    expect(oct.report.periodComparison).not.toBe(sep.report.periodComparison);
    expect(sep.report.periodComparison).toContain(sep.report.annual.sections[0]!.text);
    expect(oct.report.periodComparison).toContain(oct.report.annual.sections[0]!.text);
    for (const phase of oct.report.monthly.sections.filter(x => x.kind === 'theme')) {
      expect(oct.report.periodComparison).toContain(phase.text);
    }
    expect(repeat.report.periodComparison).toBe(sep.report.periodComparison);
  });

  it('compares actual selected T9 month themes and natal clash meanings across Jeol without inventing a forecast', () => {
    for (const month of [3, 9, 10]) {
      const { report } = run(month);
      const contrast = report.monthlyPhaseContrast;
      expect(contrast.state).toBe('source_bound_comparison');
      if (contrast.state !== 'source_bound_comparison') continue;
      const before = report.monthly.sections.find(section =>
        section.kind === 'theme' && section.segmentId === 'before_jeol')!;
      const after = report.monthly.sections.find(section =>
        section.kind === 'theme' && section.segmentId === 'after_jeol')!;
      expect(contrast.beforeTheme).toBe(before);
      expect(contrast.afterTheme).toBe(after);
      expect(contrast.sameTenGod).toBe(before.tenGod === after.tenGod);
      expect(contrast.beforeTensions).toEqual(report.monthly.sections.filter(section =>
        section.kind === 'tension' && section.segmentId === 'before_jeol'));
      expect(contrast.afterTensions).toEqual(report.monthly.sections.filter(section =>
        section.kind === 'tension' && section.segmentId === 'after_jeol'));
      const html = renderGeneralAnnualMonthlyExplorationHtml(report);
      const comparison = html.split('id="monthly-phase-contrast"')[1]!
        .split('id="phase-before_jeol"')[0]!;
      expect(comparison).toContain('실제 선택된 해석 주제의 차이');
      expect(comparison).toContain('운세의 상승·하락 또는 사건을 뜻하지 않습니다');
      for (const section of [before, after, ...contrast.beforeTensions, ...contrast.afterTensions]) {
        expect(comparison).toContain(section.claimId);
        expect(comparison).toContain(section.ruleIds[0]!);
        expect(comparison).toContain(section.sourceIds[0]!);
        expect(comparison).toContain(section.title);
        expect(comparison).toContain(section.text);
      }
      for (const section of [...contrast.beforeTensions, ...contrast.afterTensions]) {
        expect(comparison).toContain(section.factPaths[0]!);
      }
      expect(report.researchOnly).toBe(true);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
      const forged = {
        ...report,
        monthlyPhaseContrast: {
          ...contrast, afterTheme: before,
        },
      };
      expect(() => renderGeneralAnnualMonthlyExplorationHtml(forged))
        .toThrow('exactly selected T9 phase contrast evidence');
      const forgedState = {
        ...report,
        monthlyPhaseContrast: { state: 'insufficient_evidence' as const },
      };
      expect(() => renderGeneralAnnualMonthlyExplorationHtml(forgedState))
        .toThrow('cannot fabricate a missing T9 phase contrast');
    }
  }, 60000);

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
    expect(html).toContain('선택한 월의 조회 시각 적용 여부');
    expect(html).toContain('2026년 10월 — 선택한 월의 흐름');
    expect(html).not.toContain('<h2>조회 시각에 해당하는 이번 달의 풀이</h2>');
    expect(html).not.toContain('2026년 10월 — 이번 달의 흐름</h2>');
    expect(html).not.toContain(' · 조회 시각 구간');
  });

  it('distinguishes a selected annual civil year from the reference instant across Seoul midnight', () => {
    // 15:00 UTC is exactly midnight the following day in Asia/Seoul.
    const inYear = run(9, 9, true, '2025-12-31T15:00:00.000Z');
    const beforeYear = run(9, 9, true, '2025-12-31T14:59:59.999Z');
    const nextYear = run(9, 9, true, '2026-12-31T15:00:00.000Z');
    expect(inYear.report.annualCurrentReading.state).toBe('before_ipchun');
    expect(beforeYear.report.annualCurrentReading).toEqual({
      state: 'outside_target_civil_year',
      referenceDateTime: '2025-12-31T14:59:59.999Z',
    });
    expect(nextYear.report.annualCurrentReading.state).toBe('outside_target_civil_year');
    expect(inYear.report.annualReference).toEqual({
      referenceDateTime: '2025-12-31T15:00:00.000Z',
      civilYearAtReference: 2026,
      state: 'in_target_civil_year',
    });
    expect(beforeYear.report.annualReference).toEqual({
      referenceDateTime: '2025-12-31T14:59:59.999Z',
      civilYearAtReference: 2025,
      state: 'outside_target_civil_year',
    });
    expect(nextYear.report.annualReference).toEqual({
      referenceDateTime: '2026-12-31T15:00:00.000Z',
      civilYearAtReference: 2027,
      state: 'outside_target_civil_year',
    });
    // Year-specific original Korean profile is not rewritten by the clock.
    expect(inYear.report.annual.sections).toEqual(beforeYear.report.annual.sections);
    expect(inYear.report.annual.sections).toEqual(nextYear.report.annual.sections);
    for (const report of [inYear.report, beforeYear.report, nextYear.report]) {
      expect(report.monthly.referenceReading.state).toBe('outside_target_month');
      expect(report.researchOnly).toBe(true);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
    }
    const insideHtml = renderGeneralAnnualMonthlyExplorationHtml(inYear.report);
    expect(insideHtml).toContain('href="#year-reading">올해의 흐름</a>');
    expect(insideHtml).toContain('올해 문구의 계산 근거와 연구 출처');
    expect(insideHtml).toContain('id="reference-year-context"');
    expect(insideHtml).toContain('서울 달력 2026년에 속합니다');
    expect(insideHtml).toContain('입춘 전이므로 효력 연주는 을사');
    expect(insideHtml).toContain('id="reference-year-before-ipchun"');
    expect(insideHtml).not.toContain('id="reference-year-reading"');
    expect(insideHtml).not.toContain('현재 연도에 적용되는 풀이가 아니라');
    const outsideHtml = renderGeneralAnnualMonthlyExplorationHtml(nextYear.report);
    expect(outsideHtml).toContain('href="#year-reading">선택한 연도의 흐름</a>');
    expect(outsideHtml).toContain('선택한 연도 문구의 계산 근거와 연구 출처');
    expect(outsideHtml).toContain('<small>선택한 연도의 중심 관점</small>');
    expect(outsideHtml).toContain('선택한 월의 조회 시각 적용 여부');
    expect(outsideHtml).not.toContain('href="#year-reading">올해의 흐름</a>');
    expect(outsideHtml).not.toContain('<small>올해의 중심 관점</small>');
    expect(outsideHtml).toContain('서울 달력 2027년입니다');
    expect(outsideHtml).toContain('2026년 연운은 현재 연도에 적용되는 풀이가 아니라');
    expect(outsideHtml).toContain(nextYear.report.annual.sections[0]!.text);
    expect(outsideHtml).not.toContain('id="reference-year-reading"');
    expect(outsideHtml).toContain('월 밖에 있어 현재 적용 구간을 정하지 않았습니다.');
  });

  it('uses the exact Ipchun instant before treating a civil-year T9 as current', () => {
    const initial = run(2, 9, true, '2026-02-03T00:00:00.000Z');
    const ipchunMs = Date.parse(initial.report.annualEffectiveContext.ipchunAt);
    const before = run(2, 9, true, new Date(ipchunMs - 1).toISOString());
    const after = run(2, 9, true, new Date(ipchunMs).toISOString());
    expect(before.report.annualReference.state).toBe('in_target_civil_year');
    expect(after.report.annualReference.state).toBe('in_target_civil_year');
    expect(before.report.annualEffectiveContext.state).toBe('before_ipchun');
    expect(before.report.annualEffectiveContext.effectivePillarAtReference).toBe('을사');
    expect(before.report.annualCurrentReading.state).toBe('before_ipchun');
    expect(after.report.annualEffectiveContext.state).toBe('from_ipchun');
    expect(after.report.annualEffectiveContext.effectivePillarAtReference).toBe('병오');
    expect(after.report.annualCurrentReading.state).toBe('in_target_civil_year');
    expect(before.report.annual.sections).toEqual(after.report.annual.sections);
    expect(before.report.annualExecutedEvidence.map(item => item.semanticKey))
      .toEqual(after.report.annualExecutedEvidence.map(item => item.semanticKey));
    const beforeHtml = renderGeneralAnnualMonthlyExplorationHtml(before.report);
    const afterHtml = renderGeneralAnnualMonthlyExplorationHtml(after.report);
    expect(beforeHtml).toContain('입춘 전 — 선택 연도의 연운 적용 보류');
    expect(beforeHtml).toContain('현재 효력 연주는 을사');
    expect(beforeHtml).not.toContain('id="reference-year-reading"');
    expect(afterHtml).toContain('id="reference-year-reading"');
    expect(afterHtml).toContain('입춘 이후 효력 연주는 병오');
    expect(before.report.researchOnly).toBe(true);
    expect(before.report.maySell).toBe(false);
    expect(after.report.maySell).toBe(false);
    expect(() => renderGeneralAnnualMonthlyExplorationHtml({
      ...after.report,
      annualEffectiveContext: { ...after.report.annualEffectiveContext,
        state: 'before_ipchun' },
    })).toThrow('Ipchun-effective year calculation');
    expect(() => renderGeneralAnnualMonthlyExplorationHtml({
      ...after.report,
      annualEffectiveContext: { ...after.report.annualEffectiveContext,
        effectivePillarAtReference: '을사' },
    })).toThrow('Ipchun-effective year calculation');
  });

  it('shows the actual effective annual pillar separately for both monthly Jeol intervals', () => {
    const january = run(1);
    const february = run(2, 9, true, '2026-02-03T00:00:00.000Z');
    const march = run(3);
    expect(january.report.monthlyEffectiveYearPhases.before_jeol).toMatchObject({
      state: 'before_ipchun', effectiveYear: 2025, pillarLabel: '을사',
    });
    expect(january.report.monthlyEffectiveYearPhases.after_jeol).toMatchObject({
      state: 'before_ipchun', effectiveYear: 2025, pillarLabel: '을사',
    });
    expect(february.report.monthlyEffectiveYearPhases.before_jeol).toMatchObject({
      state: 'before_ipchun', effectiveYear: 2025, pillarLabel: '을사',
    });
    expect(february.report.monthlyEffectiveYearPhases.after_jeol).toMatchObject({
      state: 'from_ipchun', effectiveYear: 2026, pillarLabel: '병오',
    });
    expect(march.report.monthlyEffectiveYearPhases.before_jeol).toMatchObject({
      state: 'from_ipchun', effectiveYear: 2026, pillarLabel: '병오',
    });
    expect(march.report.monthlyEffectiveYearPhases.after_jeol).toMatchObject({
      state: 'from_ipchun', effectiveYear: 2026, pillarLabel: '병오',
    });
    const [before, after] = ['before_jeol', 'after_jeol'] as const;
    expect(february.report.monthlyEffectiveYearPhases[before].endsAt)
      .toBe(february.report.annualEffectiveContext.ipchunAt);
    expect(february.report.monthlyEffectiveYearPhases[after].startsAt)
      .toBe(february.report.annualEffectiveContext.ipchunAt);
    for (const { report } of [january, february, march]) {
      const html = renderGeneralAnnualMonthlyExplorationHtml(report);
      expect(html).toContain('절입 구간의 입춘 효력 연주');
      expect(html).toContain('계산 사실이며 새 운세 해석 아님');
      expect(report.periodComparison).toContain('서로 다른 시기 계산:');
      for (const id of [before, after]) {
        const phase = report.monthlyEffectiveYearPhases[id];
        expect(html).toContain(phase.effectiveYear + '년 ' + phase.pillarLabel);
      }
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
    }
    expect(january.report.periodComparison).toContain('절입 이후 구간에도 아래 2026년 연구 연운 문구를');
    expect(february.report.periodComparison).not.toContain('절입 이후 구간에도 아래 2026년 연구 연운 문구를');
    expect(march.report.periodComparison).not.toContain('현재 효력의 연운으로 적용하지 않습니다');
    const forged = {
      ...february.report,
      monthlyEffectiveYearPhases: {
        ...february.report.monthlyEffectiveYearPhases,
        before_jeol: {
          ...february.report.monthlyEffectiveYearPhases.before_jeol,
          effectiveYear: 2026,
        },
      },
    };
    expect(() => renderGeneralAnnualMonthlyExplorationHtml(forged))
      .toThrow('exact Ipchun year in each monthly phase');
  });

  it('rejects a manipulated annual civil reference instead of mislabeling current year', () => {
    const { report } = run(9);
    expect(() => renderGeneralAnnualMonthlyExplorationHtml({
      ...report,
      annualReference: {
        ...report.annualReference,
        civilYearAtReference: 2040,
        state: 'outside_target_civil_year',
      },
    })).toThrow('civil-year reference');
    expect(() => renderGeneralAnnualMonthlyExplorationHtml({
      ...report,
      annualReference: {
        ...report.annualReference,
        state: 'outside_target_civil_year',
      },
    })).toThrow('civil-year reference');
  });

  it('rejects a forged current-year relation instead of silently changing annual meaning', () => {
    const { report } = run(9);
    if (report.annualCurrentReading.state !== 'in_target_civil_year') {
      throw new Error('Expected current annual research context');
    }
    const original = report.annualCurrentReading;
    const fabricated = {
      ...report,
      annualCurrentReading: {
        ...original,
        sourceBoundTensions: [{
          ...original.theme,
          kind: 'tension' as const,
          observedClash: { natalBranch: '자', annualBranch: '오', relation: 'clash' as const },
        }],
      },
    };
    expect(() => renderGeneralAnnualMonthlyExplorationHtml(fabricated))
      .toThrow('exact source-bound annual focus');
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
