import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8YuMyeongsuk2024AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-yu-myeongsuk-2024-access-boundary-evidence.js';

describe('Relationship spouse T8 Yu Myeongsuk 2024 access boundary evidence', () => {
  test('pins exact thesis identity from the current RISS search-result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('유명숙');
    expect(c.publicationYear).toBe(2024);
    expect(c.title).toBe(
      '중년여성의 부부위기 경험에 대한 명리학적 내러티브 연구 : 결정론과 자유의지를 중심으로',
    );
    expect(c.school).toBe('원광대학교 일반대학원');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T17090361');
    expect(c.rissControlNo).toBe('f9a5a4bdecf4de47ffe0bdc3ef48d419');
    expect(c.identityResolution.searchCardMetadata).toBe('유명숙 원광대학교 일반대학원 2024 국내박사');
  });

  test('pins disposable acquisition exact-head gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(461);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('764dd567eeaaa4320922619c5f6e19c6a2e777da');
    expect(c.acquisitionRunId).toBe(34695420324);
    expect(c.acquisitionArtifactId).toBe(10298258255);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:36024eacf947d3281ee78dbd5f0673fb2a6bab7668b83da48b87b3b844e87d66',
    );
    expect(c.ciRunId).toBe(34695420322);
    expect(c.pccRunId).toBe(34695420244);
    expect(c.pieRunId).toBe(34695420563);
  });

  test('pins content-addressed RISS search detail and dispatcher responses', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(187_242);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '737948ecbe9481ce8f1a5afa558079fe2654db0f032940b74dff9b81be64d018',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(281_776);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '7eeaf85e2eb05764ed326f8e64b28bcce61215df637f8a7f0f7481bb4efee91d',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_584);
    expect(c.rissDispatcherResponseSha256).toBe(
      'd60cb9ff91c1ab7921a12bee3ab7559ab825a709ff913d4eb86c188a29abfc24',
    );
  });

  test('pins exact fulltext tuple and Wonkwang TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'f9a5a4bdecf4de47ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe(
      'http://wonkwang.dcollection.net/common/orgView/200000806619',
    );
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000806619');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('keeps title scope at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.titleScopeSignal.middleAgedWomenCentered).toBe(true);
    expect(c.titleScopeSignal.maritalCrisisCentered).toBe(true);
    expect(c.titleScopeSignal.admittedAsBodyLevelRoleNeutralGeneralization).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('preserves no-bypass no-body and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8YuMyeongsuk2024AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_CONTROL_IDS,
    );
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8YuMyeongsuk2024AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_YU_MYEONGSUK_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_yu_myeongsuk_2024_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
