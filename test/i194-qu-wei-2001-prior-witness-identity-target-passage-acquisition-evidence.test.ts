import { describe, expect, it } from 'vitest';
import type { I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport } from '../src/research/i193-qu-wei-2001-prior-witness-identity-target-passage-acquisition-readiness-review.js';
import { buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence } from '../src/research/i194-qu-wei-2001-prior-witness-identity-target-passage-acquisition-evidence.js';

function validI193(): I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i193_fixture',
    status: 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW',
    decision:
      'I192_BOUNDARY_SUPPORTS_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_FOUR_PATHS_EIGHT_EVIDENCE_FUNCTIONS_FROZEN_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI192BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    targetAuthor: '曲炜',
    targetTitle: '《四柱详真》',
    targetAppearanceYear: 2001,
    targetAppearanceBasisMustBeEvidenceBound: true,
    formalPublisherOrIsbnRequiredUnconditionally: false,
    formalPublicationIdentityPathPermitted: true,
    explicitNonformalPublicationIdentityPathPermitted: true,
    unknownPublicationStatusMayBePromotedToFormalPublication: false,
    chronologyAloneEstablishesPublicationMedium: false,
    chronologyAloneEstablishesIndependence: false,
    reproducible2001WitnessLocatorRequired: true,
    editionPrintingOrRepresentationIdentityRequiredWhereObservable: true,
    direct2001TargetScopeContentWitnessRequired: true,
    thirdPartyQuotationAloneEstablishesTargetPassageBinding: false,
    summaryOrParaphraseAloneEstablishesTargetPassageBinding: false,
    targetPassage2001To2003ComparisonRequired: true,
    comparisonMustRecordMatchTypeWithoutPrejudgingOutcome: true,
    exactVerbatimMatchPresupposedByThisGate: false,
    doctrinalAntecedentAloneAutomaticallyEqualsExactPassageIdentity: false,
    targetPassageContextAnchorRequiredWhereObservable: true,
    duplicateDigitalWitnessNormalizationRequired: true,
    pageCountFileSizeOrFilenameVarianceAloneCreatesDistinctEditionIdentity: false,
    derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities: false,
    sameAuthor2001To2003DoctrinalDependencyMustRemainBound: true,
    externalTargetLineageUnresolvedQuestionCountMustRemainThreeAbsentDirectResolution: true,
    acquisitionControlCount: 14,
    acquisitionControlsFrozenProspectively: true,
    evidenceFunctionCount: 8,
    acquisitionPathCount: 4,
    acquisitionPathsFrozenProspectively: true,
    priorWitnessIdentityAndTargetPassageAcquisitionEvidenceMayProceed: true,
    authorizationIsIdentityAndTargetPassageEvidenceCollection: true,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    authorizationIsEvidenceRebinding: false,
    authorizationIsCandidateReplacement: false,
    authorizationIsCandidateSelection: false,
    authorizationIsCandidateRegistration: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
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
    searchSilenceCreatesNegativeFinding: false,
    absenceOfTargetPassageEvidenceEstablishesIndependence: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: true,
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE',
  } as unknown as I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport;
}

