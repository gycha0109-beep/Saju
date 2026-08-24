import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport } from './i218-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-readiness-review.js';

export const I219_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-evidence-v1';

export const I219_CANDIDATE_EVIDENCE_IDS = Object.freeze([
  'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
  'LI_HONGCHENG_SIZHU_1000_WENDA_THIRD_PARTY_PDF_WITNESS_LEAD',
  'LINGRUI_JUSHI_GANZHI_NINE_RELATIONS_AQIOO_2021_INDEXED_MIRROR_LEAD',
] as const);
export type I219CandidateEvidenceId = (typeof I219_CANDIDATE_EVIDENCE_IDS)[number];

export type I219ObservedAuthoritySignal =
  | 'MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION'
  | 'VISIBLE_TO_HIDDEN'
  | 'HIDDEN_TO_VISIBLE'
  | 'HIDDEN_TO_HIDDEN'
  | 'ACTIVATION_AND_EXCEPTION_CONDITIONS'
  | 'RELATION_INTERACTION_DAMAGE_SEMANTIC_SEPARATION'
  | 'REPRODUCIBLE_PUBLISHED_SOURCE_CONTEXT';

export interface I219CandidateEvidenceRecord {
  candidateEvidenceId: I219CandidateEvidenceId;
  sourceLabel: string;
  authorOrSourceAccount: string;
  title: string;
  publicationContext: string;
  primaryLocator: string;
  supportingLocators: readonly string[];
  directlyOpenedHtmlContext: boolean;
  extractedPdfContextOnly: boolean;
  indexedSearchContextOnly: boolean;
  publishedSourceIdentityBound: boolean;
  exactDoctrinalAuthorshipOrLineageAdjudicated: false;
  originalPrintEditionCanonicallyBound: false;
  reproducibleLocator: boolean;
  searchSnippetUsedAsAuthority: false;
  observedSignals: readonly I219ObservedAuthoritySignal[];
  observedSignalCount: number;
  sameSourceVisibleToHiddenObserved: boolean;
  sameSourceHiddenToVisibleObserved: boolean;
  sameSourceHiddenToHiddenObserved: boolean;
  activationOrExceptionLanguageObserved: boolean;
  semanticLayerSeparationSignalObserved: boolean;
  candidateLocalSevenRequirementCoverageAdjudicated: false;
  leadOnly: boolean;
  qualifyingForLaterSingleSourceCoverageEvaluation: boolean;
  authorityPromoted: false;
  candidateRegistered: false;
  candidateSelected: false;
  notes: readonly string[];
}

export interface I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'I218_DISCOVERY_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_ONE_DIRECT_HTML_SINGLE_SOURCE_CANDIDATE_TWO_LEADS_ALL_THREE_DIRECTIONAL_SIGNALS_OBSERVED_IN_DIRECT_HTML_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED'
    | 'SINGLE_SOURCE_HIDDEN_STEM_AUTHORITY_DISCOVERY_EVIDENCE_NOT_EXECUTED';
  upstreamI218ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI218BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  discoveryExecuted: boolean;
  executedDiscoveryPathCount: 5 | 0;
  candidateEvidenceRecords: readonly I219CandidateEvidenceRecord[];
  candidateEvidenceRecordCount: 3 | 0;
  qualifyingDirectHtmlCandidateCount: 1 | 0;
  leadOnlyCandidateCount: 2 | 0;
  materiallyNewSingleSourceCandidateObserved: boolean;
  directHtmlCandidateHasAllThreeDirectionalSignals: boolean;
  directHtmlCandidateHasActivationExceptionSignals: boolean;
  directHtmlCandidateHasSemanticSeparationSignals: boolean;
  directHtmlCandidateHasReproduciblePublishedContext: boolean;
  exactDoctrinalAuthorshipOrLineageResolvedByThisGate: false;
  originalPrintEditionIdentityResolvedByThisGate: false;
  sevenRequirementCoverageAdjudicatedByThisGate: false;
  sevenRequirementAuthorityContractSatisfiedByThisGate: false;
  sourceClassOrAgeAutoAcceptancePerformed: false;
  crossCandidateCompositionPerformed: false;
  currentCandidateEvidenceUsedToBackfillNewCandidate: false;
  searchSnippetUsedAsAuthority: false;
  modelSynthesisUsedAsAuthority: false;
  generalKnowledgeUsedAsAuthority: false;
  empiricalCalibrationUsedToCreateAuthority: false;
  failedPdfVisualAccessCreatesNegativeFinding: false;
  failedMirrorOpenCreatesNegativeFinding: false;
  discoverySilenceCreatesExhaustionFinding: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeLineageAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const DIRECT_SOHU_SIGNALS = Object.freeze([
  'MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
  'VISIBLE_TO_HIDDEN',
  'HIDDEN_TO_VISIBLE',
  'HIDDEN_TO_HIDDEN',
  'ACTIVATION_AND_EXCEPTION_CONDITIONS',
  'RELATION_INTERACTION_DAMAGE_SEMANTIC_SEPARATION',
  'REPRODUCIBLE_PUBLISHED_SOURCE_CONTEXT',
] as const satisfies readonly I219ObservedAuthoritySignal[]);

