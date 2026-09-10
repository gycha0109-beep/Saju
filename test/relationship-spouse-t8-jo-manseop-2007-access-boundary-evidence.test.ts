import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-jo-manseop-2007-access-boundary-evidence.js';

describe('Relationship spouse T8 Jo Manseop 2007 access boundary evidence', () => {
  test('pins exact scholarly identity and disposable acquisition disposition', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('조만섭');
    expect(candidate.publicationYear).toBe(2007);
    expect(candidate.title).toBe('명리이론과 궁합의 상관관계 연구');
    expect(candidate.school).toBe('경기대학교 국제·문화대학원');
    expect(candidate.nanetControlNo).toBe('KDMT1200725555');
    expect(candidate.catalogExtent).toBe('vi, 135 p.');
    expect(candidate.disposableAcquisitionPr).toBe(425);
    expect(candidate.acquisitionPrClosedUnmerged).toBe(true);
    expect(candidate.acquisitionExactHead).toBe('609d05c622cf908a26505e6e1a362ea4f9634d8c');
  });

  test('pins exact successful metadata acquisition and preserves catalog/reader page provenance separately', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.acquisitionRunId).toBe(34514260820);
    expect(candidate.acquisitionArtifactId).toBe(10167029281);
    expect(candidate.acquisitionArtifactDigest).toBe(
      'sha256:3a8d4812fab74e7427dfebf732fa89c721c69b9759b5adf2a874ca51d5cade3e',
    );
    expect(candidate.boundedDocInfoRequestSucceeded).toBe(true);
    expect(candidate.docInfoHttpStatus).toBe(200);
    expect(candidate.docInfoResponseBytes).toBe(11_228);
    expect(candidate.docInfoResponseSha256).toBe(
      '7fce958d13aa2f44dec1526e62b634b4454b73c7e13d608ced7a7879542302ee',
    );
    expect(candidate.docInfoFilename).toBe('KDMT1200725555.pdf.docinfo.json');
    expect(candidate.docInfoPhysicalPageCount).toBe(145);
    expect(candidate.docInfoMetaAuthor).toBe('조만섭');
    expect(candidate.docInfoMetaTitle).toBe('명리이론과 궁합의 상관관계 연구');
    expect(candidate.catalogExtent).not.toBe(`${candidate.docInfoPhysicalPageCount} p.`);
  });

  test('keeps manifest topic locators as relevance only and not body evidence', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.docInfoTopicLocators).toEqual([
      '남자와 여자의 사주 분석 방법',
      '명리학과 부부관계 활용법',
      '궁합',
      '사주로 보는 궁합법',
    ]);
    expect(candidate.topicRelevanceEstablishedAtManifestLevel).toBe(true);
    expect(candidate.manifestTopicLocatorsTreatedAsBodyEvidence).toBe(false);
    expect(candidate.completePdfAcquired).toBe(false);
    expect(candidate.candidatePdfPresent).toBe(false);
    expect(candidate.completePdfRendered).toBe(false);
    expect(candidate.directBodySemanticReviewPerformed).toBe(false);
    expect(candidate.bodyLevelAdmissionDecisionMade).toBe(false);
  });

  test('freezes the encrypted reader request-transform boundary without bypass', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE;
    expect(candidate.serverIssuedReaderCertIdUsedWithoutGuessing).toBe(true);
    expect(candidate.readerUseSec).toBe(true);
    expect(candidate.drmRequestSecurityTransformObserved).toBe(true);
    expect(candidate.drmRequestTransform).toMatch(/encrypted-token POST/i);
    expect(candidate.encryptedRequestTokenGenerated).toBe(false);
    expect(candidate.protectedPagePayloadDecryptedOrUnwrapped).toBe(false);
    expect(candidate.directProtectedInfoOrPageEndpointBypassAttempted).toBe(false);
    expect(candidate.loginGatedDownloadRouteUsed).toBe(false);
    expect(candidate.alternateOpaqueDocumentOrPageIdentifiersGuessed).toBe(false);
    expect(candidate.exactBoundary).toMatch(/no body-level semantic admission decision/i);
  });

  test('chains from Nam/Kim without changing the accepted two-of-five ledger', () => {
    const report = buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence();
    expect(report.upstreamEvidenceId.length).toBeGreaterThan(0);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.manifestMetadataInspected).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/Nam\/Kim 2018/i);
    expect(candidate.noStitchingBoundary).toMatch(/Lee Sangcheon 2017/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CONTROL_IDS.length);
  });

  test('is content-addressed from the exact material', () => {
    const report = buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence();
    const { evidenceId, ...material } = report;
    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('ACCESS_SECURITY_TRANSFORM_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION');
    expect(evidenceId).toBe(
      `relationship_spouse_t8_jo_manseop_2007_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(report.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_CROSS_SOURCE_STITCHING_OR_PROTECTED_READER_BYPASS',
    );
  });
});
