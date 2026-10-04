import {
  R172_JIA_CONTRAST_CASES,
} from './general-natal-predicate-candidate-same-symbol-opposite-role-contrast.js';
import {
  R177_AUTHORITY,
  R177_EXISTING_SETTLEMENT_BOUNDARY,
  R177_JIA_JI_DUAL_RELATION_SURFACE,
} from './general-natal-predicate-candidate-jia-ji-competing-relation-bridge.js';
import {
  R178_AUTHORITY,
  R178_I42_SCOPE_BINDING,
  R178_I76_ROUTE,
  R178_PAIR_LOCAL_OUTCOME_BOUNDARY,
} from './general-natal-predicate-candidate-jia-ji-scope-transfer-block.js';
import {
  buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview,
  I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
} from './i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';

export const R179_JIA_JI_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS_VERSION =
  '0.1.0-research' as const;

const negativeCase = R172_JIA_CONTRAST_CASES.find(
  (item) => item.caseId === 'R172-C01-REN-WU-LUCK-JI-JIA-OPPOSES-OFFICER',
);

if (negativeCase === undefined) {
  throw new Error('R179 missing exact Ren-Wu/Jia-Ji source case');
}

const i233 =
  buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();

export const R179_EXACT_SOURCE_CONTEXT = Object.freeze({
  caseId: negativeCase.caseId,
  dayStem: negativeCase.dayStem,
  monthBranch: negativeCase.monthBranch,
  luckSurface: negativeCase.luckSurface,
  targetStructure: negativeCase.targetStructure,
  originalTextSurface: negativeCase.originalTextSurface,
  commentarySurface: negativeCase.commentarySurface,
  reportedRoleSurface: negativeCase.reportedRoleSurface,
  sourceReportsJiaControlsLuckOfficer: true as const,
  exactPair: R177_JIA_JI_DUAL_RELATION_SURFACE.pair,
  exactKoreanPair: R177_JIA_JI_DUAL_RELATION_SURFACE.koreanPair,
  controlSurface: R177_JIA_JI_DUAL_RELATION_SURFACE.r176ElementControlSurface,
  structuralRelationKind:
    R177_JIA_JI_DUAL_RELATION_SURFACE.structuralRelationKind,
  structuralMatchOnly:
    R177_JIA_JI_DUAL_RELATION_SURFACE.structuralMatchOnly,
  transformationEstablished:
    R177_JIA_JI_DUAL_RELATION_SURFACE.combinationTransformationEstablished,
});

export const R179_CURRENT_EVIDENCE_AUDIT = Object.freeze({
  sourceReportedControlDirectionAvailable:
    R177_AUTHORITY.caseSpecificControlDirectionReported,
  elementControlSurfaceAvailable:
    R177_AUTHORITY.jiaJiElementControlSurfaceObserved,
  structuralCombinationCandidateAvailable:
    R177_AUTHORITY.jiaJiStemCombinationCandidateObserved,
  exactPairBothNonDayMaster:
    R178_AUTHORITY.bothPairParticipantsNonDayMasterEstablished,
  dayMasterHuaQiResultTransferBlocked:
    !R178_I42_SCOPE_BINDING.dayStemHuaQiResultContractDirectTransferAuthorized,
  directBindingVerdictAvailable: R178_I76_ROUTE.directBindingVerdictAuthorized,
  directInteractionOutcomeAvailable:
    R178_I76_ROUTE.directInteractionOutcomeAuthorized,
  postCombinationSubjectIdentityResolved:
    R178_I76_ROUTE.postCombinationSubjectIdentityPolicyResolved,
  coexistenceSettlementAvailable:
    R177_AUTHORITY.coexistenceSettlementEstablished,
  exactContextSettlementAvailable:
    R177_AUTHORITY.exactContextSettlementEstablished,
  pairLocalOutcomeAvailable:
    R178_AUTHORITY.pairLocalInteractionOutcomeEstablished,
  crossRelationPrecedenceAvailable:
    R177_EXISTING_SETTLEMENT_BOUNDARY.crossRelationPrecedenceAuthorized,
});

