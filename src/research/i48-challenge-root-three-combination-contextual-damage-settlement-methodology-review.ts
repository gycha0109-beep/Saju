import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I48_CHALLENGE_ROOT_THREE_COMBINATION_CONTEXTUAL_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-root-three-combination-contextual-damage-settlement-methodology-review-v1';

export interface ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'PLACEMENT_ONLY_CONTEXTUAL_SETTLEMENT_NOT_DETERMINISTIC_SOURCE_BOUNDED_AMBIGUITY';
  tightEmbeddedDirectBreakRuleReopened: false;
  tightEmbeddedDirectBreakRuleRemainsAuthorized: true;
  contextualPlacementClassesConfirmed: readonly [
    'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT',
    'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
  ];
  contextualPlacementEvidenceAvailable: true;
  placementOnlyIntactVerdictAuthorized: false;
  placementOnlyDamagedVerdictAuthorized: false;
  deterministicDamageMagnitudeAuthorized: false;
  deterministicDamageSeverityClassAuthorized: false;
  deterministicContextPrecedenceRuleResolved: false;
  sourceProvidesCompleteAdditionalContextDecisionRule: false;
  contextualAmbiguityStateAuthorized: true;
  contextualAmbiguityState: 'SOURCE_BOUNDED_CONTEXTUAL_INTACT_OR_DAMAGED_AMBIGUITY';
  additionalIndependentEffectMethodologyRequiredForFurtherResolution: true;
  noTrackedClashIntactVerdictAuthorized: false;
  outsideNonTightIntactVerdictAuthorized: false;
  genericPostInteractionBureauStateEmissionAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'contextual_ambiguity' | 'anti_generalization';
    finding: string;
  }[];
  requiredAvailabilityRefinement: readonly string[];
  notes: readonly string[];
}

export const I48_CHALLENGE_ROOT_THREE_COMBINATION_CONTEXTUAL_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU-CONTEXTUAL-SUNJU',
    supportType: 'contextual_ambiguity' as const,
    finding:
      'For an internal non-tight clash or an external tight clash, the source directs the reader to consider both the assembled-bureau and damaged-bureau possibilities together rather than selecting one deterministic state from placement alone.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2-CHONGJI-ANTI-GENERALIZATION',
    supportType: 'anti_generalization' as const,
    finding:
      'The Chongji discussion explicitly rejects universal clash judgments because clash outcomes depend on contextual auspicious/harmful conditions.',
  },
] as const);

const REQUIRED_AVAILABILITY_REFINEMENT = Object.freeze([
  'Close the open question of whether placement alone can deterministically resolve the I47 contextual intact-versus-damaged classes: it cannot under the audited source basis.',
  'Preserve SOURCE_BOUNDED_CONTEXTUAL_INTACT_OR_DAMAGED_AMBIGUITY as an explicit research limitation rather than manufacturing INTACT, DAMAGED, damage magnitude, or a probability.',
  'Do not reopen the I46 embedded+tight direct-break rule; BROKEN_BY_TIGHT_EMBEDDED_CLASH remains the only placement-only deterministic post-interaction bureau state.',
  'Redirect any attempt at further contextual settlement to independently authorized effect methodologies; the audited source passage does not provide a complete additional-context decision procedure.',
  'Retain seasonal-command, support/interference, competing-relation, post-relation root-state, and effective-force blockers until separately resolved.',
  'Do not infer intactness from outside-non-tight placement or absence of a tracked clash.',
] as const);

export function buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview(): ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReviewReport {
  const material = {
    reviewVersion:
      I48_CHALLENGE_ROOT_THREE_COMBINATION_CONTEXTUAL_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    decision: 'PLACEMENT_ONLY_CONTEXTUAL_SETTLEMENT_NOT_DETERMINISTIC_SOURCE_BOUNDED_AMBIGUITY' as const,
    tightEmbeddedDirectBreakRuleReopened: false as const,
    tightEmbeddedDirectBreakRuleRemainsAuthorized: true as const,
    contextualPlacementClassesConfirmed: [
      'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT',
      'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
    ] as const,
    contextualPlacementEvidenceAvailable: true as const,
    placementOnlyIntactVerdictAuthorized: false as const,
    placementOnlyDamagedVerdictAuthorized: false as const,
    deterministicDamageMagnitudeAuthorized: false as const,
    deterministicDamageSeverityClassAuthorized: false as const,
    deterministicContextPrecedenceRuleResolved: false as const,
    sourceProvidesCompleteAdditionalContextDecisionRule: false as const,
    contextualAmbiguityStateAuthorized: true as const,
    contextualAmbiguityState: 'SOURCE_BOUNDED_CONTEXTUAL_INTACT_OR_DAMAGED_AMBIGUITY' as const,
    additionalIndependentEffectMethodologyRequiredForFurtherResolution: true as const,
    noTrackedClashIntactVerdictAuthorized: false as const,
    outsideNonTightIntactVerdictAuthorized: false as const,
    genericPostInteractionBureauStateEmissionAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I48_CHALLENGE_ROOT_THREE_COMBINATION_CONTEXTUAL_SOURCE_BASIS,
    requiredAvailabilityRefinement: REQUIRED_AVAILABILITY_REFINEMENT,
    notes: [
      'I48 closes only the methodology question of whether the two I47 contextual placement classes can be resolved from placement/proximity alone; the audited sources do not authorize such a deterministic choice.',
      'The source-bounded ambiguity state is a research limitation marker, not a bureau-strength score, probability, or intermediate classifier label.',
      'BROKEN_BY_TIGHT_EMBEDDED_CLASH remains valid and is not weakened or reopened by I48.',
      'Further contextual resolution would require independently justified effect rules; I48 does not assume that seasonal command, support, or another relation automatically resolves the ambiguity.',
      'No intact, damaged, root-destroyed, effective-force, usefulness/harmfulness, numeric, confidence, or strong/weak verdict is emitted.',
    ],
  };

  return {
    reviewId: `challenge_root_three_combination_contextual_damage_settlement_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
