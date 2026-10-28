import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
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
  renderNatalFiveDomainMultifactorResearchHtml,
  type NatalFiveDomainMultifactorReports,
} from '../src/preview/natal-five-domain-multifactor-reader.js';
import { buildThreeTemporalMenusBirthReading } from '../src/preview/three-temporal-menus-birth-reading.js';
import { buildThreeRelationshipMenusBirthReading } from '../src/preview/three-relationship-menus-birth-reading.js';
import {
  buildQuestionRelatedNatalReading,
  renderQuestionRelatedNatalReadingHtml,
} from '../src/preview/question-related-natal-reading.js';
import { normalizeConsumerReadingRequest } from '../src/reading/consumer-reading-request-adapter.js';

const REFERENCE = '2026-09-03T13:00:00.000Z';
const NOW = new Date(REFERENCE);
const SELF: BirthInput = {
  calendarType: 'solar', date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'male',
};
const OTHER: BirthInput = {
  calendarType: 'solar', date: { year: 1998, month: 8, day: 18 },
  time: { known: true, hour: 11, minute: 30 },
  sexForTraditionalCalculation: 'female',
};
const REGISTRIES = {
  general: createGeneralNatalMultifactorRegistry(),
  career: createCareerMultifactorResearchRegistry(),
  wealth: createWealthNatalMultifactorRegistry(),
  business: createBusinessNatalMultifactorRegistry(),
  relationship: createRelationshipNatalMultifactorRegistry(),
};
type NatalKey = keyof NatalFiveDomainMultifactorReports;
const NATAL_MENUS: readonly NatalKey[] =
  ['general', 'career', 'wealth', 'business', 'relationship'];

function natal(birth: BirthInput) {
  const snapshot = calculateCanonicalSajuSnapshot(
    birth, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW },
  );
  const reports: NatalFiveDomainMultifactorReports = {
    general: buildGeneralNatalMultifactorReport(snapshot,
      runInterpretation(snapshot, REGISTRIES.general, { now: NOW }),
      REGISTRIES.general),
    career: buildCareerMultifactorResearchReport(snapshot,
      runInterpretation(snapshot, REGISTRIES.career, { now: NOW }),
      REGISTRIES.career),
    wealth: buildWealthNatalMultifactorReport(snapshot,
      runInterpretation(snapshot, REGISTRIES.wealth, { now: NOW }),
      REGISTRIES.wealth),
    business: buildBusinessNatalMultifactorReport(snapshot,
      runInterpretation(snapshot, REGISTRIES.business, { now: NOW }),
      REGISTRIES.business),
    relationship: buildRelationshipNatalMultifactorReport(snapshot,
      runInterpretation(snapshot, REGISTRIES.relationship, { now: NOW }),
      REGISTRIES.relationship),
  };
  return { snapshot, reports, html: renderNatalFiveDomainMultifactorResearchHtml(
    snapshot, reports) };
}

function twelve(birth: BirthInput, partner: BirthInput, ref: string) {
  const personal = natal(birth);
  const temporal = buildThreeTemporalMenusBirthReading(birth, {
    requestId: 'audit-temporal', targetYear: 2026, targetMonth: 9,
    referenceDateTime: ref,
  });
  const relations = buildThreeRelationshipMenusBirthReading(birth, partner, {
    requestId: 'audit-relations',
    subjectPersonRef: 'self', targetPersonRef: 'other',
    referenceDateTime: ref, targetBirthUseAuthorized: true,
  });
  const normalization = normalizeConsumerReadingRequest({
    requestId: 'audit-question', text: '질문: 직업에서 준비하는 제 성향은 어떤가요?',
  });
  expect(normalization.state).toBe('resolved');
  if (!normalization.request || normalization.request.intent.domain !== 'question_specific') {
    throw new Error('The 12-menu question must preserve T11-specific routing');
  }
  const question = buildQuestionRelatedNatalReading(
    personal.snapshot, normalization.request, personal.reports,
  );
  const questionHtml = renderQuestionRelatedNatalReadingHtml(question);
  const inspectedMenus = [
    ...NATAL_MENUS,
    'life_stage', 'annual', 'monthly',
    'family', 'spouse', 'compatibility', 'question',
  ];
  return {
    ...personal, temporal, relations, question, questionHtml,
    inspectedMenus,
  };
}

