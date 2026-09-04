import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;

export interface FiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127V1 {
  readonly schemaVersion: 'fr127-five-officers-intake-methodology-review-actor-evidence-policy-materialization-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance';
  readonly predecessor: {
    readonly fr126AuthorityState: 'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions';
    readonly actorRegistryRef: 'registry.face.methodology_review_authority_actors.fr126@0.1.0';
    readonly evidencePolicyRegistryRef: 'registry.face.methodology_review_evidence_policies.fr126@0.1.0';
    readonly actorDefinitionCount: 0;
    readonly evidencePolicyDefinitionCount: 0;
  };
  readonly persistedAuthority: {
    readonly researchMethodologyRef: typeof TARGET_METHOD_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
    readonly proposedReviewedSuccessorPresent: false;
    readonly fr124DecisionCount: 0;
  };
  readonly materializationRequirements: {
    readonly governedActorProvenanceRequired: true;
    readonly governedEvidencePolicyProvenanceRequired: true;
    readonly actorProvenanceMustBeAdmittedBeforeRegistryAppend: true;
    readonly evidencePolicyProvenanceMustBeAdmittedBeforeRegistryAppend: true;
    readonly provenanceMustBeBoundToMethodologyReviewScope: true;
    readonly sourceVerificationRecordMaySubstituteForActorProvenance: false;
    readonly sourceCheckerIdentityMaySubstituteForActorProvenance: false;
    readonly gitHubIdentityMaySubstituteForActorProvenance: false;
    readonly pullRequestMergeMaySubstituteForActorProvenance: false;
    readonly pieOperationalPolicyMaySubstituteForEvidencePolicyProvenance: false;
    readonly legacyReviewedScalarMaySubstituteForActorOrPolicyProvenance: false;
  };
  readonly currentProvenance: {
    readonly governedActorProvenanceRef: null;
    readonly governedActorProvenanceAdmissionRef: null;
    readonly governedEvidencePolicyProvenanceRef: null;
    readonly governedEvidencePolicyProvenanceAdmissionRef: null;
    readonly governedAuthorityActorRef: null;
    readonly governedReviewEvidencePolicyRef: null;
    readonly admittedReviewEvidenceRefs: readonly [];
    readonly configuredQuorum: null;
    readonly configuredReviewerCount: null;
    readonly configuredConsensusThreshold: null;
  };
  readonly admission: {
    readonly fr126ActorDefinitionContractReady: true;
    readonly fr126EvidencePolicyDefinitionContractReady: true;
    readonly sourcePrerequisiteSatisfied: true;
    readonly governedActorProvenancePresent: false;
    readonly governedActorProvenanceAdmitted: false;
    readonly governedEvidencePolicyProvenancePresent: false;
    readonly governedEvidencePolicyProvenanceAdmitted: false;
    readonly actorRegistryAppendAuthorized: false;
    readonly evidencePolicyRegistryAppendAuthorized: false;
    readonly actorDefinitionMaterialized: false;
    readonly evidencePolicyDefinitionMaterialized: false;
    readonly decisionMaterializationAuthorized: false;
    readonly decisionRecordIssued: false;
    readonly reviewedPromotionAuthorized: false;
    readonly reviewedSuccessorIssued: false;
    readonly reviewedSuccessorPersisted: false;
  };
  readonly execution: {
    readonly actorProvenanceRecordsPersisted: 0;
    readonly actorProvenanceAdmissionsIssued: 0;
    readonly evidencePolicyProvenanceRecordsPersisted: 0;
    readonly evidencePolicyProvenanceAdmissionsIssued: 0;
    readonly authorityActorDefinitionsPersisted: 0;
    readonly reviewEvidencePolicyDefinitionsPersisted: 0;
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
    'no_governed_methodology_review_actor_provenance',
    'no_governed_methodology_review_actor_provenance_admission',
    'no_governed_methodology_review_evidence_policy_provenance',
    'no_governed_methodology_review_evidence_policy_provenance_admission',
    'no_governed_methodology_review_authority_actor_definition',
    'no_governed_methodology_review_evidence_policy_definition',
  ];
  readonly authorityBoundary: {
    readonly definitionContractMeansMaterializationAuthority: false;
    readonly provenanceStringMeansGovernedProvenance: false;
    readonly structurallyValidDefinitionMeansGovernedMaterialization: false;
    readonly sourceVerificationMeansMethodologyReviewGovernance: false;
    readonly sourceCheckerMeansMethodologyReviewActor: false;
    readonly repositoryIdentityMeansMethodologyReviewActor: false;
    readonly pullRequestMergeMeansMethodologyReviewAdjudication: false;
    readonly pieOperationalReadinessMeansMethodologyEvidencePolicy: false;
    readonly legacyReviewedScalarMeansMaterializationPrecedent: false;
    readonly actorOrPolicyMaterializationMeansDecisionAuthority: false;
    readonly reviewDecisionMeansMetricBinding: false;
    readonly reviewDecisionMeansThreshold: false;
    readonly reviewDecisionMeansCriterionState: false;
    readonly reviewDecisionMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-127 ${message}`);
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

function validatePersistedAuthority(): void {
  if (FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0) {
    fail('FR-127 requires the FR-126 actor registry to remain empty before governed provenance is admitted.');
  }
  if (FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0) {
    fail('FR-127 requires the FR-126 evidence-policy registry to remain empty before governed provenance is admitted.');
  }
  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) {
    fail('FR-127 requires the FR-124 decision registry to remain empty.');
  }

  const registry = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY;
  const method = registry.methodologies.find((candidate) => methodologyRef(candidate) === TARGET_METHOD_REF);
  const proposed = registry.methodologies.find((candidate) => methodologyRef(candidate) === PROPOSED_REVIEWED_REF);
  const source = registry.passages.find((candidate) => candidate.passageId === WITNESS_QUALIFIED_PASSAGE_REF);
  if (
    method === undefined ||
    method.reviewStatus !== 'research' ||
    method.sourceRefs.length !== 1 ||
    method.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF ||
    proposed !== undefined ||
    source === undefined ||
    source.verificationStatus !== 'scan_checked'
  ) fail('persisted intake methodology authority drift.');
}

export function assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127(): FiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127V1 {
  if (CACHED !== null) return CACHED;

  const fr126 = assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126();
  assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126(fr126);
  if (
    fr126.authorityState !== 'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions' ||
    fr126.currentGovernance.actorDefinitionCount !== 0 ||
    fr126.currentGovernance.evidencePolicyDefinitionCount !== 0 ||
    fr126.currentGovernance.governedAuthorityActorRef !== null ||
    fr126.currentGovernance.governedReviewEvidencePolicyRef !== null ||
    fr126.admission.governedActorDefinitionPresent !== false ||
    fr126.admission.governedEvidencePolicyDefinitionPresent !== false ||
    fr126.admission.decisionMaterializationAuthorized !== false ||
    fr126.nextFrontier !== 'governed_methodology_review_actor_and_evidence_policy_materialization'
  ) fail('FR-126 predecessor authority drift.');

  validatePersistedAuthority();

  const result: FiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127V1 = Object.freeze({
    schemaVersion: 'fr127-five-officers-intake-methodology-review-actor-evidence-policy-materialization-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance' as const,
    predecessor: Object.freeze({
      fr126AuthorityState: fr126.authorityState,
      actorRegistryRef: fr126.contracts.actorRegistryRef,
      evidencePolicyRegistryRef: fr126.contracts.evidencePolicyRegistryRef,
      actorDefinitionCount: 0 as const,
      evidencePolicyDefinitionCount: 0 as const,
    }),
    persistedAuthority: Object.freeze({
      researchMethodologyRef: TARGET_METHOD_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
      proposedReviewedSuccessorPresent: false as const,
      fr124DecisionCount: 0 as const,
    }),
    materializationRequirements: Object.freeze({
      governedActorProvenanceRequired: true as const,
      governedEvidencePolicyProvenanceRequired: true as const,
      actorProvenanceMustBeAdmittedBeforeRegistryAppend: true as const,
      evidencePolicyProvenanceMustBeAdmittedBeforeRegistryAppend: true as const,
      provenanceMustBeBoundToMethodologyReviewScope: true as const,
      sourceVerificationRecordMaySubstituteForActorProvenance: false as const,
      sourceCheckerIdentityMaySubstituteForActorProvenance: false as const,
      gitHubIdentityMaySubstituteForActorProvenance: false as const,
      pullRequestMergeMaySubstituteForActorProvenance: false as const,
      pieOperationalPolicyMaySubstituteForEvidencePolicyProvenance: false as const,
      legacyReviewedScalarMaySubstituteForActorOrPolicyProvenance: false as const,
    }),
    currentProvenance: Object.freeze({
      governedActorProvenanceRef: null,
      governedActorProvenanceAdmissionRef: null,
      governedEvidencePolicyProvenanceRef: null,
      governedEvidencePolicyProvenanceAdmissionRef: null,
      governedAuthorityActorRef: null,
      governedReviewEvidencePolicyRef: null,
      admittedReviewEvidenceRefs: Object.freeze([] as const),
      configuredQuorum: null,
      configuredReviewerCount: null,
      configuredConsensusThreshold: null,
    }),
    admission: Object.freeze({
      fr126ActorDefinitionContractReady: true as const,
      fr126EvidencePolicyDefinitionContractReady: true as const,
      sourcePrerequisiteSatisfied: true as const,
      governedActorProvenancePresent: false as const,
      governedActorProvenanceAdmitted: false as const,
      governedEvidencePolicyProvenancePresent: false as const,
      governedEvidencePolicyProvenanceAdmitted: false as const,
      actorRegistryAppendAuthorized: false as const,
      evidencePolicyRegistryAppendAuthorized: false as const,
      actorDefinitionMaterialized: false as const,
      evidencePolicyDefinitionMaterialized: false as const,
      decisionMaterializationAuthorized: false as const,
      decisionRecordIssued: false as const,
      reviewedPromotionAuthorized: false as const,
      reviewedSuccessorIssued: false as const,
      reviewedSuccessorPersisted: false as const,
    }),
    execution: Object.freeze({
      actorProvenanceRecordsPersisted: 0 as const,
      actorProvenanceAdmissionsIssued: 0 as const,
      evidencePolicyProvenanceRecordsPersisted: 0 as const,
      evidencePolicyProvenanceAdmissionsIssued: 0 as const,
      authorityActorDefinitionsPersisted: 0 as const,
      reviewEvidencePolicyDefinitionsPersisted: 0 as const,
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
      'no_governed_methodology_review_actor_provenance',
      'no_governed_methodology_review_actor_provenance_admission',
      'no_governed_methodology_review_evidence_policy_provenance',
      'no_governed_methodology_review_evidence_policy_provenance_admission',
      'no_governed_methodology_review_authority_actor_definition',
      'no_governed_methodology_review_evidence_policy_definition',
    ] as const),
    authorityBoundary: Object.freeze({
      definitionContractMeansMaterializationAuthority: false as const,
      provenanceStringMeansGovernedProvenance: false as const,
      structurallyValidDefinitionMeansGovernedMaterialization: false as const,
      sourceVerificationMeansMethodologyReviewGovernance: false as const,
      sourceCheckerMeansMethodologyReviewActor: false as const,
      repositoryIdentityMeansMethodologyReviewActor: false as const,
      pullRequestMergeMeansMethodologyReviewAdjudication: false as const,
      pieOperationalReadinessMeansMethodologyEvidencePolicy: false as const,
      legacyReviewedScalarMeansMaterializationPrecedent: false as const,
      actorOrPolicyMaterializationMeansDecisionAuthority: false as const,
      reviewDecisionMeansMetricBinding: false as const,
      reviewDecisionMeansThreshold: false as const,
      reviewDecisionMeansCriterionState: false as const,
      reviewDecisionMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127(
  value: FiveOfficerIntakeMethodologyReviewActorEvidencePolicyMaterializationAdmissionFR127V1,
): void {
  if (!ISSUED.has(value)) fail('actor/evidence-policy materialization admission artifact was not issued by FR-127.');
  if (
    value.authorityState !== 'methodology_review_actor_and_evidence_policy_materialization_blocked_no_governed_provenance' ||
    value.currentProvenance.governedActorProvenanceRef !== null ||
    value.currentProvenance.governedActorProvenanceAdmissionRef !== null ||
    value.currentProvenance.governedEvidencePolicyProvenanceRef !== null ||
    value.currentProvenance.governedEvidencePolicyProvenanceAdmissionRef !== null ||
    value.admission.actorRegistryAppendAuthorized !== false ||
    value.admission.evidencePolicyRegistryAppendAuthorized !== false ||
    value.admission.actorDefinitionMaterialized !== false ||
    value.admission.evidencePolicyDefinitionMaterialized !== false ||
    value.admission.decisionMaterializationAuthorized !== false ||
    value.execution.authorityActorDefinitionsPersisted !== 0 ||
    value.execution.reviewEvidencePolicyDefinitionsPersisted !== 0 ||
    value.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
    value.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== 'methodology_review_actor_and_evidence_policy_provenance_acquisition_and_admission'
  ) fail('issued actor/evidence-policy materialization admission artifact drift.');
}
