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
  FACE_AUTHORITY_RESEARCH_REGISTRY_V0,
  FACE_RESEARCH_PACK_V0,
} from './research-pack-v0.js';
import {
  FRB001_CONTRACT_VERSION,
  FRB001_SCHEMA_VERSION,
  assertFaceReadingMetricBindingRegistryFRB001,
  auditMethodologyPackMetricCoverageFRB001,
  buildCanonicalFeatureAuthorityInventoryFRB001,
  createMetricBindingDefinitionFRB001,
  resolveMetricBindingReadinessFRB001,
} from './face-reading-binding-foundation-frb001.js';

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