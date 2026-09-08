import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-lee-sudong-public-access-boundary-evidence.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from '../src/research/relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

describe('Relationship spouse T8 Lee Sudong public access boundary evidence', () => {
  test('pins scholarly identity and the exact acquisition evidence', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.kciArticleId).toBe('ART002630397');
    expect(candidate.doi).toBe('10.33645/cnc.2020.09.42.9.755');
    expect(candidate.kyoboArticleBarcode).toBe('4010027924050');
    expect(candidate.rissId).toBe('A107064519');
    expect(candidate.dbpiaNodeId).toBe('NODE11887585');
    expect(candidate.bibliographicPages).toBe('755-780');
    expect(candidate.expectedPhysicalPages).toBe(26);
    expect(candidate.acquisitionPrNumber).toBe(366);
    expect(candidate.acquisitionExactHead).toBe('e104293da63cc0cafab81847e331b358656cd012');
    expect(candidate.acquisitionRunId).toBe(34_174_079_993);
    expect(candidate.acquisitionArtifactId).toBe(10_036_659_558);
  });

  test('pins the one-page KCI preview without calling it direct-body authority', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.kciPreviewSha256).toBe('4348a037c0511debf6dfddf82502e7535967d798c8b95dac50710148780801b5');
    expect(candidate.kciPreviewBytes).toBe(417_988);
    expect(candidate.kciPreviewPageCount).toBe(1);
    expect(candidate.kciPreviewEncrypted).toBe(true);
    expect(candidate.kciPreviewTextHealthy).toBe(true);
    expect(candidate.previewOnlyEvidence).toBe(true);
    expect(candidate.directFullBodyInspected).toBe(false);
    expect(candidate.publicFullLengthPdfAcquired).toBe(false);
  });

  test('preserves the public access boundary across KCI, Kyobo, and DBpia', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.kciFullOriginalPubliclyAvailable).toBe(false);
    expect(candidate.kciOriginalBoundaryMessage).toBe('공개되지 않은 원문입니다.');
    expect(candidate.kyoboPublicPdfRouteExposed).toBe(false);
    expect(candidate.dbpiaDetailExposesReadCall).toBe(true);
    expect(candidate.dbpiaDetailExposesDownloadCall).toBe(true);
    expect(candidate.dbpiaViewerJavascriptExposesStandardViewerShape).toBe(true);
    expect(candidate.dbpiaUnauthenticatedFulltextGateExplicit).toBe(true);
    expect(candidate.dbpiaLoginGateExplicit).toBe(true);
    expect(candidate.dbpiaInstitutionAuthenticationGateExplicit).toBe(true);
    expect(candidate.dbpiaPurchaseGateExplicit).toBe(true);
    expect(candidate.exactAccessBoundary).toMatch(/login, institutional-authentication, and purchase gates/i);
  });

  test('preserves natal relevance without inventing a body-level verdict', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.previewExplicitlyFramesResearchAsInnateNatal).toBe(true);
    expect(candidate.previewExplicitlyDefinesYukchinIncludingSpouseAsWifeHusband).toBe(true);
    expect(candidate.abstractDiscoveryMentionsSpousePalaceAndGyeokgukYongshin).toBe(true);
    expect(candidate.roleNeutralNatalSelectorFound).toBe(false);
    expect(candidate.roleNeutralNatalSelectorAbsenceProven).toBe(false);
    expect(candidate.roleNeutralNatalSelectorStatus).toBe('NOT_ESTABLISHED_DUE_TO_DIRECT_BODY_ACCESS_BOUNDARY');
    expect(candidate.completeRoleNeutralNatalInputContractEstablished).toBe(false);
    expect(candidate.exactSemanticBoundary).toMatch(/does not claim that Lee Sudong 2020 lacks/i);
  });

  test('chains from the accepted two-of-five state and leaves all three gaps open', () => {
    const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
    const report = buildRelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidence();
    expect(report.upstreamReviewId).toBe(upstream.reviewId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.bodyLevelRoleNeutralSelectorEstablished).toBe(false);
    expect(report.bodyLevelRoleNeutralSelectorAbsenceEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  });

  test('keeps gated-access, stitching, and production boundaries fail-closed', () => {
    const report = buildRelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidence();
    const candidate = RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE;
    expect(report.gatedAccessBypassAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Lee Youngeun, Lee Ockhwa, Lee Myengjae, Hong Yooseon/i);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(20);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidence();
    const second = buildRelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_EVIDENCE_VERSION);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_lee_sudong_public_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_SCHOLARLY_DISCOVERY_FOR_PUBLICLY_INSPECTABLE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING',
    );
  });
});
