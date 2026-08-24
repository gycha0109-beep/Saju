import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I71SupportSourceContestTopologyState } from './i71-challenge-combination-support-channel-pair-local-clash-participant-support-source-contest-topology-methodology-review.js';

export const I73_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_CIRCULARITY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-circularity-methodology-review-v1';

export type I73SupportSourceSettlementDependencyClass =
  | 'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED'
  | 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY'
  | 'OTHER_CLASH_SETTLEMENT_DEPENDENCY'
  | 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY'
  | 'MULTI_TOUCH_COMPOSITE_SETTLEMENT_DEPENDENCY';

export interface I73SupportSourceSettlementDependencyRule {
  topologyState: I71SupportSourceContestTopologyState;
  dependencyClass: I73SupportSourceSettlementDependencyClass;
  sameEvaluatedClashCircularity: boolean;
  independentRelationSettlementRequired: boolean;
  crossRelationPrecedenceMayBeRequired: boolean;
  sourceActivationOrPersistenceResolved: false;
  effectiveSupportResolved: false;
}

export interface ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'SOURCE_LOCAL_SETTLEMENT_DEPENDENCY_CLASSIFICATION_AUTHORIZED_RECURSIVE_EFFECT_RESOLUTION_BLOCKED';
  exactI72SourceTopologyEvidenceRequired: true;
  sourceLocalDependencyClassificationAuthorized: true;
  evaluatedClashSelfDependencyDetectionAuthorized: true;
  evaluatedClashSelfDependencyMayBeIgnored: false;
  evaluatedClashPersistenceMayFeedSameClashRelativeForceWithoutCyclePolicy: false;
  iterativeFixedPointResolutionAuthorized: false;
  numericConvergenceResolutionAuthorized: false;
  preInteractionSupportStateSubstitutionAuthorized: false;
  otherClashMayReuseI33ArbitrarySupportSourceOutcomeAuthority: false;
  combinationTouchMayReuseI35ArbitrarySupportSourceOutcomeAuthority: false;
  multiTouchPerRelationDependencyPreservationRequired: true;
  multiTouchFixedPrecedenceAuthorized: false;
  noTrackedRelationTouchMeansNoTrackedSettlementDependencyOnly: true;
  noTrackedRelationTouchMeansEffectiveSupport: false;
  dependencyClassificationIsSettlementOutcome: false;
  dependencyClassificationIsActivationVerdict: false;
  dependencyClassificationIsPersistenceVerdict: false;
  dependencyClassificationIsEffectiveSupportVerdict: false;
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
  dependencyRules: readonly I73SupportSourceSettlementDependencyRule[];
  authorityBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

