import { describe, expect, it } from 'vitest';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
  R131_REJECTED_COLLAPSES,
  R131_STAGES,
  R131_SUMMARY,
  R131_TRANSITION_AUDITS,
  R131_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-pattern-candidate-establishment-formal-boundary-audit.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
} from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
} from '../src/research/general-natal-geju-selection-signal-observation.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from '../src/research/general-natal-geju-source-semantic-use-identity.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-candidate-identity-admission-review.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-establishment-source-clause-admission-review.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-establishment-outcome-representation-review.js';
import { GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW } from '../src/research/general-natal-geju-mixed-outcome-application-review.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-branch-meeting-selection-effect-admission-review.js';

describe('R131 pattern candidate versus establishment formal-boundary audit', () => {
  it('publishes ten distinct semantic stages', () => {
    expect(R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R131_STAGES).toHaveLength(10);
    expect(R131_SUMMARY.stageCount).toBe(10);
    expect(new Set(R131_STAGES.map((stage) => stage.stageId)).size).toBe(10);
    expect(R131_SUMMARY.sourceObservedStageCount).toBe(5);
    expect(R131_SUMMARY.canonicalUnauthorizedStageCount).toBe(9);
  });

  it('keeps candidate and establishment as distinct formal stages', () => {
    const candidate = R131_STAGES.find(
      (stage) => stage.stageId === 'CANONICAL_CANDIDATE_IDENTITY',
    );
    const establishment = R131_STAGES.find(
      (stage) => stage.stageId === 'CANONICAL_ESTABLISHMENT_PREDICATE',
    );

    expect(candidate).toMatchObject({
      stageClass: 'CANONICAL_CANDIDATE',
      status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
      candidateAuthorityAuthorized: false,
      establishmentAuthorityAuthorized: false,
    });
    expect(establishment).toMatchObject({
      stageClass: 'CANONICAL_ESTABLISHMENT',
      status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
      candidateAuthorityAuthorized: false,
      establishmentAuthorityAuthorized: false,
    });
    expect(candidate?.stageId).not.toBe(establishment?.stageId);
  });

  it('separates source pattern wording from canonical candidate identity', () => {
    const wording = R131_STAGES.find(
      (stage) => stage.stageId === 'SOURCE_PATTERN_WORDING',
    );
    const candidate = R131_STAGES.find(
      (stage) => stage.stageId === 'CANONICAL_CANDIDATE_IDENTITY',
    );

    expect(wording).toMatchObject({
      sourceObserved: true,
      status: 'SOURCE_WORDING_OBSERVED',
      candidateAuthorityAuthorized: false,
    });
    expect(candidate).toMatchObject({
      sourceObserved: false,
      status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
    });
  });

  it('separates source establishment clauses from executable establishment predicates', () => {
    const clauses = R131_STAGES.find(
      (stage) => stage.stageId === 'SOURCE_ESTABLISHMENT_CLAUSE',
    );
    const executable = R131_STAGES.find(
      (stage) => stage.stageId === 'CANONICAL_ESTABLISHMENT_PREDICATE',
    );

    expect(clauses).toMatchObject({
      sourceObserved: true,
      status: 'SOURCE_CLAUSE_INVENTORY_OBSERVED',
      establishmentAuthorityAuthorized: false,
    });
    expect(executable).toMatchObject({
      sourceObserved: false,
      status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
    });
  });

  it('separates source outcome layers from canonical terminal state', () => {
    const sourceOutcome = R131_STAGES.find(
      (stage) => stage.stageId === 'SOURCE_OUTCOME_LAYER',
    );
    const terminal = R131_STAGES.find(
      (stage) => stage.stageId === 'CANONICAL_TERMINAL_STATE',
    );

    expect(sourceOutcome).toMatchObject({
      sourceObserved: true,
      status: 'SOURCE_LAYER_REPRESENTABLE',
      establishmentAuthorityAuthorized: false,
    });
    expect(terminal).toMatchObject({
      sourceObserved: false,
      status: 'CANONICAL_STAGE_NOT_AUTHORIZED',
    });
  });

  it('binds all governed upstream versions and definition hashes', () => {
    expect(R131_UPSTREAM_BINDINGS.candidateSourceFrontier).toEqual({
      version: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
      definitionHash: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
    });
    expect(R131_UPSTREAM_BINDINGS.selectionSignalObservation).toEqual({
      version: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
      definitionHash: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
    });
    expect(R131_UPSTREAM_BINDINGS.sourceSemanticUseIdentity).toEqual({
      version: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
      definitionHash: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
    });
    expect(R131_UPSTREAM_BINDINGS.candidateIdentityAdmission).toEqual({
      version: GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
      definitionHash:
        GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
    });
    expect(R131_UPSTREAM_BINDINGS.establishmentSourceClauseAdmission).toEqual({
      version: GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
      definitionHash:
        GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
    });
    expect(R131_UPSTREAM_BINDINGS.establishmentOutcomeRepresentation).toEqual({
      version: GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
      definitionHash:
        GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
    });
    expect(R131_UPSTREAM_BINDINGS.mixedOutcomeApplication).toEqual({
      version: GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.version,
      upstreamVersion: GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.upstreamVersion,
      upstreamHash: GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.upstreamHash,
    });
    expect(R131_UPSTREAM_BINDINGS.monthOrderHiddenStemSelection).toEqual({
      version:
        GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
      definitionHash:
        GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
    });
    expect(R131_UPSTREAM_BINDINGS.branchMeetingSelectionEffect).toEqual({
      version:
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
      definitionHash:
        GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
    });
  });

  it('publishes a transition audit above the acceptance floor', () => {
    expect(R131_TRANSITION_AUDITS).toHaveLength(31);
    expect(R131_SUMMARY.transitionCount).toBe(31);
    expect(
      new Set(R131_TRANSITION_AUDITS.map((row) => row.transitionId)).size,
    ).toBe(31);
    expect(R131_SUMMARY.boundedObservationTransitionCount).toBe(6);
    expect(R131_SUMMARY.blockedDirectPromotionCount).toBe(25);
    expect(R131_SUMMARY.candidateBridgeBlockedCount).toBe(9);
    expect(R131_SUMMARY.establishmentBridgeBlockedCount).toBe(5);
    expect(R131_SUMMARY.terminalRepresentationBlockedCount).toBe(5);
    expect(R131_SUMMARY.factEmissionBlockedCount).toBe(5);
  });

  it('records evidence, missing bridge, and authority consequence for every transition', () => {
    for (const row of R131_TRANSITION_AUDITS) {
      expect(row.upstreamEvidence.length).toBeGreaterThan(0);
      expect(row.observedBasis.length).toBeGreaterThan(0);
      expect(row.authorityConsequence.length).toBeGreaterThan(0);

      if (row.directPromotionBlocked) {
        expect(row.missingBridge).not.toBeNull();
      }

      expect(row.candidateIdentityAuthorized).toBe(false);
      expect(row.candidateDerivationAuthorized).toBe(false);
      expect(row.establishmentPredicateAuthorized).toBe(false);
      expect(row.canonicalTerminalStateAuthorized).toBe(false);
      expect(row.candidateFactsEmitted).toBe(false);
      expect(row.establishmentFactsEmitted).toBe(false);
      expect(row.productionAuthorityPromoted).toBe(false);
    }
  });

  it('preserves bounded and exact source observations without candidate promotion', () => {
    const observed = R131_TRANSITION_AUDITS.filter(
      (row) =>
        row.status === 'BOUNDED_OBSERVATION_AUTHORIZED' ||
        row.status === 'EXACT_EXEMPLAR_OBSERVATION_AUTHORIZED' ||
        row.status === 'SOURCE_RELATION_OBSERVED',
    );

    expect(observed).toHaveLength(6);
    expect(observed.every((row) => row.candidateIdentityAuthorized === false)).toBe(
      true,
    );
    expect(
      observed.every((row) => row.establishmentPredicateAuthorized === false),
    ).toBe(true);
  });

  it('blocks direct signal, semantic-use, wording, and substrate promotion into candidate identity', () => {
    for (const transitionId of [
      'R131-T04-PATTERN-WORDING-TO-CANDIDATE',
      'R131-T05-SIGNAL-TO-CANDIDATE',
      'R131-T06-SEMANTIC-USE-TO-CANDIDATE',
      'R131-T07-SUBSTRATE-TO-CANDIDATE',
      'R131-T08-MULTIPLE-SIGNALS-TO-CANDIDATE-MULTIPLICITY',
      'R131-T09-MULTIPLE-USES-TO-CANDIDATE-MULTIPLICITY',
      'R131-T10-COUSE-TO-CANDIDATE-PRECEDENCE',
      'R131-T29-MONTH-HIDDEN-STEM-MEMBERSHIP-TO-CANDIDATE',
      'R131-T30-BRANCH-MEETING-TO-CANDIDATE',
    ]) {
      const row = R131_TRANSITION_AUDITS.find(
        (candidate) => candidate.transitionId === transitionId,
      );
      expect(row).toMatchObject({
        toStage: 'CANONICAL_CANDIDATE_IDENTITY',
        status: 'BLOCKED_CANONICAL_CANDIDATE_BRIDGE',
        directPromotionBlocked: true,
        candidateIdentityAuthorized: false,
      });
    }
  });

  it('blocks source clauses and earlier stages from becoming executable establishment predicates', () => {
    for (const transitionId of [
      'R131-T13-ESTABLISHMENT-CLAUSE-TO-EXECUTABLE-PREDICATE',
      'R131-T14-CANDIDATE-TO-EXECUTABLE-ESTABLISHMENT',
      'R131-T15-SIGNAL-TO-EXECUTABLE-ESTABLISHMENT',
      'R131-T16-SEMANTIC-USE-TO-EXECUTABLE-ESTABLISHMENT',
      'R131-T17-PATTERN-WORDING-TO-EXECUTABLE-ESTABLISHMENT',
    ]) {
      const row = R131_TRANSITION_AUDITS.find(
        (candidate) => candidate.transitionId === transitionId,
      );
      expect(row).toMatchObject({
        toStage: 'CANONICAL_ESTABLISHMENT_PREDICATE',
        status: 'BLOCKED_CANONICAL_ESTABLISHMENT_BRIDGE',
        directPromotionBlocked: true,
        establishmentPredicateAuthorized: false,
      });
    }
  });

  it('blocks outcome-layer collapse into canonical terminal state', () => {
    for (const transitionId of [
      'R131-T19-SOURCE-OUTCOME-TO-TERMINAL-STATE',
      'R131-T20-MIXED-OUTCOME-TO-TERMINAL-STATE',
      'R131-T21-INTERVENTION-TO-TERMINAL-STATE',
      'R131-T22-CAUSAL-TRANSITION-TO-TERMINAL-STATE',
      'R131-T23-SOURCE-OUTCOME-TO-BINARY-COLLAPSE',
    ]) {
      const row = R131_TRANSITION_AUDITS.find(
        (candidate) => candidate.transitionId === transitionId,
      );
      expect(row).toMatchObject({
        toStage: 'CANONICAL_TERMINAL_STATE',
        status: 'BLOCKED_TERMINAL_REPRESENTATION',
        directPromotionBlocked: true,
        canonicalTerminalStateAuthorized: false,
      });
    }
  });

  it('blocks all candidate, establishment, terminal, and source-wording fact emission shortcuts', () => {
    for (const transitionId of [
      'R131-T24-CANDIDATE-TO-FACT-EMISSION',
      'R131-T25-ESTABLISHMENT-PREDICATE-TO-FACT-EMISSION',
      'R131-T26-TERMINAL-STATE-TO-FACT-EMISSION',
      'R131-T27-PATTERN-WORDING-TO-FACT-EMISSION',
      'R131-T28-SOURCE-OUTCOME-TO-FACT-EMISSION',
    ]) {
      const row = R131_TRANSITION_AUDITS.find(
        (candidate) => candidate.transitionId === transitionId,
      );
      expect(row).toMatchObject({
        toStage: 'EMITTED_PATTERN_FACT',
        status: 'BLOCKED_FACT_EMISSION',
        directPromotionBlocked: true,
        candidateFactsEmitted: false,
        establishmentFactsEmitted: false,
      });
    }
  });

  it('rejects all high-risk stage collapses', () => {
    expect(R131_REJECTED_COLLAPSES).toHaveLength(12);
    expect(R131_SUMMARY.rejectedCollapseCount).toBe(12);

    for (const rejected of [
      'SELECTION_SIGNAL_EQUALS_CANONICAL_CANDIDATE',
      'SOURCE_SEMANTIC_USE_EQUALS_CANONICAL_CANDIDATE_IDENTITY',
      'SOURCE_PATTERN_WORDING_EQUALS_PRE_ESTABLISHMENT_CANDIDATE_CONTRACT',
      'SOURCE_ESTABLISHMENT_CLAUSE_EQUALS_EXECUTABLE_ESTABLISHMENT_PREDICATE',
      'SOURCE_OUTCOME_LAYER_EQUALS_CANONICAL_TERMINAL_STATE',
      'MULTIPLE_SIGNALS_EQUAL_RANKED_CANDIDATES',
      'CO_USE_EQUALS_PRECEDENCE',
      'RESCUE_WORDING_EQUALS_RESCUE_WEIGHT_OR_WINNER',
    ]) {
      expect(R131_REJECTED_COLLAPSES).toContain(rejected);
    }
  });

  it('preserves the final research-only authority boundary', () => {
    expect(R131_AUTHORITY).toEqual({
      status:
        'RESEARCH_PATTERN_CANDIDATE_ESTABLISHMENT_FORMAL_BOUNDARY_AUDIT_COMPLETE',
      researchOnly: true,
      stageInventoryComplete: true,
      transitionAuditComplete: true,
      candidateEstablishmentDistinctStagesPreserved: true,
      sourcePatternWordingDistinctFromCanonicalCandidatePreserved: true,
      sourceEstablishmentClauseDistinctFromExecutablePredicatePreserved: true,
      sourceOutcomeLayerDistinctFromCanonicalTerminalStatePreserved: true,
      sourceSignalObservationAuthorizedBoundedly: true,
      exactSemanticUseObservationAuthorizedBoundedly: true,
      sourceEstablishmentClauseInventoryAuthorized: true,
      sourceOutcomeLayerRepresentationAuthorized: true,
      candidateIdentityAuthorized: false,
      candidateDerivationAuthorized: false,
      multipleCandidateRepresentationAuthorized: false,
      candidateRankingAuthorized: false,
      candidatePrecedenceAuthorized: false,
      establishmentPredicateAuthorized: false,
      canonicalTerminalStateAuthorized: false,
      rescuePrecedenceAuthorized: false,
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
