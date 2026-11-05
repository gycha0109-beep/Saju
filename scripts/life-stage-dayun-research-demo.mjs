import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import {
  buildLifeStageDayunResearchReport,
  renderLifeStageDayunResearchHtml,
} from '../dist/preview/life-stage-dayun-research-report.js';

// Accept an exact offset-bearing instant or the legacy year fixture.
const referenceArg = process.argv[2] ?? '2030';
const isLegacyYear = /^\d{4}$/u.test(referenceArg);
const referenceDateTime = isLegacyYear
  ? referenceArg + '-06-01T12:00:00+09:00' : referenceArg;
const instant = new Date(referenceDateTime);
if (!/(?:Z|[+-]\d{2}:\d{2})$/u.test(referenceDateTime) ||
  !Number.isFinite(instant.getTime())) {
  throw new RangeError('Reference time must be YYYY or an ISO date-time with an explicit UTC offset.');
}
const referenceYear = Number(new Date(instant.getTime() + 9 * 60 * 60 * 1000)
  .toISOString().slice(0, 4));
if (referenceYear < 1990 || referenceYear > 2100) {
  throw new RangeError('Reference year must be 1990..2100.');
}
const output = resolve(process.argv[3] ?? 'life-stage-dayun-research-preview.html');
const birthDate = process.argv[4] ?? '1990-05-15';
const birthTime = process.argv[5] ?? '14:30';
const traditionalSex = process.argv[6] ?? 'male';
const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(birthDate);
const timeMatch = birthTime === 'unknown' ? null : /^(\d{2}):(\d{2})$/u.exec(birthTime);
const birthYear = Number(dateMatch?.[1]);
const birthMonth = Number(dateMatch?.[2]);
const birthDay = Number(dateMatch?.[3]);
const validDate = dateMatch !== null && birthYear >= 1800 && birthYear <= 2300 &&
  birthMonth >= 1 && birthMonth <= 12 &&
  birthDay >= 1 && birthDay <= new Date(Date.UTC(birthYear, birthMonth, 0)).getUTCDate();
const validTime = birthTime === 'unknown' ||
  (timeMatch !== null && Number(timeMatch[1]) <= 23 && Number(timeMatch[2]) <= 59);
if (!validDate || !validTime ||
  !['male', 'female', 'unspecified'].includes(traditionalSex)) {
  throw new RangeError(
    'Usage: node scripts/life-stage-dayun-research-demo.mjs [year|offset-datetime] [output.html] [birth YYYY-MM-DD] [HH:mm|unknown] [male|female|unspecified]',
  );
}
const now = new Date('2026-09-03T13:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year: birthYear, month: birthMonth, day: birthDay },
  time: birthTime === 'unknown'
    ? { known: false }
    : { known: true, hour: Number(timeMatch[1]), minute: Number(timeMatch[2]) },
  sexForTraditionalCalculation: traditionalSex,
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const report = buildLifeStageDayunResearchReport(snapshot, referenceDateTime);
writeFileSync(output, renderLifeStageDayunResearchHtml(report), 'utf8');
process.stdout.write('Life stage Canonical Dayun research preview: ' + output +
  ' (coverage=' + report.coverage + ', official=false)\n');
