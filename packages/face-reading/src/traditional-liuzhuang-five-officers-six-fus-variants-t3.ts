import type {
  SourcePassage,
  SourceWitness,
} from './contracts.js';

export type TraditionalLiuzhuangTransmissionReadingT3 =
  | '審辨官'
  | '審判官'
  | '採聽官'
  | '採聰官';

export const FACE_TRADITIONAL_T3_LIUZHUANG_WITNESSES = [
  {
    witnessId: 'witness.liuzhuang_xiangfa.shidian_na09051',
    workId: 'work.liuzhuang_xiangfa',
    editionLabel:
      '新刻袁柳庄先生秘傳相法 / 袁忠徹選・雲林子校訂 / 識典古籍 digitized transcription',
    digitalSourceUrl:
      'https://www.shidianguji.com/zh/book/NA09051/chapter/1m69tr1ab4dft',
    witnessStatus: 'verified',
  },
  {
    witnessId: 'witness.liuzhuang_xiangfa.nlc416_1925_wenming',
    workId: 'work.liuzhuang_xiangfa',
    editionLabel:
      '柳莊相法 / 秦慎安校勘 / 文明書局 / NLC416-13jh001257-42702',
    publicationYear: 1925,
    holdingInstitution: 'National Library of China',
    digitalSourceUrl:
      'https://commons.wikimedia.org/wiki/File:NLC416-13jh001257-42702_柳莊相法.pdf',
    checksum: 'sha1:72b7765d3a0b3d8cc7dc4cb4d3a197ec91eda7e4',
    witnessStatus: 'verified',
  },
  {
    witnessId: 'witness.liuzhuang_xiangfa.nlc511_1925_wenming',
    workId: 'work.liuzhuang_xiangfa',
    editionLabel:
      '柳莊相法 / 文明書局 / NLC511-03030560-63880',
    publicationYear: 1925,
    holdingInstitution: 'National Library of China',
    digitalSourceUrl:
      'https://commons.wikimedia.org/wiki/File:NLC511-03030560-63880_柳莊相法.pdf',
    checksum: 'sha1:9b79ef9a02113cdfa054ee9ed0c210b34e2d7215',
    witnessStatus: 'verified',
  },
] as const satisfies readonly SourceWitness[];

