import { describe, expect, it } from 'vitest';
import {
  R096_AUTHORITY,
  R096_EVIDENCE_STATE_MODEL_VERSION,
  R096_ORTHOGONAL_DIMENSIONS,
  R096_PRIMARY_STATES,
  R096_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-evidence-confidence-state.js';

describe('R096 evidence confidence/state model', () => {
  it('keeps bounded, divergent, inconclusive, and pending states distinct', () => {
    expect(R096_EVIDENCE_STATE_MODEL_VERSION).toBe('0.1.0-research');
    expect(R096_PRIMARY_STATES).toHaveLength(8);
    expect(R096_PRIMARY_STATES).toContain('VERIFIED_BOUNDED');
    expect(R096_PRIMARY_STATES).toContain('DIVERGENT_BY_SOURCE_OR_SCHOOL');
    expect(R096_PRIMARY_STATES).toContain('INCONCLUSIVE');
    expect(R096_PRIMARY_STATES).toContain('EXECUTION_PENDING');
  });

  it('keeps evidence dimensions orthogonal instead of summed', () => {
    expect(R096_ORTHOGONAL_DIMENSIONS).toHaveLength(8);
    expect(R096_ORTHOGONAL_DIMENSIONS).toContain('PASSAGE_BINDING_COMPLETENESS');
    expect(R096_ORTHOGONAL_DIMENSIONS).toContain('SOURCE_INDEPENDENCE_OR_DERIVATION');
  });

  it('rejects numeric and hidden aggregate confidence', () => {
    expect(R096_REJECTED_SHORTCUTS).toContain('NUMERIC_CONFIDENCE_PERCENTAGE');
    expect(R096_REJECTED_SHORTCUTS).toContain('SOURCE_COUNT_SCORE');
    expect(R096_REJECTED_SHORTCUTS).toContain('HIDDEN_WEIGHTED_SUM');
  });

  it('preserves bounded and inconclusive semantics', () => {
    expect(R096_AUTHORITY).toEqual({
      status:'QUALITATIVE_EVIDENCE_STATE_MODEL_ONLY',
      arithmeticAggregationAuthorized:false,
      stateTransitionRequiresEvidenceEvent:true,
      verifiedBoundedMeansUniversal:false,
      divergentPreservesPlurality:true,
      inconclusiveCoercesToFalse:false,
      productionAuthorityPromoted:false,
    });
  });
});
