import {
  getEarthlyBranchElement,
  getEarthlyBranchYinYang,
  getHeavenlyStemElement,
  getHeavenlyStemYinYang,
} from 'manseryeok';
import type {
  EarthlyBranch,
  HeavenlyStem,
  PillarFact,
  PillarSlot,
  StructuralRelationCandidate,
} from '../contracts/calculation.js';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_DERIVATION_VERSION,
  deriveStructuralRelationCandidates,
} from '../calculation/structural-relations.js';
import { prepareR083ClassicalReplayInput } from './general-natal-classical-replay-input.js';

export const R083_PRINTED_CHART_STRUCTURAL_OBSERVATION_VERSION = '0.1.0-research' as const;

const STEM_HANJA = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
const STEM_HANGUL = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const
  satisfies readonly HeavenlyStem[];
const BRANCH_HANJA = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥',
] as const;
const BRANCH_HANGUL = [
  '자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해',
] as const satisfies readonly EarthlyBranch[];
const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

export interface R083PrintedSourcePillar {
  slot: PillarSlot;
  /** Original R081/R082 glyphs, not the result of independent calculation. */
  sourcePrintedGlyphs: string;
  sourceFactPath: string;
}

export interface R083PrintedChartStructuralObservation {
  version: typeof R083_PRINTED_CHART_STRUCTURAL_OBSERVATION_VERSION;
  caseId: string;
  chartProvenance: 'SOURCE_PROVIDED_CHART';
  inputState: 'PRINTED_FOUR_PILLARS_ONLY';
  sourcePillars: readonly R083PrintedSourcePillar[];
  structuralDerivationVersion: typeof STRUCTURAL_RELATION_DERIVATION_VERSION;
  structuralDefinitionContentHash: typeof STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH;
  /** Existing T0 structural matcher; no classical configuration or effect verdict. */
  structuralCandidates: readonly StructuralRelationCandidate[];
  sourceMechanismTags: readonly string[];
  sourceConclusionUsedAsPrediction: false;
  sourceChartIndependentlyCalculated: false;
  canonicalSnapshotConstructed: false;
  governedInterpretationExecuted: false;
  comparisonToSourceInterpretationPerformed: false;
  sourceStructureImpliedSourceConclusion: false;
  replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY';
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

function decodePrintedPillar(glyphs: string): PillarFact {
  if ([...glyphs].length !== 2) {
    throw new TypeError('R083 requires two glyphs per original stem/branch pillar.');
  }
  const stemHanja = glyphs[0]!;
  const branchHanja = glyphs[1]!;
  const stemIndex = STEM_HANJA.indexOf(stemHanja as typeof STEM_HANJA[number]);
  const branchIndex = BRANCH_HANJA.indexOf(branchHanja as typeof BRANCH_HANJA[number]);
  if (stemIndex === -1 || branchIndex === -1 ||
      stemIndex % 2 !== branchIndex % 2) {
    throw new TypeError('R083 printed pillar is not a valid sexagenary stem/branch pairing.');
  }
  const stem = STEM_HANGUL[stemIndex]!;
  const branch = BRANCH_HANGUL[branchIndex]!;
  return {
    stem: {
      value: stem,
      hanja: stemHanja,
      element: getHeavenlyStemElement(stem),
      yinYang: getHeavenlyStemYinYang(stem),
    },
    branch: {
      value: branch,
      hanja: branchHanja,
      element: getEarthlyBranchElement(branch),
      yinYang: getEarthlyBranchYinYang(branch),
    },
  };
}

/**
 * R083 source-provided chart structural observation, never historical birth
 * reconstruction. Shares only the governed T0 matcher, not Canonical identity
 * or Interpretation execution; chart provenance must stay visible.
 */
export function observeR083PrintedChartStructure(
  caseId: string,
): R083PrintedChartStructuralObservation {
  const input = prepareR083ClassicalReplayInput(caseId);
  if (input.inputStatus !== 'PRINTED_CHART_ONLY' ||
      !input.provenanceModes.includes('SOURCE_PROVIDED_CHART') ||
      input.printedPillars?.length !== SLOTS.length ||
      input.sourceChartIsIndependentlyCalculated !== false ||
      input.mayConstructCanonicalSnapshot !== false ||
      input.replayStatus !== 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY') {
    throw new TypeError('R083 structural observation requires an original, uncalculated four-pillar witness.');
  }
  const pillars: Partial<Record<PillarSlot, PillarFact>> = {};
  const sourcePillars = SLOTS.map((slot, index): R083PrintedSourcePillar => {
    const sourcePrintedGlyphs = input.printedPillars![index]!;
    pillars[slot] = decodePrintedPillar(sourcePrintedGlyphs);
    return {
      slot,
      sourcePrintedGlyphs,
      sourceFactPath: 'sourceProvidedChart.pillars.' + slot,
    };
  });
  const structuralCandidates = deriveStructuralRelationCandidates(pillars);
  if (structuralCandidates.some(candidate =>
    candidate.semantics.structuralMatchOnly !== true ||
    candidate.semantics.transformationEstablished !== false)) {
    throw new TypeError('R083 cannot treat structural matching as interpreted transformation.');
  }
  return {
    version: R083_PRINTED_CHART_STRUCTURAL_OBSERVATION_VERSION,
    caseId: input.caseId,
    chartProvenance: 'SOURCE_PROVIDED_CHART',
    inputState: 'PRINTED_FOUR_PILLARS_ONLY',
    sourcePillars,
    structuralDerivationVersion: STRUCTURAL_RELATION_DERIVATION_VERSION,
    structuralDefinitionContentHash: STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
    structuralCandidates,
    sourceMechanismTags: input.researchReference?.mechanismTags ?? [],
    sourceConclusionUsedAsPrediction: false,
    sourceChartIndependentlyCalculated: false,
    canonicalSnapshotConstructed: false,
    governedInterpretationExecuted: false,
    comparisonToSourceInterpretationPerformed: false,
    sourceStructureImpliedSourceConclusion: false,
    replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY',
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
