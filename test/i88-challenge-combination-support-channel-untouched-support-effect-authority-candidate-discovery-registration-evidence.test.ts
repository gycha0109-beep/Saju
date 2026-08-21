import { describe, expect, test } from 'vitest';
import {
  buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence,
  i88VerifiedDitiansuiTiyongCandidate,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport,
  type I88DiscoveredAuthorityCandidateInput,
} from '../src/index.js';

function i87(): ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport {
  return {
    reviewId: 'i87_i88_fixture',
    status: 'RESOLVED_CANDIDATE_REGISTRATION_CONTRACT',
    decision: 'CANDIDATE_REGISTRATION_CONTRACT_FROZEN_NO_SOURCE_REGISTERED_OR_APPROVED',
    registrationContractFrozen: true,
    sourceReferenceContractReusedWithoutParallelRegistry: true,
    evidenceRepresentationRequired: true,
    exactLocatorStatementRequired: true,
    sourceLanguageStatementRequired: true,
    translationStatusRequired: true,
    scopeStatementRequired: true,
    applicabilityStatementRequired: true,
    exceptionStatementRequired: true,
    provenanceStatementRequired: true,
    discoveryTraceStatementRequired: true,
    allSixI84RequirementSlotsRequired: true,
    requirementSlotsInitializedAsNotEvaluated: true,
    candidateRegistrationIdMustBeContentAddressed: true,
    searchSnippetMayPopulateAuthorityEvidenceWithoutSourceVerification: false,
    requirementCoverageMayBePreApprovedAtRegistration: false,
    methodologyOrRuleApprovalAuthorized: false,
    executableAuthorityAuthorized: false,
    crossCandidateSynthesisAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_DISCOVERY_AND_REGISTRATION_EVIDENCE',
  } as ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport;
}

describe('I88 untouched support effect authority candidate discovery and registration evidence', () => {
  test('registers the verified Ditiansui candidate as research-only evidence', () => {
    const report =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
      );
    expect(report.status).toBe('RESOLVED_DISCOVERY_AND_REGISTRATION_EVIDENCE');
    expect(report.decision).toBe(
      'VERIFIED_DISCOVERED_CANDIDATE_REGISTERED_RESEARCH_ONLY_REQUIREMENTS_NOT_EVALUATED',
    );
    expect(report.verifiedCandidateCount).toBe(1);
    expect(report.rejectedCandidateCount).toBe(0);
    expect(report.registeredCandidate?.registrationStatus).toBe('RESEARCH_CANDIDATE_ONLY');
  });

  test('preserves exact source identity, historical page revision, locator, and public-domain rights metadata', () => {
    const report =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
      );
    const source = report.registeredCandidate?.sourceReference;
    expect(source?.sourceId).toBe('source_ditiansui_tiyong_wikisource_2017_oldid844358');
    expect(source?.sourceType).toBe('classical_text');
    expect(source?.locator?.chapter).toBe('10');
    expect(source?.locator?.section).toBe('体用论');
    expect(source?.locator?.anchor).toContain('年月时上印比生助');
    expect(source?.url).toContain('oldid=844358');
    expect(source?.rights?.copyrightStatus).toBe('public_domain');
  });

  test('keeps every I84 requirement slot NOT_EVALUATED after registration', () => {
    const report =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
      );
    expect(report.allI84RequirementSlotsRemainNotEvaluated).toBe(true);
    expect(report.registeredCandidate?.requirementSlots).toHaveLength(6);
    expect(
      report.registeredCandidate?.requirementSlots.every(
        (slot) => slot.coverageState === 'NOT_EVALUATED',
      ),
    ).toBe(true);
    expect(report.candidateRequirementEvaluationPerformedByThisGate).toBe(false);
  });

  test('assigns a deterministic content-addressed registration id', () => {
    const first =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
      );
    const second =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
      );
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.registeredCandidate?.candidateRegistrationId).toBe(
      second.registeredCandidate?.candidateRegistrationId,
    );
    expect(first.registeredCandidate?.candidateRegistrationId).toMatch(
      /^untouched_support_candidate_[a-f0-9]{24}$/,
    );
  });

  test('rejects a discovered candidate when the exact locator is absent', () => {
    const candidate = i88VerifiedDitiansuiTiyongCandidate();
    const { locator, ...sourceReferenceWithoutLocator } = candidate.sourceReference;
    void locator;
    const invalid: I88DiscoveredAuthorityCandidateInput = {
      ...candidate,
      sourceReference: sourceReferenceWithoutLocator,
      exactLocatorStatement: '',
    };
    const report =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
        invalid,
      );
    expect(report.status).toBe('CANDIDATE_REGISTRATION_REJECTED');
    expect(report.registeredCandidate).toBeNull();
    expect(report.rejectionReasons).toContain('sourceReference exact locator missing');
    expect(report.rejectionReasons).toContain('exact locator statement missing');
  });

  test('rejects pre-evaluated requirement coverage at registration time', () => {
    const candidate = i88VerifiedDitiansuiTiyongCandidate();
    const invalid = {
      ...candidate,
      requirementSlots: candidate.requirementSlots.map((slot, index) =>
        index === 0 ? { ...slot, coverageState: 'SATISFIED' } : slot,
      ),
    } as unknown as I88DiscoveredAuthorityCandidateInput;
    const report =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
        invalid,
      );
    expect(report.status).toBe('CANDIDATE_REGISTRATION_REJECTED');
    expect(report.rejectionReasons).toContain('requirement coverage pre-evaluated at registration');
  });

  test('fails closed when the upstream I87 contract is guard-incompatible', () => {
    const invalidI87 = {
      ...i87(),
      sourceEffectiveSupportVerdictAuthorized: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateRegistrationContractReport;
    const report =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        invalidI87,
      );
    expect(report.status).toBe('I87_UNRESOLVED_OR_INVALID');
    expect(report.registeredCandidate).toBeNull();
    expect(report.verifiedCandidateCount).toBe(0);
  });

  test('preserves executable-authority, effect, relative-force, precedence, scoring, and classifier guards', () => {
    const report =
      buildI88ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateDiscoveryRegistrationEvidence(
        i87(),
      );
    expect(report.centralExecutableRegistryMutationPerformed).toBe(false);
    expect(report.sourceRegistrationMeansMethodologyApproved).toBe(false);
    expect(report.sourceRegistrationMeansRuleApproved).toBe(false);
    expect(report.sourceRegistrationMeansExecutableAuthority).toBe(false);
    expect(report.registeredCandidate?.sourceReferenceApprovedForMethodologyOrRuleUse).toBe(false);
    expect(report.untouchedSupportEffectRuleImplementationAuthorized).toBe(false);
    expect(report.sourceActivationVerdictAuthorized).toBe(false);
    expect(report.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(report.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_I84_REQUIREMENT_COVERAGE_EVIDENCE',
    );
  });
});
