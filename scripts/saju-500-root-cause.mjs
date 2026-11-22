import { getTenGod } from 'manseryeok';
import { buildReadingCompositionEvidence } from '../dist/reading/reading-intent-composition.js';

export const ROOT_CAUSE_AUDIT_VERSION = 'saju-eight-menu-root-cause-v3';

const WEALTH_FILTER = (claim) =>
  claim.state === 'active' &&
  claim.taxonomy.tier === 'T8' &&
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
const FAMILY_TEN_GODS = {
  peer: ['\uBE44\uACAC', '\uAC81\uC7AC'],
  resource: ['\uC815\uC778', '\uD3B8\uC778'],
  output: ['\uC2DD\uC2E0', '\uC0C1\uAD00'],
  wealth: ['\uC815\uC7AC', '\uD3B8\uC7AC'],
  officer: ['\uC815\uAD00', '\uD3B8\uAD00'],
};

function factState(fact) {
  if (fact === undefined) return { status: 'missing' };
  return fact.status === 'resolved'
    ? { status: 'resolved', value: fact.value }
    : { status: fact.status };
}

function chartFactTrace(snapshot) {
  const slots = ['year', 'month', 'day', 'hour'];
  const pillars = Object.fromEntries(
    slots.map((slot) => {
      const fact = snapshot.pillars[slot];
      return [
        slot,
        fact.status === 'resolved'
          ? { status: 'resolved', stem: fact.value.stem.value, branch: fact.value.branch.value }
          : { status: fact.status },
      ];
    }),
  );
  const hidden = snapshot.derivedFacts.hiddenStems;
  const dayMaster = snapshot.derivedFacts.dayMaster;
  const hiddenStemFamilies = Object.fromEntries(
    slots.map((slot) => {
      const fact = hidden?.[slot];
      if (fact === undefined || fact.status !== 'resolved' || dayMaster.status !== 'resolved') {
        return [slot, { status: fact?.status ?? 'missing' }];
      }
      const stems = fact.value.map((stem, index) => {
        const tenGod = getTenGod(dayMaster.value.value, stem);
        const family =
          Object.entries(FAMILY_TEN_GODS).find(([, names]) => names.includes(tenGod))?.[0] ??
          'unknown';
        return { index, stem, tenGod, family };
      });
      return [slot, { status: 'resolved', stems }];
    }),
  );
  const wealthPositions = slots.flatMap((slot) => {
    const fact = hiddenStemFamilies[slot];
    if (fact.status !== 'resolved') return [];
    return fact.stems
      .filter((item) => item.family === 'wealth')
      .map((item) => ({ slot, index: item.index, stem: item.stem, tenGod: item.tenGod }));
  });
  const familyPresence = [
    ...new Set(
      slots.flatMap((slot) => {
        const fact = hiddenStemFamilies[slot];
        return fact.status === 'resolved' ? fact.stems.map((item) => item.family) : [];
      }),
    ),
  ].sort();
  return {
    birthTimeKnown: snapshot.completeness.birthTimeKnown,
    pillars,
    dayMaster: factState(dayMaster),
    wholeChartTenGods: factState(snapshot.derivedFacts.tenGods),
    hiddenStems: Object.fromEntries(slots.map((slot) => [slot, factState(hidden?.[slot])])),
    hiddenStemFamilies,
    hiddenStemFamilyPresence: familyPresence,
    hiddenStemWealthPositions: wealthPositions,
  };
}

/**
 * Trace the exact chart -> T5 -> T8 rule inputs/evaluation -> EvidenceSelector
 * -> report path. Diagnostic only: this function never creates or changes claims.
 */
