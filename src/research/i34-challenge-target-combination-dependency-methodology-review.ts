import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I34_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-target-combination-dependency-methodology-review-v1';

export type ChallengeTargetCombinationReuseDisposition =
  | 'REUSE_AS_STRUCTURAL_SUBSTRATE'
  | 'ADAPT_UNDER_CHALLENGE_NAMESPACE'
  | 'DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY';

export interface ChallengeTargetCombinationReuseAuditItem {
  capability: string;
  disposition: ChallengeTargetCombinationReuseDisposition;
  rationale: string;
}

export interface ChallengeTargetCombinationDependencyMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'CHALLENGE_SPECIFIC_COMBINATION_DEPENDENCY_ADAPTER_REQUIRED';
  i31CombinationParticipationReuseAuthorized: true;
  structuralRelationParticipantReuseAuthorized: true;
  seasonalCommandContextReuseAuthorized: true;
  positionalSameElementResourceContextReuseAuthorized: true;
  competingRelationTopologyReuseAuthorized: true;
  stemCombinationPresenceDeterminesTransformation: false;
  branchSixCombinationPresenceDeterminesTransformation: false;
  branchThreeCombinationStructuralCompletionDeterminesTransformation: false;
  transformationTargetElementEmissionAuthorized: false;
  directSanmingDayStemTransformationContractReuseAuthorized: false;
  completeSupportInterferenceModelAvailable: false;
  combinationEffectVerdictAuthorized: false;
  hiddenOnlyTargetCombinationRootEffectAuthorized: false;
  earthTargetCombinationRootEffectAuthorized: false;
  challengeSpecificCombinationDependencyEvidenceImplementationAuthorized: true;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  reuseAudit: readonly ChallengeTargetCombinationReuseAuditItem[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'cross_reference' | 'scope_limit';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I34_CHALLENGE_TARGET_COMBINATION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-YISI-ZHAN-10',
    supportType: 'direct_basis' as const,
    finding:
      'The source lists stem five-combination and branch six-combination pairings as structural relations, supporting deterministic participation routing without establishing transformation or effect.',
  },
  {
    sourceId: 'SRC-T0-XUANZE-YAOLUE-UPPER',
    supportType: 'cross_reference' as const,
    finding:
      'The source cross-references stem combinations, branch six-combinations, three-combinations, and clashes, supporting relation topology as structural substrate only.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'scope_limit' as const,
    finding:
      'The ten-stem 化氣 discussion imposes month/structure conditions and is framed around the day stem and its combining counterpart, so its transformation result contract cannot be directly attached to a visible challenge-target stem.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'direct_basis' as const,
    finding:
      'Branch combination/bureau formation is conditional rather than implied by pair or full-group membership. A structurally complete three-combination candidate therefore still does not establish transformation or effective bureau force.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'cross_reference' as const,
    finding:
      'Combination consequences vary with season, surrounding roots/support, competing relations, and whether transformation actually occurs; combination may help, bind, or fail to transform depending on context.',
  },
  {
    sourceId: 'SRC-I20C-DITIANSUI-ROOT-SUPPORT-WIKISOURCE',
    supportType: 'scope_limit' as const,
    finding:
      'Same-element and resource positions are legitimate named context channels, but their presence does not provide a complete support/interference effect model and must not be summed into combination force.',
  },
] as const);

