import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';

export const I57_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-existing-settlement-authority-applicability-review-v1';

export type ExistingSettlementAuthorityApplicabilityStatus =
  | 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED'
  | 'NARROW_BUREAU_STATE_AUTHORITY_NOT_GENERIC_SUPPORT_CHANNEL_SETTLEMENT'
  | 'MULTI_TOUCH_ID_KIND_PAIRING_INSUFFICIENT'
  | 'COMPETING_RELATION_PRECEDENCE_UNRESOLVED';

export interface ExistingSettlementAuthorityApplicabilityItem {
  dependency: ChallengeCombinationSupportChannelContestSettlementDependency;
  status: ExistingSettlementAuthorityApplicabilityStatus;
  authorityRefs: readonly string[];
  reusableSubstrateAvailable: boolean;
  settlementOutcomeResolved: false;
  supportChannelActivationResolved: false;
  supportChannelPersistenceResolved: false;
  notes: readonly string[];
}

export interface ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'EXISTING_RELATION_SPECIFIC_SUBSTRATE_REUSE_AUTHORIZED_GENERIC_SETTLEMENT_RESOLUTION_BLOCKED';
  existingRelationSpecificSubstrateReuseAuthorized: true;
  routedDependencyOutcomeResolutionAuthorized: false;
  currentCombinationBindingSettlementResolved: false;
  clashRelativeForceSettlementResolved: false;
  clashRescueSettlementResolved: false;
  genericClashInteractionSettlementResolved: false;
  competingCombinationBindingSettlementResolved: false;
  touchSpecificRelationSettlementResolved: false;
  competingRelationSettlementResolved: false;
  threeCombinationDirectBreakReuseAuthorizedOnlyForExactBureauIdentity: true;
  bureauBreakToSupportSourceDestroyedAuthorized: false;
  seasonalAdvantageToRelativeForceVerdictAuthorized: false;
  rescueTopologyToRescueEffectAuthorized: false;
  combinationParticipationToBindingVerdictAuthorized: false;
  multiTouchIdKindPairingSufficient: false;
  crossRelationPrecedenceAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNeutralizationVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  applicability: readonly ExistingSettlementAuthorityApplicabilityItem[];
  sourceBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

const APPLICABILITY = Object.freeze([
  {
    dependency: 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    status: 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED',
    authorityRefs: ['I35', 'I42', 'I43'],
    reusableSubstrateAvailable: true,
    settlementOutcomeResolved: false,
    supportChannelActivationResolved: false,
    supportChannelPersistenceResolved: false,
    notes: [
      'I35 preserves current combination identity and context substrate, while I42/I43 preserve transformation-scope limits.',
      'Neither structural participation nor transformation-reference scope establishes binding, neutralization, persistence, or support-channel effect.',
    ],
  },
  {
    dependency: 'CLASH_RELATIVE_FORCE_SETTLEMENT',
    status: 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED',
    authorityRefs: ['I33', 'I49', 'I50'],
    reusableSubstrateAvailable: true,
    settlementOutcomeResolved: false,
    supportChannelActivationResolved: false,
    supportChannelPersistenceResolved: false,
    notes: [
      'I33 provides seasonal phase, positional support locators, and a seasonal-advantage candidate; I49/I50 add source-bounded seasonal disposition.',
      'Seasonal advantage or disposition remains incomplete relative-force substrate and does not establish a clash winner.',
    ],
  },
  {
    dependency: 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
    status: 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED',
    authorityRefs: ['I33'],
    reusableSubstrateAvailable: true,
    settlementOutcomeResolved: false,
    supportChannelActivationResolved: false,
    supportChannelPersistenceResolved: false,
    notes: [
      'I33 exposes rescue relation topology as candidate routing only.',
      'Rescue topology does not prove rescue effectiveness or settle support-source persistence.',
    ],
  },
  {
    dependency: 'CLASH_INTERACTION_SETTLEMENT',
    status: 'NARROW_BUREAU_STATE_AUTHORITY_NOT_GENERIC_SUPPORT_CHANNEL_SETTLEMENT',
    authorityRefs: ['I46', 'I47', 'I48'],
    reusableSubstrateAvailable: true,
    settlementOutcomeResolved: false,
    supportChannelActivationResolved: false,
    supportChannelPersistenceResolved: false,
    notes: [
      'I47 authorizes BROKEN_BY_TIGHT_EMBEDDED_CLASH only for an exact formed three-combination bureau identity under the I46 placement contract.',
      'That bureau-level state cannot be generalized into support-source DESTROYED, INACTIVE, or a generic clash-interaction settlement.',
      'I48 preserves contextual intact-or-damaged ambiguity outside the narrow direct-break case.',
    ],
  },
  {
    dependency: 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    status: 'SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED',
    authorityRefs: ['I35', 'I40', 'I41'],
    reusableSubstrateAvailable: true,
    settlementOutcomeResolved: false,
    supportChannelActivationResolved: false,
    supportChannelPersistenceResolved: false,
    notes: [
      'I35 provides competing combination topology and I40/I41 preserve condition/dependency structure without a universal interaction outcome.',
      'Competing combination participation does not establish binding, neutralization, or persistence loss.',
    ],
  },
  {
    dependency: 'TOUCH_SPECIFIC_RELATION_SETTLEMENT',
    status: 'MULTI_TOUCH_ID_KIND_PAIRING_INSUFFICIENT',
    authorityRefs: ['I54', 'I56'],
    reusableSubstrateAvailable: false,
    settlementOutcomeResolved: false,
    supportChannelActivationResolved: false,
    supportChannelPersistenceResolved: false,
    notes: [
      'I54 exposes relation-id and relation-kind sets for multi-touch topology but not an authoritative id-to-kind pair mapping.',
      'I56 deliberately refuses to reconstruct that pairing, so touch-specific dispatch cannot be treated as resolved.',
    ],
  },
  {
    dependency: 'COMPETING_RELATION_SETTLEMENT',
    status: 'COMPETING_RELATION_PRECEDENCE_UNRESOLVED',
    authorityRefs: ['I40', 'I41'],
    reusableSubstrateAvailable: true,
    settlementOutcomeResolved: false,
    supportChannelActivationResolved: false,
    supportChannelPersistenceResolved: false,
    notes: [
      'I40/I41 preserve competing-condition dependencies while refusing a universal clash-over-combination or combination-over-clash precedence rule.',
      'Competing-relation topology therefore remains substrate rather than settlement outcome.',
    ],
  },
] as const satisfies readonly ExistingSettlementAuthorityApplicabilityItem[]);

