import {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130,
} from './five-officers-intake-methodology-review-governance-trust-anchor-materialization-admission-fr130.js';
import {
  validateMethodologyReviewGovernanceTrustAnchorRegistryFR129,
  type MethodologyReviewGovernanceTrustAnchorRegistryFR129V1,
} from './five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js';
import {
  validateMethodologyReviewAuthorityActorRegistryFR126,
  validateMethodologyReviewEvidencePolicyRegistryFR126,
  type MethodologyReviewAuthorityActorRegistryFR126V1,
  type MethodologyReviewEvidencePolicyRegistryFR126V1,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const SOURCE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const GOVERNANCE_DECISION_REF = 'governance.face.methodology_review.project_owner_single_approver@0.1.0' as const;
const GOVERNANCE_SOURCE_REF = 'repo:governance/face-reading/methodology-review-project-owner-governance-v1.md' as const;
const TRUST_ANCHOR_REF = 'anchor.myeongha.project_owner_methodology_review@0.1.0' as const;
const ACTOR_REF = 'actor.myeongha.project_owner@0.1.0' as const;
const POLICY_REF = 'policy.myeongha.project_owner_single_approver_methodology_review@0.1.0' as const;

export interface ProjectOwnerMethodologyReviewGovernanceDecisionFR131V1 {
  readonly decisionId: 'governance.face.methodology_review.project_owner_single_approver';
  readonly version: '0.1.0';
  readonly effectiveDate: '2026-09-04';
  readonly authorityScope: 'methodology_review_promotion';
  readonly authorityRoleRef: 'role.myeongha.project_owner';
  readonly researchToReviewedPromotionMayBeApprovedByProjectOwner: true;
  readonly externalExpertRequired: false;
  readonly requiredApprovalCount: 1;
  readonly configuredConsensusThreshold: null;
  readonly targetSpecificApprovalRequired: true;
  readonly provenanceRefs: readonly [typeof GOVERNANCE_SOURCE_REF];
  readonly limitations: readonly string[];
}

export interface ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1 {
  readonly registryId: 'registry.face.methodology_review_project_owner_governance_decisions.fr131';
  readonly version: '0.1.0';
  readonly decisions: readonly ProjectOwnerMethodologyReviewGovernanceDecisionFR131V1[];
}

export interface FiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131V1 {
  readonly schemaVersion: 'fr131-five-officers-intake-project-owner-methodology-review-governance-materialization-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending';
  readonly predecessor: {
    readonly fr130AuthorityState: 'independent_methodology_review_governance_trust_anchor_materialization_blocked_no_governed_external_designation';
    readonly fr130NextFrontier: 'independent_methodology_review_governance_trust_anchor_external_designation_acquisition_and_admission';
    readonly externalDesignationPreviouslyPresent: false;
    readonly trustAnchorPreviouslyMaterialized: false;
  };
  readonly governanceDecision: {
    readonly decisionRef: typeof GOVERNANCE_DECISION_REF;
    readonly governanceSourceRef: typeof GOVERNANCE_SOURCE_REF;
    readonly authorityRoleRef: 'role.myeongha.project_owner';
    readonly requiredApprovalCount: 1;
    readonly configuredReviewerCount: 1;
    readonly configuredQuorum: null;
    readonly configuredConsensusThreshold: null;
    readonly externalExpertRequired: false;
    readonly targetSpecificApprovalRequired: true;
  };
  readonly currentGovernance: {
    readonly governedTrustAnchorRef: typeof TRUST_ANCHOR_REF;
    readonly governedAuthorityActorRef: typeof ACTOR_REF;
    readonly governedReviewEvidencePolicyRef: typeof POLICY_REF;
    readonly trustAnchorDefinitionCount: 1;
    readonly trustAnchorMaterializedCount: 1;
    readonly authorityActorDefinitionCount: 1;
    readonly reviewEvidencePolicyDefinitionCount: 1;
    readonly targetSpecificReviewDecisionCount: 0;
  };
  readonly persistedAuthority: {
    readonly researchMethodologyRef: typeof TARGET_METHOD_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof SOURCE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
    readonly proposedReviewedSuccessorPresent: false;
    readonly historicalFr124DecisionCount: 0;
  };
  readonly admission: {
    readonly governedExternalDesignationPresent: true;
    readonly governedExternalDesignationAdmitted: true;
    readonly exactTrustAnchorDefinitionBindingPresent: true;
    readonly trustAnchorMaterializationAuthorized: true;
    readonly trustAnchorMaterialized: true;
    readonly actorProvenanceAdmissionAuthorized: true;
    readonly evidencePolicyProvenanceAdmissionAuthorized: true;
    readonly actorRegistryAppendAuthorized: true;
    readonly evidencePolicyRegistryAppendAuthorized: true;
    readonly futureTargetSpecificDecisionMaterializationAuthorized: true;
    readonly targetSpecificReviewDecisionPresent: false;
    readonly reviewedPromotionAuthorized: false;
    readonly reviewedSuccessorIssued: false;
    readonly reviewedSuccessorPersisted: false;
  };
  readonly execution: {
    readonly governanceDecisionRecordsPersisted: 1;
    readonly externalDesignationAdmissionsIssued: 1;
    readonly governanceTrustAnchorDefinitionsPersisted: 1;
    readonly governanceTrustAnchorsMaterialized: 1;
    readonly authorityActorDefinitionsPersisted: 1;
    readonly reviewEvidencePolicyDefinitionsPersisted: 1;
    readonly methodologyReviewDecisionRecordsIssued: 0;
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
  readonly authorityBoundary: {
    readonly projectOwnerGovernanceDecisionMeansTargetMethodologyApproved: false;
    readonly singleApproverPolicyMeansAutomaticPromotion: false;
    readonly trustAnchorMaterializationMeansTargetMethodologyApproved: false;
    readonly actorAuthorityMeansTargetMethodologyApproved: false;
    readonly evidencePolicyMeansEvidenceItemAlreadyAdmitted: false;
    readonly futureDecisionAuthorizationMeansCurrentDecisionIssued: false;
    readonly sourceVerificationMeansMethodologyApproval: false;
    readonly repositoryMergeMeansMethodologyApproval: false;
    readonly governanceMaterializationMeansMetricBinding: false;
    readonly governanceMaterializationMeansThreshold: false;
    readonly governanceMaterializationMeansCriterionState: false;
    readonly governanceMaterializationMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly blockers: readonly [
    'target_specific_project_owner_methodology_review_decision_not_issued',
    'reviewed_successor_not_issued',
    'square_broad_metric_to_source_concept_mapping_not_authorized',
    'square_broad_calibration_evidence_absent',
    'square_broad_threshold_not_calibrated',
  ];
  readonly nextFrontier: 'project_owner_target_specific_intake_methodology_review_decision';
}

export const FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY = Object.freeze({
  registryId: 'registry.face.methodology_review_project_owner_governance_decisions.fr131',
  version: '0.1.0',
  decisions: Object.freeze([
    Object.freeze({
      decisionId: 'governance.face.methodology_review.project_owner_single_approver',
      version: '0.1.0',
      effectiveDate: '2026-09-04',
      authorityScope: 'methodology_review_promotion',
      authorityRoleRef: 'role.myeongha.project_owner',
      researchToReviewedPromotionMayBeApprovedByProjectOwner: true,
      externalExpertRequired: false,
      requiredApprovalCount: 1,
      configuredConsensusThreshold: null,
      targetSpecificApprovalRequired: true,
      provenanceRefs: Object.freeze([GOVERNANCE_SOURCE_REF] as const),
      limitations: Object.freeze([
        'This governance decision establishes approval authority but does not approve a specific methodology promotion.',
        'Metric binding, calibration, thresholds, criterion states, claims, and narratives require separate authority.',
      ]),
    }),
  ]),
} as const satisfies ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1);

export const FACE_FR131_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY = Object.freeze({
  registryId: 'registry.face.methodology_review_governance_trust_anchors.fr131',
  version: '0.1.0',
  anchors: Object.freeze([
    Object.freeze({
      anchorId: 'anchor.myeongha.project_owner_methodology_review',
      version: '0.1.0',
      authorityScope: 'methodology_review_governance_root',
      provenanceRefs: Object.freeze([GOVERNANCE_DECISION_REF, GOVERNANCE_SOURCE_REF]),
      designationEvidenceRefs: Object.freeze([GOVERNANCE_SOURCE_REF]),
      limitations: Object.freeze([
        'Root authority is role-based on the MyeongHa project owner and does not auto-approve any methodology.',
      ]),
      independentFromTargetActorRegistry: true,
      independentFromTargetEvidencePolicyRegistry: true,
      selfDesignationAuthorized: false,
      sourceVerificationAuthorityInherited: false,
      repositoryIdentityAuthorityInherited: false,
      pullRequestMergeAuthorityInherited: false,
      pieOperationalAuthorityInherited: false,
      legacyReviewedScalarAuthorityInherited: false,
      externalProviderProvenanceAuthorityInherited: false,
      methodologyReviewDecisionAuthorityGranted: false,
    }),
  ]),
} as const satisfies MethodologyReviewGovernanceTrustAnchorRegistryFR129V1);

export const FACE_FR131_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY = Object.freeze({
  registryId: 'registry.face.methodology_review_authority_actors.fr131',
  version: '0.1.0',
  actors: Object.freeze([
    Object.freeze({
      actorId: 'actor.myeongha.project_owner',
      version: '0.1.0',
      authorityScope: 'methodology_review_promotion',
      provenanceRefs: Object.freeze([GOVERNANCE_DECISION_REF, TRUST_ANCHOR_REF]),
      limitations: Object.freeze([
        'Authority applies to explicit methodology review promotion decisions only.',
        'A target-specific approval is required for each research-to-reviewed promotion.',
      ]),
      sourceVerificationAuthorityInherited: false,
      repositoryMergeAuthorityInherited: false,
      pieOperationalAuthorityInherited: false,
      legacyReviewedScalarAuthorityInherited: false,
    }),
  ]),
} as const satisfies MethodologyReviewAuthorityActorRegistryFR126V1);

export const FACE_FR131_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY = Object.freeze({
  registryId: 'registry.face.methodology_review_evidence_policies.fr131',
  version: '0.1.0',
  policies: Object.freeze([
    Object.freeze({
      policyId: 'policy.myeongha.project_owner_single_approver_methodology_review',
      version: '0.1.0',
      policyScope: 'methodology_review_promotion',
      provenanceRefs: Object.freeze([GOVERNANCE_DECISION_REF, GOVERNANCE_SOURCE_REF]),
      limitations: Object.freeze([
        'Admissible approval evidence must be an explicit project-owner decision bound to the exact target, successor, and source snapshot.',
        'The policy does not convert source verification or operational review into methodology semantic approval.',
      ]),
      structuralValidityMeansSemanticApproval: false,
      sourceVerificationMeansMethodologyApproval: false,
      pieOperationalEvidenceMeansMethodologySemanticEvidence: false,
      legacyReviewedScalarMeansPolicyPrecedent: false,
    }),
  ]),
} as const satisfies MethodologyReviewEvidencePolicyRegistryFR126V1);

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-131 ${message}`);
}

export function validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131(
  registry: ProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131V1,
): void {
  if (registry.registryId !== 'registry.face.methodology_review_project_owner_governance_decisions.fr131') fail('governance registry id drift.');
  if (registry.version !== '0.1.0') fail('governance registry version drift.');
  if (registry.decisions.length !== 1) fail('exactly one project-owner governance decision is required.');
  const decision = registry.decisions[0];
  if (decision === undefined) fail('project-owner governance decision missing.');
  if (
    decision.decisionId !== 'governance.face.methodology_review.project_owner_single_approver' ||
    decision.version !== '0.1.0' ||
    decision.effectiveDate !== '2026-09-04' ||
    decision.authorityScope !== 'methodology_review_promotion' ||
    decision.authorityRoleRef !== 'role.myeongha.project_owner' ||
    decision.researchToReviewedPromotionMayBeApprovedByProjectOwner !== true ||
    decision.externalExpertRequired !== false ||
    decision.requiredApprovalCount !== 1 ||
    decision.configuredConsensusThreshold !== null ||
    decision.targetSpecificApprovalRequired !== true ||
    decision.provenanceRefs.length !== 1 ||
    decision.provenanceRefs[0] !== GOVERNANCE_SOURCE_REF ||
    decision.limitations.length === 0
  ) fail('project-owner governance decision drift.');
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

function validateCurrentAuthority(): void {
  validateProjectOwnerMethodologyReviewGovernanceDecisionRegistryFR131(FACE_FR131_PROJECT_OWNER_GOVERNANCE_DECISION_REGISTRY);
  validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(FACE_FR131_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY);
  validateMethodologyReviewAuthorityActorRegistryFR126(FACE_FR131_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY);
  validateMethodologyReviewEvidencePolicyRegistryFR126(FACE_FR131_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY);

  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) fail('FR-124 historical decision registry must remain empty.');
  const registry = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY;
  const method = registry.methodologies.find((candidate) => methodologyRef(candidate) === TARGET_METHOD_REF);
  const proposed = registry.methodologies.find((candidate) => methodologyRef(candidate) === PROPOSED_REVIEWED_REF);
  const source = registry.passages.find((candidate) => candidate.passageId === SOURCE_REF);
  if (
    method === undefined ||
    method.reviewStatus !== 'research' ||
    method.sourceRefs.length !== 1 ||
    method.sourceRefs[0] !== SOURCE_REF ||
    proposed !== undefined ||
    source === undefined ||
    source.verificationStatus !== 'scan_checked'
  ) fail('persisted intake methodology authority drift.');
}

export function assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(): FiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131V1 {
  if (CACHED !== null) return CACHED;

  const fr130 = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130();
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130(fr130);
  if (
    fr130.authorityState !== 'independent_methodology_review_governance_trust_anchor_materialization_blocked_no_governed_external_designation' ||
    fr130.admission.governedExternalDesignationPresent !== false ||
    fr130.admission.trustAnchorMaterializationAuthorized !== false ||
    fr130.execution.governanceTrustAnchorsMaterialized !== 0 ||
    fr130.nextFrontier !== 'independent_methodology_review_governance_trust_anchor_external_designation_acquisition_and_admission'
  ) fail('FR-130 predecessor authority drift.');

  validateCurrentAuthority();

  const result: FiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131V1 = Object.freeze({
    schemaVersion: 'fr131-five-officers-intake-project-owner-methodology-review-governance-materialization-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending' as const,
    predecessor: Object.freeze({
      fr130AuthorityState: fr130.authorityState,
      fr130NextFrontier: fr130.nextFrontier,
      externalDesignationPreviouslyPresent: false as const,
      trustAnchorPreviouslyMaterialized: false as const,
    }),
    governanceDecision: Object.freeze({
      decisionRef: GOVERNANCE_DECISION_REF,
      governanceSourceRef: GOVERNANCE_SOURCE_REF,
      authorityRoleRef: 'role.myeongha.project_owner' as const,
      requiredApprovalCount: 1 as const,
      configuredReviewerCount: 1 as const,
      configuredQuorum: null,
      configuredConsensusThreshold: null,
      externalExpertRequired: false as const,
      targetSpecificApprovalRequired: true as const,
    }),
    currentGovernance: Object.freeze({
      governedTrustAnchorRef: TRUST_ANCHOR_REF,
      governedAuthorityActorRef: ACTOR_REF,
      governedReviewEvidencePolicyRef: POLICY_REF,
      trustAnchorDefinitionCount: 1 as const,
      trustAnchorMaterializedCount: 1 as const,
      authorityActorDefinitionCount: 1 as const,
      reviewEvidencePolicyDefinitionCount: 1 as const,
      targetSpecificReviewDecisionCount: 0 as const,
    }),
    persistedAuthority: Object.freeze({
      researchMethodologyRef: TARGET_METHOD_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: SOURCE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
      proposedReviewedSuccessorPresent: false as const,
      historicalFr124DecisionCount: 0 as const,
    }),
    admission: Object.freeze({
      governedExternalDesignationPresent: true as const,
      governedExternalDesignationAdmitted: true as const,
      exactTrustAnchorDefinitionBindingPresent: true as const,
      trustAnchorMaterializationAuthorized: true as const,
      trustAnchorMaterialized: true as const,
      actorProvenanceAdmissionAuthorized: true as const,
      evidencePolicyProvenanceAdmissionAuthorized: true as const,
      actorRegistryAppendAuthorized: true as const,
      evidencePolicyRegistryAppendAuthorized: true as const,
      futureTargetSpecificDecisionMaterializationAuthorized: true as const,
      targetSpecificReviewDecisionPresent: false as const,
      reviewedPromotionAuthorized: false as const,
      reviewedSuccessorIssued: false as const,
      reviewedSuccessorPersisted: false as const,
    }),
    execution: Object.freeze({
      governanceDecisionRecordsPersisted: 1 as const,
      externalDesignationAdmissionsIssued: 1 as const,
      governanceTrustAnchorDefinitionsPersisted: 1 as const,
      governanceTrustAnchorsMaterialized: 1 as const,
      authorityActorDefinitionsPersisted: 1 as const,
      reviewEvidencePolicyDefinitionsPersisted: 1 as const,
      methodologyReviewDecisionRecordsIssued: 0 as const,
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
    authorityBoundary: Object.freeze({
      projectOwnerGovernanceDecisionMeansTargetMethodologyApproved: false as const,
      singleApproverPolicyMeansAutomaticPromotion: false as const,
      trustAnchorMaterializationMeansTargetMethodologyApproved: false as const,
      actorAuthorityMeansTargetMethodologyApproved: false as const,
      evidencePolicyMeansEvidenceItemAlreadyAdmitted: false as const,
      futureDecisionAuthorizationMeansCurrentDecisionIssued: false as const,
      sourceVerificationMeansMethodologyApproval: false as const,
      repositoryMergeMeansMethodologyApproval: false as const,
      governanceMaterializationMeansMetricBinding: false as const,
      governanceMaterializationMeansThreshold: false as const,
      governanceMaterializationMeansCriterionState: false as const,
      governanceMaterializationMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    blockers: Object.freeze([
      'target_specific_project_owner_methodology_review_decision_not_issued',
      'reviewed_successor_not_issued',
      'square_broad_metric_to_source_concept_mapping_not_authorized',
      'square_broad_calibration_evidence_absent',
      'square_broad_threshold_not_calibrated',
    ] as const),
    nextFrontier: 'project_owner_target_specific_intake_methodology_review_decision' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(
  value: FiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131V1,
): void {
  if (!ISSUED.has(value)) fail('project-owner methodology review governance artifact was not issued by FR-131.');
}
