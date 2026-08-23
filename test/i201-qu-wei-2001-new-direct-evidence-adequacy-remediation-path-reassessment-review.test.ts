import { describe, expect, it } from 'vitest';
import {
  I199_ACQUISITION_CONTROL_IDS,
  I199_ACQUISITION_PATH_IDS,
  I199_EVIDENCE_FUNCTION_IDS,
  type I199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReviewReport,
} from '../src/research/i199-qu-wei-2001-genuinely-new-direct-evidence-acquisition-readiness-review.js';
import {
  buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence,
  type I200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidenceReport,
} from '../src/research/i200-qu-wei-2001-genuinely-new-direct-evidence-acquisition-evidence.js';
import {
  I201_HIGHER_PROVENANCE_REMEDIATION_PATH_IDS,
  I201_REASSESSMENT_CONTROL_IDS,
  buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview,
} from '../src/research/i201-qu-wei-2001-new-direct-evidence-adequacy-remediation-path-reassessment-review.js';

function validI199(): I199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i199_fixture',
    status: 'RESOLVED_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    decision:
      'I198_BOUNDARY_SUPPORTS_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_FOUR_PATHS_SIX_FUNCTIONS_SIXTEEN_CONTROLS_FROZEN_EVIDENCE_COLLECTION_ONLY_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI198BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    targetAuthor: '曲炜',
    targetTitle: '《四柱详真》',
    targetAppearanceYear: 2001,
    unresolvedGapCountAtEntry: 3,
    publicationIdentityGapOpenAtEntry: true,
    canonicalWitnessNormalizationGapOpenAtEntry: true,
    exactTargetPassageBindingGapOpenAtEntry: true,
    directDoctrinalAntecedentMustBePreserved: true,
    printProductionContextMayBeUsedAsHistoricalContextOnly: true,
    publicationPathRequires2001SpecificBinding: true,
    primaryBibliographicPathRequiresExplicit2001Binding: true,
    laterMetadataMayBackfill2001PublicationIdentity: false,
    secondaryCatalogMayResolve2001PublicationIdentity: false,
    normalizationPathRequiresStableComparisonEvidence: true,
    normalizationPathAllowsHashEvidence: true,
    normalizationPathAllowsTransformationProvenance: true,
    normalizationPathRequiresStructureAnchorsWhereAvailable: true,
    representationVarianceAloneMayResolveNormalization: false,
    targetPassagePathRequiresDirect2001Witness: true,
    targetPassagePathRequiresContextAnchorWhereObservable: true,
    targetPassage2001To2003SequenceComparisonRequired: true,
    doctrineLevelAntecedentAloneMayResolveExactPassageBinding: false,
    gapCrossBackfillAllowed: false,
    acquisitionPathIds: I199_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 4,
    acquisitionPathsFrozenProspectively: true,
    evidenceFunctionIds: I199_EVIDENCE_FUNCTION_IDS,
    evidenceFunctionCount: 6,
    acquisitionControlIds: I199_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 16,
    acquisitionControlsFrozenProspectively: true,
    genuinelyNewDirectEvidenceAcquisitionMayProceed: true,
    authorizationIsEvidenceCollectionOnly: true,
    identicalNineChannelSurfaceRepeatAuthorizedByThisGate: false,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    gapResolvedByThisGateCount: 0,
    explicitNegativeFindingCountCreatedByThisGate: 0,
    searchSilenceCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_EVIDENCE',
  } as unknown as I199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReviewReport;
}

function validI200(): I200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidenceReport {
  return buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
}

