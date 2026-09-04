import { describe, expect, it } from 'vitest';
import {
  FR139_GOVERNANCE_REQUEST_REF,
  FR139_NEXT_FRONTIER,
  assessSquareBroadFangGovernanceAdmissionFR139,
  assertIssuedSquareBroadFangGovernanceAdmissionFR139,
  validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139,
  validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139,
} from './five-officers-square-broad-fang-governance-admission-fr139.js';

describe('FR139 square-broad 方 governance admission', () => {
  it('materializes exact methodology and annotation admission surfaces without issuing either authority', () => {
    const result = assessSquareBroadFangGovernanceAdmissionFR139();
    assertIssuedSquareBroadFangGovernanceAdmissionFR139(result);

    expect(result.authorityState).toBe(
      'square_broad_fang_governance_admission_contract_materialized_explicit_decisions_pending_collection_closed',
    );
    expect(result.target).toEqual({
      criterionRef: 'criterion.intake.square_broad',
      sourceConcept: '方大',
      activeConstructScope: 'fang_shape_candidate_features_only',
    });
    expect(result.methodologyDecisionAdmission).toMatchObject({
      targetMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
      proposedSuccessorRef: 'method.shenxiang.five_officers.intake_criteria@0.3.0',
      authorityActorRef: 'actor.myeongha.project_owner@0.1.0',
      requiredApprovalCount: 1,
      targetSpecificDecisionPresent: false,
      reviewedPromotionAuthorized: false,
    });
    expect(result.annotationGovernanceAdmission.annotationAuthorityRef).toBeNull();
    expect(result.annotationGovernanceAdmission.governedDesignationAuthorityResolved).toBe(false);
    expect(result.execution.methodologyReviewDecisionRecordsIssued).toBe(0);
    expect(result.execution.annotationAuthoritiesIssued).toBe(0);
  });

  it('accepts the exact shape of a future explicit project-owner methodology decision candidate without issuing it', () => {
    expect(() =>
      validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139({
        decisionId: 'decision.face.intake.square_broad.fang.methodology_review',
        version: '0.1.0',
        decisionScope: 'methodology_review_promotion',
        targetMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
        proposedSuccessorRef: 'method.shenxiang.five_officers.intake_criteria@0.3.0',
        sourceRefsSnapshot: ['passage.shenxiang.five_officers.intake.nlc_1925'],
        evidenceRefs: ['repo:governance/face-reading/future-project-owner-decision-evidence.md'],
        authorityActorRef: 'actor.myeongha.project_owner@0.1.0',
        outcome: 'approved_for_reviewed_promotion',
        explicitProjectOwnerDecisionEvidencePresent: true,
      }),
    ).not.toThrow();

    const result = assessSquareBroadFangGovernanceAdmissionFR139();
    expect(result.methodologyDecisionAdmission.structurallyValidCandidateMeansIssuedDecision).toBe(false);
    expect(result.methodologyDecisionAdmission.targetSpecificDecisionPresent).toBe(false);
  });

  it('accepts a separately scoped annotation designation candidate shape while keeping authority unadmitted', () => {
    expect(() =>
      validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139({
        designationId: 'designation.face.intake.square_broad.fang.annotation_authority',
        version: '0.1.0',
        authorityScope: 'criterion_specific_research_semantic_annotation',
        criterionRef: 'criterion.intake.square_broad',
        activeConstructScope: 'fang_shape_candidate_features_only',
        protocolRef: 'research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0',
        labelSchemaRef: 'research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0',
        annotationAuthorityRef: 'actor.future.square_broad.annotation_reviewer',
        designationActorRef: 'actor.future.annotation_governance_designator',
        designationEvidenceRefs: ['repo:governance/face-reading/future-annotation-designation.md'],
        authoritySourceIndependentOfMethodologyPromotionScope: true,
        reviewerCount: null,
        quorum: null,
        consensusThreshold: null,
        adjudicationRuleRef: null,
        reviewerQualificationRef: null,
      }),
    ).not.toThrow();

    const result = assessSquareBroadFangGovernanceAdmissionFR139();
    expect(result.annotationGovernanceAdmission.structurallyValidCandidateMeansAdmittedAuthority).toBe(false);
    expect(result.annotationGovernanceAdmission.annotationAuthorityRef).toBeNull();
  });

  it('persists a pending decision request without converting it into evidence', () => {
    const result = assessSquareBroadFangGovernanceAdmissionFR139();
    expect(result.decisionRequest.governanceRequestRef).toBe(FR139_GOVERNANCE_REQUEST_REF);
    expect(result.decisionRequest.methodologyDecisionRequestPrepared).toBe(true);
    expect(result.decisionRequest.annotationGovernanceDecisionRequestPrepared).toBe(true);
    expect(result.decisionRequest.requestArtifactMeansApprovalEvidence).toBe(false);
    expect(result.decisionRequest.requestArtifactMeansAnnotationDesignation).toBe(false);
    expect(result.nextFrontier).toBe(FR139_NEXT_FRONTIER);
  });

  it('keeps reviewer policy and empirical collection closed', () => {
    const result = assessSquareBroadFangGovernanceAdmissionFR139();
    expect(result.annotationGovernanceAdmission.reviewerCount).toBeNull();
    expect(result.annotationGovernanceAdmission.quorum).toBeNull();
    expect(result.annotationGovernanceAdmission.consensusThreshold).toBeNull();
    expect(result.annotationGovernanceAdmission.adjudicationRuleRef).toBeNull();
    expect(result.annotationGovernanceAdmission.reviewerQualificationRef).toBeNull();
    expect(result.collectionGate.methodologyDecisionSatisfied).toBe(false);
    expect(result.collectionGate.annotationAuthoritySatisfied).toBe(false);
    expect(result.collectionGate.humanSemanticCollectionAuthorized).toBe(false);
    expect(result.collectionGate.empiricalSemanticEvidenceAcquisitionAuthorized).toBe(false);
    expect(result.execution.empiricalSemanticLabelsIssued).toBe(0);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
  });
});
