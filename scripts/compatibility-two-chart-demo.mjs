import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import {
  buildCompatibilityTwoChartIntakePreview,
  renderCompatibilityTwoChartIntakeHtml,
} from '../dist/preview/compatibility-two-chart-intake-preview.js';

const usage =
  'Usage: npm run build && node scripts/compatibility-two-chart-demo.mjs ' +
  '[person A YYYY-MM-DD] [A HH:mm|unknown] ' +
  '[person B YYYY-MM-DD] [B HH:mm|unknown] [output.html]';

function parseBirth(dateText, timeText) {
  const date = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(dateText ?? '');
  const time = timeText === 'unknown' ? null : /^(\d{2}):(\d{2})$/u.exec(timeText ?? '');
  const year = Number(date?.[1]);
  const month = Number(date?.[2]);
  const day = Number(date?.[3]);
  if (date === null || year < 1800 || year > 2300 ||
    month < 1 || month > 12 ||
    day < 1 || day > new Date(Date.UTC(year, month, 0)).getUTCDate() ||
    (timeText !== 'unknown' &&
      (time === null || Number(time[1]) > 23 || Number(time[2]) > 59))) {
    throw new RangeError(usage);
  }
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: timeText === 'unknown'
      ? { known: false }
      : { known: true, hour: Number(time[1]), minute: Number(time[2]) },
    sexForTraditionalCalculation: 'unspecified',
  };
}

const args = process.argv.slice(2);
if (args.length !== 4 && args.length !== 5) {
  throw new RangeError(usage);
}

const aBirth = parseBirth(args[0], args[1]);
const bBirth = parseBirth(args[2], args[3]);
const output = resolve(args[4] ?? 'compatibility-two-chart-preview.html');
const now = new Date('2026-09-03T13:00:00.000Z');
const a = calculateCanonicalSajuSnapshot(
  aBirth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now },
);
const b = calculateCanonicalSajuSnapshot(
  bBirth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now },
);
const report = buildCompatibilityTwoChartIntakePreview(
  {
    requestId: 'two-person-compatibility-cli',
    intent: { domain: 'compatibility', temporalScope: 'natal' },
    targetPersonRef: 'person-b',
  },
  { personRef: 'person-a', snapshot: a },
  { personRef: 'person-b', snapshot: b },
);
writeFileSync(output, renderCompatibilityTwoChartIntakeHtml(report), 'utf8');
process.stdout.write(
  'Two separate natal calculations: ' + output +
  ' (interpersonal T10 meaning=insufficient, official=false)\n',
);
