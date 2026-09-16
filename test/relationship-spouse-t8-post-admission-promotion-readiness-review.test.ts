import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
} from '../src/research/relationship-spouse-t8-runtime-admission.js';
import {
  RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_SEMANTIC_BOUNDARY,
  buildRelationshipSpouseT8PostAdmissionPromotionReadiness,
} from '../src/research/relationship-spouse-t8-post-admission-promotion-readiness-review.js';

describe('Relationship / Spouse T8 post-admission promotion readiness', () => {
  test('accepts only the exact isolated research producer established by #650', () => {
    const report = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();

    expect(report.exactIsolatedResearchProducerAccepted).toBe(true);
    expect(report.isolatedResearchProducerAvailable).toBe(true);
    expect(report.authorityAdmissionReady).toBe(true);
    expect(report.spouseT8ProducerReady).toBe(true);
    expect(report.status).toBe(
      'POST_ADMISSION_PROMOTION_BLOCKED_BY_PROVENANCE_AND_REVIEW_AUTHORITY',
    );
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.runtimeScope).toBe(
      'isolated_research_only',
    );
  });

  test('current lifecycle is research-only and cannot be silently treated as staging-ready', () => {
    const report = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES).toHaveLength(2);
    for (const rule of RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES) {
      expect(rule.status).toBe('research');
    }
    expect(report.stagingMethodologyLifecycleReady).toBe(false);
    expect(report.stagingRuleLifecycleReady).toBe(false);
    expect(report.stagingPackEligibilityReady).toBe(false);
  });

  test('empty source registration remains a promotion blocker rather than being reconstructed', () => {
    const report = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY.sourceIds).toEqual([]);
    for (const rule of RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES) {
      expect(rule.sourceRefs).toEqual([]);
    }
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY.sources).toEqual([]);
    expect(report.sourceProvenanceRegistrationReady).toBe(false);
    expect(report.productionSourceTierEligibilityReady).toBe(false);
  });

  test('unreviewed quality and absent attestations fail closed without fabricating reviewer trust', () => {
    const report = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();

    for (const rule of RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES) {
      expect(rule.quality.reviewerStatus).toBe('unreviewed');
    }
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY.reviewAttestations).toEqual([]);
    expect(report.stagingRuleQualityReady).toBe(false);
    expect(report.reviewAttestationAuthorityPresent).toBe(false);
    expect(report.reviewerTrustContextAndAttestationsReady).toBe(false);
    expect(report.productionDomainReviewReady).toBe(false);
    expect(report.productionRuleQualityReady).toBe(false);
  });

  test('Production lifecycle remains blocked even though the isolated producer is ready', () => {
    const report = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();

    expect(report.spouseT8ProducerReady).toBe(true);
    expect(report.productionLifecycleReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('producer readiness does not activate narrative, compatibility, or default-route consumers', () => {
    const report = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();

    expect(report.consumerNarrativeReadiness).toBe(false);
    expect(report.compatibilityConsumerReadiness).toBe(false);
    expect(report.defaultRouteReadiness).toBe(false);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.consumerNarrativeActivated).toBe(
      false,
    );
    expect(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.compatibilityConsumerActivated,
    ).toBe(false);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.previewDefaultRouteChanged).toBe(
      false,
    );
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY.productionBehaviorChanged).toBe(
      false,
    );
  });

  test('the two admitted mappings remain exact and no forbidden demographic or second-chart input is introduced', () => {
    expect(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES.map((rule) => rule.output.value),
    ).toEqual([
      {
        dayMasterPolarity: '양',
        spouseStarSemantic: 'INDIRECT_WEALTH',
        tenGodNativeLabel: '편재',
        tenGodHanjaLabel: '偏財',
      },
      {
        dayMasterPolarity: '음',
        spouseStarSemantic: 'INDIRECT_POWER',
        tenGodNativeLabel: '편관',
        tenGodHanjaLabel: '偏官',
      },
    ]);

    const ruleMaterial = JSON.stringify(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES);
    for (const forbidden of [
      'sexForTraditionalCalculation',
      'partnerSex',
      'partnerIdentity',
      'sexualOrientation',
      'genderIdentity',
      'secondChart',
    ]) {
      expect(ruleMaterial).not.toContain(forbidden);
    }

    expect(RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_SEMANTIC_BOUNDARY).toEqual({
      t5SubtypeReconstructionAuthorized: false,
      t5SlotReconstructionAuthorized: false,
      genericRelationshipT8RelabellingAuthorized: false,
      nativeSexInputRequired: false,
      partnerSexInputRequired: false,
      partnerIdentityInputRequired: false,
      sexualOrientationInputRequired: false,
      genderIdentityInputRequired: false,
      secondChartInputRequired: false,
      compatibilityInputRequired: false,
      marriageGuaranteeInferenceAuthorized: false,
      fertilityInferenceAuthorized: false,
      relationshipLegalityOrEthicsInferenceAuthorized: false,
      compatibilityScoringAuthorized: false,
    });
  });

  test('records deterministic closure controls and the next concrete authority work', () => {
    const first = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();
    const second = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_CONTROL_IDS);
    expect(first.controlCount).toBe(12);
    expect(first.recommendedNextAction).toBe(
      'ESTABLISH_PROMOTION_PROVENANCE_AND_TRUST_PINNED_REVIEW_AUTHORITY_BEFORE_ANY_LIFECYCLE_PROMOTION',
    );
  });
});
