import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I208_ACQUISITION_CONTROL_IDS,
  I208_ACQUISITION_PATH_IDS,
  I208_EVIDENCE_OBLIGATION_IDS,
  type I208AcquisitionPathId,
  type I208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReviewReport,
} from './i208-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-readiness-review.js';

export const I209_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-evidence-v1';

export const I209_REMAINING_GAP_IDS = Object.freeze([
  'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
  'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
] as const);

export type I209RemainingGapId = (typeof I209_REMAINING_GAP_IDS)[number];

export type I209AcquisitionFinding =
  | 'FIRST_PARTY_CUSTODIAN_CHANNEL_LOCATED_SPECIFIC_2001_WITNESS_NOT_ACQUIRED'
  | 'CONTEMPORANEOUS_SISTER_WITNESS_PREFACE_CONTEXT_ACQUIRED_TARGET_FACSIMILE_NOT_ACQUIRED';

export interface I209AcquisitionPathEvidenceRecord {
  pathId: I208AcquisitionPathId;
  finding: I209AcquisitionFinding;
  sourceLocators: readonly string[];
  observations: readonly string[];
  contextualEvidenceAcquired: boolean;
  qualifyingGapResolutionEvidenceAcquired: false;
  resolvedGapIds: readonly never[];
  unresolvedGapIds: readonly I209RemainingGapId[];
}

