import {
  calculateFourPillars,
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  getSolarTerm,
} from 'manseryeok';
import { deriveStructuralRelationCandidates } from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  HeavenlyStem,
  PillarFact,
  PillarSlot,
  TenGod,
} from '../contracts/calculation.js';
import { resolved, unavailable, type FactState } from '../contracts/common.js';
import { deriveAnnualStemTenGod } from './annual-interpretation-facts.js';
import type { TemporalReadingContext } from './temporal-reading-context.js';

export const MONTHLY_INTERPRETATION_FACTS_VERSION =
  'myeongha-monthly-interpretation-facts-v1' as const;
export const MONTHLY_INTERPRETATION_POLICY_ID =
  'myeongha-monthly-interpretation-policy-v1' as const;

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const SUPPORTED_MIN_YEAR = 1800;
const SUPPORTED_MAX_YEAR = 2300;
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲',
  을: '乙',
  병: '丙',
  정: '丁',
  무: '戊',
  기: '己',
  경: '庚',
  신: '辛',
  임: '壬',
  계: '癸',
};

const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子',
  축: '丑',
  인: '寅',
  묘: '卯',
  진: '辰',
  사: '巳',
  오: '午',
  미: '未',
  신: '申',
  유: '酉',
  술: '戌',
  해: '亥',
};

export type MonthlyBranchRelationKind = 'clash' | 'none';
export type MonthlySegmentId = 'before_jeol' | 'after_jeol';

export interface MonthlyBranchRelationValue {
  pillar: PillarSlot;
  natalBranch: EarthlyBranch;
  monthlyBranch: EarthlyBranch;
  relation: MonthlyBranchRelationKind;
}

export interface MonthlyPillarSegment {
  segmentId: MonthlySegmentId;
  startsAt: string;
  endsAt: string;
  monthlyPillar: {
    stem: HeavenlyStem;
    branch: EarthlyBranch;
  };
  monthlyStemTenGod: TenGod;
  monthlyBranchRelations: Readonly<Record<PillarSlot, FactState<MonthlyBranchRelationValue>>>;
}

export interface MonthlyInterpretationFacts {
  schemaVersion: typeof MONTHLY_INTERPRETATION_FACTS_VERSION;
  policyId: typeof MONTHLY_INTERPRETATION_POLICY_ID;
  scope: 'monthly';
  targetYear: number;
  targetMonth: number;
  timeZone: 'Asia/Seoul';
  referenceDateTime: string;
  segmentSemantics: 'half_open_start_inclusive_end_exclusive';
  civilMonth: {
    startsAt: string;
    endsAt: string;
  };
  jeolBoundary: {
    index: number;
    name: string;
    hanja: string;
    at: string;
  };
  segments: readonly [MonthlyPillarSegment, MonthlyPillarSegment];
}

function monthlyPillarFact(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: {
      value: stem,
      hanja: STEM_HANJA[stem],
      element: getHeavenlyStemElement(stem),
      yinYang: getHeavenlyStemYinYang(stem),
    },
    branch: {
      value: branch,
      hanja: BRANCH_HANJA[branch],
      element: getEarthlyBranchElement(branch),
      yinYang: getEarthlyBranchYinYang(branch),
    },
  };
}

function branchRelation(
  slot: PillarSlot,
  natalPillar: PillarFact,
  monthlyPillar: PillarFact,
): MonthlyBranchRelationValue {
  const relation = deriveStructuralRelationCandidates({
    year: monthlyPillar,
    month: natalPillar,
  }).some((candidate) => candidate.kind === 'branch_clash')
    ? 'clash'
    : 'none';

  return {
    pillar: slot,
    natalBranch: natalPillar.branch.value,
    monthlyBranch: monthlyPillar.branch.value,
    relation,
  };
}

function monthlyBranchRelationState(
  slot: PillarSlot,
  natalState: CanonicalSajuSnapshot['pillars'][PillarSlot],
  monthlyPillar: PillarFact,
): FactState<MonthlyBranchRelationValue> {
  if (natalState.status === 'resolved') {
    return resolved(branchRelation(slot, natalState.value, monthlyPillar));
  }
  if (natalState.status === 'unavailable') {
    return unavailable(natalState.reasonCode);
  }

  const bySemanticValue = new Map<string, MonthlyBranchRelationValue>();
  for (const candidate of natalState.candidates) {
    const value = branchRelation(slot, candidate.value, monthlyPillar);
    bySemanticValue.set(JSON.stringify(value), value);
  }

  const values = [...bySemanticValue.values()].sort((left, right) =>
    JSON.stringify(left).localeCompare(JSON.stringify(right)),
  );
  if (values.length === 1) return resolved(values[0]!);

  return unavailable('MONTHLY_RELATION_AMBIGUOUS');
}

