import { createHash } from 'node:crypto';
import {
  FR300_R1_RAP3DF_V2_QUALIFICATION_CONTRACT_VERSION,
  inspectFR300R1RawDepthArtifact,
  type FR300R1RawDepthInspectionInput,
  type FR300R1RawDepthInspectionReport,
} from './rap3df-v2-qualification-fr300-r1.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION =
  'FR300-R1E-REAL-DEPTH-BYTE-INTAKE-v1' as const;

export const FR300_R1E_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1e-real-depth-byte-intake.md' as const;

export const FR300_R1E_EXECUTION_STATE = Object.freeze({
  realRap3dfV2BytesRetrievedInCurrentExecution: false as const,
  realRap3dfV2DigestIssued: false as const,
  realRap3dfV2MetricScaleIssued: false as const,
  realRap3dfV2CanonicalRegistrationIssued: false as const,
  realFR299BundleIssued: false as const,
});

export type FR300R1EDepthEncoding =
  FR300R1RawDepthInspectionInput['numericEncoding'];

export type FR300R1EIntakeBlocker =
  | 'encoding_byte_width_mismatch'
  | 'partial_trailing_value_bytes';

export interface FR300R1ERawDepthByteIntakeInput {
  readonly schemaVersion:
    'fr300-r1e-raw-depth-byte-intake-input-v1';
  readonly artifactRef: string;
  readonly bytes: Uint8Array;
  readonly width: number;
  readonly height: number;
  readonly byteWidthPerValue: 2 | 4 | 8;
  readonly numericEncoding: FR300R1EDepthEncoding;
  readonly datasetSerializationEvidenceRef: string | null;
  readonly datasetValueUnitEvidenceRef: string | null;
  readonly valuesBoundToNativeKinectDepthDistanceMillimeters:
    boolean;
}

export interface FR300R1ERawDepthByteIntakeReceipt {
  readonly schemaVersion:
    'fr300-r1e-raw-depth-byte-intake-receipt-v1';
  readonly contractVersion:
    typeof FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly byteLength: number;
  readonly declaredEncoding: FR300R1EDepthEncoding;
  readonly declaredByteWidthPerValue: 2 | 4 | 8;
  readonly intakeBlockers: readonly FR300R1EIntakeBlocker[];
  readonly decodedStatistics: {
    readonly completeValueCount: number;
    readonly finiteValueCount: number;
    readonly minimumFiniteValue: number | null;
    readonly maximumFiniteValue: number | null;
  };
  readonly inspectionReport: FR300R1RawDepthInspectionReport;
  readonly status:
    | 'ready_for_metric_scale_adjudication'
    | 'blocked';
  readonly authorityBoundary: {
    readonly bytesAreRealRap3dfEvidenceByConstruction: false;
    readonly encodingInferredFromBytes: false;
    readonly datasetUnitInferredFromNumericRange: false;
    readonly metricScaleIssued: false;
    readonly canonicalRegistrationIssued: false;
    readonly realFR299BundleIssued: false;
    readonly productColumnMaterialized: false;
  };
  readonly researchNoteRef: typeof FR300_R1E_RESEARCH_NOTE_REF;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1E ${message}`,
  );
}

function expectedWidth(
  encoding: FR300R1EDepthEncoding,
): 2 | 4 | 8 | null {
  switch (encoding) {
    case 'uint16_le':
      return 2;
    case 'float32_le':
      return 4;
    case 'float64_le':
      return 8;
    case 'unknown':
      return null;
  }
}

function readValue(
  view: DataView,
  offset: number,
  encoding: Exclude<FR300R1EDepthEncoding, 'unknown'>,
): number {
  switch (encoding) {
    case 'uint16_le':
      return view.getUint16(offset, true);
    case 'float32_le':
      return view.getFloat32(offset, true);
    case 'float64_le':
      return view.getFloat64(offset, true);
  }
}

function sha256(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256')
    .update(bytes)
    .digest('hex')}`;
}

