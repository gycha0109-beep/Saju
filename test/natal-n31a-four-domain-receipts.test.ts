import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import { createRelationshipNatalReadingCandidateRegistry } from '../src/research/relationship-natal-reading-candidate.js';
import { auditNatalN31aFourDomainReceipts } from '../src/preview/natal-n31a-four-domain-receipts.js';
const now=new Date('2026-10-17T00:00:00.000Z');
describe('N31a existing research-only four domain receipts',()=>{
  it('validates own Claim Rule Source and Korean profile without promotion',()=>{
    const snapshot=calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType:'solar',date:{year:1996,month:1,day:9},
      time:{known:true,hour:9,minute:30},sexForTraditionalCalculation:'unspecified',
    }).snapshot;
    const results={
      career:runInterpretation(snapshot,createCareerNatalReadingCandidateRegistry(now.toISOString()),{now}),
      wealth:runInterpretation(snapshot,createWealthNatalReadingCandidateRegistry(now.toISOString()),{now}),
      business:runInterpretation(snapshot,createBusinessNatalReadingCandidateRegistry(now.toISOString()),{now}),
      relationship:runInterpretation(snapshot,createRelationshipNatalReadingCandidateRegistry(now.toISOString()),{now}),
    };
    const report=auditNatalN31aFourDomainReceipts(snapshot,results);
    expect(report.receipts.every(x=>x.sourceIds.length>0 && x.factRefs.length>0 &&
      x.headline.length>0 && x.summary.length>0 && x.researchOnly)).toBe(true);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.usefulComplete).toBe(false);
    expect(report.lifecycle).toBe('internal_research_only');
  });
  it('holds missing independent domain execution instead of inferring from General',()=>{
    const snapshot=calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType:'solar',date:{year:1996,month:1,day:9},
      time:{known:false},sexForTraditionalCalculation:'unspecified',
    }).snapshot;
    const report=auditNatalN31aFourDomainReceipts(snapshot,{});
    expect(report.receipts).toHaveLength(0);
    expect(report.hold).toHaveLength(4);
  });
});
