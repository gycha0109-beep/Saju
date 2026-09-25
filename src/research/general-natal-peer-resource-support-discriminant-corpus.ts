export const R125_PEER_RESOURCE_DISCRIMINANT_VERSION = '0.1.0-research' as const;

export type R125SupportFamily =
  | 'PEER_SUPPORT'
  | 'RESOURCE_SUPPORT'
  | 'MIXED_PEER_RESOURCE'
  | 'COMPARATIVE_AUDIT';

export type R125Discriminant =
  | 'BROAD_SUPPORT_CONTEXT'
  | 'MECHANISM'
  | 'ROOT_DEPENDENCY'
  | 'SEASON_OR_STRENGTH_CONTEXT'
  | 'OPPOSITION_BEHAVIOR'
  | 'EXCESS_BEHAVIOR'
  | 'SUBSTITUTABILITY'
  | 'COMPOSITION'
  | 'TEXTUAL_DEPENDENCY';

export type R125EquivalenceStatus =
  | 'SAME_BROAD_SUPPORT_CONTEXT'
  | 'DISTINCT_MECHANISM'
  | 'PARTIAL_FUNCTIONAL_OVERLAP'
  | 'CONTEXT_DEPENDENT'
  | 'NON_SUBSTITUTABLE_IN_OBSERVED_CONTEXT'
  | 'NOT_ESTABLISHED'
  | 'INCONCLUSIVE';

export type R125SourceNature =
  | 'BASE_TEXT'
  | 'LATER_COMMENTARY'
  | 'CLASSICAL_COMPILATION'
  | 'CLASSICAL_TRANSCRIPTION'
  | 'REPOSITORY_GOVERNED_SOURCE_SURFACE'
  | 'RESEARCH_SYNTHESIS';

export interface R125DiscriminantCase {
  caseId: string;
  comparisonGroupId: string | null;
  family: R125SupportFamily;
  discriminant: R125Discriminant;
  sourceNature: R125SourceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  sourceStatement: string;
  interpretiveReading: string;
  researchInference: string;
  equivalenceStatus: R125EquivalenceStatus;
  peerSupportObserved: boolean;
  resourceSupportObserved: boolean;
  mechanismEquivalentAuthorized: boolean;
  freeSubstitutionAuthorized: boolean;
  numericEquivalenceAuthorized: boolean;
  commonThresholdAuthorized: boolean;
  commonExcessBehaviorAuthorized: boolean;
  finalStrengthAuthorized: boolean;
  unresolvedFactors: readonly string[];
  prohibitedExtensions: readonly string[];
}

