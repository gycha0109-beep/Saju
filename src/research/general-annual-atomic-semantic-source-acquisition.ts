import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualResearchReturnHandoff } from './general-annual-research-return-handoff.js';

export const GENERAL_ANNUAL_ATOMIC_SOURCE_ACQUISITION_VERSION =
  'myeonghwa-general-annual-atomic-source-acquisition-v1' as const;

export const GENERAL_ANNUAL_CURRENT_THEME_KEYS = Object.freeze([
  'ANNUAL_PEER_SELF_DIRECTION',
  'ANNUAL_PEER_COMPETITION_COORDINATION',
  'ANNUAL_OUTPUT_STEADY_PRODUCTION',
  'ANNUAL_OUTPUT_EXPRESSION_CHANGE',
  'ANNUAL_WEALTH_EXTERNAL_RESOURCES',
  'ANNUAL_WEALTH_STRUCTURED_RESOURCES',
  'ANNUAL_OFFICER_PRESSURE_RESPONSE',
  'ANNUAL_OFFICER_ROLE_RESPONSIBILITY',
  'ANNUAL_RESOURCE_ALTERNATIVE_LEARNING',
  'ANNUAL_RESOURCE_SUPPORT_LEARNING',
] as const);

export const GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION = Object.freeze({
  propositionId: 'GENERAL_ANNUAL_STEM_TO_DAY_MASTER_TEN_GOD_RELATION_IDENTITY',
  inputs: Object.freeze([
    'temporal.annualPillar.stem',
    'derivedFacts.dayMaster',
  ] as const),
  conclusion:
    'A resolved annual heavenly stem may be related to the resolved natal day master by an exact Ten-God relation identity.',
  outputScope: 'relation_identity_only',
  prohibitedExtensions: Object.freeze([
    'NO_LUCK_SCORE',
    'NO_EVENT_GUARANTEE',
    'NO_PERSONALITY_INFERENCE',
    'NO_CAREER_OUTCOME',
    'NO_WEALTH_OUTCOME',
    'NO_RELATIONSHIP_OUTCOME',
    'NO_HEALTH_OUTCOME',
    'NO_CURRENT_THEME_KEY_INHERITANCE',
  ] as const),
});

