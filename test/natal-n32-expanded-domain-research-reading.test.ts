import {describe,expect,it} from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { createBusinessNatalReadingCandidateRegistry } from
  '../src/research/business-natal-reading-candidate.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalN32ExpandedDomainResearchReading } from
  '../src/preview/natal-n32-expanded-domain-research-reading.js';

const NOW=new Date('2026-10-18T00:00:00.000Z');
const DATES=[
  {year:2024,month:3,day:10},
  {year:1996,month:1,day:9},
  {year:2001,month:8,day:12},
] as const;
function fixture(date:{year:number;month:number;day:number},known=true){
  const snapshot=calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType:'solar',date,
    time:known?{known:true,hour:12,minute:0}:{known:false},
    sexForTraditionalCalculation:'unspecified',
  },{now:NOW}).snapshot;
  const registry=createBusinessNatalReadingCandidateRegistry(NOW.toISOString());
  const interpretation=runInterpretation(snapshot,registry,{requestId:'n32-test',now:NOW});
  return {snapshot,registry,interpretation};
}
describe('N32 complete already-source-qualified four-domain research-only reading',()=>{
  it('makes every previously hidden authentic specialist Claim accessible without new meanings',()=>{
    let originalAdditionalCount=0;
    for(const date of DATES){
      const {snapshot,registry,interpretation}=fixture(date);
      const expanded=buildNatalN32ExpandedDomainResearchReading(
        snapshot,interpretation,registry);
      expect(expanded.sections.map(s=>s.domain)).toEqual([
        'career','wealth','business','relationship',
      ]);
      expect(expanded.allQualifiedOriginalClaimCount).toBe(
        expanded.initialClaimCount+expanded.expandedOriginalClaimCount);
      expect(expanded.originalQualifiedLeftUnread).toBe(0);
      expect(expanded.firstScreen.sections.every(s=>s.visibleClaims.length<=3)).toBe(true);
      expect(expanded.mayPublish).toBe(false);
      expect(expanded.maySell).toBe(false);
      expect(expanded.usefulComplete).toBe(false);
      expect(expanded.createsNewMeaning).toBe(false);
      originalAdditionalCount+=expanded.expandedOriginalClaimCount;
      for(const section of expanded.sections){
        const first=expanded.firstScreen.sections.find(s=>s.domain===section.domain);
        expect(first).toBeDefined();
        expect(first?.additionalVerifiedClaims).toEqual(section.additionalVerifiedClaims);
        for(const c of section.additionalVerifiedClaims){
          const original=interpretation.claims.find(cl=>cl.claimId===c.claimId);
          expect(original?.claimType).toBe(c.claimType);
          expect(original?.taxonomy.category).toBe(section.domain);
          expect(c.sourceIds.length).toBeGreaterThan(0);
          expect(c.calculatedPositions.length).toBeGreaterThan(0);
          expect(c.calculatedFactPaths).toHaveLength(c.calculatedPositions.length);
          expect(c.claimRuleVersion).toBeTruthy();
          expect(c.methodologyVersion).toBeTruthy();
          expect(c.profileVersion).toBeTruthy();
          expect(c.predictsOutcome).toBe(false);
        }
      }
    }
    expect(originalAdditionalCount).toBeGreaterThan(0);
  });
  it('keeps unknown birth time strictly on HOLD',()=>{
    const {snapshot,registry,interpretation}=fixture(DATES[0],false);
    const result=buildNatalN32ExpandedDomainResearchReading(
      snapshot,interpretation,registry);
    expect(result.initialClaimCount).toBe(0);
    expect(result.expandedOriginalClaimCount).toBe(0);
    expect(result.sections.every(s=>s.totalQualifiedOriginalCount===0)).toBe(true);
  });
  it('does not cross chart identity or accept fabricated source-owned Claim text',()=>{
    const {snapshot,registry,interpretation}=fixture(DATES[0]);
    expect(()=>buildNatalN32ExpandedDomainResearchReading(
      {...snapshot,snapshotId:'other-person'},interpretation,registry,
    )).toThrow(/same-chart/u);
    const source=interpretation.claims.find(c=>c.state==='active'&&
      ['career','wealth','business','relationship'].includes(c.taxonomy.category)&&
      c.taxonomy.tier==='T8');
    expect(source).toBeDefined();
    if(!source)return;
    const tampered={...interpretation,claims:interpretation.claims.map(c=>
      c.claimId===source.claimId?{...c,value:{invented:true}}:c)};
    expect(()=>buildNatalN32ExpandedDomainResearchReading(
      snapshot,tampered,registry)).toThrow(/byte-equivalent/u);
  });
  it('requires every displayed channel for a multi-family channel-sensitive business claim to witness all families',()=>{
    const families:Record<string,readonly string[]>={
      peer:['비견','겁재'],resource:['편인','정인'],output:['식신','상관'],
      wealth:['편재','정재'],officer:['편관','정관'],
    };
    let inspected=0;
    for(const date of DATES){
      const {snapshot,registry,interpretation}=fixture(date);
      const result=buildNatalN32ExpandedDomainResearchReading(
        snapshot,interpretation,registry);
      const all=result.firstScreen.sections.flatMap(s=>
        [...s.visibleClaims,...s.additionalVerifiedClaims]);
      for(const displayed of all){
        if(!displayed.claimRuleId.startsWith('RULE-CHANNEL-SENSITIVE-'))continue;
        const source=interpretation.claims.find(x=>x.claimId===displayed.claimId);
        if(!source||source.value===null||typeof source.value!=='object'||
           !('families' in source.value))continue;
        const requested=source.value.families;
        if(!Array.isArray(requested)||requested.length<2)continue;
        inspected++;
        for(const channel of ['천간','지지 대표 십신'] as const){
          const words=displayed.calculatedPositions.filter(p=>p.includes(channel));
          if(words.length===0)continue;
          expect(requested.every(f=>families[f as string]?.some(g=>
            words.some(p=>p.endsWith(' '+g))))).toBe(true);
        }
      }
    }
    expect(inspected).toBeGreaterThan(0);
  });
  it('repeats the same chart deterministically but preserves meaningful source/position contrasts across different charts',()=>{
    const results=DATES.map(date=>{
      const {snapshot,registry,interpretation}=fixture(date);
      return buildNatalN32ExpandedDomainResearchReading(snapshot,interpretation,registry);
    });
    const repeat=fixture(DATES[0]);
    const repeated=buildNatalN32ExpandedDomainResearchReading(
      repeat.snapshot,repeat.interpretation,repeat.registry);
    expect(results[0]?.originalResearchFingerprint).toBe(repeated.originalResearchFingerprint);
    const signatures=results.map(result=>result.sections.map(section=>{
      const first=result.firstScreen.sections.find(s=>s.domain===section.domain);
      return [section.domain,...[
        ...(first?.visibleClaims??[]),...section.additionalVerifiedClaims,
      ].map(c=>c.claimType+'|'+c.calculatedPositions.join('/')+'|'+
        c.claimRuleId+'@'+c.claimRuleVersion)];
    }));
    expect(new Set(signatures.map(x=>JSON.stringify(x))).size).toBeGreaterThan(1);
    expect(results.every(result=>result.mayPublish===false &&
      result.usefulComplete===false)).toBe(true);
  });

});
