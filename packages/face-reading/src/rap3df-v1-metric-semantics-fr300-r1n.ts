import {
  FR300_R1M_CURRENT_ENDIAN_AUTHORITY,
  FR300_R1M_V1_RENDER_ENDIAN_CONTRACT_VERSION,
} from './rap3df-v1-render-endian-fr300-r1m.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1N_V1_METRIC_SEMANTICS_CONTRACT_VERSION =
  'FR300-R1N-V1-METRIC-SEMANTICS-v1' as const;

export const FR300_R1N_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1n-rap3df-v1-metric-semantics.md' as const;

export const FR300_R1N_EVIDENCE = Object.freeze({
  creatorPreCollectionCommit:
    '8049e3f576003ae7b190f99f2b855f0f70beb22e' as const,
  creatorMainCppBlob:
    'd0843d0029e946ae65182a5788014c180dd5e2a5' as const,
  creatorContextCppBlob:
    'c44ffe7e77a97c8fd0bac9cb3aab31fc5074eb9c' as const,
  creatorDepthFrameBindingExpression:
    'depth2 = frames[libfreenect2::Frame::Depth]' as const,
  creatorFrameAccessExpression:
    'context->depth2->data[i+2]' as const,
  creatorDestinationScalarType: 'uint16_t' as const,
  creatorPerformsTypedFloatDereference: false as const,
  creatorPerformsNumericFloatToUint16Conversion: false as const,
  creatorSelectsOneFrameStorageByte: true as const,
  upstreamNearestPreCollectionCommit:
    '93769abc75654888a6848e2520c50f1f952ce72e' as const,
  upstreamNearestPreCollectionCommitDate:
    '2017-09-16T09:15:49Z' as const,
  upstreamFrameListenerBlob:
    '1b0bda1341cf1584bc8a3a064102e2f6d09fbf70' as const,
  upstreamRegistrationBlob:
    '49a3b03e0a205a7e5f8aff562a5bca039d2cf30b' as const,
  upstreamRegistrationDepthCast:
    'const float *depth_data = (float*)depth->data' as const,
  upstreamMetricConversionExpression:
    'undistorted_data[512*r+c]/1000.0f' as const,
  upstreamDepthLogicalPixelType: 'float' as const,
  upstreamDepthBytesPerPixel: 4 as const,
  upstreamDepthUnit: 'millimeter' as const,
  upstreamFrameDataStaticType: 'unsigned char*' as const,
  creatorPinsExactLibfreenect2Revision: false as const,
});

export const FR300_R1N_CURRENT_METRIC_AUTHORITY = Object.freeze({
  schemaVersion:
    'fr300-r1n-v1-metric-semantics-authority-v1' as const,
  contractVersion:
    FR300_R1N_V1_METRIC_SEMANTICS_CONTRACT_VERSION,
  watchtowerTrack: 'face-engine' as const,
  datasetRef: 'doi:10.17632/kpdkpcs8zb.3' as const,
  releasedScalarContainer: 'uint16_t' as const,
  releasedByteOrder: 'little' as const,
  sourceDepthLogicalType: 'four_byte_float' as const,
  sourceDepthLogicalUnit: 'millimeter' as const,
  creatorStoredOperation:
    'single_representation_byte_selection_then_zero_extension_to_uint16' as const,
  storedScalarPreservesSourceNumericValue: false as const,
  storedScalarPreservesSourcePhysicalUnit: false as const,
  creatorProjectionInformationBitsUpperBound: 8 as const,
  sourceFloatRepresentationBits: 32 as const,
  metricDepthRecoverability:
    'destroyed_by_single_byte_projection' as const,
  physicalUnitStatus:
    'not_applicable_to_released_scalar_as_metric_distance' as const,
  metricReferenceDisposition:
    'rejected_for_metric_reference' as const,
  nonMetricStructuralResearchEligible: true as const,
  reason:
    'released scalar is not a numeric conversion of the source depth float; creator indexes unsigned-char frame storage at i+2 and stores that single representation byte' as const,
  dependencyRevisionBoundary:
    'creator_libfreenect2_revision_unpinned_but_no_unit_preserving_creator_conversion_exists' as const,
  authority: Object.freeze({
    canonicalRegistrationIssued: false as const,
    realFR299BundleEligible: false as const,
    fr300R2Eligible: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  nextAction:
    'remove_rap3df_v1_from_metric_reference_path_and_pivot_to_next_independent_3d_candidate' as const,
  researchNoteRef: FR300_R1N_RESEARCH_NOTE_REF,
});

export function projectFR300R1NCreatorDepthByte(
  fourBytePixelStorage: Uint8Array,
): number {
  if (
    !(fourBytePixelStorage instanceof Uint8Array) ||
    fourBytePixelStorage.byteLength !== 4
  ) {
    fail('creator depth projection requires exactly four source bytes.');
  }
  return fourBytePixelStorage[2] ?? 0;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1N ${message}`,
  );
}

export function assertFR300R1NV1MetricSemanticsContract(): void {
  if (
    FR300_R1M_V1_RENDER_ENDIAN_CONTRACT_VERSION !==
      'FR300-R1M-V1-RENDER-ENDIAN-v1' ||
    FR300_R1M_CURRENT_ENDIAN_AUTHORITY.byteOrder !== 'little' ||
    FR300_R1M_CURRENT_ENDIAN_AUTHORITY.byteOrderStatus !==
      'evidence_bound'
  ) {
    fail('FR300-R1M endian predecessor drift.');
  }

  const evidence = FR300_R1N_EVIDENCE;
  if (
    evidence.creatorPerformsTypedFloatDereference !== false ||
    evidence.creatorPerformsNumericFloatToUint16Conversion !== false ||
    evidence.creatorSelectsOneFrameStorageByte !== true ||
    evidence.creatorDepthFrameBindingExpression !==
      'depth2 = frames[libfreenect2::Frame::Depth]' ||
    evidence.upstreamDepthLogicalPixelType !== 'float' ||
    evidence.upstreamDepthBytesPerPixel !== 4 ||
    evidence.upstreamDepthUnit !== 'millimeter' ||
    evidence.upstreamFrameDataStaticType !== 'unsigned char*'
  ) {
    fail('creator/upstream metric semantics evidence drift.');
  }

  const current = FR300_R1N_CURRENT_METRIC_AUTHORITY;
  if (
    current.storedScalarPreservesSourceNumericValue !== false ||
    current.storedScalarPreservesSourcePhysicalUnit !== false ||
    current.creatorProjectionInformationBitsUpperBound !== 8 ||
    current.sourceFloatRepresentationBits !== 32 ||
    current.metricDepthRecoverability !==
      'destroyed_by_single_byte_projection' ||
    current.metricReferenceDisposition !==
      'rejected_for_metric_reference' ||
    current.authority.realFR299BundleEligible !== false ||
    current.authority.fr300R2Eligible !== false
  ) {
    fail('V1 metric rejection authority drift.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300-R1N must preserve 18/29 product materialization.');
  }
}

assertFR300R1NV1MetricSemanticsContract();
