import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import process from 'node:process';
import { runNatalS6QualityRegression } from '../dist/preview/natal-five-domain-quality-regression.js';

// npm run build
// node scripts/natal-five-domain-quality-regression.mjs /tmp/natal-s6-quality
// Emits real Canonical-derived Korean HTML for every case plus complete
// claim/source/fact-path and meaningful-contrast review manifest.
const outputDirectory = resolve(process.argv[2] ?? 'natal-s6-quality');
const audit = runNatalS6QualityRegression();
mkdirSync(outputDirectory, { recursive: true });
const cases = audit.cases.map(({ html, ...record }) => {
  const outputHtml = join(outputDirectory, record.caseId + '.html');
  writeFileSync(outputHtml, html, 'utf8');
  return { ...record, outputHtml };
});
const summary = {
  version: audit.version,
  birthCaseCount: cases.length,
  contrastPairCount: audit.contrasts.length,
  differentiatedPairCount: audit.differentiatedPairCount,
  domainStateCounts: Object.fromEntries(
    ['general', 'career', 'wealth', 'business', 'relationship'].map(domain => [
      domain,
      Object.fromEntries(['complete', 'partial', 'insufficient'].map(state => [
        state, cases.filter(row => row.domains.some(d => d.domain === domain && d.state === state)).length,
      ])),
    ]),
  ),
  researchOnly: audit.researchOnly,
  usefulComplete: audit.usefulComplete,
  mayPublish: audit.mayPublish,
  maySell: audit.maySell,
  productMeaningSufficiencyProven: audit.productMeaningSufficiencyProven,
};
const manifest = join(outputDirectory, 'quality-manifest.json');
writeFileSync(manifest, JSON.stringify({
  ...summary, cases, contrasts: audit.contrasts,
}, null, 2) + '\n', 'utf8');
process.stdout.write(JSON.stringify({ ...summary, manifest }, null, 2) + '\n');
