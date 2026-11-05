import { getTenGod } from 'manseryeok';
import type { HeavenlyStem, PillarSlot, TenGod } from '../contracts/calculation.js';
import { manseryeokAdapterMetadata } from '../calculation/manseryeok-adapter.js';
import {
  observeR083PrintedChartStructure,
} from './general-natal-classical-printed-chart-structure.js';

export const R083_PRINTED_STEM_TENGOD_VERSION = '0.1.0-research' as const;

const STEM_HANJA_TO_HANGUL: Readonly<Record<string, HeavenlyStem>> = Object.freeze({
  甲: '갑', 乙: '을', 丙: '병', 丁: '정', 戊: '무',
  己: '기', 庚: '경', 辛: '신', 壬: '임', 癸: '계',
});

export interface R083SourcePrintedStemTenGod {
  pillarSlot: Exclude<PillarSlot, 'day'>;
  sourceFactPath: string;
  originalPrintedStem: string;
  dayMasterRelativeTenGod: TenGod;
  classificationOnly: true;
  seasonOrStrengthDetermined: false;
  sourceClaimEstablished: false;
}

export interface R083PrintedStemTenGodFacts {
  version: typeof R083_PRINTED_STEM_TENGOD_VERSION;
  caseId: string;
  sourceChartProvenance: 'SOURCE_PROVIDED_CHART';
  dayMasterSourceFactPath: 'sourceProvidedChart.pillars.day.stem';
  dayMasterPrintedStem: string;
  dayMasterHangulStem: HeavenlyStem;
  computedVisibleStemTenGods: readonly R083SourcePrintedStemTenGod[];
  classificationEngineName: string;
  classificationEngineVersion: string;
  classificationFunction: 'getTenGod';
  independentBirthCalculationExecuted: false;
  canonicalSnapshotConstructed: false;
  hiddenStemActivationInferred: false;
  monthCommandDetermined: false;
  sourceMechanismOrFormationProven: false;
  sourceConclusionProven: false;
  governedInterpretationExecuted: false;
  resultStatus: 'VISIBLE_STEM_T5_FACTS_ONLY';
  replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY';
  mayGrantOfficialAuthority: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
}

function hangulStem(originalGlyphs: string): HeavenlyStem {
  const glyph = [...originalGlyphs][0];
  const normalized = glyph === undefined ? undefined : STEM_HANJA_TO_HANGUL[glyph];
  if (normalized === undefined) {
    throw new TypeError('R083 requires an already verified printed stem glyph.');
  }
  return normalized;
}

/**
 * The governed Ten-God classifier can inspect the three visible non-day
 * stems on the original source's printed chart without a BirthInput.
 * It must never create a CanonicalSajuSnapshot or infer 格局/strength/outcome.
 */
export function observeR083PrintedVisibleStemTenGods(
  caseId: string,
): R083PrintedStemTenGodFacts {
  const original = observeR083PrintedChartStructure(caseId);
  if (original.chartProvenance !== 'SOURCE_PROVIDED_CHART' ||
      original.sourceChartIndependentlyCalculated !== false ||
      original.canonicalSnapshotConstructed !== false ||
      original.governedInterpretationExecuted !== false ||
      original.replayStatus !== 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY') {
    throw new TypeError('R083 visible-stem classification requires original research-only printed pillars.');
  }
  const day = original.sourcePillars.find(item => item.slot === 'day');
  if (day === undefined || original.sourcePillars.length !== 4) {
    throw new TypeError('R083 requires one registered, complete source-printed chart.');
  }
  const dayMaster = hangulStem(day.sourcePrintedGlyphs);
  const computedVisibleStemTenGods: R083SourcePrintedStemTenGod[] =
    original.sourcePillars
      .filter((item): item is typeof item & {
        slot: Exclude<PillarSlot, 'day'>;
      } => item.slot !== 'day')
      .map(item => ({
        pillarSlot: item.slot,
        sourceFactPath: item.sourceFactPath + '.stem',
        originalPrintedStem: [...item.sourcePrintedGlyphs][0]!,
        dayMasterRelativeTenGod: getTenGod(
          dayMaster, hangulStem(item.sourcePrintedGlyphs),
        ),
        classificationOnly: true,
        seasonOrStrengthDetermined: false,
        sourceClaimEstablished: false,
      }));
  if (computedVisibleStemTenGods.length !== 3 ||
      computedVisibleStemTenGods.some(item =>
        item.seasonOrStrengthDetermined !== false ||
        item.sourceClaimEstablished !== false)) {
    throw new TypeError('R083 cannot transform visible T5 classifications into classical conclusions.');
  }
  return {
    version: R083_PRINTED_STEM_TENGOD_VERSION,
    caseId: original.caseId,
    sourceChartProvenance: 'SOURCE_PROVIDED_CHART',
    dayMasterSourceFactPath: 'sourceProvidedChart.pillars.day.stem',
    dayMasterPrintedStem: [...day.sourcePrintedGlyphs][0]!,
    dayMasterHangulStem: dayMaster,
    computedVisibleStemTenGods,
    classificationEngineName: manseryeokAdapterMetadata.engineName,
    classificationEngineVersion: manseryeokAdapterMetadata.engineVersion,
    classificationFunction: 'getTenGod',
    independentBirthCalculationExecuted: false,
    canonicalSnapshotConstructed: false,
    hiddenStemActivationInferred: false,
    monthCommandDetermined: false,
    sourceMechanismOrFormationProven: false,
    sourceConclusionProven: false,
    governedInterpretationExecuted: false,
    resultStatus: 'VISIBLE_STEM_T5_FACTS_ONLY',
    replayStatus: 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY',
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
