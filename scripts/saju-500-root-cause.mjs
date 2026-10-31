import { buildReadingCompositionEvidence } from '../dist/reading/reading-intent-composition.js';

import { frequency } from './saju-500-root-cause-pure.mjs';
export {
  ROOT_CAUSE_AUDIT_VERSION,
  analyzeTemporalRepetition,
  buildWealthRemediationGroups,
  analyzeTemporalMeaningRepetition,
  summarizeMissingWealthCauses,
} from './saju-500-root-cause-pure.mjs';

const WEALTH_FILTER = claim =>
  claim.state === 'active' && claim.taxonomy.tier === 'T8' &&
  claim.taxonomy.category === 'wealth' &&
  claim.predicate === 'wealth_multifactor_structure';


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
    existingSourceThemeContext: report.availableThemeContext
      ? {
          themeCount: report.availableThemeContext.themes.length,
          wealthConclusionAuthorized: report.availableThemeContext.wealthConclusionAuthorized,
          hiddenWealthEvidenceStatus: report.availableThemeContext.hiddenWealthEvidenceStatus,
          hiddenWealthUnavailableReason: report.availableThemeContext.hiddenWealthUnavailableReason ?? null,
          hiddenWealthMembership: report.availableThemeContext.hiddenWealthMembership.map(member => ({
            pillar: member.pillar,
            branch: member.branch,
            hiddenStem: member.hiddenStem,
            derivedTenGod: member.derivedTenGod,
            factPaths: [...member.factPaths],
            membershipSourceUrl: member.membershipSourceUrl,
            meaningAuthority: member.meaningAuthority,
            wealthConclusionAuthorized: member.wealthConclusionAuthorized,
          })),
          themes: report.availableThemeContext.themes.map(theme => ({
            claimId: theme.claimId,
            claimType: theme.claimType,
            sourceIds: [...theme.sourceIds],
            observedFactPaths: [...theme.observedFactPaths],
          })),
        }
      : null,
  };
}
