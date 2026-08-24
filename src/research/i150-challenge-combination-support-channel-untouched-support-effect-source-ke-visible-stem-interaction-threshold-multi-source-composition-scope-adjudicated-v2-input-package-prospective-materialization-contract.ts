import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I149_REQUIRED_V2_PACKAGE_COMPONENTS,
  I149_TARGET_INPUT_PACKAGE_VERSION,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport,
  type I149RequiredV2PackageComponent,
} from './i149-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudication-outcome-registration-new-input-package-materialization-readiness-review.js';

export const I150_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudicated-v2-input-package-prospective-materialization-contract-v1';

export const I150_V2_MATERIALIZATION_RULE_IDS = Object.freeze([
  'BIND_EXACT_I143_V1_SOURCE_PACKAGE',
  'BIND_EXACT_I148_SCOPE_ADJUDICATION_ARTIFACT',
  'PRESERVE_EXACT_FROZEN_V1_CANDIDATE_SET',
  'GENERATE_DETERMINISTIC_NEW_V2_PACKAGE_IDENTITY',
  'PRESERVE_V1_PACKAGE_IMMUTABILITY',
  'PRESERVE_ORIGINAL_EVIDENCE_BINDINGS_FOR_AUDIT',
  'PRESERVE_ORIGINAL_REQUIREMENT_OWNERSHIP_AS_NON_SATISFACTION_BINDINGS',
  'REGISTER_ALL_SIX_I148_SCOPE_RESULTS',
  'RETAIN_SCOPE_REJECTED_EVIDENCE_FOR_AUDIT_BUT_EXCLUDE_SCOPE_DEPENDENT_COVERAGE',
  'CARRY_SIX_PROVENANCE_INPUTS_UNRESOLVED',
  'CARRY_THREE_SEMANTIC_BRIDGE_INPUTS_UNRESOLVED',
  'CARRY_TWO_CONTRADICTION_INPUTS_UNRESOLVED',
  'REGISTER_V2_AS_NOT_EVALUATED_WITHOUT_EVALUATION_AUTHORIZATION',
] as const);

