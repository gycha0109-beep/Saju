export const R122_SEASON_ROOT_COUNTEREXAMPLE_VERSION = '0.1.0-research' as const;

export type R122CounterexampleVerdict =
  | 'COUNTEREXAMPLE_CONFIRMED'
  | 'PARTIAL_COUNTEREXAMPLE'
  | 'CONTEXT_DEPENDENT'
  | 'SOURCE_DIVERGENT'
  | 'INSUFFICIENT_ISOLATION'
  | 'INCONCLUSIVE';

export type R122IsolationState =
  | 'EXACT_FOUR_PILLAR'
  | 'BOUNDED_PARTIAL_CONFIGURATION'
  | 'SOURCE_PROPOSITION_ONLY'
  | 'SOURCE_STRATUM_COMPARISON';

export type R122CounterexampleFamily =
  | 'SEASON_ANTI_DETERMINISM'
  | 'VISIBLE_SUPPORT_WITHOUT_ROOT'
  | 'MONTH_SCOPE_ANTI_EXCLUSIVITY'
  | 'TOUGAN_TONGGEN_NON_EQUIVALENCE'
  | 'ROOT_NEGATIVE_BOUNDARY'
  | 'MUKU_YIN_YANG_DIVERGENCE'
  | 'YUQI_TEMPORAL_VARIABILITY'
  | 'CHANGSHENG_SOURCE_STRATUM_DIVERGENCE'
  | 'ROOT_CLASS_NON_NUMERIC_BOUNDARY'
  | 'SUPPORT_AGGREGATION_BOUNDARY'
  | 'TEXTUAL_DEPENDENCY_RISK';

export interface R122CounterexampleCase {
  caseId: string;
  family: R122CounterexampleFamily;
  comparisonGroupId: string | null;
  upstreamEvidenceRefs: readonly string[];
  sourceScope: string;
  seasonContext: string | null;
  rootContext: readonly string[];
  otherFactors: readonly string[];
  sourceStatement: string;
  interpretiveReading: string;
  researchInference: string;
  naiveRuleTested: string;
  verdict: R122CounterexampleVerdict;
  isolation: R122IsolationState;
  unresolvedFactors: readonly string[];
  prohibitedExtensions: readonly string[];
}

