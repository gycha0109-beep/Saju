import { describe, expect, it } from 'vitest';

import {
  R137_AUTHORITY,
  R137_CONFLICT_PROBES,
  R137_REJECTED_COLLAPSES,
  R137_SUMMARY,
  R137_TIAOHOU_STRUCTURE_CONFLICT_VERSION,
  R137_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-tiaohou-structure-conflict-preservation.js';

describe('R137 Tiaohou-versus-structure conflict preservation', () => {
  it('pins the deterministic corpus shape', () => {
    expect(R137_TIAOHOU_STRUCTURE_CONFLICT_VERSION).toBe('0.1.0-research');
    expect(R137_SUMMARY).toEqual({
      rowCount: 24,
      comparisonGroupCount: 8,
      r039SeedReplayCount: 3,
      coexistenceCount: 10,
      potentialConflictStressCount: 6,
      climateUrgentWithoutOverrideCount: 6,
      methodNotApplicableCount: 2,
      indeterminateCount: 1,
      sameClimateDifferentStructureCount: 4,
      sameStructureDifferentClimateCount: 4,
      sourceVerifiedTrueConflictCount: 0,
      syntheticContradictionCount: 6,
      methodWinnerAuthorizedCount: 0,
      numericPriorityAuthorizedCount: 0,
      finalYongShenAuthorizedCount: 0,
      executableCount: 0,
    });
  });

  it('replays all three governed R039 seed cases without forcing a winner', () => {
    const seeds = R137_CONFLICT_PROBES.filter((item) => item.r039SeedReplay);
    expect(seeds).toHaveLength(3);
    expect(seeds.every((item) => item.relation === 'COEXISTING_DIFFERENT_ROLES')).toBe(true);
    expect(seeds.every((item) => item.methodWinnerAuthorized === false)).toBe(true);
  });

  it('keeps direct coexistence distinct from source-verified true conflict', () => {
    expect(R137_SUMMARY.coexistenceCount).toBeGreaterThanOrEqual(6);
    expect(R137_SUMMARY.sourceVerifiedTrueConflictCount).toBe(0);
    expect(R137_UPSTREAM_BINDINGS.r039.trueConflictCaseVerified).toBe(false);
  });

  it('keeps synthetic contradiction probes unresolved and non-authoritative', () => {
    const stress = R137_CONFLICT_PROBES.filter((item) => item.syntheticContradiction);
    expect(stress).toHaveLength(6);
    expect(
      stress.every((item) => item.relation === 'POTENTIAL_CONFLICT_STRESS_UNRESOLVED'),
    ).toBe(true);
    expect(stress.every((item) => item.provenance === 'RESEARCH_SYNTHETIC_STRESS_PROBE')).toBe(
      true,
    );
    expect(stress.every((item) => item.sourceVerifiedTrueConflict === false)).toBe(true);
    expect(stress.every((item) => item.unresolvedOperands.length > 0)).toBe(true);
  });

  it('preserves same climate need across different structural contexts', () => {
    const rows = R137_CONFLICT_PROBES.filter((item) => item.sameClimateDifferentStructure);
    expect(rows).toHaveLength(4);
    expect(new Set(rows.map((item) => item.structuralMethod)).size).toBeGreaterThan(1);
    expect(new Set(rows.map((item) => item.relation)).size).toBeGreaterThan(1);
  });

  it('preserves the same structural need across different climate contexts', () => {
    const rows = R137_CONFLICT_PROBES.filter((item) => item.sameStructureDifferentClimate);
    expect(rows).toHaveLength(4);
    expect(new Set(rows.map((item) => item.tiaohouNeed)).size).toBeGreaterThan(1);
    expect(new Set(rows.map((item) => item.relation)).size).toBeGreaterThan(1);
  });

  it('rejects both global override directions and hidden tie-breakers', () => {
    expect(R137_REJECTED_COLLAPSES).toContain('TIAOHOU_ALWAYS_OVERRIDES_STRUCTURE');
    expect(R137_REJECTED_COLLAPSES).toContain('STRUCTURE_ALWAYS_OVERRIDES_TIAOHOU');
    expect(R137_REJECTED_COLLAPSES).toContain('UNRESOLVED_CONFLICT_AUTO_TIEBREAK');
    expect(R137_CONFLICT_PROBES.every((item) => item.numericPriorityAuthorized === false)).toBe(
      true,
    );
  });

  it('pins upstream authority closed', () => {
    expect(R137_UPSTREAM_BINDINGS.r034).toMatchObject({
      climateRequiredElementAlwaysFinalYongshen: false,
      climateOverridesStrengthInAllCharts: false,
      singleGlobalPriorityOrderAuthorized: false,
      executableTiaohouResolverAuthorized: false,
      globalPriorityResolverAuthorized: false,
    });
    expect(R137_UPSTREAM_BINDINGS.r039).toMatchObject({
      trueConflictCaseVerified: false,
      forceSingleWinnerAuthorized: false,
      numericPriorityAuthorized: false,
    });
    expect(R137_UPSTREAM_BINDINGS.r040).toMatchObject({
      finalYongShenFieldAuthorized: false,
      methodWinnerResolverAuthorized: false,
      chartRoleAssignmentAuthorized: false,
    });
    expect(R137_UPSTREAM_BINDINGS.r136).toMatchObject({
      genericYongShenResolverAuthorized: false,
      temporalRoleReassignmentResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('closes all resolver and production authority', () => {
    expect(R137_AUTHORITY).toMatchObject({
      researchOnly: true,
      sourceVerifiedTrueConflictAuthorized: false,
      tiaohouAlwaysOverridesStructureAuthorized: false,
      structureAlwaysOverridesTiaohouAuthorized: false,
      methodWinnerResolverAuthorized: false,
      automaticTieBreakAuthorized: false,
      numericMethodPriorityAuthorized: false,
      finalYongShenAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
