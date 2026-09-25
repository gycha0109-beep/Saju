import { describe, expect, it } from 'vitest';
import {
  R132_AUTHORITY,
  R132_COMPARISON_GROUPS,
  R132_CORPUS_INVARIANTS,
  R132_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_VERSION,
  R132_SUMMARY,
  R132_UPSTREAM_BINDINGS,
  R132_VARIANT_CLASSES,
  R132_VARIANT_CORPUS,
} from '../src/research/general-natal-mixed-month-qi-candidate-selection-variant-corpus.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
} from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
} from '../src/research/general-natal-geju-selection-signal-observation.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from '../src/research/general-natal-geju-source-semantic-use-identity.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
} from '../src/research/general-natal-geju-branch-meeting-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-branch-meeting-selection-effect-admission-review.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from '../src/research/general-natal-pattern-candidate-establishment-formal-boundary-audit.js';

describe('R132 mixed month-qi candidate-selection variant corpus', () => {
  it('publishes the requested corpus size and pair structure', () => {
    expect(R132_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R132_VARIANT_CORPUS).toHaveLength(24);
    expect(R132_COMPARISON_GROUPS).toHaveLength(12);
    expect(R132_VARIANT_CLASSES).toHaveLength(12);
    expect(R132_SUMMARY).toMatchObject({
      caseCount: 24,
      comparisonGroupCount: 12,
      variantClassCount: 12,
      directSourceSemanticExemplarRowCount: 6,
      exactYinRowCount: 2,
      syntheticRowCount: 14,
      negativeControlRowCount: 4,
      exactSourceExemplarMatchRowCount: 8,
      candidateCountAuthorizedRowCount: 0,
      candidateRankAuthorizedRowCount: 0,
      candidatePrecedenceAuthorizedRowCount: 0,
    });

    for (const groupId of R132_COMPARISON_GROUPS) {
      expect(
        R132_VARIANT_CORPUS.filter((item) => item.comparisonGroupId === groupId),
      ).toHaveLength(2);
    }
  });

  it('binds governed upstream versions and hashes', () => {
    expect(R132_UPSTREAM_BINDINGS.candidateSourceFrontier).toEqual({
      version: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
      definitionHash: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
    });
    expect(R132_UPSTREAM_BINDINGS.selectionSignalObservation).toEqual({
      version: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
      definitionHash: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
    });
    expect(R132_UPSTREAM_BINDINGS.sourceSemanticUseIdentity).toEqual({
      version: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
      definitionHash: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
    });
    expect(R132_UPSTREAM_BINDINGS.monthOrderHiddenStemSelection).toEqual({
      version:
        GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
      definitionHash:
        GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
    });
    expect(R132_UPSTREAM_BINDINGS.branchMeetingSourceEvidence).toEqual({
      version: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
      definitionHash: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
    });
    expect(R132_UPSTREAM_BINDINGS.branchMeetingSelectionEffect).toEqual({
      version:
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
      definitionHash:
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
    });
    expect(R132_UPSTREAM_BINDINGS.r131Boundary).toEqual({
      version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
      candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
      candidateDerivationAuthorized: R131_AUTHORITY.candidateDerivationAuthorized,
      establishmentPredicateAuthorized: R131_AUTHORITY.establishmentPredicateAuthorized,
    });
  });

  it('preserves all three direct source-semantic exemplars', () => {
    const upstreamIds = GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS.map(
      (item) => item.exemplarId,
    );

    expect(R132_CORPUS_INVARIANTS.directExemplarIdsBound).toEqual(upstreamIds);

    const directRows = R132_VARIANT_CORPUS.filter(
      (item) => item.provenance === 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
    );

    expect(directRows.length).toBeGreaterThanOrEqual(3);
    for (const row of directRows) {
      expect(row.synthetic).toBe(false);
      expect(row.exactSourceExemplarMatch).toBe(true);
      expect(row.sourceDirectStatementObserved).toBe(true);
      expect(row.sourceSemanticUseStatus).toBe(
        'DIRECT_SOURCE_USE_IDENTITY_OBSERVED',
      );
      expect(row.sourceSemanticUseLabels).not.toBeNull();
      expect(row.sourceRefs.some((sourceRef) => upstreamIds.includes(sourceRef))).toBe(
        true,
      );
    }
  });

  it('keeps synthetic variants separate from source statements and source labels', () => {
    const syntheticRows = R132_VARIANT_CORPUS.filter((item) => item.synthetic);

    expect(syntheticRows.length).toBeGreaterThanOrEqual(4);
    for (const row of syntheticRows) {
      expect(row.sourceDirectStatementObserved).toBe(false);
      expect(row.exactSourceExemplarMatch).toBe(false);
      expect(row.sourceSemanticUseStatus).toBe('NO_DIRECT_SOURCE_USE_ASSERTED');
      expect(row.sourceSemanticUseLabels).toBeNull();
      expect(row.sourceSemanticUseCount).toBeNull();
    }
  });

  it('preserves both exact Yin rows without generalizing them', () => {
    const yinRows = R132_VARIANT_CORPUS.filter(
      (item) => item.provenance === 'DIRECT_EXACT_SOURCE_ROLE',
    );

    expect(yinRows).toHaveLength(2);
    expect(yinRows.map((item) => item.sourceSemanticUseLabels?.[0]).sort()).toEqual(
      ['丙可作主', '甲為本主'].sort(),
    );

    for (const row of yinRows) {
      expect(row.monthBranch).toBe('인');
      expect(row.synthetic).toBe(false);
      expect(row.exactSourceExemplarMatch).toBe(true);
      expect(row.candidateIdentityAuthorized).toBe(false);
      expect(row.candidateDerivationAuthorized).toBe(false);
    }
  });

  it('covers branch-meeting-sensitive variants without establishing transformation', () => {
    const branchSensitiveRows = R132_VARIANT_CORPUS.filter(
      (item) => item.branchMeetingStructuralStatus !== 'NOT_PRESENT',
    );

    expect(branchSensitiveRows.length).toBeGreaterThanOrEqual(4);
    expect(R132_SUMMARY.branchMeetingSensitiveRowCount).toBe(
      branchSensitiveRows.length,
    );

    for (const row of branchSensitiveRows) {
      expect(row.branchMeetingEffectEstablished).toBe(false);
      expect(row.candidateIdentityAuthorized).toBe(false);
      expect(row.establishmentPredicateAuthorized).toBe(false);
    }
  });

  it('covers plurality and cardinality variants without candidate-count inference', () => {
    expect(R132_SUMMARY.pluralitySensitiveRowCount).toBeGreaterThanOrEqual(4);

    for (const row of R132_VARIANT_CORPUS) {
      expect(row.candidateCount).toBeNull();
      expect(row.candidateRank).toBeNull();
      expect(row.candidatePrecedence).toBeNull();
    }

    const sameUse = R132_VARIANT_CORPUS.find(
      (item) => item.caseId === 'R132-C21-DIRECT-SAME-USE-CARDINALITY-REFERENCE',
    );
    const distinctUse = R132_VARIANT_CORPUS.find(
      (item) =>
        item.caseId === 'R132-C22-DIRECT-DISTINCT-USE-CARDINALITY-REFERENCE',
    );

    expect(sameUse).toMatchObject({
      governedSignalCount: 2,
      sourceSemanticUseCount: 1,
      candidateCount: null,
    });
    expect(distinctUse).toMatchObject({
      governedSignalCount: 2,
      sourceSemanticUseCount: 2,
      candidateCount: null,
    });
  });

  it('treats zero governed signals as non-exhaustive rather than no-candidate evidence', () => {
    const zero = R132_VARIANT_CORPUS.find(
      (item) => item.caseId === 'R132-C01-ZERO-GOVERNED-SIGNALS',
    );

    expect(zero).toMatchObject({
      governedSignalCount: 0,
      candidateCount: null,
      candidateIdentityAuthorized: false,
      candidateDerivationAuthorized: false,
      invalidInference: 'ZERO_GOVERNED_SIGNALS_EQUALS_NO_CANDIDATE',
    });
    expect(R132_CORPUS_INVARIANTS.zeroGovernedSignalsMeansNoCandidateAuthorized).toBe(
      false,
    );
  });

  it('uses storage-order perturbation as a negative control', () => {
    const rows = R132_VARIANT_CORPUS.filter(
      (item) =>
        item.comparisonGroupId === 'R132-G07-HIDDEN-STEM-STORAGE-ORDER-CONTROL',
    );

    expect(rows).toHaveLength(2);
    expect(rows.every((item) => item.negativeControl)).toBe(true);
    expect([...rows[0]!.hiddenStemMembership].sort()).toEqual(
      [...rows[1]!.hiddenStemMembership].sort(),
    );
    expect(rows[0]!.hiddenStemMembership).not.toEqual(rows[1]!.hiddenStemMembership);
    expect(rows.every((item) => item.hiddenStemStorageOrderSemantic === false)).toBe(
      true,
    );
  });

  it('uses signal-array order perturbation as a negative control', () => {
    const rows = R132_VARIANT_CORPUS.filter(
      (item) => item.comparisonGroupId === 'R132-G10-SIGNAL-ARRAY-ORDER-CONTROL',
    );

    expect(rows).toHaveLength(2);
    expect(rows.every((item) => item.negativeControl)).toBe(true);
    expect([...rows[0]!.governedSignals].sort()).toEqual(
      [...rows[1]!.governedSignals].sort(),
    );
    expect(rows[0]!.governedSignals).not.toEqual(rows[1]!.governedSignals);
    expect(rows.every((item) => item.candidateRank === null)).toBe(true);
    expect(rows.every((item) => item.candidatePrecedence === null)).toBe(true);
  });

  it('requires exact exemplar matching and rejects superset inheritance', () => {
    const exact = R132_VARIANT_CORPUS.find(
      (item) => item.caseId === 'R132-C23-JIA-XU-EXACT-EXEMPLAR-REFERENCE',
    );
    const extra = R132_VARIANT_CORPUS.find(
      (item) =>
        item.caseId === 'R132-C24-JIA-XU-EXTRA-SIGNAL-BREAKS-EXACT-MATCH',
    );

    expect(exact).toMatchObject({
      governedSignalCount: 3,
      exactSourceExemplarMatch: true,
      sourceSemanticUseCount: 2,
    });
    expect(extra).toMatchObject({
      governedSignalCount: 4,
      exactSourceExemplarMatch: false,
      sourceSemanticUseCount: null,
      invalidInference: 'SUPERSET_OF_EXACT_SIGNALS_INHERITS_EXACT_SOURCE_LABELS',
    });
  });

  it('records an unresolved bridge and invalid inference for every corpus row', () => {
    expect(new Set(R132_VARIANT_CORPUS.map((item) => item.caseId)).size).toBe(24);

    for (const row of R132_VARIANT_CORPUS) {
      expect(row.unresolvedBridge.length).toBeGreaterThan(0);
      expect(row.invalidInference.length).toBeGreaterThan(0);
      expect(row.authorityConsequence.length).toBeGreaterThan(0);
      expect(row.candidateIdentityAuthorized).toBe(false);
      expect(row.candidateDerivationAuthorized).toBe(false);
      expect(row.establishmentPredicateAuthorized).toBe(false);
      expect(row.candidateFactsEmitted).toBe(false);
      expect(row.establishmentFactsEmitted).toBe(false);
    }
  });

  it('locks the corpus-level fail-closed invariants', () => {
    expect(R132_CORPUS_INVARIANTS).toMatchObject({
      zeroGovernedSignalsMeansNoCandidateAuthorized: false,
      signalCountEqualsCandidateCountAuthorized: false,
      sourceUseCountEqualsCandidateCountAuthorized: false,
      hiddenStemStorageOrderRankingAuthorized: false,
      signalArrayOrderRankingAuthorized: false,
      transparencyAutomaticWinnerAuthorized: false,
      structuralBranchMeetingMeansEffectiveTransformationAuthorized: false,
      exactSourceExemplarGeneralizationAuthorized: false,
      syntheticCounterfactualSourceLabelAuthorized: false,
      corpusExhaustiveAuthorized: false,
    });
  });

  it('preserves the final research-only authority boundary', () => {
    expect(R132_AUTHORITY).toEqual({
      status: 'RESEARCH_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_COMPLETE',
      researchOnly: true,
      variantCorpusCompleteForGovernedScope: true,
      directSourceRowsPreserved: true,
      syntheticCounterfactualsSeparated: true,
      negativeControlsPreserved: true,
      signalCardinalityVariationObserved: true,
      sourceUseCardinalityVariationObserved: true,
      exactYinRoleVariationObserved: true,
      branchMeetingStructuralVariationObserved: true,
      candidateIdentityAuthorized: false,
      candidateDerivationAuthorized: false,
      multipleCandidateRepresentationAuthorized: false,
      candidateRankingAuthorized: false,
      candidatePrecedenceAuthorized: false,
      generalizedMixedQiSelectorAuthorized: false,
      generalizedQingPredicateAuthorized: false,
      generalizedTransparencySelectorAuthorized: false,
      generalizedBranchMeetingSelectionEffectAuthorized: false,
      canonicalTransformationAuthorized: false,
      establishmentPredicateAuthorized: false,
      canonicalTerminalStateAuthorized: false,
      candidateFactsEmitted: false,
      establishmentFactsEmitted: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
