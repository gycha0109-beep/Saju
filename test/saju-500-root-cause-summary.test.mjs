import { describe, expect, it } from 'vitest';
import {
  ROOT_CAUSE_AUDIT_VERSION,
  analyzeTemporalMeaningRepetition,
  analyzeTemporalConsumedT9Meaning,
  analyzeTemporalStructuralEvidenceVariation,
  analyzeTemporalNatalT5Variation,
  analyzeTemporalRepetition,
  buildWealthRemediationGroups,
  summarizeMissingWealthCauses,
  summarizeWealthConsumerEvidence,
} from '../scripts/saju-500-root-cause-pure.mjs';

const wealthCase = (birth, calculationHash, cause, themeTypes = [], eligibleRuleIds = []) => ({
  birth,
  calculationHash,
  cause,
  reportState: 'insufficient',
  reportMissing: ['no source-qualified core'],
  upstream: { availableT5ClaimTypes: themeTypes },
  rules: { totalRegistered: 18, eligibleRuleIds },
  selection: { coverageState: 'insufficient_evidence' },
});

describe('root-cause implementation groups', () => {
  it('groups independent birth charts by shared evidence without claiming they have no wealth', () => {
    const cases = [
      wealthCase('A', 'hash-a', 'wealth_t5_exists_but_no_registered_same_channel_combination',
        ['TEN_GOD_WEALTH_BRANCHES_THEME', 'TEN_GOD_RESOURCE_VISIBLE_STEMS_THEME']),
      wealthCase('B', 'hash-b', 'wealth_t5_exists_but_no_registered_same_channel_combination',
        ['TEN_GOD_RESOURCE_VISIBLE_STEMS_THEME', 'TEN_GOD_WEALTH_BRANCHES_THEME']),
      wealthCase('C', 'hash-c', 'wealth_claim_not_selected_by_reading_profile',
        ['TEN_GOD_WEALTH_VISIBLE_STEMS_THEME'], ['RULE-WEALTH']),
    ];
    const summary = summarizeMissingWealthCauses(cases);
    expect(ROOT_CAUSE_AUDIT_VERSION).toBe('saju-eight-menu-root-cause-v3');
    expect(summary.missingCaseCount).toBe(3);
    expect(summary.allCasesHaveExplicitCause).toBe(true);
    expect(summary.remediation.caseCount).toBe(3);
    expect(summary.remediation.groupCount).toBe(2);
    expect(summary.remediation.largestGroupSize).toBe(2);
    expect(summary.remediation.byRemediationTarget).toEqual({
      source_backed_rule_coverage: 2,
      evidence_selection: 1,
    });
    expect(summary.remediation.groups[0].cases.map(row => row.calculationHash))
      .toEqual(['hash-a', 'hash-b']);
    expect(summary.remediation.groups[0].remediationTarget).toBe('source_backed_rule_coverage');
  });

  it('does not treat missing Wealth T5 evidence as a missing combination rule', () => {
    const missingDirectEvidence = wealthCase('D', 'chart-no-wealth',
      'no_active_wealth_t5_in_either_observation_channel',
      ['TEN_GOD_OUTPUT_BRANCHES_THEME', 'TEN_GOD_PEER_VISIBLE_STEMS_THEME']);
    const summary = summarizeMissingWealthCauses([
      missingDirectEvidence,
      wealthCase('E', 'chart-with-wealth',
        'wealth_t5_exists_but_no_registered_same_channel_combination',
        ['TEN_GOD_WEALTH_BRANCHES_THEME']),
    ]);
    expect(summary.remediation.byRemediationTarget).toEqual({
      direct_wealth_t5_evidence_unavailable: 1,
      source_backed_rule_coverage: 1,
    });
    expect(summary.remediation.groupCount).toBe(2);
  });

  it('separates T5 wealth across observation channels from a missing same-channel rule', () => {
    const separated = wealthCase('1955-10-31 19:35', 'real-channel-split',
      'wealth_t5_and_other_families_split_across_channels', [
        'TEN_GOD_WEALTH_BRANCHES_THEME',
        'TEN_GOD_OUTPUT_VISIBLE_STEMS_THEME',
        'TEN_GOD_PEER_VISIBLE_STEMS_THEME',
      ]);
    const result = summarizeMissingWealthCauses([separated]);
    expect(result.byCause).toEqual({
      wealth_t5_and_other_families_split_across_channels: 1,
    });
    expect(result.remediation.byRemediationTarget).toEqual({
      cross_channel_methodology_review_required: 1,
    });
    expect(result.remediation.groups[0].t5ThemeTypes).toContain(
      'TEN_GOD_WEALTH_BRANCHES_THEME');
    expect(result.remediation.groups[0].eligibleRuleIds).toEqual([]);
  });

  it('counts canonical hidden wealth membership separately from actual Wealth T8 coverage', () => {
    const hiddenCase = wealthCase('H', 'hash-hidden',
      'no_active_wealth_t5_in_either_observation_channel');
    hiddenCase.existingSourceThemeContext = {
      themeCount: 3,
      wealthConclusionAuthorized: false,
      hiddenWealthEvidenceStatus: 'resolved',
      hiddenWealthMembership: [
        { pillar: 'year', hiddenStem: '경', derivedTenGod: '정재',
          meaningAuthority: 'calculated_membership_only',
          wealthConclusionAuthorized: false },
        { pillar: 'month', hiddenStem: '신', derivedTenGod: '편재',
          meaningAuthority: 'calculated_membership_only',
          wealthConclusionAuthorized: false },
      ],
    };
    const none = wealthCase('N', 'hash-none',
      'no_active_wealth_t5_in_either_observation_channel');
    const summary = summarizeMissingWealthCauses([hiddenCase, none]);
    expect(summary.missingCaseCount).toBe(2);
    expect(summary.casesWithExistingSourceContext).toBe(1);
    expect(summary.casesWithHiddenWealthMembership).toBe(1);
    expect(summary.hiddenWealthObservationCount).toBe(2);
    expect(summary.remediation.byHiddenWealthEvidenceState).toEqual({
      calculated_membership_observed_not_T5: 1,
      not_assessed: 1,
    });
    expect(summary.remediation.groups.map(x => x.hiddenWealthEvidenceState).sort())
      .toEqual(['calculated_membership_observed_not_T5', 'not_assessed']);
    expect(summary.remediation.byRemediationTarget).toEqual({
      direct_wealth_t5_evidence_unavailable: 2,
    });
  });

  it('keeps unrecognized diagnostics visible for manual review instead of fabricating a cause', () => {
    const grouped = buildWealthRemediationGroups([
      wealthCase('D', 'hash-d', 'not_yet_classified'),
    ]);
    expect(grouped.byRemediationTarget).toEqual({ unclassified_manual_review: 1 });
    expect(grouped.groups[0].cause).toBe('not_yet_classified');
  });

  it('rejects missing source/evidence fields rather than silently inventing a group', () => {
    expect(() => buildWealthRemediationGroups([{ cause: 'no_active_upstream_t5_theme' }]))
      .toThrow('real per-case diagnostic evidence');
  });
});

