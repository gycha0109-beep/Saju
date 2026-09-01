import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  runPhotoToLipsTopologyAdmissionFR65,
  type GovernedLipsTopologyAdmissionFR65V1,
} from './mediapipe-lips-topology-admission-fr65.js';
import {
  projectFR65ToLipsContourNeutralSurfaceFR66,
  runPhotoToLipsContourNeutralSurfaceFR66,
} from './lips-contour-neutral-surface-fr66.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr66:lips-contour-surface-run',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 7) / 1000,
      visibility: 0.98,
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
          return validResult();
        },
        close() {},
      };
    },
  };
}

function forged(
  source: GovernedLipsTopologyAdmissionFR65V1,
  patch: Record<string, unknown>,
): GovernedLipsTopologyAdmissionFR65V1 {
  return { ...source, ...patch } as unknown as GovernedLipsTopologyAdmissionFR65V1;
}

describe('FR66 lips contour neutral surface', () => {
  it('binds FR65 as a separate neutral lips contour-set extension without mutating FR15', async () => {
    const report = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());

    expect(report.schemaVersion).toBe('fr66-lips-contour-neutral-surface-v1');
    expect(report.artifactVersion).toBe('0.1.0');
    expect(report.authorityState).toBe('neutral_lips_contour_set_bound_geometry_only');
    expect(report.extensionMode).toBe('separate_contract_extension');
    expect(report.baseNeutralObservationContractRef).toBe('myeongha-neutral-observation-v1');
    expect(report.baseFR15ContractMutated).toBe(false);
    expect(report.surfaceKey).toBe('neutral.face.lips_contour_set');
    expect(report.neutralConceptKey).toBe('lips_contour_set');
    expect(report.observationClass).toBe('source_neutral_geometry_extension');
    expect(report.coordinateFrame).toBe('canonical_image_normalized_2d');
    expect(report.providerBindingState).toBe('release_exact_named_topology_set_bound');
    expect(report.fr15ConsumerSlotIssued).toBe(false);
  });

  it('preserves exactly two unordered contours without assigning outer/inner, anatomy, or traditional roles', async () => {
    const report = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());

    expect(report.contours).toHaveLength(2);
    expect(report.contourCount).toBe(2);
    expect(report.contourConsumptionState).toBe('unordered_set_no_outer_inner_role');
    expect(report.contours.map((contour) => contour.geometry.boundary.length)).toEqual([20, 20]);
    expect(report.contours.every((contour) => contour.sourceProviderTopologySymbol === 'FACE_LANDMARKS_LIPS')).toBe(true);
    expect(report.contours.every((contour) => contour.sourceComponentAuthority === 'unordered_provider_graph_component_only')).toBe(true);
    expect(report.contours.every((contour) => contour.anatomicalRole === null)).toBe(true);
    expect(report.contours.every((contour) => contour.traditionalRole === null)).toBe(true);
  });

  it('emits geometry only: no pose-normalized metric, morphology, criterion state, claim, or semantic authority', async () => {
    const report = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());

    expect(report.poseNormalizationIssued).toBe(false);
    expect(report.neutralMetricDefinitionsIssued).toBe(0);
    expect(report.neutralMetricValuesIssued).toBe(0);
    expect(report.morphologyProduced).toBe(false);
    expect(report.criterionStatesIssued).toBe(0);
    expect(report.claimsIssued).toBe(0);
    expect(report.traditionalSemanticAuthority).toBe(false);
    expect(Object.values(report.authorityBoundary)).toEqual([
      false, false, false, false, false, false, false, false, false, false, false,
    ]);
    expect(report.prohibitedShortcuts).toContain('canonical_image_geometry_to_pose_normalized_metric');
    expect(report.prohibitedShortcuts).toContain('lips_contour_set_to_square_broad_classification');
    expect(report.prohibitedShortcuts).toContain('lips_contour_set_to_lips_substantial_classification');
  });

  it('does not leak provider vertex indices, z/depth, visibility, or extra geometry fields', async () => {
    const report = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());

    for (const contour of report.contours) {
      expect(Object.keys(contour.geometry).sort()).toEqual(['boundary', 'kind']);
      for (const point of contour.geometry.boundary) {
        expect(Object.keys(point).sort()).toEqual(['x', 'y']);
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThanOrEqual(1);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(1);
      }
    }
    const serialized = JSON.stringify(report.contours);
    expect(serialized).not.toContain('providerVertex');
    expect(serialized).not.toContain('visibility');
    expect(serialized).not.toContain('"z"');
  });

  it('pins the exact FR65 provider release provenance and preserves non-persistence', async () => {
    const report = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());

    expect(report.source).toEqual({
      fr65SchemaVersion: 'fr65-mediapipe-lips-topology-admission-v1',
      fr65ArtifactVersion: '0.1.0',
      providerRepository: 'google-ai-edge/mediapipe',
      providerReleaseTag: 'v0.10.35',
      providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      providerTopologySymbol: 'FACE_LANDMARKS_LIPS',
      runtimePackageVersion: '0.10.35',
    });
    expect(report.provenance).toEqual({
      providerRunRef: 'fr66:lips-contour-surface-run',
      canonicalAssetDigest: DIGEST,
      rawSourcePersisted: false,
      rawProviderResponsePersisted: false,
      providerDepthPersisted: false,
      biometricEmbeddingPersisted: false,
    });
  });

  it('rejects forged FR65 widening before the neutral surface can be issued', async () => {
    const source = await runPhotoToLipsTopologyAdmissionFR65(request(), factory());
    const variants: readonly [GovernedLipsTopologyAdmissionFR65V1, RegExp][] = [
      [forged(source, { morphologyProduced: true }), /semantic\/morphology boundary widened/u],
      [forged(source, { traditionalSemanticAuthority: true }), /semantic\/morphology boundary widened/u],
      [forged(source, { intakeOfficerCriterionStatesIssued: 1 }), /semantic\/morphology boundary widened/u],
      [forged(source, { outerInnerComponentAssignment: { outer: 1, inner: 2 } }), /unordered two-contour/u],
      [forged(source, { mouthConsumerSlotExistsInFR15: true }), /unordered two-contour/u],
      [forged(source, { sourceWitness: { ...source.sourceWitness, runtimePackageVersion: '0.10.34' } }), /release witness drift/u],
      [forged(source, { provenance: { ...source.provenance, rawProviderResponsePersisted: true } }), /non-persistence provenance widened/u],
      [forged(source, { blockers: source.blockers.filter((entry) => entry !== 'mouth_static_thresholds_not_calibrated') }), /blockers were removed/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.filter((entry) => entry !== 'provider_vertex_index_to_traditional_anchor') }), /prohibited shortcuts were removed/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => projectFR65ToLipsContourNeutralSurfaceFR66(candidate)).toThrow(pattern);
    }
  });

  it('rejects widened contour payloads instead of silently stripping unauthorized provider fields', async () => {
    const source = await runPhotoToLipsTopologyAdmissionFR65(request(), factory());
    const first = source.regions[0]!;
    const widened = forged(source, {
      regions: [
        {
          ...first,
          geometry: {
            ...first.geometry,
            boundary: [
              { ...first.geometry.boundary[0]!, z: 0.1 },
              ...first.geometry.boundary.slice(1),
            ],
          },
        },
        source.regions[1],
      ],
    });

    expect(() => projectFR65ToLipsContourNeutralSurfaceFR66(widened)).toThrow(/unauthorized point field/u);
  });
});
