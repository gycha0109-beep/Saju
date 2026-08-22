import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport } from './i137-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-adopted-policy-candidate-set-evaluation-authorization-readiness-review.js';

export const I138_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-input-registration-contract-v1';

export const I138_INPUT_ARTIFACT_SCHEMA_IDS = [
  'CANDIDATE_SET_INPUT_MANIFEST',
  'EVIDENCE_REBINDING_RECORDS',
  'REQUIREMENT_OWNERSHIP_BINDINGS',
  'WITNESS_IDENTITY_BINDINGS',
  'SCOPE_COMPATIBILITY_ADJUDICATION_INPUTS',
  'PROVENANCE_INDEPENDENCE_ADJUDICATION_INPUTS',
  'SEMANTIC_BRIDGE_ADJUDICATION_INPUTS',
  'CONTRADICTION_ADJUDICATION_INPUTS',
] as const;

export type I138InputArtifactSchemaId = (typeof I138_INPUT_ARTIFACT_SCHEMA_IDS)[number];

export interface I138InputArtifactSchema {
  artifactId: I138InputArtifactSchemaId;
  required: true;
  minimumFields: readonly string[];
  unresolvedStateAllowedAtRegistration: boolean;
  registrationMeaning: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport {
  contractId: string;
  contractVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT'
    | 'I137_READINESS_UNRESOLVED_OR_INVALID';
  decision:
    | 'CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT_FROZEN_NO_INPUT_PACKAGE_REGISTERED_NO_EVALUATION'
    | 'CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT_NOT_ESTABLISHED';
  upstreamI137ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  registrationVersion: 'v1-registration';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  contractTarget: 'ADOPTED_POLICY_BOUND_CANDIDATE_SET_EVALUATION_INPUT_PACKAGE';
  exactI137ReadinessAccepted: boolean;
  inputArtifactSchemas: readonly I138InputArtifactSchema[];
  inputArtifactSchemaCount: 8;
  allInputArtifactsMandatoryForPackageRegistration: true;
  candidateManifestMustBindExactAdoption: true;
  candidateManifestMustVersionCandidateSet: true;
  everyEvidenceItemMustRebindExactCandidateSourceWitnessAndLocator: true;
  everyI118RequirementMustHaveExplicitOwnershipBindings: true;
  implicitRequirementBorrowingForbidden: true;
  witnessIdentityMustBeStableAndReproducible: true;
  scopeCompatibilityMustBeExplicitlyAdjudicatedPerEvidenceUse: true;
  provenanceIndependenceMustBeExplicitlyAdjudicatedWithoutNumericWeighting: true;
  semanticBridgeInputsMayRemainExplicitlyUnresolvedAtRegistration: true;
  contradictionInputsMayRemainExplicitlyUnresolvedAtRegistration: true;
  unresolvedSemanticBridgeMustFailClosedDuringEvaluation: true;
  unresolvedContradictionMustFailClosedDuringEvaluation: true;
  exampleToGeneralRulePromotionWithoutAuthorityForbidden: true;
  priorI126CoverageMayOnlyEnterThroughExplicitRebinding: true;
  priorI128DiscoveryMayOnlyEnterThroughExplicitRebinding: true;
  noGrandfatheringByReferenceToPriorGate: true;
  inputPackageRegistrationRequiresAllEightArtifactClasses: true;
  inputPackageRegistrationDoesNotEqualEvaluationAuthorization: true;
  inputPackageRegistrationDoesNotEqualCompositionAuthorization: true;
  inputPackageRegistrationDoesNotEqualThresholdAuthority: true;
  adoptedPolicyNineStepAlgorithmRemainsBinding: true;
  contractFrozenByThisGate: boolean;
  inputPackageRegisteredByThisGate: false;
  candidateSetManifestMaterializedByThisGate: false;
  evidenceRebindingPerformedByThisGate: false;
  adjudicationInputsMaterializedByThisGate: false;
  policyExecutableByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW';
  notes: readonly string[];
}

const INPUT_SCHEMAS: readonly I138InputArtifactSchema[] = [
  {
    artifactId: 'CANDIDATE_SET_INPUT_MANIFEST',
    required: true,
    minimumFields: ['candidateSetId', 'candidateSetVersion', 'adoptionId', 'candidateIds'],
    unresolvedStateAllowedAtRegistration: false,
    registrationMeaning: 'Declares the complete candidate set and binds it prospectively to the exact adopted policy.',
  },
  {
    artifactId: 'EVIDENCE_REBINDING_RECORDS',
    required: true,
    minimumFields: ['evidenceId', 'candidateId', 'sourceId', 'witnessId', 'locator', 'i118RequirementIds'],
    unresolvedStateAllowedAtRegistration: false,
    registrationMeaning: 'Rebinds every reused or new evidence item to exact candidate, source, witness, locator, and I118 requirement claims.',
  },
  {
    artifactId: 'REQUIREMENT_OWNERSHIP_BINDINGS',
    required: true,
    minimumFields: ['i118RequirementId', 'owningEvidenceIds', 'ownershipBasis'],
    unresolvedStateAllowedAtRegistration: false,
    registrationMeaning: 'Declares explicit evidence ownership for every claimed I118 requirement without implicit borrowing.',
  },
  {
    artifactId: 'WITNESS_IDENTITY_BINDINGS',
    required: true,
    minimumFields: ['witnessId', 'sourceId', 'stableLocator', 'identityResolutionBasis'],
    unresolvedStateAllowedAtRegistration: false,
    registrationMeaning: 'Binds evidence to stable reproducible witnesses and normalized source identity.',
  },
  {
    artifactId: 'SCOPE_COMPATIBILITY_ADJUDICATION_INPUTS',
    required: true,
    minimumFields: ['evidenceId', 'targetScope', 'positionClass', 'compatibilityState', 'basis'],
    unresolvedStateAllowedAtRegistration: true,
    registrationMeaning: 'Records explicit visible-stem and position-class scope compatibility inputs; unresolved states later fail closed.',
  },
  {
    artifactId: 'PROVENANCE_INDEPENDENCE_ADJUDICATION_INPUTS',
    required: true,
    minimumFields: ['evidenceId', 'provenanceIdentity', 'independenceState', 'dependencyLinks', 'basis'],
    unresolvedStateAllowedAtRegistration: true,
    registrationMeaning: 'Records provenance independence without source counts, majority vote, or numeric weights.',
  },
  {
    artifactId: 'SEMANTIC_BRIDGE_ADJUDICATION_INPUTS',
    required: true,
    minimumFields: ['bridgeId', 'fromTerm', 'toTerm', 'scope', 'bridgeState', 'authorityEvidenceIds'],
    unresolvedStateAllowedAtRegistration: true,
    registrationMeaning: 'Records explicit semantic bridge claims or explicit unresolved state; lexical similarity alone is never a bridge.',
  },
  {
    artifactId: 'CONTRADICTION_ADJUDICATION_INPUTS',
    required: true,
    minimumFields: ['contradictionId', 'evidenceIds', 'conflictDescription', 'resolutionState', 'precedenceBasis'],
    unresolvedStateAllowedAtRegistration: true,
    registrationMeaning: 'Records material contradictions and governed resolution or explicit unresolved state.',
  },
] as const;

function exactI137Accepted(
  i137: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport,
): boolean {
  return (
    i137.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW' &&
    i137.decision ===
      'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_NOT_READY_INPUT_REBINDING_AND_ADJUDICATION_PACKAGE_REQUIRED' &&
    i137.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i137.policyVersion === 'v1-definition' &&
    i137.registrationVersion === 'v1-registration' &&
    i137.adoptionVersion === 'v1-adoption' &&
    i137.adoptionId !== null &&
    i137.adoptionStateObserved === 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED' &&
    i137.exactI136AdoptionAccepted &&
    i137.adoptedPolicyIdentityAccepted &&
    i137.adoptedPolicyDefinitionImmutable &&
    i137.candidateSetEvaluationRequiresExplicitInputPackage &&
    i137.priorEvidenceCannotBeEvaluatedWithoutRebinding &&
    i137.missingInputArtifactCount === 8 &&
    i137.allMissingInputArtifactsMandatory &&
    i137.candidateSetEvaluationAuthorizationReady === false &&
    i137.candidateSetEvaluationAuthorizationContractMayProceed === false &&
    i137.inputRebindingAndRegistrationContractRequiredFirst &&
    i137.policyAdoptionRemainsValid &&
    i137.candidateSetEvaluationAuthorizedByThisGate === false &&
    i137.candidateSetEvaluationPerformedByThisGate === false &&
    i137.actualCompositionPerformedByThisGate === false &&
    i137.authorityAcquiredByThisGate === false &&
    i137.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i137.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport, 'contractId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport {
  return {
    contractId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_candidate_input_registration_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(
  i137: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport {
  const exactAccepted = exactI137Accepted(i137);
  const common = {
    contractVersion:
      I138_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT_VERSION,
    upstreamI137ReviewId: i137.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    registrationVersion: 'v1-registration' as const,
    adoptionVersion: 'v1-adoption' as const,
    contractTarget: 'ADOPTED_POLICY_BOUND_CANDIDATE_SET_EVALUATION_INPUT_PACKAGE' as const,
    inputArtifactSchemas: INPUT_SCHEMAS,
    inputArtifactSchemaCount: 8 as const,
    allInputArtifactsMandatoryForPackageRegistration: true as const,
    candidateManifestMustBindExactAdoption: true as const,
    candidateManifestMustVersionCandidateSet: true as const,
    everyEvidenceItemMustRebindExactCandidateSourceWitnessAndLocator: true as const,
    everyI118RequirementMustHaveExplicitOwnershipBindings: true as const,
    implicitRequirementBorrowingForbidden: true as const,
    witnessIdentityMustBeStableAndReproducible: true as const,
    scopeCompatibilityMustBeExplicitlyAdjudicatedPerEvidenceUse: true as const,
    provenanceIndependenceMustBeExplicitlyAdjudicatedWithoutNumericWeighting: true as const,
    semanticBridgeInputsMayRemainExplicitlyUnresolvedAtRegistration: true as const,
    contradictionInputsMayRemainExplicitlyUnresolvedAtRegistration: true as const,
    unresolvedSemanticBridgeMustFailClosedDuringEvaluation: true as const,
    unresolvedContradictionMustFailClosedDuringEvaluation: true as const,
    exampleToGeneralRulePromotionWithoutAuthorityForbidden: true as const,
    priorI126CoverageMayOnlyEnterThroughExplicitRebinding: true as const,
    priorI128DiscoveryMayOnlyEnterThroughExplicitRebinding: true as const,
    noGrandfatheringByReferenceToPriorGate: true as const,
    inputPackageRegistrationRequiresAllEightArtifactClasses: true as const,
    inputPackageRegistrationDoesNotEqualEvaluationAuthorization: true as const,
    inputPackageRegistrationDoesNotEqualCompositionAuthorization: true as const,
    inputPackageRegistrationDoesNotEqualThresholdAuthority: true as const,
    adoptedPolicyNineStepAlgorithmRemainsBinding: true as const,
    inputPackageRegisteredByThisGate: false as const,
    candidateSetManifestMaterializedByThisGate: false as const,
    evidenceRebindingPerformedByThisGate: false as const,
    adjudicationInputsMaterializedByThisGate: false as const,
    policyExecutableByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
  };

  if (!exactAccepted) {
    return finalized({
      ...common,
      status: 'I137_READINESS_UNRESOLVED_OR_INVALID',
      decision: 'CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT_NOT_ESTABLISHED',
      adoptionId: null,
      exactI137ReadinessAccepted: false,
      contractFrozenByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
      notes: ['I138 fails closed unless the exact I137 not-ready result and adopted-policy boundary remain intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT',
    decision:
      'CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT_FROZEN_NO_INPUT_PACKAGE_REGISTERED_NO_EVALUATION',
    adoptionId: i137.adoptionId,
    exactI137ReadinessAccepted: true,
    contractFrozenByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    notes: [
      'I138 freezes the input-package schema and registration invariants but does not materialize or register a candidate set.',
      'Explicit unresolved scope, provenance, bridge, or contradiction states may be registered as inputs so the later adopted-policy algorithm can fail closed rather than hiding missing authority.',
      'No prior evidence enters the evaluation set merely by citing I126, I128, or another prior gate; every evidence item requires explicit rebinding.',
    ],
  });
}
