import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey } from './general-natal-conclusion-t8-alternate-witness-surface-survey.js';

export const GENERAL_NATAL_CONCLUSION_T8_YUANHAI_ACQUISITION_TARGETS_VERSION =
  'myeonghwa-general-natal-conclusion-t8-yuanhai-acquisition-targets-v4' as const;

const UNRESOLVED_WITNESS_IDS = Object.freeze([
  'W-YUANHAI-WEALTH-OFFICER',
  'W-YUANHAI-OFFICER-RESOURCE',
  'W-YUANHAI-PEER-WEALTH',
  'W-YUANHAI-WEALTH-RESOURCE',
] as const);

const ACQUISITION_TARGETS = Object.freeze([
  Object.freeze({
    targetId: 'ACQ-YUANHAI-YULGOK-YG015-01-470',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'Gangwon Yulgok Korean Studies Archive',
    catalogIdentifier: 'YG015-01-470',
    title: '新刊合倂官板音義評註淵海子平 卷1~5',
    attributedAuthor: '徐大升',
    editionOrImprint: '石印本',
    materialExtent: '1 book',
    dimensions: '14.7 × 9.8 cm',
    relevantCoverage: '卷1~5; target 四言獨步 expected within relevant later volume surface',
    catalogUrl: 'https://db.yulgok.or.kr/data/media/EB000008_svc.pdf',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'OBTAIN_PAGE_IMAGES_OR_DIGITAL_REPRODUCTION_FOR_RELEVANT_VOLUME_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-TOKYO-IASA-BB19249231-4',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'University of Tokyo Institute for Advanced Studies on Asia Library',
    catalogIdentifier: 'CiNii NCID BB19249231 / fascicle [4] call 6402838715',
    title: '増補淵海子平音義評註',
    attributedAuthor: '(宋)徐升編 ; (明)楊淙増校',
    editionOrImprint: '上海錦章圖書局, [19--], 石印本',
    materialExtent: '6 fascicles total; target fascicle [4]',
    dimensions: '16 cm',
    relevantCoverage: 'fascicle [4], expected to carry 卷之4-5 material',
    catalogUrl: 'https://ci.nii.ac.jp/ncid/BB19249231',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'REQUEST_OR_OBTAIN_REPRODUCTION_OF_FASCICLE_4_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-BUKKYO-BA88839860-V4-5',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'Bukkyo University Library',
    catalogIdentifier: 'CiNii NCID BA88839860 / 卷之4-5 call 000241369',
    title: '新刊合併官板音義評註淵海子平 5卷',
    attributedAuthor: '(宋)徐升編 ; (明)楊淙増校',
    editionOrImprint: '千頃堂書局, [19--], 石印本',
    materialExtent: '6 fascicles total; relevant volume 卷之4-5',
    dimensions: '15 cm',
    relevantCoverage: '卷之4-5',
    catalogUrl: 'https://ci.nii.ac.jp/ncid/BA88839860',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'REQUEST_OR_OBTAIN_REPRODUCTION_OF_CALL_000241369_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-BUKKYO-BA88832205-V4',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'Bukkyo University Library',
    catalogIdentifier: 'CiNii NCID BA88832205 / 卷之4 call 000241364',
    title: '新刊合併官板音義評註淵海子平 5卷',
    attributedAuthor: '(宋)徐升編 ; (明)楊淙校',
    editionOrImprint: '文光堂, 乾隆51 [1786] 刊',
    materialExtent: '5 fascicles total; relevant 卷之4',
    dimensions: '24 cm',
    relevantCoverage: '卷之4; directly relevant to the frozen 四言獨步 section',
    catalogUrl: 'https://ci.nii.ac.jp/ncid/BA88832205',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'REQUEST_OR_OBTAIN_REPRODUCTION_OF_CALL_000241364_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-BUKKYO-BB08851308-V3-5',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'Bukkyo University Library',
    catalogIdentifier: 'CiNii NCID BB08851308 / 卷之3-5 call 000241358',
    title: '新刋合併官板音義評註淵海子平 5卷',
    attributedAuthor: '(宋)徐升編 ; (明)楊淙校',
    editionOrImprint: '掃葉山房, [清], 刊本',
    materialExtent: '2 fascicles total; relevant 卷之3-5',
    dimensions: '23.7 × 15.3 cm',
    relevantCoverage:
      '卷之3-5; catalog notes 崇禎七年孟冬吉日重梓 and 福建余氏鐫梓',
    catalogUrl: 'https://ci.nii.ac.jp/ncid/BB08851308',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'REQUEST_OR_OBTAIN_REPRODUCTION_OF_CALL_000241358_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-TOKYO-GENERAL-BB1246745X-V3-5',
    priority: 'P1' as const,
    targetClass: 'CONFIRMED_PHYSICAL_HOLDING' as const,
    holdingInstitution: 'General Library, University of Tokyo',
    catalogIdentifier: 'CiNii NCID BB1246745X / 卷之3-5 A90:1323 item 0005484761',
    title: '新刊合併官板音義評註淵海子平 5巻',
    attributedAuthor: '(宋)徐升編 ; (明)楊淙増校',
    editionOrImprint: '敬文堂, [出版年不明], 崇禎7年重梓後印',
    materialExtent: '2 fascicles total; relevant 卷之3-5',
    dimensions: '24 cm',
    relevantCoverage:
      '卷之3-5; catalog identifies 福建余氏繡梓崇禎7年重梓の後印',
    catalogUrl: 'https://ci.nii.ac.jp/ncid/BB1246745X',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'REQUEST_OR_OBTAIN_REPRODUCTION_OF_ITEM_0005484761_AND_INSPECT_FOUR_YAN_DUBU',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-TIANYIGE-330000-1705-0005007-DIGITAL',
    priority: 'P0' as const,
    targetClass: 'VERIFIED_PUBLIC_DIGITAL_SCAN' as const,
    holdingInstitution: 'Tianyi Pavilion Museum',
    catalogIdentifier: 'census 330000-1705-0005007 / call 善2875',
    title: '新刊合併官板音義評註淵海子平五卷',
    attributedAuthor: '宋徐升編、明楊淙增校',
    editionOrImprint: '明崇禎刻本',
    materialExtent: '1 digital PDF / 153 pages',
    dimensions: 'scan 1781 × 1431 px',
    relevantCoverage:
      '五卷 complete in one public scan; 四言獨步 directly inspected on digital pages 113..116',
    catalogUrl:
      'https://commons.wikimedia.org/wiki/File:Tianyige-330000-1705-0005007_%E6%96%B0%E5%88%8A%E5%90%88%E4%BD%B5%E5%AE%98%E6%9D%BF%E9%9F%B3%E7%BE%A9%E8%A9%95%E8%A8%BB%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E4%BA%94%E5%8D%B7_%E5%AE%8B%E5%BE%90%E5%8D%87%E7%B7%A8_%E6%98%8E%E6%A5%8A%E6%B7%99%E5%A2%9E%E6%A0%A1_%E6%98%8E%E5%B4%87%E7%A6%8E%E5%88%BB%E6%9C%AC.pdf',
    publicPageImageAvailability: 'VERIFIED_AVAILABLE' as const,
    directInspectionState: 'DIRECTLY_INSPECTED' as const,
    frozenWitnessContentClaimed: false as const,
    digitalAssets: Object.freeze([
      Object.freeze({
        pageCount: 153,
        sha1: '2ec904422ced60bf241286c6b822623048bb8883',
        fileSizeBytes: 133016361,
      }),
    ]),
    directInspection: Object.freeze({
      sectionObserved: '四言獨步',
      sectionTitleDigitalScanPage: 113,
      inspectedDigitalScanPageRange: Object.freeze([113, 116] as const),
      transitionDigitalScanPage: 116,
      sectionSequenceObserved: '四言獨步 → 身弱論 → 棄命從殺論',
      boundedVariantAnchorsObserved: Object.freeze([
        '先財後印',
        '先印後財',
        '印綬根深',
      ] as const),
      sameStringOutsideFrozenContext: Object.freeze({
        digitalScanPage: 112,
        exactString: '財旺生官',
        acceptedAsFrozenWitness: false as const,
        reason: 'OBSERVED_OUTSIDE_FOUR_YAN_DUBU',
      }),
      frozenWitnessChecks: Object.freeze([
        Object.freeze({
          witnessId: 'W-YUANHAI-WEALTH-OFFICER',
          exactString: '財旺生官',
          establishedWithinFourYanDubu: false as const,
        }),
        Object.freeze({
          witnessId: 'W-YUANHAI-OFFICER-RESOURCE',
          exactString: '煞化為印',
          establishedWithinFourYanDubu: false as const,
        }),
        Object.freeze({
          witnessId: 'W-YUANHAI-PEER-WEALTH',
          exactString: '比劫羊刃，財格大忌',
          establishedWithinFourYanDubu: false as const,
        }),
        Object.freeze({
          witnessId: 'W-YUANHAI-WEALTH-RESOURCE',
          exactString: '印綬見財',
          establishedWithinFourYanDubu: false as const,
        }),
      ]),
      fixedWitnessDirectVerificationOutcome:
        'NOT_ESTABLISHED_TEXTUAL_VARIANT_DIVERGENCE' as const,
      exactFrozenWitnessCountEstablished: 0 as const,
    }),
    acquisitionAction:
      'DIRECTLY_INSPECT_ZHUJI_PUBLIC_SCAN_FOR_FOUR_YAN_DUBU_AND_FROZEN_EXACT_STRINGS',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-ZJSLIB-FLDB-2458-DIGITAL',
    priority: 'P0' as const,
    targetClass: 'VERIFIED_PUBLIC_DIGITAL_SCAN' as const,
    holdingInstitution: 'Zhuji Library',
    catalogIdentifier: 'ZJSLib-FLDB-2458-1 / ZJSLib-FLDB-2458-2',
    title: '新刊合併官板音義評註淵海子平五卷',
    attributedAuthor: '（宋）徐升編 （明）楊淙增校',
    editionOrImprint: '清福建余氏刻本 13行25字小字雙行25字白口四周單邊',
    materialExtent: '2 public digital PDFs / 138 + 170 pages',
    dimensions: 'scan 937 × 1608 px',
    relevantCoverage:
      '五卷 split across two public scans; exact 四言獨步 part/page not yet directly inspected',
    catalogUrl:
      'https://commons.wikimedia.org/wiki/Category:%E6%96%B0%E5%88%8A%E5%90%88%E4%BD%B5%E5%AE%98%E6%9D%BF%E9%9F%B3%E7%BE%A9%E8%A9%95%E8%A8%BB%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3',
    publicPageImageAvailability: 'VERIFIED_AVAILABLE' as const,
    directInspectionState: 'AVAILABLE_NOT_INSPECTED' as const,
    frozenWitnessContentClaimed: false as const,
    digitalAssets: Object.freeze([
      Object.freeze({
        assetId: 'ZJSLib-FLDB-2458-1',
        pageCount: 138,
        fileSizeMiB: 64.85,
      }),
      Object.freeze({
        assetId: 'ZJSLib-FLDB-2458-2',
        pageCount: 170,
        fileSizeMiB: 79.26,
      }),
    ]),
    acquisitionAction:
      'LOCATE_FOUR_YAN_DUBU_WITHIN_PUBLIC_TWO_PART_SCAN_AND_DIRECTLY_INSPECT_FROZEN_EXACT_STRINGS',
  }),
  Object.freeze({
    targetId: 'ACQ-YUANHAI-FUWEN-GUANGXU-BIBLIOGRAPHIC-LEAD',
    priority: 'P2' as const,
    targetClass: 'BIBLIOGRAPHIC_LEAD_HOLDING_UNCONFIRMED' as const,
    holdingInstitution: null,
    catalogIdentifier: '中國古籍總目-derived bibliographic lead',
    title: '淵海子平（新刊合併官板音義評註淵海子平）五卷',
    attributedAuthor: '徐升[撰]',
    editionOrImprint: '清光緒間上海富文書局石印本',
    materialExtent: '五卷',
    dimensions: null,
    relevantCoverage: 'edition family only; exact retrievable copy not yet established',
    catalogUrl: 'https://www.guoxuedashi.com/shumu/gj-1762324oo.html',
    publicPageImageAvailability: 'NOT_ESTABLISHED' as const,
    directInspectionState: 'NOT_ACQUIRED' as const,
    frozenWitnessContentClaimed: false as const,
    acquisitionAction:
      'LOCATE_A_CONFIRMED_HOLDING_OR_DIGITAL_REPRODUCTION_BEFORE_ANY_TEXTUAL_INFERENCE',
  }),
] as const);

