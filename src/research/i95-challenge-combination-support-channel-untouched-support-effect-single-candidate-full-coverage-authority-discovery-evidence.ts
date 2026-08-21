import type { SourceReference } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  I87CandidateRequirementRegistrationSlot,
} from './i87-challenge-combination-support-channel-untouched-support-effect-authority-candidate-registration-contract.js';
import {
  buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence,
  type I88DiscoveredAuthorityCandidateInput,
  type I88RegisteredAuthorityCandidate,
} from './i88-challenge-combination-support-channel-untouched-support-effect-authority-candidate-discovery-registration-evidence.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport } from './i94-challenge-combination-support-channel-untouched-support-effect-single-candidate-full-coverage-authority-discovery-readiness-review.js';

export const I95_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-single-candidate-full-coverage-authority-discovery-evidence-v1';

const REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const);

export interface I95DiscoveryTopicRepresentation {
  requirementId: (typeof REQUIREMENT_IDS)[number];
  topicRepresentedForLaterEvaluation: true;
  representationBasis: string;
  countsAsI84RequirementSatisfied: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_EVIDENCE'
    | 'I87_OR_I94_UNRESOLVED_OR_INVALID'
    | 'CANDIDATE_REGISTRATION_REJECTED';
  decision:
    | 'ONE_PLAUSIBLE_FULL_COVERAGE_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED'
    | 'NO_CANDIDATE_REGISTERED';
  upstreamI87ReviewId: string;
  upstreamI94ReviewId: string;
  externalDiscoveryPerformed: boolean;
  discoverySearchScope: readonly string[];
  inspectedCandidateFamilyCount: number;
  registeredCandidateCount: number;
  registeredCandidate: I88RegisteredAuthorityCandidate | null;
  discoveryTopicRepresentation: readonly I95DiscoveryTopicRepresentation[];
  allSixRequirementTopicsRepresentedForLaterEvaluation: boolean;
  allSixRequirementSlotsRemainNotEvaluated: boolean;
  candidateRequirementEvaluationPerformedByThisGate: false;
  candidateSatisfiesAllI84Requirements: 'not_evaluated';
  candidateAcceptedForUntouchedSupportAuthority: false;
  sourceBibliographyCrossVerified: boolean;
  originalSourceTextInspectedViaTranscription: boolean;
  exactBookEditionIdentityResolved: boolean;
  equivalentReproducibleLocatorResolved: boolean;
  exactLocatorResolved: boolean;
  candidateRegisteredThroughI87ContractReuse: boolean;
  oneCandidateOnly: true;
  priorI88CandidateCoverageBorrowed: false;
  priorI91CandidateCoverageBorrowed: false;
  crossCandidateCompositionPerformed: false;
  crossCandidateCompositionAuthorized: false;
  centralExecutableRegistryMutationPerformed: false;
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
  rejectionReasons: readonly string[];
  recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE';
  notes: readonly string[];
}

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

function sourceReference(): SourceReference {
  return {
    sourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    sourceType: 'modern_book',
    title: '邵伟华四柱预测学入门',
    author: '陈园',
    editor: '邵伟华（审订）',
    publisher: '广州出版社',
    edition: '1995 first edition',
    publicationYear: 1995,
    language: 'zh-Hans',
    locator: {
      chapter: '第十一章 富贵贫贱',
      section: '第三节 论吉凶',
      anchor: '用神在天干不受克合；用神在地支不受克、合、刑、冲',
    },
    url: 'https://books.google.com/books?id=17JL5BHO_NwC',
    accessedAt: '2026-08-21',
    provenanceTier: 'practitioner_secondary',
    rights: {
      copyrightStatus: 'copyrighted',
      reusePolicy: 'paraphrase_only',
    },
    notes:
      '1995 Guangzhou Publishing House edition; ISBN 7805922519 / 9787805922515. Bibliographic identity was cross-checked against Google Books and WorldCat. Exact text was inspected through an online transcription and is registered only as faithful paraphrase with an edition/chapter/section/anchor locator.',
  };
}

