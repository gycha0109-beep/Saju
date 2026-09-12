import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimMoonjeong2024AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-moonjeong-2024-access-boundary-evidence.js';

describe('Relationship spouse T8 Kim Moonjeong 2024 access boundary evidence', () => {
  test('pins exact thesis identity from the current RISS search-result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('김문정');
    expect(c.publicationYear).toBe(2024);
    expect(c.title).toBe('女命觀에서 배우자 宮과 星의 觀係性 硏究');
    expect(c.school).toBe('국립공주대학교 대학원');
    expect(c.degreeType).toBe('국내석사');
    expect(c.rissId).toBe('T16939717');
    expect(c.rissControlNo).toBe('b6d49eb4a0deaa98ffe0bdc3ef48d419');
    expect(c.identityResolution.searchCardMetadata).toBe('김문정 국립공주대학교 대학원 2024 국내석사');
  });

  test('pins disposable acquisition exact-head gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(459);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('25f09c4a63e2222773ed5f44b8ca3c243d7532a9');
    expect(c.acquisitionRunId).toBe(34693881995);
    expect(c.acquisitionArtifactId).toBe(10297861917);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:014ebb0348a9f472176267c7bfe556257346fa49fed2143a0e6b5361fc348e20',
    );
    expect(c.ciRunId).toBe(34693881932);
    expect(c.pccRunId).toBe(34693881933);
    expect(c.pieRunId).toBe(34693882150);
  });

  test('pins content-addressed RISS search detail and dispatcher responses', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(185_402);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '65cf7c829c20db50cee6321482b68a9b208d082ff90202223e2159ac611d4afa',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(240_207);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'a1eb5442e41f4636e073f9580752ae8fba40de717d463bc63831eb42002dca34',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(7_981);
    expect(c.rissDispatcherResponseSha256).toBe(
      '90d77be30b9252de135be1795bcc7d8e74699f9ca7587bca3848e6a9c23e3763',
    );
  });

  test('pins exact fulltext tuple and Kongju TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'b6d49eb4a0deaa98ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe('https://kongju.dcollection.net/common/orgView/200001003221');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200001003221');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('keeps abstract scope statements at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.femaleChartCentered).toBe(true);
    expect(c.catalogScopeSignal.claimsPossibleApplicationToMaleChartsAndAllKinRelations).toBe(true);
    expect(c.catalogScopeSignal.admittedAsBodyLevelGeneralization).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('preserves no-bypass no-body and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8KimMoonjeong2024AccessBoundaryEvidence();
    expect(report.status).toBe('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION');
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8KimMoonjeong2024AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_moonjeong_2024_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
