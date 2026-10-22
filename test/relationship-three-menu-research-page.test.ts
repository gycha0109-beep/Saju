import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { BirthInput } from '../src/contracts/calculation.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildFamilyCanonicalObservationPreview } from '../src/preview/family-parents-children-observation-preview.js';
import { buildCompatibilityTwoChartIntakePreview } from '../src/preview/compatibility-two-chart-intake-preview.js';
import { buildRelationshipThreeMenuResearchPage, type RelationshipThreeMenuResearchPageInput } from '../src/preview/relationship-three-menu-research-page.js';
import { RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from '../src/reading/official-reading-detailed-presentation-spouse.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');
const FIRST: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
const SECOND: BirthInput = {
  ...FIRST, date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
};

function chart(birth = FIRST) {
  return calculateCanonicalSajuSnapshot(
    birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW },
  );
}
function inputs(
  birth: BirthInput = FIRST,
  comparison: BirthInput | null = SECOND,
  targetRef = 'second-person',
): RelationshipThreeMenuResearchPageInput {
  const snapshot = chart(birth);
  const parents = buildFamilyCanonicalObservationPreview(snapshot, 'parents');
  const children = buildFamilyCanonicalObservationPreview(snapshot, 'children');
  const targetSnapshot = comparison === null ? undefined : chart(comparison);
  const compatibility = targetSnapshot === undefined ? undefined :
    buildCompatibilityTwoChartIntakePreview(
      {
        requestId: 'relationship-pair-sample',
        intent: { domain: 'compatibility', temporalScope: 'natal' },
        targetPersonRef: targetRef,
      },
      { personRef: 'first-person', snapshot },
      { personRef: targetRef, snapshot: targetSnapshot },
    );
  if (compatibility === undefined || targetSnapshot === undefined) {
    return { subjectSnapshot: snapshot, parents, children };
  }
  return { subjectSnapshot: snapshot, parents, children, compatibility, targetSnapshot };
}

