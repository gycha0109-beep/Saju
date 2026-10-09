import { describe, expect, it } from 'vitest';
import {
  FR311_AUTHORITY_BOUNDARY,
  TRADITIONAL_INTERPRETATION_RULES_FR311,
  TRADITIONAL_MORPHOLOGY_TERMS_FR311,
  TRADITIONAL_NAMED_FORMS_FR311,
  assertTraditionalEyebrowEyeResearchFR311,
  queryTraditionalCombinationFR311,
} from './traditional-eyebrow-eye-interpretation-fr311.js';

describe('FR311 eyebrow-eye traditional interpretation research', () => {
  it('catalogues 24 eyebrow forms and 39 eye forms without flattening them into neutral morphology', () => {
    const browForms = TRADITIONAL_NAMED_FORMS_FR311.filter((entry) => entry.region === 'eyebrow');
    const eyeForms = TRADITIONAL_NAMED_FORMS_FR311.filter((entry) => entry.region === 'eye');

    expect(browForms).toHaveLength(24);
    expect(eyeForms).toHaveLength(39);
    expect(browForms.map((entry) => entry.traditionalLabel)).toContain('一字眉');
    expect(eyeForms.map((entry) => entry.traditionalLabel)).toContain('鳳眼');

    for (const entry of TRADITIONAL_NAMED_FORMS_FR311) {
      expect(entry.neutralAliasAuthorized).toBe(false);
    }
  });

  it('keeps 平 as a source morphology term rather than equating it to 一字眉', () => {
    const flat = TRADITIONAL_MORPHOLOGY_TERMS_FR311.find((entry) => entry.termKey === 'brow.flat');
    const oneCharacter = TRADITIONAL_NAMED_FORMS_FR311.find(
      (entry) => entry.formKey === 'eyebrow.named.one_character',
    );

    expect(flat?.sourceExpression).toBe('平');
    expect(oneCharacter?.traditionalLabel).toBe('一字眉');
    expect(oneCharacter?.neutralAliasAuthorized).toBe(false);
  });

  it('preserves direct eyebrow interpretations as source-local research records', () => {
    const byId = new Map(TRADITIONAL_INTERPRETATION_RULES_FR311.map((entry) => [entry.ruleId, entry] as const));

    expect(byId.get('fr311.brow.fine_flat_broad_refined_long')?.morphologyTermKeys).toEqual([
      'brow.fine',
      'brow.flat',
      'brow.broad',
      'brow.refined',
      'brow.long',
    ]);
    expect(byId.get('fr311.brow.heads_meet')?.topicKeys).toEqual(['wealth', 'siblings']);
    expect(byId.get('fr311.brow.tail_down')?.topicKeys).toEqual(['temperament']);

    for (const rule of TRADITIONAL_INTERPRETATION_RULES_FR311.filter((entry) => entry.regionScope === 'eyebrow')) {
      expect(rule.productInterpretationAuthorized).toBe(false);
      expect(rule.modernScientificFactAuthorized).toBe(false);
    }
  });

  it('reuses scan-checked eye lineage for the selected Daruma eye clauses', () => {
    const selected = TRADITIONAL_INTERPRETATION_RULES_FR311.filter((entry) =>
      [
        'fr311.eye.refined_long',
        'fr311.eye.large_bright',
        'fr311.eye.triangular',
        'fr311.eye.one_cun_long',
        'fr311.eye.tail_down',
        'fr311.combo.eye_short_brow_long',
      ].includes(entry.ruleId),
    );

    expect(selected).toHaveLength(6);
    for (const rule of selected) {
      expect(rule.verificationState).toBe('existing_scan_checked_repository_lineage');
      expect(rule.sourceRefs).toContain('witness.shenxiang_quanbian.nlc_1925');
      expect(rule.sourceRefs).toContain('github:issue/625');
    }
  });

  it('allows lookup of an exact source combination but never synthesizes a new one', () => {
    const sourced = queryTraditionalCombinationFR311(['eye.short', 'brow.long']);
    expect(sourced.status).toBe('direct_source_rule_found');
    expect(sourced.matchedRuleIds).toEqual(['fr311.combo.eye_short_brow_long']);
    expect(sourced.synthesisAuthorized).toBe(false);

    const unsupported = queryTraditionalCombinationFR311(['brow.flat', 'eye.tail_down']);
    expect(unsupported.status).toBe('unsupported_no_direct_source_combination');
    expect(unsupported.matchedRuleIds).toEqual([]);
    expect(unsupported.synthesisAuthorized).toBe(false);
  });

  it('keeps all metric, provider, modern-fact, and product authority closed', () => {
    expect(() => assertTraditionalEyebrowEyeResearchFR311()).not.toThrow();

    for (const term of TRADITIONAL_MORPHOLOGY_TERMS_FR311) {
      expect(term.directMetricBindingAuthorized).toBe(false);
    }

    expect(FR311_AUTHORITY_BOUNDARY).toEqual({
      namedFormEqualsNeutralMorphologyAuthorized: false,
      unsupportedCrossRegionSynthesisAuthorized: false,
      metricThresholdAuthorized: false,
      providerGeometryBindingAuthorized: false,
      modernPsychologyOrMedicalFactAuthorized: false,
      productInterpretationAuthorized: false,
    });
  });
});
