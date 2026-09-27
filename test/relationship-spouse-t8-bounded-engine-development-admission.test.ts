import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_DECISION,
  buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission,
  evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission,
  type RelationshipSpouseT8BoundedEngineDevelopmentAdmissionInput,
} from '../src/research/relationship-spouse-t8-bounded-engine-development-admission.js';
import { buildRelationshipSpouseT8AiAssistedInternalReview } from '../src/research/relationship-spouse-t8-ai-assisted-internal-review.js';
import { buildRelationshipSpouseT8DomainReviewSubjectManifest } from '../src/research/relationship-spouse-t8-domain-review-subject-manifest.js';
import { buildRelationshipSpouseT8EngineGovernanceHandoff } from '../src/research/relationship-spouse-t8-engine-governance-handoff.js';
import { RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY } from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

function currentInput(): RelationshipSpouseT8BoundedEngineDevelopmentAdmissionInput {
  const manifest = buildRelationshipSpouseT8DomainReviewSubjectManifest();
  const aiReview = buildRelationshipSpouseT8AiAssistedInternalReview();
  const governance = buildRelationshipSpouseT8EngineGovernanceHandoff();
  const methodology = manifest.subjects.find(
    (subject) => subject.subjectType === 'methodology',
  );
  if (methodology === undefined) throw new Error('fixture requires methodology');

  return {
    projectOwnerDecision:
      RELATIONSHIP_SPOUSE_T8_BOUNDED_ENGINE_DEVELOPMENT_DECISION,
    capabilityKey: aiReview.capabilityKey,
    runtimeVersion: manifest.runtimeVersion,
    runtimeScope:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.runtimeScope,
    sourceBindingMaterialized:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY.sourceBindingMaterialized,
    registrySnapshotId: manifest.registrySnapshotId,
    methodologyRef: methodology.subjectRef,
    currentSubjects: manifest.subjects,
    reviewedSubjects: aiReview.attestations.map((attestation) => ({
      subjectType: attestation.subjectType,
      subjectRef: attestation.subjectRef,
      reviewLevel: attestation.reviewLevel,
      decision: attestation.decision,
    })),
    sourceRoleBoundaryPreserved:
      aiReview.sourceReview.sourceRoleBoundaryPreserved,
    exactCurrentSubjectBinding: aiReview.exactCurrentSubjectBinding,
    aiAssistedInternalReviewEstablished:
      aiReview.authority.aiAssistedInternalReviewEstablished,
    independentHumanDomainReviewEstablished:
      aiReview.authority.independentHumanDomainReviewEstablished,
    domainReviewAuthorityEstablished:
      aiReview.authority.domainReviewAuthorityEstablished,
    trustedDomainAttestationEstablished:
      aiReview.authority.trustedDomainAttestationEstablished,
    actualReviewerTrustGrantCount:
      aiReview.authority.actualReviewerTrustGrantCount,
    lifecyclePromotionAuthorized:
      aiReview.authority.lifecyclePromotionAuthorized,
    officialReadingAuthorityAuthorized:
      aiReview.authority.officialReadingAuthorityAuthorized,
    productionAdmissionAuthority:
      aiReview.authority.productionAdmissionAuthority,
    production: aiReview.authority.production,
    governedClaimBoundary: governance.governedClaimBoundary,
  };
}

