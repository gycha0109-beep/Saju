import { describe, expect, it } from 'vitest';
import {
  I207_REASSESSMENT_CONTROL_IDS,
  I207_RESIDUAL_PATH_IDS,
  type I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport,
} from '../src/research/i207-qu-wei-2001-two-gap-acquisition-evidence-adequacy-residual-path-reassessment-review.js';
import {
  I208_ACQUISITION_CONTROL_IDS,
  I208_ACQUISITION_PATH_IDS,
  I208_EVIDENCE_OBLIGATION_IDS,
  buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview,
} from '../src/research/i208-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-readiness-review.js';

function validI207(): I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport {
  return {
    reviewId: 'i207_fixture',
    status: 'RESOLVED_QU_WEI_2001_TWO_GAP_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
    decision:
      'I206_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_ROUTE_SEQUENCE_CORRESPONDENCE_MATERIAL_BUT_UNBOUND_REBINDING_NOT_READY_EQUIVALENT_PUBLIC_REPEAT_NOT_JUSTIFIED_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_READINESS_MAY_PROCEED_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI206BoundaryAccepted: true,
    i206EvidenceAdequateForRecordedUnresolvedFindings: true,
    resolvedPublicationGapPreserved: true,
    publicationGapReopenedByThisGate: false,
    assessedRemainingGapCount: 2,
    resolvedRemainingGapCount: 0,
    unresolvedRemainingGapCount: 2,
    explicitNegativeFindingCountAccepted: 0,
    contextualEvidencePathCountAccepted: 2,
    qualifyingGapResolutionEvidenceCountAccepted: 0,
    publicRepresentationOverlapAcceptedAsContext: true,
    publicRepresentationOverlapQualifiesAsCanonicalIdentity: false,
    byteStableRepresentationPairStillMissing: true,
    scanLineageOrTransformationProvenanceStillMissing: true,
    directFullStructureNormalizationStillMissing: true,
    canonicalWitnessNormalizationGapResolved: false,
    unboundRouteSequenceComparisonAcceptedAsContext: true,
    substantialRouteSequenceCorrespondenceAccepted: true,
    correspondingRouteElementCountAccepted: 3,
    unboundSequenceComparisonHasMaterialDoctrinalValue: true,
    unboundSequenceComparisonQualifiesAsExactOrNearVerbatimBinding: false,
    sequenceCorrespondenceStrengthensSameAuthorDependencyContext: true,
    governed2003SequenceAvailableForFutureCanonicalComparison: true,
    canonically2001BoundTargetSectionStillMissing: true,
    exactTargetPassageBindingGapResolved: false,
    doctrineLevelAntecedentPreserved: true,
    doctrineLevelAntecedentEqualsExactPassageIdentity: false,
    equivalentPublicSurfaceRepeatCountsAsRemediationProgress: false,
    immediateEquivalentPublicSurfaceRepeatJustified: false,
    materiallyNewCustodianOrCanonicallyBoundSubstrateRequired: true,
    publicRepresentationOverlapSupportsTargetingButNotNormalization: true,
    unboundSequenceCorrespondenceSupportsFacsimileTargetingButNotBinding: true,
    governed2003SequenceMayBeReusedOnlyAfterCanonical2001Binding: true,
    residualPathIds: I207_RESIDUAL_PATH_IDS,
    residualPathCount: 2,
    residualPathsFrozenProspectively: true,
    custodianOrFirstGenerationWitnessPathStillReviewable: true,
    canonicallyBoundTargetFacsimilePathStillReviewable: true,
    residualPathSelectedByThisGate: false,
    residualAcquisitionReadinessReviewMethodologicallyJustified: true,
    residualAcquisitionReadinessReviewAuthorized: true,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
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
    reassessmentControlIds: I207_REASSESSMENT_CONTROL_IDS,
    reassessmentControlCount: 12,
    reassessmentControlsFrozen: true,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW',
  } as unknown as I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport;
}

