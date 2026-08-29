import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8B64ClashMethodProposalShape } from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
  type CareerT8B67ResearchAdmissionCandidate,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-explicit-applicability-admission-adapter-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION,
  CAREER_T8_B68_INTEGRATION_FINDINGS,
  CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS,
  CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-admission-adapter-integration-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION,
  CAREER_T8_B69_ADMISSION_RECORD_VERSION,
  CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS,
  CAREER_T8_B69_PROPOSAL_ENVELOPE_VERSION,
  buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContract,
  createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord,
  createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-proposal-envelope-and-admission-record-contract.js';

const COMPLIANT_SHAPE = Object.freeze({
  resolvesSemanticEffectFromClashPresenceAlone: false,
  assumesContextFreeUniformDamage: false,
  usesFixedNumericClashOffsetMultiplierOrScalar: false,
  dropsSourceRequiredContextOrAffectedTargetRole: false,
  flattensQualitativelyDivergentEffectClasses: false,
} satisfies CareerT8B64ClashMethodProposalShape);

function fixtureRule() {
  return Object.freeze({
    ruleId: 'RULE-B69-PROPOSAL-FIXTURE',
    version: '0.1.0-research',
    ruleSetId: 'b69-fixture',
    title: 'B69 fixture',
  });
}

function candidate(
  proposalShape: CareerT8B64ClashMethodProposalShape = COMPLIANT_SHAPE,
): CareerT8B67ResearchAdmissionCandidate {
  const subjectContent = fixtureRule();
  return {
    applicability: CAREER_T8_B67_GUARD_APPLICABILITY_SCOPE,
    subjectType: 'rule',
    subjectRef: {
      id: subjectContent.ruleId,
      version: subjectContent.version,
      contentHash: deterministicContentHash(subjectContent),
    },
    subjectContent,
    proposalShape,
  };
}

function acceptedB68(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAdmissionAdapterIntegrationReadinessReviewReport,
    'reviewId'
  > = {
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW_VERSION,
    status:
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_ADMISSION_ADAPTER_INTEGRATION_READINESS_REVIEW',
    decision:
      'B67_STANDALONE_ADAPTER_VALID_DIRECT_CORE_INTEGRATION_NOT_READY_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_READY',
    upstreamB67MaterializationId: 'b67_fixture_for_b69',
    exactB67BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B68_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    integrationFindings: CAREER_T8_B68_INTEGRATION_FINDINGS,
    integrationFindingCount: 5,
    standaloneB67AdapterExecutable: true,
    directCoreRegistryIntegrationReady: false,
    snapshotResearchEvidenceEnvelopeReusableForMethodAdmission: false,
    researchMethodProposalEnvelopePresent: false,
    researchAdmissionRecordPresent: false,
    researchMethodProposalEnvelopeContractAuthoringReady: true,
    researchAdmissionRecordContractAuthoringReady: true,
    coreContractSchemaMutationAuthorized: false,
    coreRuleRegistryMutationAuthorized: false,
    researchAdmissionAdapterIntegrated: false,
    immediatelyExecutableProposalEnvelopeAndAdmissionRecordContractLaneCount: 1,
    immediatelyExecutableCoreRegistryIntegrationLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT',
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
    controlIds: CAREER_T8_B68_INTEGRATION_READINESS_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      integrationReadinessReviewsCreated: 1,
      integrationFindingsRecorded: 5,
      proposalEnvelopeContractsCreated: 0,
      admissionRecordContractsCreated: 0,
      coreContractSchemasChanged: 0,
      coreRegistryBehaviorsChanged: 0,
      ruleDefinitionsCreated: 0,
      methodologyDefinitionsCreated: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT',
  };
  return {
    reviewId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_admission_adapter_integration_readiness_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 classical Zi-Ping B69 research proposal envelope', () => {
  test('creates a deterministic repository-governance envelope for a structurally valid compliant proposal', () => {
    const first = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(candidate());
    const second = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(candidate());

    expect(first.created).toBe(true);
    expect(first.structuralRejectionReasonIds).toEqual([]);
    expect(first.envelope).not.toBeNull();
    expect(first.envelope?.envelopeVersion).toBe(CAREER_T8_B69_PROPOSAL_ENVELOPE_VERSION);
    expect(first.envelope?.governanceBinding).toBe('repository_method_authoring');
    expect(first.envelope?.snapshotBinding).toBe('none');
    expect(first.envelope?.authority).toBe('research_only');
    expect(first.envelope?.subjectContentHash).toBe(
      deterministicContentHash(first.envelope?.subjectContent),
    );
    expect(first).toEqual(second);
  });

  test('fails closed before envelope creation when B67 structural bindings are invalid', () => {
    const invalid = candidate();
    const result = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope({
      subjectType: invalid.subjectType,
      subjectRef: invalid.subjectRef,
      subjectContent: invalid.subjectContent,
      proposalShape: invalid.proposalShape,
    });

    expect(result.created).toBe(false);
    expect(result.envelope).toBeNull();
    expect(result.structuralRejectionReasonIds).toContain(
      'EXPLICIT_B64_APPLICABILITY_DECLARATION_REQUIRED',
    );
  });

  test('allows a structurally valid B64-violating proposal to be enveloped for audit', () => {
    const result = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(
      candidate({
        ...COMPLIANT_SHAPE,
        assumesContextFreeUniformDamage: true,
      }),
    );

    expect(result.created).toBe(true);
    expect(result.envelope).not.toBeNull();
    expect(result.structuralRejectionReasonIds).toEqual([]);
  });
});