export const GENERAL_ANNUAL_SOURCE_CANDIDATES = Object.freeze([
  Object.freeze({
    candidateId: 'GUJIN_TUSHU_JICHENG_VOL470_PAGE50_SANMING_TONGHUI_LUN_TAISUI',
    sourceIdentity: Object.freeze({
      title: '欽定古今圖書集成·博物彙編·藝術典·第五百九十八卷',
      embeddedWork: '三命通會·論太歲',
      publicationPeriod: '1700-1725',
      sourceClass: 'historical_compilation_page_transmitting_sanming_tonghui',
      locator:
        'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_470_(1700-1725).djvu/50',
    }),
    acquisition: Object.freeze({
      directPageSurfaceAcquired: true,
      reproducible: true,
      exactPageBound: true,
      primary1578EditionScan: false,
    }),
    evidence: Object.freeze({
      annualStemToDayStemRelationExplicit: true,
      gengYearControlsJiaDayAsPianGuanExplicit: true,
      jiaDayControlsWuYearAsPianCaiExplicit: true,
      currentModernThemeSemanticsExplicit: false,
      annualBranchClashGenericTensionSemanticsExplicit: false,
    }),
    disposition: 'EXACT_HISTORICAL_TRANSMISSION_CORROBORATION' as const,
    notes:
      'Exact historical page-level transmission of the annual-stem/day-stem examples. It corroborates the atomic relation proposition but is not treated as the visually verified 1578 primary-edition page.',
  }),
  Object.freeze({
    candidateId: 'NCL_1578_SANMING_TONGHUI_SCAN_CHUNK_1',
    sourceIdentity: Object.freeze({
      title: '三命通會',
      author: '萬民英',
      edition: '明萬曆戊寅六年刊本',
      publicationYear: 1578,
      holder: 'National Central Library, Taiwan',
      sourceClass: 'primary_edition_scan_upload_chunk',
      locator:
        'https://commons.wikimedia.org/wiki/File:NCL-06589_1_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf',
    }),
    acquisition: Object.freeze({
      scanObjectLocated: true,
      reproducible: true,
      commonsUploadChunk: 1 as const,
      pageCount: 1000,
      workVolumeTwoIdentityEstablished: false,
      exactLunTaisuiPageBound: false,
      relevantPassageVisuallyVerified: false,
      contentHashBound: false,
    }),
    disposition: 'PRIMARY_SCAN_PAGE_VERIFICATION_REQUIRED' as const,
    notes:
      'This is Commons upload chunk 1 for the 1578 edition. The suffix "_1" is an upload-object index, not verified evidence that this object maps to a particular work volume. Locate and visually bind 論太歲 before treating the primary edition as direct proposition evidence.',
  }),
  Object.freeze({
    candidateId: 'NCL_1578_SANMING_TONGHUI_SCAN_CHUNK_2',
    sourceIdentity: Object.freeze({
      title: '三命通會',
      author: '萬民英',
      edition: '明萬曆戊寅六年刊本',
      publicationYear: 1578,
      holder: 'National Central Library, Taiwan',
      sourceClass: 'primary_edition_scan_upload_chunk',
      locator:
        'https://commons.wikimedia.org/wiki/File:NCL-06589_2_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf',
    }),
    acquisition: Object.freeze({
      scanObjectLocated: true,
      reproducible: true,
      commonsUploadChunk: 2 as const,
      pageCount: 187,
      workVolumeTwoIdentityEstablished: false,
      exactLunTaisuiPageBound: false,
      relevantPassageVisuallyVerified: false,
      contentHashBound: false,
    }),
    disposition: 'PRIMARY_SCAN_PAGE_VERIFICATION_REQUIRED' as const,
    notes:
      'This is Commons upload chunk 2 for the 1578 edition. The suffix "_2" must not be read as 三命通會 卷二. Exact work-volume and page mapping remain unverified.',
  }),
  Object.freeze({
    candidateId: 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_UPPER_SCAN',
    sourceIdentity: Object.freeze({
      title: '三命通會',
      author: '萬民英',
      holder: 'National Library of China',
      edition: '刻本',
      publicationPeriod: '明萬曆[1573-1620]',
      volume: '第3冊',
      workVolume: '卷之二上',
      sourceClass: 'ming_woodblock_scan_with_explicit_work_volume_mapping',
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67186_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC3%E5%86%8A.pdf',
    }),
    acquisition: Object.freeze({
      scanObjectLocated: true,
      reproducible: true,
      pageCount: 38,
      workVolumeTwoIdentityEstablished: true,
      exactLunTaisuiPageBound: false,
      relevantPassageVisuallyVerified: false,
      exactEditionIdentityWith1578NclTaiwanEstablished: false,
      fileSha1: 'd340e84e9aa4c788f004e3c63781327148edca4b',
      fileSha256: '112084f6f463038285d87c477a6f80527d44a3e3d4d16a5e0ecfb24159f320d2',
      originalPdfBytesDownloaded: true,
      entirePdfPageSetRendered: true,
      contentHashBound: true,
    }),
    disposition: 'MING_VOLUME_UPPER_SCAN_ACQUIRED_NO_LUN_TAISUI_PAGE_BOUND' as const,
    notes:
      'All 38 original PDF pages were downloaded and rendered, with both calculated file hashes bound. 論太歲 is directly bound instead in the distinct lower-volume scan; no identity with the Taiwan 1578 edition is inferred.',
  }),
  Object.freeze({
    candidateId: 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN',
    sourceIdentity: Object.freeze({
      title: '三命通會',
      author: '萬民英',
      holder: 'National Library of China',
      edition: '刻本',
      publicationPeriod: '明萬曆[1573-1620]',
      volume: '第4冊',
      workVolume: '卷之二下',
      sourceClass: 'ming_woodblock_scan_with_explicit_work_volume_mapping',
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67187_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC4%E5%86%8A.pdf',
    }),
    acquisition: Object.freeze({
      scanObjectLocated: true,
      reproducible: true,
      pageCount: 55,
      commonsSha1: '790baba8f4b7abc2ab706db2ae8eff4651c270ff',
      calculatedSha1: '790baba8f4b7abc2ab706db2ae8eff4651c270ff',
      calculatedSha256: '3e2e924984f51628207bfec441729b1b616e4f051cfa3ea6661262888bba1f18',
      sha1MatchedPublishedObject: true,
      workVolumeTwoIdentityEstablished: true,
      exactLunTaisuiPageBound: true,
      pdfPageOneBased: 25,
      pdfPageZeroBased: 24,
      sectionHeadingOnRightLeaf: '論太歲',
      examplesOnLeftLeaf: Object.freeze([
        '歲君傷日者如庚剋甲日為偏官',
        '日犯歲君如甲日剋戊年為偏財',
      ] as const),
      historicalPrintedFolioIndexVerified: false,
      relevantPassageVisuallyVerified: true,
      originalPdfBytesDownloaded: true,
      entirePdfPageSetRendered: true,
      exactEditionIdentityWith1578NclTaiwanEstablished: false,
      contentHashBound: true,
      evidenceRunId: 37752324421,
    }),
    disposition: 'EXACT_MING_PRIMARY_PRINT_IMAGE_VERIFIED_ATOMIC_RELATION_ONLY' as const,
    notes:
      'At PDF image 25 (0-based 24), the right leaf visibly bears 論太歲 and the left leaf visibly contains 庚剋甲日為偏官 and 甲日剋戊年為偏財. Actual 23.8MB original PDF was fetched; calculated SHA-1 matches Commons. The visible classical metaphor and auspiciousness language do not authorize later modern annual themes, deterministic events or Production. Printed folio number and precise equivalence to the Taiwan 1578 edition are not verified.',
  }),
  Object.freeze({
    candidateId: 'NLC_1926_SANMING_TONGHUI_SCAN',
    sourceIdentity: Object.freeze({
      title: '三命通會',
      editor: '秦慎安校勘',
      publisher: '文明書局',
      publicationYear: 1926,
      holder: 'National Library of China',
      sourceClass: 'historical_print_scan_object',
      locator:
        'https://commons.wikimedia.org/wiki/File:NLC416-13jh000156-94145_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf',
    }),
    acquisition: Object.freeze({
      scanObjectLocated: true,
      reproducible: true,
      pageCount: 455,
      commonsSha1: '0585bf97a47dedbcadf78e657a896bfdd20c0550',
      tableOfContentsPlacesTaisuiInVolumeTwo: true,
      exactLunTaisuiPageBound: false,
      relevantPassageVisuallyVerified: false,
    }),
    disposition: 'HISTORICAL_SCAN_PAGE_VERIFICATION_REQUIRED' as const,
    notes:
      'Useful edition-level cross-check. Exact page binding is still required before treating it as direct-body proposition evidence.',
  }),
  Object.freeze({
    candidateId: 'WIKISOURCE_SANMING_TONGHUI_VOLUME2_LUN_TAISUI',
    sourceIdentity: Object.freeze({
      title: '三命通會/卷二 — 論太歲',
      sourceClass: 'modern_public_transcription',
      locator:
        'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C',
    }),
    acquisition: Object.freeze({
      directTextSurfaceAcquired: true,
      reproducible: true,
      exactSectionBound: true,
      primaryScanWitness: false,
    }),
    evidence: Object.freeze({
      annualStemToDayStemRelationExplicit: true,
      gengYearControlsJiaDayAsPianGuanExplicit: true,
      jiaDayControlsWuYearAsPianCaiExplicit: true,
      currentModernThemeSemanticsExplicit: false,
    }),
    disposition: 'TRANSCRIPTION_LOCATOR_AND_CORROBORATION' as const,
    notes:
      'Useful locator and transcription cross-check only. It does not replace visual verification of a primary scan.',
  }),
  Object.freeze({
    candidateId: 'LEE_KIM_2022_TEN_GOD_CLASSIC_MODERN_BOUNDARY',
    sourceIdentity: Object.freeze({
      title: '명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구',
      authors: Object.freeze(['이남연', '김기승'] as const),
      publicationYear: 2022,
      sourceClass: 'scholarly_secondary_semantic_boundary',
      doi: '10.21186/IPR.2022.7.1.025',
      kciArticleId: 'ART002810441',
    }),
    evidence: Object.freeze({
      classicalToModernSemanticExpansionBoundaryRelevant: true,
      currentAnnualThemeKeysDirectlySupported: false,
    }),
    disposition: 'MODERN_SEMANTIC_EXPANSION_BOUNDARY' as const,
    notes:
      'Used to block the shortcut from classical Ten-God relation identity to modern psychology/aptitude/function or product-theme semantics.',
  }),
  Object.freeze({
    candidateId: 'KIM_MAN_TAE_2013_BRANCH_CLASH_ORIGIN',
    sourceIdentity: Object.freeze({
      title: '십이지(十二支)의 상호작용 관계로서 충(衝)·형(刑)에 관한 근원 고찰',
      author: '김만태',
      publicationYear: 2013,
      sourceClass: 'scholarly_secondary_branch_interaction',
      doi: '10.25024/ksq.36.3.201309.134',
    }),
    evidence: Object.freeze({
      sixClashAsBranchInteractionRelevant: true,
      structuralChangePossibilityRelevant: true,
      annualSpecificLifeDomainEventAuthorized: false,
    }),
    disposition: 'BRANCH_INTERACTION_STRUCTURAL_CORROBORATION' as const,
    notes:
      'Supports studying 六冲 as branch interaction. It does not authorize accident, separation, illness, financial loss, or other annual event outcomes.',
  }),
] as const);

