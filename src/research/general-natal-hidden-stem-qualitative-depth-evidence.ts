export const R123_HIDDEN_STEM_QUALITATIVE_DEPTH_VERSION = '0.1.0-research' as const;

export type R123EvidenceType =
  | 'HIDDEN_MEMBERSHIP'
  | 'EXACT_PRIMARY_ROLE'
  | 'TRANSPARENCY_SUBSTITUTION'
  | 'TEMPORAL_COMMAND_OBSERVATION'
  | 'TEMPORAL_VARIABILITY'
  | 'QUALITATIVE_ROOT_CLASS_LANGUAGE'
  | 'INTERACTION_BOUNDARY'
  | 'STORAGE_ORDER_BOUNDARY'
  | 'GENERALIZATION_GAP';

export type R123Generalizability =
  | 'BOUNDED_GENERAL'
  | 'EXACT_EXAMPLE_ONLY'
  | 'NOT_GENERALIZABLE'
  | 'UNRESOLVED';

export type R123SourceNature =
  | 'CLASSICAL_TRANSCRIPTION'
  | 'BASE_TEXT'
  | 'LATER_COMMENTARY'
  | 'REPOSITORY_CANONICAL_SUBSTRATE'
  | 'RESEARCH_SYNTHESIS';

export interface R123QualitativeEvidenceRow {
  evidenceId: string;
  evidenceType: R123EvidenceType;
  sourceNature: R123SourceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  directObservation: string;
  qualitativeImplication: string;
  generalizability: R123Generalizability;
  authorizesQualitativeRoleDifferentiation: boolean;
  authorizesSemanticDepthRanking: false;
  authorizesAllBranchMapping: boolean;
  authorizesNumericWeight: boolean;
  authorizesFinalStrength: boolean;
  prohibitedExtensions: readonly string[];
}

