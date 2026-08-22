import type { SourceReference } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I84UntouchedSupportAuthorityRequirementId } from './i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';
import type {
  I87CandidateRequirementRegistrationSlot,
  I87UntouchedSupportAuthorityCandidateRegistrationDraft,
} from './i87-challenge-combination-support-channel-untouched-support-effect-authority-candidate-registration-contract.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport } from './i90-challenge-combination-support-channel-untouched-support-effect-missing-requirement-targeted-authority-discovery-readiness-review.js';

export const I91_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-targeted-authority-candidate-discovery-evidence-v1';

export type I91LaneDiscoveryState =
  | 'VERIFIED_CANDIDATE_RELEVANCE_NOT_COVERAGE_EVALUATION'
  | 'NO_NEW_EXACT_CANDIDATE_VERIFIED';

export interface I91TargetedLaneDiscoveryEvidence {
  requirementId: I84UntouchedSupportAuthorityRequirementId;
  state: I91LaneDiscoveryState;
  candidateRegistrationIds: readonly string[];
  relevanceBasis: readonly string[];
  requirementCoverageEvaluated: false;
  requirementSatisfied: false;
  crossCandidateSynthesisPerformed: false;
}

export interface I91RegisteredTargetedAuthorityCandidate
  extends I87UntouchedSupportAuthorityCandidateRegistrationDraft {
  registrationEvidenceVersion: string;
  discoveryVerification: {
    sourcePageResolved: true;
    exactLocatorResolved: true;
    sourceTextInspectedAtLocator: true;
    stableHistoricalRevisionResolved: true;
    sourceRightsAndHostingTermsInspected: true;
  };
  targetLaneIds: readonly I84UntouchedSupportAuthorityRequirementId[];
  candidateRequirementEvaluationStatus: 'NOT_STARTED';
  centralExecutableRegistryMutationPerformed: false;
  sourceReferenceApprovedForMethodologyOrRuleUse: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'I90_UNRESOLVED_OR_INVALID';
  decision:
    | 'ONE_ADDITIONAL_VERIFIED_TARGETED_CANDIDATE_REGISTERED_RESEARCH_ONLY_LANES_REMAIN_UNRESOLVED'
    | 'TARGETED_CANDIDATE_NOT_REGISTERED';
  upstreamI90ReviewId: string;
  externalDiscoveryPerformed: boolean;
  targetedLaneCount: number;
  laneDiscoveryEvidence: readonly I91TargetedLaneDiscoveryEvidence[];
  verifiedNewCandidateCount: number;
  registeredCandidates: readonly I91RegisteredTargetedAuthorityCandidate[];
  lanesWithVerifiedCandidateRelevanceCount: number;
  lanesWithoutNewExactCandidateCount: number;
  allCandidateI84RequirementSlotsRemainNotEvaluated: boolean;
  candidateRequirementEvaluationPerformedByThisGate: false;
  candidateRegistrationMeansRequirementSatisfied: false;
  centralExecutableRegistryMutationPerformed: false;
  crossCandidateSynthesisPerformed: false;
  candidateSetCompositionPolicyResolved: false;
  methodologyOrRulePromotionAuthorized: false;
  executableAuthorityAuthorized: false;
  untouchedSupportEffectRuleImplementationAuthorized: false;
  universalDefaultActiveRuleAuthorized: false;
  universalDefaultPersistedRuleAuthorized: false;
  universalDefaultEffectiveSupportRuleAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE';
  notes: readonly string[];
}

const REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const satisfies readonly I84UntouchedSupportAuthorityRequirementId[]);

