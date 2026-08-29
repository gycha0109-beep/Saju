import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8B64ClashMethodProposalShape } from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION,
  CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS,
  CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS,
  CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-enforcement-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
  CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS,
  CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT,
  CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContract,
  evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';

const COMPLIANT_SHAPE = Object.freeze({
  resolvesSemanticEffectFromClashPresenceAlone: false,
  assumesContextFreeUniformDamage: false,
  usesFixedNumericClashOffsetMultiplierOrScalar: false,
  dropsSourceRequiredContextOrAffectedTargetRole: false,
  flattensQualitativelyDivergentEffectClasses: false,
} satisfies CareerT8B64ClashMethodProposalShape);

function acceptedB66(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW',
    decision:
      'DIRECT_CORE_REGISTRY_ENFORCEMENT_NOT_READY_EXPLICIT_APPLICABILITY_AND_CONTENT_ADDRESSED_RESEARCH_ADMISSION_ADAPTER_REQUIRED_ADAPTER_CONTRACT_AUTHORING_READY',
    upstreamB65AuditId: 'b65_fixture_for_b67',
    exactB65BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    capabilityFindings: CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS,
    capabilityFindingCount: 5,
    missingCapabilityCount: 5,
    directCoreRegistryEnforcementReady: false,
    implicitApplicabilityInferenceAuthorized: false,
    explicitApplicabilityDeclarationRequired: true,
    contentAddressedSubjectBindingRequired: true,
    declaredB64ProposalShapeBindingRequired: true,
    deterministicB64GuardEvaluationBindingRequired: true,
    failClosedOnMissingApplicability: true,
    failClosedOnSubjectContentMismatch: true,
    failClosedOnIncompleteGuardProposalShape: true,
    ruleDefinitionSchemaMutationAuthorized: false,
    methodologyDefinitionSchemaMutationAuthorized: false,
    reviewAttestationSchemaMutationAuthorized: false,
    coreRuleRegistryMutationAuthorized: false,
    dedicatedResearchAdmissionAdapterContractAuthoringReady: true,
    researchAdmissionEnforcementIntegrated: false,
    immediatelyExecutableAdapterContractLaneCount: 1,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT',
    positiveT6InputContractEstablished: false,
    positiveClashEffectContractEstablished: false,
    branchSourceOrMethodTriggerActivationCount: 0,
    currentCareerSemanticBridgeEstablished: false,
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t5RuleAuthoringAuthorizedByThisGate: false,
    t6PositiveEffectRuleAuthoringAuthorizedByThisGate: false,
    t8RuleAuthoringAuthorizedByThisGate: false,
    consumerNarrativeAuthorizedByThisGate: false,
    productionEnforcementAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      readinessReviewsCreated: 1,
      repositoryCapabilityFindingsRecorded: 5,
      admissionAdaptersCreated: 0,
      coreContractSchemasChanged: 0,
      coreRegistryBehaviorsChanged: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT',
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_admission_enforcement_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function fixtureRule() {
  return Object.freeze({
    ruleId: 'RULE-B67-EXPLICIT-ADMISSION-FIXTURE',
    version: '0.1.0-research',
    ruleSetId: 'b67-fixture',
    title: 'B67 fixture',
  });
}

function admittedCandidate() {
  const content = fixtureRule();
  return {
    applicability: CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
    subjectType: 'rule' as const,
    subjectRef: {
      id: content.ruleId,
      version: content.version,
      contentHash: deterministicContentHash(content),
    },
    subjectContent: content,
    proposalShape: COMPLIANT_SHAPE,
  };
}

describe('Career T8 classical Zi-Ping B64 explicit-applicability research admission adapter', () => {
  test('admits only an explicitly applicable, content-addressed, identity-bound and guard-compatible proposal', () => {
    const decision =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate(
        admittedCandidate(),
      );

    expect(decision.status).toBe('ADMITTED_RESEARCH_METHOD_PROPOSAL');
    expect(decision.explicitlyApplicable).toBe(true);
    expect(decision.subjectContentBound).toBe(true);
    expect(decision.subjectIdentityBound).toBe(true);
    expect(decision.proposalShape).toEqual(COMPLIANT_SHAPE);
    expect(decision.guardEvaluation?.accepted).toBe(true);
    expect(decision.guardEvaluation?.violationCount).toBe(0);
    expect(decision.rejectionReasonIds).toEqual([]);
    expect(decision.researchOnly).toBe(true);
    expect(decision.coreRegistryIntegrated).toBe(false);
    expect(decision.productionAuthorized).toBe(false);
  });

  test('fails closed when explicit applicability is missing rather than inferring it from the subject', () => {
    const { applicability: _applicability, ...candidate } = admittedCandidate();
    const decision =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate(candidate);

    expect(decision.status).toBe('REJECTED_RESEARCH_METHOD_PROPOSAL');
    expect(decision.explicitlyApplicable).toBe(false);
    expect(decision.rejectionReasonIds).toContain(
      'EXPLICIT_B64_APPLICABILITY_DECLARATION_REQUIRED',
    );
  });

  test('fails closed on content-hash mismatch and identity mismatch independently', () => {
    const hashMismatch = admittedCandidate();
    const badHashDecision =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate({
        ...hashMismatch,
        subjectRef: { ...hashMismatch.subjectRef, contentHash: '0'.repeat(64) },
      });
    expect(badHashDecision.status).toBe('REJECTED_RESEARCH_METHOD_PROPOSAL');
    expect(badHashDecision.rejectionReasonIds).toContain('SUBJECT_CONTENT_HASH_MISMATCH');

    const identityMismatch = admittedCandidate();
    const badIdentityDecision =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate({
        ...identityMismatch,
        subjectRef: { ...identityMismatch.subjectRef, id: 'RULE-B67-WRONG-ID' },
      });
    expect(badIdentityDecision.subjectContentBound).toBe(true);
    expect(badIdentityDecision.subjectIdentityBound).toBe(false);
    expect(badIdentityDecision.rejectionReasonIds).toContain('SUBJECT_IDENTITY_MISMATCH');
  });

  test('fails closed when any B64 proposal-shape field is absent', () => {
    const candidate = admittedCandidate();
    const decision =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate({
        ...candidate,
        proposalShape: {
          resolvesSemanticEffectFromClashPresenceAlone: false,
          assumesContextFreeUniformDamage: false,
          usesFixedNumericClashOffsetMultiplierOrScalar: false,
          dropsSourceRequiredContextOrAffectedTargetRole: false,
        },
      });

    expect(decision.status).toBe('REJECTED_RESEARCH_METHOD_PROPOSAL');
    expect(decision.proposalShape).toBeNull();
    expect(decision.guardEvaluation).toBeNull();
    expect(decision.rejectionReasonIds).toContain('COMPLETE_B64_PROPOSAL_SHAPE_REQUIRED');
  });

  test.each([
    [
      'resolvesSemanticEffectFromClashPresenceAlone',
      'CLASH_PRESENCE_ALONE_MAY_NOT_RESOLVE_SEMANTIC_EFFECT',
    ],
    ['assumesContextFreeUniformDamage', 'CONTEXT_FREE_UNIFORM_DAMAGE_MAY_NOT_BE_ASSUMED'],
    [
      'usesFixedNumericClashOffsetMultiplierOrScalar',
      'FIXED_NUMERIC_CLASH_OFFSET_MULTIPLIER_OR_SCALAR_MAY_NOT_BE_INFERRED',
    ],
    [
      'dropsSourceRequiredContextOrAffectedTargetRole',
      'SOURCE_REQUIRED_CONTEXT_OR_AFFECTED_TARGET_ROLE_MAY_NOT_BE_DROPPED_FOR_CURRENT_METHOD_COMPATIBILITY',
    ],
    [
      'flattensQualitativelyDivergentEffectClasses',
      'QUALITATIVELY_DIVERGENT_SOURCE_OUTCOMES_MAY_NOT_BE_FLATTENED_TO_ONE_UNARY_EFFECT_CLASS',
    ],
  ] as const)('rejects the B64 violation %s', (field, expectedReason) => {
    const candidate = admittedCandidate();
    const decision =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate({
        ...candidate,
        proposalShape: { ...COMPLIANT_SHAPE, [field]: true },
      });

    expect(decision.status).toBe('REJECTED_RESEARCH_METHOD_PROPOSAL');
    expect(decision.guardEvaluation?.accepted).toBe(false);
    expect(decision.rejectionReasonIds).toContain(expectedReason);
  });

  test('creates deterministic content-addressed admission decisions', () => {
    const first =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate(
        admittedCandidate(),
      );
    const second =
      evaluateCareerT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionCandidate(
        admittedCandidate(),
      );
    expect(first.decisionId).toBe(second.decisionId);
    expect(first).toEqual(second);
  });
});

describe('Career T8 classical Zi-Ping explicit-applicability admission adapter contract materialization', () => {
  test('materializes the research-only adapter contract without core-registry integration', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContract(
        acceptedB66(),
      );

    expect(report.materializationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT',
    );
    expect(report.adapterContract).toEqual(
      CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT,
    );
    expect(report.adapterContractCreatedByThisGate).toBe(true);
    expect(report.executableAdmissionEvaluatorCreatedByThisGate).toBe(true);
    expect(report.coreRuleRegistryIntegrationEnabled).toBe(false);
    expect(report.coreContractSchemaMutationAuthorized).toBe(false);
    expect(report.productionEnforcementAuthorized).toBe(false);
  });

  test('preserves negative-only semantics, holds and all six historical gaps', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContract(
        acceptedB66(),
      );

    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.productionImpact).toBe('NONE');
  });

  test('opens only adapter integration readiness review', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContract(
        acceptedB66(),
      );

    expect(report.immediatelyExecutableIntegrationReadinessReviewLaneCount).toBe(1);
    expect(report.immediatelyExecutableCoreRegistryMutationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW',
    );
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW',
    );
  });

  test('freezes sixteen adapter controls and fails closed on tampered B66', () => {
    const b66 = acceptedB66();
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContract(
        b66,
      );
    expect(report.controlIds).toEqual(CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);

    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContract({
        ...b66,
        reviewId: `${b66.reviewId}_tampered`,
      });
    expect(failed.status).toBe('UPSTREAM_B66_BOUNDARY_INVALID');
    expect(failed.exactB66BoundaryAccepted).toBe(false);
    expect(failed.adapterContract).toBeNull();
    expect(failed.adapterContractCreatedByThisGate).toBe(false);
    expect(failed.executableAdmissionEvaluatorCreatedByThisGate).toBe(false);
    expect(failed.immediatelyExecutableIntegrationReadinessReviewLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
  });
});
