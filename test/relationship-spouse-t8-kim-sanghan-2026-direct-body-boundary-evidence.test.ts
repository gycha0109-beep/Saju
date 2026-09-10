import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-sanghan-2026-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Kim Sanghan 2026 direct-body boundary evidence', () => {
  test('pins current issue-33 publisher/Kyobo public fulltext identity', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.kciArticleId).toBe('ART003370620');
    expect(candidate.doi).toBe('10.55793/jkhc.2026.33.631');
    expect(candidate.publisherJournalCode).toBe('3444');
    expect(candidate.publisherIssueCode).toBe('1096294');
    expect(candidate.publisherIssueName).toBe('제33호');
    expect(candidate.kyoboArticleId).toBe('16706499');
    expect(candidate.kyoboBarcode).toBe('4010072965031');
    expect(candidate.currentPublisherIssue33DirectlyObserved).toBe(true);
    expect(candidate.exactAuthorTargetRowDirectlyObserved).toBe(true);
    expect(candidate.publisherAuthoredKyoboDownloadContractObserved).toBe(true);
  });

  test('pins the complete content-addressed body', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.pdfSha256).toBe('dffa7650b92b609aaadf6ff66067f46599257d4e04ed90b87282883985e24289');
    expect(candidate.pdfBytes).toBe(3_040_188);
    expect(candidate.pdfPageCount).toBe(35);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfTextChars).toBe(36_627);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('preserves the article modern equality and anti-stigma boundary', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.modernNormativeEqualityEvidenceConfirmed).toBe(true);
    expect(candidate.modernSameStructureSameEvaluationStandardExplicit).toBe(true);
    expect(candidate.modernTechnicalConceptMoralStigmaSeparationExplicit).toBe(true);
    expect(candidate.modernNoSexBlameForSpouseChildEventsExplicit).toBe(true);
    expect(candidate.modernNoSexRestrictionOfLifeDomainsExplicit).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/identical Saju structures should receive identical evaluation standards/i);
  });

  test('preserves the same-source technical kinship-assignment boundary', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.technicalKinshipAssignmentSeparatedFromNormativeJudgmentExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandTechnicalConventionExplicit).toBe(true);
    expect(candidate.maleWealthAsWifeConcubineTechnicalConventionExplicit).toBe(true);
    expect(candidate.sexDifferentiatedDaewoonCalculationExplicit).toBe(true);
    expect(candidate.historicalFlexibilityBeyondOfficerOnlyHusbandReported).toBe(true);
    expect(candidate.reportedHistoricalFlexibilityOperationalizedAsNewSelectorByThisSource).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/does not publish a new spouse-specific operational selector/i);
  });

  test('does not convert equal evaluation into a role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.spouseSpecificOperationalReplacementSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(630);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 633,
      physicalPdfPage: 3,
      topic:
        'explicitly separates internal calculation and kinship-assignment rules from normative gender-value judgments and states that the study focuses on the latter',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 649,
      physicalPdfPage: 19,
      topic:
        'again distinguishes assigning Officer as husband as a technical kinship rule from normative judgments such as promiscuity, disobedience, or infringement of husband authority',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 658,
      physicalPdfPage: 28,
      topic:
        'requires identical evaluation standards for identical Saju structures, separation of technical concepts from moral stigma, no attribution of spouse or child events to one sex, and no sex-based restriction of life evaluation domains',
    });
  });

  test('chains from the accepted two-of-five state without changing authority', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence();
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.modernNormativeEqualityEvidenceConfirmed).toBe(true);
    expect(report.technicalKinshipAssignmentLayerPreserved).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Lee Youngeun contextual remapping/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(23);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_KIM_SANGHAN_2026_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_sanghan_2026_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_CONVERTING_EQUAL_EVALUATION_INTO_A_SPOUSE_SELECTOR',
    );
  });
});
