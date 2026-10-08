import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const GENERAL_ANNUAL_SOURCE_QUALIFIED_EVIDENCE_VERSION =
  'myeonghwa-general-annual-source-qualified-evidence-v1' as const;

export type GeneralAnnualResearchSupport =
  | 'PRIMARY_SUPPORTED'
  | 'MULTI_SOURCE_SUPPORTED'
  | 'CROSS_REFERENCE_ONLY'
  | 'INSUFFICIENT';

export type GeneralAnnualCandidateDisposition =
  | 'RETAIN_WITH_DIRECT_SUPPORT'
  | 'NARROW'
  | 'REPLACE'
  | 'REMOVE';

const CURRENT_THEME_KEYS = Object.freeze([
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

const CURRENT_CLASH_KEYS = Object.freeze([
  'ANNUAL_BRANCH_CLASH_YEAR',
  'ANNUAL_BRANCH_CLASH_MONTH',
  'ANNUAL_BRANCH_CLASH_DAY',
  'ANNUAL_BRANCH_CLASH_HOUR',
] as const);

const SOURCES = Object.freeze([
  Object.freeze({
    sourceId: 'SRC-SMT-NLC-1926-V2-TAISUI',
    kind: 'primary_scan',
    title: '三命通會',
    author: '萬民英',
    edition: '秦慎安校勘，文明書局，民國十五年（1926）',
    holder: 'National Library of China',
    publicObject:
      'https://commons.wikimedia.org/wiki/File:NLC416-13jh000156-94145_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf',
    mediaSha1: '0585bf97a47dedbcadf78e657a896bfdd20c0550',
    mediaPages: 455,
    locator: '卷二，印刷頁四二（42），「論太歲」首段',
    pageBoundStatements: Object.freeze([
      '庚年克甲日為偏官',
      '甲日克戊年為偏財',
    ] as const),
    verification: Object.freeze({
      directObjectMetadataVerified: true as const,
      directPageBoundTextVerified: true as const,
      manualTargetPageImageVerificationComplete: false as const,
      note:
        'Direct PDF object, checksum, printed-page locator, and page-bound body text are fixed. Target-page image rendering repeatedly returned cache-miss during this pass, so manual visual confirmation is explicitly left open.',
    }),
  }),
  Object.freeze({
    sourceId: 'SRC-SMT-WIKISOURCE-V2-TAISUI',
    kind: 'primary_text_cross_reference',
    title: '三命通會／卷二／論太歲',
    publicObject:
      'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E4%BA%8C',
    use:
      'Locator/cross-edition transcription only; not a substitute for the frozen scan object.',
  }),
  Object.freeze({
    sourceId: 'SRC-LEE-KIM-2022-TEN-GOD-EXPANSION',
    kind: 'modern_scholarly_boundary',
    title: 'A Study on the Establishment and Expanding the Concept of SHIPSONG in Myeonglee',
    authors: Object.freeze(['Nam-Yeon Lee', 'Ki-Seung Kim'] as const),
    year: 2022,
    journal: 'Industry Promotion Research',
    volume: '7(1)',
    pages: '25-34',
    doi: '10.21186/IPR.2022.7.1.025',
    use:
      'Boundary evidence: modern psychology/aptitude/function meanings are later semantic expansions and are not automatically inherited from classical Ten-God identity.',
  }),
  Object.freeze({
    sourceId: 'SRC-KIM-2013-BRANCH-CHUNG-HYEONG',
    kind: 'modern_scholarly_cross_reference',
    title: '십이지(十二支)의 상호작용 관계로서 충(衝)·형(刑)에 관한 근원 고찰',
    author: '김만태',
    year: 2013,
    journal: '한국학',
    volume: '36(3)',
    pages: '134-164',
    doi: '10.25024/ksq.36.3.201309.134',
    use:
      'Supports clash as a branch-interaction concept whose constituent characteristics/actions may change; does not authorize annual-specific concrete events.',
  }),
  Object.freeze({
    sourceId: 'SRC-LEE-2021-JIJI-HAPCHUNG',
    kind: 'modern_scholarly_cross_reference',
    title: '명리학에서 합충(合沖)에 의한 지지(地支)의 합력(合力) 차 연구',
    author: '이재승',
    year: 2021,
    journal: '인문사회 21',
    volume: '12(6)',
    pages: '2801-2816',
    kciArticleId: 'ART002788509',
    use:
      'Contextual branch-interaction mechanics only. The paper itself identifies 大·歲運 合沖 as follow-up work, so it is not annual-specific outcome authority.',
  }),
]);

export function buildGeneralAnnualSourceQualifiedEvidence() {
  const themeDispositions = Object.freeze(
    CURRENT_THEME_KEYS.map((semanticKey) =>
      Object.freeze({
        semanticKey,
        disposition: 'REPLACE' as GeneralAnnualCandidateDisposition,
        replacementPropositionId: 'ANNUAL_STEM_DAY_MASTER_TEN_GOD_IDENTITY',
        reason:
          'The current modern functional theme meaning is not directly established by the primary annual source. Preserve only the narrower annual-stem ↔ natal-day-stem Ten-God identity proposition.',
      }),
    ),
  );

  const clashDispositions = Object.freeze(
    CURRENT_CLASH_KEYS.map((semanticKey) =>
      Object.freeze({
        semanticKey,
        disposition: 'REPLACE' as GeneralAnnualCandidateDisposition,
        replacementPropositionId: 'ANNUAL_TO_NATAL_SIX_CLASH_RELATION_FACT',
        reason:
          'Resolved clash identity is supportable, but the current generic tension narrative, pillar-specific emphasis, polarity, and event implications are not source-qualified as written.',
      }),
    ),
  );

  const material = Object.freeze({
    version: GENERAL_ANNUAL_SOURCE_QUALIFIED_EVIDENCE_VERSION,
    issue: '#2386' as const,
    scope: 'general:annual' as const,
    sources: SOURCES,
    propositions: Object.freeze({
      annualStemDayMasterTenGodIdentity: Object.freeze({
        propositionId: 'ANNUAL_STEM_DAY_MASTER_TEN_GOD_IDENTITY' as const,
        support: 'PRIMARY_SUPPORTED' as GeneralAnnualResearchSupport,
        sourceStatement: Object.freeze([
          '庚年克甲日為偏官',
          '甲日克戊年為偏財',
        ] as const),
        interpretiveReading:
          'The annual heavenly stem is explicitly evaluated in relation to the natal day stem using Ten-God categories.',
        researchInference:
          'When the target-year stem and natal Day Master are both resolved, the governed Ten-God relation table may produce an annual-stem Ten-God identity fact. This inference does not import later functional or psychological theme copy.',
        requiredInputs: Object.freeze([
          'resolved_target_year',
          'resolved_annual_heavenly_stem',
          'resolved_natal_day_master',
        ] as const),
        meaningStrength: 'identity_only' as const,
        allowedConclusions: Object.freeze([
          'deterministic_ten_god_relation_identity',
        ] as const),
        nonImplications: Object.freeze([
          'NO_SELF_DIRECTION_THEME',
          'NO_COMPETITION_COORDINATION_THEME',
          'NO_PRODUCTION_OR_EXPRESSION_THEME',
          'NO_RESOURCE_OR_WEALTH_MAGNITUDE_THEME',
          'NO_PRESSURE_OR_RESPONSIBILITY_THEME',
          'NO_LEARNING_STYLE_THEME',
          'NO_LUCK_SCORE',
          'NO_DETERMINISTIC_EVENT',
        ] as const),
      }),
      annualToNatalSixClashRelationFact: Object.freeze({
        propositionId: 'ANNUAL_TO_NATAL_SIX_CLASH_RELATION_FACT' as const,
        support: 'MULTI_SOURCE_SUPPORTED' as GeneralAnnualResearchSupport,
        interpretiveReading:
          'A resolved annual branch may stand in a Six-Clash relation to a resolved natal branch. The relation fact is separate from its effect.',
        researchInference:
          'The relation identity may be used as bounded input evidence. It does not by itself establish loss, illness, separation, accident, financial harm, or a pillar-specific severity.',
        meaningStrength: 'relation_identity_only' as const,
        allowedConclusions: Object.freeze([
          'resolved_six_clash_relation_identity',
          'structural_interaction_candidate',
        ] as const),
        nonImplications: Object.freeze([
          'NO_GENERIC_TENSION_NARRATIVE_AUTHORITY',
          'NO_PILLAR_SPECIFIC_SEVERITY',
          'NO_CHALLENGING_POLARITY_FROM_CLASH_ALONE',
          'NO_ACCIDENT_PREDICTION',
          'NO_ILLNESS_PREDICTION',
          'NO_SEPARATION_PREDICTION',
          'NO_FINANCIAL_LOSS_PREDICTION',
        ] as const),
      }),
      genericAnnualClashTensionNarrative: Object.freeze({
        propositionId: 'GENERIC_ANNUAL_CLASH_TENSION_NARRATIVE' as const,
        support: 'CROSS_REFERENCE_ONLY' as GeneralAnnualResearchSupport,
        reason:
          'Modern branch-interaction scholarship supports structural interaction as a concept, but current annual-specific tension wording and four-pillar emphasis are not directly established.',
      }),
      currentModernAnnualThemeSemantics: Object.freeze({
        propositionId: 'CURRENT_MODERN_ANNUAL_THEME_SEMANTICS' as const,
        support: 'INSUFFICIENT' as GeneralAnnualResearchSupport,
        reason:
          'The direct classical witness establishes annual/day-stem relation categories, not the current self-direction, coordination, production, resource, responsibility, or learning-style meanings.',
      }),
    }),
    currentCandidateDisposition: Object.freeze({
      activationThemeRuleCount: 10 as const,
      branchClashRuleCount: 4 as const,
      themeDispositions,
      clashDispositions,
      currentCandidateMayNotBePreservedByInertia: true as const,
      freshCandidateSurfaceRequiredForBridgeRereview: true as const,
    }),
    annualScopeContract: Object.freeze({
      natalAuthorityInheritedAutomatically: false as const,
      monthlyAuthorityAuthorized: false as const,
      annualScopeMayBeExtendedToMonthlyAutomatically: false as const,
      temporalFactIsInterpretationAuthority: false as const,
      productPolicyIsTraditionalSemanticAuthority: false as const,
      requiredSeparation: Object.freeze([
        'SOURCE_STATEMENT',
        'INTERPRETIVE_READING',
        'RESEARCH_INFERENCE',
      ] as const),
    }),
    prohibitedExtensions: Object.freeze([
      'NO_CURRENT_THEME_KEY_RETAINED_WITHOUT_DIRECT_SUPPORT',
      'NO_NATAL_TO_ANNUAL_WHOLESALE_INHERITANCE',
      'NO_ANNUAL_TO_MONTHLY_EXPANSION',
      'NO_LUCK_SCORE',
      'NO_WEALTH_MAGNITUDE',
      'NO_HEALTH_OUTCOME',
      'NO_RELATIONSHIP_OUTCOME',
      'NO_ACCIDENT_ILLNESS_SEPARATION_OR_LOSS_EVENT_FROM_CLASH_ALONE',
      'NO_PILLAR_SEVERITY_FROM_CLASH_ALONE',
      'NO_ENGINE_PREVIEW_OFFICIAL_OR_PRODUCTION_PROMOTION',
    ] as const),
    completion: Object.freeze({
      researchEvidenceArtifactEstablished: true as const,
      semanticDispositionEstablished: true as const,
      primaryScanObjectBound: true as const,
      primaryScanChecksumBound: true as const,
      primaryScanPrintedPageBound: true as const,
      manualTargetPageImageVerificationComplete: false as const,
      researchEvidenceComplete: false as const,
      bridgeReentryReady: false as const,
      nextDisposition:
        'COMPLETE_TARGET_PAGE_IMAGE_VERIFICATION_THEN_READY_FOR_BRIDGE_REREVIEW' as const,
      authorityCeiling: 'READY_FOR_BRIDGE_REREVIEW' as const,
    }),
  });

  return Object.freeze({
    ...material,
    evidenceHash: deterministicContentHash(material),
  });
}
