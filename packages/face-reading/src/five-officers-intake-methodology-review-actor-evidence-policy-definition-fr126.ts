import {
  assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125,
} from './five-officers-intake-methodology-review-decision-materialization-admission-fr125.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;

export type MethodologyReviewAuthorityScopeFR126V1 = 'methodology_review_promotion';

export interface MethodologyReviewAuthorityActorDefinitionFR126V1 {
  readonly actorId: string;
  readonly version: string;
  readonly authorityScope: MethodologyReviewAuthorityScopeFR126V1;
  readonly provenanceRefs: readonly string[];
  readonly limitations: readonly string[];
  readonly sourceVerificationAuthorityInherited: false;
  readonly repositoryMergeAuthorityInherited: false;
  readonly pieOperationalAuthorityInherited: false;
  readonly legacyReviewedScalarAuthorityInherited: false;
}

export interface MethodologyReviewAuthorityActorRegistryFR126V1 {
  readonly registryId: string;
  readonly version: string;
  readonly actors: readonly MethodologyReviewAuthorityActorDefinitionFR126V1[];
}

export interface MethodologyReviewEvidencePolicyDefinitionFR126V1 {
  readonly policyId: string;
  readonly version: string;
  readonly policyScope: MethodologyReviewAuthorityScopeFR126V1;
  readonly provenanceRefs: readonly string[];
  readonly limitations: readonly string[];
  readonly structuralValidityMeansSemanticApproval: false;
  readonly sourceVerificationMeansMethodologyApproval: false;
  readonly pieOperationalEvidenceMeansMethodologySemanticEvidence: false;
  readonly legacyReviewedScalarMeansPolicyPrecedent: false;
}

export interface MethodologyReviewEvidencePolicyRegistryFR126V1 {
  readonly registryId: string;
  readonly version: string;
  readonly policies: readonly MethodologyReviewEvidencePolicyDefinitionFR126V1[];
}

