import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-shin-youngho-2019-access-boundary-evidence.js';

describe('Relationship spouse T8 Shin Youngho 2019 access boundary evidence', () => {
  test('pins exact thesis identity and site-authored school label', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('신영호');
    expect(c.publicationYear).toBe(2019);
    expect(c.title).toBe('『命理約言』의 知命體系 硏究');
    expect(c.school).toBe('동방문화대학원대학교');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T15099926');
    expect(c.rissControlNo).toBe('d08ee38324aa6aeaffe0bdc3ef48d419');
    expect(c.nationalLibraryLocalBibno).toBe('KDM201938404');
    expect(c.identityResolution.searchCardMetadata).toBe('신영호 東方文化大學院大學校 2019 국내박사');
    expect(c.identityResolution.normalizedSchoolLabel).toBe('동방문화대학원대학교');
    expect(c.identityResolution.siteAuthoredSchoolLabel).toBe('東方文化大學院大學校');
  });

  test('pins superseded initial head and validated exact-head provenance', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(482);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.supersededFailedAcquisitionHead).toBe('54c65993dae82f074a174d4adeb6b0a372ca30ff');
    expect(c.acquisitionExactHead).toBe('12e9ce0a794db6b1f7f53b409672a5f4fc017b2d');
    expect(c.acquisitionRunId).toBe(34707142999);
    expect(c.acquisitionArtifactId).toBe(10301937071);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:3b963ba813905651925d308a93777f395c032f12ce3806d556a39a9255131136',
    );
    expect(c.ciRunId).toBe(34707143072);
    expect(c.pccRunId).toBe(34707143000);
    expect(c.pieRunId).toBe(34707143444);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(187_480);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '06b5835fe17a09333450768c270a716987773592edcc7fa52a4ae7dfc7745f21',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(257_825);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'cb1d6d7721ce330231971f197e026f1c8909a86cd9c238ccd2d643e021c240cd',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_093);
    expect(c.rissDispatcherResponseSha256).toBe(
      'ec78ef8458f6e7fbe98531aa412fef699be6c636985a9dbdd81a7bbd3e733f91',
    );
  });

  test('pins exact fulltext tuple and strict TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'd08ee38324aa6aeaffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.identityResolution.searchCardPublicOriginalLabelObserved).toBe(true);
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissAuthoredDcollectionUrl).toBe(
      'http://dongbang.dcollection.net/common/orgView/200000198616',
    );
    expect(c.dcollectionHost).toBe('dongbang.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000198616');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toContain('CERTIFICATE_VERIFY_FAILED');
  });

  test('keeps Yukchin metadata at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.yukchinSystemDiscussionObservedInPublicMetadata).toBe(true);
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('records strict no-bypass and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidence();
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
      RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CONTROL_IDS,
    );
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_shin_youngho_2019_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
