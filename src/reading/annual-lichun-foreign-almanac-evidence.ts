/**
 * Evidence-only, non-Korean, published government astronomy almanac witnesses.
 *
 * These are NOT Korean gazette documents and MUST NOT be converted into
 * AnnualLichunBoundaryEvidence or a source-owner-verified primary record.
 *
 * The NAOJ published PDFs were visually checked at printed page 2, row
 * "立春" (solar longitude 315 degrees). A source PDF was opened for reading,
 * but its original binary SHA-256 was NOT captured, so binary audit stays
 * incomplete. A displayed minute is NOT an exact event second.
 */
export const FOREIGN_LICHUN_EVIDENCE_VERSION = 'foreign-published-lichun-evidence-v1' as const;

export type ForeignLichunPublishedObservation = {
  readonly year: number;
  readonly evidenceTier: 'FOREIGN_INSTITUTION_PUBLISHED_ALMANAC';
  readonly institution: 'National Astronomical Observatory of Japan';
  readonly publishedAlmanacUri: string;
  readonly publishedPageNumber: 2;
  readonly originalText: string;
  readonly solarLongitudeDegrees: 315;
  readonly publishedTimeZone: 'JCST_UTC_PLUS_09';
  readonly publishedLocalMinute: string;
  readonly minuteAnchorUtc: string;
  readonly earliestPossibleUtc: string;
  readonly latestPossibleExclusiveUtc: string;
  readonly printedMinuteGranularityOnly: true;
  readonly pageTextInspected: true;
  readonly originalPdfSha256: null;
  readonly sourceBinaryAudited: false;
  readonly koreanGazetteAuthenticated: false;
  readonly sourceOwnerPromotionApproved: false;
  readonly mayResolveAnnualPillar: false;
  readonly mayGenerateAnnualInterpretation: false;
  readonly productionAuthorized: false;
};

const SOURCE = [
  {
    year: 2026,
    uri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2026.pdf',
    printedText: '立 春 315 2 4 5 2',
    localMinute: '2026-02-04 05:02',
    anchorUtc: '2026-02-03T20:02:00.000Z',
  },
  {
    year: 2027,
    uri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2027.pdf',
    printedText: '立 春 315 2 4 10 46',
    localMinute: '2027-02-04 10:46',
    anchorUtc: '2027-02-04T01:46:00.000Z',
  },
] as const;

export type ForeignLichunEvidenceLookup =
  | {
      readonly state: 'research_evidence_only';
      readonly evidenceVersion: typeof FOREIGN_LICHUN_EVIDENCE_VERSION;
      readonly observation: ForeignLichunPublishedObservation;
      readonly productionAuthorized: false;
    }
  | {
      readonly state: 'unavailable';
      readonly evidenceVersion: typeof FOREIGN_LICHUN_EVIDENCE_VERSION;
      readonly year: number;
      readonly reasonCode: 'NO_PUBLISHED_FOREIGN_ALMANAC_WITNESS';
      readonly productionAuthorized: false;
    };

/**
 * Not a resolver. Not wired to product, Monthly, Korean primary registry,
 * or the conditional annual-pillar engine.
 *
 * The conservative open interval (minute anchor +/- 60s) expresses
 * uncertainty about an unreported event second and display rounding.
 */
export function getForeignPublishedLichunEvidence(year: number): ForeignLichunEvidenceLookup {
  const record = SOURCE.find((item) => item.year === year);
  if (record === undefined) {
    return {
      state: 'unavailable',
      evidenceVersion: FOREIGN_LICHUN_EVIDENCE_VERSION,
      year,
      reasonCode: 'NO_PUBLISHED_FOREIGN_ALMANAC_WITNESS',
      productionAuthorized: false,
    };
  }
  const anchorMs = Date.parse(record.anchorUtc);
  return {
    state: 'research_evidence_only',
    evidenceVersion: FOREIGN_LICHUN_EVIDENCE_VERSION,
    observation: {
      year: record.year,
      evidenceTier: 'FOREIGN_INSTITUTION_PUBLISHED_ALMANAC',
      institution: 'National Astronomical Observatory of Japan',
      publishedAlmanacUri: record.uri,
      publishedPageNumber: 2,
      originalText: record.printedText,
      solarLongitudeDegrees: 315,
      publishedTimeZone: 'JCST_UTC_PLUS_09',
      publishedLocalMinute: record.localMinute,
      minuteAnchorUtc: record.anchorUtc,
      earliestPossibleUtc: new Date(anchorMs - 60_000).toISOString(),
      latestPossibleExclusiveUtc: new Date(anchorMs + 60_000).toISOString(),
      printedMinuteGranularityOnly: true,
      pageTextInspected: true,
      originalPdfSha256: null,
      sourceBinaryAudited: false,
      koreanGazetteAuthenticated: false,
      sourceOwnerPromotionApproved: false,
      mayResolveAnnualPillar: false,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    },
    productionAuthorized: false,
  };
}

/**
 * Grouped research evidence, not a qualified annual-cycle boundary.
 * Both years need a published page to show a complete-year comparison.
 */
export function getForeignPublishedAnnualCycleEvidence(year: number):
  | {
      readonly state: 'research_evidence_only';
      readonly start: ForeignLichunPublishedObservation;
      readonly end: ForeignLichunPublishedObservation;
      readonly mayResolveAnnualPillar: false;
      readonly productionAuthorized: false;
    }
  | {
      readonly state: 'unavailable';
      readonly missingYear: number;
      readonly productionAuthorized: false;
    } {
  if (!Number.isSafeInteger(year) || year < 2 || year > 9998) {
    return { state: 'unavailable', missingYear: year, productionAuthorized: false };
  }
  const start = getForeignPublishedLichunEvidence(year);
  if (start.state === 'unavailable') {
    return { state: 'unavailable', missingYear: year, productionAuthorized: false };
  }
  const end = getForeignPublishedLichunEvidence(year + 1);
  if (end.state === 'unavailable') {
    return { state: 'unavailable', missingYear: year + 1, productionAuthorized: false };
  }
  return {
    state: 'research_evidence_only',
    start: start.observation,
    end: end.observation,
    mayResolveAnnualPillar: false,
    productionAuthorized: false,
  };
}
