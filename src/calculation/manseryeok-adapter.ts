import { createHash } from 'node:crypto';
import {
  calculateFourPillars,
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
  lunarToSolar,
  type BirthInfo as ManseryeokBirthInfo,
  type FourPillarsDetail,
  type Pillar as ManseryeokPillar,
  type TenGodChart as ManseryeokTenGodChart,
} from 'manseryeok';
import {
  ambiguous,
  resolved,
  unavailable,
  type FactCandidate,
  type FactState,
} from '../contracts/common.js';
import type {
  AppliedCorrection,
  BirthInput,
  BranchFact,
  CalculationPolicySnapshot,
  CalculationScenario,
  CanonicalSajuSnapshot,
  Completeness,
  DerivedFacts,
  EarthlyBranch,
  FiveElement,
  FourPillarsFact,
  HeavenlyStem,
  LuckCycleFact,
  NormalizedBirthInput,
  PillarFact,
  StemFact,
  TenGodChartFact,
} from '../contracts/calculation.js';
import {
  assertBirthInput,
  assertCalculationPolicySnapshot,
} from '../contracts/runtime-validation.js';

const ENGINE_NAME = 'manseryeok';
const ENGINE_VERSION = '2.0.0';
const ENGINE_REPOSITORY = 'https://github.com/yhj1024/manseryeok';
const ADAPTER_NAME = 'myeonghwa-manseryeok-adapter';
const ADAPTER_VERSION = '0.1.0';
const SCHEMA_ID = 'myeonghwa-canonical-saju';
const SCHEMA_VERSION = 'saju-canonical-v1';
const SUPPORTED_TIME_ZONE = 'Asia/Seoul';
const DEFAULT_KOREA_LONGITUDE = 127.5;
const UNKNOWN_TIME_REASON = 'birth-time-unknown';
const UNKNOWN_TIME_AMBIGUITY_REASON = 'birth-time-unknown-enumerated-change';

const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲', 을: '乙', 병: '丙', 정: '丁', 무: '戊',
  기: '己', 경: '庚', 신: '辛', 임: '壬', 계: '癸',
};

const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
};

export interface CalculationAdapterOptions {
  now?: Date;
}

type KnownTimeBirthInput = Omit<BirthInput, 'time'> & {
  time: Extract<BirthInput['time'], { known: true }>;
};

type PillarSlot = 'year' | 'month' | 'day';

interface MinuteObservation {
  minuteOfDay: number;
  result: FourPillarsDetail;
}

function hasKnownBirthTime(input: BirthInput): input is KnownTimeBirthInput {
  return input.time.known;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== 'object') return value;

  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .filter((key) => record[key] !== undefined)
      .map((key) => [key, canonicalize(record[key])]),
  );
}

function calculateIdentity(input: BirthInput, policy: CalculationPolicySnapshot) {
  const material = {
    input,
    policy,
    engine: { name: ENGINE_NAME, version: ENGINE_VERSION },
    adapter: { name: ADAPTER_NAME, version: ADAPTER_VERSION },
    schema: { id: SCHEMA_ID, version: SCHEMA_VERSION },
  };
  const hash = createHash('sha256').update(JSON.stringify(canonicalize(material))).digest('hex');
  return { calculationHash: hash, snapshotId: `saju_${hash.slice(0, 24)}` };
}

function toStemFact(stem: HeavenlyStem): StemFact {
  return {
    value: stem,
    hanja: STEM_HANJA[stem],
    element: getHeavenlyStemElement(stem),
    yinYang: getHeavenlyStemYinYang(stem),
  };
}

function toBranchFact(branch: EarthlyBranch): BranchFact {
  return {
    value: branch,
    hanja: BRANCH_HANJA[branch],
    element: getEarthlyBranchElement(branch),
    yinYang: getEarthlyBranchYinYang(branch),
  };
}

function toPillarFact(pillar: ManseryeokPillar): PillarFact {
  return {
    stem: toStemFact(pillar.heavenlyStem),
    branch: toBranchFact(pillar.earthlyBranch),
  };
}

function pillarKey(pillar: PillarFact): string {
  return `${pillar.stem.value}${pillar.branch.value}`;
}

function requireOnly<T>(values: readonly T[], label: string): T {
  const only = values[0];
  if (values.length !== 1 || only === undefined) {
    throw new Error(`${label} requires exactly one value.`);
  }
  return only;
}

