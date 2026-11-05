import { describe, expect, it } from 'vitest';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import { createGeneralNatalIntegratedPreviewProductHost } from
  '../src/host/general-natal-integrated-preview-host.js';
import { parseProductHostCalculationRequest } from '../src/host/product-host.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from
  '../src/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalN30bFiveDomainVerifiedReader } from
  '../src/preview/natal-n30b-five-domain-verified-reader.js';

const NOW = new Date('2026-10-17T00:00:00.000Z');
const DOMAINS = ['general', 'career', 'wealth', 'business', 'relationship'] as const;
const request = (time: string | null) => ({
  birth: {calendarType:'solar' as const,date:'2010-02-03',time,sex:'unspecified' as const},
  reading: {text:'전체 사주'},
});
function context(time: string | null) {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
    parseProductHostCalculationRequest({birth:request(time).birth}),{now:NOW},
  ).snapshot;
  const registry = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());
  return {snapshot, interpretation:runInterpretation(snapshot,registry,{requestId:'n30b',now:NOW})};
}
const host = createGeneralNatalIntegratedPreviewProductHost({
  requestIdFactory:()=>'n30b-real-General',
  requestNowFactory:()=>NOW,
});
function fiveSources(real: ProductReadingResponse) {
  return DOMAINS.map((domain,i) => ({
    domain,
    // The General response is real. Other four responses deliberately reuse
    // its exact bounded original copy, not simulated differentiated claims.
    response: i === 0 ? real : {
      ...real,responseId:real.responseId+'-'+domain,
      ...(real.reading===undefined ? {} : {
        reading:{...real.reading,readingId:real.reading.readingId+'-'+domain},
      }),
    },
  }));
}
describe('N30b real General receipts within five-domain reader-first preview',()=>{
  it('shows one source-verified General overview without counting it as five new meanings',async()=>{
    const original = await host.requestReading(request('05:30'));
    expect(original.state).toBe('delivered');
    const {snapshot,interpretation} = context('05:30');
    const sources = fiveSources(original);
    const joined = buildNatalN30bFiveDomainVerifiedReader(snapshot,interpretation,sources);
    const overview = joined.generalSourceOverview;
    expect(overview).not.toBeNull();
    expect(overview?.verifiedReceipts.length).toBeGreaterThan(0);
    expect(overview?.verifiedReceipts.every(r=>
      r.sourceIds.length>0 && r.ruleIds.length>0 && r.position.length>0)).toBe(true);
    expect(overview?.originalReadingId).toBe(original.reading?.readingId);
    expect(joined.story.sections).toHaveLength(5);
    expect(joined.full.originalLeftUnreadCount).toBe(0);
    expect(joined.story.previewMeaningFingerprint).toBe(joined.originalPreviewMeaningFingerprint);
    expect(joined.createsNewInterpretation).toBe(false);
    expect(joined.usefulComplete).toBe(false);
    expect(joined.mayPublish).toBe(false);
    expect(joined.maySell).toBe(false);
    expect(original.reading?.sections.some(s=>s.title==='내 명식에서 먼저 읽을 핵심 구조')).toBe(false);
  });

  it('does not fabricate a General source report when the birth hour is unknown',async()=>{
    const original = await host.requestReading(request(null));
    expect(original.state).toBe('partial_evidence');
    const {snapshot,interpretation} = context(null);
    const report = buildNatalN30bFiveDomainVerifiedReader(
      snapshot,interpretation,fiveSources(original));
    expect(report.generalSourceOverview).toBeNull();
    expect(report.story.displayedOriginalInterpretationCount).toBe(0);
    expect(report.full.originalLeftUnreadCount).toBe(0);
  });

  it('rejects cross-person chart drift and missing domain without introducing other claims',async()=>{
    const original = await host.requestReading(request('05:30'));
    const {snapshot,interpretation} = context('05:30');
    const sources = fiveSources(original);
    expect(()=>buildNatalN30bFiveDomainVerifiedReader(
      snapshot,interpretation,sources.slice(0,4))).toThrow(/five distinct/u);
    const tampered = structuredClone(sources);
    const wealth = tampered[2]!.response.reading;
    if (!wealth) throw new Error('expected delivered source');
    wealth.calculationSummary.pillars.year = {
      label:wealth.calculationSummary.pillars.year.label,status:'unavailable',
    };
    expect(()=>buildNatalN30bFiveDomainVerifiedReader(
      snapshot,interpretation,tampered)).toThrow(/N30 resolved canonical pillar hidden/u);
  });
});
