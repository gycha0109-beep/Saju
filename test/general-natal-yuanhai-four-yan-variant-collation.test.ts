import { describe, expect, it } from 'vitest';

import { buildGeneralNatalYuanhaiFourYanVariantCollation } from '../src/research/general-natal-yuanhai-four-yan-variant-collation.js';

describe('General Natal Yuanhai 四言獨步 variant collation', () => {
  it('pins the shared directly observed opening sequence without claiming stemmatic ancestry', () => {
    const evidence = buildGeneralNatalYuanhaiFourYanVariantCollation();

    expect(evidence.issue).toBe('#911');
    expect(evidence.sharedDirectOpeningAnchors).toEqual([
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

    expect(evidence.comparison).toEqual({
      sharedDirectOpeningAnchorCount: 16,
      openingOrderAgreementEstablished: true,
      bothBoundedSurfacesFrozenExactFourCount: 0,
      sharedVariantAnchorsAcrossDirectAndScanLinkedEvidence: [
        '印綬根深',
        '先財後印',
        '先印後財',
      ],
      pageLayoutIdentityClaimed: false,
      completeLineForLineIdentityClaimed: false,
      stemmaticAncestryClaimed: false,
      observableVariantFamilyCorrespondence: 'STRONG_BOUNDED_CORRESPONDENCE',
    });
  });

  it('keeps direct and scan-linked observations authority-separated', () => {
    const evidence = buildGeneralNatalYuanhaiFourYanVariantCollation();
    const tianyi = evidence.surfaces[0];
    const nlc = evidence.surfaces[1];

    expect(tianyi.sharedOpeningAnchorsDirectlyObserved).toBe(true);
    expect(tianyi.variantAnchorsDirectlyObserved).toEqual([
      '印綬根深',
      '先財後印',
      '先印後財',
    ]);

    expect(nlc.sharedOpeningAnchorsDirectlyObserved).toBe(true);
    expect(nlc.scanLinkedVariantAnchors).toEqual([
      '印殺相輕',
      '印綬根深',
      '先財後印',
      '先印後財',
    ]);

    expect(tianyi.frozenExactWitnessCountInBoundedSurface).toBe(0);
    expect(nlc.frozenExactWitnessCountInBoundedSurface).toBe(0);
  });

  it('does not turn textual correspondence into production or ancestry authority', () => {
    const evidence = buildGeneralNatalYuanhaiFourYanVariantCollation();

    expect(evidence.authorityBoundary).toEqual({
      directEvidenceSupportsSharedOpeningOrder: true,
      directEvidenceSupportsFrozenFour: false,
      collationMayEstablishTextualCorrespondence: true,
      collationMayEstablishCopyAncestry: false,
      productOrProductionDependencyIntroduced: false,
    });
  });

  it('is deterministic', () => {
    expect(buildGeneralNatalYuanhaiFourYanVariantCollation()).toEqual(
      buildGeneralNatalYuanhaiFourYanVariantCollation(),
    );
  });
});
