import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const sourceDirectory=process.argv[2] ?? '.';
const menuNames=['general','career','wealth','relationship','business','family','life_stage','annual','monthly','spouse','compatibility','question'];
const offsets=Array.from({length:12},(_,i)=>i*250);
const inputs=offsets.map(start=>{
 const path=resolve(sourceDirectory,'audit-chunk-'+start+'.json');
 const data=JSON.parse(readFileSync(path,'utf8'));
 if(data.startIndex!==start || data.requested!==250 || data.issueCount!==0 || data.uniqueInputCharts!==250)throw Error('Invalid batch '+path);
 return data;
});
const agg={};
for(const name of menuNames){
 const rows=inputs.map(x=>x.menus[name]);
 const unique={paragraphs:new Set(),readings:new Set(),heads:new Set()};
 const states={};
 for(const input of inputs){
  const s=input.menus[name],pool=input.hashPools[name];
  for(const [key,value] of Object.entries(s.states))states[key]=(states[key]??0)+value;
  for(const key of Object.keys(unique))for(const h of pool[key])unique[key].add(h);
 }
 const sum=key=>rows.reduce((total,x)=>total+x[key],0);
 const executed=sum('executed');
 agg[name]={attempted:sum('attempted'),executed,exceptions:sum('exceptions'),
   nonemptyTextCases:sum('meaningBearing'),emptyTextCases:sum('zeroSections'),
   modeCounts:states,meanParagraphs:Math.round(rows.reduce((v,x)=>v+x.meanSections*x.executed,0)/executed*100)/100,
   distinctExactParagraphs:unique.paragraphs.size,
   distinctExactFullTextResults:unique.readings.size,
   distinctHeadlines:unique.heads.size};
 if(agg[name].attempted!==3000||executed!==3000||agg[name].exceptions!==0)throw Error('Incomplete menu '+name);
}
const metrics={};
for(const input of inputs){
 for(const [key,val] of Object.entries(input.metrics)){
  if(typeof val==='number')metrics[key]=(metrics[key]??0)+val;
  else {
   metrics[key]??={};
   for(const [name,inner] of Object.entries(val)){
    if(typeof inner==='number')metrics[key][name]=(metrics[key][name]??0)+inner;
    else{metrics[key][name]??={};for(const [st,count]of Object.entries(inner))metrics[key][name][st]=(metrics[key][name][st]??0)+count;}
   }
  }
 }
}
const report={audit:'saju-3000x12-real-engine-synthetic-combined',revision:'3f079e8d',referenceDateTime:'2026-10-30T03:00:00.000Z',
 sampleSize:3000,distinctSyntheticNatalInputs:3000,menuExecutions:36000,
 extraPairedBirthAndFamilyRuns:6000,chunkCount:12,fullEngineErrors:inputs.reduce((s,x)=>s+x.issueCount,0),
 elapsedComputeSeconds:inputs.reduce((s,x)=>s+x.elapsedSeconds,0),menus:agg,metrics,
 samples:inputs[0].samples,
 evidence:'12 deterministic 250-person batches; subject birth year 1975..2010, solar birth, known time, sex alternates; separate synthetic partner and age-scoped family member for relationship runs; 2026-10-30T03:00Z fixed UTC lookup; only internal research codepaths.',
 limits:['A nonempty paragraph means text is shown, NOT that this menu has authorized meaning.','Exact text variety is not a measure of semantic personalization.','Annual sections are observation/hypothesis; monthly existing source T9 cannot grant new outcome.','Family and compatibility personal observations are not family T8 or pair T10.', 'Question uses ten rotating prompts, five deliberately unsupported.', 'No public product or prediction accuracy assessment.']};
writeFileSync('docs/AUDIT_3000X12_2026-10-30.json',JSON.stringify(report,null,2),'utf8');
const labels={general:'전체 사주',career:'직업·커리어',wealth:'재물',relationship:'연애·관계',business:'사업',family:'가족',life_stage:'삶의 단계',annual:'올해',monthly:'이번 달',spouse:'배우자·관계',compatibility:'궁합',question:'지금 고민으로 보기'};
const outcome= name=> ['general','career','wealth','relationship','business'].includes(name)
 ? ('complete '+(agg[name].modeCounts.complete??0)+' / partial '+(agg[name].modeCounts.partial??0)+' / insufficient '+(agg[name].modeCounts.insufficient??0))
 : JSON.stringify(agg[name].modeCounts);
