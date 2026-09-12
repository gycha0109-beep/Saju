import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-choi-misook-2023-access-boundary-evidence.js';

describe('Relationship spouse T8 Choi Misook 2023 access boundary evidence', () => {
  test('pins exact current RISS thesis identity', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('최미숙');
    expect(c.publicationYear).toBe(2023);
    expect(c.school).toBe('공주대학교 대학원');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T16823751');
    expect(c.rissControlNo).toBe('c8f38783e4b27c73ffe0bdc3ef48d419');
    expect(c.title).toContain('淸代 命理學 十星');
    expect(c.title).toContain('生剋制化');
    expect(c.identityResolution.searchCardMetadata).toBe('최미숙 공주대학교 대학원 2023 국내박사');
  });

  test('pins disposable acquisition provenance and exact-head gates', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(490);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('ad5cf1f74c78188bd6aae7c3e38e2b3dcb9f5609');
    expect(c.acquisitionRunId).toBe(34710990477);
    expect(c.acquisitionArtifactId).toBe(10303147457);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:db739d169ce9d22bed66a1308b75fe547689b3cbbb28d9f0fe40109378293e0a',
    );
    expect(c.ciRunId).toBe(34710990434);
    expect(c.pccRunId).toBe(34710990428);
    expect(c.pieRunId).toBe(34710990685);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(188_152);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '82e875e28c7798eeb691478319516758e6162d0d1453ac810146e7043c92372d',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(258_625);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'b87597910a231e1364eb94bd414961056dfde93853f6bd124d794dc981001ac6',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_467);
    expect(c.rissDispatcherResponseSha256).toBe(
      '42d5c23d4eb92978ea886368eae5bc4ead972c2e53144934f6ec3bd177ce01d5',
    );
  });

  test('pins exact tuple and literal Kongju dCollection TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'c8f38783e4b27c73ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe('https://kongju.dcollection.net/common/orgView/200001003682');
    expect(c.dcollectionHost).toBe('kongju.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200001003682');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toContain('CERTIFICATE_VERIFY_FAILED');
  });

  test('keeps title scope at discovery metadata level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.tenStarTheoryInTitleObserved).toBe(true);
    expect(c.catalogScopeSignal.controllingGeneratingTransformationsInTitleObserved).toBe(true);
    expect(c.catalogScopeSignal.comparedClassicsInTitleObserved).toBe(true);
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('records strict no-bypass and no-stitching boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact permanent material', () => {
    const report = buildRelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_choi_misook_2023_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
