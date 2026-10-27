import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../src/research/general-monthly-reading-candidate.js';
import { buildGeneralAnnualMonthlyExplorationReport } from '../src/preview/general-annual-monthly-exploration-report.js';
import { buildLifeStageDayunResearchReport } from '../src/preview/life-stage-dayun-research-report.js';
import { buildTemporalResearchMenuReadings } from '../src/preview/temporal-research-menu-reading.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function sample(known = true, year = 1990) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year, month: 5, day: 15 },
    time: known
      ? { known: true as const, hour: 14, minute: 30 }
      : { known: false as const },
    sexForTraditionalCalculation: 'male',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

function reports(
  known = true, birthYear = 1990,
  referenceDateTime = NOW.toISOString(),
) {
  const snapshot = sample(known, birthYear);
  const request: ReadingRequest = {
    requestId: 'temporal-menu-scoped-2030-06',
    intent: { domain: 'general', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly', year: 2030, month: 6,
      timeZone: 'Asia/Seoul',
      referenceDateTime,
      resolution: 'relative_current',
    },
  };
  const context = buildTemporalReadingContext(request);
  if (context?.scope !== 'monthly') throw new TypeError('Expected monthly context.');
  const facts = buildMonthlyInterpretationFacts(snapshot, context);
  const registry = createGeneralMonthlyReadingCandidateRegistry(referenceDateTime);
  const execution = runInterpretation(snapshot, registry, {
    requestId: request.requestId,
    temporalFacts: { ...facts },
    now: new Date(referenceDateTime),
  });
  const annualMonthly = buildGeneralAnnualMonthlyExplorationReport(
    snapshot, facts, execution, registry, request,
  );
  const lifeStage = buildLifeStageDayunResearchReport(
    snapshot, '2030-06-01T12:00:00+09:00',
  );
  return { snapshot, annualMonthly, lifeStage };
}

