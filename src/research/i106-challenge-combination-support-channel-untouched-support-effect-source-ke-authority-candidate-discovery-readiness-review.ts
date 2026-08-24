import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport,
  I105AuthorityRequirement,
} from './i105-challenge-combination-support-channel-untouched-support-effect-blocked-vocabulary-authority-acquisition-readiness-review.js';

export const I106_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-candidate-discovery-readiness-review-v1';

export interface I106KeAuthorityAdmissionRequirement {
  requirement: Extract<
    I105AuthorityRequirement,
    | 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE'
    | 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING'
    | 'STEM_BRANCH_COMPONENT_APPLICABILITY'
    | 'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION'
  >;
  exactEvidenceWithinSameCandidateRequired: true;
  exactLocatorRequired: true;
  inferredFromGeneralKnowledgeAllowed: false;
  inferredFromFiveElementLabelsAllowed: false;
  crossCandidateCompositionAllowed: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS'
    | 'I105_UNRESOLVED_OR_INVALID';
  decision:
    | 'SOURCE_KE_SINGLE_CANDIDATE_GOVERNED_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED'
    | 'SOURCE_KE_DISCOVERY_READINESS_NOT_ESTABLISHED';
  upstreamI105ReviewId: string;
  candidateSourceIdContext: string | null;
  targetSourceTerm: '克' | null;
  targetLaneId: 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY' | null;
  discoveryMode: 'SINGLE_CANDIDATE_EXACT_KE_AUTHORITY_SCOPE_ONLY' | 'NONE';
  oneCandidatePerEvaluation: boolean;
  oneNormalizedSourceReferencePerCandidateRequired: boolean;
  originalSourceInspectionRequired: boolean;
  exactSourceIdentityRequired: boolean;
  stableRevisionOrEquivalentReproducibleLocatorRequired: boolean;
  exactLocatorPerRequirementRequired: boolean;
  sameCandidateMustCoverAllFourKeRequirements: boolean;
  admissionRequirements: readonly I106KeAuthorityAdmissionRequirement[];
  admissionRequirementCount: number;
  sourceRegistrationContractMayReuseI87: boolean;
  candidateMayBeHistoricalPrimarySource: boolean;
  candidateMayBeScholarlyOrInstitutionalReference: boolean;
  candidateMayBePractitionerSecondarySource: boolean;
  sourceClassAloneMaySatisfyRequirement: false;
  existingI95CandidateAutomaticallyAcceptedForKe: false;
  vocabularyMentionAloneMaySatisfyKeAuthority: false;
  searchSnippetMayCountAsAuthorityEvidence: false;
  modelGeneratedSynthesisMayCountAsAuthorityEvidence: false;
  generalKnowledgeControlCycleMayCountAsAuthorityEvidence: false;
  fiveElementFactsMayImplicitlyDefineControlCycle: false;
  crossCandidateCompositionAuthorized: false;
  multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate: false;
  numericCalibrationMayCountAsNormativeAuthority: false;
  directionEvidenceMayBePromotedToDamageOutcome: false;
  candidateDiscoveryPerformedByThisGate: false;
  candidateRegisteredByThisGate: false;
  authorityAcquiredByThisGate: false;
  keDirectionalAdapterImplementedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

const EXPECTED_KE_REQUIREMENTS = Object.freeze([
  'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
  'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
  'STEM_BRANCH_COMPONENT_APPLICABILITY',
  'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
] as const satisfies readonly I105AuthorityRequirement[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_authority_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI105Accepted(
  i105: ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport,
): boolean {
  const ke = i105.lanes.find((lane) => lane.sourceTerm === '克');
  return (
    i105.status === 'RESOLVED_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS' &&
    i105.decision === 'KE_XING_WEI_AUTHORITY_ACQUISITION_LANES_SEPARATED_CROSS_LANE_SUBSTITUTION_BLOCKED' &&
    i105.candidateSourceId !== null &&
    i105.blockedTerms.join('|') === '克|刑|卫' &&
    i105.laneCount === 3 &&
    i105.allThreeBlockedTermsAssignedIndependentLane &&
    i105.sourceKeLaneReadyForGovernedDiscovery &&
    i105.crossLaneSubstitutionAuthorized === false &&
    i105.generalKnowledgeInferenceAuthorized === false &&
    i105.sourceKeMayInferControlCycleFromFiveElementFacts === false &&
    i105.sourceKeStructuralRelationKindRequired === false &&
    i105.sourceKeDirectionalEvidenceAdapterRequired &&
    i105.acquisitionResultMayDirectlyCreateMethodologyDefinition === false &&
    i105.acquisitionResultMayDirectlyCreateRuleDefinition === false &&
    i105.acquisitionResultMayDirectlyMutateRegistry === false &&
    i105.acquisitionResultMayDirectlyAuthorizeExecution === false &&
    i105.sourceActivationVerdictAuthorized === false &&
    i105.sourcePersistenceVerdictAuthorized === false &&
    i105.sourceEffectiveSupportVerdictAuthorized === false &&
    i105.relativeForceVerdictAuthorized === false &&
    i105.crossRelationPrecedenceAuthorized === false &&
    i105.classificationAuthorized === false &&
    i105.numericScoringAuthorized === false &&
    i105.recommendedNextGate === 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW' &&
    ke !== undefined &&
    ke.laneId === 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY' &&
    ke.currentBlocker === 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED' &&
    ke.requiredAuthority.join('|') === EXPECTED_KE_REQUIREMENTS.join('|') &&
    ke.exactNormativeAuthorityRequired &&
    ke.originalSourceInspectionRequired &&
    ke.reproducibleLocatorRequired &&
    ke.independentRegistrationRequired &&
    ke.mayReuseI87SourceRegistrationContract &&
    ke.generalKnowledgeMaySubstitute === false &&
    ke.modelSynthesisMaySubstitute === false &&
    ke.searchSnippetMaySubstitute === false &&
    ke.existingCandidateVocabularyMentionAloneSufficient === false &&
    ke.otherLaneAuthorityMaySubstitute === false &&
    ke.structuralRelationKindRequiredAfterAuthority === false &&
    ke.directionalEvidenceAdapterRequiredAfterAuthority &&
    ke.implementationAuthorizedByThisGate === false &&
    ke.effectOrPersistenceOutcomeAuthorizedByThisGate === false
  );
}

function admissionRequirements(): readonly I106KeAuthorityAdmissionRequirement[] {
  return EXPECTED_KE_REQUIREMENTS.map((requirement) => ({
    requirement,
    exactEvidenceWithinSameCandidateRequired: true,
    exactLocatorRequired: true,
    inferredFromGeneralKnowledgeAllowed: false,
    inferredFromFiveElementLabelsAllowed: false,
    crossCandidateCompositionAllowed: false,
  }));
}

function commonMaterial(
  i105: ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport,
) {
  return {
    reviewVersion:
      I106_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION,
    upstreamI105ReviewId: i105.reviewId,
    sourceClassAloneMaySatisfyRequirement: false as const,
    existingI95CandidateAutomaticallyAcceptedForKe: false as const,
    vocabularyMentionAloneMaySatisfyKeAuthority: false as const,
    searchSnippetMayCountAsAuthorityEvidence: false as const,
    modelGeneratedSynthesisMayCountAsAuthorityEvidence: false as const,
    generalKnowledgeControlCycleMayCountAsAuthorityEvidence: false as const,
    fiveElementFactsMayImplicitlyDefineControlCycle: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate: false as const,
    numericCalibrationMayCountAsNormativeAuthority: false as const,
    directionEvidenceMayBePromotedToDamageOutcome: false as const,
    candidateDiscoveryPerformedByThisGate: false as const,
    candidateRegisteredByThisGate: false as const,
    authorityAcquiredByThisGate: false as const,
    keDirectionalAdapterImplementedByThisGate: false as const,
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

export function buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(
  i105: ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport {
  const common = commonMaterial(i105);
  if (!exactI105Accepted(i105) || i105.candidateSourceId === null) {
    return finalized({
      ...common,
      status: 'I105_UNRESOLVED_OR_INVALID',
      decision: 'SOURCE_KE_DISCOVERY_READINESS_NOT_ESTABLISHED',
      candidateSourceIdContext: null,
      targetSourceTerm: null,
      targetLaneId: null,
      discoveryMode: 'NONE',
      oneCandidatePerEvaluation: false,
      oneNormalizedSourceReferencePerCandidateRequired: false,
      originalSourceInspectionRequired: false,
      exactSourceIdentityRequired: false,
      stableRevisionOrEquivalentReproducibleLocatorRequired: false,
      exactLocatorPerRequirementRequired: false,
      sameCandidateMustCoverAllFourKeRequirements: false,
      admissionRequirements: [],
      admissionRequirementCount: 0,
      sourceRegistrationContractMayReuseI87: false,
      candidateMayBeHistoricalPrimarySource: false,
      candidateMayBeScholarlyOrInstitutionalReference: false,
      candidateMayBePractitionerSecondarySource: false,
      recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW',
      notes: [
        'I106 requires the exact resolved I105 克 authority-acquisition lane before freezing candidate discovery admission.',
      ],
    });
  }

  const requirements = admissionRequirements();
  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS',
    decision: 'SOURCE_KE_SINGLE_CANDIDATE_GOVERNED_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED',
    candidateSourceIdContext: i105.candidateSourceId,
    targetSourceTerm: '克',
    targetLaneId: 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY',
    discoveryMode: 'SINGLE_CANDIDATE_EXACT_KE_AUTHORITY_SCOPE_ONLY',
    oneCandidatePerEvaluation: true,
    oneNormalizedSourceReferencePerCandidateRequired: true,
    originalSourceInspectionRequired: true,
    exactSourceIdentityRequired: true,
    stableRevisionOrEquivalentReproducibleLocatorRequired: true,
    exactLocatorPerRequirementRequired: true,
    sameCandidateMustCoverAllFourKeRequirements: true,
    admissionRequirements: requirements,
    admissionRequirementCount: requirements.length,
    sourceRegistrationContractMayReuseI87: true,
    candidateMayBeHistoricalPrimarySource: true,
    candidateMayBeScholarlyOrInstitutionalReference: true,
    candidateMayBePractitionerSecondarySource: true,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: [
      'I106 freezes admission only. It does not discover, register, or accept a 克 authority candidate.',
      'One evaluated candidate must provide exact, reproducibly located evidence for all four 克 requirements; partial candidates cannot be composed.',
      'Source class is not acceptance by itself: every requirement needs exact evidence inside the same normalized candidate.',
      'The existing I95 candidate may be reconsidered only through this admission contract; its prior vocabulary mention does not automatically satisfy 克 authority.',
      'Control direction remains separate from damage magnitude or outcome, and no new StructuralRelationKind is authorized for 克.',
      'No methodology/rule/executable authority, settlement, force, precedence, scoring, or classification is authorized.',
    ],
  });
}
