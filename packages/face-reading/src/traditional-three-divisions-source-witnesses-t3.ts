import type {
  SourcePassage,
  SourceWitness,
  SourceWork,
} from './contracts.js';

export const FACE_TRADITIONAL_T3_NEW_WORKS = [
  {
    workId: 'work.shenyi_fu',
    canonicalTitle: '神異賦',
    alternateTitles: ['麻衣相神異賦', 'Shenyi Fu'],
    attributedAuthors: ['傳統題署 불확정'],
    sourceClass: 'primary_manual',
  },
  {
    workId: 'work.taiqing_shenjian',
    canonicalTitle: '太清神鑑',
    alternateTitles: ['Taiqing Shenjian'],
    attributedAuthors: ['王朴（舊題；四庫提要에서 저자 귀속에 의문 제기）'],
    sourceClass: 'primary_manual',
  },
] as const satisfies readonly SourceWork[];

export const FACE_TRADITIONAL_T3_NEW_WITNESSES = [
  {
    witnessId: 'witness.shenyi_fu.gujin_636_transmission',
    workId: 'work.shenyi_fu',
    editionLabel:
      '欽定古今圖書集成 博物彙編 藝術典 第636卷 / 神相全編六〈神異賦〉 transmission',
    digitalSourceUrl:
      'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu/48',
    witnessStatus: 'verified',
  },
  {
    witnessId: 'witness.shenyi_fu.harvard_wanli_53261115',
    workId: 'work.shenyi_fu',
    editionLabel:
      '新刻麻衣相神異賦 一卷・圖一卷・附金鎻賦一卷 — 胡文煥文會堂 明萬曆間',
    holdingInstitution: 'Harvard-Yenching Library',
    digitalSourceUrl:
      'https://commons.wikimedia.org/wiki/File:Harvard_drs_53261115_新刻麻衣相神異賦_v.1.pdf',
    witnessStatus: 'verified',
  },
  {
    witnessId: 'witness.taiqing_shenjian.nlc_1925',
    workId: 'work.taiqing_shenjian',
    editionLabel: '文明書局 民國十四年本 — 秦慎安校勘 / NLC scan',
    publicationYear: 1925,
    holdingInstitution: 'National Library of China',
    digitalSourceUrl:
      'https://commons.wikimedia.org/wiki/File:NLC416-13jh001253-42698_太清神鑒.pdf',
    witnessStatus: 'verified',
  },
  {
    witnessId: 'witness.renlun_datongfu.cadal_siku',
    workId: 'work.renlun_datongfu',
    editionLabel: '欽定四庫全書本 — CADAL scan',
    holdingInstitution: 'CADAL',
    digitalSourceUrl: 'https://ctext.org/library.pl?if=gb&res=98480',
    witnessStatus: 'verified',
  },
] as const satisfies readonly SourceWitness[];

