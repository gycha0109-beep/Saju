import type { ProductReadingResponse, ProductReadingResponseSection } from '../reading/product-reading-response.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { compactGeneralNatalConsumerRepeatedInsights } from './general-natal-consumer-repeat-compaction.js';
import { stripCalculatedParagraph } from './natal-meaning-quality-audit.js';

export const NATAL_N26_HTTP_MEANING_TRANSPORT_VERSION =
  'saju-natal-n26-internal-to-live-http-source-meaning-preservation-v1' as const;

export interface NatalN26HttpMeaningTransportAudit {
  version: typeof NATAL_N26_HTTP_MEANING_TRANSPORT_VERSION;
  lifecycle: 'internal_quality_audit';
  mayPublish: false;
  maySell: false;
  mayApproveResearchMeaning: false;
  caseId: string;
  /** Different requests have different reading IDs. We never equate them. */
  internalReadingId: string;
  httpReadingId: string;
  readingIdentityAssertedSame: false;
  exactAfterPermittedN9Compaction: boolean;
  originalInternalInterpretationBlockCount: number;
  expectedHttpInterpretationBlockCount: number;
  actualHttpInterpretationBlockCount: number;
  compactedLiteralDuplicateCount: number;
  expectedSemanticSectionsFingerprint: string;
  observedSemanticSectionsFingerprint: string;
  mismatchedSectionIndices: readonly number[];
  semanticDifferentiationProven: false;
  limitations: readonly string[];
}

function interpretiveBlocks(sections: readonly ProductReadingResponseSection[]): number {
  return sections.filter(s => s.title !== '해석 범위' && s.title !== '프리뷰 안내')
    .reduce((count, section) => count + section.blocks
      .filter(block => block.type !== 'fact_table' && block.type !== 'source_hint').length, 0);
}

function visibleMainKeyPointCount(sections: readonly ProductReadingResponseSection[]): number {
  return sections.filter(section => section.title === '주요 해석' && section.state === 'complete')
    .flatMap(section => section.blocks)
    .reduce((count, block) => count + (block.type === 'key_points' ? block.items.length : 0), 0);
}

/**
 * The two executions are *independent*: do not compare internal UUIDs or
 * Claim IDs to transport identifiers. Only compare exact reading meaning
 * structure once the HOST's documented N5/N7 factual decorations are removed
 * and its exact-match N9 compaction is applied to internal service prose.
 */
export function auditNatalN26HttpMeaningTransport(input: {
  caseId: string;
  internalProduct: ProductReadingResponse;
  realHttpProduct: ProductReadingResponse;
}): NatalN26HttpMeaningTransportAudit {
  const { caseId, internalProduct, realHttpProduct } = input;
  const a = internalProduct.reading;
  const b = realHttpProduct.reading;
  if (!caseId || !a || !b ||
      !['delivered', 'delivered_with_fallback'].includes(internalProduct.state) ||
      !['delivered', 'delivered_with_fallback'].includes(realHttpProduct.state) ||
      a.brand.brandId !== 'myeonghwa' || b.brand.brandId !== 'myeonghwa') {
    throw new TypeError('N26 requires two delivered General Natal readings and an audit case ID.');
  }
  const birthA = a.subject.birthInputDisplay;
  const birthB = b.subject.birthInputDisplay;
  if (birthA.calendarType !== birthB.calendarType || birthA.date !== birthB.date ||
      birthA.timeKnown !== birthB.timeKnown ||
      (birthA.time ?? null) !== (birthB.time ?? null) ||
      a.subject.calculationState !== b.subject.calculationState ||
      deterministicContentHash(a.calculationSummary.pillars) !==
        deterministicContentHash(b.calculationSummary.pillars)) {
    throw new TypeError('N26 will not compare consumer meaning across different displayed birth charts.');
  }

  const internal = stripCalculatedParagraph(internalProduct);
  const expected = compactGeneralNatalConsumerRepeatedInsights(internal);
  const http = stripCalculatedParagraph(realHttpProduct);
  if (!internal.reading || !expected.reading || !http.reading) {
    throw new TypeError('N26 factual passage removal unexpectedly removed the reading.');
  }
  const expectedSections = expected.reading.sections;
  const actualSections = http.reading.sections;
  const mismatchedSectionIndices: number[] = [];
  for (let i = 0; i < Math.max(expectedSections.length, actualSections.length); i += 1) {
    if (deterministicContentHash(expectedSections[i] ?? null) !==
        deterministicContentHash(actualSections[i] ?? null)) {
      mismatchedSectionIndices.push(i);
    }
  }
  const compactedLiteralDuplicateCount =
    visibleMainKeyPointCount(internal.reading.sections) -
    visibleMainKeyPointCount(expectedSections);
  if (compactedLiteralDuplicateCount < 0) {
    throw new TypeError('N26 N9 compaction cannot add visible interpretation items.');
  }

  return {
    version: NATAL_N26_HTTP_MEANING_TRANSPORT_VERSION,
    lifecycle: 'internal_quality_audit',
    mayPublish: false, maySell: false, mayApproveResearchMeaning: false,
    caseId,
    internalReadingId: a.readingId,
    httpReadingId: b.readingId,
    readingIdentityAssertedSame: false,
    exactAfterPermittedN9Compaction: mismatchedSectionIndices.length === 0,
    originalInternalInterpretationBlockCount: interpretiveBlocks(internal.reading.sections),
    expectedHttpInterpretationBlockCount: interpretiveBlocks(expectedSections),
    actualHttpInterpretationBlockCount: interpretiveBlocks(actualSections),
    compactedLiteralDuplicateCount,
    expectedSemanticSectionsFingerprint: deterministicContentHash(expectedSections),
    observedSemanticSectionsFingerprint: deterministicContentHash(actualSections),
    mismatchedSectionIndices,
    semanticDifferentiationProven: false,
    limitations: [
      'Independent internal and HTTP service executions are matched by complete displayed birth-chart identity, not internal reading IDs.',
      'N5 and N7 marked calculated facts are excluded only by the N6 guarded factual-passage remover.',
      'N9 removes exact same-block duplicate key-point strings only; no meaning is synthesized or authorized here.',
      'Even exact semantic-section parity is not evidence that the underlying interpretation is traditionally correct or useful.',
    ],
  };
}