export const R179_PAIR_LOCAL_REQUIREMENT_IDS = Object.freeze([
  'EXACT_NON_DAY_MASTER_JIA_JI_INTERACTION_SOURCE',
  'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS',
  'BINDING_OR_NON_BINDING_SEMANTICS',
  'POST_COMBINATION_SUBJECT_IDENTITY_OR_FUNCTION_PERSISTENCE',
  'CONTEXT_AND_EXCEPTION_CONDITIONS',
  'PAIR_LOCAL_OUTCOME_DISTINCT_FROM_CROSS_RELATION_PRECEDENCE',
] as const);

export type R179PairLocalRequirementId =
  (typeof R179_PAIR_LOCAL_REQUIREMENT_IDS)[number];

export interface R179PairLocalOutcomeEvidenceRequirement {
  requirementId: R179PairLocalRequirementId;
  mandatory: true;
  currentlySatisfiedByNormativeAuthority: false;
  exactPairScopeRequired: true;
  sourceIdentityAndContextRequired: true;
  modelSynthesisMaySatisfy: false;
  genericCombinationRuleMaySatisfy: false;
  currentEvidenceGap: string;
}

const REQUIREMENT_GAPS: Readonly<Record<R179PairLocalRequirementId, string>> =
  Object.freeze({
    EXACT_NON_DAY_MASTER_JIA_JI_INTERACTION_SOURCE:
      'The current source reports Jia controlling the luck officer, but does not explicitly adjudicate the non-day-master Jia-Ji structural combination interaction.',
    CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS:
      'The repository preserves both control and combination surfaces, but no source-bounded coexistence or cancellation semantics are established.',
    BINDING_OR_NON_BINDING_SEMANTICS:
      'I42/I76 block direct transfer of generic Hua-Qi or binding language, so an exact Jia-Ji binding or non-binding verdict remains unsupported.',
    POST_COMBINATION_SUBJECT_IDENTITY_OR_FUNCTION_PERSISTENCE:
      'No authority establishes whether Jia and Ji retain, modify, or replace their functional identities after the structural combination interaction.',
    CONTEXT_AND_EXCEPTION_CONDITIONS:
      'Strength, rooting, transparency, seasonal support, luck scope, and competing context remain insufficiently bound to an exact Jia-Ji interaction outcome.',
    PAIR_LOCAL_OUTCOME_DISTINCT_FROM_CROSS_RELATION_PRECEDENCE:
      'A pair-local outcome must be established before I233-style cross-relation precedence or generic competing-relation settlement can be considered.',
  });

export const R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS = Object.freeze(
  R179_PAIR_LOCAL_REQUIREMENT_IDS.map(
    (requirementId): R179PairLocalOutcomeEvidenceRequirement =>
      Object.freeze({
        requirementId,
        mandatory: true,
        currentlySatisfiedByNormativeAuthority: false,
        exactPairScopeRequired: true,
        sourceIdentityAndContextRequired: true,
        modelSynthesisMaySatisfy: false,
        genericCombinationRuleMaySatisfy: false,
        currentEvidenceGap: REQUIREMENT_GAPS[requirementId],
      }),
  ),
);

