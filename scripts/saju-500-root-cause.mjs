import { buildReadingCompositionEvidence } from '../dist/reading/reading-intent-composition.js';

export const ROOT_CAUSE_AUDIT_VERSION = 'saju-eight-menu-root-cause-v2';

const WEALTH_FILTER = claim =>
  claim.state === 'active' && claim.taxonomy.tier === 'T8' &&
  claim.taxonomy.category === 'wealth' &&
  claim.predicate === 'wealth_multifactor_structure';

function frequency(values) {
  const result = {};
  for (const value of values) result[value] = (result[value] ?? 0) + 1;
  return result;
}

/**
 * Observe the engine's real T5 -> wealth T8 -> EvidenceSelector -> report
 * chain. This is diagnostics ONLY and does not create or rewrite claims.
 */
export function diagnoseMissingWealthReading(snapshot, execution, registry, report, birth) {
  if (report.sections.length !== 0) {
    throw new TypeError('Only an actually empty wealth reading can be classified');
  }
  if (report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      execution.run.snapshotId !== snapshot.snapshotId ||
      execution.run.registrySnapshotId !== registry.snapshot.registrySnapshotId) {
    throw new TypeError('Wealth missing-reading diagnosis must use the exact engine run');
  }
  const t5 = execution.claims.filter(claim =>
    claim.state === 'active' &&
    claim.taxonomy.tier === 'T5' &&
    /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
      .test(claim.claimType));
  const existingTypes = new Set(t5.map(claim => claim.claimType));
  const candidateRules = registry.rules.filter(rule =>
    rule.status === 'research' &&
    rule.taxonomy.tier === 'T8' &&
    rule.taxonomy.category === 'wealth' &&
    rule.output.predicate === 'wealth_multifactor_structure');
  const inputEligibleRules = candidateRules.filter(rule =>
    rule.inputs.every(input => input.source === 'interpretation_claim' &&
      existingTypes.has(input.pathOrClaimType)));
  const evaluations = execution.evaluations.filter(item =>
    candidateRules.some(rule =>
      item.ruleRef.id === rule.ruleId &&
      item.ruleRef.version === rule.version));
  const activeT8 = execution.claims.filter(WEALTH_FILTER);
  const composition = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'saju-500-wealth-root-cause',
    intent: { domain: 'wealth', temporalScope: 'natal' },
  });
  const selectedIds = new Set(composition.selection.selectedClaimIds);
  const selectedT8 = activeT8.filter(claim => selectedIds.has(claim.claimId));

  let cause;
  if (!snapshot.completeness.birthTimeKnown) {
    cause = 'birth_time_unresolved';
  } else if (t5.length === 0) {
    cause = 'no_active_upstream_t5_theme';
  } else if (inputEligibleRules.length === 0 && activeT8.length === 0) {
    const hasWealthTheme = t5.some(claim => claim.claimType.startsWith('TEN_GOD_WEALTH_'));
    cause = hasWealthTheme
      ? 'wealth_t5_exists_but_no_registered_same_channel_combination'
      : 'no_active_wealth_t5_in_either_observation_channel';
  } else if (activeT8.length === 0) {
    cause = 'eligible_rule_did_not_emit_wealth_claim';
  } else if (selectedT8.length === 0) {
    cause = 'wealth_claim_not_selected_by_reading_profile';
  } else {
    cause = 'selected_claim_not_rendered_as_wealth_section';
  }

  return {
    birth,
    calculationHash: snapshot.calculationHash,
    cause,
    reportState: report.state,
    reportMissing: [...report.missing],
    upstream: {
      availableT5ClaimTypes: [...existingTypes].sort(),
      claims: t5.map(claim => ({
        claimType: claim.claimType,
        claimId: claim.claimId,
        factRefs: [...claim.factRefs],
        ruleIds: claim.ruleRefs.map(ref => ref.ruleId),
        sourceRefs: [...claim.sourceRefs],
      })),
    },
    rules: {
      totalRegistered: candidateRules.length,
      eligibleRuleIds: inputEligibleRules.map(rule => rule.ruleId).sort(),
      evaluationsByStatus: frequency(evaluations.map(item => item.status)),
      eligibleRuleEvaluations: evaluations
        .filter(item => inputEligibleRules.some(rule => rule.ruleId === item.ruleRef.id))
        .map(item => ({
          ruleId: item.ruleRef.id,
          status: item.status,
          emittedClaimIds: [...item.emittedClaimIds],
        })),
    },
    emittedWealthClaims: activeT8.map(claim => ({
      claimId: claim.claimId, claimType: claim.claimType,
      factRefs: [...claim.factRefs],
      upstreamClaimRefs: [...claim.upstreamClaimRefs],
      sourceRefs: [...claim.sourceRefs],
    })),
    selection: {
      coverageState: composition.selection.coverageState,
      missingRequirements: [...composition.selection.missingRequirements],
      targetWealthClaimIds: [...composition.selection.targetClaimIds],
      selectedWealthClaimIds: selectedT8.map(claim => claim.claimId),
    },
    reportSectionCount: report.sections.length,
  };
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
    no_active_wealth_t5_in_either_observation_channel: 'source_backed_rule_coverage',
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
    allCasesHaveExplicitCause: cases.every(row =>
      row.cause && row.cause !== 'unknown' && row.calculationHash &&
      row.selection?.coverageState && row.rules?.totalRegistered > 0),
    cases,
  };
}
