export const FACE_TRADITIONAL_T3_LIUZHUANG_SHENPAN_ELECTRONIC_TRANSMISSIONS =
  Object.freeze([
    {
      transmissionId:
        'transmission.liuzhuang.bongta_2009_shenpan_web_text' as const,
      sourceLabel: 'Bongta / 유장상법(柳莊相法)' as const,
      sourceUrl: 'https://bongta.tistory.com/466' as const,
      publishedAt: '2009-02-04T11:55:00+09:00' as const,
      reading: '審判官' as const,
      loci: [
        '五行貴賤 combined 五官 mapping',
        '五官說 / 五星說',
        '鼻爲審判官 section heading',
      ] as const,
      provenanceNote:
        'The page explicitly says its traditional-character block was converted by HWP, instructs readers to compare the appended simplified text, and warns that the source contains typos. The appended simplified block also reads 审判官, so this specific reading is not introduced merely by the HWP traditional-character conversion. The upstream simplified-text witness is not identified or directly pinned.' as const,
      directHistoricalScanPinned: false as const,
      independentHistoricalWitnessVoteAuthorized: false as const,
    },
    {
      transmissionId:
        'transmission.liuzhuang.mlzxfw_web_text_shenpan' as const,
      sourceLabel: '柳庄相法上册 / mlzxfw.com' as const,
      sourceUrl: 'https://www.mlzxfw.com/mlnews.asp?id=9' as const,
      reading: '审判官' as const,
      loci: [
        '五行贵贱 combined 五官 mapping',
        '五星说',
        '鼻为审判官 section heading',
      ] as const,
      relationshipState:
        'same_or_derivative_modern_web_text_family_not_independently_genealogized' as const,
      directHistoricalScanPinned: false as const,
      independentHistoricalWitnessVoteAuthorized: false as const,
    },
    {
      transmissionId:
        'transmission.liuzhuang.gushu_web_text_shenpan' as const,
      sourceLabel: '柳庄相法 / 古书网' as const,
      sourceUrl:
        'https://gushu.net.cn/guji/%E6%98%93%E8%97%8F/%E6%9C%AF%E6%95%B0/%E6%9F%B3%E5%BA%84%E7%9B%B8%E6%B3%95.html' as const,
      reading: '审判官' as const,
      loci: [
        '五行贵贱 combined 五官 mapping',
        '五星说',
        '鼻为审判官 section heading',
      ] as const,
      relationshipState:
        'same_or_derivative_modern_web_text_family_not_independently_genealogized' as const,
      directHistoricalScanPinned: false as const,
      independentHistoricalWitnessVoteAuthorized: false as const,
    },
  ] as const);

export const FACE_TRADITIONAL_T3_LIUZHUANG_SHENPAN_PROVENANCE_ADJUDICATION =
  Object.freeze({
    adjudicationId:
      'adjudication.liuzhuang.shenpan_electronic_provenance_t3' as const,
    earliestDatedElectronicManifestationLocated:
      'transmission.liuzhuang.bongta_2009_shenpan_web_text' as const,
    earliestDatedElectronicManifestationDate:
      '2009-02-04' as const,
    readingPreserved: '審判官' as const,
    upstreamDirectWitnessPinned: false as const,
    historicalPrintedEditionWithShenpanPinned: false as const,
    hwpTraditionalConversionIntroducedShenpan: false as const,
    reasonHwpConversionNotSource:
      'The same Bongta page appends a simplified-character text that already reads 审判官.' as const,
    modernWebFamilyClassification:
      'derivative_or_shared_electronic_text_family_with_unpinned_upstream_source' as const,
    mayCountAsIndependentEditionVote: false as const,
    mayCountAsIndependentTraditionVote: false as const,
    mayDeleteShenpanReading: false as const,
    mayCallShenpanProvenOcrError: false as const,
    nlc1925DirectReadingRemains: '審辨官' as const,
    nlc1925AuthorityUnaffectedByElectronicFamily: true as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_SHENPAN_PROVENANCE_AUTHORITY =
  Object.freeze({
    phase: 'T3_ELECTRONIC_TRANSMISSION_PROVENANCE' as const,
    provenanceResult:
      'negative_direct_witness_result_but_electronic_family_versioned' as const,
    verifiedHistoricalShenpanWitnessCount: 0 as const,
    independentVotesAdded: 0 as const,
    electronicShenpanState:
      'retained_unverified_derivative_web_transmission' as const,
    canonicalLiuzhuangNoseOfficerAcrossAllTransmissions:
      'not_universally_normalized' as const,
    verified1925WenmingLineageNoseOfficer:
      '審辨官' as const,
    methodologyScopingRule:
      'future_methodology_may_use_the_verified_1925_Wenming_lineage_only_if_the_pack_explicitly_pins_that_lineage_and_does_not_claim_all_Liuzhuang_transmissions' as const,
    crossLineageNormalizationAuthorized: false as const,
    machineBindingAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T3_LIUZHUANG_SHENPAN_PROVENANCE_REMAINING_GATES =
  Object.freeze({
    upstreamSource:
      'the pre-2009 simplified electronic source used by the Bongta post is not identified' as const,
    directHistoricalShenpanWitness:
      'no directly inspected historical scan printing 審判官 has been pinned' as const,
    optionalGenealogyExtension:
      'older or independent printed witnesses may be added later without reopening the verified 1925 文明書局 reading' as const,
  });
