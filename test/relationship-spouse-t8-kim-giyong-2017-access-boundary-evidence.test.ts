import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8KimGiyong2017AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-kim-giyong-2017-access-boundary-evidence.js';

describe('Relationship spouse T8 Kim Giyong 2017 access boundary evidence', () => {
  test('pins exact thesis identity from the current RISS result card', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.author).toBe('김기용');
    expect(c.publicationYear).toBe(2017);
    expect(c.title).toBe('관상12궁과 사주육친의 상관성 비교고찰');
    expect(c.school).toBe('경기대학교 예술대학원');
    expect(c.degreeType).toBe('국내석사');
    expect(c.rissId).toBe('T14596182');
    expect(c.rissControlNo).toBe('c269f5bc89f6ee1cffe0bdc3ef48d419');
    expect(c.identityResolution.searchCardMetadata).toBe('김기용 경기대학교 예술대학원 2017 국내석사');
  });

  test('pins exact acquisition provenance and exact-head gates', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.disposableAcquisitionPr).toBe(478);
    expect(c.acquisitionPrClosedUnmerged).toBe(true);
    expect(c.acquisitionExactHead).toBe('f5a13d2bf8c469ad2e886d2d0b427ce41c08ba9d');
    expect(c.acquisitionRunId).toBe(34706049397);
    expect(c.acquisitionArtifactId).toBe(10301384973);
    expect(c.acquisitionArtifactDigest).toBe(
      'sha256:8061694f17980f5c69158fc0749acc17407a83fb78c82c41de827d09006064d3',
    );
    expect(c.ciRunId).toBe(34706049329);
    expect(c.pccRunId).toBe(34706049450);
    expect(c.pieRunId).toBe(34706049710);
  });

  test('pins content-addressed search detail and dispatcher surfaces', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.identityResolution.searchResponseBytes).toBe(185_262);
    expect(c.identityResolution.searchResponseSha256).toBe(
      '7329eeb7370945cfe7a45c3ee40b30be1d5ad95325d44e5195682b8b2d886dd3',
    );
    expect(c.identityResolution.detailResponseBytes).toBe(245_968);
    expect(c.identityResolution.detailResponseSha256).toBe(
      '8215d2138966871d2550042799ae41f601bad94583b32dd15f1a70dc3b2552d3',
    );
    expect(c.rissDispatcherHttpStatus).toBe(200);
    expect(c.rissDispatcherResponseBytes).toBe(8_278);
    expect(c.rissDispatcherResponseSha256).toBe(
      '83068fc6fc9310ded8819284b07a2dcde7631b730f6df0aca88f4d807441480f',
    );
  });

  test('pins exact fulltext tuple and current dispatcher no-route boundary', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.rissFulltextTuple).toEqual({
      control_no: 'c269f5bc89f6ee1cffe0bdc3ef48d419',
      p_mat_type: 'be54d9b8bc7cdb09',
      p_submat_type: 'f1a8c7a1de0e08b8',
      fulltext_kind: 'a8cb3aaead67ab5b',
    });
    expect(c.identityResolution.searchCardPublicOriginalLabelObserved).toBe(true);
    expect(c.rissSiteAuthoredDispatcherObserved).toBe(true);
    expect(c.rissDispatcherExternalPublicBodyUrls).toEqual([]);
    expect(c.rissDispatcherDisposition).toBe('RISS_DISPATCHER_NO_RELEVANT_PUBLIC_BODY_ROUTE_OBSERVED');
  });

  test('keeps public TOC spouse-palace signal at discovery level only', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE;
    expect(c.catalogScopeSignal.physiognomyTwelvePalaceAndSajuYukchinComparisonObserved).toBe(true);
    expect(c.catalogScopeSignal.publicTocSpousePalaceAndWealthStarHeadingObserved).toBe(true);
    expect(c.catalogScopeSignal.publicTocSpousePalaceAndWealthStarHeading).toBe('3) 처첩궁과 재성 118');
    expect(c.catalogScopeSignal.spouseSpecificSelectorClaimObservedAtBodyLevel).toBe(false);
    expect(c.catalogScopeSignal.admittedAsBodyLevelRoleNeutralMapping).toBe(false);
    expect(c.abstractOrMetadataTreatedAsBodyEvidence).toBe(false);
    expect(c.completePdfAcquired).toBe(false);
    expect(c.renderedPageCount).toBe(0);
    expect(c.directBodySemanticReviewPerformed).toBe(false);
    expect(c.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('records strict no-bypass and no-stitching boundaries', () => {
    const c = RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE;
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
    const report = buildRelationshipSpouseT8KimGiyong2017AccessBoundaryEvidence();
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
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CONTROL_IDS);
  });

  test('is content-addressed from exact material', () => {
    const report = buildRelationshipSpouseT8KimGiyong2017AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(evidenceId).toBe(
      `relationship_spouse_t8_kim_giyong_2017_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_OPAQUE_ID_GUESSING_OR_CROSS_SOURCE_STITCHING',
    );
  });
});
