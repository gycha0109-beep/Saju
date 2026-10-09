import { describe, expect, it } from 'vitest';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR298_REFERENCE_AXIS_DEFINITION_REF,
} from './neutral-nose-tip-bridge-relative-projection-axis-fr298.js';
import {
  buildFR299Independent3DNoseReferenceBundle,
  type FR299Independent3DNoseReferenceBundleInput,
} from './independent-3d-nose-reference-bundle-fr299.js';

const D1 = `sha256:${'1'.repeat(64)}`;
const D2 = `sha256:${'2'.repeat(64)}`;
const D3 = `sha256:${'3'.repeat(64)}`;
const D4 = `sha256:${'4'.repeat(64)}`;

function input(): FR299Independent3DNoseReferenceBundleInput {
  return {
    schemaVersion:
      'fr299-independent-3d-nose-reference-bundle-input-v1',
    bundleId: 'fr299:bundle:subject-001:capture-001',
    source: {
      referenceSourceClass: 'independent_calibrated_3d',
      datasetRef: 'dataset:qualified-independent-3d:v1',
      subjectId: 'subject-001',
      captureId: 'capture-001',
      source3DArtifactRef: 'dataset:mesh:subject-001:capture-001',
      source3DArtifactDigest: D1,
      metricScaleVerified: true,
      independentFromCandidateProvider: true,
      candidateProviderOutputUsedAsReference: false,
      candidateProviderIndicesUsedAsReference: false,
    },
    registration: {
      schemaVersion:
        'fr299-external-canonical-registration-receipt-v1',
      source3DArtifactRef: 'dataset:mesh:subject-001:capture-001',
      source3DArtifactDigest: D1,
      sourceCoordinateFrameRef: 'dataset:frame:v1',
      targetCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      targetUnit: 'centimeter',
      registrationMethodRef: 'registration:independent-method:v1',
      registrationArtifactDigest: D2,
      registrationValidationRef: 'validation:registration:001',
      registrationValidated: true,
      metricScalePreservedOrCalibrated: true,
      independentFromCandidateProvider: true,
      candidateProviderOutputUsedDuringRegistration: false,
      candidateProviderIndicesUsedDuringRegistration: false,
      traditionalLabelsUsedDuringRegistration: false,
      registrationFrozenBeforeReferenceDerivation: true,
      registrationFrozenBeforeRgbCandidateScoring: true,
    },
    rgbBinding: {
      schemaVersion:
        'fr299-rgb-reference-correspondence-receipt-v1',
      rgbObservationRef: 'dataset:rgb:subject-001:capture-001',
      correspondenceValidationRef: 'validation:rgb-3d-binding:001',
      sameCaptureBindingEstablished: true,
      validatedRegistrationBindingEstablished: false,
      correspondenceVerified: true,
      candidateOutputVisibleDuringBinding: false,
      traditionalLabelVisibleDuringBinding: false,
      frozenBeforeRgbCandidateScoring: true,
    },
    tip: {
      artifactRef: 'annotation:tip:001',
      artifactDigest: D3,
      annotation: {
        schemaVersion:
          'fr266-provider-independent-nasal-apex-annotation-v1',
        subjectId: 'subject-001',
        captureId: 'capture-001',
        annotatorId: 'annotator-tip',
        coordinateFrame:
          'canonical_aligned_right_handed_metric_3d',
        unit: 'centimeter',
        point: { x: 0, y: 0, z: 2 },
        annotationDefinition:
          'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d',
        providerOutputVisibleDuringAnnotation: false,
        providerIndicesVisibleDuringAnnotation: false,
        traditionalLabelVisibleDuringAnnotation: false,
        annotationFrozenBeforeProviderScoring: true,
      },
    },
    bridgeRoot: {
      artifactRef: 'annotation:bridge-root:001',
      artifactDigest: D4,
      annotation: {
        schemaVersion:
          'fr297-provider-independent-nasal-bridge-root-annotation-v1',
        subjectId: 'subject-001',
        captureId: 'capture-001',
        annotatorId: 'annotator-root',
        coordinateFrame:
          'canonical_aligned_right_handed_metric_3d',
        unit: 'centimeter',
        point: { x: 0, y: 3, z: 0 },
        annotationDefinition:
          'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end',
        independentReferenceSurfaceVerified: true,
        providerOutputVisibleDuringAnnotation: false,
        providerIndicesVisibleDuringAnnotation: false,
        traditionalLabelVisibleDuringAnnotation: false,
        annotationFrozenBeforeRgbCandidateScoring: true,
      },
    },
    referenceFrozenBeforeRgbCandidateScoring: true,
  };
}

