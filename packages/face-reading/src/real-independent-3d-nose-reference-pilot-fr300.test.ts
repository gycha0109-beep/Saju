import { describe, expect, it } from 'vitest';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_IBUG_3DMDLAB_REAL_QUALIFICATION,
  materializeFR300RealReferencePilot,
  qualifyFR300Dataset,
  type FR300DatasetQualificationEvidence,
  type FR300RealReferencePilotInput,
} from './real-independent-3d-nose-reference-pilot-fr300.js';

const RGB = `sha256:${'1'.repeat(64)}`;
const MESH = `sha256:${'2'.repeat(64)}`;
const REG = `sha256:${'3'.repeat(64)}`;
const TIP = `sha256:${'4'.repeat(64)}`;
const ROOT = `sha256:${'5'.repeat(64)}`;

function admittedEvidence(): FR300DatasetQualificationEvidence {
  return {
    schemaVersion:
      'fr300-dataset-qualification-evidence-v1',
    datasetRef: 'fixture:independent-rgb-3d:v1',
    officialSourceRef: 'https://example.test/dataset',
    sourceOwnerRef: 'organization:fixture-owner',
    sourceDescriptionEvidenceRef:
      'https://example.test/dataset-description',
    licenseEvidenceRef:
      'https://example.test/dataset-license',
    containsRealRgb: true,
    containsIndependent3DGroundTruth: true,
    rgb3DPairingDocumented: true,
    metricScaleDocumented: true,
    source3DRegistrationDocumented: true,
    source3DRegistrationFrameRef:
      'external-model-frame:fixture-v1',
    sparseLandmarksGeneratedByImageModel: false,
    commercialProductDevelopmentStatus:
      'explicitly_allowed',
    localRawDataProcessingStatus: 'explicitly_allowed',
    rawDataRedistributionStatus: 'explicitly_prohibited',
    derivedReferenceMetadataPublicationStatus:
      'explicitly_allowed',
  };
}

