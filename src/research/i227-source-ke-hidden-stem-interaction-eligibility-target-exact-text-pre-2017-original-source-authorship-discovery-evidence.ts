import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I226_RARE_TARGET_PHRASES,
  I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS,
  type I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport,
  type I226TargetExactTextDiscoveryPathId,
} from './i226-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-readiness-review.js';

export const I227_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-evidence-v1';

export type I227TargetOriginDiscoveryDisposition =
  | 'NO_QUALIFYING_PRE_2017_EXACT_WITNESS_ESTABLISHED_IN_PASS'
  | 'TARGET_PART1_OR_UPSTREAM_ATTRIBUTION_NOT_BOUND_IN_PASS'
  | 'PRE_2017_ALTERNATE_LINEAGE_DIRECT_NO_EXACT_TARGET_BINDING'
  | 'NAMED_LINEAGE_LEADS_UNBOUND_TO_EXACT_TARGET'
  | 'LATER_EXACT_REDISTRIBUTION_CONFIRMED_NO_PRIOR_DEPENDENCY_BOUND';

export interface I227TargetOriginDiscoveryEvidenceRecord {
  pathId: I226TargetExactTextDiscoveryPathId;
  disposition: I227TargetOriginDiscoveryDisposition;
  directOrSourceBoundEvidenceAvailable: boolean;
  searchLeadAvailable: boolean;
  directOrSourceBoundLocators: readonly string[];
  leadOnlyLocators: readonly string[];
  finding: string;
  establishesPre2017ExactTargetWitness: false;
  establishesPre2017ExactTargetWitnessNonexistence: false;
  establishesTargetOriginalAuthorship: false;
  establishesTargetDoctrinalLineage: false;
  establishesTargetPriorSourceDependency: false;
  adjudicatesDerivativeRelationship: false;
  createsNegativeOrCorpusExhaustionFinding: false;
}

export interface I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE'
    | 'I226_TARGET_ORIGIN_DISCOVERY_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FIVE_TARGET_SPECIFIC_ORIGIN_PATHS_EXECUTED_NO_DIRECT_PRE_2017_EXACT_TARGET_WITNESS_ESTABLISHED_ONE_PRE_2017_ALTERNATE_LINEAGE_CONTRAST_DIRECTLY_VERIFIED_LATER_EXACT_TEXT_REDISTRIBUTION_CONFIRMED_PART1_AND_TARGET_ORIGIN_ATTRIBUTION_UNRESOLVED_NO_NEGATIVE_EXHAUSTION_FINDING_NO_AUTHORSHIP_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION'
    | 'TARGET_SPECIFIC_ORIGIN_DISCOVERY_EVIDENCE_NOT_EXECUTED';
  upstreamI226ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI226BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' | null;
  targetPublicationDate: '2017-02-02' | null;
  targetPublicationLocator: 'https://m.sohu.com/n/479788391/?wscrid=95360_8' | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationPerformedByThisGate: false;
  discoveryExecuted: boolean;
  executedDiscoveryPathCount: 5 | 0;
  evidenceRecords: readonly I227TargetOriginDiscoveryEvidenceRecord[];
  evidenceRecordCount: 5 | 0;
  rareTargetPhrasesAcceptedFromI226: readonly string[];
  rareTargetPhraseCount: 4 | 0;
  exactRarePhraseSearchExecuted: boolean;
  targetBaselineExactPhrasesDirectlyBoundTo2017Publication: boolean;
  pre2017ExactTargetWitnessEstablished: false;
  pre2017ExactTargetWitnessNonexistenceEstablished: false;
  discoverySilenceCreatesNegativeFinding: false;
  corpusExhaustionClaimed: false;
  sohuTargetPart1OrUpstreamAttributionDirectlyBound: false;
  sohuTargetPart1NonexistenceEstablished: false;
  pre2017AlternateLineageContrastDirectlyVerified: boolean;
  pre2017AlternateLineageLocator: 'https://xm.yi958.com/gsqm/5246' | null;
  pre2017AlternateLineagePublicationDate: '2016-05-18' | null;
  pre2017AlternateLineageNamedTransmission: '邱平策_TO_法能' | null;
  alternateLineageExactTargetPhraseBindingEstablished: false;
  alternateLineageMayBackfillTargetLineage: false;
  laterExactTextRedistributionDirectlyConfirmed: boolean;
  laterExactTextDirectWitnessLocator: 'https://www.sohu.com/a/406500779_120756849' | null;
  laterExactTextDirectWitnessDate: '2020-07-08' | null;
  laterRedistributionLeadLocators: readonly string[];
  laterMirrorMayEstablishPriorDependency: false;
  namedLineageExactTargetBindingEstablished: false;
  exactTargetOriginalAuthorshipEstablishedByThisGate: false;
  exactTargetDoctrinalLineageEstablishedByThisGate: false;
  exactTargetPriorSourceDependencyEstablishedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  restrictiveDoctrineConflictAdjudicatedByThisGate: false;
  restrictiveDoctrineSchoolBoundaryEstablishedByThisGate: false;
  unresolvedAdmissibilityGapCount: 4 | 0;
  authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  searchSnippetUsedAsPositivePredecessorEvidence: false;
  adjacentTheoryUsedAsTargetPredecessorEvidence: false;
  accountNameUsedAsOriginalAuthorshipEvidence: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const TARGET_LOCATOR = 'https://m.sohu.com/n/479788391/?wscrid=95360_8' as const;
