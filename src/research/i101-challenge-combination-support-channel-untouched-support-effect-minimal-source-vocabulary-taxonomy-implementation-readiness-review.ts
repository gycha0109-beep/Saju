import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I98SourceRelationVocabularyTerm } from './i98-challenge-combination-support-channel-untouched-support-effect-conditional-persistence-methodology-definition-contract.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport,
  I100VocabularyTaxonomyRequirementKind,
} from './i100-challenge-combination-support-channel-untouched-support-effect-source-vocabulary-taxonomy-gap-requirements-review.js';

export const I101_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-minimal-source-vocabulary-taxonomy-implementation-readiness-review-v1';

export type I101ImplementationReadinessState =
  | 'RESEARCH_EVIDENCE_BINDING_ADAPTER_READY'
  | 'BLOCKED_EXACT_CONTROL_CYCLE_AUTHORITY_REQUIRED'
  | 'BLOCKED_EXACT_BRANCH_PUNISHMENT_IDENTITY_AUTHORITY_REQUIRED'
  | 'BLOCKED_PROTECTION_CRITERIA_AUTHORITY_REQUIRED';

export interface I101VocabularyImplementationReadinessItem {
  sourceTerm: I98SourceRelationVocabularyTerm;
  upstreamRequirementKind: I100VocabularyTaxonomyRequirementKind;
  readinessState: I101ImplementationReadinessState;
  researchEvidenceBindingAdapterMayBeContracted: boolean;
  calculationCoreMutationRequiredForNextStep: false;
  structuralRelationKindMutationRequiredForNextStep: boolean;
  newNormativeAuthorityRequiredBeforeImplementation: boolean;
  effectOrPersistenceOutcomeMayBeImplemented: false;
  executableMethodologyMayBeImplemented: false;
  blocker: string | null;
  notes: readonly string[];
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_MINIMAL_SOURCE_VOCABULARY_IMPLEMENTATION_READINESS'
    | 'I100_UNRESOLVED_OR_INVALID';
  decision:
    | 'EXISTING_SUBSTRATE_ADAPTER_SLICE_READY_NEW_TAXONOMY_AUTHORITY_GAPS_BLOCKED'
    | 'IMPLEMENTATION_READINESS_NOT_ESTABLISHED';
  upstreamI100ReviewId: string;
  candidateSourceId: string | null;
  items: readonly I101VocabularyImplementationReadinessItem[];
  implementationReadyTerms: readonly I98SourceRelationVocabularyTerm[];
  authorityBlockedTerms: readonly I98SourceRelationVocabularyTerm[];
  implementationReadyTermCount: number;
  authorityBlockedTermCount: number;
  existingSubstrateAdapterSliceReady: boolean;
  sourceHeResearchBindingAdapterReady: boolean;
  sourceChongResearchBindingAdapterReady: boolean;
  sourceShengResearchBindingAdapterReady: boolean;
  sourceKeBlockedOnExactControlCycleAuthority: boolean;
  sourceXingBlockedOnExactBranchPunishmentIdentityAuthority: boolean;
  sourceWeiBlockedOnProtectionCriteriaAuthority: boolean;
  sourceKeMayDeriveControlFromFiveElementFactsWithoutAuthority: false;
  sourceXingMayInventPunishmentPairsFromGeneralKnowledge: false;
  sourceWeiMayInventProtectionCriteriaFromSupportPresence: false;
  existingSubstrateAdapterSemanticCeiling: 'EVIDENCE_BINDING_ONLY';
  existingSubstrateAdapterMayEmitRelationOutcome: false;
  existingSubstrateAdapterMayEmitPersistenceOutcome: false;
  existingSubstrateAdapterMayEmitEffectiveSupport: false;
  existingSubstrateAdapterMayChangeTrackedTopologyMeaning: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  implementationContractMayBeFrozenForReadyTerms: boolean;
  directAdapterImplementationAuthorizedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW';
  notes: readonly string[];
}

