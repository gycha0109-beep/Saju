import { describe, expect, it } from 'vitest';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  getCodeApprovedIndependentLichunBoundary,
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
  it('requires source owner code review even when synthetic hashes and approval strings look valid', () => {
    expect(inspectIndependentLichunE1Packet(SYNTHETIC)).toEqual({
      state: 'structurally_eligible_not_authorized',
      productionAuthorized: false,
    });
    expect(getCodeApprovedIndependentLichunBoundary(2026)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'NO_CODE_APPROVED_E1_WITNESS',
      productionAuthorized: false,
    });
    expect(resolveAnnualWithCodeApprovedIndependentE1(request('2026-02-04T07:00:00+09:00'))).toEqual({
      state: 'source_unavailable',
      requestId: 'synthetic-e1',
      reasonCode: 'NO_CODE_APPROVED_E1_WITNESS',
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
      state: 'unavailable', reasonCode: 'NO_CODE_APPROVED_E1_WITNESS',
    });
  });
});
