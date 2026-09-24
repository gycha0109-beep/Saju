export const R124_SUPPORT_ACCUMULATION_SATURATION_VERSION = '0.1.0-research' as const;

export type R124SupportFamily =
  | 'BIJIE'
  | 'YINSHOU'
  | 'TONGGEN'
  | 'MIXED_SUPPORT'
  | 'ROOT_VS_VISIBLE_SUPPORT';

export type R124ClaimRelation =
  | 'PRESENCE_ASSOCIATION'
  | 'QUALITATIVE_ACCUMULATION'
  | 'EXPLICIT_CARDINAL_COMPARISON'
  | 'ANTI_MONOTONIC_COUNTEREXAMPLE'
  | 'EXCESS_REVERSAL'
  | 'SATURATION_CANDIDATE'
  | 'COMPOSITION_BOUNDARY'
  | 'TEXTUAL_DEPENDENCY_BOUNDARY';

export type R124SourceNature =
  | 'REPOSITORY_GOVERNED_SOURCE_SURFACE'
  | 'LATER_COMMENTARY'
  | 'CLASSICAL_COMPILATION'
  | 'QUOTED_EARLIER_VERSE'
  | 'RESEARCH_SYNTHESIS';

export type R124TextualDependency =
  | 'DIRECT_SELECTED_SURFACE'
  | 'QUOTED_LINEAGE_NOT_INDEPENDENT'
  | 'REPOSITORY_BOUNDARY'
  | 'UNRESOLVED_INDEPENDENCE';

export interface R124SupportClaimAuditRow {
  claimId: string;
  supportFamily: R124SupportFamily;
  relation: R124ClaimRelation;
  sourceNature: R124SourceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  textualDependency: R124TextualDependency;
  sourceStatement: string;
  interpretiveReading: string;
  researchInference: string;
  exactCardinalityComparisonPresent: boolean;
  exactNumericBoundaryPresent: boolean;
  qualitativeAccumulationObserved: boolean;
  reversalOrExcessObserved: boolean;
  thresholdAuthorized: boolean;
  saturationCurveAuthorized: boolean;
  linearAccumulationAuthorized: boolean;
  numericMappingAuthorized: boolean;
  finalStrengthAuthorized: boolean;
  unresolvedFactors: readonly string[];
  prohibitedExtensions: readonly string[];
}