describe('temporal evidence variation is not new semantic diversity', () => {
  const clash = (natalBranch, annualBranch) => ({
    kind: 'tension',
    relatedPillar: 'day',
    observedClash: { natalBranch, annualBranch, relation: 'clash' },
    sourceProfileId: 'same-source-profile',
  });
  const base = (birth, meaningKey, sections) => ({
    birth, calculationHash: 'chart-' + birth, meaningKey,
    exactKey: 'text-' + birth, sourceEvidence: { sections },
  });

  it('finds differing verified clash facts behind the same meaning profile without counting new meanings', () => {
    const rows = [
      base('A', 'same-meaning', [clash('자', '오')]),
      base('B', 'same-meaning', [clash('묘', '유')]),
      base('C', 'same-meaning', [clash('자', '오')]),
      base('D', 'other-meaning', []),
      { ...base('E', 'same-meaning', [{ kind: 'tension', relatedPillar: 'day' }]) },
    ];
    const result = analyzeTemporalStructuralEvidenceVariation(rows);
    expect(result.assessed).toBe(4);
    expect(result.unassessed).toBe(1);
    expect(result.repeatedMeaningProfilesWithDifferentVerifiedRelations).toBe(1);
    expect(result.casesInSuchProfiles).toBe(3);
    expect(result.groups[0].distinctStructuralSignatures).toBe(2);
    expect(result.groups[0].examples).toHaveLength(3);
    expect(result.qualification).toContain('not newly authorized interpretive meanings');
    expect(analyzeTemporalMeaningRepetition(rows).distinctMeaningProfileCount).toBe(2);
  });

  it('compares sourced six-combination facts, not just clashes, without inventing temporal meaning', () => {
    const combination = (natalBranch, annualBranch, sourceId = 'SRC-T0-XUANZE-YAOLUE-UPPER') => ({
      kind: 'support',
      relatedPillar: 'day',
      observedCombination: {
        natalBranch, annualBranch, relation: 'six_combination', sourceId,
      },
    });
    const rows = [
      base('A', 'shared', [combination('자', '축')]),
      base('B', 'shared', [combination('인', '해')]),
      base('C', 'shared', [combination('자', '축')]),
      base('D', 'other', [clash('자', '오')]),
    ];
    const result = analyzeTemporalStructuralEvidenceVariation(rows);
    expect(result.assessed).toBe(4);
    expect(result.unassessed).toBe(0);
    expect(result.repeatedMeaningProfilesWithDifferentVerifiedRelations).toBe(1);
    expect(result.groups[0].caseCount).toBe(3);
    expect(result.groups[0].distinctStructuralSignatures).toBe(2);
    expect(result.groups[0].examples[0].observedRelations[0].kind)
      .toBe('verified_natal_period_branch_six_combination');
    expect(result.qualification).toContain('do not authorize new temporal interpretive meanings');
    expect(analyzeTemporalStructuralEvidenceVariation([
      base('A', 'shared', [combination('자', '축')]),
      base('B', 'shared', [combination('자', '축')]),
    ]).repeatedMeaningProfilesWithDifferentVerifiedRelations).toBe(0);
  });

  it('rejects unsupported or contradictory six-combination evidence from the audit', () => {
    const valid = base('A', 'shared', [{
      kind: 'support', segmentId: 'after_jeol', relatedPillar: 'day',
      observedCombination: {
        natalBranch: '자', monthlyBranch: '축', relation: 'six_combination',
        sourceId: 'SRC-T0-XUANZE-YAOLUE-UPPER',
      },
    }]);
    const invalid = [
      { kind: 'support', relatedPillar: 'day' },
      { kind: 'support', relatedPillar: 'day',
        observedCombination: { natalBranch: '자', monthlyBranch: '축',
          relation: 'clash', sourceId: 'SRC-T0-XUANZE-YAOLUE-UPPER' } },
      { kind: 'support', relatedPillar: 'day',
        observedCombination: { natalBranch: '자', monthlyBranch: '축',
          relation: 'six_combination', sourceId: 'missing-classical-evidence' } },
    ];
    const result = analyzeTemporalStructuralEvidenceVariation([
      valid, ...invalid.map((section, index) =>
        base('invalid-' + index, 'shared', [section])),
    ]);
    expect(result.assessed).toBe(1);
    expect(result.unassessed).toBe(3);
    expect(result.repeatedMeaningProfilesWithDifferentVerifiedRelations).toBe(0);
  });

  it('does not treat chart hashes, dates or Claim IDs alone as different structural evidence', () => {
    const rows = [
      base('A', 'same', [clash('자', '오')]),
      base('B', 'same', [clash('자', '오')]),
      base('C', 'same', [clash('자', '오')]),
    ];
    expect(analyzeTemporalStructuralEvidenceVariation(rows)
      .repeatedMeaningProfilesWithDifferentVerifiedRelations).toBe(0);
  });
});

