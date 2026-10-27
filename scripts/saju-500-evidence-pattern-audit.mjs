import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import console from 'node:console';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/saju-500-evidence-pattern-audit.mjs audit.json output.json');
}
const audit = JSON.parse(readFileSync(inputPath, 'utf8'));
if (audit.seed !== '0x5a1a2026' || audit.count !== 500 || audit.failedCases !== 0) {
  throw new Error('Only the fixed, successful 500-case experiment can be compared.');
}
const eligible = [];
for (const [menu, rows] of Object.entries(audit.caseResults ?? {})) {
  for (const row of rows) {
    if (!row.text || !row.selectedEvidenceSignature) continue;
    const e = row.selectedEvidence;
    const natal = Array.isArray(e) && e.some(s =>
      s.claimType && s.ruleId && s.sourceIds?.length > 0 && s.factPaths?.length > 0);
    const monthly = menu === '이번 달' && Array.isArray(e?.sections) &&
      e.sections.some(s => s.ruleIds?.length > 0 && s.sourceIds?.length > 0 &&
        s.factPaths?.length > 0);
    // The Annual policy contains an internal projected profile, not
    // an executed source-authorized T9 Claim; exclude it from this census.
    if (!natal && !monthly) continue;
    eligible.push({ menu, birth: row.birth,
      calculationHash: row.calculationHash,
      meaningSignature: row.meaningSignature,
      selectedEvidenceSignature: row.selectedEvidenceSignature,
      selectedEvidence: e,
      exactTextHash: row.exactTextHash,
      koreanText: row.text,
      researchOnly: true,
    });
  }
}
const byEvidence = new Map();
const byMeaning = new Map();
for (const row of eligible) {
  const ek = row.menu + '/' + row.selectedEvidenceSignature;
  const mk = row.menu + '/' + row.meaningSignature;
  if (!byEvidence.has(ek)) byEvidence.set(ek, []);
  if (!byMeaning.has(mk)) byMeaning.set(mk, []);
  byEvidence.get(ek).push(row);
  byMeaning.get(mk).push(row);
}
const patterns = [...byEvidence.entries()].map(([key, rows]) => ({
  key,
  menu: rows[0].menu,
  selectedEvidenceSignature: rows[0].selectedEvidenceSignature,
  caseCount: rows.length,
  birthExample: rows[0].birth,
  selectedEvidence: rows[0].selectedEvidence,
}));
patterns.sort((a,b) => a.menu.localeCompare(b.menu, 'ko') ||
  a.selectedEvidenceSignature.localeCompare(b.selectedEvidenceSignature));
const menuNames = [...new Set(patterns.map(row => row.menu))].sort((a,b) => a.localeCompare(b, 'ko'));
const grouped = new Map(menuNames.map(name => [name, patterns.filter(row => row.menu === name)]));
const inspectedPatterns = [];
for (let offset = 0; inspectedPatterns.length < 100; offset++) {
  let collected = false;
  for (const name of menuNames) {
    const row = grouped.get(name)?.[offset];
    if (!row) continue;
    inspectedPatterns.push(row);
    collected = true;
    if (inspectedPatterns.length === 100) break;
  }
  if (!collected) break;
}
const sameEvidenceDifferentText = [...byEvidence.values()]
  .filter(rows => new Set(rows.map(x => x.exactTextHash)).size > 1)
  .map(rows => ({
    menu: rows[0].menu,
    signatures: [rows[0].selectedEvidenceSignature],
    births: rows.slice(0,3).map(x => x.birth),
    meaningSignatures: [...new Set(rows.map(x => x.meaningSignature))],
    textVariants: new Set(rows.map(x => x.exactTextHash)).size,
  }));
const sameCoarseMeaningDifferentEvidence = [...byMeaning.values()]
  .filter(rows => new Set(rows.map(x => x.selectedEvidenceSignature)).size > 1)
  .map(rows => ({
    menu: rows[0].menu,
    meaningSignature: rows[0].meaningSignature,
    evidenceVariants: new Set(rows.map(x => x.selectedEvidenceSignature)).size,
    birthExamples: rows.slice(0,3).map(x => x.birth),
  }));
const eligiblePairs = [];
for (const rows of byMeaning.values()) {
  const firstByEvidence = new Map();
  for (const row of rows) {
    if (!firstByEvidence.has(row.selectedEvidenceSignature)) {
      firstByEvidence.set(row.selectedEvidenceSignature, row);
    }
  }
  const witnesses = [...firstByEvidence.values()];
  if (witnesses.length < 2) continue;
  const first = witnesses[0], second = witnesses[1];
  eligiblePairs.push({
    menu: first.menu,
    sharedCoarseMeaningSignature: first.meaningSignature,
    first: {
      birth: first.birth,
      selectedEvidenceSignature: first.selectedEvidenceSignature,
      sourceBoundEvidence: first.selectedEvidence,
      koreanTextHash: first.exactTextHash,
      koreanText: first.koreanText,
    },
    second: {
      birth: second.birth,
      selectedEvidenceSignature: second.selectedEvidenceSignature,
      sourceBoundEvidence: second.selectedEvidence,
      koreanTextHash: second.exactTextHash,
      koreanText: second.koreanText,
    },
    meaningDifferenceEstablished: false,
    evidenceDifferenceEstablished: true,
  });
}
const pairMenus = new Map(menuNames.map(name => [name, eligiblePairs.filter(pair => pair.menu === name)]));
const controlledPairs = [];
for (let offset = 0; controlledPairs.length < 100; offset++) {
  let found = false;
  for (const name of menuNames) {
    const pair = pairMenus.get(name)?.[offset];
    if (!pair) continue;
    controlledPairs.push(pair);
    found = true;
    if (controlledPairs.length === 100) break;
  }
  if (!found) break;
}
const report = {
  scope: 'Research-only source-qualified selected evidence, not 100 authorized distinct fortunes',
  count: audit.count, seed: audit.seed, reference: '2026-10-25T00:00:00.000Z',
  distinctSourceBoundEvidencePatterns: patterns.length,
  atLeast100Observed: patterns.length >= 100,
  inspectedPatterns,
  sampledMenus: Object.fromEntries(menuNames.map(name => [name,
    inspectedPatterns.filter(row => row.menu === name).length])),
  controlledPairs,
  atLeast100ControlledPairs: controlledPairs.length >= 100,
  controlledPairMenus: Object.fromEntries(menuNames.map(name => [name,
    controlledPairs.filter(pair => pair.menu === name).length])),
  sameEvidenceConsistentText: sameEvidenceDifferentText.length === 0,
  sameEvidenceDifferentText,
  sameCoarseMeaningDifferentEvidence,
  exclusions: {
    annual: 'Internal policy profile; not an executed official T9 Claim',
    lifeStage: 'Dayun period computation; not independent period interpretation',
    missingInterpretation: 'Coverage explanation is not an invented T8 meaning',
  },
};
writeFileSync(outputPath, JSON.stringify(report,null,2)+'\n','utf8');
console.log('SAJU500_EVIDENCE_PATTERNS ' + JSON.stringify({
  distinct: patterns.length,
  sampled: report.inspectedPatterns.length,
  sameEvidenceDifferentTextGroups: sameEvidenceDifferentText.length,
  sameCoarseMeaningDifferentEvidenceGroups: sameCoarseMeaningDifferentEvidence.length,
  atLeast100Observed: report.atLeast100Observed,
}));
if (!report.atLeast100Observed) process.exitCode = 1;
