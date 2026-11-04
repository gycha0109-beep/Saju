import { buildReadingCompositionEvidence } from '../dist/reading/reading-intent-composition.js';

import { frequency } from './saju-500-root-cause-pure.mjs';
export {
  ROOT_CAUSE_AUDIT_VERSION,
  analyzeTemporalRepetition,
  buildWealthRemediationGroups,
  analyzeTemporalMeaningRepetition,
  analyzeTemporalConsumedT9Meaning,
  analyzeTemporalStructuralEvidenceVariation,
  analyzeTemporalNatalT5Variation,
  summarizeMissingWealthCauses,
  summarizeWealthConsumerEvidence,
  summarizeMissingNatalCauses,
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
    const wealthChannels = ['VISIBLE_STEMS', 'BRANCHES']
      .filter(channel => existingTypes.has('TEN_GOD_WEALTH_' + channel + '_THEME'));
    const hasSameChannelCompanion = wealthChannels.some(channel =>
      [...existingTypes].some(type => type.endsWith('_' + channel + '_THEME') &&
        !type.startsWith('TEN_GOD_WEALTH_')));
    const hasOtherChannelCompanion = wealthChannels.length === 1 &&
      [...existingTypes].some(type =>
        type.endsWith('_' + (wealthChannels[0] === 'VISIBLE_STEMS'
          ? 'BRANCHES' : 'VISIBLE_STEMS') + '_THEME') &&
        !type.startsWith('TEN_GOD_WEALTH_'));
    cause = wealthChannels.length === 0
      ? 'no_active_wealth_t5_in_either_observation_channel'
      : !hasSameChannelCompanion && hasOtherChannelCompanion
        ? 'wealth_t5_and_other_families_split_across_channels'
        : 'wealth_t5_exists_but_no_registered_same_channel_combination';
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


const OTHER_NATAL_DOMAINS = ['general', 'career', 'relationship', 'business'];

/**
 * Diagnose truly empty General/Career/Relationship/Business source-bound T8
 * outputs using the same Canonical chart, executed T5/T8 claims, original
 * registry evaluations, EvidenceSelector and displayed report. A missing
 * input combination is not treated as authority to mint another meaning.
 */
export function diagnoseMissingNatalReading(snapshot, execution, registry, report, birth, domain) {
  if (!OTHER_NATAL_DOMAINS.includes(domain) ||
      report.sections.length !== 0 || report.state !== 'insufficient' ||
      report.researchOnly !== true || report.mayPublish !== false ||
      report.maySell !== false || report.usefulComplete !== false ||
      report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      execution.run.snapshotId !== snapshot.snapshotId ||
      execution.run.snapshotHash !== snapshot.calculationHash ||
      execution.run.registrySnapshotId !== registry.snapshot.registrySnapshotId ||
      execution.run.packRef.id !== registry.pack.packId) {
    throw new TypeError('Natal empty-reading diagnosis requires one real research-only chart and run');
  }
  const upstream = execution.claims.filter(claim =>
    claim.state === 'active' && claim.taxonomy.tier === 'T5' &&
    claim.snapshotId === snapshot.snapshotId &&
    claim.scenarioRef === undefined && claim.sourceRefs.length > 0 &&
    /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.test(
      claim.claimType));
  const activeT5ClaimTypes = [...new Set(upstream.map(claim => claim.claimType))].sort();
  const t5Types = new Set(activeT5ClaimTypes);
  const registered = registry.rules.filter(rule =>
    rule.status === 'research' && rule.taxonomy.tier === 'T8' &&
    rule.taxonomy.category === domain &&
    rule.output.predicate === domain + '_multifactor_structure');
  const eligible = registered.filter(rule => rule.inputs.length > 0 &&
    rule.inputs.every(input => input.required &&
      input.source === 'interpretation_claim' && t5Types.has(input.pathOrClaimType)));
  const activeT8 = execution.claims.filter(claim =>
    claim.state === 'active' && claim.taxonomy.tier === 'T8' &&
    claim.taxonomy.category === domain &&
    claim.predicate === domain + '_multifactor_structure' &&
    claim.snapshotId === snapshot.snapshotId && claim.scenarioRef === undefined);
  const composition = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'saju-500-' + domain + '-empty-root-cause',
    intent: {domain, temporalScope: 'natal'},
  });
  const selectedIds = new Set(composition.selection.selectedClaimIds);
  const selectedT8 = activeT8.filter(claim => selectedIds.has(claim.claimId));
  if (registered.length === 0 ||
      activeT8.some(claim => !registered.some(rule =>
        rule.ruleId === claim.ruleRefs[0]?.ruleId))) {
    throw new TypeError('Missing natal T8 must not have an unregistered research rule');
  }

  const cause = !snapshot.completeness.birthTimeKnown
    ? 'birth_time_unresolved'
    : upstream.length === 0
      ? 'no_active_source_bound_t5'
      : eligible.length === 0 && activeT8.length === 0
        ? 'no_registered_t8_pattern_matches_executed_t5'
        : activeT8.length === 0
          ? 'eligible_t8_rule_did_not_emit'
          : selectedT8.length === 0
            ? 'emitted_t8_not_selected_by_reading_profile'
            : 'selected_t8_not_displayed_by_report';

  return {
    domain, birth, calculationHash: snapshot.calculationHash,
    cause, reportState: report.state, reportMissing: [...report.missing],
    canonical: {
      birthTimeKnown: snapshot.completeness.birthTimeKnown,
      tenGodStatus: snapshot.derivedFacts.tenGods.status,
    },
    upstream: {
      activeT5ClaimTypes,
      claims: upstream.map(claim => ({
        claimId: claim.claimId, claimType: claim.claimType,
        factRefs: [...claim.factRefs], sourceRefs: [...claim.sourceRefs],
        ruleIds: claim.ruleRefs.map(ref => ref.ruleId),
      })),
    },
    rules: {
      registeredT8RuleCount: registered.length,
      eligibleRuleIds: eligible.map(rule => rule.ruleId).sort(),
      eligibleRuleEvaluations: execution.evaluations.filter(ev =>
        eligible.some(rule => rule.ruleId === ev.ruleRef.id &&
          rule.version === ev.ruleRef.version)).map(ev => ({
          ruleId: ev.ruleRef.id, status: ev.status,
          emittedClaimIds: [...ev.emittedClaimIds],
        })),
    },
    activeT8: activeT8.map(claim => ({
      claimId: claim.claimId, claimType: claim.claimType,
      upstreamClaimRefs: [...claim.upstreamClaimRefs],
      ruleIds: claim.ruleRefs.map(ref => ref.ruleId),
      sourceRefs: [...claim.sourceRefs],
    })),
    selection: {
      coverageState: composition.selection.coverageState,
      missingRequirements: [...composition.selection.missingRequirements],
      targetClaimIds: [...composition.selection.targetClaimIds],
      selectedT8ClaimIds: selectedT8.map(claim => claim.claimId),
    },
    displayedT8Count: report.sections.length,
  };
}
