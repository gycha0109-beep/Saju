import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127,
} from './five-officers-intake-methodology-review-actor-evidence-policy-materialization-admission-fr127.js';
import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';

describe('FR127 methodology review actor/evidence-policy materialization admission', () => {
  it('blocks materialization until governed provenance and provenance admission exist', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127(value);
    expect(value.authorityState).toBe(
      'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance',
    );
    expect(value.admission.fr126ActorDefinitionContractReady).toBe(true);
    expect(value.admission.fr126EvidencePolicyDefinitionContractReady).toBe(true);
    expect(value.admission.governedActorProvenancePresent).toBe(false);
    expect(value.admission.governedEvidencePolicyProvenancePresent).toBe(false);
    expect(value.admission.actorRegistryAppendAuthorized).toBe(false);
    expect(value.admission.evidencePolicyRegistryAppendAuthorized).toBe(false);
  });

  it('keeps all provenance, actor, policy, and decision refs unresolved', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    expect(value.currentProvenance.governedActorProvenanceRef).toBeNull();
    expect(value.currentProvenance.governedActorProvenanceAdmissionRef).toBeNull();
    expect(value.currentProvenance.governedEvidencePolicyProvenanceRef).toBeNull();
    expect(value.currentProvenance.governedEvidencePolicyProvenanceAdmissionRef).toBeNull();
    expect(value.currentProvenance.governedAuthorityActorRef).toBeNull();
    expect(value.currentProvenance.governedReviewEvidencePolicyRef).toBeNull();
    expect(value.currentProvenance.admittedReviewEvidenceRefs).toEqual([]);
    expect(value.currentProvenance.configuredQuorum).toBeNull();
    expect(value.currentProvenance.configuredReviewerCount).toBeNull();
    expect(value.currentProvenance.configuredConsensusThreshold).toBeNull();
  });

  it('preserves empty FR126 registries and historical research authority', () => {
    expect(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors).toHaveLength(0);
    expect(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies).toHaveLength(0);
    expect(FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions).toHaveLength(0);

    const method = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (candidate) => `${candidate.methodologyId}@${candidate.version}` === 'method.shenxiang.five_officers.intake_criteria@0.2.0',
    );
    const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
      (candidate) => `${candidate.methodologyId}@${candidate.version}` === 'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );
    const source = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
      (candidate) => candidate.passageId === 'passage.shenxiang.five_officers.intake.nlc_1925',
    );
    expect(method?.reviewStatus).toBe('research');
    expect(source?.verificationStatus).toBe('scan_checked');
    expect(proposed).toBeUndefined();
  });

  it('keeps every downstream authority count at zero', () => {
    const value = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127();
    for (const [key, count] of Object.entries(value.execution)) {
      if (key === 'traditionalSemanticAuthority') expect(count).toBe(false);
      else expect(count).toBe(0);
    }
    expect(value.admission.decisionMaterializationAuthorized).toBe(false);
    expect(value.admission.reviewedPromotionAuthorized).toBe(false);
    expect(value.admission.reviewedSuccessorPersisted).toBe(false);
  });
});
