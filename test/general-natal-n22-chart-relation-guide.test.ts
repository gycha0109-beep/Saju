import { describe, expect, it } from 'vitest';
import type { TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createGeneralNatalSourceBoundedRegistry } from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { buildNatalN22ChartRelationGuide } from '../src/research/general-natal-chart-relation-guide.js';

const now = new Date('2026-10-16T00:00:00.000Z');
const registry = createGeneralNatalSourceBoundedRegistry(now.toISOString());
const five: TenGodChartFact = {
  year: {stem: resolved('겁재'),branch: resolved('정인')},
  month: {stem: resolved('편재'),branch: resolved('정재')},
  day: {stem: resolved('일간'),branch: resolved('상관')},
  hour: {stem: resolved('편관'),branch: resolved('식신')},
};
function report(gods: TenGodChartFact, known=true) {
  const calculated = calculateCanonicalSajuSnapshot({
    calendarType:'solar',date:{year:2024,month:3,day:10},
    time:known ? {known:true,hour:12,minute:30} : {known:false},
    sexForTraditionalCalculation:'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY,{now});
  const snapshot = {
    ...calculated,
    derivedFacts: {...calculated.derivedFacts,tenGods:resolved(gods)},
  };
  const execution = runInterpretation(snapshot,registry,{
    now,requestId:'n22-chart-reader-test',
  });
  return { snapshot,execution,guide:buildNatalN22ChartRelationGuide(snapshot,execution,registry) };
}

describe('N22 actual chart-bound research relation reading',()=>{
  it('turns only emitted T8 Claims into source-located individual, linked and mixed reading',()=>{
    const {snapshot,execution,guide}=report(five);
    const claims=new Set(execution.claims.map((c)=>c.claimId));
    expect(guide).toMatchObject({
      lifecycle:'internal_research_only',state:'observed',
      snapshotId:snapshot.snapshotId,calculationHash:snapshot.calculationHash,
      mayPublish:false,maySell:false,mayAddProductInterpretation:false,
    });
    expect(guide.individualRelations.length).toBeGreaterThan(0);
    expect(guide.linkedRelations.length).toBe(2);
    expect(guide.mixedRelations.length).toBe(2);
    for(const unit of [...guide.individualRelations,...guide.linkedRelations,...guide.mixedRelations]){
      expect(unit.researchOnly).toBe(true);
      expect(unit.realLifeOutcomeInferred).toBe(false);
      expect(unit.text.length).toBeGreaterThan(30);
      expect(unit.claimIds.every((id)=>claims.has(id))).toBe(true);
      expect(unit.sourceLocators.length).toBeGreaterThanOrEqual(2);
      expect(unit.sourceLocators.every((source)=>source.sourceId.length>0 &&
        source.locator.length>0)).toBe(true);
      expect(unit.calculatedFactPaths.every((path)=>/^derivedFacts\.tenGods\./u.test(path))).toBe(true);
    }
    expect(buildNatalN22ChartRelationGuide(snapshot,execution,registry)).toEqual(guide);
  });

  it('does not show any time-bound research conclusion when the birth hour is unknown',()=>{
    const {guide}=report(five,false);
    expect(guide.state).toBe('birth_time_unknown');
    expect(guide.individualRelations).toEqual([]);
    expect(guide.linkedRelations).toEqual([]);
    expect(guide.mixedRelations).toEqual([]);
  });

  it('does not manufacture a research relation when no matching endpoint is present',()=>{
    const {guide}=report({
      ...five,month:{stem:resolved('정관'),branch:resolved('상관')},
    });
    expect(guide.mixedRelations).toEqual([]);
    expect(guide.linkedRelations).toEqual([]);
  });

  it('rejects another chart identity and a non-research / non-source-bounded registry',()=>{
    const {snapshot,execution}=report(five);
    expect(()=>buildNatalN22ChartRelationGuide({...snapshot,snapshotId:'wrong'},execution,registry))
      .toThrow(/source-bounded|bound/u);
    expect(()=>buildNatalN22ChartRelationGuide(snapshot,execution,
      createGeneralNatalIntegratedReadingRegistry(now.toISOString())))
      .toThrow(/source-bounded/u);
  });
});
