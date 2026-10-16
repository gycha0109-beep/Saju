import { describe, expect, it } from 'vitest';
import type { TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  createGeneralNatalSourceBoundedRegistry,
} from '../src/research/general-natal-conclusion-source-bounded-candidate.js';
import { buildNatalN13StructuralResearchReading } from '../src/research/general-natal-t8-structural-reading-draft.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';

const NOW = new Date('2026-10-16T00:00:00.000Z');
const registry = createGeneralNatalSourceBoundedRegistry(NOW.toISOString());

const full: TenGodChartFact = {
  year: { stem: resolved('겁재'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};
const withoutExactGyeopjae: TenGodChartFact = {
  ...full,
  year: { stem: resolved('비견'), branch: resolved('정인') },
};
const withoutWealth: TenGodChartFact = {
  year: { stem: resolved('겁재'), branch: resolved('정인') },
  month: { stem: resolved('상관'), branch: resolved('식신') },
  day: { stem: resolved('일간'), branch: resolved('편관') },
  hour: { stem: resolved('정관'), branch: resolved('편인') },
};

function fixture(gods: TenGodChartFact) {
  const base = calculateCanonicalSajuSnapshot({
    calendarType:'solar',
    date:{year:2024,month:3,day:10},
    time:{known:true,hour:12,minute:0},
    sexForTraditionalCalculation:'unspecified',
  },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now:NOW});
  return {...base,derivedFacts:{...base.derivedFacts,tenGods:resolved(gods)}};
}
function execute(gods: TenGodChartFact) {
  const execution = runInterpretation(fixture(gods),registry,{now:NOW});
  expect(execution.integrity.valid).toBe(true);
  return execution;
}

describe('N13 first executable source-bounded T5→T8 research interpretation', () => {
  it('renders all five existing multi-input T8 structural claims as traceable research-only prose', () => {
    const exec = execute(full);
    const draft = buildNatalN13StructuralResearchReading(exec,registry);
    expect(draft).toMatchObject({
      status:'research_only',mayPublishToConsumer:false,
      mayApproveSemantics:false,mayPromoteProduction:false,relationCount:5,
    });
    expect(draft.sentences.map((s) => s.relationId)).toEqual([
      'OFFICER-TO-RESOURCE','OUTPUT-TO-WEALTH','PEER-TO-WEALTH-ADVERSE',
      'WEALTH-RESOURCE-CONFLICT','WEALTH-TO-OFFICER',
    ]);
    for(const s of draft.sentences) {
      expect(s.researchOnly).toBe(true);
      expect(s.consumerProjectionAuthorized).toBe(false);
      expect(s.upstreamClaimRefs).toHaveLength(2);
      expect(new Set(s.upstreamClaimRefs).size).toBe(2);
      expect(s.sourceLocators).toHaveLength(2);
      expect(s.sourceLocators.every((src) => src.locator.length>2)).toBe(true);
      expect(s.text).toContain('구조');
      expect(s.text).toContain('단정하지 않습니다');
      expect(s.meaningFingerprint).toMatch(/^[0-9a-f]{64}$/u);
    }
    expect(draft.sentences.find((s)=>s.relationId==='PEER-TO-WEALTH-ADVERSE')
      ?.text).toContain('겁재');
    expect(buildNatalN13StructuralResearchReading(exec,registry))
      .toEqual(draft);
  });

  it('does not substitute Bijeon for Gyeopjae or invent wealth presence', () => {
    const peerOnly = buildNatalN13StructuralResearchReading(execute(withoutExactGyeopjae),registry);
    const noWealth = buildNatalN13StructuralResearchReading(execute(withoutWealth),registry);
    expect(peerOnly.relationCount).toBe(4);
    expect(peerOnly.sentences.some((s) => s.relationId==='PEER-TO-WEALTH-ADVERSE')).toBe(false);
    expect(noWealth.sentences.every((s)=>!s.relationId.includes('WEALTH'))).toBe(true);
    expect(peerOnly.meaningSignature).not.toBe(noWealth.meaningSignature);
  });

  it('fails closed on missing upstream Claim, tampered T8 scope, and Preview registry', () => {
    const original = execute(full);
    const target = original.claims.find((c) => c.taxonomy.subcategory==='source_bounded_relation');
    if (!target) throw new Error('Expected actual source-bounded T8 claim');
    const missing = {...original,
      claims:original.claims.filter((c)=>c.claimId!==target.upstreamClaimRefs[0])};
    expect(()=>buildNatalN13StructuralResearchReading(missing,registry))
      .toThrow(/missing upstream/u);
    const tampered = {...original,
      claims:original.claims.map((c) => c.claimId===target.claimId
        ? {...c,value:{...(c.value as Record<string,unknown>),consumerProjectionAuthorized:true}} : c)};
    expect(()=>buildNatalN13StructuralResearchReading(tampered,registry))
      .toThrow(/unrecognized or unapproved/u);
    const preview = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());
    expect(()=>buildNatalN13StructuralResearchReading(original,preview))
      .toThrow(/source-bounded research execution/u);
  });

  it('runs the real chart 1984-06-14 without ProductReading or Production admission', () => {
    const snap = calculateCanonicalSajuSnapshot({
      calendarType:'solar',date:{year:1984,month:6,day:14},
      time:{known:true,hour:5,minute:30},sexForTraditionalCalculation:'male',
    },PRODUCTION_DEFAULT_CALCULATION_POLICY,{now:NOW});
    const interpreted = runInterpretation(snap,registry,{now:NOW});
    const result = buildNatalN13StructuralResearchReading(interpreted,registry);
    expect(result.relationCount).toBeGreaterThan(0);
    expect(result.sentences.every((s) => s.researchOnly && !s.consumerProjectionAuthorized)).toBe(true);
  });
});
