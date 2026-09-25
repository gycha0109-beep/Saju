import { describe, expect, it } from 'vitest';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR294_HARD_GAP_FRONTIER,
} from './rgb-selfie-hard-gap-frontier-fr294.js';
import {
  FR295_RGB_RELATIVE_3D_TARGETS,
  assessFR295BenchmarkAdmission,
  assertFR295RgbRelative3DBenchmarkProtocol,
  type FR295BenchmarkAdmissionInput,
  type FR295RgbRelative3DTarget,
} from './rgb-relative-3d-benchmark-protocol-fr295.js';

const DIGEST =
  'sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

function admittedInput(
  featureKey: FR295RgbRelative3DTarget =
    'nose.tip_bridge_relative_projection',
): FR295BenchmarkAdmissionInput {
  return {
    schemaVersion:
      'fr295-rgb-relative-3d-benchmark-admission-input-v1',
    candidate: {
      featureKey,
      candidateRef: 'candidate.rgb-relative-shape.v1',
      candidateArtifactDigest: DIGEST,
      sourceCameraClass:
        'ordinary_smartphone_rgb_front_camera',
      sourceRgbOnly: true,
      specialDepthHardwareConsumed: false,
      metric3DInputConsumed: false,
      physicalMillimeterOutputClaimed: false,
      candidateOutputSemantics:
        'unitless_relative_shape_only',
      traditionalSemanticBindingClaimed: false,
    },
    reference: {
      referenceRef: 'reference.independent-3d.v1',
      referenceSourceClass: 'independent_calibrated_3d',
      referenceAxisDefinitionRef:
        'axis.neutral-relative-projection.v1',
      referenceAxisDefinitionFrozen: true,
      independentFromCandidateProvider: true,
      candidateProviderOutputUsedAsReference: false,
      candidateProviderIndicesUsedAsReference: false,
      sameCaptureBindingEstablished: true,
      validatedRegistrationBindingEstablished: false,
      referenceFrozenBeforeCandidateScoring: true,
      candidateOutputVisibleDuringReferenceConstruction: false,
      traditionalLabelVisibleDuringReferenceConstruction: false,
      referenceUsedForBenchmarkOnly: true,
      productionRuntimeDependencyCreated: false,
    },
  };
}

describe('FR295 RGB relative-3D benchmark protocol', () => {
  it('equals the exact four FR294 relative-3D gaps', () => {
    const expected = FR294_HARD_GAP_FRONTIER
      .filter(
        (candidate) =>
          candidate.lane === 'rgb_relative_3d_benchmark',
      )
      .map((candidate) => candidate.featureKey)
      .sort();

    expect([...FR295_RGB_RELATIVE_3D_TARGETS].sort())
      .toEqual(expected);
    expect(FR295_RGB_RELATIVE_3D_TARGETS)
      .toHaveLength(4);
    expect(() => assertFR295RgbRelative3DBenchmarkProtocol())
      .not.toThrow();
  });

  it.each(FR295_RGB_RELATIVE_3D_TARGETS)(
    'admits structurally independent descriptive benchmark evidence for %s',
    (featureKey) => {
      const result = assessFR295BenchmarkAdmission(
        admittedInput(featureKey),
      );
      expect(result.status)
        .toBe('admitted_for_descriptive_benchmark_only');
      expect(result.blockers).toEqual([]);
      expect(result.authorityBoundary)
        .toMatchObject({
          benchmarkWinnerIssued: false,
          acceptanceThresholdIssued: false,
          physicalMillimeterProductOutputIssued: false,
          traditionalBindingIssued: false,
          productColumnMaterialized: false,
          productionActivated: false,
        });
    },
  );

  it('blocks candidate-provider self-ground-truth', () => {
    const input = admittedInput();
    const result = assessFR295BenchmarkAdmission({
      ...input,
      reference: {
        ...input.reference,
        independentFromCandidateProvider: false,
        candidateProviderOutputUsedAsReference: true,
      } as unknown as FR295BenchmarkAdmissionInput['reference'],
    });

    expect(result.status).toBe('blocked');
    expect(result.blockers).toContain(
      'reference_not_independent',
    );
    expect(result.blockers).toContain(
      'candidate_provider_used_as_reference',
    );
  });

  it('blocks an unbound independent reference', () => {
    const input = admittedInput();
    const result = assessFR295BenchmarkAdmission({
      ...input,
      reference: {
        ...input.reference,
        sameCaptureBindingEstablished: false,
        validatedRegistrationBindingEstablished: false,
      },
    });

    expect(result.status).toBe('blocked');
    expect(result.blockers).toEqual([
      'candidate_reference_binding_missing',
    ]);
  });

  it('blocks reference construction that can see candidate output', () => {
    const input = admittedInput();
    const result = assessFR295BenchmarkAdmission({
      ...input,
      reference: {
        ...input.reference,
        candidateOutputVisibleDuringReferenceConstruction: true,
      } as unknown as FR295BenchmarkAdmissionInput['reference'],
    });

    expect(result.status).toBe('blocked');
    expect(result.blockers).toContain(
      'candidate_visible_during_reference_construction',
    );
  });

  it('accepts validated registration instead of literal same-capture binding', () => {
    const input = admittedInput();
    const result = assessFR295BenchmarkAdmission({
      ...input,
      reference: {
        ...input.reference,
        sameCaptureBindingEstablished: false,
        validatedRegistrationBindingEstablished: true,
      },
    });

    expect(result.status)
      .toBe('admitted_for_descriptive_benchmark_only');
  });

  it('does not materialize any additional FR293 product column', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
