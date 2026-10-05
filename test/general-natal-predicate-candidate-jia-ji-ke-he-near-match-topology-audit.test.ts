import { describe, expect, it } from 'vitest';

import {
  R183_ADMISSION_GUARDS,
  R183_AUTHORITY,
  R183_DISCOVERY_ADVANCE,
  R183_JIA_JI_KE_HE_NEAR_MATCH_TOPOLOGY_AUDIT_VERSION,
  R183_REJECTED_SHORTCUTS,
  R183_REQUIRED_FOLLOW_UP,
  R183_R179_REQUIREMENT_REASSESSMENT,
  R183_SOURCE_CANDIDATES,
  R183_TOPOLOGY_COMPARISON,
} from '../src/research/general-natal-predicate-candidate-jia-ji-ke-he-near-match-topology-audit.js';

describe('R183 Jia-Ji Ke-He near-match topology audit', () => {
  it('binds the exact Jia-Ji dual declarations without inventing settlement', () => {
    expect(R183_JIA_JI_KE_HE_NEAR_MATCH_TOPOLOGY_AUDIT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R183_SOURCE_CANDIDATES[0]).toMatchObject({
      candidateId: 'R183-C01-QIANLI-TIANGAN-JIA',
      exactPair: ['甲', '己'],
      controlDeclarationObserved: true,
      combinationDeclarationObserved: true,
      samePairControlAndCombinationBothDeclared: true,
      sameConfigurationCoexistenceNarrated: false,
      coexistenceOutcomeEstablished: false,
      precedenceEstablished: false,
    });
  });

  it('distinguishes exact-pair third-party blocking from R177 same-pair dual relation', () => {
    expect(R183_SOURCE_CANDIDATES[1]).toMatchObject({
      topologyClass: 'EXACT_PAIR_WITH_THIRD_PARTY_BLOCKING',
      exactPair: ['甲', '己'],
      pairCombinationSurfaceObserved: true,
      thirdPartyControllerObserved: true,
      thirdPartyTargetsPairMember: true,
      sourceOutcomeLanguage: '合而不敢合也，有若無也',
      samePairInternalControlSurfaceNarrated: false,
      directMatchToR177SamePairDualRelation: false,
    });
  });

  it('keeps Qianli generic Ke-He examples outside exact Jia-Ji authority', () => {
    expect(R183_SOURCE_CANDIDATES[2]).toMatchObject({
      topologyClass: 'GENERIC_PAIR_WITH_THIRD_PARTY_KE_HE_COMPETITION',
      exactJiaJiPairUsedInExamples: false,
      combinationPairExampleFamily: '乙庚',
      positionCriterionObserved: true,
      controllerControlledCriterionObserved: true,
      strengthCriterionObserved: true,
      directTransferToR177SamePairDualRelation: false,
    });
  });

  it('compares all near-match topologies against the exact R177 topology', () => {
    expect(R183_TOPOLOGY_COMPARISON).toEqual({
      r177Pair: ['甲', '己'],
      r177ControlSurface: '甲(木)剋己(土)',
      r177CombinationKind: 'stem_five_combination',
      r177TopologyClass: 'SAME_PAIR_CONTROL_PLUS_COMBINATION',
      qianliTianganExactPairDeclarationsAvailable: true,
      zipingExactPairButThirdPartyBlocking: true,
      qianliGenericKeHeThirdPartyCompetition: true,
      anyCandidateNarratesExactSamePairControlAndCombinationSettlement: false,
      thirdPartyInterferenceEquivalentToSamePairDualRelation: false,
      genericKeHeCompetitionEquivalentToSamePairDualRelation: false,
    });
  });

  it('narrows but does not close the R179 coexistence requirement', () => {
    expect(R183_R179_REQUIREMENT_REASSESSMENT).toMatchObject({
      requirementId: 'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS',
      mandatory: true,
      previousNormativeAuthoritySatisfied: false,
      exactPairTraditionalDualRelationDeclarationsNowObserved: true,
      exactPairSameConfigurationCoexistenceNarrationObserved: false,
      exactPairCoexistenceOutcomeAuthorityAcquired: false,
      thirdPartyBlockingSourceMaySatisfy: false,
      genericKeHeCompetitionSourceMaySatisfy: false,
    });
    expect(R183_R179_REQUIREMENT_REASSESSMENT.remainingGap.length).toBeGreaterThan(
      0,
    );
  });

  it('records a substrate advance while preserving all semantic authority closures', () => {
    expect(R183_DISCOVERY_ADVANCE).toEqual({
      r177EngineDualRelationSurfacePreserved: true,
      r179CoexistenceAuthorityStillClosed: true,
      r181GenericKeHeCandidatePreserved: true,
      exactPairTraditionalControlDeclarationFound: true,
      exactPairTraditionalCombinationDeclarationFound: true,
      exactPairTraditionalDualRelationSubstrateFound: true,
      exactPairSameConfigurationSettlementFound: false,
      nearMatchTopologyCount: 2,
      directMatchTopologyCount: 0,
    });
    expect(R183_AUTHORITY).toMatchObject({
      researchOnly: true,
      exactPairTraditionalDualRelationSubstrateObserved: true,
      exactPairControlDeclarationObserved: true,
      exactPairCombinationDeclarationObserved: true,
      exactPairSameConfigurationCoexistenceNarrationObserved: false,
      exactPairCoexistenceOutcomeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('regression-locks topology-transfer shortcuts', () => {
    expect(R183_ADMISSION_GUARDS).toEqual({
      separatePairDeclarationsDoNotEqualSameConfigurationCoexistence: true,
      exactPairThirdPartyBlockingDoesNotEqualSamePairInternalCompetition: true,
      genericThirdPartyKeHeMethodDoesNotEqualExactJiaJiSettlement: true,
      keLiDaYuHeLiLanguageMayNotBecomeUniversalPrecedence: true,
      traditionalSubstrateDoesNotEqualOutcomeAuthority: true,
      sourceFamilyProximityDoesNotAuthorizeTopologyTransfer: true,
    });
    expect(R183_REJECTED_SHORTCUTS).toContain(
      'ZPZ_THIRD_PARTY_BLOCKING_EQUALS_R177_SAME_PAIR_SETTLEMENT',
    );
    expect(R183_REQUIRED_FOLLOW_UP).toContain(
      'EXACT_JIA_JI_SAME_PAIR_CONTROL_COMBINATION_COEXISTENCE_CASE',
    );
  });
});
