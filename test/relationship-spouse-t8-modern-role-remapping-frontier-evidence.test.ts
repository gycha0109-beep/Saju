import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES,
  RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_EVIDENCE_VERSION,
  buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence,
} from '../src/research/relationship-spouse-t8-modern-role-remapping-frontier-evidence.js';
import { buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence } from '../src/research/relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence.js';

describe('Relationship spouse T8 modern role-remapping frontier evidence', () => {
  test('keeps every new scholarly surface below actual-body evidence', () => {
    expect(RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES).toHaveLength(3);

    for (const candidate of RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES) {
      expect(candidate.inspectedPublicSurface).toBe('SCHOLARLY_METADATA_ABSTRACT_TOC');
      expect(candidate.directFullTextObjectInspected).toBe(false);
      expect(candidate.pdfScreenshotReviewed).toBe(false);
      expect(candidate.explicitRoleNeutralNatalSpouseSelectorEstablished).toBe(false);
      expect(candidate.pureNatalInputContractEstablished).toBe(false);
      expect(candidate.canonicalLosslessFitEstablished).toBe(false);
    }
  });

  test('records Lee spouse-palace methodology without fabricating Gyeokguk or Yongsin', () => {
    const lee = RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES.find(
      (candidate) => candidate.candidateId === 'LEE_SUDONG_2020_KCI_ART002630397_RISS_A107064519',
    );

    expect(lee?.spouseSpecificQuestionPresent).toBe(true);
    expect(lee?.disposition).toBe(
      'SPOUSE_PALACE_METHOD_REQUIRES_UNGOVERNED_GYEOKGUK_YONGSIN',
    );
    expect(lee?.requiredInputsOrMethodConstants).toContain('Gyeokguk');
    expect(lee?.requiredInputsOrMethodConstants).toContain('Yongsin');
    expect(lee?.canonicalBoundary).toMatch(/not governed/i);
  });

  test('records Song actual-role language and its explicit husband plus extra-chart boundaries', () => {
    const song = RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES.find(
      (candidate) => candidate.candidateId === 'SONG_JAEWOO_2023_RISS_T16680125',
    );

    expect(song?.roleOrSocialContextExplicit).toBe(true);
    expect(song?.disposition).toBe(
      'ACTUAL_ROLE_FRAMEWORK_HAS_NO_GENERAL_SPOUSE_SELECTOR_AND_USES_EXTERNAL_CONTEXT',
    );
    expect(song?.exactBoundary).toMatch(/lacks a clear criterion when explaining the husband relationship/i);
    expect(song?.requiredInputsOrMethodConstants).toContain(
      'relationship actual role when using the Jeokcheonsu/Gungtongbogam branch',
    );
    expect(song?.requiredInputsOrMethodConstants).toContain(
      'society/era context acknowledged as an extra-chart variable',
    );
  });

  test('records Hong as a material gender-role critique without turning it into a chart-only neutral selector', () => {
    const hong = RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CANDIDATES.find(
      (candidate) => candidate.candidateId === 'HONG_YOOSEON_2022_KCI_ART003089059_RISS_A108419413',
    );

    expect(hong?.spouseSpecificQuestionPresent).toBe(true);
    expect(hong?.roleOrSocialContextExplicit).toBe(true);
    expect(hong?.disposition).toBe(
      'IDEOLOGICAL_ROLE_DUTY_REINTERPRETATION_NOT_PURE_NATAL_SPOUSE_SELECTOR',
    );
    expect(hong?.exactBoundary).toMatch(/traditional wife-as-Wealth assignment reflects patriarchal duties/i);
    expect(hong?.canonicalBoundary).toMatch(/external semantic inputs/i);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence();

    expect(report.candidateCount).toBe(3);
    expect(report.directFullTextCandidateCount).toBe(0);
    expect(report.actualRoleOrSocialContextCandidateCount).toBe(2);
    expect(report.roleNeutralNatalMappingEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sexualOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the post-Ha candidate disposition layer', () => {
    const upstream = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
    const first = buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence();
    const second = buildRelationshipSpouseT8ModernRoleRemappingFrontierEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_modern_role_remapping_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_MODERN_ROLE_REMAPPING_FRONTIER_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(15);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_SONG_OR_HONG_ACTUAL_BODY_WHILE_CONTINUING_KIM_JUNG_SHIN_BODY_ACQUISITION_THEN_TEST_ANY_SAME_SOURCE_SPOUSE_SELECTOR_AGAINST_PURE_NATAL_INPUT_REQUIREMENTS',
    );
  });
});
