import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeOckhwaDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-ockhwa-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Lee Ockhwa direct-body boundary evidence', () => {
  test('pins the exact public PDF and direct visual-review coordinates', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.kciArticleId).toBe('ART003150783');
    expect(candidate.doi).toBe('10.55793/jkhc.2024.23.177');
    expect(candidate.kyoboArticleId).toBe('4010070433587');
    expect(candidate.kyoboArtId).toBe('16453598');
    expect(candidate.pdfSha256).toBe('4b3e69c6ea3ef4a82e7ced0e1a96e24a0095d433b0e1abe83feab20aa871826c');
    expect(candidate.pdfBytes).toBe(2_307_401);
    expect(candidate.pdfPageCount).toBe(32);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.pdfScreenshotReviewed).toBe(true);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 192,
      physicalPdfPage: 16,
      topic: 'explicit spouse-as-opposite-sex yin-yang applicability premise',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 194,
      physicalPdfPage: 18,
      topic: 'same Officer-family structure branches by native sex: male child versus female husband',
    });
  });

  test('preserves the real positive positional and variability findings', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.yukchinVariabilityByPositionFunctionActionExplicit).toBe(true);
    expect(candidate.dayBranchSpouseLocationExplicit).toBe(true);
    expect(candidate.equalHusbandWifePositionLanguageExplicit).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/Day Branch is used to inspect spouse/i);
  });

  test('does not relabel the paper as a role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.spouseAsOppositeSexExplicit).toBe(true);
    expect(candidate.husbandWifeBinaryRoleFramingExplicit).toBe(true);
    expect(candidate.nativeSexConditionedOfficerRoleExplicit).toBe(true);
    expect(candidate.sameOfficerFamilyDifferentByNativeSexExplicit).toBe(true);
    expect(candidate.maleOfficerAsChildExampleExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandExampleExplicit).toBe(true);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/opposite-sex yin-yang premise/i);
  });

  test('chains from the current two-of-five authority state without reopening accepted gaps', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8LeeOckhwaDirectBodyBoundaryEvidence();
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
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8LeeOckhwaDirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Lee Youngeun, Jung Su-a, Kweon Sujeong, Song Jaewoo/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(18);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8LeeOckhwaDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8LeeOckhwaDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_LEE_OCKHWA_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_ockhwa_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_LEE_OCKHWA_LOCATION_OR_VARIABILITY_LAYERS',
    );
  });
});
