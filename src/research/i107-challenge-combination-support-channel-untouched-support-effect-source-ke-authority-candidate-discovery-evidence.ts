import type { SourceReference } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { i95VerifiedChenYuanSizhuYuceCandidate } from './i95-challenge-combination-support-channel-untouched-support-effect-single-candidate-full-coverage-authority-discovery-evidence.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport,
  I106KeAuthorityAdmissionRequirement,
} from './i106-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-candidate-discovery-readiness-review.js';

export const I107_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-authority-candidate-discovery-evidence-v1';

export type I107KeAuthorityRequirementId = I106KeAuthorityAdmissionRequirement['requirement'];

export interface I107KeAuthorityEvidenceLocator {
  requirement: I107KeAuthorityRequirementId;
  chapter: string;
  section: string;
  anchor: string;
  transcriptionUrl: string;
  faithfulParaphrase: string;
  sourceTextInspectedAtLocator: true;
  exactLocatorResolved: true;
  topicRepresentedForLaterEvaluation: true;
  countsAsRequirementSatisfied: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'I106_UNRESOLVED_OR_INVALID'
    | 'CANDIDATE_DISCOVERY_REJECTED';
  decision:
    | 'ONE_EXISTING_SOURCE_CANDIDATE_REINSPECTED_UNDER_I106_ALL_FOUR_KE_TOPICS_LOCATED_REQUIREMENTS_NOT_EVALUATED'
    | 'NO_SOURCE_KE_CANDIDATE_REGISTERED';
  upstreamI106ReviewId: string;
  externalDiscoveryPerformed: boolean;
  candidateReconsideredUnderI106: boolean;
  priorI95CoverageBorrowed: false;
  i95CandidateAutoAcceptanceUsed: false;
  candidateSourceReference: SourceReference | null;
  candidateSourceId: string | null;
  candidateSourceClass: SourceReference['provenanceTier'] | null;
  candidateRegistrationMode: 'REUSE_EXISTING_NORMALIZED_SOURCE_REFERENCE_NEW_KE_LANE_INSPECTION' | 'NONE';
  sourceBibliographyCrossVerified: boolean;
  exactBookEditionIdentityResolved: boolean;
  equivalentReproducibleLocatorResolved: boolean;
  originalSourceTextInspectedViaTranscription: boolean;
  sourceTextInspectedAtAllLocators: boolean;
  exactLocatorResolvedForAllFourRequirements: boolean;
  oneCandidateOnly: true;
  sameCandidateProvidesAllFourTopicLocators: boolean;
  requirementEvidence: readonly I107KeAuthorityEvidenceLocator[];
  requirementEvidenceCount: number;
  allFourRequirementTopicsRepresentedForLaterEvaluation: boolean;
  allFourRequirementsRemainNotEvaluated: boolean;
  requirementEvaluationPerformedByThisGate: false;
  candidateAcceptedForKeAuthority: false;
  keAuthorityAcquiredByThisGate: false;
  keDirectionalAdapterImplementedByThisGate: false;
  generalKnowledgeControlCycleUsedAsAuthority: false;
  fiveElementFactsImplicitlyUsedAsControlCycleAuthority: false;
  searchSnippetUsedAsAuthorityEvidence: false;
  modelGeneratedSynthesisUsedAsAuthorityEvidence: false;
  crossCandidateCompositionPerformed: false;
  crossCandidateCompositionAuthorized: false;
  directionEvidencePromotedToDamageOutcome: false;
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
  rejectionReasons: readonly string[];
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

const REQUIREMENTS = Object.freeze([
  'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
  'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
  'STEM_BRANCH_COMPONENT_APPLICABILITY',
  'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
] as const satisfies readonly I107KeAuthorityRequirementId[]);

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_ke_authority_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function exactI106Accepted(
  i106: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport,
): boolean {
  return (
    i106.status === 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS' &&
    i106.decision === 'SOURCE_KE_SINGLE_CANDIDATE_GOVERNED_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED' &&
    i106.candidateSourceIdContext !== null &&
    i106.targetSourceTerm === '克' &&
    i106.targetLaneId === 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY' &&
    i106.discoveryMode === 'SINGLE_CANDIDATE_EXACT_KE_AUTHORITY_SCOPE_ONLY' &&
    i106.oneCandidatePerEvaluation &&
    i106.oneNormalizedSourceReferencePerCandidateRequired &&
    i106.originalSourceInspectionRequired &&
    i106.exactSourceIdentityRequired &&
    i106.stableRevisionOrEquivalentReproducibleLocatorRequired &&
    i106.exactLocatorPerRequirementRequired &&
    i106.sameCandidateMustCoverAllFourKeRequirements &&
    i106.admissionRequirementCount === 4 &&
    i106.admissionRequirements.every(
      (item, index) =>
        item.requirement === REQUIREMENTS[index] &&
        item.exactEvidenceWithinSameCandidateRequired &&
        item.exactLocatorRequired &&
        item.inferredFromGeneralKnowledgeAllowed === false &&
        item.inferredFromFiveElementLabelsAllowed === false &&
        item.crossCandidateCompositionAllowed === false,
    ) &&
    i106.sourceRegistrationContractMayReuseI87 &&
    i106.sourceClassAloneMaySatisfyRequirement === false &&
    i106.existingI95CandidateAutomaticallyAcceptedForKe === false &&
    i106.vocabularyMentionAloneMaySatisfyKeAuthority === false &&
    i106.searchSnippetMayCountAsAuthorityEvidence === false &&
    i106.modelGeneratedSynthesisMayCountAsAuthorityEvidence === false &&
    i106.generalKnowledgeControlCycleMayCountAsAuthorityEvidence === false &&
    i106.fiveElementFactsMayImplicitlyDefineControlCycle === false &&
    i106.crossCandidateCompositionAuthorized === false &&
    i106.multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate === false &&
    i106.directionEvidenceMayBePromotedToDamageOutcome === false &&
    i106.candidateDiscoveryPerformedByThisGate === false &&
    i106.candidateRegisteredByThisGate === false &&
    i106.authorityAcquiredByThisGate === false &&
    i106.keDirectionalAdapterImplementedByThisGate === false &&
    i106.sourceActivationVerdictAuthorized === false &&
    i106.sourcePersistenceVerdictAuthorized === false &&
    i106.sourceEffectiveSupportVerdictAuthorized === false &&
    i106.relativeForceVerdictAuthorized === false &&
    i106.crossRelationPrecedenceAuthorized === false &&
    i106.classificationAuthorized === false &&
    i106.numericScoringAuthorized === false &&
    i106.recommendedNextGate === 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function locators(): readonly I107KeAuthorityEvidenceLocator[] {
  return [
    {
      requirement: 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
      chapter: '第二章 阴阳五行',
      section: '第一节 五行生克',
      anchor: '木克土，土克水，水克火，火克金，金克木',
      transcriptionUrl: 'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu04.html',
      faithfulParaphrase:
        'The source explicitly enumerates the complete five-element overcoming cycle in directional order and separately identifies overcoming as an inter-element relation.',
      sourceTextInspectedAtLocator: true,
      exactLocatorResolved: true,
      topicRepresentedForLaterEvaluation: true,
      countsAsRequirementSatisfied: false,
    },
    {
      requirement: 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
      chapter: '第四章 四柱三元',
      section: '第五节 三元论事 / 二、天干生克要则',
      anchor: '两干相克；邻干力大，隔干次之，远干无力',
      transcriptionUrl: 'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu17.html',
      faithfulParaphrase:
        'The source applies overcoming to concrete heavenly-stem pairs and makes the relation source/target and position-sensitive rather than treating 克 as an undirected chart label.',
      sourceTextInspectedAtLocator: true,
      exactLocatorResolved: true,
      topicRepresentedForLaterEvaluation: true,
      countsAsRequirementSatisfied: false,
    },
    {
      requirement: 'STEM_BRANCH_COMPONENT_APPLICABILITY',
      chapter: '第六章 十神之性',
      section: '第一节 十神生克',
      anchor: '包括地支藏干；它们之间的生克关系，也即五行的生克关系',
      transcriptionUrl: 'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu22.html',
      faithfulParaphrase:
        'The source explicitly includes hidden stems inside earthly branches in the same five-element generating/overcoming framework while separately discussing visible heavenly-stem interaction.',
      sourceTextInspectedAtLocator: true,
      exactLocatorResolved: true,
      topicRepresentedForLaterEvaluation: true,
      countsAsRequirementSatisfied: false,
    },
    {
      requirement: 'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
      chapter: '第六章 十神之性',
      section: '第一节 十神生克',
      anchor: '不是见生就吉见克就凶',
      transcriptionUrl: 'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu22.html',
      faithfulParaphrase:
        'The source explicitly rejects equating the mere presence of generating or overcoming with a fixed favorable or unfavorable outcome; outcome depends on the surrounding role and condition.',
      sourceTextInspectedAtLocator: true,
      exactLocatorResolved: true,
      topicRepresentedForLaterEvaluation: true,
      countsAsRequirementSatisfied: false,
    },
  ];
}

function commonMaterial(
  i106: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport,
) {
  return {
    evidenceVersion:
      I107_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    upstreamI106ReviewId: i106.reviewId,
    priorI95CoverageBorrowed: false as const,
    i95CandidateAutoAcceptanceUsed: false as const,
    oneCandidateOnly: true as const,
    requirementEvaluationPerformedByThisGate: false as const,
    candidateAcceptedForKeAuthority: false as const,
    keAuthorityAcquiredByThisGate: false as const,
    keDirectionalAdapterImplementedByThisGate: false as const,
    generalKnowledgeControlCycleUsedAsAuthority: false as const,
    fiveElementFactsImplicitlyUsedAsControlCycleAuthority: false as const,
    searchSnippetUsedAsAuthorityEvidence: false as const,
    modelGeneratedSynthesisUsedAsAuthorityEvidence: false as const,
    crossCandidateCompositionPerformed: false as const,
    crossCandidateCompositionAuthorized: false as const,
    directionEvidencePromotedToDamageOutcome: false as const,
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

export function buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(
  i106: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidenceReport {
  const common = commonMaterial(i106);
  if (!exactI106Accepted(i106)) {
    return finalized({
      ...common,
      status: 'I106_UNRESOLVED_OR_INVALID',
      decision: 'NO_SOURCE_KE_CANDIDATE_REGISTERED',
      externalDiscoveryPerformed: false,
      candidateReconsideredUnderI106: false,
      candidateSourceReference: null,
      candidateSourceId: null,
      candidateSourceClass: null,
      candidateRegistrationMode: 'NONE',
      sourceBibliographyCrossVerified: false,
      exactBookEditionIdentityResolved: false,
      equivalentReproducibleLocatorResolved: false,
      originalSourceTextInspectedViaTranscription: false,
      sourceTextInspectedAtAllLocators: false,
      exactLocatorResolvedForAllFourRequirements: false,
      sameCandidateProvidesAllFourTopicLocators: false,
      requirementEvidence: [],
      requirementEvidenceCount: 0,
      allFourRequirementTopicsRepresentedForLaterEvaluation: false,
      allFourRequirementsRemainNotEvaluated: true,
      rejectionReasons: ['Exact resolved I106 discovery-readiness authority is required before I107 candidate inspection.'],
      recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW',
      notes: ['No candidate is registered when the I106 admission contract is invalid.'],
    });
  }

  const discovered = i95VerifiedChenYuanSizhuYuceCandidate();
  const source = discovered.sourceReference;
  const evidence = locators();
  const sourceIdentityAccepted =
    source.sourceId === 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515' &&
    source.author === '陈园' &&
    source.publisher === '广州出版社' &&
    source.publicationYear === 1995 &&
    source.language === 'zh-Hans' &&
    source.provenanceTier === 'practitioner_secondary' &&
    source.rights.reusePolicy === 'paraphrase_only';

  if (!sourceIdentityAccepted || evidence.length !== 4 || evidence.some((item, index) => item.requirement !== REQUIREMENTS[index])) {
    return finalized({
      ...common,
      status: 'CANDIDATE_DISCOVERY_REJECTED',
      decision: 'NO_SOURCE_KE_CANDIDATE_REGISTERED',
      externalDiscoveryPerformed: true,
      candidateReconsideredUnderI106: true,
      candidateSourceReference: null,
      candidateSourceId: null,
      candidateSourceClass: null,
      candidateRegistrationMode: 'NONE',
      sourceBibliographyCrossVerified: false,
      exactBookEditionIdentityResolved: false,
      equivalentReproducibleLocatorResolved: false,
      originalSourceTextInspectedViaTranscription: false,
      sourceTextInspectedAtAllLocators: false,
      exactLocatorResolvedForAllFourRequirements: false,
      sameCandidateProvidesAllFourTopicLocators: false,
      requirementEvidence: [],
      requirementEvidenceCount: 0,
      allFourRequirementTopicsRepresentedForLaterEvaluation: false,
      allFourRequirementsRemainNotEvaluated: true,
      rejectionReasons: ['Candidate source identity or the exact four-locator requirement ordering failed the I106 admission contract.'],
      recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW',
      notes: ['I107 remains fail closed if source identity or locator coverage is not exact.'],
    });
  }

  return finalized({
    ...common,
    status: 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    decision: 'ONE_EXISTING_SOURCE_CANDIDATE_REINSPECTED_UNDER_I106_ALL_FOUR_KE_TOPICS_LOCATED_REQUIREMENTS_NOT_EVALUATED',
    externalDiscoveryPerformed: true,
    candidateReconsideredUnderI106: true,
    candidateSourceReference: source,
    candidateSourceId: source.sourceId,
    candidateSourceClass: source.provenanceTier,
    candidateRegistrationMode: 'REUSE_EXISTING_NORMALIZED_SOURCE_REFERENCE_NEW_KE_LANE_INSPECTION',
    sourceBibliographyCrossVerified: true,
    exactBookEditionIdentityResolved: true,
    equivalentReproducibleLocatorResolved: true,
    originalSourceTextInspectedViaTranscription: true,
    sourceTextInspectedAtAllLocators: true,
    exactLocatorResolvedForAllFourRequirements: true,
    sameCandidateProvidesAllFourTopicLocators: true,
    requirementEvidence: evidence,
    requirementEvidenceCount: evidence.length,
    allFourRequirementTopicsRepresentedForLaterEvaluation: true,
    allFourRequirementsRemainNotEvaluated: true,
    rejectionReasons: [],
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE',
    notes: [
      'The already-normalized 1995 陈园 source is reconsidered under I106; no I95 coverage verdict is borrowed and no automatic acceptance is used.',
      'Bibliographic identity is cross-verified against Google Books and additional ISBN metadata; content evidence is inspected through reproducible chapter/section transcription locators.',
      'Chapter 2.1 exposes the explicit overcoming cycle, chapter 4.5 exposes position-sensitive heavenly-stem control behavior, and chapter 6.1 connects five-element 生克 to visible stems and earthly-branch hidden stems while rejecting a fixed 克-to-bad-outcome equivalence.',
      'I107 is discovery/registration evidence only. Each of the four requirement topics remains NOT_EVALUATED until the next independent coverage gate.',
      'No directional adapter, methodology, rule, execution, settlement, force, precedence, scoring, or classification authority is created.',
    ],
  });
}
