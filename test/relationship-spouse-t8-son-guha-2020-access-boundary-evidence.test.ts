import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8SonGuha2020AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-son-guha-2020-access-boundary-evidence.js';

describe('Relationship spouse T8 Son Guha 2020 access boundary evidence', () => {
  test('pins exact current RISS thesis identity including site-authored school alias', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('손구하');
    expect(c.publicationYear).toBe(2020);
    expect(c.school).toBe('동방문화대학원대학교');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T15540068');
    expect(c.rissControlNo).toBe('2f46d72928c0f7c8ffe0bdc3ef48d419');
    expect(c.nationalLibraryLocalBibno).toBe('KDM202021114');
    expect(c.title).toContain('단건업(段建業)');
    expect(c.title).toContain('맹파명리(盲波命理)');
    expect(c.identityResolution.searchCardMetadata).toBe('손구하 東方文化大學院大學校 2020 국내박사');
    expect(c.identityResolution.normalizedSchoolLabel).toBe('동방문화대학원대학교');
    expect(c.identityResolution.siteAuthoredSchoolLabel).toBe('東方文化大學院大學校');
  });

  test('pins disposable acquisition provenance and exact-head gates', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(498);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.supersededFailedAcquisitionHead).toBe('5668dbdf6787d2130fc107c0f4884d4a17a7cad2');
    expect(c.acquisitionExactHead).toBe('1ea01c37ee383d3b4d7513199955ba3907f6dd04');
    expect(c.acquisitionRunId).toBe(34716157765);
    expect(c.acquisitionArtifactId).toBe(10303994162);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:17beda00d6249340c77e944255d5dcb8f63adf639f88e025d6058fead05c9152',
    );
    expect(c.ciRunId).toBe(34716157723);
    expect(c.pccRunId).toBe(34716157701);
    expect(c.pieRunId).toBe(34716158107);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(186_888);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'f5d3d7150c3d368cdc941a7aa5d459b1f04a33df1e3e207c1ff8bbc9deff0129',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(326_023);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'baf684906904c220991907f9cc930525811e9d90c6cbe1d303c40b481be0b30e',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_477);
    expect(c.rissDispatcherResponseSha256).toBe(
      'c2ce2aa0c0edc4146eb208822b3dfc1c52f65eff1f9e822fd0b12cd134119bae',
    );
  });

  test('pins exact tuple and literal Dongbang dCollection TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '2f46d72928c0f7c8ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe('http://dongbang.dcollection.net/common/orgView/200000300081');
    expect(c.dcollectionHost).toBe('dongbang.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000300081');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toContain('CERTIFICATE_VERIFY_FAILED');
  });

  test('keeps Mingpa operational relevance at discovery metadata level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.mingpaMingliStudyObservedInTitle).toBe(true);
    expect(c.catalogScopeSignal.duanJianyeLineageObservedInTitle).toBe(true);
    expect(c.catalogScopeSignal.palaceHostGuestTenGodOperationalRelevanceIsDiscoveryOnly).toBe(true);
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('records strict no-bypass and no-stitching boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8SonGuha2020AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact permanent material', () => {
    const report = buildRelationshipSpouseT8SonGuha2020AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_son_guha_2020_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