export const R122_COUNTEREXAMPLE_CASES: readonly R122CounterexampleCase[] =
  Object.freeze([
    {
      caseId: 'R122-C01-SPRING-WOOD-HEAVY-METAL',
      family: 'SEASON_ANTI_DETERMINISM',
      comparisonGroupId: 'SEASON-WOOD-ANTI-DETERMINISM',
      upstreamEvidenceRefs: [
        'R019',
        'src/research/general-natal-borderline-strength-case-corpus.ts',
        'R020',
      ],
      sourceScope: '徐樂吾評註 / 論十干得時不旺失時不弱',
      seasonContext: '春木 / 得時',
      rootContext: [],
      otherFactors: ['干庚辛', '支酉丑', '無火制'],
      sourceStatement: '是以得時而不旺也',
      interpretiveReading:
        'Seasonal timeliness is present, but the selected example explicitly withholds an automatic 旺 result under the stated opposing configuration.',
      researchInference:
        '得時 alone is not a sufficient predicate for final 旺/強 classification.',
      naiveRuleTested: '得時 => automatically 旺 or 強',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'BOUNDED_PARTIAL_CONFIGURATION',
      unresolvedFactors: [
        'complete four pillars unavailable in the bounded example',
        'exact day master not pinned by this corpus row',
        'full hidden-stem state unavailable',
      ],
      prohibitedExtensions: [
        'INFER_COMPLETE_CHART_STRENGTH',
        'INFER_NUMERIC_SEASON_PENALTY',
      ],
    },
    {
      caseId: 'R122-C02-AUTUMN-WOOD-DEEP-ROOT',
      family: 'SEASON_ANTI_DETERMINISM',
      comparisonGroupId: 'SEASON-WOOD-ANTI-DETERMINISM',
      upstreamEvidenceRefs: [
        'R019',
        'src/research/general-natal-borderline-strength-case-corpus.ts',
        'R020',
      ],
      sourceScope: '徐樂吾評註 / 論十干得時不旺失時不弱',
      seasonContext: '秋木 / 失時',
      rootContext: ['支寅卯', '木根深'],
      otherFactors: ['干甲乙'],
      sourceStatement: '是失時不弱也',
      interpretiveReading:
        'Seasonal loss does not force weakness when the bounded example retains explicit root/support conditions.',
      researchInference:
        '失時 alone is not a sufficient predicate for final 弱 classification.',
      naiveRuleTested: '失時 => automatically 弱',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'BOUNDED_PARTIAL_CONFIGURATION',
      unresolvedFactors: [
        'complete four pillars unavailable in the bounded example',
        'full Ten-God distribution unavailable',
      ],
      prohibitedExtensions: [
        'ROOT_PRESENCE_EQUALS_AUTOMATIC_STRONG',
        'INFER_NUMERIC_ROOT_BONUS',
      ],
    },
    {
      caseId: 'R122-C03-FOUR-XIN-MAO',
      family: 'VISIBLE_SUPPORT_WITHOUT_ROOT',
      comparisonGroupId: 'REPEATED-STEMS-WITHOUT-ROOT',
      upstreamEvidenceRefs: [
        'R019',
        'R018',
        'src/research/general-natal-borderline-strength-case-corpus.ts',
      ],
      sourceScope: 'R019 governed exact four-pillar seed',
      seasonContext: null,
      rootContext: ['金不通根'],
      otherFactors: ['天元一氣', 'four 辛 stems'],
      sourceStatement: '四辛卯，金不通根，雖天元一氣，仍作弱論',
      interpretiveReading:
        'Repeated visible same-element stems do not automatically substitute for root in this exact governed example.',
      researchInference:
        'Visible same-element repetition cannot be promoted to a general strength resolver.',
      naiveRuleTested: 'many same-element visible stems => strong without root',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'EXACT_FOUR_PILLAR',
      unresolvedFactors: [],
      prohibitedExtensions: [
        'VISIBLE_STEM_COUNT_EQUALS_SUPPORT_SCORE',
        'ONE_CASE_EQUALS_GLOBAL_NO_ROOT_RULE',
      ],
    },
    {
      caseId: 'R122-C04-FOUR-BING-SHEN',
      family: 'VISIBLE_SUPPORT_WITHOUT_ROOT',
      comparisonGroupId: 'REPEATED-STEMS-WITHOUT-ROOT',
      upstreamEvidenceRefs: [
        'R019',
        'R018',
        'src/research/general-natal-borderline-strength-case-corpus.ts',
      ],
      sourceScope: 'R019 governed exact four-pillar seed',
      seasonContext: null,
      rootContext: ['火不通根'],
      otherFactors: ['天元一氣', 'four 丙 stems'],
      sourceStatement: '四丙申，火不通根，雖天元一氣，仍作弱論',
      interpretiveReading:
        'The exact pattern preserves the same visible-repetition-without-root weakness boundary for Fire.',
      researchInference:
        'Repeated visible peers remain distinguishable from governed root evidence.',
      naiveRuleTested: 'repeated visible peers can always replace root',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'EXACT_FOUR_PILLAR',
      unresolvedFactors: [],
      prohibitedExtensions: [
        'VISIBLE_STEM_COUNT_EQUALS_ROOT_COUNT',
        'VISIBLE_PEER_REPETITION_EQUALS_DANG_ZHONG',
      ],
    },
    {
      caseId: 'R122-C05-MONTH-CONTEXT-NOT-EXCLUSIVE',
      family: 'MONTH_SCOPE_ANTI_EXCLUSIVITY',
      comparisonGroupId: 'MONTH-SCOPE-BOUNDARY',
      upstreamEvidenceRefs: [
        'R012',
        'src/research/general-natal-month-branch-priority-counterexamples.ts',
      ],
      sourceScope: '淵海子平 / NLC republican print witness / 論月令',
      seasonContext: '月令 explicitly inspected',
      rootContext: [],
      otherFactors: ['日為主', '年為本', '時為輔佐'],
      sourceStatement:
        '以日為主，年為本，月為提綱，時為輔佐；論命者切不可泥之月令消詳',
      interpretiveReading:
        'The month command is important context while the same bounded source rejects rigid fixation on it.',
      researchInference:
        'Month importance does not entail exclusive chart authority.',
      naiveRuleTested: 'month importance => exclusive strength authority',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: ['no exhaustive whole-chart comparison algorithm is supplied'],
      prohibitedExtensions: [
        'MONTH_BRANCH_AS_EXCLUSIVE_CHART_AUTHORITY',
        'MONTH_BRANCH_NUMERIC_MULTIPLIER',
      ],
    },
    {
      caseId: 'R122-C06-MONTH-ROOT-PRIORITY-SCOPED',
      family: 'MONTH_SCOPE_ANTI_EXCLUSIVITY',
      comparisonGroupId: 'MONTH-SCOPE-BOUNDARY',
      upstreamEvidenceRefs: [
        'R012',
        'src/research/general-natal-month-branch-priority-counterexamples.ts',
      ],
      sourceScope: '子平真詮評註 later commentary / 通根之中',
      seasonContext: '月令支 inside a Tonggen comparison scope',
      rootContext: ['通根之中', '月令之支為最重'],
      otherFactors: [],
      sourceStatement: '通根之中，尤以月令之支為最重也',
      interpretiveReading:
        'The statement gives the month branch special importance within the stated Tonggen scope.',
      researchInference:
        'The bounded wording does not establish that a month-branch root always overrides every other root or every chart factor.',
      naiveRuleTested: 'month-root priority => universal override',
      verdict: 'CONTEXT_DEPENDENT',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: ['no exhaustive cross-context root ordering is stated'],
      prohibitedExtensions: [
        'MONTH_ROOT_ALWAYS_OVERRIDES_OTHER_ROOTS',
        'MOST_WEIGHTY_EQUALS_NUMERIC_COEFFICIENT',
      ],
    },
    {
      caseId: 'R122-C07-YI-YIN-TONGGEN-ONLY',
      family: 'TOUGAN_TONGGEN_NON_EQUIVALENCE',
      comparisonGroupId: 'TOUGAN-TONGGEN-RELATION-STATES',
      upstreamEvidenceRefs: [
        'R013',
        'src/research/general-natal-tougan-tonggen-independence.ts',
      ],
      sourceScope: 'R013 governed bounded 乙 / 寅 relation',
      seasonContext: null,
      rootContext: ['乙 at 寅 = POSITIVE_ROOT_EVIDENCE'],
      otherFactors: ['exact hidden-stem containment for 乙 in 寅 = false'],
      sourceStatement:
        'R013 represents 乙/寅 as TONGGEN_ONLY under the currently governed bounded root evidence.',
      interpretiveReading:
        'Bounded Tonggen evidence can exist without the exact TOUGAN containment relation.',
      researchInference:
        'TOUGAN and TONGGEN cannot be collapsed into one identical predicate.',
      naiveRuleTested: 'Tonggen requires exact Tougan/hidden-stem containment',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: ['does not establish a complete global Tonggen resolver'],
      prohibitedExtensions: [
        'TONGGEN_ONLY_CASE_EQUALS_UNIVERSAL_TONGGEN_DEFINITION',
        'TONGGEN_EQUALS_NUMERIC_STRENGTH',
      ],
    },
    {
      caseId: 'R122-C08-JIA-YIN-BOTH',
      family: 'TOUGAN_TONGGEN_NON_EQUIVALENCE',
      comparisonGroupId: 'TOUGAN-TONGGEN-RELATION-STATES',
      upstreamEvidenceRefs: [
        'R013',
        'src/research/general-natal-tougan-tonggen-independence.ts',
      ],
      sourceScope: 'R013 governed bounded 甲 / 寅 relation',
      seasonContext: null,
      rootContext: ['甲 at 寅 = POSITIVE_ROOT_EVIDENCE'],
      otherFactors: ['exact hidden-stem containment for 甲 in 寅 = true'],
      sourceStatement:
        'R013 represents 甲/寅 as BOTH Tougan and positive bounded root evidence.',
      interpretiveReading:
        'The two relations may coexist; they are not mutually exclusive labels.',
      researchInference:
        'Directional semantic distinction does not imply mutual exclusivity.',
      naiveRuleTested: 'Tougan and Tonggen are mutually exclusive states',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: ['does not establish every possible relation-state pair'],
      prohibitedExtensions: [
        'BOTH_EQUALS_FINAL_QIANG_RUO',
        'BOTH_EQUALS_GEJU_ESTABLISHMENT',
      ],
    },
    {
      caseId: 'R122-C09-YI-XU-EXACT-EXCLUSION',
      family: 'ROOT_NEGATIVE_BOUNDARY',
      comparisonGroupId: null,
      upstreamEvidenceRefs: [
        'R013',
        'R014',
        'src/research/general-natal-tougan-tonggen-independence.ts',
        'src/research/general-natal-muku-root-treatment.ts',
      ],
      sourceScope: 'selected-source exact 乙 / 戌 exclusion',
      seasonContext: null,
      rootContext: ['乙 at 戌 = selected-source Tonggen excluded'],
      otherFactors: [],
      sourceStatement:
        'R013/R014 preserve one exact selected-source 乙/戌 negative exclusion.',
      interpretiveReading:
        'An exact negative pair can be represented without inventing a global negative resolver.',
      researchInference:
        'One exact exclusion is insufficient to infer that every unmatched pair is 無根/不通根.',
      naiveRuleTested: 'one exact negative pair => global no-root resolver',
      verdict: 'INSUFFICIENT_ISOLATION',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: [
        'global negative semantics remain unresolved',
        'Yin/Earth root scopes remain incomplete',
      ],
      prohibitedExtensions: [
        'ONE_EXCLUSION_EQUALS_GLOBAL_NEGATIVE_RESOLVER',
        'NO_POSITIVE_EVIDENCE_EQUALS_NOT_TONGGEN',
      ],
    },
    {
      caseId: 'R122-C10-JIA-WEI-MUKU-POSITIVE',
      family: 'MUKU_YIN_YANG_DIVERGENCE',
      comparisonGroupId: 'MUKU-YIN-YANG-SAME-ELEMENT',
      upstreamEvidenceRefs: [
        'R014',
        'R015',
        'src/research/general-natal-muku-root-treatment.ts',
      ],
      sourceScope: '子平真詮 selected source / Wood Muku',
      seasonContext: null,
      rootContext: ['甲 / 未 = BASE_TEXT_ROOT_SUPPORTED_COMMENTARY_APPLICABLE'],
      otherFactors: [],
      sourceStatement:
        'R014 records 甲 at the Wood 墓庫 未 as a bounded positive applicable root surface.',
      interpretiveReading:
        'The Yang Wood case supplies a positive bounded Muku reference point.',
      researchInference:
        'This positive case cannot automatically be copied to the Yin stem of the same element.',
      naiveRuleTested: 'same-element Muku applies identically to Yang and Yin stems',
      verdict: 'PARTIAL_COUNTEREXAMPLE',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: ['paired Yin source-stratum tension must be preserved'],
      prohibitedExtensions: [
        'YANG_MUKU_POSITIVE_EQUALS_YIN_MUKU_POSITIVE',
        'MUKU_EQUALS_NUMERIC_ROOT_WEIGHT',
      ],
    },
    {
      caseId: 'R122-C11-YI-WEI-MUKU-TENSION',
      family: 'MUKU_YIN_YANG_DIVERGENCE',
      comparisonGroupId: 'MUKU-YIN-YANG-SAME-ELEMENT',
      upstreamEvidenceRefs: [
        'R014',
        'src/research/general-natal-muku-root-treatment.ts',
      ],
      sourceScope: '子平真詮 base-text / later-commentary source-stratum comparison',
      seasonContext: null,
      rootContext: ['乙 / 未 = SOURCE_INTERNAL_TENSION_YIN'],
      otherFactors: [],
      sourceStatement:
        'R014 preserves base-text versus later-commentary tension for Yin stems at the element Muku.',
      interpretiveReading:
        'The same element/branch relation does not yield a source-uniform Yin disposition.',
      researchInference:
        'A universal same-element Muku rule would erase a documented source-stratum disagreement.',
      naiveRuleTested: 'same-element Muku has one uniform Yin/Yang root rule',
      verdict: 'SOURCE_DIVERGENT',
      isolation: 'SOURCE_STRATUM_COMPARISON',
      unresolvedFactors: ['Yin Muku authority remains unresolved'],
      prohibitedExtensions: [
        'SILENTLY_RECONCILE_YIN_YANG_MUKU',
        'AUTO_PROMOTE_LATER_COMMENTARY_OVER_BASE_TEXT',
      ],
    },
    {
      caseId: 'R122-C12-YUQI-TEMPORAL-VARIABILITY',
      family: 'YUQI_TEMPORAL_VARIABILITY',
      comparisonGroupId: null,
      upstreamEvidenceRefs: [
        'R015',
        'src/research/general-natal-yuqi-temporal-variability-source-observation-authority.ts',
      ],
      sourceScope: 'selected commentary / 餘氣 temporal observation',
      seasonContext: '清明後十二日 versus 土旺之後 context',
      rootContext: ['餘氣 is presented differently across the bounded temporal contexts'],
      otherFactors: [],
      sourceStatement:
        'The governed source observation preserves different 餘氣 treatment around 清明後十二日 and 土旺之後.',
      interpretiveReading:
        'The source surface itself is temporally conditional rather than a timeless fixed scalar.',
      researchInference:
        'A static universal Yuqi weight is not established.',
      naiveRuleTested: 'Yuqi contributes one invariant root weight across temporal context',
      verdict: 'CONTEXT_DEPENDENT',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: [
        'no canonical temporal classifier',
        'no governed 18-day boundary evaluator',
      ],
      prohibitedExtensions: [
        'YUQI_TEMPORAL_VARIABILITY_EQUALS_NUMERIC_WEIGHT',
        'YUQI_TEMPORAL_VARIABILITY_EQUALS_FINAL_STRENGTH',
      ],
    },
    {
      caseId: 'R122-C13-YANG-CHANGSHENG-POSITIVE',
      family: 'CHANGSHENG_SOURCE_STRATUM_DIVERGENCE',
      comparisonGroupId: 'CHANGSHENG-YIN-YANG-SOURCE-STRATA',
      upstreamEvidenceRefs: [
        'R016',
        'src/research/general-natal-wang-changsheng-lu-bounded-tonggen-authority.ts',
      ],
      sourceScope: 'governed Yang 長生 bounded root/Tonggen surface',
      seasonContext: null,
      rootContext: ['Yang 長生 = bounded positive root/Tonggen evidence'],
      otherFactors: [],
      sourceStatement:
        'The governed selected-source chain admits Yang 長生 as bounded positive root/Tonggen evidence.',
      interpretiveReading:
        'Yang 長生 provides a bounded positive reference point.',
      researchInference:
        'That bounded positive cannot be generalized across Yin source-strata conflict.',
      naiveRuleTested: 'all Changsheng states share one universal root disposition',
      verdict: 'PARTIAL_COUNTEREXAMPLE',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: ['paired Yin source-strata conflict remains unresolved'],
      prohibitedExtensions: [
        'YANG_CHANGSHENG_EQUALS_YIN_CHANGSHENG',
        'CHANGSHENG_EQUALS_FINAL_QIANG_RUO',
      ],
    },
    {
      caseId: 'R122-C14-YIN-CHANGSHENG-DIVERGENT',
      family: 'CHANGSHENG_SOURCE_STRATUM_DIVERGENCE',
      comparisonGroupId: 'CHANGSHENG-YIN-YANG-SOURCE-STRATA',
      upstreamEvidenceRefs: [
        'R016',
        'src/research/general-natal-yin-changsheng-minggen-source-strata-conflict-authority.ts',
      ],
      sourceScope: 'Yin 長生 source-strata conflict',
      seasonContext: null,
      rootContext: ['Yin 長生 = source-strata conflict / unresolved'],
      otherFactors: [],
      sourceStatement:
        'R016 preserves conflicting source-stratum treatment for Yin 長生 instead of selecting a winner.',
      interpretiveReading:
        'Yin 長生 cannot be silently inherited from the Yang bounded positive rule.',
      researchInference:
        'A single universal Changsheng root rule is not supported by the currently governed evidence.',
      naiveRuleTested: 'Yang and Yin Changsheng can share one automatic executable rule',
      verdict: 'SOURCE_DIVERGENT',
      isolation: 'SOURCE_STRATUM_COMPARISON',
      unresolvedFactors: ['exact Yin Changsheng resolution remains open research'],
      prohibitedExtensions: [
        'AUTO_SELECT_YIN_CHANGSHENG_WINNER',
        'PROMOTE_CONFLICT_TO_POSITIVE_OR_NEGATIVE_ROOT',
      ],
    },
    {
      caseId: 'R122-C15-HEAVY-LIGHT-NOT-NUMERIC',
      family: 'ROOT_CLASS_NON_NUMERIC_BOUNDARY',
      comparisonGroupId: null,
      upstreamEvidenceRefs: [
        'R017',
        'R020',
        'src/research/general-natal-lu-diwang-root-strength.ts',
      ],
      sourceScope: 'selected Ziping commentary root-class language',
      seasonContext: '月令休囚 context in the selected comparison chain',
      rootContext: ['長生祿旺 = 根之重者', '墓庫餘氣 = 根之輕者'],
      otherFactors: [],
      sourceStatement: '長生祿旺，根之重者也；墓庫餘氣，根之輕者也',
      interpretiveReading:
        'The selected source uses comparative heavy/light language for root classes.',
      researchInference:
        'Comparative wording does not specify a numeric coefficient, additive score, or universal ranking algorithm.',
      naiveRuleTested: '重/輕 root language => numeric strength weights',
      verdict: 'INCONCLUSIVE',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: ['no numeric scale is stated'],
      prohibitedExtensions: [
        'HEAVY_EQUALS_TWO_POINTS',
        'LIGHT_EQUALS_ONE_POINT',
        'COMPARATIVE_LANGUAGE_EQUALS_NUMERIC_COEFFICIENT',
      ],
    },
    {
      caseId: 'R122-C16-SUPPORT-AGGREGATION-INCOMPLETE',
      family: 'SUPPORT_AGGREGATION_BOUNDARY',
      comparisonGroupId: null,
      upstreamEvidenceRefs: [
        'R018',
        'src/research/general-natal-dang-zhong-support-constituent-completeness-authority-review.ts',
      ],
      sourceScope: '黨眾 support constituent review',
      seasonContext: null,
      rootContext: ['通根扶助 is one source-associated support family'],
      otherFactors: ['比劫', '印綬'],
      sourceStatement:
        'The governed source context associates 比劫, 印綬, and 通根扶助 with 黨眾 composition.',
      interpretiveReading:
        'The constituent families are observable, but the governed surface lacks a complete cardinality, threshold, or composition rule.',
      researchInference:
        'Counting currently visible support constituents cannot be promoted to automatic 強 or 黨眾 settlement.',
      naiveRuleTested: 'more support constituents => automatically strong',
      verdict: 'INSUFFICIENT_ISOLATION',
      isolation: 'SOURCE_PROPOSITION_ONLY',
      unresolvedFactors: [
        'general 比劫 coverage incomplete',
        'whole-chart 印綬 coverage incomplete',
        'Tonggen support coverage incomplete',
        '黨眾 cardinality rule missing',
        '比印重疊 threshold missing',
      ],
      prohibitedExtensions: [
        'SUPPORT_ARRAY_LENGTH_EQUALS_STRENGTH',
        'INVENT_SUPPORT_THRESHOLD',
        'SUPPORT_CONSTITUENTS_EQUAL_FINAL_QIANG_RUO',
      ],
    },
    {
      caseId: 'R122-C17-XU-REN-SHARED-EXAMPLES-NOT-INDEPENDENT',
      family: 'TEXTUAL_DEPENDENCY_RISK',
      comparisonGroupId: 'XU-REN-TEXTUAL-DEPENDENCY',
      upstreamEvidenceRefs: [
        'R020',
        'src/research/general-natal-cross-school-strength-primitives.ts',
      ],
      sourceScope: '徐樂吾評註 versus 任鐵樵滴天髓闡微 comparison',
      seasonContext: 'shared spring-Wood / autumn-Wood examples',
      rootContext: ['shared heavy/light root paragraph'],
      otherFactors: [],
      sourceStatement:
        'R020 records a shared scaffold, shared seasonal examples, and a shared heavy/light root paragraph across the compared surfaces.',
      interpretiveReading:
        'The overlap creates textual-dependency risk rather than clean independent corroboration.',
      researchInference:
        'Repeated wording cannot be counted as multiple independent votes for a season/root rule.',
      naiveRuleTested: 'same claim in two commentaries => two independent confirmations',
      verdict: 'SOURCE_DIVERGENT',
      isolation: 'SOURCE_STRATUM_COMPARISON',
      unresolvedFactors: ['exact Xu/Ren lineage mechanism remains unsettled'],
      prohibitedExtensions: [
        'SHARED_PHRASE_COUNT_EQUALS_CONFIDENCE',
        'CROSS_SCHOOL_MAJORITY_VOTE',
      ],
    },
    {
      caseId: 'R122-C18-XU-REN-MATERIAL-VARIANT',
      family: 'TEXTUAL_DEPENDENCY_RISK',
      comparisonGroupId: 'XU-REN-TEXTUAL-DEPENDENCY',
      upstreamEvidenceRefs: [
        'R020',
        'src/research/general-natal-cross-school-strength-primitives.ts',
      ],
      sourceScope: 'spring Wood heavy-Metal branch-pair variant',
      seasonContext: 'spring Wood',
      rootContext: [],
      otherFactors: ['徐 reading = 支酉丑', '任 reading = 支申酉'],
      sourceStatement:
        'R020 records the material variant 徐=支酉丑 versus 任=支申酉 inside the otherwise overlapping example scaffold.',
      interpretiveReading:
        'The compared surfaces are materially similar but not textually identical.',
      researchInference:
        'Shared scaffold must not be collapsed into exact identity or one normalized source statement.',
      naiveRuleTested: 'shared example scaffold => exact textual identity',
      verdict: 'COUNTEREXAMPLE_CONFIRMED',
      isolation: 'SOURCE_STRATUM_COMPARISON',
      unresolvedFactors: ['direction of textual reuse remains unsettled'],
      prohibitedExtensions: [
        'NORMALIZE_MATERIAL_VARIANT_AWAY',
        'INFER_EXACT_COPY_DIRECTION',
      ],
    },
  ]);

