import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { StructuralRelationKind } from '../calculation/structural-relations.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport,
  I98SourceRelationVocabularyTerm,
} from './i98-challenge-combination-support-channel-untouched-support-effect-conditional-persistence-methodology-definition-contract.js';

export const I99_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-relation-vocabulary-repository-binding-review-v1';

export type I99VocabularyBindingState =
  | 'EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED'
  | 'SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED'
  | 'DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED'
  | 'NO_EXACT_REPOSITORY_BINDING';

export interface I99VocabularyBindingItem {
  sourceTerm: I98SourceRelationVocabularyTerm;
  bindingState: I99VocabularyBindingState;
  repositoryRelationKinds: readonly StructuralRelationKind[];
  repositoryEvidenceDomains: readonly string[];
  relationIdentityBound: boolean;
  effectOrPersistenceBound: false;
  exactEnoughForI98MethodologyMaterialization: false;
  taxonomyGap: boolean;
  semanticLossRisk: boolean;
  notes: readonly string[];
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW'
    | 'I98_UNRESOLVED_OR_INVALID';
  decision:
    | 'PARTIAL_VOCABULARY_BINDING_PRESENT_EXACT_METHODOLOGY_MATERIALIZATION_BLOCKED'
    | 'VOCABULARY_BINDING_NOT_REVIEWED';
  upstreamI98ContractId: string;
  candidateSourceId: string | null;
  bindings: readonly I99VocabularyBindingItem[];
  reviewedVocabularyCount: number;
  exactRelationIdentityBindingCount: number;
  scopedOrDirectionalPartialBindingCount: number;
  noExactBindingCount: number;
  allVocabularyReviewed: boolean;
  allBindingsExactEnoughForMethodologyMaterialization: false;
  branchClashIsExactBindingForSourceChongAtIdentityLayer: boolean;
  branchClashIdentityBindingMeansGenericDamageSettled: false;
  sourceHeMayMapToOneStructuralRelationKindOnly: false;
  sourceHeRequiresComponentScopedMultiKindHandling: boolean;
  sourceXingStructuralRelationKindExists: false;
  sourceKeSourceLocalRelationKindExists: false;
  sourceShengHasDirectionalResourceGenerationSupportBasis: boolean;
  sourceShengDirectionalBasisMeansEffectiveSupport: false;
  sourceWeiGenericProtectionStateExists: false;
  existingClashRescueRouterMaySubstituteForGenericWeiProtection: false;
  missingTaxonomyMustBeInventedByThisGate: false;
  sourceVocabularyMayBeSilentlyCollapsed: false;
  i98MethodologyMaterializationAuthorized: false;
  methodologyDefinitionCreatedByThisGate: false;
  methodologyRegisteredByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT';
  notes: readonly string[];
}

const EXPECTED_VOCABULARY = Object.freeze(['克', '合', '刑', '冲', '生', '卫'] as const);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_source_vocabulary_binding_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI98Accepted(
  i98: ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport,
): boolean {
  return (
    i98.status === 'RESOLVED_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT' &&
    i98.decision ===
      'CONDITIONAL_PERSISTENCE_RESEARCH_METHODOLOGY_CONTRACT_FROZEN_RELATION_VOCABULARY_BINDING_REQUIRED_BEFORE_MATERIALIZATION' &&
    i98.candidateRegistrationId !== null &&
    i98.candidateSourceId !== null &&
    i98.methodologyContractFrozen &&
    i98.reservedMethodologyId === 'M-SUPPORT-UNTOUCHED-CONDITIONAL-PERSISTENCE' &&
    i98.requiredMethodologyFamily === 'stem_branch_interaction' &&
    i98.methodologyStatusCeiling === 'research' &&
    i98.sourceIdsMustContainCandidateSource &&
    i98.sourceIdsMayBorrowI88OrI91Candidate === false &&
    i98.requiredInputSemantics.length === 7 &&
    i98.canonicalRequiredFactBindingsResolved === false &&
    i98.placeholderRequiredFactPathsAuthorized === false &&
    i98.sourceRelationVocabulary.length === EXPECTED_VOCABULARY.length &&
    i98.sourceRelationVocabulary.every(
      (item, index) =>
        item.sourceTerm === EXPECTED_VOCABULARY[index] &&
        item.exactRepositoryBindingState === 'UNRESOLVED_EXACT_BINDING_REQUIRED' &&
        item.mayBeSilentlyMappedToExistingRelationKind === false &&
        item.absenceMayBeInferredFromNoTrackedRelationTouch === false,
    ) &&
    i98.exactRelationVocabularyBindingRequired &&
    i98.allSourceRelationVocabularyBindingsResolved === false &&
    i98.noTrackedRelationTouchOnlyClearsTrackedRelationSettlementDependency &&
    i98.noTrackedRelationTouchAloneSufficientForConditionalPersistence === false &&
    i98.researchMethodologyMaterializationAuthorized === false &&
    i98.methodologyDefinitionCreatedByThisGate === false &&
    i98.ruleDefinitionCreatedByThisGate === false &&
    i98.registrySnapshotMutatedByThisGate === false &&
    i98.sourceActivationVerdictAuthorized === false &&
    i98.sourcePersistenceVerdictAuthorized === false &&
    i98.sourceEffectiveSupportVerdictAuthorized === false &&
    i98.relativeForceVerdictAuthorized === false &&
    i98.crossRelationPrecedenceAuthorized === false &&
    i98.classificationAuthorized === false &&
    i98.numericScoringAuthorized === false &&
    i98.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW'
  );
}

