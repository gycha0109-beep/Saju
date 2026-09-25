import { describe, expect, it } from 'vitest';
import {
  T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005,
  assertT7MethodologyScopedBindingLedgerFRB005,
  buildT7MethodologyScopedBindingLedgerFRB005,
} from './traditional-three-divisions-binding-ledger-frb005.js';
import {
  FACE_TRADITIONAL_T4_METHOD_REFS,
} from './traditional-three-divisions-methodology-t4.js';

describe('FRB005 T7 methodology-scoped binding ledger', () => {
  it('publishes exactly one blocked binding slot for each T4 requirement', () => {
    const ledger = buildT7MethodologyScopedBindingLedgerFRB005();

    expect(ledger.slotCount).toBe(16);
    expect(ledger.bindingSlots).toHaveLength(16);
    expect(new Set(
      ledger.bindingSlots.map((slot) => slot.bindingSlotId),
    ).size).toBe(16);
    expect(ledger.uniqueTraditionalAnchorCount).toBe(7);
    expect(ledger.admittedTraditionalBindingCount).toBe(0);
  });

  it('keeps every neutral observation reference unissued until the observation engine governs it', () => {
    const ledger = T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005;

    for (const slot of ledger.bindingSlots) {
      expect(slot.neutralObservationRef).toBeNull();
      expect(slot.reviewState)
        .toBe('blocked_pending_governed_vertical_reference');
      expect(slot.observationImplementationOwner)
        .toBe('face-observation-engine');
      expect(slot.bridgeTrack).toBe('face-bridge');
      expect(slot.upstreamBindingOwnerLabel)
        .toBe('face-reading-binding');
      expect(slot.unavailablePolicy).toBe('fail_closed');
      expect(slot.traditionalBindingAuthorized).toBe(false);
      expect(slot.bindingProvenanceReady).toBe(false);
    }
  });

  it('preserves FRB004 rejected morphology proxies in the T7 ledger', () => {
    const ledger = T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005;
    const expected = [
      ['trad.anchor.brow', 'eyebrow.span_arch_tail_orientation'],
      ['trad.anchor.shangen', 'nose.bridge_centerline_deviation'],
      ['trad.anchor.zhuntou', 'nose.tip_contour_circularity'],
      ['trad.anchor.renzhong', 'mouth.philtrum_length_width'],
      ['trad.anchor.dige', 'chin_lower_face.visible_contour'],
    ] as const;

    for (const [anchor, proxy] of expected) {
      const slots = ledger.bindingSlots.filter(
        (slot) => slot.traditionalObservationRef === anchor,
      );
      expect(slots.length).toBeGreaterThan(0);
      for (const slot of slots) {
        expect(slot.rejectedProxyFeatureKeys).toContain(proxy);
      }
    }
  });

  it('keeps same-geometry Mayi and Shenyi six-endpoint methodologies in separate binding identities', () => {
    const ledger = T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005;
    const mayi = ledger.methodologyStatuses.find(
      (status) =>
        status.methodologyRef ===
        FACE_TRADITIONAL_T4_METHOD_REFS.mayiThreeFusThreeGovernors,
    );
    const shenyi = ledger.methodologyStatuses.find(
      (status) =>
        status.methodologyRef ===
        FACE_TRADITIONAL_T4_METHOD_REFS.shenyiFuGujinNoncontiguousThreeDivisions,
    );

    expect(mayi).toBeDefined();
    expect(shenyi).toBeDefined();
    expect(mayi!.topology).toBe('noncontiguous_three_spans');
    expect(shenyi!.topology).toBe('noncontiguous_three_spans');
    expect(mayi!.requiredObservationRefs)
      .toEqual(shenyi!.requiredObservationRefs);
    expect(mayi!.bindingSlotIds).not.toEqual(shenyi!.bindingSlotIds);
    expect(
      mayi!.bindingSlotIds.some(
        (slotId) => shenyi!.bindingSlotIds.includes(slotId),
      ),
    ).toBe(false);
  });

  it('keeps all three methodologies blocked until every required anchor is governed', () => {
    const statuses =
      T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005.methodologyStatuses;

    expect(statuses).toHaveLength(3);
    for (const status of statuses) {
      expect(status.admittedBindingCount).toBe(0);
      expect(status.bindingReady).toBe(false);
      expect(status.missingAnchorPolicy).toBe('fail_closed');
      expect(status.sameGeometryAllowsSemanticMerge).toBe(false);
      expect(status.bindingSlotIds).toHaveLength(
        status.requiredBindingCount,
      );
    }
  });

  it('keeps operationalization, claim and production authority closed', () => {
    const ledger = T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005;

    expect(ledger.promotionGate).toEqual({
      allSevenGovernedObservationContractsRequired: true,
      exactMethodologyScopeRequired: true,
      neutralObservationProvenanceRequired: true,
      missingAnchorFailsClosed: true,
      independentBalanceCalibrationRequired: true,
      bindingHandoffEnablesClaimOrRule: false,
    });
    expect(Object.values(ledger.authorityBoundary)
      .every((value) => value === false)).toBe(true);
    expect(() =>
      assertT7MethodologyScopedBindingLedgerFRB005(ledger))
      .not.toThrow();
  });
});