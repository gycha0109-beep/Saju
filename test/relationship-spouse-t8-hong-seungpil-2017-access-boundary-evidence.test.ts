import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8HongSeungpil2017AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-hong-seungpil-2017-access-boundary-evidence.js';

describe('Relationship spouse T8 Hong Seungpil 2017 access boundary evidence', () => {
  test('pins exact scholarly identity and disposable acquisition disposition', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('홍승필');
    expect(candidate.publicationYear).toBe(2017);
    expect(candidate.title).toBe('『자평진전』에 기초한 궁합실관 연구');
    expect(candidate.school).toBe('공주대학교 대학원 동양학과');
    expect(candidate.rissId).toBe('T14388745');
    expect(candidate.rissControlNo).toBe('8ebdb4487e4de984ffe0bdc3ef48d419');
    expect(candidate.disposableAcquisitionPr).toBe(431);
    expect(candidate.acquisitionPrClosedUnmerged).toBe(true);
    expect(candidate.acquisitionExactHead).toBe('6924d2e4ce0f2de20fce3e6364d5def4060b5ed6');
  });

  test('pins final successful acquisition gates and artifact', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.acquisitionRunId).toBe(34543130721);
    expect(candidate.acquisitionArtifactId).toBe(10178025781);
    expect(candidate.acquisitionArtifactDigest).toBe(
      'sha256:11e7325b4537999a78171ad21165ead321f72aca9b0371fd56bddcd1e5b0e26d',
    );
    expect(candidate.ciRunId).toBe(34543130773);
    expect(candidate.pccRunId).toBe(34543130704);
    expect(candidate.pieRunId).toBe(34543131227);
  });

  test('preserves the exact observed RISS form values without inventing fulltext_kind', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.rissFulltextTuple).toEqual({
      control_no: '8ebdb4487e4de984ffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: '',
    });
    expect(candidate.rissSiteAuthoredDispatcherObserved).toBe(true);
  });

  test('freezes the exact Kongju TLS verification boundary without weakening TLS', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.rissAuthoredDcollectionUrl).toBe(
      'https://kongju.dcollection.net/common/orgView/200000999222',
    );
    expect(candidate.dcollectionHost).toBe('kongju.dcollection.net');
    expect(candidate.dcollectionSiteAuthoredItemId).toBe('200000999222');
    expect(candidate.dcollectionTlsCertificateVerificationFailed).toBe(true);
    expect(candidate.dcollectionTlsError).toMatch(/CERTIFICATE_VERIFY_FAILED/);
    expect(candidate.dcollectionTlsError).toMatch(/unable to get local issuer certificate/);
    expect(candidate.tlsVerificationDisabled).toBe(false);
    expect(candidate.exactBoundary).toMatch(/TLS verification was not disabled/i);
  });

  test('preserves no-bypass, no-body, and no-stitching invariants', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE;
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
    expect(candidate.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('chains from Lee Changim without changing the accepted two-of-five ledger', () => {
    const report = buildRelationshipSpouseT8HongSeungpil2017AccessBoundaryEvidence();
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

  test('keeps all production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8HongSeungpil2017AccessBoundaryEvidence();
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CONTROL_IDS.length,
    );
  });

  test('is content-addressed from the exact material', () => {
    const report = buildRelationshipSpouseT8HongSeungpil2017AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION',
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_hong_seungpil_2017_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