export const R124_SUPPORT_CLAIM_AUDIT_ROWS: readonly R124SupportClaimAuditRow[] =
  Object.freeze([
    {
      claimId: 'R124-C01-SUPPORT-FAMILIES-DANGZHONG',
      supportFamily: 'MIXED_SUPPORT',
      relation: 'PRESENCE_ASSOCIATION',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: '子平真詮評註 / 論十干得時不旺失時不弱',
      sourceRefs: [
        'src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.ts',
      ],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The governed source surface directly associates 比劫, 印綬, and 通根扶助 with 黨眾.',
      interpretiveReading:
        'Three support families are named inside the same qualitative party/support context.',
      researchInference:
        'Family membership in the 黨眾 context does not itself provide a collection, count, threshold, or aggregation law.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: false,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [
        'complete family coverage is not admitted',
        'cross-family commensurability is not specified',
      ],
      prohibitedExtensions: [
        'THREE_NAMED_FAMILIES_EQUAL_THREE_SUPPORT_POINTS',
        'FAMILY_PRESENCE_EQUALS_DANGZHONG_SETTLED',
      ],
    },
    {
      claimId: 'R124-C02-BIYIN-REPETITION-PLUS-TONGGEN',
      supportFamily: 'MIXED_SUPPORT',
      relation: 'QUALITATIVE_ACCUMULATION',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: '子平真詮評註 / out-of-season Wood example',
      sourceRefs: [
        'src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.ts',
      ],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The governed example describes repeated 比/印 together with additional branch-rooted 比/印 as 黨眾 and not weak despite seasonal loss.',
      interpretiveReading:
        'The example supports qualitative combined support in one bounded configuration.',
      researchInference:
        'It does not disclose how many 比, 印, or roots are necessary or sufficient, nor how their contributions combine.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [
        '比印重疊 has no admitted numeric threshold',
        '通根比印 composition law is missing',
      ],
      prohibitedExtensions: [
        'BIYIN_REPETITION_EQUALS_COUNT_THRESHOLD',
        'TONGGEN_PLUS_BIYIN_EQUALS_LINEAR_SCORE',
      ],
    },
    {
      claimId: 'R124-C03-ONE-BIJIAN-VS-ONE-MUKU',
      supportFamily: 'ROOT_VS_VISIBLE_SUPPORT',
      relation: 'EXPLICIT_CARDINAL_COMPARISON',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / selected root comparison commentary',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm'],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The selected commentary explicitly compares one 比肩 as inferior to one applicable 墓庫 root.',
      interpretiveReading:
        'A count of one visible peer and one bounded root class is directly compared qualitatively.',
      researchInference:
        'The comparison establishes a bounded ordering, not a universal coefficient for either side.',
      exactCardinalityComparisonPresent: true,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: false,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['comparison is source/commentary scoped'],
      prohibitedExtensions: [
        'ONE_BIJIAN_EQUALS_FIXED_WEIGHT',
        'ONE_MUKU_EQUALS_FIXED_WEIGHT',
      ],
    },
    {
      claimId: 'R124-C04-TWO-BIJIAN-VS-ONE-YUQI',
      supportFamily: 'ROOT_VS_VISIBLE_SUPPORT',
      relation: 'EXPLICIT_CARDINAL_COMPARISON',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / selected root comparison commentary',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm'],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The selected commentary explicitly compares two 比肩 as inferior to one applicable 餘氣 root.',
      interpretiveReading:
        'The source gives a bounded cross-type cardinal comparison.',
      researchInference:
        'The statement rejects simple visible-peer counting but does not define a universal two-to-one conversion ratio.',
      exactCardinalityComparisonPresent: true,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['餘氣 applicability remains context/source scoped'],
      prohibitedExtensions: [
        'TWO_BIJIAN_EQUALS_ONE_YUQI_NUMERIC_RATIO',
        'BIJIAN_COUNT_EQUALS_LINEAR_STRENGTH',
      ],
    },
    {
      claimId: 'R124-C05-THREE-BIJIAN-VS-ONE-CHANGSHENG-LU',
      supportFamily: 'ROOT_VS_VISIBLE_SUPPORT',
      relation: 'EXPLICIT_CARDINAL_COMPARISON',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / selected root comparison commentary',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm'],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The selected commentary explicitly compares three 比肩 as inferior to one applicable 長生/祿刃 root.',
      interpretiveReading:
        'The source continues a qualitative cardinal comparison across heterogeneous support/root types.',
      researchInference:
        'The sequence is incompatible with a naive one-peer-equals-one-support-point model, but still does not define numeric weights.',
      exactCardinalityComparisonPresent: true,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [
        'Yin 長生 remains source-stratum divergent elsewhere',
        'applicable 祿/刃 scope is not universalized here',
      ],
      prohibitedExtensions: [
        'THREE_BIJIAN_EQUALS_ONE_CHANGSHENG_NUMERIC_RATIO',
        'THREE_BIJIAN_EQUALS_ONE_LU_NUMERIC_RATIO',
      ],
    },
    {
      claimId: 'R124-C06-YUQI-CONTEXT-CAN-MATCH-ONE-BIJIE',
      supportFamily: 'ROOT_VS_VISIBLE_SUPPORT',
      relation: 'EXPLICIT_CARDINAL_COMPARISON',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / bounded 餘氣 temporal commentary',
      sourceRefs: [
        'R015',
        'src/research/general-natal-yuqi-temporal-variability-source-observation-authority.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
      ],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'In one bounded temporal context, the commentary says the 餘氣 can qualitatively match one 比劫.',
      interpretiveReading:
        'The comparison is explicitly contextual rather than a timeless conversion table.',
      researchInference:
        'Context-dependent comparability cannot be promoted to a universal numeric exchange rate.',
      exactCardinalityComparisonPresent: true,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: false,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['temporal 餘氣 state changes across the bounded commentary'],
      prohibitedExtensions: [
        'ONE_YUQI_ALWAYS_EQUALS_ONE_BIJIE',
        'CONTEXTUAL_EQUIVALENCE_EQUALS_NUMERIC_WEIGHT',
      ],
    },
    {
      claimId: 'R124-C07-MANY-STEMS-INFERIOR-TO-ROOT',
      supportFamily: 'ROOT_VS_VISIBLE_SUPPORT',
      relation: 'COMPOSITION_BOUNDARY',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / selected root comparison commentary',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm'],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The selected commentary states qualitatively that many stems are inferior to substantial root support.',
      interpretiveReading:
        'Visible support multiplicity and root support are not treated as freely commensurable identical units.',
      researchInference:
        'The source resists linear stem-count accumulation without providing a replacement scalar formula.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['no universal ordering across all root types is stated'],
      prohibitedExtensions: [
        'STEM_COUNT_EQUALS_ROOT_COUNT',
        'MANY_STEMS_EQUALS_FIXED_SUPPORT_SCORE',
      ],
    },
    {
      claimId: 'R124-C08-FOUR-XIN-MAO-STILL-WEAK',
      supportFamily: 'BIJIE',
      relation: 'ANTI_MONOTONIC_COUNTEREXAMPLE',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: 'R019/R122 exact four-pillar seed',
      sourceRefs: [
        'src/research/general-natal-bijie-without-tonggen-weak-context-observation-authority.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
      ],
      textualDependency: 'REPOSITORY_BOUNDARY',
      sourceStatement:
        'The governed four-Xin-Mao example remains weak in context despite four visible same-stem peers when root is absent.',
      interpretiveReading:
        'Repeated visible peer support does not monotonically guarantee a non-weak result.',
      researchInference:
        'The case falsifies unbounded monotonic support-count accumulation.',
      exactCardinalityComparisonPresent: true,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['one exact example cannot define a universal root-absence rule'],
      prohibitedExtensions: [
        'FOUR_VISIBLE_PEERS_EQUALS_STRONG',
        'FOUR_VISIBLE_PEERS_EQUALS_SATURATION_POINT',
      ],
    },
    {
      claimId: 'R124-C09-FOUR-BING-SHEN-STILL-WEAK',
      supportFamily: 'BIJIE',
      relation: 'ANTI_MONOTONIC_COUNTEREXAMPLE',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: 'R019/R122 exact four-pillar seed',
      sourceRefs: [
        'src/research/general-natal-bijie-without-tonggen-weak-context-observation-authority.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
      ],
      textualDependency: 'REPOSITORY_BOUNDARY',
      sourceStatement:
        'The governed four-Bing-Shen example remains weak in context despite four visible same-stem peers when root is absent.',
      interpretiveReading:
        'The same anti-monotonic warning appears in a second exact element example.',
      researchInference:
        'Repeated visible support remains insufficient to infer a universal count threshold for strength.',
      exactCardinalityComparisonPresent: true,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['the pair does not define a universal saturation curve'],
      prohibitedExtensions: [
        'FOUR_VISIBLE_PEERS_EQUALS_SUPPORT_THRESHOLD',
        'REPEATED_PEERS_WITHOUT_ROOT_EQUALS_UNIVERSAL_WEAK',
      ],
    },
    {
      claimId: 'R124-C10-SANMING-MORE-YINSHOU-CAN-BE-SUPERIOR',
      supportFamily: 'YINSHOU',
      relation: 'QUALITATIVE_ACCUMULATION',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷五 / 論印綬',
      sourceRefs: [
        'https://upload.wikimedia.org/wikipedia/commons/d/dd/NLC416-13jh000624-42998_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf',
        'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8',
      ],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The compilation contains a bounded statement that, in comparison, a greater presence of 印綬 may be superior.',
      interpretiveReading:
        'Some source contexts positively distinguish greater 印 presence.',
      researchInference:
        'Positive multiplicity language is contextual and cannot be universalized because the same chapter also preserves adverse excess language.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['no exact beneficial count is supplied'],
      prohibitedExtensions: [
        'MORE_YINSHOU_ALWAYS_BETTER',
        'YINSHOU_COUNT_EQUALS_LINEAR_BENEFIT',
      ],
    },
    {
      claimId: 'R124-C11-SANMING-YINSHOU-MANY-CLEAR-LONELY',
      supportFamily: 'YINSHOU',
      relation: 'EXCESS_REVERSAL',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷五 / 論印綬',
      sourceRefs: [
        'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8',
      ],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The compilation also preserves an adverse consequence associated with excessive/many 印.',
      interpretiveReading:
        'The resource-support family is not presented as monotonically beneficial in every context.',
      researchInference:
        'This is qualitative reversal/excess evidence, not an exact saturation threshold.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: true,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['the text does not quantify how many constitutes excess'],
      prohibitedExtensions: [
        'MANY_YINSHOU_EQUALS_FIXED_NEGATIVE_THRESHOLD',
        'EXCESS_LANGUAGE_EQUALS_SATURATION_CURVE',
      ],
    },
    {
      claimId: 'R124-C12-SANMING-YINSHOU-TAIGUO',
      supportFamily: 'YINSHOU',
      relation: 'SATURATION_CANDIDATE',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷五 / 論印綬 / quoted traditional material',
      sourceRefs: [
        'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8',
        'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_471_(1700-1725).djvu/6',
      ],
      textualDependency: 'QUOTED_LINEAGE_NOT_INDEPENDENT',
      sourceStatement:
        'Traditional material quoted in the compilation says excessive 印綬 should not be further reinforced by a body-strengthening phase.',
      interpretiveReading:
        'The wording marks a qualitative excess boundary and adverse direction after excess.',
      researchInference:
        'The source supports non-monotonicity/excess, but no exact saturation point or diminishing-return function is given.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: true,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [
        '太過 is qualitative rather than numerically bounded',
        'quoted textual lineage must not be counted as an independent vote',
      ],
      prohibitedExtensions: [
        'TAIGUO_EQUALS_EXACT_COUNT',
        'TAIGUO_EQUALS_DIMINISHING_RETURN_FUNCTION',
      ],
    },
    {
      claimId: 'R124-C13-SIYAN-YINSHOU-ROOT-MANY-NOT-DEVELOP',
      supportFamily: 'YINSHOU',
      relation: 'EXCESS_REVERSAL',
      sourceNature: 'QUOTED_EARLIER_VERSE',
      sourceStratum: '四言獨步 / also quoted through 三命通會',
      sourceRefs: [
        'https://www.ncc.com.tw/fate/paleo/bg/bg_08.htm',
        'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8',
      ],
      textualDependency: 'QUOTED_LINEAGE_NOT_INDEPENDENT',
      sourceStatement:
        'The verse contrasts lighter 印綬 root with development and many roots with non-development in the stated context.',
      interpretiveReading:
        'More root/resource support is not portrayed as monotonically improving the outcome.',
      researchInference:
        'This is a bounded qualitative reversal, not proof of a universal support saturation law.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: true,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['根多 has no exact cardinal definition in the verse'],
      prohibitedExtensions: [
        'GEN_DUO_EQUALS_EXACT_ROOT_COUNT',
        'ONE_VERSE_EQUALS_UNIVERSAL_SATURATION_MODEL',
      ],
    },
    {
      claimId: 'R124-C14-SANMING-RESOURCE-EXCESS-METAL-BURIED',
      supportFamily: 'YINSHOU',
      relation: 'EXCESS_REVERSAL',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷五 / 論印綬',
      sourceRefs: [
        'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8',
      ],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The compilation includes a qualitative example where excessive Earth support buries Metal rather than simply strengthening it.',
      interpretiveReading:
        'Generating/supportive relation can become adverse when excessive.',
      researchInference:
        'Support effect is context-sensitive and non-monotonic; no numeric reversal point is supplied.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: true,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['element-specific context cannot be universalized directly'],
      prohibitedExtensions: [
        'RESOURCE_EXCESS_EQUALS_UNIVERSAL_COUNT_THRESHOLD',
        'EARTH_TO_METAL_EXAMPLE_EQUALS_ALL_RESOURCE_RELATIONS',
      ],
    },
    {
      claimId: 'R124-C15-SANMING-RESOURCE-EXCESS-WOOD-FLOATS',
      supportFamily: 'YINSHOU',
      relation: 'EXCESS_REVERSAL',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷五 / 論印綬',
      sourceRefs: [
        'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8',
      ],
      textualDependency: 'DIRECT_SELECTED_SURFACE',
      sourceStatement:
        'The compilation includes a qualitative example where excessive Water support makes Wood float rather than simply strengthening it.',
      interpretiveReading:
        'A second elemental example reinforces the non-monotonic excess boundary.',
      researchInference:
        'Multiple excess examples support qualitative reversal but still do not define a common saturation curve.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: true,
      reversalOrExcessObserved: true,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['the text gives no shared quantitative excess boundary'],
      prohibitedExtensions: [
        'WATER_TO_WOOD_EXAMPLE_EQUALS_GLOBAL_RESOURCE_FORMULA',
        'MULTIPLE_EXAMPLES_EQUAL_NUMERIC_SATURATION_CURVE',
      ],
    },
    {
      claimId: 'R124-C16-CURRENT-COLLECTION-STILL-INCOMPLETE',
      supportFamily: 'MIXED_SUPPORT',
      relation: 'COMPOSITION_BOUNDARY',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R018 completeness review',
      sourceRefs: [
        'src/research/general-natal-dang-zhong-support-constituent-completeness-authority-review.ts',
      ],
      textualDependency: 'REPOSITORY_BOUNDARY',
      sourceStatement:
        'Current governed support surfaces remain incomplete for general 比劫, whole-chart 印綬, and exhaustive 通根 coverage.',
      interpretiveReading:
        'Even before aggregation mathematics, the input support collection itself is not complete.',
      researchInference:
        'A universal accumulation or threshold model cannot be admitted on an incomplete constituent surface.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: false,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [
        'general 比劫 coverage incomplete',
        'whole-chart 印綬 coverage incomplete',
        '通根 coverage incomplete',
      ],
      prohibitedExtensions: [
        'PARTIAL_COLLECTION_EQUALS_COMPLETE_SUPPORT_VECTOR',
        'PARTIAL_SUPPORT_VECTOR_EQUALS_AGGREGATION_READY',
      ],
    },
    {
      claimId: 'R124-C17-TEXTUAL-DEPENDENCY-NOT-MULTIPLE-VOTES',
      supportFamily: 'YINSHOU',
      relation: 'TEXTUAL_DEPENDENCY_BOUNDARY',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R124 source-provenance audit',
      sourceRefs: [
        'https://www.ncc.com.tw/fate/paleo/bg/bg_08.htm',
        'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8',
      ],
      textualDependency: 'QUOTED_LINEAGE_NOT_INDEPENDENT',
      sourceStatement:
        'Some 印綬 excess language appears as earlier verse material quoted or recopied through later compilations.',
      interpretiveReading:
        'Repeated appearance of the same traditional wording is textual transmission, not automatically independent corroboration.',
      researchInference:
        'Source-count voting must deduplicate quoted lineage before any evidence comparison.',
      exactCardinalityComparisonPresent: false,
      exactNumericBoundaryPresent: false,
      qualitativeAccumulationObserved: false,
      reversalOrExcessObserved: false,
      thresholdAuthorized: false,
      saturationCurveAuthorized: false,
      linearAccumulationAuthorized: false,
      numericMappingAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['exact stemma may remain unresolved'],
      prohibitedExtensions: [
        'DUPLICATED_QUOTE_EQUALS_MULTIPLE_VOTES',
        'SOURCE_COUNT_EQUALS_CONFIDENCE_SCORE',
      ],
    },
  ]);

