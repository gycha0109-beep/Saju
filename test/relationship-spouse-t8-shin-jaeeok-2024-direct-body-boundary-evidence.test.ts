import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ShinJaeeok2024DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-shin-jaeeok-2024-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Shin Jae-eok 2024 direct-body boundary evidence', () => {
  test('pins exact RISS and Kongju dCollection public fulltext identity', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.rissId).toBe('T16939654');
    expect(candidate.rissControlNo).toBe('49df877f9b4f8a08ffe0bdc3ef48d419');
    expect(candidate.uci).toBe('I804:44004-000000033581');
    expect(candidate.dcollectionItemId).toBe('200001003260');
    expect(candidate.directPublicPdfObjectUrl).toContain('/public_resource/pdf/200001003260_');
    expect(candidate.pdfSha256).toBe('57a00deb098cd01412f40ba90dbc930ca4d1eb84575b7a1aa0c9321c36b40e2c');
    expect(candidate.pdfBytes).toBe(839_334);
    expect(candidate.pdfPageCount).toBe(86);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfTextChars).toBe(79_401);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('preserves the source-authored spouse palace and spouse-star operational contract', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.spousePalaceAndStarOperationalContractExplicit).toBe(true);
    expect(candidate.dayAndDayBranchSpousePalaceExplicit).toBe(true);
    expect(candidate.spouseStarRequiresPalaceConnectionExplicit).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/Day and Day Branch function as spouse palace/i);
  });

  test('pins the same-source sex-conditioned spouse-star boundary', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.maleWealthAsWifeMappingExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandMappingExplicit).toBe(true);
    expect(candidate.sexConditionedSpouseStarSelectionConfirmed).toBe(true);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/male-chart spouse is Wealth\/wife and female-chart spouse is Officer\/husband/i);
  });

  test('does not convert Five-Element transformation into a role-neutral selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.absentYukchinStarMayTransformToAnotherFiveElementExplicit).toBe(true);
    expect(candidate.transformationRuleReplacesSexConditionedSpouseSelector).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
  });

  test('preserves the non-natal life-context dependency in the complete workflow', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.preInterpretationMarriageStatusInquiryExplicit).toBe(true);
    expect(candidate.preInterpretationChildCountInquiryExplicit).toBe(true);
    expect(candidate.completeWorkflowDependsOnExternalLifeContext).toBe(true);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(9);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 32,
      physicalPdfPage: 41,
      topic:
        'explicitly assigns Wealth as wife for a male chart and Officer as husband for a female chart, preserving sex-conditioned spouse-star selection',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 72,
      physicalPdfPage: 81,
      topic:
        'conclusion requires asking marriage status and number of children before fixing birth time and restates spouse-palace plus spouse-star linkage through combination, clash, or lu',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 73,
      physicalPdfPage: 82,
      topic:
        'conclusion allows an absent Yukchin star to operate after Five-Element transformation but does not replace the earlier sex-conditioned spouse-star mapping',
    });
  });

  test('chains from the accepted two-of-five authority state without changing the ledger', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8ShinJaeeok2024DirectBodyBoundaryEvidence();
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.spouseSpecificOperationalContractConfirmed).toBe(true);
    expect(report.sexConditionedSpouseStarSelectionConfirmed).toBe(true);
    expect(report.externalLifeContextDependencyConfirmed).toBe(true);
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

  test('keeps no-stitching and product gates fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8ShinJaeeok2024DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Jung Jaeheon or Jung Su-a spouse-palace evidence/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(21);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8ShinJaeeok2024DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8ShinJaeeok2024DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_SHIN_JAEEOK_2024_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_shin_jaeeok_2024_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_CONVERTING_FIVE_ELEMENT_TRANSFORMATION_INTO_A_NEUTRAL_SELECTOR',
    );
  });
});
