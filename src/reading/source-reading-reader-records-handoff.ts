import { createHash } from 'node:crypto';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { assertProductReadingResponse } from './product-reading-response-admission.js';
import {
  PRODUCT_READING_RESPONSE_VERSION,
  type ProductReadingResponse,
  type ProductReadingResponseBlock,
} from './product-reading-response.js';
import {
  inspectSourceReadingProofReadinessV1,
  type InspectSourceReadingProofReadinessInputV1,
  type SourceReadingProofMaterialV1,
} from './source-reading-proof-readiness.js';

/**
 * Saju 2B-3B / MyeongHa paid Reader S3→S5→S7 source-reference handoff.
 * Pure in-process, server-private inventory: NEVER an Official issuer permit.
 */
export const SAJU_READER_RECORDS_SOURCE_HANDOFF_VERSION_V1 =
  'saju-reader-records-source-reference-handoff-v1' as const;

export interface SajuReaderRecordsSourceUnitV1 {
  readonly sourceRef: string;
  readonly contentHash: string;
}

export interface SajuReaderRecordsSourceInventoryV1 {
  /** Exact v2 text paths also used by MyeongHa's protected Reader projector. */
  readonly segments: readonly SajuReaderRecordsSourceUnitV1[];
  readonly disclosures: readonly SajuReaderRecordsSourceUnitV1[];
  readonly ambiguityHashes: readonly string[];
}

/** Saju identity, NOT MyeongHa's DB-owned Subject/Reading/Grant identifier. */
export interface SajuReaderRecordsSourceReferenceV1 {
  readonly readingId: string;
  readonly responseId: string;
  readonly responseVersion: typeof PRODUCT_READING_RESPONSE_VERSION;
  readonly responseBodyHash: string;
  readonly inventoryHash: string;
  readonly snapshotId: string;
  readonly interpretationRunId: string;
  readonly registrySnapshotId: string;
  readonly executionId: string;
  readonly preparationId: string;
  readonly selectionId: string;
  readonly profileRef: SourceReadingProofMaterialV1['profileRef'];
  readonly evidenceBundleHash: string;
  readonly readingVersion: string;
  readonly canonicalSemanticHash?: string;
  readonly officialReadingPlanHash?: string;
  readonly officialReadingReportHash?: string;
}

export interface SajuReaderRecordsSourceHandoffV1 {
  readonly version: typeof SAJU_READER_RECORDS_SOURCE_HANDOFF_VERSION_V1;
  readonly state: 'held';
  readonly lifecycle: 'preview';
  readonly sourceAuthority: 'NOT_EVALUATED';
  readonly productionInterpretationAuthority: 'NOT_EVALUATED';
  readonly releaseAuthorization: 'NOT_EVALUATED';
  readonly subjectBinding: 'DB_OWNER_REQUIRED';
  readonly s5AtomicStorage: 'DB_OWNER_REQUIRED';
  readonly s7Delivery: 'DB_OWNER_REQUIRED';
  readonly canPersist: false;
  readonly canDisclose: false;
  readonly canPublish: false;
  readonly canSell: false;
  readonly source: SajuReaderRecordsSourceReferenceV1;
  readonly inventory: SajuReaderRecordsSourceInventoryV1;
  /**
   * S3 selected/co-present classification, semantic/output guard attestations
   * and Production issuer signature are intentionally ABSENT.
   */
  readonly mayIssueS3OfficialCoverageCandidate: false;
}

export type SajuReaderRecordsSourceHandoffInspectionV1 =
  | Readonly<{
      state: 'blocked';
      reason: 'source_not_admitted' | 'incomplete_source_units';
      canPersist: false;
      canDisclose: false;
    }>
  | Readonly<{
      state: 'held';
      reason: 'production_source_issuer_and_db_approval_missing';
      canPersist: false;
      canDisclose: false;
      handoff: SajuReaderRecordsSourceHandoffV1;
    }>;

const MAX_SOURCE_UNITS = 128;

function hashText(text: string): string {
  if (typeof text !== 'string' || text.trim().length === 0) {
    throw new TypeError('Reading source unit must have non-empty text.');
  }
  return 'sha256:v1:' + createHash('sha256').update(text, 'utf8').digest('hex');
}

function putSource(
  entries: SajuReaderRecordsSourceUnitV1[],
  sourceRef: string,
  text: string,
): void {
  entries.push(Object.freeze({ sourceRef, contentHash: hashText(text) }));
}

function labelText(label: string, text: string): string {
  hashText(label);
  hashText(text);
  return label + ': ' + text;
}

