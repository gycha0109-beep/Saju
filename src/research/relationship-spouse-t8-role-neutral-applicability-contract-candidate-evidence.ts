import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS,
  RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE_VERSION,
  type RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport,
} from './relationship-spouse-t8-samyeong-wanli-primary-target-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD =
  Object.freeze({
    recordId: 'CLARIFY_2026_PARTNER_NEUTRAL_NO_IDENTITY_INFERENCE_EDITORIAL_BOUNDARY_CANDIDATE',
    sourceId: 'CLARIFY-BZ-SPOUSE-STAR-MARRIAGE-ANALYSIS-2026-07-22',
    title: 'The Spouse Star in Marriage Analysis',
    sourceClass: 'commercial_practitioner_editorial_methodology',
    publisher: 'Clarify',
    licensedContentDate: '2026-07-22',
    replicationVerifiedDate: '2026-08-22',
    accessSurface:
      'https://clarifyhk.com/learn/bazi/relationships-compatibility/the-spouse-star-in-marriage-analysis',
    supportingNatalOverviewSurface: 'https://clarifyhk.com/learn/bazi/life-themes/spouse-star-in-bazi',
    classicalGenderedConventionExplicitlyHistorical: true,
    historicalGenderedConventionExplicitlyNotUniversal: true,
    partnerNeutralLanguageSupported: true,
    explicitRoleNeutralSpouseNatalConventionEstablished: false,
    spouseStarSeparatedFromSpousePalace: true,
    spouseStarSeparatedFromDirectRealWorldPartnerEvidence: true,
    requiresDeclaredConvention: true,
    requiresWholeChartContext: true,
    requiredContextDimensions: Object.freeze([
      'visibility',
      'hidden_stems',
      'roots',
      'season',
      'combinations',
      'clashes',
      'support',
      'control',
      'timing',
    ]),
    explicitlyProhibitsPartnerGenderInference: true,
    explicitlyProhibitsSexualOrientationInference: true,
    explicitlyProhibitsPartnerIdentityInference: true,
    explicitlyProhibitsPartnerPersonalityInference: true,
    explicitlyProhibitsFidelityInference: true,
    explicitlyProhibitsRelationshipStatusInference: true,
    explicitlyProhibitsAutomaticMarriageOutcomeInference: true,
    compatibilityScopedRoleNeutralConventionReusedForNatalAuthority: false,
    scholarlyPeerReviewed: false,
    institutionalNormativeStandard: false,
    independentNormativeAuthorityForCurrentSpouseMethod: false,
    qualifiesForAuthorityAdmission: false,
    adequacyClass: 'EXPLICIT_EDITORIAL_NO_IDENTITY_INFERENCE_BOUNDARY_PARTIAL_CONTRACT_PROVENANCE_INSUFFICIENT',
    notes:
      'The spouse-star marriage/natal editorial surfaces materially improve applicability acquisition by treating the classical gendered table as historical/non-universal, supporting partner-neutral language, separating spouse star from spouse palace and real-world evidence, and explicitly prohibiting partner-gender or sexual-orientation inference. They do not themselves publish an explicit alternative role-neutral spouse-natal star mapping. A more explicit role-neutral convention appears on a compatibility-scoped page and is deliberately not reused here because compatibility authority cannot be stitched into natal authority. The source is also commercial/practitioner editorial methodology rather than peer-reviewed or institutional normative authority.',
  } as const);

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS =
  Object.freeze([
    'MODERN_APPLICABILITY_BOUNDARY_CANDIDATE_ACCEPTS_ONLY_THE_EXACT_POST_301_WANLI_PRIMARY_TARGET_BOUNDARY',
    'CLARIFY_NATAL_MARRIAGE_EDITORIAL_METHOD_TREATS_THE_CLASSICAL_GENDERED_CONVENTION_AS_HISTORICAL_AND_NON_UNIVERSAL',
    'CLARIFY_NATAL_MARRIAGE_EDITORIAL_METHOD_SUPPORTS_PARTNER_NEUTRAL_LANGUAGE',
    'CLARIFY_NATAL_MARRIAGE_EDITORIAL_METHOD_EXPLICITLY_PROHIBITS_PARTNER_GENDER_AND_SEXUAL_ORIENTATION_INFERENCE',
    'CLARIFY_NATAL_MARRIAGE_EDITORIAL_METHOD_SEPARATES_SPOUSE_STAR_SPOUSE_PALACE_AND_REAL_WORLD_PARTNER_EVIDENCE',
    'CLARIFY_NATAL_MARRIAGE_EDITORIAL_METHOD_REQUIRES_DECLARED_CONVENTION_AND_WHOLE_CHART_CONTEXT',
    'EXPLICIT_ALTERNATIVE_ROLE_NEUTRAL_SPOUSE_NATAL_STAR_MAPPING_REMAINS_NOT_ESTABLISHED',
    'COMPATIBILITY_SCOPED_ROLE_NEUTRAL_CONVENTION_IS_NOT_REUSED_AS_NATAL_AUTHORITY',
    'COMMERCIAL_PRACTITIONER_EDITORIAL_PROVENANCE_IS_INSUFFICIENT_FOR_AUTHORITY_ADMISSION',
    'KCI_GENDER_ASYMMETRY_EVIDENCE_AND_EDITORIAL_BOUNDARY_MUST_NOT_BE_STITCHED_TO_SYNTHESIZE_MISSING_AUTHORITY',
    'APPLICABILITY_REMAINS_PARTIAL_EVIDENCE_NOT_ADEQUATE',
    'WANLI_DIRECT_TARGET_FACSIMILE_REMAINS_UNBOUND_AND_UNINSPECTED',
    'CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_REMAINS_UNCHANGED',
    'CURRENT_RELATIONSHIP_T6_DIRECT_INPUT_PATH_REMAINS_ABSENT',
    'NO_USER_OR_PARTNER_SEX_OR_SEXUAL_ORIENTATION_INFERENCE_IS_AUTHORIZED',
    'ZERO_OF_FIVE_AUTHORITY_GAPS_CLOSED',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  ] as const);

