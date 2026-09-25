import {
  FR293_COLUMN_MAP_CONTRACT_VERSION,
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR294_HARD_GAP_FRONTIER,
  FR294_HARD_GAP_FRONTIER_CONTRACT_VERSION,
  assertFR294HardGapFrontier,
} from './rgb-selfie-hard-gap-frontier-fr294.js';
import {
  FRB005_CONTRACT_VERSION,
  T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005,
  assertT7MethodologyScopedBindingLedgerFRB005,
} from './traditional-three-divisions-binding-ledger-frb005.js';
import {
  FACE_TRADITIONAL_T7_BASELINE,
  FACE_TRADITIONAL_T7_CLOSEOUT,
  FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE,
} from './traditional-three-divisions-binding-handoff-t7.js';

export const TOPIC_FACE_002_AUTHORITY_RECEIPT_CONTRACT_VERSION =
  'TOPIC-FACE-002-AUTHORITY-RECEIPT-v1' as const;

export function buildTopicFaceAuthoritySourceReceiptV1() {
  assertFR293ProductColumnMap();
  assertFR294HardGapFrontier();
  assertT7MethodologyScopedBindingLedgerFRB005(
    T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005,
  );

  const ledger = T7_METHODOLOGY_SCOPED_BINDING_LEDGER_FRB005;
  const materializedCapabilities = FR293_PRODUCT_COLUMN_MAP
    .filter(
      (entry) =>
        entry.implementationState ===
        'canonical_extractor_materialized',
    )
    .map((entry) => entry.featureKey);
  const unavailableOrHardGapCapabilities =
    FR294_HARD_GAP_FRONTIER.map((entry) => entry.featureKey);

  if (
    materializedCapabilities.length !== 18 ||
    unavailableOrHardGapCapabilities.length !== 11 ||
    materializedCapabilities.length +
      unavailableOrHardGapCapabilities.length !==
      FR293_PRODUCT_COLUMN_MAP.length
  ) {
    throw new Error(
      'TOPIC_FACE_002_OBSERVATION_AUTHORITY_PARTITION_DRIFT',
    );
  }

  if (
    ledger.authorityBoundary.faceClaimIssued !== false ||
    FACE_TRADITIONAL_T7_CLOSEOUT.executableReadingAuthorized !==
      false
  ) {
    throw new Error(
      'TOPIC_FACE_002_SEMANTIC_CLAIM_ADAPTER_REVIEW_REQUIRED',
    );
  }

  const bindingReady =
    Number(ledger.admittedTraditionalBindingCount) ===
      Number(ledger.slotCount) &&
    ledger.methodologyStatuses.every(
      (status) => status.bindingReady,
    );

  return Object.freeze({
    schemaVersion:
      'face-topic-authority-source-receipt-v1' as const,
    observation: Object.freeze({
      authorityRef:
        `${FR293_COLUMN_MAP_CONTRACT_VERSION}+${FR294_HARD_GAP_FRONTIER_CONTRACT_VERSION}`,
      materializedCapabilities: Object.freeze([
        ...materializedCapabilities,
      ]),
      unavailableOrHardGapCapabilities: Object.freeze([
        ...unavailableOrHardGapCapabilities,
      ]),
      provenanceRefs: Object.freeze([
        'packages/face-reading/src/rgb-selfie-product-column-map-fr293.ts',
        'packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts',
      ]),
    }),
    bridge: Object.freeze({
      authorityRef: FRB005_CONTRACT_VERSION,
      bindingGroups: Object.freeze([
        Object.freeze({
          bindingGroupRef:
            'face-bridge.frb005.three_divisions',
          requiredBindingCount: Number(ledger.slotCount),
          admittedBindingCount: Number(
            ledger.admittedTraditionalBindingCount,
          ),
          bindingReady,
          provenanceRefs: Object.freeze([
            'packages/face-reading/src/traditional-three-divisions-binding-ledger-frb005.ts',
            'issues/1521',
          ]),
        }),
      ]),
      provenanceRefs: Object.freeze([
        'packages/face-reading/src/traditional-observation-bridge-readiness-frb004.ts',
        'packages/face-reading/src/traditional-three-divisions-binding-ledger-frb005.ts',
      ]),
    }),
    traditional: Object.freeze({
      authorityRef:
        FACE_TRADITIONAL_T7_BASELINE.baselinePackRef,
      methodologyRefs: Object.freeze(
        FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE.map(
          (entry) => entry.methodologyRef,
        ),
      ),
      semanticClaimFamilies: Object.freeze([] as string[]),
      provenanceRefs: Object.freeze([
        'packages/face-reading/src/traditional-three-divisions-methodology-pack-t6.ts',
        'packages/face-reading/src/traditional-three-divisions-binding-handoff-t7.ts',
      ]),
    }),
  });
}

export const TOPIC_FACE_002_AUTHORITY_SOURCE_RECEIPT =
  buildTopicFaceAuthoritySourceReceiptV1();
