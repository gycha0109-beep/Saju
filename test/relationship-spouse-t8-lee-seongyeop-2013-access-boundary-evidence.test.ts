import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-seongyeop-2013-access-boundary-evidence.js';

describe('Relationship spouse T8 Lee Seongyeop 2013 access boundary evidence', () => {
  test('pins exact current RISS thesis identity', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('이성엽');
    expect(c.publicationYear).toBe(2013);
    expect(c.school).toBe('경기대학교 문화예술대학원');
    expect(c.degreeType).toBe('국내석사');
    expect(c.rissId).toBe('T13275169');
    expect(c.rissControlNo).toBe('47682d4d6655c6d5ffe0bdc3ef48d419');
    expect(c.title).toBe('四柱命理의 宮位論에 관한 硏究');
    expect(c.identityResolution.searchCardMetadata).toBe('이성엽 경기대학교 문화예술대학원 2013 국내석사');
  });

  test('pins disposable acquisition provenance and exact-head gates', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(500);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('435b24c6f935250827b1b8d877a47b81464ef6e8');
    expect(c.acquisitionRunId).toBe(34717534314);
    expect(c.acquisitionArtifactId).toBe(10305651065);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:d01723b03cdc88a509369f3131789d98a08eb35beae837676a56622ddc7e0fa1',
    );
    expect(c.ciRunId).toBe(34717534254);
    expect(c.pccRunId).toBe(34717534281);
    expect(c.pieRunId).toBe(34717534544);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(185_012);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'cba9d388b5fd82d1acecba3a4a426ae06aa7a53d2cc3f23f6f0a9ac89215fa6b',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(248_156);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'bd1a1604a648cf476321b9a0c9fb4edb8cb2b1f429a1838a5c9cf6c15987141b',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_021);
    expect(c.rissDispatcherResponseSha256).toBe(
      'ba8080f8efd15e437f761e66c2add36dd28f7fdfb013b17e4b8cc23369fced8f',
    );
  });

  test('pins exact tuple and no site-authored public body route', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '47682d4d6655c6d5ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissDispatcherPublicBodyRouteObserved).toBe(false);
    expect(c.rissDispatcherExternalPublicBodyUrls).toEqual([]);
    expect(c.acquisitionArtifactFileCount).toBe(8);
    expect(c.acquisitionArtifactContainsPdf).toBe(false);
    expect(c.acquisitionArtifactContainsExtractedBodyText).toBe(false);
    expect(c.acquisitionArtifactContainsRenderedPages).toBe(false);
  });

  test('keeps palace theory relevance at discovery metadata level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.palaceTheoryObservedInTitle).toBe(true);
    expect(c.catalogScopeSignal.natalKinPositionMethodRelevanceObservedOnlyOnPublicDiscoverySurface).toBe(true);
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('records strict no-bypass and no-stitching boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
  });

  test('preserves exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidence();
    expect(report.status).toBe('PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION');
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact permanent material', () => {
    const report = buildRelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_seongyeop_2013_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