export function inspectFR300R1ERawDepthBytes(
  input: FR300R1ERawDepthByteIntakeInput,
): FR300R1ERawDepthByteIntakeReceipt {
  if (
    input.schemaVersion !==
      'fr300-r1e-raw-depth-byte-intake-input-v1'
  ) {
    fail('raw-depth byte intake input schemaVersion drift.');
  }

  if (!(input.bytes instanceof Uint8Array)) {
    fail('bytes must be a Uint8Array.');
  }

  const intakeBlockers: FR300R1EIntakeBlocker[] = [];
  const declaredExpectedWidth = expectedWidth(
    input.numericEncoding,
  );

  const encodingWidthMatches =
    declaredExpectedWidth === null ||
    declaredExpectedWidth === input.byteWidthPerValue;

  if (!encodingWidthMatches) {
    intakeBlockers.push('encoding_byte_width_mismatch');
  }

  const hasTrailingBytes =
    input.bytes.byteLength % input.byteWidthPerValue !== 0;
  if (hasTrailingBytes) {
    intakeBlockers.push('partial_trailing_value_bytes');
  }

  const canDecode =
    input.numericEncoding !== 'unknown' &&
    encodingWidthMatches;

  const completeValueCount = canDecode
    ? Math.floor(
        input.bytes.byteLength / input.byteWidthPerValue,
      )
    : 0;

  let finiteValueCount = 0;
  let minimumFiniteValue: number | null = null;
  let maximumFiniteValue: number | null = null;

  if (canDecode) {
    const view = new DataView(
      input.bytes.buffer,
      input.bytes.byteOffset,
      input.bytes.byteLength,
    );
    const encoding = input.numericEncoding;

    for (
      let index = 0;
      index < completeValueCount;
      index += 1
    ) {
      const value = readValue(
        view,
        index * input.byteWidthPerValue,
        encoding,
      );
      if (!Number.isFinite(value)) continue;

      finiteValueCount += 1;
      minimumFiniteValue =
        minimumFiniteValue === null
          ? value
          : Math.min(minimumFiniteValue, value);
      maximumFiniteValue =
        maximumFiniteValue === null
          ? value
          : Math.max(maximumFiniteValue, value);
    }
  }

  const inspectionReport = inspectFR300R1RawDepthArtifact({
    schemaVersion:
      'fr300-r1-raw-depth-inspection-input-v1',
    artifactRef: input.artifactRef,
    artifactDigest: sha256(input.bytes),
    sourceBytesActuallyInspected: true,
    byteLength: input.bytes.byteLength,
    width: input.width,
    height: input.height,
    byteWidthPerValue: input.byteWidthPerValue,
    numericEncoding:
      canDecode && !hasTrailingBytes
        ? input.numericEncoding
        : 'unknown',
    totalValueCount: completeValueCount,
    finiteValueCount,
    minimumFiniteValue,
    maximumFiniteValue,
    datasetSerializationEvidenceRef:
      input.datasetSerializationEvidenceRef,
    datasetValueUnitEvidenceRef:
      input.datasetValueUnitEvidenceRef,
    valuesBoundToNativeKinectDepthDistanceMillimeters:
      input.valuesBoundToNativeKinectDepthDistanceMillimeters,
  });

  const status =
    intakeBlockers.length === 0 &&
    inspectionReport.status ===
      'ready_for_metric_scale_adjudication'
      ? 'ready_for_metric_scale_adjudication'
      : 'blocked';

  return Object.freeze({
    schemaVersion:
      'fr300-r1e-raw-depth-byte-intake-receipt-v1' as const,
    contractVersion:
      FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    artifactRef: inspectionReport.artifactRef,
    artifactDigest: inspectionReport.artifactDigest,
    byteLength: input.bytes.byteLength,
    declaredEncoding: input.numericEncoding,
    declaredByteWidthPerValue: input.byteWidthPerValue,
    intakeBlockers: Object.freeze(intakeBlockers),
    decodedStatistics: Object.freeze({
      completeValueCount,
      finiteValueCount,
      minimumFiniteValue,
      maximumFiniteValue,
    }),
    inspectionReport,
    status,
    authorityBoundary: Object.freeze({
      bytesAreRealRap3dfEvidenceByConstruction: false as const,
      encodingInferredFromBytes: false as const,
      datasetUnitInferredFromNumericRange: false as const,
      metricScaleIssued: false as const,
      canonicalRegistrationIssued: false as const,
      realFR299BundleIssued: false as const,
      productColumnMaterialized: false as const,
    }),
    researchNoteRef: FR300_R1E_RESEARCH_NOTE_REF,
  });
}

export function assertFR300R1ERealDepthByteIntakeContract():
void {
  if (
    FR300_R1_RAP3DF_V2_QUALIFICATION_CONTRACT_VERSION !==
      'FR300-R1-RAP3DF-V2-QUALIFICATION-v1'
  ) {
    fail('FR300-R1 predecessor contract drift.');
  }

  assertFR293ProductColumnMap();

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;

  if (materializedCount !== 18) {
    fail(
      'FR300-R1E must preserve 18/29 product materialization.',
    );
  }
}

assertFR300R1ERealDepthByteIntakeContract();
