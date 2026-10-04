import {
  R051_AUTHORITY,
  R051_FIVE_COMBINATION_FAMILIES,
} from './general-natal-heavenly-stem-five-combination.js';
import {
  R142_AUTHORITY,
} from './general-natal-competing-heavenly-stem-combination-target-corpus.js';
import {
  R172_AUTHORITY,
} from './general-natal-predicate-candidate-same-symbol-opposite-role-contrast.js';
import {
  R177_AUTHORITY,
} from './general-natal-predicate-candidate-jia-ji-competing-relation-bridge.js';
import {
  R178_AUTHORITY,
} from './general-natal-predicate-candidate-jia-ji-scope-transfer-block.js';
import {
  R179_AUTHORITY,
  R179_GLOBAL_SETTLEMENT_BOUNDARY,
  R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS,
  R179_PAIR_LOCAL_REQUIREMENT_IDS,
} from './general-natal-predicate-candidate-jia-ji-pair-local-outcome-evidence-requirements.js';

export const R180_JIA_JI_REPOSITORY_EVIDENCE_COVERAGE_AUDIT_VERSION =
  '0.1.0-research' as const;

export type R180RepositoryCoverageClass =
  | 'PARTIAL_SUBSTRATE_ONLY'
  | 'NO_OUTCOME_AUTHORITY'
  | 'REPOSITORY_GOVERNANCE_ONLY';

export interface R180RequirementCoverageRow {
  requirementId: (typeof R179_PAIR_LOCAL_REQUIREMENT_IDS)[number];
  coverageClass: R180RepositoryCoverageClass;
  repositorySubstrateAvailable: boolean;
  repositoryGovernanceBoundaryAvailable: boolean;
  normativeAuthoritySatisfied: false;
  externalPrimaryOrCanonicalWitnessStillRequired: true;
  coveredAssetRefs: readonly string[];
  finding: string;
}

const jiaJiFamily = R051_FIVE_COMBINATION_FAMILIES.find(
  (item) => item.pairId === 'JIA-JI',
);

if (jiaJiFamily === undefined) {
  throw new Error('R180 missing R051 JIA-JI pair family');
}

export const R180_REPOSITORY_ASSET_AUDIT = Object.freeze({
  r051: Object.freeze({
    pairIdentityVerified: jiaJiFamily.pairIdentityVerified,
    effectiveCombinationAuthorized: jiaJiFamily.effectiveCombinationAuthorized,
    transformationAuthorized: jiaJiFamily.transformationAuthorized,
    globalEffectiveCombinationResolverAuthorized:
      R051_AUTHORITY.effectiveCombinationResolverAuthorized,
  }),
  r142: Object.freeze({
    allFiveCombinationFamiliesCovered:
      R142_AUTHORITY.allFiveCombinationFamiliesCovered,
    allStructuralCandidatesPreserved:
      R142_AUTHORITY.allStructuralCandidatesPreserved,
    effectiveCombinationResolverAuthorized:
      R142_AUTHORITY.effectiveCombinationResolverAuthorized,
    transformationResolverAuthorized:
      R142_AUTHORITY.transformationResolverAuthorized,
  }),
  r172: Object.freeze({
    exactSourceNarrationAvailable:
      R172_AUTHORITY.sameJiaSymbolComparedAcrossTwoConfigurations,
    configurationDependenceObserved:
      R172_AUTHORITY.configurationDependenceObserved,
    standaloneJiaPredicateAuthorized:
      R172_AUTHORITY.standaloneJiaPredicateAuthorized,
    settlementEstablished: R172_AUTHORITY.settlementEstablished,
  }),
  r177: Object.freeze({
    exactControlSurfaceObserved:
      R177_AUTHORITY.jiaJiElementControlSurfaceObserved,
    structuralCombinationCandidateObserved:
      R177_AUTHORITY.jiaJiStemCombinationCandidateObserved,
    dualRelationSurfaceObserved: R177_AUTHORITY.dualRelationSurfaceObserved,
    exactContextSettlementEstablished:
      R177_AUTHORITY.exactContextSettlementEstablished,
    crossRelationPrecedenceAuthorized:
      R177_AUTHORITY.crossRelationPrecedenceAuthorized,
  }),
  r178: Object.freeze({
    exactPairBothNonDayMaster:
      R178_AUTHORITY.bothPairParticipantsNonDayMasterEstablished,
    stemFiveScopeTransferBlocked:
      R178_AUTHORITY.stemFiveScopeTransferBlocked,
    pairLocalInteractionOutcomeEstablished:
      R178_AUTHORITY.pairLocalInteractionOutcomeEstablished,
    jiaJiBindingEstablished: R178_AUTHORITY.jiaJiBindingEstablished,
    jiaJiTransformationEstablished:
      R178_AUTHORITY.jiaJiTransformationEstablished,
  }),
  r179: Object.freeze({
    exactPairRequirementSetEstablished:
      R179_AUTHORITY.exactPairRequirementSetEstablished,
    pairLocalNormativeAuthorityAcquired:
      R179_AUTHORITY.pairLocalNormativeAuthorityAcquired,
    requirementCount: R179_PAIR_LOCAL_OUTCOME_EVIDENCE_REQUIREMENTS.length,
  }),
  i233: Object.freeze({
    authorityGap: R179_GLOBAL_SETTLEMENT_BOUNDARY.i233AuthorityGap,
    authorityGapClosed: R179_GLOBAL_SETTLEMENT_BOUNDARY.i233AuthorityGapClosed,
    crossRelationPrecedenceAuthorized:
      R179_GLOBAL_SETTLEMENT_BOUNDARY.crossRelationPrecedenceAuthorized,
  }),
});