export interface RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE'
    | 'UPSTREAM_WANLI_PRIMARY_TARGET_BOUNDARY_INVALID';
  decision:
    | 'EXPLICIT_NO_IDENTITY_INFERENCE_AND_PARTNER_NEUTRAL_EDITORIAL_BOUNDARY_ACQUIRED_BUT_ROLE_NEUTRAL_NATAL_CONVENTION_AND_NORMATIVE_PROVENANCE_REMAIN_UNRESOLVED_ZERO_GAP_CLOSURE'
    | 'ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_NOT_ESTABLISHED';
  upstreamWanliPrimaryTargetEvidenceId: string;
  exactUpstreamWanliPrimaryTargetBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidateRecord:
    | typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD
    | null;
  candidateRecordCount: 1 | 0;
  explicitModernEditorialHistoricalGenderConventionNotUniversalCandidateLocated: boolean;
  explicitModernEditorialPartnerNeutralLanguageCandidateLocated: boolean;
  explicitModernEditorialNoPartnerGenderInferenceCandidateLocated: boolean;
  explicitModernEditorialNoSexualOrientationInferenceCandidateLocated: boolean;
  explicitModernEditorialSpouseStarPalaceSeparationCandidateLocated: boolean;
  explicitModernEditorialWholeChartContextCandidateLocated: boolean;
  explicitRoleNeutralSpouseNatalConventionCandidateLocated: false;
  compatibilityScopedRoleNeutralConventionReusedForNatalAuthority: false;
  editorialBoundaryCandidateIsCommercialPractitionerMethodology: boolean;
  editorialBoundaryCandidatePeerReviewed: false;
  editorialBoundaryCandidateInstitutionalNormativeStandard: false;
  editorialBoundaryCandidateIndependentNormativeAuthority: false;
  editorialBoundaryCandidateAdequateForAuthorityAdmission: false;
  modernNoIdentityInferenceBoundaryTextFoundButCompleteGovernedApplicabilityContractNotEstablished: boolean;
  applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE';
  applicabilityGapClosedByThisEvidence: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  qualifyingPrimaryWitnessEstablished: false;
  nlcWanliVolume14TargetChapterPageBindingEstablished: false;
  nlcWanliVolume14DirectTargetPageImageInspected: false;
  explicitGenderNeutralSpouseNatalApplicabilityEstablished: false;
  explicitNoUserOrPartnerSexInferenceEstablished: false;
  explicitNoPartnerSexualOrientationInferenceEstablished: false;
  exactCurrentClaimClassCompositionAuthorityEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  historicalGenderRoleUniversalizationAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerSexualOrientationInferenceAuthorized: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  qualifyingAuthorityCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapsClosedCount: 0;
  allFiveAuthorityGapsRemainOpen: true;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS)[number][];
  controlCount: 17 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    explicitModernEditorialBoundaryCandidatesRecorded: 1 | 0;
    explicitPartnerNeutralLanguageCandidatesRecorded: 1 | 0;
    explicitNoSexOrientationInferenceBoundaryCandidatesRecorded: 1 | 0;
    explicitRoleNeutralSpouseNatalConventionCandidatesRecorded: 0;
    compatibilityAuthorityReusedForNatal: 0;
    independentNormativeAuthoritiesEstablished: 0;
    directPrimaryTargetImagesNewlyInspected: 0;
    authorityRequirementsSatisfied: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'ACQUIRE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_CONVENTION_WITH_INDEPENDENT_NORMATIVE_PROVENANCE_OR_BIND_DIRECT_WANLI_TARGET_FACSIMILE_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
    | 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE';
}

