import { describe, expect, it } from 'vitest';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import {
  FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY,
  FACE_FR140_SQUARE_BROAD_FANG_ANNOTATION_AUTHORITY_DESIGNATION,
  FACE_FR140_TARGET_SPECIFIC_METHODOLOGY_REVIEW_DECISION,
  FR140_NEXT_FRONTIER,
  assertIssuedSquareBroadFangApprovedGovernanceFR140,
  materializeSquareBroadFangApprovedGovernanceFR140,
} from './five-officers-square-broad-fang-approved-governance-materialization-fr140.js';

describe('FR140 square-broad 方 approved governance materialization', () => {
  it('materializes the exact target-specific project-owner methodology approval', () => {
    const result = materializeSquareBroadFangApprovedGovernanceFR140();
    assertIssuedSquareBroadFangApprovedGovernanceFR140(result);

    expect(FACE_FR140_TARGET_SPECIFIC_METHODOLOGY_REVIEW_DECISION).toMatchObject({
      decisionScope: 'methodology_review_promotion',
      targetMethodologyRef: 'method.shenxiang.five_officers.intake_criteria@0.2.0',
      proposedSuccessorRef: 'method.shenxiang.five_officers.intake_criteria@0.3.0',
      sourceRefsSnapshot: ['passage.shenxiang.five_officers.intake.nlc_1925'],
      authorityActorRef: 'actor.myeongha.project_owner@0.1.0',
      outcome: 'approved_for_reviewed_promotion',
      explicitProjectOwnerDecisionEvidencePresent: true,
    });
    expect(result.methodologyDecision.targetSpecificDecisionPresent).toBe(true);
    expect(result.methodologyDecision.reviewedPromotionAuthorized).toBe(true);
    expect(result.methodologyDecision.reviewedSuccessorPersisted).toBe(true);
  });

  it('appends a reviewed 0.3.0 successor while preserving the historical research 0.2.0 entry', () => {
    expect(
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.some(
        (methodology) =>
          `${methodology.methodologyId}@${methodology.version}` ===
          'method.shenxiang.five_officers.intake_criteria@0.3.0',
      ),
    ).toBe(false);

    const entries = FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologies.filter(
      (methodology) => methodology.methodologyId === 'method.shenxiang.five_officers.intake_criteria',
    );
    const research = entries.find((methodology) => methodology.version === '0.2.0');
    const reviewed = entries.find((methodology) => methodology.version === '0.3.0');

    expect(research?.reviewStatus).toBe('research');
    expect(reviewed?.reviewStatus).toBe('reviewed');
    expect(reviewed?.sourceRefs).toEqual(['passage.shenxiang.five_officers.intake.nlc_1925']);
  });

  it('designates only an independent-human-reviewer authority role for research annotation', () => {
    expect(FACE_FR140_SQUARE_BROAD_FANG_ANNOTATION_AUTHORITY_DESIGNATION).toMatchObject({
      authorityScope: 'criterion_specific_research_semantic_annotation',
      criterionRef: 'criterion.intake.square_broad',
      activeConstructScope: 'fang_shape_candidate_features_only',
      protocolRef: 'research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0',
      labelSchemaRef: 'research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0',
      annotationAuthorityRef: 'role.face.intake.square_broad.fang.independent_human_reviewer@0.1.0',
      designationActorRef: 'actor.myeongha.project_owner@0.1.0',
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      adjudicationRuleRef: null,
      reviewerQualificationRef: null,
    });

    const result = materializeSquareBroadFangApprovedGovernanceFR140();
    expect(result.annotationGovernance.governedDesignationAuthorityResolved).toBe(true);
    expect(result.annotationGovernance.independentHumanReviewerRequired).toBe(true);
    expect(result.annotationGovernance.projectOwnerMayActAsSemanticReviewerByThisDesignation).toBe(false);
    expect(result.annotationGovernance.concreteReviewerActorRefs).toEqual([]);
    expect(result.annotationGovernance.concreteReviewerActorAssignmentSatisfied).toBe(false);
  });

  it('keeps reviewer mechanics, collection, and traditional execution closed', () => {
    const result = materializeSquareBroadFangApprovedGovernanceFR140();

    expect(result.annotationGovernance.reviewerCount).toBeNull();
    expect(result.annotationGovernance.quorum).toBeNull();
    expect(result.annotationGovernance.consensusThreshold).toBeNull();
    expect(result.annotationGovernance.adjudicationRuleRef).toBeNull();
    expect(result.annotationGovernance.reviewerQualificationRef).toBeNull();
    expect(result.collectionGate.collectionAuthorizationPresent).toBe(false);
    expect(result.collectionGate.humanSemanticCollectionAuthorized).toBe(false);
    expect(result.collectionGate.empiricalSemanticEvidenceAcquisitionAuthorized).toBe(false);
    expect(result.execution.humanSemanticCollectionsStarted).toBe(0);
    expect(result.execution.empiricalSemanticLabelsIssued).toBe(0);
    expect(result.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(result.execution.calibrationProtocolsIssued).toBe(0);
    expect(result.execution.thresholdsIssued).toBe(0);
    expect(result.execution.criterionStatesIssued).toBe(0);
    expect(result.execution.structuredClaimsIssued).toBe(0);
    expect(result.execution.boundedNarrativesIssued).toBe(0);
    expect(result.execution.traditionalSemanticAuthority).toBe(false);
    expect(result.nextFrontier).toBe(FR140_NEXT_FRONTIER);
  });
});
