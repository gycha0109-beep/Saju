import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildGeneralNatalN27WuJiRecurrenceScopeAudit } from '../src/research/general-natal-p0-n27-wu-ji-recurrence-scope-audit.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
function actual2010(hour: number | null) {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2010, month: 2, day: 3 },
    time: hour === null ? { known: false } : { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
}
const byKey = (
  audit: ReturnType<typeof buildGeneralNatalN27WuJiRecurrenceScopeAudit>,
  key: string,
) => audit.scopeHypotheses.find((h) => h.key === key);

describe('N27 再見戊己 research sensitivity: scope is NOT a source-qualified predicate', () => {
  it('19:30: visible 己 changes counts under 戊-only vs 戊己 hypotheses', () => {
    const x = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(x.contextStatus).toBe('SOURCE_EXAMPLE_ONLY');
    expect(x.printedExampleKind).toBe('JIA_JIA_XU_HIDDEN_WU');
    expect(x.actualObservationChannels).toMatchObject({
      otherPillarVisibleWu: 0,
      otherPillarVisibleJi: 1,
      sourceClauseNamesBothWuAndJi: true,
      jiaDayWuTenGod: '偏財',
      jiaDayJiTenGod: '正財',
      knownOriginalHourlyWealthChannel: 'HOUR_BRANCH_WU_HIDDEN_ONLY',
    });
    expect(x.actualObservationChannels.otherPillarHiddenWu).toBeGreaterThan(0);
    expect(x.actualObservationChannels.otherPillarHiddenJi).toBeGreaterThan(0);
    expect(byKey(x, 'VISIBLE_WU_ONLY')).toMatchObject({
      otherPillarOccurrenceCount: 0,
      observerWouldCountAnOtherPillarOccurrence: false,
      includesVisibleRegularWealthJi: false,
      literalClauseAdequacy: 'OMITS_EXPLICIT_JI_IN_WU_JI_CLAUSE',
      classicalProhibitionVerdict: 'UNADJUDICATED',
    });
    expect(byKey(x, 'VISIBLE_WU_AND_JI')).toMatchObject({
      otherPillarOccurrenceCount: 1,
      observerWouldCountAnOtherPillarOccurrence: true,
      includesHiddenStems: false,
      classicalProhibitionVerdict: 'UNADJUDICATED',
    });
    expect(byKey(x, 'VISIBLE_AND_HIDDEN_WU_AND_JI')?.otherPillarOccurrenceCount)
      .toBeGreaterThan(byKey(x, 'VISIBLE_WU_AND_JI')?.otherPillarOccurrenceCount ?? 0);
    expect(x.quantitativeModelSensitivity).toMatchObject({
      totalVisible: 1,
      wouldDropVisibleJiIfWuOnly: true,
      hiddenCountingChangesOccurrenceCount: true,
      competingHypothesesHaveDifferentOccurrenceCounts: true,
      candidateOccurrenceCountsAreNotClassicalWeiCounts: true,
    });
    expect(x.sourceQualifiedRecurrenceVerdict).toBe('UNADJUDICATED');
    expect(x.sourceQualifiedSingletonVerdict).toBe('UNADJUDICATED');
    expect(x.productionAuthorized).toBe(false);
  });

  it('07:30 and 19:30 same other pillars: assumption changes numbers, not historical admission', () => {
    const visible = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(7));
    const hidden = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(visible.printedExampleKind).toBe('JIA_WU_CHEN_VISIBLE_WU');
    expect(hidden.printedExampleKind).toBe('JIA_JIA_XU_HIDDEN_WU');
    expect(visible.actualObservationChannels.knownOriginalHourlyWealthChannel)
      .toBe('HOUR_STEM_WU_VISIBLE');
    expect(hidden.actualObservationChannels.knownOriginalHourlyWealthChannel)
      .toBe('HOUR_BRANCH_WU_HIDDEN_ONLY');
    expect(visible.actualObservationChannels.otherPillarVisibleJi).toBe(1);
    expect(visible.actualObservationChannels).toMatchObject({
      otherPillarVisibleWu: hidden.actualObservationChannels.otherPillarVisibleWu,
      otherPillarVisibleJi: hidden.actualObservationChannels.otherPillarVisibleJi,
      otherPillarHiddenWu: hidden.actualObservationChannels.otherPillarHiddenWu,
      otherPillarHiddenJi: hidden.actualObservationChannels.otherPillarHiddenJi,
    });
    expect(visible.scopeHypotheses.map((s) => s.otherPillarOccurrenceCount))
      .toEqual(hidden.scopeHypotheses.map((s) => s.otherPillarOccurrenceCount));
    expect(visible.scopeHypotheses.every((s) => s.classicalProhibitionVerdict === 'UNADJUDICATED'))
      .toBe(true);
  });

  it('05:30 no printed hour example and unknown birth hour cannot qualify a scope', () => {
    const notExample = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(5));
    const unknown = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(null));
    expect(notExample.contextStatus).toBe('NOT_THE_PRINTED_EXAMPLE');
    expect(unknown.contextStatus).toBe('HOUR_UNRESOLVED');
    for (const audit of [notExample, unknown]) {
      expect(audit.scopeHypotheses.every((h) =>
        !h.observerWouldCountAnOtherPillarOccurrence &&
        h.classicalProhibitionVerdict === 'UNADJUDICATED'
      )).toBe(true);
      expect(audit.consumerClaimEligible).toBe(false);
      expect(audit.productionAuthorized).toBe(false);
    }
  });

  it('stable digest / exact four quantitative counterfactuals / no admission', () => {
    const a = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const b = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(a.evidenceHash).toBe(b.evidenceHash);
    expect(a.evidenceHash).toMatch(/^[0-9a-f]{64}$/);
    expect(a.scopeHypotheses.map((x) => x.key)).toEqual([
      'VISIBLE_WU_ONLY', 'VISIBLE_WU_AND_JI',
      'VISIBLE_AND_HIDDEN_WU_ONLY', 'VISIBLE_AND_HIDDEN_WU_AND_JI',
    ]);
    expect(a.provenance.historicalScopeOfZaiJianCertified).toBe(false);
    expect(a.provenance.historicalMeaningOfYiWeiCertified).toBe(false);
    expect(a.status).toBe('HYPOTHESIS_SENSITIVITY_RESEARCH_ONLY');
    expect(a.previewAdmissionGranted).toBe(false);
    expect(a.officialAdmissionGranted).toBe(false);
    expect(a.licensedHistoricalInterpretation).toBe(false);
  });
});
