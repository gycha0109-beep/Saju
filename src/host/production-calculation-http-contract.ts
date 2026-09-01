import type { FactState } from '../contracts/common.js';
import type {
  AppliedCorrection,
  BirthInput,
  Birthplace,
  BranchClashContextFact,
  BranchClashContextIndex,
  BranchClashHiddenStemObservation,
  BranchClashQualifierObservationFact,
  BranchClashQualifierObservationIndex,
  BranchClashQualifierObservationParticipant,
  BranchFact,
  CalendarDate,
  CalculationPolicySnapshot,
  CalculationProvenance,
  CanonicalSajuSnapshot,
  ClockTime,
  Completeness,
  CorrectedSolarTime,
  DatasetReference,
  DerivedFacts,
  FiveElement,
  FourPillarsFact,
  HeavenlyStem,
  HiddenStemChartFact,
  LuckCycleFact,
  LuckPillarFact,
  LunarDate,
  NormalizedBirthInput,
  PillarFact,
  PillarPairKey,
  SolarTermContext,
  SolarTermFact,
  StemFact,
  StructuralRelationCandidate,
  StructuralRelationParticipant,
  TenGod,
  TenGodChartFact,
  TenGodTargetFact,
  TimeZonePolicy,
  TrueSolarTimePolicy,
} from '../contracts/calculation.js';
import type { AuthorizedProductionCalculationPolicySummary } from '../production/production-calculation-authority.js';
import type { AuthorizedMyeonghwaProductionCalculationResult } from '../production/production-calculation-runtime.js';

export const PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION =
  'myeonghwa-production-calculation-http-v1' as const;

export type ProductionCalculationHttpFactStateV1<T> =
  | { readonly status: 'resolved'; readonly value: T }
  | {
      readonly status: 'ambiguous';
      readonly candidates: readonly {
        readonly candidateId: string;
        readonly value: T;
        readonly reasonRefs: readonly string[];
      }[];
      readonly reasonCodes: readonly string[];
    }
  | { readonly status: 'unavailable'; readonly reasonCode: string };

function projectFactState<T, U>(
  fact: FactState<T>,
  projectValue: (value: T) => U,
): ProductionCalculationHttpFactStateV1<U> {
  switch (fact.status) {
    case 'resolved':
      return { status: 'resolved', value: projectValue(fact.value) };
    case 'ambiguous':
      return {
        status: 'ambiguous',
        candidates: fact.candidates.map((candidate) => ({
          candidateId: candidate.candidateId,
          value: projectValue(candidate.value),
          reasonRefs: [...candidate.reasonRefs],
        })),
        reasonCodes: [...fact.reasonCodes],
      };
    case 'unavailable':
      return { status: 'unavailable', reasonCode: fact.reasonCode };
  }
}

function projectCalendarDate(value: CalendarDate) {
  return { year: value.year, month: value.month, day: value.day };
}

function projectBirthplace(value: Birthplace) {
  return {
    ...(value.label === undefined ? {} : { label: value.label }),
    ...(value.countryCode === undefined ? {} : { countryCode: value.countryCode }),
    ...(value.latitude === undefined ? {} : { latitude: value.latitude }),
    ...(value.longitude === undefined ? {} : { longitude: value.longitude }),
    ...(value.timeZone === undefined ? {} : { timeZone: value.timeZone }),
  };
}

function projectBirthInput(value: BirthInput) {
  return {
    calendarType: value.calendarType,
    date: projectCalendarDate(value.date),
    time: value.time.known
      ? { known: true as const, hour: value.time.hour, minute: value.time.minute }
      : { known: false as const },
    ...(value.isLeapMonth === undefined ? {} : { isLeapMonth: value.isLeapMonth }),
    ...(value.sexForTraditionalCalculation === undefined
      ? {}
      : { sexForTraditionalCalculation: value.sexForTraditionalCalculation }),
    ...(value.birthplace === undefined ? {} : { birthplace: projectBirthplace(value.birthplace) }),
  };
}

function projectTrueSolarTimePolicy(value: TrueSolarTimePolicy) {
  return {
    enabled: value.enabled,
    longitudeSource: value.longitudeSource,
    ...(value.longitude === undefined ? {} : { longitude: value.longitude }),
    applyEquationOfTime: value.applyEquationOfTime,
    applyHistoricalDst: value.applyHistoricalDst,
  };
}

function projectTimeZonePolicy(value: TimeZonePolicy) {
  return { source: value.source, timeZone: value.timeZone };
}

