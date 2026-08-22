import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { SourceReference } from '../contracts/interpretation.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  I87CandidateRequirementRegistrationSlot,
  I87UntouchedSupportAuthorityCandidateRegistrationDraft,
} from './i87-challenge-combination-support-channel-untouched-support-effect-authority-candidate-registration-contract.js';

export const I88_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_REGISTRATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-authority-candidate-discovery-registration-evidence-v1';

export interface I88DiscoveredAuthorityCandidateInput
  extends Omit<I87UntouchedSupportAuthorityCandidateRegistrationDraft, 'candidateRegistrationId'> {
  discoveryVerification: {
    sourcePageResolved: boolean;
    exactLocatorResolved: boolean;
    sourceTextInspectedAtLocator: boolean;
    rightsStatementInspected: boolean;
  };
}

export interface I88RegisteredAuthorityCandidate
  extends I87UntouchedSupportAuthorityCandidateRegistrationDraft {
  registrationEvidenceVersion: string;
  discoveryVerification: I88DiscoveredAuthorityCandidateInput['discoveryVerification'];
  candidateRequirementEvaluationStatus: 'NOT_STARTED';
  centralExecutableRegistryMutationPerformed: false;
  sourceReferenceApprovedForMethodologyOrRuleUse: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_DISCOVERY_AND_REGISTRATION_EVIDENCE'
    | 'I87_UNRESOLVED_OR_INVALID'
    | 'CANDIDATE_REGISTRATION_REJECTED';
  decision:
    | 'VERIFIED_DISCOVERED_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED'
    | 'CANDIDATE_NOT_REGISTERED';
  upstreamI87ReviewId: string;
  externalDiscoveryPerformed: boolean;
  verifiedCandidateCount: number;
  rejectedCandidateCount: number;
  registeredCandidate: I88RegisteredAuthorityCandidate | null;
  sourcePageResolved: boolean;
  exactLocatorResolved: boolean;
  sourceTextInspectedAtLocator: boolean;
  rightsStatementInspected: boolean;
  sourceReferenceNormalized: boolean;
  candidateRegistrationContentAddressed: boolean;
  allI84RequirementSlotsRemainNotEvaluated: boolean;
  sourceRegistrationMeansRequirementSatisfied: false;
  sourceRegistrationMeansMethodologyApproved: false;
  sourceRegistrationMeansRuleApproved: false;
  sourceRegistrationMeansExecutableAuthority: false;
  centralExecutableRegistryMutationPerformed: false;
  candidateRequirementEvaluationPerformedByThisGate: false;
  crossCandidateSynthesisAuthorized: false;
  newNormativeUntouchedSupportPolicyAuthorized: false;
  untouchedSupportEffectRuleImplementationAuthorized: false;
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
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE'
    | 'REPEAT_DISCOVERY_WITH_VERIFIED_EXACT_LOCATOR';
  notes: readonly string[];
}

const REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
  'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
  'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
  'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
  'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
  'INDEPENDENT_PROVENANCE_BASIS',
] as const);

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
    sourceId: 'source_ditiansui_tiyong_wikisource_2017_oldid844358',
    sourceType: 'classical_text',
    title: '滴天髓',
    language: 'zh-Hans',
    locator: {
      chapter: '10',
      section: '体用论',
      anchor: '提纲财官食神太旺，则取年月时上印比生助为喜神而用之',
    },
    url: 'https://zh.wikisource.org/w/index.php?title=滴天髓/10&oldid=844358',
    accessedAt: '2026-08-21',
    provenanceTier: 'primary',
    rights: {
      copyrightStatus: 'public_domain',
      reusePolicy: 'paraphrase_only',
    },
    notes:
      'Research candidate uses the Wikisource historical revision linked from the inspected page. Traditional authorship attribution is not used as a registration premise.',
  };
}

