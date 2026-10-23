import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  R081_CLASSICAL_WORKED_EXAMPLE_CORPUS_VERSION,
} from './general-natal-classical-worked-example-corpus.js';
import {
  R082_HISTORICAL_EXAMPLE_NORMALIZATION_VERSION,
  R082_NORMALIZED_EXAMPLES,
} from './general-natal-historical-example-normalization.js';
import {
  prepareR083ClassicalReplayInput,
  type R083ClassicalReplayInput,
} from './general-natal-classical-replay-input.js';
import {
  observeR083PrintedChartStructure,
} from './general-natal-classical-printed-chart-structure.js';
import {
  compareR083SourceTagsToT0Candidates,
} from './general-natal-classical-t0-source-tag-concordance.js';
import {
  observeR083PrintedVisibleStemTenGods,
} from './general-natal-classical-printed-stem-tengod-facts.js';

export const R083_REPLAY_PREFLIGHT_VERSION = '0.1.0-research' as const;

type ClassicalSourceReference = NonNullable<R083ClassicalReplayInput['researchReference']>;

export interface R083SourceProvidedPreflightCase {
  caseId: string;
  sourceInputStatus: R083ClassicalReplayInput['inputStatus'];
  inputProvenance: readonly string[];
  sourceWitnessHash: string;
  sourcePrintedPillars?: readonly string[];
  sourceReference?: ClassicalSourceReference;
  sourceFactObservation?: {
    t0StructuralDefinitionHash: string;
    structuralCandidateIds: readonly string[];
    t0SourceTagChecks: readonly {
      sourceMechanismTag: string;
      comparison: 'T0_CANDIDATE_PRESENT' | 'T0_CANDIDATE_NOT_FOUND';
      structuralRelationIds: readonly string[];
      sourceFactPaths: readonly string[];
    }[];
    t0UnassessedSourceTags: readonly string[];
    tenGodEngineVersion: string;
    dayMasterPrintedStem: string;
    visibleStemRoles: readonly {
      pillarSlot: string;
      sourceFactPath: string;
      originalStem: string;
      tenGod: string;
    }[];
  };
  status: 'SOURCE_PRINTED_FACTS_OBSERVED' | 'INPUT_NOT_AVAILABLE_FOR_FACT_OBSERVATION';
  requiredNextEvidence: readonly string[];
  inputIndependentlyCalculated: false;
  sourceConclusionIsEngineGroundTruth: false;
  governedInterpretationExecuted: false;
  historicalAgreementEvaluated: false;
  interpretationPackAdmitted: false;
  replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY';
  mayConstructCanonicalSnapshot: false;
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

export interface R083ClassicalReplayPreflightReport {
  version: typeof R083_REPLAY_PREFLIGHT_VERSION;
  inputCorpus: {
    r081Version: typeof R081_CLASSICAL_WORKED_EXAMPLE_CORPUS_VERSION;
    r082Version: typeof R082_HISTORICAL_EXAMPLE_NORMALIZATION_VERSION;
  };
  cases: readonly R083SourceProvidedPreflightCase[];
  summary: {
    caseCount: number;
    sourcePrintedFactObservationCount: number;
    insufficientFourPillarInputCount: number;
    governedInterpretationRunCount: 0;
    historicalAgreementVerifiedCount: 0;
  };
  reportContentHash: string;
  replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY';
  productionAuthorityPromoted: false;
}

/**
 * Execute the already-available T0/T5 research fact engines together against
 * a registered source witness. This is NOT the governed interpretation engine:
 * no synthetic BirthInput, CanonicalSajuSnapshot, InterpretationPack or T8
 * classical verdict is constructed or executed.
 */
export function buildR083SourceProvidedPreflightCase(
  caseId: string,
): R083SourceProvidedPreflightCase {
  const input = prepareR083ClassicalReplayInput(caseId);
  const witnessHash = deterministicContentHash({
    r081Version: R081_CLASSICAL_WORKED_EXAMPLE_CORPUS_VERSION,
    r082Version: R082_HISTORICAL_EXAMPLE_NORMALIZATION_VERSION,
    caseId: input.caseId,
    inputProvenance: input.provenanceModes,
    printedPillars: input.printedPillars ?? null,
    schematicInput: input.schematicInput ?? null,
    sourceReference: input.researchReference ?? null,
  });
  const basic = {
    caseId: input.caseId,
    sourceInputStatus: input.inputStatus,
    inputProvenance: [...input.provenanceModes],
    sourceWitnessHash: witnessHash,
    ...(input.printedPillars === undefined ? {} : {
      sourcePrintedPillars: [...input.printedPillars],
    }),
    ...(input.researchReference === undefined ? {} : {
      sourceReference: input.researchReference,
    }),
    requiredNextEvidence: [...input.requiredNextEvidence],
    inputIndependentlyCalculated: false as const,
    sourceConclusionIsEngineGroundTruth: false as const,
    governedInterpretationExecuted: false as const,
    historicalAgreementEvaluated: false as const,
    interpretationPackAdmitted: false as const,
    replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY' as const,
    mayConstructCanonicalSnapshot: false as const,
    mayGrantOfficialAuthority: false as const,
    mayPublish: false as const,
    mayPersist: false as const,
    maySell: false as const,
  };

  if (input.inputStatus !== 'PRINTED_CHART_ONLY') {
    return {
      ...basic,
      status: 'INPUT_NOT_AVAILABLE_FOR_FACT_OBSERVATION',
    };
  }
  const t0 = observeR083PrintedChartStructure(caseId);
  const concordance = compareR083SourceTagsToT0Candidates(caseId);
  const t5 = observeR083PrintedVisibleStemTenGods(caseId);
  const exactSourcePillars = t0.sourcePillars.map(item => item.sourcePrintedGlyphs);
  if (t0.caseId !== input.caseId || t5.caseId !== input.caseId ||
      concordance.caseId !== input.caseId ||
      input.printedPillars?.length !== 4 ||
      exactSourcePillars.some((value, i) => value !== input.printedPillars?.[i]) ||
      t0.structuralCandidates.some(value =>
        value.semantics.structuralMatchOnly !== true ||
        value.semantics.transformationEstablished !== false) ||
      concordance.checkedSourceMechanisms.some(value =>
        value.originalSourceConclusionProven !== false ||
        value.compositionOrTransformationProven !== false) ||
      t5.computedVisibleStemTenGods.some(value =>
        value.sourceClaimEstablished !== false ||
        value.seasonOrStrengthDetermined !== false)) {
    throw new TypeError('R083 preflight observations diverged from the original source witness.');
  }
  return {
    ...basic,
    status: 'SOURCE_PRINTED_FACTS_OBSERVED',
    sourceFactObservation: {
      t0StructuralDefinitionHash: t0.structuralDefinitionContentHash,
      structuralCandidateIds: t0.structuralCandidates.map(value => value.relationId),
      t0SourceTagChecks: concordance.checkedSourceMechanisms.map(value => ({
        sourceMechanismTag: value.sourceMechanismTag,
        comparison: value.comparison,
        structuralRelationIds: [...value.matchingStructuralRelationIds],
        sourceFactPaths: [...value.matchingSourceFactPaths],
      })),
      t0UnassessedSourceTags: [...concordance.unassessedSourceMechanismTags],
      tenGodEngineVersion: t5.classificationEngineVersion,
      dayMasterPrintedStem: t5.dayMasterPrintedStem,
      visibleStemRoles: t5.computedVisibleStemTenGods.map(value => ({
        pillarSlot: value.pillarSlot,
        sourceFactPath: value.sourceFactPath,
        originalStem: value.originalPrintedStem,
        tenGod: value.dayMasterRelativeTenGod,
      })),
    },
  };
}

/**
 * A reproducible eight-case research report. The status always stays
 * BLOCKED until a separate provenance-preserving governed adapter and
 * authorized bounded Research InterpretationPack both exist.
 */
export function buildR083ClassicalReplayPreflightReport(
  caseId?: string,
): R083ClassicalReplayPreflightReport {
  const ids = caseId === undefined
    ? R082_NORMALIZED_EXAMPLES.map(value => value.id)
    : [caseId];
  const cases = ids.map(id => buildR083SourceProvidedPreflightCase(id));
  const sourcePrintedFactObservationCount = cases.filter(
    value => value.status === 'SOURCE_PRINTED_FACTS_OBSERVED',
  ).length;
  const summary = {
    caseCount: cases.length,
    sourcePrintedFactObservationCount,
    insufficientFourPillarInputCount: cases.length - sourcePrintedFactObservationCount,
    governedInterpretationRunCount: 0 as const,
    historicalAgreementVerifiedCount: 0 as const,
  };
  return {
    version: R083_REPLAY_PREFLIGHT_VERSION,
    inputCorpus: {
      r081Version: R081_CLASSICAL_WORKED_EXAMPLE_CORPUS_VERSION,
      r082Version: R082_HISTORICAL_EXAMPLE_NORMALIZATION_VERSION,
    },
    cases,
    summary,
    reportContentHash: deterministicContentHash({ version: R083_REPLAY_PREFLIGHT_VERSION, cases, summary }),
    replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY',
    productionAuthorityPromoted: false,
  };
}
