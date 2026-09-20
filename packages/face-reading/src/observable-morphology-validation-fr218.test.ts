import { describe, expect, it } from 'vitest';
import type { FR210EyeNeutralAxisBundle } from './eye-neutral-axis-bundle-fr210.js';
import {
  FACE_OBSERVABLE_MORPHOLOGY_CONSTRUCT_FR218,
  FR218_HUMAN_EVIDENCE_GATE,
  admitEyeCornerOrientationCandidateFR218,
  assessHumanEvidenceReadinessFR218,
  projectBlindedReviewItemsFR218,
  selectMetricSpaceCoverageCandidatesFR218,
  summarizeOrdinalAnnotationsFR218,
  validateFR218CandidatePool,
  type FR218MetricCandidateRecord,
} from './observable-morphology-validation-fr218.js';

function axis(
  axisKey: 'relative_horizontal_span'
    | 'geometric_vertical_to_horizontal_ratio'
    | 'centroid_separation'
    | 'closed_cycle_turning_angle',
  value: number,
) {
  return {
    axisKey,
    value,
    unit: 'ratio' as const,
    sourceMetricRef: `neutral.test.${axisKey}@0.1.0`,
    semanticScope: 'closed_cycle_geometry_only' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  };
}

function bundle(tilt: number): FR210EyeNeutralAxisBundle {
  return {
    schemaVersion: 'fr210-eye-neutral-axis-bundle-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
    authorityState: 'reused_neutral_eye_geometry_axes_research_only',
    source: {
      fr77ProviderRunRef: 'provider-run:test',
      fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      fr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1',
      fr178SchemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1',
      fr209DerivationAttempted: true,
      fr207MayProceedWithoutNewAnatomicalResearch: true,
    },
    axes: {
      relativeHorizontalSpan: axis('relative_horizontal_span', 0.2),
      geometricVerticalToHorizontalRatio: axis('geometric_vertical_to_horizontal_ratio', 0.3),
      centroidSeparation: axis('centroid_separation', 0.4),
      closedCycleTurningAngle: axis('closed_cycle_turning_angle', 0.5),
      outerCornerTilt: {
        axisKey: 'outer_corner_tilt',
        value: tilt,
        unit: 'degree',
        sourceMetricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        semanticScope: 'bilateral_visible_corner_geometry_only',
        classificationApplied: false,
        thresholdApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
        anatomicalInterpretationAllowed: false,
      },
    },
    unsupportedImageTraits: [
      'eyelid_crease_category',
      'hooded_eyelid_category',
      'ocular_radiance_or_visible_brightness_quality',
    ],
    unresolvedProductSurface: ['product_individual_eye_asymmetry_surface'],
    authorityBoundary: {
      newAnatomicalResearchRequired: false,
      providerIndexToAnatomyBindingIssued: false,
      anatomicalLateralityIssued: false,
      physiologicalEyeApertureIssued: false,
      almondRoundNarrowClassifierIssued: false,
      upturnedDownturnedClassifierIssued: false,
      eyelidCreaseClassifierIssued: false,
      hoodedEyelidClassifierIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function candidate(
  value: number,
  sampleRef: string,
  participantKey = `participant:${sampleRef}`,
  partition: 'selection' | 'holdout' = 'selection',
  captureFamilyKey = `family:${sampleRef}`,
): FR218MetricCandidateRecord {
  const admitted = admitEyeCornerOrientationCandidateFR218(bundle(value), {
    sampleRef,
    participantKey,
    captureFamilyKey,
    partition,
    reviewArtifactRef: `review-artifact:${sampleRef}`,
    captureEligible: true,
    confounderTags: [],
  });
  expect(admitted.status).toBe('available');
  if (admitted.status !== 'available') throw new Error('test candidate unexpectedly unavailable');
  return admitted.candidate;
}

describe('FR218 observable morphology validation layer', () => {
  it('defines a human-observable construct without traditional criterion authority', () => {
    const construct = FACE_OBSERVABLE_MORPHOLOGY_CONSTRUCT_FR218;

    expect(construct.constructRef).toBe('observable.eye_pair.outer_corner_orientation@0.1.0');
    expect(construct.candidateMetricRef).toBe('neutral.eye.outer_corner_tilt.mean_degrees@0.1.0');
    expect(construct.traditionalSourceRefs).toEqual([]);
    expect(construct.methodologyRefs).toEqual([]);
    expect(construct.labels.map((label) => label.key)).toEqual([
      'clearly_downturned',
      'slightly_downturned',
      'approximately_horizontal',
      'slightly_upturned',
      'clearly_upturned',
      'not_assessable',
    ]);
    expect(construct.authorityBoundary).toEqual({
      observableMorphologyLayerOnly: true,
      anatomyClaimIssued: false,
      thresholdIssued: false,
      classifierIssued: false,
      transitionZoneIssued: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('admits the FR210 continuous tilt only as a candidate measurement', () => {
    const admitted = admitEyeCornerOrientationCandidateFR218(bundle(2.25), {
      sampleRef: 'sample:a',
      participantKey: 'participant:a',
      captureFamilyKey: 'family:a',
      partition: 'selection',
      reviewArtifactRef: 'review-artifact:a',
      captureEligible: true,
      confounderTags: ['glasses'],
    });

    expect(admitted.status).toBe('available');
    if (admitted.status !== 'available') return;
    expect(admitted.candidate.metricValue).toBe(2.25);
    expect(admitted.candidate.metricRole).toBe('candidate_measurement_only');
    expect(admitted.candidate.humanLabelObserved).toBe(false);
    expect(admitted.candidate.thresholdApplied).toBe(false);
    expect(admitted.candidate.classifierApplied).toBe(false);
    expect(admitted.candidate.traditionalBindingApplied).toBe(false);
  });

  it('rejects runtime-forged capture eligibility before candidate admission', () => {
    expect(() => admitEyeCornerOrientationCandidateFR218(bundle(1), {
      sampleRef: 'sample:forged',
      participantKey: 'participant:forged',
      captureFamilyKey: 'family:forged',
      partition: 'selection',
      reviewArtifactRef: 'review-artifact:forged',
      captureEligible: false,
      confounderTags: [],
    } as unknown as Parameters<typeof admitEyeCornerOrientationCandidateFR218>[1]))
      .toThrow(/explicit capture eligibility/u);
  });

  it('rejects duplicate review artifacts in the candidate pool', () => {
    const firstAdmission = admitEyeCornerOrientationCandidateFR218(bundle(-1), {
      sampleRef: 'sample:first',
      participantKey: 'participant:first',
      captureFamilyKey: 'family:first',
      partition: 'selection',
      reviewArtifactRef: 'review-artifact:shared',
      captureEligible: true,
      confounderTags: [],
    });
    const secondAdmission = admitEyeCornerOrientationCandidateFR218(bundle(1), {
      sampleRef: 'sample:second',
      participantKey: 'participant:second',
      captureFamilyKey: 'family:second',
      partition: 'selection',
      reviewArtifactRef: 'review-artifact:shared',
      captureEligible: true,
      confounderTags: [],
    });
    if (firstAdmission.status !== 'available' || secondAdmission.status !== 'available') {
      throw new Error('test candidates unexpectedly unavailable');
    }

    expect(() => validateFR218CandidatePool([
      firstAdmission.candidate,
      secondAdmission.candidate,
    ])).toThrow(/duplicate reviewArtifactRef/u);
  });

  it('rejects participant leakage between selection and holdout', () => {
    const records = [
      candidate(-1, 'sample:selection', 'participant:shared', 'selection', 'family:selection'),
      candidate(1, 'sample:holdout', 'participant:shared', 'holdout', 'family:holdout'),
    ];

    expect(() => validateFR218CandidatePool(records))
      .toThrow(/participant leakage across selection\/holdout/u);
  });

  it('samples metric space for coverage without preassigning a near-boundary class', () => {
    const records = [
      candidate(-5, 'sample:a'),
      candidate(-3, 'sample:b'),
      candidate(-1, 'sample:c'),
      candidate(1, 'sample:d'),
      candidate(3, 'sample:e'),
      candidate(5, 'sample:f'),
    ];

    const selected = selectMetricSpaceCoverageCandidatesFR218(records, {
      partition: 'selection',
      binCount: 3,
      targetPerBin: 1,
    });

    expect(selected.selected).toHaveLength(3);
    expect(selected.selected.map((item) => item.coverageBinIndex)).toEqual([0, 1, 2]);
    expect(selected.nearBoundaryPreassigned).toBe(false);
    expect(selected.humanLabelsUsedForSelection).toBe(false);
    expect(selected.thresholdIssued).toBe(false);
    expect(selected.transitionZoneIssued).toBe(false);
    expect(selected.classifierIssued).toBe(false);
  });

  it('projects blinded review items without metric values, bins, thresholds, or traditional meaning', () => {
    const records = [
      candidate(-4, 'sample:a'),
      candidate(-2, 'sample:b'),
      candidate(2, 'sample:c'),
      candidate(4, 'sample:d'),
    ];
    const selected = selectMetricSpaceCoverageCandidatesFR218(records, {
      partition: 'selection',
      binCount: 2,
      targetPerBin: 1,
    });
    const items = projectBlindedReviewItemsFR218(selected, records);

    expect(items).toHaveLength(2);
    for (const item of items) {
      expect('metricValue' in item).toBe(false);
      expect('coverageBinIndex' in item).toBe(false);
      expect(item.metricValuesExposed).toBe(false);
      expect(item.coverageBinExposed).toBe(false);
      expect(item.candidateThresholdExposed).toBe(false);
      expect(item.traditionalMeaningExposed).toBe(false);
      expect(item.fortuneOutputExposed).toBe(false);
      expect(item.peerLabelsExposed).toBe(false);
    }
  });

  it('preserves reviewer disagreement instead of collapsing it into a morphology truth', () => {
    const records = [
      candidate(-2, 'sample:a'),
      candidate(2, 'sample:b'),
    ];
    const selected = selectMetricSpaceCoverageCandidatesFR218(records, {
      partition: 'selection',
      binCount: 2,
      targetPerBin: 1,
    });
    const items = projectBlindedReviewItemsFR218(selected, records);
    const first = items[0]!.reviewItemRef;

    const summaries = summarizeOrdinalAnnotationsFR218(items, [
      { reviewItemRef: first, reviewerKey: 'reviewer:1', label: 'slightly_downturned' },
      { reviewItemRef: first, reviewerKey: 'reviewer:2', label: 'approximately_horizontal' },
      { reviewItemRef: first, reviewerKey: 'reviewer:3', label: 'not_assessable' },
    ]);

    const summary = summaries.find((item) => item.reviewItemRef === first)!;
    expect(summary.annotationCount).toBe(3);
    expect(summary.countsByLabel.slightly_downturned).toBe(1);
    expect(summary.countsByLabel.approximately_horizontal).toBe(1);
    expect(summary.notAssessableCount).toBe(1);
    expect(summary.distinctAssessableOrdinalLabels).toBe(2);
    expect(summary.reviewerDisagreementPreserved).toBe(true);
    expect(summary.consensusCollapsed).toBe(false);
    expect(summary.thresholdIssued).toBe(false);
    expect(summary.transitionZoneIssued).toBe(false);
  });

  it('keeps synthetic fixtures from satisfying the human-evidence gate', () => {
    const blocked = assessHumanEvidenceReadinessFR218({
      repeatCaptureEvidenceRefs: [],
      blindedHumanAnnotationEvidenceRefs: [],
      syntheticFixtureRefs: ['fixture:synthetic-only'],
    });
    expect(blocked.state).toBe(FR218_HUMAN_EVIDENCE_GATE);
    expect(blocked.syntheticEvidenceMaySatisfyHumanGate).toBe(false);
    expect(blocked.thresholdSelectionAuthorized).toBe(false);
    expect(blocked.classifierAuthorized).toBe(false);

    const presentOnly = assessHumanEvidenceReadinessFR218({
      repeatCaptureEvidenceRefs: ['evidence:repeat-capture'],
      blindedHumanAnnotationEvidenceRefs: ['evidence:human-labels'],
      syntheticFixtureRefs: [],
    });
    expect(presentOnly.state).toBe('EVIDENCE_REFERENCES_PRESENT_REQUIRES_NEXT_STAGE_REVIEW');
    expect(presentOnly.transitionZoneAuthorized).toBe(false);
    expect(presentOnly.traditionalBindingAuthorized).toBe(false);
  });
});
