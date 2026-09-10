import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence } from '../src/research/relationship-spouse-t8-go-jaemin-2016-gender-conditioned-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8JuMikang2014DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-ju-mikang-2014-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Ju Mikang 2014 direct-body boundary evidence', () => {
  test('pins exact scholarly, RISS, dCollection, and acquisition identity', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('주미강');
    expect(candidate.publicationYear).toBe(2014);
    expect(candidate.title).toBe('자평사주 궁합론 연구');
    expect(candidate.institution).toBe('동방문화대학원대학교');
    expect(candidate.rissId).toBe('T13562621');
    expect(candidate.rissControl).toBe('25a5a7cc644554ffffe0bdc3ef48d419');
    expect(candidate.dcollectionItemId).toBe('000001771167');
    expect(candidate.directBodyAcquisitionPr).toBe(423);
    expect(candidate.acquisitionExactHead).toBe('f6419f7148f63b3452d90d1d96900d1cadf2c564');
    expect(candidate.acquisitionRunId).toBe(34502535904);
    expect(candidate.acquisitionArtifactId).toBe(10162469833);
    expect(candidate.acquisitionArtifactDigest).toBe(
      'sha256:6ac6a0ec4dfb2b5a01525caffadfe6b1cc35261b4f375ee232be9a8eb24a2ca8',
    );
  });

  test('pins the exact public route, content address, and no-bypass boundary', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.rissReturnedDcollectionUri).toContain('sItemId=000001771167');
    expect(candidate.dcollectionCanonicalItemUrl).toBe(
      'https://dongbang.dcollection.net/common/orgView/000001771167',
    );
    expect(candidate.dcollectionAuthoredPublicPdfUrl).toContain('/public_resource/pdf/000001771167_');
    expect(candidate.rissCandidatePageAuthoredPostContractsFollowed).toBe(true);
    expect(candidate.rissReturnedDcollectionUriFollowedWithoutIdentifierGuessing).toBe(true);
    expect(candidate.transportTlsVerificationDisabledOnlyForExactPublicRoute).toBe(true);
    expect(candidate.loginBypass).toBe(false);
    expect(candidate.institutionAuthBypass).toBe(false);
    expect(candidate.paywallBypass).toBe(false);
    expect(candidate.drmRequestExecuted).toBe(false);
    expect(candidate.decryptionActionExecuted).toBe(false);
    expect(candidate.accessControlBypass).toBe(false);
    expect(candidate.pdfSha256).toBe('9fb06e04fb32c31b763a4b8c6a90c3f5a49fbbf401471fb2bcb6cd59d1ddf32a');
    expect(candidate.pdfBytes).toBe(1_684_972);
    expect(candidate.pdfPageCount).toBe(85);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.allPdfPagesRenderedBeforeSemanticJudgment).toBe(true);
  });

  test('pins decisive rendered physical PDF page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.physicalPdfPageMap).toContainEqual({
      physicalPdfPage: 52,
      printedPage: 38,
      topic:
        'Yukshin compatibility explicitly maps female-native Officer to husband and male-native Wealth to wife before comparing those spouse stars with the partner',
    });
    expect(candidate.physicalPdfPageMap).toContainEqual({
      physicalPdfPage: 81,
      printedPage: 67,
      topic:
        'the conclusion requires male and female spouse stars Officer and Wealth in spouse palace for the ideal case and explicitly adds Daewoon and Sewoon fortune flow to compatibility judgment',
    });
    expect(candidate.physicalPdfPageMap).toContainEqual({
      physicalPdfPage: 82,
      printedPage: 68,
      topic:
        'modernization discussion weakens selected gender conventions but still uses differentiated male and female relationship-role structures and publishes no neutral replacement spouse selector',
    });
  });

  test('preserves the integrated operational method while rejecting role-neutral promotion', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.dayBranchSpousePalaceOperationalLayerExplicit).toBe(true);
    expect(candidate.gungwiYukshinYongshinIntegratedOperationalMethodExplicit).toBe(true);
    expect(candidate.maleFemaleDyadicChartComparisonExplicit).toBe(true);
    expect(candidate.femaleNativeOfficerAsHusbandSpouseStarExplicit).toBe(true);
    expect(candidate.maleNativeWealthAsWifeSpouseStarExplicit).toBe(true);
    expect(candidate.sexConditionedPartnerSelectionRuleExplicit).toBe(true);
    expect(candidate.fortuneFlowDaewoonSewoonRequiredForCompleteCompatibilityJudgment).toBe(true);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.singleNativeNatalFactsOnlyCompleteMethodFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
  });

  test('preserves the modernization tension without inventing a neutral replacement selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.modernizationAndReestablishmentRequested).toBe(true);
    expect(candidate.yinYangDayStemGenderDistinctionWeakeningObserved).toBe(true);
    expect(candidate.modernizationPublishesNeutralReplacementSelector).toBe(false);
    expect(candidate.modernizationBoundary).toMatch(/no operational replacement/i);
  });

  test('chains from Go Jaemin 2016 without changing the accepted two-of-five ledger', () => {
    const upstream = buildRelationshipSpouseT8GoJaemin2016GenderConditionedBoundaryEvidence();
    const report = buildRelationshipSpouseT8JuMikang2014DirectBodyBoundaryEvidence();
    expect(upstream.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_GENDER_CONDITIONED_SPOUSE_MAPPING_WITHOUT_ROLE_NEUTRAL_NATAL_SELECTOR',
    );
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(true);
    expect(report.integratedCompatibilityMethodConfirmed).toBe(true);
    expect(report.sexConditionedSpouseMappingConfirmed).toBe(true);
    expect(report.dyadicAndFortuneFlowInputConfirmed).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(2);
    expect(report.authorityGapsOpenCount).toBe(3);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
  }, 20_000);

  test('keeps no-stitching and all producer and production gates fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8JuMikang2014DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Go Jaemin 2016/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length);
  }, 20_000);

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8JuMikang2014DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8JuMikang2014DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_JU_MIKANG_2014_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_INTEGRATED_COMPATIBILITY_METHOD_WITH_SEX_CONDITIONED_SPOUSE_STARS_DYADIC_AND_FORTUNE_FLOW_INPUT',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_ju_mikang_2014_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  }, 20_000);
});
