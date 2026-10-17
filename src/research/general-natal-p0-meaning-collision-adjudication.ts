/**
 * P0-NATAL N10 19-pair RESEARCH adjudication packet (not another semantic authority).
 * Snapshot of exact 2026-10-15 N10 CI output; this code does not execute/publish claims.
 * Differences here are differences OF DELTA CLAIMS, never whole-chart family absence.
 */
export const GENERAL_NATAL_N10_SEMANTIC_RETURN_VERSION = 'saju-research-natal-19-pair-semantic-return-v2' as const;

export type NatalMeaningAdjudication =
  | 'JUSTIFIED_SAME_MEANING'
  | 'JUSTIFIED_DIFFERENT_MEANING'
  | 'MISSING_CONTEXT'
  | 'UNSUPPORTED_INTERPRETATION'
  | 'METHODOLOGY_CONFLICT'
  | 'UNRESOLVED';

export const GENERAL_NATAL_N10_ARTIFACT_PROVENANCE = Object.freeze({
  mergedN10PullRequest: 2538 as const,
  sourceCIHead: '7bef813547ebf64a4de010d8ebbb6b0fc057301c' as const,
  sourceCIWorkflowRun: 38704297365 as const,
  sourceCIArtifactId: 11957901379 as const,
  sourceCIArtifactName: 'natal-n3-audit-38704297365' as const,
  n10JsonSha256: '6b32b5d53289e7664197a1e9e0fbf61096bb5da7d4acc5702ab4dcd44dbcd2ee' as const,
  rulesJsonSha256: '9e43274e008208e03a6495c322d0efb3781a76be309823fae1648b46edfe9e58' as const,
  contextJsonSha256: 'ee09debd4ed4895e99ea52e60cf7f9ddbe6628fc9b9c3a94d114ec2e8e09037f' as const,
  caseCount: 35 as const,
  casePairCount: 20 as const,
  uniqueDisplayedChartPairCount: 19 as const,
  allNineteenPairsHaveSameWholeChartFiveFamilyPresenceSet: true as const,
  note: 'N10 changed_family_or_mixture compares LEFT/RIGHT-ONLY theme deltas, not total present family sets' as const,
  sourceDataTier: 'executed_internal_http_and_research_diagnostics_not_approved_semantics' as const,
});

/**
 * Exact unique chart pairs, in N10 original order. ST=visible_stems, BR=branches.
 * Pair #20 was duplicate of #19 under the repeated 2024-03-10-12:30 control.
 *
 * JUSTIFIED_SAME_MEANING ONLY certifies reuse of the abstract existing family
 * theme/claim meaning, not equality of an individual's comprehensive reading.
 * #17 has a proven different emitted Research T8 predicate, but its
 * historical names/scope disagree across transcriptions, hence
 * METHODOLOGY_CONFLICT for individual semantic admission (not a runtime bug).
 */
