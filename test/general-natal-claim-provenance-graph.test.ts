import { describe, expect, it } from 'vitest';
import {
  R093_AUTHORITY,
  R093_CLAIM_PROVENANCE_GRAPH_VERSION,
  R093_EDGE_EVIDENCE_STATES,
  R093_EDGE_REQUIREMENTS,
  R093_EDGE_TYPES,
  R093_NODE_TYPES,
  R093_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-claim-provenance-graph.js';

describe('R093 claim-level provenance graph', () => {
  it('connects source identity through exact product-claim content hashes', () => {
    expect(R093_CLAIM_PROVENANCE_GRAPH_VERSION).toBe('0.1.0-research');
    expect(R093_NODE_TYPES).toHaveLength(9);
    expect(R093_NODE_TYPES).toContain('SOURCE_PROPOSITION');
    expect(R093_NODE_TYPES).toContain('PRODUCT_CLAIM_CONTENT_HASH');
  });

  it('preserves support, contradiction, derivation, and emission edges separately', () => {
    expect(R093_EDGE_TYPES).toHaveLength(12);
    expect(R093_EDGE_TYPES).toContain('SUPPORTS');
    expect(R093_EDGE_TYPES).toContain('CONTRADICTS');
    expect(R093_EDGE_TYPES).toContain('EMITS');
  });

  it('keeps missing passage bindings explicit', () => {
    expect(R093_EDGE_EVIDENCE_STATES).toContain('MISSING_BINDING');
    expect(R093_EDGE_REQUIREMENTS.missingBindingMustRemainExplicit).toBe(true);
    expect(R093_EDGE_REQUIREMENTS.transitiveSupportImplicitlyAuthorized).toBe(false);
  });

  it('rejects source-count confidence and automatic majority resolution', () => {
    expect(R093_REJECTED_SHORTCUTS).toContain('SOURCE_COUNT_EQUALS_CONFIDENCE');
    expect(R093_REJECTED_SHORTCUTS).toContain('CONTRADICTION_AUTO_RESOLVED_BY_MAJORITY');
  });

  it('does not propagate Production authority automatically', () => {
    expect(R093_AUTHORITY).toEqual({
      status:'CLAIM_LEVEL_PROVENANCE_GRAPH_CONTRACT_DEFINED',
      nodeTypeCount:9,
      edgeTypeCount:12,
      automaticAuthorityPropagation:false,
      sourceCountConfidenceAuthorized:false,
      productionAuthorityPromoted:false,
    });
  });
});
