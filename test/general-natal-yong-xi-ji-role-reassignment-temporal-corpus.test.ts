import { describe, expect, it } from 'vitest';

import {
  R136_AUTHORITY,
  R136_REJECTED_SHORTCUTS,
  R136_SUMMARY,
  R136_TEMPORAL_ROLE_PROBES,
  R136_UPSTREAM_BINDINGS,
  R136_YONG_XI_JI_TEMPORAL_CORPUS_VERSION,
} from '../src/research/general-natal-yong-xi-ji-role-reassignment-temporal-corpus';

describe('R136 Yong/Xi/Ji role-reassignment temporal corpus', () => {
  it('pins the research version and deterministic corpus shape', () => {
    expect(R136_YONG_XI_JI_TEMPORAL_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R136_SUMMARY).toEqual({
      rowCount: 24,
      comparisonGroupCount: 11,
      representedNatalRoleCount: 3,
      retainedRoleTemporalInteractionCount: 6,
      latentActivationWithoutReassignmentCount: 4,
      structuralReassignmentUnresolvedCount: 11,
      rescueBlockingCounterexampleCount: 5,
      samePerturbationContextRowCount: 6,
      samePerturbationContextGroupCount: 3,
      temporaryPermanentBoundaryCount: 4,
      sourceGovernedRoleChangeControlCount: 1,
      temporalExtrapolationBlockedCount: 1,
      roleReassignmentObservedCount: 1,
      temporalRoleReassignmentAuthorizedCount: 0,
      permanentNatalMutationAuthorizedCount: 0,
      eventPredictionAuthorizedCount: 0,
      executableCount: 0,
    });
  });

  it('represents all three natal role baselines without collapsing them', () => {
    expect(new Set(R136_TEMPORAL_ROLE_PROBES.map((item) => item.baselineRole))).toEqual(
      new Set(['YONG', 'XI', 'JI']),
    );
  });

  it('keeps ordinary temporal support/opposition as retained natal roles', () => {
    const retained = R136_TEMPORAL_ROLE_PROBES.filter(
      (item) => item.retainedRoleTemporalInteraction,
    );
    expect(retained).toHaveLength(6);
    expect(retained.every((item) => item.resultingRole === item.baselineRole)).toBe(true);
    expect(retained.every((item) => item.roleReassignmentObserved === false)).toBe(true);
  });

  it('keeps latent activation distinct from role reassignment and permanent mutation', () => {
    const latent = R136_TEMPORAL_ROLE_PROBES.filter(
      (item) => item.latentActivationWithoutReassignment,
    );
    expect(latent).toHaveLength(4);
    expect(latent.every((item) => item.resultState === 'TEMPORARILY_OPERATIVE_SAME_ROLE')).toBe(
      true,
    );
    expect(latent.every((item) => item.resultingRole === item.baselineRole)).toBe(true);
    expect(latent.every((item) => item.temporaryPermanentBoundary)).toBe(true);
    expect(latent.every((item) => item.permanentNatalMutationAuthorized === false)).toBe(true);
  });

  it('leaves structural completion/change role settlement unresolved', () => {
    const unresolved = R136_TEMPORAL_ROLE_PROBES.filter(
      (item) => item.structuralReassignmentUnresolved,
    );
    expect(unresolved.length).toBeGreaterThanOrEqual(4);
    expect(
      unresolved.every(
        (item) =>
          item.resultState === 'ROLE_REASSIGNMENT_UNRESOLVED' ||
          item.resultState === 'INDETERMINATE',
      ),
    ).toBe(true);
    expect(unresolved.every((item) => item.temporalRoleReassignmentAuthorized === false)).toBe(
      true,
    );
  });

  it('preserves natal rescue/blocking counterexamples', () => {
    const counterexamples = R136_TEMPORAL_ROLE_PROBES.filter(
      (item) => item.rescueBlockingCounterexample,
    );
    expect(counterexamples).toHaveLength(5);
    expect(counterexamples.every((item) => item.temporalRoleReassignmentAuthorized === false)).toBe(
      true,
    );
  });

  it('records same temporal perturbation with context-dependent outcomes', () => {
    const rows = R136_TEMPORAL_ROLE_PROBES.filter(
      (item) => item.samePerturbationContextKey !== null,
    );
    expect(rows).toHaveLength(6);

    const byKey = new Map<string, typeof rows>();
    for (const row of rows) {
      const key = row.samePerturbationContextKey as string;
      byKey.set(key, [...(byKey.get(key) ?? []), row]);
    }

    expect(byKey.size).toBe(3);
    for (const pair of byKey.values()) {
      expect(pair).toHaveLength(2);
      expect(new Set(pair.map((item) => item.resultState)).size).toBeGreaterThan(1);
    }
  });

  it('keeps the R033 source-governed role change as a non-temporal control', () => {
    const control = R136_TEMPORAL_ROLE_PROBES.find(
      (item) => item.sourceGovernedRoleChangeControl,
    );
    expect(control).toMatchObject({
      baselineRole: 'JI',
      resultingRole: 'XI',
      roleReassignmentObserved: true,
      temporalRoleReassignmentAuthorized: false,
      provenanceKind: 'SOURCE_GOVERNED_NON_TEMPORAL_CONTROL',
    });

    const blocked = R136_TEMPORAL_ROLE_PROBES.find(
      (item) => item.temporalExtrapolationBlocked,
    );
    expect(blocked).toMatchObject({
      resultState: 'INDETERMINATE',
      roleReassignmentObserved: false,
      temporalRoleReassignmentAuthorized: false,
    });
  });

  it('pins rejected shortcuts against automatic temporal role switching', () => {
    expect(R136_REJECTED_SHORTCUTS).toContain('EVERY_DAYUN_RESELECTS_YONGSHEN');
    expect(R136_REJECTED_SHORTCUTS).toContain('LATENT_ACTIVATION_EQUALS_ROLE_REASSIGNMENT');
    expect(R136_REJECTED_SHORTCUTS).toContain(
      'STRUCTURAL_CHANGE_EQUALS_AUTOMATIC_ROLE_REASSIGNMENT',
    );
    expect(R136_REJECTED_SHORTCUTS).toContain(
      'SOURCE_GOVERNED_ROLE_CHANGE_EQUALS_GENERIC_TEMPORAL_SWITCHER',
    );
    expect(R136_REJECTED_SHORTCUTS).toContain(
      'TEMPORARY_OPERATIVE_STATE_EQUALS_PERMANENT_NATAL_MUTATION',
    );
  });

  it('pins every upstream resolver boundary closed', () => {
    expect(R136_UPSTREAM_BINDINGS.r032r033).toMatchObject({
      genericXiShenResolverAuthorized: false,
      genericJiShenResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R136_UPSTREAM_BINDINGS.r040).toMatchObject({
      finalYongShenFieldAuthorized: false,
      methodWinnerResolverAuthorized: false,
      chartRoleAssignmentAuthorized: false,
    });
    expect(R136_UPSTREAM_BINDINGS.r072.executableDayunInteractionResolverAuthorized).toBe(false);
    expect(R136_UPSTREAM_BINDINGS.r073).toMatchObject({
      executableTimingResolverAuthorized: false,
      activationImpliesPermanentNatalChange: false,
      activationImpliesConcreteEvent: false,
    });
    expect(R136_UPSTREAM_BINDINGS.r076).toMatchObject({
      executableBreakRecoveryResolverAuthorized: false,
      permanentNatalMutationAuthorized: false,
    });
    expect(R136_UPSTREAM_BINDINGS.r077).toMatchObject({
      automaticTemporalYongshenReselectionAuthorized: false,
      permanentYongxiReplacementAuthorized: false,
      executableTemporalYongxiSwitcherAuthorized: false,
    });
    expect(R136_UPSTREAM_BINDINGS.r135).toMatchObject({
      temporalTransitionSemanticsAuthorized: false,
      transitionResolverAuthorized: false,
    });
  });

  it('closes all R136 execution and production authority', () => {
    expect(R136_AUTHORITY).toMatchObject({
      researchOnly: true,
      automaticTemporalYongshenReselectionAuthorized: false,
      genericXiShenResolverAuthorized: false,
      genericJiShenResolverAuthorized: false,
      genericYongShenResolverAuthorized: false,
      temporalRoleReassignmentResolverAuthorized: false,
      structuralChangeAutoRoleReassignmentAuthorized: false,
      latentActivationAutoRoleReassignmentAuthorized: false,
      permanentNatalRoleMutationAuthorized: false,
      scalarRoleScoreAuthorized: false,
      numericRoleConfidenceAuthorized: false,
      temporalEventPredictionAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