describe('I208 Qu Wei 2001 custodian-bound canonical witness/facsimile acquisition readiness', () => {
  it('accepts the exact I207 material-but-unbound residual boundary', () => {
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW');
    expect(r.exactI207BoundaryAccepted).toBe(true);
    expect(r.remainingGapCountAtEntry).toBe(2);
    expect(r.canonicalWitnessNormalizationGapOpenAtEntry).toBe(true);
    expect(r.exactTargetPassageBindingGapOpenAtEntry).toBe(true);
    expect(r.materialUnboundRouteSequenceCorrespondencePreserved).toBe(true);
    expect(r.correspondingRouteElementCountPreserved).toBe(3);
  });

  it('preserves the resolved publication gap and forbids equivalent public-surface repetition', () => {
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
    expect(r.resolvedPublicationGapPreserved).toBe(true);
    expect(r.publicationGapTargetedByThisGate).toBe(false);
    expect(r.publicationGapMayBeReopenedWithoutContradictoryPrimaryEvidence).toBe(false);
    expect(r.equivalentPublicSurfaceRepeatAuthorizedByThisGate).toBe(false);
  });

  it('freezes exactly two materially-new substrate paths, eight obligations, and sixteen controls', () => {
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
    expect(r.acquisitionPathIds).toEqual(I208_ACQUISITION_PATH_IDS);
    expect(r.acquisitionPathCount).toBe(2);
    expect(r.acquisitionPathsFrozenProspectively).toBe(true);
    expect(r.evidenceObligationIds).toEqual(I208_EVIDENCE_OBLIGATION_IDS);
    expect(r.evidenceObligationCount).toBe(8);
    expect(r.evidenceObligationsFrozenProspectively).toBe(true);
    expect(r.acquisitionControlIds).toEqual(I208_ACQUISITION_CONTROL_IDS);
    expect(r.acquisitionControlCount).toBe(16);
    expect(r.acquisitionControlsFrozenProspectively).toBe(true);
  });

  it('requires direct custodian provenance, reproducible witness identity, and structure anchors for normalization', () => {
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
    expect(r.directCustodianArchiveOwnerOrFirstGenerationIdentityRequired).toBe(true);
    expect(r.directAuthorTitle2001WitnessProvenanceRequired).toBe(true);
    expect(r.secondaryMetadataMayBackfillWitnessProvenance).toBe(false);
    expect(r.reproduciblePhysicalScanOrByteStableIdentityRequired).toBe(true);
    expect(r.titleCopyrightTocPaginationTargetStructureAnchorsRequired).toBe(true);
    expect(r.pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization).toBe(false);
  });

  it('requires canonical 2001 facsimile context before reusing the governed 2003 route sequence', () => {
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
    expect(r.canonically2001BoundTargetSectionFacsimileRequired).toBe(true);
    expect(r.targetSectionPageContextOrNeighboringTextAnchorsRequired).toBe(true);
    expect(r.governed2003RouteSequenceAvailableAsComparisonTarget).toBe(true);
    expect(r.directCanonical2001To2003SequenceComparisonRequired).toBe(true);
    expect(r.unboundPublicTextSimilarityMayResolveExactPassageGap).toBe(false);
    expect(r.normalizationAndExactPassageMayCrossBackfill).toBe(false);
  });

  it('authorizes evidence collection only and keeps non-acquisition non-negative', () => {
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
    expect(r.custodianBoundCanonicalWitnessFacsimileAcquisitionMayProceed).toBe(true);
    expect(r.authorizationIsEvidenceCollectionOnly).toBe(true);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
    expect(r.evidenceAcquiredByThisGate).toBe(false);
    expect(r.gapResolvedByThisGateCount).toBe(0);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.custodianSilenceCreatesNegativeFinding).toBe(false);
    expect(r.paywallCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2 and production guards closed', () => {
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
    expect(r.allTwoRemainingGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCount).toBe(3);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
  });

  it('fails closed when I207 is mutated to count equivalent public-surface repetition as remediation progress', () => {
    const mutated = {
      ...validI207(),
      equivalentPublicSurfaceRepeatCountsAsRemediationProgress: true,
    } as unknown as I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport;
    const r = buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(mutated);
    expect(r.status).toBe('I207_RESIDUAL_PATH_REASSESSMENT_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_NOT_READY');
    expect(r.exactI207BoundaryAccepted).toBe(false);
    expect(r.remainingGapCountAtEntry).toBe(0);
    expect(r.acquisitionPathsFrozenProspectively).toBe(false);
    expect(r.custodianBoundCanonicalWitnessFacsimileAcquisitionMayProceed).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
