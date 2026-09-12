import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8SonJusaeng2020AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-son-jusaeng-2020-access-boundary-evidence.js';

describe('Relationship spouse T8 Son Jusaeng 2020 access boundary evidence', () => {
  test('pins exact thesis identity from the current RISS result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('손주생');
    expect(c.publicationYear).toBe(2020);
    expect(c.title).toBe('四柱命理學의 格局과 用神에 대한 体用論的 硏究');
    expect(c.school).toBe('경기대학교 행정·사회복지대학원');
    expect(c.degreeType).toBe('국내석사');
    expect(c.rissId).toBe('T15521642');
    expect(c.rissControlNo).toBe('ac7354cee8847b2affe0bdc3ef48d419');
    expect(c.nationalLibraryLocalBibno).toBe('KDM202026371');
    expect(c.identityResolution.searchCardMetadata).toBe('손주생 경기대학교 행정·사회복지대학원 2020 국내석사');
  });

  test('pins the fresh post-drift acquisition head and rejects the stale head as authority', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(467);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.supersededStaleAcquisitionHead).toBe('92f91e2ece71b257d826d22e729be73dd8e04294');
    expect(c.acquisitionExactHead).toBe('9b63679f82cb6173f396a45a261ccc97f13cc0ca');
    expect(c.acquisitionRunId).toBe(34698713223);
    expect(c.acquisitionArtifactId).toBe(10299342573);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:80f869b0084eecf206bf712b48bd399df46e4bd005a4a4c721a1e9ad16b366ce',
    );
    expect(c.ciRunId).toBe(34698713230);
    expect(c.pccRunId).toBe(34698713225);
    expect(c.pieRunId).toBe(34698713417);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(185_692);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'a422555ec11b61d17922bac8143ff6ada2c494a714178023c1194b4052957229',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(256_594);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '144949d48a05dbaab91af89c166115b15e227baeea2b49ba09c7a585735f06b1',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_042);
    expect(c.rissDispatcherResponseSha256).toBe(
      '0906ef9f128bbb3bc01f45ef11ea7c8b37b3885ab54cc5d043680f5c825b8152',
    );
  });

  test('pins exact fulltext tuple and current dispatcher no-body-route result', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'ac7354cee8847b2affe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.identityResolution.searchCardPublicOriginalLabelObserved).toBe(true);
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissDispatcherExternalPublicBodyUrls).toEqual([]);
    expect(c.rissDispatcherDisposition).toBe('RISS_DISPATCHER_NO_RELEVANT_PUBLIC_BODY_ROUTE_OBSERVED');
  });

  test('keeps catalog spouse-palace language at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.spousePalaceLanguageObservedInPublicAbstractOrCatalog).toBe(true);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('preserves no-bypass no-body and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8SonJusaeng2020AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8SonJusaeng2020AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_SON_JUSAENG_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_son_jusaeng_2020_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_OPAQUE_ID_GUESSING_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
