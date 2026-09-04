import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
  type FiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127V1,
} from './five-officers-intake-methodology-review-actor-evidence-policy-materialization-admission-fr127.js';

describe('FR127 methodology review actor/evidence-policy materialization admission hardening', () => {
  it('rejects a forged issued artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    const forged = structuredClone(issued) as FiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127V1;
    expect(() => assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127(forged)).toThrow(/FR-127/);
  });

  it('does not treat contract existence or arbitrary provenance strings as materialization authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    expect(value.authorityBoundary.definitionContractMeansMaterializationAuthority).toBe(false);
    expect(value.authorityBoundary.provenanceStringMeansGovernedProvenance).toBe(false);
    expect(value.authorityBoundary.structurallyValidDefinitionMeansGovernedMaterialization).toBe(false);
    expect(value.admission.actorDefinitionMaterialized).toBe(false);
    expect(value.admission.evidencePolicyDefinitionMaterialized).toBe(false);
  });

  it('forbids source verification, repository identity, PR merge, PIE, and legacy reviewed status as provenance substitutes', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    expect(value.materializationRequirements.sourceVerificationRecordMaySubstituteForActorProvenance).toBe(false);
    expect(value.materializationRequirements.sourceCheckerIdentityMaySubstituteForActorProvenance).toBe(false);
    expect(value.materializationRequirements.gitHubIdentityMaySubstituteForActorProvenance).toBe(false);
    expect(value.materializationRequirements.pullRequestMergeMaySubstituteForActorProvenance).toBe(false);
    expect(value.materializationRequirements.pieOperationalPolicyMaySubstituteForEvidencePolicyProvenance).toBe(false);
    expect(value.materializationRequirements.legacyReviewedScalarMaySubstituteForActorOrPolicyProvenance).toBe(false);
    expect(value.authorityBoundary.sourceVerificationMeansMethodologyReviewGovernance).toBe(false);
    expect(value.authorityBoundary.sourceCheckerMeansMethodologyReviewActor).toBe(false);
    expect(value.authorityBoundary.repositoryIdentityMeansMethodologyReviewActor).toBe(false);
    expect(value.authorityBoundary.pullRequestMergeMeansMethodologyReviewAdjudication).toBe(false);
    expect(value.authorityBoundary.pieOperationalReadinessMeansMethodologyEvidencePolicy).toBe(false);
    expect(value.authorityBoundary.legacyReviewedScalarMeansMaterializationPrecedent).toBe(false);
  });

  it('requires provenance admission before either FR126 registry may be appended', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    expect(value.materializationRequirements.governedActorProvenanceRequired).toBe(true);
    expect(value.materializationRequirements.governedEvidencePolicyProvenanceRequired).toBe(true);
    expect(value.materializationRequirements.actorProvenanceMustBeAdmittedBeforeRegistryAppend).toBe(true);
    expect(value.materializationRequirements.evidencePolicyProvenanceMustBeAdmittedBeforeRegistryAppend).toBe(true);
    expect(value.materializationRequirements.provenanceMustBeBoundToMethodologyReviewScope).toBe(true);
    expect(value.admission.governedActorProvenanceAdmitted).toBe(false);
    expect(value.admission.governedEvidencePolicyProvenanceAdmitted).toBe(false);
    expect(value.admission.actorRegistryAppendAuthorized).toBe(false);
    expect(value.admission.evidencePolicyRegistryAppendAuthorized).toBe(false);
  });

  it('does not collapse actor/policy materialization into decision or semantic authority', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    expect(value.authorityBoundary.actorOrPolicyMaterializationMeansDecisionAuthority).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansThreshold).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.reviewDecisionMeansClaim).toBe(false);
    expect(value.authorityBoundary.historicalArtifactMutated).toBe(false);
    expect(value.nextFrontier).toBe('methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission');
  });
});
