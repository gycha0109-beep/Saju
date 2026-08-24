import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION,
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
  GENERAL_NATAL_CONCLUSION_PACK,
  GENERAL_NATAL_CONCLUSION_RULES,
  GENERAL_NATAL_CONCLUSION_SOURCE,
  createGeneralNatalConclusionCandidateRegistry,
} from '../src/research/general-natal-conclusion-synthesis-candidate.js';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

function fixture(): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-08-24T05:00:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(FIVE_FAMILY_TEN_GODS) },
  };
}

describe('general natal conclusion synthesis research candidate', () => {
  it('remains explicitly research-only and unreviewed', () => {
    expect(GENERAL_NATAL_CONCLUSION_CANDIDATE_VERSION).toBe('0.2.0-research');
    expect(GENERAL_NATAL_CONCLUSION_PACK.status).toBe('research');
    expect(GENERAL_NATAL_CONCLUSION_METHODOLOGY.status).toBe('research');
    expect(GENERAL_NATAL_CONCLUSION_SOURCE.provenanceTier).toBe('cross_reference');
    expect(GENERAL_NATAL_CONCLUSION_SOURCE.rights?.reusePolicy).toBe('paraphrase_only');
    expect(GENERAL_NATAL_CONCLUSION_FAMILY_RULES).toHaveLength(5);
    expect(GENERAL_NATAL_CONCLUSION_RULES).toHaveLength(10);
    expect(
      [...GENERAL_NATAL_CONCLUSION_FAMILY_RULES, ...GENERAL_NATAL_CONCLUSION_RULES].every(
        (rule) => rule.status === 'research' && rule.quality.reviewerStatus === 'unreviewed',
      ),
    ).toBe(true);
  });

  it('turns all five observed families into explicit conclusion claims', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const execution = runInterpretation(fixture(), registry, {
      now: new Date('2026-08-24T05:01:00.000Z'),
    });

    const familyClaims = execution.claims.filter(
      (claim) => claim.predicate === 'ten_god_family_presence',
    );
    expect(familyClaims.map((claim) => claim.claimType).sort()).toEqual(
      [
        'TEN_GOD_FAMILY_PEER_PRESENT',
        'TEN_GOD_FAMILY_RESOURCE_PRESENT',
        'TEN_GOD_FAMILY_OUTPUT_PRESENT',
        'TEN_GOD_FAMILY_WEALTH_PRESENT',
        'TEN_GOD_FAMILY_OFFICER_PRESENT',
      ].sort(),
    );

    const conclusions = execution.claims.filter(
      (claim) => claim.predicate === 'consumer_conclusion',
    );
    expect(conclusions).toHaveLength(10);
    expect(conclusions.some((claim) => claim.claimType === 'GENERAL_NATAL_CONCLUSION_CORE_FIVE_FAMILY_CYCLE')).toBe(true);
    expect(
      new Set(
        conclusions.map((claim) => (claim.value as { conclusionKind: string }).conclusionKind),
      ),
    ).toEqual(new Set(['core', 'strength', 'tension', 'work', 'money', 'relationship']));
  });

  it('binds every conclusion to the family claims it used', () => {
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const execution = runInterpretation(fixture(), registry);
    const familyIds = new Set(
      execution.claims
        .filter((claim) => claim.predicate === 'ten_god_family_presence')
        .map((claim) => claim.claimId),
    );

    for (const claim of execution.claims.filter(
      (candidate) => candidate.predicate === 'consumer_conclusion',
    )) {
      expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(2);
      expect(claim.upstreamClaimRefs.every((ref) => familyIds.has(ref))).toBe(true);
    }
  });

  it('puts conclusion claims into general natal evidence without opening career intent', () => {
    const snapshot = fixture();
    const registry = createGeneralNatalConclusionCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    const general = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'conclusion-general-natal',
        intent: { domain: 'general', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'general-natal-conclusion-v2' },
    );
    expect(general.selection.coverageState).toBe('complete');
    expect(
      general.evidence?.bundle.claims.some((claim) => claim.predicate === 'consumer_conclusion'),
    ).toBe(true);

    const career = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-remains-closed',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'general-natal-conclusion-v2' },
    );
    expect(career.selection.coverageState).toBe('insufficient_evidence');
  });

  it('does not convert conclusions into deterministic fortune or future claims', () => {
    const execution = runInterpretation(fixture(), createGeneralNatalConclusionCandidateRegistry());
    const conclusions = execution.claims.filter(
      (claim) => claim.predicate === 'consumer_conclusion',
    );
    const encoded = JSON.stringify(conclusions);

    for (const forbidden of [
      'wealth_level":"high',
      'career_success":true',
      'spouse_outcome',
      'health_outcome',
      'future_event',
      'lucky_score',
      'strong_day_master',
      'weak_day_master',
    ]) {
      expect(encoded).not.toContain(forbidden);
    }
    expect(
      conclusions.every(
        (claim) =>
          (claim.value as { futureTimingAuthorized?: boolean }).futureTimingAuthorized === false &&
          (claim.value as { numericScoringAuthorized?: boolean }).numericScoringAuthorized === false,
      ),
    ).toBe(true);
  });

  it('still fails closed at production composition', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createGeneralNatalConclusionCandidateRegistry(),
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
