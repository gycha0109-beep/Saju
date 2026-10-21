import { describe, expect, it } from 'vitest';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  ANNUAL_LICHUN_PRIMARY_REGISTRY_VERSION,
  getPinnedPrimaryLichunBoundary,
  isStructurallyValidPinnedPrimaryLichunWitness,
  type PinnedPrimaryLichunWitness,
  resolveAnnualLichunCycleWithReviewedSources,
  resolveAnnualLichunRequestWithReviewedSource,
} from '../src/reading/annual-lichun-reviewed-source-registry.js';

function annualRequest(): ReadingRequest {
  return {
    requestId: 'untrusted-date-cannot-gain-primary-source',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year: 2026,
      timeZone: 'Asia/Seoul',
      referenceDateTime: '2026-01-15T03:00:00.000Z',
      resolution: 'relative_current',
    },
  };
}

describe('Primary LiChun source registration fails closed before direct source audit', () => {
  it('records NO 2026 or 2027 trusted source from an official announcement alone', () => {
    for (const year of [2026, 2027]) {
      expect(getPinnedPrimaryLichunBoundary(year)).toEqual({
        state: 'unavailable',
        year,
        reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
        registryVersion: ANNUAL_LICHUN_PRIMARY_REGISTRY_VERSION,
        productionAuthorized: false,
      });
    }
  });

  it('denies reading requests until a reviewed primary boundary is pinned', () => {
    expect(resolveAnnualLichunRequestWithReviewedSource(annualRequest())).toEqual({
      state: 'source_unavailable',
      requestId: annualRequest().requestId,
      reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
      productionAuthorized: false,
    });
  });

  it('cannot fabricate whole-year 2026 with unregistered 2026/2027 boundaries', () => {
    expect(resolveAnnualLichunCycleWithReviewedSources(2026)).toEqual({
      state: 'source_unavailable',
      displayYear: 2026,
      missingYear: 2026,
      reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
      productionAuthorized: false,
    });
  });

  it('still rejects an invalid year independently of the unpopulated registry', () => {
    expect(resolveAnnualLichunCycleWithReviewedSources(10000)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'INVALID_TARGET_YEAR',
      productionAuthorized: false,
    });
  });

  it('does not convert a Monthly or absent-period request to an annual reading', () => {
    expect(resolveAnnualLichunRequestWithReviewedSource({
      requestId: 'monthly',
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly',
        year: 2026,
        month: 1,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-01-15T03:00:00.000Z',
        resolution: 'relative_current',
      },
    })).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_INTENT_REQUIRED',
      productionAuthorized: false,
    });
    expect(resolveAnnualLichunRequestWithReviewedSource({
      requestId: 'no-period',
      intent: { domain: 'general', temporalScope: 'annual' },
    })).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_TARGET_PERIOD_REQUIRED',
      productionAuthorized: false,
    });
  });
});

describe('structural validation of source-owner-pinned witnesses (NOT proof of authenticity)', () => {
  const synthetic: PinnedPrimaryLichunWitness = {
    year: 2026,
    instantUtc: '2026-02-03T20:02:00.000Z',
    precision: 'minute',
    sourceRef: 'synthetic-test-not-an-official-source',
    sourceVersion: 'synthetic-test-v1',
    primaryDocumentUri: 'https://www.kasa.go.kr/files/synthetic-primary.pdf',
    primaryDocumentSha256: 'a'.repeat(64),
    primaryDocumentPage: 2,
    printedLichunText: '입춘 2월 4일 오전 5시 2분 (synthetic, not audited)',
    reviewerDecisionRef: 'synthetic-review-not-a-real-attestation',
  };

  it('accepts a structurally coherent fixture without registering or authorizing it', () => {
    expect(isStructurallyValidPinnedPrimaryLichunWitness(synthetic)).toBe(true);
    expect(getPinnedPrimaryLichunBoundary(2026)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'NO_PINNED_PRIMARY_WITNESS',
      productionAuthorized: false,
    });
  });

  it('rejects implausible dates, wrong local years, and wrong declared minute precision', () => {
    for (const change of [
      { instantUtc: '2026-01-01T00:00:00.000Z' },
      { instantUtc: '2026-12-31T23:00:00.000Z' },
      { instantUtc: '2026-02-30T20:02:00.000Z' },
      { instantUtc: '2026-02-03T20:02:42.000Z' },
      { instantUtc: '2026-02-03T20:02:00.100Z' },
      { year: 2025 },
      { year: 2027 },
    ]) {
      expect(isStructurallyValidPinnedPrimaryLichunWitness({ ...synthetic, ...change })).toBe(false);
    }
  });

  it('rejects URL impersonation, credentials, ports, malformed hashes, and empty reviews', () => {
    for (const change of [
      { primaryDocumentUri: 'https://www.kasa.go.kr.attacker.test/not-official.pdf' },
      { primaryDocumentUri: 'https://fake-gwanbo.go.kr/not-official.pdf' },
      { primaryDocumentUri: 'http://www.kasa.go.kr/file.pdf' },
      { primaryDocumentUri: 'https://attacker@www.kasa.go.kr/file.pdf' },
      { primaryDocumentUri: 'https://www.kasa.go.kr:444/file.pdf' },
      { primaryDocumentSha256: 'xyz' },
      { primaryDocumentPage: 0 },
      { reviewerDecisionRef: ' ' },
      { printedLichunText: 'unrelated document' },
    ]) {
      expect(isStructurallyValidPinnedPrimaryLichunWitness({ ...synthetic, ...change })).toBe(false);
    }
  });
});
