import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimYoungsook2026AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-youngsook-2026-access-boundary-evidence.js';

describe('Relationship spouse T8 Kim Youngsook 2026 access boundary evidence', () => {
  test('pins exact thesis identity from the current RISS result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('김영숙');
    expect(c.publicationYear).toBe(2026);
    expect(c.title).toBe('『命理正宗』에 수록된 십성의 고찰과 청대 명리의 십성 변화 연구');
    expect(c.school).toBe('국제뇌교육종합대학원대학교 전문대학원');
    expect(c.degreeType).toBe('국내박사');
    expect(c.rissId).toBe('T17373814');
    expect(c.rissControlNo).toBe('e44042b5aaee7559ffe0bdc3ef48d419');
    expect(c.identityResolution.searchCardMetadata).toBe(
      '김영숙 국제뇌교육종합대학원대학교 전문대학원 2026 국내박사',
    );
  });

  test('pins exact acquisition head artifact and exact-head gates', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(474);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('787795a8f688c9fcf098955dee23eb07c36e95b2');
    expect(c.acquisitionRunId).toBe(34700906024);
    expect(c.acquisitionArtifactId).toBe(10300402378);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:68caeb72e50a672e6d668e9fe81ad781d78b05cf7bd305cb861565f89bb247f6',
    );
    expect(c.ciRunId).toBe(34700905978);
    expect(c.pccRunId).toBe(34700905980);
    expect(c.pieRunId).toBe(34700906322);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(188_960);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'a979110c245adeeb214d1210a6775f026402d5765873e14f332045e4caec7da6',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(242_298);
    expect(c.identityResolution.detailResponseSha256).toBe(
      'd2f08c0f33f1cdbc20e3c8a8e7a52b1a7e25451ef11a28e44e66f20abbaa2d87',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_330);
    expect(c.rissDispatcherResponseSha256).toBe(
      '7d4abe33ed39ec86c6696dff5daea64df35b4c34f80533a30f3c184024fdc30d',
    );
  });

  test('pins exact fulltext tuple and RISS-authored UBE dCollection route', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'e44042b5aaee7559ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.identityResolution.searchCardPublicOriginalLabelObserved).toBe(true);
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissAuthoredDcollectionUrl).toBe('http://ube.dcollection.net/common/orgView/200000946822');
    expect(c.dcollectionHost).toBe('ube.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000946822');
  });

  test('stops at strict TLS verification without bypass', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toContain('CERTIFICATE_VERIFY_FAILED');
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
  });

  test('keeps title and abstract scope at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.historicalTenStarChangeStudyObserved).toBe(true);
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8KimYoungsook2026AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8KimYoungsook2026AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_KIM_YOUNGSOOK_2026_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_youngsook_2026_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
