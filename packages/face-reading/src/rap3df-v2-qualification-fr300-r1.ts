import {
  FR300_REAL_INDEPENDENT_3D_NOSE_REFERENCE_PILOT_CONTRACT_VERSION,
  qualifyFR300Dataset,
  type FR300DatasetQualificationEvidence,
  type FR300DatasetQualificationReceipt,
} from './real-independent-3d-nose-reference-pilot-fr300.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1_RAP3DF_V2_QUALIFICATION_CONTRACT_VERSION =
  'FR300-R1-RAP3DF-V2-QUALIFICATION-v1' as const;

export const FR300_R1_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1-rap3df-v2-qualification.md' as const;

export const FR300_R1_RAP3DF_V2_DATASET_REF =
  'doi:10.17632/kpdkpcs8zb.4' as const;

export const FR300_R1_RAP3DF_V2_OFFICIAL_SOURCE_REF =
  'https://data.mendeley.com/datasets/kpdkpcs8zb' as const;

export const FR300_R1_RAP3DF_V2_LICENSE_EVIDENCE_REF =
  'https://data.mendeley.com/datasets/compare/kpdkpcs8zb' as const;

export const FR300_R1_CC_BY_4_0_REF =
  'https://creativecommons.org/licenses/by/4.0/' as const;

export const FR300_R1_RAP3DF_ARTICLE_REF =
  'pmcid:PMC7509182' as const;

export const FR300_R1_KINECT_V2_DEPTH_SEMANTICS_REF =
  'https://learn.microsoft.com/en-us/previous-versions/windows/kinect/dn772983(v=ieb.10)' as const;

export const FR300_R1_RAP3DF_V2_METADATA_AUDIT =
  Object.freeze({
    mendeleyVersion: 4 as const,
    mendeleyPublishedVolunteerCount: 80 as const,
    relatedThesisReportedVolunteerCount: 90 as const,
    volunteerCountDiscrepancyPresent: true as const,
    discrepancyBlocksSingleVerifiedSamplePilot: false as const,
  });

export const FR300_R1_EXECUTION_STATE = Object.freeze({
  sourceBytesRetrievedInCurrentExecution: false as const,
  sourceArtifactDigestIssued: false as const,
  rawDepthEncodingVerifiedFromBytes: false as const,
  metricScaleVerified: false as const,
  canonicalRegistrationReady: false as const,
  realFR299BundleMaterialized: false as const,
});

export type FR300R1RawDepthInspectionBlocker =
  | 'source_bytes_not_inspected'
  | 'byte_length_not_positive'
  | 'grid_dimensions_not_positive'
  | 'value_width_not_supported'
  | 'byte_length_not_equal_to_grid_times_value_width'
  | 'numeric_encoding_not_established'
  | 'finite_value_coverage_incomplete'
  | 'dataset_serialization_evidence_missing'
  | 'dataset_value_unit_evidence_missing'
  | 'dataset_values_not_bound_to_native_kinect_depth_semantics';

export interface FR300R1RawDepthInspectionInput {
  readonly schemaVersion:
    'fr300-r1-raw-depth-inspection-input-v1';
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly sourceBytesActuallyInspected: boolean;
  readonly byteLength: number;
  readonly width: number;
  readonly height: number;
  readonly byteWidthPerValue: 2 | 4 | 8;
  readonly numericEncoding:
    | 'uint16_le'
    | 'float32_le'
    | 'float64_le'
    | 'unknown';
  readonly totalValueCount: number;
  readonly finiteValueCount: number;
  readonly minimumFiniteValue: number | null;
  readonly maximumFiniteValue: number | null;
  readonly datasetSerializationEvidenceRef: string | null;
  readonly datasetValueUnitEvidenceRef: string | null;
  readonly valuesBoundToNativeKinectDepthDistanceMillimeters:
    boolean;
}

