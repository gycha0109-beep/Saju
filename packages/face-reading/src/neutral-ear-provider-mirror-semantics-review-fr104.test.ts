import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104,
} from './neutral-ear-provider-mirror-semantics-review-fr104.js';

describe('FR104 provider mirror semantics review', () => {
  it('admits only the tested-boundary provider mirror statement', () => {
    const review =
      NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104;

    expect(review.evidence).toMatchObject({
      successfulTestedFixtureCount: 3,
      unavailableTestedFixtureCount: 2,
      mediaPipeSourceSuccessfulFixtureCount: 2,
      independentSourceSuccessfulFixtureCount: 1,
      allSuccessfulTestedFixturesCrossLabelCloser: true,
      unavailableFixturesUsedAsSemanticCounterexamples: false,
      numericAcceptanceThresholdApplied: false,
    });
    expect(
      review.supportedStatement.status,
    ).toBe('supported_within_tested_boundary');
    expect(
      review.decision
        .boundedProviderMirrorBehaviorStatementAdmitted,
    ).toBe(true);
  });

  it('does not overclaim universal provider behavior', () => {
    const review =
      NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104;

    expect(
      review.supportedStatement.testedFixtureScopeOnly,
    ).toBe(true);
    expect(
      review.decision
        .generalUniversalProviderMirrorSemanticsAdmitted,
    ).toBe(false);
    expect(
      review.notEstablished.universalBehaviorForAllPossibleInputs,
    ).toBe(true);
  });

  it('keeps provider mirror behavior separate from anatomical side', () => {
    const review =
      NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104;

    expect(
      review.decision.providerLabelsAdmittedAsAnatomicalSide,
    ).toBe(false);
    expect(
      review.decision.anatomicalLateralityMappingAdmitted,
    ).toBe(false);
    expect(
      review.notEstablished.providerLeftMeansSubjectAnatomicalLeft,
    ).toBe(true);
    expect(
      review.notEstablished.providerRightMeansSubjectAnatomicalRight,
    ).toBe(true);
    expect(
      review.notEstablished.capturePipelineMirrorProvenance,
    ).toBe(true);
  });

  it('keeps ear validity, traditional binding, and Production unauthorized', () => {
    const authority =
      NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104
        .authority;

    expect(authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized)
      .toBe(false);
    expect(authority.productionAuthorization)
      .toBe(false);
  });
});
