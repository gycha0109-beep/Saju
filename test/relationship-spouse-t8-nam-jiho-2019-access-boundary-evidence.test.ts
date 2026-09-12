import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8NamJiho2019AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-nam-jiho-2019-access-boundary-evidence.js';

describe('Relationship spouse T8 Nam Jiho 2019 access boundary evidence', () => {
  test('pins exact scholarly identity and disposable acquisition disposition', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('남직호');
    expect(c.publicationYear).toBe(2019);
    expect(c.title).toBe('宮合과 離婚에 미치는 命理변수의 영향');
    expect(c.school).toBe('국제뇌교육종합대학원대학교 동양학과');
    expect(c.rissId).toBe('T15169258');
    expect(c.rissControlNo).toBe('c357150c3e5609c7ffe0bdc3ef48d419');
    expect(c.nationalLibraryLocalBibno).toBe('KDM201955654');
    expect(c.disposableAcquisitionPr).toBe(435);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('89b90edc7970ff27fcd1a880f41f92960c6f97ca');
  });

  test('pins exact acquisition gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.acquisitionRunId).toBe(34548857316);
    expect(c.acquisitionArtifactId).toBe(10180055145);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:5ba6c302063baaf1faf39233ce52ba5249abca69abe1dd3b14db50d3e847ec27',
    );
    expect(c.ciRunId).toBe(34548857228);
    expect(c.pccRunId).toBe(34548857217);
    expect(c.pieRunId).toBe(34548861778);
  });

  test('pins exact RISS fulltext tuple and dispatcher response', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'c357150c3e5609c7ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'b51fa0b5ced94fec',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherContentType).toBe('text/html; charset=utf-8');
    expect(c.rissDispatcherResponseBytes).toBe(7_917);
    expect(c.rissDispatcherResponseSha256).toBe(
      '723808b5411314cf818eb839799bd9f1b761e04239e55153a383675f358aff6b',
    );
  });

  test('freezes exact UBE TLS verification boundary without weakening TLS', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissAuthoredDcollectionUrl).toBe(
      'http://ube.dcollection.net/common/orgView/200000182751',
    );
    expect(c.dcollectionHost).toBe('ube.dcollection.net');
    expect(c.dcollectionSiteAuthoredItemId).toBe('200000182751');
    expect(c.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(c.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(c.tlsVerificationDisabled).toBe(false);
  });

  test('preserves no-bypass no-body and metadata boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8NamJiho2019AccessBoundaryEvidence();
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
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
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8NamJiho2019AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION',
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_nam_jiho_2019_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
