export const R126_CONTROL_DRAIN_OUTPUT_ORDERING_VERSION = '0.1.0-research' as const;

export type R126RelationFamily =
  | 'CONTROL'
  | 'OUTPUT'
  | 'WEALTH_CAPACITY'
  | 'OUTPUT_TO_WEALTH'
  | 'WEALTH_TO_CONTROL'
  | 'OUTPUT_CONTROLS_KILL'
  | 'RESCUE_CONTAMINATION'
  | 'POSITION_CONTEXT'
  | 'AUDIT';

export type R126Scope =
  | 'STRENGTH_CONTEXT'
  | 'PATTERN_CONTEXT'
  | 'BOTH_EXPLICIT'
  | 'UNCERTAIN_TRANSFER';

export type R126OrderingType =
  | 'PARALLEL_RELATIONS'
  | 'GENERATIVE_CHAIN'
  | 'CONTROL_CHAIN'
  | 'RESCUE_CHAIN'
  | 'CONTAMINATION_CHAIN'
  | 'POSITION_DEPENDENT'
  | 'CONTEXT_DEPENDENT'
  | 'GLOBAL_PRECEDENCE_AUDIT';

export type R126OrderingEvidence =
  | 'EXPLICIT_IN_SOURCE'
  | 'LOCALLY_NECESSARY_FROM_SOURCE_RELATION'
  | 'REPOSITORY_SYNTHESIS_ONLY'
  | 'NOT_APPLICABLE';

export type R126SourceNature =
  | 'BASE_TEXT'
  | 'LATER_COMMENTARY'
  | 'CLASSICAL_COMPILATION'
  | 'REPOSITORY_GOVERNED_SOURCE_SURFACE'
  | 'RESEARCH_SYNTHESIS';

export interface R126OrderingCase {
  caseId: string;
  comparisonGroupId: string | null;
  family: R126RelationFamily;
  scope: R126Scope;
  orderingType: R126OrderingType;
  orderingEvidence: R126OrderingEvidence;
  sourceNature: R126SourceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  actors: readonly string[];
  chain: readonly string[];
  sourceStatement: string;
  interpretiveReading: string;
  researchInference: string;
  relationPresenceSettlesOutcome: false;
  genericChallengingCollapseAuthorized: false;
  scalarAggregationAuthorized: false;
  independentCountingAuthorized: false;
  globalPrecedenceAuthorized: false;
  numericWeightAuthorized: false;
  finalStrengthAuthorized: false;
  causalChainDoubleCountingRisk: boolean;
  unresolvedFactors: readonly string[];
  prohibitedExtensions: readonly string[];
}

