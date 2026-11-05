import type {
  StructuralRelationCandidate,
  StructuralRelationKind,
} from '../contracts/calculation.js';
import {
  observeR083PrintedChartStructure,
} from './general-natal-classical-printed-chart-structure.js';
import {
  prepareR083ClassicalReplayInput,
} from './general-natal-classical-replay-input.js';

export const R083_SOURCE_TAG_T0_CONCORDANCE_VERSION = '0.1.0-research' as const;

/**
 * These are four exact, mechanically testable *parts* of R081 commentary
 * descriptions, not whole R081 interpretations or rules establishing 格局.
 * For 丁壬 and 乙庚 we inspect only a paired stem match (not 合化/救應).
 */
const TAGGED_T0_PATTERNS = {
  HAI_MAO_WEI_WOOD_MEETING: {
    kind: 'branch_three_combination',
    values: ['해', '묘', '미'],
    assertedSemanticsNotTested: 'wood transformation / 從煞格成',
  },
  SHEN_ZI_CHEN_WATER_MEETING: {
    kind: 'branch_three_combination',
    values: ['신', '자', '진'],
    assertedSemanticsNotTested: 'water transformation / 傷官生財格',
  },
  DING_REN_TRANSFORMATION_CLAIM: {
    kind: 'stem_five_combination',
    values: ['정', '임'],
    assertedSemanticsNotTested: '丁壬化木',
  },
  YI_GENG_COMBINATION_RESCUE: {
    kind: 'stem_five_combination',
    values: ['을', '경'],
    assertedSemanticsNotTested: '乙庚合救應',
  },
} as const satisfies Record<string, {
  kind: StructuralRelationKind;
  values: readonly string[];
  assertedSemanticsNotTested: string;
}>;

type TaggedT0Name = keyof typeof TAGGED_T0_PATTERNS;

export interface R083T0SourceTagObservation {
  sourceMechanismTag: TaggedT0Name;
  computedPredicate: StructuralRelationKind;
  expectedValues: readonly string[];
  matchingSourceFactPaths: readonly string[];
  matchingStructuralRelationIds: readonly string[];
  /** Candidate absence does not disprove a historical interpretation. */
  comparison: 'T0_CANDIDATE_PRESENT' | 'T0_CANDIDATE_NOT_FOUND';
  sourceSemanticsNotTested: string;
  structuralOnly: true;
  compositionOrTransformationProven: false;
  originalSourceConclusionProven: false;
}

export interface R083SourceTagT0Concordance {
  version: typeof R083_SOURCE_TAG_T0_CONCORDANCE_VERSION;
  caseId: string;
  chartProvenance: 'SOURCE_PROVIDED_CHART';
  status: 'STRUCTURAL_TAGS_CHECKED' | 'NO_TESTABLE_STRUCTURAL_SOURCE_TAGS';
  /** Tags with no authorized T0 predicate remain explicitly unassessed. */
  unassessedSourceMechanismTags: readonly string[];
  checkedSourceMechanisms: readonly R083T0SourceTagObservation[];
  evidenceSource: 'R081_R082_PRINTED_CHART_AND_EXISTING_T0_MATCHER';
  resultMeaning: 'LITERAL_STRUCTURAL_MATCH_ONLY';
  classicalInterpretationReplayed: false;
  engineInterpretationCompared: false;
  sourceOutcomeConfirmed: false;
  mayConstructCanonicalSnapshot: false;
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

function isTaggedT0Name(value: string): value is TaggedT0Name {
  return Object.prototype.hasOwnProperty.call(TAGGED_T0_PATTERNS, value);
}

function matchesExactPattern(
  candidate: StructuralRelationCandidate,
  pattern: (typeof TAGGED_T0_PATTERNS)[TaggedT0Name],
): boolean {
  if (candidate.kind !== pattern.kind ||
      candidate.semantics.structuralMatchOnly !== true ||
      candidate.semantics.transformationEstablished !== false ||
      candidate.participants.length !== pattern.values.length) return false;
  return candidate.participants.map(item => item.value).sort().join('|')
    === [...pattern.values].sort().join('|');
}

/**
 * A bounded comparison of a source author's named structure to an existing
 * deterministic T0 candidate. Never evaluates the source's 格局 conclusion.
 */
export function compareR083SourceTagsToT0Candidates(
  caseId: string,
): R083SourceTagT0Concordance {
  const input = prepareR083ClassicalReplayInput(caseId);
  const observed = observeR083PrintedChartStructure(caseId);
  if (input.caseId !== observed.caseId ||
      input.inputStatus !== 'PRINTED_CHART_ONLY' ||
      input.sourceChartIsIndependentlyCalculated !== false ||
      observed.chartProvenance !== 'SOURCE_PROVIDED_CHART' ||
      observed.governedInterpretationExecuted !== false ||
      observed.comparisonToSourceInterpretationPerformed !== false ||
      observed.replayStatus !== 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY') {
    throw new TypeError('R083 source-tag comparison requires the unchanged printed-chart research boundary.');
  }

  const checkedSourceMechanisms: R083T0SourceTagObservation[] = [];
  const unassessedSourceMechanismTags: string[] = [];
  for (const tag of observed.sourceMechanismTags) {
    if (!isTaggedT0Name(tag)) {
      unassessedSourceMechanismTags.push(tag);
      continue;
    }
    const pattern = TAGGED_T0_PATTERNS[tag];
    const matches = observed.structuralCandidates.filter(item =>
      matchesExactPattern(item, pattern));
    checkedSourceMechanisms.push({
      sourceMechanismTag: tag,
      computedPredicate: pattern.kind,
      expectedValues: [...pattern.values],
      matchingSourceFactPaths: [...new Set(matches.flatMap(candidate =>
        candidate.participants.map(item => 'sourceProvidedChart.pillars.' + item.pillar)))].sort(),
      matchingStructuralRelationIds: matches.map(item => item.relationId).sort(),
      comparison: matches.length
        ? 'T0_CANDIDATE_PRESENT' : 'T0_CANDIDATE_NOT_FOUND',
      sourceSemanticsNotTested: pattern.assertedSemanticsNotTested,
      structuralOnly: true,
      compositionOrTransformationProven: false,
      originalSourceConclusionProven: false,
    });
  }
  return {
    version: R083_SOURCE_TAG_T0_CONCORDANCE_VERSION,
    caseId: observed.caseId,
    chartProvenance: 'SOURCE_PROVIDED_CHART',
    status: checkedSourceMechanisms.length
      ? 'STRUCTURAL_TAGS_CHECKED' : 'NO_TESTABLE_STRUCTURAL_SOURCE_TAGS',
    checkedSourceMechanisms,
    unassessedSourceMechanismTags,
    evidenceSource: 'R081_R082_PRINTED_CHART_AND_EXISTING_T0_MATCHER',
    resultMeaning: 'LITERAL_STRUCTURAL_MATCH_ONLY',
    classicalInterpretationReplayed: false,
    engineInterpretationCompared: false,
    sourceOutcomeConfirmed: false,
    mayConstructCanonicalSnapshot: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
