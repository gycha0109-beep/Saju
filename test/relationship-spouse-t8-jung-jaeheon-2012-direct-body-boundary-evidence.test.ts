import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8JungJaeheon2012DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-jung-jaeheon-2012-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Jung Jaeheon 2012 direct-body boundary evidence', () => {
  test('pins exact RISS/dCollection public fulltext identity', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.rissControlNo).toBe('1912fbc7d5e6ba29ffe0bdc3ef48d419');
    expect(candidate.dcollectionItemId).toBe('000001272735');
    expect(candidate.directPublicPdfObjectUrl).toContain('/public_resource/pdf/000001272735_');
    expect(candidate.pdfSha256).toBe('579fcf4a5641b04a3e9fc407e107ae551b1dcd0591307f676b2918f1a86c6d7d');
    expect(candidate.pdfBytes).toBe(8_274_633);
    expect(candidate.pdfPageCount).toBe(116);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.allPdfPagesRendered).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('preserves neutral spouse-palace location without conflating it with spouse-star mapping', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.dayBranchSpousePalaceExplicit).toBe(true);
    expect(candidate.neutralSpousePalaceLocationLayerConfirmed).toBe(true);
    expect(candidate.marriageModelUsesDayBranchAndSpouseStarSeparately).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/Day Branch represents the spouse/i);
  });

  test('pins the same-source sex-conditioned spouse-star hard boundary', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.directWealthAsWifeMappingExplicit).toBe(true);
    expect(candidate.femaleDirectOfficerAsHusbandMappingExplicit).toBe(true);
    expect(candidate.femaleIndirectOfficerAsOutsideHusbandMappingExplicit).toBe(true);
    expect(candidate.maleMarriageWealthLuckExplicit).toBe(true);
    expect(candidate.femaleMarriageOfficerKillingLuckExplicit).toBe(true);
    expect(candidate.sexConditionedSpouseStarLayerConfirmed).toBe(true);
    expect(candidate.exactNegativeBoundary).toMatch(/men by Wealth from women by Officer-Killing/i);
  });

  test('does not promote Day-Branch neutrality into an unpublished role-neutral selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.newRoleNeutralReplacementSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.currentGovernedSemanticCorrespondenceGapClosedByThisEvidence).toBe(false);
    expect(candidate.relationshipT6InputGapClosedByThisEvidence).toBe(false);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 9,
      physicalPdfPage: 23,
      topic:
        'explicitly assigns Direct Officer to a woman husband and Indirect Officer to outside husband while separately stating the Day Branch represents one spouse',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 54,
      physicalPdfPage: 68,
      topic:
        'marriage section states Month Branch is marriage palace and Day Branch spouse palace, then explicitly differentiates men marrying in Wealth luck from women marrying in Officer-Killing luck',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 77,
      physicalPdfPage: 91,
      topic:
        'marriage analysis separately measures Day-Branch interactions and spouse-star interactions or appearance',
    });
  });

  test('chains from the accepted two-of-five state without reopening or closing gaps', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8JungJaeheon2012DirectBodyBoundaryEvidence();
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.neutralSpousePalaceLocationConfirmed).toBe(true);
    expect(report.sexConditionedSpouseStarMappingConfirmed).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8JungJaeheon2012DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Noh\/Kim gender-equality semantics/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(19);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8JungJaeheon2012DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8JungJaeheon2012DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_JUNG_JAEHEON_2012_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_jung_jaeheon_2012_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_PROMOTING_NEUTRAL_DAY_BRANCH_LOCATION_TO_ROLE_NEUTRAL_STAR_SELECTOR',
    );
  });
});