export const R122_COMPARISON_GROUPS = Object.freeze([
  'SEASON-WOOD-ANTI-DETERMINISM',
  'REPEATED-STEMS-WITHOUT-ROOT',
  'MONTH-SCOPE-BOUNDARY',
  'TOUGAN-TONGGEN-RELATION-STATES',
  'MUKU-YIN-YANG-SAME-ELEMENT',
  'CHANGSHENG-YIN-YANG-SOURCE-STRATA',
  'XU-REN-TEXTUAL-DEPENDENCY',
] as const);

export const R122_REJECTED_SHORTCUTS = Object.freeze([
  'DE_SHI_EQUALS_AUTOMATIC_QIANG_OR_WANG',
  'SHI_SHI_EQUALS_AUTOMATIC_RUO',
  'VISIBLE_SAME_ELEMENT_COUNT_EQUALS_STRENGTH',
  'VISIBLE_SUPPORT_CAN_ALWAYS_REPLACE_ROOT',
  'MONTH_IMPORTANCE_EQUALS_EXCLUSIVE_AUTHORITY',
  'MONTH_ROOT_PRIORITY_EQUALS_UNIVERSAL_OVERRIDE',
  'TOUGAN_EQUALS_TONGGEN',
  'ONE_EXACT_NEGATIVE_PAIR_EQUALS_GLOBAL_NOT_TONGGEN',
  'YANG_MUKU_RULE_AUTO_COPIES_TO_YIN',
  'YUQI_IS_STATIC_ACROSS_TEMPORAL_CONTEXT',
  'YANG_CHANGSHENG_RULE_AUTO_COPIES_TO_YIN',
  'HEAVY_LIGHT_LANGUAGE_EQUALS_NUMERIC_WEIGHT',
  'SUPPORT_CONSTITUENT_COUNT_EQUALS_QIANG',
  'SHARED_COMMENTARY_WORDING_EQUALS_INDEPENDENT_VOTES',
  'COUNTEREXAMPLE_CORPUS_EQUALS_FINAL_STRENGTH_CLASSIFIER',
] as const);

