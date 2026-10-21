import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import {
  buildLifeStageCalculatedTimelinePreview,
  renderLifeStageCalculatedTimelineHtml,
} from '../dist/preview/life-stage-calculated-timeline-preview.js';

// Run: npm run build && node scripts/life-stage-calculated-demo.mjs [output.html]
// Reproducible historical fixture for a calculation-only internal sample.
const now = new Date('2026-10-21T00:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'male',
}, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const request = {
  requestId: 'life-stage-calculated-demo',
  intent: { domain: 'life_stage', temporalScope: 'life_stage' },
};
const report = buildLifeStageCalculatedTimelinePreview(snapshot, request);
const output = resolve(process.argv[2] ?? 'life-stage-calculation-preview.html');
writeFileSync(output, renderLifeStageCalculatedTimelineHtml(report), 'utf8');
process.stdout.write(
  `Life-stage research-only calculation preview: ${output}; status=${report.status}; entries=${report.entries.length}; official=false\n`,
);
