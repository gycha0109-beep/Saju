export const R127_STRENGTH_LABEL_INSTABILITY_VERSION = '0.1.0-research' as const;

export type R127PerturbationAxis =
  | 'SEASON_STATUS'
  | 'ROOT_PRESENCE'
  | 'ROOT_QUALITY'
  | 'ROOT_POSITION'
  | 'YUQI_TEMPORAL_CONTEXT'
  | 'STEM_POLARITY_SOURCE_POLICY'
  | 'CHANGSHENG_SOURCE_POLICY'
  | 'HIDDEN_TRANSPARENCY'
  | 'SUPPORT_FAMILY'
  | 'SUPPORT_MULTIPLICITY'
  | 'OUTPUT_PRESENCE'
  | 'RELATION_CHAIN_MEDIATOR'
  | 'CHALLENGING_RELATION_FAMILY'
  | 'WEALTH_CAPACITY_REMEDY';

export type R127IsolationQuality =
  | 'EXACT_SOURCE_STATE_WITH_SYNTHETIC_COUNTERFACTUAL'
  | 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE'
  | 'SOURCE_COMPARATIVE_ORDERING'
  | 'SOURCE_POLICY_PERTURBATION'
  | 'PARTIAL_ISOLATION'
  | 'SYNTHETIC_SINGLE_FEATURE_PROBE';

export type R127StrengthLabel =
  | 'WANG'
  | 'SHUAI'
  | 'QIANG'
  | 'RUO'
  | 'NOT_WANG'
  | 'NOT_RUO';

export type R127Disposition =
  | 'ANTI_DETERMINISTIC'
  | 'SEMANTIC_CHANGE_WITHOUT_LABEL'
  | 'SOURCE_POLICY_DIVERGENT'
  | 'NON_EQUIVALENT_SWAP'
  | 'LOCAL_CHAIN_RECONFIGURATION'
  | 'COUNTERFACTUAL_HOLD';

export type R127SourceNature =
  | 'BASE_TEXT'
  | 'LATER_COMMENTARY'
  | 'CLASSICAL_COMPILATION'
  | 'REPOSITORY_GOVERNED_SOURCE_SURFACE'
  | 'RESEARCH_SYNTHESIS';

export interface R127PerturbationCase {
  caseId: string;
  axis: R127PerturbationAxis;
  comparisonGroupId: string;
  isolationQuality: R127IsolationQuality;
  disposition: R127Disposition;
  sourceNature: R127SourceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  baselineEvidence: string;
  perturbation: string;
  heldConstantClaim: string;
  sourceStatement: string;
  interpretiveReading: string;
  researchInference: string;
  baselineSourceLabel: R127StrengthLabel | null;
  perturbedSourceLabel: R127StrengthLabel | null;
  exactSingleFeatureLabelFlipObserved: boolean;
  featureSemanticChangeObserved: boolean;
  counterfactualLabelAuthorized: boolean;
  labelInvarianceAuthorized: boolean;
  numericDeltaAuthorized: boolean;
  scalarScoreAuthorized: boolean;
  finalClassifierAuthorized: boolean;
  unresolvedFactors: readonly string[];
  prohibitedExtensions: readonly string[];
}

