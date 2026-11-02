import { describe, expect, it } from 'vitest';
import {
  FR319_CURRENT_GATE,
  assembleExactCaptureSevenReferenceCommonFrameBundleFR319,
  assertFR319CurrentGate,
  type FR319BundleInput,
  type FR319PrivateExactCaptureProvenance,
} from './seven-reference-common-frame-bundle-fr319.js';
import type {
  FR301LowerFaceVerticalReferenceHandoff,
} from './lower-face-vertical-reference-handoff-fr301.js';
import type {
  FR302BrowInterbrowVerticalReferenceResult,
} from './brow-interbrow-vertical-reference-fr302.js';
import type {
  FR304NasalApexVerticalReferenceHandoff,
  FR304NasalBridgeRootVerticalReferenceHandoff,
} from './nasal-vertical-reference-handoffs-fr304.js';
import type {
  FR315CentralGrooveMetricBridgeResult,
} from './common-frame-bridge-fr315.js';
import type {
  FR318MaterializationResult,
} from './hairline-real-local-metric-receipt-fr318.js';

const DIGEST =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const OTHER_DIGEST =
  'sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';

function lowerFace(): FR301LowerFaceVerticalReferenceHandoff {
  return {
    schemaVersion:
      'fr301-lower-face-vertical-reference-handoff-v1',
    artifactVersion: '0.1.0',
    contractVersion:
      'FR301-LOWER-FACE-VERTICAL-REFERENCE-HANDOFF-v1',
    authorityState:
      'neutral_lower_face_inferior_reference_handoff_only',
    status: 'available',
    observationRef:
      'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0',
    value: -6,
    unit: 'centimeter',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    selectionRule:
      'minimum_y_across_available_fr216_visible_lower_face_contour',
    visibilitySemantics:
      'available_only_when_governed_fr216_visible_lower_face_contour_is_available',
    failClosedWhenUnavailable: true,
    bridgeReviewState:
      'neutral_observation_ready_for_explicit_binding_review',
    source: {
      sourceContractId:
        'visible_lower_face_inferior_vertical_reference_fr260',
      sourceReferenceRef:
        'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0',
      sourceStatus: 'available',
      sourceProvenanceRetainedInternally: true,
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      sourceProviderIndicesExposed: false,
      sourceTraditionalSemanticsExposed: false,
    },
    authorityBoundary: {
      neutralObservationOnly: true,
      anatomicalChinIdentityIssued: false,
      traditionalDigeEquivalenceIssued: false,
      traditionalBindingIssued: false,
      threeDivisionsBoundaryIssued: false,
      threeDivisionsSpanIssued: false,
      fr35DirectReplacementIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function browInterbrow(): FR302BrowInterbrowVerticalReferenceResult {
  return {
    schemaVersion:
      'fr302-brow-interbrow-vertical-reference-v1',
    artifactVersion: '0.1.0',
    contractVersion:
      'FR302-BROW-INTERBROW-VERTICAL-REFERENCE-v1',
    authorityState:
      'neutral_visible_brow_and_interbrow_vertical_references_only',
    browVerticalReference: {
      status: 'available',
      observationRef:
        'neutral.face.visible_eyebrow_pair.arc_length_weighted_vertical_coordinate@0.1.0',
      value: 4.5,
      unit: 'centimeter',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      selectionRule:
        'mean_of_pair_arc_length_weighted_visible_curve_y_centroids',
      visibilitySemantics:
        'available_only_when_governed_fr292_visible_eyebrow_pair_geometry_is_available',
      pairOrderSemantic: false,
      failClosedWhenUnavailable: true,
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review',
    },
    interbrowVerticalReference: {
      status: 'available',
      observationRef:
        'neutral.face.visible_interbrow.medial_endpoint_midpoint_vertical_coordinate@0.1.0',
      value: 4,
      unit: 'centimeter',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      selectionRule:
        'midpoint_y_between_explicit_visible_medial_endpoints',
      visibilitySemantics:
        'available_only_when_governed_fr292_pair_is_available_and_visible_medial_endpoints_have_positive_horizontal_separation',
      pairOrderSemantic: false,
      failClosedWhenUnavailable: true,
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review',
    },
    source: {
      sourceContractVersion:
        'FR292-VISIBLE-EYEBROW-PAIR-GEOMETRY-v1',
      sourceGeometryStatus: 'available',
      explicitVisibleSemanticCurvesConsumed: true,
      canonicalAssetDigestValidatedByFR292: true,
      sourceObservationRefsValidatedByFR292: true,
      providerEyebrowComponentsConsumed: false,
      providerSpecificIndicesExposed: false,
      rawLandmarksExposed: false,
      canonicalAssetDigestExposed: false,
      sourceObservationRefsExposed: false,
      traditionalSemanticsExposed: false,
    },
    authorityBoundary: {
      neutralObservationOnly: true,
      anatomicalBrowBoundaryIssued: false,
      traditionalBrowEquivalenceIssued: false,
      traditionalYintangEquivalenceIssued: false,
      traditionalBindingIssued: false,
      threeDivisionsBoundaryIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

const nasalBoundary = {
  neutralReferenceHandoffOnly: true,
  automatedRgbExtractionIssued: false,
  productRuntimeObservationIssued: false,
  anthropometricIdentityPromotedToProduct: false,
  traditionalZhuntouEquivalenceIssued: false,
  traditionalShangenEquivalenceIssued: false,
  traditionalBindingIssued: false,
  threeDivisionsBoundaryIssued: false,
  threeDivisionsSpanIssued: false,
  thresholdIssued: false,
  calibrationIssued: false,
  classifierIssued: false,
  productColumnMaterialized: false,
  productionActivated: false,
  commerceActivated: false,
} as const;

function nasalApex(): FR304NasalApexVerticalReferenceHandoff {
  return {
    schemaVersion:
      'fr304-nasal-apex-vertical-reference-handoff-v1',
    artifactVersion: '0.1.0',
    contractVersion:
      'FR304-NASAL-VERTICAL-REFERENCE-HANDOFF-v1',
    authorityState:
      'neutral_research_reference_handoff_only',
    status: 'available',
    observationRef:
      'neutral.face.nasal_apex.vertical_coordinate@0.1.0',
    value: 1,
    unit: 'centimeter',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    visibilitySemantics:
      'available_only_when_a_governed_fr266_provider_independent_annotation_instance_exists',
    automatedRgbExtractionReady: false,
    failClosedWhenUnavailable: true,
    bridgeReviewState:
      'neutral_reference_ready_for_explicit_binding_review_runtime_extraction_not_issued',
    source: {
      sourceKind:
        'fr266_provider_independent_nasal_apex',
      sourceReferenceRef:
        'neutral.face.nasal_apex.vertical_coordinate@0.1.0',
      sourceAuthority: 'research_reference_only',
      sourceCoordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      sourceUnit: 'centimeter',
      subjectIdExposed: false,
      captureIdExposed: false,
      annotatorIdExposed: false,
      providerIndexExposed: false,
      traditionalSemanticsExposed: false,
    },
    authorityBoundary: nasalBoundary,
  };
}

function nasalBridgeRoot():
FR304NasalBridgeRootVerticalReferenceHandoff {
  return {
    schemaVersion:
      'fr304-nasal-bridge-root-vertical-reference-handoff-v1',
    artifactVersion: '0.1.0',
    contractVersion:
      'FR304-NASAL-VERTICAL-REFERENCE-HANDOFF-v1',
    authorityState:
      'neutral_benchmark_reference_handoff_only',
    status: 'available',
    observationRef:
      'neutral.face.nasal_bridge_root.vertical_coordinate@0.1.0',
    value: 3,
    unit: 'centimeter',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    projectionRuleRef:
      'neutral.face.canonical_metric_xy_projection@0.1.0',
    visibilitySemantics:
      'available_only_when_a_governed_fr297_provider_independent_annotation_instance_exists',
    automatedRgbExtractionReady: false,
    failClosedWhenUnavailable: true,
    bridgeReviewState:
      'neutral_reference_ready_for_explicit_binding_review_runtime_extraction_not_issued',
    source: {
      sourceKind:
        'fr297_provider_independent_nasal_bridge_root',
      sourceReferenceRef:
        'neutral.face.nasal_bridge_root.curvature_reference@0.1.0',
      sourceAuthority:
        'benchmark_reference_component_only',
      sourceCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      sourceUnit: 'centimeter',
      subjectIdExposed: false,
      captureIdExposed: false,
      annotatorIdExposed: false,
      providerIndexExposed: false,
      traditionalSemanticsExposed: false,
    },
    authorityBoundary: nasalBoundary,
  };
}

function centralGroove(): FR315CentralGrooveMetricBridgeResult {
  return {
    schemaVersion:
      'fr315-central-groove-metric-bridge-result-v1',
    contractVersion:
      'FR315-COMMON-FRAME-BRIDGE-v1',
    authorityState:
      'neutral_vertical_coordinate_frame_bridge_only',
    status: 'available',
    observationRef:
      'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate.canonical_metric_xy@0.1.0',
    sourceObservationRef:
      'neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate@0.1.0',
    value: -1,
    unit: 'centimeter',
    sourceCoordinateFrame: 'pose_normalized_face_2d',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    bridgeRule:
      'identity_y_bridge_between_fr79_pose_normalized_plane_and_fr265_canonical_metric_xy',
    formula: 'y_metric_xy=y_pose_normalized',
    valueIdentityPreserved: true,
    sourceSameCaptureAndDigestValidatedByFR291: true,
    fr79ProjectionRuleRef:
      'fr79:canonical-metric-xy-orthographic@0.1.0',
    fr265ProjectionRuleRef:
      'neutral.face.canonical_metric_xy_projection@0.1.0',
    sourceRecentered: false,
    sourceRescaled: false,
    perspectiveReprojectionApplied: false,
    screenCoordinateReconstructionApplied: false,
    failClosedWhenUnavailable: true,
    crossAnchorMetricFrameReady: true,
    authorityBoundary: {
      coordinateBridgeOnly: true,
      sourceObservationAuthorityExpanded: false,
      anatomicalIdentityIssued: false,
      traditionalBindingIssued: false,
      imageNormalizedHairlineMetricBridgeIssued: false,
      mixedFrameSubtractionAuthorized: false,
      threeDivisionsBoundaryIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function hairline(): FR318MaterializationResult {
  return {
    schemaVersion:
      'fr318-real-local-hairline-metric-materialization-result-v1',
    status: 'available',
    authorityState:
      'exact_capture_local_neutral_hairline_metric_reference_only',
    runtimeOnlyMetricVerticalReference: {
      schemaVersion:
        'fr318-runtime-only-hairline-metric-reference-v1',
      observationRef:
        'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate.canonical_metric_xy@0.1.0',
      sourceObservationRef:
        'neutral.face.visible_hair_skin_boundary.arc_length_weighted_vertical_coordinate@0.1.0',
      value: 7,
      unit: 'centimeter',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      axisConvention: 'x_right_y_up',
      selectionRule:
        'arc_length_weighted_y_centroid_of_transformed_visible_boundary_polyline',
      registrationMethod:
        'exact_calibrated_surface_registration',
      exactCaptureLocalOnly: true,
      sourceBoundaryCardinalityPreserved: true,
      sourceBoundaryPointOrderPreserved: true,
      noExtrapolationBeyondValidatedHairlineSupportRegion:
        true,
      globallyReusableImageToMetricTransformIssued: false,
      failClosedWhenUnavailable: true,
    },
    repoSafeReceipt: {
      schemaVersion:
        'fr318-repo-safe-hairline-metric-receipt-v1',
      contractVersion:
        'FR318-REAL-LOCAL-HAIRLINE-METRIC-RECEIPT-v1',
      realLocalFR316EligibilityRevalidated: true,
      exactSameCaptureBindingRevalidated: true,
      metricScaleAuthorityRevalidated: true,
      localMetricMappingExecuted: true,
      metricNeutralReferenceAvailable: true,
      sourceBoundaryCardinalityPreserved: true,
      sourceBoundaryPointOrderPreserved: true,
      hairlineSupportRegionStayedWithinValidatedEnvelope:
        true,
      transformedBoundaryPubliclyPersisted: false,
      sourceImageDigestPubliclyPersisted: false,
      rawRegistrationParametersPubliclyPersisted: false,
      rawCorrespondencesPubliclyPersisted: false,
      subjectMetricVerticalCoordinatePubliclyPersisted:
        false,
      globallyReusableImageToMetricTransformIssued: false,
      hairlineMetricReferenceReadyForSevenReferenceAssembly:
        true,
      threeDivisionsSpanExecutionReady: false,
    },
    authorityBoundary: {
      neutralObservationOnly: true,
      anatomicalHairlineGroundTruthIssued: false,
      traditionalHairlineBindingIssued: false,
      globallyReusableImageToMetricTransformIssued: false,
      arbitraryImageToMetricRelabelingIssued: false,
      threeDivisionsBoundaryIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      classifierIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    },
    nextAction:
      'fr319_assemble_exact_capture_seven_reference_common_frame_bundle',
  };
}

function provenance(
  overrides: Partial<FR319PrivateExactCaptureProvenance> = {},
): FR319PrivateExactCaptureProvenance {
  const binding = {
    sourceCaptureDigest: DIGEST,
    exactCaptureBound: true,
    exactSourceValueBound: true,
    sourceAuthorityVerified: true,
    privateProvenanceAvailable: true,
  } as const;

  return {
    schemaVersion:
      'fr319-private-exact-capture-provenance-v1',
    artifactClass: 'real_local_capture',
    bindings: {
      hairline: binding,
      brow: binding,
      interbrow: binding,
      nasal_bridge_root: binding,
      nasal_apex: binding,
      central_groove: binding,
      lower_face_inferior: binding,
    },
    sourceCaptureDigestPersistedPublicly: false,
    subjectIdPersistedPublicly: false,
    captureIdPersistedPublicly: false,
    rawProvenancePersistedPublicly: false,
    ...overrides,
  };
}

function input(
  overrides: Partial<FR319BundleInput> = {},
): FR319BundleInput {
  return {
    schemaVersion:
      'fr319-seven-reference-common-frame-bundle-input-v1',
    lowerFace: lowerFace(),
    browInterbrow: browInterbrow(),
    nasalApex: nasalApex(),
    nasalBridgeRoot: nasalBridgeRoot(),
    centralGroove: centralGroove(),
    hairline: hairline(),
    exactCaptureProvenance: provenance(),
    ...overrides,
  };
}

describe('FR319 exact-capture seven-reference common-frame bundle', () => {
  // Contract fixtures only: these are not real capture or review evidence.
  const hairlineDriftCases = [
    ['schemaVersion', 'unsupported-result-v9'],
    ['repoSafeReceipt.schemaVersion', 'unsupported-receipt-v9'],
    ['repoSafeReceipt.contractVersion', 'unsupported-contract-v9'],
    ['repoSafeReceipt.exactSameCaptureBindingRevalidated', false],
    ['repoSafeReceipt.metricScaleAuthorityRevalidated', false],
    ['repoSafeReceipt.sourceBoundaryCardinalityPreserved', false],
    ['repoSafeReceipt.sourceBoundaryPointOrderPreserved', false],
    ['repoSafeReceipt.hairlineSupportRegionStayedWithinValidatedEnvelope', false],
    ['repoSafeReceipt.sourceImageDigestPubliclyPersisted', true],
    ['repoSafeReceipt.threeDivisionsSpanExecutionReady', true],
    ['authorityBoundary.productionActivated', true],
    ['authorityBoundary.threeDivisionsBoundaryIssued', true],
    ['runtimeOnlyMetricVerticalReference.schemaVersion', 'unsupported-runtime-v9'],
    ['runtimeOnlyMetricVerticalReference.sourceObservationRef', 'neutral.unrelated@0.1.0'],
    ['runtimeOnlyMetricVerticalReference.axisConvention', 'x_right_y_down'],
    ['runtimeOnlyMetricVerticalReference.selectionRule', 'top_face_oval_vertex'],
    ['runtimeOnlyMetricVerticalReference.registrationMethod', 'unknown_scale_fit'],
    ['runtimeOnlyMetricVerticalReference.sourceBoundaryCardinalityPreserved', false],
    ['runtimeOnlyMetricVerticalReference.sourceBoundaryPointOrderPreserved', false],
    [
      'runtimeOnlyMetricVerticalReference.noExtrapolationBeyondValidatedHairlineSupportRegion',
      false,
    ],
    ['runtimeOnlyMetricVerticalReference.failClosedWhenUnavailable', false],
  ] as const;

  it.each(hairlineDriftCases)('rejects FR318 drift at %s', (path, value) => {
    const candidate = input();
    let target = candidate.hairline as unknown as Record<string, unknown>;
    const parts = path.split('.');
    for (const key of parts.slice(0, -1)) target = target[key] as Record<string, unknown>;
    target[parts.at(-1)!] = value;
    expect(() => assembleExactCaptureSevenReferenceCommonFrameBundleFR319(candidate)).toThrow(
      /FR318/,
    );
  });

  it('does not echo private values or digests when rejecting a predecessor version', () => {
    const candidate = input();
    (candidate.hairline as unknown as Record<string, unknown>).schemaVersion = DIGEST;
    let error: unknown;
    try {
      assembleExactCaptureSevenReferenceCommonFrameBundleFR319(candidate);
    } catch (caught) {
      error = caught;
    }
    expect(error).toBeInstanceOf(Error);
    expect(String(error)).not.toContain(DIGEST);
  });

  it('accepts both existing FR316 registration methods without changing capture requirements', () => {
    const candidate = input();
    if (candidate.hairline.status !== 'available') throw new Error('expected available fixture');
    const result = assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
      input({
        hairline: {
          ...candidate.hairline,
          runtimeOnlyMetricVerticalReference: {
            ...candidate.hairline.runtimeOnlyMetricVerticalReference,
            registrationMethod: 'independent_correspondence_registration',
          },
        },
      }),
    );
    expect(result.status).toBe('available');
    expect(JSON.stringify(result.repoSafeReceipt)).not.toContain(DIGEST);
    expect(result.authorityBoundary.threeDivisionsSpanIssued).toBe(false);
  });

  it('keeps a valid unavailable FR318 result unavailable instead of demanding success flags', () => {
    const source = hairline();
    const candidate = input({
      hairline: {
        schemaVersion: source.schemaVersion,
        status: 'unavailable',
        reason: 'real_local_metric_mapping_execution_unavailable',
        predecessorDisposition: 'eligible_for_local_hairline_metric_mapping_execution',
        fallbackInvented: false,
        repoSafeReceipt: {
          ...source.repoSafeReceipt,
          localMetricMappingExecuted: false,
          metricNeutralReferenceAvailable: false,
          sourceBoundaryCardinalityPreserved: false,
          sourceBoundaryPointOrderPreserved: false,
          hairlineMetricReferenceReadyForSevenReferenceAssembly: false,
        },
        authorityBoundary: source.authorityBoundary,
      },
    });
    const result = assembleExactCaptureSevenReferenceCommonFrameBundleFR319(candidate);
    expect(result.status).toBe('unavailable');
    expect(result.repoSafeReceipt.sevenReferenceRuntimeBundleAvailable).toBe(false);
  });

  it('revalidates FR318 version even when a different reference is unavailable', () => {
    const candidate = input();
    const raw = candidate as unknown as Record<string, Record<string, unknown>>;
    raw.lowerFace!.status = 'unavailable';
    raw.lowerFace!.reason = 'fr260_neutral_reference_unavailable';
    raw.lowerFace!.sourceUnavailableReason = 'fixture unavailable';
    raw.lowerFace!.fallbackInvented = false;
    raw.lowerFace!.bridgeReviewState = 'neutral_observation_not_available_for_binding_review';
    (raw.lowerFace!.source as Record<string, unknown>).sourceStatus = 'unavailable';
    raw.hairline!.schemaVersion = 'unsupported-result-v9';
    expect(() => assembleExactCaptureSevenReferenceCommonFrameBundleFR319(candidate)).toThrow(
      /FR318 hairline predecessor version drift/,
    );
  });

  it('assembles exactly seven neutral metric references for one exact capture', () => {
    const result =
      assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
        input(),
      );

    expect(result.status).toBe('available');
    if (result.status !== 'available') {
      throw new Error('expected available FR319 fixture result');
    }

    expect(result.runtimeOnlyBundle.referenceCount).toBe(7);
    expect(result.runtimeOnlyBundle.references.map(
      (item) => item.key,
    )).toEqual([
      'hairline',
      'brow',
      'interbrow',
      'nasal_bridge_root',
      'nasal_apex',
      'central_groove',
      'lower_face_inferior',
    ]);
    expect(result.runtimeOnlyBundle.references.every(
      (item) =>
        item.coordinateFrame ===
          'canonical_aligned_right_handed_metric_xy' &&
        item.unit === 'centimeter',
    )).toBe(true);
    expect(result.runtimeOnlyBundle).toMatchObject({
      exactCaptureLocalOnly: true,
      crossReferenceSubtractionAuthorityIssued: false,
      traditionalSemanticsIssued: false,
      threeDivisionsSpanExecutionReady: false,
    });
    expect(result.repoSafeReceipt).toMatchObject({
      predecessorContractsRevalidated: true,
      sevenReferencesAvailable: true,
      canonicalMetricFrameVerified: true,
      exactCaptureProvenanceVerified: true,
      sevenReferenceRuntimeBundleAvailable: true,
      sourceCaptureDigestPubliclyPersisted: false,
      subjectLevelReferenceValuesPubliclyPersisted: false,
      traditionalBindingIssued: false,
      threeDivisionsSpanExecutionReady: false,
    });
  });

  it('fails closed when exact-capture digests disagree', () => {
    const p = provenance({
      bindings: {
        ...provenance().bindings,
        nasal_apex: {
          ...provenance().bindings.nasal_apex,
          sourceCaptureDigest: OTHER_DIGEST,
        },
      },
    });

    const result =
      assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
        input({ exactCaptureProvenance: p }),
      );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'exact_capture_provenance_incomplete',
      fallbackInvented: false,
      repoSafeReceipt: {
        sevenReferencesAvailable: true,
        canonicalMetricFrameVerified: true,
        exactCaptureProvenanceVerified: false,
        sevenReferenceRuntimeBundleAvailable: false,
      },
    });
  });

  it('fails closed when one predecessor reference is unavailable', () => {
    const unavailableLowerFace:
    FR301LowerFaceVerticalReferenceHandoff = {
      schemaVersion:
        'fr301-lower-face-vertical-reference-handoff-v1',
      artifactVersion: '0.1.0',
      contractVersion:
        'FR301-LOWER-FACE-VERTICAL-REFERENCE-HANDOFF-v1',
      authorityState:
        'neutral_lower_face_inferior_reference_handoff_only',
      status: 'unavailable',
      reason: 'fr260_neutral_reference_unavailable',
      sourceUnavailableReason: 'fixture unavailable',
      fallbackInvented: false,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review',
      source: {
        sourceContractId:
          'visible_lower_face_inferior_vertical_reference_fr260',
        sourceReferenceRef:
          'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0',
        sourceStatus: 'unavailable',
        sourceProvenanceRetainedInternally: true,
        sourceProviderRunRefExposed: false,
        sourceCanonicalAssetDigestExposed: false,
        sourceProviderIndicesExposed: false,
        sourceTraditionalSemanticsExposed: false,
      },
      authorityBoundary:
        lowerFace().authorityBoundary,
    };

    const result =
      assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
        input({ lowerFace: unavailableLowerFace }),
      );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'one_or_more_neutral_references_unavailable',
      fallbackInvented: false,
      repoSafeReceipt: {
        sevenReferencesAvailable: false,
        sevenReferenceRuntimeBundleAvailable: false,
      },
    });
  });

  it('rejects synthetic provenance from the real-local assembler', () => {
    expect(() =>
      assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
        input({
          exactCaptureProvenance: provenance({
            artifactClass: 'synthetic_fixture',
          }),
        }),
      ),
    ).toThrow(
      /synthetic fixtures cannot enter the FR319 real-local bundle assembler/,
    );
  });

  it('rejects public persistence of private capture provenance', () => {
    expect(() =>
      assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
        input({
          exactCaptureProvenance: provenance({
            sourceCaptureDigestPersistedPublicly: true,
          } as never),
        }),
      ),
    ).toThrow(/private provenance persistence boundary drift/);
  });

  it('rejects a widened FR318 hairline authority boundary', () => {
    const widened = hairline();
    if (widened.status !== 'available') {
      throw new Error('expected available hairline fixture');
    }

    expect(() =>
      assembleExactCaptureSevenReferenceCommonFrameBundleFR319(
        input({
          hairline: {
            ...widened,
            authorityBoundary: {
              ...widened.authorityBoundary,
              traditionalHairlineBindingIssued: true,
            },
          } as never,
        }),
      ),
    ).toThrow(/FR318 hairline authority boundary/);
  });

  it('keeps repository authority at six of seven without real evidence', () => {
    expect(FR319_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      exactCaptureBundleContractImplemented: true,
      realFR318HairlineMetricReferenceAvailable: false,
      realExactCaptureSevenReferenceBundleAvailable: false,
      repositoryActualNeutralReferenceCapabilityCount: 6,
      repositoryRemainingNeutralReferenceCapabilityCount: 1,
      repositoryCommonFrameBundleAssembled: false,
      traditionalBindingAdmittedCount: 0,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR319CurrentGate()).not.toThrow();
  });
});
