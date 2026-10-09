import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-geometric-empirical-evidence-fr104.js';
import type {
  NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';
import type {
  NeutralEarFrameTransformParityFR104V1,
} from './neutral-ear-frame-transform-parity-fr104.js';
import {
  assertIssuedNeutralEarControlledCaptureMirrorProvenanceFR104,
  type NeutralEarControlledCaptureMirrorProvenanceFR104V1,
} from './neutral-ear-controlled-capture-mirror-provenance-fr104.js';
import {
  NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104,
} from './neutral-ear-provider-mirror-semantics-review-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface NeutralEarProviderLateralGeometryInputFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-provider-lateral-geometry-input-v1';
  readonly providerLeftEyeCentroid: {
    readonly x: number;
    readonly y: number;
  };
  readonly providerRightEyeCentroid: {
    readonly x: number;
    readonly y: number;
  };
  readonly candidateCentroid: {
    readonly x: number;
    readonly y: number;
  };
}

export type NeutralEarProviderLateralRelationFR104V1 =
  | 'provider_left_lateral'
  | 'provider_right_lateral'
  | 'between_or_not_beyond_eye_envelope'
  | 'unavailable_degenerate_eye_axis';

export interface NeutralEarProviderLateralGeometryFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-provider-lateral-geometry-v1';
  readonly authorityState:
    'provider_labeled_geometry_only_no_anatomical_mapping';
  readonly relation: NeutralEarProviderLateralRelationFR104V1;
  readonly geometry: {
    readonly eyeAxisLength: number;
    readonly eyeHalfSpan: number;
    readonly candidateProjectionTowardProviderLeft: number | null;
    readonly arbitraryNumericThresholdApplied: false;
  };
  readonly authority: {
    readonly providerRelationMayBeCalledAnatomicalSide: false;
    readonly anatomicalLateralityAuthorized: false;
  };
}

export interface NeutralEarAnatomicalLateralityMappingRequestFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-anatomical-laterality-mapping-request-v1';
  readonly runtime: {
    readonly packageName: '@mediapipe/tasks-vision';
    readonly packageVersion: string;
  };
  readonly providerLateralGeometry:
    NeutralEarProviderLateralGeometryFR104V1;
  readonly frameTransformParity:
    NeutralEarFrameTransformParityFR104V1;
  readonly pixelIdentityEvidence:
    NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
  readonly controlledCaptureMirrorProvenance:
    NeutralEarControlledCaptureMirrorProvenanceFR104V1;
  readonly evidenceUse: {
    readonly florencePromptSideConsumedAsAnatomicalSide: false;
    readonly imageSpaceXSignConsumedAsAnatomicalSide: false;
  };
}