function civilMonthBoundsUtc(targetYear: number, targetMonth: number): {
  startsAtMs: number;
  endsAtMs: number;
} {
  const startsAtMs = Date.UTC(targetYear, targetMonth - 1, 1) - KST_OFFSET_MS;
  const endsAtMs = Date.UTC(targetYear, targetMonth, 1) - KST_OFFSET_MS;
  return { startsAtMs, endsAtMs };
}

function kstWallClockAt(instantMs: number): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} {
  const wall = new Date(instantMs + KST_OFFSET_MS);
  return {
    year: wall.getUTCFullYear(),
    month: wall.getUTCMonth() + 1,
    day: wall.getUTCDate(),
    hour: wall.getUTCHours(),
    minute: wall.getUTCMinutes(),
  };
}

function monthPillarAt(instantMs: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  const wall = kstWallClockAt(instantMs);
  const result = calculateFourPillars(wall);
  return {
    stem: result.month.heavenlyStem,
    branch: result.month.earthlyBranch,
  };
}

function monthlySegment(
  segmentId: MonthlySegmentId,
  startsAtMs: number,
  endsAtMs: number,
  snapshot: CanonicalSajuSnapshot,
): MonthlyPillarSegment {
  const pillar = monthPillarAt(startsAtMs);
  const pillarFact = monthlyPillarFact(pillar.stem, pillar.branch);
  const dayMaster = snapshot.derivedFacts.dayMaster;
  if (dayMaster.status !== 'resolved') {
    throw new RangeError('Monthly interpretation facts require a resolved natal day master.');
  }

  const monthlyBranchRelations = Object.fromEntries(
    PILLAR_SLOTS.map((slot) => [
      slot,
      monthlyBranchRelationState(slot, snapshot.pillars[slot], pillarFact),
    ]),
  ) as Readonly<Record<PillarSlot, FactState<MonthlyBranchRelationValue>>>;

  return {
    segmentId,
    startsAt: new Date(startsAtMs).toISOString(),
    endsAt: new Date(endsAtMs).toISOString(),
    monthlyPillar: pillar,
    monthlyStemTenGod: deriveAnnualStemTenGod(dayMaster.value, pillar.stem),
    monthlyBranchRelations,
  };
}

export function buildMonthlyInterpretationFacts(
  snapshot: CanonicalSajuSnapshot,
  temporalContext: TemporalReadingContext,
): MonthlyInterpretationFacts {
  if (temporalContext.scope !== 'monthly') {
    throw new RangeError('Monthly interpretation facts require a monthly temporal context.');
  }
  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    throw new RangeError('Monthly interpretation facts require a resolved natal day master.');
  }
  if (
    temporalContext.targetYear < SUPPORTED_MIN_YEAR ||
    temporalContext.targetYear > SUPPORTED_MAX_YEAR
  ) {
    throw new RangeError(
      `Monthly interpretation facts support target years ${SUPPORTED_MIN_YEAR}-${SUPPORTED_MAX_YEAR}.`,
    );
  }

  const { targetYear, targetMonth } = temporalContext;
  const { startsAtMs, endsAtMs } = civilMonthBoundsUtc(targetYear, targetMonth);
  const jeolIndex = (targetMonth - 1) * 2;
  const jeol = getSolarTerm(targetYear, jeolIndex);
  const boundaryMs = jeol.date.getTime();
  if (!(boundaryMs > startsAtMs && boundaryMs < endsAtMs)) {
    throw new RangeError(
      `Monthly interpretation boundary ${jeol.name} does not fall inside ${targetYear}-${String(targetMonth).padStart(2, '0')} KST.`,
    );
  }

  const before = monthlySegment('before_jeol', startsAtMs, boundaryMs, snapshot);
  const after = monthlySegment('after_jeol', boundaryMs, endsAtMs, snapshot);
  if (
    before.monthlyPillar.stem === after.monthlyPillar.stem &&
    before.monthlyPillar.branch === after.monthlyPillar.branch
  ) {
    throw new RangeError('Monthly interpretation boundary did not change the month pillar.');
  }

  return {
    schemaVersion: MONTHLY_INTERPRETATION_FACTS_VERSION,
    policyId: MONTHLY_INTERPRETATION_POLICY_ID,
    scope: 'monthly',
    targetYear,
    targetMonth,
    timeZone: temporalContext.timeZone,
    referenceDateTime: temporalContext.referenceDateTime,
    segmentSemantics: 'half_open_start_inclusive_end_exclusive',
    civilMonth: {
      startsAt: new Date(startsAtMs).toISOString(),
      endsAt: new Date(endsAtMs).toISOString(),
    },
    jeolBoundary: {
      index: jeol.index,
      name: jeol.name,
      hanja: jeol.hanja,
      at: jeol.date.toISOString(),
    },
    segments: [before, after],
  };
}
