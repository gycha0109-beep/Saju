import { describe, expect, it } from 'vitest';
import { R081_EXAMPLES } from
  '../src/research/general-natal-classical-worked-example-corpus.js';
import {
  compareR083SourceTagsToT0Candidates,
  R083_SOURCE_TAG_T0_CONCORDANCE_VERSION,
} from '../src/research/general-natal-classical-t0-source-tag-concordance.js';

describe('R083 classical source tags versus exact T0 printed-structure observations', () => {
  it('matches 4 bounded literal source tags without claiming a historical 格局 verdict', () => {
    const assertions = [
      {
        caseId: 'WU-TINGFANG-FOLLOW-KILL',
        tags: ['HAI_MAO_WEI_WOOD_MEETING', 'DING_REN_TRANSFORMATION_CLAIM'],
        notEvaluated: ['FOLLOW_KILL'],
        expectedSlots: [
          ['sourceProvidedChart.pillars.day', 'sourceProvidedChart.pillars.hour',
            'sourceProvidedChart.pillars.month'],
          ['sourceProvidedChart.pillars.month', 'sourceProvidedChart.pillars.year'],
        ],
      },
      {
        caseId: 'WANG-KEMIN-WATER-MEETING',
        tags: ['SHEN_ZI_CHEN_WATER_MEETING'],
        notEvaluated: ['STRUCTURAL_CHANGE', 'HURTING_OFFICER_GENERATES_WEALTH'],
        expectedSlots: [[
          'sourceProvidedChart.pillars.day', 'sourceProvidedChart.pillars.month',
          'sourceProvidedChart.pillars.year',
        ]],
      },
      {
        caseId: 'ZHANG-ZAIYANG-RESCUE',
        tags: ['YI_GENG_COMBINATION_RESCUE'],
        notEvaluated: ['HURTING_CONTROLS_KILL', 'WEALTH_FEEDS_KILL_CONTAMINATION'],
        expectedSlots: [[
          'sourceProvidedChart.pillars.day', 'sourceProvidedChart.pillars.month',
        ]],
      },
    ] as const;
    let matched = 0;
    for (const expected of assertions) {
      const result = compareR083SourceTagsToT0Candidates(expected.caseId);
      expect(result.version).toBe(R083_SOURCE_TAG_T0_CONCORDANCE_VERSION);
      expect(result.caseId).toBe(expected.caseId);
      expect(result.status).toBe('STRUCTURAL_TAGS_CHECKED');
      expect(result.checkedSourceMechanisms.map(item => item.sourceMechanismTag))
        .toEqual(expected.tags);
      expect(result.unassessedSourceMechanismTags).toEqual(expected.notEvaluated);
      for (const [index, item] of result.checkedSourceMechanisms.entries()) {
        matched += 1;
        expect(item.comparison).toBe('T0_CANDIDATE_PRESENT');
        expect(item.matchingStructuralRelationIds.length).toBeGreaterThan(0);
        expect(item.matchingSourceFactPaths).toEqual(expected.expectedSlots[index]);
        expect(item.sourceSemanticsNotTested.length).toBeGreaterThan(0);
        expect(item.structuralOnly).toBe(true);
        expect(item.compositionOrTransformationProven).toBe(false);
        expect(item.originalSourceConclusionProven).toBe(false);
      }
      expect(result.resultMeaning).toBe('LITERAL_STRUCTURAL_MATCH_ONLY');
      expect(result.classicalInterpretationReplayed).toBe(false);
      expect(result.engineInterpretationCompared).toBe(false);
      expect(result.sourceOutcomeConfirmed).toBe(false);
      expect(result.mayConstructCanonicalSnapshot).toBe(false);
      expect(result.mayGrantOfficialAuthority).toBe(false);
      expect(result.mayPublish).toBe(false);
      expect(result.mayPersist).toBe(false);
      expect(result.maySell).toBe(false);
      expect(compareR083SourceTagsToT0Candidates(expected.caseId)).toEqual(result);
    }
    expect(matched).toBe(4);
  });

  it('preserves the unsupported claims rather than treating no T0 match as a false historical statement', () => {
    const xiao = compareR083SourceTagsToT0Candidates('XIAO-YAONAN-BLADE-KILL');
    expect(xiao.status).toBe('NO_TESTABLE_STRUCTURAL_SOURCE_TAGS');
    expect(xiao.checkedSourceMechanisms).toEqual([]);
    expect(xiao.unassessedSourceMechanismTags).toEqual([
      'YANG_BLADE', 'SHEN_METAL_CONTROL', 'BLADE_KILL',
    ]);
    expect(xiao.classicalInterpretationReplayed).toBe(false);

    const yuan = compareR083SourceTagsToT0Candidates('YUAN-SHIKAI-MAO-LUCK');
    expect(yuan.status).toBe('NO_TESTABLE_STRUCTURAL_SOURCE_TAGS');
    expect(yuan.checkedSourceMechanisms).toEqual([]);
    expect(yuan.unassessedSourceMechanismTags).toEqual([]);
    expect(yuan.evidenceSource).toBe('R081_R082_PRINTED_CHART_AND_EXISTING_T0_MATCHER');
    expect(yuan.sourceOutcomeConfirmed).toBe(false);
  });

  it('requires an actual registered four-pillar printed source, never schematic extrapolation', () => {
    for (const id of [
      'JIA-CHEN-GUI-SHEN-ZI',
      'REN-WEI-JI-HAI-MAO',
      'LI-GUOJIE-WEI-JIAXU',
      'UNREGISTERED',
    ]) {
      expect(() => compareR083SourceTagsToT0Candidates(id)).toThrow(TypeError);
    }
  });

  it('does not promote any of the six R081 source-local conclusions into engine ground truth', () => {
    const examples = R081_EXAMPLES.filter(item => item.kind === 'NAMED_COMMENTARY_EXAMPLE');
    for (const example of examples) {
      const report = compareR083SourceTagsToT0Candidates(example.id);
      expect(report.caseId).toBe(example.id);
      expect(report.classicalInterpretationReplayed).toBe(false);
      expect(report.sourceOutcomeConfirmed).toBe(false);
      expect(report.checkedSourceMechanisms.every(item =>
        item.compositionOrTransformationProven === false &&
        item.originalSourceConclusionProven === false)).toBe(true);
    }
  });
});