function collectBlock(
  block: ProductReadingResponseBlock,
  ref: string,
  segments: SajuReaderRecordsSourceUnitV1[],
  ambiguityHashes: string[],
): void {
  switch (block.type) {
    case 'paragraph':
    case 'source_hint':
      putSource(segments, ref, block.text);
      return;
    case 'key_points':
      block.items.forEach((text, index) => putSource(segments, ref + '.items.' + index, text));
      return;
    case 'comparison':
      hashText(block.title);
      block.perspectives.forEach((item, index) => {
        putSource(segments, ref + '.perspectives.' + index,
          block.title + '\n' + labelText(item.label, item.text));
      });
      return;
    case 'ambiguity':
      hashText(block.summary);
      ambiguityHashes.push(hashText([
        block.summary,
        ...block.scenarios.map((item) => labelText(item.label, item.text)),
      ].join('\n')));
      return;
    case 'timeline':
      block.entries.forEach((item, index) => {
        putSource(segments, ref + '.entries.' + index, labelText(item.label, item.text));
      });
      return;
    case 'fact_table':
      block.rows.forEach((item, index) => {
        putSource(segments, ref + '.rows.' + index, labelText(item.label, item.value));
      });
      return;
  }
}

/**
 * Exact-text projection from Saju's admitted ProductReadingResponse v2 only.
 * No source-selection classification or assertion of Official provenance.
 */
export function projectSajuReaderRecordsSourceInventoryV1(
  response: ProductReadingResponse,
): SajuReaderRecordsSourceInventoryV1 {
  assertProductReadingResponse(response);
  if (response.responseVersion !== PRODUCT_READING_RESPONSE_VERSION
    || response.state !== 'delivered' || response.reading === undefined) {
    throw new TypeError('Only fully delivered v2 Reading is eligible for source inventory.');
  }
  const segments: SajuReaderRecordsSourceUnitV1[] = [];
  const disclosures: SajuReaderRecordsSourceUnitV1[] = [];
  const ambiguityHashes: string[] = [];
  response.reading.sections.forEach((section, sectionIndex) => {
    hashText(section.sectionType);
    hashText(section.title);
    section.blocks.forEach((block, blockIndex) => {
      collectBlock(
        block,
        'response.reading.sections.' + sectionIndex + '.blocks.' + blockIndex,
        segments,
        ambiguityHashes,
      );
    });
  });
  response.reading.disclosures.forEach((unit, index) => {
    hashText(unit.type);
    putSource(disclosures, 'response.reading.disclosures.' + index, unit.text);
  });
  (response.reading.calculationSummary.ambiguity ?? []).forEach((unit) => {
    ambiguityHashes.push(hashText(unit.title + '\n' + unit.summary));
  });
  const sourceRefs = [...segments, ...disclosures].map(unit => unit.sourceRef);
  if (new Set(sourceRefs).size !== sourceRefs.length
    || new Set(ambiguityHashes).size !== ambiguityHashes.length
    || segments.length + disclosures.length + ambiguityHashes.length > MAX_SOURCE_UNITS
    || segments.length + disclosures.length + ambiguityHashes.length === 0) {
    throw new TypeError('Reading source inventory is missing or duplicated.');
  }
  return Object.freeze({
    segments: Object.freeze(segments),
    disclosures: Object.freeze(disclosures),
    ambiguityHashes: Object.freeze(ambiguityHashes),
  });
}

function blocked(reason: 'source_not_admitted' | 'incomplete_source_units'):
  SajuReaderRecordsSourceHandoffInspectionV1 {
  return Object.freeze({
    state: 'blocked' as const,
    reason,
    canPersist: false as const,
    canDisclose: false as const,
  });
}

