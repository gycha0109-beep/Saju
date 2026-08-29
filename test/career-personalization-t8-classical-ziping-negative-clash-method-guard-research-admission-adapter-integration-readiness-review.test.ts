import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
  CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS,
  CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B68_INTEGRATION_FINDINGS,
  CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS,
  CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-adapter-integration-readiness-review.js';

function acceptedB67(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardExplicitApplicabilityAdmissionAdapterContractReport,
    'materializationId'
  > = {
    materializationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT',
    decision:
      'RESEARCH_ONLY_EXPLICIT_APPLICABILITY_CONTENT_ADDRESSED_ADMISSION_ADAPTER_MATERIALIZED_FAIL_CLOSED_CORE_REGISTRY_INTEGRATION_DEFERRED',
    upstreamB66ReviewId: 'b66_fixture_for_b68',
    exactB66BoundaryAccepted: true,
    adapterContract: CAREER_T8_B67_EXPLICIT_APPLICABILITY_ADMISSION_ADAPTER_CONTRACT,
    adapterContractCreatedByThisGate: true,
    executableAdmissionEvaluatorCreatedByThisGate: true,
    explicitApplicabilityRequired: true,
    contentAddressedSubjectBindingRequired: true,
    subjectIdentityBindingRequired: true,
    completeB64ProposalShapeRequired: true,
    deterministicB64GuardEvaluationRequired: true,
    failClosedAdmissionRequired: true,
    implicitApplicabilityInferenceAuthorized: false,
    coreRuleRegistryIntegrationEnabled: false,
    coreContractSchemaMutationAuthorized: false,
    productionEnforcementAuthorized: false,
    immediatelyExecutableIntegrationReadinessReviewLaneCount: 1,
    immediatelyExecutableCoreRegistryMutationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW',
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
    controlIds: CAREER_T8_B67_ADMISSION_ADAPTER_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      adapterContractsCreated: 1,
      executableAdmissionEvaluatorsCreated: 1,
      coreContractSchemasChanged: 0,
      coreRegistryBehaviorsChanged: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW',
  };
  return {
    materializationId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_explicit_applicability_admission_adapter_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping B67 adapter integration readiness review', () => {
  test('accepts the exact B67 boundary and records five exact repository findings', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
        acceptedB67(),
      );

    expect(report.reviewVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'B67_STANDALONE_ADAPTER_VALID_DIRECT_CORE_INTEGRATION_NOT_READY_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_READY',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.integrationFindings).toEqual(CAREER_T8_B68_INTEGRATION_FINDINGS);
    expect(report.integrationFindingCount).toBe(5);
    expect(report.standaloneB67AdapterExecutable).toBe(true);
  });

  test('keeps direct core integration blocked and does not reuse snapshot-bound research evidence as governance admission', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
        acceptedB67(),
      );

    expect(report.directCoreRegistryIntegrationReady).toBe(false);
    expect(report.snapshotResearchEvidenceEnvelopeReusableForMethodAdmission).toBe(false);
    expect(report.researchAdmissionAdapterIntegrated).toBe(false);
    expect(report.coreContractSchemaMutationAuthorized).toBe(false);
    expect(report.coreRuleRegistryMutationAuthorized).toBe(false);
    expect(
      report.integrationFindings.find(
        (finding) =>
          finding.findingId ===
          'SNAPSHOT_RESEARCH_EVIDENCE_ENVELOPE_NOT_REUSABLE_FOR_METHOD_ADMISSION',
      )?.present,
    ).toBe(true);
  });

  test('authorizes only a research proposal envelope and admission record contract as the next lane', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
        acceptedB67(),
      );

    expect(report.researchMethodProposalEnvelopePresent).toBe(false);
    expect(report.researchAdmissionRecordPresent).toBe(false);
    expect(report.researchMethodProposalEnvelopeContractAuthoringReady).toBe(true);
    expect(report.researchAdmissionRecordContractAuthoringReady).toBe(true);
    expect(report.immediatelyExecutableProposalEnvelopeAndAdmissionRecordContractLaneCount).toBe(1);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT',
    );
  });

  test('preserves semantic, historical and production boundaries', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
        acceptedB67(),
      );

    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.productionEnforcementAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes sixteen integration-readiness controls', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
        acceptedB67(),
      );
    expect(report.controlIds).toEqual(CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('is deterministic and fails closed on a tampered B67 content address', () => {
    const b67 = acceptedB67();
    const first =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
        b67,
      );
    const second =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview(
        b67,
      );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first).toEqual(second);

    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReview({
        ...b67,
        materializationId: `${b67.materializationId}_tampered`,
      });
    expect(failed.status).toBe('UPSTREAM_B67_BOUNDARY_INVALID');
    expect(failed.exactB67BoundaryAccepted).toBe(false);
    expect(failed.integrationFindingCount).toBe(0);
    expect(failed.researchMethodProposalEnvelopeContractAuthoringReady).toBe(false);
    expect(failed.researchAdmissionRecordContractAuthoringReady).toBe(false);
    expect(failed.immediatelyExecutableProposalEnvelopeAndAdmissionRecordContractLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
  });
});
