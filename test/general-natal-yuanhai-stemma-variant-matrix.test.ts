import { describe, expect, it } from 'vitest';
import {
  R010_AUTHORITY,
  R010_ESTABLISHED_AFFINITY_EDGES,
  R010_FROZEN_WIKISOURCE,
  R010_R004_OPENING,
  R010_R005_VARIANT,
  R010_REJECTED_SHORTCUTS,
  R010_SURFACES,
  R010_UNRESOLVED_EDGES,
  R010_VARIANT_DIMENSIONS,
  R010_YUANHAI_STEMMA_VARIANT_MATRIX_VERSION,
} from '../src/research/general-natal-yuanhai-stemma-variant-matrix.js';

describe('R010 Yuanhai bounded stemma / variant matrix', () => {
  it('registers seven bounded comparison surfaces without inventing genealogy', () => {
    expect(R010_YUANHAI_STEMMA_VARIANT_MATRIX_VERSION).toBe('0.1.0-research');
    expect(R010_SURFACES).toHaveLength(7);
    expect(new Set(R010_SURFACES.map((x) => x.id)).size).toBe(7);
    expect(R010_SURFACES.every((x) => x.genealogicalPlacement === 'UNRESOLVED')).toBe(true);
  });

  it('preserves the R004 Tianyi-NLC1634 bounded 16-anchor correspondence', () => {
    expect(R010_R004_OPENING).toEqual({
      sharedAnchorCount: 16,
      openingSequenceOrderMatches: true,
      laterRecordedSharedAnchors: ['印綬根深', '先財後印', '先印後財'],
      fullEditionIdentityEstablished: false,
    });
    expect(R010_ESTABLISHED_AFFINITY_EDGES[0]).toMatchObject({
      left: 'TIANYI_CHONGZHEN',
      right: 'NLC_1634_YUSHI_SHANCHENGTANG',
      relation: 'BOUNDED_SEQUENCE_CORRESPONDENCE',
      genealogicalDirection: 'UNKNOWN',
    });
  });

  it('preserves the R005 Zhuji lexical divergence instead of collapsing it', () => {
    expect(R010_R005_VARIANT.exactSharedOpeningAnchorCount).toBe(15);
    expect(R010_R005_VARIANT.lexicalVariant).toEqual({
      position: 12,
      r004MingReading: '論格推詳',
      zhujiReading: '論格要精',
    });
    expect(R010_R005_VARIANT.exactOpeningIdentityEstablished).toBe(false);
    expect(R010_R005_VARIANT.boundedFamilyCorrespondenceEstablished).toBe(true);
  });

  it('keeps the frozen Wikisource witness edition-unknown under R009', () => {
    expect(R010_FROZEN_WIKISOURCE).toEqual({
      witnessId: 'WIKISOURCE_OLDID_2593607',
      r091Relationship: 'WITNESS_OF_WORK_EDITION_UNKNOWN',
      familyHypothesis: 'EXPANDED_OR_ZENGBU_SIYAN_DUBU_WEB_TRANSMISSION',
      familyHypothesisEvidenceState: 'INCONCLUSIVE',
      exactPrintedEditionEstablished: false,
      exactWitnessLineageEstablished: false,
      stemmaEdgeToPrintedEditionEstablished: false,
    });
  });

  it('keeps unresolved relationships explicit rather than treating unknown as independence', () => {
    expect(R010_UNRESOLVED_EDGES).toContain(
      'WIKISOURCE_FROZEN_TO_ANY_REGISTERED_PRINTED_EDITION',
    );
    expect(R010_UNRESOLVED_EDGES).toContain('UNINSPECTED_ACQUISITION_TARGETS_TO_INSPECTED_SURFACES');
    expect(R010_REJECTED_SHORTCUTS).toContain('UNKNOWN_EDGE_EQUALS_INDEPENDENT');
  });

  it('uses separate variant dimensions and no numeric similarity score', () => {
    expect(R010_VARIANT_DIMENSIONS).toContain('OPENING_ANCHOR_SEQUENCE');
    expect(R010_VARIANT_DIMENSIONS).toContain('CORRESPONDING_SLOT_LEXICAL_VARIANT');
    expect(R010_VARIANT_DIMENSIONS).toContain('FROZEN_CONTEXT_EXACT_WITNESS_COUNT');
    expect(R010_VARIANT_DIMENSIONS).toContain('GENEALOGICAL_DIRECTION');
    expect(R010_AUTHORITY.numericSimilarityScoreIntroduced).toBe(false);
  });

  it('rejects textual similarity shortcuts to edition or ancestry claims', () => {
    expect(R010_REJECTED_SHORTCUTS).toContain('SHARED_OPENING_EQUALS_SAME_EDITION');
    expect(R010_REJECTED_SHORTCUTS).toContain('SHARED_OPENING_EQUALS_REPRINT_RELATION');
    expect(R010_REJECTED_SHORTCUTS).toContain('FOUR_OF_FOUR_EQUALS_DIRECT_ANCESTRY');
    expect(R010_REJECTED_SHORTCUTS).toContain(
      'FAMILY_HYPOTHESIS_EQUALS_EDITION_IDENTITY',
    );
  });

  it('publishes a bounded affinity matrix without Production authority', () => {
    expect(R010_AUTHORITY).toEqual({
      status: 'BOUNDED_TEXTUAL_AFFINITY_MATRIX_ESTABLISHED_GENEALOGICAL_STEMMA_UNRESOLVED',
      surfaceCount: 7,
      establishedAffinityEdgeCount: 3,
      directedGenealogicalEdgeCount: 0,
      numericSimilarityScoreIntroduced: false,
      unknownMeansIndependent: false,
      witnessDefinitionChanged: false,
      sourceTierPromoted: false,
      provenanceQualityPromoted: false,
      lifecyclePromoted: false,
      productionAuthorityPromoted: false,
    });
  });
});
