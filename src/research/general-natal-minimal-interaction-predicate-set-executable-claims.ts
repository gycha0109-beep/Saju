import {
  R130_AUTHORITY,
  R130_STRENGTH_MINIMAL_SUFFICIENT_PREDICATE_AUDIT_VERSION,
} from './general-natal-strength-minimal-sufficient-predicate-audit.js';
import {
  R141_AUTHORITY,
  R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
} from './general-natal-multi-relation-stem-branch-order-sensitivity-corpus.js';
import {
  R142_AUTHORITY,
  R142_COMPETING_STEM_COMBINATION_TARGET_VERSION,
} from './general-natal-competing-heavenly-stem-combination-target-corpus.js';
import {
  R144_AUTHORITY,
  R144_PUNISHMENT_REPETITION_SELF_VARIANT_VERSION,
} from './general-natal-punishment-repetition-self-punishment-variant-corpus.js';
import {
  R145_AUTHORITY,
  R145_HARM_BREAK_LOW_EVIDENCE_AUDIT_VERSION,
} from './general-natal-harm-break-low-evidence-boundary-audit.js';
import {
  R146_AUTHORITY,
  R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
} from './general-natal-hidden-stem-activation-provenance-interaction-event-corpus.js';
import {
  R147_AUTHORITY,
  R147_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_VERSION,
} from './general-natal-interaction-directionality-counterexample-registry.js';
import {
  R148_AUTHORITY,
  R148_INTERACTION_PRECEDENCE_DIVERGENCE_VERSION,
} from './general-natal-interaction-precedence-divergence-across-schools.js';
import {
  R149_AUTHORITY,
  R149_POSITION_SENSITIVE_INTERACTION_CONSEQUENCE_VERSION,
} from './general-natal-position-sensitive-interaction-consequence-corpus.js';
import {
  I45_CHALLENGE_ROOT_THREE_COMBINATION_BUREAU_FORMATION_EVIDENCE_VERSION,
} from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import {
  I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
} from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';
import {
  I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
} from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';

export const R150_MINIMAL_INTERACTION_PREDICATE_SET_VERSION =
  '0.1.0-research' as const;

export type R150PredicateId =
  | 'FOUR_PILLARS_RESOLVED'
  | 'STRUCTURAL_BUREAU_FORMATION_RESOLVED_AND_ALIGNED'
  | 'TRACKED_CLASH_RELATION_ALIGNED'
  | 'EXACT_ONE_BUREAU_PARTICIPANT_ONE_EXTERNAL_COUNTERPART'
  | 'COUNTERPART_EMBEDDED_WITHIN_BUREAU_SPAN'
  | 'COUNTERPART_TIGHT_TO_CLASHED_PARTICIPANT'
  | 'I46_BREAK_POLICY_AUTHORIZED_FOR_PLACEMENT'
  | 'SINGLE_DIRECT_BREAK_FOR_AGGREGATE_STATE';

export type R150PredicateStage =
  | 'INPUT_RESOLUTION'
  | 'STRUCTURAL_FORMATION'
  | 'CLASH_ALIGNMENT'
  | 'PARTICIPANT_PARTITION'
  | 'POSITION_CLASSIFICATION'
  | 'SOURCE_POLICY'
  | 'AGGREGATE_CARDINALITY';

export type R150RemovalOutcome =
  | 'PILLARS_UNRESOLVED'
  | 'FORMATION_EVIDENCE_UNRESOLVED_OR_MISALIGNED'
  | 'CLASH_TOPOLOGY_MISALIGNED'
  | 'PLACEMENT_NO_LONGER_EMBEDDED_TIGHT'
  | 'METHODOLOGY_NOT_AUTHORIZED'
  | 'AGGREGATE_STATE_NOT_DETERMINED';

export interface R150PredicateDefinition {
  predicateId: R150PredicateId;
  stage: R150PredicateStage;
  meaning: string;
  sourceRefs: readonly string[];
  requiredForPerClashBreakEvidence: boolean;
  requiredForAggregateBureauState: boolean;
  removalBlocksPerClashBreakEvidence: boolean;
  removalBlocksAggregateBureauState: boolean;
  removalOutcome: R150RemovalOutcome;
  genericInteractionMeaningAuthorized: false;
  interpretationClaimAuthorityFromPredicate: false;
  numericWeightAuthorized: false;
  productionAuthorityPromoted: false;
}