export const R179_PAIR_LOCAL_BOUNDARY = Object.freeze({
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

export const R179_REJECTED_SHORTCUTS = Object.freeze([
  'SOURCE_REPORTS_HUI_KE_EQUALS_COMBINATION_HAS_NO_EFFECT',
  'SOURCE_REPORTS_HUI_KE_EQUALS_CONTROL_WINS_OVER_COMBINATION',
  'JIA_JI_STRUCTURAL_COMBINATION_EQUALS_BINDING',
  'JIA_JI_STRUCTURAL_COMBINATION_EQUALS_TRANSFORMATION',
  'BLOCKED_HUA_QI_SCOPE_EQUALS_UNBOUND',
  'BLOCKED_HUA_QI_SCOPE_EQUALS_NO_INTERACTION',
  'GENERIC_HE_ER_BU_HUA_EQUALS_JIA_JI_PAIR_LOCAL_OUTCOME',
  'PAIR_LOCAL_OUTCOME_EQUALS_CROSS_RELATION_PRECEDENCE',
  'I233_REQUIREMENT_SET_EQUALS_JIA_JI_OUTCOME',
  'MODEL_SYNTHESIS_EQUALS_PAIR_LOCAL_AUTHORITY',
] as const);

export const R179_GLOBAL_SETTLEMENT_BOUNDARY = Object.freeze({
  i233AuthorityGap: i233.authorityGap,
  i233AuthorityGapClosed: i233.authorityGapClosed,
  i233RequirementIds: I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
  i233RequirementCount: i233.requirementCount,
  crossRelationPrecedenceAuthorized: i233.crossRelationPrecedenceAuthorized,
  multiTouchAggregationAuthorized: i233.multiTouchAggregationAuthorized,
  competingRelationSettlementResolved: i233.competingRelationSettlementResolved,
  r179DoesNotMutateGlobalSettlementAuthority: true,
});

export const R179_GOVERNANCE = Object.freeze({
  upstreamR177DualSurfacePreserved: R177_AUTHORITY.dualRelationSurfaceObserved,
  upstreamR178ScopeTransferBlockPreserved:
    R178_AUTHORITY.stemFiveScopeTransferBlocked,
  upstreamPairLocalOutcomeStillClosed:
    !R178_AUTHORITY.pairLocalInteractionOutcomeEstablished,
  sourceReportedControlDirectionDistinctFromOutcomeSettlement: true,
  pairLocalRequirementAuditDistinctFromNormativeAuthorityAcquisition: true,
  pairLocalOutcomeRequiredBeforeCrossRelationPrecedence: true,
  i233GlobalAuthorityGapPreserved:
    i233.authorityGapConfirmed && !i233.authorityGapClosed,
});

export const R179_SUMMARY = Object.freeze({
  exactSourceCaseCount: 1,
  observedRelationSurfaceCount:
    R177_JIA_JI_DUAL_RELATION_SURFACE.relationSurfaceCount,
  requirementCount: R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS.length,
  currentlySatisfiedRequirementCount:
    R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS.filter(
      (item) => item.currentlySatisfiedByNormativeAuthority,
    ).length,
  authorizedPairLocalOutcomeCount: 0,
  authorizedCrossRelationPrecedenceCount: 0,
});

export const R179_UPSTREAM_BINDINGS = Object.freeze({
  r177: {
    exactPair: R177_JIA_JI_DUAL_RELATION_SURFACE.pair,
    dualRelationSurfaceObserved: R177_AUTHORITY.dualRelationSurfaceObserved,
    exactContextSettlementEstablished:
      R177_AUTHORITY.exactContextSettlementEstablished,
  },
  r178: {
    pairLocalInteractionOutcomeEstablished:
      R178_AUTHORITY.pairLocalInteractionOutcomeEstablished,
    transformationVerdict:
      R178_PAIR_LOCAL_OUTCOME_BOUNDARY.jiaJiTransformationVerdict,
    bindingVerdict: R178_PAIR_LOCAL_OUTCOME_BOUNDARY.jiaJiBindingVerdict,
    interactionOutcome:
      R178_PAIR_LOCAL_OUTCOME_BOUNDARY.jiaJiInteractionOutcome,
  },
  i233: {
    reviewId: i233.reviewId,
    authorityGap: i233.authorityGap,
    authorityGapClosed: i233.authorityGapClosed,
  },
});

export const R179_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_JIA_JI_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS_AUDITED' as const,
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
  genericControlOverCombinationPrecedenceEstablished: false,
  genericCombinationOverControlPrecedenceEstablished: false,
  crossRelationPrecedenceAuthorized: false,
  competingRelationSettlementResolved: false,
  exactConfigurationTuplePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
