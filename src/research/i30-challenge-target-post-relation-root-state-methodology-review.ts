import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I30_CHALLENGE_TARGET_POST_RELATION_ROOT_STATE_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-target-post-relation-root-state-methodology-review-v1';

export type ChallengeTargetPostRelationReuseDisposition =
  | 'REUSE_AS_RELATION_ROUTING_SUBSTRATE'
  | 'ADAPT_UNDER_CHALLENGE_NAMESPACE'
  | 'DO_NOT_RESOLVE_FROM_CURRENT_SUBSTRATE';

export type ChallengeTargetPostRelationDependency =
  | 'RELATIVE_BRANCH_FORCE'
  | 'SEASONAL_COMMAND_CONTEXT'
  | 'EXTERNAL_SUPPORT_RESCUE'
  | 'COMBINATION_TRANSFORMATION_CONDITIONS'
  | 'TARGET_STEM_COMPETING_SUPPORT_INTERFERENCE'
  | 'COMPETING_RELATION_PRECEDENCE'
  | 'HIDDEN_ONLY_TARGET_TREATMENT_POLICY'
  | 'EARTH_ROOT_CONVENTION_POLICY'
  | 'UNTRACKED_RELATION_MODEL';

export interface ChallengeTargetPostRelationAuditItem {
  capability: string;
  disposition: ChallengeTargetPostRelationReuseDisposition;
  dependencies: readonly ChallengeTargetPostRelationDependency[];
  rationale: string;
}

export interface ChallengeTargetPostRelationRootStateMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'CHALLENGE_SPECIFIC_POST_RELATION_REVIEW_REQUIRED';
  i19DirectReuseAuthorized: false;
  branchClashConditionalSemanticsReusable: true;
  branchCombinationPresenceDeterminesEffect: false;
  stemCombinationPresenceDeterminesTransformation: false;
  visibleTargetStemRelationParticipationMustBeRouted: true;
  rootCandidateBranchRelationParticipationMustBeRouted: true;
  noTrackedRelationCandidateMeansPreserved: false;
  hiddenOnlyTargetPostRelationRootStateAuthorized: false;
  earthRootConventionResolved: false;
  untrackedRelationEffectsAuthorized: false;
  challengeSpecificRelationRoutingImplementationAuthorized: true;
  currentStructuralRouterScope: readonly [
    'stem_five_combination',
    'branch_six_combination',
    'branch_clash',
    'branch_three_combination',
  ];
  explicitlyUntrackedRelationFamilies: readonly ['branch_punishment', 'branch_harm', 'branch_break'];
  targetIntrinsicRootQualityVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  relationAudit: readonly ChallengeTargetPostRelationAuditItem[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'cross_reference' | 'scope_limit';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I30_CHALLENGE_TARGET_POST_RELATION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-I19-DITIANSUI-ORIGINAL-WIKISOURCE',
    supportType: 'direct_basis' as const,
    finding:
      'The branch-clash principle makes uprooting conditional on relative flourishing and decline: the flourishing side may uproot the declining side, while a declining side can instead stimulate a flourishing side. Clash presence therefore cannot itself determine root destruction.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'direct_basis' as const,
    finding:
      'The commentary applies clash/root and combination consequences contextually: season, surrounding roots/support, and whether a combination truly transforms can change the result. Combination may help or may become binding when it does not transform.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'scope_limit' as const,
    finding:
      'The ten-stem transformation discussion imposes month/structure conditions and explicitly frames 化氣 around the day stem and its combining counterpart. A visible challenge-target stem may therefore be routed as participating in a structural combination, but direct transformation of that target is not authorized by this review.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'cross_reference' as const,
    finding:
      'Combination/bureau formation is conditional rather than implied by pair or group presence, supporting a structural-candidate-only router before any post-relation state is resolved.',
  },
] as const);

