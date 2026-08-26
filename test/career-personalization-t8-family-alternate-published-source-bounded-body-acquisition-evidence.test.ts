import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION,
  CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES,
  CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS,
  type CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport,
} from '../src/research/career-personalization-t8-family-alternate-published-source-path-eligibility-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS,
  CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS,
  buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence,
} from '../src/research/career-personalization-t8-family-alternate-published-source-bounded-body-acquisition-evidence.js';

function acceptedB35(): CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport {
  const material: Omit<CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW',
    decision:
      'TWO_ALTERNATE_PUBLISHED_FAMILY_RESEARCH_PATHS_ELIGIBLE_QIANLI_HISTORY_PRESERVED_NO_CROSS_SOURCE_STITCHING_NO_AUTHORITY_ADMISSION',
    upstreamB34EvidenceId: 'b34_b36_fixture',
    exactB34BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    qianliHistoricalPathPreserved: true,
    qianliExact1936PageHoldStillControlling: true,
    alternatePathCandidates: CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES,
    alternatePathCandidateCount: 2,
    eligibleAlternatePathCount: 2,
    careerSpecificPublishedPathEligible: true,
    combinationSemanticPublishedPathEligible: true,
    crossSourceStitchingAuthorized: false,
    tocMayCountAsNormativeBody: false,
    testimonialsMayCountAsNormativeBody: false,
    strengthOrScoringDependencyMayBeIgnored: false,
    familyAuthorityAdmissionReady: false,
    familyGapClosureReady: false,
    authorityAdmissionReadyComponentCountPreserved: 1,
    branchTriggerReopenedPreserved: true,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    recommendedNextGate: 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE',
  };
  return {
    reviewId: `career_t8_family_alternate_published_source_path_eligibility_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B36 Family alternate published-source bounded body acquisition', () => {
  test('accepts exact B35 and executes exactly two body-acquisition paths', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    expect(report.evidenceVersion).toBe(CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE');
    expect(report.recordCount).toBe(2);
    expect(report.acquisitionExecutionCount).toBe(2);
  });

  test('freezes the exact two B36 acquisition records', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    expect(report.records).toEqual(CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS);
  });

  test('records direct inspection of the 2017 publisher official preview', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    const record = report.records.find((item) => item.pathId === 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH');
    expect(report.official2017PreviewDirectlyInspected).toBe(true);
    expect(record?.officialOrSameWorkBodySurfaceInspected).toBe(true);
    expect(record?.sourceIdentity).toContain('9789863185468');
  });

  test('does not falsely claim that the official 2017 preview contains target relation body', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    const record = report.records.find((item) => item.pathId === 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH');
    expect(report.official2017TargetRelationBodyAcquired).toBe(false);
    expect(record?.namedRelationBodyDirectlyInspected).toBe(false);
    expect(record?.relationSpecificLimitsObserved).toBe(false);
  });

  test('keeps 2017 testimonials outside normative body', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    const record = report.records.find((item) => item.pathId === 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH');
    expect(record?.evidenceNote).toContain('Reader testimonials');
    expect(record?.qualifyingAuthorityCandidate).toBe(false);
  });

  test('records direct same-work 2015 relation semantic body', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    const record = report.records.find((item) => item.pathId === 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH');
    expect(report.sameWork2015RelationBodyAcquired).toBe(true);
    expect(record?.namedRelationBodyDirectlyInspected).toBe(true);
    expect(record?.structureVersusEffectDistinctionObserved).toBe(true);
    expect(record?.sourceIdentity).toContain('9789881412041');
  });

  test('upgrades the 2015 same-work path with direct Career or work binding', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    const record = report.records.find((item) => item.pathId === 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH');
    expect(report.sameWork2015CareerBindingObserved).toBe(true);
    expect(record?.explicitCareerOrWorkBindingObserved).toBe(true);
    expect(record?.evidenceNote).toContain('career/rank outcome');
  });

  test('preserves same-work relation limits rather than total semantic replacement', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    const record = report.records.find((item) => item.pathId === 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH');
    expect(record?.relationSpecificLimitsObserved).toBe(true);
    expect(record?.evidenceNote).toContain('incomplete transformation');
  });

  test('does not fake exact 2015 printed-edition binding', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    expect(report.exact2015EditionPassageBindingEstablished).toBe(false);
    expect(report.records.find((item) => item.pathId === 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH')?.exactPublishedEditionPassageBindingEstablished).toBe(false);
  });

  test('preserves strength and temporal dependency blockers', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    expect(report.currentMethodCompatibleAlternatePathCount).toBe(0);
    expect(report.records.every((record) => record.strengthScoringOrTemporalDependencyObserved)).toBe(true);
    expect(report.records.every((record) => record.currentMethodCompatibilityEstablished === false)).toBe(true);
  });

  test('uses no cross-source stitching and admits no Family authority', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    expect(report.crossSourceStitchingUsed).toBe(false);
    expect(report.admissionReadyFamilyCandidateCount).toBe(0);
    expect(report.familyGapClosureReady).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
  });

  test('preserves position and branch progress while keeping all six gaps formally open', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(acceptedB35());
    expect(report.authorityAdmissionReadyComponentCountPreserved).toBe(1);
    expect(report.branchTriggerReopenedPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.controlIds).toEqual(CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.productionImpact).toBe('NONE');
  });

  test('fails closed when B35 content-addressed identity is tampered', () => {
    const b35 = acceptedB35();
    const tampered = { ...b35, reviewId: `${b35.reviewId}_tampered` };
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(tampered);
    expect(report.status).toBe('UPSTREAM_B35_BOUNDARY_INVALID');
    expect(report.recordCount).toBe(0);
    expect(report.sameWork2015RelationBodyAcquired).toBe(false);
    expect(report.controlCount).toBe(0);
  });
});
