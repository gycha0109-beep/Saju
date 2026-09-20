import type { FaceCalibrationPartition } from './calibration-protocol.js';
import {
  assertIssuedEyePairProspectiveCaptureManifestFR159,
  type EyePairProspectiveCaptureManifestFR159V1,
} from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  assertEyeNeutralAxisBundleFR210,
  type FR210EyeNeutralAxisBundle,
} from './eye-neutral-axis-bundle-fr210.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR218_CONTRACT_VERSION =
  'FR218-OBSERVABLE-MORPHOLOGY-VALIDATION-v1' as const;

export const FR218_EYE_OUTER_CORNER_TILT_METRIC_REF =
  'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const;

export const FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF =
  'observable.eye_pair.outer_corner_orientation@0.1.0' as const;

export const FR218_HUMAN_EVIDENCE_GATE =
  'HUMAN_EVIDENCE_REQUIRED' as const;

export type FR218ObservableLabelKey =
  | 'clearly_downturned'
  | 'slightly_downturned'
  | 'approximately_horizontal'
  | 'slightly_upturned'
  | 'clearly_upturned'
  | 'not_assessable';

export interface FR218ObservableLabelDefinition {
  readonly key: FR218ObservableLabelKey;
  readonly ordinal: -2 | -1 | 0 | 1 | 2 | null;
  readonly reviewerMeaning: string;
}