describe('Relationship / Spouse T8 bounded Engine-development admission', () => {
  it('admits exactly the current source-bound + AI-internal-reviewed Spouse T8 surface for Engine development only', () => {
    const admission =
      buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();

    expect(admission.capabilityKey).toBe('relationship:natal:spouse');
    expect(admission.runtimeVersion).toBe('1.0.1');
    expect(admission.runtimeScope).toBe('isolated_research_only');
    expect(admission.runtimeBindingReady).toBe(true);
    expect(admission.reviewBindingReady).toBe(true);
    expect(admission.authoritySeparationPreserved).toBe(true);
    expect(admission.boundedEngineDevelopmentAdmitted).toBe(true);
    expect(admission.reviewEvidence).toEqual(
      expect.objectContaining({
        exactCurrentSubjectBinding: true,
        exactThreeSubjectBinding: true,
        sourceRoleBoundaryPreserved: true,
        aiAssistedInternalReviewEstablished: true,
        allThreeInternalApproved: true,
        independentHumanDomainReviewEstablished: false,
        domainReviewAuthorityEstablished: false,
        trustedDomainAttestationEstablished: false,
        actualReviewerTrustGrantCount: 0,
      }),
    );
    expect(admission.developmentScope).toEqual({
      engineProducerRuntimeDevelopment: true,
      engineCompositionDevelopment: true,
      deterministicGuardDevelopment: true,
      engineE2EDevelopment: true,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
    });
    expect(admission.authorityBoundary.production).toBe('HOLD');
    expect(admission.admittedAuthorityRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(admission.admittedMethodologyRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(admission.admittedRuleClaimContractRef?.contentHash).toMatch(
      /^[a-f0-9]{64}$/,
    );
    expect(admission.nextDisposition).toBe(
      'BUILD_SEPARATE_G2A_ADMITTED_HANDOFF',
    );
  });

  it('fails closed for a different capability instead of creating a reusable global AI-review policy', () => {
    const admission =
      evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission({
        ...currentInput(),
        capabilityKey: 'relationship:natal:general',
      });

    expect(admission.boundedEngineDevelopmentAdmitted).toBe(false);
    expect(admission.admittedAuthorityRef).toBeUndefined();
    expect(admission.nextDisposition).toBe(
      'HOLD_AUTHORITY_AND_REFRESH_REVIEW_OR_BINDING',
    );
  });

  it('requires exact content-addressed review subjects and rejects source drift', () => {
    const input = currentInput();
    const mutatedSubjects = input.currentSubjects.map((subject, index) =>
      index === 0
        ? {
            ...subject,
            subjectRef: {
              ...subject.subjectRef,
              contentHash: '0'.repeat(64),
            },
          }
        : subject,
    );

    const admission =
      evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission({
        ...input,
        currentSubjects: mutatedSubjects,
      });

    expect(admission.reviewEvidence.exactThreeSubjectBinding).toBe(false);
    expect(admission.reviewBindingReady).toBe(false);
    expect(admission.boundedEngineDevelopmentAdmitted).toBe(false);
    expect(admission.admittedAuthorityRef).toBeUndefined();
  });

  it('requires all three decisions to remain approved/internal', () => {
    const input = currentInput();
    const reviewedSubjects = input.reviewedSubjects.map((subject, index) =>
      index === 0
        ? {
            ...subject,
            decision: 'rejected' as const,
          }
        : subject,
    );

    const admission =
      evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission({
        ...input,
        reviewedSubjects,
      });

    expect(admission.reviewEvidence.allThreeInternalApproved).toBe(false);
    expect(admission.boundedEngineDevelopmentAdmitted).toBe(false);
  });

  it('requires the reviewed source-role boundary to remain intact', () => {
    const admission =
      evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission({
        ...currentInput(),
        sourceRoleBoundaryPreserved: false,
      });

    expect(admission.reviewBindingReady).toBe(false);
    expect(admission.boundedEngineDevelopmentAdmitted).toBe(false);
  });

  it('rejects authority escalation instead of treating AI review as human/domain/Production authority', () => {
    const input = currentInput();
    const admission =
      evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission({
        ...input,
        independentHumanDomainReviewEstablished: true,
        domainReviewAuthorityEstablished: true,
        trustedDomainAttestationEstablished: true,
        actualReviewerTrustGrantCount: 1,
        lifecyclePromotionAuthorized: true,
        officialReadingAuthorityAuthorized: true,
        productionAdmissionAuthority: true,
        production: 'READY',
      });

    expect(admission.authoritySeparationPreserved).toBe(false);
    expect(admission.boundedEngineDevelopmentAdmitted).toBe(false);
    expect(admission.developmentScope.productionAdmissionAuthorized).toBe(false);
    expect(admission.authorityBoundary.production).toBe('HOLD');
  });

  it('requires the explicit Product-owner development-only decision', () => {
    const admission =
      evaluateRelationshipSpouseT8BoundedEngineDevelopmentAdmission({
        ...currentInput(),
        projectOwnerDecision: 'NOT_APPROVED',
      });

    expect(admission.boundedEngineDevelopmentAdmitted).toBe(false);
    expect(admission.admittedAuthorityRef).toBeUndefined();
  });

  it('is deterministic for the same governed repository state', () => {
    const left =
      buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
    const right =
      buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();

    expect(left.admissionId).toBe(right.admissionId);
    expect(left.admittedAuthorityRef).toEqual(right.admittedAuthorityRef);
    expect(left.admittedRuleClaimContractRef).toEqual(
      right.admittedRuleClaimContractRef,
    );
  });
});