export const R126_ORDERING_CASES: readonly R126OrderingCase[] = Object.freeze([
  {
    caseId: 'R126-C01-I13-CHALLENGING-SUBSTRATE',
    comparisonGroupId: 'GENERIC-CHALLENGING-AUDIT',
    family: 'AUDIT',
    scope: 'UNCERTAIN_TRANSFER',
    orderingType: 'GLOBAL_PRECEDENCE_AUDIT',
    orderingEvidence: 'REPOSITORY_SYNTHESIS_ONLY',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'I13 strength-evidence foundation',
    sourceRefs: ['src/research/i13-strength-evidence-pack.ts'],
    actors: ['OUTPUT', 'WEALTH', 'OFFICER'],
    chain: [],
    sourceStatement:
      'I13 currently records output, wealth, and officer as unweighted challenging evidence and explicitly does not classify final strength.',
    interpretiveReading:
      'The shared challenging label is an evidence-collection category rather than proof that the three relations are semantically identical.',
    researchInference:
      'R126 must preserve the collector boundary while refusing equal-negative-unit or fixed-order interpretations.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['I13 intentionally omits relation settlement and weighting'],
    prohibitedExtensions: [
      'I13_CHALLENGING_EQUALS_EQUAL_NEGATIVE_UNIT',
      'I13_RELATION_ENUM_ORDER_EQUALS_SEMANTIC_PRECEDENCE',
    ],
  },
  {
    caseId: 'R126-C02-OUTPUT-LEAKAGE-CAN-BE-USEFUL',
    comparisonGroupId: 'OUTPUT-LEAKAGE-CONTEXT',
    family: 'OUTPUT',
    scope: 'BOTH_EXPLICIT',
    orderingType: 'CONTEXT_DEPENDENT',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [
      'src/research/general-natal-seal-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['DAY_MASTER', 'RESOURCE', 'OUTPUT'],
    chain: ['身印兩旺', '食傷洩氣'],
    sourceStatement:
      'The source presents 身印兩旺而用食傷洩氣 as a successful bounded configuration.',
    interpretiveReading:
      'Output/leakage can be useful when body and resource are both excessive/strong in the stated context.',
    researchInference:
      'Output cannot be assigned a universally adverse polarity merely because it leaks qi.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: false,
    unresolvedFactors: ['no universal body/resource threshold is stated'],
    prohibitedExtensions: [
      'OUTPUT_ALWAYS_NEGATIVE',
      'OUTPUT_USEFUL_HERE_EQUALS_OUTPUT_GLOBALLY_BENEFICIAL',
    ],
  },
  {
    caseId: 'R126-C03-FOOD-GENERATES-WEALTH',
    comparisonGroupId: 'OUTPUT-TO-WEALTH',
    family: 'OUTPUT_TO_WEALTH',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'GENERATIVE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 食神成敗',
    sourceRefs: [
      'src/research/general-natal-food-god-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['FOOD_GOD', 'WEALTH'],
    chain: ['食神', '生財'],
    sourceStatement: 'The source explicitly preserves 食神生財.',
    interpretiveReading:
      'Output can generate wealth as a local causal chain rather than merely act as an isolated leak from the day master.',
    researchInference:
      'Counting 食神 and the generated 財 as independent equal penalties would risk double counting one causal path.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['pattern success does not directly quantify ordinary strength effect'],
    prohibitedExtensions: [
      'FOOD_PLUS_WEALTH_EQUALS_TWO_NEGATIVE_POINTS',
      'PATTERN_SUCCESS_EQUALS_STRENGTH_SCORE',
    ],
  },
  {
    caseId: 'R126-C04-HURTING-GENERATES-WEALTH',
    comparisonGroupId: 'OUTPUT-TO-WEALTH',
    family: 'OUTPUT_TO_WEALTH',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'GENERATIVE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 傷官成敗',
    sourceRefs: [
      'src/research/general-natal-hurting-officer-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['HURTING_OFFICER', 'WEALTH'],
    chain: ['傷官', '生財'],
    sourceStatement: 'The source explicitly preserves 傷官生財.',
    interpretiveReading:
      'A second output family also participates in a local output-to-wealth chain.',
    researchInference:
      'Output and wealth must remain directionally distinct even when both are collected as challenging evidence elsewhere.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['no universal output-to-wealth strength transfer coefficient'],
    prohibitedExtensions: [
      'HURTING_AND_WEALTH_ARE_IDENTICAL_CHALLENGE_UNITS',
      'CHAIN_COMPONENTS_CAN_BE_SUMMED_INDEPENDENTLY',
    ],
  },
  {
    caseId: 'R126-C05-HURTING-WEALTH-KILL-CHAIN',
    comparisonGroupId: 'OUTPUT-WEALTH-CONTROL',
    family: 'OUTPUT_TO_WEALTH',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'GENERATIVE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: '子平真詮評註 / 傷官成敗',
    sourceRefs: [
      'src/research/general-natal-hurting-officer-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['HURTING_OFFICER', 'WEALTH', 'KILL'],
    chain: ['傷官', '生財', '財', '生煞'],
    sourceStatement:
      'The commentary states that when 傷官生財 also carries 煞, the 財 can turn to generate 煞.',
    interpretiveReading:
      'The source gives an ordered output→wealth→kill path whose meaning depends on the intermediate wealth link.',
    researchInference:
      'Treating output, wealth, and kill as three independent equal negatives destroys the source-local causal ordering.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['chain is pattern-scoped and not a global strength resolver'],
    prohibitedExtensions: [
      'OUTPUT_WEALTH_KILL_EQUALS_MINUS_THREE',
      'LOCAL_GENERATIVE_CHAIN_EQUALS_GLOBAL_PRECEDENCE',
    ],
  },
  {
    caseId: 'R126-C06-WEALTH-GENERATES-OFFICER',
    comparisonGroupId: 'WEALTH-TO-CONTROL',
    family: 'WEALTH_TO_CONTROL',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'GENERATIVE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 財格成敗',
    sourceRefs: [
      'src/research/general-natal-wealth-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['WEALTH', 'OFFICER'],
    chain: ['財', '生官'],
    sourceStatement: 'The source explicitly preserves 財生官旺.',
    interpretiveReading:
      'Wealth can generate a control actor rather than ending as an isolated expenditure-like relation.',
    researchInference:
      'Wealth and officer cannot be assumed to be independent equal-strength penalties when one is the source-local generator of the other.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['ordinary-strength transfer from this pattern relation remains unproven'],
    prohibitedExtensions: [
      'WEALTH_PLUS_OFFICER_EQUALS_TWO_NEGATIVE_POINTS',
      'WEALTH_ALWAYS_ENDS_AT_DAY_MASTER_EXPENDITURE',
    ],
  },
  {
    caseId: 'R126-C07-WEALTH-GENERATES-KILL',
    comparisonGroupId: 'WEALTH-TO-CONTROL',
    family: 'WEALTH_TO_CONTROL',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'GENERATIVE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: '子平真詮評註 / 七煞 or 食傷 contexts',
    sourceRefs: [
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
      'src/research/general-natal-hurting-officer-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['WEALTH', 'KILL'],
    chain: ['財', '生煞'],
    sourceStatement:
      'The reviewed source preserves 財 feeding or supporting 煞 in failure/contamination contexts.',
    interpretiveReading:
      'Wealth may strengthen a control actor in a bounded chain.',
    researchInference:
      'The relation profile differs from both pure wealth capacity and pure kill control.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['no universal wealth-to-kill strength magnitude'],
    prohibitedExtensions: [
      'WEALTH_AND_KILL_ALWAYS_STACK_INDEPENDENTLY',
      'WEALTH_TO_KILL_EQUALS_FIXED_STRENGTH_PENALTY',
    ],
  },
  {
    caseId: 'R126-C08-FOOD-CONTROLS-KILL',
    comparisonGroupId: 'OUTPUT-CONTROLS-KILL',
    family: 'OUTPUT_CONTROLS_KILL',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'CONTROL_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 七煞成敗救應',
    sourceRefs: [
      'src/research/general-natal-food-god-pattern-conditions.ts',
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['FOOD_GOD', 'KILL'],
    chain: ['食神', '制煞'],
    sourceStatement: 'The source explicitly preserves 食神制煞.',
    interpretiveReading:
      'An output actor can simultaneously function as a controller of kill.',
    researchInference:
      'Output cannot be modeled as pure leakage with a single fixed polarity.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['relative kill/body strength remains required in some bounded paths'],
    prohibitedExtensions: [
      'OUTPUT_HAS_ONLY_LEAKAGE_ROLE',
      'FOOD_CONTROL_OF_KILL_EQUALS_NO_OUTPUT_COST',
    ],
  },
  {
    caseId: 'R126-C09-STRONG-BODY-KILL-CONTROLLED',
    comparisonGroupId: 'CONTROL-BODY-CONTEXT',
    family: 'CONTROL',
    scope: 'BOTH_EXPLICIT',
    orderingType: 'CONTEXT_DEPENDENT',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 七煞成敗',
    sourceRefs: [
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['DAY_MASTER', 'KILL', 'CONTROLLER'],
    chain: ['身強', '七煞', '逢制'],
    sourceStatement: 'The source preserves 身強七煞逢制 as a successful bounded condition.',
    interpretiveReading:
      'Control cannot be assessed independently of body condition and whether the kill itself is controlled.',
    researchInference:
      'Officer/kill presence is not a universally fixed adverse strength unit.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: false,
    unresolvedFactors: ['exact 身強 predicate remains outside R126'],
    prohibitedExtensions: [
      'KILL_ALWAYS_NEGATIVE',
      'STRONG_BODY_KILL_CONTROLLED_EQUALS_GLOBAL_CONTROL_RULE',
    ],
  },
  {
    caseId: 'R126-C10-SEVEN-KILL-FED-WITHOUT-CONTROL',
    comparisonGroupId: 'CONTROL-BODY-CONTEXT',
    family: 'CONTROL',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'CONTEXT_DEPENDENT',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: '子平真詮評註 / 七煞 failure explanation',
    sourceRefs: [
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['WEALTH', 'KILL', 'DAY_MASTER'],
    chain: ['財', '生煞', '無制'],
    sourceStatement:
      'The commentary explains that wealth feeding an uncontrolled kill creates an adverse bounded configuration.',
    interpretiveReading:
      'The problematic state is the ordered combination of generation and lack of control, not kill presence alone.',
    researchInference:
      'Control-state settlement must remain distinct from raw relation presence.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['no universal kill-control threshold'],
    prohibitedExtensions: [
      'KILL_PRESENCE_EQUALS_SETTLED_FAILURE',
      'WEALTH_AND_KILL_CAN_BE_COUNTED_INDEPENDENTLY_HERE',
    ],
  },
  {
    caseId: 'R126-C11-WEALTH-MANY-BODY-WEAK',
    comparisonGroupId: 'WEALTH-CAPACITY-CONTEXT',
    family: 'WEALTH_CAPACITY',
    scope: 'STRENGTH_CONTEXT',
    orderingType: 'CONTEXT_DEPENDENT',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'CLASSICAL_COMPILATION',
    sourceStratum: '三命通會 卷六 / 財 discussion',
    sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
    actors: ['DAY_MASTER', 'WEALTH'],
    chain: ['財多', '身弱'],
    sourceStatement:
      'The compilation directly preserves 財多身弱 / 財旺身衰 language in the reviewed wealth material.',
    interpretiveReading:
      'Wealth effect is explicitly tied to the day master capacity rather than treated as a context-free fixed drain.',
    researchInference:
      'A wealth relation cannot be reduced to one invariant negative unit.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: false,
    unresolvedFactors: ['財多 and 身弱 are qualitative states without executable thresholds here'],
    prohibitedExtensions: [
      'WEALTH_ALWAYS_EQUALS_FIXED_DRAIN',
      'CAI_DUO_EQUALS_EXACT_COUNT_THRESHOLD',
    ],
  },
  {
    caseId: 'R126-C12-WEALTH-WEAK-BODY-RESOURCE-REMEDY',
    comparisonGroupId: 'WEALTH-CAPACITY-CONTEXT',
    family: 'WEALTH_CAPACITY',
    scope: 'STRENGTH_CONTEXT',
    orderingType: 'RESCUE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'CLASSICAL_COMPILATION',
    sourceStratum: '三命通會 卷六 / 財 discussion',
    sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
    actors: ['WEALTH', 'DAY_MASTER', 'RESOURCE'],
    chain: ['財多身弱', '印扶身'],
    sourceStatement:
      'The reviewed compilation preserves 財多身弱要印扶身 in the selected wealth material.',
    interpretiveReading:
      'The adverse capacity relation is locally remediated through resource support.',
    researchInference:
      'Wealth effect is relational and condition-dependent, not a scalar subtraction that ignores rescue.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['not a universal resource remedy for every wealth configuration'],
    prohibitedExtensions: [
      'WEALTH_MINUS_RESOURCE_EQUALS_NET_SCORE',
      'RESOURCE_ALWAYS_CANCELS_WEALTH',
    ],
  },
  {
    caseId: 'R126-C13-WEALTH-MANY-GENERATES-KILL',
    comparisonGroupId: 'OUTPUT-WEALTH-CONTROL',
    family: 'WEALTH_TO_CONTROL',
    scope: 'STRENGTH_CONTEXT',
    orderingType: 'GENERATIVE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'CLASSICAL_COMPILATION',
    sourceStratum: '三命通會 卷六 / 偏財 discussion',
    sourceRefs: ['https://zh.wikisource.org/zh-hant/三命通會/卷六'],
    actors: ['WEALTH', 'KILL'],
    chain: ['財多', '生煞'],
    sourceStatement: 'The compilation explicitly preserves 財多生煞 as an adverse bounded condition.',
    interpretiveReading:
      'Wealth quantity/capacity can feed a control actor, creating a second-order path.',
    researchInference:
      'Wealth challenge and kill challenge cannot automatically be counted as independent penalties in this chain.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['no exact 財多 threshold or generated-kill magnitude'],
    prohibitedExtensions: [
      'CAI_DUO_SHENG_SHA_EQUALS_TWO_FIXED_PENALTIES',
      'WEALTH_TO_KILL_CHAIN_EQUALS_GLOBAL_ORDER',
    ],
  },
  {
    caseId: 'R126-C14-KILL-FOOD-SEAL-CONTAMINATION',
    comparisonGroupId: 'SEAL-INTERRUPTS-OUTPUT-CONTROL',
    family: 'RESCUE_CONTAMINATION',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'CONTAMINATION_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 七煞成敗救應',
    sourceRefs: [
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['KILL', 'FOOD_GOD', 'RESOURCE'],
    chain: ['七煞', '食制', '又逢印'],
    sourceStatement: 'The source preserves 七煞逢食制而又逢印 as a contamination case.',
    interpretiveReading:
      'Resource intervention can alter an already-established food-controls-kill relation.',
    researchInference:
      'The meaning of resource cannot be read independently of the prior control chain.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['exact effect magnitude and generalized precedence remain unprovided'],
    prohibitedExtensions: [
      'RESOURCE_ALWAYS_SUPPORTIVE_IN_ANY_CHAIN',
      'FOOD_RESOURCE_KILL_CAN_BE_SCORED_INDEPENDENTLY',
    ],
  },
  {
    caseId: 'R126-C15-KILL-FOOD-SEAL-WEALTH-RESCUE',
    comparisonGroupId: 'SEAL-INTERRUPTS-OUTPUT-CONTROL',
    family: 'RESCUE_CONTAMINATION',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'RESCUE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 救應',
    sourceRefs: [
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['KILL', 'FOOD_GOD', 'RESOURCE', 'WEALTH'],
    chain: ['煞逢食制', '印來護煞', '財去印', '存食'],
    sourceStatement:
      'The source explicitly preserves a multi-step rescue chain in which wealth removes resource and preserves food after resource had protected kill.',
    interpretiveReading:
      'Local ordering is essential to understand why the same wealth actor can function as rescue inside this chain.',
    researchInference:
      'This is strong evidence against equal scalar aggregation and against deriving one universal relation precedence from actor type alone.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['the chain is pattern-local and not a universal chart resolver'],
    prohibitedExtensions: [
      'WEALTH_ALWAYS_ADVERSE',
      'LOCAL_RESCUE_ORDER_EQUALS_GLOBAL_RUNTIME_PRECEDENCE',
    ],
  },
  {
    caseId: 'R126-C16-WEALTH-ROBBERY-OUTPUT-RESCUE',
    comparisonGroupId: 'RESCUE-ORDERING',
    family: 'RESCUE_CONTAMINATION',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'RESCUE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 財格救應',
    sourceRefs: [
      'src/research/general-natal-wealth-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['WEALTH', 'ROB_WEALTH', 'FOOD_GOD'],
    chain: ['財逢劫', '透食', '化之'],
    sourceStatement: 'The source preserves 財逢劫而透食以化之 as a rescue sequence.',
    interpretiveReading:
      'Output can mediate a wealth-versus-peer conflict rather than merely leak from the day master.',
    researchInference:
      'Actor presence alone is insufficient; relation order and mediation matter.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['化之 is not translated into an executable strength coefficient'],
    prohibitedExtensions: [
      'OUTPUT_ONLY_MEANS_LEAKAGE',
      'WEALTH_ROBBERY_OUTPUT_EQUALS_THREE_INDEPENDENT_SCORES',
    ],
  },
  {
    caseId: 'R126-C17-OFFICER-HURTING-RESOURCE-RESCUE',
    comparisonGroupId: 'RESCUE-ORDERING',
    family: 'RESCUE_CONTAMINATION',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'RESCUE_CHAIN',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 官格救應',
    sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm'],
    actors: ['OFFICER', 'HURTING_OFFICER', 'RESOURCE'],
    chain: ['官逢傷', '透印', '解之'],
    sourceStatement: 'The source preserves 官逢傷而透印以解之.',
    interpretiveReading:
      'Resource intervention changes the outcome of an output-versus-officer conflict.',
    researchInference:
      'Officer and output cannot be read as independent equal negatives when a third actor mediates their relation.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['pattern rescue does not directly quantify ordinary strength'],
    prohibitedExtensions: [
      'OFFICER_PLUS_OUTPUT_EQUALS_MINUS_TWO',
      'RESOURCE_RESCUE_EQUALS_FIXED_PLUS_ONE',
    ],
  },
  {
    caseId: 'R126-C18-WEALTH-RESOURCE-POSITION-COMPATIBILITY',
    comparisonGroupId: 'POSITION-CONTEXT',
    family: 'POSITION_CONTEXT',
    scope: 'PATTERN_CONTEXT',
    orderingType: 'POSITION_DEPENDENT',
    orderingEvidence: 'EXPLICIT_IN_SOURCE',
    sourceNature: 'BASE_TEXT',
    sourceStratum: '子平真詮 / 財格成敗',
    sourceRefs: [
      'src/research/general-natal-wealth-pattern-conditions.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    ],
    actors: ['WEALTH', 'RESOURCE'],
    chain: ['財格透印', '位置妥貼', '兩不相剋'],
    sourceStatement:
      'The source explicitly requires suitable positioning so wealth and resource do not mutually obstruct in the bounded success condition.',
    interpretiveReading:
      'The same actor set can settle differently depending on positional compatibility.',
    researchInference:
      'A relation set cannot be reduced to unordered actor presence.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: false,
    unresolvedFactors: ['no complete executable position-compatibility predicate'],
    prohibitedExtensions: [
      'ACTOR_SET_EQUALS_SETTLED_OUTCOME',
      'POSITION_TEXT_EQUALS_GENERIC_ORDER_INDEX',
    ],
  },
  {
    caseId: 'R126-C19-NO-INDEPENDENT-CHAIN-COUNTING',
    comparisonGroupId: 'GENERIC-CHALLENGING-AUDIT',
    family: 'AUDIT',
    scope: 'UNCERTAIN_TRANSFER',
    orderingType: 'GLOBAL_PRECEDENCE_AUDIT',
    orderingEvidence: 'REPOSITORY_SYNTHESIS_ONLY',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R126 cross-case audit',
    sourceRefs: [
      'src/research/general-natal-wealth-pattern-conditions.ts',
      'src/research/general-natal-hurting-officer-pattern-conditions.ts',
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
    ],
    actors: ['OUTPUT', 'WEALTH', 'OFFICER_OR_KILL'],
    chain: ['output→wealth', 'wealth→officer_or_kill'],
    sourceStatement:
      'Reviewed source-local chains repeatedly make one challenging actor the cause, mediator, or controller of another.',
    interpretiveReading:
      'Chain membership creates a material double-counting risk when every actor is counted independently.',
    researchInference:
      'Independent scalar counting is not authorized by the reviewed corpus.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['future methodology could define non-scalar settlement without numeric summation'],
    prohibitedExtensions: [
      'CHAIN_MEMBERSHIP_EQUALS_INDEPENDENT_COUNTABILITY',
      'CHALLENGING_COUNT_EQUALS_STRENGTH',
    ],
  },
  {
    caseId: 'R126-C20-NO-GLOBAL-PRECEDENCE',
    comparisonGroupId: 'POSITION-CONTEXT',
    family: 'AUDIT',
    scope: 'UNCERTAIN_TRANSFER',
    orderingType: 'GLOBAL_PRECEDENCE_AUDIT',
    orderingEvidence: 'REPOSITORY_SYNTHESIS_ONLY',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R126 ordering-divergence synthesis',
    sourceRefs: [
      'src/research/general-natal-food-god-pattern-conditions.ts',
      'src/research/general-natal-hurting-officer-pattern-conditions.ts',
      'src/research/general-natal-seven-kill-pattern-conditions.ts',
      'src/research/general-natal-wealth-pattern-conditions.ts',
    ],
    actors: ['OUTPUT', 'WEALTH', 'OFFICER', 'KILL', 'RESOURCE', 'PEER'],
    chain: [],
    sourceStatement:
      'The reviewed corpus contains multiple local relation orders, rescue sequences, contamination sequences, and position-dependent settlements.',
    interpretiveReading:
      'Ordering is source-local and context-sensitive rather than one universal actor-type precedence.',
    researchInference:
      'No global rule such as output→wealth→officer or a fixed runtime ordering is authorized.',
    relationPresenceSettlesOutcome: false,
    genericChallengingCollapseAuthorized: false,
    scalarAggregationAuthorized: false,
    independentCountingAuthorized: false,
    globalPrecedenceAuthorized: false,
    numericWeightAuthorized: false,
    finalStrengthAuthorized: false,
    causalChainDoubleCountingRisk: true,
    unresolvedFactors: ['cross-context precedence methodology remains a later research problem'],
    prohibitedExtensions: [
      'OUTPUT_ALWAYS_EVALUATED_BEFORE_WEALTH',
      'WEALTH_ALWAYS_EVALUATED_BEFORE_CONTROL',
      'SOURCE_SENTENCE_ORDER_EQUALS_GLOBAL_RUNTIME_PRECEDENCE',
    ],
  },
]);

export const R126_COMPARISON_GROUPS = Object.freeze([
  'GENERIC-CHALLENGING-AUDIT',
  'OUTPUT-LEAKAGE-CONTEXT',
  'OUTPUT-TO-WEALTH',
  'OUTPUT-WEALTH-CONTROL',
  'WEALTH-TO-CONTROL',
  'OUTPUT-CONTROLS-KILL',
  'CONTROL-BODY-CONTEXT',
  'WEALTH-CAPACITY-CONTEXT',
  'SEAL-INTERRUPTS-OUTPUT-CONTROL',
  'RESCUE-ORDERING',
  'POSITION-CONTEXT',
] as const);

export const R126_REJECTED_DERIVATIONS = Object.freeze([
  'OFFICER_EQUALS_MINUS_ONE',
  'OUTPUT_EQUALS_MINUS_ONE',
  'WEALTH_EQUALS_MINUS_ONE',
  'CHALLENGING_COUNT_EQUALS_STRENGTH',
  'RELATION_LIST_ORDER_EQUALS_SEMANTIC_ORDER',
  'TEN_GOD_ENUM_ORDER_EQUALS_INTERPRETIVE_ORDER',
  'SOURCE_SENTENCE_ORDER_EQUALS_RUNTIME_PRECEDENCE',
  'OUTPUT_ALWAYS_NEGATIVE',
  'WEALTH_ALWAYS_DRAIN',
  'OFFICER_OR_KILL_ALWAYS_NEGATIVE',
  'FOOD_CONTROLS_KILL_EQUALS_OUTPUT_HAS_NO_LEAKAGE_ROLE',
  'SAME_ACTOR_CAN_ONLY_HAVE_ONE_ROLE',
  'CHAIN_COMPONENTS_CAN_BE_SUMMED_INDEPENDENTLY',
  'PATTERN_SUCCESS_EQUALS_STRENGTH_SCORE',
  'LOCAL_ORDER_EQUALS_GLOBAL_PRECEDENCE',
] as const);

export const R126_SUMMARY = Object.freeze({
  caseCount: R126_ORDERING_CASES.length,
  comparisonGroupCount: R126_COMPARISON_GROUPS.length,
  controlCount: R126_ORDERING_CASES.filter((row) => row.family === 'CONTROL').length,
  outputCount: R126_ORDERING_CASES.filter((row) => row.family === 'OUTPUT').length,
  wealthCapacityCount: R126_ORDERING_CASES.filter(
    (row) => row.family === 'WEALTH_CAPACITY',
  ).length,
  outputToWealthCount: R126_ORDERING_CASES.filter(
    (row) => row.family === 'OUTPUT_TO_WEALTH',
  ).length,
  wealthToControlCount: R126_ORDERING_CASES.filter(
    (row) => row.family === 'WEALTH_TO_CONTROL',
  ).length,
  outputControlsKillCount: R126_ORDERING_CASES.filter(
    (row) => row.family === 'OUTPUT_CONTROLS_KILL',
  ).length,
  rescueContaminationCount: R126_ORDERING_CASES.filter(
    (row) => row.family === 'RESCUE_CONTAMINATION',
  ).length,
  doubleCountingRiskCount: R126_ORDERING_CASES.filter(
    (row) => row.causalChainDoubleCountingRisk,
  ).length,
  scalarAggregationAuthorizedCount: R126_ORDERING_CASES.filter(
    (row) => row.scalarAggregationAuthorized,
  ).length,
  globalPrecedenceAuthorizedCount: R126_ORDERING_CASES.filter(
    (row) => row.globalPrecedenceAuthorized,
  ).length,
  numericWeightAuthorizedCount: R126_ORDERING_CASES.filter(
    (row) => row.numericWeightAuthorized,
  ).length,
} as const);

export const R126_AUTHORITY = Object.freeze({
  status: 'RESEARCH_CONTROL_DRAIN_OUTPUT_ORDERING_DIVERGENCE_COMPLETE' as const,
  researchOnly: true,
  controlMechanismObserved: true,
  outputLeakageMechanismObserved: true,
  wealthCapacityMechanismObserved: true,
  localGenerativeOrderingObserved: true,
  localControlOrderingObserved: true,
  localRescueOrderingObserved: true,
  localContaminationOrderingObserved: true,
  positionDependentSettlementObserved: true,
  challengingRelationsMechanismEquivalentEstablished: false,
  independentChainCountingAuthorized: false,
  genericChallengingScalarAuthorized: false,
  globalRelationPrecedenceAuthorized: false,
  numericStrengthWeightsAuthorized: false,
  patternToStrengthTransferAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
