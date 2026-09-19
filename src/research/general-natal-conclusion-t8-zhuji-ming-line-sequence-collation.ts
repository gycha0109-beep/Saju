import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets } from './general-natal-conclusion-t8-yuanhai-acquisition-targets.js';
import { buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation } from './general-natal-conclusion-t8-yuanhai-line-sequence-collation.js';

export const GENERAL_NATAL_CONCLUSION_T8_ZHUJI_MING_LINE_SEQUENCE_COLLATION_VERSION =
  'myeonghwa-general-natal-conclusion-t8-zhuji-ming-line-sequence-collation-v1' as const;

const ZHUJI_EXACT_SHARED_OPENING_ANCHORS = Object.freeze([
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
  '以日為主',
  '專論財官',
  '分其貴賤',
  '妙法多端',
] as const);

export function buildGeneralNatalConclusionT8ZhujiMingLineSequenceCollation() {
  const acquisition = buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets();
  const ming = buildGeneralNatalConclusionT8YuanhaiLineSequenceCollation();
  const zhuji = acquisition.acquisitionTargets.find(
    (target) => target.targetId === 'ACQ-YUANHAI-ZJSLIB-FLDB-2458-DIGITAL',
  );

  if (
    zhuji?.targetId !== 'ACQ-YUANHAI-ZJSLIB-FLDB-2458-DIGITAL' ||
    !('directInspection' in zhuji) ||
    zhuji.directInspectionState !== 'DIRECTLY_INSPECTED'
  ) {
    throw new Error('Zhuji direct-inspection evidence is required for R005.');
  }

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_ZHUJI_MING_LINE_SEQUENCE_COLLATION_VERSION,
    issue: '#920' as const,
    auditBaseSha: '0c3fcb3c55d83380c9ad4a233dc7f6aecf5279fd' as const,
    status: 'BOUNDED_ZHUJI_MING_OPENING_SEQUENCE_CORRESPONDENCE_WITH_LEXICAL_VARIANT' as const,
    sources: Object.freeze({
      mingR004EvidenceId: ming.evidenceId,
      zhuji: Object.freeze({
        targetId: zhuji.targetId,
        holdingInstitution: zhuji.holdingInstitution,
        sectionTitleDigitalScanPage: zhuji.directInspection.sectionTitleDigitalScanPage,
        inspectedDigitalScanPageRange: zhuji.directInspection.inspectedDigitalScanPageRange,
        transitionDigitalScanPage: zhuji.directInspection.transitionDigitalScanPage,
        exactFrozenWitnessCountEstablished:
          zhuji.directInspection.exactFrozenWitnessCountEstablished,
      }),
    }),
    openingCollation: Object.freeze({
      mingOpeningAnchorCount: ming.collation.sharedOpeningAnchorCount,
      zhujiExactSharedOpeningAnchors: ZHUJI_EXACT_SHARED_OPENING_ANCHORS,
      zhujiExactSharedOpeningAnchorCount: ZHUJI_EXACT_SHARED_OPENING_ANCHORS.length,
      lexicalVariants: Object.freeze([
        Object.freeze({
          position: 12 as const,
          mingReading: '論格推詳' as const,
          zhujiReading: '論格要精' as const,
          relation: 'LEXICAL_VARIANT_SAME_SEQUENCE_SLOT' as const,
        }),
      ]),
      sequenceSlotCorrespondenceEstablished: true as const,
      exactOpeningIdentityEstablished: false as const,
    }),
    laterRecordedAnchors: Object.freeze({
      mingRecordedSharedVariantAnchors: ming.collation.knownSharedVariantAnchors,
      zhujiRecordedAnchors: Object.freeze(['先印後財', '反成其辱'] as const),
      exactSharedRecordedAnchors: Object.freeze(['先印後財'] as const),
      absenceInferenceAuthorized: false as const,
    }),
    verdict: Object.freeze({
      boundedFamilyCorrespondenceEstablished: true as const,
      lexicalDivergenceEstablished: true as const,
      fullEditionIdentityEstablished: false as const,
      frozenWitnessMutationAuthorized: false as const,
      orthographicNormalizationAuthorized: false as const,
      productionAuthorityPromotionAuthorized: false as const,
    }),
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
