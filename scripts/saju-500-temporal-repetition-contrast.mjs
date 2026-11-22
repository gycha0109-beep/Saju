import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import console from 'node:console';
import { fileURLToPath } from 'node:url';

export const SAJU_TEMPORAL_REPETITION_CONTRAST_VERSION = 'saju-temporal-repeat-cause-v1';

function diagnoseGroup(menu, group) {
  const members = group.members;
  const comparisonSets = members.map((member) => member.sourceEvidence?.natalComparison ?? []);
  const matchedCounts = comparisonSets.map((items) =>
    items.reduce((n, item) => n + item.natalMatches.length, 0),
  );
  const allUnmatched = matchedCounts.every((n) => n === 0);
  const distinctComparisonCount = new Set(comparisonSets.map(JSON.stringify)).size;
  const distinctProfileCount = new Set(members.map((x) => x.meaningKey)).size;
  const periodRuleSignatures = members.map((member) =>
    menu === 'annual'
      ? (member.sourceEvidence.sections ?? []).map((s) => [s.sourceProfileId, s.relatedPillar])
      : (member.sourceEvidence.sections ?? []).map((s) => [
          s.ruleIds,
          s.relatedPillar,
          s.segmentId,
        ]),
  );
  const distinctPeriodRuleSignatures = new Set(periodRuleSignatures.map(JSON.stringify)).size;
  const cause =
    distinctProfileCount > 1 || distinctPeriodRuleSignatures > 1 || distinctComparisonCount > 1
      ? 'different_source_evidence_same_output_requires_review'
      : allUnmatched
        ? 'same_period_profile_no_selected_natal_t8_context'
        : 'same_period_profile_same_selected_natal_t8_context';
  return {
    textHash: group.textHash,
    count: members.length,
    distinctCharts: new Set(members.map((m) => m.calculationHash)).size,
    distinctCoreProfiles: distinctProfileCount,
    distinctPeriodRuleSignatures,
    distinctNatalComparisons: distinctComparisonCount,
    withMatchedNatalContext: matchedCounts.filter((n) => n > 0).length,
    cause,
    examples: members.slice(0, 3).map((m) => ({
      birth: m.birth,
      calculationHash: m.calculationHash,
      meaningKey: m.meaningKey,
      sourceEvidence: m.sourceEvidence,
    })),
  };
}

export function analyzeSajuTemporalRepetition(audit) {
  if (
    audit.seed !== '0x5a1a2026' ||
    audit.count !== 500 ||
    audit.failedCases !== 0 ||
    audit.uniqueCalculationHashes !== 500 ||
    audit.rootCauseDiagnostics?.annualRepetition?.generated !== 500 ||
    audit.rootCauseDiagnostics?.monthlyRepetition?.generated !== 500
  ) {
    throw new Error('Only the exact successful 500-chart fixed-seed temporal audit is admissible');
  }
  const annual = audit.rootCauseDiagnostics.annualRepetition;
  const monthly = audit.rootCauseDiagnostics.monthlyRepetition;
  const table = [
    ['annual', '올해', annual],
    ['monthly', '이번 달', monthly],
  ].map(([menu, label, root]) => {
    const groups = root.repeatedGroups.map((g) => diagnoseGroup(menu, g));
    const byCause = Object.fromEntries(
      [...new Set(groups.map((g) => g.cause))].sort().map((cause) => [
        cause,
        {
          groups: groups.filter((g) => g.cause === cause).length,
          cases: groups.filter((g) => g.cause === cause).reduce((n, g) => n + g.count, 0),
        },
      ]),
    );
    const unsupportedRepeat = groups.filter(
      (g) => g.cause === 'different_source_evidence_same_output_requires_review',
    );
    const summary = audit.menuResults[label];
    return {
      menu,
      label,
      totalCharts: 500,
      coreSemanticProfiles: summary.meaningProfile.unique,
      exactRenderedTexts: summary.exactText.unique,
      repeatedGroups: groups.length,
      repeatedCases: root.casesInRepeatedGroups,
      largestRepeatedGroup: root.largestGroupSize,
      groupsWithoutSelectedNatalT8: byCause.same_period_profile_no_selected_natal_t8_context ?? {
        groups: 0,
        cases: 0,
      },
      groupsWithSameSelectedNatalT8: byCause.same_period_profile_same_selected_natal_t8_context ?? {
        groups: 0,
        cases: 0,
      },
      distinctEvidenceSameText: {
        groups: unsupportedRepeat.length,
        cases: unsupportedRepeat.reduce((n, g) => n + g.count, 0),
      },
      causeGroups: byCause,
      cases: groups,
    };
  });
  return {
    version: SAJU_TEMPORAL_REPETITION_CONTRAST_VERSION,
    sampleSeed: audit.seed,
    count: audit.count,
    executionErrors: audit.failedCases,
    interpretationCaveat:
      'Different text due to selected natal T8 co-observations is contextual evidence, not independently established annual/monthly T9 meaning. Repetition with identical selected evidence is not automatically an error.',
    menus: table,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) {
    console.error(
      'Usage: node scripts/saju-500-temporal-repetition-contrast.mjs <500-audit.json> <comparison-output.json>',
    );
    process.exitCode = 2;
  } else {
    const report = analyzeSajuTemporalRepetition(JSON.parse(fs.readFileSync(input, 'utf8')));
    fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', 'utf8');
    console.log(
      JSON.stringify(
        report.menus.map((menu) => ({
          menu: menu.label,
          core: menu.coreSemanticProfiles,
          outputText: menu.exactRenderedTexts,
          repeatedCases: menu.repeatedCases,
          noSelectedNatalContext: menu.groupsWithoutSelectedNatalT8,
          identicalNatalContext: menu.groupsWithSameSelectedNatalT8,
          distinctEvidenceSameText: menu.distinctEvidenceSameText,
        })),
        null,
        2,
      ),
    );
    if (report.menus.some((menu) => menu.distinctEvidenceSameText.groups > 0)) process.exitCode = 1;
  }
}