describe('I194 Qu Wei 2001 prior-witness identity and target-passage acquisition evidence', () => {
  it('executes all four frozen paths and records eight evidence-function outcomes', () => {
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(validI193());
    expect(report.status).toBe('RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_EVIDENCE');
    expect(report.exactI193BoundaryAccepted).toBe(true);
    expect(report.targetPriorWitnessId).toBe('QU_WEI_SIZHU_XIANGZHEN_2001');
    expect(report.acquisitionPathCountExecuted).toBe(4);
    expect(report.allFourFrozenAcquisitionPathsExecuted).toBe(true);
    expect(report.evidenceRecordCount).toBe(8);
    expect(report.satisfiedFunctionCount).toBe(4);
    expect(report.partiallySatisfiedFunctionCount).toBe(1);
    expect(report.unresolvedFunctionCount).toBe(3);
  });

  it('establishes author-title-year appearance but does not invent publication metadata', () => {
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(validI193());
    expect(report.authorTitleAnd2001AppearanceBasisEstablished).toBe(true);
    expect(report.officialChronologyStates2001Appearance).toBe(true);
    expect(report.formal2001PublisherEstablished).toBe(false);
    expect(report.formal2001IsbnEstablished).toBe(false);
    expect(report.explicit2001NonformalPublicationStatusEstablished).toBe(false);
    expect(report.publicationMediumOrEntityIdentityEstablished).toBe(false);
    expect(report.secondaryCatalogInternalMaterialLabelObserved).toBe(true);
    expect(report.secondaryCatalogInternalMaterialLabelTreatedAsAuthoritativePublicationStatus).toBe(false);
    expect(report.unverifiedAggregatorIsbnObserved).toBe(true);
    expect(report.unverifiedAggregatorIsbnUsedAsAuthority).toBe(false);
  });

  it('records a reproducible content witness while keeping original-edition identity partial', () => {
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(validI193());
    expect(report.reproducibleDigitalContentWitnessEstablished).toBe(true);
    expect(report.reproducibleWitnessBoundToSingleOriginal2001EditionOrPrinting).toBe(false);
    expect(report.reproducible2001WitnessIdentityFinding).toBe('PARTIALLY_SATISFIED');
    expect(report.multipleRepresentationVariantsObserved).toBe(true);
    expect(report.editionPrintingOrRepresentationNormalizationEstablished).toBe(false);
  });

  it('establishes direct 2001 target-scope distance and position force doctrine', () => {
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(validI193());
    expect(report.direct2001TargetScopeContentWitnessEstablished).toBe(true);
    expect(report.direct2001TightVsGapStemForceDifferentiationObserved).toBe(true);
    expect(report.direct2001GapStemForceReductionObserved).toBe(true);
    expect(report.direct2001DistanceAndObstructionForceSemanticsObserved).toBe(true);
  });

  it('classifies the 2001-to-2003 relationship as doctrinal antecedence without verbatim overclaim', () => {
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(validI193());
    expect(report.targetPassageComparisonExecuted).toBe(true);
    expect(report.targetPassageMatchType).toBe('DOCTRINE_LEVEL_ANTECEDENT_WITH_NO_VERBATIM_BINDING_ESTABLISHED');
    expect(report.doctrineLevelAntecedentEstablished).toBe(true);
    expect(report.exact2003TargetPassageVerbatimIn2001Established).toBe(false);
    expect(report.nearVerbatim2001To2003BindingEstablished).toBe(false);
    expect(report.searchFailureToFindExactPhraseCreatesNegativeFinding).toBe(false);
  });

  it('keeps representation variants unnormalized and prevents copy multiplicity from becoming authority', () => {
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(validI193());
    expect(report.observedRepresentationDescriptors.length).toBe(4);
    expect(report.duplicateVariantNormalizationEstablished).toBe(false);
    expect(report.pageCountFileSizeOrFilenameVarianceCreatesDistinctAuthority).toBe(false);
    expect(report.derivativeDigitalCopiesCountAsIndependentAuthorities).toBe(false);
    expect(report.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(report.externalTargetLineageUnresolvedQuestionCountPreserved).toBe(3);
  });

  it('does not authorize rebinding, independence, candidate mutation, threshold, scoring, or production execution', () => {
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(validI193());
    expect(report.identityAndTargetPassageEvidenceCompleteForRebinding).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReadyByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I193 prematurely authorizes evidence rebinding', () => {
    const mutated = {
      ...validI193(),
      evidenceRebindingAuthorizedByThisGate: true,
    } as unknown as I193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReviewReport;
    const report = buildI194QuWei2001PriorWitnessIdentityTargetPassageAcquisitionEvidence(mutated);
    expect(report.status).toBe('I193_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(report.decision).toBe('QU_WEI_2001_PRIOR_WITNESS_ACQUISITION_EVIDENCE_NOT_EXECUTED');
    expect(report.exactI193BoundaryAccepted).toBe(false);
    expect(report.evidenceRecordCount).toBe(0);
    expect(report.acquisitionPathCountExecuted).toBe(0);
  });
});