describe('temporal source-backed meaning clusters', () => {
  const rows = [
    { birth: 'A', calculationHash: 'chart-a', exactKey: 'text-a',
      meaningKey: 'meaning-one', sourceEvidence: { sections: [{ sourceProfileId: 'SOURCE-A' }] } },
    { birth: 'B', calculationHash: 'chart-b', exactKey: 'text-b',
      meaningKey: 'meaning-one', sourceEvidence: { sections: [{ sourceProfileId: 'SOURCE-B' }] } },
    { birth: 'C', calculationHash: 'chart-c', exactKey: 'text-a',
      meaningKey: 'meaning-two', sourceEvidence: { sections: [{ sourceProfileId: 'SOURCE-C' }] } },
  ];

  it('separates identical text from reused meaning across different rendered text', () => {
    const exact = analyzeTemporalRepetition(rows);
    const meaning = analyzeTemporalMeaningRepetition(rows);
    expect(exact.repeatedGroups).toHaveLength(1);
    expect(exact.repeatedGroups[0].count).toBe(2);
    expect(meaning.distinctMeaningProfileCount).toBe(2);
    expect(meaning.casesInRepeatedGroups).toBe(2);
    expect(meaning.repeatedGroups[0].distinctExactTextCount).toBe(2);
    expect(meaning.repeatedGroups[0].distinctChartCount).toBe(2);
    expect(meaning.repeatedGroups[0].members[1].sourceEvidence.sections[0].sourceProfileId)
      .toBe('SOURCE-B');
  });

  it('rejects cases with incomplete comparison keys', () => {
    expect(() => analyzeTemporalMeaningRepetition([{ meaningKey: 'a' }]))
      .toThrow('both existing audit keys');
  });
});

