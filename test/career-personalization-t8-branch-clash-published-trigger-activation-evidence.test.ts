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
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B34_BRANCH_CLASH_CANDIDATE,
  CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS,
  buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence,
} from '../src/research/career-personalization-t8-branch-clash-published-trigger-activation-evidence.js';

function acceptedB33(): CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport {
  const material: Omit<CareerPersonalizationT8PostI257ExternalEvidenceTriggerActivationAdequacyReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_ADEQUACY_REVIEW',
    decision:
      'POSITION_TRIGGER_VALID_NEW_2023_SINGLE_SOURCE_ESTABLISHES_BOUNDED_POSITION_DELTA_AND_CURRENT_METHOD_COMPATIBILITY_POSITION_AUTHORITY_CANDIDATE_ADMISSION_READY_COMPOSITE_GAP_REMAINS_OPEN',
    upstreamB32EvidenceId: 'b32_b34_fixture',
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

describe('Career T8 B34 branch clash published trigger activation evidence', () => {
  test('accepts exact B33 and reopens the branch trigger', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.evidenceVersion).toBe(CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE');
    expect(report.branchTriggerReopened).toBe(true);
  });

  test('preserves the admission-ready bounded position component', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.positionAdmissionReadyComponentPreserved).toBe(true);
    expect(report.authorityAdmissionReadyComponentCount).toBe(1);
  });

  test('freezes the published Ten Shen Chan Wei candidate', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchCandidate).toEqual(CAREER_T8_B34_BRANCH_CLASH_CANDIDATE);
    expect(report.branchCandidate?.sourceIdentity).toContain('9789881412041');
    expect(report.branchPublishedProvenanceAdequateForTrigger).toBe(true);
  });

  test('binds exact Zhengguan to governed formal responsibility', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchExactTenGodSubtypePreserved).toBe(true);
    expect(report.branchCurrentT5SemanticCorrespondenceObserved).toBe(true);
    expect(report.branchCandidate?.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
  });

  test('records same-work clash participant binding', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchClashParticipantBindingObserved).toBe(true);
    expect(report.branchCandidate?.interactionEvidence.join(' ')).toContain('相刑相沖');
  });

  test('uses only qualitative attenuation rather than numeric force', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchQualitativeModificationModeEstablished).toBe(true);
    expect(report.branchModificationMode).toBe('ATTENUATES_OR_REDUCES_EXPRESSION');
    expect(report.branchCandidate?.numericWeightingIntroduced).toBe(false);
  });

  test('does not delete the T5 base semantic when clash is present', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchCandidate?.clashDeletesBaseSemantic).toBe(false);
    expect(report.branchSameWorkLimitObserved).toBe(true);
  });

  test('keeps exact 2015 edition passage binding unresolved', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchExactPublishedEditionPassageBindingEstablished).toBe(false);
    expect(report.branchCandidate?.publishedEditionBodyDirectlyInspected).toBe(false);
    expect(report.branchCandidate?.sameWorkFullTextLineageInspected).toBe(true);
  });

  test('does not assume current-method compatibility while distance and strength dependencies remain', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchCurrentMethodCompatibilityEstablished).toBe(false);
    expect(report.branchCandidate?.distanceStrengthWangshuaiDependencyPresentInMethodSection).toBe(true);
  });

  test('admits no branch authority and closes no gap', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.branchAuthorityAdmissionReady).toBe(false);
    expect(report.branchGapClosureReady).toBe(false);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('keeps all six historical gaps formally open', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.gapClosureReadyCount).toBe(0);
  });

  test('freezes controls and leaves runtime untouched', () => {
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(acceptedB33());
    expect(report.controlIds).toEqual(CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('fails closed when the B33 content-addressed identity is tampered', () => {
    const b33 = acceptedB33();
    const tampered = { ...b33, reviewId: `${b33.reviewId}_tampered` };
    const report = buildCareerPersonalizationT8BranchClashPublishedTriggerActivationEvidence(tampered);
    expect(report.status).toBe('UPSTREAM_B33_BOUNDARY_INVALID');
    expect(report.branchTriggerReopened).toBe(false);
    expect(report.branchCandidate).toBeNull();
    expect(report.controlCount).toBe(0);
  });
});
