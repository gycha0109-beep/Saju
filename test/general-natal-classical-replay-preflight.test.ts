import { describe, expect, it } from 'vitest';
import { R082_NORMALIZED_EXAMPLES } from
  '../src/research/general-natal-historical-example-normalization.js';
import {
  buildR083ClassicalReplayPreflightReport,
  buildR083SourceProvidedPreflightCase,
  R083_REPLAY_PREFLIGHT_VERSION,
} from '../src/research/general-natal-classical-replay-preflight.js';

describe('R083 executable eight-source structural/T5 preflight (not interpretation replay)', () => {
  it('executes exactly registered sources: five printed observations and three unavailable charts', () => {
    const report = buildR083ClassicalReplayPreflightReport();
    expect(report.version).toBe(R083_REPLAY_PREFLIGHT_VERSION);
    expect(report.cases.map(item => item.caseId)).toEqual(
      R082_NORMALIZED_EXAMPLES.map(item => item.id),
    );
    expect(report.summary).toEqual({
      caseCount: 8,
      sourcePrintedFactObservationCount: 5,
      insufficientFourPillarInputCount: 3,
      governedInterpretationRunCount: 0,
      historicalAgreementVerifiedCount: 0,
    });
    expect(report.cases.filter(item =>
      item.status === 'SOURCE_PRINTED_FACTS_OBSERVED')).toHaveLength(5);
    expect(report.cases.filter(item =>
      item.status === 'INPUT_NOT_AVAILABLE_FOR_FACT_OBSERVATION')).toHaveLength(3);
    expect(report.replayStatus).toBe('BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY');
    expect(report.productionAuthorityPromoted).toBe(false);
    expect(report.reportContentHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(buildR083ClassicalReplayPreflightReport()).toEqual(report);
    expect(report.cases.every(item =>
      item.sourceWitnessHash.length === 64 &&
      item.inputIndependentlyCalculated === false &&
      item.sourceConclusionIsEngineGroundTruth === false &&
      item.governedInterpretationExecuted === false &&
      item.historicalAgreementEvaluated === false &&
      item.interpretationPackAdmitted === false &&
      item.replayStatus === 'BLOCKED_BY_INPUT_AND_INTERPRETATION_AUTHORITY' &&
      item.mayConstructCanonicalSnapshot === false &&
      item.mayGrantOfficialAuthority === false &&
      item.mayPublish === false &&
      item.mayPersist === false &&
      item.maySell === false)).toBe(true);
    for (const item of report.cases) {
      expect(item.requiredNextEvidence).toContain(
        'BOUNDED_RESEARCH_INTERPRETATION_PACK_NOT_ADMITTED');
      expect(item.requiredNextEvidence).toContain(
        'GOVERNED_SOURCE_PROVIDED_CHART_REPLAY_ADAPTER_NOT_ADMITTED');
      expect('snapshotId' in item).toBe(false);
      expect('calculationHash' in item).toBe(false);
    }
  });

  it('includes source positions, literal T0 tags and same-chart visible Ten-God roles', () => {
    const wu = buildR083SourceProvidedPreflightCase('WU-TINGFANG-FOLLOW-KILL');
    expect(wu.sourcePrintedPillars).toEqual(['壬寅', '丁未', '己卯', '乙亥']);
    expect(wu.sourceFactObservation?.t0SourceTagChecks.map(x => [
      x.sourceMechanismTag, x.comparison,
    ])).toEqual([
      ['HAI_MAO_WEI_WOOD_MEETING', 'T0_CANDIDATE_PRESENT'],
      ['DING_REN_TRANSFORMATION_CLAIM', 'T0_CANDIDATE_PRESENT'],
    ]);
    expect(wu.sourceFactObservation?.t0UnassessedSourceTags).toEqual(['FOLLOW_KILL']);
    expect(wu.sourceFactObservation?.visibleStemRoles.map(x => x.pillarSlot))
      .toEqual(['year', 'month', 'hour']);
    expect(wu.sourceReference?.sourceConclusion).toBe('從煞格成');
    expect(wu.sourceConclusionIsEngineGroundTruth).toBe(false);
    const wang = buildR083SourceProvidedPreflightCase('WANG-KEMIN-WATER-MEETING');
    expect(wang.sourceFactObservation?.visibleStemRoles.map(x =>
      [x.originalStem, x.tenGod])).toEqual([
      ['丙', '편재'], ['壬', '비견'], ['乙', '상관'],
    ]);
    const zhang = buildR083SourceProvidedPreflightCase('ZHANG-ZAIYANG-RESCUE');
    expect(zhang.sourceFactObservation?.visibleStemRoles.map(x =>
      [x.originalStem, x.tenGod])).toEqual([
      ['癸', '상관'], ['乙', '정재'], ['丙', '편관'],
    ]);
    expect(zhang.sourceFactObservation?.t0SourceTagChecks.map(x => x.sourceMechanismTag))
      .toEqual(['YI_GENG_COMBINATION_RESCUE']);
    expect(zhang.sourceReference?.sourceConclusion).toBe('以本身之合為救應');
    expect(zhang.historicalAgreementEvaluated).toBe(false);
  });

  it('does not fabricate source-local conclusions or an exact birth input for partial historical cases', () => {
    for (const caseId of [
      'JIA-CHEN-GUI-SHEN-ZI',
      'REN-WEI-JI-HAI-MAO',
      'LI-GUOJIE-WEI-JIAXU',
    ]) {
      const item = buildR083SourceProvidedPreflightCase(caseId);
      expect(item.status).toBe('INPUT_NOT_AVAILABLE_FOR_FACT_OBSERVATION');
      expect(item.sourcePrintedPillars).toBeUndefined();
      expect(item.sourceFactObservation).toBeUndefined();
      expect(item.requiredNextEvidence).toContain('FOUR_PRINTED_PILLARS_NOT_AVAILABLE');
    }
    const yuan = buildR083SourceProvidedPreflightCase('YUAN-SHIKAI-MAO-LUCK');
    expect(yuan.sourceInputStatus).toBe('PRINTED_CHART_ONLY');
    expect(yuan.sourceReference).toBeUndefined();
    expect(yuan.sourceFactObservation?.visibleStemRoles).toHaveLength(3);
    expect(yuan.requiredNextEvidence).toContain('R081_SOURCE_LOCAL_CONCLUSION_NOT_REGISTERED');
    expect(yuan.requiredNextEvidence).toContain('HISTORICAL_BIRTH_INPUT_AND_POLICY_INCOMPLETE');
    expect(yuan.historicalAgreementEvaluated).toBe(false);
  });

  it('scopes a single case without inventing extra cases, changing source witness or allowing unknown IDs', () => {
    const item = buildR083SourceProvidedPreflightCase('ZHANG-ZAIYANG-RESCUE');
    const scoped = buildR083ClassicalReplayPreflightReport(item.caseId);
    expect(scoped.cases).toEqual([item]);
    expect(scoped.summary.caseCount).toBe(1);
    expect(scoped.summary.governedInterpretationRunCount).toBe(0);
    expect(scoped.reportContentHash).not.toBe(
      buildR083ClassicalReplayPreflightReport().reportContentHash,
    );
    expect(() => buildR083ClassicalReplayPreflightReport('UNREGISTERED'))
      .toThrow(TypeError);
  });
});
