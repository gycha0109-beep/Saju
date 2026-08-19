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

export interface CalculationAdapterOptions {
  now?: Date;
}

interface MinuteObservation {
  minuteOfDay: number;
  result: FourPillarsDetail;
}

interface UniquePillarCandidate {
  candidateId: string;
  value: PillarFact;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(record)
        .sort()
        .filter((key) => record[key] !== undefined)
        .map((key) => [key, canonicalize(record[key])]),
    );
  }

  return value;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

function calculateIdentity(input: BirthInput, policy: CalculationPolicySnapshot): {
  calculationHash: string;
  snapshotId: string;
} {
  const material = {
    input,
    policy,
    engine: { name: ENGINE_NAME, version: ENGINE_VERSION },
    adapter: { name: ADAPTER_NAME, version: ADAPTER_VERSION },
    schema: { id: SCHEMA_ID, version: SCHEMA_VERSION },
  };
  const calculationHash = createHash('sha256').update(stableStringify(material)).digest('hex');
  return {
    calculationHash,
    snapshotId: `saju_${calculationHash.slice(0, 24)}`,
  };
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

function arrayKey(values: readonly string[]): string {
  return values.join('|');
}

function resolveLongitude(input: BirthInput, policy: CalculationPolicySnapshot): number | undefined {
  const solarPolicy = policy.trueSolarTime;
  if (!solarPolicy.enabled) {
    return undefined;
  }

  switch (solarPolicy.longitudeSource) {
    case 'manual':
      if (solarPolicy.longitude === undefined) {
        throw new RangeError('Manual true-solar-time policy requires an explicit longitude.');
      }
      return solarPolicy.longitude;
    case 'birthplace':
      if (input.birthplace?.longitude === undefined) {
        throw new RangeError('Birthplace true-solar-time policy requires BirthInput.birthplace.longitude.');
      }
      return input.birthplace.longitude;
    case 'default':
      return DEFAULT_KOREA_LONGITUDE;
    case 'not-applicable':
      throw new RangeError('Enabled true-solar-time policy cannot use longitudeSource=not-applicable.');
  }
}

function assertAdapterPolicySupported(input: BirthInput, policy: CalculationPolicySnapshot): void {
  if (policy.timeZonePolicy.timeZone !== SUPPORTED_TIME_ZONE) {
    throw new RangeError(
      `manseryeok adapter v${ADAPTER_VERSION} currently supports ${SUPPORTED_TIME_ZONE} only.`,
    );
  }

  if (
    policy.timeZonePolicy.source === 'birthplace' &&
    input.birthplace?.timeZone !== undefined &&
    input.birthplace.timeZone !== SUPPORTED_TIME_ZONE
  ) {
    throw new RangeError(
      `Birthplace timezone ${input.birthplace.timeZone} is outside the current adapter scope.`,
    );
  }

  resolveLongitude(input, policy);
}

function toManseryeokBirthInfo(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
  hour: number,
  minute: number,
): ManseryeokBirthInfo {
  const longitude = resolveLongitude(input, policy);
  const sex = input.sexForTraditionalCalculation;

  const base: ManseryeokBirthInfo = {
    year: input.date.year,
    month: input.date.month,
    day: input.date.day,
    hour,
    minute,
    isLunar: input.calendarType === 'lunar',
    isLeapMonth: input.calendarType === 'lunar' ? (input.isLeapMonth ?? false) : false,
    dayBoundary: policy.dayBoundary,
  };

  if (sex === 'male' || sex === 'female') {
    base.gender = sex;
  }

  if (policy.trueSolarTime.enabled) {
    base.trueSolarTime = {
      longitude,
      applyEquationOfTime: policy.trueSolarTime.applyEquationOfTime,
      applyHistoricalDst: policy.trueSolarTime.applyHistoricalDst,
    };
  }

  return base;
}

function normalizedSolarDate(input: BirthInput): { year: number; month: number; day: number } {
  if (input.calendarType === 'solar') {
    return { ...input.date };
  }

  return lunarToSolar(
    input.date.year,
    input.date.month,
    input.date.day,
    input.isLeapMonth ?? false,
  );
}

function buildAppliedCorrections(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
): readonly AppliedCorrection[] {
  const corrections: AppliedCorrection[] = [];

  corrections.push({
    type: 'lunar-to-solar',
    applied: input.calendarType === 'lunar',
  });

  corrections.push({
    type: 'longitude',
    applied: policy.trueSolarTime.enabled,
    ...(policy.trueSolarTime.enabled
      ? { details: { longitude: resolveLongitude(input, policy) ?? DEFAULT_KOREA_LONGITUDE } }
      : {}),
  });

  corrections.push({
    type: 'equation-of-time',
    applied: policy.trueSolarTime.enabled && policy.trueSolarTime.applyEquationOfTime,
  });

  corrections.push({
    type: 'historical-dst',
    applied: policy.trueSolarTime.enabled && policy.trueSolarTime.applyHistoricalDst,
  });

  corrections.push({
    type: 'day-boundary',
    applied: policy.dayBoundary !== 'midnight',
    details: { mode: policy.dayBoundary },
  });

  return corrections;
}

function buildNormalizedKnown(
  input: BirthInput & { time: { known: true; hour: number; minute: number } },
  policy: CalculationPolicySnapshot,
): NormalizedBirthInput {
  const solarDate = normalizedSolarDate(input);
  return {
    solarDate: resolved(solarDate),
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
      ? {
          correctedSolarTime: unavailable('upstream-corrected-time-not-exposed'),
        }
      : {}),
    timeZone: policy.timeZonePolicy.timeZone,
    appliedCorrections: buildAppliedCorrections(input, policy),
  };
}

