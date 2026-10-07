import { describe, expect, it } from 'vitest';

import {
  FR260_REFERENCE_REF,
} from './visible-lower-face-inferior-vertical-reference-fr260.js';
import {
  FR302_BROW_VERTICAL_REFERENCE_REF,
  FR302_INTERBROW_VERTICAL_REFERENCE_REF,
} from './brow-interbrow-vertical-reference-fr302.js';
import {
  FR304_NASAL_APEX_HANDOFF_REF,
  FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF,
} from './nasal-vertical-reference-handoffs-fr304.js';
import {
  FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF,
} from './common-frame-bridge-fr315.js';
import {
  T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005,
} from './traditional-three-divisions-binding-ledger-frb005.js';
import {
  T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006,
  assertFRB006PartialBindingLedger,
} from './traditional-three-divisions-partial-binding-ledger-frb006.js';

describe('FRB006 partial governed vertical-reference binding ledger', () => {
  it('admits exactly six neutral anchor mappings and leaves only hairline blocked', () => {
    const ledger =
      T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006;

    expect(() =>
      assertFRB006PartialBindingLedger(ledger),
    ).not.toThrow();

    expect(ledger.slotCount).toBe(16);
    expect(ledger.admittedTraditionalBindingCount).toBe(13);
    expect(ledger.blockedTraditionalBindingCount).toBe(3);
    expect(ledger.admittedUniqueTraditionalAnchorCount).toBe(6);
    expect(ledger.blockedUniqueTraditionalAnchorCount).toBe(1);

    const blocked = ledger.bindingSlots.filter(
      (slot) => !slot.traditionalBindingAuthorized,
    );
    expect(blocked).toHaveLength(3);
    expect(
      blocked.every(
        (slot) =>
          slot.traditionalObservationRef ===
            'trad.anchor.hairline' &&
          slot.neutralObservationRef === null &&
          slot.bindingProvenanceReady === false,
      ),
    ).toBe(true);
  });

  it('pins the exact reviewed neutral reference for each admitted traditional anchor', () => {
    const ledger =
      T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006;

    const expected = new Map([
      ['trad.anchor.brow', FR302_BROW_VERTICAL_REFERENCE_REF],
      ['trad.anchor.yintang', FR302_INTERBROW_VERTICAL_REFERENCE_REF],
      [
        'trad.anchor.shangen',
        FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF,
      ],
      ['trad.anchor.zhuntou', FR304_NASAL_APEX_HANDOFF_REF],
      [
        'trad.anchor.renzhong',
        FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF,
      ],
      ['trad.anchor.dige', FR260_REFERENCE_REF],
    ]);

    for (const slot of ledger.bindingSlots) {
      if (
        slot.traditionalObservationRef ===
        'trad.anchor.hairline'
      ) {
        continue;
      }

      expect(slot.neutralObservationRef).toBe(
        expected.get(slot.traditionalObservationRef),
      );
      expect(slot.coordinateFrame).toBe(
        'canonical_aligned_right_handed_metric_xy',
      );
      expect(slot.reviewState).toBe(
        'admitted_governed_neutral_vertical_reference',
      );
      expect(slot.bindingProvenanceReady).toBe(true);
      expect(slot.runtimeUnavailablePolicy).toBe('fail_closed');
    }
  });

  it('keeps every methodology blocked because each still requires the real hairline reference', () => {
    const ledger =
      T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006;

    expect(
      ledger.methodologyStatuses.map((status) => ({
        admitted: status.admittedBindingCount,
        required: status.requiredBindingCount,
        blocked: status.blockedBindingCount,
      })),
    ).toEqual([
      { admitted: 3, required: 4, blocked: 1 },
      { admitted: 5, required: 6, blocked: 1 },
      { admitted: 5, required: 6, blocked: 1 },
    ]);

    expect(
      ledger.methodologyStatuses.every(
        (status) =>
          status.bindingReady === false &&
          status.blockedObservationRefs.length === 1 &&
          status.blockedObservationRefs[0] ===
            'trad.anchor.hairline',
      ),
    ).toBe(true);
  });

  it('does not rewrite the FRB005 historical zero-binding baseline or widen execution authority', () => {
    expect(
      T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005
        .admittedTraditionalBindingCount,
    ).toBe(0);

    const boundary =
      T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006
        .authorityBoundary;

    expect(boundary.partialTraditionalBindingReviewIssued).toBe(true);
    expect(boundary.allRequiredBindingsReady).toBe(false);
    expect(boundary.methodologyExecutionAuthorized).toBe(false);
    expect(boundary.threeDivisionsSpanExecutionAuthorized).toBe(false);
    expect(boundary.semanticClaimIssued).toBe(false);
    expect(boundary.characterPublicationAuthorized).toBe(false);
    expect(boundary.productionActivated).toBe(false);
    expect(boundary.commerceActivated).toBe(false);
  });
});