const EXPECTED_REQUIREMENTS = Object.freeze([
  ['克', 'SOURCE_LOCAL_CONTROL_DIRECTION_EVIDENCE_ADAPTER_REQUIRED'],
  ['合', 'COMPONENT_SCOPED_EXISTING_COMBINATION_KIND_ADAPTER_REQUIRED'],
  ['刑', 'NEW_BRANCH_PUNISHMENT_RELATION_IDENTITY_TAXONOMY_REQUIRED'],
  ['冲', 'EXISTING_BRANCH_CLASH_IDENTITY_REUSE_EFFECT_ADAPTER_REQUIRED'],
  ['生', 'EXISTING_RESOURCE_GENERATION_DIRECTION_REUSE_SETTLEMENT_ADAPTER_REQUIRED'],
  ['卫', 'PROTECTION_EFFECT_STATE_TAXONOMY_REQUIRED'],
] as const satisfies readonly (readonly [I98SourceRelationVocabularyTerm, I100VocabularyTaxonomyRequirementKind])[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_vocabulary_implementation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI100Accepted(
  i100: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport,
): boolean {
  return (
    i100.status === 'RESOLVED_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW' &&
    i100.decision ===
      'VOCABULARY_GAPS_CLASSIFIED_MINIMAL_TAXONOMY_AND_ADAPTER_REQUIREMENTS_FROZEN_IMPLEMENTATION_BLOCKED' &&
    i100.candidateSourceId !== null &&
    i100.requirements.length === 6 &&
    i100.reviewedVocabularyCount === 6 &&
    i100.newStructuralRelationKindRequiredCount === 1 &&
    i100.sourceLocalDirectionalEvidenceAdapterRequiredCount === 1 &&
    i100.componentScopedBindingAdapterRequiredCount === 1 &&
    i100.protectionSemanticStateRequiredCount === 1 &&
    i100.existingIdentityOrDirectionReuseCount === 3 &&
    i100.allSixVocabularyRequirementsClassified &&
    i100.onlySourceXingRequiresNewStructuralRelationKind &&
    i100.requirements.every((item, index) => {
      const expected = EXPECTED_REQUIREMENTS[index];
      return (
        expected !== undefined &&
        item.sourceTerm === expected[0] &&
        item.requirementKind === expected[1] &&
        item.requirementImplementedByThisGate === false &&
        item.exactEnoughForI98MethodologyMaterializationAfterThisGate === false
      );
    }) &&
    i100.sourceKeMustNotBeForcedIntoStructuralRelationKind &&
    i100.sourceWeiMustNotBeForcedIntoStructuralRelationKind &&
    i100.sourceHeMayReuseExistingCombinationKindsOnlyWithComponentScope &&
    i100.sourceChongMayReuseBranchClashIdentity &&
    i100.sourceChongBranchClashIdentityMeansDamageOutcomeResolved === false &&
    i100.sourceShengMayReuseResourceGenerationDirection &&
    i100.sourceShengResourceGenerationDirectionMeansPersistenceResolved === false &&
    i100.sourceKeExistingTextualControlBasisMeansCurrentChartControlIdentityResolved === false &&
    i100.sourceXingMayBeCollapsedIntoBranchClash === false &&
    i100.sourceWeiMayBeCollapsedIntoClashRescue === false &&
    i100.noTrackedRelationTouchMayProveAbsenceOfUnmodeledKeXingWei === false &&
    i100.currentRepositoryTaxonomySufficientForI98MethodologyMaterialization === false &&
    i100.taxonomyImplementationAuthorizedByThisGate === false &&
    i100.calculationCoreMutationAuthorizedByThisGate === false &&
    i100.structuralRelationKindMutationAuthorizedByThisGate === false &&
    i100.methodologyDefinitionCreatedByThisGate === false &&
    i100.ruleDefinitionCreatedByThisGate === false &&
    i100.registrySnapshotMutatedByThisGate === false &&
    i100.sourceActivationVerdictAuthorized === false &&
    i100.sourcePersistenceVerdictAuthorized === false &&
    i100.sourceEffectiveSupportVerdictAuthorized === false &&
    i100.relativeForceVerdictAuthorized === false &&
    i100.crossRelationPrecedenceAuthorized === false &&
    i100.classificationAuthorized === false &&
    i100.numericScoringAuthorized === false &&
    i100.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW'
  );
}

function readinessItems(): readonly I101VocabularyImplementationReadinessItem[] {
  return [
    {
      sourceTerm: '克',
      upstreamRequirementKind: 'SOURCE_LOCAL_CONTROL_DIRECTION_EVIDENCE_ADAPTER_REQUIRED',
      readinessState: 'BLOCKED_EXACT_CONTROL_CYCLE_AUTHORITY_REQUIRED',
      researchEvidenceBindingAdapterMayBeContracted: false,
      calculationCoreMutationRequiredForNextStep: false,
      structuralRelationKindMutationRequiredForNextStep: false,
      newNormativeAuthorityRequiredBeforeImplementation: true,
      effectOrPersistenceOutcomeMayBeImplemented: false,
      executableMethodologyMayBeImplemented: false,
      blocker: 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED',
      notes: [
        'Canonical facts expose each stem/branch FiveElement, but the current repository does not register a governed current-chart 克 direction contract that can be referenced here.',
        'Element facts alone do not authorize inventing the control cycle or translating control direction into damage.',
      ],
    },
    {
      sourceTerm: '合',
      upstreamRequirementKind: 'COMPONENT_SCOPED_EXISTING_COMBINATION_KIND_ADAPTER_REQUIRED',
      readinessState: 'RESEARCH_EVIDENCE_BINDING_ADAPTER_READY',
      researchEvidenceBindingAdapterMayBeContracted: true,
      calculationCoreMutationRequiredForNextStep: false,
      structuralRelationKindMutationRequiredForNextStep: false,
      newNormativeAuthorityRequiredBeforeImplementation: false,
      effectOrPersistenceOutcomeMayBeImplemented: false,
      executableMethodologyMayBeImplemented: false,
      blocker: null,
      notes: [
        'Existing structural relation candidates already preserve stem_five_combination, branch_six_combination, and branch_three_combination identities.',
        'A research-only adapter contract may map source 合 to that component-scoped set without assigning binding, transformation, rescue, or persistence outcomes.',
      ],
    },
    {
      sourceTerm: '刑',
      upstreamRequirementKind: 'NEW_BRANCH_PUNISHMENT_RELATION_IDENTITY_TAXONOMY_REQUIRED',
      readinessState: 'BLOCKED_EXACT_BRANCH_PUNISHMENT_IDENTITY_AUTHORITY_REQUIRED',
      researchEvidenceBindingAdapterMayBeContracted: false,
      calculationCoreMutationRequiredForNextStep: false,
      structuralRelationKindMutationRequiredForNextStep: true,
      newNormativeAuthorityRequiredBeforeImplementation: true,
      effectOrPersistenceOutcomeMayBeImplemented: false,
      executableMethodologyMayBeImplemented: false,
      blocker: 'EXACT_BRANCH_PUNISHMENT_MEMBERSHIP_AND_IDENTITY_AUTHORITY_NOT_REGISTERED',
      notes: [
        'The repository has no existing 刑 relation identity to adapt.',
        'A general mention of 刑 in the candidate source does not by itself freeze exact branch membership, self-punishment conventions, or relation arity.',
      ],
    },
    {
      sourceTerm: '冲',
      upstreamRequirementKind: 'EXISTING_BRANCH_CLASH_IDENTITY_REUSE_EFFECT_ADAPTER_REQUIRED',
      readinessState: 'RESEARCH_EVIDENCE_BINDING_ADAPTER_READY',
      researchEvidenceBindingAdapterMayBeContracted: true,
      calculationCoreMutationRequiredForNextStep: false,
      structuralRelationKindMutationRequiredForNextStep: false,
      newNormativeAuthorityRequiredBeforeImplementation: false,
      effectOrPersistenceOutcomeMayBeImplemented: false,
      executableMethodologyMayBeImplemented: false,
      blocker: null,
      notes: [
        'Existing branch_clash identity and its source catalog are sufficient for a source-vocabulary identity adapter.',
        'The adapter must stop at identity and preserve all damage, rescue, relative-force, and persistence blockers.',
      ],
    },
    {
      sourceTerm: '生',
      upstreamRequirementKind: 'EXISTING_RESOURCE_GENERATION_DIRECTION_REUSE_SETTLEMENT_ADAPTER_REQUIRED',
      readinessState: 'RESEARCH_EVIDENCE_BINDING_ADAPTER_READY',
      researchEvidenceBindingAdapterMayBeContracted: true,
      calculationCoreMutationRequiredForNextStep: false,
      structuralRelationKindMutationRequiredForNextStep: false,
      newNormativeAuthorityRequiredBeforeImplementation: false,
      effectOrPersistenceOutcomeMayBeImplemented: false,
      executableMethodologyMayBeImplemented: false,
      blocker: null,
      notes: [
        'I51/I52 already expose RESOURCE_GENERATION_SUPPORT_CHANNEL as directional support evidence.',
        'A source-vocabulary adapter may reuse that direction only; activation, persistence, effective support, and magnitude remain unresolved.',
      ],
    },
    {
      sourceTerm: '卫',
      upstreamRequirementKind: 'PROTECTION_EFFECT_STATE_TAXONOMY_REQUIRED',
      readinessState: 'BLOCKED_PROTECTION_CRITERIA_AUTHORITY_REQUIRED',
      researchEvidenceBindingAdapterMayBeContracted: false,
      calculationCoreMutationRequiredForNextStep: false,
      structuralRelationKindMutationRequiredForNextStep: false,
      newNormativeAuthorityRequiredBeforeImplementation: true,
      effectOrPersistenceOutcomeMayBeImplemented: false,
      executableMethodologyMayBeImplemented: false,
      blocker: 'GENERIC_SOURCE_PROTECTION_CRITERIA_AND_EVIDENCE_CONTRACT_NOT_REGISTERED',
      notes: [
        'The repository has no generic protection state and I20d clash-rescue routing is too narrow to substitute.',
        'Support presence or absence of tracked contest cannot be promoted into protection without a sourced criteria contract.',
      ],
    },
  ];
}

function commonMaterial(
  i100: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport,
) {
  return {
    reviewVersion:
      I101_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW_VERSION,
    upstreamI100ReviewId: i100.reviewId,
    sourceKeMayDeriveControlFromFiveElementFactsWithoutAuthority: false as const,
    sourceXingMayInventPunishmentPairsFromGeneralKnowledge: false as const,
    sourceWeiMayInventProtectionCriteriaFromSupportPresence: false as const,
    existingSubstrateAdapterSemanticCeiling: 'EVIDENCE_BINDING_ONLY' as const,
    existingSubstrateAdapterMayEmitRelationOutcome: false as const,
    existingSubstrateAdapterMayEmitPersistenceOutcome: false as const,
    existingSubstrateAdapterMayEmitEffectiveSupport: false as const,
    existingSubstrateAdapterMayChangeTrackedTopologyMeaning: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    directAdapterImplementationAuthorizedByThisGate: false as const,
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

export function buildI101ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReview(
  i100: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceVocabularyTaxonomyGapRequirementsReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport {
  const common = commonMaterial(i100);

  if (!exactI100Accepted(i100)) {
    return finalized({
      ...common,
      status: 'I100_UNRESOLVED_OR_INVALID',
      decision: 'IMPLEMENTATION_READINESS_NOT_ESTABLISHED',
      candidateSourceId: null,
      items: [],
      implementationReadyTerms: [],
      authorityBlockedTerms: [],
      implementationReadyTermCount: 0,
      authorityBlockedTermCount: 0,
      existingSubstrateAdapterSliceReady: false,
      sourceHeResearchBindingAdapterReady: false,
      sourceChongResearchBindingAdapterReady: false,
      sourceShengResearchBindingAdapterReady: false,
      sourceKeBlockedOnExactControlCycleAuthority: false,
      sourceXingBlockedOnExactBranchPunishmentIdentityAuthority: false,
      sourceWeiBlockedOnProtectionCriteriaAuthority: false,
      implementationContractMayBeFrozenForReadyTerms: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_VOCABULARY_TAXONOMY_GAP_REQUIREMENTS_REVIEW',
      notes: [
        'I101 requires the exact resolved I100 six-term taxonomy-gap requirements review before any implementation-readiness slice can be opened.',
      ],
    });
  }

  const items = readinessItems();
  const implementationReadyTerms = items
    .filter((item) => item.readinessState === 'RESEARCH_EVIDENCE_BINDING_ADAPTER_READY')
    .map((item) => item.sourceTerm);
  const authorityBlockedTerms = items
    .filter((item) => item.readinessState !== 'RESEARCH_EVIDENCE_BINDING_ADAPTER_READY')
    .map((item) => item.sourceTerm);

  return finalized({
    ...common,
    status: 'RESOLVED_MINIMAL_SOURCE_VOCABULARY_IMPLEMENTATION_READINESS',
    decision: 'EXISTING_SUBSTRATE_ADAPTER_SLICE_READY_NEW_TAXONOMY_AUTHORITY_GAPS_BLOCKED',
    candidateSourceId: i100.candidateSourceId,
    items,
    implementationReadyTerms,
    authorityBlockedTerms,
    implementationReadyTermCount: implementationReadyTerms.length,
    authorityBlockedTermCount: authorityBlockedTerms.length,
    existingSubstrateAdapterSliceReady:
      implementationReadyTerms.join('|') === ['合', '冲', '生'].join('|'),
    sourceHeResearchBindingAdapterReady: implementationReadyTerms.includes('合'),
    sourceChongResearchBindingAdapterReady: implementationReadyTerms.includes('冲'),
    sourceShengResearchBindingAdapterReady: implementationReadyTerms.includes('生'),
    sourceKeBlockedOnExactControlCycleAuthority: authorityBlockedTerms.includes('克'),
    sourceXingBlockedOnExactBranchPunishmentIdentityAuthority: authorityBlockedTerms.includes('刑'),
    sourceWeiBlockedOnProtectionCriteriaAuthority: authorityBlockedTerms.includes('卫'),
    implementationContractMayBeFrozenForReadyTerms: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT',
    notes: [
      'I101 opens only a contract-design path for research evidence-binding adapters for 合, 冲, and 生. It does not authorize implementing those adapters in this gate.',
      '克 remains blocked because FiveElement facts do not themselves constitute a governed control-cycle relation contract.',
      '刑 remains blocked because exact punishment membership, arity, and conventions are not registered authority in the repository.',
      '卫 remains blocked because generic protection criteria are not established and cannot be inferred from support presence or clash-rescue candidates.',
      'The ready adapter slice may bind source vocabulary to existing evidence identities/directions only and may not change NO_TRACKED_RELATION_TOUCH semantics.',
      'No relation outcome, persistence outcome, effective support, methodology/rule creation, settlement, precedence, scoring, or strong/weak classification is authorized.',
    ],
  });
}
