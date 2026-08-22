import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ClashSupportContextSignal } from './i20c-clash-support-context.js';

export const I71_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_CONTEST_TOPOLOGY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-participant-support-source-contest-topology-methodology-review-v1';

export type I71SupportSourceComponent = 'stem' | 'branch';

export type I71SupportSourceContestTopologyState =
  | 'NO_TRACKED_RELATION_TOUCH'
  | 'EVALUATED_CLASH_PARTICIPATION'
  | 'OTHER_CLASH_TOUCH'
  | 'COMBINATION_TOUCH'
  | 'MULTIPLE_TRACKED_RELATION_TOUCHES';

export interface I71SupportSignalSourceMapping {
  signal: Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>;
  sourcePositionField:
    | 'participant_position_when_same_pillar_visible_same_element_support'
    | 'externalVisibleSameElementSupportPositions'
    | 'visibleResourceSupportPositions'
    | 'additionalSameElementBranchSupportPositions'
    | 'resourceBranchSupportPositions';
  sourceComponent: I71SupportSourceComponent;
  exactSourceValueMustComeFromResolvedPillars: true;
}

export interface ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'EXACT_SUPPORT_SOURCE_IDENTITY_AND_CONTEST_TOPOLOGY_AUTHORIZED_EFFECT_VERDICTS_BLOCKED';
  exactEvaluatedClashIdentityRequired: true;
  exactClashParticipantIdentityRequired: true;
  resolvedPillarsRequiredForSourceValueMaterialization: true;
  i20cSupportPositionFieldsReusable: true;
  supportSignalToSourceComponentMappingAuthorized: true;
  sourceIdentityMayBeInferredFromSignalLabelAlone: false;
  structuralRelationGraphIndependentRecomputationAuthorized: true;
  exactSourceParticipantMatchingRequired: true;
  authoritativeRelationIdKindPairEmissionAuthorized: true;
  evaluatedClashParticipationTopologyStateAuthorized: true;
  otherClashTouchTopologyStateAuthorized: true;
  combinationTouchTopologyStateAuthorized: true;
  multiTouchTopologyStateAuthorized: true;
  noTrackedRelationTouchTopologyStateAuthorized: true;
  noTrackedRelationTouchMeansActive: false;
  noTrackedRelationTouchMeansPersistent: false;
  evaluatedClashParticipationMeansDestroyed: false;
  otherClashTouchMeansDestroyed: false;
  combinationTouchMeansNeutralized: false;
  multiTouchFixedPrecedenceAuthorized: false;
  relationTouchCountMagnitudeInferenceAuthorized: false;
  supportSourceCountMagnitudeInferenceAuthorized: false;
  supportCategoryFixedPrecedenceAuthorized: false;
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
  supportSignalSourceMappings: readonly I71SupportSignalSourceMapping[];
  topologyRules: readonly {
    state: I71SupportSourceContestTopologyState;
    condition: string;
  }[];
  authorityBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

const SUPPORT_SIGNAL_SOURCE_MAPPINGS = Object.freeze([
  {
    signal: 'SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT' as const,
    sourcePositionField: 'participant_position_when_same_pillar_visible_same_element_support' as const,
    sourceComponent: 'stem' as const,
    exactSourceValueMustComeFromResolvedPillars: true as const,
  },
  {
    signal: 'EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT' as const,
    sourcePositionField: 'externalVisibleSameElementSupportPositions' as const,
    sourceComponent: 'stem' as const,
    exactSourceValueMustComeFromResolvedPillars: true as const,
  },
  {
    signal: 'VISIBLE_RESOURCE_SUPPORT' as const,
    sourcePositionField: 'visibleResourceSupportPositions' as const,
    sourceComponent: 'stem' as const,
    exactSourceValueMustComeFromResolvedPillars: true as const,
  },
  {
    signal: 'ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT' as const,
    sourcePositionField: 'additionalSameElementBranchSupportPositions' as const,
    sourceComponent: 'branch' as const,
    exactSourceValueMustComeFromResolvedPillars: true as const,
  },
  {
    signal: 'RESOURCE_BRANCH_SUPPORT' as const,
    sourcePositionField: 'resourceBranchSupportPositions' as const,
    sourceComponent: 'branch' as const,
    exactSourceValueMustComeFromResolvedPillars: true as const,
  },
] as const satisfies readonly I71SupportSignalSourceMapping[]);

