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

// npm run build && node scripts/question-related-natal-demo.mjs "제 재물운이 궁금해요" 2024-03-10 12:00 [output.html]
// Uses the existing T5/T8 research registry and returns ONLY its actual Korean paragraphs.
const [question = '제 재물운이 궁금해요', birthDate = '2024-03-10',
  birthTime = '12:00', file = 'question-related-natal-preview.html'] = process.argv.slice(2);
const date = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(birthDate);
const time = /^(\d{2}):(\d{2})$/u.exec(birthTime);
if (!date || !time || Number(date[2]) < 1 || Number(date[2]) > 12 ||
    Number(date[3]) < 1 || Number(date[3]) > 31 ||
    Number(time[1]) > 23 || Number(time[2]) > 59) {
  throw new RangeError('Use a valid YYYY-MM-DD date and HH:mm time. Invalid calendar dates are rejected by the calculation engine.');
}
const normalized = normalizeConsumerReadingRequest({
  requestId: 'question-related-natal-demo', text: '질문: ' + question,
});
if (normalized.state !== 'resolved' ||
    normalized.request?.intent.domain !== 'question_specific') {
  throw new RangeError('This question is not an open natal question. Exact menu topics use their existing Product Reading; unsupported questions need a supported intent.');
}
const now = new Date('2026-10-21T00:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year: Number(date[1]), month: Number(date[2]), day: Number(date[3]) },
  time: { known: true, hour: Number(time[1]), minute: Number(time[2]) },
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
writeFileSync(output, renderQuestionRelatedNatalReadingHtml(reading), 'utf8');
process.stdout.write('Question-related Korean natal preview: ' + output +
  ' (status=' + reading.status + ', sections=' + reading.sections.length +
  ', researchOnly=true, official=false)\n');
