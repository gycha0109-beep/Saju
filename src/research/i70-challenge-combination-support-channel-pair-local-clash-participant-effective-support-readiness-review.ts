import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I70_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_EFFECTIVE_SUPPORT_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-participant-effective-support-readiness-review-v1';

export interface ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'SUPPORT_SOURCE_CONTEST_ALIGNMENT_REQUIRED_EFFECTIVE_SUPPORT_EFFECT_BLOCKED';
  i20cNamedSupportCategoryEvidenceReusable: true;
  i20cSupportPositionEvidenceReusable: true;
  i20cSupportEffectAlreadyResolved: false;
  i20cExactSupportSourceRelationContestIdentityAvailable: false;
  i51DirectionalSupportSemanticsReusable: true;
  i51NetSupportEffectReusable: false;
  i53ContestTopologyMethodologyConceptReusable: true;
  i53ActivationPersistenceVerdictReusableWithoutExactChannelAlignment: false;
  existingI52ToI65CombinationSupportChannelChainDirectlyReusableForArbitraryClashParticipantSupport: false;
  exactSupportSourceIdentityRequired: true;
  exactSupportSourceContestTopologyRequired: true;
  relationSpecificSettlementRequiredForContestedSupportSource: true;
  multiTouchPrecedenceRequiredWhereApplicable: true;
  supportChannelActivationPersistenceRequiredBeforeEffectiveSupport: true;
  untouchedSupportSourceMayBeAssumedEffective: false;
  supportSignalPresenceMayBeAssumedEffective: false;
  supportSignalMultiplicityMagnitudeInferenceAuthorized: false;
  supportCategoryFixedPrecedenceAuthorized: false;
  effectiveSupportEffectResolutionAuthorized: false;
  relativeForcePromotionAuthorized: false;
  relativeForceVerdict: 'not_determined';
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  requiredSubstrate: readonly string[];
  authorityBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

const REQUIRED_SUBSTRATE = Object.freeze([
  'exact clash participant identity',
  'exact support-source pillar/component/value identity for each tracked support signal',
  'all structural relations touching each exact support source',
  'authoritative relation id-kind pairing for every support-source touch',
  'relation-specific settlement substrate/outcome per touch where required',
  'competing-relation precedence when multiple touches cannot be independently settled',
  'support-source activation/persistence state after exact relation settlement',
] as const);

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I20c',
    finding:
      'I20c preserves named support categories and source positions but deliberately leaves support effect and relative force unresolved.',
  },
  {
    authorityRef: 'I51',
    finding:
      'Same-element/resource support has directional structural meaning, but channel multiplicity, category precedence, activation, persistence, and net support/interference effect are not authorized.',
  },
  {
    authorityRef: 'I53',
    finding:
      'A support source touched by clash or combination requires relation-specific settlement before persistence can be inferred; NO_TRACKED_RELATION_TOUCH is not ACTIVE/PERSISTED.',
  },
  {
    authorityRef: 'I52–I65',
    finding:
      'The existing exact source-identity, touch-pair, dispatch, and current-chart substrate chain is scoped to challenge-combination support channels. Its architectural pattern may guide later work, but its results cannot be directly relabeled as arbitrary clash-participant support evidence.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'Preserve the exact clash participant for whom a support source is being evaluated; do not collapse participant-local support into chart-global support.',
  'Materialize each tracked support source as exact pillar/component/value identity before relation-topology lookup.',
  'Do not infer source identity solely from a qualitative support-category label.',
  'Do not reuse I52–I65 result rows unless their original subject/channel identity is exactly the same support source under review.',
  'An untouched support source is only free from tracked direct relation contest; it is not automatically effective, active, or persistent.',
  'For a contested source, require the exact clash/combination settlement dependencies already defined by the relation-specific governance chain.',
  'Do not sum support sources, assign fixed precedence among support categories, or infer support magnitude from multiplicity.',
  'Do not emit effective support, relative force, clash winner, rescue effect, clash settlement, post-relation root state, effective mechanism force, scoring, or classification from topology alone.',
] as const);

export function buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview(): ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReviewReport {
  const material = {
    reviewVersion:
      I70_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_EFFECTIVE_SUPPORT_READINESS_REVIEW_VERSION,
    decision:
      'SUPPORT_SOURCE_CONTEST_ALIGNMENT_REQUIRED_EFFECTIVE_SUPPORT_EFFECT_BLOCKED' as const,
    i20cNamedSupportCategoryEvidenceReusable: true as const,
    i20cSupportPositionEvidenceReusable: true as const,
    i20cSupportEffectAlreadyResolved: false as const,
    i20cExactSupportSourceRelationContestIdentityAvailable: false as const,
    i51DirectionalSupportSemanticsReusable: true as const,
    i51NetSupportEffectReusable: false as const,
    i53ContestTopologyMethodologyConceptReusable: true as const,
    i53ActivationPersistenceVerdictReusableWithoutExactChannelAlignment: false as const,
    existingI52ToI65CombinationSupportChannelChainDirectlyReusableForArbitraryClashParticipantSupport: false as const,
    exactSupportSourceIdentityRequired: true as const,
    exactSupportSourceContestTopologyRequired: true as const,
    relationSpecificSettlementRequiredForContestedSupportSource: true as const,
    multiTouchPrecedenceRequiredWhereApplicable: true as const,
    supportChannelActivationPersistenceRequiredBeforeEffectiveSupport: true as const,
    untouchedSupportSourceMayBeAssumedEffective: false as const,
    supportSignalPresenceMayBeAssumedEffective: false as const,
    supportSignalMultiplicityMagnitudeInferenceAuthorized: false as const,
    supportCategoryFixedPrecedenceAuthorized: false as const,
    effectiveSupportEffectResolutionAuthorized: false as const,
    relativeForcePromotionAuthorized: false as const,
    relativeForceVerdict: 'not_determined' as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    requiredSubstrate: REQUIRED_SUBSTRATE,
    authorityBasis: AUTHORITY_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    notes: [
      'I70 does not invent an effective-support formula. It determines what additional identity and settlement substrate is required before such an effect can be reviewed.',
      'I20c support categories are useful evidence but are not effective-force states.',
      'The key missing bridge is exact support-source contest alignment: each source must be tied to its structural relations and relation-specific settlements before persistence can be considered.',
      'The mature I52–I65 chain demonstrates the required identity discipline for combination support channels, but its scoped result authority is not generalized to arbitrary clash participants.',
      'Relative-force promotion therefore remains blocked after I70.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_pair_local_clash_participant_effective_support_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
