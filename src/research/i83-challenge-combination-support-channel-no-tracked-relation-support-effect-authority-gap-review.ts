import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  type ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
} from './i51-challenge-combination-support-interference-effect-methodology-review.js';
import {
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  type ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
} from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import type { ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport } from './i82-challenge-combination-support-channel-no-tracked-relation-support-effect-readiness-review.js';

export const I83_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-no-tracked-relation-support-effect-authority-gap-review-v1';

export type I83AuthorityScopeClassification =
  | 'DIRECTIONAL_OR_INTERACTION_RELEVANCE_NOT_UNIVERSAL_EFFECT'
  | 'EXPLICIT_CONTEXT_DEPENDENCE_SCOPE_LIMIT'
  | 'SCOPED_CROSS_REFERENCE_NOT_UNIVERSAL_RULE';

export interface I83UntouchedSupportEffectAuthorityAuditItem {
  upstreamAuthority: 'I51' | 'I53';
  sourceId: string;
  supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
  finding: string;
  scopeClassification: I83AuthorityScopeClassification;
  supportsStructuralSupportDirectionOrInteractionRelevance: boolean;
  supportsUniversalUntouchedSourceActivationRule: false;
  supportsUniversalUntouchedSourcePersistenceRule: false;
  supportsUniversalUntouchedEffectiveSupportRule: false;
  mayBePromotedFromScopedPatternToUniversalRule: false;
  mayTreatAbsenceOfTrackedContestAsPositiveSettlement: false;
}

export interface ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW'
    | 'I82_UNRESOLVED_OR_INVALID'
    | 'I51_METHODOLOGY_NOT_CANONICAL'
    | 'I53_METHODOLOGY_NOT_CANONICAL';
  decision: 'EXISTING_CANONICAL_AUTHORITY_INSUFFICIENT_FOR_UNIVERSAL_UNTOUCHED_SUPPORT_EFFECT_RULE';
  upstreamI82ReviewId: string;
  upstreamI51ReviewId: string;
  upstreamI53ReviewId: string;
  authorityAudit: readonly I83UntouchedSupportEffectAuthorityAuditItem[];
  currentChartNoTrackedRelationPathObserved: boolean;
  directSupportDirectionOrInteractionEvidenceExists: boolean;
  scopedStabilityOrSupportReferencesExist: boolean;
  authorityGapConfirmed: boolean;
  authorityGapClosed: false;
  existingCanonicalAuthoritySufficientForUniversalUntouchedActivation: false;
  existingCanonicalAuthoritySufficientForUniversalUntouchedPersistence: false;
  existingCanonicalAuthoritySufficientForUniversalUntouchedEffectiveSupport: false;
  absenceOfTrackedContestAloneSufficientForActivation: false;
  absenceOfTrackedContestAloneSufficientForPersistence: false;
  absenceOfTrackedContestAloneSufficientForEffectiveSupport: false;
  preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false;
  universalDefaultActiveRuleAuthorized: false;
  universalDefaultPersistedRuleAuthorized: false;
  universalDefaultEffectiveSupportRuleAuthorized: false;
  supportChannelAggregationAuthorized: false;
  numericSupportWeightingAuthorized: false;
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
  additionalAuthorityRequired: true;
  requiredAdditionalAuthorityCharacteristics: readonly string[];
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_no_touch_effect_authority_gap_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i51Canonical(
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
): boolean {
  const canonical = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  return (
    i51.reviewId === canonical.reviewId &&
    i51.decision === 'SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED' &&
    i51.supportChannelActivationVerdictAuthorized === false &&
    i51.netSupportInterferenceEffectAuthorized === false &&
    i51.numericSupportWeightingAuthorized === false &&
    i51.additiveSupportScoringAuthorized === false &&
    i51.classificationAuthorized === false &&
    i51.numericScoringAuthorized === false
  );
}

function i53Canonical(
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
): boolean {
  const canonical = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  return (
    i53.reviewId === canonical.reviewId &&
    i53.decision === 'DIRECT_CONTEST_ROUTING_AUTHORIZED_ACTIVATION_PERSISTENCE_VERDICT_BLOCKED' &&
    i53.noTrackedRelationTouchMeansActivated === false &&
    i53.noTrackedRelationTouchMeansPersistent === false &&
    i53.directContestTopologyToActivationVerdictAuthorized === false &&
    i53.directContestTopologyToPersistenceVerdictAuthorized === false &&
    i53.activationPersistenceToNetSupportEffectAuthorized === false &&
    i53.numericSupportWeightingAuthorized === false &&
    i53.classificationAuthorized === false &&
    i53.numericScoringAuthorized === false
  );
}

