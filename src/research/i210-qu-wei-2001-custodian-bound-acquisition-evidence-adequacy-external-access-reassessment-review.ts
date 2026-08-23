import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I209_REMAINING_GAP_IDS,
  type I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport,
} from './i209-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-evidence.js';

export const I210_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-custodian-bound-acquisition-evidence-adequacy-external-access-reassessment-review-v1';

export const I210_EXTERNAL_ACCESS_REQUIREMENT_IDS = Object.freeze([
  'SPECIFIC_2001_PHYSICAL_OR_FIRST_GENERATION_TARGET_WITNESS_WITH_DIRECT_CUSTODY_PROVENANCE',
  'CANONICALLY_2001_BOUND_TARGET_SECTION_FACSIMILE_WITH_PAGE_CONTEXT_OR_EQUIVALENT_ANCHORS',
] as const);

export type I210ExternalAccessRequirementId = (typeof I210_EXTERNAL_ACCESS_REQUIREMENT_IDS)[number];

export const I210_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'EXACT_I209_ZERO_RESOLVED_TWO_UNRESOLVED_BOUNDARY_REQUIRED',
  'RESOLVED_PUBLICATION_MEDIUM_IDENTITY_MUST_REMAIN_FROZEN',
  'FIRST_PARTY_CUSTODIAN_LEAD_MAY_SUPPORT_ACCESS_TARGETING_BUT_NOT_WITNESS_IDENTITY',
  'SISTER_WITNESS_PREFACE_MAY_SUPPORT_CHRONOLOGY_BUT_NOT_TARGET_IDENTITY_OR_PASSAGE_BINDING',
  'EQUIVALENT_WEB_ONLY_TARGET_SURFACE_REPEAT_MUST_NOT_COUNT_AS_REMEDIATION_PROGRESS',
  'FURTHER_NORMALIZATION_PROGRESS_REQUIRES_SPECIFIC_TARGET_WITNESS_CUSTODY_AND_REPRODUCIBLE_IDENTITY',
  'FURTHER_PASSAGE_PROGRESS_REQUIRES_CANONICALLY_2001_BOUND_TARGET_FACSIMILE_WITH_CONTEXT',
  'OFFICIAL_CONTACT_EXECUTION_REQUIRES_SEPARATE_EXPLICIT_ACTION_AUTHORITY',
  'WEB_ONLY_BOUNDARY_MUST_NOT_BE_RELABELED_AS_CORPUS_EXHAUSTION_OR_NEGATIVE_EVIDENCE',
  'NON_RESPONSE_ACCESS_FAILURE_PAYWALL_AND_SEARCH_SILENCE_MUST_REMAIN_NON_NEGATIVE',
  'NO_REBINDING_OR_PROVENANCE_INDEPENDENCE_ADJUDICATION_AT_REASSESSMENT',
  'I132_INDEPENDENT_NORMATIVE_PROVENANCE_REQUIREMENT_MUST_REMAIN_NORMATIVE',
  'CURRENT_V2_PACKAGE_AND_CANDIDATE_SET_MUST_REMAIN_IMMUTABLE',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export type I210ReassessmentControlId = (typeof I210_REASSESSMENT_CONTROL_IDS)[number];

