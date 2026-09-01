import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  projectFR61RunToGovernedNeutralGeometryFR62,
  runPhotoToGovernedNeutralGeometryFR62,
} from './governed-neutral-geometry-fr62.js';
import {
  runProductionNeutralObservationProviderFR61,
  type ProductionNeutralObservationProviderRunFR61V1,
} from './production-neutral-observation-provider-fr61.js';

const DIGEST = `sha256:${'b'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr62:test-run',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(pointCount = 478): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: pointCount }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (pointCount - index) / 500,
      z: (index % 7) / 1000,
      visibility: 0.9,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factoryFor(
  result: MediaPipeFaceLandmarkerResultFR25V1,
  onClose: () => void = () => undefined,
): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return result;
        },
        close() {
          onClose();
        },
      };
    },
  };
}

describe('FR62 photo to governed neutral geometry candidate', () => {
  it('materializes only the governed unordered eye-region pair from the FR61 sanitized frame', async () => {
    const artifact = await runPhotoToGovernedNeutralGeometryFR62(
      request(),
      factoryFor(validResult()),
    );

    expect(artifact.schemaVersion).toBe('fr62-governed-neutral-geometry-candidate-v1');
    expect(artifact.authorityState).toBe('research_neutral_geometry_candidate_only');
    expect(artifact.coordinateFrame).toBe('canonical_image_normalized_2d');
    expect(artifact.geometryCandidates).toHaveLength(2);
    expect(artifact.geometryCandidates.map((entry) => entry.providerTopologySymbol)).toEqual([
      'FACE_LANDMARKS_LEFT_EYE',
      'FACE_LANDMARKS_RIGHT_EYE',
    ]);
    artifact.geometryCandidates.forEach((entry) => {
      expect(entry.geometry.kind).toBe('region');
      expect(entry.geometry.boundary).toHaveLength(16);
      expect(entry.sideAuthority).toBe('provider_label_only');
      expect(entry.consumerSlotAssignment).toBeNull();
      entry.geometry.boundary.forEach((point) => {
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThanOrEqual(1);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(1);
      });
    });

    expect(artifact.pairConsumptionState).toBe('unordered_provider_labeled_pair_only');
    expect(artifact.fr15ConsumerSlotAssignmentsIssued).toBe(0);
    expect(artifact.productionNeutralObservationIssued).toBe(false);
    expect(artifact.anatomicalLateralityResolved).toBe(false);
    expect(artifact.traditionalSemanticAuthority).toBe(false);
    expect(artifact.morphologyProduced).toBe(false);
  });

  it('surfaces all six FR14 bindings as blocked instead of fabricating FR15 slot assignment', async () => {
    const artifact = await runPhotoToGovernedNeutralGeometryFR62(
      request(),
      factoryFor(validResult()),
    );

    expect(artifact.blockedBindings).toHaveLength(6);
    expect(new Set(artifact.blockedBindings.map((entry) => entry.consumerSlot))).toEqual(new Set([
      'neutral.face.brow_midline',
      'neutral.face.nose_region',
      'neutral.face.left_brow_region',
      'neutral.face.right_brow_region',
      'neutral.face.left_eye_region',
      'neutral.face.right_eye_region',
    ]));
    expect(artifact.blockedBindings.filter(
      (entry) => entry.reason === 'anatomical_laterality_unresolved',
    )).toHaveLength(2);
    expect(artifact.blockedBindings.filter(
      (entry) => entry.reason === 'neutral_derivation_not_reviewed',
    )).toHaveLength(4);
    expect(artifact.blockedBindings.filter(
      (entry) => entry.reason === 'neutral_derivation_not_reviewed',
    ).every((entry) => entry.derivationRef !== null)).toBe(true);
  });

  it('does not leak provider vertex indices or raw provider landmark fields into the governed geometry artifact', async () => {
    const artifact = await runPhotoToGovernedNeutralGeometryFR62(
      request(),
      factoryFor(validResult()),
    );
    const serialized = JSON.stringify(artifact);

    expect(serialized).not.toContain('providerOrderedPoints');
    expect(serialized).not.toContain('pointsByProviderVertex');
    expect(serialized).not.toContain('providerVertex');
    expect(serialized).not.toContain('faceLandmarks');
    expect(serialized).not.toContain('\"z\":');
    expect(serialized).not.toContain('\"visibility\":');
    expect(serialized).not.toContain('morphology\"');
    expect(serialized).not.toContain('claims\"');
    expect(serialized).not.toContain('narrative\"');
  });

  it('preserves FR61 provenance and non-persistence through the geometry stage', async () => {
    const artifact = await runPhotoToGovernedNeutralGeometryFR62(
      request(),
      factoryFor(validResult()),
    );

    expect(artifact.provenance.providerKey).toBe('visually_facelab');
    expect(artifact.provenance.providerRunRef).toBe('fr62:test-run');
    expect(artifact.provenance.canonicalAssetDigest).toBe(DIGEST);
    expect(artifact.provenance.sourceFrameSchemaVersion).toBe('fr61-provider-normalized-landmark-frame-v1');
    expect(artifact.provenance.eyeProjectionArtifactVersion).toBe('0.1.0');
    expect(artifact.provenance.neutralObservationContractVersion).toBe('myeongha-neutral-observation-v1');
    expect(artifact.provenance.rawSourcePersisted).toBe(false);
    expect(artifact.provenance.rawProviderResponsePersisted).toBe(false);
    expect(artifact.provenance.providerDepthPersisted).toBe(false);
    expect(artifact.provenance.biometricEmbeddingPersisted).toBe(false);
  });

  it('fails closed when the sanitized provider frame lacks an eye-topology vertex and still closes the runtime', async () => {
    let closeCount = 0;

    await expect(runPhotoToGovernedNeutralGeometryFR62(
      request(),
      factoryFor(validResult(200), () => {
        closeCount += 1;
      }),
    )).rejects.toThrow(/missing required internal provider vertex/u);

    expect(closeCount).toBe(1);
  });

  it('rejects a forged FR61 source that claims production neutral issuance', async () => {
    const source = await runProductionNeutralObservationProviderFR61(
      request(),
      factoryFor(validResult()),
    );
    const forged = {
      ...source,
      productionNeutralObservationIssued: true,
    } as unknown as ProductionNeutralObservationProviderRunFR61V1;

    expect(() => projectFR61RunToGovernedNeutralGeometryFR62(forged)).toThrow(
      /claims widened authority/u,
    );
  });

  it('uses exactly one FR61 runtime execution for the photo-to-geometry path', async () => {
    let createCount = 0;
    let detectCount = 0;
    let closeCount = 0;
    const factory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 = {
      async create() {
        createCount += 1;
        return {
          detect() {
            detectCount += 1;
            return validResult();
          },
          close() {
            closeCount += 1;
          },
        };
      },
    };

    await runPhotoToGovernedNeutralGeometryFR62(request(), factory);

    expect(createCount).toBe(1);
    expect(detectCount).toBe(1);
    expect(closeCount).toBe(1);
  });
});
