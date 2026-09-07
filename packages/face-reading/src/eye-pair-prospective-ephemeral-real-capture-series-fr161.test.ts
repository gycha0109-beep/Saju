import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from './mediapipe-release-exact-metric-geometry-admission-fr75.js';
import {
  admitMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  FR161_NEXT_FRONTIER,
  getEyePairProspectiveEphemeralRealCaptureContractFR161,
  runEyePairProspectiveEphemeralRealCaptureSeriesFR161,
  type EyePairProspectiveEphemeralRealCaptureSeriesRequestFR161V1,
} from './eye-pair-prospective-ephemeral-real-capture-series-fr161.js';

const DIGEST = `sha256:${'8'.repeat(64)}`;

function providerResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 13) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return providerResult();
        },
        close() {},
      };
    },
  };
}

async function parity(): Promise<MediaPipeScreenToMetricReimplementationParityFR76V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr161:parity-fixture',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ fixture: true }),
  }, factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
}

async function request(
  captureBytes: readonly [string, string] = ['fresh-capture-a', 'fresh-capture-b'],
): Promise<EyePairProspectiveEphemeralRealCaptureSeriesRequestFR161V1> {
  return {
    schemaVersion: 'fr161-eye-pair-prospective-ephemeral-real-capture-series-request-v1',
    acquisitionRunRef: 'fr161:acquisition:fixture',
    prospectiveCollectionRef: 'fr161:collection:fixture',
    captureSeriesRef: 'fr161:series:a',
    captureConditionRef: 'baseline-neutral-v1',
    postPreregistrationFreshCaptureAttested: true,
    sameParticipantSeriesAttested: true,
    captures: [
      {
        captureRef: 'fr161:capture:a:01',
        providerRunRef: 'fr161:provider:a:01',
        captureSequenceIndex: 1,
        imageBlob: new Blob([captureBytes[0]], { type: 'image/jpeg' }),
      },
      {
        captureRef: 'fr161:capture:a:02',
        providerRunRef: 'fr161:provider:a:02',
        captureSequenceIndex: 2,
        imageBlob: new Blob([captureBytes[1]], { type: 'image/jpeg' }),
      },
    ],
    geometryMetadataPbtxt: 'fixture metadata is never reached by duplicate-source boundary tests',
    parity: await parity(),
  };
}

describe('FR161 eye-pair prospective ephemeral real-capture series', () => {
  it('wires the governed real-image path without adding repeatability, identity, threshold, or semantic authority', () => {
    const contract = getEyePairProspectiveEphemeralRealCaptureContractFR161();
    expect(contract.predecessor.activeProviderPackage).toBe('@mediapipe/tasks-vision');
    expect(contract.predecessor.activeProviderVersion).toBe('0.10.35');
    expect(contract.execution.governedPath).toBe('FR26_to_FR77_to_FR158_to_FR159_to_FR160');
    expect(contract.execution.primaryMetricCount).toBe(2);
    expect(contract.execution.repeatabilityPassFailIssued).toBe(false);
    expect(contract.execution.captureSensitivityPassFailIssued).toBe(false);
    expect(contract.execution.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(contract.execution.numericCaptureQualityThreshold).toBeNull();
    expect(contract.authorityBoundary.identityMatchingPerformed).toBe(false);
    expect(contract.authorityBoundary.thresholdsIssued).toBe(false);
    expect(contract.authorityBoundary.traditionalSemanticAuthority).toBe(false);
    expect(contract.nextFrontier).toBe(FR161_NEXT_FRONTIER);
  });

  it('makes the purpose of repeated captures explicit: exact byte clones are rejected before provider execution', async () => {
    const duplicate = await request(['same-source-bytes', 'same-source-bytes']);
    await expect(runEyePairProspectiveEphemeralRealCaptureSeriesFR161(duplicate)).rejects.toThrow(
      /exact duplicate source-image bytes.*rejected before provider execution/u,
    );
    const contract = getEyePairProspectiveEphemeralRealCaptureContractFR161();
    expect(contract.intake.exactDuplicateSourceBytesRejectedBeforeProviderExecution).toBe(true);
    expect(contract.intake.byteDistinctnessMeansIndependentCaptureEvent).toBe(false);
    expect(contract.authorityBoundary.byteDistinctnessMeansCaptureIndependenceProven).toBe(false);
  });

  it('requires a repeated series rather than admitting one image as a repeatability series', async () => {
    const source = await request();
    const single = { ...source, captures: source.captures.slice(0, 1) } as EyePairProspectiveEphemeralRealCaptureSeriesRequestFR161V1;
    await expect(runEyePairProspectiveEphemeralRealCaptureSeriesFR161(single)).rejects.toThrow(/at least two capture inputs/u);
  });

  it('keeps freshness and same-participant status as explicit attestations, not inferred biometric facts', async () => {
    const source = await request();
    await expect(runEyePairProspectiveEphemeralRealCaptureSeriesFR161({
      ...source,
      postPreregistrationFreshCaptureAttested: false,
    })).rejects.toThrow(/fresh-capture attestation/u);
    await expect(runEyePairProspectiveEphemeralRealCaptureSeriesFR161({
      ...source,
      sameParticipantSeriesAttested: false,
    })).rejects.toThrow(/same-participant series attestation/u);

    const contract = getEyePairProspectiveEphemeralRealCaptureContractFR161();
    expect(contract.intake.freshnessAttestationMeansIndependentFreshnessProof).toBe(false);
    expect(contract.intake.sameParticipantAttestationMeansIdentityProof).toBe(false);
    expect(contract.authorityBoundary.sameParticipantSeriesGroupingMeansIdentityMatching).toBe(false);
  });

  it('does not persist image bytes, provider payloads, landmark sets, full geometry, source digests, embeddings, or identity templates', () => {
    const privacy = getEyePairProspectiveEphemeralRealCaptureContractFR161().privacyBoundary;
    expect(privacy.rawImagePersisted).toBe(false);
    expect(privacy.rawProviderResponsePersisted).toBe(false);
    expect(privacy.rawLandmarkSetPersisted).toBe(false);
    expect(privacy.derivedFullFaceMetricGeometryPersisted).toBe(false);
    expect(privacy.sourceDigestPersisted).toBe(false);
    expect(privacy.faceEmbeddingPersisted).toBe(false);
    expect(privacy.identityTemplatePersisted).toBe(false);
  });
});
