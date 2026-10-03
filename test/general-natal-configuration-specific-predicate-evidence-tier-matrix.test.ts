import { describe, expect, it } from 'vitest';

import {
  R165_AUTHORITY,
  R165_CONFIGURATION_SPECIFIC_PREDICATE_EVIDENCE_TIER_VERSION,
  R165_EVIDENCE_SURFACES,
  R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES,
  R165_GOVERNANCE_GUARDS,
  R165_MECHANISM_MATRIX,
  R165_REJECTED_SHORTCUTS,
  R165_SUMMARY,
  R165_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-configuration-specific-predicate-evidence-tier-matrix.js';

describe('R165 configuration-specific predicate evidence tier matrix', () => {
  it('binds three configuration-specific mechanisms without ranking or execution', () => {
    expect(R165_CONFIGURATION_SPECIFIC_PREDICATE_EVIDENCE_TIER_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R165_MECHANISM_MATRIX).toHaveLength(3);
    expect(R165_MECHANISM_MATRIX.map((item) => item.triggerClass)).toEqual([
      'BREAK_TRIGGER',
      'NATAL_RESCUE_TRIGGER',
      'COUNTERFORCE_TRIGGER',
    ]);

    for (const row of R165_MECHANISM_MATRIX) {
      expect(row.sourceCaseBound).toBe(true);
      expect(row.configurationSpecificObserved).toBe(true);
      expect(row.replayDecompositionEstablished).toBe(true);
      expect(row.exactMinimalPredicateSetEstablished).toBe(false);
      expect(row.matchingSufficiencyEstablished).toBe(false);
      expect(row.boundedOutcomeSufficiencyEstablished).toBe(false);
      expect(row.settlementSufficiencyEstablished).toBe(false);
      expect(row.semanticPredicateEstablished).toBe(false);
      expect(row.automaticOutcomeAuthorized).toBe(false);
      expect(row.mechanismRankingAuthorized).toBe(false);
      expect(row.numericWeightAuthorized).toBe(false);
      expect(row.executableResolverAuthorized).toBe(false);
      expect(row.interpretationClaimEmissionAuthorized).toBe(false);
      expect(row.productionAuthorityPromoted).toBe(false);
    }
  });

  it('classifies seven evidence surfaces without treating classes as authority ranks', () => {
    expect(R165_EVIDENCE_SURFACES).toHaveLength(7);
    expect(R165_SUMMARY).toMatchObject({
      mechanismCount: 3,
      evidenceSurfaceCount: 7,
      replayContextOnlyCount: 2,
      sourceOmissionOnlyCount: 1,
      explicitFeatureCandidateCount: 3,
      sourceOutcomeLanguageOnlyCount: 1,
      followUpPredicateResearchCandidateCount: 3,
      semanticPredicateEstablishedCount: 0,
      governanceGuardCount: 5,
    });
  });

  it('keeps source omission distinct from proven absence', () => {
    const omission = R165_EVIDENCE_SURFACES.find(
      (item) => item.surfaceId === 'R165-E02-BREAK-JIA-OMISSION',
    );
    expect(omission).toMatchObject({
      evidenceClass: 'SOURCE_OMISSION_ONLY',
      followUpPredicateResearchCandidate: false,
      semanticPredicateEstablished: false,
      semanticMinimalityEstablished: false,
      matchingSufficiencyEstablished: false,
      outcomeSufficiencyEstablished: false,
      settlementEstablished: false,
    });
  });

  it('allows only explicit positive feature surfaces into follow-up research', () => {
    expect(
      R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES.map(
        (item) => item.sourceSurface,
      ),
    ).toEqual(['命有甲', '庚辛', '申酉']);

    for (const candidate of R165_FOLLOW_UP_PREDICATE_RESEARCH_CANDIDATES) {
      expect(candidate.evidenceClass).toBe(
        'SOURCE_EXPLICIT_FEATURE_CANDIDATE',
      );
      expect(candidate.semanticPredicateEstablished).toBe(false);
      expect(candidate.semanticMinimalityEstablished).toBe(false);
      expect(candidate.matchingSufficiencyEstablished).toBe(false);
      expect(candidate.outcomeSufficiencyEstablished).toBe(false);
      expect(candidate.settlementEstablished).toBe(false);
      expect(candidate.automaticOutcomeAuthorized).toBe(false);
      expect(candidate.executableResolverAuthorized).toBe(false);
      expect(candidate.productionAuthorityPromoted).toBe(false);
    }
  });

  it('keeps replay context and outcome language out of predicate promotion', () => {
    const replayOnly = R165_EVIDENCE_SURFACES.filter(
      (item) => item.evidenceClass === 'REPLAY_CONTEXT_ONLY',
    );
    expect(replayOnly.map((item) => item.sourceSurface)).toEqual([
      '丁 / 辰 / 透壬用官 / 逢戊',
      '運逢卯未',
    ]);
    expect(
      replayOnly.every((item) => !item.followUpPredicateResearchCandidate),
    ).toBe(true);

    const outcome = R165_EVIDENCE_SURFACES.find(
      (item) =>
        item.evidenceClass === 'SOURCE_OUTCOME_LANGUAGE_ONLY',
    );
    expect(outcome).toMatchObject({
      sourceSurface: '可回沖而不成會局變格',
      followUpPredicateResearchCandidate: false,
      settlementEstablished: false,
    });
  });

  it('keeps every upstream governance guard closed', () => {
    expect(R165_GOVERNANCE_GUARDS).toHaveLength(5);
    expect(R165_GOVERNANCE_GUARDS.every((item) => item.satisfied)).toBe(true);

    expect(R165_UPSTREAM_BINDINGS.r157.triggerPredicateAuthorized).toBe(false);
    expect(
      R165_UPSTREAM_BINDINGS.r159
        .exactTemporalTriggerMinimalPredicateSetEstablished,
    ).toBe(false);
    expect(R165_UPSTREAM_BINDINGS.r163.pairedTextualDeltaEstablished).toBe(
      true,
    );
    expect(
      R165_UPSTREAM_BINDINGS.r164
        .groupedAlternativesDistinctFromIndividualSufficiencyObserved,
    ).toBe(true);
  });

  it('rejects ranking, omission, sufficiency, settlement, and execution shortcuts', () => {
    expect(R165_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'EVIDENCE_CLASS_IS_AUTHORITY_RANK',
        'FOLLOW_UP_CANDIDATE_EQUALS_SEMANTIC_PREDICATE',
        'EXPLICIT_JIA_PRESENCE_EQUALS_RESCUE_SUFFICIENCY',
        'BREAK_CASE_JIA_OMISSION_EQUALS_JIA_ABSENCE',
        'COUNTERFORCE_GROUP_EQUALS_GROUP_SUFFICIENCY',
        'MAO_WEI_CONTEXT_EQUALS_COMPLETE_MEETING_MATCH',
        'SOURCE_OUTCOME_LANGUAGE_EQUALS_SETTLEMENT',
        'MORE_EXPLICIT_FEATURES_EQUALS_STRONGER_MECHANISM',
        'CANDIDATE_COUNT_AS_NUMERIC_WEIGHT',
        'MATRIX_AS_EXECUTABLE_TRIGGER_RESOLVER',
      ]),
    );
  });

  it('keeps R165 research-only and non-authoritative', () => {
    expect(R165_AUTHORITY).toMatchObject({
      researchOnly: true,
      threeMechanismMatrixEstablished: true,
      replayMetadataSeparatedFromFollowUpCandidateSurfaces: true,
      sourceOmissionDistinctFromProvenAbsenceObserved: true,
      explicitFeatureCandidateDistinctFromSemanticPredicateObserved: true,
      explicitFeatureCandidateDistinctFromSufficiencyObserved: true,
      groupedAlternativeCandidateDistinctFromGroupSufficiencyObserved: true,
      sourceOutcomeLanguageDistinctFromSettlementObserved: true,
      mechanismRankingEstablished: false,
      semanticPredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      boundedOutcomeSufficiencyEstablished: false,
      settlementSufficiencyEstablished: false,
      automaticOutcomeAuthorized: false,
      numericWeightAuthorized: false,
      executableTriggerResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
