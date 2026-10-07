import { describe, expect, it } from 'vitest';

import {
  buildSajuR32BoundedStrengthSynthesisFrontier,
  SAJU_R32_BOUNDED_STRENGTH_SYNTHESIS_FRONTIER_AUTHORITY,
  type SajuR32BoundedStrengthSynthesisFrontierInput,
} from '../src/research/saju-r32-bounded-strength-synthesis-frontier.js';
import type {
  StrengthDecisionBlocker,
  StrengthDecisionReadinessReport,
} from '../src/research/i23-strength-decision-readiness.js';

type InventoryInput =
  SajuR32BoundedStrengthSynthesisFrontierInput['supportInventory'];

const resolvedInventory = {
  status: 'resolved',
} as InventoryInput;

const unavailableInventory = {
  status: 'unavailable',
  reasonCode: 'test-upstream-unavailable',
} as InventoryInput;

function readiness(
  status: StrengthDecisionReadinessReport['status'] = 'METHODOLOGY_BLOCKED',
  blockers: readonly StrengthDecisionBlocker[] = [
    'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
    'CHALLENGE_EFFECT_COMPOSITION_MISSING',
    'CLASSIFIER_POLICY_NOT_AUTHORIZED',
  ],
): StrengthDecisionReadinessReport {
  return {
    reportId: 'r32-test-' + status,
    reportVersion: 'myeonghwa-strength-decision-readiness-v1',
    status,
    terminalDecision:
      status === 'INPUT_INDETERMINATE'
        ? 'STOP_WITH_INDETERMINATE'
        : status === 'SPECIAL_PATTERN_REVIEW_REQUIRED'
          ? 'ROUTE_SPECIAL_PATTERN_REVIEW'
          : 'STOP_FOR_METHODOLOGY_REVIEW',
    upstreamReportIds: {
      specialPattern: 'special-test',
      postRelationRoot: 'root-test',
      supportFrontier: 'support-test',
      clashRescue: 'rescue-test',
    },
    blockers,
    blockerEvidence: blockers.map((blocker) => ({
      blocker,
      reason: 'test:' + blocker,
    })),
    ordinaryStrengthClassificationAuthorized: false,
    numericScoringAuthorized: false,
    strongWeakVerdict: 'not_emitted',
    notes: [],
  };
}

