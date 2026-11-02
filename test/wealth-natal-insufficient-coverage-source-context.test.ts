import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';

const NOW = new Date('2026-10-25T00:00:00.000Z');
const registry = createWealthNatalMultifactorRegistry();

function wealthReading(year: number, month: number, day: number, hour: number, minute: number) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour, minute },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
  return { snapshot, execution, report };
}

describe('evidence-exact explanation for unsupported Wealth synthesis', () => {
  it('explains actual absent wealth T5 without inventing a negative fortune', () => {
    const { execution, report } = wealthReading(1964, 11, 14, 14, 59);
    expect(execution.claims.some(c => c.state === 'active' &&
      c.claimType.startsWith('TEN_GOD_WEALTH_'))).toBe(false);
    expect(report.sections).toHaveLength(1);
    expect(report.sections[0]?.axis).toBe('context');
    expect(report.sections[0]?.claimType).toContain('OFFICER_RESOURCE_CONTEXT');
    expect(report.sections[0]?.upstreamClaimIds.length).toBe(2);
    expect(report.sections[0]?.sourceIds.length).toBeGreaterThan(0);
    expect(report.state).toBe('partial');
    const partialContext = report.availableThemeContext;
    expect(partialContext?.wealthConclusionAuthorized).toBe(false);
    expect(partialContext?.themes.length).toBeGreaterThan(0);
    expect(partialContext?.themes.some(theme => theme.family === 'wealth')).toBe(false);
    expect(partialContext?.themes.every(theme =>
      !report.sections[0]!.upstreamClaimIds.includes(theme.claimId))).toBe(true);
    expect(partialContext?.paragraph).toContain(
      '위의 부분 풀이에 이미 사용된 십신 근거는 반복하지 않았습니다');
    for (const theme of partialContext?.themes ?? []) {
      expect(theme.sourceIds.length).toBeGreaterThan(0);
      expect(theme.observedPositions.length).toBeGreaterThan(0);
      expect(partialContext?.paragraph).toContain(theme.summary);
      expect(partialContext?.paragraph).toContain(theme.observedPositions[0]!);
    }
    const reason = report.missing.join(' ');
    expect(reason).toContain('재성 중심 재물운 종합 해석이 아니며');
    expect(reason).toContain('현재 실제로 확인된 출처 연결 십신 관점');
    expect(reason).toContain('재성 계열의 활성 근거가 확인되지 않아');
    expect(reason).toContain('돈이 없다는 판정이 아니며');
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(wealthReading(1964,11,14,14,59).report).toEqual(report);
  });

  it('uses the officer-peer context when officer-resource does not match the same channel', () => {
    const { execution, report } = wealthReading(1962, 5, 5, 0, 3);
    expect(execution.claims.some(c => c.state === 'active' &&
      c.claimType.startsWith('TEN_GOD_WEALTH_'))).toBe(false);
    expect(report.sections).toHaveLength(1);
    expect(report.sections[0]?.axis).toBe('context');
    expect(report.sections[0]?.pattern).toBe('OFFICER_PEER_CONTEXT');
    expect(report.sections[0]?.observedPositions.length).toBeGreaterThanOrEqual(2);
    expect(report.state).toBe('partial');
    expect(report.availableThemeContext?.wealthConclusionAuthorized).toBe(false);
    expect(report.availableThemeContext?.themes.length).toBeGreaterThan(0);
    expect(report.availableThemeContext?.themes.some(theme => theme.family === 'wealth')).toBe(false);
    expect(report.availableThemeContext?.themes.every(theme =>
      !report.sections[0]!.upstreamClaimIds.includes(theme.claimId))).toBe(true);
    expect(report.missing.join(' ')).toContain('재성 중심 재물운 종합 해석이 아니며');
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('preserves unused source-bound T5 themes when only a Wealth tension is selected', () => {
    let partial: ReturnType<typeof wealthReading> | undefined;
    for (let year = 1950; year <= 2005 && !partial; year++) {
      for (const month of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        const candidate = wealthReading(year, month, 14, 12, 0);
        if (candidate.report.sections.length === 1 &&
            candidate.report.sections[0]?.axis === 'tension' &&
            (candidate.report.availableThemeContext?.themes.length ?? 0) > 0) {
          partial = candidate;
          break;
        }
      }
    }
    expect(partial).toBeDefined();
    const report = partial!.report;
    expect(report.state).toBe('partial');
    expect(report.sections[0]?.axis).toBe('tension');
    expect(report.readingGuide).toBeUndefined();
    expect(report.missing.join(' ')).toContain('중심 종합 근거 없이');
    const context = report.availableThemeContext!;
    expect(context.wealthConclusionAuthorized).toBe(false);
    expect(context.paragraph).toContain('위의 부분 풀이에 이미 사용된 십신 근거는 반복하지 않았습니다');
    expect(context.themes.length).toBeGreaterThan(0);
    expect(context.themes.every(theme =>
      !report.sections[0]!.upstreamClaimIds.includes(theme.claimId))).toBe(true);
    for (const theme of context.themes) {
      expect(theme.sourceIds.length).toBeGreaterThan(0);
      expect(theme.observedPositions.length).toBeGreaterThan(0);
      expect(context.paragraph).toContain(theme.summary);
    }
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.usefulComplete).toBe(false);
  }, 30000);

  it('reads only the source-bounded whole-chart output/wealth relation across T5 channels', () => {
    const { execution, report } = wealthReading(1955, 10, 31, 19, 35);
    const core = report.sections[0]!;
    expect(core).toBeDefined();
    expect(core.axis).toBe('creation');
    expect(core.channel).toBe('cross_channel');
    expect(core.pattern).toBe('OUTPUT_WEALTH');
    expect(core.claimType).toContain('OUTPUT_VISIBLE_STEMS_CROSS_CHANNEL');
    expect(core.upstreamClaimIds).toHaveLength(2);
    expect(core.upstreamClaimIds.map(id => execution.claims.find(c => c.claimId === id)?.claimType).sort())
      .toEqual(['TEN_GOD_OUTPUT_VISIBLE_STEMS_THEME', 'TEN_GOD_WEALTH_BRANCHES_THEME'].sort());
    expect(core.observedFactPaths.some(path => path.endsWith('.stem.value'))).toBe(true);
    expect(core.observedFactPaths.some(path => path.endsWith('.branch.value'))).toBe(true);
    expect(core.paragraph).toContain('천간과 지지 대표 십신의 서로 다른 관측 범위');
    expect(core.paragraph).not.toContain('같은 천간에서 관측된');
    expect(core.sourceIds.length).toBe(2);
    expect(report.state).toBe('partial');
    expect(report.readingGuide?.paragraph).toContain('독립적인 보조 관점');
    expect(report.availableThemeContext?.wealthConclusionAuthorized).toBe(false);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(wealthReading(1955, 10, 31, 19, 35).report).toEqual(report);
  });
});
