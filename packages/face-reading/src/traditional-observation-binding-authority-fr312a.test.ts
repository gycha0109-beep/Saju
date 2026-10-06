import { describe, expect, it } from 'vitest';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
  EAR_NAMED_FORM_EVIDENCE_FR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  FR311P_EVIDENCE_INVENTORY,
} from './traditional-face-evidence-integrity-fr311p.js';
import {
  FACE_LENS_GAP_ADJUDICATIONS_FR311Q,
  FR311Q_GAP_SUMMARY,
} from './traditional-face-lens-gap-adjudication-fr311q.js';
import {
  FR312A_AUTHORITY_BOUNDARY,
  FR312A_BINDING_SUMMARY,
  NEUTRAL_OBSERVATION_SURFACE_FR312A,
  TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A,
  assertTraditionalObservationBindingAuthorityFR312A,
} from './traditional-observation-binding-authority-fr312a.js';

describe('FR312A observation-to-traditional binding authority', () => {
  it('freezes the current neutral observation surface without semantic promotion', () => {
    assertTraditionalObservationBindingAuthorityFR312A();

    expect(NEUTRAL_OBSERVATION_SURFACE_FR312A).toHaveLength(29);
    expect(
      NEUTRAL_OBSERVATION_SURFACE_FR312A.filter(
        (item) => item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(
      NEUTRAL_OBSERVATION_SURFACE_FR312A.filter(
        (item) => item.implementationState !== 'canonical_extractor_materialized',
      ),
    ).toHaveLength(11);

    for (const item of NEUTRAL_OBSERVATION_SURFACE_FR312A) {
      expect(item.neutralObservationOnly, item.featureKey).toBe(true);
      expect(item.traditionalBindingIssued, item.featureKey).toBe(false);
      expect(item.classificationIssued, item.featureKey).toBe(false);
      expect(item.thresholdIssued, item.featureKey).toBe(false);
    }
  });

  it('covers the entire FR311 target inventory exactly once', () => {
    expect(FR312A_BINDING_SUMMARY).toMatchObject({
      namedForms: 119,
      namedClaims: 348,
      directRules: 230,
      relationKeys: 24,
      combinationKeys: 20,
      traditionalTargetCount: 741,
    });

    expect(
      new Set(
        TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.map(
          (item) => item.targetKind + ':' + item.targetId,
        ),
      ).size,
    ).toBe(741);
  });

  it('authorizes zero automatic direct traditional bindings', () => {
    expect(FR312A_BINDING_SUMMARY.directBindingAuthorized).toBe(0);
    expect(
      TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.some(
        (item) => item.bindingStatus === 'direct_binding_authorized',
      ),
    ).toBe(false);

    for (const item of TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A) {
      expect(item.automaticBindingAuthorized, item.targetId).toBe(false);
      expect(item.providerLandmarkDirectBindingAuthorized, item.targetId).toBe(false);
      expect(item.metricThresholdAuthorized, item.targetId).toBe(false);
      expect(item.populationNormAuthorized, item.targetId).toBe(false);
      expect(item.candidateNeutralFeaturesAreEquivalenceProof, item.targetId).toBe(false);
    }
  });

  it('keeps all 119 named forms manual-input-only', () => {
    const items = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.filter(
      (item) => item.targetKind === 'named_form',
    );

    expect(items).toHaveLength(119);
    for (const item of items) {
      expect(item.bindingStatus, item.targetId).toBe('manual_input_only');
      expect(item.namedFormClassifierAuthorized, item.targetId).toBe(false);
      expect(item.explicitTraditionalKeyRequiredUntilPromotion, item.targetId).toBe(true);
      expect(item.requiresSourceGroundedEquivalenceDefinition, item.targetId).toBe(true);
      expect(item.requiresObservationValidationEvidence, item.targetId).toBe(true);
    }
  });

  it('keeps named claims semantic-only except the FR311Q permanently unsupported product-query set', () => {
    const items = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.filter(
      (item) => item.targetKind === 'named_claim',
    );

    expect(items).toHaveLength(348);
    expect(
      items.filter((item) => item.bindingStatus === 'binding_prohibited'),
    ).toHaveLength(18);
    expect(
      items.filter(
        (item) => item.bindingStatus === 'semantic_only_no_observation_binding',
      ),
    ).toHaveLength(330);

    const prohibitedIds = items
      .filter((item) => item.bindingStatus === 'binding_prohibited')
      .map((item) => item.targetId)
      .sort();
    const expected = FACE_LENS_GAP_ADJUDICATIONS_FR311Q
      .filter((item) => item.disposition === 'permanently_unsupported_product_query')
      .map((item) => item.evidenceId)
      .sort();

    expect(prohibitedIds).toEqual(expected);
  });

  it('keeps all direct rules conditional and never infers their traditional condition from a neutral metric', () => {
    const items = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.filter(
      (item) => item.targetKind === 'direct_rule',
    );

    expect(items).toHaveLength(230);
    expect(items.every((item) => item.bindingStatus === 'conditional_binding_candidate')).toBe(true);
    expect(items.every((item) => item.requiresSourceGroundedEquivalenceDefinition)).toBe(true);
    expect(items.every((item) => item.requiresObservationValidationEvidence)).toBe(true);
    expect(items.every((item) => item.automaticBindingAuthorized === false)).toBe(true);
    expect(items.every((item) => item.metricThresholdAuthorized === false)).toBe(true);
  });

  it('keeps relation keys conditional on explicit participant mapping', () => {
    const items = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.filter(
      (item) => item.targetKind === 'relation_key',
    );

    expect(items).toHaveLength(24);
    for (const item of items) {
      expect(item.bindingStatus, item.targetId).toBe('conditional_binding_candidate');
      expect(item.requiresExplicitParticipantMapping, item.targetId).toBe(true);
      expect(item.relationInferenceAuthorized, item.targetId).toBe(false);
      expect(item.candidateNeutralFeatureKeys, item.targetId).toEqual([]);
    }
  });

  it('keeps all combinations manual-only with no automatic synthesis', () => {
    const items = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.filter(
      (item) => item.targetKind === 'combination_key',
    );

    expect(items).toHaveLength(20);
    for (const item of items) {
      expect(item.bindingStatus, item.targetId).toBe('manual_input_only');
      expect(item.requiresExplicitParticipantMapping, item.targetId).toBe(true);
      expect(item.combinationInferenceAuthorized, item.targetId).toBe(false);
      expect(item.candidateNeutralFeatureKeys, item.targetId).toEqual([]);
    }
  });

  it('treats region-matched neutral features only as candidates, never equivalence proof', () => {
    const namedForms = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A.filter(
      (item) => item.targetKind === 'named_form',
    );
    const eyebrow = namedForms.find((item) => item.regionKeys.includes('eyebrow'));
    const eye = namedForms.find((item) => item.regionKeys.includes('eye'));
    const nose = namedForms.find((item) => item.regionKeys.includes('nose'));
    const mouth = namedForms.find((item) => item.regionKeys.includes('mouth'));
    const ear = namedForms.find((item) => item.regionKeys.includes('ear'));

    expect(eyebrow?.candidateNeutralFeatureKeys.some((key) => key.startsWith('eyebrow.'))).toBe(true);
    expect(eye?.candidateNeutralFeatureKeys.some((key) => key.startsWith('eye.'))).toBe(true);
    expect(nose?.candidateNeutralFeatureKeys.some((key) => key.startsWith('nose.'))).toBe(true);
    expect(mouth?.candidateNeutralFeatureKeys.some((key) => key.startsWith('mouth.'))).toBe(true);
    expect(ear?.candidateNeutralFeatureKeys.some((key) => key.startsWith('ear.'))).toBe(true);

    for (const item of namedForms) {
      expect(item.candidateNeutralFeaturesAreEquivalenceProof, item.targetId).toBe(false);
    }
  });

  it('preserves the FR311P/Q and FR282/FR293 frozen baselines', () => {
    expect(FR311P_EVIDENCE_INVENTORY).toMatchObject({
      namedForms: 119,
      namedClaims: 348,
      directRules: 230,
      relationKeys: 24,
      combinationKeys: 20,
      canonicalEvidence: 621,
    });
    expect(FR311Q_GAP_SUMMARY).toMatchObject({
      totalGapEvidence: 28,
      permanentlyUnsupportedProductQuery: 18,
    });

    expect(FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries).toHaveLength(29);
    expect(FR293_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (entry) => entry.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });

  it('covers every named claim and direct rule source exactly once', () => {
    const namedSourceIds = [
      ...FACE_NAMED_FORM_EVIDENCE_FR311J.map((item) => item.evidenceId),
      ...EAR_NAMED_FORM_EVIDENCE_FR311O.map((item) => item.evidenceId),
    ].sort();
    const namedTargetIds = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A
      .filter((item) => item.targetKind === 'named_claim')
      .map((item) => item.targetId)
      .sort();

    expect(namedTargetIds).toEqual(namedSourceIds);

    const directSourceIds = [
      ...FACE_DIRECT_RULE_EVIDENCE_FR311J.map((item) => item.ruleId),
      ...EAR_DIRECT_RULE_EVIDENCE_FR311O.map((item) => item.ruleId),
    ].sort();
    const directTargetIds = TRADITIONAL_OBSERVATION_BINDING_AUTHORITY_FR312A
      .filter((item) => item.targetKind === 'direct_rule')
      .map((item) => item.targetId)
      .sort();

    expect(directTargetIds).toEqual(directSourceIds);
  });

  it('keeps every FR312A global authority boundary closed', () => {
    for (const [key, flag] of Object.entries(FR312A_AUTHORITY_BOUNDARY)) {
      expect(flag, key).toBe(false);
    }
  });
});
