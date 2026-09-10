import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-choi-eunkyung-2013-access-boundary-evidence.js';

describe('Relationship spouse T8 Choi Eunkyung 2013 access boundary evidence', () => {
  test('pins exact scholarly identity and disposable acquisition disposition', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('최은경');
    expect(candidate.publicationYear).toBe(2013);
    expect(candidate.title).toBe('命理學 六親論의 傷官에 관한 硏究');
    expect(candidate.school).toBe('원광대학교 동양학대학원');
    expect(candidate.rissId).toBe('T13097800');
    expect(candidate.rissControlNo).toBe('a2d2aa37279fbaaaffe0bdc3ef48d419');
    expect(candidate.disposableAcquisitionPr).toBe(427);
    expect(candidate.acquisitionPrClosedUnmerged).toBe(true);
    expect(candidate.acquisitionExactHead).toBe('b39fd06aa1d0ce7b7855040305f7b63e05bf856c');
  });

  test('pins exact successful acquisition gates and artifact', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.acquisitionRunId).toBe(34530063646);
    expect(candidate.acquisitionArtifactId).toBe(10173140266);
    expect(candidate.acquisitionArtifactDigest).toBe(
      'sha256:fafca5141769d495b3f671fdf366f4cfcc62cfcc9a720fee3ac66828c7fee4c4',
    );
    expect(candidate.ciRunId).toBe(34530063651);
    expect(candidate.pccRunId).toBe(34530063714);
    expect(candidate.pieRunId).toBe(34530064571);
  });

  test('pins exact RISS fulltext tuple and authored Downloading response', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.rissFulltextTuple).toEqual({
      control_no: 'a2d2aa37279fbaaaffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(candidate.rissOriginalCheckContractObserved).toBe(true);
    expect(candidate.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(candidate.rissDownloadingRouteObserved).toBe(true);
    expect(candidate.rissDownloadingHttpStatus).toBe(200);
    expect(candidate.rissDownloadingContentType).toBe('text/html; charset=utf-8');
    expect(candidate.rissDownloadingResponseBytes).toBe(3_053);
    expect(candidate.rissDownloadingResponseSha256).toBe(
      'ee69b793c7f796279516d872addd7d241b398fc7626e1bc4f40d530209160fa3',
    );
    expect(candidate.rissDownloadingDirectPdfAcquired).toBe(false);
  });

  test('freezes the exact Wonkwang TLS verification boundary without weakening TLS', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.rissAuthoredDcollectionUrl).toBe(
      'http://wonkwang.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000001991979',
    );
    expect(candidate.dcollectionHost).toBe('wonkwang.dcollection.net');
    expect(candidate.dcollectionSiteAuthoredItemId).toBe('000001991979');
    expect(candidate.dcollectionRedirectedToHttps).toBe(true);
    expect(candidate.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(candidate.tlsVerificationDisabled).toBe(false);
    expect(candidate.exactBoundary).toMatch(/certificate chain/i);
    expect(candidate.exactBoundary).toMatch(/TLS verification was not disabled/i);
  });

  test('preserves no-bypass and no-body invariants', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.guessedOpaqueIdentifierCount).toBe(0);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
    expect(candidate.crossSourceSemanticStitching).toBe(false);
    expect(candidate.completePdfAcquired).toBe(false);
    expect(candidate.directBodySemanticReviewPerformed).toBe(false);
    expect(candidate.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(candidate.abstractSexConditionedSignalTreatedAsBodyEvidence).toBe(false);
  });

  test('chains from Jo Manseop without changing the accepted two-of-five ledger', () => {
    const report = buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence();
    expect(report.upstreamEvidenceId.length).toBeGreaterThan(0);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.exactPublicIdentityAndRouteInspected).toBe(true);
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
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps no-stitching and all production gates fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/Jo Manseop 2007/i);
    expect(candidate.noStitchingBoundary).toMatch(/Nam\/Kim 2018/i);
    expect(candidate.noStitchingBoundary).toMatch(/Lee Sangcheon 2017/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CONTROL_IDS.length);
  });

  test('is content-addressed from the exact material', () => {
    const report = buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION',
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_choi_eunkyung_2013_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
