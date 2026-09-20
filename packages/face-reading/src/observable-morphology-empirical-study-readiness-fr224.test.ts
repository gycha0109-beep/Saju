import { describe, expect, it } from 'vitest';
import type { FR210EyeNeutralAxisBundle } from './eye-neutral-axis-bundle-fr210.js';
import { admitEyePairProspectiveCaptureManifestFR159 } from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  admitHumanAnnotationFR219,
  buildAnnotationEvidenceReceiptFR219,
  materializeBlindedReviewSessionFR219,
} from './observable-morphology-human-review-fr219.js';
import {
  verifyPersistedAnnotationEvidenceFR220,
} from './observable-morphology-persisted-annotation-intake-fr220.js';
import {
  materializeCandidateProvenanceEvidenceFR221,
  verifyPersistedCandidateProvenanceEvidenceFR221,
} from './observable-morphology-persisted-candidate-provenance-fr221.js';
import {
  assembleVerifiedCandidateAnnotationCorrespondenceFR222,
} from './observable-morphology-candidate-annotation-correspondence-fr222.js';
import {
  assembleDeclaredRepeatCaptureFamilyDescriptivesFR223,
} from './observable-morphology-repeat-capture-family-fr223.js';
import {
  assembleEmpiricalStudyReadinessGateFR224,
  assertEmpiricalStudyReadinessGateFR224,
} from './observable-morphology-empirical-study-readiness-fr224.js';
import {
  admitEyeCornerOrientationCandidateFR218,
  issueCaptureAdmissionFromFR159FR218,
  type FR218BlindedReviewItem,
  type FR218MetricCandidateRecord,
} from './observable-morphology-validation-fr218.js';

function neutralAxis(
  axisKey: 'relative_horizontal_span'
    | 'geometric_vertical_to_horizontal_ratio'
    | 'centroid_separation'
    | 'closed_cycle_turning_angle',
) {
  return {
    axisKey,
    value: 0.25,
    unit: 'ratio' as const,
    sourceMetricRef: `neutral.fr224.test.${axisKey}@0.1.0`,
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
      fr77ProviderRunRef: `provider-run:fr224:${ref}`,
      fr77CanonicalAssetDigest: `sha256:${'c'.repeat(64)}`,
      fr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1',
      fr178SchemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1',
      fr209DerivationAttempted: true,
      fr207MayProceedWithoutNewAnatomicalResearch: true,
    },
    axes: {
      relativeHorizontalSpan: neutralAxis('relative_horizontal_span'),
      geometricVerticalToHorizontalRatio: neutralAxis('geometric_vertical_to_horizontal_ratio'),
      centroidSeparation: neutralAxis('centroid_separation'),
      closedCycleTurningAngle: neutralAxis('closed_cycle_turning_angle'),
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
  prefix: string;
  ref: string;
  metricValue: number;
  partition: 'selection' | 'holdout';
  participantKey: string;
  familyKey: string;
  sequence: number;
}): FR218MetricCandidateRecord {
  const manifest = admitEyePairProspectiveCaptureManifestFR159({
    prospectiveCollectionRef: `fr224:test:collection:${input.prefix}`,
    captureSeriesRef: `series:${input.familyKey}`,
    captureRef: `capture:${input.prefix}:${input.ref}`,
    captureConditionRef: 'fr224:test:condition:mechanics-only',
    captureSequenceIndex: input.sequence,
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    usedForCandidateSelection: false,
    developmentCaptureReuse: false,
    identityMatchingPerformed: false,
  });
  const admitted = admitEyeCornerOrientationCandidateFR218(
    bundle(input.metricValue, `${input.prefix}:${input.ref}`),
    {
      sampleRef: `sample:${input.prefix}:${input.ref}`,
      participantKey: input.participantKey,
      captureFamilyKey: input.familyKey,
      partition: input.partition,
      reviewItemRef: `review-item:${input.prefix}:${input.ref}`,
      reviewArtifactRef: `review-artifact:${input.prefix}:${input.ref}`,
      captureAdmission: issueCaptureAdmissionFromFR159FR218(manifest),
      confounderTags: ['fr224_mechanics_only'],
    },
  );
  if (admitted.status !== 'available') throw new Error('FR224 test candidate unavailable.');
  return admitted.candidate;
}

function persisted<T>(value: T): unknown {
  return JSON.parse(JSON.stringify(value));
}

function candidateEvidence(prefix: string) {
  const records = [
    candidate({
      prefix, ref: 's1', metricValue: -4, partition: 'selection',
      participantKey: `participant:${prefix}:selection`,
      familyKey: `family:${prefix}:selection`, sequence: 1,
    }),
    candidate({
      prefix, ref: 's2', metricValue: -2, partition: 'selection',
      participantKey: `participant:${prefix}:selection`,
      familyKey: `family:${prefix}:selection`, sequence: 2,
    }),
    candidate({
      prefix, ref: 'h1', metricValue: 2, partition: 'holdout',
      participantKey: `participant:${prefix}:holdout`,
      familyKey: `family:${prefix}:holdout`, sequence: 1,
    }),
    candidate({
      prefix, ref: 'h2', metricValue: 5, partition: 'holdout',
      participantKey: `participant:${prefix}:holdout`,
      familyKey: `family:${prefix}:holdout`, sequence: 2,
    }),
  ];
  const materialized = materializeCandidateProvenanceEvidenceFR221(records);
  return verifyPersistedCandidateProvenanceEvidenceFR221(persisted(materialized));
}

