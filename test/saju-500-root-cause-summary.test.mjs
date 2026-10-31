import { describe, expect, it } from 'vitest';
import {
  ROOT_CAUSE_AUDIT_VERSION,
  analyzeTemporalMeaningRepetition,
  analyzeTemporalStructuralEvidenceVariation,
  analyzeTemporalRepetition,
  buildWealthRemediationGroups,
  summarizeMissingWealthCauses,
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
    expect(ROOT_CAUSE_AUDIT_VERSION).toBe('saju-eight-menu-root-cause-v2');
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
