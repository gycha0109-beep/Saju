import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNatalN29RealReaderPairPacket, renderNatalN29ReaderPacketMarkdown,
} from '../scripts/natal-n29-paired-reader-review.mjs';
const ids = [
  ['1984-01-07-00:30','1984-01-07-12:30','DISTINCT_RESEARCH_CLAIMS_SHARE_CANONICAL_COPY'],
  ['1992-01-12-00:30','1992-01-12-19:30','SAME_MATCHED_RULES_DIFFERENT_DISPLAYED_CHART'],
  ['1996-01-09-05:30','1996-01-09-12:30','DISTINCT_RESEARCH_CLAIMS_DISTINCT_COPY_SAME_CONSUMER'],
  ['2010-02-03-05:30','2010-02-03-19:30','DISTINCT_RESEARCH_CLAIMS_SHARE_CANONICAL_COPY'],
  ['2024-03-10-00:30','2024-03-10-19:30','CHANGED_RESEARCH_THEME_PRESENCE_SAME_CONSUMER'],
].map(([a,b,stage])=>['solar-'+a,'solar-'+b,stage]);
const assertThrows=(fn)=>assert.throws(fn,/N29 fail-closed:/);
function fixture(){
  const cases=ids.flatMap(([left,right],index)=>
    [left,right].map((caseId,idx)=>({
      caseId,birthLabel:caseId,responseState:'delivered',
      factFingerprint:'fact-'+index+'-'+idx,
      pillarValues:['hour:'+index+'-'+idx],
      interpretationParagraphs:[
        'source-owned interpretation',
        '이 사주풀이가 실제로 참조한 명식은 실제 계산 문단',
        '계산에서 확인한 십신 위치: 실제 십신 관측',
      ],
    })));
  for(const caseId of ['unknown-time-1992-01-12','unknown-time-2024-03-10']){
    cases.push({caseId,responseState:'partial_evidence',interpretationParagraphs:[]});
  }
  while(cases.length<35){
    cases.push({caseId:'control-'+cases.length,responseState:'delivered',
      interpretationParagraphs:['other source-owned interpretation'],factFingerprint:'extra-'+cases.length});
  }
  const findings=ids.map(([left,right,stageFinding])=>({
    left,right,stageFinding,category:'changed_family_or_mixture',
    semanticErrorProven:false,researchOrBridgeReviewRequired:true,
    exclusiveThemeClaimTypesLeft:[],exclusiveThemeClaimTypesRight:[],
  }));
  while(findings.length<19){
    findings.push({left:'dummy-'+findings.length,right:'dummy',semanticErrorProven:false,
      researchOrBridgeReviewRequired:true});
  }
  const n26cases=cases.filter(x=>x.responseState==='delivered').map(x=>({
    caseId:x.caseId,exactAfterPermittedN9Compaction:true,readingIdentityAssertedSame:false,
  }));
  return {
    baseline:{version:'saju-natal-personalization-baseline-n0-v1',
      numberOfCases:35,mayPublish:false,maySell:false,cases},
    n25b:{uniqueChartPairCount:19,findings,meaningDifferentiationProven:false,
      mayApproveResearchMeaning:false},
    n26:{originalHttpCaseCount:35,eligibleDeliveredCaseCount:33,
      exactPreservedCases:33,mismatchCases:[],cases:n26cases,mayPublish:false},
  };
}
describe('N29 real source-copy pair reader-review gate',()=>{
  it('prepares five actual-shaped contrasts / 10 distinct input charts, never forges human review',()=>{
    const x=fixture(),a=buildNatalN29RealReaderPairPacket(x.baseline,x.n25b,x.n26);
    assert.equal(a.pairedContrasts,5);
    assert.equal(a.deliveredDistinctCaseCount,10);
    assert.equal(a.exactSameMeaningContrasts,5);
    assert.equal(a.independentHumanReviewsCompleted,0);
    assert.equal(a.reviewerAttestationRecorded,false);
    assert.equal(a.productReady,false);
    assert.equal(a.mayApproveResearchMeaning,false);
    assert.match(renderNatalN29ReaderPacketMarkdown(a),/사람 검수 미완료/u);
  });
  it('fails if distinct consumer meaning appears; never forces equal copy',()=>{
    const x=fixture();
    x.baseline.cases.find(c=>c.caseId===ids[2][1]).interpretationParagraphs[0]='new invented fortune';
    assertThrows(()=>buildNatalN29RealReaderPairPacket(x.baseline,x.n25b,x.n26));
  });
  it('fails if a pair or actual chart identity or transport proof disappears',()=>{
    const a=fixture(); a.n25b.findings.splice(0,1);
    assertThrows(()=>buildNatalN29RealReaderPairPacket(a.baseline,a.n25b,a.n26));
    const b=fixture();b.baseline.cases.find(c=>c.caseId===ids[0][1]).factFingerprint='fact-0-0';
    assertThrows(()=>buildNatalN29RealReaderPairPacket(b.baseline,b.n25b,b.n26));
    const c=fixture();c.n26.exactPreservedCases=32;
    assertThrows(()=>buildNatalN29RealReaderPairPacket(c.baseline,c.n25b,c.n26));
    const d=fixture();d.baseline.cases.find(c=>c.caseId==='unknown-time-2024-03-10').responseState='delivered';
    assertThrows(()=>buildNatalN29RealReaderPairPacket(d.baseline,d.n25b,d.n26));
  });
});
