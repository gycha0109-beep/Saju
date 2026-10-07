import {
  T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005,
  assertT7MethodologyScopedBindingLedgerFRB005,
} from './traditional-three-divisions-binding-ledger-frb005.js';
import type {
  TraditionalObservationSemanticRefT4,
} from './traditional-three-divisions-methodology-t4.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FRB006_CONTRACT_VERSION =
  'FRB006-T7-PARTIAL-GOVERNED-VERTICAL-REFERENCE-BINDING-v1' as const;

export type FRB006BindingReviewState =
  | 'admitted_governed_neutral_vertical_reference'
  | 'blocked_pending_real_hairline_reference';

export interface FRB006MethodologyScopedBindingSlot {
  readonly bindingSlotId: string;
  readonly methodologyRef: string;
  readonly requirementId: string;
  readonly traditionalObservationRef:
    TraditionalObservationSemanticRefT4;
  readonly traditionalLabel: string;
  readonly neutralObservationRef: string | null;
  readonly coordinateFrame:
    | 'canonical_aligned_right_handed_metric_xy'
    | null;
  readonly sourceContractRefs: readonly string[];
  readonly reviewState: FRB006BindingReviewState;
  readonly runtimeUnavailablePolicy: 'fail_closed';
  readonly traditionalBindingAuthorized: boolean;
  readonly bindingProvenanceReady: boolean;
}

export interface FRB006MethodologyBindingStatus {
  readonly methodologyRef: string;
  readonly requiredBindingCount: number;
  readonly admittedBindingCount: number;
  readonly blockedBindingCount: number;
  readonly bindingReady: false;
  readonly blockedObservationRefs:
    readonly TraditionalObservationSemanticRefT4[];
  readonly missingAnchorPolicy: 'fail_closed';
}

