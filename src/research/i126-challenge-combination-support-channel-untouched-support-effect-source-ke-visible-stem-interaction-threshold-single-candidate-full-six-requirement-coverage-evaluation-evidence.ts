import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I118ThresholdAuthorityRequirementId } from './i118-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-authority-gap-requirements-review.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryEvidenceReport,
  I125RequirementLocatorObservation,
} from './i125-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-single-candidate-full-six-rediscovery-evidence.js';

export const I126_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-single-candidate-full-six-requirement-coverage-evaluation-evidence-v1';

export type I126ThresholdRequirementCoverageState =
  | 'SUPPORTED_BY_REGISTERED_EVIDENCE'
  | 'PARTIAL_SCOPED_SUPPORT_ONLY'
  | 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE';

export interface I126ThresholdRequirementCoverageEvidence {
  requirementId: I118ThresholdAuthorityRequirementId;
  coverageState: I126ThresholdRequirementCoverageState;
  evidenceLocator: string;
  sourceAnchor: string;
  evidenceBasis: readonly string[];
  limitingReason: string;
  countsAsSatisfiedForThresholdAuthorityCoverage: boolean;
  sameRegisteredCandidateOnly: true;
  priorCandidateCoverageBorrowed: false;
  crossCandidateCompositionMaySubstitute: false;
  modelSynthesisMaySubstitute: false;
  numericCalibrationMaySubstitute: false;
  workedExampleMayBeGeneralizedBeyondSourceScope: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE'
    | 'I125_UNRESOLVED_OR_INVALID';
  decision:
    | 'WU_HUAIYUN_CANDIDATE_SATISFIES_FOUR_OF_SIX_I118_REQUIREMENTS_TWO_PARTIAL_GAPS_REMAIN_NO_THRESHOLD_AUTHORITY'
    | 'VISIBLE_STEM_THRESHOLD_FULL_SIX_REQUIREMENT_COVERAGE_NOT_EVALUATED';
  upstreamI125EvidenceId: string;
  candidateSourceId: string | null;
  candidateSourceTitle: string | null;
  candidateSourceAuthor: string | null;
  coverage: readonly I126ThresholdRequirementCoverageEvidence[];
  evaluatedRequirementCount: number;
  satisfiedRequirementCount: number;
  partialRequirementCount: number;
  unsupportedRequirementCount: number;
  allSixRequirementsEvaluated: boolean;
  candidateSatisfiesAllSixRequirements: boolean;
  thresholdAuthorityCoverageSatisfied: boolean;
  explicitBinaryEffectiveInteractionSemanticsSatisfied: boolean;
  visibleStemPositionScopeAndPositionClassApplicabilitySatisfied: boolean;
  qualitativeForceVsBinaryEligibilitySeparationSatisfied: boolean;
  wuLiBoundarySemanticsAndExceptionsSatisfied: boolean;
  contextAndExceptionConditionsSatisfied: boolean;
  independentNormativeProvenanceSatisfied: boolean;
  partialRequirementIds: readonly I118ThresholdAuthorityRequirementId[];
  unsupportedRequirementIds: readonly I118ThresholdAuthorityRequirementId[];
  remotePositionQualitativeForceRuleObserved: boolean;
  remotePositionNoEffectiveControlExamplesObserved: boolean;
  remotePositionEffectiveControlExamplesObserved: boolean;
  distanceAloneCannotDefineBinaryEligibilityFromThisSource: boolean;
  sourceProvidesExhaustivePositionToBinaryPredicate: boolean;
  literalWuLiExamplesHaveSourceLocalConsequences: boolean;
  sourceExplicitlyDefinesWuLiAsUniversalNoInteraction: boolean;
  sourceExplicitlyDefinesWuLiAsUniversalZeroEffect: boolean;
  sourceExplicitlyDefinesWuLiAsUniversalNegligibleForce: boolean;
  sourceProvidesExhaustiveWuLiExceptionBoundary: boolean;
  workedWuLiExamplesMayBePromotedToUniversalThreshold: false;
  candidateAcceptedForThresholdAuthority: false;
  candidatePromotedToThresholdAuthority: false;
  authorityAcquiredByThisGate: false;
  promotionReadinessReviewRequired: false;
  targetedPartialRequirementDiscoveryRequired: boolean;
  priorCandidateCoverageImported: false;
  crossCandidateCompositionPerformed: false;
  crossCandidateCompositionAuthorized: false;
  searchSnippetAloneAcceptedAsAuthority: false;
  modelSynthesisAcceptedAsAuthority: false;
  numericCalibrationAcceptedAsAuthority: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  effectiveInteractionSetResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
  'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
  'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
  'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
  'CONTEXT_AND_EXCEPTION_CONDITIONS',
  'INDEPENDENT_NORMATIVE_PROVENANCE',
] as const satisfies readonly I118ThresholdAuthorityRequirementId[]);

