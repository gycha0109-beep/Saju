import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { StructuralRelationKind } from '../calculation/structural-relations.js';
import type { ChallengeCombinationSupportChannelKind } from './i51-challenge-combination-support-interference-effect-methodology-review.js';
import type { I98SourceRelationVocabularyTerm } from './i98-challenge-combination-support-channel-untouched-support-effect-conditional-persistence-methodology-definition-contract.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport } from './i101-challenge-combination-support-channel-untouched-support-effect-minimal-source-vocabulary-taxonomy-implementation-readiness-review.js';

export const I102_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-existing-substrate-source-vocabulary-adapter-contract-v1';

export type I102ReadyVocabularyTerm = Extract<I98SourceRelationVocabularyTerm, '合' | '冲' | '生'>;
export type I102BlockedVocabularyTerm = Extract<I98SourceRelationVocabularyTerm, '克' | '刑' | '卫'>;

export type I102AdapterInputDomain =
  | 'STRUCTURAL_RELATION_IDENTITY'
  | 'SUPPORT_CHANNEL_DIRECTIONAL_EVIDENCE';

export type I102AdapterOutputSemantic =
  | 'SOURCE_HE_COMPONENT_SCOPED_RELATION_IDENTITY_BINDING'
  | 'SOURCE_CHONG_BRANCH_CLASH_IDENTITY_BINDING'
  | 'SOURCE_SHENG_RESOURCE_GENERATION_DIRECTION_BINDING';

