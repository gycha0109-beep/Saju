import { describe, expect, it } from 'vitest';
import type { I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport } from '../src/research/i209-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-evidence.js';
import {
  I210_EXTERNAL_ACCESS_REQUIREMENT_IDS,
  I210_REASSESSMENT_CONTROL_IDS,
  buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview,
} from '../src/research/i210-qu-wei-2001-custodian-bound-acquisition-evidence-adequacy-external-access-reassessment-review.js';

function validI209(): I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: 'i209_fixture',
    status: 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE',
    decision:
      'QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EXECUTED_TWO_PATHS_FIRST_PARTY_CUSTODIAN_LEAD_AND_CONTEMPORANEOUS_SISTER_WITNESS_CONTEXT_ACQUIRED_ZERO_GAPS_RESOLVED_TWO_GAPS_REMAIN_EXTERNAL_PHYSICAL_OR_CANONICAL_ACCESS_REQUIRED_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI208BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    resolvedPublicationGapPreserved: true,
    publicationGapRetargetedByThisGate: false,
    acquisitionPathCountExecuted: 2,
    allTwoFrozenAcquisitionPathsExecuted: true,
    acquisitionPathEvidenceRecordCount: 2,
    evidenceObligationCountAccepted: 8,
    acquisitionControlCountAccepted: 16,
    contextualEvidencePathCount: 2,
    qualifyingGapResolutionEvidenceCount: 0,
    resolvedGapCount: 0,
    unresolvedGapIds: [
      'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
      'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
    ],
    unresolvedGapCount: 2,
    explicitNegativeFindingCount: 0,
    officialFirstPartyCustodianChannelLocated: true,
    officialCustodianChannelIdentifiesQuWeiWorkInventory: true,
    officialCustodianChannelListsSizhuXiangzhen: true,
    officialCustodianChannelWarnsAgainstPiratedCopies: true,
    officialCustodianChannelProvidesCurrentPurchaseContact: true,
    officialChronologyBindsAuthorTitleAnd2001Appearance: true,
    specific2001PhysicalWitnessAcquired: false,
    firstGeneration2001TargetScanAcquired: false,
    directSpecificWitnessChainOfCustodyAcquired: false,
    reproduciblePhysicalOrByteStableWitnessIdentityAcquired: false,
    canonicalTitleCopyrightTocPaginationTargetStructureAnchorSetAcquired: false,
    canonicalWitnessNormalizationGapResolved: false,
    contemporaneousSisterWitnessPrefaceContextAcquired: true,
    sisterWitnessTitle: '《六爻详真》',
    sisterWitnessPrefaceNamesBothXiangzhenTitles: true,
    sisterWitnessPrefaceDatedXinSiSummer: true,
    sisterWitnessPrefaceDescribesPublicationOccasion: true,
    sisterWitnessContextMayIdentifyTargetWitness: false,
    canonically2001BoundTargetSectionFacsimileAcquired: false,
    canonicalTargetSectionPageContextAcquired: false,
    governed2003RouteSequencePreservedAsComparisonTarget: true,
    directCanonical2001To2003SequenceComparisonCompleted: false,
    unboundPublicTextSimilarityMayResolveExactPassageGap: false,
    sisterWitnessPrefaceMayResolveTargetExactPassageGap: false,
    exactTargetPassageBindingGapResolved: false,
    materiallyNewWebAccessibleEvidenceClassAcquired: true,
    equivalentPublicTargetSurfaceRepeatedAsProgress: false,
    furtherProgressRequiresSpecificCustodianPhysicalFirstGenerationOrCanonicallyBoundTargetAccess: true,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    custodianSilenceCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true,
    externalTargetLineageUnresolvedQuestionCountPreserved: 3,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
  } as unknown as I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport;
}

