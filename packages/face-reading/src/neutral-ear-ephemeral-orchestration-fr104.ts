import type {
  NeutralEarSameFrameScreenGeometryFR104V1,
} from './neutral-ear-same-frame-face-envelope-adapter-fr104.js';
import {
  deriveNeutralEarCandidateShapeEvidenceFR104,
  deriveNeutralEarFaceRelativeEvidenceFR104,
  type NeutralEarCandidateShapeInputFR104V1,
} from './neutral-ear-plausibility-evidence-fr104.js';
import {
  deriveNeutralEarSameFrameFaceEnvelopeFR104,
} from './neutral-ear-same-frame-face-envelope-adapter-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarExifOrientationStateFR104V1 =
  | 'absent_or_not_required'
  | 'present_transform_applied_before_both_pipelines'
  | 'present_transform_not_applied_before_both_pipelines'
  | 'unknown';

export type NeutralEarFrontCameraMirrorStateFR104V1 =
  | 'mirrored'
  | 'not_mirrored'
  | 'unknown';

export type NeutralEarProvenanceEvidenceSourceFR104V1 =
  | 'capture_pipeline_attestation'
  | 'operator_declaration'
  | 'unknown';

export interface NeutralEarOrientationMirrorProvenanceFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-orientation-mirror-provenance-v1';
  readonly sharedDecodedPixelFrame: {
    readonly candidateAndGeometrySamePixelOrientationAttested: true;
    readonly independentlyVerified: boolean;
  };
  readonly exifOrientation: {
    readonly state: NeutralEarExifOrientationStateFR104V1;
    readonly source: NeutralEarProvenanceEvidenceSourceFR104V1;
    readonly independentlyVerified: false;
  };
  readonly frontCameraMirror: {
    readonly state: NeutralEarFrontCameraMirrorStateFR104V1;
    readonly source: NeutralEarProvenanceEvidenceSourceFR104V1;
    readonly independentlyVerified: false;
  };
}

export interface NeutralEarEphemeralOrchestrationRequestFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-ephemeral-orchestration-request-v1';
  readonly candidate: NeutralEarCandidateShapeInputFR104V1;
  readonly candidateFrame: {
    readonly width: number;
    readonly height: number;
  };
  readonly sameFrameAttested: true;
  readonly geometry: NeutralEarSameFrameScreenGeometryFR104V1;
  readonly orientationMirrorProvenance:
    NeutralEarOrientationMirrorProvenanceFR104V1;
}

