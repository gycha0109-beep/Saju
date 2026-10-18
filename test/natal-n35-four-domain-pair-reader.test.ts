import {describe,expect,it} from 'vitest';
import {calculateAuthorizedMyeonghwaProductionSnapshot} from
  '../src/production/production-calculation-runtime.js';
import {createBusinessNatalReadingCandidateRegistry} from
  '../src/research/business-natal-reading-candidate.js';
import {runInterpretation} from '../src/interpretation/interpretation-engine.js';
import {buildNatalN32ExpandedDomainResearchReading} from
  '../src/preview/natal-n32-expanded-domain-research-reading.js';
import {auditNatalN34FourDomainCopyContrasts} from
  '../src/preview/natal-n34-four-domain-copy-contrast.js';
import {renderNatalN35FourDomainPairReader} from
  '../src/preview/natal-n35-four-domain-pair-reader.js';

const NOW=new Date('2026-10-18T00:00:00.000Z');
const registry=createBusinessNatalReadingCandidateRegistry(NOW.toISOString());
function fixture(caseId:string,date:{year:number;month:number;day:number},
  known=true) {
  const snapshot=calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType:'solar',date,
    time:known?{known:true,hour:12,minute:30}:{known:false},
    sexForTraditionalCalculation:'unspecified',
  },{now:NOW}).snapshot;
  const execution=runInterpretation(snapshot,registry,{requestId:'n35-test',now:NOW});
  return {caseId,reading:buildNatalN32ExpandedDomainResearchReading(
    snapshot,execution,registry)};
}

describe('N35 actual four-domain research original side-by-side reader',()=>{
  it('renders exact existing Korean copy, positions and source versions for each pair and its unknown-time HOLD',()=>{
    const a=fixture('a',{year:2024,month:3,day:10});
    const b=fixture('b',{year:1996,month:1,day:9});
    const same=fixture('same',{year:2024,month:3,day:10});
    const unknown=fixture('unknown',{year:2024,month:3,day:10},false);
    const cases=[a,b,same,unknown];
    const pairs=[{left:'a',right:'b'},{left:'a',right:'same'},
      {left:'a',right:'unknown'}];
    const audit=auditNatalN34FourDomainCopyContrasts(cases,pairs);
    const html=renderNatalN35FourDomainPairReader(cases,pairs,audit);
    expect(html).toContain('실제 명식별 네 분야 한국어 원문 대조');
    expect(html).toContain('동일 입력 대조');
    expect(html).toContain('계산으로 확인된 위치');
    expect(html).toContain('Canonical fact paths');
    expect(html).toContain('Narrative Profile version');
    expect(html).toContain('해당 명식에서 출처와 연결된 연구 해석 없음');
    expect(html).not.toContain('날조한 개인');
    expect(html.match(/class="domain"/gu)?.length).toBe(pairs.length*4);
    for(const section of a.reading.firstScreen.sections){
      for(const claim of section.visibleClaims){
        expect(html).toContain(claim.claimType);
        expect(html).toContain(claim.claimRuleVersion);
        expect(html).toContain(claim.profileVersion);
      }
    }
  });

  it('rejects stale audit, fabricated original research sentences or missing pairing',()=>{
    const a=fixture('a',{year:2024,month:3,day:10});
    const b=fixture('b',{year:1996,month:1,day:9});
    const inputs=[a,b];
    const pairs=[{left:'a',right:'b'}];
    const audit=auditNatalN34FourDomainCopyContrasts(inputs,pairs);
    expect(()=>renderNatalN35FourDomainPairReader(inputs,pairs,
      {...audit,pairCount:audit.pairCount+1})).toThrow(/result or research permission mismatch/u);
    const target=a.reading.firstScreen.sections.find(s=>s.visibleClaims.length>0);
    expect(target).toBeDefined();
    if(!target)return;
    const manipulated={...a,reading:{...a.reading,firstScreen:{
      ...a.reading.firstScreen,
      sections:a.reading.firstScreen.sections.map(s=>s.domain!==target.domain?s:{
        ...s,visibleClaims:s.visibleClaims.map((c,i)=>i===0?
          {...c,headline:'<script>alert(1)</script>'}:c),
      }),
    }}};
    expect(()=>renderNatalN35FourDomainPairReader([manipulated,b],pairs,audit))
      .toThrow(/original Korean headline/u);
    expect(()=>renderNatalN35FourDomainPairReader(inputs,
      [{left:'a',right:'missing'}],audit)).toThrow(/without original chart/u);
    expect(audit.mayPublish).toBe(false);
    expect(audit.usefulComplete).toBe(false);
  });
});
