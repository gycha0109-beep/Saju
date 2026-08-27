import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION,
  CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY,
  CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS,
  type CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport,
} from '../src/research/career-personalization-position-current-t5-bridge-bounded-authority-admission-review.js';
import {
  CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_VERSION,
  CAREER_T8_B39_FRONTIER_RECONCILIATION_CONTROL_IDS,
  CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS,
  buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation,
} from '../src/research/career-personalization-t8-residual-authority-frontier-reconciliation.js';

function acceptedB38(): CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport {
  const material: Omit<CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION,
    status: 'RESOLVED_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW',
    decision:
      'BOUNDED_DAY_BRANCH_ZHENGGUAN_FORMAL_RESPONSIBILITY_DEEPENS_OR_EMPHASIZES_COMPONENT_AUTHORITY_ADMITTED_COMPOSITE_GAP_REMAINS_OPEN',
    upstreamB33ReviewId: 'b33_fixture_for_b39',
    exactB33BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    admittedAuthority: CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY,
    exactTenGod: '정관',
    currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY',
    currentT5Facet: 'formal_responsibility',
    positionCondition: 'day_branch',
    modificationMode: 'DEEPENS_OR_EMPHASIZES',
    boundedPositionAuthorityAdmitted: true,
    admittedBoundedAuthorityComponentCount: 1,
    authorityAdmissionState: 'AUTHORITY_ADMITTED_POSITION_ONLY_COMPONENT',
    generalizedToOtherPillars: false,
    generalizedToOtherTenGodSemantics: false,
    strengthWangshuaiImported: false,
    yongshenImported: false,
    xijiImported: false,
    numericWeightingIntroduced: false,
    leadershipPromotionStatusOccupationOutcomeImported: false,
    t5BaseSemanticMutated: false,
    compositePositionVisibilityPluralityGapClosureReady: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS,
    controlCount: 13,
    controlsFrozen: true,
    implementationEffects: {
      boundedAuthorityComponentsAdmitted: 1,
      historicalAuthorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION',
  };
  return {
    reviewId: `career_personalization_position_current_t5_bridge_bounded_authority_admission_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 residual authority frontier reconciliation', () => {
  test('accepts exact B38 and resolves the frontier reconciliation', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.reconciliationVersion).toBe(CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION');
    expect(report.exactB38BoundaryAccepted).toBe(true);
  });

  test('preserves exactly one admitted bounded Position component', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.positionAuthorityAdmitted).toBe(true);
    expect(report.admittedBoundedAuthorityComponentCount).toBe(1);
    expect(report.remainingAdmissionReadyComponentCount).toBe(0);
  });

  test('freezes all nine residual frontier records', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.frontierRecords).toEqual(CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS);
    expect(report.frontierRecordCount).toBe(9);
  });

  test('keeps Branch reopened but not admission-ready', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.branchTriggerReopened).toBe(true);
    expect(report.branchExactPublishedEditionPassageBindingEstablished).toBe(false);
    expect(report.branchCurrentMethodCompatibilityEstablished).toBe(false);
    expect(report.branchAuthorityAdmissionReady).toBe(false);
  });

  test('keeps Family material-partial with zero compatible or admission-ready alternate paths', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.familyCoverageClass).toBe('MATERIAL_PARTIAL_REQUIREMENT_COVERAGE');
    expect(report.familyCurrentMethodCompatibleAlternatePathCount).toBe(0);
    expect(report.familyAdmissionReadyCandidateCount).toBe(0);
  });

  test('preserves Qin direct-body and Qianli exact-primary-page holds', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.qinP464DirectBodyAcquired).toBe(false);
    expect(report.qianli1936P50ToP53ExactPagesBound).toBe(false);
  });

  test('keeps visibility unconsumed', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
  });

  test('keeps plurality unconsumed under I254 hold', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
  });

  test('keeps seasonal phase unconsumed and conflict composition pack-level deferred', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.seasonalConsumedByCurrentContinuation).toBe(false);
    expect(report.conflictPolicyDisposition).toBe('PACK_LEVEL_DEFERRED');
  });

  test('keeps all six historical gaps formally open', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.historicalGapClosureReadyCount).toBe(0);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('authorizes no T8 runtime narrative preview or production work', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and selects Branch adequacy compatibility as the next bounded executable gate', () => {
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(acceptedB38());
    expect(report.controlIds).toEqual(CAREER_T8_B39_FRONTIER_RECONCILIATION_CONTROL_IDS);
    expect(report.controlCount).toBe(13);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW');
  });

  test('fails closed when B38 content-addressed identity is tampered', () => {
    const b38 = acceptedB38();
    const tampered: CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport = {
      ...b38,
      reviewId: `${b38.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(tampered);
    expect(report.status).toBe('UPSTREAM_B38_BOUNDARY_INVALID');
    expect(report.decision).toBe('RESIDUAL_AUTHORITY_FRONTIER_NOT_ESTABLISHED');
    expect(report.positionAuthorityAdmitted).toBe(false);
    expect(report.frontierRecordCount).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
