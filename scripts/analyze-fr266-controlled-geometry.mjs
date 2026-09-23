import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import process from 'node:process';

import {
  analyzeControlledCaptureGeometrySensitivityFR266,
} from '../.face-reading-dist/observable-morphology-controlled-capture-geometry-sensitivity-fr266.js';

const ROOT = new URL('../research/face-reading/evidence/fr266-controlled-geometry/', import.meta.url);
const EVIDENCE = Object.freeze([
  Object.freeze({
    condition: 'baseline_eye_level',
    sourceRef: 'repo:research/face-reading/evidence/fr266-controlled-geometry/baseline-eye-level.fr257.json',
    file: new URL('baseline-eye-level.fr257.json', ROOT),
  }),
  Object.freeze({
    condition: 'low_angle',
    sourceRef: 'repo:research/face-reading/evidence/fr266-controlled-geometry/low-angle.fr257.json',
    file: new URL('low-angle.fr257.json', ROOT),
  }),
  Object.freeze({
    condition: 'high_angle',
    sourceRef: 'repo:research/face-reading/evidence/fr266-controlled-geometry/high-angle.fr257.json',
    file: new URL('high-angle.fr257.json', ROOT),
  }),
]);
const REPORT_FILE = new URL('controlled-geometry-sensitivity-report.fr266.json', ROOT);
const REPORT_GENERATED_AT = '2026-09-23T18:14:13.312Z';

async function readJson(url) {
  return JSON.parse(await readFile(url, 'utf8'));
}

const conditions = await Promise.all(EVIDENCE.map(async (entry) => Object.freeze({
  condition: entry.condition,
  sourceRef: entry.sourceRef,
  bundle: await readJson(entry.file),
})));

const report = analyzeControlledCaptureGeometrySensitivityFR266({
  generatedAt: REPORT_GENERATED_AT,
  conditions,
});

if (process.argv.includes('--verify')) {
  const expected = await readJson(REPORT_FILE);
  assert.deepStrictEqual(report, expected);
  process.stdout.write(
    'FR266 controlled geometry sensitivity report verified: '
      + report.conditions.length
      + ' conditions, '
      + report.baselineRelativeContrasts.length
      + ' baseline-relative contrasts.\n',
  );
} else {
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
}