const REUSE_AUDIT: readonly ChallengeTargetCombinationReuseAuditItem[] = Object.freeze([
  {
    capability: 'I31_STEM_AND_BRANCH_COMBINATION_PARTICIPATION',
    disposition: 'REUSE_AS_STRUCTURAL_SUBSTRATE',
    rationale:
      'I31 already preserves subject identity and relation IDs for stem five-combination, branch six-combination, and branch three-combination participation without assigning transformation or effect.',
  },
  {
    capability: 'STRUCTURAL_RELATION_PARTICIPANTS_AND_SOURCE_IDS',
    disposition: 'REUSE_AS_STRUCTURAL_SUBSTRATE',
    rationale:
      'Participant positions, values, arity, relation kind, and source IDs are deterministic relation facts and can be materialized under the same identity.',
  },
  {
    capability: 'SEASONAL_COMMAND_CONTEXT',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    rationale:
      'Month-command element and source-backed seasonal phase can be attached as dependency evidence, but they do not independently establish combination transformation.',
  },
  {
    capability: 'POSITIONAL_SAME_ELEMENT_RESOURCE_CONTEXT',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    rationale:
      'Same-element and resource stem/branch locations can be preserved as named context channels without assigning support effect, interference precedence, or numeric weight.',
  },
  {
    capability: 'COMPETING_RELATION_TOPOLOGY',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    rationale:
      'Other tracked structural relations touching a combination participant can be routed as competing topology, while precedence and whether they disrupt, redirect, or reinforce the combination remain unresolved.',
  },
  {
    capability: 'STEM_COMBINATION_TRANSFORMATION_TARGET_ELEMENT',
    disposition: 'DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY',
    rationale:
      'The current review has not established a challenge-target-specific source policy for emitting a transformation product element independently of the day-stem 化氣 contract.',
  },
  {
    capability: 'BRANCH_COMBINATION_TRANSFORMATION_TARGET_ELEMENT',
    disposition: 'DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY',
    rationale:
      'Structural pair/group membership is insufficient to emit a transformed element or effective bureau result without a dedicated source-backed transformation policy.',
  },
  {
    capability: 'COMBINATION_EFFECT_OR_POST_RELATION_ROOT_STATE',
    disposition: 'DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY',
    rationale:
      'Participation and dependency evidence do not establish whether the target/root is preserved, bound, transformed, strengthened, weakened, or redirected.',
  },
  {
    capability: 'HIDDEN_ONLY_TARGET_COMBINATION_ROOT_EFFECT',
    disposition: 'DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY',
    rationale:
      'I29 does not establish rootedness for hidden-only target presence, so combination evidence cannot manufacture a post-relation root-effect subject.',
  },
  {
    capability: 'EARTH_TARGET_COMBINATION_ROOT_EFFECT',
    disposition: 'DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY',
    rationale:
      'The unresolved earth intrinsic-root convention continues to block a resolved earth target post-relation root-effect state.',
  },
]);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Consume only I31 stem-five-combination and root-candidate branch-six/three-combination participation aligned to the same resolved pillar and I29 identity.',
  'Materialize relation participants, relation arity, relation kind, and source IDs without emitting transformation, disappearance, binding, preservation, or force effects.',
  'Attach month-command seasonal context only as dependency evidence and never as proof of transformation.',
  'Project same-element/resource stem and branch positions as named context channels without summing, weighting, or treating them as a complete support/interference model.',
  'Route other tracked structural relations sharing a combination participant as competing topology without assigning precedence or effect.',
  'Do not emit stem or branch transformation target elements until a dedicated challenge-target transformation mapping/policy is separately source-audited and authorized.',
  'A structurally complete three-combination candidate must remain distinct from an effective or transformed bureau.',
  'Do not create combination-root effects for hidden-only targets and keep earth target root-effect resolution blocked.',
  'Do not infer target post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI34ChallengeTargetCombinationDependencyMethodologyReview(): ChallengeTargetCombinationDependencyMethodologyReviewReport {
  const material = {
    reviewVersion: I34_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_METHODOLOGY_REVIEW_VERSION,
    decision: 'CHALLENGE_SPECIFIC_COMBINATION_DEPENDENCY_ADAPTER_REQUIRED' as const,
    i31CombinationParticipationReuseAuthorized: true as const,
    structuralRelationParticipantReuseAuthorized: true as const,
    seasonalCommandContextReuseAuthorized: true as const,
    positionalSameElementResourceContextReuseAuthorized: true as const,
    competingRelationTopologyReuseAuthorized: true as const,
    stemCombinationPresenceDeterminesTransformation: false as const,
    branchSixCombinationPresenceDeterminesTransformation: false as const,
    branchThreeCombinationStructuralCompletionDeterminesTransformation: false as const,
    transformationTargetElementEmissionAuthorized: false as const,
    directSanmingDayStemTransformationContractReuseAuthorized: false as const,
    completeSupportInterferenceModelAvailable: false as const,
    combinationEffectVerdictAuthorized: false as const,
    hiddenOnlyTargetCombinationRootEffectAuthorized: false as const,
    earthTargetCombinationRootEffectAuthorized: false as const,
    challengeSpecificCombinationDependencyEvidenceImplementationAuthorized: true as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    reuseAudit: REUSE_AUDIT,
    sourceBasis: I34_CHALLENGE_TARGET_COMBINATION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I34 authorizes a combination dependency-evidence adapter, not a transformation or effect engine.',
      'Stem and branch combination participation remains structurally meaningful while transformation product, effective bureau, binding, and post-relation force consequences remain separate unresolved questions.',
      'A full three-combination structural match means the tracked membership set is complete; it does not mean an effective transformed bureau has been established.',
      'The next adapter should preserve subject identity and context topology while keeping all downstream verdicts fail-closed.',
    ],
  };

  return {
    reviewId: `challenge_target_combination_dependency_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