export type I150V2MaterializationRuleId = (typeof I150_V2_MATERIALIZATION_RULE_IDS)[number];

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport {
  contractId: string;
  contractVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT'
    | 'I149_V2_PACKAGE_MATERIALIZATION_READINESS_INVALID';
  decision:
    | 'EXACT_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_RULES_FROZEN_NO_PACKAGE_CREATED_NO_EVALUATION_AUTHORIZED'
    | 'V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_NOT_AUTHORIZED';
  upstreamI149ReviewId: string;
  upstreamI148AdjudicationRecordId: string | null;
  upstreamI143RecordId: string | null;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  sourceInputPackageVersion: 'v1-input-package';
  sourceInputPackageId: string | null;
  targetInputPackageVersion: typeof I149_TARGET_INPUT_PACKAGE_VERSION;
  targetInputPackageStateWhenMaterialized: 'REGISTERED_NOT_EVALUATED';
  exactI149ReadinessAccepted: boolean;
  requiredV2PackageComponents: readonly I149RequiredV2PackageComponent[];
  requiredV2PackageComponentCount: 10;
  materializationRuleIds: readonly I150V2MaterializationRuleId[];
  materializationRuleCount: 13;
  sourceV1PackageReferenceRequired: true;
  sourceV1PackageMustRemainImmutable: true;
  exactI148AdjudicationReferenceRequired: true;
  frozenV1CandidateSetMustRemainExact: true;
  targetV2PackageIdentityMustBeNew: true;
  targetV2PackageIdentityMustBeDeterministic: true;
  originalEvidenceBindingsMustRemainAuditable: true;
  originalRequirementOwnershipMustRemainNonSatisfactionBindings: true;
  allSixScopeAdjudicationResultsMustBeRegistered: true;
  expectedScopeCompatibleOnlyCount: 5;
  expectedScopeRejectedCount: 1;
  scopeRejectedEvidenceMustRemainAuditable: true;
  scopeRejectedEvidenceMustBeIneligibleForScopeDependentCoverage: true;
  scopeCompatibleEvidenceDoesNotEqualRequirementSatisfaction: true;
  scopeCompatibleEvidenceDoesNotEqualBinaryEligibility: true;
  provenanceInputsRequiredUnresolvedCount: 6;
  semanticBridgeInputsRequiredUnresolvedCount: 3;
  contradictionInputsRequiredUnresolvedCount: 2;
  packageMaterializationAuthorizedByThisGate: boolean;
  packageRegistrationAuthorizedByThisGate: boolean;
  packageCreatedByThisGate: false;
  packageRegisteredByThisGate: false;
  sourceV1PackageMutatedByThisGate: false;
  requirementCoverageRecomputedByThisGate: false;
  requirementSatisfactionAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  consumedI145EvaluationAuthorizationReusable: false;
  newEvaluationAuthorizationRequiredAfterV2Registration: true;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI149Accepted(
  i149: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport,
): boolean {
  const exactComponents =
    i149.requiredV2PackageComponents.length === I149_REQUIRED_V2_PACKAGE_COMPONENTS.length &&
    i149.requiredV2PackageComponents.every(
      (component, index) => component === I149_REQUIRED_V2_PACKAGE_COMPONENTS[index],
    );

  return (
    i149.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW' &&
    i149.decision ===
      'SCOPE_ADJUDICATION_OUTCOME_READY_FOR_SEPARATE_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT_NO_PACKAGE_CREATED_NO_REEVALUATION' &&
    i149.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i149.policyVersion === 'v1-definition' &&
    i149.adoptionVersion === 'v1-adoption' &&
    i149.adoptionId !== null &&
    i149.candidateSetVersion === 'v1-candidate-set' &&
    i149.candidateSetId !== null &&
    i149.sourceInputPackageVersion === 'v1-input-package' &&
    i149.sourceInputPackageId !== null &&
    i149.targetInputPackageVersion === I149_TARGET_INPUT_PACKAGE_VERSION &&
    i149.targetInputPackageId === null &&
    i149.exactI148ScopeAdjudicationAccepted &&
    i149.exactI143SourcePackageAccepted &&
    i149.adjudicationAndSourcePackageIdentityMatch &&
    exactComponents &&
    i149.requiredV2PackageComponentCount === 10 &&
    i149.exactFiveScopeCompatibleOnlyResultsPresent &&
    i149.exactOneGenericForceScopeRejectionPresent &&
    i149.allSixScopeResultsRemainNonSatisfactionFindings &&
    i149.rejectedEvidenceRetainedForAuditInFuturePackage &&
    i149.rejectedEvidenceExcludedFromScopeDependentCoverageInFuturePackage &&
    i149.frozenCandidateSetMustRemainUnchangedInFuturePackage &&
    i149.originalEvidenceBindingsMustRemainAuditableInFuturePackage &&
    i149.originalRequirementOwnershipMustRemainNonSatisfactionBindingsInFuturePackage &&
    i149.provenanceInputCountToCarryForward === 6 &&
    i149.provenanceInputsMustRemainUnresolved &&
    i149.semanticBridgeInputCountToCarryForward === 3 &&
    i149.semanticBridgeInputsMustRemainUnresolved &&
    i149.contradictionInputCountToCarryForward === 2 &&
    i149.contradictionInputsMustRemainUnresolved &&
    i149.sourceV1PackageImmutable &&
    i149.sourceV1PackageMutatedByThisGate === false &&
    i149.scopeAdjudicationArtifactRegisteredByThisGate === false &&
    i149.targetV2PackageCreatedByThisGate === false &&
    i149.targetV2PackageRegisteredByThisGate === false &&
    i149.requirementCoverageRecomputedByThisGate === false &&
    i149.requirementSatisfactionAdjudicatedByThisGate === false &&
    i149.candidateSetReevaluationAuthorizedByThisGate === false &&
    i149.candidateSetReevaluationPerformedByThisGate === false &&
    i149.consumedI145EvaluationAuthorizationReusable === false &&
    i149.newEvaluationAuthorizationRequiredAfterV2Registration &&
    i149.v2PackageMaterializationReadinessEstablished &&
    i149.separateV2ProspectiveMaterializationContractMayProceed &&
    i149.actualCompositionPerformedByThisGate === false &&
    i149.multiSourceCompositionAuthorized === false &&
    i149.authorityAcquiredByThisGate === false &&
    i149.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i149.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport, 'contractId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport {
  return {
    contractId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_v2_materialization_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(
  i149: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport {
  const accepted = exactI149Accepted(i149);
  const common = {
    contractVersion:
      I150_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT_VERSION,
    upstreamI149ReviewId: i149.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    sourceInputPackageVersion: 'v1-input-package' as const,
    targetInputPackageVersion: I149_TARGET_INPUT_PACKAGE_VERSION,
    targetInputPackageStateWhenMaterialized: 'REGISTERED_NOT_EVALUATED' as const,
    requiredV2PackageComponents: I149_REQUIRED_V2_PACKAGE_COMPONENTS,
    requiredV2PackageComponentCount: 10 as const,
    materializationRuleIds: I150_V2_MATERIALIZATION_RULE_IDS,
    materializationRuleCount: 13 as const,
    sourceV1PackageReferenceRequired: true as const,
    sourceV1PackageMustRemainImmutable: true as const,
    exactI148AdjudicationReferenceRequired: true as const,
    frozenV1CandidateSetMustRemainExact: true as const,
    targetV2PackageIdentityMustBeNew: true as const,
    targetV2PackageIdentityMustBeDeterministic: true as const,
    originalEvidenceBindingsMustRemainAuditable: true as const,
    originalRequirementOwnershipMustRemainNonSatisfactionBindings: true as const,
    allSixScopeAdjudicationResultsMustBeRegistered: true as const,
    expectedScopeCompatibleOnlyCount: 5 as const,
    expectedScopeRejectedCount: 1 as const,
    scopeRejectedEvidenceMustRemainAuditable: true as const,
    scopeRejectedEvidenceMustBeIneligibleForScopeDependentCoverage: true as const,
    scopeCompatibleEvidenceDoesNotEqualRequirementSatisfaction: true as const,
    scopeCompatibleEvidenceDoesNotEqualBinaryEligibility: true as const,
    provenanceInputsRequiredUnresolvedCount: 6 as const,
    semanticBridgeInputsRequiredUnresolvedCount: 3 as const,
    contradictionInputsRequiredUnresolvedCount: 2 as const,
    packageCreatedByThisGate: false as const,
    packageRegisteredByThisGate: false as const,
    sourceV1PackageMutatedByThisGate: false as const,
    requirementCoverageRecomputedByThisGate: false as const,
    requirementSatisfactionAdjudicatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    consumedI145EvaluationAuthorizationReusable: false as const,
    newEvaluationAuthorizationRequiredAfterV2Registration: true as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
    actualCompositionPerformedByThisGate: false as const,
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

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I149_V2_PACKAGE_MATERIALIZATION_READINESS_INVALID',
      decision: 'V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_NOT_AUTHORIZED',
      upstreamI148AdjudicationRecordId: null,
      upstreamI143RecordId: null,
      adoptionId: null,
      candidateSetId: null,
      sourceInputPackageId: null,
      exactI149ReadinessAccepted: false,
      packageMaterializationAuthorizedByThisGate: false,
      packageRegistrationAuthorizedByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
      notes: ['I150 fails closed unless the exact I149 v2 materialization readiness review remains intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT',
    decision:
      'EXACT_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_RULES_FROZEN_NO_PACKAGE_CREATED_NO_EVALUATION_AUTHORIZED',
    upstreamI148AdjudicationRecordId: i149.upstreamI148AdjudicationRecordId,
    upstreamI143RecordId: i149.upstreamI143RecordId,
    adoptionId: i149.adoptionId,
    candidateSetId: i149.candidateSetId,
    sourceInputPackageId: i149.sourceInputPackageId,
    exactI149ReadinessAccepted: true,
    packageMaterializationAuthorizedByThisGate: true,
    packageRegistrationAuthorizedByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD',
    notes: [
      'I150 prospectively freezes the exact rules under which a later gate may create and register one new deterministic v2-input-package.',
      'Materialization authorization is limited to constructing the governed package. It does not authorize candidate-set evaluation or requirement-satisfaction recomputation.',
      'The future package must retain the immutable v1 source reference, exact I148 artifact reference, exact frozen candidate set, all original evidence for audit, all six scope outcomes, and unresolved provenance/semantic-bridge/contradiction inputs.',
    ],
  });
}