function contentAddressedWanliIdentityValid(
  evidence: RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_samyeong_wanli_primary_target_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactUpstreamWanliBoundaryAccepted(
  evidence: RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport,
): boolean {
  return (
    contentAddressedWanliIdentityValid(evidence) &&
    evidence.evidenceVersion === RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE_VERSION &&
    evidence.status === 'RESOLVED_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE' &&
    evidence.decision ===
      'MING_WANLI_VOLUME_SEVEN_PRIMARY_CONTAINER_SPLIT_ACQUIRED_TARGET_PAGE_NOT_BOUND_OR_VISUALLY_INSPECTED_ZERO_GAP_CLOSURE' &&
    evidence.exactUpstreamSourceAccessApplicabilityBoundaryAccepted &&
    evidence.primaryContainerRecordCount === 2 &&
    deterministicContentHash(evidence.primaryContainerRecords) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_CONTAINER_RECORDS) &&
    evidence.wanliEditionEstablished &&
    evidence.wanliVolumeSevenUpperContainerEstablished &&
    evidence.wanliVolumeSevenLowerContainerEstablished &&
    evidence.wanliVolumeSevenBibliographicSplitEstablished &&
    evidence.wanliVolume14PrimaryTargetContainerCandidateEstablished &&
    evidence.targetChapter === '妻妾引例章' &&
    evidence.targetChapterInVolumeSevenTextuallyEstablished &&
    evidence.targetChapterImmediatelyPrecedesZiXiChapterTextuallyEstablished &&
    evidence.targetTextMultiFactorMethodReconfirmed &&
    evidence.nlcWanliVolume14TargetChapterPageBindingEstablished === false &&
    evidence.nlcWanliVolume14ExactTargetPdfPageNumberEstablished === false &&
    evidence.nlcWanliVolume14DirectTargetPageImageInspected === false &&
    evidence.qualifyingPrimaryWitnessEstablished === false &&
    evidence.primaryEditionContainerProvenanceProgressRecognized &&
    evidence.primaryEditionContainerIsStrongerThan1926WholeBookContainerForTargeting &&
    evidence.primaryProvenanceProgressAdequateForAuthorityAdmission === false &&
    evidence.normativeProvenanceRequirementClosedByThisEvidence === false &&
    evidence.applicabilityGapStatus === 'PARTIAL_EVIDENCE_NOT_ADEQUATE' &&
    evidence.explicitGenderNeutralSpouseNatalApplicabilityEstablished === false &&
    evidence.explicitNoUserOrPartnerSexInferenceEstablished === false &&
    evidence.explicitNoPartnerSexualOrientationInferenceEstablished === false &&
    evidence.exactCurrentClaimClassCompositionAuthorityEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.crossSourceStitchingAuthorized === false &&
    evidence.crossTaskStitchingAuthorized === false &&
    evidence.qualifyingAuthorityCandidateCount === 0 &&
    evidence.authorityAcceptedCandidateCount === 0 &&
    evidence.authorityGapsClosedCount === 0 &&
    evidence.allFiveAuthorityGapsRemainOpen &&
    evidence.authorityAdmissionReady === false &&
    evidence.semanticProducerImplementationAuthorized === false &&
    evidence.controlCount === 16 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_CONTROL_IDS) &&
    evidence.recommendedNextAction ===
      'BIND_AND_VISUALLY_INSPECT_NLC_WANLI_VOLUME14_WIFE_CONCUBINE_EXAMPLE_TARGET_PAGE_BEFORE_ANY_PRIMARY_WITNESS_OR_AUTHORITY_REASSESSMENT'
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
    'evidenceId'
  >,
): RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_role_neutral_applicability_contract_candidate_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidence(
  upstream: RelationshipSpouseT8SamyeongWanliPrimaryTargetEvidenceReport,
): RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport {
  const accepted = exactUpstreamWanliBoundaryAccepted(upstream);

  return finalized({
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE'
      : 'UPSTREAM_WANLI_PRIMARY_TARGET_BOUNDARY_INVALID',
    decision: accepted
      ? 'EXPLICIT_NO_IDENTITY_INFERENCE_AND_PARTNER_NEUTRAL_EDITORIAL_BOUNDARY_ACQUIRED_BUT_ROLE_NEUTRAL_NATAL_CONVENTION_AND_NORMATIVE_PROVENANCE_REMAIN_UNRESOLVED_ZERO_GAP_CLOSURE'
      : 'ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_NOT_ESTABLISHED',
    upstreamWanliPrimaryTargetEvidenceId: upstream.evidenceId,
    exactUpstreamWanliPrimaryTargetBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    candidateRecord: accepted
      ? RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD
      : null,
    candidateRecordCount: accepted ? 1 : 0,
    explicitModernEditorialHistoricalGenderConventionNotUniversalCandidateLocated: accepted,
    explicitModernEditorialPartnerNeutralLanguageCandidateLocated: accepted,
    explicitModernEditorialNoPartnerGenderInferenceCandidateLocated: accepted,
    explicitModernEditorialNoSexualOrientationInferenceCandidateLocated: accepted,
    explicitModernEditorialSpouseStarPalaceSeparationCandidateLocated: accepted,
    explicitModernEditorialWholeChartContextCandidateLocated: accepted,
    explicitRoleNeutralSpouseNatalConventionCandidateLocated: false,
    compatibilityScopedRoleNeutralConventionReusedForNatalAuthority: false,
    editorialBoundaryCandidateIsCommercialPractitionerMethodology: accepted,
    editorialBoundaryCandidatePeerReviewed: false,
    editorialBoundaryCandidateInstitutionalNormativeStandard: false,
    editorialBoundaryCandidateIndependentNormativeAuthority: false,
    editorialBoundaryCandidateAdequateForAuthorityAdmission: false,
    modernNoIdentityInferenceBoundaryTextFoundButCompleteGovernedApplicabilityContractNotEstablished:
      accepted,
    applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
    applicabilityGapClosedByThisEvidence: false,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false,
    qualifyingPrimaryWitnessEstablished: false,
    nlcWanliVolume14TargetChapterPageBindingEstablished: false,
    nlcWanliVolume14DirectTargetPageImageInspected: false,
    explicitGenderNeutralSpouseNatalApplicabilityEstablished: false,
    explicitNoUserOrPartnerSexInferenceEstablished: false,
    explicitNoPartnerSexualOrientationInferenceEstablished: false,
    exactCurrentClaimClassCompositionAuthorityEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    historicalGenderRoleUniversalizationAuthorized: false,
    userOrPartnerSexInferenceAuthorized: false,
    partnerSexualOrientationInferenceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    qualifyingAuthorityCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapsClosedCount: 0,
    allFiveAuthorityGapsRemainOpen: true,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 17 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      explicitModernEditorialBoundaryCandidatesRecorded: accepted ? 1 : 0,
      explicitPartnerNeutralLanguageCandidatesRecorded: accepted ? 1 : 0,
      explicitNoSexOrientationInferenceBoundaryCandidatesRecorded: accepted ? 1 : 0,
      explicitRoleNeutralSpouseNatalConventionCandidatesRecorded: 0,
      compatibilityAuthorityReusedForNatal: 0,
      independentNormativeAuthoritiesEstablished: 0,
      directPrimaryTargetImagesNewlyInspected: 0,
      authorityRequirementsSatisfied: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextAction: accepted
      ? 'ACQUIRE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_CONVENTION_WITH_INDEPENDENT_NORMATIVE_PROVENANCE_OR_BIND_DIRECT_WANLI_TARGET_FACSIMILE_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
      : 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE',
  });
}