const rows=menuNames.map(name=>{
 const a=agg[name];
 return '| '+labels[name]+' | '+a.executed+'/3000 | '+a.nonemptyTextCases+' | '+a.distinctExactFullTextResults+' | '+outcome(name)+' |';
});
const md=[
 '# 명하 사주 엔진: 가상 명식 3,000명 × 12개 메뉴 전수 실행 결과',
 '',
 '실행 기준: 브랜치 fix/saju/wealth-preserve-independent-core, 커밋 3f079e8d, 기준일시 2026-10-30 03:00 UTC.',
 '양력 출생일, 출생시각 알려짐, 성별 교대. 3,000개 중복 없는 명식 입력 및 별도 가상 상대·부모·자녀 명식. 가족은 부모 1,500/자녀 1,500건이며, 궁합은 3,000쌍.',
 '**총 36,000개 메뉴 실행, 예외 '+report.fullEngineErrors+'건.** 이것은 품질 PASS를 의미하지 않습니다.',
 '',
 '| 메뉴 | 실행 | 텍스트 표시 명식 수 | 서로 다른 전체 텍스트 | 결과 상태 |',
 '|---|---:|---:|---:|---|',
 ...rows,
 '',
 '## 의미 품질 판정',
 '',
 '- 원국 5개 메뉴: 위 complete는 연구용 최소 근거 충족이며 제품 완성을 의미하지 않습니다. partial, insufficient가 발생하였습니다.',
 '- 가족: '+metrics.familyOutcomeIssued+'/3000 가족관계 결과 의미 발행. 3개의 관찰 문장이 나타나더라도 가족관계 해석 성공이 아닙니다.',
 '- 배우자: '+metrics.spouseTraitIssued+'/3000 상대방 특성 판정. 일지 위치 관찰만 가능하며 상대 성향·결혼 결과를 의미하지 않습니다.',
 '- 궁합: '+metrics.compatibilityT10Issued+'/3000 실제 두 사람의 관계 결과 T10 발행. 두 사람의 개인 관계운 문단 내용이 서로 달랐던 사례는 '+metrics.compatibilityPersonalTextsDiffer+'/3000건이지만, 이는 궁합에 관한 T10 해석이 아닙니다.',
 '- 삶의 단계: '+(agg.life_stage.modeCounts.source_authority_not_established??0)+'/3000 독립 해석 권한 미확립. 해당 화면의 기존 원국 T8 문단을 대운 결론으로 세지 않습니다.',
 '- 올해: '+agg.annual.nonemptyTextCases+'/3000에 연구 관찰 내용 존재. 연운 사건·결과 권한과 구분합니다.',
 '- 이번 달: '+metrics.monthlyT9Theme+'/3000 기존 근거에 따른 월별 T9 주제 보유. 신규 사건 예측 권한 없음.',
 '- 질문형: 원국 근거 연결 '+(agg.question.modeCounts.related_evidence??0)+', 근거 부족 '+(agg.question.modeCounts.insufficient??0)+', 지원하지 않는 질문 '+(agg.question.modeCounts.unsupported??0)+'. 독립 T11 답변은 발행하지 않습니다.',
 '- 기존 원국 해석을 반복한 경우에도 독립적인 추가 해석으로 계산하지 않았습니다. 동일 문장 여부는 명식의 실질적 의미 품질을 증명하지 않습니다.',
 '',
 '## 검증 및 한계',
 '',
 '- 실행 예외: '+report.fullEngineErrors+' / 36,000; 표시용 문단의 출처 필수 필드 결함: '+metrics.badSourceProof+'.',
 '- 10가지 질문을 교대로 입력했으며 시간·건강·결혼·가족·궁합 등 기존 원국 범위 밖의 질문은 보류되는지 함께 확인했습니다.',
 '- 이 결과는 결정론적 연구용 런타임을 호출한 합성 입력 실행이며, 공식 ProductReading HTTP 흐름 및 실제 인간의 사후 만족도·예측 정확도를 검사한 결과가 아닙니다.',
 '',
 '## 재현',
 '',
 '`node scripts/audit-3000x12-synthetic.mjs 250 audit-chunk-0.json 0` (오프셋 0, 250, …, 2750)',
 '`node scripts/combine-3000x12-audit.mjs [원시 배치 결과 폴더]`',
 '',
 '종합 집계: docs/AUDIT_3000X12_2026-10-30.json (커밋 포함). 12개 원시 배치 결과는 로컬 실행 폴더에 보존.'
].join('\n');
writeFileSync('docs/AUDIT_3000X12_2026-10-30.md',md,'utf8');
console.log(JSON.stringify({sampleSize:report.sampleSize,menuExecutions:report.menuExecutions,fullEngineErrors:report.fullEngineErrors,menus:report.menus,metrics:report.metrics}));
