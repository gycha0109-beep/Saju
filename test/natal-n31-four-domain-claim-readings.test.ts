import {describe,expect,it} from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { createBusinessNatalReadingCandidateRegistry } from
  '../src/research/business-natal-reading-candidate.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalN31FourDomainClaimReadings } from
  '../src/preview/natal-n31-four-domain-claim-readings.js';

const NOW=new Date('2026-10-18T00:00:00.000Z');
function fixture(date:{year:number;month:number;day:number},known=true){
  const snapshot=calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType:'solar',date,
    time:known?{known:true,hour:12,minute:0}:{known:false},
    sexForTraditionalCalculation:'unspecified',
  },{now:NOW}).snapshot;
  const registry=createBusinessNatalReadingCandidateRegistry(NOW.toISOString());
  const interpretation=runInterpretation(snapshot,registry,{requestId:'n31-test',now:NOW});
  return {snapshot,registry,interpretation};
}
describe('N31 existing-domain meaning and exact Canonical position receipt',()=>{
  it('emits actual subtype/family-specific specialist T8 copy with existing source receipts',()=>{
    const {snapshot,registry,interpretation}=fixture({year:2024,month:3,day:10});
    const result=buildNatalN31FourDomainClaimReadings(snapshot,interpretation,registry);
    expect(result.sections.map(s=>s.domain)).toEqual(['career','wealth','business','relationship']);
    expect(result.domainCountWithOriginalResearchInterpretation).toBeGreaterThan(0);
    for(const section of result.sections){
      expect(section.visibleClaims.length).toBeLessThanOrEqual(3);
      for(const claim of section.visibleClaims){
        const original=interpretation.claims.find(c=>c.claimId===claim.claimId);
        expect(original?.claimType).toBe(claim.claimType);
        expect(original?.taxonomy.category).toBe(section.domain);
        expect(claim.summary.length).toBeGreaterThan(15);
        expect(claim.calculatedPositions.length).toBeGreaterThan(0);
        expect(claim.sourceIds.length).toBeGreaterThan(0);
        expect(claim.researchOnly).toBe(true);
        expect(claim.predictsOutcome).toBe(false);
      }
    }
    expect(result.mayPublish).toBe(false);
    expect(result.usefulComplete).toBe(false);
    expect(result.newSemanticRulesAdded).toBe(false);
  });
  it('preserves unknown-birth-time HOLD without fabricated domain claims',()=>{
    const {snapshot,registry,interpretation}=fixture({year:2024,month:3,day:10},false);
    const result=buildNatalN31FourDomainClaimReadings(snapshot,interpretation,registry);
    expect(result.sections.every(s=>
      s.state==='birth_time_unknown'&&s.visibleClaims.length===0)).toBe(true);
  });
  it('rejects another chart and a fabricated T8 claim semantic text',()=>{
    const {snapshot,registry,interpretation}=fixture({year:2024,month:3,day:10});
    expect(()=>buildNatalN31FourDomainClaimReadings(
      {...snapshot,snapshotId:'another-person'},interpretation,registry,
    )).toThrow(/same-chart/u);
    const target=interpretation.claims.find(c=>c.state==='active'&&
      ['career','wealth','business','relationship'].includes(c.taxonomy.category) &&
      c.taxonomy.tier==='T8' &&
      ['career_conclusion','career_context','wealth_conclusion','business_conclusion','relationship_conclusion'].includes(c.predicate));
    expect(target).toBeDefined();
    if(!target)return;
    const index=interpretation.claims.indexOf(target);
    const manipulated={
      ...interpretation,
      claims:interpretation.claims.map((c,i)=>i===index?{
        ...c,value:{fabricated:'no real rule source'},}:c),
    };
    expect(()=>buildNatalN31FourDomainClaimReadings(snapshot,manipulated,registry))
      .toThrow(/byte-equivalent/u);
  });
  it('rejects cross-chart Claims, stale registries and unmatched evaluations instead of borrowing plausible Korean copy',()=>{
    const {snapshot,registry,interpretation}=fixture({year:2024,month:3,day:10});
    const result=buildNatalN31FourDomainClaimReadings(snapshot,interpretation,registry);
    const displayed=result.sections.flatMap(section=>[
      ...section.visibleClaims,...section.additionalVerifiedClaims,
    ]);
    expect(displayed.length).toBeGreaterThan(0);
    for(const item of displayed){
      expect(item.calculatedFactPaths).toHaveLength(item.calculatedPositions.length);
      expect(item.calculatedFactPaths.length).toBeGreaterThan(0);
      expect(item.calculatedFactPaths.every(path=>
        /^derivedFacts\\.tenGods\\.value\\.(year|month|day|hour)\\.(stem|branch)\\.value$/u
          .test(path))).toBe(true);
      expect(item.claimRuleVersion).toBeTruthy();
      expect(item.methodologyVersion).toBeTruthy();
      expect(item.profileVersion).toBeTruthy();
    }
    const source=interpretation.claims.find(c=>displayed.some(d=>d.claimId===c.claimId));
    expect(source).toBeDefined();
    if(!source)return;
    const corruptClaim={...interpretation,claims:interpretation.claims.map(c=>
      c.claimId===source.claimId?{...c,snapshotId:'different-chart'}:c)};
    expect(()=>buildNatalN31FourDomainClaimReadings(
      snapshot,corruptClaim,registry)).toThrow(/cross-chart/u);
    const unmatched={...interpretation,evaluations:interpretation.evaluations.map(e=>
      e.evaluationId===source.ruleRefs[0]?.evaluationId?
        {...e,status:'not_matched' as const,emittedClaimIds:[]}:e)};
    expect(()=>buildNatalN31FourDomainClaimReadings(
      snapshot,unmatched,registry)).toThrow(/matching rule evaluation/u);
    expect(()=>buildNatalN31FourDomainClaimReadings(snapshot,{
      ...interpretation,run:{...interpretation.run,snapshotHash:'another-calculation'},
    },registry)).toThrow(/same-chart and registry/u);
    expect(()=>buildNatalN31FourDomainClaimReadings(snapshot,{
      ...interpretation,run:{...interpretation.run,registrySnapshotId:'stale-registry'},
    },registry)).toThrow(/same-chart and registry/u);
  });

});
