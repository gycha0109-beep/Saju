import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport } from './i83-challenge-combination-support-channel-no-tracked-relation-support-effect-authority-gap-review.js';

export const I84_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review-v1';

export type I84UntouchedSupportAuthorityRequirementId =
  | 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE'
  | 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION'
  | 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS'
  | 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT'
  | 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS'
  | 'INDEPENDENT_PROVENANCE_BASIS';

export interface I84UntouchedSupportAuthorityRequirement {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  requirement: string;
  mandatory: true;
  currentCanonicalAuthoritySatisfies: false;
  futureAuthorityCandidateMustSatisfy: true;
  silenceOrAbsenceOfContestMaySatisfy: false;
  supportDirectionAloneMaySatisfy: false;
  scopedPatternExampleAloneMaySatisfy: false;
  numericCalibrationMaySubstitute: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS'
    | 'I83_UNRESOLVED_OR_INVALID';
  decision: 'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED';
  upstreamI83ReviewId: string;
  requirements: readonly I84UntouchedSupportAuthorityRequirement[];
  requirementsFrozen: boolean;
  allRequirementsMandatory: true;
  currentCanonicalAuthoritySatisfiesAllRequirements: false;
  candidateMayPassWithPartialCoverage: false;
  candidateMayPassBySilence: false;
  candidateMayPassFromAbsenceOfTrackedContestAlone: false;
  candidateMayPassFromSupportDirectionAlone: false;
  candidateMayPassFromScopedPatternExampleAlone: false;
  candidateMayPassFromNumericCalibration: false;
  candidateSetCompositionPolicyResolved: false;
  partialCandidateCompositionAuthorized: false;
  implicitCrossSourceSynthesisAuthorized: false;
  newNormativeUntouchedSupportPolicyAuthorized: false;
  untouchedSupportEffectRuleImplementationAuthorized: false;
  universalDefaultActiveRuleAuthorized: false;
  universalDefaultPersistedRuleAuthorized: false;
  universalDefaultEffectiveSupportRuleAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  effectiveSupportToRelativeForceAuthorized: false;
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
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY';
  notes: readonly string[];
}