function resolveLongitude(input: BirthInput, policy: CalculationPolicySnapshot): number | undefined {
  if (!policy.trueSolarTime.enabled) return undefined;

  switch (policy.trueSolarTime.longitudeSource) {
    case 'manual':
      if (policy.trueSolarTime.longitude === undefined) {
        throw new RangeError('Manual true-solar-time policy requires longitude.');
      }
      return policy.trueSolarTime.longitude;
    case 'birthplace':
      if (input.birthplace?.longitude === undefined) {
        throw new RangeError('Birthplace true-solar-time policy requires birthplace longitude.');
      }
      return input.birthplace.longitude;
    case 'default':
      return DEFAULT_KOREA_LONGITUDE;
    case 'not-applicable':
      throw new RangeError('Enabled true-solar-time policy cannot be not-applicable.');
  }
}

function assertAdapterPolicySupported(input: BirthInput, policy: CalculationPolicySnapshot): void {
  if (policy.timeZonePolicy.timeZone !== SUPPORTED_TIME_ZONE) {
    throw new RangeError(`Adapter currently supports ${SUPPORTED_TIME_ZONE} only.`);
  }
  if (
    policy.timeZonePolicy.source === 'birthplace' &&
    input.birthplace?.timeZone !== undefined &&
    input.birthplace.timeZone !== SUPPORTED_TIME_ZONE
  ) {
    throw new RangeError(`Birthplace timezone ${input.birthplace.timeZone} is not supported yet.`);
  }
  resolveLongitude(input, policy);
}

function toManseryeokBirthInfo(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
  hour: number,
  minute: number,
): ManseryeokBirthInfo {
  const birthInfo: ManseryeokBirthInfo = {
    year: input.date.year,
    month: input.date.month,
    day: input.date.day,
    hour,
    minute,
    isLunar: input.calendarType === 'lunar',
    isLeapMonth: input.calendarType === 'lunar' ? (input.isLeapMonth ?? false) : false,
    dayBoundary: policy.dayBoundary,
  };

  if (
    input.sexForTraditionalCalculation === 'male' ||
    input.sexForTraditionalCalculation === 'female'
  ) {
    birthInfo.gender = input.sexForTraditionalCalculation;
  }

  if (policy.trueSolarTime.enabled) {
    birthInfo.trueSolarTime = {
      longitude: resolveLongitude(input, policy) ?? DEFAULT_KOREA_LONGITUDE,
      applyEquationOfTime: policy.trueSolarTime.applyEquationOfTime,
      applyHistoricalDst: policy.trueSolarTime.applyHistoricalDst,
    };
  }

  return birthInfo;
}

function solarDate(input: BirthInput) {
  if (input.calendarType === 'solar') return { ...input.date };
  return lunarToSolar(
    input.date.year,
    input.date.month,
    input.date.day,
    input.isLeapMonth ?? false,
  );
}

function appliedCorrections(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
): readonly AppliedCorrection[] {
  const solarEnabled = policy.trueSolarTime.enabled;
  return [
    { type: 'lunar-to-solar', applied: input.calendarType === 'lunar' },
    {
      type: 'longitude',
      applied: solarEnabled,
      ...(solarEnabled
        ? { details: { longitude: resolveLongitude(input, policy) ?? DEFAULT_KOREA_LONGITUDE } }
        : {}),
    },
    {
      type: 'equation-of-time',
      applied: solarEnabled && policy.trueSolarTime.applyEquationOfTime,
    },
    {
      type: 'historical-standard-time',
      applied: solarEnabled && policy.trueSolarTime.applyHistoricalDst,
    },
    {
      type: 'historical-dst',
      applied: solarEnabled && policy.trueSolarTime.applyHistoricalDst,
    },
    {
      type: 'day-boundary',
      applied: policy.dayBoundary !== 'midnight',
      details: { mode: policy.dayBoundary },
    },
  ];
}

function normalizedKnown(
  input: KnownTimeBirthInput,
  policy: CalculationPolicySnapshot,
): NormalizedBirthInput {
  return {
    solarDate: resolved(solarDate(input)),
    ...(input.calendarType === 'lunar'
      ? {
          lunarDate: resolved({
            ...input.date,
            isLeapMonth: input.isLeapMonth ?? false,
          }),
        }
      : {}),
    clockTime: resolved({ hour: input.time.hour, minute: input.time.minute }),
    ...(policy.trueSolarTime.enabled
      ? { correctedSolarTime: unavailable('upstream-corrected-time-not-exposed') }
      : {}),
    timeZone: policy.timeZonePolicy.timeZone,
    appliedCorrections: appliedCorrections(input, policy),
  };
}