describe('I210 Qu Wei 2001 custodian-bound acquisition evidence adequacy and external-access reassessment', () => {
  it('accepts the exact I209 zero-resolved two-unresolved boundary', () => {
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI209());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW');
    expect(r.exactI209BoundaryAccepted).toBe(true);
    expect(r.i209EvidenceAdequateForRecordedUnresolvedFindings).toBe(true);
    expect(r.resolvedPublicationGapPreserved).toBe(true);
    expect(r.publicationGapReopenedByThisGate).toBe(false);
    expect(r.assessedRemainingGapCount).toBe(2);
    expect(r.resolvedRemainingGapCount).toBe(0);
    expect(r.unresolvedRemainingGapCount).toBe(2);
  });

  it('keeps the official custodian lead as access context only and does not authorize contact', () => {
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI209());
    expect(r.firstPartyCustodianLeadAcceptedAsAccessContext).toBe(true);
    expect(r.firstPartyCustodianLeadQualifiesAsSpecific2001WitnessIdentity).toBe(false);
    expect(r.officialCustodianContactSurfaceIdentified).toBe(true);
    expect(r.officialContactExecutionAuthorizedByThisGate).toBe(false);
    expect(r.officialContactExecutedByThisGate).toBe(false);
  });

  it('keeps the contemporaneous sister-witness evidence as chronology context only', () => {
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI209());
    expect(r.contemporaneousSisterWitnessContextAccepted).toBe(true);
    expect(r.sisterWitnessContextQualifiesAsTargetWitnessIdentity).toBe(false);
    expect(r.sisterWitnessContextQualifiesAsExactPassageBinding).toBe(false);
  });

  it('records the exact target-witness and canonical-facsimile deficits still blocking both gaps', () => {
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI209());
    expect(r.specific2001PhysicalWitnessStillMissing).toBe(true);
    expect(r.firstGenerationTargetScanStillMissing).toBe(true);
    expect(r.directSpecificWitnessCustodyChainStillMissing).toBe(true);
    expect(r.reproducibleTargetWitnessIdentityStillMissing).toBe(true);
    expect(r.canonicalTargetFacsimileStillMissing).toBe(true);
    expect(r.canonicalTargetPageContextStillMissing).toBe(true);
    expect(r.directCanonical2001To2003ComparisonStillMissing).toBe(true);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
  });

  it('freezes the web-only hold boundary and exactly two external access requirements', () => {
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI209());
    expect(r.equivalentWebOnlyTargetSurfaceRepeatCountsAsRemediationProgress).toBe(false);
    expect(r.automatedWebOnlyRemediationContinuationMethodologicallyJustified).toBe(false);
    expect(r.webAccessibleRemediationBoundaryReached).toBe(true);
    expect(r.externalAccessRequiredForFurtherGapResolution).toBe(true);
    expect(r.manualOrExternalCustodianActionRequired).toBe(true);
    expect(r.externalAccessRequirementIds).toEqual(I210_EXTERNAL_ACCESS_REQUIREMENT_IDS);
    expect(r.externalAccessRequirementCount).toBe(2);
    expect(r.externalAccessRequirementsFrozenProspectively).toBe(true);
    expect(r.reassessmentControlIds).toEqual(I210_REASSESSMENT_CONTROL_IDS);
    expect(r.reassessmentControlCount).toBe(14);
    expect(r.reassessmentControlsFrozen).toBe(true);
  });

  it('keeps web limits, non-response and access failures non-negative and non-exhaustive', () => {
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI209());
    expect(r.webBoundaryCreatesNegativeFinding).toBe(false);
    expect(r.custodianNonResponseCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.paywallCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.onlineCorpusExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
    expect(r.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2 and production guards closed', () => {
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI209());
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

  it('fails closed if a specific 2001 witness is claimed acquired without a coherent resolved-boundary transition', () => {
    const mutated = {
      ...validI209(),
      specific2001PhysicalWitnessAcquired: true,
    } as unknown as I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport;
    const r = buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(mutated);
    expect(r.status).toBe('I209_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_EXTERNAL_ACCESS_REASSESSMENT_NOT_READY');
    expect(r.exactI209BoundaryAccepted).toBe(false);
    expect(r.webAccessibleRemediationBoundaryReached).toBe(false);
    expect(r.externalAccessRequirementCount).toBe(0);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
