import {
  FR260_REFERENCE_REF,
} from './visible-lower-face-inferior-vertical-reference-fr260.js';
import {
  FR301_CURRENT_GATE,
  assertLowerFaceVerticalReferenceHandoffFR301,
  type FR301LowerFaceVerticalReferenceHandoff,
} from './lower-face-vertical-reference-handoff-fr301.js';
import {
  FR302_BROW_VERTICAL_REFERENCE_REF,
  FR302_CURRENT_GATE,
  FR302_INTERBROW_VERTICAL_REFERENCE_REF,
  assertBrowInterbrowVerticalReferencesFR302,
  type FR302BrowInterbrowVerticalReferenceResult,
} from './brow-interbrow-vertical-reference-fr302.js';
import {
  FR304_CURRENT_GATE,
  FR304_NASAL_APEX_HANDOFF_REF,
  FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF,
  assertNasalApexVerticalReferenceHandoffFR304,
  assertNasalBridgeRootVerticalReferenceHandoffFR304,
  type FR304NasalApexVerticalReferenceHandoff,
  type FR304NasalBridgeRootVerticalReferenceHandoff,
} from './nasal-vertical-reference-handoffs-fr304.js';
import {
  FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF,
  FR315_CURRENT_GATE,
  assertFR315CentralGrooveMetricBridgeResult,
  type FR315CentralGrooveMetricBridgeResult,
} from './common-frame-bridge-fr315.js';
import {
  FR318_CURRENT_GATE,
  FR318_METRIC_HAIRLINE_VERTICAL_REFERENCE_REF,
  type FR318MaterializationResult,
} from './hairline-real-local-metric-receipt-fr318.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR319_SEVEN_REFERENCE_COMMON_FRAME_BUNDLE_CONTRACT_VERSION =
  'FR319-SEVEN-REFERENCE-COMMON-FRAME-BUNDLE-v1' as const;

export type FR319ReferenceKey =
  | 'hairline'
  | 'brow'
  | 'interbrow'
  | 'nasal_bridge_root'
  | 'nasal_apex'
  | 'central_groove'
  | 'lower_face_inferior';

const REFERENCE_KEYS: readonly FR319ReferenceKey[] = Object.freeze([
  'hairline',
  'brow',
  'interbrow',
  'nasal_bridge_root',
  'nasal_apex',
  'central_groove',
  'lower_face_inferior',
]);

const SHA256 = /^sha256:[0-9a-f]{64}$/u;

export interface FR319PrivateReferenceCaptureBinding {
  readonly sourceCaptureDigest: string;
  readonly exactCaptureBound: true;
  readonly exactSourceValueBound: true;
  readonly sourceAuthorityVerified: true;
  readonly privateProvenanceAvailable: true;
}

export interface FR319PrivateExactCaptureProvenance {
  readonly schemaVersion:
    'fr319-private-exact-capture-provenance-v1';
  readonly artifactClass: 'real_local_capture' | 'synthetic_fixture';
  readonly bindings: Readonly<
    Record<FR319ReferenceKey, FR319PrivateReferenceCaptureBinding>
  >;
  readonly sourceCaptureDigestPersistedPublicly: false;
  readonly subjectIdPersistedPublicly: false;
  readonly captureIdPersistedPublicly: false;
  readonly rawProvenancePersistedPublicly: false;
}

export interface FR319BundleInput {
  readonly schemaVersion:
    'fr319-seven-reference-common-frame-bundle-input-v1';
  readonly lowerFace:
    FR301LowerFaceVerticalReferenceHandoff;
  readonly browInterbrow:
    FR302BrowInterbrowVerticalReferenceResult;
  readonly nasalApex:
    FR304NasalApexVerticalReferenceHandoff;
  readonly nasalBridgeRoot:
    FR304NasalBridgeRootVerticalReferenceHandoff;
  readonly centralGroove:
    FR315CentralGrooveMetricBridgeResult;
  readonly hairline:
    FR318MaterializationResult;
  readonly exactCaptureProvenance:
    FR319PrivateExactCaptureProvenance;
}

export interface FR319RuntimeMetricReference {
  readonly key: FR319ReferenceKey;
  readonly observationRef: string;
  readonly value: number;
  readonly unit: 'centimeter';
  readonly coordinateFrame:
    'canonical_aligned_right_handed_metric_xy';
}