const MATCHED_LANES = Object.freeze([
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const satisfies readonly I84UntouchedSupportAuthorityRequirementId[]);

function requirementSlots(): readonly I87CandidateRequirementRegistrationSlot[] {
  return REQUIREMENT_IDS.map((requirementId) => ({
    requirementId,
    coverageState: 'NOT_EVALUATED',
    evidenceMayBeInferredFromRelevance: false,
    evidenceMayBeInferredFromSourceType: false,
    evidenceMayBeInferredFromProvenanceTier: false,
    evidenceMayBeInferredFromNoContestLanguage: false,
    evidenceMayBeInferredFromSupportLanguage: false,
  }));
}

function sanmingTonghuiSourceReference(): SourceReference {
  return {
    sourceId: 'source_sanming_tonghui_vol6_yinshou_wikisource_2017_oldid845352',
    sourceType: 'classical_text',
    title: '三命通會',
    language: 'zh-Hant',
    locator: {
      volume: '卷六',
      section: '論印綬',
      anchor: '印綬不逢損傷；印綬有根，逢財則發，逢官則顯，逢合則晦，逢沖則災',
    },
    url: 'https://zh.wikisource.org/w/index.php?title=三命通會/卷六&oldid=845352',
    accessedAt: '2026-08-21',
    provenanceTier: 'primary',
    rights: {
      copyrightStatus: 'public_domain',
      reusePolicy: 'paraphrase_only',
    },
    notes:
      'Research-only candidate from the inspected Wikisource historical revision. The classical work is public-domain; the hosted transcription terms were inspected. The candidate is scoped to 論印綬 and is not treated as a generic untouched-support rule.',
  };
}

function candidateMaterial(): Omit<I91RegisteredTargetedAuthorityCandidate, 'candidateRegistrationId'> {
  return {
    sourceReference: sanmingTonghuiSourceReference(),
    evidenceRepresentation: 'FAITHFUL_PARAPHRASE_WITH_EXACT_LOCATOR',
    evidenceTextOrParaphrase:
      'The 印綬 discussion distinguishes an undamaged seal configuration from damaged or interaction-affected states, states that an undamaged 印綬 is associated with its expected benefit, and separately describes effects under wealth, combination, and clash. It also contains position-specific qualifications. These statements are scoped to 印綬 and do not themselves define a generic no-tracked-touch persistence rule.',
    exactLocatorStatement:
      '《三命通會》卷六，論印綬: paragraph containing 印綬不逢損傷 and later 印綬有根，逢財則發，逢官則顯，逢合則晦，逢沖則災; Wikisource historical revision oldid=845352.',
    sourceLanguageStatement: 'Inspected in traditional Chinese on Wikisource.',
    translationStatus: 'ORIGINAL_LANGUAGE_ONLY',
    scopeStatement:
      '印綬-specific discussion of benefit, damage, position, root, wealth, combination, and clash conditions in volume 6; not a generic settlement rule for every support source.',
    applicabilityStatement:
      'Relevant for targeted evaluation of presence-versus-effect distinctions, position/exception semantics, and damage/persistence-like conditions for 印綬. It may also provide independent primary provenance for those scoped propositions.',
    exceptionStatement:
      'The passage includes multiple 印綬-specific exceptions and interaction conditions, including wealth damage, combination, clash, rooting, and position distinctions. It does not say that every no-touch source is automatically ACTIVE, PERSISTED, or effective support, and it does not establish same-element 比劫 applicability as a generic paired support class.',
    provenanceStatement:
      'Primary classical-text research candidate from a stable Wikisource historical revision of 三命通會卷六 with exact section and anchor preserved.',
    discoveryTraceStatement:
      'Targeted web discovery executed on 2026-08-21 under I90 lanes. The 論印綬 page, exact relevant paragraph, stable oldid=845352 revision link, and hosted-text terms were inspected before research registration.',
    requirementSlots: requirementSlots(),
    registrationStatus: 'RESEARCH_CANDIDATE_ONLY',
    methodologyOrRuleApproval: 'NOT_GRANTED',
    executableAuthorityStatus: 'NOT_AUTHORIZED',
    registrationEvidenceVersion:
      I91_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    discoveryVerification: {
      sourcePageResolved: true,
      exactLocatorResolved: true,
      sourceTextInspectedAtLocator: true,
      stableHistoricalRevisionResolved: true,
      sourceRightsAndHostingTermsInspected: true,
    },
    targetLaneIds: MATCHED_LANES,
    candidateRequirementEvaluationStatus: 'NOT_STARTED',
    centralExecutableRegistryMutationPerformed: false,
    sourceReferenceApprovedForMethodologyOrRuleUse: false,
  };
}

export function i91VerifiedSanmingTonghuiYinshouCandidate(): I91RegisteredTargetedAuthorityCandidate {
  const material = candidateMaterial();
  return {
    candidateRegistrationId: `untouched_support_targeted_candidate_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i90Accepted(
  i90: ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
): boolean {
  return (
    i90.status === 'RESOLVED_TARGETED_AUTHORITY_DISCOVERY_READINESS' &&
    i90.decision ===
      'TARGETED_DISCOVERY_LANES_AUTHORIZED_NO_CROSS_CANDIDATE_SYNTHESIS_OR_PROMOTION' &&
    i90.discoveryMayProceed &&
    i90.discoveryLanes.length === 6 &&
    i90.unsatisfiedRequirementCount === 6 &&
    i90.actualExternalDiscoveryPerformedByThisGate === false &&
    i90.i84AcceptanceThresholdChanged === false &&
    i90.partialCoveragePromotedToSatisfied === false &&
    i90.candidateSetCompositionPolicyResolved === false &&
    i90.crossCandidateSynthesisAuthorized === false &&
    i90.methodologyOrRulePromotionAuthorized === false &&
    i90.executableAuthorityAuthorized === false &&
    i90.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i90.sourceActivationVerdictAuthorized === false &&
    i90.sourcePersistenceVerdictAuthorized === false &&
    i90.sourceEffectiveSupportVerdictAuthorized === false &&
    i90.relativeForceVerdictAuthorized === false &&
    i90.crossRelationPrecedenceAuthorized === false &&
    i90.classificationAuthorized === false &&
    i90.numericScoringAuthorized === false &&
    i90.discoveryLanes.every(
      (lane) =>
        lane.candidateMustUseI87RegistrationContract &&
        lane.originalSourceInspectionRequired &&
        lane.exactLocatorRequired &&
        lane.requirementMustBeEvaluatedIndependently &&
        lane.sameCandidateMayCoverMultipleRequirementsOnlyWithIndependentExactEvidence &&
        lane.crossCandidateSynthesisMayCloseRequirement === false &&
        lane.searchSnippetMayCountAsEvidence === false &&
        lane.modelSynthesisMayCountAsEvidence === false &&
        lane.numericCalibrationMayCountAsEvidence === false,
    ) &&
    i90.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function laneEvidence(candidate: I91RegisteredTargetedAuthorityCandidate): readonly I91TargetedLaneDiscoveryEvidence[] {
  const matched = new Set(candidate.targetLaneIds);
  return REQUIREMENT_IDS.map((requirementId) => ({
    requirementId,
    state: matched.has(requirementId)
      ? 'VERIFIED_CANDIDATE_RELEVANCE_NOT_COVERAGE_EVALUATION'
      : 'NO_NEW_EXACT_CANDIDATE_VERIFIED',
    candidateRegistrationIds: matched.has(requirementId)
      ? [candidate.candidateRegistrationId]
      : [],
    relevanceBasis: matched.has(requirementId)
      ? [candidate.exactLocatorStatement, candidate.applicabilityStatement, candidate.exceptionStatement]
      : ['Targeted search did not yield an additional exact-locator candidate suitable for registration in this gate.'],
    requirementCoverageEvaluated: false,
    requirementSatisfied: false,
    crossCandidateSynthesisPerformed: false,
  }));
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_targeted_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI91ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidence(
  i90: ChallengeCombinationSupportChannelUntouchedSupportEffectMissingRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectTargetedAuthorityCandidateDiscoveryEvidenceReport {
  const common = {
    evidenceVersion:
      I91_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    upstreamI90ReviewId: i90.reviewId,
    candidateRequirementEvaluationPerformedByThisGate: false as const,
    candidateRegistrationMeansRequirementSatisfied: false as const,
    centralExecutableRegistryMutationPerformed: false as const,
    crossCandidateSynthesisPerformed: false as const,
    candidateSetCompositionPolicyResolved: false as const,
    methodologyOrRulePromotionAuthorized: false as const,
    executableAuthorityAuthorized: false as const,
    untouchedSupportEffectRuleImplementationAuthorized: false as const,
    universalDefaultActiveRuleAuthorized: false as const,
    universalDefaultPersistedRuleAuthorized: false as const,
    universalDefaultEffectiveSupportRuleAuthorized: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_TARGETED_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE' as const,
  };

  if (!i90Accepted(i90)) {
    return finalized({
      ...common,
      status: 'I90_UNRESOLVED_OR_INVALID',
      decision: 'TARGETED_CANDIDATE_NOT_REGISTERED',
      externalDiscoveryPerformed: false,
      targetedLaneCount: 0,
      laneDiscoveryEvidence: [],
      verifiedNewCandidateCount: 0,
      registeredCandidates: [],
      lanesWithVerifiedCandidateRelevanceCount: 0,
      lanesWithoutNewExactCandidateCount: 0,
      allCandidateI84RequirementSlotsRemainNotEvaluated: false,
      notes: ['Resolved fail-closed I90 discovery readiness is required before targeted candidate evidence may be registered.'],
    });
  }

  const candidate = i91VerifiedSanmingTonghuiYinshouCandidate();
  const lanes = laneEvidence(candidate);
  return finalized({
    ...common,
    status: 'RESOLVED_TARGETED_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    decision:
      'ONE_ADDITIONAL_VERIFIED_TARGETED_CANDIDATE_REGISTERED_RESEARCH_ONLY_LANES_REMAIN_UNRESOLVED',
    externalDiscoveryPerformed: true,
    targetedLaneCount: REQUIREMENT_IDS.length,
    laneDiscoveryEvidence: lanes,
    verifiedNewCandidateCount: 1,
    registeredCandidates: [candidate],
    lanesWithVerifiedCandidateRelevanceCount: lanes.filter(
      (lane) => lane.state === 'VERIFIED_CANDIDATE_RELEVANCE_NOT_COVERAGE_EVALUATION',
    ).length,
    lanesWithoutNewExactCandidateCount: lanes.filter(
      (lane) => lane.state === 'NO_NEW_EXACT_CANDIDATE_VERIFIED',
    ).length,
    allCandidateI84RequirementSlotsRemainNotEvaluated: candidate.requirementSlots.every(
      (slot) => slot.coverageState === 'NOT_EVALUATED',
    ),
    notes: [
      'I91 registers one additional exact-locator primary classical-text candidate from 三命通會卷六·論印綬.',
      'The candidate is relevant to four targeted lanes because it distinguishes undamaged versus damaged/interaction-affected 印綬 states, contains position and exception conditions, and has independently inspectable provenance.',
      'The candidate remains scoped to 印綬. It is not a generic post-interaction untouched-source rule, does not establish paired 印/比 applicability, and does not by registration satisfy any I84 requirement.',
      'Two lanes therefore have no newly registered exact candidate in this gate, and all six requirements remain for independent I84 coverage evaluation.',
    ],
  });
}
