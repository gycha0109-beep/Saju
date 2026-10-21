import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { buildTemporalReadingContext } from '../dist/reading/temporal-reading-context.js';
import { buildMonthlyInterpretationFacts } from '../dist/reading/monthly-interpretation-facts.js';
import { createGeneralMonthlyReadingCandidateRegistry } from '../dist/research/general-monthly-reading-candidate.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import {
  buildGeneralAnnualMonthlyExplorationReport,
  renderGeneralAnnualMonthlyExplorationHtml,
} from '../dist/preview/general-annual-monthly-exploration-report.js';

const year = Number(process.argv[2] ?? '2026');
const month = Number(process.argv[3] ?? '9');
if (!Number.isInteger(year) || year < 1800 || year > 2300 ||
  !Number.isInteger(month) || month < 1 || month > 12) {
  throw new RangeError('Usage: npm run preview:annual-monthly:demo -- [year 1800..2300] [month 1..12] [output.html] [birth YYYY-MM-DD] [time HH:mm|unknown]');
}
const output = resolve(process.argv[4] ?? 'annual-monthly-exploration-preview.html');
const birthDate = process.argv[5] ?? '1996-01-09';
const birthTime = process.argv[6] ?? '09:30';
const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(birthDate);
const timeMatch = birthTime === 'unknown' ? null : /^(\d{2}):(\d{2})$/u.exec(birthTime);
const birthYear = Number(dateMatch?.[1]);
const birthMonth = Number(dateMatch?.[2]);
const birthDay = Number(dateMatch?.[3]);
const validBirthDate = dateMatch !== null &&
  birthYear >= 1800 && birthYear <= 2300 &&
  birthMonth >= 1 && birthMonth <= 12 &&
  birthDay >= 1 && birthDay <= new Date(Date.UTC(birthYear, birthMonth, 0)).getUTCDate();
const validBirthTime = birthTime === 'unknown' ||
  (timeMatch !== null && Number(timeMatch[1]) <= 23 && Number(timeMatch[2]) <= 59);
if (!validBirthDate || !validBirthTime) {
  throw new RangeError(
    'Usage: npm run preview:annual-monthly:demo -- [year] [month] [output.html] [birth YYYY-MM-DD] [time HH:mm|unknown]',
  );
}
const now = new Date('2026-09-03T13:00:00.000Z');
const natal = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year: birthYear, month: birthMonth, day: birthDay },
  time: birthTime === 'unknown'
    ? { known: false }
    : { known: true, hour: Number(timeMatch[1]), minute: Number(timeMatch[2]) },
  sexForTraditionalCalculation: 'unspecified',
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const request = {
  requestId: 'joined-year-month-demo-' + year + '-' + month,
  intent: { domain: 'general', temporalScope: 'monthly' },
  targetPeriod: {
    scope: 'monthly', year, month, timeZone: 'Asia/Seoul',
    referenceDateTime: now.toISOString(), resolution: 'relative_current',
  },
};
const context = buildTemporalReadingContext(request);
if (context?.scope !== 'monthly') throw new Error('Expected monthly context');
const facts = buildMonthlyInterpretationFacts(natal, context);
const registry = createGeneralMonthlyReadingCandidateRegistry(now.toISOString());
const execution = runInterpretation(natal, registry, {
  requestId: request.requestId, temporalFacts: { ...facts }, now,
});
const report = buildGeneralAnnualMonthlyExplorationReport(
  natal, facts, execution, registry, request,
);
writeFileSync(output, renderGeneralAnnualMonthlyExplorationHtml(report), 'utf8');
process.stdout.write(
  'Annual-to-month research preview: ' + output +
  ' (coverage=' + report.monthly.coverage + ', official=false)\n',
);