function reviewItem(record: FR218MetricCandidateRecord): FR218BlindedReviewItem {
  return {
    reviewItemRef: record.reviewItemRef,
    reviewArtifactRef: record.reviewArtifactRef,
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

function correspondence(prefix: string, candidates = candidateEvidence(prefix)) {
  const items = candidates.records.map((record) => reviewItem(record as FR218MetricCandidateRecord));
  const session = materializeBlindedReviewSessionFR219({
    sessionRef: `session:fr224:${prefix}`,
    reviewerKey: `reviewer:fr224:${prefix}`,
    reviewerHumanAttested: true,
    reviewerIndependenceAttested: true,
    items: items.map((item, index) => ({
      reviewItem: item,
      assetPath: `/private/fr224/${prefix}/${index}.png`,
      assetDigest: `sha256:${String(index + 1).repeat(64).slice(0, 64)}`,
      mediaType: 'image/png',
      embeddedMetadataSanitizedAttested: true,
    })),
  });
  const annotations = items.map((item, index) => admitHumanAnnotationFR219(session, {
    reviewItemRef: item.reviewItemRef,
    label: index < 2 ? 'slightly_downturned' : 'slightly_upturned',
    recordedAt: `2026-09-21T01:0${index}:00.000Z`,
  }));
  const receipt = buildAnnotationEvidenceReceiptFR219([session], annotations);
  const annotationEvidence = verifyPersistedAnnotationEvidenceFR220({
    annotationRecords: persisted(annotations) as readonly unknown[],
    evidenceReceipt: persisted(receipt),
  });
  return assembleVerifiedCandidateAnnotationCorrespondenceFR222({
    annotationEvidence,
    candidateEvidence: candidates,
  });
}

describe('FR224 empirical-study readiness gate', () => {
  it('recognizes structurally coherent selection/holdout evidence while retaining empirical blockers', () => {
    const candidates = candidateEvidence('a');
    const result = assembleEmpiricalStudyReadinessGateFR224({
      correspondence: correspondence('a', candidates),
      repeatFamilies: assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(candidates),
    });

    expect(result.structuralGaps).toEqual([]);
    expect(result.readinessState).toBe('STRUCTURAL_EVIDENCE_PRESENT_EMPIRICAL_AUTHORITY_BLOCKED');
    expect(result.structuralDiagnostics.selectionReviewedItemCount).toBe(2);
    expect(result.structuralDiagnostics.holdoutReviewedItemCount).toBe(2);
    expect(result.structuralDiagnostics.selectionRepeatFamilyCount).toBe(1);
    expect(result.structuralDiagnostics.holdoutRepeatFamilyCount).toBe(1);
    expect(result.structuralDiagnostics.reviewedItemInRepeatFamilyCount).toBe(4);
    expect(result.authorityBlockers).toContain('reviewer_human_status_not_independently_verified');
    expect(result.authorityBlockers).toContain('empirical_repeatability_not_established');
    expect(result.authorityBlockers).toContain('empirical_sufficiency_not_established');
    expect(result.authorityBoundary.structuralReadinessMeansCalibrationAuthorized).toBe(false);
    expect(result.authorityBoundary.thresholdIssued).toBe(false);
    expect(result.authorityBoundary.classifierIssued).toBe(false);
    expect(result.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(() => assertEmpiricalStudyReadinessGateFR224(result)).not.toThrow();
  });

  it('rejects FR222 and FR223 artifacts derived from different FR221 candidate evidence', () => {
    const candidatesA = candidateEvidence('a');
    const candidatesB = candidateEvidence('b');
    expect(() => assembleEmpiricalStudyReadinessGateFR224({
      correspondence: correspondence('a', candidatesA),
      repeatFamilies: assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(candidatesB),
    })).toThrow(/exact same FR221 candidate evidence/u);
  });

  it('does not invent numeric sufficiency or repeatability thresholds', () => {
    const candidates = candidateEvidence('threshold');
    const result = assembleEmpiricalStudyReadinessGateFR224({
      correspondence: correspondence('threshold', candidates),
      repeatFamilies: assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(candidates),
    });
    expect(result.noInventedSufficiencyRule.minimumSampleThresholdInvented).toBe(false);
    expect(result.noInventedSufficiencyRule.minimumReviewerThresholdInvented).toBe(false);
    expect(result.noInventedSufficiencyRule.minimumRepeatFamilyThresholdInvented).toBe(false);
    expect(result.noInventedSufficiencyRule.numericRepeatabilityAcceptanceThresholdInvented).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.authorityBoundary.repeatCaptureStabilityEstablished).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
  });

  it('requires active-runtime FR222 authority rather than a JSON-shaped clone', () => {
    const candidates = candidateEvidence('clone');
    const original = correspondence('clone', candidates);
    const cloned = persisted(original) as typeof original;
    expect(() => assembleEmpiricalStudyReadinessGateFR224({
      correspondence: cloned,
      repeatFamilies: assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(candidates),
    })).toThrow(/not assembled by the active FR222 runtime/u);
  });
});
