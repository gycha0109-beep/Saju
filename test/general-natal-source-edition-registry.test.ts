import { describe, expect, it } from 'vitest';
import {
  R091_AUTHORITY,
  R091_EDITION_FIELDS,
  R091_IDENTITY_LAYERS,
  R091_INITIAL_WORKS,
  R091_REJECTED_SHORTCUTS,
  R091_RELATIONSHIP_TYPES,
  R091_RELATION_ASSERTION_RULES,
  R091_REQUIRED_WITNESS_FIELDS,
  R091_SOURCE_EDITION_REGISTRY_VERSION,
  R091_WITNESS_STABILITY_STATES,
} from '../src/research/general-natal-source-edition-registry.js';

describe('R091 source/edition identity registry', () => {
  it('separates work, edition, and witness identities', () => {
    expect(R091_SOURCE_EDITION_REGISTRY_VERSION).toBe('0.2.0-research');
    expect(R091_IDENTITY_LAYERS).toEqual([
      'WORK_IDENTITY',
      'EDITION_IDENTITY',
      'WITNESS_IDENTITY',
    ]);
  });

  it('preserves unknown lineage instead of inferring independence', () => {
    expect(R091_RELATIONSHIP_TYPES).toContain('UNKNOWN');
    expect(R091_RELATIONSHIP_TYPES).toContain('WITNESS_OF_WORK_EDITION_UNKNOWN');
    expect(R091_RELATION_ASSERTION_RULES).toContain(
      'NON_UNKNOWN_RELATION_REQUIRES_EVIDENCE_REFS',
    );
    expect(R091_RELATION_ASSERTION_RULES).toContain(
      'UNKNOWN_LINEAGE_REMAINS_UNKNOWN',
    );
  });

  it('registers work identities without fabricating edition metadata', () => {
    expect(R091_INITIAL_WORKS).toHaveLength(4);
    expect(R091_INITIAL_WORKS.every((x) => x.editionIdentity === null)).toBe(true);
    expect(R091_EDITION_FIELDS).toContain('ASSERTED_FIELD_EVIDENCE_REFS');
    expect(R091_AUTHORITY.assertedMetadataRequiresEvidence).toBe(true);
  });

  it('distinguishes reproducible snapshots from mutable locator-only witnesses', () => {
    expect(R091_WITNESS_STABILITY_STATES).toEqual([
      'REPRODUCIBLE_SNAPSHOT',
      'LOCATOR_ONLY_MUTABLE',
      'INSUFFICIENT',
    ]);
    expect(R091_REQUIRED_WITNESS_FIELDS).toContain('CONTENT_CHECKSUM_IF_REPRODUCIBLE');
    expect(R091_REQUIRED_WITNESS_FIELDS).toContain('WITNESS_STABILITY_STATE');
    expect(R091_AUTHORITY.mutableLocatorCountsAsImmutableWitness).toBe(false);
  });

  it('keeps the identity registry subordinate to existing source metadata contracts', () => {
    expect(R091_REJECTED_SHORTCUTS).toContain(
      'IDENTITY_REGISTRY_REPLACES_SOURCE_REFERENCE',
    );
    expect(R091_AUTHORITY.normalizationLayerOnly).toBe(true);
    expect(R091_AUTHORITY.replacesSourceReference).toBe(false);
  });

  it('rejects URL and registry-membership provenance shortcuts', () => {
    expect(R091_REJECTED_SHORTCUTS).toContain(
      'DIFFERENT_WEBSITE_EQUALS_INDEPENDENT_PROVENANCE',
    );
    expect(R091_REJECTED_SHORTCUTS).toContain(
      'REGISTRY_MEMBERSHIP_EQUALS_TEXT_VERIFICATION',
    );
    expect(R091_AUTHORITY.registryMembershipVerifiesText).toBe(false);
    expect(R091_AUTHORITY.websiteIndependenceAssumptionAuthorized).toBe(false);
  });

  it('keeps provenance tier and Production authority unpromoted', () => {
    expect(R091_AUTHORITY).toEqual({
      status: 'IDENTITY_NORMALIZATION_LAYER_DEFINED',
      initialWorkCount: 4,
      normalizationLayerOnly: true,
      replacesSourceReference: false,
      assertedMetadataRequiresEvidence: true,
      mutableLocatorCountsAsImmutableWitness: false,
      registryMembershipVerifiesText: false,
      editionMetadataFabricationAuthorized: false,
      websiteIndependenceAssumptionAuthorized: false,
      provenanceTierPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
