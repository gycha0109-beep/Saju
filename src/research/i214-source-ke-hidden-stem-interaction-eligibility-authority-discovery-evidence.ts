import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport } from './i213-source-ke-hidden-stem-interaction-eligibility-authority-discovery-readiness-review.js';

export const I214_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-authority-discovery-evidence-v1';

export const I214_CANDIDATE_EVIDENCE_IDS = Object.freeze([
  'CHEN_YUAN_SIZHU_YUCE_XUE_RUMEN_1995_TRANSCRIPTION',
  'ZHANG_NAN_SHENFENG_TONGKAO_TIANYUANFU_TRANSCRIPTION',
  'LI_HANCHEN_BAZI_YUCE_ZHENZONG_2003_REPRESENTATION',
] as const);
export type I214CandidateEvidenceId = (typeof I214_CANDIDATE_EVIDENCE_IDS)[number];

export type I214ObservedScope =
  | 'VISIBLE_TO_HIDDEN'
  | 'HIDDEN_TO_VISIBLE'
  | 'HIDDEN_TO_HIDDEN'
  | 'RESTRICTIVE_HIDDEN_STEM_EXCLUSION';

export interface I214CandidateEvidenceRecord {
  candidateEvidenceId: I214CandidateEvidenceId;
  author: string;
  title: string;
  bibliographicIdentityLocator: string;
  directTextLocators: readonly string[];
  sourceIdentityBound: boolean;
  reproducibleDirectTextLocator: boolean;
  transcriptionOrRepresentationContextBound: boolean;
  directTextToSpecificPrintEditionCanonicallyBound: boolean;
  snippetOnly: false;
  observedScopes: readonly I214ObservedScope[];
  directEffectiveInteractionLanguageObserved: boolean;
  hiddenStemMembershipOnly: boolean;
  contextConditionObserved: boolean;
  contextConditionSummary: string;
  doctrinalPosition:
    | 'CONTEXTUAL_POSITIVE_HIDDEN_STEM_INTERACTION'
    | 'DIRECT_VISIBLE_TO_HIDDEN_INTERACTION'
    | 'RESTRICTIVE_HIDDEN_STEM_NON_USE';
  eligibleForLaterCoverageEvaluation: boolean;
  requirementCoverageAdjudicated: false;
  authorityPromoted: false;
  candidateRegistered: false;
  candidateSelected: false;
  notes: readonly string[];
}

