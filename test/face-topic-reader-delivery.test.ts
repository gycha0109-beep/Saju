import { describe, expect, it } from 'vitest';
import {
  FACE_NEUTRAL_ANALYSIS_PROGRESS_KEYS,
  admitFaceDisplayFacts,
  admitFaceTopicExecutionResult,
  buildFaceAuthorityCoverageSnapshot,
  buildFaceProductProjection,
  buildFaceReaderDelivery,
  mapFaceTopicReadinessToUiAvailability,
  planFaceTopicExecution,
  type FaceDisplayFactReceiptV1,
  type FaceDisplayValueV1,
  type FaceProductProjectionV1,
  type FaceTopicAuthorizedExecutionPlan,
  type FaceTopicExecutionResultReceiptV1,
} from '../src/index.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';

const snapshot = buildFaceAuthorityCoverageSnapshot(
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest(),
);

function authorized(
  topicKey = 'face.discover.structure',
): FaceTopicAuthorizedExecutionPlan {
  const plan = planFaceTopicExecution(
    {
      topicKey,
      observationArtifactRef:
        'face-observation-artifact:topic-face-004:001',
      requestId: 'request:topic-face-004:001',
    },
    snapshot,
  );
  if (!plan.authorized) {
    throw new Error(`expected authorized plan: ${topicKey}`);
  }
  return plan;
}

function resultReceipt(
  plan: FaceTopicAuthorizedExecutionPlan,
): FaceTopicExecutionResultReceiptV1 {
  return {
    schemaVersion: 'face-topic-execution-result-receipt-v1',
    executionPlanHash: plan.executionPlanHash,
    requestId: plan.requestId,
    authoritySnapshotId: plan.authoritySnapshotId,
    observationArtifactRef: plan.observationArtifactRef,
    executionKind: plan.executionKind,
    faceEngineVersion: 'face-engine:test-fr293',
    methodologyPackRefs: [],
    bindingGroupRefs: [],
    observations: plan.requiredObservationCapabilities.map(
      (capabilityKey, index) => ({
        kind: 'neutral_observation' as const,
        capabilityKey,
        observationRef:
          `face-observation:topic-face-004:${index + 1}`,
        qualifiers: ['governed_neutral_observation'],
        provenanceRefs: [
          `face-engine:test:${capabilityKey}`,
        ],
      }),
    ),
    semanticClaims: [],
    approvedNarrativeBlocks: [],
    unavailableSections: [],
    prohibitedInferences: [...plan.prohibitedInferenceKeys],
    provenanceRefs: ['face-engine:test:result'],
  };
}

function projection(
  topicKey = 'face.discover.structure',
): FaceProductProjectionV1 {
  const plan = authorized(topicKey);
  const admitted = admitFaceTopicExecutionResult(
    plan,
    resultReceipt(plan),
  );
  return buildFaceProductProjection(plan, admitted);
}

function displayValue(
  capabilityKey: string,
  delta = 0,
): FaceDisplayValueV1 {
  switch (capabilityKey) {
    case 'eye.width_height_ratio':
      return {
        kind: 'scalar',
        value: 0.42 + delta,
        unit: 'ratio',
      };
    case 'mouth.width_and_relative_size':
      return {
        kind: 'continuous_axes',
        axes: [
          {
            axisKey: 'bounding_box_aspect_ratio',
            value: 2.1 + delta,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
          },
          {
            axisKey:
              'horizontal_span_to_full_mesh_horizontal_span_ratio',
            value: 0.31 + delta,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
          },
        ],
      };
    case 'chin_lower_face.visible_width_ratio':
      return {
        kind: 'scalar',
        value: 0.68 + delta,
        unit: 'ratio',
      };
    case 'nose.alar_width_and_nostril_geometry':
      return {
        kind: 'composite_visible_nasal_geometry',
        axes: [
          {
            axisKey: 'alar_width_to_tip_width_ratio',
            value: 1.6 + delta,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.visible_alar_width_to_tip_width_ratio@0.1.0',
          },
          {
            axisKey: 'nostril_mean_aspect_ratio',
            value: 1.8 + delta,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.visible_nostril_mean_aspect_ratio@0.1.0',
          },
          {
            axisKey: 'nostril_area_asymmetry_ratio',
            value: 0.07 + delta,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.nose.visible_nostril_area_asymmetry_ratio@0.1.0',
          },
        ],
      };
    default:
      throw new Error(
        `no test display value for ${capabilityKey}`,
      );
  }
}

