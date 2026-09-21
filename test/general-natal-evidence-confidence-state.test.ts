import { describe, expect, it } from 'vitest';
import {
  R096_AUTHORITY,
  R096_CROSS_CONTRACT_RULES,
  R096_EVIDENCE_STATE_MODEL_VERSION,
  R096_FUTURE_NUMERIC_CALIBRATION_REQUIREMENTS,
  R096_ORTHOGONAL_DIMENSIONS,
  R096_PRIMARY_STATES,
  R096_REJECTED_SHORTCUTS,
  R096_REQUIRED_STATE_ASSIGNMENT_FIELDS,
  R096_TRANSITION_RULES,
} from '../src/research/general-natal-evidence-confidence-state.js';

describe('R096 evidence confidence/state model', () => {
  it('keeps bounded, variant, divergent, inconclusive, contradicted, and pending states distinct', () => {
    expect(R096_EVIDENCE_STATE_MODEL_VERSION).toBe('0.2.0-research');
    expect(R096_PRIMARY_STATES).toHaveLength(8);
    expect(R096_PRIMARY_STATES).toContain('VERIFIED_BOUNDED');
    expect(R096_PRIMARY_STATES).toContain('VERIFIED_VARIANT');
    expect(R096_PRIMARY_STATES).toContain('DIVERGENT_BY_SOURCE_OR_SCHOOL');
    expect(R096_PRIMARY_STATES).toContain('INCONCLUSIVE');
    expect(R096_PRIMARY_STATES).toContain('CONTRADICTED_WITHIN_SCOPE');
    expect(R096_PRIMARY_STATES).toContain('EXECUTION_PENDING');
  });

  it('keeps eight evidence dimensions inspectable instead of summed or ranked', () => {
    expect(R096_ORTHOGONAL_DIMENSIONS).toHaveLength(8);
    expect(R096_ORTHOGONAL_DIMENSIONS).toContain('PASSAGE_BINDING_COMPLETENESS');
    expect(R096_ORTHOGONAL_DIMENSIONS).toContain('SOURCE_INDEPENDENCE_OR_DERIVATION');
    expect(R096_REJECTED_SHORTCUTS).toContain('HIDDEN_WEIGHTED_SUM');
    expect(R096_REJECTED_SHORTCUTS).toContain('HIDDEN_LEXICOGRAPHIC_RANKING');
    expect(R096_AUTHORITY.arithmeticAggregationAuthorized).toBe(false);
    expect(R096_AUTHORITY.implicitOrdinalRankingAuthorized).toBe(false);
  });

  it('requires evidence, provenance, scope, and dimension snapshot on state assignments', () => {
    expect(R096_REQUIRED_STATE_ASSIGNMENT_FIELDS).toContain('SCOPE_REF');
    expect(R096_REQUIRED_STATE_ASSIGNMENT_FIELDS).toContain('EVIDENCE_EVENT_REFS');
    expect(R096_REQUIRED_STATE_ASSIGNMENT_FIELDS).toContain('PROVENANCE_REFS');
    expect(R096_REQUIRED_STATE_ASSIGNMENT_FIELDS).toContain('DIMENSION_SNAPSHOT_REF');
  });

  it('makes transitions evidence-driven, append-only, and non-monotonic', () => {
    expect(R096_TRANSITION_RULES).toContain(
      'TRANSITION_REQUIRES_EXPLICIT_EVIDENCE_EVENT',
    );
    expect(R096_TRANSITION_RULES).toContain('STATE_HISTORY_APPEND_ONLY');
    expect(R096_TRANSITION_RULES).toContain('NO_MONOTONIC_PROGRESSION_ASSUMED');
    expect(R096_AUTHORITY.stateHistoryAppendOnly).toBe(true);
    expect(R096_AUTHORITY.monotonicProgressionAssumed).toBe(false);
  });

  it('does not auto-assign states from provenance connectivity, counts, or lineage prestige', () => {
    expect(R096_CROSS_CONTRACT_RULES).toEqual([
      'R093_GRAPH_CONNECTIVITY_DOES_NOT_AUTO_ASSIGN_STATE',
      'R094_COUNTEREXAMPLE_COUNT_DOES_NOT_AUTO_ASSIGN_STATE',
      'R095_LINEAGE_POPULARITY_OR_SENIORITY_DOES_NOT_ASSIGN_STATE',
    ]);
    expect(R096_AUTHORITY.dimensionSnapshotAutoDerivesState).toBe(false);
  });

  it('preserves bounded, divergent, inconclusive, and unverified semantics', () => {
    expect(R096_REJECTED_SHORTCUTS).toContain('DIVERGENT_EQUALS_LOW_CONFIDENCE');
    expect(R096_REJECTED_SHORTCUTS).toContain('INCONCLUSIVE_EQUALS_FALSE');
    expect(R096_REJECTED_SHORTCUTS).toContain('UNVERIFIED_EQUALS_CONTRADICTED');
    expect(R096_REJECTED_SHORTCUTS).toContain('VERIFIED_BOUNDED_EQUALS_UNIVERSAL');
    expect(R096_AUTHORITY.verifiedBoundedMeansUniversal).toBe(false);
    expect(R096_AUTHORITY.divergentPreservesPlurality).toBe(true);
    expect(R096_AUTHORITY.inconclusiveCoercesToFalse).toBe(false);
    expect(R096_AUTHORITY.unverifiedEqualsContradicted).toBe(false);
  });

  it('requires separate governance before any future numeric calibration', () => {
    expect(R096_FUTURE_NUMERIC_CALIBRATION_REQUIREMENTS).toContain(
      'SEPARATELY_GOVERNED_CALIBRATION_STUDY',
    );
    expect(R096_FUTURE_NUMERIC_CALIBRATION_REQUIREMENTS).toContain(
      'ERROR_AND_UNCERTAINTY_ANALYSIS',
    );
    expect(R096_AUTHORITY.numericCalibrationAuthorized).toBe(false);
  });

  it('does not promote evidence-state labels into Production authority', () => {
    expect(R096_AUTHORITY).toEqual({
      status: 'QUALITATIVE_EVIDENCE_STATE_MODEL_ONLY',
      arithmeticAggregationAuthorized: false,
      implicitOrdinalRankingAuthorized: false,
      dimensionSnapshotAutoDerivesState: false,
      stateTransitionRequiresEvidenceEvent: true,
      stateHistoryAppendOnly: true,
      monotonicProgressionAssumed: false,
      verifiedBoundedMeansUniversal: false,
      divergentPreservesPlurality: true,
      inconclusiveCoercesToFalse: false,
      unverifiedEqualsContradicted: false,
      numericCalibrationAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