const CANDIDATE_SOURCE_ID =
  'source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933';

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_full_six_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI125Accepted(
  i125: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryEvidenceReport,
): boolean {
  const source = i125.candidateSourceReference;
  return (
    i125.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_EVIDENCE' &&
    i125.decision ===
      'ONE_WU_HUAIYUN_CANDIDATE_EXPOSES_ALL_SIX_RELEVANT_SEMANTIC_LOCI_REGISTERED_FOR_COVERAGE_EVALUATION_NO_THRESHOLD_AUTHORITY_YET' &&
    i125.rediscoveryPerformed &&
    i125.targetSourceTerm === '克' &&
    i125.targetScope === 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
    source !== null &&
    i125.candidateSourceId === CANDIDATE_SOURCE_ID &&
    source.sourceId === CANDIDATE_SOURCE_ID &&
    source.title === '阴阳五行八字预测学（初级教材）' &&
    source.author === '吴怀云' &&
    source.provenanceTier === 'practitioner_secondary' &&
    i125.candidateSourceIdentityResolved &&
    i125.candidateDigitalWitnessStableIdentifier === 'Scribd document 733612933' &&
    i125.candidateOriginalOrVerifiedSourceContextInspected &&
    i125.candidateExactSectionIdentityResolved &&
    i125.candidateAllSixRelevantLocatorsVerified &&
    i125.candidateRegisteredUnderI124 &&
    i125.registeredCandidateCount === 1 &&
    i125.requirementLocatorCount === 6 &&
    i125.requirementLocatorObservations.length === 6 &&
    i125.requirementLocatorObservations.every(
      (item, index) =>
        item.requirementId === REQUIREMENT_IDS[index] &&
        item.sameCandidate &&
        item.exactRelevantLocatorVerified &&
        item.locator.trim().length > 0 &&
        item.sourceAnchor.trim().length > 0 &&
        item.relevanceStatement.trim().length > 0 &&
        item.requirementCoverageEvaluated === false &&
        item.countsAsRequirementSatisfied === false,
    ) &&
    i125.allObservationsSameCandidate &&
    i125.allObservationsExactAndReproducible &&
    i125.literalWuLiObservedInCandidate &&
    i125.literalWuLiVisibleStemKeExampleObserved &&
    i125.explicitSourceLocalWuLiConsequenceObserved &&
    i125.qualitativeForceOrderingObserved &&
    i125.terminalEquivalentToNoneLanguageObserved &&
    i125.qualitativeVsTerminalBoundaryCoLocated &&
    i125.visibleStemPositionalScopeObserved &&
    i125.contextAndExceptionsObserved &&
    i125.authoredTrainingTextProvenanceObserved &&
    i125.candidateSatisfiesAllSixRequirements === 'not_evaluated' &&
    i125.requirementCoverageEvaluatedByThisGate === false &&
    i125.candidatePromotionAuthorizedByThisGate === false &&
    i125.authorityAcquiredByThisGate === false &&
    i125.priorCandidateCoverageImported === false &&
    i125.crossCandidateCompositionPerformed === false &&
    i125.crossCandidateCompositionAuthorized === false &&
    i125.searchSnippetAloneAcceptedAsAuthority === false &&
    i125.modelSynthesisAcceptedAsAuthority === false &&
    i125.numericCalibrationAcceptedAsAuthority === false &&
    i125.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i125.effectiveInteractionSetResolved === false &&
    i125.thresholdRuleCreatedByThisGate === false &&
    i125.classificationAuthorized === false &&
    i125.numericScoringAuthorized === false &&
    i125.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE'
  );
}

function coverageItem(
  item: I125RequirementLocatorObservation,
  coverageState: I126ThresholdRequirementCoverageState,
  evidenceBasis: readonly string[],
  limitingReason: string,
): I126ThresholdRequirementCoverageEvidence {
  return {
    requirementId: item.requirementId,
    coverageState,
    evidenceLocator: item.locator,
    sourceAnchor: item.sourceAnchor,
    evidenceBasis,
    limitingReason,
    countsAsSatisfiedForThresholdAuthorityCoverage:
      coverageState === 'SUPPORTED_BY_REGISTERED_EVIDENCE',
    sameRegisteredCandidateOnly: true,
    priorCandidateCoverageBorrowed: false,
    crossCandidateCompositionMaySubstitute: false,
    modelSynthesisMaySubstitute: false,
    numericCalibrationMaySubstitute: false,
    workedExampleMayBeGeneralizedBeyondSourceScope: false,
  };
}

