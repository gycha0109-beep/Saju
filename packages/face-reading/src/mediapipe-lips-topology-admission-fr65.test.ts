import { describe, expect, it } from 'vitest';
import {
  FIVE_OFFICER_CRITERIA_V0,
} from './five-officers-six-fus-research-v0.js';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  FR65_MEDIAPIPE_LIPS_RELEASE_EDGES,
  MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65,
  projectFR61RunToLipsTopologyAdmissionFR65,
  runPhotoToLipsTopologyAdmissionFR65,
} from './mediapipe-lips-topology-admission-fr65.js';
import {
  runProductionNeutralObservationProviderFR61,
  type ProductionNeutralObservationProviderRunFR61V1,
} from './production-neutral-observation-provider-fr61.js';

const DIGEST = `sha256:${'f'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr65:lips-topology-run',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 5) / 1000,
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
          return validResult();
        },
        close() {},
      };
    },
  };
}

function forged(
  source: ProductionNeutralObservationProviderRunFR61V1,
  patch: Record<string, unknown>,
): ProductionNeutralObservationProviderRunFR61V1 {
  return { ...source, ...patch } as unknown as ProductionNeutralObservationProviderRunFR61V1;
}

describe('FR65 MediaPipe lips topology admission', () => {
  it('pins the exact v0.10.35 provider lips release witness without granting anatomy or traditional semantics', () => {
    expect(MEDIAPIPE_LIPS_RELEASE_WITNESS_FR65).toEqual({
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      sourcePath: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
      sourceSymbol: 'FACE_LANDMARKS_LIPS',
      sourceLabel: 'Landmarks for lips',
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      releaseExactForInstalledPackage: true,
      edgeCount: 40,
      connectedComponentCount: 2,
      closedCycleComponentCount: 2,
      componentRoleLabelsPublished: false,
    });
    expect(FR65_MEDIAPIPE_LIPS_RELEASE_EDGES).toHaveLength(40);
    expect(FR65_MEDIAPIPE_LIPS_RELEASE_EDGES[0]).toEqual({ start: 61, end: 146 });
    expect(FR65_MEDIAPIPE_LIPS_RELEASE_EDGES.at(-1)).toEqual({ start: 415, end: 308 });
  });

  it('projects two provider-graph lip regions while preserving the blocked mouth methodology boundary', async () => {
    const report = await runPhotoToLipsTopologyAdmissionFR65(request(), factory());

    expect(report.schemaVersion).toBe('fr65-mediapipe-lips-topology-admission-v1');
    expect(report.authorityState).toBe('release_exact_provider_lips_topology_candidate_only');
    expect(report.regions).toHaveLength(2);
    expect(report.regions.map((region) => region.geometry.boundary.length)).toEqual([20, 20]);
    expect(report.regions.every((region) => region.providerTopologySymbol === 'FACE_LANDMARKS_LIPS')).toBe(true);
    expect(report.regions.every((region) => region.componentRoleAuthority === 'provider_graph_component_only_no_outer_inner_anatomy')).toBe(true);
    expect(report.regions.every((region) => region.consumerSlotAssignment === null)).toBe(true);
    expect(report.componentConsumptionState).toBe('unordered_provider_labeled_lips_components_only');
    expect(report.outerInnerComponentAssignment).toBeNull();
    expect(report.mouthConsumerSlotAssignment).toBeNull();
    expect(report.mouthConsumerSlotExistsInFR15).toBe(false);

    expect(report.intakeOfficerCriterionStatesIssued).toBe(0);
    expect(report.morphologyProduced).toBe(false);
    expect(report.productionNeutralObservationIssued).toBe(false);
    expect(report.traditionalSemanticAuthority).toBe(false);
    expect(report.upstream).toEqual({
      fr61SchemaVersion: 'fr61-production-neutral-observation-provider-run-v1',
      fr62SchemaVersion: 'fr62-governed-neutral-geometry-candidate-v1',
      fr62EyeGeometryCandidateCount: 2,
      fr62ConsumerSlotAssignmentsIssued: 0,
    });

    expect(report.blockers).toEqual([
      'fr15_has_no_mouth_consumer_slot',
      'outer_inner_component_roles_not_published',
      'mouth_morphology_operationalizations_not_reviewed',
      'mouth_static_thresholds_not_calibrated',
      'capture_sensitive_mouth_criteria_not_consumable',
    ]);
    expect(report.prohibitedShortcuts).toContain('provider_lips_label_to_traditional_mouth_criterion');
    expect(report.prohibitedShortcuts).toContain('two_closed_cycles_to_lip_thickness_operationalization');
    expect(report.prohibitedShortcuts).toContain('lips_bounding_geometry_to_square_broad_classification');
  });

  it('emits only normalized x/y geometry and does not leak provider vertices, depth, visibility, or raw provider payloads', async () => {
    const report = await runPhotoToLipsTopologyAdmissionFR65(request(), factory());

    for (const region of report.regions) {
      for (const point of region.geometry.boundary) {
        expect(Object.keys(point).sort()).toEqual(['x', 'y']);
        expect(Number.isFinite(point.x)).toBe(true);
        expect(Number.isFinite(point.y)).toBe(true);
      }
    }
    expect(report.provenance).toEqual({
      providerKey: 'visually_facelab',
      providerRunRef: 'fr65:lips-topology-run',
      canonicalAssetDigest: DIGEST,
      runtimePackageVersion: '0.10.35',
      rawSourcePersisted: false,
      rawProviderResponsePersisted: false,
      providerDepthPersisted: false,
      biometricEmbeddingPersisted: false,
    });
    expect(JSON.stringify(report.regions)).not.toContain('visibility');
    expect(JSON.stringify(report.regions)).not.toContain('providerVertex');
  });

  it('does not treat existing static-v1 mouth criterion candidates as automatically evaluated morphology', async () => {
    const mouthStaticCriteria = FIVE_OFFICER_CRITERIA_V0.filter(
      (criterion) => criterion.officerKey === 'intake' && criterion.staticV1Eligible,
    );
    expect(mouthStaticCriteria.map((criterion) => criterion.criterionId)).toEqual([
      'criterion.intake.square_broad',
      'criterion.intake.lips_substantial',
    ]);

    const report = await runPhotoToLipsTopologyAdmissionFR65(request(), factory());
    expect(report.intakeOfficerCriterionStatesIssued).toBe(0);
    expect(report.morphologyProduced).toBe(false);
    expect(report.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects forged FR61 authority widening, runtime drift, and persistence widening', async () => {
    const source = await runProductionNeutralObservationProviderFR61(request(), factory());
    const variants: readonly ProductionNeutralObservationProviderRunFR61V1[] = [
      forged(source, { productionNeutralObservationIssued: true }),
      forged(source, { traditionalSemanticAuthority: true }),
      forged(source, {
        frame: { ...source.frame, runtimePackageVersion: '0.10.34' },
      }),
      forged(source, {
        frame: { ...source.frame, rawProviderResponsePersisted: true },
      }),
      forged(source, {
        frame: { ...source.frame, providerDepthPersisted: true },
      }),
      forged(source, {
        frame: { ...source.frame, biometricEmbeddingPersisted: true },
      }),
    ];

    expect(() => projectFR61RunToLipsTopologyAdmissionFR65(variants[0]!)).toThrow(/exact fail-closed FR-61/u);
    expect(() => projectFR61RunToLipsTopologyAdmissionFR65(variants[1]!)).toThrow(/exact fail-closed FR-61/u);
    expect(() => projectFR61RunToLipsTopologyAdmissionFR65(variants[2]!)).toThrow(/runtime pin drift/u);
    for (const candidate of variants.slice(3)) {
      expect(() => projectFR61RunToLipsTopologyAdmissionFR65(candidate)).toThrow(/non-persistence\/non-semantic boundary widened/u);
    }
  });
});