export function i95VerifiedChenYuanSizhuYuceCandidate(): I88DiscoveredAuthorityCandidateInput {
  return {
    sourceReference: sourceReference(),
    evidenceRepresentation: 'FAITHFUL_PARAPHRASE_WITH_EXACT_LOCATOR',
    evidenceTextOrParaphrase:
      'The inspected chapter treats resource/support and peer support as distinct ways of helping a weak day master, while separately discussing whether a useful factor is damaged or protected by stem/branch interactions such as overcoming, combination, punishment, or clash. It also distinguishes support presence from later interaction-dependent usefulness and rescue conditions.',
    exactLocatorStatement:
      '《邵伟华四柱预测学入门》1995 edition, 第十一章「富贵贫贱」第三节「论吉凶」, including the sentence beginning「用神在天干不受克合」and the nearby weak-body 印/比劫 support and rescue discussion.',
    sourceLanguageStatement:
      'Chinese-language modern book; inspected transcription is rendered in simplified Chinese.',
    translationStatus: 'ORIGINAL_LANGUAGE_ONLY',
    scopeStatement:
      'A single coherent modern Four Pillars source discussing weak-body support through 印 and 比劫, useful-factor integrity, damage/protection through tracked stem/branch relations, position-sensitive interaction conditions, and rescue/usefulness consequences.',
    applicabilityStatement:
      'Plausibly relevant to all six frozen I84 requirement topics and therefore admissible for later independent six-slot evaluation; discovery relevance is not a satisfaction verdict.',
    exceptionStatement:
      'The source is not promoted here to a universal NO_TRACKED_RELATION_TOUCH rule. Whether its statements actually satisfy each I84 requirement, including generic untouched persistence and post-interaction semantics, remains unevaluated.',
    provenanceStatement:
      'Modern practitioner-source candidate identified as 陈园, 《邵伟华四柱预测学入门》, 广州出版社, 1995, 244 pages, ISBN 7805922519 / 9787805922515; bibliographic identity cross-verified against Google Books and WorldCat.',
    discoveryTraceStatement:
      'External discovery performed 2026-08-21 under I94. Bibliography was cross-verified using Google Books and WorldCat. Source text was inspected at https://www.wangdailin.com/li/iuuetuf.html, chapter 第十一章 富贵贫贱 / 第三节 论吉凶, with the edition/chapter/section/anchor combination retained as the equivalent reproducible locator. The transcription is evidence-access infrastructure, not a separate authority candidate.',
    requirementSlots: requirementSlots(),
    registrationStatus: 'RESEARCH_CANDIDATE_ONLY',
    methodologyOrRuleApproval: 'NOT_GRANTED',
    executableAuthorityStatus: 'NOT_AUTHORIZED',
    discoveryVerification: {
      sourcePageResolved: true,
      exactLocatorResolved: true,
      sourceTextInspectedAtLocator: true,
      rightsStatementInspected: true,
    },
  };
}

function topicRepresentation(): readonly I95DiscoveryTopicRepresentation[] {
  return [
    {
      requirementId: 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
      topicRepresentedForLaterEvaluation: true,
      representationBasis:
        'The same chapter explicitly conditions useful-factor integrity on whether tracked stem/branch interactions damage or leave it undamaged, making post-interaction untouched semantics a concrete evaluation target.',
      countsAsI84RequirementSatisfied: false,
    },
    {
      requirementId: 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
      topicRepresentedForLaterEvaluation: true,
      representationBasis:
        'The chapter distinguishes having a support/useful factor from whether that factor remains useful after damage, protection, or rescue interactions.',
      countsAsI84RequirementSatisfied: false,
    },
    {
      requirementId: 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
      topicRepresentedForLaterEvaluation: true,
      representationBasis:
        'The chapter separates heavenly-stem and earthly-branch interaction conditions and gives scoped exceptions tied to how the useful factor is affected.',
      countsAsI84RequirementSatisfied: false,
    },
    {
      requirementId: 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
      topicRepresentedForLaterEvaluation: true,
      representationBasis:
        'The same source discusses weak-body support through both 印 and 比劫 without discovery-time numeric weighting or a cross-kind winner verdict.',
      countsAsI84RequirementSatisfied: false,
    },
    {
      requirementId: 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
      topicRepresentedForLaterEvaluation: true,
      representationBasis:
        'The chapter expressly contrasts a useful factor that is not subjected to damaging interactions with one that is damaged, protected, or rescued, creating a concrete persistence-semantics evaluation target.',
      countsAsI84RequirementSatisfied: false,
    },
    {
      requirementId: 'INDEPENDENT_PROVENANCE_BASIS',
      topicRepresentedForLaterEvaluation: true,
      representationBasis:
        'The candidate is one independently identified published book edition with author, publisher, year, ISBN, and reproducible chapter/section/anchor locator.',
      countsAsI84RequirementSatisfied: false,
    },
  ];
}