describe('Career T8 classical Zi-Ping B69 research admission record', () => {
  test('authorizes research authoring only for an admitted B67 decision', () => {
    const envelopeResult = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(candidate());
    expect(envelopeResult.envelope).not.toBeNull();
    const record = createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord(
      envelopeResult.envelope!,
    );

    expect(record).not.toBeNull();
    expect(record?.recordVersion).toBe(CAREER_T8_B69_ADMISSION_RECORD_VERSION);
    expect(record?.decisionStatus).toBe('ADMITTED_RESEARCH_METHOD_PROPOSAL');
    expect(record?.authoringAdmissionAuthorized).toBe(true);
    expect(record?.rejectionReasonIds).toEqual([]);
    expect(record?.guardEvaluation).toEqual({ accepted: true, violationIds: [], violationCount: 0 });
    expect(record?.coreRegistryIntegrated).toBe(false);
    expect(record?.productionAuthorized).toBe(false);
  });

  test('records a guard rejection for audit without authorizing research authoring', () => {
    const envelopeResult = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(
      candidate({
        ...COMPLIANT_SHAPE,
        usesFixedNumericClashOffsetMultiplierOrScalar: true,
      }),
    );
    expect(envelopeResult.envelope).not.toBeNull();
    const record = createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord(
      envelopeResult.envelope!,
    );

    expect(record).not.toBeNull();
    expect(record?.decisionStatus).toBe('REJECTED_RESEARCH_METHOD_PROPOSAL');
    expect(record?.authoringAdmissionAuthorized).toBe(false);
    expect(record?.rejectionReasonIds).toContain(
      'FIXED_NUMERIC_CLASH_OFFSET_MULTIPLIER_OR_SCALAR_MAY_NOT_BE_INFERRED',
    );
    expect(record?.guardEvaluation?.accepted).toBe(false);
  });

  test('rejects a tampered proposal envelope and creates deterministic records', () => {
    const envelopeResult = createCareerT8ClassicalZipingClashMethodResearchProposalEnvelope(candidate());
    expect(envelopeResult.envelope).not.toBeNull();
    const envelope = envelopeResult.envelope!;
    const first = createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord(envelope);
    const second = createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord(envelope);
    expect(first).toEqual(second);
    expect(first?.recordId).toBe(second?.recordId);

    const tampered = {
      ...envelope,
      envelopeContentHash: '0'.repeat(64),
    };
    expect(createCareerT8ClassicalZipingClashMethodResearchAdmissionRecord(tampered)).toBeNull();
  });
});

describe('Career T8 classical Zi-Ping B69 contract materialization', () => {
  test('materializes proposal-envelope and admission-record contracts without widening authority', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContract(
        acceptedB68(),
      );

    expect(report.materializationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTRACT',
    );
    expect(report.proposalEnvelopeContractCreatedByThisGate).toBe(true);
    expect(report.admissionRecordContractCreatedByThisGate).toBe(true);
    expect(report.executableProposalEnvelopeCreatorCreatedByThisGate).toBe(true);
    expect(report.executableAdmissionRecordCreatorCreatedByThisGate).toBe(true);
    expect(report.repositoryGovernanceBindingEstablished).toBe(true);
    expect(report.sajuSnapshotBindingRequired).toBe(false);
    expect(report.rejectedProposalAuditRecordAuthorized).toBe(true);
    expect(report.rejectedProposalAuthoringAdmissionAuthorized).toBe(false);
    expect(report.coreRuleRegistryIntegrationEnabled).toBe(false);
    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('opens only workflow-integration readiness and freezes sixteen controls', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContract(
        acceptedB68(),
      );

    expect(report.immediatelyExecutableWorkflowIntegrationReadinessReviewLaneCount).toBe(1);
    expect(report.immediatelyExecutableCoreRegistryIntegrationLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_PROPOSAL_ADMISSION_WORKFLOW_INTEGRATION_READINESS_REVIEW',
    );
    expect(report.controlIds).toEqual(
      CAREER_T8_B69_PROPOSAL_ENVELOPE_AND_ADMISSION_RECORD_CONTROL_IDS,
    );
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
  });

  test('is deterministic and fails closed on a tampered B68 review address', () => {
    const b68 = acceptedB68();
    const first =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContract(
        b68,
      );
    const second =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContract(
        b68,
      );
    expect(first).toEqual(second);
    expect(first.materializationId).toBe(second.materializationId);

    const failed =
      buildCareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchProposalEnvelopeAndAdmissionRecordContract({
        ...b68,
        reviewId: `${b68.reviewId}_tampered`,
      });
    expect(failed.status).toBe('UPSTREAM_B68_BOUNDARY_INVALID');
    expect(failed.exactB68BoundaryAccepted).toBe(false);
    expect(failed.proposalEnvelopeContractCreatedByThisGate).toBe(false);
    expect(failed.admissionRecordContractCreatedByThisGate).toBe(false);
    expect(failed.immediatelyExecutableWorkflowIntegrationReadinessReviewLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
  });
});
