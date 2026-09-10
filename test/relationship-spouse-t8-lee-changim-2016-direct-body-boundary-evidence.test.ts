import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-changim-2016-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Lee Changim 2016 direct-body boundary evidence', () => {
  test('pins exact scholarly identity and disposable acquisition disposition', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('이창임');
    expect(candidate.publicationYear).toBe(2016);
    expect(candidate.title).toBe('子平四柱를 통한 夫婦宮合 硏究 : 宮位論을 中心으로');
    expect(candidate.school).toBe('경기대학교 예술대학원');
    expect(candidate.rissId).toBe('T14205410');
    expect(candidate.rissControlNo).toBe('08d9a0b65772bc3cffe0bdc3ef48d419');
    expect(candidate.dcollectionItemId).toBe('000000043815');
    expect(candidate.disposableAcquisitionPr).toBe(429);
    expect(candidate.acquisitionPrClosedUnmerged).toBe(true);
    expect(candidate.acquisitionExactHead).toBe('0c58daaebd02c2aaac424273271e303cda369fb5');
  });

  test('pins exact public fulltext content address and no-bypass acquisition', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.acquisitionRunId).toBe(34532985241);
    expect(candidate.acquisitionArtifactId).toBe(10174291552);
    expect(candidate.acquisitionArtifactDigest).toBe(
      'sha256:0b29fea70fd1dc33272d36668f02ce8efc36b9c27484cc33c5347f5e06611136',
    );
    expect(candidate.pdfSha256).toBe(
      '345be709969973e897dafe1269268d5b82c219bb768fa0bcdbb6ab71c652372b',
    );
    expect(candidate.pdfBytes).toBe(782_960);
    expect(candidate.pdfPages).toBe(84);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.dcollectionDrmNObserved).toBe(true);
    expect(candidate.dcollectionAgreeYObserved).toBe(true);
    expect(candidate.guessedOpaqueIdentifierCount).toBe(0);
    expect(candidate.tlsVerificationDisabled).toBe(false);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
  });

  test('freezes render-first direct-body findings and the operational dyadic Gungwi layer', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.allPhysicalPagesRenderedBeforeSemanticJudgment).toBe(true);
    expect(candidate.directBodySemanticReviewPerformed).toBe(true);
    expect(candidate.bodyLevelAdmissionDecisionMade).toBe(true);
    expect(candidate.decisivePages.map((page) => page.physicalPage)).toEqual([20, 21, 24, 43, 44, 72, 73, 77]);
    expect(candidate.operationalDayStemCompatibilityEstablished).toBe(true);
    expect(candidate.operationalDayBranchCompatibilityEstablished).toBe(true);
    expect(candidate.operationalDyadicGungwiCompatibilityEstablished).toBe(true);
    expect(candidate.twoPartnerNatalChartsRequired).toBe(true);
  });

  test('preserves source-level sex-conditioned spouse-star semantics instead of manufacturing neutrality', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.femaleOfficerMeansHusbandExplicit).toBe(true);
    expect(candidate.maleWealthMeansWifeExplicit).toBe(true);
    expect(candidate.explicitNativeSexIndependentSpouseStarMappingPublished).toBe(false);
    expect(candidate.explicitPartnerSexIndependentSpouseSelectorPublished).toBe(false);
    expect(candidate.singleNativeNatalSpouseSelectorPublished).toBe(false);
    expect(candidate.completeRoleNeutralSingleNativeInputContractPublished).toBe(false);
    expect(candidate.noStitchingBoundary).toMatch(/not combined/i);
  });

  test('chains from the current two-of-five authority state without promotion', () => {
    const report = buildRelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId.length).toBeGreaterThan(0);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(true);
    expect(report.allPhysicalPagesRenderedBeforeSemanticJudgment).toBe(true);
    expect(report.directBodySemanticReviewPerformed).toBe(true);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(true);
    expect(report.operationalDyadicGungwiCompatibilityEstablished).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  }, 20_000);

  test('is content-addressed and recommends another single-source selector search', () => {
    const report = buildRelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'DIRECT_BODY_OPERATIONAL_DYADIC_GUNGWI_POSITIVE_SINGLE_NATIVE_ROLE_NEUTRAL_SELECTOR_NEGATIVE',
    );
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_CHANGIM_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_changim_2016_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_DISCOVERY_FOR_COMPLETE_SINGLE_NATIVE_ROLE_NEUTRAL_NATAL_SPOUSE_SELECTOR',
    );
  }, 20_000);
});