export const R124_REJECTED_DERIVATIONS = Object.freeze([
  'SUPPORT_ARRAY_LENGTH_EQUALS_STRENGTH',
  'ONE_SUPPORT_EQUALS_ONE_POINT',
  'BIJIE_YINSHOU_TONGGEN_EQUAL_COMMENSURABLE_UNITS',
  'BIYIN_CHONGDIE_EQUALS_EXACT_COUNT_THRESHOLD',
  'DANGZHONG_EQUALS_ARRAY_LENGTH_GTE_N',
  'REPEATED_SUPPORT_EQUALS_LINEAR_ACCUMULATION',
  'EXPLICIT_CARDINAL_COMPARISON_EQUALS_NUMERIC_WEIGHT',
  'TAIGUO_EQUALS_EXACT_SATURATION_POINT',
  'GEN_DUO_EQUALS_EXACT_ROOT_THRESHOLD',
  'EXCESS_LANGUAGE_EQUALS_DIMINISHING_RETURN_CURVE',
  'SAME_FAMILY_DUPLICATES_ALWAYS_ADDITIVE',
  'DIFFERENT_SUPPORT_FAMILIES_FREELY_SUMMABLE',
  'ABSENCE_OF_SUPPORT_EQUALS_ZHU_GUA',
  'MANY_SUPPORT_EQUALS_FINAL_QIANG',
  'SUPPORT_ACCUMULATION_EQUALS_FINAL_WANG_SHUAI',
] as const);

