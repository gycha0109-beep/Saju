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
  CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS,
  buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence,
} from '../src/research/career-personalization-t8-post-i257-external-evidence-trigger-activation-evidence.js';

function acceptedB31(): CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport {
  const material: Omit<CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW',
    decision:
      'FOUR_TRIGGER_CONTRACTS_FROZEN_ZERO_CURRENTLY_SATISFIED_RESUME_ONLY_ON_LANE_SPECIFIC_EVIDENCE_CHANGE_AND_LATER_ADEQUACY_REVIEW_NO_AUTHORITY_ADMISSION',
    upstreamB30ReviewId: 'b30_b32_fixture',
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

describe('Career T8 B32 post-I257 external evidence trigger activation', () => {
  test('accepts exact B31 and activates exactly one position trigger', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    expect(report.evidenceVersion).toBe(CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE');
    expect(report.decision).toBe(
      'ONE_POSITION_TRIGGER_ACTIVATED_THREE_TRIGGERS_REMAIN_CLOSED_NO_AUTHORITY_ADMISSION_CURRENT_METHOD_COMPATIBILITY_REVIEW_REQUIRED',
    );
    expect(report.activatedTriggerCount).toBe(1);
    expect(report.activatedTriggerIds).toEqual(['POSITION_CURRENT_T5_BRIDGE_TRIGGER']);
  });

  test('records all four researched lanes without treating discovery as activation', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    expect(report.records).toEqual(CAREER_T8_B32_TRIGGER_ACTIVATION_RECORDS);
    expect(report.recordCount).toBe(4);
    expect(report.materialNewSurfaceCount).toBe(4);
    expect(report.records.filter((record) => record.triggerSatisfied)).toHaveLength(1);
  });

  test('keeps Qin trigger closed because p464 body remains unavailable', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    const qin = report.records.find((record) => record.triggerId === 'QIN_P464_DIRECT_BODY_TRIGGER');
    expect(report.qinTriggerActivated).toBe(false);
    expect(qin?.directOrVerifiedLocalContextAvailable).toBe(false);
    expect(qin?.specificCurrentT5SemanticBindingObserved).toBe(false);
  });

  test('keeps exact-1936 Qianli trigger closed despite resolving the original file URL', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    const qianli = report.records.find((record) => record.triggerId === 'QIANLI_EXACT_1936_TARGET_PAGE_ACCESS_TRIGGER');
    expect(report.qianliTriggerActivated).toBe(false);
    expect(qianli?.sourceIdentity).toContain('nlc:data_416,01jh000368,10155');
    expect(qianli?.directOrVerifiedLocalContextAvailable).toBe(false);
  });

  test('preserves the stronger branch authored-method lead but keeps its trigger closed', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    const branch = report.records.find((record) => record.triggerId === 'BRANCH_CLASH_NORMATIVE_NATAL_BRIDGE_TRIGGER');
    expect(report.branchTriggerActivated).toBe(false);
    expect(branch?.natalScopeConfirmed).toBe(true);
    expect(branch?.explicitScopeOrLimitsObserved).toBe(true);
    expect(branch?.specificCurrentT5SemanticBindingObserved).toBe(false);
  });

  test('activates position trigger on a new independently published source', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    const position = report.records.find((record) => record.triggerId === 'POSITION_CURRENT_T5_BRIDGE_TRIGGER');
    expect(report.positionTriggerActivated).toBe(true);
    expect(position?.sourceIdentity).toContain('1995');
    expect(position?.sourceIdentity).toContain('9787805922515');
    expect(position?.independentNormativeProvenanceAdequateForTrigger).toBe(true);
  });

  test('binds month-position Zhengguan to the governed formal-responsibility T5 semantic', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    expect(report.positionCandidateExactTenGod).toBe('정관');
    expect(report.positionCandidateCurrentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(report.positionCandidateFacet).toBe('formal_responsibility');
    expect(report.positionCandidatePillar).toBe('month');
  });

  test('requires same-source limits for the position trigger', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    const position = report.records.find((record) => record.triggerId === 'POSITION_CURRENT_T5_BRIDGE_TRIGGER');
    expect(position?.explicitScopeOrLimitsObserved).toBe(true);
    expect(position?.evidenceNote).toContain('身官相當');
    expect(position?.evidenceNote).toContain('not being over-constrained');
  });

  test('does not pretend current-method compatibility is already established', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    expect(report.positionCurrentMethodCompatibilityEstablished).toBe(false);
    const position = report.records.find((record) => record.triggerId === 'POSITION_CURRENT_T5_BRIDGE_TRIGGER');
    expect(position?.currentMethodCompatibilityEstablished).toBe(false);
  });

  test('trigger activation admits no authority and closes no gap', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    expect(report.authorityAdmissionReadyGapCount).toBe(0);
    expect(report.gapClosureReadyCount).toBe(0);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.records.every((record) => record.authorityAdmissionAuthorized === false)).toBe(true);
  });

  test('keeps all six historical gaps open and runtime untouched', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes controls and routes activation to adequacy review', () => {
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(acceptedB31());
    expect(report.controlIds).toEqual(CAREER_T8_B32_TRIGGER_ACTIVATION_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW',
    );
  });

  test('fails closed when B31 content-addressed identity is tampered', () => {
    const b31 = acceptedB31();
    const tampered: CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport = {
      ...b31,
      reviewId: `${b31.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationEvidence(tampered);
    expect(report.status).toBe('UPSTREAM_B31_BOUNDARY_INVALID');
    expect(report.decision).toBe('EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_NOT_ESTABLISHED');
    expect(report.records).toEqual([]);
    expect(report.activatedTriggerCount).toBe(0);
    expect(report.positionTriggerActivated).toBe(false);
    expect(report.positionCandidateExactTenGod).toBeNull();
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
  });
});
