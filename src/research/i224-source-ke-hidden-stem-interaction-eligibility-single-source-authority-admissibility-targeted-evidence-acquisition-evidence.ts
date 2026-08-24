import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I223_TARGETED_ADMISSIBILITY_ACQUISITION_PATH_IDS,
  type I223TargetedAdmissibilityAcquisitionPathId,
  type I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport,
} from './i223-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-targeted-evidence-acquisition-readiness-review.js';
import {
  I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS,
  type I222UnresolvedAuthorityAdmissibilityGapId,
} from './i222-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-coverage-adequacy-authority-admissibility-promotion-readiness-review.js';

export const I224_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-targeted-evidence-acquisition-evidence-v1';

export type I224AcquisitionDisposition =
  | 'DIRECT_LIMITED_FINDING'
  | 'LEAD_ONLY_PARTIAL_FINDING'
  | 'DIRECT_CAUTION_EVIDENCE'
  | 'DIRECT_CONFLICT_EVIDENCE';

export interface I224TargetedAcquisitionEvidenceRecord {
  pathId: I223TargetedAdmissibilityAcquisitionPathId;
  disposition: I224AcquisitionDisposition;
  directOpenedEvidenceAvailable: boolean;
  searchResultLeadAvailable: boolean;
  directLocators: readonly string[];
  leadOnlyLocators: readonly string[];
  finding: string;
  establishesTargetOriginalAuthorship: false;
  establishesTargetDoctrinalLineage: false;
  establishesTargetPriorSourceDependency: false;
  establishesTargetNormativeAdmissibility: false;
  resolvesRestrictiveDoctrinalConflict: false;
  negativeOrExhaustionFindingCreated: false;
}

export interface I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE'
    | 'I223_TARGETED_ACQUISITION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FIVE_TARGETED_PATHS_EXECUTED_SOHU_PUBLICATION_OBJECT_BOUND_LATER_MIRROR_REDISTRIBUTION_LEADS_OBSERVED_ACCOUNT_REPUBLICATION_BEHAVIOR_DIRECTLY_EVIDENCED_RESTRICTIVE_CONFLICT_RECONFIRMED_ORIGINAL_AUTHORSHIP_LINEAGE_PRIOR_SOURCE_AND_DERIVATIVE_DEPENDENCY_UNRESOLVED_NO_ADMISSIBILITY_ADJUDICATED_NO_PROMOTION'
    | 'HIDDEN_STEM_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_NOT_EXECUTED';
  upstreamI223ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI223BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId:
    | 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML'
    | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationPerformedByThisGate: false;
  acquisitionExecuted: boolean;
  executedAcquisitionPathCount: 5 | 0;
  evidenceRecords: readonly I224TargetedAcquisitionEvidenceRecord[];
  evidenceRecordCount: 5 | 0;
  directPublicationBylineAndAccountIdentityCaptured: boolean;
  targetPublicationTitle: '干支的九种关系2' | null;
  targetPublicationAccount: '李炎宸易经风水智慧' | null;
  targetPublicationDate: '2017-02-02' | null;
  targetPublicationDirectLocator: 'https://m.sohu.com/n/479788391/?wscrid=95360_8' | null;
  laterMirrorRedistributionLeadObserved: boolean;
  laterMirrorDirectlyOpenedForPositiveAdmissibilityFinding: false;
  earlierThanTargetExactTextWitnessEstablished: false;
  priorPublicationSearchSilenceCreatesNegativeFinding: false;
  corpusExhaustionClaimed: false;
  sameAccountThirdPartyMaterialRepublicationDirectlyEvidenced: boolean;
  sameAccountRepublicationEvidenceLocator:
    | 'https://mt.sohu.com/20160829/n466534112.shtml'
    | null;
  sameAccountRepublicationNamedSource: '高云启的四柱命理学高级函授班讲义' | null;
  platformAccountMayBeTreatedAsTargetOriginalAuthor: false;
  possibleRelatedAuthorOrLineageLeadObserved: boolean;
  possibleRelatedAuthorOrLineageLeadPromotedToFinding: false;
  exactTargetDoctrinalAuthorshipEstablished: false;
  exactTargetDoctrinalLineageEstablished: false;
  exactTargetPriorSourceDependencyEstablished: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  restrictiveDoctrineDirectConflictEvidenceReconfirmed: boolean;
  restrictiveDoctrineLocator:
    | 'https://m.guoxuedashi.com/a/22337wzuc/281431r.html'
    | null;
  restrictiveDoctrineFinding:
    | 'LI_HANCHEN_BRANCH_PRINCIPAL_QI_ONLY_HIDDEN_STEM_NON_USE_WITH_LIMITED_EXCEPTIONS'
    | null;
  restrictiveDoctrineSchoolBoundaryEstablished: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  unresolvedAdmissibilityGapIds: readonly I222UnresolvedAuthorityAdmissibilityGapId[];
  unresolvedAdmissibilityGapCount: 4 | 0;
  anyAdmissibilityGapClosedByThisGate: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  authorityPromotionReadinessEstablishedByThisGate: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  searchSnippetUsedAsPositiveAuthority: false;
  sourcePlatformOrAccountAutoAcceptedAsAuthority: false;
  currentCandidateEvidenceUsedToBackfillAdmissibility: false;
  crossCandidateCompositionPerformed: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

