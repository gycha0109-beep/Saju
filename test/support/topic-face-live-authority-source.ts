import type {
  FaceTopicAuthoritySourceReceipt,
} from '../../src/face-topic/authority.js';
import {
  FR293_COLUMN_MAP_CONTRACT_VERSION,
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from '../../packages/face-reading/src/rgb-selfie-product-column-map-fr293.js';
import {
  FR294_HARD_GAP_FRONTIER,
  FR294_HARD_GAP_FRONTIER_CONTRACT_VERSION,
  assertFR294HardGapFrontier,
} from '../../packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.js';
import {
  FRB006_CONTRACT_VERSION,
  T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006,
  assertFRB006PartialBindingLedger,
} from '../../packages/face-reading/src/traditional-three-divisions-partial-binding-ledger-frb006.js';
import {
  FR319_CURRENT_GATE,
  FR319_SEVEN_REFERENCE_COMMON_FRAME_BUNDLE_CONTRACT_VERSION,
} from '../../packages/face-reading/src/seven-reference-common-frame-bundle-fr319.js';
import {
  FACE_TRADITIONAL_T7_BASELINE,
  FACE_TRADITIONAL_T7_CLOSEOUT,
  FACE_TRADITIONAL_T7_METHODOLOGY_BINDING_ACCEPTANCE,
} from '../../packages/face-reading/src/traditional-three-divisions-binding-handoff-t7.js';

const READY_VERTICAL_REFERENCE_CAPABILITIES = Object.freeze([
  'face.vertical_reference.brow',
  'face.vertical_reference.interbrow_surface',
  'face.vertical_reference.nose_root_bridge',
  'face.vertical_reference.visible_nose_tip',
  'face.vertical_reference.visible_central_groove',
  'face.vertical_reference.inferior_lower_face',
] as const);

const BLOCKED_VERTICAL_REFERENCE_CAPABILITIES = Object.freeze([
  'face.vertical_reference.visible_hairline',
] as const);

export function buildRepositoryFaceAuthorityReceiptForTopicFaceTest():
FaceTopicAuthoritySourceReceipt {
  assertFR293ProductColumnMap();
  assertFR294HardGapFrontier();
  assertFRB006PartialBindingLedger(
    T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006,
  );

  const ledger =
    T7_PARTIAL_GOVERNED_VERTICAL_REFERENCE_BINDING_LEDGER_FRB006;
  const canonicalMaterializedCapabilities = FR293_PRODUCT_COLUMN_MAP
    .filter(
      (entry) =>
        entry.implementationState ===
        'canonical_extractor_materialized',
    )
    .map((entry) => entry.featureKey);
  const canonicalUnavailableOrHardGapCapabilities =
    FR294_HARD_GAP_FRONTIER.map((entry) => entry.featureKey);

  if (
    canonicalMaterializedCapabilities.length !== 18 ||
    canonicalUnavailableOrHardGapCapabilities.length !== 11 ||
    canonicalMaterializedCapabilities.length +
      canonicalUnavailableOrHardGapCapabilities.length !==
      FR293_PRODUCT_COLUMN_MAP.length
  ) {
    throw new Error(
      'TOPIC_FACE_002_OBSERVATION_AUTHORITY_PARTITION_DRIFT',
    );
  }

  if (
    FR319_CURRENT_GATE.repositoryActualNeutralReferenceCapabilityCount !== 6 ||
    FR319_CURRENT_GATE.repositoryRemainingNeutralReferenceCapabilityCount !== 1 ||
    ledger.admittedTraditionalBindingCount !== 13 ||
    ledger.blockedTraditionalBindingCount !== 3 ||
    ledger.authorityBoundary.semanticClaimIssued !== false ||
    FACE_TRADITIONAL_T7_CLOSEOUT.executableReadingAuthorized !==
      false
  ) {
    throw new Error(
      'TOPIC_FACE_005L_PARTIAL_VERTICAL_REFERENCE_AUTHORITY_DRIFT',
    );
  }

  const materializedCapabilities = Object.freeze([
    ...canonicalMaterializedCapabilities,
    ...READY_VERTICAL_REFERENCE_CAPABILITIES,
  ]);
  const unavailableOrHardGapCapabilities = Object.freeze([
    ...canonicalUnavailableOrHardGapCapabilities,
    ...BLOCKED_VERTICAL_REFERENCE_CAPABILITIES,
  ]);

  return Object.freeze({
    schemaVersion: 'face-topic-authority-source-receipt-v1',
    observation: Object.freeze({
      authorityRef:
        `${FR293_COLUMN_MAP_CONTRACT_VERSION}+${FR294_HARD_GAP_FRONTIER_CONTRACT_VERSION}+${FR319_SEVEN_REFERENCE_COMMON_FRAME_BUNDLE_CONTRACT_VERSION}`,
      materializedCapabilities,
      unavailableOrHardGapCapabilities,
      provenanceRefs: Object.freeze([
        'packages/face-reading/src/rgb-selfie-product-column-map-fr293.ts',
        'packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts',
        'packages/face-reading/src/lower-face-vertical-reference-handoff-fr301.ts',
        'packages/face-reading/src/brow-interbrow-vertical-reference-fr302.ts',
        'packages/face-reading/src/nasal-vertical-reference-handoffs-fr304.ts',
        'packages/face-reading/src/common-frame-bridge-fr315.ts',
        'packages/face-reading/src/seven-reference-common-frame-bundle-fr319.ts',
      ]),
    }),
    bridge: Object.freeze({
      authorityRef: FRB006_CONTRACT_VERSION,
      bindingGroups: Object.freeze([
        Object.freeze({
          bindingGroupRef:
            'face-bridge.frb005.three_divisions',
          requiredBindingCount: Number(ledger.slotCount),
          admittedBindingCount: Number(
            ledger.admittedTraditionalBindingCount,
          ),
          bindingReady:
            Number(ledger.admittedTraditionalBindingCount) ===
              Number(ledger.slotCount) &&
            ledger.methodologyStatuses.every(
              (status) => status.bindingReady,
            ),
          provenanceRefs: Object.freeze([
            'packages/face-reading/src/traditional-three-divisions-binding-ledger-frb005.ts',
            'packages/face-reading/src/traditional-three-divisions-partial-binding-ledger-frb006.ts',
            'issues/1521',
          ]),
        }),
      ]),
      provenanceRefs: Object.freeze([
        'packages/face-reading/src/traditional-observation-bridge-readiness-frb004.ts',
        'packages/face-reading/src/traditional-three-divisions-binding-ledger-frb005.ts',
        'packages/face-reading/src/traditional-three-divisions-partial-binding-ledger-frb006.ts',
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
      semanticClaimFamilies: Object.freeze([]),
      provenanceRefs: Object.freeze([
        'packages/face-reading/src/traditional-three-divisions-methodology-pack-t6.ts',
        'packages/face-reading/src/traditional-three-divisions-binding-handoff-t7.ts',
      ]),
    }),
  });
}
