import { describe, expect, it } from 'vitest';
import {
  I207_REASSESSMENT_CONTROL_IDS,
  I207_RESIDUAL_PATH_IDS,
  type I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport,
} from '../src/research/i207-qu-wei-2001-two-gap-acquisition-evidence-adequacy-residual-path-reassessment-review.js';
import {
  buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview,
} from '../src/research/i208-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-readiness-review.js';
import {
  I209_REMAINING_GAP_IDS,
  buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence,
} from '../src/research/i209-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-evidence.js';

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

function validI208() {
  return buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(validI207());
}

describe('I209 Qu Wei 2001 custodian-bound canonical witness/facsimile acquisition evidence', () => {
  it('executes exactly the two frozen I208 paths while preserving the publication resolution', () => {
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(validI208());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE');
    expect(r.exactI208BoundaryAccepted).toBe(true);
    expect(r.resolvedPublicationGapPreserved).toBe(true);
    expect(r.publicationGapRetargetedByThisGate).toBe(false);
    expect(r.acquisitionPathCountExecuted).toBe(2);
    expect(r.allTwoFrozenAcquisitionPathsExecuted).toBe(true);
    expect(r.acquisitionPathEvidenceRecordCount).toBe(2);
    expect(r.evidenceObligationCountAccepted).toBe(8);
    expect(r.acquisitionControlCountAccepted).toBe(16);
  });

  it('records the official first-party custodian/authenticity channel as a lead without inventing a specific 2001 witness', () => {
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(validI208());
    expect(r.officialFirstPartyCustodianChannelLocated).toBe(true);
    expect(r.officialCustodianChannelIdentifiesQuWeiWorkInventory).toBe(true);
    expect(r.officialCustodianChannelListsSizhuXiangzhen).toBe(true);
    expect(r.officialCustodianChannelWarnsAgainstPiratedCopies).toBe(true);
    expect(r.officialCustodianChannelProvidesCurrentPurchaseContact).toBe(true);
    expect(r.officialChronologyBindsAuthorTitleAnd2001Appearance).toBe(true);
    expect(r.specific2001PhysicalWitnessAcquired).toBe(false);
    expect(r.firstGeneration2001TargetScanAcquired).toBe(false);
    expect(r.directSpecificWitnessChainOfCustodyAcquired).toBe(false);
    expect(r.reproduciblePhysicalOrByteStableWitnessIdentityAcquired).toBe(false);
  });

  it('records the contemporaneous sister-witness preface as historical context only', () => {
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(validI208());
    expect(r.contemporaneousSisterWitnessPrefaceContextAcquired).toBe(true);
    expect(r.sisterWitnessTitle).toBe('《六爻详真》');
    expect(r.sisterWitnessPrefaceNamesBothXiangzhenTitles).toBe(true);
    expect(r.sisterWitnessPrefaceDatedXinSiSummer).toBe(true);
    expect(r.sisterWitnessPrefaceDescribesPublicationOccasion).toBe(true);
    expect(r.sisterWitnessContextMayIdentifyTargetWitness).toBe(false);
    expect(r.sisterWitnessPrefaceMayResolveTargetExactPassageGap).toBe(false);
  });

  it('does not claim canonical normalization or exact-passage binding without target witness access', () => {
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(validI208());
    expect(r.canonicalTitleCopyrightTocPaginationTargetStructureAnchorSetAcquired).toBe(false);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
    expect(r.canonically2001BoundTargetSectionFacsimileAcquired).toBe(false);
    expect(r.canonicalTargetSectionPageContextAcquired).toBe(false);
    expect(r.governed2003RouteSequencePreservedAsComparisonTarget).toBe(true);
    expect(r.directCanonical2001To2003SequenceComparisonCompleted).toBe(false);
    expect(r.unboundPublicTextSimilarityMayResolveExactPassageGap).toBe(false);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
  });

  it('keeps zero resolved and both remaining gaps open without cross-backfill', () => {
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(validI208());
    expect(r.contextualEvidencePathCount).toBe(2);
    expect(r.qualifyingGapResolutionEvidenceCount).toBe(0);
    expect(r.resolvedGapCount).toBe(0);
    expect(r.unresolvedGapIds).toEqual(I209_REMAINING_GAP_IDS);
    expect(r.unresolvedGapCount).toBe(2);
    expect(r.explicitNegativeFindingCount).toBe(0);
    expect(r.materiallyNewWebAccessibleEvidenceClassAcquired).toBe(true);
    expect(r.equivalentPublicTargetSurfaceRepeatedAsProgress).toBe(false);
    expect(r.furtherProgressRequiresSpecificCustodianPhysicalFirstGenerationOrCanonicallyBoundTargetAccess).toBe(true);
  });

  it('keeps non-acquisition, custodian silence, access limits and search silence non-negative and non-exhaustive', () => {
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(validI208());
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.custodianSilenceCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.paywallCreatesNegativeFinding).toBe(false);
    expect(r.inaccessibleSubstrateCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.onlineCorpusExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2 and production guards closed', () => {
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(validI208());
    expect(r.allTwoRemainingGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReadyByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCountPreserved).toBe(3);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
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

  it('fails closed when I208 is mutated to authorize equivalent public-surface repetition', () => {
    const mutated = {
      ...validI208(),
      equivalentPublicSurfaceRepeatAuthorizedByThisGate: true,
    } as unknown as ReturnType<typeof validI208>;
    const r = buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(mutated);
    expect(r.status).toBe('I208_CUSTODIAN_BOUND_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE_NOT_EXECUTED');
    expect(r.exactI208BoundaryAccepted).toBe(false);
    expect(r.acquisitionPathCountExecuted).toBe(0);
    expect(r.contextualEvidencePathCount).toBe(0);
    expect(r.unresolvedGapCount).toBe(0);
    expect(r.officialFirstPartyCustodianChannelLocated).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
  });
});
