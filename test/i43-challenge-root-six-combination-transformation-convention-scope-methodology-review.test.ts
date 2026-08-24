import { describe, expect, test } from 'vitest';
import {
  buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview,
  I43_CHALLENGE_ROOT_SIX_COMBINATION_SOURCE_BASIS,
} from '../src/index.js';

describe('I43 challenge root six-combination transformation convention scope methodology review', () => {
  test('preserves structural six-combination pairing while blocking a uniform transformed-element route', () => {
    const report = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();

    expect(report.decision).toBe(
      'UNIFORM_CHALLENGE_ROOT_SIX_COMBINATION_TRANSFORMED_ELEMENT_ROUTE_BLOCKED',
    );
    expect(report.sixCombinationStructuralPairingSourceResolved).toBe(true);
    expect(report.sixCombinationStructuralParticipationRemainsValid).toBe(true);
    expect(report.sanmingUniformTransformedElementResultContractAvailable).toBe(false);
    expect(report.sixCombinationTraditionalReferenceElementEmissionAuthorized).toBe(false);
  });

  test('rejects direct adoption of incomplete cross-domain mapping-like material', () => {
    const report = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();

    expect(report.externalMappingLikeReferenceObserved).toBe(true);
    expect(report.externalMappingLikeReferenceCompleteUniformElementSet).toBe(false);
    expect(report.externalMappingLikeReferenceDomainMatchesChallengeRootBazi).toBe(false);
    expect(report.externalMappingLikeReferenceDirectAdoptionAuthorized).toBe(false);
  });

  test('does not turn blocked transformed-element adoption into a no-effect verdict', () => {
    const report = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();

    expect(report.sixCombinationChallengeRootTransformationStateEmissionAuthorized).toBe(false);
    expect(report.sixCombinationChallengeRootTransformationTargetElementAdoptionAuthorized).toBe(false);
    expect(report.sixCombinationNoEffectConclusionAuthorized).toBe(false);
    expect(report.sixCombinationStructuralInteractionEvidenceStillRelevant).toBe(true);
    expect(report.sixCombinationInteractionSettlementPolicyStillRequired).toBe(true);
  });

  test('records primary structural support separately from cross-domain and scope-limit findings', () => {
    const sources = I43_CHALLENGE_ROOT_SIX_COMBINATION_SOURCE_BASIS;

    expect(sources.some((item) => item.supportType === 'direct_structure')).toBe(true);
    expect(sources.some((item) => item.supportType === 'cross_domain_reference')).toBe(true);
    expect(sources.filter((item) => item.supportType === 'scope_limit').length).toBeGreaterThanOrEqual(2);
    expect(sources.some((item) => item.finding.includes('午未'))).toBe(true);
  });

  test('is deterministic and keeps downstream state/effect/classification fail-closed', () => {
    const first = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();
    const second = buildI43ChallengeRootSixCombinationTransformationConventionScopeMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
