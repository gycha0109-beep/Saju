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

export type PillarSlot = 'year' | 'month' | 'day' | 'hour';
export type PillarPairKey =
  | 'year_month'
  | 'year_day'
  | 'year_hour'
  | 'month_day'
  | 'month_hour'
  | 'day_hour';
export type StructuralRelationKind =
  | 'stem_five_combination'
  | 'branch_six_combination'
  | 'branch_clash'
  | 'branch_three_combination';

export interface StructuralRelationParticipant {
  pillar: PillarSlot;
  component: 'stem' | 'branch';
  value: HeavenlyStem | EarthlyBranch;
}

export interface StructuralRelationCandidate {
  relationId: string;
  kind: StructuralRelationKind;
  participants: readonly StructuralRelationParticipant[];
  sourceIds: readonly string[];
  semantics: {
    structuralMatchOnly: true;
    transformationEstablished: false;
  };
}

export interface BranchClashContextParticipant {
  pillar: PillarSlot;
  branch: EarthlyBranch;
  hiddenStems: readonly HeavenlyStem[];
}

export interface BranchClashContextFact {
  relationId: string;
  kind: 'branch_clash';
  pairKey: PillarPairKey;
  participants: readonly [BranchClashContextParticipant, BranchClashContextParticipant];
  sourceIds: readonly string[];
  sourceFactRefs: readonly string[];
  semantics: {
    structuralMatchOnly: true;
    transformationEstablished: false;
  };
}

export type BranchClashContextIndex = Readonly<
  Partial<Record<PillarPairKey, BranchClashContextFact>>
>;

export interface BranchClashHiddenStemObservation {
  stem: HeavenlyStem;
  visibleExactStemPositions: readonly PillarSlot[];
  hiddenOccurrenceBranchPositions: readonly PillarSlot[];
}

export interface BranchClashQualifierObservationParticipant {
  pillar: PillarSlot;
  branch: EarthlyBranch;
  hiddenStemObservations: readonly BranchClashHiddenStemObservation[];
}

export interface BranchClashQualifierObservationFact {
  relationId: string;
  pairKey: PillarPairKey;
  interveningPillars: readonly PillarSlot[];
  participants: readonly [
    BranchClashQualifierObservationParticipant,
    BranchClashQualifierObservationParticipant,
  ];
  sourceFactRefs: readonly string[];
  semantics: {
    observationOnly: true;
    visibilityEffectEstablished: false;
    separationEffectEstablished: false;
    pluralityEffectEstablished: false;
    numericWeightAssigned: false;
  };
}

export type BranchClashQualifierObservationIndex = Readonly<
  Partial<Record<PillarPairKey, BranchClashQualifierObservationFact>>
>;

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

export interface HiddenStemChartFact {
  year: FactState<readonly HeavenlyStem[]>;
  month: FactState<readonly HeavenlyStem[]>;
  day: FactState<readonly HeavenlyStem[]>;
  hour: FactState<readonly HeavenlyStem[]>;
}

export interface DerivedFacts {
  dayMaster: FactState<StemFact>;
  tenGods: FactState<TenGodChartFact>;
  voidBranches: FactState<readonly EarthlyBranch[]>;
  hiddenStems?: HiddenStemChartFact;
  fiveElementCounts?: FactState<Readonly<Record<FiveElement, number>>>;
  structuralRelations?: FactState<readonly StructuralRelationCandidate[]>;
  branchClashContexts?: FactState<BranchClashContextIndex>;
  branchClashQualifierObservations?: FactState<BranchClashQualifierObservationIndex>;
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