function bindingItems(): readonly I99VocabularyBindingItem[] {
  return [
    {
      sourceTerm: '克',
      bindingState: 'NO_EXACT_REPOSITORY_BINDING',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: [
        'I51 directional support/interference source basis mentions controlling damage but does not materialize a source-local 克 relation kind.',
      ],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: true,
      semanticLossRisk: true,
      notes: [
        'StructuralRelationKind contains combination and branch-clash relations only; it has no source-local overcoming/control relation identity.',
        'A textual finding that support can be disturbed by control is not an exact current-chart relation binding.',
      ],
    },
    {
      sourceTerm: '合',
      bindingState: 'SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED',
      repositoryRelationKinds: [
        'stem_five_combination',
        'branch_six_combination',
        'branch_three_combination',
      ],
      repositoryEvidenceDomains: [
        'src/calculation/structural-relations.ts component-specific combination candidates',
        'I76-I81 relation-kind-specific combination settlement chain',
      ],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: false,
      semanticLossRisk: true,
      notes: [
        'For stems, 合 can be scoped toward stem_five_combination; for branches, current repository combination topology is split between branch_six_combination and branch_three_combination.',
        'The source term 合 is broader than any single StructuralRelationKind, and current routed binding/interaction outcomes remain unresolved.',
      ],
    },
    {
      sourceTerm: '刑',
      bindingState: 'NO_EXACT_REPOSITORY_BINDING',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: [
        'StructuralRelationKind currently has no branch-punishment relation family.',
      ],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: true,
      semanticLossRisk: true,
      notes: [
        '刑 is explicitly branch-scoped in the candidate semantics but no matching StructuralRelationKind exists.',
        'Treating 刑 as branch_clash or generic damage would be a lossy invented mapping.',
      ],
    },
    {
      sourceTerm: '冲',
      bindingState: 'EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED',
      repositoryRelationKinds: ['branch_clash'],
      repositoryEvidenceDomains: [
        'src/calculation/structural-relations.ts BRANCH_CLASHES / branch_clash',
        'I20-I20d and I32-I33 clash evidence domains',
      ],
      relationIdentityBound: true,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: false,
      semanticLossRisk: false,
      notes: [
        'The branch opposition relation denoted by 冲 has an exact relation-identity representation as branch_clash.',
        'Structural clash identity does not settle generic support-source damage, destruction, persistence, rescue, or relative force.',
      ],
    },
    {
      sourceTerm: '生',
      bindingState: 'DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: [
        'I51/I52 RESOURCE_GENERATION_SUPPORT_CHANNEL directional support evidence',
      ],
      relationIdentityBound: true,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: false,
      semanticLossRisk: false,
      notes: [
        'Generative support direction has a scoped repository representation through RESOURCE_GENERATION_SUPPORT_CHANNEL.',
        'That support-channel direction is not a structural relation kind and does not authorize activation, persistence, magnitude, or effective support.',
      ],
    },
    {
      sourceTerm: '卫',
      bindingState: 'NO_EXACT_REPOSITORY_BINDING',
      repositoryRelationKinds: [],
      repositoryEvidenceDomains: [
        'I20d tracks narrowly scoped combination rescue candidates for clashes, not a generic support-source protection state.',
      ],
      relationIdentityBound: false,
      effectOrPersistenceBound: false,
      exactEnoughForI98MethodologyMaterialization: false,
      taxonomyGap: true,
      semanticLossRisk: true,
      notes: [
        'The repository has no generic protection/guard relation or state matching the source term 卫.',
        'Clash-rescue routing cannot substitute because I20d keeps rescueEffect and clashSettlement unresolved and is scoped to combination relations touching a clash participant.',
      ],
    },
  ];
}

