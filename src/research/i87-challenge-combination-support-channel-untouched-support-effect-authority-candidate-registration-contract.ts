import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { SourceReference } from '../contracts/interpretation.js';
import type { I84UntouchedSupportAuthorityRequirementId } from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport } from './i86-challenge-combination-support-channel-untouched-support-effect-additional-authority-acquisition-readiness-review.js';

export const I87_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_REGISTRATION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-authority-candidate-registration-contract-v1';

export type I87CandidateEvidenceRepresentation =
  | 'BOUNDED_VERBATIM_WITH_EXACT_LOCATOR'
  | 'FAITHFUL_PARAPHRASE_WITH_EXACT_LOCATOR';

export type I87CandidateTranslationStatus =
  | 'ORIGINAL_LANGUAGE_ONLY'
  | 'TRANSLATION_WITH_ORIGINAL_LOCATOR'
  | 'NOT_APPLICABLE';

export type I87RequirementCoverageState = 'NOT_EVALUATED';

export interface I87CandidateRequirementRegistrationSlot {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  coverageState: I87RequirementCoverageState;
  evidenceMayBeInferredFromRelevance: false;
  evidenceMayBeInferredFromSourceType: false;
  evidenceMayBeInferredFromProvenanceTier: false;
  evidenceMayBeInferredFromNoContestLanguage: false;
  evidenceMayBeInferredFromSupportLanguage: false;
}

