import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getCodeApprovedIndependentLichunBoundary,
  inspectIndependentLichunE1Packet,
  resolveAnnualCycleWithCodeApprovedIndependentE1,
  type IndependentLichunE1Packet,
} from '../src/reading/annual-lichun-independent-e1.js';
import { getPinnedPrimaryLichunBoundary } from '../src/reading/annual-lichun-reviewed-source-registry.js';

type CaptureRow = {
  year: number;
  institution: 'NAOJ' | 'KASI';
  kind: string;
  uri: string;
  sha256: string;
  byteLength: number;
  pdfPage: number | null;
  publishedMinuteLocal: string;
  timezone: 'Asia/Tokyo' | 'Asia/Seoul';
  minuteAnchorUtc: string;
  machineRowMatched: boolean;
  nonOfficialDisclaimerObserved?: boolean;
};
type Manifest = {
  schemaVersion: string;
  evidenceTier: string;
  status: string;
  captureRun: {
    runId: number;
    artifactId: number;
    runDateUtc: string;
    retentionDays: number;
  };
  rowEvidence: CaptureRow[];
  provenanceCautions: string[];
  review: {
    sourceOwnerIdentity: string | null;
    sourceOwnerDecisionRef: string | null;
    sourceOwnerReviewedAtUtc: string | null;
    reviewedCaptureArtifacts: boolean;
    approvedForResearchCalculation: boolean;
    koreanGazetteE2Authenticated: boolean;
    exactSecondEstablished: boolean;
    mayGenerateAnnualInterpretation: boolean;
    productionAuthorized: boolean;
  };
};

const manifest = JSON.parse(
  readFileSync(
    join(process.cwd(), 'docs/evidence/annual-lichun-e1-capture-2026-10-10.json'),
    'utf8',
  ),
) as Manifest;

const YEAR_EXPECTATIONS = [
  {
    year: 2026,
    local: '2026-02-04T05:02',
    utc: '2026-02-03T20:02:00.000Z',
    pdfHash: 'ee5f0a743c0e7e577fa4115a07eef7fa752cee9d6ce1022e06305a09f33f3d6d',
    htmlHash: '716b1801d129dbcdef24fb6150a0ceec9dd9f0e4b53339a9eda8e14fea5ab056',
    pdfBytes: 31018,
    htmlBytes: 81731,
    printedRow: '立 春 315 2 4 5 2',
  },
  {
    year: 2027,
    local: '2027-02-04T10:46',
    utc: '2027-02-04T01:46:00.000Z',
    pdfHash: 'f7998e5730bc7a5de5f122a692ca96626f3e0c8c035b30a1c71d6eb7718272e3',
    htmlHash: '7ead0a04d367a1efa1bf1d27a50d2d639ed8a098208dd66f6ffef272990bab9a',
    pdfBytes: 22902,
    htmlBytes: 84794,
    printedRow: '立 春 315 2 4 10 46',
  },
] as const;

