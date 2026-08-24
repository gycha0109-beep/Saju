import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { SourceReference } from '../contracts/interpretation.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport } from './i85-challenge-combination-support-channel-untouched-support-effect-authority-candidate-inventory.js';

export const I86_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-additional-authority-acquisition-readiness-review-v1';

export type I86AuthorityAcquisitionStage =
  | 'DISCOVERY_ONLY'
  | 'PROVENANCE_NORMALIZATION'
  | 'SOURCE_REGISTRATION'
  | 'I84_REQUIREMENT_EVALUATION'
  | 'METHODOLOGY_OR_RULE_PROMOTION_REVIEW';

export interface I86AuthorityAcquisitionStageContract {
  stage: I86AuthorityAcquisitionStage;
  authorizedForResearch: boolean;
  mayCreateExecutableAuthority: boolean;
  requiredPriorStage: I86AuthorityAcquisitionStage | 'none';
  guard: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status: 'RESOLVED_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS' | 'I85_UNRESOLVED_OR_INVALID';
  decision: 'ADDITIONAL_AUTHORITY_ACQUISITION_RESEARCH_REGISTRATION_ALLOWED_DIRECT_RULE_PROMOTION_BLOCKED';
  upstreamI85ReportId: string;
  existingCanonicalInventoryExhaustedForCurrentScope: boolean;
  additionalAuthorityAcquisitionNeeded: boolean;
  externalAuthorityDiscoveryResearchAuthorized: boolean;
  sourceProvenanceNormalizationAuthorized: boolean;
  sourceRegistrationResearchAuthorized: boolean;
  registeredCandidateI84RequirementEvaluationAuthorized: boolean;
  methodologyOrRulePromotionReviewRequiredAfterCandidateEvaluation: true;
  acquisitionStages: readonly I86AuthorityAcquisitionStageContract[];
  sourceReferenceContract: readonly (keyof SourceReference)[];
  requiredCoreSourceReferenceFields: readonly ('sourceId' | 'sourceType' | 'title' | 'provenanceTier')[];
  provenanceDetailFieldsRequiredWhereApplicable: readonly (
    | 'author'
    | 'editor'
    | 'publisher'
    | 'edition'
    | 'publicationYear'
    | 'language'
    | 'locator'
    | 'url'
    | 'accessedAt'
    | 'rights'
    | 'notes'
  )[];
  candidateMustHaveStableSourceIdBeforeRequirementEvaluation: true;
  candidateMustBeRegisteredBeforeMethodologyOrRuleReference: true;
  registeredSourceContentMustBeContentAddressedInRegistrySnapshot: true;
  missingMethodologySourceReferenceFailsRegistry: true;
  missingRuleSourceReferenceFailsRegistry: true;
  sourceRegistrationAloneMeansMethodologyApproved: false;
  sourceRegistrationAloneMeansRuleApproved: false;
  sourceRegistrationAloneMeansExecutableAuthority: false;
  reviewAttestationAppliesDirectlyToSourceReference: false;
  methodologyOrRuleReviewRemainsSeparate: true;
  webSearchResultIsAuthority: false;
  retrievedSnippetIsAuthority: false;
  secondarySummaryIsAuthority: false;
  modelGeneratedSynthesisIsAuthority: false;
  relevanceMatchIsAuthority: false;
  unregisteredQuotationIsAuthority: false;
  discoveryMayBypassSourceRegistration: false;
  discoveryMayBypassI84Evaluation: false;
  candidateMayBeApprovedBecauseItIsPrimaryText: false;
  candidateMayBeApprovedBecauseItMentionsSupport: false;
  candidateMayBeApprovedBecauseItMentionsNoContestOrStability: false;
  candidateSetCompositionPolicyResolved: false;
  crossCandidateSynthesisAuthorized: false;
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
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_REGISTRATION_CONTRACT';
  notes: readonly string[];
}

const SOURCE_REFERENCE_CONTRACT = Object.freeze([
  'sourceId',
  'sourceType',
  'title',
  'author',
  'editor',
  'publisher',
  'edition',
  'publicationYear',
  'language',
  'locator',
  'url',
  'accessedAt',
  'provenanceTier',
  'rights',
  'notes',
] as const satisfies readonly (keyof SourceReference)[]);

const CORE_FIELDS = Object.freeze([
  'sourceId',
  'sourceType',
  'title',
  'provenanceTier',
] as const);

const DETAIL_FIELDS = Object.freeze([
  'author',
  'editor',
  'publisher',
  'edition',
  'publicationYear',
  'language',
  'locator',
  'url',
  'accessedAt',
  'rights',
  'notes',
] as const);

