import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { deriveStructuralRelationCandidates } from '../src/calculation/structural-relations.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_NATAL_SOURCE_CONDITION_RESOLVER_FRONTIER_VERSION,
  buildGeneralNatalSourceConditionResolverFrontier,
} from '../src/research/general-natal-source-condition-resolver-frontier.js';

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-09-07T00:00:00.000Z') },
  );
}

describe('General Natal source-condition resolver frontier', () => {
  it('keeps all four target source-condition facts unavailable even for a fully known birth time', () => {
    const current = snapshot();
    const report = buildGeneralNatalSourceConditionResolverFrontier(current);

    expect(report.reportVersion).toBe(GENERAL_NATAL_SOURCE_CONDITION_RESOLVER_FRONTIER_VERSION);
    expect(report.status).toBe('blocked_authority_gap');
    expect(report.canonicalResolverAuthorized).toBe(false);
    expect(report.sourceConditionFactsEmitted).toBe(false);
    expect(report.conditions).toHaveLength(4);
    expect(Object.values(report.facts).every((fact) => fact.status === 'unavailable')).toBe(true);
    expect(report.facts.pianCaiGe).toEqual({
      status: 'unavailable',
      reasonCode: 'general-natal-pian-cai-ge-resolver-authority-missing',
    });
    expect(report.facts.yinShouGeApplicable).toEqual({
      status: 'unavailable',
      reasonCode: 'general-natal-yin-shou-ge-applicable-resolver-authority-missing',
    });
    expect(report.facts.shangGuanShangJin).toEqual({
      status: 'unavailable',
      reasonCode: 'general-natal-shang-guan-shang-jin-resolver-authority-missing',
    });
    expect(report.facts.shiShenGeQualified).toEqual({
      status: 'unavailable',
      reasonCode: 'general-natal-shi-shen-ge-qualified-resolver-authority-missing',
    });
  });

  it('records available canonical substrate without promoting it into source-condition authority', () => {
    const current = snapshot();
    const report = buildGeneralNatalSourceConditionResolverFrontier(current);
    const statusByPath = Object.fromEntries(
      report.observedCanonicalSubstrate.map((observation) => [observation.path, observation.status]),
    );

    expect(statusByPath['derivedFacts.dayMaster']).toBe('resolved');
    expect(statusByPath['derivedFacts.tenGods']).toBe('resolved');
    expect(statusByPath['derivedFacts.hiddenStems.month']).toBe('resolved');
    expect(statusByPath['derivedFacts.structuralRelations']).toBe('resolved');
    expect(report.sourceConditionFactsEmitted).toBe(false);
    expect(Object.values(report.facts).every((fact) => fact.status === 'unavailable')).toBe(true);
  });

  it('pins the exact missing authority required before a canonical resolver may exist', () => {
    const report = buildGeneralNatalSourceConditionResolverFrontier(snapshot());

    expect(report.globalAuthorityGaps).toEqual([
      'GEJU_CANDIDATE_DERIVATION_AUTHORITY_MISSING',
      'GEJU_ESTABLISHMENT_PREDICATE_AUTHORITY_MISSING',
      'SOURCE_APPLICABLE_CONTEXT_PREDICATE_AUTHORITY_MISSING',
      'SHANG_GUAN_SHANG_JIN_QUALIFICATION_AUTHORITY_MISSING',
      'DAY_MASTER_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING',
      'FOOD_GOD_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING',
      'NO_CLASH_BREAK_QUALIFICATION_AUTHORITY_MISSING',
      'BRANCH_BREAK_RELATION_NOT_MODELED',
    ]);

    const shiShen = report.conditions.find(
      (condition) => condition.conditionKey === 'shi_shen_ge_flourishing_no_clash_break',
    );
    expect(shiShen?.authorityGaps).toContain('DAY_MASTER_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING');
    expect(shiShen?.authorityGaps).toContain('FOOD_GOD_FLOURISHING_CLASSIFICATION_AUTHORITY_MISSING');
    expect(shiShen?.authorityGaps).toContain('NO_CLASH_BREAK_QUALIFICATION_AUTHORITY_MISSING');
    expect(shiShen?.authorityGaps).toContain('BRANCH_BREAK_RELATION_NOT_MODELED');
  });

  it('does not reinterpret the current structural-relation vocabulary as a branch-break verdict', () => {
    const current = snapshot();
    if (
      current.pillars.year.status !== 'resolved' ||
      current.pillars.month.status !== 'resolved' ||
      current.pillars.day.status !== 'resolved' ||
      current.pillars.hour.status !== 'resolved'
    ) {
      throw new Error('Expected fully resolved fixture pillars.');
    }

    const relations = deriveStructuralRelationCandidates({
      year: current.pillars.year.value,
      month: current.pillars.month.value,
      day: current.pillars.day.value,
      hour: current.pillars.hour.value,
    });
    const kinds = new Set(relations.map((relation) => String(relation.kind)));

    expect(kinds.has('branch_break')).toBe(false);
    expect(
      relations.every(
        (relation) =>
          relation.semantics.structuralMatchOnly === true &&
          relation.semantics.transformationEstablished === false,
      ),
    ).toBe(true);
  });

  it('is deterministic for the same governed snapshot and emits no resolved fixture shortcut', () => {
    const current = snapshot();
    const first = buildGeneralNatalSourceConditionResolverFrontier(current);
    const second = buildGeneralNatalSourceConditionResolverFrontier(current);

    expect(first.reportId).toBe(second.reportId);
    expect(first).toEqual(second);
    expect(JSON.stringify(first)).not.toContain('patternEstablished":true');
    expect(JSON.stringify(first)).not.toContain('qualificationSatisfied":true');
    expect(JSON.stringify(first)).not.toContain('dayMasterFlourishing":true');
    expect(JSON.stringify(first)).not.toContain('foodGodFlourishing":true');
    expect(JSON.stringify(first)).not.toContain('noClashBreak":true');
  });
});