function projectCalculationPolicy(value: CalculationPolicySnapshot) {
  return {
    policyId: value.policyId,
    policyVersion: value.policyVersion,
    dayBoundary: value.dayBoundary,
    trueSolarTime: projectTrueSolarTimePolicy(value.trueSolarTime),
    timeZonePolicy: projectTimeZonePolicy(value.timeZonePolicy),
    unknownBirthTimePolicy: value.unknownBirthTimePolicy,
  };
}

function projectClockTime(value: ClockTime) {
  return { hour: value.hour, minute: value.minute };
}

function projectLunarDate(value: LunarDate) {
  return { ...projectCalendarDate(value), isLeapMonth: value.isLeapMonth };
}

function projectCorrectedSolarTime(value: CorrectedSolarTime) {
  return {
    localDate: value.localDate,
    localTime: value.localTime,
    offsetMinutesFromInput: value.offsetMinutesFromInput,
  };
}

function projectAppliedCorrection(value: AppliedCorrection) {
  return { type: value.type, applied: value.applied };
}

function projectNormalizedBirthInput(value: NormalizedBirthInput) {
  return {
    solarDate: projectFactState(value.solarDate, projectCalendarDate),
    ...(value.lunarDate === undefined
      ? {}
      : { lunarDate: projectFactState(value.lunarDate, projectLunarDate) }),
    clockTime: projectFactState(value.clockTime, projectClockTime),
    ...(value.correctedSolarTime === undefined
      ? {}
      : {
          correctedSolarTime: projectFactState(
            value.correctedSolarTime,
            projectCorrectedSolarTime,
          ),
        }),
    timeZone: value.timeZone,
    appliedCorrections: value.appliedCorrections.map(projectAppliedCorrection),
  };
}

function projectStemFact(value: StemFact) {
  return {
    value: value.value,
    hanja: value.hanja,
    element: value.element,
    yinYang: value.yinYang,
  };
}

function projectBranchFact(value: BranchFact) {
  return {
    value: value.value,
    hanja: value.hanja,
    element: value.element,
    yinYang: value.yinYang,
  };
}

function projectPillarFact(value: PillarFact) {
  return { stem: projectStemFact(value.stem), branch: projectBranchFact(value.branch) };
}

function projectFourPillars(value: FourPillarsFact) {
  return {
    year: projectFactState(value.year, projectPillarFact),
    month: projectFactState(value.month, projectPillarFact),
    day: projectFactState(value.day, projectPillarFact),
    hour: projectFactState(value.hour, projectPillarFact),
  };
}

function projectTenGodTarget(value: TenGodTargetFact) {
  return {
    ...(value.stem === undefined
      ? {}
      : { stem: projectFactState<TenGod | '일간', TenGod | '일간'>(value.stem, (item) => item) }),
    ...(value.branch === undefined
      ? {}
      : { branch: projectFactState<TenGod, TenGod>(value.branch, (item) => item) }),
  };
}

function projectTenGodChart(value: TenGodChartFact) {
  return {
    year: projectTenGodTarget(value.year),
    month: projectTenGodTarget(value.month),
    day: projectTenGodTarget(value.day),
    hour: projectTenGodTarget(value.hour),
  };
}

function projectHiddenStemChart(value: HiddenStemChartFact) {
  const projectStems = (stems: readonly HeavenlyStem[]) => [...stems];
  return {
    year: projectFactState(value.year, projectStems),
    month: projectFactState(value.month, projectStems),
    day: projectFactState(value.day, projectStems),
    hour: projectFactState(value.hour, projectStems),
  };
}

function projectFiveElementCounts(value: Readonly<Record<FiveElement, number>>) {
  return { 목: value.목, 화: value.화, 토: value.토, 금: value.금, 수: value.수 };
}

function projectStructuralRelationParticipant(value: StructuralRelationParticipant) {
  return { pillar: value.pillar, component: value.component, value: value.value };
}

function projectStructuralRelationCandidate(value: StructuralRelationCandidate) {
  return {
    relationId: value.relationId,
    kind: value.kind,
    participants: value.participants.map(projectStructuralRelationParticipant),
    sourceIds: [...value.sourceIds],
    semantics: {
      structuralMatchOnly: value.semantics.structuralMatchOnly,
      transformationEstablished: value.semantics.transformationEstablished,
    },
  };
}

