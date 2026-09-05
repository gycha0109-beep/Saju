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
    recordId: 'CLARIFY_2026_ROLE_NEUTRAL_SPOUSE_STAR_EDITORIAL_CONTRACT_CANDIDATE',
    sourceId: 'CLARIFY-BZ-SPOUSE-STAR-MARRIAGE-ANALYSIS-2026-07-22',
    title: 'The Spouse Star in Marriage Analysis',
    sourceClass: 'commercial_practitioner_editorial_methodology',
    publisher: 'Clarify',
    licensedContentDate: '2026-07-22',
    replicationVerifiedDate: '2026-08-22',
    accessSurface:
      'https://clarifyhk.com/learn/bazi/relationships-compatibility/the-spouse-star-in-marriage-analysis',
    supportingOverviewSurface: 'https://clarifyhk.com/learn/bazi/life-themes/spouse-star-in-bazi',
    classicalGenderedConventionExplicitlyHistorical: true,
    roleNeutralConventionExplicitlyAllowed: true,
    partnerNeutralLanguageSupported: true,
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
    scholarlyPeerReviewed: false,
    institutionalNormativeStandard: false,
    independentNormativeAuthorityForCurrentSpouseMethod: false,
    qualifiesForAuthorityAdmission: false,
    adequacyClass: 'EXPLICIT_EDITORIAL_CONTRACT_CANDIDATE_PROVENANCE_INSUFFICIENT',
    notes:
      'This source materially improves applicability acquisition because one explicit modern BaZi editorial method permits a role-neutral spouse convention and independently states no partner-gender or sexual-orientation inference. It remains a commercial/practitioner editorial methodology rather than peer-reviewed or institutional normative authority, so its contract cannot be promoted to governed spouse-natal authority.',
  } as const);

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS =
  Object.freeze([
    'ROLE_NEUTRAL_CONTRACT_CANDIDATE_ACCEPTS_ONLY_THE_EXACT_POST_301_WANLI_PRIMARY_TARGET_BOUNDARY',
    'CLARIFY_EDITORIAL_METHOD_EXPLICITLY_ALLOWS_A_ROLE_NEUTRAL_SPOUSE_CONVENTION',
    'CLARIFY_EDITORIAL_METHOD_EXPLICITLY_PROHIBITS_PARTNER_GENDER_AND_SEXUAL_ORIENTATION_INFERENCE',
    'CLARIFY_EDITORIAL_METHOD_SEPARATES_SPOUSE_STAR_SPOUSE_PALACE_AND_REAL_WORLD_PARTNER_EVIDENCE',
    'CLARIFY_EDITORIAL_METHOD_REQUIRES_DECLARED_CONVENTION_AND_WHOLE_CHART_CONTEXT',
    'EXPLICIT_MODERN_EDITORIAL_CONTRACT_CANDIDATE_DOES_NOT_EQUAL_QUALIFYING_NORMATIVE_AUTHORITY',
    'COMMERCIAL_PRACTITIONER_EDITORIAL_PROVENANCE_IS_INSUFFICIENT_FOR_AUTHORITY_ADMISSION',
    'KCI_GENDER_ASYMMETRY_EVIDENCE_AND_CLARIFY_EDITORIAL_CONTRACT_MUST_NOT_BE_STITCHED_TO_SYNTHESIZE_MISSING_AUTHORITY',
    'APPLICABILITY_REMAINS_PARTIAL_EVIDENCE_NOT_ADEQUATE_DESPITE_EXPLICIT_EDITORIAL_CONTRACT_DISCOVERY',
    'WANLI_DIRECT_TARGET_FACSIMILE_REMAINS_UNBOUND_AND_UNINSPECTED',
    'CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_REMAINS_UNCHANGED',
    'CURRENT_RELATIONSHIP_T6_DIRECT_INPUT_PATH_REMAINS_ABSENT',
    'HISTORICAL_GENDER_ROLE_MAPPING_IS_NOT_UNIVERSALIZED',
    'NO_USER_OR_PARTNER_SEX_OR_SEXUAL_ORIENTATION_INFERENCE_IS_AUTHORIZED',
    'ZERO_OF_FIVE_AUTHORITY_GAPS_CLOSED',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
    'NEXT_GATE_REQUIRES_INDEPENDENT_NORMATIVE_PROVENANCE_FOR_THE_EXPLICIT_ROLE_NEUTRAL_CONTRACT_OR_DIRECT_PRIMARY_TARGET_FACSIMILE_PROGRESS',
  ] as const);

