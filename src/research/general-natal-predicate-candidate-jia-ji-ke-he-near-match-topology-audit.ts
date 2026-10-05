import {
  R177_AUTHORITY,
  R177_JIA_JI_DUAL_RELATION_SURFACE,
} from './general-natal-predicate-candidate-jia-ji-competing-relation-bridge.js';
import {
  R179_AUTHORITY,
  R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS,
} from './general-natal-predicate-candidate-jia-ji-pair-local-outcome-evidence-requirements.js';
import {
  R181_AUTHORITY,
  R181_KE_HE_COMPETITION_METHOD_CANDIDATE,
} from './general-natal-predicate-candidate-qianli-jia-ji-witness-acquisition.js';

export const R183_JIA_JI_KE_HE_NEAR_MATCH_TOPOLOGY_AUDIT_VERSION =
  '0.1.0-research' as const;

export type R183SourceTopologyClass =
  | 'EXACT_PAIR_DUAL_RELATION_DECLARATIONS_WITHOUT_SETTLEMENT'
  | 'EXACT_PAIR_WITH_THIRD_PARTY_BLOCKING'
  | 'GENERIC_PAIR_WITH_THIRD_PARTY_KE_HE_COMPETITION';

export const R183_SOURCE_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'R183-C01-QIANLI-TIANGAN-JIA',
    workTitle: '千里命稿' as const,
    sectionTitle: '天干篇·甲' as const,
    sourceUrl: 'https://www.suanzhun.net/dianji/qianliminggao/207.html',
    topologyClass:
      'EXACT_PAIR_DUAL_RELATION_DECLARATIONS_WITHOUT_SETTLEMENT' as const,
    exactPair: Object.freeze(['甲', '己'] as const),
    controlDeclarationObserved: true,
    controlSurface: '甲克戊己辰戌丑未' as const,
    combinationDeclarationObserved: true,
    combinationSurface: '合：甲己相合' as const,
    samePairControlAndCombinationBothDeclared: true,
    sameConfigurationCoexistenceNarrated: false,
    coexistenceOutcomeEstablished: false,
    precedenceEstablished: false,
  }),
  Object.freeze({
    candidateId: 'R183-C02-ZIPING-JIA-JI-INTERVENING-STEM',
    workTitle: '子平真詮' as const,
    sectionTitle: '論十干合而不合' as const,
    sourceUrl:
      'https://yiology.net/books/%E5%91%BD/%E5%85%AB%E5%AD%97%E5%91%BD%E7%90%86/%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%AF%A0/7',
    topologyClass: 'EXACT_PAIR_WITH_THIRD_PARTY_BLOCKING' as const,
    exactPair: Object.freeze(['甲', '己'] as const),
    pairCombinationSurfaceObserved: true,
    thirdPartyControllerObserved: true,
    thirdPartyTargetsPairMember: true,
    thirdPartyStemExamples: Object.freeze(['庚'] as const),
    sourceOutcomeLanguage: '合而不敢合也，有若無也' as const,
    samePairInternalControlSurfaceNarrated: false,
    directMatchToR177SamePairDualRelation: false,
  }),
  Object.freeze({
    candidateId: 'R183-C03-QIANLI-GAN-KE-GAN-HE-BING-JIAN',
    workTitle: '千里命稿' as const,
    sectionTitle: '干克干合並見' as const,
    sourceUrl: 'https://www.taiyi.me/book/index?id=214240559591493',
    topologyClass:
      'GENERIC_PAIR_WITH_THIRD_PARTY_KE_HE_COMPETITION' as const,
    exactJiaJiPairUsedInExamples: false,
    combinationPairExampleFamily: '乙庚' as const,
    positionCriterionObserved: true,
    controllerControlledCriterionObserved: true,
    strengthCriterionObserved: true,
    equalStrengthFallbackLanguageObserved: true,
    genericMethodSurfaceObserved:
      R181_KE_HE_COMPETITION_METHOD_CANDIDATE.methodSurfaceObserved,
    directTransferToR177SamePairDualRelation: false,
  }),
]);

export const R183_TOPOLOGY_COMPARISON = Object.freeze({
  r177Pair: R177_JIA_JI_DUAL_RELATION_SURFACE.pair,
  r177ControlSurface: R177_JIA_JI_DUAL_RELATION_SURFACE.r176ElementControlSurface,
  r177CombinationKind:
    R177_JIA_JI_DUAL_RELATION_SURFACE.structuralRelationKind,
  r177TopologyClass: 'SAME_PAIR_CONTROL_PLUS_COMBINATION' as const,
  qianliTianganExactPairDeclarationsAvailable: true,
  zipingExactPairButThirdPartyBlocking: true,
  qianliGenericKeHeThirdPartyCompetition: true,
  anyCandidateNarratesExactSamePairControlAndCombinationSettlement:
    R183_SOURCE_CANDIDATES.some(
      (item) =>
        item.topologyClass ===
          'EXACT_PAIR_DUAL_RELATION_DECLARATIONS_WITHOUT_SETTLEMENT' &&
        item.coexistenceOutcomeEstablished,
    ),
  thirdPartyInterferenceEquivalentToSamePairDualRelation: false,
  genericKeHeCompetitionEquivalentToSamePairDualRelation: false,
});