const DEPENDENCY_RULES = Object.freeze([
  {
    topologyState: 'NO_TRACKED_RELATION_TOUCH' as const,
    dependencyClass: 'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED' as const,
    sameEvaluatedClashCircularity: false,
    independentRelationSettlementRequired: false,
    crossRelationPrecedenceMayBeRequired: false,
    sourceActivationOrPersistenceResolved: false as const,
    effectiveSupportResolved: false as const,
  },
  {
    topologyState: 'EVALUATED_CLASH_PARTICIPATION' as const,
    dependencyClass: 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY' as const,
    sameEvaluatedClashCircularity: true,
    independentRelationSettlementRequired: false,
    crossRelationPrecedenceMayBeRequired: false,
    sourceActivationOrPersistenceResolved: false as const,
    effectiveSupportResolved: false as const,
  },
  {
    topologyState: 'OTHER_CLASH_TOUCH' as const,
    dependencyClass: 'OTHER_CLASH_SETTLEMENT_DEPENDENCY' as const,
    sameEvaluatedClashCircularity: false,
    independentRelationSettlementRequired: true,
    crossRelationPrecedenceMayBeRequired: false,
    sourceActivationOrPersistenceResolved: false as const,
    effectiveSupportResolved: false as const,
  },
  {
    topologyState: 'COMBINATION_TOUCH' as const,
    dependencyClass: 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY' as const,
    sameEvaluatedClashCircularity: false,
    independentRelationSettlementRequired: true,
    crossRelationPrecedenceMayBeRequired: false,
    sourceActivationOrPersistenceResolved: false as const,
    effectiveSupportResolved: false as const,
  },
  {
    topologyState: 'MULTIPLE_TRACKED_RELATION_TOUCHES' as const,
    dependencyClass: 'MULTI_TOUCH_COMPOSITE_SETTLEMENT_DEPENDENCY' as const,
    sameEvaluatedClashCircularity: false,
    independentRelationSettlementRequired: true,
    crossRelationPrecedenceMayBeRequired: true,
    sourceActivationOrPersistenceResolved: false as const,
    effectiveSupportResolved: false as const,
  },
] as const satisfies readonly I73SupportSourceSettlementDependencyRule[]);

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I53 / I70',
    finding:
      'A relation-touched support source requires settlement context before persistence can be inferred, while no tracked touch still does not imply active/persistent/effective support.',
  },
  {
    authorityRef: 'I72',
    finding:
      'Current-chart exact support-source identities and relation id-kind touch pairs are now available without any settlement or effect verdict.',
  },
  {
    authorityRef: 'I59 / I69',
    finding:
      'Existing I33/I35 authority is domain-scoped and cannot be generalized to arbitrary support-source clash/combination outcomes. Final relative-force promotion remains blocked until effective support semantics are valid.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'A next adapter may classify each exact I72 source by the I73 dependency class while preserving every exact touching relation pair.',
  'If an exact source touch includes the evaluated clash relation, mark the dependency as same-relation recursive; do not silently treat that source as settled support for the same relative-force decision.',
  'Do not solve same-relation circularity by fixed-point iteration, convergence scoring, arbitrary ordering, or pre-interaction substitution without a dedicated source-backed methodology.',
  'For OTHER_CLASH_TOUCH, require support-source-specific clash settlement authority; I33 challenge-target-root outcome authority is not automatically transferable.',
  'For COMBINATION_TOUCH, require support-source-specific combination binding/interaction settlement authority; I35 challenge-target outcome authority is not automatically transferable.',
  'For MULTIPLE_TRACKED_RELATION_TOUCHES, preserve each exact touch dependency and withhold fixed cross-relation precedence.',
  'NO_TRACKED_RELATION_TOUCH removes only tracked direct relation-settlement dependency; it does not resolve activation, persistence, or effective support.',
  'Do not emit relative force, clash winner, rescue effect, clash settlement, effective support, effective mechanism force, scoring, or classification.',
] as const);

export function buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview(): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReviewReport {
  const material = {
    reviewVersion:
      I73_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_CIRCULARITY_METHODOLOGY_REVIEW_VERSION,
    decision:
      'SOURCE_LOCAL_SETTLEMENT_DEPENDENCY_CLASSIFICATION_AUTHORIZED_RECURSIVE_EFFECT_RESOLUTION_BLOCKED' as const,
    exactI72SourceTopologyEvidenceRequired: true as const,
    sourceLocalDependencyClassificationAuthorized: true as const,
    evaluatedClashSelfDependencyDetectionAuthorized: true as const,
    evaluatedClashSelfDependencyMayBeIgnored: false as const,
    evaluatedClashPersistenceMayFeedSameClashRelativeForceWithoutCyclePolicy: false as const,
    iterativeFixedPointResolutionAuthorized: false as const,
    numericConvergenceResolutionAuthorized: false as const,
    preInteractionSupportStateSubstitutionAuthorized: false as const,
    otherClashMayReuseI33ArbitrarySupportSourceOutcomeAuthority: false as const,
    combinationTouchMayReuseI35ArbitrarySupportSourceOutcomeAuthority: false as const,
    multiTouchPerRelationDependencyPreservationRequired: true as const,
    multiTouchFixedPrecedenceAuthorized: false as const,
    noTrackedRelationTouchMeansNoTrackedSettlementDependencyOnly: true as const,
    noTrackedRelationTouchMeansEffectiveSupport: false as const,
    dependencyClassificationIsSettlementOutcome: false as const,
    dependencyClassificationIsActivationVerdict: false as const,
    dependencyClassificationIsPersistenceVerdict: false as const,
    dependencyClassificationIsEffectiveSupportVerdict: false as const,
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
    dependencyRules: DEPENDENCY_RULES,
    authorityBasis: AUTHORITY_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    notes: [
      'I73 makes the support-source settlement dependency graph explicit before any source persistence or effective-support semantics are attempted.',
      'The evaluated-clash participation case is a genuine same-decision circularity: the clash relative-force review would consume support whose persistence itself depends on settlement of that same clash.',
      'I73 detects and blocks that cycle; it does not choose a fixed-point, pre-interaction, or arbitrary precedence solution.',
      'Other clash and combination touches remain independent settlement dependencies with support-source-specific authority gaps.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_pair_local_clash_support_source_settlement_dependency_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
