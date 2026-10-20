import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  RELATIONSHIP_NATAL_MULTIFACTOR_RULES,
  RELATIONSHIP_NATAL_MULTIFACTOR_PACK,
  createRelationshipNatalMultifactorRegistry,
} from '../src/research/relationship-natal-multifactor-candidate.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';

const registry = createRelationshipNatalMultifactorRegistry();
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
    report: buildRelationshipNatalMultifactorReport(snapshot, execution, registry) };
}
describe('actual-source Relationship natal T5→T8→Korean five-domain report', () => {
  it('is Relationship-only, research-only, and every T8 has 2/3 exact T5 inputs', () => {
    expect(registry.pack.packId).toBe(RELATIONSHIP_NATAL_MULTIFACTOR_PACK.packId);
    expect(RELATIONSHIP_NATAL_MULTIFACTOR_RULES).toHaveLength(20);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T5')).toHaveLength(10);
    expect(registry.rules.filter(r => r.taxonomy.tier === 'T8')).toHaveLength(20);
    expect(registry.rules.filter(r => r.taxonomy.subcategory === 'self_baseline')).toHaveLength(0);
    for(const rule of RELATIONSHIP_NATAL_MULTIFACTOR_RULES) {
      expect(rule.taxonomy.category).toBe('relationship');
      expect(rule.inputs.length).toBeGreaterThanOrEqual(2);
      expect(rule.inputs.every(i => i.source === 'interpretation_claim' &&
        i.cardinality === 'exactly_one' && i.required)).toBe(true);
      expect(rule.sourceRefs).toHaveLength(2);
      expect(rule.status).toBe('research');
    }
    expect(inspectMyeonghwaProductionComposition({registry}).status).toBe('blocked');
  });

  it('produces real chart-specific Relationship meanings, with two or three matching upstream Claims', () => {
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
        expect(s.paragraph).toContain('이 원국에서 확인된 근거는');
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

  it('requires distinct actual Relationship interpretation axes for MUR complete', () => {
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

  it('uses the same calculated chart while giving Relationship a different interpretation from General', () => {
    const relationship = run(3,10);
    const generalRegistry = createGeneralNatalMultifactorRegistry();
    const generalExecution = runInterpretation(relationship.snapshot, generalRegistry, { now: NOW });
    const general = buildGeneralNatalMultifactorReport(
      relationship.snapshot, generalExecution, generalRegistry,
    );
    expect(relationship.report.calculationHash).toBe(general.calculationHash);
    expect(relationship.report.sections.length).toBeGreaterThan(0);
    expect(relationship.report.sections.every(section =>
      section.claimType.startsWith('RELATIONSHIP_NATAL_MULTIFACTOR_'))).toBe(true);
    expect(relationship.report.sections.map(section => section.headline)).not.toEqual(
      general.sections.map(section => section.headline));
  });

  it('explains which observed family and pillar supports the Korean conclusion and why a partial reading stops', () => {
    let explainedSections = 0;
    let explainedPartials = 0;
    for(const month of [2,3,4,5,6,7]) for(const day of [3,7,11,17,23]) {
      const { report } = run(month,day);
      for(const section of report.sections) {
        explainedSections++;
        expect(section.paragraph).toContain('이 원국에서 확인된 근거는');
        expect(section.paragraph).toContain('십신 계열이 함께 확인되므로');
        expect(section.paragraph).toContain('구조적 관점으로 연결해 읽습니다');
        expect(section.paragraph).toMatch(/비겁\(|인성\(|식상\(|재성\(|관성\(/u);
        for(const position of section.observedPositions) {
          expect(section.paragraph).toContain(position);
        }
        expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(section.sourceIds.length).toBeGreaterThan(0);
      }
      if(report.state !== 'complete') {
        explainedPartials++;
        expect(report.missing.join(' ')).toMatch(/추가 해석 축 [1-3]개/u);
        expect(report.missing.join(' ')).toContain('이 명식에서 확인된 해석 축');
      }
      expect(report.researchOnly).toBe(true);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
      expect(report.usefulComplete).toBe(false);
    }
    expect(explainedSections).toBeGreaterThan(0);
    expect(explainedPartials).toBeGreaterThan(0);
  }, 60000);

  it('shows actual coordination-only T8 evidence as a partial report, never a fabricated overall core', () => {
    let found = false;
    for(const month of [1,2,3,4,5,6,7,8,9,10,11,12]) {
      for(const day of [3,7,11,17,23]) {
        const { execution, report } = run(month, day);
        const active = execution.claims.filter(c => c.taxonomy.tier === 'T8' &&
          c.taxonomy.category === 'relationship' &&
          c.predicate === 'relationship_multifactor_structure' && c.state === 'active');
        const observed = active.map(c => (c.value as {axis?:string}).axis);
        if(observed.length === 0 || observed.some(axis => ['core','expression','boundaries','reception'].includes(axis ?? '')) ||
          !observed.includes('coordination')) continue;
        found = true;
        expect(report.state).toBe('partial');
        expect(report.sections).toHaveLength(1);
        expect(report.sections[0]?.axis).toBe('coordination');
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

  it('does not infer full-chart meaning with unknown birth hour', () => {
    const x = run(3,10,false);
    expect(x.report.state).toBe('insufficient');
    expect(x.report.sections).toHaveLength(0);
    expect(x.report.missing.join(' ')).toContain('출생시각 미상');
  });

  it('rejects cross-chart and tampered Relationship claim meaning', () => {
    const x = run(3,10);
    const other = sample(4,12);
    expect(()=>buildRelationshipNatalMultifactorReport(other,x.execution,registry)).toThrow();
    const first = x.execution.claims.find(c=>c.taxonomy.category === 'relationship' &&
      c.predicate === 'relationship_multifactor_structure');
    expect(first).toBeDefined();
    if(!first) return;
    const forged = { ...x.execution, claims: x.execution.claims.map(c =>
      c.claimId === first.claimId
        ? { ...c, value: {...(c.value as Record<string,unknown>), pattern: 'INVENTED'} }
        : c),
    };
    expect(()=>buildRelationshipNatalMultifactorReport(x.snapshot,forged,registry)).toThrow();
  });
  it('exposes additional source-bound relationship themes in real calculated Korean reports', () => {
    const added = new Set(["RESOURCE_OUTPUT_OFFICER","OUTPUT_OFFICER","RESOURCE_OFFICER","OUTPUT_WEALTH"]);
    const emitted = new Set<string>();
    const delivered = new Set<string>();
    for (const month of [1,2,3,4,5,6,7,8,9,10,11,12]) for (const day of [3,7,11,17,23]) {
      const result = run(month,day);
      for (const claim of result.execution.claims.filter(c => c.taxonomy.tier === 'T8' &&
        c.taxonomy.category === 'relationship' && c.state === 'active')) {
        const value = claim.value as {pattern?: string};
        if (!value.pattern || !added.has(value.pattern)) continue;
        emitted.add(value.pattern);
        expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(2);
        expect(claim.sourceRefs.length).toBe(2);
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
