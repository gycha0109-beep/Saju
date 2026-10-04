import {
  bindNeutralEarControlledCaptureRuntimeByteEvidenceFR104,
  type NeutralEarControlledCaptureRuntimeByteBindingFR104V1,
} from './neutral-ear-controlled-capture-runtime-byte-binding-fr104.js';
import {
  createNeutralEarCapturedFrameConsumerByteSessionFR104,
  type NeutralEarCapturedFrameByteMaterializerFR104V1,
  type NeutralEarCapturedFrameConsumerByteEvidenceFR104V1,
} from './neutral-ear-captured-frame-consumer-byte-provenance-fr104.js';
import {
  assertIssuedNeutralEarFaceLandmarkerByteAdapterFR104,
  assertIssuedNeutralEarFlorenceByteAdapterFR104,
  type NeutralEarFaceLandmarkerByteAdapterFR104V1,
  type NeutralEarFaceLandmarkerByteInvocationSummaryFR104V1,
  type NeutralEarFlorenceByteAdapterFR104V1,
  type NeutralEarFlorenceHostInvocationResultFR104V1,
} from './neutral-ear-provider-byte-adapters-fr104.js';
import type {
  Mesh6HBrowserCameraHandleV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarLiveProviderByteRuntimeBlockerFR104V1 =
  | NeutralEarControlledCaptureRuntimeByteBindingFR104V1['blockers'][number]
  | 'florence_live_transport_not_attested_by_b1_result'
  | 'provider_outputs_not_yet_composed_into_fr104_candidate_orchestration';

export interface NeutralEarLiveProviderByteRuntimeResultFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-live-provider-byte-runtime-result-v1';
  readonly authorityState:
    'exact_capture_rgba_bound_to_both_provider_invocation_boundaries_only';
  readonly profileRef: string;
  readonly providerRunRef: string;
  readonly providerInvocations: {
    readonly florenceHostPortInvokedFromExactRgbaBoundary: true;
    readonly faceLandmarkerRuntimeInvokedFromExactRgbaBoundary: true;
    readonly sameMaterializedRgbaOriginVerifiedForBothProviders: true;
    readonly directRawFrameConsumerInvocationAllowed: false;
    readonly repositoryNativeFlorenceTransportAttestedByThisResult: false;
  };
  readonly florence:
    NeutralEarFlorenceHostInvocationResultFR104V1;
  readonly faceLandmarker:
    NeutralEarFaceLandmarkerByteInvocationSummaryFR104V1;
  readonly byteEvidence:
    NeutralEarCapturedFrameConsumerByteEvidenceFR104V1;
  readonly controlledCaptureBinding:
    NeutralEarControlledCaptureRuntimeByteBindingFR104V1;
  readonly blockers:
    readonly NeutralEarLiveProviderByteRuntimeBlockerFR104V1[];
  readonly privacy: {
    readonly rawFramePersisted: false;
    readonly rawFrameBytesReturned: false;
    readonly rawFrameBytesPersisted: false;
    readonly rawFlorenceProviderResponseReturned: false;
    readonly rawFlorenceProviderResponsePersisted: false;
    readonly rawFaceLandmarkerLandmarksReturned: false;
    readonly rawFaceLandmarkerProviderResponsePersisted: false;
    readonly imageDigestReturned: false;
    readonly imageDigestPersisted: false;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly providerInvocationByteOriginBound: true;
    readonly providerOutputCandidateCompositionAuthorized: false;
    readonly subjectRelativeMirrorProvenanceAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

const ISSUED_RESULTS = new WeakSet<object>();
const RESULT_STATE = new WeakMap<
  object,
  Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    florenceAdapter: NeutralEarFlorenceByteAdapterFR104V1;
    faceLandmarkerAdapter:
      NeutralEarFaceLandmarkerByteAdapterFR104V1;
  }>
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 live provider byte runtime ${message}`,
  );
}

function uniqueBlockers(
  blockers: readonly NeutralEarLiveProviderByteRuntimeBlockerFR104V1[],
) {
  return Object.freeze([...new Set(blockers)]);
}

export async function runNeutralEarLiveProviderByteRuntimeFR104(
  input: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    profileRef: string;
    materializeRgbaBytes:
      NeutralEarCapturedFrameByteMaterializerFR104V1;
    florenceAdapter: NeutralEarFlorenceByteAdapterFR104V1;
    faceLandmarkerAdapter:
      NeutralEarFaceLandmarkerByteAdapterFR104V1;
  }>,
): Promise<NeutralEarLiveProviderByteRuntimeResultFR104V1> {
  assertIssuedNeutralEarFlorenceByteAdapterFR104(
    input.florenceAdapter,
  );
  assertIssuedNeutralEarFaceLandmarkerByteAdapterFR104(
    input.faceLandmarkerAdapter,
  );

  const session =
    await createNeutralEarCapturedFrameConsumerByteSessionFR104({
      handle: input.handle,
      frame: input.frame,
      materializeFrameBytes: input.materializeRgbaBytes,
    });

  try {
    const florence = await session.consume(
      'florence',
      (frameBytes) =>
        input.florenceAdapter.invoke(Object.freeze({
          bytes: frameBytes,
          width: input.frame.frameWidth,
          height: input.frame.frameHeight,
          providerRunRef: input.frame.providerRunRef,
        })),
    );

    const faceLandmarker = await session.consume(
      'face_landmarker',
      (frameBytes) =>
        input.faceLandmarkerAdapter.invoke(Object.freeze({
          bytes: frameBytes,
          width: input.frame.frameWidth,
          height: input.frame.frameHeight,
          providerRunRef: input.frame.providerRunRef,
        })),
    );

    const byteEvidence = session.finalize();
    const controlledCaptureBinding =
      bindNeutralEarControlledCaptureRuntimeByteEvidenceFR104({
        handle: input.handle,
        frame: input.frame,
        profileRef: input.profileRef,
        byteEvidence,
      });

    const blockers: NeutralEarLiveProviderByteRuntimeBlockerFR104V1[] = [
      ...controlledCaptureBinding.blockers,
      'florence_live_transport_not_attested_by_b1_result',
      'provider_outputs_not_yet_composed_into_fr104_candidate_orchestration',
    ];

    const result: NeutralEarLiveProviderByteRuntimeResultFR104V1 =
      Object.freeze({
        schemaVersion:
          'fr104-neutral-ear-live-provider-byte-runtime-result-v1' as const,
        authorityState:
          'exact_capture_rgba_bound_to_both_provider_invocation_boundaries_only' as const,
        profileRef: input.profileRef,
        providerRunRef: input.frame.providerRunRef,
        providerInvocations: Object.freeze({
          florenceHostPortInvokedFromExactRgbaBoundary:
            true as const,
          faceLandmarkerRuntimeInvokedFromExactRgbaBoundary:
            true as const,
          sameMaterializedRgbaOriginVerifiedForBothProviders:
            true as const,
          directRawFrameConsumerInvocationAllowed: false as const,
          repositoryNativeFlorenceTransportAttestedByThisResult:
            false as const,
        }),
        florence,
        faceLandmarker,
        byteEvidence,
        controlledCaptureBinding,
        blockers: uniqueBlockers(blockers),
        privacy: Object.freeze({
          rawFramePersisted: false as const,
          rawFrameBytesReturned: false as const,
          rawFrameBytesPersisted: false as const,
          rawFlorenceProviderResponseReturned: false as const,
          rawFlorenceProviderResponsePersisted: false as const,
          rawFaceLandmarkerLandmarksReturned: false as const,
          rawFaceLandmarkerProviderResponsePersisted:
            false as const,
          imageDigestReturned: false as const,
          imageDigestPersisted: false as const,
          biometricEmbeddingProduced: false as const,
          identityTemplateProduced: false as const,
        }),
        authority: Object.freeze({
          providerInvocationByteOriginBound: true as const,
          providerOutputCandidateCompositionAuthorized:
            false as const,
          subjectRelativeMirrorProvenanceAuthorized:
            false as const,
          anatomicalLateralityAuthorized: false as const,
          validatedExternalEarObservationAuthorized:
            false as const,
          traditionalBindingAuthorized: false as const,
          productionAuthorization: false as const,
        }),
      });

    ISSUED_RESULTS.add(result);
    RESULT_STATE.set(
      result,
      Object.freeze({
        handle: input.handle,
        frame: input.frame,
        florenceAdapter: input.florenceAdapter,
        faceLandmarkerAdapter: input.faceLandmarkerAdapter,
      }),
    );
    return result;
  } catch (error) {
    session.abort();
    throw error;
  }
}

export function assertIssuedNeutralEarLiveProviderByteRuntimeResultFR104(
  result: NeutralEarLiveProviderByteRuntimeResultFR104V1,
  expected: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    florenceAdapter: NeutralEarFlorenceByteAdapterFR104V1;
    faceLandmarkerAdapter:
      NeutralEarFaceLandmarkerByteAdapterFR104V1;
  }>,
): void {
  if (!ISSUED_RESULTS.has(result)) {
    fail('result was not issued by the active B1 runtime.');
  }
  const state = RESULT_STATE.get(result);
  if (
    state === undefined
    || state.handle !== expected.handle
    || state.frame !== expected.frame
    || state.florenceAdapter !== expected.florenceAdapter
    || state.faceLandmarkerAdapter
      !== expected.faceLandmarkerAdapter
  ) {
    fail(
      'result is not bound to the expected exact handle, frame, and provider adapters.',
    );
  }
  if (
    result.schemaVersion
      !== 'fr104-neutral-ear-live-provider-byte-runtime-result-v1'
    || result.authorityState
      !== 'exact_capture_rgba_bound_to_both_provider_invocation_boundaries_only'
    || result.providerInvocations
      .florenceHostPortInvokedFromExactRgbaBoundary !== true
    || result.providerInvocations
      .faceLandmarkerRuntimeInvokedFromExactRgbaBoundary !== true
    || result.providerInvocations
      .sameMaterializedRgbaOriginVerifiedForBothProviders !== true
    || result.providerInvocations
      .directRawFrameConsumerInvocationAllowed !== false
    || result.authority.providerInvocationByteOriginBound
      !== true
    || result.authority
      .providerOutputCandidateCompositionAuthorized !== false
    || result.authority
      .subjectRelativeMirrorProvenanceAuthorized !== false
    || result.authority.anatomicalLateralityAuthorized !== false
    || result.authority.traditionalBindingAuthorized !== false
    || result.authority.productionAuthorization !== false
  ) {
    fail('issued B1 runtime result authority boundary drift.');
  }
}