export const R125_DISCRIMINANT_CASES: readonly R125DiscriminantCase[] =
  Object.freeze([
    {
      caseId: 'R125-C01-BROAD-DANGZHONG-CONTEXT',
      comparisonGroupId: 'BROAD-SUPPORT-CONTEXT',
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'BROAD_SUPPORT_CONTEXT',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: '子平真詮評註 / 論十干得時不旺失時不弱',
      sourceRefs: [
        'src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.ts',
      ],
      sourceStatement:
        'The governed selected surface names 比劫 and 印綬 together among 黨眾-associated support constituents.',
      interpretiveReading:
        'Peer and resource support share a broad support context in this bounded source surface.',
      researchInference:
        'Co-membership in a broad support context does not establish identical mechanism, equivalence, or free substitution.',
      equivalenceStatus: 'SAME_BROAD_SUPPORT_CONTEXT',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['complete chart-level support collection remains incomplete'],
      prohibitedExtensions: [
        'SAME_DANGZHONG_CONTEXT_EQUALS_SAME_MECHANISM',
        'SAME_DANGZHONG_CONTEXT_EQUALS_NUMERIC_EQUIVALENCE',
      ],
    },
    {
      caseId: 'R125-C02-PEER-FRIEND-SUPPORT-MECHANISM',
      comparisonGroupId: 'MECHANISM-DISCRIMINANT',
      family: 'PEER_SUPPORT',
      discriminant: 'MECHANISM',
      sourceNature: 'BASE_TEXT',
      sourceStratum: '子平真詮 / 論十干得時不旺失時不弱',
      sourceRefs: [
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'src/research/general-natal-visible-bijian-dang-zhong-constituent-authority.ts',
      ],
      sourceStatement:
        'The selected source describes 比劫 through a friend-like mutual-support analogy.',
      interpretiveReading:
        'Peer support is represented as same-kind assistance rather than generation from another element.',
      researchInference:
        'This mechanism is qualitatively distinguishable from 印綬生我 language.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: true,
      resourceSupportObserved: false,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['the analogy does not itself settle every 劫財 case'],
      prohibitedExtensions: [
        'FRIEND_ANALOGY_EQUALS_GENERAL_BIJIE_RUNTIME_RESOLVER',
        'PEER_SUPPORT_EQUALS_RESOURCE_GENERATION',
      ],
    },
    {
      caseId: 'R125-C03-RESOURCE-SHENGWO-MECHANISM',
      comparisonGroupId: 'MECHANISM-DISCRIMINANT',
      family: 'RESOURCE_SUPPORT',
      discriminant: 'MECHANISM',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷六 / 論印綬',
      sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
      sourceStatement:
        'The source defines 印綬 as the relation that generates the self and as a source of vital qi.',
      interpretiveReading:
        'Resource support is described through a generating relation rather than same-kind peer assistance.',
      researchInference:
        'The reviewed source supplies a mechanism-level discriminant between peer and resource support.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: false,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [],
      prohibitedExtensions: [
        'SHENGWO_EQUALS_PEER_ASSISTANCE',
        'RESOURCE_SUPPORT_EQUALS_PEER_SUPPORT',
      ],
    },
    {
      caseId: 'R125-C04-RESOURCE-GUAN-SHENG-YIN',
      comparisonGroupId: 'RESOURCE-DEPENDENCY',
      family: 'RESOURCE_SUPPORT',
      discriminant: 'OPPOSITION_BEHAVIOR',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷六 / 論印綬',
      sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
      sourceStatement:
        'The source states that 官 can generate 印 within the selected 印綬 discussion.',
      interpretiveReading:
        'Resource support has a source-specific dependency on 官/殺 generation in this context.',
      researchInference:
        'No equivalent peer-support dependency is established by the reviewed passage.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: false,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['this does not create a universal 官印 resolver'],
      prohibitedExtensions: [
        'GUAN_GENERATES_RESOURCE_EQUALS_GUAN_GENERATES_PEER_SUPPORT',
        'GUAN_YIN_RELATION_EQUALS_SUPPORT_SCORE',
      ],
    },
    {
      caseId: 'R125-C05-RESOURCE-CAI-PO-YIN',
      comparisonGroupId: 'RESOURCE-DEPENDENCY',
      family: 'RESOURCE_SUPPORT',
      discriminant: 'OPPOSITION_BEHAVIOR',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷六 / 論印綬',
      sourceRefs: [
        'https://zh.wikisource.org/zh-hant/三命通會/卷六',
        'https://zh.wikisource.org/zh-hant/淵海子平',
      ],
      sourceStatement:
        'The reviewed sources directly preserve 財 damaging or breaking 印 in 印綬 contexts.',
      interpretiveReading:
        'Resource support has a characteristic adverse relation with 財 in the reviewed source surfaces.',
      researchInference:
        'This is not the same adverse mechanism as peer-support 爭財.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: false,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['full pattern-level conditions remain outside R125'],
      prohibitedExtensions: [
        'CAI_PO_YIN_EQUALS_BIJIE_ZHENG_CAI',
        'RESOURCE_OPPOSITION_EQUALS_PEER_OPPOSITION',
      ],
    },
    {
      caseId: 'R125-C06-PEER-ZHENGCAI-ADVERSE',
      comparisonGroupId: 'OPPOSITION-DISCRIMINANT',
      family: 'PEER_SUPPORT',
      discriminant: 'OPPOSITION_BEHAVIOR',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 財 context',
      sourceRefs: [
        'https://ncc.com.tw/fate/paleo/bg/bg_032.htm',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm',
      ],
      sourceStatement:
        'Selected commentary preserves 財 contexts where 比劫 competes for or divides 財 and may need control.',
      interpretiveReading:
        'Peer support can be adverse specifically because it competes with 財.',
      researchInference:
        'Peer-support failure mode differs from resource support being damaged by 財.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: true,
      resourceSupportObserved: false,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['財格-specific conditions are context dependent'],
      prohibitedExtensions: [
        'PEER_SUPPORT_ALWAYS_HARMS_CAI',
        'ZHENGCAI_BEHAVIOR_EQUALS_RESOURCE_BREAKAGE',
      ],
    },
    {
      caseId: 'R125-C07-PEER-DIVIDES-CAI-WHEN-WEAK',
      comparisonGroupId: 'OPPOSITION-DISCRIMINANT',
      family: 'PEER_SUPPORT',
      discriminant: 'SEASON_OR_STRENGTH_CONTEXT',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 財旺身弱',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm'],
      sourceStatement:
        'Selected commentary gives a bounded context where strong 財 with weak body can use 比劫 to divide 財.',
      interpretiveReading:
        'A relation that is adverse in one 財 context can be remedial in another.',
      researchInference:
        'Peer support is context-dependent and cannot be represented as a uniformly positive or negative scalar.',
      equivalenceStatus: 'CONTEXT_DEPENDENT',
      peerSupportObserved: true,
      resourceSupportObserved: false,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['no general 財旺身弱 threshold is established'],
      prohibitedExtensions: [
        'BIJIE_ALWAYS_DIVIDES_CAI_BENEFICIALLY',
        'PEER_SUPPORT_SIGN_EQUALS_FIXED_POSITIVE',
      ],
    },
    {
      caseId: 'R125-C08-PEER-REMOVES-CAI-TO-PROTECT-YIN',
      comparisonGroupId: 'PEER-RESOURCE-COMPOSITION',
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'COMPOSITION',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 印被財傷 rescue context',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm'],
      sourceStatement:
        'The commentary gives a bounded case where 比劫 removes excessive 財 and thereby protects 印.',
      interpretiveReading:
        'Peer support can act indirectly to preserve resource support rather than replacing it.',
      researchInference:
        'This is composition and rescue, not equivalence or substitutability.',
      equivalenceStatus: 'PARTIAL_FUNCTIONAL_OVERLAP',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['exact rescue conditions are local to the selected context'],
      prohibitedExtensions: [
        'PEER_PROTECTS_RESOURCE_EQUALS_PEER_REPLACES_RESOURCE',
        'RESCUE_CONTEXT_EQUALS_GLOBAL_SUBSTITUTION',
      ],
    },
    {
      caseId: 'R125-C09-PEER-ASSISTS-YINSHOU-CONTEXT',
      comparisonGroupId: 'PEER-RESOURCE-COMPOSITION',
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'COMPOSITION',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷六 / 論印綬',
      sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
      sourceStatement:
        'In an 印綬 context damaged by 財, the source says a 比劫/body-strengthening phase can become beneficial.',
      interpretiveReading:
        'Peer support can be conditionally useful inside a resource-support configuration.',
      researchInference:
        'Cooperation between families does not establish that they are interchangeable.',
      equivalenceStatus: 'PARTIAL_FUNCTIONAL_OVERLAP',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['the source explicitly says such body-strengthening is not always suitable'],
      prohibitedExtensions: [
        'PEER_SUPPORT_ALWAYS_BENEFITS_YINSHOU',
        'MIXED_BENEFIT_EQUALS_EQUIVALENCE',
      ],
    },
    {
      caseId: 'R125-C10-PEER-HELPS-BODY-AND-COMBINED-SHA',
      comparisonGroupId: 'PEER-RESOURCE-COMPOSITION',
      family: 'PEER_SUPPORT',
      discriminant: 'OPPOSITION_BEHAVIOR',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷六 / 淵源論 quoted context',
      sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
      sourceStatement:
        'The compiled traditional material preserves 比劫 helping the body and combining with 煞 in an 印-related context.',
      interpretiveReading:
        'Peer support can operate through body assistance and 煞 handling rather than resource generation.',
      researchInference:
        'This supplies another mechanism-level distinction from 印綬 itself.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['quoted lineage should not be counted as a wholly independent source vote'],
      prohibitedExtensions: [
        'BIJIE_HE_SHAA_EQUALS_YINSHOU_HUASHA',
        'BODY_ASSISTANCE_EQUALS_RESOURCE_GENERATION',
      ],
    },
    {
      caseId: 'R125-C11-RESOURCE-WEAK-BODY-USE',
      comparisonGroupId: 'WEAK-BODY-DISCRIMINANT',
      family: 'RESOURCE_SUPPORT',
      discriminant: 'SEASON_OR_STRENGTH_CONTEXT',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 身弱官重 or 傷官旺身弱 contexts',
      sourceRefs: [
        'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
      ],
      sourceStatement:
        'Selected commentary uses 印 in bounded weak-body contexts to transform/control adverse relations while supporting the day master.',
      interpretiveReading:
        'Resource support has an explicitly generative and mediating role in these weak-body contexts.',
      researchInference:
        'The reviewed source does not state that 比劫 is a globally equivalent substitute for these 印 functions.',
      equivalenceStatus: 'NON_SUBSTITUTABLE_IN_OBSERVED_CONTEXT',
      peerSupportObserved: false,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['pattern-specific adjudication remains outside R125'],
      prohibitedExtensions: [
        'WEAK_BODY_YIN_USE_EQUALS_BIJIE_SUBSTITUTION',
        'RESOURCE_MEDIATION_EQUALS_PEER_ASSISTANCE',
      ],
    },
    {
      caseId: 'R125-C11B-PEER-WEAK-BODY-CAI-USE',
      comparisonGroupId: 'WEAK-BODY-DISCRIMINANT',
      family: 'PEER_SUPPORT',
      discriminant: 'SEASON_OR_STRENGTH_CONTEXT',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 財旺身弱 context',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm'],
      sourceStatement:
        'Selected commentary gives a bounded weak-body context where 比劫 is used to divide strong 財.',
      interpretiveReading:
        'Peer support can remedy a weak-body state through peer assistance and 財 division rather than through the resource-generation mechanism.',
      researchInference:
        'This supplies the peer-side weak-body comparator to the resource-side 印 use without implying that the two interventions are interchangeable.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: true,
      resourceSupportObserved: false,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [
        'the 財旺身弱 context is not interchangeable with 官重 or 傷官旺 weak-body contexts',
        'no source supplies a peer-to-resource substitution rule',
      ],
      prohibitedExtensions: [
        'WEAK_BODY_PEER_USE_EQUALS_RESOURCE_USE',
        'PEER_WEAK_BODY_REMEDY_EQUALS_GLOBAL_SUBSTITUTION',
      ],
    },
    {
      caseId: 'R125-C12-PEER-WITHOUT-ROOT-FOUR-XIN',
      comparisonGroupId: 'PEER-ROOT-DEPENDENCY',
      family: 'PEER_SUPPORT',
      discriminant: 'ROOT_DEPENDENCY',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: 'R019/R122 exact four-Xin-Mao seed',
      sourceRefs: [
        'src/research/general-natal-bijie-without-tonggen-weak-context-observation-authority.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
      ],
      sourceStatement:
        'The governed four-Xin-Mao example remains weak despite repeated visible peer support when root is absent.',
      interpretiveReading:
        'Peer multiplicity does not universally replace root.',
      researchInference:
        'Peer support has a bounded limitation that cannot be inferred from support count alone.',
      equivalenceStatus: 'CONTEXT_DEPENDENT',
      peerSupportObserved: true,
      resourceSupportObserved: false,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['does not define all peer-support/root interactions'],
      prohibitedExtensions: [
        'PEER_COUNT_REPLACES_ROOT',
        'FOUR_PEERS_EQUALS_GLOBAL_WEAK_OR_STRONG_RULE',
      ],
    },
    {
      caseId: 'R125-C13-PEER-WITHOUT-ROOT-FOUR-BING',
      comparisonGroupId: 'PEER-ROOT-DEPENDENCY',
      family: 'PEER_SUPPORT',
      discriminant: 'ROOT_DEPENDENCY',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: 'R019/R122 exact four-Bing-Shen seed',
      sourceRefs: [
        'src/research/general-natal-bijie-without-tonggen-weak-context-observation-authority.ts',
        'src/research/general-natal-season-root-interaction-counterexamples.ts',
      ],
      sourceStatement:
        'The governed four-Bing-Shen example preserves the same repeated-peer-without-root weakness boundary.',
      interpretiveReading:
        'A second exact element example reinforces that visible peer count is not a root substitute.',
      researchInference:
        'The pair supports a peer/root discriminant but not a universal peer rule.',
      equivalenceStatus: 'CONTEXT_DEPENDENT',
      peerSupportObserved: true,
      resourceSupportObserved: false,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['resource-without-root comparison is not isolated here'],
      prohibitedExtensions: [
        'PEER_ROOT_BOUNDARY_EQUALS_RESOURCE_ROOT_BOUNDARY',
        'TWO_EXAMPLES_EQUAL_COMPLETE_PEER_RULE',
      ],
    },
    {
      caseId: 'R125-C14-RESOURCE-MULTIPLICITY-POSITIVE',
      comparisonGroupId: 'EXCESS-BEHAVIOR-DISCRIMINANT',
      family: 'RESOURCE_SUPPORT',
      discriminant: 'EXCESS_BEHAVIOR',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷六 / 論印綬',
      sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
      sourceStatement:
        'The source contains a bounded comparison in which more 印綬 can be preferable.',
      interpretiveReading:
        'Resource multiplicity can be beneficial in some contexts.',
      researchInference:
        'This does not establish monotonic benefit because the same source also preserves adverse excess.',
      equivalenceStatus: 'CONTEXT_DEPENDENT',
      peerSupportObserved: false,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['no exact beneficial count is supplied'],
      prohibitedExtensions: [
        'MORE_RESOURCE_ALWAYS_BETTER',
        'RESOURCE_COUNT_EQUALS_LINEAR_SUPPORT',
      ],
    },
    {
      caseId: 'R125-C15-RESOURCE-MULTIPLICITY-ADVERSE',
      comparisonGroupId: 'EXCESS-BEHAVIOR-DISCRIMINANT',
      family: 'RESOURCE_SUPPORT',
      discriminant: 'EXCESS_BEHAVIOR',
      sourceNature: 'CLASSICAL_COMPILATION',
      sourceStratum: '三命通會 卷六 / 論印綬',
      sourceRefs: [
        'https://zh.wikisource.org/zh-hant/三命通會/卷六',
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
      ],
      sourceStatement:
        'The same resource-support tradition preserves adverse outcomes for many or excessive 印.',
      interpretiveReading:
        'Resource support has explicit context-dependent excess/reversal behavior.',
      researchInference:
        'No reviewed peer-support source supplies an identical general excess law, so common excess behavior is not established.',
      equivalenceStatus: 'DISTINCT_MECHANISM',
      peerSupportObserved: false,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['太過 / 多 has no universal numeric boundary'],
      prohibitedExtensions: [
        'RESOURCE_EXCESS_RULE_AUTO_COPIES_TO_PEER_SUPPORT',
        'COMMON_SUPPORT_SATURATION_BEHAVIOR',
      ],
    },
    {
      caseId: 'R125-C16-MIXED-BIYIN-REPETITION',
      comparisonGroupId: 'BROAD-SUPPORT-CONTEXT',
      family: 'MIXED_PEER_RESOURCE',
      discriminant: 'COMPOSITION',
      sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
      sourceStratum: '子平真詮評註 / out-of-season Wood support example',
      sourceRefs: [
        'src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.ts',
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
      ],
      sourceStatement:
        'A bounded source example combines repeated 比 and 印 with additional rooted support and reaches 黨眾 / 不弱.',
      interpretiveReading:
        'Both families can cooperate inside one qualitative support configuration.',
      researchInference:
        'Cooperation does not reveal an exchange ratio or prove that either family can replace the other.',
      equivalenceStatus: 'PARTIAL_FUNCTIONAL_OVERLAP',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['mixed-family composition law remains missing'],
      prohibitedExtensions: [
        'BIYIN_COOPERATION_EQUALS_COMMENSURABILITY',
        'MIXED_SUPPORT_EQUALS_FAMILY_NEUTRAL_SCALAR',
      ],
    },
    {
      caseId: 'R125-C17-NO-GLOBAL-SUBSTITUTION-RATIO',
      comparisonGroupId: 'EQUIVALENCE-AUDIT',
      family: 'COMPARATIVE_AUDIT',
      discriminant: 'SUBSTITUTABILITY',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R018/R124/R125 reviewed corpus',
      sourceRefs: [
        'src/research/general-natal-dang-zhong-support-constituent-completeness-authority-review.ts',
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
      ],
      sourceStatement:
        'No reviewed source package supplies a universal conversion ratio between peer support and resource support.',
      interpretiveReading:
        'Observed cooperation and shared support context are not evidence of free substitution.',
      researchInference:
        'Global peer↔resource substitutability remains unsupported.',
      equivalenceStatus: 'NOT_ESTABLISHED',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: ['future source-specific bounded substitutions could still be discovered'],
      prohibitedExtensions: [
        'ONE_BIJIE_EQUALS_ONE_YINSHOU',
        'PEER_RESOURCE_CONVERSION_RATIO',
        'FAMILY_NEUTRAL_SUPPORT_UNIT',
      ],
    },
    {
      caseId: 'R125-C18-NO-COMMON-THRESHOLD-OR-EXCESS-LAW',
      comparisonGroupId: 'EQUIVALENCE-AUDIT',
      family: 'COMPARATIVE_AUDIT',
      discriminant: 'EXCESS_BEHAVIOR',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R124/R125 comparative audit',
      sourceRefs: [
        'src/research/general-natal-support-accumulation-saturation-audit.ts',
      ],
      sourceStatement:
        'The reviewed corpus has no shared numeric threshold, saturation point, or common excess law spanning peer and resource support.',
      interpretiveReading:
        'The two families have different observed failure profiles and incomplete comparable coverage.',
      researchInference:
        'A family-neutral support scalar or shared saturation behavior is not authorized.',
      equivalenceStatus: 'NOT_ESTABLISHED',
      peerSupportObserved: true,
      resourceSupportObserved: true,
      mechanismEquivalentAuthorized: false,
      freeSubstitutionAuthorized: false,
      numericEquivalenceAuthorized: false,
      commonThresholdAuthorized: false,
      commonExcessBehaviorAuthorized: false,
      finalStrengthAuthorized: false,
      unresolvedFactors: [
        'peer excess evidence is less directly characterized than resource excess evidence',
        'complete chart-level family coverage remains unavailable',
      ],
      prohibitedExtensions: [
        'COMMON_SUPPORT_THRESHOLD',
        'COMMON_SUPPORT_SATURATION_CURVE',
        'PEER_RESOURCE_TOTAL_SUPPORT_SCORE',
      ],
    },
  ]);

