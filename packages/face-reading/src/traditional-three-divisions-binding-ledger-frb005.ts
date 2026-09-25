import {
  T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004,
  assertT4CanonicalObservationBridgeAuditFRB004,
  type FRB004CanonicalFeatureKey,
} from './traditional-observation-bridge-readiness-frb004.js';
import {
  FACE_TRADITIONAL_T7_ANCHOR_HANDOFFS,
  FACE_TRADITIONAL_T7_BASELINE,
  FACE_TRADITIONAL_T7_CLOSEOUT,
  FACE_TRADITIONAL_T7_DOWNSTREAM_ACCEPTANCE_GATES,
  FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE,
  FACE_TRADITIONAL_T7_READINESS_DELTA,
  type TraditionalAnchorBindingHandoffT7,
} from './traditional-three-divisions-binding-handoff-t7.js';
import {
  type TraditionalObservationSemanticRefT4,
} from './traditional-three-divisions-methodology-t4.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FRB005_CONTRACT_VERSION =
  'FRB005-T7-METHODOLOGY-SCOPED-BINDING-LEDGER-v1' as const;

export type FRB005BindingReviewState =
  'blocked_pending_governed_vertical_reference';

export interface FRB005MethodologyScopedBindingSlot {
  readonly bindingSlotId: string;
  readonly methodologyRef: string;
  readonly requirementId: string;
  readonly traditionalObservationRef: TraditionalObservationSemanticRefT4;
  readonly traditionalLabel: string;
  readonly neutralObservationRef: null;
  readonly neutralCandidateRefs: readonly string[];
  readonly currentEvidenceRefs: readonly string[];
  readonly rejectedProxyFeatureKeys: readonly FRB004CanonicalFeatureKey[];
  readonly reviewState: FRB005BindingReviewState;
  readonly observationImplementationOwner: 'face-observation-engine';
  readonly bridgeTrack: 'face-bridge';
  readonly upstreamBindingOwnerLabel: 'face-reading-binding';
  readonly unavailablePolicy: 'fail_closed';
  readonly traditionalBindingAuthorized: false;
  readonly bindingProvenanceReady: false;
  readonly promotionRequirement: string;
}

export interface FRB005MethodologyBindingLedgerStatus {
  readonly methodologyRef: string;
  readonly topology: 'contiguous_chain' | 'noncontiguous_three_spans';
  readonly bindingSlotIds: readonly string[];
  readonly requiredObservationRefs: readonly string[];
  readonly admittedBindingCount: 0;
  readonly requiredBindingCount: number;
  readonly bindingReady: false;
  readonly missingAnchorPolicy: 'fail_closed';
  readonly sameGeometryAllowsSemanticMerge: false;
}

