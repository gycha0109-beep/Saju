import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  type ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
} from './i51-challenge-combination-support-interference-effect-methodology-review.js';
import {
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  type ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
} from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  I84UntouchedSupportAuthorityRequirementId,
} from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';

export const I85_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-authority-candidate-inventory-v1';

export type I85CanonicalCandidateRelevanceClass =
  | 'DIRECT_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE'
  | 'SCOPED_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE'
  | 'CROSS_REFERENCE_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE';

export interface I85CanonicalAuthorityRegistration {
  upstreamAuthority: 'I51' | 'I53';
  supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
  finding: string;
}

export interface I85CandidateRequirementCoverage {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  mandatory: true;
  satisfiedByExistingCanonicalRegistration: false;
  explicitUniversalUntouchedRuleEstablished: false;
  mayInferSatisfactionFromRelevance: false;
  mayInferSatisfactionFromSilenceOrNoContest: false;
}

export interface I85UntouchedSupportEffectAuthorityCandidate {
  sourceId: string;
  registrations: readonly I85CanonicalAuthorityRegistration[];
  canonicalRelevanceClass: I85CanonicalCandidateRelevanceClass;
  directBasisRegistrationObserved: boolean;
  scopeLimitRegistrationObserved: boolean;
  crossReferenceRegistrationObserved: boolean;
  requirementCoverage: readonly I85CandidateRequirementCoverage[];
  satisfiedRequirementIds: readonly I84UntouchedSupportAuthorityRequirementId[];
  unsatisfiedRequirementIds: readonly I84UntouchedSupportAuthorityRequirementId[];
  fullRequirementCoverage: false;
  candidateEligibleForUntouchedEffectRulePromotion: false;
  candidateEligibleForDefaultActivationRule: false;
  candidateEligibleForDefaultPersistenceRule: false;
  candidateEligibleForDefaultEffectiveSupportRule: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport {
  reportId: string;
  inventoryVersion: string;
  status:
    | 'RESOLVED_AUTHORITY_CANDIDATE_INVENTORY'
    | 'I84_UNRESOLVED_OR_INVALID'
    | 'I51_METHODOLOGY_NOT_CANONICAL'
    | 'I53_METHODOLOGY_NOT_CANONICAL';
  decision: 'EXISTING_CANONICAL_CANDIDATES_INVENTORIED_NO_FULL_REQUIREMENT_COVERAGE';
  upstreamI84ReviewId: string;
  upstreamI51ReviewId: string;
  upstreamI53ReviewId: string;
  candidates: readonly I85UntouchedSupportEffectAuthorityCandidate[];
  registrationCount: number;
  uniqueCandidateCount: number;
  duplicateSourceRegistrationsCollapsedBySourceId: boolean;
  provenancePreservedPerRegistration: boolean;
  anyCandidateFullRequirementCoverage: false;
  allCandidatesFailAtLeastOneMandatoryRequirement: true;
  existingCandidateSetCoverageUnionClosesAnyRequirement: false;
  candidateSetCompositionPolicyResolved: false;
  crossCandidateCoverageCompositionAuthorized: false;
  implicitCrossSourceSynthesisAuthorized: false;
  sameSourceDuplicateRegistrationAggregationAuthorizedForInventoryOnly: true;
  externalAuthoritySearchPerformed: false;
  newAuthorityCandidateAdded: false;
  candidateApprovalAuthorized: false;
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
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

type CanonicalSourceBasis = {
  sourceId: string;
  supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
  finding: string;
};

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport, 'reportId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport {
  return {
    reportId: `challenge_combination_support_channel_untouched_support_candidate_inventory_${deterministicContentHash(material).slice(0, 24)}`,
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
    i53.classificationAuthorized === false &&
    i53.numericScoringAuthorized === false
  );
}

function i84Accepted(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
): boolean {
  return (
    i84.status === 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS' &&
    i84.decision ===
      'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED' &&
    i84.requirementsFrozen &&
    i84.allRequirementsMandatory &&
    i84.requirements.length === 6 &&
    i84.requirements.every(
      (requirement) =>
        requirement.mandatory &&
        requirement.currentCanonicalAuthoritySatisfies === false &&
        requirement.futureAuthorityCandidateMustSatisfy &&
        requirement.silenceOrAbsenceOfContestMaySatisfy === false &&
        requirement.supportDirectionAloneMaySatisfy === false &&
        requirement.scopedPatternExampleAloneMaySatisfy === false &&
        requirement.numericCalibrationMaySubstitute === false,
    ) &&
    i84.currentCanonicalAuthoritySatisfiesAllRequirements === false &&
    i84.candidateMayPassWithPartialCoverage === false &&
    i84.candidateSetCompositionPolicyResolved === false &&
    i84.partialCandidateCompositionAuthorized === false &&
    i84.implicitCrossSourceSynthesisAuthorized === false &&
    i84.newNormativeUntouchedSupportPolicyAuthorized === false &&
    i84.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i84.sourceActivationVerdictAuthorized === false &&
    i84.sourcePersistenceVerdictAuthorized === false &&
    i84.sourceEffectiveSupportVerdictAuthorized === false &&
    i84.relativeForceVerdictAuthorized === false &&
    i84.crossRelationPrecedenceAuthorized === false &&
    i84.classificationAuthorized === false &&
    i84.numericScoringAuthorized === false &&
    i84.recommendedNextGate === 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY'
  );
}

function relevanceClass(
  registrations: readonly I85CanonicalAuthorityRegistration[],
): I85CanonicalCandidateRelevanceClass {
  if (registrations.some((registration) => registration.supportType === 'direct_basis')) {
    return 'DIRECT_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE';
  }
  if (registrations.some((registration) => registration.supportType === 'scope_limit')) {
    return 'SCOPED_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE';
  }
  return 'CROSS_REFERENCE_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE';
}

function candidate(
  sourceId: string,
  registrations: readonly I85CanonicalAuthorityRegistration[],
  requirementIds: readonly I84UntouchedSupportAuthorityRequirementId[],
): I85UntouchedSupportEffectAuthorityCandidate {
  const sortedRegistrations = [...registrations].sort((left, right) =>
    [left.upstreamAuthority, left.supportType, left.finding]
      .join('|')
      .localeCompare([right.upstreamAuthority, right.supportType, right.finding].join('|')),
  );
  const requirementCoverage = requirementIds.map((requirementId) => ({
    requirementId,
    mandatory: true as const,
    satisfiedByExistingCanonicalRegistration: false as const,
    explicitUniversalUntouchedRuleEstablished: false as const,
    mayInferSatisfactionFromRelevance: false as const,
    mayInferSatisfactionFromSilenceOrNoContest: false as const,
  }));
  return {
    sourceId,
    registrations: sortedRegistrations,
    canonicalRelevanceClass: relevanceClass(sortedRegistrations),
    directBasisRegistrationObserved: sortedRegistrations.some(
      (registration) => registration.supportType === 'direct_basis',
    ),
    scopeLimitRegistrationObserved: sortedRegistrations.some(
      (registration) => registration.supportType === 'scope_limit',
    ),
    crossReferenceRegistrationObserved: sortedRegistrations.some(
      (registration) => registration.supportType === 'cross_reference',
    ),
    requirementCoverage,
    satisfiedRequirementIds: [],
    unsatisfiedRequirementIds: [...requirementIds],
    fullRequirementCoverage: false,
    candidateEligibleForUntouchedEffectRulePromotion: false,
    candidateEligibleForDefaultActivationRule: false,
    candidateEligibleForDefaultPersistenceRule: false,
    candidateEligibleForDefaultEffectiveSupportRule: false,
  };
}

function inventory(
  i51Basis: readonly CanonicalSourceBasis[],
  i53Basis: readonly CanonicalSourceBasis[],
  requirementIds: readonly I84UntouchedSupportAuthorityRequirementId[],
): readonly I85UntouchedSupportEffectAuthorityCandidate[] {
  const registrationsBySourceId = new Map<string, I85CanonicalAuthorityRegistration[]>();
  for (const [upstreamAuthority, basis] of [
    ['I51', i51Basis],
    ['I53', i53Basis],
  ] as const) {
    for (const source of basis) {
      const registrations = registrationsBySourceId.get(source.sourceId) ?? [];
      registrations.push({
        upstreamAuthority,
        supportType: source.supportType,
        finding: source.finding,
      });
      registrationsBySourceId.set(source.sourceId, registrations);
    }
  }
  return [...registrationsBySourceId.entries()]
    .map(([sourceId, registrations]) => candidate(sourceId, registrations, requirementIds))
    .sort((left, right) => left.sourceId.localeCompare(right.sourceId));
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport['status'],
    'RESOLVED_AUTHORITY_CANDIDATE_INVENTORY'
  >,
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport {
  return finalized({
    inventoryVersion:
      I85_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY_VERSION,
    status,
    decision: 'EXISTING_CANONICAL_CANDIDATES_INVENTORIED_NO_FULL_REQUIREMENT_COVERAGE',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI51ReviewId: i51.reviewId,
    upstreamI53ReviewId: i53.reviewId,
    candidates: [],
    registrationCount: 0,
    uniqueCandidateCount: 0,
    duplicateSourceRegistrationsCollapsedBySourceId: false,
    provenancePreservedPerRegistration: true,
    anyCandidateFullRequirementCoverage: false,
    allCandidatesFailAtLeastOneMandatoryRequirement: true,
    existingCandidateSetCoverageUnionClosesAnyRequirement: false,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateCoverageCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    sameSourceDuplicateRegistrationAggregationAuthorizedForInventoryOnly: true,
    externalAuthoritySearchPerformed: false,
    newAuthorityCandidateAdded: false,
    candidateApprovalAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    notes,
  });
}

export function buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
  i84: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport =
    buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview(),
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport =
    buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview(),
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport {
  if (!i84Accepted(i84)) {
    return unresolved('I84_UNRESOLVED_OR_INVALID', i84, i51, i53, [
      'Resolved I84 frozen requirements are required before canonical authority candidates can be inventoried.',
    ]);
  }
  if (!i51Canonical(i51)) {
    return unresolved('I51_METHODOLOGY_NOT_CANONICAL', i84, i51, i53, [
      'I85 inventories only the exact canonical I51 source-basis registrations.',
    ]);
  }
  if (!i53Canonical(i53)) {
    return unresolved('I53_METHODOLOGY_NOT_CANONICAL', i84, i51, i53, [
      'I85 inventories only the exact canonical I53 source-basis registrations.',
    ]);
  }

  const requirementIds = i84.requirements.map((requirement) => requirement.requirementId);
  const candidates = inventory(i51.sourceBasis, i53.sourceBasis, requirementIds);
  const registrationCount = i51.sourceBasis.length + i53.sourceBasis.length;

  return finalized({
    inventoryVersion:
      I85_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY_VERSION,
    status: 'RESOLVED_AUTHORITY_CANDIDATE_INVENTORY',
    decision: 'EXISTING_CANONICAL_CANDIDATES_INVENTORIED_NO_FULL_REQUIREMENT_COVERAGE',
    upstreamI84ReviewId: i84.reviewId,
    upstreamI51ReviewId: i51.reviewId,
    upstreamI53ReviewId: i53.reviewId,
    candidates,
    registrationCount,
    uniqueCandidateCount: candidates.length,
    duplicateSourceRegistrationsCollapsedBySourceId: candidates.length < registrationCount,
    provenancePreservedPerRegistration: true,
    anyCandidateFullRequirementCoverage: false,
    allCandidatesFailAtLeastOneMandatoryRequirement: true,
    existingCandidateSetCoverageUnionClosesAnyRequirement: false,
    candidateSetCompositionPolicyResolved: false,
    crossCandidateCoverageCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    sameSourceDuplicateRegistrationAggregationAuthorizedForInventoryOnly: true,
    externalAuthoritySearchPerformed: false,
    newAuthorityCandidateAdded: false,
    candidateApprovalAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    notes: [
      'I85 inventories only canonical I51/I53 registrations already present in the repository; no external authority search is performed and no new candidate is added.',
      'Registrations sharing the same sourceId are grouped only to preserve one provenance candidate with all of its canonical registration contexts; this does not authorize combining different sourceIds.',
      'Because I84 records that current canonical authority does not satisfy the frozen mandatory requirements, no existing individual candidate is credited with requirement satisfaction merely from relevance, support direction, scoped examples, or silence.',
      'No cross-candidate union is allowed to close a requirement because candidate-set composition policy remains unresolved and implicit cross-source synthesis is prohibited.',
      'The existing canonical inventory therefore cannot close the untouched-support effect authority gap; additional authority acquisition readiness must be reviewed separately.',
      'Activation, persistence, effective support, relative force, clash settlement, precedence, mechanism force, scoring, and strong/weak classification remain unresolved or unauthorized.',
    ],
  });
}
