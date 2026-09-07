import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS } from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence,
  type RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport,
} from './relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_SOURCE_IDS =
  Object.freeze(['LEE_YOUNGEUN_2025_KCI_KYOBO_DIRECT_PDF'] as const);

export const RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_CONTROL_IDS =
  Object.freeze([
    'ADEQUACY_REVIEW_CONSUMES_ONLY_EXACT_CONTENT_ADDRESSED_LEE_YOUNGEUN_2025_DIRECT_BODY_EVIDENCE',
    'ADEQUACY_REVIEW_TARGETS_ONLY_THE_INDEPENDENT_NORMATIVE_PROVENANCE_GAP',
    'LEE_KCI_DOI_KYOBO_PDF_IDENTITY_AND_EXACT_PAGE_LOCATORS_ARE_REPRODUCIBLE',
    'LEE_RELEVANT_PASSAGES_WERE_REVIEWED_IN_DIRECT_PDF_SURROUNDING_CONTEXT',
    'LEE_SOURCE_AUTHORED_MODERN_SPOUSE_REMAPPING_AND_APPLICABILITY_BOUNDARY_ARE_EXPLICIT',
    'LEE_CLASSICAL_OFFICER_CONVENTION_AND_CONTEXT_DEPENDENT_MODERN_EXCEPTIONS_ARE_BOTH_PRESERVED',
    'KCI_LISTING_IS_NOT_RELABELED_AS_AN_INSPECTED_ARTICLE_SPECIFIC_PEER_REVIEW_RECORD',
    'LEE_2025_ALONE_IS_ADEQUATE_INDEPENDENT_NORMATIVE_PROVENANCE_FOR_THE_BOUNDED_MODERN_SPOUSE_REMAPPING_PROPOSAL',
    'NO_JUNG_KWEON_SONG_KIM_OR_COMMERCIAL_SOURCE_IS_CONSUMED_TO_CLOSE_THIS_GAP',
    'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
    'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
    'EXACTLY_TWO_OF_FIVE_POST_PRIMARY_AUTHORITY_GAPS_ARE_CLOSED',
    'AUTHORITY_ADMISSION_REMAINS_NOT_READY_AND_PRODUCTION_REMAINS_HOLD',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  ] as const);

export type RelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAuthorityGapStatus =
  Readonly<{
    QUALIFYING_PRIMARY_WITNESS: 'CLOSED' | 'OPEN';
    INDEPENDENT_NORMATIVE_PROVENANCE: 'CLOSED' | 'OPEN';
    EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN';
    CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN';
    RELATIONSHIP_T6_INPUT: 'OPEN';
  }>;

export interface RelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'RESOLVED_LEE_YOUNGEUN_2025_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW'
    | 'UPSTREAM_LEE_YOUNGEUN_DIRECT_BODY_EVIDENCE_INVALID'
    | 'FROZEN_NORMATIVE_PROVENANCE_REQUIREMENT_INVALID';
  decision:
    | 'LEE_YOUNGEUN_2025_SINGLE_SOURCE_ADEQUATE_FOR_INDEPENDENT_NORMATIVE_PROVENANCE_EXACTLY_TWO_OF_FIVE_GAPS_CLOSED'
    | 'INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_NOT_ESTABLISHED';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  targetFrozenGapId: 'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING';
  targetPostPrimaryGapId: 'INDEPENDENT_NORMATIVE_PROVENANCE';
  exactUpstreamEvidenceAccepted: boolean;
  frozenNormativeProvenanceRequirementAccepted: boolean;
  sourceIdsConsumed: readonly string[];
  sourceCountConsumed: 1 | 0;
  otherSourceSemanticEvidenceConsumed: false;
  crossSourceStitchingAuthorized: false;
  sourceIdentityReproducible: boolean;
  exactLocatorReproducible: boolean;
  directOriginalOrVerifiedContextReviewed: boolean;
  explicitSpouseSemanticBindingPresent: boolean;
  explicitApplicabilityBoundaryPresent: boolean;
  explicitContextAndExceptionTreatmentPresent: boolean;
  sourceAuthoredNormativeModernProposalPresent: boolean;
  kciListedArticle: boolean;
  articleSpecificPeerReviewRecordInspected: false;
  peerReviewStatusInflatedByThisReview: false;
  independentNormativeProvenanceEstablished: boolean;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  explicitRoleNeutralNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  authorityGapStatus: RelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAuthorityGapStatus;
  authorityGapsClosedCount: 2 | 0;
  authorityGapsOpenCount: 3 | 5;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  recommendedNextAction:
    | 'CONTINUE_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_AND_RELATIONSHIP_T6_GAPS_INDEPENDENTLY_WITHOUT_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_EXACT_LEE_DIRECT_BODY_AND_FROZEN_NORMATIVE_PROVENANCE_REQUIREMENT_BOUNDARIES';
}

