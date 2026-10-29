import { describe, expect, it } from 'vitest';
import {
  collectExistingNatalT8Views,
  type OriginalNatalT8Section,
} from '../src/preview/natal-source-owned-context-views.js';

function section(key: string, axis: string, paths: string[]): OriginalNatalT8Section {
  return {
    claimType: 'GENERAL_NATAL_MULTIFACTOR_' + key,
    axis,
    headline: key + ' 승인된 한국어 제목',
    paragraph: '이 원국에서 확인된 근거는 ' + key + '입니다.',
    ruleId: 'RULE-GENERAL_NATAL_MULTIFACTOR_' + key,
    sourceIds: ['source-a', 'source-b'],
    upstreamClaimIds: ['t5-a', 't5-b'],
    observedFactPaths: paths,
    observedPositions: paths.map((path, i) => '관측 ' + i + ': ' + path),
  };
}
const a = 'derivedFacts.tenGods.value.year.branch.value';
const b = 'derivedFacts.tenGods.value.month.branch.value';
const c = 'derivedFacts.tenGods.value.day.branch.value';
const d = 'derivedFacts.tenGods.value.hour.branch.value';

describe('previously issued T8 meanings reused only in the correct individual natal research', () => {
  it('preserves exact independently issued overlapping T8 paragraphs without increasing MUR support', () => {
    const selected = section('CORE_BRANCHES', 'core', [a, b, c]);
    const extra = section('EXPRESSION_BRANCHES', 'expression', [a, b]);
    const report = {
      state: 'partial' as const,
      sections: [selected],
      overlappingPerspectives: [{
        ...extra, overlapsSelectedFactPaths: [a, b],
      }],
    };
    const views = collectExistingNatalT8Views('general', report);
    expect(views.map(view => view.section.claimType))
      .toEqual([selected.claimType, extra.claimType]);
    expect(views[0]?.evidenceMode).toBeUndefined();
    expect(views[1]?.evidenceMode).toBe('reused_calculated_paths');
    expect(views[1]?.section.paragraph).toBe(extra.paragraph);
    expect(report.state).toBe('partial');
  });

  it('retains a displaced original Claim only once without counting it as a support', () => {
    const selected = [
      section('EXPRESSION_BRANCHES', 'expression', [a, b]),
      section('BOUNDARY_BRANCHES', 'boundaries', [c, d]),
      section('COORDINATION_BRANCHES', 'coordination', [b, d]),
    ];
    const original = section('CORE_BRANCHES', 'core', [a, b, c, d]);
    const views = collectExistingNatalT8Views('general', {
      state: 'complete', sections: selected, displacedOriginalCore: original,
    });
    expect(views).toHaveLength(4);
    expect(views.at(-1)?.evidenceMode).toBe('original_source_core');
    expect(views.at(-1)?.section.paragraph).toBe(original.paragraph);
  });

  it('rejects a forged, cross-domain or duplicated extra interpretation', () => {
    const original = section('CORE_BRANCHES', 'core', [a, b]);
    const extra = section('EXPRESSION_BRANCHES', 'expression', [a, b]);
    const partial = {
      state: 'partial' as const,
      sections: [original],
      overlappingPerspectives: [{
        ...extra, overlapsSelectedFactPaths: [a, b],
      }],
    };
    expect(() => collectExistingNatalT8Views('relationship', partial))
      .toThrow('original distinct source-issued Claim');
    expect(() => collectExistingNatalT8Views('general', {
      ...partial,
      overlappingPerspectives: [{
        ...extra, observedFactPaths: [a, d], overlapsSelectedFactPaths: [a, d],
      }],
    })).toThrow('reuse only already selected');
    expect(() => collectExistingNatalT8Views('general', {
      ...partial,
      overlappingPerspectives: [{
        ...extra, claimType: original.claimType,
      }],
    })).toThrow('original distinct source-issued Claim');
    expect(() => collectExistingNatalT8Views('general', {
      ...partial,
      overlappingPerspectives: [{
        ...extra, ruleId: 'RULE-FORGED',
      }],
    })).toThrow('original distinct source-issued Claim');
  });
});
