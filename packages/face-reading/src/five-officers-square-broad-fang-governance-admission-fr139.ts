import {
  assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
} from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import {
  assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
} from './five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js';
import {
  FR138_NEXT_FRONTIER,
  assertIssuedSquareBroadFangSemanticAnnotationProtocolFR138,
  materializeSquareBroadFangSemanticAnnotationProtocolFR138,
} from './five-officers-square-broad-fang-semantic-annotation-protocol-fr138.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_REF = 'criterion.intake.square_broad' as const;
const SOURCE_CONCEPT = '方大' as const;
const ACTIVE_CONSTRUCT_SCOPE = 'fang_shape_candidate_features_only' as const;
const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const SOURCE_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const PROJECT_OWNER_ACTOR_REF = 'actor.myeongha.project_owner@0.1.0' as const;
const PROTOCOL_REF = 'research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0' as const;
const LABEL_SCHEMA_REF = 'research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0' as const;

export const FR139_GOVERNANCE_REQUEST_REF =
  'repo:governance/face-reading/square-broad-fang-governance-decision-request-v1.md' as const;
export const FR139_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr139-square-broad-fang-governance-admission.md' as const;
export const FR139_NEXT_FRONTIER =
  'explicit_project_owner_target_specific_methodology_review_decision_evidence_and_separately_governed_square_broad_annotation_authority_designation' as const;

export type SquareBroadFangMethodologyDecisionOutcomeFR139V1 =
  | 'approved_for_reviewed_promotion'
  | 'rejected';

export interface SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1 {
  readonly decisionId: string;
  readonly version: string;
  readonly decisionScope: 'methodology_review_promotion';
  readonly targetMethodologyRef: typeof TARGET_METHOD_REF;
  readonly proposedSuccessorRef: typeof PROPOSED_REVIEWED_REF;
  readonly sourceRefsSnapshot: readonly [typeof SOURCE_PASSAGE_REF];
  readonly evidenceRefs: readonly string[];
  readonly authorityActorRef: typeof PROJECT_OWNER_ACTOR_REF;
  readonly outcome: SquareBroadFangMethodologyDecisionOutcomeFR139V1;
  readonly explicitProjectOwnerDecisionEvidencePresent: true;
}

export interface SquareBroadFangAnnotationAuthorityDesignationCandidateFR139V1 {
  readonly designationId: string;
  readonly version: string;
  readonly authorityScope: 'criterion_specific_research_semantic_annotation';
  readonly criterionRef: typeof CRITERION_REF;
  readonly activeConstructScope: typeof ACTIVE_CONSTRUCT_SCOPE;
  readonly protocolRef: typeof PROTOCOL_REF;
  readonly labelSchemaRef: typeof LABEL_SCHEMA_REF;
  readonly annotationAuthorityRef: string;
  readonly designationActorRef: string;
  readonly designationEvidenceRefs: readonly string[];
  readonly authoritySourceIndependentOfMethodologyPromotionScope: true;
  readonly reviewerCount: null;
  readonly quorum: null;
  readonly consensusThreshold: null;
  readonly adjudicationRuleRef: null;
  readonly reviewerQualificationRef: null;
}