const coexistenceRequirement =
  R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS.find(
    (item) =>
      item.requirementId ===
      'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS',
  );

if (coexistenceRequirement === undefined) {
  throw new Error('R183 missing R179 coexistence requirement');
}

export const R183_R179_REQUIREMENT_REASSESSMENT = Object.freeze({
  requirementId: coexistenceRequirement.requirementId,
  mandatory: coexistenceRequirement.mandatory,
  previousNormativeAuthoritySatisfied:
    coexistenceRequirement.currentlySatisfiedByNormativeAuthority,
  exactPairTraditionalDualRelationDeclarationsNowObserved: true,
  exactPairSameConfigurationCoexistenceNarrationObserved: false,
  exactPairCoexistenceOutcomeAuthorityAcquired: false,
  thirdPartyBlockingSourceMaySatisfy: false,
  genericKeHeCompetitionSourceMaySatisfy: false,
  remainingGap:
    'A source must narrate or adjudicate the same Jia-Ji pair where Jia-to-Ji control and Jia-Ji combination are simultaneously operative in one bounded configuration.',
});

export const R183_DISCOVERY_ADVANCE = Object.freeze({
  r177EngineDualRelationSurfacePreserved: R177_AUTHORITY.dualRelationSurfaceObserved,
  r179CoexistenceAuthorityStillClosed:
    !R179_AUTHORITY.coexistenceSettlementEstablished,
  r181GenericKeHeCandidatePreserved:
    R181_AUTHORITY.genericKeHeCompetitionMethodCandidateBound,
  exactPairTraditionalControlDeclarationFound: true,
  exactPairTraditionalCombinationDeclarationFound: true,
  exactPairTraditionalDualRelationSubstrateFound: true,
  exactPairSameConfigurationSettlementFound: false,
  nearMatchTopologyCount: 2,
  directMatchTopologyCount: 0,
});

export const R183_ADMISSION_GUARDS = Object.freeze({
  separatePairDeclarationsDoNotEqualSameConfigurationCoexistence: true,
  exactPairThirdPartyBlockingDoesNotEqualSamePairInternalCompetition: true,
  genericThirdPartyKeHeMethodDoesNotEqualExactJiaJiSettlement: true,
  keLiDaYuHeLiLanguageMayNotBecomeUniversalPrecedence: true,
  traditionalSubstrateDoesNotEqualOutcomeAuthority: true,
  sourceFamilyProximityDoesNotAuthorizeTopologyTransfer: true,
});

export const R183_REQUIRED_FOLLOW_UP = Object.freeze([
  'EXACT_JIA_JI_SAME_PAIR_CONTROL_COMBINATION_COEXISTENCE_CASE',
  'EXACT_JIA_JI_SAME_PAIR_COEXISTENCE_OUTCOME_LANGUAGE',
  'CONTEXT_CONDITIONS_FOR_ANY_EXACT_JIA_JI_SETTLEMENT',
  'COUNTEREXAMPLE_OR_EXCEPTION_TO_ANY_PROPOSED_JIA_JI_SETTLEMENT',
] as const);

export const R183_REJECTED_SHORTCUTS = Object.freeze([
  'JIA_CONTROLS_JI_PLUS_JIA_JI_COMBINES_EQUALS_CONTROL_WINS',
  'JIA_CONTROLS_JI_PLUS_JIA_JI_COMBINES_EQUALS_COMBINATION_WINS',
  'ZPZ_THIRD_PARTY_BLOCKING_EQUALS_R177_SAME_PAIR_SETTLEMENT',
  'QIANLI_GENERIC_KE_HE_METHOD_EQUALS_R177_SAME_PAIR_SETTLEMENT',
  'KE_LI_DA_YU_HE_LI_EQUALS_UNIVERSAL_RULE',
  'EXACT_PAIR_SUBSTRATE_EQUALS_COEXISTENCE_OUTCOME',
] as const);

export const R183_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_JIA_JI_KE_HE_NEAR_MATCH_TOPOLOGY_AUDIT_COMPLETE' as const,
  researchOnly: true,
  exactPairTraditionalDualRelationSubstrateObserved: true,
  exactPairControlDeclarationObserved: true,
  exactPairCombinationDeclarationObserved: true,
  exactPairSameConfigurationCoexistenceNarrationObserved: false,
  exactPairCoexistenceOutcomeAuthorityAcquired: false,
  pairLocalInteractionOutcomeEstablished: false,
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
