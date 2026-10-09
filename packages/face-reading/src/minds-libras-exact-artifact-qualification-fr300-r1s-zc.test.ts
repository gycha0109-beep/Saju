import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1S_ZC_CURRENT_GATE,
  FR300_R1S_ZC_MINDS_CREATOR_SCHEMA,
  FR300_R1S_ZC_MINDS_METRIC_BOUNDARY,
  FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS,
  FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION,
  FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY,
  assertFR300R1SZCMindsMetadataContract,
} from './minds-libras-exact-artifact-qualification-fr300-r1s-zc.js';

describe('FR300-R1S-ZC MINDS-Libras metadata-first qualification', () => {
  it('binds only the public distribution metadata actually exposed by source authority', () => {
    expect(FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION).toMatchObject({
      doi: '10.5281/zenodo.4322984',
      version: '1',
      publicationDate: '2020-12-15',
      distributionForm: 'downloadable',
      archiveFormat: 'zip',
      publicDistributionSizeBytes: 2149770033,
      datasetCopyrightLicenseId: 'CC-BY-4.0',
      exactPublisherArchiveFilename: null,
      exactPublisherArchiveChecksum: null,
      exactPublisherFileId: null,
      publisherArchiveIdentityState:
        'partial_metadata_bound_filename_checksum_unresolved',
    });
  });

  it('freezes the creator-described 150-frame / 1347-point face schema', () => {
    expect(FR300_R1S_ZC_MINDS_CREATOR_SCHEMA).toMatchObject({
      captureDevice: 'Kinect_v2_for_Xbox_One',
      frameCountPerRgbdSample: 150,
      faceLogicalRowsPerFrame: 11,
      faceTextLogicalLineCountPerSample: 1650,
      faceModelPointCount: 1347,
      faceModel: {
        xRow: 5,
        yRow: 6,
        zRow: 7,
        coordinateReference: 'sensor_geometric_center',
        documentedUnit: 'meter',
      },
      colorFaceModel: {
        xRow: 8,
        yRow: 9,
        mapsSameFaceModelPointIndices: true,
        targetFrame: 'rgb',
      },
      depthFaceModel: {
        xRow: 10,
        yRow: 11,
        mapsSameFaceModelPointIndices: true,
        targetFrame: 'depth',
      },
    });
  });

  it('does not promote Kinect NoseTip/NoseTop indices into FR266/FR297 truth', () => {
    expect(FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS.documentedKinectIndices).toEqual({
      noseTip: 18,
      noseTop: 24,
    });
    expect(FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS.fr266GroundTruthIssued).toBe(false);
    expect(FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS.fr297GroundTruthIssued).toBe(false);
    expect(
      FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS
        .providerIndicesVisibleDuringFR266Annotation,
    ).toBe(false);
    expect(
      FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS
        .providerIndicesVisibleDuringFR297Annotation,
    ).toBe(false);
    expect(
      FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS
        .noseTopEquivalentToFR297BridgeRootIssued,
    ).toBe(false);
  });

  it('separates CC BY copyright permission from participant product-development consent', () => {
    expect(FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY.datasetCopyrightLicenseBound).toBe(true);
    expect(
      FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY.ccBy4CommercialCopyrightUseCompatible,
    ).toBe(true);
    expect(
      FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY
        .participantCommercialProductDevelopmentScope,
    ).toBe('unresolved');
    expect(
      FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY
        .datasetLicenseMaySubstituteForParticipantConsent,
    ).toBe(false);
    expect(
      FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY
        .subjectArtifactInspectionAuthorizedByThisContract,
    ).toBe(false);
  });

  it('does not treat documented meter semantics as released-byte metric verification', () => {
    expect(
      FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.creatorDocumentationBindsMeterSemantics,
    ).toBe(true);
    expect(FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.releasedBytesInspected).toBe(false);
    expect(
      FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.releasedByteMeterSurvivability,
    ).toBe('unresolved');
    expect(
      FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.quantizationOrNormalizationExcluded,
    ).toBe(false);
    expect(
      FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.fr299MetricScaleVerifiedIssued,
    ).toBe(false);
  });

  it('keeps subject artifacts, FR299, R2, spend and product materialization fail-closed', () => {
    expect(FR300_R1S_ZC_CURRENT_GATE.zeroCost).toBe(true);
    expect(FR300_R1S_ZC_CURRENT_GATE.paidSpendAuthorized).toBe(false);
    expect(
      FR300_R1S_ZC_CURRENT_GATE.authority.subjectArtifactInspectionAuthorized,
    ).toBe(false);
    expect(FR300_R1S_ZC_CURRENT_GATE.fr299EligibleCandidateCount).toBe(0);
    expect(FR300_R1S_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(0);
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (item) =>
          item.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() => assertFR300R1SZCMindsMetadataContract()).not.toThrow();
  });
});