function buildNormalizedUnknown(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
): NormalizedBirthInput {
  const solarDate = normalizedSolarDate(input);
  return {
    solarDate: resolved(solarDate),
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
      ? {
          correctedSolarTime: unavailable(UNKNOWN_TIME_REASON),
        }
      : {}),
    timeZone: policy.timeZonePolicy.timeZone,
    appliedCorrections: buildAppliedCorrections(input, policy),
  };
}

function toTenGodChart(chart: ManseryeokTenGodChart): TenGodChartFact {
  return {
    year: {
      stem: resolved(chart.year.stem),
      branch: resolved(chart.year.branch),
    },
    month: {
      stem: resolved(chart.month.stem),
      branch: resolved(chart.month.branch),
    },
    day: {
      stem: resolved(chart.day.stem),
      branch: resolved(chart.day.branch),
    },
    hour: {
      stem: resolved(chart.hour.stem),
      branch: resolved(chart.hour.branch),
    },
  };
}

function fiveElementCounts(result: FourPillarsDetail): Readonly<Record<FiveElement, number>> {
  const counts: Record<FiveElement, number> = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  for (const pillar of [result.year, result.month, result.day, result.hour]) {
    counts[getHeavenlyStemElement(pillar.heavenlyStem)] += 1;
    counts[getEarthlyBranchElement(pillar.earthlyBranch)] += 1;
  }
  return counts;
}

function mapLuckCycle(result: FourPillarsDetail, input: BirthInput): FactState<LuckCycleFact> {
  if (
    input.sexForTraditionalCalculation !== 'male' &&
    input.sexForTraditionalCalculation !== 'female'
  ) {
    return unavailable('traditional-sex-not-provided');
  }

  if (result.luckPillars === undefined) {
    return unavailable('engine-output-missing');
  }

  return resolved({
    direction: result.luckPillars.forward ? 'forward' : 'backward',
    start: {
      age: result.luckPillars.startAge,
      years: result.luckPillars.startYears,
      months: result.luckPillars.startMonths,
      days: result.luckPillars.startDays,
    },
    pillars: result.luckPillars.pillars.map((luck) => ({
      age: luck.age,
      pillar: toPillarFact(luck.pillar),
    })),
  });
}

