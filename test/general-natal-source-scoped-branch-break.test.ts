import { describe, expect, it } from 'vitest';
import type { EarthlyBranch } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_NON_ADMITTED_MODERN_BRANCH_BREAK_PAIRS,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_DEFINITION_HASH,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SCOPE,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SOURCE,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION,
  deriveGeneralNatalSourceScopedBranchBreakCandidates,
} from '../src/research/general-natal-source-scoped-branch-break.js';

function pillar(branch: EarthlyBranch) {
  return { branch: { value: branch } } as const;
}

describe('General Natal source-scoped branch-break research substrate', () => {
  it('pins only the four branch-break pairs directly taken by 三命通會 卷三 破煞', () => {
    expect(GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION).toBe('0.1.0-research');
    expect(GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS).toEqual([
      ['묘', '오'],
      ['축', '진'],
      ['자', '유'],
      ['미', '술'],
    ]);
    expect(GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SOURCE.title).toBe(
      '三命通會（四庫全書本）卷三',
    );
    expect(GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SOURCE.locator.section).toBe(
      '總論諸神煞 / 破煞',
    );
    expect(GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  it.each(GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS)(
    'materializes direct pair %s/%s in either input order without losing source scope',
    (first, second) => {
      const forward = deriveGeneralNatalSourceScopedBranchBreakCandidates({
        year: pillar(first),
        month: pillar(second),
      });
      const reverse = deriveGeneralNatalSourceScopedBranchBreakCandidates({
        year: pillar(second),
        month: pillar(first),
      });

      expect(forward).toHaveLength(1);
      expect(reverse).toHaveLength(1);
      expect(forward[0]).toMatchObject({
        kind: 'branch_break',
        pairKey: `${first}|${second}`,
        sourceScope: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SCOPE,
        sourceIds: [GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_SOURCE.sourceId],
      });
      expect(reverse[0]?.pairKey).toBe(`${first}|${second}`);
      expect(forward[0]?.semantics).toEqual({
        structuralMatchOnly: true,
        sourceScopedMembershipOnly: true,
        universalBranchBreakAuthorized: false,
        transformationEstablished: false,
        relationEffectAuthorized: false,
        noClashBreakQualificationEstablished: false,
        consumerMeaningAuthorized: false,
      });
    },
  );

  it.each(GENERAL_NATAL_NON_ADMITTED_MODERN_BRANCH_BREAK_PAIRS)(
    'does not silently expand this source scope to modern-only pair %s/%s',
    (first, second) => {
      expect(
        deriveGeneralNatalSourceScopedBranchBreakCandidates({
          year: pillar(first),
          month: pillar(second),
        }),
      ).toEqual([]);
    },
  );

  it('is deterministic and preserves separate pair-local candidates', () => {
    const input = {
      year: pillar('묘'),
      month: pillar('오'),
      day: pillar('자'),
      hour: pillar('유'),
    } as const;

    const first = deriveGeneralNatalSourceScopedBranchBreakCandidates(input);
    const second = deriveGeneralNatalSourceScopedBranchBreakCandidates(input);

    expect(first).toEqual(second);
    expect(first).toHaveLength(2);
    expect(first.map((candidate) => candidate.pairKey).sort()).toEqual(['묘|오', '자|유']);
    expect(first.every((candidate) => candidate.relationId.includes('scope:'))).toBe(true);
  });

  it('does not convert source-scoped membership into the compound 無衝破 qualification', () => {
    const [candidate] = deriveGeneralNatalSourceScopedBranchBreakCandidates({
      year: pillar('묘'),
      month: pillar('오'),
    });
    if (candidate === undefined) throw new Error('Expected source-scoped branch-break fixture.');

    expect(candidate.semantics.sourceScopedMembershipOnly).toBe(true);
    expect(candidate.semantics.noClashBreakQualificationEstablished).toBe(false);
    expect(candidate.semantics.relationEffectAuthorized).toBe(false);
    expect(candidate.semantics.consumerMeaningAuthorized).toBe(false);
  });

  it('treats absence of a direct pair as no emitted research membership, not as an authorized no-break verdict', () => {
    const candidates = deriveGeneralNatalSourceScopedBranchBreakCandidates({
      year: pillar('자'),
      month: pillar('축'),
    });

    expect(candidates).toEqual([]);
    // Empty research membership is deliberately not a positive NO_CLASH_BREAK fact.
    expect(candidates.some((candidate) => candidate.semantics.noClashBreakQualificationEstablished)).toBe(
      false,
    );
  });
});
