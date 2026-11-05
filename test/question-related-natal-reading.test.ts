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

function run(known = true, day = 10) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day },
    time: known ? { known: true, hour: 12, minute: 0 } as const : { known: false } as const,
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
