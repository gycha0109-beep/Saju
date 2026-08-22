import { describe, expect, test } from 'vitest';
import {
  I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS,
  I156_DISCOVERY_REQUIREMENT_IDS,
  buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport,
} from '../src/index.js';

const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;

function validI155(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport {
  const provenanceInputReadinessRecords = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    provenanceIdentity: `provenance-${index + 1}`,
    dependencyLinks: index === 1 ? ['same-work-witness-a', 'same-work-witness-b'] : [],
    registeredState: 'UNRESOLVED',
    numericWeight: null,
    evidenceBindingPresent: true,
    structurallyReadyForTargetedDerivativeRelationshipResearch: true,
    independenceEstablishedByCurrentPackage: false,
    zeroDependencyLinksWouldEstablishIndependence: false,
  }));

  const base = {
    reviewId: 'i155_i156_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW',
    decision:
      'PROVENANCE_INDEPENDENCE_ADJUDICATION_NOT_READY_EXPLICIT_DERIVATIVE_RELATIONSHIP_EVIDENCE_REQUIRED_TARGETED_DISCOVERY_MAY_PROCEED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'input_package_v2_fixture',
    exactI154ProvenanceFailureAccepted: true,
    exactI151ProvenanceSubstrateAccepted: true,
    evaluationAndPackageIdentityMatch: true,
    provenanceAdjudicationRequirementIds: I155_PROVENANCE_ADJUDICATION_REQUIREMENT_IDS,
    provenanceAdjudicationRequirementCount: 7,
    provenanceInputReadinessRecords,
    provenanceInputCount: 6,
    unresolvedProvenanceInputCount: 6,
    uniqueProvenanceIdentityCount: 6,
    registeredDependencyLinkCount: 2,
    inputsWithRegisteredDependencyLinks: 1,
    allProvenanceInputsBindRegisteredEvidence: true,
    allProvenanceInputsRemainUnresolved: true,
    allNumericWeightsRemainNull: true,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    sourceClassAloneSufficient: false,
    provenanceTierMayBecomeNumericWeight: false,
    sourceCountMayBecomeNumericWeight: false,
    defaultWhenIndependenceUnresolved: 'REJECT_INDEPENDENCE_CLAIM',
    zeroRegisteredDependencyLinksDoesNotEstablishIndependence: true,
    uniqueSourceIdentityDoesNotEstablishIndependence: true,
    sameWorkAlternateWitnessDoesNotIncreaseIndependentAuthority: true,
    currentV2PackageContainsCompletedDerivativeRelationshipAdjudication: false,
    currentV2PackageContainsSufficientIndependenceFindingForAllSixInputs: false,
    provenanceIndependenceAdjudicationReadyFromCurrentPackageAlone: false,
    targetedDerivativeRelationshipAuthorityDiscoveryReady: true,
    targetedDiscoveryMustBindEachFindingToEvidenceIdAndProvenanceIdentity: true,
    targetedDiscoveryMustRecordPositiveNegativeOrUnresolvedRelationshipFinding: true,
    targetedDiscoveryMayNotUseSourceCountAsVote: true,
    targetedDiscoveryMayNotUseProvenanceTierAsWeight: true,
    targetedDiscoveryMayNotPromoteAbsenceOfKnownDependencyToIndependence: true,
    consumedI153AuthorizationReusable: false,
    newPackageVersionRequiredBeforeAnyLaterReevaluation: true,
    newEvaluationAuthorizationRequiredAfterAnyLaterPackageRegistration: true,
    inputPackageMutatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceAdjudicationReadinessReviewReport;
}

describe('I156 provenance derivative-relationship authority discovery readiness review', () => {
  test('accepts exact I155 and registers six conclusion-neutral discovery targets', () => {
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'SIX_PROVENANCE_INPUTS_READY_FOR_TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NO_INDEPENDENCE_FINDING_NO_PACKAGE_MUTATION',
    );
    expect(report.exactI155ReadinessAccepted).toBe(true);
    expect(report.discoveryTargetCount).toBe(6);
    expect(report.discoveryTargetRecords).toHaveLength(6);
  });

  test('freezes the exact eight discovery requirements for every target', () => {
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155(),
    );

    expect(report.discoveryRequirementIds).toEqual(I156_DISCOVERY_REQUIREMENT_IDS);
    expect(report.discoveryRequirementCount).toBe(8);
    expect(
      report.discoveryTargetRecords.every(
        (target) => target.requiredDiscoveryRequirementIds === I156_DISCOVERY_REQUIREMENT_IDS,
      ),
    ).toBe(true);
  });

  test('keeps every discovery target conclusion-neutral before research execution', () => {
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155(),
    );

    expect(report.allTargetsRemainConclusionNeutralBeforeDiscovery).toBe(true);
    expect(
      report.discoveryTargetRecords.every(
        (target) =>
          target.discoveryState === 'TARGETED_DISCOVERY_NOT_EXECUTED' &&
          target.relationshipFindingState === 'NOT_RESEARCHED' &&
          target.independenceFindingState === 'NOT_AUTHORIZED',
      ),
    ).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.derivativeRelationshipFindingMadeByThisGate).toBe(false);
    expect(report.provenanceIndependenceFindingAuthorizedByThisGate).toBe(false);
  });

  test('requires auditable tri-state findings and explicit basis for a negative derivative finding', () => {
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155(),
    );

    expect(report.triStateRelationshipFindingRequired).toBe(true);
    expect(report.allowedRelationshipFindingStates).toEqual([
      'DERIVATIVE_DEPENDENCY_FOUND',
      'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
      'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
    ]);
    expect(report.negativeRelationshipFindingRequiresExplicitSearchBasis).toBe(true);
    expect(report.absenceOfKnownDependencyMayBecomeNegativeFinding).toBe(false);
    expect(report.emptyRegisteredDependencyLinksMayBecomeIndependenceFinding).toBe(false);
    expect(report.uniqueProvenanceIdentityMayBecomeIndependenceFinding).toBe(false);
  });

  test('preserves known same-work dependency links without turning them into votes or weights', () => {
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155(),
    );

    expect(report.knownRegisteredDependencyLinkCount).toBe(2);
    expect(report.targetsWithKnownRegisteredDependencyLinks).toBe(1);
    expect(report.discoveryTargetRecords[1]?.registeredDependencyLinks).toEqual([
      'same-work-witness-a',
      'same-work-witness-b',
    ]);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
  });

  test('fails closed if I155 no longer requires targeted derivative relationship discovery', () => {
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155({ targetedDerivativeRelationshipAuthorityDiscoveryReady: false }),
    );

    expect(report.status).toBe('I155_PROVENANCE_DISCOVERY_READINESS_INVALID');
    expect(report.decision).toBe('TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NOT_READY');
    expect(report.discoveryTargetCount).toBe(0);
  });

  test('fails closed if an upstream provenance input is pre-promoted to independence', () => {
    const i155 = validI155();
    const alteredRecords = i155.provenanceInputReadinessRecords.map((record, index) =>
      index === 0 ? { ...record, independenceEstablishedByCurrentPackage: true } : record,
    );
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155({ provenanceInputReadinessRecords: alteredRecords }),
    );

    expect(report.status).toBe('I155_PROVENANCE_DISCOVERY_READINESS_INVALID');
    expect(report.exactI155ReadinessAccepted).toBe(false);
    expect(report.discoveryTargetRecords).toEqual([]);
  });

  test('preserves package and production authority boundaries and points only to discovery evidence', () => {
    const report = buildI156ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReview(
      validI155(),
    );

    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.newPackageVersionCreatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationPerformedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE',
    );
  });
});
