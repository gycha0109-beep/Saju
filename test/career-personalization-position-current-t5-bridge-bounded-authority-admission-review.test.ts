import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE,
  CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS,
  type CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport,
} from '../src/research/career-personalization-t8-post-i257-external-evidence-trigger-activation-adequacy-review.js';
import {
  CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION,
  CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY,
  CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS,
  buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview,
} from '../src/research/career-personalization-position-current-t5-bridge-bounded-authority-admission-review.js';

function acceptedB33(): CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport {
  const material: Omit<CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW',
    decision:
      'POSITION_TRIGGER_VALID_NEW_2023_SINGLE_SOURCE_ESTABLISHES_BOUNDED_POSITION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_POSITION_AUTHORITY_CANDIDATE_ADMISSION_READY_COMPOSITE_GAP_REMAINS_OPEN',
    upstreamB32EvidenceId: 'b32_fixture_for_b38',
    exactB32BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    positionTriggerActivationAccepted: true,
    b32ChenYuanTriggerEvidencePreserved: true,
    strongerIndependentPositionSourceObserved: true,
    positionCandidate: CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE,
    positionSourceIdentityAdequate: true,
    positionIndependentPublicationProvenanceAdequate: true,
    positionStableLocatorAdequate: true,
    positionLocalContextAdequate: true,
    positionNatalScopeAdequate: true,
    positionExactTenGodSubtypePreserved: true,
    positionConditionObserved: true,
    positionCurrentT5SemanticCorrespondenceObserved: true,
    positionSameSourceLimitsObserved: true,
    positionExplicitModificationDeltaEstablished: true,
    positionModificationMode: 'DEEPENS_OR_EMPHASIZES',
    positionStrengthXijiDependencyObservedInCandidateRule: false,
    positionBoundedCurrentMethodCompatibilityEstablished: true,
    positionStrengthXijiDependencyMayBeImported: false,
    numericWeightingIntroduced: false,
    historicalOutcomeModernizationUsed: false,
    t5BaseSemanticMutated: false,
    positionCoverageClass: 'ADMISSION_READY_POSITION_ONLY_COMPONENT',
    positionAuthorityCandidateAdmissionReady: true,
    positionAuthorityAdmittedByThisGate: false,
    compositePositionVisibilityPluralityGapClosureReady: false,
    authorityAdmissionReadyComponentCount: 1,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      activatedPositionTriggerReviewed: 1,
      strongerIndependentPositionSourcesReviewed: 1,
      admissionReadyAuthorityComponents: 1,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW',
  };
  return {
    reviewId: `career_t8_post_i257_external_evidence_trigger_activation_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career Position current-T5 bounded authority admission', () => {
  test('accepts the exact content-addressed B33 boundary', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW');
    expect(report.exactB33BoundaryAccepted).toBe(true);
  });

  test('admits exactly one bounded position-only authority component', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.boundedPositionAuthorityAdmitted).toBe(true);
    expect(report.admittedBoundedAuthorityComponentCount).toBe(1);
    expect(report.authorityAdmissionState).toBe('AUTHORITY_ADMITTED_POSITION_ONLY_COMPONENT');
    expect(report.admittedAuthority).toEqual(CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY);
  });

  test('pins the admitted source identity and exact Q151 Q154 Q166 Q167 Q168 locator chain', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.admittedAuthority?.sourceIdentity).toContain('9786263640641');
    expect(report.admittedAuthority?.sourceLocator).toContain('Q151');
    expect(report.admittedAuthority?.sourceLocator).toContain('Q168');
  });

  test('binds only exact Zhengguan to the existing formal responsibility T5 semantic', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.exactTenGod).toBe('정관');
    expect(report.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(report.currentT5Facet).toBe('formal_responsibility');
  });

  test('binds only the day-branch condition and DEEPENS_OR_EMPHASIZES modifier', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.positionCondition).toBe('day_branch');
    expect(report.modificationMode).toBe('DEEPENS_OR_EMPHASIZES');
  });

  test('does not generalize the admitted authority to month year hour or all pillars', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.generalizedToOtherPillars).toBe(false);
    expect(report.admittedAuthority?.generalizedToOtherPillars).toBe(false);
  });

  test('does not generalize one Zhengguan facet to other Ten-God semantics', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.generalizedToOtherTenGodSemantics).toBe(false);
    expect(report.admittedAuthority?.generalizedToOtherTenGodSemantics).toBe(false);
  });

  test('imports no Wangshuai Yongshen Xiji or numeric weighting', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.strengthWangshuaiImported).toBe(false);
    expect(report.yongshenImported).toBe(false);
    expect(report.xijiImported).toBe(false);
    expect(report.numericWeightingIntroduced).toBe(false);
  });

  test('imports no leadership promotion status occupation outcome and preserves T5 base semantic', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.leadershipPromotionStatusOccupationOutcomeImported).toBe(false);
    expect(report.t5BaseSemanticMutated).toBe(false);
  });

  test('does not close the composite visibility position plurality historical gap', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.compositePositionVisibilityPluralityGapClosureReady).toBe(false);
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
  });

  test('keeps all six historical gaps formally open and production untouched', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes 13 admission controls and routes to frontier reconciliation', () => {
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(acceptedB33());
    expect(report.controlIds).toEqual(CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS);
    expect(report.controlCount).toBe(13);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION');
  });

  test('fails closed when B33 content-addressed identity is tampered', () => {
    const b33 = acceptedB33();
    const tampered: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport = {
      ...b33,
      reviewId: `${b33.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReview(tampered);
    expect(report.status).toBe('UPSTREAM_B33_BOUNDARY_INVALID');
    expect(report.decision).toBe('BOUNDED_POSITION_AUTHORITY_ADMISSION_NOT_ESTABLISHED');
    expect(report.boundedPositionAuthorityAdmitted).toBe(false);
    expect(report.admittedBoundedAuthorityComponentCount).toBe(0);
    expect(report.admittedAuthority).toBeNull();
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
