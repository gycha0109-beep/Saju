import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import {
  buildLifeStageDayunResearchReport,
  renderLifeStageDayunResearchHtml,
} from '../dist/preview/life-stage-dayun-research-report.js';

const referenceYear = Number(process.argv[2] ?? '2030');
if (!Number.isInteger(referenceYear) || referenceYear < 1990 || referenceYear > 2100) {
  throw new RangeError('Usage: npm run build && node scripts/life-stage-dayun-research-demo.mjs [year 1990..2100] [output.html]');
}
const output = resolve(process.argv[3] ?? 'life-stage-dayun-research-preview.html');
const now = new Date('2026-09-03T13:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'male',
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const report = buildLifeStageDayunResearchReport(
  snapshot, referenceYear + '-06-01T12:00:00+09:00',
);
writeFileSync(output, renderLifeStageDayunResearchHtml(report), 'utf8');
process.stdout.write('Life stage Canonical Dayun research preview: ' + output +
  ' (coverage=' + report.coverage + ', official=false)\n');