function i82Accepted(
  i82: ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport,
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
): boolean {
  return (
    i82.status === 'RESOLVED_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS' &&
    i82.decision ===
      'NO_TRACKED_RELATION_TOUCH_CLEARS_RELATION_SETTLEMENT_DEPENDENCY_NOT_ACTIVATION_PERSISTENCE_EFFECT' &&
    i82.upstreamI51ReviewId === i51.reviewId &&
    i82.upstreamI53ReviewId === i53.reviewId &&
    i82.relationSettlementIndependenceMayBePreserved &&
    i82.supportDirectionMayBePreservedWithoutMagnitude &&
    i82.noTrackedRelationTouchMeansActivated === false &&
    i82.noTrackedRelationTouchMeansPersistent === false &&
    i82.noTrackedRelationTouchMeansEffectiveSupport === false &&
    i82.absenceOfTrackedContestMayBeTreatedAsPositiveSettlementOutcome === false &&
    i82.preInteractionSupportPresenceMaySubstituteForPostInteractionEffect === false &&
    i82.sourceActivationVerdictAuthorized === false &&
    i82.sourcePersistenceVerdictAuthorized === false &&
    i82.sourceEffectiveSupportVerdictAuthorized === false &&
    i82.effectiveSupportToRelativeForceAuthorized === false &&
    i82.relativeForceVerdictAuthorized === false &&
    i82.crossRelationPrecedenceAuthorized === false &&
    i82.classificationAuthorized === false &&
    i82.numericScoringAuthorized === false &&
    i82.authorityGap ===
      'UNIVERSAL_UNTOUCHED_SUPPORT_ACTIVATION_PERSISTENCE_EFFECT_RULE_NOT_ESTABLISHED' &&
    i82.recommendedNextGate === 'NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW'
  );
}

function scopeClassification(
  supportType: 'direct_basis' | 'scope_limit' | 'cross_reference',
): I83AuthorityScopeClassification {
  if (supportType === 'direct_basis') {
    return 'DIRECTIONAL_OR_INTERACTION_RELEVANCE_NOT_UNIVERSAL_EFFECT';
  }
  if (supportType === 'scope_limit') {
    return 'EXPLICIT_CONTEXT_DEPENDENCE_SCOPE_LIMIT';
  }
  return 'SCOPED_CROSS_REFERENCE_NOT_UNIVERSAL_RULE';
}