describe('FR299 independent 3D nose reference bundle', () => {
  it('materializes provenance plus the FR298 scalar without persisting raw coordinates', () => {
    const result =
      buildFR299Independent3DNoseReferenceBundle(input());

    expect(result.reference.referenceAxisDefinitionRef)
      .toBe(FR298_REFERENCE_AXIS_DEFINITION_REF);
    expect(result.reference.value)
      .toBeCloseTo(2 / Math.hypot(0, -3, 2), 12);
    expect(result.registration).toMatchObject({
      externallyValidated: true,
      transformIssuedByFR299: false,
      candidateProviderIndependent: true,
    });
    expect(result.frozenAnnotations).toMatchObject({
      subjectAndCaptureBoundToSource: true,
      rawAnnotationCoordinatesPersistedInBundle: false,
    });
    expect(result.privacyBoundary).toEqual({
      raw3DMeshPersistedInBundle: false,
      rawRgbPersistedInBundle: false,
      rawAnnotationCoordinatesPersistedInBundle: false,
      annotationArtifactRefsAndDigestsPersisted: true,
      derivedReferenceScalarPersisted: true,
    });
    expect(result.readiness).toMatchObject({
      realSourceEvidenceRequiredAtRuntime: true,
      externalRegistrationReceiptRequired: true,
      fr295ReferenceComponentReady: true,
      fr295CandidateIssued: false,
      fr295CandidateReferenceAdmissionIssued: false,
    });
  });

  it('rejects a registration receipt for a different source artifact', () => {
    const value = input();
    expect(() =>
      buildFR299Independent3DNoseReferenceBundle({
        ...value,
        registration: {
          ...value.registration,
          source3DArtifactRef: 'dataset:mesh:other',
        },
      }),
    ).toThrow(/bind the exact independent 3D source artifact/);
  });

  it('rejects unvalidated external registration', () => {
    const value = input();
    const invalid = {
      ...value,
      registration: {
        ...value.registration,
        registrationValidated: false,
      },
    } as unknown as FR299Independent3DNoseReferenceBundleInput;

    expect(() =>
      buildFR299Independent3DNoseReferenceBundle(invalid),
    ).toThrow(/external canonical registration boundary drift/);
  });

  it('rejects candidate-provider output used during registration', () => {
    const value = input();
    const invalid = {
      ...value,
      registration: {
        ...value.registration,
        candidateProviderOutputUsedDuringRegistration: true,
      },
    } as unknown as FR299Independent3DNoseReferenceBundleInput;

    expect(() =>
      buildFR299Independent3DNoseReferenceBundle(invalid),
    ).toThrow(/external canonical registration boundary drift/);
  });

  it('rejects missing RGB/reference correspondence binding', () => {
    const value = input();
    const invalid = {
      ...value,
      rgbBinding: {
        ...value.rgbBinding,
        sameCaptureBindingEstablished: false,
        validatedRegistrationBindingEstablished: false,
      },
    };

    expect(() =>
      buildFR299Independent3DNoseReferenceBundle(invalid),
    ).toThrow(/same-capture or validated-registration binding/);
  });

  it('accepts validated RGB/reference registration when same-capture is unavailable', () => {
    const value = input();
    const result =
      buildFR299Independent3DNoseReferenceBundle({
        ...value,
        rgbBinding: {
          ...value.rgbBinding,
          sameCaptureBindingEstablished: false,
          validatedRegistrationBindingEstablished: true,
        },
      });

    expect(result.rgbBinding).toMatchObject({
      sameCaptureBindingEstablished: false,
      validatedRegistrationBindingEstablished: true,
      correspondenceVerified: true,
    });
  });

  it('rejects an annotation from a different subject', () => {
    const value = input();
    expect(() =>
      buildFR299Independent3DNoseReferenceBundle({
        ...value,
        bridgeRoot: {
          ...value.bridgeRoot,
          annotation: {
            ...value.bridgeRoot.annotation,
            subjectId: 'subject-002',
          },
        },
      }),
    ).toThrow(/exact source subject/);
  });

  it('rejects an annotation from a different independent 3D capture', () => {
    const value = input();
    expect(() =>
      buildFR299Independent3DNoseReferenceBundle({
        ...value,
        tip: {
          ...value.tip,
          annotation: {
            ...value.tip.annotation,
            captureId: 'capture-002',
          },
        },
      }),
    ).toThrow(/exact independent 3D source capture/);
  });

  it('rejects invalid provenance digests', () => {
    const value = input();
    expect(() =>
      buildFR299Independent3DNoseReferenceBundle({
        ...value,
        source: {
          ...value.source,
          source3DArtifactDigest: 'sha256:not-valid',
        },
      }),
    ).toThrow(/source3DArtifactDigest must be sha256/);
  });

  it('does not widen into candidate, threshold, traditional, product, or runtime authority', () => {
    const result =
      buildFR299Independent3DNoseReferenceBundle(input());

    expect(Object.values(result.authorityBoundary))
      .toEqual([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
  });

  it('preserves FR293 at 18/29 materialized', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
