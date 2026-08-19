import type { FactState } from './common.js';

export type CalendarType = 'solar' | 'lunar';
export type SexForTraditionalCalculation = 'male' | 'female' | 'unspecified';
export type DayBoundary = 'midnight' | 'jasi' | 'splitJasi';
export type FiveElement = '목' | '화' | '토' | '금' | '수';
export type YinYang = '양' | '음';

export type HeavenlyStem = '갑' | '을' | '병' | '정' | '무' | '기' | '경' | '신' | '임' | '계';
export type EarthlyBranch =
  | '자'
  | '축'
  | '인'
  | '묘'
  | '진'
  | '사'
  | '오'
  | '미'
  | '신'
  | '유'
  | '술'
  | '해';

export type TenGod =
  | '비견'
  | '겁재'
  | '식신'
  | '상관'
  | '편재'
  | '정재'
  | '편관'
  | '정관'
  | '편인'
  | '정인';

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

export type BirthTime =
  | {
      known: true;
      hour: number;
      minute: number;
    }
  | {
      known: false;
    };

export interface Birthplace {
  label?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
  timeZone?: string;
}

export interface BirthInput {
  calendarType: CalendarType;
  date: CalendarDate;
  time: BirthTime;
  isLeapMonth?: boolean;
  sexForTraditionalCalculation?: SexForTraditionalCalculation;
  birthplace?: Birthplace;
}

export interface TrueSolarTimePolicy {
  enabled: boolean;
  longitudeSource: 'birthplace' | 'manual' | 'default' | 'not-applicable';
  longitude?: number;
  applyEquationOfTime: boolean;
  applyHistoricalDst: boolean;
}

export interface TimeZonePolicy {
  source: 'birthplace' | 'manual' | 'service-default';
  timeZone: string;
}

export interface CalculationPolicySnapshot {
  policyId: string;
  policyVersion: string;
  dayBoundary: DayBoundary;
  trueSolarTime: TrueSolarTimePolicy;
  timeZonePolicy: TimeZonePolicy;
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries';
}

export interface ClockTime {
  hour: number;
  minute: number;
}

export interface LunarDate extends CalendarDate {
  isLeapMonth: boolean;
}

export interface CorrectedSolarTime {
  localDate: string;
  localTime: string;
  offsetMinutesFromInput: number;
}

export type AppliedCorrectionType =
  | 'lunar-to-solar'
  | 'longitude'
  | 'equation-of-time'
  | 'historical-standard-time'
  | 'historical-dst'
  | 'day-boundary';

export interface AppliedCorrection {
  type: AppliedCorrectionType;
  applied: boolean;
  details?: Readonly<Record<string, string | number | boolean>>;
}

export interface NormalizedBirthInput {
  solarDate: FactState<CalendarDate>;
  lunarDate?: FactState<LunarDate>;
  clockTime: FactState<ClockTime>;
  correctedSolarTime?: FactState<CorrectedSolarTime>;
  timeZone: string;
  appliedCorrections: readonly AppliedCorrection[];
}

export interface StemFact {
  value: HeavenlyStem;
  hanja: string;
  element: FiveElement;
  yinYang: YinYang;
}

export interface BranchFact {
  value: EarthlyBranch;
  hanja: string;
  element: FiveElement;
  yinYang: YinYang;
}

export interface PillarFact {
  stem: StemFact;
  branch: BranchFact;
}

export interface FourPillarsFact {
  year: FactState<PillarFact>;
  month: FactState<PillarFact>;
  day: FactState<PillarFact>;
  hour: FactState<PillarFact>;
}

export interface TenGodTargetFact {
  stem?: FactState<TenGod | '일간'>;
  branch?: FactState<TenGod>;
}

export interface TenGodChartFact {
  year: TenGodTargetFact;
  month: TenGodTargetFact;
  day: TenGodTargetFact;
  hour: TenGodTargetFact;
}

export interface DerivedFacts {
  dayMaster: FactState<StemFact>;
  tenGods: FactState<TenGodChartFact>;
  voidBranches: FactState<readonly EarthlyBranch[]>;
  fiveElementCounts?: FactState<Readonly<Record<FiveElement, number>>>;
}

export interface SolarTermFact {
  name: string;
  index: number;
  instantUtc: string;
  localDateTime: string;
}

export interface SolarTermContext {
  previous?: SolarTermFact;
  next?: SolarTermFact;
  lichun?: SolarTermFact;
  boundariesOnBirthDate?: readonly SolarTermFact[];
}

export interface LuckPillarFact {
  age: number;
  pillar: PillarFact;
}

export interface LuckCycleFact {
  direction: 'forward' | 'backward';
  start: {
    age: number;
    years?: number;
    months?: number;
    days?: number;
  };
  pillars: readonly LuckPillarFact[];
}

export interface Completeness {
  birthTimeKnown: boolean;
  fullyResolved: boolean;
  resolvedPaths: readonly string[];
  ambiguousPaths: readonly string[];
  unavailablePaths: readonly string[];
}

export interface DatasetReference {
  name: string;
  version?: string;
  source?: string;
  notes?: string;
}

export interface CalculationProvenance {
  engine: {
    name: string;
    version: string;
    sourceRepository?: string;
  };
  adapter: {
    name: string;
    version: string;
  };
  policy: {
    id: string;
    version: string;
  };
  schema: {
    id: string;
    version: string;
  };
  datasets?: readonly DatasetReference[];
}

export interface CalculationScenario {
  scenarioId: string;
  snapshotId: string;
  factOverrides: readonly {
    path: string;
    candidateId: string;
    value: unknown;
  }[];
  reasonRefs: readonly string[];
}

export interface CanonicalSajuSnapshot {
  snapshotId: string;
  schemaVersion: string;
  calculationHash: string;
  createdAt: string;
  input: BirthInput;
  policy: CalculationPolicySnapshot;
  normalized: NormalizedBirthInput;
  pillars: FourPillarsFact;
  derivedFacts: DerivedFacts;
  solarTermContext?: SolarTermContext;
  luckCycle: FactState<LuckCycleFact>;
  scenarios: readonly CalculationScenario[];
  completeness: Completeness;
  provenance: CalculationProvenance;
}