export interface SquareBroadFangGovernanceAdmissionFR139V1 {
  readonly schemaVersion: 'fr139-square-broad-fang-governance-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'square_broad_fang_governance_admission_contract_materialized_explicit_decisions_pending_collection_closed';
  readonly target: {
    readonly criterionRef: typeof CRITERION_REF;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly activeConstructScope: typeof ACTIVE_CONSTRUCT_SCOPE;
  };
  readonly predecessor: {
    readonly fr138NextFrontier: typeof FR138_NEXT_FRONTIER;
    readonly protocolRef: typeof PROTOCOL_REF;
    readonly labelSchemaRef: typeof LABEL_SCHEMA_REF;
    readonly humanSemanticCollectionAuthorized: false;
  };
  readonly methodologyDecisionAdmission: {
    readonly decisionScope: 'methodology_review_promotion';
    readonly targetMethodologyRef: typeof TARGET_METHOD_REF;
    readonly proposedSuccessorRef: typeof PROPOSED_REVIEWED_REF;
    readonly sourceRefsSnapshot: readonly [typeof SOURCE_PASSAGE_REF];
    readonly authorityActorRef: typeof PROJECT_OWNER_ACTOR_REF;
    readonly requiredApprovalCount: 1;
    readonly explicitProjectOwnerDecisionEvidenceRequired: true;
    readonly targetSpecificDecisionPresent: false;
    readonly reviewedPromotionAuthorized: false;
    readonly structurallyValidCandidateMeansIssuedDecision: false;
  };
  readonly annotationGovernanceAdmission: {
    readonly authorityScope: 'criterion_specific_research_semantic_annotation';
    readonly criterionRef: typeof CRITERION_REF;
    readonly activeConstructScope: typeof ACTIVE_CONSTRUCT_SCOPE;
    readonly protocolRef: typeof PROTOCOL_REF;
    readonly labelSchemaRef: typeof LABEL_SCHEMA_REF;
    readonly methodologyReviewAuthorityMayBeInheritedWithoutSeparateDesignation: false;
    readonly separateDesignationEvidenceRequired: true;
    readonly governedDesignationAuthorityResolved: false;
    readonly annotationAuthorityRef: null;
    readonly reviewerCount: null;
    readonly quorum: null;
    readonly consensusThreshold: null;
    readonly adjudicationRuleRef: null;
    readonly reviewerQualificationRef: null;
    readonly structurallyValidCandidateMeansAdmittedAuthority: false;
  };
  readonly decisionRequest: {
    readonly governanceRequestRef: typeof FR139_GOVERNANCE_REQUEST_REF;
    readonly methodologyDecisionRequestPrepared: true;
    readonly annotationGovernanceDecisionRequestPrepared: true;
    readonly requestArtifactMeansApprovalEvidence: false;
    readonly requestArtifactMeansAnnotationDesignation: false;
  };
  readonly collectionGate: {
    readonly methodologyDecisionSatisfied: false;
    readonly annotationAuthoritySatisfied: false;
    readonly protocolCandidateMaterialized: true;
    readonly humanSemanticCollectionAuthorized: false;
    readonly empiricalSemanticEvidenceAcquisitionAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly continueInstructionMeansProjectOwnerApproval: false;
    readonly repositoryMergeMeansProjectOwnerApproval: false;
    readonly methodologyReviewGovernanceMeansAnnotationAuthority: false;
    readonly decisionRequestMeansDecisionEvidence: false;
    readonly structuralMethodologyCandidateMeansIssuedDecision: false;
    readonly structuralAnnotationCandidateMeansAdmittedAuthority: false;
    readonly annotationDesignationMeansMetricBinding: false;
    readonly annotationDesignationMeansThreshold: false;
    readonly humanCollectionMayStartBeforeBothGatesSatisfied: false;
  };
  readonly execution: {
    readonly methodologyReviewDecisionRecordsIssued: 0;
    readonly methodologyReviewPromotionsIssued: 0;
    readonly annotationAuthoritiesIssued: 0;
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
  readonly researchNoteRef: typeof FR139_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR139_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();
let CACHED: SquareBroadFangGovernanceAdmissionFR139V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-139 ${message}`);
}

function requireNonEmpty(value: string, path: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) fail(`${path} must be non-empty.`);
}

function requireUniqueNonEmpty(values: readonly string[], path: string): void {
  if (values.length === 0) fail(`${path} must contain at least one evidence ref.`);
  const seen = new Set<string>();
  for (const value of values) {
    requireNonEmpty(value, path);
    if (seen.has(value)) fail(`${path} contains duplicate evidence ref: ${value}.`);
    seen.add(value);
  }
}

function requireExactKeys(value: object, allowedKeys: readonly string[], path: string): void {
  const allowed = new Set(allowedKeys);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) fail(`${path} contains forbidden or ungoverned field: ${key}.`);
  }
  if (Object.keys(value).length !== allowedKeys.length) fail(`${path} must contain exactly the governed fields.`);
}

export function validateSquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139(
  candidate: SquareBroadFangTargetSpecificMethodologyDecisionCandidateFR139V1,
): void {
  requireExactKeys(
    candidate,
    [
      'decisionId',
      'version',
      'decisionScope',
      'targetMethodologyRef',
      'proposedSuccessorRef',
      'sourceRefsSnapshot',
      'evidenceRefs',
      'authorityActorRef',
      'outcome',
      'explicitProjectOwnerDecisionEvidencePresent',
    ],
    'methodologyDecisionCandidate',
  );
  requireNonEmpty(candidate.decisionId, 'methodologyDecisionCandidate.decisionId');
  requireNonEmpty(candidate.version, 'methodologyDecisionCandidate.version');
  if (candidate.decisionScope !== 'methodology_review_promotion') fail('methodology decision scope drift.');
  if (candidate.targetMethodologyRef !== TARGET_METHOD_REF) fail('methodology target ref drift.');
  if (candidate.proposedSuccessorRef !== PROPOSED_REVIEWED_REF) fail('proposed reviewed successor ref drift.');
  if (candidate.sourceRefsSnapshot.length !== 1 || candidate.sourceRefsSnapshot[0] !== SOURCE_PASSAGE_REF) {
    fail('methodology source snapshot must exactly match the governed scan-checked passage.');
  }
  requireUniqueNonEmpty(candidate.evidenceRefs, 'methodologyDecisionCandidate.evidenceRefs');
  if (candidate.authorityActorRef !== PROJECT_OWNER_ACTOR_REF) fail('methodology authority actor must be the governed project-owner actor.');
  if (candidate.outcome !== 'approved_for_reviewed_promotion' && candidate.outcome !== 'rejected') {
    fail('unsupported methodology decision outcome.');
  }
  if (candidate.explicitProjectOwnerDecisionEvidencePresent !== true) {
    fail('explicit project-owner decision evidence is required.');
  }
}

export function validateSquareBroadFangAnnotationAuthorityDesignationCandidateFR139(
  candidate: SquareBroadFangAnnotationAuthorityDesignationCandidateFR139V1,
): void {
  requireExactKeys(
    candidate,
    [
      'designationId',
      'version',
      'authorityScope',
      'criterionRef',
      'activeConstructScope',
      'protocolRef',
      'labelSchemaRef',
      'annotationAuthorityRef',
      'designationActorRef',
      'designationEvidenceRefs',
      'authoritySourceIndependentOfMethodologyPromotionScope',
      'reviewerCount',
      'quorum',
      'consensusThreshold',
      'adjudicationRuleRef',
      'reviewerQualificationRef',
    ],
    'annotationAuthorityDesignationCandidate',
  );
  requireNonEmpty(candidate.designationId, 'annotationAuthorityDesignationCandidate.designationId');
  requireNonEmpty(candidate.version, 'annotationAuthorityDesignationCandidate.version');
  if (candidate.authorityScope !== 'criterion_specific_research_semantic_annotation') fail('annotation authority scope drift.');
  if (candidate.criterionRef !== CRITERION_REF) fail('annotation criterion ref drift.');
  if (candidate.activeConstructScope !== ACTIVE_CONSTRUCT_SCOPE) fail('annotation construct scope drift.');
  if (candidate.protocolRef !== PROTOCOL_REF) fail('annotation protocol ref drift.');
  if (candidate.labelSchemaRef !== LABEL_SCHEMA_REF) fail('annotation label schema ref drift.');
  requireNonEmpty(candidate.annotationAuthorityRef, 'annotationAuthorityDesignationCandidate.annotationAuthorityRef');
  requireNonEmpty(candidate.designationActorRef, 'annotationAuthorityDesignationCandidate.designationActorRef');
  requireUniqueNonEmpty(candidate.designationEvidenceRefs, 'annotationAuthorityDesignationCandidate.designationEvidenceRefs');
  if (candidate.authoritySourceIndependentOfMethodologyPromotionScope !== true) {
    fail('annotation authority requires a separately scoped governance source.');
  }
  if (
    candidate.reviewerCount !== null ||
    candidate.quorum !== null ||
    candidate.consensusThreshold !== null ||
    candidate.adjudicationRuleRef !== null ||
    candidate.reviewerQualificationRef !== null
  ) fail('FR139 may not invent square-broad reviewer, quorum, consensus, adjudication, or qualification policy.');
}

function validatePredecessors(): void {
  const fr138 = materializeSquareBroadFangSemanticAnnotationProtocolFR138();
  assertIssuedSquareBroadFangSemanticAnnotationProtocolFR138(fr138);
  if (
    fr138.nextFrontier !== FR138_NEXT_FRONTIER ||
    fr138.target.criterionRef !== CRITERION_REF ||
    fr138.target.activeConstructScope !== ACTIVE_CONSTRUCT_SCOPE ||
    fr138.protocolCandidate.protocolRef !== PROTOCOL_REF ||
    fr138.labelSchemaCandidate.labelSchemaRef !== LABEL_SCHEMA_REF ||
    fr138.unresolvedPolicy.annotationAuthorityRef !== null ||
    fr138.unresolvedPolicy.reviewerCount !== null ||
    fr138.unresolvedPolicy.quorum !== null ||
    fr138.unresolvedPolicy.consensusThreshold !== null ||
    fr138.collectionGate.humanSemanticCollectionAuthorized !== false
  ) fail('FR-138 governance frontier drift.');

  const fr131 = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(fr131);
  if (
    fr131.governanceDecision.authorityRoleRef !== 'role.myeongha.project_owner' ||
    fr131.governanceDecision.requiredApprovalCount !== 1 ||
    fr131.governanceDecision.targetSpecificApprovalRequired !== true ||
    fr131.currentGovernance.governedAuthorityActorRef !== 'actor.myeongha.project_owner@0.1.0' ||
    fr131.admission.targetSpecificReviewDecisionPresent !== false ||
    fr131.admission.reviewedPromotionAuthorized !== false ||
    fr131.execution.methodologyReviewDecisionRecordsIssued !== 0
  ) fail('FR-131 project-owner methodology governance drift.');

  const fr124 = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124(fr124);
  if (
    fr124.contract.targetMethodologyRef !== TARGET_METHOD_REF ||
    fr124.contract.proposedSuccessorRef !== PROPOSED_REVIEWED_REF ||
    fr124.predecessor.witnessQualifiedSourceRef !== SOURCE_PASSAGE_REF ||
    fr124.currentRegistry.decisionCount !== 0 ||
    fr124.admission.governedReviewDecisionPresent !== false ||
    fr124.admission.reviewedPromotionAuthorized !== false
  ) fail('FR-124 target-specific methodology decision contract drift.');
}

export function assessSquareBroadFangGovernanceAdmissionFR139(): SquareBroadFangGovernanceAdmissionFR139V1 {
  if (CACHED !== null) return CACHED;
  validatePredecessors();

  const result: SquareBroadFangGovernanceAdmissionFR139V1 = Object.freeze({
    schemaVersion: 'fr139-square-broad-fang-governance-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'square_broad_fang_governance_admission_contract_materialized_explicit_decisions_pending_collection_closed' as const,
    target: Object.freeze({
      criterionRef: CRITERION_REF,
      sourceConcept: SOURCE_CONCEPT,
      activeConstructScope: ACTIVE_CONSTRUCT_SCOPE,
    }),
    predecessor: Object.freeze({
      fr138NextFrontier: FR138_NEXT_FRONTIER,
      protocolRef: PROTOCOL_REF,
      labelSchemaRef: LABEL_SCHEMA_REF,
      humanSemanticCollectionAuthorized: false as const,
    }),
    methodologyDecisionAdmission: Object.freeze({
      decisionScope: 'methodology_review_promotion' as const,
      targetMethodologyRef: TARGET_METHOD_REF,
      proposedSuccessorRef: PROPOSED_REVIEWED_REF,
      sourceRefsSnapshot: Object.freeze([SOURCE_PASSAGE_REF] as const),
      authorityActorRef: PROJECT_OWNER_ACTOR_REF,
      requiredApprovalCount: 1 as const,
      explicitProjectOwnerDecisionEvidenceRequired: true as const,
      targetSpecificDecisionPresent: false as const,
      reviewedPromotionAuthorized: false as const,
      structurallyValidCandidateMeansIssuedDecision: false as const,
    }),
    annotationGovernanceAdmission: Object.freeze({
      authorityScope: 'criterion_specific_research_semantic_annotation' as const,
      criterionRef: CRITERION_REF,
      activeConstructScope: ACTIVE_CONSTRUCT_SCOPE,
      protocolRef: PROTOCOL_REF,
      labelSchemaRef: LABEL_SCHEMA_REF,
      methodologyReviewAuthorityMayBeInheritedWithoutSeparateDesignation: false as const,
      separateDesignationEvidenceRequired: true as const,
      governedDesignationAuthorityResolved: false as const,
      annotationAuthorityRef: null,
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      adjudicationRuleRef: null,
      reviewerQualificationRef: null,
      structurallyValidCandidateMeansAdmittedAuthority: false as const,
    }),
    decisionRequest: Object.freeze({
      governanceRequestRef: FR139_GOVERNANCE_REQUEST_REF,
      methodologyDecisionRequestPrepared: true as const,
      annotationGovernanceDecisionRequestPrepared: true as const,
      requestArtifactMeansApprovalEvidence: false as const,
      requestArtifactMeansAnnotationDesignation: false as const,
    }),
    collectionGate: Object.freeze({
      methodologyDecisionSatisfied: false as const,
      annotationAuthoritySatisfied: false as const,
      protocolCandidateMaterialized: true as const,
      humanSemanticCollectionAuthorized: false as const,
      empiricalSemanticEvidenceAcquisitionAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      continueInstructionMeansProjectOwnerApproval: false as const,
      repositoryMergeMeansProjectOwnerApproval: false as const,
      methodologyReviewGovernanceMeansAnnotationAuthority: false as const,
      decisionRequestMeansDecisionEvidence: false as const,
      structuralMethodologyCandidateMeansIssuedDecision: false as const,
      structuralAnnotationCandidateMeansAdmittedAuthority: false as const,
      annotationDesignationMeansMetricBinding: false as const,
      annotationDesignationMeansThreshold: false as const,
      humanCollectionMayStartBeforeBothGatesSatisfied: false as const,
    }),
    execution: Object.freeze({
      methodologyReviewDecisionRecordsIssued: 0 as const,
      methodologyReviewPromotionsIssued: 0 as const,
      annotationAuthoritiesIssued: 0 as const,
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
    researchNoteRef: FR139_RESEARCH_NOTE_REF,
    nextFrontier: FR139_NEXT_FRONTIER,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangGovernanceAdmissionFR139(
  value: SquareBroadFangGovernanceAdmissionFR139V1,
): void {
  if (!ISSUED.has(value)) fail('governance admission artifact was not issued by the active FR-139 runtime.');
}
