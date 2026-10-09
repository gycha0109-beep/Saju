import { describe, expect, it } from 'vitest';
import {
  R134_ADVERSARIAL_PAIRS,
  R134_ADVERSARIAL_SCENARIOS,
  R134_AUTHORITY,
  R134_REJECTED_SHORTCUTS,
  R134_SOURCE_REFERENCES,
  R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION,
  R134_SUMMARY,
  R134_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-special-pattern-exit-adversarial-corpus.js';
import {
  R029_AUTHORITY,
  R029_ENTRY_PROPOSITIONS,
  R029_EXCLUSIONS,
  R029_FOLLOW_PATTERN_VERSION,
} from '../src/research/general-natal-follow-pattern-entry-exit.js';
import {
  R030_AUTHORITY,
  R030_GEJU_CONFLICT_MATRIX_VERSION,
} from '../src/research/general-natal-geju-conflict-resolution-matrix.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from '../src/research/general-natal-pattern-candidate-establishment-formal-boundary-audit.js';
import {
  R133_AUTHORITY,
  R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
} from '../src/research/general-natal-pattern-rescue-failure-precedence-graph.js';

describe('R134 special-pattern exit-condition adversarial corpus', () => {
  it('publishes a paired adversarial corpus above the acceptance floor', () => {
    expect(R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R134_ADVERSARIAL_PAIRS.length).toBeGreaterThanOrEqual(12);
    expect(R134_ADVERSARIAL_SCENARIOS.length).toBeGreaterThanOrEqual(24);
    expect(R134_ADVERSARIAL_SCENARIOS).toHaveLength(
      R134_ADVERSARIAL_PAIRS.length * 2,
    );
    expect(new Set(R134_ADVERSARIAL_SCENARIOS.map((item) => item.caseId)).size).toBe(
      R134_ADVERSARIAL_SCENARIOS.length,
    );
    expect(R134_SUMMARY).toMatchObject({
      pairCount: 18,
      scenarioCount: 36,
      representedTargetCount: 6,
      ordinaryPathBlockingCount: 4,
      supportControlBlockingCount: 1,
      missingPrerequisiteCount: 5,
      unresolvedOrIndeterminateCount: 4,
      brokenOrdinaryRetentionCount: 4,
      ordinaryFailureCounterexampleCount: 8,
      temporalTransitionAuthorizedCount: 0,
      specialPatternResolverAuthorizedCount: 0,
      candidateFactsEmittedCount: 0,
      establishmentFactsEmittedCount: 0,
    });
  });

  it('keeps every pair minimally structured as one baseline plus one perturbation', () => {
    for (const pair of R134_ADVERSARIAL_PAIRS) {
      const rows = R134_ADVERSARIAL_SCENARIOS.filter(
        (item) => item.pairId === pair.pairId,
      );
      expect(rows).toHaveLength(2);
      expect(rows.map((item) => item.role).sort()).toEqual([
        'BASELINE',
        'PERTURBATION',
      ]);
      expect(rows.every((item) => item.changedDimension === pair.changedDimension)).toBe(
        true,
      );
      expect(
        rows.every((item) => item.minimalPairDoesNotImplyNumericDistance),
      ).toBe(true);
    }
  });

  it('represents all six governed R029 target families without establishing any', () => {
    const expectedTargets = new Set(
      R029_ENTRY_PROPOSITIONS.map((item) => item.target),
    );
    const observedTargets = new Set(
      R134_ADVERSARIAL_SCENARIOS.map((item) => item.target),
    );
    expect(observedTargets).toEqual(expectedTargets);
    expect(observedTargets.size).toBe(6);
    expect(
      R134_ADVERSARIAL_SCENARIOS.every(
        (item) =>
          item.candidateIdentityAuthorized === false &&
          item.establishmentPredicateAuthorized === false,
      ),
    ).toBe(true);
  });

  it('pins the selected commentary surface and source-stated exclusions', () => {
    expect(R134_SOURCE_REFERENCES.selectedCommentary).toMatchObject({
      sourceNature: 'COMMENTARY_DIRECT',
      verifiedOn: '2026-09-26',
    });
    expect(R134_SOURCE_REFERENCES.selectedCommentary.anchors).toContain(
      '若月令自有用神，豈可另尋外格？',
    );
    expect(R134_SOURCE_REFERENCES.selectedCommentary.anchors).toContain(
      '必四柱氣象偏於一方',
    );
    expect(R029_EXCLUSIONS.map((item) => item.id)).toContain(
      'broken-ordinary-pattern-is-not-month-order-useless',
    );
  });

  it('binds R029, R030, R131, and R133 authority without widening it', () => {
    expect(R134_UPSTREAM_BINDINGS.r029.version).toBe(R029_FOLLOW_PATTERN_VERSION);
    expect(
      R134_UPSTREAM_BINDINGS.r029.executableFollowPatternResolverAuthorized,
    ).toBe(R029_AUTHORITY.executableFollowPatternResolverAuthorized);
    expect(R134_UPSTREAM_BINDINGS.r030.version).toBe(
      R030_GEJU_CONFLICT_MATRIX_VERSION,
    );
    expect(
      R134_UPSTREAM_BINDINGS.r030.conflictWinnerResolverAuthorized,
    ).toBe(R030_AUTHORITY.conflictWinnerResolverAuthorized);
    expect(R134_UPSTREAM_BINDINGS.r131).toMatchObject({
      version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
      candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
      establishmentPredicateAuthorized:
        R131_AUTHORITY.establishmentPredicateAuthorized,
      candidateFactsEmitted: false,
      establishmentFactsEmitted: false,
    });
    expect(R134_UPSTREAM_BINDINGS.r133).toMatchObject({
      version: R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
      globalRelationPrecedenceAuthorized:
        R133_AUTHORITY.globalRelationPrecedenceAuthorized,
      rescueResolverAuthorized: R133_AUTHORITY.rescueResolverAuthorized,
      establishmentPredicateAuthorized: false,
    });
  });

  it('keeps broken ordinary paths distinct from absent ordinary paths', () => {
    const broken = R134_ADVERSARIAL_SCENARIOS.filter(
      (item) => item.resultState === 'BROKEN_ORDINARY_RETAINED',
    );
    expect(broken.length).toBeGreaterThanOrEqual(4);
    expect(broken.every((item) => item.ordinaryFailureCounterexample)).toBe(true);
    expect(R134_REJECTED_SHORTCUTS).toContain(
      'ORDINARY_FAILURE_EQUALS_SPECIAL_PATTERN_ENTRY',
    );
    expect(R134_REJECTED_SHORTCUTS).toContain(
      'BROKEN_ORDINARY_EQUALS_ABSENT_ORDINARY_PATH',
    );
  });

  it('fails closed on unresolved operands instead of inventing exits', () => {
    const unresolved = R134_ADVERSARIAL_SCENARIOS.filter(
      (item) =>
        item.resultState === 'UNRESOLVED_OPERAND' ||
        item.resultState === 'INDETERMINATE',
    );
    expect(unresolved.length).toBeGreaterThanOrEqual(4);
    expect(
      unresolved.every((item) => item.unresolvedOperandDoesNotImplyExitConfirmed),
    ).toBe(true);
    expect(R134_REJECTED_SHORTCUTS).toContain(
      'UNRESOLVED_OPERAND_EQUALS_EXIT_CONFIRMED',
    );
  });

  it('does not import temporal, numeric, resolver, output, or production authority', () => {
    expect(R134_AUTHORITY).toMatchObject({
      researchOnly: true,
      ordinaryFailureAutoSpecialEntryAuthorized: false,
      temporalTransitionSemanticsAuthorized: false,
      numericSpecialPatternScoreAuthorized: false,
      oneSidednessDetectorAuthorized: false,
      dayMasterLinJuePredicateAuthorized: false,
      ordinaryYongshenAvailabilityPredicateAuthorized: false,
      transformationValidityPredicateAuthorized: false,
      specialPatternResolverAuthorized: false,
      candidateIdentityAuthorized: false,
      establishmentPredicateAuthorized: false,
      candidateFactsEmitted: false,
      establishmentFactsEmitted: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
