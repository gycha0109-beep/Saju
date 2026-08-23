import { describe, expect, it } from 'vitest';
import {
  I201_HIGHER_PROVENANCE_REMEDIATION_PATH_IDS,
  type I201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReviewReport,
} from '../src/research/i201-qu-wei-2001-new-direct-evidence-adequacy-remediation-path-reassessment-review.js';
import {
  I202_ACQUISITION_CONTROL_IDS,
  I202_ACQUISITION_PATH_IDS,
  I202_EVIDENCE_OBLIGATION_IDS,
  buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview,
} from '../src/research/i202-qu-wei-2001-higher-provenance-substrate-acquisition-readiness-review.js';

function validI201(): I201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReviewReport {
  return {
    reviewId: 'i201_fixture',
    status: 'RESOLVED_QU_WEI_2001_NEW_DIRECT_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW',
    decision:
      'I200_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_FINDINGS_EQUIVALENT_PUBLIC_ONLINE_REPETITION_NOT_JUSTIFIED_HIGHER_PROVENANCE_SUBSTRATE_REMEDIATION_READINESS_MAY_PROCEED_NO_EXHAUSTION_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI200BoundaryAccepted: true,
    evidenceAdequateForBoundedNonResolution: true,
    contextualNewEvidencePathCountAccepted: 2,
    qualifyingGapResolutionEvidenceCountAccepted: 0,
    resolvedGapCountAccepted: 0,
    unresolvedGapCountAccepted: 3,
    explicitNegativeFindingCountAccepted: 0,
    publicationIdentityGapRemainsUnresolved: true,
    canonicalWitnessNormalizationGapRemainsUnresolved: true,
    exactTargetPassageBindingGapRemainsUnresolved: true,
    newRepresentationVariancePreservedAsContextOnly: true,
    newTitleBearingTargetSectionPreservedAsContextOnly: true,
    directDoctrinalAntecedentPreserved: true,
    equivalentPublicOnlineSearchRepetitionCountsAsRemediationProgress: false,
    equivalentPublicOnlineSearchRepetitionImmediatelyJustified: false,
    strongerRemediationMustChangeEvidenceSubstrate: true,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    higherProvenanceRemediationPathIds: I201_HIGHER_PROVENANCE_REMEDIATION_PATH_IDS,
    higherProvenanceRemediationPathCount: 4,
    higherProvenanceRemediationPathsFrozenForNextReadiness: true,
    physicalOrFirstGenerationWitnessPathStillReviewable: true,
    firstPartyIssuanceRecordPathStillReviewable: true,
    byteStableScanLineageNormalizationPathStillReviewable: true,
    canonicallyBoundTargetFacsimilePathStillReviewable: true,
    remediationPathSelectedByThisGate: false,
    higherProvenanceAcquisitionReadinessReviewMethodologicallyJustified: true,
    higherProvenanceAcquisitionReadinessReviewAuthorized: true,
    acquisitionAuthorizedByThisGate: false,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    evidenceForOneGapMayBackfillAnotherGap: false,
    searchSilenceCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
    failureToLocateExactPhraseCreatesNegativeFinding: false,
    allThreeGapsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
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
    reassessmentControlCount: 16,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW',
  } as unknown as I201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReviewReport;
}

