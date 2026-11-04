import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../src/research/general-monthly-reading-candidate.js';
import {
  buildGeneralMonthlyExplorationReport,
  renderGeneralMonthlyExplorationHtml,
} from '../src/preview/general-monthly-exploration-report.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function snapshot(day = 9, timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW },
  );
}

function run(month: number, natal: CanonicalSajuSnapshot = snapshot(), referenceDateTime = NOW.toISOString()) {
  const request: ReadingRequest = {
    requestId: `monthly-research-preview-${month}`,
    intent: { domain: 'general', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly', year: 2026, month, timeZone: 'Asia/Seoul',
      referenceDateTime, resolution: 'relative_current',
    },
  };
  const context = buildTemporalReadingContext(request);
  if (!context || context.scope !== 'monthly') throw new Error('expected monthly context');
  const facts = buildMonthlyInterpretationFacts(natal, context);
  const registry = createGeneralMonthlyReadingCandidateRegistry(NOW.toISOString());
  const execution = runInterpretation(natal, registry, {
    requestId: request.requestId, temporalFacts: { ...facts }, now: NOW,
  });
  const report = buildGeneralMonthlyExplorationReport(natal, facts, execution, registry, request);
  return { natal, facts, execution, registry, request, report };
}

describe('real-calculated monthly Korean research consumer preview', () => {
  it('renders real monthly 六合 T9 with its classical source in the exact Jeol interval', () => {
    let example: ReturnType<typeof run> | undefined;
    for (const month of [2, 4, 6, 8, 10, 12]) {
      if (example) break;
      for (const day of [2, 7, 12, 17, 22]) {
        const candidate = run(month, snapshot(day));
        if (candidate.report.sections.some(section => section.kind === 'support')) {
          example = candidate;
          break;
        }
      }
    }
    expect(example).toBeDefined();
    if (!example) return;
    const support = example.report.sections.find(section => section.kind === 'support')!;
    const sourceSegment = example.facts.segmentsById[support.segmentId];
    expect(support.observedCombination?.relation).toBe('six_combination');
    expect(support.sourceIds).toContain('SRC-T0-XUANZE-YAOLUE-UPPER');
    expect(support.methodologyId).toBe('M-GENERAL-MONTHLY-T9-SIX-COMBINATION-SOURCE-V1');
    expect(support.calculatedInterval).toEqual({
      startsAt: sourceSegment.startsAt, endsAt: sourceSegment.endsAt,
    });
    expect(support.text).toContain('전통 명리의 육합(六合) 쌍');
    expect(support.text).toContain('합화나 실제 사건의 근거가 아닙니다');
    const actual = example.execution.claims.find(claim => claim.claimId === support.claimId);
    expect(actual?.state).toBe('active');
    expect(actual?.sourceRefs).toEqual(support.sourceIds);
    expect(actual?.factRefs).toEqual(support.factPaths);
    expect(renderGeneralMonthlyExplorationHtml(example.report)).toContain(support.text);
    expect(example.report.mayPublish).toBe(false);
    expect(example.report.maySell).toBe(false);
  });

  it('shows actual distinct before/after jeol T9 meanings and their source-bound intervals in one HTML', () => {
    const { natal, facts, report, execution } = run(9);
    expect(report.headline).toContain('9월');
    expect(report.snapshotId).toBe(natal.snapshotId);
    expect(report.calculationHash).toBe(natal.calculationHash);
    expect(report.jeolBoundary.at).toBe(facts.jeolBoundary.at);
    expect(report.coverage).toBe('complete');
    expect(report.referenceReading.state).toBe('in_period');
    expect(report.referenceReading.segmentId).toBe('before_jeol');
    expect(report.referenceReading.theme?.claimId).toBe(
      report.sections.find(section => section.kind === 'theme' &&
        section.segmentId === 'before_jeol')?.claimId,
    );
    const themes = report.sections.filter(x => x.kind === 'theme');
    expect(themes.map(x => x.segmentId)).toEqual(['before_jeol', 'after_jeol']);
    expect(themes.map(x => x.tenGod)).toEqual(
      facts.segments.map(segment => segment.monthlyStemTenGod));
    for (const section of report.sections) {
      expect(section.title).toMatch(/[가-힣]/u);
      expect(section.text.length).toBeGreaterThan(30);
      if (section.kind === 'support') {
        expect(section.text).toContain('합화나 실제 사건의 근거가 아닙니다');
      } else {
        expect(section.text).toContain('특정 사건이나 결과를 확정하지 않습니다');
      }
      expect(section.sourceIds.length).toBeGreaterThan(0);
      expect(section.ruleIds.length).toBeGreaterThan(0);
      expect(section.factPaths.length).toBeGreaterThanOrEqual(3);
      const exact = execution.claims.find(claim => claim.claimId === section.claimId);
      expect(exact).toBeDefined();
      expect(section.claimType).toBe(exact!.claimType);
      expect(section.semanticKey).toBe((exact!.value as {semanticKey:string}).semanticKey);
      expect(section.methodologyId).toBe(exact!.methodologyRef.id);
      expect(section.ruleIds).toEqual(exact!.ruleRefs.map(ref => ref.ruleId));
      expect(execution.claims.some(claim => claim.claimId === section.claimId &&
        claim.sourceRefs.some(id => section.sourceIds.includes(id)))).toBe(true);
      expect(section.calculatedInterval).toEqual({
        startsAt: facts.segmentsById[section.segmentId].startsAt,
        endsAt: facts.segmentsById[section.segmentId].endsAt,
      });
    }
    const html = renderGeneralMonthlyExplorationHtml(report);
    expect(html).toContain('<html lang="ko">');
    expect(html).toContain('절입 전');
    expect(html).toContain('절입 이후');
    expect(html).toContain('근거와 출처');
    expect(html).toContain('<h1>2026년 9월 — 이번 달의 흐름</h1>');
    themes.forEach(section => {
      expect(html).toContain(section.title);
      expect(html).toContain(section.text);
    });
    // The active month appears in its focus card. The period overview keeps
    // the original interval label without repeating the same T9 copy.
    expect(html).toContain(
      '이 구간의 풀이와 근거는 위의 조회 시각 결과에서 한 번만 표시합니다.');
    for (const section of report.sections) {
      expect(html.split(section.text)).toHaveLength(2);
      expect(html).toContain(section.claimId);
      expect(html).toContain(section.sourceIds[0]!);
    }
    expect(html).toContain('공식 해석이나 판매 가능한 결과가 아닙니다');
  });

  it('shows the actually applicable Korean theme just before and at Jeol while keeping preview HOLD', () => {
    const jeol = run(9).facts.jeolBoundary.at;
    const before = run(9, snapshot(), new Date(Date.parse(jeol) - 1).toISOString());
    const after = run(9, snapshot(), jeol);
    expect(before.report.referenceReading.segmentId).toBe('before_jeol');
    expect(after.report.referenceReading.segmentId).toBe('after_jeol');
    expect(before.report.referenceReading.theme?.claimId)
      .not.toBe(after.report.referenceReading.theme?.claimId);
    const html = renderGeneralMonthlyExplorationHtml(after.report);
    expect(html).toContain('id="reference-month-reading"');
    expect(html).toContain(after.report.referenceReading.theme!.text);
    const current = html.split('id="reference-month-reading"')[1]!.split('<section><h2>절입 전</h2>')[0]!;
    const focus = after.report.referenceReading.theme!;
    for (const evidence of [focus.claimId, focus.semanticKey, focus.factPaths[0]!,
      focus.ruleIds[0]!, focus.methodologyId, focus.sourceIds[0]!]) {
      expect(current).toContain(evidence);
    }
    expect(after.report.mayPublish).toBe(false);
    expect(after.report.maySell).toBe(false);
  });

  it('does not claim an active monthly theme when the reference instant belongs to another month', () => {
    const { report } = run(10);
    expect(report.referenceReading).toEqual({
      state: 'outside_target_month', referenceDateTime: NOW.toISOString(),
    });
    const html = renderGeneralMonthlyExplorationHtml(report);
    expect(html).toContain('선택한 달 밖에 있습니다');
    expect(html).toContain('<h1>2026년 10월 — 선택한 월의 흐름</h1>');
    expect(html).not.toContain('<h1>2026년 10월 — 이번 달의 흐름</h1>');
    expect(html).toContain('절입 전');
    expect(html).toContain('절입 이후');
    expect(html).not.toContain(
      '이 구간의 풀이와 근거는 위의 조회 시각 결과에서 한 번만 표시합니다.');
    for (const section of report.sections) {
      expect(html.split(section.text)).toHaveLength(2);
    }
  });

  it('changes source-linked Korean phase interpretations across different actual months and is deterministic for the same month', () => {
    const september = run(9);
    const again = run(9);
    const october = run(10);
    const themes = (x: ReturnType<typeof run>) =>
      x.report.sections.filter(section => section.kind === 'theme');
    expect(themes(september).map(x => x.title)).toEqual(themes(again).map(x => x.title));
    expect(themes(september).map(x => x.claimId)).toEqual(themes(again).map(x => x.claimId));
    expect(themes(october).map(x => x.title)).not.toEqual(themes(september).map(x => x.title));
    expect(october.report.jeolBoundary.at).not.toBe(september.report.jeolBoundary.at);
    expect(october.report.snapshotId).toBe(september.report.snapshotId);
  });

  it('shows only calculated natal-month clash branch pairs with their actual Jeol segment', () => {
    let found = false;
    for (let month = 1; month <= 12; month++) {
      const { facts, report, execution } = run(month);
      const tensions = report.sections.filter(section => section.kind === 'tension');
      if (tensions.length === 0) continue;
      found = true;
      const html = renderGeneralMonthlyExplorationHtml(report);
      for (const section of tensions) {
        const slot = section.relatedPillar!;
        const segment = facts.segmentsById[section.segmentId];
        const observed = segment.monthlyBranchRelations[slot];
        expect(observed.status).toBe('resolved');
        if (observed.status !== 'resolved') continue;
        expect(section.observedClash).toEqual({
          natalBranch: observed.value.natalBranch,
          monthlyBranch: observed.value.monthlyBranch,
          relation: 'clash',
        });
        expect(observed.value.monthlyBranch).toBe(segment.monthlyPillar.branch);
        expect(section.text).toContain(`지지 ${observed.value.natalBranch}`);
        expect(section.text).toContain(`월주 지지 ${observed.value.monthlyBranch}`);
        expect(section.text).toContain('실제 사건의 발생을 뜻하지 않습니다');
        expect(section.factPaths).toContain(
          `temporal.segmentsById.${section.segmentId}.monthlyBranchRelations.${slot}.relation`);
        expect(html).toContain(section.text);
        expect(execution.claims.some(claim => claim.claimId === section.claimId &&
          claim.claimType === 'GENERAL_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION')).toBe(true);
      }
      const chosen = tensions[0]!;
      const interval = facts.segmentsById[chosen.segmentId];
      const inPeriod = new Date(Date.parse(interval.startsAt) + 1).toISOString();
      const active = run(month, snapshot(), inPeriod);
      const selected = active.report.referenceReading;
      expect(selected.state).toBe('in_period');
      expect(selected.segmentId).toBe(chosen.segmentId);
      expect(selected.sourceBoundTensions?.map(item => item.claimId))
        .toContain(chosen.claimId);
      expect(selected.sourceBoundTensions?.every(item =>
        item.kind === 'tension' &&
        item.segmentId === chosen.segmentId &&
        item.calculatedInterval.startsAt === interval.startsAt &&
        item.sourceIds.length > 0)).toBe(true);
      const activeHtml = renderGeneralMonthlyExplorationHtml(active.report);
      expect(activeHtml).toContain('aria-label="조회 시각에 적용되는 원국 충 관계"');
      const current = activeHtml.split('id="reference-month-reading"')[1]!
        .split('<section><h2>절입 전</h2>')[0]!;
      for (const evidence of [chosen.claimId, chosen.semanticKey, chosen.factPaths[0]!,
        chosen.ruleIds[0]!, chosen.methodologyId, chosen.sourceIds[0]!]) {
        expect(current).toContain(evidence);
      }
      const otherId = chosen.segmentId === 'before_jeol' ? 'after_jeol' : 'before_jeol';
      const other = facts.segmentsById[otherId];
      const otherReading = run(month, snapshot(),
        new Date(Date.parse(other.startsAt) + 1).toISOString()).report.referenceReading;
      expect(otherReading.sourceBoundTensions?.some(x => x.claimId === chosen.claimId) ?? false)
        .toBe(false);
      break;
    }
    expect(found).toBe(true);
  }, 30000);

  it('renders the same selected T9 monthly meanings in a stable segment and natal-pillar order', () => {
    const examples = [
      [[1974, 11, 10, 5, 32], [1983, 7, 26, 5, 14]],
      [[1955, 3, 20, 23, 38], [1998, 4, 3, 1, 16]],
      [[1999, 3, 29, 23, 44], [1975, 4, 4, 13, 15]],
    ] as const;
    const segmentOrder = ['before_jeol', 'after_jeol'];
    const pillarOrder = ['year', 'month', 'day', 'hour'];
    const read = (parts: readonly [number, number, number, number, number]) => {
      const [year, month, day, hour, minute] = parts;
      const natal = calculateCanonicalSajuSnapshot({
        calendarType: 'solar',
        date: { year, month, day },
        time: { known: true, hour, minute },
        sexForTraditionalCalculation: 'unspecified',
      }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
      return run(10, natal, '2026-10-25T00:00:00.000Z').report;
    };
    for (const [leftBirth, rightBirth] of examples) {
      const left = read(leftBirth);
      const right = read(rightBirth);
      const ordered = (report: typeof left) => report.sections
        .filter(section => section.kind === 'tension')
        .map(section => [section.segmentId, section.relatedPillar] as const);
      const actualOrder = ordered(left);
      expect(actualOrder.length).toBeGreaterThan(1);
      expect(actualOrder).toEqual([...actualOrder].sort((a, b) =>
        segmentOrder.indexOf(a[0]) - segmentOrder.indexOf(b[0]) ||
        pillarOrder.indexOf(a[1]!) - pillarOrder.indexOf(b[1]!)));
      expect(ordered(right)).toEqual(actualOrder);
      expect(left.sections.map(section => section.title + '\n' + section.text))
        .toEqual(right.sections.map(section => section.title + '\n' + section.text));
      expect(left.mayPublish).toBe(false);
      expect(right.maySell).toBe(false);
    }
  });

  it('keeps genuine two-phase themes with unknown birth hour but never invents an hour tension', () => {
    const { report } = run(9, snapshot(9, false));
    expect(report.sections.filter(section => section.kind === 'theme')).toHaveLength(2);
    expect(report.sections.some(section => section.relatedPillar === 'hour')).toBe(false);
    expect(report.sections.some(section => section.relatedPillar === 'hour' &&
      section.observedClash !== undefined)).toBe(false);
    expect(report.missing.join(' ')).toContain('시주');
    expect(report.missing.join(' ')).toContain('월운 충·육합 관계는 해석하지 않습니다');
    const html = renderGeneralMonthlyExplorationHtml(report);
    expect(html).toContain('시주 지지와 월운 사이의 충·육합 관계는');
    expect(html).toContain('확인된 충·육합 관계가 없다는 결론이 아닙니다');
    expect(report.researchOnly).toBe(true);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.status).toBe('not_official_reading');
  });

  it('refuses a different person or a different target month instead of reusing foreign T9 copy', () => {
    const x = run(9);
    expect(() => buildGeneralMonthlyExplorationReport(
      snapshot(10), x.facts, x.execution, x.registry, x.request,
    )).toThrow();
    const wrongPeriod: ReadingRequest = {
      ...x.request,
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 10,
        timeZone: 'Asia/Seoul', referenceDateTime: NOW.toISOString(),
        resolution: 'relative_current',
      },
    };
    expect(() => buildGeneralMonthlyExplorationReport(
      x.natal, x.facts, x.execution, x.registry, wrongPeriod,
    )).toThrow();
  });
});
