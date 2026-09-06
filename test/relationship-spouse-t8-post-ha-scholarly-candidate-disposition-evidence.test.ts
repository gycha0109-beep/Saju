import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES,
  buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence,
} from '../src/research/relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence.js';
import { buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence } from '../src/research/relationship-spouse-t8-ha-geonchung-lineage-body-evidence.js';

describe('Relationship spouse T8 post-Ha scholarly candidate disposition evidence', () => {
  test('keeps every public abstract/TOC surface separate from direct fulltext and PDF inspection', () => {
    expect(RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES).toHaveLength(7);

    for (const candidate of RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES) {
      expect(candidate.inspectedPublicSurface).toBe('SCHOLARLY_METADATA_ABSTRACT_TOC');
      expect(candidate.directFullTextObjectInspected).toBe(false);
      expect(candidate.pdfScreenshotReviewed).toBe(false);
      expect(candidate.roleNeutralNatalSpouseMappingEstablished).toBe(false);
    }
  });

  test('keeps Kim Young-jin 2020 as the priority body-acquisition target without inferring the missing spouse star', () => {
    const kim = RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES.find(
      (candidate) => candidate.candidateId === 'KIM_YOUNGJIN_2020_DBPIA_T15521643',
    );

    expect(kim?.disposition).toBe('PRIORITY_FULLTEXT_REQUIRED');
    expect(kim?.sourceLocator).toContain('pp.50, 55, 67, 71, 73');
    expect(kim?.exactBoundary).toMatch(/exact spouse ideal Star/i);
    expect(kim?.nextAction).toMatch(/actual body/i);
  });

  test('does not generalize Shin case-change mechanics into a spouse rule', () => {
    const shin = RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES.find(
      (candidate) => candidate.candidateId === 'SHIN_JAEEOK_2024_DBPIA_T16939654',
    );

    expect(shin?.disposition).toBe('FULLTEXT_REQUIRED_NO_ROLE_NEUTRAL_MAPPING_ESTABLISHED');
    expect(shin?.exactBoundary).toMatch(/classical sources disagree/i);
  });

  test('fails closed on explicit gendered spouse mappings and explicit male-only scope', () => {
    const dispositions = Object.fromEntries(
      RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES.map((candidate) => [
        candidate.candidateId,
        candidate.disposition,
      ]),
    );

    expect(dispositions.SONG_SANGSEOP_2022_RISS).toBe(
      'EXPLICIT_GENDERED_SPOUSE_MAPPING_NOT_ROLE_NEUTRAL',
    );
    expect(dispositions.EUM_JONGHEE_2019_DBPIA_T15047469).toBe(
      'EXPLICIT_GENDERED_SPOUSE_MAPPING_NOT_ROLE_NEUTRAL',
    );
    expect(dispositions.YOON_SANGHEUM_2023_KCI_ART003042567).toBe(
      'EXPLICIT_MALE_SCOPE_NOT_ROLE_NEUTRAL',
    );
  });

  test('preserves Park Yukchin as a distinct system rather than collapsing it into current Ten-God spouse semantics', () => {
    const park = RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES.find(
      (candidate) => candidate.candidateId === 'PARK_OESUK_2023_RISS_T16818829',
    );

    expect(park?.disposition).toBe('GENDER_SPLIT_METHOD_NOT_ROLE_NEUTRAL_ESTABLISHED');
    expect(park?.exactBoundary).toMatch(/male- and female-chart Yukchin allocation diagrams/i);
    expect(park?.nextAction).toMatch(/distinct Yukchin system/i);
  });

  test('records Jung Su-a 2025 as a modern fulltext candidate without equating modern vocabulary with spouse neutrality', () => {
    const jung = RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATES.find(
      (candidate) => candidate.candidateId === 'JUNG_SUA_2025_DBPIA_T17210085',
    );

    expect(jung?.disposition).toBe('MODERN_GUNGSEONG_FULLTEXT_CANDIDATE');
    expect(jung?.roleNeutralNatalSpouseMappingEstablished).toBe(false);
    expect(jung?.nextAction).toMatch(/spouse\/partner mapping/i);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();

    expect(report.candidateCount).toBe(7);
    expect(report.priorityFulltextCandidateCount).toBe(1);
    expect(report.modernFulltextCandidateCount).toBe(1);
    expect(report.explicitGenderScopeFailureCount).toBe(3);
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

  test('chains deterministically from the merged Ha Geonchung lineage boundary', () => {
    const upstream = buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence();
    const first = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
    const second = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_DISPOSITION_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_post_ha_scholarly_disposition_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_POST_HA_SCHOLARLY_CANDIDATE_CONTROL_IDS);
    expect(first.controlCount).toBe(18);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_FIRST_THEN_JUNG_SUA_2025_OR_OTHER_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING',
    );
  });
});
