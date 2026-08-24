import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I149_REQUIRED_V2_PACKAGE_COMPONENTS,
  I149_TARGET_INPUT_PACKAGE_VERSION,
  type I149RequiredV2PackageComponent,
} from './i149-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudication-outcome-registration-new-input-package-materialization-readiness-review.js';
import {
  I150_V2_MATERIALIZATION_RULE_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport,
} from './i150-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudicated-v2-input-package-prospective-materialization-contract.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  I143ContradictionInput,
  I143EvidenceRebindingRecord,
  I143ProvenanceIndependenceInput,
  I143RequirementOwnershipBinding,
  I143SemanticBridgeInput,
} from './i143-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-record.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
  I148ScopeCompatibilityAdjudicationResult,
} from './i148-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-compatibility-adjudication-record.js';

export const I151_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudicated-v2-input-package-materialization-record-v1';

export interface I151SourceV1PackageIdentityReference {
  recordId: string;
  inputPackageId: string;
  inputPackageVersion: 'v1-input-package';
  immutable: true;
}

export interface I151FrozenV1CandidateSetReference {
  candidateSetId: string;
  candidateSetVersion: 'v1-candidate-set';
  adoptionId: string;
  candidateIds: readonly string[];
  candidateCount: 6;
  frozen: true;
}

export interface I151ScopeAdjudicationArtifactReference {
  adjudicationRecordId: string;
  adjudicationRecordVersion: string;
  sourceInputPackageId: string;
}

