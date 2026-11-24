import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { BirthInput } from '../src/contracts/calculation.js';
import { judgeWholeChart } from '../src/interpretation/whole-chart-judgment.js';
import {
  requireWholeChartJudgment,
  runInterpretation,
} from '../src/interpretation/interpretation-engine.js';
import { createCareerMultifactorResearchRegistry } from '../src/research/career-natal-multifactor-candidate.js';
import { buildThreeTemporalMenusBirthReading } from '../src/preview/three-temporal-menus-birth-reading.js';
import { runNatalS6QualityRegression } from '../src/preview/natal-five-domain-quality-regression.js';
import {
  buildWholeChartNatalReading,
  currentWholeChartWindow,
  selectWholeChartJudgment,
} from '../src/preview/whole-chart-reading.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { judgeWholeChartPeriods } from '../src/reading/whole-chart-periods.js';

const NOW = '2026-06-15T00:00:00.000Z';

function birth(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  sex: 'male' | 'female' = 'female',
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour, minute },
    sexForTraditionalCalculation: sex,
  };
}

function snapshot(input: BirthInput) {
  return calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, {
    now: new Date(NOW),
  });
}

function observed(input: BirthInput) {
  const judgment = judgeWholeChart(snapshot(input));
  if (judgment.state !== 'observed') throw new Error('Expected a resolved month and day master.');
  return judgment;
}

