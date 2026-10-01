import { describe, expect, test } from 'vitest';
import {
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview,
} from '../src/research/relationship-spouse-t8-day-branch-palace-shadow-staging-execution-review.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission,
  evaluateRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-consumer-evidence-admission.js';

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5J staging consumer evidence admission', () => {
  test('admits the exact SA-5I staging claim to governed spouse-reading evidence selection only', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();

    expect(result.issue).toBe('#1912');
    expect(result.semanticVersion).toBe('2.0.0');
    expect(result.blockers).toEqual([]);
    expect(result.governedConsumerEvidenceSelectionAdmitted).toBe(true);
    expect(result.admissionId).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.nextDisposition).toBe(
      'RUN_SA_5K_NARRATIVE_ELIGIBILITY_AND_DELIVERY_AUTHORITY_REVIEW',
    );
    expect(result.checks).toEqual({
      shadowReviewIntegrityValid: true,
      exactShadowReviewBinding: true,
      shadowGateSatisfied: true,
      exactExistingSpouseProfile: true,
      exactProfileSelectionAuthorization: true,
      exactStagingExecutionIdentity: true,
      exactConsumerIntentAndCoverage: true,
      exactGovernedEvidenceBundle: true,
      exactSemanticAndReviewBoundary: true,
      genericPreparationConstraintsPreserved: true,
      noNarrativeOrDeliveryExpansion: true,
    });
  });

  test('uses the existing spouse natal Reading Profile and selection-only authorization', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();

    expect(result.profileRef).toEqual(
      expect.objectContaining({
        id: 'myeonghwa-reading-profile-relationship-spouse-natal-v1',
        version: '1.0.0',
      }),
    );
    expect(result.profileAuthorizationRef).toEqual(
      expect.objectContaining({
        id: 'myeonghwa-reading-profile-selection-authorization:myeonghwa-reading-profile-relationship-spouse-natal-v1',
        version: '1.0.0',
      }),
    );
    expect(
      result.preparation.composition?.profileAuthorization?.scope,
    ).toBe('reading_evidence_selection_only');
    expect(
      result.preparation.composition?.profileAuthorization?.constraints,
    ).toEqual({
      mayAuthorizeInterpretationRules: false,
      mayAuthorizeClaimGeneration: false,
      mayAuthorizeDomainSemantics: false,
      mayPromoteResearchAuthority: false,
      mayOverrideInterpretationAuthorization: false,
    });
  });

  test('selects exactly one 2.0 position-only claim and the canonical Day Pillar evidence', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();
    const composition = result.preparation.composition;
    const evidence = composition?.evidence;

    expect(result.preparation.state).toBe('ready_for_execution');
    expect(composition?.selection.coverageState).toBe('complete');
    expect(composition?.selection.targetClaimIds).toHaveLength(1);
    expect(composition?.selection.selectedClaimIds).toEqual(
      composition?.selection.targetClaimIds,
    );
    expect(evidence?.bundle.claims).toHaveLength(1);
    expect(evidence?.bundle.claims[0]?.claimType).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
    );
    expect(evidence?.bundle.claims[0]?.value).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(evidence?.bundle.canonicalFacts).toHaveLength(1);
    expect(evidence?.bundle.canonicalFacts[0]).toEqual(
      expect.objectContaining({
        ref: 'pillars.day',
        path: 'pillars.day',
      }),
    );
    expect(evidence?.bundle.sourceSummaries).toHaveLength(2);
    expect(evidence?.bundle.registrySnapshotId).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    );
  });

  test('preserves the exact semantic, provenance, and unreviewed authority boundary', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(false);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value,
    ).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .provenanceQuality,
    ).toBe('multi_source_supported');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .reviewAttestations,
    ).toEqual([]);
    expect(result.checks.exactSemanticAndReviewBoundary).toBe(true);
  });

  test('does not convert generic Product Reading readiness into narrative or artifact authority', () => {
    const result =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();

    expect(result.preparation.executionEligibility).toMatchObject({
      readingExecution: 'allowed',
      artifactAssembly: 'allowed_after_authority_execution',
    });
    expect(result.authorityBoundary).toEqual({
      exactCandidateOnly: true,
      stagingExecutionAuthorityPreserved: true,
      readingProfileSelectionAuthorized: true,
      governedEvidenceSelectionAuthorized: true,
      genericProductReadingPreparationReady: true,
      consumerAdmissionScope: 'governed_reading_evidence_selection_only',
      humanDomainReviewEstablished: false,
      reviewAttestationCreated: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      narrativeConsumerActivated: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('fails closed when SA-5I content changes under the stale review identity', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();
    const forged = {
      ...current,
      requiredShadowStagingEvidenceComplete: false,
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission({
        shadowReview: forged,
      });

    expect(result.checks.shadowReviewIntegrityValid).toBe(false);
    expect(result.checks.exactShadowReviewBinding).toBe(false);
    expect(result.checks.shadowGateSatisfied).toBe(false);
    expect(result.governedConsumerEvidenceSelectionAdmitted).toBe(false);
    expect(result.authorityBoundary.exactCandidateOnly).toBe(false);
    expect(result.nextDisposition).toBe(
      'HOLD_AND_REPAIR_SA_5J_CONSUMER_EVIDENCE_ADMISSION',
    );
  });

  test('fails closed when a changed SA-5I review is rehashed into a new valid identity', () => {
    const current =
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();
    const { reviewId: _currentReviewId, ...currentMaterial } = current;
    expect(_currentReviewId).toBe(current.reviewId);

    const changedMaterial = {
      ...currentMaterial,
      requiredShadowStagingEvidenceComplete: false,
    };
    const changed = {
      reviewId: deterministicContentHash(changedMaterial),
      ...changedMaterial,
    } as typeof current;

    const result =
      evaluateRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission({
        shadowReview: changed,
      });

    expect(result.checks.shadowReviewIntegrityValid).toBe(true);
    expect(result.checks.exactShadowReviewBinding).toBe(false);
    expect(result.checks.shadowGateSatisfied).toBe(false);
    expect(result.governedConsumerEvidenceSelectionAdmitted).toBe(false);
  });

  test('is deterministic for the exact same SA-5I review and consumer fixture', () => {
    const left =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();
    const right =
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();

    expect(left.admissionId).toBe(right.admissionId);
    expect(left.preparation.preparationId).toBe(right.preparation.preparationId);
    expect(left.governedEvidenceHash).toBe(right.governedEvidenceHash);
    expect(left.profileRef).toEqual(right.profileRef);
    expect(left.profileAuthorizationRef).toEqual(
      right.profileAuthorizationRef,
    );
  });
});
