import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { calculateCanonicalSajuSnapshot } from '../dist/calculation/calculation-engine.js';
import { runInterpretation } from '../dist/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../dist/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../dist/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../dist/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../dist/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../dist/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../dist/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../dist/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../dist/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../dist/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../dist/preview/relationship-natal-multifactor-report.js';
import { renderNatalFiveDomainMultifactorResearchHtml } from '../dist/preview/natal-five-domain-multifactor-reader.js';

// Run after: npm run build
// node scripts/natal-five-domain-multifactor-research-demo.mjs [output.html] [YYYY-MM-DD] [HH:MM|unknown]
// No publishing, persistence or production authority is implied by the generated file.
const output = resolve(process.argv[2] ?? 'natal-five-domain-research-reading.html');
const inputDate = process.argv[3] ?? '2024-03-10';
const inputTime = process.argv[4] ?? '12:00';
const date = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(inputDate);
const time = /^([01]\d|2[0-3]):([0-5]\d)$/u.exec(inputTime);
if (!date || (!time && inputTime !== 'unknown')) {
  throw new TypeError('Usage: node scripts/natal-five-domain-multifactor-research-demo.mjs [output.html] [YYYY-MM-DD] [HH:MM|unknown]');
}
const input = {
  calendarType: 'solar',
  date: { year: Number(date[1]), month: Number(date[2]), day: Number(date[3]) },
  time: time === null ? { known: false } :
    { known: true, hour: Number(time[1]), minute: Number(time[2]) },
  sexForTraditionalCalculation: 'unspecified',
};
const now = new Date('2026-10-19T00:00:00.000Z');
const snapshot = calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
const registries = {
  general: createGeneralNatalMultifactorRegistry(),
  career: createCareerMultifactorResearchRegistry(),
  wealth: createWealthNatalMultifactorRegistry(),
  business: createBusinessNatalMultifactorRegistry(),
  relationship: createRelationshipNatalMultifactorRegistry(),
};
const a = runInterpretation(snapshot, registries.general, { now });
const b = runInterpretation(snapshot, registries.career, { now });
const c = runInterpretation(snapshot, registries.wealth, { now });
const d = runInterpretation(snapshot, registries.business, { now });
const e = runInterpretation(snapshot, registries.relationship, { now });
const reports = {
  general: buildGeneralNatalMultifactorReport(snapshot, a, registries.general),
  career: buildCareerMultifactorResearchReport(snapshot, b, registries.career),
  wealth: buildWealthNatalMultifactorReport(snapshot, c, registries.wealth),
  business: buildBusinessNatalMultifactorReport(snapshot, d, registries.business),
  relationship: buildRelationshipNatalMultifactorReport(snapshot, e, registries.relationship),
};
writeFileSync(output, renderNatalFiveDomainMultifactorResearchHtml(snapshot, reports), 'utf8');
process.stdout.write(JSON.stringify({
  lifecycle: 'internal_research_preview_only',
  researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
  input, snapshotId: snapshot.snapshotId, calculationHash: snapshot.calculationHash,
  domains: Object.fromEntries(Object.entries(reports).map(([domain, report]) => [
    domain,
    { state: report.state, sectionCount: report.sections.length, missing: report.missing },
  ])),
  outputHtml: output,
}, null, 2) + '\n');
