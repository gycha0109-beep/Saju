import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BINDING_READINESS_CONTROL_IDS,
  buildRelationshipSpouseT8SourceBindingReadiness,
} from '../src/research/relationship-spouse-t8-source-binding-readiness.js';

describe('Relationship Spouse T8 source-binding readiness', () => {
  it('accepts the Engine-governance handoff while preserving AUTHORITY_GAP', () => {
    const review = buildRelationshipSpouseT8SourceBindingReadiness();

    expect(review.upstreamAccepted).toBe(true);
    expect(review.capabilityKey).toBe('relationship:natal:spouse');
    expect(review.authorityBoundary.engineSemanticImplementationAuthorized).toBe(
      false,
    );
    expect(review.authorityBoundary.production).toBe('HOLD');
  });

  it('proves the current runtime has no registered source binding', () => {
    const review = buildRelationshipSpouseT8SourceBindingReadiness();

    expect(review.currentRuntime.methodologySourceIds).toEqual([]);
    expect(review.currentRuntime.ruleSourceIds).toEqual([]);
    expect(review.currentRuntime.registeredSourceIds).toEqual([]);
    expect(review.currentRuntime.sourceTiers).toEqual([]);
    expect(review.currentRuntime.sourceReferenceRegistered).toBe(false);
    expect(review.currentRuntime.sourceTierAuthorized).toBe(false);
  });

  it('keeps Research evidence identities distinct from runtime SourceReference authority', () => {
    const review = buildRelationshipSpouseT8SourceBindingReadiness();

    expect(review.currentRuntime.researchEvidenceSourceIds.length).toBeGreaterThan(0);
    expect(review.researchEvidenceCandidates).toHaveLength(2);

    const whisper = review.researchEvidenceCandidates[0]!;
    expect(whisper.researchIdentity).toBe(
      'WHISPER_2026_DAY_MASTER_POLARITY_ROLE_NEUTRAL_SPOUSE_SELECTOR',
    );
    expect(whisper.directBodyInspected).toBe(true);
    expect(whisper.exactSelectorSupportObserved).toBe(true);
    expect(whisper.pureNatalSelectorSupported).toBe(true);
    expect(whisper.schoolDependenceCaveatObserved).toBe(true);
    expect(whisper.runtimeSourceReferenceIdAssigned).toBe(false);
    expect(whisper.runtimeProvenanceTierAssigned).toBe(false);
    expect(whisper.runtimeRightsReuseMetadataReviewed).toBe(false);
    expect(whisper.runtimeRuleSupportTypeAssigned).toBe(false);

    const lee = review.researchEvidenceCandidates[1]!;
    expect(lee.researchIdentity).toBe('LEE_YOUNGEUN_2025_KCI_KYOBO_DIRECT_PDF');
    expect(lee.directBodyInspected).toBe(true);
    expect(lee.independentNormativeProvenanceRole).toBe(true);
    expect(lee.pureNatalSelectorSupported).toBe(false);
    expect(lee.exactSelectorSupportObserved).toBe(false);
  });

  it('fails closed instead of inventing a source manifest', () => {
    const review = buildRelationshipSpouseT8SourceBindingReadiness();

    expect(review.disposition).toBe('SOURCE_BINDING_MANIFEST_INCOMPLETE');
    expect(review.sourceBindingManifestComplete).toBe(false);
    expect(review.sourceBindingMutationAuthorized).toBe(false);
    expect(review.blockers).toContain('NO_RUNTIME_SOURCE_REFERENCE_RECORDS');
    expect(review.blockers).toContain(
      'NO_REPOSITORY_AUTHORIZED_PROVENANCE_TIER_ASSIGNMENT_FOR_THE_EXACT_SELECTOR_SOURCE',
    );
    expect(review.blockers).toContain(
      'NO_RUNTIME_RIGHTS_REUSE_METADATA_REVIEW_FOR_THE_EXACT_SELECTOR_SOURCE',
    );
    expect(review.blockers).toContain('NO_EXPLICIT_RULE_SUPPORT_TYPE_ASSIGNMENT');
  });

  it('keeps source binding separate from review trust, lifecycle, and consumers', () => {
    const review = buildRelationshipSpouseT8SourceBindingReadiness();

    expect(review.authorityBoundary.crossSourceStitchingAuthorized).toBe(false);
    expect(review.authorityBoundary.sourceTierInflationAuthorized).toBe(false);
    expect(review.authorityBoundary.researchEvidenceIdRelabellingAuthorized).toBe(
      false,
    );
    expect(review.authorityBoundary.reviewTrustFabricationAuthorized).toBe(false);
    expect(review.authorityBoundary.lifecyclePromotionAuthorized).toBe(false);
    expect(review.authorityBoundary.consumerActivationAuthorized).toBe(false);
    expect(review.authorityBoundary.officialReadingAuthorityAuthorized).toBe(false);
    expect(review.authorityBoundary.productionAdmissionAuthorized).toBe(false);
  });

  it('locks the source-binding governance controls and deterministic review identity', () => {
    const left = buildRelationshipSpouseT8SourceBindingReadiness();
    const right = buildRelationshipSpouseT8SourceBindingReadiness();

    expect(left.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_SOURCE_BINDING_READINESS_CONTROL_IDS,
    );
    expect(left.controlCount).toBe(16);
    expect(left.reviewId).toBe(right.reviewId);
    expect(left.reviewId).toMatch(/^[a-f0-9]{64}$/);
    expect(left.nextAction).toBe(
      'DEFINE_REPOSITORY_AUTHORIZED_RUNTIME_SOURCE_MANIFEST_WITH_EXPLICIT_SOURCE_IDS_TIERS_LOCATORS_RIGHTS_METHODOLOGY_APPLICABILITY_AND_RULE_SUPPORT_TYPES',
    );
  });
});