export interface FR319RepoSafeReceipt {
  readonly schemaVersion:
    'fr319-repo-safe-seven-reference-bundle-receipt-v1';
  readonly contractVersion:
    typeof FR319_SEVEN_REFERENCE_COMMON_FRAME_BUNDLE_CONTRACT_VERSION;
  readonly predecessorContractsRevalidated: boolean;
  readonly sevenReferencesAvailable: boolean;
  readonly canonicalMetricFrameVerified: boolean;
  readonly exactCaptureProvenanceVerified: boolean;
  readonly sevenReferenceRuntimeBundleAvailable: boolean;
  readonly sourceCaptureDigestPubliclyPersisted: false;
  readonly subjectIdPubliclyPersisted: false;
  readonly captureIdPubliclyPersisted: false;
  readonly rawProvenancePubliclyPersisted: false;
  readonly subjectLevelReferenceValuesPubliclyPersisted: false;
  readonly traditionalBindingIssued: false;
  readonly threeDivisionsSpanExecutionReady: false;
}

export interface FR319AuthorityBoundary {
  readonly neutralCommonFrameBundleOnly: true;
  readonly anatomicalGroundTruthIssued: false;
  readonly traditionalHairlineBindingIssued: false;
  readonly traditionalBrowBindingIssued: false;
  readonly traditionalYintangBindingIssued: false;
  readonly traditionalShangenBindingIssued: false;
  readonly traditionalZhuntouBindingIssued: false;
  readonly traditionalRenzhongBindingIssued: false;
  readonly traditionalDigeBindingIssued: false;
  readonly threeDivisionsBoundaryIssued: false;
  readonly threeDivisionsSpanIssued: false;
  readonly thresholdIssued: false;
  readonly calibrationIssued: false;
  readonly classifierIssued: false;
  readonly faceClaimIssued: false;
  readonly productColumnMaterialized: false;
  readonly productionActivated: false;
  readonly commerceActivated: false;
}

export type FR319BundleResult =
  | Readonly<{
      schemaVersion:
        'fr319-seven-reference-common-frame-bundle-result-v1';
      status: 'unavailable';
      reason:
        | 'one_or_more_neutral_references_unavailable'
        | 'exact_capture_provenance_incomplete';
      fallbackInvented: false;
      repoSafeReceipt: FR319RepoSafeReceipt;
      authorityBoundary: FR319AuthorityBoundary;
    }>
  | Readonly<{
      schemaVersion:
        'fr319-seven-reference-common-frame-bundle-result-v1';
      status: 'available';
      authorityState:
        'exact_capture_local_seven_reference_neutral_common_frame_bundle_only';
      runtimeOnlyBundle: Readonly<{
        schemaVersion:
          'fr319-runtime-only-seven-reference-common-frame-bundle-v1';
        exactCaptureLocalOnly: true;
        coordinateFrame:
          'canonical_aligned_right_handed_metric_xy';
        unit: 'centimeter';
        references: readonly FR319RuntimeMetricReference[];
        referenceCount: 7;
        crossReferenceSubtractionAuthorityIssued: false;
        traditionalSemanticsIssued: false;
        threeDivisionsSpanExecutionReady: false;
      }>;
      repoSafeReceipt: FR319RepoSafeReceipt;
      authorityBoundary: FR319AuthorityBoundary;
      nextAction:
        'review_explicit_traditional_binding_without_automatic_span_execution';
    }>;

export const FR319_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr319-seven-reference-common-frame-bundle-gate-v1' as const,
  contractVersion:
    FR319_SEVEN_REFERENCE_COMMON_FRAME_BUNDLE_CONTRACT_VERSION,
  watchtowerTrack: 'face-observation-engine' as const,
  parentIssue: 1521 as const,
  exactCaptureBundleContractImplemented: true as const,
  realFR318HairlineMetricReferenceAvailable: false as const,
  realExactCaptureSevenReferenceBundleAvailable: false as const,
  repositoryActualNeutralReferenceCapabilityCount: 6 as const,
  repositoryRemainingNeutralReferenceCapabilityCount: 1 as const,
  repositoryCommonFrameBundleAssembled: false as const,
  traditionalBindingAdmittedCount: 0 as const,
  threeDivisionsSpanExecutionReady: false as const,
  productMaterializedCount: 18 as const,
  productionActivated: false as const,
  commerceActivated: false as const,
  nextAction:
    'await_real_exact_capture_seven_reference_runtime_evidence_before_any_traditional_binding_review' as const,
});

