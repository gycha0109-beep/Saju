import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8B64ClashMethodProposalShape } from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
  type CareerT8B67ResearchAdmissionCandidate,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION,
  CAREER_T8_B73_ENTRYPOINT_FINDINGS,
  CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS,
  CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-only-proposal-authoring-entrypoint-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION,
  CAREER_T8_B74_ENTRYPOINT_VERSION,
  CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContract,
  submitCareerT8ClassicalZipingClashMethodResearchProposalForAuthoring,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-dedicated-internal-research-proposal-authoring-entrypoint-contract.js';

const COMPLIANT_SHAPE = Object.freeze({
  resolvesSemanticEffectFromClashPresenceAlone: false,
  assumesContextFreeUniformDamage: false,
  usesFixedNumericClashOffsetMultiplierOrScalar: false,
  dropsSourceRequiredContextOrAffectedTargetRole: false,
  flattensQualitativelyDivergentEffectClasses: false,
} satisfies CareerT8B64ClashMethodProposalShape);

function acceptedB73(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchOnlyProposalAuthoringEntrypointReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ONLY_PROPOSAL_AUTHORING_ENTRYPOINT_READINESS_REVIEW',
    decision:
      'EXISTING_PUBLIC_DEV_AND_UX_ENTRYPOINTS_NOT_REUSABLE_DEDICATED_INTERNAL_RESEARCH_AUTHORING_ENTRYPOINT_CONTRACT_READY',
    upstreamB72AuditId: 'b72_fixture_for_b74',
    exactB72BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B73_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    entrypointFindings: CAREER_T8_B73_ENTRYPOINT_FINDINGS,
    entrypointFindingCount: 6,
    existingReusableEntrypointCount: 0,
    b71InternalWorkflowPrimitiveAvailable: true,
    developerHarnessReuseAuthorized: false,
    researchUxPreviewReuseAuthorized: false,
    rootOrResearchBarrelExportAuthorized: false,
    packageExportOrScriptMutationAuthorized: false,
    dedicatedInternalResearchAuthoringEntrypointContractAuthoringReady: true,
    entrypointMustDelegateToB71: true,
    entrypointPersistenceAuthorized: false,
    coreRuleRegistryIntegrationAuthorized: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableDedicatedEntrypointContractLaneCount: 1,
    immediatelyExecutablePublicExportLaneCount: 0,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT',
    positiveT6InputContractEstablished: false,
    positiveClashEffectContractEstablished: false,
    branchSourceOrMethodTriggerActivationCount: 0,
    currentCareerSemanticBridgeEstablished: false,
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B73_ENTRYPOINT_READINESS_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      readinessReviewsCreated: 1,
      entrypointFindingsRecorded: 6,
      authoringEntrypointsCreated: 0,
      publicExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT',
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_only_proposal_authoring_entrypoint_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function fixtureRule() {
  return Object.freeze({
    ruleId: 'RULE-B74-INTERNAL-AUTHORING-FIXTURE',
    version: '0.1.0-research',
    ruleSetId: 'b74-fixture',
    title: 'B74 internal authoring fixture',
  });
}

function candidate(
  proposalShape: CareerT8B64ClashMethodProposalShape = COMPLIANT_SHAPE,
): CareerT8B67ResearchAdmissionCandidate {
  const content = fixtureRule();
  return {
    applicability: CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
    subjectType: 'rule',
    subjectRef: {
      id: content.ruleId,
      version: content.version,
      contentHash: deterministicContentHash(content),
    },
    subjectContent: content,
    proposalShape,
  };
}

describe('Career T8 B74 dedicated internal research authoring entrypoint', () => {
  test('preserves structural rejection without authoring eligibility', () => {
    const valid = candidate();
    const result = submitCareerT8ClassicalZipingClashMethodResearchProposalForAuthoring({
      subjectType: 'rule',
      subjectRef: valid.subjectRef,
      subjectContent: valid.subjectContent,
      proposalShape: COMPLIANT_SHAPE,
    });

    expect(result.entrypointVersion).toBe(CAREER_T8_B74_ENTRYPOINT_VERSION);
    expect(result.workflowStatus).toBe('STRUCTURALLY_REJECTED');
    expect(result.authoringDecision).toBe('REJECTED_STRUCTURALLY');
    expect(result.researchAuthoringEligible).toBe(false);
    expect(result.proposalEnvelopeId).toBeNull();
    expect(result.admissionRecordId).toBeNull();
    expect(result.structuralRejectionReasonIds).toContain(
      'EXPLICIT_B64_APPLICABILITY_DECLARATION_REQUIRED',
    );
  });

  test('preserves guard rejection with audit records but no authoring eligibility', () => {
    const result = submitCareerT8ClassicalZipingClashMethodResearchProposalForAuthoring(
      candidate({
        ...COMPLIANT_SHAPE,
        assumesContextFreeUniformDamage: true,
      }),
    );

    expect(result.workflowStatus).toBe('GUARD_REJECTED');
    expect(result.authoringDecision).toBe('REJECTED_BY_NEGATIVE_METHOD_GUARD');
    expect(result.researchAuthoringEligible).toBe(false);
    expect(result.proposalEnvelopeId).not.toBeNull();
    expect(result.admissionRecordId).not.toBeNull();
    expect(result.admissionRejectionReasonIds).toContain(
      'CONTEXT_FREE_UNIFORM_DAMAGE_MAY_NOT_BE_ASSUMED',
    );
  });

  test('maps only B71 admission to research-authoring eligibility', () => {
    const result = submitCareerT8ClassicalZipingClashMethodResearchProposalForAuthoring(candidate());

    expect(result.workflowStatus).toBe('ADMITTED');
    expect(result.authoringDecision).toBe('ELIGIBLE_FOR_RESEARCH_AUTHORING');
    expect(result.researchAuthoringEligible).toBe(true);
    expect(result.proposalEnvelopeId).not.toBeNull();
    expect(result.admissionRecordId).not.toBeNull();
    expect(result.structuralRejectionReasonIds).toEqual([]);
    expect(result.admissionRejectionReasonIds).toEqual([]);
    expect(result.persistenceApplied).toBe(false);
    expect(result.registrationApplied).toBe(false);
    expect(result.promotionApplied).toBe(false);
    expect(result.rootExported).toBe(false);
    expect(result.researchBarrelExported).toBe(false);
    expect(result.packageExported).toBe(false);
    expect(result.coreRegistryIntegrated).toBe(false);
    expect(result.productionAuthorized).toBe(false);
  });

  test('returns deterministic content-addressed entrypoint results', () => {
    const first = submitCareerT8ClassicalZipingClashMethodResearchProposalForAuthoring(candidate());
    const second = submitCareerT8ClassicalZipingClashMethodResearchProposalForAuthoring(candidate());
    expect(first.entrypointExecutionId).toBe(second.entrypointExecutionId);
    expect(first).toEqual(second);
  });
});

describe('Career T8 B74 dedicated internal authoring entrypoint contract materialization', () => {
  test('materializes only an internal B71-delegated entrypoint and preserves all boundaries', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContract(
        acceptedB73(),
      );

    expect(report.materializationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_CONTRACT',
    );
    expect(report.dedicatedInternalEntrypointCreatedByThisGate).toBe(true);
    expect(report.executableEntrypointCreatedByThisGate).toBe(true);
    expect(report.delegatesToB71).toBe(true);
    expect(report.preservesThreeB71Outcomes).toBe(true);
    expect(report.authoringEligibilityMayBypassB71Admission).toBe(false);
    expect(report.persistenceEnabled).toBe(false);
    expect(report.registrationEnabled).toBe(false);
    expect(report.promotionEnabled).toBe(false);
    expect(report.rootExportEnabled).toBe(false);
    expect(report.researchBarrelExportEnabled).toBe(false);
    expect(report.packageExportEnabled).toBe(false);
    expect(report.developerHarnessIntegrationEnabled).toBe(false);
    expect(report.researchUxPreviewIntegrationEnabled).toBe(false);
    expect(report.coreRuleRegistryIntegrationEnabled).toBe(false);
    expect(report.productionEnforcementAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('opens only compatibility audit and freezes sixteen controls', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContract(
        acceptedB73(),
      );

    expect(report.immediatelyExecutableCompatibilityAuditLaneCount).toBe(1);
    expect(report.immediatelyExecutablePublicExportLaneCount).toBe(0);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_DEDICATED_INTERNAL_RESEARCH_PROPOSAL_AUTHORING_ENTRYPOINT_COMPATIBILITY_AUDIT',
    );
    expect(report.controlIds).toEqual(CAREER_T8_B74_INTERNAL_AUTHORING_ENTRYPOINT_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('fails closed on a tampered B73 materialization address', () => {
    const b73 = acceptedB73();
    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardDedicatedInternalResearchProposalAuthoringEntrypointContract({
        ...b73,
        reviewId: `${b73.reviewId}_tampered`,
      });

    expect(failed.status).toBe('UPSTREAM_B73_BOUNDARY_INVALID');
    expect(failed.exactB73BoundaryAccepted).toBe(false);
    expect(failed.dedicatedInternalEntrypointCreatedByThisGate).toBe(false);
    expect(failed.executableEntrypointCreatedByThisGate).toBe(false);
    expect(failed.immediatelyExecutableCompatibilityAuditLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
  });
});