export interface I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE'
    | 'I208_CUSTODIAN_BOUND_ACQUISITION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EXECUTED_TWO_PATHS_FIRST_PARTY_CUSTODIAN_LEAD_AND_CONTEMPORANEOUS_SISTER_WITNESS_CONTEXT_ACQUIRED_ZERO_GAPS_RESOLVED_TWO_GAPS_REMAIN_EXTERNAL_PHYSICAL_OR_CANONICAL_ACCESS_REQUIRED_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE_NOT_EXECUTED';
  upstreamI208ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI208BoundaryAccepted: boolean;
  targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  resolvedPublicationGapPreserved: boolean;
  publicationGapRetargetedByThisGate: false;
  acquisitionPathCountExecuted: 2 | 0;
  allTwoFrozenAcquisitionPathsExecuted: boolean;
  acquisitionPathEvidenceRecords: readonly I209AcquisitionPathEvidenceRecord[];
  acquisitionPathEvidenceRecordCount: 2 | 0;
  evidenceObligationCountAccepted: 8 | 0;
  acquisitionControlCountAccepted: 16 | 0;
  contextualEvidencePathCount: 2 | 0;
  qualifyingGapResolutionEvidenceCount: 0;
  resolvedGapCount: 0;
  unresolvedGapIds: readonly I209RemainingGapId[];
  unresolvedGapCount: 2 | 0;
  explicitNegativeFindingCount: 0;
  officialFirstPartyCustodianChannelLocated: boolean;
  officialCustodianChannelIdentifiesQuWeiWorkInventory: boolean;
  officialCustodianChannelListsSizhuXiangzhen: boolean;
  officialCustodianChannelWarnsAgainstPiratedCopies: boolean;
  officialCustodianChannelProvidesCurrentPurchaseContact: boolean;
  officialChronologyBindsAuthorTitleAnd2001Appearance: boolean;
  specific2001PhysicalWitnessAcquired: false;
  firstGeneration2001TargetScanAcquired: false;
  directSpecificWitnessChainOfCustodyAcquired: false;
  reproduciblePhysicalOrByteStableWitnessIdentityAcquired: false;
  canonicalTitleCopyrightTocPaginationTargetStructureAnchorSetAcquired: false;
  canonicalWitnessNormalizationGapResolved: false;
  contemporaneousSisterWitnessPrefaceContextAcquired: boolean;
  sisterWitnessTitle: '《六爻详真》' | null;
  sisterWitnessPrefaceNamesBothXiangzhenTitles: boolean;
  sisterWitnessPrefaceDatedXinSiSummer: boolean;
  sisterWitnessPrefaceDescribesPublicationOccasion: boolean;
  sisterWitnessContextMayIdentifyTargetWitness: false;
  canonically2001BoundTargetSectionFacsimileAcquired: false;
  canonicalTargetSectionPageContextAcquired: false;
  governed2003RouteSequencePreservedAsComparisonTarget: boolean;
  directCanonical2001To2003SequenceComparisonCompleted: false;
  unboundPublicTextSimilarityMayResolveExactPassageGap: false;
  sisterWitnessPrefaceMayResolveTargetExactPassageGap: false;
  exactTargetPassageBindingGapResolved: false;
  materiallyNewWebAccessibleEvidenceClassAcquired: boolean;
  equivalentPublicTargetSurfaceRepeatedAsProgress: false;
  furtherProgressRequiresSpecificCustodianPhysicalFirstGenerationOrCanonicallyBoundTargetAccess: boolean;
  nonAcquisitionCreatesNegativeFinding: false;
  accessFailureCreatesNegativeFinding: false;
  custodianSilenceCreatesNegativeFinding: false;
  searchSilenceCreatesNegativeFinding: false;
  paywallCreatesNegativeFinding: false;
  inaccessibleSubstrateCreatesNegativeFinding: false;
  targetedDiscoveryExhaustionEstablished: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  allTwoRemainingGapsRequiredBeforeRebindingReadiness: boolean;
  evidenceRebindingMethodologicallyReadyByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  sameAuthor2001To2003DoctrinalDependencyPreserved: boolean;
  externalTargetLineageUnresolvedQuestionCountPreserved: 3 | 0;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI208Accepted(
  i208: I208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReviewReport,
): boolean {
  return (
    i208.status === 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW' &&
    i208.decision ===
      'I207_BOUNDARY_SUPPORTS_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_TWO_PATHS_EIGHT_OBLIGATIONS_SIXTEEN_CONTROLS_FROZEN_MATERIALLY_NEW_SUBSTRATE_ONLY_EVIDENCE_COLLECTION_NO_REBINDING_NO_INDEPENDENCE' &&
    i208.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i208.policyVersion === 'v1-definition' &&
    i208.adoptionVersion === 'v1-adoption' &&
    i208.currentCandidateSetVersion === 'v1-candidate-set' &&
    i208.currentInputPackageVersion === 'v2-input-package' &&
    i208.exactI207BoundaryAccepted &&
    i208.targetPriorWitnessId === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i208.targetAuthor === '曲炜' &&
    i208.targetTitle === '《四柱详真》' &&
    i208.targetAppearanceYear === 2001 &&
    i208.resolvedPublicationGapPreserved &&
    i208.publicationGapTargetedByThisGate === false &&
    i208.remainingGapCountAtEntry === 2 &&
    i208.canonicalWitnessNormalizationGapOpenAtEntry &&
    i208.exactTargetPassageBindingGapOpenAtEntry &&
    i208.materialUnboundRouteSequenceCorrespondencePreserved &&
    i208.correspondingRouteElementCountPreserved === 3 &&
    i208.equivalentPublicSurfaceRepeatAuthorizedByThisGate === false &&
    i208.acquisitionPathCount === 2 &&
    i208.acquisitionPathIds.length === I208_ACQUISITION_PATH_IDS.length &&
    i208.acquisitionPathIds.every((id, index) => id === I208_ACQUISITION_PATH_IDS[index]) &&
    i208.acquisitionPathsFrozenProspectively &&
    i208.evidenceObligationCount === 8 &&
    i208.evidenceObligationIds.length === I208_EVIDENCE_OBLIGATION_IDS.length &&
    i208.evidenceObligationIds.every((id, index) => id === I208_EVIDENCE_OBLIGATION_IDS[index]) &&
    i208.evidenceObligationsFrozenProspectively &&
    i208.acquisitionControlCount === 16 &&
    i208.acquisitionControlIds.length === I208_ACQUISITION_CONTROL_IDS.length &&
    i208.acquisitionControlIds.every((id, index) => id === I208_ACQUISITION_CONTROL_IDS[index]) &&
    i208.acquisitionControlsFrozenProspectively &&
    i208.directCustodianArchiveOwnerOrFirstGenerationIdentityRequired &&
    i208.directAuthorTitle2001WitnessProvenanceRequired &&
    i208.secondaryMetadataMayBackfillWitnessProvenance === false &&
    i208.reproduciblePhysicalScanOrByteStableIdentityRequired &&
    i208.titleCopyrightTocPaginationTargetStructureAnchorsRequired &&
    i208.pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization === false &&
    i208.canonically2001BoundTargetSectionFacsimileRequired &&
    i208.targetSectionPageContextOrNeighboringTextAnchorsRequired &&
    i208.governed2003RouteSequenceAvailableAsComparisonTarget &&
    i208.directCanonical2001To2003SequenceComparisonRequired &&
    i208.unboundPublicTextSimilarityMayResolveExactPassageGap === false &&
    i208.normalizationAndExactPassageMayCrossBackfill === false &&
    i208.custodianBoundCanonicalWitnessFacsimileAcquisitionMayProceed &&
    i208.authorizationIsEvidenceCollectionOnly &&
    i208.acquisitionExecutedByThisGate === false &&
    i208.evidenceAcquiredByThisGate === false &&
    i208.gapResolvedByThisGateCount === 0 &&
    i208.explicitNegativeFindingCountCreatedByThisGate === 0 &&
    i208.targetedDiscoveryExhaustionEstablished === false &&
    i208.onlineCorpusExhaustionEstablished === false &&
    i208.corpusExhaustionEstablished === false &&
    i208.allTwoRemainingGapsRequiredBeforeRebindingReadiness &&
    i208.evidenceRebindingMethodologicallyReady === false &&
    i208.evidenceRebindingAuthorizedByThisGate === false &&
    i208.evidenceRebindingExecutedByThisGate === false &&
    i208.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i208.externalTargetLineageUnresolvedQuestionCount === 3 &&
    i208.provenanceIndependenceAdjudicatedByThisGate === false &&
    i208.independentNormativeProvenanceEstablishedCount === 0 &&
    i208.explicitDerivativeRelationshipCheckRequired &&
    i208.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i208.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i208.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i208.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i208.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i208.currentV2PackageAndCandidateSetRemainImmutable &&
    i208.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i208.candidateSetMutatedByThisGate === false &&
    i208.candidateSetReevaluationAuthorizedByThisGate === false &&
    i208.productionPolicyExecutionAuthorized === false &&
    i208.actualCompositionPerformedByThisGate === false &&
    i208.multiSourceCompositionAuthorized === false &&
    i208.thresholdRuleCreatedByThisGate === false &&
    i208.classificationAuthorized === false &&
    i208.numericScoringAuthorized === false &&
    i208.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I209AcquisitionPathEvidenceRecord[] {
  const normalizationGap: readonly I209RemainingGapId[] = Object.freeze([
    'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
  ]);
  const passageGap: readonly I209RemainingGapId[] = Object.freeze([
    'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
  ]);

  return Object.freeze([
    {
      pathId: 'DIRECT_CUSTODIAN_OR_FIRST_GENERATION_2001_WITNESS_PROVENANCE_AND_BYTE_IDENTITY_ACQUISITION',
      finding: 'FIRST_PARTY_CUSTODIAN_CHANNEL_LOCATED_SPECIFIC_2001_WITNESS_NOT_ACQUIRED',
      sourceLocators: Object.freeze(['https://www.zhouyiqw.com/qwjj.php', 'https://www.zhouyiqw.com/']),
      observations: Object.freeze([
        'The author-operated Qu Wei site identifies the 2001 appearance of 《四柱详真》 and continues to list the work among Qu Wei publications.',
        'The same first-party site warns readers against pirated materials and directs purchases through the Qu Wei information center, establishing a current official authenticity/custodian contact channel.',
        'No particular original 2001 physical copy, first-generation target scan, custody chain, or reproducible byte identity was directly acquired from that channel in this gate.',
      ]),
      contextualEvidenceAcquired: true,
      qualifyingGapResolutionEvidenceAcquired: false,
      resolvedGapIds: Object.freeze([]),
      unresolvedGapIds: normalizationGap,
    },
    {
      pathId: 'CANONICALLY_2001_BOUND_TARGET_SECTION_FACSIMILE_WITH_PAGE_CONTEXT_ACQUISITION',
      finding: 'CONTEMPORANEOUS_SISTER_WITNESS_PREFACE_CONTEXT_ACQUIRED_TARGET_FACSIMILE_NOT_ACQUIRED',
      sourceLocators: Object.freeze([
        'https://www.scribd.com/document/802161929/曲炜-六爻详真',
        'https://www.scribd.com/document/495620785/六爻详真-曲炜',
      ]),
      observations: Object.freeze([
        'Accessible 《六爻详真》 witness text contains a contemporaneous preface dated 辛巳年夏 and names both 《四柱详真》 and 《六爻详真》 in their publication context.',
        'This sister-witness context strengthens the historical production timeline but is not the target 《四柱详真》 witness and cannot establish its canonical scan lineage, pagination, or target-section page anchors.',
        'No canonically 2001-bound 《四柱详真》 第九章 facsimile with page context was acquired.',
      ]),
      contextualEvidenceAcquired: true,
      qualifyingGapResolutionEvidenceAcquired: false,
      resolvedGapIds: Object.freeze([]),
      unresolvedGapIds: passageGap,
    },
  ]);
}

function finalized(
  material: Omit<I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport, 'evidenceRecordSetId'>,
): I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: `i209_qu_wei_2001_custodian_bound_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidence(
  i208: I208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReviewReport,
): I209QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionEvidenceReport {
  const accepted = exactI208Accepted(i208);
  const records = accepted ? evidenceRecords() : Object.freeze([] as I209AcquisitionPathEvidenceRecord[]);

  return finalized({
    evidenceVersion: I209_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE'
      : 'I208_CUSTODIAN_BOUND_ACQUISITION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EXECUTED_TWO_PATHS_FIRST_PARTY_CUSTODIAN_LEAD_AND_CONTEMPORANEOUS_SISTER_WITNESS_CONTEXT_ACQUIRED_ZERO_GAPS_RESOLVED_TWO_GAPS_REMAIN_EXTERNAL_PHYSICAL_OR_CANONICAL_ACCESS_REQUIRED_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE'
      : 'QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE_NOT_EXECUTED',
    upstreamI208ReviewId: i208.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI208BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    resolvedPublicationGapPreserved: accepted,
    publicationGapRetargetedByThisGate: false,
    acquisitionPathCountExecuted: accepted ? 2 : 0,
    allTwoFrozenAcquisitionPathsExecuted: accepted,
    acquisitionPathEvidenceRecords: records,
    acquisitionPathEvidenceRecordCount: accepted ? 2 : 0,
    evidenceObligationCountAccepted: accepted ? 8 : 0,
    acquisitionControlCountAccepted: accepted ? 16 : 0,
    contextualEvidencePathCount: accepted ? 2 : 0,
    qualifyingGapResolutionEvidenceCount: 0,
    resolvedGapCount: 0,
    unresolvedGapIds: accepted ? I209_REMAINING_GAP_IDS : Object.freeze([]),
    unresolvedGapCount: accepted ? 2 : 0,
    explicitNegativeFindingCount: 0,
    officialFirstPartyCustodianChannelLocated: accepted,
    officialCustodianChannelIdentifiesQuWeiWorkInventory: accepted,
    officialCustodianChannelListsSizhuXiangzhen: accepted,
    officialCustodianChannelWarnsAgainstPiratedCopies: accepted,
    officialCustodianChannelProvidesCurrentPurchaseContact: accepted,
    officialChronologyBindsAuthorTitleAnd2001Appearance: accepted,
    specific2001PhysicalWitnessAcquired: false,
    firstGeneration2001TargetScanAcquired: false,
    directSpecificWitnessChainOfCustodyAcquired: false,
    reproduciblePhysicalOrByteStableWitnessIdentityAcquired: false,
    canonicalTitleCopyrightTocPaginationTargetStructureAnchorSetAcquired: false,
    canonicalWitnessNormalizationGapResolved: false,
    contemporaneousSisterWitnessPrefaceContextAcquired: accepted,
    sisterWitnessTitle: accepted ? '《六爻详真》' : null,
    sisterWitnessPrefaceNamesBothXiangzhenTitles: accepted,
    sisterWitnessPrefaceDatedXinSiSummer: accepted,
    sisterWitnessPrefaceDescribesPublicationOccasion: accepted,
    sisterWitnessContextMayIdentifyTargetWitness: false,
    canonically2001BoundTargetSectionFacsimileAcquired: false,
    canonicalTargetSectionPageContextAcquired: false,
    governed2003RouteSequencePreservedAsComparisonTarget: accepted,
    directCanonical2001To2003SequenceComparisonCompleted: false,
    unboundPublicTextSimilarityMayResolveExactPassageGap: false,
    sisterWitnessPrefaceMayResolveTargetExactPassageGap: false,
    exactTargetPassageBindingGapResolved: false,
    materiallyNewWebAccessibleEvidenceClassAcquired: accepted,
    equivalentPublicTargetSurfaceRepeatedAsProgress: false,
    furtherProgressRequiresSpecificCustodianPhysicalFirstGenerationOrCanonicallyBoundTargetAccess: accepted,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    custodianSilenceCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: accepted,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: accepted,
    externalTargetLineageUnresolvedQuestionCountPreserved: accepted ? 3 : 0,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE',
    notes: Object.freeze(
      accepted
        ? [
            'A first-party official authenticity/purchase channel is now located, but no specific 2001 target witness was acquired from it.',
            'A contemporaneously dated sister-witness preface names both Xiangzhen titles and strengthens production chronology only; it does not identify the target witness or target passage.',
            'Further remediation requires access to a specific physical/first-generation/canonically bound target witness rather than more equivalent public target-surface repetition.',
          ]
        : ['I208 readiness boundary was invalid; no acquisition evidence was executed.'],
    ),
  });
}
