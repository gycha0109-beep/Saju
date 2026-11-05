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
  buildGeneralMonthlyExplorationReport,
  renderGeneralMonthlyExplorationHtml,
} from '../dist/preview/general-monthly-exploration-report.js';

const year = Number(process.argv[2] ?? '2026');
const month = Number(process.argv[3] ?? '10');
if (!Number.isInteger(year) || year < 1800 || year > 2300 ||
  !Number.isInteger(month) || month < 1 || month > 12) {
  throw new RangeError('Usage: npm run preview:monthly:demo -- [year 1800..2300] [month 1..12] [output.html]');
}
const output = resolve(process.argv[4] ?? 'monthly-exploration-preview.html');
const now = new Date('2026-09-03T13:00:00.000Z');
const natal = calculateCanonicalSajuSnapshot({
  calendarType: 'solar', date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const request = {
  requestId: `monthly-exploration-demo-${year}-${month}`,
  intent: { domain: 'general', temporalScope: 'monthly' },
  targetPeriod: {
    scope: 'monthly', year, month, timeZone: 'Asia/Seoul',
    referenceDateTime: now.toISOString(), resolution: 'relative_current',
  },
};
const context = buildTemporalReadingContext(request);
if (context?.scope !== 'monthly') throw new Error('Missing monthly context');
const facts = buildMonthlyInterpretationFacts(natal, context);
const registry = createGeneralMonthlyReadingCandidateRegistry(now.toISOString());
const execution = runInterpretation(natal, registry, {
  requestId: request.requestId, temporalFacts: { ...facts }, now,
});
const report = buildGeneralMonthlyExplorationReport(natal, facts, execution, registry, request);
writeFileSync(output, renderGeneralMonthlyExplorationHtml(report), 'utf8');
process.stdout.write(
  `Monthly research preview written: ${output} (coverage=${report.coverage}, sections=${report.sections.length}, official=false)\n`,
);
