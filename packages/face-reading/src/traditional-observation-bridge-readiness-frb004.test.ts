import { describe, expect, it } from 'vitest';
import {
  T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004,
  assertT4CanonicalObservationBridgeAuditFRB004,
  buildT4CanonicalObservationBridgeAuditFRB004,
} from './traditional-observation-bridge-readiness-frb004.js';
import {
  FACE_TRADITIONAL_T4_METHOD_REFS,
} from './traditional-three-divisions-methodology-t4.js';

describe('FRB004 T4 canonical observation bridge', () => {
  it('consumes the complete 29-feature schema while keeping all 16 T4 requirements explicit', () => {
    const audit = buildT4CanonicalObservationBridgeAuditFRB004();

    expect(audit.engineBaseline).toBe('FR293_COMPLETE_FR282_SCHEMA');
    expect(audit.completeSchemaInvariant).toEqual({
      fr282FeatureCount: 29,
      representedFeatureCount: 29,
      structurallyMissingFeatureCount: 0,
      pendingFeatureCount: 0,
    });
    expect(audit.reconstructedMethodologyCount).toBe(3);
    expect(audit.t4RequirementCount).toBe(16);
    expect(audit.requirementBindings).toHaveLength(16);
    expect(audit.uniqueTraditionalObservationCount).toBe(7);
  });

  it('keeps all reconstructed T4 methodology identities separate', () => {
    const audit = T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004;

    expect(audit.methodologies.map((entry) => entry.methodologyRef))
      .toEqual([
        FACE_TRADITIONAL_T4_METHOD_REFS.mayiContiguousThreeDivisions,
        FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
        FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
      ]);

    const sanfu = audit.methodologies[1]!;
    const shenyi = audit.methodologies[2]!;
    expect(sanfu.uniqueObservationRefs).toEqual(
      expect.arrayContaining(shenyi.uniqueObservationRefs),
    );
    expect(sanfu.methodologyRef).not.toBe(shenyi.methodologyRef);
    expect(audit.crossMethodologyPolicy).toEqual({
      geometryEqualityImpliesMethodologyIdentity: false,
      geometryEqualityImpliesSemanticIdentity: false,
      blockedSourceMayBorrowAnotherMethodology: false,
      heuristicFeatureNameBindingAuthorized: false,
    });
  });

  it('recognizes the hairline schema candidate but keeps the governed vertical reference blocked', () => {
    const entries =
      T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004.requirementBindings
        .filter((entry) =>
          entry.traditionalObservationRef === 'trad.anchor.hairline');

    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.candidateCanonicalFeatureKeys)
        .toContain('forehead.visible_hairline_boundary');
      expect(entry.observationState).toBe('represented_unavailable');
      expect(entry.bindingState).toBe('blocked_engine_observation');
      expect(entry.traditionalEquivalenceAuthorized).toBe(false);
      expect(entry.blockerOwner).toBe('face-observation-engine');
    }
  });

  it('rejects newly materialized morphology as vertical-anchor authority', () => {
    const audit = T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004;
    const cases = [
      ['trad.anchor.brow', 'eyebrow.span_arch_tail_orientation'],
      ['trad.anchor.shangen', 'nose.bridge_centerline_deviation'],
      ['trad.anchor.zhuntou', 'nose.tip_contour_circularity'],
      ['trad.anchor.renzhong', 'mouth.philtrum_length_width'],
      ['trad.anchor.dige', 'chin_lower_face.visible_contour'],
    ] as const;

    for (const [observationRef, proxy] of cases) {
      const entries = audit.requirementBindings.filter(
        (entry) => entry.traditionalObservationRef === observationRef,
      );
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.rejectedProxyFeatureKeys).toContain(proxy);
        expect(entry.observationState)
          .toBe('related_morphology_materialized_not_anchor');
        expect(entry.bindingState).toBe('candidate_not_equivalent');
        expect(entry.traditionalEquivalenceAuthorized).toBe(false);
      }
    }
  });

  it('keeps Yintang as a real observation gap instead of inventing an interbrow proxy', () => {
    const entries =
      T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004.requirementBindings
        .filter((entry) =>
          entry.traditionalObservationRef === 'trad.anchor.yintang');

    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.candidateCanonicalFeatureKeys).toEqual([]);
      expect(entry.rejectedProxyFeatureKeys).toEqual([]);
      expect(entry.observationState)
        .toBe('no_semantically_admissible_feature');
      expect(entry.bindingState)
        .toBe('no_semantically_admissible_feature');
    }
  });

  it('preserves T4 blocked-source candidates without borrowing a reconstructed methodology', () => {
    const gates =
      T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004.blockedSourceGates;

    expect(gates.map((entry) => entry.sourceKey)).toEqual([
      'shenxiangNlc1925',
      'liuzhuangNlc1925',
      'taiqingNlc1925',
      'renlunSiku',
    ]);
    for (const gate of gates) {
      expect(gate.status)
        .toBe('blocked_before_methodology_reconstruction');
      expect(gate.owner).toBe('face-traditional-research');
      expect(gate.bridgeSubstitutionAuthorized).toBe(false);
    }
  });

  it('uses merged T5 only as a fail-closed prerequisite guard', () => {
    const audit = T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004;

    expect(audit.t5Guard).toEqual({
      prerequisiteCount: 7,
      allPrerequisitesRemainBlocked: true,
      concreteCoordinateFrameAuthorized: false,
      executableMetricFormulaAuthorized: false,
      numericBalanceToleranceAuthorized: false,
      nearEqualBandAuthorized: false,
      crossLineageMetricIdentityAuthorized: false,
    });
    expect(audit.methodologies.every((entry) =>
      entry.operationalizationBindingReady === false
      && entry.ruleExecutionReady === false
      && entry.claimEmissionReady === false,
    )).toBe(true);
  });

  it('keeps all execution, threshold, claim and production authority closed', () => {
    const audit = T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004;

    expect(Object.values(audit.authorityBoundary)
      .every((value) => value === false)).toBe(true);
    expect(() =>
      assertT4CanonicalObservationBridgeAuditFRB004(audit))
      .not.toThrow();
  });
});