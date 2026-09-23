import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { URL } from 'node:url';

import {
  analyzeControlledCaptureGeometrySensitivityFR267,
} from '../.face-reading-dist/observable-morphology-controlled-capture-geometry-sensitivity-fr267.js';

const ROOT = new URL('../research/face-reading/evidence/fr267-controlled-geometry/', import.meta.url);
const EVIDENCE = Object.freeze([
  Object.freeze({
    condition: 'baseline_eye_level',
    sourceRef: 'repo:research/face-reading/evidence/fr267-controlled-geometry/baseline-eye-level.fr257.json',
    file: new URL('baseline-eye-level.fr257.json', ROOT),
  }),
  Object.freeze({
    condition: 'low_angle',
    sourceRef: 'repo:research/face-reading/evidence/fr267-controlled-geometry/low-angle.fr257.json',
    file: new URL('low-angle.fr257.json', ROOT),
  }),
  Object.freeze({
    condition: 'high_angle',
    sourceRef: 'repo:research/face-reading/evidence/fr267-controlled-geometry/high-angle.fr257.json',
    file: new URL('high-angle.fr257.json', ROOT),
  }),
]);
const REPORT_FILE = new URL('controlled-geometry-sensitivity-report.fr267.json', ROOT);
const REPORT_GENERATED_AT = '2026-09-23T18:14:13.312Z';

async function readJson(url) {
  return JSON.parse(await readFile(url, 'utf8'));
}

const conditions = await Promise.all(EVIDENCE.map(async (entry) => Object.freeze({
  condition: entry.condition,
  sourceRef: entry.sourceRef,
  bundle: await readJson(entry.file),
})));

const report = analyzeControlledCaptureGeometrySensitivityFR267({
  generatedAt: REPORT_GENERATED_AT,
  conditions,
});

function assertEquivalent(actual, expected, path = '$') {
  if (typeof actual === 'number' && typeof expected === 'number') {
    const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
    if (Math.abs(actual - expected) > 1e-12 * scale) {
      throw new Error(
        path + ' numeric drift: actual=' + actual + ' expected=' + expected,
      );
    }
    return;
  }
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      throw new Error(path + ' array length drift.');
    }
    actual.forEach((value, index) => {
      assertEquivalent(value, expected[index], path + '[' + index + ']');
    });
    return;
  }
  if (
    typeof actual === 'object'
    && actual !== null
    && typeof expected === 'object'
    && expected !== null
  ) {
    const actualKeys = Object.keys(actual).sort();
    const expectedKeys = Object.keys(expected).sort();
    if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
      throw new Error(path + ' object key drift.');
    }
    for (const key of actualKeys) {
      assertEquivalent(actual[key], expected[key], path + '.' + key);
    }
    return;
  }
  if (actual !== expected) {
    throw new Error(
      path + ' value drift: actual=' + String(actual)
      + ' expected=' + String(expected),
    );
  }
}

if (process.argv.includes('--verify')) {
  const expected = await readJson(REPORT_FILE);
  assertEquivalent(report, expected);
  process.stdout.write(
    'FR267 controlled geometry sensitivity report verified: '
      + report.conditions.length
      + ' conditions, '
      + report.baselineRelativeContrasts.length
      + ' baseline-relative contrasts.\n',
  );
} else {
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
}
