import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport,
  I99VocabularyBindingState,
} from './i99-challenge-combination-support-channel-untouched-support-effect-source-relation-vocabulary-repository-binding-review.js';
import type { I98SourceRelationVocabularyTerm } from './i98-challenge-combination-support-channel-untouched-support-effect-conditional-persistence-methodology-definition-contract.js';

export const I100_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-vocabulary-taxonomy-gap-requirements-review-v1';

export type I100VocabularyTaxonomyRequirementKind =
  | 'SOURCE_LOCAL_CONTROL_DIRECTION_EVIDENCE_ADAPTER_REQUIRED'
  | 'COMPONENT_SCOPED_EXISTING_COMBINATION_KIND_ADAPTER_REQUIRED'
  | 'NEW_BRANCH_PUNISHMENT_RELATION_IDENTITY_TAXONOMY_REQUIRED'
  | 'EXISTING_BRANCH_CLASH_IDENTITY_REUSE_EFFECT_ADAPTER_REQUIRED'
  | 'EXISTING_RESOURCE_GENERATION_DIRECTION_REUSE_SETTLEMENT_ADAPTER_REQUIRED'
  | 'PROTECTION_EFFECT_STATE_TAXONOMY_REQUIRED';

export interface I100VocabularyTaxonomyGapRequirement {
  sourceTerm: I98SourceRelationVocabularyTerm;
  upstreamBindingState: I99VocabularyBindingState;
  requirementKind: I100VocabularyTaxonomyRequirementKind;
  newStructuralRelationKindRequired: boolean;
  existingStructuralRelationKindsMayBeReused: readonly string[];
  componentScopedBindingAdapterRequired: boolean;
  sourceLocalDirectionalEvidenceAdapterRequired: boolean;
  effectOrPersistenceSettlementAdapterRequired: boolean;
  protectionSemanticStateRequired: boolean;
  exactEnoughForI98MethodologyMaterializationAfterThisGate: false;
  requirementImplementedByThisGate: false;
  forbiddenShortcuts: readonly string[];
  notes: readonly string[];
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW'
    | 'I99_UNRESOLVED_OR_INVALID';
  decision:
    | 'VOCABULARY_GAPS_CLASSIFIED_MINIMAL_TAXONOMY_AND_ADAPTER_REQUIREMENTS_FROZEN_IMPLEMENTATION_BLOCKED'
    | 'VOCABULARY_GAP_REQUIREMENTS_NOT_REVIEWED';
  upstreamI99ReviewId: string;
  candidateSourceId: string | null;
  requirements: readonly I100VocabularyTaxonomyGapRequirement[];
  reviewedVocabularyCount: number;
  newStructuralRelationKindRequiredCount: number;
  sourceLocalDirectionalEvidenceAdapterRequiredCount: number;
  componentScopedBindingAdapterRequiredCount: number;
  protectionSemanticStateRequiredCount: number;
  existingIdentityOrDirectionReuseCount: number;
  allSixVocabularyRequirementsClassified: boolean;
  onlySourceXingRequiresNewStructuralRelationKind: boolean;
  sourceKeMustNotBeForcedIntoStructuralRelationKind: true;
  sourceWeiMustNotBeForcedIntoStructuralRelationKind: true;
  sourceHeMayReuseExistingCombinationKindsOnlyWithComponentScope: true;
  sourceChongMayReuseBranchClashIdentity: true;
  sourceChongBranchClashIdentityMeansDamageOutcomeResolved: false;
  sourceShengMayReuseResourceGenerationDirection: true;
  sourceShengResourceGenerationDirectionMeansPersistenceResolved: false;
  sourceKeExistingTextualControlBasisMeansCurrentChartControlIdentityResolved: false;
  sourceXingMayBeCollapsedIntoBranchClash: false;
  sourceWeiMayBeCollapsedIntoClashRescue: false;
  noTrackedRelationTouchMayProveAbsenceOfUnmodeledKeXingWei: false;
  currentRepositoryTaxonomySufficientForI98MethodologyMaterialization: false;
  taxonomyImplementationAuthorizedByThisGate: false;
  calculationCoreMutationAuthorizedByThisGate: false;
  structuralRelationKindMutationAuthorizedByThisGate: false;
  methodologyDefinitionCreatedByThisGate: false;
  methodologyRegisteredByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW';
  notes: readonly string[];
}

