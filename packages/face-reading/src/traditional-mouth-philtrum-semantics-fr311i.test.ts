import { describe, expect, it } from 'vitest';
import {
  FR311I_SEMANTIC_SUMMARY,
  FR311I_SOURCE_BOUNDARY,
  MOUTH_NAMED_FORM_SEMANTICS_FR311I,
  MOUTH_PHILTRUM_DIRECT_RULES_FR311I,
  MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I,
  assertMouthPhiltrumTraditionalSemanticsFR311I,
} from './traditional-mouth-philtrum-semantics-fr311i.js';

describe('FR311I mouth, lip, and philtrum traditional semantics', () => {
  it('registers the expected source-grounded corpus scale', () => {
    expect(() => assertMouthPhiltrumTraditionalSemanticsFR311I()).not.toThrow();
    expect(FR311I_SEMANTIC_SUMMARY).toEqual({
      traditionalRegions: 6,
      directRules: 104,
      philtrumDirectRules: 34,
      mouthNamedForms: 16,
      namedFormDescriptors: 43,
      namedFormClaims: 45,
    });
    expect(MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I).toHaveLength(6);
    expect(MOUTH_NAMED_FORM_SEMANTICS_FR311I).toHaveLength(16);
  });

  it('keeps the philtrum deep-long lifespan wording as historical doctrine only', () => {
    const rule = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.philtrum.deep_long',
    );
    expect(rule).toMatchObject({
      sourceExpression: '深而長者長壽',
      topicKeys: ['longevity'],
      polarity: 'favorable',
      lifespanPredictionAuthorized: false,
      modernScientificFactAuthorized: false,
    });
  });

  it('preserves opposing philtrum lifespan rules without cancellation', () => {
    const favorable = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.philtrum.deep_long',
    );
    const challenging = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.philtrum.shallow_short',
    );
    expect(favorable?.polarity).toBe('favorable');
    expect(challenging?.polarity).toBe('challenging');
    expect(challenging?.sourceExpression).toBe('淺而短者夭亡');
  });

  it('keeps source-uncertain philtrum conduct wording explicitly uncertain', () => {
    const rule = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.philtrum.broad_thick',
    );
    expect(rule?.certainty).toBe('phrase_uncertain');
    expect(rule?.personalityFactAuthorized).toBe(false);
    expect(rule?.criminalityInferenceAuthorized).toBe(false);
  });

  it('registers all sixteen named mouth forms from the source sequence', () => {
    expect(MOUTH_NAMED_FORM_SEMANTICS_FR311I.map((item) => item.traditionalLabel)).toEqual([
      '四字口',
      '方口',
      '仰月口',
      '彎弓口',
      '牛口',
      '龍口',
      '虎口',
      '羊口',
      '豬口',
      '吹火口',
      '皺紋口',
      '櫻桃口',
      '猴口',
      '鯰魚口',
      '鯽魚口',
      '覆船口',
    ]);
  });

  it('keeps Monkey-mouth philtrum wording as context rather than mouth morphology', () => {
    const monkey = MOUTH_NAMED_FORM_SEMANTICS_FR311I.find(
      (item) => item.formKey === 'mouth.named.monkey',
    );
    const context = monkey?.descriptors.find(
      (item) => item.sourceFragment === '人中破竹更為良',
    );
    expect(context?.region).toBe('context');
    expect(context?.neutralGeometryBindingAuthorized).toBe(false);
    expect(monkey?.claims.some((item) => item.sourceFragment === '鶴算龜齡')).toBe(true);
  });

  it('keeps Cherry-mouth teeth wording as context', () => {
    const cherry = MOUTH_NAMED_FORM_SEMANTICS_FR311I.find(
      (item) => item.formKey === 'mouth.named.cherry',
    );
    expect(cherry?.descriptors.find(
      (item) => item.sourceFragment === '齒似榴牙密且宜',
    )?.region).toBe('context');
    expect(cherry?.claims.some(
      (item) => item.topicKey === 'learning_talent' && item.sourceFragment === '聰明拔萃',
    )).toBe(true);
  });

  it('preserves early versus late claims inside Wrinkled-mouth without flattening them', () => {
    const wrinkled = MOUTH_NAMED_FORM_SEMANTICS_FR311I.find(
      (item) => item.formKey === 'mouth.named.wrinkled',
    );
    expect(wrinkled?.claims.some(
      (item) =>
        item.topicKey === 'life_course' &&
        item.lifeStage === 'early' &&
        item.polarity === 'favorable' &&
        item.sourceFragment === '早年安樂',
    )).toBe(true);
    expect(wrinkled?.claims.some(
      (item) =>
        item.topicKey === 'life_course' &&
        item.lifeStage === 'late' &&
        item.polarity === 'challenging' &&
        item.sourceFragment === '末年敗',
    )).toBe(true);
  });

  it('keeps lip color claims non-medical and non-predictive', () => {
    const dark = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.lip.dark_black',
    );
    expect(dark?.sourceExpression).toBe('色昏黑者苦疾惡死');
    expect(dark?.topicKeys).toEqual(['traditional_health', 'longevity']);
    expect(dark?.healthDiagnosisAuthorized).toBe(false);
    expect(dark?.lifespanPredictionAuthorized).toBe(false);
  });

  it('keeps conduct and personality statements historical rather than factual authority', () => {
    const pig = MOUTH_NAMED_FORM_SEMANTICS_FR311I.find(
      (item) => item.formKey === 'mouth.named.pig',
    );
    expect(pig?.claims.some((item) => item.sourceFragment === '心奸險')).toBe(true);
    expect(pig?.claims.every(
      (item) =>
        item.personalityFactAuthorized === false &&
        item.criminalityInferenceAuthorized === false &&
        item.modernScientificFactAuthorized === false,
    )).toBe(true);
  });

  it('classifies morphology, color, marks, lines, dynamics, and cross-region context separately', () => {
    const kinds = new Set(MOUTH_PHILTRUM_DIRECT_RULES_FR311I.map((item) => item.observationKind));
    expect(kinds).toEqual(new Set([
      'morphology',
      'color',
      'surface_mark',
      'wrinkle_or_line',
      'dynamic_behavior',
      'cross_region_context',
    ]));

    const monkey = MOUTH_NAMED_FORM_SEMANTICS_FR311I.find(
      (item) => item.formKey === 'mouth.named.monkey',
    );
    expect(monkey?.descriptors.find(
      (item) => item.sourceFragment === '人中破竹更為良',
    )?.observationKind).toBe('cross_region_context');
  });

  it('preserves philtrum marks and lines without granting fertility or child-sex prediction authority', () => {
    const upperMark = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.philtrum.upper_black_mark_many_children',
    );
    const leftRight = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.philtrum.left_right_child_sex',
    );
    const horizontal = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.philtrum.horizontal_line_no_children',
    );

    expect(upperMark?.observationKind).toBe('surface_mark');
    expect(horizontal?.observationKind).toBe('wrinkle_or_line');
    expect(leftRight?.sourceExpression).toBe('偏左生兒右生女');

    for (const rule of [upperMark, leftRight, horizontal]) {
      expect(rule?.fertilityPredictionAuthorized).toBe(false);
      expect(rule?.childSexPredictionAuthorized).toBe(false);
      expect(rule?.modernScientificFactAuthorized).toBe(false);
    }
  });

  it('preserves mouth surface and dynamic evidence as source-local rules', () => {
    const blackMark = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.mouth.black_mark_food',
    );
    const lipMoves = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.mouth.lip_moves_before_speech',
    );
    const tongueContext = MOUTH_PHILTRUM_DIRECT_RULES_FR311I.find(
      (item) => item.ruleId === 'fr311i.mouth.large_tongue_small_mouth',
    );

    expect(blackMark?.observationKind).toBe('surface_mark');
    expect(lipMoves?.observationKind).toBe('dynamic_behavior');
    expect(tongueContext?.observationKind).toBe('cross_region_context');
  });

  it('keeps all automatic observation and product bridges closed', () => {
    expect(FR311I_SOURCE_BOUNDARY).toEqual({
      mouthOfficerBaselineSourceRef: 'witness.gujin473.art632.wikisource',
      semanticSourceRef: 'witness.gujin473.art634.wikisource',
      neutralGeometryEqualsTraditionalRegion: false,
      providerLandmarkBindingAuthorized: false,
      metricThresholdAuthorized: false,
      namedFormClassifierAuthorized: false,
      colorMedicalInferenceAuthorized: false,
      markOrLineProductionInterpretationAuthorized: false,
      healthDiagnosisAuthorized: false,
      lifespanPredictionAuthorized: false,
      fertilityPredictionAuthorized: false,
      childSexPredictionAuthorized: false,
      personalityFactAuthorized: false,
      criminalityInferenceAuthorized: false,
      modernScientificFactAuthorized: false,
      productInterpretationAuthorized: false,
    });
  });
});
