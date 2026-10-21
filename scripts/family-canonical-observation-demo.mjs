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
const now = new Date('2026-09-03T13:00:00.000Z');
const chart = calculateCanonicalSajuSnapshot({
  calendarType: 'solar', date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const report = buildFamilyCanonicalObservationPreview(chart, scope);
writeFileSync(output, renderFamilyCanonicalObservationHtml(report), 'utf8');
process.stdout.write(
  'Family research preview: ' + output +
  ' (scope=' + report.scope + ', meaning=insufficient, official=false)\n',
);
