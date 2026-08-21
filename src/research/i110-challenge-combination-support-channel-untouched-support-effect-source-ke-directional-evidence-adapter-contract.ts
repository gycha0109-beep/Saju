import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport } from './i109-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-promotion-readiness-review.js';

export const I110_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-directional-evidence-adapter-contract-v1';

export type I110KeElement = '木' | '土' | '水' | '火' | '金';
export type I110KeComponentScope = 'VISIBLE_STEM' | 'EARTHLY_BRANCH_HIDDEN_STEM';

export interface I110KeControlCycleEdge {
  sourceElement: I110KeElement;
  targetElement: I110KeElement;
  relation: '克';
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport {
  contractId: string;
  contractVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT'
    | 'I109_UNRESOLVED_OR_INVALID';
  decision:
    | 'SOURCE_KE_COMPONENT_SCOPED_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE'
    | 'SOURCE_KE_ADAPTER_CONTRACT_NOT_FROZEN';
  upstreamI109ReviewId: string;
  candidateSourceId: string | null;
  sourceTerm: '克' | null;
  inputDomain: 'COMPONENT_ELEMENT_DIRECTIONAL_EVIDENCE' | 'NONE';
  outputSemantic: 'SOURCE_KE_COMPONENT_SCOPED_CONTROL_DIRECTION_BINDING' | 'NONE';
  semanticCeiling: 'EVIDENCE_BINDING_ONLY' | 'NONE';
  exactControlCycle: readonly I110KeControlCycleEdge[];
  exactControlCycleEdgeCount: number;
  exactFiveElementControlCycleRequired: boolean;
  acceptedSourceComponentScopes: readonly I110KeComponentScope[];
  acceptedTargetComponentScopes: readonly I110KeComponentScope[];
  visibleStemToVisibleStemBindingContracted: boolean;
  visibleStemToBranchHiddenStemBindingContracted: boolean;
  branchHiddenStemToVisibleStemBindingContracted: boolean;
  branchHiddenStemToBranchHiddenStemBindingContracted: boolean;
  rawEarthlyBranchElementParticipantAllowed: false;
  sourceComponentIdentityRequired: boolean;
  targetComponentIdentityRequired: boolean;
  sourceElementIdentityRequired: boolean;
  targetElementIdentityRequired: boolean;
  sourceToTargetDirectionMustMatchExactCycle: boolean;
  reversedDirectionMayBeInferred: false;
  transitiveControlMayBeInferred: false;
  generalKnowledgeFallbackAllowed: false;
  fiveElementLabelPresenceAloneMayCreateBinding: false;
  missingComponentIdentityBehavior: 'FAIL_CLOSED_NO_BINDING' | 'NONE';
  ambiguousComponentIdentityBehavior: 'FAIL_CLOSED_NO_BINDING' | 'NONE';
  missingElementIdentityBehavior: 'FAIL_CLOSED_NO_BINDING' | 'NONE';
  ambiguousElementIdentityBehavior: 'FAIL_CLOSED_NO_BINDING' | 'NONE';
  nonCycleElementPairBehavior: 'FAIL_CLOSED_NO_BINDING' | 'NONE';
  outputEvidenceOnly: boolean;
  mayEmitDamageOutcome: false;
  mayEmitDamageMagnitude: false;
  mayEmitSettlementOutcome: false;
  mayEmitActivationOutcome: false;
  mayEmitPersistenceOutcome: false;
  mayEmitEffectiveSupportOutcome: false;
  mayEmitRelativeForceOutcome: false;
  mayEmitPrecedenceOutcome: false;
  mayEmitNumericWeight: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: boolean;
  adapterMayChangeNoTrackedRelationTouchMeaning: false;
  structuralRelationKindMutationAuthorizedByThisGate: false;
  keStructuralRelationKindCreatedByThisGate: false;
  adapterImplementationPerformedByThisGate: false;
  adapterImplementationAuthorizedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW';
  notes: readonly string[];
}

const CONTROL_CYCLE = Object.freeze([
  { sourceElement: '木', targetElement: '土', relation: '克' },
  { sourceElement: '土', targetElement: '水', relation: '克' },
  { sourceElement: '水', targetElement: '火', relation: '克' },
  { sourceElement: '火', targetElement: '金', relation: '克' },
  { sourceElement: '金', targetElement: '木', relation: '克' },
] as const satisfies readonly I110KeControlCycleEdge[]);

const COMPONENT_SCOPES = Object.freeze([
  'VISIBLE_STEM',
  'EARTHLY_BRANCH_HIDDEN_STEM',
] as const satisfies readonly I110KeComponentScope[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport, 'contractId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport {
  return {
    contractId: `challenge_combination_support_channel_untouched_support_ke_directional_adapter_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI109Accepted(
  i109: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport,
): boolean {
  return (
    i109.status === 'RESOLVED_SOURCE_KE_AUTHORITY_PROMOTION_READINESS' &&
    i109.decision ===
      'KE_FOUR_OF_FOUR_COVERAGE_CAN_ENTER_RESEARCH_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_DIRECT_IMPLEMENTATION_AND_EFFECT_PROMOTION_BLOCKED' &&
    i109.candidateSourceId !== null &&
    i109.candidateSourceClass === 'practitioner_secondary' &&
    i109.allFourKeAuthorityRequirementsSatisfied &&
    i109.authorityCoverageGapSatisfied &&
    i109.keAuthorityGapClosed === false &&
    i109.promotionLifecycleEntryReady &&
    i109.authorizedEntryStage === 'RESEARCH_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT' &&
    i109.semanticCeiling === 'EVIDENCE_BINDING_ONLY' &&
    i109.researchKeDirectionalEvidenceAdapterContractRequired &&
    i109.exactFiveElementControlCycleMustBePreserved &&
    i109.sourceToTargetDirectionMustBePreserved &&
    i109.sourceAndTargetComponentIdentityRequired &&
    i109.visibleStemApplicabilityAllowedByContract &&
    i109.branchHiddenStemApplicabilityAllowedByContract &&
    i109.rawBranchElementDirectControlRuleAuthorized === false &&
    i109.branchApplicabilityScope ===
      'EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK' &&
    i109.adapterMustKeepControlDirectionSeparateFromDamageOutcome &&
    i109.adapterMustKeepControlDirectionSeparateFromDamageMagnitude &&
    i109.adapterMayEmitDamageOutcome === false &&
    i109.adapterMayEmitDamageMagnitude === false &&
    i109.adapterMayEmitSettlementOutcome === false &&
    i109.adapterMayEmitActivationVerdict === false &&
    i109.adapterMayEmitPersistenceVerdict === false &&
    i109.adapterMayEmitEffectiveSupportVerdict === false &&
    i109.adapterMayEmitRelativeForceVerdict === false &&
    i109.adapterMayEmitPrecedenceVerdict === false &&
    i109.structuralRelationKindMutationAuthorized === false &&
    i109.keStructuralRelationKindRequired === false &&
    i109.directSourceToExecutableAdapterPromotionAuthorized === false &&
    i109.keDirectionalAdapterImplementationAuthorizedByThisGate === false &&
    i109.ruleDefinitionCreationAuthorized === false &&
    i109.methodologyDefinitionCreationAuthorized === false &&
    i109.registrySnapshotMutationAuthorized === false &&
    i109.stagingPromotionAuthorized === false &&
    i109.productionPromotionAuthorized === false &&
    i109.singlePractitionerSecondarySourceProductionQualitySufficient === false &&
    i109.productionMultiSourceSupportStillRequired &&
    i109.sourceActivationVerdictAuthorized === false &&
    i109.sourcePersistenceVerdictAuthorized === false &&
    i109.sourceEffectiveSupportVerdictAuthorized === false &&
    i109.relativeForceVerdictAuthorized === false &&
    i109.clashSettlementAuthorized === false &&
    i109.crossRelationPrecedenceAuthorized === false &&
    i109.classificationAuthorized === false &&
    i109.numericScoringAuthorized === false &&
    i109.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT'
  );
}

function commonMaterial(
  i109: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport,
) {
  return {
    contractVersion:
      I110_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_VERSION,
    upstreamI109ReviewId: i109.reviewId,
    rawEarthlyBranchElementParticipantAllowed: false as const,
    reversedDirectionMayBeInferred: false as const,
    transitiveControlMayBeInferred: false as const,
    generalKnowledgeFallbackAllowed: false as const,
    fiveElementLabelPresenceAloneMayCreateBinding: false as const,
    mayEmitDamageOutcome: false as const,
    mayEmitDamageMagnitude: false as const,
    mayEmitSettlementOutcome: false as const,
    mayEmitActivationOutcome: false as const,
    mayEmitPersistenceOutcome: false as const,
    mayEmitEffectiveSupportOutcome: false as const,
    mayEmitRelativeForceOutcome: false as const,
    mayEmitPrecedenceOutcome: false as const,
    mayEmitNumericWeight: false as const,
    adapterMayChangeNoTrackedRelationTouchMeaning: false as const,
    structuralRelationKindMutationAuthorizedByThisGate: false as const,
    keStructuralRelationKindCreatedByThisGate: false as const,
    adapterImplementationPerformedByThisGate: false as const,
    adapterImplementationAuthorizedByThisGate: false as const,
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

export function buildI110ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContract(
  i109: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeDirectionalEvidenceAdapterContractReport {
  const common = commonMaterial(i109);
  if (!exactI109Accepted(i109)) {
    return finalized({
      ...common,
      status: 'I109_UNRESOLVED_OR_INVALID',
      decision: 'SOURCE_KE_ADAPTER_CONTRACT_NOT_FROZEN',
      candidateSourceId: null,
      sourceTerm: null,
      inputDomain: 'NONE',
      outputSemantic: 'NONE',
      semanticCeiling: 'NONE',
      exactControlCycle: [],
      exactControlCycleEdgeCount: 0,
      exactFiveElementControlCycleRequired: false,
      acceptedSourceComponentScopes: [],
      acceptedTargetComponentScopes: [],
      visibleStemToVisibleStemBindingContracted: false,
      visibleStemToBranchHiddenStemBindingContracted: false,
      branchHiddenStemToVisibleStemBindingContracted: false,
      branchHiddenStemToBranchHiddenStemBindingContracted: false,
      sourceComponentIdentityRequired: false,
      targetComponentIdentityRequired: false,
      sourceElementIdentityRequired: false,
      targetElementIdentityRequired: false,
      sourceToTargetDirectionMustMatchExactCycle: false,
      missingComponentIdentityBehavior: 'NONE',
      ambiguousComponentIdentityBehavior: 'NONE',
      missingElementIdentityBehavior: 'NONE',
      ambiguousElementIdentityBehavior: 'NONE',
      nonCycleElementPairBehavior: 'NONE',
      outputEvidenceOnly: false,
      noTrackedRelationTouchSemanticsRemainUnchanged: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW',
      notes: [
        'I110 remains fail-closed unless I109 authorizes entry into the research-only 克 directional-evidence adapter contract stage with every effect and implementation guard still false.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT',
    decision:
      'SOURCE_KE_COMPONENT_SCOPED_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE',
    candidateSourceId: i109.candidateSourceId,
    sourceTerm: '克',
    inputDomain: 'COMPONENT_ELEMENT_DIRECTIONAL_EVIDENCE',
    outputSemantic: 'SOURCE_KE_COMPONENT_SCOPED_CONTROL_DIRECTION_BINDING',
    semanticCeiling: 'EVIDENCE_BINDING_ONLY',
    exactControlCycle: CONTROL_CYCLE,
    exactControlCycleEdgeCount: CONTROL_CYCLE.length,
    exactFiveElementControlCycleRequired: true,
    acceptedSourceComponentScopes: COMPONENT_SCOPES,
    acceptedTargetComponentScopes: COMPONENT_SCOPES,
    visibleStemToVisibleStemBindingContracted: true,
    visibleStemToBranchHiddenStemBindingContracted: true,
    branchHiddenStemToVisibleStemBindingContracted: true,
    branchHiddenStemToBranchHiddenStemBindingContracted: true,
    sourceComponentIdentityRequired: true,
    targetComponentIdentityRequired: true,
    sourceElementIdentityRequired: true,
    targetElementIdentityRequired: true,
    sourceToTargetDirectionMustMatchExactCycle: true,
    missingComponentIdentityBehavior: 'FAIL_CLOSED_NO_BINDING',
    ambiguousComponentIdentityBehavior: 'FAIL_CLOSED_NO_BINDING',
    missingElementIdentityBehavior: 'FAIL_CLOSED_NO_BINDING',
    ambiguousElementIdentityBehavior: 'FAIL_CLOSED_NO_BINDING',
    nonCycleElementPairBehavior: 'FAIL_CLOSED_NO_BINDING',
    outputEvidenceOnly: true,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_BINDING_EVIDENCE',
    notes: [
      'I110 freezes a research evidence-binding contract only. Adapter execution remains a separate gate.',
      'A valid 克 binding requires exact source and target component identity, exact source and target element identity, and a directed pair present in the five-edge frozen control cycle.',
      'Visible stems and earthly-branch hidden stems are the only contracted participant scopes. A raw earthly-branch element label is not a direct participant.',
      'Reversed or transitive 克 inference is forbidden. Non-cycle, missing, or ambiguous identities fail closed with no binding.',
      'A directional 克 binding is evidence only and cannot emit damage, magnitude, settlement, activation, persistence, effective support, relative force, precedence, numeric weight, or classification.',
      'No StructuralRelationKind is created or modified, and NO_TRACKED_RELATION_TOUCH semantics remain unchanged.',
    ],
  });
}