export const FACE_TRADITIONAL_T3_LIUZHUANG_ELECTRONIC_PASSAGES = [
  {
    passageId:
      'passage.liuzhuang.shidian_na09051.five_officers_six_fus',
    witnessId: 'witness.liuzhuang_xiangfa.shidian_na09051',
    volume: '卷上',
    chapter: '五行貴賤難逃生旺之中',
    originalText:
      '又名五官，眉爲保壽官，眼爲監察官，鼻爲審辨官，耳爲採聽官，口爲出納官，又名六府。天倉爲上二府，顴骨中二府，地庫，下二府。',
    normalizedText:
      'The digitized transcription reads the nose officer as 審辨官 and preserves the 柳莊 六府 mapping 天倉/顴骨/地庫. This is electronic-transcription evidence only; no scan-page promotion is made.',
    verificationStatus: 'unverified_ocr',
  },
  {
    passageId:
      'passage.liuzhuang.shidian_na09051.five_officers_exposition',
    witnessId: 'witness.liuzhuang_xiangfa.shidian_na09051',
    volume: '卷上',
    chapter: '五官說',
    originalText:
      '一曰耳爲採聰官，二曰眉爲保壽官，三曰眼爲監察官，四曰鼻爲審辨官，五曰口爲出納官。',
    normalizedText:
      'A second section in the same digitized transcription again reads the nose title as 審辨官, while the ear title appears electronically as 採聰官. The latter is not normalized to 採聽官 without direct scan adjudication.',
    verificationStatus: 'unverified_ocr',
  },
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_LIUZHUANG_VARIANT_CONFLICTS =
  Object.freeze([
    {
      conflictId:
        'conflict.liuzhuang.five_officers.nose_title_transmission_t3',
      targetFeature: 'nose',
      existingRepositoryPassageRef:
        'passage.liuzhuang.five_officers.mapping',
      existingRepositoryReading: '審判官' as TraditionalLiuzhuangTransmissionReadingT3,
      newlyLocatedPassageRefs: [
        'passage.liuzhuang.shidian_na09051.five_officers_six_fus',
        'passage.liuzhuang.shidian_na09051.five_officers_exposition',
      ] as const,
      newlyLocatedReading:
        '審辨官' as TraditionalLiuzhuangTransmissionReadingT3,
      conflictState:
        'intra_liuzhuang_electronic_transmission_variant_unresolved' as const,
      mayNormalizeAsOcrError: false as const,
      mayNormalizeToShenxiangReading: false as const,
      directScanAdjudicationRequired: true as const,
    },
    {
      conflictId:
        'conflict.liuzhuang.five_officers.ear_title_transcription_t3',
      targetFeature: 'ear',
      passageRefs: [
        'passage.liuzhuang.shidian_na09051.five_officers_six_fus',
        'passage.liuzhuang.shidian_na09051.five_officers_exposition',
      ] as const,
      readings: ['採聽官', '採聰官'] as const,
      conflictState:
        'same_digital_transmission_internal_transcription_variant_unresolved' as const,
      mayNormalizeAsOcrError: false as const,
      directScanAdjudicationRequired: true as const,
    },
  ] as const);

export const FACE_TRADITIONAL_T3_LIUZHUANG_SIX_FUS_ELECTRONIC_AGREEMENT =
  Object.freeze({
    traditionalTerm: '六府' as const,
    existingRepositoryPassageRef:
      'passage.liuzhuang.six_fus.mapping' as const,
    newlyLocatedPassageRef:
      'passage.liuzhuang.shidian_na09051.five_officers_six_fus' as const,
    upper: {
      traditionalLabel: '上二府',
      sourceLocationTerm: '天倉',
    },
    middle: {
      traditionalLabel: '中二府',
      sourceLocationTerm: '顴骨',
    },
    lower: {
      traditionalLabel: '下二府',
      sourceLocationTerm: '地庫',
    },
    electronicTransmissionAgreement: true as const,
    independentTraditionVoteAdded: false as const,
    directScanPageAdjudicated: false as const,
    scanCheckedPromotionAuthorized: false as const,
    machineRegionMapAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC_1925_TARGETS =
  Object.freeze([
    {
      witnessRef:
        'witness.liuzhuang_xiangfa.nlc416_1925_wenming',
      catalogConfirmsTargetChapters: [
        '五行貴賤',
        '五官說',
      ] as const,
      exactFiveOfficersPageAdjudicated: false as const,
      exactSixFusPageAdjudicated: false as const,
      targetPageMustNotBeInferredFromElectronicTranscription:
        true as const,
    },
    {
      witnessRef:
        'witness.liuzhuang_xiangfa.nlc511_1925_wenming',
      catalogConfirmsWork: true as const,
      exactFiveOfficersPageAdjudicated: false as const,
      exactSixFusPageAdjudicated: false as const,
      targetPageMustNotBeInferredFromElectronicTranscription:
        true as const,
    },
  ] as const);

export const FACE_TRADITIONAL_T3_LIUZHUANG_AUTHORITY = Object.freeze({
  phase: 'T3_SOURCE_WITNESS_VARIANT_ADJUDICATION' as const,
  verifiedWitnessMetadataCount:
    FACE_TRADITIONAL_T3_LIUZHUANG_WITNESSES.length,
  newlyRecordedElectronicPassageCount:
    FACE_TRADITIONAL_T3_LIUZHUANG_ELECTRONIC_PASSAGES.length,
  scanCheckedPassageCount: 0 as const,
  independentTraditionVotesAdded: 0 as const,
  noseOfficerTitleResolved: false as const,
  earOfficerTitleResolved: false as const,
  sixFusElectronicMappingAgreementEstablished: true as const,
  sixFusScanCheckedPromotionAuthorized: false as const,
  liuzhuangMethodologyReconstructionAuthorized: false as const,
  crossLineageNormalizationAuthorized: false as const,
  machineRegionMapAuthorized: false as const,
  outcomeClaimAuthorized: false as const,
  productionAuthorization: false as const,
});

export const FACE_TRADITIONAL_T3_LIUZHUANG_REMAINING_GATES =
  Object.freeze({
    nlc1925FiveOfficers:
      'exact_scan_page_and_glyphs_not_yet_adjudicated' as const,
    nlc1925SixFus:
      'exact_scan_page_and_glyphs_not_yet_adjudicated' as const,
    noseOfficerTitle:
      '審辨官_vs_審判官_requires_direct_witness_comparison' as const,
    earOfficerTitle:
      '採聽官_vs_採聰官_requires_direct_witness_comparison' as const,
    methodology:
      'blocked_until_direct_scan_adjudication_resolves_or_explicitly_versions_the_transmission_variants' as const,
  });