function projectBranchClashHiddenStemObservation(value: BranchClashHiddenStemObservation) {
  return {
    stem: value.stem,
    visibleExactStemPositions: [...value.visibleExactStemPositions],
    hiddenOccurrenceBranchPositions: [...value.hiddenOccurrenceBranchPositions],
  };
}

function projectBranchClashContext(value: BranchClashContextFact) {
  const projectParticipant = (participant: BranchClashContextFact['participants'][number]) => ({
    pillar: participant.pillar,
    branch: participant.branch,
    hiddenStems: [...participant.hiddenStems],
  });
  return {
    relationId: value.relationId,
    kind: value.kind,
    pairKey: value.pairKey,
    participants: [projectParticipant(value.participants[0]), projectParticipant(value.participants[1])] as const,
    sourceIds: [...value.sourceIds],
    sourceFactRefs: [...value.sourceFactRefs],
    semantics: {
      structuralMatchOnly: value.semantics.structuralMatchOnly,
      transformationEstablished: value.semantics.transformationEstablished,
    },
  };
}

function projectBranchClashQualifierParticipant(
  value: BranchClashQualifierObservationParticipant,
) {
  return {
    pillar: value.pillar,
    branch: value.branch,
    hiddenStemObservations: value.hiddenStemObservations.map(
      projectBranchClashHiddenStemObservation,
    ),
  };
}

function projectBranchClashQualifierObservation(value: BranchClashQualifierObservationFact) {
  return {
    relationId: value.relationId,
    pairKey: value.pairKey,
    interveningPillars: [...value.interveningPillars],
    participants: [
      projectBranchClashQualifierParticipant(value.participants[0]),
      projectBranchClashQualifierParticipant(value.participants[1]),
    ] as const,
    sourceFactRefs: [...value.sourceFactRefs],
    semantics: {
      observationOnly: value.semantics.observationOnly,
      visibilityEffectEstablished: value.semantics.visibilityEffectEstablished,
      separationEffectEstablished: value.semantics.separationEffectEstablished,
      pluralityEffectEstablished: value.semantics.pluralityEffectEstablished,
      numericWeightAssigned: value.semantics.numericWeightAssigned,
    },
  };
}

const PILLAR_PAIR_KEYS = [
  'year_month',
  'year_day',
  'year_hour',
  'month_day',
  'month_hour',
  'day_hour',
] as const satisfies readonly PillarPairKey[];

function projectPairIndex<T, U>(
  value: Readonly<Partial<Record<PillarPairKey, T>>>,
  projectValue: (item: T) => U,
): Readonly<Partial<Record<PillarPairKey, U>>> {
  const projected: Partial<Record<PillarPairKey, U>> = {};
  for (const pairKey of PILLAR_PAIR_KEYS) {
    const item = value[pairKey];
    if (item !== undefined) projected[pairKey] = projectValue(item);
  }
  return projected;
}

function projectBranchClashContextIndex(value: BranchClashContextIndex) {
  return projectPairIndex(value, projectBranchClashContext);
}

function projectBranchClashQualifierObservationIndex(
  value: BranchClashQualifierObservationIndex,
) {
  return projectPairIndex(value, projectBranchClashQualifierObservation);
}

function projectDerivedFacts(value: DerivedFacts) {
  return {
    dayMaster: projectFactState(value.dayMaster, projectStemFact),
    tenGods: projectFactState(value.tenGods, projectTenGodChart),
    voidBranches: projectFactState(value.voidBranches, (branches) => [...branches]),
    ...(value.hiddenStems === undefined ? {} : { hiddenStems: projectHiddenStemChart(value.hiddenStems) }),
    ...(value.fiveElementCounts === undefined
      ? {}
      : { fiveElementCounts: projectFactState(value.fiveElementCounts, projectFiveElementCounts) }),
    ...(value.structuralRelations === undefined
      ? {}
      : {
          structuralRelations: projectFactState(value.structuralRelations, (relations) =>
            relations.map(projectStructuralRelationCandidate),
          ),
        }),
    ...(value.branchClashContexts === undefined
      ? {}
      : {
          branchClashContexts: projectFactState(
            value.branchClashContexts,
            projectBranchClashContextIndex,
          ),
        }),
    ...(value.branchClashQualifierObservations === undefined
      ? {}
      : {
          branchClashQualifierObservations: projectFactState(
            value.branchClashQualifierObservations,
            projectBranchClashQualifierObservationIndex,
          ),
        }),
  };
}

function projectSolarTerm(value: SolarTermFact) {
  return {
    name: value.name,
    index: value.index,
    instantUtc: value.instantUtc,
    localDateTime: value.localDateTime,
  };
}

