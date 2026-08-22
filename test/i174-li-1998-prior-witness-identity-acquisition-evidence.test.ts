import { describe, expect, it } from 'vitest';
import type { I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport } from '../src/research/i173-li-1998-prior-witness-identity-acquisition-readiness-review.js';
import { buildI174Li1998PriorWitnessIdentityAcquisitionEvidence } from '../src/research/i174-li-1998-prior-witness-identity-acquisition-evidence.js';

function validI173(): I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i173_fixture',
    status: 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW',
    decision:
      'I172_BOUNDARY_SUPPORTS_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_WITH_FORMAL_OR_EXPLICIT_NONFORMAL_PUBLICATION_PATHS_DUPLICATE_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI172BoundaryAccepted: true,
    targetPriorWitnessId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998',
    targetAuthor: '李顺祥',
    targetTitle: '四柱命理学自修教程（普及班）',
    targetAppearanceYear: 1998,
    targetAppearanceBasisMustBeEvidenceBound: true,
    formalPublisherOrIsbnRequiredUnconditionally: false,
    formalPublicationIdentityPathPermitted: true,
    explicitNonformalPublicationIdentityPathPermitted: true,
    explicitNonformalStatusMaySubstituteForInventedPublisherMetadata: true,
    unknownPublicationStatusMayBePromotedToFormalPublication: false,
    reproduciblePublicWitnessLocatorRequired: true,
    targetChapterOrPassageWitnessIntegrityRequired: true,
    targetPassageMatchTo2004WitnessRequired: true,
    duplicateDigitalWitnessNormalizationRequired: true,
    digitalPageCountMismatchAloneCreatesDistinctWorkIdentity: false,
    derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: true,
    externalLineageUnresolvedStatusMustRemainPreserved: true,
    identityAcquisitionControlCount: 12,
    identityAcquisitionControlsFrozenProspectively: true,
    identityEvidenceFunctionCount: 6,
    publicationIdentityPathCount: 2,
    priorWitnessIdentityAcquisitionEvidenceMayProceed: true,
    authorizationIsIdentityEvidenceCollection: true,
    authorizationIsEvidenceRebinding: false,
    authorizationIsCandidateReplacement: false,
    authorizationIsCandidateSelection: false,
    authorizationIsRemediationExecution: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    chronologyAloneEstablishesIdentityOrIndependence: false,
    sameAuthorIdentityAloneEstablishesIndependence: false,
    publicationFormalityAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    candidateSetReevaluationAuthorizedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE',
  } as unknown as I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport;
}

describe('I174 Li 1998 prior-witness identity acquisition evidence', () => {
  it('executes all six bounded identity evidence functions with four satisfied and two unresolved', () => {
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(validI173());
    expect(report.status).toBe('RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE');
    expect(report.exactI173BoundaryAccepted).toBe(true);
    expect(report.identityEvidenceRecordCount).toBe(6);
    expect(report.satisfiedFunctionCount).toBe(4);
    expect(report.unresolvedFunctionCount).toBe(2);
    expect(report.identityEvidenceRecords.filter((record) => record.finding === 'SATISFIED')).toHaveLength(4);
    expect(
      report.identityEvidenceRecords.filter(
        (record) => record.finding === 'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY',
      ),
    ).toHaveLength(2);
  });

  it('establishes author title 1998 appearance and a reproducible target-content witness', () => {
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(validI173());
    expect(report.authorTitleAnd1998AppearanceBasisEstablished).toBe(true);
    expect(report.authorOfficialChronologyLocator).toBe('https://www.sxw.cc/sjw/zj/');
    expect(report.publicReproducibleWitnessIdentityEstablished).toBe(true);
    expect(report.targetChapterOrPassageWitnessIntegrityEstablished).toBe(true);
    expect(report.publicContentWitnessLocators.length).toBeGreaterThanOrEqual(2);
  });

  it('keeps the 1998 publication medium unresolved and does not back-project a later ISBN edition', () => {
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(validI173());
    expect(report.formal1998PublisherOrIsbnEstablished).toBe(false);
    expect(report.explicitNonformal1998PublicationStatusEstablished).toBe(false);
    expect(report.publicationMediumOrEntityIdentityEstablished).toBe(false);
    expect(report.later2002FormalEditionObserved).toBe(true);
    expect(report.later2002FormalEditionIsbn).toBe('9789627943679');
    expect(report.later2002FormalEditionBackProjectedTo1998).toBe(false);
    expect(report.ambiguousUploaderFieldObserved).toBe(true);
    expect(report.ambiguousUploaderFieldUsedAs1998PublicationStatus).toBe(false);
  });

  it('confirms target passage continuity and the already frozen same-author derivative chain', () => {
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(validI173());
    expect(report.targetPassageMatchTo2004WitnessEstablished).toBe(true);
    expect(report.sameAuthor1998To2004DerivativeChainConfirmed).toBe(true);
    const match = report.identityEvidenceRecords.find(
      (record) => record.functionId === 'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE',
    );
    expect(match?.finding).toBe('SATISFIED');
  });

  it('records divergent digital variants without inventing a canonical or independent authority', () => {
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(validI173());
    expect(report.digitalWitnessVariantsObserved).toBe(true);
    expect(report.observedDigitalWitnessPageCounts).toEqual([314, 413]);
    expect(report.observedDigitalWitnessSizesMb).toEqual([47.37, 47.44]);
    expect(report.canonicalDigitalWitnessNormalizationEstablished).toBe(false);
    expect(report.digitalPageCountOrFileSizeDifferenceCreatesDistinctAuthority).toBe(false);
    expect(report.derivativeDigitalCopiesCountAsIndependentAuthorities).toBe(false);
  });

  it('does not authorize immediate rebinding, selection, mutation, or independence', () => {
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(validI173());
    expect(report.identityEvidenceAdequateForImmediateRebindingByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
  });

  it('preserves I132, external-lineage, v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(validI173());
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.externalLineageUnresolvedStatusPreserved).toBe(true);
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

  it('fails closed if I173 authorizes rebinding', () => {
    const mutated = {
      ...validI173(),
      authorizationIsEvidenceRebinding: true,
    } as unknown as I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport;
    const report = buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(mutated);
    expect(report.status).toBe('I173_IDENTITY_ACQUISITION_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE_NOT_EXECUTED');
    expect(report.exactI173BoundaryAccepted).toBe(false);
    expect(report.identityEvidenceRecordCount).toBe(0);
    expect(report.satisfiedFunctionCount).toBe(0);
    expect(report.unresolvedFunctionCount).toBe(0);
  });
});
