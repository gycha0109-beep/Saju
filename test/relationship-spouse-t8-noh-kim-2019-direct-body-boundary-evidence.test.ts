import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8NohKim2019DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-noh-kim-2019-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Noh/Kim 2019 direct-body boundary evidence', () => {
  test('pins the exact public KCI fulltext object and visual review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.kciArticleId).toBe('ART002459146');
    expect(candidate.kciOrteFileId).toBe('KCI_FI002459146');
    expect(candidate.doi).toBe('10.22143/HSS21.10.2.15');
    expect(candidate.pdfSha256).toBe('96ac55216429b0f47c0fb7232165c3bd547e9ca4666217acd62854b107a51ae3');
    expect(candidate.pdfBytes).toBe(305_742);
    expect(candidate.pdfPageCount).toBe(12);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.allPdfPagesRendered).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
    expect(candidate.blankTrailingKciPage).toBe(true);
  });

  test('preserves the real gender-equality normative reinterpretation', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.classicalWifeAsWealthMappingExplained).toBe(true);
    expect(candidate.patriarchalWifeAsPropertySemanticsRejected).toBe(true);
    expect(candidate.genderEqualityNormativeReinterpretationExplicit).toBe(true);
    expect(candidate.wifeAsConsiderationSubjectExplicit).toBe(true);
    expect(candidate.wifeAsRespectSubjectExplicit).toBe(true);
    expect(candidate.togethernessLanguageExplicit).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/consideration, respect, diversity recognition, and togetherness/i);
  });

  test('does not promote normative reinterpretation into a natal spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.broaderYukchinReconstructionDeferredToFutureWork).toBe(true);
    expect(candidate.validationOfModernReinterpretationDeferred).toBe(true);
    expect(candidate.newNatalChartSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.singleNativeNatalInputContractFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/does not publish a replacement natal selector/i);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 204,
      physicalPdfPage: 4,
      topic:
        'historical Yukchin logic explicitly explains self-reference overcoming/control as Wealth and patriarchal husband-over-wife logic that produced Wife plus Wealth as Chejae',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 208,
      physicalPdfPage: 8,
      topic:
        'modern Wife semantics are defined as acknowledging human subjectivity and consideration, followed by diversity-respect framing',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 210,
      physicalPdfPage: 10,
      topic:
        'conclusion freezes consideration and respect as the modern reinterpretation and explicitly leaves full Yukchin reconstruction and validation as future work',
    });
  });

  test('chains from the accepted two-of-five state without reopening closed gaps', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8NohKim2019DirectBodyBoundaryEvidence();
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.genderEqualityNormativeReinterpretationConfirmed).toBe(true);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps no-stitching and production gates fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8NohKim2019DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Kim Mantae Day-Branch priority/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(20);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8NohKim2019DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8NohKim2019DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_NOH_KIM_2019_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_noh_kim_2019_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_PROMOTING_NOH_KIM_NORMATIVE_REINTERPRETATION_TO_SELECTOR',
    );
  });
});
