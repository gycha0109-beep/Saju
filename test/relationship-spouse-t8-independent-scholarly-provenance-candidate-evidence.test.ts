import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION,
  buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence,
} from '../src/research/relationship-spouse-t8-independent-scholarly-provenance-candidate-evidence.js';

describe('Relationship spouse T8 independent scholarly provenance candidate evidence', () => {
  test('records two exact KCI scholarly candidates without treating abstract inspection as full-text admission', () => {
    const report = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();

    expect(report.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('MATERIAL_PARTIAL_SCHOLARLY_PROVENANCE_CANDIDATES_ACQUIRED');
    expect(report.candidateRecords).toEqual(
      RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS,
    );
    expect(report.candidateRecordCount).toBe(2);
    expect(report.kciIndexedScholarlyCandidateCount).toBe(2);
    expect(report.natalMethodologyCandidateCount).toBe(2);
    expect(report.fullTextDirectlyInspectedCount).toBe(0);
    expect(report.exactBodyPassageLocatorEstablishedCount).toBe(0);
  });

  test('preserves only the claims visible on each official KCI abstract surface', () => {
    const [lee2020, lee2025] = RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS;

    expect(lee2020.sourceId).toBe('KCI-ART002630397');
    expect(lee2020.natalMethodologyScopeExplicit).toBe(true);
    expect(lee2020.compatibilityOnly).toBe(false);
    expect(lee2020.spousePalaceExplicitInInspectedAbstract).toBe(true);
    expect(lee2020.gungwiAndSipseongCombinedMethodExplicitInInspectedAbstract).toBe(true);
    expect(lee2020.gyeokgukYongshinDependencyExplicitInInspectedAbstract).toBe(true);
    expect(lee2020.fullTextDirectlyInspected).toBe(false);
    expect(lee2020.independentNormativeProvenanceAdequateForCurrentSpouseMethod).toBe(false);

    expect(lee2025.sourceId).toBe('KCI-ART003175186');
    expect(lee2025.natalMethodologyScopeExplicit).toBe(true);
    expect(lee2025.compatibilityOnly).toBe(false);
    expect(lee2025.femaleChartHusbandScopeExplicit).toBe(true);
    expect(lee2025.historicalSocialRoleContingencyExplicitInInspectedAbstract).toBe(true);
    expect(lee2025.modernMarriageContextChangeExplicitInInspectedAbstract).toBe(true);
    expect(lee2025.husbandNotFixedToOfficerStarOnlyExplicitInInspectedAbstract).toBe(true);
    expect(lee2025.alternativeTenGodRepresentationForHusbandProposedInInspectedAbstract).toBe(true);
    expect(lee2025.fullTextDirectlyInspected).toBe(false);
    expect(lee2025.independentNormativeProvenanceAdequateForCurrentSpouseMethod).toBe(false);
  });

  test('does not convert a female-husband modernization proposal into a role-neutral natal mapping', () => {
    const report = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();
    const lee2025 = RELATIONSHIP_SPOUSE_T8_INDEPENDENT_SCHOLARLY_PROVENANCE_CANDIDATE_RECORDS[1];

    expect(report.modernHistoricalRoleContingencyCandidateLocated).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingCandidateLocated).toBe(false);
    expect(lee2025.explicitModernRoleNeutralSpouseNatalMappingEstablished).toBe(false);
    expect(lee2025.explicitPartnerGenderNeutralRuleEstablished).toBe(false);
    expect(lee2025.explicitSexualOrientationNeutralRuleEstablished).toBe(false);
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
    expect(first.controlCount).toBe(14);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_AND_DIRECTLY_INSPECT_EXACT_RELEVANT_FULL_TEXT_PASSAGES_FOR_THE_SCHOLARLY_CANDIDATES_AND_CONTINUE_SEARCH_FOR_AN_EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_WITHOUT_STITCHING',
    );
  });
});
