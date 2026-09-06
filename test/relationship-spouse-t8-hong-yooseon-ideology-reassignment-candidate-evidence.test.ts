import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_PUBLIC_METHOD_EVIDENCE,
  RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE,
  RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CANDIDATE_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CONTROL_IDS,
  buildRelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidence,
} from '../src/research/relationship-spouse-t8-hong-yooseon-ideology-reassignment-candidate-evidence.js';
import { buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence } from '../src/research/relationship-spouse-t8-post-ha-scholarly-candidate-disposition-evidence.js';

describe('Relationship spouse T8 Hong Yooseon ideology reassignment candidate evidence', () => {
  test('records the scholarly identity and keeps access controls separate from body inspection', () => {
    const source = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE;

    expect(source.sourceId).toBe('KCI-ART003089059');
    expect(source.rissId).toBe('A108419413');
    expect(source.doi).toBe('10.54385/cbt.2022.2.2.75');
    expect(source.directFullTextObjectInspected).toBe(false);
    expect(source.pdfScreenshotReviewed).toBe(false);
    expect(source.exactBodyPassageInspected).toBe(false);
    expect(source.publicAccessBoundary).toMatch(/did not expose a directly inspectable article object or PDF/i);
  });

  test('distinguishes journal review policy from an inspected article-level review record', () => {
    const source = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE;

    expect(source.journalReviewPolicyAtPublicationEstablished).toBe(true);
    expect(source.articleReviewRecordInspected).toBe(false);
    expect(source.journalReviewPolicyBasis).toMatch(/at least three expert reviewers/i);
  });

  test('does not retroactively convert the 2022 RISS listing into a KCI-listed article', () => {
    const source = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE;

    expect(source.rissListingAtPublication).toBe('NOT_KCI_LISTED');
    expect(source.kciListedAtPublication).toBe(false);
    expect(source.journalLaterKciCandidateYear).toBe(2023);
    expect(source.journalLaterKciListedYear).toBe(2025);
    expect(source.currentJournalKciStatusRetroactivelyUpgradesArticle).toBe(false);
  });

  test('records the explicit scholarly de-naturalization of the traditional wife-as-Wealth assignment', () => {
    const method = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_PUBLIC_METHOD_EVIDENCE;

    expect(method.husbandWifeRelationshipExplicit).toBe(true);
    expect(method.traditionalWifeWealthAssignmentExplicit).toBe(true);
    expect(method.traditionalWifeWealthAssignmentTreatedAsIdeologicalRatherThanTimelessNaturalRule).toBe(
      true,
    );
    expect(method.modernKinshipTenStarResetPurposeExplicit).toBe(true);
    expect(method.resetCriterion).toBe('SOCIAL_IDEOLOGY_DUTY_AND_ROLE');
  });

  test('does not convert duty and role context into a chart-only role-neutral spouse selector', () => {
    const method = RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_PUBLIC_METHOD_EVIDENCE;

    expect(method.fixedRoleNeutralSpouseStarEstablished).toBe(false);
    expect(method.spousePalaceSelectorEstablished).toBe(false);
    expect(method.natalChartOnlySpouseSelectorEstablished).toBe(false);
    expect(method.externalSocioRelationalContextRequiredByPubliclyDescribedCriterion).toBe(true);
    expect(method.completeExecutableInputContractEstablished).toBe(false);
    expect(method.publiclyDescribedMethodCanonicalSajuSnapshotAloneSufficient).toBe(false);
  });

  test('keeps all post-primary authority and production gates fail-closed', () => {
    const report = buildRelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidence();

    expect(report.traditionalGenderedSpouseMappingDeNaturalizedByIndependentScholarlyCandidate).toBe(true);
    expect(report.roleNeutralNatalSpouseMappingEstablished).toBe(false);
    expect(report.independentNormativeProvenanceForCurrentSpouseMethodEstablished).toBe(false);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(false);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(report.qualifyingPrimaryWitnessGapRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(1);
    expect(report.authorityGapsOpenCount).toBe(4);
    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.externalDutyRoleContextPromotedToCanonicalSajuFact).toBe(false);
    expect(report.sexualOrientationInferenceAuthorized).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
  });

  test('chains deterministically from the merged post-Ha candidate disposition evidence', () => {
    const upstream = buildRelationshipSpouseT8PostHaScholarlyCandidateDispositionEvidence();
    const first = buildRelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidence();
    const second = buildRelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidence();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CANDIDATE_EVIDENCE_VERSION,
    );
    expect(first.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_hong_yooseon_ideology_reassignment_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_IDEOLOGY_REASSIGNMENT_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(18);
  });

  test('keeps body acquisition as the next gate rather than promoting the abstract', () => {
    const report = buildRelationshipSpouseT8HongYooseonIdeologyReassignmentCandidateEvidence();

    expect(RELATIONSHIP_SPOUSE_T8_HONG_YOOSEON_2022_SOURCE.targetBodySections).toHaveLength(4);
    expect(report.recommendedNextAction).toBe(
      'ACQUIRE_HONG_2022_ACTUAL_BODY_TO_TEST_WHOLE_REASSIGNMENT_METHOD_WHILE_KEEPING_KIM_YOUNGJIN_2020_PRIORITY_BODY_ACQUISITION_AND_ALL_AUTHORITY_GATES_FAIL_CLOSED',
    );
  });
});
