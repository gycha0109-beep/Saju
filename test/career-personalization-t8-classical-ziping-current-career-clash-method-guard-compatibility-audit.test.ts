import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION,
  CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS,
  CAREER_T8_B63_SCOPE_CONTROL_IDS,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-scope-authority-review.js';
import {
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContractReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION,
  CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA,
  CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS,
  CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES,
  buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit,
} from '../src/research/career-personalization-t8-classical-ziping-current-career-clash-method-guard-compatibility-audit.js';

function acceptedB63(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodScopeAuthorityReviewReport,
    'reviewId'
  > = {
    reviewVersion: CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_SCOPE_AUTHORITY_REVIEW',
    decision:
      'FIVE_NEGATIVE_CLASH_METHOD_CONSTRAINTS_AUTHORIZED_AS_BOUNDED_RESEARCH_SCOPE_NO_POSITIVE_EFFECT_INPUT_CONTRACT_SEMANTIC_RULE_OR_PRODUCTION_AUTHORITY',
    upstreamB62ReassessmentId: 'b62_fixture_for_b65',
    exactB62BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    boundedNegativeMethodScopeAuthorityEstablished: true,
    boundedMethodScopeAuthorityChangeCount: 1,
    authorizedNegativeConstraintIds: CAREER_T8_B63_AUTHORIZED_NEGATIVE_METHOD_CONSTRAINT_IDS,
    authorizedNegativeConstraintCount: 5,
    negativeMethodGuardContractAuthoringAuthorized: true,
    positiveT6InputContractEstablished: false,
    positiveClashEffectContractEstablished: false,
    positiveClashEffectAuthoringAuthorized: false,
    flatUnaryClashModifierAuthoringAuthorized: false,
    contextFreeUniformDamageAuthoringAuthorized: false,
    fixedNumericClashScalarAuthoringAuthorized: false,
    sourceRequiredContextDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
    commonT6MethodContractEstablished: false,
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    claimTypeCreatedByThisGate: false,
    branchSourceOrMethodTriggerActivationCount: 0,
    currentCareerSemanticBridgeEstablished: false,
    careerT8SemanticAuthorityAdmittedByThisGate: false,
    careerT8AuthorityGapClosedByThisGate: false,
    immediatelyExecutableNegativeMethodGuardContractLaneCount: 1,
    immediatelyExecutablePositiveMethodContractLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT',
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    t5RuleAuthoringAuthorized: false,
    t6PositiveEffectRuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B63_SCOPE_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      scopeAuthorityReviewsCreated: 1,
      boundedNegativeMethodScopesAuthorized: 1,
      negativeMethodGuardContractsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate: 'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT',
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_scope_authority_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB64(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContractReport {
  return buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardContract(acceptedB63());
}

describe('Career T8 classical Zi-Ping current Career clash-method guard compatibility audit', () => {
  test('audits the exact baseline repository and resolves with zero guard violations', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      acceptedB64(),
    );

    expect(report.auditVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_CURRENT_CAREER_CLASH_METHOD_GUARD_COMPATIBILITY_AUDIT',
    );
    expect(report.decision).toBe(
      'CURRENT_REPOSITORY_COMPATIBLE_ZERO_GUARD_VIOLATIONS_NO_REMEDIATION_REQUIRED_RESEARCH_ADMISSION_ENFORCEMENT_REVIEW_ONLY',
    );
    expect(report.exactB64BoundaryAccepted).toBe(true);
    expect(report.auditedRepository).toBe('gycha0109-beep/Saju');
    expect(report.auditedBaselineCommitSha).toBe(CAREER_T8_B65_AUDITED_BASELINE_COMMIT_SHA);
    expect(report.auditedSurfaceCount).toBe(11);
    expect(report.directClashSurfaceCount).toBe(5);
    expect(report.adjacentSafetySurfaceCount).toBe(6);
    expect(report.guardEvaluationCount).toBe(11);
    expect(report.guardViolationCount).toBe(0);
    expect(report.incompatibleSurfaceCount).toBe(0);
    expect(report.currentRepositoryCompatibleWithB64Guard).toBe(true);
    expect(report.remediationRequired).toBe(false);
  });

  test('pins all eleven audited surfaces to exact blob identities', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      acceptedB64(),
    );

    expect(report.auditSurfaces.map((surface) => surface.surfaceId)).toEqual(
      CAREER_T8_B65_CURRENT_REPOSITORY_AUDIT_SURFACES.map((surface) => surface.surfaceId),
    );
    expect(new Set(report.auditSurfaces.map((surface) => surface.path)).size).toBe(11);
    expect(report.auditSurfaces.every((surface) => /^[0-9a-f]{40}$/.test(surface.blobSha))).toBe(true);
  });

  test('all direct clash surfaces and adjacent safety surfaces satisfy the five B64 prohibitions', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      acceptedB64(),
    );

    expect(report.auditSurfaces.every((surface) => surface.guardEvaluation.accepted)).toBe(true);
    expect(report.auditSurfaces.every((surface) => surface.guardEvaluation.violationCount === 0)).toBe(
      true,
    );
    expect(
      report.auditSurfaces.filter(
        (surface) => surface.guardApplicability === 'direct_clash_surface',
      ),
    ).toHaveLength(5);
    expect(
      report.auditSurfaces.filter(
        (surface) => surface.guardApplicability === 'adjacent_safety_surface',
      ),
    ).toHaveLength(6);
  });

  test('does not create positive clash semantics, remediation, semantic bridge or production authority', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      acceptedB64(),
    );

    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.t5RuleAuthoringAuthorizedByThisGate).toBe(false);
    expect(report.t6PositiveEffectRuleAuthoringAuthorizedByThisGate).toBe(false);
    expect(report.t8RuleAuthoringAuthorizedByThisGate).toBe(false);
    expect(report.consumerNarrativeAuthorizedByThisGate).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.implementationEffects.remediationsApplied).toBe(0);
    expect(report.implementationEffects.researchAdmissionEnforcementIntegrationsCreated).toBe(0);
    expect(report.implementationEffects.productionBehaviorsChanged).toBe(0);
  });

  test('preserves visual, Chen Zezhen and all six historical Career T8 gap boundaries', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      acceptedB64(),
    );

    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('opens only research-admission enforcement readiness review, not remediation or semantic authoring', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      acceptedB64(),
    );

    expect(report.immediatelyExecutableRemediationLaneCount).toBe(0);
    expect(report.researchAdmissionEnforcementIntegrated).toBe(false);
    expect(report.immediatelyExecutableResearchAdmissionEnforcementReadinessReviewLaneCount).toBe(1);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW',
    );
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ENFORCEMENT_READINESS_REVIEW',
    );
  });

  test('freezes sixteen compatibility-audit controls', () => {
    const report = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      acceptedB64(),
    );

    expect(report.controlIds).toEqual(CAREER_T8_B65_COMPATIBILITY_AUDIT_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on a tampered B64 content address', () => {
    const b64 = acceptedB64();
    const first = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      b64,
    );
    const second = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit(
      b64,
    );
    expect(first.auditId).toBe(second.auditId);
    expect(first).toEqual(second);

    const failed = buildCareerPersonalizationT8ClassicalZipingCurrentCareerClashMethodGuardCompatibilityAudit({
      ...b64,
      materializationId: `${b64.materializationId}_tampered`,
    });
    expect(failed.status).toBe('UPSTREAM_B64_BOUNDARY_INVALID');
    expect(failed.exactB64BoundaryAccepted).toBe(false);
    expect(failed.auditedSurfaceCount).toBe(0);
    expect(failed.auditSurfaces).toEqual([]);
    expect(failed.currentRepositoryCompatibleWithB64Guard).toBe(false);
    expect(failed.immediatelyExecutableResearchAdmissionEnforcementReadinessReviewLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
    expect(failed.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT',
    );
  });
});
