import { describe, expect, it } from 'vitest';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  getCodeApprovedIndependentLichunBoundary,
  resolveAnnualCycleWithCodeApprovedIndependentE1,
  resolveAnnualWithCodeApprovedIndependentE1,
} from '../src/reading/annual-lichun-independent-e1.js';
import { getPinnedPrimaryLichunBoundary } from '../src/reading/annual-lichun-reviewed-source-registry.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';

const REVIEW_DECISION = 'https://github.com/gycha0109-beep/Saju/issues/2466#issuecomment-6097137685';

function annual(time: string, year: number): ReadingRequest {
  return {
    requestId: `delegated-e1-${year}`,
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: time, resolution: 'relative_current',
    },
  };
}

describe('Owner-delegated AI E1 research exception -- NO human independent review', () => {
  it('pins two distinct year sources to the expressly disclosed AI delegation, not a self-signed human review', () => {
    for (const year of [2026, 2027]) {
      const source = getCodeApprovedIndependentLichunBoundary(year);
      expect(source).toMatchObject({
        state: 'approved_research_calculation_source',
        year,
        evidenceTier: 'E1_INDEPENDENT_ASTRONOMY',
        reviewProvenance: 'OWNER_DELEGATED_AI',
        independentHumanReviewCompleted: false,
        mayGenerateAnnualInterpretation: false,
        productionAuthorized: false,
      });
      expect(getPinnedPrimaryLichunBoundary(year)).toMatchObject({
        state: 'unavailable',
        reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
        productionAuthorized: false,
      });
    }
    // Source-level decision metadata is also pinned by the owner-delegated
    // registration diff; the review comment is not a manual human attestation.
    expect(REVIEW_DECISION).toContain('issuecomment-6097137685');
  });

  it('computes two-sided 2026 LiChun cycle as a research candidate only', () => {
    expect(resolveAnnualCycleWithCodeApprovedIndependentE1(2026)).toMatchObject({
      state: 'research_candidate',
      displayYear: 2026,
      annualPillar: { stem: '병', branch: '오' },
      reviewProvenance: 'OWNER_DELEGATED_AI',
      independentHumanReviewCompleted: false,
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
    expect(resolveAnnualCycleWithCodeApprovedIndependentE1(2027)).toMatchObject({
      state: 'source_unavailable',
      displayYear: 2027,
      missingYear: 2028,
      reasonCode: 'NO_CODE_APPROVED_E1_WITNESS',
      productionAuthorized: false,
    });
  });

  it('switches the Annual year at 00:00 KST on the LiChun date', () => {
    expect(resolveAnnualWithCodeApprovedIndependentE1(annual('2026-02-03T23:59:59+09:00', 2026))).toMatchObject({
      state: 'research_candidate', effectiveYear: 2025, annualPillar: { stem: '을', branch: '사' },
      reviewProvenance: 'OWNER_DELEGATED_AI', independentHumanReviewCompleted: false,
      mayGenerateAnnualInterpretation: false, productionAuthorized: false,
    });
    for (const time of ['2026-02-04T00:00:00+09:00', '2026-02-04T05:01:00+09:00', '2026-02-04T05:02:59.999+09:00']) {
      expect(resolveAnnualWithCodeApprovedIndependentE1(annual(time, 2026))).toMatchObject({
        state: 'research_candidate', effectiveYear: 2026, annualPillar: { stem: '병', branch: '오' },
        mayGenerateAnnualInterpretation: false, productionAuthorized: false,
      });
    }
  });

  it('normalizes UTC and KST instants, rejects invalid zones/dates, and preserves the 2027 minute hold', () => {
    const utc = resolveAnnualWithCodeApprovedIndependentE1(annual('2026-02-03T20:03:00Z', 2026));
    const kst = resolveAnnualWithCodeApprovedIndependentE1(annual('2026-02-04T05:03:00+09:00', 2026));
    expect(utc).toEqual(kst);
    expect(kst).toMatchObject({
      state: 'research_candidate',
      effectiveYear: 2026,
      reviewProvenance: 'OWNER_DELEGATED_AI',
      independentHumanReviewCompleted: false,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });

    const base = annual('2026-02-04T05:03:00+09:00', 2026);
    const wrongZone = {
      ...base,
      targetPeriod: { ...base.targetPeriod, timeZone: 'Invalid/Zone' },
    } as unknown as ReadingRequest;
    for (const req of [
      wrongZone,
      annual('2026-02-30T05:03:00+09:00', 2026),
      annual('2026-02-04T05:03:00', 2026),
    ]) {
      expect(resolveAnnualWithCodeApprovedIndependentE1(req)).toMatchObject({
        state: 'unavailable', reasonCode: 'INVALID_REQUEST_TIME', productionAuthorized: false,
      });
    }
    expect(resolveAnnualWithCodeApprovedIndependentE1(annual('2027-02-03T23:59:59+09:00', 2027))).toMatchObject({
      state: 'research_candidate', effectiveYear: 2026, productionAuthorized: false,
    });
    for (const time of ['2027-02-04T00:00:00+09:00', '2027-02-04T10:45:30+09:00', '2027-02-04T10:47:00+09:00']) {
      expect(resolveAnnualWithCodeApprovedIndependentE1(annual(time, 2027))).toMatchObject({
        state: 'research_candidate', effectiveYear: 2027,
        reviewProvenance: 'OWNER_DELEGATED_AI', productionAuthorized: false,
      });
    }
  });

  it('rejects Monthly, absent future years and never alters current production temporal context', () => {
    const monthly: ReadingRequest = {
      requestId: 'monthly-unchanged',
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 2,
        timeZone: 'Asia/Seoul', referenceDateTime: '2026-02-04T05:02:15+09:00',
        resolution: 'relative_current',
      },
    };
    const before = buildTemporalReadingContext(monthly);
    expect(resolveAnnualWithCodeApprovedIndependentE1(monthly)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
    expect(buildTemporalReadingContext(monthly)).toEqual(before);
    expect(getCodeApprovedIndependentLichunBoundary(2028)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'NO_CODE_APPROVED_E1_WITNESS',
      productionAuthorized: false,
    });
  });
});