export const R123_QUALITATIVE_EVIDENCE_ROWS: readonly R123QualitativeEvidenceRow[] =
  Object.freeze([
    {
      evidenceId: 'R123-E01-YUANHAI-HIDDEN-MEMBERSHIP',
      evidenceType: 'HIDDEN_MEMBERSHIP',
      sourceNature: 'CLASSICAL_TRANSCRIPTION',
      sourceStratum: '淵海子平 / 又地支藏遁歌',
      sourceRefs: [
        'src/calculation/hidden-stems.ts',
        'https://zh.wikisource.org/zh-hant/淵海子平',
      ],
      directObservation:
        'The selected classical transcription enumerates which stems are hidden in each branch.',
      qualitativeImplication:
        'Branch-to-hidden-stem membership is supported as membership only.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: true,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'MEMBERSHIP_EQUALS_MAIN_SECONDARY_RESIDUAL_RANK',
        'MEMBERSHIP_EQUALS_STRENGTH_WEIGHT',
        'MEMBERSHIP_EQUALS_USABLE_ROLE',
      ],
    },
    {
      evidenceId: 'R123-E02-CANONICAL-STORAGE-ORDER-NONSEMANTIC',
      evidenceType: 'STORAGE_ORDER_BOUNDARY',
      sourceNature: 'REPOSITORY_CANONICAL_SUBSTRATE',
      sourceStratum: 'myeonghwa-hidden-stem-membership-v1',
      sourceRefs: ['src/calculation/hidden-stems.ts'],
      directObservation:
        'Canonical hidden-stem arrays are sorted by a repository stem order for deterministic storage.',
      qualitativeImplication:
        'Array position is explicitly non-semantic and cannot encode hidden-stem rank, depth, command duration, or strength.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'ARRAY_INDEX_ZERO_EQUALS_PRIMARY_HIDDEN_STEM',
        'ARRAY_POSITION_EQUALS_DEPTH',
        'ARRAY_POSITION_EQUALS_STRENGTH_WEIGHT',
      ],
    },
    {
      evidenceId: 'R123-E03-YIN-JIA-PRIMARY-ROLE',
      evidenceType: 'EXACT_PRIMARY_ROLE',
      sourceNature: 'BASE_TEXT',
      sourceStratum: '子平真詮 / 論用神變化 / 寅 exact example',
      sourceRefs: [
        'src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
      ],
      directObservation:
        'In the exact 寅 discussion, 甲 is explicitly called 本主.',
      qualitativeImplication:
        'The source gives 甲 an exact primary-role description within this 寅 example.',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesQualitativeRoleDifferentiation: true,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'BENZHU_EQUALS_GENERIC_BENQI_LABEL',
        'YIN_EXAMPLE_EQUALS_ALL_BRANCH_PRIMARY_MAPPING',
        'BENZHU_EQUALS_ARRAY_INDEX_ZERO',
      ],
    },
    {
      evidenceId: 'R123-E04-YIN-BING-TRANSPARENCY-SUBSTITUTION',
      evidenceType: 'TRANSPARENCY_SUBSTITUTION',
      sourceNature: 'BASE_TEXT',
      sourceStratum: '子平真詮 / 論用神變化 / 寅 exact example',
      sourceRefs: [
        'src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.ts',
        'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
      ],
      directObservation:
        'When 甲 is not transparent while 丙 is transparent in the exact 寅 example, 丙 may 作主.',
      qualitativeImplication:
        'Role prominence can change with transparency in this exact source example; static hidden membership alone does not settle active role.',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'TRANSPARENT_SECONDARY_ALWAYS_REPLACES_PRIMARY',
        'ONE_YIN_EXAMPLE_EQUALS_GENERAL_SELECTOR',
        'TRANSPARENCY_EQUALS_NUMERIC_BONUS',
      ],
    },
    {
      evidenceId: 'R123-E05-YIN-BING-WU-DIFFERENT-ANALOGICAL-ROLES',
      evidenceType: 'EXACT_PRIMARY_ROLE',
      sourceNature: 'BASE_TEXT',
      sourceStratum: '子平真詮 / 論用神變化 / 寅 exact example',
      sourceRefs: [
        'src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.ts',
      ],
      directObservation:
        'The exact 寅 passage distinguishes 甲 as 本主 and describes 丙 and 戊 through different subordinate office analogies.',
      qualitativeImplication:
        'The passage supports qualitative role differentiation inside one branch example without yielding a universal three-level ranking table.',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesQualitativeRoleDifferentiation: true,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'OFFICE_ANALOGY_EQUALS_NUMERIC_WEIGHT',
        'YIN_THREE_ROLE_ANALOGY_EQUALS_ALL_BRANCH_THREE_LEVEL_DEPTH',
      ],
    },
    {
      evidenceId: 'R123-E06-ALL-BRANCH-PRIMARY-MAPPING-UNRESOLVED',
      evidenceType: 'GENERALIZATION_GAP',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'post-R122 repository evidence audit',
      sourceRefs: [
        'src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.ts',
      ],
      directObservation:
        'Current governed evidence does not provide an admitted primary-hidden-stem selector for all twelve branches.',
      qualitativeImplication:
        'Exact 寅 evidence cannot be promoted into a repository-wide primary mapping.',
      generalizability: 'UNRESOLVED',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'INVENT_ALL_BRANCH_PRIMARY_HIDDEN_STEM_TABLE',
        'PRACTITIONER_CONVENTION_EQUALS_GOVERNED_AUTHORITY',
      ],
    },
    {
      evidenceId: 'R123-E07-MAIN-SECONDARY-RESIDUAL-MAPPING-UNRESOLVED',
      evidenceType: 'GENERALIZATION_GAP',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'repository authority boundary',
      sourceRefs: [
        'src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.ts',
        'src/calculation/hidden-stems.ts',
      ],
      directObservation:
        'The current governed corpus does not authorize a universal 本氣/中氣/餘氣 label mapping for every branch member.',
      qualitativeImplication:
        'A three-level hidden-stem depth ontology remains unadmitted.',
      generalizability: 'UNRESOLVED',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'AUTO_LABEL_ALL_HIDDEN_STEMS_BENQI_ZHONGQI_YUQI',
        'MAP_STORAGE_ORDER_TO_BENQI_ZHONGQI_YUQI',
      ],
    },
    {
      evidenceId: 'R123-E08-REN-YUAN-COMMAND-TIMING-OBSERVED',
      evidenceType: 'TEMPORAL_COMMAND_OBSERVATION',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 人元司令 table commentary',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm'],
      directObservation:
        'The selected commentary preserves day-count sequencing for 人元司令 across month/solar-term contexts.',
      qualitativeImplication:
        'Temporal command sequencing is qualitatively observable as a distinct evidence axis from static membership.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'COMMAND_DAYS_EQUAL_STRENGTH_COEFFICIENT',
        'TEMPORAL_COMMAND_EQUALS_STATIC_HIDDEN_DEPTH',
      ],
    },
    {
      evidenceId: 'R123-E09-REN-YUAN-ANTI-RIGIDITY-WARNING',
      evidenceType: 'TEMPORAL_COMMAND_OBSERVATION',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 人元司令 table commentary',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm'],
      directObservation:
        'The commentary explicitly warns that the 人元司令 day table should not be treated rigidly.',
      qualitativeImplication:
        'Even where temporal sequencing is recorded, the source itself resists a mechanically rigid duration model.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'COMMAND_DAY_TABLE_EQUALS_EXACT_RUNTIME_WEIGHT_CURVE',
        'DAY_COUNT_EQUALS_FIXED_STRENGTH_MULTIPLIER',
      ],
    },
    {
      evidenceId: 'R123-E10-YUQI-TEMPORAL-VARIABILITY',
      evidenceType: 'TEMPORAL_VARIABILITY',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: 'R015 selected 餘氣 commentary observation',
      sourceRefs: [
        'R015',
        'src/research/general-natal-yuqi-temporal-variability-source-observation-authority.ts',
      ],
      directObservation:
        'Governed R015 evidence preserves different 餘氣 treatment around 清明後十二日 and 土旺之後.',
      qualitativeImplication:
        '餘氣 is context-sensitive in the selected source surface rather than a timeless fixed scalar.',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'YUQI_EQUALS_STATIC_DEPTH_SCORE',
        'YUQI_TEMPORAL_VARIABILITY_EQUALS_NUMERIC_WEIGHT',
      ],
    },
    {
      evidenceId: 'R123-E11-CHEN-BENQI-YUQI-EXACT-COMMENTARY',
      evidenceType: 'TEMPORAL_VARIABILITY',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: '子平真詮評註 / 辰 exact commentary context',
      sourceRefs: ['https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm'],
      directObservation:
        'The selected commentary describes 辰 context with 土 as 本氣 and 乙木 as 餘氣 in the bounded seasonal discussion.',
      qualitativeImplication:
        'An exact branch/context can carry qualitative 本氣/餘氣 terminology without authorizing a complete twelve-branch ontology.',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesQualitativeRoleDifferentiation: true,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'ONE_CHEN_EXAMPLE_EQUALS_ALL_BRANCH_BENQI_YUQI_TABLE',
        'BENQI_YUQI_LABEL_EQUALS_NUMERIC_DEPTH',
      ],
    },
    {
      evidenceId: 'R123-E12-HEAVY-LIGHT-ROOT-CLASS-NOT-HIDDEN-DEPTH',
      evidenceType: 'QUALITATIVE_ROOT_CLASS_LANGUAGE',
      sourceNature: 'LATER_COMMENTARY',
      sourceStratum: 'R017/R020 selected root-class commentary',
      sourceRefs: [
        'R017',
        'R020',
        'src/research/general-natal-lu-diwang-root-strength.ts',
      ],
      directObservation:
        'The selected source chain uses qualitative 重/輕 language for root classes such as 長生祿旺 versus 墓庫餘氣.',
      qualitativeImplication:
        'Root-class comparison is a distinct qualitative axis and must not be conflated with hidden-stem storage depth.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'ROOT_CLASS_HEAVY_LIGHT_EQUALS_HIDDEN_STEM_DEPTH',
        'HEAVY_LIGHT_EQUALS_NUMERIC_COEFFICIENT',
      ],
    },
    {
      evidenceId: 'R123-E13-HIDDEN-MEMBERSHIP-NOT-ACTIVATION',
      evidenceType: 'INTERACTION_BOUNDARY',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R060 hidden-stem interaction boundary',
      sourceRefs: [
        'R060',
        'src/research/general-natal-hidden-stem-interaction-boundary.ts',
      ],
      directObservation:
        'R060 keeps hidden membership distinct from manifestation, meeting configuration, and clash movement/disruption.',
      qualitativeImplication:
        'Being a hidden member does not by itself establish activation or usable role.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'HIDDEN_MEMBERSHIP_IMPLIES_ACTIVE_ROLE',
        'HIDDEN_MEMBERSHIP_IMPLIES_FIXED_STRENGTH',
      ],
    },
    {
      evidenceId: 'R123-E14-CLASH-NOT-UNIVERSAL-EXPOSURE',
      evidenceType: 'INTERACTION_BOUNDARY',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R060 bounded clash counterexample',
      sourceRefs: [
        'R060',
        'src/research/general-natal-hidden-stem-interaction-boundary.ts',
      ],
      directObservation:
        'R060 rejects the shortcut that clash reveals or activates every hidden stem.',
      qualitativeImplication:
        'Interaction events cannot be used as a generic hidden-depth activation switch.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'CLASH_REVEALS_ALL_HIDDEN_STEMS',
        'CLASH_EQUALS_TOUGAN',
      ],
    },
    {
      evidenceId: 'R123-E15-MEETING-NOT-EACH-HIDDEN-STEM-ACTIVATION',
      evidenceType: 'INTERACTION_BOUNDARY',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R060 branch-meeting boundary',
      sourceRefs: [
        'R060',
        'src/research/general-natal-hidden-stem-interaction-boundary.ts',
      ],
      directObservation:
        'R060 treats branch meeting as a configuration mechanism rather than individual activation of every hidden member.',
      qualitativeImplication:
        'Configuration-level effects must remain distinct from hidden-stem depth or per-member activation.',
      generalizability: 'BOUNDED_GENERAL',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'MEETING_ACTIVATES_EACH_HIDDEN_STEM_INDEPENDENTLY',
        'MEETING_EQUALS_DEPTH_PROMOTION',
      ],
    },
    {
      evidenceId: 'R123-E16-NUMERIC-HIDDEN-DEPTH-MODEL-UNSUPPORTED',
      evidenceType: 'GENERALIZATION_GAP',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R123 cross-evidence synthesis',
      sourceRefs: [
        'R015',
        'R017',
        'R060',
        'src/calculation/hidden-stems.ts',
      ],
      directObservation:
        'No governed source package in the reviewed corpus supplies a universal numeric conversion from membership, 本主, temporal command, 餘氣, or 重/輕 language into hidden-stem strength weights.',
      qualitativeImplication:
        'The reviewed evidence supports multiple qualitative dimensions, not one scalar depth score.',
      generalizability: 'NOT_GENERALIZABLE',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'INVENT_HIDDEN_STEM_DEPTH_SCORE',
        'INVENT_BENQI_ZHONGQI_YUQI_NUMERIC_WEIGHTS',
        'INVENT_COMMAND_DAY_WEIGHT_CURVE',
      ],
    },
    {
      evidenceId: 'R123-E17-GENERALIZED-HIDDEN-STEM-SELECTOR-UNRESOLVED',
      evidenceType: 'GENERALIZATION_GAP',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'Gyeokguk month-order hidden-stem selection review',
      sourceRefs: [
        'src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.ts',
      ],
      directObservation:
        'The exact 寅 primary/substitution evidence has not been generalized into an all-branch hidden-stem selection predicate.',
      qualitativeImplication:
        'Qualitative evidence comparison does not authorize candidate selection or establishment logic.',
      generalizability: 'UNRESOLVED',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'EXACT_YIN_EXAMPLE_EQUALS_GENERAL_SELECTOR',
        'HIDDEN_DEPTH_EQUALS_GEJU_CANDIDATE_SELECTION',
      ],
    },
    {
      evidenceId: 'R123-E18-QUALITATIVE-EVIDENCE-NOT-FINAL-STRENGTH',
      evidenceType: 'GENERALIZATION_GAP',
      sourceNature: 'RESEARCH_SYNTHESIS',
      sourceStratum: 'R121/R122/R123 strength boundary',
      sourceRefs: ['R121', 'R122'],
      directObservation:
        'R121 and R122 already preserve that season, root, and support primitives remain insufficient for a final whole-chart strength classifier.',
      qualitativeImplication:
        'Adding qualitative hidden-stem evidence does not close the remaining root, support-aggregation, or methodology-composition gaps.',
      generalizability: 'NOT_GENERALIZABLE',
      authorizesQualitativeRoleDifferentiation: false,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
      prohibitedExtensions: [
        'HIDDEN_STEM_DEPTH_EVIDENCE_EQUALS_FINAL_QIANG_RUO',
        'R123_EQUALS_STRENGTH_CLASSIFIER',
      ],
    },
  ]);

