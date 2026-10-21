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
