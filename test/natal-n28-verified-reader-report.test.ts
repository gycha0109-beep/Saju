import { describe,expect,it } from 'vitest';
import { createGeneralNatalIntegratedPreviewProductHost } from
  '../src/host/general-natal-integrated-preview-host.js';
import { NATAL_N28_REPORT_TITLE } from
  '../src/preview/natal-n28-verified-reader-report.js';

const NOW=new Date('2026-10-17T00:00:00.000Z');
const request=(date:string,time:string|null,text='전체 사주')=>({
  birth:{calendarType:'solar',date,time,sex:'unspecified'},
  reading:{text},
});
const host=(enabled:boolean)=>createGeneralNatalIntegratedPreviewProductHost({
  requestIdFactory:()=> 'n28-verified-report-integration',
  requestNowFactory:()=>NOW,
  enableAutonomousReportComposition:enabled,
});
const mainTitle='주요 해석';
function actualReport(response:Awaited<ReturnType<ReturnType<typeof host>['requestReading']>>){
  return response.reading?.sections.find(s=>s.title===NATAL_N28_REPORT_TITLE);
}
describe('N28 opt-in reader-first report, source-owned and no independent expert gate',()=>{
  it('makes chart-specific source-proven overview precede Official main interpretation',async()=>{
    const [base,a,b]=await Promise.all([
      host(false).requestReading(request('1984-01-07','00:30')),
      host(true).requestReading(request('1984-01-07','00:30')),
      host(true).requestReading(request('1984-01-07','12:30')),
    ]);
    expect(base.state).toBe('delivered');
    const x=actualReport(a),y=actualReport(b);
    expect(x?.blocks[0]).toMatchObject({type:'paragraph'});
    expect(x?.blocks[1]).toMatchObject({type:'fact_table'});
    expect(x?.blocks.some(p=>p.type==='source_hint')).toBe(true);
    expect(x?.blocks.filter(p=>p.type==='paragraph').length).toBeGreaterThan(2);
    expect(y?.blocks).not.toEqual(x?.blocks);
    expect(a.reading?.sections.findIndex(s=>s.title===NATAL_N28_REPORT_TITLE))
      .toBeLessThan(a.reading?.sections.findIndex(s=>s.title===mainTitle)??-1);
    expect(a.reading?.sections.some(s=>s.title==='명식별 십신 주제 연결 · 자동 실험 풀이'))
      .toBe(false);
    expect(a.reading?.readingId).toBe(base.reading?.readingId);
    expect(a.responseId).toBe(base.responseId);
    expect(a.reading?.calculationSummary).toEqual(base.reading?.calculationSummary);
    expect(a.reading?.sections.filter(s=>s.title!==NATAL_N28_REPORT_TITLE))
      .toEqual(base.reading?.sections);
    expect(actualReport(base)).toBeUndefined();
  });
  it('retains unknown-time and unserved domain as unchanged response',async()=>{
    const [base,unknown,unsupported]=await Promise.all([
      host(false).requestReading(request('2024-03-10',null)),
      host(true).requestReading(request('2024-03-10',null)),
      host(true).requestReading(request('2024-03-10','12:30','직업 사주')),
    ]);
    expect(actualReport(unknown)).toBeUndefined();
    expect(unknown).toEqual(base);
    expect(unsupported.state).not.toBe('delivered');
    expect(actualReport(unsupported)).toBeUndefined();
  });
  it('does not leak source ID internals or ungrounded outcome predictions in report',async()=>{
    const response=await host(true).requestReading(request('2010-02-03','05:30'));
    const report=actualReport(response);
    expect(report).toBeDefined();
    const copy=JSON.stringify(report);
    expect(copy).toContain('십신');
    expect(copy).not.toMatch(/RULE-GENERAL|SOURCE_ID|claimId|methodologyRef|반드시 금전 손실/u);
  });
});