export interface FiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126V1 {
  readonly schemaVersion: 'fr126-five-officers-intake-methodology-review-actor-evidence-policy-definition-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions';
  readonly predecessor: {
    readonly fr125AuthorityState: 'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy';
    readonly targetMethodologyRef: typeof TARGET_METHOD_REF;
    readonly proposedReviewedSuccessorRef: typeof PROPOSED_REVIEWED_REF;
    readonly fr124DecisionCount: 0;
    readonly decisionMaterializationAuthorized: false;
  };
  readonly persistedAuthority: {
    readonly researchMethodologyRef: typeof TARGET_METHOD_REF;
    readonly researchMethodologyReviewStatus: 'research';
    readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedSourceVerificationStatus: 'scan_checked';
    readonly proposedReviewedSuccessorPresent: false;
  };
  readonly contracts: {
    readonly authorityScope: 'methodology_review_promotion';
    readonly actorRegistryRef: 'registry.face.methodology_review_authority_actors.fr126@0.1.0';
    readonly evidencePolicyRegistryRef: 'registry.face.methodology_review_evidence_policies.fr126@0.1.0';
    readonly actorProvenanceRefsRequired: true;
    readonly actorLimitationsRequired: true;
    readonly evidencePolicyProvenanceRefsRequired: true;
    readonly evidencePolicyLimitationsRequired: true;
    readonly configuredQuorum: null;
    readonly configuredReviewerCount: null;
    readonly configuredConsensusThreshold: null;
  };
  readonly currentGovernance: {
    readonly actorDefinitionCount: 0;
    readonly evidencePolicyDefinitionCount: 0;
    readonly governedAuthorityActorRef: null;
    readonly governedReviewEvidencePolicyRef: null;
    readonly admittedReviewEvidenceRefs: readonly [];
  };
  readonly admission: {
    readonly fr125MaterializationGateReady: true;
    readonly sourcePrerequisiteSatisfied: true;
    readonly actorDefinitionContractReady: true;
    readonly evidencePolicyDefinitionContractReady: true;
    readonly governedActorDefinitionPresent: false;
    readonly governedEvidencePolicyDefinitionPresent: false;
    readonly decisionMaterializationAuthorized: false;
    readonly decisionRecordIssued: false;
    readonly reviewedPromotionAuthorized: false;
    readonly reviewedSuccessorIssued: false;
    readonly reviewedSuccessorPersisted: false;
  };
  readonly execution: {
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
    'no_governed_methodology_review_authority_actor_definition',
    'no_governed_methodology_review_evidence_policy_definition',
    'no_governed_intake_methodology_review_decision_record',
    'no_intake_methodology_review_promotion_authorization',
  ];
  readonly authorityBoundary: {
    readonly actorSchemaMeansActorAuthority: false;
    readonly evidencePolicySchemaMeansAdmittedEvidenceAuthority: false;
    readonly structurallyValidActorDefinitionMeansGovernedActor: false;
    readonly structurallyValidEvidencePolicyMeansGovernedPolicy: false;
    readonly nonEmptyProvenanceRefsMeanSemanticApproval: false;
    readonly sourceVerificationCheckerMeansMethodologyReviewActor: false;
    readonly gitHubIdentityMeansMethodologyReviewActor: false;
    readonly pullRequestMergerMeansMethodologyReviewActor: false;
    readonly pieOperationalPolicyMeansMethodologyEvidencePolicy: false;
    readonly legacyReviewedScalarMeansActorOrPolicyPrecedent: false;
    readonly actorOrPolicyDefinitionMeansDecisionAuthority: false;
    readonly reviewDecisionMeansMetricBinding: false;
    readonly reviewDecisionMeansThreshold: false;
    readonly reviewDecisionMeansCriterionState: false;
    readonly reviewDecisionMeansClaim: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'governed_methodology_review_actor_and_evidence_policy_materialization';
}

export const FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY = Object.freeze({
  registryId: 'registry.face.methodology_review_authority_actors.fr126',
  version: '0.1.0',
  actors: Object.freeze([]),
} as const satisfies MethodologyReviewAuthorityActorRegistryFR126V1);

export const FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY = Object.freeze({
  registryId: 'registry.face.methodology_review_evidence_policies.fr126',
  version: '0.1.0',
  policies: Object.freeze([]),
} as const satisfies MethodologyReviewEvidencePolicyRegistryFR126V1);

const STABLE_KEY = /^[a-z0-9][a-z0-9._:-]{0,191}$/u;
const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-126 ${message}`);
}

function nonEmpty(value: string, path: string): void {
  if (value.trim().length === 0) fail(`${path} must be non-empty.`);
}

function stableKey(value: string, path: string): void {
  if (!STABLE_KEY.test(value)) fail(`${path} must be a stable authority key.`);
}

function uniqueNonEmpty(values: readonly string[], path: string): void {
  if (values.length === 0) fail(`${path} must be non-empty.`);
  const seen = new Set<string>();
  for (const value of values) {
    nonEmpty(value, path);
    if (seen.has(value)) fail(`${path} contains duplicate value: ${value}.`);
    seen.add(value);
  }
}

export function validateMethodologyReviewAuthorityActorRegistryFR126(
  registry: MethodologyReviewAuthorityActorRegistryFR126V1,
): void {
  stableKey(registry.registryId, 'methodologyReviewAuthorityActorRegistry.registryId');
  nonEmpty(registry.version, `${registry.registryId}.version`);
  const refs = new Set<string>();

  for (const actor of registry.actors) {
    stableKey(actor.actorId, 'methodologyReviewAuthorityActor.actorId');
    nonEmpty(actor.version, `${actor.actorId}.version`);
    const ref = `${actor.actorId}@${actor.version}`;
    if (refs.has(ref)) fail(`duplicate methodology review authority actor definition: ${ref}.`);
    refs.add(ref);
    if (actor.authorityScope !== 'methodology_review_promotion') fail(`${ref} has unsupported authority scope.`);
    uniqueNonEmpty(actor.provenanceRefs, `${ref}.provenanceRefs`);
    uniqueNonEmpty(actor.limitations, `${ref}.limitations`);
    if (
      actor.sourceVerificationAuthorityInherited !== false ||
      actor.repositoryMergeAuthorityInherited !== false ||
      actor.pieOperationalAuthorityInherited !== false ||
      actor.legacyReviewedScalarAuthorityInherited !== false
    ) fail(`${ref} attempts to inherit unrelated authority.`);
  }
}

export function validateMethodologyReviewEvidencePolicyRegistryFR126(
  registry: MethodologyReviewEvidencePolicyRegistryFR126V1,
): void {
  stableKey(registry.registryId, 'methodologyReviewEvidencePolicyRegistry.registryId');
  nonEmpty(registry.version, `${registry.registryId}.version`);
  const refs = new Set<string>();

  for (const policy of registry.policies) {
    stableKey(policy.policyId, 'methodologyReviewEvidencePolicy.policyId');
    nonEmpty(policy.version, `${policy.policyId}.version`);
    const ref = `${policy.policyId}@${policy.version}`;
    if (refs.has(ref)) fail(`duplicate methodology review evidence policy definition: ${ref}.`);
    refs.add(ref);
    if (policy.policyScope !== 'methodology_review_promotion') fail(`${ref} has unsupported policy scope.`);
    uniqueNonEmpty(policy.provenanceRefs, `${ref}.provenanceRefs`);
    uniqueNonEmpty(policy.limitations, `${ref}.limitations`);
    if (
      policy.structuralValidityMeansSemanticApproval !== false ||
      policy.sourceVerificationMeansMethodologyApproval !== false ||
      policy.pieOperationalEvidenceMeansMethodologySemanticEvidence !== false ||
      policy.legacyReviewedScalarMeansPolicyPrecedent !== false
    ) fail(`${ref} attempts to convert unrelated evidence into methodology review authority.`);
  }
}

function methodologyRef(methodology: { readonly methodologyId: string; readonly version: string }): string {
  return `${methodology.methodologyId}@${methodology.version}`;
}

function validateCurrentAuthority(): void {
  validateMethodologyReviewAuthorityActorRegistryFR126(FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY);
  validateMethodologyReviewEvidencePolicyRegistryFR126(FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY);

  if (FACE_FR126_METHODOLOGY_REVIEW_AUTHORITY_ACTOR_REGISTRY.actors.length !== 0) {
    fail('current FR-126 actor registry must remain empty until governed actor provenance exists.');
  }
  if (FACE_FR126_METHODOLOGY_REVIEW_EVIDENCE_POLICY_REGISTRY.policies.length !== 0) {
    fail('current FR-126 evidence-policy registry must remain empty until governed policy provenance exists.');
  }
  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) {
    fail('FR-126 requires the FR-124 decision registry to remain empty.');
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

export function assessFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126(): FiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126V1 {
  if (CACHED !== null) return CACHED;

  const fr125 = assessFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125();
  assertIssuedFiveOfficerIntakeMethodologyReviewDecisionMaterializationAdmissionFR125(fr125);
  if (
    fr125.authorityState !== 'methodology_review_decision_materialization_blocked_no_governed_actor_or_evidence_policy' ||
    fr125.currentGovernance.governedAuthorityActorRegistryRef !== null ||
    fr125.currentGovernance.governedAuthorityActorRef !== null ||
    fr125.currentGovernance.governedReviewEvidencePolicyRef !== null ||
    fr125.currentGovernance.admittedReviewEvidenceRefs.length !== 0 ||
    fr125.admission.authorityActorGovernanceReady !== false ||
    fr125.admission.reviewEvidenceGovernanceReady !== false ||
    fr125.admission.decisionMaterializationAuthorized !== false ||
    fr125.execution.authorityActorsIssued !== 0 ||
    fr125.execution.reviewEvidencePoliciesIssued !== 0 ||
    fr125.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
    fr125.nextFrontier !== 'methodology_review_authority_actor_and_evidence_policy_definition'
  ) fail('FR-125 predecessor authority drift.');

  validateCurrentAuthority();

  const result: FiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126V1 = Object.freeze({
    schemaVersion: 'fr126-five-officers-intake-methodology-review-actor-evidence-policy-definition-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions' as const,
    predecessor: Object.freeze({
      fr125AuthorityState: fr125.authorityState,
      targetMethodologyRef: TARGET_METHOD_REF,
      proposedReviewedSuccessorRef: PROPOSED_REVIEWED_REF,
      fr124DecisionCount: 0 as const,
      decisionMaterializationAuthorized: false as const,
    }),
    persistedAuthority: Object.freeze({
      researchMethodologyRef: TARGET_METHOD_REF,
      researchMethodologyReviewStatus: 'research' as const,
      witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedSourceVerificationStatus: 'scan_checked' as const,
      proposedReviewedSuccessorPresent: false as const,
    }),
    contracts: Object.freeze({
      authorityScope: 'methodology_review_promotion' as const,
      actorRegistryRef: 'registry.face.methodology_review_authority_actors.fr126@0.1.0' as const,
      evidencePolicyRegistryRef: 'registry.face.methodology_review_evidence_policies.fr126@0.1.0' as const,
      actorProvenanceRefsRequired: true as const,
      actorLimitationsRequired: true as const,
      evidencePolicyProvenanceRefsRequired: true as const,
      evidencePolicyLimitationsRequired: true as const,
      configuredQuorum: null,
      configuredReviewerCount: null,
      configuredConsensusThreshold: null,
    }),
    currentGovernance: Object.freeze({
      actorDefinitionCount: 0 as const,
      evidencePolicyDefinitionCount: 0 as const,
      governedAuthorityActorRef: null,
      governedReviewEvidencePolicyRef: null,
      admittedReviewEvidenceRefs: Object.freeze([] as const),
    }),
    admission: Object.freeze({
      fr125MaterializationGateReady: true as const,
      sourcePrerequisiteSatisfied: true as const,
      actorDefinitionContractReady: true as const,
      evidencePolicyDefinitionContractReady: true as const,
      governedActorDefinitionPresent: false as const,
      governedEvidencePolicyDefinitionPresent: false as const,
      decisionMaterializationAuthorized: false as const,
      decisionRecordIssued: false as const,
      reviewedPromotionAuthorized: false as const,
      reviewedSuccessorIssued: false as const,
      reviewedSuccessorPersisted: false as const,
    }),
    execution: Object.freeze({
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
      'no_governed_methodology_review_authority_actor_definition',
      'no_governed_methodology_review_evidence_policy_definition',
      'no_governed_intake_methodology_review_decision_record',
      'no_intake_methodology_review_promotion_authorization',
    ] as const),
    authorityBoundary: Object.freeze({
      actorSchemaMeansActorAuthority: false as const,
      evidencePolicySchemaMeansAdmittedEvidenceAuthority: false as const,
      structurallyValidActorDefinitionMeansGovernedActor: false as const,
      structurallyValidEvidencePolicyMeansGovernedPolicy: false as const,
      nonEmptyProvenanceRefsMeanSemanticApproval: false as const,
      sourceVerificationCheckerMeansMethodologyReviewActor: false as const,
      gitHubIdentityMeansMethodologyReviewActor: false as const,
      pullRequestMergerMeansMethodologyReviewActor: false as const,
      pieOperationalPolicyMeansMethodologyEvidencePolicy: false as const,
      legacyReviewedScalarMeansActorOrPolicyPrecedent: false as const,
      actorOrPolicyDefinitionMeansDecisionAuthority: false as const,
      reviewDecisionMeansMetricBinding: false as const,
      reviewDecisionMeansThreshold: false as const,
      reviewDecisionMeansCriterionState: false as const,
      reviewDecisionMeansClaim: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'governed_methodology_review_actor_and_evidence_policy_materialization' as const,
  });

  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126(
  value: FiveOfficerIntakeMethodologyReviewActorEvidencePolicyDefinitionFR126V1,
): void {
  if (!ISSUED.has(value)) fail('actor/evidence-policy definition artifact was not issued by FR-126.');
  if (
    value.authorityState !== 'methodology_review_actor_and_evidence_policy_contracts_established_no_governed_definitions' ||
    value.currentGovernance.actorDefinitionCount !== 0 ||
    value.currentGovernance.evidencePolicyDefinitionCount !== 0 ||
    value.currentGovernance.governedAuthorityActorRef !== null ||
    value.currentGovernance.governedReviewEvidencePolicyRef !== null ||
    value.currentGovernance.admittedReviewEvidenceRefs.length !== 0 ||
    value.admission.governedActorDefinitionPresent !== false ||
    value.admission.governedEvidencePolicyDefinitionPresent !== false ||
    value.admission.decisionMaterializationAuthorized !== false ||
    value.admission.decisionRecordIssued !== false ||
    value.admission.reviewedPromotionAuthorized !== false ||
    value.execution.authorityActorDefinitionsPersisted !== 0 ||
    value.execution.reviewEvidencePolicyDefinitionsPersisted !== 0 ||
    value.execution.methodologyReviewDecisionRecordsIssued !== 0 ||
    value.execution.reviewedMethodologyDefinitionsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.nextFrontier !== 'governed_methodology_review_actor_and_evidence_policy_materialization'
  ) fail('issued actor/evidence-policy definition artifact drift.');
}
