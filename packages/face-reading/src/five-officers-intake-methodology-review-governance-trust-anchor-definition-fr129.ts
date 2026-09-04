import {
  assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128,
} from './five-officers-intake-methodology-review-governance-trust-anchor-admission-fr128.js';
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

export interface MethodologyReviewGovernanceTrustAnchorDefinitionFR129V1 {
  readonly anchorId: string;
  readonly version: string;
  readonly authorityScope: 'methodology_review_governance_root';
  readonly provenanceRefs: readonly string[];
  readonly designationEvidenceRefs: readonly string[];
  readonly limitations: readonly string[];
  readonly independentFromTargetActorRegistry: true;
  readonly independentFromTargetEvidencePolicyRegistry: true;
  readonly selfDesignationAuthorized: false;
  readonly sourceVerificationAuthorityInherited: false;
  readonly repositoryIdentityAuthorityInherited: false;
  readonly pullRequestMergeAuthorityInherited: false;
  readonly pieOperationalAuthorityInherited: false;
  readonly legacyReviewedScalarAuthorityInherited: false;
  readonly externalProviderProvenanceAuthorityInherited: false;
  readonly methodologyReviewDecisionAuthorityGranted: false;
}

export interface MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 {
  readonly registryId: string;
  readonly version: string;
  readonly anchors: readonly MethodologyReviewGovernanceTrustAnchorDefinitionFR129V1[];
}