function buildProvenance(policy: CalculationPolicySnapshot): CanonicalSajuSnapshot['provenance'] {
  return {
    engine: {
      name: ENGINE_NAME,
      version: ENGINE_VERSION,
      sourceRepository: ENGINE_REPOSITORY,
    },
    adapter: {
      name: ADAPTER_NAME,
      version: ADAPTER_VERSION,
    },
    policy: {
      id: policy.policyId,
      version: policy.policyVersion,
    },
    schema: {
      id: SCHEMA_ID,
      version: SCHEMA_VERSION,
    },
  };
}

function knownCompleteness(luckCycle: FactState<LuckCycleFact>): Completeness {
  const resolvedPaths = [
    'pillars.year',
    'pillars.month',
    'pillars.day',
    'pillars.hour',
    'derivedFacts.dayMaster',
    'derivedFacts.tenGods',
    'derivedFacts.voidBranches',
    'derivedFacts.fiveElementCounts',
  ];
  const unavailablePaths: string[] = [];

  if (luckCycle.status === 'resolved') {
    resolvedPaths.push('luckCycle');
  } else {
    unavailablePaths.push('luckCycle');
  }

  return {
    birthTimeKnown: true,
    fullyResolved: unavailablePaths.length === 0,
    resolvedPaths,
    ambiguousPaths: [],
    unavailablePaths,
  };
}

function calculateKnown(
  input: BirthInput & { time: { known: true; hour: number; minute: number } },
  policy: CalculationPolicySnapshot,
  options: CalculationAdapterOptions,
): CanonicalSajuSnapshot {
  const { calculationHash, snapshotId } = calculateIdentity(input, policy);
  const result = calculateFourPillars(
    toManseryeokBirthInfo(input, policy, input.time.hour, input.time.minute),
  );
  const luckCycle = mapLuckCycle(result, input);

  const pillars: FourPillarsFact = {
    year: resolved(toPillarFact(result.year)),
    month: resolved(toPillarFact(result.month)),
    day: resolved(toPillarFact(result.day)),
    hour: resolved(toPillarFact(result.hour)),
  };

  const derivedFacts: DerivedFacts = {
    dayMaster: resolved(toStemFact(result.day.heavenlyStem)),
    tenGods: resolved(toTenGodChart(result.tenGods)),
    voidBranches: resolved([...result.voidBranches]),
    fiveElementCounts: resolved(fiveElementCounts(result)),
  };

  return {
    snapshotId,
    schemaVersion: SCHEMA_VERSION,
    calculationHash,
    createdAt: (options.now ?? new Date()).toISOString(),
    input,
    policy,
    normalized: buildNormalizedKnown(input, policy),
    pillars,
    derivedFacts,
    luckCycle,
    scenarios: [],
    completeness: knownCompleteness(luckCycle),
    provenance: buildProvenance(policy),
  };
}

function uniquePillarCandidates(
  observations: readonly MinuteObservation[],
  selector: (result: FourPillarsDetail) => ManseryeokPillar,
  path: string,
): readonly UniquePillarCandidate[] {
  const map = new Map<string, UniquePillarCandidate>();
  for (const observation of observations) {
    const value = toPillarFact(selector(observation.result));
    const key = pillarKey(value);
    if (!map.has(key)) {
      map.set(key, {
        candidateId: `${path}:${key}`,
        value,
      });
    }
  }
  return [...map.values()];
}

function pillarFactState(candidates: readonly UniquePillarCandidate[]): FactState<PillarFact> {
  if (candidates.length === 1) {
    return resolved(candidates[0].value);
  }

  const factCandidates: FactCandidate<PillarFact>[] = candidates.map((candidate) => ({
    candidateId: candidate.candidateId,
    value: candidate.value,
    reasonRefs: [UNKNOWN_TIME_AMBIGUITY_REASON],
  }));
  return ambiguous(factCandidates, [UNKNOWN_TIME_AMBIGUITY_REASON]);
}

