import { describe, expect, it } from 'vitest';
import {
  FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199,
  FACE_READING_ZYGION_SOURCE_ALGORITHM_FR199,
  derivePublishedSourceExactZygionFR199,
  parseWavefrontVerticesFR199,
} from './face-reading-public-synthetic-zygion-reference-fr199.js';

const COMPLETE_OBJ = `
v -60 -30 10
v 60 30 10
v 0 0 100
v 55 5 50
v -55 5 50
v 54 4 40
v -54 4 40
`;

describe('FR199 public synthetic independent zygion reference stage', () => {
  it('pins the exact 20 public same-ID OBJ/image tuples', () => {
    expect(FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199).toHaveLength(20);
    expect(new Set(FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199.map((asset) => asset.sampleId)).size).toBe(20);
    expect(
      FACE_READING_PUBLIC_SYNTHETIC_ASSETS_FR199.every(
        (asset) =>
          /^[0-9a-f]{40}$/u.test(asset.commitSha)
          && /^[0-9a-f]{40}$/u.test(asset.obj.gitBlobSha)
          && /^[0-9a-f]{40}$/u.test(asset.image.gitBlobSha)
          && asset.obj.sizeBytes > 0
          && asset.image.sizeBytes > 0,
      ),
    ).toBe(true);
  });

  it('pins the independent source algorithm and keeps published error descriptive', () => {
    expect(FACE_READING_ZYGION_SOURCE_ALGORITHM_FR199).toMatchObject({
      commitSha: 'a31c73078616a492b6deed43b3620e04fe6e148d',
      notebookBlobSha: '42971c751145ba556d136d430f3205b3d2430b77',
      publishedLeftZygionMeanErrorMm: 8.08,
      publishedErrorUsedAsAcceptanceThreshold: false,
      sourceControlFlowQuirkPreserved: true,
      silentRepairAllowed: false,
    });
  });

  it('parses Wavefront vertices and derives a bilateral source-exact first-band reference', () => {
    const vertices = parseWavefrontVerticesFR199(COMPLETE_OBJ);
    const reference = derivePublishedSourceExactZygionFR199('male-23', vertices);

    expect(reference.pronasale).toEqual({ x: 0, y: 0, z: 100 });
    expect(reference.bilateralZygion).toEqual([
      {
        referenceLabel: 'source_left_zygion',
        point: { x: 55, y: 5, z: 50 },
      },
      {
        referenceLabel: 'source_right_zygion',
        point: { x: -55, y: 5, z: 50 },
      },
    ]);
    expect(reference.providerCandidateVisibleDuringReferenceDerivation).toBe(false);
    expect(reference.providerReferenceCorrespondenceExecuted).toBe(false);
    expect(reference.providerIndexAdmissionAuthorized).toBe(false);
  });

  it('fails closed rather than widening the published source algorithm when one side is absent', () => {
    const vertices = parseWavefrontVerticesFR199(`
v -60 -30 10
v 60 30 10
v 0 0 100
v 55 5 50
`);
    expect(() =>
      derivePublishedSourceExactZygionFR199('male-23', vertices),
    ).toThrow('fr199_source_exact_bilateral_zygion_incomplete');
  });

  it('rejects unregistered samples and malformed vertex data', () => {
    const vertices = parseWavefrontVerticesFR199(COMPLETE_OBJ);
    expect(() =>
      derivePublishedSourceExactZygionFR199('not-a-source-sample', vertices),
    ).toThrow('fr199_unregistered_public_synthetic_sample');
    expect(() => parseWavefrontVerticesFR199('v 1 NaN 3\nv 2 3 4\nv 3 4 5')).toThrow(
      'fr199_obj_vertex_non_finite',
    );
  });
});
