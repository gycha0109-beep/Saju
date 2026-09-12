import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-park-byeonggeun-2021-access-boundary-evidence.js';

describe('Relationship spouse T8 Park Byeonggeun 2021 access boundary evidence', () => {
  test('pins exact identity resolved from current RISS title search', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('박병근');
    expect(c.publicationYear).toBe(2021);
    expect(c.title).toBe('宮合의 吉凶 분석방법 연구');
    expect(c.school).toBe('공주대학교 일반대학원');
    expect(c.rissId).toBe('T15747226');
    expect(c.rissControlNo).toBe('3fb62c8e8f683132ffe0bdc3ef48d419');
    expect(c.identityResolution.source).toBe('CURRENT_PUBLIC_RISS_TITLE_SEARCH');
    expect(c.identityResolution.rule).toBe(
      'EXACT_TITLE_AUTHOR_YEAR_FROM_SITE_AUTHORED_SEARCH_RESULT_LINK_ONLY',
    );
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
  });

  test('pins disposable acquisition gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(438);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('8700973bc52987d759dc74df5ac93f7d5b8d6204');
    expect(c.acquisitionRunId).toBe(34680473197);
    expect(c.acquisitionArtifactId).toBe(10293242746);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:f2b2c1b7c42908fd250f7162914555e240371bf5753d48f2e0849e080734c50b',
    );
    expect(c.ciRunId).toBe(34680473217);
    expect(c.pccRunId).toBe(34680473138);
    expect(c.pieRunId).toBe(34680473459);
  });

  test('pins title-search, detail and dispatcher response hashes', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(195_564);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '9d856f27a71fbfb014917e6b712714b19fb25e7bc34561b56756e2e46f4d1087',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(243_643);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '7c32656397f4cb918fdc1947ddc0a0be8b8c85c92317fd28db7ac07d46b88964',
    );
    expect(c.rissDispatcherResponseBytes).toBe(7_885);
    expect(c.rissDispatcherResponseSha256).toBe(
      '214672728493ff227b759bc271049631ddb0ed46070ce49640db9073d1eb8ae5',
    );
  });

  test('pins exact fulltext tuple and Kongju TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '3fb62c8e8f683132ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe(
      'https://kongju.dcollection.net/common/orgView/200001001101',
    );
    expect(c.dcollectionHost).toBe('kongju.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200001001101');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('preserves no-bypass no-body and metadata boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidence();
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
      RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CONTROL_IDS,
    );
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION',
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_park_byeonggeun_2021_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
