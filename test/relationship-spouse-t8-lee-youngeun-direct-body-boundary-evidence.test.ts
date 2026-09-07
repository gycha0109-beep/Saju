import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-youngeun-direct-body-boundary-evidence.js';
import { buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence } from '../src/research/relationship-spouse-t8-jung-sua-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Lee Youngeun direct-body boundary evidence', () => {
  test('pins the exact public scholarly PDF and inspected page coordinates', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.kciArticleId).toBe('ART003175186');
    expect(candidate.doi).toBe('10.55793/jkhc.2025.24.305');
    expect(candidate.kyoboArticleId).toBe('4010070551816');
    expect(candidate.directPublicPdfObjectInspected).toBe(true);
    expect(candidate.pdfScreenshotReviewed).toBe(true);
    expect(candidate.pdfSha256).toBe('06114b29775f024520ae5683cc359a97d54bf2d6b2e0d5feb8557586d0768e61');
    expect(candidate.pdfBytes).toBe(2_674_702);
    expect(candidate.pdfPageCount).toBe(34);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 333,
      physicalPdfPage: 29,
      topic: 'explicit modern spouse remapping and male-chart extension',
    });
  });

  test('records the source-authored modern spouse remapping without reducing it to Officer', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.exactModernSpouseSemanticAssertionFound).toBe(true);
    expect(candidate.husbandNeedNotBeLimitedToOfficerExplicit).toBe(true);
    expect(candidate.otherTenGodsMayRepresentSpouseExplicit).toBe(true);
    expect(candidate.peerMayRepresentEqualPartnerExplicit).toBe(true);
    expect(candidate.outputOrWealthMayRepresentHusbandInWomanBreadwinnerHouseholdExplicit).toBe(true);
    expect(candidate.sourceSaysSameLogicMayApplyToMaleChartsExplicit).toBe(true);
    expect(candidate.maleSpouseMayBeYongsinOrHeesinExtensionExplicit).toBe(true);
  });

  test('keeps the modern extension separate from a pure-natal role-neutral selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;

    expect(candidate.nativeSexNeutralExtensionCandidateFound).toBe(true);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalOperationalSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.modernApplicabilityDependsOnRelationshipRoleExplicit).toBe(true);
    expect(candidate.modernApplicabilityDependsOnHouseholdEconomicRoleExplicit).toBe(true);
    expect(candidate.modernApplicabilityDependsOnSubjectIntentExplicit).toBe(true);
    expect(candidate.yongsinHeesinSemanticsMaterialToProposal).toBe(true);
    expect(candidate.exactNatalBoundary).toMatch(/not a pure-natal spouse selector/i);
  });

  test('qualifies normative provenance for a separate adequacy review without closing it in the evidence gate', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence();

    expect(candidate.kciListedArticle).toBe(true);
    expect(candidate.individualPeerReviewRecordInspected).toBe(false);
    expect(candidate.independentNormativeProvenanceCandidateQualifiedForAdequacyReview).toBe(true);
    expect(candidate.independentNormativeProvenanceGapClosedByThisEvidence).toBe(false);
    expect(report.independentNormativeProvenanceCandidateReadyForAdequacyReview).toBe(true);
    expect(report.independentNormativeProvenanceEstablishedByThisEvidence).toBe(false);
  });

  test('keeps current canonical correspondence T6 and production fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence();

    expect(candidate.canonicalLosslessFitEstablished).toBe(false);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.userOrPartnerSexInferenceAuthorized).toBe(false);
    expect(report.partnerSexualOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the merged Jung Su-a direct-body boundary', () => {
    const upstream = buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence();
    const first = buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8LeeYoungeunDirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_youngeun_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_LEE_YOUNGEUN_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(first.controlCount).toBe(17);
    expect(first.recommendedNextAction).toBe(
      'RUN_GAP_SCOPED_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REASSESSMENT',
    );
  });
});
