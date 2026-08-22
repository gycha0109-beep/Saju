import { describe, expect, it } from 'vitest';
import type { I172LiLineageEvidenceRemediationReassessmentReviewReport } from '../src/research/i172-li-lineage-evidence-remediation-reassessment-review.js';
import {
  I173_IDENTITY_ACQUISITION_CONTROL_IDS,
  I173_IDENTITY_EVIDENCE_FUNCTION_IDS,
  I173_PUBLICATION_IDENTITY_PATH_IDS,
  buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview,
} from '../src/research/i173-li-1998-prior-witness-identity-acquisition-readiness-review.js';

function validI172(): I172LiLineageEvidenceRemediationReassessmentReviewReport {
  return {
    reviewId: 'i172_fixture',
    status: 'RESOLVED_LI_LINEAGE_EVIDENCE_REMEDIATION_REASSESSMENT_REVIEW',
    decision:
      'I171_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_2004_AS_PRESUMED_ORIGIN_PRIOR_1998_WITNESS_IDENTITY_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI171BoundaryAccepted: true,
    I171EvidenceAdequateToRecordPriorSameAuthorDependency: true,
    I171EvidenceAdequateToEstablishIndependentNormativeProvenance: false,
    derivativeDependencyFoundCount: 1,
    unresolvedExternalLineageQuestionCount: 3,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    current2004WitnessRecordId: 'LI_SHUNXIANG_SIZHU_XUANJI_2004',
    current2004WitnessPresumedNormativeOriginStatus:
      'RETIRED_AS_PRESUMED_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED',
    current2004WitnessMayRemainNewProvenanceCandidateWithoutReassessment: false,
    prior1998WitnessId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998',
    prior1998WitnessStatus: 'PRIOR_SAME_AUTHOR_WITNESS_IDENTITY_ACQUISITION_REQUIRED_BEFORE_REBINDING',
    prior1998WitnessIsNewIndependentProvenanceIdentity: false,
    prior1998WitnessIndependenceFromChenShaoLineageEstablished: false,
    ChenYuanSelectedSetDependencyRemainsUnresolved: true,
    ShaoResearchCenterSpecificDependencyRemainsUnresolved: true,
    ZhangZhichunTargetRuleAuthorshipRemainsUnresolved: true,
    reassessmentRequirementCount: 10,
    reassessmentRequirementsFrozen: true,
    priorWitnessIdentityRequirementCount: 8,
    priorWitnessIdentityRequirementsFrozenProspectively: true,
    priorWitnessIdentityAcquisitionReadinessReviewMethodologicallyJustified: true,
    priorWitnessIdentityAcquisitionReadinessReviewAuthorized: true,
    authorizationIsIdentityAcquisition: false,
    authorizationIsEvidenceRebinding: false,
    authorizationIsCandidateReplacement: false,
    authorizationIsCandidateSelection: false,
    authorizationIsRemediationExecution: false,
    currentNewProvenanceAcquisitionVia2004WitnessDisposition:
      'NOT_SUCCESSFUL_AS_NEW_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED',
    evidenceRebindingPathNowMethodologicallyRelevant: true,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    chronologyAloneEstablishesPriorWitnessIdentityOrIndependence: false,
    sameAuthorIdentityAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
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
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW',
  } as unknown as I172LiLineageEvidenceRemediationReassessmentReviewReport;
}