const COVERAGE_ROWS: readonly R180RequirementCoverageRow[] = Object.freeze([
  Object.freeze({
    requirementId: 'EXACT_NON_DAY_MASTER_JIA_JI_INTERACTION_SOURCE',
    coverageClass: 'PARTIAL_SUBSTRATE_ONLY',
    repositorySubstrateAvailable: true,
    repositoryGovernanceBoundaryAvailable: true,
    normativeAuthoritySatisfied: false,
    externalPrimaryOrCanonicalWitnessStillRequired: true,
    coveredAssetRefs: Object.freeze(['R172', 'R177', 'R178']),
    finding:
      'The repository has an exact Ren-Wu/Jia/Ji control narration plus non-day-master pair topology, but no source that explicitly adjudicates the Jia-Ji combination interaction itself.',
  }),
  Object.freeze({
    requirementId: 'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS',
    coverageClass: 'NO_OUTCOME_AUTHORITY',
    repositorySubstrateAvailable: true,
    repositoryGovernanceBoundaryAvailable: true,
    normativeAuthoritySatisfied: false,
    externalPrimaryOrCanonicalWitnessStillRequired: true,
    coveredAssetRefs: Object.freeze(['R177', 'R178', 'R179']),
    finding:
      'Both control and structural-combination surfaces are preserved, but no existing repository authority defines coexistence, cancellation, weakening, or modification semantics between them.',
  }),
  Object.freeze({
    requirementId: 'BINDING_OR_NON_BINDING_SEMANTICS',
    coverageClass: 'NO_OUTCOME_AUTHORITY',
    repositorySubstrateAvailable: true,
    repositoryGovernanceBoundaryAvailable: true,
    normativeAuthoritySatisfied: false,
    externalPrimaryOrCanonicalWitnessStillRequired: true,
    coveredAssetRefs: Object.freeze(['R051', 'R178', 'R179']),
    finding:
      'Pair identity is verified, while effective-combination, binding, and non-binding outcome authority remain closed.',
  }),
  Object.freeze({
    requirementId: 'POST_COMBINATION_SUBJECT_IDENTITY_OR_FUNCTION_PERSISTENCE',
    coverageClass: 'NO_OUTCOME_AUTHORITY',
    repositorySubstrateAvailable: true,
    repositoryGovernanceBoundaryAvailable: true,
    normativeAuthoritySatisfied: false,
    externalPrimaryOrCanonicalWitnessStillRequired: true,
    coveredAssetRefs: Object.freeze(['R178', 'R179']),
    finding:
      'The repository explicitly keeps post-combination subject identity unresolved; no asset authorizes disappearance, replacement, persistence, or functional reassignment.',
  }),
  Object.freeze({
    requirementId: 'CONTEXT_AND_EXCEPTION_CONDITIONS',
    coverageClass: 'PARTIAL_SUBSTRATE_ONLY',
    repositorySubstrateAvailable: true,
    repositoryGovernanceBoundaryAvailable: true,
    normativeAuthoritySatisfied: false,
    externalPrimaryOrCanonicalWitnessStillRequired: true,
    coveredAssetRefs: Object.freeze(['R142', 'R172', 'R177', 'R179']),
    finding:
      'Chart context, repeated-pair topology, and configuration dependence are represented, but no source-bounded condition set is sufficient to determine the exact Jia-Ji pair-local interaction outcome.',
  }),
  Object.freeze({
    requirementId: 'PAIR_LOCAL_OUTCOME_DISTINCT_FROM_CROSS_RELATION_PRECEDENCE',
    coverageClass: 'REPOSITORY_GOVERNANCE_ONLY',
    repositorySubstrateAvailable: true,
    repositoryGovernanceBoundaryAvailable: true,
    normativeAuthoritySatisfied: false,
    externalPrimaryOrCanonicalWitnessStillRequired: true,
    coveredAssetRefs: Object.freeze(['R177', 'R178', 'R179', 'I233']),
    finding:
      'The repository governance boundary already separates pair-local outcome from generic cross-relation precedence, but that policy separation is not traditional normative authority for a Jia-Ji interaction result.',
  }),
]);