export function buildGeneralAnnualAtomicSourceAcquisition() {
  const handoff = buildGeneralAnnualResearchReturnHandoff();

  const themeDispositions = Object.freeze(
    GENERAL_ANNUAL_CURRENT_THEME_KEYS.map((semanticKey) =>
      Object.freeze({
        semanticKey,
        disposition: 'REQUIRES_SEPARATE_DIRECT_SUPPORT' as const,
        inheritedFromAtomicTenGodRelation: false as const,
      }),
    ),
  );

  const material = Object.freeze({
    version: GENERAL_ANNUAL_ATOMIC_SOURCE_ACQUISITION_VERSION,
    issue: '#2386' as const,
    upstreamHandoff: Object.freeze({
      version: handoff.version,
      handoffHash: handoff.handoffHash,
      candidateSurfaceHash:
        handoff.candidateBinding.candidateSurfaceHash,
      researchReturnRequired: handoff.researchReturnRequired,
      highestPermittedFutureReentryState:
        handoff.reentryRequirements.highestPermittedFutureReentryState,
    }),
    atomicStemRelationProposition:
      GENERAL_ANNUAL_ATOMIC_STEM_RELATION_PROPOSITION,
    atomicStemRelationAdjudication: Object.freeze({
      supportGrade: 'DIRECT_MING_PRIMARY_PRINT_VERIFIED_ATOMIC_IDENTITY_ONLY' as const,
      witnessCandidateId: 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN' as const,
      sourceStatement: Object.freeze([
        '歲君傷日者如庚剋甲日為偏官',
        '日犯歲君如甲日剋戊年為偏財',
      ] as const),
      interpretiveReading:
        'The classical examples compare an annual heavenly stem with the natal day stem and give Ten-God relation identities, with directionality preserved.',
      researchInference:
        'When the natal Day Master and the target-year heavenly stem are each unambiguously resolved, the governed Ten-God relation table may return a bounded relation identity; no modern annual activation-theme or event outcome follows from that identity.',
      requiredInputs: Object.freeze([
        'resolved_natal_day_master',
        'resolved_target_year_heavenly_stem',
      ] as const),
      qualifiers: Object.freeze([
        'ANNUAL_TO_NATAL_RELATION_DIRECTION_MUST_BE_PRESERVED',
        'DIRECT_WITNESS_IS_MING_WANLI_PRINT_NOT_VERIFIED_TAIWAN_1578_EDITION',
        'CLASSICAL_OUTCOME_METAPHORS_DO_NOT_AUTOMATICALLY_ENTER_PRODUCT_SEMANTICS',
      ] as const),
      exceptions: Object.freeze([
        'MISSING_OR_AMBIGUOUS_NATAL_DAY_MASTER_FAIL_CLOSED',
        'MISSING_OR_AMBIGUOUS_TARGET_YEAR_STEM_FAIL_CLOSED',
        'UNVERIFIED_SCHOOL_SPECIFIC_OUTCOME_RULES_NOT_INHERITED',
      ] as const),
      counterexamples: Object.freeze([
        '庚_YEAR_CONTROLS_甲_DAY_IS_偏官_NOT_偏財',
        '甲_DAY_CONTROLS_戊_YEAR_IS_偏財_NOT_偏官',
        'TEN_GOD_IDENTITY_WITHOUT_EVENT_EVIDENCE_CANNOT_PREDICT_OUTCOME',
      ] as const),
      schoolDependencies: Object.freeze([
        'EXACT_GOVERNED_TEN_GOD_RELATION_TAXONOMY_REQUIRED',
        'LATER_SCHOOL_INTERPRETATIONS_REQUIRE_SEPARATE_DIRECT_SOURCES',
      ] as const),
      nonImplications: Object.freeze([
        'NO_LUCK_SCORE',
        'NO_EVENT_GUARANTEE',
        'NO_HEALTH_CAREER_WEALTH_RELATIONSHIP_OUTCOME',
        'NO_CURRENT_ANNUAL_THEME_AUTOMATIC_QUALIFICATION',
        'NO_MONTHLY_AUTHORITY',
        'NO_BRIDGE_REENTRY',
      ] as const),
      evidenceOnly: true as const,
      production: 'HOLD' as const,
    }),
    sourceCandidates: GENERAL_ANNUAL_SOURCE_CANDIDATES,
    themeDispositions,
    annualBranchClashBoundary: Object.freeze({
      deterministicRelationFactMayBeInputEvidence: true as const,
      branchInteractionStructuralResearchRelevant: true as const,
      genericAnnualTensionSemanticAuthorized: false as const,
      pillarSpecificEmphasisAuthorized: false as const,
      specificEventPredictionAuthorized: false as const,
      prohibitedEventExtensions: Object.freeze([
        'accident',
        'illness',
        'separation',
        'financial_loss',
        'guaranteed_life_domain_event',
      ] as const),
    }),
    observations: Object.freeze({
      exactHistoricalTransmissionPageBound: true as const,
      primary1578EditionScanChunksLocated: true as const,
      mingWanliExplicitVolumeTwoUpperLowerScanObjectsLocated: true as const,
      exactMingLunTaisuiPageBound: true as const,
      exactMingLunTaisuiPassageVisuallyVerified: true as const,
      primary1578WorkVolumeTwoChunkIdentified: false as const,
      exactPrimary1578LunTaisuiPageBound: false as const,
      exactPrimary1578PassageVisuallyVerified: false as const,
      atomicStemRelationSourceQualified: true as const,
      currentModernThemeSemanticsSourceQualified: false as const,
      annualBranchClashGenericTensionSourceQualified: false as const,
      candidateSemanticsMayBeNarrowedReplacedOrRemoved: true as const,
      bridgeReentryReady: false as const,
    }),
    nextDisposition:
      'SEPARATELY_ADJUDICATE_TEN_CURRENT_ANNUAL_THEMES_BEFORE_BRIDGE_REREVIEW' as const,
    authorityBoundary: Object.freeze({
      researchEvidenceOnly: true as const,
      currentCandidateMutated: false as const,
      engineAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      publicGeneralAvailabilityAuthorized: false as const,
      persistenceAuthorized: false as const,
      commerceAuthorized: false as const,
      annualDetailedAuthorized: false as const,
      monthlyAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    acquisitionId: deterministicContentHash(material),
    ...material,
  });
}