const RELATION_AUDIT: readonly ChallengeTargetPostRelationAuditItem[] = Object.freeze([
  {
    capability: 'VISIBLE_TARGET_STEM_FIVE_COMBINATION_PARTICIPATION',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    dependencies: [
      'COMBINATION_TRANSFORMATION_CONDITIONS',
      'TARGET_STEM_COMPETING_SUPPORT_INTERFERENCE',
      'SEASONAL_COMMAND_CONTEXT',
    ],
    rationale:
      'A target stem can be structurally identified as participating in a five-combination, but the source does not authorize treating that participation as transformation, disappearance, preservation, or strengthening of the target.',
  },
  {
    capability: 'ROOT_CANDIDATE_BRANCH_CLASH_PARTICIPATION',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    dependencies: ['RELATIVE_BRANCH_FORCE', 'SEASONAL_COMMAND_CONTEXT', 'EXTERNAL_SUPPORT_RESCUE'],
    rationale:
      'Branch-clash routing is reusable because the classical rule is relational and conditional, but the effective root state remains unresolved until relative force and surrounding support are independently established.',
  },
  {
    capability: 'ROOT_CANDIDATE_BRANCH_SIX_COMBINATION_PARTICIPATION',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    dependencies: [
      'COMBINATION_TRANSFORMATION_CONDITIONS',
      'COMPETING_RELATION_PRECEDENCE',
      'SEASONAL_COMMAND_CONTEXT',
    ],
    rationale:
      'Six-combination presence may be routed as touching a root candidate, but it is not proof of transformation, preservation, rescue, binding, or effective force.',
  },
  {
    capability: 'ROOT_CANDIDATE_BRANCH_THREE_COMBINATION_PARTICIPATION',
    disposition: 'ADAPT_UNDER_CHALLENGE_NAMESPACE',
    dependencies: [
      'COMBINATION_TRANSFORMATION_CONDITIONS',
      'COMPETING_RELATION_PRECEDENCE',
      'SEASONAL_COMMAND_CONTEXT',
    ],
    rationale:
      'Three-combination membership is structural candidate evidence only; completion and transformation conditions must remain separate from the existence of the relation candidate.',
  },
  {
    capability: 'NO_TRACKED_RELATION_CANDIDATE',
    disposition: 'REUSE_AS_RELATION_ROUTING_SUBSTRATE',
    dependencies: [],
    rationale:
      'Absence of a currently tracked relation is useful routing information, but it cannot be promoted to a preserved or unaffected post-relation root verdict.',
  },
  {
    capability: 'HIDDEN_ONLY_TARGET_POST_RELATION_ROOT_STATE',
    disposition: 'DO_NOT_RESOLVE_FROM_CURRENT_SUBSTRATE',
    dependencies: ['HIDDEN_ONLY_TARGET_TREATMENT_POLICY'],
    rationale:
      'I29 intentionally does not promote hidden-only target presence to rootedness. Relation participation cannot retroactively create a root-quality or post-relation root-state verdict for a target with no visible stem anchor.',
  },
  {
    capability: 'EARTH_TARGET_POST_RELATION_ROOT_STATE',
    disposition: 'DO_NOT_RESOLVE_FROM_CURRENT_SUBSTRATE',
    dependencies: ['EARTH_ROOT_CONVENTION_POLICY'],
    rationale:
      'The earth intrinsic root convention remains unresolved upstream, so an earth target cannot receive a resolved post-relation root state even when tracked structural relations are present.',
  },
  {
    capability: 'UNTRACKED_BRANCH_PUNISHMENT_HARM_BREAK_EFFECTS',
    disposition: 'DO_NOT_RESOLVE_FROM_CURRENT_SUBSTRATE',
    dependencies: ['UNTRACKED_RELATION_MODEL'],
    rationale:
      'The current deterministic structural router does not model punishment, harm, or break relations. I30 does not infer their absence or effects from a router that does not track them.',
  },
]);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Consume only a resolved I29 challenge-target intrinsic root evidence report aligned to the same resolved pillar material used for structural relation derivation.',
  'Route visible target-stem positions to touching stem-five-combination candidates under a challenge-specific namespace without inferring transformation or target disappearance.',
  'Route I29 root-candidate branch positions to touching branch-clash, branch-six-combination, and branch-three-combination candidates.',
  'For clash routing, require relative branch force, seasonal command context, and external support/rescue before any damage or preservation verdict can be considered.',
  'For combination routing, preserve transformation conditions and competing-relation precedence as unresolved dependencies.',
  'A root candidate with no tracked touching relation must remain NO_TRACKED_RELATION_CANDIDATE rather than being declared preserved.',
  'Do not create post-relation root state for hidden-only targets with no visible target-stem anchor.',
  'Keep earth target root state unresolved until an explicit earth root convention policy is authorized.',
  'Do not infer effects for punishment, harm, or break relations because the current structural router does not track those relation families.',
  'Do not emit intrinsic root-quality verdicts, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI30ChallengeTargetPostRelationRootStateMethodologyReview(): ChallengeTargetPostRelationRootStateMethodologyReviewReport {
  const material = {
    reviewVersion: I30_CHALLENGE_TARGET_POST_RELATION_ROOT_STATE_METHODOLOGY_REVIEW_VERSION,
    decision: 'CHALLENGE_SPECIFIC_POST_RELATION_REVIEW_REQUIRED' as const,
    i19DirectReuseAuthorized: false as const,
    branchClashConditionalSemanticsReusable: true as const,
    branchCombinationPresenceDeterminesEffect: false as const,
    stemCombinationPresenceDeterminesTransformation: false as const,
    visibleTargetStemRelationParticipationMustBeRouted: true as const,
    rootCandidateBranchRelationParticipationMustBeRouted: true as const,
    noTrackedRelationCandidateMeansPreserved: false as const,
    hiddenOnlyTargetPostRelationRootStateAuthorized: false as const,
    earthRootConventionResolved: false as const,
    untrackedRelationEffectsAuthorized: false as const,
    challengeSpecificRelationRoutingImplementationAuthorized: true as const,
    currentStructuralRouterScope: [
      'stem_five_combination',
      'branch_six_combination',
      'branch_clash',
      'branch_three_combination',
    ] as const,
    explicitlyUntrackedRelationFamilies: [
      'branch_punishment',
      'branch_harm',
      'branch_break',
    ] as const,
    targetIntrinsicRootQualityVerdict: 'not_determined' as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    relationAudit: RELATION_AUDIT,
    sourceBasis: I30_CHALLENGE_TARGET_POST_RELATION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I30 authorizes a challenge-specific relation-routing adapter only; it does not authorize direct I19 day-master post-relation result reuse.',
      'Branch clash is source-backed as a conditional relation whose outcome depends on relative force and support, so presence alone cannot mean root destruction or preservation.',
      'Stem and branch combinations are routed as structural participation only. Transformation, binding, rescue, and effective-force consequences remain separate methodology dependencies.',
      'The current structural relation router is intentionally bounded. Untracked relation families are not silently treated as absent or harmless.',
    ],
  };

  return {
    reviewId: `challenge_target_post_relation_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