const predicate = (
  value: Omit<
    R150PredicateDefinition,
    | 'genericInteractionMeaningAuthorized'
    | 'interpretationClaimAuthorityFromPredicate'
    | 'numericWeightAuthorized'
    | 'productionAuthorityPromoted'
  >,
): R150PredicateDefinition =>
  Object.freeze({
    ...value,
    genericInteractionMeaningAuthorized: false,
    interpretationClaimAuthorityFromPredicate: false,
    numericWeightAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R150_INTERACTION_PREDICATES: readonly R150PredicateDefinition[] =
  Object.freeze([
    predicate({
      predicateId: 'FOUR_PILLARS_RESOLVED',
      stage: 'INPUT_RESOLUTION',
      meaning:
        'All four pillar slots are resolved before I47 can classify bureau-span placement.',
      sourceRefs: ['I47:PILLARS_RESOLVED_GATE'],
      requiredForPerClashBreakEvidence: true,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'PILLARS_UNRESOLVED',
    }),
    predicate({
      predicateId: 'STRUCTURAL_BUREAU_FORMATION_RESOLVED_AND_ALIGNED',
      stage: 'STRUCTURAL_FORMATION',
      meaning:
        'I45 formation evidence is resolved, full-membership based, and aligned to the current structural three-combination relation.',
      sourceRefs: [
        'I45:RESOLVED_STRUCTURAL_BUREAU_FORMATION',
        'I47:FORMATION_EVIDENCE_ALIGNMENT_GATE',
      ],
      requiredForPerClashBreakEvidence: true,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'FORMATION_EVIDENCE_UNRESOLVED_OR_MISALIGNED',
    }),
    predicate({
      predicateId: 'TRACKED_CLASH_RELATION_ALIGNED',
      stage: 'CLASH_ALIGNMENT',
      meaning:
        'The tracked clash topology resolves to a current branch_clash structural relation.',
      sourceRefs: ['I47:CLASH_TOPOLOGY_ALIGNMENT_GATE'],
      requiredForPerClashBreakEvidence: true,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'CLASH_TOPOLOGY_MISALIGNED',
    }),
    predicate({
      predicateId: 'EXACT_ONE_BUREAU_PARTICIPANT_ONE_EXTERNAL_COUNTERPART',
      stage: 'PARTICIPANT_PARTITION',
      meaning:
        'The clash contains exactly one formed-bureau participant and exactly one external counterpart.',
      sourceRefs: ['I47:CLASH_PARTICIPANT_PARTITION_GATE'],
      requiredForPerClashBreakEvidence: true,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'CLASH_TOPOLOGY_MISALIGNED',
    }),
    predicate({
      predicateId: 'COUNTERPART_EMBEDDED_WITHIN_BUREAU_SPAN',
      stage: 'POSITION_CLASSIFICATION',
      meaning:
        'The external clash counterpart lies strictly inside the min/max pillar span occupied by the formed bureau.',
      sourceRefs: [
        'I46:EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
        'I47:BUREAU_SPAN_CLASSIFICATION',
        'R149:POSITION_VARIANT_REPLAY',
      ],
      requiredForPerClashBreakEvidence: true,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'PLACEMENT_NO_LONGER_EMBEDDED_TIGHT',
    }),
    predicate({
      predicateId: 'COUNTERPART_TIGHT_TO_CLASHED_PARTICIPANT',
      stage: 'POSITION_CLASSIFICATION',
      meaning:
        'The external clash counterpart is immediately pillar-adjacent to the directly clashed bureau participant.',
      sourceRefs: [
        'I46:EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
        'I47:TIGHT_ADJACENCY_CLASSIFICATION',
        'R149:POSITION_VARIANT_REPLAY',
      ],
      requiredForPerClashBreakEvidence: true,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'PLACEMENT_NO_LONGER_EMBEDDED_TIGHT',
    }),
    predicate({
      predicateId: 'I46_BREAK_POLICY_AUTHORIZED_FOR_PLACEMENT',
      stage: 'SOURCE_POLICY',
      meaning:
        'The exact embedded+tight placement maps to the I46 source-bounded BREAK_AUTHORIZED policy and deterministic bureau-break state.',
      sourceRefs: [
        'I46:TIGHT_EMBEDDED_CLASH_BREAK_AUTHORIZED',
        'I47:METHODOLOGY_AUTHORIZATION_GATE',
      ],
      requiredForPerClashBreakEvidence: true,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'METHODOLOGY_NOT_AUTHORIZED',
    }),
    predicate({
      predicateId: 'SINGLE_DIRECT_BREAK_FOR_AGGREGATE_STATE',
      stage: 'AGGREGATE_CARDINALITY',
      meaning:
        'Exactly one direct source-bounded break is present before the item-level postInteractionBureauState may become deterministic.',
      sourceRefs: ['I47:SINGLE_DIRECT_BREAK_AGGREGATE_GATE'],
      requiredForPerClashBreakEvidence: false,
      requiredForAggregateBureauState: true,
      removalBlocksPerClashBreakEvidence: false,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'AGGREGATE_STATE_NOT_DETERMINED',
    }),
  ]);

export type R150ClaimContractId =
  | 'PER_CLASH_TIGHT_EMBEDDED_BREAK_EVIDENCE'
  | 'AGGREGATE_POST_INTERACTION_BUREAU_STATE';

export interface R150BoundedClaimContract {
  contractId: R150ClaimContractId;
  outputSurface:
    | 'ThreeCombinationClashPlacementSettlementEvidence.deterministicBureauState'
    | 'ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem.postInteractionBureauState';
  outputValue: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH';
  requiredPredicateIds: readonly R150PredicateId[];
  contractMinimalityStatus: 'MINIMAL_WITHIN_I45_I46_I47_CONTRACT';
  necessityBasis: 'FAIL_CLOSED_IMPLEMENTATION_GATES';
  sufficiencyBasis: 'SOURCE_BOUNDED_EXACT_PLACEMENT_CONTRACT';
  boundedEvidenceExecutionAuthorized: true;
  interpretationClaimEmissionAuthorized: false;
  genericInteractionClaimAuthorized: false;
  chartRoleFactEmissionAuthorized: false;
  previewPromotionAuthorized: false;
  productionAuthorityPromoted: false;
}

const PER_CLASH_REQUIRED = Object.freeze(
  R150_INTERACTION_PREDICATES.filter(
    (item) => item.requiredForPerClashBreakEvidence,
  ).map((item) => item.predicateId),
);

const AGGREGATE_REQUIRED = Object.freeze(
  R150_INTERACTION_PREDICATES.filter(
    (item) => item.requiredForAggregateBureauState,
  ).map((item) => item.predicateId),
);

export const R150_BOUNDED_CLAIM_CONTRACTS: readonly R150BoundedClaimContract[] =
  Object.freeze([
    Object.freeze({
      contractId: 'PER_CLASH_TIGHT_EMBEDDED_BREAK_EVIDENCE',
      outputSurface:
        'ThreeCombinationClashPlacementSettlementEvidence.deterministicBureauState',
      outputValue: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      requiredPredicateIds: PER_CLASH_REQUIRED,
      contractMinimalityStatus: 'MINIMAL_WITHIN_I45_I46_I47_CONTRACT',
      necessityBasis: 'FAIL_CLOSED_IMPLEMENTATION_GATES',
      sufficiencyBasis: 'SOURCE_BOUNDED_EXACT_PLACEMENT_CONTRACT',
      boundedEvidenceExecutionAuthorized: true,
      interpretationClaimEmissionAuthorized: false,
      genericInteractionClaimAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      contractId: 'AGGREGATE_POST_INTERACTION_BUREAU_STATE',
      outputSurface:
        'ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem.postInteractionBureauState',
      outputValue: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      requiredPredicateIds: AGGREGATE_REQUIRED,
      contractMinimalityStatus: 'MINIMAL_WITHIN_I45_I46_I47_CONTRACT',
      necessityBasis: 'FAIL_CLOSED_IMPLEMENTATION_GATES',
      sufficiencyBasis: 'SOURCE_BOUNDED_EXACT_PLACEMENT_CONTRACT',
      boundedEvidenceExecutionAuthorized: true,
      interpretationClaimEmissionAuthorized: false,
      genericInteractionClaimAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
  ]);

export type R150BlockedFrontierId =
  | 'MULTI_RELATION_GENERIC_SETTLEMENT'
  | 'COMPETING_STEM_COMBINATION_TARGET_WINNER'
  | 'PUNISHMENT_EFFECT'
  | 'HARM_BREAK_EFFECT'
  | 'HIDDEN_STEM_RUNTIME_ACTIVATION'
  | 'DIRECTIONAL_INTERACTION_EFFECT'
  | 'GLOBAL_INTERACTION_PRECEDENCE'
  | 'GENERIC_POSITION_EFFECT';

export interface R150BlockedFrontier {
  frontierId: R150BlockedFrontierId;
  upstreamAsset: 'R141' | 'R142' | 'R144' | 'R145' | 'R146' | 'R147' | 'R148' | 'R149';
  missingAuthority: string;
  minimalExecutablePredicateSetEstablished: false;
  boundedEvidenceExecutionAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

export const R150_BLOCKED_FRONTIERS: readonly R150BlockedFrontier[] =
  Object.freeze([
    Object.freeze({
      frontierId: 'MULTI_RELATION_GENERIC_SETTLEMENT',
      upstreamAsset: 'R141',
      missingAuthority:
        'generalized relation-effect settlement and global precedence remain unauthorized',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      frontierId: 'COMPETING_STEM_COMBINATION_TARGET_WINNER',
      upstreamAsset: 'R142',
      missingAuthority:
        'target-winner, effective-combination, and transformation resolvers remain unauthorized',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      frontierId: 'PUNISHMENT_EFFECT',
      upstreamAsset: 'R144',
      missingAuthority:
        'punishment relation-effect resolver and severity mapping remain unauthorized',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      frontierId: 'HARM_BREAK_EFFECT',
      upstreamAsset: 'R145',
      missingAuthority:
        'harm/break conflict settlement and generalized effect predicates remain unauthorized',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      frontierId: 'HIDDEN_STEM_RUNTIME_ACTIVATION',
      upstreamAsset: 'R146',
      missingAuthority:
        'runtime activation, persistence, force, and polarity resolvers remain unauthorized',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      frontierId: 'DIRECTIONAL_INTERACTION_EFFECT',
      upstreamAsset: 'R147',
      missingAuthority:
        'directionality is preserved structurally but no executable directional-effect resolver exists',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      frontierId: 'GLOBAL_INTERACTION_PRECEDENCE',
      upstreamAsset: 'R148',
      missingAuthority:
        'global precedence, total order, vote-based selection, and tie-break remain unauthorized',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
    Object.freeze({
      frontierId: 'GENERIC_POSITION_EFFECT',
      upstreamAsset: 'R149',
      missingAuthority:
        'position materiality is observed but generalized position-effect settlement remains unauthorized',
      minimalExecutablePredicateSetEstablished: false,
      boundedEvidenceExecutionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    }),
  ]);

export const R150_REJECTED_EXECUTABLE_SHORTCUTS = Object.freeze([
  'STRUCTURAL_RELATION_IDENTITY_ALONE_AS_EXECUTABLE_EFFECT',
  'PAIR_OR_GROUP_MEMBERSHIP_AS_SETTLED_CONSEQUENCE',
  'DIRECTIONALITY_AS_EFFECT_AUTHORITY',
  'POSITION_MATERIALITY_AS_GENERIC_POSITION_RESOLVER',
  'SOURCE_BOUNDED_CASE_AS_GLOBAL_PRECEDENCE',
  'TARGET_COMPETITION_AS_WINNER_SELECTION',
  'PUNISHMENT_MULTIPLICITY_AS_SEVERITY',
  'HARM_OR_BREAK_MEMBERSHIP_AS_HARMFUL_POLARITY',
  'HIDDEN_MEMBERSHIP_AS_RUNTIME_ACTIVATION',
  'EMBEDDEDNESS_WITHOUT_TIGHTNESS_AS_BREAK',
  'TIGHTNESS_WITHOUT_EMBEDDEDNESS_AS_BREAK',
  'I46_POLICY_WITHOUT_ALIGNED_FORMATION_AS_BREAK',
  'MULTIPLE_DIRECT_BREAKS_AS_SINGLE_AGGREGATE_STATE',
  'BOUNDED_EVIDENCE_EXECUTION_AS_INTERPRETATION_CLAIM_AUTHORITY',
  'RESEARCH_MINIMALITY_AS_PRODUCTION_PROMOTION',
  'PREVIEW_READINESS_AS_SEMANTIC_ADMISSION',
  'NUMERIC_WEIGHT_TO_FILL_UNRESOLVED_PREDICATES',
  'FIRST_MATCH_OR_ARRAY_ORDER_TO_FILL_UNRESOLVED_PREDICATES',
] as const);

const countPredicate = (
  key:
    | 'requiredForPerClashBreakEvidence'
    | 'requiredForAggregateBureauState'
    | 'removalBlocksPerClashBreakEvidence'
    | 'removalBlocksAggregateBureauState',
): number => R150_INTERACTION_PREDICATES.filter((item) => item[key]).length;

export const R150_SUMMARY = Object.freeze({
  predicateCount: R150_INTERACTION_PREDICATES.length,
  perClashRequiredPredicateCount: countPredicate(
    'requiredForPerClashBreakEvidence',
  ),
  aggregateRequiredPredicateCount: countPredicate(
    'requiredForAggregateBureauState',
  ),
  perClashRemovalBlockingCount: countPredicate(
    'removalBlocksPerClashBreakEvidence',
  ),
  aggregateRemovalBlockingCount: countPredicate(
    'removalBlocksAggregateBureauState',
  ),
  boundedClaimContractCount: R150_BOUNDED_CLAIM_CONTRACTS.length,
  boundedEvidenceExecutableContractCount:
    R150_BOUNDED_CLAIM_CONTRACTS.filter(
      (item) => item.boundedEvidenceExecutionAuthorized,
    ).length,
  interpretationClaimEmissionAuthorizedContractCount:
    R150_BOUNDED_CLAIM_CONTRACTS.filter(
      (item) => item.interpretationClaimEmissionAuthorized,
    ).length,
  productionAuthorityPromotedContractCount:
    R150_BOUNDED_CLAIM_CONTRACTS.filter(
      (item) => item.productionAuthorityPromoted,
    ).length,
  blockedFrontierCount: R150_BLOCKED_FRONTIERS.length,
  blockedFrontierExecutableCount:
    R150_BLOCKED_FRONTIERS.filter(
      (item) => item.boundedEvidenceExecutionAuthorized,
    ).length,
  blockedFrontierClaimEmissionAuthorizedCount:
    R150_BLOCKED_FRONTIERS.filter(
      (item) => item.interpretationClaimEmissionAuthorized,
    ).length,
});

const i46 =
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();

export const R150_UPSTREAM_BINDINGS = Object.freeze({
  r130: {
    version: R130_STRENGTH_MINIMAL_SUFFICIENT_PREDICATE_AUDIT_VERSION,
    removalAuditOperationalized: R130_AUTHORITY.removalAuditOperationalized,
    boundedNonFinalPredicateRulesObserved:
      R130_AUTHORITY.boundedNonFinalPredicateRulesObserved,
    automaticEngineAdmissionAuthorized:
      R130_AUTHORITY.automaticEngineAdmissionAuthorized,
  },
  r141: {
    version: R141_MULTI_RELATION_ORDER_SENSITIVITY_VERSION,
    globalRelationPrecedenceAuthorized:
      R141_AUTHORITY.globalRelationPrecedenceAuthorized,
    generalizedRelationEffectSettlementAuthorized:
      R141_AUTHORITY.generalizedRelationEffectSettlementAuthorized,
  },
  r142: {
    version: R142_COMPETING_STEM_COMBINATION_TARGET_VERSION,
    targetWinnerResolverAuthorized:
      R142_AUTHORITY.targetWinnerResolverAuthorized,
    effectiveCombinationResolverAuthorized:
      R142_AUTHORITY.effectiveCombinationResolverAuthorized,
  },
  r144: {
    version: R144_PUNISHMENT_REPETITION_SELF_VARIANT_VERSION,
    relationEffectResolverAuthorized:
      R144_AUTHORITY.relationEffectResolverAuthorized,
    numericSeverityAuthorized: R144_AUTHORITY.numericSeverityAuthorized,
  },
  r145: {
    version: R145_HARM_BREAK_LOW_EVIDENCE_AUDIT_VERSION,
    harmBreakConflictSettlementAuthorized:
      R145_AUTHORITY.harmBreakConflictSettlementAuthorized,
    generalizedGejuEffectPredicateAuthorized:
      R145_AUTHORITY.generalizedGejuEffectPredicateAuthorized,
  },
  r146: {
    version: R146_HIDDEN_STEM_ACTIVATION_PROVENANCE_VERSION,
    runtimeActivationFactAuthorized:
      R146_AUTHORITY.runtimeActivationFactAuthorized,
    activationPersistenceVerdictAuthorized:
      R146_AUTHORITY.activationPersistenceVerdictAuthorized,
  },
  r147: {
    version: R147_INTERACTION_DIRECTIONALITY_COUNTEREXAMPLE_VERSION,
    executableDirectionResolverAuthorized:
      R147_AUTHORITY.executableDirectionResolverAuthorized,
    globalPrecedenceAuthorized: R147_AUTHORITY.globalPrecedenceAuthorized,
  },
  r148: {
    version: R148_INTERACTION_PRECEDENCE_DIVERGENCE_VERSION,
    globalInteractionPrecedenceAuthorized:
      R148_AUTHORITY.globalInteractionPrecedenceAuthorized,
    executablePrecedenceResolverAuthorized:
      R148_AUTHORITY.executablePrecedenceResolverAuthorized,
  },
  r149: {
    version: R149_POSITION_SENSITIVE_INTERACTION_CONSEQUENCE_VERSION,
    tightEmbeddedBreakOnlyDeterministicPlacementObserved:
      R149_AUTHORITY.tightEmbeddedBreakOnlyDeterministicPlacementObserved,
    generalizedPositionResolverAuthorized:
      R149_AUTHORITY.generalizedPositionResolverAuthorized,
    executableGenericSettlementAuthorized:
      R149_AUTHORITY.executableGenericSettlementAuthorized,
  },
  i45: {
    version:
      I45_CHALLENGE_ROOT_THREE_COMBINATION_BUREAU_FORMATION_EVIDENCE_VERSION,
    structuralBureauFormationRequired: true as const,
  },
  i46: {
    version:
      I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    structuralBureauFormationRequiredBeforeSettlement:
      i46.structuralBureauFormationRequiredBeforeSettlement,
    trackedClashTopologyRequiredForClashSettlement:
      i46.trackedClashTopologyRequiredForClashSettlement,
    placementClassificationAuthorized:
      i46.placementClassificationAuthorized,
    bureauSpanDefinitionAuthorized: i46.bureauSpanDefinitionAuthorized,
    tightAdjacencyDefinitionAuthorized:
      i46.tightAdjacencyDefinitionAuthorized,
    tightEmbeddedClashBreakVerdictAuthorized:
      i46.tightEmbeddedClashBreakVerdictAuthorized,
    tightEmbeddedClashBreakVerdict:
      i46.tightEmbeddedClashBreakVerdict,
    genericPostInteractionBureauStateEmissionAuthorized:
      i46.genericPostInteractionBureauStateEmissionAuthorized,
    numericScoringAuthorized: i46.numericScoringAuthorized,
  },
  i47: {
    version:
      I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
    failClosedStatuses: [
      'PILLARS_UNRESOLVED',
      'FORMATION_EVIDENCE_UNRESOLVED',
      'FORMATION_EVIDENCE_MISALIGNED',
      'METHODOLOGY_NOT_AUTHORIZED',
      'CLASH_TOPOLOGY_MISALIGNED',
    ] as const,
    perClashDeterministicState:
      'BROKEN_BY_TIGHT_EMBEDDED_CLASH' as const,
    aggregateStateRequiresSingleDirectBreak: true as const,
  },
});

export const R150_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_MINIMAL_INTERACTION_PREDICATE_SET_FOR_EXECUTABLE_CLAIMS_COMPLETE' as const,
  researchOnly: true,
  boundedPerClashContractPredicateSetEstablished: true,
  boundedAggregateContractPredicateSetEstablished: true,
  contractMinimalityScopedToI45I46I47: true,
  failClosedRemovalNecessityObserved: true,
  boundedSourceSufficiencyObserved: true,
  boundedEvidenceExecutionDistinctFromInterpretationClaimObserved: true,
  aggregateCardinalityDistinctFromPerClashEvidenceObserved: true,
  unresolvedInteractionFamiliesRemainBlockedObserved: true,
  generalInteractionMinimalPredicateSetEstablished: false,
  genericInteractionResolverAuthorized: false,
  genericInteractionClaimEmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