const ACQUISITION_STAGES = Object.freeze([
  {
    stage: 'DISCOVERY_ONLY',
    authorizedForResearch: true,
    mayCreateExecutableAuthority: false,
    requiredPriorStage: 'none',
    guard:
      'Discovery may identify a candidate location or source, but search results, snippets, summaries, and model synthesis are not authority.',
  },
  {
    stage: 'PROVENANCE_NORMALIZATION',
    authorizedForResearch: true,
    mayCreateExecutableAuthority: false,
    requiredPriorStage: 'DISCOVERY_ONLY',
    guard:
      'A candidate must be normalized to explicit source identity and provenance metadata; relevance alone does not satisfy I84.',
  },
  {
    stage: 'SOURCE_REGISTRATION',
    authorizedForResearch: true,
    mayCreateExecutableAuthority: false,
    requiredPriorStage: 'PROVENANCE_NORMALIZATION',
    guard:
      'Registration must use the existing SourceReference/registry path and content-addressed snapshot semantics; registration alone is not methodology or rule approval.',
  },
  {
    stage: 'I84_REQUIREMENT_EVALUATION',
    authorizedForResearch: true,
    mayCreateExecutableAuthority: false,
    requiredPriorStage: 'SOURCE_REGISTRATION',
    guard:
      'Each registered candidate is evaluated against all six frozen I84 requirements without implicit cross-source synthesis.',
  },
  {
    stage: 'METHODOLOGY_OR_RULE_PROMOTION_REVIEW',
    authorizedForResearch: false,
    mayCreateExecutableAuthority: false,
    requiredPriorStage: 'I84_REQUIREMENT_EVALUATION',
    guard:
      'Candidate coverage does not directly create executable authority; methodology/rule definition, source linkage, review, trust, and production authorization remain separate governed stages.',
  },
] as const satisfies readonly I86AuthorityAcquisitionStageContract[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_authority_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i85Accepted(
  i85: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport,
): boolean {
  return (
    i85.status === 'RESOLVED_AUTHORITY_CANDIDATE_INVENTORY' &&
    i85.decision === 'EXISTING_CANONICAL_CANDIDATES_INVENTORIED_NO_FULL_REQUIREMENT_COVERAGE' &&
    i85.registrationCount > 0 &&
    i85.uniqueCandidateCount > 0 &&
    i85.provenancePreservedPerRegistration &&
    i85.anyCandidateFullRequirementCoverage === false &&
    i85.allCandidatesFailAtLeastOneMandatoryRequirement &&
    i85.existingCandidateSetCoverageUnionClosesAnyRequirement === false &&
    i85.candidateSetCompositionPolicyResolved === false &&
    i85.crossCandidateCoverageCompositionAuthorized === false &&
    i85.implicitCrossSourceSynthesisAuthorized === false &&
    i85.externalAuthoritySearchPerformed === false &&
    i85.newAuthorityCandidateAdded === false &&
    i85.candidateApprovalAuthorized === false &&
    i85.newNormativeUntouchedSupportPolicyAuthorized === false &&
    i85.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i85.sourceActivationVerdictAuthorized === false &&
    i85.sourcePersistenceVerdictAuthorized === false &&
    i85.sourceEffectiveSupportVerdictAuthorized === false &&
    i85.relativeForceVerdictAuthorized === false &&
    i85.crossRelationPrecedenceAuthorized === false &&
    i85.classificationAuthorized === false &&
    i85.numericScoringAuthorized === false &&
    i85.candidates.every(
      (candidate) =>
        candidate.fullRequirementCoverage === false &&
        candidate.candidateEligibleForUntouchedEffectRulePromotion === false &&
        candidate.candidateEligibleForDefaultActivationRule === false &&
        candidate.candidateEligibleForDefaultPersistenceRule === false &&
        candidate.candidateEligibleForDefaultEffectiveSupportRule === false,
    ) &&
    i85.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW'
  );
}

function commonMaterial(
  i85: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport,
) {
  return {
    reviewVersion:
      I86_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    decision:
      'ADDITIONAL_AUTHORITY_ACQUISITION_RESEARCH_REGISTRATION_ALLOWED_DIRECT_RULE_PROMOTION_BLOCKED' as const,
    upstreamI85ReportId: i85.reportId,
    sourceReferenceContract: SOURCE_REFERENCE_CONTRACT,
    requiredCoreSourceReferenceFields: CORE_FIELDS,
    provenanceDetailFieldsRequiredWhereApplicable: DETAIL_FIELDS,
    candidateMustHaveStableSourceIdBeforeRequirementEvaluation: true as const,
    candidateMustBeRegisteredBeforeMethodologyOrRuleReference: true as const,
    registeredSourceContentMustBeContentAddressedInRegistrySnapshot: true as const,
    missingMethodologySourceReferenceFailsRegistry: true as const,
    missingRuleSourceReferenceFailsRegistry: true as const,
    sourceRegistrationAloneMeansMethodologyApproved: false as const,
    sourceRegistrationAloneMeansRuleApproved: false as const,
    sourceRegistrationAloneMeansExecutableAuthority: false as const,
    reviewAttestationAppliesDirectlyToSourceReference: false as const,
    methodologyOrRuleReviewRemainsSeparate: true as const,
    webSearchResultIsAuthority: false as const,
    retrievedSnippetIsAuthority: false as const,
    secondarySummaryIsAuthority: false as const,
    modelGeneratedSynthesisIsAuthority: false as const,
    relevanceMatchIsAuthority: false as const,
    unregisteredQuotationIsAuthority: false as const,
    discoveryMayBypassSourceRegistration: false as const,
    discoveryMayBypassI84Evaluation: false as const,
    candidateMayBeApprovedBecauseItIsPrimaryText: false as const,
    candidateMayBeApprovedBecauseItMentionsSupport: false as const,
    candidateMayBeApprovedBecauseItMentionsNoContestOrStability: false as const,
    candidateSetCompositionPolicyResolved: false as const,
    crossCandidateSynthesisAuthorized: false as const,
    newNormativeUntouchedSupportPolicyAuthorized: false as const,
    untouchedSupportEffectRuleImplementationAuthorized: false as const,
    universalDefaultActiveRuleAuthorized: false as const,
    universalDefaultPersistedRuleAuthorized: false as const,
    universalDefaultEffectiveSupportRuleAuthorized: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    effectiveSupportToRelativeForceAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_REGISTRATION_CONTRACT' as const,
  };
}

export function buildI86ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReview(
  i85: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventoryReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport {
  const common = commonMaterial(i85);
  if (!i85Accepted(i85)) {
    return finalized({
      ...common,
      status: 'I85_UNRESOLVED_OR_INVALID',
      existingCanonicalInventoryExhaustedForCurrentScope: false,
      additionalAuthorityAcquisitionNeeded: false,
      externalAuthorityDiscoveryResearchAuthorized: false,
      sourceProvenanceNormalizationAuthorized: false,
      sourceRegistrationResearchAuthorized: false,
      registeredCandidateI84RequirementEvaluationAuthorized: false,
      methodologyOrRulePromotionReviewRequiredAfterCandidateEvaluation: true,
      acquisitionStages: [],
      notes: [
        'Resolved fail-closed I85 candidate inventory is required before additional authority acquisition readiness can be opened.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS',
    existingCanonicalInventoryExhaustedForCurrentScope: true,
    additionalAuthorityAcquisitionNeeded: true,
    externalAuthorityDiscoveryResearchAuthorized: true,
    sourceProvenanceNormalizationAuthorized: true,
    sourceRegistrationResearchAuthorized: true,
    registeredCandidateI84RequirementEvaluationAuthorized: true,
    methodologyOrRulePromotionReviewRequiredAfterCandidateEvaluation: true,
    acquisitionStages: ACQUISITION_STAGES,
    notes: [
      'I86 authorizes only research discovery, provenance normalization, SourceReference registration, and later I84 requirement evaluation for new candidates; it does not acquire a source in this gate.',
      'The existing repository already separates SourceReference metadata from MethodologyDefinition/RuleDefinition and content-addresses registered sources in a RuleRegistrySnapshot.',
      'The registry fails closed when methodologies or rules reference missing sourceIds, so an unregistered discovery result cannot become linked methodology/rule authority.',
      'ReviewAttestation binds methodology or rule content rather than SourceReference directly; source registration therefore does not imply reviewed methodology/rule authority.',
      'Web/search retrieval, snippets, secondary summaries, model synthesis, relevance, and unregistered quotations remain discovery material only.',
      'Any future candidate must be registered with stable provenance before being evaluated against all six frozen I84 requirements, and I84 coverage still does not authorize direct rule implementation or production promotion.',
      'Candidate-set composition, effective support, relative force, settlement, precedence, mechanism force, scoring, and strong/weak classification remain unresolved or unauthorized.',
    ],
  });
}