export interface FR300R1RawDepthInspectionReport {
  readonly schemaVersion:
    'fr300-r1-raw-depth-inspection-report-v1';
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly status:
    | 'ready_for_metric_scale_adjudication'
    | 'blocked';
  readonly blockers:
    readonly FR300R1RawDepthInspectionBlocker[];
  readonly structuralInspection: {
    readonly sourceBytesActuallyInspected: boolean;
    readonly byteLength: number;
    readonly width: number;
    readonly height: number;
    readonly byteWidthPerValue: 2 | 4 | 8;
    readonly expectedByteLength: number;
    readonly numericEncoding:
      FR300R1RawDepthInspectionInput['numericEncoding'];
    readonly totalValueCount: number;
    readonly finiteValueCount: number;
    readonly minimumFiniteValue: number | null;
    readonly maximumFiniteValue: number | null;
  };
  readonly authorityBoundary: {
    readonly microsoftNativeDepthSemanticsAreDatasetSerializationProof: false;
    readonly relatedV1ArticleEncodingIsV2EncodingProof: false;
    readonly metricScaleVerifiedByFR300R1: false;
    readonly canonicalRegistrationIssued: false;
    readonly realFR299BundleIssued: false;
  };
}

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/?=&%()\-]{0,1023}$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1 ${message}`);
}

function ref(value: string, label: string): string {
  const trimmed = value.trim();
  if (!SAFE_REF.test(trimmed)) {
    fail(`${label} must be a bounded non-empty reference without whitespace.`);
  }
  return trimmed;
}

function digest(value: string, label: string): string {
  if (!SHA256.test(value)) {
    fail(`${label} must be sha256:<64 lowercase hex>.`);
  }
  return value;
}

export const FR300_R1_RAP3DF_V2_DATASET_EVIDENCE:
FR300DatasetQualificationEvidence = Object.freeze({
  schemaVersion:
    'fr300-dataset-qualification-evidence-v1' as const,
  datasetRef: FR300_R1_RAP3DF_V2_DATASET_REF,
  officialSourceRef:
    FR300_R1_RAP3DF_V2_OFFICIAL_SOURCE_REF,
  sourceOwnerRef:
    'organization:universidade-do-vale-do-itajai:rap3df',
  sourceDescriptionEvidenceRef:
    FR300_R1_RAP3DF_V2_OFFICIAL_SOURCE_REF,
  licenseEvidenceRef:
    FR300_R1_RAP3DF_V2_LICENSE_EVIDENCE_REF,
  containsRealRgb: true,
  containsIndependent3DGroundTruth: true,
  rgb3DPairingDocumented: true,
  metricScaleDocumented: false,
  source3DRegistrationDocumented: false,
  source3DRegistrationFrameRef: null,
  sparseLandmarksGeneratedByImageModel: false,

  // These four statuses are copyright/database-licence permissions
  // supplied by the dataset's CC BY 4.0 licence. They do not grant
  // participant personality, privacy, publicity or consent scope.
  commercialProductDevelopmentStatus: 'explicitly_allowed',
  localRawDataProcessingStatus: 'explicitly_allowed',
  rawDataRedistributionStatus: 'explicitly_allowed',
  derivedReferenceMetadataPublicationStatus:
    'explicitly_allowed',

  // CC BY 4.0 explicitly does not itself license privacy/publicity
  // rights. Public material documents ethics approval and signed
  // consent/image-use terms, but the exact terms audited here do not
  // establish MyeongHa commercial product-development scope.
  personalityPrivacyUseStatus: 'unresolved',
  participantConsentScopeStatus: 'unresolved',
});

export const FR300_R1_RAP3DF_V2_QUALIFICATION:
FR300DatasetQualificationReceipt = qualifyFR300Dataset(
  FR300_R1_RAP3DF_V2_DATASET_EVIDENCE,
);

export function inspectFR300R1RawDepthArtifact(
  input: FR300R1RawDepthInspectionInput,
): FR300R1RawDepthInspectionReport {
  if (
    input.schemaVersion !==
      'fr300-r1-raw-depth-inspection-input-v1'
  ) {
    fail('raw-depth inspection input schemaVersion drift.');
  }

  const artifactRef = ref(input.artifactRef, 'artifactRef');
  const artifactDigest = digest(
    input.artifactDigest,
    'artifactDigest',
  );
  const blockers: FR300R1RawDepthInspectionBlocker[] = [];

  if (!input.sourceBytesActuallyInspected) {
    blockers.push('source_bytes_not_inspected');
  }
  if (!Number.isSafeInteger(input.byteLength) || input.byteLength <= 0) {
    blockers.push('byte_length_not_positive');
  }
  if (
    !Number.isSafeInteger(input.width) ||
    input.width <= 0 ||
    !Number.isSafeInteger(input.height) ||
    input.height <= 0
  ) {
    blockers.push('grid_dimensions_not_positive');
  }
  if (
    input.byteWidthPerValue !== 2 &&
    input.byteWidthPerValue !== 4 &&
    input.byteWidthPerValue !== 8
  ) {
    blockers.push('value_width_not_supported');
  }

  const expectedByteLength =
    Number.isSafeInteger(input.width) &&
    Number.isSafeInteger(input.height) &&
    input.width > 0 &&
    input.height > 0
      ? input.width * input.height * input.byteWidthPerValue
      : 0;

  if (
    expectedByteLength > 0 &&
    input.byteLength !== expectedByteLength
  ) {
    blockers.push(
      'byte_length_not_equal_to_grid_times_value_width',
    );
  }
  if (input.numericEncoding === 'unknown') {
    blockers.push('numeric_encoding_not_established');
  }

  if (
    !Number.isSafeInteger(input.totalValueCount) ||
    input.totalValueCount <= 0 ||
    !Number.isSafeInteger(input.finiteValueCount) ||
    input.finiteValueCount !== input.totalValueCount
  ) {
    blockers.push('finite_value_coverage_incomplete');
  }

  if (
    input.datasetSerializationEvidenceRef === null ||
    input.datasetSerializationEvidenceRef.trim().length === 0
  ) {
    blockers.push('dataset_serialization_evidence_missing');
  } else {
    ref(
      input.datasetSerializationEvidenceRef,
      'datasetSerializationEvidenceRef',
    );
  }

  if (
    input.datasetValueUnitEvidenceRef === null ||
    input.datasetValueUnitEvidenceRef.trim().length === 0
  ) {
    blockers.push('dataset_value_unit_evidence_missing');
  } else {
    ref(
      input.datasetValueUnitEvidenceRef,
      'datasetValueUnitEvidenceRef',
    );
  }

  if (
    input.valuesBoundToNativeKinectDepthDistanceMillimeters !==
    true
  ) {
    blockers.push(
      'dataset_values_not_bound_to_native_kinect_depth_semantics',
    );
  }

  if (
    input.minimumFiniteValue !== null &&
    !Number.isFinite(input.minimumFiniteValue)
  ) {
    fail('minimumFiniteValue must be finite when supplied.');
  }
  if (
    input.maximumFiniteValue !== null &&
    !Number.isFinite(input.maximumFiniteValue)
  ) {
    fail('maximumFiniteValue must be finite when supplied.');
  }
  if (
    input.minimumFiniteValue !== null &&
    input.maximumFiniteValue !== null &&
    input.minimumFiniteValue > input.maximumFiniteValue
  ) {
    fail('minimumFiniteValue must not exceed maximumFiniteValue.');
  }

  return Object.freeze({
    schemaVersion:
      'fr300-r1-raw-depth-inspection-report-v1' as const,
    artifactRef,
    artifactDigest,
    status:
      blockers.length === 0
        ? 'ready_for_metric_scale_adjudication'
        : 'blocked',
    blockers: Object.freeze(blockers),
    structuralInspection: Object.freeze({
      sourceBytesActuallyInspected:
        input.sourceBytesActuallyInspected,
      byteLength: input.byteLength,
      width: input.width,
      height: input.height,
      byteWidthPerValue: input.byteWidthPerValue,
      expectedByteLength,
      numericEncoding: input.numericEncoding,
      totalValueCount: input.totalValueCount,
      finiteValueCount: input.finiteValueCount,
      minimumFiniteValue: input.minimumFiniteValue,
      maximumFiniteValue: input.maximumFiniteValue,
    }),
    authorityBoundary: Object.freeze({
      microsoftNativeDepthSemanticsAreDatasetSerializationProof:
        false as const,
      relatedV1ArticleEncodingIsV2EncodingProof: false as const,
      metricScaleVerifiedByFR300R1: false as const,
      canonicalRegistrationIssued: false as const,
      realFR299BundleIssued: false as const,
    }),
  });
}

export function assertFR300R1Rap3dfV2QualificationContract():
void {
  if (
    FR300_REAL_INDEPENDENT_3D_NOSE_REFERENCE_PILOT_CONTRACT_VERSION !==
      'FR300-REAL-INDEPENDENT-3D-NOSE-REFERENCE-PILOT-v1'
  ) {
    fail('FR300 predecessor contract drift.');
  }
  assertFR293ProductColumnMap();

  const blockers =
    FR300_R1_RAP3DF_V2_QUALIFICATION.blockers;

  if (
    FR300_R1_RAP3DF_V2_QUALIFICATION.status !== 'blocked' ||
    blockers.includes('license_evidence_missing') ||
    blockers.includes(
      'commercial_product_development_rights_unresolved',
    ) ||
    blockers.includes(
      'local_raw_data_processing_rights_unresolved',
    ) ||
    blockers.includes(
      'derived_reference_metadata_publication_rights_unresolved',
    ) ||
    !blockers.includes('metric_scale_not_documented') ||
    !blockers.includes(
      'source_3d_registration_not_documented',
    ) ||
    !blockers.includes(
      'source_3d_registration_frame_missing',
    ) ||
    !blockers.includes(
      'personality_privacy_scope_unresolved',
    ) ||
    !blockers.includes(
      'participant_consent_scope_unresolved',
    )
  ) {
    fail('RAP3DF V2 qualification must separate CC BY rights from unresolved personality/consent and technical authority.');
  }

  if (
    FR300_R1_RAP3DF_V2_QUALIFICATION
      .rawDataRedistributionAllowed !== true
  ) {
    fail('RAP3DF V2 CC BY 4.0 redistribution permission drift.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300-R1 must preserve 18/29 product materialization.');
  }
}

assertFR300R1Rap3dfV2QualificationContract();
