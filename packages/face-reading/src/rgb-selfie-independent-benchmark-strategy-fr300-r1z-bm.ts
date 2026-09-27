import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR295_RGB_RELATIVE_3D_BENCHMARK_CONTRACT_VERSION,
  assessFR295BenchmarkAdmission,
  assertFR295RgbRelative3DBenchmarkProtocol,
  type FR295RgbCandidateEvidence,
} from './rgb-relative-3d-benchmark-protocol-fr295.js';
import {
  FR298_REFERENCE_AXIS_DEFINITION_REF,
  assertFR298NeutralNoseRelativeProjectionAxisAuthority,
} from './neutral-nose-tip-bridge-relative-projection-axis-fr298.js';
import {
  FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
  assertFR299Independent3DNoseReferenceBundleContract,
  type FR299Independent3DNoseReferenceBundle,
} from './independent-3d-nose-reference-bundle-fr299.js';
import {
  FR300_R1Y_RC_CURRENT_GATE,
  FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_RECONCILIATION_CONTRACT_VERSION,
  assertFR300R1YRCHistoricalReconciliationContract,
} from './historical-real-device-evidence-reconciliation-fr300-r1y-rc.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1Z_BM_RGB_SELFIE_INDEPENDENT_BENCHMARK_CONTRACT_VERSION =
  'FR300-R1Z-BM-RGB-SELFIE-INDEPENDENT-BENCHMARK-v1' as const;

export const FR300_R1Z_BM_FIRST_TARGET =
  'nose.tip_bridge_relative_projection' as const;

export type FR300R1ZBMPoseYawBin =
  | 'neutral'
  | 'slight_left'
  | 'slight_right';

export type FR300R1ZBMPosePitchBin =
  | 'neutral'
  | 'slight_up'
  | 'slight_down';

export interface FR300R1ZBMCandidateObservation {
  readonly schemaVersion:
    'fr300-r1z-bm-candidate-observation-v1';
  readonly evidence: FR295RgbCandidateEvidence;
  readonly rgbObservationRef: string;
  readonly subjectBindingRef: string;
  readonly providerVersionRef: string;
  readonly canonicalizerVersionRef: string;
  readonly faceSnapshotVersionRef: string;
  readonly candidateScalar: number;
  readonly capture: {
    readonly distanceCm: number;
    readonly yawBin: FR300R1ZBMPoseYawBin;
    readonly pitchBin: FR300R1ZBMPosePitchBin;
    readonly deviceClass:
      'ordinary_smartphone_rgb_front_camera';
    readonly deviceRef: string;
    readonly lightingBin:
      | 'controlled'
      | 'ordinary_indoor'
      | 'ordinary_daylight'
      | 'other_documented';
  };
}

export interface FR300R1ZBMReferenceRightsReceipt {
  readonly schemaVersion:
    'fr300-r1z-bm-reference-rights-receipt-v1';
  readonly rightsEvidenceRef: string;
  readonly internalResearchUse:
    | 'explicitly_allowed'
    | 'unresolved'
    | 'not_allowed';
  readonly commercialResearchAndDevelopment:
    | 'explicitly_allowed'
    | 'unresolved'
    | 'not_allowed';
  readonly rawArtifactRedistribution:
    | 'explicitly_allowed'
    | 'unresolved'
    | 'not_allowed';
  readonly derivedMetricMetadataPublication:
    | 'explicitly_allowed'
    | 'unresolved'
    | 'not_allowed';
  readonly productRuntimeUse:
    | 'explicitly_allowed'
    | 'unresolved'
    | 'not_allowed';
}

export interface FR300R1ZBMReferenceObservation {
  readonly schemaVersion:
    'fr300-r1z-bm-reference-observation-v1';
  readonly bundle: FR299Independent3DNoseReferenceBundle;
  readonly subjectBindingRef: string;
  readonly rights: FR300R1ZBMReferenceRightsReceipt;
  readonly rawRgbCommittedToGit: false;
  readonly raw3DCommittedToGit: false;
  readonly rawDepthCommittedToGit: false;
}

