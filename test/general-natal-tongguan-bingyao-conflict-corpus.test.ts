import { describe, expect, it } from 'vitest';

import {
  R138_AUTHORITY,
  R138_CONFLICT_PROBES,
  R138_REJECTED_COLLAPSES,
  R138_SUMMARY,
  R138_TONGGUAN_BINGYAO_CONFLICT_VERSION,
  R138_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-tongguan-bingyao-conflict-corpus.js';

describe('R138 Tongguan-versus-Bingyao resolution conflict corpus', () => {
  it('pins the deterministic corpus shape', () => {
    expect(R138_TONGGUAN_BINGYAO_CONFLICT_VERSION).toBe('0.1.0-research');
    expect(R138_SUMMARY).toEqual({
      rowCount: 24,
      comparisonGroupCount: 8,
      directFamilySeedCount: 4,
      tongguanPlausibleBingyaoUnresolvedCount: 6,
      bingyaoPlausibleTongguanUnresolvedCount: 6,
      coexistenceCount: 4,
      potentialConflictStressCount: 4,
      methodNotApplicableCount: 2,
      indeterminateCount: 2,
      syntheticOppositionCount: 4,
      sourceVerifiedCrossMethodTrueConflictCount: 0,
      crossMethodWinnerAuthorizedCount: 0,
      numericPriorityAuthorizedCount: 0,
      finalYongShenAuthorizedCount: 0,
      executableCount: 0,
    });
  });

  it('preserves Tongguan plausibility without inferring Bingyao', () => {
    const rows = R138_CONFLICT_PROBES.filter(
      (item) => item.relation === 'TONGGUAN_PLAUSIBLE_BINGYAO_UNRESOLVED',
    );
    expect(rows).toHaveLength(6);
    expect(rows.every((item) => item.tongguanState === 'RESEARCH_PLAUSIBLE')).toBe(true);
    expect(rows.every((item) => item.bingyaoState === 'UNRESOLVED')).toBe(true);
  });

  it('preserves Bingyao plausibility without inferring Tongguan', () => {
    const rows = R138_CONFLICT_PROBES.filter(
      (item) => item.relation === 'BINGYAO_PLAUSIBLE_TONGGUAN_UNRESOLVED',
    );
    expect(rows).toHaveLength(6);
    expect(rows.every((item) => item.bingyaoState === 'RESEARCH_PLAUSIBLE')).toBe(true);
    expect(rows.every((item) => item.tongguanState === 'UNRESOLVED')).toBe(true);
  });

  it('allows distinct families to coexist without selecting a winner', () => {
    const rows = R138_CONFLICT_PROBES.filter(
      (item) => item.relation === 'COEXISTING_DISTINCT_RESOLUTION_FAMILIES',
    );
    expect(rows).toHaveLength(4);
    expect(rows.every((item) => item.crossMethodWinnerAuthorized === false)).toBe(true);
  });

  it('keeps synthetic opposing resolutions unresolved and non-source-verified', () => {
    const rows = R138_CONFLICT_PROBES.filter((item) => item.syntheticOpposition);
    expect(rows).toHaveLength(4);
    expect(
      rows.every((item) => item.relation === 'POTENTIAL_RESOLUTION_CONFLICT_UNRESOLVED'),
    ).toBe(true);
    expect(rows.every((item) => item.sourceVerifiedCrossMethodTrueConflict === false)).toBe(true);
    expect(rows.every((item) => item.unresolvedOperands.length > 0)).toBe(true);
  });

  it('preserves not-applicable and indeterminate controls', () => {
    expect(R138_SUMMARY.methodNotApplicableCount).toBe(2);
    expect(R138_SUMMARY.indeterminateCount).toBe(2);
  });

  it('rejects shortcut resolvers and hidden precedence', () => {
    expect(R138_REJECTED_COLLAPSES).toContain('MIDDLE_ELEMENT_LOOKUP_AS_TONGGUAN');
    expect(R138_REJECTED_COLLAPSES).toContain('FIXED_ELEMENT_DISEASE_OR_REMEDY_TABLE');
    expect(R138_REJECTED_COLLAPSES).toContain('TONGGUAN_ALWAYS_OVERRIDES_BINGYAO');
    expect(R138_REJECTED_COLLAPSES).toContain('BINGYAO_ALWAYS_OVERRIDES_TONGGUAN');
    expect(R138_REJECTED_COLLAPSES).toContain('UNRESOLVED_CONFLICT_AUTO_TIEBREAK');
  });

  it('pins all upstream resolver authority closed', () => {
    expect(R138_UPSTREAM_BINDINGS.r037).toMatchObject({
      distinctResolutionFamilyVerified: true,
      executableTongguanResolverAuthorized: false,
      universalMediatorSelectionAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R138_UPSTREAM_BINDINGS.r038).toMatchObject({
      relationalDiseaseRemedyFramingVerified: true,
      executableBingYaoResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
    expect(R138_UPSTREAM_BINDINGS.r039).toMatchObject({
      trueConflictCaseVerified: false,
      forceSingleWinnerAuthorized: false,
      numericPriorityAuthorized: false,
    });
    expect(R138_UPSTREAM_BINDINGS.r040).toMatchObject({
      finalYongShenFieldAuthorized: false,
      methodWinnerResolverAuthorized: false,
      chartRoleAssignmentAuthorized: false,
    });
    expect(R138_UPSTREAM_BINDINGS.r137).toMatchObject({
      sourceVerifiedTrueConflictAuthorized: false,
      methodWinnerResolverAuthorized: false,
      automaticTieBreakAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('closes cross-method and production authority', () => {
    expect(R138_AUTHORITY).toMatchObject({
      researchOnly: true,
      sourceVerifiedCrossMethodTrueConflictAuthorized: false,
      genericTongguanMediatorResolverAuthorized: false,
      genericBingyaoDiseaseRemedyResolverAuthorized: false,
      crossMethodWinnerResolverAuthorized: false,
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
