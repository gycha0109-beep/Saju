import {
  FR300_R1I_EXPECTED_BYTE_LENGTH,
  FR300_R1I_EXPECTED_VALUE_COUNT,
  FR300_R1I_V1_DATASET_REF,
} from './rap3df-v1-float64-artifact-fr300-r1i.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1L_V1_CREATOR_SERIALIZATION_CONTRACT_VERSION =
  'FR300-R1L-V1-CREATOR-SERIALIZATION-v1' as const;

export const FR300_R1L_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1l-rap3df-v1-creator-serialization.md' as const;

export const FR300_R1L_CREATOR_REPO_REF =
  'https://github.com/Piemontez/rap3df-database' as const;

export const FR300_R1L_HISTORICAL_CREATOR_COMMIT =
  '8049e3f576003ae7b190f99f2b855f0f70beb22e' as const;

export const FR300_R1L_HISTORICAL_CREATOR_COMMIT_DATE =
  '2017-10-09T23:32:49Z' as const;

export const FR300_R1L_ARTICLE_REPORTED_COLLECTION_START =
  '2017-10-10' as const;

export const FR300_R1L_POST_COLLECTION_SNAPSHOT_COMMIT =
  '2331937776e532ac67d049415b852498aa2a9cc8' as const;

export const FR300_R1L_POST_COLLECTION_SNAPSHOT_DATE =
  '2017-11-16T23:11:35Z' as const;

export const FR300_R1L_PUBLISHER_SAMPLE_EVIDENCE_REF =
  'repo:research/face-reading/evidence/fr300-r1k-rap3df-v1-serialization-sample.json' as const;

export const FR300_R1L_CREATOR_SERIALIZATION_EVIDENCE =
  Object.freeze({
    schemaVersion:
      'fr300-r1l-v1-creator-serialization-evidence-v1' as const,
    datasetRef: FR300_R1I_V1_DATASET_REF,
    historicalCreatorCommit:
      FR300_R1L_HISTORICAL_CREATOR_COMMIT,
    historicalCreatorCommitDate:
      FR300_R1L_HISTORICAL_CREATOR_COMMIT_DATE,
    articleReportedCollectionStart:
      FR300_R1L_ARTICLE_REPORTED_COLLECTION_START,
    collectionDirectory: 'rap3df_data' as const,
    preCollectionWriterBlobSha:
      'e9676d1999e588026be7571a1307771f125ae0f2' as const,
    postCollectionWriterBlobSha:
      'e9676d1999e588026be7571a1307771f125ae0f2' as const,
    preCollectionFilenameContractBlobSha:
      'dbbdc2243ff82be71f449e175149dc28998b8124' as const,
    postCollectionFilenameContractBlobSha:
      'dbbdc2243ff82be71f449e175149dc28998b8124' as const,
    postCollectionSnapshotCommit:
      FR300_R1L_POST_COLLECTION_SNAPSHOT_COMMIT,
    postCollectionSnapshotDate:
      FR300_R1L_POST_COLLECTION_SNAPSHOT_DATE,
    postCollectionExactDepthBlobCount: 267 as const,
    postCollectionExactDepthBlobByteLength: 35_462 as const,
    postCollectionAllExactDepthBlobsSameByteLength: true as const,
    exactDepthFilename: 'k1_box_xyz_depth.data' as const,
    writerInputType: 'std::vector<uint16_t>' as const,
    writerScalarType: 'uint16_t' as const,
    writerExpression:
      'fwrite(&dataVec[i], 1, sizeof(uint16_t), filePtr)' as const,
    writerByteOrderSemantics:
      'host_native_unspecified' as const,
    saveSourceVector: 'context->depthInBoxXYZ' as const,
    sourceExtractionExpression:
      'context->depth2->data[i+2]' as const,
    sourceExtractionContainerType: 'uint16_t' as const,
    readerContainerType: 'std::vector<uint16_t>' as const,
    readerScalarType: 'uint16_t' as const,
    readerExpression:
      'fread(&info, 1, sizeof(uint16_t), dataFile)' as const,
    publisherSampleCount: 12 as const,
    publisherSampleByteLength: 35_462 as const,
    publisherSampleValueCountAtTwoBytes:
      17_731 as const,
    everyPublisherSampleDigestAndSizeBound: true as const,
    articleProseScalarClaim:
      '8-byte floating point' as const,
    articleBoundExpectedByteLength:
      FR300_R1I_EXPECTED_BYTE_LENGTH,
  });

