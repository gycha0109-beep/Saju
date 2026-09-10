import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ParkHyeyoung2018ModernizationBoundaryEvidence } from '../src/research/relationship-spouse-t8-park-hyeyoung-2018-modernization-boundary-evidence.js';
import {
  RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_EVIDENCE_VERSION,
  buildRelationshipSpouseT8NaHyukjin2017SexConditionedScoringBoundaryEvidence,
} from '../src/research/relationship-spouse-t8-na-hyukjin-2017-sex-conditioned-scoring-boundary-evidence.js';

describe('Relationship spouse T8 Na Hyukjin 2017 sex-conditioned scoring boundary evidence', () => {
  test('pins exact scholarly identity and public acquisition provenance', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE;
    expect(candidate.author).toBe('나혁진');
    expect(candidate.publicationYear).toBe(2017);
    expect(candidate.rissId).toBe('T14398372');
    expect(candidate.rissControl).toBe('1f8b683fad900548ffe0bdc3ef48d419');
    expect(candidate.nationalLibraryLocalBibno).toBe('KDM201800823');
    expect(candidate.nanetControl).toBe('KDMT1201802345');
    expect(candidate.priorAccessBoundaryPr).toBe(371);
    expect(candidate.directBodyAcquisitionPr).toBe(405);
    expect(candidate.dcollectionItemId).toBe('000002321514');
    expect(candidate.sameRunDcollectionProvenanceReverified).toBe(true);
    expect(candidate.dcollectionDrm).toBe('N');
    expect(candidate.dcollectionMessageGate).toBe('');
    expect(candidate.dcollectionExpectedFileSize).toBe(1_345_857);
  });

  test('pins the exact complete PDF body and render-first review', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE;
    expect(candidate.dispatcherScriptSha256).toBe('d00f2205c1e40ef8ff0d499b938f2c9f782f5d0a52a082e459127b77bf40f9b8');
    expect(candidate.pdfSha256).toBe('a977d92aacbdf108e3f8afffff8335abfc97954d75127a3d52c75ddfd92ec49d');
    expect(candidate.pdfBytes).toBe(1_345_857);
    expect(candidate.pdfPageCount).toBe(88);
    expect(candidate.pdfEncrypted).toBe(false);
    expect(candidate.pdfVersion).toBe('1.4');
    expect(candidate.renderedTitlePageIdentityConfirmed).toBe(true);
    expect(candidate.completePdfTextIndexedForLocators).toBe(true);
    expect(candidate.materialPagesVisuallyReviewed).toBe(true);
  });

  test('pins decisive printed-to-physical page locators', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE;
    expect(candidate.printedBodyPageOffset).toBe(11);
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 28,
      physicalPdfPage: 39,
      topic:
        'operational table splits male Food-Output-to-Wealth, Wealth-to-Officer and Peer-to-Wealth from female Officer-to-Resource, Wealth-to-Officer and Food-Output-to-Officer',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 34,
      physicalPdfPage: 45,
      topic:
        'stage-by-stage scoring rules retain sex-specific inputs and meanings even where both branches use the Wealth-to-Officer relation',
    });
    expect(candidate.printedToPhysicalPageMap).toContainEqual({
      printedPage: 51,
      physicalPdfPage: 62,
      topic:
        'conclusion reports empirical correlations while continuing to define the target population and score model as male-female couples',
    });
  });

  test('recognizes the source as a real operational and empirically tested compatibility method', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE;
    expect(candidate.operationalCompatibilityScoringMethodPublished).toBe(true);
    expect(candidate.natalChartFactsUsedOperationally).toBe(true);
    expect(candidate.empiricalValidationAgainstDivorceAndMaritalSatisfactionPublished).toBe(true);
    expect(candidate.explicitModernReinterpretationClaim).toBe(true);
    expect(candidate.twentyFourPointDyadicScoreContractPublished).toBe(true);
    expect(candidate.exactPositiveBoundary).toMatch(/twenty-four-point compatibility score/i);
  });

  test('pins the executable male and female branches instead of collapsing them', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE;
    expect(candidate.maleFemaleSeparateOperationalBranchesExplicit).toBe(true);
    expect(candidate.maleFoodOutputWealthCourseExplicit).toBe(true);
    expect(candidate.maleWealthOfficerCourseExplicit).toBe(true);
    expect(candidate.malePeerWealthBalanceExplicit).toBe(true);
    expect(candidate.femaleOfficerResourceCourseExplicit).toBe(true);
    expect(candidate.femaleWealthOfficerCourseExplicit).toBe(true);
    expect(candidate.femaleFoodOutputOfficerBalanceExplicit).toBe(true);
    expect(candidate.maleWealthAsWifeExplicit).toBe(true);
    expect(candidate.femaleOfficerAsHusbandExplicit).toBe(true);
    expect(candidate.oppositeSexPartnerFramingExplicit).toBe(true);
  });

  test('does not relabel dyadic heterosexual scoring as a role-neutral natal spouse selector', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE;
    expect(candidate.bothPartnerChartsRequired).toBe(true);
    expect(candidate.dyadicCompatibilityMethodNotSingleNativeSpouseSelector).toBe(true);
    expect(candidate.operationalMethodIsNativeSexIndependent).toBe(false);
    expect(candidate.operationalMethodIsPartnerSexIndependent).toBe(false);
    expect(candidate.spouseSpecificOperationalRoleNeutralSelectorPublished).toBe(false);
    expect(candidate.nativeSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.partnerSexIndependentOperationalSelectorFound).toBe(false);
    expect(candidate.pureNatalRoleNeutralSpouseSelectorFound).toBe(false);
    expect(candidate.completeRoleNeutralNatalInputContractFound).toBe(false);
    expect(candidate.exactNegativeBoundary).toMatch(/sex-conditioned and opposite-sex specific/i);
  });

  test('chains from Park Hyeyoung without changing the accepted two-of-five authority ledger', () => {
    const upstream = buildRelationshipSpouseT8ParkHyeyoung2018ModernizationBoundaryEvidence();
    const report = buildRelationshipSpouseT8NaHyukjin2017SexConditionedScoringBoundaryEvidence();
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamTwoOfFiveStateAccepted).toBe(true);
    expect(report.operationalCompatibilityScoringConfirmed).toBe(true);
    expect(report.sexConditionedScoringBranchesConfirmed).toBe(true);
    expect(report.dyadicBothPartnerChartRequirementConfirmed).toBe(true);
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

  test('keeps no-stitching and production fail-closed', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CANDIDATE;
    const report = buildRelationshipSpouseT8NaHyukjin2017SexConditionedScoringBoundaryEvidence();
    expect(candidate.noStitchingBoundary).toMatch(/not combined with spouse-palace evidence/i);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CONTROL_IDS);
    expect(report.controlCount).toBe(RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_CONTROL_IDS.length);
  });

  test('is deterministically content-addressed', () => {
    const first = buildRelationshipSpouseT8NaHyukjin2017SexConditionedScoringBoundaryEvidence();
    const second = buildRelationshipSpouseT8NaHyukjin2017SexConditionedScoringBoundaryEvidence();
    const { evidenceId, ...material } = first;
    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_NA_HYUKJIN_2017_SEX_CONDITIONED_SCORING_BOUNDARY_EVIDENCE_VERSION);
    expect(first.status).toBe(
      'DIRECT_FULLTEXT_CONFIRMS_OPERATIONAL_SEX_CONDITIONED_DYADIC_SCORING_WITHOUT_ROLE_NEUTRAL_NATAL_SPOUSE_SELECTOR',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_na_hyukjin_2017_sex_conditioned_scoring_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED',
    );
  });
});
