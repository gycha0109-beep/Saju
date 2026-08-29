import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA,
  CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES,
  type CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport,
} from '../src/research/career-personalization-t8-classical-ziping-current-career-clash-method-guard-compatibility-audit.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION,
  CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS,
  CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS,
  CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-enforcement-readiness-review.js';

function acceptedB65(): CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport {
  const auditSurfaces = CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES.map((surface) => ({
    ...surface,
    guardEvaluation: Object.freeze({
      accepted: true,
      violationIds: Object.freeze([]),
      violationCount: 0,
    }),
  }));

  const material: Omit<
    CareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAuditReport,
    'auditId'
  > = {
    auditVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT',
    decision:
      'CURRENT_REPOSITORY_COMPATIBLE_ZERO_GUARD_VIOLATIONS_NO_REMEDIATION_REQUIRED_RESEARCH_ADMISSION_ENFORCEMENT_REVIEW_ONLY',
    upstreamB64MaterializationId: 'b64_fixture_for_b66',
    exactB64BoundaryAccepted: true,
    auditedRepository: 'gycha0109-beep/Saju',
    auditedBaselineCommitSha: CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    auditSurfaces,
    auditedSurfaceCount: 11,
    directClashSurfaceCount: 5,
    adjacentSafetySurfaceCount: 6,
    guardEvaluationCount: 11,
    guardViolationCount: 0,
    incompatibleSurfaceCount: 0,
    currentRepositoryCompatibleWithB64Guard: true,
    remediationRequired: false,
    immediatelyExecutableRemediationLaneCount: 0,
    researchAdmissionEnforcementIntegrated: false,
    immediatelyExecutableResearchAdmissionEnforcementReadinessReviewLaneCount: 1,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW',
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
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      compatibilityAuditReportsCreated: 1,
      auditedSurfacesRecorded: 11,
      guardEvaluationsRecorded: 11,
      guardViolationsFound: 0,
      remediationsApplied: 0,
      researchAdmissionEnforcementIntegrationsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW',
  };

  return {
    auditId: `career_personalization_t8_classical_ziping_current_career_clash_method_guard_compatibility_audit_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping B64 guard research-admission enforcement readiness review', () => {
  test('resolves direct core-registry enforcement as not ready while authorizing only a research adapter contract', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        acceptedB65(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'DIRECT_CORE_REGISTRY_ENFORCEMENT_NOT_READY_EXPLICIT_APPLICABILITY_AND_CONTENT_ADDRESSED_RESEARCH_ADMISSION_ADAPTER_REQUIRED_ADAPTER_CONTRACT_AUTHORING_READY',
    );
    expect(report.exactB65BoundaryAccepted).toBe(true);
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B66_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.directCoreRegistryEnforcementReady).toBe(false);
    expect(report.dedicatedResearchAdmissionAdapterContractAuthoringReady).toBe(true);
    expect(report.researchAdmissionEnforcementIntegrated).toBe(false);
  });

  test('records five exact repository capability gaps and forbids implicit scope inference', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        acceptedB65(),
      );

    expect(report.capabilityFindings).toEqual(CAREER_T8_B66_REPOSITORY_CAPABILITY_FINDINGS);
    expect(report.capabilityFindingCount).toBe(5);
    expect(report.missingCapabilityCount).toBe(5);
    expect(report.capabilityFindings.every((finding) => finding.present === false)).toBe(true);
    expect(report.capabilityFindings.every((finding) => /^[0-9a-f]{40}$/.test(finding.blobSha))).toBe(
      true,
    );
    expect(
      report.capabilityFindings.filter(
        (finding) => finding.blockingForDirectCoreRegistryEnforcement,
      ),
    ).toHaveLength(4);
    expect(report.implicitApplicabilityInferenceAuthorized).toBe(false);
  });

  test('requires explicit applicability, content-addressed subject binding and the complete B64 shape', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        acceptedB65(),
      );

    expect(report.explicitApplicabilityDeclarationRequired).toBe(true);
    expect(report.contentAddressedSubjectBindingRequired).toBe(true);
    expect(report.declaredB64ProposalShapeBindingRequired).toBe(true);
    expect(report.deterministicB64GuardEvaluationBindingRequired).toBe(true);
    expect(report.failClosedOnMissingApplicability).toBe(true);
    expect(report.failClosedOnSubjectContentMismatch).toBe(true);
    expect(report.failClosedOnIncompleteGuardProposalShape).toBe(true);
  });

  test('does not mutate core contracts, core registry, semantic authority or production', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        acceptedB65(),
      );

    expect(report.ruleDefinitionSchemaMutationAuthorized).toBe(false);
    expect(report.methodologyDefinitionSchemaMutationAuthorized).toBe(false);
    expect(report.reviewAttestationSchemaMutationAuthorized).toBe(false);
    expect(report.coreRuleRegistryMutationAuthorized).toBe(false);
    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.t5RuleAuthoringAuthorizedByThisGate).toBe(false);
    expect(report.t6PositiveEffectRuleAuthoringAuthorizedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorizedByThisGate).toBe(false);
    expect(report.consumerNarrativeAuthorizedByThisGate).toBe(false);
    expect(report.productionEnforcementAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.implementationEffects.admissionAdaptersCreated).toBe(0);
    expect(report.implementationEffects.coreContractSchemasChanged).toBe(0);
    expect(report.implementationEffects.coreRegistryBehaviorsChanged).toBe(0);
    expect(report.implementationEffects.productionBehaviorsChanged).toBe(0);
  });

  test('preserves B61 visual hold, B56 Chen Zezhen hold and all six historical Career T8 gaps', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        acceptedB65(),
      );

    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('opens only the explicit-applicability research admission adapter contract lane', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        acceptedB65(),
      );

    expect(report.immediatelyExecutableAdapterContractLaneCount).toBe(1);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT',
    );
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT',
    );
  });

  test('freezes sixteen admission-readiness controls', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        acceptedB65(),
      );

    expect(report.controlIds).toEqual(CAREER_T8_B66_ADMISSION_READINESS_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on a tampered B65 content address', () => {
    const b65 = acceptedB65();
    const first =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        b65,
      );
    const second =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview(
        b65,
      );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);

    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionEnforcementReadinessReview({
        ...b65,
        auditId: `${b65.auditId}_tampered`,
      });
    expect(failed.status).toBe('UPSTREAM_B65_BOUNDARY_INVALID');
    expect(failed.exactB65BoundaryAccepted).toBe(false);
    expect(failed.capabilityFindingCount).toBe(0);
    expect(failed.capabilityFindings).toEqual([]);
    expect(failed.dedicatedResearchAdmissionAdapterContractAuthoringReady).toBe(false);
    expect(failed.immediatelyExecutableAdapterContractLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
    expect(failed.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT',
    );
  });
});
