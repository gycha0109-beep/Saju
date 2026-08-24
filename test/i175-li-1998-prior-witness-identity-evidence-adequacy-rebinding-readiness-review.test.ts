import { describe, expect, it } from 'vitest';
import type { I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport } from '../src/research/i174-li-1998-prior-witness-identity-acquisition-evidence.js';
import {
  I175_ADEQUACY_REQUIREMENT_IDS,
  I175_TARGETED_GAP_IDS,
  buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview,
} from '../src/research/i175-li-1998-prior-witness-identity-evidence-adequacy-rebinding-readiness-review.js';

function validI174(): I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport {
  const records = [
    { functionId: 'AUTHOR_OFFICIAL_CHRONOLOGY_OR_BIBLIOGRAPHIC_APPEARANCE_BASIS', finding: 'SATISFIED' },
    { functionId: 'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_METADATA', finding: 'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY' },
    { functionId: 'REPRODUCIBLE_DIGITAL_OR_PHYSICAL_WITNESS_IDENTITY', finding: 'SATISFIED' },
    { functionId: 'TARGET_CHAPTER_OR_PASSAGE_CONTENT_WITNESS', finding: 'SATISFIED' },
    { functionId: 'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE', finding: 'SATISFIED' },
    { functionId: 'DUPLICATE_WITNESS_NORMALIZATION_METADATA', finding: 'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY' },
  ];

  return {
    evidenceRecordSetId: 'i174_fixture',
    status: 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE',
    decision:
      'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_TWO_UNRESOLVED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI173BoundaryAccepted: true,
    targetPriorWitnessId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998',
    identityEvidenceRecords: records,
    identityEvidenceRecordCount: 6,
    satisfiedFunctionCount: 4,
    unresolvedFunctionCount: 2,
    authorTitleAnd1998AppearanceBasisEstablished: true,
    formal1998PublisherOrIsbnEstablished: false,
    explicitNonformal1998PublicationStatusEstablished: false,
    publicationMediumOrEntityIdentityEstablished: false,
    later2002FormalEditionObserved: true,
    later2002FormalEditionIsbn: '9789627943679',
    later2002FormalEditionBackProjectedTo1998: false,
    ambiguousUploaderFieldObserved: true,
    ambiguousUploaderFieldUsedAs1998PublicationStatus: false,
    publicReproducibleWitnessIdentityEstablished: true,
    targetChapterOrPassageWitnessIntegrityEstablished: true,
    targetPassageMatchTo2004WitnessEstablished: true,
    sameAuthor1998To2004DerivativeChainConfirmed: true,
    digitalWitnessVariantsObserved: true,
    canonicalDigitalWitnessNormalizationEstablished: false,
    digitalPageCountOrFileSizeDifferenceCreatesDistinctAuthority: false,
    derivativeDigitalCopiesCountAsIndependentAuthorities: false,
    identityEvidenceAdequateForImmediateRebindingByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
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
    externalLineageUnresolvedStatusPreserved: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_EVIDENCE_ADEQUACY_AND_REBINDING_READINESS_REVIEW',
  } as unknown as I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport;
}

describe('I175 Li 1998 identity evidence adequacy and rebinding readiness', () => {
  it('accepts exact I174 and records partial but not complete identity adequacy', () => {
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(validI174());
    expect(report.status).toBe('RESOLVED_LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW');
    expect(report.exactI174BoundaryAccepted).toBe(true);
    expect(report.evaluatedIdentityFunctionCount).toBe(6);
    expect(report.satisfiedIdentityFunctionCount).toBe(4);
    expect(report.unresolvedIdentityFunctionCount).toBe(2);
    expect(report.partialIdentityEvidenceAdequacyEstablished).toBe(true);
    expect(report.completeIdentityEvidenceAdequacyEstablished).toBe(false);
  });

  it('freezes ten adequacy requirements and exactly two targeted gaps', () => {
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(validI174());
    expect(report.adequacyRequirementIds).toEqual(I175_ADEQUACY_REQUIREMENT_IDS);
    expect(report.adequacyRequirementCount).toBe(10);
    expect(report.adequacyRequirementsFrozen).toBe(true);
    expect(report.targetedGapIds).toEqual(I175_TARGETED_GAP_IDS);
    expect(report.targetedGapCount).toBe(2);
  });

  it('blocks rebinding on unresolved publication-medium and canonical-witness identity', () => {
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(validI174());
    expect(report.publicationMediumOrEntityIdentityResolved).toBe(false);
    expect(report.canonicalDigitalWitnessNormalizationResolved).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('does not manufacture 1998 metadata from later editions or ambiguous uploader fields', () => {
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(validI174());
    expect(report.later2002FormalEditionMayBackfill1998Metadata).toBe(false);
    expect(report.ambiguousUploaderMetadataMayEstablish1998PublicationStatus).toBe(false);
    expect(report.publicContentWitnessSufficiencyEqualsRebindingSufficiency).toBe(false);
  });

  it('preserves the retired 2004 origin, earlier 1998 witness, derivative chain, and external-lineage gap', () => {
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(validI174());
    expect(report.current2004WitnessPresumedOriginRetired).toBe(true);
    expect(report.prior1998SameAuthorWitnessConfirmed).toBe(true);
    expect(report.prior1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.sameAuthor1998To2004DerivativeChainMustRemainBound).toBe(true);
    expect(report.externalLineageUnresolvedQuestionCount).toBe(3);
    expect(report.externalLineageUnresolvedStatusPreserved).toBe(true);
  });

  it('authorizes only a targeted gap-discovery readiness review', () => {
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(validI174());
    expect(report.targetedGapDiscoveryReadinessReviewMethodologicallyJustified).toBe(true);
    expect(report.targetedGapDiscoveryReadinessReviewAuthorized).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
  });

  it('retains I132, frozen v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(validI174());
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
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

  it('fails closed if an unresolved I174 identity gap is falsely promoted to resolved', () => {
    const mutated = {
      ...validI174(),
      publicationMediumOrEntityIdentityEstablished: true,
    } as unknown as I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport;
    const report = buildI175Li1998IdentityEvidenceAdequacyRebindingReadinessReview(mutated);
    expect(report.status).toBe('I174_IDENTITY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REVIEW_NOT_READY');
    expect(report.exactI174BoundaryAccepted).toBe(false);
    expect(report.targetedGapCount).toBe(0);
    expect(report.targetedGapDiscoveryReadinessReviewAuthorized).toBe(false);
  });
});
