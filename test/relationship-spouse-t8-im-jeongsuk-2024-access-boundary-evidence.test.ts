import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ImJeongsuk2024AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-im-jeongsuk-2024-access-boundary-evidence.js';

describe('Relationship spouse T8 Im Jeongsuk 2024 access boundary evidence', () => {
  test('pins exact thesis identity from one RISS search-result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('임정숙');
    expect(c.publicationYear).toBe(2024);
    expect(c.title).toBe('사주日支 유형과 궁합에 대한 인식이 부부갈등에 미치는 영향 : 이혼의도를 포함하여');
    expect(c.school).toBe('국제뇌교육종합대학원대학교 전문대학원');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T16938426');
    expect(c.rissControlNo).toBe('ba3f016fe89d898dffe0bdc3ef48d419');
    expect(c.identityResolution.source).toBe('CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD');
    expect(c.identityResolution.searchCardMetadata).toBe(
      '임정숙 국제뇌교육종합대학원대학교 전문대학원 2024 국내박사',
    );
  });

  test('pins disposable acquisition gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(454);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('c3480bcfc53ed69849a8ce0664b4a92424e88ba6');
    expect(c.acquisitionRunId).toBe(34686640187);
    expect(c.acquisitionArtifactId).toBe(10295309141);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:5b999ca4767560087f29844fae8ed76167412c426c3e12ba7fccd90fd1674aa4',
    );
    expect(c.ciRunId).toBe(34686639924);
    expect(c.pccRunId).toBe(34686640012);
    expect(c.pieRunId).toBe(34686640386);
  });

  test('pins content-addressed RISS search detail and dispatcher responses', () => {
    const c = RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(187_106);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '378ca91b26586303be91c5aeba79575e8d87281b4d435d8632f86251b99f7e6a',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(241_349);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'ddc56e91553ca7df42b43dd8e1cd4994a45272469b275aa16f504707aba56344',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_474);
    expect(c.rissDispatcherResponseSha256).toBe(
      '51e2e7933f6dd63c8573278d7ad63c1b8068d1b0bb8523986a8d87c00b00c9f7',
    );
  });

  test('pins exact fulltext tuple and UBE dCollection TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'ba3f016fe89d898dffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe('http://ube.dcollection.net/common/orgView/200000729734');
    expect(c.dcollectionHost).toBe('ube.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000729734');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('preserves no-bypass no-body and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
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
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8ImJeongsuk2024AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8ImJeongsuk2024AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_IM_JEONGSUK_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_im_jeongsuk_2024_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
