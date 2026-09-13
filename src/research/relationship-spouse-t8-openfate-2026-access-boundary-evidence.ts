import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence } from './relationship-spouse-t8-lee-ockhwa-2024-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-openfate-2026-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'OPENFATE_2026_ROLE_NEUTRAL_SPOUSE_METHODOLOGY_ACCESS_BOUNDARY',
  sourceFamily: 'OpenFate Wiki',
  methodologyDomain: 'Bazi / Four Pillars',
  publicationYear: 2026,
  sourceClass: 'current_public_editorial_methodology_reference',
  frontierIssue: 532,
  reviewDateRangeObserved: '2026-07-17 through 2026-07-22',
  publicIdentitySurfaces: Object.freeze({
    modernFamilyRoles:
      'https://wiki.openfate.ai/ko/bazi/life-themes/applying-family-role-mappings-to-modern-families',
    spouseStarMatching:
      'https://wiki.openfate.ai/ko/bazi/relationships-compatibility/spouse-star-matching-in-bazi-compatibility',
    spousePalace:
      'https://wiki.openfate.ai/ko/bazi/relationships-compatibility/spouse-palace-in-bazi',
    sixFamilyRoles:
      'https://wiki.openfate.ai/ko/bazi/life-themes/what-are-the-six-family-roles-in-bazi',
    sixRelativeStarsAndPalaces:
      'https://wiki.openfate.ai/ko/bazi/four-pillars/six-relative-stars-and-palaces',
  }),
  indexedDiscoveryEvidence: Object.freeze({
    exactPageIdentityObserved: true as const,
    substantialIndexedBodySectionsObserved: true as const,
    traditionalFamilyRoleTablesDescribedAsInterpretiveMappings: true as const,
    actualFamilyRolesUserDefinedSignalObserved: true as const,
    sameSexPartnerAndChosenFamilyExamplesObserved: true as const,
    sexInferenceProhibitedSignalObserved: true as const,
    sexualOrientationInferenceProhibitedSignalObserved: true as const,
    spouseStarAndSpousePalaceKeptAsDistinctEvidenceLayers: true as const,
    rolePolicyDeclarationBeforeSpouseStarInterpretationObserved: true as const,
    roleNeutralPolicyMayBeSelectedSignalObserved: true as const,
    dayBranchSpousePalaceSignalObserved: true as const,
    spouseStarPageIsCompatibilityContext: true as const,
    completeRoleNeutralNatalSelectorFormulaObservedInIndexedExcerpts: false as const,
    absenceOfSelectorFromCompleteBodyInferredFromIndexedExcerpts: false as const,
    indexedExcerptsTreatedAsCompleteDirectBody: false as const,
  }),
  currentAccessBoundary: Object.freeze({
    publicSearchIndexRecoveredTargetSpecificContent: true as const,
    directPageFetchAttempted: true as const,
    directPageFetchDisposition: 'CACHE_MISS' as const,
    completeDirectHtmlBodyAcquired: false as const,
    fullPageDirectTraversalPerformed: false as const,
    completePdfAcquired: false as const,
    renderedPageCount: 0 as const,
  }),
  guessedOpaqueIdentifierCount: 0 as const,
  loginBypass: false as const,
  sessionBypass: false as const,
  institutionAuthBypass: false as const,
  paywallBypass: false as const,
  drmRequestExecuted: false as const,
  decryptionActionExecuted: false as const,
  tlsVerificationDisabled: false as const,
  crossSourceSemanticStitching: false as const,
  directBodySemanticReviewPerformed: false as const,
  bodyLevelAdmissionDecisionMade: false as const,
  semanticDisposition: 'PUBLIC_INDEXED_BODY_PARTIAL_NO_FULL_BODY_ADMISSION_DECISION' as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'OpenFate 2026 exposes target-specific indexed body sections for modern family-role mappings, spouse-star matching, spouse-palace handling, and identity/non-inference boundaries. The indexed material explicitly signals user-defined modern family roles, same-sex partner support, prohibition on sex/orientation inference, a selectable role-neutral policy, and Day-Branch spouse-palace usage. However direct retrieval of the decisive pages through the available browser surface returned cache-miss failures, so the complete page bodies were not directly traversed. The indexed excerpts are therefore discovery evidence only. They neither establish nor reject a complete single-native, natal-facts-only, native-sex-independent and partner-sex-independent spouse selector.',
  selectorBoundary:
    'A selectable role-neutral policy is not itself an executable natal selector unless the same source defines how natal facts determine the spouse-role mapping without surviving sex-conditioned branching or external role assignment. Day Branch as spouse palace is only a sex-common positional layer. Because the complete body was not directly traversed, this evidence does not infer that OpenFate lacks such a selector elsewhere in the same source family.',
  noStitchingBoundary:
    'OpenFate indexed methodology signals are not combined with Kweon Sujeong 2021, Hong Yooseon 2022, Kim Sanghan 2026, Lee Ockhwa 2024, Yoon Sangheum 2023, Jeon Jeonghun, Kim Mantae, Nam/Kim 2018, or any other source to manufacture or reject the missing complete role-neutral spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'OPENFATE_2026_SOURCE_FAMILY_AND_TARGET_PAGES_ARE_PINNED',
  'OPENFATE_REVIEW_DATE_RANGE_AND_CURRENT_METHODOLOGY_CLASS_ARE_PINNED',
  'INDEXED_MODERN_FAMILY_ROLE_BODY_SECTIONS_ARE_DISCOVERY_EVIDENCE_ONLY',
  'USER_DEFINED_ACTUAL_FAMILY_ROLE_SIGNAL_IS_PRESERVED',
  'SAME_SEX_PARTNER_AND_CHOSEN_FAMILY_SIGNALS_ARE_PRESERVED',
  'SEX_AND_SEXUAL_ORIENTATION_NON_INFERENCE_SIGNALS_ARE_PRESERVED',
  'SPOUSE_STAR_AND_SPOUSE_PALACE_LAYERS_REMAIN_DISTINCT',
  'ROLE_POLICY_DECLARATION_SIGNAL_IS_PRESERVED',
  'ROLE_NEUTRAL_POLICY_MAY_BE_SELECTED_SIGNAL_IS_NOT_PROMOTED_TO_EXECUTABLE_SELECTOR',
  'DAY_BRANCH_SPOUSE_PALACE_SIGNAL_IS_POSITIONAL_LAYER_ONLY',
  'COMPATIBILITY_CONTEXT_IS_NOT_RELABELED_AS_SINGLE_NATIVE_NATAL_SELECTOR',
  'NO_SELECTOR_ABSENCE_IS_INFERRED_FROM_PARTIAL_INDEXED_EXCERPTS',
  'DIRECT_PAGE_CACHE_MISS_BOUNDARY_IS_PRESERVED',
  'NO_COMPLETE_DIRECT_HTML_BODY_OR_RENDERED_BODY_IS_CLAIMED',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_MADE',
  'NO_LOGIN_SESSION_INSTITUTION_PAYWALL_DRM_TLS_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_OPAQUE_IDENTIFIER_GUESSING_IS_PERFORMED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_OR_REJECT_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8OpenFate2026AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_INDEXED_BODY_PARTIAL_NO_FULL_BODY_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  targetSpecificIndexedBodyEvidenceInspected: true;
  completeDirectHtmlBodyInspected: false;
  fullPageDirectTraversalPerformed: false;
  directBodySemanticReviewPerformed: false;
  bodyLevelAdmissionDecisionMade: false;
  explicitRoleNeutralNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 2 | 0;
  authorityGapsOpenCount: 3 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'RECOVER_DIRECT_COMPLETE_OPENFATE_BODY_OR_CONTINUE_SINGLE_SOURCE_PUBLIC_DIRECT_BODY_DISCOVERY'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION' &&
    upstream.exactUpstreamTwoOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === false &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.spouseT8ProducerReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8OpenFate2026AccessBoundaryEvidence(): RelationshipSpouseT8OpenFate2026AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeOckhwa2024AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_INDEXED_BODY_PARTIAL_NO_FULL_BODY_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    targetSpecificIndexedBodyEvidenceInspected: true as const,
    completeDirectHtmlBodyInspected: false as const,
    fullPageDirectTraversalPerformed: false as const,
    directBodySemanticReviewPerformed: false as const,
    bodyLevelAdmissionDecisionMade: false as const,
    explicitRoleNeutralNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? (2 as const) : (0 as const),
    authorityGapsOpenCount: accepted ? (3 as const) : (5 as const),
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_OPENFATE_2026_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('RECOVER_DIRECT_COMPLETE_OPENFATE_BODY_OR_CONTINUE_SINGLE_SOURCE_PUBLIC_DIRECT_BODY_DISCOVERY' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_openfate_2026_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