function normalizedUnknown(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
): NormalizedBirthInput {
  return {
    solarDate: resolved(solarDate(input)),
    ...(input.calendarType === 'lunar'
      ? {
          lunarDate: resolved({
            ...input.date,
            isLeapMonth: input.isLeapMonth ?? false,
          }),
        }
      : {}),
    clockTime: unavailable(UNKNOWN_TIME_REASON),
    ...(policy.trueSolarTime.enabled
      ? { correctedSolarTime: unavailable(UNKNOWN_TIME_REASON) }
      : {}),
    timeZone: policy.timeZonePolicy.timeZone,
    appliedCorrections: appliedCorrections(input, policy),
  };
}

function toTenGodChart(chart: ManseryeokTenGodChart): TenGodChartFact {
  return {
    year: { stem: resolved(chart.year.stem), branch: resolved(chart.year.branch) },
    month: { stem: resolved(chart.month.stem), branch: resolved(chart.month.branch) },
    day: { stem: resolved(chart.day.stem), branch: resolved(chart.day.branch) },
    hour: { stem: resolved(chart.hour.stem), branch: resolved(chart.hour.branch) },
  };
}

function countElements(result: FourPillarsDetail): Readonly<Record<FiveElement, number>> {
  const counts: Record<FiveElement, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  for (const pillar of [result.year, result.month, result.day, result.hour]) {
    counts[getHeavenlyStemElement(pillar.heavenlyStem)] += 1;
    counts[getEarthlyBranchElement(pillar.earthlyBranch)] += 1;
  }
  return counts;
}

function luckCycle(result: FourPillarsDetail, input: BirthInput): FactState<LuckCycleFact> {
  if (
    input.sexForTraditionalCalculation !== 'male' &&
    input.sexForTraditionalCalculation !== 'female'
  ) {
    return unavailable('traditional-sex-not-provided');
  }
  if (result.luckPillars === undefined) return unavailable('engine-output-missing');

  return resolved({
    direction: result.luckPillars.forward ? 'forward' : 'backward',
    start: {
      age: result.luckPillars.startAge,
      years: result.luckPillars.startYears,
      months: result.luckPillars.startMonths,
      days: result.luckPillars.startDays,
    },
    pillars: result.luckPillars.pillars.map((item) => ({
      age: item.age,
      pillar: toPillarFact(item.pillar),
    })),
  });
}

function provenance(policy: CalculationPolicySnapshot): CanonicalSajuSnapshot['provenance'] {
  return {
    engine: { name: ENGINE_NAME, version: ENGINE_VERSION, sourceRepository: ENGINE_REPOSITORY },
    adapter: { name: ADAPTER_NAME, version: ADAPTER_VERSION },
    policy: { id: policy.policyId, version: policy.policyVersion },
    schema: { id: SCHEMA_ID, version: SCHEMA_VERSION },
  };
}

function knownCompleteness(cycle: FactState<LuckCycleFact>): Completeness {
  const resolvedPaths = [
    'pillars.year', 'pillars.month', 'pillars.day', 'pillars.hour',
    'derivedFacts.dayMaster', 'derivedFacts.tenGods',
    'derivedFacts.voidBranches', 'derivedFacts.fiveElementCounts',
  ];
  const unavailablePaths: string[] = [];
  if (cycle.status === 'resolved') resolvedPaths.push('luckCycle');
  else unavailablePaths.push('luckCycle');
  return {
    birthTimeKnown: true,
    fullyResolved: unavailablePaths.length === 0,
    resolvedPaths,
    ambiguousPaths: [],
    unavailablePaths,
  };
}