export function buildI99ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReview(
  i98: ChallengeCombinationSupportChannelUntouchedSupportEffectConditionalPersistenceMethodologyDefinitionContractReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport {
  const base = {
    reviewVersion:
      I99_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW_VERSION,
    upstreamI98ContractId: i98.contractId,
    allBindingsExactEnoughForMethodologyMaterialization: false as const,
    branchClashIdentityBindingMeansGenericDamageSettled: false as const,
    sourceHeMayMapToOneStructuralRelationKindOnly: false as const,
    sourceXingStructuralRelationKindExists: false as const,
    sourceKeSourceLocalRelationKindExists: false as const,
    sourceShengDirectionalBasisMeansEffectiveSupport: false as const,
    sourceWeiGenericProtectionStateExists: false as const,
    existingClashRescueRouterMaySubstituteForGenericWeiProtection: false as const,
    missingTaxonomyMustBeInventedByThisGate: false as const,
    sourceVocabularyMayBeSilentlyCollapsed: false as const,
    i98MethodologyMaterializationAuthorized: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    methodologyRegisteredByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };

  if (!exactI98Accepted(i98)) {
    return finalized({
      ...base,
      status: 'I98_UNRESOLVED_OR_INVALID',
      decision: 'VOCABULARY_BINDING_NOT_REVIEWED',
      candidateSourceId: null,
      bindings: [],
      reviewedVocabularyCount: 0,
      exactRelationIdentityBindingCount: 0,
      scopedOrDirectionalPartialBindingCount: 0,
      noExactBindingCount: 0,
      allVocabularyReviewed: false,
      branchClashIsExactBindingForSourceChongAtIdentityLayer: false,
      sourceHeRequiresComponentScopedMultiKindHandling: false,
      sourceShengHasDirectionalResourceGenerationSupportBasis: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_CONDITIONAL_PERSISTENCE_METHODOLOGY_DEFINITION_CONTRACT',
      notes: [
        'I99 requires the exact frozen I98 methodology-definition contract before reviewing source vocabulary bindings.',
      ],
    });
  }

  const bindings = bindingItems();
  const exactRelationIdentityBindingCount = bindings.filter(
    (item) => item.bindingState === 'EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED',
  ).length;
  const scopedOrDirectionalPartialBindingCount = bindings.filter(
    (item) =>
      item.bindingState === 'SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED' ||
      item.bindingState === 'DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED',
  ).length;
  const noExactBindingCount = bindings.filter(
    (item) => item.bindingState === 'NO_EXACT_REPOSITORY_BINDING',
  ).length;

  return finalized({
    ...base,
    status: 'RESOLVED_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW',
    decision: 'PARTIAL_VOCABULARY_BINDING_PRESENT_EXACT_METHODOLOGY_MATERIALIZATION_BLOCKED',
    candidateSourceId: i98.candidateSourceId,
    bindings,
    reviewedVocabularyCount: bindings.length,
    exactRelationIdentityBindingCount,
    scopedOrDirectionalPartialBindingCount,
    noExactBindingCount,
    allVocabularyReviewed: bindings.length === EXPECTED_VOCABULARY.length,
    branchClashIsExactBindingForSourceChongAtIdentityLayer: true,
    sourceHeRequiresComponentScopedMultiKindHandling: true,
    sourceShengHasDirectionalResourceGenerationSupportBasis: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW',
    notes: [
      'Current repository authority provides useful but incomplete bindings: 冲 has exact branch_clash identity; 生 has directional resource-generation support; 合 requires component-scoped multi-kind handling.',
      '克, 刑, and 卫 have no exact generic source-local repository relation/effect binding under the current taxonomy.',
      'Even where relation identity is available, generic support-source damage/persistence/effective-support settlement remains unresolved. Relation identity is not effect settlement.',
      'The I98 methodology therefore remains non-materializable until the missing taxonomy requirements and effect-binding boundaries are explicitly resolved.',
    ],
  });
}
