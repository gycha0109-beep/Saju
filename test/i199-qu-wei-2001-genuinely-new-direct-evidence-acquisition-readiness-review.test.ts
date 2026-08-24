import { describe, expect, it } from 'vitest';
import type { I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport } from '../src/research/i198-qu-wei-2001-three-gap-discovery-evidence-adequacy-path-reassessment-review.js';
import {
  I199_ACQUISITION_CONTROL_IDS,
  I199_ACQUISITION_PATH_IDS,
  I199_EVIDENCE_FUNCTION_IDS,
  buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview,
} from '../src/research/i199-qu-wei-2001-genuinely-new-direct-evidence-acquisition-readiness-review.js';

function validI198(): I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport {
  return {
    reviewId: 'i198_fixture',
    status: 'RESOLVED_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_REVIEW',
    decision: 'I197_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_EQUIVALENT_REPEAT_NOT_JUSTIFIED_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition', adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set', currentInputPackageVersion: 'v2-input-package',
    exactI197BoundaryAccepted: true,
    assessedGapCount: 3, unresolvedFindingCount: 3, explicitNegativeFindingCount: 0,
    evidenceAdequateForRecordedUnresolvedFindings: true,
    printProductionContextAcceptedAsHistoricalContext: true,
    publicationMediumOrEntityGapResolved: false,
    canonicalWitnessNormalizationGapResolved: false,
    exactTargetPassageBindingGapResolved: false,
    completePriorWitnessIdentityAndPassageAdequacyEstablished: false,
    directDoctrinalAntecedentEvidencePreserved: true,
    doctrineLevelAntecedentEqualsExactTargetPassageIdentity: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    identicalNineChannelSurfaceRepeatCountsAsRemediationProgress: false,
    immediateEquivalentNineChannelRepeatJustified: false,
    materiallyNewDirectLeadOrEvidenceClassRequiredBeforeEquivalentRepeat: true,
    direct2001TitleColophonIssuerBindingStillReviewable: true,
    explicit2001PrimaryBibliographicBindingStillReviewable: true,
    directCrossRepresentationNormalizationStillReviewable: true,
    directAlternate2001TargetPassageComparisonStillReviewable: true,
    reviewablePathIds: I199_ACQUISITION_PATH_IDS,
    reviewablePathCount: 4,
    reviewablePathSelectedByThisGate: false,
    materiallyNewDirectEvidenceAcquisitionReadinessReviewMethodologicallyJustified: true,
    materiallyNewDirectEvidenceAcquisitionReadinessReviewAuthorized: true,
    acquisitionExecutedByThisGate: false,
    qualifyingEvidenceAcquiredByThisGate: false,
    printProductionContextMayResolvePublicationIdentity: false,
    laterPublishedWorkClassificationMayBackfill2001Identity: false,
    secondaryCatalogMayResolvePublicationIdentity: false,
    pageCountFileSizeFilenameVarianceMayResolveNormalization: false,
    doctrineLevelSimilarityMayResolveExactPassageBinding: false,
    searchSilenceCreatesNegativeFinding: false,
    channelAccessFailureCreatesNegativeFinding: false,
    failureToLocateExactPhraseCreatesNegativeFinding: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true,
    externalTargetLineageUnresolvedQuestionCount: 3,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    reassessmentRequirementCount: 12,
    reassessmentRequirementsFrozen: true,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true,
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
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_REVIEW',
  } as unknown as I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport;
}

