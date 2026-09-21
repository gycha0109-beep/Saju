import { describe, expect, it } from 'vitest';
import {
  R093_AUTHORITY,
  R093_CLAIM_PROVENANCE_GRAPH_VERSION,
  R093_EDGE_BINDING_STATES,
  R093_EDGE_REQUIREMENTS,
  R093_EDGE_REVIEW_STATES,
  R093_EDGE_TYPES,
  R093_FIXED_ENDPOINT_RULES,
  R093_NODE_TYPES,
  R093_REJECTED_SHORTCUTS,
  R093_RELATIONS_REQUIRING_EXPLICIT_ENDPOINT_REGISTRY,
  R093_REQUIRED_EDGE_FIELDS,
} from '../src/research/general-natal-claim-provenance-graph.js';

describe('R093 claim-level provenance graph', () => {
  it('connects existing identity and claim layers without owning R091 identities', () => {
    expect(R093_CLAIM_PROVENANCE_GRAPH_VERSION).toBe('0.2.0-research');
    expect(R093_NODE_TYPES).toHaveLength(9);
    expect(R093_NODE_TYPES).toContain('SOURCE_PROPOSITION');
    expect(R093_NODE_TYPES).toContain('PRODUCT_CLAIM_CONTENT_HASH');
    expect(R093_AUTHORITY.identityOwnership).toBe('R091_REFERENCED_NOT_DUPLICATED');
  });

  it('separates review state from passage-binding completeness', () => {
    expect(R093_EDGE_REVIEW_STATES).toEqual([
      'VERIFIED',
      'REVIEWED',
      'INCONCLUSIVE',
    ]);
    expect(R093_EDGE_BINDING_STATES).toEqual([
      'EXACT',
      'PARTIAL',
      'MISSING',
    ]);
    expect(R093_EDGE_REVIEW_STATES).not.toContain('MISSING');
    expect(R093_EDGE_REQUIREMENTS.reviewStateSeparatedFromBindingState).toBe(true);
  });

  it('requires explicit edge scope, evidence, and gap provenance', () => {
    expect(R093_REQUIRED_EDGE_FIELDS).toContain('SCOPE_REF');
    expect(R093_REQUIRED_EDGE_FIELDS).toContain('EVIDENCE_REFS');
    expect(R093_REQUIRED_EDGE_FIELDS).toContain('GAP_REASON_REF_IF_NOT_EXACT');
    expect(R093_EDGE_REQUIREMENTS.exactBindingRequiresExactEvidenceRef).toBe(true);
    expect(R093_EDGE_REQUIREMENTS.nonExactBindingRequiresGapReasonRef).toBe(true);
  });

  it('constrains source-binding relations to directed endpoint contracts', () => {
    expect(R093_EDGE_TYPES).toHaveLength(12);
    expect(R093_FIXED_ENDPOINT_RULES).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          relation: 'PASSAGE_IN',
          from: ['PASSAGE'],
          to: ['WITNESS'],
        }),
        expect.objectContaining({
          relation: 'SUPPORTS',
          from: ['SOURCE_PROPOSITION'],
          to: ['RESEARCH_CLAIM'],
        }),
        expect.objectContaining({
          relation: 'EMITS',
          from: ['RULE_VERSION'],
          to: ['PRODUCT_CLAIM_CONTENT_HASH'],
        }),
      ]),
    );
    expect(R093_RELATIONS_REQUIRING_EXPLICIT_ENDPOINT_REGISTRY).toContain(
      'IMPLEMENTED_BY',
    );
    expect(R093_EDGE_REQUIREMENTS.arbitraryKnownRelationNodePairsAuthorized).toBe(false);
  });

  it('keeps missing bindings explicit and rejects transitive support inference', () => {
    expect(R093_REJECTED_SHORTCUTS).toContain('MISSING_BINDING_COUNTS_AS_EXACT');
    expect(R093_REJECTED_SHORTCUTS).toContain(
      'TRANSITIVE_SUPPORT_WITHOUT_EXPLICIT_EDGE',
    );
    expect(R093_EDGE_REQUIREMENTS.transitiveSupportImplicitlyAuthorized).toBe(false);
    expect(R093_AUTHORITY.transitiveSupportAuthorized).toBe(false);
  });

  it('preserves contradictory evidence without source-count winner selection', () => {
    expect(R093_EDGE_REQUIREMENTS.conflictingEdgesMayCoexist).toBe(true);
    expect(R093_REJECTED_SHORTCUTS).toContain('SOURCE_COUNT_EQUALS_CONFIDENCE');
    expect(R093_REJECTED_SHORTCUTS).toContain(
      'CONTRADICTION_AUTO_RESOLVED_BY_MAJORITY',
    );
    expect(R093_AUTHORITY.sourceCountConfidenceAuthorized).toBe(false);
    expect(R093_AUTHORITY.majorityConflictResolutionAuthorized).toBe(false);
  });

  it('does not propagate Production authority from graph connectivity', () => {
    expect(R093_AUTHORITY).toEqual({
      status: 'CLAIM_LEVEL_PROVENANCE_GRAPH_CONTRACT_DEFINED',
      nodeTypeCount: 9,
      edgeTypeCount: 12,
      identityOwnership: 'R091_REFERENCED_NOT_DUPLICATED',
      automaticAuthorityPropagation: false,
      transitiveSupportAuthorized: false,
      sourceCountConfidenceAuthorized: false,
      majorityConflictResolutionAuthorized: false,
      graphConnectivityPromotesProduction: false,
      productionAuthorityPromoted: false,
    });
  });
});
