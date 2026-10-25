import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';

const [, , auditPath, qualityPath, contrastPath, outputPath] = process.argv;
if (!auditPath || !qualityPath || !contrastPath) {
  throw new TypeError('Usage: node scripts/saju-500-research-closeout.mjs AUDIT QUALITY CONTRAST [OUTPUT]');
}
const audit = JSON.parse(readFileSync(auditPath, 'utf8'));
const quality = JSON.parse(readFileSync(qualityPath, 'utf8'));
const contrast = JSON.parse(readFileSync(contrastPath, 'utf8'));
const errors = [];
const rows = audit.caseRows ?? audit.auditCaseRows;
const menus = ['전체 사주', '직업·커리어', '재물', '연애·관계', '사업', '올해', '이번 달', '삶의 단계'];
if (audit.seed !== '0x5a1a2026' || audit.count !== 500 ||
    audit.uniqueCalculationHashes !== 500 || audit.failedCases !== 0 ||
    menus.some(menu => rows?.[menu]?.length !== 500)) {
  errors.push('Missing or invalid exact fixed-seed 500-person, eight-menu run');
}
if (quality.status !== 'PASS_WITH_RESEARCH_SCOPE_LIMITATIONS' ||
    quality.errors?.length || quality.auditedBirths !== 500 ||
    quality.finalInterpretationReadiness?.productReady !== false ||
    quality.finalInterpretationReadiness?.officialReleaseAuthorized !== false ||
    quality.distinctGroundedRuleAndSourceProfiles < 100) {
  errors.push('Evidence trace gate or research/production boundary not established');
}
if (contrast.status !== 'RESEARCH_CONTRASTS_VERIFIED_NOT_PREDICTIONS' ||
    contrast.errors?.length || contrast.seed !== audit.seed ||
    !contrast.annual?.sourceTracedContrastingExamples?.length ||
    !contrast.monthly?.sourceTracedContrastingExamples?.length) {
  errors.push('Contrasting same-theme charts are missing exact source evidence');
}
function wealthCategory(row) {
  const axes = row.meaningComponents.map(item => item[2]);
  if (axes.some(axis => ['core', 'creation', 'management', 'planning'].includes(axis))) {
    return 'direct_t8_structural_core';
  }
  if (axes.some(axis => axis === 'tension')) return 'tension_only_no_direct_core';
  if (axes.length && axes.every(axis => axis === 'context')) return 'indirect_context_only';
  if (row.singleWealthT5Observation && row.sectionCount === 0) {
    return 'isolated_t5_not_t8_synthesis';
  }
  if (row.text.trim().length === 0 && row.sectionCount === 0) return 'no_readable_sourced_wealth';
  return 'unclassified_not_sufficient';
}
const categories = Object.fromEntries([
  'direct_t8_structural_core', 'tension_only_no_direct_core',
  'indirect_context_only', 'isolated_t5_not_t8_synthesis',
  'no_readable_sourced_wealth', 'unclassified_not_sufficient',
].map(key => [key, 0]));
for (const row of rows?.['재물'] ?? []) categories[wealthCategory(row)]++;
const totalCategories = Object.values(categories).reduce((a,b) => a+b,0);
if (totalCategories !== 500 || categories.unclassified_not_sufficient !== 0 ||
    categories.indirect_context_only !== quality.menuChecks?.['재물']?.indirectWealthContextOnlyCases ||
    categories.isolated_t5_not_t8_synthesis !==
      quality.menuChecks?.['재물']?.observedSingleT5WealthWithoutSynthesis) {
  errors.push('Wealth coverage classification must account for all 500 cases without promoting context-only observations');
}
function timeCoverage(menu) {
  const cases = rows?.[menu] ?? [];
  const selectedThemePatterns = new Set();
  let casesWithSixPair = 0;
  let casesWithIndependentNatal = 0;
  let sixPairSections = 0;
  for (const row of cases) {
    const e = row.sourceEvidence ?? {};
    const themes = (e.sections ?? []).filter(section =>
      menu === '올해' ? section.kind === 'core' :
      section.kind === 'theme' && section.segmentId === e.referenceSegment);
    if (themes.length !== 1 || !themes[0].claimId || !themes[0].sourceIds?.length) {
      errors.push(menu + ': exactly one selected T9 primary theme must be checked against real evidence');
      continue;
    }
    selectedThemePatterns.add(JSON.stringify([
      themes[0].sourceProfileId ?? themes[0].tenGod,
      themes[0].candidateClaimType ?? 'monthly_t9_theme',
    ]));
    const six = (e.sections ?? []).filter(section => section.kind === 'structural_context');
    sixPairSections += six.length;
    if (six.length) casesWithSixPair++;
    if ((e.natalCorrespondences ?? []).length) casesWithIndependentNatal++;
    for (const structural of six) {
      if (!structural.methodologyId?.includes('CLASSICAL-SIX-PAIR-OBSERVATION') ||
          !structural.sourceIds?.includes('SRC-T0-YISI-ZHAN-10') ||
          !structural.sourceIds?.includes('SRC-T0-XUANZE-YAOLUE-UPPER')) {
        errors.push(menu + ': classical pairing source and research-methodology missing');
      }
    }
  }
  return {
    sourceBoundPrimaryT9ThemeProfiles: selectedThemePatterns.size,
    exactSourceBoundClassicalPairSections: sixPairSections,
    birthCasesWithClassicalPair: casesWithSixPair,
    birthCasesWithIndependentNatalT8Context: casesWithIndependentNatal,
    observedFullMeaningProfiles: quality.menuChecks?.[menu]?.distinctMeaningProfiles,
    semanticStatus: 'independent_t8_plus_t9_context_not_validated_life_prediction',
  };
}
const annual = timeCoverage('올해');
const monthly = timeCoverage('이번 달');
if (annual.exactSourceBoundClassicalPairSections === 0 ||
    monthly.exactSourceBoundClassicalPairSections === 0 ||
    annual.sourceBoundPrimaryT9ThemeProfiles < 2 ||
    monthly.sourceBoundPrimaryT9ThemeProfiles < 2) {
  errors.push('No effective chart-specific period/natal structural T9 rule coverage');
}
const result = {
  version: 'saju-500-eight-menu-source-bounded-research-closeout-v1',
  status: errors.length ? 'FAIL' : 'RESEARCH_IMPLEMENTATION_VERIFIED_PRODUCT_NOT_READY',
  sourceRun: { seed: audit.seed, births: audit.count, menus: menus.length },
  baseline: {
    wealthPreviouslyEmpty: 111,
    annualPreviouslyDifferentMeaningProfiles: 56,
    monthlyPreviouslyDifferentMeaningProfiles: 131,
  },
  wealth: {
    classifiedBirths: totalCategories,
    ...categories,
    directSynthesisMissing: 500 - categories.direct_t8_structural_core,
    importantCaveat: 'Direct T8 core means one source-bounded structure, not usefulComplete or actual financial performance.',
  },
  annual, monthly,
  quality: {
    sourceTracedRuleProfiles: quality.distinctGroundedRuleAndSourceProfiles,
    errors: audit.failedCases,
    allNarrativesOfficiallyAdmitted: false,
    lifeStageSemanticStatus: 'calendar_intervals_only_not_life_stage_interpretations',
  },
  conclusion: [
    '500-person calculation and evidence-chain integrity can pass while product-level saju interpretation is not sufficiently supported.',
    'Source-verified period/natal six-pair observations are real differences but not evidence that personal outcomes or future events were predicted.',
    'Direct wealth gaps, contextual-only paragraphs and isolated T5 facts are explicitly classified, not filled with invented prosperity claims.',
    'Research stage has a reproducible adjudication; product/official/publish/sell remains disallowed.',
  ],
  errors,
};
if (outputPath) writeFileSync(outputPath, JSON.stringify(result, null, 2) + '\n', 'utf8');
process.stdout.write('SAJU500_CLOSEOUT ' + JSON.stringify(result) + '\n');
if (errors.length) process.exitCode = 1;
