import { describe, expect, it } from 'vitest';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1_EXECUTION_STATE,
  FR300_R1_RAP3DF_V2_DATASET_EVIDENCE,
  FR300_R1_RAP3DF_V2_METADATA_AUDIT,
  FR300_R1_RAP3DF_V2_QUALIFICATION,
  inspectFR300R1RawDepthArtifact,
} from './rap3df-v2-qualification-fr300-r1.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;

describe('FR300-R1 RAP3DF V2 qualification', () => {
  it('records the official CC BY 4.0 dataset licence instead of a missing-licence blocker', () => {
    expect(
      FR300_R1_RAP3DF_V2_DATASET_EVIDENCE
        .licenseEvidenceRef,
    ).not.toBeNull();
    expect(
      FR300_R1_RAP3DF_V2_DATASET_EVIDENCE
        .commercialProductDevelopmentStatus,
    ).toBe('explicitly_allowed');
    expect(
      FR300_R1_RAP3DF_V2_DATASET_EVIDENCE
        .localRawDataProcessingStatus,
    ).toBe('explicitly_allowed');
    expect(
      FR300_R1_RAP3DF_V2_DATASET_EVIDENCE
        .rawDataRedistributionStatus,
    ).toBe('explicitly_allowed');
    expect(
      FR300_R1_RAP3DF_V2_DATASET_EVIDENCE
        .derivedReferenceMetadataPublicationStatus,
    ).toBe('explicitly_allowed');

    expect(
      FR300_R1_RAP3DF_V2_QUALIFICATION.blockers,
    ).not.toContain('license_evidence_missing');
    expect(
      FR300_R1_RAP3DF_V2_QUALIFICATION.blockers,
    ).not.toContain(
      'commercial_product_development_rights_unresolved',
    );
  });

  it('keeps participant personality/privacy and exact consent scope fail-closed', () => {
    expect(
      FR300_R1_RAP3DF_V2_QUALIFICATION.status,
    ).toBe('blocked');
    expect(
      FR300_R1_RAP3DF_V2_QUALIFICATION.blockers,
    ).toEqual(expect.arrayContaining([
      'personality_privacy_scope_unresolved',
      'participant_consent_scope_unresolved',
    ]));
  });

  it('keeps metric scale and canonical registration blocked', () => {
    expect(
      FR300_R1_RAP3DF_V2_QUALIFICATION.blockers,
    ).toEqual(expect.arrayContaining([
      'metric_scale_not_documented',
      'source_3d_registration_not_documented',
      'source_3d_registration_frame_missing',
    ]));
  });

  it('does not convert Microsoft native Kinect millimeters into RAP3DF V2 unit authority without dataset binding', () => {
    const report = inspectFR300R1RawDepthArtifact({
      schemaVersion:
        'fr300-r1-raw-depth-inspection-input-v1',
      artifactRef: 'artifact:rap3df-v2:depth:pending',
      artifactDigest: DIGEST,
      sourceBytesActuallyInspected: false,
      byteLength: 0,
      width: 0,
      height: 0,
      byteWidthPerValue: 8,
      numericEncoding: 'unknown',
      totalValueCount: 0,
      finiteValueCount: 0,
      minimumFiniteValue: null,
      maximumFiniteValue: null,
      datasetSerializationEvidenceRef: null,
      datasetValueUnitEvidenceRef: null,
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        false,
    });

    expect(report.status).toBe('blocked');
    expect(report.blockers).toEqual(expect.arrayContaining([
      'source_bytes_not_inspected',
      'numeric_encoding_not_established',
      'dataset_serialization_evidence_missing',
      'dataset_value_unit_evidence_missing',
      'dataset_values_not_bound_to_native_kinect_depth_semantics',
    ]));
    expect(report.authorityBoundary).toEqual({
      microsoftNativeDepthSemanticsAreDatasetSerializationProof:
        false,
      relatedV1ArticleEncodingIsV2EncodingProof: false,
      metricScaleVerifiedByFR300R1: false,
      canonicalRegistrationIssued: false,
      realFR299BundleIssued: false,
    });
  });

  it('can mark inspected bytes ready for later metric-scale adjudication without itself issuing metric authority', () => {
    const report = inspectFR300R1RawDepthArtifact({
      schemaVersion:
        'fr300-r1-raw-depth-inspection-input-v1',
      artifactRef: 'artifact:fixture:depth',
      artifactDigest: DIGEST,
      sourceBytesActuallyInspected: true,
      byteLength: 16,
      width: 2,
      height: 1,
      byteWidthPerValue: 8,
      numericEncoding: 'float64_le',
      totalValueCount: 2,
      finiteValueCount: 2,
      minimumFiniteValue: 500,
      maximumFiniteValue: 600,
      datasetSerializationEvidenceRef:
        'evidence:fixture:serialization',
      datasetValueUnitEvidenceRef:
        'evidence:fixture:unit',
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        true,
    });

    expect(report.status)
      .toBe('ready_for_metric_scale_adjudication');
    expect(report.blockers).toEqual([]);
    expect(
      report.authorityBoundary.metricScaleVerifiedByFR300R1,
    ).toBe(false);
  });

  it('blocks a byte-length/grid mismatch', () => {
    const report = inspectFR300R1RawDepthArtifact({
      schemaVersion:
        'fr300-r1-raw-depth-inspection-input-v1',
      artifactRef: 'artifact:fixture:depth',
      artifactDigest: DIGEST,
      sourceBytesActuallyInspected: true,
      byteLength: 24,
      width: 2,
      height: 1,
      byteWidthPerValue: 8,
      numericEncoding: 'float64_le',
      totalValueCount: 2,
      finiteValueCount: 2,
      minimumFiniteValue: 500,
      maximumFiniteValue: 600,
      datasetSerializationEvidenceRef:
        'evidence:fixture:serialization',
      datasetValueUnitEvidenceRef:
        'evidence:fixture:unit',
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        true,
    });

    expect(report.status).toBe('blocked');
    expect(report.blockers).toContain(
      'byte_length_not_equal_to_grid_times_value_width',
    );
  });

  it('records the V2 volunteer-count source discrepancy without fabricating a resolution', () => {
    expect(FR300_R1_RAP3DF_V2_METADATA_AUDIT).toEqual({
      mendeleyVersion: 4,
      mendeleyPublishedVolunteerCount: 80,
      relatedThesisReportedVolunteerCount: 90,
      volunteerCountDiscrepancyPresent: true,
      discrepancyBlocksSingleVerifiedSamplePilot: false,
    });
    expect(FR300_R1_EXECUTION_STATE).toEqual({
      sourceBytesRetrievedInCurrentExecution: false,
      sourceArtifactDigestIssued: false,
      rawDepthEncodingVerifiedFromBytes: false,
      metricScaleVerified: false,
      canonicalRegistrationReady: false,
      realFR299BundleMaterialized: false,
    });
  });

  it('preserves product materialization at 18/29', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
