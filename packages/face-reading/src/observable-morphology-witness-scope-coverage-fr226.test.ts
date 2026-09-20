import { describe, expect, it } from 'vitest';
import type { FR210EyeNeutralAxisBundle } from './eye-neutral-axis-bundle-fr210.js';
import { admitEyePairProspectiveCaptureManifestFR159 } from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  admitHumanAnnotationFR219,
  buildAnnotationEvidenceReceiptFR219,
  materializeBlindedReviewSessionFR219,
} from './observable-morphology-human-review-fr219.js';
import { verifyPersistedAnnotationEvidenceFR220 } from './observable-morphology-persisted-annotation-intake-fr220.js';
import {
  materializeCandidateProvenanceEvidenceFR221,
  verifyPersistedCandidateProvenanceEvidenceFR221,
} from './observable-morphology-persisted-candidate-provenance-fr221.js';
import { assembleVerifiedCandidateAnnotationCorrespondenceFR222 } from './observable-morphology-candidate-annotation-correspondence-fr222.js';
import { assembleDeclaredRepeatCaptureFamilyDescriptivesFR223 } from './observable-morphology-repeat-capture-family-fr223.js';
import { assembleEmpiricalStudyReadinessGateFR224 } from './observable-morphology-empirical-study-readiness-fr224.js';
import {
  materializeExternalWitnessEvidenceFR225,
  verifyPersistedExternalWitnessEvidenceFR225,
  type FR225ExternalWitnessRecordInput,
} from './observable-morphology-external-witness-evidence-fr225.js';
import {
  assembleWitnessScopeCoverageFR226,
  assertWitnessScopeCoverageFR226,
} from './observable-morphology-witness-scope-coverage-fr226.js';
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
    sourceMetricRef: `neutral.fr226.test.${axisKey}@0.1.0`,
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
      fr77ProviderRunRef: `provider-run:fr226:${ref}`,
      fr77CanonicalAssetDigest: `sha256:${'d'.repeat(64)}`,
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
    prospectiveCollectionRef: `fr226:test:collection:${input.prefix}`,
    captureSeriesRef: `series:${input.familyKey}`,
    captureRef: `capture:${input.prefix}:${input.ref}`,
    captureConditionRef: 'fr226:test:condition:mechanics-only',
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
      confounderTags: ['fr226_mechanics_only'],
    },
  );
  if (admitted.status !== 'available') throw new Error('FR226 test candidate unavailable.');
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
  return verifyPersistedCandidateProvenanceEvidenceFR221(
    persisted(materializeCandidateProvenanceEvidenceFR221(records)),
  );
}