function deriveDayMaster(day: FactState<PillarFact>): FactState<StemFact> {
  if (day.status === 'unavailable') {
    return unavailable(day.reasonCode);
  }
  if (day.status === 'resolved') {
    return resolved(day.value.stem);
  }

  const unique = new Map<HeavenlyStem, StemFact>();
  for (const candidate of day.candidates) {
    unique.set(candidate.value.stem.value, candidate.value.stem);
  }
  const stems = [...unique.values()];
  if (stems.length === 1) {
    return resolved(stems[0]);
  }

  return ambiguous(
    stems.map((stem) => ({
      candidateId: `day-master:${stem.value}`,
      value: stem,
      reasonRefs: [UNKNOWN_TIME_AMBIGUITY_REASON],
    })),
    [UNKNOWN_TIME_AMBIGUITY_REASON],
  );
}

function voidBranchesFromObservations(
  observations: readonly MinuteObservation[],
): FactState<readonly EarthlyBranch[]> {
  const unique = new Map<string, readonly EarthlyBranch[]>();
  for (const observation of observations) {
    const value = [...observation.result.voidBranches] as readonly EarthlyBranch[];
    unique.set(arrayKey(value), value);
  }

  const values = [...unique.values()];
  if (values.length === 1) {
    return resolved(values[0]);
  }

  return ambiguous(
    values.map((value) => ({
      candidateId: `void-branches:${arrayKey(value)}`,
      value,
      reasonRefs: [UNKNOWN_TIME_AMBIGUITY_REASON],
    })),
    [UNKNOWN_TIME_AMBIGUITY_REASON],
  );
}

function candidateIdForState(state: FactState<PillarFact>, value: PillarFact): string | undefined {
  if (state.status !== 'ambiguous') {
    return undefined;
  }
  return state.candidates.find((candidate) => pillarKey(candidate.value) === pillarKey(value))?.candidateId;
}

function buildScenarios(
  snapshotId: string,
  observations: readonly MinuteObservation[],
  pillars: Pick<FourPillarsFact, 'year' | 'month' | 'day'>,
): readonly CalculationScenario[] {
  if (
    pillars.year.status !== 'ambiguous' &&
    pillars.month.status !== 'ambiguous' &&
    pillars.day.status !== 'ambiguous'
  ) {
    return [];
  }

  const combinations = new Map<
    string,
    { year: PillarFact; month: PillarFact; day: PillarFact; firstMinute: number }
  >();

  for (const observation of observations) {
    const year = toPillarFact(observation.result.year);
    const month = toPillarFact(observation.result.month);
    const day = toPillarFact(observation.result.day);
    const key = `${pillarKey(year)}|${pillarKey(month)}|${pillarKey(day)}`;
    if (!combinations.has(key)) {
      combinations.set(key, { year, month, day, firstMinute: observation.minuteOfDay });
    }
  }

  return [...combinations.values()].map((combination, index) => {
    const overrides: CalculationScenario['factOverrides'][number][] = [];

    for (const [path, state, value] of [
      ['pillars.year', pillars.year, combination.year],
      ['pillars.month', pillars.month, combination.month],
      ['pillars.day', pillars.day, combination.day],
    ] as const) {
      const candidateId = candidateIdForState(state, value);
      if (candidateId !== undefined) {
        overrides.push({ path, candidateId, value });
      }
    }

    return {
      scenarioId: `${snapshotId}:unknown-time:${index + 1}`,
      snapshotId,
      factOverrides: overrides,
      reasonRefs: [
        UNKNOWN_TIME_AMBIGUITY_REASON,
        `first-observed-minute:${combination.firstMinute}`,
      ],
    };
  });
}

