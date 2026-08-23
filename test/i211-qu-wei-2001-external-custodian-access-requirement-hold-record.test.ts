import { describe, expect, it } from 'vitest';
import {
  I210_EXTERNAL_ACCESS_REQUIREMENT_IDS,
  I210_REASSESSMENT_CONTROL_IDS,
  type I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
} from '../src/research/i210-qu-wei-2001-custodian-bound-acquisition-evidence-adequacy-external-access-reassessment-review.js';
import {
  I211_HOLD_CONTROL_IDS,
  I211_RESUME_TRIGGER_IDS,
  buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord,
} from '../src/research/i211-qu-wei-2001-external-custodian-access-requirement-hold-record.js';

function validI210(): I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  return {
    reviewId: 'i210_fixture',
    status: 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    decision:
      'I209_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_FIRST_PARTY_CUSTODIAN_LEAD_AND_SISTER_WITNESS_CONTEXT_ACCEPTED_WEB_ONLY_REMEDIATION_BOUNDARY_REACHED_EXTERNAL_SPECIFIC_WITNESS_OR_CANONICAL_FACSIMILE_ACCESS_REQUIRED_NO_EXHAUSTION_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI209BoundaryAccepted: true,
    i209EvidenceAdequateForRecordedUnresolvedFindings: true,
    resolvedPublicationGapPreserved: true,
    publicationGapReopenedByThisGate: false,
    assessedRemainingGapCount: 2,
    resolvedRemainingGapCount: 0,
    unresolvedRemainingGapCount: 2,
    explicitNegativeFindingCountAccepted: 0,
    firstPartyCustodianLeadAcceptedAsAccessContext: true,
    firstPartyCustodianLeadQualifiesAsSpecific2001WitnessIdentity: false,
    officialCustodianContactSurfaceIdentified: true,
    officialContactExecutionAuthorizedByThisGate: false,
    officialContactExecutedByThisGate: false,
    contemporaneousSisterWitnessContextAccepted: true,
    sisterWitnessContextQualifiesAsTargetWitnessIdentity: false,
    sisterWitnessContextQualifiesAsExactPassageBinding: false,
    specific2001PhysicalWitnessStillMissing: true,
    firstGenerationTargetScanStillMissing: true,
    directSpecificWitnessCustodyChainStillMissing: true,
    reproducibleTargetWitnessIdentityStillMissing: true,
    canonicalTargetFacsimileStillMissing: true,
    canonicalTargetPageContextStillMissing: true,
    directCanonical2001To2003ComparisonStillMissing: true,
    canonicalWitnessNormalizationGapResolved: false,
    exactTargetPassageBindingGapResolved: false,
    equivalentWebOnlyTargetSurfaceRepeatCountsAsRemediationProgress: false,
    automatedWebOnlyRemediationContinuationMethodologicallyJustified: false,
    webAccessibleRemediationBoundaryReached: true,
    externalAccessRequiredForFurtherGapResolution: true,
    manualOrExternalCustodianActionRequired: true,
    externalAccessRequirementIds: I210_EXTERNAL_ACCESS_REQUIREMENT_IDS,
    externalAccessRequirementCount: 2,
    externalAccessRequirementsFrozenProspectively: true,
    webBoundaryCreatesNegativeFinding: false,
    custodianNonResponseCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: true,
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
    reassessmentControlIds: I210_REASSESSMENT_CONTROL_IDS,
    reassessmentControlCount: 14,
    reassessmentControlsFrozen: true,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD',
  } as unknown as I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport;
}

