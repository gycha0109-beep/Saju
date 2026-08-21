import { describe, expect, test } from 'vitest';
import {
  buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview,
  buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence,
  type ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem,
  type ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
} from '../src/index.js';

function baseItem(
  dependencies: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['requiredSettlementDependencies'],
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem {
  return {
    mechanism: 'OUTPUT_CHALLENGE',
    currentCombinationRelationId: 'relation-current',
    currentCombinationRelationKind: 'branch_six_combination',
    targetParticipantPillar: 'day',
    targetParticipantComponent: 'branch',
    targetParticipantValue: '술',
    supportChannelKind: 'RESOURCE_GENERATION_SUPPORT_CHANNEL',
    sourcePillar: 'month',
    sourceComponent: 'branch',
    sourceValue: '해',
    contestTopologyState:
      dependencies.includes('TOUCH_SPECIFIC_RELATION_SETTLEMENT')
        ? 'MULTIPLE_TRACKED_RELATION_TOUCHES'
        : dependencies.length === 0
          ? 'NO_TRACKED_RELATION_TOUCH'
          : 'COMPETING_CLASH_TOUCH',
    touchingRelationIds:
      dependencies.includes('TOUCH_SPECIFIC_RELATION_SETTLEMENT')
        ? ['relation-a', 'relation-b']
        : dependencies.length === 0
          ? []
          : ['relation-clash'],
    touchingRelationKinds:
      dependencies.includes('TOUCH_SPECIFIC_RELATION_SETTLEMENT')
        ? ['branch_clash', 'branch_six_combination']
        : dependencies.length === 0
          ? []
          : ['branch_clash'],
    touchCount: dependencies.includes('TOUCH_SPECIFIC_RELATION_SETTLEMENT')
      ? 2
      : dependencies.length === 0
        ? 0
        : 1,
    directContestSettlementRequired: dependencies.length > 0,
    requiredSettlementDependencies: dependencies,
    settlementDependenciesResolved: false,
    supportChannelActive: 'not_determined',
    supportChannelPersisted: 'not_determined',
    supportChannelNeutralized: 'not_determined',
    supportChannelDestroyed: 'not_determined',
    supportChannelNetEffect: 'not_resolved',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function report(
  items: readonly ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem[],
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport {
  return {
    reportId: 'i56-fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE',
    upstreamI54ReportId: 'i54-fixture',
    upstreamI55ReviewId: 'i55-fixture',
    items,
    settlementDependencyEvidenceAvailable: true,
    contestOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

describe('I58 existing settlement authority applicability evidence', () => {
  test('maps clash relative-force and rescue dependencies to reusable substrate while keeping outcomes unresolved', () => {
    const i56 = report([
      baseItem(['CLASH_RELATIVE_FORCE_SETTLEMENT', 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE']),
    ]);
    const i57 = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const result = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      i56,
      i57,
    );

    expect(result.status).toBe('RESOLVED_EXISTING_SETTLEMENT_AUTHORITY_APPLICABILITY_EVIDENCE');
    expect(result.items[0]?.dependencyApplicability).toHaveLength(2);
    expect(result.items[0]?.dependencyApplicability.every((item) => item.reusableSubstrateAvailable)).toBe(true);
    expect(result.items[0]?.dependencyApplicability.every((item) => item.settlementOutcomeResolved === false)).toBe(true);
    expect(result.currentChartRelationSpecificSettlementEvidenceVerified).toBe(false);
  });

  test('preserves the narrow bureau-state boundary for clash interaction', () => {
    const i56 = report([baseItem(['CLASH_INTERACTION_SETTLEMENT'])]);
    const i57 = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const result = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      i56,
      i57,
    );
    const applicability = result.items[0]?.dependencyApplicability[0];

    expect(applicability?.applicabilityStatus).toBe(
      'NARROW_BUREAU_STATE_AUTHORITY_NOT_GENERIC_SUPPORT_CHANNEL_SETTLEMENT',
    );
    expect(applicability?.authorityRefs).toContain('I47');
    expect(result.items[0]?.supportChannelDestroyed).toBe('not_determined');
  });

  test('keeps multi-touch pairing insufficient and competing precedence unresolved', () => {
    const i56 = report([
      baseItem(['TOUCH_SPECIFIC_RELATION_SETTLEMENT', 'COMPETING_RELATION_SETTLEMENT']),
    ]);
    const i57 = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const result = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      i56,
      i57,
    );
    const statuses = result.items[0]?.dependencyApplicability.map((item) => item.applicabilityStatus);

    expect(statuses).toContain('MULTI_TOUCH_ID_KIND_PAIRING_INSUFFICIENT');
    expect(statuses).toContain('COMPETING_RELATION_PRECEDENCE_UNRESOLVED');
    expect(result.anyRoutedSettlementOutcomeResolved).toBe(false);
  });

  test('allows no-touch to carry an empty applicability list without inferring activation or persistence', () => {
    const i56 = report([baseItem([])]);
    const i57 = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const result = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      i56,
      i57,
    );

    expect(result.items[0]?.dependencyApplicability).toEqual([]);
    expect(result.items[0]?.allRequiredSettlementDependenciesHaveApplicabilityEvidence).toBe(true);
    expect(result.items[0]?.supportChannelActive).toBe('not_determined');
    expect(result.items[0]?.supportChannelPersisted).toBe('not_determined');
  });

  test('fails closed when the supplied I57 review is non-canonical', () => {
    const i56 = report([baseItem(['CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'])]);
    const canonical = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const modified = { ...canonical, reviewId: `${canonical.reviewId}_other` };
    const result = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      i56,
      modified,
    );

    expect(result.status).toBe('I57_METHODOLOGY_NOT_AUTHORIZED');
    expect(result.authorityApplicabilityEvidenceAvailable).toBe(false);
    expect(result.items).toEqual([]);
  });

  test('fails closed on unresolved I56 and preserves every effect/force/scoring guard', () => {
    const unresolvedI56 = {
      ...report([]),
      status: 'I54_UNRESOLVED_OR_INVALID' as const,
      settlementDependencyEvidenceAvailable: false,
    };
    const i57 = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const result = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      unresolvedI56,
      i57,
    );

    expect(result.status).toBe('I56_UNRESOLVED_OR_INVALID');
    expect(result.contestOutcomeVerdictAuthorized).toBe(false);
    expect(result.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(result.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(result.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(result.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(result.classificationAuthorized).toBe(false);
    expect(result.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and distinguishes applicability from current-chart substrate verification', () => {
    const i56 = report([baseItem(['COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'])]);
    const i57 = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const first = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      i56,
      i57,
    );
    const second = buildI58ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityEvidence(
      i56,
      i57,
    );

    expect(first.reportId).toBe(second.reportId);
    expect(first.authorityApplicabilityEvidenceAvailable).toBe(true);
    expect(first.currentChartRelationSpecificSettlementEvidenceVerified).toBe(false);
    expect(first.items[0]?.dependencyApplicability[0]?.currentChartSettlementSubstrateVerified).toBe(false);
    expect(first.items[0]?.anySettlementOutcomeResolved).toBe(false);
  });
});