function unknownCompleteness(
  pillars: FourPillarsFact,
  derivedFacts: DerivedFacts,
): Completeness {
  const resolvedPaths: string[] = [];
  const ambiguousPaths: string[] = [];
  const unavailablePaths: string[] = ['pillars.hour', 'luckCycle'];

  const inspect = (path: string, state: FactState<unknown>): void => {
    if (state.status === 'resolved') resolvedPaths.push(path);
    if (state.status === 'ambiguous') ambiguousPaths.push(path);
    if (state.status === 'unavailable') unavailablePaths.push(path);
  };

  inspect('pillars.year', pillars.year);
  inspect('pillars.month', pillars.month);
  inspect('pillars.day', pillars.day);
  inspect('derivedFacts.dayMaster', derivedFacts.dayMaster);
  inspect('derivedFacts.tenGods', derivedFacts.tenGods);
  inspect('derivedFacts.voidBranches', derivedFacts.voidBranches);
  if (derivedFacts.fiveElementCounts !== undefined) {
    inspect('derivedFacts.fiveElementCounts', derivedFacts.fiveElementCounts);
  }

  return {
    birthTimeKnown: false,
    fullyResolved: false,
    resolvedPaths,
    ambiguousPaths,
    unavailablePaths: [...new Set(unavailablePaths)],
  };
}

function enumerateUnknownTime(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
): readonly MinuteObservation[] {
  const observations: MinuteObservation[] = [];
  for (let minuteOfDay = 0; minuteOfDay < 24 * 60; minuteOfDay += 1) {
    const hour = Math.floor(minuteOfDay / 60);
    const minute = minuteOfDay % 60;
    observations.push({
      minuteOfDay,
      result: calculateFourPillars(toManseryeokBirthInfo(input, policy, hour, minute)),
    });
  }
  return observations;
}

function calculateUnknown(
  input: BirthInput,
  policy: CalculationPolicySnapshot,
  options: CalculationAdapterOptions,
): CanonicalSajuSnapshot {
  const { calculationHash, snapshotId } = calculateIdentity(input, policy);
  const observations = enumerateUnknownTime(input, policy);

  const year = pillarFactState(uniquePillarCandidates(observations, (result) => result.year, 'year'));
  const month = pillarFactState(
    uniquePillarCandidates(observations, (result) => result.month, 'month'),
  );
  const day = pillarFactState(uniquePillarCandidates(observations, (result) => result.day, 'day'));

  const pillars: FourPillarsFact = {
    year,
    month,
    day,
    hour: unavailable(UNKNOWN_TIME_REASON),
  };

  const derivedFacts: DerivedFacts = {
    dayMaster: deriveDayMaster(day),
    tenGods: unavailable(UNKNOWN_TIME_REASON),
    voidBranches: voidBranchesFromObservations(observations),
    fiveElementCounts: unavailable(UNKNOWN_TIME_REASON),
  };

  return {
    snapshotId,
    schemaVersion: SCHEMA_VERSION,
    calculationHash,
    createdAt: (options.now ?? new Date()).toISOString(),
    input,
    policy,
    normalized: buildNormalizedUnknown(input, policy),
    pillars,
    derivedFacts,
    luckCycle: unavailable(UNKNOWN_TIME_REASON),
    scenarios: buildScenarios(snapshotId, observations, { year, month, day }),
    completeness: unknownCompleteness(pillars, derivedFacts),
    provenance: buildProvenance(policy),
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

  if (inputValue.time.known) {
    return calculateKnown(inputValue as BirthInput & { time: { known: true; hour: number; minute: number } }, policyValue, options);
  }

  return calculateUnknown(inputValue, policyValue, options);
}

export const manseryeokAdapterMetadata = Object.freeze({
  engineName: ENGINE_NAME,
  engineVersion: ENGINE_VERSION,
  adapterName: ADAPTER_NAME,
  adapterVersion: ADAPTER_VERSION,
  schemaVersion: SCHEMA_VERSION,
  supportedTimeZone: SUPPORTED_TIME_ZONE,
});
