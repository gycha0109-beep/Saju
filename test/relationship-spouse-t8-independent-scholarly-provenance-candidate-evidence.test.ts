import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION,
  buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence,
} from '../src/research/relationship-spouse-t8-independent-scholarly-provenance-candidate-evidence.js';

describe('Relationship spouse T8 independent scholarly provenance candidate evidence', () => {
  test('records two reviewed journal articles and one graduate thesis without treating abstract inspection as full-text admission', () => {
    const report = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('MATERIAL_PARTIAL_SCHOLARLY_PROVENANCE_CANDIDATES_ACQUIRED');
    expect(report.candidateRecords).toEqual(
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS,
    );
    expect(report.candidateRecordCount).toBe(3);
    expect(report.peerReviewedJournalCandidateCount).toBe(2);
    expect(report.graduateThesisCandidateCount).toBe(1);
    expect(report.institutionalNormativeStandardCandidateCount).toBe(0);
    expect(report.natalMethodologyCandidateCount).toBe(3);
    expect(report.fullTextDirectlyInspectedCount).toBe(0);
    expect(report.exactBodyPassageLocatorEstablishedCount).toBe(0);
  });

  test('preserves exact source classification and only claims visible on inspected surfaces', () => {
    const [lee2020, lee2025, kweon2021] =
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS;

    expect(lee2020.sourceId).toBe('KCI-ART002630397');
    expect(lee2020.peerReviewed).toBe(true);
    expect(lee2020.institutionalNormativeStandard).toBe(false);
    expect(lee2020.authorityClassification.primary).toBe(false);
    expect(lee2020.authorityClassification.secondary).toBe(true);
    expect(lee2020.authorityClassification.normativeMethodologicalRuleCandidate).toBe(false);
    expect(lee2020.authorityClassification.independentNormativeAuthorityEstablished).toBe(false);
    expect(lee2020.natalMethodologyScopeExplicit).toBe(true);
    expect(lee2020.compatibilityOnly).toBe(false);
    expect(lee2020.spousePalaceExplicitInInspectedAbstract).toBe(true);
    expect(lee2020.gungwiAndSipseongCombinedMethodExplicitInInspectedAbstract).toBe(true);
    expect(lee2020.gyeokgukYongshinDependencyExplicitInInspectedAbstract).toBe(true);
    expect(lee2020.fullTextDirectlyInspected).toBe(false);
    expect(lee2020.independentNormativeProvenanceAdequateForCurrentSpouseMethod).toBe(false);

    expect(lee2025.sourceId).toBe('KCI-ART003175186');
    expect(lee2025.peerReviewed).toBe(true);
    expect(lee2025.institutionalNormativeStandard).toBe(false);
    expect(lee2025.authorityClassification.primary).toBe(false);
    expect(lee2025.authorityClassification.secondary).toBe(true);
    expect(lee2025.authorityClassification.normativeMethodologicalRuleCandidate).toBe(true);
    expect(lee2025.authorityClassification.independentNormativeAuthorityEstablished).toBe(false);
    expect(lee2025.natalMethodologyScopeExplicit).toBe(true);
    expect(lee2025.compatibilityOnly).toBe(false);
    expect(lee2025.femaleChartHusbandScopeExplicit).toBe(true);
    expect(lee2025.historicalSocialRoleContingencyExplicitInInspectedAbstract).toBe(true);
    expect(lee2025.modernMarriageContextChangeExplicitInInspectedAbstract).toBe(true);
    expect(lee2025.husbandNotFixedToOfficerStarOnlyExplicitInInspectedAbstract).toBe(true);
    expect(lee2025.alternativeTenGodRepresentationForHusbandProposedInInspectedAbstract).toBe(true);
    expect(lee2025.historicalVsModernDistinctionExplicit).toBe(true);
    expect(lee2025.fullTextDirectlyInspected).toBe(false);
    expect(lee2025.independentNormativeProvenanceAdequateForCurrentSpouseMethod).toBe(false);

    expect(kweon2021.sourceId).toBe('DBPIA-T15948798');
    expect(kweon2021.sourceClass).toBe('graduate_thesis');
    expect(kweon2021.peerReviewed).toBe(false);
    expect(kweon2021.institutionalNormativeStandard).toBe(false);
    expect(kweon2021.authorityClassification.primary).toBe(false);
    expect(kweon2021.authorityClassification.secondary).toBe(true);
    expect(kweon2021.authorityClassification.normativeMethodologicalRuleCandidate).toBe(true);
    expect(kweon2021.authorityClassification.independentNormativeAuthorityEstablished).toBe(false);
    expect(kweon2021.sameSexCohabitingFamilyExplicitInInspectedAbstract).toBe(true);
    expect(kweon2021.traditionalSocialStructureMismatchExplicitInInspectedAbstract).toBe(true);
    expect(kweon2021.marriageMayUsePalaceAsWellAsTenGodsExplicitInInspectedAbstract).toBe(true);
    expect(kweon2021.sameSexContextSpousePalaceDayBranchInterpretationPossibilityExplicitInInspectedAbstract).toBe(
      true,
    );
    expect(kweon2021.relevantBodyChapterLocatorAvailable).toBe(true);
    expect(kweon2021.fullTextDirectlyInspected).toBe(false);
    expect(kweon2021.independentNormativeProvenanceAdequateForCurrentSpouseMethod).toBe(false);
  });

  test('does not convert modernization or same-sex-family applicability discussion into a role-neutral operational mapping', () => {
    const report = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();
    const lee2025 = RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS[1];
    const kweon2021 = RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS[2];

    expect(report.modernHistoricalRoleContingencyCandidateLocated).toBe(true);
    expect(report.modernSameSexFamilyApplicabilityCandidateLocated).toBe(true);
    expect(report.sameSexContextSpousePalaceInterpretivePossibilityCandidateLocated).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingCandidateLocated).toBe(false);
    expect(lee2025.explicitModernRoleNeutralSpouseNatalMappingEstablished).toBe(false);
    expect(lee2025.explicitPartnerGenderNeutralRuleEstablished).toBe(false);
    expect(lee2025.explicitSexualOrientationNeutralRuleEstablished).toBe(false);
    expect(kweon2021.explicitModernRoleNeutralSpouseNatalMappingEstablished).toBe(false);
    expect(kweon2021.explicitPartnerGenderNeutralRuleEstablished).toBe(false);
    expect(kweon2021.explicitSexualOrientationNeutralRuleEstablished).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();

    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
    expect(report.explicitRoleNeutralSpouseNatalMappingEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.spouseRulePackReady).toBe(false);
    expect(report.spouseClaimPackReady).toBe(false);
    expect(report.spouseInterpretationPackReady).toBe(false);
    expect(report.consumerNarrativeReady).toBe(false);
    expect(report.previewDefaultReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('is deterministic and freezes the next exact-body acquisition frontier', () => {
    const first = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();
    const second = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();
    const { evidenceId, ...material } = first;

    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_independent_scholarly_provenance_candidate_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(18);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_AND_DIRECTLY_INSPECT_EXACT_RELEVANT_FULL_TEXT_PASSAGES_FOR_THE_SCHOLARLY_CANDIDATES_AND_CONTINUE_SEARCH_FOR_AN_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_WITHOUT_STITCHING',
    );
  });
});
