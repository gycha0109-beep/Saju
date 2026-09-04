import {
  FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY,
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129,
} from './five-officers-intake-methodology-review-governance-trust-anchor-definition-fr129.js';
import {
  FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY,
  FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY,
} from './five-officers-intake-methodology-review-actor-evidence-policy-definition-fr126.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const TRUST_ANCHOR_REGISTRY_REF = 'registry.face.methodology_review_governance_trust_anchors.fr129@0.1.0' as const;

export interface FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130V1 {
  readonly schemaVersion: 'fr130-five-officers-intake-methodology-review-governance-trust-anchor-materialization-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'independent_methodology_review_governance_trust_anchor_materialization_blocked_no_governed_external_designation';
  readonly predecessor: {
    readonly fr129AuthorityState: 'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor';
    readonly fr129NextFrontier: 'governed_independent_methodology_review_governance_trust_anchor_materialization';
    readonly trustAnchorRegistryRef: typeof TRUST_ANCHOR_REGISTRY_REF;
    readonly trustAnchorDefinitionCount: 0;
    readonly governedTrustAnchorRef: null;
  };
  readonly persistedAuthority: {
    readonly researchMethodologyRef: typeof TARGET_METHOD_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
    readonly proposedReviewedSuccessorPresent: false;
    readonly fr124DecisionCount: 0;
    readonly fr126ActorDefinitionCount: 0;
    readonly fr126EvidencePolicyDefinitionCount: 0;
    readonly fr129TrustAnchorDefinitionCount: 0;
  };
  readonly materializationRequirements: {
    readonly governedExternalDesignationRequired: true;
    readonly governedExternalDesignationEvidenceRequired: true;
    readonly governedExternalDesignationProvenanceRequired: true;
    readonly externalDesignationMustBeIndependentFromTargetActorRegistry: true;
    readonly externalDesignationMustBeIndependentFromTargetEvidencePolicyRegistry: true;
    readonly designationMustBindExactTrustAnchorDefinition: true;
    readonly structurallyValidCandidateMaySubstituteForExternalDesignation: false;
    readonly nonEmptyDesignationEvidenceStringMaySubstituteForGovernedDesignation: false;
    readonly sourceVerificationMaySubstituteForExternalDesignation: false;
    readonly repositoryIdentityMaySubstituteForExternalDesignation: false;
    readonly pullRequestMergeMaySubstituteForExternalDesignation: false;
    readonly pieOperationalReadinessMaySubstituteForExternalDesignation: false;
    readonly legacyReviewedScalarMaySubstituteForExternalDesignation: false;
    readonly externalProviderSignatureValidityMaySubstituteForExternalDesignation: false;
  };
  readonly currentDesignation: {
    readonly governedExternalDesignationRef: null;
    readonly governedExternalDesignationAdmissionRef: null;
    readonly governedExternalDesignationEvidenceRefs: readonly [];
    readonly governedExternalDesignationProvenanceRefs: readonly [];
    readonly designatedTrustAnchorDefinitionRef: null;
    readonly materializedTrustAnchorRef: null;
    readonly configuredQuorum: null;
    readonly configuredReviewerCount: null;
    readonly configuredConsensusThreshold: null;
  };
  readonly admission: {
    readonly fr129TrustAnchorDefinitionContractReady: true;
    readonly governedExternalDesignationPresent: false;
    readonly governedExternalDesignationAdmitted: false;
    readonly exactTrustAnchorDefinitionBindingPresent: false;
    readonly trustAnchorRegistryAppendAuthorized: false;
    readonly trustAnchorMaterializationAuthorized: false;
    readonly actorProvenanceAcquisitionAuthorized: false;
    readonly evidencePolicyProvenanceAcquisitionAuthorized: false;
    readonly actorProvenanceAdmissionAuthorized: false;
    readonly evidencePolicyProvenanceAdmissionAuthorized: false;
    readonly actorRegistryAppendAuthorized: false;
    readonly evidencePolicyRegistryAppendAuthorized: false;
    readonly decisionMaterializationAuthorized: false;
    readonly reviewedPromotionAuthorized: false;
    readonly reviewedSuccessorIssued: false;
    readonly reviewedSuccessorPersisted: false;
  };
  readonly execution: {
    readonly externalDesignationRecordsPersisted: 0;
    readonly externalDesignationAdmissionsIssued: 0;
    readonly governanceTrustAnchorDefinitionsPersisted: 0;
    readonly governanceTrustAnchorsMaterialized: 0;
    readonly actorProvenanceRecordsPersisted: 0;
    readonly actorProvenanceAdmissionsIssued: 0;
    readonly evidencePolicyProvenanceRecordsPersisted: 0;
    readonly evidencePolicyProvenanceAdmissionsIssued: 0;
    readonly authorityActorDefinitionsPersisted: 0;
    readonly reviewEvidencePolicyDefinitionsPersisted: 0;
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
    'no_governed_external_methodology_review_trust_anchor_designation',
    'no_governed_external_methodology_review_trust_anchor_designation_admission',
    'no_exact_designation_to_trust_anchor_definition_binding',
    'trust_anchor_materialization_not_authorized',
  ];
  readonly authorityBoundary: {
    readonly trustAnchorDefinitionContractMeansMaterializationAuthority: false;
    readonly structurallyValidCandidateMeansGovernedExternalDesignation: false;
    readonly designationEvidenceStringMeansGovernedExternalDesignation: false;
    readonly sourceVerificationMeansExternalDesignationAuthority: false;
    readonly repositoryIdentityMeansExternalDesignationAuthority: false;
    readonly pullRequestMergeMeansExternalDesignationAuthority: false;
    readonly pieOperationalReadinessMeansExternalDesignationAuthority: false;
    readonly legacyReviewedScalarMeansExternalDesignationAuthority: false;
    readonly externalProviderSignatureValidityMeansMethodologyReviewDesignationAuthority: false;
    readonly trustAnchorMaterializationMeansActorProvenanceAdmission: false;
    readonly trustAnchorMaterializationMeansEvidencePolicyProvenanceAdmission: false;
    readonly trustAnchorMaterializationMeansReviewDecisionAuthority: false;
    readonly trustAnchorMaterializationMeansReviewedPromotion: false;
    readonly trustAnchorMaterializationMeansMetricBinding: false;
    readonly trustAnchorMaterializationMeansThreshold: false;
    readonly trustAnchorMaterializationMeansCriterionState: false;
    readonly trustAnchorMaterializationMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'independent_methodology_review_governance_trust_anchor_external_designation_acquisition_and_admission';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-130 ${message}`);
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

function validatePersistedAuthority(): void {
  if (FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors.length !== 0) {
    fail('FR-129 trust-anchor registry must remain empty before governed external designation is admitted.');
  }
  if (FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0) fail('FR-126 actor registry drift.');
  if (FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0) fail('FR-126 evidence-policy registry drift.');
  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) fail('FR-124 decision registry drift.');

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

export function assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130(): FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130V1 {
  if (CACHED !== null) return CACHED;

  const fr129 = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129();
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129(fr129);
  if (
    fr129.authorityState !== 'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor' ||
    fr129.contract.trustAnchorRegistryRef !== TRUST_ANCHOR_REGISTRY_REF ||
    fr129.currentGovernance.trustAnchorDefinitionCount !== 0 ||
    fr129.currentGovernance.governedTrustAnchorRef !== null ||
    fr129.admission.trustAnchorMaterializationAuthorized !== false ||
    fr129.nextFrontier !== 'governed_independent_methodology_review_governance_trust_anchor_materialization'
  ) fail('FR-129 predecessor authority drift.');

  validatePersistedAuthority();

  const result: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130V1 = Object.freeze({
    schemaVersion: 'fr130-five-officers-intake-methodology-review-governance-trust-anchor-materialization-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'independent_methodology_review_governance_trust_anchor_materialization_blocked_no_governed_external_designation' as const,
    predecessor: Object.freeze({
      fr129AuthorityState: fr129.authorityState,
      fr129NextFrontier: fr129.nextFrontier,
      trustAnchorRegistryRef: TRUST_ANCHOR_REGISTRY_REF,
      trustAnchorDefinitionCount: 0 as const,
      governedTrustAnchorRef: null,
    }),
    persistedAuthority: Object.freeze({
      researchMethodologyRef: TARGET_METHOD_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
      proposedReviewedSuccessorPresent: false as const,
      fr124DecisionCount: 0 as const,
      fr126ActorDefinitionCount: 0 as const,
      fr126EvidencePolicyDefinitionCount: 0 as const,
      fr129TrustAnchorDefinitionCount: 0 as const,
    }),
    materializationRequirements: Object.freeze({
      governedExternalDesignationRequired: true as const,
      governedExternalDesignationEvidenceRequired: true as const,
      governedExternalDesignationProvenanceRequired: true as const,
      externalDesignationMustBeIndependentFromTargetActorRegistry: true as const,
      externalDesignationMustBeIndependentFromTargetEvidencePolicyRegistry: true as const,
      designationMustBindExactTrustAnchorDefinition: true as const,
      structurallyValidCandidateMaySubstituteForExternalDesignation: false as const,
      nonEmptyDesignationEvidenceStringMaySubstituteForGovernedDesignation: false as const,
      sourceVerificationMaySubstituteForExternalDesignation: false as const,
      repositoryIdentityMaySubstituteForExternalDesignation: false as const,
      pullRequestMergeMaySubstituteForExternalDesignation: false as const,
      pieOperationalReadinessMaySubstituteForExternalDesignation: false as const,
      legacyReviewedScalarMaySubstituteForExternalDesignation: false as const,
      externalProviderSignatureValidityMaySubstituteForExternalDesignation: false as const,
    }),
    currentDesignation: Object.freeze({
      governedExternalDesignationRef: null,
      governedExternalDesignationAdmissionRef: null,
      governedExternalDesignationEvidenceRefs: Object.freeze([] as const),
      governedExternalDesignationProvenanceRefs: Object.freeze([] as const),
      designatedTrustAnchorDefinitionRef: null,
      materializedTrustAnchorRef: null,
      configuredQuorum: null,
      configuredReviewerCount: null,
      configuredConsensusThreshold: null,
    }),
    admission: Object.freeze({
      fr129TrustAnchorDefinitionContractReady: true as const,
      governedExternalDesignationPresent: false as const,
      governedExternalDesignationAdmitted: false as const,
      exactTrustAnchorDefinitionBindingPresent: false as const,
      trustAnchorRegistryAppendAuthorized: false as const,
      trustAnchorMaterializationAuthorized: false as const,
      actorProvenanceAcquisitionAuthorized: false as const,
      evidencePolicyProvenanceAcquisitionAuthorized: false as const,
      actorProvenanceAdmissionAuthorized: false as const,
      evidencePolicyProvenanceAdmissionAuthorized: false as const,
      actorRegistryAppendAuthorized: false as const,
      evidencePolicyRegistryAppendAuthorized: false as const,
      decisionMaterializationAuthorized: false as const,
      reviewedPromotionAuthorized: false as const,
      reviewedSuccessorIssued: false as const,
      reviewedSuccessorPersisted: false as const,
    }),
    execution: Object.freeze({
      externalDesignationRecordsPersisted: 0 as const,
      externalDesignationAdmissionsIssued: 0 as const,
      governanceTrustAnchorDefinitionsPersisted: 0 as const,
      governanceTrustAnchorsMaterialized: 0 as const,
      actorProvenanceRecordsPersisted: 0 as const,
      actorProvenanceAdmissionsIssued: 0 as const,
      evidencePolicyProvenanceRecordsPersisted: 0 as const,
      evidencePolicyProvenanceAdmissionsIssued: 0 as const,
      authorityActorDefinitionsPersisted: 0 as const,
      reviewEvidencePolicyDefinitionsPersisted: 0 as const,
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
      'no_governed_external_methodology_review_trust_anchor_designation',
      'no_governed_external_methodology_review_trust_anchor_designation_admission',
      'no_exact_designation_to_trust_anchor_definition_binding',
      'trust_anchor_materialization_not_authorized',
    ] as const),
    authorityBoundary: Object.freeze({
      trustAnchorDefinitionContractMeansMaterializationAuthority: false as const,
      structurallyValidCandidateMeansGovernedExternalDesignation: false as const,
      designationEvidenceStringMeansGovernedExternalDesignation: false as const,
      sourceVerificationMeansExternalDesignationAuthority: false as const,
      repositoryIdentityMeansExternalDesignationAuthority: false as const,
      pullRequestMergeMeansExternalDesignationAuthority: false as const,
      pieOperationalReadinessMeansExternalDesignationAuthority: false as const,
      legacyReviewedScalarMeansExternalDesignationAuthority: false as const,
      externalProviderSignatureValidityMeansMethodologyReviewDesignationAuthority: false as const,
      trustAnchorMaterializationMeansActorProvenanceAdmission: false as const,
      trustAnchorMaterializationMeansEvidencePolicyProvenanceAdmission: false as const,
      trustAnchorMaterializationMeansReviewDecisionAuthority: false as const,
      trustAnchorMaterializationMeansReviewedPromotion: false as const,
      trustAnchorMaterializationMeansMetricBinding: false as const,
      trustAnchorMaterializationMeansThreshold: false as const,
      trustAnchorMaterializationMeansCriterionState: false as const,
      trustAnchorMaterializationMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'independent_methodology_review_governance_trust_anchor_external_designation_acquisition_and_admission' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130(
  value: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorMaterializationAdmissionFR130V1,
): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by the FR-130 admission gate.');
}