export function i88VerifiedDitiansuiTiyongCandidate(): I88DiscoveredAuthorityCandidateInput {
  return {
    sourceReference: sourceReference(),
    evidenceRepresentation: 'FAITHFUL_PARAPHRASE_WITH_EXACT_LOCATOR',
    evidenceTextOrParaphrase:
      'In the body/use discussion, when the seasonal framework is excessively strong in wealth, officer, or output terms, support may be sought from seal or peer elements located in the year, month, or hour positions. The passage is position- and structure-sensitive; it does not state a universal untouched-source persistence rule.',
    exactLocatorStatement:
      '《滴天髓》 chapter 10, 体用论, paragraph stating that when 提纲财官食神 is too strong, 年月时上的印比 may 生助 and be used as 喜神; Wikisource historical revision oldid=844358.',
    sourceLanguageStatement: 'Inspected in Chinese on Wikisource; page rendered in simplified Chinese.',
    translationStatus: 'ORIGINAL_LANGUAGE_ONLY',
    scopeStatement:
      'Body/use framework for an overly strong seasonal framework where seal/peer support is selected from year, month, or hour positions.',
    applicabilityStatement:
      'Relevant as a candidate basis for support-source kind and position semantics only; later I84 evaluation must decide whether it says anything about untouched post-interaction persistence or effective support.',
    exceptionStatement:
      'The passage does not itself establish that absence of tracked clash/combination contact guarantees ACTIVE, PERSISTED, or effective-support status, and it does not resolve competing-relation precedence or support magnitude.',
    provenanceStatement:
      'Primary-text research candidate from Wikisource transcription of a public-domain classical work; exact historical page revision and chapter/section locator are preserved.',
    discoveryTraceStatement:
      'Discovered and inspected on 2026-08-21 through web research for classical BaZi support semantics; the source page, exact passage location, historical revision link, and public-domain statement were inspected before registration.',
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

function i87Accepted(
  i87: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
): boolean {
  return (
    i87.status === 'RESOLVED_CANDIDATE_REGISTRATION_CONTRACT' &&
    i87.decision === 'CANDIDATE_REGISTRATION_CONTRACT_FROZEN_NO_SOURCE_REGISTERED_OR_APPROVED' &&
    i87.registrationContractFrozen &&
    i87.sourceReferenceContractReusedWithoutParallelRegistry &&
    i87.evidenceRepresentationRequired &&
    i87.exactLocatorStatementRequired &&
    i87.sourceLanguageStatementRequired &&
    i87.translationStatusRequired &&
    i87.scopeStatementRequired &&
    i87.applicabilityStatementRequired &&
    i87.exceptionStatementRequired &&
    i87.provenanceStatementRequired &&
    i87.discoveryTraceStatementRequired &&
    i87.allSixI84RequirementSlotsRequired &&
    i87.requirementSlotsInitializedAsNotEvaluated &&
    i87.candidateRegistrationIdMustBeContentAddressed &&
    i87.searchSnippetMayPopulateAuthorityEvidenceWithoutSourceVerification === false &&
    i87.requirementCoverageMayBePreApprovedAtRegistration === false &&
    i87.methodologyOrRuleApprovalAuthorized === false &&
    i87.executableAuthorityAuthorized === false &&
    i87.crossCandidateSynthesisAuthorized === false &&
    i87.untouchedSupportEffectRuleImplementationAuthorized === false &&
    i87.sourceActivationVerdictAuthorized === false &&
    i87.sourcePersistenceVerdictAuthorized === false &&
    i87.sourceEffectiveSupportVerdictAuthorized === false &&
    i87.relativeForceVerdictAuthorized === false &&
    i87.crossRelationPrecedenceAuthorized === false &&
    i87.classificationAuthorized === false &&
    i87.numericScoringAuthorized === false &&
    i87.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_AND_REGISTRATION_EVIDENCE'
  );
}

function nonEmpty(value: string | undefined): boolean {
  return value !== undefined && value.trim().length > 0 && value !== 'REQUIRED_NOT_POPULATED';
}

function candidateRejectionReasons(candidate: I88DiscoveredAuthorityCandidateInput): string[] {
  const reasons: string[] = [];
  const source = candidate.sourceReference;
  if (!nonEmpty(source.sourceId)) reasons.push('sourceReference.sourceId missing');
  if (!nonEmpty(source.title)) reasons.push('sourceReference.title missing');
  if (!nonEmpty(source.sourceType)) reasons.push('sourceReference.sourceType missing');
  if (!nonEmpty(source.provenanceTier)) reasons.push('sourceReference.provenanceTier missing');
  if (!nonEmpty(source.locator?.chapter) && !nonEmpty(source.locator?.section) && !nonEmpty(source.locator?.page) && !nonEmpty(source.locator?.anchor)) {
    reasons.push('sourceReference exact locator missing');
  }
  if (!nonEmpty(candidate.evidenceTextOrParaphrase)) reasons.push('evidence text/paraphrase missing');
  if (!nonEmpty(candidate.exactLocatorStatement)) reasons.push('exact locator statement missing');
  if (!nonEmpty(candidate.sourceLanguageStatement)) reasons.push('source language statement missing');
  if (!nonEmpty(candidate.scopeStatement)) reasons.push('scope statement missing');
  if (!nonEmpty(candidate.applicabilityStatement)) reasons.push('applicability statement missing');
  if (!nonEmpty(candidate.exceptionStatement)) reasons.push('exception statement missing');
  if (!nonEmpty(candidate.provenanceStatement)) reasons.push('provenance statement missing');
  if (!nonEmpty(candidate.discoveryTraceStatement)) reasons.push('discovery trace statement missing');
  if (candidate.requirementSlots.length !== REQUIREMENT_IDS.length) reasons.push('all six I84 requirement slots required');
  const slotIds = candidate.requirementSlots.map((slot) => slot.requirementId);
  if (REQUIREMENT_IDS.some((id) => !slotIds.includes(id))) reasons.push('I84 requirement slot identity mismatch');
  if (candidate.requirementSlots.some((slot) => slot.coverageState !== 'NOT_EVALUATED')) reasons.push('requirement coverage pre-evaluated at registration');
  if (
    candidate.requirementSlots.some(
      (slot) =>
        slot.evidenceMayBeInferredFromRelevance ||
        slot.evidenceMayBeInferredFromSourceType ||
        slot.evidenceMayBeInferredFromProvenanceTier ||
        slot.evidenceMayBeInferredFromNoContestLanguage ||
        slot.evidenceMayBeInferredFromSupportLanguage,
    )
  ) {
    reasons.push('requirement inference shortcut enabled');
  }
  if (candidate.registrationStatus !== 'RESEARCH_CANDIDATE_ONLY') reasons.push('registration status must remain research-only');
  if (candidate.methodologyOrRuleApproval !== 'NOT_GRANTED') reasons.push('methodology/rule approval must remain not granted');
  if (candidate.executableAuthorityStatus !== 'NOT_AUTHORIZED') reasons.push('executable authority must remain not authorized');
  if (!candidate.discoveryVerification.sourcePageResolved) reasons.push('source page not resolved');
  if (!candidate.discoveryVerification.exactLocatorResolved) reasons.push('exact locator not resolved');
  if (!candidate.discoveryVerification.sourceTextInspectedAtLocator) reasons.push('source text not inspected at locator');
  if (!candidate.discoveryVerification.rightsStatementInspected) reasons.push('rights statement not inspected');
  return reasons.sort();
}

function evidenceId(material: unknown): string {
  return `challenge_combination_support_channel_untouched_support_candidate_evidence_${deterministicContentHash(material).slice(0, 24)}`;
}

export function buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
  i87: ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  candidate: I88DiscoveredAuthorityCandidateInput = i88VerifiedDitiansuiTiyongCandidate(),
): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidenceReport {
  const base = {
    evidenceVersion:
      I88_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_REGISTRATION_EVIDENCE_VERSION,
    upstreamI87ReviewId: i87.reviewId,
    sourceRegistrationMeansRequirementSatisfied: false as const,
    sourceRegistrationMeansMethodologyApproved: false as const,
    sourceRegistrationMeansRuleApproved: false as const,
    sourceRegistrationMeansExecutableAuthority: false as const,
    centralExecutableRegistryMutationPerformed: false as const,
    candidateRequirementEvaluationPerformedByThisGate: false as const,
    crossCandidateSynthesisAuthorized: false as const,
    newNormativeUntouchedSupportPolicyAuthorized: false as const,
    untouchedSupportEffectRuleImplementationAuthorized: false as const,
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
  };

  if (!i87Accepted(i87)) {
    const material = {
      ...base,
      status: 'I87_UNRESOLVED_OR_INVALID' as const,
      decision: 'CANDIDATE_NOT_REGISTERED' as const,
      externalDiscoveryPerformed: true,
      verifiedCandidateCount: 0,
      rejectedCandidateCount: 1,
      registeredCandidate: null,
      sourcePageResolved: candidate.discoveryVerification.sourcePageResolved,
      exactLocatorResolved: candidate.discoveryVerification.exactLocatorResolved,
      sourceTextInspectedAtLocator: candidate.discoveryVerification.sourceTextInspectedAtLocator,
      rightsStatementInspected: candidate.discoveryVerification.rightsStatementInspected,
      sourceReferenceNormalized: false,
      candidateRegistrationContentAddressed: false,
      allI84RequirementSlotsRemainNotEvaluated: false,
      rejectionReasons: ['Resolved fail-closed I87 registration contract required.'],
      recommendedNextGate: 'REPEAT_DISCOVERY_WITH_VERIFIED_EXACT_LOCATOR' as const,
      notes: ['Candidate material is not registered when the upstream I87 contract is unresolved or guard-incompatible.'],
    };
    return { evidenceId: evidenceId(material), ...material };
  }

  const rejectionReasons = candidateRejectionReasons(candidate);
  if (rejectionReasons.length > 0) {
    const material = {
      ...base,
      status: 'CANDIDATE_REGISTRATION_REJECTED' as const,
      decision: 'CANDIDATE_NOT_REGISTERED' as const,
      externalDiscoveryPerformed: true,
      verifiedCandidateCount: 0,
      rejectedCandidateCount: 1,
      registeredCandidate: null,
      sourcePageResolved: candidate.discoveryVerification.sourcePageResolved,
      exactLocatorResolved: candidate.discoveryVerification.exactLocatorResolved,
      sourceTextInspectedAtLocator: candidate.discoveryVerification.sourceTextInspectedAtLocator,
      rightsStatementInspected: candidate.discoveryVerification.rightsStatementInspected,
      sourceReferenceNormalized: false,
      candidateRegistrationContentAddressed: false,
      allI84RequirementSlotsRemainNotEvaluated: false,
      rejectionReasons,
      recommendedNextGate: 'REPEAT_DISCOVERY_WITH_VERIFIED_EXACT_LOCATOR' as const,
      notes: ['I88 rejects incomplete or pre-evaluated candidate material rather than guessing missing provenance, scope, locator, or requirement coverage.'],
    };
    return { evidenceId: evidenceId(material), ...material };
  }

  const registrationMaterial = {
    sourceReference: candidate.sourceReference,
    evidenceRepresentation: candidate.evidenceRepresentation,
    evidenceTextOrParaphrase: candidate.evidenceTextOrParaphrase,
    exactLocatorStatement: candidate.exactLocatorStatement,
    sourceLanguageStatement: candidate.sourceLanguageStatement,
    translationStatus: candidate.translationStatus,
    scopeStatement: candidate.scopeStatement,
    applicabilityStatement: candidate.applicabilityStatement,
    exceptionStatement: candidate.exceptionStatement,
    provenanceStatement: candidate.provenanceStatement,
    discoveryTraceStatement: candidate.discoveryTraceStatement,
    requirementSlots: candidate.requirementSlots,
    registrationStatus: candidate.registrationStatus,
    methodologyOrRuleApproval: candidate.methodologyOrRuleApproval,
    executableAuthorityStatus: candidate.executableAuthorityStatus,
  };
  const candidateRegistrationId = `untouched_support_candidate_${deterministicContentHash(registrationMaterial).slice(0, 24)}`;
  const registeredCandidate: I88RegisteredAuthorityCandidate = {
    candidateRegistrationId,
    ...registrationMaterial,
    registrationEvidenceVersion:
      I88_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_REGISTRATION_EVIDENCE_VERSION,
    discoveryVerification: candidate.discoveryVerification,
    candidateRequirementEvaluationStatus: 'NOT_STARTED',
    centralExecutableRegistryMutationPerformed: false,
    sourceReferenceApprovedForMethodologyOrRuleUse: false,
  };
  const material = {
    ...base,
    status: 'RESOLVED_DISCOVERY_AND_REGISTRATION_EVIDENCE' as const,
    decision:
      'VERIFIED_DISCOVERED_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED' as const,
    externalDiscoveryPerformed: true,
    verifiedCandidateCount: 1,
    rejectedCandidateCount: 0,
    registeredCandidate,
    sourcePageResolved: true,
    exactLocatorResolved: true,
    sourceTextInspectedAtLocator: true,
    rightsStatementInspected: true,
    sourceReferenceNormalized: true,
    candidateRegistrationContentAddressed: true,
    allI84RequirementSlotsRemainNotEvaluated: true,
    rejectionReasons: [] as readonly string[],
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE' as const,
    notes: [
      'I88 registers one externally discovered primary-text research candidate with a verified exact locator and inspected rights statement.',
      'The candidate supports later evaluation of support kind and position semantics, but registration does not assert that any I84 requirement is satisfied.',
      'The candidate passage does not by itself authorize a universal NO_TRACKED_RELATION_TOUCH -> ACTIVE/PERSISTED/effective-support rule.',
      'No central executable registry mutation, methodology/rule approval, cross-candidate synthesis, effect resolution, relative-force verdict, precedence, scoring, or production classification is performed.',
    ],
  };
  return { evidenceId: evidenceId(material), ...material };
}
