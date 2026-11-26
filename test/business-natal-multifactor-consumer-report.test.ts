import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  BUSINESS_NATAL_MULTIFACTOR_RULES,
  BUSINESS_NATAL_MULTIFACTOR_PACK,
  createBusinessNatalMultifactorRegistry,
} from '../src/research/business-natal-multifactor-candidate.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';

const registry = createBusinessNatalMultifactorRegistry();
const NOW = new Date('2026-10-19T00:00:00.000Z');
function sample(month: number, day: number, known = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: known ? { known: true, hour: 12, minute: 0 } as const : { known: false } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function run(month: number, day: number, known = true) {
  const snapshot = sample(month, day, known);
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  return { snapshot, execution,
    report: buildBusinessNatalMultifactorReport(snapshot, execution, registry) };
}
function findUnknownHourBusinessReading() {
  for (const month of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    for (const day of [3, 7, 11, 17, 23]) {
      const result = run(month, day, false);
      if (result.report.sections.some((section) => section.channel === 'hidden_stems')) {
        return { ...result, month, day };
      }
    }
  }
  throw new Error('No resolved hidden-stem Business T8 fixture found');
}
describe('actual-source Business natal T5→T8→Korean five-domain report', () => {
  it('is Business-only, research-only, and every T8 has 2/3 exact T5 inputs', () => {
    expect(registry.pack.packId).toBe(BUSINESS_NATAL_MULTIFACTOR_PACK.packId);
    expect(BUSINESS_NATAL_MULTIFACTOR_RULES).toHaveLength(31);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T5')).toHaveLength(15);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T8')).toHaveLength(31);
    expect(registry.rules.filter(r => r.taxonomy.subcategory === 'self_baseline')).toHaveLength(0);
    for(const rule of BUSINESS_NATAL_MULTIFACTOR_RULES) {
      expect(rule.taxonomy.category).toBe('business');
      const anchored = rule.output.claimType.includes('MONTH_FOOD_WEALTH');
      const upstream = rule.inputs.filter(i => i.source === 'interpretation_claim');
      expect(upstream.length).toBeGreaterThanOrEqual(2);
      expect(upstream.every(i => i.cardinality === 'exactly_one' && i.required)).toBe(true);
      expect(rule.inputs.some(i => i.pathOrClaimType === 'derivedFacts.hiddenStems.month')).toBe(anchored);
      const hidden = rule.output.claimType.endsWith('_HIDDEN_STEMS');
      expect(rule.sourceRefs).toHaveLength(anchored ? 4 : hidden ? 3 : 2);
      expect(rule.status).toBe('research');
    }
    expect(inspectMyeonghwaProductionComposition({registry}).status).toBe('blocked');
  });

  it('connects the exact exposed month Food God to visible Wealth and holds when Indirect Resource is visible', () => {
    const read = (year: number, month: number, day: number, hour: number, minute: number) => {
      const snapshot = calculateCanonicalSajuSnapshot({
        calendarType: 'solar', date: { year, month, day },
        time: { known: true, hour, minute }, sexForTraditionalCalculation: 'male',
      }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
      const execution = runInterpretation(snapshot, registry, { now: NOW });
      return { execution, report: buildBusinessNatalMultifactorReport(snapshot, execution, registry) };
    };
    const supported = read(1987, 6, 15, 5, 57);
    const section = supported.report.sections.find(item => item.pattern === 'MONTH_FOOD_WEALTH');
    expect(section?.paragraph).toContain('월지 지장간 정(식신)과 연주 천간의 일치');
    expect(section?.paragraph).toContain('같은 품질로 반복해 만들 수 있는 산출물');
    expect(section?.observedFactPaths).toContain('derivedFacts.hiddenStems.month.value.0');
    expect(section?.sourceIds).toContain('SRC-BUSINESS-JAPYEONG-JINJEON-FOOD-WEALTH');
    expect(section?.sourceIds).toContain('SRC-GENERAL-NATAL-YUANHAI-HIDDEN-STEMS-WIKISOURCE');
    const held = read(1953, 12, 16, 1, 29);
    expect(held.execution.claims.some(item => item.claimType === section?.claimType)).toBe(false);
    expect(held.report.sections.length).toBeGreaterThan(0);
  });

  it('produces real chart-specific Business meanings, with two or three matching upstream Claims', () => {
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
      for(const s of x.report.sections) {
        expect(s.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions).toHaveLength(s.observedFactPaths.length);
        expect(s.observedPositions.every(p=>s.paragraph.includes(p))).toBe(true);
        expect(s.observedFactPaths.every(path =>
          /^derivedFacts\.(tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value|hiddenStems\.(year|month|day|hour)\.value\.[0-2])$/u.test(path)))
          .toBe(true);
      }
      expect(x.report.mayPublish).toBe(false);
      expect(x.report.maySell).toBe(false);
      expect(x.report.usefulComplete).toBe(false);
    }
    expect(run(3,10).report).toEqual(run(3,10).report);
  }, 30000);

  it('judges Business completeness by applicable meaning areas rather than a fixed section count', () => {
    const x = run(3,10);
    expect(new Set(x.report.meaningCoverage.required).size).toBe(x.report.meaningCoverage.required.length);
    for (const section of x.report.sections) {
      expect(new Set(section.observedFactPaths).size).toBe(section.observedFactPaths.length);
      expect(section.observedPositions).toHaveLength(section.observedFactPaths.length);
    }
    if (x.report.readingGuide) {
      const supportPaths = x.report.readingGuide.supporting.flatMap((section) => section.distinctObservedFactPaths);
      expect(new Set(supportPaths).size).toBe(supportPaths.length);
      const core = x.report.sections.find((section) => section.claimType === x.report.readingGuide?.coreClaimType);
      expect(core).toBeDefined();
      expect(supportPaths.every((path) => !core?.observedFactPaths.includes(path))).toBe(true);
    }
    if(x.report.state === 'complete') {
      expect(x.report.sections.length).toBeGreaterThan(0);
      expect(x.report.meaningCoverage.missing).toEqual([]);
      expect(x.report.meaningCoverage.required.every((area) =>
        x.report.meaningCoverage.covered.includes(area))).toBe(true);
    } else {
      expect(x.report.missing.length).toBeGreaterThan(0);
      expect(x.report.state).toMatch(/partial|insufficient/);
    }
  });

  it('uses the same calculated chart while giving Business a different interpretation from General', () => {
    const business = run(3,10);
    const generalRegistry = createGeneralNatalMultifactorRegistry();
    const generalExecution = runInterpretation(business.snapshot, generalRegistry, { now: NOW });
    const general = buildGeneralNatalMultifactorReport(
      business.snapshot, generalExecution, generalRegistry,
    );
    expect(business.report.calculationHash).toBe(general.calculationHash);
    expect(business.report.sections.length).toBeGreaterThan(0);
    expect(business.report.sections.every(section =>
      section.claimType.startsWith('BUSINESS_NATAL_MULTIFACTOR_'))).toBe(true);
    expect(business.report.sections.map(section => section.headline)).not.toEqual(
      general.sections.map(section => section.headline));
  });

  it('explains which observed family and pillar supports the Korean conclusion and why a partial reading stops', () => {
    let explainedSections = 0;
    for(const month of [2,3,4,5,6,7]) for(const day of [3,7,11,17,23]) {
      const { report } = run(month,day);
      for(const section of report.sections) {
        explainedSections++;
        if (section.pattern === 'MONTH_FOOD_WEALTH') {
          expect(section.paragraph).toContain('월지 지장간');
        } else {
          expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
          expect(section.paragraph).toContain('십신 계열이 함께 확인되므로');
          expect(section.paragraph).toContain('구조적 관점으로 연결해 읽습니다');
        }
        expect(section.paragraph).toMatch(/비겁\(|인성\(|식상\(|재성\(|관성\(/u);
        for(const position of section.observedPositions) {
          expect(section.paragraph).toContain(position);
        }
        expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(section.sourceIds.length).toBeGreaterThan(0);
      }
      if (report.state === 'partial') {
        expect(report.meaningCoverage.required.length).toBeGreaterThan(0);
        expect(report.missing.join(' ')).toMatch(/사업 핵심 영역|중심 해석 근거/u);
      } else if (report.state === 'insufficient') {
        expect(report.sections).toHaveLength(0);
      }
      expect(report.researchOnly).toBe(true);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
      expect(report.usefulComplete).toBe(false);
    }
    expect(explainedSections).toBeGreaterThan(0);
    // With the third, hidden-stem channel available, the known-hour cohort may
    // now have no partial examples. The unknown-hour case remains the explicit
    // source-backed partial-reading fixture.
    const partial = findUnknownHourBusinessReading();
    expect(partial.report.state).toBe('partial');
    expect(partial.report.meaningCoverage.required.length).toBeGreaterThan(0);
    expect(partial.report.missing.join(' ')).toContain('출생시각 미상');
    expect(partial.report.sections.length).toBeGreaterThan(0);
    for (const section of partial.report.sections) {
      expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
      expect(section.paragraph).toMatch(/비겁\\(|인성\\(|식상\\(|재성\\(|관성\\(/u);
      expect(section.observedPositions.every(position => section.paragraph.includes(position))).toBe(true);
      expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
      expect(section.sourceIds.length).toBeGreaterThan(0);
    }
  }, 60000);

  it('shows actual coordination-only T8 evidence as a partial report, never a fabricated overall core', () => {
    let found = false;
    for(const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
      for(const day of [3,7,11,17,23]) {
        const { execution, snapshot } = run(month, day);
        const legacyClaims = execution.claims.filter((claim) =>
          !claim.claimType.endsWith('_HIDDEN_STEMS_THEME') &&
          (claim.value as { channel?: string } | undefined)?.channel !== 'hidden_stems',
        );
        const legacyIds = new Set(legacyClaims.map((claim) => claim.claimId));
        const legacyExecution = {
          ...execution,
          claims: legacyClaims,
          claimRelations: execution.claimRelations.filter((relation) =>
            legacyIds.has(relation.fromClaimId) && legacyIds.has(relation.toClaimId),
          ),
        };
        const report = buildBusinessNatalMultifactorReport(snapshot, legacyExecution, registry);
        const active = legacyClaims.filter(c => c.taxonomy.tier === 'T8' &&
          c.taxonomy.category === 'business' &&
          c.predicate === 'business_multifactor_structure' && c.state === 'active');
        const observed = active.map(c => (c.value as {axis?:string}).axis);
        if(observed.length === 0 || observed.some(axis => ['core','execution','governance','preparation'].includes(axis ?? '')) ||
          !observed.includes('coordination')) continue;
        found = true;
        expect(report.state).toBe('partial');
        expect(report.sections.length).toBeGreaterThan(0);
        expect(report.sections.every((section) => section.axis === 'coordination')).toBe(true);
        expect(report.sections[0]?.observedPositions.length).toBeGreaterThanOrEqual(2);
        expect(report.sections[0]?.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(report.sections[0]?.sourceIds.length).toBeGreaterThan(0);
        expect(report.missing.join(' ')).toContain('중심 해석 근거가 없어');
        expect(report.researchOnly).toBe(true);
        expect(report.usefulComplete).toBe(false);
        expect(report.mayPublish).toBe(false);
        expect(report.maySell).toBe(false);
        break;
      }
      if(found) break;
    }
    expect(found).toBe(true);
  }, 60000);

  it('uses only resolved hidden-stem positions for a partial Business reading when birth hour is unknown', () => {
    const x = findUnknownHourBusinessReading();
    expect(x.snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(x.report.state).toBe('partial');
    expect(x.report.sections.length).toBeGreaterThan(0);
    expect(x.report.sections.every((section) => section.channel === 'hidden_stems')).toBe(true);
    expect(x.report.sections.every((section) => section.observedFactPaths.every((path) => !path.includes('.hour.')))).toBe(true);
    expect(x.report.missing.join(' ')).toContain('출생시각 미상');
    expect(x.report.introduction).toContain('출생시각이 없어도 확인 가능한');
    expect(x.report.introduction).toContain('지장간에서 확인된 근거만 부분적으로 사용합니다');
    for (const [slot, label] of [['year', '연주'], ['month', '월주'], ['day', '일주']] as const) {
      const fact = x.snapshot.pillars[slot];
      const observed = fact.status === 'resolved' ? fact.value.stem.value + fact.value.branch.value : '미확정';
      expect(x.report.introduction).toContain(label + ' ' + observed);
    }
    expect(x.report.usefulComplete).toBe(false);
    expect(x.report.researchOnly).toBe(true);
    expect(x.report.mayPublish).toBe(false);
    expect(x.report.maySell).toBe(false);
  }, 60000);
  it('keeps unknown-hour hidden-stem readings deterministic and chart-specific', () => {
    const first = findUnknownHourBusinessReading();
    const replay = run(first.month, first.day, false);
    const second = run(first.month === 12 ? 1 : first.month + 1, first.day === 23 ? 7 : first.day + 4, false);
    expect(replay.report).toEqual(first.report);
    expect(second.report.introduction).not.toEqual(first.report.introduction);
    expect(first.report.sections.every((section) => section.channel === 'hidden_stems')).toBe(true);
    expect(first.report.sections.every((section) => section.observedFactPaths.every((path) => !path.includes('.hour.')))).toBe(true);
    expect(first.report.missing.join(' ')).toContain('출생시각 미상');
    expect(second.report.missing.join(' ')).toContain('출생시각 미상');
  }, 60000);
  it('rejects cross-chart and tampered Business claim meaning', () => {
    const x = run(3,10);
    const other = sample(4,12);
    expect(()=>buildBusinessNatalMultifactorReport(other,x.execution,registry)).toThrow();
    const first = x.execution.claims.find(c=>c.taxonomy.category === 'business' &&
      c.predicate === 'business_multifactor_structure');
    expect(first).toBeDefined();
    if(!first) return;
    const forged = { ...x.execution, claims: x.execution.claims.map(c =>
      c.claimId === first.claimId
        ? { ...c, value: {...(c.value as Record<string,unknown>), pattern: 'INVENTED'} }
        : c),
    };
    expect(()=>buildBusinessNatalMultifactorReport(x.snapshot,forged,registry)).toThrow();
  });
  it('exposes additional source-bound business themes in real calculated Korean reports', () => {
    const added = new Set(["WEALTH_OFFICER","WEALTH_RESOURCE","RESOURCE_OFFICER","PEER_WEALTH"]);
    const emitted = new Set<string>();
    const delivered = new Set<string>();
    for (const month of [1,2,3,4,5,6,7,8,9,10,11,12]) for (const day of [3,7,11,17,23]) {
      const result = run(month,day);
      for (const claim of result.execution.claims.filter(c => c.taxonomy.tier === 'T8' &&
        c.taxonomy.category === 'business' && c.state === 'active')) {
        const value = claim.value as {pattern?: string};
        if (!value.pattern || !added.has(value.pattern)) continue;
        emitted.add(value.pattern);
        expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(2);
        expect(claim.sourceRefs.length).toBeGreaterThanOrEqual(2);
        expect(claim.ruleRefs).toHaveLength(1);
      }
      for (const section of result.report.sections) if (added.has(section.pattern)) {
        delivered.add(section.pattern);
        expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
        expect(section.observedFactPaths.length).toBeGreaterThanOrEqual(2);
        expect(section.paragraph).toContain(section.observedPositions[0]);
      }
      expect(result.report.researchOnly).toBe(true);
      expect(result.report.mayPublish).toBe(false);
      expect(result.report.usefulComplete).toBe(false);
    }
    expect([...emitted].sort()).toEqual([...added].sort());
    expect(delivered.size).toBeGreaterThan(0);
  }, 60000);

});
