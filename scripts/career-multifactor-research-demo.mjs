import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import {
  buildCareerMultifactorResearchReport,
  renderCareerMultifactorResearchHtml,
} from '../dist/preview/career-natal-multifactor-report.js';

const registry = createCareerMultifactorResearchRegistry();
const now = new Date('2026-10-18T00:00:00.000Z');
const observed = [];
for (const month of [2, 3, 4, 5, 6, 7]) {
  for (const day of [3, 7, 11, 17, 23]) {
    const input = {
      calendarType: 'solar',
      date: { year: 2024, month, day },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    };
    const snapshot = calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const interpretation = runInterpretation(snapshot, registry, { now });
    const report = buildCareerMultifactorResearchReport(snapshot, interpretation, registry);
    if (report.sections.length > 0) {
      observed.push({ input, report, signature: report.sections.map(x => x.claimType).join('|') });
    }
  }
}
const first = observed[0];
const second = observed.find(x => x.signature !== first?.signature);
if (!first || !second) {
  throw new Error('No two actually different source-bounded Career meanings found; do not fake a demonstration');
}
const escape = input => String(input).replace(/[&<>"']/gu, c =>
  ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
const cases = [first, second];
const html = '<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>Career 다중 근거 비교 · 연구 전용</title></head><body>' +
  '<h1>서로 다른 두 명식의 Career T8 종합풀이 · 내부 연구</h1><p>아직 미승인 연구 후보이며 판매할 수 없습니다.</p>' +
  cases.map(({input,report},index) =>
    '<article><h2>실제 계산 사례 ' + (index + 1) + ': ' +
    escape(JSON.stringify(input.date)) + '</h2><p>MUR: ' + report.state + '</p>' +
    report.sections.map(s => '<section><h3>' + escape(s.headline) + '</h3><p>' +
      escape(s.paragraph) + '</p><small>source: ' + escape(s.sourceIds.join(', ')) +
      ' · T5 upstream: ' + escape(s.upstreamClaimIds.join(', ')) +
      '</small></section>').join('') +
    '</article>').join('') +
  '</body></html>';
const filename = resolve(process.argv[2] ?? 'career-multifactor-research-comparison.html');
writeFileSync(filename, html, 'utf8');
const output = {
  lifecycle: 'research_only', mayPublish: false, maySell: false,
  first: { input: first.input, state: first.report.state, sections: first.report.sections },
  second: { input: second.input, state: second.report.state, sections: second.report.sections },
  outputHtml: filename,
  firstSingleReaderHtmlLength: renderCareerMultifactorResearchHtml(first.report).length,
};
process.stdout.write(JSON.stringify(output, null, 2) + '\n');
