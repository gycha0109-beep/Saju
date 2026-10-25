import process from 'node:process';
import { writeFileSync } from 'node:fs';
import { buildWholeChartStructuralResearchResult } from '../dist/preview/whole-chart-structural-research-runtime.js';

const examples = [
  {calendarType:'solar',date:{year:1998,month:3,day:28},time:{known:true,hour:22,minute:19},sexForTraditionalCalculation:'female'},
  {calendarType:'solar',date:{year:1964,month:11,day:14},time:{known:true,hour:14,minute:59},sexForTraditionalCalculation:'male'},
  {calendarType:'solar',date:{year:2001,month:7,day:9},time:{known:true,hour:6,minute:32},sexForTraditionalCalculation:'female'},
];
const results = examples.map((birth,i) => {
  const result = buildWholeChartStructuralResearchResult(birth,{
    requestId:'structural-synthesis-implementation-'+i,
    targetYear:2026,targetMonth:10,
    referenceDateTime:'2026-10-25T00:00:00.000Z',
  });
  return {id:i,hash:result.calculationHash,
    structuralT8:result.natal.structural.sections.length,
    structuralFamilyContexts:result.natal.structural.sections.slice(0,3).map(x=>({
      rule:x.ruleId,month:x.monthRelation,roots:x.intrinsicRootCandidates.length,
      sources:x.sourceIds.length,upstream:x.upstreamClaimIds.length
    })),
    domainLinks:Object.fromEntries(Object.entries(result.natal.domainSharedContexts).map(([k,v])=>[k,v.length])),
    annualLinks:result.annualLinks.length, monthlyLinks:result.monthlyLinks.length,
    dayun:result.dayunStructuralReference.state,
    researchOnly:result.researchOnly,maySell:result.maySell};
});
writeFileSync(process.argv[2] ?? 'saju-shared-structural-sample.json',
  JSON.stringify(results,null,2)+'\n');
process.stdout.write('SAJU_SHARED_STRUCTURAL_SAMPLE '+JSON.stringify(results)+'\n');
