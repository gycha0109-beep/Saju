import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimInsun2010AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-insun-2010-access-boundary-evidence.js';

describe('Relationship spouse T8 Kim Insun 2010 access boundary evidence', () => {
  test('pins current RISS self-record thesis identity', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('김인순');
    expect(c.publicationYear).toBe(2010);
    expect(c.title).toBe('命理學의 宮合論 硏究');
    expect(c.titleKorean).toBe('명리학의 궁합론 연구');
    expect(c.school).toBe('동방대학원대학교');
    expect(c.degreeType).toBe('국내석사');
    expect(c.rissId).toBe('T12315524');
    expect(c.rissControlNo).toBe('49561f47589d9efaffe0bdc3ef48d419');
    expect(c.identityResolution.searchCardMetadata).toBe('김인순 동방대학원대학교 2010 국내석사');
  });

  test('freezes the 2011 to 2010 identity correction boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.yearCorrectionProvenance.supersededDisposablePr).toBe(448);
    expect(c.yearCorrectionProvenance.supersededSecondaryCitationYear).toBe(2011);
    expect(c.yearCorrectionProvenance.currentRissSelfRecordYear).toBe(2010);
    expect(c.yearCorrectionProvenance.supersededPrClosedUnmerged).toBe(true);
    expect(c.yearCorrectionProvenance.finalAcquisitionIndependentlyResolvedCurrentRissCard).toBe(true);
    expect(c.yearCorrectionProvenance.correctionRule).toBe(
      'CURRENT_RISS_SELF_RECORD_YEAR_OVERRIDES_SECONDARY_REFERENCE_YEAR_FOR_IDENTITY_RESOLUTION',
    );
  });

  test('pins final disposable acquisition gates and artifact', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(449);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('312eae0e019e3580fa899cf21b356754af4eedbb');
    expect(c.acquisitionRunId).toBe(34685130258);
    expect(c.acquisitionArtifactId).toBe(10295408468);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:db99a0781a2b09daf3ad33539541b9679901c57fcc7f4bc4bed7ff7ef575a9b4',
    );
    expect(c.ciRunId).toBe(34685130248);
    expect(c.pccRunId).toBe(34685130357);
    expect(c.pieRunId).toBe(34685130630);
  });

  test('pins content-addressed RISS search detail and dispatcher responses', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(192_857);
    expect(c.identityResolution.searchResponseSha256).toBe(
      'f86efa502172001250f8956839928aebafb6a8172ef79161e69f4b41571cc160',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(217_425);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '0f2686da1aa4228c7c814a86d827c621ae199bc250f2d3ee3f3161605ab1ccae',
    );
    expect(c.rissDispatcherHttpStatus).toBe(500);
    expect(c.rissDispatcherResponseBytes).toBe(1_432);
    expect(c.rissDispatcherResponseSha256).toBe(
      '91c06d7663066163247ba0e4073d9eaf066e29bb31d18d5acc9de5c695c89918',
    );
  });

  test('pins exact current form tuple and no public body route', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: '49561f47589d9efaffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: '',
    });
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissDispatcherDcollectionRouteObserved).toBe(false);
    expect(c.rissDispatcherRelevantPublicBodyRouteObserved).toBe(false);
  });

  test('preserves no-bypass no-body and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.guessedOpaqueIdentifierCount).toBe(0);
    expect(c.loginBypass).toBe(false);
    expect(c.institutionAuthBypass).toBe(false);
    expect(c.paywallBypass).toBe(false);
    expect(c.drmRequestExecuted).toBe(false);
    expect(c.decryptionActionExecuted).toBe(false);
    expect(c.tlsVerificationDisabled).toBe(false);
    expect(c.crossSourceSemanticStitching).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
  });

  test('keeps exact two-of-five authority ledger and production HOLD', () => {
    const report = buildRelationshipSpouseT8KimInsun2010AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8KimInsun2010AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_insun_2010_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_SECURITY_BYPASS_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