function i94Accepted(
  i94: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport,
): boolean {
  return (
    i94.status === 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_READINESS' &&
    i94.decision === 'SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_AUTHORIZED_NO_EFFECT_RULE_PROMOTION' &&
    i94.discoveryMode === 'SINGLE_CANDIDATE_FULL_I84_COVERAGE_ONLY' &&
    i94.discoveryRequirements.length === 6 &&
    i94.discoveryRequirements.every(
      (item, index) =>
        item.requirementId === REQUIREMENT_IDS[index] &&
        item.mandatory &&
        item.sameCandidateMustProvideIndependentExactEvidence &&
        item.coverageMayBePreApprovedAtDiscovery === false &&
        item.topicalRelevanceMayCountAsSatisfaction === false &&
        item.scopedExampleMayCountAsUniversalRule === false &&
        item.absenceOfContradictionMayCountAsSatisfaction === false &&
        item.numericCalibrationMaySubstitute === false,
    ) &&
    i94.oneCandidateOnly &&
    i94.candidateMustUseI87RegistrationContract &&
    i94.oneNormalizedSourceReferencePerCandidateRequired &&
    i94.originalSourceInspectionRequired &&
    i94.exactSourceIdentityRequired &&
    i94.exactLocatorRequired &&
    i94.stableRevisionOrEquivalentReproducibleLocatorRequired &&
    i94.sourceLanguageAndTranslationStatusRequired &&
    i94.scopeApplicabilityExceptionProvenanceRequired &&
    i94.coherentSingleSourceAuthorityScopeRequired &&
    i94.everyI84RequirementNeedsIndependentExactEvidenceWithinSameCandidate &&
    i94.allSixRequirementCoverageMustBeEvaluatedAfterRegistration &&
    i94.actualExternalDiscoveryPerformedByThisGate === false &&
    i94.candidateRegisteredByThisGate === false &&
    i94.candidateCoverageEvaluatedByThisGate === false &&
    i94.candidateCoveragePreApprovalAuthorized === false &&
    i94.partialCoverageFallbackAuthorized === false &&
    i94.crossCandidateCompositionAuthorized === false &&
    i94.implicitCrossSourceSynthesisAuthorized === false &&
    i94.multiplePartialCandidatesMaySubstituteForOneFullCandidate === false &&
    i94.searchSnippetMayCountAsAuthorityEvidence === false &&
    i94.modelGeneratedSynthesisMayCountAsAuthorityEvidence === false &&
    i94.secondarySummaryMaySubstituteForOriginalSourceInspection === false &&
    i94.numericCalibrationMayCountAsNormativeAuthority === false &&
    i94.noCandidateFoundMayBeConvertedToDefaultRule === false &&
    i94.methodologyOrRulePromotionAuthorized === false &&
    i94.executableAuthorityAuthorized === false &&
    i94.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i94.sourceActivationVerdictAuthorized === false &&
    i94.sourcePersistenceVerdictAuthorized === false &&
    i94.sourceEffectiveSupportVerdictAuthorized === false &&
    i94.relativeForceVerdictAuthorized === false &&
    i94.crossRelationPrecedenceAuthorized === false &&
    i94.classificationAuthorized === false &&
    i94.numericScoringAuthorized === false &&
    i94.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE'
  );
}

