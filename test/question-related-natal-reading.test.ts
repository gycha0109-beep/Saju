import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { normalizeConsumerReadingRequest } from '../src/reading/consumer-reading-request-adapter.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../src/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../src/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../src/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';
import { renderNatalFiveDomainMultifactorResearchHtml } from '../src/preview/natal-five-domain-multifactor-reader.js';
import {
  buildQuestionRelatedNatalReading,
  renderQuestionRelatedNatalReadingHtml,
} from '../src/preview/question-related-natal-reading.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const generalRegistry = createGeneralNatalMultifactorRegistry();
const careerRegistry = createCareerMultifactorResearchRegistry();
const wealthRegistry = createWealthNatalMultifactorRegistry();
const businessRegistry = createBusinessNatalMultifactorRegistry();
const relationshipRegistry = createRelationshipNatalMultifactorRegistry();

function run(known = true, day = 10, month = 3, hour = 12, year = 2024) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour, minute: 0 } as const : { known: false } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const reports = {
    general: buildGeneralNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, generalRegistry, { now: NOW }), generalRegistry),
    career: buildCareerMultifactorResearchReport(
      snapshot, runInterpretation(snapshot, careerRegistry, { now: NOW }), careerRegistry),
    wealth: buildWealthNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, wealthRegistry, { now: NOW }), wealthRegistry),
    business: buildBusinessNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, businessRegistry, { now: NOW }), businessRegistry),
    relationship: buildRelationshipNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, relationshipRegistry, { now: NOW }), relationshipRegistry),
  };
  return { snapshot, reports };
}

function question(text: string) {
  const normalized = normalizeConsumerReadingRequest({
    requestId: 'question-preview-1',
    text: '질문: ' + text,
  });
  expect(normalized.state).toBe('resolved');
  expect(normalized.request?.intent).toEqual({
    domain: 'question_specific', temporalScope: 'natal',
  });
  if (!normalized.request) throw new Error('Expected an authorized question request');
  return normalized.request;
}

