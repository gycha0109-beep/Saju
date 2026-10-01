import { describe, expect, test } from 'vitest';
import type { ReviewAttestation } from '../src/contracts/interpretation.js';
import {
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';
import type { ReviewerTrustContext } from '../src/interpretation/reviewer-trust.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL,
  buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest,
  evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission,
  type RelationshipSpouseT8DayBranchPalaceNarrativeMaterialityDecision,
} from '../src/research/relationship-spouse-t8-day-branch-palace-human-domain-materiality-request.js';

async function syntheticApprovedSubmission() {
  const request =
    await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();
  const reviewerId = 'SYNTHETIC-DOMAIN-REVIEWER-SA5L-TEST';

  const attestations: readonly ReviewAttestation[] = request.subjects.map(
    (subject, index) => ({
      attestationId: `sa5l-synthetic-${subject.subjectType}-${index + 1}`,
      subjectType: subject.subjectType,
      subjectRef: subject.subjectRef,
      reviewLevel: 'domain',
      reviewerId,
      reviewedAt: '2026-10-01T05:40:00.000Z',
      decision: 'approved',
      notes: 'Synthetic test fixture only; not a real human/domain attestation.',
    }),
  );

  const reviewerTrustContext: ReviewerTrustContext = {
    policyId: 'sa5l-synthetic-reviewer-trust-test',
    version: '1.0.0',
    grants: [
      {
        reviewerId,
        allowedReviewLevels: ['domain'],
        trustedAttestationContentHashes: attestations.map((attestation) =>
          deterministicContentHash(attestation),
        ),
        status: 'active',
      },
    ],
  };

  const materialityDecision: RelationshipSpouseT8DayBranchPalaceNarrativeMaterialityDecision =
    {
      decision:
        RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_MATERIALITY_APPROVAL,
      reviewerId,
      decidedAt: '2026-10-01T05:41:00.000Z',
      requestId: request.requestId,
      claimType: request.claimType,
      semanticFamily: request.semanticFamily,
      semanticVersion: request.semanticVersion,
      semanticScope: request.semanticScope,
      allowedNarrativeProposition:
        request.materialityDecisionRequirements.allowedNarrativeProposition,
      prohibitedExtensions:
        request.materialityDecisionRequirements.prohibitedExtensions,
      notes: 'Synthetic test fixture only; not a real human materiality decision.',
    };

  return {
    request,
    attestations,
    reviewerTrustContext,
    materialityDecision,
  };
}

