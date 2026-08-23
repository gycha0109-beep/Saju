import { describe, expect, it } from 'vitest';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport } from '../src/research/i113-challenge-combination-support-channel-untouched-support-effect-source-ke-interaction-eligibility-methodology-review.js';
import type { I211QuWei2001ExternalCustodianAccessRequirementHoldRecord } from '../src/research/i211-qu-wei-2001-external-custodian-access-requirement-hold-record.js';
import {
  I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS,
  buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview,
} from '../src/research/i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';

function validI113(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport {
  return {
    reviewId: 'i113_fixture',
    status: 'RESOLVED_SOURCE_KE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
    decision:
      'VISIBLE_STEM_POSITIONAL_METHODOLOGY_AVAILABLE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REMAINS',
    candidateSourceId: 'chen_yuan_sizhu_yuce',
    directionalBindingLayerResolved: true,
    visibleStemSourceLocatorVerified: true,
    visibleStemPositionalApplicabilityLanguageAvailable: true,
    branchHiddenStemSourceLocatorVerified: true,
    branchHiddenStemFiveElementApplicabilityAuthorityAvailable: true,
    branchHiddenStemPositionalInteractionEligibilityAuthorityAvailable: false,
    visibleStemToHiddenStemEligibilityAuthorityAvailable: false,
    hiddenStemToVisibleStemEligibilityAuthorityAvailable: false,
    hiddenStemToHiddenStemEligibilityAuthorityAvailable: false,
    hiddenStemMembershipAloneMayEstablishInteractionEligibility: false,
    hiddenStemCurrentAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    genericAllComponentInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    currentChartInteractionEligibilityMaterializationAuthorizedByThisGate: false,
    directionalBindingMayBePromotedToEffectiveInteraction: false,
    directionalBindingMayBePromotedToDamageOutcome: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport;
}

function validI211(): I211QuWei2001ExternalCustodianAccessRequirementHoldRecord {
  return {
    holdRecordId: 'i211_fixture',
    status: 'RESOLVED_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD',
    decision:
      'QU_WEI_2001_WEB_ONLY_REMEDIATION_ON_HOLD_TWO_EXTERNAL_ACCESS_TRIGGERS_FROZEN_TWO_GAPS_REMAIN_NO_EXHAUSTION_NO_CONTACT_AUTHORIZATION_NO_REBINDING_NO_INDEPENDENCE',
    holdState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE',
    remainingGapCount: 2,
    webOnlyAutomatedRemediationHoldActive: true,
    webOnlyAutomatedResearchRetired: false,
    officialCustodianContactExecutionAuthorizedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetPathSuspendedNotRetired: true,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    nextGateActivationCondition: 'MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE_TRIGGER_REQUIRED',
  } as unknown as I211QuWei2001ExternalCustodianAccessRequirementHoldRecord;
}

describe('I212 hidden-stem interaction eligibility authority gap requirements review', () => {
  it('accepts the I113 hidden-stem gap and current I211 repository boundary', () => {
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      validI113(),
      validI211(),
    );
    expect(r.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    );
    expect(r.exactI113HiddenStemBoundaryAccepted).toBe(true);
    expect(r.exactI211CurrentRepositoryBoundaryAccepted).toBe(true);
    expect(r.authorityGapConfirmed).toBe(true);
    expect(r.authorityGapClosed).toBe(false);
  });

  it('preserves existing hidden-stem evidence as five-element applicability only', () => {
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      validI113(),
      validI211(),
    );
    expect(r.existingSourceCandidateIdContext).toBe('chen_yuan_sizhu_yuce');
    expect(r.existingSourceHiddenStemLocatorVerified).toBe(true);
    expect(r.existingSourceEstablishesHiddenStemFiveElementApplicability).toBe(true);
    expect(r.existingSourceEstablishesHiddenStemPairEligibility).toBe(false);
    expect(r.existingSourceEstablishesHiddenStemPositionalEligibility).toBe(false);
    expect(r.hiddenStemMembershipAloneMayEstablishInteractionEligibility).toBe(false);
  });

  it('freezes exactly seven mandatory authority requirements', () => {
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      validI113(),
      validI211(),
    );
    expect(r.requirements.map((x) => x.requirementId)).toEqual(I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS);
    expect(r.requirementCount).toBe(7);
    expect(r.allRequirementsMandatory).toBe(true);
    expect(r.allRequirementsCurrentlyUnsatisfied).toBe(true);
    expect(r.requirementsFrozenProspectively).toBe(true);
    expect(r.requirements.every((x) => x.mandatory && x.exactAuthorityRequired)).toBe(true);
  });

  it('requires authority across visible-to-hidden, hidden-to-visible and hidden-to-hidden scopes', () => {
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      validI113(),
      validI211(),
    );
    expect(r.visibleToHiddenEligibilityResolved).toBe(false);
    expect(r.hiddenToVisibleEligibilityResolved).toBe(false);
    expect(r.hiddenToHiddenEligibilityResolved).toBe(false);
    expect(r.allThreeDirectionalComponentScopesRequireAuthority).toBe(true);
    expect(r.positionContextActivationAndExceptionsRequireExplicitAuthority).toBe(true);
  });

  it('forbids visible-stem backfill and keeps relation, effective interaction and damage distinct', () => {
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      validI113(),
      validI211(),
    );
    expect(r.visibleStemPositionalRuleMayBackfillHiddenStemEligibility).toBe(false);
    expect(r.visibleStemThresholdRuleMayResolveHiddenStemEligibility).toBe(false);
    expect(r.rawEarthlyBranchElementMaySubstituteForHiddenStemComponent).toBe(false);
    expect(r.relationExistenceMustRemainDistinctFromEffectiveInteraction).toBe(true);
    expect(r.effectiveInteractionMustRemainDistinctFromDamageOutcome).toBe(true);
    expect(r.damageEvaluationAuthorized).toBe(false);
  });

  it('authorizes only the next discovery-readiness review and acquires no authority', () => {
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      validI113(),
      validI211(),
    );
    expect(r.exactSourceIdentityRequired).toBe(true);
    expect(r.originalOrVerifiedSourceContextRequired).toBe(true);
    expect(r.reproducibleLocatorRequired).toBe(true);
    expect(r.searchSnippetMayCountAsAuthority).toBe(false);
    expect(r.modelSynthesisMayCountAsAuthority).toBe(false);
    expect(r.generalKnowledgeMayCountAsAuthority).toBe(false);
    expect(r.empiricalCalibrationMayCreateAuthority).toBe(false);
    expect(r.candidateDiscoveryReadinessReviewAuthorized).toBe(true);
    expect(r.candidateDiscoveryExecutedByThisGate).toBe(false);
    expect(r.candidateRegisteredByThisGate).toBe(false);
    expect(r.candidateSelectedByThisGate).toBe(false);
    expect(r.authorityAcquiredByThisGate).toBe(false);
    expect(r.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
  });

  it('preserves Qu Wei HOLD, Li suspension, I132, frozen v2 and production guards', () => {
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      validI113(),
      validI211(),
    );
    expect(r.quWei2001HoldPreserved).toBe(true);
    expect(r.quWei2001HoldState).toBe('HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE');
    expect(r.quWei2001ExternalContactAuthorizedByThisGate).toBe(false);
    expect(r.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.multiSourceCompositionAuthorized).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if the I113 hidden-stem gap is mutated into an authority claim', () => {
    const mutated = {
      ...validI113(),
      hiddenStemToHiddenStemEligibilityAuthorityAvailable: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeInteractionEligibilityMethodologyReviewReport;
    const r = buildI212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReview(
      mutated,
      validI211(),
    );
    expect(r.status).toBe('I113_OR_I211_AUTHORITY_BOUNDARY_INVALID');
    expect(r.decision).toBe('HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_REQUIREMENTS_NOT_FROZEN');
    expect(r.authorityGap).toBe('UPSTREAM_INVALID');
    expect(r.requirementCount).toBe(0);
    expect(r.candidateDiscoveryReadinessReviewAuthorized).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
