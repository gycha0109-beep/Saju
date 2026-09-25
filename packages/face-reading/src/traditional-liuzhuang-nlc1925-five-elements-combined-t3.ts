import type { SourcePassage } from './contracts.js';

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_ELEMENTS_COMBINED_PASSAGES = [
  {
    passageId:
      'passage.liuzhuang.nlc416_1925.five_elements_combined.five_officers_six_fus',
    witnessId:
      'witness.liuzhuang_xiangfa.nlc416_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五行貴賤',
    printedPage: '8',
    scanPage: 24,
    originalText:
      '又名五官眉為保壽官眼為監察官鼻為審辨官耳為採聽官口為出納官又名六府天倉為上二府顴骨中二府地庫下二府',
    normalizedText:
      'Direct visual adjudication of NLC416 PDF scan page 24 / printed page 8. The supplied page image visibly prints 鼻為審辨官, 耳為採聽官, and the 柳莊 六府 mapping 天倉→上二府 / 顴骨→中二府 / 地庫→下二府.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.liuzhuang.nlc511_1925.five_elements_combined.five_officers_six_fus',
    witnessId:
      'witness.liuzhuang_xiangfa.nlc511_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五行貴賤',
    printedPage: '8',
    scanPage: 24,
    originalText:
      '又名五官眉為保壽官眼為監察官鼻為審辨官耳為採聽官口為出納官又名六府天倉為上二府顴骨中二府地庫下二府',
    normalizedText:
      'Direct visual adjudication of NLC511 PDF scan page 24 / printed page 8. The combined 五行貴賤 locus visibly prints 鼻為審辨官, 耳為採聽官, and the 柳莊 六府 mapping 天倉→上二府 / 顴骨→中二府 / 地庫→下二府.',
    verificationStatus: 'scan_checked',
  },
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_ELEMENTS_COMBINED_ADJUDICATION =
  Object.freeze({
    adjudicationId:
      'adjudication.liuzhuang.nlc1925.five_elements_combined.scan24_t3' as const,
    comparedPassageRefs: [
      'passage.liuzhuang.nlc416_1925.five_elements_combined.five_officers_six_fus',
      'passage.liuzhuang.nlc511_1925.five_elements_combined.five_officers_six_fus',
    ] as const,
    manifestationsCompared: 2 as const,
    printedPage: '8' as const,
    pdfScanPage: 24 as const,
    noseOfficerReading: '審辨官' as const,
    earOfficerReading: '採聽官' as const,
    sixFus: Object.freeze({
      upper: Object.freeze({
        traditionalLabel: '上二府' as const,
        sourceLocationTerm: '天倉' as const,
      }),
      middle: Object.freeze({
        traditionalLabel: '中二府' as const,
        sourceLocationTerm: '顴骨' as const,
      }),
      lower: Object.freeze({
        traditionalLabel: '下二府' as const,
        sourceLocationTerm: '地庫' as const,
      }),
    }),
    manifestationsAgreeAtCombinedLocus: true as const,
    nlc1925FiveElementsNoseGlyphResolved: true as const,
    nlc1925FiveElementsEarGlyphResolved: true as const,
    nlc1925SixFusMappingScanResolved: true as const,
    nlc416SameLocusDirectComparisonResolved: true as const,
    allLiuzhuangTransmissionsResolved: false as const,
    existingElectronicShenpanReadingInvalidated: false as const,
    existingElectronicShenpanReadingMayBeCalledOcrError: false as const,
    separateFiveOfficersEarVariantResolved: false as const,
    crossLineageNormalizationAuthorized: false as const,
    methodologyReconstructionAuthorized: false as const,
    machineBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_ELEMENTS_COMBINED_AUTHORITY =
  Object.freeze({
    phase: 'T3_DIRECT_SCAN_COMBINED_LOCUS_ADJUDICATION' as const,
    scanCheckedPassageCountAdded: 2 as const,
    independentTraditionVotesAdded: 0 as const,
    independentEditionVotesAdded: 0 as const,
    reasonIndependentEditionVotesNotAdded:
      'NLC416 and NLC511 are separately cataloged manifestations of the same 1925 文明書局 reproduction lineage. Their agreement increases reproduction confidence but is not counted as two independent textual votes.' as const,
    nlc1925CombinedLocus: Object.freeze({
      noseOfficer: '審辨官' as const,
      earOfficer: '採聽官' as const,
      sixFusMapping: 'scan_checked' as const,
      manifestationsAgree: true as const,
    }),
    canonicalLiuzhuangNoseOfficerAcrossAllTransmissions:
      'unresolved' as const,
    canonicalLiuzhuangEarOfficerAcrossAllContexts:
      'unresolved' as const,
    nextGate:
      'adjudicate_separate_five_officers_ear_variant_then_pin_審判官_transmission_provenance' as const,
    machineBindingAuthorized: false as const,
    outcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_FIVE_ELEMENTS_COMBINED_REMAINING_GATES =
  Object.freeze({
    separateFiveOfficersEarTitle:
      'the combined 五行貴賤 locus reads 採聽官 in both NLC1925 manifestations, but the separate 五官說 採聽官_vs_採聰官 locus remains an independently versioned gate' as const,
    shenpanTransmissionProvenance:
      'the electronic 審判官 transmission remains retained until its own witness and genealogy are pinned' as const,
    methodology:
      'blocked_pending_remaining_direct_scan_and_transmission_genealogy_gates' as const,
  });
