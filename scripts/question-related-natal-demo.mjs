import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { normalizeConsumerReadingRequest } from '../dist/reading/consumer-reading-request-adapter.js';
import { createGeneralNatalMultifactorRegistry } from '../dist/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../dist/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../dist/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../dist/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../dist/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../dist/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../dist/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../dist/preview/relationship-natal-multifactor-report.js';
import {
  buildQuestionRelatedNatalReading,
  renderQuestionRelatedNatalReadingHtml,
} from '../dist/preview/question-related-natal-reading.js';

// --read is an actual birth-specific answer surface; the legacy zero-argument
// research demo retains its original sample for existing development callers.
const readMode = process.argv[2] === '--read';
const inputs = process.argv.slice(readMode ? 3 : 2);
const usage = 'Usage: npm run build && node scripts/question-related-natal-demo.mjs --read "질문" YYYY-MM-DD HH:MM|unknown [output.html]';
if (readMode && (inputs.length < 3 || !inputs[0]?.trim())) throw new TypeError(usage);
const [question = '제 재물운이 궁금해요', birthDate = '2024-03-10',
  birthTime = '12:00', file = 'question-related-natal-preview.html'] = inputs;
const date = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(birthDate);
const time = /^([01]\d|2[0-3]):([0-5]\d)$/u.exec(birthTime);
if (!date || (!time && (!readMode || birthTime !== 'unknown')) ||
    Number(date[1]) < 1800 || Number(date[1]) > 2300 ||
    Number(date[2]) < 1 || Number(date[2]) > 12 ||
    Number(date[3]) < 1 || Number(date[3]) > 31) {
  throw new RangeError(readMode ? usage : 'Use a valid YYYY-MM-DD date and HH:mm time.');
}
const actual = new Date(Date.UTC(Number(date[1]), Number(date[2]) - 1, Number(date[3])));
if (actual.getUTCFullYear() !== Number(date[1]) ||
    actual.getUTCMonth() + 1 !== Number(date[2]) ||
    actual.getUTCDate() !== Number(date[3])) {
  throw new RangeError('A real birth date is required.');
}
const normalized = normalizeConsumerReadingRequest({
  requestId: 'question-related-natal-demo', text: '질문: ' + question,
});
if (normalized.state !== 'resolved' ||
    normalized.request?.intent.domain !== 'question_specific') {
  throw new RangeError('This question is not an open natal question. Exact menu topics use their existing Product Reading; unsupported questions need a supported intent.');
}
const now = readMode ? new Date() : new Date('2026-10-21T00:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year: Number(date[1]), month: Number(date[2]), day: Number(date[3]) },
  time: time ? { known: true, hour: Number(time[1]), minute: Number(time[2]) }
    : { known: false },
  sexForTraditionalCalculation: 'unspecified',
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const general = createGeneralNatalMultifactorRegistry();
const career = createCareerMultifactorResearchRegistry();
const wealth = createWealthNatalMultifactorRegistry();
const business = createBusinessNatalMultifactorRegistry();
const relationship = createRelationshipNatalMultifactorRegistry();
const reports = {
  general: buildGeneralNatalMultifactorReport(
    snapshot, runInterpretation(snapshot, general, { now }), general),
  career: buildCareerMultifactorResearchReport(
    snapshot, runInterpretation(snapshot, career, { now }), career),
  wealth: buildWealthNatalMultifactorReport(
    snapshot, runInterpretation(snapshot, wealth, { now }), wealth),
  business: buildBusinessNatalMultifactorReport(
    snapshot, runInterpretation(snapshot, business, { now }), business),
  relationship: buildRelationshipNatalMultifactorReport(
    snapshot, runInterpretation(snapshot, relationship, { now }), relationship),
};
const reading = buildQuestionRelatedNatalReading(snapshot, normalized.request, reports);
const output = resolve(file);
const html = renderQuestionRelatedNatalReadingHtml(reading);
const escapeHtml = value => String(value).replace(/[&<>"']/gu, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[c]);
const outputHtml = readMode
  ? html.replace('<body>', '<body><p style="padding:12px;border:1px solid #ddd">' +
      '<strong>이 질문의 출생 입력</strong>: ' +
      escapeHtml(birthDate + ' ' + birthTime + ' · 양력') + '</p>')
  : html;
writeFileSync(output, outputHtml, 'utf8');
if (!readMode) {
  process.stdout.write('Question-related Korean natal preview: ' + output +
    ' (status=' + reading.status + ', sections=' + reading.sections.length +
    ', researchOnly=true, official=false)\n');
} else {
  const lines = [
    '명하 사주 · 실제 질문에 연결된 원국 연구 풀이',
    '질문: ' + reading.question,
    '출생: ' + birthDate + ' ' + birthTime + ' (양력)',
    reading.headline,
    '',
  ];
  if (reading.sections.length === 0) {
    lines.push('현재 이 질문을 직접 풀이할 근거가 부족하거나 요청 범위가 지원되지 않습니다.');
  }
  for (const section of reading.sections) {
    if (!section.sourceIds.length || !section.factPaths.length ||
        !section.paragraph.trim()) {
      throw new TypeError('Question research cannot present a source-free interpretation.');
    }
    lines.push('━━ ' + section.title + ' ━━', section.paragraph, '');
  }
  if (reading.missing.length) {
    lines.push('근거 부족·범위 제한:', ...reading.missing);
  }
  lines.push('', '전체 한국어 결과 HTML: ' + output,
    '이 출력은 기존 T8 개인별 연구 문단의 연결이며 새 T11 질문형 결론이 아닙니다.');
  process.stdout.write(lines.join('\n') + '\n');
}