export function diagnoseMissingWealthReading(
  snapshot,
  execution,
  registry,
  report,
  birth,
  birthInput,
) {
  if (report.sections.length !== 0) {
    throw new TypeError('Only an actually empty wealth reading can be classified');
  }
  if (
    report.snapshotId !== snapshot.snapshotId ||
    report.calculationHash !== snapshot.calculationHash ||
    execution.run.snapshotId !== snapshot.snapshotId ||
    execution.run.registrySnapshotId !== registry.snapshot.registrySnapshotId
  ) {
    throw new TypeError('Wealth missing-reading diagnosis must use the exact engine run');
  }
  const t5 = execution.claims.filter(
    (claim) =>
      claim.state === 'active' &&
      claim.taxonomy.tier === 'T5' &&
      /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES|HIDDEN_STEMS)_THEME$/u.test(
        claim.claimType,
      ),
  );
  const existingTypes = new Set(t5.map((claim) => claim.claimType));
  const candidateRules = registry.rules.filter(
    (rule) =>
      rule.status === 'research' &&
      rule.taxonomy.tier === 'T8' &&
      rule.taxonomy.category === 'wealth' &&
      rule.output.predicate === 'wealth_multifactor_structure',
  );
  const inputEligibleRules = candidateRules.filter((rule) =>
    rule.inputs.every(
      (input) =>
        input.source === 'interpretation_claim' && existingTypes.has(input.pathOrClaimType),
    ),
  );
  const evaluations = execution.evaluations.filter((item) =>
    candidateRules.some(
      (rule) => item.ruleRef.id === rule.ruleId && item.ruleRef.version === rule.version,
    ),
  );
  const activeT8 = execution.claims.filter(WEALTH_FILTER);
  const composition = buildReadingCompositionEvidence(snapshot, execution, registry, {
    requestId: 'saju-500-wealth-root-cause',
    intent: { domain: 'wealth', temporalScope: 'natal' },
  });
  const selectedIds = new Set(composition.selection.selectedClaimIds);
  const selectedT8 = activeT8.filter((claim) => selectedIds.has(claim.claimId));
  const observedChannels = [
    ...new Set(
      t5.map((claim) =>
        /^TEN_GOD_[A-Z]+_(VISIBLE_STEMS|BRANCHES|HIDDEN_STEMS)_THEME$/u
          .exec(claim.claimType)?.[1]
          .toLowerCase(),
      ),
    ),
  ].sort();
  const familiesByChannel = Object.fromEntries(
    ['visible_stems', 'branches', 'hidden_stems'].map((channel) => [
      channel,
      [
        ...new Set(
          t5.flatMap((claim) => {
            const match = /^TEN_GOD_([A-Z]+)_(VISIBLE_STEMS|BRANCHES|HIDDEN_STEMS)_THEME$/u.exec(
              claim.claimType,
            );
            return match?.[2].toLowerCase() === channel ? [match[1].toLowerCase()] : [];
          }),
        ),
      ].sort(),
    ]),
  );
  const ruleInputCoverage = candidateRules.map((rule) => {
    const inputs = rule.inputs.map((input) => {
      const matches = t5.filter((claim) => claim.claimType === input.pathOrClaimType);
      return {
        claimType: input.pathOrClaimType,
        cardinality: input.cardinality ?? null,
        activeClaimIds: matches.map((claim) => claim.claimId),
        available: matches.length === 1,
      };
    });
    return {
      ruleId: rule.ruleId,
      claimType: rule.output.claimType,
      pattern: rule.output.value?.pattern ?? null,
      channel: rule.output.value?.channel ?? null,
      inputs,
      missingInputs: inputs.filter((input) => !input.available).map((input) => input.claimType),
      allInputsAvailable: inputs.every((input) => input.available),
    };
  });
  const evaluationsByStatus = frequency(evaluations.map((item) => item.status));
  const hasWealthTheme = t5.some((claim) => claim.claimType.startsWith('TEN_GOD_WEALTH_'));
  let cause;
  if (!snapshot.completeness.birthTimeKnown) {
    cause = 'birth_time_unresolved';
  } else if (t5.length === 0) {
    cause = 'no_active_upstream_t5_theme';
  } else if (inputEligibleRules.length === 0 && activeT8.length === 0) {
    cause = hasWealthTheme
      ? 'wealth_t5_present_but_no_registered_same_channel_pattern'
      : 'no_active_wealth_t5_in_available_observation_channels';
  } else if (activeT8.length === 0) {
    cause = 'eligible_rule_did_not_emit_wealth_claim';
  } else if (selectedT8.length === 0) {
    cause = 'wealth_claim_not_selected_by_reading_profile';
  } else {
    cause = 'selected_claim_not_rendered_as_wealth_section';
  }

  return {
    birth,
    ...(birthInput === undefined ? {} : { birthInput }),
    calculationHash: snapshot.calculationHash,
    cause,
    reportState: report.state,
    reportMissing: [...report.missing],
    chartFacts: chartFactTrace(snapshot),
    upstream: {
      availableChannels: observedChannels,
      familiesByChannel,
      availableT5ClaimTypes: [...existingTypes].sort(),
      claims: t5.map((claim) => ({
        claimType: claim.claimType,
        claimId: claim.claimId,
        factRefs: [...claim.factRefs],
        ruleIds: claim.ruleRefs.map((ref) => ref.ruleId),
        sourceRefs: [...claim.sourceRefs],
      })),
    },
    rules: {
      totalRegistered: candidateRules.length,
      eligibleRuleIds: inputEligibleRules.map((rule) => rule.ruleId).sort(),
      inputCoverage: ruleInputCoverage,
      evaluationsByStatus,
      evaluations: evaluations.map((item) => ({
        ruleId: item.ruleRef.id,
        status: item.status,
        inputRefs: item.inputRefs.map((ref) => ({
          sourceType: ref.sourceType,
          idOrPath: ref.idOrPath,
          selectedClaimIds: ref.selectedClaimIds ?? [],
          observedValue: ref.observedValue ?? null,
        })),
        emittedClaimIds: [...item.emittedClaimIds],
      })),
    },
    emittedWealthClaims: activeT8.map((claim) => ({
      claimId: claim.claimId,
      claimType: claim.claimType,
      factRefs: [...claim.factRefs],
      upstreamClaimRefs: [...claim.upstreamClaimRefs],
      sourceRefs: [...claim.sourceRefs],
    })),
    selection: {
      coverageState: composition.selection.coverageState,
      missingRequirements: [...composition.selection.missingRequirements],
      targetWealthClaimIds: [...composition.selection.targetClaimIds],
      selectedWealthClaimIds: selectedT8.map((claim) => claim.claimId),
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
    .filter(([, members]) => members.length > 1)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([textHash, members]) => ({
      textHash,
      count: members.length,
      distinctChartCount: new Set(members.map((m) => m.calculationHash)).size,
      distinctMeaningProfileCount: new Set(members.map((m) => m.meaningKey)).size,
      members,
    }));
  const casesInRepeatedGroups = repeated.reduce((sum, x) => sum + x.count, 0);
  return {
    generated: rows.length,
    repeatedGroupCount: repeated.length,
    casesInRepeatedGroups,
    largestGroupSize: repeated[0]?.count ?? 0,
    repeatedGroups: repeated,
  };
}

export function summarizeMissingWealthCauses(cases) {
  const byCause = frequency(cases.map((row) => row.cause));
  return {
    missingCaseCount: cases.length,
    byCause,
    allCasesHaveExplicitCause: cases.every(
      (row) =>
        row.cause &&
        row.cause !== 'unknown' &&
        row.calculationHash &&
        row.selection?.coverageState &&
        row.rules?.totalRegistered > 0,
    ),
    cases,
  };
}