describe('repeated temporal meaning versus genuinely different sourced natal T5 evidence', () => {
  const sourceId = 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE';
  const theme = (claimType, factPath, tenGod) => ({
    claimType, sourceIds:[sourceId],
    observed:[{factPath,tenGod}],
  });
  const path = slot => 'derivedFacts.tenGods.value.' + slot + '.branch.value';
  const record = (birth, meaningKey, natalT5) => ({
    birth, meaningKey, exactKey:'same-reading',
    calculationHash:'hash-' + birth,
    sourceEvidence:{ natalT5, sections:[] },
  });

  it('finds real T5 differences hidden behind the same annual/monthly narrative profile', () => {
    const officer = 'TEN_GOD_OFFICER_BRANCHES_THEME';
    const resource = 'TEN_GOD_RESOURCE_BRANCHES_THEME';
    const rows = [
      record('A','same',[theme(officer,path('year'),'정관')]),
      record('B','same',[theme(officer,path('month'),'편관')]),
      record('C','same',[theme(officer,path('year'),'정관')]),
      record('D','different',[theme(resource,path('year'),'편인')]),
    ];
    const result = analyzeTemporalNatalT5Variation(rows);
    expect(result.assessed).toBe(4);
    expect(result.unassessed).toBe(0);
    expect(result.repeatedMeaningProfilesWithDifferentNatalT5Evidence).toBe(1);
    expect(result.casesInSuchProfiles).toBe(3);
    expect(result.groups[0].distinctNatalT5Signatures).toBe(2);
    expect(result.groups[0].examples).toHaveLength(2);
    expect(result.qualification).toContain('do not authorize distinct annual/monthly interpretations');
    expect(analyzeTemporalMeaningRepetition(rows).distinctMeaningProfileCount).toBe(2);
  });

  it('does not credit source IDs, birth dates or chart hashes as new interpretation evidence', () => {
    const a = theme('TEN_GOD_RESOURCE_BRANCHES_THEME',path('year'),'정인');
    const b = {...a, sourceIds:['ANOTHER-REGISTERED-SOURCE']};
    const rows = [record('A','same',[a]),record('B','same',[b])];
    const result = analyzeTemporalNatalT5Variation(rows);
    expect(result.repeatedMeaningProfilesWithDifferentNatalT5Evidence).toBe(0);
    expect(result.casesInSuchProfiles).toBe(0);
  });

  it('does not compare invented T5 sources or missing actual chart positions', () => {
    const good = record('A','same',[
      theme('TEN_GOD_PEER_BRANCHES_THEME',path('day'),'비견'),
    ]);
    const bad = record('B','same',[
      {...theme('TEN_GOD_PEER_BRANCHES_THEME',path('hour'),'겁재'), sourceIds:[]},
    ]);
    const invalidPath = record('C','same',[
      theme('TEN_GOD_PEER_BRANCHES_THEME','fictional.natal.position','겁재'),
    ]);
    const absent = record('D','same',[]);
    const mismatchedChannel = record('E','same',[
      theme('TEN_GOD_PEER_BRANCHES_THEME','derivedFacts.tenGods.value.year.stem.value','비견'),
    ]);
    const mismatchedGod = record('F','same',[
      theme('TEN_GOD_PEER_BRANCHES_THEME',path('year'),'편재'),
    ]);
    const result = analyzeTemporalNatalT5Variation([
      good,bad,invalidPath,absent,mismatchedChannel,mismatchedGod,
    ]);
    expect(result.assessed).toBe(1);
    expect(result.unassessed).toBe(5);
    expect(result.repeatedMeaningProfilesWithDifferentNatalT5Evidence).toBe(0);
  });
});

