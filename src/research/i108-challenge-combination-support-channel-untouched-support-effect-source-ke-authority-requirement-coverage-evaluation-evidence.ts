import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
  I107KeAuthorityEvidenceLocator,
  I107KeAuthorityRequirementId,
} from './i107-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-candidate-discovery-evidence.js';

export const I108_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-requirement-coverage-evaluation-evidence-v1';

export type I108KeRequirementCoverageState =
  | 'SUPPORTED_BY_REGISTERED_EVIDENCE'
  | 'PARTIAL_SCOPED_SUPPORT_ONLY'
  | 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE';

export interface I108KeRequirementCoverageEvidence {
  requirement: I107KeAuthorityRequirementId;
  coverageState: I108KeRequirementCoverageState;
  evidenceLocator: string;
  evidenceBasis: readonly string[];
  limitingReason: string;
  countsAsSatisfiedForKeAuthorityCoverage: boolean;
  evidenceComesFromSameRegisteredCandidate: true;
  priorI95CoverageBorrowed: false;
  generalKnowledgeMaySubstitute: false;
  fiveElementLabelsAloneMaySubstitute: false;
  crossCandidateCompositionMaySubstitute: false;
  directionMayBePromotedToDamageOutcome: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE'
    | 'I107_UNRESOLVED_OR_INVALID';
  decision:
    | 'SINGLE_REGISTERED_CANDIDATE_SATISFIES_ALL_FOUR_KE_AUTHORITY_REQUIREMENTS_PROMOTION_REVIEW_REQUIRED'
    | 'SOURCE_KE_REQUIREMENT_COVERAGE_NOT_EVALUATED';
  upstreamI107EvidenceId: string;
  candidateSourceId: string | null;
  candidateSourceClass: string | null;
  coverage: readonly I108KeRequirementCoverageEvidence[];
  evaluatedRequirementCount: number;
  satisfiedRequirementCount: number;
  partialRequirementCount: number;
  unsupportedRequirementCount: number;
  allFourRequirementsEvaluated: boolean;
  candidateSatisfiesAllFourKeRequirements: boolean;
  keAuthorityCoverageGapSatisfied: boolean;
  keAuthorityGapClosed: false;
  candidateAcceptedForKeAuthority: false;
  candidatePromotedToKeAuthority: false;
  sourceReferenceApprovedForKeAdapterUse: false;
  promotionReadinessReviewRequired: boolean;
  additionalKeCandidateDiscoveryRequired: boolean;
  controlCycleAuthorityCoverageSatisfied: boolean;
  sourceLocalDirectionAuthorityCoverageSatisfied: boolean;
  stemBranchApplicabilityAuthorityCoverageSatisfied: boolean;
  controlVsDamageSeparationAuthorityCoverageSatisfied: boolean;
  branchApplicabilityScope:
    | 'EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK'
    | 'not_evaluated';
  rawBranchElementDirectControlRuleAuthorized: false;
  controlDirectionMayBeTreatedAsDamageOutcome: false;
  controlDirectionMayBeTreatedAsDamageMagnitude: false;
  sourceClassAloneMayAuthorizeAdapter: false;
  singlePractitionerSecondarySourceMayAuthorizeProductionRule: false;
  keDirectionalAdapterImplementationAuthorizedByThisGate: false;
  structuralRelationKindMutationAuthorizedByThisGate: false;
  methodologyDefinitionCreatedByThisGate: false;
  methodologyRegisteredByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const REQUIREMENTS = Object.freeze([
  'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
  'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
  'STEM_BRANCH_COMPONENT_APPLICABILITY',
  'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
] as const satisfies readonly I107KeAuthorityRequirementId[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_ke_authority_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactLocatorEvidence(
  items: readonly I107KeAuthorityEvidenceLocator[],
): boolean {
  return (
    items.length === 4 &&
    items.every(
      (item, index) =>
        item.requirement === REQUIREMENTS[index] &&
        item.chapter.trim().length > 0 &&
        item.section.trim().length > 0 &&
        item.anchor.trim().length > 0 &&
        item.transcriptionUrl.startsWith('https://') &&
        item.faithfulParaphrase.trim().length > 0 &&
        item.sourceTextInspectedAtLocator &&
        item.exactLocatorResolved &&
        item.topicRepresentedForLaterEvaluation &&
        item.countsAsRequirementSatisfied === false,
    )
  );
}

function exactI107Accepted(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  const source = i107.candidateSourceReference;
  return (
    i107.status === 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' &&
    i107.decision ===
      'ONE_EXISTING_SOURCE_CANDIDATE_REINSPECTED_UNDER_I106_ALL_FOUR_KE_TOPICS_LOCATED_REQUIREMENTS_NOT_EVALUATED' &&
    i107.externalDiscoveryPerformed &&
    i107.candidateReconsideredUnderI106 &&
    i107.priorI95CoverageBorrowed === false &&
    i107.i95CandidateAutoAcceptanceUsed === false &&
    source !== null &&
    i107.candidateSourceId === 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515' &&
    source.sourceId === i107.candidateSourceId &&
    source.author === '陈园' &&
    source.publisher === '广州出版社' &&
    source.publicationYear === 1995 &&
    source.provenanceTier === 'practitioner_secondary' &&
    i107.candidateSourceClass === 'practitioner_secondary' &&
    i107.candidateRegistrationMode === 'REUSE_EXISTING_NORMALIZED_SOURCE_REFERENCE_NEW_KE_LANE_INSPECTION' &&
    i107.sourceBibliographyCrossVerified &&
    i107.exactBookEditionIdentityResolved &&
    i107.equivalentReproducibleLocatorResolved &&
    i107.originalSourceTextInspectedViaTranscription &&
    i107.sourceTextInspectedAtAllLocators &&
    i107.exactLocatorResolvedForAllFourRequirements &&
    i107.oneCandidateOnly &&
    i107.sameCandidateProvidesAllFourTopicLocators &&
    i107.requirementEvidenceCount === 4 &&
    exactLocatorEvidence(i107.requirementEvidence) &&
    i107.allFourRequirementTopicsRepresentedForLaterEvaluation &&
    i107.allFourRequirementsRemainNotEvaluated &&
    i107.requirementEvaluationPerformedByThisGate === false &&
    i107.candidateAcceptedForKeAuthority === false &&
    i107.keAuthorityAcquiredByThisGate === false &&
    i107.keDirectionalAdapterImplementedByThisGate === false &&
    i107.generalKnowledgeControlCycleUsedAsAuthority === false &&
    i107.fiveElementFactsImplicitlyUsedAsControlCycleAuthority === false &&
    i107.searchSnippetUsedAsAuthorityEvidence === false &&
    i107.modelGeneratedSynthesisUsedAsAuthorityEvidence === false &&
    i107.crossCandidateCompositionPerformed === false &&
    i107.crossCandidateCompositionAuthorized === false &&
    i107.directionEvidencePromotedToDamageOutcome === false &&
    i107.sourceActivationVerdictAuthorized === false &&
    i107.sourcePersistenceVerdictAuthorized === false &&
    i107.sourceEffectiveSupportVerdictAuthorized === false &&
    i107.relativeForceVerdictAuthorized === false &&
    i107.crossRelationPrecedenceAuthorized === false &&
    i107.classificationAuthorized === false &&
    i107.numericScoringAuthorized === false &&
    i107.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE'
  );
}

function locatorText(item: I107KeAuthorityEvidenceLocator): string {
  return `${item.chapter} / ${item.section} / ${item.anchor}`;
}

function supported(
  item: I107KeAuthorityEvidenceLocator,
  evidenceBasis: readonly string[],
  limitingReason: string,
): I108KeRequirementCoverageEvidence {
  return {
    requirement: item.requirement,
    coverageState: 'SUPPORTED_BY_REGISTERED_EVIDENCE',
    evidenceLocator: locatorText(item),
    evidenceBasis,
    limitingReason,
    countsAsSatisfiedForKeAuthorityCoverage: true,
    evidenceComesFromSameRegisteredCandidate: true,
    priorI95CoverageBorrowed: false,
    generalKnowledgeMaySubstitute: false,
    fiveElementLabelsAloneMaySubstitute: false,
    crossCandidateCompositionMaySubstitute: false,
    directionMayBePromotedToDamageOutcome: false,
  };
}

function assess(item: I107KeAuthorityEvidenceLocator): I108KeRequirementCoverageEvidence {
  switch (item.requirement) {
    case 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE':
      return supported(
        item,
        [
          item.faithfulParaphrase,
          'The registered locator explicitly enumerates the complete directional overcoming cycle: wood controls earth, earth controls water, water controls fire, fire controls metal, and metal controls wood.',
        ],
        'This satisfies the cycle-identity requirement only. It does not define damage magnitude, settlement outcome, or an executable chart adapter.',
      );
    case 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING':
      return supported(
        item,
        [
          item.faithfulParaphrase,
          'The registered heavenly-stem rule evaluates one stem overcoming another and varies effective interaction by adjacency/intervening structure, establishing a source-to-target directional mapping rather than an undirected 克 label.',
        ],
        'Position-sensitive interaction conditions remain evidence inputs. They are not promoted here into a universal precedence or force rule.',
      );
    case 'STEM_BRANCH_COMPONENT_APPLICABILITY':
      return supported(
        item,
        [
          item.faithfulParaphrase,
          'The registered source explicitly includes earthly-branch hidden stems among the ten-god/five-element entities whose generating and overcoming relations follow the five-element framework.',
        ],
        'Coverage is scoped to visible stems and earthly-branch hidden stems. This does not authorize treating a raw branch-element label itself as a direct 克 relation participant.',
      );
    case 'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION':
      return supported(
        item,
        [
          item.faithfulParaphrase,
          'The registered section explicitly rejects the rule that observing generation is automatically favorable or observing overcoming is automatically unfavorable and provides context-dependent counterexamples.',
        ],
        'This establishes non-equivalence between directional 克 evidence and outcome. It does not itself supply a generic damage-settlement algorithm.',
      );
  }
}

function commonMaterial(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
) {
  return {
    evidenceVersion:
      I108_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE_VERSION,
    upstreamI107EvidenceId: i107.evidenceId,
    keAuthorityGapClosed: false as const,
    candidateAcceptedForKeAuthority: false as const,
    candidatePromotedToKeAuthority: false as const,
    sourceReferenceApprovedForKeAdapterUse: false as const,
    rawBranchElementDirectControlRuleAuthorized: false as const,
    controlDirectionMayBeTreatedAsDamageOutcome: false as const,
    controlDirectionMayBeTreatedAsDamageMagnitude: false as const,
    sourceClassAloneMayAuthorizeAdapter: false as const,
    singlePractitionerSecondarySourceMayAuthorizeProductionRule: false as const,
    keDirectionalAdapterImplementationAuthorizedByThisGate: false as const,
    structuralRelationKindMutationAuthorizedByThisGate: false as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    methodologyRegisteredByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(
  i107: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidenceReport {
  const common = commonMaterial(i107);
  if (!exactI107Accepted(i107) || i107.candidateSourceId === null) {
    return finalized({
      ...common,
      status: 'I107_UNRESOLVED_OR_INVALID',
      decision: 'SOURCE_KE_REQUIREMENT_COVERAGE_NOT_EVALUATED',
      candidateSourceId: null,
      candidateSourceClass: null,
      coverage: [],
      evaluatedRequirementCount: 0,
      satisfiedRequirementCount: 0,
      partialRequirementCount: 0,
      unsupportedRequirementCount: 0,
      allFourRequirementsEvaluated: false,
      candidateSatisfiesAllFourKeRequirements: false,
      keAuthorityCoverageGapSatisfied: false,
      promotionReadinessReviewRequired: false,
      additionalKeCandidateDiscoveryRequired: true,
      controlCycleAuthorityCoverageSatisfied: false,
      sourceLocalDirectionAuthorityCoverageSatisfied: false,
      stemBranchApplicabilityAuthorityCoverageSatisfied: false,
      controlVsDamageSeparationAuthorityCoverageSatisfied: false,
      branchApplicabilityScope: 'not_evaluated',
      recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
      notes: [
        'I108 requires exact resolved I107 discovery evidence before evaluating the four 克 authority requirements.',
      ],
    });
  }

  const coverage = i107.requirementEvidence.map(assess);
  const satisfiedRequirementCount = coverage.filter(
    (item) => item.coverageState === 'SUPPORTED_BY_REGISTERED_EVIDENCE' && item.countsAsSatisfiedForKeAuthorityCoverage,
  ).length;
  const partialRequirementCount = coverage.filter(
    (item) => item.coverageState === 'PARTIAL_SCOPED_SUPPORT_ONLY',
  ).length;
  const unsupportedRequirementCount = coverage.filter(
    (item) => item.coverageState === 'NOT_SUPPORTED_BY_REGISTERED_EVIDENCE',
  ).length;
  const allSatisfied =
    coverage.length === 4 &&
    satisfiedRequirementCount === 4 &&
    partialRequirementCount === 0 &&
    unsupportedRequirementCount === 0;

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE',
    decision: 'SINGLE_REGISTERED_CANDIDATE_SATISFIES_ALL_FOUR_KE_AUTHORITY_REQUIREMENTS_PROMOTION_REVIEW_REQUIRED',
    candidateSourceId: i107.candidateSourceId,
    candidateSourceClass: i107.candidateSourceClass,
    coverage,
    evaluatedRequirementCount: coverage.length,
    satisfiedRequirementCount,
    partialRequirementCount,
    unsupportedRequirementCount,
    allFourRequirementsEvaluated: coverage.length === 4,
    candidateSatisfiesAllFourKeRequirements: allSatisfied,
    keAuthorityCoverageGapSatisfied: allSatisfied,
    promotionReadinessReviewRequired: true,
    additionalKeCandidateDiscoveryRequired: !allSatisfied,
    controlCycleAuthorityCoverageSatisfied:
      coverage.find((item) => item.requirement === 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE')?.countsAsSatisfiedForKeAuthorityCoverage === true,
    sourceLocalDirectionAuthorityCoverageSatisfied:
      coverage.find((item) => item.requirement === 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING')?.countsAsSatisfiedForKeAuthorityCoverage === true,
    stemBranchApplicabilityAuthorityCoverageSatisfied:
      coverage.find((item) => item.requirement === 'STEM_BRANCH_COMPONENT_APPLICABILITY')?.countsAsSatisfiedForKeAuthorityCoverage === true,
    controlVsDamageSeparationAuthorityCoverageSatisfied:
      coverage.find((item) => item.requirement === 'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION')?.countsAsSatisfiedForKeAuthorityCoverage === true,
    branchApplicabilityScope: 'EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK',
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW',
    notes: [
      'All four frozen 克 authority requirements are independently supported by exact locators in the same registered 1995 陈园 candidate.',
      'The branch-component coverage is deliberately scoped to earthly-branch hidden stems; I108 does not invent a raw branch-element direct-control relation.',
      'Coverage satisfaction closes the research evidence-coverage gap only. The candidate remains practitioner_secondary and requires a separate promotion-readiness review before any adapter authority can be granted.',
      '克 direction remains distinct from damage magnitude and outcome. No settlement, effective force, precedence, scoring, or classification is authorized.',
    ],
  });
}
