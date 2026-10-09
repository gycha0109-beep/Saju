import type { SourcePassage } from './contracts.js';

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_NOSE_TITLE_PASSAGES = [
  {
    passageId:
      'passage.liuzhuang.nlc416_1925.five_officers.nose_title',
    witnessId:
      'witness.liuzhuang_xiangfa.nlc416_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五官說 successor officer sections',
    printedPage: '15',
    scanPage: 31,
    originalText: '鼻為審辨官',
    normalizedText:
      'Direct visual adjudication of PDF scan page 31 / printed page 15. The 1925 NLC416 文明書局 manifestation visibly prints 審辨官 at the nose-officer section heading.',
    verificationStatus: 'scan_checked',
  },
  {
    passageId:
      'passage.liuzhuang.nlc511_1925.five_officers.nose_title',
    witnessId:
      'witness.liuzhuang_xiangfa.nlc511_1925_wenming',
    volume: '柳莊相法 / upper-volume material',
    chapter: '五官說 successor officer sections',
    printedPage: '15',
    scanPage: 31,
    originalText: '鼻為審辨官',
    normalizedText:
      'Direct visual adjudication of PDF scan page 31 / printed page 15. The separately cataloged 1925 NLC511 文明書局 manifestation visibly prints 審辨官 at the same nose-officer locus.',
    verificationStatus: 'scan_checked',
  },
] as const satisfies readonly SourcePassage[];

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_NOSE_TITLE_ADJUDICATION =
  Object.freeze({
    adjudicationId:
      'adjudication.liuzhuang.nlc1925.nose_officer_title.scan31_t3' as const,
    targetFeature: 'nose' as const,
    directReading: '審辨官' as const,
    comparedPassageRefs: [
      'passage.liuzhuang.nlc416_1925.five_officers.nose_title',
      'passage.liuzhuang.nlc511_1925.five_officers.nose_title',
    ] as const,
    manifestationsCompared: 2 as const,
    samePrintedPage: '15' as const,
    samePdfScanPage: 31 as const,
    manifestationsAgreeAtThisLocus: true as const,
    nlc1925ThisLocusResolved: true as const,
    allLiuzhuangTransmissionsResolved: false as const,
    existingElectronicShenpanReadingInvalidated: false as const,
    existingElectronicShenpanReadingMayBeCalledOcrError: false as const,
    fiveElementsMappingLocusResolved: false as const,
    earTitleResolved: false as const,
    sixFusMappingScanResolved: false as const,
    crossLineageNormalizationAuthorized: false as const,
    methodologyReconstructionAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_NOSE_TITLE_AUTHORITY =
  Object.freeze({
    phase: 'T3_DIRECT_SCAN_GLYPH_ADJUDICATION' as const,
    scanCheckedPassageCountAdded: 2 as const,
    independentTraditionVotesAdded: 0 as const,
    independentEditionVotesAdded: 0 as const,
    reasonIndependentEditionVotesNotAdded:
      'The two catalog manifestations are both 1925 文明書局 material and are visually identical at the adjudicated locus; separate catalog records are not treated as independent textual authority.' as const,
    nlc1925NoseOfficerAtAdjudicatedLocus:
      '審辨官' as const,
    canonicalLiuzhuangNoseOfficerAcrossAllTransmissions:
      'unresolved' as const,
    nextGate:
      'scan_adjudicate_five_elements_mapping_ear_title_and_six_fus_loci' as const,
    machineBindingAuthorized: false as const,
    outcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_NLC1925_REMAINING_GATES =
  Object.freeze({
    fiveElementsMapping:
      'exact_scan_locus_still_required_to_test_審辨官_vs_審判官_in_mapping_context' as const,
    fiveOfficersEarTitle:
      'exact_scan_locus_still_required_to_test_採聽官_vs_採聰官' as const,
    sixFusMapping:
      'exact_scan_locus_still_required_for_天倉_顴骨_地庫_mapping' as const,
    transmissionRelationship:
      'electronic_審判官_reading_remains_a_separate_unresolved_transmission_until_its_own_witness_is_identified_and_checked' as const,
    methodology:
      'blocked_pending_remaining_direct_scan_loci_and_explicit_transmission_scoping' as const,
  });
