import { describe, expect, it } from 'vitest';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  getCodeApprovedIndependentLichunBoundary,
  previewIndependentAnnualE1CycleMath,
  resolveAnnualCycleWithCodeApprovedIndependentE1,
  inspectIndependentLichunE1Packet,
  previewIndependentAnnualE1Math,
  resolveAnnualWithCodeApprovedIndependentE1,
  type IndependentLichunE1Packet,
} from '../src/reading/annual-lichun-independent-e1.js';
import { getPinnedPrimaryLichunBoundary } from '../src/reading/annual-lichun-reviewed-source-registry.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';

// Fake hashes and reviewer refs: structural test data, NOT an authority record.
const SYNTHETIC: IndependentLichunE1Packet = {
  year: 2026,
  displayedMinuteUtc: '2026-02-03T20:02:00.000Z',
  publishedJapaneseAlmanac: {
    uri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2026.pdf',
    originalPdfSha256: 'a'.repeat(64),
    pdfPage: 2,
    printedRow: '立 春 315 2 4 5 2',
    timezone: 'Asia/Tokyo',
  },
  independentKoreanObservation: {
    uri: 'https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2026',
    capturedPageSha256: 'b'.repeat(64),
    displayedMinuteUtc: '2026-02-03T20:02:00.000Z',
    timezone: 'Asia/Seoul',
  },
  reviewerRef: 'synthetic-reviewer-NOT-REAL',
  reviewerDecisionRef: 'synthetic-decision-NOT-REAL',
  reviewerDecision: 'approved_for_research_calculation',
};

function request(instant: string, scope: 'annual' | 'monthly' = 'annual'): ReadingRequest {
  return {
    requestId: 'synthetic-e1',
    intent: { domain: 'general', temporalScope: scope },
    targetPeriod: scope === 'annual'
      ? { scope, year: 2026, timeZone: 'Asia/Seoul', referenceDateTime: instant, resolution: 'relative_current' }
      : { scope, year: 2026, month: 2, timeZone: 'Asia/Seoul', referenceDateTime: instant, resolution: 'relative_current' },
  };
}

describe('E1 independent source review, structurally checkable but never caller approved', () => {
  it('separates synthetic tokens from a recorded owner-delegated AI E1 research decision', () => {
    expect(inspectIndependentLichunE1Packet(SYNTHETIC)).toEqual({
      state: 'structurally_eligible_not_authorized',
      productionAuthorized: false,
    });
    expect(getCodeApprovedIndependentLichunBoundary(2026)).toMatchObject({
      state: 'approved_research_calculation_source',
      year: 2026,
      reviewProvenance: 'OWNER_DELEGATED_AI',
      independentHumanReviewCompleted: false,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });
    expect(resolveAnnualWithCodeApprovedIndependentE1(request('2026-02-04T07:00:00+09:00'))).toMatchObject({
      state: 'research_candidate',
      requestId: 'synthetic-e1',
      effectiveYear: 2026,
      annualPillar: { stem: '병', branch: '오' },
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });
  });

  it('requires matching NAOJ PDF filename, page, printed minute, digest and official host', () => {
    for (const change of [
      { publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, originalPdfSha256: 'not-a-hash' } },
      { publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, uri: 'https://eco.mtk.nao.ac.jp.evil.test/koyomi/yoko/pdf/yoko2026.pdf' } },
      { publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, uri: 'http://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2026.pdf' } },
      { publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, uri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2027.pdf' } },
      { publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, pdfPage: 1 } },
      { publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, printedRow: '立 春 315 2 4 5 3' } },
      { publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, printedRow: '立 春 330 2 4 5 2' } },
    ]) {
      expect(inspectIndependentLichunE1Packet({ ...SYNTHETIC, ...change })).toMatchObject({
        state: 'rejected',
        reasonCode: 'INVALID_NAOJ_WITNESS',
      });
    }
  });

  it('requires independent Korean corroboration with matching time and captured page hash', () => {
    for (const change of [
      { independentKoreanObservation: { ...SYNTHETIC.independentKoreanObservation, capturedPageSha256: '' } },
      { independentKoreanObservation: { ...SYNTHETIC.independentKoreanObservation, uri: 'https://evil.example/calendarData?search_year=2026' } },
      { independentKoreanObservation: { ...SYNTHETIC.independentKoreanObservation, uri: 'https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2027' } },
      { independentKoreanObservation: { ...SYNTHETIC.independentKoreanObservation, displayedMinuteUtc: '2026-02-03T20:03:00.000Z' } },
    ]) {
      expect(inspectIndependentLichunE1Packet({ ...SYNTHETIC, ...change })).toMatchObject({
        state: 'rejected',
        reasonCode: 'INVALID_KASI_CORROBORATION',
      });
    }
  });

  it('rejects noncanonical timestamps, non-LiChun months, absent review and wrong year', () => {
    expect(inspectIndependentLichunE1Packet({ ...SYNTHETIC, year: 2027 })).toMatchObject({
      state: 'rejected', reasonCode: 'INVALID_YEAR_OR_MINUTE',
    });
    expect(inspectIndependentLichunE1Packet({ ...SYNTHETIC, displayedMinuteUtc: '2026-02-30T20:02:00.000Z' })).toMatchObject({
      state: 'rejected', reasonCode: 'INVALID_YEAR_OR_MINUTE',
    });
    expect(inspectIndependentLichunE1Packet({ ...SYNTHETIC, displayedMinuteUtc: '2026-02-03T20:02:10.000Z' })).toMatchObject({
      state: 'rejected', reasonCode: 'INVALID_YEAR_OR_MINUTE',
    });
    expect(inspectIndependentLichunE1Packet({ ...SYNTHETIC, reviewerDecisionRef: ' ' })).toMatchObject({
      state: 'rejected', reasonCode: 'MISSING_REVIEW_ATTESTATION',
    });
  });

  it('previews only conditional math before/after LiChun and blocks its uncertainty window', () => {
    expect(previewIndependentAnnualE1Math(request('2026-01-15T12:00:00+09:00'), SYNTHETIC)).toMatchObject({
      state: 'research_math_preview_only',
      effectiveYear: 2025,
      annualPillar: { stem: '을', branch: '사' },
      productionAuthorized: false,
      mayGenerateAnnualInterpretation: false,
    });
    expect(previewIndependentAnnualE1Math(request('2026-02-04T05:03:00+09:00'), SYNTHETIC)).toMatchObject({
      state: 'research_math_preview_only',
      effectiveYear: 2026,
      annualPillar: { stem: '병', branch: '오' },
    });
    for (const time of ['2026-02-04T05:01:00+09:00', '2026-02-04T05:02:10+09:00', '2026-02-04T05:02:59.999+09:00']) {
      expect(previewIndependentAnnualE1Math(request(time), SYNTHETIC)).toMatchObject({
        state: 'unavailable', reasonCode: 'BOUNDARY_MINUTE_AMBIGUOUS',
      });
    }
    expect(previewIndependentAnnualE1Math(request('2026-02-03T20:03:00.000Z'), SYNTHETIC)).toMatchObject({
      state: 'research_math_preview_only', effectiveYear: 2026,
    });
  });

  it('keeps Monthly unchanged and cannot use an annual evidence packet for Monthly authority', () => {
    const monthly = request('2026-02-04T05:00:00+09:00', 'monthly');
    const before = buildTemporalReadingContext(monthly);
    expect(previewIndependentAnnualE1Math(monthly, SYNTHETIC)).toMatchObject({
      state: 'unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
    });
    expect(resolveAnnualWithCodeApprovedIndependentE1(monthly)).toMatchObject({
      state: 'unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
    });
    expect(buildTemporalReadingContext(monthly)).toEqual(before);
    expect(getPinnedPrimaryLichunBoundary(2026)).toMatchObject({
      state: 'unavailable', reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
    });
  });

  it('does not grant E1 based on published-page-only research notes without binary digests', () => {
    expect(inspectIndependentLichunE1Packet({
      ...SYNTHETIC,
      publishedJapaneseAlmanac: { ...SYNTHETIC.publishedJapaneseAlmanac, originalPdfSha256: '' },
    })).toMatchObject({ state: 'rejected', reasonCode: 'INVALID_NAOJ_WITNESS' });
    expect(getCodeApprovedIndependentLichunBoundary(2027)).toMatchObject({
      state: 'approved_research_calculation_source',
      reviewProvenance: 'OWNER_DELEGATED_AI',
      independentHumanReviewCompleted: false,
      productionAuthorized: false,
    });
  });
});


