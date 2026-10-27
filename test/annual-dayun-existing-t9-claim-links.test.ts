import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from
  '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildAnnualDayunExistingT9ClaimLinks } from
  '../src/preview/annual-dayun-existing-t9-claim-links.js';
import { buildTemporalResearchMenuReadings } from
  '../src/preview/temporal-research-menu-reading.js';

const REFERENCE='2026-10-25T00:00:00.000Z';
const birth=(year:number,month:number,day:number,hour:number,minute:number,sex:'male'|'female'='male'):BirthInput=>({
  calendarType:'solar', date:{year,month,day},
  time:{known:true,hour,minute},sexForTraditionalCalculation:sex,
});
const report=(b:BirthInput)=>buildAnnualMonthlyBirthResearchReading(b,{
  requestId:'R153-R154-existing-t9-exact-evidence',
  targetYear:2026,targetMonth:10,referenceDateTime:REFERENCE,
}).report;

describe('R153 R154 annual/Dayun structural prerequisites for existing monthly T9 Claims',()=>{
  it('links only registered T9 themes at exact Jeol and Dayun intervals, without new Claims',()=>{
    const reading=report(birth(1998,3,28,22,19));
    const links=reading.t9EvidenceLinks;
    expect(links.snapshotId).toBe(reading.snapshotId);
    expect(links.calculationHash).toBe(reading.calculationHash);
    expect(links.researchOnly).toBe(true);
    expect(links.scope).toBe('existing_monthly_t9_claim_evidence_link_only');
    expect(links.interpretationClaimEmissionAuthorized).toBe(false);
    expect(links.sourceQualifiedCrossLayerMeaningEstablished).toBe(false);
    expect(links.mayPublish).toBe(false);
    expect(links.maySell).toBe(false);
    expect(links.existingT9ClaimLinks).toHaveLength(reading.conditionalComposition.slices.length);
    for(let i=0;i<links.existingT9ClaimLinks.length;i++){
      const item=links.existingT9ClaimLinks[i]!;
      const slice=reading.conditionalComposition.slices[i]!;
      const exact=reading.monthly.sections.filter(s=>
        s.kind==='theme' && s.segmentId===slice.segmentId &&
        Date.parse(s.calculatedInterval.startsAt)<=Date.parse(slice.startsAt) &&
        Date.parse(slice.endsAtExclusive)<=Date.parse(s.calculatedInterval.endsAt));
      expect(exact).toHaveLength(1);
      expect(item.existingT9ClaimId).toBe(exact[0]?.claimId);
      expect(item.existingT9MethodologyId).toBe(exact[0]?.methodologyId);
      expect(item.existingT9RuleIds).toEqual(exact[0]?.ruleIds);
      expect(item.existingT9SourceIds).toEqual(exact[0]?.sourceIds);
      expect(item.startsAt).toBe(slice.startsAt);
      expect(item.endsAtExclusive).toBe(slice.endsAtExclusive);
      expect(item.sourceMethodPrerequisites).toHaveLength(4);
      expect(item.newlyEmittedT9Claims).toBe(0);
      expect(item.compositionMeaningState).toBe('not_admitted');
      expect(item.rankOrOutcomeEstablished).toBe(false);
      expect(item.koreanExplanation).toContain('새로운 T9 풀이를 만들지 않습니다');
    }
    const projected=buildTemporalResearchMenuReadings({annualMonthly:reading});
    expect(projected[0]?.t9EvidenceLinks).toBeUndefined();
    expect(projected[1]?.t9EvidenceLinks).toEqual(links);
    expect(projected[2]?.t9EvidenceLinks).toBeUndefined();
  });

  it('distinguishes actually matched annual-Dayun clash and six-combination from absent relation',()=>{
    // Real matching pair for 2026 annual 午: 子 clashes, 未 combines.
    const b1=birth(1998,3,28,22,19);
    const b2=birth(1970,12,31,6,32);
    const candidates=[
      report({...b1,sexForTraditionalCalculation:'male'}),
      report({...b1,sexForTraditionalCalculation:'female'}),
      report({...b2,sexForTraditionalCalculation:'male'}),
      report({...b2,sexForTraditionalCalculation:'female'}),
    ];
    const states=new Set(candidates.flatMap(x=>x.t9EvidenceLinks.existingT9ClaimLinks.map(
      y=>y.annualDayunRelation)));
    expect(states.has('branch_clash_observed')).toBe(true);
    expect(states.has('branch_six_combination_observed')).toBe(true);
    expect(states.has('no_clash_or_six_combination_observed')).toBe(true);
    for(const x of candidates)for(const link of x.t9EvidenceLinks.existingT9ClaimLinks) {
      expect(link.compositionMeaningState).toBe('not_admitted');
      expect(link.newlyEmittedT9Claims).toBe(0);
    }
  });

  it('fails closed when original T9 fact paths are replaced or exact period is forged',()=>{
    const current=report(birth(1998,3,28,22,19));
    const modified={
      ...current,
      monthly:{
        ...current.monthly,
        sections:current.monthly.sections.map(s=>s.kind==='theme'
          ?{...s,factPaths:['forged.path']}
          :s),
      },
    };
    expect(()=>buildAnnualDayunExistingT9ClaimLinks(modified))
      .toThrow('Existing T9 Claim source and exact Jeol evidence');
    const altered={
      ...current,
      conditionalComposition:{
        ...current.conditionalComposition,
        targetMonth:11,
      },
    };
    expect(()=>buildAnnualDayunExistingT9ClaimLinks(altered))
      .toThrow('cannot cross source or chart authority');
  });

  it('keeps missing birth time and Daeyun missing, without making an annual result',()=>{
    const noTime=report({...birth(1998,3,28,22,19),time:{known:false}});
    expect(noTime.t9EvidenceLinks.existingT9ClaimLinks.length).toBeGreaterThanOrEqual(2);
    for(const link of noTime.t9EvidenceLinks.existingT9ClaimLinks){
      expect(link.annualDayunRelation).toBe('dayun_unavailable');
      expect(link.observationStatus).toBe('incomplete');
      expect(link.compositionMeaningState).toBe('not_admitted');
    }
  });

  it('renders the exact existing T9 Claim link in Korean without inventing outcomes',()=>{
    const reading=buildAnnualMonthlyBirthResearchReading(birth(1998,3,28,22,19),{
      requestId:'R153-R154-korean-evidence',targetYear:2026,targetMonth:10,
      referenceDateTime:REFERENCE,
    });
    expect(reading.report.t9EvidenceLinks.existingT9ClaimLinks).toHaveLength(2);
    for(const link of reading.report.t9EvidenceLinks.existingT9ClaimLinks){
      expect(reading.html).toContain(link.koreanExplanation);
      expect(reading.html).toContain(link.existingT9ClaimId!);
      expect(link.koreanExplanation).toContain('우세·길흉·사건을 판단하지 않습니다');
    }
    expect(reading.report.mayPublish).toBe(false);
  });

  it('prevents fabricated T9 promotion and mismatched claim ID on the research menu boundary',()=>{
    const current=report(birth(1998,3,28,22,19));
    expect(()=>buildTemporalResearchMenuReadings({
      annualMonthly:{
        ...current,
        t9EvidenceLinks:{
          ...current.t9EvidenceLinks,
          interpretationClaimEmissionAuthorized:true as never,
        },
      },
    })).toThrow('Temporal menu bridge rejects');
    const forged=current.t9EvidenceLinks.existingT9ClaimLinks.map((s,i)=>
      i===0?{...s,existingT9ClaimId:'fake-T9-claim'}:s);
    expect(()=>buildTemporalResearchMenuReadings({
      annualMonthly:{
        ...current,
        t9EvidenceLinks:{...current.t9EvidenceLinks,existingT9ClaimLinks:forged},
      },
    })).toThrow('Temporal menu bridge rejects');
  });
});
