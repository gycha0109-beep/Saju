import { describe, expect, it } from 'vitest';

import { buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation } from '../src/research/general-natal-conclusion-t8-yuanhai-line-sequence-collation.js';

describe('General Natal conclusion T8 Yuanhai line-sequence collation', () => {
  it('pins the bounded Tianyi / NLC 1634 opening correspondence', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation();

    expect(evidence.issue).toBe('#918');
    expect(evidence.sources.tianyi.sectionTitleDigitalScanPage).toBe(113);
    expect(evidence.sources.nlc1634.sectionTitleDigitalScanPage).toBe(16);
    expect(evidence.collation.sharedOpeningAnchors).toEqual([
      '先天何處',
      '後天何處',
      '要知來處',
      '便知去處',
      '四柱排定',
      '三才次分',
      '年干為本',
      '配合元辰',
      '神煞相伴',
      '輕重較量',
      '先觀月令',
      '論格推詳',
      '以日為主',
      '專論財官',
      '分其貴賤',
      '妙法多端',
    ]);
    expect(evidence.collation.sharedOpeningAnchorCount).toBe(16);
    expect(evidence.collation.openingSequenceOrderMatches).toBe(true);
  });

  it('keeps the shared variant anchors bounded and does not promote frozen witnesses', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation();

    expect(evidence.collation.knownSharedVariantAnchors).toEqual([
      '印綬根深',
      '先財後印',
      '先印後財',
    ]);
    expect(evidence.collation.knownSharedVariantAnchorCount).toBe(3);
    expect(evidence.collation.bothBoundedSurfacesEstablishFrozenExactWitnessCount).toBe(0);
    expect(evidence.collation.tianyiSameStringOutsideFrozenContext).toEqual({
      exactString: '財旺生官',
      digitalScanPage: 112,
      acceptedAsFrozenWitness: false,
    });
    expect(evidence.collation.nlc1634SameStringOutsideFrozenContext).toEqual({
      exactString: '財旺生官',
      acceptedAsFrozenWitness: false,
    });
  });

  it('does not infer full-edition identity or production authority from bounded correspondence', () => {
    const evidence = buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation();

    expect(evidence.verdict).toEqual({
      boundedSequenceCorrespondenceEstablished: true,
      fullEditionIdentityEstablished: false,
      frozenWitnessMutationAuthorized: false,
      orthographicNormalizationAuthorized: false,
      productionAuthorityPromotionAuthorized: false,
    });
  });

  it('is deterministic for identical upstream evidence', () => {
    expect(buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation()).toEqual(
      buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation(),
    );
  });
});