function calculateKnown(
  input: KnownTimeBirthInput,
  policy: CalculationPolicySnapshot,
  options: CalculationAdapterOptions,
): CanonicalSajuSnapshot {
  const identity = calculateIdentity(input, policy);
  const result = calculateFourPillars(
    toManseryeokBirthInfo(input, policy, input.time.hour, input.time.minute),
  );
  const cycle = luckCycle(result, input);

  return {
    ...identity,
    schemaVersion: SCHEMA_VERSION,
    createdAt: (options.now ?? new Date()).toISOString(),
    input,
    policy,
    normalized: normalizedKnown(input, policy),
    pillars: {
      year: resolved(toPillarFact(result.year)),
      month: resolved(toPillarFact(result.month)),
      day: resolved(toPillarFact(result.day)),
      hour: resolved(toPillarFact(result.hour)),
    },
    derivedFacts: {
      dayMaster: resolved(toStemFact(result.day.heavenlyStem)),
      tenGods: resolved(toTenGodChart(result.tenGods)),
      voidBranches: resolved([...result.voidBranches]),
      fiveElementCounts: resolved(countElements(result)),
    },
    luckCycle: cycle,
    scenarios: [],
    completeness: knownCompleteness(cycle),
    provenance: provenance(policy),
  };
}

function enumerateUnknownTime(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
): readonly MinuteObservation[] {
  const observations: MinuteObservation[] = [];
  for (let minuteOfDay = 0; minuteOfDay < 1440; minuteOfDay += 1) {
    const hour = Math.floor(minuteOfDay / 60);
    const minute = minuteOfDay % 60;
    observations.push({
      minuteOfDay,
      result: calculateFourPillars(toManseryeokBirthInfo(input, policy, hour, minute)),
    });
  }
  return observations;
}

function pillarState(
  observations: readonly MinuteObservation[],
  slot: PillarSlot,
): FactState<PillarFact> {
  const unique = new Map<string, PillarFact>();
  for (const observation of observations) {
    const value = toPillarFact(observation.result[slot]);
    unique.set(pillarKey(value), value);
  }
  const values = [...unique.values()];
  if (values.length === 0) return unavailable('engine-returned-no-candidates');
  if (values.length === 1) return resolved(requireOnly(values, `${slot} pillar`));

  return ambiguous(
    values.map((value): FactCandidate<PillarFact> => ({
      candidateId: `${slot}:${pillarKey(value)}`,
      value,
      reasonRefs: [UNKNOWN_TIME_AMBIGUITY_REASON],
    })),
    [UNKNOWN_TIME_AMBIGUITY_REASON],
  );
}

function dayMasterFrom(day: FactState<PillarFact>): FactState<StemFact> {
  if (day.status === 'unavailable') return unavailable(day.reasonCode);
  if (day.status === 'resolved') return resolved(day.value.stem);

  const unique = new Map<HeavenlyStem, StemFact>();
  for (const candidate of day.candidates) unique.set(candidate.value.stem.value, candidate.value.stem);
  const stems = [...unique.values()];
  if (stems.length === 1) return resolved(requireOnly(stems, 'day master'));
  return ambiguous(
    stems.map((stem) => ({
      candidateId: `day-master:${stem.value}`,
      value: stem,
      reasonRefs: [UNKNOWN_TIME_AMBIGUITY_REASON],
    })),
    [UNKNOWN_TIME_AMBIGUITY_REASON],
  );
}

function voidBranchesFrom(observations: readonly MinuteObservation[]): FactState<readonly EarthlyBranch[]> {
  const unique = new Map<string, readonly EarthlyBranch[]>();
  for (const observation of observations) {
    const value = [...observation.result.voidBranches] as readonly EarthlyBranch[];
    unique.set(value.join('|'), value);
  }
  const values = [...unique.values()];
  if (values.length === 0) return unavailable('engine-returned-no-candidates');
  if (values.length === 1) return resolved(requireOnly(values, 'void branches'));
  return ambiguous(
    values.map((value) => ({
      candidateId: `void-branches:${value.join('|')}`,
      value,
      reasonRefs: [UNKNOWN_TIME_AMBIGUITY_REASON],
    })),
    [UNKNOWN_TIME_AMBIGUITY_REASON],
  );
}

function candidateId(state: FactState<PillarFact>, value: PillarFact): string | undefined {
  if (state.status !== 'ambiguous') return undefined;
  return state.candidates.find((item) => pillarKey(item.value) === pillarKey(value))?.candidateId;
}

