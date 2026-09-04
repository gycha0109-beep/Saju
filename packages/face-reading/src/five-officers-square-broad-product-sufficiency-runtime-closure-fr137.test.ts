import { describe, expect, it } from 'vitest';
import {
  FR137_NEXT_FRONTIER,
  assessSquareBroadProductSufficiencyRuntimeClosureFR137,
  assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137,
  requireSquareBroadProductSemanticEmissionAuthorizationFR137,
} from './five-officers-square-broad-product-sufficiency-runtime-closure-fr137.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR137 square-broad product sufficiency runtime closure', () => {
  it('maps the unresolved traditional method to the existing product unsupported_method vocabulary', () => {
    const result = assessSquareBroadProductSufficiencyRuntimeClosureFR137();
    assertIssuedSquareBroadProductSufficiencyRuntimeClosureFR137(result);

    expect(result.authorityState).toBe(
      'square_broad_product_semantic_emission_fail_closed_unsupported_method',
    );
    expect(result.target).toEqual({
      criterionRef: 'criterion.intake.square_broad',
      sourceConcept: '方大',
      activeConstructScope: 'fang_shape_candidate_features_only',
    });
    expect(result.productSufficiency.state).toBe('blocked');
    expect(result.productSufficiency.diagnosisResolution).toBe('unsupported_method');
    expect(result.productSufficiency.unavailableSections).toEqual([
      'five_officers.intake.static_support',
    ]);
    expect(result.nextFrontier).toBe(FR137_NEXT_FRONTIER);
  });

  it('emits no criterion state, claim, narrative, semantic reading, or character grounding', () => {
    const result = assessSquareBroadProductSufficiencyRuntimeClosureFR137();

    expect(result.emission).toEqual({
      neutralMetricValuesConsumed: 0,
      researchAssertionStatesConsumed: 0,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
      productSemanticReading: null,
      characterGrounding: null,
    });
    expect(result.predecessorAuthority.fr122CriterionStateAuthorized).toBe(false);
    expect(result.predecessorAuthority.annotationAuthorityRef).toBeNull();
    expect(result.predecessorAuthority.annotationProtocolRef).toBeNull();
    expect(result.predecessorAuthority.labelSchemaRef).toBeNull();
    expect(result.predecessorAuthority.reviewerCount).toBeNull();
    expect(result.predecessorAuthority.quorum).toBeNull();
    expect(result.predecessorAuthority.consensusThreshold).toBeNull();
    expect(result.predecessorAuthority.traditionalSemanticAuthority).toBe(false);
  });

  it('fails closed when a consumer asks for square-broad semantic emission', () => {
    const result = assessSquareBroadProductSufficiencyRuntimeClosureFR137();

    expect(() => requireSquareBroadProductSemanticEmissionAuthorizationFR137(result)).toThrow(
      FaceAuthorityValidationError,
    );
    expect(() => requireSquareBroadProductSemanticEmissionAuthorizationFR137(result)).toThrow(
      /diagnosisResolution=unsupported_method/u,
    );
  });

  it('returns one immutable issued singleton', () => {
    const first = assessSquareBroadProductSufficiencyRuntimeClosureFR137();
    const second = assessSquareBroadProductSufficiencyRuntimeClosureFR137();

    expect(second).toBe(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.productSufficiency)).toBe(true);
    expect(Object.isFrozen(first.productSufficiency.unavailableSections)).toBe(true);
    expect(Object.isFrozen(first.emission)).toBe(true);
  });
});
