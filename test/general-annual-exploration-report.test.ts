import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { TenGod } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  buildAnnualInterpretationFacts,
  type AnnualInterpretationFacts,
} from '../src/reading/annual-interpretation-facts.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { buildGeneralAnnualExplorationReport } from '../src/preview/general-annual-exploration-report.js';
import { GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/general-annual-narrative-profiles.js';

const REFERENCE = '2026-09-03T12:00:00.000Z';
const NOW = new Date(REFERENCE);

function facts(year = 2026, timeKnown = true): AnnualInterpretationFacts {
  const snapshot = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day: 9 },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
  const request: ReadingRequest = {
    requestId: `annual-exploration-${year}`,
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: REFERENCE,
      resolution: 'relative_current',
    },
  };
  const context = buildTemporalReadingContext(request);
  if (context?.scope !== 'annual') throw new Error('Expected annual context');
  return buildAnnualInterpretationFacts(snapshot, context);
}

describe('opt-in consumer Annual exploration', () => {
  it('assembles a consumer-visible headline from the existing calculation facts and research copy', () => {
    const value = facts();
    const result = buildGeneralAnnualExplorationReport(value);
    expect(result.headline).toBe('2026년 연운 미리보기');
    expect(result.targetYear).toBe(value.targetYear);
    expect(result.referenceDateTime).toBe(REFERENCE);
    expect(result.annualStemTenGod).toBe(value.annualStemTenGod);
    expect(result.annualPillarLabel).toBe(`${value.annualPillar.stem}${value.annualPillar.branch}`);
    expect(result.sections[0]).toMatchObject({
      kind: 'core',
      interpretationStatus: 'internal_research',
    });
    expect(result.sections[0]?.text.length).toBeGreaterThan(30);
    expect(result.sections.every((section) => section.text.trim().length > 0)).toBe(true);
  });

  it('reuses every existing Ten-God narrative without inventing missing copy', () => {
    const input = facts();
    const tenGods: readonly TenGod[] = [
      '비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인',
    ];
    for (const tenGod of tenGods) {
      const report = buildGeneralAnnualExplorationReport({ ...input, annualStemTenGod: tenGod });
      const match = GENERAL_ANNUAL_CLAIM_NARRATIVE_PROFILES.find(
        (profile) => profile.semanticKeys?.includes(report.sections[0]!.id),
      );
      expect(match).toBeDefined();
      expect(report.sections[0]?.title).toBe(
        match?.templates?.find((t) => t.templateKey === 'headline')?.text,
      );
    }
  });

  it('changes the interpreted core when the target year changes without claiming exact LiChun timing', () => {
    const left = buildGeneralAnnualExplorationReport(facts(2026));
    const right = buildGeneralAnnualExplorationReport(facts(2027));
    expect(left.annualStemTenGod).not.toBe(right.annualStemTenGod);
    expect(left.sections[0]?.id).not.toBe(right.sections[0]?.id);
    expect(left.calendarPolicy).toBe('civil_year_only');
    expect(right.calendarPolicy).toBe('civil_year_only');
    expect(right.caveats.join(' ')).toContain('입춘');
  });

  it('omits unresolved hour relations rather than inventing a clash', () => {
    const report = buildGeneralAnnualExplorationReport(facts(2026, false));
    expect(report.unavailablePillars).toContain('hour');
    expect(report.sections.some((x) => x.relatedPillar === 'hour')).toBe(false);
    expect(report.caveats.join(' ')).toContain('확인되지 않은 기둥');
  });

  it('shows a resolved branch clash as conditional tension, not a concrete event', () => {
    const value = facts();
    const updated: AnnualInterpretationFacts = {
      ...value,
      annualBranchRelations: {
        ...value.annualBranchRelations,
        day: resolved({
          pillar: 'day',
          natalBranch: '자',
          annualBranch: value.annualPillar.branch,
          relation: 'clash',
        }),
      },
    };
    const report = buildGeneralAnnualExplorationReport(updated);
    const tension = report.sections.find((x) => x.relatedPillar === 'day');
    expect(tension?.kind).toBe('tension');
    expect(tension?.title).toContain('일주');
    expect(tension?.text).toContain('특정 사건의 예고로 보지');
  });

  it('rejects contradictory relation payloads and never grants publication or commerce rights', () => {
    const value = facts();
    expect(() => buildGeneralAnnualExplorationReport({
      ...value,
      annualBranchRelations: {
        ...value.annualBranchRelations,
        year: resolved({
          pillar: 'month',
          natalBranch: '자',
          annualBranch: value.annualPillar.branch,
          relation: 'clash',
        }),
      },
    })).toThrow('Contradictory annual branch relation');

    const report = buildGeneralAnnualExplorationReport(value);
    expect(report.status).toBe('not_official_reading');
    expect(report.mode).toBe('internal_exploration');
    expect(report.permissions).toEqual({
      mayClaimOfficialAuthority: false,
      mayPublish: false,
      maySell: false,
      mayAutoPromoteResearch: false,
      modelCalls: 0,
    });
  });
});