const CANDIDATE_RECORDS: readonly I219CandidateEvidenceRecord[] = Object.freeze([
  Object.freeze({
    candidateEvidenceId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sourceLabel: 'Sohu published HTML article',
    authorOrSourceAccount: '李炎宸易经风水智慧',
    title: '《干支的九种关系2》',
    publicationContext: '搜狐移动页，2017-02-02 13:04:23，页面标注“来源于：李炎宸易经风水智慧”。',
    primaryLocator: 'https://m.sohu.com/n/479788391/?wscrid=95360_8',
    supportingLocators: Object.freeze([
      'https://www.aqioo.com/bazisuanming/tiangandizhi/165853.html',
    ]),
    directlyOpenedHtmlContext: true,
    extractedPdfContextOnly: false,
    indexedSearchContextOnly: false,
    publishedSourceIdentityBound: true,
    exactDoctrinalAuthorshipOrLineageAdjudicated: false,
    originalPrintEditionCanonicallyBound: false,
    reproducibleLocator: true,
    searchSnippetUsedAsAuthority: false,
    observedSignals: DIRECT_SOHU_SIGNALS,
    observedSignalCount: 7,
    sameSourceVisibleToHiddenObserved: true,
    sameSourceHiddenToVisibleObserved: true,
    sameSourceHiddenToHiddenObserved: true,
    activationOrExceptionLanguageObserved: true,
    semanticLayerSeparationSignalObserved: true,
    candidateLocalSevenRequirementCoverageAdjudicated: false,
    leadOnly: false,
    qualifyingForLaterSingleSourceCoverageEvaluation: true,
    authorityPromoted: false,
    candidateRegistered: false,
    candidateSelected: false,
    notes: Object.freeze([
      'The directly opened HTML page contains hidden-to-hidden examples under 地支静克, same-pillar 支克干 examples that expose hidden-to-visible direction, and 干克支 examples that expose visible-to-hidden direction inside one published page.',
      'The page separately distinguishes static from dynamic 克 and gives external activation, clash, combination, transformation, and break conditions; it also separates relation categories and later result/effect discussion.',
      'This gate records signals only. It does not decide that the seven I212 requirements are satisfied, and it does not adjudicate the authorship/lineage of the doctrine or bind the page to a canonical print edition.',
    ]),
  }),
  Object.freeze({
    candidateEvidenceId: 'LI_HONGCHENG_SIZHU_1000_WENDA_THIRD_PARTY_PDF_WITNESS_LEAD',
    sourceLabel: 'third-party digital PDF witness lead',
    authorOrSourceAccount: '李洪成',
    title: '《四柱1000问答疑》',
    publicationContext: '第三方数字PDF索引/抽取文本；另有目录镜像标注作者、PDF、页数与文件大小。',
    primaryLocator:
      'https://vr-d.com/pdf-file/%E5%91%BD%E7%90%86%2F%E5%9B%9B%E6%9F%B11000%E9%97%AE%E7%AD%94%E7%96%91_%E6%9D%8E%E6%B4%AA%E6%88%90.pdf',
    supportingLocators: Object.freeze([
      'https://r1689.com/m/view.php?aid=1754',
      'https://www.sizhuyucexue.com/thread-1361-1-1.html',
    ]),
    directlyOpenedHtmlContext: false,
    extractedPdfContextOnly: true,
    indexedSearchContextOnly: false,
    publishedSourceIdentityBound: false,
    exactDoctrinalAuthorshipOrLineageAdjudicated: false,
    originalPrintEditionCanonicallyBound: false,
    reproducibleLocator: true,
    searchSnippetUsedAsAuthority: false,
    observedSignals: Object.freeze([
      'MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
      'HIDDEN_TO_HIDDEN',
      'ACTIVATION_AND_EXCEPTION_CONDITIONS',
    ] as const),
    observedSignalCount: 3,
    sameSourceVisibleToHiddenObserved: false,
    sameSourceHiddenToVisibleObserved: false,
    sameSourceHiddenToHiddenObserved: true,
    activationOrExceptionLanguageObserved: true,
    semanticLayerSeparationSignalObserved: true,
    candidateLocalSevenRequirementCoverageAdjudicated: false,
    leadOnly: true,
    qualifyingForLaterSingleSourceCoverageEvaluation: false,
    authorityPromoted: false,
    candidateRegistered: false,
    candidateSelected: false,
    notes: Object.freeze([
      'Indexed Q39-Q40 text is a materially useful lead concerning hidden-stem directness limits, own-pillar interaction, and activation through later fortune/time triggers.',
      'The PDF could not be visually opened through the available screenshot path and no canonical print/edition witness was verified. Under I212/I218, extracted/search context is therefore not used as authority and remains lead-only.',
    ]),
  }),
  Object.freeze({
    candidateEvidenceId: 'LINGRUI_JUSHI_GANZHI_NINE_RELATIONS_AQIOO_2021_INDEXED_MIRROR_LEAD',
    sourceLabel: 'indexed HTML mirror lead',
    authorOrSourceAccount: '灵睿居士',
    title: '《干支的九种关系》',
    publicationContext: '阿启网索引页，2021-08-26 07:30:56；索引文本覆盖“生”的静/动态至“克”章节。',
    primaryLocator: 'https://www.aqioo.com/bazisuanming/tiangandizhi/165853.html',
    supportingLocators: Object.freeze([
      'https://m.sohu.com/n/479788391/?wscrid=95360_8',
    ]),
    directlyOpenedHtmlContext: false,
    extractedPdfContextOnly: false,
    indexedSearchContextOnly: true,
    publishedSourceIdentityBound: false,
    exactDoctrinalAuthorshipOrLineageAdjudicated: false,
    originalPrintEditionCanonicallyBound: false,
    reproducibleLocator: true,
    searchSnippetUsedAsAuthority: false,
    observedSignals: Object.freeze([
      'MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
      'VISIBLE_TO_HIDDEN',
      'HIDDEN_TO_VISIBLE',
      'HIDDEN_TO_HIDDEN',
      'ACTIVATION_AND_EXCEPTION_CONDITIONS',
      'RELATION_INTERACTION_DAMAGE_SEMANTIC_SEPARATION',
    ] as const),
    observedSignalCount: 6,
    sameSourceVisibleToHiddenObserved: true,
    sameSourceHiddenToVisibleObserved: true,
    sameSourceHiddenToHiddenObserved: true,
    activationOrExceptionLanguageObserved: true,
    semanticLayerSeparationSignalObserved: true,
    candidateLocalSevenRequirementCoverageAdjudicated: false,
    leadOnly: true,
    qualifyingForLaterSingleSourceCoverageEvaluation: false,
    authorityPromoted: false,
    candidateRegistered: false,
    candidateSelected: false,
    notes: Object.freeze([
      'Search indexing exposes a wider article context that appears to include the same 克 material plus the preceding 生 framework.',
      'Direct open returned a cache miss, so the indexed mirror is preserved only as a follow-up lead. No independence or derivative relationship to the Sohu page is adjudicated here.',
    ]),
  }),
]);