const REQUIREMENTS = Object.freeze([
  {
    requirementId: 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
    requirement:
      'An explicit post-interaction rule scoped to a support source with no tracked direct relation touch, rather than an inference from absence of contest.',
  },
  {
    requirementId: 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
    requirement:
      'A distinction between structural support-channel presence/direction and source activation, persistence, and effective support effect.',
  },
  {
    requirementId: 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
    requirement:
      'Explicit applicability and exception conditions across visible-stem and branch sources without assuming fixed positional precedence.',
  },
  {
    requirementId: 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
    requirement:
      'Explicit applicability across same-element and resource-generation support without assuming one kind outranks the other or assigning numeric weight.',
  },
  {
    requirementId: 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
    requirement:
      'A statement of whether untouched-source persistence is a default, conditional state, or intentionally unresolved state after all tracked relation settlement is absent.',
  },
  {
    requirementId: 'INDEPENDENT_PROVENANCE_BASIS',
    requirement:
      'A provenance basis strong enough to stand independently of scoped pattern examples or cross-references that were not written as universal settlement rules.',
  },
] as const satisfies readonly {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  requirement: string;
}[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_authority_requirements_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i83Accepted(
  i83: ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport,
): boolean {
  const exactCharacteristics = REQUIREMENTS.map((item) => item.requirement);
  return (
    i83.status === 'RESOLVED_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW' &&
    i83.decision ===
      'EXISTING_CANONICAL_AUTHORITY_INSUFFICIENT_FOR_UNIVERSAL_UNTOUCHED_SUPPORT_EFFECT_RULE' &&
    i83.authorityGapConfirmed &&
    i83.authorityGapClosed === false &&
    i83.existingCanonicalAuthoritySufficientForUniversalUntouchedActivation === false &&
    i83.existingCanonicalAuthoritySufficientForUniversalUntouchedPersistence === false &&
    i83.existingCanonicalAuthoritySufficientForUniversalUntouchedEffectiveSupport === false &&
    i83.absenceOfTrackedContestAloneSufficientForActivation === false &&
    i83.absenceOfTrackedContestAloneSufficientForPersistence === false &&
    i83.absenceOfTrackedContestAloneSufficientForEffectiveSupport === false &&
    i83.preInteractionSupportPresenceMaySubstituteForPostInteractionEffect === false &&
    i83.universalDefaultActiveRuleAuthorized === false &&
    i83.universalDefaultPersistedRuleAuthorized === false &&
    i83.universalDefaultEffectiveSupportRuleAuthorized === false &&
    i83.sourceActivationVerdictAuthorized === false &&
    i83.sourcePersistenceVerdictAuthorized === false &&
    i83.sourceEffectiveSupportVerdictAuthorized === false &&
    i83.relativeForceVerdictAuthorized === false &&
    i83.crossRelationPrecedenceAuthorized === false &&
    i83.classificationAuthorized === false &&
    i83.numericScoringAuthorized === false &&
    i83.additionalAuthorityRequired &&
    i83.requiredAdditionalAuthorityCharacteristics.length === exactCharacteristics.length &&
    i83.requiredAdditionalAuthorityCharacteristics.every(
      (characteristic, index) => characteristic === exactCharacteristics[index],
    ) &&
    i83.recommendedNextGate === 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW'
  );
}

function materializeRequirements(): readonly I84UntouchedSupportAuthorityRequirement[] {
  return REQUIREMENTS.map((item) => ({
    ...item,
    mandatory: true,
    currentCanonicalAuthoritySatisfies: false,
    futureAuthorityCandidateMustSatisfy: true,
    silenceOrAbsenceOfContestMaySatisfy: false,
    supportDirectionAloneMaySatisfy: false,
    scopedPatternExampleAloneMaySatisfy: false,
    numericCalibrationMaySubstitute: false,
  }));
}

function unresolved(
  i83: ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  return finalized({
    reviewVersion:
      I84_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW_VERSION,
    status: 'I83_UNRESOLVED_OR_INVALID',
    decision:
      'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED',
    upstreamI83ReviewId: i83.reviewId,
    requirements: [],
    requirementsFrozen: false,
    allRequirementsMandatory: true,
    currentCanonicalAuthoritySatisfiesAllRequirements: false,
    candidateMayPassWithPartialCoverage: false,
    candidateMayPassBySilence: false,
    candidateMayPassFromAbsenceOfTrackedContestAlone: false,
    candidateMayPassFromSupportDirectionAlone: false,
    candidateMayPassFromScopedPatternExampleAlone: false,
    candidateMayPassFromNumericCalibration: false,
    candidateSetCompositionPolicyResolved: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    newNormativeUntouchedSupportPolicyAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    effectiveSupportToRelativeForceAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY',
    notes: [
      'Resolved I83 authority-gap evidence with the exact frozen additional-authority characteristics is required before I84 can freeze the candidate acceptance contract.',
    ],
  });
}

export function buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
  i83: ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  if (!i83Accepted(i83)) return unresolved(i83);

  return finalized({
    reviewVersion:
      I84_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW_VERSION,
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS',
    decision:
      'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED',
    upstreamI83ReviewId: i83.reviewId,
    requirements: materializeRequirements(),
    requirementsFrozen: true,
    allRequirementsMandatory: true,
    currentCanonicalAuthoritySatisfiesAllRequirements: false,
    candidateMayPassWithPartialCoverage: false,
    candidateMayPassBySilence: false,
    candidateMayPassFromAbsenceOfTrackedContestAlone: false,
    candidateMayPassFromSupportDirectionAlone: false,
    candidateMayPassFromScopedPatternExampleAlone: false,
    candidateMayPassFromNumericCalibration: false,
    candidateSetCompositionPolicyResolved: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    newNormativeUntouchedSupportPolicyAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    effectiveSupportToRelativeForceAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY',
    notes: [
      'I84 freezes only the acceptance requirements for future authority candidates; it does not identify or approve a candidate source.',
      'All six requirements are mandatory. Partial coverage cannot be silently combined into a universal untouched-support rule because candidate-set composition policy is itself unresolved.',
      'Absence of tracked contest, support direction, scoped pattern examples, and numeric calibration cannot substitute for explicit normative authority.',
      'No default ACTIVE, PERSISTED, effective-support, relative-force, settlement, scoring, or strong/weak classification rule is authorized.',
    ],
  });
}
