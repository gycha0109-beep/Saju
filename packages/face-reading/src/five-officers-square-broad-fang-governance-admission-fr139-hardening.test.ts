import { describe, expect, it } from 'vitest';
import type {
  SquareBroadFangAnnotationAuthorityDesignationCandidateFR139V1,
  SquareBroadFangGovernanceAdmissionFR139V1,
  SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1,
} from './five-officers-square-broad-fang-governance-admission-fr139.js';
import {
  assessSquareBroadFangGovernanceAdmissionFR139,
  assertIssuedSquareBroadFangGovernanceAdmissionFR139,
  validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139,
  validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139,
} from './five-officers-square-broad-fang-governance-admission-fr139.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR139 square-broad 方 governance admission hardening', () => {
  const methodologyCandidate = (): SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1 => ({
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
  });

  const annotationCandidate = (): SquareBroadFangAnnotationAuthorityDesignationCandidateFR139V1 => ({
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
  });

  it('rejects a forged issued artifact', () => {
    const issued = assessSquareBroadFangGovernanceAdmissionFR139();
    const forged = {
      ...issued,
      target: { ...issued.target },
    } as SquareBroadFangGovernanceAdmissionFR139V1;

    expect(() => assertIssuedSquareBroadFangGovernanceAdmissionFR139(forged)).toThrow(
      FaceAuthorityValidationError,
    );
  });

  it('rejects methodology candidates with target, successor, source, actor, or evidence drift', () => {
    const wrongTarget = {
      ...methodologyCandidate(),
      targetMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@9.9.9',
    } as unknown as SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1;
    const wrongSuccessor = {
      ...methodologyCandidate(),
      proposedSuccessorRef: 'method.shenxiang.five_officers.intake_criteria@0.4.0',
    } as unknown as SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1;
    const wrongSource = {
      ...methodologyCandidate(),
      sourceRefsSnapshot: ['passage.other'],
    } as unknown as SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1;
    const wrongActor = {
      ...methodologyCandidate(),
      authorityActorRef: 'actor.repository.merger',
    } as unknown as SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1;
    const noEvidence = {
      ...methodologyCandidate(),
      evidenceRefs: [],
    } as unknown as SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1;

    expect(() => validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(wrongTarget)).toThrow(/target ref drift/u);
    expect(() => validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(wrongSuccessor)).toThrow(/successor ref drift/u);
    expect(() => validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(wrongSource)).toThrow(/source snapshot/u);
    expect(() => validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(wrongActor)).toThrow(/project-owner actor/u);
    expect(() => validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(noEvidence)).toThrow(/at least one evidence ref/u);
  });

  it('rejects hidden extra fields that try to smuggle approval through structure alone', () => {
    const candidate = {
      ...methodologyCandidate(),
      repositoryMergeAcceptedAsApproval: true,
    } as unknown as SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1;
    expect(() => validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(candidate)).toThrow(/forbidden or ungoverned field/u);
  });

  it('rejects annotation authority inheritance from methodology scope and invented reviewer policy', () => {
    const inherited = {
      ...annotationCandidate(),
      authoritySourceIndependentOfMethodologyPromotionScope: false,
    } as unknown as SquareBroadFangAnnotationAuthorityDesignationCandidateFR139V1;
    const reviewersInvented = {
      ...annotationCandidate(),
      reviewerCount: 3,
    } as unknown as SquareBroadFangAnnotationAuthorityDesignationCandidateFR139V1;
    const consensusInvented = {
      ...annotationCandidate(),
      consensusThreshold: 2 / 3,
    } as unknown as SquareBroadFangAnnotationAuthorityDesignationCandidateFR139V1;

    expect(() => validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139(inherited)).toThrow(/separately scoped governance source/u);
    expect(() => validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139(reviewersInvented)).toThrow(/may not invent/u);
    expect(() => validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139(consensusInvented)).toThrow(/may not invent/u);
  });

  it('keeps operational continue, merge, structural validity, and designation shortcuts closed', () => {
    const result = assessSquareBroadFangGovernanceAdmissionFR139();
    expect(result.authorityBoundary.continueInstructionMeansProjectOwnerApproval).toBe(false);
    expect(result.authorityBoundary.repositoryMergeMeansProjectOwnerApproval).toBe(false);
    expect(result.authorityBoundary.methodologyReviewGovernanceMeansAnnotationAuthority).toBe(false);
    expect(result.authorityBoundary.decisionRequestMeansDecisionEvidence).toBe(false);
    expect(result.authorityBoundary.structuralMethodologyCandidateMeansIssuedDecision).toBe(false);
    expect(result.authorityBoundary.structuralAnnotationCandidateMeansAdmittedAuthority).toBe(false);
    expect(result.authorityBoundary.humanCollectionMayStartBeforeBothGatesSatisfied).toBe(false);
  });
});
