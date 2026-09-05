import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_SCHOLARLY_FULLTEXT_ACCESS_ATTEMPTS,
  buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence,
} from '../src/research/relationship-spouse-t8-fulltext-access-role-neutral-mapping-candidate-evidence.js';
import { buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence } from '../src/research/relationship-spouse-t8-independent-scholarly-provenance-candidate-evidence.js';

describe('Relationship spouse T8 fulltext access and role-neutral natal mapping candidate evidence', () => {
  test('freezes the public scholarly fulltext acquisition boundary without relabelling controls as body inspection', () => {
    const report = buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence();

    expect(report.scholarlyFulltextAccessAttempts).toEqual(
      RELATIONSHIP_SPOUSE_T8_SCHOLARLY_FULLTEXT_ACCESS_ATTEMPTS,
    );
    expect(report.scholarlyFulltextAccessAttemptCount).toBe(6);
    expect(report.targetScholarlyDirectFullTextAcquiredCount).toBe(0);
    expect(report.targetScholarlyExactRelevantBodyPassageInspectedCount).toBe(0);

    for (const attempt of report.scholarlyFulltextAccessAttempts) {
      expect(attempt.directArticleBodySurfaced).toBe(false);
      expect(attempt.directPdfSurfaced).toBe(false);
      expect(attempt.exactRelevantBodyPassageInspected).toBe(false);
    }
  });

  test('preserves the exact known thesis target locators while keeping their body context uninspected', () => {
    const dbpia = RELATIONSHIP_SPOUSE_T8_SCHOLARLY_FULLTEXT_ACCESS_ATTEMPTS.find(
      (attempt) => attempt.surfaceId === 'KWEON_2021_DBPIA',
    );

    expect(dbpia).toBeDefined();
    if (!dbpia || !('targetBodyLocators' in dbpia)) {
      throw new Error('Expected KWEON_2021_DBPIA target locators');
    }

    expect(dbpia.targetBodyLocators).toEqual([
      'IV.1.1 남녀의 존비 관계에서 상대적 관계로의 변화 — p.48',
      'IV.3.2 혼인관의 인식 전환 — p.78',
      'IV.3.3 혼인 형태의 변화 — p.82',
    ]);
    expect(dbpia.exactRelevantBodyPassageInspected).toBe(false);
  });

  test('records an explicit public natal role-neutral mapping candidate from Ming Map', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE;

    expect(candidate.sourceClass).toBe('commercial_practitioner_editorial_methodology');
    expect(candidate.inspectedSurface).toBe('public_article_body');
    expect(candidate.natalScopeExplicit).toBe(true);
    expect(candidate.compatibilityOnly).toBe(false);
    expect(candidate.dayBranchSpousePalaceExplicit).toBe(true);
    expect(candidate.traditionalGenderedSpouseStarConventionExplicit).toBe(true);
    expect(candidate.historicalBinaryGenderContextExplicit).toBe(true);
    expect(candidate.modernReadersBothControlLinesRegardlessOfGenderExplicit).toBe(true);
    expect(candidate.sameSexNonBinaryModernMarriageSameMachineryExplicit).toBe(true);
    expect(candidate.actualChartDynamicsOverHistoricalBinaryTemplateExplicit).toBe(true);
    expect(candidate.fullPublicArticleBodyDirectlyInspected).toBe(true);
    expect(candidate.exactWebSectionLocatorEstablished).toBe(true);
    expect(candidate.explicitRoleNeutralSpouseNatalMappingCandidateLocated).toBe(true);
  });

  test('does not promote a commercial explicit mapping candidate into independent normative authority', () => {
    const candidate = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_NATAL_MAPPING_CANDIDATE;
    const report = buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence();

    expect(candidate.peerReviewed).toBe(false);
    expect(candidate.institutionalNormativeStandard).toBe(false);
    expect(candidate.authorityClassification.primary).toBe(false);
    expect(candidate.authorityClassification.secondary).toBe(true);
    expect(candidate.authorityClassification.normativeMethodologicalRuleCandidate).toBe(false);
    expect(candidate.authorityClassification.independentNormativeAuthorityEstablished).toBe(false);
    expect(candidate.explicitRoleNeutralSpouseNatalMappingEstablishedForAuthorityAdmission).toBe(false);
    expect(candidate.independentNormativeProvenanceAdequate).toBe(false);
    expect(candidate.authorityAdmissionAdequate).toBe(false);

    expect(report.explicitRoleNeutralNatalMappingCandidateLocated).toBe(true);
    expect(report.independentNormativeProvenanceEstablished).toBe(false);
    expect(report.explicitRoleNeutralSpouseNatalMappingEstablished).toBe(false);
  });

  test('keeps identity inference, stitching, downstream authority, and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence();

    expect(report.sexualOrientationInferenceAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.crossTaskStitchingAuthorized).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
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

  test('chains deterministically from the merged scholarly candidate evidence', () => {
    const upstream = buildRelationshipSpouseT8IndependentScholarlyProvenanceCandidateEvidence();
    const first = buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence();
    const second = buildRelationshipSpouseT8FulltextAccessRoleNeutralMappingCandidateEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_EVIDENCE_VERSION,
    );
    expect(first.upstreamScholarlyEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_fulltext_access_role_neutral_mapping_candidate_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_FULLTEXT_ACCESS_ROLE_NEUTRAL_MAPPING_CANDIDATE_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(16);
    expect(first.recommendedNextAction).toBe(
      'ACQUIRE_INDEPENDENT_NORMATIVE_SOURCE_OR_DIRECT_SCHOLARLY_BODY_CONTEXT_THAT_EXPLICITLY_SUPPORTS_ROLE_NEUTRAL_NATAL_MAPPING_BEFORE_ANY_GAP_CLOSURE_OR_PRODUCER_GATE',
    );
  });
});
