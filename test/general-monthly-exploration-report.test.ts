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
      expect(section.text).toContain('특정 사건이나 결과를 확정하지 않습니다');
      expect(section.sourceIds.length).toBeGreaterThan(0);
      expect(section.ruleIds.length).toBeGreaterThan(0);
      expect(section.factPaths.length).toBeGreaterThanOrEqual(3);
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
    themes.forEach(section => {
      expect(html).toContain(section.title);
      expect(html).toContain(section.text);
    });
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
    expect(html).toContain(after.report.referenceReading.theme!.sourceIds[0]!);
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
    expect(html).toContain('절입 전');
    expect(html).toContain('절입 이후');
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
          claim.claimType === 'GENERAL_MONTHLY_BRANCH_CLASH_TENSION')).toBe(true);
      }
      break;
    }
    expect(found).toBe(true);
  }, 30000);

  it('keeps genuine two-phase themes with unknown birth hour but never invents an hour tension', () => {
    const { report } = run(9, snapshot(9, false));
    expect(report.sections.filter(section => section.kind === 'theme')).toHaveLength(2);
    expect(report.sections.some(section => section.relatedPillar === 'hour')).toBe(false);
    expect(report.sections.some(section => section.relatedPillar === 'hour' &&
      section.observedClash !== undefined)).toBe(false);
    expect(report.missing.join(' ')).toContain('시주');
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
