import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { MethodologyFamily } from '../contracts/interpretation.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport } from './i97-challenge-combination-support-channel-untouched-support-effect-single-candidate-authority-promotion-readiness-review.js';

export const I98_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-conditional-persistence-methodology-definition-contract-v1';

export type I98SourceRelationVocabularyTerm = '克' | '合' | '刑' | '冲' | '生' | '卫';

export interface I98SourceRelationVocabularyBindingRequirement {
  sourceTerm: I98SourceRelationVocabularyTerm;
  sourceScope: 'STEM' | 'BRANCH' | 'STEM_AND_BRANCH' | 'SUPPORT_OR_PROTECTION';
  semanticRole: 'DAMAGE' | 'INTERACTION' | 'SUPPORT' | 'PROTECTION';
  exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED';
  mayBeSilentlyMappedToExistingRelationKind: false;
  absenceMayBeInferredFromNoTrackedRelationTouch: false;
}

export interface I98RequiredInputSemantic {
  semanticId:
    | 'SUPPORT_SOURCE_IDENTITY'
    | 'SUPPORT_KIND'
    | 'SUPPORT_SOURCE_POSITION'
    | 'RELATION_TOUCH_TOPOLOGY'
    | 'RELATION_SETTLEMENT_DEPENDENCY_STATE'
    | 'SOURCE_RELATION_VOCABULARY_BINDING'
    | 'SUPPORT_OR_PROTECTION_CONDITION';
  required: true;
  canonicalFactBindingResolved: boolean;
  mayUsePlaceholderFactPathInMaterializedMethodology: false;
  basis: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport {
  contractId: string;
  contractVersion: string;
  status:
    | 'RESOLVED_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT'
    | 'I97_UNRESOLVED_OR_INVALID';
  decision:
    | 'CONDITIONAL_PERSISTENCE_RESEARCH_METHODOLOGY_CONTRACT_FROZEN_RELATION_VOCABULARY_BINDING_REQUIRED_BEFORE_MATERIALIZATION'
    | 'METHODOLOGY_CONTRACT_NOT_FROZEN';
  upstreamI97ReviewId: string;
  candidateRegistrationId: string | null;
  candidateSourceId: string | null;
  methodologyContractFrozen: boolean;
  reservedMethodologyId: 'M-SUPPORT-UNTOUCHED-CONDITIONAL-PERSISTENCE' | null;
  requiredMethodologyFamily: MethodologyFamily | null;
  methodologyStatusCeiling: 'research' | 'none';
  methodologyVersionConvention: '0.1.0-research' | null;
  sourceIdsMustContainCandidateSource: boolean;
  sourceIdsMayBorrowI88OrI91Candidate: false;
  methodologyDefinitionCreatedByThisGate: false;
  methodologyRegisteredByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  requiredInputSemantics: readonly I98RequiredInputSemantic[];
  canonicalRequiredFactBindingsResolved: boolean;
  placeholderRequiredFactPathsAuthorized: false;
  sourceRelationVocabulary: readonly I98SourceRelationVocabularyBindingRequirement[];
  exactRelationVocabularyBindingRequired: boolean;
  allSourceRelationVocabularyBindingsResolved: boolean;
  noTrackedRelationTouchOnlyClearsTrackedRelationSettlementDependency: true;
  noTrackedRelationTouchAloneSufficientForConditionalPersistence: false;
  supportPresenceAloneSufficientForConditionalPersistence: false;
  supportDirectionAloneSufficientForConditionalPersistence: false;
  conditionalPersistenceRequiresApplicableSupportKind: true;
  conditionalPersistenceRequiresKnownSourcePosition: true;
  conditionalPersistenceRequiresExactDamageVocabularyEvaluation: true;
  conditionalPersistenceRequiresSupportOrProtectionConditionEvaluation: true;
  conditionalPersistenceRequiresNoUnresolvedRequiredBinding: true;
  methodologySemanticStateCeiling:
    | 'CONDITIONAL_PERSISTENCE_EVALUATION_CONTRACT_ONLY'
    | 'none';
  activeStateMayBeEmitted: false;
  persistedStateMayBeEmitted: false;
  effectiveSupportStateMayBeEmitted: false;
  sourceDamageStateMayBeInventedFromMissingEvidence: false;
  sourceProtectionStateMayBeInventedFromMissingEvidence: false;
  methodologyMayResolveCrossRelationPrecedence: false;
  methodologyMayResolveRelativeForce: false;
  methodologyMayAssignNumericWeight: false;
  researchMethodologyMaterializationAuthorized: boolean;
  methodologyOrRulePromotionAuthorized: false;
  executableAuthorityAuthorized: false;
  stagingPromotionAuthorized: false;
  productionPromotionAuthorized: false;
  untouchedSupportEffectRuleImplementationAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW';
  notes: readonly string[];
}

const VOCABULARY = Object.freeze([
  {
    sourceTerm: '克',
    sourceScope: 'STEM_AND_BRANCH',
    semanticRole: 'DAMAGE',
    exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED',
    mayBeSilentlyMappedToExistingRelationKind: false,
    absenceMayBeInferredFromNoTrackedRelationTouch: false,
  },
  {
    sourceTerm: '合',
    sourceScope: 'STEM_AND_BRANCH',
    semanticRole: 'INTERACTION',
    exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED',
    mayBeSilentlyMappedToExistingRelationKind: false,
    absenceMayBeInferredFromNoTrackedRelationTouch: false,
  },
  {
    sourceTerm: '刑',
    sourceScope: 'BRANCH',
    semanticRole: 'DAMAGE',
    exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED',
    mayBeSilentlyMappedToExistingRelationKind: false,
    absenceMayBeInferredFromNoTrackedRelationTouch: false,
  },
  {
    sourceTerm: '冲',
    sourceScope: 'BRANCH',
    semanticRole: 'DAMAGE',
    exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED',
    mayBeSilentlyMappedToExistingRelationKind: false,
    absenceMayBeInferredFromNoTrackedRelationTouch: false,
  },
  {
    sourceTerm: '生',
    sourceScope: 'SUPPORT_OR_PROTECTION',
    semanticRole: 'SUPPORT',
    exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED',
    mayBeSilentlyMappedToExistingRelationKind: false,
    absenceMayBeInferredFromNoTrackedRelationTouch: false,
  },
  {
    sourceTerm: '卫',
    sourceScope: 'SUPPORT_OR_PROTECTION',
    semanticRole: 'PROTECTION',
    exactRepositoryBindingState: 'UNRESOLVED_EXACT_BINDING_REQUIRED',
    mayBeSilentlyMappedToExistingRelationKind: false,
    absenceMayBeInferredFromNoTrackedRelationTouch: false,
  },
] as const satisfies readonly I98SourceRelationVocabularyBindingRequirement[]);

const REQUIRED_INPUTS = Object.freeze([
  {
    semanticId: 'SUPPORT_SOURCE_IDENTITY',
    required: true,
    canonicalFactBindingResolved: true,
    mayUsePlaceholderFactPathInMaterializedMethodology: false,
    basis: 'I71/I72 establish exact support-source identity for the pair-local support context.',
  },
  {
    semanticId: 'SUPPORT_KIND',
    required: true,
    canonicalFactBindingResolved: true,
    mayUsePlaceholderFactPathInMaterializedMethodology: false,
    basis: 'I51/I52 preserve directional same-element/resource-generation support evidence without magnitude.',
  },
  {
    semanticId: 'SUPPORT_SOURCE_POSITION',
    required: true,
    canonicalFactBindingResolved: true,
    mayUsePlaceholderFactPathInMaterializedMethodology: false,
    basis: 'I52/I72 preserve support-source position and exact source identity.',
  },
  {
    semanticId: 'RELATION_TOUCH_TOPOLOGY',
    required: true,
    canonicalFactBindingResolved: true,
    mayUsePlaceholderFactPathInMaterializedMethodology: false,
    basis: 'I71/I72 materialize source-local tracked relation topology.',
  },
  {
    semanticId: 'RELATION_SETTLEMENT_DEPENDENCY_STATE',
    required: true,
    canonicalFactBindingResolved: true,
    mayUsePlaceholderFactPathInMaterializedMethodology: false,
    basis: 'I74/I75 separate no-touch relation-settlement independence from unresolved support effect.',
  },
  {
    semanticId: 'SOURCE_RELATION_VOCABULARY_BINDING',
    required: true,
    canonicalFactBindingResolved: false,
    mayUsePlaceholderFactPathInMaterializedMethodology: false,
    basis: 'The source terms 克/合/刑/冲 must be bound exactly to repository relation/effect semantics before methodology materialization.',
  },
  {
    semanticId: 'SUPPORT_OR_PROTECTION_CONDITION',
    required: true,
    canonicalFactBindingResolved: false,
    mayUsePlaceholderFactPathInMaterializedMethodology: false,
    basis: 'The source terms 生/卫 distinguish support/protection conditions, but their exact repository evidence binding is not yet established.',
  },
] as const satisfies readonly I98RequiredInputSemantic[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport, 'contractId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport {
  return {
    contractId: `challenge_combination_support_channel_untouched_support_conditional_persistence_methodology_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI97Accepted(
  i97: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport,
): boolean {
  return (
    i97.status === 'RESOLVED_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS' &&
    i97.decision ===
      'I84_FULL_COVERAGE_CAN_ENTER_RESEARCH_METHODOLOGY_DEFINITION_REVIEW_DIRECT_RULE_AND_EXECUTABLE_PROMOTION_BLOCKED' &&
    i97.candidateRegistrationId !== null &&
    i97.candidateSourceId !== null &&
    i97.candidateMeetsFrozenI84AcceptanceContract &&
    i97.authorityCoverageGapSatisfied &&
    i97.authorityGapClosed === false &&
    i97.promotionLifecycleEntryReady &&
    i97.authorizedEntryStage === 'RESEARCH_METHODOLOGY_DEFINITION_CONTRACT' &&
    i97.recommendedMethodologyFamily === 'stem_branch_interaction' &&
    i97.methodologyStatusCeilingByThisGate === 'research' &&
    i97.researchMethodologyDefinitionContractRequired &&
    i97.methodologySourceLinkMustReferenceCandidate &&
    i97.methodologyMustPreserveConditionalNotDefaultPersistence &&
    i97.methodologyMustDefineRepositoryStateMapping &&
    i97.methodologyMayTranslateNoTouchIntoDefaultActive === false &&
    i97.methodologyMayTranslateNoTouchIntoDefaultPersisted === false &&
    i97.methodologyMayTranslateNoTouchIntoDefaultEffectiveSupport === false &&
    i97.directSourceToRulePromotionAuthorized === false &&
    i97.ruleDefinitionCreationAuthorized === false &&
    i97.rulePromotionAuthorized === false &&
    i97.researchRegistryMutationAuthorizedByThisGate === false &&
    i97.stagingPromotionAuthorized === false &&
    i97.productionPromotionAuthorized === false &&
    i97.methodologyOrRulePromotionAuthorized === false &&
    i97.executableAuthorityAuthorized === false &&
    i97.sourceActivationVerdictAuthorized === false &&
    i97.sourcePersistenceVerdictAuthorized === false &&
    i97.sourceEffectiveSupportVerdictAuthorized === false &&
    i97.relativeForceVerdictAuthorized === false &&
    i97.crossRelationPrecedenceAuthorized === false &&
    i97.classificationAuthorized === false &&
    i97.numericScoringAuthorized === false &&
    i97.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT'
  );
}

export function buildI98ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContract(
  i97: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateAuthorityPromotionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport {
  const common = {
    contractVersion:
      I98_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT_VERSION,
    upstreamI97ReviewId: i97.reviewId,
    sourceIdsMayBorrowI88OrI91Candidate: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    methodologyRegisteredByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    placeholderRequiredFactPathsAuthorized: false as const,
    noTrackedRelationTouchOnlyClearsTrackedRelationSettlementDependency: true as const,
    noTrackedRelationTouchAloneSufficientForConditionalPersistence: false as const,
    supportPresenceAloneSufficientForConditionalPersistence: false as const,
    supportDirectionAloneSufficientForConditionalPersistence: false as const,
    conditionalPersistenceRequiresApplicableSupportKind: true as const,
    conditionalPersistenceRequiresKnownSourcePosition: true as const,
    conditionalPersistenceRequiresExactDamageVocabularyEvaluation: true as const,
    conditionalPersistenceRequiresSupportOrProtectionConditionEvaluation: true as const,
    conditionalPersistenceRequiresNoUnresolvedRequiredBinding: true as const,
    activeStateMayBeEmitted: false as const,
    persistedStateMayBeEmitted: false as const,
    effectiveSupportStateMayBeEmitted: false as const,
    sourceDamageStateMayBeInventedFromMissingEvidence: false as const,
    sourceProtectionStateMayBeInventedFromMissingEvidence: false as const,
    methodologyMayResolveCrossRelationPrecedence: false as const,
    methodologyMayResolveRelativeForce: false as const,
    methodologyMayAssignNumericWeight: false as const,
    methodologyOrRulePromotionAuthorized: false as const,
    executableAuthorityAuthorized: false as const,
    stagingPromotionAuthorized: false as const,
    productionPromotionAuthorized: false as const,
    untouchedSupportEffectRuleImplementationAuthorized: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };

  if (!exactI97Accepted(i97)) {
    return finalized({
      ...common,
      status: 'I97_UNRESOLVED_OR_INVALID',
      decision: 'METHODOLOGY_CONTRACT_NOT_FROZEN',
      candidateRegistrationId: null,
      candidateSourceId: null,
      methodologyContractFrozen: false,
      reservedMethodologyId: null,
      requiredMethodologyFamily: null,
      methodologyStatusCeiling: 'none',
      methodologyVersionConvention: null,
      sourceIdsMustContainCandidateSource: false,
      requiredInputSemantics: [],
      canonicalRequiredFactBindingsResolved: false,
      sourceRelationVocabulary: [],
      exactRelationVocabularyBindingRequired: false,
      allSourceRelationVocabularyBindingsResolved: false,
      methodologySemanticStateCeiling: 'none',
      researchMethodologyMaterializationAuthorized: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_AUTHORITY_PROMOTION_READINESS_REVIEW',
      notes: [
        'I98 requires exact resolved I97 promotion-readiness authority before freezing a research methodology-definition contract.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT',
    decision:
      'CONDITIONAL_PERSISTENCE_RESEARCH_METHODOLOGY_CONTRACT_FROZEN_RELATION_VOCABULARY_BINDING_REQUIRED_BEFORE_MATERIALIZATION',
    candidateRegistrationId: i97.candidateRegistrationId,
    candidateSourceId: i97.candidateSourceId,
    methodologyContractFrozen: true,
    reservedMethodologyId: 'M-SUPPORT-UNTOUCHED-CONDITIONAL-PERSISTENCE',
    requiredMethodologyFamily: 'stem_branch_interaction',
    methodologyStatusCeiling: 'research',
    methodologyVersionConvention: '0.1.0-research',
    sourceIdsMustContainCandidateSource: true,
    requiredInputSemantics: REQUIRED_INPUTS,
    canonicalRequiredFactBindingsResolved: REQUIRED_INPUTS.every(
      (input) => input.canonicalFactBindingResolved,
    ),
    sourceRelationVocabulary: VOCABULARY,
    exactRelationVocabularyBindingRequired: true,
    allSourceRelationVocabularyBindingsResolved: VOCABULARY.every(
      (item) => item.exactRepositoryBindingState !== 'UNRESOLVED_EXACT_BINDING_REQUIRED',
    ),
    methodologySemanticStateCeiling: 'CONDITIONAL_PERSISTENCE_EVALUATION_CONTRACT_ONLY',
    researchMethodologyMaterializationAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW',
    notes: [
      'I98 freezes a contract for a future research MethodologyDefinition but deliberately does not materialize or register that definition.',
      'The source-supported semantics are conditional-not-default. NO_TRACKED_RELATION_TOUCH clears only the tracked relation-settlement dependency and is not sufficient for ACTIVE, PERSISTED, or effective-support state.',
      'Exact source vocabulary 克/合/刑/冲 and 生/卫 must be bound to repository relation/effect evidence before methodology materialization; no source term may be silently collapsed into an existing relation kind.',
      'Existing I51/I52/I71/I72/I74/I75 evidence may supply support identity, kind, position, topology, and dependency substrate, but unresolved source-vocabulary bindings remain a hard blocker.',
      'Rule creation, registry mutation, review attestation, staging/production promotion, relative force, precedence, numeric scoring, and strong/weak classification remain blocked.',
    ],
  });
}
