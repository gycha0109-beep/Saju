import {
  FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION,
} from './rap3df-v2-real-depth-byte-intake-fr300-r1e.js';
import {
  FR300_R1_RAP3DF_V2_DATASET_REF,
} from './rap3df-v2-qualification-fr300-r1.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION =
  'FR300-R1G-CREATOR-PIPELINE-METRIC-AUDIT-v1' as const;

export const FR300_R1G_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1g-creator-pipeline-metric-audit.md' as const;

export const FR300_R1G_CREATOR_DATASET_REPO_REF =
  'https://github.com/Piemontez/rap3df-database' as const;

export const FR300_R1G_CREATOR_DATASET_COMMIT =
  '460b8873ab9a13e67ae82e0264d6dfbf10461e07' as const;

export const FR300_R1G_CREATOR_CONSUMER_REPO_REF =
  'https://github.com/Piemontez/facial-recognition' as const;

export const FR300_R1G_CREATOR_CONSUMER_COMMIT =
  '12bdcff0355d995f445acfd2a87d21fd391401f4' as const;

export const FR300_R1G_LIBFREENECT2_REGISTRATION_REF =
  'https://github.com/OpenKinect/libfreenect2/blob/master/src/registration.cpp' as const;

export const FR300_R1G_CREATOR_PIPELINE_EVIDENCE =
  Object.freeze({
    schemaVersion:
      'fr300-r1g-creator-pipeline-evidence-v1' as const,
    datasetRef: FR300_R1_RAP3DF_V2_DATASET_REF,
    creatorDatasetCommit:
      FR300_R1G_CREATOR_DATASET_COMMIT,
    creatorConsumerCommit:
      FR300_R1G_CREATOR_CONSUMER_COMMIT,
    collectionDirectory: 'rap3df_data_02' as const,
    creatorSnapshotFaceIdCount: 80 as const,
    acquisitionLibrary: 'libfreenect2' as const,
    nativeDepthFrameBytesPerPixel: 4 as const,
    nativeDepthFrameInterpretation: 'float32' as const,
    creatorExtractionExpression:
      'context->_depth->data[i+2]' as const,
    extractedSourceWidthBits: 8 as const,
    storedContainerType: 'uint16_t' as const,
    storedBytesPerValue: 2 as const,
    consumerWidth: 119 as const,
    consumerHeight: 149 as const,
    expectedStoredValueCount: 17_731 as const,
    expectedStoredByteLength: 35_462 as const,
    exactMendeleyV4ByteIdentityVerified: false as const,
  });

export interface FR300R1GCreatorSampleEvidence {
  readonly subjectRef: string;
  readonly artifactPath: string;
  readonly gitBlobSha: string;
  readonly byteLength: 35_462;
  readonly decodedWordCount: 17_731;
  readonly minimumLittleEndianWord: 0;
  readonly maximumLittleEndianWord: number;
  readonly nonzeroLittleEndianWordCount: number;
  readonly secondByteNonzeroCount: 0;
}