describe('SAJU-R32 bounded strength synthesis frontier', () => {
  it('preserves the unresolved Yin Changsheng decision and authorizes no classifier shortcut', () => {
    expect(SAJU_R32_BOUNDED_STRENGTH_SYNTHESIS_FRONTIER_AUTHORITY).toMatchObject({
      decisionRef: 'GH-2351',
      preservedRootConflictPolicy:
        'PRESERVE_YIN_CHANGSHENG_SOURCE_STRATA_CONFLICT_UNRESOLVED',
      sourceStrataPrecedenceAuthorized: false,
      rootConflictMayBeReopenedAsUserPreferenceGate: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      numericStrengthAuthorized: false,
      supportChallengeSubtractionAuthorized: false,
      productionAuthorityAuthorized: false,
    });
  });

  it('opens independent methodology lanes when governed inputs are ready but I23 remains methodology-blocked', () => {
    const result = buildSajuR32BoundedStrengthSynthesisFrontier({
      supportInventory: resolvedInventory,
      strengthReadiness: readiness(),
    });

    expect(result.status).toBe(
      'BOUNDED_SYNTHESIS_FRONTIER_READY_METHODOLOGY_BLOCKED',
    );
    expect(result.terminalDecision).toBe(
      'CONTINUE_INDEPENDENT_METHODOLOGY_SYNTHESIS',
    );
    expect(result.ordinarySynthesisInputReady).toBe(true);
    expect(result.globalRootCompletenessBlocksAllIndependentResearch).toBe(false);
    expect(result.blockerFamilies.root).toMatchObject({
      state: 'PARTIAL_WITH_PRESERVED_CONFLICT',
      independentMethodologyMayProceed: true,
      sourceConflictReopeningRequired: false,
    });
    expect(result.blockerFamilies.root.blockers).toEqual(
      expect.arrayContaining([
        'YIN_CHANGSHENG_SOURCE_CONFLICT_PRESERVED',
        'YIN_LU_AMBIGUOUS',
        'EARTH_LU_ATTACHMENT_UNRESOLVED',
        'EARTH_YUQI_UNRESOLVED',
        'NEGATIVE_ROOT_ABSENCE_SEMANTICS_MISSING',
      ]),
    );
    expect(result.blockerFamilies.support.blockers).toContain(
      'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
    );
    expect(result.blockerFamilies.challenge.blockers).toContain(
      'CHALLENGE_EFFECT_COMPOSITION_MISSING',
    );
    expect(result.blockerFamilies.classifier.blockers).toContain(
      'CLASSIFIER_POLICY_NOT_AUTHORIZED',
    );
    expect(result.nextEligiblePrimitives).toEqual([
      'CHART_LOCAL_ROOT_APPLICABILITY_ROUTER',
      'BOUNDED_SUPPORT_EFFECT_SYNTHESIS',
      'BOUNDED_CHALLENGE_EFFECT_SYNTHESIS',
    ]);
    expect(result.recommendedNextPrimitive).toBe(
      'CHART_LOCAL_ROOT_APPLICABILITY_ROUTER',
    );
  });

  it('fails the frontier closed when the R31 governed support inventory is unavailable', () => {
    const result = buildSajuR32BoundedStrengthSynthesisFrontier({
      supportInventory: unavailableInventory,
      strengthReadiness: readiness(),
    });

    expect(result.status).toBe('INPUT_FRONTIER_UNAVAILABLE');
    expect(result.terminalDecision).toBe(
      'STOP_WITH_INPUT_FRONTIER_UNAVAILABLE',
    );
    expect(result.ordinarySynthesisInputReady).toBe(false);
    expect(result.nextEligiblePrimitives).toEqual([]);
    expect(result.upstream.supportInventoryReasonCode).toBe(
      'test-upstream-unavailable',
    );
  });

  it('keeps indeterminate I23 inputs out of methodology synthesis', () => {
    const result = buildSajuR32BoundedStrengthSynthesisFrontier({
      supportInventory: resolvedInventory,
      strengthReadiness: readiness('INPUT_INDETERMINATE', [
        'INPUT_OR_SCENARIO_INDETERMINATE',
      ]),
    });

    expect(result.status).toBe('INPUT_FRONTIER_UNAVAILABLE');
    expect(result.ordinarySynthesisInputReady).toBe(false);
    expect(result.recommendedNextPrimitive).toBeNull();
  });

  it('routes special-pattern cases away from ordinary strength synthesis', () => {
    const result = buildSajuR32BoundedStrengthSynthesisFrontier({
      supportInventory: resolvedInventory,
      strengthReadiness: readiness('SPECIAL_PATTERN_REVIEW_REQUIRED', [
        'SPECIAL_PATTERN_REVIEW_UNRESOLVED',
        'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
        'CHALLENGE_EFFECT_COMPOSITION_MISSING',
        'CLASSIFIER_POLICY_NOT_AUTHORIZED',
      ]),
    });

    expect(result.status).toBe('SPECIAL_PATTERN_ROUTE_REQUIRED');
    expect(result.terminalDecision).toBe('ROUTE_SPECIAL_PATTERN_REVIEW');
    expect(result.ordinarySynthesisInputReady).toBe(false);
    expect(result.nextEligiblePrimitives).toEqual(['SPECIAL_PATTERN_REVIEW']);
    expect(result.recommendedNextPrimitive).toBe('SPECIAL_PATTERN_REVIEW');
  });

  it('preserves support and challenge as separate non-additive methodology families', () => {
    const result = buildSajuR32BoundedStrengthSynthesisFrontier({
      supportInventory: resolvedInventory,
      strengthReadiness: readiness('METHODOLOGY_BLOCKED', [
        'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
        'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
        'RESCUE_EFFECT_UNRESOLVED',
        'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
        'CHALLENGE_EFFECT_COMPOSITION_MISSING',
        'CLASSIFIER_POLICY_NOT_AUTHORIZED',
      ]),
    });

    expect(result.blockerFamilies.support.blockers).toEqual([
      'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
      'RESCUE_EFFECT_UNRESOLVED',
      'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
    ]);
    expect(result.blockerFamilies.challenge.blockers).toEqual([
      'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
      'RESCUE_EFFECT_UNRESOLVED',
      'CHALLENGE_EFFECT_COMPOSITION_MISSING',
    ]);
    expect(result.constraints.supportChallengeSubtractionAuthorized).toBe(false);
    expect(result.constraints.numericStrengthAuthorized).toBe(false);
  });

  it('is deterministic for the same governed frontier inputs', () => {
    const input = {
      supportInventory: resolvedInventory,
      strengthReadiness: readiness(),
    };
    const first = buildSajuR32BoundedStrengthSynthesisFrontier(input);
    const second = buildSajuR32BoundedStrengthSynthesisFrontier(input);

    expect(first).toEqual(second);
    expect(first.frontierId).toBe(second.frontierId);
  });
});