function projectSolarTermContext(value: SolarTermContext) {
  return {
    ...(value.previous === undefined ? {} : { previous: projectSolarTerm(value.previous) }),
    ...(value.next === undefined ? {} : { next: projectSolarTerm(value.next) }),
    ...(value.lichun === undefined ? {} : { lichun: projectSolarTerm(value.lichun) }),
    ...(value.boundariesOnBirthDate === undefined
      ? {}
      : { boundariesOnBirthDate: value.boundariesOnBirthDate.map(projectSolarTerm) }),
  };
}

function projectLuckPillar(value: LuckPillarFact) {
  return { age: value.age, pillar: projectPillarFact(value.pillar) };
}

function projectLuckCycle(value: LuckCycleFact) {
  return {
    direction: value.direction,
    start: {
      age: value.start.age,
      ...(value.start.years === undefined ? {} : { years: value.start.years }),
      ...(value.start.months === undefined ? {} : { months: value.start.months }),
      ...(value.start.days === undefined ? {} : { days: value.start.days }),
    },
    pillars: value.pillars.map(projectLuckPillar),
  };
}

function projectCompleteness(value: Completeness) {
  return {
    birthTimeKnown: value.birthTimeKnown,
    fullyResolved: value.fullyResolved,
    resolvedPaths: [...value.resolvedPaths],
    ambiguousPaths: [...value.ambiguousPaths],
    unavailablePaths: [...value.unavailablePaths],
  };
}

function projectDatasetReference(value: DatasetReference) {
  return {
    name: value.name,
    ...(value.version === undefined ? {} : { version: value.version }),
    ...(value.source === undefined ? {} : { source: value.source }),
    ...(value.notes === undefined ? {} : { notes: value.notes }),
  };
}

function projectCalculationProvenance(value: CalculationProvenance) {
  return {
    engine: {
      name: value.engine.name,
      version: value.engine.version,
      ...(value.engine.sourceRepository === undefined
        ? {}
        : { sourceRepository: value.engine.sourceRepository }),
    },
    adapter: { name: value.adapter.name, version: value.adapter.version },
    policy: { id: value.policy.id, version: value.policy.version },
    schema: { id: value.schema.id, version: value.schema.version },
    ...(value.datasets === undefined
      ? {}
      : { datasets: value.datasets.map(projectDatasetReference) }),
  };
}

function projectCanonicalSnapshot(value: CanonicalSajuSnapshot) {
  return {
    snapshotId: value.snapshotId,
    schemaVersion: value.schemaVersion,
    calculationHash: value.calculationHash,
    createdAt: value.createdAt,
    input: projectBirthInput(value.input),
    policy: projectCalculationPolicy(value.policy),
    normalized: projectNormalizedBirthInput(value.normalized),
    pillars: projectFourPillars(value.pillars),
    derivedFacts: projectDerivedFacts(value.derivedFacts),
    ...(value.solarTermContext === undefined
      ? {}
      : { solarTermContext: projectSolarTermContext(value.solarTermContext) }),
    luckCycle: projectFactState(value.luckCycle, projectLuckCycle),
    completeness: projectCompleteness(value.completeness),
    provenance: projectCalculationProvenance(value.provenance),
  };
}

function projectAuthority(value: AuthorizedProductionCalculationPolicySummary) {
  return {
    calculationPolicyId: value.calculationPolicyId,
    authorizationId: value.authorizationId,
    authorityRecordRef: value.authorityRecordRef,
    policyVersion: value.policyVersion,
    contentHash: value.contentHash,
  };
}

/**
 * Public V1 serializer for POST /api/calculations.
 *
 * Every object crossing this boundary is rebuilt from an explicit allowlist.
 * Canonical snapshot scenarios and AppliedCorrection.details are intentionally
 * excluded because they contain open-ended payloads that are not part of the
 * consumer-safe V1 calculation contract.
 */
export function serializeAuthorizedProductionCalculationHttpResponseV1(
  result: AuthorizedMyeonghwaProductionCalculationResult,
) {
  return {
    responseSchemaVersion: PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION,
    runtimeVersion: result.runtimeVersion,
    authority: projectAuthority(result.authority),
    snapshot: projectCanonicalSnapshot(result.snapshot),
  };
}

export type ProductionCalculationHttpResponseV1 = ReturnType<
  typeof serializeAuthorizedProductionCalculationHttpResponseV1
>;
