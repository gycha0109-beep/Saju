import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket,
} from '../src/research/relationship-spouse-t8-day-branch-palace-external-review-handoff-packet.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest,
} from '../src/research/relationship-spouse-t8-day-branch-palace-human-domain-materiality-request.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

describe('Relationship / Spouse T8 Day-Branch external human-domain review handoff packet', () => {
  test('binds exactly to the current SA-5L request and review subjects', async () => {
    const request =
      await buildRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialityRequest();
    const packet =
      await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();

    expect(packet.issue).toBe('#1930');
    expect(packet.upstreamRequestId).toBe(request.requestId);
    expect(packet.upstreamRequestRef).toEqual(request.requestRef);
    expect(packet.stagingRegistrySnapshotId).toBe(
      request.stagingRegistrySnapshotId,
    );
    expect(packet.stagingPackRef).toEqual(request.stagingPackRef);
    expect(packet.subjects).toHaveLength(2);
    expect(
      packet.subjects.map(({ subjectType, subjectRef }) => ({
        subjectType,
        subjectRef,
      })),
    ).toEqual(
      request.subjects.map(({ subjectType, subjectRef }) => ({
        subjectType,
        subjectRef,
      })),
    );
  });

  test('leaves every reviewer-authored attestation field unset', async () => {
    const packet =
      await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();

    expect(
      packet.subjects.every(
        (subject) =>
          subject.requiredReviewLevel === 'domain' &&
          subject.requiredDecision === 'approved' &&
          subject.reviewerSupplied.attestationId === null &&
          subject.reviewerSupplied.reviewerId === null &&
          subject.reviewerSupplied.reviewedAt === null &&
          subject.reviewerSupplied.decision === null &&
          subject.reviewerSupplied.notes === null,
      ),
    ).toBe(true);
  });

  test('freezes the position-only materiality scope without issuing a decision', async () => {
    const packet =
      await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();

    expect(packet.materialityReviewForm.requiredDecision).toBe(
      'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY',
    );
    expect(packet.materialityReviewForm.allowedNarrativeProposition).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(packet.materialityReviewForm.prohibitedExtensions).toEqual([
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
    ]);
    expect(packet.materialityReviewForm.reviewerSupplied).toEqual({
      decision: null,
      reviewerId: null,
      decidedAt: null,
      notes: null,
    });
  });

  test('does not mint reviewer trust and preserves the current authority HOLD', async () => {
    const packet =
      await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();

    expect(packet.reviewerTrustRequirements.trustContextGeneratedByPacket).toBe(
      false,
    );
    expect(packet.reviewerTrustRequirements.trustGrantGeneratedByPacket).toBe(
      false,
    );
    expect(packet.authorityBoundary).toEqual({
      handoffPacketEstablished: true,
      humanDomainReviewEstablished: false,
      reviewAttestationCreated: false,
      reviewerTrustContextCreated: false,
      reviewerTrustGrantCreated: false,
      narrativeMaterialityDecisionCreated: false,
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
  });

  test('is deterministic and routes only a validated real package toward SA-5M', async () => {
    const first =
      await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();
    const second =
      await buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket();

    expect(first.packetId).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.packetId).toBe(second.packetId);
    expect(first).toEqual(second);
    expect(first.intakeFlow.validator).toBe(
      'evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission',
    );
    expect(first.intakeFlow.validatorPassDisposition).toBe(
      'RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW',
    );
    expect(first.nextDisposition).toBe(
      'AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_REVIEW_INPUTS',
    );
  });
});