describe('12 equal menus: actual chart-specific Korean meaning and explicit gaps', () => {
  it('executes all twelve actual menu reader paths without claiming unsupported T9/T10/T11 meaning', () => {
    const one = twelve(SELF, OTHER, REFERENCE);
    expect(new Set(one.inspectedMenus).size).toBe(12);
    for (const key of NATAL_MENUS) {
      const report = one.reports[key];
      expect(report.researchOnly).toBe(true);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
      expect(report.usefulComplete).toBe(false);
      if (report.sections.length === 0) {
        expect(report.state).toBe('insufficient');
        expect(report.missing.length).toBeGreaterThan(0);
      } else {
        expect(report.sections.every(section =>
          section.paragraph.trim().length > 0 &&
          section.sourceIds.length >= 2 &&
          section.upstreamClaimIds.length >= 2 &&
          ('calculatedFactPaths' in section
            ? section.calculatedFactPaths.length >= 2
            : section.observedFactPaths.length >= 2))).toBe(true);
        expect(one.html).toContain(report.sections[0]!.headline);
      }
      expect(one.html).toContain('id="domain-' + key + '"');
    }
    expect(one.temporal.html).toContain('<section id="annual">');
    expect(one.temporal.html).toContain('<section id="monthly">');
    expect(one.temporal.html).toContain('<section id="life-stage">');
    expect(one.temporal.lifeStage.interpretationStatus)
      .toBe('source_authority_not_established');
    expect(one.temporal.mayGrantOfficialAuthority).toBe(false);
    expect(one.temporal.annualMonthly.monthlyMenu.authority.mayCallOfficial)
      .toBe(false);
    expect(one.temporal.annualMonthly.monthlyMenu.referenceFocus?.state)
      .toBe('in_period');
    expect(one.relations.html).toContain('<section id="family">');
    expect(one.relations.html).toContain('<section id="spouse">');
    expect(one.relations.html).toContain('<section id="compatibility">');
    expect(one.relations.family.parents.availability).toBe('unavailable');
    expect(one.relations.family.children.availability).toBe('unavailable');
    expect(one.relations.spouse.report.mayPredictMarriage).toBe(false);
    expect(one.relations.compatibility.availability).toBe('unavailable');
    expect(one.relations.compatibility.mayClaimInterpersonalMeaning).toBe(false);
    expect(one.relations.mayGrantOfficialAuthority).toBe(false);
    expect(one.relations.compatibility.personalRelationship.subject.personRef)
      .toBe('self');
    expect(one.relations.compatibility.personalRelationship.target.personRef)
      .toBe('other');
    expect(one.questionHtml).toContain('T11 풀이가 아닙니다');
    expect(one.question.usefulComplete).toBe(false);
    expect(one.question.maySell).toBe(false);
    expect(one.question.status === 'related_evidence' ||
      one.question.status === 'insufficient').toBe(true);
  }, 30_000);

  it('distinguishes real source-selected natal semantics while keeping held menus unapproved', () => {
    const first = twelve(SELF, OTHER, REFERENCE);
    const second = twelve(OTHER, SELF, REFERENCE);
    const changedDomains = NATAL_MENUS.filter(key => {
      const a = first.reports[key].sections.map(s =>
        s.claimType + '|' + s.headline).join(' / ');
      const b = second.reports[key].sections.map(s =>
        s.claimType + '|' + s.headline).join(' / ');
      return a !== b;
    });
    // These are actual source-owned T8 kinds and Korean meanings, not
    // the birth date, source hash or superficial display positions.
    expect(changedDomains.length).toBeGreaterThanOrEqual(2);
    expect(first.relations.compatibility.report.subject.snapshotId)
      .toBe(second.relations.compatibility.report.target.snapshotId);
    expect(first.relations.compatibility.report.target.snapshotId)
      .toBe(second.relations.compatibility.report.subject.snapshotId);
    expect(first.relations.compatibility.report.readingStatus)
      .toBe('insufficient_interpersonal_meaning_authority');
    expect(second.relations.compatibility.report.readingStatus)
      .toBe('insufficient_interpersonal_meaning_authority');
    expect(first.relations.spouse.report.dayPillarFactPath)
      .toBe(second.relations.spouse.report.dayPillarFactPath);
    expect(first.relations.spouse.report.observation)
      .not.toBe(second.relations.spouse.report.observation);
    expect(first.temporal.lifeStage.report.snapshotId)
      .not.toBe(second.temporal.lifeStage.report.snapshotId);
    // Different Dayun calculations are NOT evidence of distinct Dayun
    // interpretation rules or an approved stage-specific answer.
    expect(first.temporal.lifeStage.interpretationStatus)
      .toBe('source_authority_not_established');
    expect(second.temporal.lifeStage.interpretationStatus)
      .toBe('source_authority_not_established');
    expect(second.question.mayPublish).toBe(false);
    expect(second.question.maySell).toBe(false);
  }, 30_000);

  it('replays all twelve actual outputs exactly for the same input and reference instant', () => {
    const one = twelve(SELF, OTHER, REFERENCE);
    const again = twelve(SELF, OTHER, REFERENCE);
    expect(again.html).toBe(one.html);
    expect(again.temporal.html).toBe(one.temporal.html);
    expect(again.relations.html).toBe(one.relations.html);
    expect(again.questionHtml).toBe(one.questionHtml);
  }, 30_000);
});
