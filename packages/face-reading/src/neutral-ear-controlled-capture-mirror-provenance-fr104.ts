import {
  CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B,
  CONTROLLED_CAPTURE_PROFILES_FR21B,
  validateControlledCaptureProfileAttestationFR21B,
} from './controlled-capture-attestation-fr21b.js';
import type {
  NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';
import type {
  NeutralEarFrameTransformParityFR104V1,
} from './neutral-ear-frame-transform-parity-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarControlledCaptureSourceFR104V1 =
  | Readonly<{
      kind: 'ordinary_file_upload';
    }>
  | Readonly<{
      kind: 'controlled_capture_profile';
      profileRef: string;
    }>;

export type NeutralEarControlledCaptureMirrorProvenanceBlockerFR104V1 =
  | 'ordinary_file_upload_is_not_controlled_capture'
  | 'controlled_capture_profile_not_admitted'
  | 'controlled_capture_profile_not_verified'
  | 'controlled_capture_profile_calibration_not_reviewed'
  | 'exact_runtime_frame_to_profile_binding_not_implemented'
  | 'consumer_frame_reflection_parity_unresolved'
  | 'same_pixel_frame_not_independently_verified';

export interface NeutralEarControlledCaptureMirrorProvenanceRequestFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1';
  readonly source: NeutralEarControlledCaptureSourceFR104V1;
  readonly frameTransformParity:
    NeutralEarFrameTransformParityFR104V1;
  readonly pixelIdentityEvidence:
    NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
}