export interface FR218ObservableMorphologyConstructDefinition {
  readonly constructRef: typeof FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF;
  readonly region: 'eye_pair';
  readonly constructKind: 'human_visible_orientation';
  readonly reviewerPrompt: string;
  readonly candidateMetricRef: typeof FR218_EYE_OUTER_CORNER_TILT_METRIC_REF;
  readonly metricRole: 'candidate_measurement_only';
  readonly labels: readonly FR218ObservableLabelDefinition[];
  readonly reviewerMustNotSee: readonly [
    'metric_values',
    'candidate_metric_identity',
    'provider_identity',
    'extractor_identity',
    'candidate_threshold',
    'traditional_label',
    'fortune_output',
    'peer_labels',
  ];
  readonly traditionalSourceRefs: readonly [];
  readonly methodologyRefs: readonly [];
  readonly authorityBoundary: {
    readonly observableMorphologyLayerOnly: true;
    readonly anatomyClaimIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly transitionZoneIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR218CaptureAdmissionReceipt {
  readonly schemaVersion: 'fr218-capture-admission-receipt-v1';
  readonly source: 'fr159_prospective_attestation_manifest';
  readonly captureAdmissionRef: string;
  readonly sourceManifestCaptureRef: string;
  readonly freshnessIndependentlyVerified: false;
  readonly sameParticipantIdentityIndependentlyVerified: false;
  readonly captureQualityValidated: false;
}

export interface FR218MetricCandidateMetadata {
  readonly sampleRef: string;
  readonly participantKey: string;
  readonly captureFamilyKey: string;
  readonly partition: FaceCalibrationPartition;
  readonly reviewItemRef: string;
  readonly reviewArtifactRef: string;
  readonly captureAdmission: FR218CaptureAdmissionReceipt;
  readonly confounderTags: readonly string[];
}

export interface FR218MetricCandidateRecord {
  readonly schemaVersion: 'fr218-metric-candidate-v1';
  readonly contractVersion: typeof FR218_CONTRACT_VERSION;
  readonly constructRef: typeof FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF;
  readonly sampleRef: string;
  readonly participantKey: string;
  readonly captureFamilyKey: string;
  readonly partition: FaceCalibrationPartition;
  readonly reviewItemRef: string;
  readonly reviewArtifactRef: string;
  readonly captureAdmissionRef: string;
  readonly captureAdmissionSource: 'fr159_prospective_attestation_manifest';
  readonly captureAdmissionReevaluatedByFR218: false;
  readonly freshnessIndependentlyVerified: false;
  readonly sameParticipantIdentityIndependentlyVerified: false;
  readonly captureQualityValidated: false;
  readonly metricRef: typeof FR218_EYE_OUTER_CORNER_TILT_METRIC_REF;
  readonly metricValue: number;
  readonly unit: 'degree';
  readonly confounderTags: readonly string[];
  readonly metricRole: 'candidate_measurement_only';
  readonly humanLabelObserved: false;
  readonly thresholdApplied: false;
  readonly classifierApplied: false;
  readonly traditionalBindingApplied: false;
}

export type FR218MetricCandidateAdmission =
  | Readonly<{
      status: 'available';
      candidate: FR218MetricCandidateRecord;
    }>
  | Readonly<{
      status: 'unavailable';
      sampleRef: string;
      reason:
        | 'eye_cycle_extrema_ambiguous'
        | 'eye_cycles_not_bilateral_around_mesh_midline';
      fallbackInvented: false;
    }>;

export interface FR218MetricSpaceSamplingPlan {
  readonly partition: FaceCalibrationPartition;
  readonly binCount: number;
  readonly targetPerBin: number;
}

export interface FR218CoverageSelectionRecord {
  readonly sampleRef: string;
  readonly reviewItemRef: string;
  readonly coverageBinIndex: number;
  readonly metricValueHiddenFromReviewer: true;
}

export interface FR218MetricSpaceCoverageSelection {
  readonly schemaVersion: 'fr218-metric-space-coverage-selection-v1';
  readonly contractVersion: typeof FR218_CONTRACT_VERSION;
  readonly constructRef: typeof FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF;
  readonly partition: FaceCalibrationPartition;
  readonly authorityState: 'metric_space_coverage_only_no_boundary_claim';
  readonly binCount: number;
  readonly targetPerBin: number;
  readonly selected: readonly FR218CoverageSelectionRecord[];
  readonly nearBoundaryPreassigned: false;
  readonly humanLabelsUsedForSelection: false;
  readonly thresholdIssued: false;
  readonly transitionZoneIssued: false;
  readonly classifierIssued: false;
  readonly traditionalBindingIssued: false;
}

export interface FR218BlindedReviewItem {
  readonly reviewItemRef: string;
  readonly reviewArtifactRef: string;
  readonly constructRef: typeof FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF;
  readonly reviewerPrompt: string;
  readonly labelOptions: readonly Readonly<{
    key: FR218ObservableLabelKey;
    reviewerMeaning: string;
  }>[];
  readonly metricValuesExposed: false;
  readonly candidateMetricIdentityExposed: false;
  readonly providerIdentityExposed: false;
  readonly extractorIdentityExposed: false;
  readonly coverageBinExposed: false;
  readonly candidateThresholdExposed: false;
  readonly traditionalMeaningExposed: false;
  readonly fortuneOutputExposed: false;
  readonly peerLabelsExposed: false;
}

export interface FR218ReviewerAnnotation {
  readonly reviewItemRef: string;
  readonly reviewerKey: string;
  readonly label: FR218ObservableLabelKey;
}

export interface FR218OrdinalAnnotationSummary {
  readonly reviewItemRef: string;
  readonly annotationCount: number;
  readonly countsByLabel: Readonly<Record<FR218ObservableLabelKey, number>>;
  readonly distinctAssessableOrdinalLabels: number;
  readonly notAssessableCount: number;
  readonly reviewerDisagreementPreserved: true;
  readonly consensusCollapsed: false;
  readonly thresholdIssued: false;
  readonly transitionZoneIssued: false;
}

export interface FR218HumanEvidenceReadiness {
  readonly state:
    | typeof FR218_HUMAN_EVIDENCE_GATE
    | 'EVIDENCE_REFERENCES_PRESENT_REQUIRES_NEXT_STAGE_REVIEW';
  readonly repeatCaptureEvidenceRefCount: number;
  readonly blindedHumanAnnotationEvidenceRefCount: number;
  readonly syntheticFixtureRefCount: number;
  readonly syntheticEvidenceMaySatisfyHumanGate: false;
  readonly thresholdSelectionAuthorized: false;
  readonly classifierAuthorized: false;
  readonly transitionZoneAuthorized: false;
  readonly traditionalBindingAuthorized: false;
}

const LABELS = Object.freeze([
  Object.freeze({
    key: 'clearly_downturned' as const,
    ordinal: -2 as const,
    reviewerMeaning: '눈꼬리가 확실히 내려가 보임',
  }),
  Object.freeze({
    key: 'slightly_downturned' as const,
    ordinal: -1 as const,
    reviewerMeaning: '눈꼬리가 약간 내려가 보임',
  }),
  Object.freeze({
    key: 'approximately_horizontal' as const,
    ordinal: 0 as const,
    reviewerMeaning: '눈꼬리가 거의 수평으로 보임',
  }),
  Object.freeze({
    key: 'slightly_upturned' as const,
    ordinal: 1 as const,
    reviewerMeaning: '눈꼬리가 약간 올라가 보임',
  }),
  Object.freeze({
    key: 'clearly_upturned' as const,
    ordinal: 2 as const,
    reviewerMeaning: '눈꼬리가 확실히 올라가 보임',
  }),
  Object.freeze({
    key: 'not_assessable' as const,
    ordinal: null,
    reviewerMeaning: '이 이미지에서는 판단하기 어려움',
  }),
] satisfies readonly FR218ObservableLabelDefinition[]);

const AUTHORITY_BOUNDARY = Object.freeze({
  observableMorphologyLayerOnly: true as const,
  anatomyClaimIssued: false as const,
  thresholdIssued: false as const,
  classifierIssued: false as const,
  transitionZoneIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

export const FACE_OBSERVABLE_MORPHOLOGY_CONSTRUCT_FR218:
  FR218ObservableMorphologyConstructDefinition = Object.freeze({
    constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
    region: 'eye_pair',
    constructKind: 'human_visible_orientation',
    reviewerPrompt: '이 사람의 눈꼬리는 전체적으로 어떻게 보이나요?',
    candidateMetricRef: FR218_EYE_OUTER_CORNER_TILT_METRIC_REF,
    metricRole: 'candidate_measurement_only',
    labels: LABELS,
    reviewerMustNotSee: Object.freeze([
      'metric_values',
      'candidate_metric_identity',
      'provider_identity',
      'extractor_identity',
      'candidate_threshold',
      'traditional_label',
      'fortune_output',
      'peer_labels',
    ] as const),
    traditionalSourceRefs: Object.freeze([]) as readonly [],
    methodologyRefs: Object.freeze([]) as readonly [],
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

const ISSUED_CAPTURE_ADMISSIONS = new WeakSet<object>();
const ISSUED_CANDIDATES = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-218 ${message}`);
}

function nonEmpty(value: string, label: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`${label} must be a non-empty opaque reference.`);
  }
  return value;
}

function uniqueStrings(values: readonly string[], label: string): readonly string[] {
  const out = values.map((value) => nonEmpty(value, label));
  if (new Set(out).size !== out.length) fail(`${label} must not contain duplicates.`);
  return Object.freeze([...out]);
}

function labelDefinition(label: FR218ObservableLabelKey): FR218ObservableLabelDefinition {
  const found = LABELS.find((candidate) => candidate.key === label);
  if (found === undefined) fail(`unsupported observable label: ${label}.`);
  return found;
}

export function issueCaptureAdmissionFromFR159FR218(
  manifest: EyePairProspectiveCaptureManifestFR159V1,
): FR218CaptureAdmissionReceipt {
  assertIssuedEyePairProspectiveCaptureManifestFR159(manifest);
  const captureAdmissionRef = `fr159:${nonEmpty(manifest.captureRef, 'manifest.captureRef')}`;
  const receipt: FR218CaptureAdmissionReceipt = Object.freeze({
    schemaVersion: 'fr218-capture-admission-receipt-v1' as const,
    source: 'fr159_prospective_attestation_manifest' as const,
    captureAdmissionRef,
    sourceManifestCaptureRef: manifest.captureRef,
    freshnessIndependentlyVerified: false as const,
    sameParticipantIdentityIndependentlyVerified: false as const,
    captureQualityValidated: false as const,
  });
  ISSUED_CAPTURE_ADMISSIONS.add(receipt);
  return receipt;
}

function assertIssuedCaptureAdmissionFR218(receipt: FR218CaptureAdmissionReceipt): void {
  if (!ISSUED_CAPTURE_ADMISSIONS.has(receipt)) fail('capture admission receipt was not issued by FR218 from an active FR159 manifest.');
  if (
    receipt.schemaVersion !== 'fr218-capture-admission-receipt-v1'
    || receipt.source !== 'fr159_prospective_attestation_manifest'
    || receipt.captureAdmissionRef.trim().length === 0
    || receipt.sourceManifestCaptureRef.trim().length === 0
    || receipt.freshnessIndependentlyVerified !== false
    || receipt.sameParticipantIdentityIndependentlyVerified !== false
    || receipt.captureQualityValidated !== false
  ) fail('capture admission receipt authority boundary drift.');
}

export function admitEyeCornerOrientationCandidateFR218(
  bundle: FR210EyeNeutralAxisBundle,
  metadata: FR218MetricCandidateMetadata,
): FR218MetricCandidateAdmission {
  assertEyeNeutralAxisBundleFR210(bundle);
  const sampleRef = nonEmpty(metadata.sampleRef, 'sampleRef');
  const participantKey = nonEmpty(metadata.participantKey, 'participantKey');
  const captureFamilyKey = nonEmpty(metadata.captureFamilyKey, 'captureFamilyKey');
  const reviewItemRef = nonEmpty(metadata.reviewItemRef, 'reviewItemRef');
  const reviewArtifactRef = nonEmpty(metadata.reviewArtifactRef, 'reviewArtifactRef');
  assertIssuedCaptureAdmissionFR218(metadata.captureAdmission);
  if (metadata.partition !== 'selection' && metadata.partition !== 'holdout') {
    fail('partition must be selection or holdout.');
  }
  const confounderTags = uniqueStrings(metadata.confounderTags, 'confounderTags');

  const tilt = bundle.axes.outerCornerTilt;
  if ('status' in tilt) {
    return Object.freeze({
      status: 'unavailable' as const,
      sampleRef,
      reason: tilt.reason,
      fallbackInvented: false as const,
    });
  }
  if (
    tilt.axisKey !== 'outer_corner_tilt' ||
    tilt.sourceMetricRef !== FR218_EYE_OUTER_CORNER_TILT_METRIC_REF ||
    tilt.unit !== 'degree' ||
    !Number.isFinite(tilt.value) ||
    tilt.classificationApplied !== false ||
    tilt.thresholdApplied !== false ||
    tilt.calibrationApplied !== false ||
    tilt.traditionalBindingApplied !== false ||
    tilt.anatomicalInterpretationAllowed !== false
  ) {
    fail('FR210 outer-corner tilt candidate boundary drift.');
  }

  const candidate: FR218MetricCandidateRecord = Object.freeze({
    schemaVersion: 'fr218-metric-candidate-v1' as const,
    contractVersion: FR218_CONTRACT_VERSION,
    constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
    sampleRef,
    participantKey,
    captureFamilyKey,
    partition: metadata.partition,
    reviewItemRef,
    reviewArtifactRef,
    captureAdmissionRef: metadata.captureAdmission.captureAdmissionRef,
    captureAdmissionSource: 'fr159_prospective_attestation_manifest' as const,
    captureAdmissionReevaluatedByFR218: false as const,
    freshnessIndependentlyVerified: false as const,
    sameParticipantIdentityIndependentlyVerified: false as const,
    captureQualityValidated: false as const,
    metricRef: FR218_EYE_OUTER_CORNER_TILT_METRIC_REF,
    metricValue: tilt.value,
    unit: 'degree' as const,
    confounderTags,
    metricRole: 'candidate_measurement_only' as const,
    humanLabelObserved: false as const,
    thresholdApplied: false as const,
    classifierApplied: false as const,
    traditionalBindingApplied: false as const,
  });
  ISSUED_CANDIDATES.add(candidate);
  return Object.freeze({ status: 'available' as const, candidate });
}

export function assertIssuedFR218MetricCandidate(
  candidate: FR218MetricCandidateRecord,
): void {
  if (!ISSUED_CANDIDATES.has(candidate)) fail(`candidate ${candidate.sampleRef} was not issued by FR218.`);
  if (
    candidate.schemaVersion !== 'fr218-metric-candidate-v1' ||
    candidate.contractVersion !== FR218_CONTRACT_VERSION ||
    candidate.constructRef !== FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF ||
    candidate.metricRef !== FR218_EYE_OUTER_CORNER_TILT_METRIC_REF ||
    candidate.captureAdmissionSource !== 'fr159_prospective_attestation_manifest' ||
    candidate.captureAdmissionReevaluatedByFR218 !== false ||
    candidate.captureAdmissionRef.trim().length === 0 ||
    candidate.freshnessIndependentlyVerified !== false ||
    candidate.sameParticipantIdentityIndependentlyVerified !== false ||
    candidate.captureQualityValidated !== false ||
    candidate.unit !== 'degree' ||
    !Number.isFinite(candidate.metricValue) ||
    candidate.metricRole !== 'candidate_measurement_only' ||
    candidate.humanLabelObserved !== false ||
    candidate.thresholdApplied !== false ||
    candidate.classifierApplied !== false ||
    candidate.traditionalBindingApplied !== false
  ) {
    fail(`candidate authority boundary drift: ${candidate.sampleRef}.`);
  }
}

export function validateFR218CandidatePool(
  records: readonly FR218MetricCandidateRecord[],
): void {
  if (records.length === 0) fail('candidate pool must not be empty.');
  const samples = new Set<string>();
  const reviewItems = new Set<string>();
  const reviewArtifacts = new Set<string>();
  const participantPartition = new Map<string, FaceCalibrationPartition>();
  const familyPartition = new Map<string, FaceCalibrationPartition>();
  const familyParticipant = new Map<string, string>();

  for (const record of records) {
    assertIssuedFR218MetricCandidate(record);
    if (samples.has(record.sampleRef)) fail(`duplicate sampleRef: ${record.sampleRef}.`);
    samples.add(record.sampleRef);
    if (reviewItems.has(record.reviewItemRef)) {
      fail(`duplicate reviewItemRef: ${record.reviewItemRef}.`);
    }
    reviewItems.add(record.reviewItemRef);
    if (reviewArtifacts.has(record.reviewArtifactRef)) {
      fail(`duplicate reviewArtifactRef: ${record.reviewArtifactRef}.`);
    }
    reviewArtifacts.add(record.reviewArtifactRef);

    const participantExisting = participantPartition.get(record.participantKey);
    if (participantExisting !== undefined && participantExisting !== record.partition) {
      fail(`participant leakage across selection/holdout: ${record.participantKey}.`);
    }
    participantPartition.set(record.participantKey, record.partition);

    const familyExisting = familyPartition.get(record.captureFamilyKey);
    if (familyExisting !== undefined && familyExisting !== record.partition) {
      fail(`capture-family leakage across selection/holdout: ${record.captureFamilyKey}.`);
    }
    familyPartition.set(record.captureFamilyKey, record.partition);

    const familyOwner = familyParticipant.get(record.captureFamilyKey);
    if (familyOwner !== undefined && familyOwner !== record.participantKey) {
      fail(`capture family belongs to multiple participants: ${record.captureFamilyKey}.`);
    }
    familyParticipant.set(record.captureFamilyKey, record.participantKey);
  }
}

export function assertSelectionHoldoutCoverageFR218(
  records: readonly FR218MetricCandidateRecord[],
): void {
  validateFR218CandidatePool(records);
  const partitions = new Set(records.map((record) => record.partition));
  if (!partitions.has('selection') || !partitions.has('holdout')) {
    fail('study candidate pool must contain both selection and holdout partitions.');
  }
}

function pickEvenlyAcrossBin(
  bin: readonly FR218MetricCandidateRecord[],
  target: number,
): readonly FR218MetricCandidateRecord[] {
  const selected: FR218MetricCandidateRecord[] = [];
  for (let index = 0; index < target; index += 1) {
    const position = Math.min(
      bin.length - 1,
      Math.floor(((2 * index + 1) * bin.length) / (2 * target)),
    );
    selected.push(bin[position]!);
  }
  if (new Set(selected.map((candidate) => candidate.sampleRef)).size !== selected.length) {
    fail('deterministic within-bin selection produced duplicate samples.');
  }
  return selected;
}

export function selectMetricSpaceCoverageCandidatesFR218(
  records: readonly FR218MetricCandidateRecord[],
  plan: FR218MetricSpaceSamplingPlan,
): FR218MetricSpaceCoverageSelection {
  validateFR218CandidatePool(records);
  if (!Number.isSafeInteger(plan.binCount) || plan.binCount < 2) {
    fail('binCount must be a safe integer >= 2.');
  }
  if (!Number.isSafeInteger(plan.targetPerBin) || plan.targetPerBin < 1) {
    fail('targetPerBin must be a positive safe integer.');
  }

  const eligible = records
    .filter((record) => record.partition === plan.partition)
    .sort((left, right) =>
      left.metricValue - right.metricValue || left.sampleRef.localeCompare(right.sampleRef));

  if (eligible.length < plan.binCount * plan.targetPerBin) {
    fail('candidate pool does not have enough records for the declared coverage plan.');
  }
  if (new Set(eligible.map((record) => record.metricValue)).size < plan.binCount) {
    fail('metric-space coverage requires at least binCount distinct candidate metric values.');
  }

  const bins = Array.from({ length: plan.binCount }, () => [] as FR218MetricCandidateRecord[]);
  eligible.forEach((record, index) => {
    const binIndex = Math.min(
      plan.binCount - 1,
      Math.floor((index * plan.binCount) / eligible.length),
    );
    bins[binIndex]!.push(record);
  });

  const selected = bins.flatMap((bin, binIndex) => {
    if (bin.length < plan.targetPerBin) {
      fail(`coverage bin ${binIndex} is undersupplied.`);
    }
    return pickEvenlyAcrossBin(bin, plan.targetPerBin).map((record) =>
      Object.freeze({
        sampleRef: record.sampleRef,
        reviewItemRef: record.reviewItemRef,
        coverageBinIndex: binIndex,
        metricValueHiddenFromReviewer: true as const,
      }));
  });

  return Object.freeze({
    schemaVersion: 'fr218-metric-space-coverage-selection-v1' as const,
    contractVersion: FR218_CONTRACT_VERSION,
    constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
    partition: plan.partition,
    authorityState: 'metric_space_coverage_only_no_boundary_claim' as const,
    binCount: plan.binCount,
    targetPerBin: plan.targetPerBin,
    selected: Object.freeze(selected),
    nearBoundaryPreassigned: false as const,
    humanLabelsUsedForSelection: false as const,
    thresholdIssued: false as const,
    transitionZoneIssued: false as const,
    classifierIssued: false as const,
    traditionalBindingIssued: false as const,
  });
}

export function projectBlindedReviewItemsFR218(
  selection: FR218MetricSpaceCoverageSelection,
  records: readonly FR218MetricCandidateRecord[],
): readonly FR218BlindedReviewItem[] {
  if (
    selection.contractVersion !== FR218_CONTRACT_VERSION ||
    selection.constructRef !== FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF ||
    selection.authorityState !== 'metric_space_coverage_only_no_boundary_claim' ||
    selection.nearBoundaryPreassigned !== false ||
    selection.humanLabelsUsedForSelection !== false ||
    selection.thresholdIssued !== false ||
    selection.transitionZoneIssued !== false ||
    selection.classifierIssued !== false ||
    selection.traditionalBindingIssued !== false
  ) {
    fail('coverage selection authority boundary drift.');
  }
  validateFR218CandidatePool(records);
  const bySample = new Map(records.map((record) => [record.sampleRef, record] as const));

  return Object.freeze(selection.selected.map((selected) => {
    const candidate = bySample.get(selected.sampleRef);
    if (candidate === undefined) fail(`selected sample missing from candidate pool: ${selected.sampleRef}.`);
    if (candidate.partition !== selection.partition) {
      fail(`selected sample partition drift: ${selected.sampleRef}.`);
    }
    return Object.freeze({
      reviewItemRef: selected.reviewItemRef,
      reviewArtifactRef: candidate.reviewArtifactRef,
      constructRef: FR218_EYE_CORNER_ORIENTATION_CONSTRUCT_REF,
      reviewerPrompt: FACE_OBSERVABLE_MORPHOLOGY_CONSTRUCT_FR218.reviewerPrompt,
      labelOptions: Object.freeze(LABELS.map((label) => Object.freeze({
        key: label.key,
        reviewerMeaning: label.reviewerMeaning,
      }))),
      metricValuesExposed: false as const,
      candidateMetricIdentityExposed: false as const,
      providerIdentityExposed: false as const,
      extractorIdentityExposed: false as const,
      coverageBinExposed: false as const,
      candidateThresholdExposed: false as const,
      traditionalMeaningExposed: false as const,
      fortuneOutputExposed: false as const,
      peerLabelsExposed: false as const,
    });
  }));
}

export function summarizeOrdinalAnnotationsFR218(
  reviewItems: readonly FR218BlindedReviewItem[],
  annotations: readonly FR218ReviewerAnnotation[],
): readonly FR218OrdinalAnnotationSummary[] {
  if (reviewItems.length === 0) fail('annotation summary requires review items.');
  const validItems = new Set(reviewItems.map((item) => item.reviewItemRef));
  if (validItems.size !== reviewItems.length) fail('reviewItemRef values must be unique.');
  const seenReviewerPerItem = new Set<string>();
  const labelsByItem = new Map<string, FR218ObservableLabelKey[]>();

  for (const annotation of annotations) {
    if (!validItems.has(annotation.reviewItemRef)) {
      fail(`annotation references unknown review item: ${annotation.reviewItemRef}.`);
    }
    nonEmpty(annotation.reviewerKey, 'reviewerKey');
    labelDefinition(annotation.label);
    const pair = `${annotation.reviewItemRef}\u0000${annotation.reviewerKey}`;
    if (seenReviewerPerItem.has(pair)) {
      fail(`duplicate reviewer annotation for ${annotation.reviewItemRef}.`);
    }
    seenReviewerPerItem.add(pair);
    const labels = labelsByItem.get(annotation.reviewItemRef) ?? [];
    labels.push(annotation.label);
    labelsByItem.set(annotation.reviewItemRef, labels);
  }

  return Object.freeze([...reviewItems]
    .sort((left, right) => left.reviewItemRef.localeCompare(right.reviewItemRef))
    .map((item) => {
      const labels = labelsByItem.get(item.reviewItemRef) ?? [];
      const counts = Object.fromEntries(
        LABELS.map((definition) => [
          definition.key,
          labels.filter((label) => label === definition.key).length,
        ]),
      ) as Record<FR218ObservableLabelKey, number>;
      const distinctAssessableOrdinalLabels = new Set(
        labels
          .map((label) => labelDefinition(label).ordinal)
          .filter((ordinal): ordinal is -2 | -1 | 0 | 1 | 2 => ordinal !== null),
      ).size;
      return Object.freeze({
        reviewItemRef: item.reviewItemRef,
        annotationCount: labels.length,
        countsByLabel: Object.freeze(counts),
        distinctAssessableOrdinalLabels,
        notAssessableCount: counts.not_assessable,
        reviewerDisagreementPreserved: true as const,
        consensusCollapsed: false as const,
        thresholdIssued: false as const,
        transitionZoneIssued: false as const,
      });
    }));
}

export function assessHumanEvidenceReadinessFR218(input: {
  readonly repeatCaptureEvidenceRefs: readonly string[];
  readonly blindedHumanAnnotationEvidenceRefs: readonly string[];
  readonly syntheticFixtureRefs: readonly string[];
}): FR218HumanEvidenceReadiness {
  const repeat = uniqueStrings(input.repeatCaptureEvidenceRefs, 'repeatCaptureEvidenceRefs');
  const human = uniqueStrings(input.blindedHumanAnnotationEvidenceRefs, 'blindedHumanAnnotationEvidenceRefs');
  const synthetic = uniqueStrings(input.syntheticFixtureRefs, 'syntheticFixtureRefs');
  return Object.freeze({
    state: repeat.length > 0 && human.length > 0
      ? 'EVIDENCE_REFERENCES_PRESENT_REQUIRES_NEXT_STAGE_REVIEW' as const
      : FR218_HUMAN_EVIDENCE_GATE,
    repeatCaptureEvidenceRefCount: repeat.length,
    blindedHumanAnnotationEvidenceRefCount: human.length,
    syntheticFixtureRefCount: synthetic.length,
    syntheticEvidenceMaySatisfyHumanGate: false as const,
    thresholdSelectionAuthorized: false as const,
    classifierAuthorized: false as const,
    transitionZoneAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
  });
}
