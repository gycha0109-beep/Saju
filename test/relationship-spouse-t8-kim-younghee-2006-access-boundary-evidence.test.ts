import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimYounghee2006AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-younghee-2006-access-boundary-evidence.js';

describe('Relationship spouse T8 Kim Younghee 2006 access boundary evidence', () => {
  test('pins exact thesis identity from the RISS search-result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('김영희');
    expect(c.publicationYear).toBe(2006);
    expect(c.title).toBe('宮合理論硏究');
    expect(c.school).toBe('공주대학교 대학원');
    expect(c.degreeType).toBe('국내석사');
    expect(c.rissId).toBe('T10989354');
    expect(c.rissControlNo).toBe('1e310f1b3e5a7214ffe0bdc3ef48d419');
    expect(c.identityResolution.source).toBe('CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD');
    expect(c.identityResolution.searchCardMetadata).toContain('김영희');
    expect(c.identityResolution.searchCardMetadata).toContain('2006');
    expect(c.identityResolution.searchCardMetadata).toContain('국내석사');
  });

  test('rejects the earlier false positive and fail-closed runs', () => {
    const h = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE.acquisitionCorrectionHistory;
    expect(h.run1DiscardedFalsePositive).toBe(true);
    expect(h.run1FalsePositiveReason).toMatch(/LEE_SUDONG_2023_ARTICLE/);
    expect(h.run2DiscardedFailClosed).toBe(true);
    expect(h.run3DiscardedFailClosed).toBe(true);
    expect(h.finalRunNumber).toBe(4);
    expect(h.finalResolutionAuthority).toBe('EXACT_SITE_AUTHORED_THESIS_SEARCH_RESULT_CARD');
  });

  test('pins final disposable acquisition gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(443);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('a4d9d846d359071ab333da1eed262dcdd5fa099b');
    expect(c.acquisitionRunId).toBe(34683340442);
    expect(c.acquisitionArtifactId).toBe(10294338068);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:3206bc72e20be4ff23eaac5c6ccfaaac5614e88f6a762774be54f8ebfc2829f8',
    );
    expect(c.ciRunId).toBe(34683340443);
    expect(c.pccRunId).toBe(34683340444);
    expect(c.pieRunId).toBe(34683340725);
  });

  test('pins content-addressed RISS search detail and dispatcher responses', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(204_142);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'c1d788981c765304655e722238923aac9da8ef4a3fcb1b09f31c3edb6b981e81',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(210_836);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '26db2be61a0853010c81efd3dfb449ce2336063e7f947f722ac4f704c5031dd9',
    );
    expect(c.rissDispatcherResponseBytes).toBe(7_803);
    expect(c.rissDispatcherResponseSha256).toBe(
      '422b90a7c32d4f7f6e300891e6f4dcaf205a6d0d8a3ecec62320b6a8f9ae26c5',
    );
  });

  test('pins exact fulltext tuple and Kongju TLS boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '1e310f1b3e5a7214ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissAuthoredDcollectionUrl).toBe('https://kongju.dcollection.net/common/orgView/200000993078');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000993078');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('preserves no-bypass no-body and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8KimYounghee2006AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8KimYounghee2006AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_younghee_2006_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
