import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  WEALTH_NATAL_MULTIFACTOR_NARRATIVES,
  WEALTH_NATAL_MULTIFACTOR_RULES,
  WEALTH_NATAL_MULTIFACTOR_PACK,
  createWealthNatalMultifactorRegistry,
} from '../src/research/wealth-natal-multifactor-candidate.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';

const registry = createWealthNatalMultifactorRegistry();
const NOW = new Date('2026-10-19T00:00:00.000Z');
function sample(month: number, day: number, known = true, hour = 12) {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month, day },
      time: known ? ({ known: true, hour, minute: 0 } as const) : ({ known: false } as const),
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}
function run(month: number, day: number, known = true, hour = 12) {
  const snapshot = sample(month, day, known, hour);
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  return {
    snapshot,
    execution,
    report: buildWealthNatalMultifactorReport(snapshot, execution, registry),
  };
}
describe('actual-source Wealth natal T5→T8→Korean five-domain report', () => {
  it('is Wealth-only, research-only, and every T8 has 2/3 exact T5 inputs', () => {
    expect(registry.pack.packId).toBe(WEALTH_NATAL_MULTIFACTOR_PACK.packId);
    expect(WEALTH_NATAL_MULTIFACTOR_RULES).toHaveLength(27);
    expect(registry.rules.filter((r) => r.taxonomy.tier === 'T5')).toHaveLength(15);
    expect(registry.rules.filter((r) => r.taxonomy.tier === 'T8')).toHaveLength(27);
    expect(registry.rules.filter((r) => r.taxonomy.subcategory === 'self_baseline')).toHaveLength(
      0,
    );
    for (const rule of WEALTH_NATAL_MULTIFACTOR_RULES) {
      expect(rule.taxonomy.category).toBe('wealth');
      expect(rule.inputs.length).toBeGreaterThanOrEqual(2);
      expect(
        rule.inputs.every(
          (i) =>
            i.source === 'interpretation_claim' && i.cardinality === 'exactly_one' && i.required,
        ),
      ).toBe(true);
      expect(rule.sourceRefs).toHaveLength(
        (rule.output.value as { channel?: string }).channel === 'hidden_stems' ? 3 : 2,
      );
      expect(rule.status).toBe('research');
    }
    const resourceCore = WEALTH_NATAL_MULTIFACTOR_RULES.filter(
      (rule) => (rule.output.value as { pattern?: string }).pattern === 'WEALTH_OFFICER_RESOURCE',
    );
    expect(resourceCore).toHaveLength(3);
    for (const rule of resourceCore) {
      const families = rule.inputs.map((input) => input.pathOrClaimType);
      expect(families.some((type) => type.includes('_WEALTH_'))).toBe(true);
      expect(families.some((type) => type.includes('_OFFICER_'))).toBe(true);
      expect(families.some((type) => type.includes('_RESOURCE_'))).toBe(true);
      expect(rule.output.emphasis).toBe('major');
      expect(rule.sourceRefs).toHaveLength(
        (rule.output.value as { channel?: string }).channel === 'hidden_stems' ? 3 : 2,
      );
    }
    const indirect = WEALTH_NATAL_MULTIFACTOR_RULES.filter(
      (rule) => (rule.output.value as { axis?: string }).axis === 'context',
    );
    expect(indirect).toHaveLength(6);
    expect(
      indirect.every(
        (rule) =>
          (rule.output.value as { directWealthReadingAuthorized?: boolean })
            .directWealthReadingAuthorized === false,
      ),
    ).toBe(true);
    expect(inspectMyeonghwaProductionComposition({ registry }).status).toBe('blocked');
  });

  it('produces real chart-specific Wealth meanings, with two or three matching upstream Claims', () => {
    const data = [];
    for (const month of [2, 3, 4, 5, 6, 7])
      for (const day of [3, 7, 11, 17, 23]) {
        const x = run(month, day);
        if (x.report.sections.length) {
          data.push({
            ...x,
            signature: x.report.sections
              .map((s) => s.pattern)
              .sort()
              .join('|'),
          });
        }
      }
    const first = data[0];
    const second = data.find(
      (x) =>
        x.signature !== first?.signature &&
        x.snapshot.calculationHash !== first?.snapshot.calculationHash,
    );
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    if (!first || !second) return;
    expect(first.report.sections.map((x) => x.headline)).not.toEqual(
      second.report.sections.map((x) => x.headline),
    );
    for (const x of [first, second]) {
      if (x.report.sections.some((section) => section.axis !== 'context')) {
        expect(x.report.sections.every((section) => section.axis !== 'context')).toBe(true);
      }
      for (const s of x.report.sections) {
        expect(s.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions.length).toBeGreaterThanOrEqual(2);
        expect(s.observedPositions).toHaveLength(s.observedFactPaths.length);
        const profile = WEALTH_NATAL_MULTIFACTOR_NARRATIVES.find(
          (candidate) => candidate.claimType === s.claimType,
        );
        const koreanTemplates = profile?.templates?.filter((template) => template.language === 'ko');
        const headline = koreanTemplates?.find((template) => template.templateKey === 'headline');
        const summary = koreanTemplates?.find((template) => template.templateKey === 'summary');
        expect(headline?.text).toBe(s.headline);
        expect(summary?.text).toBeTruthy();
        expect(s.paragraph.startsWith(`${summary?.text} 이 명식에서 확인한 위치는 `)).toBe(true);
        expect(s.paragraph).toMatch(/비겁\(|인성\(|식상\(|재성\(|관성\(/u);
        expect(s.observedPositions.every((p) => s.paragraph.includes(p))).toBe(true);
        expect(
          s.observedFactPaths.every((path) =>
            /^((derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value)|(derivedFacts\.hiddenStems\.(year|month|day|hour)\.value\.[0-2]))$/u.test(
              path,
            ),
          ),
        ).toBe(true);
      }
      expect(x.report.mayPublish).toBe(false);
      expect(x.report.maySell).toBe(false);
      expect(x.report.usefulComplete).toBe(false);
    }
    expect(run(3, 10).report).toEqual(run(3, 10).report);
  }, 30000);

  it('requires distinct actual Wealth interpretation axes for MUR complete', () => {
    const x = run(3, 10);
    if (x.report.state === 'complete') {
      expect(x.report.sections).toHaveLength(3);
      expect(new Set(x.report.sections.map((s) => s.axis)).size).toBe(3);
      expect(new Set(x.report.sections.map((s) => s.pattern)).size).toBe(3);
    } else {
      expect(x.report.missing.length).toBeGreaterThan(0);
      expect(x.report.state).toMatch(/partial|insufficient/);
    }
  });

  it('uses the same calculated chart while giving Wealth a different interpretation from General', () => {
    const wealth = run(3, 10);
    const generalRegistry = createGeneralNatalMultifactorRegistry();
    const generalExecution = runInterpretation(wealth.snapshot, generalRegistry, { now: NOW });
    const general = buildGeneralNatalMultifactorReport(
      wealth.snapshot,
      generalExecution,
      generalRegistry,
    );
    expect(wealth.report.calculationHash).toBe(general.calculationHash);
    expect(wealth.report.sections.length).toBeGreaterThan(0);
    expect(
      wealth.report.sections.every((section) =>
        section.claimType.startsWith('WEALTH_NATAL_MULTIFACTOR_'),
      ),
    ).toBe(true);
    expect(wealth.report.sections.map((section) => section.headline)).not.toEqual(
      general.sections.map((section) => section.headline),
    );
  });

  it('keeps legacy visible-stem and branch T8 tension-only behavior when hidden-stem claims are excluded', () => {
    let found = false;
    outer: for (const hour of [0, 6, 12, 18]) {
      for (const month of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        for (const day of [3, 7, 11, 17, 23]) {
          const { snapshot, execution } = run(month, day, true, hour);
          const legacyClaims = execution.claims.filter(
            (c) =>
              !c.claimType.includes('_HIDDEN_STEMS_') &&
              (c.value as { channel?: string } | undefined)?.channel !== 'hidden_stems',
          );
          const ids = new Set(legacyClaims.map((c) => c.claimId));
          const legacyExecution = {
            ...execution,
            claims: legacyClaims,
            claimRelations: execution.claimRelations.filter(
              (r) => ids.has(r.fromClaimId) && ids.has(r.toClaimId),
            ),
          };
          const active = legacyClaims.filter(
            (c) =>
              c.taxonomy.tier === 'T8' &&
              c.taxonomy.category === 'wealth' &&
              c.predicate === 'wealth_multifactor_structure' &&
              c.state === 'active',
          );
          const axes = active.map((c) => (c.value as { axis?: string }).axis);
          if (
            axes.length === 0 ||
            axes.some((axis) =>
              ['core', 'creation', 'management', 'planning'].includes(axis ?? ''),
            ) ||
            !axes.includes('tension')
          )
            continue;
          const report = buildWealthNatalMultifactorReport(snapshot, legacyExecution, registry);
          found = true;
          expect(report.state).toBe('partial');
          expect(report.sections).toHaveLength(1);
          expect(report.sections[0]?.axis).toBe('tension');
          expect(report.sections[0]?.observedPositions.length).toBeGreaterThanOrEqual(2);
          expect(report.sections[0]?.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
          expect(report.sections[0]?.sourceIds.length).toBeGreaterThan(0);
          expect(report.researchOnly).toBe(true);
          expect(report.usefulComplete).toBe(false);
          expect(report.mayPublish).toBe(false);
          expect(report.maySell).toBe(false);
          break outer;
        }
      }
    }
    expect(found).toBe(true);
  }, 60000);

  it('observes hidden-stem Ten-God families as a distinct, source-backed channel with exact positions', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1967, month: 8, day: 22 },
        time: { known: true, hour: 10, minute: 28 },
        sexForTraditionalCalculation: 'male',
      },
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
      { now: NOW },
    );
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    const hiddenClaims = execution.claims.filter(
      (c) => c.taxonomy.tier === 'T5' && c.claimType.endsWith('_HIDDEN_STEMS_THEME'),
    );
    const hiddenSections = report.sections.filter((s) => s.channel === 'hidden_stems');
    expect(hiddenClaims.length).toBeGreaterThan(0);
    expect(hiddenSections.length).toBeGreaterThan(0);
    for (const section of hiddenSections) {
      expect(section.observedPositions.length).toBeGreaterThanOrEqual(2);
      expect(section.observedPositions).toHaveLength(section.observedFactPaths.length);
      expect(section.observedPositions.every((p) => p.includes('\uC9C0\uC7A5\uAC04'))).toBe(true);
      expect(
        section.observedFactPaths.every((path) =>
          /^derivedFacts\.hiddenStems\.(year|month|day|hour)\.value\.[0-2]$/u.test(path),
        ),
      ).toBe(true);
      expect(section.sourceIds).toContain('SRC-GENERAL-NATAL-YUANHAI-HIDDEN-STEMS-WIKISOURCE');
    }
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(inspectMyeonghwaProductionComposition({ registry }).status).toBe('blocked');
  });

  it('keeps year/month/day hidden-stem observations when birth hour is unknown, without inventing a Wealth T8', () => {
    const result = run(3, 10, false);
    const report = result.report;
    expect(result.snapshot.derivedFacts.dayMaster.status).toBe('resolved');
    expect(result.snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    const hidden = result.snapshot.derivedFacts.hiddenStems;
    expect(hidden?.year.status).toBe('resolved');
    expect(hidden?.month.status).toBe('resolved');
    expect(hidden?.day.status).toBe('resolved');
    expect(hidden?.hour.status).toBe('unavailable');
    const hiddenT5 = result.execution.claims.filter(
      (c) => c.taxonomy.tier === 'T5' && c.claimType.endsWith('_HIDDEN_STEMS_THEME'),
    );
    expect(hiddenT5.length).toBeGreaterThan(0);
    expect(hiddenT5.every((c) => c.factRefs.includes('derivedFacts.dayMaster'))).toBe(true);
    expect(hiddenT5.every((c) => !c.factRefs.includes('derivedFacts.tenGods'))).toBe(true);
    expect(
      hiddenT5.every((c) =>
        ['year', 'month', 'day'].every((slot) =>
          c.factRefs.includes('derivedFacts.hiddenStems.' + slot),
        ),
      ),
    ).toBe(true);
    const firstHiddenEvaluation = result.execution.evaluations.find((evaluation) =>
      hiddenT5[0]!.ruleRefs.some((ref) => ref.evaluationId === evaluation.evaluationId),
    );
    expect(
      firstHiddenEvaluation?.inputRefs.find(
        (ref) => ref.idOrPath === 'derivedFacts.hiddenStems.hour',
      )?.observedValue,
    ).toMatchObject({
      status: 'unavailable',
    });
    expect(report.state).toBe('partial');
    expect(report.sections.length).toBeGreaterThan(0);
    expect(report.sections.every((s) => s.channel === 'hidden_stems' && s.axis === 'context')).toBe(
      true,
    );
    expect(
      report.sections.every((s) => s.observedFactPaths.every((path) => !path.includes('.hour.'))),
    ).toBe(true);
    expect(report.missing.join(' ')).toContain('\uC9C0\uC7A5\uAC04');
    expect(report.missing.join(' ')).toContain('\uC7AC\uC131 \uACC4\uC5F4');
    expect(report.missing.join(' ')).toContain('\uC2DC\uC8FC \uBBF8\uD655\uC815');
    expect(report.introduction).toContain(
      '\uCD9C\uC0DD\uC2DC\uAC01\uC774 \uC5C6\uC5B4\uB3C4 \uD655\uC778 \uAC00\uB2A5\uD55C',
    );
    expect(report.introduction).toContain(
      '\uC2DC\uC8FC\uAC00 \uD544\uC694\uD55C \uAD00\uCE21\uC740 \uC81C\uC678',
    );
    for (const [slot, label] of [
      ['year', '\uC5F0\uC8FC'],
      ['month', '\uC6D4\uC8FC'],
      ['day', '\uC77C\uC8FC'],
    ] as const) {
      const fact = result.snapshot.pillars[slot];
      const expected =
        fact.status === 'resolved'
          ? fact.value.stem.value + fact.value.branch.value
          : '\uBBF8\uD655\uC815';
      expect(report.introduction).toContain(label + ' ' + expected);
    }
    expect(report.usefulComplete).toBe(false);
    expect(report.researchOnly).toBe(true);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('can form a source-bound Wealth T8 from resolved year/month/day hidden stems without the hour', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1967, month: 8, day: 22 },
        time: { known: false },
        sexForTraditionalCalculation: 'male',
      },
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
      { now: NOW },
    );
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    const hiddenWealth = execution.claims.find(
      (c) => c.state === 'active' && c.claimType === 'TEN_GOD_WEALTH_HIDDEN_STEMS_THEME',
    );
    expect(snapshot.derivedFacts.dayMaster.status).toBe('resolved');
    expect(snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(snapshot.derivedFacts.hiddenStems?.hour.status).toBe('unavailable');
    expect(hiddenWealth).toBeDefined();
    expect(report.sections.length).toBeGreaterThan(0);
    expect(report.sections.every((s) => s.channel === 'hidden_stems')).toBe(true);
    expect(report.sections.some((s) => s.axis === 'creation' || s.axis === 'tension')).toBe(true);
    expect(
      report.sections.every((s) => s.observedFactPaths.every((path) => !path.includes('.hour.'))),
    ).toBe(true);
    expect(report.state).toBe('partial');
    expect(report.missing.join(' ')).toContain('\uC2DC\uC8FC \uBBF8\uD655\uC815');
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('changes only real Canonical unknown-hour observations for another birth date', () => {
    const first = run(3, 10, false);
    const second = run(4, 12, false);
    const repeat = run(3, 10, false);
    expect(repeat.report).toEqual(first.report);
    expect(first.report.sections.length).toBeGreaterThan(0);
    expect(first.report.introduction).not.toBe(second.report.introduction);
    for (const report of [first.report, second.report]) {
      expect(report.sections.every((s) => s.channel === 'hidden_stems')).toBe(true);
      expect(
        report.sections.every((s) => s.observedFactPaths.every((path) => !path.includes('.hour.'))),
      ).toBe(true);
      expect(report.missing.join(' ')).toContain('\uC2DC\uC8FC \uBBF8\uD655\uC815');
    }
    expect(run(3, 10, true).report.sections.length).toBeGreaterThan(0);
  });

  it('rejects cross-chart and tampered Wealth claim meaning', () => {
    const x = run(3, 10);
    const other = sample(4, 12);
    expect(() => buildWealthNatalMultifactorReport(other, x.execution, registry)).toThrow();
    const first = x.execution.claims.find(
      (c) => c.taxonomy.category === 'wealth' && c.predicate === 'wealth_multifactor_structure',
    );
    expect(first).toBeDefined();
    if (!first) return;
    const forged = {
      ...x.execution,
      claims: x.execution.claims.map((c) =>
        c.claimId === first.claimId
          ? { ...c, value: { ...(c.value as Record<string, unknown>), pattern: 'INVENTED' } }
          : c,
      ),
    };
    expect(() => buildWealthNatalMultifactorReport(x.snapshot, forged, registry)).toThrow();
  });
});