export interface NeutralEarAnatomicalLateralityMappingResultFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-anatomical-laterality-mapping-result-v1';
  readonly authorityState:
    'mapping_skeleton_fail_closed_capture_provenance_unavailable';
  readonly anatomicalSide: 'unknown';
  readonly providerLateralRelation:
    NeutralEarProviderLateralRelationFR104V1;
  readonly frameReflectionParity:
    NeutralEarFrameTransformParityFR104V1['consumerFrame']['netReflectionParityRelativeToIntendedDisplay'];
  readonly blockers: readonly (
    | 'runtime_not_exactly_reviewed'
    | 'cross_source_geometric_mapping_not_admitted'
    | 'frame_reflection_parity_unresolved'
    | 'same_pixel_frame_not_independently_verified'
    | 'candidate_not_outside_provider_eye_envelope'
    | 'subject_relative_capture_mirror_provenance_unavailable'
    | 'anatomical_mapping_not_admitted'
  )[];
  readonly authority: {
    readonly providerPromptSideConsumedAsAnatomicalSide: false;
    readonly imageSpaceXSignConsumedAsAnatomicalSide: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 anatomical mapping ${message}`,
  );
}

function unitPoint(
  point: Readonly<{ x: number; y: number }>,
  label: string,
): Readonly<{ x: number; y: number }> {
  if (
    !Number.isFinite(point.x)
    || !Number.isFinite(point.y)
    || point.x < 0
    || point.x > 1
    || point.y < 0
    || point.y > 1
  ) {
    fail(`${label} must be finite normalized coordinates within [0,1].`);
  }
  return point;
}

export function deriveNeutralEarProviderLateralGeometryFR104(
  input: NeutralEarProviderLateralGeometryInputFR104V1,
): NeutralEarProviderLateralGeometryFR104V1 {
  if (
    input.schemaVersion
      !== 'fr104-neutral-ear-provider-lateral-geometry-input-v1'
  ) {
    fail('provider lateral geometry input schema mismatch.');
  }

  const left = unitPoint(
    input.providerLeftEyeCentroid,
    'providerLeftEyeCentroid',
  );
  const right = unitPoint(
    input.providerRightEyeCentroid,
    'providerRightEyeCentroid',
  );
  const candidate = unitPoint(
    input.candidateCentroid,
    'candidateCentroid',
  );

  const dx = left.x - right.x;
  const dy = left.y - right.y;
  const eyeAxisLength = Math.hypot(dx, dy);
  const eyeHalfSpan = eyeAxisLength / 2;

  if (eyeAxisLength === 0) {
    return Object.freeze({
      schemaVersion:
        'fr104-neutral-ear-provider-lateral-geometry-v1' as const,
      authorityState:
        'provider_labeled_geometry_only_no_anatomical_mapping' as const,
      relation:
        'unavailable_degenerate_eye_axis' as const,
      geometry: Object.freeze({
        eyeAxisLength,
        eyeHalfSpan,
        candidateProjectionTowardProviderLeft: null,
        arbitraryNumericThresholdApplied: false as const,
      }),
      authority: Object.freeze({
        providerRelationMayBeCalledAnatomicalSide:
          false as const,
        anatomicalLateralityAuthorized: false as const,
      }),
    });
  }

  const midpointX = (left.x + right.x) / 2;
  const midpointY = (left.y + right.y) / 2;
  const unitX = dx / eyeAxisLength;
  const unitY = dy / eyeAxisLength;
  const projection =
    (candidate.x - midpointX) * unitX
    + (candidate.y - midpointY) * unitY;

  const relation: NeutralEarProviderLateralRelationFR104V1 =
    projection > eyeHalfSpan
      ? 'provider_left_lateral'
      : projection < -eyeHalfSpan
        ? 'provider_right_lateral'
        : 'between_or_not_beyond_eye_envelope';

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-provider-lateral-geometry-v1' as const,
    authorityState:
      'provider_labeled_geometry_only_no_anatomical_mapping' as const,
    relation,
    geometry: Object.freeze({
      eyeAxisLength,
      eyeHalfSpan,
      candidateProjectionTowardProviderLeft: projection,
      arbitraryNumericThresholdApplied: false as const,
    }),
    authority: Object.freeze({
      providerRelationMayBeCalledAnatomicalSide:
        false as const,
      anatomicalLateralityAuthorized: false as const,
    }),
  });
}

export function attemptNeutralEarAnatomicalLateralityMappingFR104(
  request: NeutralEarAnatomicalLateralityMappingRequestFR104V1,
): NeutralEarAnatomicalLateralityMappingResultFR104V1 {
  if (
    request.schemaVersion
      !== 'fr104-neutral-ear-anatomical-laterality-mapping-request-v1'
  ) {
    fail('mapping request schema mismatch.');
  }
  if (
    request.evidenceUse
      .florencePromptSideConsumedAsAnatomicalSide !== false
    || request.evidenceUse
      .imageSpaceXSignConsumedAsAnatomicalSide !== false
  ) {
    fail(
      'Florence prompt side and image-space X sign are prohibited as anatomical authority.',
    );
  }

  const blockers: Array<
    NeutralEarAnatomicalLateralityMappingResultFR104V1['blockers'][number]
  > = [];

  const reviewedRuntime =
    NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104
      .evidence.runtime;
  if (
    request.runtime.packageName !== reviewedRuntime.packageName
    || request.runtime.packageVersion
      !== reviewedRuntime.packageVersion
  ) {
    blockers.push('runtime_not_exactly_reviewed');
  }

  const crossSourceEvidence =
    NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_EMPIRICAL_EVIDENCE_FR104;
  if (
    crossSourceEvidence.state
      !== 'gnm_cross_source_geometric_mapping_supported'
    || crossSourceEvidence.authority
      .gnmCrossSourceSemanticWitnessAudited !== true
    || crossSourceEvidence.authority
      .gnmCrossSourceFixtureDigestPinned !== true
    || crossSourceEvidence.authority
      .gnmCrossSourceGeometricValidationExecuted !== true
    || crossSourceEvidence.authority
      .gnmCrossSourceGeometricMappingValidated !== true
  ) {
    blockers.push('cross_source_geometric_mapping_not_admitted');
  }

  if (
    request.frameTransformParity.consumerFrame
      .netReflectionParityRelativeToIntendedDisplay
      === 'unknown'
  ) {
    blockers.push('frame_reflection_parity_unresolved');
  }

  if (
    request.pixelIdentityEvidence
      .samePixelBytesIndependentlyVerified !== true
  ) {
    blockers.push('same_pixel_frame_not_independently_verified');
  }

  if (
    request.providerLateralGeometry.relation
      === 'between_or_not_beyond_eye_envelope'
    || request.providerLateralGeometry.relation
      === 'unavailable_degenerate_eye_axis'
  ) {
    blockers.push('candidate_not_outside_provider_eye_envelope');
  }

  assertIssuedNeutralEarControlledCaptureMirrorProvenanceFR104(
    request.controlledCaptureMirrorProvenance,
    {
      frameTransformParity: request.frameTransformParity,
      pixelIdentityEvidence: request.pixelIdentityEvidence,
    },
  );

  if (
    request.controlledCaptureMirrorProvenance
      .subjectRelativeMirrorProvenanceVerified !== true
  ) {
    blockers.push(
      'subject_relative_capture_mirror_provenance_unavailable',
    );
  }
  blockers.push('anatomical_mapping_not_admitted');

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-anatomical-laterality-mapping-result-v1' as const,
    authorityState:
      'mapping_skeleton_fail_closed_capture_provenance_unavailable' as const,
    anatomicalSide: 'unknown' as const,
    providerLateralRelation:
      request.providerLateralGeometry.relation,
    frameReflectionParity:
      request.frameTransformParity.consumerFrame
        .netReflectionParityRelativeToIntendedDisplay,
    blockers: Object.freeze(blockers),
    authority: Object.freeze({
      providerPromptSideConsumedAsAnatomicalSide:
        false as const,
      imageSpaceXSignConsumedAsAnatomicalSide:
        false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
