import { describe, expect, it } from 'vitest';
import {
  FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL,
} from './traditional-empirical-admission-protocol-design-fr312d.js';
import {
  FR312E_ANNOTATION_CONTRACT,
  FR312E_ANNOTATION_LABELS,
  FR312E_ANNOTATOR_CARDS,
  FR312E_AUTHORITY_BOUNDARY,
  FR312E_CANONICAL_MORPHOLOGY_PREDICATES,
  FR312E_RULE_OBSERVATION_CONTRACTS,
  FR312E_SOURCE_MORPHOLOGY_CLAUSES,
  assertMorphologyOnlyAnnotationSpecFR312E,
} from './traditional-morphology-only-annotation-spec-fr312e.js';

describe('FR312E morphology-only annotation specification', () => {
  it('covers all ten FR312D pilot candidate rules and fails on candidate drift', () => {
    expect(() => assertMorphologyOnlyAnnotationSpecFR312E()).not.toThrow();

    const expected = [
      ...FR312D_MORPHOLOGY_ONLY_PILOT_PROTOCOL.candidateRuleIds,
    ].sort();
    const clauseRules = [
      ...new Set(
        FR312E_SOURCE_MORPHOLOGY_CLAUSES.map((item) => item.sourceRuleId),
      ),
    ].sort();
    const contractRules = FR312E_RULE_OBSERVATION_CONTRACTS
      .map((item) => item.ruleId)
      .sort();

    expect(expected).toHaveLength(10);
    expect(clauseRules).toEqual(expected);
    expect(contractRules).toEqual(expected);
  });

  it('splits ten source rules into eleven source clauses and ten canonical predicates', () => {
    expect(FR312E_SOURCE_MORPHOLOGY_CLAUSES).toHaveLength(11);
    expect(FR312E_CANONICAL_MORPHOLOGY_PREDICATES).toHaveLength(10);
    expect(FR312E_RULE_OBSERVATION_CONTRACTS).toHaveLength(10);
    expect(FR312E_ANNOTATOR_CARDS).toHaveLength(10);

    const predicateIds = FR312E_CANONICAL_MORPHOLOGY_PREDICATES
      .map((item) => item.predicateId);
    expect(new Set(predicateIds).size).toBe(10);
  });

  it('preserves source provenance while hiding historical semantic tails from annotators', () => {
    const expected = new Map<
      string,
      readonly [string, readonly string[], readonly string[]]
    >([
      [
        'fr311i.philtrum.thin_narrow',
        ['細而狹者，衣食逼迫', ['細而狹'], ['衣食逼迫']],
      ],
      [
        'fr311i.mouth.small_short',
        ['口小而短者貧', ['口小而短'], ['貧']],
      ],
      [
        'fr311i.mouth.corners_droop_bad_speech',
        ['兩角低垂說惡聲', ['兩角低垂'], ['說惡聲']],
      ],
      [
        'fr311i.lip.upper_thin',
        ['上脣薄者言語狡詐', ['上脣薄'], ['言語狡詐']],
      ],
      [
        'fr311i.lip.lower_thin',
        ['下脣薄者，貧賤蹇滯', ['下脣薄'], ['貧賤蹇滯']],
      ],
      [
        'fr311i.lip.both_thick',
        ['上下俱厚者，忠信之人', ['上下俱厚'], ['忠信之人']],
      ],
      [
        'fr311i.lip.both_thin',
        ['上下俱薄者，妄語', ['上下俱薄'], ['妄語']],
      ],
      [
        'fr311i.lip.upper_thick_short_life',
        ['上脣厚，命非久', ['上脣厚'], ['命非久']],
      ],
      [
        'fr311i.lip.lower_thin_gluttony',
        ['下脣薄，主貪食', ['下脣薄'], ['主貪食']],
      ],
      [
        'fr311i.lip.thick_quiet_thin_litigious',
        ['脣厚少語薄多訟', ['脣厚', '薄'], ['少語', '多訟']],
      ],
    ] as const);

    for (const rule of FR312E_RULE_OBSERVATION_CONTRACTS) {
      const row = expected.get(rule.ruleId);
      expect(row, rule.ruleId).toBeDefined();
      expect(rule.fullHistoricalSourceExpression).toBe(row?.[0]);

      const clauses = FR312E_SOURCE_MORPHOLOGY_CLAUSES
        .filter((item) => item.sourceRuleId === rule.ruleId);
      expect(clauses.map((item) => item.sourceMorphologyFragment))
        .toEqual(row?.[1]);
      expect(clauses.map((item) => item.semanticFragmentHiddenFromAnnotator))
        .toEqual(row?.[2]);

      expect(rule.annotationSemanticLeakProhibited).toBe(true);
      expect(rule.metricLeakProhibited).toBe(true);
      expect(rule.thresholdProhibited).toBe(true);
      expect(rule.empiricalExecutionAuthorized).toBe(false);
    }
  });

  it('deduplicates repeated lower-lip-thin morphology without merging source semantics', () => {
    const lowerThin = FR312E_SOURCE_MORPHOLOGY_CLAUSES
      .filter((item) => item.sourceMorphologyFragment === '下脣薄');

    expect(lowerThin).toHaveLength(2);
    expect(lowerThin.map((item) => item.sourceRuleId).sort()).toEqual([
      'fr311i.lip.lower_thin',
      'fr311i.lip.lower_thin_gluttony',
    ]);
    expect(
      new Set(lowerThin.map((item) => item.canonicalPredicateId)).size,
    ).toBe(1);
    expect(
      new Set(
        lowerThin.map((item) => item.semanticFragmentHiddenFromAnnotator),
      ).size,
    ).toBe(2);
  });

  it('splits the compact thick-versus-thin source rule into two morphology clauses', () => {
    const clauses = FR312E_SOURCE_MORPHOLOGY_CLAUSES
      .filter((item) =>
        item.sourceRuleId === 'fr311i.lip.thick_quiet_thin_litigious');

    expect(clauses).toHaveLength(2);
    expect(clauses.map((item) => item.sourceMorphologyFragment))
      .toEqual(['脣厚', '薄']);
    expect(clauses.map((item) => item.semanticFragmentHiddenFromAnnotator))
      .toEqual(['少語', '多訟']);
    expect(
      new Set(clauses.map((item) => item.canonicalPredicateId)).size,
    ).toBe(2);

    const canonicalThin = FR312E_CANONICAL_MORPHOLOGY_PREDICATES.find(
      (item) => item.predicateId === 'fr312e.lips_unspecified.thin',
    );
    expect(canonicalThin?.morphologyFragment).toBe('脣薄');
  });

  it('keeps compound source predicates intact instead of inventing independent dimensions', () => {
    const philtrum = FR312E_CANONICAL_MORPHOLOGY_PREDICATES.find(
      (item) => item.predicateId === 'fr312e.philtrum.thin_and_narrow',
    );
    const mouth = FR312E_CANONICAL_MORPHOLOGY_PREDICATES.find(
      (item) => item.predicateId === 'fr312e.mouth.small_and_short',
    );
    const bothThick = FR312E_CANONICAL_MORPHOLOGY_PREDICATES.find(
      (item) => item.predicateId === 'fr312e.lips_pair.both_thick',
    );

    expect(philtrum?.compoundDescriptor).toBe(true);
    expect(philtrum?.morphologyFragment).toBe('細而狹');
    expect(mouth?.compoundDescriptor).toBe(true);
    expect(mouth?.morphologyFragment).toBe('口小而短');
    expect(bothThick?.compoundDescriptor).toBe(true);
  });

  it('uses the required four annotation states and separates indeterminate from not observable', () => {
    expect(FR312E_ANNOTATION_LABELS).toEqual([
      'present',
      'absent',
      'indeterminate',
      'not_observable',
    ]);
    expect(FR312E_ANNOTATION_CONTRACT.labels)
      .toEqual(FR312E_ANNOTATION_LABELS);

    for (const predicate of FR312E_CANONICAL_MORPHOLOGY_PREDICATES) {
      expect(predicate.indeterminateGuidance).toContain('indeterminate');
      expect(predicate.notObservableGuidance).toContain('not_observable');
    }
  });

  it('defines qualitative capture validity without introducing degree or pixel thresholds', () => {
    for (const rule of FR312E_RULE_OBSERVATION_CONTRACTS) {
      expect(rule.requiredCaptureState).toEqual([
        'frontal_or_near_frontal',
        'neutral_resting_expression',
        'mouth_closed_without_deliberate_pursing_or_compression',
        'target_region_fully_visible',
        'adequate_focus_and_resolution',
        'no_shape_distorting_filter',
      ]);

      expect(rule.forbiddenCaptureStates).toContain('mouth_open');
      expect(rule.forbiddenCaptureStates).toContain('speaking');
      expect(rule.forbiddenCaptureStates)
        .toContain('smile_or_exaggerated_expression');
      expect(rule.forbiddenCaptureStates).toContain('lip_pursing');
      expect(rule.forbiddenCaptureStates)
        .toContain('deliberate_lip_compression');
      expect(rule.forbiddenCaptureStates)
        .toContain('material_head_yaw_or_pitch');
      expect(rule.forbiddenCaptureStates).toContain('target_region_occluded');
      expect(rule.forbiddenCaptureStates).toContain('target_region_cropped');
      expect(rule.forbiddenCaptureStates)
        .toContain('shape_distorting_filter');
      expect(rule.forbiddenCaptureStates).toContain('insufficient_resolution');
      expect(rule.forbiddenCaptureStates).toContain('motion_or_focus_blur');
      expect(rule.thresholdProhibited).toBe(true);
    }
  });

  it('creates annotator cards that cannot expose metrics, semantic tails, predictions, or product outcomes', () => {
    for (const card of FR312E_ANNOTATOR_CARDS) {
      const raw = card as unknown as Record<string, unknown>;

      expect('fullHistoricalSourceExpression' in raw).toBe(false);
      expect('semanticFragmentHiddenFromAnnotator' in raw).toBe(false);
      expect('neutralComparatorKey' in raw).toBe(false);
      expect('modelPrediction' in raw).toBe(false);
      expect('existingTraditionalClassification' in raw).toBe(false);
      expect('productResult' in raw).toBe(false);
      expect('otherAnnotatorAnswer' in raw).toBe(false);
      expect('thresholdCandidate' in raw).toBe(false);
    }

    expect(FR312E_ANNOTATION_CONTRACT.semanticClaimVisibleToAnnotator)
      .toBe(false);
    expect(FR312E_ANNOTATION_CONTRACT.neutralMetricVisibleToAnnotator)
      .toBe(false);
    expect(
      FR312E_ANNOTATION_CONTRACT.comparatorCalculationVisibleToAnnotator,
    ).toBe(false);
    expect(FR312E_ANNOTATION_CONTRACT.modelPredictionVisibleToAnnotator)
      .toBe(false);
    expect(
      FR312E_ANNOTATION_CONTRACT
        .existingTraditionalClassificationVisibleToAnnotator,
    ).toBe(false);
    expect(FR312E_ANNOTATION_CONTRACT.productResultVisibleToAnnotator)
      .toBe(false);
    expect(FR312E_ANNOTATION_CONTRACT.otherAnnotatorAnswerVisibleToAnnotator)
      .toBe(false);
    expect(FR312E_ANNOTATION_CONTRACT.thresholdCandidateVisibleToAnnotator)
      .toBe(false);
  });

  it('keeps empirical, threshold, binding, score, and product authority closed', () => {
    expect(FR312E_ANNOTATION_CONTRACT.numericThresholdAuthorized).toBe(false);
    expect(FR312E_ANNOTATION_CONTRACT.empiricalExecutionAuthorized).toBe(false);
    expect(
      FR312E_ANNOTATION_CONTRACT.automaticTraditionalBindingAuthorized,
    ).toBe(false);

    for (const predicate of FR312E_CANONICAL_MORPHOLOGY_PREDICATES) {
      expect(predicate.annotationSemanticLeakProhibited).toBe(true);
      expect(predicate.metricLeakProhibited).toBe(true);
      expect(predicate.thresholdProhibited).toBe(true);
      expect(predicate.empiricalExecutionAuthorized).toBe(false);
      expect(predicate.automaticLabelAuthorized).toBe(false);
    }

    for (const [key, value] of Object.entries(FR312E_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
