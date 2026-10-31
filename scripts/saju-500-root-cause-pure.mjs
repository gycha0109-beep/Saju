export const ROOT_CAUSE_AUDIT_VERSION = 'saju-eight-menu-root-cause-v3';

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
    wealth_t5_and_other_families_split_across_channels: 'cross_channel_methodology_review_required',
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
    const evidence = row.existingSourceThemeContext;
    const memberships = evidence?.hiddenWealthMembership;
    const hiddenWealthEvidenceState =
      evidence?.hiddenWealthEvidenceStatus !== 'resolved' || !Array.isArray(memberships)
        ? 'not_assessed'
        : memberships.length > 0
          ? 'calculated_membership_observed_not_T5'
          : 'not_observed_in_calculated_membership';
    const groupIdentity = {
      cause: row.cause,
      remediationTarget,
      hiddenWealthEvidenceState,
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
    byHiddenWealthEvidenceState: frequency(cases.map(row => {
      const evidence = row.existingSourceThemeContext;
      const observations = evidence?.hiddenWealthMembership;
      return evidence?.hiddenWealthEvidenceStatus !== 'resolved' ||
        !Array.isArray(observations)
        ? 'not_assessed'
        : observations.length ? 'calculated_membership_observed_not_T5'
          : 'not_observed_in_calculated_membership';
    })),
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

/**
 * Diagnose when the SAME registered semantic profile is applied to different
 * *verified* natal-versus-period clash facts. Such differences are not new
 * interpretations: they locate which source-owned profiles still explain
 * structurally distinct charts with the same generic wording.
 *
 * Snapshot hashes, Claim IDs, dates and literal text are intentionally
 * excluded from signatures; otherwise this would inflate personalization.
 */
/**
 * Count semantic combinations actually CONSUMED from selected annual/monthly
 * T9 research claims. Existing display-profile uniqueness is not evidence of
 * independently selected meanings. Ignore birth IDs, calculation hashes,
 * exact Korean text, dates, claim IDs and unconsumed natal T5 observations.
 * Required source/rule/fact records are verified, but their incidental
 * identifiers do not create extra meanings on their own.
 */
export function analyzeTemporalConsumedT9Meaning(rows, scope) {
  if (scope !== 'annual' && scope !== 'monthly') {
    throw new TypeError('Consumed period semantics require an annual or monthly scope');
  }
  const typeFor = scope === 'annual'
    ? { theme:'GENERAL_ANNUAL_THEME_ACTIVATION', tension:'GENERAL_ANNUAL_BRANCH_CLASH_TENSION' }
    : { theme:'GENERAL_MONTHLY_SEGMENT_THEME_ACTIVATION', tension:'GENERAL_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION' };
  const signatures = new Map();
  const byOldMeaning = new Map();
  let unassessed = 0;
  for (const row of rows) {
    const sections = row.sourceEvidence?.consumedT9;
    if (typeof row.meaningKey !== 'string' || !Array.isArray(sections) ||
        sections.length === 0 || sections.some(section => {
          const kind = section?.kind === 'core' ? 'theme' : section?.kind;
          return (kind !== 'theme' && kind !== 'tension') ||
            section.claimType !== typeFor[kind] ||
            typeof section.semanticKey !== 'string' || !section.semanticKey ||
            (scope === 'monthly' &&
              !['before_jeol','after_jeol'].includes(section.segmentId)) ||
            (scope === 'annual' && section.segmentId != null) ||
            !Array.isArray(section.ruleIds) || section.ruleIds.length === 0 ||
            !section.ruleIds.every(v => typeof v === 'string' && v.length > 0) ||
            typeof section.methodologyId !== 'string' || !section.methodologyId ||
            !Array.isArray(section.sourceIds) || section.sourceIds.length === 0 ||
            !section.sourceIds.every(v => typeof v === 'string' && v.length > 0) ||
            !Array.isArray(section.factPaths) || section.factPaths.length === 0 ||
            !section.factPaths.every(v => typeof v === 'string' && v.length > 0) ||
            (kind === 'theme'
              ? typeof section.tenGod !== 'string' || !section.tenGod ||
                section.relatedPillar != null || section.relation != null
              : !['year','month','day','hour'].includes(section.relatedPillar) ||
                section.relation !== 'clash');
        })) {
      unassessed++;
      continue;
    }
    const actual = sections.map(section => ({
      kind:section.kind === 'core' ? 'theme' : section.kind,
      ...(scope === 'monthly' ? {segmentId:section.segmentId} : {}),
      claimType:section.claimType,
      semanticKey:section.semanticKey,
      ...(section.kind === 'core' || section.kind === 'theme'
        ? {tenGod:section.tenGod}
        : {relatedPillar:section.relatedPillar, relation:section.relation}),
      ruleIds:[...new Set(section.ruleIds)].sort(),
      methodologyId:section.methodologyId,
    })).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
    const signature=JSON.stringify(actual);
    const record={
      birth:row.birth, calculationHash:row.calculationHash, signature,
      selectedSemantics:actual, legacyMeaningKey:row.meaningKey,
      exactKey:row.exactKey, actualKoreanText:row.text,
      sourceBindings:sections.map(section => ({
        claimType:section.claimType, semanticKey:section.semanticKey,
        ruleIds:[...section.ruleIds],
        methodologyId:section.methodologyId,
        sourceIds:[...section.sourceIds], factPaths:[...section.factPaths],
      })),
    };
    const group=signatures.get(signature) ?? [];
    group.push(record);
    signatures.set(signature,group);
    const previous=byOldMeaning.get(row.meaningKey) ?? new Map();
    previous.set(signature,(previous.get(signature)??0)+1);
    byOldMeaning.set(row.meaningKey,previous);
  }
  const conflictingOldProfiles=[...byOldMeaning.entries()]
    .filter(([,variants])=>variants.size>1)
    .map(([meaningProfileKey,variants])=>({
      meaningProfileKey,
      distinctExecutedMeanings:variants.size,
      cases:[...variants.values()].reduce((a,b)=>a+b,0),
    }));
  const repeated=[...signatures.values()].filter(members=>members.length>1)
    .sort((a,b)=>b.length-a.length);
  // A display-profile change does not establish a new executed T9 meaning.
  // Keep the actual counterexamples (not only aggregate counts) inspectable.
  const displaySplits=[...signatures.values()].filter(members =>
    new Set(members.map(m=>m.legacyMeaningKey)).size>1)
    .map(members=>({
      cases:members.length,
      distinctDisplayProfiles:new Set(members.map(m=>m.legacyMeaningKey)).size,
      distinctExactTexts:new Set(members.map(m=>m.exactKey)).size,
      executedMeaning:members[0].selectedSemantics,
      representatives:[...new Map(members.map(m=>[m.legacyMeaningKey,m])).values()]
        .slice(0,4).map(m=>({
          birth:m.birth, calculationHash:m.calculationHash,
          legacyMeaningKey:m.legacyMeaningKey, actualKoreanText:m.actualKoreanText,
        })),
    })).sort((a,b)=>b.cases-a.cases);
  // Retain every distinct actually used Rule/Method/T9 semantic pattern, not
  // just the first five or an invented cartesian product of candidate rules.
  const actualEvidencePatterns=[...signatures.values()].map(members=>({
    selectedSemantics:members[0].selectedSemantics,
    sourceBindings:members[0].sourceBindings,
    caseCount:members.length,
    representatives:members.slice(0,2).map(m=>({
      birth:m.birth, calculationHash:m.calculationHash,
      actualKoreanText:m.actualKoreanText,
      legacyMeaningKey:m.legacyMeaningKey,
    })),
  }));
  const sameMeaningPairs=repeated.filter(members =>
    members.some(m=>m.calculationHash!==members[0].calculationHash))
    .slice(0,8).map(members=>{
      const a=members[0];
      const b=members.find(m=>m.calculationHash!==a.calculationHash);
      return {selectedSemantics:a.selectedSemantics,
        inputs:[a,b].map(m=>({
          birth:m.birth,calculationHash:m.calculationHash,
          actualKoreanText:m.actualKoreanText,
        }))};
    });
  // A controlled contrast changes exactly one sourced T9 section and holds
  // another selected section constant. It proves a distinguishable executed
  // research meaning, not real-life predictive validity.
  const contrastingMeaningPairs=[];
  const groups=[...signatures.values()];
  for(let i=0;i<groups.length && contrastingMeaningPairs.length<12;i++){
    for(let j=i+1;j<groups.length && contrastingMeaningPairs.length<12;j++){
      const a=groups[i][0], b=groups[j][0];
      const aa=new Set(a.selectedSemantics.map(x=>JSON.stringify(x)));
      const bb=new Set(b.selectedSemantics.map(x=>JSON.stringify(x)));
      const common=[...aa].filter(x=>bb.has(x));
      const different=[...aa].filter(x=>!bb.has(x)).length+
        [...bb].filter(x=>!aa.has(x)).length;
      if(common.length===0 || different===0 || different>2 ||
          a.actualKoreanText===b.actualKoreanText) continue;
      contrastingMeaningPairs.push({
        commonSelectedSectionCount:common.length,
        differentSelectedSectionCount:different,
        inputs:[a,b].map(m=>({
          birth:m.birth,calculationHash:m.calculationHash,
          selectedSemantics:m.selectedSemantics,
          actualKoreanText:m.actualKoreanText,
        })),
      });
    }
  }
  return {
    scope,
    assessed:rows.length-unassessed,
    unassessed,
    distinctExecutedMeaningSignatures:signatures.size,
    repeatedExecutedMeaningGroups:repeated.length,
    casesInRepeatedExecutedMeaningGroups:repeated.reduce((n,m)=>n+m.length,0),
    oldDisplayProfilesHidingDistinctExecutedMeaning:conflictingOldProfiles.length,
    conflictingOldProfiles,
    distinctLegacyDisplayProfiles:byOldMeaning.size,
    executedMeaningsSplitAcrossDisplayProfiles:displaySplits.length,
    excessDisplayProfileVariants:byOldMeaning.size-signatures.size,
    displaySplits,
    actualEvidencePatternCount:actualEvidencePatterns.length,
    actualEvidencePatterns,
    sameMeaningPairs,
    contrastingMeaningPairs,
    examples:[...signatures.values()].slice(0,5).map(members=>({
      birth:members[0].birth,
      selectedSemantics:members[0].selectedSemantics,
      caseCount:members.length,
    })),
    qualification:'Only source-selected annual/monthly T9 research semantics are counted, not unconsumed natal T5 or changed birth/time labels',
  };
}

export function analyzeTemporalStructuralEvidenceVariation(rows) {
  const byMeaning = new Map();
  let unassessed = 0;
  for (const row of rows) {
    if (typeof row.meaningKey !== 'string' ||
        !Array.isArray(row.sourceEvidence?.sections)) {
      unassessed++;
      continue;
    }
    const relationships = [];
    let valid = true;
    for (const section of row.sourceEvidence.sections) {
      if (section.kind !== 'tension') continue;
      const clash = section.observedClash;
      const timeBranch = clash?.annualBranch ?? clash?.monthlyBranch;
      if (clash?.relation !== 'clash' ||
          typeof clash.natalBranch !== 'string' ||
          typeof timeBranch !== 'string' ||
          typeof section.relatedPillar !== 'string') {
        valid = false;
        break;
      }
      relationships.push({
        kind: 'verified_natal_period_branch_clash',
        segmentId: section.segmentId ?? null,
        natalPillar: section.relatedPillar,
        natalBranch: clash.natalBranch,
        periodBranch: timeBranch,
      });
    }
    if (!valid) {
      unassessed++;
      continue;
    }
    relationships.sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    const signature = JSON.stringify(relationships);
    const group = byMeaning.get(row.meaningKey) ?? [];
    group.push({
      birth: row.birth,
      calculationHash: row.calculationHash,
      signature,
      observedRelations: relationships,
    });
    byMeaning.set(row.meaningKey, group);
  }
  const groups = [...byMeaning.entries()]
    .filter(([, members]) =>
      members.length > 1 && new Set(members.map(m => m.signature)).size > 1)
    .sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([meaningProfileKey, members]) => ({
      meaningProfileKey,
      caseCount: members.length,
      distinctStructuralSignatures: new Set(members.map(m => m.signature)).size,
      examples: members.slice(0, 5).map(m => ({
        birth: m.birth, calculationHash: m.calculationHash,
        observedRelations: m.observedRelations,
      })),
    }));
  return {
    assessed: rows.length - unassessed,
    unassessed,
    repeatedMeaningProfilesWithDifferentVerifiedRelations: groups.length,
    casesInSuchProfiles: groups.reduce((n,g) => n+g.caseCount,0),
    groups,
    qualification: 'Structural relation differences are calculation context only; not newly authorized interpretive meanings',
  };
}