/** Compute identity and source fingerprints only from the SAME Saju execution. */
export function inspectSajuReaderRecordsSourceHandoffV1(
  input: InspectSourceReadingProofReadinessInputV1,
): SajuReaderRecordsSourceHandoffInspectionV1 {
  try {
    const readiness = inspectSourceReadingProofReadinessV1(input);
    const material = readiness.material;
    const artifact = input.execution.artifact;
    const response = input.response;
    if (readiness.state !== 'held'
      || readiness.reason !== 'source_attestation_not_implemented'
      || readiness.proofAuthenticity !== 'NOT_ATTESTED'
      || readiness.productionInterpretationAuthority !== 'NOT_EVALUATED'
      || !material || !artifact
      || response.state !== 'delivered'
      || response.responseVersion !== PRODUCT_READING_RESPONSE_VERSION
      || material.readingId !== response.reading?.readingId
      || material.responseId !== response.responseId
      || material.responseBodyHash !== deterministicContentHash(response)) {
      return blocked('source_not_admitted');
    }
    const inventory = projectSajuReaderRecordsSourceInventoryV1(response);
    const inventoryHash = deterministicContentHash({
      version: SAJU_READER_RECORDS_SOURCE_HANDOFF_VERSION_V1,
      readingId: material.readingId,
      responseId: material.responseId,
      responseBodyHash: material.responseBodyHash,
      inventory,
    });
    const source: SajuReaderRecordsSourceReferenceV1 = Object.freeze({
      readingId: material.readingId,
      responseId: material.responseId,
      responseVersion: PRODUCT_READING_RESPONSE_VERSION,
      responseBodyHash: material.responseBodyHash,
      inventoryHash,
      snapshotId: material.snapshotId,
      interpretationRunId: material.interpretationRunId,
      registrySnapshotId: material.registrySnapshotId,
      executionId: material.executionId,
      preparationId: material.preparationId,
      selectionId: material.selectionId,
      profileRef: Object.freeze({ ...material.profileRef }),
      evidenceBundleHash: material.evidenceBundleHash,
      readingVersion: artifact.provenance.readingVersion,
      ...(artifact.provenance.canonicalSemanticHash === undefined ? {} :
        { canonicalSemanticHash: artifact.provenance.canonicalSemanticHash }),
      ...(artifact.provenance.officialReadingPlanHash === undefined ? {} :
        { officialReadingPlanHash: artifact.provenance.officialReadingPlanHash }),
      ...(artifact.provenance.officialReadingReportHash === undefined ? {} :
        { officialReadingReportHash: artifact.provenance.officialReadingReportHash }),
    });
    const handoff: SajuReaderRecordsSourceHandoffV1 = Object.freeze({
      version: SAJU_READER_RECORDS_SOURCE_HANDOFF_VERSION_V1,
      state: 'held',
      lifecycle: 'preview',
      sourceAuthority: 'NOT_EVALUATED',
      productionInterpretationAuthority: 'NOT_EVALUATED',
      releaseAuthorization: 'NOT_EVALUATED',
      subjectBinding: 'DB_OWNER_REQUIRED',
      s5AtomicStorage: 'DB_OWNER_REQUIRED',
      s7Delivery: 'DB_OWNER_REQUIRED',
      canPersist: false,
      canDisclose: false,
      canPublish: false,
      canSell: false,
      source,
      inventory,
      mayIssueS3OfficialCoverageCandidate: false,
    });
    return Object.freeze({
      state: 'held',
      reason: 'production_source_issuer_and_db_approval_missing',
      canPersist: false,
      canDisclose: false,
      handoff,
    });
  } catch {
    return blocked('incomplete_source_units');
  }
}

/**
 * Reference-only guard for MyeongHa's Reader/Records adapters to apply
 * AFTER independent DB admission. This check proves equality, NOT access.
 * Never return or reveal protected prose, identifiers or hashes to the user.
 */
export function sameSajuReadingForReaderAndRecordsV1(input: Readonly<{
  handoff: SajuReaderRecordsSourceHandoffV1;
  reader: SajuReaderRecordsSourceReferenceV1;
  records: SajuReaderRecordsSourceReferenceV1;
}>): Readonly<{
  state: 'matched' | 'blocked';
  canDisclose: false;
  canPersist: false;
}> {
  try {
    const { handoff, reader, records } = input;
    const expected = handoff.source;
    const matches = (value: SajuReaderRecordsSourceReferenceV1): boolean =>
      deterministicContentHash(value) === deterministicContentHash(expected);
    const valid = handoff.version === SAJU_READER_RECORDS_SOURCE_HANDOFF_VERSION_V1
      && handoff.state === 'held'
      && handoff.lifecycle === 'preview'
      && handoff.canDisclose === false
      && handoff.canPersist === false
      && handoff.mayIssueS3OfficialCoverageCandidate === false
      && expected.responseVersion === PRODUCT_READING_RESPONSE_VERSION
      && matches(reader) && matches(records);
    return Object.freeze({
      state: valid ? 'matched' as const : 'blocked' as const,
      canDisclose: false as const,
      canPersist: false as const,
    });
  } catch {
    return Object.freeze({
      state: 'blocked' as const,
      canDisclose: false as const,
      canPersist: false as const,
    });
  }
}
