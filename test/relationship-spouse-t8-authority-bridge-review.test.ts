import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
} from '../src/research/relationship-spouse-t8-runtime-admission.js';
import { buildRelationshipSpouseT8AuthorityBridgeReview } from '../src/research/relationship-spouse-t8-authority-bridge-review.js';

describe('Relationship Spouse T8 Authority Bridge review', () => {
  it('binds the exact isolated research admission state instead of reopening closed semantic research', () => {
    const review = buildRelationshipSpouseT8AuthorityBridgeReview();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION).toBe('1.0.0');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES).toHaveLength(2);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.authorityAdmissionReady).toBe(true);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.spouseT8ProducerReady).toBe(true);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.runtimeScope).toBe(
      'isolated_research_only',
    );
    expect(review.runtimeState.exactGovernedResearchAdmissionState).toBe(true);
    expect(review.authorityState.researchSemanticAuthorityClosed).toBe(true);
    expect(review.authorityState.researchReturnRequired).toBe(false);
  });

  it('preserves the exact bounded role-neutral spouse-star semantic correspondence', () => {
    const review = buildRelationshipSpouseT8AuthorityBridgeReview();

    expect(review.governedSemanticBoundary.canonicalSelectorInput).toBe(
      'derivedFacts.dayMaster.yinYang',
    );
    expect(review.governedSemanticBoundary.resolvedYangCorrespondence).toBe(
      'INDIRECT_WEALTH / 편재 / 偏財',
    );
    expect(review.governedSemanticBoundary.resolvedYinCorrespondence).toBe(
      'INDIRECT_POWER / 편관 / 偏官',
    );
    expect(review.governedSemanticBoundary.roleNeutralSpouseStarMarkerOnly).toBe(true);
    expect(review.governedSemanticBoundary.generalRelationshipRelabellingAuthorized).toBe(false);
    expect(review.governedSemanticBoundary.marriageExistenceOrGuaranteeInferenceAuthorized).toBe(
      false,
    );
    expect(review.governedSemanticBoundary.fertilityInferenceAuthorized).toBe(false);
    expect(review.governedSemanticBoundary.compatibilityScoringAuthorized).toBe(false);
    expect(review.governedSemanticBoundary.secondChartInferenceAuthorized).toBe(false);
  });

  it('identifies runtime provenance and trust as promotion blockers without fabricating authority', () => {
    const review = buildRelationshipSpouseT8AuthorityBridgeReview();

    expect(review.runtimeState.methodologySourceIds).toEqual([]);
    expect(review.runtimeState.ruleSourceRefCounts).toEqual([0, 0]);
    expect(review.runtimeState.ruleReviewerStatuses).toEqual(['unreviewed', 'unreviewed']);
    expect(review.runtimeState.registeredSourceCount).toBe(0);
    expect(review.runtimeState.registeredReviewAttestationCount).toBe(0);
    expect(review.authorityState.runtimeSourceBindingAuthorityEstablished).toBe(false);
    expect(review.authorityState.trustedReviewerAuthorityEstablished).toBe(false);
    expect(review.promotionState.sourceProvenanceRegistrationReady).toBe(false);
    expect(review.promotionState.promotionProvenanceReady).toBe(false);
    expect(review.promotionState.trustPinnedReviewAuthorityReady).toBe(false);
    expect(review.promotionState.stagingEligibility).toBe(false);
    expect(review.promotionState.productionPromotionReady).toBe(false);
    expect(review.promotionState.productionState).toBe('HOLD');
  });

  it('hands the remaining governance work to Engine without lifecycle or consumer promotion', () => {
    const review = buildRelationshipSpouseT8AuthorityBridgeReview();

    expect(review.decision.disposition).toBe('ENGINE_HANDOFF');
    expect(review.decision.rejected).toBe(false);
    expect(review.decision.semanticResearchReopenRequired).toBe(false);
    expect(review.decision.engineGovernanceWorkRequired).toBe(true);
    expect(review.decision.reReviewRequiredAfterEngineGovernance).toBe(true);
    expect(review.nextAction.owner).toBe('ENGINE_GOVERNANCE');
    expect(review.authorityState.lifecyclePromotionAuthorized).toBe(false);
    expect(review.authorityState.engineAuthorityPromotionAuthorized).toBe(false);
    expect(review.authorityState.previewExpansionAuthorized).toBe(false);
    expect(review.authorityState.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityState.consumerNarrativeActivationAuthorized).toBe(false);
    expect(review.authorityState.compatibilityConsumerActivationAuthorized).toBe(false);
    expect(review.authorityState.productionAdmissionAuthority).toBe(false);
    expect(review.authorityState.production).toBe('HOLD');
  });

  it('forbids semantic widening, authority fabrication, and consumer activation', () => {
    const review = buildRelationshipSpouseT8AuthorityBridgeReview();

    expect(review.prohibitedExtensions).toContain(
      'NO_REOPENING_CLOSED_SPOUSE_T8_SEMANTIC_RESEARCH_SOLELY_BECAUSE_RUNTIME_PROMOTION_GOVERNANCE_IS_INCOMPLETE',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_RUNTIME_SOURCE_REFERENCE_OR_PROVENANCE_INVENTION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_REVIEWER_IDENTITY_TRUST_GRANT_OR_ATTESTATION_FABRICATION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_CONSUMER_NARRATIVE_COMPATIBILITY_PREVIEW_DEFAULT_OR_PRODUCTION_ACTIVATION',
    );
    expect(review.prohibitedExtensions).toContain(
      'NO_MARRIAGE_FERTILITY_PARTNER_IDENTITY_PARTNER_SEX_ORIENTATION_LEGALITY_ETHICS_COMPATIBILITY_SECOND_CHART_OR_RELATIONSHIP_OUTCOME_INFERENCE',
    );
  });

  it('is deterministic for the same governed authority surface', () => {
    const left = buildRelationshipSpouseT8AuthorityBridgeReview();
    const right = buildRelationshipSpouseT8AuthorityBridgeReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
  });
});
