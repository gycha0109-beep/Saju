import type { FaceAuthorityRegistry, FaceMethodologyDefinition } from './contracts.js';
import { validateFaceAuthorityRegistry } from './validation.js';
import { FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR } from './five-officers-intake-criterion-methodology-source-rebind-post-persistence-review-fr118.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import {
  assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
} from './five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js';
import {
  FR139_NEXT_FRONTIER,
  assessSquareBroadFangGovernanceAdmissionFR139,
  assertIssuedSquareBroadFangGovernanceAdmissionFR139,
  validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139,
  validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139,
} from './five-officers-square-broad-fang-governance-admission-fr139.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_REF = 'criterion.intake.square_broad' as const;
const SOURCE_CONCEPT = '方大' as const;
const ACTIVE_CONSTRUCT_SCOPE = 'fang_shape_candidate_features_only' as const;
const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const REVIEWED_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const SOURCE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const PROJECT_OWNER_ACTOR_REF = 'actor.myeongha.project_owner@0.1.0' as const;
const PROTOCOL_REF = 'research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0' as const;
const LABEL_SCHEMA_REF = 'research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0' as const;
const ANNOTATION_AUTHORITY_REF = 'role.face.intake.square_broad.fang.independent_human_reviewer@0.1.0' as const;

export const FR140_METHODOLOGY_APPROVAL_EVIDENCE_REF =
  'repo:governance/face-reading/square-broad-fang-project-owner-methodology-approval-v1.md' as const;
export const FR140_ANNOTATION_GOVERNANCE_EVIDENCE_REF =
  'repo:governance/face-reading/square-broad-fang-project-owner-annotation-governance-designation-v1.md' as const;
export const FR140_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr140-square-broad-fang-approved-governance-materialization.md' as const;
export const FR140_NEXT_FRONTIER =
  'square_broad_fang_independent_human_reviewer_actor_assignment_and_collection_policy_without_invented_numeric_thresholds' as const;

export const FACE_FR140_TARGET_SPECIFIC_METHODOLOGY_REVIEW_DECISION = Object.freeze({
  decisionId: 'decision.face.intake.square_broad.fang.methodology_review',
  version: '0.1.0',
  decisionScope: 'methodology_review_promotion' as const,
  targetMethodologyRef: TARGET_METHOD_REF,
  proposedSuccessorRef: REVIEWED_METHOD_REF,
  sourceRefsSnapshot: Object.freeze([SOURCE_REF]) as readonly [typeof SOURCE_REF],
  evidenceRefs: Object.freeze([FR140_METHODOLOGY_APPROVAL_EVIDENCE_REF]),
  authorityActorRef: PROJECT_OWNER_ACTOR_REF,
  outcome: 'approved_for_reviewed_promotion' as const,
  explicitProjectOwnerDecisionEvidencePresent: true as const,
});

export const FACE_FR140_SQUARE_BROAD_FANG_ANNOTATION_AUTHORITY_DESIGNATION = Object.freeze({
  designationId: 'designation.face.intake.square_broad.fang.independent_human_reviewer',
  version: '0.1.0',
  authorityScope: 'criterion_specific_research_semantic_annotation' as const,
  criterionRef: CRITERION_REF,
  activeConstructScope: ACTIVE_CONSTRUCT_SCOPE,
  protocolRef: PROTOCOL_REF,
  labelSchemaRef: LABEL_SCHEMA_REF,
  annotationAuthorityRef: ANNOTATION_AUTHORITY_REF,
  designationActorRef: PROJECT_OWNER_ACTOR_REF,
  designationEvidenceRefs: Object.freeze([FR140_ANNOTATION_GOVERNANCE_EVIDENCE_REF]),
  authoritySourceIndependentOfMethodologyPromotionScope: true as const,
  reviewerCount: null,
  quorum: null,
  consensusThreshold: null,
  adjudicationRuleRef: null,
  reviewerQualificationRef: null,
});