const EVIDENCE_RECORDS: readonly I224TargetedAcquisitionEvidenceRecord[] = Object.freeze([
  Object.freeze({
    pathId: 'DIRECT_PUBLICATION_BYLINE_AND_ACCOUNT_IDENTITY_CONTEXT_CAPTURE',
    disposition: 'DIRECT_LIMITED_FINDING',
    directOpenedEvidenceAvailable: true,
    searchResultLeadAvailable: true,
    directLocators: Object.freeze(['https://m.sohu.com/n/479788391/?wscrid=95360_8']),
    leadOnlyLocators: Object.freeze([]),
    finding:
      'The directly opened target publication is titled 干支的九种关系2, is presented by Sohu as sourced from 李炎宸易经风水智慧, and carries the 2017-02-02 publication timestamp. This binds the evaluated publication object and account context only.',
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    establishesTargetNormativeAdmissibility: false,
    resolvesRestrictiveDoctrinalConflict: false,
    negativeOrExhaustionFindingCreated: false,
  }),
  Object.freeze({
    pathId: 'EXACT_TEXT_PRIOR_PUBLICATION_AND_ORIGINALITY_TRACE',
    disposition: 'LEAD_ONLY_PARTIAL_FINDING',
    directOpenedEvidenceAvailable: false,
    searchResultLeadAvailable: true,
    directLocators: Object.freeze([]),
    leadOnlyLocators: Object.freeze([
      'https://chinaqigong.com/article-493-1.html',
      'https://www.aqioo.com/bazisuanming/tiangandizhi/165853.html',
    ]),
    finding:
      'Indexed 2021 pages preserve substantial same-family target language about static/dynamic 克, hidden stems, and the nine stem-branch relations, demonstrating later circulation leads. This pass did not establish a directly verified pre-2017 exact-text witness or target originality.',
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    establishesTargetNormativeAdmissibility: false,
    resolvesRestrictiveDoctrinalConflict: false,
    negativeOrExhaustionFindingCreated: false,
  }),
  Object.freeze({
    pathId: 'AUTHOR_OR_DOCTRINAL_LINEAGE_IDENTITY_DISCOVERY',
    disposition: 'DIRECT_CAUTION_EVIDENCE',
    directOpenedEvidenceAvailable: true,
    searchResultLeadAvailable: true,
    directLocators: Object.freeze(['https://mt.sohu.com/20160829/n466534112.shtml']),
    leadOnlyLocators: Object.freeze(['https://mt.sohu.com/20161014/n470281736.shtml']),
    finding:
      'A directly opened 2016 article under the same Sohu account explicitly states that its material was extracted from 高云启的四柱命理学高级函授班讲义. A separate account article contains a 曲炜按 attribution. These observations establish that the account can publish attributed third-party material, so the account byline cannot establish the target text original authorship or doctrinal lineage.',
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    establishesTargetNormativeAdmissibility: false,
    resolvesRestrictiveDoctrinalConflict: false,
    negativeOrExhaustionFindingCreated: false,
  }),
  Object.freeze({
    pathId: 'DERIVATIVE_SOURCE_DEPENDENCY_COMPARISON',
    disposition: 'LEAD_ONLY_PARTIAL_FINDING',
    directOpenedEvidenceAvailable: false,
    searchResultLeadAvailable: true,
    directLocators: Object.freeze([]),
    leadOnlyLocators: Object.freeze([
      'https://chinaqigong.com/article-493-1.html',
      'https://www.aqioo.com/bazisuanming/tiangandizhi/165853.html',
    ]),
    finding:
      'Later redistribution leads establish that the target theory circulates outside the 2017 Sohu publication, but they do not establish which publication is derivative from which earlier source. Possible practitioner-lineage leads remain unbound to the exact target passage.',
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    establishesTargetNormativeAdmissibility: false,
    resolvesRestrictiveDoctrinalConflict: false,
    negativeOrExhaustionFindingCreated: false,
  }),
  Object.freeze({
    pathId: 'RESTRICTIVE_DOCTRINE_SCHOOL_BOUNDARY_EVIDENCE_ACQUISITION',
    disposition: 'DIRECT_CONFLICT_EVIDENCE',
    directOpenedEvidenceAvailable: true,
    searchResultLeadAvailable: true,
    directLocators: Object.freeze(['https://m.guoxuedashi.com/a/22337wzuc/281431r.html']),
    leadOnlyLocators: Object.freeze([]),
    finding:
      'The directly opened 八字预测真踪 chapter states the 李涵辰 methodology that branches are generally evaluated by principal qi without subdividing hidden stems, with limited 辰戌丑未 adjustment exceptions. This reconfirms a restrictive competing doctrine but does not establish the school boundary or choose between doctrines.',
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    establishesTargetNormativeAdmissibility: false,
    resolvesRestrictiveDoctrinalConflict: false,
    negativeOrExhaustionFindingCreated: false,
  }),
]);

