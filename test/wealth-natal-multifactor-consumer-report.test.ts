import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  WEALTH_NATAL_MULTIFACTOR_RULES,
  WEALTH_NATAL_CROSS_CHANNEL_RULES,
  WEALTH_NATAL_CROSS_CHANNEL_OFFICER_RULES,
  WEALTH_NATAL_CROSS_CHANNEL_OFFICER_METHODOLOGY,
  WEALTH_NATAL_CROSS_CHANNEL_RESOURCE_RULES,
  WEALTH_NATAL_CROSS_CHANNEL_RESOURCE_METHODOLOGY,
  WEALTH_NATAL_CROSS_CHANNEL_PEER_RULES,
  WEALTH_NATAL_CROSS_CHANNEL_PEER_METHODOLOGY,
  WEALTH_NATAL_MULTIFACTOR_PACK,
  createWealthNatalMultifactorRegistry,
} from '../src/research/wealth-natal-multifactor-candidate.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { observeHiddenWealthMembership } from '../src/preview/wealth-hidden-stem-observations.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';

const registry = createWealthNatalMultifactorRegistry();
const NOW = new Date('2026-10-19T00:00:00.000Z');
function sample(month: number, day: number, known = true, hour = 12) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: known ? { known: true, hour, minute: 0 } as const : { known: false } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function run(month: number, day: number, known = true, hour = 12) {
  const snapshot = sample(month, day, known, hour);
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  return { snapshot, execution,
    report: buildWealthNatalMultifactorReport(snapshot, execution, registry) };
}
describe('actual-source Wealth natal T5→T8→Korean five-domain report', () => {
  it('is Wealth-only, research-only, and every T8 has 2/3 exact T5 inputs', () => {
    expect(registry.pack.packId).toBe(WEALTH_NATAL_MULTIFACTOR_PACK.packId);
    expect(WEALTH_NATAL_MULTIFACTOR_RULES).toHaveLength(18);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T5')).toHaveLength(10);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T8')).toHaveLength(26);
    expect(WEALTH_NATAL_CROSS_CHANNEL_RULES).toHaveLength(2);
    expect(WEALTH_NATAL_CROSS_CHANNEL_OFFICER_RULES).toHaveLength(2);
    expect(WEALTH_NATAL_CROSS_CHANNEL_RESOURCE_RULES).toHaveLength(2);
    expect(WEALTH_NATAL_CROSS_CHANNEL_PEER_RULES).toHaveLength(2);
    expect(registry.methodologies.some(m =>
      m.methodologyId === WEALTH_NATAL_CROSS_CHANNEL_PEER_METHODOLOGY.methodologyId &&
      m.status === 'research')).toBe(true);
    expect(WEALTH_NATAL_CROSS_CHANNEL_PEER_RULES.every(rule =>
      rule.status === 'research' && rule.inputs.length === 2 &&
      rule.inputs.every(input => input.source === 'interpretation_claim' &&
        input.required && input.cardinality === 'exactly_one') &&
      rule.sourceRefs.length === 2 &&
      (rule.output.value as { axis?: string }).axis === 'tension')).toBe(true);
    expect(registry.methodologies.some(m =>
      m.methodologyId === WEALTH_NATAL_CROSS_CHANNEL_RESOURCE_METHODOLOGY.methodologyId &&
      m.status === 'research')).toBe(true);
    expect(WEALTH_NATAL_CROSS_CHANNEL_RESOURCE_RULES.every(rule =>
      rule.status === 'research' && rule.inputs.length === 2 &&
      rule.inputs.every(input => input.source === 'interpretation_claim' &&
        input.required && input.cardinality === 'exactly_one') &&
      rule.sourceRefs.length === 2 &&
      (rule.output.value as { axis?: string }).axis === 'planning')).toBe(true);
    expect(registry.methodologies.some(method =>
      method.methodologyId === WEALTH_NATAL_CROSS_CHANNEL_OFFICER_METHODOLOGY.methodologyId &&
      method.status === 'research')).toBe(true);
    expect(WEALTH_NATAL_CROSS_CHANNEL_OFFICER_RULES.every(rule =>
      rule.status === 'research' && rule.inputs.length === 2 &&
      rule.inputs.every(input =>
        input.source === 'interpretation_claim' && input.required &&
        input.cardinality === 'exactly_one') &&
      rule.sourceRefs.length === 2 &&
      (rule.output.value as { axis?: string }).axis === 'management')).toBe(true);
    expect(WEALTH_NATAL_CROSS_CHANNEL_RULES.every(rule =>
      rule.status === 'research' && rule.inputs.length === 2 &&
      rule.inputs.every(i => i.required && i.cardinality === 'exactly_one') &&
      rule.sourceRefs.length === 2)).toBe(true);
    expect(registry.rules.filter(r => r.taxonomy.subcategory === 'self_baseline')).toHaveLength(0);
    for(const rule of WEALTH_NATAL_MULTIFACTOR_RULES) {
      expect(rule.taxonomy.category).toBe('wealth');
      expect(rule.inputs.length).toBeGreaterThanOrEqual(2);
      expect(rule.inputs.every(i => i.source === 'interpretation_claim' &&
        i.cardinality === 'exactly_one' && i.required)).toBe(true);
      expect(rule.sourceRefs).toHaveLength(2);
      expect(rule.status).toBe('research');
    }
    const resourceCore = WEALTH_NATAL_MULTIFACTOR_RULES.filter(rule =>
      (rule.output.value as { pattern?: string }).pattern === 'WEALTH_OFFICER_RESOURCE');
    expect(resourceCore).toHaveLength(2);
    for (const rule of resourceCore) {
      const families = rule.inputs.map(input => input.pathOrClaimType);
      expect(families.some(type => type.includes('_WEALTH_'))).toBe(true);
      expect(families.some(type => type.includes('_OFFICER_'))).toBe(true);
      expect(families.some(type => type.includes('_RESOURCE_'))).toBe(true);
      expect(rule.output.emphasis).toBe('major');
      expect(rule.sourceRefs).toHaveLength(2);
    }
    const indirect = WEALTH_NATAL_MULTIFACTOR_RULES.filter(rule =>
      (rule.output.value as { axis?: string }).axis === 'context');
    expect(indirect).toHaveLength(4);
    expect(indirect.every(rule =>
      (rule.output.value as { directWealthReadingAuthorized?: boolean })
        .directWealthReadingAuthorized === false)).toBe(true);
    expect(inspectMyeonghwaProductionComposition({registry}).status).toBe('blocked');
  });

  it('produces real chart-specific Wealth meanings, with two or three matching upstream Claims', () => {
    const data = [];
    for(const month of [2,3,4,5,6,7]) for(const day of [3,7,11,17,23]) {
      const x = run(month,day);
      if(x.report.sections.length) {
        data.push({ ...x, signature: x.report.sections.map(s=>s.pattern).sort().join('|') });
      }
    }
    const first = data[0];
    const second = data.find(x => x.signature !== first?.signature &&
      x.snapshot.calculationHash !== first?.snapshot.calculationHash);
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    if(!first || !second) return;
    expect(first.report.sections.map(x=>x.headline)).not.toEqual(
      second.report.sections.map(x=>x.headline));
    for(const x of [first,second]) {
      if (x.report.sections.some(section => section.axis !== 'context')) {
        expect(x.report.sections.every(section => section.axis !== 'context')).toBe(true);
      }
      for(const s of x.report.sections) {
        expect(s.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions).toHaveLength(s.observedFactPaths.length);
        expect(s.paragraph).toContain('이 원국에서 확인된 근거는');
        expect(s.paragraph).toMatch(/비겁\(|인성\(|식상\(|재성\(|관성\(/u);
        expect(s.paragraph).toMatch(/(같은 (천간|지지 대표 십신)에서 관측된|서로 다른 관측 범위)/u);
        expect(s.paragraph).toContain(s.headline);
        expect(s.observedPositions.every(p=>s.paragraph.includes(p))).toBe(true);
        expect(s.observedFactPaths.every(path =>
          /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path)))
          .toBe(true);
      }
      expect(x.report.mayPublish).toBe(false);
      expect(x.report.maySell).toBe(false);
      expect(x.report.usefulComplete).toBe(false);
    }
    expect(run(3,10).report).toEqual(run(3,10).report);
  }, 30000);

  it('rejects altered Korean T5 meaning in an incomplete Wealth reading', () => {
    const snapshot = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1981, month: 2, day: 1 },
      time: { known: true, hour: 13, minute: 52 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const base = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    expect(base.state).toBe('insufficient');
    expect(base.sections).toHaveLength(0);
    expect(base.availableThemeContext?.themes.length).toBeGreaterThan(0);
    const relevant = base.availableThemeContext!.themes[0]!;
    const active = execution.claims.find(claim => claim.claimId === relevant.claimId);
    expect(active).toBeDefined();
    const sourceRule = registry.rules.find(rule =>
      rule.ruleId === active?.ruleRefs[0]?.ruleId);
    expect(sourceRule?.output.value).toMatchObject({
      headline: relevant.headline, summary: relevant.summary,
    });
    const forged = {
      ...execution,
      claims: execution.claims.map(claim =>
        claim.claimId === relevant.claimId
          ? { ...claim, value: {
            ...(claim.value as Record<string, unknown>),
            summary: '이 명식의 투자 수익은 확실히 증가합니다.',
          } }
          : claim),
    };
    expect(() => buildWealthNatalMultifactorReport(snapshot, forged, registry))
      .toThrow('T5 partial meaning lacks its executed registered rule, method, source or original copy');
    const withoutMethod = {
      ...execution,
      claims: execution.claims.map(claim =>
        claim.claimId === relevant.claimId
          ? { ...claim, methodologyRef: { id: 'INVENTED', version: '0.1.0' } }
          : claim),
    };
    expect(() => buildWealthNatalMultifactorReport(snapshot, withoutMethod, registry))
      .toThrow('T5 partial meaning lacks its executed registered rule, method, source or original copy');
    expect(base.availableThemeContext!.themes[0]!.summary).not.toContain('투자 수익');
    expect(base.mayPublish).toBe(false);
    expect(base.maySell).toBe(false);
    expect(base.usefulComplete).toBe(false);
  });

  it('retains distinct existing T5 meanings beside a source-owned but incomplete Wealth core', () => {
    let verified = false;
    outer: for (const hour of [0, 6, 12, 18]) {
      for (const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
        for (const day of [3,7,11,17,23]) {
          const { report, execution, snapshot } = run(month, day, true, hour);
          if (report.state !== 'partial' || !report.readingGuide ||
              !report.availableThemeContext) continue;
          const core = report.sections[0]!;
          const context = report.availableThemeContext;
          expect(['core','creation','management','planning']).toContain(core.axis);
          expect(report.sections.length).toBeLessThan(3);
          expect(report.readingGuide.coreClaimType).toBe(core.claimType);
          expect(context.title).toContain('재물 중심 부분풀이');
          expect(context.paragraph).toContain('부족한 독립 보조 근거를 채우지 않으며');
          expect(context.wealthConclusionAuthorized).toBe(false);
          expect(context.themes.length).toBeGreaterThan(0);
          const selectedIds = new Set(report.sections.flatMap(section => section.upstreamClaimIds));
          const observed = new Set(report.sections.flatMap(section => section.observedFactPaths));
          const activeT5 = new Set(execution.claims.filter(claim =>
            claim.state === 'active' && claim.taxonomy.tier === 'T5' &&
            claim.snapshotId === snapshot.snapshotId).map(claim => claim.claimId));
          for (const theme of context.themes) {
            expect(activeT5.has(theme.claimId)).toBe(true);
            expect(selectedIds.has(theme.claimId)).toBe(false);
            expect(theme.observedFactPaths.every(path => !observed.has(path))).toBe(true);
            expect(theme.ruleIds.length).toBeGreaterThan(0);
            expect(theme.methodologyId.length).toBeGreaterThan(0);
            expect(theme.sourceIds.length).toBeGreaterThan(0);
            expect(context.paragraph).toContain(theme.summary);
          }
          expect(report.usefulComplete).toBe(false);
          expect(report.mayPublish).toBe(false);
          expect(report.maySell).toBe(false);
          expect(report).toEqual(
            buildWealthNatalMultifactorReport(snapshot, execution, registry));
          verified = true;
          break outer;
        }
      }
    }
    expect(verified, 'real chart must have an incomplete Wealth core and unconsumed T5').toBe(true);
  }, 60000);

  it('requires distinct actual Wealth interpretation axes for MUR complete', () => {
    const x = run(3,10);
    if(x.report.state === 'complete') {
      expect(x.report.sections).toHaveLength(3);
      expect(new Set(x.report.sections.map(s=>s.axis)).size).toBe(3);
      expect(new Set(x.report.sections.map(s=>s.pattern)).size).toBe(3);
    } else {
      expect(x.report.missing.length).toBeGreaterThan(0);
      expect(x.report.state).toMatch(/partial|insufficient/);
    }
  });

  it('uses the same calculated chart while giving Wealth a different interpretation from General', () => {
    const wealth = run(3,10);
    const generalRegistry = createGeneralNatalMultifactorRegistry();
    const generalExecution = runInterpretation(wealth.snapshot, generalRegistry, { now: NOW });
    const general = buildGeneralNatalMultifactorReport(
      wealth.snapshot, generalExecution, generalRegistry,
    );
    expect(wealth.report.calculationHash).toBe(general.calculationHash);
    expect(wealth.report.sections.length).toBeGreaterThan(0);
    expect(wealth.report.sections.every(section =>
      section.claimType.startsWith('WEALTH_NATAL_MULTIFACTOR_'))).toBe(true);
    expect(wealth.report.sections.map(section => section.headline)).not.toEqual(
      general.sections.map(section => section.headline));
  });


  it('actually executes and displays sourced opposite-channel Wealth-to-Officer meanings', () => {
    let selected: ReturnType<typeof run> | undefined;
    for (let month = 1; month <= 12 && selected === undefined; month++) {
      for (let day = 1; day <= 28 && selected === undefined; day++) {
        const candidate = run(month, day);
        if (candidate.report.sections.some(section =>
          section.pattern === 'WEALTH_OFFICER' && section.channel === 'cross_channel')) {
          selected = candidate;
        }
      }
    }
    expect(selected).toBeDefined();
    if (!selected) return;
    const { report, execution } = selected;
    const section = report.sections.find(item =>
      item.pattern === 'WEALTH_OFFICER' && item.channel === 'cross_channel')!;
    const claim = execution.claims.find(item => item.claimType === section.claimType)!;
    const meaning = claim.value as {
      familyChannels: { wealth: 'visible_stems' | 'branches'; officer: 'visible_stems' | 'branches' };
    };
    expect(meaning.familyChannels.wealth).not.toBe(meaning.familyChannels.officer);
    expect(section.axis).toBe('management');
    expect(section.upstreamClaimIds.map(id =>
      execution.claims.find(item => item.claimId === id)?.claimType).sort()).toEqual([
      'TEN_GOD_WEALTH_' + meaning.familyChannels.wealth.toUpperCase() + '_THEME',
      'TEN_GOD_OFFICER_' + meaning.familyChannels.officer.toUpperCase() + '_THEME',
    ].sort());
    expect(section.observedFactPaths.some(path => path.endsWith('.stem.value'))).toBe(true);
    expect(section.observedFactPaths.some(path => path.endsWith('.branch.value'))).toBe(true);
    expect(section.paragraph).toContain('재성과 관성은 동일 관측 채널이 아니라');
    expect(section.paragraph).toContain('천간과 지지 대표 십신의 서로 다른 관측 범위');
    expect(section.sourceIds.length).toBe(2);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('executes actual sourced Wealth-to-Resource cross-channel planning interpretations', () => {
    let found: ReturnType<typeof run> | undefined;
    for (let month = 1; month <= 12 && found === undefined; month++) {
      for (let day = 1; day <= 28 && found === undefined; day++) {
        const candidate = run(month, day);
        if (candidate.report.sections.some(section =>
          section.pattern === 'WEALTH_RESOURCE' && section.channel === 'cross_channel')) {
          found = candidate;
        }
      }
    }
    expect(found).toBeDefined();
    if (!found) return;
    const { execution, report, snapshot } = found;
    const section = report.sections.find(item =>
      item.pattern === 'WEALTH_RESOURCE' && item.channel === 'cross_channel')!;
    const claim = execution.claims.find(item =>
      item.claimType === section.claimType && item.state === 'active')!;
    const sourceChannels = (claim.value as {
      familyChannels: { wealth: 'visible_stems' | 'branches'; resource: 'visible_stems' | 'branches' };
    }).familyChannels;
    expect(sourceChannels.wealth).not.toBe(sourceChannels.resource);
    expect(section.axis).toBe('planning');
    expect(section.upstreamClaimIds.map(id =>
      execution.claims.find(item => item.claimId === id)?.claimType).sort()).toEqual([
      'TEN_GOD_WEALTH_' + sourceChannels.wealth.toUpperCase() + '_THEME',
      'TEN_GOD_RESOURCE_' + sourceChannels.resource.toUpperCase() + '_THEME',
    ].sort());
    expect(section.observedFactPaths.some(path => path.endsWith('.stem.value'))).toBe(true);
    expect(section.observedFactPaths.some(path => path.endsWith('.branch.value'))).toBe(true);
    expect(section.paragraph).toContain('재성과 인성은 동일 관측 채널이 아니라');
    expect(section.paragraph).toContain('천간과 지지 대표 십신의 서로 다른 관측 범위');
    expect(section.sourceIds).toHaveLength(2);
    expect(snapshot.snapshotId).toBe(report.snapshotId);
    expect(report.researchOnly).toBe(true);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });


  it('emits only source-executed opposite-channel Peer/Wealth T8 tension', () => {
    let found: ReturnType<typeof run> | undefined;
    for (let month = 1; month <= 12 && found === undefined; month++) {
      for (let day = 1; day <= 28 && found === undefined; day++) {
        const candidate = run(month, day);
        if (candidate.execution.claims.some(claim =>
          claim.state === 'active' &&
          claim.claimType.startsWith('WEALTH_NATAL_MULTIFACTOR_PEER_WEALTH_PEER_') &&
          claim.claimType.endsWith('_CROSS_CHANNEL'))) found = candidate;
      }
    }
    expect(found).toBeDefined();
    if (!found) return;
    const active = found.execution.claims.find(claim =>
      claim.state === 'active' &&
      claim.claimType.startsWith('WEALTH_NATAL_MULTIFACTOR_PEER_WEALTH_PEER_') &&
      claim.claimType.endsWith('_CROSS_CHANNEL'))!;
    const value = active.value as { axis: string;
      familyChannels: { peer: 'visible_stems' | 'branches'; wealth: 'visible_stems' | 'branches' } };
    expect(value.axis).toBe('tension');
    expect(value.familyChannels.peer).not.toBe(value.familyChannels.wealth);
    expect(active.upstreamClaimRefs.map(id =>
      found!.execution.claims.find(claim => claim.claimId === id)?.claimType).sort()).toEqual([
      'TEN_GOD_PEER_' + value.familyChannels.peer.toUpperCase() + '_THEME',
      'TEN_GOD_WEALTH_' + value.familyChannels.wealth.toUpperCase() + '_THEME',
    ].sort());
    expect(active.sourceRefs).toContain(
      'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS');
    const rule = registry.rules.find(item => item.ruleId === active.ruleRefs[0]?.ruleId);
    expect(rule?.methodologyRef.id).toBe('M-WEALTH-NATAL-WHOLE-CHART-PEER-WEALTH-V1');
    const chosen = found.report.sections.find(section => section.claimType === active.claimType);
    if (chosen) {
      expect(chosen.axis).toBe('tension');
      expect(chosen.channel).toBe('cross_channel');
      expect(chosen.paragraph).toContain('비겁과 재성은 동일 관측 채널이 아니라');
      expect(chosen.paragraph).toContain('실제 자산 손실');
      expect(chosen.observedFactPaths.some(x => x.endsWith('.stem.value'))).toBe(true);
      expect(chosen.observedFactPaths.some(x => x.endsWith('.branch.value'))).toBe(true);
    }
    expect(found.report.researchOnly).toBe(true);
    expect(found.report.mayPublish).toBe(false);
    expect(found.report.maySell).toBe(false);
  });

  it('keeps the original tension T8 executed when a sourced whole-chart core becomes available', () => {
    const snapshot = calculateCanonicalSajuSnapshot({
      calendarType: 'solar', date: { year: 1960, month: 11, day: 15 },
      time: { known: true, hour: 12, minute: 41 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    const active = execution.claims.filter(claim =>
      claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'wealth' &&
      claim.predicate === 'wealth_multifactor_structure' && claim.state === 'active');
    expect(active.some(claim => (claim.value as { axis?: string }).axis === 'tension')).toBe(true);
    expect(active.some(claim => (claim.value as { channel?: string }).channel === 'cross_channel'))
      .toBe(true);
    expect(report.sections[0]?.axis).toBe('creation');
    expect(report.sections[0]?.channel).toBe('cross_channel');
    expect(report.sections[0]?.paragraph).toContain('서로 다른 관측 범위');
    expect(report.sections[0]?.sourceIds.length).toBeGreaterThan(0);
    expect(report.sections[0]?.upstreamClaimIds.length).toBe(2);
    expect(report.readingGuide?.coreClaimType).toBe(report.sections[0]?.claimType);
    // The new source-qualified 財→官殺 support can make this formerly partial
    // chart complete under the *research* three-independent-axis criterion.
    expect(report.state).toBe('complete');
    expect(report.sections).toHaveLength(3);
    expect(new Set(report.sections.map(section => section.axis)).size).toBe(3);
    expect(report.sections.some(section =>
      section.pattern === 'WEALTH_OFFICER' &&
      section.channel === 'cross_channel' &&
      section.axis === 'management')).toBe(true);
    expect(report.readingGuide?.supporting).toHaveLength(2);
    const usedPaths = new Set(report.sections[0]!.observedFactPaths);
    for (const support of report.sections.slice(1)) {
      expect(support.sourceIds.length).toBe(2);
      expect(support.upstreamClaimIds).toHaveLength(2);
      const independentPaths = support.observedFactPaths.filter(path => !usedPaths.has(path));
      expect(independentPaths.length).toBeGreaterThan(0);
      independentPaths.forEach(path => usedPaths.add(path));
    }
    expect(report.readingGuide?.paragraph).toContain('독립적인 계산 근거를 더하는 보조 관점 두 가지');
    expect(report.missing).toHaveLength(0);
    expect(report.researchOnly).toBe(true);
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });


  it('exposes existing T5 source meaning with chart facts when no Wealth T8 section can be established', () => {
    const birth = {
      calendarType: 'solar' as const,
      date: { year: 1981, month: 2, day: 1 },
      time: { known: true as const, hour: 13, minute: 52 },
      sexForTraditionalCalculation: 'male' as const,
    };
    const snapshot = calculateCanonicalSajuSnapshot(
      birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW },
    );
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    expect(report.sections).toHaveLength(0);
    expect(report.state).toBe('insufficient');
    expect(report.availableThemeContext).toBeDefined();
    expect(report.missing.join(' ')).not.toContain('지장간에는 재성으로 계산되는 천간');
    expect(report.missing.join(' ')).toContain('기존 십신 관점 규칙에서 재성 계열의 활성 근거');
    const context = report.availableThemeContext!;
    expect(context.wealthConclusionAuthorized).toBe(false);
    expect(context.themes.length).toBeGreaterThan(0);
    const hiddenAssessment = observeHiddenWealthMembership(snapshot);
    expect(hiddenAssessment.status).toBe('resolved');
    if (hiddenAssessment.status !== 'resolved') throw new Error('expected resolved R27');
    expect(context.hiddenWealthEvidenceStatus).toBe('resolved');
    expect(context.hiddenWealthUnavailableReason).toBeUndefined();
    expect(context.hiddenWealthMembership).toEqual(hiddenAssessment.observations);
    for (const membership of context.hiddenWealthMembership) {
      expect(context.paragraph).not.toContain(
        `지장간 ${membership.hiddenStem}은 ${membership.derivedTenGod}로 계산됩니다`);
      expect(membership.occurrenceId).toBe(
        `${membership.pillar}:${membership.hiddenStem}`);
      expect(membership.meaningAuthority).toBe('calculated_membership_only');
      expect(membership.wealthConclusionAuthorized).toBe(false);
    }
    expect(context.paragraph).toContain('재물의 많고 적음');
    expect(context.paragraph).toContain('재물 분야의 복합 해석 근거를 충족하지 못했습니다');
    for (const theme of context.themes) {
      const boundClaim = execution.claims.find(c => c.claimId === theme.claimId);
      expect(boundClaim).toBeDefined();
      expect(theme.ruleIds).toEqual(boundClaim!.ruleRefs.map(x => x.ruleId));
      expect(theme.methodologyId).toBe(boundClaim!.methodologyRef.id);
      expect(theme.sourceIds).toEqual(boundClaim!.sourceRefs);
      expect(theme.ruleIds.length).toBeGreaterThan(0);
      expect(theme.methodologyId.length).toBeGreaterThan(0);
      expect(theme.sourceIds.length).toBeGreaterThan(0);
      expect(theme.observedPositions.length).toBeGreaterThan(0);
      expect(theme.observedFactPaths).toHaveLength(theme.observedPositions.length);
      expect(theme.observedFactPaths.every(path =>
        /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path)))
        .toBe(true);
      expect(context.paragraph).toContain(theme.summary);
      expect(theme.observedPositions.every(pos => context.paragraph.includes(pos))).toBe(true);
      expect(execution.claims.some(claim => claim.claimId === theme.claimId &&
        claim.claimType === theme.claimType && claim.taxonomy.tier === 'T5' &&
        claim.state === 'active')).toBe(true);
    }
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.usefulComplete).toBe(false);
    expect(buildWealthNatalMultifactorReport(snapshot, execution, registry)).toEqual(report);
  });

  it('keeps unused T5 meanings separate after source-bound cross-channel Wealth T8 selection', () => {
    const snapshot = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1955, month: 10, day: 31 },
      time: { known: true, hour: 19, minute: 35 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    expect(report.sections).toHaveLength(2);
    const [core, tension] = report.sections;
    expect(core?.axis).toBe('creation');
    expect(core?.channel).toBe('cross_channel');
    expect(tension?.axis).toBe('tension');
    expect(tension?.pattern).toBe('PEER_WEALTH');
    expect(tension?.channel).toBe('cross_channel');
    expect(tension?.paragraph).toContain('비겁과 재성은 동일 관측 채널이 아니라');
    expect(tension?.paragraph).toContain('실제 자산 손실');
    expect(report.readingGuide?.coreClaimType).toBe(core?.claimType);
    expect(report.readingGuide?.supporting[0]?.claimType).toBe(tension?.claimType);
    expect(report.readingGuide?.supporting[0]?.distinctObservedFactPaths.length)
      .toBeGreaterThan(0);
    expect(report.state).toBe('partial');
    expect(report.availableThemeContext?.wealthConclusionAuthorized).not.toBe(true);
    // Only T5 facts not consumed by either exact selected T8 remain in the
    // separate context. A newly consumed Peer T5 is no longer "unused".
    const alreadyExplained = new Set(report.sections.flatMap(s => s.upstreamClaimIds));
    const unconsumed = execution.claims.filter(c =>
      c.state === 'active' && c.taxonomy.tier === 'T5' &&
      c.predicate === 'ten_god_theme' &&
      /^TEN_GOD_(PEER|RESOURCE|OUTPUT|WEALTH|OFFICER)_(VISIBLE_STEMS|BRANCHES)_THEME$/u
        .test(c.claimType) && !alreadyExplained.has(c.claimId));
    expect((report.availableThemeContext?.themes ?? []).map(theme => theme.claimId).sort())
      .toEqual(unconsumed.map(c => c.claimId).sort());
    expect(report.availableThemeContext?.themes.some(theme =>
      alreadyExplained.has(theme.claimId)) ?? false).toBe(false);
  });

  it('keeps T8 meaning blocked with unknown birth hour but displays only verified chart facts', () => {
    const result = run(3, 10, false);
    const report = result.report;
    expect(result.snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(report.state).toBe('insufficient');
    expect(report.sections).toHaveLength(0);
    expect(report.availableThemeContext).toBeUndefined();
    expect(report.missing.join(' ')).toContain('십신(T5) 전체가 미확정');
    expect(report.introduction).toContain('출생시각이 없어도 확인 가능한');
    expect(report.introduction).toContain('재물의 많고 적음이나 다중 근거 T8 풀이를 뜻하지 않습니다');
    for (const [slot, label] of [
      ['year', '연주'], ['month', '월주'], ['day', '일주'],
    ] as const) {
      const fact = result.snapshot.pillars[slot];
      const expected = fact.status === 'resolved'
        ? fact.value.stem.value + fact.value.branch.value
        : '미확정';
      expect(report.introduction).toContain(label + ' ' + expected);
    }
    expect(report.usefulComplete).toBe(false);
    expect(report.researchOnly).toBe(true);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('changes only real Canonical unknown-hour observations for another birth date', () => {
    const first = run(3, 10, false);
    const second = run(4, 12, false);
    const repeat = run(3, 10, false);
    expect(repeat.report).toEqual(first.report);
    expect(first.report.introduction).not.toBe(second.report.introduction);
    expect(first.report.sections).toHaveLength(0);
    expect(second.report.sections).toHaveLength(0);
    expect(first.report.missing).toEqual(second.report.missing);
    expect(run(3, 10, true).report.sections.length).toBeGreaterThan(0);
  });

  it('rejects cross-chart and tampered Wealth claim meaning', () => {
    const x = run(3,10);
    const other = sample(4,12);
    expect(()=>buildWealthNatalMultifactorReport(other,x.execution,registry)).toThrow();
    const first = x.execution.claims.find(c=>c.taxonomy.category === 'wealth' &&
      c.predicate === 'wealth_multifactor_structure');
    expect(first).toBeDefined();
    if(!first) return;
    const forged = { ...x.execution, claims: x.execution.claims.map(c =>
      c.claimId === first.claimId
        ? { ...c, value: {...(c.value as Record<string,unknown>), pattern: 'INVENTED'} }
        : c),
    };
    expect(()=>buildWealthNatalMultifactorReport(x.snapshot,forged,registry)).toThrow();
  });
});
