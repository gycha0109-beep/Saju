import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-mantae-2025-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Kim Mantae 2025 direct-body boundary evidence', () => {
  test('pins the exact author-hosted complete PDF and acquisition contract', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.kciArticleId).toBe('ART003250308');
    expect(candidate.doi).toBe('10.58936/gcr.2025.9.5.3.143');
    expect(candidate.printedPages).toBe('143-168');
    expect(candidate.authorSourcePageUrl).toContain('wr_id=418');
    expect(candidate.authorDirectDownloadUrl).toContain('wr_id=418&no=0');
    expect(candidate.authorPageDirectDownloadContract).toContain("file_download('./download.php?bo_table=sub3_1&wr_id=418&no=0'");
    expect(candidate.pdfSha256).toBe('edadff53dc3cd5ba5510e5dfc8690c55977751caf0d24e8875d3d44dc6fa3472');
    expect(candidate.pdfBytes).toBe(3_067_426);
    expect(candidate.pdfPageCount).toBe(26);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.allPdfPagesRendered).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('preserves the real role-neutral spouse-palace location layer', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.dayBranchSpousePalaceExplicit).toBe(true);
    expect(candidate.spousePalacePriorityOverSpouseStarExplicit).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/Day Branch is spouse palace/i);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 163,
      physicalPdfPage: 21,
      topic:
        'conclusion repeats that spouse palace and spouse star are both important and Day Branch spouse palace is more important than spouse star',
    });
  });

  test('does not promote positional neutrality into a complete role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.femaleChartHusbandAsOfficerExplicit).toBe(true);
    expect(candidate.maleNativeSpouseStarAsWealthExplicit).toBe(true);
    expect(candidate.femaleNativeSpouseStarAsOfficerExplicit).toBe(true);
    expect(candidate.nativeSexConditionedSpouseSemanticsExplicit).toBe(true);
    expect(candidate.modernizationReplacesSexConditionedSpouseRule).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.singleNativeNatalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/native-sex-independent and partner-sex-independent single-native spouse selector/i);
  });

  test('pins the dyadic complete-two-chart boundary in the conclusion and abstract', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.completeMaleAndFemaleChartsComparedExplicit).toBe(true);
    expect(candidate.dyadicCompatibilityInputRequired).toBe(true);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 162,
      physicalPdfPage: 20,
      topic:
        'conclusion states that spouse-focused compatibility should compare both male and female complete birth-date-time charts',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 166,
      physicalPdfPage: 24,
      topic:
        'Korean abstract repeats both complete-two-chart comparison and Day Branch spouse-palace priority over spouse star',
    });
  });

  test('chains from the accepted two-of-five authority state without reopening closed gaps', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidence();
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Lee Youngeun contextual remapping/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8KimMantae2025DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_KIM_MANTAE_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_mantae_2025_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_SINGLE_NATIVE_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_KIM_MANTAE_DAY_BRANCH_PRIORITY',
    );
  });
});