export interface I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
    | 'I209_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I209_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_FIRST_PARTY_CUSTODIAN_LEAD_AND_SISTER_WITNESS_CONTEXT_ACCEPTED_WEB_ONLY_REMEDIATION_BOUNDARY_REACHED_EXTERNAL_SPECIFIC_WITNESS_OR_CANONICAL_FACSIMILE_ACCESS_REQUIRED_NO_EXHAUSTION_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_EXTERNAL_ACCESS_REASSESSMENT_NOT_READY';
  upstreamI209EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI209BoundaryAccepted: boolean;
  i209EvidenceAdequateForRecordedUnresolvedFindings: boolean;
  resolvedPublicationGapPreserved: boolean;
  publicationGapReopenedByThisGate: false;
  assessedRemainingGapCount: 2 | 0;
  resolvedRemainingGapCount: 0;
  unresolvedRemainingGapCount: 2 | 0;
  unresolvedGapIdsAccepted: readonly (typeof I209_REMAINING_GAP_IDS)[number][];
  explicitNegativeFindingCountAccepted: 0;
  firstPartyCustodianLeadAcceptedAsAccessContext: boolean;
  firstPartyCustodianLeadQualifiesAsSpecific2001WitnessIdentity: false;
  officialCustodianContactSurfaceIdentified: boolean;
  officialContactExecutionAuthorizedByThisGate: false;
  officialContactExecutedByThisGate: false;
  contemporaneousSisterWitnessContextAccepted: boolean;
  sisterWitnessContextQualifiesAsTargetWitnessIdentity: false;
  sisterWitnessContextQualifiesAsExactPassageBinding: false;
  specific2001PhysicalWitnessStillMissing: boolean;
  firstGenerationTargetScanStillMissing: boolean;
  directSpecificWitnessCustodyChainStillMissing: boolean;
  reproducibleTargetWitnessIdentityStillMissing: boolean;
  canonicalTargetFacsimileStillMissing: boolean;
  canonicalTargetPageContextStillMissing: boolean;
  directCanonical2001To2003ComparisonStillMissing: boolean;
  canonicalWitnessNormalizationGapResolved: false;
  exactTargetPassageBindingGapResolved: false;
  equivalentWebOnlyTargetSurfaceRepeatCountsAsRemediationProgress: false;
  automatedWebOnlyRemediationContinuationMethodologicallyJustified: false;
  webAccessibleRemediationBoundaryReached: boolean;
  externalAccessRequiredForFurtherGapResolution: boolean;
  manualOrExternalCustodianActionRequired: boolean;
  externalAccessRequirementIds: readonly I210ExternalAccessRequirementId[];
  externalAccessRequirementCount: 2 | 0;
  externalAccessRequirementsFrozenProspectively: boolean;
  webBoundaryCreatesNegativeFinding: false;
  custodianNonResponseCreatesNegativeFinding: false;
  accessFailureCreatesNegativeFinding: false;
  searchSilenceCreatesNegativeFinding: false;
  paywallCreatesNegativeFinding: false;
  targetedDiscoveryExhaustionEstablished: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  allTwoRemainingGapsRequiredBeforeRebindingReadiness: boolean;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  sameAuthor2001To2003DoctrinalDependencyPreserved: boolean;
  externalTargetLineageUnresolvedQuestionCount: 3 | 0;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  reassessmentControlIds: readonly I210ReassessmentControlId[];
  reassessmentControlCount: 14;
  reassessmentControlsFrozen: boolean;
  candidateSelectedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  liSameTargetPathSuspendedNotRetired: boolean;
  liSameTargetMayReopenOnMateriallyNewDirectLead: boolean;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI209Accepted(
  i209: I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport,
): boolean {
  return (
    i209.status === 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE' &&
    i209.decision ===
      'QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EXECUTED_TWO_PATHS_FIRST_PARTY_CUSTODIAN_LEAD_AND_CONTEMPORANEOUS_SISTER_WITNESS_CONTEXT_ACQUIRED_ZERO_GAPS_RESOLVED_TWO_GAPS_REMAIN_EXTERNAL_PHYSICAL_OR_CANONICAL_ACCESS_REQUIRED_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE' &&
    i209.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i209.policyVersion === 'v1-definition' &&
    i209.adoptionVersion === 'v1-adoption' &&
    i209.currentCandidateSetVersion === 'v1-candidate-set' &&
    i209.currentInputPackageVersion === 'v2-input-package' &&
    i209.exactI208BoundaryAccepted &&
    i209.targetPriorWitnessId === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i209.resolvedPublicationGapPreserved &&
    i209.publicationGapRetargetedByThisGate === false &&
    i209.acquisitionPathCountExecuted === 2 &&
    i209.allTwoFrozenAcquisitionPathsExecuted &&
    i209.acquisitionPathEvidenceRecordCount === 2 &&
    i209.evidenceObligationCountAccepted === 8 &&
    i209.acquisitionControlCountAccepted === 16 &&
    i209.contextualEvidencePathCount === 2 &&
    i209.qualifyingGapResolutionEvidenceCount === 0 &&
    i209.resolvedGapCount === 0 &&
    i209.unresolvedGapCount === 2 &&
    i209.unresolvedGapIds.length === I209_REMAINING_GAP_IDS.length &&
    i209.unresolvedGapIds.every((id, index) => id === I209_REMAINING_GAP_IDS[index]) &&
    i209.explicitNegativeFindingCount === 0 &&
    i209.officialFirstPartyCustodianChannelLocated &&
    i209.officialCustodianChannelIdentifiesQuWeiWorkInventory &&
    i209.officialCustodianChannelListsSizhuXiangzhen &&
    i209.officialCustodianChannelWarnsAgainstPiratedCopies &&
    i209.officialCustodianChannelProvidesCurrentPurchaseContact &&
    i209.officialChronologyBindsAuthorTitleAnd2001Appearance &&
    i209.specific2001PhysicalWitnessAcquired === false &&
    i209.firstGeneration2001TargetScanAcquired === false &&
    i209.directSpecificWitnessChainOfCustodyAcquired === false &&
    i209.reproduciblePhysicalOrByteStableWitnessIdentityAcquired === false &&
    i209.canonicalTitleCopyrightTocPaginationTargetStructureAnchorSetAcquired === false &&
    i209.canonicalWitnessNormalizationGapResolved === false &&
    i209.contemporaneousSisterWitnessPrefaceContextAcquired &&
    i209.sisterWitnessTitle === '《六爻详真》' &&
    i209.sisterWitnessPrefaceNamesBothXiangzhenTitles &&
    i209.sisterWitnessPrefaceDatedXinSiSummer &&
    i209.sisterWitnessPrefaceDescribesPublicationOccasion &&
    i209.sisterWitnessContextMayIdentifyTargetWitness === false &&
    i209.canonically2001BoundTargetSectionFacsimileAcquired === false &&
    i209.canonicalTargetSectionPageContextAcquired === false &&
    i209.governed2003RouteSequencePreservedAsComparisonTarget &&
    i209.directCanonical2001To2003SequenceComparisonCompleted === false &&
    i209.unboundPublicTextSimilarityMayResolveExactPassageGap === false &&
    i209.sisterWitnessPrefaceMayResolveTargetExactPassageGap === false &&
    i209.exactTargetPassageBindingGapResolved === false &&
    i209.materiallyNewWebAccessibleEvidenceClassAcquired &&
    i209.equivalentPublicTargetSurfaceRepeatedAsProgress === false &&
    i209.furtherProgressRequiresSpecificCustodianPhysicalFirstGenerationOrCanonicallyBoundTargetAccess &&
    i209.nonAcquisitionCreatesNegativeFinding === false &&
    i209.accessFailureCreatesNegativeFinding === false &&
    i209.custodianSilenceCreatesNegativeFinding === false &&
    i209.searchSilenceCreatesNegativeFinding === false &&
    i209.paywallCreatesNegativeFinding === false &&
    i209.inaccessibleSubstrateCreatesNegativeFinding === false &&
    i209.targetedDiscoveryExhaustionEstablished === false &&
    i209.onlineCorpusExhaustionEstablished === false &&
    i209.corpusExhaustionEstablished === false &&
    i209.allTwoRemainingGapsRequiredBeforeRebindingReadiness &&
    i209.evidenceRebindingMethodologicallyReadyByThisGate === false &&
    i209.evidenceRebindingAuthorizedByThisGate === false &&
    i209.evidenceRebindingExecutedByThisGate === false &&
    i209.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i209.externalTargetLineageUnresolvedQuestionCountPreserved === 3 &&
    i209.provenanceIndependenceAdjudicatedByThisGate === false &&
    i209.independentNormativeProvenanceEstablishedCount === 0 &&
    i209.explicitDerivativeRelationshipCheckRequired &&
    i209.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i209.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i209.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i209.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i209.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i209.currentV2PackageAndCandidateSetRemainImmutable &&
    i209.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i209.candidateSetMutatedByThisGate === false &&
    i209.candidateSetReevaluationAuthorizedByThisGate === false &&
    i209.productionPolicyExecutionAuthorized === false &&
    i209.actualCompositionPerformedByThisGate === false &&
    i209.multiSourceCompositionAuthorized === false &&
    i209.thresholdRuleCreatedByThisGate === false &&
    i209.classificationAuthorized === false &&
    i209.numericScoringAuthorized === false &&
    i209.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport, 'reviewId'>,
): I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  return {
    reviewId: `i210_qu_wei_2001_external_access_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(
  i209: I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport,
): I210QuWei2001CustodianBoundAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  const accepted = exactI209Accepted(i209);

  return finalized({
    reviewVersion: I210_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
      : 'I209_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I209_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_FIRST_PARTY_CUSTODIAN_LEAD_AND_SISTER_WITNESS_CONTEXT_ACCEPTED_WEB_ONLY_REMEDIATION_BOUNDARY_REACHED_EXTERNAL_SPECIFIC_WITNESS_OR_CANONICAL_FACSIMILE_ACCESS_REQUIRED_NO_EXHAUSTION_NO_REBINDING_NO_INDEPENDENCE'
      : 'QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_EXTERNAL_ACCESS_REASSESSMENT_NOT_READY',
    upstreamI209EvidenceRecordSetId: i209.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI209BoundaryAccepted: accepted,
    i209EvidenceAdequateForRecordedUnresolvedFindings: accepted,
    resolvedPublicationGapPreserved: accepted,
    publicationGapReopenedByThisGate: false,
    assessedRemainingGapCount: accepted ? 2 : 0,
    resolvedRemainingGapCount: 0,
    unresolvedRemainingGapCount: accepted ? 2 : 0,
    unresolvedGapIdsAccepted: accepted ? I209_REMAINING_GAP_IDS : Object.freeze([]),
    explicitNegativeFindingCountAccepted: 0,
    firstPartyCustodianLeadAcceptedAsAccessContext: accepted,
    firstPartyCustodianLeadQualifiesAsSpecific2001WitnessIdentity: false,
    officialCustodianContactSurfaceIdentified: accepted,
    officialContactExecutionAuthorizedByThisGate: false,
    officialContactExecutedByThisGate: false,
    contemporaneousSisterWitnessContextAccepted: accepted,
    sisterWitnessContextQualifiesAsTargetWitnessIdentity: false,
    sisterWitnessContextQualifiesAsExactPassageBinding: false,
    specific2001PhysicalWitnessStillMissing: accepted,
    firstGenerationTargetScanStillMissing: accepted,
    directSpecificWitnessCustodyChainStillMissing: accepted,
    reproducibleTargetWitnessIdentityStillMissing: accepted,
    canonicalTargetFacsimileStillMissing: accepted,
    canonicalTargetPageContextStillMissing: accepted,
    directCanonical2001To2003ComparisonStillMissing: accepted,
    canonicalWitnessNormalizationGapResolved: false,
    exactTargetPassageBindingGapResolved: false,
    equivalentWebOnlyTargetSurfaceRepeatCountsAsRemediationProgress: false,
    automatedWebOnlyRemediationContinuationMethodologicallyJustified: false,
    webAccessibleRemediationBoundaryReached: accepted,
    externalAccessRequiredForFurtherGapResolution: accepted,
    manualOrExternalCustodianActionRequired: accepted,
    externalAccessRequirementIds: accepted ? I210_EXTERNAL_ACCESS_REQUIREMENT_IDS : Object.freeze([]),
    externalAccessRequirementCount: accepted ? 2 : 0,
    externalAccessRequirementsFrozenProspectively: accepted,
    webBoundaryCreatesNegativeFinding: false,
    custodianNonResponseCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: accepted,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: accepted,
    externalTargetLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    reassessmentControlIds: I210_REASSESSMENT_CONTROL_IDS,
    reassessmentControlCount: 14,
    reassessmentControlsFrozen: accepted,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
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
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    notes: Object.freeze(
      accepted
        ? [
            'I209 is adequate to record two unresolved findings and two materially useful access/chronology contexts, but neither context identifies a specific canonical 2001 target witness.',
            'Further web-only repetition of equivalent target surfaces is not methodology progress; the next evidence-changing event must be specific external custody/first-generation/canonical target access.',
            'This web-access boundary is not corpus exhaustion, negative evidence, or authorization to contact a custodian; any external contact or acquisition action requires separate explicit authority.',
          ]
        : ['I209 evidence boundary was invalid; external-access reassessment did not proceed.'],
    ),
  });
}
