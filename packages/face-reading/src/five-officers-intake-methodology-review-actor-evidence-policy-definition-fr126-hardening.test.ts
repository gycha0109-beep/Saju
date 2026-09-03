import { describe, expect, it } from 'vitest';
import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
  validateMethodologyReviewAuthorityActorRegistryFR126,
  validateMethodologyReviewEvidencePolicyRegistryFR126,
  type FiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126V1,
  type MethodologyReviewAuthorityActorDefinitionFR126V1,
  type MethodologyReviewEvidencePolicyDefinitionFR126V1,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';

describe('FR126 methodology review actor/evidence-policy definition hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
    const forged = structuredClone(issued) as FiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126V1;
    expect(() => assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126(forged)).toThrow(/FR-126/);
  });

  it('accepts structurally valid synthetic definitions without treating them as current governed authority', () => {
    const actor = Object.freeze({
      actorId: 'actor.synthetic.methodology_reviewer',
      version: '0.1.0',
      authorityScope: 'methodology_review_promotion' as const,
      provenanceRefs: Object.freeze(['evidence.synthetic.actor_provenance']),
      limitations: Object.freeze(['synthetic structural fixture only']),
      sourceVerificationAuthorityInherited: false as const,
      repositoryMergeAuthorityInherited: false as const,
      pieOperationalAuthorityInherited: false as const,
      legacyReviewedScalarAuthorityInherited: false as const,
    } satisfies MethodologyReviewAuthorityActorDefinitionFR126V1);
    const policy = Object.freeze({
      policyId: 'policy.synthetic.methodology_review_evidence',
      version: '0.1.0',
      policyScope: 'methodology_review_promotion' as const,
      provenanceRefs: Object.freeze(['evidence.synthetic.policy_provenance']),
      limitations: Object.freeze(['synthetic structural fixture only']),
      structuralValidityMeansSemanticApproval: false as const,
      sourceVerificationMeansMethodologyApproval: false as const,
      pieOperationalEvidenceMeansMethodologySemanticEvidence: false as const,
      legacyReviewedScalarMeansPolicyPrecedent: false as const,
    } satisfies MethodologyReviewEvidencePolicyDefinitionFR126V1);

    expect(() => validateMethodologyReviewAuthorityActorRegistryFR126({
      registryId: 'registry.synthetic.methodology_review_actors',
      version: '0.1.0',
      actors: [actor],
    })).not.toThrow();
    expect(() => validateMethodologyReviewEvidencePolicyRegistryFR126({
      registryId: 'registry.synthetic.methodology_review_evidence_policies',
      version: '0.1.0',
      policies: [policy],
    })).not.toThrow();

    const current = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
    expect(current.authorityBoundary.structurallyValidActorDefinitionMeansGovernedActor).toBe(false);
    expect(current.authorityBoundary.structurallyValidEvidencePolicyMeansGovernedPolicy).toBe(false);
    expect(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors).toHaveLength(0);
    expect(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies).toHaveLength(0);
    expect(current.admission.decisionMaterializationAuthorized).toBe(false);
  });

  it('rejects duplicate synthetic actor and policy definitions', () => {
    const actor: MethodologyReviewAuthorityActorDefinitionFR126V1 = {
      actorId: 'actor.synthetic.duplicate',
      version: '0.1.0',
      authorityScope: 'methodology_review_promotion',
      provenanceRefs: ['evidence.synthetic.actor'],
      limitations: ['synthetic only'],
      sourceVerificationAuthorityInherited: false,
      repositoryMergeAuthorityInherited: false,
      pieOperationalAuthorityInherited: false,
      legacyReviewedScalarAuthorityInherited: false,
    };
    const policy: MethodologyReviewEvidencePolicyDefinitionFR126V1 = {
      policyId: 'policy.synthetic.duplicate',
      version: '0.1.0',
      policyScope: 'methodology_review_promotion',
      provenanceRefs: ['evidence.synthetic.policy'],
      limitations: ['synthetic only'],
      structuralValidityMeansSemanticApproval: false,
      sourceVerificationMeansMethodologyApproval: false,
      pieOperationalEvidenceMeansMethodologySemanticEvidence: false,
      legacyReviewedScalarMeansPolicyPrecedent: false,
    };

    expect(() => validateMethodologyReviewAuthorityActorRegistryFR126({
      registryId: 'registry.synthetic.duplicate_actors',
      version: '0.1.0',
      actors: [actor, actor],
    })).toThrow(/duplicate methodology review authority actor definition/);
    expect(() => validateMethodologyReviewEvidencePolicyRegistryFR126({
      registryId: 'registry.synthetic.duplicate_policies',
      version: '0.1.0',
      policies: [policy, policy],
    })).toThrow(/duplicate methodology review evidence policy definition/);
  });

  it('does not inherit methodology authority from source verification, repository identity, PIE, or legacy reviewed state', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
    expect(value.authorityBoundary.sourceVerificationCheckerMeansMethodologyReviewActor).toBe(false);
    expect(value.authorityBoundary.gitHubIdentityMeansMethodologyReviewActor).toBe(false);
    expect(value.authorityBoundary.pullRequestMergerMeansMethodologyReviewActor).toBe(false);
    expect(value.authorityBoundary.pieOperationalPolicyMeansMethodologyEvidencePolicy).toBe(false);
    expect(value.authorityBoundary.legacyReviewedScalarMeansActorOrPolicyPrecedent).toBe(false);
    expect(value.authorityBoundary.nonEmptyProvenanceRefsMeanSemanticApproval).toBe(false);
  });

  it('keeps schema definition separate from decision, metric, threshold, state, and claim authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
    expect(value.authorityBoundary.actorSchemaMeansActorAuthority).toBe(false);
    expect(value.authorityBoundary.evidencePolicySchemaMeansAdmittedEvidenceAuthority).toBe(false);
    expect(value.authorityBoundary.actorOrPolicyDefinitionMeansDecisionAuthority).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansThreshold).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansClaim).toBe(false);
    expect(value.authorityBoundary.historicalArtifactMutated).toBe(false);
    expect(value.nextFrontier).toBe('governed_methodology_review_actor_and_evidence_policy_materialization');
  });
});
