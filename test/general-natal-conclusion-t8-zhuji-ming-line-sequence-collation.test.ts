import { describe, expect, it } from 'vitest';

import { buildGeneralNatalConclusionT8ZhujiMingLineSequenceCollation } from '../src/research/general-natal-conclusion-t8-zhuji-ming-line-sequence-collation.js';

describe('General Natal conclusion T8 Zhuji / Ming line-sequence collation', () => {
  it('records 15 exact shared opening anchors plus one lexical variant slot', () => {
    const evidence = buildGeneralNatalConclusionT8ZhujiMingLineSequenceCollation();

    expect(evidence.issue).toBe('#920');
    expect(evidence.sources.zhuji.sectionTitleDigitalScanPage).toBe(87);
    expect(evidence.sources.zhuji.inspectedDigitalScanPageRange).toEqual([87, 91]);
    expect(evidence.openingCollation.mingOpeningAnchorCount).toBe(16);
    expect(evidence.openingCollation.zhujiExactSharedOpeningAnchorCount).toBe(15);
    expect(evidence.openingCollation.lexicalVariants).toEqual([
      {
        position: 12,
        mingReading: '論格推詳',
        zhujiReading: '論格要精',
        relation: 'LEXICAL_VARIANT_SAME_SEQUENCE_SLOT',
      },
    ]);
    expect(evidence.openingCollation.sequenceSlotCorrespondenceEstablished).toBe(true);
    expect(evidence.openingCollation.exactOpeningIdentityEstablished).toBe(false);
  });

  it('keeps later recorded anchors bounded without inferring absence', () => {
    const evidence = buildGeneralNatalConclusionT8ZhujiMingLineSequenceCollation();

    expect(evidence.laterRecordedAnchors.mingRecordedSharedVariantAnchors).toEqual([
      '印綬根深',
      '先財後印',
      '先印後財',
    ]);
    expect(evidence.laterRecordedAnchors.zhujiRecordedAnchors).toEqual([
      '先印後財',
      '反成其辱',
    ]);
    expect(evidence.laterRecordedAnchors.exactSharedRecordedAnchors).toEqual(['先印後財']);
    expect(evidence.laterRecordedAnchors.absenceInferenceAuthorized).toBe(false);
    expect(evidence.sources.zhuji.exactFrozenWitnessCountEstablished).toBe(0);
  });

  it('does not promote bounded correspondence into full identity or production authority', () => {
    const evidence = buildGeneralNatalConclusionT8ZhujiMingLineSequenceCollation();

    expect(evidence.verdict).toEqual({
      boundedFamilyCorrespondenceEstablished: true,
      lexicalDivergenceEstablished: true,
      fullEditionIdentityEstablished: false,
      frozenWitnessMutationAuthorized: false,
      orthographicNormalizationAuthorized: false,
      productionAuthorityPromotionAuthorized: false,
    });
  });

  it('is deterministic for identical upstream evidence', () => {
    expect(buildGeneralNatalConclusionT8ZhujiMingLineSequenceCollation()).toEqual(
      buildGeneralNatalConclusionT8ZhujiMingLineSequenceCollation(),
    );
  });
});