function reviewItem(
  record: Pick<FR218MetricCandidateRecord, 'reviewItemRef' | 'reviewArtifactRef'>,
): FR218BlindedReviewItem {
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
  const items = candidates.records.map((record) => reviewItem(record));
  const session = materializeBlindedReviewSessionFR219({
    sessionRef: `session:fr226:${prefix}`,
    reviewerKey: `reviewer:fr226:${prefix}`,
    reviewerHumanAttested: true,
    reviewerIndependenceAttested: true,
    items: items.map((item, index) => ({
      reviewItem: item,
      assetPath: `/private/fr226/${prefix}/${index}.png`,
      assetDigest: `sha256:${String(index + 1).repeat(64).slice(0, 64)}`,
      mediaType: 'image/png',
      embeddedMetadataSanitizedAttested: true,
    })),
  });
  const annotations = items.map((item, index) => admitHumanAnnotationFR219(session, {
    reviewItemRef: item.reviewItemRef,
    label: index < 2 ? 'slightly_downturned' : 'slightly_upturned',
    recordedAt: `2026-09-21T06:0${index}:00.000Z`,
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

function study(prefix: string) {
  const candidates = candidateEvidence(prefix);
  const joined = correspondence(prefix, candidates);
  const repeats = assembleDeclaredRepeatCaptureFamilyDescriptivesFR223(candidates);
  const gate = assembleEmpiricalStudyReadinessGateFR224({
    correspondence: joined,
    repeatFamilies: repeats,
  });
  return { candidates, joined, repeats, gate };
}

function witnessInputs(
  studyValue: ReturnType<typeof study>,
  options: {
    omitLastFreshness?: boolean;
    omitLastFamily?: boolean;
    outOfStudyFreshness?: boolean;
  } = {},
): FR225ExternalWitnessRecordInput[] {
  const inputs: FR225ExternalWitnessRecordInput[] = [];
  let index = 0;
  const digest = () => `sha256:${((index % 15) + 1).toString(16).repeat(64)}`;
  const push = (record: Omit<FR225ExternalWitnessRecordInput, 'witnessRef' | 'externalEvidenceRef' | 'externalEvidenceDigest' | 'claimAttested' | 'observedAt'>) => {
    index += 1;
    inputs.push({
      witnessRef: `witness:fr226:${index}`,
      externalEvidenceRef: `external-evidence:fr226:${index}`,
      externalEvidenceDigest: digest(),
      observedAt: `2026-09-21T06:${String(index).padStart(2, '0')}:00.000Z`,
      claimAttested: true,
      ...record,
    });
  };

  const cohort = studyValue.joined.sourceEvidence.fr220AnnotationEvidenceRef;
  push({
    verifierRef: 'verifier:fr226:1',
    claimType: 'reviewer_cohort_human_status_observed',
    scopeRef: cohort,
    verificationMethod: 'in_person_observation',
  });
  push({
    verifierRef: 'verifier:fr226:1',
    claimType: 'reviewer_cohort_independence_observed',
    scopeRef: cohort,
    verificationMethod: 'documented_process_review',
  });

  const admissions = studyValue.repeats.repeatFamilies
    .flatMap((family) => family.captureAdmissionRefs);
  admissions.forEach((scopeRef, admissionIndex) => {
    if (options.omitLastFreshness && admissionIndex === admissions.length - 1) return;
    push({
      verifierRef: 'verifier:fr226:1',
      claimType: 'capture_freshness_observed',
      scopeRef: options.outOfStudyFreshness && admissionIndex === 0
        ? 'fr159:capture:outside-study'
        : scopeRef,
      verificationMethod: 'supervised_capture_observation',
    });
  });

  studyValue.repeats.repeatFamilies.forEach((family, familyIndex) => {
    if (options.omitLastFamily && familyIndex === studyValue.repeats.repeatFamilies.length - 1) return;
    push({
      verifierRef: 'verifier:fr226:1',
      claimType: 'capture_family_same_participant_observed',
      scopeRef: family.captureFamilyKey,
      verificationMethod: 'supervised_capture_observation',
    });
  });
  return inputs;
}

function witnessEvidence(
  studyValue: ReturnType<typeof study>,
  options: Parameters<typeof witnessInputs>[1] = {},
) {
  return verifyPersistedExternalWitnessEvidenceFR225(
    persisted(materializeExternalWitnessEvidenceFR225({
      studyGateRef: studyValue.gate.gateRef,
      studyGateDigest: studyValue.gate.gateDigest,
      records: witnessInputs(studyValue, options),
    })),
  );
}

describe('FR226 witness scope coverage', () => {
  it('assembles exact complete declared witness coverage without upgrading empirical authority', () => {
    const value = study('complete');
    const result = assembleWitnessScopeCoverageFR226({
      correspondence: value.joined,
      repeatFamilies: value.repeats,
      studyGate: value.gate,
      witnessEvidence: witnessEvidence(value),
    });

    expect(result.coverageState)
      .toBe('DECLARED_WITNESS_SCOPE_COVERAGE_COMPLETE_AUTHORITY_BLOCKED');
    expect(result.reviewerHumanStatusWitnessPresent).toBe(true);
    expect(result.reviewerIndependenceWitnessPresent).toBe(true);
    expect(result.expectedCaptureAdmissionCount).toBe(4);
    expect(result.witnessedCaptureAdmissionCount).toBe(4);
    expect(result.expectedRepeatFamilyCount).toBe(2);
    expect(result.witnessedRepeatFamilyCount).toBe(2);
    expect(result.selection.expectedCaptureAdmissionCount).toBe(2);
    expect(result.holdout.expectedCaptureAdmissionCount).toBe(2);
    expect(result.uncoveredCaptureAdmissionRefs).toEqual([]);
    expect(result.uncoveredCaptureFamilyKeys).toEqual([]);

    expect(result.authorityBoundary.declaredWitnessCoverageMeansUnderlyingFactsEstablished).toBe(false);
    expect(result.authorityBoundary.reviewerHumanStatusIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.captureFreshnessIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.sameParticipantIdentityIndependentlyVerified).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.calibrationAuthorized).toBe(false);
    expect(result.authorityBoundary.thresholdIssued).toBe(false);
    expect(() => assertWitnessScopeCoverageFR226(result)).not.toThrow();
  });

  it('reports incomplete exact scope coverage without inventing sufficiency rules', () => {
    const value = study('incomplete');
    const result = assembleWitnessScopeCoverageFR226({
      correspondence: value.joined,
      repeatFamilies: value.repeats,
      studyGate: value.gate,
      witnessEvidence: witnessEvidence(value, {
        omitLastFreshness: true,
        omitLastFamily: true,
      }),
    });

    expect(result.coverageState)
      .toBe('DECLARED_WITNESS_SCOPE_COVERAGE_INCOMPLETE_AUTHORITY_BLOCKED');
    expect(result.uncoveredCaptureAdmissionRefs).toHaveLength(1);
    expect(result.uncoveredCaptureFamilyKeys).toHaveLength(1);
    expect(result.noInventedSufficiencyRule.minimumVerifierCountInvented).toBe(false);
    expect(result.noInventedSufficiencyRule.witnessCoverageMeansEmpiricalSufficiency).toBe(false);
    expect(result.noInventedSufficiencyRule.completeCoverageMeansCalibrationAuthorized).toBe(false);
  });

  it('rejects a witness claim whose scope is outside the exact FR223 study scopes', () => {
    const value = study('outside');
    expect(() => assembleWitnessScopeCoverageFR226({
      correspondence: value.joined,
      repeatFamilies: value.repeats,
      studyGate: value.gate,
      witnessEvidence: witnessEvidence(value, { outOfStudyFreshness: true }),
    })).toThrow(/outside FR223 repeat families/u);
  });

  it('rejects FR225 evidence bound to a different active FR224 gate', () => {
    const valueA = study('gate-a');
    const valueB = study('gate-b');
    expect(() => assembleWitnessScopeCoverageFR226({
      correspondence: valueA.joined,
      repeatFamilies: valueA.repeats,
      studyGate: valueA.gate,
      witnessEvidence: witnessEvidence(valueB),
    })).toThrow(/exact supplied FR224 study gate/u);
  });

  it('requires active-runtime FR225 verification rather than a JSON-shaped clone', () => {
    const value = study('clone');
    const verified = witnessEvidence(value);
    const clone = persisted(verified) as typeof verified;
    expect(() => assembleWitnessScopeCoverageFR226({
      correspondence: value.joined,
      repeatFamilies: value.repeats,
      studyGate: value.gate,
      witnessEvidence: clone,
    })).toThrow(/not verified by the active FR225 runtime/u);
  });
});
