import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-myengjae-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Lee Myengjae direct-body boundary evidence', () => {
  test('pins the exact KCI fulltext object and all-page visual review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.kciArticleId).toBe('ART002833924');
    expect(candidate.kciOrteFileId).toBe('KCI_FI002833924');
    expect(candidate.doi).toBe('10.35955/JCH.2022.04.80.273');
    expect(candidate.kyoboArticleId).toBe('4010047338431');
    expect(candidate.pdfSha256).toBe('5c4aaee242e61476a44798c00eb068871c49527375a2226b270613d7865b3bd6');
    expect(candidate.pdfBytes).toBe(3_223_349);
    expect(candidate.pdfPageCount).toBe(15);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.everyPdfPageRenderedAndReviewed).toBe(true);
    expect(candidate.kciBibliographicPages).toBe('273-288');
    expect(candidate.directPdfPrintedPages).toBe('273-287');
  });

  test('preserves the real parent-reform and family-critique findings', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.dayBranchSpousePositionExplicit).toBe(true);
    expect(candidate.paperExplicitlyReviewsFamilyAllocationContradictions).toBe(true);
    expect(candidate.parentSexNeutralReformDiscussedExplicitly).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/parents are treated without male\/female distinction as Seal/i);
  });

  test('does not promote sex-neutral parent reform into a role-neutral spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.parentSexNeutralReformDoesNotExtendToSpouseExplicitly).toBe(true);
    expect(candidate.maleSpouseAsWealthExplicit).toBe(true);
    expect(candidate.femaleSpouseAsOfficerKillingsExplicit).toBe(true);
    expect(candidate.nativeSexConditionedSpouseSemanticsExplicit).toBe(true);
    expect(candidate.conclusionRestatesNativeSexConditionedSpouseSemantics).toBe(true);
    expect(candidate.conclusionTableSexConditionedSpouseMappingExplicit).toBe(true);
    expect(candidate.authorProposesRoleNeutralSpouseReplacement).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.explicitRoleNeutralNatalMappingGapClosedByThisEvidence).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/male-context spouse is wife or wife-concubine under Wealth/i);
    expect(candidate.exactNegativeBoundary).toMatch(/female-context spouse is husband under Officer-Killings/i);
  });

  test('pins the strongest direct visual locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 281,
      physicalPdfPage: 9,
      topic: 'Jin So-am reform makes parents sex-neutral Seal but retains male Wealth wife and female Officer-Killings husband branching',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 286,
      physicalPdfPage: 14,
      topic: 'conclusion comparison table directly preserves sex-conditioned spouse assignments',
    });
  });

  test('chains from the accepted two-of-five state without reopening closed gaps', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidence();
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
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Lee Youngeun, Lee Ockhwa, Jung Su-a, Kweon Sujeong, Song Jaewoo/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(20);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8LeeMyengjaeDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_LEE_MYENGJAE_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_myengjae_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_LEE_MYENGJAE_PARENT_REFORM_OR_CRITIQUE',
    );
  });
});