export const FR300_R1G_CREATOR_SAMPLE_EVIDENCE:
readonly FR300R1GCreatorSampleEvidence[] = Object.freeze([
  Object.freeze({
    subjectRef: 'creator-v2-face:P6HF7NR',
    artifactPath:
      'rap3df_data_02/P6HF7NR/depth_bgRm_VRO.data',
    gitBlobSha:
      '09e922073030f713dc24b33c2eecbebb9369edb7',
    byteLength: 35_462,
    decodedWordCount: 17_731,
    minimumLittleEndianWord: 0,
    maximumLittleEndianWord: 189,
    nonzeroLittleEndianWordCount: 7_260,
    secondByteNonzeroCount: 0,
  }),
  Object.freeze({
    subjectRef: 'creator-v2-face:M8D6FNE',
    artifactPath:
      'rap3df_data_02/M8D6FNE/depth_bgRm_XQ2.data',
    gitBlobSha:
      '1bdf3a802eae33d03839d3788fadc797edd85d90',
    byteLength: 35_462,
    decodedWordCount: 17_731,
    minimumLittleEndianWord: 0,
    maximumLittleEndianWord: 190,
    nonzeroLittleEndianWordCount: 6_854,
    secondByteNonzeroCount: 0,
  }),
  Object.freeze({
    subjectRef: 'creator-v2-face:5SSCKOW',
    artifactPath:
      'rap3df_data_02/5SSCKOW/depth_bgRm_S5F.data',
    gitBlobSha:
      '3823e9fce02049806ab1adc79d9c395b48c0d007',
    byteLength: 35_462,
    decodedWordCount: 17_731,
    minimumLittleEndianWord: 0,
    maximumLittleEndianWord: 212,
    nonzeroLittleEndianWordCount: 8_554,
    secondByteNonzeroCount: 0,
  }),
  Object.freeze({
    subjectRef: 'creator-v2-face:FC6KAXU',
    artifactPath:
      'rap3df_data_02/FC6KAXU/depth_bgRm_2XS.data',
    gitBlobSha:
      'd07c7c91d3c28639221ae0d4491a980d2ad17185',
    byteLength: 35_462,
    decodedWordCount: 17_731,
    minimumLittleEndianWord: 0,
    maximumLittleEndianWord: 191,
    nonzeroLittleEndianWordCount: 9_046,
    secondByteNonzeroCount: 0,
  }),
  Object.freeze({
    subjectRef: 'creator-v2-face:CPUR8VH',
    artifactPath:
      'rap3df_data_02/CPUR8VH/depth_bgRm_V5J.data',
    gitBlobSha:
      '4f015141e9f704118d159e3f95a57eb35d92992a',
    byteLength: 35_462,
    decodedWordCount: 17_731,
    minimumLittleEndianWord: 0,
    maximumLittleEndianWord: 213,
    nonzeroLittleEndianWordCount: 8_639,
    secondByteNonzeroCount: 0,
  }),
]);

export type FR300R1GMetricAuthorityBlocker =
  | 'creator_pipeline_reads_one_byte_from_four_byte_depth_frame'
  | 'creator_pipeline_widens_extracted_byte_into_uint16_storage'
  | 'creator_samples_show_single_byte_payload_in_two_byte_words'
  | 'exact_mendeley_v4_byte_identity_unverified'
  | 'v4_specific_metric_export_spec_missing';

