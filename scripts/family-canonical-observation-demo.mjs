import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import {
  buildFamilyCanonicalObservationPreview,
  renderFamilyCanonicalObservationHtml,
} from '../dist/preview/family-parents-children-observation-preview.js';

const scope = process.argv[2] ?? 'parents';
if (scope !== 'parents' && scope !== 'children') {
  throw new RangeError('Usage: npm run build && node scripts/family-canonical-observation-demo.mjs [parents|children] [output.html]');
}
const output = resolve(process.argv[3] ?? ('family-' + scope + '-canonical-preview.html'));
const birthDate = process.argv[4] ?? '1990-05-15';
const birthTime = process.argv[5] ?? '14:30';
const traditionalSex = process.argv[6] ?? 'unspecified';
const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(birthDate);
const timeMatch = birthTime === 'unknown' ? null : /^(\d{2}):(\d{2})$/u.exec(birthTime);
const year = Number(dateMatch?.[1]);
const month = Number(dateMatch?.[2]);
const day = Number(dateMatch?.[3]);
const validDate = dateMatch !== null && year >= 1800 && year <= 2300 &&
  month >= 1 && month <= 12 &&
  day >= 1 && day <= new Date(Date.UTC(year, month, 0)).getUTCDate();
const validTime = birthTime === 'unknown' ||
  (timeMatch !== null && Number(timeMatch[1]) <= 23 && Number(timeMatch[2]) <= 59);
if (!validDate || !validTime ||
  !['male', 'female', 'unspecified'].includes(traditionalSex)) {
  throw new RangeError(
    'Usage: npm run build && node scripts/family-canonical-observation-demo.mjs ' +
    '[parents|children] [output.html] [YYYY-MM-DD] [HH:mm|unknown] [male|female|unspecified]',
  );
}
const now = new Date('2026-09-03T13:00:00.000Z');
const chart = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year, month, day },
  time: birthTime === 'unknown'
    ? { known: false }
    : { known: true, hour: Number(timeMatch[1]), minute: Number(timeMatch[2]) },
  sexForTraditionalCalculation: traditionalSex,
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const report = buildFamilyCanonicalObservationPreview(chart, scope);
writeFileSync(output, renderFamilyCanonicalObservationHtml(report), 'utf8');
process.stdout.write(
  'Family research preview: ' + output +
  ' (scope=' + report.scope + ', meaning=insufficient, official=false)\n',
);