export const FACE_TRADITIONAL_T3_SUCCESSOR_PASSAGES = [
  {
    passageId: 'passage.mayi.fr261.three_fus_three_governors',
    witnessId: 'witness.mayi_xiangfa.nlc_1925_v1',
    volume: '卷一',
    chapter: '三才三停論',
    scanPage: 35,
    originalText:
      '髮際至印堂為上府，是初主。自山根至準頭為中府，是中主。自人中至地閣為下府，是末主。',
    normalizedText:
      'FR261 successor reading: 上府=髮際→印堂/初主; 中府=山根→準頭/中主; 下府=人中→地閣/末主. This triplet is not admitted as the Mayi Three-Divisions boundary.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId: 'passage.mayi.fr261.contiguous_three_divisions',
    witnessId: 'witness.mayi_xiangfa.nlc_1925_v1',
    volume: '卷一',
    chapter: '三才三停論',
    scanPage: 35,
    originalText:
      '自髮際至眉為上停，眉至準頭為中停，準頭至地閣為下停。',
    normalizedText:
      'FR261 successor reading: 上停=髮際→眉; 中停=眉→準頭; 下停=準頭→地閣.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId: 'passage.shenyi_fu.gujin_636.noncontiguous_three_divisions',
    witnessId: 'witness.shenyi_fu.gujin_636_transmission',
    volume: '博物彙編 / 藝術典 / 第636卷',
    chapter: '神相全編六 / 神異賦',
    scanPage: 48,
    originalText:
      '三停平等，一生衣祿無虧。自髮際至印堂為上停，山根至於準頭為中停，人中至地閣為下停，此面上三停也。',
    normalizedText:
      'Transmission-only evidence: 上停=髮際→印堂; 中停=山根→準頭; 下停=人中→地閣. This does not establish an original Shenyi Fu manuscript.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId: 'passage.shenxiang.nlc_1925.sancai_three_divisions_ocr_locator',
    witnessId: 'witness.shenxiang_quanbian.nlc_1925',
    volume: '卷二',
    chapter: '三才三停論',
    originalText:
      '三才者額為天。欲闊而圓。名曰有天著貴。鼻為人。欲旺而齊。名曰有人者壽。頤為地。欲方而闊。名曰有地者富。三停者髮際至印堂為上輔。是初主。自山根至準頭為中輔。是中主。自人中至地閣為下輔。是末主。自髮際至眉為上停。眉至準頭為中停。準頭至地閣為下停。',
    normalizedText:
      'Direct NLC-PDF OCR locator only. Exact scan page has not been visually pinned in T3; OCR variants such as 輔/府 and 頤/頦 require page-level checking before promotion.',
    verificationStatus: 'unverified_ocr',
  },
  {
    passageId: 'passage.taiqing.nlc_1925.face_three_divisions_ocr_locator',
    witnessId: 'witness.taiqing_shenjian.nlc_1925',
    volume: '卷五',
    chapter: '論面部',
    originalText:
      '論面部　面之三停白髮際下至眉間為上停自眉間至鼻準為中停自準八中至頤為下停夫三停者以像三才也上像天中像人下像地',
    normalizedText:
      'Direct NLC-PDF OCR locator only. The direct PDF search index supports 頤 for the lower endpoint, while other electronic transcriptions contain OCR variants; exact scan page remains unpinned.',
    verificationStatus: 'unverified_ocr',
  },
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_SOURCE_GATES = Object.freeze({
  mayiFr261: Object.freeze({
    sourceState: 'scan_checked_successor_passages' as const,
    methodologyPromotionAuthorized: false as const,
  }),
  shenyiFuGujin: Object.freeze({
    sourceState: 'scan_checked_compilation_transmission' as const,
    originalWorkAuthorityEstablished: false as const,
    earlierHarvardWitnessExists: true as const,
    earlierHarvardTargetPassagePinned: false as const,
    methodologyPromotionAuthorized: false as const,
  }),
  shenxiangNlc1925: Object.freeze({
    sourceState: 'verified_witness_direct_pdf_ocr_locator_only' as const,
    targetPassageScanPagePinned: false as const,
    methodologyPromotionAuthorized: false as const,
  }),
  liuzhuangNlc1925: Object.freeze({
    sourceState: 'verified_witness_target_passage_not_scan_pinned' as const,
    witnessRef: 'witness.liuzhuang_xiangfa.nlc_1925' as const,
    electronicPassageRef: 'passage.liuzhuang.three_divisions' as const,
    methodologyPromotionAuthorized: false as const,
  }),
  taiqingNlc1925: Object.freeze({
    sourceState: 'verified_witness_direct_pdf_ocr_locator_only' as const,
    targetPassageScanPagePinned: false as const,
    methodologyPromotionAuthorized: false as const,
  }),
  renlunSiku: Object.freeze({
    sourceState: 'verified_scan_witness_target_commentary_page_not_pinned' as const,
    targetStatement:
      '人稟三才，額為天，頦為地，鼻為人' as const,
    methodologyPromotionAuthorized: false as const,
  }),
} as const);