describe('I199 Qu Wei 2001 genuinely-new direct evidence acquisition readiness', () => {
  it('accepts the exact I198 boundary and freezes four paths, six functions and sixteen controls', () => {
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(validI198());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_REVIEW');
    expect(r.exactI198BoundaryAccepted).toBe(true);
    expect(r.acquisitionPathIds).toEqual(I199_ACQUISITION_PATH_IDS);
    expect(r.acquisitionPathCount).toBe(4);
    expect(r.evidenceFunctionIds).toEqual(I199_EVIDENCE_FUNCTION_IDS);
    expect(r.evidenceFunctionCount).toBe(6);
    expect(r.acquisitionControlIds).toEqual(I199_ACQUISITION_CONTROL_IDS);
    expect(r.acquisitionControlCount).toBe(16);
    expect(r.acquisitionPathsFrozenProspectively).toBe(true);
    expect(r.acquisitionControlsFrozenProspectively).toBe(true);
  });

  it('keeps all three gaps open at entry and preserves the direct doctrinal antecedent', () => {
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(validI198());
    expect(r.unresolvedGapCountAtEntry).toBe(3);
    expect(r.publicationIdentityGapOpenAtEntry).toBe(true);
    expect(r.canonicalWitnessNormalizationGapOpenAtEntry).toBe(true);
    expect(r.exactTargetPassageBindingGapOpenAtEntry).toBe(true);
    expect(r.directDoctrinalAntecedentMustBePreserved).toBe(true);
    expect(r.printProductionContextMayBeUsedAsHistoricalContextOnly).toBe(true);
  });

  it('requires genuinely new 2001-specific publication or primary bibliographic binding', () => {
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(validI198());
    expect(r.publicationPathRequires2001SpecificBinding).toBe(true);
    expect(r.primaryBibliographicPathRequiresExplicit2001Binding).toBe(true);
    expect(r.laterMetadataMayBackfill2001PublicationIdentity).toBe(false);
    expect(r.secondaryCatalogMayResolve2001PublicationIdentity).toBe(false);
  });

  it('requires stable normalization evidence and rejects representation variance alone', () => {
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(validI198());
    expect(r.normalizationPathRequiresStableComparisonEvidence).toBe(true);
    expect(r.normalizationPathAllowsHashEvidence).toBe(true);
    expect(r.normalizationPathAllowsTransformationProvenance).toBe(true);
    expect(r.normalizationPathRequiresStructureAnchorsWhereAvailable).toBe(true);
    expect(r.representationVarianceAloneMayResolveNormalization).toBe(false);
  });

  it('requires a direct 2001 passage comparison and prevents doctrine-level backfill', () => {
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(validI198());
    expect(r.targetPassagePathRequiresDirect2001Witness).toBe(true);
    expect(r.targetPassagePathRequiresContextAnchorWhereObservable).toBe(true);
    expect(r.targetPassage2001To2003SequenceComparisonRequired).toBe(true);
    expect(r.doctrineLevelAntecedentAloneMayResolveExactPassageBinding).toBe(false);
    expect(r.gapCrossBackfillAllowed).toBe(false);
  });

  it('authorizes evidence collection only and does not reauthorize the prior nine-channel surface', () => {
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(validI198());
    expect(r.genuinelyNewDirectEvidenceAcquisitionMayProceed).toBe(true);
    expect(r.authorizationIsEvidenceCollectionOnly).toBe(true);
    expect(r.identicalNineChannelSurfaceRepeatAuthorizedByThisGate).toBe(false);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
    expect(r.evidenceAcquiredByThisGate).toBe(false);
    expect(r.gapResolvedByThisGateCount).toBe(0);
  });

  it('keeps negative-evidence, rebinding, independence and production boundaries fail-closed', () => {
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(validI198());
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
    expect(r.allThreeGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
  });

  it('fails closed when the I198 boundary reauthorizes an equivalent nine-channel repeat', () => {
    const mutated = { ...validI198(), immediateEquivalentNineChannelRepeatJustified: true } as unknown as I198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReviewReport;
    const r = buildI199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReview(mutated);
    expect(r.status).toBe('I198_THREE_GAP_PATH_REASSESSMENT_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_NOT_READY');
    expect(r.exactI198BoundaryAccepted).toBe(false);
    expect(r.unresolvedGapCountAtEntry).toBe(0);
    expect(r.genuinelyNewDirectEvidenceAcquisitionMayProceed).toBe(false);
    expect(r.authorizationIsEvidenceCollectionOnly).toBe(false);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
  });
});
