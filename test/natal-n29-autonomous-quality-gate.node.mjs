import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateNatalN29AutonomousQuality } from
  '../scripts/natal-n29-autonomous-quality-gate.mjs';

function fixture() {
  const first = 'solar-2024-03-10-12:30';
  const control = 'same-birth-control-2024-03-10-12:30';
  const unique = [first, ...Array.from({length:31},(_,i)=>'real-chart-'+i)];
  const caseIds = [...unique,control,'unknown-time-1992-01-12','unknown-time-2024-03-10'];
  const indexes = new Map(unique.map((id,i)=>[id,i]));
  indexes.set(control,0);
  const baseline = [], n27 = [], n27b = [], n28 = [], n26 = [];
  for(const id of caseIds) {
    const index = indexes.get(id);
    const known = index !== undefined;
    const position = '월주 천간 비견 '+index;
    const paragraph = '이 명식에서 확인된 십신 위치는 '+position+'입니다. 전통적 주제는 참고입니다.';
    const claimReceipts = known ? [{
      claimType:'GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME',
      position,sourceIds:['source-v1'],ruleIds:['rule-v1'],
    }] : [];
    baseline.push({caseId:id,responseState:known?'delivered':'partial_evidence'});
    n27.push({
      caseId:id,responseState:known?'delivered':'partial_evidence',
      actualChartHash:known?'chart-'+index:'chart-unknown-'+id,
      birthTimeKnown:known,unchangedReadingId:true,
      selectedParagraphCount:known?2:0,
      selectedParagraphs:known?['N27 source introduction',paragraph]:[],
      selfServiceTextFingerprint:known?'reader-'+index:null,
    });
    n27b.push({
      caseId:id,originalHttpState:known?'delivered':'partial_evidence',
      snapshotHash:known?'chart-'+index:'chart-unknown-'+id,
      chartBoundSourceIntegrity:true,originalCopyPreserved:true,
      noUnqualifiedRendering:true,checkedClaims:known?1:0,
      expectedClaims:known?1:0,claimReceipts,
      receiptHash:known?'receipt-'+index:'receipt-unknown-'+id,
    });
    n28.push({
      caseId:id,delivered:known,timeKnown:known,stableHttpReadingId:true,
      preservedOfficialSections:true,reportBeforeMain:true,
      composed:known,verifiedThemeCount:known?1:0,
      factRows:known?[{value:position}]:[],
      actualPreviewParagraphs:known?['기존 문장',paragraph]:[],
      reportTextHash:known?'report-'+index:null,
    });
    if(known)n26.push({caseId:id,exactAfterPermittedN9Compaction:true,
      readingIdentityAssertedSame:false});
  }
  const pairs=Array.from({length:19},(_,i)=>({left:unique[i],right:unique[i+1]}));
  pairs.push({left:unique[1],right:unique[0]});
  return {
    baseline:{numberOfCases:35,mayPublish:false,cases:baseline},
    n10:{uniqueDisplayedChartPairCount:19,pairs},
    n26:{eligibleDeliveredCaseCount:33,exactPreservedCases:33,
      mismatchCases:[],cases:n26},
    n27:{actualHttpCaseCount:35,generatedKnownTimeCases:33,
      missingTimeCasesWithGeneratedReading:0,cases:n27},
    n27b:{count:35,sourcedKnownTime:33,unknownTimeWithoutFabrication:2,
      chartAndSourceVerified:true,checkedReceipts:33,cases:n27b},
    n28:{actualHttpCaseCount:35,verifiedKnownTimeReports:33,
      unknownTimeReportCount:0,originalOfficialSectionsPreserved:true,
      originalReadingIdentityPreserved:true,readerFirst:true,cases:n28},
  };
}
const fails = f=>assert.throws(f,/N29 autonomous gate fail-closed/u);
describe('N29 bounded autonomous 35-case and 19-pair quality gate',()=>{
  it('accepts exact Claim placements, consumer prose and same-chart control',()=>{
    const outcome=evaluateNatalN29AutonomousQuality(fixture());
    assert.equal(outcome.actualHttpCaseCount,35);
    assert.equal(outcome.verifiedKnownTime,33);
    assert.equal(outcome.safePartialEvidence,2);
    assert.equal(outcome.uniqueChartPairs,19);
    assert.equal(outcome.verifiedClaimReceipts,33);
    assert.equal(outcome.evidenceExplainedDifferenceComparisons,20);
    assert.equal(outcome.empiricalFortuneAccuracyProven,false);
    assert.equal(outcome.usefulComplete,false);
    assert.equal(outcome.maySell,false);
  });
  it('permits the same sourced meaning for different charts when consumed evidence matches',()=>{
    const f=fixture();
    const original=f.n27.cases[0],next=f.n27.cases[1];
    next.selectedParagraphs=[...original.selectedParagraphs];
    next.selfServiceTextFingerprint=original.selfServiceTextFingerprint;
    f.n27b.cases[1].claimReceipts=JSON.parse(JSON.stringify(f.n27b.cases[0].claimReceipts));
    f.n28.cases[1].factRows=JSON.parse(JSON.stringify(f.n28.cases[0].factRows));
    f.n28.cases[1].actualPreviewParagraphs=[...f.n28.cases[0].actualPreviewParagraphs];
    f.n28.cases[1].reportTextHash=f.n28.cases[0].reportTextHash;
    const result=evaluateNatalN29AutonomousQuality(f);
    assert.equal(result.legitimatelyEqualSourceComparisons,2);
    assert.equal(result.evidenceExplainedDifferenceComparisons,18);
  });
  it('blocks spurious variation for exactly the same birth input',()=>{
    const f=fixture();
    f.n28.cases.find(c=>c.caseId.startsWith('same-birth-control')).reportTextHash='unproven-variation';
    fails(()=>evaluateNatalN29AutonomousQuality(f));
  });
  it('blocks wrong Ten-God placement and substituted consumer interpretation',()=>{
    const f=fixture();
    f.n28.cases[0].factRows[0].value='시주 천간 정관';
    fails(()=>evaluateNatalN29AutonomousQuality(f));
    const g=fixture();
    g.n28.cases[0].actualPreviewParagraphs[1]='반드시 부자가 됩니다';
    fails(()=>evaluateNatalN29AutonomousQuality(g));
  });
  it('blocks missing source provenance or fabricated birth hour',()=>{
    const f=fixture();f.n27b.cases[1].claimReceipts[0].sourceIds=[];
    fails(()=>evaluateNatalN29AutonomousQuality(f));
    const g=fixture();
    g.n28.cases.find(c=>c.caseId==='unknown-time-1992-01-12').composed=true;
    fails(()=>evaluateNatalN29AutonomousQuality(g));
  });
  it('blocks lost HTTP meaning parity and invented 19-pair difference',()=>{
    const f=fixture();f.n26.cases[0].exactAfterPermittedN9Compaction=false;
    fails(()=>evaluateNatalN29AutonomousQuality(f));
    const g=fixture();g.n28.cases[1].reportTextHash=g.n28.cases[0].reportTextHash;
    fails(()=>evaluateNatalN29AutonomousQuality(g));
  });
});
