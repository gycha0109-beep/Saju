import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  CAREER_MULTIFACTOR_RULES, CAREER_MULTIFACTOR_PACK,
  createCareerMultifactorResearchRegistry,
} from '../src/research/career-natal-multifactor-candidate.js';
import {
  buildCareerMultifactorResearchReport,
  renderCareerMultifactorResearchHtml,
} from '../src/preview/career-natal-multifactor-report.js';

const registry = createCareerMultifactorResearchRegistry();
const NOW = new Date('2026-10-18T00:00:00.000Z');
function sample(month: number, day: number, hour: number | null = 12) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: hour === null ? { known: false } as const : { known: true, hour, minute: 0 } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function run(month: number, day: number, hour = 12) {
  const chart = sample(month, day, hour);
  const execution = runInterpretation(chart, registry, { now: NOW });
  return { chart, execution, report: buildCareerMultifactorResearchReport(chart, execution, registry) };
}

describe('source-bounded Career two-T5 → T8 → consumer Korean research vertical', () => {
  it('keeps legacy single-Ten-God Career T8 out of the new pack and never enables commerce', () => {
    expect(CAREER_MULTIFACTOR_PACK.status).toBe('research');
    expect(CAREER_MULTIFACTOR_RULES).toHaveLength(10);
    expect(registry.rules.filter(x => x.taxonomy.tier === 'T8')).toHaveLength(10);
    expect(registry.rules.filter(x => x.taxonomy.tier === 'T5')).toHaveLength(10);
    expect(CAREER_MULTIFACTOR_RULES.every(r => r.inputs.length === 2 &&
      r.inputs.every(i => i.source === 'interpretation_claim' && i.cardinality === 'exactly_one') &&
      r.sourceRefs.length === 2 && r.status === 'research')).toBe(true);
    expect(CAREER_MULTIFACTOR_RULES.some(r =>
      r.output.claimType.startsWith('CAREER_NATAL_TEN_GOD_'))).toBe(false);
  });

  it('adds source-bounded wealth/officer responsibility and wealth/resource tension as actual two-input Career meanings', () => {
    for (const [pattern, families, axis] of [
      ['WEALTH_OFFICER', ['wealth', 'officer'], 'responsibility'],
      ['WEALTH_RESOURCE', ['wealth', 'resource'], 'tension'],
    ] as const) {
      const matching = CAREER_MULTIFACTOR_RULES.filter(r =>
        r.output.claimType.includes(`_${pattern}_`));
      expect(matching).toHaveLength(2);
      for (const rule of matching) {
        const channel = rule.output.claimType.endsWith('_VISIBLE_STEMS')
          ? 'VISIBLE_STEMS' : 'BRANCHES';
        expect(rule.inputs.map(i => i.pathOrClaimType)).toEqual(families.map(
          family => `TEN_GOD_${family.toUpperCase()}_${channel}_THEME`,
        ));
        expect((rule.output.value as {axis:string}).axis).toBe(axis);
        expect(rule.sourceRefs).toHaveLength(2);
        expect(rule.output.predicate).toBe('career_multifactor_structure');
        expect(rule.status).toBe('research');
      }
    }
  });

  it('makes meaning-specific differences on REAL birth-calculated charts, not shuffled fixture labels', () => {
    const observed = [];
    for (const month of [2, 3, 4, 5, 6, 7]) {
      for (const day of [3, 7, 11, 17, 23]) {
        const x = run(month, day);
        const signature = x.report.sections.map(s => s.pattern).sort().join('|');
        if (x.report.sections.length > 0) observed.push({ ...x, signature });
      }
    }
    const a = observed[0];
    const b = observed.find(x => x.signature !== a?.signature && x.chart.calculationHash !== a?.chart.calculationHash);
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    if (!a || !b) return;
    expect(a.report.sections.map(s => s.pattern)).not.toEqual(b.report.sections.map(s => s.pattern));
    expect(a.report.sections.map(s => s.headline)).not.toEqual(b.report.sections.map(s => s.headline));
    for (const x of [a, b]) {
      const claims = x.execution.claims.filter(c =>
        c.claimType.startsWith('CAREER_NATAL_MULTIFACTOR_'));
      expect(claims.length).toBeGreaterThan(0);
      expect(claims.every(c => c.upstreamClaimRefs.length === 2 &&
        c.sourceRefs.length === 2)).toBe(true);
      expect(x.report.mayPublish).toBe(false);
      expect(x.report.maySell).toBe(false);
      expect(x.report.usefulComplete).toBe(false);
      for (const section of x.report.sections) {
        expect(section.calculatedPositions.length).toBeGreaterThanOrEqual(2);
        expect(section.calculatedPositions).toHaveLength(section.calculatedFactPaths.length);
        expect(section.calculatedFactPaths.every(path =>
          /^derivedFacts\.tenGods\.value\.(year|month|day|hour)\.(stem|branch)\.value$/u.test(path),
        )).toBe(true);
        expect(section.paragraph).toContain('실제 명식에서 확인한 근거는');
        expect(section.calculatedPositions.every(position =>
          section.paragraph.includes(position))).toBe(true);
      }
      const html = renderCareerMultifactorResearchHtml(x.report);
      expect(html).toContain('<html lang="ko">');
      expect(html).toContain('근거와 출처');
      expect(html).toContain(x.report.sections[0]!.headline);
    }
    const again = run(2, 3);
    const once = run(2, 3);
    expect(again.report).toEqual(once.report);
  }, 30000);

  it('explains the two exact source-bound T5 family positions in real Career Korean paragraphs', () => {
    const familyGods: Readonly<Record<string, readonly string[]>> = {
      peer: ['비견', '겁재'], resource: ['편인', '정인'],
      output: ['식신', '상관'], wealth: ['편재', '정재'],
      officer: ['편관', '정관'],
    };
    const sourceRoles: Readonly<Record<string, string>> = {
      peer: '비겁(자기 기준·동료 관점)',
      resource: '인성(학습·수용)',
      output: '식상(표현·산출)',
      wealth: '재성(현실 자원·교환)',
      officer: '관성(역할·책임 기준)',
    };
    const observedPatterns = new Set<string>();
    for (const [month, day] of [[3, 10], [4, 11]] as const) {
      const { report } = run(month, day);
      for (const section of report.sections) {
        const rule = CAREER_MULTIFACTOR_RULES.find(r => r.ruleId === section.ruleId);
        expect(rule, 'exact registered T8 source pattern').toBeDefined();
        if (!rule) continue;
        const families = (rule.output.value as { families: readonly string[] }).families;
        expect(families).toHaveLength(2);
        expect(section.sourceIds).toHaveLength(2);
        expect(section.upstreamClaimIds).toHaveLength(2);
        for (const family of families) {
          const first = section.calculatedPositions.find(position =>
            familyGods[family]?.some(god => position.endsWith(' ' + god)));
          expect(first, family + ' must be observed on the actual chart').toBeDefined();
          expect(section.paragraph).toContain(`${first}의 ${sourceRoles[family]}`);
        }
        expect(section.paragraph).toContain(
          `같은 ${section.channel === 'visible_stems' ? '천간' : '지지 대표 십신'} 관찰 범위`,
        );
        expect(section.paragraph).toContain(`‘${section.headline}’`);
        observedPatterns.add(section.pattern);
      }
      expect(report.researchOnly).toBe(true);
      expect(report.usefulComplete).toBe(false);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
    }
    expect(observedPatterns.size).toBeGreaterThan(1);
  }, 30000);

  it('closes the missing source-backed axis in the real five-domain demo birth chart, without claiming product authorization', () => {
    const x = run(3, 10, 12);
    // The original report had only PEER_OFFICER (stems) and OUTPUT_WEALTH
    // (branches), and correctly returned partial. The source-backed
    // WEALTH_OFFICER and WEALTH_RESOURCE relationships add new evidence,
    // not merely alternative Korean copy.
    const patterns = new Set(x.report.sections.map(s => s.pattern));
    expect(patterns.has('WEALTH_OFFICER')).toBe(true);
    expect(patterns.has('OUTPUT_WEALTH')).toBe(true);
    // The third selected pattern is chosen by narrative policy from matched
    // source claims; do not hardcode a particular supporting relation.
    expect(patterns.size).toBe(3);
    expect(x.report.state).toBe('complete');
    expect(x.report.sections).toHaveLength(3);
    expect(new Set(x.report.sections.map(s => s.pattern)).size).toBe(3);
    expect(new Set(x.report.sections.map(s => s.axis)).size).toBe(3);
    expect(x.report.sections[0]!.channel).toBe('visible_stems');
    expect(x.report.sections.every(s => s.upstreamClaimIds.length === 2 &&
      s.calculatedFactPaths.length >= 2 && s.paragraph.includes('실제 명식에서 확인한 근거는')))
      .toBe(true);
    expect(x.report.usefulComplete).toBe(false);
    expect(x.report.mayPublish).toBe(false);
    expect(x.report.maySell).toBe(false);
  }, 15000);

  it('never mistakes a single composite Claim for a full minimum useful reading', () => {
    for (const [month, day] of [[3, 10], [4, 11], [5, 7]] as const) {
      const x = run(month, day);
      const primary = x.report.sections[0];
      const supplement = x.report.sections.slice(1);
      if (x.report.state === 'complete') {
        expect(primary?.channel).toBe('visible_stems');
        expect(supplement).toHaveLength(2);
        expect(new Set(x.report.sections.map(c => c.pattern)).size).toBe(3);
        expect(new Set(x.report.sections.map(c => c.axis)).size).toBe(3);
      } else {
        expect(x.report.state).toMatch(/partial|insufficient/);
        expect(x.report.missing.length).toBeGreaterThan(0);
      }
    }
  }, 15000);

  it('counts only independently observed canonical facts for each real-chart Career supporting axis', () => {
    for (const [month, day] of [[3,10],[4,11],[5,7],[6,3],[7,17]] as const) {
      const { report } = run(month, day);
      const primary = report.sections[0];
      if (!primary || primary.channel !== 'visible_stems' || primary.axis === 'tension') {
        expect(report.state).not.toBe('complete');
        continue;
      }
      const used = new Set(primary.calculatedFactPaths);
      for (const support of report.sections.slice(1)) {
        expect(support.axis).not.toBe(primary.axis);
        const independent = support.calculatedFactPaths.filter(path => !used.has(path));
        expect(independent.length, support.claimType + ' must add a real T0 observation').toBeGreaterThan(0);
        expect(independent.every(path =>
          /^derivedFacts\\.tenGods\\.value\\.(year|month|day|hour)\\.(stem|branch)\\.value$/u.test(path),
        )).toBe(true);
        support.calculatedFactPaths.forEach(path => used.add(path));
      }
      if (report.state === 'complete') {
        expect(report.sections).toHaveLength(3);
        expect(new Set(report.sections.map(s => s.axis)).size).toBe(3);
      } else {
        expect(report.state).toBe('partial');
        expect(report.missing.length).toBeGreaterThan(0);
      }
      expect(report.researchOnly).toBe(true);
      expect(report.usefulComplete).toBe(false);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
    }
  }, 30000);

  it('keeps a visible-stem tension without an execution or responsibility core as an honest partial reading', () => {
    let found: ReturnType<typeof run> | undefined;
    outer: for (const month of [2,3,4,5,6,7,8,9,10,11,12]) {
      for (const day of [3,7,11,17,23]) {
        for (const hour of [0,6,12,18]) {
          const candidate = run(month, day, hour);
          const visible = candidate.execution.claims.filter(claim =>
            claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'career' &&
            claim.state === 'active' &&
            (claim.value as { channel?: string }).channel === 'visible_stems');
          if (visible.length === 0 || !visible.every(claim =>
            (claim.value as { axis?: string }).axis === 'tension')) continue;
          found = candidate;
          break outer;
        }
      }
    }
    expect(found, 'a real chart with visible Career tension but no independent visible-stem core').toBeDefined();
    if (!found) return;
    expect(found.report.state).toBe('partial');
    expect(found.report.sections.some(section =>
      section.channel === 'visible_stems' && section.axis === 'tension')).toBe(true);
    expect(found.report.missing.join(' ')).toContain('천간 중심의 독립된 종합 근거가 없어');
    expect(found.report.missing.join(' ')).toContain('부분 풀이만 보여드립니다');
    for (const section of found.report.sections) {
      expect(section.sourceIds.length).toBeGreaterThan(0);
      expect(section.upstreamClaimIds).toHaveLength(2);
      expect(section.calculatedPositions.every(p => section.paragraph.includes(p))).toBe(true);
    }
    expect(found.report.researchOnly).toBe(true);
    expect(found.report.usefulComplete).toBe(false);
    expect(found.report.mayPublish).toBe(false);
    expect(found.report.maySell).toBe(false);
  }, 120000);

  it('shows only genuinely observed branch Career evidence when a visible-stem core is missing, without calling it complete', () => {
    let found: ReturnType<typeof run> | undefined;
    for (const month of [2,3,4,5,6,7,8,9,10,11,12]) {
      for (const day of [3,7,11,17,23]) {
        for (const hour of [0,6,12,18]) {
          const x = run(month,day,hour);
          const claims = x.execution.claims.filter(c => c.taxonomy.tier === 'T8' &&
            c.taxonomy.category === 'career' && c.state === 'active');
          if (claims.some(c => (c.value as {channel?: string}).channel === 'visible_stems') ||
            !claims.some(c => (c.value as {channel?: string}).channel === 'branches')) continue;
          found = x;
          break;
        }
        if(found) break;
      }
      if(found) break;
    }
    expect(found).toBeDefined();
    if(!found) return;
    expect(found.report.state).toBe('partial');
    expect(found.report.sections.length).toBeGreaterThan(0);
    expect(found.report.sections.every(s => s.channel === 'branches')).toBe(true);
    expect(new Set(found.report.sections.map(s => s.axis)).size).toBe(found.report.sections.length);
    expect(found.report.missing.join(' ')).toContain('천간 중심의 독립된 종합 근거가 없어');
    expect(found.report.missing.join(' ')).toContain('완전한 직업 종합풀이');
    const explanation = found.report.missing.join(' ');
    expect(explanation).toMatch(/실행·산출|역할·책임|서로 다른 기준의 조율/u);
    expect(explanation).not.toMatch(/(?:^|[\s·])(?:execution|responsibility|tension)(?:[\s·]|$)/u);
    for(const section of found.report.sections) {
      expect(section.calculatedPositions.every(position => section.paragraph.includes(position))).toBe(true);
      expect(section.paragraph).toMatch(/비겁\(|인성\(|식상\(|재성\(|관성\(/u);
      expect(section.sourceIds.length).toBeGreaterThan(0);
      expect(section.upstreamClaimIds).toHaveLength(2);
    }
    expect(found.report.researchOnly).toBe(true);
    expect(found.report.usefulComplete).toBe(false);
    expect(found.report.mayPublish).toBe(false);
    expect(found.report.maySell).toBe(false);
  }, 120000);

  it('actually renders personalized partial reasons and unknown-hour hold in readable Korean HTML', () => {
    let partial: ReturnType<typeof run> | undefined;
    for(const month of [2,3,4,5,6,7,8,9]) {
      for(const day of [3,7,11,17,23]) {
        const candidate = run(month, day);
        if(candidate.report.state === 'partial' && candidate.report.missing.length > 0) {
          partial = candidate;
          break;
        }
      }
      if(partial) break;
    }
    expect(partial, 'a real birth-calculated Career partial report').toBeDefined();
    if(!partial) return;
    const html = renderCareerMultifactorResearchHtml(partial.report);
    expect(html).toContain('해석 상태: 부분 풀이 · 원국 종합 근거 부족');
    expect(html).toContain('<h2>아직 설명할 수 없는 부분</h2>');
    for(const reason of partial.report.missing) expect(html).toContain(reason);
    expect(html).not.toContain('최소 유효 풀이: partial');
    expect(html).toContain('연구용 내부 미리보기 · 출판 및 판매 불가');

    const unknownChart = sample(3, 10, null);
    const unknownExecution = runInterpretation(unknownChart, registry, { now: NOW });
    const unknownReport = buildCareerMultifactorResearchReport(unknownChart, unknownExecution, registry);
    const unknownHtml = renderCareerMultifactorResearchHtml(unknownReport);
    expect(unknownHtml).toContain('해석 상태: 풀이 보류 · 출생정보 또는 근거 부족');
    expect(unknownHtml).toContain('출생시각 미상');
    expect(unknownHtml).toContain('아직 설명할 수 없는 부분');
    expect(unknownHtml).not.toContain('<section><h2>');

    const complete = run(3, 10).report;
    expect(complete.state).toBe('complete');
    const completeHtml = renderCareerMultifactorResearchHtml(complete);
    expect(completeHtml).toContain('연구 풀이 최소 근거 충족 · 제품 품질 검증 전');
    expect(completeHtml).not.toContain('아직 설명할 수 없는 부분');
    expect(completeHtml).toContain('출판 및 판매 불가');

    const escaped = renderCareerMultifactorResearchHtml({
      ...partial.report, missing: ['<script>alert(1)</script>'],
    });
    expect(escaped).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(escaped).not.toContain('<script>');
  }, 60000);

  it('fails closed when birth hour is unknown rather than inventing four-pillar synthesis', () => {
    const chart = sample(3, 10, null);
    const execution = runInterpretation(chart, registry, { now: NOW });
    const report = buildCareerMultifactorResearchReport(chart, execution, registry);
    expect(report.state).toBe('insufficient');
    expect(report.sections).toHaveLength(0);
    expect(report.missing).toContain('출생시각 미상');
  });

  it('rejects a changed T8 pattern and swapped upstream T5 family instead of mislabeling Career meaning', () => {
    let original: ReturnType<typeof run> | undefined;
    for (const month of [2, 3, 4, 5, 6, 7]) {
      for (const day of [3, 7, 11, 17, 23]) {
        const candidate = run(month, day);
        if (candidate.report.sections.length > 0) {
          original = candidate;
          break;
        }
      }
      if (original) break;
    }
    expect(original).toBeDefined();
    if (!original) return;
    const target = original.execution.claims.find(c =>
      c.claimType === original!.report.sections[0]!.claimType);
    expect(target).toBeDefined();
    if (!target) return;
    const forgedMeaning = {
      ...original.execution,
      claims: original.execution.claims.map(c => c.claimId === target.claimId
        ? { ...c, value: { ...(c.value as Record<string, unknown>),
          pattern: 'UNRELATED_CAREER_PATTERN' } }
        : c),
    };
    expect(() => buildCareerMultifactorResearchReport(
      original!.chart, forgedMeaning, registry,
    )).toThrow();

    // A substituted upstream claim may still be a genuine, active T5 from
    // the same canonical chart. It does NOT satisfy a different rule input.
    const firstUpstream = target.upstreamClaimRefs[0];
    const substituted = {
      ...original.execution,
      claims: original.execution.claims.map(c => c.claimId === firstUpstream
        ? { ...c, claimType: 'TEN_GOD_UNKNOWN_' +
          String((target.value as Record<string, unknown>).channel).toUpperCase() + '_THEME' }
        : c),
    };
    expect(() => buildCareerMultifactorResearchReport(
      original!.chart, substituted, registry,
    )).toThrow();

    expect(original.report.sections[0]!.paragraph).toContain(
      original.report.sections[0]!.calculatedPositions[0]!,
    );
  }, 30000);

  it('refuses unrelated registry and cross-person outputs', () => {
    const first = run(3, 10);
    const next = sample(4, 15);
    expect(() => buildCareerMultifactorResearchReport(next, first.execution, registry)).toThrow();
  });
});