function auditAuthority(
  upstreamAuthority: 'I51' | 'I53',
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[],
): I83UntouchedSupportEffectAuthorityAuditItem[] {
  return sourceBasis.map((source) => ({
    upstreamAuthority,
    sourceId: source.sourceId,
    supportType: source.supportType,
    finding: source.finding,
    scopeClassification: scopeClassification(source.supportType),
    supportsStructuralSupportDirectionOrInteractionRelevance: source.supportType === 'direct_basis',
    supportsUniversalUntouchedSourceActivationRule: false,
    supportsUniversalUntouchedSourcePersistenceRule: false,
    supportsUniversalUntouchedEffectiveSupportRule: false,
    mayBePromotedFromScopedPatternToUniversalRule: false,
    mayTreatAbsenceOfTrackedContestAsPositiveSettlement: false,
  }));
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport['status'],
    'RESOLVED_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW'
  >,
  i82: ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport,
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport {
  return finalized({
    reviewVersion:
      I83_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW_VERSION,
    status,
    decision:
      'EXISTING_CANONICAL_AUTHORITY_INSUFFICIENT_FOR_UNIVERSAL_UNTOUCHED_SUPPORT_EFFECT_RULE',
    upstreamI82ReviewId: i82.reviewId,
    upstreamI51ReviewId: i51.reviewId,
    upstreamI53ReviewId: i53.reviewId,
    authorityAudit: [],
    currentChartNoTrackedRelationPathObserved: false,
    directSupportDirectionOrInteractionEvidenceExists: false,
    scopedStabilityOrSupportReferencesExist: false,
    authorityGapConfirmed: false,
    authorityGapClosed: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedActivation: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedPersistence: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedEffectiveSupport: false,
    absenceOfTrackedContestAloneSufficientForActivation: false,
    absenceOfTrackedContestAloneSufficientForPersistence: false,
    absenceOfTrackedContestAloneSufficientForEffectiveSupport: false,
    preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    supportChannelAggregationAuthorized: false,
    numericSupportWeightingAuthorized: false,
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
    additionalAuthorityRequired: true,
    requiredAdditionalAuthorityCharacteristics: [],
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW',
    notes,
  });
}

const REQUIRED_ADDITIONAL_AUTHORITY_CHARACTERISTICS = Object.freeze([
  'An explicit post-interaction rule scoped to a support source with no tracked direct relation touch, rather than an inference from absence of contest.',
  'A distinction between structural support-channel presence/direction and source activation, persistence, and effective support effect.',
  'Explicit applicability and exception conditions across visible-stem and branch sources without assuming fixed positional precedence.',
  'Explicit applicability across same-element and resource-generation support without assuming one kind outranks the other or assigning numeric weight.',
  'A statement of whether untouched-source persistence is a default, conditional state, or intentionally unresolved state after all tracked relation settlement is absent.',
  'A provenance basis strong enough to stand independently of scoped pattern examples or cross-references that were not written as universal settlement rules.',
] as const);

export function buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
  i82: ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport,
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport =
    buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview(),
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport =
    buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview(),
): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport {
  if (!i51Canonical(i51)) {
    return unresolved('I51_METHODOLOGY_NOT_CANONICAL', i82, i51, i53, [
      'I83 requires the canonical I51 directional support methodology before auditing its source basis.',
    ]);
  }
  if (!i53Canonical(i53)) {
    return unresolved('I53_METHODOLOGY_NOT_CANONICAL', i82, i51, i53, [
      'I83 requires the canonical I53 contest-topology methodology before auditing its source basis.',
    ]);
  }
  if (!i82Accepted(i82, i51, i53)) {
    return unresolved('I82_UNRESOLVED_OR_INVALID', i82, i51, i53, [
      'Resolved fail-closed I82 readiness aligned to the supplied canonical I51/I53 reviews is required before the authority gap can be audited.',
    ]);
  }

  const authorityAudit = [
    ...auditAuthority('I51', i51.sourceBasis),
    ...auditAuthority('I53', i53.sourceBasis),
  ].sort((left, right) =>
    [left.upstreamAuthority, left.sourceId]
      .join('|')
      .localeCompare([right.upstreamAuthority, right.sourceId].join('|')),
  );

  return finalized({
    reviewVersion:
      I83_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW_VERSION,
    status: 'RESOLVED_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW',
    decision:
      'EXISTING_CANONICAL_AUTHORITY_INSUFFICIENT_FOR_UNIVERSAL_UNTOUCHED_SUPPORT_EFFECT_RULE',
    upstreamI82ReviewId: i82.reviewId,
    upstreamI51ReviewId: i51.reviewId,
    upstreamI53ReviewId: i53.reviewId,
    authorityAudit,
    currentChartNoTrackedRelationPathObserved: i82.noTrackedRelationPathObserved,
    directSupportDirectionOrInteractionEvidenceExists: authorityAudit.some(
      (item) => item.supportsStructuralSupportDirectionOrInteractionRelevance,
    ),
    scopedStabilityOrSupportReferencesExist: authorityAudit.some(
      (item) => item.supportType === 'scope_limit' || item.supportType === 'cross_reference',
    ),
    authorityGapConfirmed: true,
    authorityGapClosed: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedActivation: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedPersistence: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedEffectiveSupport: false,
    absenceOfTrackedContestAloneSufficientForActivation: false,
    absenceOfTrackedContestAloneSufficientForPersistence: false,
    absenceOfTrackedContestAloneSufficientForEffectiveSupport: false,
    preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    supportChannelAggregationAuthorized: false,
    numericSupportWeightingAuthorized: false,
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
    additionalAuthorityRequired: true,
    requiredAdditionalAuthorityCharacteristics: REQUIRED_ADDITIONAL_AUTHORITY_CHARACTERISTICS,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW',
    notes: [
      'I83 audits only the already-canonical I51/I53 authority basis; it does not add a new classical source or normative untouched-support rule.',
      'Direct-basis passages establish support direction or interaction relevance but do not state a universal post-interaction ACTIVE/PERSISTED/effective-support rule for every source with no tracked relation touch.',
      'Scope-limit and cross-reference passages remain contextual evidence and cannot be universalized by removing their pattern or interaction conditions.',
      'Absence of tracked contest is negative topology evidence, not a positive settlement result.',
      'Closing this gap requires explicit additional authority or a separately governed normative policy stage; neither is supplied by I83.',
      'Relative force, clash winner, rescue, settlement, cross-relation precedence, effective mechanism force, usefulness/harmfulness, scoring, and strong/weak classification remain unresolved or unauthorized.',
    ],
  });
}
