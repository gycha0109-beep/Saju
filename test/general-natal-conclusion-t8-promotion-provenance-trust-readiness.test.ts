import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
  GENERAL_NATAL_CONCLUSION_PACK,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_CONCLUSION_T8_PROMOTION_CONTROL_IDS,
  GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_PROVENANCE_QUALITIES,
  GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_SOURCE_TIERS,
  GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_TEST_COVERAGE,
  buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness,
} from '../src/research/general-natal-conclusion-t8-promotion-provenance-trust-readiness.js';

describe('General Natal conclusion T8 promotion provenance and trust readiness v2', () => {
  test('keeps the bounded research runtime reachable without requiring Gyeokguk', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.researchRuntime.canonicalTenGodInputRepresentable).toBe(true);
    expect(report.researchRuntime.researchT5FamilyProducerPresent).toBe(true);
    expect(report.researchRuntime.researchT8GeneralConclusionProducerPresent).toBe(true);
    expect(report.researchRuntime.researchRuntimeReachable).toBe(true);
    expect(report.researchRuntime.familyRuleCount).toBe(GENERAL_NATAL_CONCLUSION_FAMILY_RULES.length);
    expect(report.researchRuntime.conclusionRuleCount).toBe(GENERAL_NATAL_CONCLUSION_RULES.length);
    expect(report.researchRuntime.gyeokgukResolverRequiredForThisCandidate).toBe(false);
  });

  test('consumes the passage witness artifact instead of treating source registration as enough', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.runtimePassageAuthority.passageWitnessSubsetEstablished).toBe(true);
    expect(report.runtimePassageAuthority.exactCandidateRuleCount).toBe(15);
    expect(report.runtimePassageAuthority.passagePinnedRuleCount).toBe(10);
    expect(report.runtimePassageAuthority.singleSourcePassagePinnedRuleCount).toBe(1);
    expect(report.runtimePassageAuthority.multiSourcePassagePinnedRuleCount).toBe(9);
    expect(report.runtimePassageAuthority.unsupportedExactRuleCount).toBe(5);
    expect(report.runtimePassageAuthority.exactCurrentRuleProductionSupportedCount).toBe(0);
    expect(report.runtimePassageAuthority.exactConsumerPassageSupportReady).toBe(false);
    expect(report.runtimePassageAuthority.evidenceId).toMatch(/^[a-f0-9]{64}$/);
  });

  test('preserves the corrected single-source peer-family boundary', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.runtimePassageAuthority.peerFamilyPassageWitnessEstablished).toBe(true);
    expect(report.runtimePassageAuthority.peerFamilyMultiSourceWitnessEstablished).toBe(false);
    expect(report.runtimePassageAuthority.sourceIntegrityQualificationStillRequired).toBe(true);
    expect(report.runtimePassageAuthority.modernConsumerSemanticBridgeStillRequired).toBe(true);
  });

  test('keeps registry-level provenance and exact consumer support distinct', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(registry.sources).toHaveLength(2);
    expect(report.runtimeSourceAuthority.sourceReferenceRegistered).toBe(true);
    expect(report.runtimeSourceAuthority.registeredSourceTiers).toEqual([
      'cross_reference',
      'cross_reference',
    ]);
    expect(report.runtimeSourceAuthority.sourceTierPermitted).toBe(true);
    expect(report.productionContract.productionSourceTiers).toEqual(
      GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_SOURCE_TIERS,
    );
    expect(report.runtimeQualityAuthority.ruleProvenanceQualities).toEqual(['secondary_only']);
    expect(report.productionContract.productionProvenanceQualities).toEqual(
      GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_PROVENANCE_QUALITIES,
    );
    expect(report.runtimeQualityAuthority.productionRuleProvenanceReady).toBe(false);
    expect(report.runtimeSourceAuthority.productionEligibleProvenanceByRegistryContract).toBe(false);
    expect(report.runtimeSourceAuthority.productionEligibleProvenanceEstablished).toBe(false);
    expect(report.productionContract.passageWitnessDoesNotAutomaticallyPromoteRuleQuality).toBe(true);
  });

  test('keeps fixture coverage separate from domain review', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.runtimeQualityAuthority.ruleTestCoverage).toEqual(['fixture_matrix']);
    expect(report.productionContract.productionTestCoverage).toEqual(
      GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_TEST_COVERAGE,
    );
    expect(report.runtimeQualityAuthority.productionRuleTestCoverageReady).toBe(true);
    expect(report.runtimeQualityAuthority.ruleReviewerStatuses).toEqual(['unreviewed']);
    expect(report.runtimeQualityAuthority.productionRuleReviewerReady).toBe(false);
  });

  test('keeps research lifecycle and reviewer authority fail-closed', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(GENERAL_NATAL_CONCLUSION_PACK.status).toBe('research');
    expect(GENERAL_NATAL_CONCLUSION_METHODOLOGY.status).toBe('research');
    expect(report.runtimeQualityAuthority.productionPackLifecycleReady).toBe(false);
    expect(report.runtimeQualityAuthority.productionMethodologyLifecycleReady).toBe(false);
    expect(report.runtimeQualityAuthority.productionRuleLifecycleReady).toBe(false);
    expect(registry.reviewAttestations).toEqual([]);
    expect(report.runtimeReviewerAuthority.bundleReviewAttestationCount).toBe(0);
    expect(report.runtimeReviewerAuthority.bundleReviewerTrustContextPresent).toBe(false);
    expect(report.runtimeReviewerAuthority.bundleTrustedReviewerGrantCount).toBe(0);
    expect(report.runtimeReviewerAuthority.trustPinnedDomainAttestationAuthorityEstablished).toBe(false);
    expect(report.runtimeReviewerAuthority.domainReviewedLifecycleAuthorityEstablished).toBe(false);
  });

  test('binds the refreshed audit to the post-passage-witness main and exact registry identities', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.auditBaseSha).toBe('3b724b087311a9831cc695466b1fff9861ad57aa');
    expect(report.candidateIdentity.packId).toBe('PACK-GENERAL-NATAL-CONCLUSION-SYNTHESIS-CANDIDATE');
    expect(report.candidateIdentity.packVersion).toBe('0.2.0-research');
    expect(report.candidateIdentity.familyRuleContentRefs).toHaveLength(5);
    expect(report.candidateIdentity.conclusionRuleContentRefs).toHaveLength(10);
    for (const ref of [
      ...report.candidateIdentity.familyRuleContentRefs,
      ...report.candidateIdentity.conclusionRuleContentRefs,
    ]) {
      expect(ref.contentHash).toMatch(/^[a-f0-9]{64}$/);
    }
  });

  test('records a deterministic HOLD verdict without promotion', () => {
    const first = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();
    const second = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.status).toBe('PRODUCTION_ADMISSION_AUTHORITY_NOT_ESTABLISHED');
    expect(first.readiness.productionEligibleProvenanceEstablished).toBe(false);
    expect(first.readiness.domainReviewedLifecycleAuthorityEstablished).toBe(false);
    expect(first.readiness.trustPinnedDomainAttestationAuthorityEstablished).toBe(false);
    expect(first.readiness.productionAdmissionAuthority).toBe(false);
    expect(first.readiness.productionState).toBe('HOLD');
    expect(first.guardrails).toEqual({
      passageWitnessTreatedAsAutomaticPromotion: false,
      lifecyclePromotionPerformed: false,
      productionPackCreated: false,
      productionRegistryActivated: false,
      reviewerAuthorityFabricated: false,
      productHostBehaviorChanged: false,
      narrativeBehaviorChanged: false,
      llmBehaviorChanged: false,
      commerceBehaviorChanged: false,
    });
    expect(first.controlIds).toEqual(GENERAL_NATAL_CONCLUSION_T8_PROMOTION_CONTROL_IDS);
    expect(first.controlCount).toBe(16);
    expect(first.recommendedNextAction).toBe(
      'QUALIFY_PASSAGE_WITNESSES_AND_ESTABLISH_EXACT_CONSUMER_SEMANTIC_SUPPORT_BEFORE_REVIEW_AND_LIFECYCLE_PROMOTION',
    );
  });
});
