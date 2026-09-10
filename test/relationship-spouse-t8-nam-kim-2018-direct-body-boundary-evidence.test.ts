import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence } from '../src/research/relationship-spouse-t8-lee-sangcheon-2017-equality-wealth-wife-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-nam-kim-2018-direct-body-boundary-evidence.js';

describe('Relationship spouse T8 Nam/Kim 2018 direct-body boundary evidence', () => {
  test('pins exact scholarly identity and author-hosted acquisition provenance', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.authors).toEqual(['남기동', '김만태']);
    expect(candidate.publicationYear).toBe(2018);
    expect(candidate.title).toBe('한국사회 이혼현상에 따른 부부궁합(夫婦宮合)의 명리학적 고찰');
    expect(candidate.journal).toBe('인문사회 21');
    expect(candidate.volume).toBe(9);
    expect(candidate.issue).toBe(2);
    expect(candidate.printedPages).toBe('105-116');
    expect(candidate.kciArticleId).toBe('ART002338687');
    expect(candidate.doi).toBe('10.22143/HSS21.9.2.9');
    expect(candidate.directBodyAcquisitionPr).toBe(412);
    expect(candidate.authorSourcePageUrl).toContain('wr_id=147');
    expect(candidate.authorDirectDownloadUrl).toContain('wr_id=147&no=0');
    expect(candidate.authorPageFileDownloadImplementation).toBe(
      'function file_download(link, file) { document.location.href=link; }',
    );
  });

  test('pins exact acquisition artifact and excludes the mismatching local copy', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.acquisitionExactHead).toBe('e1d964c827dc6387f98a7f4452600acdd18aec54');
    expect(candidate.acquisitionRunId).toBe(34456224870);
    expect(candidate.acquisitionArtifactId).toBe(10143572930);
    expect(candidate.acquisitionArtifactDigest).toBe(
      'sha256:abde4faae61127ee9517efffb1d5009fa1574dd4d9d9aacb2c90102366e3dc00',
    );
    expect(candidate.pdfSha256).toBe('adda4474baf27754ca25efed615bdffdc96f55726e0495d42b0e894395c475c0');
    expect(candidate.pdfBytes).toBe(557_712);
    expect(candidate.pdfPageCount).toBe(12);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfVersion).toBe('1.4');
    expect(candidate.exactArtifactPdfReextractedAndRehashed).toBe(true);
    expect(candidate.mismatchingLocalCopyExcludedFromEvidence).toBe(true);
    expect(candidate.allPdfPagesRenderedFromExactArtifactPdf).toBe(true);
    expect(candidate.materialPagesVisuallyReviewedFromExactArtifactPdf).toBe(true);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(104);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 108,
      physicalPdfPage: 4,
      topic:
        'Day Branch is treated as spouse palace and compared across partners; Yukchin theory explicitly maps male-native Wealth to wife and female-native Officer to husband',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 114,
      physicalPdfPage: 10,
      topic:
        'author synthesis explicitly ranks spouse palace above spouse star, defines Day Branch as spouse palace, and again states husband-context spouse star Wealth versus wife-context spouse star Officer',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 115,
      physicalPdfPage: 11,
      topic:
        'synthesized risk rules remain sex differentiated, including a female-specific Output/Food-God condition, and conclusion proposes counseling use without a replacement role-neutral selector',
    });
  });

  test('preserves the operational spouse-palace hierarchy as positive evidence', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.dayBranchSpousePalaceExplicit).toBe(true);
    expect(candidate.spousePalacePriorityOverSpouseStarExplicit).toBe(true);
    expect(candidate.dyadicPairwiseSpousePalaceComparisonExplicit).toBe(true);
    expect(candidate.dyadicYongshinComplementarityExplicit).toBe(true);
    expect(candidate.empiricalDivorceAndBereavementCoupleCasesExplicit).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/spouse palace is explicitly more important/i);
  });

  test('preserves sex-conditioned spouse-star semantics and dyadic input as hard blockers', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE;
    expect(candidate.maleNativeWealthAsWifeExplicit).toBe(true);
    expect(candidate.femaleNativeOfficerAsHusbandExplicit).toBe(true);
    expect(candidate.nativeSexConditionedSpouseStarSemanticsExplicit).toBe(true);
    expect(candidate.femaleSpecificOutputFoodGodRiskRuleExplicit).toBe(true);
    expect(candidate.dyadicTwoPartnerInputRequiredByMethod).toBe(true);
    expect(candidate.spousePalacePriorityReplacesSexConditionedSpouseStarRule).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.singleNativeNatalOnlySelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/native-sex-conditioned spouse-star semantics/i);
  });

  test('chains from Lee Sangcheon without changing the accepted two-of-five ledger', () => {
    const upstream = buildRelationshipSpouseT8LeeSangcheon2017EqualityWealthWifeBoundaryEvidence();
    const report = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.directFulltextPdfInspected).toBe(true);
    expect(report.spousePalacePriorityConfirmed).toBe(true);
    expect(report.nativeSexConditionedSpouseStarSemanticsConfirmed).toBe(true);
    expect(report.dyadicTwoPartnerMethodConfirmed).toBe(true);
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
    const candidate = RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with Kim Mantae 2025/i);
    expect(candidate.noStitchingBoundary).toMatch(/Lee Sangcheon 2017 equality language/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
    const second = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_NAM_KIM_2018_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_SPOUSE_PALACE_PRIORITY_WITH_SEX_CONDITIONED_SPOUSE_STARS_AND_DYADIC_INPUT',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_nam_kim_2018_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_SINGLE_NATIVE_SPOUSE_MAPPING_DISCOVERY_WITHOUT_STITCHING_DAY_BRANCH_PRIORITY',
    );
  });
});
