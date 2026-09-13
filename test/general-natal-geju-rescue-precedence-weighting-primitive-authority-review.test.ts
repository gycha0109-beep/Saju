import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-establishment-outcome-representation-review.js';
import { GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW } from '../src/research/general-natal-geju-mixed-outcome-application-review.js';
import {
  GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from '../src/research/general-natal-geju-rescue-precedence-weighting-primitive-authority-review.js';
import {
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
} from '../src/research/general-natal-geju-xing-chong-po-hai-effect-primitive-authority-review.js';

describe('Gyeokguk rescue precedence and weighting primitive authority review', () => {
  test('preserves direct rescue examples while keeping settlement and precedence fail-closed', () => {
    const review =
      GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW;

    expect(review.decision).toBe('PARTIALLY_AUTHORIZED');
    expect(review.upstreamOutcomeVersion).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
    );
    expect(review.upstreamOutcomeHash).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
    );
    expect(review.upstreamMixedOutcomeApplicationVersion).toBe(
      GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.version,
    );
    expect(review.upstreamXingChongPoHaiVersion).toBe(
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    );
    expect(review.upstreamXingChongPoHaiHash).toBe(
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
    );
    expect(review.directSourceRescueMaterialityObserved).toBe(true);
    expect(review.directSourceRescueExampleCatalogObserved).toBe(true);
    expect(review.directSourceRelativeWeightingPrincipleObserved).toBe(true);
    expect(review.directSourceFixedPrecedenceOrderObserved).toBe(false);
    expect(review.sourceRescueCatalogExhaustive).toBe(false);
    expect(review.canonicalRescueClauseInputResolution).toBe('BLOCKED');
    expect(review.generalizedRescueEffectPredicateAuthorized).toBe(false);
    expect(review.generalizedRescuePrecedenceWeightingPredicateAuthorized).toBe(false);
    expect(review.numericWeightingAuthorized).toBe(false);
    expect(review.sourceListOrderAsPrecedenceAuthorized).toBe(false);
    expect(review.multipleRescueOverlapResolutionAuthorized).toBe(false);
    expect(review.terminalStatePrecedenceAuthorized).toBe(false);
    expect(review.productionFactEmissionAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
    expect(review.rescueExamples).toContainEqual({ adversity: '刑沖', rescue: '會合以解之' });
    expect(review.unauthorizedDerivations).toContain('source_list_order_as_precedence_order');
    expect(review.unauthorizedDerivations).toContain(
      'quan_qing_quan_zhong_as_numeric_weight_or_score',
    );
    expect(
      GENERAL_NATAL_GEJU_RESCUE_PRECEDENCE_WEIGHTING_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
