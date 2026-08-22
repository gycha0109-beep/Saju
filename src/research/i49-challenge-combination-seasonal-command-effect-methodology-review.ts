import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { SeasonalElementPhase } from './i20-relative-force-evidence.js';

export const I49_CHALLENGE_COMBINATION_SEASONAL_COMMAND_EFFECT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-seasonal-command-effect-methodology-review-v1';

export type ChallengeCombinationSeasonalDisposition =
  | 'COMMAND_ELEMENT_FLOURISHING'
  | 'COMMAND_GENERATED_ASSISTING'
  | 'GENERATES_COMMAND_RESTING'
  | 'CONTROLS_COMMAND_CONFINED'
  | 'CONTROLLED_BY_COMMAND_DEAD_PHASE';

export const I49_SEASONAL_DISPOSITION_BY_PHASE: Readonly<
  Record<SeasonalElementPhase, ChallengeCombinationSeasonalDisposition>
> = Object.freeze({
  旺: 'COMMAND_ELEMENT_FLOURISHING',
  相: 'COMMAND_GENERATED_ASSISTING',
  休: 'GENERATES_COMMAND_RESTING',
  囚: 'CONTROLS_COMMAND_CONFINED',
  死: 'CONTROLLED_BY_COMMAND_DEAD_PHASE',
});

