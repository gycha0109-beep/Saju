import { describe, expect, it } from 'vitest';
import type { BirthInput, PillarSlot } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { compareT10CrossMethodEvidenceV1 } from
  '../src/research/compatibility-t10-cross-method-contrast.js';

function birth(
  year: number, month: number, day: number,
  sex: 'male' | 'female' | 'unspecified' = 'unspecified',
  known = true,
): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: sex,
  };
}
const A = birth(1990, 5, 15);
const SUPPORT_WITH_CLASH = birth(1996, 6, 5);
const CLASH_WITH_SUPPORT = birth(1996, 8, 5);
const NO_OPPOSITION = birth(1990, 5, 8);
function run(a: BirthInput, b: BirthInput, opt = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'source-limited-cross-method-test',
    subjectPersonRef: 'person-first',
    targetPersonRef: 'person-second',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(opt ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}
function inputs(output: ReturnType<typeof run>) {
  const coexisting = output.coexistingEvidenceReview;
  const six = output.classicalCrossTenGodResearch;
  const useful = output.classicalUsefulElementResearch;
  const applicability = output.threeMethodApplicabilityReading;
  if (!coexisting || !six || !useful || !applicability) {
    throw new TypeError('Expected the guarded research opt-in.');
  }
  return [output.sourceScopeHandoff, coexisting, six, useful, applicability] as const;
}

describe('T10 source-bound multi-method contrasts on two original charts', () => {
  it('records day six-combination versus a separate-position clash without precedence', () => {
    const output = run(A, SUPPORT_WITH_CLASH);
    const result = output.crossMethodContrastResearch;
    expect(result?.structural).toHaveLength(1);
    expect(result?.structural[0]?.direction)
      .toBe('day_six_combination_with_other_clash');
    expect(result?.structural[0]?.dayFactPaths)
      .toEqual(['subject.pillars.day.value.branch', 'target.pillars.day.value.branch']);
    expect(result?.structural[0]?.otherFactPaths).toEqual(
      expect.arrayContaining([expect.objectContaining({
        subject: 'subject.pillars.year.value.branch',
        target: 'target.pillars.year.value.branch',
        kind: 'branch_clash',
        definitionContentHash: expect.stringMatching(/^[0-9a-f]{64}$/u),
      })]),
    );
    expect(result?.structural[0]?.paragraph).toContain('우선순위를 증명한');
    const mixed = result?.structural[0];
    expect(mixed?.dayFactValues.kind).toBe('branch_six_combination');
    expect(mixed?.paragraph).toContain('실제 일지 비교는 첫 번째 사람 ' +
      mixed?.dayFactValues.subject + '과 두 번째 사람 ' +
      mixed?.dayFactValues.target + '의 육합');
    expect(mixed?.paragraph).toContain('첫 번째 사람 연지');
    expect(mixed?.paragraph).toContain('두 번째 사람 연지');
    expect(mixed?.otherFactPaths.every(item =>
      mixed.paragraph.includes(item.subjectValue) &&
      mixed.paragraph.includes(item.targetValue))).toBe(true);
    expect(result?.synthesisDecision.caseId)
      .toBe('day_six_combination_vs_other_clash');
    expect(result?.synthesisDecision.dayPillarFacts.sourceStatus)
      .toBe('both_resolved');
    expect(result?.synthesisDecision.paragraph)
      .toContain('첫 번째 사람의 일주는');
    expect(result?.synthesisDecision.qualitativeCounterexample)
      .toMatchObject({
        sourcePopulation: 'MARRIED_COUPLES_QUALITATIVE_INTERVIEWS',
        currentPairInterviewed: false,
        currentPairBehaviorObserved: false,
        currentPairOutcomeInferred: false,
      });
    expect(result?.synthesisDecision.sourceUrls)
      .toContain('https://www.dbpia.co.kr/journal/detail?nodeId=T14205410');
    expect(result?.synthesisDecision.paragraph)
      .toContain('일지 육합과 다른 위치의 충');
    expect(result?.synthesisDecision.observedFactPaths).toEqual(
      expect.arrayContaining([
        'subject.pillars.day.value.branch',
        'target.pillars.day.value.branch',
        'subject.pillars.year.value.branch',
        'target.pillars.year.value.branch',
      ]),
    );
    expect(result?.synthesisDecision.sourceQualifiedPriorityEstablished).toBe(false);
    expect(result?.synthesisDecision.relationshipConclusion).toBeNull();
    expect(result?.structural[0]?.netRelationshipMeaning).toBeNull();
    expect(result?.interpersonalConclusion).toBeNull();
    expect(result?.maySell).toBe(false);
  });

  it('keeps the 2020 joint-factor study as an unqualified source hypothesis', () => {
    for (const counterpart of [SUPPORT_WITH_CLASH, CLASH_WITH_SUPPORT, NO_OPPOSITION]) {
      const output = run(A, counterpart);
      const synthesis = output.crossMethodContrastResearch?.synthesisDecision;
      const study = synthesis?.conditionalJointFactorStudy;
      expect(study?.sourceUrl).toBe('https://www.riss.kr/link?id=T15540056');
      expect(study?.sourceEvidence).toBe('RISS_PUBLIC_ABSTRACT_AND_TOC_ONLY');
      expect(study?.studyPopulation).toBe('married_couples_only');
      expect(study?.candidateObservedFactPaths).toEqual(synthesis?.observedFactPaths);
      expect(study?.candidateObservedFactPaths).toContain('subject.pillars.day');
      expect(study?.candidateObservedFactPaths).toContain('target.pillars.day');
      expect(study?.bothChartFactorsOperationalized).toBe(false);
      expect(study?.adverseFactorAccumulationEstablished).toBe(false);
      expect(study?.counterpartNeutralizationEstablished).toBe(false);
      expect(study?.methodAppliesToCurrentPair).toBe(false);
      expect(study?.individualRelationshipPredictionAuthorized).toBe(false);
      expect(synthesis?.sourceUrls).toContain(study?.sourceUrl);
      expect(synthesis?.unresolvedPrerequisites).toContain(
        'NAM_2020_ADVERSE_AND_NEUTRALIZATION_CRITERIA_NOT_OPERATIONALIZED');
      expect(synthesis?.paragraph).toContain('남기동(2020) 박사논문의 공개 초록');
      expect(synthesis?.relationshipConclusion).toBeNull();
      expect(output.pairReadingBoundaryDraft?.sections.find(section =>
        section.id === 'synthesis_hold')?.sentences[0]?.sourceUrls)
        .toContain(study?.sourceUrl);
      expect(output.productReadingQualityReview?.actualCompatibilityReadingReady).toBe(false);
      expect(output.maySell).toBe(false);
    }
    const ordinary = run(A, SUPPORT_WITH_CLASH, false);
    expect(ordinary.crossMethodContrastResearch).toBeUndefined();
    expect(ordinary.html).toBe(run(A, SUPPORT_WITH_CLASH).html);
  });

  it('reads each real chart day-palace factor against the 2020 author category', () => {
    for (const counterpart of [SUPPORT_WITH_CLASH, CLASH_WITH_SUPPORT, NO_OPPOSITION]) {
      const output = run(A, counterpart);
      const personal = output.coexistingEvidenceReview?.individualPalace;
      const study = output.crossMethodContrastResearch?.synthesisDecision
        .conditionalJointFactorStudy;
      if (!personal || !study) throw new TypeError('Missing original chart evidence.');
      expect(study.singleChartDayPalaceFactorCandidates).toHaveLength(2);
      for (const [i, original] of [personal.subject, personal.target].entries()) {
        const candidate = study.singleChartDayPalaceFactorCandidates[i]!;
        const role = i === 0 ? 'subject' : 'target';
        expect(candidate.personRef).toBe(original.personRef);
        expect(candidate.calculationHash).toBe(original.calculationHash);
        expect(candidate.riskWeightOrIndividualOutcomeEstablished).toBe(false);
        if (original.state === 'unresolved_day_pillar') {
          expect(candidate.status).toBe('unresolved');
          expect(candidate.factPaths).toEqual([]);
        } else {
          const matched = original.state === 'same_element';
          expect(candidate.status).toBe(matched
            ? 'author_listed_ganyeojidong_observed' : 'not_observed');
          expect(candidate.matchesAuthorAbstractListedCategory).toBe(matched);
          expect(candidate.factPaths).toEqual([
            role + '.pillars.day.value.stem.element',
            role + '.pillars.day.value.branch.element',
          ]);
          expect(candidate.stemElement).toBe(original.evidence?.stemElement);
          expect(candidate.branchElement).toBe(original.evidence?.branchElement);
          expect(output.crossMethodContrastResearch?.synthesisDecision.paragraph)
            .toContain((i === 0 ? '첫 번째 사람' : '두 번째 사람') +
              '의 일간 오행은 ' + original.evidence?.stemElement +
              ', 일지 오행은 ' + original.evidence?.branchElement);
        }
      }
      expect(study.bothChartFactorsOperationalized).toBe(false);
      expect(study.adverseFactorAccumulationEstablished).toBe(false);
      expect(study.counterpartNeutralizationEstablished).toBe(false);
      expect(output.crossMethodContrastResearch?.synthesisDecision.relationshipConclusion)
        .toBeNull();
      expect(output.productReadingQualityReview?.actualCompatibilityReadingReady)
        .toBe(false);
      expect(output.maySell).toBe(false);
    }
    const forward = run(A, SUPPORT_WITH_CLASH);
    const reverse = run(SUPPORT_WITH_CLASH, A);
    expect(reverse.crossMethodContrastResearch?.synthesisDecision
      .conditionalJointFactorStudy.singleChartDayPalaceFactorCandidates.map(x =>
        x.calculationHash)).toEqual(
      forward.crossMethodContrastResearch?.synthesisDecision
        .conditionalJointFactorStudy.singleChartDayPalaceFactorCandidates
        .map(x => x.calculationHash).reverse());
    expect(run(A, SUPPORT_WITH_CLASH, false).html).toBe(forward.html);
  });

  it('rejects fabricated personal day-palace source factors', () => {
    const output = run(A, SUPPORT_WITH_CLASH);
    const [pair, coexisting, six, useful, axes] = inputs(output);
    expect(() => compareT10CrossMethodEvidenceV1(
      pair, {
        ...coexisting,
        individualPalace: {
          ...coexisting.individualPalace,
          subject: {
            personRef: coexisting.individualPalace.subject.personRef,
            snapshotId: coexisting.individualPalace.subject.snapshotId,
            calculationHash: coexisting.individualPalace.subject.calculationHash,
            state: 'same_element',
          },
        },
      },
      six, useful, axes,
    )).toThrow('exact canonical element facts');
  });

  it('binds six author-listed ten-god courses to each canonical historical role', () => {
    const output = run(
      birth(1990, 5, 15, 'male'), birth(1996, 6, 5, 'female'));
    const report = output.tenGodCourseResearch;
    expect(report?.source.dissertation.url)
      .toBe('https://www.riss.kr/link?id=T14398372');
    expect(report?.source.bookExcerpt.evidenceLayer)
      .toBe('PUBLIC_THIRD_PARTY_BOOK_EXCERPT');
    expect(report?.courses.map(x => x.courseId)).toEqual([
      'male_food_to_wealth', 'male_wealth_to_official', 'male_peer_vs_wealth',
      'female_official_to_resource', 'female_wealth_to_official',
      'female_food_vs_official',
    ]);
    expect(report?.courses.slice(0, 3).every(x =>
      x.personRef === 'person-first')).toBe(true);
    expect(report?.courses.slice(3).every(x =>
      x.personRef === 'person-second')).toBe(true);
    for (const item of report?.courses ?? []) {
      expect(item.groups).toHaveLength(2);
      expect(item.strengthAndRootingEstablished).toBe(false);
      expect(item.sourceGradingConditionsSatisfied).toBe(false);
      expect(item.grade).toBeNull();
      expect(item.paragraph).toContain(item.label);
      for (const group of item.groups) {
        for (const position of group.actualVisiblePositions) {
          expect(position.path).toBe(
            'derivedFacts.tenGods.' + position.slot + '.' + position.channel);
          expect(group.terms).toContain(position.value);
        }
      }
    }
    const prior = output.classicalCrossTenGodResearch;
    const malePeer = report?.courses.find(x => x.courseId === 'male_peer_vs_wealth');
    const femaleFood = report?.courses.find(x => x.courseId === 'female_food_vs_official');
    expect(malePeer?.groups[0]?.actualVisiblePositions.map(x => x.path))
      .toEqual(prior?.male?.observed.map(x => x.path));
    expect(femaleFood?.groups[0]?.actualVisiblePositions.map(x => x.path))
      .toEqual(prior?.female?.observed.map(x => x.path));
    expect(report?.compatibilityScore).toBeNull();
    expect(report?.maySell).toBe(false);
    expect(output.productReadingQualityReview?.actualCompatibilityReadingReady)
      .toBe(false);
    expect(output.maySell).toBe(false);
  });

  it('separates the excerpt three scoring stages from unqualified visible T5 inputs', () => {
    const output = run(
      birth(1990, 5, 15, 'male'), birth(1996, 6, 5, 'female'),
    );
    const courses = output.tenGodCourseResearch?.courses;
    expect(courses).toHaveLength(6);
    expect(courses?.map(x => x.methodInputAudit.sourceStep))
      .toEqual([1, 2, 3, 1, 2, 3]);
    expect(courses?.map(x => x.methodInputAudit.sourceCondition)).toEqual([
      'rooted_expressed_wealth_or_resource',
      'rooted_expressed_wealth_and_official',
      'relative_strength_and_balance',
      'rooted_expressed_wealth_or_resource',
      'rooted_expressed_wealth_and_official',
      'relative_strength_and_balance',
    ]);
    for (const course of courses ?? []) {
      const audit = course.methodInputAudit;
      expect(audit.inspectedGroups.map(x => x.group))
        .toEqual(audit.sourceStep === 1 ? ['b'] : ['a', 'b']);
      for (const item of audit.inspectedGroups) {
        const actual = course.groups.find(g => g.group === item.group);
        expect(item.stemVisibleFactPaths).toEqual(actual?.actualVisiblePositions
          .filter(p => p.channel === 'stem').map(p => p.path));
        expect(item.representativeBranchFactPaths).toEqual(
          actual?.actualVisiblePositions.filter(p => p.channel === 'branch')
            .map(p => p.path));
        expect(item.bothDisplayChannelsObserved).toBe(
          item.stemVisibleFactPaths.length > 0 &&
          item.representativeBranchFactPaths.length > 0);
        expect(item.groupUnresolvedFactPaths).toEqual(actual?.unresolvedFactPaths);
      }
      expect(audit.actualRootingEstablished).toBe(false);
      expect(audit.originalStemExpressionMethodValidated).toBe(false);
      expect(audit.originalCombinationClashEffectsSettled).toBe(false);
      expect(audit.originalStrengthBalanceEstablished).toBe(false);
      expect(audit.sourceGrade).toBeNull();
      expect(course.grade).toBeNull();
      expect(course.paragraph).toContain(audit.paragraph);
    }
    const first = birth(1990, 5, 15, 'male', false);
    const second = birth(1996, 6, 5, 'female');
    const missing = run(first, second).tenGodCourseResearch?.courses;
    const reverse = run(second, first).tenGodCourseResearch?.courses;
    for (const item of missing?.slice(0, 3) ?? []) {
      expect(item.methodInputAudit.inspectedGroups.every(group =>
        group.stemVisibleFactPaths.length === 0 &&
        group.representativeBranchFactPaths.length === 0 &&
        group.groupUnresolvedFactPaths.length === 7)).toBe(true);
      expect(item.methodInputAudit.sourceGrade).toBeNull();
    }
    expect(reverse?.map(item => [
      item.courseId, item.calculationHash,
      item.methodInputAudit.inspectedGroups,
    ])).toEqual(missing?.map(item => [
      item.courseId, item.calculationHash,
      item.methodInputAudit.inspectedGroups,
    ]));
    expect(run(A, SUPPORT_WITH_CLASH).tenGodCourseResearch?.courses).toEqual([]);
    expect(output.productReadingQualityReview?.actualCompatibilityReadingReady)
      .toBe(false);
    expect(output.maySell).toBe(false);
  });

  it('matches real same-person visible stems to actual canonical hidden-stem entries', () => {
    const first = birth(1990, 5, 15, 'male');
    const second = birth(1996, 6, 5, 'female');
    const now = new Date('2026-11-11T00:00:00.000Z');
    const originals = [
      calculateAuthorizedMyeonghwaProductionSnapshot(first, { now }).snapshot,
      calculateAuthorizedMyeonghwaProductionSnapshot(second, { now }).snapshot,
    ];
    const output = run(first, second);
    const courses = output.tenGodCourseResearch?.courses ?? [];
    expect(courses).toHaveLength(6);
    for (const course of courses) {
      const snapshot = course.historicalRole === 'male' ? originals[0]! : originals[1]!;
      expect(course.calculationHash).toBe(snapshot.calculationHash);
      for (const group of course.methodInputAudit.inspectedGroups) {
        const matchingGroup = course.groups.find(item => item.group === group.group);
        const expectedMissing = (['year', 'month', 'day', 'hour'] as const)
          .filter(slot => snapshot.derivedFacts.hiddenStems?.[slot]?.status !== 'resolved')
          .map(slot => 'derivedFacts.hiddenStems.' + slot);
        expect(group.unresolvedHiddenStemFactPaths).toEqual(expectedMissing);
        for (const match of group.sameStemHiddenStemMatches) {
          const stemSlot = match.visibleStemFactPath.split('.')[1] as PillarSlot;
          const branchSlot = match.hiddenStemCollectionFactPath.split('.')[2] as PillarSlot;
          const stem = snapshot.pillars[stemSlot];
          const branch = snapshot.pillars[branchSlot];
          const hidden = snapshot.derivedFacts.hiddenStems?.[branchSlot];
          expect(stem.status).toBe('resolved');
          expect(branch.status).toBe('resolved');
          expect(hidden?.status).toBe('resolved');
          if (stem.status !== 'resolved' || hidden?.status !== 'resolved') {
            throw new TypeError('Expected an existing original stem and hidden-stem fact.');
          }
          expect(match.visibleStem).toBe(stem.value.stem.value);
          expect(hidden.value).toContain(match.visibleStem);
          expect(match.branchFactPath).toBe('pillars.' + branchSlot + '.value.branch');
          expect(match.visibleTenGodFactPath)
            .toBe('derivedFacts.tenGods.' + stemSlot + '.stem');
          expect(matchingGroup?.actualVisiblePositions.some(item =>
            item.path === match.visibleTenGodFactPath)).toBe(true);
          expect(match.sameStemCharacterObserved).toBe(true);
          expect(match.sourceQualifiedRootingEstablished).toBe(false);
        }
      }
      expect(course.methodInputAudit.actualRootingEstablished).toBe(false);
      expect(course.methodInputAudit.sourceGrade).toBeNull();
    }
    expect(output.tenGodCourseResearch?.compatibilityScore).toBeNull();
    expect(output.maySell).toBe(false);
  });

  it('binds the author excerpt combination and clash inputs only to original personal-chart relations', () => {
    const first = birth(1990, 5, 15, 'male');
    const second = birth(1996, 6, 5, 'female');
    const now = new Date('2026-11-11T00:00:00.000Z');
    const originals = [
      calculateAuthorizedMyeonghwaProductionSnapshot(first, { now }).snapshot,
      calculateAuthorizedMyeonghwaProductionSnapshot(second, { now }).snapshot,
    ];
    const output = run(first, second);
    const items = output.tenGodCourseResearch?.courses ?? [];
    expect(items).toHaveLength(6);
    for (const course of items) {
      const snapshot = course.historicalRole === 'male' ? originals[0]! : originals[1]!;
      const upstream = snapshot.derivedFacts.structuralRelations;
      const rows = upstream?.status === 'resolved' ? upstream.value : [];
      for (const group of course.methodInputAudit.inspectedGroups) {
        expect(group.sourceStructuralObservation).toBe(
          course.methodInputAudit.sourceStep === 3
            ? 'not_graded_at_strength_stage'
            : upstream?.status === 'resolved' ? 'available' : 'unresolved',
        );
        const observed = course.groups.find(item => item.group === group.group);
        const sourceMatching = course.methodInputAudit.sourceStep === 3 ? []
          : (observed?.actualVisiblePositions ?? []).flatMap(position => {
            const pillar = snapshot.pillars[position.slot];
            if (pillar.status !== 'resolved') return [];
            return rows.filter(relation =>
              (position.channel === 'stem'
                ? relation.kind === 'stem_five_combination'
                : relation.kind === 'branch_six_combination' ||
                  relation.kind === 'branch_clash' ||
                  relation.kind === 'branch_three_combination') &&
              relation.participants.some(p =>
                p.pillar === position.slot && p.component === position.channel &&
                p.value === pillar.value[position.channel].value));
          });
        expect(group.matchingWithinChartStructuralCandidates.map(r => r.relationId))
          .toEqual(sourceMatching.map(r => r.relationId));
        for (const match of group.matchingWithinChartStructuralCandidates) {
          const relation = rows.find(r => r.relationId === match.relationId);
          expect(relation?.kind).toBe(match.kind);
          expect(match.upstreamStructuralSourceIds).toEqual(relation?.sourceIds);
          expect(match.sourceQualifiedAuthorPenalty).toBe(false);
          const [prefix, slot, value, component] = match.originalParticipantFactPath.split('.');
          expect(prefix).toBe('pillars');
          expect(value).toBe('value');
          const original = snapshot.pillars[slot as PillarSlot];
          expect(original.status).toBe('resolved');
          if (original.status !== 'resolved') throw new TypeError('Missing original pillar.');
          expect(original.value[component as 'stem' | 'branch'].value)
            .toBe(match.originalParticipantValue);
          expect(match.observedTenGodFactPath)
            .toBe('derivedFacts.tenGods.' + slot + '.' + component);
          expect(match.otherOriginalParticipantFactPaths).toEqual(
            relation?.participants.filter(p => p.pillar !== slot)
              .map(p => 'pillars.' + p.pillar + '.value.' + p.component));
        }
      }
      expect(course.methodInputAudit.originalCombinationClashEffectsSettled).toBe(false);
      expect(course.methodInputAudit.completeAuthorStemClashConditionsAvailable).toBe(false);
      expect(course.methodInputAudit.sourceGrade).toBeNull();
      expect(course.grade).toBeNull();
    }
    const reversed = run(second, first).tenGodCourseResearch?.courses;
    expect(reversed?.map(x => [
      x.courseId, x.calculationHash,
      x.methodInputAudit.inspectedGroups.map(g => g.matchingWithinChartStructuralCandidates),
    ])).toEqual(items.map(x => [
      x.courseId, x.calculationHash,
      x.methodInputAudit.inspectedGroups.map(g => g.matchingWithinChartStructuralCandidates),
    ]));
    expect(output.productReadingQualityReview?.actualCompatibilityReadingReady)
      .toBe(false);
    expect(run(first, second, false).tenGodCourseResearch).toBeUndefined();
    expect(output.maySell).toBe(false);
  });

  it('keeps course input ownership after reversal and refuses unknown historical roles', () => {
    const first = birth(1990, 5, 15, 'male', false);
    const second = birth(1996, 6, 5, 'female');
    const forward = run(first, second).tenGodCourseResearch;
    const reverse = run(second, first).tenGodCourseResearch;
    expect(forward?.courses).toHaveLength(6);
    expect(reverse?.courses).toHaveLength(6);
    expect(forward?.courses.map(x => [
      x.courseId, x.calculationHash, x.visibleGroupState,
      x.groups.map(g => [g.actualVisiblePositions, g.unresolvedFactPaths]),
    ])).toEqual(reverse?.courses.map(x => [
      x.courseId, x.calculationHash, x.visibleGroupState,
      x.groups.map(g => [g.actualVisiblePositions, g.unresolvedFactPaths]),
    ]));
    expect(forward?.courses.map(x => x.personRef)).toEqual([
      'person-first', 'person-first', 'person-first',
      'person-second', 'person-second', 'person-second',
    ]);
    expect(reverse?.courses.map(x => x.personRef)).toEqual([
      'person-second', 'person-second', 'person-second',
      'person-first', 'person-first', 'person-first',
    ]);
    expect(forward?.courses.slice(0, 3).every(item =>
      item.anyUnresolvedCanonicalSlots &&
      item.groups.every(g => g.unresolvedFactPaths.length === 7))).toBe(true);
    expect(forward?.courses.every(item =>
      item.sourceGradingConditionsSatisfied === false)).toBe(true);
    const unmatched = run(A, SUPPORT_WITH_CLASH).tenGodCourseResearch;
    expect(unmatched?.historicalScope).toBe('historical_sex_scope_not_matched');
    expect(unmatched?.courses).toEqual([]);
    expect(unmatched?.compatibilityScore).toBeNull();
    const ordinary = run(first, second, false);
    expect(ordinary.tenGodCourseResearch).toBeUndefined();
    expect(ordinary.html).toBe(run(first, second).html);
  });

  it('records the opposite configuration with exact cross-position source paths', () => {
    const result = run(A, CLASH_WITH_SUPPORT).crossMethodContrastResearch;
    expect(result?.structural[0]?.direction)
      .toBe('day_clash_with_other_six_combination');
    expect(result?.structural[0]?.otherFactPaths).toEqual(
      expect.arrayContaining([expect.objectContaining({
        subject: 'subject.pillars.year.value.branch',
        target: 'target.pillars.month.value.branch',
        kind: 'branch_six_combination',
      })]),
    );
    expect(result?.structural[0]?.conditionalPriorityEstablished).toBe(false);
    expect(result?.synthesisDecision.caseId)
      .toBe('day_clash_vs_other_six_combination');
    expect(result?.synthesisDecision.paragraph)
      .toContain('일지 충과 다른 위치의 육합');
    expect(result?.synthesisDecision.unresolvedPrerequisites)
      .toContain('EXACT_TWO_PERSON_PRIORITIZATION_RULE');
    const mixed = result?.structural[0];
    expect(mixed?.dayFactValues.kind).toBe('branch_clash');
    expect(mixed?.paragraph).toContain('실제 일지 비교는 첫 번째 사람 ' +
      mixed?.dayFactValues.subject + '과 두 번째 사람 ' +
      mixed?.dayFactValues.target + '의 충');
    expect(mixed?.paragraph).toContain('첫 번째 사람 연지');
    expect(mixed?.paragraph).toContain('두 번째 사람 월지');
    expect(result?.compatibilityScore).toBeNull();
  });

  it('does not invent a competing palace factor when there is none', () => {
    const result = run(A, NO_OPPOSITION).crossMethodContrastResearch;
    expect(result?.structural).toEqual([]);
    expect(result?.synthesisDecision.caseId).toBe('no_listed_opposite_positions');
    expect(result?.synthesisDecision.paragraph)
      .toContain('잘 맞는다는 근거가 아닙니다');
    expect(result?.synthesisDecision.noObservedOppositionProvesHarmony).toBe(false);
    expect(result?.synthesisDecision.unresolvedPrerequisites)
      .toContain('NO_OBSERVED_OPPOSITE_IS_NOT_EVIDENCE_OF_HARMONY');
    expect(result?.historical.oppositeChartOutcomesEstablished).toBe(false);
    expect(result?.interpersonalConclusion).toBeNull();
  });

  it('attaches real sex-scoped T5 and conditional element inputs without classifying outcomes', () => {
    const output = run(
      birth(1990, 5, 15, 'male'), birth(1996, 6, 5, 'female'),
    );
    const result = output.crossMethodContrastResearch;
    const historical = result?.historical;
    const six = output.classicalCrossTenGodResearch;
    const useful = output.classicalUsefulElementResearch;
    expect(historical?.state).toBe('historical_male_female_scope_with_unsettled_conditions');
    expect(result?.synthesisDecision.historicalMethodScope)
      .toBe('historical_male_female_unresolved');
    expect(result?.synthesisDecision.paragraph)
      .toContain('십신의 중(重)·강약과 실제 용신 선정은 확인되지 않았습니다');
    expect(historical?.tenGodVisibleInputs).toHaveLength(2);
    expect(historical?.elementExampleInputs).toHaveLength(2);
    expect(historical?.tenGodVisibleInputs.find(item =>
      item.personRef === six?.male?.personRef)?.canonicalFactPaths)
      .toEqual(six?.male?.observed.map(item =>
        'subject.' + item.path));
    expect(historical?.elementExampleInputs[0]?.counterpartVisibleFactPaths)
      .toEqual((useful?.hypotheticalExamples[0]
        ?.counterpartVisibleRequiredElementPaths ?? []).concat(
        useful?.hypotheticalExamples[0]?.counterpartVisibleGeneratingElementPaths ?? [],
      ).filter((path, i, all) => all.indexOf(path) === i).map(path =>
        'target.' + path));
    expect(historical?.paragraph).toContain('상반된 궁합 결과가 입증된 것은 아닙니다');
    expect(historical?.paragraph).toContain('첫 번째 사람(고전 남성 역할 입력의 비견·겁재)');
    expect(historical?.paragraph).toContain('두 번째 사람(고전 여성 역할 입력의 식신·상관)');
    expect(historical?.paragraph).toContain(
      '보이는 항목 ' + six?.male?.countOfVisibleCanonicalTerms + '곳');
    expect(historical?.paragraph).toContain(
      '보이는 항목 ' + six?.female?.countOfVisibleCanonicalTerms + '곳');
    expect(historical?.paragraph).toContain('고전 남성 목왕·금 필요 예시');
    expect(historical?.paragraph).toContain('고전 여성 금강·화 선호 예시');
    expect(historical?.paragraph).toContain('십신 항목의 관측 개수는 원전의 중(重)·강약');
    expect(historical?.paragraph).toContain('실제 용신 선정');
    expect(historical?.sourceUrls).toEqual([
      six?.sources.traditional.url, six?.sources.challenge.url,
    ]);
    expect(historical?.oppositeChartOutcomesEstablished).toBe(false);
    expect(result?.unresolvedMethodPrerequisites)
      .toContain('TEN_GOD_STRENGTH_AND_HIDDEN_STEM_METHOD');
    expect(result?.compatibilityScore).toBeNull();
  });

  it('keeps role-limited method disagreement from becoming a modern relationship inference', () => {
    const result = run(A, SUPPORT_WITH_CLASH).crossMethodContrastResearch;
    expect(result?.historical.state).toBe('historical_role_scope_unmatched');
    expect(result?.synthesisDecision.historicalMethodScope)
      .toBe('historical_roles_not_matched');
    expect(result?.synthesisDecision.paragraph)
      .toContain('현재 두 사람에게 적용할 수 없습니다');
    expect(result?.historical.tenGodVisibleInputs).toEqual([]);
    expect(result?.historical.elementExampleInputs).toEqual([]);
    expect(result?.historical.oppositeChartOutcomesEstablished).toBe(false);
  });

  it('retains each original day-pillar value and never assigns an interview case to either person', () => {
    const forward = run(A, SUPPORT_WITH_CLASH);
    const reverse = run(SUPPORT_WITH_CLASH, A);
    const x = forward.crossMethodContrastResearch?.synthesisDecision;
    const y = reverse.crossMethodContrastResearch?.synthesisDecision;
    const pair = forward.sourceScopeHandoff.factualPairObservations.find(item =>
      item.pillarSlot === 'day');
    expect(x?.dayPillarFacts.subject).toBe(pair?.subjectPillar);
    expect(x?.dayPillarFacts.target).toBe(pair?.targetPillar);
    expect(y?.dayPillarFacts.subject).toBe(x?.dayPillarFacts.target);
    expect(y?.dayPillarFacts.target).toBe(x?.dayPillarFacts.subject);
    expect(x?.observedFactPaths).toContain('subject.pillars.day');
    expect(x?.observedFactPaths).toContain('target.pillars.day');
    expect(x?.paragraph).toContain('2016년 기혼 부부 면접 연구의 공개 초록');
    expect(y?.paragraph).toContain('지금 두 사람의 행동이나 미래를 관측한 결과가 아닙니다');
    expect(x?.qualitativeCounterexample.currentPairOutcomeInferred).toBe(false);
    expect(forward.maySell).toBe(false);
  });

  it('preserves each person and an unknown-hour gap when charts are reversed', () => {
    const first = birth(1990, 5, 15, 'male', false);
    const second = birth(1996, 6, 5, 'female');
    const forward = run(first, second).crossMethodContrastResearch;
    const reverse = run(second, first).crossMethodContrastResearch;
    expect(reverse?.subject.calculationHash).toBe(forward?.target.calculationHash);
    expect(reverse?.target.calculationHash).toBe(forward?.subject.calculationHash);
    expect(forward?.historical.tenGodVisibleInputs.find(item =>
      item.personRef === 'person-first')?.unresolvedFactPaths)
      .toContain('subject.derivedFacts.tenGods.hour.stem');
    expect(reverse?.historical.tenGodVisibleInputs.find(item =>
      item.personRef === 'person-second')?.unresolvedFactPaths)
      .toContain('target.derivedFacts.tenGods.hour.stem');
    expect(reverse?.historical.oppositeChartOutcomesEstablished).toBe(false);
    expect(forward?.historical.paragraph)
      .toContain('첫 번째 사람(고전 남성 역할 입력의 비견·겁재)');
    expect(reverse?.historical.paragraph)
      .toContain('두 번째 사람(고전 남성 역할 입력의 비견·겁재)');
    const forwardMissing = forward?.historical.tenGodVisibleInputs.find(item =>
      item.personRef === 'person-first')?.unresolvedFactPaths;
    const reverseMissing = reverse?.historical.tenGodVisibleInputs.find(item =>
      item.personRef === 'person-second')?.unresolvedFactPaths;
    // With unknown birth hour, canonical T5 makes the entire chart-level
    // ten-god result unavailable, not only its two hour slots.
    expect(forwardMissing).toHaveLength(7);
    expect(reverseMissing).toEqual(forwardMissing?.map(path =>
      path.replace(/^subject\./u, 'target.')));
    expect(forward?.historical.paragraph)
      .toContain('미확정 위치 ' + forwardMissing?.length + '곳');
    expect(reverse?.historical.paragraph)
      .toContain('미확정 위치 ' + reverseMissing?.length + '곳');
    expect(forward?.historical.paragraph).not.toContain('궁합 점수');
  });

  it('rejects foreign research identities and swapped structural paths', () => {
    const output = run(A, SUPPORT_WITH_CLASH);
    const [pair, coexisting, six, useful, axes] = inputs(output);
    expect(() => compareT10CrossMethodEvidenceV1(
      pair, {
        ...coexisting,
        target: { ...coexisting.target, calculationHash: 'wrong-hash' },
      }, six, useful, axes,
    )).toThrow('identical protected evidence');
    expect(() => compareT10CrossMethodEvidenceV1(
      pair, {
        ...coexisting,
        structural: {
          ...coexisting.structural,
          oppositeToDayFactor: coexisting.structural.oppositeToDayFactor.map(
            (item, i) => i === 0 ? {
              ...item,
              subject: { ...item.subject, value: '유' as never },
            } : item,
          ),
        },
      }, six, useful, axes,
    )).toThrow('exact original source entries');
  });

  it('does not touch original customer preview, issuance or selling flags', () => {
    const a = run(A, SUPPORT_WITH_CLASH, false);
    const b = run(A, SUPPORT_WITH_CLASH);
    expect(a.crossMethodContrastResearch).toBeUndefined();
    expect(b.crossMethodContrastResearch?.mayPublish).toBe(false);
    expect(b.crossMethodContrastResearch?.maySell).toBe(false);
    expect(a.html).toBe(b.html);
    expect(b.mayMarkMenuAvailable).toBe(false);
    expect(b.mayPersist).toBe(false);
    expect(b.maySell).toBe(false);
  });
});
