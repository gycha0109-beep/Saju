import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { createBusinessNatalReadingCandidateRegistry } from
  '../src/research/business-natal-reading-candidate.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalN32ExpandedDomainResearchReading } from
  '../src/preview/natal-n32-expanded-domain-research-reading.js';
import {
  auditNatalN34FourDomainCopyContrasts,
  classifyNatalN34CopyDifference,
} from '../src/preview/natal-n34-four-domain-copy-contrast.js';

const NOW=new Date('2026-10-18T00:00:00.000Z');
const registry=createBusinessNatalReadingCandidateRegistry(NOW.toISOString());
function caseFor(caseId:string, date:{year:number;month:number;day:number},
  time:{known:true;hour:number;minute:number}|{known:false}) {
  const snapshot=calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType:'solar',date,time,sexForTraditionalCalculation:'unspecified',
  },{now:NOW}).snapshot;
  const interpretation=runInterpretation(snapshot,registry,{requestId:'n34-test',now:NOW});
  return {caseId,reading:buildNatalN32ExpandedDomainResearchReading(
    snapshot,interpretation,registry)};
}

describe('N34 original Korean research copy vs changed source vs changed chart position',()=>{
  it('keeps every distinction explicit without counting mere positions as new meaning',()=>{
    const original={domain:'career' as const,count:2,
      copyHash:'original',basisHash:'basis',positionHash:'positions'};
    expect(classifyNatalN34CopyDifference(original,{...original}))
      .toBe('unchanged');
    expect(classifyNatalN34CopyDifference(original,{...original,positionHash:'moved'}))
      .toBe('same_copy_different_positions');
    expect(classifyNatalN34CopyDifference(original,{...original,basisHash:'other'}))
      .toBe('same_copy_different_claim_basis');
    expect(classifyNatalN34CopyDifference(original,{...original,copyHash:'new'}))
      .toBe('original_korean_copy_changed');
    expect(classifyNatalN34CopyDifference(original,{...original,count:0}))
      .toBe('coverage_changed');
    expect(classifyNatalN34CopyDifference({...original,count:0},{...original,count:0}))
      .toBe('insufficient_research_evidence');
    expect(()=>classifyNatalN34CopyDifference(original,{...original,domain:'wealth'}))
      .toThrow(/different domains/u);
  });

  it('separates source prose, basis, and position across real independently calculated charts',()=>{
    const a=caseFor('a',{year:2024,month:3,day:10},{known:true,hour:12,minute:30});
    const same=caseFor('same',{year:2024,month:3,day:10},{known:true,hour:12,minute:30});
    const hour=caseFor('hour',{year:2024,month:3,day:10},{known:true,hour:0,minute:30});
    const different=caseFor('different',{year:1996,month:1,day:9},
      {known:true,hour:19,minute:30});
    const unknown=caseFor('unknown',{year:2024,month:3,day:10},{known:false});
    const result=auditNatalN34FourDomainCopyContrasts(
      [a,same,hour,different,unknown],
      [{left:'a',right:'same'},{left:'a',right:'hour'},
       {left:'a',right:'different'},{left:'a',right:'unknown'}]);
    expect(result.actualCaseCount).toBe(5);
    expect(result.pairCount).toBe(4);
    expect(result.sameChartControlPairCount).toBe(1);
    expect(result.distinctChartPairCount).toBe(3);
    expect(result.pairs[0]?.domains.every(d=>d.difference==='unchanged' ||
      d.difference==='insufficient_research_evidence')).toBe(true);
    const distinct=result.pairs.slice(1,3).flatMap(p=>p.domains);
    expect(distinct.some(d=>d.difference!=='unchanged')).toBe(true);
    expect(result.pairs[3]?.domains.every(d=>
      d.difference==='coverage_changed'||
      d.difference==='insufficient_research_evidence')).toBe(true);
    expect(result.independentHumanMeaningValidated).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.usefulComplete).toBe(false);
  });

  it('rejects tampered Korean copy, duplicated cases, and attempts to diversify one chart',()=>{
    const a=caseFor('a',{year:2024,month:3,day:10},{known:true,hour:12,minute:30});
    const b=caseFor('b',{year:1996,month:1,day:9},{known:true,hour:19,minute:30});
    const first=a.reading.firstScreen.sections.find(s=>s.visibleClaims.length>0);
    expect(first).toBeDefined();
    if(!first)return;
    const altered={...a, reading:{...a.reading,
      firstScreen:{...a.reading.firstScreen,sections:a.reading.firstScreen.sections.map(
        section=>section.domain!==first.domain?section:{...section,
          visibleClaims:section.visibleClaims.map((claim,i)=>i===0?
            {...claim,summary:'새로 날조한 개인의 운세'}:claim),
        },
      )},
    }};
    expect(()=>auditNatalN34FourDomainCopyContrasts([altered],[]))
      .toThrow(/fingerprint changed/u);
    expect(()=>auditNatalN34FourDomainCopyContrasts([a,a],[]))
      .toThrow(/duplicate case/u);
    // Valid receipts from a different chart may not be relabeled as this chart.
    const disguised={...b,reading:{...b.reading,
      snapshotId:a.reading.snapshotId,calculationHash:a.reading.calculationHash,
      firstScreen:{...b.reading.firstScreen,
        snapshotId:a.reading.snapshotId,calculationHash:a.reading.calculationHash}}};
    const distinct=auditNatalN34FourDomainCopyContrasts([a,b],[{left:'a',right:'b'}]);
    if(distinct.pairs[0]?.domains.some(d=>d.difference!=='unchanged'&&
      d.difference!=='insufficient_research_evidence')){
      expect(()=>auditNatalN34FourDomainCopyContrasts(
        [a,disguised],[{left:'a',right:'b'}])).toThrow(/falsely diversified/u);
    }
  });
});
