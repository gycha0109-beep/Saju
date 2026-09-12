import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ChoiSanggil2020AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-choi-sanggil-2020-access-boundary-evidence.js';

describe('Relationship spouse T8 Choi Sanggil 2020 access boundary evidence', () => {
  test('pins exact thesis identity from the current RISS result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('최상길');
    expect(c.publicationYear).toBe(2020);
    expect(c.title).toBe(
      '사주명리에 있어서 천간별 十星의 주요 특성 연구 : 천간별 오행의 특성과 十星의 상관관계를 중심으로',
    );
    expect(c.school).toBe('동방문화대학원대학교');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T15663833');
    expect(c.rissControlNo).toBe('58ec0683c1007bd1ffe0bdc3ef48d419');
    expect(c.identityResolution.searchCardMetadata).toBe('최상길 동방문화대학원대학교 2020 국내박사');
  });

  test('pins exact acquisition head artifact and exact-head gates', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(476);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('0ff72a18c4fa45b3948a5f5d92833b72a90bc134');
    expect(c.acquisitionRunId).toBe(34702643612);
    expect(c.acquisitionArtifactId).toBe(10301445101);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:715457bcc7758c2080b51167fa790fc7cb4fcc6aa929502a192527ba0a49eb30',
    );
    expect(c.ciRunId).toBe(34702643568);
    expect(c.pccRunId).toBe(34702643526);
    expect(c.pieRunId).toBe(34702644035);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(187_705);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '657c7f370c8ea2e553abccb728ce10541061053bebaca37eca30c9ff973f5c68',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(256_243);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '4f6d34dbc7a128848144df0e231eccce486e964293c99cddb47c26b04552b6a0',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_564);
    expect(c.rissDispatcherResponseSha256).toBe(
      '3db2ed06ec7f5b399005759272e6ad7e9ce7e777a6749fb287edc2f544ef46aa',
    );
  });

  test('pins exact fulltext tuple and RISS-authored Dongbang dCollection route', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '58ec0683c1007bd1ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.identityResolution.searchCardPublicOriginalLabelObserved).toBe(true);
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissAuthoredDcollectionUrl).toBe('http://dongbang.dcollection.net/common/orgView/200000344683');
    expect(c.dcollectionHost).toBe('dongbang.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000344683');
  });

  test('stops at strict TLS verification without bypass', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toContain('CERTIFICATE_VERIFY_FAILED');
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
  });

  test('keeps heavenly-stem Ten-Star scope at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.heavenlyStemTenStarCharacteristicsStudyObserved).toBe(true);
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8ChoiSanggil2020AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8ChoiSanggil2020AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CHOI_SANGGIL_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_choi_sanggil_2020_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