export const R122_SUMMARY = Object.freeze({
  caseCount: R122_COUNTEREXAMPLE_CASES.length,
  comparisonGroupCount: R122_COMPARISON_GROUPS.length,
  familyCount: new Set(R122_COUNTEREXAMPLE_CASES.map((item) => item.family)).size,
  confirmedCounterexampleCount: R122_COUNTEREXAMPLE_CASES.filter(
    (item) => item.verdict === 'COUNTEREXAMPLE_CONFIRMED',
  ).length,
  sourceDivergentCount: R122_COUNTEREXAMPLE_CASES.filter(
    (item) => item.verdict === 'SOURCE_DIVERGENT',
  ).length,
  insufficientIsolationCount: R122_COUNTEREXAMPLE_CASES.filter(
    (item) => item.verdict === 'INSUFFICIENT_ISOLATION',
  ).length,
} as const);

export const R122_AUTHORITY = Object.freeze({
  status: 'RESEARCH_COUNTEREXAMPLE_CORPUS_CANDIDATE' as const,
  researchOnly: true,
  sourceStatementInterpretiveReadingResearchInferenceSeparated: true,
  seasonAloneSufficientForFinalStrength: false,
  rootAloneSufficientForFinalStrength: false,
  visibleSupportCountSufficientForFinalStrength: false,
  monthBranchExclusiveStrengthAuthority: false,
  universalRootWeightModelAuthorized: false,
  numericStrengthScoreAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  methodologyMajorityVoteAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
