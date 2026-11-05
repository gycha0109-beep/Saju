import { describe, expect, it } from 'vitest';
import { R081_EXAMPLES, R081_PRIMARY_SOURCE } from
  '../src/research/general-natal-classical-worked-example-corpus.js';
import { R082_NORMALIZED_EXAMPLES } from
  '../src/research/general-natal-historical-example-normalization.js';
import {
  R083_CLASSICAL_REPLAY_INPUT_VERSION,
  prepareR083ClassicalReplayInput,
  prepareR083ClassicalReplayIntake,
} from '../src/research/general-natal-classical-replay-input.js';

describe('R083 source-provided chart replay input without fabricated calculation', () => {
  it('prepares exactly the eight registered R082 sources, never a synthetic ninth', () => {
    const report = prepareR083ClassicalReplayIntake();
    expect(report).toHaveLength(8);
    expect(report.map(item => item.caseId)).toEqual(
      R082_NORMALIZED_EXAMPLES.map(item => item.id),
    );
    expect(report.every(item => item.version === R083_CLASSICAL_REPLAY_INPUT_VERSION))
      .toBe(true);
    expect(() => prepareR083ClassicalReplayInput('UNKNOWN-NINTH-CHART')).toThrow(TypeError);
    expect(prepareR083ClassicalReplayIntake()).toEqual(report);
    expect(report.every(item =>
      item.replayStatus === 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY' &&
      item.sourceChartIsIndependentlyCalculated === false &&
      item.sourceConclusionIsEngineGroundTruth === false &&
      item.governedInterpretationExecuted === false &&
      item.engineAgreementMeasured === false &&
      item.mayConstructCanonicalSnapshot === false &&
      item.mayGrantOfficialAuthority === false &&
      item.mayPersist === false &&
      item.mayPublish === false &&
      item.maySell === false)).toBe(true);
  });

  it('matches all four printed classic charts to R081/R082 without inventing birth data', () => {
    for (const original of R081_EXAMPLES.filter(row =>
      row.kind === 'NAMED_COMMENTARY_EXAMPLE')) {
      const report = prepareR083ClassicalReplayInput(original.id);
      expect(report.inputStatus).toBe('PRINTED_CHART_ONLY');
      expect(report.provenanceModes).toEqual(['SOURCE_PROVIDED_CHART']);
      expect(report.printedPillars).toEqual(original.chart);
      expect(report.printedPillars).toHaveLength(4);
      expect(report.researchReference).toEqual({
        sourceTitle: R081_PRIMARY_SOURCE.title,
        sourceUrl: R081_PRIMARY_SOURCE.url,
        sourceConclusion: original.sourceConclusion,
        sourceConclusionProvenance: original.sourceConclusionProvenance,
        mechanismTags: [...original.mechanismTags],
        referenceKind: 'SOURCE_LOCAL_INTERPRETATION_ONLY',
      });
      expect(report.requiredNextEvidence).toContain(
        'GOVERNED_SOURCE_PROVIDED_CHART_REPLAY_ADAPTER_NOT_ADMITTED');
      expect(report.requiredNextEvidence).toContain(
        'BOUNDED_RESEARCH_INTERPRETATION_PACK_NOT_ADMITTED');
      expect(report.requiredNextEvidence).not.toContain('FOUR_PRINTED_PILLARS_NOT_AVAILABLE');
      expect(report.schematicInput).toBeUndefined();
      expect('snapshotId' in report).toBe(false);
      expect('calculationHash' in report).toBe(false);
    }
  });

  it('never expands schematic examples into invented 4-pillar charts', () => {
    for (const original of R081_EXAMPLES.filter(row =>
      row.kind === 'SCHEMATIC_WORKED_EXAMPLE')) {
      const report = prepareR083ClassicalReplayInput(original.id);
      expect(report.inputStatus).toBe('SCHEMATIC_ONLY');
      expect(report.provenanceModes).toEqual(['SCHEMATIC_INPUT']);
      expect(report.printedPillars).toBeUndefined();
      expect(report.schematicInput).toBe(original.schematicInput);
      expect(report.researchReference?.sourceConclusion).toBe(original.sourceConclusion);
      expect(report.researchReference?.sourceConclusionProvenance)
        .toBe('BOUNDED_SOURCE_PARAPHRASE');
      expect(report.requiredNextEvidence).toContain('FOUR_PRINTED_PILLARS_NOT_AVAILABLE');
    }
  });

  it('keeps R082-only historical cases separate from the R081 source interpretation', () => {
    const yuan = prepareR083ClassicalReplayInput('YUAN-SHIKAI-MAO-LUCK');
    expect(yuan.inputStatus).toBe('PRINTED_CHART_ONLY');
    expect(yuan.provenanceModes).toEqual([
      'SOURCE_PROVIDED_CHART', 'PARTIAL_BIRTH_DATA',
    ]);
    expect(yuan.printedPillars).toEqual(['己未', '癸酉', '丁巳', '丁未']);
    expect(yuan.researchReference).toBeUndefined();
    expect(yuan.requiredNextEvidence).toContain(
      'HISTORICAL_BIRTH_INPUT_AND_POLICY_INCOMPLETE');
    expect(yuan.requiredNextEvidence).toContain(
      'R081_SOURCE_LOCAL_CONCLUSION_NOT_REGISTERED');
    const li = prepareR083ClassicalReplayInput('LI-GUOJIE-WEI-JIAXU');
    expect(li.inputStatus).toBe('PARTIAL_BIOGRAPHY_ONLY');
    expect(li.provenanceModes).toEqual(['PARTIAL_BIRTH_DATA']);
    expect(li.printedPillars).toBeUndefined();
    expect(li.schematicInput).toBeUndefined();
    expect(li.researchReference).toBeUndefined();
    expect(li.requiredNextEvidence).toContain('FOUR_PRINTED_PILLARS_NOT_AVAILABLE');
    expect(li.requiredNextEvidence).toContain(
      'HISTORICAL_BIRTH_INPUT_AND_POLICY_INCOMPLETE');
  });

  it('rejects treating source-local conclusions as historic outcomes or engine scores', () => {
    const pack = prepareR083ClassicalReplayIntake();
    expect(pack.filter(item => item.printedPillars).length).toBe(5);
    expect(pack.filter(item => item.researchReference).length).toBe(6);
    expect(pack.filter(item => item.governedInterpretationExecuted).length).toBe(0);
    expect(pack.filter(item => item.engineAgreementMeasured).length).toBe(0);
    for (const item of pack) {
      expect(item.requiredNextEvidence).toContain(
        'SOURCE_LOCAL_CONCLUSION_IS_NOT_ENGINE_GROUND_TRUTH');
      expect(item.mayConstructCanonicalSnapshot).toBe(false);
    }
  });
});