function evidenceId(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport, 'evidenceId'>,
): string {
  return `challenge_combination_support_channel_untouched_support_single_candidate_discovery_evidence_${deterministicContentHash(material).slice(0, 24)}`;
}

function unresolved(
  i87: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  i94: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport {
  const material = {
    evidenceVersion:
      I95_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    status: 'I87_OR_I94_UNRESOLVED_OR_INVALID' as const,
    decision: 'NO_CANDIDATE_REGISTERED' as const,
    upstreamI87ReviewId: i87.reviewId,
    upstreamI94ReviewId: i94.reviewId,
    externalDiscoveryPerformed: true,
    discoverySearchScope: ['classical texts', 'modern Four Pillars books', 'bibliographic catalogs'],
    inspectedCandidateFamilyCount: 3,
    registeredCandidateCount: 0,
    registeredCandidate: null,
    discoveryTopicRepresentation: [],
    allSixRequirementTopicsRepresentedForLaterEvaluation: false,
    allSixRequirementSlotsRemainNotEvaluated: false,
    candidateRequirementEvaluationPerformedByThisGate: false as const,
    candidateSatisfiesAllI84Requirements: 'not_evaluated' as const,
    candidateAcceptedForUntouchedSupportAuthority: false as const,
    sourceBibliographyCrossVerified: false,
    originalSourceTextInspectedViaTranscription: false,
    exactBookEditionIdentityResolved: false,
    equivalentReproducibleLocatorResolved: false,
    exactLocatorResolved: false,
    candidateRegisteredThroughI87ContractReuse: false,
    oneCandidateOnly: true as const,
    priorI88CandidateCoverageBorrowed: false as const,
    priorI91CandidateCoverageBorrowed: false as const,
    crossCandidateCompositionPerformed: false as const,
    crossCandidateCompositionAuthorized: false as const,
    centralExecutableRegistryMutationPerformed: false as const,
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
    rejectionReasons: ['Resolved I87 registration contract and exact I94 discovery-readiness contract are required.'],
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE' as const,
    notes: [
      'Discovery evidence remains fail-closed when upstream registration or full-coverage discovery readiness authority is unresolved or guard-incompatible.',
    ],
  };
  return { evidenceId: evidenceId(material), ...material };
}

export function buildI95ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidence(
  i87: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  i94: ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryReadinessReviewReport,
  candidate: I88DiscoveredAuthorityCandidateInput = i95VerifiedChenYuanSizhuYuceCandidate(),
): ChallengeCombinationSupportChannelUntouchedSupportEffectSingleCandidateFullCoverageAuthorityDiscoveryEvidenceReport {
  if (!i94Accepted(i94)) return unresolved(i87, i94);

  const registration =
    buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
      i87,
      candidate,
    );

  if (
    registration.status !== 'RESOLVED_DISCOVERY_AND_REGISTRATION_EVIDENCE' ||
    registration.decision !==
      'VERIFIED_DISCOVERED_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED' ||
    registration.registeredCandidate === null
  ) {
    const material = {
      evidenceVersion:
        I95_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
      status: 'CANDIDATE_REGISTRATION_REJECTED' as const,
      decision: 'NO_CANDIDATE_REGISTERED' as const,
      upstreamI87ReviewId: i87.reviewId,
      upstreamI94ReviewId: i94.reviewId,
      externalDiscoveryPerformed: true,
      discoverySearchScope: ['classical texts', 'modern Four Pillars books', 'bibliographic catalogs'],
      inspectedCandidateFamilyCount: 3,
      registeredCandidateCount: 0,
      registeredCandidate: null,
      discoveryTopicRepresentation: [],
      allSixRequirementTopicsRepresentedForLaterEvaluation: false,
      allSixRequirementSlotsRemainNotEvaluated: false,
      candidateRequirementEvaluationPerformedByThisGate: false as const,
      candidateSatisfiesAllI84Requirements: 'not_evaluated' as const,
      candidateAcceptedForUntouchedSupportAuthority: false as const,
      sourceBibliographyCrossVerified: true,
      originalSourceTextInspectedViaTranscription: true,
      exactBookEditionIdentityResolved: true,
      equivalentReproducibleLocatorResolved: true,
      exactLocatorResolved: candidate.discoveryVerification.exactLocatorResolved,
      candidateRegisteredThroughI87ContractReuse: false,
      oneCandidateOnly: true as const,
      priorI88CandidateCoverageBorrowed: false as const,
      priorI91CandidateCoverageBorrowed: false as const,
      crossCandidateCompositionPerformed: false as const,
      crossCandidateCompositionAuthorized: false as const,
      centralExecutableRegistryMutationPerformed: false as const,
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
      rejectionReasons: registration.rejectionReasons,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE' as const,
      notes: [
        'The plausible candidate is not retained when the frozen I87 registration contract rejects its normalized evidence object.',
      ],
    };
    return { evidenceId: evidenceId(material), ...material };
  }

  const representation = topicRepresentation();
  const registeredCandidate = registration.registeredCandidate;
  const material = {
    evidenceVersion:
      I95_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_FULL_COVERAGE_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    status: 'RESOLVED_SINGLE_CANDIDATE_FULL_COVERAGE_DISCOVERY_EVIDENCE' as const,
    decision:
      'ONE_PLAUSIBLE_FULL_COVERAGE_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED' as const,
    upstreamI87ReviewId: i87.reviewId,
    upstreamI94ReviewId: i94.reviewId,
    externalDiscoveryPerformed: true,
    discoverySearchScope: ['classical texts', 'modern Four Pillars books', 'bibliographic catalogs'],
    inspectedCandidateFamilyCount: 3,
    registeredCandidateCount: 1,
    registeredCandidate,
    discoveryTopicRepresentation: representation,
    allSixRequirementTopicsRepresentedForLaterEvaluation:
      representation.length === REQUIREMENT_IDS.length &&
      representation.every((item, index) => item.requirementId === REQUIREMENT_IDS[index]),
    allSixRequirementSlotsRemainNotEvaluated:
      registeredCandidate.requirementSlots.length === REQUIREMENT_IDS.length &&
      registeredCandidate.requirementSlots.every((slot) => slot.coverageState === 'NOT_EVALUATED'),
    candidateRequirementEvaluationPerformedByThisGate: false as const,
    candidateSatisfiesAllI84Requirements: 'not_evaluated' as const,
    candidateAcceptedForUntouchedSupportAuthority: false as const,
    sourceBibliographyCrossVerified: true,
    originalSourceTextInspectedViaTranscription: true,
    exactBookEditionIdentityResolved: true,
    equivalentReproducibleLocatorResolved: true,
    exactLocatorResolved: true,
    candidateRegisteredThroughI87ContractReuse: true,
    oneCandidateOnly: true as const,
    priorI88CandidateCoverageBorrowed: false as const,
    priorI91CandidateCoverageBorrowed: false as const,
    crossCandidateCompositionPerformed: false as const,
    crossCandidateCompositionAuthorized: false as const,
    centralExecutableRegistryMutationPerformed: false as const,
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
    rejectionReasons: [],
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SINGLE_CANDIDATE_I84_FULL_COVERAGE_EVALUATION_EVIDENCE' as const,
    notes: [
      'I95 registers one modern-book research candidate because one coherent published source contains text relevant to all six I84 evaluation topics. Topic representation is discovery admission evidence only, not requirement satisfaction.',
      'The 1995 edition identity is stabilized by author, title, publisher, year, ISBN, chapter, section, and anchor; a web transcription was used only to inspect the exact source text and is not registered as a separate authority candidate.',
      'All six I84 requirement slots remain NOT_EVALUATED. I96 must evaluate each slot independently from the registered candidate without borrowing coverage from I88 or I91.',
      'No ACTIVE, PERSISTED, effective-support, relative-force, precedence, scoring, or strong/weak classification rule is authorized.',
    ],
  };
  return { evidenceId: evidenceId(material), ...material };
}