describe('Wealth T8 coverage is not the same as user-visible T5 partial evidence', () => {
  const sourced = {
    wealthConclusionAuthorized:false,
    paragraph:'기존 근거가 확인된 십신의 제한적인 원국 부분 풀이입니다.',
    themes:[{
      claimId:'claim_source_t5',
      claimType:'TEN_GOD_WEALTH_BRANCHES_THEME',
      sourceIds:['SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE'],
      observedFactPaths:['derivedFacts.tenGods.value.month.branch.value'],
    }],
  };
  const row = (birth, sectionCount, boundedT5Context) => ({
    birth, calculationHash:'hash-'+birth,
    sectionCount,
    state:sectionCount ? 'partial':'insufficient',
    text:sectionCount ? '등록된 재물 T8 문단':'',
    missingReason:sectionCount ? null:'재물 T8 중심 근거 부족',
    ...(boundedT5Context === undefined ? {} : {boundedT5Context}),
  });

  it('retains missing T8 counts while separately acknowledging actual source-bound T5 partials', () => {
    const result = summarizeWealthConsumerEvidence([
      row('no-T8-with-T5',0,sourced),
      row('no-T8-no-T5',0),
      row('indirect-T8-with-T5',1,sourced),
      row('direct-T8',2),
    ]);
    expect(result.examined).toBe(4);
    expect(result.withWealthT8).toBe(2);
    expect(result.withoutWealthT8).toBe(2);
    expect(result.withBoundedT5ContextInstead).toBe(1);
    expect(result.withoutAnySourceBoundInterpretiveText).toBe(1);
    expect(result.withBothWealthT8AndT5Context).toBe(1);
    expect(result.researchOnlyNoWealthOutcomeAuthorized).toBe(true);
    expect(result.noSynthesisCases).toEqual([
      expect.objectContaining({birth:'no-T8-with-T5',hasSourceBoundT5Partial:true,themeCount:1}),
      expect.objectContaining({birth:'no-T8-no-T5',hasSourceBoundT5Partial:false,themeCount:0}),
    ]);
  });

  it('refuses a fake Wealth conclusion or source-less T5 paragraph as coverage', () => {
    expect(() => summarizeWealthConsumerEvidence([
      row('fake-conclusion',0,{...sourced,wealthConclusionAuthorized:true}),
    ])).toThrow('cannot be counted');
    expect(() => summarizeWealthConsumerEvidence([
      row('no-source',0,{...sourced,themes:[{...sourced.themes[0],sourceIds:[]}]}),
    ])).toThrow('cannot be counted');
    expect(() => summarizeWealthConsumerEvidence([
      {...row('contradictory',0),text:'fabricated T8 prose'},
    ])).toThrow('contradict each other');
  });
});

