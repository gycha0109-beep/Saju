import { describe, expect, it } from 'vitest';
import {
  deriveAndFreezeIndependentZygionReferenceFR199,
  deriveZygionSourceExactFR199,
  deriveZygionIntendedLoopRepairFR199,
  issueDescriptiveZygionCorrespondenceFR199,
  parseObjVerticesFR199,
} from './face-reading-public-synthetic-zygion-correspondence-fr199.js';
import type { ProviderNormalizedLandmarkFrameFR61V1 } from './production-neutral-observation-provider-fr61.js';

const OBJ = [
  'v -60 0 0',
  'v 60 0 0',
  'v 0 0 100',
  'v 53 1 80',
  'v -53 1 80',
  'v 0 100 0',
  'v 0 -100 0',
].join('\n');

describe('FR199 public synthetic zygion correspondence', () => {
  it('preserves the source-exact first-band algorithm and freezes the independent reference', () => {
    const receipt = deriveAndFreezeIndependentZygionReferenceFR199({
      sampleId: 'male-23',
      objText: OBJ,
      objDigest: `sha256:${'a'.repeat(64)}`,
    });
    expect(receipt.pronasale).toEqual({ x: 0, y: 0, z: 100 });
    expect(receipt.bilateralReference).toEqual([
      { x: 53, y: 1, z: 80 },
      { x: -53, y: 1, z: 80 },
    ]);
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.bilateralReference)).toBe(true);
    expect(receipt.providerCandidateVisibleDuringDerivation).toBe(false);
    expect(receipt.providerIndexAdmissionAuthorized).toBe(false);
  });

  it('fails closed when the published first width band does not yield both coordinates', () => {
    const vertices = parseObjVerticesFR199([
      'v -60 0 0',
      'v 60 0 0',
      'v 0 0 100',
      'v 53 1 80',
      'v 0 100 0',
      'v 0 -100 0',
    ].join('\n'));
    expect(() => deriveZygionSourceExactFR199(vertices)).toThrow(/exactly two are required/u);
  });

  it('keeps intended-loop repair separately versioned and expands past an incomplete first band', () => {
    const vertices = parseObjVerticesFR199([
      'v -60 0 0',
      'v 60 0 0',
      'v 0 0 100',
      'v 53 1 80',
      'v -59 1 80',
      'v 0 100 0',
      'v 0 -100 0',
    ].join('\n'));

    expect(() => deriveZygionSourceExactFR199(vertices)).toThrow(/exactly two are required/u);

    const repaired = deriveZygionIntendedLoopRepairFR199(vertices);
    expect(repaired.referenceMethod).toBe('topsakal_2023_public_notebook_intended_loop_repair_v1');
    expect(repaired.bilateral).toEqual([
      { x: 53, y: 1, z: 80 },
      { x: -59, y: 1, z: 80 },
    ]);
    expect(repaired.bandsVisited).toEqual([
      {
        currentMinWidth: 52.5,
        currentMaxWidth: 57.5,
        leftCandidateCount: 1,
        rightCandidateCount: 0,
      },
      {
        currentMinWidth: 52.5,
        currentMaxWidth: 60,
        leftCandidateCount: 1,
        rightCandidateCount: 1,
      },
    ]);
  });

  it('extracts only the unordered provider pair after a frozen reference exists', () => {
    const reference = deriveAndFreezeIndependentZygionReferenceFR199({
      sampleId: 'female-40',
      objText: OBJ,
      objDigest: `sha256:${'b'.repeat(64)}`,
    });
    const points = Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: index / 1000,
      y: index / 2000,
    }));
    const frame = Object.freeze({
      schemaVersion: 'fr61-provider-normalized-landmark-frame-v1',
      authorityState: 'provider_observation_candidate_only',
      coordinateFrame: 'canonical_image_normalized_2d',
      providerKey: 'visually_facelab',
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      providerRunRef: 'fr199:test',
      canonicalAssetDigest: `sha256:${'c'.repeat(64)}`,
      faceCount: 1,
      providerOrderedPoints: Object.freeze(points),
      providerOrderingAuthority: 'internal_provider_order_only_not_fr15_output',
      validatedThenDiscardedProviderFields: Object.freeze(['faceLandmarks[].z','faceLandmarks[].visibility']),
      ignoredProviderResultFields: Object.freeze(['faceBlendshapes','facialTransformationMatrixes']),
      rawSourcePersisted: false,
      rawProviderResponsePersisted: false,
      providerDepthPersisted: false,
      biometricEmbeddingPersisted: false,
      productionNeutralObservationIssued: false,
      anatomicalLateralityResolved: false,
      traditionalSemanticAuthority: false,
    }) as ProviderNormalizedLandmarkFrameFR61V1;

    const receipt = issueDescriptiveZygionCorrespondenceFR199(reference, frame);
    expect(receipt.provider.candidateIndices).toEqual([234, 454]);
    expect(receipt.provider.unorderedCandidatePair).toEqual([
      { index: 234, x: 0.234, y: 0.117 },
      { index: 454, x: 0.454, y: 0.227 },
    ]);
    expect(receipt.provider.anatomicalSideAssignment).toBeNull();
    expect(receipt.coordinateFrameCorrespondenceResolved).toBe(false);
    expect(receipt.numericDistanceAuthorized).toBe(false);
    expect(receipt.providerIndexAdmissionAuthorized).toBe(false);
    expect(receipt.productionAuthorized).toBe(false);
    expect(receipt.commerceAuthorized).toBe(false);
  });
});