describe('I173 Li 1998 prior-witness identity acquisition readiness', () => {
  it('accepts the exact I172 boundary and binds the 1998 identity target', () => {
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(validI172());
    expect(report.status).toBe('RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW');
    expect(report.exactI172BoundaryAccepted).toBe(true);
    expect(report.targetPriorWitnessId).toBe('LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998');
    expect(report.targetAuthor).toBe('李顺祥');
    expect(report.targetTitle).toBe('四柱命理学自修教程（普及班）');
    expect(report.targetAppearanceYear).toBe(1998);
  });

  it('freezes twelve controls, six evidence functions, and two publication identity paths', () => {
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(validI172());
    expect(report.identityAcquisitionControlIds).toEqual(I173_IDENTITY_ACQUISITION_CONTROL_IDS);
    expect(report.identityAcquisitionControlCount).toBe(12);
    expect(report.identityAcquisitionControlsFrozenProspectively).toBe(true);
    expect(report.identityEvidenceFunctionIds).toEqual(I173_IDENTITY_EVIDENCE_FUNCTION_IDS);
    expect(report.identityEvidenceFunctionCount).toBe(6);
    expect(report.publicationIdentityPathIds).toEqual(I173_PUBLICATION_IDENTITY_PATH_IDS);
    expect(report.publicationIdentityPathCount).toBe(2);
  });

  it('permits formal or explicit nonformal publication identity without inventing metadata', () => {
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(validI172());
    expect(report.formalPublisherOrIsbnRequiredUnconditionally).toBe(false);
    expect(report.formalPublicationIdentityPathPermitted).toBe(true);
    expect(report.explicitNonformalPublicationIdentityPathPermitted).toBe(true);
    expect(report.explicitNonformalStatusMaySubstituteForInventedPublisherMetadata).toBe(true);
    expect(report.unknownPublicationStatusMayBePromotedToFormalPublication).toBe(false);
  });

  it('requires reproducible content and duplicate-witness normalization', () => {
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(validI172());
    expect(report.reproduciblePublicWitnessLocatorRequired).toBe(true);
    expect(report.targetChapterOrPassageWitnessIntegrityRequired).toBe(true);
    expect(report.targetPassageMatchTo2004WitnessRequired).toBe(true);
    expect(report.duplicateDigitalWitnessNormalizationRequired).toBe(true);
    expect(report.digitalPageCountMismatchAloneCreatesDistinctWorkIdentity).toBe(false);
    expect(report.derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities).toBe(false);
  });

  it('authorizes identity evidence collection only, not rebinding or remediation execution', () => {
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(validI172());
    expect(report.priorWitnessIdentityAcquisitionEvidenceMayProceed).toBe(true);
    expect(report.authorizationIsIdentityEvidenceCollection).toBe(true);
    expect(report.authorizationIsEvidenceRebinding).toBe(false);
    expect(report.authorizationIsCandidateReplacement).toBe(false);
    expect(report.authorizationIsCandidateSelection).toBe(false);
    expect(report.authorizationIsRemediationExecution).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('does not infer independence from chronology, same authorship, publication formality, silence, counts, or tiers', () => {
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(validI172());
    expect(report.authorOfficialChronologyAloneEstablishesPublicationMedium).toBe(false);
    expect(report.authorOfficialChronologyAloneEstablishesIndependence).toBe(false);
    expect(report.chronologyAloneEstablishesIdentityOrIndependence).toBe(false);
    expect(report.sameAuthorIdentityAloneEstablishesIndependence).toBe(false);
    expect(report.publicationFormalityAloneEstablishesIndependence).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
  });

  it('preserves I132, frozen v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(validI172());
    expect(report.sameAuthor1998To2004DerivativeChainMustRemainBound).toBe(true);
    expect(report.externalLineageUnresolvedStatusMustRemainPreserved).toBe(true);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed when I172 attempts to treat the 1998 witness as independent provenance', () => {
    const mutated = {
      ...validI172(),
      prior1998WitnessIsNewIndependentProvenanceIdentity: true,
    } as unknown as I172LiLineageEvidenceRemediationReassessmentReviewReport;
    const report = buildI173Li1998PriorWitnessIdentityAcquisitionReadinessReview(mutated);
    expect(report.status).toBe('I172_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_NOT_READY');
    expect(report.exactI172BoundaryAccepted).toBe(false);
    expect(report.priorWitnessIdentityAcquisitionEvidenceMayProceed).toBe(false);
    expect(report.authorizationIsIdentityEvidenceCollection).toBe(false);
  });
});
