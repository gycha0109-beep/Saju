import { describe,expect,it } from 'vitest';
import { createGeneralNatalIntegratedPreviewProductHost } from
  '../src/host/general-natal-integrated-preview-host.js';
import { parseProductHostCalculationRequest } from '../src/host/product-host.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from
  '../src/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { auditNatalN27bClaimReceipts } from
  '../src/preview/natal-n27b-claim-receipt-audit.js';

const NOW = new Date('2026-10-17T00:00:00.000Z');
const birth={calendarType:'solar',date:'2010-02-03',time:'05:30',sex:'unspecified'} as const;
const request=(time:string|null)=>({
  birth:{...birth,time},reading:{text:'전체 사주'},
});
function host(optIn:boolean){
  return createGeneralNatalIntegratedPreviewProductHost({
    requestIdFactory:()=> 'n27b-source-receipt-test',
    requestNowFactory:()=> NOW,
    enableAutonomousEvidenceReading: optIn,
  });
}
function sources(time:string|null){
  const body=request(time);
  const snapshot=calculateAuthorizedMyeonghwaProductionSnapshot(
    parseProductHostCalculationRequest({birth:body.birth}),{now:NOW}).snapshot;
  const registry=createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());
  const interpretation=runInterpretation(snapshot,registry,{requestId:'n27b-test',now:NOW});
  return {snapshot,interpretation};
}

describe('N27b self-service exact Claim receipt integrity',()=>{
  it('links exact source-owned T8 + real Ten-God placements without mutating base', async()=>{
    const [base,updated]=await Promise.all([
      host(false).requestReading(request('05:30')),
      host(true).requestReading(request('05:30')),
    ]);
    expect(base.state).toBe('delivered');
    const report=auditNatalN27bClaimReceipts({
      ...sources('05:30'),originalHttpResponse:base,optInPreviewResponse:updated,
    });
    expect(report.chartBoundSourceIntegrity).toBe(true);
    expect(report.originalCopyPreserved).toBe(true);
    expect(report.checkedClaims).toBeGreaterThan(0);
    expect(report.claimReceipts.every(c=>c.ruleIds.length>0&&c.sourceIds.length>0)).toBe(true);
  });
  it('rejects lexical tampering and fabricated role position instead of calling it personalization',async()=>{
    const [base,updated]=await Promise.all([
      host(false).requestReading(request('05:30')),
      host(true).requestReading(request('05:30')),
    ]);
    if (!updated.reading) throw new Error('expected delivered reading');
    const modified={...updated,reading:{...updated.reading,sections:
      updated.reading.sections.map(section=>section.title!=='명식별 십신 주제 연결 · 자동 실험 풀이'
        ?section:{...section,blocks:section.blocks.map((b,i)=>i!==1||b.type!=='paragraph'
          ?b:{...b,text:b.text.replace('겁재','정재')+' 반드시 큰돈을 잃습니다.'})})}};
    expect(()=>auditNatalN27bClaimReceipts({
      ...sources('05:30'),originalHttpResponse:base,optInPreviewResponse:modified,
    })).toThrow(/N27b autonomous receipt fail-closed/u);
  });
  it('never creates source meaning when hour is not provided',async()=>{
    const [base,updated]=await Promise.all([
      host(false).requestReading(request(null)),host(true).requestReading(request(null)),
    ]);
    const report=auditNatalN27bClaimReceipts({
      ...sources(null),originalHttpResponse:base,optInPreviewResponse:updated,
    });
    expect(report.checkedClaims).toBe(0);
    expect(report.noUnqualifiedRendering).toBe(true);
  });
});
