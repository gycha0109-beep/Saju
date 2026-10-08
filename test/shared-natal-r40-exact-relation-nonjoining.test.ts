import { describe, expect, test } from 'vitest';
import {
  HEAVENLY_STEMS, HEAVENLY_STEMS_HANJA,
  getHeavenlyStemElement, getHeavenlyStemYinYang,
} from 'manseryeok';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { resolved, unavailable, ambiguous } from '../src/contracts/common.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { projectSajuR38RemoteNonjoining } from '../src/research/shared-natal-r38-remote-stem-nonjoining-research-evidence-adapter.js';
import {
  buildSajuR40ExactRelationNonjoiningResearchEvidence as build,
  projectSajuR40ExactRelationNonjoining as project,
  validateSajuR40ExactRelationNonjoiningResearchEvidence as validate,
  SAJU_R40_EVIDENCE_DEFINITION as definition,
  SAJU_R40_RUNTIME_ADAPTER as adapter,
  SAJU_R40_AUTHORITY as authority,
} from '../src/research/shared-natal-r40-exact-relation-nonjoining-research-evidence-adapter.js';
import {
  createSajuR40ExactRelationNonjoiningResearchRegistry as registry,
} from '../src/research/shared-natal-r40-exact-relation-nonjoining-structural-claim.js';
import { DEFAULT_CALCULATION_POLICY } from './fixtures/calculation-fixtures.js';

const now = new Date('2026-10-09T00:00:00Z');
const slots = ['year', 'month', 'day', 'hour'] as const;
const actual = calculateCanonicalSajuSnapshot({
  calendarType: 'solar',
  date: {year:1984,month:2,day:6},
  time: {known:true,hour:5,minute:30},
  sexForTraditionalCalculation: 'male',
},DEFAULT_CALCULATION_POLICY,{now});

