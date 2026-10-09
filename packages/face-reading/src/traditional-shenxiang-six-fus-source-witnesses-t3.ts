import type {
  SourcePassage,
  SourceWitness,
} from './contracts.js';

export interface TraditionalShenxiangSixFusContextT3 {
  readonly contextId:
    | 'shenxiang_ten_observations_six_fus'
    | 'shenxiang_volume_two_six_fus_treatise';
  readonly passageRef: string;
  readonly scanPage: 4 | 22;
  readonly pairVocabulary:
    | readonly ['天府', '人府', '地府']
    | readonly ['上二府', '中二府', '下二府'];
  readonly pairRegionTerms: readonly {
    readonly pairRole: 'upper' | 'middle' | 'lower';
    readonly traditionalLabel: string;
    readonly sourceRegionTerms: readonly string[];
  }[];
  readonly formationSemanticsPresent: true;
  readonly outcomeLanguagePresent: true;
  readonly sameRegionIdentityAsOtherContext: false;
  readonly machineRegionMapAuthorized: false;
  readonly productionAuthorization: false;
}

export const FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_WITNESSES = [
  {
    witnessId:
      'witness.shenxiang_quanbian.gujin_473_1725_transmission',
    workId: 'work.shenxiang_quanbian',
    editionLabel:
      '欽定古今圖書集成 第473冊 / 博物彙編 藝術典 第631–632卷 / 神相全編一・二 transmission',
    publicationYear: 1725,
    digitalSourceUrl:
      'https://zh.wikisource.org/zh-hant/Index:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu',
    witnessStatus: 'verified',
  },
] as const satisfies readonly SourceWitness[];

