import { describe, expect, it } from 'vitest';

import {
  R178_AUTHORITY,
  R178_EXACT_PAIR_SCOPE,
  R178_GOVERNANCE,
  R178_I42_SCOPE_BINDING,
  R178_I76_ROUTE,
  R178_JIA_JI_SCOPE_TRANSFER_BLOCK_VERSION,
  R178_PAIR_LOCAL_OUTCOME_BOUNDARY,
  R178_REJECTED_SHORTCUTS,
  R178_REQUIRED_FOLLOW_UP,
  R178_SUMMARY,
  R178_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-jia-ji-scope-transfer-block.js';

describe('R178 Jia-Ji non-day-master stem-five scope route', () => {
  it('binds the exact Jia-Ji pair under Ren day master', () => {
    expect(R178_JIA_JI_SCOPE_TRANSFER_BLOCK_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R178_EXACT_PAIR_SCOPE).toMatchObject({
      dayMaster: '임',
      dayMasterHanja: '壬',
      pair: ['갑', '기'],
      pairHanja: ['甲', '己'],
      leftIsDayMaster: false,
      rightIsDayMaster: false,
      bothParticipantsAreNonDayMaster: true,
      structuralRelationKind: 'stem_five_combination',
      dualRelationSurfaceObserved: true,
    });
  });

  it('inherits the I42 non-day-master transformation scope closure', () => {
    expect(R178_I42_SCOPE_BINDING).toMatchObject({
      decision: 'NON_DAY_MASTER_CHALLENGE_STEM_TRANSFORMATION_SCOPE_TRANSFER_BLOCKED',
      traditionalHuaQiResultSubjectIsDayStem: true,
      dayStemHuaQiResultContractDirectTransferAuthorized: false,
      dayStemTransformationConditionSetDirectResultReuseAuthorized: false,
      challengeTargetStemTransformationStateEmissionAuthorized: false,
      challengeTargetStemTransformationTargetElementAdoptionAuthorized: false,
      challengeTargetStemNoTransformationConclusionAuthorized: false,
      genericChallengeTargetBindingVerdictTransferAuthorized: false,
      challengeTargetStemBindingEffectEmissionAuthorized: false,
      combinationStructuralInteractionEvidenceStillRelevant: true,
      combinationInteractionSettlementPolicyStillRequired: true,
    });
  });

  it('routes the pair through the I76 stem-five scope-transfer block', () => {
    expect(R178_I76_ROUTE).toMatchObject({
      relationKind: 'stem_five_combination',
      readiness: 'STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED',
      structuralRelationAuthorityAvailable: true,
      exactCurrentChartCandidateSubstrateAvailable: true,
      transformationResultRouteAuthorized: false,
      directBindingVerdictAuthorized: false,
      directInteractionOutcomeAuthorized: false,
      noEffectConclusionAuthorized: false,
      postInteractionStateResolved: false,
      postCombinationSubjectIdentityPolicyResolved: false,
    });
    expect(R178_I76_ROUTE.requiredAuthorityRefs).toEqual(
      expect.arrayContaining(['I35', 'I38', 'I39', 'I40', 'I42']),
    );
  });

  it('preserves both relation surfaces while leaving every pair-local outcome unresolved', () => {
    expect(R178_PAIR_LOCAL_OUTCOME_BOUNDARY).toEqual({
      structuralCombinationMembershipPreserved: true,
      traditionalHuaQiReferenceMetadataMayRemain: true,
      jiaJiTransformationVerdict: 'not_determined',
      jiaJiBindingVerdict: 'not_determined',
      jiaJiInteractionOutcome: 'not_determined',
      jiaJiNeutralizationVerdict: 'not_determined',
      jiaJiNoEffectVerdict: 'not_determined',
      postCombinationSubjectIdentity: 'not_determined',
      controlSurfaceStillObserved: true,
      combinationSurfaceStillObserved: true,
      dualRelationSettlementStillUnresolved: true,
      genericControlOverCombinationPrecedenceEstablished: false,
      genericCombinationOverControlPrecedenceEstablished: false,
    });
  });

  it('keeps the next pair-local evidence frontier explicit', () => {
    expect(R178_REQUIRED_FOLLOW_UP).toEqual([
      'SOURCE_BOUNDED_NON_DAY_MASTER_STEM_FIVE_INTERACTION_EFFECT',
      'PAIR_LOCAL_BINDING_OR_NON_BINDING_EVIDENCE_FOR_JIA_JI',
      'POST_COMBINATION_SUBJECT_IDENTITY_EVIDENCE',
      'JIA_JI_CONTROL_AND_COMBINATION_COEXISTENCE_EVIDENCE',
      'PAIR_LOCAL_OUTCOME_BEFORE_CROSS_RELATION_PRECEDENCE',
    ]);
    expect(R178_SUMMARY).toEqual({
      participantCount: 2,
      nonDayMasterParticipantCount: 2,
      structuralRelationKindCount: 1,
      authorizedTransformationOutcomeCount: 0,
      authorizedBindingOutcomeCount: 0,
      authorizedNoEffectOutcomeCount: 0,
      requiredFollowUpCount: 5,
    });
  });

  it('preserves upstream and scope-transfer governance', () => {
    expect(R178_GOVERNANCE).toEqual({
      upstreamDualRelationSurfacePreserved: true,
      upstreamSettlementStillClosed: true,
      exactPairIsNonDayMasterPair: true,
      i42DirectResultTransferStillClosed: true,
      i76StemFiveRouteIsScopeTransferBlocked: true,
      structuralEvidencePreservedWithoutOutcomePromotion: true,
      pairLocalOutcomeRequiredBeforeCrossRelationPrecedence: true,
    });
    expect(R178_UPSTREAM_BINDINGS).toMatchObject({
      r177: {
        structuralRelationKind: 'stem_five_combination',
        settlementEstablished: false,
      },
      i42: {
        decision: 'NON_DAY_MASTER_CHALLENGE_STEM_TRANSFORMATION_SCOPE_TRANSFER_BLOCKED',
      },
      i76: {
        relationKind: 'stem_five_combination',
        readiness: 'STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED',
      },
    });
  });

  it('rejects transformation, no-effect, and precedence shortcuts', () => {
    expect(R178_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'JIA_JI_STRUCTURAL_COMBINATION_EQUALS_HUA_TU',
        'TRADITIONAL_DAY_STEM_HUA_QI_EQUALS_NON_DAY_MASTER_PAIR_RESULT',
        'BLOCKED_TRANSFORMATION_SCOPE_EQUALS_NO_EFFECT',
        'BLOCKED_TRANSFORMATION_SCOPE_EQUALS_UNBOUND',
        'STRUCTURAL_MEMBERSHIP_EQUALS_BINDING',
        'STRUCTURAL_MEMBERSHIP_EQUALS_TRANSFORMATION',
        'SCOPE_TRANSFER_BLOCK_EQUALS_CONTROL_WINS',
        'SCOPE_TRANSFER_BLOCK_EQUALS_COMBINATION_WINS',
      ]),
    );
  });

  it('keeps outcome, execution, claim, and production authority closed', () => {
    expect(R178_AUTHORITY).toMatchObject({
      researchOnly: true,
      exactJiaJiPairBound: true,
      bothPairParticipantsNonDayMasterEstablished: true,
      structuralStemFiveCombinationPreserved: true,
      stemFiveScopeTransferBlocked: true,
      traditionalHuaQiDirectTransferAuthorized: false,
      jiaJiTransformationEstablished: false,
      jiaJiBindingEstablished: false,
      jiaJiNoEffectEstablished: false,
      postCombinationSubjectIdentityResolved: false,
      pairLocalInteractionOutcomeEstablished: false,
      genericControlOverCombinationPrecedenceEstablished: false,
      genericCombinationOverControlPrecedenceEstablished: false,
      crossRelationPrecedenceAuthorized: false,
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
