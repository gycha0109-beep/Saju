import type { SourcePassage } from './contracts.js';

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_EAR_TITLE_PASSAGES = [
  {
    passageId:
      'passage.liuzhuang.nlc416_1925.five_officers.ear_title',
    witnessId:
      'witness.liuzhuang_xiangfa.nlc416_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五官說',
    printedPage: '14',
    scanPage: 30,
    originalText: '一曰耳為採聽官',
    normalizedText:
      'Direct visual adjudication of NLC416 PDF scan page 30 / printed page 14. The supplied page image visibly prints 一曰耳為採聽官.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.liuzhuang.nlc511_1925.five_officers.ear_title',
    witnessId:
      'witness.liuzhuang_xiangfa.nlc511_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五官說',
    printedPage: '14',
    scanPage: 30,
    originalText: '一曰耳為採聽官',
    normalizedText:
      'Direct visual adjudication of NLC511 PDF scan page 30 / printed page 14. The 1925 NLC511 文明書局 manifestation visibly prints 一曰耳為採聽官 at the separate 五官說 locus.',
    verificationStatus: 'scan_checked',
  },
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_EAR_TITLE_ADJUDICATION =
  Object.freeze({
    adjudicationId:
      'adjudication.liuzhuang.nlc1925.five_officers.ear_title.scan30_t3' as const,
    targetFeature: 'ear' as const,
    directReading: '採聽官' as const,
    comparedPassageRefs: [
      'passage.liuzhuang.nlc416_1925.five_officers.ear_title',
      'passage.liuzhuang.nlc511_1925.five_officers.ear_title',
    ] as const,
    manifestationsCompared: 2 as const,
    samePrintedPage: '14' as const,
    samePdfScanPage: 30 as const,
    manifestationsAgreeAtThisLocus: true as const,
    nlc1925ThisLocusResolved: true as const,
    shidianElectronicCaiCongReadingDirectWitnessPinned: false as const,
    shidianElectronicCaiCongReadingInvalidated: false as const,
    shidianElectronicCaiCongReadingMayBeCalledOcrError: false as const,
    allLiuzhuangTransmissionsResolved: false as const,
    crossLineageNormalizationAuthorized: false as const,
    methodologyReconstructionAuthorized: false as const,
    machineBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_EAR_TITLE_AUTHORITY =
  Object.freeze({
    phase: 'T3_DIRECT_SCAN_EAR_GLYPH_ADJUDICATION' as const,
    scanCheckedPassageCountAdded: 2 as const,
    independentTraditionVotesAdded: 0 as const,
    independentEditionVotesAdded: 0 as const,
    reasonIndependentEditionVotesNotAdded:
      'NLC416 and NLC511 are separately cataloged manifestations of the same 1925 文明書局 reproduction lineage. Their agreement increases reproduction confidence but is not counted as two independent textual votes.' as const,
    nlc1925FiveOfficersEarTitle: '採聽官' as const,
    electronicCaiCongTransmissionState:
      'isolated_unverified_digital_transcription_variant_with_unpinned_direct_witness' as const,
    canonicalLiuzhuangEarOfficerAcrossAllTransmissions:
      'unresolved' as const,
    nextGate:
      'pin_審判官_transmission_provenance_and_establish_liuzhuang_transmission_genealogy' as const,
    machineBindingAuthorized: false as const,
    outcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_EAR_TITLE_REMAINING_GATES =
  Object.freeze({
    electronicCaiCongProvenance:
      '識典 NA09051 electronically renders 採聰官, but no independent direct witness for that glyph is pinned; retain it as an unverified digital-transcription variant rather than normalizing it away' as const,
    shenpanTransmissionProvenance:
      'the electronic 審判官 transmission remains retained until its own witness and genealogy are pinned' as const,
    transmissionRelationship:
      'broader 柳莊 transmission genealogy remains unresolved' as const,
    methodology:
      'blocked_pending_審判官_provenance_and_transmission_genealogy' as const,
  });
