import { describe, expect, it } from 'vitest';

import {
  R150_AUTHORITY,
  R150_BLOCKED_FRONTIERS,
  R150_BOUNDED_CLAIM_CONTRACTS,
  R150_INTERACTION_PREDICATES,
  R150_MINIMAL_INTERACTION_PREDICATE_SET_VERSION,
  R150_REJECTED_EXECUTABLE_SHORTCUTS,
  R150_SUMMARY,
  R150_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-minimal-interaction-predicate-set-executable-claims.js';

describe('R150 minimal interaction predicate set for executable claims', () => {
  it('pins the bounded predicate and frontier shape', () => {
    expect(R150_MINIMAL_INTERACTION_PREDICATE_SET_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R150_SUMMARY).toEqual({
      predicateCount: 8,
      perClashRequiredPredicateCount: 7,
      aggregateRequiredPredicateCount: 8,
      perClashRemovalBlockingCount: 7,
      aggregateRemovalBlockingCount: 8,
      boundedClaimContractCount: 2,
      boundedEvidenceExecutableContractCount: 2,
      interpretationClaimEmissionAuthorizedContractCount: 0,
      productionAuthorityPromotedContractCount: 0,
      blockedFrontierCount: 8,
      blockedFrontierExecutableCount: 0,
      blockedFrontierClaimEmissionAuthorizedCount: 0,
    });
  });

  it('establishes exactly seven predicates for per-clash tight-embedded break evidence', () => {
    const contract = R150_BOUNDED_CLAIM_CONTRACTS.find(
      (item) =>
        item.contractId === 'PER_CLASH_TIGHT_EMBEDDED_BREAK_EVIDENCE',
    );

    expect(contract?.requiredPredicateIds).toEqual([
      'FOUR_PILLARS_RESOLVED',
      'STRUCTURAL_BUREAU_FORMATION_RESOLVED_AND_ALIGNED',
      'TRACKED_CLASH_RELATION_ALIGNED',
      'EXACT_ONE_BUREAU_PARTICIPANT_ONE_EXTERNAL_COUNTERPART',
      'COUNTERPART_EMBEDDED_WITHIN_BUREAU_SPAN',
      'COUNTERPART_TIGHT_TO_CLASHED_PARTICIPANT',
      'I46_BREAK_POLICY_AUTHORIZED_FOR_PLACEMENT',
    ]);
    expect(contract).toMatchObject({
      contractMinimalityStatus: 'MINIMAL_WITHIN_I45_I46_I47_CONTRACT',
      necessityBasis: 'FAIL_CLOSED_IMPLEMENTATION_GATES',
      sufficiencyBasis: 'SOURCE_BOUNDED_EXACT_PLACEMENT_CONTRACT',
      boundedEvidenceExecutionAuthorized: true,
      interpretationClaimEmissionAuthorized: false,
      genericInteractionClaimAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('adds only the single-direct-break predicate for aggregate bureau state', () => {
    const perClash = R150_BOUNDED_CLAIM_CONTRACTS.find(
      (item) =>
        item.contractId === 'PER_CLASH_TIGHT_EMBEDDED_BREAK_EVIDENCE',
    );
    const aggregate = R150_BOUNDED_CLAIM_CONTRACTS.find(
      (item) =>
        item.contractId === 'AGGREGATE_POST_INTERACTION_BUREAU_STATE',
    );

    expect(aggregate?.requiredPredicateIds).toEqual([
      ...(perClash?.requiredPredicateIds ?? []),
      'SINGLE_DIRECT_BREAK_FOR_AGGREGATE_STATE',
    ]);
    expect(aggregate?.requiredPredicateIds).toHaveLength(8);
    expect(aggregate).toMatchObject({
      boundedEvidenceExecutionAuthorized: true,
      interpretationClaimEmissionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('pins removal-sensitive necessity within the exact implementation contract', () => {
    const perClashPredicates = R150_INTERACTION_PREDICATES.filter(
      (item) => item.requiredForPerClashBreakEvidence,
    );
    const aggregatePredicates = R150_INTERACTION_PREDICATES.filter(
      (item) => item.requiredForAggregateBureauState,
    );

    expect(perClashPredicates).toHaveLength(7);
    expect(
      perClashPredicates.every(
        (item) => item.removalBlocksPerClashBreakEvidence,
      ),
    ).toBe(true);

    expect(aggregatePredicates).toHaveLength(8);
    expect(
      aggregatePredicates.every(
        (item) => item.removalBlocksAggregateBureauState,
      ),
    ).toBe(true);

    const aggregateOnly = R150_INTERACTION_PREDICATES.find(
      (item) =>
        item.predicateId === 'SINGLE_DIRECT_BREAK_FOR_AGGREGATE_STATE',
    );
    expect(aggregateOnly).toMatchObject({
      requiredForPerClashBreakEvidence: false,
      removalBlocksPerClashBreakEvidence: false,
      requiredForAggregateBureauState: true,
      removalBlocksAggregateBureauState: true,
      removalOutcome: 'AGGREGATE_STATE_NOT_DETERMINED',
    });
  });

  it('keeps all eight broader interaction frontiers blocked', () => {
    expect(R150_BLOCKED_FRONTIERS.map((item) => item.upstreamAsset)).toEqual([
      'R141',
      'R142',
      'R144',
      'R145',
      'R146',
      'R147',
      'R148',
      'R149',
    ]);

    expect(
      R150_BLOCKED_FRONTIERS.every(
        (item) =>
          item.minimalExecutablePredicateSetEstablished === false &&
          item.boundedEvidenceExecutionAuthorized === false &&
          item.interpretationClaimEmissionAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('pins upstream unresolved authority instead of filling gaps by inference', () => {
    expect(R150_UPSTREAM_BINDINGS.r130).toMatchObject({
      removalAuditOperationalized: true,
      boundedNonFinalPredicateRulesObserved: true,
      automaticEngineAdmissionAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r141).toMatchObject({
      globalRelationPrecedenceAuthorized: false,
      generalizedRelationEffectSettlementAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r142).toMatchObject({
      targetWinnerResolverAuthorized: false,
      effectiveCombinationResolverAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r144).toMatchObject({
      relationEffectResolverAuthorized: false,
      numericSeverityAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r145).toMatchObject({
      harmBreakConflictSettlementAuthorized: false,
      generalizedGejuEffectPredicateAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r146).toMatchObject({
      runtimeActivationFactAuthorized: false,
      activationPersistenceVerdictAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r147).toMatchObject({
      executableDirectionResolverAuthorized: false,
      globalPrecedenceAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r148).toMatchObject({
      globalInteractionPrecedenceAuthorized: false,
      executablePrecedenceResolverAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.r149).toMatchObject({
      tightEmbeddedBreakOnlyDeterministicPlacementObserved: true,
      generalizedPositionResolverAuthorized: false,
      executableGenericSettlementAuthorized: false,
    });
  });

  it('pins the exact I45/I46/I47 source-bounded contract', () => {
    expect(R150_UPSTREAM_BINDINGS.i45).toMatchObject({
      structuralBureauFormationRequired: true,
    });
    expect(R150_UPSTREAM_BINDINGS.i46).toMatchObject({
      structuralBureauFormationRequiredBeforeSettlement: true,
      trackedClashTopologyRequiredForClashSettlement: true,
      placementClassificationAuthorized: true,
      bureauSpanDefinitionAuthorized: true,
      tightAdjacencyDefinitionAuthorized: true,
      tightEmbeddedClashBreakVerdictAuthorized: true,
      tightEmbeddedClashBreakVerdict: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
      genericPostInteractionBureauStateEmissionAuthorized: false,
      numericScoringAuthorized: false,
    });
    expect(R150_UPSTREAM_BINDINGS.i47).toMatchObject({
      aggregateStateRequiresSingleDirectBreak: true,
      perClashDeterministicState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
    });
  });

  it('rejects promotion from bounded evidence execution to generic claim authority', () => {
    expect(R150_REJECTED_EXECUTABLE_SHORTCUTS).toEqual(
      expect.arrayContaining([
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
      ]),
    );
  });

  it('keeps generic claim and production authority closed', () => {
    expect(
      R150_INTERACTION_PREDICATES.every(
        (item) =>
          item.genericInteractionMeaningAuthorized === false &&
          item.interpretationClaimAuthorityFromPredicate === false &&
          item.numericWeightAuthorized === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);

    expect(R150_AUTHORITY).toMatchObject({
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
  });
});