describe('E1 whole-year interval requires TWO separately reviewed years', () => {
  const nextYearSynthetic: IndependentLichunE1Packet = {
    ...SYNTHETIC,
    year: 2027,
    displayedMinuteUtc: '2027-02-04T01:46:00.000Z',
    publishedJapaneseAlmanac: {
      ...SYNTHETIC.publishedJapaneseAlmanac,
      uri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2027.pdf',
      printedRow: '立 春 315 2 4 10 46',
    },
    independentKoreanObservation: {
      ...SYNTHETIC.independentKoreanObservation,
      uri: 'https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2027',
      displayedMinuteUtc: '2027-02-04T01:46:00.000Z',
    },
  };

  it('previews a 2026 interval without pretending either minute is an exact second', () => {
    expect(previewIndependentAnnualE1CycleMath(2026, SYNTHETIC, nextYearSynthetic)).toEqual({
      state: 'research_math_preview_only',
      displayYear: 2026,
      annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
      start: {
        displayedMinuteUtc: '2026-02-03T20:02:00.000Z',
        earliestPossibleUtc: '2026-02-03T20:01:00.000Z',
        latestPossibleExclusiveUtc: '2026-02-03T20:03:00.000Z',
      },
      end: {
        displayedMinuteUtc: '2027-02-04T01:46:00.000Z',
        earliestPossibleUtc: '2027-02-04T01:45:00.000Z',
        latestPossibleExclusiveUtc: '2027-02-04T01:47:00.000Z',
      },
      exactEffectiveIntervalEstablished: false,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });
  });

  it('never fills a missing year with January 1 or an assumed 365-day period', () => {
    expect(previewIndependentAnnualE1CycleMath(2026, SYNTHETIC)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'BOTH_E1_PACKETS_REQUIRED',
      productionAuthorized: false,
    });
    expect(previewIndependentAnnualE1CycleMath(2026, SYNTHETIC, SYNTHETIC)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'INVALID_E1_PACKETS',
    });
    expect(previewIndependentAnnualE1CycleMath(9999)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'INVALID_TARGET_YEAR',
    });
  });

  it('uses only registered years, retaining research-only provenance and requiring 2028 for 2027 cycle', () => {
    expect(resolveAnnualCycleWithCodeApprovedIndependentE1(2026)).toMatchObject({
      state: 'research_candidate',
      displayYear: 2026,
      annualPillar: { stem: '병', branch: '오' },
      exactEffectiveIntervalEstablished: false,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });
    expect(resolveAnnualCycleWithCodeApprovedIndependentE1(2027)).toMatchObject({
      state: 'source_unavailable',
      missingYear: 2028,
      productionAuthorized: false,
    });
    expect(getPinnedPrimaryLichunBoundary(2027)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
    });
  });
});