export interface NeutralEarControlledCaptureMirrorProvenanceFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-controlled-capture-mirror-provenance-v1';
  readonly authorityState:
    'controlled_capture_mirror_provenance_bridge_fail_closed';
  readonly sourceKind:
    NeutralEarControlledCaptureSourceFR104V1['kind'];
  readonly profileRef: string | null;
  readonly staticProfileEvidence: {
    readonly admittedProfileFound: boolean;
    readonly profileVerified: boolean;
    readonly allReferencedCalibrationReviewed: boolean;
  };
  readonly exactRuntimeBinding: {
    readonly consumerFrameEvidenceBoundToProfileImplementation: false;
    readonly bindingMechanismState: 'not_implemented';
  };
  readonly evidenceBinding: {
    readonly frameTransformParityObjectIdentityBound: true;
    readonly pixelIdentityEvidenceObjectIdentityBound: true;
    readonly samePixelBytesIndependentlyVerified: boolean;
    readonly consumerFrameReflectionParityResolved: boolean;
  };
  readonly subjectRelativeMirrorProvenanceVerified: false;
  readonly subjectRelativeSourcePixelMirrorPolicy: 'unknown';
  readonly blockers: readonly NeutralEarControlledCaptureMirrorProvenanceBlockerFR104V1[];
  readonly privacy: {
    readonly rawFrameBytesRetained: false;
    readonly rawProviderLandmarksReturned: false;
    readonly rawProviderLandmarksPersisted: false;
    readonly transformedRasterPersisted: false;
    readonly imageDigestReturned: false;
    readonly imageDigestPersisted: false;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly ordinaryFileUploadPromotedToControlledCapture: false;
    readonly previewMirrorPromotedToSavedPixelAuthority: false;
    readonly providerSideLabelPromotedToAnatomicalSide: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

const ISSUED_PROVENANCE = new WeakSet<object>();
const EVIDENCE_BINDING = new WeakMap<
  object,
  Readonly<{
    frameTransformParity: NeutralEarFrameTransformParityFR104V1;
    pixelIdentityEvidence:
      NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
  }>
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 controlled capture mirror provenance ${message}`,
  );
}

function nonEmpty(value: string, label: string): string {
  if (value.trim().length === 0) {
    fail(`${label} must be non-empty.`);
  }
  return value;
}

function uniqueBlockers(
  blockers: readonly NeutralEarControlledCaptureMirrorProvenanceBlockerFR104V1[],
): readonly NeutralEarControlledCaptureMirrorProvenanceBlockerFR104V1[] {
  return Object.freeze([...new Set(blockers)]);
}

export function resolveNeutralEarControlledCaptureMirrorProvenanceFR104(
  request: NeutralEarControlledCaptureMirrorProvenanceRequestFR104V1,
): NeutralEarControlledCaptureMirrorProvenanceFR104V1 {
  if (
    request.schemaVersion
      !== 'fr104-neutral-ear-controlled-capture-mirror-provenance-request-v1'
  ) {
    fail('request schema mismatch.');
  }

  const blockers: NeutralEarControlledCaptureMirrorProvenanceBlockerFR104V1[] = [];
  let profileRef: string | null = null;
  let admittedProfileFound = false;
  let profileVerified = false;
  let allReferencedCalibrationReviewed = false;

  if (request.source.kind === 'ordinary_file_upload') {
    blockers.push('ordinary_file_upload_is_not_controlled_capture');
  } else {
    profileRef = nonEmpty(
      request.source.profileRef,
      'source.profileRef',
    );
    const profile = CONTROLLED_CAPTURE_PROFILES_FR21B.find(
      (entry) => entry.profileRef === profileRef,
    );
    admittedProfileFound = profile !== undefined;

    if (profile === undefined) {
      blockers.push('controlled_capture_profile_not_admitted');
    } else {
      validateControlledCaptureProfileAttestationFR21B(
        profile,
        CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B,
      );
      profileVerified = profile.reviewState === 'verified';
      if (!profileVerified) {
        blockers.push('controlled_capture_profile_not_verified');
      }

      const calibrationByRef = new Map(
        CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B.map(
          (entry) => [entry.evidenceRef, entry] as const,
        ),
      );
      allReferencedCalibrationReviewed =
        profile.calibrationEvidenceRefs.length > 0
        && profile.calibrationEvidenceRefs.every(
          (evidenceRef) =>
            calibrationByRef.get(evidenceRef)?.reviewState === 'reviewed',
        );

      if (!allReferencedCalibrationReviewed) {
        blockers.push(
          'controlled_capture_profile_calibration_not_reviewed',
        );
      }
    }
  }

  if (
    request.frameTransformParity.consumerFrame
      .netReflectionParityRelativeToIntendedDisplay === 'unknown'
  ) {
    blockers.push('consumer_frame_reflection_parity_unresolved');
  }

  if (
    request.pixelIdentityEvidence
      .samePixelBytesIndependentlyVerified !== true
  ) {
    blockers.push('same_pixel_frame_not_independently_verified');
  }

  blockers.push(
    'exact_runtime_frame_to_profile_binding_not_implemented',
  );

  const result = Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-controlled-capture-mirror-provenance-v1' as const,
    authorityState:
      'controlled_capture_mirror_provenance_bridge_fail_closed' as const,
    sourceKind: request.source.kind,
    profileRef,
    staticProfileEvidence: Object.freeze({
      admittedProfileFound,
      profileVerified,
      allReferencedCalibrationReviewed,
    }),
    exactRuntimeBinding: Object.freeze({
      consumerFrameEvidenceBoundToProfileImplementation: false as const,
      bindingMechanismState: 'not_implemented' as const,
    }),
    evidenceBinding: Object.freeze({
      frameTransformParityObjectIdentityBound: true as const,
      pixelIdentityEvidenceObjectIdentityBound: true as const,
      samePixelBytesIndependentlyVerified:
        request.pixelIdentityEvidence.samePixelBytesIndependentlyVerified,
      consumerFrameReflectionParityResolved:
        request.frameTransformParity.consumerFrame
          .netReflectionParityRelativeToIntendedDisplay !== 'unknown',
    }),
    subjectRelativeMirrorProvenanceVerified: false as const,
    subjectRelativeSourcePixelMirrorPolicy: 'unknown' as const,
    blockers: uniqueBlockers(blockers),
    privacy: Object.freeze({
      rawFrameBytesRetained: false as const,
      rawProviderLandmarksReturned: false as const,
      rawProviderLandmarksPersisted: false as const,
      transformedRasterPersisted: false as const,
      imageDigestReturned: false as const,
      imageDigestPersisted: false as const,
      biometricEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),
    authority: Object.freeze({
      ordinaryFileUploadPromotedToControlledCapture: false as const,
      previewMirrorPromotedToSavedPixelAuthority: false as const,
      providerSideLabelPromotedToAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });

  ISSUED_PROVENANCE.add(result);
  EVIDENCE_BINDING.set(
    result,
    Object.freeze({
      frameTransformParity: request.frameTransformParity,
      pixelIdentityEvidence: request.pixelIdentityEvidence,
    }),
  );

  return result;
}

export function assertIssuedNeutralEarControlledCaptureMirrorProvenanceFR104(
  provenance: NeutralEarControlledCaptureMirrorProvenanceFR104V1,
  evidence: Readonly<{
    frameTransformParity: NeutralEarFrameTransformParityFR104V1;
    pixelIdentityEvidence:
      NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
  }>,
): void {
  if (!ISSUED_PROVENANCE.has(provenance)) {
    fail('result was not issued by the active FR104 bridge.');
  }

  const binding = EVIDENCE_BINDING.get(provenance);
  if (
    binding === undefined
    || binding.frameTransformParity !== evidence.frameTransformParity
    || binding.pixelIdentityEvidence !== evidence.pixelIdentityEvidence
  ) {
    fail(
      'result is not bound to the exact frame-transform and pixel-identity evidence objects consumed by the mapping request.',
    );
  }

  if (
    provenance.schemaVersion
      !== 'fr104-neutral-ear-controlled-capture-mirror-provenance-v1'
    || provenance.authorityState
      !== 'controlled_capture_mirror_provenance_bridge_fail_closed'
    || provenance.subjectRelativeMirrorProvenanceVerified !== false
    || provenance.subjectRelativeSourcePixelMirrorPolicy !== 'unknown'
    || provenance.exactRuntimeBinding
      .consumerFrameEvidenceBoundToProfileImplementation !== false
    || provenance.exactRuntimeBinding.bindingMechanismState
      !== 'not_implemented'
  ) {
    fail('issued result authority boundary drift.');
  }
}
