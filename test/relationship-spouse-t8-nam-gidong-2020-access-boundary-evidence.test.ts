import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8NamGidong2020AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-nam-gidong-2020-access-boundary-evidence.js';

describe('Relationship spouse T8 Nam Gidong 2020 access boundary evidence', () => {
  test('pins exact scholarly identity and disposable acquisition disposition', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('남기동');
    expect(c.publicationYear).toBe(2020);
    expect(c.title).toBe('부부 궁합(宮合)에 관한 명리학적 연구');
    expect(c.rissId).toBe('T15540056');
    expect(c.rissControlNo).toBe('6e314e369d786dffffe0bdc3ef48d419');
    expect(c.disposableAcquisitionPr).toBe(433);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('6de16595e837ac3a44ad301a8ad00d0e393a4c84');
  });

  test('pins exact acquisition gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.acquisitionRunId).toBe(34547598969);
    expect(c.acquisitionArtifactId).toBe(10179601703);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:71f9506b60d632aff45a3ead9a3d1690035ad8be7a35ea5f118b3c076365d897',
    );
    expect(c.ciRunId).toBe(34547598885);
    expect(c.pccRunId).toBe(34547598872);
    expect(c.pieRunId).toBe(34547599332);
  });

  test('pins exact RISS fulltext tuple and dispatcher response', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '6e314e369d786dffffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherContentType).toBe('text/html; charset=utf-8');
    expect(c.rissDispatcherResponseBytes).toBe(7_993);
    expect(c.rissDispatcherResponseSha256).toBe(
      '0e6ecac7f6f0deb3d970852791d4db8e56312f68354c6d8af29a524c160cdbca',
    );
  });

  test('freezes exact Dongbang TLS verification boundary without weakening TLS', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissAuthoredDcollectionUrl).toBe(
      'http://dongbang.dcollection.net/common/orgView/200000300166',
    );
    expect(c.dcollectionHost).toBe('dongbang.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000300166');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('preserves no-bypass no-body and metadata boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8NamGidong2020AccessBoundaryEvidence();
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(false);
    expect(report.directBodySemanticReviewPerformed).toBe(false);
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8NamGidong2020AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_NAM_GIDONG_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION',
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_nam_gidong_2020_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