export interface I151ScopeCoverageEligibilityFlag {
  evidenceId: string;
  candidateId: string;
  adjudicationState: I148ScopeCompatibilityAdjudicationResult['adjudicationState'];
  scopeEligibleForRequirementCoverage: boolean;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport {
  recordId: string;
  recordVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD'
    | 'I150_CONTRACT_OR_REGISTERED_SOURCE_ARTIFACTS_INVALID';
  decision:
    | 'DETERMINISTIC_V2_INPUT_PACKAGE_MATERIALIZED_AND_REGISTERED_WITH_SCOPE_RESULTS_AND_REMAINING_INPUTS_UNRESOLVED_NO_EVALUATION'
    | 'V2_INPUT_PACKAGE_MATERIALIZATION_NOT_PERFORMED';
  upstreamI150ContractId: string;
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
  targetInputPackageId: string | null;
  targetInputPackageState: 'REGISTERED_NOT_EVALUATED' | 'NOT_REGISTERED';
  exactI150ContractAccepted: boolean;
  exactI148ScopeAdjudicationAccepted: boolean;
  exactI143SourcePackageAccepted: boolean;
  allUpstreamIdentitiesMatch: boolean;
  materializedComponentIds: readonly I149RequiredV2PackageComponent[];
  materializedComponentCount: number;
  sourceV1PackageReference: I151SourceV1PackageIdentityReference | null;
  frozenV1CandidateSetReference: I151FrozenV1CandidateSetReference | null;
  originalEvidenceRebindingRecords: readonly I143EvidenceRebindingRecord[];
  originalRequirementOwnershipBindings: readonly I143RequirementOwnershipBinding[];
  scopeAdjudicationArtifactReference: I151ScopeAdjudicationArtifactReference | null;
  scopeAdjudicationResults: readonly I148ScopeCompatibilityAdjudicationResult[];
  scopeCoverageEligibilityFlags: readonly I151ScopeCoverageEligibilityFlag[];
  originalProvenanceIndependenceInputs: readonly I143ProvenanceIndependenceInput[];
  originalSemanticBridgeInputs: readonly I143SemanticBridgeInput[];
  originalContradictionInputs: readonly I143ContradictionInput[];
  allTenRequiredComponentsMaterialized: boolean;
  sourceV1PackagePreservedImmutable: true;
  sourceV1PackageMutatedByThisGate: false;
  frozenV1CandidateSetPreservedExact: boolean;
  originalEvidenceBindingsPreservedForAudit: boolean;
  originalRequirementOwnershipPreservedAsNonSatisfactionBindings: boolean;
  scopeAdjudicationResultCount: number;
  scopeCompatibleOnlyCount: number;
  scopeRejectedCount: number;
  scopeEligibilityFlagCount: number;
  scopeRejectedEvidenceRetainedForAudit: boolean;
  scopeRejectedEvidenceExcludedFromScopeDependentCoverage: boolean;
  requirementCoverageRecomputedByThisGate: false;
  requirementSatisfactionAdjudicatedByThisGate: false;
  provenanceInputCount: number;
  provenanceUnresolvedCount: number;
  semanticBridgeInputCount: number;
  semanticBridgeUnresolvedCount: number;
  contradictionInputCount: number;
  contradictionUnresolvedCount: number;
  remainingUnresolvedInputsPreservedWithoutInference: boolean;
  targetPackageIdentityDeterministic: boolean;
  targetPackageIdentityDistinctFromSourceV1: boolean;
  targetPackageCreatedByThisGate: boolean;
  targetPackageRegisteredByThisGate: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT';
  notes: readonly string[];
}

function exactOrdered<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function exactI150Accepted(
  i150: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport,
): boolean {
  return (
    i150.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT' &&
    i150.decision ===
      'EXACT_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_RULES_FROZEN_NO_PACKAGE_CREATED_NO_EVALUATION_AUTHORIZED' &&
    i150.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i150.policyVersion === 'v1-definition' &&
    i150.adoptionVersion === 'v1-adoption' &&
    i150.adoptionId !== null &&
    i150.candidateSetVersion === 'v1-candidate-set' &&
    i150.candidateSetId !== null &&
    i150.sourceInputPackageVersion === 'v1-input-package' &&
    i150.sourceInputPackageId !== null &&
    i150.targetInputPackageVersion === I149_TARGET_INPUT_PACKAGE_VERSION &&
    i150.targetInputPackageStateWhenMaterialized === 'REGISTERED_NOT_EVALUATED' &&
    i150.exactI149ReadinessAccepted &&
    exactOrdered(i150.requiredV2PackageComponents, I149_REQUIRED_V2_PACKAGE_COMPONENTS) &&
    i150.requiredV2PackageComponentCount === 10 &&
    exactOrdered(i150.materializationRuleIds, I150_V2_MATERIALIZATION_RULE_IDS) &&
    i150.materializationRuleCount === 13 &&
    i150.sourceV1PackageReferenceRequired &&
    i150.sourceV1PackageMustRemainImmutable &&
    i150.exactI148AdjudicationReferenceRequired &&
    i150.frozenV1CandidateSetMustRemainExact &&
    i150.targetV2PackageIdentityMustBeNew &&
    i150.targetV2PackageIdentityMustBeDeterministic &&
    i150.originalEvidenceBindingsMustRemainAuditable &&
    i150.originalRequirementOwnershipMustRemainNonSatisfactionBindings &&
    i150.allSixScopeAdjudicationResultsMustBeRegistered &&
    i150.expectedScopeCompatibleOnlyCount === 5 &&
    i150.expectedScopeRejectedCount === 1 &&
    i150.scopeRejectedEvidenceMustRemainAuditable &&
    i150.scopeRejectedEvidenceMustBeIneligibleForScopeDependentCoverage &&
    i150.scopeCompatibleEvidenceDoesNotEqualRequirementSatisfaction &&
    i150.scopeCompatibleEvidenceDoesNotEqualBinaryEligibility &&
    i150.provenanceInputsRequiredUnresolvedCount === 6 &&
    i150.semanticBridgeInputsRequiredUnresolvedCount === 3 &&
    i150.contradictionInputsRequiredUnresolvedCount === 2 &&
    i150.packageMaterializationAuthorizedByThisGate &&
    i150.packageRegistrationAuthorizedByThisGate &&
    i150.packageCreatedByThisGate === false &&
    i150.packageRegisteredByThisGate === false &&
    i150.sourceV1PackageMutatedByThisGate === false &&
    i150.requirementCoverageRecomputedByThisGate === false &&
    i150.requirementSatisfactionAdjudicatedByThisGate === false &&
    i150.provenanceIndependenceAdjudicatedByThisGate === false &&
    i150.semanticBridgeAdjudicatedByThisGate === false &&
    i150.contradictionAdjudicatedByThisGate === false &&
    i150.candidateSetEvaluationAuthorizedByThisGate === false &&
    i150.candidateSetEvaluationPerformedByThisGate === false &&
    i150.consumedI145EvaluationAuthorizationReusable === false &&
    i150.newEvaluationAuthorizationRequiredAfterV2Registration &&
    i150.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i150.productionPolicyExecutionAuthorized === false &&
    i150.actualCompositionPerformedByThisGate === false &&
    i150.multiSourceCompositionAuthorized === false &&
    i150.authorityAcquiredByThisGate === false &&
    i150.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i150.thresholdRuleCreatedByThisGate === false &&
    i150.damageEvaluationAuthorized === false &&
    i150.classificationAuthorized === false &&
    i150.numericScoringAuthorized === false &&
    i150.hiddenStemInteractionEligibilityGapRemains &&
    i150.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i150.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD'
  );
}

function exactI143Accepted(
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  if (i143.candidateManifest === null) return false;

  const candidateIdsUnique = new Set(i143.candidateManifest.candidateIds).size === 6;
  const evidenceIds = new Set(i143.evidenceRebindingRecords.map((record) => record.evidenceId));

  return (
    i143.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD' &&
    i143.decision ===
      'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION' &&
    i143.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i143.policyVersion === 'v1-definition' &&
    i143.adoptionVersion === 'v1-adoption' &&
    i143.adoptionId !== null &&
    i143.candidateSetVersion === 'v1-candidate-set' &&
    i143.candidateSetId !== null &&
    i143.inputPackageVersion === 'v1-input-package' &&
    i143.inputPackageId !== null &&
    i143.inputPackageState === 'REGISTERED_NOT_EVALUATED' &&
    i143.candidateManifest.candidateSetId === i143.candidateSetId &&
    i143.candidateManifest.candidateSetVersion === 'v1-candidate-set' &&
    i143.candidateManifest.adoptionId === i143.adoptionId &&
    i143.candidateManifest.candidateCount === 6 &&
    i143.candidateManifest.candidateIds.length === 6 &&
    candidateIdsUnique &&
    i143.candidateManifest.frozen &&
    i143.evidenceRebindingRecords.length === 6 &&
    i143.evidenceRebindingRecordCount === 6 &&
    evidenceIds.size === 6 &&
    i143.evidenceRebindingRecords.every(
      (record) =>
        record.bindingState === 'REGISTERED_INPUT_NOT_ADJUDICATED' &&
        i143.candidateManifest?.candidateIds.includes(record.candidateId) === true,
    ) &&
    i143.requirementOwnershipBindings.length === 6 &&
    i143.requirementOwnershipBindingCount === 6 &&
    i143.requirementOwnershipBindings.every(
      (binding) =>
        binding.satisfactionFindingMade === false &&
        binding.owningEvidenceIds.length > 0 &&
        binding.owningEvidenceIds.every((evidenceId) => evidenceIds.has(evidenceId)),
    ) &&
    i143.provenanceIndependenceInputs.length === 6 &&
    i143.provenanceIndependenceUnresolvedCount === 6 &&
    i143.provenanceIndependenceInputs.every((input) => input.independenceState === 'UNRESOLVED') &&
    i143.semanticBridgeInputs.length === 3 &&
    i143.semanticBridgeUnresolvedCount === 3 &&
    i143.semanticBridgeInputs.every((input) => input.bridgeState === 'UNRESOLVED') &&
    i143.contradictionInputs.length === 2 &&
    i143.contradictionUnresolvedCount === 2 &&
    i143.contradictionInputs.every((input) => input.resolutionState === 'UNRESOLVED') &&
    i143.allEightArtifactClassesMaterialized &&
    i143.allSixI118RequirementsHaveExplicitOwnershipBindings &&
    i143.everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator &&
    i143.unresolvedStatesPreservedWithoutInference &&
    i143.implicitRequirementBorrowingPerformed === false &&
    i143.exampleToGeneralRulePromotionPerformed === false &&
    i143.numericWeightingOrMajorityVotePerformed === false &&
    i143.inputPackageRegisteredByThisGate &&
    i143.requirementCoverageAdjudicatedByThisGate === false &&
    i143.scopeCompatibilityAdjudicatedByThisGate === false &&
    i143.provenanceIndependenceAdjudicatedByThisGate === false &&
    i143.semanticBridgeAdjudicatedByThisGate === false &&
    i143.contradictionAdjudicatedByThisGate === false &&
    i143.candidateSetEvaluationAuthorizedByThisGate === false &&
    i143.candidateSetEvaluationPerformedByThisGate === false &&
    i143.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i143.actualCompositionPerformedByThisGate === false &&
    i143.multiSourceCompositionAuthorized === false &&
    i143.authorityAcquiredByThisGate === false &&
    i143.visibleStemBinaryEffectiveInteractionEligibilityResolved === false
  );
}

function exactI148Accepted(
  i148: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  const evidenceById = new Map(i143.evidenceRebindingRecords.map((record) => [record.evidenceId, record]));
  const resultIdsUnique = new Set(i148.adjudicationResults.map((result) => result.evidenceId)).size === 6;
  const compatible = i148.adjudicationResults.filter(
    (result) =>
      result.adjudicationState === 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING' &&
      result.inputPositionClass === 'VISIBLE_STEM_POSITION_CLASS' &&
      result.scopeEligibleForLaterRequirementCoverage,
  );
  const rejected = i148.adjudicationResults.filter(
    (result) =>
      result.adjudicationState === 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT' &&
      result.inputPositionClass === 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT' &&
      result.scopeEligibleForLaterRequirementCoverage === false &&
      result.reason ===
        'GENERIC_VISIBLE_STEM_FORCE_CONTEXT_CANNOT_SUBSTITUTE_FOR_VISIBLE_STEM_KE_BINARY_ELIGIBILITY',
  );

  return (
    i148.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD' &&
    i148.decision ===
      'FIVE_VISIBLE_STEM_SCOPE_INPUTS_COMPATIBLE_SCOPE_ONLY_ONE_GENERIC_FORCE_INPUT_REJECTED_NO_REQUIREMENT_SATISFACTION_NO_REEVALUATION' &&
    i148.policyId === i143.policyId &&
    i148.policyVersion === i143.policyVersion &&
    i148.adoptionVersion === i143.adoptionVersion &&
    i148.adoptionId === i143.adoptionId &&
    i148.candidateSetVersion === i143.candidateSetVersion &&
    i148.candidateSetId === i143.candidateSetId &&
    i148.sourceInputPackageVersion === i143.inputPackageVersion &&
    i148.sourceInputPackageId === i143.inputPackageId &&
    i148.upstreamI143RecordId === i143.recordId &&
    i148.adjudicationResults.length === 6 &&
    i148.adjudicationResultCount === 6 &&
    resultIdsUnique &&
    compatible.length === 5 &&
    rejected.length === 1 &&
    i148.compatibleScopeOnlyCount === 5 &&
    i148.rejectedScopeMismatchCount === 1 &&
    i148.unresolvedScopeCount === 0 &&
    i148.adjudicationResults.every((result) => {
      const evidence = evidenceById.get(result.evidenceId);
      return (
        evidence !== undefined &&
        result.candidateId === evidence.candidateId &&
        result.requirementSatisfactionFindingMade === false &&
        result.binaryEligibilityFindingMade === false &&
        result.semanticBridgeFindingMade === false &&
        result.contradictionResolutionMade === false
      );
    }) &&
    i148.scopeCompatibilityFullyAdjudicated &&
    i148.allAcceptedScopeResultsRemainNonSatisfactionFindings &&
    i148.genericForceSubstitutionRejected &&
    i148.qualitativeForceToBinaryEligibilitySubstitutionPerformed === false &&
    i148.hiddenStemAuthorityBorrowingPerformed === false &&
    i148.sourceInputPackageMutatedByThisGate === false &&
    i148.requirementCoverageRecomputedByThisGate === false &&
    i148.provenanceIndependenceAdjudicatedByThisGate === false &&
    i148.semanticBridgeAdjudicatedByThisGate === false &&
    i148.contradictionAdjudicatedByThisGate === false &&
    i148.candidateSetReevaluationAuthorizedByThisGate === false &&
    i148.candidateSetReevaluationPerformedByThisGate === false &&
    i148.actualCompositionPerformedByThisGate === false &&
    i148.multiSourceCompositionAuthorized === false &&
    i148.authorityAcquiredByThisGate === false &&
    i148.visibleStemBinaryEffectiveInteractionEligibilityResolved === false
  );
}

function identitiesMatch(
  i150: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport,
  i148: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  return (
    i150.upstreamI148AdjudicationRecordId === i148.adjudicationRecordId &&
    i150.upstreamI143RecordId === i143.recordId &&
    i148.upstreamI143RecordId === i143.recordId &&
    i150.policyId === i148.policyId &&
    i150.policyId === i143.policyId &&
    i150.policyVersion === i148.policyVersion &&
    i150.policyVersion === i143.policyVersion &&
    i150.adoptionId === i148.adoptionId &&
    i150.adoptionId === i143.adoptionId &&
    i150.candidateSetId === i148.candidateSetId &&
    i150.candidateSetId === i143.candidateSetId &&
    i150.sourceInputPackageId === i148.sourceInputPackageId &&
    i150.sourceInputPackageId === i143.inputPackageId
  );
}

function cloneEvidenceRecords(records: readonly I143EvidenceRebindingRecord[]): readonly I143EvidenceRebindingRecord[] {
  return Object.freeze(
    records.map((record) =>
      Object.freeze({ ...record, i118RequirementIds: Object.freeze([...record.i118RequirementIds]) }),
    ),
  );
}

function cloneOwnershipBindings(
  bindings: readonly I143RequirementOwnershipBinding[],
): readonly I143RequirementOwnershipBinding[] {
  return Object.freeze(
    bindings.map((binding) =>
      Object.freeze({ ...binding, owningEvidenceIds: Object.freeze([...binding.owningEvidenceIds]) }),
    ),
  );
}

function cloneProvenanceInputs(
  inputs: readonly I143ProvenanceIndependenceInput[],
): readonly I143ProvenanceIndependenceInput[] {
  return Object.freeze(
    inputs.map((input) =>
      Object.freeze({ ...input, dependencyLinks: Object.freeze([...input.dependencyLinks]) }),
    ),
  );
}

function cloneSemanticBridgeInputs(
  inputs: readonly I143SemanticBridgeInput[],
): readonly I143SemanticBridgeInput[] {
  return Object.freeze(
    inputs.map((input) =>
      Object.freeze({ ...input, authorityEvidenceIds: Object.freeze([...input.authorityEvidenceIds]) }),
    ),
  );
}

function cloneContradictionInputs(
  inputs: readonly I143ContradictionInput[],
): readonly I143ContradictionInput[] {
  return Object.freeze(
    inputs.map((input) =>
      Object.freeze({ ...input, evidenceIds: Object.freeze([...input.evidenceIds]) }),
    ),
  );
}

function cloneScopeResults(
  results: readonly I148ScopeCompatibilityAdjudicationResult[],
): readonly I148ScopeCompatibilityAdjudicationResult[] {
  return Object.freeze(results.map((result) => Object.freeze({ ...result })));
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport, 'recordId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport {
  return {
    recordId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_v2_input_package_materialization_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
  i150: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport,
  i148: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport {
  const contractAccepted = exactI150Accepted(i150);
  const sourceAccepted = exactI143Accepted(i143);
  const adjudicationAccepted = sourceAccepted && exactI148Accepted(i148, i143);
  const matched = contractAccepted && sourceAccepted && adjudicationAccepted && identitiesMatch(i150, i148, i143);

  const common = {
    recordVersion:
      I151_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD_VERSION,
    upstreamI150ContractId: i150.contractId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    sourceInputPackageVersion: 'v1-input-package' as const,
    targetInputPackageVersion: I149_TARGET_INPUT_PACKAGE_VERSION,
    materializedComponentIds: I149_REQUIRED_V2_PACKAGE_COMPONENTS,
    sourceV1PackagePreservedImmutable: true as const,
    sourceV1PackageMutatedByThisGate: false as const,
    requirementCoverageRecomputedByThisGate: false as const,
    requirementSatisfactionAdjudicatedByThisGate: false as const,
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

  if (!matched || i143.candidateManifest === null) {
    return finalized({
      ...common,
      status: 'I150_CONTRACT_OR_REGISTERED_SOURCE_ARTIFACTS_INVALID',
      decision: 'V2_INPUT_PACKAGE_MATERIALIZATION_NOT_PERFORMED',
      upstreamI148AdjudicationRecordId: null,
      upstreamI143RecordId: null,
      adoptionId: null,
      candidateSetId: null,
      sourceInputPackageId: null,
      targetInputPackageId: null,
      targetInputPackageState: 'NOT_REGISTERED',
      exactI150ContractAccepted: contractAccepted,
      exactI148ScopeAdjudicationAccepted: adjudicationAccepted,
      exactI143SourcePackageAccepted: sourceAccepted,
      allUpstreamIdentitiesMatch: false,
      materializedComponentCount: 0,
      sourceV1PackageReference: null,
      frozenV1CandidateSetReference: null,
      originalEvidenceRebindingRecords: [],
      originalRequirementOwnershipBindings: [],
      scopeAdjudicationArtifactReference: null,
      scopeAdjudicationResults: [],
      scopeCoverageEligibilityFlags: [],
      originalProvenanceIndependenceInputs: [],
      originalSemanticBridgeInputs: [],
      originalContradictionInputs: [],
      allTenRequiredComponentsMaterialized: false,
      frozenV1CandidateSetPreservedExact: false,
      originalEvidenceBindingsPreservedForAudit: false,
      originalRequirementOwnershipPreservedAsNonSatisfactionBindings: false,
      scopeAdjudicationResultCount: 0,
      scopeCompatibleOnlyCount: 0,
      scopeRejectedCount: 0,
      scopeEligibilityFlagCount: 0,
      scopeRejectedEvidenceRetainedForAudit: false,
      scopeRejectedEvidenceExcludedFromScopeDependentCoverage: false,
      provenanceInputCount: 0,
      provenanceUnresolvedCount: 0,
      semanticBridgeInputCount: 0,
      semanticBridgeUnresolvedCount: 0,
      contradictionInputCount: 0,
      contradictionUnresolvedCount: 0,
      remainingUnresolvedInputsPreservedWithoutInference: false,
      targetPackageIdentityDeterministic: false,
      targetPackageIdentityDistinctFromSourceV1: false,
      targetPackageCreatedByThisGate: false,
      targetPackageRegisteredByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT',
      notes: [
        'I151 fails closed unless the exact I150 contract, I148 scope adjudication artifact, and I143 registered v1 package are mutually identity-consistent.',
      ],
    });
  }

  const sourceV1PackageReference = Object.freeze({
    recordId: i143.recordId,
    inputPackageId: i143.inputPackageId as string,
    inputPackageVersion: 'v1-input-package' as const,
    immutable: true as const,
  });
  const frozenV1CandidateSetReference = Object.freeze({
    candidateSetId: i143.candidateManifest.candidateSetId,
    candidateSetVersion: 'v1-candidate-set' as const,
    adoptionId: i143.candidateManifest.adoptionId,
    candidateIds: Object.freeze([...i143.candidateManifest.candidateIds]),
    candidateCount: 6 as const,
    frozen: true as const,
  });
  const originalEvidenceRebindingRecords = cloneEvidenceRecords(i143.evidenceRebindingRecords);
  const originalRequirementOwnershipBindings = cloneOwnershipBindings(i143.requirementOwnershipBindings);
  const scopeAdjudicationArtifactReference = Object.freeze({
    adjudicationRecordId: i148.adjudicationRecordId,
    adjudicationRecordVersion: i148.adjudicationRecordVersion,
    sourceInputPackageId: i148.sourceInputPackageId as string,
  });
  const scopeAdjudicationResults = cloneScopeResults(i148.adjudicationResults);
  const scopeCoverageEligibilityFlags = Object.freeze(
    scopeAdjudicationResults.map((result) =>
      Object.freeze({
        evidenceId: result.evidenceId,
        candidateId: result.candidateId,
        adjudicationState: result.adjudicationState,
        scopeEligibleForRequirementCoverage: result.scopeEligibleForLaterRequirementCoverage,
      }),
    ),
  );
  const originalProvenanceIndependenceInputs = cloneProvenanceInputs(i143.provenanceIndependenceInputs);
  const originalSemanticBridgeInputs = cloneSemanticBridgeInputs(i143.semanticBridgeInputs);
  const originalContradictionInputs = cloneContradictionInputs(i143.contradictionInputs);

  const targetIdentityMaterial = {
    policyId: i150.policyId,
    policyVersion: i150.policyVersion,
    adoptionId: i150.adoptionId,
    candidateSetId: i150.candidateSetId,
    sourceV1PackageReference,
    targetInputPackageVersion: I149_TARGET_INPUT_PACKAGE_VERSION,
    targetInputPackageState: 'REGISTERED_NOT_EVALUATED',
    materializedComponentIds: I149_REQUIRED_V2_PACKAGE_COMPONENTS,
    frozenV1CandidateSetReference,
    originalEvidenceRebindingRecords,
    originalRequirementOwnershipBindings,
    scopeAdjudicationArtifactReference,
    scopeAdjudicationResults,
    scopeCoverageEligibilityFlags,
    originalProvenanceIndependenceInputs,
    originalSemanticBridgeInputs,
    originalContradictionInputs,
  } as const;
  const targetInputPackageId = `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_v2_input_package_${deterministicContentHash(targetIdentityMaterial).slice(0, 24)}`;
  const targetDistinct = targetInputPackageId !== i143.inputPackageId;

  if (!targetDistinct) {
    return finalized({
      ...common,
      status: 'I150_CONTRACT_OR_REGISTERED_SOURCE_ARTIFACTS_INVALID',
      decision: 'V2_INPUT_PACKAGE_MATERIALIZATION_NOT_PERFORMED',
      upstreamI148AdjudicationRecordId: i148.adjudicationRecordId,
      upstreamI143RecordId: i143.recordId,
      adoptionId: i143.adoptionId,
      candidateSetId: i143.candidateSetId,
      sourceInputPackageId: i143.inputPackageId,
      targetInputPackageId: null,
      targetInputPackageState: 'NOT_REGISTERED',
      exactI150ContractAccepted: true,
      exactI148ScopeAdjudicationAccepted: true,
      exactI143SourcePackageAccepted: true,
      allUpstreamIdentitiesMatch: true,
      materializedComponentCount: 0,
      sourceV1PackageReference,
      frozenV1CandidateSetReference,
      originalEvidenceRebindingRecords: [],
      originalRequirementOwnershipBindings: [],
      scopeAdjudicationArtifactReference,
      scopeAdjudicationResults: [],
      scopeCoverageEligibilityFlags: [],
      originalProvenanceIndependenceInputs: [],
      originalSemanticBridgeInputs: [],
      originalContradictionInputs: [],
      allTenRequiredComponentsMaterialized: false,
      frozenV1CandidateSetPreservedExact: true,
      originalEvidenceBindingsPreservedForAudit: false,
      originalRequirementOwnershipPreservedAsNonSatisfactionBindings: false,
      scopeAdjudicationResultCount: 0,
      scopeCompatibleOnlyCount: 0,
      scopeRejectedCount: 0,
      scopeEligibilityFlagCount: 0,
      scopeRejectedEvidenceRetainedForAudit: false,
      scopeRejectedEvidenceExcludedFromScopeDependentCoverage: false,
      provenanceInputCount: 0,
      provenanceUnresolvedCount: 0,
      semanticBridgeInputCount: 0,
      semanticBridgeUnresolvedCount: 0,
      contradictionInputCount: 0,
      contradictionUnresolvedCount: 0,
      remainingUnresolvedInputsPreservedWithoutInference: false,
      targetPackageIdentityDeterministic: true,
      targetPackageIdentityDistinctFromSourceV1: false,
      targetPackageCreatedByThisGate: false,
      targetPackageRegisteredByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT',
      notes: ['I151 rejects any target package identity collision with the immutable v1 source package.'],
    });
  }

  const compatibleCount = scopeAdjudicationResults.filter(
    (result) => result.adjudicationState === 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING',
  ).length;
  const rejectedCount = scopeAdjudicationResults.filter(
    (result) => result.adjudicationState === 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT',
  ).length;
  const rejectedIds = new Set(
    scopeAdjudicationResults
      .filter((result) => result.adjudicationState === 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT')
      .map((result) => result.evidenceId),
  );
  const rejectedRetained = originalEvidenceRebindingRecords.some((record) => rejectedIds.has(record.evidenceId));
  const rejectedExcluded = scopeCoverageEligibilityFlags
    .filter((flag) => rejectedIds.has(flag.evidenceId))
    .every((flag) => flag.scopeEligibleForRequirementCoverage === false);
  const provenanceUnresolvedCount = originalProvenanceIndependenceInputs.filter(
    (input) => input.independenceState === 'UNRESOLVED',
  ).length;
  const bridgeUnresolvedCount = originalSemanticBridgeInputs.filter(
    (input) => input.bridgeState === 'UNRESOLVED',
  ).length;
  const contradictionUnresolvedCount = originalContradictionInputs.filter(
    (input) => input.resolutionState === 'UNRESOLVED',
  ).length;

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD',
    decision:
      'DETERMINISTIC_V2_INPUT_PACKAGE_MATERIALIZED_AND_REGISTERED_WITH_SCOPE_RESULTS_AND_REMAINING_INPUTS_UNRESOLVED_NO_EVALUATION',
    upstreamI148AdjudicationRecordId: i148.adjudicationRecordId,
    upstreamI143RecordId: i143.recordId,
    adoptionId: i143.adoptionId,
    candidateSetId: i143.candidateSetId,
    sourceInputPackageId: i143.inputPackageId,
    targetInputPackageId,
    targetInputPackageState: 'REGISTERED_NOT_EVALUATED',
    exactI150ContractAccepted: true,
    exactI148ScopeAdjudicationAccepted: true,
    exactI143SourcePackageAccepted: true,
    allUpstreamIdentitiesMatch: true,
    materializedComponentCount: I149_REQUIRED_V2_PACKAGE_COMPONENTS.length,
    sourceV1PackageReference,
    frozenV1CandidateSetReference,
    originalEvidenceRebindingRecords,
    originalRequirementOwnershipBindings,
    scopeAdjudicationArtifactReference,
    scopeAdjudicationResults,
    scopeCoverageEligibilityFlags,
    originalProvenanceIndependenceInputs,
    originalSemanticBridgeInputs,
    originalContradictionInputs,
    allTenRequiredComponentsMaterialized: true,
    frozenV1CandidateSetPreservedExact: true,
    originalEvidenceBindingsPreservedForAudit: true,
    originalRequirementOwnershipPreservedAsNonSatisfactionBindings:
      originalRequirementOwnershipBindings.every((binding) => binding.satisfactionFindingMade === false),
    scopeAdjudicationResultCount: scopeAdjudicationResults.length,
    scopeCompatibleOnlyCount: compatibleCount,
    scopeRejectedCount: rejectedCount,
    scopeEligibilityFlagCount: scopeCoverageEligibilityFlags.length,
    scopeRejectedEvidenceRetainedForAudit: rejectedRetained,
    scopeRejectedEvidenceExcludedFromScopeDependentCoverage: rejectedExcluded,
    provenanceInputCount: originalProvenanceIndependenceInputs.length,
    provenanceUnresolvedCount,
    semanticBridgeInputCount: originalSemanticBridgeInputs.length,
    semanticBridgeUnresolvedCount: bridgeUnresolvedCount,
    contradictionInputCount: originalContradictionInputs.length,
    contradictionUnresolvedCount,
    remainingUnresolvedInputsPreservedWithoutInference:
      provenanceUnresolvedCount === 6 && bridgeUnresolvedCount === 3 && contradictionUnresolvedCount === 2,
    targetPackageIdentityDeterministic: true,
    targetPackageIdentityDistinctFromSourceV1: true,
    targetPackageCreatedByThisGate: true,
    targetPackageRegisteredByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    notes: [
      'I151 materializes exactly one deterministic v2-input-package from the immutable I143 v1 package and exact I148 scope adjudication artifact.',
      'The one scope-rejected generic-force evidence record remains in the audit substrate but is excluded from scope-dependent requirement coverage.',
      'Provenance, semantic-bridge, and contradiction inputs remain unresolved; no candidate-set evaluation or composition authority is created.',
    ],
  });
}
