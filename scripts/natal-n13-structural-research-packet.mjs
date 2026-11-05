import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { createGeneralNatalSourceBoundedRegistry } from '../dist/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildNatalN13StructuralResearchReading } from '../dist/research/general-natal-t8-structural-reading-draft.js';

const NOW = new Date('2026-10-16T00:00:00.000Z');
const INPUTS = [
  ['real-1984-06-14-05:30','1984-06-14','05:30'],
  ['real-1984-06-14-12:30','1984-06-14','12:30'],
  ['real-1984-01-07-00:30','1984-01-07','00:30'],
  ['real-1984-01-07-12:30','1984-01-07','12:30'],
  ['real-1989-09-08-05:30','1989-09-08','05:30'],
  ['real-1989-09-08-12:30','1989-09-08','12:30'],
  ['real-1992-01-12-00:30','1992-01-12','00:30'],
  ['real-1992-01-12-19:30','1992-01-12','19:30'],
];
const escapeHtml = (input) => String(input).replace(/[&<>"']/gu,
  (x)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[x]);

function html(report) {
  return '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
    '<title>N13 종합 구조 해석 후보 — 내부 연구 전용</title>' +
    '<style>body{max-width:950px;margin:30px auto;padding:20px;font:16px/1.65 system-ui}' +
    'article{border:1px solid #bbb;border-radius:8px;padding:20px;margin:20px 0}' +
    'p,li{overflow-wrap:anywhere}small{color:#666}</style></head><body>' +
    '<h1>N13 실제 명식 T5→T8 구조 종합 문장</h1>' +
    '<p><b>내부 연구 검토 전용. 소비자 Preview/Production 사용 및 판매 금지.</b> ' +
    '성격·직업·재물·길흉 추론은 아직 승인되지 않았습니다.</p>' +
    report.cases.map((item) => '<article><h2>' + escapeHtml(item.caseId) +
      ' — 구조 후보 ' + item.relationCount + '개</h2>' +
      (item.sentences.length
        ? '<ol>' + item.sentences.map((s) => '<li><b>' + escapeHtml(s.sourcePattern) +
          '</b> ' + escapeHtml(s.text) + '<p><small>semantic: ' +
          escapeHtml(s.semanticKey) + ' · T5: ' + escapeHtml(s.upstreamClaimRefs.join(', ')) +
          ' · sources: ' + escapeHtml(s.sourceLocators.map((p) => p.sourceId+' '+p.locator).join('; ')) +
          ' · approval: HOLD</small></p></li>').join('') + '</ol>'
        : '<p>현행 좁은 연구 방법론으로 성립하는 구조 관계 후보 없음. 부재를 명식의 결론으로 해석하지 않습니다.</p>') +
      '</article>').join('') + '</body></html>\n';
}
const registry = createGeneralNatalSourceBoundedRegistry(NOW.toISOString());
const cases = INPUTS.map(([caseId,date,time]) => {
  const [year,month,day] = date.split('-').map(Number);
  const [hour,minute] = time.split(':').map(Number);
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType:'solar',date:{year,month,day},time:{known:true,hour,minute},
    sexForTraditionalCalculation:'unspecified',
  },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now:NOW});
  const execution = runInterpretation(snapshot,registry,{now:NOW,requestId:caseId});
  const draft = buildNatalN13StructuralResearchReading(snapshot,execution,registry);
  return {caseId,date,time,...draft};
});
const result = {
  version:'saju-n13-real-chart-composite-research-packet-v1',
  researchOnly:true,consumerPreviewAuthorized:false,productionAuthorized:false,
  caseCount:cases.length,
  matchedCaseCount:cases.filter((c) => c.relationCount>0).length,
  uniqueMeaningSignatures:new Set(cases.map((c) => c.meaningSignature)).size,
  cases,
};
if(result.caseCount!==8 || result.matchedCaseCount<1 ||
    !cases.every((item) => item.mayPublishToConsumer===false &&
      item.sentences.every((s)=>s.researchOnly && !s.consumerProjectionAuthorized))) {
  throw new TypeError('N13 structural research packet safety or execution failed');
}
const jsonPath = resolve(process.argv[2] ?? 'natal-n13-research.json');
const htmlPath = resolve(process.argv[3] ?? 'natal-n13-research.html');
writeFileSync(jsonPath,JSON.stringify(result,null,2)+'\n','utf8');
writeFileSync(htmlPath,html(result),'utf8');
process.stdout.write('N13 actual source-bounded T8: '+result.matchedCaseCount+'/'+result.caseCount+
  ' real charts, '+result.uniqueMeaningSignatures+' structural signatures; Research/HOLD only\n');
