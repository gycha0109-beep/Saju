import { describe, expect, it } from 'vitest';
import { R082_NORMALIZED_EXAMPLES } from
  '../src/research/general-natal-historical-example-normalization.js';
import {
  observeR083PrintedVisibleStemTenGods,
  R083_PRINTED_STEM_TENGOD_VERSION,
} from '../src/research/general-natal-classical-printed-stem-tengod-facts.js';

describe('R083 original printed chart visible-stem T5 classification', () => {
  it('reuses the registered source chart and the governed function for exactly five printed four-pillar cases', () => {
    const names = R082_NORMALIZED_EXAMPLES.filter(item => 'chart' in item).map(item => item.id);
    expect(names).toHaveLength(5);
    for (const caseId of names) {
      const report = observeR083PrintedVisibleStemTenGods(caseId);
      expect(report.version).toBe(R083_PRINTED_STEM_TENGOD_VERSION);
      expect(report.caseId).toBe(caseId);
      expect(report.sourceChartProvenance).toBe('SOURCE_PROVIDED_CHART');
      expect(report.dayMasterSourceFactPath).toBe('sourceProvidedChart.pillars.day.stem');
      expect(report.computedVisibleStemTenGods.map(x => x.pillarSlot))
        .toEqual(['year', 'month', 'hour']);
      expect(report.computedVisibleStemTenGods.map(x => x.sourceFactPath))
        .toEqual([
          'sourceProvidedChart.pillars.year.stem',
          'sourceProvidedChart.pillars.month.stem',
          'sourceProvidedChart.pillars.hour.stem',
        ]);
      expect(report.classificationFunction).toBe('getTenGod');
      expect(report.classificationEngineName).toBe('manseryeok');
      expect(report.resultStatus).toBe('VISIBLE_STEM_T5_FACTS_ONLY');
      expect(report.replayStatus).toBe('BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY');
      expect(report.computedVisibleStemTenGods.every(x =>
        x.classificationOnly === true &&
        x.seasonOrStrengthDetermined === false &&
        x.sourceClaimEstablished === false)).toBe(true);
      expect(report.independentBirthCalculationExecuted).toBe(false);
      expect(report.canonicalSnapshotConstructed).toBe(false);
      expect(report.hiddenStemActivationInferred).toBe(false);
      expect(report.monthCommandDetermined).toBe(false);
      expect(report.sourceMechanismOrFormationProven).toBe(false);
      expect(report.sourceConclusionProven).toBe(false);
      expect(report.governedInterpretationExecuted).toBe(false);
      expect(report.mayGrantOfficialAuthority).toBe(false);
      expect(report.mayPublish).toBe(false);
      expect(report.mayPersist).toBe(false);
      expect(report.maySell).toBe(false);
      expect('snapshotId' in report).toBe(false);
      expect('calculationHash' in report).toBe(false);
      expect(observeR083PrintedVisibleStemTenGods(caseId)).toEqual(report);
    }
  });

  it('records E4 actual 庚-day 癸-hurting-officer and 丙-killing roles without proving 救應', () => {
    const result = observeR083PrintedVisibleStemTenGods('ZHANG-ZAIYANG-RESCUE');
    expect(result.dayMasterPrintedStem).toBe('庚');
    expect(result.dayMasterHangulStem).toBe('경');
    expect(result.computedVisibleStemTenGods.map(x => [
      x.pillarSlot, x.originalPrintedStem, x.dayMasterRelativeTenGod,
    ])).toEqual([
      ['year', '癸', '상관'],
      ['month', '乙', '정재'],
      ['hour', '丙', '편관'],
    ]);
    expect(result.sourceMechanismOrFormationProven).toBe(false);
    expect(result.sourceConclusionProven).toBe(false);
  });

  it('records E2 original 壬-day 乙 as hurting-officer classification, not 格局 selection', () => {
    const result = observeR083PrintedVisibleStemTenGods('WANG-KEMIN-WATER-MEETING');
    expect(result.dayMasterPrintedStem).toBe('壬');
    expect(result.computedVisibleStemTenGods.map(x => [
      x.pillarSlot, x.originalPrintedStem, x.dayMasterRelativeTenGod,
    ])).toEqual([
      ['year', '丙', '편재'],
      ['month', '壬', '비견'],
      ['hour', '乙', '상관'],
    ]);
    expect(result.monthCommandDetermined).toBe(false);
    expect(result.sourceMechanismOrFormationProven).toBe(false);
  });

  it('rejects schemes, partial biography, and nonexistent examples rather than inventing day masters', () => {
    for (const id of [
      'JIA-CHEN-GUI-SHEN-ZI',
      'REN-WEI-JI-HAI-MAO',
      'LI-GUOJIE-WEI-JIAXU',
      'UNKNOWN-R083-CASE',
    ]) {
      expect(() => observeR083PrintedVisibleStemTenGods(id)).toThrow(TypeError);
    }
  });
});