export const FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_PASSAGES = [
  {
    passageId:
      'passage.shenxiang.gujin_631.six_fus.ten_observations',
    witnessId:
      'witness.shenxiang_quanbian.gujin_473_1725_transmission',
    volume: '博物彙編 / 藝術典 / 第631卷 / 神相全編一',
    chapter: '十觀 / 六取五官六府',
    scanPage: 4,
    originalText:
      '天庭日月二角為天府，宜方員明淨，不宜露骨，天府成也。或欹削低塌、偏尖，天府不成也，主初年運蹇。兩顴為人府，宜方正插鬢，不粗不露，齊揖方拱，此人府成也。若粗露高低，尖員綳鼓，此人府不成也，主中年運否。地角邊腮為末景，地府喜輔，地閣懸壁，不昏不慘，不尖不歪，不粗不大，地府成也。若高低粗露尖削，耳後見重腮，地府不成也。書云：一府就掌十年之富盛，相反者，主十年之凶敗。',
    normalizedText:
      'Compilation transmission of the 卷首/十觀 六府 context: upper 天府 is expressed through 天庭/日角/月角, middle 人府 through 兩顴, and lower 地府 through 地角/邊腮 with formation descriptors. The historical fortune/period language is source content only and is not an executable product claim.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.shenxiang.gujin_632.six_fus.treatise',
    witnessId:
      'witness.shenxiang_quanbian.gujin_473_1725_transmission',
    volume: '博物彙編 / 藝術典 / 第632卷 / 神相全編二',
    chapter: '六府論',
    scanPage: 22,
    originalText:
      '六府者，兩輔骨、兩顴骨、兩頤骨，欲其充實相輔，不欲支離孤露。靈臺祕訣云：上二府自輔角至天倉，中二府自命門至虎耳，下二府自肩骨至地閣。六府充直，無缺陷瘢痕者，主財旺。天倉峻起多財祿，地閣方停萬頃田。缺者不合。',
    normalizedText:
      'Compilation transmission of the 卷二 六府論 context. It defines six fu through paired 輔骨/顴骨/頤骨 and separately states 上二府/中二府/下二府 spans. This context is not normalized to the 卷首 天府/人府/地府 mapping.',
    verificationStatus: 'scan_checked',
  },
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_CONTEXTS = [
  {
    contextId: 'shenxiang_ten_observations_six_fus',
    passageRef:
      'passage.shenxiang.gujin_631.six_fus.ten_observations',
    scanPage: 4,
    pairVocabulary: ['天府', '人府', '地府'],
    pairRegionTerms: [
      {
        pairRole: 'upper',
        traditionalLabel: '天府',
        sourceRegionTerms: ['天庭', '日角', '月角'],
      },
      {
        pairRole: 'middle',
        traditionalLabel: '人府',
        sourceRegionTerms: ['兩顴'],
      },
      {
        pairRole: 'lower',
        traditionalLabel: '地府',
        sourceRegionTerms: ['地角', '邊腮'],
      },
    ],
    formationSemanticsPresent: true,
    outcomeLanguagePresent: true,
    sameRegionIdentityAsOtherContext: false,
    machineRegionMapAuthorized: false,
    productionAuthorization: false,
  },
  {
    contextId: 'shenxiang_volume_two_six_fus_treatise',
    passageRef:
      'passage.shenxiang.gujin_632.six_fus.treatise',
    scanPage: 22,
    pairVocabulary: ['上二府', '中二府', '下二府'],
    pairRegionTerms: [
      {
        pairRole: 'upper',
        traditionalLabel: '上二府',
        sourceRegionTerms: ['兩輔骨', '輔角', '天倉'],
      },
      {
        pairRole: 'middle',
        traditionalLabel: '中二府',
        sourceRegionTerms: ['兩顴骨', '命門', '虎耳'],
      },
      {
        pairRole: 'lower',
        traditionalLabel: '下二府',
        sourceRegionTerms: ['兩頤骨', '肩骨', '地閣'],
      },
    ],
    formationSemanticsPresent: true,
    outcomeLanguagePresent: true,
    sameRegionIdentityAsOtherContext: false,
    machineRegionMapAuthorized: false,
    productionAuthorization: false,
  },
] as const satisfies readonly TraditionalShenxiangSixFusContextT3[];

export const FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_CONTEXT_CONFLICT =
  Object.freeze({
    conflictId:
      'conflict.shenxiang.six_fus.intra_work_context_mapping_t3' as const,
    passageRefs: [
      'passage.shenxiang.gujin_631.six_fus.ten_observations',
      'passage.shenxiang.gujin_632.six_fus.treatise',
    ] as const,
    conflictState:
      'source_local_region_vocabularies_differ' as const,
    tenObservationsVocabulary: [
      '天庭',
      '日角',
      '月角',
      '兩顴',
      '地角',
      '邊腮',
    ] as const,
    volumeTwoTreatiseVocabulary: [
      '兩輔骨',
      '輔角',
      '天倉',
      '兩顴骨',
      '命門',
      '虎耳',
      '兩頤骨',
      '肩骨',
      '地閣',
    ] as const,
    exactGeometricEquivalenceEstablished: false as const,
    oneUniversalShenxiangSixFusRegionMapAuthorized: false as const,
    contextSpecificMethodologyRequired: true as const,
  });

export const FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_AUTHORITY =
  Object.freeze({
    witnessRef:
      'witness.shenxiang_quanbian.gujin_473_1725_transmission' as const,
    witnessRole:
      'compilation_transmission_not_independent_tradition_vote' as const,
    newWitnessRecordsAdded: 1 as const,
    independentTraditionVotesAdded: 0 as const,
    scanCheckedPassageCount: 2 as const,
    tenObservationsContextScanChecked: true as const,
    volumeTwoTreatiseContextScanChecked: true as const,
    contextsMayBeMerged: false as const,
    transmissionQualifiedMethodologyReconstructionAuthorized:
      true as const,
    nlc1925SpecificPromotionAuthorized: false as const,
    machineRegionMapAuthorized: false as const,
    comparisonPolicyAuthorized: false as const,
    outcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_SHENXIANG_SIX_FUS_REMAINING_GATES =
  Object.freeze({
    nlc1925TenObservations:
      'direct_pdf_text_located_exact_scan_page_not_yet_adjudicated' as const,
    nlc1925VolumeTwoSixFusTreatise:
      'verified_witness_chapter_present_exact_scan_page_not_yet_adjudicated' as const,
    contextRelationship:
      'requires_context_specific_methodology_reconstruction_before_any_region_binding' as const,
    liuzhuangFiveOfficers:
      'blocked_exact_scan_page_not_yet_adjudicated' as const,
    liuzhuangSixFus:
      'blocked_exact_scan_page_not_yet_adjudicated' as const,
    liuzhuangNoseOfficerTitleVariant:
      'blocked_until_direct_witness_comparison' as const,
  });