describe('whole-chart interpretation by structural context', () => {
  it('binds the common judgment to the same verified interpretation run and calculation', () => {
    const first = snapshot(birth(1992, 6, 25, 22, 40, 'male'));
    const second = snapshot(birth(1969, 10, 1, 3, 5));
    const registry = createCareerMultifactorResearchRegistry();
    const execution = runInterpretation(first, registry, { now: new Date(NOW) });
    expect(requireWholeChartJudgment(first, execution)).toEqual(judgeWholeChart(first));
    const selected = selectWholeChartJudgment(first, execution, registry);
    expect(execution.evidenceIndex[selected.claimId]?.researchEvidenceRefs).toHaveLength(1);
    expect(selected.evidenceBundleHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(() => selectWholeChartJudgment(first, { ...execution, claims: [] }, registry)).toThrow(
      /single whole-chart claim/u,
    );
    expect(() => requireWholeChartJudgment(second, execution)).toThrow(
      /same successful interpretation run/u,
    );
    expect(runInterpretation(first, registry, { now: new Date(NOW) }).run.runHash).toBe(
      execution.run.runHash,
    );
  });
  it('attaches a source-bounded non-numeric readiness graph instead of a strong/weak verdict', () => {
    const chart = observed(birth(1992, 6, 25, 22, 40, 'male'));
    expect(chart.strengthReadiness.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(chart.strengthReadiness.numericScoringAuthorized).toBe(false);
    expect(chart.strengthReadiness.strongWeakVerdict).toBe('not_emitted');
    expect(chart.strengthReadiness.blockers).toContain('SUPPORT_EFFECT_VERDICT_UNRESOLVED');
    expect(chart.strengthReadiness.blockers).toContain('CHALLENGE_EFFECT_VERDICT_UNRESOLVED');
    expect(chart.strengthReadiness.blockers).toContain('CLASSIFIER_POLICY_NOT_AUTHORIZED');
    expect([
      'STOP_WITH_INDETERMINATE',
      'ROUTE_SPECIAL_PATTERN_REVIEW',
      'STOP_FOR_METHODOLOGY_REVIEW',
    ]).toContain(chart.strengthReadiness.terminalDecision);
  });

  it('routes unknown-time strength review to an indeterminate scenario instead of using the base snapshot', () => {
    const input = birth(1992, 6, 25, 22, 40, 'male');
    const chart = observed({ ...input, time: { known: false } });
    expect(chart.strengthReadiness.status).toBe('INPUT_INDETERMINATE');
    expect(chart.strengthReadiness.terminalDecision).toBe('STOP_WITH_INDETERMINATE');
    expect(chart.strengthReadiness.blockers[0]).toBe('INPUT_OR_SCENARIO_INDETERMINATE');
    expect(chart.strengthReadiness.strongWeakVerdict).toBe('not_emitted');
  });

  it('changes the underlying interpretation when the visible Ten-God sequence is identical', () => {
    const first = birth(1992, 6, 25, 22, 40, 'male');
    const second = birth(1969, 10, 1, 3, 5);
    const a = observed(first);
    const b = observed(second);
    const visible = (chart: typeof a) =>
      chart.positions.filter((pos) => pos.location === 'visible').map((pos) => pos.god);
    expect(visible(a)).toEqual(['비견', '편재', '정인']);
    expect(visible(a)).toEqual(visible(b));
    expect(a.month.branch).not.toBe(b.month.branch);
    expect(a.pattern.state).toBe('competing_month_signals');
    expect(a.pattern.monthStemObservations.length).toBeGreaterThan(0);
    expect(
      a.pattern.monthStemObservations.every(
        ({ evidence, supportContext, challenges, remedyCandidates, monthContacts }) =>
          evidence.paths.some((path) => path.startsWith('derivedFacts.hiddenStems.month')) &&
          Array.isArray(supportContext.witnesses) &&
          Array.isArray(challenges) &&
          Array.isArray(remedyCandidates) &&
          Array.isArray(monthContacts),
      ),
    ).toBe(true);
    expect(
      buildWholeChartNatalReading(snapshot(first), 'career', NOW).paragraphs.join(' '),
    ).toContain('월지 지장간 구성 요소를 각각 관측했습니다');
    expect(
      buildWholeChartNatalReading(snapshot(first), 'career', NOW).semanticKey.some((key) =>
        key.startsWith('month_component:'),
      ),
    ).toBe(true);
    expect(b.pattern.state).toBe('challenged');
    expect(b.pattern.monthStemObservations).toHaveLength(1);
    expect(a.strength.state).toBe('contested_roots');
    expect(b.strength.state).toBe('roots_offset_season');
    const profile = (input: BirthInput) =>
      buildWholeChartNatalReading(snapshot(input), 'wealth', NOW).semanticKey;
    expect(profile(first)).not.toEqual(profile(second));
  });

  it('records per-signal support and contact observations without establishing a pattern', () => {
    const base = snapshot(birth(2000, 1, 10, 12, 0));
    if (base.derivedFacts.dayMaster.status !== 'resolved' || !base.derivedFacts.hiddenStems) {
      throw new Error('Expected a complete base snapshot for the synthetic structural fixture.');
    }
    const pillar = (
      current: typeof base.pillars.year,
      stem: '갑' | '신' | '계',
      stemHanja: string,
      stemElement: '목' | '금' | '수',
      stemYinYang: '양' | '음',
      branch: '인' | '축',
      branchHanja: string,
      branchElement: '목' | '토',
      branchYinYang: '양' | '음',
    ) => {
      if (current.status !== 'resolved') throw new Error('Expected a resolved pillar.');
      return {
        ...current,
        value: {
          ...current.value,
          stem: {
            ...current.value.stem,
            value: stem,
            hanja: stemHanja,
            element: stemElement,
            yinYang: stemYinYang,
          },
          branch: {
            ...current.value.branch,
            value: branch,
            hanja: branchHanja,
            element: branchElement,
            yinYang: branchYinYang,
          },
        },
      };
    };
    const synthetic = {
      ...base,
      calculationHash: 'synthetic-month-signals',
      pillars: {
        year: pillar(base.pillars.year, '신', '辛', '금', '음', '인', '寅', '목', '양'),
        month: pillar(base.pillars.month, '갑', '甲', '목', '양', '축', '丑', '토', '음'),
        day: pillar(base.pillars.day, '갑', '甲', '목', '양', '인', '寅', '목', '양'),
        hour: pillar(base.pillars.hour, '계', '癸', '수', '음', '인', '寅', '목', '양'),
      },
      derivedFacts: {
        ...base.derivedFacts,
        dayMaster: {
          status: 'resolved' as const,
          value: {
            ...base.derivedFacts.dayMaster.value,
            value: '갑' as const,
            hanja: '甲',
            element: '목' as const,
            yinYang: '양' as const,
          },
        },
        hiddenStems: {
          ...base.derivedFacts.hiddenStems,
          year: { status: 'resolved' as const, value: ['무', '병', '갑'] as const },
          month: { status: 'resolved' as const, value: ['계', '신', '기'] as const },
          day: { status: 'resolved' as const, value: ['무', '병', '갑'] as const },
          hour: { status: 'resolved' as const, value: ['무', '병', '갑'] as const },
        },
        structuralRelations: { status: 'resolved' as const, value: [] },
      },
    };
    const judgment = judgeWholeChart(synthetic);
    if (judgment.state !== 'observed') throw new Error('Expected the synthetic chart to be observable.');
    expect(
      judgment.pattern.monthStemObservations.map(({ position }) => position.god),
    ).toEqual(['정인', '정관']);
    expect(
      judgment.pattern.monthStemObservations.every(
        ({ evidence, supportContext, challenges, remedyCandidates, monthContacts }) =>
          evidence.paths.some((path) => path.startsWith('derivedFacts.hiddenStems.month')) &&
          Array.isArray(supportContext.witnesses) &&
          Array.isArray(challenges) &&
          Array.isArray(remedyCandidates) &&
          Array.isArray(monthContacts),
      ),
    ).toBe(true);
    expect(judgment.pattern.state).toBe('competing_month_signals');
    expect(judgment.roles.supportCandidates).toEqual([]);
    expect(judgment.roles).not.toHaveProperty('yong');
    expect(judgment.roles).not.toHaveProperty('xi');
    expect(judgment.roles).not.toHaveProperty('ji');
    expect(judgment.roles.fuyiReview.status).toBe('held_pending_methodology');
    expect(judgment.roles.fuyiReview.direction).toBe('not_determined');
    const reading = buildWholeChartNatalReading(synthetic, 'career', NOW);
    expect(reading.paragraphs.join(' ')).toContain('격국 후보의 정체·순위·강도·성립');
    expect(
      reading.paragraphs.filter((paragraph) =>
        paragraph.includes('월지 지장간 구성 요소를 각각 관측했습니다'),
      ),
    ).toHaveLength(1);
    expect(reading.paragraphs.join(' ')).toContain('정인');
    expect(reading.paragraphs.join(' ')).toContain('정관');
    expect(reading.paragraphs.join(' ')).toContain('정인(학습과 지원) 관점에서는');
    expect(reading.paragraphs.join(' ')).toContain('정관(책임과 규범) 관점에서는');
    expect(reading.paragraphs.join(' ')).not.toContain(
      '성과를 실제 자원으로 연결하는 역할에서 교환 기준과 결과 책임을 함께 봅니다.',
    );
    expect(reading.semanticKey[0]).toContain('competing_month_signals:');
  });

  it('distinguishes two charts with the same Hurting Officer anchor using counterevidence', () => {
    const compatible = birth(2004, 8, 10, 7, 55);
    const contested = birth(1984, 9, 11, 1, 24);
    const good = observed(compatible);
    const other = observed(contested);
    expect(good.pattern.anchor?.god).toBe('상관');
    expect(other.pattern.anchor?.god).toBe('상관');
    expect(good.pattern.state).toBe('supported');
    expect(other.pattern.state).toBe('challenged');
    expect(good.roles.supportCandidates.length).toBeGreaterThan(0);
    expect(other.roles.supportCandidates).toEqual([]);
    expect(good.pattern.evidence.paths).toContain(good.pattern.anchor?.path);
    expect(other.pattern.disrupting.length + other.pattern.challenges.length).toBeGreaterThan(0);
    for (const domain of ['career', 'business', 'wealth', 'relationship'] as const) {
      const reading = buildWholeChartNatalReading(snapshot(compatible), domain, NOW);
      expect(reading.judgmentId).toBe(good.judgmentId);
      expect(reading.semanticKey).not.toEqual(
        buildWholeChartNatalReading(snapshot(contested), domain, NOW).semanticKey,
      );
      expect(reading.paragraphs.join(' ')).toContain('뒷받침합니다');
    }
  });

  it('keeps a remedy candidate and the opposition visible without resolving contested roles', () => {
    const input = birth(1990, 12, 7, 12, 45, 'male');
    const chart = observed(input);
    expect(chart.pattern.state).toBe('repair_under_review');
    expect(chart.pattern.challenges.length).toBeGreaterThan(0);
    expect(chart.pattern.remedies.length).toBeGreaterThan(0);
    expect(chart.roles.supportCandidates).toEqual([]);
    expect(observed(input)).toEqual(chart);
  });

  it('distinguishes grounded Seal protection from ungrounded and wealth-countered remedies', () => {
    const protectedInput = birth(1965, 12, 28, 22, 30);
    const protectedChart = observed(protectedInput);
    const ungrounded = observed(birth(1960, 11, 17, 0, 30));
    const wealthCounter = observed(birth(1962, 9, 13, 6, 30));
    for (const chart of [protectedChart, ungrounded, wealthCounter]) {
      expect(chart.pattern.anchor?.god).toBe('정관');
      expect(chart.pattern.challenges.map(({ god }) => god)).toContain('상관');
      expect(chart.pattern.remedies.length).toBeGreaterThan(0);
    }
    expect(protectedChart.pattern.state).toBe('locally_protected');
    expect(protectedChart.roles.supportCandidates.map(({ god }) => god)).toEqual(['정인']);
    expect(ungrounded.pattern.officerRepair.state).toBe('grounding_or_combination_unsettled');
    expect(wealthCounter.pattern.officerRepair.state).toBe('competing_wealth');
    expect(ungrounded.roles.supportCandidates).toEqual([]);
    expect(wealthCounter.roles.supportCandidates).toEqual([]);
    expect(
      buildWholeChartNatalReading(snapshot(protectedInput), 'career', NOW).paragraphs.join(' '),
    ).toContain('정인 작용이 이 부담을 조절할 근거');
  });

  it('preserves independent root support and distinguishes the exposed month role', () => {
    const roots = observed(birth(1960, 1, 5, 2, 30));
    expect(roots.strength.state).toBe('independent_support_with_contested_roots');
    expect(roots.strength.availableRoots).toEqual(['year']);
    expect(roots.strength.contestedRootSlots).toEqual(['month', 'day', 'hour']);
    const shift = observed(birth(1960, 2, 5, 6, 30));
    expect(shift.pattern.selectionMode).toBe('exposed_secondary_month_role');
    expect(shift.month.god).toBe('상관');
    expect(shift.pattern.anchor?.god).toBe('정관');
  });

  it('distinguishes rooted, exposed-only, concealed, and absent wealth under a Food God anchor', () => {
    const rooted = birth(1960, 11, 4, 0, 30);
    const exposed = birth(1960, 1, 10, 0, 30);
    const concealed = birth(1960, 1, 10, 4, 30);
    const absent = birth(1960, 4, 5, 6, 30);
    const rootedChart = observed(rooted);
    const exposedChart = observed(exposed);
    const concealedChart = observed(concealed);
    const absentChart = observed(absent);
    for (const chart of [rootedChart, exposedChart, concealedChart, absentChart])
      expect(chart.pattern.anchor?.god).toBe('식신');
    expect(rootedChart.pattern.state).toBe('supported');
    expect(rootedChart.pattern.supportContext.witnesses).toContainEqual(
      expect.objectContaining({
        state: 'exposed_with_independent_root',
        independentRoots: [
          expect.objectContaining({ location: 'hidden', slot: 'day', god: '편재' }),
        ],
      }),
    );
    expect(exposedChart.pattern.supportContext.witnesses[0]?.state).toBe(
      'exposed_without_same_stem_root',
    );
    expect(concealedChart.pattern.supportContext.concealed.map(({ slot }) => slot)).toEqual([
      'month',
      'day',
    ]);
    expect([exposedChart.roles.supportCandidates, concealedChart.roles.supportCandidates, absentChart.roles.supportCandidates]).toEqual([
      [],
      [],
      [],
    ]);
    const text = (input: BirthInput) =>
      buildWholeChartNatalReading(snapshot(input), 'wealth', NOW).paragraphs.join(' ');
    expect(text(rooted)).toContain('일주 지장간의 뿌리');
    expect(text(exposed)).toContain('연결의 지속성은 보류');
    expect(text(concealed)).toContain('지장간에 있습니다');
    expect(text(absent)).toContain('천간·지지·지장간에서 재성은 관측되지 않습니다');
  });

  it('reads independent production and resource facts when all wealth channels are empty', () => {
    const input = birth(1984, 12, 5, 5, 2);
    const chart = observed(input);
    const theme = chart.themes.wealth;
    expect(theme.state).toBe('not_observed');
    expect(theme.indirectEvidence?.production).toContainEqual(
      expect.objectContaining({ location: 'visible', slot: 'year' }),
    );
    expect(theme.evidence.paths).toContain('derivedFacts.hiddenStems.hour');
    expect(
      buildWholeChartNatalReading(snapshot(input), 'wealth', NOW).paragraphs.join(' '),
    ).toContain('거래 조건과 대가는 재성 근거가 드러나는 시기');

    const unknown = observed({ ...input, time: { known: false } });
    expect(unknown.themes.wealth.state).toBe('unresolved');
    expect(unknown.themes.wealth.indirectEvidence).toBeUndefined();

    const visibleWealth = observed(birth(1960, 1, 10, 0, 30));
    expect(visibleWealth.themes.wealth.state).toBe('observed');
    expect(visibleWealth.themes.wealth.indirectEvidence).toBeUndefined();
  });

  it('changes the wealth evidence at the exact annual and monthly transitions for that chart', () => {
    const result = buildThreeTemporalMenusBirthReading(birth(1984, 12, 5, 5, 2), {
      requestId: 'whole-chart-incoming-wealth',
      targetYear: 2026,
      targetMonth: 8,
      referenceDateTime: '2026-08-15T00:00:00.000Z',
    });
    const { annualChartReading, monthlyChartReading } = result.annualMonthly.report;
    expect(
      annualChartReading
        .find(({ effectiveYear }) => effectiveYear === 2025)
        ?.layers.find(({ kind }) => kind === 'annual')?.introducesWealth,
    ).toBe(false);
    expect(
      annualChartReading
        .find(({ effectiveYear }) => effectiveYear === 2026)
        ?.layers.find(({ kind }) => kind === 'annual')?.introducesWealth,
    ).toBe(true);
    expect(
      monthlyChartReading
        .find(({ monthSegment }) => monthSegment === 'before_jeol')
        ?.layers.find(({ kind }) => kind === 'monthly')?.introducesWealth,
    ).toBe(false);
    const lateMonth = monthlyChartReading.find(({ monthSegment }) => monthSegment === 'after_jeol');
    expect(lateMonth?.layers.find(({ kind }) => kind === 'monthly')).toMatchObject({
      introducesWealth: true,
      pillar: { stem: '병' },
    });
    expect(lateMonth?.text).toMatch(/거래와 대가의 주제는 .*월운의/u);
  });

  it('preserves verified positions without inferring an unknown hour or a spouse star from missing input', () => {
    const input = {
      ...birth(1998, 3, 28, 22, 19),
      time: { known: false as const },
      sexForTraditionalCalculation: 'unspecified' as const,
    };
    const chart = observed(input);
    expect(chart.allResolved).toBe(false);
    expect(chart.pattern.state).toBe('unresolved');
    expect(chart.positions.every((item) => item.slot !== 'hour')).toBe(true);
    expect(chart.themes.relationship.spouseWitnesses).toEqual([]);
    expect(
      judgeWholeChartPeriods(snapshot(input), chart, 2026).windows.every(
        (item) => item.direction === 'held',
      ),
    ).toBe(true);
  });

  it('uses both the Ipchun boundary and the exact June Dayun transition in annual and monthly results', () => {
    const input = birth(1996, 4, 5, 10, 36);
    const result = buildThreeTemporalMenusBirthReading(input, {
      requestId: 'whole-chart-boundaries',
      targetYear: 2026,
      targetMonth: 6,
      referenceDateTime: NOW,
    });
    const { annualChartReading, monthlyChartReading } = result.annualMonthly.report;
    expect(result.annualMonthly.report.wholeChartGrounding.claimId).toMatch(/^claim_/u);
    expect(result.annualMonthly.report.wholeChartGrounding.evidenceBundleHash).toHaveLength(64);
    expect(annualChartReading.map((item) => [item.effectiveYear, item.dayunIndex])).toEqual([
      [2025, 2],
      [2026, 2],
      [2026, 3],
    ]);
    const lastWindow = annualChartReading.at(-1)!;
    expect(lastWindow.startsAt).toBe('2026-06-13T01:36:00.000Z');
    expect(monthlyChartReading.map((item) => [item.monthSegment, item.dayunIndex])).toEqual([
      ['before_jeol', 2],
      ['after_jeol', 2],
      ['after_jeol', 3],
    ]);
    expect(monthlyChartReading.at(-1)?.startsAt).toBe(lastWindow.startsAt);
    expect(monthlyChartReading.at(-2)?.endsAt).toBe(lastWindow.startsAt);
    expect(monthlyChartReading.at(-1)?.text).toContain('이 구간의 월운');
    expect(result.html).toContain(lastWindow.text);
    expect(
      result.annualMonthly.monthlyMenu.referenceFocus?.currentSection?.chartWindows,
    ).toHaveLength(2);
    expect(result.annualMonthly.monthlyMenu.referenceFocus?.currentChartWindow?.dayunIndex).toBe(3);
    expect(
      currentWholeChartWindow(monthlyChartReading, '2026-06-13T01:35:59.999Z')?.dayunIndex,
    ).toBe(2);
    expect(
      currentWholeChartWindow(monthlyChartReading, '2026-06-13T01:36:00.000Z')?.dayunIndex,
    ).toBe(3);
    expect(result.mayGrantOfficialAuthority).toBe(false);
  });

  it('revisits a supporting Dayun only when the active year or month directly clashes with it', () => {
    const result = buildThreeTemporalMenusBirthReading(birth(1992, 9, 25, 8, 30, 'male'), {
      requestId: 'whole-chart-supporting-dayun',
      targetYear: 2026,
      targetMonth: 6,
      referenceDateTime: NOW,
    });
    const { annualChartReading, monthlyChartReading } = result.annualMonthly.report;
    expect(annualChartReading[0]?.layerRelations).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ effect: 'support_under_review' })]),
    );
    const afterIpchun = annualChartReading.find(({ effectiveYear }) => effectiveYear === 2026)!;
    expect(afterIpchun.layerRelations).toContainEqual(
      expect.objectContaining({
        background: 'dayun',
        current: 'annual',
        branches: ['자', '오'],
        effect: 'support_under_review',
      }),
    );
    expect(afterIpchun.direction).toBe('competing');
    expect(monthlyChartReading[0]?.monthlyShift).toBe('adds_coordination');
    expect(monthlyChartReading[1]?.startsAt).toBe('2026-06-05T15:48:00.000Z');
    expect(monthlyChartReading[1]?.monthlyShift).toBe('contests_background_support');
    expect(monthlyChartReading[1]?.layerRelations).toContainEqual(
      expect.objectContaining({ current: 'monthly', effect: 'support_under_review' }),
    );
    expect(monthlyChartReading[1]?.text).toContain('월운에서 배경 운의 지원');
    expect(monthlyChartReading[1]?.topics).toContainEqual(
      expect.objectContaining({ area: 'business', direction: 'competing' }),
    );
    expect(afterIpchun.text).not.toContain('월운에서 배경 운의 지원');
  });

  it('traces the exact transient stem exposing a hidden natal month role across Jeol', () => {
    const result = buildThreeTemporalMenusBirthReading(birth(1960, 1, 1, 0, 30, 'male'), {
      requestId: 'whole-chart-hidden-month-role',
      targetYear: 2026,
      targetMonth: 6,
      referenceDateTime: NOW,
    });
    const [before, after] = result.annualMonthly.report.monthlyChartReading;
    expect(before?.layers.find(({ kind }) => kind === 'monthly')?.hiddenMonthRole).toMatchObject({
      stem: '계',
      god: '정재',
      paths: ['derivedFacts.hiddenStems.month.value.0'],
    });
    expect(before?.text).toContain('월운 천간의 계에서');
    expect(after?.layers.find(({ kind }) => kind === 'monthly')?.hiddenMonthRole).toBeUndefined();
    expect(after?.text).not.toContain('월운 천간의 계에서');
  });

  it('renders integrated conclusions in the four existing natal articles', () => {
    const example = runNatalS6QualityRegression().cases[0]!.html;
    for (const domain of ['career', 'business', 'wealth', 'relationship']) {
      const article = example
        .split(`aria-labelledby="domain-${domain}"`)[1]
        ?.split('</article>')[0];
      expect(article).toContain('명식 전체에서 읽는 결론');
      expect(article).toContain('판단 근거');
    }
  });
});