// Supplied fixed-semantic fixtures are not birth-date evidence.
function supplied(stems: readonly string[]): CanonicalSajuSnapshot {
  const snapshot=structuredClone(actual);
  for(const [i,slot] of slots.entries()){
    const index=HEAVENLY_STEMS_HANJA.findIndex(x=>x===stems[i]);
    const value=HEAVENLY_STEMS[index];
    const fact=snapshot.pillars[slot];
    if(!value||fact.status!=='resolved')throw new Error('Invalid supplied stem');
    snapshot.pillars[slot]=resolved({
      ...fact.value,
      stem:{value,hanja:HEAVENLY_STEMS_HANJA[index]!,
        element:getHeavenlyStemElement(value),yinYang:getHeavenlyStemYinYang(value)},
    });
  }
  const day=snapshot.pillars.day;
  if(day.status!=='resolved')throw new Error('day unresolved');
  snapshot.derivedFacts.dayMaster=resolved(structuredClone(day.value.stem));
  snapshot.calculationHash=deterministicContentHash({suppliedR40:stems});
  snapshot.snapshotId='synthetic_r40_'+snapshot.calculationHash.slice(0,24);
  return snapshot;
}
function envelope(s: CanonicalSajuSnapshot) {
  const built=build(s);
  if(built.status!=='resolved') throw new Error(built.reasonCode);
  return built.envelope;
}
function run(s:CanonicalSajuSnapshot){
  return runInterpretation(s,registry(),{
    now,
    researchEvidence:{
      runtimeRegistry:createResearchEvidenceRuntimeRegistry([adapter]),
      envelopes:[envelope(s)],
    },
  });
}
describe('SAJU-R40 exact R38 relation -> I61/I65 support source alignment',()=>{
  test('real I61/I65 intersection emits one bounded T2 and preserves I65 outcome',()=>{
    const s=supplied(['甲','丙','辛','己']);
    const before=deterministicContentHash(s);
    const r38=projectSajuR38RemoteNonjoining(s);
    expect(r38.status).toBe('resolved');
    if(r38.status==='resolved') expect(r38.projection.fullJoining).toBe(false);
    const e=envelope(s);
    expect(e.payload.exactSourceRelationFullJoiningDenied).toBe(true);
    expect(e.payload.alignedItems.length).toBeGreaterThan(0);
    expect(e.payload.alignedItems).toEqual(expect.arrayContaining([expect.objectContaining({
      relationKind:'stem_five_combination',
      supportSourcePillar:'year',
      supportSourceComponent:'stem',
      fullJoining:false,
      settlementOutcome:'not_determined',
      supportChannelPersisted:'not_determined',
      i65DispatchedIdentityVerified:true,
    })]));
    expect(validate(e,s).valid).toBe(true);
    expect(run(s).claims).toHaveLength(1);
    expect(run(s).claims[0]).toMatchObject({
      taxonomy:{tier:'T2'}, researchEvidenceRefs:[e.envelopeId],
      value:{fullJoining:false,genericI65Outcome:'not_determined',
        zeroEffect:'not_determined',productionAuthority:false},
    });
    expect(run(s)).toEqual(run(s));
    expect(envelope(s)).toEqual(e);
    expect(deterministicContentHash(s)).toBe(before);
  });
  test('remote pair with no I61/I65 support-source intersection emits no second claim',()=>{
    const e=envelope(actual);
    expect(projectSajuR38RemoteNonjoining(actual).status).toBe('resolved');
    expect(e.payload.noAlignedItemsMeansNoSupport).toBe(false);
    expect(e.payload.exactSourceRelationFullJoiningDenied).toBe(false);
    expect(e.payload.alignedItems).toEqual([]);
    expect(run(actual).claims).toHaveLength(0);
  });
  test.each([
    ['甲','己','辛','丙'],
    ['甲','己','己','丙'],
    ['乙','丙','辛','己'],
    ['甲','己','庚','己'],
  ])('never upgrades unrelated/competing position %s %s %s %s',(...stems)=>{
    const s=supplied(stems);
    const r38=projectSajuR38RemoteNonjoining(s);
    const projection=project(s);
    expect(r38.status).toBe('resolved');
    expect(projection.status).toBe('resolved');
    if(r38.status!=='resolved'||projection.status!=='resolved')
      throw new Error('Expected resolved negative projection');
    expect(r38.projection.state).not.toBe('remote_nonjoining');
    expect(projection.projection.exactSourceRelationFullJoiningDenied).toBe(false);
    expect(projection.projection.alignedItems).toEqual([]);
    expect(run(s).claims).toHaveLength(0);
  });
  test.each([
    ['relationId', 'FORGED_RELATION'],
    ['supportSourcePillar', 'hour'],
    ['supportSourceValue', 'FORGED_STEM'],
    ['supportChannelKind', 'FORGED_CHANNEL'],
    ['targetParticipantValue', 'FORGED_TARGET'],
    ['fullJoining', true],
  ] as const)('rejects correctly re-enveloped forged %s exact identity', (field,value)=>{
    const s=supplied(['甲','丙','辛','己']);
    const e=envelope(s);
    expect(e.payload.alignedItems.length).toBeGreaterThan(0);
    const altered={
      ...e.payload,
      alignedItems:e.payload.alignedItems.map((v,i)=>i===0?{...v,[field]:value}:v),
    };
    const forged=createResearchEvidenceEnvelope(definition,s,altered);
    const verdict=validate(forged,s);
    expect(verdict.valid).toBe(false);
    expect(verdict.errors).toContain('r40_full_i61_i65_exact_relation_replay_mismatch');
  });
  test('missing, ambiguous, invalid stem and scenario never infer nonjoining',()=>{
    const missing=supplied(['甲','丙','辛','己']);
    missing.pillars.year=unavailable('missing');
    const amb=supplied(['甲','丙','辛','己']);
    const year=amb.pillars.year;
    if(year.status!=='resolved')throw new Error('test');
    amb.pillars.year=ambiguous([
      {candidateId:'a',value:year.value,reasonRefs:[]},
      {candidateId:'b',value:year.value,reasonRefs:[]},
    ],['ambiguous']);
    const invalid=supplied(['甲','丙','辛','己']);
    if(invalid.pillars.month.status==='resolved')
      invalid.pillars.month.value.stem.hanja='INVALID';
    const scen=supplied(['甲','丙','辛','己']);
    scen.scenarios=[{}] as never;
    for(const s of [missing,amb,invalid,scen])
      expect(build(s).status).toBe('unavailable');
  });
  test('R40 cannot yield Production, effect, strength, or a general settlement',()=>{
    const e=envelope(supplied(['甲','丙','辛','己']));
    expect(e.payload.constraints).toMatchObject({
      i65SettlementOutcomePromotionAuthorized:false,
      channelActivationAuthorized:false,
      channelPersistenceAuthorized:false,
      channelDestructionAuthorized:false,
      partialEffectAuthorized:false,
      strengthClassificationAuthorized:false,
      productionAuthorityAuthorized:false,
    });
    expect(e.payload.partialEffect).toBe('not_determined');
    expect(e.payload.effectiveSupport).toBe('not_determined');
    expect(authority.noMatchingSupportSourceIsNotNegativeSupport).toBe(true);
  });
});
