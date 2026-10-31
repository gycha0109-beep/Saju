export const ROOT_CAUSE_AUDIT_VERSION = 'saju-eight-menu-root-cause-v2';

export function frequency(values) {
  const result = {};
  for (const value of values) result[value] = (result[value] ?? 0) + 1;
  return result;
}


/**
 * Group the *actual delivered text* and keep its exact temporal T9 or annual
 * profile evidence. Same wording across different chart hashes is visible;
 * it must not be confused with different source-grounded meanings.
 */
export function analyzeTemporalRepetition(rows) {
  const clusters = new Map();
  for (const row of rows) {
    const members = clusters.get(row.exactKey) ?? [];
    members.push({
      birth: row.birth,
      calculationHash: row.calculationHash,
      meaningKey: row.meaningKey,
      sourceEvidence: row.sourceEvidence,
    });
    clusters.set(row.exactKey, members);
  }
  const repeated = [...clusters.entries()]
    .filter(([,members]) => members.length > 1)
    .sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([textHash,members]) => ({
      textHash,
      count: members.length,
      distinctChartCount: new Set(members.map(m => m.calculationHash)).size,
      distinctMeaningProfileCount: new Set(members.map(m => m.meaningKey)).size,
      members,
    }));
  const casesInRepeatedGroups = repeated.reduce((sum,x)=>sum+x.count,0);
  return {
    generated: rows.length,
    repeatedGroupCount: repeated.length,
    casesInRepeatedGroups,
    largestGroupSize: repeated[0]?.count ?? 0,
    repeatedGroups: repeated,
  };
}


/**
 * Group actual missing-reading evidence by the same failure boundary and
 * upstream T5 theme signature. These groups are implementation triage,
 * not new Wealth claims, and never assume an absent T5 means absent money.
 */
export function buildWealthRemediationGroups(cases) {
  const targets = {
    birth_time_unresolved: 'input_completeness',
    no_active_upstream_t5_theme: 'upstream_t5_availability',
    wealth_t5_exists_but_no_registered_same_channel_combination: 'source_backed_rule_coverage',
    no_active_wealth_t5_in_either_observation_channel: 'direct_wealth_t5_evidence_unavailable',
    eligible_rule_did_not_emit_wealth_claim: 'rule_execution',
    wealth_claim_not_selected_by_reading_profile: 'evidence_selection',
    selected_claim_not_rendered_as_wealth_section: 'report_rendering',
  };
  const groups = new Map();
  for (const row of cases) {
    if (!row || typeof row.cause !== 'string' ||
        typeof row.calculationHash !== 'string' ||
        !Array.isArray(row.upstream?.availableT5ClaimTypes) ||
        !Array.isArray(row.rules?.eligibleRuleIds) ||
        typeof row.selection?.coverageState !== 'string') {
      throw new TypeError('Wealth remediation groups require real per-case diagnostic evidence');
    }
    const t5ThemeTypes = [...new Set(row.upstream.availableT5ClaimTypes)].sort();
    const eligibleRuleIds = [...new Set(row.rules.eligibleRuleIds)].sort();
    const remediationTarget = targets[row.cause] ?? 'unclassified_manual_review';
    const groupIdentity = {
      cause: row.cause,
      remediationTarget,
      t5ThemeTypes,
      eligibleRuleIds,
      coverageState: row.selection.coverageState,
    };
    const key = JSON.stringify(groupIdentity);
    const group = groups.get(key) ?? {
      ...groupIdentity, count: 0, cases: [],
    };
    group.count += 1;
    group.cases.push({birth: row.birth, calculationHash: row.calculationHash});
    groups.set(key, group);
  }
  const sorted = [...groups.values()].sort((a,b) =>
    b.count - a.count || a.cause.localeCompare(b.cause) ||
    JSON.stringify(a.t5ThemeTypes).localeCompare(JSON.stringify(b.t5ThemeTypes)));
  return {
    caseCount: cases.length,
    groupCount: sorted.length,
    largestGroupSize: sorted[0]?.count ?? 0,
    byRemediationTarget: frequency(cases.map(row =>
      targets[row.cause] ?? 'unclassified_manual_review')),
    groups: sorted,
  };
}

/**
 * Meaning-profile clusters must be inspected separately from exact text:
 * changing a date, stem, or section order may change copy without adding a
 * genuinely independent interpretation.
 */
export function analyzeTemporalMeaningRepetition(rows) {
  const groups = new Map();
  for (const row of rows) {
    if (typeof row.meaningKey !== 'string' || typeof row.exactKey !== 'string') {
      throw new TypeError('Temporal meaning diagnosis requires both existing audit keys');
    }
    const members = groups.get(row.meaningKey) ?? [];
    members.push({
      birth: row.birth,
      calculationHash: row.calculationHash,
      exactKey: row.exactKey,
      sourceEvidence: row.sourceEvidence,
    });
    groups.set(row.meaningKey, members);
  }
  const repeatedGroups = [...groups.entries()]
    .filter(([, members]) => members.length > 1)
    .sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([meaningProfileKey, members]) => ({
      meaningProfileKey,
      count: members.length,
      distinctChartCount: new Set(members.map(row => row.calculationHash)).size,
      distinctExactTextCount: new Set(members.map(row => row.exactKey)).size,
      members,
    }));
  return {
    generated: rows.length,
    distinctMeaningProfileCount: groups.size,
    repeatedGroupCount: repeatedGroups.length,
    casesInRepeatedGroups: repeatedGroups.reduce((total, x) => total + x.count, 0),
    largestGroupSize: repeatedGroups[0]?.count ?? 0,
    repeatedGroups,
  };
}

export function summarizeMissingWealthCauses(cases) {
  const byCause = frequency(cases.map(row => row.cause));
  return {
    missingCaseCount: cases.length,
    byCause,
    remediation: buildWealthRemediationGroups(cases),
    casesWithHiddenWealthMembership: cases.filter(row =>
      row.existingSourceThemeContext?.wealthConclusionAuthorized === false &&
      row.existingSourceThemeContext?.hiddenWealthMembership?.length > 0).length,
    hiddenWealthObservationCount: cases.reduce((sum, row) =>
      sum + (row.existingSourceThemeContext?.hiddenWealthMembership?.length ?? 0), 0),
    casesWithExistingSourceContext: cases.filter(row =>
      row.existingSourceThemeContext?.themeCount > 0 &&
      row.existingSourceThemeContext.wealthConclusionAuthorized === false).length,
    allCasesHaveExplicitCause: cases.every(row =>
      row.cause && row.cause !== 'unknown' && row.calculationHash &&
      row.selection?.coverageState && row.rules?.totalRegistered > 0),
    cases,
  };
}