export type FR300R1LSerializationBlocker =
  | 'creator_binary_execution_identity_unverified'
  | 'host_native_endianness_not_bound_to_collection_machine'
  | 'stored_scalar_not_bound_to_native_kinect_metric_value'
  | 'physical_unit_unresolved'
  | 'article_prose_conflicts_with_creator_and_publisher_bytes';

export interface FR300R1LV1SerializationAdjudication {
  readonly schemaVersion:
    'fr300-r1l-v1-serialization-adjudication-v1';
  readonly contractVersion:
    typeof FR300_R1L_V1_CREATOR_SERIALIZATION_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly datasetRef: typeof FR300_R1I_V1_DATASET_REF;
  readonly status:
    'uint16_container_bound_endian_and_metric_authority_blocked';
  readonly blockers: readonly FR300R1LSerializationBlocker[];
  readonly findings: {
    readonly historicalCommitPredatesReportedCollectionStartByOneDay:
      true;
    readonly historicalCodeUsesV1CollectionDirectory: true;
    readonly historicalCodeNamesExactPublishedDepthArtifact: true;
    readonly writerAndFilenameContractStableAcrossCollectionWindow: true;
    readonly postCollectionTreeContains267ExactDepthArtifacts: true;
    readonly postCollectionTreeAllExactDepthArtifactsAre35462Bytes: true;
    readonly writerAcceptsUint16Vector: true;
    readonly writerWritesExactlySizeofUint16PerPixel: true;
    readonly exactV1DepthSavePathUsesWriter: true;
    readonly historicalViewerReadsSameArtifactAsUint16: true;
    readonly publisherSampleCount: 12;
    readonly everyPublisherSampleExactlyTwoBytesPerArticlePixel:
      true;
    readonly publisherBytesCorroborateCreatorContainerWidth: true;
    readonly articleEightByteFloatClaimConflictsWithReleasedArtifact:
      true;
  };
  readonly serializationAuthority: {
    readonly scalarContainerType: 'uint16_t';
    readonly scalarContainerWidthBytes: 2;
    readonly byteOrder: 'blocked_host_native_unspecified';
    readonly physicalUnit: 'blocked';
    readonly valuesBoundToNativeKinectDepthDistance: false;
  };
  readonly authority: {
    readonly canonicalRegistrationIssued: false;
    readonly realFR299BundleEligible: false;
    readonly fr300R2Eligible: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly reopenRequirements: readonly [
    'collection_machine_byte_order_evidence_or_artifact_linked_endian_proof',
    'source_bound_metric_semantics_for_stored_uint16_scalar',
    'participant_commercial_product_use_scope_if_product_use_is_pursued',
  ];
  readonly researchNoteRef: typeof FR300_R1L_RESEARCH_NOTE_REF;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1L ${message}`,
  );
}

export function adjudicateFR300R1LV1Serialization():
FR300R1LV1SerializationAdjudication {
  return Object.freeze({
    schemaVersion:
      'fr300-r1l-v1-serialization-adjudication-v1' as const,
    contractVersion:
      FR300_R1L_V1_CREATOR_SERIALIZATION_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    datasetRef: FR300_R1I_V1_DATASET_REF,
    status:
      'uint16_container_bound_endian_and_metric_authority_blocked' as const,
    blockers: Object.freeze([
      'creator_binary_execution_identity_unverified',
      'host_native_endianness_not_bound_to_collection_machine',
      'stored_scalar_not_bound_to_native_kinect_metric_value',
      'physical_unit_unresolved',
      'article_prose_conflicts_with_creator_and_publisher_bytes',
    ] as const),
    findings: Object.freeze({
      historicalCommitPredatesReportedCollectionStartByOneDay:
        true as const,
      historicalCodeUsesV1CollectionDirectory: true as const,
      historicalCodeNamesExactPublishedDepthArtifact: true as const,
      writerAndFilenameContractStableAcrossCollectionWindow:
        true as const,
      postCollectionTreeContains267ExactDepthArtifacts:
        true as const,
      postCollectionTreeAllExactDepthArtifactsAre35462Bytes:
        true as const,
      writerAcceptsUint16Vector: true as const,
      writerWritesExactlySizeofUint16PerPixel: true as const,
      exactV1DepthSavePathUsesWriter: true as const,
      historicalViewerReadsSameArtifactAsUint16: true as const,
      publisherSampleCount: 12 as const,
      everyPublisherSampleExactlyTwoBytesPerArticlePixel:
        true as const,
      publisherBytesCorroborateCreatorContainerWidth:
        true as const,
      articleEightByteFloatClaimConflictsWithReleasedArtifact:
        true as const,
    }),
    serializationAuthority: Object.freeze({
      scalarContainerType: 'uint16_t' as const,
      scalarContainerWidthBytes: 2 as const,
      byteOrder:
        'blocked_host_native_unspecified' as const,
      physicalUnit: 'blocked' as const,
      valuesBoundToNativeKinectDepthDistance: false as const,
    }),
    authority: Object.freeze({
      canonicalRegistrationIssued: false as const,
      realFR299BundleEligible: false as const,
      fr300R2Eligible: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    reopenRequirements: Object.freeze([
      'collection_machine_byte_order_evidence_or_artifact_linked_endian_proof',
      'source_bound_metric_semantics_for_stored_uint16_scalar',
      'participant_commercial_product_use_scope_if_product_use_is_pursued',
    ] as const),
    researchNoteRef: FR300_R1L_RESEARCH_NOTE_REF,
  });
}

export const FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY =
  adjudicateFR300R1LV1Serialization();

export function assertFR300R1LV1CreatorSerializationContract():
void {
  const evidence = FR300_R1L_CREATOR_SERIALIZATION_EVIDENCE;

  if (
    evidence.publisherSampleValueCountAtTwoBytes !==
      FR300_R1I_EXPECTED_VALUE_COUNT ||
    evidence.publisherSampleByteLength !==
      FR300_R1I_EXPECTED_VALUE_COUNT * 2
  ) {
    fail('publisher sample shape evidence drift.');
  }

  if (
    evidence.articleBoundExpectedByteLength !==
      FR300_R1I_EXPECTED_VALUE_COUNT * 8 ||
    evidence.articleBoundExpectedByteLength ===
      evidence.publisherSampleByteLength
  ) {
    fail('article/publisher serialization conflict drift.');
  }

  if (
    evidence.preCollectionWriterBlobSha !==
      evidence.postCollectionWriterBlobSha ||
    evidence.preCollectionFilenameContractBlobSha !==
      evidence.postCollectionFilenameContractBlobSha ||
    evidence.postCollectionExactDepthBlobCount !== 267 ||
    evidence.postCollectionExactDepthBlobByteLength !== 35_462 ||
    evidence.postCollectionAllExactDepthBlobsSameByteLength !== true
  ) {
    fail('historical collection-window corpus binding drift.');
  }

  if (
    evidence.writerScalarType !== 'uint16_t' ||
    evidence.readerScalarType !== 'uint16_t' ||
    evidence.writerByteOrderSemantics !==
      'host_native_unspecified'
  ) {
    fail('historical creator uint16/native-endian evidence drift.');
  }

  const current = FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY;
  if (
    current.serializationAuthority.byteOrder !==
      'blocked_host_native_unspecified' ||
    current.serializationAuthority.physicalUnit !== 'blocked' ||
    current.serializationAuthority
      .valuesBoundToNativeKinectDepthDistance !== false ||
    current.authority.fr300R2Eligible !== false
  ) {
    fail('endian/metric/R2 authority must remain blocked.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300-R1L must preserve 18/29 product materialization.');
  }
}

assertFR300R1LV1CreatorSerializationContract();