function exactI223Accepted(
  i223: I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport,
): boolean {
  return (
    i223.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW' &&
    i223.decision ===
      'FOUR_ADMISSIBILITY_GAPS_FIVE_TARGETED_ACQUISITION_PATHS_SIXTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ADMISSIBILITY_ADJUDICATED_NO_PROMOTION' &&
    i223.exactI222BoundaryAccepted &&
    i223.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i223.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i223.coverageReevaluationAuthorizedByThisGate === false &&
    i223.unresolvedAdmissibilityGapCount === 4 &&
    i223.unresolvedAdmissibilityGapIds.length === 4 &&
    i223.acquisitionPathCount === 5 &&
    i223.acquisitionPathIds.length === 5 &&
    i223.acquisitionPathIds.every(
      (pathId, index) => pathId === I223_TARGETED_ADMISSIBILITY_ACQUISITION_PATH_IDS[index],
    ) &&
    i223.acquisitionControlCount === 16 &&
    i223.acquisitionControlsFrozen &&
    i223.targetedAcquisitionAuthorized &&
    i223.targetedAcquisitionExecutedByThisGate === false &&
    i223.directPublicationContextCaptureRequired &&
    i223.exactTextPriorPublicationTraceRequired &&
    i223.authorOrDoctrinalLineageDiscoveryRequired &&
    i223.derivativeSourceDependencyComparisonRequired &&
    i223.restrictiveDoctrineSchoolBoundaryEvidenceRequired &&
    i223.searchSnippetMayCreatePositiveAdmissibilityFinding === false &&
    i223.platformBylineMayAutoEstablishOriginalAuthorship === false &&
    i223.authorNameMatchMayAutoEstablishDoctrinalLineage === false &&
    i223.textualSimilarityMayAutoEstablishDerivativeRelationship === false &&
    i223.schoolConflictMayBeSilentlyResolved === false &&
    i223.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i223.authorityPromotionReadinessEstablishedByThisGate === false &&
    i223.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i223.authorityGapClosed === false &&
    i223.authorityPromotedByThisGate === false &&
    i223.doctrinalConflictPreserved &&
    i223.doctrinalConflictResolvedByThisGate === false &&
    i223.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i223.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i223.provenanceIndependenceAdjudicatedByThisGate === false &&
    i223.derivativeLineageAdjudicatedByThisGate === false &&
    i223.evidenceRebindingAuthorizedByThisGate === false &&
    i223.candidateSetMutatedByThisGate === false &&
    i223.candidateSetReevaluationAuthorizedByThisGate === false &&
    i223.currentV2PackageAndCandidateSetRemainImmutable &&
    i223.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i223.actualCompositionPerformedByThisGate === false &&
    i223.multiSourceCompositionAuthorized === false &&
    i223.thresholdRuleCreatedByThisGate === false &&
    i223.damageEvaluationAuthorized === false &&
    i223.classificationAuthorized === false &&
    i223.numericScoringAuthorized === false &&
    i223.productionPolicyExecutionAuthorized === false &&
    i223.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE'
  );
}