export const GENERAL_NATAL_N10_UNIQUE_COLLISION_PAIRS = Object.freeze([
  Object.freeze({ index: 1 as const, left: 'solar-1984-01-07-00:30' as const, right: 'solar-1984-01-07-12:30' as const, n10Category: 'same_family_different_channel' as const, leftOnlyResearchThemeDelta: 'OFFICER_ST' as const, rightOnlyResearchThemeDelta: 'OFFICER_BR' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 2 as const, left: 'solar-1984-01-07-00:30' as const, right: 'solar-1984-01-07-19:30' as const, n10Category: 'same_rules_different_chart' as const, leftOnlyResearchThemeDelta: '—' as const, rightOnlyResearchThemeDelta: '—' as const, adjudication: 'JUSTIFIED_SAME_MEANING' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 3 as const, left: 'solar-1984-01-07-12:30' as const, right: 'solar-1984-01-07-19:30' as const, n10Category: 'same_family_different_channel' as const, leftOnlyResearchThemeDelta: 'OFFICER_BR' as const, rightOnlyResearchThemeDelta: 'OFFICER_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 4 as const, left: 'solar-1989-09-08-00:30' as const, right: 'solar-1989-09-08-19:30' as const, n10Category: 'added_or_missing_research_theme' as const, leftOnlyResearchThemeDelta: 'OUTPUT_BR' as const, rightOnlyResearchThemeDelta: '—' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 5 as const, left: 'solar-1989-09-08-05:30' as const, right: 'solar-1989-09-08-12:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'PEER_ST,WEALTH_BR' as const, rightOnlyResearchThemeDelta: 'WEALTH_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 6 as const, left: 'solar-1992-01-12-00:30' as const, right: 'solar-1992-01-12-19:30' as const, n10Category: 'same_rules_different_chart' as const, leftOnlyResearchThemeDelta: '—' as const, rightOnlyResearchThemeDelta: '—' as const, adjudication: 'JUSTIFIED_SAME_MEANING' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 7 as const, left: 'solar-1992-01-12-00:30' as const, right: 'solar-2018-07-14-00:30' as const, n10Category: 'added_or_missing_research_theme' as const, leftOnlyResearchThemeDelta: '—' as const, rightOnlyResearchThemeDelta: 'OUTPUT_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 8 as const, left: 'solar-1992-01-12-19:30' as const, right: 'solar-2018-07-14-00:30' as const, n10Category: 'added_or_missing_research_theme' as const, leftOnlyResearchThemeDelta: '—' as const, rightOnlyResearchThemeDelta: 'OUTPUT_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 9 as const, left: 'solar-1996-01-09-00:30' as const, right: 'solar-1996-01-09-05:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'OUTPUT_ST' as const, rightOnlyResearchThemeDelta: 'PEER_BR' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 10 as const, left: 'solar-1996-01-09-00:30' as const, right: 'solar-1996-01-09-12:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'OUTPUT_ST' as const, rightOnlyResearchThemeDelta: 'RESOURCE_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 11 as const, left: 'solar-1996-01-09-00:30' as const, right: 'solar-1996-01-09-19:30' as const, n10Category: 'same_rules_different_chart' as const, leftOnlyResearchThemeDelta: '—' as const, rightOnlyResearchThemeDelta: '—' as const, adjudication: 'JUSTIFIED_SAME_MEANING' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 12 as const, left: 'solar-1996-01-09-05:30' as const, right: 'solar-1996-01-09-12:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'PEER_BR' as const, rightOnlyResearchThemeDelta: 'RESOURCE_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 13 as const, left: 'solar-1996-01-09-05:30' as const, right: 'solar-1996-01-09-19:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'PEER_BR' as const, rightOnlyResearchThemeDelta: 'OUTPUT_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 14 as const, left: 'solar-1996-01-09-12:30' as const, right: 'solar-1996-01-09-19:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'RESOURCE_ST' as const, rightOnlyResearchThemeDelta: 'OUTPUT_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 15 as const, left: 'solar-2001-06-21-00:30' as const, right: 'solar-2001-06-21-12:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'OUTPUT_ST,RESOURCE_BR' as const, rightOnlyResearchThemeDelta: 'RESOURCE_ST' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 16 as const, left: 'solar-2001-06-21-05:30' as const, right: 'solar-2001-06-21-19:30' as const, n10Category: 'changed_family_or_mixture' as const, leftOnlyResearchThemeDelta: 'WEALTH_ST' as const, rightOnlyResearchThemeDelta: 'OUTPUT_ST,WEALTH_BR' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 17 as const, left: 'solar-2010-02-03-05:30' as const, right: 'solar-2010-02-03-19:30' as const, n10Category: 'same_family_different_channel' as const, leftOnlyResearchThemeDelta: 'PEER_BR' as const, rightOnlyResearchThemeDelta: 'PEER_ST' as const, adjudication: 'METHODOLOGY_CONFLICT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 18 as const, left: 'solar-2024-03-10-00:30' as const, right: 'solar-2024-03-10-19:30' as const, n10Category: 'added_or_missing_research_theme' as const, leftOnlyResearchThemeDelta: 'PEER_BR' as const, rightOnlyResearchThemeDelta: '—' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
  Object.freeze({ index: 19 as const, left: 'solar-2024-03-10-05:30' as const, right: 'solar-2024-03-10-12:30' as const, n10Category: 'added_or_missing_research_theme' as const, leftOnlyResearchThemeDelta: '—' as const, rightOnlyResearchThemeDelta: 'OFFICER_ST,WEALTH_BR' as const, adjudication: 'MISSING_CONTEXT' as const, wholeChartFiveFamilyPresenceUnchanged: true as const }),
] as const);

/**
 * Reuse existing T5/T8 and registry, not a new parallel interpretation engine.
 * Both examples are paired, actual canonical N10 audits, not hypothetical births.
 */
/**
 * Source-internal terminological granularity and method transfer audit.
 * THESE ARE DIGITAL TRANSCRIPTION OBSERVATIONS, NOT VERIFIED WOODBLOCK READINGS.
 * Existing research T8 runtime continues to be tested; no authority is added.
 */
export const GENERAL_NATAL_N10_PEER_WEALTH_SEMANTIC_SCOPE_AUDIT = Object.freeze({
  readingGrade: 'C_unverified_digital_transcription' as const,
  yuanhai: Object.freeze({
    work: '淵海子平' as const,
    page: 'https://zh.wikisource.org/zh-hant/淵海子平' as const,
    sections: Object.freeze(['基礎', '論劫財', '又地支藏遁歌'] as const),
    introductoryYangJiaMeetingYi: '見乙：為劫財、敗財' as const,
    narrowerYangMeetingYinName: '五陽見五陰為敗財' as const,
    narrowerYinMeetingYangName: '五陰見五陽為劫財' as const,
    branchMaoHiddenStem: '卯宮乙木獨相逢' as const,
    observed2010YangJiaAndMaoYi: true as const,
    broadAndNarrowNamesReconciledAcrossPrintedEditions: false as const,
    printedFolioInspectedForTheseClauses: false as const,
  }),
  samyeong: Object.freeze({
    work: '三命通會（四庫全書本）' as const,
    volumeFiveUrl: 'https://zh.wikisource.org/zh-hant/三命通會/卷五' as const,
    volumeFiveSection: '論古人立印食官財名義' as const,
    volumeFiveBroadRelation: '財怕劫，被劫則分' as const,
    volumeSevenUrl: 'https://zh.wikisource.org/wiki/三命通會_(四庫全書本)/卷07' as const,
    volumeSevenPeerSection: '兄弟引例章' as const,
    volumeSevenPeerTaxonomy: '兄弟者即刼財比肩甲見乙乙見甲之類' as const,
    volumeSevenBijeonCounterexampleSection: '妻妾引例章' as const,
    volumeSevenBijeonCounterexample: '甲申甲戌日生甲寅乙夘月日主大旺雖有妻以比肩分奪' as const,
    exampleRequiresSpringYinMaoMonthAndStrongMaster: true as const,
    case2010BirthMonthIsChouNotSpringYinMao: true as const,
    bijeonGenerallyExcludedFromWealthRelationsBySources: false as const,
    physicalSiKuPrintedFolioForTheseClausesInspected: false as const,
  }),
  samyeongVolumeSix: Object.freeze({
    work: '三命通會（四庫全書本）' as const,
    digitalTranscriptionUrl: 'https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷06' as const,
    comparatorTranscriptionUrl: 'https://zh.wikisource.org/zh-hant/三命通會/卷六' as const,
    sections: Object.freeze(['論正財', '論偏財', '時上偏財'] as const),
    zhengCaiConditionedPeerCaution: '財生身旺兩相停，不喜再見比肩' as const,
    zhengCaiWeakMasterLuckCounterdirection: '財多如何不發財，只因身弱少培栽，運到比肩身旺地' as const,
    pianCaiIncludesBothPeerSubtypes: '最怕劫敗比肩' as const,
    pianCaiDivisionContext: '若見刑衝破害，比劫分奪' as const,
    hourWealthExplicitExample: '時上偏財，怕逢兄弟，如甲日見戊辰或甲戌時之例' as const,
    hourWealthMultiplicityQualifier: '只要一位，不宜多逢' as const,
    hourWealthNoAdditionalWuJiQualifier: '柱中不宜再見戊己' as const,
    case2010NineteenThirtyHourJiaXuLiteralMatch: true as const,
    case2010NineteenThirtyHasAdditionalYearJi: true as const,
    case2010NineteenThirtyEntireHourWealthPatternValidated: false as const,
    weakMasterLuckExampleApplicableToTheseNatalSnapshots: false as const,
    classicalBijeonWealthRelationUniversallyAbsent: false as const,
    classicalBijeonWealthRelationUniversallyAdverse: false as const,
    independentPhysicalWitnessesEstablished: false as const,
    originalPrintedFolioChecked: false as const,
    separateBijeonT8RuleAuthorized: false as const,
    bridgeDisposition: 'hold' as const,
  }),
  pairedRuntimeFinding: Object.freeze({
    checkedExactHead: '75ae1f869bb1f19cb12cb0dd6d31324b4d2e5d01' as const,
    ciRun: 39017251624 as const,
    fiveThirtyT8Emitted: true as const,
    nineteenThirtyT8NotEmitted: true as const,
    resultIsExistingRuleEligibilityNotUniqueHistoricalRelation: true as const,
    noT8IsProofNoClassicalBijeonWealthRelation: false as const,
    sourcePassageProvesMaterialInteractionOfCrossPillarFacts: false as const,
    original2010DistinctHumanMeaningProven: false as const,
    priorityAdjudication: 'METHODOLOGY_CONFLICT' as const,
    bridgeRecommendedDisposition: 'hold' as const,
    newResearchRuleEnabled: false as const,
    consumerClaimAdmitted: false as const,
    productionAuthorized: false as const,
  }),
  necessaryBeforeResumingAdmission: Object.freeze([
    'edition-and-revision-pinned physical-text or source-transcription reliability review',
    'explicit 甲見乙 敗財 versus generic 劫財 taxonomy and alias policy',
    'scope of 卯 hidden 乙 representative versus 乙 visible stem and relative 月令',
    'explicit evidence for interaction rather than whole-chart co-presence',
    'case-specific strengths/conditioning and Bijeon counterexample analysis',
    'independent reviewer plus source/method/version/claim scoped Bridge decision',
  ] as const),
});

export const GENERAL_NATAL_N10_PRIORITY_RESEARCH_CANDIDATES = Object.freeze({
  observationChannel: Object.freeze({
    existingMethodology: 'M-TEN-GOD-CONSUMER-THEME-YUANHAI' as const,
    existingSourceId: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE' as const,
    existingSourceLocator: '論日為主 / 論性情 / 十神（傷官、食神、財、官、殺、印、劫財）' as const,
    witness: 'Wikisource transcribed text; physical Yuanhai print not separately verified here' as const,
    exampleLeft: 'solar-1984-01-07-00:30' as const,
    exampleRight: 'solar-1984-01-07-12:30' as const,
    leftObserved: '시주 천간 丙(편관)' as const,
    rightObserved: '시주 지지 午(정관)' as const,
    differingSubtypeIsConfounder: true as const,
    mayClaimOnly: 'same officer-family abstract theme; separate exact T5 channel, subtype and slot as observations' as const,
    forbidden: 'stem=public/branch=private for all gods; personality, outcome or priority inferred from channel alone' as const,
    independentSemanticDifferenceValidated: false as const,
    bridgeAdmissionEligibleWithoutFurtherReview: false as const,
    productionAuthorized: false as const,
  }),
  exactRobWealthRelation: Object.freeze({
    existingMethodology: 'M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1' as const,
    existingT8RuleId: 'RULE-GENERAL-NATAL-SOURCE-BOUNDED-PEER-TO-WEALTH-ADVERSE' as const,
    existingT8Version: '0.2.0-research' as const,
    existingT8ClaimType: 'GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE' as const,
    existingT5PeerClaimType: 'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_PEER_PRESENT' as const,
    existingT5WealthClaimType: 'GENERAL_NATAL_SOURCE_BOUNDED_FAMILY_WEALTH_PRESENT' as const,
    exactMemberConstraint: '겁재' as const,
    fromFamily: 'peer' as const,
    toFamily: 'wealth' as const,
    classicalPattern: '劫財→財' as const,
    researchSources: Object.freeze([
      Object.freeze({ id: 'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE' as const, locator: '淵海子平·論劫財 (digital transcription)' as const }),
      Object.freeze({ id: 'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS' as const, locator: '三命通會（四庫全書本）卷五·論古人立印食官財名義 (digital transcription)' as const }),
      Object.freeze({ id: 'SRC-SAMYEONG-TONGHOE-V7-FOUR-LIBRARIES-PEER-TAXONOMY' as const, locator: '三命通會（四庫全書本）卷七·兄弟 (digital transcription)' as const }),
    ] as const),
    caseEligible: Object.freeze({ caseId: 'solar-2010-02-03-05:30' as const, hour: '丁卯' as const, observedExactPeer: '시주 지지 卯(겁재)' as const, observedWealth: '연주 천간 己(정재); 연·월 지지 丑(정재)' as const, sourceRuleInputsAvailableInN10ObservedFacts: true as const }),
    caseCounterexample: Object.freeze({ caseId: 'solar-2010-02-03-19:30' as const, hour: '甲戌' as const, observedPeer: '시주 천간 甲(비견)' as const, observedWealth: '연주 천간 己(정재); 연·월 지지 丑(정재); 시지 戌(편재)' as const, exactRobObserved: false as const }),
    scope: 'structural_relation_predicate_eligibility_only' as const,
    requireSameSnapshotAndScenario: true as const,
    requireTwoDistinctEmittedT5ClaimIds: true as const,
    requireT8RuntimeEmissionBeforeConsumption: true as const,
    secondaryOnlyAndUnreviewed: true as const,
    cannotTreatLackOfObservedRobAsUniversalHistoricalAbsence: true as const,
    mayInferAdverseFinancialOutcome: false as const,
    mayInferPersonalityOrCareerOrRelationship: false as const,
    mayInventCausalInteractionStrengthOrTemporalTiming: false as const,
    bridgeAdmissionEligibleWithoutFurtherReview: false as const,
    productionAuthorized: false as const,
  }),
  overall: Object.freeze({
    consumerMeaningNewlyAdmitted: 0 as const,
    minimumUsefulCompositeReadingApproved: 0 as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
    bridgeReviewPending: true as const,
    engineMainMutated: false as const,
  }),
});
