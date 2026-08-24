import { describe, expect, it } from 'vitest';
import type { I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport } from '../src/research/i192-qu-wei-lineage-evidence-adequacy-origin-reassessment-review.js';
import {
  I193_ACQUISITION_CONTROL_IDS,
  I193_ACQUISITION_PATH_IDS,
  I193_EVIDENCE_FUNCTION_IDS,
  buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview,
} from '../src/research/i193-qu-wei-2001-prior-witness-identity-target-passage-acquisition-readiness-review.js';

function validI192(): I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport {
  return {
    reviewId: 'i192_fixture',
    status: 'RESOLVED_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW',
    decision:
      'I191_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_QU_WEI_2003_AS_PRESUMED_ORIGIN_PRIOR_2001_SIZHU_XIANGZHEN_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_TARGET_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI191BoundaryAccepted: true,
    i191LineageEvidenceAdequateForOriginReassessment: true,
    priorSameAuthorDoctrinalDependencyAccepted: true,
    priorSameAuthorDependencyFindingCountAccepted: 1,
    unresolvedExternalTargetLineageQuestionCount: 3,
    quWei2003PresumedOriginRetired: true,
    quWei2003MayRemainPresumedOrigin: false,
    quWei2003IndependentNormativeProvenanceEstablished: false,
    prior2001WitnessIdentified: true,
    prior2001WitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    prior2001WitnessTitle: '《四柱详真》',
    prior2001WitnessAuthor: '曲炜',
    prior2001WitnessYear: 2001,
    prior2001WitnessChronologyEstablished: true,
    prior2001WitnessContainsDistanceSensitiveDoctrine: true,
    prior2001WitnessContainsAdjacentVsGapForceDifferentiation: true,
    prior2001WitnessContainsCrossPillarRestriction: true,
    prior2001WitnessContainsGapClashNoEffectiveForceRule: true,
    exact2003PassageVerbatimIn2001Established: false,
    prior2001FormalPublicationIdentityComplete: false,
    prior2001ReproducibleWitnessIdentityComplete: false,
    prior2001ExactTargetPassageBindingComplete: false,
    prior2001MayBeTreatedAsIndependentBecauseEarlier: false,
    prior2001MayBeReboundByThisGate: false,
    prior2001IdentityAndTargetPassageAcquisitionReadinessReviewAuthorizedByThisGate: true,
    prior2001IdentityAndTargetPassageAcquisitionExecutedByThisGate: false,
    prior2001EvidenceRebindingMethodologicallyReady: false,
    prior2001EvidenceRebindingAuthorizedByThisGate: false,
    prior2001EvidenceRebindingExecutedByThisGate: false,
    liHanchenTargetDependencyStillUnresolved: true,
    liHongchengTargetDependencyStillUnresolved: true,
    otherEarlierDistinctiveSourceRelationshipStillUnresolved: true,
    thirdPartySuccessionClaimAloneEstablishesDerivativeEdge: false,
    generalTeacherRelationshipAloneEstablishesTargetScopeDependency: false,
    chronologyAloneEstablishesTargetScopeDependency: false,
    absenceOfDependencyEvidenceEstablishesIndependence: false,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: true,
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true,
    li1998WitnessIndependentProvenanceEstablished: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    searchSilenceCreatesNegativeFinding: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW',
  } as unknown as I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport;
}

