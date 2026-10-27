import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  isStructuralBranchClash, isStructuralBranchSixCombination,
} from '../src/calculation/structural-relations.js';
import type { BirthInput } from '../src/contracts/calculation.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildAnnualInterpretationFacts } from '../src/reading/annual-interpretation-facts.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { resolveDayunTemporalContext } from '../src/reading/dayun-temporal-context.js';
import { buildTemporalCompositionConditionalContext } from
  '../src/preview/temporal-composition-conditional-context.js';

const REF='2026-10-25T00:00:00.000Z';
const BIRTH:BirthInput={
  calendarType:'solar',date:{year:1996,month:1,day:9},
  time:{known:true,hour:9,minute:30},sexForTraditionalCalculation:'male',
};
function run(birth:BirthInput=BIRTH,year=2026,month=10) {
  const snapshot=calculateCanonicalSajuSnapshot(
    birth,PRODUCTION_DEFAULT_CALCULATION_POLICY,{now:new Date(REF)});
  const annualRequest={
    requestId:'conditional-year',intent:{domain:'general' as const,temporalScope:'annual' as const},
    targetPeriod:{scope:'annual' as const,year,timeZone:'Asia/Seoul' as const,
      referenceDateTime:REF,resolution:'relative_current' as const},
  };
  const monthlyRequest={
    requestId:'conditional-month',intent:{domain:'general' as const,temporalScope:'monthly' as const},
    targetPeriod:{scope:'monthly' as const,year,month,timeZone:'Asia/Seoul' as const,
      referenceDateTime:REF,resolution:'relative_current' as const},
  };
  const ac=buildTemporalReadingContext(annualRequest);
  const mc=buildTemporalReadingContext(monthlyRequest);
  if(ac?.scope!=='annual'||mc?.scope!=='monthly')throw new Error('invalid temporal context');
  const annual=buildAnnualInterpretationFacts(snapshot,ac);
  const monthly=buildMonthlyInterpretationFacts(snapshot,mc);
  const result=buildTemporalCompositionConditionalContext(snapshot,annual,monthly);
  return {snapshot,annual,monthly,result};
}
describe('research-only conditional natal, Dayun, annual, monthly relationship context',()=>{
  it('identifies only actual source-listed relations with accurate Jeol and selected intervals',()=>{
    const {snapshot,monthly,result}=run();
    expect(result.snapshotId).toBe(snapshot.snapshotId);
    expect(result.calculationHash).toBe(snapshot.calculationHash);
    expect(result.targetYear).toBe(2026);
    expect(result.annualCalendarPolicy).toBe('civil_year_only');
    expect(result.jeolAt).toBe(monthly.jeolBoundary.at);
    expect(result.slices.length).toBeGreaterThanOrEqual(2);
    expect(result.slices[0]!.startsAt).toBe(monthly.segments[0].startsAt);
    expect(result.slices.at(-1)!.endsAtExclusive).toBe(monthly.segments[1].endsAt);
    for(let i=1;i<result.slices.length;i++){
      expect(result.slices[i]!.startsAt).toBe(result.slices[i-1]!.endsAtExclusive);
    }
    const kinds=new Set(['branch_clash','branch_six_combination']);
    for(const slice of result.slices) {
      expect(Date.parse(slice.startsAt)).toBeLessThan(Date.parse(slice.endsAtExclusive));
      expect(slice.koreanExplanation).toContain('사건을 예측하지 않습니다');
      expect(slice.relations.every(r=>kinds.has(r.kind))).toBe(true);
      for(const relation of slice.relations) {
        const {left,right,kind}=relation;
        expect(relation.structuralMatchOnly).toBe(true);
        expect(relation.transformationEstablished).toBe(false);
        expect(relation.relativeStrengthEstablished).toBe(false);
        expect(relation.eventPredictionAuthorized).toBe(false);
        expect(kind==='branch_clash'
          ? isStructuralBranchClash(left.branch,right.branch)
          : isStructuralBranchSixCombination(left.branch,right.branch)).toBe(true);
      }
    }
    expect(result.interpretationAuthorityGranted).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.source.temporalSemanticClaimAuthorized).toBe(false);
  });
  it('keeps missing natal hour and unavailable Daeyun missing, without predictions',()=>{
    const {result}=run({...BIRTH,time:{known:false}});
    expect(result.slices.length).toBeGreaterThanOrEqual(2);
    for(const slice of result.slices){
      expect(slice.natalUnavailableSlots).toContain('hour');
      expect(slice.dayunStatus).toBe('unavailable');
      expect(slice.dayunBranch).toBeNull();
      expect(slice.relations.some(r=>r.left.layer==='dayun'||r.right.layer==='dayun')).toBe(false);
      expect(slice.koreanExplanation).toContain('미확정');
      expect(slice.koreanExplanation).not.toContain('길한');
    }
  });
  it('follows Daeyun transitions within the year and splits a monthly interval if necessary',()=>{
    // Find the real boundary of this canonical person's computed Dayun.
    let found:ReturnType<typeof run>|undefined;
    for(let year=2018;year<=2040;year++) {
      const context=resolveDayunTemporalContext(run().snapshot,year);
      if(context.status!=='resolved'||context.segments.length<2)continue;
      const calendarMonth=Number(context.segments[1]!.startLocalDateTime.slice(5,7));
      const probe=run(BIRTH,year,calendarMonth);
      if(probe.result.slices.length>2){found=probe;break;}
    }
    expect(found).toBeDefined();
    if(!found)throw new Error('Expected actual canonical Dayun boundary inside a month');
    expect(found.result.slices.length).toBeGreaterThan(2);
    expect(found.result.slices.some(x=>x.dayunStatus==='resolved')).toBe(true);
    const first=found.result.slices[0]!,last=found.result.slices.at(-1)!;
    expect(first.startsAt).toBe(found.monthly.segments[0].startsAt);
    expect(last.endsAtExclusive).toBe(found.monthly.segments[1].endsAt);
    for(let i=1;i<found.result.slices.length;i++){
      expect(found.result.slices[i]!.startsAt).toBe(found.result.slices[i-1]!.endsAtExclusive);
    }
    const context=resolveDayunTemporalContext(found.snapshot,2026);
    expect(context.status).toBe('resolved');
  });
  it('rejects an annual calculation for another year rather than silently mixing periods',()=>{
    const current=run();
    const other=run(BIRTH,2027,10);
    expect(()=>buildTemporalCompositionConditionalContext(
      current.snapshot,other.annual,current.monthly,
    )).toThrow('one exact civil-year');
  });
  it('uses symmetric pairs for six-combinations but never infers transformation',()=>{
    expect(isStructuralBranchSixCombination('자','축')).toBe(true);
    expect(isStructuralBranchSixCombination('축','자')).toBe(true);
    expect(isStructuralBranchSixCombination('자','오')).toBe(false);
    expect(isStructuralBranchClash('자','오')).toBe(true);
  });
});