export const R125_COMPARISON_GROUPS = Object.freeze([
  'BROAD-SUPPORT-CONTEXT',
  'MECHANISM-DISCRIMINANT',
  'RESOURCE-DEPENDENCY',
  'OPPOSITION-DISCRIMINANT',
  'PEER-RESOURCE-COMPOSITION',
  'WEAK-BODY-DISCRIMINANT',
  'PEER-ROOT-DEPENDENCY',
  'EXCESS-BEHAVIOR-DISCRIMINANT',
  'EQUIVALENCE-AUDIT',
] as const);

export const R125_REJECTED_DERIVATIONS = Object.freeze([
  'BIJIE_SUPPORT_EQUALS_YINSHOU_SUPPORT',
  'ONE_BIJIE_EQUALS_ONE_YINSHOU',
  'PEER_SUPPORT_PLUS_RESOURCE_SUPPORT_EQUALS_SUPPORT_COUNT',
  'PEER_COUNT_PLUS_RESOURCE_COUNT_EQUALS_TOTAL_STRENGTH',
  'YINSHOU_GLOBALLY_SUBSTITUTES_BIJIE',
  'BIJIE_GLOBALLY_SUBSTITUTES_YINSHOU',
  'SAME_DANGZHONG_CONTEXT_EQUALS_SAME_MECHANISM',
  'SAME_SUPPORT_LABEL_EQUALS_SAME_EXCESS_BEHAVIOR',
  'PEER_SUPPORT_MANY_EQUALS_AUTOMATIC_QIANG',
  'RESOURCE_SUPPORT_MANY_EQUALS_AUTOMATIC_QIANG',
  'PEER_RESOURCE_COMMON_THRESHOLD',
  'PEER_RESOURCE_COMMON_SATURATION_CURVE',
  'SUPPORT_FAMILY_PRESENT_EQUALS_FINAL_QIANG_RUO',
] as const);