function assess(
  item: I125RequirementLocatorObservation,
): I126ThresholdRequirementCoverageEvidence {
  switch (item.requirementId) {
    case 'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS':
      return coverageItem(
        item,
        'SUPPORTED_BY_REGISTERED_EVIDENCE',
        [
          'The same 天干相克 section distinguishes ordinary 克 from a terminal source-local state through 有等于无.',
          'The same section also distinguishes five-combination pairs as 论合而不论克 while the remaining pairs 仍以克论.',
        ],
        'This supports source-local binary/terminal semantics but does not itself create a repository-wide position threshold.',
      );
    case 'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY':
      return coverageItem(
        item,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [
          'The source explicitly scopes the discussion to 天干相克 and states neighboring positions have larger 克 force while remote positions have smaller 克 force.',
          'Within the same work, remote cases include both ineffective specified control and operative remote control, so distance is contextual rather than Boolean by itself.',
        ],
        'No exhaustive source-local predicate maps visible-stem positional classes to Boolean effective-interaction eligibility.',
      );
    case 'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION':
      return coverageItem(
        item,
        'SUPPORTED_BY_REGISTERED_EVIDENCE',
        [
          'A continuous source passage separately uses 克力较大 / 克力较小 for graded force and 有等于无 for terminal ineffectiveness under an additional condition.',
          'The source therefore does not equate every weaker or remote relation with the terminal state.',
        ],
        'This is a qualitative normative distinction only; no numeric cutoff or weight is authorized.',
      );
    case 'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS':
      return coverageItem(
        item,
        'PARTIAL_SCOPED_SUPPORT_ONLY',
        [
          'The same work uses 无力远征, 无力遥克, and 无力克伐 in visible-stem examples and immediately states consequences in those examples.',
          'Those examples establish source-local ineffective specified actions without borrowing semantic equivalence from another candidate.',
        ],
        'The work does not give a general definition of 无力 as universally no interaction, zero effect, negligible force, or another single state, nor an exhaustive exception boundary.',
      );
    case 'CONTEXT_AND_EXCEPTION_CONDITIONS':
      return coverageItem(
        item,
        'SUPPORTED_BY_REGISTERED_EVIDENCE',
        [
          'The source varies 克 force by position, root state, sitting strength, party strength, and yin/yang relation.',
          'It also gives the five-combination override and worked contextual interactions that alter treatment.',
        ],
        'Context coverage does not create a universal numeric or settlement algorithm.',
      );
    case 'INDEPENDENT_NORMATIVE_PROVENANCE':
      return coverageItem(
        item,
        'SUPPORTED_BY_REGISTERED_EVIDENCE',
        [
          'The registered witness identifies 吴怀云, the standalone training-text title, textbook level, chapter structure, and stable digital witness identifier.',
          'Independent catalog/index surfaces corroborate the work identity; the normative content evaluated remains the registered same-work witness.',
        ],
        'Research provenance sufficiency does not make source class alone sufficient for production or promotion.',
      );
  }
}