export const R180_REQUIREMENT_COVERAGE = COVERAGE_ROWS;

export const R180_COVERAGE_SUMMARY = Object.freeze({
  requirementCount: COVERAGE_ROWS.length,
  repositorySubstrateAvailableCount: COVERAGE_ROWS.filter(
    (item) => item.repositorySubstrateAvailable,
  ).length,
  repositoryGovernanceBoundaryAvailableCount: COVERAGE_ROWS.filter(
    (item) => item.repositoryGovernanceBoundaryAvailable,
  ).length,
  normativeAuthoritySatisfiedCount: COVERAGE_ROWS.filter(
    (item) => item.normativeAuthoritySatisfied,
  ).length,
  externalPrimaryOrCanonicalWitnessStillRequiredCount: COVERAGE_ROWS.filter(
    (item) => item.externalPrimaryOrCanonicalWitnessStillRequired,
  ).length,
  partialSubstrateOnlyCount: COVERAGE_ROWS.filter(
    (item) => item.coverageClass === 'PARTIAL_SUBSTRATE_ONLY',
  ).length,
  noOutcomeAuthorityCount: COVERAGE_ROWS.filter(
    (item) => item.coverageClass === 'NO_OUTCOME_AUTHORITY',
  ).length,
  repositoryGovernanceOnlyCount: COVERAGE_ROWS.filter(
    (item) => item.coverageClass === 'REPOSITORY_GOVERNANCE_ONLY',
  ).length,
});

export const R180_REJECTED_SHORTCUTS = Object.freeze([
  'REPOSITORY_ASSET_EXISTS_EQUALS_NORMATIVE_AUTHORITY',
  'PAIR_IDENTITY_EQUALS_EFFECTIVE_COMBINATION',
  'STRUCTURAL_CANDIDATE_EQUALS_BINDING',
  'SOURCE_CONTROL_NARRATION_EQUALS_COEXISTENCE_SETTLEMENT',
  'CONFIGURATION_CONTEXT_EQUALS_SUFFICIENT_CONDITION_SET',
  'REPOSITORY_GOVERNANCE_EQUALS_TRADITIONAL_SOURCE_AUTHORITY',
  'I233_BOUNDARY_EQUALS_JIA_JI_PAIR_LOCAL_OUTCOME',
  'PARTIAL_SUBSTRATE_EQUALS_OUTCOME_PROMOTION_READY',
] as const);

export const R180_GOVERNANCE = Object.freeze({
  r179RequirementContractPreserved:
    R179_AUTHORITY.exactPairRequirementSetEstablished,
  noR179RequirementSatisfiedByRepositoryAudit: COVERAGE_ROWS.every(
    (item) => !item.normativeAuthoritySatisfied,
  ),
  sourceSubstrateDistinctFromNormativeOutcomeAuthority: true,
  repositoryGovernanceDistinctFromTraditionalAuthority: true,
  pairLocalOutcomeStillRequiredBeforeCrossRelationPrecedence: true,
  externalPrimaryCanonicalDiscoveryNowJustified: true,
  noExistingRepositoryAssetMayBePromotedByInference: true,
});

export const R180_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_JIA_JI_REPOSITORY_EVIDENCE_COVERAGE_AUDIT_COMPLETE' as const,
  researchOnly: true,
  repositoryEvidenceInventoryAudited: true,
  exactPairSubstrateAvailable: true,
  normativePairLocalOutcomeAuthorityFoundInRepository: false,
  externalPrimaryCanonicalWitnessDiscoveryRequired: true,
  pairLocalInteractionOutcomeEstablished: false,
  jiaJiBindingEstablished: false,
  jiaJiTransformationEstablished: false,
  coexistenceSettlementEstablished: false,
  exactContextSettlementEstablished: false,
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