function finalized(
  material: Omit<
    I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport,
    'evidenceId'
  >,
): I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport {
  return {
    evidenceId: `i224_hidden_stem_admissibility_acquisition_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidence(
  i223: I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport,
): I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport {
  const accepted = exactI223Accepted(i223);

  return finalized({
    evidenceVersion:
      I224_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE'
      : 'I223_TARGETED_ACQUISITION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FIVE_TARGETED_PATHS_EXECUTED_SOHU_PUBLICATION_OBJECT_BOUND_LATER_MIRROR_REDISTRIBUTION_LEADS_OBSERVED_ACCOUNT_REPUBLICATION_BEHAVIOR_DIRECTLY_EVIDENCED_RESTRICTIVE_CONFLICT_RECONFIRMED_ORIGINAL_AUTHORSHIP_LINEAGE_PRIOR_SOURCE_AND_DERIVATIVE_DEPENDENCY_UNRESOLVED_NO_ADMISSIBILITY_ADJUDICATED_NO_PROMOTION'
      : 'HIDDEN_STEM_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_NOT_EXECUTED',
    upstreamI223ReviewId: i223.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI223BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationPerformedByThisGate: false,
    acquisitionExecuted: accepted,
    executedAcquisitionPathCount: accepted ? 5 : 0,
    evidenceRecords: accepted ? EVIDENCE_RECORDS : [],
    evidenceRecordCount: accepted ? 5 : 0,
    directPublicationBylineAndAccountIdentityCaptured: accepted,
    targetPublicationTitle: accepted ? '干支的九种关系2' : null,
    targetPublicationAccount: accepted ? '李炎宸易经风水智慧' : null,
    targetPublicationDate: accepted ? '2017-02-02' : null,
    targetPublicationDirectLocator: accepted ? 'https://m.sohu.com/n/479788391/?wscrid=95360_8' : null,
    laterMirrorRedistributionLeadObserved: accepted,
    laterMirrorDirectlyOpenedForPositiveAdmissibilityFinding: false,
    earlierThanTargetExactTextWitnessEstablished: false,
    priorPublicationSearchSilenceCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    sameAccountThirdPartyMaterialRepublicationDirectlyEvidenced: accepted,
    sameAccountRepublicationEvidenceLocator: accepted
      ? 'https://mt.sohu.com/20160829/n466534112.shtml'
      : null,
    sameAccountRepublicationNamedSource: accepted ? '高云启的四柱命理学高级函授班讲义' : null,
    platformAccountMayBeTreatedAsTargetOriginalAuthor: false,
    possibleRelatedAuthorOrLineageLeadObserved: accepted,
    possibleRelatedAuthorOrLineageLeadPromotedToFinding: false,
    exactTargetDoctrinalAuthorshipEstablished: false,
    exactTargetDoctrinalLineageEstablished: false,
    exactTargetPriorSourceDependencyEstablished: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineDirectConflictEvidenceReconfirmed: accepted,
    restrictiveDoctrineLocator: accepted ? 'https://m.guoxuedashi.com/a/22337wzuc/281431r.html' : null,
    restrictiveDoctrineFinding: accepted
      ? 'LI_HANCHEN_BRANCH_PRINCIPAL_QI_ONLY_HIDDEN_STEM_NON_USE_WITH_LIMITED_EXCEPTIONS'
      : null,
    restrictiveDoctrineSchoolBoundaryEstablished: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    unresolvedAdmissibilityGapIds: accepted ? I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS : [],
    unresolvedAdmissibilityGapCount: accepted ? 4 : 0,
    anyAdmissibilityGapClosedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    searchSnippetUsedAsPositiveAuthority: false,
    sourcePlatformOrAccountAutoAcceptedAsAuthority: false,
    currentCandidateEvidenceUsedToBackfillAdmissibility: false,
    crossCandidateCompositionPerformed: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE',
    notes: accepted
      ? [
          'The target Sohu publication object and its platform account context are directly bound, but the platform account is not treated as original doctrinal authorship.',
          'A directly opened 2016 article from the same account explicitly attributes extracted material to 高云启, providing account-level republication caution evidence without attributing the target text to 高云启.',
          'Later indexed mirrors preserve substantial target-family language, but because the relevant mirror pages were not directly opened in this pass they remain lead-only and cannot establish prior-source dependency or admissibility.',
          'The directly opened 李涵辰 source reconfirms a restrictive hidden-stem doctrine. The school boundary and doctrinal conflict remain unresolved.',
          'No silence, search failure, or lack of an earlier witness is promoted into a negative or corpus-exhaustion finding.',
        ]
      : [
          'I224 remains fail-closed unless the exact I223 five-path, sixteen-control acquisition readiness boundary is preserved.',
        ],
  });
}
