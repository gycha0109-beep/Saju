import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimInsun2014AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-insun-2014-access-boundary-evidence.js';

describe('Relationship spouse T8 Kim Insun 2014 access boundary evidence', () => {
  test('pins exact identity resolved from current RISS title search', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('김인순');
    expect(c.publicationYear).toBe(2014);
    expect(c.title).toBe('命理學의 宮合論 比較硏究 - 宮合論의 論爭點을 중심으로 -');
    expect(c.school).toBe('국제뇌교육종합대학원대학교 국학과');
    expect(c.rissId).toBe('T14317928');
    expect(c.rissControlNo).toBe('3020e7280620761dffe0bdc3ef48d419');
    expect(c.identityResolution.source).toBe('CURRENT_PUBLIC_RISS_TITLE_SEARCH');
    expect(c.identityResolution.rule).toBe(
      'EXACT_TITLE_AUTHOR_YEAR_FROM_SITE_AUTHORED_SEARCH_RESULT_LINK_ONLY',
    );
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
  });

  test('pins disposable acquisition gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(440);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('771f690c878ea2dcd38dd0ec39b2610c49643204');
    expect(c.acquisitionRunId).toBe(34681591787);
    expect(c.acquisitionArtifactId).toBe(10293879851);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:5ce2b785ee7b1723895df823aaec77cab4368a26e03ba9d5303a12cf0542f84f',
    );
    expect(c.ciRunId).toBe(34681591776);
    expect(c.pccRunId).toBe(34681591772);
    expect(c.pieRunId).toBe(34681592014);
  });

  test('pins title-search, detail and dispatcher response hashes', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(185_981);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'eb583a54df6563daab5093785ca5b703f7702c782de6635dac6f168465b34756',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(238_948);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'b6efb332ab33bcb8f3c64a7b328d2f405414c7b64c4816d217d089b9e60f3c70',
    );
    expect(c.rissDispatcherResponseBytes).toBe(8_335);
    expect(c.rissDispatcherResponseSha256).toBe(
      'c448060be0965f54a5c6a83adb4f16705166da8853f81cbbafbdd9ef7d03cd4f',
    );
    expect(c.rissSiteAuthoredNationalLibraryLocalBibno).toBe('KDM201502546');
  });

  test('pins exact fulltext tuple and UBE TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '3020e7280620761dffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe(
      'http://ube.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000002322906',
    );
    expect(c.dcollectionHost).toBe('ube.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('000002322906');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('preserves no-bypass no-body and metadata boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8KimInsun2014AccessBoundaryEvidence();
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(false);
    expect(report.bodyLevelAdmissionDecisionMade).toBe(false);
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
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CONTROL_IDS,
    );
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8KimInsun2014AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION',
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_insun_2014_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
