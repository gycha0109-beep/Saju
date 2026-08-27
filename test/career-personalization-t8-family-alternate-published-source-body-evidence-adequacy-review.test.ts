import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS,
  CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS,
  type CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport,
} from '../src/research/career-personalization-t8-family-alternate-published-source-bounded-body-acquisition-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B37_FAMILY_ADEQUACY_CONTROL_IDS,
  buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview,
} from '../src/research/career-personalization-t8-family-alternate-published-source-body-evidence-adequacy-review.js';

function acceptedB36(): CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport {
  const material: Omit<CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport, 'evidenceId'> = {
    evidenceVersion: CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION,
    status: 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE',
    decision:
      'TWO_ALTERNATE_PATHS_EXECUTED_2017_TARGET_BODY_NOT_ACQUIRED_2015_RELATION_AND_CAREER_BODY_MATERIALLY_ACQUIRED_EXACT_EDITION_AND_COMPATIBILITY_PENDING_NO_AUTHORITY_ADMISSION',
    upstreamB35ReviewId: 'b35_b37_fixture',
    exactB35BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    records: CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS,
    recordCount: 2,
    acquisitionExecutionCount: 2,
    official2017PreviewDirectlyInspected: true,
    official2017TargetRelationBodyAcquired: false,
    sameWork2015RelationBodyAcquired: true,
    sameWork2015CareerBindingObserved: true,
    exact2015EditionPassageBindingEstablished: false,
    currentMethodCompatibleAlternatePathCount: 0,
    admissionReadyFamilyCandidateCount: 0,
    familyGapClosureReady: false,
    qianliHistoricalPathPreserved: true,
    crossSourceStitchingUsed: false,
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
    controlIds: CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    recommendedNextGate: 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW',
  };
  return {
    evidenceId: `career_t8_family_alternate_published_source_body_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B37 Family alternate body evidence adequacy review', () => {
  test('accepts exact B36 and resolves adequacy', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.reviewVersion).toBe(CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW');
  });

  test('keeps the 2017 path inadequate without target relation body', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.career2017BodyAdequateForAdmission).toBe(false);
    expect(report.career2017RemainingRequirementIds).toContain('TARGET_RELATION_NORMATIVE_BODY');
    expect(report.career2017RemainingRequirementIds).toContain('RELATION_SPECIFIC_LIMITS');
  });

  test('accepts substantive named relation evidence for the 2015 path', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.semantic2015NamedRelationSatisfied).toBe(true);
    expect(report.semantic2015StructureEffectSatisfied).toBe(true);
  });

  test('accepts direct same-work Career binding for the 2015 path', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.semantic2015CareerBindingSatisfied).toBe(true);
  });

  test('accepts same-work relation limits for the 2015 path', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.semantic2015LimitsSatisfied).toBe(true);
  });

  test('does not claim exact 2015 printed-edition binding', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.semantic2015ExactEditionBindingSatisfied).toBe(false);
  });

  test('treats the strength method dependency as mandatory rather than optional noise', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.semantic2015StrengthMethodDependencyMandatory).toBe(true);
    expect(report.strengthDependencyMayBeDropped).toBe(false);
  });

  test('keeps the 2015 path incompatible with current T5', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.semantic2015CurrentMethodCompatibilitySatisfied).toBe(false);
    expect(report.semantic2015AdmissionReady).toBe(false);
    expect(report.currentMethodCompatibleAlternatePathCount).toBe(0);
  });

  test('forbids cross-source stitching', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.crossSourceStitchingAuthorized).toBe(false);
  });

  test('keeps Family coverage material partial with zero admission-ready candidates', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.familyCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(report.admissionReadyFamilyCandidateCount).toBe(0);
    expect(report.familyGapClosureReady).toBe(false);
  });

  test('preserves Qianli history plus Position and Branch progress', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.qianliHistoricalPathPreserved).toBe(true);
    expect(report.authorityAdmissionReadyComponentCountPreserved).toBe(1);
    expect(report.branchTriggerReopenedPreserved).toBe(true);
  });

  test('freezes controls and keeps all historical gaps formally open', () => {
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(acceptedB36());
    expect(report.controlIds).toEqual(CAREER_T8_B37_FAMILY_ADEQUACY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.productionImpact).toBe('NONE');
  });

  test('fails closed when B36 content-addressed identity is tampered', () => {
    const b36 = acceptedB36();
    const tampered = { ...b36, evidenceId: `${b36.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(tampered);
    expect(report.status).toBe('UPSTREAM_B36_BOUNDARY_INVALID');
    expect(report.semantic2015NamedRelationSatisfied).toBe(false);
    expect(report.authorityAdmissionReadyComponentCountPreserved).toBe(0);
    expect(report.controlCount).toBe(0);
  });
});
