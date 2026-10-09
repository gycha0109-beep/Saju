import { readFileSync } from 'node:fs';
import { getBranchTenGod, getTenGod } from 'manseryeok';
import { describe, expect, test } from 'vitest';
import {
  getHiddenStemMembership,
  HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
} from '../src/calculation/hidden-stems.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { R060_AUTHORITY } from '../src/research/general-natal-hidden-stem-interaction-boundary.js';
import { R123_AUTHORITY } from '../src/research/general-natal-hidden-stem-qualitative-depth-evidence.js';
import { GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY } from '../src/research/general-natal-visible-stem-bijie-support-member-count-authority.js';
import {
  SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY,
  SAJU_R26_BIJIE_SCOPE_DECISION,
  SAJU_R26_NEXT_REQUIRED_PRIMITIVE,
} from '../src/research/saju-r26-bijie-branch-hidden-scope-audit.js';
import { isSharedNatalSuppliedSingleTenGodSourceFactRef } from '../src/research/shared-natal-supplied-single-ten-god-fact-binding.js';

describe('SAJU-R26 separate branch/hidden Bijie scope audit', () => {
  test('keeps R25 closed over three visible stems and introduces no widened count', () => {
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.visibleStemSlots).toEqual(['year', 'month', 'hour']);
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.visibleStemScope).toBe(
      GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.semanticScope,
    );
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.visibleStemScopeWidened).toBe(false);
    expect(GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.valueDomain).toEqual([
      0, 1, 2, 3,
    ]);
    expect(SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY.wholeChartBijieCountAuthorized).toBe(
      false,
    );
  });

  test('demonstrates representative branch Ten-God cannot stand for every hidden member', () => {
    const hidden = getHiddenStemMembership('진');
    expect(hidden).toEqual(['을', '무', '계']);
    expect(getBranchTenGod('갑', '진')).toBe('편재');
    expect(hidden.map((stem) => getTenGod('갑', stem))).toEqual(['겁재', '편재', '정인']);
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.representativeBranchTenGodIsCompleteHiddenCollection).toBe(
      false,
    );
    expect(
      SAJU_R26_BIJIE_SCOPE_DECISION.representativeBranchTenGodAddedAlongsideItsHiddenMembers,
    ).toBe(false);
  });

  test('storage index zero is not the branch representative or a support priority', () => {
    const first = getHiddenStemMembership('해')[0];
    if (first === undefined) throw new Error('expected hidden membership');
    expect(getTenGod('갑', first)).toBe('비견');
    expect(getBranchTenGod('갑', '해')).toBe('편인');
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.canonicalArrayIndexIsSemanticRank).toBe(false);
    expect(R123_AUTHORITY.canonicalStorageOrderSemanticRankAuthorized).toBe(false);
  });

  test('proposed scope includes day branch while excluding only the visible day self', () => {
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.proposedHiddenOccurrenceSlots).toEqual([
      'year',
      'month',
      'day',
      'hour',
    ]);
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.dayBranchIncludedInProposedScope).toBe(true);
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.dayVisibleSelfIncluded).toBe(false);
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.occurrenceIdentity).toBe(
      'pillar_slot_and_hidden_stem_value',
    );
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.sameStemAcrossDifferentSlotsCollapsed).toBe(false);
    expect(SAJU_R26_NEXT_REQUIRED_PRIMITIVE.mustRejectDuplicateMembersWithinSlot).toBe(true);
  });

  test('existing single-fact binding cannot be repurposed for branch or hidden facts', () => {
    expect(isSharedNatalSuppliedSingleTenGodSourceFactRef('derivedFacts.tenGods.year.stem')).toBe(
      true,
    );
    for (const slot of ['year', 'month', 'day', 'hour']) {
      expect(
        isSharedNatalSuppliedSingleTenGodSourceFactRef(`derivedFacts.tenGods.${slot}.branch`),
      ).toBe(false);
      expect(
        isSharedNatalSuppliedSingleTenGodSourceFactRef(`derivedFacts.hiddenStems.${slot}`),
      ).toBe(false);
    }
    expect(SAJU_R26_NEXT_REQUIRED_PRIMITIVE.hiddenSupportAuthorityReusableFromVisibleR23).toBe(
      false,
    );
  });

  test('requires exact snapshot, canonical parity and fail-closed scenario handling before mapping', () => {
    expect(SAJU_R26_NEXT_REQUIRED_PRIMITIVE).toMatchObject({
      primitiveId: 'SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCES',
      mappingIsCalculationOnly: true,
      mustBindExactSnapshotIdAndHash: true,
      mustVerifyHiddenMembershipAgainstSourcePillars: true,
      mustVerifyDayMasterAgainstDayPillar: true,
      mustFailClosedOnMissingUnresolvedOrInconsistentInputs: true,
      unmaterializedScenarios: 'unavailable',
      missingHiddenDataMeans: 'unavailable_not_empty_or_negative',
      implementationAuthorizedByThisAudit: false,
    });
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    expect(pkg.dependencies.manseryeok).toBe('2.0.0');
  });

  test('does not turn hidden membership into activation, root, support or a strength classifier', () => {
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.hiddenMembershipImpliesActiveSupport).toBe(false);
    expect(SAJU_R26_BIJIE_SCOPE_DECISION.hiddenMembershipImpliesTonggen).toBe(false);
    expect(R060_AUTHORITY.genericInteractionActivationAuthorized).toBe(false);
    expect(R123_AUTHORITY.finalQiangRuoClassifierAuthorized).toBe(false);
    for (const [key, value] of Object.entries(SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY)) {
      if (key.endsWith('Authorized')) expect(value, key).toBe(false);
    }
    expect(SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY.remainingBlockers).toMatchObject({
      visibleStemSupportMemberCount: 'CLOSED_RESEARCH_ONLY',
      hiddenStemTenGodOccurrenceProjection: 'MISSING',
      hiddenBijieSupportAuthority: 'NOT_AUTHORIZED',
      completeBijieSupportCollection: 'MISSING',
      productionStructuralChain: 'NOT_PROVEN',
    });
  });

  test('binds the current substrate and reproduces the audit definition hash', () => {
    const { definitionHash, authorityBoundary, ...payload } =
      SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY;
    expect(authorityBoundary).toContain('scope audit');
    expect(definitionHash).toBe(deterministicContentHash(payload));
    expect(
      SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY.sourceBindings.hiddenMembershipContentHash,
    ).toBe(HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH);
    expect(
      SAJU_R26_BIJIE_BRANCH_HIDDEN_SCOPE_AUDIT_AUTHORITY.sourceBindings.r25DefinitionHash,
    ).toBe(GENERAL_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT_AUTHORITY.definitionHash);
  });
});