describe('durable E1 capture evidence record (never an approval)', () => {
  it('identifies the actual audited run, rather than a made-up or future authority', () => {
    expect(manifest.schemaVersion).toBe('saju-e1-source-capture-review-manifest-v1');
    expect(manifest.evidenceTier).toBe('E1_INDEPENDENT_ASTRONOMY_CANDIDATE');
    expect(manifest.status).toBe('CAPTURED_AND_MINUTE_ROWS_MATCHED_REVIEW_PENDING');
    expect(manifest.captureRun).toMatchObject({
      runId: 38042070143,
      artifactId: 11666102465,
      runDateUtc: '2026-10-10',
      retentionDays: 7,
    });
    expect(manifest.rowEvidence).toHaveLength(4);
  });

  it('pins captured NAOJ original PDF and KASI HTML snapshot digests per year', () => {
    for (const x of YEAR_EXPECTATIONS) {
      const rows = manifest.rowEvidence.filter((row) => row.year === x.year);
      expect(rows).toHaveLength(2);
      const pdf = rows.find((row) => row.institution === 'NAOJ');
      const html = rows.find((row) => row.institution === 'KASI');
      expect(pdf).toMatchObject({
        kind: 'PUBLISHED_PDF',
        uri: `https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko${x.year}.pdf`,
        sha256: x.pdfHash,
        byteLength: x.pdfBytes,
        pdfPage: 2,
        timezone: 'Asia/Tokyo',
        publishedMinuteLocal: x.local,
        minuteAnchorUtc: x.utc,
        machineRowMatched: true,
      });
      expect(html).toMatchObject({
        kind: 'DYNAMIC_HTML_SNAPSHOT',
        uri: `https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=${x.year}`,
        sha256: x.htmlHash,
        byteLength: x.htmlBytes,
        pdfPage: null,
        timezone: 'Asia/Seoul',
        publishedMinuteLocal: x.local,
        minuteAnchorUtc: x.utc,
        machineRowMatched: true,
        nonOfficialDisclaimerObserved: true,
      });
      expect(pdf?.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(html?.sha256).toMatch(/^[0-9a-f]{64}$/);
    }
  });

  it('preserves original capture status even after later delegated-only research registration', () => {
    expect(manifest.review).toEqual({
      sourceOwnerIdentity: null,
      sourceOwnerDecisionRef: null,
      sourceOwnerReviewedAtUtc: null,
      reviewedCaptureArtifacts: false,
      approvedForResearchCalculation: false,
      koreanGazetteE2Authenticated: false,
      exactSecondEstablished: false,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });
    expect(manifest.provenanceCautions.some((note) => note.includes('snapshot-specific'))).toBe(true);
    for (const x of YEAR_EXPECTATIONS) {
      expect(getCodeApprovedIndependentLichunBoundary(x.year)).toMatchObject({
        state: 'approved_research_calculation_source',
        reviewProvenance: 'OWNER_DELEGATED_AI',
        independentHumanReviewCompleted: false,
        productionAuthorized: false,
      });
      expect(getPinnedPrimaryLichunBoundary(x.year)).toMatchObject({
        state: 'unavailable',
        reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
        productionAuthorized: false,
      });
    }
    expect(resolveAnnualCycleWithCodeApprovedIndependentE1(2026)).toMatchObject({ state: 'research_candidate', productionAuthorized: false });
  });

  it('never treats synthetic reviewer fields or the later owner delegation as independent human inspection', () => {
    for (const x of YEAR_EXPECTATIONS) {
      const pdf = manifest.rowEvidence.find((row) => row.year === x.year && row.institution === 'NAOJ')!;
      const html = manifest.rowEvidence.find((row) => row.year === x.year && row.institution === 'KASI')!;
      const syntheticReviewerPacket: IndependentLichunE1Packet = {
        year: x.year,
        displayedMinuteUtc: x.utc,
        publishedJapaneseAlmanac: {
          uri: pdf.uri,
          originalPdfSha256: pdf.sha256,
          pdfPage: pdf.pdfPage!,
          printedRow: x.printedRow,
          timezone: 'Asia/Tokyo',
        },
        independentKoreanObservation: {
          uri: html.uri,
          capturedPageSha256: html.sha256,
          displayedMinuteUtc: html.minuteAnchorUtc,
          timezone: 'Asia/Seoul',
        },
        reviewerRef: 'test-only-not-an-authorized-reviewer',
        reviewerDecisionRef: 'test-only-not-an-authorized-decision',
        reviewerDecision: 'approved_for_research_calculation',
      };
      expect(inspectIndependentLichunE1Packet(syntheticReviewerPacket)).toMatchObject({
        state: 'structurally_eligible_not_authorized',
        productionAuthorized: false,
      });
      expect(getCodeApprovedIndependentLichunBoundary(x.year)).toMatchObject({ state: 'approved_research_calculation_source', independentHumanReviewCompleted: false });
    }
  });
});
