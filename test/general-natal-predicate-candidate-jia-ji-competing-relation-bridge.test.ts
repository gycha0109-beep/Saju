import { describe, expect, it } from 'vitest';

import {
  R177_AUTHORITY,
  R177_CASE_SPECIFIC_BOUNDARY,
  R177_EXISTING_SETTLEMENT_BOUNDARY,
  R177_GOVERNANCE,
  R177_JIA_JI_COMPETING_RELATION_BRIDGE_VERSION,
  R177_JIA_JI_DUAL_RELATION_SURFACE,
  R177_REJECTED_SHORTCUTS,
  R177_REQUIRED_FOLLOW_UP,
  R177_SUMMARY,
  R177_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-jia-ji-competing-relation-bridge.js';

describe('R177 Jia-Ji dual relation bridge', () => {
  it('materializes Jia-Ji as a structural five-combination candidate', () => {
    expect(R177_JIA_JI_COMPETING_RELATION_BRIDGE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R177_JIA_JI_DUAL_RELATION_SURFACE).toMatchObject({
      pair: ['甲', '己'],
      koreanPair: ['갑', '기'],
      r176ElementControlTopologyObserved: true,
      r176ElementControlSurface: '甲(木)剋己(土)',
      structuralRelationKind: 'stem_five_combination',
      structuralMatchOnly: true,
      combinationTransformationEstablished: false,
      dualRelationSurfaceObserved: true,
      relationSurfaceCount: 2,
    });
    expect(R177_JIA_JI_DUAL_RELATION_SURFACE.structuralRelationParticipants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ component: 'stem', value: '갑' }),
        expect.objectContaining({ component: 'stem', value: '기' }),
      ]),
    );
  });

  it('inherits the existing I233 competing-settlement authority gap', () => {
    expect(R177_EXISTING_SETTLEMENT_BOUNDARY).toMatchObject({
      authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED',
      authorityGapConfirmed: true,
      authorityGapClosed: false,
      multipleTouchTopologySubstrateAvailable: true,
      crossRelationPrecedenceAuthorized: false,
      multiTouchAggregationAuthorized: false,
      competingRelationSettlementResolved: false,
      relationTouchCountMayCreatePrecedence: false,
      pairOrderMayBeAssumedSignificant: false,
      modelSynthesisMayCountAsAuthority: false,
      requirementCount: 8,
    });
  });

  it('keeps a case-specific control report separate from generic precedence', () => {
    expect(R177_CASE_SPECIFIC_BOUNDARY).toEqual({
      sourceCaseReportsControlDirection: true,
      sourceCaseReportMayDescribeThisCase: true,
      sourceCaseReportMayCreateGenericControlOverCombinationPrecedence: false,
      combinationCandidateMayCancelControlByDefault: false,
      combinationCandidateMayDominateControlByDefault: false,
      controlSurfaceMayDominateCombinationByDefault: false,
      coexistenceSettlementEstablished: false,
      precedenceSettlementEstablished: false,
      combinationTransformationEstablished: false,
      exactContextSettlementEstablished: false,
    });
  });

  it('preserves upstream topology and global settlement boundaries', () => {
    expect(R177_GOVERNANCE).toEqual({
      upstreamR176TopologyPreserved: true,
      upstreamR176SettlementStillClosed: true,
      structuralEngineCombinationCandidateMaterialized: true,
      structuralEngineTransformationStillClosed: true,
      existingI233AuthorityGapPreserved: true,
      existingI233CrossRelationPrecedenceStillClosed: true,
      existingI233AggregationStillClosed: true,
      caseSpecificBridgeDoesNotMutateGlobalSettlementAuthority: true,
    });
    expect(R177_UPSTREAM_BINDINGS).toMatchObject({
      r176: {
        negativeCaseDirectOfficerControlTopologyObserved: true,
        settlementEstablished: false,
      },
      i233: {
        authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED',
        authorityGapClosed: false,
        requirementCount: 8,
        crossRelationPrecedenceAuthorized: false,
      },
    });
  });

  it('keeps the next evidence frontier explicit', () => {
    expect(R177_REQUIRED_FOLLOW_UP).toEqual([
      'EXACT_SOURCE_CONTEXT_FOR_JIA_JI_COMBINATION_VERSUS_CONTROL_COEXISTENCE',
      'CONDITIONS_WHERE_JIA_JI_COMBINATION_ACTUALLY_TRANSFORMS',
      'CONDITIONS_WHERE_CONTROL_REMAINS_EFFECTIVE_DESPITE_COMBINATION_SURFACE',
      'CONDITIONS_WHERE_COMBINATION_CHANGES_OR_BLOCKS_CONTROL_EFFECT',
      'FAIL_CLOSED_DISPOSITION_FOR_UNRESOLVED_MULTI_RELATION_CONFLICT',
    ]);
    expect(R177_SUMMARY).toEqual({
      competingSurfaceCount: 2,
      structuralCandidateCount: 1,
      matchedJiaJiCombinationCandidateCount: 1,
      genericPrecedenceAuthorizedCount: 0,
      exactSettlementEstablishedCount: 0,
      requiredFollowUpCount: 5,
    });
  });

  it('rejects generic precedence and transformation shortcuts', () => {
    expect(R177_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'JIA_JI_COMBINATION_CANDIDATE_EQUALS_TRANSFORMATION',
        'JIA_JI_COMBINATION_EQUALS_CONTROL_CANCELLED',
        'WOOD_CONTROLS_EARTH_EQUALS_COMBINATION_IGNORED',
        'SOURCE_CASE_CONTROL_REPORT_EQUALS_GENERIC_KE_OVER_HE_PRECEDENCE',
        'ONE_CASE_EQUALS_CROSS_RELATION_PRECEDENCE',
        'RELATION_COUNT_EQUALS_PRECEDENCE',
        'MODEL_SYNTHESIS_EQUALS_SETTLEMENT_AUTHORITY',
      ]),
    );
  });

  it('keeps semantic, execution, claim, and production authority closed', () => {
    expect(R177_AUTHORITY).toMatchObject({
      researchOnly: true,
      jiaJiElementControlSurfaceObserved: true,
      jiaJiStemCombinationCandidateObserved: true,
      dualRelationSurfaceObserved: true,
      structuralCombinationTransformationEstablished: false,
      caseSpecificControlDirectionReported: true,
      genericControlOverCombinationPrecedenceEstablished: false,
      genericCombinationOverControlPrecedenceEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      multiTouchAggregationAuthorized: false,
      competingRelationSettlementResolved: false,
      exactConfigurationTuplePredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      outcomeSufficiencyEstablished: false,
      settlementEstablished: false,
      executableResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
