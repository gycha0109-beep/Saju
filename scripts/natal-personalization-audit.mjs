import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  createMyeonghwaProductionPreviewOnlyCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../dist/production-calculation-process.js';
import { PRODUCT_PREVIEW_READING_HTTP_PATH } from '../dist/production-calculation-host.js';
import { buildNatalPersonalizationBaselineReport } from '../dist/preview/natal-personalization-baseline.js';
import { buildNatalRuleDifferentiationReport } from '../dist/preview/natal-rule-differentiation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../dist/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../dist/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';

const bearer = 'local-natal-quality-audit-not-a-production-secret';
const dates = [
  '1984-01-07',
  '1989-09-08',
  '1992-01-12',
  '1996-01-09',
  '2001-06-21',
  '2010-02-03',
  '2018-07-14',
  '2024-03-10',
];
const times = ['00:30', '05:30', '12:30', '19:30'];
const fixtures = [
  ...dates.flatMap((date) =>
    times.map((time) => ({
      caseId: `solar-${date}-${time}`,
      birth: { calendarType: 'solar', date, time, sex: 'unspecified' },
    })),
  ),
  ...['1992-01-12', '2024-03-10'].map((date) => ({
    caseId: `unknown-time-${date}`,
    birth: { calendarType: 'solar', date, time: null, sex: 'unspecified' },
  })),
  {
    caseId: 'same-birth-control-2024-03-10-12:30',
    birth: {
      calendarType: 'solar',
      date: '2024-03-10',
      time: '12:30',
      sex: 'unspecified',
    },
  },
];

async function listenEphemeral(server) {
  await new Promise((ok, fail) => {
    server.once('error', fail);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', fail);
      ok();
    });
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new TypeError('No preview loopback address');
  }
  return `http://127.0.0.1:${address.port}`;
}

async function close(server) {
  if (!server.listening) return;
  await new Promise((ok, fail) => server.close((error) => (error ? fail(error) : ok())));
}

async function main() {
  const outputPath = resolve(process.argv[2] ?? 'natal-personalization-baseline.json');
  const runtime = createMyeonghwaProductionPreviewOnlyCalculationProcessV1({
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: bearer,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  });
  const inputs = [];
  const researchRuleEvidence = [];
  const auditNow = new Date('2026-10-15T00:00:00.000Z');
  const registry = createGeneralNatalIntegratedReadingRegistry(auditNow.toISOString());
  const origin = await listenEphemeral(runtime.server);
  try {
    for (const fixture of fixtures) {
      const response = await globalThis.fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${bearer}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ birth: fixture.birth, reading: { text: '사주' } }),
      });
      if (!response.ok) {
        throw new Error(`Preview HTTP ${response.status} for ${fixture.caseId}`);
      }
      const [year, month, day] = fixture.birth.date.split('-').map(Number);
      if (year === undefined || month === undefined || day === undefined) {
        throw new TypeError(`Invalid audit fixture date: ${fixture.caseId}`);
      }
      const hour = fixture.birth.time === null ? undefined : Number(fixture.birth.time.slice(0, 2));
      const minute = fixture.birth.time === null ? undefined : Number(fixture.birth.time.slice(3, 5));
      const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
        calendarType: 'solar',
        date: { year, month, day },
        time: hour === undefined || minute === undefined
          ? { known: false }
          : { known: true, hour, minute },
        sexForTraditionalCalculation: 'unspecified',
      }, { now: auditNow }).snapshot;
      researchRuleEvidence.push({
        caseId: fixture.caseId,
        snapshotId: snapshot.snapshotId,
        interpretation: runInterpretation(snapshot, registry, {
          requestId: `n3-quality-audit-${fixture.caseId}`,
          now: auditNow,
        }),
      });
      inputs.push({
        caseId: fixture.caseId,
        birthLabel: `${fixture.birth.date} ${fixture.birth.time ?? 'unknown-time'}`,
        response: await response.json(),
      });
    }
  } finally {
    await close(runtime.server);
  }

  const report = buildNatalPersonalizationBaselineReport(inputs);
  writeFileSync(outputPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  const n3 = buildNatalRuleDifferentiationReport(report, researchRuleEvidence);
  const n3OutputPath = resolve(process.argv[3] ??
    outputPath.replace(/\\.json$/u, '') + '.rules.json');
  writeFileSync(n3OutputPath, JSON.stringify(n3, null, 2) + '\n', 'utf8');
  process.stdout.write(
    `Natal N3 rule/content audit: ${n3.pairsWithSameCopyDifferentFacts.length} copy collisions ` +
      `across distinct charts, ${n3.warningCounts.sameCopyDifferentRules} with different matched rules, ` +
      `${n3.warningCounts.sameCopySameRulesDifferentChart} with identical matched rules; JSON: ${n3OutputPath}\\n`,
  );
  process.stdout.write(
    `Natal N0 preview audit: ${report.numberOfCases} cases, ` +
      `${report.uniqueFactFingerprints} distinct displayed fact sets, ` +
      `${report.uniqueInterpretationFingerprints} distinct interpretation bodies, ` +
      `${report.contrasts.length} contrast warnings; JSON: ${outputPath}\n`,
  );
  process.stdout.write(`Delivery states: ${JSON.stringify(report.responseStates)}\n`);
  if (report.casesWithoutInterpretation.length > 0) {
    process.stdout.write(
      `No interpretation body: ${report.casesWithoutInterpretation.join(', ')}\n`,
    );
  }
  // Observed differences are evidence for N0 triage, not N4/N6 acceptance.
}

await main();