describe('real source-owned three relationship menu page', () => {
  it('presents independent parent, child, spouse and two-person facts on one readable Korean page', () => {
    const x = inputs();
    const report = buildRelationshipThreeMenuResearchPage(x);
    expect(report.snapshotId).toBe(x.subjectSnapshot.snapshotId);
    expect(report.calculationHash).toBe(x.subjectSnapshot.calculationHash);
    expect(report.cards.map(card => card.menuId))
      .toEqual(['family', 'spouse', 'compatibility']);
    expect(report.cards.map(card => card.state))
      .toEqual(['partial', 'partial', 'partial']);
    expect(report.cards.map(card => card.meaning))
      .toEqual(['calculation_facts_only', 'position_only', 'calculation_facts_only']);
    expect(report.lifecycle).toBe('internal_research_only');
    expect(report.mayClaimFamilyOutcomes).toBe(false);
    expect(report.mayClaimPartnerTraits).toBe(false);
    expect(report.mayClaimCompatibility).toBe(false);
    expect(report.mayGrantOfficialAuthority).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.mayPersist).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.html).toContain('가족 · 부모와 자녀를 따로 확인');
    expect(report.html).toContain('배우자·관계 · 일지 위치만');
    expect(report.html).toContain('궁합 · 두 명식 확인');
    for (const observed of [...x.parents.observations, ...x.children.observations]) {
      expect(report.html).toContain(observed.factPath);
      expect(report.html).toContain(observed.text);
    }
    const approved = RELATIONSHIP_SPOUSE_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1[0]!;
    expect(report.html).toContain(approved.standardText.summary);
    expect(report.html).toContain(approved.approvedTextByRole.boundary);
    expect(report.html).toContain(approved.profileId);
    for (const sourceId of approved.provenance.sourceRefs) {
      expect(report.html).toContain(sourceId);
    }
    for (const item of x.compatibility!.subject.pillars) {
      expect(report.html).toContain(item.factPath);
    }
    expect(report.html).toContain('T10 궁합 해석이나 점수를 만들지 않습니다');
    expect(report.html).toContain('내부 연구용 부분 지원');
  });

  it('requires the other person to be entered rather than implying compatibility', () => {
    const result = buildRelationshipThreeMenuResearchPage(inputs(FIRST, null));
    expect(result.cards.map(card => card.state))
      .toEqual(['partial', 'partial', 'unavailable']);
    expect(result.cards[2]?.meaning).toBe('none');
    expect(result.cards[2]?.missing.join(' ')).toContain('출생정보');
    expect(result.html).toContain('상대방 명식을 아직 입력하지 않았습니다');
    expect(result.html).not.toContain('두 번째 명식:');
  });

  it('separates unknown-hour child facts from known parents and the position-only spouse', () => {
    const unknown: BirthInput = { ...FIRST, time: { known: false } };
    const result = buildRelationshipThreeMenuResearchPage(inputs(unknown, SECOND));
    expect(result.cards[0]?.state).toBe('partial');
    expect(result.html).toContain('자녀 (출생시각 또는 계산 근거 부족)');
    expect(result.html).toContain('시주의 간지가 확정되지 않았으므로');
    expect(result.html).toContain('부모 (계산 관찰 가능)');
    const day = chart(unknown).pillars.day;
    if (day.status === 'resolved') {
      expect(result.cards[1]?.meaning).toBe('position_only');
      expect(result.html).toContain(day.value.branch.hanja);
    } else {
      expect(result.cards[1]?.state).toBe('unavailable');
    }
    expect(result.mayClaimFamilyOutcomes).toBe(false);
    expect(result.mayClaimCompatibility).toBe(false);
  });

  it('reflects different real charts and remains deterministic on replay', () => {
    const first = inputs();
    const page = buildRelationshipThreeMenuResearchPage(first);
    expect(buildRelationshipThreeMenuResearchPage(first)).toEqual(page);
    const different = buildRelationshipThreeMenuResearchPage(inputs({
      ...FIRST, date: { year: 1991, month: 5, day: 15 },
    }));
    expect(different.snapshotId).not.toBe(page.snapshotId);
    expect(different.calculationHash).not.toBe(page.calculationHash);
    expect(different.html).not.toBe(page.html);
    expect(different.cards[1]?.meaning).toBe('position_only');
  });

  it('refuses mismatched family scopes, false source claims and another subject identity', () => {
    const sample = inputs();
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      parents: sample.children,
    })).toThrow('mismatched');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      parents: { ...sample.parents, mayPublish: true },
    } as unknown as typeof sample)).toThrow('promoted family');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      parents: { ...sample.parents, observations: [
        { ...sample.parents.observations[0]!, observedPillar: '가짜 간지' },
        sample.parents.observations[1]!,
      ] },
    })).toThrow('mismatched');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      parents: {
        ...sample.parents,
        observations: [
          { ...sample.parents.observations[0]!,
            text: '부모의 성격과 미래를 임의로 창작한 문장' },
          sample.parents.observations[1]!,
        ],
      },
    })).toThrow('altered family');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      compatibility: {
        ...sample.compatibility!,
        missing: ['두 사람은 반드시 결혼한다.'],
      },
    })).toThrow('altered compatibility');
    const other = inputs({ ...FIRST, date: { year: 2000, month: 5, day: 15 } });
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      compatibility: other.compatibility!,
    })).toThrow('mixed-person');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      targetSnapshot: undefined,
    } as unknown as typeof sample)).toThrow('mixed-person');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      targetSnapshot: chart({ ...SECOND, date: { year: 1997, month: 1, day: 9 } }),
    })).toThrow('mixed-person');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      compatibility: {
        ...sample.compatibility!,
        target: {
          ...sample.compatibility!.target,
          pillars: sample.compatibility!.target.pillars.map((item, index) =>
            index === 0 ? { ...item, branchHanja: '甲' } : item),
        },
      },
    })).toThrow('mixed-person');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      compatibility: {
        ...sample.compatibility!,
        target: { ...sample.compatibility!.target, birthTimeKnown: false },
      },
    })).toThrow('mixed-person');
    expect(() => buildRelationshipThreeMenuResearchPage({
      ...sample,
      compatibility: { ...sample.compatibility!, maySell: true },
    } as unknown as typeof sample)).toThrow('mixed-person');
  });

  it('escapes untrusted person references in the browser page', () => {
    const unsafeRef = '<script>alert(1)</script>';
    const result = buildRelationshipThreeMenuResearchPage(inputs(FIRST, SECOND, unsafeRef));
    expect(result.html).not.toContain(unsafeRef);
    expect(result.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});
