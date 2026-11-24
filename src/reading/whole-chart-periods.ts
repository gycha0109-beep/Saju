import { getTenGod } from 'manseryeok';
import { deriveBranchPairRelation } from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarSlot,
  TenGod,
} from '../contracts/calculation.js';
import { TEN_GOD_FAMILY, type WholeChartJudgment } from '../interpretation/whole-chart-judgment.js';
import type { MonthlyInterpretationFacts } from './monthly-interpretation-facts.js';
import { resolveDayunTemporalContext } from './dayun-temporal-context.js';
import { effectiveAnnualPillar } from './research-temporal-branch-layers.js';

const KST_OFFSET = 9 * 3600000;
const SLOTS = ['year', 'month', 'day', 'hour'] as const;
type Ganji = { stem: HeavenlyStem; branch: EarthlyBranch };
type Area = 'career' | 'wealth' | 'relationship';
type PeriodLayer = {
  kind: 'dayun' | 'annual' | 'monthly';
  god: TenGod | undefined;
  contacts: readonly { slot: PillarSlot; relation: 'combination' | 'clash' }[];
  roleImpact: 'repeats_challenge' | 'repeats_support' | 'repeats_possible_remedy' | 'unsettled';
};

function periodTopics(layers: readonly PeriodLayer[], monthly: boolean) {
  const signals: {
    area: Area;
    layer: PeriodLayer['kind'];
    direction: 'support' | 'pressure';
    basis: string;
  }[] = [];
  for (const layer of layers) {
    for (const contact of layer.contacts) {
      const area =
        contact.slot === 'day' ? 'relationship' : contact.slot === 'month' ? 'career' : undefined;
      if (area)
        signals.push({
          area,
          layer: layer.kind,
          direction: contact.relation === 'clash' ? 'pressure' : 'support',
          basis: `${contact.slot}:${contact.relation}`,
        });
    }
    if (
      !layer.god ||
      (layer.roleImpact !== 'repeats_challenge' && layer.roleImpact !== 'repeats_support')
    )
      continue;
    const family = TEN_GOD_FAMILY[layer.god];
    const areas: readonly Area[] =
      family === 'output' ? ['career', 'wealth'] : family === 'wealth' ? ['wealth'] : ['career'];
    for (const area of areas)
      signals.push({
        area,
        layer: layer.kind,
        direction: layer.roleImpact === 'repeats_challenge' ? 'pressure' : 'support',
        basis: layer.god,
      });
  }
  const areas = ['career', 'wealth', 'relationship'] as const;
  return areas.flatMap((area) => {
    const evidence = signals.filter((item) => item.area === area);
    if (monthly ? !evidence.some((item) => item.layer === 'monthly') : evidence.length === 0)
      return [];
    const support = evidence.some((item) => item.direction === 'support');
    const pressure = evidence.some((item) => item.direction === 'pressure');
    return [
      {
        area,
        direction: support && pressure ? 'competing' : pressure ? 'pressure' : 'support',
        evidence,
      },
    ] as const;
  });
}

function contactAt(snapshot: CanonicalSajuSnapshot, branch: EarthlyBranch, slot: PillarSlot) {
  const pillar = snapshot.pillars[slot];
  return pillar.status === 'resolved'
    ? deriveBranchPairRelation(pillar.value.branch.value, branch)
    : 'none';
}