export interface NeutralEarEphemeralOrchestrationResultFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-ephemeral-orchestration-result-v1';
  readonly authorityState:
    'ephemeral_descriptive_candidate_bundle_only_no_acceptance';
  readonly candidateRef: string;
  readonly providerRunRef: string;
  readonly shapeEvidence: {
    readonly pointCount: number;
    readonly bboxShortToLongRatio: number;
    readonly polygonAreaToBBoxAreaRatio: number;
    readonly fourPiAreaToPerimeterSquared: number;
  };
  readonly faceRelativeEvidence: {
    readonly candidateCentroidOffsetFromFaceCenterXInFaceWidths: number;
    readonly candidateCentroidAbsoluteOffsetFromFaceCenterXInFaceWidths: number;
    readonly candidateCentroidOffsetFromFaceCenterYInFaceHeights: number;
    readonly candidateBBoxWidthToFaceWidth: number;
    readonly candidateBBoxHeightToFaceHeight: number;
    readonly candidatePolygonAreaToFaceBoxArea: number;
    readonly imageSpaceHorizontalSign: 'negative' | 'zero' | 'positive';
  };
  readonly provenance: NeutralEarOrientationMirrorProvenanceFR104V1;
  readonly laterality: {
    readonly anatomicalSide: 'unknown';
    readonly blockers: readonly (
      | 'same_pixel_frame_not_independently_verified'
      | 'exif_orientation_provenance_unresolved'
      | 'front_camera_mirror_provenance_unresolved'
      | 'anatomical_mapping_not_implemented'
    )[];
    readonly promptSideConsumedAsAnatomicalSide: false;
    readonly imageSpaceHorizontalSignConsumedAsAnatomicalSide: false;
  };
  readonly privacy: {
    readonly sourceImagePersisted: false;
    readonly sourceImageDigestPersisted: false;
    readonly rawCandidatePolygonReturned: false;
    readonly rawScreenLandmarksReturned: false;
    readonly rawMetricLandmarksReturned: false;
    readonly poseTransformMatrixReturned: false;
  };
  readonly authority: {
    readonly pairAgreementUsedAsAcceptance: false;
    readonly shapeThresholdApplied: false;
    readonly lateralZoneThresholdApplied: false;
    readonly plausibilityClassificationIssued: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservation: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-104 ${message}`);
}

function validateProvenance(
  provenance: NeutralEarOrientationMirrorProvenanceFR104V1,
): NeutralEarOrientationMirrorProvenanceFR104V1 {
  if (
    provenance.schemaVersion
      !== 'fr104-neutral-ear-orientation-mirror-provenance-v1'
    || provenance.sharedDecodedPixelFrame
      .candidateAndGeometrySamePixelOrientationAttested !== true
    || typeof provenance.sharedDecodedPixelFrame.independentlyVerified
      !== 'boolean'
    || provenance.exifOrientation.independentlyVerified !== false
    || provenance.frontCameraMirror.independentlyVerified !== false
  ) {
    fail('orientation/mirror provenance contract is malformed or widens verification authority.');
  }

  const exifKnown = provenance.exifOrientation.state !== 'unknown';
  if (
    (exifKnown && provenance.exifOrientation.source === 'unknown')
    || (!exifKnown && provenance.exifOrientation.source !== 'unknown')
  ) {
    fail('EXIF orientation state/source must preserve explicit unknown provenance.');
  }

  const mirrorKnown = provenance.frontCameraMirror.state !== 'unknown';
  if (
    (mirrorKnown && provenance.frontCameraMirror.source === 'unknown')
    || (!mirrorKnown && provenance.frontCameraMirror.source !== 'unknown')
  ) {
    fail('front-camera mirror state/source must preserve explicit unknown provenance.');
  }

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-orientation-mirror-provenance-v1' as const,
    sharedDecodedPixelFrame: Object.freeze({
      candidateAndGeometrySamePixelOrientationAttested: true as const,
      independentlyVerified:
        provenance.sharedDecodedPixelFrame.independentlyVerified,
    }),
    exifOrientation: Object.freeze({
      state: provenance.exifOrientation.state,
      source: provenance.exifOrientation.source,
      independentlyVerified: false as const,
    }),
    frontCameraMirror: Object.freeze({
      state: provenance.frontCameraMirror.state,
      source: provenance.frontCameraMirror.source,
      independentlyVerified: false as const,
    }),
  });
}

function lateralityBlockers(
  provenance: NeutralEarOrientationMirrorProvenanceFR104V1,
): NeutralEarEphemeralOrchestrationResultFR104V1['laterality']['blockers'] {
  const blockers: Array<
    NeutralEarEphemeralOrchestrationResultFR104V1['laterality']['blockers'][number]
  > = [];

  if (!provenance.sharedDecodedPixelFrame.independentlyVerified) {
    blockers.push('same_pixel_frame_not_independently_verified');
  }
  if (provenance.exifOrientation.state === 'unknown') {
    blockers.push('exif_orientation_provenance_unresolved');
  }
  if (provenance.frontCameraMirror.state === 'unknown') {
    blockers.push('front_camera_mirror_provenance_unresolved');
  }
  blockers.push('anatomical_mapping_not_implemented');

  return Object.freeze(blockers);
}

export function orchestrateNeutralEarCandidateFR104(
  request: NeutralEarEphemeralOrchestrationRequestFR104V1,
): NeutralEarEphemeralOrchestrationResultFR104V1 {
  if (
    request.schemaVersion
      !== 'fr104-neutral-ear-ephemeral-orchestration-request-v1'
    || request.sameFrameAttested !== true
  ) {
    fail('ephemeral orchestration request must preserve the explicit same-frame attestation boundary.');
  }

  const provenance = validateProvenance(
    request.orientationMirrorProvenance,
  );

  const shape = deriveNeutralEarCandidateShapeEvidenceFR104(
    request.candidate,
  );
  const envelope = deriveNeutralEarSameFrameFaceEnvelopeFR104({
    schemaVersion:
      'fr104-neutral-ear-same-frame-envelope-request-v1',
    candidateFrame: request.candidateFrame,
    sameFrameAttested: true,
    geometry: request.geometry,
  });
  const relative = deriveNeutralEarFaceRelativeEvidenceFR104(
    shape,
    envelope.faceEnvelope,
  );

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-ephemeral-orchestration-result-v1' as const,
    authorityState:
      'ephemeral_descriptive_candidate_bundle_only_no_acceptance' as const,
    candidateRef: shape.candidateRef,
    providerRunRef: envelope.providerRunRef,
    shapeEvidence: Object.freeze({
      pointCount: shape.pointCount,
      bboxShortToLongRatio:
        shape.shapeEvidence.bboxShortToLongRatio,
      polygonAreaToBBoxAreaRatio:
        shape.shapeEvidence.polygonAreaToBBoxAreaRatio,
      fourPiAreaToPerimeterSquared:
        shape.shapeEvidence.fourPiAreaToPerimeterSquared,
    }),
    faceRelativeEvidence: Object.freeze({
      candidateCentroidOffsetFromFaceCenterXInFaceWidths:
        relative.candidateCentroidOffsetFromFaceCenterXInFaceWidths,
      candidateCentroidAbsoluteOffsetFromFaceCenterXInFaceWidths:
        relative.candidateCentroidAbsoluteOffsetFromFaceCenterXInFaceWidths,
      candidateCentroidOffsetFromFaceCenterYInFaceHeights:
        relative.candidateCentroidOffsetFromFaceCenterYInFaceHeights,
      candidateBBoxWidthToFaceWidth:
        relative.candidateBBoxWidthToFaceWidth,
      candidateBBoxHeightToFaceHeight:
        relative.candidateBBoxHeightToFaceHeight,
      candidatePolygonAreaToFaceBoxArea:
        relative.candidatePolygonAreaToFaceBoxArea,
      imageSpaceHorizontalSign:
        relative.imageSpaceHorizontalSign,
    }),
    provenance,
    laterality: Object.freeze({
      anatomicalSide: 'unknown' as const,
      blockers: lateralityBlockers(provenance),
      promptSideConsumedAsAnatomicalSide: false as const,
      imageSpaceHorizontalSignConsumedAsAnatomicalSide: false as const,
    }),
    privacy: Object.freeze({
      sourceImagePersisted: false as const,
      sourceImageDigestPersisted: false as const,
      rawCandidatePolygonReturned: false as const,
      rawScreenLandmarksReturned: false as const,
      rawMetricLandmarksReturned: false as const,
      poseTransformMatrixReturned: false as const,
    }),
    authority: Object.freeze({
      pairAgreementUsedAsAcceptance: false as const,
      shapeThresholdApplied: false as const,
      lateralZoneThresholdApplied: false as const,
      plausibilityClassificationIssued: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservation: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
