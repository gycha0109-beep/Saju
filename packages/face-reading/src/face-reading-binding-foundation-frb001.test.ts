import { describe, expect, it } from 'vitest';
import type {
  FaceAuthorityRegistry,
  FaceMethodologyDefinition,
  FaceMetricDefinition,
} from './contracts.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR284_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
  type FR284CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  FR284_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr284.js';
import {
  FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
  FACE_RESEARCH_PACK_V0,
} from './research-pack-v0.js';
import {
  FRB001_CONTRACT_VERSION,
  FRB001_SCHEMA_VERSION,
  assertFaceReadingMetricBindingRegistryFRB001,
  auditMethodologyPackMetricCoverageFRB001,
  buildCanonicalFeatureAuthorityInventoryFRB001,
  buildFR284RuntimeCapabilitiesFRB001,
  createMetricBindingDefinitionFRB001,
  resolveMetricBindingReadinessFRB001,
} from './face-reading-binding-foundation-frb001.js';

function fr284PayloadFixture(): FR284CanonicalRgbSelfieMorphologyPayload {
  const quality = (
    dependency:
      | 'canonical_metric_geometry'
      | 'canonical_metric_geometry_and_fr283_viewpoint_context'
      | 'appearance_image_quality',
    viewpointSensitivity:
      | 'not_characterized_by_fr283'
      | 'documented_low_angle_sensitivity_fr283'
      | 'not_applicable',
    evidenceRefs: readonly string[] = [],
  ) => ({
    dependency,
    viewpointSensitivity,
    evidenceRefs,
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  });

  const base = {
    regionKey: 'eye_pair' as const,
    providerLandmarkIndicesExposed: false as const,
    rawLandmarksExposed: false as const,
    traditionalBindingApplied: false as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
  };

  const pendingFeatureKeys = FR284_PRODUCT_COLUMN_MAP
    .map((entry) => entry.featureKey)
    .filter((featureKey) => ![
      'eye.width_height_ratio',
      'eye.inter_eye_spacing_ratio',
      'eye.outer_corner_tilt',
      'eye.bilateral_shape_asymmetry',
      'eye.eyelid_crease_or_hooded_category',
    ].includes(featureKey));

  return {
    schemaVersion: 'fr284-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion: FR284_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
    authorityState:
      'product_facing_canonical_observable_morphology_no_traditional_semantics',
    captureBoundary: {
      cameraClass: 'ordinary_smartphone_rgb_front_camera',
      distanceCm: [25, 30],
      specialDepthHardwareRequired: false,
    },
    materializedRegionKeys: ['eye_pair'],
    features: [
      {
        ...base,
        featureKey: 'eye.width_height_ratio',
        status: 'available',
        value: { kind: 'scalar', value: 0.31, unit: 'ratio' },
        sourceMetricRefs: ['neutral.eye_pair.width_height@0.1.0'],
        quality: quality(
          'canonical_metric_geometry',
          'not_characterized_by_fr283',
        ),
      },
      {
        ...base,
        featureKey: 'eye.inter_eye_spacing_ratio',
        status: 'available',
        value: { kind: 'scalar', value: 0.22, unit: 'ratio' },
        sourceMetricRefs: ['neutral.eye_pair.spacing@0.1.0'],
        quality: quality(
          'canonical_metric_geometry',
          'not_characterized_by_fr283',
        ),
      },
      {
        ...base,
        featureKey: 'eye.outer_corner_tilt',
        status: 'available',
        value: { kind: 'scalar', value: 8.2, unit: 'degree' },
        sourceMetricRefs: ['neutral.eye.outer_corner_tilt.mean_degrees@0.1.0'],
        quality: quality(
          'canonical_metric_geometry_and_fr283_viewpoint_context',
          'documented_low_angle_sensitivity_fr283',
          ['fr283:implementation', 'fr283:empirical'],
        ),
      },
      {
        ...base,
        featureKey: 'eye.bilateral_shape_asymmetry',
        status: 'available',
        value: {
          kind: 'continuous_axes',
          axes: [{
            axisKey: 'horizontal_span_relative_difference',
            value: 0.04,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0',
          }],
        },
        sourceMetricRefs: [
          'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0',
        ],
        quality: quality(
          'canonical_metric_geometry',
          'not_characterized_by_fr283',
        ),
      },
      {
        ...base,
        featureKey: 'eye.eyelid_crease_or_hooded_category',
        status: 'unavailable',
        reason: 'image_model_extractor_not_materialized',
        sourceMetricRefs: [],
        quality: quality(
          'appearance_image_quality',
          'not_applicable',
        ),
        fallbackInvented: false,
      },
    ],
    pendingFeatureKeys,
    provenance: {
      sourceGeometryCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      sourceGeometryProviderOpaque: true,
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      sameGovernedGeometrySourceVerified: true,
      sourceContracts: [
        'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
        'FR215-ROLE-INVARIANT-EYE-ASYMMETRY-SURFACE-v1',
      ],
    },
    authorityBoundary: {
      rawImageExposed: false,
      rawLandmarksExposed: false,
      providerLandmarkIndicesExposed: false,
      identityRecognitionApplied: false,
      biometricTemplateCreated: false,
      depthHardwareRequired: false,
      physicalMillimeterGroundTruthClaimed: false,
      traditionalInterpretationIncluded: false,
      traditionalBindingIssued: false,
      thresholdIssued: false,
      correctionFormulaApplied: false,
    },
  };
}