export interface RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE'
    | 'UPSTREAM_WANLI_PRIMARY_TARGET_BOUNDARY_INVALID';
  decision:
    | 'EXPLICIT_ROLE_NEUTRAL_AND_NO_IDENTITY_INFERENCE_EDITORIAL_CONTRACT_CANDIDATE_ACQUIRED_BUT_PROVENANCE_INSUFFICIENT_ZERO_GAP_CLOSURE'
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
  explicitModernEditorialRoleNeutralSpouseConventionCandidateLocated: boolean;
  explicitModernEditorialPartnerNeutralLanguageCandidateLocated: boolean;
  explicitModernEditorialNoPartnerGenderInferenceCandidateLocated: boolean;
  explicitModernEditorialNoSexualOrientationInferenceCandidateLocated: boolean;
  explicitModernEditorialSpouseStarPalaceSeparationCandidateLocated: boolean;
  explicitModernEditorialWholeChartContextCandidateLocated: boolean;
  editorialContractCandidateIsCommercialPractitionerMethodology: boolean;
  editorialContractCandidatePeerReviewed: false;
  editorialContractCandidateInstitutionalNormativeStandard: false;
  editorialContractCandidateIndependentNormativeAuthority: false;
  editorialContractCandidateAdequateForAuthorityAdmission: false;
  modernApplicabilityContractTextFoundButGovernedAuthorityNotEstablished: boolean;
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
    explicitModernEditorialContractCandidatesRecorded: 1 | 0;
    explicitRoleNeutralConventionCandidatesRecorded: 1 | 0;
    explicitNoSexOrientationInferenceContractCandidatesRecorded: 1 | 0;
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
    | 'ACQUIRE_INDEPENDENT_NORMATIVE_PROVENANCE_FOR_EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_CONTRACT_OR_BIND_DIRECT_WANLI_TARGET_FACSIMILE_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
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
      ? 'EXPLICIT_ROLE_NEUTRAL_AND_NO_IDENTITY_INFERENCE_EDITORIAL_CONTRACT_CANDIDATE_ACQUIRED_BUT_PROVENANCE_INSUFFICIENT_ZERO_GAP_CLOSURE'
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
    explicitModernEditorialRoleNeutralSpouseConventionCandidateLocated: accepted,
    explicitModernEditorialPartnerNeutralLanguageCandidateLocated: accepted,
    explicitModernEditorialNoPartnerGenderInferenceCandidateLocated: accepted,
    explicitModernEditorialNoSexualOrientationInferenceCandidateLocated: accepted,
    explicitModernEditorialSpouseStarPalaceSeparationCandidateLocated: accepted,
    explicitModernEditorialWholeChartContextCandidateLocated: accepted,
    editorialContractCandidateIsCommercialPractitionerMethodology: accepted,
    editorialContractCandidatePeerReviewed: false,
    editorialContractCandidateInstitutionalNormativeStandard: false,
    editorialContractCandidateIndependentNormativeAuthority: false,
    editorialContractCandidateAdequateForAuthorityAdmission: false,
    modernApplicabilityContractTextFoundButGovernedAuthorityNotEstablished: accepted,
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
      explicitModernEditorialContractCandidatesRecorded: accepted ? 1 : 0,
      explicitRoleNeutralConventionCandidatesRecorded: accepted ? 1 : 0,
      explicitNoSexOrientationInferenceContractCandidatesRecorded: accepted ? 1 : 0,
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
      ? 'ACQUIRE_INDEPENDENT_NORMATIVE_PROVENANCE_FOR_EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_CONTRACT_OR_BIND_DIRECT_WANLI_TARGET_FACSIMILE_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
      : 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_SAMYEONG_WANLI_PRIMARY_TARGET_EVIDENCE',
  });
}
