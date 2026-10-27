import { readFileSync, writeFileSync } from 'node:fs';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/saju-500-evidence-pattern-audit.mjs audit.json output.json');
}
const audit = JSON.parse(readFileSync(inputPath, 'utf8'));
if (audit.seed !== '0x5a1a2026' || audit.count !== 500 || audit.failedCases !== 0) {
  throw new Error('Only the fixed, successful 500-case experiment can be compared.');
}
const eligible = [];
const scope = [];
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
const report = {
  scope: 'Research-only source-qualified selected evidence, not 100 authorized distinct fortunes',
  count: audit.count, seed: audit.seed, reference: '2026-10-25T00:00:00.000Z',
  distinctSourceBoundEvidencePatterns: patterns.length,
  atLeast100Observed: patterns.length >= 100,
  inspectedPatterns: patterns.slice(0,100),
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