/** Split civil targets on every exact active layer boundary before interpreting the interval. */
export function judgeWholeChartPeriods(
  snapshot: CanonicalSajuSnapshot,
  judgment: WholeChartJudgment,
  year: number,
  monthly?: MonthlyInterpretationFacts,
) {
  if (
    snapshot.snapshotId !== judgment.snapshotId ||
    snapshot.calculationHash !== judgment.calculationHash ||
    (monthly && monthly.targetYear !== year)
  )
    throw new TypeError('Period judgment inputs must belong to the same chart and year.');
  const startMs = monthly
    ? Date.parse(monthly.civilMonth.startsAt)
    : Date.UTC(year, 0, 1) - KST_OFFSET;
  const endMs = monthly
    ? Date.parse(monthly.civilMonth.endsAt)
    : Date.UTC(year + 1, 0, 1) - KST_OFFSET;
  const start = new Date(startMs).toISOString();
  const end = new Date(endMs).toISOString();
  const dayun = resolveDayunTemporalContext(snapshot, year);
  const cycles =
    dayun.status === 'resolved'
      ? dayun.segments.map((segment) => ({
          start: Date.parse(segment.startLocalDateTime + ':00+09:00'),
          end: Date.parse(segment.endExclusiveLocalDateTime + ':00+09:00'),
          pillar: { stem: segment.pillar.stem.value, branch: segment.pillar.branch.value },
          index: segment.index,
        }))
      : [];
  const annualStart = effectiveAnnualPillar(year, start);
  const cuts = [
    ...new Set([
      startMs,
      endMs,
      Date.parse(annualStart.lichun),
      ...cycles.flatMap((cycle) => [cycle.start, cycle.end]),
      ...(monthly ? [Date.parse(monthly.jeolBoundary.at)] : []),
    ]),
  ]
    .filter((time) => time >= startMs && time <= endMs)
    .sort((a, b) => a - b);
  const master = snapshot.derivedFacts.dayMaster;
  const windows = cuts.slice(0, -1).map((from, index) => {
    const to = cuts[index + 1]!;
    const startsAt = new Date(from).toISOString();
    const endsAt = new Date(to).toISOString();
    const cycle = cycles.find((item) => item.start <= from && to <= item.end);
    const annual = effectiveAnnualPillar(year, startsAt);
    const month = monthly?.segments.find(
      (segment) => segment.startsAt <= startsAt && endsAt <= segment.endsAt,
    );
    const layer = (pillar: Ganji, kind: 'dayun' | 'annual' | 'monthly') => {
      const god =
        master.status === 'resolved' ? getTenGod(master.value.value, pillar.stem) : undefined;
      const contacts = SLOTS.flatMap((slot) => {
        const relation = contactAt(snapshot, pillar.branch, slot);
        return relation === 'none' ? [] : [{ slot, relation }];
      });
      const roles = judgment.state === 'observed' ? judgment.roles : undefined;
      const regulation =
        god && roles?.fuyi.status === 'conditional_direction'
          ? roles.fuyi.families?.includes(TEN_GOD_FAMILY[god]) === true
          : false;
      const roleImpact = roles?.ji.some((item) => item.god === god)
        ? 'repeats_challenge'
        : roles?.xi.some((item) => item.god === god)
          ? 'repeats_support'
          : roles?.repair.some((item) => item.god === god)
            ? 'repeats_possible_remedy'
            : 'unsettled';
      return { kind, pillar, god, contacts, roleImpact, regulation } as const;
    };
    const layers = [
      ...(cycle ? [layer(cycle.pillar, 'dayun')] : []),
      layer(annual, 'annual'),
      ...(month ? [layer(month.monthlyPillar, 'monthly')] : []),
    ];
    const pressure = layers.some(
      (item) =>
        item.roleImpact === 'repeats_challenge' ||
        item.contacts.some(
          (contact) =>
            contact.relation === 'clash' &&
            (contact.slot === 'month' ||
              contact.slot === 'day' ||
              (judgment.state === 'observed' &&
                judgment.strength.availableRoots.includes(contact.slot))),
        ),
    );
    const support = layers.some((item) => item.roleImpact === 'repeats_support');
    const monthLayer = layers.find((item) => item.kind === 'monthly');
    const monthlyShift = !monthLayer
      ? undefined
      : monthLayer.roleImpact === 'repeats_challenge' ||
          monthLayer.contacts.some((contact) => contact.relation === 'clash')
        ? 'requires_adjustment'
        : monthLayer.roleImpact === 'repeats_support'
          ? 'reinforces_natal_role'
          : monthLayer.contacts.some((contact) => contact.relation === 'combination')
            ? 'adds_coordination'
            : 'limited_change';
    const direction =
      !cycle || (monthly && !month) || judgment.state !== 'observed' || !judgment.allResolved
        ? 'held'
        : (pressure && support) ||
            (judgment.roles.status === 'competing_methods' &&
              layers.some((layer) => layer.regulation))
          ? 'competing'
          : pressure
            ? 'pressure'
            : support
              ? 'reinforced'
              : 'no_settled_change';
    return {
      startsAt,
      endsAt,
      effectiveYear: annual.effectiveYear,
      dayunIndex: cycle?.index,
      monthSegment: month?.segmentId,
      layers,
      direction,
      monthlyShift,
      topics: direction === 'held' ? [] : periodTopics(layers, monthly !== undefined),
    };
  });
  return {
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    rule: 'intersect-exact-dayun-lichun-and-jeol-then-evaluate-natal-roles-and-contacts',
    paths: [
      'luckCycle',
      'pillars',
      ...(monthly ? ['temporal.segments', 'temporal.jeolBoundary'] : []),
    ],
    scope: monthly ? 'monthly' : 'annual',
    start,
    end,
    dayunUnavailableReason: dayun.status === 'unavailable' ? dayun.reasonCode : undefined,
    windows,
  } as const;
}

export type WholeChartPeriods = ReturnType<typeof judgeWholeChartPeriods>;
