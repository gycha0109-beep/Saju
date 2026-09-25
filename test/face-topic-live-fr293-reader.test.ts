import { describe, expect, it } from 'vitest';
import {
  FACE_ENGINE_FR293_AUTHORITY_STATE,
  FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION,
  FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF,
  FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION,
  buildFaceAuthorityCoverageSnapshot,
  buildFaceLiveReaderPipeline,
  planFaceTopicExecution,
  type FaceTopicAuthorizedExecutionPlan,
} from '../src/index.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

const snapshot = buildFaceAuthorityCoverageSnapshot(
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest(),
);

const FEATURE_KEYS = Object.freeze([
  'forehead.visible_width_shape',
  'forehead.visible_hairline_boundary',
  'forehead.relative_surface_curvature',
  'eyebrow.span_arch_tail_orientation',
  'eyebrow.visible_hair_density_texture',
  'eye.width_height_ratio',
  'eye.inter_eye_spacing_ratio',
  'eye.outer_corner_tilt',
  'eye.bilateral_shape_asymmetry',
  'eye.eyelid_crease_or_hooded_category',
  'nose.bridge_centerline_deviation',
  'nose.tip_contour_circularity',
  'nose.alar_width_and_nostril_geometry',
  'nose.tip_bridge_relative_projection',
  'mouth.width_and_relative_size',
  'mouth.corner_orientation',
  'mouth.outline_angularity',
  'mouth.visible_lip_fullness',
  'mouth.philtrum_length_width',
  'mouth.visible_lip_color',
  'ear.visible_boundary_height_shape',
  'ear.thickness_attachment_canal_boundary',
  'cheek_midface.visible_width_ratio',
  'cheek_midface.visible_contour_prominence',
  'cheek_midface.relative_3d_prominence',
  'chin_lower_face.visible_width_ratio',
  'chin_lower_face.visible_contour',
  'chin_lower_face.chin_height_width_center_deviation',
  'chin_lower_face.relative_projection',
] as const);

const AVAILABLE_STRUCTURE_KEYS = new Set<string>([
  'eye.width_height_ratio',
  'mouth.width_and_relative_size',
  'chin_lower_face.visible_width_ratio',
  'nose.alar_width_and_nostril_geometry',
]);

function authorized(
  topicKey = 'face.discover.structure',
): FaceTopicAuthorizedExecutionPlan {
  const plan = planFaceTopicExecution(
    {
      topicKey,
      observationArtifactRef:
        'face-observation-artifact:topic-face-004a:001',
      requestId: 'request:topic-face-004a:001',
    },
    snapshot,
  );
  if (!plan.authorized) {
    throw new Error(
      `expected authorized plan: ${topicKey}`,
    );
  }
  return plan;
}

function observationRef(
  artifactRef: string,
  featureKey: string,
): string {
  return [
    'face-neutral-observation:v1',
    encodeURIComponent(artifactRef),
    encodeURIComponent(featureKey),
  ].join(':');
}

function displayValue(featureKey: string): unknown {
  switch (featureKey) {
    case 'eye.width_height_ratio':
      return {
        kind: 'scalar',
        value: 0.42,
        unit: 'ratio',
      };
    case 'mouth.width_and_relative_size':
      return {
        kind: 'continuous_axes',
        axes: [
          {
            axisKey: 'bounding_box_aspect_ratio',
            value: 2.1,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
          },
          {
            axisKey:
              'horizontal_span_to_full_mesh_horizontal_span_ratio',
            value: 0.31,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
          },
        ],
      };
    case 'chin_lower_face.visible_width_ratio':
      return {
        kind: 'scalar',
        value: 0.68,
        unit: 'ratio',
      };
    case 'nose.alar_width_and_nostril_geometry':
      return {
        kind: 'composite_visible_nasal_geometry',
        axes: [
          {
            axisKey:
              'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0',
            value: 1.6,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.alar.visible_width_to_tip_contour_width_ratio@0.1.0',
          },
          {
            axisKey:
              'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0',
            value: 1.8,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.nostril.mean_bbox_width_to_height_ratio@0.1.0',
          },
          {
            axisKey:
              'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0',
            value: 0.07,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.nostril.role_free_contour_area_asymmetry_ratio@0.1.0',
          },
        ],
      };
    default:
      throw new Error(
        `no display value fixture for ${featureKey}`,
      );
  }
}

function regionKey(featureKey: string): string {
  const [region] = featureKey.split('.');
  return region ?? 'face';
}

