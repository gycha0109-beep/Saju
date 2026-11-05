import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { createGeneralNatalSourceBoundedRegistry } from '../dist/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildNatalN20MixedRelationResearchReport } from '../dist/research/general-natal-t8-mixed-relation-reading.js';

const now = new Date('2026-10-16T00:00:00.000Z');
const registry = createGeneralNatalSourceBoundedRegistry(now.toISOString());
const inputs = [
  ['1984-06-14', '05:30'], ['1984-06-14', '12:30'],
  ['1984-01-07', '00:30'], ['1984-01-07', '12:30'],
  ['1989-09-08', '05:30'], ['1989-09-08', '12:30'],
  ['1992-01-12', '00:30'], ['1992-01-12', '19:30'],
];
const escape = (value) => String(value).replace(/[&<>"']/gu,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const cases = inputs.map(([date, time]) => {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar', date: { year, month, day },
    time: { known: true, hour, minute },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
  const execution = runInterpretation(snapshot, registry, {
    now, requestId: 'n20-real-' + date + '-' + time,
  });
  return {
    caseId: 'solar-' + date + '-' + time,
    ...buildNatalN20MixedRelationResearchReport(snapshot, execution, registry),
  };
});
const output = {
  version: 'saju-n20-eight-real-chart-relation-contrast-packet-v1',
  lifecycle: 'internal_research_only',
  mayPublish: false,
  maySell: false,
  consumerInterpretationAuthorized: false,
  caseCount: cases.length,
  matchedCaseCount: cases.filter((x) => x.mixedPairCount > 0).length,
  observedPairs: cases.reduce((sum, x) => sum + x.mixedPairCount, 0),
  uniqueStructuralSignatures: new Set(cases.map((x) => x.relationPatternSignature)).size,
  uniqueLocationSignatures: new Set(cases.map((x) => x.locationSignature)).size,
  cases,
};
if (output.caseCount !== 8 || !cases.every((x) =>
  x.lifecycle === 'internal_research_only' && !x.mayPublish &&
  !x.mayAuthorizeInterpretation && x.mixedPairs.every((p) =>
    p.uniqueT5ClaimIds.length === 3 &&
    p.sourceLocators.length >= 2 &&
    p.observedFamilies.length === 3 &&
    p.observedFamilies.every((f) => f.observed.length > 0) &&
    !p.consumerProjectionAuthorized && !p.relationCancellationInferred &&
    !p.realLifeOutcomeInferred && !p.transitiveCausalityInferred
  ))) {
  throw new TypeError('N20 mixed-relation research evidence or authority mismatch');
}
const html = '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
  '<title>N20 실제 십신 근거의 혼합 관계 관측</title>' +
  '<style>body{max-width:970px;margin:30px auto;padding:20px;font:16px/1.75 system-ui}' +
  'article{border:1px solid #ccc;border-radius:10px;margin:15px 0;padding:20px}small{color:#666}</style></head><body>' +
  '<h1>N20 생성·견제/충돌 관계가 동시에 나타나는 실제 명식</h1>' +
  '<p><strong>Research/HOLD. 소비자 사주풀이·직업·재물·관계·길흉 결론 미승인.</strong></p>' +
  '<p>구조 관계의 종류와 실제 십신 위치만 비교합니다. 상쇄·우세·운세 인과를 결론 내리지 않습니다.</p>' +
  cases.map((c) => '<article><h2>' + escape(c.caseId) +
    ' — 혼합 관측 ' + c.mixedPairCount + '개</h2>' +
    (c.mixedPairs.length === 0
      ? '<p>현재 좁은 연구 조건에서 공존하는 혼합 관계 후보가 없습니다. 부재 자체가 개인 평가가 되지는 않습니다.</p>'
      : '<ol>' + c.mixedPairs.map((p) => '<li><p>' + escape(p.text) + '</p>' +
        '<details><summary>검증 가능한 계산·원전 근거</summary><small>' +
        'T8: ' + escape(p.firstT8ClaimId) + ' / ' + escape(p.secondT8ClaimId) +
        ' · 독립 T5: ' + escape(p.uniqueT5ClaimIds.join(', ')) +
        ' · sources: ' + escape(p.sourceLocators.map((s) => s.sourceId + ' ' + s.locator).join('; ')) +
        '</small></details></li>').join('') + '</ol>') + '</article>').join('') +
  '</body></html>\n';
const jsonPath = resolve(process.argv[2] ?? 'natal-n20-mixed.json');
const htmlPath = resolve(process.argv[3] ?? 'natal-n20-mixed.html');
writeFileSync(jsonPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
writeFileSync(htmlPath, html, 'utf8');
process.stdout.write('N20 actual mixed source-bounded T8: ' + output.matchedCaseCount +
  '/' + output.caseCount + ' real charts, ' + output.observedPairs + ' mixed pairs, ' +
  output.uniqueStructuralSignatures + ' relation signatures, ' +
  output.uniqueLocationSignatures + ' position signatures; Research/HOLD\n');
