import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { CanonicalReadingSemanticBundleV1 } from './canonical-reading-semantics.js';
import {
  buildCharacterGroundingBundleV2,
  type CharacterGroundingBundleV2,
} from './character-grounding-v2.js';
import type { OfficialReadingRenderedContentV1 } from './official-reading-renderer.js';

export const OFFICIAL_READING_READER_PARITY_VERSION =
  'myeonghwa-official-reading-reader-parity-v1' as const;

export interface OfficialReadingReaderParityReceiptV1 {
  schemaVersion: typeof OFFICIAL_READING_READER_PARITY_VERSION;
  receiptId: string;
  receiptHash: string;
  semanticHash: string;
  officialReportId: string;
  officialReportHash: string;
  groundingHash: string;
  constraints: {
    mayGroundReaderFromDifferentSemanticHash: false;
    mayUseReportProseAsNewSajuAuthority: false;
    mayBypassCanonicalSemanticValidation: false;
  };
}

export interface OfficialReadingCharacterGroundingResultV1 {
  grounding: CharacterGroundingBundleV2;
  parity: OfficialReadingReaderParityReceiptV1;
}

const CONSTRAINTS = Object.freeze({
  mayGroundReaderFromDifferentSemanticHash: false as const,
  mayUseReportProseAsNewSajuAuthority: false as const,
  mayBypassCanonicalSemanticValidation: false as const,
});

function parityHashMaterial(
  semanticHash: string,
  report: OfficialReadingRenderedContentV1,
  grounding: CharacterGroundingBundleV2,
) {
  return {
    schemaVersion: OFFICIAL_READING_READER_PARITY_VERSION,
    semanticHash,
    officialReportId: report.reportId,
    officialReportHash: report.reportHash,
    groundingHash: grounding.groundingHash,
    constraints: CONSTRAINTS,
  };
}

export function assertOfficialReadingReaderSemanticParityV1(
  report: OfficialReadingRenderedContentV1,
  grounding: CharacterGroundingBundleV2,
): void {
  if (report.sourceSemanticHash !== grounding.sourceSemanticHash) {
    throw new TypeError(
      'Official Reading and Character grounding do not share the same canonical semantic hash.',
    );
  }
}

export function buildOfficialReadingCharacterGroundingV1(input: {
  response: unknown;
  semanticBundle: CanonicalReadingSemanticBundleV1;
  officialReadingReport: OfficialReadingRenderedContentV1;
  engineVersion: string;
}): OfficialReadingCharacterGroundingResultV1 {
  if (input.officialReadingReport.sourceSemanticHash !== input.semanticBundle.semanticHash) {
    throw new TypeError(
      'Official Reading report does not belong to the supplied canonical semantic bundle.',
    );
  }

  const grounding = buildCharacterGroundingBundleV2({
    response: input.response,
    semanticBundle: input.semanticBundle,
    engineVersion: input.engineVersion,
  });
  assertOfficialReadingReaderSemanticParityV1(input.officialReadingReport, grounding);

  const material = parityHashMaterial(
    input.semanticBundle.semanticHash,
    input.officialReadingReport,
    grounding,
  );
  const receiptHash = deterministicContentHash(material);
  return {
    grounding,
    parity: {
      ...material,
      receiptId: `official_reader_parity_${receiptHash.slice(0, 24)}`,
      receiptHash,
    },
  };
}

export function assertOfficialReadingReaderParityReceiptV1(
  value: OfficialReadingReaderParityReceiptV1,
  report: OfficialReadingRenderedContentV1,
  grounding: CharacterGroundingBundleV2,
): void {
  assertOfficialReadingReaderSemanticParityV1(report, grounding);
  if (
    value.semanticHash !== report.sourceSemanticHash ||
    value.semanticHash !== grounding.sourceSemanticHash
  ) {
    throw new TypeError('Official Reading Reader parity receipt semantic hash mismatch.');
  }
  if (
    value.officialReportId !== report.reportId ||
    value.officialReportHash !== report.reportHash ||
    value.groundingHash !== grounding.groundingHash
  ) {
    throw new TypeError('Official Reading Reader parity receipt binding mismatch.');
  }

  const expectedHash = deterministicContentHash(
    parityHashMaterial(value.semanticHash, report, grounding),
  );
  if (
    value.receiptHash !== expectedHash ||
    value.receiptId !== `official_reader_parity_${expectedHash.slice(0, 24)}`
  ) {
    throw new TypeError('Official Reading Reader parity receipt identity is invalid.');
  }
}