function engineReceipt(
  plan: FaceTopicAuthorizedExecutionPlan,
  artifactRef = plan.observationArtifactRef,
): Record<string, unknown> {
  const facts = FEATURE_KEYS.map((featureKey) => {
    const base = {
      featureKey,
      observationRef: observationRef(
        artifactRef,
        featureKey,
      ),
      regionKey: regionKey(featureKey),
      sourceMetricRefs: AVAILABLE_STRUCTURE_KEYS.has(
        featureKey,
      )
        ? [`neutral.test.${featureKey}@0.1.0`]
        : [],
      quality: {
        dependency: 'canonical_metric_geometry',
        viewpointSensitivity:
          'not_characterized_by_fr283',
        evidenceRefs: [],
        poseAcceptanceThresholdIssued: false,
        correctionApplied: false,
        currentCapturePoseAdjudication:
          'not_issued',
      },
      providerLandmarkIndicesExposed: false,
      rawLandmarksExposed: false,
      sourceObservationRefsExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      traditionalBindingApplied: false,
      classificationApplied: false,
      thresholdApplied: false,
    };

    if (AVAILABLE_STRUCTURE_KEYS.has(featureKey)) {
      return {
        ...base,
        status: 'available',
        value: displayValue(featureKey),
      };
    }

    return {
      ...base,
      status: 'unavailable',
      reason: 'source_feature_unavailable',
      sourceReason: 'test_capture_unavailable',
      fallbackInvented: false,
    };
  });

  return {
    schemaVersion:
      FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION,
    authorityRef:
      FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF,
    observationArtifactRef: artifactRef,
    sourceContractVersion:
      FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION,
    authorityState:
      FACE_ENGINE_FR293_AUTHORITY_STATE,
    facts,
    coverage: {
      representedFeatureCount: 29,
      canonicalExtractorMaterializedCount: 18,
      extractorOrAuthorityGapCount: 11,
      availableDisplayFactCount: 4,
      unavailableDisplayFactCount: 25,
    },
    provenance: {
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      sourceObservationRefsExposed: false,
      providerLandmarkIndicesExposed: false,
      rawLandmarksExposed: false,
    },
    authorityBoundary: {
      neutralObservationOnly: true,
      rawImageExposed: false,
      rawLandmarksExposed: false,
      providerLandmarkIndicesExposed: false,
      sourceObservationRefsExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      identityRecognitionApplied: false,
      biometricTemplateCreated: false,
      traditionalInterpretationIncluded: false,
      traditionalBindingIssued: false,
      classifierIssued: false,
      thresholdIssued: false,
      commerceActivated: false,
    },
  };
}

function replaceFact(
  receipt: Record<string, unknown>,
  featureKey: string,
  mutate: (
    fact: Record<string, unknown>,
  ) => Record<string, unknown>,
): Record<string, unknown> {
  const facts = receipt.facts;
  if (!Array.isArray(facts)) {
    throw new Error('fixture facts missing');
  }
  return {
    ...receipt,
    facts: facts.map((value) => {
      const fact = value as Record<string, unknown>;
      return fact.featureKey === featureKey
        ? mutate(fact)
        : fact;
    }),
  };
}

