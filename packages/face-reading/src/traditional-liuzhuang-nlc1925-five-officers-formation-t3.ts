import type { SourcePassage } from './contracts.js';

const NLC1925_FIVE_OFFICERS_FORMATION_TEXT = Object.freeze({
  listening:
    '耳須要色明高聳過於眉輪廓完成貼肉敦厚命門寬大謂之採聽官成',
  longevity:
    '眉須要寬廣清長雙分入鬢或如玄犀新月首尾豐盈高居額中乃謂保壽官成',
  inspection:
    '眼須要含藏不露黑白分明瞳子端正光彩射人或鳳目細長藏秀乃為監察官成',
  discernment:
    '鼻須要樑柱明直上接山根印堂明潤下連年壽高隆不宜起節準頭庫起形如懸膽鼻如截筒黃明色肉為審辨官成',
  intake:
    '口須要角弓開大合小上下唇配齒配四方為出納官成',
});

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_OFFICERS_FORMATION_PASSAGES = [
  ...([
    ['listening', '採聽官成'],
    ['longevity', '保壽官成'],
    ['inspection', '監察官成'],
    ['discernment', '審辨官成'],
    ['intake', '出納官成'],
  ] as const).map(([key, label]) => ({
    passageId:
      `passage.liuzhuang.nlc416_1925.five_officers.formation.${key}`,
    witnessId:
      'witness.liuzhuang_xiangfa.nlc416_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五官說',
    printedPage: '14',
    scanPage: 30,
    originalText: NLC1925_FIVE_OFFICERS_FORMATION_TEXT[key],
    normalizedText:
      `Direct visual adjudication of NLC416 PDF scan page 30 / printed page 14. This passage preserves the source-local ${label} formation descriptor list without converting it into executable Boolean logic.`,
    verificationStatus: 'scan_checked' as const,
  })),
  ...([
    ['listening', '採聽官成'],
    ['longevity', '保壽官成'],
    ['inspection', '監察官成'],
    ['discernment', '審辨官成'],
    ['intake', '出納官成'],
  ] as const).map(([key, label]) => ({
    passageId:
      `passage.liuzhuang.nlc511_1925.five_officers.formation.${key}`,
    witnessId:
      'witness.liuzhuang_xiangfa.nlc511_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五官說',
    printedPage: '14',
    scanPage: 30,
    originalText: NLC1925_FIVE_OFFICERS_FORMATION_TEXT[key],
    normalizedText:
      `Direct visual adjudication of NLC511 PDF scan page 30 / printed page 14. This passage preserves the source-local ${label} formation descriptor list without converting it into executable Boolean logic.`,
    verificationStatus: 'scan_checked' as const,
  })),
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_OFFICERS_FORMATION_AUTHORITY =
  Object.freeze({
    phase: 'T3_DIRECT_SCAN_FORMATION_PASSAGES' as const,
    pdfScanPage: 30 as const,
    printedPage: '14' as const,
    manifestationsCompared: 2 as const,
    scanCheckedPassageCountAdded: 10 as const,
    manifestationsAgreeAtFormationLocus: true as const,
    independentEditionVotesAdded: 0 as const,
    independentTraditionVotesAdded: 0 as const,
    sourceDescriptorListsMeanExecutableBooleanAnd: false as const,
    sourceAlternativeMarkersMeanExecutableBooleanOr: false as const,
    sourceOrderMeansCriterionWeight: false as const,
    crossLineageNormalizationAuthorized: false as const,
    methodologyReconstructionInputAuthorized: true as const,
    machineBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });
