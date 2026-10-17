import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { buildGeneralNatalN27HourWealthConditionMatrix } from '../src/research/general-natal-p0-n27-hour-wealth-condition-matrix.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
function actual2010(hour: number | null) {
  return calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year: 2010, month: 2, day: 3 },
    time: hour === null ? { known: false } : { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
}
function condition(
  matrix: ReturnType<typeof buildGeneralNatalN27HourWealthConditionMatrix>,
  key: string,
) {
  return matrix.sourceClauseAudit.find((p) => p.key === key);
}
describe('N27 時上偏財 source clause -> real chart condition audit (Research only)', () => {
  it('19:30: distinguishes 時支 hidden 戊 from 時干 exposed 戊, and 年干 正財己', () => {
    const x = buildGeneralNatalN27HourWealthConditionMatrix(actual2010(19));
    expect(x.observations).toMatchObject({
      dayStemIsJia: true,
      hourKnown: true,
      literalExampleStatus: 'MATCHED_LEXICAL_EXAMPLE_ONLY',
      hourStem: '갑',
      hourBranch: '술',
      indirectWealthWuVisibleInHourStem: false,
      indirectWealthWuHiddenInHourBranch: true,
      hourWealthObservationChannel: 'HOUR_BRANCH_WU_HIDDEN_ONLY',
      yearJiVisible: true,
      additionalJiIsRegularWealthForJia: true,
      otherPillarVisibleWuOrJi: true,
      otherPillarHiddenWuOrJi: true,
      bijeonObserved: true,
      exactGyeopJaeObserved: false,
      representativeWealthSlotCountIsClassicalSingletonCount: false,
      dayStrengthClassified: false,
    });
    expect(x.observations.otherPillarVisibleJi).toContainEqual(
      expect.objectContaining({ slot: 'year', stem: '기' }),
    );
    expect(x.observations.otherPillarHiddenWu).toContainEqual(
      expect.objectContaining({ slot: 'day', stem: '무' }),
    );
    expect(x.observations.otherPillarHiddenJi).toContainEqual(
      expect.objectContaining({ slot: 'month', stem: '기' }),
    );
    expect(condition(x, 'OTHER_PALACE_EXCLUSION')).toMatchObject({
      whichPalacesAndHiddenStemsCount: 'UNADJUDICATED',
    });
    expect(condition(x, 'NO_ADDITIONAL_WU_JI')).toMatchObject({
      printedReferenceGlyph: '己',
      sourcePrintedScanReadings: 3,
      jiaDayVisibleAdditionalJiIsRegularWealth: true,
      whichAppearancesTriggerProhibition: 'UNADJUDICATED',
    });
    expect(condition(x, 'ONLY_ONE_POSITION')).toMatchObject({
      chartRepresentationalMultiplicityObserved: true,
      directClassicalOccurrenceCountComputed: false,
      sourceQualifiedSingletonVerdict: 'UNADJUDICATED',
    });
    expect(condition(x, 'VISIBLE_VS_HIDDEN_PRIORITY')).toMatchObject({
      hourVisibilityChannel: 'HOUR_BRANCH_WU_HIDDEN_ONLY',
      sourceQualifiedPatternVerdict: 'UNADJUDICATED',
    });
    expect(x.provenance).toMatchObject({
      siKuCadalPrintedImagePage: 104,
      harvardPrintedPdfPage: 45,
      nlcPrintedPdfPage: 43,
      historicalWitnessLineageIndependenceEstablished: false,
    });
    expect(x.sourceQualifiedHourWealthPatternEstablished).toBe(false);
    expect(x.producesNewInterpretationClaim).toBe(false);
    expect(x.productionAuthorized).toBe(false);
  });
  it('05:30 keeps real exact 겁재, never copies the 甲戌時 example', () => {
    const x = buildGeneralNatalN27HourWealthConditionMatrix(actual2010(5));
    expect(x.observations).toMatchObject({
      hourKnown: true,
      hourBranch: '묘',
      literalExampleStatus: 'NOT_MATCHED',
      hourWealthObservationChannel: 'NO_HOUR_WU_OBSERVED',
      exactGyeopJaeObserved: true,
      indirectWealthWuHiddenInHourBranch: false,
    });
    expect(condition(x, 'PEER_TERM_NOT_EXACT_T8')).toMatchObject({
      classicalXiongDiDoesNotAuthorizeExactT8Replacement: true,
    });
    expect(x.sourceQualifiedHourWealthPatternEstablished).toBe(false);
  });
  it('unknown birth hour cannot infer hour source predicates', () => {
    const x = buildGeneralNatalN27HourWealthConditionMatrix(actual2010(null));
    expect(x.observations.literalExampleStatus).toBe('HOUR_UNRESOLVED');
    expect(x.observations.hourWealthObservationChannel).toBe('HOUR_UNRESOLVED');
    expect(x.sourceQualifiedHourWealthPatternEstablished).toBe(false);
    expect(x.previewAdmissionGranted).toBe(false);
    expect(x.officialAdmissionGranted).toBe(false);
  });
  it('is content-addressed and has seven independent source scopes, no admission', () => {
    const snap = actual2010(19);
    const a = buildGeneralNatalN27HourWealthConditionMatrix(snap);
    const b = buildGeneralNatalN27HourWealthConditionMatrix(snap);
    expect(a.evidenceHash).toBe(b.evidenceHash);
    expect(a.evidenceHash).toMatch(/^[0-9a-f]{64}$/);
    expect(a.sourceClauseAudit.map((p) => p.key)).toEqual([
      'JIA_XU_HOUR_EXAMPLE', 'OTHER_PALACE_EXCLUSION',
      'NO_ADDITIONAL_WU_JI', 'ONLY_ONE_POSITION',
      'VISIBLE_VS_HIDDEN_PRIORITY', 'STRENGTH_OFFICER_SEAL_AND_BREAK',
      'PEER_TERM_NOT_EXACT_T8',
    ]);
    expect(a.chartLevelStrengthApproved).toBe(false);
    expect(a.classicalOnlyOneWealthPredicateAdjudicated).toBe(false);
    expect(a.status).toBe('RESEARCH_CONDITION_AUDIT_ONLY');
  });
});
