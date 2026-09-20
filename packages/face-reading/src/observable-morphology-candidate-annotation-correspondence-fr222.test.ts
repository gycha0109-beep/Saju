import { describe, expect, it } from 'vitest';
import type { FR210EyeNeutralAxisBundle } from './eye-neutral-axis-bundle-fr210.js';
import { admitEyePairProspectiveCaptureManifestFR159 } from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  admitHumanAnnotationFR219,
  buildAnnotationEvidenceReceiptFR219,
  materializeBlindedReviewSessionFR219,
  type FR219ReviewSession,
} from './observable-morphology-human-review-fr219.js';
import {
  verifyPersistedAnnotationEvidenceFR220,
  type FR220VerifiedPersistedAnnotationEvidence,
} from './observable-morphology-persisted-annotation-intake-fr220.js';
import {
  materializeCandidateProvenanceEvidenceFR221,
  verifyPersistedCandidateProvenanceEvidenceFR221,
} from './observable-morphology-persisted-candidate-provenance-fr221.js';
import {
  assertVerifiedCandidateAnnotationCorrespondenceFR222,
  assembleVerifiedCandidateAnnotationCorrespondenceFR222,
} from './observable-morphology-candidate-annotation-correspondence-fr222.js';
import {
  admitEyeCornerOrientationCandidateFR218,
  issueCaptureAdmissionFromFR159FR218,
  type FR218BlindedReviewItem,
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
    sourceMetricRef: `neutral.fr222.test.${axisKey}@0.1.0`,
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
      fr77ProviderRunRef: `provider-run:fr222:${ref}`,
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
  ref: string,
  metricValue: number,
  partition: 'selection' | 'holdout',
): FR218MetricCandidateRecord {
  const manifest = admitEyePairProspectiveCaptureManifestFR159({
    prospectiveCollectionRef: 'fr222:test:collection',
    captureSeriesRef: `fr222:test:series:${ref}`,
    captureRef: `fr222:test:capture:${ref}`,
    captureConditionRef: 'fr222:test:condition:mechanics-only',
    captureSequenceIndex: 1,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
  const admitted = admitEyeCornerOrientationCandidateFR218(bundle(metricValue, ref), {
    sampleRef: `sample:${ref}`,
    participantKey: `participant:${ref}`,
    captureFamilyKey: `family:${ref}`,
    partition,
    reviewItemRef: `review-item:${ref}`,
    reviewArtifactRef: `review-artifact:${ref}`,
    captureAdmission: issueCaptureAdmissionFromFR159FR218(manifest),
    confounderTags: ['fr222_mechanics_only'],
  });
  if (admitted.status !== 'available') throw new Error('FR222 test candidate unexpectedly unavailable.');
  return admitted.candidate;
}

function reviewItem(ref: string): FR218BlindedReviewItem {
  return {
    reviewItemRef: `review-item:${ref}`,
    reviewArtifactRef: `review-artifact:${ref}`,
    constructRef: 'observable.eye_pair.outer_corner_orientation@0.1.0',
    reviewerPrompt: '이 사람의 눈꼬리는 전체적으로 어떻게 보이나요?',
    labelOptions: [
      { key: 'clearly_downturned', reviewerMeaning: '눈꼬리가 확실히 내려가 보임' },
      { key: 'slightly_downturned', reviewerMeaning: '눈꼬리가 약간 내려가 보임' },
      { key: 'approximately_horizontal', reviewerMeaning: '눈꼬리가 거의 수평으로 보임' },
      { key: 'slightly_upturned', reviewerMeaning: '눈꼬리가 약간 올라가 보임' },
      { key: 'clearly_upturned', reviewerMeaning: '눈꼬리가 확실히 올라가 보임' },
      { key: 'not_assessable', reviewerMeaning: '이 이미지에서는 판단하기 어려움' },
    ],
    metricValuesExposed: false,
    candidateMetricIdentityExposed: false,
    providerIdentityExposed: false,
    extractorIdentityExposed: false,
    coverageBinExposed: false,
    candidateThresholdExposed: false,
    traditionalMeaningExposed: false,
    fortuneOutputExposed: false,
    peerLabelsExposed: false,
  };
}

function session(reviewerKey: string, items: readonly FR218BlindedReviewItem[]): FR219ReviewSession {
  return materializeBlindedReviewSessionFR219({
    sessionRef: `session:${reviewerKey}`,
    reviewerKey,
    reviewerHumanAttested: true,
    reviewerIndependenceAttested: true,
    items: items.map((item, index) => ({
      reviewItem: item,
      assetPath: `/private/fr222/${reviewerKey}/${index}.png`,
      assetDigest: `sha256:${String(index + 1).repeat(64).slice(0, 64)}`,
      mediaType: 'image/png',
      embeddedMetadataSanitizedAttested: true,
    })),
  });
}

function persisted<T>(value: T): unknown {
  return JSON.parse(JSON.stringify(value));
}

function candidateEvidence() {
  const materialized = materializeCandidateProvenanceEvidenceFR221([
    candidate('selection', -3.5, 'selection'),
    candidate('holdout', 4.25, 'holdout'),
  ]);
  return verifyPersistedCandidateProvenanceEvidenceFR221(persisted(materialized));
}

function annotationEvidence(
  refs: readonly string[] = ['selection', 'holdout'],
): FR220VerifiedPersistedAnnotationEvidence {
  const items = refs.map(reviewItem);
  const first = session('reviewer:fr222:1', items);
  const second = session('reviewer:fr222:2', items);
  const annotations = items.flatMap((item, index) => [
    admitHumanAnnotationFR219(first, {
      reviewItemRef: item.reviewItemRef,
      label: index === 0 ? 'slightly_downturned' : 'slightly_upturned',
      recordedAt: `2026-09-21T00:0${index}:00.000Z`,
    }),
    admitHumanAnnotationFR219(second, {
      reviewItemRef: item.reviewItemRef,
      label: 'approximately_horizontal',
      recordedAt: `2026-09-21T00:1${index}:00.000Z`,
    }),
  ]);
  const receipt = buildAnnotationEvidenceReceiptFR219([first, second], annotations);
  return verifyPersistedAnnotationEvidenceFR220({
    annotationRecords: persisted(annotations) as readonly unknown[],
    evidenceReceipt: persisted(receipt),
  });
}

describe('FR222 verified candidate/annotation correspondence', () => {
  it('joins verified FR220 distributions to exact FR221 candidates without consensus or calibration authority', () => {
    const result = assembleVerifiedCandidateAnnotationCorrespondenceFR222({
      annotationEvidence: annotationEvidence(),
      candidateEvidence: candidateEvidence(),
    });

    expect(result.reviewedItemCount).toBe(2);
    expect(result.annotationCount).toBe(4);
    expect(result.selectionReviewedItemCount).toBe(1);
    expect(result.holdoutReviewedItemCount).toBe(1);
    expect(result.correspondenceRecords.map((record) => [
      record.reviewItemRef,
      record.partition,
      record.metricValue,
    ])).toEqual([
      ['review-item:holdout', 'holdout', 4.25],
      ['review-item:selection', 'selection', -3.5],
    ]);
    expect(result.correspondenceRecords.every((record) =>
      record.rawReviewerDisagreementPreserved
      && !record.consensusCollapsed
      && !record.consensusLabelIssued
      && !record.metricValueWasExposedDuringReview
      && !record.partitionWasExposedDuringReview
      && !record.holdoutMayBeUsedForRuleSelection)).toBe(true);
    expect(result.authorityBoundary.descriptiveCorrespondenceMeansEmpiricalSufficiency).toBe(false);
    expect(result.authorityBoundary.repeatCaptureStabilityEstablished).toBe(false);
    expect(result.authorityBoundary.transitionZoneIssued).toBe(false);
    expect(result.authorityBoundary.thresholdIssued).toBe(false);
    expect(result.authorityBoundary.classifierIssued).toBe(false);
    expect(result.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(() => assertVerifiedCandidateAnnotationCorrespondenceFR222(result)).not.toThrow();
  });

  it('preserves raw label-count disagreement rather than selecting a winner', () => {
    const result = assembleVerifiedCandidateAnnotationCorrespondenceFR222({
      annotationEvidence: annotationEvidence(['selection']),
      candidateEvidence: candidateEvidence(),
    });
    const record = result.correspondenceRecords[0]!;
    expect(record.countsByLabel.slightly_downturned).toBe(1);
    expect(record.countsByLabel.approximately_horizontal).toBe(1);
    expect(record.consensusCollapsed).toBe(false);
    expect(record.consensusLabelIssued).toBe(false);
  });

  it('rejects an annotation item with no verified candidate provenance', () => {
    expect(() => assembleVerifiedCandidateAnnotationCorrespondenceFR222({
      annotationEvidence: annotationEvidence(['orphan']),
      candidateEvidence: candidateEvidence(),
    })).toThrow(/orphan annotation reviewItemRef/u);
  });

  it('requires active-runtime FR220 verification rather than a JSON-shaped clone', () => {
    const annotations = annotationEvidence();
    const cloned = persisted(annotations) as FR220VerifiedPersistedAnnotationEvidence;
    expect(() => assembleVerifiedCandidateAnnotationCorrespondenceFR222({
      annotationEvidence: cloned,
      candidateEvidence: candidateEvidence(),
    })).toThrow(/not verified by active FR220 runtime/u);
  });

  it('does not turn self-attested human/independence state into independent verification', () => {
    const result = assembleVerifiedCandidateAnnotationCorrespondenceFR222({
      annotationEvidence: annotationEvidence(['selection']),
      candidateEvidence: candidateEvidence(),
    });
    expect(result.evidenceState.declaredHumanAnnotationEvidencePresent).toBe(true);
    expect(result.evidenceState.allReviewersHumanAttested).toBe(true);
    expect(result.evidenceState.allReviewersIndependentAttested).toBe(true);
    expect(result.authorityBoundary.reviewerHumanStatusIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.reviewerIndependenceIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.captureFreshnessIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.sameParticipantIdentityIndependentlyVerified).toBe(false);
  });
});
