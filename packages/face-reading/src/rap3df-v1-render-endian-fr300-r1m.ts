import {
  FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY,
  FR300_R1L_V1_CREATOR_SERIALIZATION_CONTRACT_VERSION,
} from './rap3df-v1-creator-serialization-fr300-r1l.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1M_V1_RENDER_ENDIAN_CONTRACT_VERSION =
  'FR300-R1M-V1-RENDER-ENDIAN-v1' as const;

export const FR300_R1M_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1m-rap3df-v1-render-endian.md' as const;

export const FR300_R1M_FROZEN_EVIDENCE_REF =
  'repo:research/face-reading/evidence/fr300-r1m-rap3df-v1-render-endian.json' as const;

export const FR300_R1M_CURRENT_ENDIAN_AUTHORITY = Object.freeze({
  schemaVersion:
    'fr300-r1m-v1-render-endian-authority-v1' as const,
  contractVersion: FR300_R1M_V1_RENDER_ENDIAN_CONTRACT_VERSION,
  watchtowerTrack: 'face-engine' as const,
  datasetRef: 'doi:10.17632/kpdkpcs8zb.3' as const,
  status: 'little_endian_render_relationship_bound' as const,
  scalarContainerType: 'uint16_t' as const,
  scalarContainerWidthBytes: 2 as const,
  byteOrder: 'little' as const,
  byteOrderStatus: 'evidence_bound' as const,
  evidenceMethod:
    'publisher_authenticated_matched_creator_render_relationship' as const,
  pixelCount: 17_731 as const,
  informativePixelCount: 8_574 as const,
  littleEndianExactPixelMatches: 17_731 as const,
  littleEndianInformativeMatches: 8_574 as const,
  bigEndianExactPixelMatches: 9_157 as const,
  bigEndianInformativeMatches: 0 as const,
  numericPlausibilityUsedForSelection: false as const,
  physicalUnitStatus: 'blocked' as const,
  nativeKinectMetricEquivalence: false as const,
  authority: Object.freeze({
    canonicalRegistrationIssued: false as const,
    realFR299BundleEligible: false as const,
    fr300R2Eligible: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
  nextEvidenceNeed:
    'adjudicate_stored_scalar_metric_semantics_from_historical_libfreenect2_byte_extraction' as const,
  researchNoteRef: FR300_R1M_RESEARCH_NOTE_REF,
  frozenEvidenceRef: FR300_R1M_FROZEN_EVIDENCE_REF,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1M ${message}`,
  );
}

export function assertFR300R1MV1RenderEndianContract(): void {
  if (
    FR300_R1L_V1_CREATOR_SERIALIZATION_CONTRACT_VERSION !==
      'FR300-R1L-V1-CREATOR-SERIALIZATION-v1' ||
    FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY
      .serializationAuthority.scalarContainerType !== 'uint16_t'
  ) {
    fail('FR300-R1L predecessor serialization authority drift.');
  }

  const current = FR300_R1M_CURRENT_ENDIAN_AUTHORITY;
  if (
    current.byteOrder !== 'little' ||
    current.byteOrderStatus !== 'evidence_bound' ||
    current.littleEndianExactPixelMatches !== current.pixelCount ||
    current.littleEndianInformativeMatches !==
      current.informativePixelCount ||
    current.bigEndianInformativeMatches !== 0 ||
    current.numericPlausibilityUsedForSelection !== false
  ) {
    fail('matched-render little-endian evidence drift.');
  }

  if (
    current.physicalUnitStatus !== 'blocked' ||
    current.nativeKinectMetricEquivalence !== false ||
    current.authority.realFR299BundleEligible !== false ||
    current.authority.fr300R2Eligible !== false
  ) {
    fail('metric/FR299/R2 authority must remain blocked.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300-R1M must preserve 18/29 product materialization.');
  }
}

assertFR300R1MV1RenderEndianContract();