export interface I87UntouchedSupportAuthorityCandidateRegistrationDraft {
  candidateRegistrationId: string;
  sourceReference: SourceReference;
  evidenceRepresentation: I87CandidateEvidenceRepresentation;
  evidenceTextOrParaphrase: string;
  exactLocatorStatement: string;
  sourceLanguageStatement: string;
  translationStatus: I87CandidateTranslationStatus;
  scopeStatement: string;
  applicabilityStatement: string;
  exceptionStatement: string;
  provenanceStatement: string;
  discoveryTraceStatement: string;
  requirementSlots: readonly I87CandidateRequirementRegistrationSlot[];
  registrationStatus: 'RESEARCH_CANDIDATE_ONLY';
  methodologyOrRuleApproval: 'NOT_GRANTED';
  executableAuthorityStatus: 'NOT_AUTHORIZED';
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport {
  reviewId: string;
  reviewVersion: string;
  status: 'RESOLVED_CANDIDATE_REGISTRATION_CONTRACT' | 'I86_UNRESOLVED_OR_INVALID';
  decision: 'CANDIDATE_REGISTRATION_CONTRACT_FROZEN_NO_SOURCE_REGISTERED_OR_APPROVED';
  upstreamI86ReviewId: string;
  registrationContractFrozen: boolean;
  sourceReferenceContractReusedWithoutParallelRegistry: true;
  sourceReferenceCoreFieldsRequired: readonly ('sourceId' | 'sourceType' | 'title' | 'provenanceTier')[];
  sourceReferenceDetailFieldsPreservedWhereApplicable: readonly (
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
  evidenceRepresentationRequired: true;
  exactLocatorStatementRequired: true;
  sourceLanguageStatementRequired: true;
  translationStatusRequired: true;
  scopeStatementRequired: true;
  applicabilityStatementRequired: true;
  exceptionStatementRequired: true;
  provenanceStatementRequired: true;
  discoveryTraceStatementRequired: true;
  allSixI84RequirementSlotsRequired: true;
  requirementSlotsInitializedAsNotEvaluated: true;
  candidateRegistrationIdMustBeContentAddressed: true;
  candidateRegistrationIdMayBeAssignedFromSearchRanking: false;
  missingBibliographicMetadataMayBeFabricated: false;
  missingLocatorMayBeGuessed: false;
  missingScopeMayBeInferredFromTitle: false;
  translationMayReplaceOriginalLocator: false;
  paraphraseWithoutExactLocatorAccepted: false;
  boundedVerbatimWithoutExactLocatorAccepted: false;
  searchSnippetMayPopulateAuthorityEvidenceWithoutSourceVerification: false;
  sourceTypeMayAutoSatisfyRequirement: false;
  primaryProvenanceTierMayAutoSatisfyRequirement: false;
  requirementCoverageMayBePreApprovedAtRegistration: false;
  sourceRegistrationPerformedByThisGate: false;
  externalDiscoveryPerformedByThisGate: false;
  actualCandidateCreatedByThisGate: false;
  methodologyOrRuleApprovalAuthorized: false;
  executableAuthorityAuthorized: false;
  candidateSetCompositionPolicyResolved: false;
  crossCandidateSynthesisAuthorized: false;
  newNormativeUntouchedSupportPolicyAuthorized: false;
  untouchedSupportEffectRuleImplementationAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  registrationTemplate: Omit<
    I87UntouchedSupportAuthorityCandidateRegistrationDraft,
    'candidateRegistrationId' | 'sourceReference' | 'evidenceTextOrParaphrase'
  >;
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_AND_REGISTRATION_EVIDENCE';
  notes: readonly string[];
}

const REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const satisfies readonly I84UntouchedSupportAuthorityRequirementId[]);

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

function requirementSlots(): readonly I87CandidateRequirementRegistrationSlot[] {
  return REQUIREMENT_IDS.map((requirementId) => ({
    requirementId,
    coverageState: 'NOT_EVALUATED',
    evidenceMayBeInferredFromRelevance: false,
    evidenceMayBeInferredFromSourceType: false,
    evidenceMayBeInferredFromProvenanceTier: false,
    evidenceMayBeInferredFromNoContestLanguage: false,
    evidenceMayBeInferredFromSupportLanguage: false,
  }));
}

function registrationTemplate(): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport['registrationTemplate'] {
  return {
    evidenceRepresentation: 'FAITHFUL_PARAPHRASE_WITH_EXACT_LOCATOR',
    exactLocatorStatement: 'REQUIRED_NOT_POPULATED',
    sourceLanguageStatement: 'REQUIRED_NOT_POPULATED',
    translationStatus: 'ORIGINAL_LANGUAGE_ONLY',
    scopeStatement: 'REQUIRED_NOT_POPULATED',
    applicabilityStatement: 'REQUIRED_NOT_POPULATED',
    exceptionStatement: 'REQUIRED_NOT_POPULATED',
    provenanceStatement: 'REQUIRED_NOT_POPULATED',
    discoveryTraceStatement: 'REQUIRED_NOT_POPULATED',
    requirementSlots: requirementSlots(),
    registrationStatus: 'RESEARCH_CANDIDATE_ONLY',
    methodologyOrRuleApproval: 'NOT_GRANTED',
    executableAuthorityStatus: 'NOT_AUTHORIZED',
  };
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_registration_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i86Accepted(
  i86: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport,
): boolean {
  return (
    i86.status === 'RESOLVED_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS' &&
    i86.decision ===
      'ADDITIONAL_AUTHORITY_ACQUISITION_RESEARCH_REGISTRATION_ALLOWED_DIRECT_RULE_PROMOTION_BLOCKED' &&
    i86.existingCanonicalInventoryExhaustedForCurrentScope &&
    i86.additionalAuthorityAcquisitionNeeded &&
    i86.externalAuthorityDiscoveryResearchAuthorized &&
    i86.sourceProvenanceNormalizationAuthorized &&
    i86.sourceRegistrationResearchAuthorized &&
    i86.registeredCandidateI84RequirementEvaluationAuthorized &&
    i86.methodologyOrRulePromotionReviewRequiredAfterCandidateEvaluation &&
    i86.candidateMustHaveStableSourceIdBeforeRequirementEvaluation &&
    i86.candidateMustBeRegisteredBeforeMethodologyOrRuleReference &&
    i86.registeredSourceContentMustBeContentAddressedInRegistrySnapshot &&
    i86.sourceRegistrationAloneMeansMethodologyApproved === false &&
    i86.sourceRegistrationAloneMeansRuleApproved === false &&
    i86.sourceRegistrationAloneMeansExecutableAuthority === false &&
    i86.webSearchResultIsAuthority === false &&
    i86.modelGeneratedSynthesisIsAuthority === false &&
    i86.discoveryMayBypassSourceRegistration === false &&
    i86.discoveryMayBypassI84Evaluation === false &&
    i86.candidateSetCompositionPolicyResolved === false &&
    i86.crossCandidateSynthesisAuthorized === false &&
    i86.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i86.sourceActivationVerdictAuthorized === false &&
    i86.sourcePersistenceVerdictAuthorized === false &&
    i86.sourceEffectiveSupportVerdictAuthorized === false &&
    i86.relativeForceVerdictAuthorized === false &&
    i86.crossRelationPrecedenceAuthorized === false &&
    i86.classificationAuthorized === false &&
    i86.numericScoringAuthorized === false &&
    i86.recommendedNextGate === 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_REGISTRATION_CONTRACT'
  );
}

function commonMaterial(
  i86: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport,
) {
  return {
    reviewVersion:
      I87_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_REGISTRATION_CONTRACT_VERSION,
    decision: 'CANDIDATE_REGISTRATION_CONTRACT_FROZEN_NO_SOURCE_REGISTERED_OR_APPROVED' as const,
    upstreamI86ReviewId: i86.reviewId,
    sourceReferenceContractReusedWithoutParallelRegistry: true as const,
    sourceReferenceCoreFieldsRequired: CORE_FIELDS,
    sourceReferenceDetailFieldsPreservedWhereApplicable: DETAIL_FIELDS,
    evidenceRepresentationRequired: true as const,
    exactLocatorStatementRequired: true as const,
    sourceLanguageStatementRequired: true as const,
    translationStatusRequired: true as const,
    scopeStatementRequired: true as const,
    applicabilityStatementRequired: true as const,
    exceptionStatementRequired: true as const,
    provenanceStatementRequired: true as const,
    discoveryTraceStatementRequired: true as const,
    allSixI84RequirementSlotsRequired: true as const,
    requirementSlotsInitializedAsNotEvaluated: true as const,
    candidateRegistrationIdMustBeContentAddressed: true as const,
    candidateRegistrationIdMayBeAssignedFromSearchRanking: false as const,
    missingBibliographicMetadataMayBeFabricated: false as const,
    missingLocatorMayBeGuessed: false as const,
    missingScopeMayBeInferredFromTitle: false as const,
    translationMayReplaceOriginalLocator: false as const,
    paraphraseWithoutExactLocatorAccepted: false as const,
    boundedVerbatimWithoutExactLocatorAccepted: false as const,
    searchSnippetMayPopulateAuthorityEvidenceWithoutSourceVerification: false as const,
    sourceTypeMayAutoSatisfyRequirement: false as const,
    primaryProvenanceTierMayAutoSatisfyRequirement: false as const,
    requirementCoverageMayBePreApprovedAtRegistration: false as const,
    sourceRegistrationPerformedByThisGate: false as const,
    externalDiscoveryPerformedByThisGate: false as const,
    actualCandidateCreatedByThisGate: false as const,
    methodologyOrRuleApprovalAuthorized: false as const,
    executableAuthorityAuthorized: false as const,
    candidateSetCompositionPolicyResolved: false as const,
    crossCandidateSynthesisAuthorized: false as const,
    newNormativeUntouchedSupportPolicyAuthorized: false as const,
    untouchedSupportEffectRuleImplementationAuthorized: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    registrationTemplate: registrationTemplate(),
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_AND_REGISTRATION_EVIDENCE' as const,
  };
}

export function buildI87ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContract(
  i86: ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityAcquisitionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport {
  const common = commonMaterial(i86);
  if (!i86Accepted(i86)) {
    return finalized({
      ...common,
      status: 'I86_UNRESOLVED_OR_INVALID',
      registrationContractFrozen: false,
      notes: [
        'Resolved fail-closed I86 acquisition readiness is required before the research candidate registration contract can be frozen.',
      ],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_CANDIDATE_REGISTRATION_CONTRACT',
    registrationContractFrozen: true,
    notes: [
      'I87 freezes a research intake contract only; it performs no external discovery and creates no real SourceReference or candidate registration.',
      'The existing SourceReference contract is reused rather than creating a parallel authority registry. Candidate-specific evidence fields add the exact passage locator, representation, language/translation, scope, applicability, exceptions, provenance, and discovery trace required for later I84 evaluation.',
      'Every I84 requirement slot begins NOT_EVALUATED. Registration is provenance normalization, not requirement satisfaction or candidate approval.',
      'A primary classical source, relevant support terminology, stability/no-contest language, or search ranking cannot pre-approve any requirement.',
      'Missing bibliography, locator, scope, and provenance may not be fabricated or guessed. A translation cannot replace the original-source locator.',
      'Candidate registration identifiers must be content-addressed to the normalized registration material in a future evidence adapter, preserving deterministic provenance.',
      'Methodology/rule approval, executable authority, effective support, relative force, settlement, precedence, scoring, and strong/weak classification remain blocked.',
    ],
  });
}
