import { describe, expect, it } from 'vitest';
import {
  I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS,
  type I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport,
} from '../src/research/i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';
import {
  I213_DISCOVERY_CONTROL_IDS,
  I213_DISCOVERY_PATH_IDS,
  buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview,
} from '../src/research/i213-source-ke-hidden-stem-interaction-eligibility-authority-discovery-readiness-review.js';

function validI212(): I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport {
  return {
    reviewId: 'i212_fixture',
    status: 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    decision:
      'HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_SEVEN_REQUIREMENTS_NO_AUTHORITY_ACQUIRED',
    exactI113HiddenStemBoundaryAccepted: true,
    exactI211CurrentRepositoryBoundaryAccepted: true,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapConfirmed: true,
    authorityGapClosed: false,
    requirements: I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS.map((requirementId) => ({
      requirementId,
      mandatory: true,
      currentlySatisfied: false,
      exactAuthorityRequired: true,
      generalKnowledgeMaySatisfy: false,
      visibleStemRuleMayBackfill: false,
      hiddenStemMembershipMaySatisfy: false,
    })),
    requirementCount: 7,
    allRequirementsMandatory: true,
    allRequirementsCurrentlyUnsatisfied: true,
    requirementsFrozenProspectively: true,
    existingSourceEstablishesHiddenStemFiveElementApplicability: true,
    existingSourceEstablishesHiddenStemPairEligibility: false,
    existingSourceEstablishesHiddenStemPositionalEligibility: false,
    hiddenStemMembershipAloneMayEstablishInteractionEligibility: false,
    visibleStemPositionalRuleMayBackfillHiddenStemEligibility: false,
    visibleStemThresholdRuleMayResolveHiddenStemEligibility: false,
    allThreeDirectionalComponentScopesRequireAuthority: true,
    positionContextActivationAndExceptionsRequireExplicitAuthority: true,
    relationExistenceMustRemainDistinctFromEffectiveInteraction: true,
    effectiveInteractionMustRemainDistinctFromDamageOutcome: true,
    candidateDiscoveryReadinessReviewAuthorized: true,
    candidateDiscoveryExecutedByThisGate: false,
    authorityAcquiredByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW',
  } as unknown as I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport;
}

describe('I213 hidden-stem interaction eligibility authority discovery readiness review', () => {
  it('accepts the exact I212 seven-requirement boundary', () => {
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(validI212());
    expect(r.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
    expect(r.exactI212BoundaryAccepted).toBe(true);
    expect(r.requirementIds).toEqual(I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS);
    expect(r.requirementCount).toBe(7);
    expect(r.requirementsFrozen).toBe(true);
  });

  it('freezes four bounded discovery paths and fourteen controls', () => {
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(validI212());
    expect(r.discoveryPathIds).toEqual(I213_DISCOVERY_PATH_IDS);
    expect(r.discoveryPathCount).toBe(4);
    expect(r.discoveryPathsFrozen).toBe(true);
    expect(r.discoveryControlIds).toEqual(I213_DISCOVERY_CONTROL_IDS);
    expect(r.discoveryControlCount).toBe(14);
    expect(r.discoveryControlsFrozen).toBe(true);
  });

  it('allows existing-source reinspection and new-source discovery without auto acceptance', () => {
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(validI212());
    expect(r.existingNormalizedSourceDeepReinspectionAllowed).toBe(true);
    expect(r.existingSourceAutoAcceptanceAllowed).toBe(false);
    expect(r.newNormativeSourceDiscoveryAllowed).toBe(true);
    expect(r.sourceClassAloneMayEstablishAuthority).toBe(false);
    expect(r.primaryOrFirstPartyContextPreferredWhenAvailable).toBe(true);
  });

  it('requires source identity/context/locator and rejects weak authority substitutes', () => {
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(validI212());
    expect(r.exactSourceIdentityRequired).toBe(true);
    expect(r.originalOrVerifiedSourceContextRequired).toBe(true);
    expect(r.reproducibleLocatorRequired).toBe(true);
    expect(r.verifiedTranscriptionOrEditionLocatorConfirmationRequiredForCandidateEvidence).toBe(true);
    expect(r.searchSnippetMayCountAsAuthority).toBe(false);
    expect(r.modelSynthesisMayCountAsAuthority).toBe(false);
    expect(r.generalKnowledgeMayCountAsAuthority).toBe(false);
    expect(r.empiricalCalibrationMayCreateAuthority).toBe(false);
  });

  it('keeps membership and visible-stem rules from becoming hidden-stem eligibility', () => {
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(validI212());
    expect(r.hiddenStemMembershipCountsAsEligibility).toBe(false);
    expect(r.visibleStemRuleBackfillAuthorized).toBe(false);
    expect(r.visibleToHiddenScopeRequired).toBe(true);
    expect(r.hiddenToVisibleScopeRequired).toBe(true);
    expect(r.hiddenToHiddenScopeRequired).toBe(true);
    expect(r.explicitPositionContextActivationAndExceptionsRequired).toBe(true);
    expect(r.relationExistenceDistinctFromEffectiveInteraction).toBe(true);
    expect(r.effectiveInteractionDistinctFromDamageOutcome).toBe(true);
  });

  it('permits partial discovery evidence but forbids cross-candidate composition and coverage adjudication', () => {
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(validI212());
    expect(r.partialRequirementEvidenceMayBeRecordedAtDiscovery).toBe(true);
    expect(r.partialEvidenceCountsAsRequirementSatisfiedByDiscovery).toBe(false);
    expect(r.crossCandidateCompositionAuthorized).toBe(false);
    expect(r.requirementCoverageEvaluatedByThisGate).toBe(false);
    expect(r.authorityAcquiredByThisGate).toBe(false);
  });

  it('authorizes discovery only while preserving all current repository guards', () => {
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(validI212());
    expect(r.discoveryAuthorized).toBe(true);
    expect(r.discoveryExecutedByThisGate).toBe(false);
    expect(r.candidateEvidenceRecordedByThisGate).toBe(false);
    expect(r.candidateRegisteredByThisGate).toBe(false);
    expect(r.candidateSelectedByThisGate).toBe(false);
    expect(r.quWei2001HoldPreserved).toBe(true);
    expect(r.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.damageEvaluationAuthorized).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.productionPolicyExecutionAuthorized).toBe(false);
    expect(r.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE',
    );
  });

  it('fails closed if I212 is mutated to let membership satisfy eligibility', () => {
    const mutated = {
      ...validI212(),
      hiddenStemMembershipAloneMayEstablishInteractionEligibility: true,
    } as unknown as I212SourceKeHiddenStemInteractionEligibilityAuthorityGapRequirementsReviewReport;
    const r = buildI213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReview(mutated);
    expect(r.status).toBe('I212_REQUIREMENTS_BOUNDARY_INVALID');
    expect(r.decision).toBe('HIDDEN_STEM_AUTHORITY_DISCOVERY_NOT_READY');
    expect(r.discoveryAuthorized).toBe(false);
    expect(r.discoveryPathCount).toBe(0);
    expect(r.discoveryControlCount).toBe(0);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