describe('I211 Qu Wei 2001 external custodian access requirement hold record', () => {
  it('accepts the exact I210 web-access remediation boundary and places web-only remediation on hold', () => {
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(validI210());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD');
    expect(r.exactI210BoundaryAccepted).toBe(true);
    expect(r.holdState).toBe('HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE');
    expect(r.webAccessibleRemediationBoundaryAccepted).toBe(true);
    expect(r.webOnlyAutomatedRemediationHoldActive).toBe(true);
    expect(r.webOnlyAutomatedResearchRetired).toBe(false);
  });

  it('preserves the publication resolution and keeps exactly two unresolved gaps open', () => {
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(validI210());
    expect(r.resolvedPublicationGapPreserved).toBe(true);
    expect(r.publicationGapMayBeReopenedByHold).toBe(false);
    expect(r.remainingGapIds).toEqual([
      'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
      'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
    ]);
    expect(r.remainingGapCount).toBe(2);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
  });

  it('freezes exactly the two external evidence-changing resume triggers', () => {
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(validI210());
    expect(r.resumeTriggerIds).toEqual(I211_RESUME_TRIGGER_IDS);
    expect(r.resumeTriggerCount).toBe(2);
    expect(r.resumeTriggersFrozen).toBe(true);
    expect(r.materiallyNewExternalEvidenceRequiredToResume).toBe(true);
    expect(r.specific2001PhysicalOrFirstGenerationWitnessWithDirectCustodyRequired).toBe(true);
    expect(r.reproducibleTargetWitnessIdentityRequired).toBe(true);
    expect(r.canonically2001BoundTargetSectionFacsimileWithContextRequired).toBe(true);
    expect(r.oneResumeTriggerMayStartEvidenceIngestionReadinessReview).toBe(true);
    expect(r.resumeTriggerSatisfiedByThisGate).toBe(false);
    expect(r.externalEvidenceIngestionExecutedByThisGate).toBe(false);
  });

  it('preserves the official custodian lead without authorizing or executing external contact', () => {
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(validI210());
    expect(r.officialCustodianContactSurfacePreserved).toBe(true);
    expect(r.officialCustodianContactExecutionAuthorizedByThisGate).toBe(false);
    expect(r.officialCustodianContactExecutedByThisGate).toBe(false);
    expect(r.separateExplicitAuthorityRequiredForCustodianContact).toBe(true);
  });

  it('keeps the sister-witness evidence chronology-only', () => {
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(validI210());
    expect(r.contemporaneousSisterWitnessContextPreservedAsChronologyOnly).toBe(true);
    expect(r.sisterWitnessContextMayIdentifyTargetWitness).toBe(false);
    expect(r.sisterWitnessContextMayResolveExactPassage).toBe(false);
  });

  it('defines hold as non-negative and non-exhaustive rather than retirement', () => {
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(validI210());
    expect(r.equivalentWebOnlyTargetSurfaceRepeatAuthorizedAsProgress).toBe(false);
    expect(r.holdCreatesNegativeFinding).toBe(false);
    expect(r.holdEstablishesTargetedDiscoveryExhaustion).toBe(false);
    expect(r.holdEstablishesOnlineCorpusExhaustion).toBe(false);
    expect(r.holdEstablishesCorpusExhaustion).toBe(false);
    expect(r.universalNoFurtherEvidenceClaimEstablished).toBe(false);
    expect(r.webOnlyAutomatedResearchRetired).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2 and production guards closed', () => {
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(validI210());
    expect(r.allTwoRemainingGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCount).toBe(3);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.holdControlIds).toEqual(I211_HOLD_CONTROL_IDS);
    expect(r.holdControlCount).toBe(12);
    expect(r.holdControlsFrozen).toBe(true);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.multiSourceCompositionAuthorized).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.damageEvaluationAuthorized).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if I210 is mutated to authorize custodian contact', () => {
    const mutated = {
      ...validI210(),
      officialContactExecutionAuthorizedByThisGate: true,
    } as unknown as I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport;
    const r = buildI211QuWei2001ExternalCustodianAccessRequirementHoldRecord(mutated);
    expect(r.status).toBe('I210_EXTERNAL_ACCESS_REASSESSMENT_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_NOT_ESTABLISHED');
    expect(r.exactI210BoundaryAccepted).toBe(false);
    expect(r.holdState).toBe('NOT_ESTABLISHED');
    expect(r.webOnlyAutomatedRemediationHoldActive).toBe(false);
    expect(r.resumeTriggerCount).toBe(0);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