export interface FRB006PartialBindingLedger {
  readonly schemaVersion:
    'frb006-t7-partial-governed-vertical-reference-binding-v1';
  readonly contractVersion: typeof FRB006_CONTRACT_VERSION;
  readonly track: 'face-bridge';
  readonly baselineContractVersion: string;
  readonly observationReviewSnapshot: {
    readonly reviewedNeutralReferenceCapabilityCount: 6;
    readonly remainingNeutralReferenceCapabilityCount: 1;
    readonly remainingNeutralReference:
      'face.vertical_reference.visible_hairline';
    readonly reviewBasisRefs: readonly string[];
    readonly observationRuntimeImportedIntoBridge: false;
  };
  readonly slotCount: 16;
  readonly uniqueTraditionalAnchorCount: 7;
  readonly admittedTraditionalBindingCount: 13;
  readonly blockedTraditionalBindingCount: 3;
  readonly admittedUniqueTraditionalAnchorCount: 6;
  readonly blockedUniqueTraditionalAnchorCount: 1;
  readonly bindingSlots:
    readonly FRB006MethodologyScopedBindingSlot[];
  readonly methodologyStatuses:
    readonly FRB006MethodologyBindingStatus[];
  readonly remainingBlocker: {
    readonly traditionalObservationRef: 'trad.anchor.hairline';
    readonly neutralObservationReason:
      'real_exact_capture_metric_hairline_reference_not_materialized';
    readonly observationOwner: 'face-observation-engine';
    readonly bindingOwner: 'face-reading-binding';
  };
  readonly authorityBoundary: {
    readonly partialTraditionalBindingReviewIssued: true;
    readonly allRequiredBindingsReady: false;
    readonly methodologyExecutionAuthorized: false;
    readonly threeDivisionsSpanExecutionAuthorized: false;
    readonly semanticClaimIssued: false;
    readonly characterPublicationAuthorized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const REVIEW_BASIS_REFS = Object.freeze([
  'packages/face-reading/src/lower-face-vertical-reference-handoff-fr301.ts',
  'packages/face-reading/src/brow-interbrow-vertical-reference-fr302.ts',
  'packages/face-reading/src/visible-central-groove-vertical-reference-fr303.ts',
  'packages/face-reading/src/nasal-vertical-reference-handoffs-fr304.ts',
  'packages/face-reading/src/common-frame-bridge-fr315.ts',
  'packages/face-reading/src/hairline-real-local-metric-receipt-fr318.ts',
  'packages/face-reading/src/seven-reference-common-frame-bundle-fr319.ts',
] as const);

const ADMITTED_NEUTRAL_REFERENCES = Object.freeze({
  'trad.anchor.brow': Object.freeze({
    observationRef:
      'neutral.face.visible_eyebrow_pair.arc_length_weighted_vertical_coordinate@0.1.0',
    sourceContractRefs: Object.freeze([
      'FR302-BROW-INTERBROW-VERTICAL-REFERENCE-v1',
      'packages/face-reading/src/brow-interbrow-vertical-reference-fr302.ts',
    ]),
  }),
  'trad.anchor.yintang': Object.freeze({
    observationRef:
      'neutral.face.visible_interbrow.medial_endpoint_midpoint_vertical_coordinate@0.1.0',
    sourceContractRefs: Object.freeze([
      'FR302-BROW-INTERBROW-VERTICAL-REFERENCE-v1',
      'packages/face-reading/src/brow-interbrow-vertical-reference-fr302.ts',
    ]),
  }),
  'trad.anchor.shangen': Object.freeze({
    observationRef:
      'neutral.face.nasal_bridge_root.vertical_coordinate@0.1.0',
    sourceContractRefs: Object.freeze([
      'FR304-NASAL-VERTICAL-REFERENCE-HANDOFF-v1',
      'packages/face-reading/src/nasal-vertical-reference-handoffs-fr304.ts',
    ]),
  }),
  'trad.anchor.zhuntou': Object.freeze({
    observationRef:
      'neutral.face.nasal_apex.vertical_coordinate@0.1.0',
    sourceContractRefs: Object.freeze([
      'FR304-NASAL-VERTICAL-REFERENCE-HANDOFF-v1',
      'packages/face-reading/src/nasal-vertical-reference-handoffs-fr304.ts',
    ]),
  }),
  'trad.anchor.renzhong': Object.freeze({
    observationRef:
      'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate.canonical_metric_xy@0.1.0',
    sourceContractRefs: Object.freeze([
      'FR315-COMMON-FRAME-BRIDGE-v1',
      'packages/face-reading/src/common-frame-bridge-fr315.ts',
    ]),
  }),
  'trad.anchor.dige': Object.freeze({
    observationRef:
      'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0',
    sourceContractRefs: Object.freeze([
      'FR301-LOWER-FACE-VERTICAL-REFERENCE-HANDOFF-v1',
      'packages/face-reading/src/lower-face-vertical-reference-handoff-fr301.ts',
    ]),
  }),
} as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FRB-006 ${message}`);
}

function admittedReference(
  observationRef: TraditionalObservationSemanticRefT4,
): Readonly<{
  observationRef: string;
  sourceContractRefs: readonly string[];
}> | null {
  if (observationRef === 'trad.anchor.hairline') {
    return null;
  }

  const candidate =
    ADMITTED_NEUTRAL_REFERENCES[
      observationRef as keyof typeof ADMITTED_NEUTRAL_REFERENCES
    ];

  if (candidate === undefined) {
    fail(`missing reviewed neutral reference mapping: ${observationRef}.`);
  }

  return candidate;
}

function buildBindingSlots():
readonly FRB006MethodologyScopedBindingSlot[] {
  return Object.freeze(
    T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005.bindingSlots.map(
      (slot) => {
        const admitted =
          admittedReference(slot.traditionalObservationRef);

        if (admitted === null) {
          return Object.freeze({
            bindingSlotId: slot.bindingSlotId,
            methodologyRef: slot.methodologyRef,
            requirementId: slot.requirementId,
            traditionalObservationRef:
              slot.traditionalObservationRef,
            traditionalLabel: slot.traditionalLabel,
            neutralObservationRef: null,
            coordinateFrame: null,
            sourceContractRefs: Object.freeze([
              'FR318-REAL-LOCAL-HAIRLINE-METRIC-RECEIPT-v1',
              'FR319-SEVEN-REFERENCE-COMMON-FRAME-BUNDLE-v1',
            ]),
            reviewState:
              'blocked_pending_real_hairline_reference' as const,
            runtimeUnavailablePolicy: 'fail_closed' as const,
            traditionalBindingAuthorized: false,
            bindingProvenanceReady: false,
          });
        }

        return Object.freeze({
          bindingSlotId: slot.bindingSlotId,
          methodologyRef: slot.methodologyRef,
          requirementId: slot.requirementId,
          traditionalObservationRef:
            slot.traditionalObservationRef,
          traditionalLabel: slot.traditionalLabel,
          neutralObservationRef: admitted.observationRef,
          coordinateFrame:
            'canonical_aligned_right_handed_metric_xy' as const,
          sourceContractRefs:
            admitted.sourceContractRefs,
          reviewState:
            'admitted_governed_neutral_vertical_reference' as const,
          runtimeUnavailablePolicy: 'fail_closed' as const,
          traditionalBindingAuthorized: true,
          bindingProvenanceReady: true,
        });
      },
    ),
  );
}

function buildMethodologyStatuses(
  slots: readonly FRB006MethodologyScopedBindingSlot[],
): readonly FRB006MethodologyBindingStatus[] {
  return Object.freeze(
    T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005.methodologyStatuses.map(
      (baseline) => {
        const own = slots.filter(
          (slot) => slot.methodologyRef === baseline.methodologyRef,
        );
        const admitted = own.filter(
          (slot) => slot.traditionalBindingAuthorized,
        );
        const blocked = own.filter(
          (slot) => !slot.traditionalBindingAuthorized,
        );

        return Object.freeze({
          methodologyRef: baseline.methodologyRef,
          requiredBindingCount: own.length,
          admittedBindingCount: admitted.length,
          blockedBindingCount: blocked.length,
          bindingReady: false as const,
          blockedObservationRefs: Object.freeze(
            blocked.map((slot) => slot.traditionalObservationRef),
          ),
          missingAnchorPolicy: 'fail_closed' as const,
        });
      },
    ),
  );
}

export function buildFRB006PartialBindingLedger():
FRB006PartialBindingLedger {
  assertT7MethodologyScopedBindingLedgerFRB005(
    T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005,
  );

  const bindingSlots = buildBindingSlots();
  const methodologyStatuses =
    buildMethodologyStatuses(bindingSlots);

  const ledger = Object.freeze({
    schemaVersion:
      'frb006-t7-partial-governed-vertical-reference-binding-v1' as const,
    contractVersion: FRB006_CONTRACT_VERSION,
    track: 'face-bridge' as const,
    baselineContractVersion:
      T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005.contractVersion,
    observationReviewSnapshot: Object.freeze({
      reviewedNeutralReferenceCapabilityCount: 6 as const,
      remainingNeutralReferenceCapabilityCount: 1 as const,
      remainingNeutralReference:
        'face.vertical_reference.visible_hairline' as const,
      reviewBasisRefs: REVIEW_BASIS_REFS,
      observationRuntimeImportedIntoBridge: false as const,
    }),
    slotCount: 16 as const,
    uniqueTraditionalAnchorCount: 7 as const,
    admittedTraditionalBindingCount: 13 as const,
    blockedTraditionalBindingCount: 3 as const,
    admittedUniqueTraditionalAnchorCount: 6 as const,
    blockedUniqueTraditionalAnchorCount: 1 as const,
    bindingSlots,
    methodologyStatuses,
    remainingBlocker: Object.freeze({
      traditionalObservationRef:
        'trad.anchor.hairline' as const,
      neutralObservationReason:
        'real_exact_capture_metric_hairline_reference_not_materialized' as const,
      observationOwner: 'face-observation-engine' as const,
      bindingOwner: 'face-reading-binding' as const,
    }),
    authorityBoundary: Object.freeze({
      partialTraditionalBindingReviewIssued: true as const,
      allRequiredBindingsReady: false as const,
      methodologyExecutionAuthorized: false as const,
      threeDivisionsSpanExecutionAuthorized: false as const,
      semanticClaimIssued: false as const,
      characterPublicationAuthorized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  }) satisfies FRB006PartialBindingLedger;

  assertFRB006PartialBindingLedger(ledger);
  return ledger;
}

export function assertFRB006PartialBindingLedger(
  ledger: FRB006PartialBindingLedger,
): void {
  if (
    ledger.schemaVersion !==
      'frb006-t7-partial-governed-vertical-reference-binding-v1' ||
    ledger.contractVersion !== FRB006_CONTRACT_VERSION ||
    ledger.track !== 'face-bridge' ||
    ledger.slotCount !== 16 ||
    ledger.bindingSlots.length !== 16 ||
    ledger.uniqueTraditionalAnchorCount !== 7 ||
    ledger.admittedTraditionalBindingCount !== 13 ||
    ledger.blockedTraditionalBindingCount !== 3 ||
    ledger.admittedUniqueTraditionalAnchorCount !== 6 ||
    ledger.blockedUniqueTraditionalAnchorCount !== 1 ||
    ledger.observationReviewSnapshot.reviewedNeutralReferenceCapabilityCount !== 6 ||
    ledger.observationReviewSnapshot.remainingNeutralReferenceCapabilityCount !== 1 ||
    ledger.observationReviewSnapshot.remainingNeutralReference !==
      'face.vertical_reference.visible_hairline' ||
    ledger.observationReviewSnapshot.observationRuntimeImportedIntoBridge !== false
  ) {
    fail('ledger identity/cardinality drift.');
  }

  const admitted = ledger.bindingSlots.filter(
    (slot) => slot.traditionalBindingAuthorized,
  );
  const blocked = ledger.bindingSlots.filter(
    (slot) => !slot.traditionalBindingAuthorized,
  );

  if (
    admitted.length !== 13 ||
    blocked.length !== 3 ||
    blocked.some(
      (slot) =>
        slot.traditionalObservationRef !==
          'trad.anchor.hairline' ||
        slot.neutralObservationRef !== null ||
        slot.coordinateFrame !== null ||
        slot.reviewState !==
          'blocked_pending_real_hairline_reference' ||
        slot.bindingProvenanceReady !== false,
    )
  ) {
    fail('hairline-only blocked binding invariant drift.');
  }

  for (const slot of admitted) {
    const expected =
      admittedReference(slot.traditionalObservationRef);
    if (
      expected === null ||
      slot.neutralObservationRef !== expected.observationRef ||
      slot.coordinateFrame !==
        'canonical_aligned_right_handed_metric_xy' ||
      slot.reviewState !==
        'admitted_governed_neutral_vertical_reference' ||
      slot.bindingProvenanceReady !== true ||
      slot.runtimeUnavailablePolicy !== 'fail_closed' ||
      slot.sourceContractRefs.length < 2
    ) {
      fail(`admitted binding drift: ${slot.bindingSlotId}.`);
    }
  }

  const admittedAnchors = new Set(
    admitted.map((slot) => slot.traditionalObservationRef),
  );
  if (
    admittedAnchors.size !== 6 ||
    admittedAnchors.has('trad.anchor.hairline')
  ) {
    fail('admitted anchor universe drift.');
  }

  if (
    ledger.methodologyStatuses.length !== 3 ||
    ledger.methodologyStatuses.some(
      (status) =>
        status.bindingReady !== false ||
        status.blockedBindingCount !== 1 ||
        status.blockedObservationRefs.length !== 1 ||
        status.blockedObservationRefs[0] !==
          'trad.anchor.hairline' ||
        status.admittedBindingCount !==
          status.requiredBindingCount - 1,
    )
  ) {
    fail('methodology partial binding state drift.');
  }

  if (
    ledger.remainingBlocker.traditionalObservationRef !==
      'trad.anchor.hairline' ||
    ledger.authorityBoundary.partialTraditionalBindingReviewIssued !== true ||
    Object.entries(ledger.authorityBoundary)
      .filter(([key]) => key !== 'partialTraditionalBindingReviewIssued')
      .some(([, value]) => value !== false)
  ) {
    fail('authority boundary widened beyond partial binding review.');
  }
}

export const T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006 =
  buildFRB006PartialBindingLedger();
