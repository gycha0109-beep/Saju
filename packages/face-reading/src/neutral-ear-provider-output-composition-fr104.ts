import {
  assertNeutralEarFaceLandmarkerGeometryBoundToInvocationFR104,
  consumeIssuedNeutralEarFaceLandmarkerGeometryFR104,
  type NeutralEarFaceLandmarkerGeometryHandleFR104V1,
} from './neutral-ear-face-landmarker-geometry-handle-fr104.js';
import {
  assertNeutralEarFlorenceCandidateSetBoundToInvocationFR104,
  consumeIssuedNeutralEarFlorenceCandidateSetFR104,
  type NeutralEarFlorenceCandidateSetHandleFR104V1,
  type NeutralEarFlorenceLiveCandidateFR104V1,
} from './neutral-ear-florence-live-host-transport-fr104.js';
import {
  orchestrateNeutralEarCandidateFR104,
  type NeutralEarEphemeralOrchestrationResultFR104V1,
  type NeutralEarOrientationMirrorProvenanceFR104V1,
} from './neutral-ear-ephemeral-orchestration-fr104.js';
import {
  assertIssuedNeutralEarLiveProviderByteRuntimeResultFR104,
  type NeutralEarLiveProviderByteRuntimeResultFR104V1,
} from './neutral-ear-live-provider-byte-runtime-fr104.js';
import type {
  NeutralEarFaceLandmarkerByteAdapterFR104V1,
  NeutralEarFlorenceByteAdapterFR104V1,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import type {
  Mesh6HBrowserCameraHandleV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface NeutralEarComposedProviderCandidateFR104V1 {
  readonly candidateRef: string;
  readonly promptProvenance: 'left_prompt' | 'right_prompt';
  readonly promptSideConsumedAsAnatomicalSide: false;
  readonly descriptiveEvidence:
    NeutralEarEphemeralOrchestrationResultFR104V1;
}

export interface NeutralEarProviderOutputCompositionResultFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-provider-output-composition-result-v1';
  readonly authorityState:
    'same_runtime_provider_outputs_composed_descriptive_only_no_acceptance';
  readonly providerRunRef: string;
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly candidateSummary: {
    readonly leftPromptCount: number;
    readonly rightPromptCount: number;
    readonly totalCount: number;
    readonly allCandidatesPreservedWithoutSelection: true;
    readonly candidateSelectionThresholdApplied: false;
  };
  readonly candidateBundles:
    readonly NeutralEarComposedProviderCandidateFR104V1[];
  readonly bindingEvidence: {
    readonly exactB1RuntimeResultVerified: true;
    readonly florenceHandleBoundToExactInvocationSummary: true;
    readonly faceGeometryHandleBoundToExactInvocationSummary: true;
    readonly providerRunRefMatch: true;
    readonly frameDimensionsMatch: true;
    readonly sameMaterializedRgbaOriginVerifiedForBothProviders: true;
    readonly providerTransformsPreserved: true;
    readonly secondFaceLandmarkerExecutionIntroduced: false;
  };
  readonly provenance:
    NeutralEarOrientationMirrorProvenanceFR104V1;
  readonly blockers: readonly [
    'subject_relative_source_pixel_mirror_provenance_not_verified',
    'verified_controlled_capture_profile_not_available',
    'runtime_anatomical_side_mapping_not_admitted',
  ];
  readonly privacy: {
    readonly rawFrameReturned: false;
    readonly rawFrameBytesReturned: false;
    readonly rawFlorenceProviderResponseReturned: false;
    readonly rawFlorenceCandidatePolygonsReturned: false;
    readonly rawFaceLandmarkerProviderResponseReturned: false;
    readonly rawFaceLandmarkerLandmarksReturned: false;
    readonly rawMetricLandmarksReturned: false;
    readonly poseTransformMatrixReturned: false;
    readonly imageDigestReturned: false;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly descriptiveProviderOutputCompositionCompleted: true;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

const ISSUED_RESULTS = new WeakSet<object>();
const RESULT_INPUTS = new WeakMap<
  object,
  Readonly<{
    runtimeResult: NeutralEarLiveProviderByteRuntimeResultFR104V1;
    florenceHandle: NeutralEarFlorenceCandidateSetHandleFR104V1;
    geometryHandle: NeutralEarFaceLandmarkerGeometryHandleFR104V1;
  }>
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 provider output composition ${message}`,
  );
}

function sameFrame(
  frame: Mesh6GCapturedFrameV1,
  florenceHandle: NeutralEarFlorenceCandidateSetHandleFR104V1,
  geometryHandle: NeutralEarFaceLandmarkerGeometryHandleFR104V1,
): void {
  if (
    florenceHandle.providerRunRef !== frame.providerRunRef
    || geometryHandle.providerRunRef !== frame.providerRunRef
  ) {
    fail(
      'providerRunRef must match the exact Mesh6H frame across both handles.',
    );
  }
  if (
    florenceHandle.frame.width !== frame.frameWidth
    || florenceHandle.frame.height !== frame.frameHeight
    || geometryHandle.frame.width !== frame.frameWidth
    || geometryHandle.frame.height !== frame.frameHeight
  ) {
    fail(
      'candidate and geometry handle dimensions must match the exact Mesh6H frame.',
    );
  }
}

function provenance(
  runtimeResult: NeutralEarLiveProviderByteRuntimeResultFR104V1,
): NeutralEarOrientationMirrorProvenanceFR104V1 {
  if (
    runtimeResult.providerInvocations
      .sameMaterializedRgbaOriginVerifiedForBothProviders !== true
    || runtimeResult.byteEvidence.byteBinding
      .capturedFrameToConsumerBytesIndependentlyVerified !== true
    || runtimeResult.faceLandmarker.additionalHorizontalMirrorApplied
      !== false
    || runtimeResult.faceLandmarker.additionalRotationApplied !== false
  ) {
    fail(
      'exact same-RGBA provider binding and transform parity are required.',
    );
  }

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-orientation-mirror-provenance-v1' as const,
    sharedDecodedPixelFrame: Object.freeze({
      candidateAndGeometrySamePixelOrientationAttested:
        true as const,
      independentlyVerified: true,
    }),
    exifOrientation: Object.freeze({
      state: 'absent_or_not_required' as const,
      source: 'capture_pipeline_attestation' as const,
      independentlyVerified: false as const,
    }),
    frontCameraMirror: Object.freeze({
      state: 'unknown' as const,
      source: 'unknown' as const,
      independentlyVerified: false as const,
    }),
  });
}

function composeCandidate(
  candidate: NeutralEarFlorenceLiveCandidateFR104V1,
  geometry: Parameters<
    typeof orchestrateNeutralEarCandidateFR104
  >[0]['geometry'],
  frame: Mesh6GCapturedFrameV1,
  orientationMirrorProvenance:
    NeutralEarOrientationMirrorProvenanceFR104V1,
): NeutralEarComposedProviderCandidateFR104V1 {
  const descriptiveEvidence =
    orchestrateNeutralEarCandidateFR104({
      schemaVersion:
        'fr104-neutral-ear-ephemeral-orchestration-request-v1',
      candidate: Object.freeze({
        schemaVersion:
          'fr104-neutral-ear-candidate-shape-input-v1' as const,
        candidateRef: candidate.candidateRef,
        coordinateFrame:
          'canonical_image_normalized_2d' as const,
        points: candidate.points,
        exactStructuralDegeneracyAlreadyRejected:
          true as const,
      }),
      candidateFrame: Object.freeze({
        width: frame.frameWidth,
        height: frame.frameHeight,
      }),
      sameFrameAttested: true,
      geometry,
      orientationMirrorProvenance,
    });

  if (
    descriptiveEvidence.providerRunRef !== frame.providerRunRef
    || descriptiveEvidence.candidateRef !== candidate.candidateRef
    || descriptiveEvidence.provenance.sharedDecodedPixelFrame
      .independentlyVerified !== true
    || descriptiveEvidence.laterality.anatomicalSide !== 'unknown'
    || descriptiveEvidence.authority
      .validatedExternalEarObservation !== false
    || descriptiveEvidence.authority
      .anatomicalLateralityAuthorized !== false
  ) {
    fail('descriptive candidate orchestration widened authority or drifted identity.');
  }

  return Object.freeze({
    candidateRef: candidate.candidateRef,
    promptProvenance: candidate.promptProvenance,
    promptSideConsumedAsAnatomicalSide: false as const,
    descriptiveEvidence,
  });
}

export function composeNeutralEarLiveProviderOutputsFR104(
  input: Readonly<{
    runtimeResult: NeutralEarLiveProviderByteRuntimeResultFR104V1;
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    florenceAdapter: NeutralEarFlorenceByteAdapterFR104V1;
    faceLandmarkerAdapter:
      NeutralEarFaceLandmarkerByteAdapterFR104V1;
    florenceHandle:
      NeutralEarFlorenceCandidateSetHandleFR104V1;
    geometryHandle:
      NeutralEarFaceLandmarkerGeometryHandleFR104V1;
  }>,
): NeutralEarProviderOutputCompositionResultFR104V1 {
  assertIssuedNeutralEarLiveProviderByteRuntimeResultFR104(
    input.runtimeResult,
    {
      handle: input.handle,
      frame: input.frame,
      florenceAdapter: input.florenceAdapter,
      faceLandmarkerAdapter: input.faceLandmarkerAdapter,
    },
  );
  assertNeutralEarFlorenceCandidateSetBoundToInvocationFR104(
    input.runtimeResult.florence,
    input.florenceHandle,
  );
  assertNeutralEarFaceLandmarkerGeometryBoundToInvocationFR104(
    input.runtimeResult.faceLandmarker,
    input.geometryHandle,
  );
  sameFrame(
    input.frame,
    input.florenceHandle,
    input.geometryHandle,
  );

  const orientationMirrorProvenance =
    provenance(input.runtimeResult);

  const candidateBundles =
    consumeIssuedNeutralEarFaceLandmarkerGeometryFR104(
      input.geometryHandle,
      (geometry) =>
        consumeIssuedNeutralEarFlorenceCandidateSetFR104(
          input.florenceHandle,
          (candidates) => Object.freeze([
            ...candidates.leftPrompt.map((candidate) =>
              composeCandidate(
                candidate,
                geometry,
                input.frame,
                orientationMirrorProvenance,
              )),
            ...candidates.rightPrompt.map((candidate) =>
              composeCandidate(
                candidate,
                geometry,
                input.frame,
                orientationMirrorProvenance,
              )),
          ]),
        ),
    );

  const expectedTotal =
    input.florenceHandle.candidateCounts.leftPrompt
    + input.florenceHandle.candidateCounts.rightPrompt;
  if (candidateBundles.length !== expectedTotal) {
    fail(
      'all Florence candidates must be preserved without selection or collapse.',
    );
  }

  const result:
    NeutralEarProviderOutputCompositionResultFR104V1 =
    Object.freeze({
      schemaVersion:
        'fr104-neutral-ear-provider-output-composition-result-v1' as const,
      authorityState:
        'same_runtime_provider_outputs_composed_descriptive_only_no_acceptance' as const,
      providerRunRef: input.frame.providerRunRef,
      frame: Object.freeze({
        width: input.frame.frameWidth,
        height: input.frame.frameHeight,
      }),
      candidateSummary: Object.freeze({
        leftPromptCount:
          input.florenceHandle.candidateCounts.leftPrompt,
        rightPromptCount:
          input.florenceHandle.candidateCounts.rightPrompt,
        totalCount: expectedTotal,
        allCandidatesPreservedWithoutSelection: true as const,
        candidateSelectionThresholdApplied: false as const,
      }),
      candidateBundles,
      bindingEvidence: Object.freeze({
        exactB1RuntimeResultVerified: true as const,
        florenceHandleBoundToExactInvocationSummary:
          true as const,
        faceGeometryHandleBoundToExactInvocationSummary:
          true as const,
        providerRunRefMatch: true as const,
        frameDimensionsMatch: true as const,
        sameMaterializedRgbaOriginVerifiedForBothProviders:
          true as const,
        providerTransformsPreserved: true as const,
        secondFaceLandmarkerExecutionIntroduced: false as const,
      }),
      provenance: orientationMirrorProvenance,
      blockers: Object.freeze([
        'subject_relative_source_pixel_mirror_provenance_not_verified',
        'verified_controlled_capture_profile_not_available',
        'runtime_anatomical_side_mapping_not_admitted',
      ] as const),
      privacy: Object.freeze({
        rawFrameReturned: false as const,
        rawFrameBytesReturned: false as const,
        rawFlorenceProviderResponseReturned: false as const,
        rawFlorenceCandidatePolygonsReturned: false as const,
        rawFaceLandmarkerProviderResponseReturned: false as const,
        rawFaceLandmarkerLandmarksReturned: false as const,
        rawMetricLandmarksReturned: false as const,
        poseTransformMatrixReturned: false as const,
        imageDigestReturned: false as const,
        biometricEmbeddingProduced: false as const,
        identityTemplateProduced: false as const,
      }),
      authority: Object.freeze({
        descriptiveProviderOutputCompositionCompleted:
          true as const,
        validatedExternalEarObservationAuthorized:
          false as const,
        anatomicalLateralityAuthorized: false as const,
        traditionalBindingAuthorized: false as const,
        productionAuthorization: false as const,
      }),
    });

  ISSUED_RESULTS.add(result);
  RESULT_INPUTS.set(
    result,
    Object.freeze({
      runtimeResult: input.runtimeResult,
      florenceHandle: input.florenceHandle,
      geometryHandle: input.geometryHandle,
    }),
  );
  return result;
}

export function assertIssuedNeutralEarProviderOutputCompositionFR104(
  result: NeutralEarProviderOutputCompositionResultFR104V1,
  runtimeResult: NeutralEarLiveProviderByteRuntimeResultFR104V1,
): void {
  const inputs = RESULT_INPUTS.get(result);
  if (
    !ISSUED_RESULTS.has(result)
    || inputs === undefined
    || inputs.runtimeResult !== runtimeResult
    || result.authority.descriptiveProviderOutputCompositionCompleted
      !== true
    || result.authority
      .validatedExternalEarObservationAuthorized !== false
    || result.authority.anatomicalLateralityAuthorized !== false
    || result.authority.traditionalBindingAuthorized !== false
    || result.authority.productionAuthorization !== false
  ) {
    fail(
      'composition result was not issued from the expected exact runtime result.',
    );
  }
}
