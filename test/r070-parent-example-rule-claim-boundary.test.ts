import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { evaluateFamilySourceScopeV1 } from
  '../src/research/family-pair-source-scope-handoff.js';
import { observeR070ClassicalParentStemExample } from
  '../src/research/r070-classical-parent-stem-example.js';
import {
  assessR070ParentExampleRuleClaimBoundary,
  renderR070ParentExampleRuleClaimBoundaryHtml,
  R070_PARENT_EXAMPLE_NON_ADMITTED_CLAIM_TYPE,
} from '../src/research/r070-parent-example-rule-claim-boundary.js';
import { buildFamilyBirthResearchReading } from
  '../src/preview/family-birth-research-runtime.js';

const referenceDateTime = '2026-10-30T00:00:00.000Z';
const now = new Date(referenceDateTime);
function input(day: number, sex: 'male' | 'female' | 'unspecified' = 'unspecified'): BirthInput {
  return { calendarType: 'solar',
    date: { year: 2024, month: 4, day },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: sex };
}
const byDay = new Map<string, number>();
for (let day = 1; day <= 28; day++) {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(input(day), { now }).snapshot;
  if (snapshot.derivedFacts.dayMaster.status === 'resolved') {
    byDay.set(snapshot.derivedFacts.dayMaster.value.hanja, day);
  }
}
function realBirth(stem: '甲' | '乙', sex: 'male' | 'female' | 'unspecified') {
  const day = byDay.get(stem);
  if (!day) throw new TypeError('Test sample must have a real Canonical day stem');
  const birth = input(day, sex);
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(birth, { now }).snapshot;
  const handoff = evaluateFamilySourceScopeV1(snapshot, 'parents');
  const original = observeR070ClassicalParentStemExample(snapshot)!;
  const gate = assessR070ParentExampleRuleClaimBoundary(snapshot, handoff, original);
  return { birth, snapshot, handoff, original, gate };
}

describe('R070 historical-parent source Rule/Claim admission boundary', () => {
  for (const stem of ['甲', '乙'] as const) {
    for (const sex of ['male', 'female', 'unspecified'] as const) {
      it(stem + '/' + sex + ': separates literal text, hidden stem membership, and missing authority', () => {
        const { birth, snapshot, gate } = realBirth(stem, sex);
        expect(gate.historicalSex).toBe(sex);
        expect(gate.conditions.map(row => row.label)).toEqual([
          '원문 적용 일간', '표면 천간·십신', '지장간 원시 목록',
          '고전 성별·역할 방법', '강약 판정', '구성 조건 및 해석 방법',
        ]);
        expect(gate.conditions.map(row => row.state).slice(3)).toEqual([
          'not_authorized', 'not_authorized', 'not_authorized',
        ]);
        expect(gate.conditions[0]?.state).toBe('confirmed');
        const hidden = snapshot.derivedFacts.hiddenStems;
        for (const group of gate.hiddenMembership) {
          for (const position of group.positions) {
            const fact = hidden?.[position.slot];
            expect(fact?.status).toBe('resolved');
            if (fact?.status === 'resolved') {
              expect(fact.value).toContain(position.actualStem);
              expect(position.factPath).toBe('derivedFacts.hiddenStems.' + position.slot);
            }
          }
        }
        expect(gate.attemptedClaimType).toBe(R070_PARENT_EXAMPLE_NON_ADMITTED_CLAIM_TYPE);
        expect(gate.originalConditionsFullyEstablished).toBe(false);
        expect(gate.familyMeaningAuthorized).toBe(false);
        expect(gate.emittedT8Claims).toBe(0);
        expect(gate.sourceRuleAdmitted).toBe(false);
        expect(gate.hiddenTenGodClassificationAuthorized).toBe(false);
        expect(gate.strengthBasedOutcomeAuthorized).toBe(false);
        expect(gate.configurationBasedOutcomeAuthorized).toBe(false);
        expect(gate.mayPublish).toBe(false);
        const reading = buildFamilyBirthResearchReading(birth,
          { scope: 'parents', referenceDateTime });
        expect(reading.parentExampleRuleBoundary).toEqual(gate);
        expect(reading.html).toContain(gate.explanation);
        expect(reading.html).toContain('원문 조건별 적용·보류');
        expect(reading.html).toContain(gate.ruleId);
        expect(reading.availability).toBe('unavailable');
        expect(reading.maySell).toBe(false);
        const children = buildFamilyBirthResearchReading(birth,
          { scope: 'children', referenceDateTime });
        expect(children.parentExampleRuleBoundary).toBeUndefined();
      });
    }
  }
  it('rejects recomputed factual mismatches and a swapped source handoff', () => {
    const first = realBirth('甲', 'male');
    const second = realBirth('乙', 'male');
    expect(() => assessR070ParentExampleRuleClaimBoundary(
      first.snapshot, second.handoff, first.original,
    )).toThrow('original, unadmitted parent chart');
    const forged = { ...first.original, paragraph: first.original.paragraph + ' 미래 재산 예언' };
    expect(() => assessR070ParentExampleRuleClaimBoundary(
      first.snapshot, first.handoff, forged,
    )).toThrow('must equal exact Canonical evidence');
    expect(() => renderR070ParentExampleRuleClaimBoundaryHtml({
      ...first.gate, emittedT8Claims: 1,
    } as unknown as typeof first.gate)).toThrow('cannot grant a family meaning Claim');
  });
  it('does not convert unknown hour or hidden stems into resolved family outcomes', () => {
    const reference = realBirth('甲', 'unspecified');
    const unknown: BirthInput = { ...reference.birth, time: { known: false } };
    const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(unknown, { now }).snapshot;
    const original = observeR070ClassicalParentStemExample(snapshot);
    if (!original) {
      expect(snapshot.derivedFacts.dayMaster.status).not.toBe('resolved');
      return;
    }
    const gate = assessR070ParentExampleRuleClaimBoundary(
      snapshot, evaluateFamilySourceScopeV1(snapshot, 'parents'), original);
    expect(gate.familyMeaningAuthorized).toBe(false);
    expect(gate.emittedT8Claims).toBe(0);
    expect(gate.conditions[1]?.state).toMatch(/^(confirmed|unresolved)$/u);
    expect(gate.missingPrerequisites).toContain('R070_HIDDEN_MEMBERSHIP_PARTIALLY_UNRESOLVED');
    expect(gate.hiddenMembership.every(row =>
      row.unresolvedPaths.includes('derivedFacts.hiddenStems.hour'))).toBe(true);
  });
});