describe('actual temporal research → three separate 12-menu readiness hand-offs', () => {
  it('keeps annual and T9 monthly interpretations separate from life-stage calculated facts', () => {
    const { snapshot, annualMonthly, lifeStage } = reports();
    const cards = buildTemporalResearchMenuReadings({ annualMonthly, lifeStage });
    expect(cards.map(card => card.menuId)).toEqual(['annual', 'monthly', 'life_stage']);
    expect(cards.map(card => card.availability)).toEqual(['partial', 'partial', 'partial']);
    expect(cards.map(card => card.meaning)).toEqual([
      'bounded_research_interpretation',
      'bounded_research_interpretation',
      'calculation_facts_only',
    ]);
    expect(cards.every(card =>
      card.authority.researchOnly &&
      card.authority.mayMarkMenuAvailable === false &&
      card.authority.mayCallOfficial === false &&
      card.authority.mayPublish === false &&
      card.authority.mayPersist === false &&
      card.authority.maySell === false)).toBe(true);
    expect(cards[0]?.provenance.snapshotId).toBe(snapshot.snapshotId);
    expect(cards[1]?.provenance.calculationHash).toBe(snapshot.calculationHash);
    expect(cards[2]?.provenance.snapshotId).toBe(snapshot.snapshotId);
    expect(cards[0]?.sections.map(section => section.text)).toEqual(
      annualMonthly.annual.sections.map(section => section.text),
    );
    expect(cards[1]?.sections.map(section => section.text)).toEqual(
      annualMonthly.monthly.sections.map(section => section.text),
    );
    expect(cards[2]?.sections.map(section => section.text)).toEqual(
      lifeStage.periods.map(period => period.text),
    );
    expect(cards[2]?.sections.every(section =>
      section.evidenceKind === 'canonical_dayun_fact' &&
      section.factPaths.includes('luckCycle') &&
      section.sourceIds.includes(lifeStage.policyId))).toBe(true);
    expect(JSON.stringify(cards[2])).not.toContain('official_grounded_response');
  });

  it('preserves exact monthly T9 sources, intervals, Jeol phase and claim IDs', () => {
    const { annualMonthly } = reports();
    const monthly = buildTemporalResearchMenuReadings({ annualMonthly })[1]!;
    expect(monthly.availability).toBe('partial');
    expect(monthly.provenance.targetMonth).toBe(6);
    expect(monthly.sections.length).toBeGreaterThanOrEqual(2);
    for (const original of annualMonthly.monthly.sections) {
      const projected = monthly.sections.find(item => item.claimId === original.claimId);
      expect(projected).toBeDefined();
      expect(projected?.sourceIds).toEqual(original.sourceIds);
      expect(projected?.factPaths).toEqual(original.factPaths);
      if (original.observedClash && original.relatedPillar) {
        expect(projected?.observedClash).toEqual({
          natalPillar: original.relatedPillar,
          natalBranch: original.observedClash.natalBranch,
          temporalBranch: original.observedClash.monthlyBranch,
        });
      }
      expect(projected?.interval).toEqual({
        startsAt: original.calculatedInterval.startsAt,
        endsAtExclusive: original.calculatedInterval.endsAt,
      });
      expect(projected?.title).toContain(
        original.segmentId === 'before_jeol' ? '절입 전' : '절입 이후',
      );
    }
    const annual = buildTemporalResearchMenuReadings({ annualMonthly })[0]!;
    expect(annual.sections.every(s => s.evidenceKind === 'annual_research_profile')).toBe(true);
    expect(annual.sections.every(s => s.claimId === undefined)).toBe(true);
    for (const original of annualMonthly.annual.sections) {
      if (!original.observedClash || !original.relatedPillar) continue;
      const projected = annual.sections.find(x => x.researchProfileKey === original.id);
      expect(projected?.observedClash).toEqual({
        natalPillar: original.relatedPillar,
        natalBranch: original.observedClash.natalBranch,
        temporalBranch: original.observedClash.annualBranch,
      });
    }
    expect(annual.statusMessage).toContain('연운 Official 해석은 미승인');
    expect(monthly.statusMessage).toContain('월운 Official 해석은 미승인');
    expect(annual.missing.join(' ')).toContain('원국 종합해석을 뒷받침할');
    expect(monthly.missing.join(' ')).toContain('연운으로부터의 의미 상속');
  });

  it('selects only the exact T9 theme for the real reference instant inside the requested month', () => {
    const { annualMonthly } = reports(true, 1990, '2030-06-02T12:00:00.000Z');
    const actual = annualMonthly.monthly.referenceReading;
    expect(actual.state).toBe('in_period');
    expect(actual.theme).toBeDefined();
    const menu = buildTemporalResearchMenuReadings({ annualMonthly })[1]!;
    const focus = menu.referenceFocus;
    expect(focus?.state).toBe('in_period');
    expect(focus?.referenceDateTime).toBe(actual.referenceDateTime);
    expect(focus?.segmentId).toBe(actual.segmentId);
    expect(focus?.currentSection?.text).toBe(actual.theme?.text);
    expect(focus?.currentSection?.claimId).toBe(actual.theme?.claimId);
    expect(focus?.currentSection?.sourceIds).toEqual(actual.theme?.sourceIds);
    expect(focus?.currentSection?.factPaths).toEqual(actual.theme?.factPaths);
    expect(focus?.currentSection?.interval).toEqual({
      startsAt: actual.theme?.calculatedInterval.startsAt,
      endsAtExclusive: actual.theme?.calculatedInterval.endsAt,
    });
    expect(menu.sections).toHaveLength(annualMonthly.monthly.sections.length);
    expect(menu.statusMessage).toContain('조회 시각');
    expect(menu.authority.mayMarkMenuAvailable).toBe(false);
  });

  it('never borrows a theme when the reference time is outside or its current T9 is unavailable', () => {
    const { annualMonthly } = reports();
    const menu = buildTemporalResearchMenuReadings({ annualMonthly })[1]!;
    expect(menu.referenceFocus?.state).toBe('outside_target_month');
    expect(menu.referenceFocus?.currentSection).toBeUndefined();
    expect(menu.sections.length).toBeGreaterThan(0);
    const inMonth = reports(true, 1990, '2030-06-02T12:00:00.000Z').annualMonthly;
    const original = inMonth.monthly.referenceReading;
    expect(original.state).toBe('in_period');
    if (original.state !== 'in_period' || original.segmentId === undefined ||
        original.theme === undefined) {
      throw new Error('Expected a source-qualified T9 reference for the in-month fixture.');
    }
    const referenceSegmentId = original.segmentId;
    const referenceTheme = original.theme;
    const blocked = buildTemporalResearchMenuReadings({
      annualMonthly: {
        ...inMonth,
        monthly: {
          ...inMonth.monthly,
          referenceReading: {
            referenceDateTime: original.referenceDateTime,
            state: 'insufficient_evidence',
            segmentId: referenceSegmentId,
          }
        },
      },
    })[1]!;
    expect(blocked.referenceFocus?.state).toBe('insufficient_evidence');
    expect(blocked.referenceFocus?.currentSection).toBeUndefined();
    expect(blocked.referenceFocus?.message).toContain('보류');
    expect(() => buildTemporalResearchMenuReadings({
      annualMonthly: {
        ...inMonth,
        monthly: {
          ...inMonth.monthly,
          referenceReading: {
            ...original,
            referenceDateTime: '2030-06-03T12:00:00.000Z',
          },
        },
      },
    })).toThrow('Monthly reference');
    expect(() => buildTemporalResearchMenuReadings({
        annualMonthly: {
          ...inMonth,
          monthly: {
            ...inMonth.monthly,
            referenceReading: {
              ...original,
              theme: { ...referenceTheme, claimId: 'UNRELATED-T9' },
            },
          },
        },
      })).toThrow('Monthly reference');
  });

  it('does not fabricate life-stage calculations for unknown birth time', () => {
    const { annualMonthly, lifeStage } = reports(false);
    expect(lifeStage.coverage).toBe('unavailable');
    const cards = buildTemporalResearchMenuReadings({ annualMonthly, lifeStage });
    expect(cards[2]?.availability).toBe('unavailable');
    expect(cards[2]?.sections).toHaveLength(0);
    expect(cards[2]?.meaning).toBe('none');
    expect(cards[2]?.missing.join(' ')).toContain('대운 계산');
    expect(cards[1]?.sections.some(x => x.title.includes('시주 충'))).toBe(false);
    expect(cards[0]?.meaning).toBe('bounded_research_interpretation');
  });

  it('separates unexecuted menus from unsupported official interpretation', () => {
    const cards = buildTemporalResearchMenuReadings({});
    expect(cards).toHaveLength(3);
    expect(cards.every(card => card.availability === 'unavailable')).toBe(true);
    expect(cards.every(card => card.meaning === 'none')).toBe(true);
    expect(cards.every(card => card.sections.length === 0)).toBe(true);
    expect(cards.every(card => card.missing.length > 0)).toBe(true);
    expect(cards[0]?.missing.join(' ')).toContain('연도 및 출생정보');
    expect(cards[1]?.missing.join(' ')).toContain('월·출생정보');
    expect(cards[2]?.missing.join(' ')).toContain('조회 시각');
  });

  it('rejects different persons, calculation policies, or attempted official promotion', () => {
    const first = reports();
    const second = reports(true, 1991);
    expect(() => buildTemporalResearchMenuReadings({
      annualMonthly: first.annualMonthly,
      lifeStage: second.lifeStage,
    })).toThrow('Different persons');

    expect(() => buildTemporalResearchMenuReadings({
      annualMonthly: { ...first.annualMonthly, mayPublish: true } as unknown as
        typeof first.annualMonthly,
    })).toThrow('official or mixed-period');

    expect(() => buildTemporalResearchMenuReadings({
      lifeStage: { ...first.lifeStage, usefulComplete: true } as unknown as
        typeof first.lifeStage,
    })).toThrow('official meaning');
    const replay = buildTemporalResearchMenuReadings(first);
    expect(buildTemporalResearchMenuReadings(first)).toEqual(replay);
  });
});
