import { describe,expect,it } from 'vitest';
import { createGeneralNatalIntegratedPreviewProductHost } from
  '../src/host/general-natal-integrated-preview-host.js';
import { NATAL_N28B_AUTONOMOUS_FACT_QUALIFIER_VERSION } from
  '../src/preview/natal-n28b-canonical-fact-projection.js';

const NOW=new Date('2026-10-17T00:00:00.000Z');
const request=(date:string,time:string|null,reading='전체 사주')=>({
  birth:{calendarType:'solar',date,time,sex:'unspecified'},
  reading:{text:reading},
});
function host(qualified:boolean){
  return createGeneralNatalIntegratedPreviewProductHost({
    requestIdFactory:()=> 'n28b-canonical-qualifier',
    requestNowFactory:()=>NOW,
    enableAutonomousCanonicalFactQualifiers:qualified,
  });
}
describe('N28b Canonical->Official source-locked calculation qualifiers',()=>{
  it('puts computed subtype/location into Official-rendered consumer meaning, without expert signoff',async()=>{
    const [base,a,b]=await Promise.all([
      host(false).requestReading(request('1984-01-07','00:30')),
      host(true).requestReading(request('1984-01-07','00:30')),
      host(true).requestReading(request('1984-01-07','12:30')),
    ]);
    expect(a.state).toBe('delivered');
    expect(b.state).toBe('delivered');
    expect(base.state).toBe('delivered');
    expect(NATAL_N28B_AUTONOMOUS_FACT_QUALIFIER_VERSION).toContain('canonical');
    const before=JSON.stringify(base.reading?.sections);
    const textA=JSON.stringify(a.reading?.sections);
    const textB=JSON.stringify(b.reading?.sections);
    expect(textA).toContain('이 원국에서 확인한 십신 위치:');
    expect(textB).toContain('이 원국에서 확인한 십신 위치:');
    expect(textA).not.toBe(textB);
    expect(textA).not.toBe(before);
    expect(textA).toContain('편관');
    expect(textB).toContain('정관');
    expect(a.reading?.calculationSummary).toEqual(base.reading?.calculationSummary);
    expect(a.reading?.sections.some(s=>s.title==='명식별 십신 주제 연결 · 자동 실험 풀이'))
      .toBe(false);
  });
  it('never creates qualified hour positions for unknown birth hour or other domains',async()=>{
    const [unknown,unsupported]=await Promise.all([
      host(true).requestReading(request('2024-03-10',null)),
      host(true).requestReading(request('2024-03-10','12:30','직업 사주')),
    ]);
    expect(JSON.stringify(unknown)).not.toContain('이 원국에서 확인한 십신 위치:');
    expect(unsupported.state).not.toBe('delivered');
  });
});