describe('Relationship / Spouse T8 Day-Branch spouse-palace SA-5L human domain materiality request', () => {
  test('builds an exact pending external human/domain review request without granting authority', async () => {
    const request =
      await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();

    expect(request.issue).toBe('#1920');
    expect(request.requestState).toBe('PENDING_EXTERNAL_HUMAN_DOMAIN_REVIEW');
    expect(request.requestId).toMatch(/^[a-f0-9]{64}$/u);
    expect(request.requestRef).toEqual(
      expect.objectContaining({
        id: 'relationship-spouse-t8-day-branch-palace-human-domain-narrative-materiality-request',
        version: '1.0.0',
        contentHash: request.requestId,
      }),
    );
    expect(request.requiredReviewLevel).toBe('domain');
    expect(request.requiredReviewDecision).toBe('approved');
    expect(request.requiredAttestationCount).toBe(2);
    expect(request.currentAttestationCount).toBe(0);
    expect(request.subjects).toHaveLength(2);
    expect(request.subjects.map((subject) => subject.subjectType)).toEqual([
      'methodology',
      'rule',
    ]);
    expect(request.subjects.every((subject) => subject.attestationState === 'absent'))
      .toBe(true);
    expect(request.authorityBoundary).toEqual({
      requestManifestEstablished: true,
      humanDomainReviewEstablished: false,
      trustedDomainAttestationEstablished: false,
      reviewerTrustGrantEstablished: false,
      narrativeMaterialityDecisionEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      materialForNarrativeMutationAuthorized: false,
      narrativeProfileAuthorityEstablished: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('pins the exact current staging methodology and rule content refs', async () => {
    const request =
      await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();

    expect(request.subjects[0]?.subjectRef).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .methodologies[0],
    );
    expect(request.subjects[1]?.subjectRef).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.rules[0],
    );
    expect(request.stagingRegistrySnapshotId).toBe(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    );
    expect(request.stagingPackRef).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    );
  });

  test('requires a separate position-only narrative-materiality decision with frozen prohibited extensions', async () => {
    const request =
      await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();

    expect(request.materialityDecisionRequirements).toEqual({
      decision:
        'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY',
      decisionAuthority: 'TRUSTED_HUMAN_DOMAIN_REVIEWER',
      claimType:
        'relationship.spouse.traditional_spouse_palace_position',
      semanticScope: 'position_only',
      allowedNarrativeProposition: {
        position: 'day_branch',
        traditionalRole: 'spouse_palace',
        semanticScope: 'position_only',
      },
      prohibitedExtensions: [
        'spouse_star_selection',
        'partner_personality',
        'partner_identity',
        'marriage_timing',
        'marriage_outcome',
        'relationship_outcome',
        'favorable_unfavorable_palace_judgment',
        'yongshin_jisin_semantics',
        'second_chart_compatibility',
        'sex_scoped_spouse_role_expansion',
      ],
    });
  });

  test('accepts a fully trusted synthetic submission only as ready for a later authority-materialization review', async () => {
    const fixture = await syntheticApprovedSubmission();

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission({
        request: fixture.request,
        reviewAttestations: fixture.attestations,
        reviewerTrustContext: fixture.reviewerTrustContext,
        materialityDecision: fixture.materialityDecision,
      });

    expect(result.blockers).toEqual([]);
    expect(result.submissionReadyForLaterAuthorityMaterialization).toBe(true);
    expect(result.materialityDecisionRef).toEqual(
      expect.objectContaining({
        id: 'relationship-spouse-t8-day-branch-palace-human-domain-narrative-materiality-decision',
        version: '1.0.0',
      }),
    );
    expect(result.reviewerTrustRef).toEqual(
      expect.objectContaining({
        id: 'sa5l-synthetic-reviewer-trust-test',
        version: '1.0.0',
      }),
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW',
    );
    expect(result.authorityBoundary).toEqual({
      externalHumanInputsStructurallyAccepted: true,
      humanDomainReviewEstablished: false,
      trustedDomainAttestationMaterializedIntoRegistry: false,
      reviewerTrustGrantMaterializedIntoExecutionAuthority: false,
      narrativeMaterialityDecisionMaterialized: false,
      reviewerStatusPromotionAuthorized: false,
      materialForNarrativeMutationAuthorized: false,
      narrativeProfileAuthorityEstablished: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('rejects untrusted domain attestations', async () => {
    const fixture = await syntheticApprovedSubmission();
    const untrustedContext: ReviewerTrustContext = {
      policyId: 'sa5l-synthetic-reviewer-trust-test',
      version: '1.0.0',
      grants: [
        {
          reviewerId: fixture.materialityDecision.reviewerId,
          allowedReviewLevels: ['domain'],
          trustedAttestationContentHashes: ['0'.repeat(64)],
          status: 'active',
        },
      ],
    };

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission({
        request: fixture.request,
        reviewAttestations: fixture.attestations,
        reviewerTrustContext: untrustedContext,
        materialityDecision: fixture.materialityDecision,
      });

    expect(result.checks.trustedDomainAttestations).toBe(false);
    expect(result.submissionReadyForLaterAuthorityMaterialization).toBe(false);
    expect(result.materialityDecisionRef).toBeUndefined();
    expect(result.nextDisposition).toBe(
      'HOLD_PENDING_OR_REPAIR_EXTERNAL_HUMAN_DOMAIN_SUBMISSION',
    );
  });

  test('rejects revoked reviewer trust even when attestation hashes are pinned', async () => {
    const fixture = await syntheticApprovedSubmission();
    const revokedContext: ReviewerTrustContext = {
      ...fixture.reviewerTrustContext,
      grants: fixture.reviewerTrustContext.grants.map((grant) => ({
        ...grant,
        status: 'revoked' as const,
      })),
    };

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission({
        request: fixture.request,
        reviewAttestations: fixture.attestations,
        reviewerTrustContext: revokedContext,
        materialityDecision: fixture.materialityDecision,
      });

    expect(result.checks.trustedDomainAttestations).toBe(false);
    expect(result.checks.decisionReviewerTrustedForDomain).toBe(false);
    expect(result.submissionReadyForLaterAuthorityMaterialization).toBe(false);
  });

  test('rejects non-domain or rejected attestation content', async () => {
    const fixture = await syntheticApprovedSubmission();
    const rejectedAttestations = fixture.attestations.map((attestation, index) =>
      index === 0
        ? {
            ...attestation,
            reviewLevel: 'internal' as const,
            decision: 'rejected' as const,
          }
        : attestation,
    );
    const reviewerTrustContext: ReviewerTrustContext = {
      policyId: 'sa5l-rejected-test',
      version: '1.0.0',
      grants: [
        {
          reviewerId: fixture.materialityDecision.reviewerId,
          allowedReviewLevels: ['domain', 'internal'],
          trustedAttestationContentHashes: rejectedAttestations.map(
            (attestation) => deterministicContentHash(attestation),
          ),
          status: 'active',
        },
      ],
    };

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission({
        request: fixture.request,
        reviewAttestations: rejectedAttestations,
        reviewerTrustContext,
        materialityDecision: fixture.materialityDecision,
      });

    expect(result.checks.exactDomainAttestations).toBe(false);
    expect(result.submissionReadyForLaterAuthorityMaterialization).toBe(false);
  });

  test('rejects narrative-materiality expansion beyond the frozen position-only proposition', async () => {
    const fixture = await syntheticApprovedSubmission();
    const expandedDecision = {
      ...fixture.materialityDecision,
      allowedNarrativeProposition: {
        ...fixture.materialityDecision.allowedNarrativeProposition,
        semanticScope: 'position_only',
      },
      prohibitedExtensions: fixture.materialityDecision.prohibitedExtensions.filter(
        (value) => value !== 'partner_personality',
      ),
    } as typeof fixture.materialityDecision;

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission({
        request: fixture.request,
        reviewAttestations: fixture.attestations,
        reviewerTrustContext: fixture.reviewerTrustContext,
        materialityDecision: expandedDecision,
      });

    expect(result.checks.exactMaterialityDecision).toBe(false);
    expect(result.submissionReadyForLaterAuthorityMaterialization).toBe(false);
  });

  test('rejects a stale or modified request identity', async () => {
    const fixture = await syntheticApprovedSubmission();
    const forged = {
      ...fixture.request,
      governedEvidenceHash: 'forged',
    } as typeof fixture.request;

    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission({
        request: forged,
        reviewAttestations: fixture.attestations,
        reviewerTrustContext: fixture.reviewerTrustContext,
        materialityDecision: fixture.materialityDecision,
      });

    expect(result.checks.requestIntegrityValid).toBe(false);
    expect(result.checks.exactRequestBinding).toBe(false);
    expect(result.submissionReadyForLaterAuthorityMaterialization).toBe(false);
  });

  test('never mutates the current staging registry, reviewer status, or materialForNarrative flag', async () => {
    const fixture = await syntheticApprovedSubmission();
    const result =
      await evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission({
        request: fixture.request,
        reviewAttestations: fixture.attestations,
        reviewerTrustContext: fixture.reviewerTrustContext,
        materialityDecision: fixture.materialityDecision,
      });

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
        .reviewAttestations,
    ).toEqual([]);
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(false);
    expect(result.checks.existingAuthorityStillUnmutated).toBe(true);
  });
});