describe('question menu: link only preexisting real-chart natal evidence', () => {
  it('keeps exact existing menu questions with the original authorized product reader', () => {
    const result = normalizeConsumerReadingRequest({
      requestId: 'question-existing-menu', text: '질문: 재물운',
    });
    expect(result.state).toBe('resolved');
    expect(result.request?.intent).toEqual({ domain: 'wealth', temporalScope: 'natal' });
    expect(result.request?.question).toBeUndefined();
  });

  it('shows selected wealth research Korean paragraphs, provenance, and limitations without inventing T11 answer', () => {
    const { snapshot, reports } = run();
    const selected = buildQuestionRelatedNatalReading(
      snapshot, question('제 재물운이 궁금해요'), reports);
    expect(reports.wealth.sections.length).toBeGreaterThan(0);
    expect(selected.status).toBe('related_evidence');
    expect(selected.topic).toBe('wealth');
    expect(selected.selectedEvidenceIntroduction).toContain('기존에 발행된');
    expect(selected.selectedEvidenceIntroduction).toContain('미래 결과를 별도로 판정한 내용은 아닙니다');
    expect(selected.sections.length).toBe(reports.wealth.sections.length);
    for (const [index, section] of selected.sections.entries()) {
      const original = reports.wealth.sections[index]!;
      expect(section.paragraph).toBe(original.paragraph);
      expect(section.title).toBe(original.headline);
      expect(section.claimType).toBe(original.claimType);
      expect(section.sourceIds).toEqual(original.sourceIds);
      expect(section.factPaths).toEqual(original.observedFactPaths);
      expect(section.ruleId).toBe(original.ruleId);
    }
    const html = renderQuestionRelatedNatalReadingHtml(selected);
    expect(html).toContain('정식 질문풀이 아님');
    expect(html).toContain(selected.sections[0]!.title);
    expect(html).toContain('T11 풀이가 아닙니다');
    expect(html).not.toContain('특정 사건이 일어납니다');
    expect(selected.researchOnly).toBe(true);
    expect(selected.usefulComplete).toBe(false);
    expect(selected.mayPublish).toBe(false);
    expect(selected.maySell).toBe(false);
    expect(buildQuestionRelatedNatalReading(snapshot, question('제 재물운이 궁금해요'), reports))
      .toEqual(selected);
  });

  it('links everyday career, money-management and relationship wording only to source-owned natal evidence', () => {
    const { snapshot, reports } = run();
    const cases = [
      { text: '이직을 고민하는데 제 성향은 어떤가요?', topic: 'career' },
      { text: '퇴사를 고민하는 제 성향이 궁금해요', topic: 'career' },
      { text: '저축할 때 제 자원 관리 성향이 궁금해요', topic: 'wealth',
        focusAxis: 'management' },
      { text: '썸에서 제 소통 성향은 어떤가요?', topic: 'relationship',
        focusAxis: 'expression' },
    ] as const;
    for (const entry of cases) {
      const { text, topic } = entry;
      const selected = buildQuestionRelatedNatalReading(snapshot, question(text), reports);
      expect(selected.topic, text).toBe(topic);
      const focusAxis = 'focusAxis' in entry ? entry.focusAxis : undefined;
      const expected = focusAxis === undefined ? reports[topic].sections :
        reports[topic].sections.filter(section => section.axis === focusAxis);
      expect(selected.status, text).toBe(expected.length > 0
        ? 'related_evidence' : 'insufficient');
      expect(selected.focusAxis).toBe(focusAxis);
      expect(selected.sections.map(section => section.paragraph)).toEqual(
        expected.map(section => section.paragraph),
      );
      if (focusAxis !== undefined && expected.length === 0) {
        expect(selected.missing.join(' ')).toContain('다른 관점으로 답하지 않습니다');
      }
      expect(selected.caveats.join(' ')).toContain('T11 풀이가 아닙니다');
      expect(selected.mayPublish).toBe(false);
      expect(selected.maySell).toBe(false);
    }
    const mixed = buildQuestionRelatedNatalReading(
      snapshot, question('직장과 저축의 차이가 궁금해요'), reports);
    expect(mixed.status).toBe('ambiguous');
    expect(mixed.sections).toHaveLength(0);
    const timed = buildQuestionRelatedNatalReading(
      snapshot, question('이직은 언제 하는 게 좋나요?'), reports);
    expect(timed.status).toBe('unsupported');
    expect(timed.sections).toHaveLength(0);
  });

  it('recognizes everyday money, work, partnership and contact questions without claiming event outcomes', () => {
    const { snapshot, reports } = run();
    const cases = [
      { questionText: '대출이나 부채를 관리할 때의 제 습관', domain: 'wealth', axis: 'management' },
      { questionText: '회사에서 맡는 직무에 대한 제 일하는 성향', domain: 'career' },
      { questionText: '동업에서 협업을 조율하는 제 방식', domain: 'business', axis: 'coordination' },
      { questionText: '연인과 연락하고 대화하는 제 방식', domain: 'relationship', axis: 'expression' },
    ] as const;
    for (const value of cases) {
      const result = buildQuestionRelatedNatalReading(
        snapshot, question(value.questionText), reports);
      expect(result.topic, value.questionText).toBe(value.domain);
      if ('axis' in value) expect(result.focusAxis).toBe(value.axis);
      expect(result.status === 'related_evidence' || result.status === 'insufficient')
        .toBe(true);
      expect(result.mayPublish).toBe(false);
      expect(result.maySell).toBe(false);
      expect(result.caveats.join(' ')).toContain('T11 풀이가 아닙니다');
    }
    for (const questionText of [
      '창업하면 성공할 수 있을까요?',
      '면접에 합격할 가능성이 있나요?',
      '투자 수익률을 예측해 주세요',
    ]) {
      const result = buildQuestionRelatedNatalReading(
        snapshot, question(questionText), reports);
      expect(result.status, questionText).toBe('unsupported');
      expect(result.sections).toHaveLength(0);
      expect(result.missing.join(' ')).toContain('특정 결과를 판정할 근거');
    }
  });

  it('retrieves exactly requested Wealth, Business and Relationship axes whether selected or overlapping', () => {
    const cases = [
      { topic: 'wealth', day: 3, month: 1, hour: 3,
        prompt: '재물운의 자원 계획은 어떤가요?', axis: 'planning' },
      { topic: 'business', day: 7, month: 1, hour: 12,
        prompt: '사업에서 조율 관점을 알고 싶어요', axis: 'coordination' },
      { topic: 'relationship', day: 3, month: 1, hour: 0,
        prompt: '연애에서 경계 관점은 어떤가요?', axis: 'boundaries' },
    ] as const;
    for (const c of cases) {
      const { snapshot, reports } = run(true, c.day, c.month, c.hour);
      const originals = reports[c.topic];
      const direct = originals.sections.find(section => section.axis === c.axis);
      const alternative = originals.overlappingPerspectives?.find(section =>
        section.axis === c.axis);
      const existing = direct ?? alternative;
      expect(existing, c.prompt).toBeDefined();
      expect(direct === undefined || alternative === undefined).toBe(true);
      const result = buildQuestionRelatedNatalReading(
        snapshot, question(c.prompt), reports);
      expect(result.status, c.prompt).toBe('related_evidence');
      expect(result.topic).toBe(c.topic);
      expect(result.focusAxis).toBe(c.axis);
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0]).toMatchObject({
        title: existing!.headline,
        paragraph: existing!.paragraph,
        claimType: existing!.claimType,
        factPaths: existing!.observedFactPaths,
        ...(alternative === undefined ? {} : {
          evidenceMode: 'reused_calculated_paths',
        }),
      });
      if (alternative !== undefined) {
        expect(result.selectedEvidenceIntroduction).toContain('독립 근거가 늘어난 것은 아닙니다');
      }
      expect(result.missing.join(' ')).not.toContain(
        '관점의 명식별 해석 근거가 없어 다른 관점으로 답하지 않습니다');
      const html = renderQuestionRelatedNatalReadingHtml(result);
      if (alternative !== undefined) {
        expect(html).toContain('새로운 독립 근거나 질문에 대한 T11 결론이 아닙니다');
      }
      expect(result.usefulComplete).toBe(false);
      expect(result.mayPublish).toBe(false);
      expect(result.maySell).toBe(false);
    }
  });

  it('keeps already issued General T8 perspectives available to a directly focused question', () => {
    const prompts = {
      expression: '전체 사주에서 표현 방식이 궁금합니다',
      response: '전체 사주에서 대응 방식이 궁금합니다',
      responsibility: '전체 사주에서 역할에 관한 관점이 궁금합니다',
      tension: '전체 사주에서 구조적 조율 관점이 궁금합니다',
    } as const;
    let found: { month: number; day: number; hour: number; axis: keyof typeof prompts } | undefined;
    for (const month of [1, 3, 5, 7, 9, 11]) {
      if (found) break;
      for (const day of [3, 7, 11, 17, 23]) {
        if (found) break;
        for (const hour of [0, 6, 12, 18]) {
          const chart = calculateCanonicalSajuSnapshot({
            calendarType: 'solar',
            date: { year: 2024, month, day },
            time: { known: true, hour, minute: 0 },
            sexForTraditionalCalculation: 'unspecified',
          }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
          const report = buildGeneralNatalMultifactorReport(chart,
            runInterpretation(chart, generalRegistry, { now: NOW }), generalRegistry);
          const extra = report.overlappingPerspectives?.find(section =>
            Object.hasOwn(prompts, section.axis));
          if (extra) {
            found = { month, day, hour, axis: extra.axis as keyof typeof prompts };
            break;
          }
        }
      }
    }
    expect(found).toBeDefined();
    if (!found) return;
    const { snapshot, reports } = run(true, found.day, found.month, found.hour);
    const original = reports.general.overlappingPerspectives?.find(section =>
      section.axis === found!.axis);
    expect(original).toBeDefined();
    expect(reports.general.state).toBe('partial');
    const generalHtml = renderNatalFiveDomainMultifactorResearchHtml(snapshot, reports);
    expect(generalHtml).toContain('같은 계산 근거에서 확인된 다른 전체 사주 관점');
    expect(generalHtml).toContain('새로운 독립 근거가 아니며');
    expect(reports.general.sections.some(section =>
      section.claimType === original!.claimType)).toBe(false);
    const actual = buildQuestionRelatedNatalReading(
      snapshot, question(prompts[found.axis]), reports);
    expect(actual.status).toBe('related_evidence');
    expect(actual.focusAxis).toBe(found.axis);
    expect(actual.sections).toHaveLength(1);
    expect(actual.sections[0]).toMatchObject({
      title: original!.headline,
      paragraph: original!.paragraph,
      claimType: original!.claimType,
      ruleId: original!.ruleId,
      sourceIds: original!.sourceIds,
      factPaths: original!.observedFactPaths,
      evidenceMode: 'reused_calculated_paths',
    });
    expect(actual.selectedEvidenceIntroduction).toContain('독립 근거가 늘어난 것은 아닙니다');
    expect(actual.usefulComplete).toBe(false);
    expect(actual.mayPublish).toBe(false);
    expect(actual.maySell).toBe(false);
    const forged = {
      ...reports,
      general: {
        ...reports.general,
        overlappingPerspectives: reports.general.overlappingPerspectives!.map(section =>
          section.claimType !== original!.claimType ? section : {
            ...section, observedFactPaths: ['derivedFacts.tenGods.value.invalid.stem.value'],
          }),
      },
    };
    expect(() => buildQuestionRelatedNatalReading(snapshot,
      question(prompts[found!.axis]), forged)).toThrow('unsourced secondary T8 view');
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(snapshot, forged))
      .toThrow('alternate T8 must reuse only admitted selected facts');
  }, 30_000);

  it('retrieves an original Career T8 axis left outside the first-screen summary', () => {
    const prompts = {
      execution: '직업에서 실행 관점이 궁금해요',
      preparation: '직업에서 학습 관점이 궁금해요',
      responsibility: '직업에서 책임 관점이 궁금해요',
      tension: '직업에서 기준 조율 관점이 궁금해요',
    } as const;
    let found: { month: number; day: number; hour: number; axis: keyof typeof prompts } | undefined;
    for (const month of [1, 3, 5, 7, 9, 11]) {
      if (found) break;
      for (const day of [3, 7, 11, 17, 23]) {
        if (found) break;
        for (const hour of [0, 6, 12, 18]) {
          const chart = calculateCanonicalSajuSnapshot({
            calendarType: 'solar', date: { year: 2024, month, day },
            time: { known: true, hour, minute: 0 },
            sexForTraditionalCalculation: 'unspecified',
          }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
          const report = buildCareerMultifactorResearchReport(chart,
            runInterpretation(chart, careerRegistry, { now: NOW }), careerRegistry);
          const extra = report.additionalVerifiedSections.find(section =>
            Object.hasOwn(prompts, section.axis) &&
            !report.sections.some(selected => selected.axis === section.axis));
          if (extra) {
            found = { month, day, hour, axis: extra.axis as keyof typeof prompts };
            break;
          }
        }
      }
    }
    expect(found).toBeDefined();
    if (!found) return;
    const { snapshot, reports } = run(true, found.day, found.month, found.hour);
    const source = reports.career.additionalVerifiedSections.find(section =>
      section.axis === found!.axis);
    expect(source).toBeDefined();
    const current = buildQuestionRelatedNatalReading(
      snapshot, question(prompts[found.axis]), reports);
    expect(current.status).toBe('related_evidence');
    expect(current.focusAxis).toBe(found.axis);
    expect(current.sections).toHaveLength(1);
    expect(current.sections[0]).toMatchObject({
      title: source!.headline, paragraph: source!.paragraph,
      claimType: source!.claimType, ruleId: source!.ruleId,
      sourceIds: source!.sourceIds, factPaths: source!.calculatedFactPaths,
      evidenceMode: 'preexisting_additional_t8',
    });
    const html = renderNatalFiveDomainMultifactorResearchHtml(snapshot, reports);
    expect(html).toContain('추가로 읽을 수 있는 직업 관점');
    expect(html).toContain(source!.headline);
    expect(renderQuestionRelatedNatalReadingHtml(current))
      .toContain('새로운 T11 답변이나 종합 완료 판정이 아닙니다');
    expect(current.usefulComplete).toBe(false);
    expect(current.mayPublish).toBe(false);
    expect(current.maySell).toBe(false);
    const forged = {
      ...reports,
      career: {
        ...reports.career,
        additionalVerifiedSections: reports.career.additionalVerifiedSections.map(section =>
          section.claimType !== source!.claimType ? section : {
            ...section, calculatedFactPaths: section.calculatedFactPaths.map((_, index) =>
              'derivedFacts.tenGods.value.' + (index % 2 ? 'month' : 'year') +
              '.invalid.value'),
          }),
      },
    };
    expect(() => buildQuestionRelatedNatalReading(snapshot,
      question(prompts[found!.axis]), forged)).toThrow('unverified or repeated Career T8');
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(snapshot, forged))
      .toThrow('Career additional T8 must retain separately verified canonical evidence');
  }, 30_000);

  it('keeps two original Career T8 readings on the same axis when their observed paths differ', () => {
    const { snapshot, reports } = run(true, 3, 1, 12, 1975);
    const source = reports.career;
    const first = source.sections.find(section => section.axis === 'preparation');
    const second = source.additionalVerifiedSections.find(section =>
      section.axis === 'preparation' && section.claimType !== first?.claimType);
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    expect(new Set([...first!.calculatedFactPaths, ...second!.calculatedFactPaths]).size)
      .toBeGreaterThan(first!.calculatedFactPaths.length);
    const selected = buildQuestionRelatedNatalReading(
      snapshot, question('직업에서 준비 관점이 궁금해요'), reports);
    expect(selected.status).toBe('related_evidence');
    expect(selected.focusAxis).toBe('preparation');
    expect(selected.sections.map(section => section.claimType)).toContain(first!.claimType);
    expect(selected.sections.map(section => section.claimType)).toContain(second!.claimType);
    expect(selected.sections.find(section => section.claimType === first!.claimType))
      .toMatchObject({ paragraph: first!.paragraph, factPaths: first!.calculatedFactPaths });
    expect(selected.sections.find(section => section.claimType === second!.claimType))
      .toMatchObject({
        paragraph: second!.paragraph, factPaths: second!.calculatedFactPaths,
        sourceIds: second!.sourceIds, ruleId: second!.ruleId,
        evidenceMode: 'preexisting_additional_t8',
      });
    const html = renderQuestionRelatedNatalReadingHtml(selected);
    expect(html).toContain(first!.paragraph);
    expect(html).toContain(second!.paragraph);
    expect(html).toContain('새로운 T11 답변이나 종합 완료 판정이 아닙니다');
    expect(selected.mayPublish).toBe(false);
    expect(selected.maySell).toBe(false);
  });

  it('rejects forged question-only source paths when a secondary T8 is not admitted by the selected chart', () => {
    const { snapshot, reports } = run(true, 3, 1, 3);
    const original = reports.wealth.overlappingPerspectives!;
    expect(original.length).toBeGreaterThan(0);
    const forged = {
      ...reports,
      wealth: {
        ...reports.wealth,
        overlappingPerspectives: original.map((entry, index) =>
          index !== 0 ? entry : {
            ...entry,
            observedFactPaths: ['derivedFacts.tenGods.value.fake.stem.value'],
          }),
      },
    };
    expect(() => buildQuestionRelatedNatalReading(
      snapshot, question('재물운의 계획 관점'), forged,
    )).toThrow('unsourced secondary T8 view');
  });

  it('never substitutes an unrelated axis when the requested source-owned view is absent', () => {
    const { snapshot, reports } = run();
    const withoutManagement = {
      ...reports,
      wealth: {
        ...reports.wealth,
        sections: reports.wealth.sections.filter(section => section.axis !== 'management'),
      },
    };
    const reading = buildQuestionRelatedNatalReading(
      snapshot, question('재물운의 저축 관리 성향은 어떤가요?'), withoutManagement);
    expect(reading).toMatchObject({
      status: 'insufficient', topic: 'wealth', focusAxis: 'management',
      mayPublish: false, maySell: false,
    });
    expect(reading.sections).toHaveLength(0);
    expect(reading.missing.join(' ')).toContain('다른 관점으로 답하지 않습니다');
  });

  it('reads two requested axes independently in one domain without inventing a combined T11 conclusion', () => {
    const { snapshot, reports } = run();
    const x = buildQuestionRelatedNatalReading(
      snapshot, question('사업의 준비와 실행 관점은 어떤가요?'), reports);
    const expected = reports.business.sections.filter(section =>
      section.axis === 'preparation' || section.axis === 'execution');
    expect(x.status).toBe(expected.length > 0 ? 'related_evidence' : 'insufficient');
    expect(x.topic).toBe('business');
    expect(x.focusAxis).toBeUndefined();
    expect(x.focusAxes).toEqual([
      { axis: 'execution', label: '실행' },
      { axis: 'preparation', label: '준비' },
    ]);
    expect(x.sections.map(section => section.paragraph)).toEqual(
      expected.map(section => section.paragraph));
    expect(x.sections.every(section => section.ruleId && section.sourceIds.length > 0 &&
      section.factPaths.length >= 2)).toBe(true);
    expect(x.caveats.join(' ')).toContain('T11 풀이가 아닙니다');
    expect(x.usefulComplete).toBe(false);
    expect(x.mayPublish).toBe(false);
    expect(x.maySell).toBe(false);
  });

  it('shows a supported axis while explicitly holding a missing companion axis', () => {
    const { snapshot, reports } = run();
    const available = reports.business.sections.find(section =>
      section.axis === 'execution' || section.axis === 'preparation');
    if (!available) return; // The chart has no qualifying requested axis.
    const excludedAxis = available.axis === 'execution' ? 'preparation' : 'execution';
    const partialReports = {
      ...reports,
      business: {
        ...reports.business,
        sections: reports.business.sections.filter(section => section.axis !== excludedAxis),
      },
    };
    const reading = buildQuestionRelatedNatalReading(snapshot,
      question('사업의 준비와 실행 관점은 어떤가요?'), partialReports);
    expect(reading.status).toBe('related_evidence');
    expect(reading.sections.some(section => section.claimType === available.claimType)).toBe(true);
    expect(reading.missing.join(' ')).toContain(excludedAxis === 'preparation' ? '준비 관점' : '실행 관점');
    expect(reading.caveats.join(' ')).toContain('T11 풀이가 아닙니다');
  });

  it('still asks to choose one domain if the question spans distinct natal topics', () => {
    const { snapshot, reports } = run();
    const reading = buildQuestionRelatedNatalReading(snapshot,
      question('사업과 재물의 준비를 함께 알려주세요'), reports);
    expect(reading.status).toBe('ambiguous');
    expect(reading.sections).toHaveLength(0);
  });

  it('preserves ambiguity and refuses unsupported future timing or third-party predictions', () => {
    const { snapshot, reports } = run();
    for (const [text, state] of [
      ['직업운과 재물운이 궁금해요', 'ambiguous'],
      ['올해 재물운은 언제 좋아지나요', 'unsupported'],
      ['배우자 관계는 언제 좋아지나요', 'unsupported'],
      ['부모 성격을 알려주세요', 'unsupported'],
      ['건강 상태가 궁금해요', 'unsupported'],
      ['그냥 어떻게 해야 하나요', 'unsupported'],
    ] as const) {
      const selected = buildQuestionRelatedNatalReading(snapshot, question(text), reports);
      expect(selected.status, text).toBe(state);
      expect(selected.sections, text).toHaveLength(0);
      expect(selected.missing.length, text).toBeGreaterThan(0);
    }
  });

  it('names missing period, two-person, family and spouse evidence without inventing a result', () => {
    const { snapshot, reports } = run();
    for (const { text, requirement } of [
      { text: '올해 재물운은 언제 좋아지나요', requirement: '조회 연도·월' },
      { text: '두 사람 궁합을 알고 싶어요', requirement: '서로 다른 두 사람의 출생정보' },
      { text: '부모 성격을 알려주세요', requirement: '부모·자녀 중 관계 대상' },
      { text: '배우자 관계는 언제 좋아지나요', requirement: '일지 배우자궁의 위치 관찰' },
      { text: '결혼할 수 있을까요', requirement: '결혼·이혼의 실제 발생' },
      { text: '돈은 얼마 벌까요', requirement: '금액·확률·확정적인 결과' },
      { text: '건강 상태가 궁금해요', requirement: '건강 상태 또는 수명' },
    ]) {
      const result = buildQuestionRelatedNatalReading(snapshot, question(text), reports);
      expect(result.status, text).toBe('unsupported');
      expect(result.sections, text).toHaveLength(0);
      expect(result.missing.join(' '), text).toContain(requirement);
      expect(result.mayPublish).toBe(false);
      expect(result.maySell).toBe(false);
      expect(renderQuestionRelatedNatalReadingHtml(result)).toContain(requirement);
    }
  });

  it('never supplies a missing-hour response by borrowing other chart facts', () => {
    const { snapshot, reports } = run(false);
    const x = buildQuestionRelatedNatalReading(snapshot, question('재물운을 알려주세요'), reports);
    expect(x.status).toBe('insufficient');
    expect(x.sections).toHaveLength(0);
    expect(x.missing.join(' ')).toContain('출생시각');
  });

  it('rejects all mixed-chart reports, foreign-domain requests, and escapes question HTML', () => {
    const { snapshot, reports } = run();
    const other = run(true, 11);
    expect(() => buildQuestionRelatedNatalReading(snapshot, question('재물운을 알려주세요'), {
      ...reports, wealth: other.reports.wealth,
    })).toThrow();
    expect(() => buildQuestionRelatedNatalReading(snapshot, {
      ...question('재물운을 알려주세요'), intent: { domain: 'wealth', temporalScope: 'natal' },
    }, reports)).toThrow();
    const html = renderQuestionRelatedNatalReadingHtml(
      buildQuestionRelatedNatalReading(snapshot,
        question('재물운 <script>alert(1)</script>'), reports),
    );
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});