function isPublicPageImageVerified(status: string): boolean {
  return status === 'VERIFIED_AVAILABLE';
}

function isDirectlyInspected(state: string): boolean {
  return state === 'DIRECTLY_INSPECTED';
}

export function buildGeneralNatalConclusionT8YuanhaiAcquisitionTargets() {
  const upstream = buildGeneralNatalConclusionT8AlternateWitnessSurfaceSurvey();

  if (upstream.counts.productionAdmissibleFourOfFourCandidateCount !== 0) {
    throw new Error(
      'Acquisition-target registry is only valid while no production-admissible 4/4 alternate surface exists.',
    );
  }

  const confirmedPhysicalTargets = ACQUISITION_TARGETS.filter(
    (target) => target.targetClass === 'CONFIRMED_PHYSICAL_HOLDING',
  );
  const bibliographicLeads = ACQUISITION_TARGETS.filter(
    (target) => target.targetClass === 'BIBLIOGRAPHIC_LEAD_HOLDING_UNCONFIRMED',
  );
  const publicDigitalTargets = ACQUISITION_TARGETS.filter((target) =>
    isPublicPageImageVerified(target.publicPageImageAvailability),
  );
  const directlyInspectedTargets = ACQUISITION_TARGETS.filter((target) =>
    isDirectlyInspected(target.directInspectionState),
  );

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_YUANHAI_ACQUISITION_TARGETS_VERSION,
    issue: '#883' as const,
    auditBaseSha: 'a0735ab816f4d8c2cc26eb228eee468ee1d0f03c' as const,
    status: 'TIANYI_DIRECTLY_INSPECTED_TEXTUAL_VARIANT_NO_NEW_WITNESS_EVIDENCE' as const,
    upstreamAlternateSurfaceSurveyId: upstream.evidenceId,
    unresolvedWitnessIds: UNRESOLVED_WITNESS_IDS,
    acquisitionTargets: ACQUISITION_TARGETS,
    counts: {
      unresolvedWitnessCount: UNRESOLVED_WITNESS_IDS.length,
      acquisitionTargetCount: ACQUISITION_TARGETS.length,
      confirmedPhysicalHoldingCount: confirmedPhysicalTargets.length,
      bibliographicLeadCount: bibliographicLeads.length,
      publicDigitalPageImageVerifiedCount: publicDigitalTargets.length,
      directlyInspectedAcquisitionTargetCount: directlyInspectedTargets.length,
      newDirectWitnessEvidenceCount: 0 as const,
      productionAdmissionEvidenceCount: 0 as const,
    },
    verdict: {
      catalogRecordIsPhraseLevelEvidence: false as const,
      anyTargetFrozenWitnessContentEstablished: false as const,
      anyTargetReadyForWitnessPromotion: false as const,
      witnessReregistrationAuthorized: false as const,
      exactWitnessHashReproductionAuthorityEstablished: false as const,
      sourceIntegrityQualificationEstablished: false as const,
      productionEligibleProvenanceEstablished: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionAdmissionAuthority: false as const,
      productionState: 'HOLD' as const,
    },
    acquisitionProtocol: Object.freeze([
      'OBTAIN_EXACT_ITEM_OR_REPRODUCTION_WITH_CATALOG_IDENTITY',
      'VERIFY_RELEVANT_VOLUME_AND_FOUR_YAN_DUBU_SECTION',
      'PIN_EXACT_IMAGE_PAGE_OR_FOLIO_LOCATOR_WITHOUT_INVENTION',
      'READ_BOUNDED_GLYPHS_DIRECTLY_FROM_ACQUIRED_SURFACE',
      'REQUIRE_EXACT_ROB_WEALTH_GLYPH_FOR_PEER_WEALTH_WITNESS',
      'DO_NOT_NORMALIZE_ORTHOGRAPHIC_VARIANTS_INTO_FROZEN_HASH_IDENTITY',
      'REPRODUCE_FROZEN_DIGEST_AS_A_SEPARATE_STEP_AFTER_DIRECT_TEXT_VERIFICATION',
      'USE_SEPARATE_REVIEWED_REREGISTRATION_IF_SOURCE_DEFINITION_CHANGES',
    ] as const),
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
