import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I38_CHALLENGE_TARGET_COMBINATION_CONDITION_APPLICABILITY_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-target-combination-condition-applicability-methodology-review-v1';

export type ChallengeCombinationConditionApplicability =
  | 'REUSE_AS_CANDIDATE_SUBSTRATE'
  | 'REUSE_AS_NECESSARY_PREREQUISITE'
  | 'REFERENCE_ONLY_SCOPE_MISMATCH'
  | 'DO_NOT_REUSE_RESULT_CONTRACT';

export interface ChallengeCombinationConditionApplicabilityItem {
  conditionId:
    | 'STEM_SEASONAL_COMMAND'
    | 'STEM_SUPPORT_INTERFERENCE'
    | 'STEM_COMPETING_STEM_TOPOLOGY'
    | 'STEM_TRUE_TRANSFORMATION_RESULT'
    | 'STEM_NON_TRANSFORMATION_BINDING_RESULT'
    | 'THREE_COMBINATION_FULL_MEMBERSHIP'
    | 'THREE_COMBINATION_CLASH_TOPOLOGY'
    | 'THREE_COMBINATION_ADJACENCY_SPACING'
    | 'THREE_COMBINATION_LEAD_OUT_CONTEXT'
    | 'THREE_COMBINATION_EFFECTIVE_BUREAU_RESULT'
    | 'SIX_COMBINATION_MAPPING_LIKE_REFERENCE'
    | 'SIX_COMBINATION_TRANSFORMATION_RESULT';
  applicability: ChallengeCombinationConditionApplicability;
  finding: string;
}

