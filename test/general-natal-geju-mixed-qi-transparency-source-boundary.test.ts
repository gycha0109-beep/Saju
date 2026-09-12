import { describe, expect, test } from 'vitest';
import type { EarthlyBranch } from '../src/contracts/calculation.js';
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_MIXED_QI_MONTH_BRANCHES,
  GENERAL_NATAL_GEJU_MIXED_QI_MONTH_SCOPE_SOURCE_REFERENCE,
  GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_BOUNDARY_VERSION,
  buildGeneralNatalGejuMixedQiTransparencySourceBoundary,
  isGeneralNatalGejuMixedQiMonthBranch,
} from '../src/research/general-natal-geju-mixed-qi-transparency-source-boundary.js';

const ALL_BRANCHES = [
  '자',
  '축',
  '인',
  '묘',
  '진',
  '사',
  '오',
  '미',
  '신',
  '유',
  '술',
  '해',
] as const satisfies readonly EarthlyBranch[];

const MIXED_QI_BRANCHES = new Set<EarthlyBranch>(['진', '술', '축', '미']);

describe('General Natal Gyeokguk mixed-qi transparency source boundary', () => {
  test('authorizes only the explicitly cross-referenced four-tomb month-branch source scope', () => {
    expect(GENERAL_NATAL_GEJU_MIXED_QI_MONTH_SCOPE_SOURCE_REFERENCE.locator?.anchor).toBe(
      '辰戌丑未四個月',
    );
    expect(GENERAL_NATAL_GEJU_MIXED_QI_MONTH_BRANCHES).toEqual(['진', '술', '축', '미']);

    for (const branch of ALL_BRANCHES) {
      expect(isGeneralNatalGejuMixedQiMonthBranch(branch)).toBe(MIXED_QI_BRANCHES.has(branch));
    }
  });

  test('records source-scoped transparency and plurality rules without canonical selection authority', () => {
    const report = buildGeneralNatalGejuMixedQiTransparencySourceBoundary('진');

    expect(report.reportVersion).toBe(
      GENERAL_NATAL_GEJU_MIXED_QI_TRANSPARENCY_SOURCE_BOUNDARY_VERSION,
    );
    expect(report.status).toBe('selected_source_scope_applies_selection_predicate_unresolved');
    expect(report.mixedQiMonthScopePredicateAuthorized).toBe(true);
    expect(report.mixedQiMonthScopeApplies).toBe(true);
    expect(report.sourceTransparencyDefinitionObserved).toBe(true);
    expect(report.sourceSingleTransparencySingleUseObserved).toBe(true);
    expect(report.sourcePluralTransparencyPluralUseObserved).toBe(true);
    expect(report.sourceTransparencyAndBranchMeetingJointUseObserved).toBe(true);
    expect(report.sourceIds).toContain(
      GENERAL_NATAL_GEJU_MIXED_QI_MONTH_SCOPE_SOURCE_REFERENCE.sourceId,
    );

    expect(report.canonicalPillarSlotAdmissibilityAuthorized).toBe(false);
    expect(report.exactMatchToTransparencySelectionAuthorized).toBe(false);
    expect(report.transparencySelectionPredicateAuthorized).toBe(false);
    expect(report.branchMeetingSelectionEffectAuthorized).toBe(false);
    expect(report.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(report.candidateDerivationAuthorized).toBe(false);
    expect(report.establishmentPredicateAuthorized).toBe(false);
    expect(report.candidateFactsEmitted).toBe(false);
    expect(report.establishmentFactsEmitted).toBe(false);
    expect(report.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
  });

  test('does not turn a month outside the selected mixed-qi passage into a negative universal rule', () => {
    const report = buildGeneralNatalGejuMixedQiTransparencySourceBoundary('인');

    expect(report.status).toBe('outside_selected_source_scope');
    expect(report.mixedQiMonthScopeApplies).toBe(false);
    expect(report.transparencySelectionPredicateAuthorized).toBe(false);
    expect(report.candidateFactsEmitted).toBe(false);
    expect(report.authorityBoundary).toContain('must not yet be promoted');
  });

  test('keeps deterministic report identity for identical governed input', () => {
    const first = buildGeneralNatalGejuMixedQiTransparencySourceBoundary('축');
    const second = buildGeneralNatalGejuMixedQiTransparencySourceBoundary('축');
    const different = buildGeneralNatalGejuMixedQiTransparencySourceBoundary('미');

    expect(first.reportId).toBe(second.reportId);
    expect(first.reportId).not.toBe(different.reportId);
  });
});