function contentAddressedLeeEvidenceIdentityValid(
  evidence: RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_lee_youngeun_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactLeeDirectBodyEvidenceAccepted(
  evidence: RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport,
): boolean {
  const candidate = evidence.candidate;
  return (
    contentAddressedLeeEvidenceIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION &&
    evidence.status ===
      'DIRECT_KCI_LISTED_PDF_CONFIRMS_MODERN_SEX_NEUTRAL_EXTENSION_AND_ROLE_BASED_SPOUSE_REMAPPING_BUT_NO_PURE_NATAL_SELECTOR' &&
    deterministicContentHash(candidate) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE) &&
    evidence.directPdfInspected &&
    evidence.pdfScreenshotReviewed &&
    evidence.modernSpouseRemappingProposalConfirmed &&
    evidence.nativeSexNeutralExtensionCandidateConfirmed &&
    evidence.partnerSexIndependentPureNatalSelectorConfirmed === false &&
    evidence.independentNormativeProvenanceCandidateReadyForAdequacyReview &&
    evidence.independentNormativeProvenanceEstablishedByThisEvidence === false &&
    evidence.explicitRoleNeutralNatalMappingEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.qualifyingPrimaryWitnessGapRemainsClosed &&
    evidence.authorityGapsClosedCount === 1 &&
    evidence.authorityGapsOpenCount === 4 &&
    evidence.authorityAdmissionReady === false &&
    evidence.crossSourceStitchingAuthorized === false &&
    evidence.userOrPartnerSexInferenceAuthorized === false &&
    evidence.partnerSexualOrientationInferenceAuthorized === false &&
    evidence.spouseT8ProducerReady === false &&
    evidence.productionPromotionReady === false &&
    evidence.controlCount === 17 &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CONTROL_IDS)
  );
}

function frozenNormativeProvenanceRequirementAccepted(): boolean {
  const requirement = RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.find(
    (item) => item.gapId === 'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
  );
  return Boolean(
    requirement &&
      requirement.mandatory &&
      requirement.exactSourceIdentityRequired &&
      requirement.exactLocatorRequired &&
      requirement.originalOrVerifiedSourceContextRequired &&
      requirement.explicitSpouseSemanticBindingRequired &&
      requirement.explicitApplicabilityBoundaryRequired &&
      requirement.explicitContextOrExceptionTreatmentRequired &&
      requirement.requiredAuthorityAssertions.length === 3 &&
      requirement.mayBeSatisfiedByGeneralKnowledge === false &&
      requirement.mayBeSatisfiedBySearchSnippet === false &&
      requirement.mayBeSatisfiedByModelSynthesis === false &&
      requirement.mayBeSatisfiedByCompatibilityAuthority === false,
  );
}