export const R127_PERTURBATION_CASES: readonly R127PerturbationCase[] = Object.freeze([
  {
    caseId: 'R127-C01-DE-SHI-NOT-WANG',
    axis: 'SEASON_STATUS',
    comparisonGroupId: 'SEASON-ANTI-DETERMINISM',
    isolationQuality: 'EXACT_SOURCE_STATE_WITH_SYNTHETIC_COUNTERFACTUAL',
    disposition: 'ANTI_DETERMINISTIC',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R019/R122 spring-Wood bounded source state',
    sourceRefs: [
      'src/research/general-natal-borderline-strength-case-corpus.ts',
      'src/research/general-natal-season-root-interaction-counterexamples.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    ],
    baselineEvidence: '春木 / 得時 with heavy Metal opposition and no Fire control',
    perturbation: 'Change only 得時 to 失時 in a research counterfactual.',
    heldConstantClaim:
      'The perturbation intends to hold the recorded opposition description fixed; missing chart facts are not synthesized.',
    sourceStatement: 'The source labels the baseline 是以得時而不旺也.',
    interpretiveReading:
      'Seasonal timeliness alone does not force a 旺 label under the recorded opposing configuration.',
    researchInference:
      'Changing season status alone does not authorize an opposite label because the source does not supply that exact counterfactual.',
    baselineSourceLabel: 'NOT_WANG',
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['complete four pillars unavailable', 'counterfactual source label absent'],
    prohibitedExtensions: [
      'DE_SHI_EQUALS_WANG',
      'SHI_SHI_COUNTERFACTUAL_EQUALS_RUO',
      'SEASON_TOGGLE_EQUALS_LABEL_FLIP',
    ],
  },
  {
    caseId: 'R127-C02-SHI-SHI-NOT-RUO',
    axis: 'SEASON_STATUS',
    comparisonGroupId: 'SEASON-ANTI-DETERMINISM',
    isolationQuality: 'EXACT_SOURCE_STATE_WITH_SYNTHETIC_COUNTERFACTUAL',
    disposition: 'ANTI_DETERMINISTIC',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R019/R122 autumn-Wood bounded source state',
    sourceRefs: [
      'src/research/general-natal-borderline-strength-case-corpus.ts',
      'src/research/general-natal-season-root-interaction-counterexamples.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    ],
    baselineEvidence: '秋木 / 失時 with 甲乙 visible support and 寅卯 deep root',
    perturbation: 'Change only 失時 to 得時 in a research counterfactual.',
    heldConstantClaim:
      'Recorded peer/root support is held descriptively fixed; missing chart facts remain unknown.',
    sourceStatement: 'The source labels the baseline 是失時不弱也.',
    interpretiveReading:
      'Seasonal loss alone does not force a 弱 label when the stated support/root context remains.',
    researchInference:
      'The opposite seasonal state cannot be assigned an invented 強/旺 label.',
    baselineSourceLabel: 'NOT_RUO',
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['complete chart unavailable', 'counterfactual source label absent'],
    prohibitedExtensions: [
      'SHI_SHI_EQUALS_RUO',
      'DE_SHI_COUNTERFACTUAL_EQUALS_QIANG',
      'SEASON_TOGGLE_EQUALS_NUMERIC_DELTA',
    ],
  },
  {
    caseId: 'R127-C03-FOUR-XIN-ADD-ROOT-HOLD',
    axis: 'ROOT_PRESENCE',
    comparisonGroupId: 'ROOT-PRESENCE',
    isolationQuality: 'EXACT_SOURCE_STATE_WITH_SYNTHETIC_COUNTERFACTUAL',
    disposition: 'COUNTERFACTUAL_HOLD',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R019/R122 exact 四辛卯 seed',
    sourceRefs: [
      'src/research/general-natal-borderline-strength-case-corpus.ts',
      'src/research/general-natal-season-root-interaction-counterexamples.ts',
      'src/research/general-natal-support-accumulation-saturation-audit.ts',
    ],
    baselineEvidence: '四辛卯 / repeated visible 辛 / 金不通根',
    perturbation: 'Add one applicable governed root while otherwise treating the exact source seed as unchanged.',
    heldConstantClaim:
      'This is a synthetic research probe; the source does not provide the resulting complete chart.',
    sourceStatement: '四辛卯，金不通根，雖天元一氣，仍作弱論.',
    interpretiveReading:
      'The exact baseline proves that visible peer repetition without root may remain weak.',
    researchInference:
      'Adding a root is semantically material, but an automatic opposite label is not source-authorized.',
    baselineSourceLabel: 'RUO',
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['which root is added', 'root position', 'source-labeled perturbed chart absent'],
    prohibitedExtensions: [
      'ONE_ROOT_ADDED_EQUALS_QIANG',
      'ROOT_PRESENCE_TOGGLE_EQUALS_LABEL_FLIP',
    ],
  },
  {
    caseId: 'R127-C04-FOUR-BING-ADD-ROOT-HOLD',
    axis: 'ROOT_PRESENCE',
    comparisonGroupId: 'ROOT-PRESENCE',
    isolationQuality: 'EXACT_SOURCE_STATE_WITH_SYNTHETIC_COUNTERFACTUAL',
    disposition: 'COUNTERFACTUAL_HOLD',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R019/R122 exact 四丙申 seed',
    sourceRefs: [
      'src/research/general-natal-borderline-strength-case-corpus.ts',
      'src/research/general-natal-season-root-interaction-counterexamples.ts',
      'src/research/general-natal-support-accumulation-saturation-audit.ts',
    ],
    baselineEvidence: '四丙申 / repeated visible 丙 / 火不通根',
    perturbation: 'Add one applicable governed root while leaving the source seed otherwise conceptually fixed.',
    heldConstantClaim: 'Synthetic probe only; no perturbed four-pillar source example is asserted.',
    sourceStatement: '四丙申，火不通根，雖天元一氣，仍作弱論.',
    interpretiveReading:
      'The second exact seed independently preserves weakness with repeated visible peers but no root.',
    researchInference:
      'Root addition changes evidence state but does not authorize an inferred strong label.',
    baselineSourceLabel: 'RUO',
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['root class and position unresolved', 'no source-labeled counterpart'],
    prohibitedExtensions: [
      'ONE_ROOT_ADDED_EQUALS_NOT_RUO',
      'FOUR_BING_COUNTERFACTUAL_AUTO_CLASSIFICATION',
    ],
  },
  {
    caseId: 'R127-C05-ONE-BIJIAN-TO-MUKU-ROOT',
    axis: 'ROOT_QUALITY',
    comparisonGroupId: 'ROOT-QUALITY-COMPARISON',
    isolationQuality: 'SOURCE_COMPARATIVE_ORDERING',
    disposition: 'SEMANTIC_CHANGE_WITHOUT_LABEL',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: 'R124 bounded one-Bijian versus one-Muku comparison',
    sourceRefs: ['src/research/general-natal-support-accumulation-saturation-audit.ts'],
    baselineEvidence: 'one visible 比肩',
    perturbation: 'Replace the compared support with one applicable 墓庫 root.',
    heldConstantClaim:
      'Only the source-local support comparison is preserved; no whole chart is synthesized.',
    sourceStatement:
      'The governed comparison states one 比肩 is inferior to one applicable 墓庫 root.',
    interpretiveReading:
      'Support quality changes under the perturbation even though cardinality remains one.',
    researchInference:
      'Qualitative ordering does not authorize a strength-label flip or numeric conversion.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['whole-chart context absent'],
    prohibitedExtensions: [
      'ONE_MUKU_EQUALS_FIXED_STRENGTH_INCREMENT',
      'ROOT_QUALITY_ORDER_EQUALS_LABEL_BOUNDARY',
    ],
  },
  {
    caseId: 'R127-C06-TWO-BIJIAN-TO-YUQI-ROOT',
    axis: 'ROOT_QUALITY',
    comparisonGroupId: 'ROOT-QUALITY-COMPARISON',
    isolationQuality: 'SOURCE_COMPARATIVE_ORDERING',
    disposition: 'SEMANTIC_CHANGE_WITHOUT_LABEL',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: 'R124 bounded two-Bijian versus one-Yuqi comparison',
    sourceRefs: ['src/research/general-natal-support-accumulation-saturation-audit.ts'],
    baselineEvidence: 'two visible 比肩',
    perturbation: 'Replace the compared support with one applicable 餘氣 root.',
    heldConstantClaim: 'Source-local comparative claim only; not a completed chart.',
    sourceStatement:
      'The governed comparison states two 比肩 are inferior to one applicable 餘氣 root.',
    interpretiveReading:
      'A one-feature support-type change can materially change qualitative support ordering.',
    researchInference:
      'The comparison supplies no 2:1 exchange rate and no label transition.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['temporal Yuqi context can itself vary'],
    prohibitedExtensions: [
      'TWO_BIJIAN_EQUALS_ONE_YUQI_NUMERICALLY',
      'YUQI_SWAP_EQUALS_LABEL_FLIP',
    ],
  },
  {
    caseId: 'R127-C07-THREE-BIJIAN-TO-CHANGSHENG-LU',
    axis: 'ROOT_QUALITY',
    comparisonGroupId: 'ROOT-QUALITY-COMPARISON',
    isolationQuality: 'SOURCE_COMPARATIVE_ORDERING',
    disposition: 'SEMANTIC_CHANGE_WITHOUT_LABEL',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: 'R124 bounded three-Bijian versus Changsheng/Lu comparison',
    sourceRefs: ['src/research/general-natal-support-accumulation-saturation-audit.ts'],
    baselineEvidence: 'three visible 比肩',
    perturbation: 'Replace the compared support with one applicable 長生/祿刃 root.',
    heldConstantClaim: 'Bounded source comparison only; no synthetic complete chart.',
    sourceStatement:
      'The governed comparison states three 比肩 are inferior to one applicable 長生/祿刃 root.',
    interpretiveReading:
      'Repeated visible support and rooted support are not stable interchangeable units.',
    researchInference:
      'The source does not define a numeric feature delta or final label threshold.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['Yin Changsheng treatment remains divergent'],
    prohibitedExtensions: [
      'THREE_BIJIAN_EQUALS_ONE_CHANGSHENG_LU',
      'COMPARATIVE_ORDER_EQUALS_LABEL_THRESHOLD',
    ],
  },
  {
    caseId: 'R127-C08-ROOT-MOVES-INTO-MONTH',
    axis: 'ROOT_POSITION',
    comparisonGroupId: 'ROOT-POSITION',
    isolationQuality: 'SYNTHETIC_SINGLE_FEATURE_PROBE',
    disposition: 'SEMANTIC_CHANGE_WITHOUT_LABEL',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: 'R122 month-root priority observation',
    sourceRefs: [
      'src/research/general-natal-season-root-interaction-counterexamples.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    ],
    baselineEvidence: 'an applicable Tonggen support outside month branch',
    perturbation: 'Move the same root relation into the month branch.',
    heldConstantClaim:
      'Synthetic positional probe; branch replacement side effects are not treated as a real chart mutation.',
    sourceStatement: '通根之中，尤以月令之支為最重也.',
    interpretiveReading:
      'Position can change qualitative root importance within the stated Tonggen scope.',
    researchInference:
      'Month-root priority does not provide a universal label flip or numeric multiplier.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['real chart mutation would change additional branch semantics'],
    prohibitedExtensions: [
      'MONTH_ROOT_EQUALS_FIXED_MULTIPLIER',
      'ROOT_POSITION_CHANGE_EQUALS_LABEL_FLIP',
    ],
  },
  {
    caseId: 'R127-C09-YUQI-TIME-WINDOW',
    axis: 'YUQI_TEMPORAL_CONTEXT',
    comparisonGroupId: 'TEMPORAL-ROOT-CONTEXT',
    isolationQuality: 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE',
    disposition: 'SEMANTIC_CHANGE_WITHOUT_LABEL',
    sourceNature: 'LATER_COMMENTARY',
    sourceStratum: 'R015/R123 餘氣 temporal observation',
    sourceRefs: [
      'src/research/general-natal-hidden-stem-qualitative-depth-evidence.ts',
      'src/research/general-natal-yuqi-temporal-variability-source-observation-authority.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    ],
    baselineEvidence: '清明後十二日 context where 乙木餘氣 remains comparatively meaningful',
    perturbation: 'Move only the temporal context to 土旺之後.',
    heldConstantClaim: 'Same cited Yuqi relation; temporal subperiod is the intended changed feature.',
    sourceStatement:
      'The commentary distinguishes 清明後十二日 from 土旺之後 in its treatment of the same 餘氣.',
    interpretiveReading:
      'Temporal context changes qualitative root evidence.',
    researchInference:
      'A timing perturbation can change evidence semantics without authorizing a final strength label.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['no governed runtime day-count classifier'],
    prohibitedExtensions: [
      'YUQI_TIME_CHANGE_EQUALS_NUMERIC_WEIGHT_CHANGE',
      'YUQI_TIME_CHANGE_EQUALS_STRENGTH_LABEL_FLIP',
    ],
  },
  {
    caseId: 'R127-C10-MUKU-YANG-TO-YIN-POLICY',
    axis: 'STEM_POLARITY_SOURCE_POLICY',
    comparisonGroupId: 'SOURCE-POLICY-SENSITIVITY',
    isolationQuality: 'SOURCE_POLICY_PERTURBATION',
    disposition: 'SOURCE_POLICY_DIVERGENT',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R122 Yang/Yin Muku source-stratum comparison',
    sourceRefs: [
      'src/research/general-natal-season-root-interaction-counterexamples.ts',
      'src/research/general-natal-muku-root-treatment.ts',
    ],
    baselineEvidence: 'Yang-stem Muku bounded positive root treatment',
    perturbation: 'Switch to the Yin stem of the same element at the Muku relation.',
    heldConstantClaim:
      'This is a source-policy sensitivity probe, not a real chart mutation with all Ten-God consequences held constant.',
    sourceStatement:
      'R122 preserves positive Yang Muku evidence but source-stratum tension for the corresponding Yin treatment.',
    interpretiveReading:
      'Changing stem polarity crosses an unresolved source-policy boundary.',
    researchInference:
      'A classifier cannot silently preserve or flip the label across this perturbation.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['Yin Muku authority unresolved'],
    prohibitedExtensions: [
      'YANG_MUKU_RULE_AUTO_COPIES_TO_YIN',
      'POLARITY_CHANGE_EQUALS_LABEL_DELTA',
    ],
  },
  {
    caseId: 'R127-C11-CHANGSHENG-YANG-TO-YIN-POLICY',
    axis: 'CHANGSHENG_SOURCE_POLICY',
    comparisonGroupId: 'SOURCE-POLICY-SENSITIVITY',
    isolationQuality: 'SOURCE_POLICY_PERTURBATION',
    disposition: 'SOURCE_POLICY_DIVERGENT',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R016/R122 Changsheng source-stratum comparison',
    sourceRefs: [
      'src/research/general-natal-season-root-interaction-counterexamples.ts',
      'src/research/general-natal-wang-changsheng-lu-bounded-tonggen-authority.ts',
    ],
    baselineEvidence: 'bounded Yang Changsheng positive root evidence',
    perturbation: 'Switch to the Yin Changsheng counterpart.',
    heldConstantClaim: 'Source-policy comparison only; no full chart equivalence is asserted.',
    sourceStatement:
      'The governed corpus preserves Yang Changsheng support while Yin Changsheng remains source-divergent.',
    interpretiveReading:
      'One polarity change can move the evidence into an unresolved methodology branch.',
    researchInference:
      'Label invariance across Yang/Yin Changsheng is not authorized.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['Yin Changsheng source disagreement'],
    prohibitedExtensions: [
      'YANG_CHANGSHENG_AUTO_COPIES_TO_YIN',
      'SOURCE_DIVERGENCE_RESOLVED_BY_DEFAULT',
    ],
  },
  {
    caseId: 'R127-C12-YIN-TRANSPARENCY-ROLE-SWITCH',
    axis: 'HIDDEN_TRANSPARENCY',
    comparisonGroupId: 'HIDDEN-ROLE-SENSITIVITY',
    isolationQuality: 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE',
    disposition: 'SEMANTIC_CHANGE_WITHOUT_LABEL',
    sourceNature: 'BASE_TEXT',
    sourceStratum: 'R123 exact 寅 role example',
    sourceRefs: [
      'src/research/general-natal-hidden-stem-qualitative-depth-evidence.ts',
      'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
    ],
    baselineEvidence: '寅 context with 甲 as 本主',
    perturbation: 'Make 甲 not transparent while 丙 is transparent in the exact source condition.',
    heldConstantClaim: 'Exact local role example; no general hidden-stem selector is inferred.',
    sourceStatement:
      'The source states that when 甲 is not transparent while 丙 is transparent, 丙 may 作主.',
    interpretiveReading:
      'Transparency changes active qualitative role within the exact example.',
    researchInference:
      'Role change is not a strength-label flip and carries no numeric bonus.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['exact role logic is not generalized to all branches'],
    prohibitedExtensions: [
      'ZUO_ZHU_EQUALS_STRENGTH_LABEL',
      'TRANSPARENCY_ROLE_SWITCH_EQUALS_NUMERIC_DELTA',
    ],
  },
  {
    caseId: 'R127-C13-HIDDEN-STORAGE-ORDER-SWAP',
    axis: 'HIDDEN_TRANSPARENCY',
    comparisonGroupId: 'HIDDEN-ROLE-SENSITIVITY',
    isolationQuality: 'SYNTHETIC_SINGLE_FEATURE_PROBE',
    disposition: 'ANTI_DETERMINISTIC',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R123 canonical hidden-stem storage boundary',
    sourceRefs: [
      'src/research/general-natal-hidden-stem-qualitative-depth-evidence.ts',
      'src/calculation/hidden-stems.ts',
    ],
    baselineEvidence: 'canonical hidden-stem membership array in deterministic storage order',
    perturbation: 'Change array position while preserving the same membership set.',
    heldConstantClaim: 'Storage-order probe only; semantic source facts are intentionally unchanged.',
    sourceStatement:
      'R123 states canonical hidden-stem array position is non-semantic.',
    interpretiveReading:
      'A storage-order perturbation must not create a semantic or strength change.',
    researchInference:
      'Any classifier that flips on hidden-stem array index is repository-invalid.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: false,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: true,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: [],
    prohibitedExtensions: [
      'ARRAY_POSITION_EQUALS_HIDDEN_DEPTH',
      'ARRAY_REORDER_EQUALS_STRENGTH_CHANGE',
    ],
  },
  {
    caseId: 'R127-C14-PEER-TO-RESOURCE-SWAP',
    axis: 'SUPPORT_FAMILY',
    comparisonGroupId: 'SUPPORT-FAMILY-SENSITIVITY',
    isolationQuality: 'SYNTHETIC_SINGLE_FEATURE_PROBE',
    disposition: 'NON_EQUIVALENT_SWAP',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R125 peer/resource discriminant',
    sourceRefs: ['src/research/general-natal-peer-resource-support-discriminant-corpus.ts'],
    baselineEvidence: 'one bounded peer-support relation',
    perturbation: 'Replace peer support with resource support while preserving only the broad support role.',
    heldConstantClaim:
      'Synthetic family-swap probe; mechanism-specific dependencies are not pretended constant.',
    sourceStatement:
      'R125 observes shared broad support context but distinct peer and resource mechanisms.',
    interpretiveReading:
      'The family swap changes mechanism even when broad support direction remains.',
    researchInference:
      'Label invariance and one-for-one substitution are both unauthorized.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['no global substitution law'],
    prohibitedExtensions: [
      'ONE_PEER_EQUALS_ONE_RESOURCE',
      'SUPPORT_FAMILY_SWAP_PRESERVES_LABEL',
    ],
  },
  {
    caseId: 'R127-C15-WEAK-BODY-RESOURCE-TO-PEER-SWAP',
    axis: 'SUPPORT_FAMILY',
    comparisonGroupId: 'SUPPORT-FAMILY-SENSITIVITY',
    isolationQuality: 'SYNTHETIC_SINGLE_FEATURE_PROBE',
    disposition: 'NON_EQUIVALENT_SWAP',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R125 weak-body paired discriminant',
    sourceRefs: ['src/research/general-natal-peer-resource-support-discriminant-corpus.ts'],
    baselineEvidence: 'weak-body 官重/傷官旺 context using 印 support/mediation',
    perturbation: 'Replace the resource remedy with peer support.',
    heldConstantClaim:
      'Only the family substitution is proposed; the source does not authorize that replacement.',
    sourceStatement:
      'R125 explicitly keeps weak-body peer and resource remedies mechanism-specific and non-substitutable.',
    interpretiveReading:
      'Both families may appear in weak-body contexts without being interchangeable.',
    researchInference:
      'A one-feature family swap cannot inherit the baseline outcome or label.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['pattern-specific context differs across remedies'],
    prohibitedExtensions: [
      'WEAK_BODY_RESOURCE_EQUALS_PEER_REMEDY',
      'FAMILY_SWAP_EQUALS_SAME_RESULT',
    ],
  },
  {
    caseId: 'R127-C16-MIXED-BIYIN-REMOVE-TONGGEN',
    axis: 'ROOT_PRESENCE',
    comparisonGroupId: 'ROOT-PRESENCE',
    isolationQuality: 'EXACT_SOURCE_STATE_WITH_SYNTHETIC_COUNTERFACTUAL',
    disposition: 'COUNTERFACTUAL_HOLD',
    sourceNature: 'REPOSITORY_GOVERNED_SOURCE_SURFACE',
    sourceStratum: 'R124/R125 mixed 比印 + Tonggen bounded example',
    sourceRefs: [
      'src/research/general-natal-support-accumulation-saturation-audit.ts',
      'src/research/general-natal-peer-resource-support-discriminant-corpus.ts',
    ],
    baselineEvidence: '比印重疊 plus additional 通根 support in the bounded source example',
    perturbation: 'Remove the Tonggen component while leaving the described 比印 repetition.',
    heldConstantClaim: 'Synthetic removal probe; no opposite source chart is asserted.',
    sourceStatement:
      'The bounded source configuration reaches 黨眾 / 不弱 with repeated 比印 plus rooted support.',
    interpretiveReading:
      'Tonggen participates materially in the observed non-weak configuration.',
    researchInference:
      'Removing Tonggen cannot be assigned 弱 automatically because the source does not supply that counterfactual.',
    baselineSourceLabel: 'NOT_RUO',
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['mixed support composition without Tonggen unresolved'],
    prohibitedExtensions: [
      'REMOVE_TONGGEN_EQUALS_RUO',
      'TONGGEN_PRESENCE_EQUALS_BINARY_LABEL_SWITCH',
    ],
  },
  {
    caseId: 'R127-C17-RESOURCE-MULTIPLICITY-INCREASE',
    axis: 'SUPPORT_MULTIPLICITY',
    comparisonGroupId: 'MULTIPLICITY-SENSITIVITY',
    isolationQuality: 'PARTIAL_ISOLATION',
    disposition: 'ANTI_DETERMINISTIC',
    sourceNature: 'CLASSICAL_COMPILATION',
    sourceStratum: 'R124/R125 三命通會 印綬 multiplicity audit',
    sourceRefs: [
      'src/research/general-natal-support-accumulation-saturation-audit.ts',
      'src/research/general-natal-peer-resource-support-discriminant-corpus.ts',
    ],
    baselineEvidence: 'resource multiplicity can be favorable in a bounded context',
    perturbation: 'Increase resource multiplicity toward 多/太過.',
    heldConstantClaim:
      'The source does not provide an exact +1 perturbation or universal count threshold.',
    sourceStatement:
      'The reviewed corpus contains both favorable greater 印 presence and adverse 多/太過 resource contexts.',
    interpretiveReading:
      'More resource is not monotonic across contexts.',
    researchInference:
      'No exact count exists at which a strength label should flip.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['exact multiplicity boundary absent', 'contexts are not perfectly isolated'],
    prohibitedExtensions: [
      'ONE_MORE_RESOURCE_EQUALS_FIXED_DELTA',
      'TAIGUO_EQUALS_EXACT_LABEL_THRESHOLD',
    ],
  },
  {
    caseId: 'R127-C18-ADD-OUTPUT-TO-STRONG-BODY-RESOURCE',
    axis: 'OUTPUT_PRESENCE',
    comparisonGroupId: 'RELATION-CHAIN-SENSITIVITY',
    isolationQuality: 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE',
    disposition: 'LOCAL_CHAIN_RECONFIGURATION',
    sourceNature: 'BASE_TEXT',
    sourceStratum: 'R126 身印兩旺而用食傷洩氣',
    sourceRefs: ['src/research/general-natal-control-drain-output-ordering-divergence.ts'],
    baselineEvidence: '身印兩旺 bounded context',
    perturbation: 'Introduce 食傷 as the source-stated 洩氣 channel.',
    heldConstantClaim: 'Local pattern/strength context only; no numeric before/after state.',
    sourceStatement: 'The source preserves 身印兩旺而用食傷洩氣.',
    interpretiveReading:
      'Adding output can become useful in this bounded over-supported context.',
    researchInference:
      'Output presence changes local function but does not supply a final strength-label transition.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['no exact post-leakage strength label'],
    prohibitedExtensions: [
      'ADD_OUTPUT_EQUALS_MINUS_ONE',
      'USEFUL_LEAKAGE_EQUALS_LABEL_FLIP',
    ],
  },
  {
    caseId: 'R127-C19-ADD-FOOD-TO-KILL',
    axis: 'RELATION_CHAIN_MEDIATOR',
    comparisonGroupId: 'RELATION-CHAIN-SENSITIVITY',
    isolationQuality: 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE',
    disposition: 'LOCAL_CHAIN_RECONFIGURATION',
    sourceNature: 'BASE_TEXT',
    sourceStratum: 'R126 食神制煞',
    sourceRefs: ['src/research/general-natal-control-drain-output-ordering-divergence.ts'],
    baselineEvidence: '七煞 present in the bounded pattern context',
    perturbation: 'Add 食神 as a controller of 煞.',
    heldConstantClaim: 'Only the local relation chain is analyzed; body strength predicates remain separate.',
    sourceStatement: 'The source preserves 食神制煞.',
    interpretiveReading:
      'One added actor can transform the local role of kill from uncontrolled to controlled in the stated path.',
    researchInference:
      'Relation-chain reconfiguration is not itself a direct 强弱 label flip.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['body-kill balance remains separately required'],
    prohibitedExtensions: [
      'ADD_FOOD_EQUALS_STRENGTH_LABEL_CHANGE',
      'CONTROLLED_KILL_EQUALS_FIXED_SCORE',
    ],
  },
  {
    caseId: 'R127-C20-ADD-RESOURCE-TO-FOOD-CONTROLS-KILL',
    axis: 'RELATION_CHAIN_MEDIATOR',
    comparisonGroupId: 'RELATION-CHAIN-SENSITIVITY',
    isolationQuality: 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE',
    disposition: 'LOCAL_CHAIN_RECONFIGURATION',
    sourceNature: 'BASE_TEXT',
    sourceStratum: 'R126 七煞逢食制而又逢印',
    sourceRefs: ['src/research/general-natal-control-drain-output-ordering-divergence.ts'],
    baselineEvidence: '七煞 already controlled by 食',
    perturbation: 'Add 印 to the existing 食制煞 chain.',
    heldConstantClaim: 'Source-local contamination sequence only.',
    sourceStatement: 'The source preserves 七煞逢食制而又逢印 as contamination.',
    interpretiveReading:
      'Adding resource can disturb a previously favorable local control relation.',
    researchInference:
      'A normally supportive family can reconfigure the chain without supplying a final strength label.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['no generalized contamination precedence'],
    prohibitedExtensions: [
      'RESOURCE_ALWAYS_SUPPORTIVE',
      'ADD_RESOURCE_EQUALS_POSITIVE_STRENGTH_DELTA',
    ],
  },
  {
    caseId: 'R127-C21-ADD-WEALTH-TO-CONTAMINATED-CHAIN',
    axis: 'RELATION_CHAIN_MEDIATOR',
    comparisonGroupId: 'RELATION-CHAIN-SENSITIVITY',
    isolationQuality: 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE',
    disposition: 'LOCAL_CHAIN_RECONFIGURATION',
    sourceNature: 'BASE_TEXT',
    sourceStratum: 'R126 財去印存食 rescue',
    sourceRefs: ['src/research/general-natal-control-drain-output-ordering-divergence.ts'],
    baselineEvidence: '煞逢食制 then 印來護煞',
    perturbation: 'Add 財 that removes 印 and preserves 食.',
    heldConstantClaim: 'Exact local rescue sequence; not a generic strength counterfactual.',
    sourceStatement: 'The source preserves 財去印存食 in the bounded rescue chain.',
    interpretiveReading:
      'Adding wealth can rescue this specific chain even though wealth is broadly challenging in I13.',
    researchInference:
      'Feature polarity is context-dependent and no final strength label follows automatically.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['rescue chain is pattern-local'],
    prohibitedExtensions: [
      'WEALTH_ALWAYS_NEGATIVE',
      'ADD_WEALTH_EQUALS_FIXED_STRENGTH_DELTA',
    ],
  },
  {
    caseId: 'R127-C22-OUTPUT-TO-WEALTH-RELATION-SWAP',
    axis: 'CHALLENGING_RELATION_FAMILY',
    comparisonGroupId: 'CHALLENGING-FAMILY-SENSITIVITY',
    isolationQuality: 'SYNTHETIC_SINGLE_FEATURE_PROBE',
    disposition: 'NON_EQUIVALENT_SWAP',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'I13 + R126 challenging-family audit',
    sourceRefs: [
      'src/research/i13-strength-evidence-pack.ts',
      'src/research/general-natal-control-drain-output-ordering-divergence.ts',
    ],
    baselineEvidence: 'one visible output relation collected as challenging',
    perturbation: 'Replace it with one visible wealth relation while preserving only broad collector direction.',
    heldConstantClaim: 'Synthetic relation-family swap; mechanism-specific semantics are intentionally not held equal.',
    sourceStatement:
      'I13 collects both as challenging, while R126 rejects their semantic equivalence and equal scalar treatment.',
    interpretiveReading:
      'The broad collector category remains the same but mechanism changes.',
    researchInference:
      'A classifier cannot assume either label invariance or equal numeric delta under the swap.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['no governed final strength resolver'],
    prohibitedExtensions: [
      'OUTPUT_EQUALS_WEALTH_NEGATIVE_UNIT',
      'CHALLENGING_FAMILY_SWAP_PRESERVES_SCORE',
    ],
  },
  {
    caseId: 'R127-C23-WEALTH-TO-OFFICER-RELATION-SWAP',
    axis: 'CHALLENGING_RELATION_FAMILY',
    comparisonGroupId: 'CHALLENGING-FAMILY-SENSITIVITY',
    isolationQuality: 'SYNTHETIC_SINGLE_FEATURE_PROBE',
    disposition: 'NON_EQUIVALENT_SWAP',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'I13 + R126 challenging-family audit',
    sourceRefs: [
      'src/research/i13-strength-evidence-pack.ts',
      'src/research/general-natal-control-drain-output-ordering-divergence.ts',
    ],
    baselineEvidence: 'one visible wealth relation collected as challenging',
    perturbation: 'Replace it with one visible officer relation.',
    heldConstantClaim: 'Broad direction only; wealth-capacity and control mechanisms are not equated.',
    sourceStatement:
      'R126 separates wealth-capacity and control mechanisms despite their shared I13 challenging label.',
    interpretiveReading:
      'The family swap changes mechanism and potential relation-chain behavior.',
    researchInference:
      'One challenging relation cannot be exchanged for another as if both were -1.',
    baselineSourceLabel: null,
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['no scalar challenging metric'],
    prohibitedExtensions: [
      'WEALTH_EQUALS_OFFICER_NEGATIVE_UNIT',
      'RELATION_FAMILY_SWAP_EQUALS_SAME_STRENGTH_EFFECT',
    ],
  },
  {
    caseId: 'R127-C24-WEALTH-WEAK-ADD-RESOURCE-REMEDY',
    axis: 'WEALTH_CAPACITY_REMEDY',
    comparisonGroupId: 'WEALTH-CAPACITY-SENSITIVITY',
    isolationQuality: 'SOURCE_LOCAL_SINGLE_FEATURE_ROLE_CHANGE',
    disposition: 'LOCAL_CHAIN_RECONFIGURATION',
    sourceNature: 'CLASSICAL_COMPILATION',
    sourceStratum: 'R126 / 三命通會 財多身弱要印扶身',
    sourceRefs: [
      'src/research/general-natal-control-drain-output-ordering-divergence.ts',
      'https://zh.wikisource.org/zh-hant/三命通會/卷六',
    ],
    baselineEvidence: '財多身弱',
    perturbation: 'Add 印 as the source-stated 扶身 remedy.',
    heldConstantClaim: 'Local remedy statement only; no full post-remedy chart is supplied.',
    sourceStatement: 'The source preserves 財多身弱，要印扶身.',
    interpretiveReading:
      'Adding resource changes the local remedy state of a directly weak-labeled wealth-capacity context.',
    researchInference:
      'The source does not provide the post-remedy opposite strength label, so the counterfactual remains held.',
    baselineSourceLabel: 'RUO',
    perturbedSourceLabel: null,
    exactSingleFeatureLabelFlipObserved: false,
    featureSemanticChangeObserved: true,
    counterfactualLabelAuthorized: false,
    labelInvarianceAuthorized: false,
    numericDeltaAuthorized: false,
    scalarScoreAuthorized: false,
    finalClassifierAuthorized: false,
    unresolvedFactors: ['post-remedy final label absent', '印 strength/root conditions unresolved'],
    prohibitedExtensions: [
      'ADD_RESOURCE_EQUALS_NOT_RUO',
      'REMEDY_PRESENCE_EQUALS_LABEL_FLIP',
    ],
  },
]);

export const R127_COMPARISON_GROUPS = Object.freeze([
  'SEASON-ANTI-DETERMINISM',
  'ROOT-PRESENCE',
  'ROOT-QUALITY-COMPARISON',
  'ROOT-POSITION',
  'TEMPORAL-ROOT-CONTEXT',
  'SOURCE-POLICY-SENSITIVITY',
  'HIDDEN-ROLE-SENSITIVITY',
  'SUPPORT-FAMILY-SENSITIVITY',
  'MULTIPLICITY-SENSITIVITY',
  'RELATION-CHAIN-SENSITIVITY',
  'CHALLENGING-FAMILY-SENSITIVITY',
  'WEALTH-CAPACITY-SENSITIVITY',
] as const);

export const R127_REJECTED_DERIVATIONS = Object.freeze([
  'ONE_FEATURE_CHANGED_EQUALS_OPPOSITE_LABEL',
  'SOURCE_LABEL_ON_ONE_SIDE_EQUALS_COUNTERFACTUAL_LABEL',
  'DE_SHI_EQUALS_WANG',
  'SHI_SHI_EQUALS_RUO',
  'ADD_ONE_ROOT_EQUALS_QIANG',
  'REMOVE_ONE_ROOT_EQUALS_RUO',
  'ROOT_QUALITY_ORDER_EQUALS_LABEL_THRESHOLD',
  'MONTH_ROOT_EQUALS_LABEL_OVERRIDE',
  'YUQI_TIME_CHANGE_EQUALS_LABEL_FLIP',
  'YANG_RULE_AUTO_COPIES_TO_YIN',
  'TRANSPARENCY_ROLE_CHANGE_EQUALS_STRENGTH_FLIP',
  'PEER_RESOURCE_SWAP_PRESERVES_LABEL',
  'ONE_MORE_SUPPORT_EQUALS_FIXED_DELTA',
  'OUTPUT_WEALTH_OFFICER_EQUAL_NEGATIVE_UNITS',
  'LOCAL_CHAIN_RECONFIGURATION_EQUALS_STRENGTH_LABEL_FLIP',
  'SYNTHETIC_COUNTERFACTUAL_INHERITS_NEARBY_SOURCE_LABEL',
] as const);

export const R127_SUMMARY = Object.freeze({
  caseCount: R127_PERTURBATION_CASES.length,
  comparisonGroupCount: R127_COMPARISON_GROUPS.length,
  directBaselineLabelCount: R127_PERTURBATION_CASES.filter(
    (row) => row.baselineSourceLabel !== null,
  ).length,
  directPerturbedLabelCount: R127_PERTURBATION_CASES.filter(
    (row) => row.perturbedSourceLabel !== null,
  ).length,
  exactSingleFeatureLabelFlipCount: R127_PERTURBATION_CASES.filter(
    (row) => row.exactSingleFeatureLabelFlipObserved,
  ).length,
  semanticChangeCount: R127_PERTURBATION_CASES.filter(
    (row) => row.featureSemanticChangeObserved,
  ).length,
  counterfactualLabelAuthorizedCount: R127_PERTURBATION_CASES.filter(
    (row) => row.counterfactualLabelAuthorized,
  ).length,
  labelInvarianceAuthorizedCount: R127_PERTURBATION_CASES.filter(
    (row) => row.labelInvarianceAuthorized,
  ).length,
  numericDeltaAuthorizedCount: R127_PERTURBATION_CASES.filter(
    (row) => row.numericDeltaAuthorized,
  ).length,
  scalarScoreAuthorizedCount: R127_PERTURBATION_CASES.filter(
    (row) => row.scalarScoreAuthorized,
  ).length,
} as const);

export const R127_AUTHORITY = Object.freeze({
  status: 'RESEARCH_SINGLE_FEATURE_STRENGTH_LABEL_INSTABILITY_AUDIT_COMPLETE' as const,
  researchOnly: true,
  directSourceLabelAnchorsObserved: true,
  singleFeatureSemanticSensitivityObserved: true,
  sourcePolicySensitivityObserved: true,
  localChainReconfigurationObserved: true,
  exactSingleFeatureOppositeLabelPairEstablished: false,
  exactSingleFeatureLabelFlipEstablished: false,
  syntheticCounterfactualLabelsAuthorized: false,
  labelInvarianceAcrossPerturbationsAuthorized: false,
  numericFeatureDeltaAuthorized: false,
  scalarStrengthScoreAuthorized: false,
  universalFeatureThresholdAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
