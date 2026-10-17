import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import type { ProductReadingResponseBlock } from '../reading/product-reading-response.js';
import { buildNatalN16GroundedReaderBrief } from './natal-grounded-reader-brief.js';
import { buildNatalN21ReaderFirstStory } from './natal-reader-first-story.js';
import { buildNatalN24ExpandedSourceReading } from './natal-expanded-source-reading.js';
import { attachNatalN27SelfServiceEvidenceReading } from './natal-n27-self-service-evidence-reading.js';
import { auditNatalN27bClaimReceipts } from './natal-n27b-claim-receipt-audit.js';
import {
  composeNatalN28VerifiedReaderReport,
  NATAL_N28_REPORT_TITLE,
} from './natal-n28-verified-reader-report.js';
import type { NatalSynthesisDomain, NatalSynthesisSource } from './natal-synthesis-preview.js';

export const NATAL_N30B_FIVE_DOMAIN_VERIFIED_READER_VERSION =
  'saju-natal-n30b-five-domain-verified-general-source-preview-v1' as const;

const DOMAINS: readonly NatalSynthesisDomain[] =
  ['general', 'career', 'wealth', 'business', 'relationship'];

export interface NatalN30bSourceReceipt {
  claimType: string;
  position: string;
  sourceIds: readonly string[];
  ruleIds: readonly string[];
}

/**
 * One real chart, five already-delivered bounded domain responses, and
 * General-only N27b-verified N28 source prose. The General overview is
 * deliberately OUTSIDE N16/N21/N24's original-domain meaning counts.
 * No General Claim is inherited as a Career/Wealth/etc. outcome assertion.
 */
export function buildNatalN30bFiveDomainVerifiedReader(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  sources: readonly NatalSynthesisSource[],
) {
  if (interpretation.run.snapshotId !== snapshot.snapshotId ||
      sources.length !== DOMAINS.length ||
      new Set(sources.map(s => s.domain)).size !== DOMAINS.length ||
      DOMAINS.some(domain => !sources.some(s => s.domain === domain))) {
    throw new TypeError('N30b requires one exact chart and five distinct natal domain sources');
  }
  // N30a's strict all-four-pillar consumer integrity is inherited here.
  const brief = buildNatalN16GroundedReaderBrief(snapshot, sources);
  const story = buildNatalN21ReaderFirstStory(snapshot, sources);
  const full = buildNatalN24ExpandedSourceReading(brief, story);
  const general = sources.find(source => source.domain === 'general');
  if (general === undefined) {
    throw new TypeError('N30b missing authentic General source');
  }
  const optIn = attachNatalN27SelfServiceEvidenceReading(
    general.response, snapshot, interpretation,
  );
  const receipt = auditNatalN27bClaimReceipts({
    snapshot, interpretation,
    originalHttpResponse: general.response, optInPreviewResponse: optIn,
  });
  const verified = composeNatalN28VerifiedReaderReport(
    general.response, optIn, snapshot, interpretation,
  );
  const summaries = verified.reading?.sections.filter(
    section => section.title === NATAL_N28_REPORT_TITLE,
  ) ?? [];
  if (summaries.length !== (receipt.checkedClaims > 0 ? 1 : 0) ||
      verified.responseId !== general.response.responseId ||
      verified.state !== general.response.state ||
      verified.reading?.readingId !== general.response.reading?.readingId ||
      verified.reading?.subject !== undefined &&
        JSON.stringify(verified.reading.subject) !==
        JSON.stringify(general.response.reading?.subject)) {
    throw new TypeError('N30b verified General summary changes original identity or scope');
  }
  const blocks: readonly ProductReadingResponseBlock[] = summaries[0]?.blocks ?? [];
  const rows = blocks.find(block => block.type === 'fact_table');
  if (receipt.checkedClaims > 0 &&
      (rows?.type !== 'fact_table' ||
        rows.rows.length !== receipt.checkedClaims ||
        receipt.claimReceipts.some((entry, i) => rows.rows[i]?.value !== entry.position))) {
    throw new TypeError('N30b General source receipts differ from displayed facts');
  }
  const receipts: readonly NatalN30bSourceReceipt[] = receipt.claimReceipts.map(entry => ({
    claimType: entry.claimType, position: entry.position,
    sourceIds: [...entry.sourceIds], ruleIds: [...entry.ruleIds],
  }));
  return {
    version: NATAL_N30B_FIVE_DOMAIN_VERIFIED_READER_VERSION,
    lifecycle: 'internal_preview_only' as const,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    story,
    full,
    generalSourceOverview: receipt.checkedClaims === 0 ? null : {
      title: NATAL_N28_REPORT_TITLE,
      blocks,
      originalResponseId: general.response.responseId,
      originalReadingId: general.response.reading!.readingId,
      verifiedReceipts: receipts,
    },
    fiveOriginalDomainsPreserved: true as const,
    originalPreviewMeaningFingerprint: story.previewMeaningFingerprint,
    generalClaimsAreNotCrossDomainOutcomes: true as const,
    createsNewInterpretation: false as const,
    usefulComplete: false as const,
    mayPublish: false as const,
    maySell: false as const,
    limitations: [
      'General의 검증된 전통 주제와 계산 위치만 종합 보고서 앞에 표시합니다.',
      '직업·재물·사업·관계의 결론을 General 십신 위치에서 새로 추론하지 않습니다.',
      '각 분야의 기존 Preview 원문·출처·부분 근거·미상시각 상태는 별도로 보존합니다.',
      '이 결과는 Preview 실험이며 Production/Commerce/새로운 명리 의미 승인으로 사용하지 않습니다.',
    ],
  };
}