export const R123_EVIDENCE_DIMENSIONS = Object.freeze([
  'MEMBERSHIP',
  'EXACT_ROLE',
  'TRANSPARENCY',
  'TEMPORAL_COMMAND',
  'TEMPORAL_VARIABILITY',
  'ROOT_CLASS_QUALITATIVE_LANGUAGE',
  'INTERACTION_STATE',
] as const);

export const R123_REJECTED_NORMALIZATIONS = Object.freeze([
  'HIDDEN_STEM_ARRAY_ORDER_EQUALS_SEMANTIC_RANK',
  'BENZHU_EQUALS_GENERIC_BENQI_MAPPING',
  'EXACT_YIN_ROLE_EQUALS_ALL_BRANCH_ROLE',
  'BENQI_ZHONGQI_YUQI_LABELS_EQUAL_STORAGE_ORDER',
  'COMMAND_DAY_DURATION_EQUALS_STRENGTH_WEIGHT',
  'YUQI_CONTEXT_EQUALS_STATIC_DEPTH_SCORE',
  'ROOT_CLASS_HEAVY_LIGHT_EQUALS_HIDDEN_DEPTH',
  'HIDDEN_MEMBERSHIP_EQUALS_ACTIVATION',
  'CLASH_EQUALS_HIDDEN_STEM_EXPOSURE',
  'MEETING_EQUALS_PER_MEMBER_ACTIVATION',
  'QUALITATIVE_DEPTH_EQUALS_NUMERIC_WEIGHT',
  'QUALITATIVE_DEPTH_EQUALS_FINAL_STRENGTH',
] as const);

