import { describe, expect, it } from 'vitest';
import type { FR210EyeNeutralAxisBundle } from './eye-neutral-axis-bundle-fr210.js';
import { admitEyePairProspectiveCaptureManifestFR159 } from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  materializeCandidateProvenanceEvidenceFR221,
  verifyPersistedCandidateProvenanceEvidenceFR221,
} from './observable-morphology-persisted-candidate-provenance-fr221.js';
import {
  admitEyeCornerOrientationCandidateFR218,
  issueCaptureAdmissionFromFR159FR218,
  type FR218MetricCandidateRecord,
} from './observable-morphology-validation-fr218.js';
import {
  assembleDeclaredRepeatCaptureFamilyDescriptivesFR223,
  assertDeclaredRepeatCaptureFamilyDescriptivesFR223,
} from './observable-morphology-repeat-capture-family-fr223.js';

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
    sourceMetricRef: `neutral.fr223.test.${axisKey}@0.1.0`,
    semanticScope: 'closed_cycle_geometry_only' as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    anatomicalInterpretationAllowed: false as const,
  };
}

function bundle(tilt: number, ref: string): FR210EyeNeutralAxisBundle {
  return {
    schemaVersion: 'fr210-eye-neutral-axis-bundle-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
    authorityState: 'reused_neutral_eye_geometry_axes_research_only',
    source: {
      fr77ProviderRunRef: `provider-run:fr223:${ref}`,
      fr77CanonicalAssetDigest: `sha256:${'b'.repeat(64)}`,
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

function candidate(input: {
  ref: string;
  metricValue: number;
  partition: 'selection' | 'holdout';
  participantKey: string;
  familyKey: string;
  captureRef?: string;
}): FR218MetricCandidateRecord {
  const captureRef = input.captureRef ?? `capture:${input.ref}`;
  const manifest = admitEyePairProspectiveCaptureManifestFR159({
    prospectiveCollectionRef: 'fr223:test:collection',
    captureSeriesRef: `series:${input.familyKey}`,
    captureRef,
    captureConditionRef: 'fr223:test:condition:mechanics-only',
    captureSequenceIndex: Number(input.ref.replace(/\D/gu, '')) || 1,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
  const admitted = admitEyeCornerOrientationCandidateFR218(bundle(input.metricValue, input.ref), {
    sampleRef: `sample:${input.ref}`,
    participantKey: input.participantKey,
    captureFamilyKey: input.familyKey,
    partition: input.partition,
    reviewItemRef: `review-item:${input.ref}`,
    reviewArtifactRef: `review-artifact:${input.ref}`,
    captureAdmission: issueCaptureAdmissionFromFR159FR218(manifest),
    confounderTags: ['fr223_mechanics_only'],
  });
  if (admitted.status !== 'available') throw new Error('FR223 test candidate unavailable.');
  return admitted.candidate;
}

function persisted<T>(value: T): unknown {
  return JSON.parse(JSON.stringify(value));
}

function verified(records: readonly FR218MetricCandidateRecord[]) {
  return verifyPersistedCandidateProvenanceEvidenceFR221(
    persisted(materializeCandidateProvenanceEvidenceFR221(records)),
  );
}

function twoRepeatFamilies() {
  return verified([
    candidate({
      ref: 'selection1',
      metricValue: -4,
      partition: 'selection',
      participantKey: 'participant:selection',
      familyKey: 'family:selection',
    }),
    candidate({
      ref: 'selection2',
      metricValue: -2,
      partition: 'selection',
      participantKey: 'participant:selection',
      familyKey: 'family:selection',
    }),
    candidate({
      ref: 'holdout1',
      metricValue: 3,
      partition: 'holdout',
      participantKey: 'participant:holdout',
      familyKey: 'family:holdout',
    }),
    candidate({
      ref: 'holdout2',
      metricValue: 6,
      partition: 'holdout',
      participantKey: 'participant:holdout',
      familyKey: 'family:holdout',
    }),
  ]);
}

describe('FR223 declared repeat-capture family descriptives', () => {
  it('summarizes within-family metric variation without repeatability adjudication', () => {
    const result = assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(twoRepeatFamilies());

    expect(result.repeatFamilyCount).toBe(2);
    expect(result.singletonFamilyCount).toBe(0);
    expect(result.selectionRepeatFamilyCount).toBe(1);
    expect(result.holdoutRepeatFamilyCount).toBe(1);

    const selection = result.repeatFamilies.find(
      (family) => family.captureFamilyKey === 'family:selection',
    )!;
    expect(selection.candidateCount).toBe(2);
    expect(selection.distinctCaptureAdmissionRefCount).toBe(2);
    expect(selection.min).toBe(-4);
    expect(selection.max).toBe(-2);
    expect(selection.mean).toBe(-3);
    expect(selection.range).toBe(2);
    expect(selection.evaluationState).toBe('descriptive_only_no_repeatability_adjudication');
    expect(selection.repeatabilityPassFailIssued).toBe(false);
    expect(selection.numericRepeatabilityAcceptanceThreshold).toBeNull();

    expect(result.authorityBoundary.captureFamilyKeyMeansIdentityProof).toBe(false);
    expect(result.authorityBoundary.distinctCaptureAdmissionRefsMeanDistinctFreshCaptureEvents).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.authorityBoundary.repeatCaptureStabilityEstablished).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.thresholdIssued).toBe(false);
    expect(result.authorityBoundary.classifierIssued).toBe(false);
    expect(() => assertDeclaredRepeatCaptureFamilyDescriptivesFR223(result)).not.toThrow();
  });

  it('reports singleton families separately and never promotes them into repeat summaries', () => {
    const evidence = verified([
      candidate({
        ref: 'selection1',
        metricValue: -4,
        partition: 'selection',
        participantKey: 'participant:selection',
        familyKey: 'family:selection',
      }),
      candidate({
        ref: 'selection2',
        metricValue: -2,
        partition: 'selection',
        participantKey: 'participant:selection',
        familyKey: 'family:selection',
      }),
      candidate({
        ref: 'holdout-single',
        metricValue: 5,
        partition: 'holdout',
        participantKey: 'participant:holdout',
        familyKey: 'family:holdout-single',
      }),
    ]);
    const result = assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(evidence);
    expect(result.repeatFamilyCount).toBe(1);
    expect(result.singletonFamilyCount).toBe(1);
    expect(result.repeatFamilies.map((family) => family.captureFamilyKey))
      .toEqual(['family:selection']);
  });

  it('rejects evidence with no declared family containing at least two candidates', () => {
    const evidence = verified([
      candidate({
        ref: 'selection-single',
        metricValue: -1,
        partition: 'selection',
        participantKey: 'participant:selection',
        familyKey: 'family:selection-single',
      }),
      candidate({
        ref: 'holdout-single',
        metricValue: 1,
        partition: 'holdout',
        participantKey: 'participant:holdout',
        familyKey: 'family:holdout-single',
      }),
    ]);
    expect(() => assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(evidence))
      .toThrow(/no declared capture family with at least two candidates/u);
  });

  it('rejects duplicate capture-admission refs inside a declared repeat family', () => {
    const evidence = verified([
      candidate({
        ref: 'selection1',
        metricValue: -2,
        partition: 'selection',
        participantKey: 'participant:selection',
        familyKey: 'family:selection',
        captureRef: 'capture:duplicate',
      }),
      candidate({
        ref: 'selection2',
        metricValue: -1,
        partition: 'selection',
        participantKey: 'participant:selection',
        familyKey: 'family:selection',
        captureRef: 'capture:duplicate',
      }),
      candidate({
        ref: 'holdout-single',
        metricValue: 2,
        partition: 'holdout',
        participantKey: 'participant:holdout',
        familyKey: 'family:holdout',
      }),
    ]);
    expect(() => assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(evidence))
      .toThrow(/duplicate capture admission within declared repeat family/u);
  });

  it('requires active-runtime FR221 verification rather than a JSON-shaped clone', () => {
    const clone = persisted(twoRepeatFamilies()) as ReturnType<typeof twoRepeatFamilies>;
    expect(() => assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(clone))
      .toThrow(/not verified by the active FR221 runtime/u);
  });
});