const TOPOLOGY_RULES = Object.freeze([
  {
    state: 'NO_TRACKED_RELATION_TOUCH' as const,
    condition: 'no structural relation candidate contains the exact support-source pillar/component/value identity',
  },
  {
    state: 'EVALUATED_CLASH_PARTICIPATION' as const,
    condition: 'exactly one touching relation exists and it is the exact clash relation currently being evaluated',
  },
  {
    state: 'OTHER_CLASH_TOUCH' as const,
    condition: 'exactly one touching relation exists, it is branch_clash, and it is not the evaluated clash relation',
  },
  {
    state: 'COMBINATION_TOUCH' as const,
    condition: 'exactly one touching relation exists and its kind is a tracked stem/branch combination relation',
  },
  {
    state: 'MULTIPLE_TRACKED_RELATION_TOUCHES' as const,
    condition: 'two or more structural relation candidates contain the exact support source; no pair order or fixed precedence is inferred',
  },
] as const);

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I20c',
    finding:
      'Participant-local same-element/resource support is already recorded with exact pillar positions, while support effect remains unresolved.',
  },
  {
    authorityRef: 'structural-relations / I61 architecture',
    finding:
      'Resolved pillars can independently reproduce deterministic relation ids, kinds, and exact participants. Relation id-kind pairs should come from this recomputed graph rather than from pairing separate metadata arrays.',
  },
  {
    authorityRef: 'I53 / I70',
    finding:
      'Source-local contest topology is a prerequisite for persistence review, but topology itself does not authorize activation, persistence, destruction, neutralization, or effective support.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'A next adapter must require all four resolved pillars and an exact current-chart I68 clash item aligned to its exact I20c candidate.',
  'Materialize source values from the resolved pillar fact at each I20c source position; never reconstruct a stem or branch value from the support signal label.',
  'Map visible-support positions to stem sources and branch-support positions to branch sources exactly as declared by this review.',
  'Deduplicate only identical pillar/component/value sources while preserving every support signal category attached to that source.',
  'Recompute structural relation candidates independently and match touches by exact pillar/component/value identity.',
  'Emit relation id-kind pairs directly from the recomputed relation candidate; never zip separate id and kind arrays.',
  'Distinguish the evaluated clash relation from other clash touches, but do not infer that evaluated-clash participation destroys or deactivates the source.',
  'For multiple touches, preserve all pairs and withhold fixed precedence.',
  'Do not emit activation, persistence, effective support, relative force, clash winner, rescue effect, clash settlement, effective mechanism force, scoring, or classification.',
] as const);

export function buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview(): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReviewReport {
  const material = {
    reviewVersion:
      I71_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_CONTEST_TOPOLOGY_METHODOLOGY_REVIEW_VERSION,
    decision:
      'EXACT_SUPPORT_SOURCE_IDENTITY_AND_CONTEST_TOPOLOGY_AUTHORIZED_EFFECT_VERDICTS_BLOCKED' as const,
    exactEvaluatedClashIdentityRequired: true as const,
    exactClashParticipantIdentityRequired: true as const,
    resolvedPillarsRequiredForSourceValueMaterialization: true as const,
    i20cSupportPositionFieldsReusable: true as const,
    supportSignalToSourceComponentMappingAuthorized: true as const,
    sourceIdentityMayBeInferredFromSignalLabelAlone: false as const,
    structuralRelationGraphIndependentRecomputationAuthorized: true as const,
    exactSourceParticipantMatchingRequired: true as const,
    authoritativeRelationIdKindPairEmissionAuthorized: true as const,
    evaluatedClashParticipationTopologyStateAuthorized: true as const,
    otherClashTouchTopologyStateAuthorized: true as const,
    combinationTouchTopologyStateAuthorized: true as const,
    multiTouchTopologyStateAuthorized: true as const,
    noTrackedRelationTouchTopologyStateAuthorized: true as const,
    noTrackedRelationTouchMeansActive: false as const,
    noTrackedRelationTouchMeansPersistent: false as const,
    evaluatedClashParticipationMeansDestroyed: false as const,
    otherClashTouchMeansDestroyed: false as const,
    combinationTouchMeansNeutralized: false as const,
    multiTouchFixedPrecedenceAuthorized: false as const,
    relationTouchCountMagnitudeInferenceAuthorized: false as const,
    supportSourceCountMagnitudeInferenceAuthorized: false as const,
    supportCategoryFixedPrecedenceAuthorized: false as const,
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
    supportSignalSourceMappings: SUPPORT_SIGNAL_SOURCE_MAPPINGS,
    topologyRules: TOPOLOGY_RULES,
    authorityBasis: AUTHORITY_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    notes: [
      'I71 authorizes only deterministic support-source identity and source-local relation-touch topology methodology.',
      'The evaluated clash relation is distinguished because it is the pair whose relative-force context is under review; this distinction is identity metadata, not a damage or persistence verdict.',
      'The methodology generalizes the exact-identity discipline of I61 without transferring I52–I65 combination-support result authority to clash-participant support.',
      'Source-local topology remains substrate for a later settlement/persistence review and never an effective-support result by itself.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_pair_local_clash_support_source_topology_methodology_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
