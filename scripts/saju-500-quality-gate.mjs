import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const [, , inputPath, outputPath] = process.argv;
if (!inputPath) throw new TypeError('Usage: node scripts/saju-500-quality-gate.mjs AUDIT.json [REPORT.json]');
const audit = JSON.parse(readFileSync(inputPath, 'utf8'));
const menus = ['전체 사주', '직업·커리어', '재물', '연애·관계', '사업', '올해', '이번 달', '삶의 단계'];
const natal = new Set(menus.slice(0, 5));
const errors = [];
const meaningPatterns = new Set();
const groundedPatterns = new Set();
const stats = {};
if (audit.seed !== '0x5a1a2026' || audit.count !== 500 ||
    audit.attempted !== 500 || audit.failedCases !== 0 ||
    audit.uniqueBirthDateTimes !== 500 || audit.uniqueCalculationHashes !== 500) {
  errors.push('The audit must use the original exact 500-person deterministic calculation basis without execution failures');
}
if (audit.permissions?.mayPublish || audit.permissions?.maySell ||
    audit.permissions?.mayCallOfficial) errors.push('Research findings must not be published or sold');
const rows = audit.caseRows ?? audit.auditCaseRows;
if (!rows) errors.push('The audit must include per-person rows, enabled by SAJU_500_INCLUDE_CASE_ROWS=1');
for (const menu of menus) {
  const cases = rows?.[menu] ?? [];
  const uniqueBirths = new Set(cases.map(row => row.birth));
  if (cases.length !== 500 || uniqueBirths.size !== 500) {
    errors.push(menu + ': expected exactly 500 distinct birth identities');
    continue;
  }
  let sectionsWithExactSource = 0;
  let sectionsWithoutSource = 0;
  let observedCorrespondences = 0;
  const textKeys = new Set();
  const meaningKeys = new Set();
  for (const row of cases) {
    if (!row.calculationHash || !row.exactKey || !row.meaningKey) {
      errors.push(menu + ': an audited birth has missing calculation/meaning identity');
      continue;
    }
    textKeys.add(row.exactKey);
    meaningKeys.add(row.meaningKey);
    const evidence = row.sourceEvidence;
    if (natal.has(menu)) {
      for (const section of Array.isArray(evidence) ? evidence : []) {
        const grounded = section.claimType && section.ruleId &&
          section.sourceIds?.length && section.upstreamClaimIds?.length &&
          section.observedFactPaths?.length;
        if (grounded) {
          sectionsWithExactSource++;
          groundedPatterns.add(JSON.stringify([menu, section.claimType, section.axis, section.channel,
            section.ruleId, section.sourceIds]));
        } else {
          sectionsWithoutSource++;
        }
      }
    } else if (menu === '올해' || menu === '이번 달') {
      const sections = evidence?.sections ?? [];
      for (const section of sections) {
        const sources = section.sourceIds ?? [];
        const rules = section.ruleIds ?? [];
        const paths = section.factPaths ?? section.calculatedFactPaths ?? [];
        if (sources.length && rules.length && paths.length) {
          sectionsWithExactSource++;
          groundedPatterns.add(JSON.stringify([menu, section.candidateClaimType ?? section.kind,
            section.sourceProfileId ?? section.segmentId ?? null, rules, sources]));
        } else {
          sectionsWithoutSource++;
        }
      }
      const correspondence = evidence?.natalCorrespondences ?? [];
      for (const relation of correspondence) {
        if (relation.authority !== 'observed_natal_context_not_temporal_outcome' ||
            !relation.temporalClaimId || !relation.temporalSourceIds?.length ||
            !relation.temporalFactPaths?.length || !relation.natalRuleId ||
            !relation.natalSourceIds?.length || !relation.natalFactPaths?.length) {
          errors.push(menu + ': ungrounded or overclaimed natal/temporal correspondence');
        } else {
          observedCorrespondences++;
          groundedPatterns.add(JSON.stringify([menu, relation.sharedFamily,
            relation.natalClaimType, relation.natalPattern, relation.natalRuleId,
            relation.natalSourceIds]));
        }
      }
    }
    meaningPatterns.add(menu + '/' + row.meaningKey);
  }
  if (sectionsWithoutSource) errors.push(menu + ': ' + sectionsWithoutSource + ' delivered research sections have no exact source/rule trace');
  stats[menu] = {
    distinctBirths: uniqueBirths.size,
    distinctText: textKeys.size,
    distinctMeaningProfiles: meaningKeys.size,
    sourceTracedSections: sectionsWithExactSource,
    ungroundedSections: sectionsWithoutSource,
    observedNatalTemporalCorrespondences: observedCorrespondences,
    emptyTexts: cases.filter(row => !row.text?.trim()).length,
  };
}
if (groundedPatterns.size < 100) errors.push('Fewer than 100 distinct actually consumed rule/source profiles');
const result = {
  status: errors.length ? 'FAIL' : 'PASS_WITH_RESEARCH_SCOPE_LIMITATIONS',
  auditSeed: audit.seed,
  auditedBirths: audit.count,
  executedMenus: menus.length,
  distinctMenuMeaningProfiles: meaningPatterns.size,
  distinctGroundedRuleAndSourceProfiles: groundedPatterns.size,
  menuChecks: stats,
  limitations: [
    'An exact text difference or distinct rule/source combination is not a proven difference in life outcomes.',
    'Natal/temporal correspondences are independently grounded research observations, not a new T9 combined predictive claim.',
    'A 100+ source-traced profile count alone does not authorize a production-quality reading.',
    'Life-stage intervals remain calculated intervals rather than independently validated phase interpretation.',
    'Coverage, scientific validity, official publication, and sale permission remain separate.',
  ],
  errors,
};
if (outputPath) writeFileSync(outputPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
process.stdout.write('SAJU500_QUALITY ' + JSON.stringify(result) + '\n');
if (errors.length) process.exitCode = 1;
