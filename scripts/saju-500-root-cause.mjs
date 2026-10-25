import { buildReadingCompositionEvidence } from '../dist/reading/reading-intent-composition.js';

export const ROOT_CAUSE_AUDIT_VERSION = 'saju-eight-menu-root-cause-v1';

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
    cause = 'no_registered_wealth_pair_or_triple_in_observed_t5';
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

export function summarizeMissingWealthCauses(cases) {
  const byCause = frequency(cases.map(row => row.cause));
  return {
    missingCaseCount: cases.length,
    byCause,
    allCasesHaveExplicitCause: cases.every(row =>
      row.cause && row.cause !== 'unknown' && row.calculationHash &&
      row.selection?.coverageState && row.rules?.totalRegistered > 0),
    cases,
  };
}