function exactI218Accepted(
  i218: I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport,
): boolean {
  return (
    i218.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW' &&
    i218.decision ===
      'SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SIXTEEN_CONTROLS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED' &&
    i218.exactI217BoundaryAccepted &&
    i218.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i218.requirementCount === 7 &&
    i218.primaryResidualRequirementCount === 5 &&
    i218.discoveryPathCount === 5 &&
    i218.discoveryPathsFrozen &&
    i218.discoveryControlCount === 16 &&
    i218.discoveryControlsFrozen &&
    i218.singleSourceSevenRequirementCandidateRequired &&
    i218.allSevenRequirementsMustBeSatisfiedWithinSameCandidate &&
    i218.currentCandidateEvidenceMayCrossCompleteCandidate === false &&
    i218.existingVisibleToHiddenSignalMayBackfillCandidate === false &&
    i218.hiddenToVisiblePriorityTargetRequired &&
    i218.sameCandidateVisibleToHiddenEvidenceRequired &&
    i218.generalHiddenToHiddenEvidenceRequired &&
    i218.branchClashOnlyHiddenToHiddenMayBeGeneralized === false &&
    i218.explicitMembershipVsEffectiveInteractionSeparationRequired &&
    i218.explicitPositionContextActivationAndExceptionsRequired &&
    i218.explicitRelationInteractionDamageSeparationRequired &&
    i218.exactSourceIdentityRequired &&
    i218.originalOrVerifiedSourceContextRequired &&
    i218.reproducibleLocatorRequired &&
    i218.searchSnippetMayCountAsAuthority === false &&
    i218.sourceClassOrAgeAutoAcceptanceAllowed === false &&
    i218.discoveryAuthorized &&
    i218.discoveryExecutedByThisGate === false &&
    i218.authorityPromotedByThisGate === false &&
    i218.quWei2001HoldPreserved &&
    i218.li1998SameTargetPathSuspendedNotRetired &&
    i218.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i218.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i218.provenanceIndependenceAdjudicatedByThisGate === false &&
    i218.derivativeLineageAdjudicatedByThisGate === false &&
    i218.evidenceRebindingAuthorizedByThisGate === false &&
    i218.candidateSetMutatedByThisGate === false &&
    i218.candidateSetReevaluationAuthorizedByThisGate === false &&
    i218.currentV2PackageAndCandidateSetRemainImmutable &&
    i218.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i218.actualCompositionPerformedByThisGate === false &&
    i218.multiSourceCompositionAuthorized === false &&
    i218.thresholdRuleCreatedByThisGate === false &&
    i218.damageEvaluationAuthorized === false &&
    i218.classificationAuthorized === false &&
    i218.numericScoringAuthorized === false &&
    i218.productionPolicyExecutionAuthorized === false &&
    i218.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<
    I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport,
    'evidenceId'
  >,
): I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport {
  return {
    evidenceId: `i219_hidden_stem_single_source_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
  i218: I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport,
): I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport {
  const accepted = exactI218Accepted(i218);
  return finalized({
    evidenceVersion:
      I219_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE'
      : 'I218_DISCOVERY_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_ONE_DIRECT_HTML_SINGLE_SOURCE_CANDIDATE_TWO_LEADS_ALL_THREE_DIRECTIONAL_SIGNALS_OBSERVED_IN_DIRECT_HTML_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED'
      : 'SINGLE_SOURCE_HIDDEN_STEM_AUTHORITY_DISCOVERY_EVIDENCE_NOT_EXECUTED',
    upstreamI218ReviewId: i218.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI218BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    discoveryExecuted: accepted,
    executedDiscoveryPathCount: accepted ? 5 : 0,
    candidateEvidenceRecords: accepted ? CANDIDATE_RECORDS : Object.freeze([]),
    candidateEvidenceRecordCount: accepted ? 3 : 0,
    qualifyingDirectHtmlCandidateCount: accepted ? 1 : 0,
    leadOnlyCandidateCount: accepted ? 2 : 0,
    materiallyNewSingleSourceCandidateObserved: accepted,
    directHtmlCandidateHasAllThreeDirectionalSignals: accepted,
    directHtmlCandidateHasActivationExceptionSignals: accepted,
    directHtmlCandidateHasSemanticSeparationSignals: accepted,
    directHtmlCandidateHasReproduciblePublishedContext: accepted,
    exactDoctrinalAuthorshipOrLineageResolvedByThisGate: false,
    originalPrintEditionIdentityResolvedByThisGate: false,
    sevenRequirementCoverageAdjudicatedByThisGate: false,
    sevenRequirementAuthorityContractSatisfiedByThisGate: false,
    sourceClassOrAgeAutoAcceptancePerformed: false,
    crossCandidateCompositionPerformed: false,
    currentCandidateEvidenceUsedToBackfillNewCandidate: false,
    searchSnippetUsedAsAuthority: false,
    modelSynthesisUsedAsAuthority: false,
    generalKnowledgeUsedAsAuthority: false,
    empiricalCalibrationUsedToCreateAuthority: false,
    failedPdfVisualAccessCreatesNegativeFinding: false,
    failedMirrorOpenCreatesNegativeFinding: false,
    discoverySilenceCreatesExhaustionFinding: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'A materially stronger direct HTML single-source candidate was acquired: the Sohu article contains candidate-local signals for all three directional interaction scopes plus activation/exception and semantic-layer boundaries.',
          'I219 deliberately does not adjudicate seven-requirement sufficiency. Published HTML identity is reproducible, while doctrinal authorship/lineage and canonical print-edition identity remain unadjudicated.',
          'The Li Hongcheng PDF and Aqioo mirror remain lead-only because their available contexts did not satisfy the I212/I218 direct-context standard during this gate.',
          'No existing candidate evidence is used to backfill the new Sohu candidate, and no authority is promoted, registered, selected, rebound, composed, scored, classified, or executed in production.',
        ])
      : Object.freeze(['I219 fails closed unless the exact I218 discovery-readiness boundary is preserved.']),
  });
}