function leeSingleSourceNormativeProvenanceAdequate(
  evidence: RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport,
): boolean {
  const candidate = evidence.candidate;
  const inspectedPages = candidate.printedToPhysicalPageMap.map((item) => item.printedPage);
  return (
    candidate.candidateId === 'LEE_YOUNGEUN_2025_KCI_KYOBO_DIRECT_PDF' &&
    candidate.kciArticleId === 'ART003175186' &&
    candidate.doi === '10.55793/jkhc.2025.24.305' &&
    candidate.kyoboArticleId === '4010070551816' &&
    candidate.pdfSha256 ===
      '06114b29775f024520ae5683cc359a97d54bf2d6b2e0d5feb8557586d0768e61' &&
    candidate.directPublicPdfObjectInspected &&
    candidate.pdfScreenshotReviewed &&
    inspectedPages.includes(326) &&
    inspectedPages.includes(332) &&
    inspectedPages.includes(333) &&
    candidate.exactModernSpouseSemanticAssertionFound &&
    candidate.husbandNeedNotBeLimitedToOfficerExplicit &&
    candidate.otherTenGodsMayRepresentSpouseExplicit &&
    candidate.peerMayRepresentEqualPartnerExplicit &&
    candidate.sourceSaysSameLogicMayApplyToMaleChartsExplicit &&
    candidate.modernApplicabilityBoundaryExplicit &&
    candidate.modernApplicabilityDependsOnRelationshipRoleExplicit &&
    candidate.modernApplicabilityDependsOnHouseholdEconomicRoleExplicit &&
    candidate.modernApplicabilityDependsOnSubjectIntentExplicit &&
    candidate.sourceTreatsSpouseInterpretationAsChangingWithSocialContextExplicit &&
    candidate.classicalHusbandOfficerConventionStillOperativeInSomeCasesExplicit &&
    candidate.kciListedArticle &&
    candidate.individualPeerReviewRecordInspected === false &&
    candidate.independentNormativeProvenanceCandidateQualifiedForAdequacyReview &&
    candidate.independentNormativeProvenanceGapClosedByThisEvidence === false
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReviewReport,
    'reviewId'
  >,
): RelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReviewReport {
  return {
    reviewId: `relationship_spouse_t8_lee_youngeun_normative_provenance_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview(
  evidence: RelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidenceReport =
    buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence(),
): RelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReviewReport {
  const upstreamAccepted = exactLeeDirectBodyEvidenceAccepted(evidence);
  const requirementAccepted = frozenNormativeProvenanceRequirementAccepted();
  const sourceAdequate = upstreamAccepted && requirementAccepted && leeSingleSourceNormativeProvenanceAdequate(evidence);
  const sourceIdsConsumed = sourceAdequate
    ? RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_SOURCE_IDS
    : Object.freeze([]);

  const authorityGapStatus: RelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAuthorityGapStatus =
    sourceAdequate
      ? Object.freeze({
          QUALIFYING_PRIMARY_WITNESS: 'CLOSED' as const,
          INDEPENDENT_NORMATIVE_PROVENANCE: 'CLOSED' as const,
          EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN' as const,
          CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN' as const,
          RELATIONSHIP_T6_INPUT: 'OPEN' as const,
        })
      : Object.freeze({
          QUALIFYING_PRIMARY_WITNESS: 'OPEN' as const,
          INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN' as const,
          EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN' as const,
          CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN' as const,
          RELATIONSHIP_T6_INPUT: 'OPEN' as const,
        });

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW_VERSION,
    upstreamEvidenceId: evidence.evidenceId,
    status: !upstreamAccepted
      ? 'UPSTREAM_LEE_YOUNGEUN_DIRECT_BODY_EVIDENCE_INVALID'
      : !requirementAccepted
        ? 'FROZEN_NORMATIVE_PROVENANCE_REQUIREMENT_INVALID'
        : 'RESOLVED_LEE_YOUNGEUN_2025_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW',
    decision: sourceAdequate
      ? 'LEE_YOUNGEUN_2025_SINGLE_SOURCE_ADEQUATE_FOR_INDEPENDENT_NORMATIVE_PROVENANCE_EXACTLY_TWO_OF_FIVE_GAPS_CLOSED'
      : 'INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_NOT_ESTABLISHED',
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    targetFrozenGapId: 'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
    targetPostPrimaryGapId: 'INDEPENDENT_NORMATIVE_PROVENANCE',
    exactUpstreamEvidenceAccepted: upstreamAccepted,
    frozenNormativeProvenanceRequirementAccepted: requirementAccepted,
    sourceIdsConsumed,
    sourceCountConsumed: sourceAdequate ? 1 : 0,
    otherSourceSemanticEvidenceConsumed: false,
    crossSourceStitchingAuthorized: false,
    sourceIdentityReproducible: sourceAdequate,
    exactLocatorReproducible: sourceAdequate,
    directOriginalOrVerifiedContextReviewed: sourceAdequate,
    explicitSpouseSemanticBindingPresent: sourceAdequate,
    explicitApplicabilityBoundaryPresent: sourceAdequate,
    explicitContextAndExceptionTreatmentPresent: sourceAdequate,
    sourceAuthoredNormativeModernProposalPresent: sourceAdequate,
    kciListedArticle: sourceAdequate,
    articleSpecificPeerReviewRecordInspected: false,
    peerReviewStatusInflatedByThisReview: false,
    independentNormativeProvenanceEstablished: sourceAdequate,
    qualifyingPrimaryWitnessRemainsClosed: sourceAdequate,
    explicitRoleNeutralNatalMappingEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    authorityGapStatus,
    authorityGapsClosedCount: sourceAdequate ? 2 : 0,
    authorityGapsOpenCount: sourceAdequate ? 3 : 5,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionState: 'HOLD',
    controlIds: sourceAdequate
      ? RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: sourceAdequate ? 15 : 0,
    controlsFrozen: sourceAdequate,
    recommendedNextAction: sourceAdequate
      ? 'CONTINUE_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_AND_RELATIONSHIP_T6_GAPS_INDEPENDENTLY_WITHOUT_CROSS_SOURCE_STITCHING'
      : 'REESTABLISH_EXACT_LEE_DIRECT_BODY_AND_FROZEN_NORMATIVE_PROVENANCE_REQUIREMENT_BOUNDARIES',
  });
}