export const R124_SUMMARY = Object.freeze({
  claimCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.length,
  repeatedOrAccumulationRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.qualitativeAccumulationObserved,
  ).length,
  mixedSupportRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.supportFamily === 'MIXED_SUPPORT',
  ).length,
  explicitCardinalityComparisonRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.exactCardinalityComparisonPresent,
  ).length,
  excessOrReversalRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.reversalOrExcessObserved,
  ).length,
  exactNumericBoundaryRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.exactNumericBoundaryPresent,
  ).length,
  thresholdAuthorizedRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.thresholdAuthorized,
  ).length,
  saturationCurveAuthorizedRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.saturationCurveAuthorized,
  ).length,
  numericMappingAuthorizedRowCount: R124_SUPPORT_CLAIM_AUDIT_ROWS.filter(
    (row) => row.numericMappingAuthorized,
  ).length,
} as const);

export const R124_AUTHORITY = Object.freeze({
  status: 'RESEARCH_SUPPORT_ACCUMULATION_SATURATION_AUDIT_COMPLETE' as const,
  researchOnly: true,
  supportPresenceObserved: true,
  qualitativeAccumulationObserved: true,
  explicitCardinalComparisonsObserved: true,
  qualitativeExcessOrReversalObserved: true,
  monotonicSupportGrowthEstablished: false,
  crossFamilyCommensurabilityEstablished: false,
  completeSupportCollectionAuthorized: false,
  supportCountAuthorized: false,
  exactDangZhongThresholdAuthorized: false,
  exactSaturationPointAuthorized: false,
  saturationCurveAuthorized: false,
  linearAccumulationAuthorized: false,
  numericSupportScoreAuthorized: false,
  nonNumericSupportScalarAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