describe('executed annual/monthly T9 meaning is not a changed date or generic profile', () => {
  const annualTheme=(semanticKey='ANNUAL_PEER_SELF_DIRECTION')=>({
    kind:'core',claimType:'GENERAL_ANNUAL_THEME_ACTIVATION',
    semanticKey,tenGod:'비견',
    ruleIds:['RULE-ANNUAL-TEST'],methodologyId:'M-ANNUAL-TEST',
    sourceIds:['SRC-ANNUAL-RESEARCH'],
    factPaths:['temporal.annualStemTenGod'],
  });
  const monthlyTheme=(semanticKey='PEER_SELF_DIRECTION')=>({
    kind:'theme',segmentId:'before_jeol',
    claimType:'GENERAL_MONTHLY_SEGMENT_THEME_ACTIVATION',
    semanticKey,tenGod:'비견',
    ruleIds:['RULE-MONTH-TEST'],methodologyId:'M-MONTH-TEST',
    sourceIds:['SRC-MONTH-RESEARCH'],
    factPaths:['temporal.segmentsById.before_jeol.monthlyStemTenGod'],
  });
  const annualClash=(relatedPillar='year')=>({
    kind:'tension',claimType:'GENERAL_ANNUAL_BRANCH_CLASH_TENSION',
    semanticKey:'ANNUAL_NATAL_BRANCH_CLASH',
    relatedPillar,relation:'clash',
    ruleIds:['RULE-ANNUAL-CLASH'],methodologyId:'M-ANNUAL-TEST',
    sourceIds:['SRC-ANNUAL-RESEARCH'],factPaths:['temporal.annualBranchRelations.'+relatedPillar],
  });
  const monthlyClash=(relatedPillar='year')=>({
    kind:'tension',segmentId:'after_jeol',
    claimType:'GENERAL_MONTHLY_SEGMENT_BRANCH_CLASH_TENSION',
    semanticKey:'MONTHLY_NATAL_BRANCH_CLASH',
    relatedPillar,relation:'clash',
    ruleIds:['RULE-MONTH-CLASH'],methodologyId:'M-MONTH-TEST',
    sourceIds:['SRC-MONTH-RESEARCH'],factPaths:[
      'temporal.segmentsById.after_jeol.monthlyBranchRelations.'+relatedPillar+'.relation',
    ],
  });
  const row=(birth, meaningKey, consumedT9) => ({
    birth,meaningKey,exactKey:'text-'+birth,calculationHash:'chart-'+birth,
    text:'검증된 연구 풀이 ' + birth,
    sourceEvidence:{consumedT9,natalT5:[{unconsumed:true,birth}]},
  });
  it('detects different selected research meaning hidden by identical annual display profile', () => {
    const a=row('A','same',[annualTheme(),annualClash('year')]);
    const b=row('B','same',[annualTheme(),annualClash('month')]);
    const c=row('C','same',[annualClash('year'),annualTheme()]);
    const d=row('D','other',[annualTheme('ANNUAL_PEER_COMPETITION_COORDINATION')]);
    const r=analyzeTemporalConsumedT9Meaning([a,b,c,d],'annual');
    expect(r.assessed).toBe(4);
    expect(r.unassessed).toBe(0);
    expect(r.distinctExecutedMeaningSignatures).toBe(3);
    expect(r.casesInRepeatedExecutedMeaningGroups).toBe(2);
    expect(r.oldDisplayProfilesHidingDistinctExecutedMeaning).toBe(1);
    expect(r.conflictingOldProfiles[0].cases).toBe(3);
    expect(r.actualEvidencePatternCount).toBe(3);
    expect(r.actualEvidencePatterns).toHaveLength(3);
    expect(r.actualEvidencePatterns.every(p =>
      p.representatives[0].actualKoreanText.includes('검증된 연구 풀이') &&
      p.sourceBindings.every(x => x.sourceIds.length > 0 && x.ruleIds.length > 0)))
      .toBe(true);
    expect(r.sameMeaningPairs).toHaveLength(1);
    expect(r.sameMeaningPairs[0].inputs).toHaveLength(2);
    expect(r.contrastingMeaningPairs.length).toBeGreaterThan(0);
  });
  it('does not turn a different birth, timestamp, Claim ID, source ID or unused T5 into new meaning', () => {
    const first=monthlyTheme();
    const changed={...first,sourceIds:['SRC-ALTERNATIVE-RESEARCH'],
      claimId:'another-claim',factPaths:['another.valid.fact.path']};
    const rows=[row('A','same',[first,monthlyClash()]),
      row('B','same',[monthlyClash(),changed])];
    const r=analyzeTemporalConsumedT9Meaning(rows,'monthly');
    expect(r.distinctExecutedMeaningSignatures).toBe(1);
    expect(r.oldDisplayProfilesHidingDistinctExecutedMeaning).toBe(0);
    expect(r.casesInRepeatedExecutedMeaningGroups).toBe(2);
    expect(r.qualification).toContain('not unconsumed natal T5');
  });
  it('distinguishes selected monthly segment and actual rule meaning, not just the title', () => {
    const base=monthlyTheme();
    const changeSegment={...base,segmentId:'after_jeol'};
    const changeRule={...base,ruleIds:['RULE-MONTH-OTHER']};
    const rows=[row('A','same',[base]),row('B','same',[changeSegment]),
      row('C','same',[changeRule])];
    const r=analyzeTemporalConsumedT9Meaning(rows,'monthly');
    expect(r.distinctExecutedMeaningSignatures).toBe(3);
    expect(r.oldDisplayProfilesHidingDistinctExecutedMeaning).toBe(1);
  });
  it('pinpoints display fragmentation when two old profile labels share exactly one executed meaning', () => {
    const t=monthlyTheme();
    const rows=[
      row('A','profile-A',[t]),
      row('B','profile-B',[{...t,sourceIds:['SRC-OTHER-SAME-METHOD']}]),
      row('C','profile-A',[t]),
    ];
    const result=analyzeTemporalConsumedT9Meaning(rows,'monthly');
    expect(result.distinctLegacyDisplayProfiles).toBe(2);
    expect(result.distinctExecutedMeaningSignatures).toBe(1);
    expect(result.excessDisplayProfileVariants).toBe(1);
    expect(result.executedMeaningsSplitAcrossDisplayProfiles).toBe(1);
    expect(result.displaySplits[0].distinctDisplayProfiles).toBe(2);
    expect(result.displaySplits[0].representatives).toHaveLength(2);
    expect(result.actualEvidencePatternCount).toBe(1);
    expect(result.actualEvidencePatterns[0].caseCount).toBe(3);
    expect(result.sameMeaningPairs[0].inputs[0].actualKoreanText)
      .toContain('검증된 연구 풀이');
  });
  it('requires real rendered text rather than evaluating a T9-only placeholder', () => {
    const missingText=row('A','same',[monthlyTheme()]);
    delete missingText.text;
    const result=analyzeTemporalConsumedT9Meaning([
      missingText,row('B','same',[monthlyTheme()]),
    ],'monthly');
    expect(result.assessed).toBe(1);
    expect(result.unassessed).toBe(1);
    expect(result.actualEvidencePatternCount).toBe(1);
  });
  it('compares actual Korean pairs with the same selected T9 but different sourced natal T5', () => {
    const t5 = (slot, tenGod, sourceId = 'SRC-TEST-NATAL') => ({
      claimType: 'TEN_GOD_OFFICER_BRANCHES_THEME',
      sourceIds: [sourceId],
      observed: [{
        factPath: 'derivedFacts.tenGods.value.' + slot + '.branch.value',
        tenGod,
      }],
    });
    const a = row('A', 'same-display', [monthlyTheme(), monthlyClash()]);
    const b = row('B', 'same-display', [monthlyClash(), monthlyTheme()]);
    const c = row('C', 'other-display', [monthlyTheme(), monthlyClash()]);
    const differentT9 = row('D', 'other-display', [monthlyTheme('PEER_OTHER_DIRECTION')]);
    a.sourceEvidence.natalT5 = [t5('year', '정관')];
    b.sourceEvidence.natalT5 = [t5('month', '편관')];
    c.sourceEvidence.natalT5 = [t5('year', '정관', 'SRC-SECOND-ATTESTATION')];
    differentT9.sourceEvidence.natalT5 = [t5('month', '편관')];
    // Identical visible Korean output must not hide the sourced T5 contrast.
    a.text = b.text = '동일한 실제 월운 연구 풀이';
    a.exactKey = b.exactKey = 'same-exact-text';
    const result = analyzeTemporalConsumedT9Meaning([a, b, c, differentT9], 'monthly');
    const diagnosis = result.sameT9DifferentNatalT5;
    expect(result.assessed).toBe(4);
    expect(diagnosis.assessedWithValidatedNatalT5).toBe(4);
    expect(diagnosis.groupCount).toBe(1);
    expect(diagnosis.casesInGroups).toBe(3);
    expect(diagnosis.examples[0].distinctNatalT5Signatures).toBe(2);
    expect(diagnosis.examples[0].sameKoreanText).toBe(true);
    expect(diagnosis.examples[0].pair.map(p => p.birth)).toEqual(['A', 'B']);
    expect(diagnosis.examples[0].pair[0].actualKoreanText)
      .toBe('동일한 실제 월운 연구 풀이');
    expect(diagnosis.examples[0].differentT5Observations.firstOnly[0])
      .toEqual(['TEN_GOD_OFFICER_BRANCHES_THEME',
        'derivedFacts.tenGods.value.year.branch.value', '정관']);
    expect(diagnosis.examples[0].differentT5Observations.secondOnly[0])
      .toEqual(['TEN_GOD_OFFICER_BRANCHES_THEME',
        'derivedFacts.tenGods.value.month.branch.value', '편관']);
    expect(diagnosis.examples[0].pair[0].selectedT9SourceBindings[0].sourceIds)
      .toEqual(['SRC-MONTH-RESEARCH']);
    expect(diagnosis.qualification).toContain('do not alone require different');
    // A source ID variant alone is never an additional natal meaning.
    expect(result.distinctExecutedMeaningSignatures).toBe(2);
  });

  it('keeps invalid or missing natal T5 out of paired evidence without changing T9 coverage', () => {
    const a = row('A', 'same', [annualTheme()]);
    const b = row('B', 'same', [annualTheme()]);
    a.sourceEvidence.natalT5 = [{
      claimType: 'TEN_GOD_OFFICER_BRANCHES_THEME',
      sourceIds: ['SRC-NATAL'],
      observed: [{ factPath: 'derivedFacts.tenGods.value.year.branch.value', tenGod: '정관' }],
    }];
    b.sourceEvidence.natalT5 = [{
      claimType: 'TEN_GOD_OFFICER_BRANCHES_THEME',
      sourceIds: [],
      observed: [{ factPath: 'derivedFacts.tenGods.value.month.branch.value', tenGod: '편관' }],
    }];
    const result = analyzeTemporalConsumedT9Meaning([a, b], 'annual');
    expect(result.assessed).toBe(2);
    expect(result.sameT9DifferentNatalT5.assessedWithValidatedNatalT5).toBe(1);
    expect(result.sameT9DifferentNatalT5.groupCount).toBe(0);
    expect(result.sameT9DifferentNatalT5.examples).toHaveLength(0);
  });

  it('does not count unselected, unsourced or invalid T9 values as executed meanings', () => {
    const bad=row('B','same',[{...monthlyTheme(),ruleIds:[]}]);
    const mismatched=row('C','same',[{...monthlyTheme(),claimType:'TEN_GOD_WEALTH_BRANCHES_THEME'}]);
    const missing=row('D','same',[]);
    const result=analyzeTemporalConsumedT9Meaning([
      row('A','same',[monthlyTheme()]),bad,mismatched,missing,
    ],'monthly');
    expect(result.assessed).toBe(1);
    expect(result.unassessed).toBe(3);
    expect(result.distinctExecutedMeaningSignatures).toBe(1);
    expect(() => analyzeTemporalConsumedT9Meaning([], 'life_stage'))
      .toThrow('annual or monthly scope');
  });
});



