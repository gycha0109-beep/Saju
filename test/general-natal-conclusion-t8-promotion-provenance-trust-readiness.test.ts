import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
  GENERAL_NATAL_CONCLUSION_PACK,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_PROVENANCE_QUALITIES,
  GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_SOURCE_TIERS,
  GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_TEST_COVERAGE,
  GENERAL_NATAL_CONCLUSION_T8_PROMOTION_CONTROL_IDS,
  buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness,
} from '../src/research/general-natal-conclusion-t8-promotion-provenance-trust-readiness.js';

describe('General Natal conclusion T8 promotion provenance and trust readiness', () => {
  test('proves the bounded research path reaches T5 family and T8 general conclusion rules', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.researchRuntime.canonicalTenGodInputRepresentable).toBe(true);
    expect(report.researchRuntime.researchT5FamilyProducerPresent).toBe(true);
    expect(report.researchRuntime.researchT8GeneralConclusionProducerPresent).toBe(true);
    expect(report.researchRuntime.researchRuntimeReachable).toBe(true);
    expect(report.researchRuntime.familyRuleCount).toBe(
      GENERAL_NATAL_CONCLUSION_FAMILY_RULES.length,
    );
    expect(report.researchRuntime.conclusionRuleCount).toBe(
      GENERAL_NATAL_CONCLUSION_RULES.length,
    );
    expect(report.researchRuntime.familyRuleCount).toBe(5);
    expect(report.researchRuntime.conclusionRuleCount).toBe(10);
  });

  test('keeps Gyeokguk resolver outside this candidate dependency chain', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(GENERAL_NATAL_CONCLUSION_METHODOLOGY.requiredFactTypes).toEqual([
      'derivedFacts.tenGods',
    ]);
    for (const rule of GENERAL_NATAL_CONCLUSION_FAMILY_RULES) {
      expect(rule.inputs).toHaveLength(1);
      expect(rule.inputs[0]?.source).toBe('derived_fact');
      expect(rule.inputs[0]?.pathOrClaimType).toBe('derivedFacts.tenGods');
    }
    for (const rule of GENERAL_NATAL_CONCLUSION_RULES) {
      expect(rule.inputs.length).toBeGreaterThan(0);
      expect(
        rule.inputs.every(
          (input) =>
            input.source === 'interpretation_claim' &&
            input.pathOrClaimType.startsWith('TEN_GOD_FAMILY_'),
        ),
      ).toBe(true);
    }
    expect(report.researchRuntime.gyeokgukResolverRequiredForThisCandidate).toBe(false);
  });

  test('distinguishes source registration from Production provenance quality', () => {
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

    expect(report.runtimeQualityAuthority.ruleProvenanceQualities).toEqual([
      'secondary_only',
    ]);
    expect(report.productionContract.productionProvenanceQualities).toEqual(
      GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_PROVENANCE_QUALITIES,
    );
    expect(report.runtimeQualityAuthority.productionRuleProvenanceReady).toBe(false);
    expect(report.runtimeSourceAuthority.productionEligibleProvenanceEstablished).toBe(
      false,
    );
  });

  test('records fixture coverage as permitted but not equivalent to domain review', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.runtimeQualityAuthority.ruleTestCoverage).toEqual(['fixture_matrix']);
    expect(report.productionContract.productionTestCoverage).toEqual(
      GENERAL_NATAL_CONCLUSION_T8_PRODUCTION_TEST_COVERAGE,
    );
    expect(report.runtimeQualityAuthority.productionRuleTestCoverageReady).toBe(true);
    expect(report.runtimeQualityAuthority.ruleReviewerStatuses).toEqual(['unreviewed']);
    expect(report.runtimeQualityAuthority.productionRuleReviewerReady).toBe(false);
  });

  test('keeps research lifecycle distinct from Production admission', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(GENERAL_NATAL_CONCLUSION_PACK.status).toBe('research');
    expect(GENERAL_NATAL_CONCLUSION_METHODOLOGY.status).toBe('research');
    expect(report.runtimeQualityAuthority.packLifecycle).toBe('research');
    expect(new Set(report.runtimeQualityAuthority.methodologyLifecycles)).toEqual(
      new Set(['research']),
    );
    expect(new Set(report.runtimeQualityAuthority.ruleLifecycles)).toEqual(
      new Set(['research']),
    );
    expect(report.runtimeQualityAuthority.productionPackLifecycleReady).toBe(false);
    expect(report.runtimeQualityAuthority.productionMethodologyLifecycleReady).toBe(false);
    expect(report.runtimeQualityAuthority.productionRuleLifecycleReady).toBe(false);
  });

  test('does not fabricate trust-pinned domain review authority', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(registry.reviewAttestations).toEqual([]);
    expect(report.runtimeReviewerAuthority.bundleReviewAttestationCount).toBe(0);
    expect(report.runtimeReviewerAuthority.bundleReviewerTrustContextPresent).toBe(false);
    expect(report.runtimeReviewerAuthority.bundleTrustedReviewerGrantCount).toBe(0);
    expect(
      report.runtimeReviewerAuthority.trustPinnedDomainAttestationAuthorityEstablished,
    ).toBe(false);
    expect(report.runtimeReviewerAuthority.domainReviewedLifecycleAuthorityEstablished).toBe(
      false,
    );
    expect(
      report.productionContract.promotedPackRequiresExternallySuppliedReviewerTrustContext,
    ).toBe(true);
    expect(report.productionContract.approvedDomainAttestationRequired).toBe(true);
    expect(report.productionContract.exactAttestationContentHashTrustPinRequired).toBe(true);
    expect(report.productionContract.testsFixturesMocksExamplesDocsCountAsAuthority).toBe(
      false,
    );
  });

  test('binds the audit to exact registry content identities', () => {
    const report = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();

    expect(report.candidateIdentity.packId).toBe(
      'PACK-GENERAL-NATAL-CONCLUSION-SYNTHESIS-CANDIDATE',
    );
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

  test('records a deterministic fail-closed Production verdict without promotion', () => {
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
      lifecyclePromotionPerformed: false,
      productionPackCreated: false,
      productionRegistryActivated: false,
      productHostBehaviorChanged: false,
      narrativeBehaviorChanged: false,
      llmBehaviorChanged: false,
      commerceBehaviorChanged: false,
    });
    expect(first.controlIds).toEqual(GENERAL_NATAL_CONCLUSION_T8_PROMOTION_CONTROL_IDS);
    expect(first.controlCount).toBe(13);
    expect(first.recommendedNextAction).toBe(
      'OBTAIN_PRODUCTION_ELIGIBLE_PROVENANCE_AND_TRUST_PINNED_DOMAIN_REVIEW_AUTHORITY_BEFORE_LIFECYCLE_PROMOTION',
    );
  });
});