export interface I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'I213_DISCOVERY_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FOUR_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_TWO_POSITIVE_DIRECTIONAL_SIGNALS_ONE_RESTRICTIVE_CONFLICT_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED'
    | 'HIDDEN_STEM_AUTHORITY_DISCOVERY_EVIDENCE_NOT_EXECUTED';
  upstreamI213ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI213BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  discoveryExecuted: boolean;
  executedDiscoveryPathCount: 4 | 0;
  candidateEvidenceRecords: readonly I214CandidateEvidenceRecord[];
  candidateEvidenceRecordCount: 3 | 0;
  qualifyingForLaterCoverageEvaluationCount: 3 | 0;
  positiveDirectionalSignalCount: 2 | 0;
  restrictiveConflictSignalCount: 1 | 0;
  visibleToHiddenDirectSignalObserved: boolean;
  hiddenToVisibleDirectSignalObserved: false;
  hiddenToHiddenContextualDirectSignalObserved: boolean;
  restrictiveNonUseDoctrineObserved: boolean;
  doctrinalConflictPresent: boolean;
  doctrinalConflictResolvedByThisGate: false;
  sourceClassAutoAcceptancePerformed: false;
  crossCandidateCompositionPerformed: false;
  requirementCoverageAdjudicatedByThisGate: false;
  sevenRequirementAuthorityContractSatisfiedByThisGate: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  existingMembershipEvidencePromotedToEligibility: false;
  visibleStemRuleBackfilledIntoHiddenStemEligibility: false;
  searchSnippetUsedAsAuthority: false;
  modelSynthesisUsedAsAuthority: false;
  generalKnowledgeUsedAsAuthority: false;
  empiricalCalibrationUsedToCreateAuthority: false;
  noHiddenToVisibleCandidateFoundCreatesNegativeFinding: false;
  discoverySilenceCreatesExhaustionFinding: false;
  corpusExhaustionClaimed: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const CANDIDATE_RECORDS: readonly I214CandidateEvidenceRecord[] = Object.freeze([
  Object.freeze({
    candidateEvidenceId: 'CHEN_YUAN_SIZHU_YUCE_XUE_RUMEN_1995_TRANSCRIPTION',
    author: '陈园',
    title: '《邵伟华四柱预测学入门》',
    bibliographicIdentityLocator:
      'https://books.google.com/books/about/%E9%82%B5%E4%BC%9F%E5%8D%8E%E5%9B%9B%E6%9F%B1%E9%A2%84%E6%B5%8B%E5%AD%A6%E5%85%A5%E9%97%A8.html?id=17JL5BHO_NwC',
    directTextLocators: Object.freeze([
      'https://www.8bei8.com/book/sizhuyucexuerumen_18.html',
      'https://www.8bei8.com/book/sizhuyucexuerumen_22.html',
      'https://www.8bei8.com/book/sizhuyucexuerumen_34.html',
    ]),
    sourceIdentityBound: true,
    reproducibleDirectTextLocator: true,
    transcriptionOrRepresentationContextBound: true,
    directTextToSpecificPrintEditionCanonicallyBound: false,
    snippetOnly: false,
    observedScopes: Object.freeze(['HIDDEN_TO_HIDDEN'] as const),
    directEffectiveInteractionLanguageObserved: true,
    hiddenStemMembershipOnly: false,
    contextConditionObserved: true,
    contextConditionSummary:
      'In the branch-clash discussion, middle/remaining hidden stems inside 辰戌 and 丑未 are directed to be evaluated separately by generating/overcoming relations; exposure/hidden ordering is separately distinguished elsewhere in the same transcription.',
    doctrinalPosition: 'CONTEXTUAL_POSITIVE_HIDDEN_STEM_INTERACTION',
    eligibleForLaterCoverageEvaluation: true,
    requirementCoverageAdjudicated: false,
    authorityPromoted: false,
    candidateRegistered: false,
    candidateSelected: false,
    notes: Object.freeze([
      'Google Books independently binds the title to 陈园, 广州出版社, 1995, 244 pages, ISBN 9787805922515.',
      'The online transcription has stable title/page locators, but I214 does not claim canonical page-by-page identity with the specific 1995 print witness.',
      'Ten-God relation language involving hidden stems is not promoted to effective-interaction eligibility; only the explicit clash-context instruction is retained as the direct hidden-to-hidden signal.',
    ]),
  }),
  Object.freeze({
    candidateEvidenceId: 'ZHANG_NAN_SHENFENG_TONGKAO_TIANYUANFU_TRANSCRIPTION',
    author: '张楠',
    title: '《神峰通考》卷六·一行禅师《天元赋》附注',
    bibliographicIdentityLocator: 'https://www.8bei8.com/book/shenfengtongkao.html',
    directTextLocators: Object.freeze([
      'https://www.8bei8.com/book/shenfengtongkao_100.html',
      'https://ctext.org/wiki.pl?chapter=109247&if=en&remap=gb',
    ]),
    sourceIdentityBound: true,
    reproducibleDirectTextLocator: true,
    transcriptionOrRepresentationContextBound: true,
    directTextToSpecificPrintEditionCanonicallyBound: false,
    snippetOnly: false,
    observedScopes: Object.freeze(['VISIBLE_TO_HIDDEN'] as const),
    directEffectiveInteractionLanguageObserved: true,
    hiddenStemMembershipOnly: false,
    contextConditionObserved: true,
    contextConditionSummary:
      'The annotated example treats a visible 己土 occurring in year/day/hour as overcoming the 癸水 hidden in 子 when the earth is strong, with the hidden auspicious component described as harmed.',
    doctrinalPosition: 'DIRECT_VISIBLE_TO_HIDDEN_INTERACTION',
    eligibleForLaterCoverageEvaluation: true,
    requirementCoverageAdjudicated: false,
    authorityPromoted: false,
    candidateRegistered: false,
    candidateSelected: false,
    notes: Object.freeze([
      'Two independent stable transcriptions expose the same target passage, including the explicit hidden-stem identification and the visible-to-hidden overcoming example.',
      'The passage provides a strength/context qualifier, but I214 does not generalize it into a universal position or threshold rule.',
    ]),
  }),
  Object.freeze({
    candidateEvidenceId: 'LI_HANCHEN_BAZI_YUCE_ZHENZONG_2003_REPRESENTATION',
    author: '李涵辰',
    title: '《八字预测真踪》',
    bibliographicIdentityLocator:
      'https://www.scribd.com/document/938380284/%E6%96%B0%E6%B4%BE%E5%91%BD%E7%90%86-%E6%9D%8E%E6%B6%B5%E8%BE%B0-%E5%85%AB%E5%AD%97%E9%A2%84%E6%B5%8B%E7%9C%9F%E8%B8%AA-%E4%BA%8E%E5%A4%A7%E6%9C%89%E6%8F%90%E4%BE%9B',
    directTextLocators: Object.freeze([
      'https://m.guoxuedashi.com/a/22337wzuc/281431r.html',
      'https://www.scribd.com/document/1013295006/%E5%85%AB%E5%AD%97%E9%A2%84%E6%B5%8B%E7%9C%9F%E8%B8%AA',
    ]),
    sourceIdentityBound: true,
    reproducibleDirectTextLocator: true,
    transcriptionOrRepresentationContextBound: true,
    directTextToSpecificPrintEditionCanonicallyBound: false,
    snippetOnly: false,
    observedScopes: Object.freeze(['RESTRICTIVE_HIDDEN_STEM_EXCLUSION'] as const),
    directEffectiveInteractionLanguageObserved: false,
    hiddenStemMembershipOnly: false,
    contextConditionObserved: true,
    contextConditionSummary:
      'This source explicitly advances a competing methodology that generally evaluates branches by their principal qi rather than subdividing hidden stems, while retaining limited store/season-adjustment exceptions.',
    doctrinalPosition: 'RESTRICTIVE_HIDDEN_STEM_NON_USE',
    eligibleForLaterCoverageEvaluation: true,
    requirementCoverageAdjudicated: false,
    authorityPromoted: false,
    candidateRegistered: false,
    candidateSelected: false,
    notes: Object.freeze([
      'A direct book representation identifies 李涵辰 and includes 2003 first-edition/first-print metadata; a separate chapter transcription preserves the hidden-stem non-use passage.',
      'This conflicts methodologically with positive hidden-stem interaction sources and therefore blocks silent cross-school composition rather than supplying a universal negative rule.',
    ]),
  }),
]);