function displayReceipt(
  source: FaceProductProjectionV1,
  delta = 0,
): FaceDisplayFactReceiptV1 {
  return {
    schemaVersion: 'face-display-fact-receipt-v1',
    sourceResultHash: source.sourceResultHash,
    authorityRef:
      'face-engine:governed-product-display-facts:test',
    facts: source.grounding.observationUnits.map(
      (unit, index) => ({
        factRef: `face-display-fact:test:${index + 1}`,
        observationRef: unit.observationRef,
        capabilityKey: unit.capabilityKey,
        value: displayValue(unit.capabilityKey, delta),
        qualifiers: ['canonical_neutral_value'],
        provenanceRefs: [
          `face-engine:test:display:${unit.capabilityKey}`,
        ],
        traditionalBindingApplied: false as const,
        classificationApplied: false as const,
        thresholdApplied: false as const,
      }),
    ),
    provenanceRefs: ['face-engine:test:display-receipt'],
  };
}

describe('TOPIC-FACE-004 Reader delivery', () => {
  it('materializes an AVAILABLE neutral Reader delivery for the four structure facts', () => {
    const source = projection();
    const facts = admitFaceDisplayFacts(
      source,
      displayReceipt(source),
    );
    const reader = buildFaceReaderDelivery(source, facts);

    expect(reader.readinessState).toBe('available');
    expect(reader.sections.map((section) => section.sectionKey))
      .toEqual(['eye', 'nose', 'mouth', 'chin_lower_face']);
    expect(
      reader.sections.flatMap((section) => section.items),
    ).toHaveLength(4);
    expect(
      reader.sections.flatMap((section) => section.items)
        .every((item) => item.sourceUnitRef.startsWith(
          'face-grounding-unit:',
        )),
    ).toBe(true);
  });

  it('keeps the extended forehead section explicitly unavailable', () => {
    const source = projection('face.discover.extended');
    const facts = admitFaceDisplayFacts(
      source,
      displayReceipt(source),
    );
    const reader = buildFaceReaderDelivery(source, facts);
    const forehead = reader.sections.find(
      (section) => section.sectionKey === 'forehead',
    );

    expect(reader.readinessState).toBe('partial');
    expect(reader.unavailableSections).toContain(
      'observation:forehead.visible_width_shape',
    );
    expect(forehead).toEqual({
      sectionKey: 'forehead',
      titleKey: 'face.reader.section.forehead',
      status: 'unavailable',
      items: [],
    });
  });

  it('rejects a display fact not present in protected grounding', () => {
    const source = projection();
    const receipt = displayReceipt(source);
    expect(() =>
      admitFaceDisplayFacts(source, {
        ...receipt,
        facts: [
          ...receipt.facts,
          {
            ...receipt.facts[0]!,
            factRef: 'face-display-fact:test:out-of-scope',
            observationRef:
              'face-observation:topic-face-004:outside',
          },
        ],
      }),
    ).toThrow(
      /FACE_DISPLAY_FACT_OBSERVATION_OUT_OF_SCOPE/u,
    );
  });

  it('rejects capability mismatch against the bound observation ref', () => {
    const source = projection();
    const receipt = displayReceipt(source);
    expect(() =>
      admitFaceDisplayFacts(source, {
        ...receipt,
        facts: receipt.facts.map((fact, index) =>
          index === 0
            ? {
                ...fact,
                capabilityKey: 'mouth.corner_orientation',
              }
            : fact,
        ),
      }),
    ).toThrow(/FACE_DISPLAY_FACT_CAPABILITY_MISMATCH/u);
  });

  it('rejects an attempt to force the unavailable forehead fact into a PARTIAL Topic', () => {
    const source = projection('face.discover.extended');
    const receipt = displayReceipt(source);
    expect(() =>
      admitFaceDisplayFacts(source, {
        ...receipt,
        facts: [
          ...receipt.facts,
          {
            factRef: 'face-display-fact:test:forehead-forged',
            observationRef:
              'face-observation:topic-face-004:forehead-forged',
            capabilityKey: 'forehead.visible_width_shape',
            value: {
              kind: 'continuous_axes',
              axes: [
                {
                  axisKey: 'invented_width',
                  value: 1,
                  unit: 'ratio',
                  sourceMetricRef: 'invented',
                },
              ],
            },
            qualifiers: [],
            provenanceRefs: [],
            traditionalBindingApplied: false,
            classificationApplied: false,
            thresholdApplied: false,
          },
        ],
      }),
    ).toThrow(
      /FACE_DISPLAY_FACT_OBSERVATION_OUT_OF_SCOPE/u,
    );
  });

  it('rejects privacy, Character, Commerce and presentation metadata at the display boundary', () => {
    const source = projection();
    const receipt = displayReceipt(source);

    expect(() =>
      admitFaceDisplayFacts(
        source,
        {
          ...receipt,
          rawLandmarks: [{ x: 1, y: 2 }],
        } as unknown as FaceDisplayFactReceiptV1,
      ),
    ).toThrow(
      'FACE_DISPLAY_FACT_FORBIDDEN_FIELD:rawLandmarks',
    );

    expect(() =>
      admitFaceDisplayFacts(
        source,
        {
          ...receipt,
          characterId: 'character:seyeon',
        } as unknown as FaceDisplayFactReceiptV1,
      ),
    ).toThrow(
      'FACE_DISPLAY_FACT_FORBIDDEN_FIELD:characterId',
    );

    expect(() =>
      admitFaceDisplayFacts(
        source,
        {
          ...receipt,
          price: 4900,
        } as unknown as FaceDisplayFactReceiptV1,
      ),
    ).toThrow('FACE_DISPLAY_FACT_FORBIDDEN_FIELD:price');

    expect(() =>
      admitFaceDisplayFacts(
        source,
        {
          ...receipt,
          theme: 'dark',
        } as unknown as FaceDisplayFactReceiptV1,
      ),
    ).toThrow(
      'FACE_DISPLAY_FACT_RECEIPT_SCOPE_VIOLATION:theme',
    );
  });

  it('rejects classification or threshold authority widening', () => {
    const source = projection();
    const receipt = displayReceipt(source);
    expect(() =>
      admitFaceDisplayFacts(source, {
        ...receipt,
        facts: receipt.facts.map((fact, index) =>
          index === 0
            ? {
                ...fact,
                classificationApplied: true,
              } as unknown as typeof fact
            : fact,
        ),
      }),
    ).toThrow('FACE_DISPLAY_FACT_AUTHORITY_WIDENED');
  });

  it('rejects a Reader value kind that does not match the frozen capability slot', () => {
    const source = projection();
    const receipt = displayReceipt(source);
    const admitted = admitFaceDisplayFacts(source, {
      ...receipt,
      facts: receipt.facts.map((fact) =>
        fact.capabilityKey === 'eye.width_height_ratio'
          ? {
              ...fact,
              value: {
                kind: 'continuous_axes',
                axes: [
                  {
                    axisKey: 'forged',
                    value: 1,
                    unit: 'ratio',
                    sourceMetricRef: 'forged',
                  },
                ],
              },
            }
          : fact,
      ),
    });

    expect(() =>
      buildFaceReaderDelivery(source, admitted),
    ).toThrow(
      /FACE_READER_DISPLAY_VALUE_KIND_MISMATCH/u,
    );
  });

  it('keeps display and Reader identity deterministic across source ordering', () => {
    const source = projection();
    const receipt = displayReceipt(source);
    const first = admitFaceDisplayFacts(source, receipt);
    const second = admitFaceDisplayFacts(source, {
      ...receipt,
      facts: [...receipt.facts].reverse(),
      provenanceRefs: [...receipt.provenanceRefs].reverse(),
    });

    const firstReader = buildFaceReaderDelivery(source, first);
    const secondReader = buildFaceReaderDelivery(source, second);

    expect(first.displayFactsHash).toBe(second.displayFactsHash);
    expect(firstReader.readerDeliveryHash).toBe(
      secondReader.readerDeliveryHash,
    );
  });

  it('changes display and Reader identity when an admitted canonical value changes', () => {
    const source = projection();
    const baseline = admitFaceDisplayFacts(
      source,
      displayReceipt(source),
    );
    const changed = admitFaceDisplayFacts(
      source,
      displayReceipt(source, 0.01),
    );

    const baselineReader =
      buildFaceReaderDelivery(source, baseline);
    const changedReader =
      buildFaceReaderDelivery(source, changed);

    expect(changed.displayFactsHash).not.toBe(
      baseline.displayFactsHash,
    );
    expect(changedReader.readerDeliveryHash).not.toBe(
      baselineReader.readerDeliveryHash,
    );
  });

  it('maps readiness to user-facing availability without exposing internal blocker detail', () => {
    expect(
      mapFaceTopicReadinessToUiAvailability(
        'available',
        'internal',
      ),
    ).toBe('available');
    expect(
      mapFaceTopicReadinessToUiAvailability(
        'partial',
        'internal',
      ),
    ).toBe('partial');
    expect(
      mapFaceTopicReadinessToUiAvailability(
        'blocked',
        'coming_soon',
      ),
    ).toBe('coming_soon');

    expect(FACE_NEUTRAL_ANALYSIS_PROGRESS_KEYS).toEqual([
      'face.analysis.progress.photo_check',
      'face.analysis.progress.face_region_check',
      'face.analysis.progress.feature_measurement',
      'face.analysis.progress.structure_assembly',
      'face.analysis.progress.result_assembly',
    ]);
  });

  it('keeps Three-Divisions unable to reach Reader delivery while its execution is blocked', () => {
    const blocked = planFaceTopicExecution(
      {
        topicKey: 'face.reading.three_divisions',
        observationArtifactRef:
          'face-observation-artifact:topic-face-004:blocked',
        requestId: 'request:topic-face-004:blocked',
      },
      snapshot,
    );

    expect(blocked.authorized).toBe(false);
    if (blocked.authorized) {
      throw new Error('unexpected authorized traditional plan');
    }
    expect(blocked.readiness.state).toBe('blocked');
    expect(
      mapFaceTopicReadinessToUiAvailability(
        blocked.readiness.state,
        'coming_soon',
      ),
    ).toBe('coming_soon');
  });
});