export const FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_SUCCESSOR: FaceMethodologyDefinition = Object.freeze({
  ...FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR,
  version: '0.3.0',
  description:
    'Project-owner target-specific methodology review decision으로 witness-qualified intake criterion methodology를 reviewed successor로 보존한다. 이 review는 source-grounded methodology status만 승격하며 개별 criterion의 metric binding, construct validity, calibration, threshold 또는 traditional semantic state를 승인하지 않는다.',
  limitations: Object.freeze([
    ...FR118_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_SUCCESSOR.limitations,
    'reviewed status는 方 또는 方大의 neutral metric 동치성을 승인하지 않는다.',
    'reviewed status는 human research label을 traditional semantic authority로 승격하지 않는다.',
    'reviewed status는 production execution, calibration, threshold, criterion state, claim 또는 narrative를 승인하지 않는다.',
  ]),
  reviewStatus: 'reviewed' as const,
});

export const FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY: FaceAuthorityRegistry = Object.freeze({
  ...FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
  methodologies: Object.freeze([
    ...FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies,
    FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_SUCCESSOR,
  ]),
});

export interface SquareBroadFangApprovedGovernanceMaterializationFR140V1 {
  readonly schemaVersion: 'fr140-square-broad-fang-approved-governance-materialization-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_fang_project_owner_approval_materialized_reviewed_successor_and_independent_human_annotation_role_designated_collection_closed';
  readonly target: {
    readonly criterionRef: typeof CRITERION_REF;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly activeConstructScope: typeof ACTIVE_CONSTRUCT_SCOPE;
  };
  readonly predecessor: {
    readonly fr139NextFrontier: typeof FR139_NEXT_FRONTIER;
    readonly explicitDecisionsPreviouslyPending: true;
    readonly humanSemanticCollectionPreviouslyAuthorized: false;
  };
  readonly methodologyDecision: {
    readonly decisionRef: 'decision.face.intake.square_broad.fang.methodology_review@0.1.0';
    readonly evidenceRef: typeof FR140_METHODOLOGY_APPROVAL_EVIDENCE_REF;
    readonly authorityActorRef: typeof PROJECT_OWNER_ACTOR_REF;
    readonly targetMethodologyRef: typeof TARGET_METHOD_REF;
    readonly reviewedSuccessorRef: typeof REVIEWED_METHOD_REF;
    readonly sourceRefsSnapshot: readonly [typeof SOURCE_REF];
    readonly outcome: 'approved_for_reviewed_promotion';
    readonly targetSpecificDecisionPresent: true;
    readonly reviewedPromotionAuthorized: true;
    readonly reviewedSuccessorIssued: true;
    readonly reviewedSuccessorPersisted: true;
  };
  readonly annotationGovernance: {
    readonly designationRef: 'designation.face.intake.square_broad.fang.independent_human_reviewer@0.1.0';
    readonly evidenceRef: typeof FR140_ANNOTATION_GOVERNANCE_EVIDENCE_REF;
    readonly designationActorRef: typeof PROJECT_OWNER_ACTOR_REF;
    readonly authorityScope: 'criterion_specific_research_semantic_annotation';
    readonly annotationAuthorityRef: typeof ANNOTATION_AUTHORITY_REF;
    readonly governedDesignationAuthorityResolved: true;
    readonly independentHumanReviewerRequired: true;
    readonly projectOwnerMayActAsSemanticReviewerByThisDesignation: false;
    readonly concreteReviewerActorRefs: readonly [];
    readonly concreteReviewerActorAssignmentSatisfied: false;
    readonly reviewerCount: null;
    readonly quorum: null;
    readonly consensusThreshold: null;
    readonly adjudicationRuleRef: null;
    readonly reviewerQualificationRef: null;
  };
  readonly collectionGate: {
    readonly methodologyDecisionSatisfied: true;
    readonly annotationAuthorityRoleSatisfied: true;
    readonly concreteReviewerActorAssignmentSatisfied: false;
    readonly collectionAuthorizationPresent: false;
    readonly humanSemanticCollectionAuthorized: false;
    readonly empiricalSemanticEvidenceAcquisitionAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly reviewedMethodologyMeansMetricBinding: false;
    readonly reviewedMethodologyMeansConstructValidityEstablished: false;
    readonly annotationRoleDesignationMeansConcreteReviewerAssigned: false;
    readonly annotationRoleDesignationMeansTraditionalSemanticAuthority: false;
    readonly independentHumanLabelMeansTraditionalMetricBinding: false;
    readonly projectOwnerDesignationAuthorityMeansProjectOwnerMaySelfAnnotate: false;
    readonly repositoryMergeMeansAdditionalApproval: false;
    readonly reviewerPolicyMayBeInventedFromFR101: false;
    readonly collectionMayStartWithoutSeparateAuthorization: false;
  };
  readonly execution: {
    readonly methodologyReviewDecisionRecordsIssued: 1;
    readonly methodologyReviewPromotionsIssued: 1;
    readonly reviewedMethodologyDefinitionsIssued: 1;
    readonly annotationGovernanceDesignationsIssued: 1;
    readonly annotationAuthorityRolesIssued: 1;
    readonly concreteReviewerActorsIssued: 0;
    readonly humanSemanticCollectionsStarted: 0;
    readonly empiricalSemanticLabelsIssued: 0;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly researchNoteRef: typeof FR140_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR140_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();
let CACHED: SquareBroadFangApprovedGovernanceMaterializationFR140V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-140 ${message}`);
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

function validatePredecessorsAndDecisions(): void {
  const fr139 = assessSquareBroadFangGovernanceAdmissionFR139();
  assertIssuedSquareBroadFangGovernanceAdmissionFR139(fr139);
  if (
    fr139.nextFrontier !== FR139_NEXT_FRONTIER ||
    fr139.methodologyDecisionAdmission.targetSpecificDecisionPresent !== false ||
    fr139.annotationGovernanceAdmission.governedDesignationAuthorityResolved !== false ||
    fr139.collectionGate.humanSemanticCollectionAuthorized !== false
  ) fail('FR-139 predecessor boundary drift.');

  const fr131 = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(fr131);
  if (
    fr131.currentGovernance.governedAuthorityActorRef !== PROJECT_OWNER_ACTOR_REF ||
    fr131.governanceDecision.requiredApprovalCount !== 1 ||
    fr131.governanceDecision.targetSpecificApprovalRequired !== true ||
    fr131.admission.futureTargetSpecificDecisionMaterializationAuthorized !== true
  ) fail('FR-131 project-owner governance drift.');

  validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(
    FACE_FR140_TARGET_SPECIFIC_METHODOLOGY_REVIEW_DECISION,
  );
  validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139(
    FACE_FR140_SQUARE_BROAD_FANG_ANNOTATION_AUTHORITY_DESIGNATION,
  );
}

function validateReviewedSuccessorPersistence(): void {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY);
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY);

  const prior = FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologies.filter(
    (methodology) => methodologyRef(methodology) === TARGET_METHOD_REF,
  );
  const reviewed = FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologies.filter(
    (methodology) => methodologyRef(methodology) === REVIEWED_METHOD_REF,
  );
  if (
    prior.length !== 1 || prior[0]?.reviewStatus !== 'research' ||
    reviewed.length !== 1 || reviewed[0]?.reviewStatus !== 'reviewed' ||
    reviewed[0]?.sourceRefs.length !== 1 || reviewed[0]?.sourceRefs[0] !== SOURCE_REF
  ) fail('reviewed successor persistence drift.');

  if (
    JSON.stringify(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologyPacks) !==
      JSON.stringify(FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologyPacks)
  ) fail('methodology packs may not be changed by FR-140 review promotion.');
}

export function materializeSquareBroadFangApprovedGovernanceFR140(): SquareBroadFangApprovedGovernanceMaterializationFR140V1 {
  if (CACHED !== null) return CACHED;
  validatePredecessorsAndDecisions();
  validateReviewedSuccessorPersistence();

  const result: SquareBroadFangApprovedGovernanceMaterializationFR140V1 = Object.freeze({
    schemaVersion: 'fr140-square-broad-fang-approved-governance-materialization-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_fang_project_owner_approval_materialized_reviewed_successor_and_independent_human_annotation_role_designated_collection_closed' as const,
    target: Object.freeze({
      criterionRef: CRITERION_REF,
      sourceConcept: SOURCE_CONCEPT,
      activeConstructScope: ACTIVE_CONSTRUCT_SCOPE,
    }),
    predecessor: Object.freeze({
      fr139NextFrontier: FR139_NEXT_FRONTIER,
      explicitDecisionsPreviouslyPending: true as const,
      humanSemanticCollectionPreviouslyAuthorized: false as const,
    }),
    methodologyDecision: Object.freeze({
      decisionRef: 'decision.face.intake.square_broad.fang.methodology_review@0.1.0' as const,
      evidenceRef: FR140_METHODOLOGY_APPROVAL_EVIDENCE_REF,
      authorityActorRef: PROJECT_OWNER_ACTOR_REF,
      targetMethodologyRef: TARGET_METHOD_REF,
      reviewedSuccessorRef: REVIEWED_METHOD_REF,
      sourceRefsSnapshot: Object.freeze([SOURCE_REF]) as readonly [typeof SOURCE_REF],
      outcome: 'approved_for_reviewed_promotion' as const,
      targetSpecificDecisionPresent: true as const,
      reviewedPromotionAuthorized: true as const,
      reviewedSuccessorIssued: true as const,
      reviewedSuccessorPersisted: true as const,
    }),
    annotationGovernance: Object.freeze({
      designationRef: 'designation.face.intake.square_broad.fang.independent_human_reviewer@0.1.0' as const,
      evidenceRef: FR140_ANNOTATION_GOVERNANCE_EVIDENCE_REF,
      designationActorRef: PROJECT_OWNER_ACTOR_REF,
      authorityScope: 'criterion_specific_research_semantic_annotation' as const,
      annotationAuthorityRef: ANNOTATION_AUTHORITY_REF,
      governedDesignationAuthorityResolved: true as const,
      independentHumanReviewerRequired: true as const,
      projectOwnerMayActAsSemanticReviewerByThisDesignation: false as const,
      concreteReviewerActorRefs: Object.freeze([] as const),
      concreteReviewerActorAssignmentSatisfied: false as const,
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      adjudicationRuleRef: null,
      reviewerQualificationRef: null,
    }),
    collectionGate: Object.freeze({
      methodologyDecisionSatisfied: true as const,
      annotationAuthorityRoleSatisfied: true as const,
      concreteReviewerActorAssignmentSatisfied: false as const,
      collectionAuthorizationPresent: false as const,
      humanSemanticCollectionAuthorized: false as const,
      empiricalSemanticEvidenceAcquisitionAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      reviewedMethodologyMeansMetricBinding: false as const,
      reviewedMethodologyMeansConstructValidityEstablished: false as const,
      annotationRoleDesignationMeansConcreteReviewerAssigned: false as const,
      annotationRoleDesignationMeansTraditionalSemanticAuthority: false as const,
      independentHumanLabelMeansTraditionalMetricBinding: false as const,
      projectOwnerDesignationAuthorityMeansProjectOwnerMaySelfAnnotate: false as const,
      repositoryMergeMeansAdditionalApproval: false as const,
      reviewerPolicyMayBeInventedFromFR101: false as const,
      collectionMayStartWithoutSeparateAuthorization: false as const,
    }),
    execution: Object.freeze({
      methodologyReviewDecisionRecordsIssued: 1 as const,
      methodologyReviewPromotionsIssued: 1 as const,
      reviewedMethodologyDefinitionsIssued: 1 as const,
      annotationGovernanceDesignationsIssued: 1 as const,
      annotationAuthorityRolesIssued: 1 as const,
      concreteReviewerActorsIssued: 0 as const,
      humanSemanticCollectionsStarted: 0 as const,
      empiricalSemanticLabelsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR140_RESEARCH_NOTE_REF,
    nextFrontier: FR140_NEXT_FRONTIER,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangApprovedGovernanceFR140(
  value: SquareBroadFangApprovedGovernanceMaterializationFR140V1,
): void {
  if (!ISSUED.has(value)) fail('approved governance artifact was not issued by FR-140.');
  if (
    value.methodologyDecision.targetSpecificDecisionPresent !== true ||
    value.methodologyDecision.reviewedSuccessorPersisted !== true ||
    value.annotationGovernance.governedDesignationAuthorityResolved !== true ||
    value.annotationGovernance.independentHumanReviewerRequired !== true ||
    value.annotationGovernance.concreteReviewerActorRefs.length !== 0 ||
    value.annotationGovernance.reviewerCount !== null ||
    value.collectionGate.humanSemanticCollectionAuthorized !== false ||
    value.execution.empiricalSemanticLabelsIssued !== 0 ||
    value.execution.traditionalMetricBindingsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== FR140_NEXT_FRONTIER
  ) fail('issued approved governance artifact drift.');
}
