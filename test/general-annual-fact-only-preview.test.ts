import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  buildGeneralAnnualFourteenRuleDecision,
  previewGeneralAnnualCalculatedFacts,
} from '../src/research/general-annual-fact-only-preview.js';

function snapshot(timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day: 9 },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-10-10T12:00:00Z') },
  );
}

function annual(year: number, time: string): ReadingRequest {
  return {
    requestId: 'research-annual-fact-only',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: time,
      resolution: 'relative_current',
    },
  };
}

describe('SA-7D fourteen-rule research decision and factual annual successor', () => {
  test('ties all 14 current rule identities to the upstream evidence without admitting their modern meanings', () => {
    const review = buildGeneralAnnualFourteenRuleDecision();
    expect(review.decisions).toHaveLength(14);
    expect(new Set(review.decisions.map((decision) => decision.semanticKey)).size).toBe(14);
    expect(new Set(review.decisions.map((decision) => decision.ruleId)).size).toBe(14);
    expect(review.decisions.filter((decision) => decision.kind === 'modern_ten_god_theme'))
      .toHaveLength(10);
    expect(review.decisions.filter((decision) => decision.kind === 'annual_natal_branch_clash_tension'))
      .toHaveLength(4);
    expect(review.decisions.every((decision) =>
      decision.originalMeaningSupport === 'INSUFFICIENT' &&
      decision.currentMeaningAdmitted === false &&
      decision.mayDeliver === false,
    )).toBe(true);
    expect(review.summary).toEqual({
      currentRuleCount: 14,
      modernMeaningAdmittedCount: 0,
      primaryWitnessedIdentityExamples: 2,
      unsupportedModernThemes: 10,
      unsupportedModernTensions: 4,
    });
    expect(review.authority).toMatchObject({
      calculationFactsOnly: true,
      semanticAuthorityGranted: false,
      mayGenerateAnnualInterpretation: false,
      mayRenderOfficialReading: false,
      mayCallModel: false,
      productionAuthorized: false,
      commerceAuthorized: false,
      monthlyAuthorized: false,
    });
    const { decisionHash, ...material } = review;
    expect(decisionHash).toBe(deterministicContentHash(material));
    expect(buildGeneralAnnualFourteenRuleDecision().decisionHash).toBe(decisionHash);
  });

  test('proposes only two exact identity replacements and four relation-fact successors, never a modern theme', () => {
    const decisions = buildGeneralAnnualFourteenRuleDecision().decisions;
    expect(decisions.flatMap((decision) =>
      decision.kind === 'modern_ten_god_theme' &&
      decision.proposedResearchHandling === 'REPLACE_WITH_RELATION_IDENTITY_ONLY'
        ? [decision.tenGod]
        : [],
    )).toEqual(['편재', '편관']);
    expect(decisions.filter((decision) =>
      decision.kind === 'modern_ten_god_theme' &&
      decision.proposedResearchHandling === 'HOLD',
    )).toHaveLength(8);
    expect(decisions.filter((decision) =>
      decision.kind === 'annual_natal_branch_clash_tension' &&
      decision.proposedResearchHandling === 'REPLACE_WITH_COMPUTED_RELATION_ONLY',
    )).toHaveLength(4);
  });

  test('produces a useful fact-only result and changes at 00:00 KST on 2026 LiChun', () => {
    const natal = snapshot();
    const before = previewGeneralAnnualCalculatedFacts(
      natal, annual(2026, '2026-02-03T14:59:59.000Z'),
    );
    const after = previewGeneralAnnualCalculatedFacts(
      natal, annual(2026, '2026-02-03T15:00:00.000Z'),
    );
    expect(before).toMatchObject({
      state: 'research_fact_preview_only',
      targetYear: 2026,
      effectiveYear: 2025,
      annualPillar: { stem: '을', branch: '사' },
    });
    expect(after).toMatchObject({
      state: 'research_fact_preview_only',
      targetYear: 2026,
      effectiveYear: 2026,
      annualPillar: { stem: '병', branch: '오' },
      constraints: {
        mayGenerateAnnualInterpretation: false,
        mayCallModel: false,
        productionAuthorized: false,
      },
    });
    if (after.state !== 'research_fact_preview_only') throw new Error('expected research facts');
    expect(after.displayRows.map((row) => row.label)).toEqual([
      '기준 연도', '적용 연주', '연간 천간·일간 관계(계산)', '원국 지지와의 충(계산)',
    ]);
    expect(after.displayRows[1]?.value).toBe('병오');
    expect(after.tenGodRelation.annualStem).toBe('병');
    expect(after.tenGodRelation.exactPrimaryWitnessMatchesTheseStems).toBe(false);
    expect(JSON.stringify(after)).not.toMatch(
      /ANNUAL_(PEER|OUTPUT|WEALTH|OFFICER|RESOURCE|BRANCH_CLASH)|annual_theme_activation|annual_branch_clash_tension/,
    );
    expect(previewGeneralAnnualCalculatedFacts(natal, annual(2026, '2026-02-03T15:00:00.000Z')))
      .toEqual(after);
  });

  test('makes branch-clash relation a fact but never predicts tension, separation, or severity', () => {
    const natal = snapshot();
    if (natal.pillars.day.status !== 'resolved') throw new Error('day fixture not resolved');
    const withClash: CanonicalSajuSnapshot = {
      ...natal,
      pillars: {
        ...natal.pillars,
        day: resolved({
          ...natal.pillars.day.value,
          branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
        }),
      },
    };
    const result = previewGeneralAnnualCalculatedFacts(
      withClash, annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(result).toMatchObject({
      state: 'research_fact_preview_only',
      branchClashFacts: expect.arrayContaining([
        { natalPillar: 'day', natalBranch: '자', annualBranch: '오', relation: 'clash' },
      ]),
    });
    expect(JSON.stringify(result)).not.toMatch(/accident|separation|loss|strength|tension|충격|이별|손실/iu);
  });

  test('does not manufacture an unresolved birth-hour clash', () => {
    const result = previewGeneralAnnualCalculatedFacts(
      snapshot(false), annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(result.state).toBe('research_fact_preview_only');
    if (result.state !== 'research_fact_preview_only') return;
    expect(result.branchClashFacts.some((clash) => clash.natalPillar === 'hour')).toBe(false);
    expect(result.omittedUnresolvedPillars).toContain('hour');
  });

  test('does not generalize the two classical examples to a random natal stem or a month', () => {
    const result = previewGeneralAnnualCalculatedFacts(
      snapshot(), annual(2027, '2027-02-04T01:00:00.000Z'),
    );
    expect(result).toMatchObject({
      state: 'research_fact_preview_only',
      effectiveYear: 2027,
      annualPillar: { stem: '정', branch: '미' },
      tenGodRelation: { exactPrimaryWitnessMatchesTheseStems: false },
    });
    const monthly: ReadingRequest = {
      ...annual(2026, '2026-06-15T12:00:00.000Z'),
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z', resolution: 'relative_current',
      },
    };
    expect(previewGeneralAnnualCalculatedFacts(snapshot(), monthly)).toEqual({
      state: 'unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED', productionAuthorized: false,
    });
  });

  test('fails closed on unregistered early-year source, invalid instant, and natal day-master ambiguity', () => {
    expect(previewGeneralAnnualCalculatedFacts(
      snapshot(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      state: 'unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE', productionAuthorized: false,
    });
    expect(previewGeneralAnnualCalculatedFacts(
      snapshot(), annual(2026, '2026-02-30T12:00:00.000Z'),
    )).toMatchObject({ state: 'unavailable', reasonCode: 'ANNUAL_REFERENCE_INVALID' });
    const natal = snapshot();
    const unresolved: CanonicalSajuSnapshot = {
      ...natal,
      derivedFacts: {
        ...natal.derivedFacts,
        dayMaster: { status: 'unavailable', reasonCode: 'test-unknown-day-master' },
      },
    };
    expect(previewGeneralAnnualCalculatedFacts(
      unresolved, annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toEqual({
      state: 'unavailable', reasonCode: 'NATAL_DAY_MASTER_UNRESOLVED', productionAuthorized: false,
    });
  });
});