const SOURCE_BASIS = Object.freeze([
  {
    authorityRef: 'I32/I33',
    finding:
      'Challenge clash authority permits generic seasonal/support/rescue substrate but explicitly blocks relative-force, clash-winner, rescue-effect, and clash-settlement verdicts.',
  },
  {
    authorityRef: 'I34/I35/I42/I43',
    finding:
      'Challenge combination authority permits structural participation and conditional context while explicitly separating combination membership from transformation, binding, and effect.',
  },
  {
    authorityRef: 'I40/I41',
    finding:
      'Condition composition/dependency authority preserves competing dependencies but does not authorize a fixed cross-relation precedence result.',
  },
  {
    authorityRef: 'I46/I47/I48',
    finding:
      'Three-combination clash authority has one narrow bureau-level direct-break state; contextual cases remain ambiguous and the bureau state is not a generic support-source destruction verdict.',
  },
  {
    authorityRef: 'I49/I50/I53-I56',
    finding:
      'Seasonal disposition, support topology, contest topology, and settlement-dependency routing are substrate layers only and remain blocked from force, activation/persistence, and net-effect promotion.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'A next evidence adapter may annotate each I56 routed dependency with the exact existing authority applicability status defined here.',
  'Reuse I33/I35/I40/I41/I46-I50 substrate only when the routed dependency and subject identity semantically align.',
  'Do not convert I33 seasonal advantage or I50 seasonal disposition into relative-force or clash-winner verdicts.',
  'Do not convert I33 rescue topology into rescue effectiveness.',
  'Do not convert I35 combination participation into binding or neutralization.',
  'Do not convert I47 BROKEN_BY_TIGHT_EMBEDDED_CLASH from an exact bureau state into generic support-source destruction or inactivity.',
  'Do not reconstruct multi-touch relation-id-to-kind pairs that I54 did not authoritatively emit.',
  'Do not invent fixed competing-relation precedence from I40/I41 dependency topology.',
  'Do not emit support-channel activation/persistence/net effect, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview(): ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReviewReport {
  const material = {
    reviewVersion:
      I57_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_REVIEW_VERSION,
    decision:
      'EXISTING_RELATION_SPECIFIC_SUBSTRATE_REUSE_AUTHORIZED_GENERIC_SETTLEMENT_RESOLUTION_BLOCKED' as const,
    existingRelationSpecificSubstrateReuseAuthorized: true as const,
    routedDependencyOutcomeResolutionAuthorized: false as const,
    currentCombinationBindingSettlementResolved: false as const,
    clashRelativeForceSettlementResolved: false as const,
    clashRescueSettlementResolved: false as const,
    genericClashInteractionSettlementResolved: false as const,
    competingCombinationBindingSettlementResolved: false as const,
    touchSpecificRelationSettlementResolved: false as const,
    competingRelationSettlementResolved: false as const,
    threeCombinationDirectBreakReuseAuthorizedOnlyForExactBureauIdentity: true as const,
    bureauBreakToSupportSourceDestroyedAuthorized: false as const,
    seasonalAdvantageToRelativeForceVerdictAuthorized: false as const,
    rescueTopologyToRescueEffectAuthorized: false as const,
    combinationParticipationToBindingVerdictAuthorized: false as const,
    multiTouchIdKindPairingSufficient: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    supportChannelActivationVerdictAuthorized: false as const,
    supportChannelPersistenceVerdictAuthorized: false as const,
    supportChannelNeutralizationVerdictAuthorized: false as const,
    supportChannelDestructionVerdictAuthorized: false as const,
    supportChannelNetEffectVerdictAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    applicability: APPLICABILITY,
    sourceBasis: SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    notes: [
      'I57 is an applicability review of already-closed authority; it creates no new clash, combination, rescue, binding, or precedence rule.',
      'Existing relation-specific evidence can be reused as named substrate where identity and semantics align, but none of the generic I56 settlement outcomes is thereby resolved.',
      'The only deterministic clash-result authority in the audited chain is the narrow I47 bureau break state, whose subject is the formed three-combination bureau rather than a generic support source.',
      'Multi-touch touch-specific dispatch remains blocked by missing authoritative relation-id-to-kind pairing, and competing-relation settlement remains blocked by the no-fixed-precedence boundary.',
      'Support activation/persistence, net effect, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification remain unresolved or unauthorized.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_existing_settlement_authority_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