export const R125_SUMMARY = Object.freeze({
  caseCount: R125_DISCRIMINANT_CASES.length,
  comparisonGroupCount: R125_COMPARISON_GROUPS.length,
  peerOnlyCount: R125_DISCRIMINANT_CASES.filter(
    (row) => row.family === 'PEER_SUPPORT',
  ).length,
  resourceOnlyCount: R125_DISCRIMINANT_CASES.filter(
    (row) => row.family === 'RESOURCE_SUPPORT',
  ).length,
  mixedOrComparativeCount: R125_DISCRIMINANT_CASES.filter(
    (row) =>
      row.family === 'MIXED_PEER_RESOURCE' ||
      row.family === 'COMPARATIVE_AUDIT',
  ).length,
  numericEquivalenceAuthorizedCount: R125_DISCRIMINANT_CASES.filter(
    (row) => row.numericEquivalenceAuthorized,
  ).length,
  freeSubstitutionAuthorizedCount: R125_DISCRIMINANT_CASES.filter(
    (row) => row.freeSubstitutionAuthorized,
  ).length,
  mechanismEquivalentAuthorizedCount: R125_DISCRIMINANT_CASES.filter(
    (row) => row.mechanismEquivalentAuthorized,
  ).length,
} as const);

export const R125_AUTHORITY = Object.freeze({
  status: 'RESEARCH_PEER_RESOURCE_DISCRIMINANT_CORPUS_COMPLETE' as const,
  researchOnly: true,
  sharedBroadSupportContextObserved: true,
  peerSupportObserved: true,
  resourceSupportObserved: true,
  distinctMechanismEvidenceObserved: true,
  partialFunctionalOverlapObserved: true,
  mixedPeerResourceCooperationObserved: true,
  peerResourceMechanismEquivalenceEstablished: false,
  freePeerResourceSubstitutionEstablished: false,
  numericPeerResourceEquivalenceEstablished: false,
  commonPeerResourceThresholdEstablished: false,
  commonPeerResourceExcessBehaviorEstablished: false,
  familyNeutralSupportScalarAuthorized: false,
  completeChartSupportAggregationAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
