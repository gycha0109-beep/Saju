import { describe, expect, it } from 'vitest';

import {
  R179_AUTHORITY,
  R179_CURRENT_EVIDENCE_AUDIT,
  R179_EXACT_SOURCE_CONTEXT,
  R179_GLOBAL_SETTLEMENT_BOUNDARY,
  R179_GOVERNANCE,
  R179_JIA_JI_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS_VERSION,
  R179_PAIR_LOCAL_BOUNDARY,
  R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS,
  R179_PAIR_LOCAL_REQUIREMENT_IDS,
  R179_REJECTED_SHORTCUTS,
  R179_SUMMARY,
  R179_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-jia-ji-pair-local-outcome-evidence-requirements.js';

describe('R179 Jia-Ji pair-local outcome evidence requirements', () => {
  it('binds the exact Ren-Wu source case and both Jia-Ji relation surfaces', () => {
    expect(R179_JIA_JI_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R179_EXACT_SOURCE_CONTEXT).toMatchObject({
      caseId: 'R172-C01-REN-WU-LUCK-JI-JIA-OPPOSES-OFFICER',
      dayStem: '壬',
      monthBranch: '午',
      luckSurface: '運透己官',
      originalTextSurface: '壬生午月，運透己官，而本命有甲乙之類是也',
      commentarySurface: '原局透甲，則官星被回剋而無用',
      reportedRoleSurface: '甲回剋運中所透官星',
      sourceReportsJiaControlsLuckOfficer: true,
      exactPair: ['甲', '己'],
      exactKoreanPair: ['갑', '기'],
      controlSurface: '甲(木)剋己(土)',
      structuralRelationKind: 'stem_five_combination',
      structuralMatchOnly: true,
      transformationEstablished: false,
    });
  });

  it('audits current evidence without promoting a pair-local outcome', () => {
    expect(R179_CURRENT_EVIDENCE_AUDIT).toEqual({
      sourceReportedControlDirectionAvailable: true,
      elementControlSurfaceAvailable: true,
      structuralCombinationCandidateAvailable: true,
      exactPairBothNonDayMaster: true,
      dayMasterHuaQiResultTransferBlocked: true,
      directBindingVerdictAvailable: false,
      directInteractionOutcomeAvailable: false,
      postCombinationSubjectIdentityResolved: false,
      coexistenceSettlementAvailable: false,
      exactContextSettlementAvailable: false,
      pairLocalOutcomeAvailable: false,
      crossRelationPrecedenceAvailable: false,
    });
  });

  it('freezes six exact-pair evidence requirements as currently unsatisfied', () => {
    expect(R179_PAIR_LOCAL_REQUIREMENT_IDS).toEqual([
      'EXACT_NON_DAY_MASTER_JIA_JI_INTERACTION_SOURCE',
      'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS',
      'BINDING_OR_NON_BINDING_SEMANTICS',
      'POST_COMBINATION_SUBJECT_IDENTITY_OR_FUNCTION_PERSISTENCE',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
      'PAIR_LOCAL_OUTCOME_DISTINCT_FROM_CROSS_RELATION_PRECEDENCE',
    ]);
    expect(R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS).toHaveLength(6);
    for (const requirement of R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS) {
      expect(requirement).toMatchObject({
        mandatory: true,
        currentlySatisfiedByNormativeAuthority: false,
        exactPairScopeRequired: true,
        sourceIdentityAndContextRequired: true,
        modelSynthesisMaySatisfy: false,
        genericCombinationRuleMaySatisfy: false,
      });
      expect(requirement.currentEvidenceGap.length).toBeGreaterThan(0);
    }
  });

  it('keeps source narration distinct from combination settlement', () => {
    expect(R179_PAIR_LOCAL_BOUNDARY).toEqual({
      sourceNarrationMayDescribeExactControlDirection: true,
      sourceNarrationMayProveCombinationHasNoEffect: false,
      sourceNarrationMayProveControlCancelsCombination: false,
      sourceNarrationMayProveCombinationCancelsControl: false,
      structuralCombinationCandidateMayCreateBindingVerdict: false,
      structuralCombinationCandidateMayCreateTransformationVerdict: false,
      pairLocalOutcomeMayBeBorrowedFromGenericHuaQi: false,
      pairLocalOutcomeMayBeBorrowedFromGenericHeErBuHua: false,
      pairLocalOutcomeMayBeBorrowedFromI233Precedence: false,
      pairLocalOutcomeEstablished: false,
    });
  });

  it('preserves the I233 global settlement authority gap', () => {
    expect(R179_GLOBAL_SETTLEMENT_BOUNDARY).toMatchObject({
      i233AuthorityGap:
        'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED',
      i233AuthorityGapClosed: false,
      i233RequirementCount: 8,
      crossRelationPrecedenceAuthorized: false,
      multiTouchAggregationAuthorized: false,
      competingRelationSettlementResolved: false,
      r179DoesNotMutateGlobalSettlementAuthority: true,
    });
    expect(R179_GLOBAL_SETTLEMENT_BOUNDARY.i233RequirementIds).toHaveLength(8);
  });

  it('rejects pair-local and global settlement shortcuts', () => {
    expect(R179_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'SOURCE_REPORTS_HUI_KE_EQUALS_COMBINATION_HAS_NO_EFFECT',
        'SOURCE_REPORTS_HUI_KE_EQUALS_CONTROL_WINS_OVER_COMBINATION',
        'JIA_JI_STRUCTURAL_COMBINATION_EQUALS_BINDING',
        'JIA_JI_STRUCTURAL_COMBINATION_EQUALS_TRANSFORMATION',
        'PAIR_LOCAL_OUTCOME_EQUALS_CROSS_RELATION_PRECEDENCE',
        'MODEL_SYNTHESIS_EQUALS_PAIR_LOCAL_AUTHORITY',
      ]),
    );
  });

  it('preserves upstream boundaries and keeps execution authority closed', () => {
    expect(R179_GOVERNANCE).toEqual({
      upstreamR177DualSurfacePreserved: true,
      upstreamR178ScopeTransferBlockPreserved: true,
      upstreamPairLocalOutcomeStillClosed: true,
      sourceReportedControlDirectionDistinctFromOutcomeSettlement: true,
      pairLocalRequirementAuditDistinctFromNormativeAuthorityAcquisition: true,
      pairLocalOutcomeRequiredBeforeCrossRelationPrecedence: true,
      i233GlobalAuthorityGapPreserved: true,
    });
    expect(R179_UPSTREAM_BINDINGS).toMatchObject({
      r177: {
        exactPair: ['甲', '己'],
        dualRelationSurfaceObserved: true,
        exactContextSettlementEstablished: false,
      },
      r178: {
        pairLocalInteractionOutcomeEstablished: false,
        transformationVerdict: 'not_determined',
        bindingVerdict: 'not_determined',
        interactionOutcome: 'not_determined',
      },
      i233: {
        authorityGap:
          'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED',
        authorityGapClosed: false,
      },
    });
  });

  it('summarizes an audited requirement frontier with zero promoted outcomes', () => {
    expect(R179_SUMMARY).toEqual({
      exactSourceCaseCount: 1,
      observedRelationSurfaceCount: 2,
      requirementCount: 6,
      currentlySatisfiedRequirementCount: 0,
      authorizedPairLocalOutcomeCount: 0,
      authorizedCrossRelationPrecedenceCount: 0,
    });
    expect(R179_AUTHORITY).toMatchObject({
      researchOnly: true,
      exactSourceCaseBound: true,
      sourceReportedControlDirectionPreserved: true,
      structuralCombinationCandidatePreserved: true,
      exactPairRequirementSetEstablished: true,
      pairLocalNormativeAuthorityAcquired: false,
      pairLocalInteractionOutcomeEstablished: false,
      jiaJiBindingEstablished: false,
      jiaJiTransformationEstablished: false,
      jiaJiNoEffectEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      competingRelationSettlementResolved: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