export interface FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129V1 {
  readonly schemaVersion: 'fr129-five-officers-intake-methodology-review-governance-trust-anchor-definition-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor';
  readonly predecessor: {
    readonly fr128AuthorityState: 'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor';
    readonly fr128NextFrontier: 'independent_methodology_review_governance_trust_anchor_acquisition';
    readonly independentGovernanceTrustAnchorPresent: false;
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
  };
  readonly contract: {
    readonly trustAnchorRegistryRef: 'registry.face.methodology_review_governance_trust_anchors.fr129@0.1.0';
    readonly authorityScope: 'methodology_review_governance_root';
    readonly provenanceRefsRequired: true;
    readonly externalDesignationEvidenceRefsRequired: true;
    readonly independenceFromTargetActorRegistryRequired: true;
    readonly independenceFromTargetEvidencePolicyRegistryRequired: true;
    readonly selfDesignationAuthorized: false;
    readonly structurallyValidDefinitionAutoAdmitted: false;
    readonly configuredQuorum: null;
    readonly configuredReviewerCount: null;
    readonly configuredConsensusThreshold: null;
  };
  readonly currentGovernance: {
    readonly trustAnchorDefinitionCount: 0;
    readonly governedTrustAnchorRef: null;
    readonly admittedActorProvenanceRef: null;
    readonly admittedEvidencePolicyProvenanceRef: null;
  };
  readonly admission: {
    readonly trustAnchorDefinitionContractReady: true;
    readonly governedTrustAnchorDefinitionPresent: false;
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
    readonly governanceTrustAnchorDefinitionsPersisted: 0;
    readonly governanceTrustAnchorsMaterialized: 0;
    readonly actorProvenanceAdmissionsIssued: 0;
    readonly evidencePolicyProvenanceAdmissionsIssued: 0;
    readonly authorityActorDefinitionsPersisted: 0;
    readonly reviewEvidencePolicyDefinitionsPersisted: 0;
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
  readonly blockers: readonly [
    'no_governed_independent_methodology_review_trust_anchor_definition',
    'no_independent_methodology_review_trust_anchor_materialization',
    'actor_and_evidence_policy_provenance_admission_remains_blocked',
  ];
  readonly authorityBoundary: {
    readonly structurallyValidTrustAnchorDefinitionMeansGovernedTrustAnchor: false;
    readonly nonEmptyDesignationEvidenceStringMeansExternalDesignationAuthority: false;
    readonly selfDesignationMeansIndependentTrustAnchor: false;
    readonly repositoryIdentityMeansTrustAnchorDesignation: false;
    readonly sourceVerificationMeansTrustAnchorDesignation: false;
    readonly pullRequestMergeMeansTrustAnchorDesignation: false;
    readonly pieOperationalReadinessMeansTrustAnchorDesignation: false;
    readonly legacyReviewedScalarMeansTrustAnchorDesignation: false;
    readonly externalProviderProvenanceMeansTrustAnchorDesignation: false;
    readonly trustAnchorMaterializationMeansReviewDecisionAuthority: false;
    readonly trustAnchorMaterializationMeansMetricBinding: false;
    readonly trustAnchorMaterializationMeansThreshold: false;
    readonly trustAnchorMaterializationMeansCriterionState: false;
    readonly trustAnchorMaterializationMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'governed_independent_methodology_review_governance_trust_anchor_materialization';
}

export const FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY: MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 = Object.freeze({
  registryId: 'registry.face.methodology_review_governance_trust_anchors.fr129',
  version: '0.1.0',
  anchors: Object.freeze([] as const),
});

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-129 ${message}`);
}

function nonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) fail(`${label} must be non-empty.`);
}

function nonEmptyList(values: readonly string[], label: string): void {
  if (!Array.isArray(values) || values.length === 0) fail(`${label} must contain at least one entry.`);
  for (const [index, value] of values.entries()) nonEmpty(value, `${label}[${index}]`);
  if (new Set(values).size !== values.length) fail(`${label} entries must be unique.`);
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

export function validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(
  registry: MethodologyReviewGovernanceTrustAnchorRegistryFR129V1,
): MethodologyReviewGovernanceTrustAnchorRegistryFR129V1 {
  nonEmpty(registry.registryId, 'registryId');
  nonEmpty(registry.version, 'registry.version');
  const seen = new Set<string>();
  for (const [index, anchor] of registry.anchors.entries()) {
    nonEmpty(anchor.anchorId, `anchors[${index}].anchorId`);
    nonEmpty(anchor.version, `anchors[${index}].version`);
    if (anchor.authorityScope !== 'methodology_review_governance_root') fail(`anchors[${index}].authorityScope drift.`);
    nonEmptyList(anchor.provenanceRefs, `anchors[${index}].provenanceRefs`);
    nonEmptyList(anchor.designationEvidenceRefs, `anchors[${index}].designationEvidenceRefs`);
    nonEmptyList(anchor.limitations, `anchors[${index}].limitations`);
    if (
      anchor.independentFromTargetActorRegistry !== true ||
      anchor.independentFromTargetEvidencePolicyRegistry !== true ||
      anchor.selfDesignationAuthorized !== false ||
      anchor.sourceVerificationAuthorityInherited !== false ||
      anchor.repositoryIdentityAuthorityInherited !== false ||
      anchor.pullRequestMergeAuthorityInherited !== false ||
      anchor.pieOperationalAuthorityInherited !== false ||
      anchor.legacyReviewedScalarAuthorityInherited !== false ||
      anchor.externalProviderProvenanceAuthorityInherited !== false ||
      anchor.methodologyReviewDecisionAuthorityGranted !== false
    ) fail(`anchors[${index}] authority boundary drift.`);
    const ref = `${anchor.anchorId}@${anchor.version}`;
    if (seen.has(ref)) fail(`duplicate trust-anchor definition ${ref}.`);
    seen.add(ref);
  }
  return registry;
}

function validatePersistedAuthority(): void {
  validateMethodologyReviewGovernanceTrustAnchorRegistryFR129(FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY);
  if (FACE_FR129_METHODOLOGY_REVIEW_GOVERNANCE_TRUST_ANCHOR_REGISTRY.anchors.length !== 0) {
    fail('FR-129 governed trust-anchor registry must remain empty until externally designated authority is admitted.');
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

export function assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129(): FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129V1 {
  if (CACHED !== null) return CACHED;

  const fr128 = assessFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128();
  assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorAdmissionFR128(fr128);
  if (
    fr128.authorityState !== 'methodology_review_provenance_acquisition_and_admission_blocked_no_independent_governance_trust_anchor' ||
    fr128.admission.independentGovernanceTrustAnchorPresent !== false ||
    fr128.admission.actorProvenanceAdmissionAuthorized !== false ||
    fr128.admission.evidencePolicyProvenanceAdmissionAuthorized !== false ||
    fr128.execution.governanceTrustAnchorsPersisted !== 0 ||
    fr128.nextFrontier !== 'independent_methodology_review_governance_trust_anchor_acquisition'
  ) fail('FR-128 predecessor authority drift.');

  validatePersistedAuthority();

  const result: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129V1 = Object.freeze({
    schemaVersion: 'fr129-five-officers-intake-methodology-review-governance-trust-anchor-definition-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor' as const,
    predecessor: Object.freeze({
      fr128AuthorityState: fr128.authorityState,
      fr128NextFrontier: fr128.nextFrontier,
      independentGovernanceTrustAnchorPresent: false as const,
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
    }),
    contract: Object.freeze({
      trustAnchorRegistryRef: 'registry.face.methodology_review_governance_trust_anchors.fr129@0.1.0' as const,
      authorityScope: 'methodology_review_governance_root' as const,
      provenanceRefsRequired: true as const,
      externalDesignationEvidenceRefsRequired: true as const,
      independenceFromTargetActorRegistryRequired: true as const,
      independenceFromTargetEvidencePolicyRegistryRequired: true as const,
      selfDesignationAuthorized: false as const,
      structurallyValidDefinitionAutoAdmitted: false as const,
      configuredQuorum: null,
      configuredReviewerCount: null,
      configuredConsensusThreshold: null,
    }),
    currentGovernance: Object.freeze({
      trustAnchorDefinitionCount: 0 as const,
      governedTrustAnchorRef: null,
      admittedActorProvenanceRef: null,
      admittedEvidencePolicyProvenanceRef: null,
    }),
    admission: Object.freeze({
      trustAnchorDefinitionContractReady: true as const,
      governedTrustAnchorDefinitionPresent: false as const,
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
      governanceTrustAnchorDefinitionsPersisted: 0 as const,
      governanceTrustAnchorsMaterialized: 0 as const,
      actorProvenanceAdmissionsIssued: 0 as const,
      evidencePolicyProvenanceAdmissionsIssued: 0 as const,
      authorityActorDefinitionsPersisted: 0 as const,
      reviewEvidencePolicyDefinitionsPersisted: 0 as const,
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
    blockers: Object.freeze([
      'no_governed_independent_methodology_review_trust_anchor_definition',
      'no_independent_methodology_review_trust_anchor_materialization',
      'actor_and_evidence_policy_provenance_admission_remains_blocked',
    ] as const),
    authorityBoundary: Object.freeze({
      structurallyValidTrustAnchorDefinitionMeansGovernedTrustAnchor: false as const,
      nonEmptyDesignationEvidenceStringMeansExternalDesignationAuthority: false as const,
      selfDesignationMeansIndependentTrustAnchor: false as const,
      repositoryIdentityMeansTrustAnchorDesignation: false as const,
      sourceVerificationMeansTrustAnchorDesignation: false as const,
      pullRequestMergeMeansTrustAnchorDesignation: false as const,
      pieOperationalReadinessMeansTrustAnchorDesignation: false as const,
      legacyReviewedScalarMeansTrustAnchorDesignation: false as const,
      externalProviderProvenanceMeansTrustAnchorDesignation: false as const,
      trustAnchorMaterializationMeansReviewDecisionAuthority: false as const,
      trustAnchorMaterializationMeansMetricBinding: false as const,
      trustAnchorMaterializationMeansThreshold: false as const,
      trustAnchorMaterializationMeansCriterionState: false as const,
      trustAnchorMaterializationMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'governed_independent_methodology_review_governance_trust_anchor_materialization' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129(
  value: FiveOfficerIntakeMethodologyReviewGovernanceTrustAnchorDefinitionFR129V1,
): void {
  if (!ISSUED.has(value)) fail('governance trust-anchor definition artifact was not issued by FR-129.');
  if (
    value.authorityState !== 'independent_methodology_review_governance_trust_anchor_contract_established_no_governed_anchor' ||
    value.currentGovernance.trustAnchorDefinitionCount !== 0 ||
    value.currentGovernance.governedTrustAnchorRef !== null ||
    value.admission.governedTrustAnchorDefinitionPresent !== false ||
    value.admission.trustAnchorMaterializationAuthorized !== false ||
    value.admission.actorProvenanceAdmissionAuthorized !== false ||
    value.admission.evidencePolicyProvenanceAdmissionAuthorized !== false ||
    value.execution.governanceTrustAnchorDefinitionsPersisted !== 0 ||
    value.execution.governanceTrustAnchorsMaterialized !== 0 ||
    value.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== 'governed_independent_methodology_review_governance_trust_anchor_materialization'
  ) fail('issued governance trust-anchor definition artifact drift.');
}
