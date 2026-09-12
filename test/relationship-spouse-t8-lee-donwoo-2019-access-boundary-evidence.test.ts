import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-donwoo-2019-access-boundary-evidence.js';

describe('Relationship spouse T8 Lee Donwoo 2019 access boundary evidence', () => {
  test('pins exact thesis identity and acquisition provenance', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('이돈우');
    expect(c.publicationYear).toBe(2019);
    expect(c.title).toBe('古典 『命理約言』 이론 硏究');
    expect(c.school).toBe('국제뇌교육종합대학원대학교');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T15169251');
    expect(c.rissControlNo).toBe('5bc6b703fc5455b2ffe0bdc3ef48d419');
    expect(c.nationalLibraryLocalBibno).toBe('KDM201955652');
    expect(c.disposableAcquisitionPr).toBe(484);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('fbeb468475bf292b8a07e010a977c29a09183ad6');
    expect(c.acquisitionRunId).toBe(34708333568);
    expect(c.acquisitionArtifactId).toBe(10302686537);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:6afa5779433a9d45ef36cd313f8c37b702ee566359f21b4f947c627e84886037',
    );
    expect(c.ciRunId).toBe(34708333526);
    expect(c.pccRunId).toBe(34708333542);
    expect(c.pieRunId).toBe(34708333745);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchCardMetadata).toBe(
      '이돈우 국제뇌교육종합대학원대학교 2019 국내박사',
    );
    expect(c.identityResolution.searchResponseBytes).toBe(202_339);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'b45ea381463207b02d921a5b55fd7c7e00fcb1fc5d830dabc1f8abeafdc1f6e1',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(242_618);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '32c5aaa950de1f34e9e6dd6d3bb19e3606a0fc102573297bcd878a8ab7be7fd0',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(7_990);
    expect(c.rissDispatcherResponseSha256).toBe(
      '6a1ef9dcb84135efd577d3f10faf6a7edcf655e2b987d7066250db217beb16e4',
    );
  });

  test('pins exact fulltext tuple and strict UBE TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '5bc6b703fc5455b2ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.identityResolution.searchCardPublicOriginalLabelObserved).toBe(true);
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissAuthoredDcollectionUrl).toBe('http://ube.dcollection.net/common/orgView/200000181223');
    expect(c.dcollectionHost).toBe('ube.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000181223');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toContain('CERTIFICATE_VERIFY_FAILED');
  });

  test('keeps public Yukchin and female-fate TOC headings at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.publicTocConfucianYukchinHeadingObserved).toBe(true);
    expect(c.catalogScopeSignal.publicTocConfucianYukchinHeading).toContain('육친론');
    expect(c.catalogScopeSignal.publicTocYukchinHeadingObserved).toBe(true);
    expect(c.catalogScopeSignal.publicTocYukchinHeading).toContain('六親論');
    expect(c.catalogScopeSignal.publicTocFemaleFateHeadingObserved).toBe(true);
    expect(c.catalogScopeSignal.publicTocFemaleFateHeading).toContain('女命');
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('records strict no-bypass and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidence();
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
      RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CONTROL_IDS,
    );
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_donwoo_2019_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
