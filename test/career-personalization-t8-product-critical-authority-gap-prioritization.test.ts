import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_NATAL_READING_CANDIDATE_VERSION } from '../src/research/career-natal-reading-candidate.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T5_SUBTYPE_CLAIM_TYPE } from '../src/research/career-personalized-t5-substrate.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION,
  CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
  CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID,
  CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS,
  CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS,
  CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport,
} from '../src/research/career-personalization-t8-classical-ziping-operational-clash-effectiveness-reopen-signal-adjudication.js';
import {
  buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance,
  type CareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernanceReport,
} from '../src/research/career-personalization-t8-classical-ziping-operational-clash-witness-criticality-governance.js';
import {
  CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_VERSION,
  CAREER_T8_B80_EXACT_SUBTYPE_CURRENT_SOURCE_IDS,
  CAREER_T8_B80_PRIORITY_CONTROL_IDS,
  CAREER_T8_B80_PRIORITY_ORDER,
  CAREER_T8_B80_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization,
} from '../src/research/career-personalization-t8-product-critical-authority-gap-prioritization.js';

function acceptedB78(): CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport,
    'adjudicationId'
  > = {
    adjudicationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION',
    decision:
      'MATERIAL_NEW_CLASSICAL_SCOPE_SIGNAL_OBSERVED_B77_AUTHORITY_REOPEN_CONDITION_NOT_YET_SATISFIED_TARGET_WITNESS_BINDING_REQUIRED',
    upstreamB77CloseoutId: 'b77_fixture_for_b80',
    exactB77BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    candidateInputDimension: CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
    candidateNegativeConstraintId: CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID,
    evidenceRecords: CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS,
    evidenceRecordCount: 3,
    independentNewClassicalWorkSignalCount: 1,
    sameWorkNewSurfaceCorroborationCount: 1,
    secondaryCorroborationCount: 1,
    exactTargetHistoricalWitnessBindingCount: 0,
    materialScopeChangeSignalObserved: true,
    b77NewClassicalAuthorityScopeChangeReopenConditionSatisfied: false,
    boundedNegativeMethodScopeAmendmentAuthorized: false,
    existingFiveConstraintGuardMutationAuthorized: false,
    sixthConstraintAuthoringAuthorized: false,
    universalCombinationCancelsClashRuleAuthorized: false,
    universalInteractionPrecedenceRuleAuthorized: false,
    immediatelyExecutableTargetWitnessBindingLaneCount: 1,
    immediatelyExecutableScopeAuthorityAmendmentLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING',
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
    controlIds: CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS,
    controlCount: 18,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      reopenSignalAdjudicationsCreated: 1,
      evidenceRecordsCreated: 3,
      guardConstraintsChanged: 0,
      guardProposalFieldsChanged: 0,
      publicExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING',
  };

  return {
    adjudicationId: `career_personalization_t8_classical_ziping_operational_clash_effectiveness_reopen_signal_adjudication_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB79(): CareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernanceReport {
  return buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance(
    acceptedB78(),
  );
}

describe('Career T8 B80 product-critical authority-gap prioritization', () => {
  test('consumes the exact six current authority gaps and freezes their research order', () => {
    const report = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(
      acceptedB79(),
    );

    expect(report.prioritizationVersion).toBe(
      CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_CAREER_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION',
    );
    expect(report.decision).toBe(
      'SIX_GAPS_PRIORITIZED_EXACT_SUBTYPE_MULTI_CLAIM_BRIDGE_SELECTED_FOR_SOURCE_CANDIDATE_REVIEW_NO_T8_AUTHORING',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B80_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.exactB79BoundaryAccepted).toBe(true);
    expect(report.exactGapInventoryAccepted).toBe(true);
    expect(CAREER_T8_B80_PRIORITY_ORDER).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.priorityRecords.map((record) => record.gapId)).toEqual(
      CAREER_T8_B80_PRIORITY_ORDER,
    );
    expect(report.priorityRecords.map((record) => record.researchOrder)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
    expect(report.priorityRecordCount).toBe(6);
  });

  test('selects exact subtype multi-claim binding as the immediate product-critical research lane', () => {
    const report = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(
      acceptedB79(),
    );
    const selected = report.priorityRecords[0];

    expect(report.selectedImmediateGapId).toBe(
      'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    );
    expect(selected).toEqual(
      expect.objectContaining({
        gapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
        researchOrder: 1,
        priorityBand: 'IMMEDIATE_PRODUCT_CRITICAL',
        currentAuthorityState: 'LOWER_TIER_T5_AUTHORITY_ONLY',
        semanticRuleAuthoringAuthorized: false,
        numericInterpretiveWeightAuthorized: false,
      }),
    );
    expect(report.recommendedNextGate).toBe(
      'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW',
    );
  });

  test('records the actual exact-subtype source and candidate state without treating legacy T8 as reusable', () => {
    const report = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(
      acceptedB79(),
    );
    const audit = report.exactSubtypeCandidateAudit;

    expect(audit).not.toBeNull();
    expect(audit?.exactSubtypeSourceIds).toEqual(CAREER_T8_B80_EXACT_SUBTYPE_CURRENT_SOURCE_IDS);
    expect(audit?.exactSubtypeSourceIds).toEqual([
      'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE',
    ]);
    expect(audit?.exactSubtypeT5SourceAuthorityPresent).toBe(true);
    expect(audit?.exactSubtypeT5ClaimType).toBe(CAREER_T5_SUBTYPE_CLAIM_TYPE);
    expect(audit?.exactSubtypeCrossTierCareerBindingAuthorityPresent).toBe(false);
    expect(audit?.reviewedPersonalizedMultiClaimCareerBindingCandidateCount).toBe(0);
    expect(audit?.legacyDirectT8CandidateObserved).toBe(true);
    expect(audit?.legacyCandidateVersion).toBe(CAREER_NATAL_READING_CANDIDATE_VERSION);
    expect(audit?.legacyCandidateRuleCount).toBe(20);
    expect(audit?.legacyCandidateReadsRawDerivedTenGodFact).toBe(true);
    expect(audit?.legacyCandidateConsumesPersonalizedT5Claims).toBe(false);
    expect(audit?.legacyCandidateUsableAsPersonalizedBridge).toBe(false);
    expect(audit?.sourceCandidateState).toBe(
      'LOWER_TIER_SOURCE_PRESENT_CROSS_TIER_CAREER_BINDING_CANDIDATE_ABSENT',
    );
  });

  test('keeps T6 modifier gaps after T5 composition and conflict policy dependency-late', () => {
    const report = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(
      acceptedB79(),
    );
    const byGap = new Map(report.priorityRecords.map((record) => [record.gapId, record]));

    expect(byGap.get('FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING')).toEqual(
      expect.objectContaining({
        researchOrder: 2,
        priorityBand: 'NEXT_T5_COMPOSITION',
        currentAuthorityState: 'LOWER_TIER_T5_AUTHORITY_ONLY',
      }),
    );
    expect(byGap.get('BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING')).toEqual(
      expect.objectContaining({
        researchOrder: 3,
        priorityBand: 'FOLLOWING_T6_MODIFIER',
        currentAuthorityState: 'BOUNDED_T6_CONTEXT_ONLY',
      }),
    );
    expect(byGap.get('MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING')).toEqual(
      expect.objectContaining({
        researchOrder: 6,
        priorityBand: 'DEPENDENCY_LATE',
        currentAuthorityState: 'MISSING_AUTHORITY',
      }),
    );
  });

  test('does not turn product priority into semantic authority or production behavior', () => {
    const report = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(
      acceptedB79(),
    );

    expect(report.productPriorityIsInterpretiveWeight).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.legacyCareerT8ReuseAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.controlIds).toEqual(CAREER_T8_B80_PRIORITY_CONTROL_IDS);
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      priorityGovernanceRecordsCreated: 1,
      sourceCandidateAuditsCreated: 1,
      methodologyDefinitionsCreated: 0,
      semanticRuleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      calculationBehaviorsChanged: 0,
      interpretationBehaviorsChanged: 0,
      narrativeBehaviorsChanged: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    });
  });

  test('fails closed if the exact content-addressed B79 boundary is changed', () => {
    const b79 = acceptedB79();
    const tampered = {
      ...b79,
      selectedImmediateProductLane: null,
    } as CareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernanceReport;
    const report = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(tampered);

    expect(report.status).toBe('UPSTREAM_B79_BOUNDARY_INVALID');
    expect(report.exactB79BoundaryAccepted).toBe(false);
    expect(report.exactGapInventoryAccepted).toBe(false);
    expect(report.priorityRecords).toEqual([]);
    expect(report.priorityRecordCount).toBe(0);
    expect(report.selectedImmediateGapId).toBeNull();
    expect(report.exactSubtypeCandidateAudit).toBeNull();
    expect(report.controlIds).toEqual([]);
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION',
    );
  });

  test('is deterministic for the same exact B79 input', () => {
    const b79 = acceptedB79();
    const first = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(b79);
    const second = buildCareerPersonalizationT8ProductCriticalAuthorityGapPrioritization(b79);

    expect(first.prioritizationId).toBe(second.prioritizationId);
    expect(first).toEqual(second);
  });
});