export type FR300R1ZBMBenchmarkPairBlocker =
  | 'candidate_ref_missing'
  | 'candidate_digest_invalid'
  | 'reference_ref_missing'
  | 'subject_binding_mismatch'
  | 'rgb_observation_binding_mismatch'
  | 'capture_distance_outside_product_boundary'
  | 'reference_not_fr299_grade'
  | 'reference_not_frozen_before_candidate_scoring'
  | 'reference_rights_internal_research_unresolved'
  | 'reference_rights_commercial_rnd_unresolved';

export interface FR300R1ZBMBenchmarkPairInput {
  readonly schemaVersion:
    'fr300-r1z-bm-benchmark-pair-input-v1';
  readonly candidate: FR300R1ZBMCandidateObservation;
  readonly reference: FR300R1ZBMReferenceObservation;
}

export interface FR300R1ZBMBenchmarkObservation {
  readonly schemaVersion:
    'fr300-r1z-bm-benchmark-observation-v1';
  readonly featureKey:
    typeof FR300_R1Z_BM_FIRST_TARGET;
  readonly candidateRef: string;
  readonly referenceBundleId: string;
  readonly subjectBindingRef: string;
  readonly candidateScalar: number;
  readonly referenceScalar: number;
  readonly signedError: number;
  readonly absoluteError: number;
  readonly relativeError: number | null;
  readonly capture: FR300R1ZBMCandidateObservation['capture'];
  readonly authorityBoundary: {
    readonly descriptiveObservationOnly: true;
    readonly acceptanceThresholdIssued: false;
    readonly benchmarkWinnerIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR300R1ZBMBenchmarkPairAssessment {
  readonly schemaVersion:
    'fr300-r1z-bm-benchmark-pair-assessment-v1';
  readonly status:
    | 'admitted_for_descriptive_benchmark_only'
    | 'blocked';
  readonly blockers: readonly FR300R1ZBMBenchmarkPairBlocker[];
  readonly observation: FR300R1ZBMBenchmarkObservation | null;
}

export interface FR300R1ZBMCohortAggregate {
  readonly schemaVersion:
    'fr300-r1z-bm-cohort-aggregate-v1';
  readonly featureKey:
    typeof FR300_R1Z_BM_FIRST_TARGET;
  readonly sampleCount: number;
  readonly meanAbsoluteError: number;
  readonly medianAbsoluteError: number;
  readonly meanSignedBias: number;
  readonly signedErrorStandardDeviation: number;
  readonly spearmanRankCorrelation: number | null;
  readonly stratumKeys: readonly string[];
  readonly authorityBoundary: {
    readonly descriptiveAggregateOnly: true;
    readonly acceptanceThresholdIssued: false;
    readonly benchmarkWinnerIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export const FR300_R1Z_BM_REFERENCE_AUTHORITY = Object.freeze({
  finalBenchmarkReferenceClass:
    'fr299_grade_independent_metric_3d_only' as const,
  acceptedFR299SourceClasses: Object.freeze([
    'independent_calibrated_3d',
    'independent_validated_depth',
  ] as const),
  sameCaptureOrValidatedRegistrationRequired: true as const,
  metricScaleVerifiedRequired: true as const,
  providerIndependentRequired: true as const,
  candidateProviderOutputBlindRequired: true as const,
  candidateProviderIndexBlindRequired: true as const,
  traditionalLabelBlindRequired: true as const,
  referenceFrozenBeforeCandidateScoringRequired: true as const,
  arcoreHistoricalRole:
    'research_reference_candidate_only_not_fr299_truth' as const,
  candidateDerivedGeometryMayServeAsReference: false as const,
});

export const FR300_R1Z_BM_CAPTURE_POLICY = Object.freeze({
  cameraClass:
    'ordinary_smartphone_rgb_front_camera' as const,
  minimumDistanceCm: 25 as const,
  maximumDistanceCm: 30 as const,
  specialDepthHardwareRequired: false as const,
  arcoreRequired: false as const,
  physicalMillimeterProductOutputRequired: false as const,
  firstBenchmarkTarget:
    FR300_R1Z_BM_FIRST_TARGET,
});

export const FR300_R1Z_BM_EVALUATION_POLICY = Object.freeze({
  perPairMetrics: Object.freeze([
    'signed_error',
    'absolute_error',
    'relative_error_when_reference_nonzero',
  ] as const),
  cohortMetrics: Object.freeze([
    'mean_absolute_error',
    'median_absolute_error',
    'mean_signed_bias',
    'signed_error_standard_deviation',
    'spearman_rank_correlation_when_defined',
  ] as const),
  requiredStratificationAxes: Object.freeze([
    'distance',
    'yaw',
    'pitch',
    'device',
    'lighting',
  ] as const),
  acceptanceThresholdIssuedByThisStage: false as const,
  benchmarkWinnerIssuedByThisStage: false as const,
});

export const FR300_R1Z_BM_PRIVACY_POLICY = Object.freeze({
  rawRgbMayBeCommittedToGit: false as const,
  raw3DMayBeCommittedToGit: false as const,
  rawDepthMayBeCommittedToGit: false as const,
  derivedScalarReceiptMayBePersisted: true as const,
  artifactDigestMayBePersisted: true as const,
  governedOpaqueRefMayBePersisted: true as const,
  aggregateMetricMayBePersisted: true as const,
});

export const FR300_R1Z_BM_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r1z-bm-rgb-selfie-independent-benchmark-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  disposition:
    'benchmark_strategy_frozen_reference_acquisition_next' as const,
  firstBenchmarkTarget:
    FR300_R1Z_BM_FIRST_TARGET,
  productCandidateLaneFrozen: true as const,
  independentReferenceAuthorityFrozen: true as const,
  correspondenceRulesFrozen: true as const,
  evaluationSchemaFrozen: true as const,
  leakagePreventionFrozen: true as const,
  privacyAndRightsSchemaFrozen: true as const,
  datasetAcquiredByThisStage: false as const,
  humanSubjectCapturedByThisStage: false as const,
  realBenchmarkPairMaterializedByThisStage: false as const,
  acceptanceThresholdIssued: false as const,
  benchmarkWinnerIssued: false as const,
  newSpecialDepthProductDependencyCreated: false as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  productMaterialization: '18/29' as const,
  nextActionWithoutNewExternalAuthorization:
    'qualify_and_acquire_first_fr299_grade_rgb_3d_reference_pair_for_nose_tip_bridge_relative_projection' as const,
  authority: Object.freeze({
    fr299ReferenceMaterialized: false as const,
    fr300R2Authorized: false as const,
    traditionalBindingIssued: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

const SHA256 = /^sha256:[0-9a-f]{64}$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1Z-BM ${message}`,
  );
}

function nonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function finiteUnitRatio(value: number, label: string): number {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    fail(`${label} must be a finite ratio in [0,1].`);
  }
  return value;
}

function median(values: readonly number[]): number {
  const ordered = [...values].sort((a, b) => a - b);
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 === 0
    ? ((ordered[middle - 1] ?? 0) + (ordered[middle] ?? 0)) / 2
    : (ordered[middle] ?? 0);
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, value) => sum + value, 0) /
    values.length;
}

function rank(values: readonly number[]): number[] {
  const indexed = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value);
  const result = new Array<number>(values.length);
  let i = 0;
  while (i < indexed.length) {
    let j = i + 1;
    while (
      j < indexed.length &&
      indexed[j]?.value === indexed[i]?.value
    ) {
      j += 1;
    }
    const averageRank = (i + 1 + j) / 2;
    for (let k = i; k < j; k += 1) {
      const originalIndex = indexed[k]?.index;
      if (originalIndex !== undefined) {
        result[originalIndex] = averageRank;
      }
    }
    i = j;
  }
  return result;
}

function pearson(
  x: readonly number[],
  y: readonly number[],
): number | null {
  if (x.length !== y.length || x.length < 2) return null;
  const mx = mean(x);
  const my = mean(y);
  let numerator = 0;
  let dx2 = 0;
  let dy2 = 0;
  for (let i = 0; i < x.length; i += 1) {
    const dx = (x[i] ?? 0) - mx;
    const dy = (y[i] ?? 0) - my;
    numerator += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  if (dx2 === 0 || dy2 === 0) return null;
  return numerator / Math.sqrt(dx2 * dy2);
}

function toFR295Reference(
  bundle: FR299Independent3DNoseReferenceBundle,
) {
  return {
    referenceRef: bundle.bundleId,
    referenceSourceClass: bundle.source.referenceSourceClass,
    referenceAxisDefinitionRef:
      bundle.reference.referenceAxisDefinitionRef,
    referenceAxisDefinitionFrozen: true as const,
    independentFromCandidateProvider: true as const,
    candidateProviderOutputUsedAsReference: false as const,
    candidateProviderIndicesUsedAsReference: false as const,
    sameCaptureBindingEstablished:
      bundle.rgbBinding.sameCaptureBindingEstablished,
    validatedRegistrationBindingEstablished:
      bundle.rgbBinding.validatedRegistrationBindingEstablished,
    referenceFrozenBeforeCandidateScoring:
      bundle.reference.referenceFrozenBeforeRgbCandidateScoring,
    candidateOutputVisibleDuringReferenceConstruction:
      false as const,
    traditionalLabelVisibleDuringReferenceConstruction:
      false as const,
    referenceUsedForBenchmarkOnly: true as const,
    productionRuntimeDependencyCreated: false as const,
  };
}

function rightsBlockers(
  rights: FR300R1ZBMReferenceRightsReceipt,
): FR300R1ZBMBenchmarkPairBlocker[] {
  const blockers: FR300R1ZBMBenchmarkPairBlocker[] = [];
  if (rights.internalResearchUse !== 'explicitly_allowed') {
    blockers.push(
      'reference_rights_internal_research_unresolved',
    );
  }
  if (
    rights.commercialResearchAndDevelopment !==
      'explicitly_allowed'
  ) {
    blockers.push(
      'reference_rights_commercial_rnd_unresolved',
    );
  }
  return blockers;
}

export function assessFR300R1ZBMBenchmarkPair(
  input: FR300R1ZBMBenchmarkPairInput,
): FR300R1ZBMBenchmarkPairAssessment {
  assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract();

  if (
    input.schemaVersion !==
      'fr300-r1z-bm-benchmark-pair-input-v1' ||
    input.candidate.schemaVersion !==
      'fr300-r1z-bm-candidate-observation-v1' ||
    input.reference.schemaVersion !==
      'fr300-r1z-bm-reference-observation-v1' ||
    input.reference.rights.schemaVersion !==
      'fr300-r1z-bm-reference-rights-receipt-v1'
  ) {
    fail('benchmark pair schemaVersion drift.');
  }

  const blockers: FR300R1ZBMBenchmarkPairBlocker[] = [];
  const candidate = input.candidate;
  const reference = input.reference;
  const bundle = reference.bundle;

  if (!nonEmpty(candidate.evidence.candidateRef)) {
    blockers.push('candidate_ref_missing');
  }
  if (!SHA256.test(candidate.evidence.candidateArtifactDigest)) {
    blockers.push('candidate_digest_invalid');
  }
  if (!nonEmpty(bundle.bundleId)) {
    blockers.push('reference_ref_missing');
  }

  if (
    candidate.evidence.featureKey !== FR300_R1Z_BM_FIRST_TARGET ||
    candidate.evidence.sourceCameraClass !==
      'ordinary_smartphone_rgb_front_camera' ||
    candidate.evidence.sourceRgbOnly !== true ||
    candidate.evidence.specialDepthHardwareConsumed !== false ||
    candidate.evidence.metric3DInputConsumed !== false ||
    candidate.evidence.physicalMillimeterOutputClaimed !== false ||
    candidate.evidence.candidateOutputSemantics !==
      'unitless_relative_shape_only' ||
    candidate.evidence.traditionalSemanticBindingClaimed !== false
  ) {
    fail('candidate product lane boundary drift.');
  }

  finiteUnitRatio(candidate.candidateScalar, 'candidateScalar');

  if (
    candidate.capture.deviceClass !==
      'ordinary_smartphone_rgb_front_camera' ||
    candidate.capture.distanceCm <
      FR300_R1Z_BM_CAPTURE_POLICY.minimumDistanceCm ||
    candidate.capture.distanceCm >
      FR300_R1Z_BM_CAPTURE_POLICY.maximumDistanceCm
  ) {
    blockers.push(
      'capture_distance_outside_product_boundary',
    );
  }

  if (
    !nonEmpty(candidate.subjectBindingRef) ||
    candidate.subjectBindingRef !== reference.subjectBindingRef
  ) {
    blockers.push('subject_binding_mismatch');
  }

  if (
    candidate.rgbObservationRef !==
      bundle.rgbBinding.rgbObservationRef
  ) {
    blockers.push('rgb_observation_binding_mismatch');
  }

  if (
    bundle.targetFeatureKey !== FR300_R1Z_BM_FIRST_TARGET ||
    bundle.reference.referenceAxisDefinitionRef !==
      FR298_REFERENCE_AXIS_DEFINITION_REF ||
    bundle.source.metricScaleVerified !== true ||
    bundle.source.independentFromCandidateProvider !== true ||
    bundle.registration.externallyValidated !== true ||
    bundle.registration.candidateProviderIndependent !== true ||
    bundle.rgbBinding.correspondenceVerified !== true
  ) {
    blockers.push('reference_not_fr299_grade');
  }

  if (
    bundle.reference.referenceFrozenBeforeRgbCandidateScoring !==
      true
  ) {
    blockers.push(
      'reference_not_frozen_before_candidate_scoring',
    );
  }

  if (
    reference.rawRgbCommittedToGit ||
    reference.raw3DCommittedToGit ||
    reference.rawDepthCommittedToGit
  ) {
    fail('raw biometric/reference artifacts may not be committed to Git.');
  }

  if (!nonEmpty(reference.rights.rightsEvidenceRef)) {
    fail('reference rights evidence ref is required.');
  }
  blockers.push(...rightsBlockers(reference.rights));

  const fr295 = assessFR295BenchmarkAdmission({
    schemaVersion:
      'fr295-rgb-relative-3d-benchmark-admission-input-v1',
    candidate: candidate.evidence,
    reference: toFR295Reference(bundle),
  });
  if (fr295.status !== 'admitted_for_descriptive_benchmark_only') {
    blockers.push('reference_not_fr299_grade');
  }

  const uniqueBlockers = Object.freeze([...new Set(blockers)]);
  if (uniqueBlockers.length > 0) {
    return Object.freeze({
      schemaVersion:
        'fr300-r1z-bm-benchmark-pair-assessment-v1' as const,
      status: 'blocked' as const,
      blockers: uniqueBlockers,
      observation: null,
    });
  }

  const referenceScalar = finiteUnitRatio(
    bundle.reference.value,
    'referenceScalar',
  );
  const signedError =
    candidate.candidateScalar - referenceScalar;
  const absoluteError = Math.abs(signedError);
  const relativeError =
    referenceScalar === 0
      ? null
      : absoluteError / Math.abs(referenceScalar);

  return Object.freeze({
    schemaVersion:
      'fr300-r1z-bm-benchmark-pair-assessment-v1' as const,
    status: 'admitted_for_descriptive_benchmark_only' as const,
    blockers: uniqueBlockers,
    observation: Object.freeze({
      schemaVersion:
        'fr300-r1z-bm-benchmark-observation-v1' as const,
      featureKey: FR300_R1Z_BM_FIRST_TARGET,
      candidateRef: candidate.evidence.candidateRef,
      referenceBundleId: bundle.bundleId,
      subjectBindingRef: candidate.subjectBindingRef,
      candidateScalar: candidate.candidateScalar,
      referenceScalar,
      signedError,
      absoluteError,
      relativeError,
      capture: candidate.capture,
      authorityBoundary: Object.freeze({
        descriptiveObservationOnly: true as const,
        acceptanceThresholdIssued: false as const,
        benchmarkWinnerIssued: false as const,
        calibrationIssued: false as const,
        classifierIssued: false as const,
        traditionalBindingIssued: false as const,
        productColumnMaterialized: false as const,
        productionActivated: false as const,
        commerceActivated: false as const,
      }),
    }),
  });
}

export function aggregateFR300R1ZBMBenchmarkObservations(
  observations: readonly FR300R1ZBMBenchmarkObservation[],
): FR300R1ZBMCohortAggregate {
  assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract();

  if (observations.length === 0) {
    fail('cohort aggregate requires at least one observation.');
  }

  for (const observation of observations) {
    if (
      observation.schemaVersion !==
        'fr300-r1z-bm-benchmark-observation-v1' ||
      observation.featureKey !== FR300_R1Z_BM_FIRST_TARGET
    ) {
      fail('cohort observation contract drift.');
    }
  }

  const signed = observations.map(
    (observation) => observation.signedError,
  );
  const absolute = observations.map(
    (observation) => observation.absoluteError,
  );
  const candidate = observations.map(
    (observation) => observation.candidateScalar,
  );
  const reference = observations.map(
    (observation) => observation.referenceScalar,
  );
  const bias = mean(signed);
  const variance = mean(
    signed.map((value) => (value - bias) ** 2),
  );

  const stratumKeys = Object.freeze(
    observations.map((observation) =>
      [
        `distance:${observation.capture.distanceCm}`,
        `yaw:${observation.capture.yawBin}`,
        `pitch:${observation.capture.pitchBin}`,
        `device:${observation.capture.deviceRef}`,
        `lighting:${observation.capture.lightingBin}`,
      ].join('|'),
    ),
  );

  return Object.freeze({
    schemaVersion:
      'fr300-r1z-bm-cohort-aggregate-v1' as const,
    featureKey: FR300_R1Z_BM_FIRST_TARGET,
    sampleCount: observations.length,
    meanAbsoluteError: mean(absolute),
    medianAbsoluteError: median(absolute),
    meanSignedBias: bias,
    signedErrorStandardDeviation: Math.sqrt(variance),
    spearmanRankCorrelation: pearson(
      rank(candidate),
      rank(reference),
    ),
    stratumKeys,
    authorityBoundary: Object.freeze({
      descriptiveAggregateOnly: true as const,
      acceptanceThresholdIssued: false as const,
      benchmarkWinnerIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export function assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR293ProductColumnMap();
  assertFR295RgbRelative3DBenchmarkProtocol();
  assertFR298NeutralNoseRelativeProjectionAxisAuthority();
  assertFR299Independent3DNoseReferenceBundleContract();
  assertFR300R1YRCHistoricalReconciliationContract();

  if (
    FR295_RGB_RELATIVE_3D_BENCHMARK_CONTRACT_VERSION !==
      'FR295-RGB-RELATIVE-3D-BENCHMARK-PROTOCOL-v1' ||
    FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION !==
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1' ||
    FR300_R1Y_RC_HISTORICAL_REAL_DEVICE_RECONCILIATION_CONTRACT_VERSION !==
      'FR300-R1Y-RC-HISTORICAL-REAL-DEVICE-RECONCILIATION-v1'
  ) {
    fail('predecessor contract version drift.');
  }

  const target =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .find(
        (entry) =>
          entry.featureKey === FR300_R1Z_BM_FIRST_TARGET,
      );

  if (
    target === undefined ||
    target.observationClass !== 'rgb_relative_3d_shape' ||
    target.readiness !== 'relative_3d_benchmark_required' ||
    target.specialDepthHardwareRequired !== false ||
    target.metric3DRequired !== false ||
    target.traditionalBindingIssued !== false
  ) {
    fail('FR282 target authority drift.');
  }

  if (
    FR300_R1Y_RC_CURRENT_GATE.disposition !==
      'historical_evidence_reconciled_rgb_selfie_benchmark_next' ||
    FR300_R1Y_RC_CURRENT_GATE.arcoreRawDepthLane !==
      'operational_research_reference_candidate_only' ||
    FR300_R1Y_RC_CURRENT_GATE.arcoreMetricAccuracyValidatedForFR299 ||
    FR300_R1Y_RC_CURRENT_GATE.arcoreRepeatabilityValidatedForFR299 ||
    FR300_R1Y_RC_CURRENT_GATE.specialDepthMayBecomeProductRequirement
  ) {
    fail('R1Y-RC benchmark handoff drift.');
  }

  if (
    FR300_R1Z_BM_CAPTURE_POLICY.cameraClass !==
      'ordinary_smartphone_rgb_front_camera' ||
    FR300_R1Z_BM_CAPTURE_POLICY.minimumDistanceCm !== 25 ||
    FR300_R1Z_BM_CAPTURE_POLICY.maximumDistanceCm !== 30 ||
    FR300_R1Z_BM_CAPTURE_POLICY.specialDepthHardwareRequired ||
    FR300_R1Z_BM_CAPTURE_POLICY.arcoreRequired ||
    FR300_R1Z_BM_CAPTURE_POLICY.physicalMillimeterProductOutputRequired
  ) {
    fail('product capture boundary widened.');
  }

  if (
    FR300_R1Z_BM_REFERENCE_AUTHORITY
      .finalBenchmarkReferenceClass !==
      'fr299_grade_independent_metric_3d_only' ||
    !FR300_R1Z_BM_REFERENCE_AUTHORITY
      .sameCaptureOrValidatedRegistrationRequired ||
    !FR300_R1Z_BM_REFERENCE_AUTHORITY.metricScaleVerifiedRequired ||
    !FR300_R1Z_BM_REFERENCE_AUTHORITY.providerIndependentRequired ||
    !FR300_R1Z_BM_REFERENCE_AUTHORITY
      .candidateProviderOutputBlindRequired ||
    !FR300_R1Z_BM_REFERENCE_AUTHORITY
      .candidateProviderIndexBlindRequired ||
    !FR300_R1Z_BM_REFERENCE_AUTHORITY.traditionalLabelBlindRequired ||
    !FR300_R1Z_BM_REFERENCE_AUTHORITY
      .referenceFrozenBeforeCandidateScoringRequired ||
    FR300_R1Z_BM_REFERENCE_AUTHORITY
      .candidateDerivedGeometryMayServeAsReference
  ) {
    fail('reference authority widened.');
  }

  if (
    FR300_R1Z_BM_PRIVACY_POLICY.rawRgbMayBeCommittedToGit ||
    FR300_R1Z_BM_PRIVACY_POLICY.raw3DMayBeCommittedToGit ||
    FR300_R1Z_BM_PRIVACY_POLICY.rawDepthMayBeCommittedToGit ||
    !FR300_R1Z_BM_PRIVACY_POLICY.derivedScalarReceiptMayBePersisted ||
    !FR300_R1Z_BM_PRIVACY_POLICY.artifactDigestMayBePersisted ||
    !FR300_R1Z_BM_PRIVACY_POLICY.governedOpaqueRefMayBePersisted ||
    !FR300_R1Z_BM_PRIVACY_POLICY.aggregateMetricMayBePersisted
  ) {
    fail('privacy persistence boundary drift.');
  }

  const gate = FR300_R1Z_BM_CURRENT_GATE;
  if (
    gate.disposition !==
      'benchmark_strategy_frozen_reference_acquisition_next' ||
    gate.firstBenchmarkTarget !==
      'nose.tip_bridge.relative_projection'.replace(
        '.relative_projection',
        '_bridge_relative_projection',
      )
  ) {
    fail('benchmark gate identity drift.');
  }

  if (
    !gate.productCandidateLaneFrozen ||
    !gate.independentReferenceAuthorityFrozen ||
    !gate.correspondenceRulesFrozen ||
    !gate.evaluationSchemaFrozen ||
    !gate.leakagePreventionFrozen ||
    !gate.privacyAndRightsSchemaFrozen ||
    gate.datasetAcquiredByThisStage ||
    gate.humanSubjectCapturedByThisStage ||
    gate.realBenchmarkPairMaterializedByThisStage ||
    gate.acceptanceThresholdIssued ||
    gate.benchmarkWinnerIssued ||
    gate.newSpecialDepthProductDependencyCreated ||
    gate.paidSpendAuthorized ||
    gate.fr299EligibleCandidateCount !== 0 ||
    gate.fr300R2EligibleCandidateCount !== 0 ||
    gate.authority.fr299ReferenceMaterialized ||
    gate.authority.fr300R2Authorized ||
    gate.authority.traditionalBindingIssued ||
    gate.authority.productColumnMaterialized ||
    gate.authority.productionActivated ||
    gate.authority.commerceActivated
  ) {
    fail('R1Z-BM widened benchmark or product authority.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState ===
      'canonical_extractor_materialized',
  ).length;
  if (
    materializedCount !== 18 ||
    gate.productMaterialization !== '18/29'
  ) {
    fail('R1Z-BM must preserve 18/29 product materialization.');
  }
}

assertFR300R1ZBMRgbSelfieIndependentBenchmarkContract();