describe('TOPIC-FACE-004A live FR293 Reader integration', () => {
  it('closes the AVAILABLE structure path from the governed Face Engine receipt to Reader', () => {
    const plan = authorized();
    const pipeline = buildFaceLiveReaderPipeline(
      plan,
      engineReceipt(plan),
    );

    expect(pipeline.executionResult.observations)
      .toHaveLength(4);
    expect(pipeline.projection.selectedObservationRefs)
      .toHaveLength(4);
    expect(pipeline.displayFacts.facts)
      .toHaveLength(4);
    expect(
      pipeline.readerDelivery.sections.flatMap(
        (section) => section.items,
      ),
    ).toHaveLength(4);
    expect(pipeline.readerDelivery.readinessState)
      .toBe('available');

    const eye = pipeline.readerDelivery.sections
      .flatMap((section) => section.items)
      .find(
        (item) =>
          item.itemKey ===
          'eye.width_height_ratio',
      );
    expect(eye?.displayValue).toEqual({
      kind: 'scalar',
      value: 0.42,
      unit: 'ratio',
    });
    expect(
      pipeline.displayFacts.sourceResultHash,
    ).toBe(pipeline.projection.sourceResultHash);
    expect(
      pipeline.readerDelivery.projectionHash,
    ).toBe(pipeline.projection.projectionHash);
  });

  it('filters the 29-column authority superset to the Topic-authorized four observations', () => {
    const plan = authorized();
    const receipt = engineReceipt(plan);
    expect(receipt.facts).toHaveLength(29);

    const pipeline = buildFaceLiveReaderPipeline(
      plan,
      receipt,
    );
    expect(
      pipeline.executionResult.observations.map(
        (unit) => unit.capabilityKey,
      ).sort(),
    ).toEqual(
      [...plan.requiredObservationCapabilities].sort(),
    );
    expect(
      pipeline.displayFacts.facts.map(
        (fact) => fact.capabilityKey,
      ).sort(),
    ).toEqual(
      [...plan.requiredObservationCapabilities].sort(),
    );
  });

  it('preserves the PARTIAL forehead hard gap as an explicit unavailable Reader section', () => {
    const plan = authorized(
      'face.discover.extended',
    );
    const pipeline = buildFaceLiveReaderPipeline(
      plan,
      engineReceipt(plan),
    );

    expect(plan.readinessState).toBe('partial');
    expect(pipeline.projection.unavailableSections)
      .toContain(
        'observation:forehead.visible_width_shape',
      );
    expect(
      pipeline.readerDelivery.sections.find(
        (section) =>
          section.sectionKey === 'forehead',
      ),
    ).toEqual({
      sectionKey: 'forehead',
      titleKey: 'face.reader.section.forehead',
      status: 'unavailable',
      items: [],
    });
  });

  it('rejects a receipt for a different observation artifact', () => {
    const plan = authorized();
    expect(() =>
      buildFaceLiveReaderPipeline(
        plan,
        engineReceipt(
          plan,
          'face-observation-artifact:topic-face-004a:other',
        ),
      ),
    ).toThrow(
      'FACE_LIVE_FR293_OBSERVATION_ARTIFACT_MISMATCH',
    );
  });

  it('rejects an unavailable required structure fact instead of inventing a fallback', () => {
    const plan = authorized();
    let receipt = engineReceipt(plan);
    receipt = replaceFact(
      receipt,
      'eye.width_height_ratio',
      (fact) => ({
        ...fact,
        status: 'unavailable',
        reason: 'source_feature_unavailable',
        sourceReason: 'test_capture_unavailable',
        fallbackInvented: false,
        value: undefined,
      }),
    );
    const facts = (receipt.facts as Record<string, unknown>[])
      .map((fact) => {
        if (
          fact.featureKey !==
          'eye.width_height_ratio'
        ) {
          return fact;
        }
        const withoutValue = { ...fact };
        delete withoutValue.value;
        return withoutValue;
      });
    receipt = {
      ...receipt,
      facts,
      coverage: {
        representedFeatureCount: 29,
        canonicalExtractorMaterializedCount: 18,
        extractorOrAuthorityGapCount: 11,
        availableDisplayFactCount: 3,
        unavailableDisplayFactCount: 26,
      },
    };

    expect(() =>
      buildFaceLiveReaderPipeline(plan, receipt),
    ).toThrow(
      'FACE_LIVE_FR293_REQUIRED_FACT_UNAVAILABLE:eye.width_height_ratio',
    );
  });

  it('rejects authority/version drift and forged semantic payload', () => {
    const plan = authorized();
    const receipt = engineReceipt(plan);

    expect(() =>
      buildFaceLiveReaderPipeline(plan, {
        ...receipt,
        authorityRef:
          'face-engine.fr293.product-display-facts@forged',
      }),
    ).toThrow(
      'FACE_LIVE_FR293_AUTHORITY_IDENTITY_MISMATCH',
    );

    expect(() =>
      buildFaceLiveReaderPipeline(plan, {
        ...receipt,
        sourceContractVersion:
          'FR293-CANONICAL-RGB-SELFIE-MORPHOLOGY-v999',
      }),
    ).toThrow(
      'FACE_LIVE_FR293_AUTHORITY_IDENTITY_MISMATCH',
    );

    expect(() =>
      buildFaceLiveReaderPipeline(plan, {
        ...receipt,
        semanticClaims: [
          {
            claimFamily: 'face.claim.forged',
          },
        ],
      }),
    ).toThrow(
      'FACE_LIVE_FR293_RECEIPT_SCOPE_VIOLATION:semanticClaims',
    );
  });

  it('rejects observationRef drift even when the feature key is otherwise valid', () => {
    const plan = authorized();
    const receipt = replaceFact(
      engineReceipt(plan),
      'eye.width_height_ratio',
      (fact) => ({
        ...fact,
        observationRef:
          'face-neutral-observation:v1:forged:eye.width_height_ratio',
      }),
    );

    expect(() =>
      buildFaceLiveReaderPipeline(plan, receipt),
    ).toThrow(
      'FACE_LIVE_FR293_OBSERVATION_REF_MISMATCH:eye.width_height_ratio',
    );
  });

  it('keeps Three-Divisions blocked before any Face Engine receipt can reach Product admission', () => {
    const blocked = planFaceTopicExecution(
      {
        topicKey: 'face.reading.three_divisions',
        observationArtifactRef:
          'face-observation-artifact:topic-face-004a:blocked',
        requestId:
          'request:topic-face-004a:blocked',
      },
      snapshot,
    );

    expect(blocked.authorized).toBe(false);
    expect(() =>
      buildFaceLiveReaderPipeline(
        blocked,
        {},
      ),
    ).toThrow(
      'FACE_LIVE_FR293_BLOCKED_PLAN_REJECTED',
    );
  });
});
