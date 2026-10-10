import { describe, expect, it } from 'vitest';
import {
  FOREIGN_LICHUN_EVIDENCE_VERSION,
  getForeignPublishedAnnualCycleEvidence,
  getForeignPublishedLichunEvidence,
} from '../src/reading/annual-lichun-foreign-almanac-evidence.js';
import { getPinnedPrimaryLichunBoundary } from '../src/reading/annual-lichun-reviewed-source-registry.js';

describe('NAOJ published almanac is foreign evidence ONLY, not Korean primary authority', () => {
  it('stores the 2026 original PDF page and minute with conservative uncertainty', () => {
    expect(getForeignPublishedLichunEvidence(2026)).toMatchObject({
      state: 'research_evidence_only',
      evidenceVersion: FOREIGN_LICHUN_EVIDENCE_VERSION,
      observation: {
        year: 2026,
        evidenceTier: 'FOREIGN_INSTITUTION_PUBLISHED_ALMANAC',
        publishedAlmanacUri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2026.pdf',
        publishedPageNumber: 2,
        originalText: '立 春 315 2 4 5 2',
        solarLongitudeDegrees: 315,
        publishedLocalMinute: '2026-02-04 05:02',
        publishedTimeZone: 'JCST_UTC_PLUS_09',
        minuteAnchorUtc: '2026-02-03T20:02:00.000Z',
        earliestPossibleUtc: '2026-02-03T20:01:00.000Z',
        latestPossibleExclusiveUtc: '2026-02-03T20:03:00.000Z',
        originalPdfSha256: null,
        sourceBinaryAudited: false,
        koreanGazetteAuthenticated: false,
        sourceOwnerPromotionApproved: false,
        mayResolveAnnualPillar: false,
        mayGenerateAnnualInterpretation: false,
        productionAuthorized: false,
      },
      productionAuthorized: false,
    });
  });

  it('stores the 2027 published original independently of the changing NAOJ web calculator', () => {
    expect(getForeignPublishedLichunEvidence(2027)).toMatchObject({
      state: 'research_evidence_only',
      observation: {
        year: 2027,
        publishedAlmanacUri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2027.pdf',
        publishedPageNumber: 2,
        originalText: '立 春 315 2 4 10 46',
        publishedLocalMinute: '2027-02-04 10:46',
        minuteAnchorUtc: '2027-02-04T01:46:00.000Z',
        earliestPossibleUtc: '2027-02-04T01:45:00.000Z',
        latestPossibleExclusiveUtc: '2027-02-04T01:47:00.000Z',
        originalPdfSha256: null,
        sourceBinaryAudited: false,
        koreanGazetteAuthenticated: false,
        mayResolveAnnualPillar: false,
        productionAuthorized: false,
      },
    });
  });

  it('groups two published boundary observations without manufacturing an exact annual cycle', () => {
    const evidence = getForeignPublishedAnnualCycleEvidence(2026);
    expect(evidence).toMatchObject({
      state: 'research_evidence_only',
      start: { year: 2026, printedMinuteGranularityOnly: true },
      end: { year: 2027, printedMinuteGranularityOnly: true },
      mayResolveAnnualPillar: false,
      productionAuthorized: false,
    });
    expect('effectiveAnnualPillar' in evidence).toBe(false);
    expect('exactEffectiveIntervalEstablished' in evidence).toBe(false);
  });

  it('does not infer missing years or source precision', () => {
    expect(getForeignPublishedLichunEvidence(2028)).toEqual({
      state: 'unavailable',
      evidenceVersion: FOREIGN_LICHUN_EVIDENCE_VERSION,
      year: 2028,
      reasonCode: 'NO_PUBLISHED_FOREIGN_ALMANAC_WITNESS',
      productionAuthorized: false,
    });
    expect(getForeignPublishedAnnualCycleEvidence(2027)).toEqual({
      state: 'unavailable',
      missingYear: 2028,
      productionAuthorized: false,
    });
    expect(getForeignPublishedAnnualCycleEvidence(10000)).toEqual({
      state: 'unavailable',
      missingYear: 10000,
      productionAuthorized: false,
    });
  });

  it('never promotes a foreign published PDF into the empty Korean primary registry', () => {
    for (const year of [2026, 2027]) {
      expect(getForeignPublishedLichunEvidence(year).state).toBe('research_evidence_only');
      expect(getPinnedPrimaryLichunBoundary(year)).toMatchObject({
        state: 'unavailable',
        reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
        productionAuthorized: false,
      });
    }
  });
});