export interface FRB005T7BindingLedger {
  readonly schemaVersion: 'frb005-t7-binding-ledger-v1';
  readonly contractVersion: typeof FRB005_CONTRACT_VERSION;
  readonly track: 'face-bridge';
  readonly upstream: {
    readonly frb004ContractVersion: string;
    readonly t7BaselinePackRef: string;
    readonly traditionalResearchStatus:
      'complete_for_current_three_divisions_slice';
    readonly t7ObservationBindingReady: false;
  };
  readonly slotCount: 16;
  readonly uniqueTraditionalAnchorCount: 7;
  readonly admittedTraditionalBindingCount: 0;
  readonly bindingSlots: readonly FRB005MethodologyScopedBindingSlot[];
  readonly methodologyStatuses: readonly FRB005MethodologyBindingLedgerStatus[];
  readonly promotionGate: {
    readonly allSevenGovernedObservationContractsRequired: true;
    readonly exactMethodologyScopeRequired: true;
    readonly neutralObservationProvenanceRequired: true;
    readonly missingAnchorFailsClosed: true;
    readonly independentBalanceCalibrationRequired: true;
    readonly bindingHandoffEnablesClaimOrRule: false;
  };
  readonly authorityBoundary: {
    readonly observationExtractorImplementedHere: false;
    readonly providerLandmarkIdsIssued: false;
    readonly neutralObservationRefInvented: false;
    readonly traditionalAnchorBindingAdmitted: false;
    readonly t5SpanExecuted: false;
    readonly t5ComparisonExecuted: false;
    readonly coordinateFormulaIssued: false;
    readonly numericToleranceIssued: false;
    readonly ruleExecuted: false;
    readonly faceClaimIssued: false;
    readonly productionActivated: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FRB-005 ${message}`);
}

function handoffFor(
  observationRef: TraditionalObservationSemanticRefT4,
): TraditionalAnchorBindingHandoffT7 {
  const handoff = FACE_TRADITIONAL_T7_ANCHOR_HANDOFFS.find(
    (candidate) => candidate.observationRef === observationRef,
  );
  if (handoff === undefined) {
    fail(`T7 anchor handoff missing: ${observationRef}.`);
  }
  return handoff;
}

function bindingSlotId(
  methodologyRef: string,
  requirementId: string,
): string {
  return `binding-slot.face.three_divisions::${methodologyRef}::${requirementId}`;
}

function buildBindingSlots():
readonly FRB005MethodologyScopedBindingSlot[] {
  return Object.freeze(
    T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004.requirementBindings.map(
      (requirement) => {
        const handoff = handoffFor(requirement.traditionalObservationRef);
        if (handoff.implementationOwner !== 'face-observation-engine') {
          fail(
            `T7 observation implementation owner drift: ${handoff.observationRef}.`,
          );
        }
        return Object.freeze({
          bindingSlotId: bindingSlotId(
            requirement.methodologyRef,
            requirement.requirementId,
          ),
          methodologyRef: requirement.methodologyRef,
          requirementId: requirement.requirementId,
          traditionalObservationRef: requirement.traditionalObservationRef,
          traditionalLabel: requirement.traditionalLabel,
          neutralObservationRef: null,
          neutralCandidateRefs: Object.freeze([
            ...handoff.neutralCandidateRefs,
          ]),
          currentEvidenceRefs: Object.freeze([
            ...handoff.currentEvidenceRefs,
            FRB005_CONTRACT_VERSION,
          ]),
          rejectedProxyFeatureKeys: Object.freeze([
            ...requirement.rejectedProxyFeatureKeys,
          ]),
          reviewState:
            'blocked_pending_governed_vertical_reference' as const,
          observationImplementationOwner:
            handoff.implementationOwner,
          bridgeTrack: 'face-bridge' as const,
          upstreamBindingOwnerLabel: handoff.bindingOwner,
          unavailablePolicy: 'fail_closed' as const,
          traditionalBindingAuthorized: false as const,
          bindingProvenanceReady: false as const,
          promotionRequirement: handoff.requiredNextCapability,
        });
      },
    ),
  );
}

function buildMethodologyStatuses(
  slots: readonly FRB005MethodologyScopedBindingSlot[],
): readonly FRB005MethodologyBindingLedgerStatus[] {
  return Object.freeze(
    FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE.map(
      (acceptance) => {
        const own = slots.filter(
          (slot) => slot.methodologyRef === acceptance.methodologyRef,
        );
        if (own.length !== acceptance.requiredObservationRefs.length) {
          fail(
            `methodology slot cardinality drift: ${acceptance.methodologyRef}.`,
          );
        }
        return Object.freeze({
          methodologyRef: acceptance.methodologyRef,
          topology: acceptance.topology,
          bindingSlotIds: Object.freeze(
            own.map((slot) => slot.bindingSlotId),
          ),
          requiredObservationRefs: Object.freeze([
            ...acceptance.requiredObservationRefs,
          ]),
          admittedBindingCount: 0 as const,
          requiredBindingCount: own.length,
          bindingReady: false as const,
          missingAnchorPolicy: acceptance.missingAnchorPolicy,
          sameGeometryAllowsSemanticMerge:
            acceptance.sameGeometryAllowsSemanticMerge,
        });
      },
    ),
  );
}

export function buildT7MethodologyScopedBindingLedgerFRB005():
FRB005T7BindingLedger {
  assertT4CanonicalObservationBridgeAuditFRB004(
    T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004,
  );

  if (
    FACE_TRADITIONAL_T7_ANCHOR_HANDOFFS.length !== 7
    || FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE.length !== 3
    || FACE_TRADITIONAL_T7_READINESS_DELTA.newlyBoundTraditionalAnchors.length !== 0
    || FACE_TRADITIONAL_T7_READINESS_DELTA.anchorsStillBlocked.length !== 7
    || FACE_TRADITIONAL_T7_BASELINE.observationBindingReady !== false
    || FACE_TRADITIONAL_T7_CLOSEOUT.downstreamBindingStatus !== 'blocked'
  ) {
    fail('T7 fail-closed handoff baseline drift.');
  }

  const slots = buildBindingSlots();
  const methodologyStatuses = buildMethodologyStatuses(slots);

  const ledger: FRB005T7BindingLedger = Object.freeze({
    schemaVersion: 'frb005-t7-binding-ledger-v1' as const,
    contractVersion: FRB005_CONTRACT_VERSION,
    track: 'face-bridge' as const,
    upstream: Object.freeze({
      frb004ContractVersion:
        T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004.contractVersion,
      t7BaselinePackRef:
        FACE_TRADITIONAL_T7_BASELINE.baselinePackRef,
      traditionalResearchStatus:
        FACE_TRADITIONAL_T7_CLOSEOUT.traditionalResearchStatus,
      t7ObservationBindingReady:
        FACE_TRADITIONAL_T7_BASELINE.observationBindingReady,
    }),
    slotCount: 16 as const,
    uniqueTraditionalAnchorCount: 7 as const,
    admittedTraditionalBindingCount: 0 as const,
    bindingSlots: slots,
    methodologyStatuses,
    promotionGate: Object.freeze({
      allSevenGovernedObservationContractsRequired: true as const,
      exactMethodologyScopeRequired: true as const,
      neutralObservationProvenanceRequired: true as const,
      missingAnchorFailsClosed: true as const,
      independentBalanceCalibrationRequired: true as const,
      bindingHandoffEnablesClaimOrRule: false as const,
    }),
    authorityBoundary: Object.freeze({
      observationExtractorImplementedHere: false as const,
      providerLandmarkIdsIssued: false as const,
      neutralObservationRefInvented: false as const,
      traditionalAnchorBindingAdmitted: false as const,
      t5SpanExecuted: false as const,
      t5ComparisonExecuted: false as const,
      coordinateFormulaIssued: false as const,
      numericToleranceIssued: false as const,
      ruleExecuted: false as const,
      faceClaimIssued: false as const,
      productionActivated: false as const,
    }),
  });

  assertT7MethodologyScopedBindingLedgerFRB005(ledger);
  return ledger;
}

export function assertT7MethodologyScopedBindingLedgerFRB005(
  ledger: FRB005T7BindingLedger,
): void {
  if (
    ledger.schemaVersion !== 'frb005-t7-binding-ledger-v1'
    || ledger.contractVersion !== FRB005_CONTRACT_VERSION
    || ledger.track !== 'face-bridge'
    || ledger.slotCount !== 16
    || ledger.uniqueTraditionalAnchorCount !== 7
    || ledger.admittedTraditionalBindingCount !== 0
    || ledger.bindingSlots.length !== 16
    || new Set(ledger.bindingSlots.map((slot) => slot.bindingSlotId)).size !== 16
  ) {
    fail('ledger identity/cardinality drift.');
  }

  const uniqueAnchors = new Set(
    ledger.bindingSlots.map((slot) => slot.traditionalObservationRef),
  );
  if (uniqueAnchors.size !== 7) {
    fail('seven-anchor slot coverage drift.');
  }

  for (const slot of ledger.bindingSlots) {
    const frb004 = T4_CANONICAL_OBSERVATION_BRIDGE_AUDIT_FRB004
      .requirementBindings.find(
        (entry) =>
          entry.methodologyRef === slot.methodologyRef
          && entry.requirementId === slot.requirementId,
      );
    const t7 = handoffFor(slot.traditionalObservationRef);
    const methodology =
      FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE.find(
        (entry) => entry.methodologyRef === slot.methodologyRef,
      );

    if (
      frb004 === undefined
      || methodology === undefined
      || !methodology.requiredObservationRefs.some(
        (observationRef) =>
          observationRef === slot.traditionalObservationRef,
      )
      || slot.neutralObservationRef !== null
      || slot.reviewState !==
        'blocked_pending_governed_vertical_reference'
      || slot.observationImplementationOwner !==
        'face-observation-engine'
      || slot.bridgeTrack !== 'face-bridge'
      || slot.upstreamBindingOwnerLabel !== 'face-reading-binding'
      || slot.unavailablePolicy !== 'fail_closed'
      || slot.traditionalBindingAuthorized !== false
      || slot.bindingProvenanceReady !== false
      || t7.traditionalBindingAuthorized !== false
      || t7.bindingOwner !== 'face-reading-binding'
      || frb004.traditionalEquivalenceAuthorized !== false
      || frb004.nextBindingOwner !== 'face-bridge'
    ) {
      fail(`binding slot authority widened: ${slot.bindingSlotId}.`);
    }

    if (
      slot.rejectedProxyFeatureKeys.length !==
        frb004.rejectedProxyFeatureKeys.length
      || frb004.rejectedProxyFeatureKeys.some(
        (proxy) => !slot.rejectedProxyFeatureKeys.includes(proxy),
      )
    ) {
      fail(`FRB004 rejected proxy drift: ${slot.bindingSlotId}.`);
    }
  }

  if (
    ledger.methodologyStatuses.length !== 3
    || ledger.methodologyStatuses.some((status) =>
      status.admittedBindingCount !== 0
      || status.bindingReady !== false
      || status.missingAnchorPolicy !== 'fail_closed'
      || status.sameGeometryAllowsSemanticMerge !== false)
  ) {
    fail('methodology binding status widened.');
  }

  const sixEndpointStatuses = ledger.methodologyStatuses.filter(
    (status) => status.topology === 'noncontiguous_three_spans',
  );
  if (
    sixEndpointStatuses.length !== 2
    || sixEndpointStatuses[0]!.methodologyRef ===
      sixEndpointStatuses[1]!.methodologyRef
    || sixEndpointStatuses[0]!.bindingSlotIds.some(
      (slotId) => sixEndpointStatuses[1]!.bindingSlotIds.includes(slotId),
    )
  ) {
    fail('same-geometry methodology binding identities collapsed.');
  }

  const downstream = FACE_TRADITIONAL_T7_DOWNSTREAM_ACCEPTANCE_GATES;
  if (
    downstream.faceReadingBindingMustProvide.length < 5
    || downstream.prohibited.length < 8
    || ledger.promotionGate.allSevenGovernedObservationContractsRequired !== true
    || ledger.promotionGate.exactMethodologyScopeRequired !== true
    || ledger.promotionGate.neutralObservationProvenanceRequired !== true
    || ledger.promotionGate.missingAnchorFailsClosed !== true
    || ledger.promotionGate.independentBalanceCalibrationRequired !== true
    || ledger.promotionGate.bindingHandoffEnablesClaimOrRule !== false
    || Object.values(ledger.authorityBoundary).some(
      (value) => value !== false,
    )
  ) {
    fail('T7 downstream acceptance/authority gate widened.');
  }
}

export const T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005 =
  buildT7MethodologyScopedBindingLedgerFRB005();