export interface FR300R1GMetricAuthorityAdjudication {
  readonly schemaVersion:
    'fr300-r1g-metric-authority-adjudication-v1';
  readonly contractVersion:
    typeof FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly datasetRef:
    typeof FR300_R1_RAP3DF_V2_DATASET_REF;
  readonly status:
    'blocked_pending_exact_v4_metric_export_evidence';
  readonly blockers:
    readonly FR300R1GMetricAuthorityBlocker[];
  readonly findings: {
    readonly creatorPipelineUsesLibfreenect2: true;
    readonly libfreenect2DepthFrameIsFourByteFloatSurface: true;
    readonly creatorReadsSingleByteAtOffsetPlusTwo: true;
    readonly creatorStoresThatValueAsUint16: true;
    readonly creatorConsumerReadsUint16At119By149: true;
    readonly inspectedCreatorSamples: 5;
    readonly everyInspectedSecondByteZero: true;
    readonly creatorSnapshotPopulationMatchesPublishedV2Count: true;
    readonly exactMendeleyV4ByteIdentityVerified: false;
  };
  readonly authority: {
    readonly valuesBoundToNativeKinectDepthDistanceMillimeters:
      false;
    readonly metricScaleAdmitted: false;
    readonly fr300R2Eligible: false;
    readonly realFR299BundleEligible: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly reopenRequirements: readonly [
    'exact_mendeley_v4_depth_bytes_inspected',
    'v4_specific_serialization_evidence',
    'v4_specific_metric_unit_evidence',
    'evidence_resolving_creator_pipeline_vs_published_v4_semantics',
  ];
  readonly researchNoteRef: typeof FR300_R1G_RESEARCH_NOTE_REF;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1G ${message}`,
  );
}

export function adjudicateFR300R1GCurrentMetricAuthority():
FR300R1GMetricAuthorityAdjudication {
  return Object.freeze({
    schemaVersion:
      'fr300-r1g-metric-authority-adjudication-v1' as const,
    contractVersion:
      FR300_R1G_CREATOR_PIPELINE_METRIC_AUDIT_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    datasetRef: FR300_R1_RAP3DF_V2_DATASET_REF,
    status:
      'blocked_pending_exact_v4_metric_export_evidence' as const,
    blockers: Object.freeze([
      'creator_pipeline_reads_one_byte_from_four_byte_depth_frame',
      'creator_pipeline_widens_extracted_byte_into_uint16_storage',
      'creator_samples_show_single_byte_payload_in_two_byte_words',
      'exact_mendeley_v4_byte_identity_unverified',
      'v4_specific_metric_export_spec_missing',
    ] as const),
    findings: Object.freeze({
      creatorPipelineUsesLibfreenect2: true as const,
      libfreenect2DepthFrameIsFourByteFloatSurface:
        true as const,
      creatorReadsSingleByteAtOffsetPlusTwo: true as const,
      creatorStoresThatValueAsUint16: true as const,
      creatorConsumerReadsUint16At119By149: true as const,
      inspectedCreatorSamples: 5 as const,
      everyInspectedSecondByteZero: true as const,
      creatorSnapshotPopulationMatchesPublishedV2Count:
        true as const,
      exactMendeleyV4ByteIdentityVerified: false as const,
    }),
    authority: Object.freeze({
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        false as const,
      metricScaleAdmitted: false as const,
      fr300R2Eligible: false as const,
      realFR299BundleEligible: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    reopenRequirements: Object.freeze([
      'exact_mendeley_v4_depth_bytes_inspected',
      'v4_specific_serialization_evidence',
      'v4_specific_metric_unit_evidence',
      'evidence_resolving_creator_pipeline_vs_published_v4_semantics',
    ] as const),
    researchNoteRef: FR300_R1G_RESEARCH_NOTE_REF,
  });
}

export const FR300_R1G_CURRENT_METRIC_AUTHORITY =
  adjudicateFR300R1GCurrentMetricAuthority();

export function assertFR300R1GCreatorPipelineMetricAuditContract():
void {
  if (
    FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION !==
      'FR300-R1E-REAL-DEPTH-BYTE-INTAKE-v1'
  ) {
    fail('FR300-R1E predecessor contract drift.');
  }

  if (
    FR300_R1G_CREATOR_PIPELINE_EVIDENCE
      .expectedStoredValueCount !==
      FR300_R1G_CREATOR_PIPELINE_EVIDENCE.consumerWidth *
        FR300_R1G_CREATOR_PIPELINE_EVIDENCE.consumerHeight
  ) {
    fail('creator sample grid/value-count evidence drift.');
  }

  if (
    FR300_R1G_CREATOR_PIPELINE_EVIDENCE
      .expectedStoredByteLength !==
      FR300_R1G_CREATOR_PIPELINE_EVIDENCE
        .expectedStoredValueCount *
        FR300_R1G_CREATOR_PIPELINE_EVIDENCE
          .storedBytesPerValue
  ) {
    fail('creator sample byte-length evidence drift.');
  }

  if (
    FR300_R1G_CREATOR_SAMPLE_EVIDENCE.length !== 5 ||
    FR300_R1G_CREATOR_SAMPLE_EVIDENCE.some(
      (sample) =>
        sample.byteLength !== 35_462 ||
        sample.decodedWordCount !== 17_731 ||
        sample.secondByteNonzeroCount !== 0,
    )
  ) {
    fail('creator sample evidence drift.');
  }

  if (
    FR300_R1G_CURRENT_METRIC_AUTHORITY.authority
      .metricScaleAdmitted !== false ||
    FR300_R1G_CURRENT_METRIC_AUTHORITY.authority
      .fr300R2Eligible !== false
  ) {
    fail('current RAP3DF V2 metric/R2 authority must remain blocked.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;

  if (materializedCount !== 18) {
    fail(
      'FR300-R1G must preserve 18/29 product materialization.',
    );
  }
}

assertFR300R1GCreatorPipelineMetricAuditContract();