describe('I202 Qu Wei 2001 higher-provenance substrate acquisition readiness', () => {
  it('accepts the exact I201 boundary and freezes four paths, eight obligations, and eighteen controls', () => {
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(validI201());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW');
    expect(r.exactI201BoundaryAccepted).toBe(true);
    expect(r.acquisitionPathIds).toEqual(I202_ACQUISITION_PATH_IDS);
    expect(r.acquisitionPathCount).toBe(4);
    expect(r.evidenceObligationIds).toEqual(I202_EVIDENCE_OBLIGATION_IDS);
    expect(r.evidenceObligationCount).toBe(8);
    expect(r.acquisitionControlIds).toEqual(I202_ACQUISITION_CONTROL_IDS);
    expect(r.acquisitionControlCount).toBe(18);
    expect(r.acquisitionPathsFrozenProspectively).toBe(true);
    expect(r.evidenceObligationsFrozenProspectively).toBe(true);
    expect(r.acquisitionControlsFrozenProspectively).toBe(true);
  });

  it('keeps the three Qu Wei 2001 gaps open at entry', () => {
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(validI201());
    expect(r.targetPriorWitnessId).toBe('QU_WEI_SIZHU_XIANGZHEN_2001');
    expect(r.targetAuthor).toBe('曲炜');
    expect(r.targetTitle).toBe('《四柱详真》');
    expect(r.targetAppearanceYear).toBe(2001);
    expect(r.unresolvedGapCountAtEntry).toBe(3);
    expect(r.publicationIdentityGapOpenAtEntry).toBe(true);
    expect(r.canonicalWitnessNormalizationGapOpenAtEntry).toBe(true);
    expect(r.exactTargetPassageBindingGapOpenAtEntry).toBe(true);
  });

  it('requires reproducible physical or first-generation witness identity and explicit first-party 2001 binding', () => {
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(validI201());
    expect(r.physicalOrFirstGenerationWitnessRequiresReproducibleIdentity).toBe(true);
    expect(r.physicalOrFirstGenerationWitnessRequiresProvenanceContext).toBe(true);
    expect(r.directWitnessTitleCopyrightImprintColophonCaptureRequired).toBe(true);
    expect(r.firstPartyOrArchiveRecordRequiresExplicitAuthorTitle2001Binding).toBe(true);
    expect(r.laterMetadataMayBackfill2001IssuanceIdentity).toBe(false);
    expect(r.secondaryCatalogMayBackfill2001IssuanceIdentity).toBe(false);
  });

  it('requires byte-stable identity and structure comparison for normalization', () => {
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(validI201());
    expect(r.byteStableRepresentationHashesOrEquivalentIdsRequired).toBe(true);
    expect(r.scanLineageOrTransformationProvenanceRequiredWhereAvailable).toBe(true);
    expect(r.directStructureComparisonRequiredForNormalization).toBe(true);
    expect(r.pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization).toBe(false);
  });

  it('requires canonical 2001 facsimile binding before exact passage promotion', () => {
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(validI201());
    expect(r.targetFacsimileRequiresCanonical2001Binding).toBe(true);
    expect(r.targetFacsimileRequiresContextAnchor).toBe(true);
    expect(r.direct2001To2003SequenceComparisonRequired).toBe(true);
    expect(r.doctrineLevelAntecedentAloneMayResolveExactPassageBinding).toBe(false);
    expect(r.evidenceForOneGapMayBackfillAnotherGap).toBe(false);
  });

  it('authorizes evidence collection only and keeps inaccessible substrate non-negative and non-exhaustive', () => {
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(validI201());
    expect(r.higherProvenanceSubstrateAcquisitionMayProceed).toBe(true);
    expect(r.authorizationIsEvidenceCollectionOnly).toBe(true);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
    expect(r.evidenceAcquiredByThisGate).toBe(false);
    expect(r.inaccessibleSubstrateCreatesNegativeFinding).toBe(false);
    expect(r.unavailableCustodianCreatesNegativeFinding).toBe(false);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.onlineCorpusExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2, and production authority fail-closed', () => {
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(validI201());
    expect(r.allThreeGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCount).toBe(3);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
  });

  it('fails closed if I201 is mutated to permit equivalent public-online repetition as progress', () => {
    const mutated = {
      ...validI201(),
      equivalentPublicOnlineSearchRepetitionCountsAsRemediationProgress: true,
    } as unknown as I201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReviewReport;
    const r = buildI202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReview(mutated);
    expect(r.status).toBe('I201_HIGHER_PROVENANCE_REMEDIATION_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_NOT_READY');
    expect(r.exactI201BoundaryAccepted).toBe(false);
    expect(r.unresolvedGapCountAtEntry).toBe(0);
    expect(r.higherProvenanceSubstrateAcquisitionMayProceed).toBe(false);
    expect(r.authorizationIsEvidenceCollectionOnly).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