describe('I193 Qu Wei 2001 prior-witness identity and target-passage acquisition readiness', () => {
  it('accepts the exact I192 boundary and binds the 2001 prior-witness target', () => {
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(validI192());
    expect(report.status).toBe('RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW');
    expect(report.exactI192BoundaryAccepted).toBe(true);
    expect(report.targetPriorWitnessId).toBe('QU_WEI_SIZHU_XIANGZHEN_2001');
    expect(report.targetAuthor).toBe('曲炜');
    expect(report.targetTitle).toBe('《四柱详真》');
    expect(report.targetAppearanceYear).toBe(2001);
  });

  it('freezes fourteen controls, eight evidence functions, and four acquisition paths', () => {
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(validI192());
    expect(report.acquisitionControlIds).toEqual(I193_ACQUISITION_CONTROL_IDS);
    expect(report.acquisitionControlCount).toBe(14);
    expect(report.acquisitionControlsFrozenProspectively).toBe(true);
    expect(report.evidenceFunctionIds).toEqual(I193_EVIDENCE_FUNCTION_IDS);
    expect(report.evidenceFunctionCount).toBe(8);
    expect(report.acquisitionPathIds).toEqual(I193_ACQUISITION_PATH_IDS);
    expect(report.acquisitionPathCount).toBe(4);
    expect(report.acquisitionPathsFrozenProspectively).toBe(true);
  });

  it('requires publication and reproducible witness identity without inventing formal metadata', () => {
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(validI192());
    expect(report.targetAppearanceBasisMustBeEvidenceBound).toBe(true);
    expect(report.formalPublisherOrIsbnRequiredUnconditionally).toBe(false);
    expect(report.formalPublicationIdentityPathPermitted).toBe(true);
    expect(report.explicitNonformalPublicationIdentityPathPermitted).toBe(true);
    expect(report.unknownPublicationStatusMayBePromotedToFormalPublication).toBe(false);
    expect(report.chronologyAloneEstablishesPublicationMedium).toBe(false);
    expect(report.reproducible2001WitnessLocatorRequired).toBe(true);
  });

  it('separates direct target-passage evidence from match-type adjudication', () => {
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(validI192());
    expect(report.direct2001TargetScopeContentWitnessRequired).toBe(true);
    expect(report.thirdPartyQuotationAloneEstablishesTargetPassageBinding).toBe(false);
    expect(report.summaryOrParaphraseAloneEstablishesTargetPassageBinding).toBe(false);
    expect(report.targetPassage2001To2003ComparisonRequired).toBe(true);
    expect(report.comparisonMustRecordMatchTypeWithoutPrejudgingOutcome).toBe(true);
    expect(report.exactVerbatimMatchPresupposedByThisGate).toBe(false);
    expect(report.doctrinalAntecedentAloneAutomaticallyEqualsExactPassageIdentity).toBe(false);
  });

  it('requires variant normalization and preserves the same-author dependency boundary', () => {
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(validI192());
    expect(report.editionPrintingOrRepresentationIdentityRequiredWhereObservable).toBe(true);
    expect(report.duplicateDigitalWitnessNormalizationRequired).toBe(true);
    expect(report.pageCountFileSizeOrFilenameVarianceAloneCreatesDistinctEditionIdentity).toBe(false);
    expect(report.derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities).toBe(false);
    expect(report.sameAuthor2001To2003DoctrinalDependencyMustRemainBound).toBe(true);
    expect(report.externalTargetLineageUnresolvedQuestionCountMustRemainThreeAbsentDirectResolution).toBe(true);
  });

  it('authorizes evidence collection only and does not execute rebinding, selection, or registration', () => {
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(validI192());
    expect(report.priorWitnessIdentityAndTargetPassageAcquisitionEvidenceMayProceed).toBe(true);
    expect(report.authorizationIsIdentityAndTargetPassageEvidenceCollection).toBe(true);
    expect(report.acquisitionExecutedByThisGate).toBe(false);
    expect(report.evidenceAcquiredByThisGate).toBe(false);
    expect(report.authorizationIsEvidenceRebinding).toBe(false);
    expect(report.authorizationIsCandidateSelection).toBe(false);
    expect(report.authorizationIsCandidateRegistration).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
  });

  it('preserves I132, v2 immutability, Li suspension, production guards, and hidden-stem gap', () => {
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(validI192());
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.liSameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed when I192 treats chronology as sufficient independence authority', () => {
    const mutated = {
      ...validI192(),
      prior2001MayBeTreatedAsIndependentBecauseEarlier: true,
    } as unknown as I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport;
    const report = buildI193QuWei2001PriorWitnessIdentityTargetPassageAcquisitionReadinessReview(mutated);
    expect(report.status).toBe('I192_ORIGIN_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.decision).toBe('QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_NOT_READY');
    expect(report.exactI192BoundaryAccepted).toBe(false);
    expect(report.priorWitnessIdentityAndTargetPassageAcquisitionEvidenceMayProceed).toBe(false);
    expect(report.authorizationIsIdentityAndTargetPassageEvidenceCollection).toBe(false);
  });
});