const AUTHORITY_BOUNDARY: FR319AuthorityBoundary = Object.freeze({
  neutralCommonFrameBundleOnly: true as const,
  anatomicalGroundTruthIssued: false as const,
  traditionalHairlineBindingIssued: false as const,
  traditionalBrowBindingIssued: false as const,
  traditionalYintangBindingIssued: false as const,
  traditionalShangenBindingIssued: false as const,
  traditionalZhuntouBindingIssued: false as const,
  traditionalRenzhongBindingIssued: false as const,
  traditionalDigeBindingIssued: false as const,
  threeDivisionsBoundaryIssued: false as const,
  threeDivisionsSpanIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  classifierIssued: false as const,
  faceClaimIssued: false as const,
  productColumnMaterialized: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-319 ${message}`);
}

function receipt(
  values: Pick<
    FR319RepoSafeReceipt,
    | 'predecessorContractsRevalidated'
    | 'sevenReferencesAvailable'
    | 'canonicalMetricFrameVerified'
    | 'exactCaptureProvenanceVerified'
    | 'sevenReferenceRuntimeBundleAvailable'
  >,
): FR319RepoSafeReceipt {
  return Object.freeze({
    schemaVersion:
      'fr319-repo-safe-seven-reference-bundle-receipt-v1' as const,
    contractVersion:
      FR319_SEVEN_REFERENCE_COMMON_FRAME_BUNDLE_CONTRACT_VERSION,
    ...values,
    sourceCaptureDigestPubliclyPersisted: false as const,
    subjectIdPubliclyPersisted: false as const,
    captureIdPubliclyPersisted: false as const,
    rawProvenancePubliclyPersisted: false as const,
    subjectLevelReferenceValuesPubliclyPersisted: false as const,
    traditionalBindingIssued: false as const,
    threeDivisionsSpanExecutionReady: false as const,
  });
}

function validatePrivateProvenance(
  provenance: FR319PrivateExactCaptureProvenance,
): boolean {
  if (
    provenance.schemaVersion !==
      'fr319-private-exact-capture-provenance-v1'
  ) {
    fail('private provenance schemaVersion drift.');
  }

  if (provenance.artifactClass !== 'real_local_capture') {
    fail('synthetic fixtures cannot enter the FR319 real-local bundle assembler.');
  }

  if (
    provenance.sourceCaptureDigestPersistedPublicly !== false ||
    provenance.subjectIdPersistedPublicly !== false ||
    provenance.captureIdPersistedPublicly !== false ||
    provenance.rawProvenancePersistedPublicly !== false
  ) {
    fail('private provenance persistence boundary drift.');
  }

  const digests = REFERENCE_KEYS.map((key) => {
    const binding = provenance.bindings[key];
    if (
      !binding ||
      !SHA256.test(binding.sourceCaptureDigest) ||
      binding.exactCaptureBound !== true ||
      binding.exactSourceValueBound !== true ||
      binding.sourceAuthorityVerified !== true ||
      binding.privateProvenanceAvailable !== true
    ) {
      return null;
    }
    return binding.sourceCaptureDigest;
  });

  if (digests.some((digest) => digest === null)) {
    return false;
  }

  return new Set(digests).size === 1;
}

function reference(
  key: FR319ReferenceKey,
  observationRef: string,
  value: number,
  unit: string,
  coordinateFrame: string,
): FR319RuntimeMetricReference {
  if (
    !Number.isFinite(value) ||
    unit !== 'centimeter' ||
    coordinateFrame !==
      'canonical_aligned_right_handed_metric_xy'
  ) {
    fail(`${key} reference is not finite canonical metric XY.`);
  }

  return Object.freeze({
    key,
    observationRef,
    value,
    unit: 'centimeter' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
  });
}

function collectReferences(
  input: FR319BundleInput,
): readonly FR319RuntimeMetricReference[] | null {
  assertLowerFaceVerticalReferenceHandoffFR301(input.lowerFace);
  assertBrowInterbrowVerticalReferencesFR302(input.browInterbrow);
  assertNasalApexVerticalReferenceHandoffFR304(input.nasalApex);
  assertNasalBridgeRootVerticalReferenceHandoffFR304(
    input.nasalBridgeRoot,
  );
  assertFR315CentralGrooveMetricBridgeResult(input.centralGroove);

  const lowerFace = input.lowerFace;
  const brow = input.browInterbrow.browVerticalReference;
  const interbrow =
    input.browInterbrow.interbrowVerticalReference;
  const nasalApex = input.nasalApex;
  const nasalBridgeRoot = input.nasalBridgeRoot;
  const centralGroove = input.centralGroove;
  const hairline = input.hairline;

  if (
    lowerFace.status !== 'available' ||
    brow.status !== 'available' ||
    interbrow.status !== 'available' ||
    nasalApex.status !== 'available' ||
    nasalBridgeRoot.status !== 'available' ||
    centralGroove.status !== 'available' ||
    hairline.status !== 'available'
  ) {
    return null;
  }

  if (
    hairline.authorityState !==
      'exact_capture_local_neutral_hairline_metric_reference_only' ||
    hairline.repoSafeReceipt
      .realLocalFR316EligibilityRevalidated !== true ||
    hairline.repoSafeReceipt.localMetricMappingExecuted !== true ||
    hairline.repoSafeReceipt.metricNeutralReferenceAvailable !== true ||
    hairline.repoSafeReceipt
      .hairlineMetricReferenceReadyForSevenReferenceAssembly !== true ||
    hairline.authorityBoundary.neutralObservationOnly !== true ||
    hairline.authorityBoundary.traditionalHairlineBindingIssued !== false ||
    hairline.authorityBoundary.threeDivisionsSpanIssued !== false
  ) {
    fail('FR318 hairline authority boundary is not eligible for FR319.');
  }

  const hairlineRef =
    hairline.runtimeOnlyMetricVerticalReference;
  if (
    hairlineRef.observationRef !==
      FR318_METRIC_HAIRLINE_VERTICAL_REFERENCE_REF ||
    hairlineRef.exactCaptureLocalOnly !== true ||
    hairlineRef.globallyReusableImageToMetricTransformIssued !== false
  ) {
    fail('FR318 hairline runtime reference drift.');
  }

  const references = Object.freeze([
    reference(
      'hairline',
      hairlineRef.observationRef,
      hairlineRef.value,
      hairlineRef.unit,
      hairlineRef.coordinateFrame,
    ),
    reference(
      'brow',
      brow.observationRef,
      brow.value,
      brow.unit,
      brow.coordinateFrame,
    ),
    reference(
      'interbrow',
      interbrow.observationRef,
      interbrow.value,
      interbrow.unit,
      interbrow.coordinateFrame,
    ),
    reference(
      'nasal_bridge_root',
      nasalBridgeRoot.observationRef,
      nasalBridgeRoot.value,
      nasalBridgeRoot.unit,
      nasalBridgeRoot.coordinateFrame,
    ),
    reference(
      'nasal_apex',
      nasalApex.observationRef,
      nasalApex.value,
      nasalApex.unit,
      nasalApex.coordinateFrame,
    ),
    reference(
      'central_groove',
      centralGroove.observationRef,
      centralGroove.value,
      centralGroove.unit,
      centralGroove.coordinateFrame,
    ),
    reference(
      'lower_face_inferior',
      lowerFace.observationRef,
      lowerFace.value,
      lowerFace.unit,
      lowerFace.coordinateFrame,
    ),
  ]);

  const expectedRefs = Object.freeze({
    hairline:
      FR318_METRIC_HAIRLINE_VERTICAL_REFERENCE_REF,
    brow: FR302_BROW_VERTICAL_REFERENCE_REF,
    interbrow: FR302_INTERBROW_VERTICAL_REFERENCE_REF,
    nasal_bridge_root:
      FR304_NASAL_BRIDGE_ROOT_VERTICAL_REFERENCE_REF,
    nasal_apex: FR304_NASAL_APEX_HANDOFF_REF,
    central_groove:
      FR315_CENTRAL_GROOVE_METRIC_REFERENCE_REF,
    lower_face_inferior: FR260_REFERENCE_REF,
  } satisfies Readonly<Record<FR319ReferenceKey, string>>);

  for (const item of references) {
    if (item.observationRef !== expectedRefs[item.key]) {
      fail(`${item.key} observation ref drift.`);
    }
  }

  return references;
}

export function assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
  input: FR319BundleInput,
): FR319BundleResult {
  assertFR319CurrentGate();

  if (
    input.schemaVersion !==
      'fr319-seven-reference-common-frame-bundle-input-v1'
  ) {
    fail('input schemaVersion drift.');
  }

  const references = collectReferences(input);
  if (references === null) {
    return Object.freeze({
      schemaVersion:
        'fr319-seven-reference-common-frame-bundle-result-v1' as const,
      status: 'unavailable' as const,
      reason:
        'one_or_more_neutral_references_unavailable' as const,
      fallbackInvented: false as const,
      repoSafeReceipt: receipt({
        predecessorContractsRevalidated: true,
        sevenReferencesAvailable: false,
        canonicalMetricFrameVerified: false,
        exactCaptureProvenanceVerified: false,
        sevenReferenceRuntimeBundleAvailable: false,
      }),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  const exactCaptureVerified =
    validatePrivateProvenance(input.exactCaptureProvenance);

  if (!exactCaptureVerified) {
    return Object.freeze({
      schemaVersion:
        'fr319-seven-reference-common-frame-bundle-result-v1' as const,
      status: 'unavailable' as const,
      reason:
        'exact_capture_provenance_incomplete' as const,
      fallbackInvented: false as const,
      repoSafeReceipt: receipt({
        predecessorContractsRevalidated: true,
        sevenReferencesAvailable: true,
        canonicalMetricFrameVerified: true,
        exactCaptureProvenanceVerified: false,
        sevenReferenceRuntimeBundleAvailable: false,
      }),
      authorityBoundary: AUTHORITY_BOUNDARY,
    });
  }

  return Object.freeze({
    schemaVersion:
      'fr319-seven-reference-common-frame-bundle-result-v1' as const,
    status: 'available' as const,
    authorityState:
      'exact_capture_local_seven_reference_neutral_common_frame_bundle_only' as const,
    runtimeOnlyBundle: Object.freeze({
      schemaVersion:
        'fr319-runtime-only-seven-reference-common-frame-bundle-v1' as const,
      exactCaptureLocalOnly: true as const,
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy' as const,
      unit: 'centimeter' as const,
      references,
      referenceCount: 7 as const,
      crossReferenceSubtractionAuthorityIssued: false as const,
      traditionalSemanticsIssued: false as const,
      threeDivisionsSpanExecutionReady: false as const,
    }),
    repoSafeReceipt: receipt({
      predecessorContractsRevalidated: true,
      sevenReferencesAvailable: true,
      canonicalMetricFrameVerified: true,
      exactCaptureProvenanceVerified: true,
      sevenReferenceRuntimeBundleAvailable: true,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
    nextAction:
      'review_explicit_traditional_binding_without_automatic_span_execution' as const,
  });
}

export function assertFR319CurrentGate(): void {
  if (
    FR301_CURRENT_GATE.lowerFaceInferiorReferenceCapabilityReady !== true ||
    FR302_CURRENT_GATE.browVerticalReferenceCapabilityReady !== true ||
    FR302_CURRENT_GATE.interbrowVerticalReferenceCapabilityReady !== true ||
    FR304_CURRENT_GATE.nasalApexReferenceContractReady !== true ||
    FR304_CURRENT_GATE.nasalBridgeRootReferenceContractReady !== true ||
    FR315_CURRENT_GATE.centralGrooveMetricBridgeImplemented !== true ||
    FR318_CURRENT_GATE.realLocalMetricReceiptContractImplemented !== true ||
    FR318_CURRENT_GATE.realFR318HairlineMetricReferenceMaterialized !== false
  ) {
    fail('predecessor gate drift.');
  }

  const gate = FR319_CURRENT_GATE;
  if (
    gate.parentIssue !== 1521 ||
    gate.exactCaptureBundleContractImplemented !== true ||
    gate.realFR318HairlineMetricReferenceAvailable !== false ||
    gate.realExactCaptureSevenReferenceBundleAvailable !== false ||
    gate.repositoryActualNeutralReferenceCapabilityCount !== 6 ||
    gate.repositoryRemainingNeutralReferenceCapabilityCount !== 1 ||
    gate.repositoryCommonFrameBundleAssembled !== false ||
    gate.traditionalBindingAdmittedCount !== 0 ||
    gate.threeDivisionsSpanExecutionReady !== false ||
    gate.productMaterializedCount !== 18 ||
    gate.productionActivated !== false ||
    gate.commerceActivated !== false
  ) {
    fail('current gate drift.');
  }
}

assertFR319CurrentGate();
