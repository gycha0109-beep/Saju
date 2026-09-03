import {
  FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124,
} from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;

export interface FiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125V1 {
  readonly schemaVersion: 'fr125-five-officers-intake-methodology-review-decision-materialization-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy';
  readonly predecessor: {
    readonly fr124AuthorityState: 'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record';
    readonly decisionRegistryRef: 'registry.face.methodology_review_decisions.fr124@0.1.0';
    readonly decisionCount: 0;
    readonly targetMethodologyRef: typeof TARGET_METHOD_REF;
    readonly proposedReviewedSuccessorRef: typeof PROPOSED_REVIEWED_REF;
  };
  readonly persistedAuthority: {
    readonly researchMethodologyRef: typeof TARGET_METHOD_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
    readonly proposedReviewedSuccessorPresent: false;
  };
  readonly materializationRequirements: {
    readonly governedAuthorityActorRegistryRequired: true;
    readonly governedAuthorityActorRefRequired: true;
    readonly governedReviewEvidencePolicyRequired: true;
    readonly evidenceRefsMustResolveUnderPolicy: true;
    readonly exactMethodologySourceSnapshotRequired: true;
    readonly approvedDecisionRequiresScanCheckedSources: true;
    readonly actorMayBeInferredFromSourceChecker: false;
    readonly actorMayBeInferredFromGitHubAuthor: false;
    readonly actorMayBeInferredFromPullRequestMerger: false;
    readonly actorMayBeInferredFromLegacyReviewedMethodology: false;
  };
  readonly currentGovernance: {
    readonly governedAuthorityActorRegistryRef: null;
    readonly governedAuthorityActorRef: null;
    readonly governedReviewEvidencePolicyRef: null;
    readonly admittedReviewEvidenceRefs: readonly [];
    readonly configuredQuorum: null;
    readonly configuredReviewerCount: null;
    readonly configuredConsensusThreshold: null;
  };
  readonly admission: {
    readonly fr124DecisionContractReady: true;
    readonly sourcePrerequisiteSatisfied: true;
    readonly authorityActorGovernanceReady: false;
    readonly reviewEvidenceGovernanceReady: false;
    readonly decisionMaterializationAuthorized: false;
    readonly decisionRecordIssued: false;
    readonly reviewedPromotionAuthorized: false;
    readonly reviewedSuccessorIssued: false;
    readonly reviewedSuccessorPersisted: false;
  };
  readonly execution: {
    readonly authorityActorsIssued: 0;
    readonly reviewEvidencePoliciesIssued: 0;
    readonly admittedReviewEvidenceItemsIssued: 0;
    readonly methodologyReviewDecisionRecordsIssued: 0;
    readonly methodologyReviewAuthorizationsIssued: 0;
    readonly methodologyReviewPromotionsIssued: 0;
    readonly reviewedMethodologyDefinitionsIssued: 0;
    readonly metricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly blockers: readonly [
    'no_governed_methodology_review_authority_actor_registry',
    'no_governed_methodology_review_evidence_policy',
    'no_governed_intake_methodology_review_decision_record',
    'no_intake_methodology_review_promotion_authorization',
  ];
  readonly authorityBoundary: {
    readonly decisionSchemaMeansDecisionAuthority: false;
    readonly nonEmptyAuthorityActorStringMeansGovernedActor: false;
    readonly nonEmptyEvidenceRefStringMeansAdmittedReviewEvidence: false;
    readonly sourceVerificationCheckerMeansReviewAuthorityActor: false;
    readonly gitCommitAuthorMeansReviewAuthorityActor: false;
    readonly pullRequestMergeMeansMethodologyReviewApproval: false;
    readonly pieOperationalReviewMeansMethodologySemanticReview: false;
    readonly legacyReviewedScalarMeansTransferableReviewAuthority: false;
    readonly reviewDecisionMeansMetricBinding: false;
    readonly reviewDecisionMeansThreshold: false;
    readonly reviewDecisionMeansCriterionState: false;
    readonly reviewDecisionMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'methodology_review_authority_actor_and_evidence_policy_definition';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-125 ${message}`);
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

function validatePersistedAuthority(): void {
  const method = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (candidate) => methodologyRef(candidate) === TARGET_METHOD_REF,
  );
  const proposed = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (candidate) => methodologyRef(candidate) === PROPOSED_REVIEWED_REF,
  );
  const source = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (candidate) => candidate.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );

  if (
    method === undefined ||
    method.reviewStatus !== 'research' ||
    method.sourceRefs.length !== 1 ||
    method.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF ||
    proposed !== undefined ||
    source === undefined ||
    source.verificationStatus !== 'scan_checked'
  ) fail('persisted intake methodology authority drift.');

  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) {
    fail('FR-125 requires the FR-124 decision registry to remain empty before governed materialization authority exists.');
  }
}

export function assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125(): FiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125V1 {
  if (CACHED !== null) return CACHED;

  const fr124 = assessFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124();
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionAuthorityFR124(fr124);
  if (
    fr124.authorityState !== 'review_decision_contract_established_intake_promotion_still_blocked_no_governed_decision_record' ||
    fr124.currentRegistry.decisionCount !== 0 ||
    fr124.currentRegistry.targetDecisionConsumed !== false ||
    fr124.admission.governedDecisionRecordPresent !== false ||
    fr124.admission.reviewedPromotionAuthorized !== false ||
    fr124.contract.authorityActorRefRequired !== true ||
    fr124.contract.evidenceRefsRequired !== true ||
    fr124.contract.configuredQuorum !== null ||
    fr124.contract.configuredReviewerCount !== null ||
    fr124.contract.configuredConsensusThreshold !== null
  ) fail('FR-124 predecessor authority drift.');

  validatePersistedAuthority();

  const result: FiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125V1 = Object.freeze({
    schemaVersion: 'fr125-five-officers-intake-methodology-review-decision-materialization-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy' as const,
    predecessor: Object.freeze({
      fr124AuthorityState: fr124.authorityState,
      decisionRegistryRef: 'registry.face.methodology_review_decisions.fr124@0.1.0' as const,
      decisionCount: 0 as const,
      targetMethodologyRef: TARGET_METHOD_REF,
      proposedReviewedSuccessorRef: PROPOSED_REVIEWED_REF,
    }),
    persistedAuthority: Object.freeze({
      researchMethodologyRef: TARGET_METHOD_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
      proposedReviewedSuccessorPresent: false as const,
    }),
    materializationRequirements: Object.freeze({
      governedAuthorityActorRegistryRequired: true as const,
      governedAuthorityActorRefRequired: true as const,
      governedReviewEvidencePolicyRequired: true as const,
      evidenceRefsMustResolveUnderPolicy: true as const,
      exactMethodologySourceSnapshotRequired: true as const,
      approvedDecisionRequiresScanCheckedSources: true as const,
      actorMayBeInferredFromSourceChecker: false as const,
      actorMayBeInferredFromGitHubAuthor: false as const,
      actorMayBeInferredFromPullRequestMerger: false as const,
      actorMayBeInferredFromLegacyReviewedMethodology: false as const,
    }),
    currentGovernance: Object.freeze({
      governedAuthorityActorRegistryRef: null,
      governedAuthorityActorRef: null,
      governedReviewEvidencePolicyRef: null,
      admittedReviewEvidenceRefs: Object.freeze([]),
      configuredQuorum: null,
      configuredReviewerCount: null,
      configuredConsensusThreshold: null,
    }),
    admission: Object.freeze({
      fr124DecisionContractReady: true as const,
      sourcePrerequisiteSatisfied: true as const,
      authorityActorGovernanceReady: false as const,
      reviewEvidenceGovernanceReady: false as const,
      decisionMaterializationAuthorized: false as const,
      decisionRecordIssued: false as const,
      reviewedPromotionAuthorized: false as const,
      reviewedSuccessorIssued: false as const,
      reviewedSuccessorPersisted: false as const,
    }),
    execution: Object.freeze({
      authorityActorsIssued: 0 as const,
      reviewEvidencePoliciesIssued: 0 as const,
      admittedReviewEvidenceItemsIssued: 0 as const,
      methodologyReviewDecisionRecordsIssued: 0 as const,
      methodologyReviewAuthorizationsIssued: 0 as const,
      methodologyReviewPromotionsIssued: 0 as const,
      reviewedMethodologyDefinitionsIssued: 0 as const,
      metricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    blockers: Object.freeze([
      'no_governed_methodology_review_authority_actor_registry',
      'no_governed_methodology_review_evidence_policy',
      'no_governed_intake_methodology_review_decision_record',
      'no_intake_methodology_review_promotion_authorization',
    ] as const),
    authorityBoundary: Object.freeze({
      decisionSchemaMeansDecisionAuthority: false as const,
      nonEmptyAuthorityActorStringMeansGovernedActor: false as const,
      nonEmptyEvidenceRefStringMeansAdmittedReviewEvidence: false as const,
      sourceVerificationCheckerMeansReviewAuthorityActor: false as const,
      gitCommitAuthorMeansReviewAuthorityActor: false as const,
      pullRequestMergeMeansMethodologyReviewApproval: false as const,
      pieOperationalReviewMeansMethodologySemanticReview: false as const,
      legacyReviewedScalarMeansTransferableReviewAuthority: false as const,
      reviewDecisionMeansMetricBinding: false as const,
      reviewDecisionMeansThreshold: false as const,
      reviewDecisionMeansCriterionState: false as const,
      reviewDecisionMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'methodology_review_authority_actor_and_evidence_policy_definition' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125(
  value: FiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125V1,
): void {
  if (!ISSUED.has(value)) fail('decision materialization admission artifact was not issued by FR-125.');
  if (
    value.authorityState !== 'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy' ||
    value.currentGovernance.governedAuthorityActorRegistryRef !== null ||
    value.currentGovernance.governedAuthorityActorRef !== null ||
    value.currentGovernance.governedReviewEvidencePolicyRef !== null ||
    value.currentGovernance.admittedReviewEvidenceRefs.length !== 0 ||
    value.admission.decisionMaterializationAuthorized !== false ||
    value.admission.decisionRecordIssued !== false ||
    value.admission.reviewedPromotionAuthorized !== false ||
    value.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
    value.execution.methodologyReviewAuthorizationsIssued !== 0 ||
    value.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== 'methodology_review_authority_actor_and_evidence_policy_definition'
  ) fail('issued decision materialization admission artifact drift.');
}
