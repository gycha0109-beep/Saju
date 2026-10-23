import { describe, expect, it } from 'vitest';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_DERIVATION_VERSION,
} from '../src/calculation/structural-relations.js';
import { R082_NORMALIZED_EXAMPLES } from
  '../src/research/general-natal-historical-example-normalization.js';
import {
  R083_PRINTED_CHART_STRUCTURAL_OBSERVATION_VERSION,
  observeR083PrintedChartStructure,
} from '../src/research/general-natal-classical-printed-chart-structure.js';

describe('R083 bounded structural matching on original printed chart glyphs', () => {
  it('observes all five existing printed charts only, without creating a Canonical calculation', () => {
    const cases = R082_NORMALIZED_EXAMPLES.filter(item => 'chart' in item);
    expect(cases).toHaveLength(5);
    for (const source of cases) {
      const result = observeR083PrintedChartStructure(source.id);
      expect(result.version).toBe(R083_PRINTED_CHART_STRUCTURAL_OBSERVATION_VERSION);
      expect(result.caseId).toBe(source.id);
      expect(result.chartProvenance).toBe('SOURCE_PROVIDED_CHART');
      expect(result.inputState).toBe('PRINTED_FOUR_PILLARS_ONLY');
      expect(result.sourcePillars.map(item => item.slot)).toEqual([
        'year', 'month', 'day', 'hour',
      ]);
      expect(result.sourcePillars.map(item => item.sourcePrintedGlyphs))
        .toEqual(source.chart);
      expect(result.sourcePillars.map(item => item.sourceFactPath)).toEqual([
        'sourceProvidedChart.pillars.year',
        'sourceProvidedChart.pillars.month',
        'sourceProvidedChart.pillars.day',
        'sourceProvidedChart.pillars.hour',
      ]);
      expect(result.structuralDerivationVersion).toBe(STRUCTURAL_RELATION_DERIVATION_VERSION);
      expect(result.structuralDefinitionContentHash)
        .toBe(STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH);
      expect(result.structuralCandidates.every(candidate =>
        candidate.semantics.structuralMatchOnly === true &&
        candidate.semantics.transformationEstablished === false &&
        candidate.sourceIds.length > 0)).toBe(true);
      expect(result.replayStatus).toBe('BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY');
      expect(result.sourceConclusionUsedAsPrediction).toBe(false);
      expect(result.sourceChartIndependentlyCalculated).toBe(false);
      expect(result.canonicalSnapshotConstructed).toBe(false);
      expect(result.governedInterpretationExecuted).toBe(false);
      expect(result.comparisonToSourceInterpretationPerformed).toBe(false);
      expect(result.sourceStructureImpliedSourceConclusion).toBe(false);
      expect(result.mayGrantOfficialAuthority).toBe(false);
      expect(result.mayPublish).toBe(false);
      expect(result.mayPersist).toBe(false);
      expect(result.maySell).toBe(false);
      expect('snapshotId' in result).toBe(false);
      expect('calculationHash' in result).toBe(false);
      expect(observeR083PrintedChartStructure(source.id)).toEqual(result);
    }
  });

  it('matches known original branch combinations without claiming classical transformations', () => {
    const wu = observeR083PrintedChartStructure('WU-TINGFANG-FOLLOW-KILL');
    const wuTriple = wu.structuralCandidates.find(item =>
      item.kind === 'branch_three_combination');
    expect(wuTriple?.participants.map(item => item.value).sort()).toEqual(
      ['묘', '미', '해'].sort(),
    );
    expect(wuTriple?.participants.map(item => item.pillar)).toEqual([
      'month', 'day', 'hour',
    ]);
    expect(wu.structuralCandidates.some(item =>
      item.kind === 'stem_five_combination' &&
      item.participants.map(participant => participant.value).join('|') === '임|정'))
      .toBe(true);
    expect(wu.sourceMechanismTags).toContain('FOLLOW_KILL');
    // Following-kill and stem transformation are the source's interpretation,
    // not results from a bare structural matcher.
    expect(wu.sourceStructureImpliedSourceConclusion).toBe(false);

    const wang = observeR083PrintedChartStructure('WANG-KEMIN-WATER-MEETING');
    const wangTriple = wang.structuralCandidates.find(item =>
      item.kind === 'branch_three_combination');
    expect(wangTriple?.participants.map(item => item.value).sort()).toEqual(
      ['신', '자', '진'].sort(),
    );
    expect(wangTriple?.participants.map(item => item.pillar)).toEqual([
      'year', 'month', 'day',
    ]);

    const zhang = observeR083PrintedChartStructure('ZHANG-ZAIYANG-RESCUE');
    expect(zhang.structuralCandidates.some(item =>
      item.kind === 'stem_five_combination' &&
      item.participants.map(participant => participant.value).join('|') === '을|경'))
      .toBe(true);
    expect(zhang.sourceStructureImpliedSourceConclusion).toBe(false);
  });

  it('cannot expand schematic witnesses, partial biographies or arbitrary inputs into charts', () => {
    for (const id of [
      'JIA-CHEN-GUI-SHEN-ZI',
      'REN-WEI-JI-HAI-MAO',
      'LI-GUOJIE-WEI-JIAXU',
      'UNKNOWN-CASE',
    ]) {
      expect(() => observeR083PrintedChartStructure(id)).toThrow(TypeError);
    }
  });
});
