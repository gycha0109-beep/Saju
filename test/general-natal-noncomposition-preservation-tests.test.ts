import { describe, expect, it } from 'vitest';

import {
  R140_ADVERSARIAL_PRESSURES,
  R140_AUTHORITY,
  R140_NON_COMPOSABLE_STATES,
  R140_NON_COMPOSITION_PRESERVATION_VERSION,
  R140_PRESERVATION_VECTORS,
  R140_REJECTED_FAILURE_MODES,
  R140_SAME_ELEMENT_ROLE_CONTROLS,
  R140_SOURCE_PROBES,
  R140_SUMMARY,
  R140_UPSTREAM_BINDINGS,
  r140CanonicalPairStillMatches,
} from '../src/research/general-natal-noncomposition-preservation-tests.js';

describe('R140 non-composition preservation tests', () => {
  it('pins the deterministic preservation surface', () => {
    expect(R140_NON_COMPOSITION_PRESERVATION_VERSION).toBe('0.1.0-research');
    expect(R140_SUMMARY).toEqual({
      sourceProbeCount: 25,
      adversarialPressureCount: 9,
      preservationVectorCount: 225,
      parallelSourceCount: 8,
      unresolvedSourceCount: 12,
      nonCompositionBoundarySourceCount: 5,
      reverseInputVectorCount: 25,
      specialFollowSourceCount: 11,
      sameElementRoleControlCount: 4,
      pairKeyViolationCount: 0,
      evidenceIdentityViolationCount: 0,
      roleIdentityViolationCount: 0,
      methodWinnerEmissionCount: 0,
      numericPriorityEmissionCount: 0,
      finalYongShenEmissionCount: 0,
      mergedRoleEmissionCount: 0,
      specialTransitionEmissionCount: 0,
      executableCount: 0,
      productionAuthorityPromotedCount: 0,
    });
  });

  it('covers every R139 parallel, unresolved, and non-composition probe', () => {
    expect(R140_NON_COMPOSABLE_STATES).toEqual([
      'PARALLEL_PRESERVATION_ONLY',
      'COMPOSITION_UNRESOLVED',
      'NON_COMPOSITION_BOUNDARY',
    ]);
    expect(R140_SOURCE_PROBES).toHaveLength(25);
    expect(
      R140_SOURCE_PROBES.every((item) =>
        R140_NON_COMPOSABLE_STATES.includes(item.compositionState),
      ),
    ).toBe(true);
  });

  it('applies every adversarial pressure to every source probe', () => {
    expect(R140_ADVERSARIAL_PRESSURES).toHaveLength(9);
    for (const source of R140_SOURCE_PROBES) {
      const vectors = R140_PRESERVATION_VECTORS.filter(
        (item) => item.sourceProbeId === source.id,
      );
      expect(vectors).toHaveLength(9);
      expect(new Set(vectors.map((item) => item.adversarialPressure)).size).toBe(9);
    }
  });

  it('preserves canonical pair identity when input order is reversed', () => {
    const reversed = R140_PRESERVATION_VECTORS.filter(
      (item) => item.adversarialPressure === 'REVERSE_INPUT_ORDER',
    );
    expect(reversed).toHaveLength(25);
    expect(reversed.every((item) => r140CanonicalPairStillMatches(item))).toBe(true);
    for (const vector of reversed) {
      expect(vector.perturbedEvidence[0]).toEqual(vector.sourceEvidence[1]);
      expect(vector.perturbedEvidence[1]).toEqual(vector.sourceEvidence[0]);
    }
  });

  it('preserves evidence identity sets under all pressures', () => {
    for (const vector of R140_PRESERVATION_VECTORS) {
      const perturbedIdentities = vector.perturbedEvidence
        .map((item) => item.identity)
        .sort();
      expect(perturbedIdentities).toEqual(vector.expectedEvidenceIdentities);
      expect(vector.evidenceIdentitySetPreserved).toBe(true);
      expect(vector.roleIdentityPreserved).toBe(true);
    }
  });

  it('preserves same-element evidence as different semantic roles', () => {
    expect(R140_SAME_ELEMENT_ROLE_CONTROLS).toHaveLength(4);
    for (const control of R140_SAME_ELEMENT_ROLE_CONTROLS) {
      expect(control.leftRole).not.toBe(control.rightRole);
      expect(control.distinctRolePreserved).toBe(true);
      expect(control.mergedRoleEmitted).toBeNull();
      expect(control.finalYongShenEmitted).toBeNull();
      expect(control.executable).toBe(false);
    }
    expect(R140_REJECTED_FAILURE_MODES).toContain(
      'SAME_ELEMENT_COLLAPSES_DISTINCT_ROLES',
    );
  });

  it('keeps special-follow evidence from becoming an automatic transition', () => {
    const specialSources = R140_SOURCE_PROBES.filter(
      (item) =>
        item.leftMethod === 'SPECIAL_FOLLOW' || item.rightMethod === 'SPECIAL_FOLLOW',
    );
    expect(specialSources).toHaveLength(11);

    const sourceIds = new Set(specialSources.map((item) => item.id));
    const vectors = R140_PRESERVATION_VECTORS.filter((item) =>
      sourceIds.has(item.sourceProbeId),
    );
    expect(vectors).toHaveLength(99);
    expect(vectors.every((item) => item.specialTransitionEmitted === null)).toBe(true);
  });

  it('keeps Tongguan-Bingyao unresolved or parallel without a tie-break winner', () => {
    const sources = R140_SOURCE_PROBES.filter(
      (item) => item.pairKey === 'BINGYAO::FLOW_TONGGUAN',
    );
    expect(sources).toHaveLength(2);
    const ids = new Set(sources.map((item) => item.id));
    const vectors = R140_PRESERVATION_VECTORS.filter((item) =>
      ids.has(item.sourceProbeId),
    );
    expect(vectors).toHaveLength(18);
    expect(vectors.every((item) => item.methodWinnerEmitted === null)).toBe(true);
    expect(vectors.every((item) => item.executable === false)).toBe(true);
  });

  it('rejects every hidden resolver or collapse failure mode', () => {
    expect(R140_REJECTED_FAILURE_MODES).toEqual(
      expect.arrayContaining([
        'INPUT_ORDER_CHANGES_WINNER',
        'METHOD_COUNT_CREATES_WINNER',
        'SOURCE_COUNT_CREATES_WINNER',
        'NUMERIC_PRIORITY_RESOLVES_NON_COMPOSITION',
        'WEIGHTED_PRIORITY_RESOLVES_NON_COMPOSITION',
        'ROLE_COLLAPSE_ERASES_METHOD_SEMANTICS',
        'NON_COMPOSITION_EMITS_FINAL_YONGSHEN',
        'UNRESOLVED_STATE_AUTO_TIEBREAK',
        'ORDINARY_FAILURE_AUTO_SPECIAL_TRANSITION',
        'PARALLEL_EVIDENCE_AUTO_COMPOSITION',
        'NON_COMPOSITION_BOUNDARY_AUTO_ENGINE_ADMISSION',
      ]),
    );
    expect(
      R140_PRESERVATION_VECTORS.every(
        (item) =>
          item.methodWinnerEmitted === null &&
          item.numericPriorityEmitted === null &&
          item.finalYongShenEmitted === null &&
          item.mergedRoleEmitted === null &&
          item.specialTransitionEmitted === null &&
          item.executable === false &&
          item.productionAuthorityPromoted === false,
      ),
    ).toBe(true);
  });

  it('pins R139 upstream authority closed', () => {
    expect(R140_UPSTREAM_BINDINGS.r139).toMatchObject({
      parallelPreservationOnlyCount: 8,
      compositionUnresolvedCount: 12,
      nonCompositionBoundaryCount: 5,
      sameElementDifferentRoleCount: 4,
      globalCompositionAuthorized: false,
      methodWinnerResolverAuthorized: false,
      numericMethodPriorityAuthorized: false,
      finalYongShenAuthorized: false,
      roleCollapseAuthorized: false,
      automaticSpecialTransitionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });

  it('keeps all resolver, engine, product, and production authority closed', () => {
    expect(R140_AUTHORITY).toMatchObject({
      researchOnly: true,
      allR139NonCompositionStatesCovered: true,
      adversarialOrderPreservationObserved: true,
      evidenceIdentityPreservationObserved: true,
      roleIdentityPreservationObserved: true,
      sameElementDifferentRolePreserved: true,
      methodWinnerLeakObserved: false,
      numericPriorityLeakObserved: false,
      finalYongShenLeakObserved: false,
      roleCollapseLeakObserved: false,
      specialTransitionLeakObserved: false,
      executableLeakObserved: false,
      productionAuthorityLeakObserved: false,
      methodWinnerResolverAuthorized: false,
      automaticTieBreakAuthorized: false,
      numericMethodPriorityAuthorized: false,
      finalYongShenAuthorized: false,
      roleCollapseAuthorized: false,
      automaticSpecialTransitionAuthorized: false,
      chartRoleFactEmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