function syntheticRegistry(metricKey = 'metric.synthetic.frb001.numeric'):
FaceAuthorityRegistry {
  const sourceRef = FACE_AUTHORITY_RESEARCH_REGISTRY_V0.passages[0]!.passageId;
  const methodology: FaceMethodologyDefinition = {
    methodologyId: 'method.synthetic.frb001',
    version: '0.1.0',
    traditionalTerm: 'structural_unit_fixture',
    scope: 'static_face',
    sourceRefs: [sourceRef],
    description: 'Synthetic FRB001 unit-test methodology only.',
    limitations: ['Not a real traditional methodology.'],
    reviewStatus: 'research',
  };
  const metric: FaceMetricDefinition = {
    metricKey,
    version: '0.1.0',
    methodologyRef: 'method.synthetic.frb001@0.1.0',
    sourceRefs: [sourceRef],
    formula: 'structural_unit_fixture',
    requiredAnchorRefs: ['synthetic_anchor'],
    unit: 'degree',
    stabilityRequirements: ['structural_unit_fixture'],
    reviewStatus: 'research',
  };
  return {
    ...FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
    methodologies: [
      ...FACE_AUTHORITY_RESEARCH_REGISTRY_V0.methodologies,
      methodology,
    ],
    metrics: [
      ...FACE_AUTHORITY_RESEARCH_REGISTRY_V0.metrics,
      metric,
    ],
  };
}