function scenarios(
  snapshotId: string,
  observations: readonly MinuteObservation[],
  pillars: Pick<FourPillarsFact, PillarSlot>,
): readonly CalculationScenario[] {
  if (Object.values(pillars).every((state) => state.status !== 'ambiguous')) return [];

  const combinations = new Map<string, { values: Record<PillarSlot, PillarFact>; firstMinute: number }>();
  for (const observation of observations) {
    const values: Record<PillarSlot, PillarFact> = {
      year: toPillarFact(observation.result.year),
      month: toPillarFact(observation.result.month),
      day: toPillarFact(observation.result.day),
    };
    const key = `${pillarKey(values.year)}|${pillarKey(values.month)}|${pillarKey(values.day)}`;
    if (!combinations.has(key)) combinations.set(key, { values, firstMinute: observation.minuteOfDay });
  }

  return [...combinations.values()].map((combination, index) => {
    const factOverrides: CalculationScenario['factOverrides'][number][] = [];
    for (const slot of ['year', 'month', 'day'] as const) {
      const id = candidateId(pillars[slot], combination.values[slot]);
      if (id !== undefined) {
        factOverrides.push({ path: `pillars.${slot}`, candidateId: id, value: combination.values[slot] });
      }
    }
    return {
      scenarioId: `${snapshotId}:unknown-time:${index + 1}`,
      snapshotId,
      factOverrides,
      reasonRefs: [UNKNOWN_TIME_AMBIGUITY_REASON, `first-observed-minute:${combination.firstMinute}`],
    };
  });
}

function unknownCompleteness(pillars: FourPillarsFact, facts: DerivedFacts): Completeness {
  const resolvedPaths: string[] = [];
  const ambiguousPaths: string[] = [];
  const unavailablePaths: string[] = ['pillars.hour', 'luckCycle'];
  const inspect = (path: string, state: FactState<unknown>) => {
    if (state.status === 'resolved') resolvedPaths.push(path);
    else if (state.status === 'ambiguous') ambiguousPaths.push(path);
    else unavailablePaths.push(path);
  };

  inspect('pillars.year', pillars.year);
  inspect('pillars.month', pillars.month);
  inspect('pillars.day', pillars.day);
  inspect('derivedFacts.dayMaster', facts.dayMaster);
  inspect('derivedFacts.tenGods', facts.tenGods);
  inspect('derivedFacts.voidBranches', facts.voidBranches);
  if (facts.fiveElementCounts !== undefined) inspect('derivedFacts.fiveElementCounts', facts.fiveElementCounts);

  return {
    birthTimeKnown: false,
    fullyResolved: false,
    resolvedPaths,
    ambiguousPaths,
    unavailablePaths: [...new Set(unavailablePaths)],
  };
}

function calculateUnknown(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
  options: CalculationAdapterOptions,
): CanonicalSajuSnapshot {
  const identity = calculateIdentity(input, policy);
  const observations = enumerateUnknownTime(input, policy);
  const year = pillarState(observations, 'year');
  const month = pillarState(observations, 'month');
  const day = pillarState(observations, 'day');
  const pillars: FourPillarsFact = {
    year,
    month,
    day,
    hour: unavailable(UNKNOWN_TIME_REASON),
  };
  const facts: DerivedFacts = {
    dayMaster: dayMasterFrom(day),
    tenGods: unavailable(UNKNOWN_TIME_REASON),
    voidBranches: voidBranchesFrom(observations),
    fiveElementCounts: unavailable(UNKNOWN_TIME_REASON),
  };

  return {
    ...identity,
    schemaVersion: SCHEMA_VERSION,
    createdAt: (options.now ?? new Date()).toISOString(),
    input,
    policy,
    normalized: normalizedUnknown(input, policy),
    pillars,
    derivedFacts: facts,
    luckCycle: unavailable(UNKNOWN_TIME_REASON),
    scenarios: scenarios(identity.snapshotId, observations, { year, month, day }),
    completeness: unknownCompleteness(pillars, facts),
    provenance: provenance(policy),
  };
}

export function calculateCanonicalSajuSnapshot(
  inputValue: BirthInput,
  policyValue: CalculationPolicySnapshot,
  options: CalculationAdapterOptions = {},
): CanonicalSajuSnapshot {
  assertBirthInput(inputValue);
  assertCalculationPolicySnapshot(policyValue);
  assertAdapterPolicySupported(inputValue, policyValue);
  return hasKnownBirthTime(inputValue)
    ? calculateKnown(inputValue, policyValue, options)
    : calculateUnknown(inputValue, policyValue, options);
}

export const manseryeokAdapterMetadata = Object.freeze({
  engineName: ENGINE_NAME,
  engineVersion: ENGINE_VERSION,
  adapterName: ADAPTER_NAME,
  adapterVersion: ADAPTER_VERSION,
  schemaVersion: SCHEMA_VERSION,
  supportedTimeZone: SUPPORTED_TIME_ZONE,
});
