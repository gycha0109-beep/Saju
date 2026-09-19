import { describe, expect, it } from 'vitest';
import {
  R091_AUTHORITY,
  R091_IDENTITY_LAYERS,
  R091_INITIAL_WORKS,
  R091_REJECTED_SHORTCUTS,
  R091_RELATIONSHIP_TYPES,
  R091_REQUIRED_WITNESS_FIELDS,
  R091_SOURCE_EDITION_REGISTRY_VERSION,
} from '../src/research/general-natal-source-edition-registry.js';

describe('R091 source/edition identity registry', () => {
  it('separates work, edition, and witness identities', () => {
    expect(R091_SOURCE_EDITION_REGISTRY_VERSION).toBe('0.1.0-research');
    expect(R091_IDENTITY_LAYERS).toEqual([
      'WORK_IDENTITY','EDITION_IDENTITY','WITNESS_IDENTITY',
    ]);
  });

  it('preserves unknown lineage relationships explicitly', () => {
    expect(R091_RELATIONSHIP_TYPES).toContain('UNKNOWN');
    expect(R091_RELATIONSHIP_TYPES).toContain('WITNESS_OF_WORK_EDITION_UNKNOWN');
  });

  it('registers work identities without fabricating edition metadata', () => {
    expect(R091_INITIAL_WORKS).toHaveLength(4);
    expect(R091_INITIAL_WORKS.every((x)=>x.editionIdentity === null)).toBe(true);
  });

  it('requires witness locator and checksum fields without pretending all checksums exist', () => {
    expect(R091_REQUIRED_WITNESS_FIELDS).toContain('PASSAGE_LOCATOR');
    expect(R091_REQUIRED_WITNESS_FIELDS).toContain('CONTENT_CHECKSUM_IF_REPRODUCIBLE');
  });

  it('rejects URL/website provenance shortcuts and keeps authority unpromoted', () => {
    expect(R091_REJECTED_SHORTCUTS).toContain('DIFFERENT_WEBSITE_EQUALS_INDEPENDENT_PROVENANCE');
    expect(R091_AUTHORITY).toEqual({
      status:'IDENTITY_LAYER_REGISTRY_DEFINED',
      initialWorkCount:4,
      editionMetadataFabricationAuthorized:false,
      websiteIndependenceAssumptionAuthorized:false,
      provenanceTierPromotionAuthorized:false,
      productionAuthorityPromoted:false,
    });
  });
});
