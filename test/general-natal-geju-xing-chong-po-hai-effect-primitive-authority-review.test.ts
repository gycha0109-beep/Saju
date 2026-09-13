import { describe, expect, test } from 'vitest';
import {
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_DERIVATION_VERSION,
} from '../src/calculation/structural-relations.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from '../src/research/general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from '../src/research/general-natal-geju-xing-chong-po-hai-effect-primitive-authority-review.js';

describe('Gyeokguk 刑沖破害 effect primitive authority review', () => {
  test('admits source materiality while keeping generalized establishment effect fail-closed', () => {
    const review = GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW;

    expect(review.decision).toBe('PARTIALLY_AUTHORIZED');
    expect(review.upstreamVersion).toBe(
      GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
    );
    expect(review.structuralRelationVersion).toBe(STRUCTURAL_RELATION_DERIVATION_VERSION);
    expect(review.structuralRelationContentHash).toBe(
      STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
    );
    expect(review.directSourceXingChongPoHaiMaterialityObserved).toBe(true);
    expect(review.directSourceAutomaticBreakEquivalenceObserved).toBe(false);
    expect(review.sourceContextEffectRequirementObserved).toBe(true);
    expect(review.sourceScopeExhaustive).toBe(false);
    expect(review.canonicalBranchClashInputAvailable).toBe(true);
    expect(review.canonicalBranchClashAuthorityLimitedToStructuralMatch).toBe(true);
    expect(review.canonicalBranchXingInputAvailable).toBe(false);
    expect(review.canonicalBranchPoInputAvailable).toBe(false);
    expect(review.canonicalBranchHaiInputAvailable).toBe(false);
    expect(review.generalizedXingChongPoHaiEffectPredicateAuthorized).toBe(false);
    expect(review.boundedClashOnlyEffectMatcherAuthorized).toBe(false);
    expect(review.productionFactEmissionAuthorized).toBe(false);
    expect(review.unauthorizedDerivations).toContain('branch_clash_presence_as_automatic_po_ge');
    expect(review.unauthorizedDerivations).toContain('branch_clash_absence_as_wu_xing_chong_po_hai');
    expect(review.unauthorizedDerivations).toContain('missing_xing_po_hai_relation_as_false');
    expect(review.unauthorizedDerivations).toContain('structural_match_as_contextual_effect');
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
    expect(
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
    ).toMatch(/^[0-9a-f]{64}$/);
  });
});