/**
 * Source-backed natal evidence may differ behind an identical annual/monthly
 * reading profile. This is a diagnostic of UNUSED existing chart evidence,
 * never an extra temporal Claim or proof that the period meanings differ.
 * Compare T5 claim types AND their actual observed Ten-God positions, not
 * chart IDs, birth dates, raw strings, or invented variability.
 */
export function analyzeTemporalNatalT5Variation(rows) {
  const familyTenGods = {
    PEER: ['비견','겁재'], RESOURCE: ['정인','편인'],
    OUTPUT: ['식신','상관'], WEALTH: ['정재','편재'],
    OFFICER: ['정관','편관'],
  };
  const validSourceTheme = t => {
    if (!t || typeof t.claimType !== 'string') return false;
    const match = /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.exec(t.claimType);
    if (!match) return false;
    const [family, channel] = [match[1], match[2]];
    const key = channel === 'VISIBLE_STEMS' ? 'stem' : 'branch';
    const allowedSlots = channel === 'VISIBLE_STEMS'
      ? ['year','month','hour'] : ['year','month','day','hour'];
    return Array.isArray(t.sourceIds) && t.sourceIds.length > 0 &&
      t.sourceIds.every(id => typeof id === 'string' && id.length > 0) &&
      Array.isArray(t.observed) && t.observed.length > 0 &&
      t.observed.every(p => allowedSlots.some(slot =>
        p?.factPath === 'derivedFacts.tenGods.value.' + slot + '.' + key + '.value') &&
        familyTenGods[family].includes(p.tenGod));
  };
  const byMeaning = new Map();
  let unassessed = 0;
  for (const row of rows) {
    const themes = row.sourceEvidence?.natalT5;
    if (typeof row.meaningKey !== 'string' || !Array.isArray(themes) ||
        themes.length === 0 ||
        !themes.every(validSourceTheme)) {
      unassessed++;
      continue;
    }
    const observed = themes.map(t => ({
      claimType: t.claimType,
      positions: [...t.observed]
        .map(p => [p.factPath, p.tenGod])
        .sort((a,b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
    })).sort((a,b) => a.claimType.localeCompare(b.claimType));
    const signature = JSON.stringify(observed);
    const group = byMeaning.get(row.meaningKey) ?? [];
    group.push({birth:row.birth, calculationHash:row.calculationHash, signature, observed});
    byMeaning.set(row.meaningKey, group);
  }
  const groups = [...byMeaning.entries()]
    .filter(([, members]) => members.length > 1 &&
      new Set(members.map(m => m.signature)).size > 1)
    .sort((a,b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([meaningProfileKey, members]) => {
      const variants = new Map();
      for (const m of members) {
        if (!variants.has(m.signature)) variants.set(m.signature, m);
      }
      return {
        meaningProfileKey,
        caseCount: members.length,
        distinctNatalT5Signatures: variants.size,
        examples: [...variants.values()].slice(0, 3).map(m => ({
          birth:m.birth, calculationHash:m.calculationHash, observed:m.observed,
        })),
      };
    });
  return {
    assessed: rows.length - unassessed,
    unassessed,
    repeatedMeaningProfilesWithDifferentNatalT5Evidence: groups.length,
    casesInSuchProfiles: groups.reduce((n,g)=>n+g.caseCount,0),
    groups,
    qualification: 'Different source-backed natal Ten-God observations do not authorize distinct annual/monthly interpretations',
  };
}

/**
 * Existing 500-menu "withoutReadableText" counts selected Wealth T8 prose.
 * It cannot be called an empty consumer page when the reader also renders
 * independently sourced T5 context. Measure the two evidence tiers separately
 * without crediting T5 observations as a Wealth synthesis.
 */
export function summarizeWealthConsumerEvidence(rows) {
  let withoutWealthT8 = 0;
  let withBoundedT5ContextInstead = 0;
  let withoutAnySourceBoundInterpretiveText = 0;
  let withBothWealthT8AndT5Context = 0;
  let withWealthT8 = 0;
  const noSynthesisCases = [];
  for (const row of rows) {
    if (!Number.isInteger(row.sectionCount) || row.sectionCount < 0 ||
        typeof row.text !== 'string' || !['complete','partial','insufficient'].includes(row.state)) {
      throw new TypeError('Wealth consumer evidence needs actual report sections and state');
    }
    const hasT8 = row.sectionCount > 0;
    if (hasT8 !== (row.text.trim().length > 0)) {
      throw new TypeError('Wealth audit T8 prose and selected section count contradict each other');
    }
    const context = row.boundedT5Context;
    if (context !== undefined) {
      if (context.wealthConclusionAuthorized !== false ||
          typeof context.paragraph !== 'string' || !context.paragraph.trim() ||
          !Array.isArray(context.themes) || context.themes.length === 0 ||
          !context.themes.every(theme =>
            typeof theme.claimId === 'string' && !!theme.claimId &&
            /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u.test(theme.claimType) &&
            Array.isArray(theme.sourceIds) && theme.sourceIds.length > 0 &&
            Array.isArray(theme.observedFactPaths) && theme.observedFactPaths.length > 0)) {
        throw new TypeError('Wealth T5 context cannot be counted as authorized Wealth T8');
      }
    }
    if (hasT8) {
      withWealthT8++;
    } else {
      withoutWealthT8++;
      if (context) withBoundedT5ContextInstead++;
      else withoutAnySourceBoundInterpretiveText++;
      noSynthesisCases.push({
        birth:row.birth,
        calculationHash:row.calculationHash,
        hasSourceBoundT5Partial:context !== undefined,
        themeCount:context?.themes.length ?? 0,
        missingReason:row.missingReason,
      });
    }
    if (hasT8 && context) withBothWealthT8AndT5Context++;
  }
  return {
    examined:rows.length,
    withWealthT8,
    withoutWealthT8,
    withBoundedT5ContextInstead,
    withoutAnySourceBoundInterpretiveText,
    withBothWealthT8AndT5Context,
    /** T5 partial explanation is real but cannot qualify as a Wealth T8. */
    researchOnlyNoWealthOutcomeAuthorized:true,
    noSynthesisCases,
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
      row.existingSourceThemeContext?.hiddenWealthEvidenceStatus === 'resolved' &&
      row.existingSourceThemeContext?.hiddenWealthMembership?.length > 0).length,
    hiddenWealthObservationCount: cases.reduce((sum, row) =>
      sum + (row.existingSourceThemeContext?.hiddenWealthEvidenceStatus === 'resolved'
        ? row.existingSourceThemeContext.hiddenWealthMembership?.length ?? 0 : 0), 0),
    casesWithExistingSourceContext: cases.filter(row =>
      row.existingSourceThemeContext?.themeCount > 0 &&
      row.existingSourceThemeContext.wealthConclusionAuthorized === false).length,
    allCasesHaveExplicitCause: cases.every(row =>
      row.cause && row.cause !== 'unknown' && row.calculationHash &&
      row.selection?.coverageState && row.rules?.totalRegistered > 0),
    cases,
  };
}
