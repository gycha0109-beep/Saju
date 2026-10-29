import { describe, expect, it } from 'vitest';
import {
  buildSourceNatalMeaningSignatures,
  type SourceIssuedNatalMeaning,
} from '../src/preview/natal-source-meaning-signature.js';

const yearStem = 'derivedFacts.tenGods.value.year.stem.value';
const monthStem = 'derivedFacts.tenGods.value.month.stem.value';
const dayBranch = 'derivedFacts.tenGods.value.day.branch.value';
const hourBranch = 'derivedFacts.tenGods.value.hour.branch.value';

function issued(
  channel: 'branches' | 'visible_stems',
  factPaths: string[],
  override: Partial<SourceIssuedNatalMeaning> = {},
): SourceIssuedNatalMeaning {
  const suffix = channel === 'branches' ? 'BRANCHES' : 'VISIBLE_STEMS';
  const claimType = 'GENERAL_NATAL_MULTIFACTOR_EXPRESSION_' + suffix;
  return {
    claimType,
    axis: 'expression',
    pattern: 'output-and-resource',
    channel,
    ruleId: 'RULE-' + claimType,
    methodologyId: 'METH-EXPRESSION-APPROVED',
    sourceIds: ['SRC-B', 'SRC-A'],
    upstreamClaimIds: ['T5-A', 'T5-B'],
    factPaths,
    paragraph: '이미 확인된 T8 표현 해석의 원문입니다.',
    ...override,
  };
}

const signature = (...sections: SourceIssuedNatalMeaning[]) =>
  buildSourceNatalMeaningSignatures([{ domain: 'general', sections }]);

describe('S6 exact source-owned meaning vs evidence role vs display wording', () => {
  it('does not call a location/channel change a newly authorized meaning', () => {
    const stems = issued('visible_stems', [yearStem, monthStem]);
    const branches = issued('branches', [dayBranch, hourBranch], {
      paragraph: '같은 Claim 의미를 다른 관측 위치에서 확인했습니다.',
    });
    const left = signature(stems);
    const right = signature(branches);
    expect(left.claimMeaning).toEqual(right.claimMeaning);
    expect(left.evidenceRoles).not.toEqual(right.evidenceRoles);
    expect(left.wording).not.toEqual(right.wording);
  });

  it('recognizes source, rule-linked pattern and methodology changes as different claim semantics', () => {
    const base = signature(issued('branches', [dayBranch, hourBranch]));
    for (const override of [
      { sourceIds: ['SRC-C'] },
      { methodologyId: 'METH-NEW' },
      { pattern: 'different-supported-pattern' },
      { axis: 'responsibility' },
    ]) {
      expect(signature(issued('branches', [dayBranch, hourBranch], override)).claimMeaning)
        .not.toEqual(base.claimMeaning);
    }
  });

  it('ignores source ordering and repeated source identifiers', () => {
    const base = signature(issued('branches', [dayBranch, hourBranch]));
    const reordered = signature(issued('branches', [hourBranch, dayBranch], {
      sourceIds: ['SRC-A', 'SRC-B', 'SRC-A'],
      upstreamClaimIds: ['OTHER-T5-A', 'OTHER-T5-B'],
    }));
    expect(reordered.claimMeaning).toEqual(base.claimMeaning);
    expect(reordered.evidenceRoles).toEqual(base.evidenceRoles);
  });

  it('does not mint a semantic difference from only presentation copy', () => {
    const a = signature(issued('branches', [dayBranch, hourBranch]));
    const b = signature(issued('branches', [dayBranch, hourBranch], {
      paragraph: '한국어 표현만 변경됐고 새로운 Claim은 발행하지 않았습니다.',
    }));
    expect(a.claimMeaning).toEqual(b.claimMeaning);
    expect(a.evidenceRoles).toEqual(b.evidenceRoles);
    expect(a.wording).not.toEqual(b.wording);
  });

  it('requires same-domain issued rule provenance and actual Canonical T5 paths', () => {
    const base = issued('branches', [dayBranch, hourBranch]);
    for (const altered of [
      { ...base, ruleId: 'RULE-UNRELATED' },
      { ...base, sourceIds: [] },
      { ...base, upstreamClaimIds: ['ONE'] },
      { ...base, factPaths: [dayBranch, 'pillars.hour.branch'] },
      { ...base, paragraph: ' ' },
    ]) {
      expect(() => signature(altered)).toThrow(/source-issued T8/u);
    }
  });

  it('treats absent issued claims as no demonstrated meaning', () => {
    expect(signature()).toEqual({ claimMeaning: [], evidenceRoles: [], wording: [] });
  });
});