function exactI213Accepted(i213: I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport): boolean {
  return (
    i213.status === 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW' &&
    i213.decision ===
      'SEVEN_REQUIREMENT_HIDDEN_STEM_AUTHORITY_DISCOVERY_CONTRACT_FROZEN_FOUR_PATHS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED' &&
    i213.exactI212BoundaryAccepted &&
    i213.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i213.requirementCount === 7 &&
    i213.requirementsFrozen &&
    i213.discoveryPathCount === 4 &&
    i213.discoveryPathsFrozen &&
    i213.discoveryControlCount === 14 &&
    i213.discoveryControlsFrozen &&
    i213.existingNormalizedSourceDeepReinspectionAllowed &&
    i213.existingSourceAutoAcceptanceAllowed === false &&
    i213.newNormativeSourceDiscoveryAllowed &&
    i213.sourceClassAloneMayEstablishAuthority === false &&
    i213.partialRequirementEvidenceMayBeRecordedAtDiscovery &&
    i213.partialEvidenceCountsAsRequirementSatisfiedByDiscovery === false &&
    i213.crossCandidateCompositionAuthorized === false &&
    i213.hiddenStemMembershipCountsAsEligibility === false &&
    i213.visibleStemRuleBackfillAuthorized === false &&
    i213.discoveryAuthorized &&
    i213.discoveryExecutedByThisGate === false &&
    i213.authorityAcquiredByThisGate === false &&
    i213.requirementCoverageEvaluatedByThisGate === false &&
    i213.quWei2001HoldPreserved &&
    i213.li1998SameTargetPathSuspendedNotRetired &&
    i213.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i213.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i213.provenanceIndependenceAdjudicatedByThisGate === false &&
    i213.evidenceRebindingAuthorizedByThisGate === false &&
    i213.currentV2PackageAndCandidateSetRemainImmutable &&
    i213.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i213.actualCompositionPerformedByThisGate === false &&
    i213.multiSourceCompositionAuthorized === false &&
    i213.thresholdRuleCreatedByThisGate === false &&
    i213.damageEvaluationAuthorized === false &&
    i213.classificationAuthorized === false &&
    i213.numericScoringAuthorized === false &&
    i213.productionPolicyExecutionAuthorized === false &&
    i213.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport, 'evidenceId'>,
): I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport {
  return {
    evidenceId: `i214_hidden_stem_ke_discovery_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(
  i213: I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport,
): I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport {
  const accepted = exactI213Accepted(i213);
  return finalized({
    evidenceVersion: I214_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE'
      : 'I213_DISCOVERY_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_TWO_POSITIVE_DIRECTIONAL_SIGNALS_ONE_RESTRICTIVE_CONFLICT_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED'
      : 'HIDDEN_STEM_AUTHORITY_DISCOVERY_EVIDENCE_NOT_EXECUTED',
    upstreamI213ReviewId: i213.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI213BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    discoveryExecuted: accepted,
    executedDiscoveryPathCount: accepted ? 4 : 0,
    candidateEvidenceRecords: accepted ? CANDIDATE_RECORDS : Object.freeze([]),
    candidateEvidenceRecordCount: accepted ? 3 : 0,
    qualifyingForLaterCoverageEvaluationCount: accepted ? 3 : 0,
    positiveDirectionalSignalCount: accepted ? 2 : 0,
    restrictiveConflictSignalCount: accepted ? 1 : 0,
    visibleToHiddenDirectSignalObserved: accepted,
    hiddenToVisibleDirectSignalObserved: false,
    hiddenToHiddenContextualDirectSignalObserved: accepted,
    restrictiveNonUseDoctrineObserved: accepted,
    doctrinalConflictPresent: accepted,
    doctrinalConflictResolvedByThisGate: false,
    sourceClassAutoAcceptancePerformed: false,
    crossCandidateCompositionPerformed: false,
    requirementCoverageAdjudicatedByThisGate: false,
    sevenRequirementAuthorityContractSatisfiedByThisGate: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    existingMembershipEvidencePromotedToEligibility: false,
    visibleStemRuleBackfilledIntoHiddenStemEligibility: false,
    searchSnippetUsedAsAuthority: false,
    modelSynthesisUsedAsAuthority: false,
    generalKnowledgeUsedAsAuthority: false,
    empiricalCalibrationUsedToCreateAuthority: false,
    noHiddenToVisibleCandidateFoundCreatesNegativeFinding: false,
    discoverySilenceCreatesExhaustionFinding: false,
    corpusExhaustionClaimed: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I214 executed all four bounded discovery paths and found materially relevant direct-text evidence, but did not promote any source to authority.',
          '陈园 provides a direct hidden-to-hidden interaction signal only in a bounded branch-clash context; it is not generalized beyond that context.',
          '《神峰通考》 provides a direct visible-to-hidden overcoming example with a strength qualifier; it is not generalized into a universal threshold or adjacency rule.',
          '李涵辰 provides a materially conflicting restrictive doctrine that generally declines to subdivide hidden stems. The conflict must be assessed explicitly before any normative composition.',
          'No comparably direct hidden-to-visible effective-interaction candidate was established in this discovery pass. That absence is not a negative or exhaustion finding.',
        ])
      : Object.freeze(['I214 fails closed unless the exact I213 discovery-readiness boundary is preserved.']),
  });
}