const PRE_2017_ALTERNATE_LINEAGE_LOCATOR = 'https://xm.yi958.com/gsqm/5246' as const;
const LATER_EXACT_DIRECT_LOCATOR = 'https://www.sohu.com/a/406500779_120756849' as const;
const LATER_REDISTRIBUTION_LEADS = Object.freeze([
  'https://chinaqigong.com/article-493-1.html',
  'https://www.aqioo.com/bazisuanming/tiangandizhi/165853.html',
] as const);

const EVIDENCE_RECORDS: readonly I227TargetOriginDiscoveryEvidenceRecord[] = Object.freeze([
  Object.freeze({
    pathId: 'EXACT_RARE_TARGET_PHRASE_PRE_2017_SEARCH',
    disposition: 'NO_QUALIFYING_PRE_2017_EXACT_WITNESS_ESTABLISHED_IN_PASS',
    directOrSourceBoundEvidenceAvailable: true,
    searchLeadAvailable: true,
    directOrSourceBoundLocators: Object.freeze([TARGET_LOCATOR, LATER_EXACT_DIRECT_LOCATOR]),
    leadOnlyLocators: LATER_REDISTRIBUTION_LEADS,
    finding:
      'The four I226 rare phrases are directly bound to the dated 2017 Sohu target and recur in later redistribution witnesses. This pass did not establish a directly verified pre-2017 witness carrying the exact target phrases; discovery silence is not evidence that no such witness exists.',
    establishesPre2017ExactTargetWitness: false,
    establishesPre2017ExactTargetWitnessNonexistence: false,
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
  Object.freeze({
    pathId: 'SOHU_TARGET_PART1_ARCHIVE_AND_OUTBOUND_ATTRIBUTION_TRACE',
    disposition: 'TARGET_PART1_OR_UPSTREAM_ATTRIBUTION_NOT_BOUND_IN_PASS',
    directOrSourceBoundEvidenceAvailable: true,
    searchLeadAvailable: true,
    directOrSourceBoundLocators: Object.freeze([TARGET_LOCATOR]),
    leadOnlyLocators: Object.freeze(['https://mt.sohu.com/20160829/n466534112.shtml']),
    finding:
      'The Part 2 target remains directly bound to its Sohu publication object. This pass did not directly bind a Part 1 page or an upstream attribution for the exact target text. Same-account third-party republication behavior remains caution evidence only and does not identify the target origin.',
    establishesPre2017ExactTargetWitness: false,
    establishesPre2017ExactTargetWitnessNonexistence: false,
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
  Object.freeze({
    pathId: 'PRE_2017_BOOK_OR_COURSE_MATERIAL_EXACT_PASSAGE_MATCH',
    disposition: 'PRE_2017_ALTERNATE_LINEAGE_DIRECT_NO_EXACT_TARGET_BINDING',
    directOrSourceBoundEvidenceAvailable: true,
    searchLeadAvailable: true,
    directOrSourceBoundLocators: Object.freeze([PRE_2017_ALTERNATE_LINEAGE_LOCATOR]),
    leadOnlyLocators: Object.freeze([]),
    finding:
      'A directly opened 2016-05-18 hidden-stem methodology page names a 邱平策-to-法能 transmission and discusses hidden-stem operation, but it does not bind the I226 rare target phrases or the exact target passage. It is an alternate-lineage contrast witness only and may not backfill the target lineage.',
    establishesPre2017ExactTargetWitness: false,
    establishesPre2017ExactTargetWitnessNonexistence: false,
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
  Object.freeze({
    pathId: 'NAMED_LINEAGE_CANDIDATE_EXACT_PASSAGE_BINDING',
    disposition: 'NAMED_LINEAGE_LEADS_UNBOUND_TO_EXACT_TARGET',
    directOrSourceBoundEvidenceAvailable: false,
    searchLeadAvailable: true,
    directOrSourceBoundLocators: Object.freeze([]),
    leadOnlyLocators: Object.freeze([
      'https://mt.sohu.com/20160829/n466534112.shtml',
      'https://mt.sohu.com/20161014/n470281736.shtml',
    ]),
    finding:
      'Named-author and practitioner-lineage leads observed in the surrounding corpus were not directly bound to the exact target passage or an explicit target attribution. Name overlap and adjacent theory therefore remain insufficient for target lineage or authorship.',
    establishesPre2017ExactTargetWitness: false,
    establishesPre2017ExactTargetWitnessNonexistence: false,
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
  Object.freeze({
    pathId: 'DATE_VERIFIED_EARLY_REPUBLICATION_OR_ARCHIVE_TRACE',
    disposition: 'LATER_EXACT_REDISTRIBUTION_CONFIRMED_NO_PRIOR_DEPENDENCY_BOUND',
    directOrSourceBoundEvidenceAvailable: true,
    searchLeadAvailable: true,
    directOrSourceBoundLocators: Object.freeze([LATER_EXACT_DIRECT_LOCATOR]),
    leadOnlyLocators: LATER_REDISTRIBUTION_LEADS,
    finding:
      'A directly verified 2020-07-08 Sohu publication reproduces the rare target phrases, while 2021 indexed redistribution surfaces preserve the same text family. These are post-target redistribution evidence and cannot establish a pre-2017 source dependency or derivative direction.',
    establishesPre2017ExactTargetWitness: false,
    establishesPre2017ExactTargetWitnessNonexistence: false,
    establishesTargetOriginalAuthorship: false,
    establishesTargetDoctrinalLineage: false,
    establishesTargetPriorSourceDependency: false,
    adjudicatesDerivativeRelationship: false,
    createsNegativeOrCorpusExhaustionFinding: false,
  }),
]);

function exactI226Accepted(
  i226: I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport,
): boolean {
  return (
    i226.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW' &&
    i226.decision ===
      'TARGET_SPECIFIC_PRE_2017_ORIGIN_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SEVENTEEN_CONTROLS_FOUR_RARE_PHRASES_NO_DISCOVERY_EXECUTED_NO_AUTHORSHIP_LINEAGE_OR_DERIVATIVE_ADJUDICATION_NO_PROMOTION' &&
    i226.exactI225BoundaryAccepted &&
    i226.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i226.targetPublicationDate === '2017-02-02' &&
    i226.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i226.coverageReevaluationAuthorizedByThisGate === false &&
    i226.discoveryPathCount === 5 &&
    i226.discoveryPathIds.length === 5 &&
    i226.discoveryPathIds.every((pathId, index) => pathId === I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS[index]) &&
    i226.discoveryControlCount === 17 &&
    i226.discoveryControlsFrozen &&
    i226.rareTargetPhraseCount === 4 &&
    i226.rareTargetPhrases.length === 4 &&
    i226.rareTargetPhrases.every((phrase, index) => phrase === I226_RARE_TARGET_PHRASES[index]) &&
    i226.targetSpecificDiscoveryAuthorized &&
    i226.targetSpecificDiscoveryExecutedByThisGate === false &&
    i226.exactRarePhrasePre2017SearchRequired &&
    i226.sohuPart1ArchiveAttributionTraceRequired &&
    i226.pre2017BookOrCourseExactPassageMatchRequired &&
    i226.namedLineageExactPassageBindingRequired &&
    i226.dateVerifiedEarlyRepublicationTraceRequired &&
    i226.directlyOpenedOrSourceBoundContextRequiredForPositivePredecessorFinding &&
    i226.adjacentTheoryMayEstablishTargetPredecessor === false &&
    i226.authorNameMatchMayEstablishTargetLineage === false &&
    i226.laterMirrorMayEstablishPriorDependency === false &&
    i226.sohuAccountMayEstablishOriginalAuthorship === false &&
    i226.alternatePositiveLineageMayBackfillTargetLineage === false &&
    i226.searchSnippetMayEstablishPositivePredecessorFinding === false &&
    i226.discoverySilenceCreatesNegativeFinding === false &&
    i226.corpusExhaustionClaimed === false &&
    i226.exactTargetOriginalAuthorshipEstablishedByThisGate === false &&
    i226.exactTargetDoctrinalLineageEstablishedByThisGate === false &&
    i226.exactTargetPriorSourceDependencyEstablishedByThisGate === false &&
    i226.derivativeRelationshipAdjudicatedByThisGate === false &&
    i226.restrictiveDoctrineConflictAdjudicatedByThisGate === false &&
    i226.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i226.authorityGapClosed === false &&
    i226.authorityPromotedByThisGate === false &&
    i226.doctrinalConflictPreserved &&
    i226.doctrinalConflictResolvedByThisGate === false &&
    i226.quWei2001HoldPreserved &&
    i226.li1998SameTargetPathSuspendedNotRetired &&
    i226.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i226.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i226.provenanceIndependenceAdjudicatedByThisGate === false &&
    i226.evidenceRebindingAuthorizedByThisGate === false &&
    i226.candidateSetMutatedByThisGate === false &&
    i226.candidateSetReevaluationAuthorizedByThisGate === false &&
    i226.currentV2PackageAndCandidateSetRemainImmutable &&
    i226.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i226.actualCompositionPerformedByThisGate === false &&
    i226.multiSourceCompositionAuthorized === false &&
    i226.thresholdRuleCreatedByThisGate === false &&
    i226.damageEvaluationAuthorized === false &&
    i226.classificationAuthorized === false &&
    i226.numericScoringAuthorized === false &&
    i226.productionPolicyExecutionAuthorized === false &&
    i226.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<
    I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport,
    'evidenceId'
  >,
): I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport {
  return {
    evidenceId: `i227_hidden_stem_target_origin_discovery_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidence(
  i226: I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport,
): I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport {
  const accepted = exactI226Accepted(i226);
  return finalized({
    evidenceVersion:
      I227_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE'
      : 'I226_TARGET_ORIGIN_DISCOVERY_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FIVE_TARGET_SPECIFIC_ORIGIN_PATHS_EXECUTED_NO_DIRECT_PRE_2017_EXACT_TARGET_WITNESS_ESTABLISHED_ONE_PRE_2017_ALTERNATE_LINEAGE_CONTRAST_DIRECTLY_VERIFIED_LATER_EXACT_TEXT_REDISTRIBUTION_CONFIRMED_PART1_AND_TARGET_ORIGIN_ATTRIBUTION_UNRESOLVED_NO_NEGATIVE_EXHAUSTION_FINDING_NO_AUTHORSHIP_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION'
      : 'TARGET_SPECIFIC_ORIGIN_DISCOVERY_EVIDENCE_NOT_EXECUTED',
    upstreamI226ReviewId: i226.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI226BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    targetPublicationDate: accepted ? '2017-02-02' : null,
    targetPublicationLocator: accepted ? TARGET_LOCATOR : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationPerformedByThisGate: false,
    discoveryExecuted: accepted,
    executedDiscoveryPathCount: accepted ? 5 : 0,
    evidenceRecords: accepted ? EVIDENCE_RECORDS : [],
    evidenceRecordCount: accepted ? 5 : 0,
    rareTargetPhrasesAcceptedFromI226: accepted ? I226_RARE_TARGET_PHRASES : [],
    rareTargetPhraseCount: accepted ? 4 : 0,
    exactRarePhraseSearchExecuted: accepted,
    targetBaselineExactPhrasesDirectlyBoundTo2017Publication: accepted,
    pre2017ExactTargetWitnessEstablished: false,
    pre2017ExactTargetWitnessNonexistenceEstablished: false,
    discoverySilenceCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    sohuTargetPart1OrUpstreamAttributionDirectlyBound: false,
    sohuTargetPart1NonexistenceEstablished: false,
    pre2017AlternateLineageContrastDirectlyVerified: accepted,
    pre2017AlternateLineageLocator: accepted ? PRE_2017_ALTERNATE_LINEAGE_LOCATOR : null,
    pre2017AlternateLineagePublicationDate: accepted ? '2016-05-18' : null,
    pre2017AlternateLineageNamedTransmission: accepted ? '邱平策_TO_法能' : null,
    alternateLineageExactTargetPhraseBindingEstablished: false,
    alternateLineageMayBackfillTargetLineage: false,
    laterExactTextRedistributionDirectlyConfirmed: accepted,
    laterExactTextDirectWitnessLocator: accepted ? LATER_EXACT_DIRECT_LOCATOR : null,
    laterExactTextDirectWitnessDate: accepted ? '2020-07-08' : null,
    laterRedistributionLeadLocators: accepted ? LATER_REDISTRIBUTION_LEADS : [],
    laterMirrorMayEstablishPriorDependency: false,
    namedLineageExactTargetBindingEstablished: false,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    restrictiveDoctrineSchoolBoundaryEstablishedByThisGate: false,
    unresolvedAdmissibilityGapCount: accepted ? 4 : 0,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    searchSnippetUsedAsPositivePredecessorEvidence: false,
    adjacentTheoryUsedAsTargetPredecessorEvidence: false,
    accountNameUsedAsOriginalAuthorshipEvidence: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I227 executes only the five I226 target-specific origin-discovery paths.',
          'Failure to establish a pre-2017 exact target witness in this pass is not a nonexistence or exhaustion finding.',
          'The 2016 邱平策-to-法能 material is a direct pre-target alternate-lineage contrast witness, not a target predecessor or backfill source.',
          'The dated 2020 exact-text witness and 2021 redistribution leads confirm later circulation only; derivative direction remains unadjudicated.',
          'Target authorship, doctrinal lineage, prior-source dependency, restrictive-school boundary, normative admissibility and authority promotion remain unresolved.',
        ])
      : Object.freeze(['I226 target-origin discovery readiness boundary was not accepted; no discovery evidence was materialized.']),
  });
}