import { compareFixedSaju500Baseline, FIXED_500_BASELINE }
  from '../scripts/saju-500-baseline-comparison.mjs';

describe('fixed original 500-birth audit comparison', () => {
  const example = () => ({
    seed:FIXED_500_BASELINE.seed,spec:FIXED_500_BASELINE.spec,
    count:500,attempted:500,uniqueBirthDateTimes:500,
    uniqueCalculationHashes:500,failedCases:0,
    menuResults:Object.fromEntries(Object.entries(FIXED_500_BASELINE.menuResults)
      .map(([name,old])=>[name,{
        generated:500,withReadableText:old.readable,
        withoutReadableText:old.missing,exactText:{unique:old.exact},
        meaningProfile:{unique:old.profiles},reportStates:{...old.states}
      }]))
  });

  it('quantifies the real wealth T8 delta but does not grant interpretation authority', () => {
    const current=example();
    current.menuResults['재물']={
      generated:500,withReadableText:484,withoutReadableText:16,
      exactText:{unique:472},meaningProfile:{unique:155},
      reportStates:{complete:330,insufficient:16,partial:154}
    };
    const compared=compareFixedSaju500Baseline(current);
    expect(compared.baseline.runId).toBe(40122318503);
    expect(compared.menus['재물'].selectedReadingTextCases)
      .toEqual({before:389,after:484,change:95});
    expect(compared.menus['재물'].withoutSelectedReadingTextCases.change).toBe(-95);
    expect(compared.menus['올해'].distinctExactKoreanTexts.change).toBe(0);
    expect(compared.menus['삶의 단계'].interpretationAuthority)
      .toBe('calculation_only_not_life_stage_fortune');
    expect(compared.permissions.maySell).toBe(false);
  });

  it('refuses different seeds, missing menus and inconsistent metrics', () => {
    const changedSeed=example();
    changedSeed.seed='another-seed';
    expect(()=>compareFixedSaju500Baseline(changedSeed)).toThrow('identical verified');
    const missing=example();
    delete missing.menuResults['재물'];
    expect(()=>compareFixedSaju500Baseline(missing)).toThrow('same eight');
    const bad=example();
    bad.menuResults['재물'].withoutReadableText=17;
    expect(()=>compareFixedSaju500Baseline(bad)).toThrow('contradictory');
  });
});
