import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  AUDITED_E1_CAPTURE_FINGERPRINTS,
  getCodeApprovedIndependentLichunBoundary,
  inspectIndependentE1CaptureBinding,
  inspectIndependentLichunE1Packet,
  resolveAnnualCycleWithCodeApprovedIndependentE1,
  type IndependentLichunE1Packet,
} from '../src/reading/annual-lichun-independent-e1.js';

type Row = {
  year: number;
  institution: 'NAOJ' | 'KASI';
  uri: string;
  sha256: string;
  minuteAnchorUtc: string;
};
const manifest = JSON.parse(
  readFileSync(join(process.cwd(), 'docs/evidence/annual-lichun-e1-capture-2026-10-10.json'), 'utf8'),
) as { captureRun: { runId: number }; rowEvidence: Row[]; review: { approvedForResearchCalculation: boolean } };

function candidate(year: 2026 | 2027): IndependentLichunE1Packet {
  const capture = AUDITED_E1_CAPTURE_FINGERPRINTS.find((item) => item.year === year)!;
  const hour = year === 2026 ? '5 2' : '10 46';
  return {
    year,
    displayedMinuteUtc: capture.minuteAnchorUtc,
    publishedJapaneseAlmanac: {
      uri: capture.naojUri,
      originalPdfSha256: capture.naojOriginalPdfSha256,
      pdfPage: 2,
      printedRow: `立 春 315 2 4 ${hour}`,
      timezone: 'Asia/Tokyo',
    },
    independentKoreanObservation: {
      uri: capture.kasiUri,
      capturedPageSha256: capture.kasiCapturedHtmlSha256,
      displayedMinuteUtc: capture.minuteAnchorUtc,
      timezone: 'Asia/Seoul',
    },
    reviewerRef: 'SYNTHETIC-not-an-actual-reviewer',
    reviewerDecisionRef: 'SYNTHETIC-not-an-actual-decision',
    reviewerDecision: 'approved_for_research_calculation',
  };
}

describe('E1 captured-file fingerprint binding, NOT a source-owner approval', () => {
  it('keeps code fingerprints identical to the durable independently audited capture manifest', () => {
    expect(AUDITED_E1_CAPTURE_FINGERPRINTS).toHaveLength(2);
    expect(manifest.captureRun.runId).toBe(38042070143);
    expect(manifest.review.approvedForResearchCalculation).toBe(false);
    for (const capture of AUDITED_E1_CAPTURE_FINGERPRINTS) {
      const naoj = manifest.rowEvidence.find((r) => r.year === capture.year && r.institution === 'NAOJ');
      const kasi = manifest.rowEvidence.find((r) => r.year === capture.year && r.institution === 'KASI');
      expect(naoj).toMatchObject({
        uri: capture.naojUri,
        sha256: capture.naojOriginalPdfSha256,
        minuteAnchorUtc: capture.minuteAnchorUtc,
      });
      expect(kasi).toMatchObject({
        uri: capture.kasiUri,
        sha256: capture.kasiCapturedHtmlSha256,
        minuteAnchorUtc: capture.minuteAnchorUtc,
      });
      expect(capture.captureRunId).toBe(manifest.captureRun.runId);
      expect(Object.isFrozen(capture)).toBe(true);
    }
    expect(Object.isFrozen(AUDITED_E1_CAPTURE_FINGERPRINTS)).toBe(true);
  });

  it('returns an observed capture match without manufacturing a human reviewer decision', () => {
    for (const year of [2026, 2027] as const) {
      const packet = candidate(year);
      expect(inspectIndependentLichunE1Packet(packet)).toEqual({
        state: 'structurally_eligible_not_authorized',
        productionAuthorized: false,
      });
      expect(inspectIndependentE1CaptureBinding(packet)).toEqual({
        state: 'capture_matched_review_still_required',
        captureRunId: 38042070143,
        productionAuthorized: false,
      });
      expect(getCodeApprovedIndependentLichunBoundary(year)).toMatchObject({
        state: 'unavailable',
        reasonCode: 'NO_CODE_APPROVED_E1_WITNESS',
        productionAuthorized: false,
      });
    }
    expect(resolveAnnualCycleWithCodeApprovedIndependentE1(2026).state).toBe('source_unavailable');
  });

  it('rejects well-formed but invented digests, changed snapshot bytes and changed minutes', () => {
    const original = candidate(2026);
    for (const changed of [
      {
        publishedJapaneseAlmanac: {
          ...original.publishedJapaneseAlmanac,
          originalPdfSha256: 'c'.repeat(64),
        },
      },
      {
        independentKoreanObservation: {
          ...original.independentKoreanObservation,
          capturedPageSha256: 'd'.repeat(64),
        },
      },
      {
        displayedMinuteUtc: '2026-02-03T20:03:00.000Z',
      },
      {
        independentKoreanObservation: {
          ...original.independentKoreanObservation,
          displayedMinuteUtc: '2026-02-03T20:03:00.000Z',
        },
      },
    ]) {
      expect(inspectIndependentE1CaptureBinding({ ...original, ...changed })).toEqual({
        state: 'unavailable',
        reasonCode: 'CAPTURE_DIGEST_OR_MINUTE_MISMATCH',
        productionAuthorized: false,
      });
    }
  });

  it('requires a separately pinned new-year capture rather than assuming future-year source approval', () => {
    const record = candidate(2027);
    const beyond: IndependentLichunE1Packet = {
      ...record,
      year: 2028,
    };
    expect(inspectIndependentE1CaptureBinding(beyond)).toEqual({
      state: 'unavailable',
      reasonCode: 'NO_PINNED_CAPTURE',
      productionAuthorized: false,
    });
    expect(getCodeApprovedIndependentLichunBoundary(2028).state).toBe('unavailable');
  });
});
