import {
  R081_EXAMPLES,
  R081_PRIMARY_SOURCE,
} from './general-natal-classical-worked-example-corpus.js';
import {
  R082_NORMALIZED_EXAMPLES,
} from './general-natal-historical-example-normalization.js';

export const R083_CLASSICAL_REPLAY_INPUT_VERSION = '0.1.0-research' as const;

/**
 * R083 input preparation, not a CanonicalSajuSnapshot constructor.
 * Printed columns are a source witness, never recalculated birth pillars.
 */
export interface R083ClassicalReplayInput {
  version: typeof R083_CLASSICAL_REPLAY_INPUT_VERSION;
  caseId: string;
  provenanceModes: readonly string[];
  inputStatus: 'PRINTED_CHART_ONLY' | 'SCHEMATIC_ONLY' | 'PARTIAL_BIOGRAPHY_ONLY';
  printedPillars?: readonly string[];
  schematicInput?: string;
  researchReference?: {
    sourceTitle: string;
    sourceUrl: string;
    sourceConclusion: string;
    sourceConclusionProvenance: string;
    mechanismTags: readonly string[];
    /** Source's own description, not any engine prediction. */
    referenceKind: 'SOURCE_LOCAL_INTERPRETATION_ONLY';
  };
  /** The preflight is reproducible without making an unauthorized engine call. */
  replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY';
  requiredNextEvidence: readonly string[];
  sourceChartIsIndependentlyCalculated: false;
  sourceConclusionIsEngineGroundTruth: false;
  governedInterpretationExecuted: false;
  engineAgreementMeasured: false;
  mayConstructCanonicalSnapshot: false;
  mayGrantOfficialAuthority: false;
  mayPersist: false;
  mayPublish: false;
  maySell: false;
}

const PRINTED_PILLAR = /^[甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥]$/u;

/**
 * Bind R081's source-local interpretation to the exact same R082 source chart.
 * No missing birth hour, location, policy or engine output can be invented.
 */
export function prepareR083ClassicalReplayInput(caseId: string): R083ClassicalReplayInput {
  const normalized = R082_NORMALIZED_EXAMPLES.find(item => item.id === caseId);
  if (!normalized) throw new TypeError('R083 requires a registered R082 historical example.');
  if (normalized.independentRecalculationAuthorized !== false) {
    throw new TypeError('R083 source examples cannot claim independently authorized calculation.');
  }
  const reference = R081_EXAMPLES.find(item => item.id === caseId);
  const chart = 'chart' in normalized && Array.isArray(normalized.chart)
    ? [...normalized.chart] : undefined;
  const schematicInput = 'schematicInput' in normalized
    ? normalized.schematicInput : undefined;
  if (chart && (chart.length !== 4 || !chart.every(pillar => PRINTED_PILLAR.test(pillar)))) {
    throw new TypeError('R083 printed four-pillar witness is malformed.');
  }
  if (reference) {
    const original = reference.chart;
    if (chart
      ? original === null || original.some((pillar, index) => pillar !== chart[index])
      : original !== null ||
        !('schematicInput' in reference) ||
        reference.schematicInput !== schematicInput) {
      throw new TypeError('R083 R081/R082 source witness provenance diverges.');
    }
  }
  const inputStatus = chart
    ? 'PRINTED_CHART_ONLY' as const
    : schematicInput
      ? 'SCHEMATIC_ONLY' as const : 'PARTIAL_BIOGRAPHY_ONLY' as const;
  const requiredNextEvidence = [
    'GOVERNED_SOURCE_PROVIDED_CHART_REPLAY_ADAPTER_NOT_ADMITTED',
    'BOUNDED_RESEARCH_INTERPRETATION_PACK_NOT_ADMITTED',
    'SOURCE_LOCAL_CONCLUSION_IS_NOT_ENGINE_GROUND_TRUTH',
    ...(!chart ? ['FOUR_PRINTED_PILLARS_NOT_AVAILABLE'] : []),
    ...(!reference ? ['R081_SOURCE_LOCAL_CONCLUSION_NOT_REGISTERED'] : []),
    ...(normalized.modes.some(mode => mode === 'PARTIAL_BIRTH_DATA')
      ? ['HISTORICAL_BIRTH_INPUT_AND_POLICY_INCOMPLETE'] : []),
  ];
  return {
    version: R083_CLASSICAL_REPLAY_INPUT_VERSION,
    caseId: normalized.id,
    provenanceModes: [...normalized.modes],
    inputStatus,
    ...(chart ? { printedPillars: chart } : {}),
    ...(schematicInput ? { schematicInput } : {}),
    ...(reference ? {
      researchReference: {
        sourceTitle: R081_PRIMARY_SOURCE.title,
        sourceUrl: R081_PRIMARY_SOURCE.url,
        sourceConclusion: reference.sourceConclusion,
        sourceConclusionProvenance: reference.sourceConclusionProvenance,
        mechanismTags: [...reference.mechanismTags],
        referenceKind: 'SOURCE_LOCAL_INTERPRETATION_ONLY' as const,
      },
    } : {}),
    replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY',
    requiredNextEvidence,
    sourceChartIsIndependentlyCalculated: false,
    sourceConclusionIsEngineGroundTruth: false,
    governedInterpretationExecuted: false,
    engineAgreementMeasured: false,
    mayConstructCanonicalSnapshot: false,
    mayGrantOfficialAuthority: false,
    mayPersist: false,
    mayPublish: false,
    maySell: false,
  };
}

/** Full, source-identity-stable R082 intake; never counted as eight engine replays. */
export function prepareR083ClassicalReplayIntake(): readonly R083ClassicalReplayInput[] {
  return R082_NORMALIZED_EXAMPLES.map(item => prepareR083ClassicalReplayInput(item.id));
}