export const R123_SUMMARY = Object.freeze({
  evidenceRowCount: R123_QUALITATIVE_EVIDENCE_ROWS.length,
  dimensionCount: R123_EVIDENCE_DIMENSIONS.length,
  exactExampleOnlyCount: R123_QUALITATIVE_EVIDENCE_ROWS.filter(
    (row) => row.generalizability === 'EXACT_EXAMPLE_ONLY',
  ).length,
  unresolvedCount: R123_QUALITATIVE_EVIDENCE_ROWS.filter(
    (row) => row.generalizability === 'UNRESOLVED',
  ).length,
  numericWeightAuthorizedCount: R123_QUALITATIVE_EVIDENCE_ROWS.filter(
    (row) => row.authorizesNumericWeight,
  ).length,
  finalStrengthAuthorizedCount: R123_QUALITATIVE_EVIDENCE_ROWS.filter(
    (row) => row.authorizesFinalStrength,
  ).length,
} as const);

export const R123_AUTHORITY = Object.freeze({
  status: 'RESEARCH_QUALITATIVE_EVIDENCE_COMPARISON_COMPLETE' as const,
  researchOnly: true,
  hiddenStemMembershipAuthorized: true,
  canonicalStorageOrderSemanticRankAuthorized: false,
  exactYinJiaPrimaryRoleObserved: true,
  exactYinBingTransparencySubstitutionObserved: true,
  exactYinEvidenceGeneralizedBeyondYin: false,
  allBranchPrimaryHiddenStemMappingAuthorized: false,
  mainSecondaryResidualMappingAuthorized: false,
  renYuanTimingObserved: true,
  renYuanTimingRigidRuntimeAuthorized: false,
  yuqiTemporalVariabilityObserved: true,
  rootClassHeavyLightObserved: true,
  rootClassHeavyLightEqualsHiddenDepth: false,
  genericInteractionActivationAuthorized: false,
  hiddenStemDepthNumericWeightsAuthorized: false,
  generalizedHiddenStemSelectorAuthorized: false,
  finalQiangRuoClassifierAuthorized: false,
  finalWangShuaiClassifierAuthorized: false,
  gyeokgukCandidateDerivationAuthorized: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
