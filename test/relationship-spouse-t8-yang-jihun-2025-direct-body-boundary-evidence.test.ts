import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-kim-sanghan-2026-direct-body-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-yang-jihun-2025-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Yang Jihun 2025 direct-body boundary evidence', () => {
  test('pins exact scholarly and public repository identity', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('양지훈');
    expect(candidate.publicationYear).toBe(2025);
    expect(candidate.rissId).toBe('T17159723');
    expect(candidate.rissControl).toBe('a0a78b8578ab695effe0bdc3ef48d419');
    expect(candidate.uci).toBe('I804:44032-200000847815');
    expect(candidate.dcollectionId).toBe('200000847815');
    expect(candidate.nanetControl).toBe('KDMT12025000053655');
    expect(candidate.rissPublicFulltextObserved).toBe(true);
    expect(candidate.exactRissIdentityDirectlyObserved).toBe(true);
    expect(candidate.rissAuthoredDcollectionRouteFollowed).toBe(true);
  });

  test('pins the complete content-addressed body and direct visual review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.pdfSha256).toBe('1239c35a62f1e98324d619c0f1703f7b577b611b1511f988677db41ddd754091');
    expect(candidate.pdfBytes).toBe(2_371_449);
    expect(candidate.pdfPageCount).toBe(83);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.completePdfTextExtracted).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('preserves the explicit sex-conditioned classical spouse mapping', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.classicalSexConditionedKinshipMappingExplicit).toBe(true);
    expect(candidate.maleWealthAsWifeMappingExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandMappingExplicit).toBe(true);
    expect(candidate.sameMappingUsedInModernFemaleCaseAnalysis).toBe(true);
    expect(candidate.exactNegativeBoundary).toMatch(/mapping male Wealth to wife and female Officer to husband/i);
  });

  test('preserves the modern applicability critique without overclaiming its effect', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.husbandChildrenMarriageCenteredEvaluationExplicit).toBe(true);
    expect(candidate.modernUnmarriedOrNoChildbirthApplicabilityLimitExplicit).toBe(true);
    expect(candidate.modernMarriageAsChoiceExplicit).toBe(true);
    expect(candidate.modernBroaderLifeEvaluationDirectionExplicit).toBe(true);
    expect(candidate.alternativeUsesNatalChartPatternYongshinLuckCyclesAndSupplementaryShinsal).toBe(true);
    expect(candidate.modernApplicabilityCritiqueConfirmed).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/marriage in modern society is a choice rather than a necessity/i);
  });

  test('does not convert modern applicability critique into a role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.alternativePublishesRoleNeutralReplacementSpouseSelector).toBe(false);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(8);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 17,
      physicalPdfPage: 25,
      topic:
        'states that kinship targets partly differ by native sex and explicitly maps male Wealth to wife while female Officer maps to husband',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 51,
      physicalPdfPage: 59,
      topic:
        'modern female case analysis explicitly applies Food/Output as children and Officer as husband while judging the chart through the classical female-fate framework',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 68,
      physicalPdfPage: 76,
      topic:
        'conclusion identifies husband and children plus marriage-centered evaluation as core classical female-fate criteria and finds limits for unmarried or no-childbirth modern women',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 69,
      physicalPdfPage: 77,
      topic:
        'proposes broader natal-pattern-useful-god-luck-cycle evaluation and supplementary shinsal use, and states marriage is a choice, without publishing a replacement spouse selector',
    });
  });

  test('chains from Kim Sanghan 2026 without changing the two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence();
    const report = buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.classicalSexConditionedSpouseMappingConfirmed).toBe(true);
    expect(report.modernFemaleCaseReuseConfirmed).toBe(true);
    expect(report.modernApplicabilityCritiqueConfirmed).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Kim Sanghan 2026 equal-evaluation language/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(23);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_yang_jihun_2025_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_CONVERTING_MODERN_APPLICABILITY_CRITIQUE_INTO_A_SPOUSE_SELECTOR',
    );
  });
});