describe('FRB001 face-reading binding foundation', () => {
  it('adapts the merged FR284 payload into a complete 29-feature capability handshake', () => {
    const capabilities = buildFR284RuntimeCapabilitiesFRB001(
      fr284PayloadFixture(),
    );

    expect(capabilities).toHaveLength(
      FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries.length,
    );
    expect(new Set(capabilities.map((entry) => entry.featureKey)).size)
      .toBe(capabilities.length);

    for (const featureKey of [
      'eye.width_height_ratio',
      'eye.inter_eye_spacing_ratio',
      'eye.outer_corner_tilt',
      'eye.bilateral_shape_asymmetry',
    ]) {
      const capability = capabilities.find(
        (entry) => entry.featureKey === featureKey,
      );
      expect(capability?.materializationState).toBe('materialized');
      expect(capability?.availabilityState).toBe('available');
    }

    const tilt = capabilities.find(
      (entry) => entry.featureKey === 'eye.outer_corner_tilt',
    );
    expect(tilt?.qualityContextRefs).toEqual([
      'fr283:implementation',
      'fr283:empirical',
    ]);

    const eyelid = capabilities.find(
      (entry) =>
        entry.featureKey === 'eye.eyelid_crease_or_hooded_category',
    );
    expect(eyelid?.materializationState).toBe('not_materialized');
    expect(eyelid?.availabilityState).toBe('not_evaluated');

    const ear = capabilities.find(
      (entry) =>
        entry.featureKey === 'ear.thickness_attachment_canal_boundary',
    );
    expect(ear?.materializationState).toBe('unsupported');
    expect(ear?.availabilityState).toBe('unavailable');
  });


  it('mirrors the complete FR282 authority vocabulary without claiming engine materialization', () => {
    const inventory = buildCanonicalFeatureAuthorityInventoryFRB001();

    expect(inventory).toHaveLength(
      FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries.length,
    );
    expect(new Set(inventory.map((entry) => entry.featureKey)).size)
      .toBe(inventory.length);
    expect(
      inventory
        .filter((entry) => entry.authorityReadiness !== 'unavailable')
        .every((entry) => entry.materializationAssertion === 'not_asserted_by_fr282'),
    ).toBe(true);
    expect(
      inventory
        .filter((entry) => entry.authorityReadiness === 'unavailable')
        .every(
          (entry) =>
            entry.materializationAssertion ===
            'unsupported_by_current_product_input',
        ),
    ).toBe(true);
    expect(inventory.every((entry) => entry.traditionalBindingIssued === false))
      .toBe(true);
  });

  it('audits the current research pack without pretending that methodology metrics are already bound', () => {
    const audit = auditMethodologyPackMetricCoverageFRB001({
      authorityRegistry: FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
      methodologyPackRef:
        `${FACE_RESEARCH_PACK_V0.packId}@${FACE_RESEARCH_PACK_V0.version}`,
      bindings: [],
    });

    expect(audit.metricCount).toBe(3);
    expect(audit.declaredBindingCount).toBe(0);
    expect(audit.missingBindingCount).toBe(3);
    expect(audit.outsideProductAuthorityCount).toBe(0);
    expect(
      audit.entries.every(
        (entry) =>
          entry.state === 'metric_binding_missing'
          && entry.gap?.target === 'face-reading-binding'
          && entry.gap.code === 'metric_binding_missing',
      ),
    ).toBe(true);
    expect(Object.values(audit.authorityBoundary).every((value) => value === false))
      .toBe(true);
  });

  it('routes a declared but unmaterialized canonical feature to the observation-engine track', () => {
    const registry = syntheticRegistry();
    const binding = createMetricBindingDefinitionFRB001({
      bindingId: 'binding.synthetic.frb001.eye_tilt',
      metricRef: 'metric.synthetic.frb001.numeric@0.1.0',
      canonicalFeatures: [{ featureKey: 'eye.outer_corner_tilt' }],
      bindingKind: 'direct_numeric',
      qualityDependencyRefs: ['canonical_metric_geometry'],
    });

    const resolution = resolveMetricBindingReadinessFRB001({
      authorityRegistry: registry,
      binding,
      runtimeCapabilities: [{
        featureKey: 'eye.outer_corner_tilt',
        materializationState: 'not_materialized',
        availabilityState: 'not_evaluated',
        qualityContextRefs: [],
      }],
    });

    expect(resolution.state).toBe('canonical_feature_not_materialized');
    expect(resolution.gap?.target).toBe('face-observation-engine');
    expect(resolution.gap?.code).toBe('canonical_feature_not_materialized');
  });

  it('marks a direct numeric binding ready only after the engine reports an available materialized feature', () => {
    const registry = syntheticRegistry();
    const binding = createMetricBindingDefinitionFRB001({
      bindingId: 'binding.synthetic.frb001.eye_tilt',
      metricRef: 'metric.synthetic.frb001.numeric@0.1.0',
      canonicalFeatures: [{ featureKey: 'eye.outer_corner_tilt' }],
      bindingKind: 'direct_numeric',
      qualityDependencyRefs: ['canonical_metric_geometry'],
    });

    const resolution = resolveMetricBindingReadinessFRB001({
      authorityRegistry: registry,
      binding,
      runtimeCapabilities: [{
        featureKey: 'eye.outer_corner_tilt',
        materializationState: 'materialized',
        availabilityState: 'available',
        qualityContextRefs: ['fr283:viewpoint_context'],
      }],
    });

    expect(resolution.state).toBe('ready_for_metric_value');
    expect(resolution.gap).toBeNull();
    expect(resolution.canonicalFeatureKeys).toEqual(['eye.outer_corner_tilt']);
  });

  it('keeps structured component extraction inside an explicit binding adapter', () => {
    const registry = syntheticRegistry('metric.synthetic.frb001.component');
    const binding = createMetricBindingDefinitionFRB001({
      bindingId: 'binding.synthetic.frb001.eye_asymmetry_component',
      metricRef: 'metric.synthetic.frb001.component@0.1.0',
      canonicalFeatures: [{
        featureKey: 'eye.bilateral_shape_asymmetry',
        componentPath: 'horizontalSpanRelativeDifference',
      }],
      bindingKind: 'component_numeric',
      adapterRef: 'adapter.frb001.synthetic.eye_asymmetry_component',
      qualityDependencyRefs: ['canonical_metric_geometry'],
    });

    const capability = [{
      featureKey: 'eye.bilateral_shape_asymmetry',
      materializationState: 'materialized' as const,
      availabilityState: 'available' as const,
      qualityContextRefs: [],
    }];

    const blocked = resolveMetricBindingReadinessFRB001({
      authorityRegistry: registry,
      binding,
      runtimeCapabilities: capability,
      materializedAdapterRefs: [],
    });
    expect(blocked.state).toBe('binding_adapter_not_materialized');
    expect(blocked.gap?.target).toBe('face-reading-binding');

    const ready = resolveMetricBindingReadinessFRB001({
      authorityRegistry: registry,
      binding,
      runtimeCapabilities: capability,
      materializedAdapterRefs: ['adapter.frb001.synthetic.eye_asymmetry_component'],
    });
    expect(ready.state).toBe('ready_for_metric_value');
  });

  it('routes a methodology requirement outside current RGB product authority back to traditional research', () => {
    const registry = syntheticRegistry('metric.synthetic.frb001.unavailable');
    const binding = createMetricBindingDefinitionFRB001({
      bindingId: 'binding.synthetic.frb001.unavailable',
      metricRef: 'metric.synthetic.frb001.unavailable@0.1.0',
      canonicalFeatures: [{
        featureKey: 'ear.thickness_attachment_canal_boundary',
      }],
      bindingKind: 'derived_numeric',
      adapterRef: 'adapter.frb001.synthetic.unavailable',
    });

    const resolution = resolveMetricBindingReadinessFRB001({
      authorityRegistry: registry,
      binding,
      runtimeCapabilities: [{
        featureKey: 'ear.thickness_attachment_canal_boundary',
        materializationState: 'unsupported',
        availabilityState: 'unavailable',
        qualityContextRefs: [],
      }],
      materializedAdapterRefs: ['adapter.frb001.synthetic.unavailable'],
    });

    expect(resolution.state)
      .toBe('required_observation_outside_product_authority');
    expect(resolution.gap?.target).toBe('face-traditional-research');
    expect(resolution.gap?.code)
      .toBe('required_observation_outside_product_authority');
  });

  it('rejects any binding that reaches outside the FR282 canonical authority vocabulary', () => {
    const registry = syntheticRegistry();
    const invalid = {
      schemaVersion: FRB001_SCHEMA_VERSION,
      contractVersion: FRB001_CONTRACT_VERSION,
      bindingId: 'binding.synthetic.frb001.invalid',
      metricRef: 'metric.synthetic.frb001.numeric@0.1.0',
      canonicalFeatures: [{ featureKey: 'invented.face.magic_score' }],
      bindingKind: 'direct_numeric' as const,
      qualityDependencyRefs: [],
      reviewStatus: 'research' as const,
      authorityBoundary: {
        thresholdIssued: false as const,
        classificationIssued: false as const,
        cameraCorrectionIssued: false as const,
        traditionalMeaningCreated: false as const,
        consumerProseCreated: false as const,
      },
    };

    expect(() => assertFaceReadingMetricBindingRegistryFRB001({
      authorityRegistry: registry,
      bindings: [invalid],
    })).toThrow(/outside FR282 authority/);
  });
});