export interface ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'PARTIAL_CONDITION_APPLICABILITY_ONLY_RESULT_VERDICTS_BLOCKED';
  stemDayMasterScopeExplicit: true;
  stemSeasonalCommandDimensionReusable: true;
  stemSupportInterferenceDimensionReusable: true;
  stemCompetingStemDimensionReusable: true;
  stemTrueTransformationVerdictReuseAuthorized: false;
  stemNonTransformationBindingVerdictReuseAuthorized: false;
  threeCombinationFullMembershipNecessary: true;
  threeCombinationFullMembershipSufficientForEffectiveBureau: false;
  threeCombinationClashTopologyDimensionReusable: true;
  threeCombinationAdjacencySpacingDimensionReusableAsCandidate: true;
  threeCombinationLeadOutDimensionReusableAsCandidate: true;
  threeCombinationEffectiveBureauVerdictAuthorized: false;
  sixCombinationMappingLikeReferenceExists: true;
  sixCombinationCompleteUniformTransformationConventionResolved: false;
  sixCombinationSelectionContextDirectSajuChallengeUseAuthorized: false;
  sixCombinationTransformationVerdictAuthorized: false;
  challengeSpecificConditionEvidenceAdapterAuthorized: true;
  challengeTransformationStateEmissionAuthorized: false;
  combinationBindingStateEmissionAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  conditionApplicability: readonly ChallengeCombinationConditionApplicabilityItem[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I38_CHALLENGE_COMBINATION_CONDITION_APPLICABILITY = Object.freeze([
  {
    conditionId: 'STEM_SEASONAL_COMMAND' as const,
    applicability: 'REUSE_AS_CANDIDATE_SUBSTRATE' as const,
    finding:
      'Traditional stem transformation discussions repeatedly condition 化 on month/season vitality, so seasonal command is a reusable context dimension even though the result verdict remains day-master scoped.',
  },
  {
    conditionId: 'STEM_SUPPORT_INTERFERENCE' as const,
    applicability: 'REUSE_AS_CANDIDATE_SUBSTRATE' as const,
    finding:
      'Root/support and interfering stems are explicit contextual dependencies, but their net transformation effect is not directly reusable for a challenge target.',
  },
  {
    conditionId: 'STEM_COMPETING_STEM_TOPOLOGY' as const,
    applicability: 'REUSE_AS_CANDIDATE_SUBSTRATE' as const,
    finding:
      'Competing or jealous-combination topology may be recorded structurally without adopting the traditional result interpretation.',
  },
  {
    conditionId: 'STEM_TRUE_TRANSFORMATION_RESULT' as const,
    applicability: 'DO_NOT_REUSE_RESULT_CONTRACT' as const,
    finding:
      'The primary 化氣 rule explicitly takes the day stem as its subject, so a true-transformation verdict cannot be transferred to a non-day-master challenge stem.',
  },
  {
    conditionId: 'STEM_NON_TRANSFORMATION_BINDING_RESULT' as const,
    applicability: 'DO_NOT_REUSE_RESULT_CONTRACT' as const,
    finding:
      'Commentarial descriptions of 合而不化 as binding or lingering are embedded in day-master/use-god interpretation and cannot be emitted as a challenge-target binding verdict.',
  },
  {
    conditionId: 'THREE_COMBINATION_FULL_MEMBERSHIP' as const,
    applicability: 'REUSE_AS_NECESSARY_PREREQUISITE' as const,
    finding:
      '三命通會 explicitly states that if one of the three branches is missing, the relation cannot be treated as a transformed three-combination bureau.',
  },
  {
    conditionId: 'THREE_COMBINATION_CLASH_TOPOLOGY' as const,
    applicability: 'REUSE_AS_CANDIDATE_SUBSTRATE' as const,
    finding:
      '滴天髓闡微 treats clash against a combination as potentially damaging depending on structural placement, so clash topology is relevant context but not a settlement verdict.',
  },
  {
    conditionId: 'THREE_COMBINATION_ADJACENCY_SPACING' as const,
    applicability: 'REUSE_AS_CANDIDATE_SUBSTRATE' as const,
    finding:
      'The commentary distinguishes tightly connected branch combinations from separated relations whose force may be weak, making adjacency/spacing a candidate evidence dimension only.',
  },
  {
    conditionId: 'THREE_COMBINATION_LEAD_OUT_CONTEXT' as const,
    applicability: 'REUSE_AS_CANDIDATE_SUBSTRATE' as const,
    finding:
      'The commentary notes that combination use can depend on whether the relevant qi is led out through the heavenly stems; this may be preserved as context without deciding effective bureau state.',
  },
  {
    conditionId: 'THREE_COMBINATION_EFFECTIVE_BUREAU_RESULT' as const,
    applicability: 'DO_NOT_REUSE_RESULT_CONTRACT' as const,
    finding:
      'Full membership is necessary but contextual clash, spacing, and lead-out concerns prevent structural completion alone from establishing an effective bureau for challenge-target use.',
  },
  {
    conditionId: 'SIX_COMBINATION_MAPPING_LIKE_REFERENCE' as const,
    applicability: 'REFERENCE_ONLY_SCOPE_MISMATCH' as const,
    finding:
      '選擇紀要 records element-like references for five six-combination pairs but treats 午未 as sun/moon rather than one uniform transformed element; the text is also a selection-manual context rather than a challenge-target Saju result contract.',
  },
  {
    conditionId: 'SIX_COMBINATION_TRANSFORMATION_RESULT' as const,
    applicability: 'DO_NOT_REUSE_RESULT_CONTRACT' as const,
    finding:
      'No complete uniform source-backed six-pair transformation-result convention is authorized for current challenge-target emission.',
  },
] as const);

export const I38_CHALLENGE_COMBINATION_CONDITION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-SIKU-V2',
    supportType: 'scope_limit' as const,
    finding:
      'The 化氣 section states 大凡化氣只取日干而言 and then conditions transformation on month/time vitality and interfering stems, making the result day-master scoped while exposing reusable condition dimensions.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'direct_basis' as const,
    finding:
      'The 支元三合 section states that a missing member prevents 三合化局, establishing exact full membership as a necessary structural prerequisite.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'scope_limit' as const,
    finding:
      'The 化象 and 合局 commentary distinguishes true transformation from 合而不化 and demonstrates dependency on season, root/support, competing relations, and broader structure.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU',
    supportType: 'cross_reference' as const,
    finding:
      'The 方局 commentary states that combination strength can depend on clash placement, adjacency/separation, and whether relevant qi is led out through heavenly stems.',
  },
  {
    sourceId: 'SRC-T0-XUANZE-JIYAO-UPPER',
    supportType: 'scope_limit' as const,
    finding:
      '選擇紀要 lists element-like six-combination references for 子丑、寅亥、卯戌、辰酉、巳申 but describes 午未 as sun/moon, showing a mapping-like yet incomplete and scope-mismatched convention.',
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'A challenge-specific condition evidence adapter may materialize seasonal command, support/interference locations, competing relation topology, three-combination full membership, clash topology, adjacency/spacing, and lead-out context only as evidence substrate.',
  'Do not reuse a day-master true-transformation verdict for a challenge target even when traditional seasonal conditions appear satisfied.',
  'Do not reuse 合而不化 commentary as an automatic challenge-target binding verdict.',
  'Treat exact three-branch membership as necessary but never sufficient for effective bureau formation.',
  'Do not turn clash topology, adjacency, spacing, or lead-out evidence into an effective-bureau settlement without a dedicated challenge-specific result methodology.',
  'Keep 選擇紀要 six-combination mappings as scope-mismatched reference material; do not normalize them into a complete six-pair transformation table for Saju challenge use.',
  'Do not emit transformation, binding, subject replacement, post-relation root state, effective mechanism force, relation-specific usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview(): ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport {
  const material = {
    reviewVersion:
      I38_CHALLENGE_TARGET_COMBINATION_CONDITION_APPLICABILITY_METHODOLOGY_REVIEW_VERSION,
    decision: 'PARTIAL_CONDITION_APPLICABILITY_ONLY_RESULT_VERDICTS_BLOCKED' as const,
    stemDayMasterScopeExplicit: true as const,
    stemSeasonalCommandDimensionReusable: true as const,
    stemSupportInterferenceDimensionReusable: true as const,
    stemCompetingStemDimensionReusable: true as const,
    stemTrueTransformationVerdictReuseAuthorized: false as const,
    stemNonTransformationBindingVerdictReuseAuthorized: false as const,
    threeCombinationFullMembershipNecessary: true as const,
    threeCombinationFullMembershipSufficientForEffectiveBureau: false as const,
    threeCombinationClashTopologyDimensionReusable: true as const,
    threeCombinationAdjacencySpacingDimensionReusableAsCandidate: true as const,
    threeCombinationLeadOutDimensionReusableAsCandidate: true as const,
    threeCombinationEffectiveBureauVerdictAuthorized: false as const,
    sixCombinationMappingLikeReferenceExists: true as const,
    sixCombinationCompleteUniformTransformationConventionResolved: false as const,
    sixCombinationSelectionContextDirectSajuChallengeUseAuthorized: false as const,
    sixCombinationTransformationVerdictAuthorized: false as const,
    challengeSpecificConditionEvidenceAdapterAuthorized: true as const,
    challengeTransformationStateEmissionAuthorized: false as const,
    combinationBindingStateEmissionAuthorized: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    conditionApplicability: I38_CHALLENGE_COMBINATION_CONDITION_APPLICABILITY,
    sourceBasis: I38_CHALLENGE_COMBINATION_CONDITION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I38 authorizes partial reuse of condition dimensions, not traditional transformation result contracts.',
      'Stem transformation conditions expose reusable seasonal/support/competition substrate, but the primary rule remains explicitly day-master scoped.',
      'Three-combination exact membership is a necessary structural prerequisite while effective-bureau qualification remains blocked by contextual dependencies.',
      'A mapping-like six-combination reference exists in a selection manual, but its incomplete non-uniform mapping and source context prevent direct Saju challenge adoption.',
      'The next implementation may only materialize challenge-specific condition evidence and must remain fail-closed on transformation and downstream force/effect verdicts.',
    ],
  };

  return {
    reviewId: `challenge_target_combination_condition_applicability_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
