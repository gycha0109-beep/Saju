import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS,
  CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS,
  type CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport,
} from '../src/research/career-personalization-t8-post-i257-new-evidence-trigger-readiness-review.js';
import {
  buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence,
  type CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport,
} from '../src/research/career-personalization-t8-post-i257-external-evidence-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE,
  CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS,
  buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview,
} from '../src/research/career-personalization-t8-post-i257-external-evidence-trigger-activation-adequacy-review.js';

function acceptedB31(): CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport {
  const material: Omit<CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW',
    decision:
      'FOUR_TRIGGER_CONTRACTS_FROZEN_ZERO_CURRENTLY_SATISFIED_RESUME_ONLY_ON_LANE_SPECIFIC_EVIDENCE_CHANGE_AND_LATER_ADEQUACY_REVIEW_NO_AUTHORITY_ADMISSION',
    upstreamB30ReviewId: 'b30_b33_fixture',
    exactB30BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    triggerContracts: CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS,
    triggerContractCount: 4,
    currentlySatisfiedTriggerCount: 0,
    currentlyExecutableLaneCount: 0,
    activationRequiresAllConditions: true,
    activationAutomaticallyAdmitsAuthority: false,
    activationAutomaticallyClosesGap: false,
    activationAlwaysRequiresAdequacyReview: true,
    broadSearchRestartAuthorized: false,
    repeatedExhaustedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    authorityAdmissionReadyGapCount: 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    implementationEffects: {
      triggerContractsFrozen: 4,
      currentlySatisfiedTriggers: 0,
      currentlyExecutableLanes: 0,
      sourceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE',
  };
  return {
    reviewId: `career_t8_post_i257_new_evidence_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB32(): CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport {
  return buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
}

describe('Career T8 B33 external evidence trigger activation adequacy', () => {
  test('accepts exact B32 and resolves the stronger position adequacy review', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW');
    expect(report.decision).toBe(
      'POSITION_TRIGGER_VALID_NEW_2023_SINGLE_SOURCE_ESTABLISHES_BOUNDED_POSITION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_POSITION_AUTHORITY_CANDIDATE_ADMISSION_READY_COMPOSITE_GAP_REMAINS_OPEN',
    );
    expect(report.exactB32BoundaryAccepted).toBe(true);
  });

  test('preserves Chen Yuan 1995 as B32 trigger history while reviewing a stronger independent source', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.b32ChenYuanTriggerEvidencePreserved).toBe(true);
    expect(report.strongerIndependentPositionSourceObserved).toBe(true);
    expect(report.positionCandidate).toEqual(CAREER_T8_B33_POSITION_ADMISSION_CANDIDATE);
    expect(report.positionCandidate?.sourceIdentity).toContain('9786263640641');
  });

  test('binds exact Zhengguan day-branch position to formal responsibility', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.positionExactTenGodSubtypePreserved).toBe(true);
    expect(report.positionConditionObserved).toBe(true);
    expect(report.positionCurrentT5SemanticCorrespondenceObserved).toBe(true);
    expect(report.positionCandidate?.exactTenGod).toBe('정관');
    expect(report.positionCandidate?.position).toBe('day_branch');
    expect(report.positionCandidate?.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
  });

  test('establishes an explicit qualitative position delta without numeric weighting', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.positionExplicitModificationDeltaEstablished).toBe(true);
    expect(report.positionModificationMode).toBe('DEEPENS_OR_EMPHASIZES');
    expect(report.numericWeightingIntroduced).toBe(false);
    expect(report.positionCandidate?.numericWeightingIntroduced).toBe(false);
  });

  test('accepts same-source baseline position method and context limit rather than cross-source stitching', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.positionSameSourceLimitsObserved).toBe(true);
    expect(report.positionCandidate?.baselineSemanticObservedInSameSource).toBe(true);
    expect(report.positionCandidate?.positionMethodDefinedSeparatelyInSameSource).toBe(true);
    expect(report.positionCandidate?.sameSourceContextLimitObserved).toBe(true);
  });

  test('establishes only bounded current-method compatibility and imports no strength or Xiji dependency', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.positionBoundedCurrentMethodCompatibilityEstablished).toBe(true);
    expect(report.positionStrengthXijiDependencyObservedInCandidateRule).toBe(false);
    expect(report.positionStrengthXijiDependencyMayBeImported).toBe(false);
    expect(report.positionCandidate?.strengthWangshuaiXijiImported).toBe(false);
  });

  test('does not import leadership promotion status or occupation outcomes from the source', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.historicalOutcomeModernizationUsed).toBe(false);
    expect(report.positionCandidate?.leadershipPromotionStatusOccupationOutcomeImported).toBe(false);
  });

  test('keeps T5 base semantic immutable and treats position as a higher-layer modifier candidate', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.t5BaseSemanticMutated).toBe(false);
    expect(report.positionCandidate?.t5BaseSemanticMutated).toBe(false);
  });

  test('marks one position-only authority component admission-ready but admits nothing in B33', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.positionCoverageClass).toBe('ADMISSION_READY_POSITION_ONLY_COMPONENT');
    expect(report.positionAuthorityCandidateAdmissionReady).toBe(true);
    expect(report.authorityAdmissionReadyComponentCount).toBe(1);
    expect(report.positionAuthorityAdmittedByThisGate).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
  });

  test('does not close the composite position visibility plurality gap', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.compositePositionVisibilityPluralityGapClosureReady).toBe(false);
    expect(report.gapClosureReadyCount).toBe(0);
    expect(report.visibilityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityConsumedByCurrentContinuation).toBe(false);
    expect(report.pluralityHeldUnderI254).toBe(true);
  });

  test('keeps all six historical gaps open and production untouched', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
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

  test('freezes controls and routes to a separate bounded authority admission review', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(acceptedB32());
    expect(report.controlIds).toEqual(CAREER_T8_B33_POSITION_ADEQUACY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW');
  });

  test('fails closed when B32 content-addressed identity is tampered', () => {
    const b32 = acceptedB32();
    const tampered: CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidenceReport = {
      ...b32,
      evidenceId: `${b32.evidenceId}_tampered`,
    };
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReview(tampered);
    expect(report.status).toBe('UPSTREAM_B32_BOUNDARY_INVALID');
    expect(report.decision).toBe('EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_NOT_ESTABLISHED');
    expect(report.positionTriggerActivationAccepted).toBe(false);
    expect(report.positionCandidate).toBeNull();
    expect(report.positionAuthorityCandidateAdmissionReady).toBe(false);
    expect(report.authorityAdmissionReadyComponentCount).toBe(0);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