export interface I102ExistingSubstrateVocabularyAdapterContractItem {
  sourceTerm: I102ReadyVocabularyTerm;
  inputDomain: I102AdapterInputDomain;
  acceptedStructuralRelationKinds: readonly StructuralRelationKind[];
  acceptedSupportChannelKinds: readonly ChallengeCombinationSupportChannelKind[];
  outputSemantic: I102AdapterOutputSemantic;
  preserveRelationId: boolean;
  preserveParticipantOrSourcePosition: boolean;
  preserveComponentScope: boolean;
  exactInputIdentityRequired: true;
  missingInputBehavior: 'FAIL_CLOSED_NO_BINDING';
  ambiguousInputBehavior: 'FAIL_CLOSED_NO_BINDING';
  outputEvidenceOnly: true;
  mayEmitBindingOutcome: false;
  mayEmitTransformationOutcome: false;
  mayEmitDamageOutcome: false;
  mayEmitRescueOutcome: false;
  mayEmitActivationOutcome: false;
  mayEmitPersistenceOutcome: false;
  mayEmitEffectiveSupportOutcome: false;
  mayEmitRelativeForceOutcome: false;
  mayEmitPrecedenceOutcome: false;
  mayEmitNumericWeight: false;
  notes: readonly string[];
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport {
  contractId: string;
  contractVersion: string;
  status: 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT' | 'I101_UNRESOLVED_OR_INVALID';
  decision:
    | 'HE_CHONG_SHENG_EVIDENCE_BINDING_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE'
    | 'ADAPTER_CONTRACT_NOT_FROZEN';
  upstreamI101ReviewId: string;
  candidateSourceId: string | null;
  readyTerms: readonly I102ReadyVocabularyTerm[];
  blockedTerms: readonly I102BlockedVocabularyTerm[];
  adapters: readonly I102ExistingSubstrateVocabularyAdapterContractItem[];
  adapterCount: number;
  allReadyTermsContracted: boolean;
  blockedTermsExplicitlyExcluded: boolean;
  sourceHeAcceptedStructuralRelationKinds: readonly StructuralRelationKind[];
  sourceHeGenericRelationKindCreated: false;
  sourceHeComponentScopeMustBePreserved: true;
  sourceChongAcceptedStructuralRelationKinds: readonly StructuralRelationKind[];
  sourceChongIdentityOnly: true;
  sourceChongDamageOutcomeStillUnresolved: true;
  sourceShengAcceptedSupportChannelKinds: readonly ChallengeCombinationSupportChannelKind[];
  sourceShengDirectionOnly: true;
  sourceShengPersistenceStillUnresolved: true;
  sourceKeAdapterIncluded: false;
  sourceXingAdapterIncluded: false;
  sourceWeiAdapterIncluded: false;
  adapterMayConsumeOnlyExistingAuthorizedSubstrate: true;
  adapterMaySynthesizeMissingSubstrate: false;
  adapterMayInferUntrackedVocabularyAbsence: false;
  adapterMayChangeNoTrackedRelationTouchMeaning: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  adapterSemanticCeiling: 'EVIDENCE_BINDING_ONLY';
  adapterImplementationPerformedByThisGate: false;
  adapterImplementationAuthorizedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW';
  notes: readonly string[];
}

const READY_TERMS = Object.freeze(['合', '冲', '生'] as const satisfies readonly I102ReadyVocabularyTerm[]);
const BLOCKED_TERMS = Object.freeze(['克', '刑', '卫'] as const satisfies readonly I102BlockedVocabularyTerm[]);
const HE_KINDS = Object.freeze([
  'stem_five_combination',
  'branch_six_combination',
  'branch_three_combination',
] as const satisfies readonly StructuralRelationKind[]);
const CHONG_KINDS = Object.freeze(['branch_clash'] as const satisfies readonly StructuralRelationKind[]);
const SHENG_CHANNELS = Object.freeze([
  'RESOURCE_GENERATION_SUPPORT_CHANNEL',
] as const satisfies readonly ChallengeCombinationSupportChannelKind[]);

const ADAPTERS = Object.freeze([
  {
    sourceTerm: '合',
    inputDomain: 'STRUCTURAL_RELATION_IDENTITY',
    acceptedStructuralRelationKinds: HE_KINDS,
    acceptedSupportChannelKinds: [],
    outputSemantic: 'SOURCE_HE_COMPONENT_SCOPED_RELATION_IDENTITY_BINDING',
    preserveRelationId: true,
    preserveParticipantOrSourcePosition: true,
    preserveComponentScope: true,
    exactInputIdentityRequired: true,
    missingInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    ambiguousInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    outputEvidenceOnly: true,
    mayEmitBindingOutcome: false,
    mayEmitTransformationOutcome: false,
    mayEmitDamageOutcome: false,
    mayEmitRescueOutcome: false,
    mayEmitActivationOutcome: false,
    mayEmitPersistenceOutcome: false,
    mayEmitEffectiveSupportOutcome: false,
    mayEmitRelativeForceOutcome: false,
    mayEmitPrecedenceOutcome: false,
    mayEmitNumericWeight: false,
    notes: [
      '合 remains a source-vocabulary wrapper around the exact existing relation identity and component scope; it is not a new generic relation kind.',
      'Structural membership does not imply binding, transformation, rescue, persistence, or any post-interaction outcome.',
    ],
  },
  {
    sourceTerm: '冲',
    inputDomain: 'STRUCTURAL_RELATION_IDENTITY',
    acceptedStructuralRelationKinds: CHONG_KINDS,
    acceptedSupportChannelKinds: [],
    outputSemantic: 'SOURCE_CHONG_BRANCH_CLASH_IDENTITY_BINDING',
    preserveRelationId: true,
    preserveParticipantOrSourcePosition: true,
    preserveComponentScope: true,
    exactInputIdentityRequired: true,
    missingInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    ambiguousInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    outputEvidenceOnly: true,
    mayEmitBindingOutcome: false,
    mayEmitTransformationOutcome: false,
    mayEmitDamageOutcome: false,
    mayEmitRescueOutcome: false,
    mayEmitActivationOutcome: false,
    mayEmitPersistenceOutcome: false,
    mayEmitEffectiveSupportOutcome: false,
    mayEmitRelativeForceOutcome: false,
    mayEmitPrecedenceOutcome: false,
    mayEmitNumericWeight: false,
    notes: [
      '冲 may bind only to an exact branch_clash identity already emitted by the structural relation substrate.',
      'The binding does not settle damage, destruction, rescue, relative force, or source persistence.',
    ],
  },
  {
    sourceTerm: '生',
    inputDomain: 'SUPPORT_CHANNEL_DIRECTIONAL_EVIDENCE',
    acceptedStructuralRelationKinds: [],
    acceptedSupportChannelKinds: SHENG_CHANNELS,
    outputSemantic: 'SOURCE_SHENG_RESOURCE_GENERATION_DIRECTION_BINDING',
    preserveRelationId: false,
    preserveParticipantOrSourcePosition: true,
    preserveComponentScope: true,
    exactInputIdentityRequired: true,
    missingInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    ambiguousInputBehavior: 'FAIL_CLOSED_NO_BINDING',
    outputEvidenceOnly: true,
    mayEmitBindingOutcome: false,
    mayEmitTransformationOutcome: false,
    mayEmitDamageOutcome: false,
    mayEmitRescueOutcome: false,
    mayEmitActivationOutcome: false,
    mayEmitPersistenceOutcome: false,
    mayEmitEffectiveSupportOutcome: false,
    mayEmitRelativeForceOutcome: false,
    mayEmitPrecedenceOutcome: false,
    mayEmitNumericWeight: false,
    notes: [
      '生 may bind only to an exact RESOURCE_GENERATION_SUPPORT_CHANNEL with its source pillar/component position preserved.',
      'Directional support evidence is not activation, persistence, effective support, or magnitude.',
    ],
  },
] as const satisfies readonly I102ExistingSubstrateVocabularyAdapterContractItem[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport, 'contractId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport {
  return {
    contractId: `challenge_combination_support_channel_untouched_support_existing_substrate_adapter_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI101Accepted(
  i101: ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport,
): boolean {
  return (
    i101.status === 'RESOLVED_MINIMAL_SOURCE_VOCABULARY_IMPLEMENTATION_READINESS' &&
    i101.decision === 'EXISTING_SUBSTRATE_ADAPTER_SLICE_READY_NEW_TAXONOMY_AUTHORITY_GAPS_BLOCKED' &&
    i101.candidateSourceId !== null &&
    i101.implementationReadyTerms.join('|') === READY_TERMS.join('|') &&
    i101.authorityBlockedTerms.join('|') === BLOCKED_TERMS.join('|') &&
    i101.implementationReadyTermCount === 3 &&
    i101.authorityBlockedTermCount === 3 &&
    i101.existingSubstrateAdapterSliceReady &&
    i101.sourceHeResearchBindingAdapterReady &&
    i101.sourceChongResearchBindingAdapterReady &&
    i101.sourceShengResearchBindingAdapterReady &&
    i101.sourceKeBlockedOnExactControlCycleAuthority &&
    i101.sourceXingBlockedOnExactBranchPunishmentIdentityAuthority &&
    i101.sourceWeiBlockedOnProtectionCriteriaAuthority &&
    i101.sourceKeMayDeriveControlFromFiveElementFactsWithoutAuthority === false &&
    i101.sourceXingMayInventPunishmentPairsFromGeneralKnowledge === false &&
    i101.sourceWeiMayInventProtectionCriteriaFromSupportPresence === false &&
    i101.existingSubstrateAdapterSemanticCeiling === 'EVIDENCE_BINDING_ONLY' &&
    i101.existingSubstrateAdapterMayEmitRelationOutcome === false &&
    i101.existingSubstrateAdapterMayEmitPersistenceOutcome === false &&
    i101.existingSubstrateAdapterMayEmitEffectiveSupport === false &&
    i101.existingSubstrateAdapterMayChangeTrackedTopologyMeaning === false &&
    i101.noTrackedRelationTouchSemanticsRemainUnchanged &&
    i101.implementationContractMayBeFrozenForReadyTerms &&
    i101.directAdapterImplementationAuthorizedByThisGate === false &&
    i101.calculationCoreMutationAuthorizedByThisGate === false &&
    i101.structuralRelationKindMutationAuthorizedByThisGate === false &&
    i101.methodologyDefinitionCreatedByThisGate === false &&
    i101.ruleDefinitionCreatedByThisGate === false &&
    i101.registrySnapshotMutatedByThisGate === false &&
    i101.sourceActivationVerdictAuthorized === false &&
    i101.sourcePersistenceVerdictAuthorized === false &&
    i101.sourceEffectiveSupportVerdictAuthorized === false &&
    i101.relativeForceVerdictAuthorized === false &&
    i101.crossRelationPrecedenceAuthorized === false &&
    i101.classificationAuthorized === false &&
    i101.numericScoringAuthorized === false &&
    i101.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT'
  );
}

function commonMaterial(
  i101: ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport,
) {
  return {
    contractVersion:
      I102_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT_VERSION,
    upstreamI101ReviewId: i101.reviewId,
    readyTerms: READY_TERMS,
    blockedTerms: BLOCKED_TERMS,
    sourceHeAcceptedStructuralRelationKinds: HE_KINDS,
    sourceHeGenericRelationKindCreated: false as const,
    sourceHeComponentScopeMustBePreserved: true as const,
    sourceChongAcceptedStructuralRelationKinds: CHONG_KINDS,
    sourceChongIdentityOnly: true as const,
    sourceChongDamageOutcomeStillUnresolved: true as const,
    sourceShengAcceptedSupportChannelKinds: SHENG_CHANNELS,
    sourceShengDirectionOnly: true as const,
    sourceShengPersistenceStillUnresolved: true as const,
    sourceKeAdapterIncluded: false as const,
    sourceXingAdapterIncluded: false as const,
    sourceWeiAdapterIncluded: false as const,
    adapterMayConsumeOnlyExistingAuthorizedSubstrate: true as const,
    adapterMaySynthesizeMissingSubstrate: false as const,
    adapterMayInferUntrackedVocabularyAbsence: false as const,
    adapterMayChangeNoTrackedRelationTouchMeaning: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    adapterSemanticCeiling: 'EVIDENCE_BINDING_ONLY' as const,
    adapterImplementationPerformedByThisGate: false as const,
    adapterImplementationAuthorizedByThisGate: false as const,
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

export function buildI102ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContract(
  i101: ChallengeCombinationSupportChannelUntouchedSupportEffectMinimalSourceVocabularyTaxonomyImplementationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyAdapterContractReport {
  const common = commonMaterial(i101);

  if (!exactI101Accepted(i101)) {
    return finalized({
      ...common,
      status: 'I101_UNRESOLVED_OR_INVALID',
      decision: 'ADAPTER_CONTRACT_NOT_FROZEN',
      candidateSourceId: null,
      adapters: [],
      adapterCount: 0,
      allReadyTermsContracted: false,
      blockedTermsExplicitlyExcluded: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_MINIMAL_SOURCE_VOCABULARY_TAXONOMY_IMPLEMENTATION_READINESS_REVIEW',
      notes: [
        'I102 requires the exact resolved I101 ready/blocked split before the existing-substrate adapter contract can be frozen.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_ADAPTER_CONTRACT',
    decision: 'HE_CHONG_SHENG_EVIDENCE_BINDING_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE',
    candidateSourceId: i101.candidateSourceId,
    adapters: ADAPTERS,
    adapterCount: ADAPTERS.length,
    allReadyTermsContracted: ADAPTERS.map((item) => item.sourceTerm).join('|') === READY_TERMS.join('|'),
    blockedTermsExplicitlyExcluded: ADAPTERS.every(
      (item) => !(BLOCKED_TERMS as readonly string[]).includes(item.sourceTerm),
    ),
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_EVIDENCE',
    notes: [
      'I102 freezes only the adapter contract for 合, 冲, and 生; no adapter executes in this gate.',
      'Every adapter must consume an exact existing authorized substrate identity/direction and fail closed when it is absent or ambiguous.',
      '克, 刑, and 卫 are explicitly excluded because their normative authority gaps remain unresolved.',
      'The adapter layer is evidence-binding only and cannot create or alter calculation facts, structural relation kinds, tracked-topology semantics, or post-interaction outcomes.',
      'NO_TRACKED_RELATION_TOUCH remains defined only over the currently tracked relation topology and cannot be expanded by inference through this contract.',
      'Activation, persistence, effective support, relative force, clash settlement, rescue, precedence, scoring, and classification remain unresolved or unauthorized.',
    ],
  });
}
