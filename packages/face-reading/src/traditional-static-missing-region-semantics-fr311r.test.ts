import { describe, expect, it } from 'vitest';
import {
  FR311R_STATIC_REGION_AUTHORITY_BOUNDARY,
  FR311R_STATIC_REGION_SUMMARY,
  STATIC_MISSING_REGION_DIRECT_RULES_FR311R,
  STATIC_TRADITIONAL_REGIONS_FR311R,
  assertStaticMissingRegionSemanticsFR311R,
} from './traditional-static-missing-region-semantics-fr311r.js';

describe('FR311R missing static face-region semantics', () => {
  it('closes the explicit forehead, cheekbone, chin/lower-face and whole-face region gap', () => {
    assertStaticMissingRegionSemanticsFR311R();

    expect(FR311R_STATIC_REGION_SUMMARY).toEqual({
      traditionalRegions: 7,
      directRules: 24,
      foreheadRules: 10,
      cheekboneRules: 4,
      chinLowerFaceRules: 8,
      wholeFaceRules: 2,
    });

    expect(
      STATIC_TRADITIONAL_REGIONS_FR311R.map((item) => item.regionKey).sort(),
    ).toEqual([
      'cheekbone_pair',
      'chin',
      'forehead',
      'jaw_lower_face',
      'left_cheekbone',
      'right_cheekbone',
      'whole_face',
    ]);
  });

  it('keeps every rule source-backed and historical-doctrine-only', () => {
    for (const rule of STATIC_MISSING_REGION_DIRECT_RULES_FR311R) {
      expect(rule.sourceExpression.trim().length, rule.ruleId).toBeGreaterThan(0);
      expect(rule.sourceRefs.length, rule.ruleId).toBeGreaterThan(0);
      expect(rule.historicalTraditionalDoctrineOnly, rule.ruleId).toBe(true);
      expect(rule.modernScientificFactAuthorized, rule.ruleId).toBe(false);
      expect(rule.healthDiagnosisAuthorized, rule.ruleId).toBe(false);
      expect(rule.lifespanPredictionAuthorized, rule.ruleId).toBe(false);
      expect(rule.parentOutcomePredictionAuthorized, rule.ruleId).toBe(false);
      expect(rule.personalityFactAuthorized, rule.ruleId).toBe(false);
      expect(rule.moralityFactAuthorized, rule.ruleId).toBe(false);
      expect(rule.criminalityFactAuthorized, rule.ruleId).toBe(false);
      expect(rule.productInterpretationAuthorized, rule.ruleId).toBe(false);
    }
  });

  it('does not convert traditional regions into neutral geometry or numeric classification', () => {
    for (const region of STATIC_TRADITIONAL_REGIONS_FR311R) {
      expect(region.neutralGeometryBindingAuthorized, region.regionKey)
        .toBe(false);
    }

    for (const rule of STATIC_MISSING_REGION_DIRECT_RULES_FR311R) {
      expect(rule.neutralGeometryBindingAuthorized, rule.ruleId).toBe(false);
      expect(rule.metricThresholdAuthorized, rule.ruleId).toBe(false);
      expect(rule.populationNormAuthorized, rule.ruleId).toBe(false);
    }
  });

  it('keeps all global authority gates closed', () => {
    for (const [key, value] of Object.entries(
      FR311R_STATIC_REGION_AUTHORITY_BOUNDARY,
    )) {
      expect(value, key).toBe(false);
    }
  });
});
