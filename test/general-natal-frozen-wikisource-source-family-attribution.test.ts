import { describe, expect, it } from 'vitest';
import {
  R009_ATTRIBUTION_FINDINGS,
  R009_AUTHORITY,
  R009_DIRECT_SCAN_NEGATIVE_COMPARATORS,
  R009_DISCOVERY_SURFACES,
  R009_FAMILY_HYPOTHESIS,
  R009_FROZEN_TARGETS,
  R009_FROZEN_WIKISOURCE_ATTRIBUTION_VERSION,
  R009_REJECTED_SHORTCUTS,
  R009_REQUIRED_NEXT_EVIDENCE,
} from '../src/research/general-natal-frozen-wikisource-source-family-attribution.js';

describe('R009 frozen Wikisource source-family attribution', () => {
  it('keeps the four frozen targets exact and unnormalized', () => {
    expect(R009_FROZEN_WIKISOURCE_ATTRIBUTION_VERSION).toBe('0.1.0-research');
    expect(R009_FROZEN_TARGETS).toEqual([
      '財旺生官',
      '煞化為印',
      '比劫羊刃，財格大忌',
      '印綬見財',
    ]);
  });

  it('records inspected scan divergence without claiming family-wide absence', () => {
    expect(R009_DIRECT_SCAN_NEGATIVE_COMPARATORS).toHaveLength(6);
    expect(R009_ATTRIBUTION_FINDINGS).toContain(
      'INSPECTED_REGISTERED_SCAN_SURFACES_DIVERGE_IN_FROZEN_CONTEXT',
    );
    expect(R009_REJECTED_SHORTCUTS).toContain(
      'NO_MATCH_IN_INSPECTED_COPY_EQUALS_FAMILY_WIDE_ABSENCE',
    );
  });

  it('uses secondary web copies only as discovery evidence', () => {
    expect(R009_DISCOVERY_SURFACES).toHaveLength(4);
    for (const surface of R009_DISCOVERY_SURFACES) {
      expect(surface.registeredScanIdentity).toBe(false);
      expect(surface.independentProvenanceEstablished).toBe(false);
    }
    expect(R009_REJECTED_SHORTCUTS).toContain(
      'DIFFERENT_WEBSITES_EQUALS_INDEPENDENT_PROVENANCE',
    );
  });

  it('preserves a bounded 增補四言獨步 family hypothesis without inventing edition identity', () => {
    expect(R009_FAMILY_HYPOTHESIS).toEqual({
      label: 'EXPANDED_OR_ZENGBU_SIYAN_DUBU_WEB_TRANSMISSION',
      evidenceState: 'INCONCLUSIVE',
      descriptiveFamilyHypothesisSupported: true,
      exactEditionIdentityEstablished: false,
      exactWitnessLineageEstablished: false,
      r091Relationship: 'WITNESS_OF_WORK_EDITION_UNKNOWN',
    });
    expect(R009_ATTRIBUTION_FINDINGS).toContain(
      'SECONDARY_WEB_FAMILY_LABELS_SIMILAR_LONG_BLOCK_ZENGBU_SIYAN_DUBU',
    );
    expect(R009_ATTRIBUTION_FINDINGS).toContain('EXACT_PRINTED_EDITION_NOT_ESTABLISHED');
  });

  it('requires direct or reproducible provenance evidence before exact attribution', () => {
    expect(R009_REQUIRED_NEXT_EVIDENCE).toEqual([
      'SCAN_OR_REPRODUCTION_WITH_BOUNDED_ZENGBU_SIYAN_SURFACE',
      'DOCUMENTED_TRANSCRIPTION_SOURCE_PLUS_REPRODUCIBLE_IMAGE',
      'WIKISOURCE_IMPORT_OR_EDIT_PROVENANCE_TIED_TO_A_WITNESS',
      'REVIEWED_STEMMA_WITHOUT_ORTHOGRAPHIC_COLLAPSE',
    ]);
  });

  it('does not convert orthographic similarity or section labels into witness identity', () => {
    expect(R009_REJECTED_SHORTCUTS).toContain(
      'ORTHOGRAPHIC_VARIANT_EQUALS_FROZEN_HASH_MATCH',
    );
    expect(R009_REJECTED_SHORTCUTS).toContain(
      'WIKISOURCE_SECTION_HEADING_EQUALS_HISTORICAL_SECTION_IDENTITY',
    );
    expect(R009_REJECTED_SHORTCUTS).toContain(
      'FAMILY_HYPOTHESIS_EQUALS_R091_EDITION_IDENTITY',
    );
  });

  it('ends inconclusive for exact edition with no authority promotion', () => {
    expect(R009_AUTHORITY).toEqual({
      status: 'INCONCLUSIVE_EXACT_EDITION_BOUNDED_FAMILY_HYPOTHESIS',
      frozenWitnessDefinitionChanged: false,
      frozenDigestChanged: false,
      exactPrintedEditionAttributed: false,
      exactWitnessLineageAttributed: false,
      sourceTierPromoted: false,
      provenanceQualityPromoted: false,
      lifecyclePromoted: false,
      productionAuthorityPromoted: false,
    });
  });
});
