import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  WEALTH_MULTIFACTOR_PACK,
  WEALTH_MULTIFACTOR_RULES,
  createWealthMultifactorResearchRegistry,
} from '../src/research/wealth-natal-multifactor-candidate.js';
import {
  buildWealthMultifactorResearchReport,
  renderWealthMultifactorResearchHtml,
} from '../src/preview/wealth-natal-multifactor-report.js';

const NOW=new Date('2026-10-19T00:00:00.000Z');
const registry=createWealthMultifactorResearchRegistry(NOW.toISOString());
function sample(month:number,day:number,hour:number|null=12) {
  return calculateCanonicalSajuSnapshot({
    calendarType:'solar',date:{year:2024,month,day},
    time:hour===null?{known:false} as const:{known:true,hour,minute:0} as const,
    sexForTraditionalCalculation:'unspecified',
  },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now:NOW});
}
function realReport(month:number,day:number,hour:number|null=12) {
  const snapshot=sample(month,day,hour);
  const execution=runInterpretation(snapshot,registry,{now:NOW});
  const report=buildWealthMultifactorResearchReport(snapshot,execution,registry);
  return {snapshot,execution,report};
}
describe('Wealth actual two-T5 source-bounded Korean natal research reading',()=>{
  it('isolates existing legacy single-family Wealth rules and never adds public authority',()=>{
    expect(WEALTH_MULTIFACTOR_PACK.status).toBe('research');
    expect(WEALTH_MULTIFACTOR_RULES).toHaveLength(6);
    expect(registry.rules.filter(r=>r.taxonomy.tier==='T8')).toHaveLength(6);
    expect(registry.rules.filter(r=>r.taxonomy.tier==='T5')).toHaveLength(10);
    expect(WEALTH_MULTIFACTOR_RULES.every(r=>r.status==='research'&&
      r.inputs.length===2&&r.inputs.every(i=>i.required&&
        i.source==='interpretation_claim'&&i.cardinality==='exactly_one'))).toBe(true);
  });
  it('generates different original Korean meanings for two genuinely different Canonical charts',()=>{
    const results=[];
    for(const month of [2,3,4,5,6,7])for(const day of [3,7,11,17,23]){
      const result=realReport(month,day);
      if(result.report.sections.length>0)results.push(result);
    }
    const a=results[0];
    const b=results.find(x=>x.report.sections.map(s=>s.pattern).join('|')!==
      a?.report.sections.map(s=>s.pattern).join('|')&&
      x.snapshot.calculationHash!==a?.snapshot.calculationHash);
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    if(!a||!b)return;
    expect(a.report.sections.map(s=>s.headline)).not.toEqual(
      b.report.sections.map(s=>s.headline));
    for(const item of [a,b]){
      expect(item.report.researchOnly).toBe(true);
      expect(item.report.mayPublish).toBe(false);
      expect(item.report.maySell).toBe(false);
      expect(item.report.usefulComplete).toBe(false);
      for(const section of item.report.sections){
        expect(section.upstreamClaimIds).toHaveLength(2);
        expect(section.sourceIds).toHaveLength(2);
        expect(section.observedFactPaths.length).toBeGreaterThanOrEqual(2);
        expect(section.observedPositions.length).toBe(section.observedFactPaths.length);
        expect(section.observedPositions.every(p=>section.paragraph.includes(p))).toBe(true);
      }
      const html=renderWealthMultifactorResearchHtml(item.report);
      expect(html).toContain('<html lang="ko">');
      expect(html).toContain('실제 십신 위치·Claim·출처');
      expect(html).toContain(item.report.sections[0]!.headline);
    }
    expect(realReport(3,10).report).toEqual(realReport(3,10).report);
  },30000);
  it('returns partial or insufficient rather than calling any one short claim complete',()=>{
    for(const [m,d] of [[3,10],[4,11],[5,7]] as const){
      const result=realReport(m,d);
      if(result.report.state==='complete'){
        expect(result.report.sections).toHaveLength(3);
        expect(result.report.sections[0]!.axis).toBe('core');
        expect(result.report.sections[0]!.channel).toBe('visible_stems');
        expect(new Set(result.report.sections.map(s=>s.axis)).size).toBe(3);
      }else{
        expect(result.report.state).toMatch(/partial|insufficient/u);
        expect(result.report.missing.length).toBeGreaterThan(0);
      }
    }
  },15000);
  it('does not fabricate known four-pillar wealth from unknown birth hour',()=>{
    const report=realReport(3,10,null).report;
    expect(report.state).toBe('insufficient');
    expect(report.sections).toHaveLength(0);
    expect(report.missing.join(' ')).toContain('출생시각 미상');
  });
  it('rejects forged composite meaning and substituted T5 family',()=>{
    const item=[realReport(3,10),realReport(4,11),realReport(5,7)]
      .find(x=>x.execution.claims.some(c=>c.claimType.startsWith('WEALTH_NATAL_MULTIFACTOR_')));
    expect(item).toBeDefined();
    if(!item)return;
    const composite=item.execution.claims.find(c=>
      c.claimType.startsWith('WEALTH_NATAL_MULTIFACTOR_'))!;
    const forged={...item.execution,claims:item.execution.claims.map(c=>
      c.claimId===composite.claimId?{...c,value:{...c.value as Record<string,unknown>,pattern:'NEW_OUTCOME'}}:c)};
    expect(()=>buildWealthMultifactorResearchReport(item.snapshot,forged,registry))
      .toThrow(/original source T8 value/u);
    const wrongUpstream=item.execution.claims.find(c=>
      c.taxonomy.tier==='T5'&&
      !composite.upstreamClaimRefs.includes(c.claimId));
    expect(wrongUpstream).toBeDefined();
    if(!wrongUpstream)return;
    const badRefs={...item.execution,claims:item.execution.claims.map(c=>
      c.claimId===composite.claimId?{
        ...c,upstreamClaimRefs:[wrongUpstream.claimId,composite.upstreamClaimRefs[1]!],
      }:c)};
    expect(()=>buildWealthMultifactorResearchReport(item.snapshot,badRefs,registry))
      .toThrow(/two T5 types/u);
    const other=sample(4,15);
    expect(()=>buildWealthMultifactorResearchReport(other,item.execution,registry))
      .toThrow(/wrong Canonical chart/u);
  });
});
