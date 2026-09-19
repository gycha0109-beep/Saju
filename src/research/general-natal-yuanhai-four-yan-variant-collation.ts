import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const GENERAL_NATAL_YUANHAI_FOUR_YAN_VARIANT_COLLATION_VERSION =
  'myeonghwa-general-natal-yuanhai-four-yan-variant-collation-v1' as const;

const SHARED_DIRECT_OPENING_ANCHORS = Object.freeze([
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
] as const);

const FROZEN_WITNESSES = Object.freeze([
  '財旺生官',
  '煞化為印',
  '比劫羊刃，財格大忌',
  '印綬見財',
] as const);

export function buildGeneralNatalYuanhaiFourYanVariantCollation() {
  const material = {
    evidenceVersion: GENERAL_NATAL_YUANHAI_FOUR_YAN_VARIANT_COLLATION_VERSION,
    issue: '#911' as const,
    auditBaseSha: '194c91b45f128dacb119e6faa658e0c999e6501d' as const,
    status: 'BOUNDED_DIRECT_OPENING_SEQUENCE_CORRESPONDENCE_ESTABLISHED' as const,
    surfaces: Object.freeze([
      Object.freeze({
        surfaceId: 'TIANYI-CHONGZHEN-330000-1705-0005007',
        holdingInstitution: 'Tianyi Pavilion Museum',
        edition: '明崇禎刻本',
        exactAssetSha1: '2ec904422ced60bf241286c6b822623048bb8883',
        sectionTitlePage: 113,
        inspectedPageRange: Object.freeze([113, 116] as const),
        sharedOpeningAnchorsDirectlyObserved: true as const,
        variantAnchorsDirectlyObserved: Object.freeze([
          '印綬根深',
          '先財後印',
          '先印後財',
        ] as const),
        frozenExactWitnessCountInBoundedSurface: 0 as const,
        transitionObservation:
          'digital p116 enters following 身弱論 / 棄命從殺論 material' as const,
      }),
      Object.freeze({
        surfaceId: 'NLC-1634-YUSHI-SHANCHENGTANG-149659',
        holdingInstitution: 'National Library of China',
        edition: '余氏善成堂 / 明崇禎7年 [1634]',
        relevantDigitization: 'NLC892-411999032112-149659',
        sectionTitlePage: 16,
        inspectedPageRange: Object.freeze([16, 19] as const),
        sharedOpeningAnchorsDirectlyObserved: true as const,
        scanLinkedVariantAnchors: Object.freeze([
          '印殺相輕',
          '印綬根深',
          '先財後印',
          '先印後財',
        ] as const),
        frozenExactWitnessCountInBoundedSurface: 0 as const,
        transitionObservation:
          'digital p19 directly exposes transition into 棄命從殺論' as const,
      }),
    ] as const),
    sharedDirectOpeningAnchors: SHARED_DIRECT_OPENING_ANCHORS,
    frozenWitnesses: FROZEN_WITNESSES,
    comparison: Object.freeze({
      sharedDirectOpeningAnchorCount: SHARED_DIRECT_OPENING_ANCHORS.length,
      openingOrderAgreementEstablished: true as const,
      bothBoundedSurfacesFrozenExactFourCount: 0 as const,
      sharedVariantAnchorsAcrossDirectAndScanLinkedEvidence: Object.freeze([
        '印綬根深',
        '先財後印',
        '先印後財',
      ] as const),
      pageLayoutIdentityClaimed: false as const,
      completeLineForLineIdentityClaimed: false as const,
      stemmaticAncestryClaimed: false as const,
      observableVariantFamilyCorrespondence:
        'STRONG_BOUNDED_CORRESPONDENCE' as const,
    }),
    authorityBoundary: Object.freeze({
      directEvidenceSupportsSharedOpeningOrder: true as const,
      directEvidenceSupportsFrozenFour: false as const,
      collationMayEstablishTextualCorrespondence: true as const,
      collationMayEstablishCopyAncestry: false as const,
      productOrProductionDependencyIntroduced: false as const,
    }),
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