export interface ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'SOURCE_BOUNDED_SEASONAL_DISPOSITION_AUTHORIZED_RELATION_RESULT_BLOCKED';
  monthCommandSeasonalPhaseContractResolved: true;
  targetElementSeasonalDispositionAuthorized: true;
  participantElementSeasonalDispositionAuthorized: true;
  formedThreeCombinationBureauElementSeasonalDispositionAuthorized: true;
  formedThreeCombinationBureauElementRequiresStructuralFormationEvidence: true;
  stemChallengeTransformedElementSeasonalDispositionAuthorized: false;
  sixCombinationTransformedElementSeasonalDispositionAuthorized: false;
  seasonalDispositionAdapterAuthorized: true;
  seasonalDispositionIsFinalRelativeForceVerdict: false;
  seasonalDispositionToTransformationVerdictAuthorized: false;
  seasonalDispositionToBindingVerdictAuthorized: false;
  seasonalDispositionToPostInteractionBureauStateAuthorized: false;
  seasonalDispositionToTargetPostRelationRootStateAuthorized: false;
  seasonalDispositionToEffectiveMechanismForceAuthorized: false;
  participantSeasonalDispositionAggregationAuthorized: false;
  seasonalDispositionWeightingAuthorized: false;
  additiveSeasonalScoringAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  seasonalDispositionByPhase: Readonly<Record<SeasonalElementPhase, ChallengeCombinationSeasonalDisposition>>;
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I49_CHALLENGE_COMBINATION_SEASONAL_COMMAND_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-WUXING-WANGXIANG-V2',
    supportType: 'direct_basis' as const,
    finding:
      '三命通會 directly defines the five seasonal dispositions by the command element: the command element is 旺, what it generates is 相, what generates it is 休, what controls it is 囚, and what it controls is 死.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-YUELING',
    supportType: 'direct_basis' as const,
    finding:
      '滴天髓闡微 treats month command as a central seasonal authority while also requiring correspondence with surrounding heaven/earth support rather than isolating month command from the rest of the chart.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-SHUAIWANG',
    supportType: 'scope_limit' as const,
    finding:
      '滴天髓闡微 explicitly warns that treating 得時 as automatically strong and 失令 as automatically weak is a dead rule; year/day/hour context can still modify the practical force picture.',
  },
  {
    sourceId: 'SRC-I20-SEASONAL-PHASE-CONTRACT',
    supportType: 'cross_reference' as const,
    finding:
      'I20 already materializes 旺/相/休/囚/死 deterministically from month-command and element relation while withholding relative-force, root-effect, scoring, and classification verdicts.',
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'A next-stage adapter may translate an already aligned I39 seasonal phase into the corresponding I49 traditional seasonal-disposition label without assigning a numeric weight or force magnitude.',
  'Preserve element identity: target-element seasonal disposition applies only to the exact target element whose phase was derived; participant phases apply only to their own participant elements.',
  'For an I45 STRUCTURAL_BUREAU_FORMED three-combination, the formed bureau element may receive its own month-command seasonal disposition, but that disposition must not be treated as proof of post-interaction bureau survival or effective challenge force.',
  'Do not emit a seasonal disposition for an alleged challenge-stem transformed element because I42 blocks challenge-target true-transformation result transfer.',
  'Do not emit a seasonal disposition for a six-combination transformed element because I43 leaves the uniform transformed-element route unresolved.',
  'Do not aggregate participant seasonal dispositions by majority, minimum, maximum, sum, points, or any other fixed reduction rule.',
  'Do not convert 旺/相 into an automatic positive combination result or 休/囚/死 into an automatic negative combination result.',
  'Do not emit transformation, binding, post-interaction bureau state, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview(): ChallengeCombinationSeasonalCommandEffectMethodologyReviewReport {
  const material = {
    reviewVersion: I49_CHALLENGE_COMBINATION_SEASONAL_COMMAND_EFFECT_METHODOLOGY_REVIEW_VERSION,
    decision: 'SOURCE_BOUNDED_SEASONAL_DISPOSITION_AUTHORIZED_RELATION_RESULT_BLOCKED' as const,
    monthCommandSeasonalPhaseContractResolved: true as const,
    targetElementSeasonalDispositionAuthorized: true as const,
    participantElementSeasonalDispositionAuthorized: true as const,
    formedThreeCombinationBureauElementSeasonalDispositionAuthorized: true as const,
    formedThreeCombinationBureauElementRequiresStructuralFormationEvidence: true as const,
    stemChallengeTransformedElementSeasonalDispositionAuthorized: false as const,
    sixCombinationTransformedElementSeasonalDispositionAuthorized: false as const,
    seasonalDispositionAdapterAuthorized: true as const,
    seasonalDispositionIsFinalRelativeForceVerdict: false as const,
    seasonalDispositionToTransformationVerdictAuthorized: false as const,
    seasonalDispositionToBindingVerdictAuthorized: false as const,
    seasonalDispositionToPostInteractionBureauStateAuthorized: false as const,
    seasonalDispositionToTargetPostRelationRootStateAuthorized: false as const,
    seasonalDispositionToEffectiveMechanismForceAuthorized: false as const,
    participantSeasonalDispositionAggregationAuthorized: false as const,
    seasonalDispositionWeightingAuthorized: false as const,
    additiveSeasonalScoringAuthorized: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    seasonalDispositionByPhase: I49_SEASONAL_DISPOSITION_BY_PHASE,
    sourceBasis: I49_CHALLENGE_COMBINATION_SEASONAL_COMMAND_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I49 closes only the interpretation of month-command phase as a traditional seasonal disposition; it does not close relation-specific combination outcome or effective force.',
      '旺/相/休/囚/死 remain categorical seasonal states. They are not ordinal points, percentages, confidence levels, or standalone strong/weak verdicts.',
      'Target and participant elements may carry their own seasonal dispositions because their element identities are already explicit in I39 substrate.',
      'A structurally formed three-combination bureau may also carry the seasonal disposition of its formed bureau element, but only when that bureau identity is established by aligned I45 evidence.',
      'Challenge-stem and six-combination transformed-result element routes remain blocked by I42/I43 and cannot be reconstructed through seasonal context.',
      'Whole-chart support, interference, competing relations, contextual clash ambiguity, post-relation root state, and mechanism-force composition remain separate unresolved dependencies.',
    ],
  };

  return {
    reviewId: `challenge_combination_seasonal_command_effect_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