const EXPECTED_BINDINGS = Object.freeze([
  ['克', 'NO_EXACT_REPOSITORY_BINDING'],
  ['合', 'SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED'],
  ['刑', 'NO_EXACT_REPOSITORY_BINDING'],
  ['冲', 'EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED'],
  ['生', 'DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED'],
  ['卫', 'NO_EXACT_REPOSITORY_BINDING'],
] as const satisfies readonly (readonly [I98SourceRelationVocabularyTerm, I99VocabularyBindingState])[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_vocabulary_taxonomy_requirements_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI99Accepted(
  i99: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport,
): boolean {
  return (
    i99.status === 'RESOLVED_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW' &&
    i99.decision ===
      'PARTIAL_VOCABULARY_BINDING_PRESENT_EXACT_METHODOLOGY_MATERIALIZATION_BLOCKED' &&
    i99.candidateSourceId !== null &&
    i99.reviewedVocabularyCount === 6 &&
    i99.exactRelationIdentityBindingCount === 1 &&
    i99.scopedOrDirectionalPartialBindingCount === 2 &&
    i99.noExactBindingCount === 3 &&
    i99.allVocabularyReviewed &&
    i99.allBindingsExactEnoughForMethodologyMaterialization === false &&
    i99.bindings.length === EXPECTED_BINDINGS.length &&
    i99.bindings.every((binding, index) => {
      const expected = EXPECTED_BINDINGS[index];
      return (
        expected !== undefined &&
        binding.sourceTerm === expected[0] &&
        binding.bindingState === expected[1] &&
        binding.effectOrPersistenceBound === false &&
        binding.exactEnoughForI98MethodologyMaterialization === false
      );
    }) &&
    i99.branchClashIsExactBindingForSourceChongAtIdentityLayer &&
    i99.branchClashIdentityBindingMeansGenericDamageSettled === false &&
    i99.sourceHeMayMapToOneStructuralRelationKindOnly === false &&
    i99.sourceHeRequiresComponentScopedMultiKindHandling &&
    i99.sourceXingStructuralRelationKindExists === false &&
    i99.sourceKeSourceLocalRelationKindExists === false &&
    i99.sourceShengHasDirectionalResourceGenerationSupportBasis &&
    i99.sourceShengDirectionalBasisMeansEffectiveSupport === false &&
    i99.sourceWeiGenericProtectionStateExists === false &&
    i99.existingClashRescueRouterMaySubstituteForGenericWeiProtection === false &&
    i99.missingTaxonomyMustBeInventedByThisGate === false &&
    i99.sourceVocabularyMayBeSilentlyCollapsed === false &&
    i99.i98MethodologyMaterializationAuthorized === false &&
    i99.methodologyDefinitionCreatedByThisGate === false &&
    i99.methodologyRegisteredByThisGate === false &&
    i99.ruleDefinitionCreatedByThisGate === false &&
    i99.registrySnapshotMutatedByThisGate === false &&
    i99.reviewAttestationCreatedByThisGate === false &&
    i99.sourceActivationVerdictAuthorized === false &&
    i99.sourcePersistenceVerdictAuthorized === false &&
    i99.sourceEffectiveSupportVerdictAuthorized === false &&
    i99.relativeForceVerdictAuthorized === false &&
    i99.crossRelationPrecedenceAuthorized === false &&
    i99.classificationAuthorized === false &&
    i99.numericScoringAuthorized === false &&
    i99.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW'
  );
}

function requirementItems(): readonly I100VocabularyTaxonomyGapRequirement[] {
  return [
    {
      sourceTerm: '克',
      upstreamBindingState: 'NO_EXACT_REPOSITORY_BINDING',
      requirementKind: 'SOURCE_LOCAL_CONTROL_DIRECTION_EVIDENCE_ADAPTER_REQUIRED',
      newStructuralRelationKindRequired: false,
      existingStructuralRelationKindsMayBeReused: [],
      componentScopedBindingAdapterRequired: false,
      sourceLocalDirectionalEvidenceAdapterRequired: true,
      effectOrPersistenceSettlementAdapterRequired: true,
      protectionSemanticStateRequired: false,
      exactEnoughForI98MethodologyMaterializationAfterThisGate: false,
      requirementImplementedByThisGate: false,
      forbiddenShortcuts: [
        'Do not add generic 克 as a StructuralRelationKind merely because the source uses a relation word.',
        'Do not infer current-chart control identity from I51 textual discussion of control/damage.',
        'Do not treat five-element control direction as settled damage, destruction, or persistence loss.',
      ],
      notes: [
        '克 is a directed element-control semantic that can apply across stem/branch source positions; it is not the same ontology as the repository structural-match relation kinds.',
        'The minimal gap is a source-local current-chart control-direction evidence adapter plus a later effect/persistence settlement layer.',
      ],
    },
    {
      sourceTerm: '合',
      upstreamBindingState: 'SCOPED_RELATION_KIND_SET_BINDING_EFFECT_UNRESOLVED',
      requirementKind: 'COMPONENT_SCOPED_EXISTING_COMBINATION_KIND_ADAPTER_REQUIRED',
      newStructuralRelationKindRequired: false,
      existingStructuralRelationKindsMayBeReused: [
        'stem_five_combination',
        'branch_six_combination',
        'branch_three_combination',
      ],
      componentScopedBindingAdapterRequired: true,
      sourceLocalDirectionalEvidenceAdapterRequired: false,
      effectOrPersistenceSettlementAdapterRequired: true,
      protectionSemanticStateRequired: false,
      exactEnoughForI98MethodologyMaterializationAfterThisGate: false,
      requirementImplementedByThisGate: false,
      forbiddenShortcuts: [
        'Do not collapse stem and branch 合 into one generic combination relation kind.',
        'Do not infer binding, transformation, rescue, or persistence outcome from structural combination membership.',
      ],
      notes: [
        'The repository already separates stem five-combination, branch six-combination, and branch three-combination identities.',
        'A component-scoped adapter must preserve that split and route to existing kind-specific settlement paths rather than inventing a generic 合 outcome.',
      ],
    },
    {
      sourceTerm: '刑',
      upstreamBindingState: 'NO_EXACT_REPOSITORY_BINDING',
      requirementKind: 'NEW_BRANCH_PUNISHMENT_RELATION_IDENTITY_TAXONOMY_REQUIRED',
      newStructuralRelationKindRequired: true,
      existingStructuralRelationKindsMayBeReused: [],
      componentScopedBindingAdapterRequired: false,
      sourceLocalDirectionalEvidenceAdapterRequired: false,
      effectOrPersistenceSettlementAdapterRequired: true,
      protectionSemanticStateRequired: false,
      exactEnoughForI98MethodologyMaterializationAfterThisGate: false,
      requirementImplementedByThisGate: false,
      forbiddenShortcuts: [
        'Do not map 刑 to branch_clash.',
        'Do not map 刑 to generic damage without first representing its own branch relation identity.',
        'Do not add punishment effect magnitude or precedence together with identity taxonomy.',
      ],
      notes: [
        '刑 is branch-scoped and denotes an explicit branch-relation family absent from StructuralRelationKind.',
        'Unlike 克, its missing ontology is relation identity itself, so a narrowly sourced branch-punishment identity taxonomy is required before effect settlement can be reviewed.',
      ],
    },
    {
      sourceTerm: '冲',
      upstreamBindingState: 'EXACT_RELATION_IDENTITY_BINDING_EFFECT_UNRESOLVED',
      requirementKind: 'EXISTING_BRANCH_CLASH_IDENTITY_REUSE_EFFECT_ADAPTER_REQUIRED',
      newStructuralRelationKindRequired: false,
      existingStructuralRelationKindsMayBeReused: ['branch_clash'],
      componentScopedBindingAdapterRequired: false,
      sourceLocalDirectionalEvidenceAdapterRequired: false,
      effectOrPersistenceSettlementAdapterRequired: true,
      protectionSemanticStateRequired: false,
      exactEnoughForI98MethodologyMaterializationAfterThisGate: false,
      requirementImplementedByThisGate: false,
      forbiddenShortcuts: [
        'Do not reinterpret branch_clash identity as automatic source destruction.',
        'Do not reuse clash winner or rescue routing as a generic persistence verdict.',
      ],
      notes: [
        'No new relation identity is needed for 冲 because branch_clash already represents the source relation at the identity layer.',
        'The remaining gap is source-local damage/persistence effect settlement, preserving existing relative-force and rescue blockers.',
      ],
    },
    {
      sourceTerm: '生',
      upstreamBindingState: 'DIRECTIONAL_SUPPORT_BINDING_EFFECT_UNRESOLVED',
      requirementKind: 'EXISTING_RESOURCE_GENERATION_DIRECTION_REUSE_SETTLEMENT_ADAPTER_REQUIRED',
      newStructuralRelationKindRequired: false,
      existingStructuralRelationKindsMayBeReused: [],
      componentScopedBindingAdapterRequired: false,
      sourceLocalDirectionalEvidenceAdapterRequired: false,
      effectOrPersistenceSettlementAdapterRequired: true,
      protectionSemanticStateRequired: false,
      exactEnoughForI98MethodologyMaterializationAfterThisGate: false,
      requirementImplementedByThisGate: false,
      forbiddenShortcuts: [
        'Do not turn RESOURCE_GENERATION_SUPPORT_CHANNEL presence into ACTIVE, PERSISTED, or effective support.',
        'Do not assign additive weight or magnitude to generative support.',
      ],
      notes: [
        'I51/I52 already provide the correct directional evidence ontology for 生 through RESOURCE_GENERATION_SUPPORT_CHANNEL.',
        'The gap is not a new structural relation kind; it is the unresolved activation/persistence/effective-support settlement downstream of that direction.',
      ],
    },
    {
      sourceTerm: '卫',
      upstreamBindingState: 'NO_EXACT_REPOSITORY_BINDING',
      requirementKind: 'PROTECTION_EFFECT_STATE_TAXONOMY_REQUIRED',
      newStructuralRelationKindRequired: false,
      existingStructuralRelationKindsMayBeReused: [],
      componentScopedBindingAdapterRequired: false,
      sourceLocalDirectionalEvidenceAdapterRequired: false,
      effectOrPersistenceSettlementAdapterRequired: true,
      protectionSemanticStateRequired: true,
      exactEnoughForI98MethodologyMaterializationAfterThisGate: false,
      requirementImplementedByThisGate: false,
      forbiddenShortcuts: [
        'Do not create generic 卫 as a StructuralRelationKind.',
        'Do not equate I20d clash-rescue candidate routing with generic source protection.',
        'Do not infer protection merely because a support channel exists or lacks tracked contest.',
      ],
      notes: [
        '卫 describes a protective/support effect condition rather than a primitive pair/triple structural relation identity.',
        'The minimal taxonomy gap is a source-local protection semantic state with explicit evidence provenance and later persistence/effect settlement.',
      ],
    },
  ];
}

function commonMaterial(
  i99: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport,
) {
  return {
    reviewVersion:
      I100_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW_VERSION,
    upstreamI99ReviewId: i99.reviewId,
    sourceKeMustNotBeForcedIntoStructuralRelationKind: true as const,
    sourceWeiMustNotBeForcedIntoStructuralRelationKind: true as const,
    sourceHeMayReuseExistingCombinationKindsOnlyWithComponentScope: true as const,
    sourceChongMayReuseBranchClashIdentity: true as const,
    sourceChongBranchClashIdentityMeansDamageOutcomeResolved: false as const,
    sourceShengMayReuseResourceGenerationDirection: true as const,
    sourceShengResourceGenerationDirectionMeansPersistenceResolved: false as const,
    sourceKeExistingTextualControlBasisMeansCurrentChartControlIdentityResolved: false as const,
    sourceXingMayBeCollapsedIntoBranchClash: false as const,
    sourceWeiMayBeCollapsedIntoClashRescue: false as const,
    noTrackedRelationTouchMayProveAbsenceOfUnmodeledKeXingWei: false as const,
    currentRepositoryTaxonomySufficientForI98MethodologyMaterialization: false as const,
    taxonomyImplementationAuthorizedByThisGate: false as const,
    calculationCoreMutationAuthorizedByThisGate: false as const,
    structuralRelationKindMutationAuthorizedByThisGate: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    methodologyRegisteredByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI100ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReview(
  i99: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceRelationVocabularyRepositoryBindingReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport {
  const common = commonMaterial(i99);

  if (!exactI99Accepted(i99)) {
    return finalized({
      ...common,
      status: 'I99_UNRESOLVED_OR_INVALID',
      decision: 'VOCABULARY_GAP_REQUIREMENTS_NOT_REVIEWED',
      candidateSourceId: null,
      requirements: [],
      reviewedVocabularyCount: 0,
      newStructuralRelationKindRequiredCount: 0,
      sourceLocalDirectionalEvidenceAdapterRequiredCount: 0,
      componentScopedBindingAdapterRequiredCount: 0,
      protectionSemanticStateRequiredCount: 0,
      existingIdentityOrDirectionReuseCount: 0,
      allSixVocabularyRequirementsClassified: false,
      onlySourceXingRequiresNewStructuralRelationKind: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_RELATION_VOCABULARY_REPOSITORY_BINDING_REVIEW',
      notes: [
        'I100 requires the exact resolved fail-closed I99 six-term binding review before taxonomy-gap requirements can be classified.',
      ],
    });
  }

  const requirements = requirementItems();
  const newStructuralRelationKindRequiredCount = requirements.filter(
    (item) => item.newStructuralRelationKindRequired,
  ).length;
  const sourceLocalDirectionalEvidenceAdapterRequiredCount = requirements.filter(
    (item) => item.sourceLocalDirectionalEvidenceAdapterRequired,
  ).length;
  const componentScopedBindingAdapterRequiredCount = requirements.filter(
    (item) => item.componentScopedBindingAdapterRequired,
  ).length;
  const protectionSemanticStateRequiredCount = requirements.filter(
    (item) => item.protectionSemanticStateRequired,
  ).length;
  const existingIdentityOrDirectionReuseCount = requirements.filter((item) =>
    ['合', '冲', '生'].includes(item.sourceTerm),
  ).length;

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW',
    decision:
      'VOCABULARY_GAPS_CLASSIFIED_MINIMAL_TAXONOMY_AND_ADAPTER_REQUIREMENTS_FROZEN_IMPLEMENTATION_BLOCKED',
    candidateSourceId: i99.candidateSourceId,
    requirements,
    reviewedVocabularyCount: requirements.length,
    newStructuralRelationKindRequiredCount,
    sourceLocalDirectionalEvidenceAdapterRequiredCount,
    componentScopedBindingAdapterRequiredCount,
    protectionSemanticStateRequiredCount,
    existingIdentityOrDirectionReuseCount,
    allSixVocabularyRequirementsClassified: requirements.length === EXPECTED_BINDINGS.length,
    onlySourceXingRequiresNewStructuralRelationKind:
      newStructuralRelationKindRequiredCount === 1 &&
      requirements.find((item) => item.sourceTerm === '刑')?.newStructuralRelationKindRequired === true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW',
    notes: [
      'I100 classifies the smallest repository changes needed to preserve the six source terms without semantic collapse; it implements none of those changes.',
      'Only 刑 requires a new structural-relation identity family. 克 is modeled as a directed source-local control-evidence gap, while 卫 is modeled as a protection/effect-state gap.',
      '合 reuses existing combination kinds only through component-scoped routing; 冲 reuses branch_clash only at relation identity; 生 reuses RESOURCE_GENERATION_SUPPORT_CHANNEL only as directional evidence.',
      'Every term still requires downstream effect or persistence settlement before I98 methodology materialization can be considered exact enough.',
      'NO_TRACKED_RELATION_TOUCH cannot prove absence of 克, 刑, or 卫 while those semantics are not fully modeled in the tracked topology.',
      'No taxonomy mutation, methodology/rule creation, registry mutation, activation/persistence verdict, effective support, relative force, settlement, precedence, scoring, or strong/weak classification is authorized.',
    ],
  });
}