function commonMaterial(
  i125: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryEvidenceReport,
) {
  return {
    evidenceVersion:
      I126_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE_VERSION,
    upstreamI125EvidenceId: i125.evidenceId,
    workedWuLiExamplesMayBePromotedToUniversalThreshold: false as const,
    candidateAcceptedForThresholdAuthority: false as const,
    candidatePromotedToThresholdAuthority: false as const,
    authorityAcquiredByThisGate: false as const,
    promotionReadinessReviewRequired: false as const,
    priorCandidateCoverageImported: false as const,
    crossCandidateCompositionPerformed: false as const,
    crossCandidateCompositionAuthorized: false as const,
    searchSnippetAloneAcceptedAsAuthority: false as const,
    modelSynthesisAcceptedAsAuthority: false as const,
    numericCalibrationAcceptedAsAuthority: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    effectiveInteractionSetResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI126ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidence(
  i125: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRediscoveryEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidenceReport {
  const common = commonMaterial(i125);

  if (!exactI125Accepted(i125) || i125.candidateSourceReference === null) {
    return finalized({
      ...common,
      status: 'I125_UNRESOLVED_OR_INVALID',
      decision: 'VISIBLE_STEM_THRESHOLD_FULL_SIX_REQUIREMENT_COVERAGE_NOT_EVALUATED',
      candidateSourceId: null,
      candidateSourceTitle: null,
      candidateSourceAuthor: null,
      coverage: [],
      evaluatedRequirementCount: 0,
      satisfiedRequirementCount: 0,
      partialRequirementCount: 0,
      unsupportedRequirementCount: 0,
      allSixRequirementsEvaluated: false,
      candidateSatisfiesAllSixRequirements: false,
      thresholdAuthorityCoverageSatisfied: false,
      explicitBinaryEffectiveInteractionSemanticsSatisfied: false,
      visibleStemPositionScopeAndPositionClassApplicabilitySatisfied: false,
      qualitativeForceVsBinaryEligibilitySeparationSatisfied: false,
      wuLiBoundarySemanticsAndExceptionsSatisfied: false,
      contextAndExceptionConditionsSatisfied: false,
      independentNormativeProvenanceSatisfied: false,
      partialRequirementIds: [],
      unsupportedRequirementIds: [],
      remotePositionQualitativeForceRuleObserved: false,
      remotePositionNoEffectiveControlExamplesObserved: false,
      remotePositionEffectiveControlExamplesObserved: false,
      distanceAloneCannotDefineBinaryEligibilityFromThisSource: false,
      sourceProvidesExhaustivePositionToBinaryPredicate: false,
      literalWuLiExamplesHaveSourceLocalConsequences: false,
      sourceExplicitlyDefinesWuLiAsUniversalNoInteraction: false,
      sourceExplicitlyDefinesWuLiAsUniversalZeroEffect: false,
      sourceExplicitlyDefinesWuLiAsUniversalNegligibleForce: false,
      sourceProvidesExhaustiveWuLiExceptionBoundary: false,
      targetedPartialRequirementDiscoveryRequired: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REDISCOVERY_EVIDENCE',
      notes: [
        'I126 requires exact resolved I125 registration evidence before requirement coverage can be evaluated.',
      ],
    });
  }

  const coverage = i125.requirementLocatorObservations.map(assess);
  const satisfiedRequirementCount = coverage.filter(
    (item) => item.countsAsSatisfiedForThresholdAuthorityCoverage,
  ).length;
  const partialRequirementIds = coverage
    .filter((item) => item.coverageState === 'PARTIAL_SCOPED_SUPPORT_ONLY')
    .map((item) => item.requirementId);
  const unsupportedRequirementIds = coverage
    .filter((item) => item.coverageState === 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE')
    .map((item) => item.requirementId);
  const partialRequirementCount = partialRequirementIds.length;
  const unsupportedRequirementCount = unsupportedRequirementIds.length;
  const allSixRequirementsEvaluated = coverage.length === 6;
  const candidateSatisfiesAllSixRequirements =
    allSixRequirementsEvaluated &&
    satisfiedRequirementCount === 6 &&
    partialRequirementCount === 0 &&
    unsupportedRequirementCount === 0;

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE',
    decision:
      'WU_HUAIYUN_CANDIDATE_SATISFIES_FOUR_OF_SIX_I118_REQUIREMENTS_TWO_PARTIAL_GAPS_REMAIN_NO_THRESHOLD_AUTHORITY',
    candidateSourceId: i125.candidateSourceId,
    candidateSourceTitle: i125.candidateSourceReference.title,
    candidateSourceAuthor: i125.candidateSourceReference.author ?? null,
    coverage,
    evaluatedRequirementCount: 6,
    satisfiedRequirementCount,
    partialRequirementCount,
    unsupportedRequirementCount,
    allSixRequirementsEvaluated,
    candidateSatisfiesAllSixRequirements,
    thresholdAuthorityCoverageSatisfied: false,
    explicitBinaryEffectiveInteractionSemanticsSatisfied: true,
    visibleStemPositionScopeAndPositionClassApplicabilitySatisfied: false,
    qualitativeForceVsBinaryEligibilitySeparationSatisfied: true,
    wuLiBoundarySemanticsAndExceptionsSatisfied: false,
    contextAndExceptionConditionsSatisfied: true,
    independentNormativeProvenanceSatisfied: true,
    partialRequirementIds,
    unsupportedRequirementIds,
    remotePositionQualitativeForceRuleObserved: true,
    remotePositionNoEffectiveControlExamplesObserved: true,
    remotePositionEffectiveControlExamplesObserved: true,
    distanceAloneCannotDefineBinaryEligibilityFromThisSource: true,
    sourceProvidesExhaustivePositionToBinaryPredicate: false,
    literalWuLiExamplesHaveSourceLocalConsequences: true,
    sourceExplicitlyDefinesWuLiAsUniversalNoInteraction: false,
    sourceExplicitlyDefinesWuLiAsUniversalZeroEffect: false,
    sourceExplicitlyDefinesWuLiAsUniversalNegligibleForce: false,
    sourceProvidesExhaustiveWuLiExceptionBoundary: false,
    targetedPartialRequirementDiscoveryRequired: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: [
      'I126 evaluates requirement satisfaction rather than locator presence. Four requirements are supported and two remain partial.',
      'Distance and positional language are source-local force/context evidence, not an exhaustive Boolean eligibility predicate.',
      'The same-work 无力 examples have concrete consequences but do not define one universal semantic state with exhaustive exceptions.',
      'Because all six I118 requirements are mandatory, 4/6 support cannot authorize threshold authority, interaction-set resolution, damage evaluation, scoring, classification, or production interpretation.',
    ],
  });
}