describe('I201 Qu Wei 2001 new-direct-evidence adequacy and remediation-path reassessment', () => {
  it('accepts I200 as adequate bounded evidence for three unresolved findings', () => {
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(validI200());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_NEW_DIRECT_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW');
    expect(r.exactI200BoundaryAccepted).toBe(true);
    expect(r.evidenceAdequateForBoundedNonResolution).toBe(true);
    expect(r.contextualNewEvidencePathCountAccepted).toBe(2);
    expect(r.qualifyingGapResolutionEvidenceCountAccepted).toBe(0);
    expect(r.resolvedGapCountAccepted).toBe(0);
    expect(r.unresolvedGapCountAccepted).toBe(3);
    expect(r.explicitNegativeFindingCountAccepted).toBe(0);
  });

  it('preserves all three gaps and keeps both I200 contextual gains context-only', () => {
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(validI200());
    expect(r.publicationIdentityGapRemainsUnresolved).toBe(true);
    expect(r.canonicalWitnessNormalizationGapRemainsUnresolved).toBe(true);
    expect(r.exactTargetPassageBindingGapRemainsUnresolved).toBe(true);
    expect(r.newRepresentationVariancePreservedAsContextOnly).toBe(true);
    expect(r.newTitleBearingTargetSectionPreservedAsContextOnly).toBe(true);
    expect(r.directDoctrinalAntecedentPreserved).toBe(true);
  });

  it('rejects equivalent public-online repetition as progress without asserting exhaustion', () => {
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(validI200());
    expect(r.equivalentPublicOnlineSearchRepetitionCountsAsRemediationProgress).toBe(false);
    expect(r.equivalentPublicOnlineSearchRepetitionImmediatelyJustified).toBe(false);
    expect(r.strongerRemediationMustChangeEvidenceSubstrate).toBe(true);
    expect(r.onlineCorpusExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
    expect(r.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('freezes exactly four higher-provenance substrate paths for a later readiness gate', () => {
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(validI200());
    expect(r.higherProvenanceRemediationPathIds).toEqual(I201_HIGHER_PROVENANCE_REMEDIATION_PATH_IDS);
    expect(r.higherProvenanceRemediationPathCount).toBe(4);
    expect(r.higherProvenanceRemediationPathsFrozenForNextReadiness).toBe(true);
    expect(r.physicalOrFirstGenerationWitnessPathStillReviewable).toBe(true);
    expect(r.firstPartyIssuanceRecordPathStillReviewable).toBe(true);
    expect(r.byteStableScanLineageNormalizationPathStillReviewable).toBe(true);
    expect(r.canonicallyBoundTargetFacsimilePathStillReviewable).toBe(true);
    expect(r.remediationPathSelectedByThisGate).toBe(false);
  });

  it('authorizes only a later higher-provenance readiness review and does not execute acquisition', () => {
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(validI200());
    expect(r.higherProvenanceAcquisitionReadinessReviewMethodologicallyJustified).toBe(true);
    expect(r.higherProvenanceAcquisitionReadinessReviewAuthorized).toBe(true);
    expect(r.acquisitionAuthorizedByThisGate).toBe(false);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
    expect(r.evidenceAcquiredByThisGate).toBe(false);
    expect(r.reassessmentControlIds).toEqual(I201_REASSESSMENT_CONTROL_IDS);
    expect(r.reassessmentControlCount).toBe(16);
    expect(r.reassessmentControlsFrozen).toBe(true);
  });

  it('keeps cross-gap backfill and negative-evidence inference prohibited', () => {
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(validI200());
    expect(r.evidenceForOneGapMayBackfillAnotherGap).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.failureToLocateExactPhraseCreatesNegativeFinding).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2 and production authority fail-closed', () => {
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(validI200());
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
    expect(r.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I200 is mutated to claim online-corpus exhaustion', () => {
    const mutated = {
      ...validI200(),
      onlineCorpusExhaustionEstablished: true,
    } as unknown as I200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidenceReport;
    const r = buildI201QuWei2001NewDirectEvidenceAdequacyRemediationPathReassessmentReview(mutated);
    expect(r.status).toBe('I200_NEW_DIRECT_EVIDENCE_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_NEW_DIRECT_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_NOT_READY');
    expect(r.exactI200BoundaryAccepted).toBe(false);
    expect(r.evidenceAdequateForBoundedNonResolution).toBe(false);
    expect(r.unresolvedGapCountAccepted).toBe(0);
    expect(r.higherProvenanceRemediationPathIds).toEqual([]);
    expect(r.higherProvenanceRemediationPathCount).toBe(0);
    expect(r.higherProvenanceAcquisitionReadinessReviewAuthorized).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
