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
    expect(a.provenance.sameVolumeAnalogyQuote).toContain('年月日重見');
    expect(a.provenance.sameVolumeAnalogyIsAboutHourOfficerNotHourWealth).toBe(true);
    expect(a.provenance.transferringOfficerCountingRuleToHourWealthAuthorized).toBe(false);
    expect(a.provenance.historicalScopeOfZaiJianCertified).toBe(false);
    expect(a.provenance.historicalMeaningOfYiWeiCertified).toBe(false);
    expect(a.status).toBe('HYPOTHESIS_SENSITIVITY_RESEARCH_ONLY');
    expect(a.previewAdmissionGranted).toBe(false);
    expect(a.officialAdmissionGranted).toBe(false);
    expect(a.licensedHistoricalInterpretation).toBe(false);
  });
  it('actual 甲戌 charts isolate other-pillar visible 己, visible 戊, and hidden-only exposure', () => {
    // Real calculated charts, NOT edited fixture stems. All dates are 甲 days
    // ten-day multiples after 2010-02-03, each evaluated at 19:30.
    const jiOnly = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const snapshotWu = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar', date: { year: 2010, month: 2, day: 13 },
      time: { known: true, hour: 19, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, { now: NOW }).snapshot;
    const snapshotHidden = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar', date: { year: 2010, month: 5, day: 4 },
      time: { known: true, hour: 19, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, { now: NOW }).snapshot;
    const wuOnly = buildGeneralNatalN27WuJiRecurrenceScopeAudit(snapshotWu);
    const hiddenOnly = buildGeneralNatalN27WuJiRecurrenceScopeAudit(snapshotHidden);
    for (const audit of [jiOnly, wuOnly, hiddenOnly]) {
      expect(audit.contextStatus).toBe('SOURCE_EXAMPLE_ONLY');
      expect(audit.printedExampleKind).toBe('JIA_JIA_XU_HIDDEN_WU');
      expect(audit.sourceQualifiedRecurrenceVerdict).toBe('UNADJUDICATED');
      expect(audit.sourceQualifiedSingletonVerdict).toBe('UNADJUDICATED');
      expect(audit.productionAuthorized).toBe(false);
    }
    expect([jiOnly.actualObservationChannels.otherPillarVisibleWu,
      jiOnly.actualObservationChannels.otherPillarVisibleJi]).toEqual([0, 1]);
    expect([wuOnly.actualObservationChannels.otherPillarVisibleWu,
      wuOnly.actualObservationChannels.otherPillarVisibleJi]).toEqual([1, 0]);
    expect([hiddenOnly.actualObservationChannels.otherPillarVisibleWu,
      hiddenOnly.actualObservationChannels.otherPillarVisibleJi]).toEqual([0, 0]);
    expect(hiddenOnly.actualObservationChannels.otherPillarHiddenWu).toBeGreaterThan(0);
    expect(byKey(wuOnly, 'VISIBLE_WU_ONLY')?.otherPillarOccurrenceCount).toBe(1);
    expect(byKey(hiddenOnly, 'VISIBLE_WU_AND_JI')?.otherPillarOccurrenceCount).toBe(0);
    expect(byKey(hiddenOnly, 'VISIBLE_AND_HIDDEN_WU_AND_JI')?.otherPillarOccurrenceCount)
      .toBeGreaterThan(0);
  });

  it('does not equate separate stem/hidden occurrences with pillars or a classical 位', () => {
    const x = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const unit = x.otherPillarUnitAudit;
    expect(unit.occurrenceUnitCount).toBe(
      x.actualObservationChannels.otherPillarVisibleWu +
      x.actualObservationChannels.otherPillarVisibleJi +
      x.actualObservationChannels.otherPillarHiddenWu +
      x.actualObservationChannels.otherPillarHiddenJi,
    );
    expect(unit.occurrenceUnitCount).toBeGreaterThan(unit.distinctPillarUnitCount);
    expect(unit.pillarsWithBothVisibleAndHiddenCount).toBeGreaterThan(0);
    expect(unit.yearMonthOnlyOccurrenceCount + unit.dayPillarOccurrenceCount)
      .toBe(unit.yearMonthDayOccurrenceCount);
    expect(unit.dayPillarOccurrenceCount).toBeGreaterThan(0);
    expect(unit.hourReference).toMatchObject({
      hourStem: '갑', hourBranch: '술', hourVisibleWu: false, hourHiddenWu: true,
      includedInOtherPillarOccurrenceCount: false,
    });
    expect(unit.whetherClassicalBieGongIncludesDayPillar).toBe('UNADJUDICATED');
    expect(unit.whetherTwoChannelsInOnePillarAreTwoWei).toBe('UNADJUDICATED');
    expect(unit.whetherHistoricalWeiMeansStemGlyphOrPillarOrLocation).toBe('UNADJUDICATED');
  });

  it('non-甲 day is a negative control even when another-pillar stems can be observed', () => {
    const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar', date: { year: 2010, month: 2, day: 4 },
      time: { known: true, hour: 19, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, { now: NOW }).snapshot;
    const nonJia = buildGeneralNatalN27WuJiRecurrenceScopeAudit(snapshot);
    expect(nonJia.contextStatus).toBe('DIFFERENT_DAY_STEM');
    expect(nonJia.scopeHypotheses.every((h) =>
      h.observerWouldCountAnOtherPillarOccurrence === false &&
      h.classicalProhibitionVerdict === 'UNADJUDICATED'
    )).toBe(true);
    expect(nonJia.productionAuthorized).toBe(false);
  });

  it('v3 actual Jia-Xu hour: year 己 counted twice by channel is ONE pillar+glyph', () => {
    const x = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    const units = x.otherPillarUnitAudit;
    expect(x.version).toBe('saju-n27-wu-ji-recurrence-scope-sensitivity-v3');
    // 2010-02-03: 年干己 and 年支丑藏己 represent two observations
    // of the *same* glyph in the *same* pillar, not two pillars.
    expect(units.crossChannelDuplicatePillarGlyphs).toContainEqual({
      slot: 'year', glyph: '己',
    });
    expect(units.samePillarGlyphAcrossChannelsCanInflateOccurrenceCount).toBe(true);
    const models = units.palaceAndChannelCounterfactuals;
    expect(models.map((p) => p.key)).toEqual([
      'YEAR_MONTH_VISIBLE', 'YEAR_MONTH_DAY_VISIBLE',
      'YEAR_MONTH_VISIBLE_HIDDEN', 'YEAR_MONTH_DAY_VISIBLE_HIDDEN',
    ]);
    expect(models.map((p) => p.observedOccurrenceCount)).toEqual([1, 1, 3, 4]);
    expect(models.map((p) => p.distinctPillarGlyphPairCount)).toEqual([1, 1, 2, 3]);
    expect(models.map((p) => p.samePillarSameGlyphTwoChannelExcess)).toEqual([0, 0, 1, 1]);
    expect(models.map((p) => p.distinctPillarCount)).toEqual([1, 1, 2, 3]);
    expect(models.every((p) =>
      p.namedWuJiCovered &&
      p.classicalBieGongVerdict === 'UNADJUDICATED' &&
      p.classicalZaiJianVerdict === 'UNADJUDICATED' &&
      !p.classicalWeiCountAuthorized
    )).toBe(true);
    expect(x.yearMonthVsDayAndVisibleVsHiddenScopeAdjudicated).toBe(false);
    expect(x.provenance.sameVolumeAnalogySecondVerse).toBe('時上一位貴藏在支中');
    expect(x.provenance.sameVolumeAnalogyIsDigitallyTranscribedNotNewPrintAttestation)
      .toBe(true);
    expect(x.provenance.classicalBieGongDayInclusionNotDerivedFromAnalogy).toBe(true);
    expect(x.provenance.sameVolumeZhengGuanPhrase).toContain('丑月內有辛金');
    expect(x.provenance.sameVolumeZhengGuanLaterVisiblePhrase).toContain('天干復透辛多');
    expect(x.provenance.sameVolumeZhengGuanHiddenBranchRepetitionDescribed).toBe(true);
    expect(x.provenance.sameVolumeZhengGuanSourceChannel).toBe('DIGITAL_TRANSCRIPTION_ONLY');
    expect(x.provenance.zhengGuanRecurrenceRuleApplicableToHourWealth).toBe(false);
  });

  it('v3 date controls change scope sensitivity but never authorize classical conclusion', () => {
    const make = (month: number, day: number) => buildGeneralNatalN27WuJiRecurrenceScopeAudit(
      calculateAuthorizedMyeonghwaProductionSnapshot({
        calendarType: 'solar', date: { year: 2010, month, day },
        time: { known: true, hour: 19, minute: 30 },
        sexForTraditionalCalculation: 'unspecified',
      }, { now: NOW }).snapshot,
    );
    const visibleWu = make(2, 13);
    const hiddenOnly = make(5, 4);
    expect(visibleWu.actualObservationChannels.otherPillarVisibleWu).toBe(1);
    expect(visibleWu.actualObservationChannels.otherPillarVisibleJi).toBe(0);
    expect(hiddenOnly.actualObservationChannels.otherPillarVisibleWu).toBe(0);
    expect(hiddenOnly.actualObservationChannels.otherPillarVisibleJi).toBe(0);
    const visibleHiddenFromWu =
      visibleWu.otherPillarUnitAudit.palaceAndChannelCounterfactuals;
    const visibleHiddenFromHiddenOnly =
      hiddenOnly.otherPillarUnitAudit.palaceAndChannelCounterfactuals;
    expect(visibleHiddenFromWu[0]?.observedOccurrenceCount).toBeGreaterThan(0);
    expect(visibleHiddenFromHiddenOnly[0]?.observedOccurrenceCount).toBe(0);
    expect(visibleHiddenFromHiddenOnly[3]?.observedOccurrenceCount).toBeGreaterThan(0);
    for (const audit of [visibleWu, hiddenOnly]) {
      expect(audit.otherPillarUnitAudit.palaceAndChannelCounterfactuals.every(
        (m) => m.classicalWeiCountAuthorized === false
      )).toBe(true);
      expect(audit.sourceQualifiedRecurrenceVerdict).toBe('UNADJUDICATED');
      expect(audit.sourceQualifiedSingletonVerdict).toBe('UNADJUDICATED');
      expect(audit.consumerClaimEligible).toBe(false);
      expect(audit.productionAuthorized).toBe(false);
    }
  });

  it('v3 same other pillars on 07:30/19:30 imply identical lattice, not identical hour reference', () => {
    const a = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(7));
    const b = buildGeneralNatalN27WuJiRecurrenceScopeAudit(actual2010(19));
    expect(a.otherPillarUnitAudit.palaceAndChannelCounterfactuals).toEqual(
      b.otherPillarUnitAudit.palaceAndChannelCounterfactuals,
    );
    expect(a.otherPillarUnitAudit.crossChannelDuplicatePillarGlyphs).toEqual(
      b.otherPillarUnitAudit.crossChannelDuplicatePillarGlyphs,
    );
    expect(a.otherPillarUnitAudit.hourReference.hourVisibleWu).toBe(true);
    expect(b.otherPillarUnitAudit.hourReference.hourVisibleWu).toBe(false);
    expect(a.otherPillarUnitAudit.hourReference.includedInOtherPillarOccurrenceCount)
      .toBe(false);
    expect(b.otherPillarUnitAudit.hourReference.includedInOtherPillarOccurrenceCount)
      .toBe(false);
  });

});
