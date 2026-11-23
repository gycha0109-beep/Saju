import { getSolarTerm } from 'manseryeok';
import { deriveBranchPairRelation } from '../calculation/structural-relations.js';
import type { CanonicalSajuSnapshot, EarthlyBranch } from '../contracts/calculation.js';
import type { AnnualInterpretationFacts } from './annual-interpretation-facts.js';
import { resolveDayunTemporalContext } from './dayun-temporal-context.js';
import type { MonthlyInterpretationFacts } from './monthly-interpretation-facts.js';
import { annualSexagenaryPillar } from './temporal-reading-context.js';

type Slot = 'month' | 'day';
const SLOTS = ['month', 'day'] as const;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export function effectiveAnnualPillar(year: number, instantUtc: string) {
  const lichun = getSolarTerm(year, 2).date.toISOString();
  const effectiveYear = instantUtc < lichun ? year - 1 : year;
  return { effectiveYear, lichun, ...annualSexagenaryPillar(effectiveYear) };
}

function seoulLocal(instantUtc: string) {
  return new Date(Date.parse(instantUtc) + KST_OFFSET_MS).toISOString().slice(0, 16);
}

function calendarYear(instantUtc: string) {
  return Number(seoulLocal(instantUtc).slice(0, 4));
}

function observations(
  snapshot: CanonicalSajuSnapshot,
  year: number,
  instant: string,
  month?: { stem: string; branch: EarthlyBranch; endsAt: string },
) {
  const dayunContext = resolveDayunTemporalContext(snapshot, year);
  const local = seoulLocal(instant);
  const dayun =
    dayunContext.status === 'resolved'
      ? dayunContext.segments.find(
          (segment) =>
            segment.startLocalDateTime <= local &&
            local < segment.endExclusiveLocalDateTime &&
            (!month ||
              Date.parse(month.endsAt) <=
                Date.parse(segment.endExclusiveLocalDateTime + ':00+09:00')),
        )
      : undefined;
  // A split Dayun segment has no single background applicable for its whole duration.
  if (!dayun) return undefined;
  const annual = effectiveAnnualPillar(year, instant);
  const dayunPillar = { stem: dayun.pillar.stem.value, branch: dayun.pillar.branch.value };
  const positions = Object.fromEntries(
    SLOTS.flatMap((slot) => {
      const pillar = snapshot.pillars[slot];
      if (pillar.status !== 'resolved') return [];
      const natal = pillar.value.branch.value;
      return [
        [
          slot,
          {
            natal,
            annual: deriveBranchPairRelation(natal, annual.branch),
            dayun: deriveBranchPairRelation(natal, dayunPillar.branch),
            monthly: month ? deriveBranchPairRelation(natal, month.branch) : 'none',
          },
        ],
      ];
    }),
  ) as Partial<
    Record<
      Slot,
      {
        natal: EarthlyBranch;
        annual: ReturnType<typeof deriveBranchPairRelation>;
        dayun: ReturnType<typeof deriveBranchPairRelation>;
        monthly: ReturnType<typeof deriveBranchPairRelation>;
      }
    >
  >;
  return {
    startsAt: instant,
    ...(month ? { endsAt: month.endsAt, monthlyPillar: month.stem + month.branch } : {}),
    annual,
    dayunPillar,
    positions,
  };
}

export type TemporalBranchObservation = NonNullable<ReturnType<typeof observations>>;

/** Calculate the observed contacts in one period. Interpret them only in T9 rules. */
export function buildResearchTemporalBranchLayers(
  snapshot: CanonicalSajuSnapshot,
  facts: AnnualInterpretationFacts | MonthlyInterpretationFacts,
) {
  const year = facts.targetYear;
  if (facts.scope === 'annual') {
    return calendarYear(facts.referenceDateTime) === year
      ? { annual: observations(snapshot, year, facts.referenceDateTime) }
      : {};
  }
  return Object.fromEntries(
    facts.segments.map((segment) => [
      segment.segmentId,
      observations(snapshot, year, segment.startsAt, {
        ...segment.monthlyPillar,
        endsAt: segment.endsAt,
      }),
    ]),
  );
}