function pilotInput(): FR300RealReferencePilotInput {
  const qualification =
    qualifyFR300Dataset(admittedEvidence());

  return {
    schemaVersion:
      'fr300-real-reference-pilot-input-v1',
    qualification,
    sourceManifest: {
      schemaVersion: 'fr300-real-source-manifest-v1',
      datasetRef: qualification.datasetRef,
      subjectId: 'subject-001',
      captureId: 'capture-001',
      rgb: {
        artifactRef: 'artifact:rgb:001',
        artifactDigest: RGB,
        widthPixels: 2048,
        heightPixels: 2448,
        format: 'bmp',
      },
      mesh: {
        artifactRef: 'artifact:mesh:001',
        artifactDigest: MESH,
        format: 'obj',
        vertexCount: 1000,
        faceCount: 1800,
        sourceCoordinateFrameRef:
          'external-model-frame:fixture-v1',
        sourceUnit: 'millimeter',
      },
      pairing: {
        sameSubjectVerified: true,
        sameCaptureVerified: true,
        pairingEvidenceRef: 'evidence:pairing:001',
      },
      rawRgbCommittedToRepository: false,
      rawMeshCommittedToRepository: false,
    },
    fr299Input: {
      schemaVersion:
        'fr299-independent-3d-nose-reference-bundle-input-v1',
      bundleId: 'fr300:bundle:subject-001:capture-001',
      source: {
        referenceSourceClass: 'independent_calibrated_3d',
        datasetRef: qualification.datasetRef,
        subjectId: 'subject-001',
        captureId: 'capture-001',
        source3DArtifactRef: 'artifact:mesh:001',
        source3DArtifactDigest: MESH,
        metricScaleVerified: true,
        independentFromCandidateProvider: true,
        candidateProviderOutputUsedAsReference: false,
        candidateProviderIndicesUsedAsReference: false,
      },
      registration: {
        schemaVersion:
          'fr299-external-canonical-registration-receipt-v1',
        source3DArtifactRef: 'artifact:mesh:001',
        source3DArtifactDigest: MESH,
        sourceCoordinateFrameRef:
          'external-model-frame:fixture-v1',
        targetCoordinateFrame:
          'canonical_aligned_right_handed_metric_3d',
        targetUnit: 'centimeter',
        registrationMethodRef:
          'registration:fixture-independent:v1',
        registrationArtifactDigest: REG,
        registrationValidationRef:
          'validation:registration:fixture-001',
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
        rgbObservationRef: 'artifact:rgb:001',
        correspondenceValidationRef:
          'validation:rgb-3d-pairing:001',
        sameCaptureBindingEstablished: true,
        validatedRegistrationBindingEstablished: false,
        correspondenceVerified: true,
        candidateOutputVisibleDuringBinding: false,
        traditionalLabelVisibleDuringBinding: false,
        frozenBeforeRgbCandidateScoring: true,
      },
      tip: {
        artifactRef: 'annotation:tip:001',
        artifactDigest: TIP,
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
        artifactDigest: ROOT,
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
    },
  };
}

describe('FR300 real independent 3D nose reference pilot', () => {
  it('keeps 3dMDLab_real blocked while rights and metric scale are unresolved', () => {
    expect(FR300_IBUG_3DMDLAB_REAL_QUALIFICATION.status)
      .toBe('blocked');
    expect(FR300_IBUG_3DMDLAB_REAL_QUALIFICATION.blockers)
      .toEqual(expect.arrayContaining([
        'license_evidence_missing',
        'metric_scale_not_documented',
        'commercial_product_development_rights_unresolved',
        'local_raw_data_processing_rights_unresolved',
        'derived_reference_metadata_publication_rights_unresolved',
      ]));
    expect(
      FR300_IBUG_3DMDLAB_REAL_QUALIFICATION
        .rawDataRedistributionAllowed,
    ).toBe(false);
    expect(
      FR300_IBUG_3DMDLAB_REAL_QUALIFICATION
        .sparseImageModelLandmarksAllowedAsGroundTruth,
    ).toBe(false);
    expect(
      FR300_IBUG_3DMDLAB_REAL_QUALIFICATION
        .sourceRegistrationEquivalentToMyeongHaCanonical,
    ).toBe(false);
  });

  it('admits only explicitly usable source evidence', () => {
    const receipt = qualifyFR300Dataset(admittedEvidence());

    expect(receipt).toMatchObject({
      status: 'admitted_for_real_reference_pilot',
      blockers: [],
      rawDataRedistributionAllowed: false,
      sparseImageModelLandmarksAllowedAsGroundTruth: false,
      sourceRegistrationEquivalentToMyeongHaCanonical: false,
    });
  });

  it('blocks noncommercial-only product-development evidence', () => {
    const evidence = admittedEvidence();
    const receipt = qualifyFR300Dataset({
      ...evidence,
      commercialProductDevelopmentStatus:
        'noncommercial_only',
    });

    expect(receipt.status).toBe('blocked');
    expect(receipt.blockers).toContain(
      'commercial_product_development_not_allowed',
    );
  });

  it('materializes a qualified fixture through FR299 twice with identical provenance and scalar', () => {
    const result =
      materializeFR300RealReferencePilot(pilotInput());

    expect(result.status)
      .toBe('real_reference_pilot_materialized');
    expect(result.referenceBundle.reference.value)
      .toBeCloseTo(2 / Math.hypot(0, -3, 2), 12);
    expect(result.reproducibility).toEqual({
      rerunCount: 2,
      deterministicReferenceValue: true,
      deterministicProvenanceBinding: true,
    });
    expect(result.authorityBoundary).toEqual({
      datasetRightsInferredByFR300: false,
      sourceRegistrationTransformIssuedByFR300: false,
      imageModelSparseLandmarksPromotedToGroundTruth: false,
      rgbCandidateIssued: false,
      benchmarkWinnerIssued: false,
      acceptanceThresholdIssued: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('refuses materialization when dataset qualification is blocked', () => {
    const value = pilotInput();

    expect(() =>
      materializeFR300RealReferencePilot({
        ...value,
        qualification:
          FR300_IBUG_3DMDLAB_REAL_QUALIFICATION,
      }),
    ).toThrow(/dataset qualification must be admitted/);
  });

  it('refuses a manifest/FR299 mesh digest mismatch', () => {
    const value = pilotInput();

    expect(() =>
      materializeFR300RealReferencePilot({
        ...value,
        fr299Input: {
          ...value.fr299Input,
          source: {
            ...value.fr299Input.source,
            source3DArtifactDigest:
              `sha256:${'9'.repeat(64)}`,
          },
        },
      }),
    ).toThrow(/exact manifest 3D artifact/);
  });

  it('refuses a different RGB observation binding', () => {
    const value = pilotInput();

    expect(() =>
      materializeFR300RealReferencePilot({
        ...value,
        fr299Input: {
          ...value.fr299Input,
          rgbBinding: {
            ...value.fr299Input.rgbBinding,
            rgbObservationRef: 'artifact:rgb:other',
          },
        },
      }),
    ).toThrow(/exact manifest RGB artifact/);
  });

  it('refuses a registration receipt starting from a different source frame', () => {
    const value = pilotInput();

    expect(() =>
      materializeFR300RealReferencePilot({
        ...value,
        fr299Input: {
          ...value.fr299Input,
          registration: {
            ...value.fr299Input.registration,
            sourceCoordinateFrameRef:
              'external-model-frame:other',
          },
        },
      }),
    ).toThrow(/exact manifest source coordinate frame/);
  });

  it('refuses raw RGB or mesh repository persistence', () => {
    const value = pilotInput();
    const invalid = {
      ...value,
      sourceManifest: {
        ...value.sourceManifest,
        rawRgbCommittedToRepository: true,
      },
    } as unknown as FR300RealReferencePilotInput;

    expect(() =>
      materializeFR300RealReferencePilot(invalid),
    ).toThrow(/provenance\/privacy boundary drift/);
  });

  it('preserves FR293 product materialization at 18/29', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
